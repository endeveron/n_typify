'use client';

import { ReactElement } from 'react';

import { CardButton } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

// Icons
// `thinking` cognitive functions
import ExtravertedThinkingIcon from '~/public/icons/mbti/gear.svg';
import IntrovertedThinkingIcon from '~/public/icons/mbti/graph.svg';
// `feeling` cognitive functions
import ExtravertedFeelingIcon from '~/public/icons/mbti/heart.svg';
import IntrovertedFeelingIcon from '~/public/icons/mbti/theater.svg';
// `sensing` cognitive functions
import ExtravertedSensingIcon from '~/public/icons/mbti/bolt.svg';
import IntrovertedSensingIcon from '~/public/icons/mbti/home.svg';
// `intuition` cognitive functions
import IntrovertedIntuitionIcon from '~/public/icons/mbti/clock.svg';
import ExtravertedIntuitionIcon from '~/public/icons/mbti/squares.svg';

const cognFnIconMap = new Map<string, ReactElement>([
  ['Te', <ExtravertedThinkingIcon key={0} />],
  ['Ti', <IntrovertedThinkingIcon key={0} />],
  ['Fe', <ExtravertedFeelingIcon key={0} />],
  ['Fi', <IntrovertedFeelingIcon key={0} />],
  ['Se', <ExtravertedSensingIcon key={0} />],
  ['Si', <IntrovertedSensingIcon key={0} />],
  ['Ne', <ExtravertedIntuitionIcon key={0} />],
  ['Ni', <IntrovertedIntuitionIcon key={0} />],
]);

type TMBTICardButtonProps = CardButton & {
  onClick: () => void;
};

const MBTICardButton = ({ id, title, onClick }: TMBTICardButtonProps) => {
  const bgColor = cognFnColorMap.get(id);
  const icon = cognFnIconMap.get(id);

  return (
    <div onClick={onClick} className="w-16 flex flex-col items-center gap-3">
      <div
        className={cn(
          `h-16 w-16 flex items-center justify-center rounded-full cursor-pointer`,
          bgColor
        )}
      >
        <div className="scale-75">{icon}</div>
      </div>
      <div className="text-[10px] text-muted font-bold tracking-wider uppercase cursor-default opacity-80">
        {title}
      </div>
    </div>
  );
};

export default MBTICardButton;
