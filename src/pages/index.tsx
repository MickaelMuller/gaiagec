import { GetServerSideProps } from 'next';

import URLS from '@/lib/utils/constants/urls';

export default function Home() {
  return <main className={`flex min-h-screen flex-col items-center justify-between p-24`}></main>;
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: URLS.LOGIN, permanent: false },
});
