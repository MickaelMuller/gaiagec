import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants/react-query-default-config';

type PageQuery = {
  queryKey: [string, string?];
  queryFn: () => Promise<any>;
};

type GetServerProps = {
  context: GetServerSidePropsContext;
  namespaces?: string[];
  queries?: PageQuery[];
};

/**
 * Commons props to fetch in getServerSideProps function
 * Must be included in all pages
 *
 * @param {Object}
 * @returns {Promise}
 */
export const getServerProps = async ({
  context,
  namespaces = [],
  queries = [],
}: GetServerProps) => {
  const commonNamespaces = ['common', 'inputs', 'stock', 'timezones'];
  const allNamespaces = [...commonNamespaces, ...namespaces];

  const queryClient = new QueryClient(REACT_QUERY_DEFAULT_CONFIG);
  const promises = await Promise.all(
    queries?.map(({ queryKey, queryFn }) => queryClient.fetchQuery({ queryKey, queryFn }))
  );

  return {
    serverProps: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        (context.locale ?? context.defaultLocale) as string,
        allNamespaces
      )),
    },
    queryClient,
    promises,
  };
};
