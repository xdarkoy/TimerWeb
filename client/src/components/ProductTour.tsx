import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  ChevronLeft, 
  ChevronRight, 
  X,
  LayoutDashboard,
  Clock,
  Calendar,
  BarChart3,
  CalendarClock
} from 'lucide-react';

interface ProductTourProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  id: number;
  image: string;
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
}

const tourSteps: TourStep[] = [
  {
    id: 1,
    image: '/images/tour-dashboard.png',
    icon: LayoutDashboard,
    titleKey: 'tour.step1.title',
    descriptionKey: 'tour.step1.description',
  },
  {
    id: 2,
    image: '/images/tour-timetracking.png',
    icon: Clock,
    titleKey: 'tour.step2.title',
    descriptionKey: 'tour.step2.description',
  },
  {
    id: 3,
    image: '/images/tour-absences.png',
    icon: Calendar,
    titleKey: 'tour.step3.title',
    descriptionKey: 'tour.step3.description',
  },
  {
    id: 4,
    image: '/images/tour-reports.png',
    icon: BarChart3,
    titleKey: 'tour.step4.title',
    descriptionKey: 'tour.step4.description',
  },
  {
    id: 5,
    image: '/images/tour-shifts.png',
    icon: CalendarClock,
    titleKey: 'tour.step5.title',
    descriptionKey: 'tour.step5.description',
  },
];

// Translations for tour
const tourTranslations = {
  de: {
    'tour.step1.title': 'Dashboard & Übersicht',
    'tour.step1.description': 'Ihr zentrales Cockpit: Sehen Sie auf einen Blick die Wochenstunden Ihres Teams, aktive Projekte, ausstehende Genehmigungen und wichtige Benachrichtigungen. Die intuitive Sidebar-Navigation führt Sie zu allen Funktionen.',
    'tour.step2.title': 'Zeiterfassung',
    'tour.step2.description': 'Erfassen Sie Arbeitszeiten mit der integrierten Stoppuhr oder tragen Sie Zeiten manuell ein. Ordnen Sie jede Buchung einem Projekt und einer Aufgabe zu. Die Wochenübersicht zeigt Ihnen sofort, wie viele Stunden Sie bereits gearbeitet haben.',
    'tour.step3.title': 'Abwesenheitsmanagement',
    'tour.step3.description': 'Beantragen Sie Urlaub, Homeoffice oder Krankmeldungen mit wenigen Klicks. Der Team-Kalender zeigt die Verfügbarkeit aller Kollegen. Ihr Resturlaub wird automatisch berechnet und angezeigt.',
    'tour.step4.title': 'Berichte & Analysen',
    'tour.step4.description': 'Umfangreiche Auswertungen für Management und Controlling: Stundenentwicklung, Projektverteilung, Team-Produktivität. Exportieren Sie Daten direkt nach DATEV, BMD oder als Excel/PDF für Ihre Lohnbuchhaltung.',
    'tour.step5.title': 'Schichtplanung',
    'tour.step5.description': 'Erstellen Sie Schichtpläne per Drag & Drop. Früh-, Spät- und Nachtschichten werden farblich unterschieden. Das System warnt automatisch bei Konflikten wie Überschneidungen oder Verstößen gegen Ruhezeiten.',
    'tour.navigation.prev': 'Zurück',
    'tour.navigation.next': 'Weiter',
    'tour.navigation.finish': 'Tour beenden',
    'tour.navigation.step': 'Schritt',
    'tour.navigation.of': 'von',
  },
  en: {
    'tour.step1.title': 'Dashboard & Overview',
    'tour.step1.description': 'Your central cockpit: See at a glance your team\'s weekly hours, active projects, pending approvals, and important notifications. The intuitive sidebar navigation guides you to all features.',
    'tour.step2.title': 'Time Tracking',
    'tour.step2.description': 'Track working hours with the integrated stopwatch or enter times manually. Assign each entry to a project and task. The weekly overview instantly shows how many hours you\'ve already worked.',
    'tour.step3.title': 'Absence Management',
    'tour.step3.description': 'Request vacation, home office, or sick leave with just a few clicks. The team calendar shows the availability of all colleagues. Your remaining vacation days are automatically calculated and displayed.',
    'tour.step4.title': 'Reports & Analytics',
    'tour.step4.description': 'Comprehensive evaluations for management and controlling: hour trends, project distribution, team productivity. Export data directly to DATEV, BMD, or as Excel/PDF for your payroll.',
    'tour.step5.title': 'Shift Planning',
    'tour.step5.description': 'Create shift schedules via drag & drop. Early, late, and night shifts are color-coded. The system automatically warns of conflicts such as overlaps or violations of rest periods.',
    'tour.navigation.prev': 'Previous',
    'tour.navigation.next': 'Next',
    'tour.navigation.finish': 'Finish Tour',
    'tour.navigation.step': 'Step',
    'tour.navigation.of': 'of',
  },
  hr: {
    'tour.step1.title': 'Nadzorna ploča i pregled',
    'tour.step1.description': 'Vaš centralni kokpit: Pogledajte na prvi pogled tjedne sate vašeg tima, aktivne projekte, odobrenja na čekanju i važne obavijesti. Intuitivna bočna navigacija vodi vas do svih funkcija.',
    'tour.step2.title': 'Evidencija radnog vremena',
    'tour.step2.description': 'Pratite radno vrijeme s integriranom štopericom ili unesite vrijeme ručno. Dodijelite svaki unos projektu i zadatku. Tjedni pregled odmah pokazuje koliko ste sati već radili.',
    'tour.step3.title': 'Upravljanje odsutnostima',
    'tour.step3.description': 'Zatražite godišnji odmor, rad od kuće ili bolovanje u samo nekoliko klikova. Timski kalendar prikazuje dostupnost svih kolega. Vaši preostali dani godišnjeg odmora automatski se izračunavaju i prikazuju.',
    'tour.step4.title': 'Izvještaji i analitika',
    'tour.step4.description': 'Sveobuhvatne evaluacije za menadžment i kontroling: trendovi sati, distribucija projekata, produktivnost tima. Izvezite podatke izravno u JOPPD, ili kao Excel/PDF za vašu obračun plaća.',
    'tour.step5.title': 'Planiranje smjena',
    'tour.step5.description': 'Kreirajte rasporede smjena povlačenjem i ispuštanjem. Rane, kasne i noćne smjene označene su bojama. Sustav automatski upozorava na konflikte poput preklapanja ili kršenja razdoblja odmora.',
    'tour.navigation.prev': 'Prethodno',
    'tour.navigation.next': 'Sljedeće',
    'tour.navigation.finish': 'Završi obilazak',
    'tour.navigation.step': 'Korak',
    'tour.navigation.of': 'od',
  },
};

export default function ProductTour({ isOpen, onClose }: ProductTourProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const t = (key: string) => {
    const lang = language as keyof typeof tourTranslations;
    return tourTranslations[lang]?.[key as keyof typeof tourTranslations['de']] || key;
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const currentTourStep = tourSteps[currentStep];
  const StepIcon = currentTourStep.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white">
        <DialogTitle className="sr-only">Produkt-Tour</DialogTitle>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left: Image */}
          <div className="lg:w-3/5 bg-gradient-to-br from-slate-100 to-slate-200 p-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <img
                  src={currentTourStep.image}
                  alt={t(currentTourStep.titleKey)}
                  className="w-full rounded-xl shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Content */}
          <div className="lg:w-2/5 p-8 flex flex-col">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {tourSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-primary w-8'
                      : index < currentStep
                      ? 'bg-primary/50'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
              <span className="ml-auto text-sm text-muted-foreground">
                {t('tour.navigation.step')} {currentStep + 1} {t('tour.navigation.of')} {tourSteps.length}
              </span>
            </div>

            {/* Icon & Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <StepIcon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 
                  className="text-2xl font-bold text-foreground mb-4"
                  style={{ fontFamily: 'Plus Jakarta Sans' }}
                >
                  {t(currentTourStep.titleKey)}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {t(currentTourStep.descriptionKey)}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                {t('tour.navigation.prev')}
              </Button>

              {currentStep === tourSteps.length - 1 ? (
                <Button onClick={handleClose} className="bg-primary hover:bg-primary/90 gap-2">
                  {t('tour.navigation.finish')}
                </Button>
              ) : (
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 gap-2">
                  {t('tour.navigation.next')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
