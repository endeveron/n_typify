import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

type CardFunctionProps = {
  functionId: string;
  hideColorLine?: boolean;
  fadeFunctionId?: boolean;
};

const CardFunction = ({
  functionId,
  hideColorLine,
  fadeFunctionId,
}: CardFunctionProps) => {
  const bgColor = cognFnColorMap.get(functionId);

  return (
    <div className="w-4 flex flex-col items-center gap-1">
      {/* Colored line */}
      {!hideColorLine ? (
        <div className={cn(`w-[14px] h-1 rounded-full`, bgColor)}></div>
      ) : null}
      {/* Function ID */}
      <div
        className={cn(
          `text-[11px] text-muted font-bold leading-none transition-opacity`,
          {
            'opacity-40': fadeFunctionId,
            'opacity-80': !fadeFunctionId,
          }
        )}
      >
        {functionId}
      </div>
    </div>
  );
};

export default CardFunction;
