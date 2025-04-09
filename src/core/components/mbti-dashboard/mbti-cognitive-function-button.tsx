'use client';

import { CognitiveFunction } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type MBTICognitiveFunctionButtonProps = CognitiveFunction & {
  counter: number;
  onClick: () => void;
};

const MBTICognitiveFunctionButton = ({
  index,
  counter,
  icon,
  className,
  onClick,
}: MBTICognitiveFunctionButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center gap-1"
    >
      <div
        className={cn(
          `h-10 w-10 flex items-center justify-center rounded-full cursor-pointer`,
          className
        )}
      >
        <div className="scale-50">{icon}</div>
      </div>
      <div className="absolute -top-3 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-card">
        <div className="text-xs font-bold uppercase cursor-default">
          {counter}
        </div>
      </div>
      <div className="text-sm tracking-wider text-muted font-bold cursor-default">
        {index}
      </div>
    </div>
  );
};

export default MBTICognitiveFunctionButton;
