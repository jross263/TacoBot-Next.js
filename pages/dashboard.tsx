import type { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { getToken } from "next-auth/jwt"
import Header from '../components/Header';

interface User {
  email: string,
  name: string,
  image: string
}

interface Guild {
  features: string[],
  icon:string,
  id: string,
  name: string,
  owner: boolean,
  permissions: number,
  permissions_new: string
}

interface DashboardProps {
  user: User,
  guilds: Guild[]
}

const Dashboard = ({user, guilds} : DashboardProps) => {
    console.log(user, guilds)
    return (
      <>
      <Header img={user.image}/>
      </>
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
    const headers =  { headers: { Authorization: `Bearer ${session?.accessToken}` } }
    const guilds = await (await fetch('https://discord.com/api/v6/users/@me/guilds',headers)).json()

    return {
      props: {user: session.user, guilds}
    }
  }

export default Dashboard