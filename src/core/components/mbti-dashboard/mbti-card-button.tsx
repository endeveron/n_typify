'use client';

import { CardButton } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type TMBTICardButtonProps = CardButton & {
  onClick: () => void;
};

const MBTICardButton = ({
  title,
  icon,
  className,
  onClick,
}: TMBTICardButtonProps) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-3">
      <div
        className={cn(
          `h-20 w-20 flex items-center justify-center rounded-full cursor-pointer`,
          className
        )}
      >
        {icon}
      </div>
      <div className="text-[10px] tracking-wider text-muted font-bold uppercase cursor-default">
        {title}
      </div>
    </div>
  );
};

export default MBTICardButton;
