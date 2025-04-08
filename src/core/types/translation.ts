export type LangCode = 'en' | 'uk';

// Define the structure of the imported JSON

// Personality Test

export type QuestionCardTranslation = {
  attitudePositive: string;
  attitudeNegative: string;
};

export type PersonalityTestTranslation = {
  questionCard: QuestionCardTranslation;
  questions: { [key: string]: string };
  nextGroupBtnTitle: string;
  getResultsBtnTitle: string;
};
