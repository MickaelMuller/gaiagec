import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';

import { GaiaCollection } from '@/types/api/collection';
import { GetRequestWithParams } from '@/types/api/getRequest';
import { Certificate } from '@/types/certificates';

import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import getQueryParams from '../utils/getQueryParams';
import axios from './fetcher';

export type ProductsParams = {
  name?: string;
  reference?: string;
  category?: 'shoe' | 'dressing' | 'linen';
  orderBy?:
    | 'referenceAsc'
    | 'referenceDesc'
    | 'nameAsc'
    | 'nameDesc'
    | 'categoryAsc'
    | 'categoryDesc';
  page?: number;
  size?: number;
};

export const getProducts = async ({
  req,
  res,
  params,
}: GetRequestWithParams<ProductsParams> = {}): Promise<GaiaCollection<Certificate[]> | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    const queryParams = getQueryParams(params);

    const { data } = await axiosInstance.get(`/products/${queryParams}`);

    return data;
  } catch (error) {
    return null;
  }
};

const useGetProducts = (
  params?: ProductsParams,
  options?: UseQueryOptions<GaiaCollection<Certificate[]>>
) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.PRODUCTS, queryString.stringify(params ?? {})),
    queryFn: () => getProducts({ params }),
    ...options,
  });

export default useGetProducts;
