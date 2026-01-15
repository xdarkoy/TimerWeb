import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

type BillingInterval = 'monthly' | 'yearly';

export default function Checkout() {
  const { t, language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');
  
  const { data: plans, isLoading: plansLoading } = trpc.stripe.getPlans.useQuery();
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        toast.success(t('checkout.redirecting'));
        window.open(data.checkoutUrl, '_blank');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCheckout = () => {
    createCheckout.mutate({
      planId: selectedPlan as 'starter' | 'professional' | 'enterprise',
      interval: billingInterval,
    });
  };

  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(0);
  };

  const getMonthlyEquivalent = (yearlyPrice: number) => {
    return (yearlyPrice / 12 / 100).toFixed(2);
  };

  if (plansLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-5xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('checkout.back')}
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'Plus Jakarta Sans' }}
          >
            {t('checkout.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('checkout.subtitle')}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-full">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingInterval === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('checkout.monthly')}
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingInterval === 'yearly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('checkout.yearly')}
              <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans?.map((plan, index) => {
            const price = billingInterval === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            const isSelected = selectedPlan === plan.id;
            const planName = plan.name[language as keyof typeof plan.name] || plan.name.en;
            const planDesc = plan.description[language as keyof typeof plan.description] || plan.description.en;
            const features = plan.features[language as keyof typeof plan.features] || plan.features.en;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-primary shadow-lg ring-2 ring-primary' 
                      : 'border-border/50 hover:border-primary/50'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {t('checkout.popular')}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span style={{ fontFamily: 'Plus Jakarta Sans' }}>{planName}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{planDesc}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      {plan.id === 'enterprise' ? (
                        <div className="text-3xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                          {t('checkout.custom')}
                        </div>
                      ) : (
                        <>
                          <span className="text-4xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                            €{billingInterval === 'yearly' ? getMonthlyEquivalent(price) : formatPrice(price)}
                          </span>
                          <span className="text-muted-foreground text-sm ml-2">
                            /{t('checkout.perMonth')}
                          </span>
                          {billingInterval === 'yearly' && (
                            <div className="text-sm text-muted-foreground mt-1">
                              €{formatPrice(price)} {t('checkout.billedYearly')}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Checkout Button */}
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-12"
            onClick={handleCheckout}
            disabled={createCheckout.isPending}
          >
            {createCheckout.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t('checkout.processing')}
              </>
            ) : (
              t('checkout.continue')
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            {t('checkout.testCard')}: 4242 4242 4242 4242
          </p>
        </div>
      </div>
    </div>
  );
}
