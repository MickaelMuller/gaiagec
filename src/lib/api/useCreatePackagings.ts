import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as z from 'zod';

import packagingsShema from '../schemas/packagingsShema';
import QUERY_KEYS from '../utils/constants/query-keys';
import getQueryKey from '../utils/get-query-key';
import axios from './fetcher';

type CreatePackagingInputs = z.infer<typeof packagingsShema>;

export const createPackaging = async (inputs: CreatePackagingInputs) => {
  try {
    const axiosInstance = await axios();
    const { data } = await axiosInstance.post('/packagings', inputs);

    return data;
  } catch (error) {
    return null;
  }
};

const useCreatePackagings = (
  options?: UseMutationOptions<CreatePackagingInputs, AxiosError, CreatePackagingInputs>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputs) => createPackaging(inputs),
    ...options,
    onSuccess: (...props) => {
      queryClient.invalidateQueries(getQueryKey(QUERY_KEYS.PACKAGINGS));

      options?.onSuccess?.(...props);
    },
  });
};

export default useCreatePackagings;
