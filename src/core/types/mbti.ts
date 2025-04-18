import {
  MBTIDashboardTranslation,
  MBTITypesTranslation,
  MBTITypeMapTranslation,
  PersonalityTypeTranslation,
  MBTITypeGroupMapTranslation,
} from '@/core/types/translation';

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

export type MBTIType =
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

export enum cognFnPatternMapStatus {
  INVALID_PATTERN = 'INVALID_PATTERN',
  NO_MATCH = 'NO_MATCH',
  VALUABLE_PARTIAL_MATCH = 'VALUABLE_PARTIAL_MATCH',
  VALUABLE_MATCH = 'VALUABLE_MATCH',
  SHADOW_PARTIAL_MATCH = 'SHADOW_PARTIAL_MATCH',
  ABSOLUTE_MATCH = 'ABSOLUTE_MATCH',
}

export type CognFunction = {
  id: string;
  title: string;
  description: string;
  counter: number;
};

export type CardButton = {
  id: CognitiveFnId;
  title: string;
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
  cognitiveFns: CognitiveFnId[];
  valuableFnsPattern: string;
  shadowFnsPattern: string;
};

export type CognFnPatternMapItem = {
  personalityType: MBTIType;
  functions: CognitiveFnId[];
};

export type CognFnPatternMatchMapItem = {
  personalityType: MBTIType;
  matchValue: number;
};

export type MBTIPersonalityData = CognFnPatternMapItem & {
  status: cognFnPatternMapStatus;
  matchPercent: number;
};

/**
 * MBTIPersonalityItem
 * mbti: {
 *   cognitiveFnArr: CognFunctionArr;
 *   functions: CognitiveFnId[];
 *   matchPercent: number;
 *   personalityType: MBTIType;
 *   status: cognFnPatternMapStatus;
 * },
 * translation: {
 *   type: MBTIType;
 *   title: string[];
 *   subtitle: string;
 *   persons: string[];
 *   description: string;
 *   traitSet: string[];
 * }
 */
export type MBTIPersonalityItem = {
  mbti: MBTIPersonalityData & {
    cognitiveFnArr: CognFunctionArr;
  };
  translation: PersonalityTypeTranslation;
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

export type MBTIDashboardState = {
  translation: MBTIDashboardTranslation | null;
  personality: MBTIPersonalityItem | null;
  personalities: MBTIPersonalityItem[];
  cognitiveFnArr: CognFunctionArr;
  cognitiveFnCards: CognitiveFnCard[];
};

export type MBTITypesState = {
  translation: MBTITypesTranslation | null;
  typeMapTranslation: MBTITypeMapTranslation | null;
  typeGroupMapTranslation: MBTITypeGroupMapTranslation | null;
  activeGroupId: string | null;
  activeGroupDescription: string | null;
  activeItems: MBTIType[];
};
