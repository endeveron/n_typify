'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { CognFunction as TCognFunction } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

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
  const bgColor = cognFnColorMap.get(id);

  return (
    <AnimatedAppear>
      <div
        onClick={onClick}
        className="flex items-center gap-2 text-xs uppercase cursor-pointer select-none"
      >
        <div
          className={cn(
            `w-[104px] text-right text-[11px] text-muted font-medium tracking-wide opacity-80`,
            {
              'text-foreground opacity-100': !isShadow && index === 0,
              'text-foreground': !isShadow && index === 1,
            }
          )}
        >
          {title}
        </div>
        <div
          className={cn(`relative h-5 w-5 flex items-center justify-center`)}
        >
          <div
            className={cn(`absolute z-0 inset-0 rounded-full`, bgColor)}
          ></div>
          <div className="relative z-10 font-extrabold">{counter}</div>
        </div>
        <div className="w-4 text-center text-muted font-medium tracking-wide opacity-90">
          {id}
        </div>
        <div
          className={cn(`w-[208px] font-medium tracking-wide`, {
            'text-accent-text': !isShadow,
            'font-semibold': !isShadow && (index === 0 || index === 1),
            'opacity-80': index === 2,
            'opacity-60': index === 3,
          })}
        >
          {description}
        </div>
      </div>
    </AnimatedAppear>
  );
};

export default CognFunction;
