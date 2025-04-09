import { ReactElement } from 'react';

export type TraitIndex =
  | 'e'
  | 'i'
  | 's'
  | 'n'
  | 't'
  | 'f'
  | 'j'
  | 'p'
  | 'a'
  | 'v';

export type TraitType = 'energy' | 'mind' | 'nature' | 'tactics' | 'identity';

export type CognitiveFunctionIndex =
  | 'Te'
  | 'Ti'
  | 'Fe'
  | 'Fi'
  | 'Se'
  | 'Si'
  | 'Ne'
  | 'Ni';

/**
 * MBTI Input
 */

export type CognitiveFunctionArr = [string, number][];

export type CardButton = {
  title: string;
  icon: ReactElement;
  className: string;
};

export type TraitCard = {
  type: TraitType;
  buttons: CardButton[];
};

export type CognitiveFunction = CardButton & {
  index: CognitiveFunctionIndex;
  description?: string;
};

export type CognitiveFunctionButton = CognitiveFunction & {
  counter: number;
};

export type CognitiveFnCard = {
  title: string;
  cognitiveFunctions: CognitiveFunction[];
};

export type MBTIMapItem = {
  personality: {
    type: string;
    name: string;
    description: string;
  };
  shadowFnPattern: string;
  functions: string[];
};

// MBTI Test

export type QuestionData = {
  id: string;
  traitType: TraitType;
  dichotomy: [TraitIndex, TraitIndex];
};

export type Question = QuestionData & {
  question: string;
};

export type AnswerMapData = {
  questionId: string;
  traitIndex: string;
  value: number;
};

export type MBTIResult = {
  personality: string;
  percentageMap: Map<TraitIndex, number>;
};

/**
 * MBTI Output
 */

// MBTI Functions
