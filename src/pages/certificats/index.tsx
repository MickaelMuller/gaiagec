import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import useDebounce from 'react-use/lib/useDebounce';

import useGetCertificates, {
  CertificatesParams,
  getCertificates,
} from '@/lib/api/useGetCertificates';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import useCertificatesColumns from '@/components/Certificates/useCertificatesColumns';
import { DataTable } from '@/components/DataTable';
import FacetsFilters from '@/components/FacetsFilters';
import PageHeader from '@/components/PageHeader';

const Certificates = ({ defaultQueryParams }: { defaultQueryParams: CertificatesParams }) => {
  const { t } = useTranslation();

  const [queryParams, setQueryParams] = useState<CertificatesParams>(defaultQueryParams);
  const [search, setSearch] = useState('');
  const [openCreateSheet, setOpenCreateSheet] = useState(false);

  const { data } = useGetCertificates(queryParams, { keepPreviousData: true });

  const columns = useCertificatesColumns({
    onChangeQueryParams: setQueryParams,
    queryParams,
  });

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useDebounce(
    () => {
      setQueryParams({ ...queryParams, name: search });
    },
    1000,
    [search]
  );

  const statusOptions = [
    { value: 'expired', label: 'Expiré' },
    { value: 'expireSoon', label: 'Expire bienôt' },
    { value: 'valid', label: 'Valide' },
  ];

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader
        ns="certificates"
        actions={[
          {
            callback: () => setOpenCreateSheet(true),
            label: t('create'),
          },
        ]}
      />
      <Sheet open={openCreateSheet} onOpenChange={setOpenCreateSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Création de certificat</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Input
            onChange={handleOnChangeSearch}
            value={search}
            className="w-48"
            placeholder="Recherche par nom"
          />
          <FacetsFilters
            filters={queryParams.status}
            title={t('table.status')}
            options={statusOptions}
            onReset={() => setQueryParams({ ...queryParams, status: [] })}
            onSelect={(values) => setQueryParams({ ...queryParams, status: values })}
          />
        </div>

        <DataTable columns={columns} data={data?.results ?? []} />
      </div>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const defaultQueryParams: CertificatesParams = {
    page: 1,
    size: 10,
    name: '',
  };

  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES, queryString.stringify(defaultQueryParams)),
      queryFn: () =>
        getCertificates({
          req: context.req,
          res: context.res,
          params: defaultQueryParams,
        }),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: { ...serverProps, defaultQueryParams },
  };
};

export default Certificates;
