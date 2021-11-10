import { signOut, getSession } from 'next-auth/client';
import { Button } from '@chakra-ui/react'

const Dashboard = () => {
    return (
        <Button onClick={() => signOut()}>Sign Out</Button>
    );
};

export async function getServerSideProps(context) { 
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