import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as z from 'zod';

import certificateSchema from '../schemas/certificateSchema';
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
) =>
  useMutation({
    mutationFn: (inputs) => createCertificates(inputs),
    ...options,
  });

export default useCreateCertificates;
