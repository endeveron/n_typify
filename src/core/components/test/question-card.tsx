'use client';

import { useState } from 'react';

import RadioButton from '@/core/components/test/radio-button';
import { Question, AnswerMapData } from '@/core/types/personality';
import { cn } from '@/core/utils/common';

type QuestionCardProps = Question & {
  activeQuestionId: string;
  onSelect: (data: AnswerMapData) => void;
};

const QuestionCard = ({
  id,
  question,
  activeQuestionId,
  dichotomy,
  onSelect,
}: QuestionCardProps) => {
  const [checkedButtonValue, setCheckedButtonValue] = useState<number>();

  const handleRadioButtonClick = (value: number) => {
    setCheckedButtonValue(value);
    onSelect({
      questionId: id,
      traitIndex: value > 0 ? dichotomy[0] : dichotomy[1],
      value: Math.abs(value),
    });
  };

  return (
    <div
      id={id}
      className={cn(
        `question-card mt-6 pb-12 border-b border-b-border flex flex-col items-center transition-opacity`,
        {
          'opacity-40': activeQuestionId !== id,
        }
      )}
    >
      <div className="question m-8 text-center text-xl font-medium leading-8">
        {question}
      </div>
      <div className="radio-group w-full flex flex-col items-center sm:flex-row sm:justify-center sm:gap-2 md:gap-4">
        <div className="max-sm:hidden caption text-xl md:text-2xl text-green font-semibold">
          Agree
        </div>
        <div className="radios w-full flex items-center justify-between max-w-96 sm:max-w-[440px] sm:gap-1">
          <div className="w-14 h-14 sm:w-16 sm:h-16 cursor-pointer">
            <RadioButton
              label="I strongly agree"
              value={3}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14">
            <RadioButton
              label="I moderately agree"
              value={2}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12">
            <RadioButton
              label="I agree"
              value={1}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10">
            <RadioButton
              label="I am not sure"
              value={0}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12">
            <RadioButton
              label="I disagree"
              value={-1}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14">
            <RadioButton
              label="I moderately disagree"
              value={-2}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16">
            <RadioButton
              label="I strongly disagree"
              value={-3}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
        </div>
        <div className="max-sm:hidden caption text-xl md:text-2xl text-purple font-semibold">
          Disagree
        </div>
        <div className="captions-mobile w-full max-w-96 sm:hidden flex justify-between mt-4 font-semibold uppercase">
          <div className="text-green">Agree</div>
          <div className="text-purple">Disagree</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
