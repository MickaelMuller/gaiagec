import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, EyeOff, Filter, GripVertical } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Certificate, CertificatesStatus } from '@/types/certificates';
import { CertificatesParams } from '@/lib/api/useGetCertificates';
import diffInDaysFromNow from '@/lib/utils/date/diffInDaysFromNow';
import { fromISOToReadableDate } from '@/lib/utils/date/format';
import { DAYS } from '@/lib/utils/time';
import Text from '@/components/ui/text';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Label } from '../ui/label';

type CheckboxStatus = {
  id: CertificatesStatus;
  label: string;
};

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

  const checkboxes: CheckboxStatus[] = [
    { id: 'expired', label: 'Expiré' },
    { id: 'expireSoon', label: 'Expire bienôt' },
    { id: 'valid', label: 'Valide' },
  ];

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
      header: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              {t('table.status')}
              <Filter className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2 p-3">
            {checkboxes.map((checkbox) => (
              <div className="flex gap-3" key={checkbox.id}>
                <Checkbox
                  checked={queryParams.status?.includes(checkbox.id) ?? false}
                  onCheckedChange={(checked) => {
                    const newQueryParams = {
                      ...queryParams,
                      status: checked
                        ? [...(queryParams.status ?? []), checkbox.id]
                        : (queryParams.status ?? []).filter((status) => status !== checkbox.id),
                    };

                    onChangeQueryParams(newQueryParams);
                  }}
                  className="self-center"
                  id={checkbox.id}
                />
                <Label htmlFor={checkbox.id}>{checkbox.label}</Label>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
          className="pl-0"
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
      cell: () => (
        <div className="flex gap-2">
          <GripVertical />
        </div>
      ),
    },
  ];
};

export default useCertificatesColumns;
