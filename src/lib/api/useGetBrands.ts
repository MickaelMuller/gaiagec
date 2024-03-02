import { useQuery } from '@tanstack/react-query';

import GetRequest from '../../types/api/getRequest';
import { Brands } from '../../types/brands';
import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

export const getBrands = async ({ req, res }: GetRequest = {}): Promise<Brands[]> => {
  const axiosInstance = await axios({ req, res });
  const { data } = await axiosInstance.get('/brands');

  return data.brands;
};

const useGetBrands = (options?: UseQueryOptions<Brands[]>) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.BRANDS),
    queryFn: () => getBrands(),
    ...options,
  });

export default useGetBrands;
