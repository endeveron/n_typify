'use client';

import CognFunctionCard from '@/core/components/mbti-dashboard/cogn-function-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { CognitiveFnCard, CognitiveFnId } from '@/core/types/mbti';

type CognFunctionCardsProps = {
  cognitiveFnCards: CognitiveFnCard[];
  onClick: (id: CognitiveFnId) => void;
};

const CognFunctionCards = ({
  cognitiveFnCards,
  onClick,
}: CognFunctionCardsProps) => {
  return (
    <AnimatedAppear className="pb-1 flex flex-wrap items-center justify-center gap-1">
      {cognitiveFnCards?.map((data) => (
        <CognFunctionCard {...data} onClick={onClick} key={data.title} />
      ))}
    </AnimatedAppear>
  );
};

export default CognFunctionCards;
