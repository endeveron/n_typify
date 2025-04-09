'use client';

import MBTICardButton from '@/core/components/mbti-dashboard/mbti-card-button';
import { CognitiveFnCard } from '@/core/types/mbti';

type MBTICognitiveFnCardProps = CognitiveFnCard & {
  onClick: (index: string) => void;
};

const MBTICognitiveFunctionCard = ({
  title,
  cognitiveFunctions,
  onClick,
}: MBTICognitiveFnCardProps) => {
  return (
    <div className="flex flex-col px-3 py-4 bg-card rounded-4xl">
      {/* Title */}
      <div className="text-center text-sm font-bold uppercase cursor-default">
        {title}
      </div>

      {/* Cognitive Function Indexes */}
      <div className="-mt-2 px-1 flex justify-between opacity-40">
        <div className="text-muted font-bold cursor-default">
          {cognitiveFunctions[0].index}
        </div>
        <div className="text-muted font-bold cursor-default">
          {cognitiveFunctions[1].index}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {cognitiveFunctions.map((data) => (
          <MBTICardButton
            {...data}
            onClick={() => onClick(data.index)}
            key={data.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MBTICognitiveFunctionCard;
