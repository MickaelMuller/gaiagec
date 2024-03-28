import type { AppProps } from 'next/app';
import { Grape_Nuts, Hind, Poppins } from 'next/font/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import countries from 'i18n-iso-countries';
import { appWithTranslation } from 'next-i18next';

import { REACT_QUERY_DEFAULT_CONFIG } from '@/lib/utils/constants/react-query-default-config';

import '@/styles/globals.css';

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
  countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <main
          className={`${poppins.variable} ${grapeNuts.variable} ${hind.variable} min-h-screen bg-slate-50`}
        >
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
