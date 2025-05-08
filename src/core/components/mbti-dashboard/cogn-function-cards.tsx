'use client';

import CognFunctionCard from '@/core/components/mbti-dashboard/cogn-function-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { CognitiveFnCard, CognitiveFnId } from '@/core/types/mbti';
import { useState } from 'react';

export const COGNITIVE_FN_CARD_STATE_MAX_NUM = 2;

type CognFunctionCardsProps = {
  cognitiveFnCards: CognitiveFnCard[];
  onClick: (id: CognitiveFnId) => void;
};

const CognFunctionCards = ({
  cognitiveFnCards,
  onClick,
}: CognFunctionCardsProps) => {
  const [cardModeNum, setCardModeNum] = useState(0);

  const handleChangeMode = () => {
    setCardModeNum((prev) =>
      prev === COGNITIVE_FN_CARD_STATE_MAX_NUM ? 0 : prev + 1
    );
  };

  return (
    <AnimatedAppear className="flex flex-wrap items-center justify-center gap-1">
      {cognitiveFnCards?.map((data) => (
        <CognFunctionCard
          {...data}
          modeNum={cardModeNum}
          onClick={onClick}
          onChangeMode={handleChangeMode}
          key={data.title}
        />
      ))}
    </AnimatedAppear>
  );
};

export default CognFunctionCards;
