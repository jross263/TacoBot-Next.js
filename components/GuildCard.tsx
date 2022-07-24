import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import discordLogo from '../public/discordlogo.png';
import { Tooltip } from './Tooltip';

interface GuildCardProps {
  guild: Guild
}

const GuildCard = ({ guild }: GuildCardProps) => {
  const [src, setSrc] = useState<string | StaticImageData>(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`);
  return (
    <div className="bg-gray-700 w-[100px] h-[100px] cursor-pointer">
      <Link href={`/dashboard/${guild.id}`}>
        <a>
          <Tooltip message={guild.name}>
            <Image alt="Guild Image" height={100} width={100} src={src} onError={() => setSrc(discordLogo)}></Image>
          </Tooltip>
        </a>
      </Link>
    </div>
  );
};
export default GuildCard;