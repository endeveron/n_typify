'use client';

import MBTICardButton from '@/core/components/mbti-dashboard/mbti-card-button';
import { CognitiveFnCard } from '@/core/types/mbti';

type MBTICognitiveFnCardProps = CognitiveFnCard & {
  onClick: (id: string) => void;
};

const MBTICognFunctionCard = ({
  title,
  cognitiveFunctions,
  onClick,
}: MBTICognitiveFnCardProps) => {
  return (
    <div className="flex flex-col p-4 bg-card rounded-3xl select-none">
      {/* Title */}
      <div className="text-center text-xs text-accent tracking-wider font-semibold uppercase cursor-default">
        {title}
      </div>

      {/* Cognitive Function Indexes */}
      <div className="-mt-1.5 flex items-center justify-between opacity-40">
        <div className="text-muted text-xs uppercase font-semibold cursor-default">
          {cognitiveFunctions[0].id}
        </div>
        <div className="text-muted text-sm uppercase font-semibold cursor-default">
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

export default MBTICognFunctionCard;
