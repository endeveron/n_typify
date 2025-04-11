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

export type CognitiveFnId =
  | 'Ni'
  | 'Ne'
  | 'Si'
  | 'Se'
  | 'Ti'
  | 'Te'
  | 'Fi'
  | 'Fe';

export type MBTIPersonalityType =
  | 'INTJ'
  | 'ENTJ'
  | 'INTP'
  | 'ENTP'
  | 'INFJ'
  | 'ENFJ'
  | 'INFP'
  | 'ENFP'
  | 'ISTJ'
  | 'ESTJ'
  | 'ISFJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ESTP'
  | 'ISFP'
  | 'ESFP';

// MBTI Dashboard

export type CognFunctionArr = [string, number][];

export enum MBTIMapStatus {
  MATCH = 'MATCH',
  ABSOLUTE_MATCH = 'ABSOLUTE_MATCH',
  NO_MATCH = 'NO_MATCH',
  INVALID_PATTERN = 'INVALID_PATTERN',
}

export type MBTIPersonalityData = MBTIMapItem & {
  status: MBTIMapStatus;
};

export type MBTIPersonalityItem = MBTIPersonalityData & {
  cognitiveFnArr: CognFunctionArr;
};

export type CognFunction = {
  id: string;
  title: string;
  description: string;
  counter: number;
};

export type CardButton = {
  id: CognitiveFnId;
  title: string;
  icon: ReactElement;
};

export type TraitCard = {
  type: TraitType;
  buttons: CardButton[];
};

export type CognitiveFnCardItem = CardButton & {
  description?: string;
};

export type CognitiveFnCard = {
  title: string;
  cognitiveFunctions: CognitiveFnCardItem[];
};

export type MBTIMapItem = {
  personalityType: MBTIPersonalityType;
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
