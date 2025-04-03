export type LangCode = 'en' | 'uk';

// Define the structure of the imported JSON
export type PersonalityTestQuestionCardTranslation = {
  attitudePositive: string;
  attitudeNegative: string;
};

export type PersonalityTestTranslation = {
  questionCard: PersonalityTestQuestionCardTranslation;
  questions: { [key: string]: string };
  nextGroupBtnTitle: string;
  getResultsBtnTitle: string;
};

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
  personalityType: string;
  percentageMap: Map<TraitIndex, number>;
};
