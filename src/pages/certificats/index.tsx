import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import useDebounce from 'react-use/lib/useDebounce';

import useGetCertificates, { getCertificates } from '@/lib/api/useGetCertificates';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import { Input } from '@/components/ui/input';
import useCertificatesColumns from '@/components/Certificates/useCertificatesColumns';
import { DataTable } from '@/components/DataTable';
import PageHeader from '@/components/PageHeader';

const Certificates = () => {
  const [search, setSearch] = useState('');

  const { data, refetch: refetchCertificates } = useGetCertificates({ name: search });
  const columns = useCertificatesColumns();

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useDebounce(
    () => {
      if (search !== '') refetchCertificates();
    },
    1000,
    [search]
  );

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader ns="certificates" />
      <div className="flex flex-col gap-5">
        <Input
          onChange={handleOnChangeSearch}
          value={search}
          className="w-48"
          placeholder="Recherche par nom"
        />

        <DataTable columns={columns} data={data?.certificates ?? []} />
      </div>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES),
      queryFn: () =>
        getCertificates({
          req: context.req,
          res: context.res,
        }),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: { ...serverProps },
  };
};

export default Certificates;
