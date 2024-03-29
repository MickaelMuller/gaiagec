import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Grape_Nuts, Hind, Poppins } from 'next/font/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';

import { REACT_QUERY_DEFAULT_CONFIG } from '@/lib/utils/constants/react-query-default-config';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const grapeNuts = Grape_Nuts({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grapeNuts',
  weight: '400',
});

const hind = Hind({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hind',
  weight: ['300', '400', '500', '600', '700'],
});

const queryClient = new QueryClient(REACT_QUERY_DEFAULT_CONFIG);

function App({ Component, pageProps: { dehydratedState, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <main className={`${poppins.variable} ${grapeNuts.variable} ${hind.variable}`}>
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
