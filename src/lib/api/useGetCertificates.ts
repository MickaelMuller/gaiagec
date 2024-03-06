/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';

import { CertificatesCollection, CertificatesStatus } from '@/types/certificates';

import GetRequest from '../../types/api/getRequest';
import { UseQueryOptions } from '../../types/utils/useQueryOptions';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

type GetCertificatesParams = GetRequest & {
  params?: {
    status?: CertificatesStatus;
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
};

export const getCertificates = async ({
  req,
  res,
  params,
}: GetCertificatesParams = {}): Promise<CertificatesCollection> => {
  const axiosInstance = await axios({ req, res });
  const queryParam = params ? `?${queryString.stringify(params)}` : '';
  console.log('queryParam', queryParam);

  const { data } = await axiosInstance.get(`/certificates/${queryParam}`);

  return {
    total: 100,
    certificates: [
      {
        tenantId: '00000000-0000-0000-0000-000000000000',
        brandId: '00000000-0000-0000-0000-000000000000',
        name: 'Bois 100% conforme loi 124-CG',
        supplierId: '86121454-772c-40a1-88a6-9cc979b30742',
        supplierName: "Usine d'Italie",
        status: 'valid',
        visibility: 'visible',
        validFrom: '0001-01-01',
        validTo: '0001-01-01',
        url: 'https://azure/myfile.pdf',
      },
      {
        tenantId: '00000000-0000-0000-0000-000000000000',
        brandId: '00000000-0000-0000-0000-000000000000',
        name: 'Plastique en circuit court ISO-9014',
        supplierId: '2577bce8-2092-4095-81db-f44d817ed9cb',
        supplierName: 'Usine de chine',
        status: 'expired',
        visibility: 'hide',
        validFrom: '0001-01-01',
        validTo: '0001-01-01',
        url: 'https://azure/myfile2.pdf',
      },
    ],
  };
};

const useGetCertificates = (
  params?: GetCertificatesParams['params'],
  options?: UseQueryOptions<CertificatesCollection>
) =>
  useQuery({
    queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES, queryString.stringify(params ?? {})),
    queryFn: () => getCertificates({ params }),
    ...options,
  });

export default useGetCertificates;
