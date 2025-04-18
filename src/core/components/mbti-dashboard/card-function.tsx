import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

type CardFunctionProps = {
  functionId: string;
};

const CardFunction = ({ functionId }: CardFunctionProps) => {
  const bgColor = cognFnColorMap.get(functionId);

  return (
    <div className="w-4 flex flex-col items-center gap-1">
      {/* Colored line */}
      <div className={cn(`w-[14px] h-1 rounded-full`, bgColor)}></div>
      {/* Function ID */}
      <div className="text-[11px] text-muted font-bold leading-none opacity-80">
        {functionId}
      </div>
    </div>
  );
};

export default CardFunction;
