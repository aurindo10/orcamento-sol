import { ClerkProvider } from "@clerk/nextjs";
import { AppProps, type AppType } from "next/app";
import type { NextPage } from "next/types";
import { ReactElement, ReactNode } from "react";
import "../styles/globals.css";
import { api } from "utils/api";
import { Analytics } from "@vercel/analytics/react";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);
  return (
    <div className="h-full min-h-screen bg-slate-900">
      <ClerkProvider {...pageProps}>{layout}</ClerkProvider>
      <Analytics />
      <div className="bg-slate-900 py-8 md:py-12"></div>
    </div>
  );
}

export default api.withTRPC(MyApp);
