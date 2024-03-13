import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';

import useGetSuppliers from '@/lib/api/useGetSuppliers';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import PageHeader from '@/components/PageHeader';

const Suppliers = () => {
  const { data } = useGetSuppliers();

  // eslint-disable-next-line no-console
  console.log(data);

  return (
    <LayoutMenu>
      <PageHeader ns="supplier" />
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serverProps } = await getServerProps({ context });

  return {
    props: { ...serverProps },
  };
};

export default Suppliers;
