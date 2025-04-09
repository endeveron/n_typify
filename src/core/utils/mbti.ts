import { QUESTION_DATA_ARRAY } from '@/core/data/questions';
import {
  CognitiveFunctionArr,
  MBTIMapItem,
  MBTIResult,
  TraitIndex,
} from '@/core/types/mbti';

// Default cognitive function counter map
export const defaultCognFnCounterMap = new Map<string, number>([
  ['Te', 0],
  ['Ti', 0],
  ['Fe', 0],
  ['Fi', 0],
  ['Se', 0],
  ['Si', 0],
  ['Ne', 0],
  ['Ni', 0],
]);

// The map of MBTI types
const MBTIMap = new Map<string, MBTIMapItem>([
  [
    'NiTeFiSe',
    {
      personality: {
        type: 'INTJ',
        name: 'The Architect',
        description: '',
      },
      shadowFnPattern: 'NeTiFeSi',
      functions: ['Ni', 'Te', 'Fi', 'Se', 'Ne', 'Ti', 'Fe', 'Si'],
    },
  ],
  [
    'TiNeSiFe',
    {
      personality: {
        type: 'INTP',
        name: 'The Logician',
        description: '',
      },
      shadowFnPattern: 'TeNiSeFi',
      functions: ['Ti', 'Ne', 'Si', 'Fe', 'Te', 'Ni', 'Se', 'Fi'],
    },
  ],
  [
    'TeNiSeFi',
    {
      personality: {
        type: 'ENTJ',
        name: 'The Commander',
        description: '',
      },
      shadowFnPattern: 'TiNeSiFe',
      functions: ['Te', 'Ni', 'Se', 'Fi', 'Ti', 'Ne', 'Si', 'Fe'],
    },
  ],
  [
    'NeTiFeSi',
    {
      personality: {
        type: 'ENTP',
        name: 'The Debater',
        description: '',
      },
      shadowFnPattern: 'NiTeFiSe',
      functions: ['Ne', 'Ti', 'Fe', 'Si', 'Ni', 'Te', 'Fi', 'Se'],
    },
  ],
  [
    'NiFeTiSe',
    {
      personality: {
        type: 'INFJ',
        name: 'The Advocate',
        description: '',
      },
      shadowFnPattern: 'NeFiTeSi',
      functions: ['Ni', 'Fe', 'Ti', 'Se', 'Ne', 'Fi', 'Te', 'Si'],
    },
  ],
  [
    'FiNeSiTe',
    {
      personality: {
        type: 'INFP',
        name: 'The Mediator',
        description: '',
      },
      shadowFnPattern: 'FeNiSeTi',
      functions: ['Fi', 'Ne', 'Si', 'Te', 'Fe', 'Ni', 'Se', 'Ti'],
    },
  ],
  [
    'FeNiSeTi',
    {
      personality: {
        type: 'ENFJ',
        name: 'The Protagonist',
        description: '',
      },
      shadowFnPattern: 'FiNeSiTe',
      functions: ['Fe', 'Ni', 'Se', 'Ti', 'Fi', 'Ne', 'Si', 'Te'],
    },
  ],
  [
    'NeFiTeSi',
    {
      personality: {
        type: 'ENFP',
        name: 'The Campaigner',
        description: '',
      },
      shadowFnPattern: 'NiFeTiSe',
      functions: ['Ne', 'Fi', 'Te', 'Si', 'Ni', 'Fe', 'Ti', 'Se'],
    },
  ],
  [
    'SiTeFiNe',
    {
      personality: {
        type: 'ISTJ',
        name: 'The Inspector',
        description: '',
      },
      shadowFnPattern: 'SeTiFeNi',
      functions: ['Si', 'Te', 'Fi', 'Ne', 'Se', 'Ti', 'Fe', 'Ni'],
    },
  ],
  [
    'SiFeTiNe',
    {
      personality: {
        type: 'ISFJ',
        name: 'The Defender',
        description: '',
      },
      shadowFnPattern: 'SeFiTeNi',
      functions: ['Si', 'Fe', 'Ti', 'Ne', 'Se', 'Fi', 'Te', 'Ni'],
    },
  ],
  [
    'TeSiNeFi',
    {
      personality: {
        type: 'ESTJ',
        name: 'The Executive',
        description: '',
      },
      shadowFnPattern: 'TiSeNiFe',
      functions: ['Te', 'Si', 'Ne', 'Fi', 'Ti', 'Se', 'Ni', 'Fe'],
    },
  ],
  [
    'FeSiNeTi',
    {
      personality: {
        type: 'ESFJ',
        name: 'The Consul',
        description: '',
      },
      shadowFnPattern: 'FiSeNiTe',
      functions: ['Fe', 'Si', 'Ne', 'Ti', 'Fi', 'Se', 'Ni', 'Te'],
    },
  ],
  [
    'TiSeNiFe',
    {
      personality: {
        type: 'ISTP',
        name: 'The Virtuoso',
        description: '',
      },
      shadowFnPattern: 'TeSiNeFi',
      functions: ['Ti', 'Se', 'Ni', 'Fe', 'Te', 'Si', 'Ne', 'Fi'],
    },
  ],
  [
    'FiSeNiTe',
    {
      personality: {
        type: 'ISFP',
        name: 'The Adventurer',
        description: '',
      },
      shadowFnPattern: 'FeSiNeTi',
      functions: ['Fi', 'Se', 'Ni', 'Te', 'Fe', 'Si', 'Ne', 'Ti'],
    },
  ],
  [
    'SeTiFeNi',
    {
      personality: {
        type: 'ESTP',
        name: 'The Entrepreneur',
        description: '',
      },
      shadowFnPattern: 'SiTiFeNe',
      functions: ['Se', 'Ti', 'Fe', 'Ni', 'Si', 'Te', 'Fi', 'Ne'],
    },
  ],
  [
    'SeFiTeNi',
    {
      personality: {
        type: 'ESFP',
        name: 'The Entertainer',
        description: '',
      },
      shadowFnPattern: 'SiFiTeNe',
      functions: ['Se', 'Fi', 'Te', 'Ni', 'Si', 'Fe', 'Ti', 'Ne'],
    },
  ],
]);

export const getMBTITypeByCognFnPattern = (
  cognFnPattern: string
): {
  status: string;
  data: MBTIMapItem | null;
} => {
  if (cognFnPattern.length < 8)
    return {
      status: `Pattern must contain at least 8 symbols`,
      data: null,
    };

  const valuableFnPattern = cognFnPattern.slice(0, 8);

  // Lookup in MBTIMap
  const MBTIMapItem = MBTIMap.get(valuableFnPattern);
  if (!MBTIMapItem) {
    return {
      status: `No matches yet`,
      data: null,
    };
  }

  if (cognFnPattern.length === 16) {
    const isShadowFnPatternMatch =
      cognFnPattern.slice(8) === MBTIMapItem.shadowFnPattern;
    if (isShadowFnPatternMatch) {
      return {
        status: `Absolutely match for the valuable and shadow functions`,
        data: MBTIMapItem,
      };
    }
  }

  return {
    status: `Match for the valuable functions`,
    data: MBTIMapItem,
  };
};

export const getCognFnPattern = (cognFnArray: CognitiveFunctionArr) => {
  return cognFnArray.map(([fnIndex]) => fnIndex).join('');
};

/**
 * Merges question data with translations for a personality test.
 * @param translatedQuestions Array of translated questions
 * @returns Array of questions
 */
export const configureMBTITestQuestions = (translatedQuestions: {
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
 * 1. `personality`: A string representing the MBTI (Myers-Briggs Type Indicator) personality type
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
  let personality = ''; // Personality type with identity

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
      personality += first.toUpperCase();
    } else {
      percentageMap.set(second, secondPercentage);
      personality += second.toUpperCase();
    }
  }

  // Determine Identity trait and append with a hyphen
  // Assertive (A) / Volatile (V)
  const assertiveScore = traitMap.get('a') ?? 0;
  const volatileScore = traitMap.get('v') ?? 0;
  const identity = assertiveScore >= volatileScore ? 'A' : 'V';
  const typeWithoutIdentity = personality.slice(0, -1);
  personality = `${typeWithoutIdentity}-${identity}`;

  return { personality, percentageMap };
};
