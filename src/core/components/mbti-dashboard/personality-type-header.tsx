'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { MBTIPersonalityItem } from '@/core/types/mbti';

type PersonalityTypeHeaderProps = {
  personality: MBTIPersonalityItem | null;
};

const PersonalityTypeHeader = ({ personality }: PersonalityTypeHeaderProps) => {
  return (
    <AnimatedAppear
      isShown={!!personality}
      className="my-6 flex flex-1 flex-col items-center justify-center uppercase cursor-default"
    >
      {!!personality ? (
        <>
          {/* MBTI Personality Type */}
          <div className="text-5xl leading-none text-muted font-bold tracking-wide opacity-50">
            {personality.mbti.personalityType}
          </div>
          {/* Title */}
          <div className="my-0.5 text-accent text-xl font-extrabold tracking-wider">
            {`The ${personality.translation.title[0]}`}
          </div>
          {/* Subtitle */}
          <div className="text-muted text-[11px] font-bold tracking-wider opacity-80">
            {personality.translation.subtitle}
          </div>
        </>
      ) : null}
    </AnimatedAppear>
  );
};

export default PersonalityTypeHeader;
