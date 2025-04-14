import { MBTIPersonalityType } from '@/core/types/mbti';

export type LangCode = 'en' | 'uk';

// Define the structure of the imported JSON

// Welcome page

export type WelcomeTranslation = {
  title: string;
  description: string;
  signInBtnTitle: string;
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
  type: MBTIPersonalityType;
  title: string[];
  subtitle: string;
  persons: string[];
  description: string;
  traitSet: string[];
};

export type MBTIDashboardTranslation = {
  energyCard: MBTIDashboardTraitCardTranslation;
  tacticsCard: MBTIDashboardTraitCardTranslation;
  thinkingCard: MBTIDashboardFunctionCardTranslation;
  feelingCard: MBTIDashboardFunctionCardTranslation;
  sensingCard: MBTIDashboardFunctionCardTranslation;
  intuitionCard: MBTIDashboardFunctionCardTranslation;
  cognitiveFnStack: string[];
  cognitiveFunctions: MBTICognitiveFnMapTranslation;
  personalityTypes: PersonalityTypeTranslation[];
  cleanUpResultsPrompt: string;
};

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
