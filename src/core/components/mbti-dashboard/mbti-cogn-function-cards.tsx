'use client';

import MBTICognFunctionCard from '@/core/components/mbti-dashboard/mbti-cogn-function-card';
import { CognitiveFnCard } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type MBTICognFunctionCardsProps = {
  cognitiveFnCards: CognitiveFnCard[];
  onClick: (id: string) => void;
};

const MBTICognFunctionCards = ({
  cognitiveFnCards,
  onClick,
}: MBTICognFunctionCardsProps) => {
  const isCards = !!cognitiveFnCards.length;

  return (
    <div
      className={cn(
        `pb-1 flex flex-wrap items-center justify-center gap-1 transition-opacity`,
        {
          'opacity-0': !isCards,
          'opacity-100': isCards,
        }
      )}
    >
      {cognitiveFnCards?.map((data) => (
        <MBTICognFunctionCard {...data} onClick={onClick} key={data.title} />
      ))}
    </div>
  );
};

export default MBTICognFunctionCards;
