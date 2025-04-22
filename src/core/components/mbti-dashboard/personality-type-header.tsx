'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { MBTIType } from '@/core/types/mbti';

type PersonalityTypeHeaderProps = {
  MBTIType: MBTIType;
  title: string;
  subtitle: string;
};

const PersonalityTypeHeader = ({
  MBTIType,
  title,
  subtitle,
}: PersonalityTypeHeaderProps) => {
  return (
    <AnimatedAppear
      isShown={!!MBTIType}
      className="flex flex-1 flex-col items-center justify-center uppercase cursor-default"
    >
      {/* MBTI Personality Type */}
      <div className="text-5xl leading-none text-muted font-bold tracking-wide opacity-50">
        {MBTIType}
      </div>
      {/* Title */}
      <div className="my-0.5 text-accent text-xl font-extrabold tracking-wider">
        {`The ${title}`}
      </div>
      {/* Subtitle */}
      <div className="text-muted text-[11px] font-bold tracking-wider opacity-80">
        {subtitle}
      </div>
    </AnimatedAppear>
  );
};

export default PersonalityTypeHeader;
