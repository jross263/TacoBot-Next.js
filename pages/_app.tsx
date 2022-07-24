import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
