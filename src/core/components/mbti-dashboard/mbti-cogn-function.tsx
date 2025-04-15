'use client';

import { CognFunction } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';
import { useEffect, useState } from 'react';

type MBTICognFunctionProps = CognFunction & {
  counter: number;
  onClick: () => void;
  isShadow?: boolean;
};

const MBTICognFunction = ({
  id,
  title,
  description,
  counter,
  onClick,
  isShadow,
}: MBTICognFunctionProps) => {
  const [isReady, setIsReady] = useState(false);

  const bgColor = cognFnColorMap.get(id);

  useEffect(() => {
    setIsReady(!!id);
  }, [id]);

  return (
    <div
      onClick={onClick}
      className={cn(
        `flex items-center gap-2 text-xs uppercase cursor-pointer transition-opacity`,
        {
          'opacity-0': !isReady,
          'opacity-100': isReady,
        }
      )}
    >
      <div className="w-24 text-right text-muted text-[11px] font-medium tracking-wide opacity-80">
        {title}
      </div>
      <div className={cn(`relative h-5 w-5 flex items-center justify-center`)}>
        <div className={cn(`absolute z-0 inset-0 rounded-full`, bgColor)}></div>
        <div className="relative z-10 font-extrabold">{counter}</div>
      </div>
      <div className="w-4 text-center text-muted font-medium tracking-wide opacity-90">
        {id}
      </div>
      <div
        className={cn(`font-medium tracking-wide`, {
          'text-accent': !isShadow,
        })}
      >
        {description}
      </div>
    </div>
  );
};

export default MBTICognFunction;
