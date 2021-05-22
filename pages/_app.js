import React from "react";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
    <title>Onmify Assessment</title>
    </Head>
    <Component {...pageProps} />
    </>

  )
  
  
}

export default MyApp