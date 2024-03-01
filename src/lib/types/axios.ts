import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { AxiosRequestConfig } from 'axios';

export type Axios = AxiosRequestConfig & {
  headers?: Record<string, string>;
  cookies?: () => ReadonlyRequestCookies;
};
