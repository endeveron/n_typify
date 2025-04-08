'use client';

import { useState } from 'react';

import RadioButton from '@/core/components/personality-test/radio-button';
import { AnswerMapData, Question } from '@/core/types/personality-test';
import { QuestionCardTranslation } from '@/core/types/translation';
import { cn } from '@/core/utils/common';

type QuestionCardProps = Question & {
  translation?: QuestionCardTranslation;
  activeQuestionId: string;
  onSelect: (data: AnswerMapData) => void;
};

const QuestionCard = ({
  id,
  translation,
  question,
  activeQuestionId,
  dichotomy,
  onSelect,
}: QuestionCardProps) => {
  const [checkedButtonValue, setCheckedButtonValue] = useState<number>();

  if (!translation) {
    throw new Error(`No translation for question ${id}`);
  }

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
        `question-card mt-6 pb-12 md:mt-8 md:pb-14 border-b border-b-border flex flex-col items-center transition-opacity`,
        {
          'opacity-20': activeQuestionId !== id,
        }
      )}
    >
      <div className="question m-8 text-center text-xl font-medium xl:text-2xl ">
        {question}
      </div>
      <div className="radio-group w-full flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4 md:gap-6">
        <div className="max-sm:hidden caption text-xl xl:text-2xl text-teal font-semibold cursor-default">
          {translation.attitudePositive}
        </div>
        <div className="radios w-full flex items-center justify-between max-md:max-w-96 md:w-[420px] xl:w-[500px]">
          <div className="w-12 h-12 xl:w-14 xl:h-14 cursor-pointer">
            <RadioButton
              label="I strongly agree"
              value={3}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-10 h-10 xl:w-12 xl:h-12 cursor-pointer">
            <RadioButton
              label="I moderately agree"
              value={2}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-8 h-8 xl:w-10 xl:h-10 cursor-pointer">
            <RadioButton
              label="I agree"
              value={1}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-8 h-8 xl:w-10 xl:h-10 cursor-pointer">
            <RadioButton
              label="I am not sure"
              value={0}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-8 h-8 xl:w-10 xl:h-10 cursor-pointer">
            <RadioButton
              label="I disagree"
              value={-1}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-10 h-10 xl:w-12 xl:h-12 cursor-pointer">
            <RadioButton
              label="I moderately disagree"
              value={-2}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-12 h-12 xl:w-14 xl:h-14 cursor-pointer">
            <RadioButton
              label="I strongly disagree"
              value={-3}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
        </div>
        <div className="max-sm:hidden caption text-xl xl:text-2xl text-purple font-semibold cursor-default">
          {translation.attitudeNegative}
        </div>
        <div className="captions-mobile w-full max-w-96 sm:hidden flex justify-between mt-4 text-sm font-semibold uppercase cursor-default">
          <div className="text-teal">{translation.attitudePositive}</div>
          <div className="text-purple">{translation.attitudeNegative}</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
