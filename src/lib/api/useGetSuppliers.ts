import { useQuery } from '@tanstack/react-query';

import { GaiaCollection } from '@/types/api/collection';
import { GetRequestWithParams } from '@/types/api/getRequest';
import { Supplier } from '@/types/suppliers';

import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import getQueryParams from '../utils/getQueryParams';
import axios from './fetcher';

export type SuppliersParams = {
  page?: number;
  size?: number;
};

export const getSuppliers = async ({
  req,
  res,
  params,
}: GetRequestWithParams<SuppliersParams> = {}): Promise<GaiaCollection<Supplier[]> | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    const queryParam = getQueryParams(params);

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
    queryKey: getQueryKey(QUERY_KEYS.SUPPLIERS),
    queryFn: () => getSuppliers({ params }),
    ...options,
  });

export default useGetSuppliers;
