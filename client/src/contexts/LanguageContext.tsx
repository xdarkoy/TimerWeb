import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'de' | 'en' | 'hr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    'nav.features': 'Funktionen',
    'nav.pricing': 'Preise',
    'nav.compliance': 'Compliance',
    'nav.mobile': 'Mobile App',
    'nav.contact': 'Kontakt',
    'nav.login': 'Anmelden',
    'nav.demo': 'Demo anfordern',
    
    // Hero
    'hero.badge': 'Für DE, AT & HR',
    'hero.title': 'Zeiterfassung, die Ihr Unternehmen verdient',
    'hero.subtitle': 'Die zentrale Lösung für Zeiterfassung, Abwesenheitsmanagement und Projekt-Controlling. Rechtssicher für Deutschland, Österreich und Kroatien.',
    'hero.cta.primary': 'Kostenlos testen',
    'hero.cta.secondary': 'Demo ansehen',
    'hero.stats.companies': 'Unternehmen',
    'hero.stats.employees': 'Mitarbeiter',
    'hero.stats.hours': 'Stunden erfasst',
    
    // Features
    'features.title': 'Alles, was Sie für professionelle Zeiterfassung brauchen',
    'features.subtitle': 'Von der einfachen Stoppuhr bis zum komplexen Schichtplan – Timer passt sich Ihren Anforderungen an.',
    'features.time.title': 'Zeiterfassung',
    'features.time.desc': 'Stoppuhr, manuelle Eingabe oder NFC-Terminal. Flexibel für jeden Arbeitsplatz.',
    'features.absence.title': 'Abwesenheiten',
    'features.absence.desc': 'Urlaub, Krankheit, Homeoffice. Digitale Anträge mit automatischer Genehmigung.',
    'features.projects.title': 'Projekte',
    'features.projects.desc': 'Zeitbudgets, Kostenrechnung und Auswertungen pro Projekt und Kunde.',
    'features.reports.title': 'Berichte & Export',
    'features.reports.desc': 'DATEV, BMD, JOPPD. Nahtlose Integration in Ihre Lohnbuchhaltung.',
    'features.shifts.title': 'Schichtplanung',
    'features.shifts.desc': 'Drag & Drop Planung, Tausch-Anfragen und automatische Konfliktprüfung.',
    'features.compliance.title': 'Compliance',
    'features.compliance.desc': 'ArbZG, AZG, Zakon o radu. Automatische Warnungen bei Verstößen.',
    
    // Compliance Section
    'compliance.title': 'Rechtssicher in drei Ländern',
    'compliance.subtitle': 'Timer kennt die Arbeitsgesetze in Deutschland, Österreich und Kroatien – und warnt Sie automatisch vor Verstößen.',
    'compliance.de.title': 'Deutschland',
    'compliance.de.law': 'Arbeitszeitgesetz (ArbZG)',
    'compliance.de.features': 'Max. 10h/Tag • 11h Ruhezeit • GoBD-konform',
    'compliance.at.title': 'Österreich',
    'compliance.at.law': 'Arbeitszeitgesetz (AZG)',
    'compliance.at.features': 'All-In Verträge • 11h Ruhezeit • BMD Export',
    'compliance.hr.title': 'Kroatien',
    'compliance.hr.law': 'Zakon o radu',
    'compliance.hr.features': '12h Ruhezeit • JOPPD Export • Dnevnice',
    
    // Mobile Section
    'mobile.badge': 'TimerMobile',
    'mobile.title': 'NFC Check-in für Ihr Unternehmen',
    'mobile.subtitle': 'Mitarbeiter stempeln per NFC-Karte oder PIN am Tablet. Offline-fähig mit automatischer Synchronisation.',
    'mobile.feature1': 'NFC & PIN Authentifizierung',
    'mobile.feature2': 'Offline-First Architektur',
    'mobile.feature3': 'Echtzeit-Synchronisation',
    'mobile.feature4': 'Mehrere Standorte',
    
    // Pricing
    'pricing.title': 'Transparente Preise',
    'pricing.subtitle': 'Keine versteckten Kosten. Monatlich kündbar.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.price': '4,90',
    'pricing.starter.period': 'pro Mitarbeiter/Monat',
    'pricing.starter.desc': 'Für kleine Teams',
    'pricing.starter.f1': 'Bis 10 Mitarbeiter',
    'pricing.starter.f2': 'Zeiterfassung & Stoppuhr',
    'pricing.starter.f3': 'Urlaubsverwaltung',
    'pricing.starter.f4': 'Basis-Berichte',
    'pricing.professional.name': 'Professional',
    'pricing.professional.price': '9,90',
    'pricing.professional.period': 'pro Mitarbeiter/Monat',
    'pricing.professional.desc': 'Für wachsende Unternehmen',
    'pricing.professional.f1': 'Unbegrenzte Mitarbeiter',
    'pricing.professional.f2': 'Alles aus Starter',
    'pricing.professional.f3': 'Projekte & Kunden',
    'pricing.professional.f4': 'DATEV/BMD/JOPPD Export',
    'pricing.professional.f5': 'Schichtplanung',
    'pricing.professional.f6': 'API-Zugang',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Individuell',
    'pricing.enterprise.period': 'auf Anfrage',
    'pricing.enterprise.desc': 'Für große Organisationen',
    'pricing.enterprise.f1': 'Alles aus Professional',
    'pricing.enterprise.f2': 'Dedicated Support',
    'pricing.enterprise.f3': 'On-Premise Option',
    'pricing.enterprise.f4': 'Custom Integrationen',
    'pricing.enterprise.f5': 'SLA 99,9% Uptime',
    'pricing.cta': 'Jetzt starten',
    'pricing.cta.contact': 'Kontakt aufnehmen',
    'pricing.popular': 'Beliebt',
    
    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    'faq.q1': 'Kann ich Timer kostenlos testen?',
    'faq.a1': 'Ja! Sie können Timer 14 Tage lang kostenlos und unverbindlich testen. Keine Kreditkarte erforderlich.',
    'faq.q2': 'Welche Exporte werden unterstützt?',
    'faq.a2': 'Timer unterstützt DATEV (DE), BMD (AT) und JOPPD (HR) für die nahtlose Integration in Ihre Lohnbuchhaltung.',
    'faq.q3': 'Ist Timer DSGVO-konform?',
    'faq.a3': 'Ja, Timer ist vollständig DSGVO-konform. Alle Daten werden in der EU gespeichert und verarbeitet.',
    'faq.q4': 'Kann ich Timer auch offline nutzen?',
    'faq.a4': 'Mit TimerMobile können Ihre Mitarbeiter auch ohne Internetverbindung stempeln. Die Daten werden automatisch synchronisiert.',
    
    // CTA
    'cta.title': 'Bereit für professionelle Zeiterfassung?',
    'cta.subtitle': 'Starten Sie noch heute und sparen Sie bis zu 5 Stunden pro Woche bei der Personalverwaltung.',
    'cta.button': 'Kostenlos starten',
    
    // Footer
    'footer.product': 'Produkt',
    'footer.company': 'Unternehmen',
    'footer.legal': 'Rechtliches',
    'footer.about': 'Über uns',
    'footer.careers': 'Karriere',
    'footer.blog': 'Blog',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.imprint': 'Impressum',
    'footer.copyright': '© 2026 Timer. Alle Rechte vorbehalten.',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.compliance': 'Compliance',
    'nav.mobile': 'Mobile App',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.demo': 'Request Demo',
    
    // Hero
    'hero.badge': 'For DE, AT & HR',
    'hero.title': 'Time Tracking Your Business Deserves',
    'hero.subtitle': 'The central solution for time tracking, absence management, and project controlling. Legally compliant for Germany, Austria, and Croatia.',
    'hero.cta.primary': 'Start Free Trial',
    'hero.cta.secondary': 'Watch Demo',
    'hero.stats.companies': 'Companies',
    'hero.stats.employees': 'Employees',
    'hero.stats.hours': 'Hours Tracked',
    
    // Features
    'features.title': 'Everything You Need for Professional Time Tracking',
    'features.subtitle': 'From simple stopwatch to complex shift planning – Timer adapts to your requirements.',
    'features.time.title': 'Time Tracking',
    'features.time.desc': 'Stopwatch, manual entry, or NFC terminal. Flexible for every workplace.',
    'features.absence.title': 'Absences',
    'features.absence.desc': 'Vacation, sick leave, home office. Digital requests with automatic approval.',
    'features.projects.title': 'Projects',
    'features.projects.desc': 'Time budgets, cost accounting, and reports per project and client.',
    'features.reports.title': 'Reports & Export',
    'features.reports.desc': 'DATEV, BMD, JOPPD. Seamless integration with your payroll.',
    'features.shifts.title': 'Shift Planning',
    'features.shifts.desc': 'Drag & drop planning, swap requests, and automatic conflict detection.',
    'features.compliance.title': 'Compliance',
    'features.compliance.desc': 'ArbZG, AZG, Zakon o radu. Automatic warnings for violations.',
    
    // Compliance Section
    'compliance.title': 'Legally Compliant in Three Countries',
    'compliance.subtitle': 'Timer knows the labor laws in Germany, Austria, and Croatia – and automatically warns you of violations.',
    'compliance.de.title': 'Germany',
    'compliance.de.law': 'Working Hours Act (ArbZG)',
    'compliance.de.features': 'Max. 10h/day • 11h rest • GoBD compliant',
    'compliance.at.title': 'Austria',
    'compliance.at.law': 'Working Hours Act (AZG)',
    'compliance.at.features': 'All-in contracts • 11h rest • BMD export',
    'compliance.hr.title': 'Croatia',
    'compliance.hr.law': 'Labor Act (Zakon o radu)',
    'compliance.hr.features': '12h rest • JOPPD export • Per diem',
    
    // Mobile Section
    'mobile.badge': 'TimerMobile',
    'mobile.title': 'NFC Check-in for Your Business',
    'mobile.subtitle': 'Employees clock in via NFC card or PIN on tablet. Works offline with automatic sync.',
    'mobile.feature1': 'NFC & PIN Authentication',
    'mobile.feature2': 'Offline-First Architecture',
    'mobile.feature3': 'Real-time Synchronization',
    'mobile.feature4': 'Multiple Locations',
    
    // Pricing
    'pricing.title': 'Transparent Pricing',
    'pricing.subtitle': 'No hidden costs. Cancel monthly.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.price': '4.90',
    'pricing.starter.period': 'per employee/month',
    'pricing.starter.desc': 'For small teams',
    'pricing.starter.f1': 'Up to 10 employees',
    'pricing.starter.f2': 'Time tracking & stopwatch',
    'pricing.starter.f3': 'Vacation management',
    'pricing.starter.f4': 'Basic reports',
    'pricing.professional.name': 'Professional',
    'pricing.professional.price': '9.90',
    'pricing.professional.period': 'per employee/month',
    'pricing.professional.desc': 'For growing businesses',
    'pricing.professional.f1': 'Unlimited employees',
    'pricing.professional.f2': 'Everything in Starter',
    'pricing.professional.f3': 'Projects & clients',
    'pricing.professional.f4': 'DATEV/BMD/JOPPD export',
    'pricing.professional.f5': 'Shift planning',
    'pricing.professional.f6': 'API access',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Custom',
    'pricing.enterprise.period': 'on request',
    'pricing.enterprise.desc': 'For large organizations',
    'pricing.enterprise.f1': 'Everything in Professional',
    'pricing.enterprise.f2': 'Dedicated support',
    'pricing.enterprise.f3': 'On-premise option',
    'pricing.enterprise.f4': 'Custom integrations',
    'pricing.enterprise.f5': 'SLA 99.9% uptime',
    'pricing.cta': 'Get Started',
    'pricing.cta.contact': 'Contact Sales',
    'pricing.popular': 'Popular',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Can I try Timer for free?',
    'faq.a1': 'Yes! You can try Timer free for 14 days with no obligation. No credit card required.',
    'faq.q2': 'Which exports are supported?',
    'faq.a2': 'Timer supports DATEV (DE), BMD (AT), and JOPPD (HR) for seamless payroll integration.',
    'faq.q3': 'Is Timer GDPR compliant?',
    'faq.a3': 'Yes, Timer is fully GDPR compliant. All data is stored and processed in the EU.',
    'faq.q4': 'Can I use Timer offline?',
    'faq.a4': 'With TimerMobile, your employees can clock in even without internet. Data syncs automatically.',
    
    // CTA
    'cta.title': 'Ready for Professional Time Tracking?',
    'cta.subtitle': 'Start today and save up to 5 hours per week on HR administration.',
    'cta.button': 'Start Free',
    
    // Footer
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.imprint': 'Imprint',
    'footer.copyright': '© 2026 Timer. All rights reserved.',
  },
  hr: {
    // Navigation
    'nav.features': 'Značajke',
    'nav.pricing': 'Cijene',
    'nav.compliance': 'Usklađenost',
    'nav.mobile': 'Mobilna aplikacija',
    'nav.contact': 'Kontakt',
    'nav.login': 'Prijava',
    'nav.demo': 'Zatraži demo',
    
    // Hero
    'hero.badge': 'Za DE, AT i HR',
    'hero.title': 'Evidencija radnog vremena koju vaše poduzeće zaslužuje',
    'hero.subtitle': 'Centralno rješenje za evidenciju radnog vremena, upravljanje odsutnostima i kontrolu projekata. Pravno usklađeno za Njemačku, Austriju i Hrvatsku.',
    'hero.cta.primary': 'Isprobaj besplatno',
    'hero.cta.secondary': 'Pogledaj demo',
    'hero.stats.companies': 'Tvrtki',
    'hero.stats.employees': 'Zaposlenika',
    'hero.stats.hours': 'Evidentiranih sati',
    
    // Features
    'features.title': 'Sve što trebate za profesionalnu evidenciju radnog vremena',
    'features.subtitle': 'Od jednostavne štoperice do složenog planiranja smjena – Timer se prilagođava vašim zahtjevima.',
    'features.time.title': 'Evidencija vremena',
    'features.time.desc': 'Štoperica, ručni unos ili NFC terminal. Fleksibilno za svako radno mjesto.',
    'features.absence.title': 'Odsutnosti',
    'features.absence.desc': 'Godišnji odmor, bolovanje, rad od kuće. Digitalni zahtjevi s automatskim odobrenjem.',
    'features.projects.title': 'Projekti',
    'features.projects.desc': 'Vremenski budžeti, obračun troškova i izvještaji po projektu i klijentu.',
    'features.reports.title': 'Izvještaji i izvoz',
    'features.reports.desc': 'DATEV, BMD, JOPPD. Besprijekorna integracija s vašom platnom listom.',
    'features.shifts.title': 'Planiranje smjena',
    'features.shifts.desc': 'Drag & drop planiranje, zahtjevi za zamjenu i automatska provjera sukoba.',
    'features.compliance.title': 'Usklađenost',
    'features.compliance.desc': 'ArbZG, AZG, Zakon o radu. Automatska upozorenja za prekršaje.',
    
    // Compliance Section
    'compliance.title': 'Pravno usklađeno u tri zemlje',
    'compliance.subtitle': 'Timer poznaje zakone o radu u Njemačkoj, Austriji i Hrvatskoj – i automatski vas upozorava na prekršaje.',
    'compliance.de.title': 'Njemačka',
    'compliance.de.law': 'Zakon o radnom vremenu (ArbZG)',
    'compliance.de.features': 'Max. 10h/dan • 11h odmora • GoBD sukladno',
    'compliance.at.title': 'Austrija',
    'compliance.at.law': 'Zakon o radnom vremenu (AZG)',
    'compliance.at.features': 'All-in ugovori • 11h odmora • BMD izvoz',
    'compliance.hr.title': 'Hrvatska',
    'compliance.hr.law': 'Zakon o radu',
    'compliance.hr.features': '12h odmora • JOPPD izvoz • Dnevnice',
    
    // Mobile Section
    'mobile.badge': 'TimerMobile',
    'mobile.title': 'NFC prijava za vaše poduzeće',
    'mobile.subtitle': 'Zaposlenici se prijavljuju NFC karticom ili PIN-om na tabletu. Radi offline s automatskom sinkronizacijom.',
    'mobile.feature1': 'NFC i PIN autentifikacija',
    'mobile.feature2': 'Offline-first arhitektura',
    'mobile.feature3': 'Sinkronizacija u stvarnom vremenu',
    'mobile.feature4': 'Više lokacija',
    
    // Pricing
    'pricing.title': 'Transparentne cijene',
    'pricing.subtitle': 'Bez skrivenih troškova. Mjesečni otkaz.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.price': '4,90',
    'pricing.starter.period': 'po zaposleniku/mjesečno',
    'pricing.starter.desc': 'Za male timove',
    'pricing.starter.f1': 'Do 10 zaposlenika',
    'pricing.starter.f2': 'Evidencija vremena i štoperica',
    'pricing.starter.f3': 'Upravljanje godišnjim odmorom',
    'pricing.starter.f4': 'Osnovni izvještaji',
    'pricing.professional.name': 'Professional',
    'pricing.professional.price': '9,90',
    'pricing.professional.period': 'po zaposleniku/mjesečno',
    'pricing.professional.desc': 'Za rastuća poduzeća',
    'pricing.professional.f1': 'Neograničen broj zaposlenika',
    'pricing.professional.f2': 'Sve iz Startera',
    'pricing.professional.f3': 'Projekti i klijenti',
    'pricing.professional.f4': 'DATEV/BMD/JOPPD izvoz',
    'pricing.professional.f5': 'Planiranje smjena',
    'pricing.professional.f6': 'API pristup',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Individualno',
    'pricing.enterprise.period': 'na upit',
    'pricing.enterprise.desc': 'Za velike organizacije',
    'pricing.enterprise.f1': 'Sve iz Professionala',
    'pricing.enterprise.f2': 'Dedicirani support',
    'pricing.enterprise.f3': 'On-premise opcija',
    'pricing.enterprise.f4': 'Prilagođene integracije',
    'pricing.enterprise.f5': 'SLA 99,9% uptime',
    'pricing.cta': 'Započni sada',
    'pricing.cta.contact': 'Kontaktiraj prodaju',
    'pricing.popular': 'Popularno',
    
    // FAQ
    'faq.title': 'Često postavljana pitanja',
    'faq.q1': 'Mogu li isprobati Timer besplatno?',
    'faq.a1': 'Da! Možete isprobati Timer besplatno 14 dana bez obveze. Nije potrebna kreditna kartica.',
    'faq.q2': 'Koji su izvozi podržani?',
    'faq.a2': 'Timer podržava DATEV (DE), BMD (AT) i JOPPD (HR) za besprijekornu integraciju s platnom listom.',
    'faq.q3': 'Je li Timer usklađen s GDPR-om?',
    'faq.a3': 'Da, Timer je potpuno usklađen s GDPR-om. Svi podaci se pohranjuju i obrađuju u EU.',
    'faq.q4': 'Mogu li koristiti Timer offline?',
    'faq.a4': 'S TimerMobile, vaši zaposlenici mogu se prijaviti i bez interneta. Podaci se automatski sinkroniziraju.',
    
    // CTA
    'cta.title': 'Spremni za profesionalnu evidenciju radnog vremena?',
    'cta.subtitle': 'Započnite danas i uštedite do 5 sati tjedno na administraciji ljudskih resursa.',
    'cta.button': 'Započni besplatno',
    
    // Footer
    'footer.product': 'Proizvod',
    'footer.company': 'Tvrtka',
    'footer.legal': 'Pravno',
    'footer.about': 'O nama',
    'footer.careers': 'Karijere',
    'footer.blog': 'Blog',
    'footer.privacy': 'Politika privatnosti',
    'footer.terms': 'Uvjeti korištenja',
    'footer.imprint': 'Impressum',
    'footer.copyright': '© 2026 Timer. Sva prava pridržana.',
  },
};

// Detect language from browser/geolocation
async function detectLanguage(): Promise<Language> {
  // 1. Check localStorage
  const stored = localStorage.getItem('timer-language');
  if (stored && ['de', 'en', 'hr'].includes(stored)) {
    return stored as Language;
  }

  // 2. Try geolocation API
  try {
    const response = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    const data = await response.json();
    const countryCode = data.country_code?.toLowerCase();
    
    if (countryCode === 'de') return 'de';
    if (countryCode === 'at') return 'de';
    if (countryCode === 'ch') return 'de';
    if (countryCode === 'hr') return 'hr';
    if (countryCode === 'ba') return 'hr';
    if (countryCode === 'rs') return 'hr';
    if (countryCode === 'si') return 'hr';
  } catch {
    // Fallback to browser language
  }

  // 3. Check browser language
  const browserLang = navigator.language?.toLowerCase().split('-')[0];
  if (browserLang === 'de') return 'de';
  if (browserLang === 'hr') return 'hr';
  
  // 4. Default to German
  return 'de';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectLanguage().then((lang) => {
      setLanguageState(lang);
      setIsLoading(false);
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('timer-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
