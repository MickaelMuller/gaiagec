import { GetServerSidePropsContext } from 'next';

type GetRequest = {
  req?: GetServerSidePropsContext['req'];
  res?: GetServerSidePropsContext['res'];
};

export default GetRequest;
