import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';

import useGetCertificates, { getCertificates } from '@/lib/api/useGetCertificates';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import useCertificatesColumns from '@/components/Certificates/useCertificatesColumns';
import { DataTable } from '@/components/DataTable';
import PageHeader from '@/components/PageHeader';

const Certificates = () => {
  const { data: certificates } = useGetCertificates();

  const columns = useCertificatesColumns();

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader ns="certificates" />
      <DataTable columns={columns} data={certificates?.certificates ?? []} />
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
