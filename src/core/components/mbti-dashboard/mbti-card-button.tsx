'use client';

import { ReactElement } from 'react';

import { CardButton } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

// Icons
// `thinking` cognitive functions
import IntrovertedThinkingIcon from '~/public/icons/mbti/chart.svg';
import ExtrovertedThinkingIcon from '~/public/icons/mbti/gear.svg';
// `feeling` cognitive functions
import ExtrovertedFeelingIcon from '~/public/icons/mbti/heart.svg';
import IntrovertedFeelingIcon from '~/public/icons/mbti/theater.svg';
// `sensing` cognitive functions
import ExtrovertedSensingIcon from '~/public/icons/mbti/bolt-lightning.svg';
import IntrovertedSensingIcon from '~/public/icons/mbti/home.svg';
// `intuition` cognitive functions
import IntrovertedIntuitionIcon from '~/public/icons/mbti/clock.svg';
import ExtrovertedIntuitionIcon from '~/public/icons/mbti/shapes.svg';

const cognFnIconMap = new Map<string, ReactElement>([
  ['Te', <ExtrovertedThinkingIcon key={0} />],
  ['Ti', <IntrovertedThinkingIcon key={0} />],
  ['Fe', <ExtrovertedFeelingIcon key={0} />],
  ['Fi', <IntrovertedFeelingIcon key={0} />],
  ['Se', <ExtrovertedSensingIcon key={0} />],
  ['Si', <IntrovertedSensingIcon key={0} />],
  ['Ne', <ExtrovertedIntuitionIcon key={0} />],
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
          `h-16 w-16 flex items-center justify-center text-white rounded-full cursor-pointer transition-colors`,
          // `h-16 w-16 flex items-center justify-center text-accent-text bg-black hover:bg-accent hover:text-black rounded-full cursor-pointer transition-colors`
          // `h-16 w-16 flex items-center justify-center text-black bg-accent rounded-full cursor-pointer transition-colors`
          bgColor
        )}
      >
        {icon}
      </div>
      <div className="text-[10px] text-muted font-bold tracking-wider uppercase cursor-default opacity-80 select-none">
        {title}
      </div>
    </div>
  );
};

export default MBTICardButton;
