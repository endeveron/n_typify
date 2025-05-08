'use client';

import MBTICardButton from '@/core/components/mbti-dashboard/mbti-card-button';
import MBTICardTip from '@/core/components/mbti-dashboard/mbti-card-tip';
import { CognitiveFnCard, CognitiveFnId } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import AnimatedAppear from '@/core/components/shared/animated-appear';

type CognitiveFnCardProps = CognitiveFnCard & {
  modeNum: number;
  onClick: (id: CognitiveFnId) => void;
  onChangeMode: () => void;
};

const CognFunctionCard = ({
  title,
  traitFeatures,
  cognitiveFunctions,
  modeNum,
  onClick,
  onChangeMode,
}: CognitiveFnCardProps) => {
  return (
    <div className="flex flex-col pt-2 px-4 pb-4 bg-card rounded-3xl no-select">
      {/* Title */}
      <div className="z-10 flex justify-center">
        <div
          className="px-4 py-2 text-xs text-accent-text tracking-wider font-semibold uppercase cursor-pointer"
          onClick={onChangeMode}
        >
          {title}
        </div>
      </div>

      {/* Cognitive Function Indexes */}
      <div
        className={cn(
          `-mt-3 mb-1 flex items-center justify-between text-muted text-xs uppercase font-semibold cursor-default transition-opacity`,
          {
            'opacity-0': modeNum === 2,
            'opacity-40': modeNum !== 2,
          }
        )}
      >
        <span>{cognitiveFunctions[0].id}</span>
        <span>{cognitiveFunctions[1].id}</span>
      </div>

      {/* Cognitive Fn Buttons */}
      {modeNum === 0 ? (
        <div className="w-36 h-22 flex justify-between">
          {cognitiveFunctions.map((data) => (
            <MBTICardButton
              id={data.id}
              title={data.title}
              onClick={() => onClick(data.id)}
              key={data.title}
            />
          ))}
        </div>
      ) : null}

      {/* Cognitive Fn Markers */}
      {modeNum === 1 ? (
        <div className="w-36 h-22 flex gap-4 justify-between">
          {cognitiveFunctions.map((data, index) => (
            <MBTICardTip
              id={data.id}
              markers={data.markers as string[]}
              onClick={() => onClick(data.id)}
              isAlignRight={index === 1}
              key={data.title}
            />
          ))}
        </div>
      ) : null}

      {/* Trait Features */}
      {modeNum === 2 ? (
        <AnimatedAppear
          timeout={250}
          className="w-36 h-22 min-h-22 flex flex-1 flex-col items-center justify-between select-none"
        >
          {traitFeatures.map((traitFeature) => (
            <div
              className="text-[10px] text-muted font-bold tracking-wide uppercase"
              key={traitFeature}
            >
              {traitFeature}
            </div>
          ))}
        </AnimatedAppear>
      ) : null}
    </div>
  );
};

export default CognFunctionCard;
