'use client';

import QuestionCard from '@/core/components/test/question-card';
import { Button } from '@/core/components/ui/button';
import { Progress } from '@/core/components/ui/progress';
import { QUESTIONS } from '@/core/data/questions';
import { AnswerMapData, Question, TraitIndex } from '@/core/types/personality';
import { useCallback, useRef, useState } from 'react';

// type TPersonalityTestProps = {};
// const PersonalityTest = (props: TPersonalityTestProps) => {

const traitMap = new Map<TraitIndex, number>([
  ['e', 0],
  ['i', 0],
  ['s', 0],
  ['n', 0],
  ['t', 0],
  ['f', 0],
  ['j', 0],
  ['p', 0],
  ['a', 0],
  ['v', 0],
]);

const answerMap = new Map<string, AnswerMapData>();

const QUESTIONS_LENGTH = QUESTIONS.length; // 60
const QUESTION_GROUP_SIZE = 12;

const PersonalityTest = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [progress, setProgress] = useState(0);

  const activeQuestionRef = useRef<HTMLDivElement | null>(null);

  // TODO: implement 'pagination'
  // split to groups

  // Assign ref only to the currently active question
  const setActiveQuestionRef = useCallback((el: HTMLDivElement | null) => {
    if (el && activeQuestionRef.current !== el) {
      activeQuestionRef.current = el;
    }
  }, []);

  const scrollToNextQuestion = () => {
    if (activeQuestionRef.current) {
      activeQuestionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const updateAnswerMap = (data: AnswerMapData) => {
    answerMap.set(data.questionId, data);
    // console.log('answerMap', [...answerMap]);
  };

  const updateCurrentQuestionId = () => {
    const newId = activeQuestionId + 1;
    if (newId > QUESTIONS_LENGTH || newId === activeQuestionId) return;
    setActiveQuestionId(newId);
  };

  const updateProgress = () => {
    const value = Math.floor((activeQuestionId / QUESTIONS_LENGTH) * 100);
    setProgress(value);
  };

  const handleQuestionCardSelect = (data: AnswerMapData) => {
    // console.log('data', data);

    if (Number(data.questionId) >= activeQuestionId) {
      updateCurrentQuestionId();
    }

    setTimeout(() => {
      scrollToNextQuestion();
      updateProgress();
      updateAnswerMap(data);
    }, 50); // Ensure state updates before scrolling
  };

  const handleNextButton = () => {};

  const getResults = () => {
    answerMap.forEach(({ traitIndex, value }: AnswerMapData) => {
      const curValue = traitMap.get(traitIndex as TraitIndex) as number;
      traitMap.set(traitIndex as TraitIndex, curValue + value);
    });
    console.log('traitMap', [...traitMap]);
  };

  return (
    <div className="personality-test relative">
      <div className="questions m-auto max-w-[640px]">
        {QUESTIONS.map((data) => (
          <div
            id={data.id}
            ref={
              data.id === `${activeQuestionId}` ? setActiveQuestionRef : null
            }
            key={data.id}
          >
            <QuestionCard
              key={data.id}
              id={data.id}
              question={data.question}
              activeQuestionId={`${activeQuestionId}`}
              traitType={data.traitType}
              dichotomy={data.dichotomy}
              onSelect={handleQuestionCardSelect}
            />
          </div>
        ))}
      </div>
      <div className="header sticky bottom-0 flex items-center justify-between p-4 bg-white z-10">
        <div className="flex flex-1 pl-4 pr-8">
          <Progress value={progress} />
        </div>
        <div className="">
          <Button onClick={getResults}>Get Results</Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
