'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { LangCode, MBTIDashboardTranslation } from '@/core/types/translation';
import { getMBTIDashboardTranslation } from '@/core/utils/dictionary';
import {
  CognitiveFnCard,
  CognFunctionArr,
  MBTIPersonalityData,
  MBTIPersonalityItem,
  CognitiveFnId,
  // TraitCard,
} from '@/core/types/mbti';

// // `energy` trait
// import IntroversionIcon from '~/public/icons/mbti/arrows-minimize.svg';
// import ExtraversionIcon from '~/public/icons/mbti/arrows-maximize.svg';
// // `tactics` trait
// import JudgingIcon from '~/public/icons/mbti/list.svg';
// import PerceivingIcon from '~/public/icons/mbti/network.svg';
// `thinking` cognitive functions
import ExtravertedThinkingIcon from '~/public/icons/mbti/gear.svg';
import IntrovertedThinkingIcon from '~/public/icons/mbti/graph.svg';
// `feeling` cognitive functions
import ExtravertedFeelingIcon from '~/public/icons/mbti/heart.svg';
import IntrovertedFeelingIcon from '~/public/icons/mbti/theater.svg';
// `sensing` cognitive functions
import ExtravertedSensingIcon from '~/public/icons/mbti/bolt.svg';
import IntrovertedSensingIcon from '~/public/icons/mbti/home.svg';
// `intuition` cognitive functions
import ExtravertedIntuitionIcon from '~/public/icons/mbti/clock.svg';
import IntrovertedIntuitionIcon from '~/public/icons/mbti/squares.svg';

// import MBTITraitCard from '@/core/components/mbti-dashboard/mbti-trait-card';
import { defaultCognFnCounterMap } from '@/core/utils/mbti';
import MBTIDashboardHeader from '@/core/components/mbti-dashboard/mbti-dashboard-header';
import MBTICognFunctions from '@/core/components/mbti-dashboard/mbti-cogn-function-list';
import MBTICognFunctionCards from '@/core/components/mbti-dashboard/mbti-cogn-function-cards';
import MBTIPersonalityCards from '@/core/components/mbti-dashboard/mbti-personality-cards';
import CleanUpResults from '@/core/components/mbti-dashboard/clean-up-results';
import SignOutButton from '@/core/components/auth/sign-out-btn';

const cognFnCounterMap = new Map<string, number>([
  ['Te', 0],
  ['Ti', 0],
  ['Fe', 0],
  ['Fi', 0],
  ['Se', 0],
  ['Si', 0],
  ['Ne', 0],
  ['Ni', 0],
]);

type TMBTIDashboardProps = {
  langCode?: LangCode;
};

const MBTIDashboard = ({ langCode }: TMBTIDashboardProps) => {
  const [translation, setTranslation] = useState<MBTIDashboardTranslation>();

  // const [traitCards, setTraitCards] = useState<TraitCard[]>([]);
  const [cognitiveFnCards, setCognitiveFnCards] = useState<CognitiveFnCard[]>(
    []
  );
  const [cognitiveFnArr, setCognitiveFnArr] = useState<CognFunctionArr>([]);
  const [personality, setPersonality] = useState<MBTIPersonalityItem>();

  const handleCognFnButtonClick = (cognFnId: string): void => {
    // Increase counter value by 1
    const updCognFnCountMap = updateCognFnCounterMap(cognFnId);
    const cognFnArray = createCognFnArray(updCognFnCountMap);
    setCognitiveFnArr(cognFnArray);
  };

  const handleCognFnListItemClick = (cognFnId: CognitiveFnId) => {
    // Decrease counter value by 1
    const updCognFnCountMap = updateCognFnCounterMap(cognFnId, true);
    const cognFnArray = createCognFnArray(updCognFnCountMap);
    setCognitiveFnArr(cognFnArray);
  };

  const handleMBTIPersonalityMatch = (data: MBTIPersonalityData) => {
    /**
     * type MBTIPersonalityData: {
     *   personalityType,
     *   functions,
     *   matchPercent,
     *   status,
     * }
     */

    // Add `cognitiveFnArr` and save as MBTIPersonalityItem
    const MBTIPersonalityItem: MBTIPersonalityItem = {
      ...data,
      cognitiveFnArr,
    };

    setPersonality(MBTIPersonalityItem);
  };

  const updateCognFnCounterMap = (
    cognFnId: string,
    isDecrease?: boolean
  ): Map<string, number> => {
    const curValue = cognFnCounterMap.get(cognFnId) ?? 0;
    const updValue = isDecrease ? curValue - 1 : curValue + 1;
    cognFnCounterMap.set(cognFnId, updValue);
    return cognFnCounterMap;
  };

  // This keeps the same Map object (important because it’s being referenced)
  const cleanUpData = (): void => {
    cognFnCounterMap.clear();
    for (const [key, value] of defaultCognFnCounterMap) {
      cognFnCounterMap.set(key, value);
    }
    setCognitiveFnArr([]);
  };

  /**
   * Converts map entries into an array, filters out zero values,
   * and sorts by count descending.
   * Complexity: O(1) since n = 8.
   */
  const createCognFnArray = (map: Map<string, number>): CognFunctionArr => {
    return Array.from(map.entries())
      .map((entry, index) => ({ entry, index })) // keep original order
      .filter(({ entry: [, count] }) => count > 0)
      .sort((a, b) => {
        const countDiff = b.entry[1] - a.entry[1];
        return countDiff !== 0 ? countDiff : a.index - b.index; // stable fallback
      })
      .map(({ entry }) => entry);
  };

  // const initTraitCards = (translation: MBTIDashboardTranslation) => {
  //   const data: TraitCard[] = [
  //     {
  //       type: 'energy',
  //       buttons: [
  //         {
  //           title: translation.energyCard.introversion_title,
  //           icon: <IntroversionIcon />,
  //           className: 'bg-slate',
  //         },
  //         {
  //           title: translation.energyCard.extraversion_title,
  //           icon: <ExtraversionIcon />,
  //           className: 'bg-slate',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'tactics',
  //       buttons: [
  //         {
  //           title: translation.tacticsCard.introversion_title,
  //           icon: <JudgingIcon />,
  //           className: 'bg-violet',
  //         },
  //         {
  //           title: translation.tacticsCard.extraversion_title,
  //           icon: <PerceivingIcon />,
  //           className: 'bg-violet',
  //         },
  //       ],
  //     },
  //   ];

  //   setTraitCards(data);
  // };

  const initCognitiveFnCards = (translation: MBTIDashboardTranslation) => {
    const data: CognitiveFnCard[] = [
      // thinking
      {
        title: translation.thinkingCard.title,
        cognitiveFunctions: [
          {
            id: 'Te',
            title: translation.thinkingCard.extraverted_function.title,
            description:
              translation.thinkingCard.extraverted_function.description,
            icon: <ExtravertedThinkingIcon />,
          },
          {
            id: 'Ti',
            title: translation.thinkingCard.introverted_function.title,
            description:
              translation.thinkingCard.introverted_function.description,
            icon: <IntrovertedThinkingIcon />,
          },
        ],
      },
      // feeling
      {
        title: translation.feelingCard.title,
        cognitiveFunctions: [
          {
            id: 'Fe',
            title: translation.feelingCard.extraverted_function.title,
            description:
              translation.feelingCard.extraverted_function.description,
            icon: <ExtravertedFeelingIcon />,
          },
          {
            id: 'Fi',
            title: translation.feelingCard.introverted_function.title,
            description:
              translation.feelingCard.introverted_function.description,
            icon: <IntrovertedFeelingIcon />,
          },
        ],
      },
      // sensing
      {
        title: translation.sensingCard.title,
        cognitiveFunctions: [
          {
            id: 'Se',
            title: translation.sensingCard.extraverted_function.title,
            description:
              translation.sensingCard.extraverted_function.description,
            icon: <ExtravertedSensingIcon />,
          },
          {
            id: 'Si',
            title: translation.sensingCard.introverted_function.title,
            description:
              translation.sensingCard.introverted_function.description,
            icon: <IntrovertedSensingIcon />,
          },
        ],
      },
      // intuition
      {
        title: translation.intuitionCard.title,
        cognitiveFunctions: [
          {
            id: 'Ne',
            title: translation.intuitionCard.extraverted_function.title,
            description:
              translation.intuitionCard.extraverted_function.description,
            icon: <ExtravertedIntuitionIcon />,
          },
          {
            id: 'Ni',
            title: translation.intuitionCard.introverted_function.title,
            description:
              translation.intuitionCard.introverted_function.description,
            icon: <IntrovertedIntuitionIcon />,
          },
        ],
      },
    ];

    setCognitiveFnCards(data);
  };

  // Init data
  useEffect(() => {
    const initData = async () => {
      // Get translations
      const translations = await getMBTIDashboardTranslation(langCode);
      if (!translations) {
        toast(`Unable to get translations`);
        return;
      }
      setTranslation(translations);

      // Init cards
      // initTraitCards(translations);
      initCognitiveFnCards(translations);
    };

    initData();
  }, [langCode]);

  if (!translation) return null;

  return (
    <div className="mbti-dashboard max-h-[900px] w-[400px] max-w-[400px] mx-auto relative flex flex-1 flex-col justify-between">
      <div className="top flex flex-1 flex-col max-h-[300px]">
        {/* Personality Type */}
        <div className="h-28 my-4 flex flex-1 flex-col justify-center">
          <MBTIDashboardHeader
            cognitiveFnArr={cognitiveFnArr}
            translation={translation}
            onMatch={handleMBTIPersonalityMatch}
          />
        </div>

        {/* Personality Cards */}
        <MBTIPersonalityCards
          cognitiveFnArr={cognitiveFnArr}
          personality={personality}
          personalityTranslations={translation.personalityTypes}
        />
      </div>

      <div className="bottom flex flex-1 flex-col">
        {/* Trait Cards */}
        {/* {traitCards.length ? (
        <div className="row flex gap-1 justify-center">
          {traitCards.map((data) => (
            <MBTITraitCard {...data} key={data.type} />
          ))}
        </div>
      ) : null} */}

        {/* Cognitive Functions */}
        <div className="flex flex-1 flex-col justify-center my-4">
          <MBTICognFunctions
            cognitiveFnArr={cognitiveFnArr}
            translation={translation}
            onFunctionClick={handleCognFnListItemClick}
          />
        </div>

        {/* Cognitive Function Cards */}
        {cognitiveFnCards.length ? (
          <MBTICognFunctionCards
            cognitiveFnCards={cognitiveFnCards}
            onClick={handleCognFnButtonClick}
          />
        ) : null}
      </div>

      <div className="absolute top-4 left-2 z-10">
        <SignOutButton />
      </div>
      <div className="absolute top-4 right-2 z-20">
        <CleanUpResults
          cleanUpResultsPrompt={translation.cleanUpResultsPrompt}
          isAllow={!!cognitiveFnArr.length}
          onCleanUp={cleanUpData}
        />
      </div>
    </div>
  );
};

export default MBTIDashboard;
