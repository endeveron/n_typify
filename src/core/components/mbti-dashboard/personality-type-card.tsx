'use client';

import { MBTIPersonalityType } from '@/core/types/mbti';

type MBTITypeCardProps = {
  personalityType: MBTIPersonalityType;
  // onClick: (personalityType: MBTIPersonalityType) => void;
};

const PersonalityTypeCard = ({}: // personalityType,
// onClick,
MBTITypeCardProps) => {
  // const personalityType = personality.mbti.personalityType;

  // const functions = useMemo(() => {
  //   return personality.mbti.functions
  //     .slice(0, 4)
  //     .map((id) => ({ functionId: id }));
  // }, [personality.mbti.functions]);

  // const handleCardClick = () => {
  //   onClick(personalityType);
  // };

  return null;

  // return (
  //   <AnimatedAppear
  //     // isShown={!!personality}
  //     onClick={handleCardClick}
  //     className={cn(
  //       `flex flex-col items-center p-2 bg-background rounded-xl select-none cursor-pointer`
  //     )}
  //   >
  //     {/* Title */}
  //     <div className="my-0.5 text-[11px] leading-none uppercase font-bold text-accent tracking-wide">
  //       {personality.translation.title[0]}
  //     </div>

  //     {/* MBTI Personality Type */}
  //     <div
  //       className={cn(`my-1 text-2xl font-bold tracking-wide leading-none`, {
  //         'text-accent': matchPercent === 100,
  //         'text-muted opacity-60': matchPercent < 100,
  //       })}
  //     >
  //       {personalityType}
  //     </div>

  //     {/* Match Scale */}
  //     <div className="relative my-0.5 h-1 w-full">
  //       <ProgressSmall value={matchPercent} />
  //     </div>

  //     {/* Functions */}
  //     <div className="mt-2 flex justify-center gap-1.5">
  //       {functions?.map((item) => (
  //         <CardFunction
  //           functionId={item.functionId}
  //           key={item.functionId}
  //         />
  //       ))}
  //     </div>
  //   </AnimatedAppear>
  // );
};

export default PersonalityTypeCard;
