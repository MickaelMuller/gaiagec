import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';

import { GaiaCollection } from '@/types/api/collection';
import { GetRequestWithParams } from '@/types/api/getRequest';
import { Certificate, CertificatesStatus } from '@/types/certificates';

import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import getQueryParams from '../utils/getQueryParams';
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
  reference?: string;
  page: number;
  size: number;
};

export const getCertificates = async ({
  req,
  res,
  params,
}: GetRequestWithParams<CertificatesParams> = {}): Promise<GaiaCollection<
  Certificate[]
> | null> => {
  try {
    const axiosInstance = await axios({ req, res });
    const queryParams = getQueryParams(params);

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
