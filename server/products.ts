/**
 * Timer Subscription Products and Prices
 * 
 * Diese Datei definiert alle verfügbaren Abonnement-Pläne für Timer.
 * Die Preise werden dynamisch in Stripe erstellt, wenn sie noch nicht existieren.
 */

export interface PricingPlan {
  id: string;
  name: {
    de: string;
    en: string;
    hr: string;
  };
  description: {
    de: string;
    en: string;
    hr: string;
  };
  priceMonthly: number; // in cents
  priceYearly: number; // in cents (with discount)
  currency: string;
  features: {
    de: string[];
    en: string[];
    hr: string[];
  };
  maxEmployees: number;
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: {
      de: 'Starter',
      en: 'Starter',
      hr: 'Starter',
    },
    description: {
      de: 'Für kleine Teams und Startups',
      en: 'For small teams and startups',
      hr: 'Za male timove i startupe',
    },
    priceMonthly: 900, // €9/month
    priceYearly: 9000, // €90/year (€7.50/month, 17% discount)
    currency: 'eur',
    features: {
      de: [
        'Bis zu 10 Mitarbeiter',
        'Zeiterfassung',
        'Urlaubsverwaltung',
        'Basis-Reports',
      ],
      en: [
        'Up to 10 employees',
        'Time tracking',
        'Leave management',
        'Basic reports',
      ],
      hr: [
        'Do 10 zaposlenika',
        'Evidencija radnog vremena',
        'Upravljanje godišnjim odmorom',
        'Osnovni izvještaji',
      ],
    },
    maxEmployees: 10,
  },
  {
    id: 'professional',
    name: {
      de: 'Professional',
      en: 'Professional',
      hr: 'Professional',
    },
    description: {
      de: 'Für wachsende Unternehmen',
      en: 'For growing businesses',
      hr: 'Za rastuće tvrtke',
    },
    priceMonthly: 2900, // €29/month
    priceYearly: 29000, // €290/year (€24.17/month, 17% discount)
    currency: 'eur',
    features: {
      de: [
        'Bis zu 50 Mitarbeiter',
        'Alle Starter-Features',
        'Projektzeiterfassung',
        'DATEV/BMD Export',
        'Schichtplanung',
        'Compliance-Warnungen',
      ],
      en: [
        'Up to 50 employees',
        'All Starter features',
        'Project time tracking',
        'DATEV/BMD export',
        'Shift planning',
        'Compliance alerts',
      ],
      hr: [
        'Do 50 zaposlenika',
        'Sve Starter značajke',
        'Praćenje vremena po projektima',
        'JOPPD izvoz',
        'Planiranje smjena',
        'Upozorenja o usklađenosti',
      ],
    },
    maxEmployees: 50,
    popular: true,
  },
  {
    id: 'enterprise',
    name: {
      de: 'Enterprise',
      en: 'Enterprise',
      hr: 'Enterprise',
    },
    description: {
      de: 'Für große Unternehmen',
      en: 'For large organizations',
      hr: 'Za velike organizacije',
    },
    priceMonthly: 9900, // €99/month
    priceYearly: 99000, // €990/year (€82.50/month, 17% discount)
    currency: 'eur',
    features: {
      de: [
        'Unbegrenzte Mitarbeiter',
        'Alle Professional-Features',
        'NFC Terminal-App',
        'API-Zugang',
        'SSO/SAML',
        'Dedizierter Support',
        'SLA 99.9%',
      ],
      en: [
        'Unlimited employees',
        'All Professional features',
        'NFC Terminal app',
        'API access',
        'SSO/SAML',
        'Dedicated support',
        'SLA 99.9%',
      ],
      hr: [
        'Neograničen broj zaposlenika',
        'Sve Professional značajke',
        'NFC Terminal aplikacija',
        'API pristup',
        'SSO/SAML',
        'Posvećena podrška',
        'SLA 99.9%',
      ],
    },
    maxEmployees: Infinity,
  },
];

export function getPlanById(planId: string): PricingPlan | undefined {
  return PRICING_PLANS.find(plan => plan.id === planId);
}

export function getPlanPrice(planId: string, interval: 'monthly' | 'yearly'): number {
  const plan = getPlanById(planId);
  if (!plan) return 0;
  return interval === 'yearly' ? plan.priceYearly : plan.priceMonthly;
}
