import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: 'faq.what',
      answer: 'faq.whatAnswer',
    },
    {
      question: 'faq.who',
      answer: 'faq.whoAnswer',
    },
    {
      question: 'faq.wasiyyah',
      answer: 'faq.wasiyyahAnswer',
    },
    {
      question: 'faq.debts',
      answer: 'faq.debtsAnswer',
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{t(faq.question)}</AccordionTrigger>
          <AccordionContent>{t(faq.answer)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}