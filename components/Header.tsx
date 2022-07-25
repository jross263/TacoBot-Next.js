import { signOut } from 'next-auth/react';
import Image from 'next/image';

interface HeaderProps {
  img: string;
}

const Header = ({ img }: HeaderProps) => {
  return (
    <div className="h-16 w-screen bg-gray-700 flex items-center absolute">
      <div className='pl-2 flex items-center'>
        <Image alt='Profile Picture' src={img} width={50} height={50} className="rounded-full"></Image>
      </div>
      <div className='ml-auto pr-2'>
        <a href='https://discord.com/api/oauth2/authorize?client_id=262709306565066753&permissions=8&scope=bot' target='_blank' rel='noreferrer'>
          <button className='bg-green-500 hover:bg-green-700 text-white transistion duration-300 p-2 rounded-lg'>Add to server</button>
        </a>
      </div>
      <div className='pr-2'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white transistion duration-300 p-2 rounded-lg' onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  );
};

export default Header;