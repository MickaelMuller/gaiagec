import { useQuery } from '@tanstack/react-query';

import GetRequest from '../../types/getRequest';
import { KpisDashboard } from '../../types/kpisDashboard';
import { UseQueryOptions } from '../../types/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

export const getKpisDashboard = async ({ req, res }: GetRequest = {}): Promise<KpisDashboard[]> => {
  const axiosInstance = await axios({ req, res });
  const { data } = await axiosInstance.get('/kpis/dashboard');

  return data.kpis;
};

const useGetKpisDashboard = (options?: UseQueryOptions<KpisDashboard[]>) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.KPIS_DASHBOARD),
    queryFn: () => getKpisDashboard(),
    ...options,
  });

export default useGetKpisDashboard;
