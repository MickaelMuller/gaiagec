import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as z from 'zod';

import supplierSchema from '../schemas/supplierSchema';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

type CreateSupplierInputs = z.infer<typeof supplierSchema>;

export const createSupplier = async (inputs: CreateSupplierInputs) => {
  try {
    const axiosInstance = await axios();
    const { data } = await axiosInstance.post('/suppliers', inputs);

    return data;
  } catch (error) {
    return null;
  }
};

const useCreateSupplier = (
  options?: UseMutationOptions<CreateSupplierInputs, AxiosError, CreateSupplierInputs>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputs) => createSupplier(inputs),
    ...options,
    onSuccess: (...props) => {
      queryClient.invalidateQueries(getQueryKey(QUERY_KEYS.SUPPLIERS));

      options?.onSuccess?.(...props);
    },
  });
};

export default useCreateSupplier;
