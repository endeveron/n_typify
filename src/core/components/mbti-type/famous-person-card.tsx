'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import Image from 'next/image';
import { useMemo, useState } from 'react';

// https://ui-avatars.com/avatar-placeholder/

type FamousPersonCardProps = {
  name: string;
};

const FamousPersonCard = ({ name }: FamousPersonCardProps) => {
  const [isImgLoadError, setIsImgLoadError] = useState(false);

  const nameArr = useMemo(() => name.split(' '), [name]);

  const firstName = nameArr[0];
  const secondName = nameArr[1] ?? '';

  const handleLoadError = () => {
    setIsImgLoadError(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-card overflow-hidden">
        {isImgLoadError ? (
          <div className="text-xl text-muted font-light opacity-60">
            {firstName[0]}
            {secondName[0]}
          </div>
        ) : (
          <AnimatedAppear>
            <Image
              onError={handleLoadError}
              src={`/images/famous-persons/${name}.jpg`}
              width={80}
              height={80}
              priority
              quality={100}
              alt={name}
            />
          </AnimatedAppear>
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
