'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/core/utils/common';

const MBTIVisual = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div
      className={cn(`relative opacity-0 transition-opacity duration-1000`, {
        'opacity-100': isReady,
      })}
    >
      <div className="animate-visual-inner">
        <Image
          src="/images/mbti-inner.svg"
          width={264}
          height={264}
          alt="mbti visual inner"
          priority
        />
      </div>

      <div className="absolute inset-0 animate-visual-outer">
        <Image
          src="/images/mbti-outer.svg"
          width={264}
          height={264}
          alt="mbti visual outer"
          priority
        />
      </div>
    </div>
  );
};

export default MBTIVisual;
