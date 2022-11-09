import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import "../styles/app.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
