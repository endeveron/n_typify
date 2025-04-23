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
  return (
    <div className="flex flex-col p-4 bg-card rounded-3xl select-none">
      {/* Title */}
      <div className="relative text-center text-xs text-accent-text tracking-wider font-semibold uppercase cursor-default">
        {title}
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
