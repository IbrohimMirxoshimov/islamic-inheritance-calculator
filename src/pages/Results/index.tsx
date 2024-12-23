import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInheritance } from '@/contexts/InheritanceContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SharesTable from './SharesTable';
import SharesChart from './SharesChart';
import { formatNumber } from '@/lib/utils';

export default function Results() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { state, dispatch } = useInheritance();

  useEffect(() => {
    if (!state.results) {
      dispatch({ type: 'CALCULATE_SHARES' });
    }
  }, [dispatch, state.results]);

  if (!state.results) {
    return null;
  }

  const { shares, netEstate } = state.results;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('results')}</h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('netEstate')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatNumber(netEstate)}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="table" className="mb-6">
        <TabsList>
          <TabsTrigger value="table">{t('table')}</TabsTrigger>
          <TabsTrigger value="chart">{t('chart')}</TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <Card>
            <CardContent className="pt-6">
              <SharesTable shares={shares} netEstate={netEstate} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chart">
          <Card>
            <CardContent className="pt-6">
              <SharesChart shares={shares} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/financial')}>
          {t('back')}
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => window.print()}>
            {t('downloadPdf')}
          </Button>
          <Button onClick={() => navigate('/')}>{t('newCalculation')}</Button>
        </div>
      </div>
    </div>
  );
}
