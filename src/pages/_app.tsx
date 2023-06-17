import '../styles/globals.css';
import Layout from '@components/common/layout';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense, useEffect, useState } from 'react';
import { Router } from 'next/router';
import type { AppProps } from 'next/app';
import Loader from '@components/common/Loader';
import { CONFIG } from '@config';
import axios from 'axios';
const LOADING_IMAGE_SRC = `${CONFIG.API_CLOUD}/images/etc/loading.png`;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: { retry: 0, useErrorBoundary: true },
  },
});
declare global {
  interface Window {
    Kakao: any;
    kakao: any;
    adsbygoogle: any;
  }
}
function imagePreload(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    imagePreload([LOADING_IMAGE_SRC]);
  }, []);

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  console.warn = console.error = () => {};

  useEffect(() => {
    setScreenSize();
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    if (navigator.userAgent.includes('KAKAOTALK')) {
      window.location.href =
        'intent://hollang.swygbro.com//#Intent;scheme=https;package=com.android.chrome;end';
    }

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Layout>
      {/* <MetaHead /> */}
      <Suspense fallback={<Loader />}>
        <RecoilRoot>
          <QueryClientProvider client={client}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </RecoilRoot>
      </Suspense>
    </Layout>
  );
}

App.getInitialProps = async ({ Component, ctx }: any) => {
  axios.defaults.baseURL = CONFIG.API_END_POINT;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  };
};
