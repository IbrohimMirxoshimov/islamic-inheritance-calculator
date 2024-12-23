import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

type ReferenceCardProps = {
  title: string;
  content: string;
  icon: React.ReactNode;
};

export default function ReferenceCard({ title, content, icon }: ReferenceCardProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {t(title)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{t(content)}</p>
      </CardContent>
    </Card>
  );
}