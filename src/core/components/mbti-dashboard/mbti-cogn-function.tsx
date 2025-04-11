'use client';

import { CognFunction } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

type MBTICognFunctionProps = CognFunction & {
  counter: number;
  onClick: () => void;
};

const MBTICognFunction = ({
  id,
  title,
  description,
  counter,
  onClick,
}: MBTICognFunctionProps) => {
  const bgColor = cognFnColorMap.get(id);

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 text-xs uppercase cursor-pointer"
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
      <div className="font-medium tracking-wide">{description}</div>
    </div>
  );
};

export default MBTICognFunction;
