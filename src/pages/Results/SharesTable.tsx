import { useLanguage } from '@/contexts/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatNumber } from '@/lib/utils';

type Share = {
  heir: {
    relationship: string;
    gender: string;
    count: number;
  };
  share: number;
  amount: number;
  explanation: string;
};

type SharesTableProps = {
  shares: Share[];
  netEstate: number;
};

export default function SharesTable({ shares, netEstate }: SharesTableProps) {
  const { t } = useLanguage();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('heir')}</TableHead>
          <TableHead className="text-right">{t('share')}</TableHead>
          <TableHead className="text-right">{t('amount')}</TableHead>
          <TableHead>{t('explanation')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shares.map((share, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              {t(share.heir.relationship)}
              {share.heir.count > 1 && ` (${share.heir.count})`}
            </TableCell>
            <TableCell className="text-right">
              {formatNumber(share.share * 100)}%
            </TableCell>
            <TableCell className="text-right">
              {formatNumber(share.amount)}
            </TableCell>
            <TableCell>{t(share.explanation)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="font-bold">{t('total')}</TableCell>
          <TableCell className="text-right font-bold">100%</TableCell>
          <TableCell className="text-right font-bold">
            {formatNumber(netEstate)}
          </TableCell>
          <TableCell />
        </TableRow>
      </TableBody>
    </Table>
  );
}
