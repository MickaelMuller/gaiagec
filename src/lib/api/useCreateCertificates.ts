import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as z from 'zod';

import certificateSchema from '../schemas/certificateSchema';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

type CertificatesInputs = z.infer<typeof certificateSchema>;

export const createCertificates = async (inputs: CertificatesInputs) => {
  try {
    const axiosInstance = await axios({ headers: { 'Content-Type': 'multipart/form-data' } });
    const { data } = await axiosInstance.post('/certificates', inputs);

    return data;
  } catch (error) {
    return null;
  }
};

const useCreateCertificates = (
  options?: UseMutationOptions<CertificatesInputs, AxiosError, CertificatesInputs>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputs) => createCertificates(inputs),
    ...options,
    onSuccess: (...props) => {
      queryClient.invalidateQueries(getQueryKey(QUERY_KEYS.CERTIFICATES));

      options?.onSuccess?.(...props);
    },
  });
};

export default useCreateCertificates;
