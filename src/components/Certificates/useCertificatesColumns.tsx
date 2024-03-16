import { ColumnDef } from '@tanstack/react-table';
import { Eye, EyeOff, GripVertical } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Certificate } from '@/types/certificates';
import { CertificatesParams } from '@/lib/api/useGetCertificates';
import diffInDaysFromNow from '@/lib/utils/date/diffInDaysFromNow';
import { fromISOToReadableDate } from '@/lib/utils/date/format';
import { DAYS } from '@/lib/utils/time';
import Text from '@/components/ui/text';

import OrderByButton from '../OrderByButton';
import { Badge } from '../ui/badge';

type UseCertificatesColumns = {
  onChangeQueryParams: (newQueryParams: CertificatesParams) => void;
  queryParams: CertificatesParams;
};

const useCertificatesColumns: (props: UseCertificatesColumns) => ColumnDef<Certificate>[] = ({
  onChangeQueryParams,
  queryParams,
}) => {
  const { t } = useTranslation();

  const renderCell = (content: string) => <Text font="hind">{content}</Text>;

  return [
    {
      accessorKey: 'reference',
      header: () => (
        <OrderByButton
          title={t('table.reference')}
          orderByName="reference"
          orderBy={queryParams?.orderBy ?? ''}
          onClick={(order) =>
            onChangeQueryParams({ ...queryParams, orderBy: order as CertificatesParams['orderBy'] })
          }
        />
      ),
      cell: ({ row }) => renderCell(row.original.reference),
    },
    {
      accessorKey: 'validTo',
      header: () => (
        <OrderByButton
          title={t('table.expiration_date')}
          orderByName="validTo"
          orderBy={queryParams?.orderBy ?? ''}
          onClick={(order) =>
            onChangeQueryParams({ ...queryParams, orderBy: order as CertificatesParams['orderBy'] })
          }
        />
      ),
      cell: ({ row }) => renderCell(fromISOToReadableDate({ date: row.original.validTo })),
    },
    {
      accessorKey: 'supplierName',
      header: t('table.supplier'),
      cell: ({ row }) => renderCell(row.original.supplierName),
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
      id: 'actions',
      cell: () => (
        <div className="flex gap-2">
          <GripVertical />
        </div>
      ),
    },
  ];
};

export default useCertificatesColumns;
