import {
  LangCode,
  MBTIResult,
  Question,
  TraitIndex,
} from '@/core/types/personality';
import enQuestions from '@/core/data/locales/en/questions.json';
import ukQuestions from '@/core/data/locales/uk/questions.json';
import { QUESTION_DATA_ARRAY } from '@/core/data/questions';

// Map of language codes to their corresponding question translations
const TRANSLATIONS = {
  en: enQuestions,
  uk: ukQuestions,
} as const;

/**
 * Gets localized questions for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Array of localized questions
 */
export const getQuestions = (langCode: LangCode): Question[] => {
  // Get translations for the specified language, fallback to English if not found
  const translations = TRANSLATIONS[langCode] || TRANSLATIONS.en;

  return QUESTION_DATA_ARRAY.map((questionData) => {
    const questionText =
      translations[questionData.id as keyof typeof translations];

    if (!questionText) {
      console.warn(
        `Missing translation for question ${questionData.id} in language ${langCode}`
      );
    }

    return {
      ...questionData,
      question: questionText || `No translation`,
    };
  });
};

// Utility function to get all supported languages
export const getSupportedLanguages = (): LangCode[] => {
  return Object.keys(TRANSLATIONS) as LangCode[];
};

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

  const percentages = new Map<TraitIndex, number>();
  let personalityType = '';

  for (const [first, second] of dichotomies) {
    const firstScore = traitMap.get(first) ?? 0;
    const secondScore = traitMap.get(second) ?? 0;
    const total = firstScore + secondScore;

    const firstPercentage =
      total > 0 ? Math.round((firstScore / total) * 100) : 50;
    const secondPercentage =
      total > 0 ? Math.round((secondScore / total) * 100) : 50;

    percentages.set(first, firstPercentage);
    percentages.set(second, secondPercentage);

    // Append to MBTI type based on the higher percentage
    personalityType +=
      firstPercentage >= secondPercentage
        ? first.toUpperCase()
        : second.toUpperCase();
  }

  // Determine Identity trait and append with a hyphen
  // Assertive (A) / Volatile (V)
  const assertiveScore = traitMap.get('a') ?? 0;
  const volatileScore = traitMap.get('v') ?? 0;
  const identity = assertiveScore >= volatileScore ? 'A' : 'V';
  const typeWithoutIdentity = personalityType.slice(0, -1);
  personalityType = `${typeWithoutIdentity}-${identity}`;

  return { percentages, personalityType };
};
