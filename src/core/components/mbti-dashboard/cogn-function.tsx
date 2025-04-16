'use client';

import { CognFunction as TCognFunction } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';
import { useEffect, useState } from 'react';

type CognFunctionProps = TCognFunction & {
  counter: number;
  onClick: () => void;
  isShadow?: boolean;
  index?: number;
};

const CognFunction = ({
  id,
  title,
  description,
  counter,
  onClick,
  isShadow,
  index,
}: CognFunctionProps) => {
  const [isReady, setIsReady] = useState(false);

  const bgColor = cognFnColorMap.get(id);

  useEffect(() => {
    setIsReady(!!id);
  }, [id]);

  return (
    <div
      onClick={onClick}
      className={cn(
        `flex items-center gap-2 text-xs uppercase cursor-pointer select-none transition-opacity`,
        {
          'opacity-0': !isReady,
          'opacity-100': isReady,
        }
      )}
    >
      <div
        className={cn(
          `w-24 text-right text-[11px] text-muted font-medium tracking-wide opacity-80`,
          {
            'text-foreground opacity-100': !isShadow && index === 0,
            'text-foreground': !isShadow && index === 1,
          }
        )}
      >
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

export default CognFunction;
