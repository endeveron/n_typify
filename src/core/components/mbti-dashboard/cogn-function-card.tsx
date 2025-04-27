'use client';

import { useState } from 'react';

import MBTICardButton from '@/core/components/mbti-dashboard/mbti-card-button';
import MBTICardTip from '@/core/components/mbti-dashboard/mbti-card-tip';
import { CognitiveFnCard, CognitiveFnId } from '@/core/types/mbti';

type CognitiveFnCardProps = CognitiveFnCard & {
  onClick: (id: CognitiveFnId) => void;
};

const CognFunctionCard = ({
  title,
  cognitiveFunctions,
  onClick,
}: CognitiveFnCardProps) => {
  const [isTip, setIsTip] = useState(false);

  const handleToggleTip = () => {
    setIsTip((prev) => !prev);
  };

  return (
    <div className="flex flex-col p-4 bg-card rounded-3xl select-none">
      {/* Title */}
      <div className="flex justify-center">
        <div
          className="pb-2 text-xs text-accent-text tracking-wider font-semibold uppercase cursor-pointer"
          onClick={handleToggleTip}
        >
          {title}
        </div>
      </div>

      {/* Cognitive Function Indexes */}
      <div className="-mt-3 mb-1 flex items-center justify-between text-muted text-xs uppercase font-semibold cursor-default opacity-40">
        <span>{cognitiveFunctions[0].id}</span>
        <span>{cognitiveFunctions[1].id}</span>
      </div>

      {/* Cognitive Fn Buttons / Tip */}
      {isTip ? (
        <div className="w-36 h-22 flex gap-4 justify-between">
          {cognitiveFunctions.map((data, index) => (
            <MBTICardTip
              id={data.id}
              markers={data.markers as string[]}
              onClick={() => onClick(data.id)}
              isAlignRight={index === 1}
              key={data.title}
            />
          ))}
        </div>
      ) : (
        <div className="w-36 h-22 flex justify-between">
          {cognitiveFunctions.map((data) => (
            <MBTICardButton
              id={data.id}
              title={data.title}
              onClick={() => onClick(data.id)}
              key={data.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CognFunctionCard;
