import queryString from 'query-string';
import { isEmpty, reject } from 'ramda';

const getQueryParams = <T>(params: T) =>
  params ? `?${queryString.stringify(reject(isEmpty)(params ?? {}))}` : '';

export default getQueryParams;
