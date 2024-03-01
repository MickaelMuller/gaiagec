import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';

import { getServerProps } from '@/lib/utils/server-side/get-server-props';

const Products = () => (
  <LayoutMenu>
    <h1>Products</h1>
  </LayoutMenu>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serverProps } = await getServerProps({ context });

  return {
    props: { ...serverProps },
  };
};

export default Products;
