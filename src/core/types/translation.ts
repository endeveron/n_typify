import { MBTIType } from '@/core/types/mbti';

export type LangCode = 'en' | 'uk';

// Define the structure of the imported JSON

export type MBTITypesTranslation = MBTITypeTranslation[];

export type CognitiveFnMapItemTranslation = {
  description: string;
};

export type CognitiveFnMapObjTranslation = {
  [id: string]: CognitiveFnMapItemTranslation;
};

export type CognitiveFunctionsTranslation = {
  stack: string[];
  map: CognitiveFnMapObjTranslation;
};

// Welcome page

export type WelcomeTranslation = {
  title: string;
  description: string;
  signInBtnTitle: string;
};

// Navbar

export type NavbarTranslation = {
  itemMap: [string, string][];
};

// MBTI Dashboard

export type MBTIDashboardTraitCardTranslation = {
  introversion_title: string;
  extraversion_title: string;
};

export type MBTIDashboardFunctionTranslation = {
  title: string;
  description: string;
};

export type MBTIDashboardFunctionCardTranslation = {
  title: string;
  extroverted_function: MBTIDashboardFunctionTranslation;
  introverted_function: MBTIDashboardFunctionTranslation;
};

export type MBTICognitiveFnTranslation = {
  description: string;
};

export type MBTITypeTranslation = {
  type: MBTIType;
  title: string[];
  subtitle: string;
};

export type MBTITypeDetailsTranslation = {
  type: MBTIType;
  description: string[];
  traitSet: string[];
  famousPersons: string[];
};

export type MBTITypeDetailArrayTranslation = MBTITypeDetailsTranslation[];

export type MBTIDashboardTranslation = {
  cleanUpResultsPrompt: string;
  energyCard: MBTIDashboardTraitCardTranslation;
  feelingCard: MBTIDashboardFunctionCardTranslation;
  intuitionCard: MBTIDashboardFunctionCardTranslation;
  sensingCard: MBTIDashboardFunctionCardTranslation;
  tacticsCard: MBTIDashboardTraitCardTranslation;
  thinkingCard: MBTIDashboardFunctionCardTranslation;
  MBTITypes?: MBTITypeTranslation[];
  cognitiveFunctions?: CognitiveFunctionsTranslation;
};

// MBTI Type Groups

export type MBTITypeGroupMapItem = {
  title: string;
  description: string;
};

export type MBTITypeGroupsTranslation = {
  mainTitle: string;
  MBTITypes?: MBTITypeTranslation[];
  tableRowTitles: string[];
  typeGroupMap: [string, MBTITypeGroupMapItem][];
  resetBtnTitle: string;
};

export type MBTITypeMapTranslation = Map<MBTIType, MBTITypeTranslation>;

export type MBTITypeGroupMapTranslation = Map<string, MBTITypeGroupMapItem>;

// MBTI Test

export type QuestionCardTranslation = {
  attitudePositive: string;
  attitudeNegative: string;
};

export type MBTITestTranslation = {
  questionCard: QuestionCardTranslation;
  questions: { [key: string]: string };
  nextGroupBtnTitle: string;
  getResultsBtnTitle: string;
};

// MBTI Test Results

export type MBTITraitMapItem = {
  title: string;
};

export type MBTITraitsTranslation = {
  dichotomyMap: [string, string][];
  traitMap: [string, MBTITraitMapItem][];
};

export type MBTITestResultsTranslation = {
  actionBtnTitle: string;
};
