import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import * as z from 'zod';

import loginShema from '../schemas/loginShema';
import { COOKIES, expires } from '../utils/constants/cookies';
import axios from './fetcher';

export type LoginResponse = {
  username: string;
  email: string;
  token: string;
  refreshToken: string;
};

type LoginInputs = z.infer<typeof loginShema>;

export const login = async (inputs: LoginInputs) => {
  const axiosInstance = await axios();
  const { data } = await axiosInstance.post('/authentication/login', inputs);

  if (data?.token && data?.refreshToken) {
    setCookie(COOKIES.GAIAGEC_TOKEN, data.token, { expires });
    setCookie(COOKIES.GAIAGEC_REFRESH_TOKEN, data.refreshToken, { expires });
  }

  return data;
};

const useLogin = (options?: UseMutationOptions<LoginResponse, AxiosError, LoginInputs>) =>
  useMutation({
    mutationFn: (inputs: LoginInputs) => login(inputs),
    ...options,
  });

export default useLogin;
