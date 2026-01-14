import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Loader2, Building2, Users, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Add translations for the form
const formTranslations = {
  de: {
    title: 'Demo anfordern',
    subtitle: 'Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    company: 'Unternehmen',
    companyPlaceholder: 'Ihr Unternehmen',
    name: 'Ihr Name',
    namePlaceholder: 'Max Mustermann',
    email: 'E-Mail',
    emailPlaceholder: 'max@unternehmen.de',
    phone: 'Telefon (optional)',
    phonePlaceholder: '+49 123 456789',
    employees: 'Anzahl Mitarbeiter',
    employeesPlaceholder: 'Bitte wählen',
    employees1: '1-10',
    employees2: '11-50',
    employees3: '51-200',
    employees4: '201-500',
    employees5: '500+',
    country: 'Land',
    countryPlaceholder: 'Bitte wählen',
    message: 'Nachricht (optional)',
    messagePlaceholder: 'Erzählen Sie uns von Ihren Anforderungen...',
    submit: 'Demo anfordern',
    submitting: 'Wird gesendet...',
    success: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
    error: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
  },
  en: {
    title: 'Request Demo',
    subtitle: 'Fill out the form and we\'ll get back to you within 24 hours.',
    company: 'Company',
    companyPlaceholder: 'Your company',
    name: 'Your Name',
    namePlaceholder: 'John Doe',
    email: 'Email',
    emailPlaceholder: 'john@company.com',
    phone: 'Phone (optional)',
    phonePlaceholder: '+1 123 456789',
    employees: 'Number of Employees',
    employeesPlaceholder: 'Please select',
    employees1: '1-10',
    employees2: '11-50',
    employees3: '51-200',
    employees4: '201-500',
    employees5: '500+',
    country: 'Country',
    countryPlaceholder: 'Please select',
    message: 'Message (optional)',
    messagePlaceholder: 'Tell us about your requirements...',
    submit: 'Request Demo',
    submitting: 'Submitting...',
    success: 'Thank you! We\'ll get back to you shortly.',
    error: 'Something went wrong. Please try again.',
  },
  hr: {
    title: 'Zatraži demo',
    subtitle: 'Ispunite obrazac i javit ćemo vam se unutar 24 sata.',
    company: 'Tvrtka',
    companyPlaceholder: 'Vaša tvrtka',
    name: 'Vaše ime',
    namePlaceholder: 'Ivan Horvat',
    email: 'E-mail',
    emailPlaceholder: 'ivan@tvrtka.hr',
    phone: 'Telefon (opcionalno)',
    phonePlaceholder: '+385 1 234567',
    employees: 'Broj zaposlenika',
    employeesPlaceholder: 'Molimo odaberite',
    employees1: '1-10',
    employees2: '11-50',
    employees3: '51-200',
    employees4: '201-500',
    employees5: '500+',
    country: 'Država',
    countryPlaceholder: 'Molimo odaberite',
    message: 'Poruka (opcionalno)',
    messagePlaceholder: 'Recite nam o vašim zahtjevima...',
    submit: 'Zatraži demo',
    submitting: 'Šalje se...',
    success: 'Hvala! Javit ćemo vam se uskoro.',
    error: 'Nešto je pošlo po zlu. Molimo pokušajte ponovo.',
  },
};

export default function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const { language } = useLanguage();
  const t = formTranslations[language];
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    employees: '',
    country: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, you would send this to your backend:
    // await fetch('/api/demo-request', { method: 'POST', body: JSON.stringify(formData) });
    
    console.log('Demo request submitted:', formData);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success(t.success);
    
    // Reset and close after delay
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        employees: '',
        country: '',
        message: '',
      });
      onClose();
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {t.title}
          </DialogTitle>
          <DialogDescription>
            {t.subtitle}
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-medium text-foreground">{t.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                {t.company}
              </Label>
              <Input
                id="company"
                placeholder={t.companyPlaceholder}
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                required
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  {t.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {t.phone}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Employees & Country */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {t.employees}
                </Label>
                <Select value={formData.employees} onValueChange={(v) => handleChange('employees', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.employeesPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">{t.employees1}</SelectItem>
                    <SelectItem value="11-50">{t.employees2}</SelectItem>
                    <SelectItem value="51-200">{t.employees3}</SelectItem>
                    <SelectItem value="201-500">{t.employees4}</SelectItem>
                    <SelectItem value="500+">{t.employees5}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.country}</Label>
                <Select value={formData.country} onValueChange={(v) => handleChange('country', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.countryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DE">🇩🇪 Deutschland</SelectItem>
                    <SelectItem value="AT">🇦🇹 Österreich</SelectItem>
                    <SelectItem value="CH">🇨🇭 Schweiz</SelectItem>
                    <SelectItem value="HR">🇭🇷 Hrvatska</SelectItem>
                    <SelectItem value="OTHER">Andere</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                {t.message}
              </Label>
              <Textarea
                id="message"
                placeholder={t.messagePlaceholder}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                t.submit
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
