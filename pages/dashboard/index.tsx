import type { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Header from '../../components/Header';
import GuildCard from '../../components/GuildCard';

interface DashboardProps {
  user: User,
  guilds: Guild[]
}

const Dashboard = ({user, guilds} : DashboardProps) => {
  return (
    <>
      <Header img={user.image}/>
      <div className='pt-16 flex h-full gap-x-2 flex-wrap items-center justify-center'>
        {guilds.length > 0 ? guilds.map(g => <GuildCard key={g.id} guild={g}/>) : <h1 className='text-white text-xl'>You don&apos;t own any servers.</h1>}
      </div>
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
    };
  }

  return {
    props: {user: session.user, guilds: session.guilds}
  };
};

export default Dashboard;