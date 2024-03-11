import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import useDebounce from 'react-use/lib/useDebounce';

import useGetCertificates, {
  CertificatesParams,
  getCertificates,
} from '@/lib/api/useGetCertificates';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import { Input } from '@/components/ui/input';
import useCertificatesColumns from '@/components/Certificates/useCertificatesColumns';
import { DataTable } from '@/components/DataTable';
import PageHeader from '@/components/PageHeader';

const Certificates = () => {
  const [queryParams, setQueryParams] = useState<CertificatesParams>({
    page: 1,
    size: 10,
    name: '',
  });

  const { data, refetch: refetchCertificates } = useGetCertificates(queryParams);

  const columns = useCertificatesColumns({
    onChangeQueryParams: setQueryParams,
    queryParams,
  });

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, name: e.target.value });
  };

  useEffect(() => {
    refetchCertificates();
  }, [queryParams.page, queryParams.size, queryParams.status, queryParams.orderBy]);

  useDebounce(
    () => {
      if (queryParams.name !== '') refetchCertificates();
    },
    1000,
    [queryParams.name]
  );

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader ns="certificates" />
      <div className="flex flex-col gap-5">
        <Input
          onChange={handleOnChangeSearch}
          value={queryParams.name}
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
