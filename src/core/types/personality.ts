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

export type Question = {
  id: string;
  question: string;
  traitType: TraitType;
  dichotomy: [TraitIndex, TraitIndex];
};

export type AnswerMapData = {
  questionId: string;
  traitIndex: string;
  value: number;
};
