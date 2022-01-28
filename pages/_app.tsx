import "@material-tailwind/react/tailwind.css";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "next-auth/client"
import Header from "../components/Header"
import Head from 'next/head';
// import session from "../pages/index"
function MyApp({ Component, pageProps}: AppProps) {
  return (
    
    <>
    
      <Head>
        <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
/>
      </Head>
    <Provider session={pageProps.session}> <Component {...pageProps} /></Provider>
     
  
    </>
  
    
  
  )
}

export default MyApp
