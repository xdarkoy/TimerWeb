import Stripe from 'stripe';
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from './_core/trpc';
import { getDb } from './db';
import { subscriptions, users, demoRequests } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { PRICING_PLANS, getPlanById } from './products';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia' as any,
});

/**
 * Stripe tRPC Router
 */
export const stripeRouter = router({
  /**
   * Create a Checkout Session for subscription
   */
  createCheckoutSession: protectedProcedure
    .input(z.object({
      planId: z.enum(['starter', 'professional', 'enterprise']),
      interval: z.enum(['monthly', 'yearly']),
      successUrl: z.string().optional(),
      cancelUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const plan = getPlanById(input.planId);
      if (!plan) {
        throw new Error('Invalid plan');
      }

      const price = input.interval === 'yearly' ? plan.priceYearly : plan.priceMonthly;
      const origin = ctx.req.headers.origin || 'http://localhost:3000';

      // Create or get Stripe customer
      let stripeCustomerId = ctx.user.stripeCustomerId;
      
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: ctx.user.email || undefined,
          name: ctx.user.name || undefined,
          metadata: {
            userId: ctx.user.id.toString(),
          },
        });
        stripeCustomerId = customer.id;

        // Update user with Stripe customer ID
        const db = await getDb();
        if (db) {
          await db.update(users)
            .set({ stripeCustomerId })
            .where(eq(users.id, ctx.user.id));
        }
      }

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        client_reference_id: ctx.user.id.toString(),
        customer_email: ctx.user.email || undefined,
        mode: 'subscription',
        allow_promotion_codes: true,
        line_items: [
          {
            price_data: {
              currency: plan.currency,
              product_data: {
                name: `Timer ${plan.name.en}`,
                description: plan.description.en,
              },
              unit_amount: price,
              recurring: {
                interval: input.interval === 'yearly' ? 'year' : 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email || '',
          customer_name: ctx.user.name || '',
          plan_id: input.planId,
          interval: input.interval,
        },
        success_url: input.successUrl || `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: input.cancelUrl || `${origin}/checkout/cancel`,
      });

      return {
        checkoutUrl: session.url,
        sessionId: session.id,
      };
    }),

  /**
   * Get current subscription status
   */
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const result = await db.select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1);

    if (result.length === 0) return null;

    const subscription = result[0];

    // Fetch fresh data from Stripe
    if (subscription.stripeSubscriptionId) {
      try {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripeSubscriptionId
        ) as any;
        
        return {
          ...subscription,
          stripeData: {
            status: stripeSubscription.status,
            currentPeriodEnd: stripeSubscription.current_period_end ? new Date(stripeSubscription.current_period_end * 1000) : null,
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
          },
        };
      } catch (error) {
        console.error('Error fetching Stripe subscription:', error);
      }
    }

    return subscription;
  }),

  /**
   * Cancel subscription
   */
  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const result = await db.select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1);

    if (result.length === 0) {
      throw new Error('No active subscription found');
    }

    const subscription = result[0];

    // Cancel at period end in Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    return { success: true };
  }),

  /**
   * Get available plans
   */
  getPlans: publicProcedure.query(() => {
    return PRICING_PLANS;
  }),

  /**
   * Submit demo request
   */
  submitDemoRequest: publicProcedure
    .input(z.object({
      company: z.string().min(1),
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      employeeCount: z.string().optional(),
      country: z.string().optional(),
      message: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');

      await db.insert(demoRequests).values({
        company: input.company,
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        employeeCount: input.employeeCount || null,
        country: input.country || null,
        message: input.message || null,
      });

      return { success: true };
    }),
});

/**
 * Express Router for Stripe Webhook
 * Must be registered BEFORE express.json() middleware
 */
export function createStripeWebhookRouter(): Router {
  const webhookRouter = Router();

  webhookRouter.post(
    '/api/stripe/webhook',
    async (req: Request, res: Response) => {
      const sig = req.headers['stripe-signature'] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error('[Stripe Webhook] No webhook secret configured');
        return res.status(500).json({ error: 'Webhook secret not configured' });
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error('[Stripe Webhook] Signature verification failed:', err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
      }

      // Handle test events
      if (event.id.startsWith('evt_test_')) {
        console.log('[Stripe Webhook] Test event detected, returning verification response');
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Received event: ${event.type} (${event.id})`);

      const db = await getDb();
      if (!db) {
        console.error('[Stripe Webhook] Database not available');
        return res.status(500).json({ error: 'Database not available' });
      }

      try {
        switch (event.type) {
          case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            
            if (session.mode === 'subscription' && session.subscription) {
              const userId = parseInt(session.metadata?.user_id || session.client_reference_id || '0');
              const planId = session.metadata?.plan_id || 'starter';
              const interval = (session.metadata?.interval || 'monthly') as 'monthly' | 'yearly';

              if (userId) {
                // Create subscription record
                await db.insert(subscriptions).values({
                  userId,
                  stripeSubscriptionId: session.subscription as string,
                  planId,
                  interval,
                  status: 'active',
                });

                console.log(`[Stripe Webhook] Created subscription for user ${userId}`);
              }
            }
            break;
          }

          case 'customer.subscription.updated': {
            const subscription = event.data.object as Stripe.Subscription;
            
            await db.update(subscriptions)
              .set({ 
                status: subscription.status as any,
              })
              .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

            console.log(`[Stripe Webhook] Updated subscription ${subscription.id}`);
            break;
          }

          case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            
            await db.update(subscriptions)
              .set({ status: 'canceled' })
              .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

            console.log(`[Stripe Webhook] Canceled subscription ${subscription.id}`);
            break;
          }

          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
      } catch (error) {
        console.error('[Stripe Webhook] Error processing event:', error);
        res.status(500).json({ error: 'Error processing webhook' });
      }
    }
  );

  return webhookRouter;
}
