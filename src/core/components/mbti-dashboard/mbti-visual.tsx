'use client';

import {
  DASHBOARD_STATE_KEY,
  MBTI_TYPE_STATE_KEY,
  MBTI_TYPES_STATE_KEY,
} from '@/core/constants';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { cn } from '@/core/utils/common';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MBTIVisual = () => {
  const [, saveState] = useLocalStorage();

  const [isReady, setIsReady] = useState(false);

  const handleClick = () => {
    saveState(DASHBOARD_STATE_KEY, null);
    saveState(MBTI_TYPE_STATE_KEY, null);
    saveState(MBTI_TYPES_STATE_KEY, null);
  };

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div
      onClick={handleClick}
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
