'use client';

import { toast } from 'sonner';
import {
  AnswerMapData,
  LangCode,
  Question,
  TraitIndex,
} from '@/core/types/personality';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import QuestionCard from '@/core/components/test/question-card';
import { Button } from '@/core/components/ui/button';
import { Progress } from '@/core/components/ui/progress';
import { QUESTION_DATA_ARRAY_LENGTH } from '@/core/data/questions';
import { calculateMBTI, getQuestions } from '@/core/utils/personality';

// const traitMap = new Map<TraitIndex, number>([
//   ['e', 11],
//   ['i', 14],
//   ['s', 14],
//   ['n', 10],
//   ['t', 4],
//   ['f', 22],
//   ['j', 13],
//   ['p', 12],
//   ['a', 7],
//   ['v', 18],
// ]);

const answerMap = new Map<string, AnswerMapData>();

const QUESTION_GROUP_SIZE = 12;
const TOTAL_QUESTION_GROUPS = QUESTION_DATA_ARRAY_LENGTH / QUESTION_GROUP_SIZE; // 5  (60 / 12)

type PersonalityTestProps = {
  langCode: LangCode;
};

const PersonalityTest = ({ langCode }: PersonalityTestProps) => {
  const [questionGroup, setQuestionGroup] = useState<Question[]>([]);
  const [questionGroupNum, setQuestionGroupNum] = useState(0);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const activeQuestionRef = useRef<HTMLDivElement | null>(null);
  const localizedQuestions = useMemo(() => {
    return getQuestions(langCode);
  }, [langCode]);

  const getNextQuestionGroup = () => {
    const newOffset = questionGroupNum * QUESTION_GROUP_SIZE;
    const nextQuestionGroup = localizedQuestions.slice(
      newOffset,
      newOffset + QUESTION_GROUP_SIZE
    );
    if (!nextQuestionGroup?.length) {
      toast(`No questions fetched`);
      return;
    }

    setIsNext(false);
    setQuestionGroup(nextQuestionGroup);
    setActiveQuestionId((prev) => prev + 1);
    setQuestionGroupNum((prev) => prev + 1);

    setTimeout(() => {
      scrollToNextQuestion();
    }, 50); // Ensure state updates before scrolling
  };

  useEffect(() => {
    // Get the first group
    const initQuestions = async () => {
      const firstGroup = localizedQuestions.slice(0, QUESTION_GROUP_SIZE);
      if (!firstGroup?.length) {
        toast(`No questions fetched`);
        return;
      }
      setQuestionGroup(firstGroup);
      setQuestionGroupNum(1);
    };
    initQuestions();
  }, [localizedQuestions]);

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
  };

  const updateCurrentQuestionId = () => {
    const newId = activeQuestionId + 1;
    if (newId === activeQuestionId) return;
    if (newId > QUESTION_DATA_ARRAY_LENGTH) setIsDone(true);
    if (newId > questionGroupNum * QUESTION_GROUP_SIZE) {
      setIsNext(true);
    } else {
      setActiveQuestionId(newId);
    }
  };

  const updateProgress = () => {
    const value = Math.floor(
      (activeQuestionId / QUESTION_DATA_ARRAY_LENGTH) * 100
    );
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

  const handleNextButton = () => {
    getNextQuestionGroup();
  };

  const getResults = () => {
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

    // Fill out the trait map
    answerMap.forEach(({ traitIndex, value }: AnswerMapData) => {
      const curValue = traitMap.get(traitIndex as TraitIndex) as number;
      traitMap.set(traitIndex as TraitIndex, curValue + value);
    });

    const result = calculateMBTI(traitMap);
    console.log(result.percentages); // Percentages for each trait
    console.log(result.personalityType); // Personality type with identity
  };

  return (
    <div className="personality-test relative flex flex-col flex-1">
      <div className="question-group m-auto max-w-[600px]">
        {questionGroup.map((data) => (
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

        <div className="action-buttons h-10 my-8 flex justify-center">
          {isNext && !isDone ? (
            <Button onClick={handleNextButton}>Next</Button>
          ) : null}
          {isNext && isDone ? (
            <Button variant="accent" onClick={getResults}>
              Get Results
            </Button>
          ) : null}
        </div>
      </div>

      <div className="bottom-bar min-h-16 sticky bottom-0 flex items-center justify-between p-4 bg-white z-10">
        <div className="w-20 flex items-center justify-center px-4 text-xl font-bold cursor-default">
          {questionGroupNum} / {TOTAL_QUESTION_GROUPS}
        </div>
        <div className="flex flex-1 px-4">
          <Progress value={progress} />
        </div>
        <div className="w-20 flex items-center justify-center px-4 text-xl font-bold cursor-default">
          {/* {activeQuestionId} */}
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
