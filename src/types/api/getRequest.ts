import { GetServerSidePropsContext } from 'next';

export type GetRequest = {
  req?: GetServerSidePropsContext['req'];
  res?: GetServerSidePropsContext['res'];
};

export type GetRequestWithParams<T> = GetRequest & {
  params?: T;
};
