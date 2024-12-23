import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MessageCircle, HelpCircle } from 'lucide-react';
import FAQ from './FAQ';
import ReferenceCard from './ReferenceCard';

export default function Education() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const references = [
    {
      title: 'education.basics',
      content: 'education.basicsContent',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: 'education.rules',
      content: 'education.rulesContent',
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      title: 'education.cases',
      content: 'education.casesContent',
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('education.title')}</h2>

      <Tabs defaultValue="reference" className="mb-6">
        <TabsList>
          <TabsTrigger value="reference">{t('education.reference')}</TabsTrigger>
          <TabsTrigger value="faq">{t('education.faq')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reference">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {references.map((ref, index) => (
              <ReferenceCard key={index} {...ref} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="faq">
          <FAQ />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/')}>
          {t('back')}
        </Button>
        <Button onClick={() => navigate('/heirs')}>
          {t('startCalculation')}
        </Button>
      </div>
    </div>
  );
}