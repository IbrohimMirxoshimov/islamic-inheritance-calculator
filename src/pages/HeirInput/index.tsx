import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInheritance } from '@/contexts/InheritanceContext';
import HeirForm from './HeirForm';
import HeirList from './HeirList';
import { Button } from '@/components/ui/button';

export default function HeirInput() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { state } = useInheritance();

  return (
    <div className="w-full">
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">{t('addHeir')}</h2>
        <HeirForm />
        <HeirList />
      </div>
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={() => navigate('/')}>
          {t('back')}
        </Button>
        <Button
          onClick={() => navigate('/financial')}
          disabled={state.heirs.length === 0}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  );
}
