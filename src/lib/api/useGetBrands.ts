import { useQuery } from '@tanstack/react-query';

import { Brands } from '../types/brands';
import GetRequest from '../types/getRequest';
import { UseQueryOptions } from '../types/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

export const getBrands = async ({ req, res }: GetRequest = {}): Promise<Brands[] | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    const { data } = await axiosInstance.get('/brands');

    return data.brands;
  } catch (error) {
    return null;
  }
};

const useGetBrands = (options?: UseQueryOptions<Brands[]>) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.BRANDS),
    queryFn: () => getBrands(),
    ...options,
  });

export default useGetBrands;
