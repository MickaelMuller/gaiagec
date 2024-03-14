import { useQuery } from '@tanstack/react-query';

import { GaiaCollection } from '@/types/api/collection';
import { GetRequestWithParams } from '@/types/api/getRequest';
import { Supplier } from '@/types/suppliers';

import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import getQueryParams from '../utils/getQueryParams';
import axios from './fetcher';

export type PackagingParams = {
  page?: number;
  size?: number;
  name?: string;
  reference?: string;
  orderBy: 'referenceAsc' | 'referenceDesc' | 'nameAsc' | 'nameDesc';
};

export const getPackagings = async ({
  req,
  res,
  params,
}: GetRequestWithParams<PackagingParams> = {}): Promise<GaiaCollection<Supplier[]> | null> => {
  try {
    const axiosInstance = await axios({ req, res });

    const queryParam = getQueryParams(params);

    const { data } = await axiosInstance.get(`/packagings/${queryParam}`);

    return data;
  } catch (error) {
    return null;
  }
};

const useGetPackagings = (
  params?: PackagingParams,
  options?: UseQueryOptions<GaiaCollection<Supplier[]>>
) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.PACKAGINGS),
    queryFn: () => getPackagings({ params }),
    ...options,
  });

export default useGetPackagings;
