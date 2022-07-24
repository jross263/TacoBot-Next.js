import type { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';

const Dashboard = ({session}) => {
    console.log(session)
    return (
        <button onClick={() => signOut()}>Sign Out</button>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => { 

    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );
  
    if(!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {
      props: {session}
    }
  }

export default Dashboard