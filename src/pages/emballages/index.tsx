import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';

import useGetPackagings from '@/lib/api/useGetPackagings';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import PageHeader from '@/components/PageHeader';

const Packaging = () => {
  const { data } = useGetPackagings();

  return (
    <LayoutMenu>
      <PageHeader ns="packagings" />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serverProps } = await getServerProps({ context });

  return {
    props: { ...serverProps },
  };
};

export default Packaging;
