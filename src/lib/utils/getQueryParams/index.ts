import queryString from 'query-string';
import { isEmpty, reject } from 'ramda';

export const rejectEmpty = reject(isEmpty);

const getQueryParams = <T>(params: T) =>
  params ? `?${queryString.stringify(rejectEmpty(params ?? {}))}` : '';

export default getQueryParams;
