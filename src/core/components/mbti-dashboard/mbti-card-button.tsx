'use client';

import { CardButton } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

type TMBTICardButtonProps = CardButton & {
  onClick: () => void;
};

const MBTICardButton = ({ id, title, icon, onClick }: TMBTICardButtonProps) => {
  const bgColor = cognFnColorMap.get(id);

  return (
    <div onClick={onClick} className="w-16 flex flex-col items-center gap-3">
      <div
        className={cn(
          `h-16 w-16 flex items-center justify-center rounded-full cursor-pointer`,
          bgColor
        )}
      >
        <div className="scale-75">{icon}</div>
      </div>
      <div className="text-[10px] tracking-wider text-muted font-bold uppercase cursor-default opacity-60">
        {title}
      </div>
    </div>
  );
};

export default MBTICardButton;
