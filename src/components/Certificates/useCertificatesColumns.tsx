import { ColumnDef } from '@tanstack/react-table';
import { Eye, EyeOff, FileDown, Mail } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Certificate } from '@/types/certificates';
import { cn } from '@/lib/utils/cn';
import diffInDaysFromNow from '@/lib/utils/date/diffInDaysFromNow';
import { fromISOToReadableDate } from '@/lib/utils/date/format';
import { DAYS } from '@/lib/utils/time';
import Text from '@/components/ui/text';

import { Badge } from '../ui/badge';

const useCertificatesColumns: () => ColumnDef<Certificate>[] = () => {
  const { t } = useTranslation();

  const renderCell = (content: string) => <Text font="hind">{content}</Text>;

  return [
    {
      accessorKey: 'visibility',
      header: t('table.visible'),
      cell: ({ row }) => {
        const visibility = row.original.visibility;

        if (visibility === 'visible') {
          return <Eye />;
        }

        return <EyeOff />;
      },
    },
    {
      accessorKey: 'validTo',
      header: t('table.status'),
      cell: ({ row }) => {
        const certificates = row.original as Certificate;

        const diff = diffInDaysFromNow(certificates.validTo);

        const certificateIsExpired = diff <= 0;
        const certificateExpireSoon = diff <= DAYS(90).inDays && diff >= 0;

        if (certificateIsExpired) {
          return <Badge variant="error">{t('table.expired')}</Badge>;
        }

        if (certificateExpireSoon) {
          return <Badge variant="warning">{t('table.expire_soon')}</Badge>;
        }

        return <Badge variant="success">{t('table.valid')}</Badge>;
      },
    },
    {
      accessorKey: 'validTo',
      header: t('table.expiration_date'),
      cell: ({ row }) => renderCell(fromISOToReadableDate({ date: row.original.validTo })),
    },
    {
      accessorKey: 'name',
      header: t('table.name'),
      cell: ({ row }) => renderCell(row.original.name),
    },
    {
      accessorKey: 'supplierName',
      header: t('table.supplier'),
      cell: ({ row }) => renderCell(row.original.supplierName),
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

export default useCertificatesColumns;
