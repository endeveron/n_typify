import { MBTIType } from '@/core/types/mbti';

export type LangCode = 'en' | 'uk';

// Define the structure of the imported JSON

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
  extraverted_function: MBTIDashboardFunctionTranslation;
  introverted_function: MBTIDashboardFunctionTranslation;
};

export type MBTICognitiveFnTranslation = {
  description: string;
};

export type MBTICognitiveFnMapTranslation = {
  [id: string]: {
    description: string;
  };
};

export type PersonalityTypeTranslation = {
  type: MBTIType;
  title: string[];
  subtitle: string;
  persons: string[];
  description: string;
  traitSet: string[];
};

export type MBTIDashboardTranslation = {
  cleanUpResultsPrompt: string;
  cognitiveFnStack: string[];
  cognitiveFunctions: MBTICognitiveFnMapTranslation;
  energyCard: MBTIDashboardTraitCardTranslation;
  feelingCard: MBTIDashboardFunctionCardTranslation;
  intuitionCard: MBTIDashboardFunctionCardTranslation;
  sensingCard: MBTIDashboardFunctionCardTranslation;
  tacticsCard: MBTIDashboardTraitCardTranslation;
  thinkingCard: MBTIDashboardFunctionCardTranslation;
  personalityTypes?: PersonalityTypeTranslation[];
};

// MBTI Types

export type MBTITypeGroupMapItem = {
  title: string;
  description: string;
};

export type MBTITypesTranslation = {
  mainTitle: string;
  personalityTypes: PersonalityTypeTranslation[];
  tableRowTitles: string[];
  typeGroupMap: [string, MBTITypeGroupMapItem][];
  resetBtnTitle: string;
};

export type MBTITypeMapTranslation = Map<MBTIType, PersonalityTypeTranslation>;

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
