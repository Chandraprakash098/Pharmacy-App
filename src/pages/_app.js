import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
