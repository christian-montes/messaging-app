import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import LoginForm from '../components/login';

export default function Home() {
  return (
    <Layout>
      <LoginForm />

      <hr />

      <p>
        Don't have an account?{' '}
        <a href='/new-user'>Register here.</a>
      </p>

    </Layout>
  )
}
