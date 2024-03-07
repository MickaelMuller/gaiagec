import { UseQueryOptions as UseQueryOptionsReactQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type UseQueryOptions<Tdata> = Partial<UseQueryOptionsReactQuery<Tdata | null, AxiosError>>;
