'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import Image from 'next/image';
import { useMemo, useState } from 'react';

// https://ui-avatars.com/avatar-placeholder/

type FamousPersonCardProps = {
  name: string;
  imgSrc?: string;
};

const FamousPersonCard = ({ name, imgSrc }: FamousPersonCardProps) => {
  const [isImageReady, setIsImageReady] = useState(false);

  const nameArr = useMemo(() => name.split(' '), [name]);

  const firstName = nameArr[0];
  const secondName = nameArr[1] ?? '';

  const handleImgLoad = () => {
    setIsImageReady(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-card overflow-hidden">
        {imgSrc ? (
          <AnimatedAppear isShown={isImageReady}>
            <Image
              onLoad={handleImgLoad}
              src={imgSrc}
              width={80}
              height={80}
              priority
              quality={100}
              alt={name}
            />
          </AnimatedAppear>
        ) : (
          <div className="text-xl text-muted font-light opacity-60">
            {firstName[0]}
            {secondName[0]}
          </div>
        )}
      </div>
      <div className="mt-2 font-medium tracking-wide text-center text-xs text-muted opacity-80">
        <div className="w-20 truncate">{firstName}</div>
        <div className="w-20 truncate">{secondName}</div>
      </div>
    </div>
  );
};

export default FamousPersonCard;
