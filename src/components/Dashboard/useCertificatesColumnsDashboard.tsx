import { ColumnDef } from '@tanstack/react-table';
import { FileDown, Mail } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Certificate } from '@/types/certificates';
import { cn } from '@/lib/utils/cn';
import diffInDaysFromNow from '@/lib/utils/date/diffInDaysFromNow';
import { fromISOToReadableDate } from '@/lib/utils/date/format';
import { DAYS } from '@/lib/utils/time';
import Text from '@/components/ui/text';

export const useCertificatesColumnsDashboard: () => ColumnDef<Certificate>[] = () => {
  const { t } = useTranslation();

  const renderCell = (content: string) => (
    <Text font="hind" className="max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">
      {content}
    </Text>
  );

  return [
    {
      accessorKey: 'reference',
      header: t('table.reference'),
      cell: ({ row }) => renderCell(row.original.reference),
    },
    {
      accessorKey: 'supplierName',
      header: t('table.supplier'),
      cell: ({ row }) => renderCell(row.original.supplierName),
    },
    {
      accessorKey: 'validTo',
      header: t('table.expiration_date'),
      cell: ({ row }) => (
        <Text font="hind">{fromISOToReadableDate({ date: row.original.validTo })}</Text>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const certificates = row.original as Certificate;

        const diff = diffInDaysFromNow(certificates.validTo);

        const certificateIsExpired = diff <= 0;
        const certificateExpireSoon = diff <= DAYS(90).inDays && diff >= 0;
        const certificateIsValid = diff >= DAYS(90).inDays;

        const className = cn('cursor-pointer', {
          'text-error': certificateIsExpired,
          'text-warning': certificateExpireSoon,
          'text-success': certificateIsValid,
        });

        const displayMailIcon = diff <= DAYS(90).inDays;

        return (
          <div className="flex gap-2">
            <a href={certificates.fileUri} target="_blank" download>
              <FileDown className={className} />
            </a>
            {displayMailIcon && <Mail className={className} />}
          </div>
        );
      },
    },
  ];
};
