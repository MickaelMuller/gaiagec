import { ColumnDef } from '@tanstack/react-table';
import countries from 'i18n-iso-countries';
import { i18n, useTranslation } from 'next-i18next';

import { Supplier } from '@/types/suppliers';
import { SuppliersParams } from '@/lib/api/useGetSuppliers';
import { fromISOToReadableDate } from '@/lib/utils/date/format';
import Text from '@/components/ui/text';
import OrderByButton from '@/components/OrderByButton';

type UseSuppliersColumns = {
  onChangeQueryParams: (newQueryParams: SuppliersParams) => void;
  queryParams: SuppliersParams;
};

const useSupppliersColumns: (props: UseSuppliersColumns) => ColumnDef<Supplier>[] = ({
  onChangeQueryParams,
  queryParams,
}) => {
  const { t } = useTranslation();

  const renderCell = (content: string) => <Text font="hind">{content}</Text>;

  return [
    {
      accessorKey: 'name',
      header: () => (
        <OrderByButton
          title={t('table.name')}
          orderByName="name"
          orderBy={queryParams?.orderBy ?? ''}
          onClick={(order) =>
            onChangeQueryParams({ ...queryParams, orderBy: order as SuppliersParams['orderBy'] })
          }
        />
      ),
      cell: ({ row }) => renderCell(row.original.name),
    },
    {
      accessorKey: 'contactFirstName',
      header: t('table.contact'),
      cell: ({ row }) =>
        renderCell(`${row.original.contactFirstName} ${row.original.contactLastName}`),
    },
    {
      accessorKey: 'contactPhone',
      header: t('table.contact_email'),
      cell: ({ row }) => renderCell(row.original.contactEmail),
    },
    {
      accessorKey: 'type',
      header: t('table.type'),
      cell: ({ row }) => renderCell(t(`table.${row.original.type}`)),
    },
    {
      accessorKey: 'countryCode',
      header: t('table.country'),
      cell: ({ row }) =>
        renderCell(countries.getName(row.original.countryCode, i18n?.language ?? 'fr') ?? ''),
    },
    {
      accessorKey: 'lastUploadDateUTC',
      header: t('table.last_connexion'),
      cell: ({ row }) =>
        renderCell(fromISOToReadableDate({ date: row.original.lastUploadDateUTC })),
    },

    {
      id: 'actions',
      cell: () => <div className="flex gap-2">...</div>,
    },
  ];
};

export default useSupppliersColumns;
