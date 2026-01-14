import { useLanguage } from '@/contexts/LanguageContext';
import { Clock } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Timer
              </span>
            </a>
            <p className="text-sm text-background/60 leading-relaxed">
              Zeiterfassung für Unternehmen in Deutschland, Österreich und Kroatien.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {t('footer.product')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('nav.features')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('nav.pricing')}
                </a>
              </li>
              <li>
                <a href="#mobile" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('nav.mobile')}
                </a>
              </li>
              <li>
                <a href="#compliance" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('nav.compliance')}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('footer.careers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t('footer.imprint')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-background/60">Made with ❤️ in DACH & HR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
