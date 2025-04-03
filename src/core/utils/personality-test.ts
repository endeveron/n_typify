import { QUESTION_DATA_ARRAY } from '@/core/data/questions';
import { MBTIResult, TraitIndex } from '@/core/types/personality-test';

/**
 * Merges question data with translations for a personality test.
 * @param translatedQuestions Array of translated questions
 * @returns Array of questions
 */
export const configurePersonalityTestQuestions = (translatedQuestions: {
  [key: string]: string;
}) => {
  return QUESTION_DATA_ARRAY.map((questionData) => {
    const questionText =
      translatedQuestions[questionData.id as keyof typeof translatedQuestions];

    if (!questionText) {
      console.warn(`Missing translation for question ${questionData.id}`);
    }

    return {
      ...questionData,
      question: questionText || `No translation`,
    };
  });
};

/**
 * Calculates the dominant traits based on dichotomies,
 * determines the personality type with identity, and returns the MBTI result including
 * the personality type and percentage map.
 * @param traitMap - a Map that contains trait indexes as keys and
 * corresponding numerical scores as values.
 * @returns an object with properties:
 * 1. `personalityType`: A string representing the MBTI (Myers-Briggs Type Indicator) personality type
 * with identity included.
 * 2. `percentageMap`: A Map containing the percentages for dominant traits in the form of TraitIndex
 * to number mappings.
 */
export const calculateMBTI = (
  traitMap: Map<TraitIndex, number>
): MBTIResult => {
  const dichotomies: [TraitIndex, TraitIndex][] = [
    ['e', 'i'], // Energy    Extraversion (E) / Introversion (I)
    ['s', 'n'], // Mind      Sensing (S) / Intuition (N)
    ['t', 'f'], // Nature    Thinking (T) / Feeling (F)
    ['j', 'p'], // Tactics   Judging (J) / Perceiving (P)
    ['a', 'v'], // Identity  Assertive (A) / Volatile (V)
  ];

  const percentageMap = new Map<TraitIndex, number>(); // Percentages for dominant traits
  let personalityType = ''; // Personality type with identity

  for (const [first, second] of dichotomies) {
    const firstScore = traitMap.get(first) ?? 0;
    const secondScore = traitMap.get(second) ?? 0;
    const total = firstScore + secondScore;

    const firstPercentage =
      total > 0 ? Math.round((firstScore / total) * 100) : 50;
    const secondPercentage =
      total > 0 ? Math.round((secondScore / total) * 100) : 50;

    // allTraits.set(first, firstPercentage);
    // allTraits.set(second, secondPercentage);

    // Add trait to percentageMap and MBTI type
    if (firstPercentage >= secondPercentage) {
      percentageMap.set(first, firstPercentage);
      personalityType += first.toUpperCase();
    } else {
      percentageMap.set(second, secondPercentage);
      personalityType += second.toUpperCase();
    }
  }

  // Determine Identity trait and append with a hyphen
  // Assertive (A) / Volatile (V)
  const assertiveScore = traitMap.get('a') ?? 0;
  const volatileScore = traitMap.get('v') ?? 0;
  const identity = assertiveScore >= volatileScore ? 'A' : 'V';
  const typeWithoutIdentity = personalityType.slice(0, -1);
  personalityType = `${typeWithoutIdentity}-${identity}`;

  return { personalityType, percentageMap };
};
