import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calculator, BookOpen } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full max-w-sm"
          onClick={() => navigate('/heirs')}
        >
          <Calculator className="mr-2 h-4 w-4" />
          {t('start')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full max-w-sm"
          onClick={() => navigate('/education')}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          {t('education')}
        </Button>
      </div>
    </div>
  );
}