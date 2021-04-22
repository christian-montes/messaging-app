import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';

export default function Layout({ children, authenticated, wider }) {
    return (
        <div className={wider ? styles.wider : styles.container}>
          <Head>
            <meta
              name='keywords'
              content='messaging chat room'
            />
            <meta
              name='og:title'
              content='Messaging chat room'
            />
            <meta
              name='twitter:card'
              content='Placeholder'
            />
          </Head>

          <header className={styles.header}>
            {authenticated && (
                <Link href='/'>
                  <a>Logout</a>
                </Link>
            )}
          </header>
          <main>{children}</main>

          {wider && (
            <div className={styles.backToLogin}>
              <Link href='/'>
                <a>← Back to login page</a>
              </Link>
            </div>
          )}
        </div>
    )
}