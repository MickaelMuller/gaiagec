import { ColumnDef } from '@tanstack/react-table';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Packagings } from '@/types/packagings';
import { PackagingParams } from '@/lib/api/useGetPackagings';
import Text from '@/components/ui/text';

import OrderByButton from '../../OrderByButton';

type UsePackagingsColumns = {
  onChangeQueryParams: (newQueryParams: PackagingParams) => void;
  queryParams: PackagingParams;
};

const usePackagingsColumns: (props: UsePackagingsColumns) => ColumnDef<Packagings>[] = ({
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
            onChangeQueryParams({ ...queryParams, orderBy: order as PackagingParams['orderBy'] })
          }
        />
      ),
      cell: ({ row }) => renderCell(row.original.reference),
    },
    {
      accessorKey: 'name',
      header: () => (
        <OrderByButton
          title={t('table.name')}
          orderByName="name"
          orderBy={queryParams?.orderBy ?? ''}
          onClick={(order) =>
            onChangeQueryParams({ ...queryParams, orderBy: order as PackagingParams['orderBy'] })
          }
        />
      ),
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: 'description',
      header: t('table.status'),
      cell: ({ row }) => renderCell(row.original.description),
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
      cell: () => <div className="flex gap-2">... </div>,
    },
  ];
};

export default usePackagingsColumns;
