import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function CheckoutSuccess() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>

              <h1 
                className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {t('checkout.success.title')}
              </h1>

              <p className="text-muted-foreground mb-8">
                {t('checkout.success.message')}
              </p>

              <div className="space-y-4">
                <Link href="/">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                    {t('checkout.success.dashboard')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <p className="text-sm text-muted-foreground">
                  {t('checkout.success.email')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
