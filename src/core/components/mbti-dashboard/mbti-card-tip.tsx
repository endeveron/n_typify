'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { CognitiveFnId } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

type TMBTICardTipProps = {
  id: CognitiveFnId;
  markers: string[];
  isAlignRight: boolean;
  onClick: () => void;
};

const MBTICardTip = ({
  id,
  isAlignRight,
  markers,
  onClick,
}: TMBTICardTipProps) => {
  const bgColor = cognFnColorMap.get(id);

  return (
    <AnimatedAppear
      onClick={onClick}
      className="w-16 flex flex-1 flex-col justify-between text-[10px] text-muted font-bold tracking-wide uppercase cursor-pointer select-none"
    >
      {markers.map((text) => (
        <div
          className={cn('relative', {
            'text-right pr-3': isAlignRight,
            'pl-3': !isAlignRight,
          })}
          key={text}
        >
          {text}
          <div
            className={cn(
              `absolute w-1 top-0 inset-y-0 rounded-full z-20`,
              {
                'right-0': isAlignRight,
                'left-0': !isAlignRight,
              },
              bgColor
            )}
          />
        </div>
      ))}
    </AnimatedAppear>
  );
};

export default MBTICardTip;
