// importing bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.css';

// importing global stylesheet
import '../styles/globals.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta 
          name='viewport' 
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
