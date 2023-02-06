import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "src/apollo/client";
import Layout from "@/components/Layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
