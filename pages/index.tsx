import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]';

import { FaDiscord } from 'react-icons/fa';
import profilePic from '../public/tacobot.png';



const Home: NextPage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-5 md:flex-row text-center ml-5 mr-5 md:text-left">
        <Image src={profilePic} width={250} height={250} alt="" />
        <div className="flex flex-col">
          <h1 className="text-6xl text-white font-semibold">Hi, I&apos;m TacoBot</h1>
          <p className="text-xl text-white">To use my features, please authenticate with Discord below</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white transistion duration-300 rounded-xl p-2 flex justify-center items-center gap-2"
            onClick={() => signIn('discord')}
          >
            <FaDiscord /> Authenticate
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {}
  };
};

export default Home;
