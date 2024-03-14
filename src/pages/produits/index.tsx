import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';

import useGetProducts, { getProducts } from '@/lib/api/useGetProducts';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';

const Products = () => {
  const { data: products } = useGetProducts();

  return (
    <LayoutMenu>
      <h1>Products</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.PRODUCTS),
      queryFn: () => getProducts(),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: { ...serverProps },
  };
};

export default Products;
