'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import QuestionCard from '@/core/components/mbti-test/mbti-test-card';
import MBTITestResults from '@/core/components/mbti-test/mbti-test-results';
import ProgressBar from '@/core/components/mbti-test/progress-bar';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Button } from '@/core/components/ui/button';
import { MBTI_TEST_RESULTS_STATE_KEY } from '@/core/constants';
import { useLangCode } from '@/core/context/LangContext';
import { QUESTION_DATA_ARRAY_LENGTH } from '@/core/data/questions';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  AnswerMapData,
  MBTIResult,
  MBTITestResultsStateLS,
  MBTIType,
  Question,
  TraitIndex,
  TraitMap,
} from '@/core/types/mbti';
import { LangCode, MBTITestTranslation } from '@/core/types/translation';
import { getMBTITestTranslation } from '@/core/utils/dictionary';
import { configureMBTITestQuestions, detectMBTIType } from '@/core/utils/mbti';

const QUESTION_GROUP_SIZE = 12;
export const TOTAL_QUESTION_GROUPS =
  QUESTION_DATA_ARRAY_LENGTH / QUESTION_GROUP_SIZE; // 5  (60 / 12)

const MBTITest = () => {
  const { langCode } = useLangCode();
  const [translation, setTranslation] =
    useState<Omit<MBTITestTranslation, 'questions'>>();
  const [getState, setState] = useLocalStorage();
  const [questions, setQuestions] = useState<Question[]>([]);

  const [questionGroup, setQuestionGroup] = useState<Question[]>([]);
  const [questionGroupNum, setQuestionGroupNum] = useState(0);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [result, setResult] = useState<MBTIResult | null>(null);

  const activeQuestionRef = useRef<HTMLDivElement | null>(null);
  const answerMapRef = useRef<Map<string, AnswerMapData>>(new Map());

  const handleNextButton = () => {
    getNextQuestionGroup();
  };

  const handleGetResultsButton = () => {
    const res = getResults();

    // // DEV
    // const res: MBTIResult = {
    //   type: 'ESFJ',
    //   identity: 'a',
    //   traitMap: new Map([
    //     ['e', 68],
    //     ['i', 32],
    //     ['n', 34],
    //     ['s', 66],
    //     ['t', 40],
    //     ['f', 60],
    //     ['j', 75],
    //     ['p', 25],
    //     ['a', 50],
    //     ['v', 50],
    //   ]),
    // };
    setResult(res);
  };

  const handleQuestionCardSelect = (data: AnswerMapData) => {
    // // DEV
    // handleGetResultsButton();

    if (Number(data.questionId) >= activeQuestionId) {
      updateCurrentQuestionId();
    }

    setTimeout(() => {
      scrollToNextQuestion();
      updateProgress();
      updateAnswerMap(data);
    }, 50); // Ensure state updates before scrolling
  };

  const handleResetTestResults = () => {
    setState<MBTITestResultsStateLS>(MBTI_TEST_RESULTS_STATE_KEY, null);
    setResult(null);
  };

  const getResults = (): MBTIResult => {
    // Init trait map
    const traitMap: TraitMap = new Map([
      ['e', 0],
      ['i', 0],
      ['n', 0],
      ['s', 0],
      ['t', 0],
      ['f', 0],
      ['j', 0],
      ['p', 0],
      ['a', 0],
      ['v', 0],
    ]);

    // Fill out the trait map
    answerMapRef.current.forEach(({ traitIndex, value }: AnswerMapData) => {
      const curValue = traitMap.get(traitIndex as TraitIndex) as number;
      traitMap.set(traitIndex as TraitIndex, curValue + value);
    });

    const {
      traitMap: percentageMap,
      type,
      identity,
    } = detectMBTIType(traitMap);
    return {
      type,
      identity,
      traitMap: percentageMap,
    };
  };

  const getNextQuestionGroup = () => {
    const newOffset = questionGroupNum * QUESTION_GROUP_SIZE;
    const nextQuestionGroup = questions.slice(
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

  // Assign ref to the currently active question
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

  const updateAnswerMap = (data: AnswerMapData) => {
    answerMapRef.current.set(data.questionId, data);
  };

  // Check LocalStorage for result
  useEffect(() => {
    // Check if the results exist in LocalStorage
    const resultsFromLS = getState<MBTITestResultsStateLS>(
      MBTI_TEST_RESULTS_STATE_KEY
    );
    if (resultsFromLS) {
      const traitMap: TraitMap = new Map<TraitIndex, number>(
        resultsFromLS.traitMap.map(([k, v]) => [k as TraitIndex, v])
      );
      const results: MBTIResult = {
        type: resultsFromLS.type as MBTIType,
        identity: resultsFromLS.identity,
        traitMap,
      };
      setResult(results);
      return;
    }
  }, [getState]);

  // Init data
  useEffect(() => {
    if (result) return;

    const initData = async () => {
      // Get translations
      const { questions, ...translations } = await getMBTITestTranslation(
        langCode
      );
      if (!questions || !translations) {
        toast(`Unable to get translations`);
        return;
      }
      setTranslation(translations);

      // Merge question data with translation
      const translatedQuestions: { [key: string]: string } = questions;
      const mergedQuestions = configureMBTITestQuestions(translatedQuestions);
      setQuestions(mergedQuestions);

      // Init the first group of questions
      const firstGroup = mergedQuestions.slice(0, QUESTION_GROUP_SIZE);
      setQuestionGroup(firstGroup);
      setQuestionGroupNum(1);
    };

    initData();
  }, [langCode, result]);

  return (
    <div className="flex flex-col flex-1 mx-auto w-full base-max-w cursor-default">
      {!!result ? (
        <MBTITestResults
          langCode={langCode as LangCode}
          result={result}
          onReset={handleResetTestResults}
        />
      ) : (
        <AnimatedAppear isShown={!!questionGroup.length}>
          {/* Progress */}
          <ProgressBar
            progress={progress}
            questionGroupNum={questionGroupNum}
          />

          {/* Questions */}
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
                translation={translation?.questionCard}
                question={data.question}
                activeQuestionId={`${activeQuestionId}`}
                traitType={data.traitType}
                dichotomy={data.dichotomy}
                onSelect={handleQuestionCardSelect}
              />
            </div>
          ))}

          <div className="action-buttons h-10 my-8 flex justify-center">
            <AnimatedAppear isShown={isNext}>
              {isDone ? (
                <Button variant="accent" onClick={handleGetResultsButton}>
                  {translation?.getResultsBtnTitle}
                </Button>
              ) : (
                <Button variant="accent" onClick={handleNextButton}>
                  {translation?.nextGroupBtnTitle}
                </Button>
              )}
            </AnimatedAppear>
          </div>
        </AnimatedAppear>
      )}
    </div>
  );
};

export default MBTITest;
