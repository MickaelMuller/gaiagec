import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';

import { CertificatesCollection, CertificatesStatus } from '@/types/certificates';

import GetRequest from '../../types/api/getRequest';
import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

export type CertificatesParams = {
  status?: CertificatesStatus[];
  orderBy?:
    | 'validToDesc'
    | 'validToAsc'
    | 'validFromDesc'
    | 'validFromAsc'
    | 'nameAsc'
    | 'nameDesc';
  name?: string;
  page?: number;
  size?: number;
};

type GetCertificatesParams = GetRequest & {
  params?: CertificatesParams;
};

export const getCertificates = async ({
  req,
  res,
  params,
}: GetCertificatesParams = {}): Promise<CertificatesCollection | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    // ommit empty or null params
    const queryParam = params ? `?${queryString.stringify(params)}` : '';

    const { data } = await axiosInstance.get(`/certificates/${queryParam}`);

    return data;
  } catch (error) {
    return null;
  }
};

const useGetCertificates = (
  params?: GetCertificatesParams['params'],
  options?: UseQueryOptions<CertificatesCollection>
) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES),
    queryFn: () => getCertificates({ params }),
    ...options,
  });

export default useGetCertificates;
