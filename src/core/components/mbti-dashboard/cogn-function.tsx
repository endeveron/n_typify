'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { CognFunction as TCognFunction } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

type CognFunctionProps = TCognFunction & {
  counter: number;
  onClick: () => void;
  isShadow?: boolean;
  index: number;
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
        className={cn(`flex items-center gap-2 text-xs uppercase select-none`, {
          'cursor-pointer': !!counter,
        })}
      >
        <div
          className={cn(`w-[104px] text-right text-[11px] tracking-wide`, {
            'font-semibold': !isShadow && index < 2, // 1st group 1st and 2nd items
            'opacity-70': !isShadow && index >= 2, // 1st group 3rd and 4th items
            'text-muted opacity-80': isShadow, // 2nd group
          })}
        >
          {title}
        </div>

        {/* Counter */}
        {!!counter ? (
          <div className="min-w-4 text-center font-bold">{counter}</div>
        ) : null}

        {/* Function ID */}
        <div className="w-4 text-center text-muted font-bold tracking-wide">
          {id}
        </div>

        {/* Colored Line */}
        <div className={cn(`h-3 w-1 rounded-full`, bgColor)}></div>

        <div
          className={cn(`w-[208px] tracking-wide`, {
            'text-accent-text font-semibold': !isShadow && index < 2, // 1st group 1st and 2nd items
            'font-medium opacity-70': !isShadow && index >= 2, // 1st group 3rd and 4th items
            'text-muted': isShadow, // 2nd group
          })}
        >
          {description}
        </div>
      </div>
    </AnimatedAppear>
  );
};

export default CognFunction;
