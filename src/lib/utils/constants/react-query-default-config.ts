import { isDevelopment } from '../environment';
import { MINUTES } from '../time';

export const REACT_QUERY_DEFAULT_CONFIG = {
  defaultOptions: {
    queries: {
      useErrorBoundary: isDevelopment,
      staleTime: MINUTES(5).inMilliseconds,
      refetchOnMount: false,
      retry: false,
    },
  },
};
