import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import LoginForm from '../components/login';
import RegisterButton from '../components/register-buttons';

export default function Home() {
  return (
    <Layout>
      <div className='container'>
        <div className='col-sm-8'>
          <LoginForm />
          
          <hr />

          <div className='d-grid gap-1 col-sm mb-4'>
            <RegisterButton google login />
            <RegisterButton login />
          </div>

          <p>
            Don't have an account?{' '}
            <a href='/new-user'>Register here.</a>
          </p>
          
        </div>
      </div>


    </Layout>
  )
}
