import { useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductTour from '@/components/ProductTour';
import DemoRequestModal from '@/components/DemoRequestModal';
import { 
  Clock, Calendar, FolderKanban, FileBarChart, 
  CalendarClock, Shield, Check, ArrowRight,
  Smartphone, Wifi, WifiOff, MapPin, ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Design: Corporate Tech Minimalism
 * - Deep Blue (#1E40AF) + Cyan (#06B6D4) color scheme
 * - Plus Jakarta Sans for headings, Inter for body
 * - Glassmorphism cards, subtle shadows
 * - Asymmetric layouts, bento grids
 */

export default function Home() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleStartClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onDemoClick={() => setIsDemoModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/images/hero-gradient.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                {t('hero.badge')}
              </div>
              
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {t('hero.title')}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-lg px-8"
                  onClick={handleStartClick}
                >
                  {t('hero.cta.primary')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  {t('hero.cta.secondary')}
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">{t('hero.stats.companies')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    25k+
                  </div>
                  <div className="text-sm text-muted-foreground">{t('hero.stats.employees')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    2M+
                  </div>
                  <div className="text-sm text-muted-foreground">{t('hero.stats.hours')}</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right: Dashboard Screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <img 
                  src="/images/hero-dashboard.png" 
                  alt="Timer Dashboard"
                  className="w-full"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {t('features.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>
          
          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, titleKey: 'features.time.title', descKey: 'features.time.desc', accent: 'bg-primary' },
              { icon: Calendar, titleKey: 'features.absence.title', descKey: 'features.absence.desc', accent: 'bg-accent' },
              { icon: FolderKanban, titleKey: 'features.projects.title', descKey: 'features.projects.desc', accent: 'bg-primary' },
              { icon: FileBarChart, titleKey: 'features.reports.title', descKey: 'features.reports.desc', accent: 'bg-accent' },
              { icon: CalendarClock, titleKey: 'features.shifts.title', descKey: 'features.shifts.desc', accent: 'bg-primary' },
              { icon: Shield, titleKey: 'features.compliance.title', descKey: 'features.compliance.desc', accent: 'bg-accent' },
            ].map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift bg-card border-border/50">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${feature.accent} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 
                      className="text-xl font-semibold text-foreground mb-2"
                      style={{ fontFamily: 'Plus Jakarta Sans' }}
                    >
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(feature.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/images/feature-compliance.png" 
                alt="Compliance"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
            
            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {t('compliance.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('compliance.subtitle')}
              </p>
              
              <div className="space-y-6">
                {[
                  { country: 'de', flag: '🇩🇪' },
                  { country: 'at', flag: '🇦🇹' },
                  { country: 'hr', flag: '🇭🇷' },
                ].map((item) => (
                  <div key={item.country} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                    <span className="text-3xl">{item.flag}</span>
                    <div>
                      <h4 className="font-semibold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                        {t(`compliance.${item.country}.title`)}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t(`compliance.${item.country}.law`)}
                      </p>
                      <p className="text-sm text-primary font-medium">
                        {t(`compliance.${item.country}.features`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="py-20 lg:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                {t('mobile.badge')}
              </div>
              
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {t('mobile.title')}
              </h2>
              <p className="text-lg opacity-90 mb-8">
                {t('mobile.subtitle')}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, key: 'mobile.feature1' },
                  { icon: WifiOff, key: 'mobile.feature2' },
                  { icon: Wifi, key: 'mobile.feature3' },
                  { icon: MapPin, key: 'mobile.feature4' },
                ].map((feature) => (
                  <div key={feature.key} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{t(feature.key)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Right: Tablet Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src="/images/mobile-terminal.png" 
                alt="TimerMobile NFC Terminal"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {t('pricing.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    {t('pricing.starter.name')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('pricing.starter.desc')}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      €{t('pricing.starter.price')}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {t('pricing.starter.period')}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {['f1', 'f2', 'f3', 'f4'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        {t(`pricing.starter.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full" onClick={handleStartClick}>
                    {t('pricing.cta')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Professional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-primary shadow-lg relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {t('pricing.popular')}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    {t('pricing.professional.name')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('pricing.professional.desc')}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      €{t('pricing.professional.price')}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {t('pricing.professional.period')}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        {t(`pricing.professional.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleStartClick}>
                    {t('pricing.cta')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    {t('pricing.enterprise.name')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('pricing.enterprise.desc')}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      {t('pricing.enterprise.price')}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {t('pricing.enterprise.period')}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {['f1', 'f2', 'f3', 'f4', 'f5'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        {t(`pricing.enterprise.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full" onClick={() => setIsDemoModalOpen(true)}>
                    {t('pricing.cta.contact')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {t('faq.title')}
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[1, 2, 3, 4].map((num) => (
                <AccordionItem key={num} value={`item-${num}`} className="bg-card rounded-xl border border-border/50 px-6">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {t(`faq.q${num}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t(`faq.a${num}`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary to-accent p-12 lg:p-20 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {t('cta.title')}
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
                onClick={() => setIsDemoModalOpen(true)}
              >
                {t('cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <ProductTour 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}
