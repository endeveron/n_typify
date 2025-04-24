'use client';

import { useState } from 'react';

import RadioButton from '@/core/components/mbti-test/radio-button';
import { AnswerMapData, Question } from '@/core/types/mbti';
import { QuestionCardTranslation } from '@/core/types/translation';
import { cn } from '@/core/utils/common';

type MBTITestCardProps = Question & {
  translation?: QuestionCardTranslation;
  activeQuestionId: string;
  onSelect: (data: AnswerMapData) => void;
};

const MBTITestCard = ({
  id,
  translation,
  question,
  activeQuestionId,
  dichotomy,
  onSelect,
}: MBTITestCardProps) => {
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
        `question-card mt-4 px-4 pb-10 border-b border-b-border flex flex-col items-center transition-opacity`,
        {
          'opacity-20': activeQuestionId !== id,
        }
      )}
    >
      <div className="question my-6 text-center text-accent-text font-medium tracking-wide">
        {question}
      </div>
      <div className="radio-group w-full flex flex-col items-center">
        <div className="radios w-full flex items-center justify-between">
          <div className="w-12 h-12 cursor-pointer">
            <RadioButton
              label="I strongly agree"
              value={3}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-10 h-10 cursor-pointer">
            <RadioButton
              label="I moderately agree"
              value={2}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-8 h-8 cursor-pointer">
            <RadioButton
              label="I agree"
              value={1}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-8 h-8 cursor-pointer">
            <RadioButton
              label="I am not sure"
              value={0}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-8 h-8 cursor-pointer">
            <RadioButton
              label="I disagree"
              value={-1}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-10 h-10 cursor-pointer">
            <RadioButton
              label="I moderately disagree"
              value={-2}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
          <div className="w-12 h-12 cursor-pointer">
            <RadioButton
              label="I strongly disagree"
              value={-3}
              checkedButtonValue={checkedButtonValue}
              onClick={handleRadioButtonClick}
            />
          </div>
        </div>
        <div className="captions-mobile w-full flex justify-between mt-4 text-muted text-xs font-medium tracking-wider uppercase cursor-default opacity-50">
          <div>{translation.attitudePositive}</div>
          <div>{translation.attitudeNegative}</div>
        </div>
      </div>
    </div>
  );
};

export default MBTITestCard;
