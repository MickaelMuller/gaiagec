import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';

import { GaiaCollection } from '@/types/api/collection';
import { Supplier } from '@/types/suppliers';

import GetRequest from '../../types/api/getRequest';
import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

export type SuppliersParams = {
  page?: number;
  size?: number;
};

type GetSuppliersParams = GetRequest & {
  params?: SuppliersParams;
};

export const getSuppliers = async ({
  req,
  res,
  params,
}: GetSuppliersParams = {}): Promise<GaiaCollection<Supplier[]> | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    const queryParam = params ? `?${queryString.stringify(params)}` : '';

    const { data } = await axiosInstance.get(`/suppliers/${queryParam}`);

    return data;
  } catch (error) {
    return null;
  }
};

const useGetSuppliers = (
  params?: SuppliersParams,
  options?: UseQueryOptions<GaiaCollection<Supplier[]>>
) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES),
    queryFn: () => getSuppliers({ params }),
    ...options,
  });

export default useGetSuppliers;
