import Head from "next/head";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Za Market</title>
      <link rel="img/icon" href="/favicon.ico" />
    </Head>
    {children}
  </>
);

export default Layout;
