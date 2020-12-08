import Head from "next/head";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Za Market</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </>
);

export default Layout;
