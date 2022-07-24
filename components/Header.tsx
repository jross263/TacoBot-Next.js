import { signOut } from 'next-auth/react';
import Image from 'next/image'

interface HeaderProps {
  img: string;
}

const Header = ({ img }: HeaderProps) => {
  return (
    <div className="h-16 bg-gray-700 flex items-center">
      <div className='pl-2'>
        <Image src={img} width={50} height={50} className="rounded-full"></Image>
      </div>
      <div className='ml-auto pr-2'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white transistion duration-300 p-2 rounded-lg' onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  );
};

export default Header;