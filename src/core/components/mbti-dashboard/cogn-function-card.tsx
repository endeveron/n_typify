'use client';

import MBTICardButton from '@/core/components/mbti-dashboard/mbti-card-button';
import { CognitiveFnCard, CognitiveFnId } from '@/core/types/mbti';

type CognitiveFnCardProps = CognitiveFnCard & {
  onClick: (id: CognitiveFnId) => void;
};

const CognFunctionCard = ({
  title,
  cognitiveFunctions,
  onClick,
}: CognitiveFnCardProps) => {
  // const bgColor = cognFnColorMap.get(cognitiveFunctions[0].id);

  return (
    <div className="flex flex-col p-4 bg-card rounded-3xl select-none">
      {/* Title */}
      <div className="relative text-center text-xs text-accent-text tracking-wider font-semibold uppercase cursor-default">
        {title}

        {/* <div
          className={cn(
            `absolute left-1/2 w-4 h-1 rounded-full -bottom-4 -translate-2`,
            bgColor
          )}
        ></div> */}
      </div>

      {/* Cognitive Function Indexes */}
      <div className="-mt-2 mb-1 flex items-center justify-between opacity-40">
        <div className="text-muted text-xs uppercase font-semibold cursor-default">
          {cognitiveFunctions[0].id}
        </div>
        <div className="text-muted text-xs uppercase font-semibold cursor-default">
          {cognitiveFunctions[1].id}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {cognitiveFunctions.map((data) => (
          <MBTICardButton
            {...data}
            onClick={() => onClick(data.id)}
            key={data.title}
          />
        ))}
      </div>
    </div>
  );
};

export default CognFunctionCard;
