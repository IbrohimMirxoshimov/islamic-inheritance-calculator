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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { HEIR_TYPES, HEIR_GENDER_MAP } from '@/lib/constants';

const formSchema = z.object({
  relationship: z.string(),
  count: z.number().min(1),
});

export default function HeirForm() {
  const { t } = useLanguage();
  const { dispatch } = useInheritance();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      count: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({
      type: 'ADD_HEIR',
      heir: {
        id: crypto.randomUUID(),
        ...values,
        gender: (HEIR_GENDER_MAP as any)[values.relationship], // Automatically set gender based on relationship
      },
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center"
      >
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>{t('relationship')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectRelationship')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {HEIR_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('count')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">{t('addHeir')}</Button>
      </form>
    </Form>
  );
}
