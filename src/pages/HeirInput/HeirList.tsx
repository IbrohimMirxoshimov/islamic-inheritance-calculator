import { useLanguage } from '@/contexts/LanguageContext';
import { useInheritance } from '@/contexts/InheritanceContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function HeirList() {
  const { t } = useLanguage();
  const { state, dispatch } = useInheritance();

  return (
    <div>
      {state.heirs.length > 0 ? (
        <ul className="space-y-2">
          {state.heirs.map((heir) => (
            <li
              key={heir.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div>
                <span className="font-medium">{t(heir.relationship)}</span>
                <span className="mx-2">•</span>
                <span>{t(heir.gender)}</span>
                {heir.count > 1 && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{heir.count}</span>
                  </>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => dispatch({ type: 'REMOVE_HEIR', id: heir.id })}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground">{t('noHeirs')}</p>
      )}
    </div>
  );
}
