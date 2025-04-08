'use client';

import MBTICardButton from '@/core/components/mbti-dashboard/mbti-card-button';
import { CognitiveFnCard } from '@/core/types/mbti';

type MBTICognitiveFnCardProps = CognitiveFnCard & {};

const MBTICognitiveFunctionCard = ({
  title,
  cognitiveFunctions,
}: MBTICognitiveFnCardProps) => {
  return (
    <div className="flex flex-col px-3 py-4 bg-card rounded-4xl">
      {/* Title */}
      <div className="text-center font-bold uppercase">{title}</div>

      {/* Cognitive Function Indexes */}
      <div className="-mt-2 px-1 flex justify-between opacity-40">
        <div className="text-muted font-bold">
          {cognitiveFunctions[0].index}
        </div>
        <div className="text-muted font-bold">
          {cognitiveFunctions[1].index}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {cognitiveFunctions.map((data) => (
          <MBTICardButton {...data} key={data.title} />
        ))}
      </div>
    </div>
  );
};

export default MBTICognitiveFunctionCard;
