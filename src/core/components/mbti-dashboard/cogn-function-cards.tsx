'use client';

import CognFunctionCard from '@/core/components/mbti-dashboard/cogn-function-card';
import { CognitiveFnCard, CognitiveFnId } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type CognFunctionCardsProps = {
  cognitiveFnCards: CognitiveFnCard[];
  onClick: (id: CognitiveFnId) => void;
};

const CognFunctionCards = ({
  cognitiveFnCards,
  onClick,
}: CognFunctionCardsProps) => {
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
        <CognFunctionCard {...data} onClick={onClick} key={data.title} />
      ))}
    </div>
  );
};

export default CognFunctionCards;
