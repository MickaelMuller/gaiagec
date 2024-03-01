const getQueryKey = (queryName: string, variables?: string): [string, string?] =>
  variables ? [queryName, variables] : [queryName];

export default getQueryKey;
