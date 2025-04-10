'use client';

import MBTICognFunctionCard from '@/core/components/mbti-dashboard/mbti-cogn-function-card';
import { CognitiveFnCard } from '@/core/types/mbti';

type MBTICognFunctionCardsProps = {
  cognitiveFnCards: CognitiveFnCard[];
  onClick: (id: string) => void;
};

const MBTICognFunctionCards = ({
  cognitiveFnCards,
  onClick,
}: MBTICognFunctionCardsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {cognitiveFnCards.map((data) => (
        <MBTICognFunctionCard {...data} onClick={onClick} key={data.title} />
      ))}
    </div>
  );
};

export default MBTICognFunctionCards;
