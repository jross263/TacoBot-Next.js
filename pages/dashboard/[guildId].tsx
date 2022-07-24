import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { db } from '../../firebase';

interface GuildProps {
  logs: Log[];
}

const Guild = ({ logs }: GuildProps) => {
  return (
    <div className='flex justify-center items-center flex-col'>
      {logs.length > 0 ? logs.map((l, i) => (
        <div key={i}>
          <h1 className='text-white text-xl'>{l.userName} Used {l.commandName} @ {l.timestamp}</h1>
        </div>
      )) : <h1 className='text-white text-xl'>No logs</h1>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const guilds = session.guilds as Guild[];
  const { guildId } = context.query;
  const isOwner = guilds.some(g => g.id === guildId);

  if (!isOwner) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  const logs = (await db.collection('commandLog').where('guildId', '==', guildId).orderBy('timestamp', 'desc').get()).docs;

  const res: Log[] = [];

  logs.forEach(doc => {
    const rawData = doc.data();
    const d: Log = {
      userName: rawData.userName,
      commandName: rawData.commandName,
      timestamp: rawData.timestamp.toDate().toString()
    };
    res.push(d);
  });

  return {
    props: {
      logs: res
    }
  };
};

export default Guild;