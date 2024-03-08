import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';

import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import PageHeader from '@/components/PageHeader';

const Suppliers = () => (
  <LayoutMenu>
    <PageHeader ns="supplier" />
  </LayoutMenu>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serverProps } = await getServerProps({ context });

  return {
    props: { ...serverProps },
  };
};

export default Suppliers;
