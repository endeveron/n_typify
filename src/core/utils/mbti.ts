import { QUESTION_DATA_ARRAY } from '@/core/data/questions';
import {
  CognFunctionArr,
  cognFnPatternMapStatus,
  MBTIResult,
  TraitIndex,
  MBTIPersonalityType,
  MBTIMapItem,
  MBTIPersonalityItem,
} from '@/core/types/mbti';

export const cognFnColorMap = new Map<string, string>([
  ['Te', 'bg-teal'],
  ['Ti', 'bg-teal'],
  ['Fe', 'bg-rose'],
  ['Fi', 'bg-rose'],
  ['Se', 'bg-gold'],
  ['Si', 'bg-gold'],
  ['Ne', 'bg-sky'],
  ['Ni', 'bg-sky'],
]);

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
export const MBTIMap = new Map<string, MBTIMapItem>([
  [
    'INTJ',
    {
      cognitiveFns: ['Ni', 'Te', 'Fi', 'Se', 'Ne', 'Ti', 'Fe', 'Si'],
      valuableFnsPattern: 'NiTeFiSe',
      shadowFnsPattern: 'NeTiFeSi',
    },
  ],
  [
    'ENTJ',
    {
      cognitiveFns: ['Te', 'Ni', 'Se', 'Fi', 'Ti', 'Ne', 'Si', 'Fe'],
      valuableFnsPattern: 'TeNiSeFi',
      shadowFnsPattern: 'TiNeSiFe',
    },
  ],
  [
    'INTP',
    {
      cognitiveFns: ['Ti', 'Ne', 'Si', 'Fe', 'Te', 'Ni', 'Se', 'Fi'],
      valuableFnsPattern: 'TiNeSiFe',
      shadowFnsPattern: 'TeNiSeFi',
    },
  ],
  [
    'ENTP',
    {
      cognitiveFns: ['Ne', 'Ti', 'Fe', 'Si', 'Ni', 'Te', 'Fi', 'Se'],
      valuableFnsPattern: 'NeTiFeSi',
      shadowFnsPattern: 'NiTeFiSe',
    },
  ],
  [
    'INFJ',
    {
      cognitiveFns: ['Ni', 'Fe', 'Ti', 'Se', 'Ne', 'Fi', 'Te', 'Si'],
      valuableFnsPattern: 'NiFeTiSe',
      shadowFnsPattern: 'NeFiTeSi',
    },
  ],
  [
    'ENFJ',
    {
      cognitiveFns: ['Fe', 'Ni', 'Se', 'Ti', 'Fi', 'Ne', 'Si', 'Te'],
      valuableFnsPattern: 'FeNiSeTi',
      shadowFnsPattern: 'FiNeSiTe',
    },
  ],
  [
    'INFP',
    {
      cognitiveFns: ['Fi', 'Ne', 'Si', 'Te', 'Fe', 'Ni', 'Se', 'Ti'],
      valuableFnsPattern: 'FiNeSiTe',
      shadowFnsPattern: 'FeNiSeTi',
    },
  ],
  [
    'ENFP',
    {
      cognitiveFns: ['Ne', 'Fi', 'Te', 'Si', 'Ni', 'Fe', 'Ti', 'Se'],
      valuableFnsPattern: 'NeFiTeSi',
      shadowFnsPattern: 'NiFeTiSe',
    },
  ],
  [
    'ISTJ',
    {
      cognitiveFns: ['Si', 'Te', 'Fi', 'Ne', 'Se', 'Ti', 'Fe', 'Ni'],
      valuableFnsPattern: 'SiTeFiNe',
      shadowFnsPattern: 'SeTiFeNi',
    },
  ],
  [
    'ESTJ',
    {
      cognitiveFns: ['Te', 'Si', 'Ne', 'Fi', 'Ti', 'Se', 'Ni', 'Fe'],
      valuableFnsPattern: 'TeSiNeFi',
      shadowFnsPattern: 'TiSeNiFe',
    },
  ],
  [
    'ISFJ',
    {
      cognitiveFns: ['Si', 'Fe', 'Ti', 'Ne', 'Se', 'Fi', 'Te', 'Ni'],
      valuableFnsPattern: 'SiFeTiNe',
      shadowFnsPattern: 'SeFiTeNi',
    },
  ],
  [
    'ESFJ',
    {
      cognitiveFns: ['Fe', 'Si', 'Ne', 'Ti', 'Fi', 'Se', 'Ni', 'Te'],
      valuableFnsPattern: 'FeSiNeTi',
      shadowFnsPattern: 'FiSeNiTe',
    },
  ],
  [
    'ISTP',
    {
      cognitiveFns: ['Ti', 'Se', 'Ni', 'Fe', 'Te', 'Si', 'Ne', 'Fi'],
      valuableFnsPattern: 'TiSeNiFe',
      shadowFnsPattern: 'TeSiNeFi',
    },
  ],
  [
    'ESTP',
    {
      cognitiveFns: ['Se', 'Ti', 'Fe', 'Ni', 'Si', 'Te', 'Fi', 'Ne'],
      valuableFnsPattern: 'SeTiFeNi',
      shadowFnsPattern: 'SiTiFeNe',
    },
  ],
  [
    'ISFP',
    {
      cognitiveFns: ['Fi', 'Se', 'Ni', 'Te', 'Fe', 'Si', 'Ne', 'Ti'],
      valuableFnsPattern: 'FiSeNiTe',
      shadowFnsPattern: 'FeSiNeTi',
    },
  ],
  [
    'ESFP',
    {
      cognitiveFns: ['Se', 'Fi', 'Te', 'Ni', 'Si', 'Fe', 'Ti', 'Ne'],
      valuableFnsPattern: 'SeFiTeNi',
      shadowFnsPattern: 'SiFiTeNe',
    },
  ],
]);

// The map of cognitive function pattern match
const valuableCognFnPartialMatchMap = new Map<string, MBTIPersonalityType>([
  ['NiTe', 'INTJ'],
  ['TeNi', 'ENTJ'],
  ['TiNe', 'INTP'],
  ['NeTi', 'ENTP'],
  ['NiFe', 'INFJ'],
  ['FeNi', 'ENFJ'],
  ['FiNe', 'INFP'],
  ['NeFi', 'ENFP'],
  ['SiTe', 'ISTJ'],
  ['TeSi', 'ESTJ'],
  ['SiFe', 'ISFJ'],
  ['FeSi', 'ESFJ'],
  ['TiSe', 'ISTP'],
  ['SeTi', 'ESTP'],
  ['FiSe', 'ISFP'],
  ['SeFi', 'ESFP'],
]);

const valuableCognFnMatchMap = new Map<string, MBTIPersonalityType>([
  ['NiTeFiSe', 'INTJ'],
  ['TeNiSeFi', 'ENTJ'],
  ['TiNeSiFe', 'INTP'],
  ['NeTiFeSi', 'ENTP'],
  ['NiFeTiSe', 'INFJ'],
  ['FeNiSeTi', 'ENFJ'],
  ['FiNeSiTe', 'INFP'],
  ['NeFiTeSi', 'ENFP'],
  ['SiTeFiNe', 'ISTJ'],
  ['TeSiNeFi', 'ESTJ'],
  ['SiFeTiNe', 'ISFJ'],
  ['FeSiNeTi', 'ESFJ'],
  ['TiSeNiFe', 'ISTP'],
  ['SeTiFeNi', 'ESTP'],
  ['FiSeNiTe', 'ISFP'],
  ['SeFiTeNi', 'ESFP'],
]);

const shadowCognFnPartialMatchMap = new Map<string, MBTIPersonalityType>([
  ['NiTeFiSeNeTi', 'INTJ'],
  ['TeNiSeFiFiNe', 'ENTJ'],
  ['TiNeSiFeFeSi', 'INTP'],
  ['NeTiFeSiSiTe', 'ENTP'],
  ['NiFeTiSeTiNe', 'INFJ'],
  ['FeNiSeTiTeSi', 'ENFJ'],
  ['FiNeSiTeTeNi', 'INFP'],
  ['NeFiTeSiSiFe', 'ENFP'],
  ['SiTeFiNeNiTe', 'ISTJ'],
  ['TeSiNeFiFiSe', 'ESTJ'],
  ['SiFeTiNeNeTe', 'ISFJ'],
  ['FeSiNeTiTiSe', 'ESFJ'],
  ['TiSeNiFeFeNi', 'ISTP'],
  ['SeTiFeNiNiFi', 'ESTP'],
  ['FiSeNiTeTeSi', 'ISFP'],
  ['SeFiTeNiNiFe', 'ESFP'],
]);

const cognFnAbsoluteMatchMap = new Map<string, MBTIPersonalityType>([
  ['NiTeFiSeNeTiFeSi', 'INTJ'],
  ['TeNiSeFiFiNeTiSi', 'ENTJ'],
  ['TiNeSiFeFeSiTeNi', 'INTP'],
  ['NeTiFeSiSiTeFiNi', 'ENTP'],
  ['NiFeTiSeTiNeFiTe', 'INFJ'],
  ['FeNiSeTiTeSiFiNe', 'ENFJ'],
  ['FiNeSiTeTeNiFeSi', 'INFP'],
  ['NeFiTeSiSiFeTiNi', 'ENFP'],
  ['SiTeFiNeNiTeFeTi', 'ISTJ'],
  ['TeSiNeFiFiSeTiNi', 'ESTJ'],
  ['SiFeTiNeNeTeFiNi', 'ISFJ'],
  ['FeSiNeTiTiSeFiNi', 'ESFJ'],
  ['TiSeNiFeFeNiTeSi', 'ISTP'],
  ['SeTiFeNiNiFiTeSi', 'ESTP'],
  ['FiSeNiTeTeSiFeNi', 'ISFP'],
  ['SeFiTeNiNiFeTiSi', 'ESFP'],
]);

export const getMBTITypeByCognFnPattern = (
  cognFnPattern: string
): {
  status: cognFnPatternMapStatus;
  matchPercent: number;
  type: MBTIPersonalityType | null;
} => {
  // Exit if the number of functions is less than 2
  if (cognFnPattern.length < 4) {
    return {
      status: cognFnPatternMapStatus.INVALID_PATTERN,
      matchPercent: 0,
      type: null,
    };
  }

  const noMatchResult = {
    status: cognFnPatternMapStatus.NO_MATCH,
    matchPercent: 0,
    type: null,
  };

  // Check for absolute match
  if (cognFnPattern.length === 16) {
    const mapItem = cognFnAbsoluteMatchMap.get(cognFnPattern);
    if (mapItem)
      return {
        status: cognFnPatternMapStatus.ABSOLUTE_MATCH,
        matchPercent: 100,
        type: mapItem,
      };
  }

  // Check for all the valuable and 2 shadow functions match
  if (cognFnPattern.length >= 12) {
    const pattern = cognFnPattern.slice(0, 12);
    const mapItem = shadowCognFnPartialMatchMap.get(pattern);
    if (mapItem)
      return {
        status: cognFnPatternMapStatus.SHADOW_PARTIAL_MATCH,
        matchPercent: 80,
        type: mapItem,
      };
  }

  // Check for all the valuable functions match
  if (cognFnPattern.length >= 8) {
    const pattern = cognFnPattern.slice(0, 8);
    const mapItem = valuableCognFnMatchMap.get(pattern);
    if (mapItem)
      return {
        status: cognFnPatternMapStatus.VALUABLE_MATCH,
        matchPercent: 60,
        type: mapItem,
      };
  }

  // Check for 2 valuable functions match
  if (cognFnPattern.length >= 4) {
    const pattern = cognFnPattern.slice(0, 4);
    const mapItem = valuableCognFnPartialMatchMap.get(pattern);
    if (mapItem)
      return {
        status: cognFnPatternMapStatus.VALUABLE_PARTIAL_MATCH,
        matchPercent: 30,
        type: mapItem,
      };
  }

  return noMatchResult;
};

export const getCognFnPattern = (cognFnArray: CognFunctionArr) => {
  return cognFnArray.map(([id]) => id).join('');
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

export const sortPersonalityItems = (
  items: MBTIPersonalityItem[]
): MBTIPersonalityItem[] => {
  return items.sort((a, b) => b.mbti.matchPercent - a.mbti.matchPercent);
};
