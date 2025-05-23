import {
  CognitiveFunctionsTranslation,
  MBTIDashboardTranslation,
  MBTITestResultsTranslation,
  MBTITraitMapItem,
  MBTITraitsTranslation,
  MBTITypeDetailsTranslation,
  MBTITypeGroupMapTranslation,
  MBTITypeGroupsTranslation,
  MBTITypeMapTranslation,
  MBTITypePageTranslation,
  MBTITypeTranslation,
  PromptTranslation,
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

export type MBTIIdentity = 'a' | 'v';

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

export type CardTip = {
  markers?: string[];
};

export type TraitCard = {
  type: TraitType;
  buttons: CardButton[];
};

export type CognitiveFnCardItem = CardButton &
  CardTip & {
    description?: string;
  };

export type CognitiveFnCard = {
  title: string;
  traitFeatures: string[];
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
  translation: MBTITypeTranslation;
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

export type TraitMap = Map<TraitIndex, number>;

export type MBTIResult = {
  type: MBTIType;
  identity: MBTIIdentity;
  traitMap: TraitMap;
};

export type MBTIDashboardState = {
  translation: MBTIDashboardTranslation | null;
  personality: MBTIPersonalityItem | null;
  personalities: MBTIPersonalityItem[];
  cognitiveFnArr: CognFunctionArr;
  cognitiveFnCards: CognitiveFnCard[];
  isCleanUpConfirmMode: boolean;
};

export type MBTITypesState = {
  translation: MBTITypeGroupsTranslation | null;
  typeMapTranslation: MBTITypeMapTranslation | null;
  typeGroupMapTranslation: MBTITypeGroupMapTranslation | null;
  activeGroupId: string | null;
  activeGroupDescription: string | null;
  activeItems: MBTIType[];
};

export type MBTITypeState = {
  translation: {
    page: MBTITypePageTranslation;
    MBTIType: MBTITypeTranslation;
    MBTITypeMap: Map<MBTIType, MBTITypeTranslation>;
    MBTITypeDetails: MBTITypeDetailsTranslation;
    cognitiveFunctions: CognitiveFunctionsTranslation;
  } | null;
  cognitiveFnArr: string[];
  similarTypes: MBTIType[];
};

export type MBTITypeStateLS = {
  translation: {
    page: MBTITypePageTranslation;
    typeMap: [MBTIType, MBTITypeTranslation][];
    typeDetalsMap: [MBTIType, MBTITypeDetailsTranslation][];
    cognitiveFunctions: CognitiveFunctionsTranslation;
  };
};

// MBTI Test Results

type BaseMBTITestResultsState<TTraitMap> = {
  type: string;
  identity: MBTIIdentity;
  traitMap: TTraitMap;
  translations: {
    page: MBTITestResultsTranslation;
    type: MBTITypeTranslation;
    traits: MBTITraitsTranslation;
  };
} | null;

export type MBTITestResultsState = BaseMBTITestResultsState<TraitMap>;
export type MBTITestResultsStateLS = BaseMBTITestResultsState<
  [TraitIndex, number][]
>;

export type MBTIDichotomyMapItem = {
  traitIds: TraitIndex[];
};

// Prompt

export type PromptCardDataStatus = 'ok' | 'no-data' | 'not-enough-data';

export type PromptCard<T> = {
  data: T | null;
  message: string | null;
  isActive: boolean;
  dataStatus?: PromptCardDataStatus;
};

export type MBTIDashboardDataForPrompt = {
  personalities: MBTIPersonalityItem[];
  cognitiveFnArr: CognFunctionArr;
  cognitiveFnTranslation: CognitiveFunctionsTranslation;
};

export type MBTIDashboardCard = PromptCard<MBTIDashboardDataForPrompt>;

export type MBTITestDataForPrompt = {
  type: string;
  typeBoxTitle: string;
  dominantTraits: [string, number][];
  identity: MBTIIdentity;
  traitMap: [TraitIndex, number][];
  traitMapTranslation: [TraitIndex, MBTITraitMapItem][];
};

export type MBTITestCard = PromptCard<MBTITestDataForPrompt>;

export type PromptState = {
  translation: PromptTranslation | null;
  MBTIDashboardCard: MBTIDashboardCard | null;
  MBTITestCard: MBTITestCard | null;
  prompt: string | null;
};
