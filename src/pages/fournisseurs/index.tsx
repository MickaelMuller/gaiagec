import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';

import useGetSuppliers, { getSuppliers } from '@/lib/api/useGetSuppliers';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import PageHeader from '@/components/PageHeader';

const Suppliers = () => {
  const { data } = useGetSuppliers();

  return (
    <LayoutMenu>
      <PageHeader ns="supplier" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.SUPPLIERS),
      queryFn: () => getSuppliers({ req: context.req, res: context.res }),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: serverProps,
  };
};

export default Suppliers;
