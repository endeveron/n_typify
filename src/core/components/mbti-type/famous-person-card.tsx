'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type FamousPersonCardProps = {
  name: string;
};

const FamousPersonCard = ({ name }: FamousPersonCardProps) => {
  const [isImgLoadError, setIsImgLoadError] = useState(false);
  const [nameGroup, setNameGroup] = useState<{
    firstName: string;
    lastName: string | undefined;
  }>();

  useEffect(() => {
    const nameArr = name.split(' ');
    const firstName = nameArr[0];

    let lastName;
    if (nameArr.length > 1) {
      lastName = nameArr.slice(1).reduce((val, curVal) => {
        return `${val} ${curVal}`;
      }, '');
    }

    setNameGroup({
      firstName,
      lastName,
    });
  }, [name]);

  const handleLoadError = () => {
    setIsImgLoadError(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-card overflow-hidden">
        {isImgLoadError ? (
          <div className="text-xl text-muted font-light opacity-70">
            {nameGroup?.firstName.charAt(0)}
            {nameGroup?.lastName?.charAt(1)}
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
        <div className="w-20 truncate">{nameGroup?.firstName}</div>
        <div className="w-20 truncate">{nameGroup?.lastName}</div>
      </div>
    </div>
  );
};

export default FamousPersonCard;
