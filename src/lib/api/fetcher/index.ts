import { GetServerSidePropsContext } from 'next';
import baseAxios, { AxiosInstance, AxiosRequestConfig, HeadersDefaults } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';

import { RefreshTokenResult } from '@/types/api/refreshToken';
import { COOKIES } from '@/lib/utils/constants/cookies';
import { MINUTES, SECONDS } from '@/lib/utils/time';

import refreshTokenRequest from './refreshToken';

type FetcherProps = AxiosRequestConfig & {
  req?: GetServerSidePropsContext['req'];
  res?: GetServerSidePropsContext['res'];
  headers?: HeadersDefaults;
};

let refreshTokenFunction: Promise<RefreshTokenResult> | undefined;

const getUrl = (req?: GetServerSidePropsContext['req']): string => {
  if (req) {
    return req?.headers?.referer as string;
  }

  return window.location.href;
};

const axios = async (config?: FetcherProps): Promise<AxiosInstance> => {
  const req = config?.req;
  const res = config?.res;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const token = getCookie(COOKIES.GAIAGEC_TOKEN, { req }) as string;
  const refreshToken = getCookie(COOKIES.GAIAGEC_REFRESH_TOKEN, { req }) as string;

  const headers = {
    'Content-Type': 'application/json',
    'Referer': getUrl(req),
    'Origin': `next_app_${process.env.NODE_ENV}`,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...config?.headers,
  };

  const axios = baseAxios.create({
    baseURL: baseUrl,
    headers,
    timeout:
      process.env.NODE_ENV === 'development'
        ? MINUTES(1).inMilliseconds
        : SECONDS(20).inMilliseconds,
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error?.response?.data?.Code === 'GLB_UnauthorizedTokenExpired' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          if (!refreshTokenFunction)
            refreshTokenFunction = refreshTokenRequest({ refreshToken, token });
          const refreshTokenResponse = await refreshTokenFunction;

          if (!refreshTokenResponse?.newToken || !refreshTokenResponse?.newRefreshToken) {
            throw new Error('No token or refresh token');
          }

          const { newToken, newRefreshToken } = refreshTokenResponse;

          setCookie(COOKIES.GAIAGEC_TOKEN, newToken, {
            req,
            res,
            expires: dayjs(new Date()).add(6, 'day').toDate(),
          });
          setCookie(COOKIES.GAIAGEC_REFRESH_TOKEN, newRefreshToken, {
            req,
            res,
            expires: dayjs(new Date()).add(6, 'day').toDate(),
          });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axios(originalRequest);
        } catch (error) {
          deleteCookie(COOKIES.GAIAGEC_TOKEN, { req, res });
          deleteCookie(COOKIES.GAIAGEC_TOKEN, { req, res });
        } finally {
          refreshTokenFunction = undefined;
        }
      } else if (error.response.status === 401) {
        deleteCookie(COOKIES.GAIAGEC_TOKEN, { req, res });
        deleteCookie(COOKIES.GAIAGEC_REFRESH_TOKEN, { req, res });
      }

      return Promise.reject(error);
    }
  );

  return axios;
};

export default axios;
