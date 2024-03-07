import { useQuery } from '@tanstack/react-query';

import { CertificatesDistribution } from '@/types/certificates';

import GetRequest from '../../types/api/getRequest';
import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

export const getCertificatesDistribution = async ({
  req,
  res,
}: GetRequest = {}): Promise<CertificatesDistribution | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    const { data } = await axiosInstance.get('/certificates/distribution');

    return data;
  } catch (error) {
    return null;
  }
};

const useGetCertificatesDistribution = (options?: UseQueryOptions<CertificatesDistribution>) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES_DISTRIBUTION),
    queryFn: () => getCertificatesDistribution(),
    ...options,
  });

export default useGetCertificatesDistribution;
