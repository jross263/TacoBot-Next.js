import type { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';

const Dashboard = () => {
    return (
        <button onClick={() => signOut()}>Sign Out</button>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => { 
    const session = await getSession(context)
    if(!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {
      props: {}
    }
  }

export default Dashboard