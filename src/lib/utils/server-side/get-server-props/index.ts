import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getBrands } from '@/lib/api/useGetBrands';

import QUERY_KEYS from '../../constants/query-keys';
import { REACT_QUERY_DEFAULT_CONFIG } from '../../constants/react-query-default-config';
import getQueryKey from '../../get-query-key';

type PageQuery = {
  queryKey: [string, string?];
  queryFn: () => void;
};

type GetServerProps = {
  context: GetServerSidePropsContext;
  namespaces?: string[];
  queries?: PageQuery[];
};

export const getServerProps = async ({
  context,
  namespaces = [],
  queries = [],
}: GetServerProps) => {
  const commonNamespaces = ['common'];
  const allNamespaces = [...commonNamespaces, ...namespaces];

  const queryClient = new QueryClient(REACT_QUERY_DEFAULT_CONFIG);

  const defaultQueries: PageQuery[] = [
    {
      queryKey: getQueryKey(QUERY_KEYS.BRANDS),
      queryFn: () => getBrands({ req: context.req, res: context.res }),
    },
  ];

  const promises = await Promise.all(
    ([...queries, ...defaultQueries] as PageQuery[]).map(({ queryKey, queryFn }) =>
      queryClient.fetchQuery({ queryKey, queryFn })
    )
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
