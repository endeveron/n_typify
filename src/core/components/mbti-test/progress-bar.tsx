'use client';

import { TOTAL_QUESTION_GROUPS } from '@/core/components/mbti-test/mbti-test';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Progress } from '@/core/components/ui/progress';

type ProgressBarProps = {
  progress: number;
  questionGroupNum: number;
};

const ProgressBar = ({ progress, questionGroupNum }: ProgressBarProps) => {
  return (
    <AnimatedAppear
      delay={1000}
      className="sticky top-0 w-full h-14 flex items-center justify-between text-sm font-semibold rounded-full bg-card z-10"
    >
      <div className="w-20 flex justify-center">
        <div className="text-accent-text">{questionGroupNum}</div>
        <div className="ml-2 text-muted opacity-80">
          / {TOTAL_QUESTION_GROUPS}
        </div>
      </div>
      <div className="flex flex-1">
        <Progress value={progress} />
      </div>
      <div className="w-20 flex justify-center">
        <div className="text-accent-text">{progress}</div>
        <div className="ml-0.5 text-muted opacity-80">%</div>
      </div>
    </AnimatedAppear>
  );
};

export default ProgressBar;
