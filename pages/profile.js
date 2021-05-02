import { useUser } from '../utils/useUser';
import Layout from '../components/layout';

export default function Page() {

  const [user, { mutate }] = useUser();
  console.log(user)

  return (
    <>
      <Layout>
        <h2>
          {(!user) ? 
          'Not authorized' :
          'Hello'}
        </h2>
      </Layout>
    </>
  )
}