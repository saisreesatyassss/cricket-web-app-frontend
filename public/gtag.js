import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BE71J3TM4W"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BE71J3TM4W');
          `}
        </script>
      </Head>
      {children}
    </>
  );
}
