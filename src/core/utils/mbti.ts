import { QUESTION_DATA_ARRAY } from '@/core/data/questions';
import {
  cognFnPatternMapStatus,
  CognFunctionArr,
  CognitiveFnCard,
  MBTIDashboardCard,
  MBTIDichotomyMapItem,
  MBTIMapItem,
  MBTIPersonalityItem,
  MBTIResult,
  MBTIType,
  TraitIndex,
  TraitMap,
} from '@/core/types/mbti';
import { MBTIDashboardTranslation } from '@/core/types/translation';

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

export const MBTITypeGroupMap = new Map<string, MBTIType[]>([
  ['visionaries', ['INTJ', 'INTP', 'INFJ', 'INFP']],
  ['catalysts', ['ENTJ', 'ENTP', 'ENFJ', 'ENFP']],
  ['artisans', ['ISTJ', 'ISFJ', 'ISTP', 'ISFP']],
  ['navigators', ['ESTJ', 'ESFJ', 'ESTP', 'ESFP']],

  ['mentors', ['INTJ', 'INFJ', 'ENTJ', 'ENFJ']],
  ['explorers', ['INTP', 'INFP', 'ENTP', 'ENFP']],
  ['stewards', ['INFJ', 'ENFJ', 'ISTJ', 'ESTJ']],
  ['harmonizers', ['INFP', 'ENFP', 'ISFJ', 'ESFJ']],
  ['realists', ['ISTJ', 'ESTJ', 'ISTP', 'ESTP']],
  ['guardians', ['ISFJ', 'ESFJ', 'ISFP', 'ESFP']],

  ['architects', ['INTJ', 'ENTJ', 'ISTJ', 'ESTJ']],
  ['balancers', ['INTP', 'ENTP', 'ISFJ', 'ESFJ']],
  ['responders', ['INFJ', 'ENFJ', 'ISTP', 'ESTP']],
  ['freespirits', ['INFP', 'ENFP', 'ISFP', 'ESFP']],
]);

export const MBTITypeTableItems: MBTIType[] = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
];

export const MBTITypeArr: MBTIType[] = [
  'INTJ',
  'ENTJ',
  'INTP',
  'ENTP',
  'INFJ',
  'ENFJ',
  'INFP',
  'ENFP',
  'ISTJ',
  'ESTJ',
  'ISFJ',
  'ESFJ',
  'ISTP',
  'ESTP',
  'ISFP',
  'ESFP',
];

export const MBTIDichotomyMap = new Map<string, MBTIDichotomyMapItem>([
  [
    'energy',
    {
      traitIds: ['e', 'i'],
    },
  ],
  [
    'mind',
    {
      traitIds: ['n', 's'],
    },
  ],
  [
    'nature',
    {
      traitIds: ['t', 'f'],
    },
  ],
  [
    'tactics',
    {
      traitIds: ['j', 'p'],
    },
  ],
  [
    'identity',
    {
      traitIds: ['a', 'v'],
    },
  ],
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
const valuableCognFnPartialMatchMap = new Map<string, MBTIType>([
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

const valuableCognFnMatchMap = new Map<string, MBTIType>([
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

const shadowCognFnPartialMatchMap = new Map<string, MBTIType>([
  ['NiTeFiSeNeTi', 'INTJ'],
  ['TeNiSeFiTiNe', 'ENTJ'],
  ['TiNeSiFeTeNi', 'INTP'],
  ['NeTiFeSiNiTe', 'ENTP'],
  ['NiFeTiSeNeFi', 'INFJ'],
  ['FeNiSeTiFiNe', 'ENFJ'],
  ['FiNeSiTeFeNi', 'INFP'],
  ['NeFiTeSiNiFe', 'ENFP'],
  ['SiTeFiNeSeTi', 'ISTJ'],
  ['TeSiNeFiTiSe', 'ESTJ'],
  ['SiFeTiNeSeFi', 'ISFJ'],
  ['FeSiNeTiFiSe', 'ESFJ'],
  ['TiSeNiFeTeSi', 'ISTP'],
  ['SeTiFeNiSiTe', 'ESTP'],
  ['FiSeNiTeFeSi', 'ISFP'],
  ['SeFiTeNiSiFe', 'ESFP'],
]);

const cognFnAbsoluteMatchMap = new Map<string, MBTIType>([
  ['NiTeFiSeNeTiFeSi', 'INTJ'],
  ['TeNiSeFiTiNeSiFe', 'ENTJ'],
  ['TiNeSiFeTeNiSeFi', 'INTP'],
  ['NeTiFeSiNiTeFiSe', 'ENTP'],
  ['NiFeTiSeNeFiTeSi', 'INFJ'],
  ['FeNiSeTiFiNeSiTe', 'ENFJ'],
  ['FiNeSiTeFeNiSeTi', 'INFP'],
  ['NeFiTeSiNiFeTiSe', 'ENFP'],
  ['SiTeFiNeSeTiFeNi', 'ISTJ'],
  ['TeSiNeFiTiSeNiFe', 'ESTJ'],
  ['SiFeTiNeSeFiTeNi', 'ISFJ'],
  ['FeSiNeTiFiSeNiTe', 'ESFJ'],
  ['TiSeNiFeTeSiNeFi', 'ISTP'],
  ['SeTiFeNiSiTeFiNe', 'ESTP'],
  ['FiSeNiTeFeSiNeTi', 'ISFP'],
  ['SeFiTeNiSiFeTiNe', 'ESFP'],
]);

export const getMBTITypeByCognFnPattern = (
  cognFnPattern: string
): {
  status: cognFnPatternMapStatus;
  matchPercent: number;
  type: MBTIType | null;
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

export const configureCognitiveFnCards = (
  translation: MBTIDashboardTranslation
): CognitiveFnCard[] => {
  return [
    // thinking
    {
      title: translation.thinkingCard.title,
      cognitiveFunctions: [
        {
          id: 'Te',
          title: translation.thinkingCard.extroverted_function.title,
          description:
            translation.thinkingCard.extroverted_function.description,
          markers: translation.thinkingCard.extroverted_function.markers,
        },
        {
          id: 'Ti',
          title: translation.thinkingCard.introverted_function.title,
          description:
            translation.thinkingCard.introverted_function.description,
          markers: translation.thinkingCard.introverted_function.markers,
        },
      ],
    },
    // feeling
    {
      title: translation.feelingCard.title,
      cognitiveFunctions: [
        {
          id: 'Fi',
          title: translation.feelingCard.introverted_function.title,
          description: translation.feelingCard.introverted_function.description,
          markers: translation.feelingCard.introverted_function.markers,
        },
        {
          id: 'Fe',
          title: translation.feelingCard.extroverted_function.title,
          description: translation.feelingCard.extroverted_function.description,
          markers: translation.feelingCard.extroverted_function.markers,
        },
      ],
    },
    // intuition
    {
      title: translation.intuitionCard.title,
      cognitiveFunctions: [
        {
          id: 'Ne',
          title: translation.intuitionCard.extroverted_function.title,
          description:
            translation.intuitionCard.extroverted_function.description,
          markers: translation.intuitionCard.extroverted_function.markers,
        },
        {
          id: 'Ni',
          title: translation.intuitionCard.introverted_function.title,
          description:
            translation.intuitionCard.introverted_function.description,
          markers: translation.intuitionCard.introverted_function.markers,
        },
      ],
    },
    // sensing
    {
      title: translation.sensingCard.title,
      cognitiveFunctions: [
        {
          id: 'Si',
          title: translation.sensingCard.introverted_function.title,
          description: translation.sensingCard.introverted_function.description,
          markers: translation.sensingCard.introverted_function.markers,
        },
        {
          id: 'Se',
          title: translation.sensingCard.extroverted_function.title,
          description: translation.sensingCard.extroverted_function.description,
          markers: translation.sensingCard.extroverted_function.markers,
        },
      ],
    },
  ];
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
 * @returns a string of type 'INTJ-A'.
 */
export const detectMBTIType = (traitMap: TraitMap): MBTIResult => {
  const dichotomies: [TraitIndex, TraitIndex][] = [
    ['e', 'i'], // Energy    Extraversion (E) / Introversion (I)
    ['n', 's'], // Mind      Intuition (N) / Sensing (S)
    ['t', 'f'], // Nature    Thinking (T) / Feeling (F)
    ['j', 'p'], // Tactics   Judging (J) / Perceiving (P)
    ['a', 'v'], // Identity  Assertive (A) / Volatile (V)
  ];

  let typeWithIdentity = '';
  const percentageMap: TraitMap = new Map();

  for (const [first, second] of dichotomies) {
    const firstScore = traitMap.get(first) ?? 0;
    const secondScore = traitMap.get(second) ?? 0;

    // Calculate percentage
    const total = firstScore + secondScore || 1;
    const firstPercentage = Math.round((firstScore / total) * 100);
    const secondPercentage = 100 - firstPercentage;

    // Add trait letter to the type
    const dominantTrait = firstPercentage >= secondPercentage ? first : second;
    typeWithIdentity += dominantTrait.toUpperCase();

    percentageMap.set(first, firstPercentage);
    percentageMap.set(second, secondPercentage);
  }

  // Determine the identity trait
  const assertiveScore = traitMap.get('a') ?? 0;
  const volatileScore = traitMap.get('v') ?? 0;
  const identity = assertiveScore >= volatileScore ? 'a' : 'v';
  const type = typeWithIdentity.slice(0, -1) as MBTIType;

  return { traitMap: percentageMap, type, identity };
};

export const sortPersonalityItems = (
  items: MBTIPersonalityItem[]
): MBTIPersonalityItem[] => {
  return items.sort((a, b) => b.mbti.matchPercent - a.mbti.matchPercent);
};

export const initDashboardCard = (): MBTIDashboardCard => ({
  data: {
    personalities: [],
    cognitiveFnArr: [],
    cognitiveFnTranslation: {
      stack: [],
      map: {},
    },
  },
  message: null,
  isActive: false,
});
