import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { isEmpty, reject } from 'ramda';

import { GaiaCollection } from '@/types/api/collection';
import { Certificate, CertificatesStatus } from '@/types/certificates';

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
}: GetCertificatesParams = {}): Promise<GaiaCollection<Certificate[]> | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    const filteredParams = reject(isEmpty)(params ?? {});
    const queryParams = filteredParams ? `?${queryString.stringify(filteredParams)}` : '';

    const { data } = await axiosInstance.get(`/certificates/${queryParams}`);

    return data;
  } catch (error) {
    return null;
  }
};

const useGetCertificates = (
  params?: CertificatesParams,
  options?: UseQueryOptions<GaiaCollection<Certificate[]>>
) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES, queryString.stringify(params ?? {})),
    queryFn: () => getCertificates({ params }),
    ...options,
  });

export default useGetCertificates;
