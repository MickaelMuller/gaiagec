import { UseQueryOptions as UseQueryOptionsReactQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Maybe } from './maybe';

export type UseQueryOptions<Tdata> = Partial<UseQueryOptionsReactQuery<Maybe<Tdata>, AxiosError>>;
