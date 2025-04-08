export type LangCode = 'en' | 'uk';

// Define the structure of the imported JSON

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

export type MBTIDashboardTranslation = {
  energyCard: MBTIDashboardTraitCardTranslation;
  tacticsCard: MBTIDashboardTraitCardTranslation;
  thinkingCard: MBTIDashboardFunctionCardTranslation;
  feelingCard: MBTIDashboardFunctionCardTranslation;
  sensingCard: MBTIDashboardFunctionCardTranslation;
  intuitionCard: MBTIDashboardFunctionCardTranslation;
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
