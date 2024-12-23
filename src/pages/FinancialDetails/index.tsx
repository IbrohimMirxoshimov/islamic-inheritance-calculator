import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInheritance } from '@/contexts/InheritanceContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';

const formSchema = z.object({
  totalEstate: z.number().min(0, 'Must be a positive number'),
  funeralExpenses: z.number().min(0, 'Must be a positive number'),
  debts: z.number().min(0, 'Must be a positive number'),
  wasiyyah: z.number().min(0, 'Must be a positive number'),
});

export default function FinancialDetails() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { state, dispatch } = useInheritance();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalEstate: state.financialDetails.totalEstate,
      funeralExpenses: state.financialDetails.funeralExpenses,
      debts: state.financialDetails.debts,
      wasiyyah: state.financialDetails.wasiyyah,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({
      type: 'UPDATE_FINANCIAL_DETAILS',
      details: values,
    });
    navigate('/results');
  }

  const netEstate = Math.max(
    0,
    form.watch('totalEstate') ||
      0 -
        (form.watch('funeralExpenses') || 0) -
        (form.watch('debts') || 0) -
        (form.watch('wasiyyah') || 0)
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">{t('financialDetails')}</h2>
      <p className="text-sm text-gray-600 mb-6">{t('use-same-currency')}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="totalEstate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('totalEstate')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="funeralExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('funeralExpenses')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="debts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('debts')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wasiyyah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('wasiyyah')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">{t('netEstate')}:</span>
                <span className="text-lg font-bold">
                  {formatNumber(netEstate)}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => navigate('/heirs')}>
              {t('back')}
            </Button>
            <Button type="submit">{t('calculate')}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
