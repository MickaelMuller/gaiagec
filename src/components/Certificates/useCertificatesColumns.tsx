import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, EyeOff, Filter, GripVertical } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Certificate } from '@/types/certificates';
import diffInDaysFromNow from '@/lib/utils/date/diffInDaysFromNow';
import { fromISOToReadableDate } from '@/lib/utils/date/format';
import { DAYS } from '@/lib/utils/time';
import Text from '@/components/ui/text';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('table.status')}
          <Filter className="ml-2 h-4 w-4" />
        </Button>
      ),
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('table.expiration_date')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
        // eslint-disable-next-line
        console.log(row);

        return (
          <div className="flex gap-2">
            <GripVertical />
          </div>
        );
      },
    },
  ];
};

export default useCertificatesColumns;
