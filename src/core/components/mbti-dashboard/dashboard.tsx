'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  CognFunctionArr,
  CognitiveFnCard,
  CognitiveFnId,
  MBTIMapItem,
  MBTIPersonalityItem,
} from '@/core/types/mbti';
import {
  LangCode,
  MBTIDashboardTranslation,
  PersonalityTypeTranslation,
} from '@/core/types/translation';
import { getMBTIDashboardTranslation } from '@/core/utils/dictionary';

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
import ExtravertedIntuitionIcon from '~/public/icons/mbti/squares.svg';
import IntrovertedIntuitionIcon from '~/public/icons/mbti/clock.svg';

// import MBTITraitCard from '@/core/components/mbti-dashboard/mbti-trait-card';
import SignOutButton from '@/core/components/auth/sign-out-btn';
import CleanUpResults from '@/core/components/mbti-dashboard/clean-up-results';
import CognFunctionCards from '@/core/components/mbti-dashboard/cogn-function-cards';
import CognFunctions from '@/core/components/mbti-dashboard/cogn-functions';
import DashboardHeader from '@/core/components/mbti-dashboard/dashboard-header';
import PersonalityCards from '@/core/components/mbti-dashboard/personality-cards';
import {
  defaultCognFnCounterMap,
  getCognFnPattern,
  getMBTITypeByCognFnPattern,
  MBTIMap,
  sortPersonalityItems,
} from '@/core/utils/mbti';

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

type DashboardProps = {
  langCode?: LangCode;
};

const Dashboard = ({ langCode }: DashboardProps) => {
  const [translation, setTranslation] = useState<MBTIDashboardTranslation>();

  // const [traitCards, setTraitCards] = useState<TraitCard[]>([]);
  const [cognitiveFnCards, setCognitiveFnCards] = useState<CognitiveFnCard[]>(
    []
  );
  const [cognitiveFnArr, setCognitiveFnArr] = useState<CognFunctionArr>([]);
  const [personality, setPersonality] = useState<MBTIPersonalityItem | null>(
    null
  );
  const [personalities, setPersonalities] = useState<MBTIPersonalityItem[]>([]);

  const cognFnArrayLength = cognitiveFnArr.length;

  /**
   * Converts map entries into an array, filters out zero values,
   * and sorts by count descending.
   * Complexity: O(1) since n = 8.
   */
  const updateCognFnArray = (
    cognFnId: CognitiveFnId,
    map: Map<string, number>
  ): CognFunctionArr => {
    const counter = map.get(cognFnId) as number;
    if (cognFnArrayLength) {
      const updCognFnArr = [...cognitiveFnArr];
      const index = updCognFnArr.findIndex((item) => item[0] === cognFnId);

      // Update the existing item
      if (index !== -1 && counter > 0) {
        const item = updCognFnArr[index];
        item[1] = counter;
        updCognFnArr[index] = item;
        return updCognFnArr.sort((a, b) => b[1] - a[1]);
      }
      // Remove the existing item
      if (index !== -1 && counter <= 0) {
        return updCognFnArr.filter((item) => item[0] !== cognFnId);
      }
      // Add a new item
      return [...cognitiveFnArr, [cognFnId, counter]];
    } else {
      // Add the first item
      return [[cognFnId, counter]];
    }
  };

  const handleCognFnButtonClick = (cognFnId: CognitiveFnId): void => {
    // Increase counter value by 1
    const updCognFnCountMap = updateCognFnCounterMap(cognFnId);
    const cognFnArray = updateCognFnArray(cognFnId, updCognFnCountMap);
    setCognitiveFnArr(cognFnArray);
  };

  const handleCognFnListItemClick = (cognFnId: CognitiveFnId) => {
    // Decrease counter value by 1
    const updCognFnCountMap = updateCognFnCounterMap(cognFnId, true);
    const cognFnArray = updateCognFnArray(cognFnId, updCognFnCountMap);
    setCognitiveFnArr(cognFnArray);
  };

  const updateCognFnCounterMap = (
    cognFnId: string,
    isDecrease = false
  ): Map<string, number> => {
    const curValue = cognFnCounterMap.get(cognFnId) ?? 0;
    const updValue = isDecrease ? Math.max(0, curValue - 1) : curValue + 1;
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
            id: 'Fi',
            title: translation.feelingCard.introverted_function.title,
            description:
              translation.feelingCard.introverted_function.description,
            icon: <IntrovertedFeelingIcon />,
          },
          {
            id: 'Fe',
            title: translation.feelingCard.extraverted_function.title,
            description:
              translation.feelingCard.extraverted_function.description,
            icon: <ExtravertedFeelingIcon />,
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
            id: 'Ni',
            title: translation.intuitionCard.introverted_function.title,
            description:
              translation.intuitionCard.introverted_function.description,
            icon: <IntrovertedIntuitionIcon />,
          },
          {
            id: 'Ne',
            title: translation.intuitionCard.extraverted_function.title,
            description:
              translation.intuitionCard.extraverted_function.description,
            icon: <ExtravertedIntuitionIcon />,
          },
        ],
      },
    ];

    setCognitiveFnCards(data);
  };

  // Init data
  useEffect(() => {
    const initData = async () => {
      // Get translation
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

  // Update personality
  useEffect(() => {
    if (!translation) return;

    // Exit if there is not enough data
    if (personality && cognFnArrayLength < 2) {
      setPersonality(null);
      return;
    }

    // Generate the cognitive fn pattern (serializing the cognitive fn array)
    const cognFnPattern = getCognFnPattern(cognitiveFnArr);

    // Check whether the cognitive fn pattern is matches to a personality type
    const { type, matchPercent, status } =
      getMBTITypeByCognFnPattern(cognFnPattern);

    // Exit if there is no match
    if (!type) {
      if (personality) setPersonality(null);
      return;
    }

    const curPersonalityType = personality?.mbti.personalityType;

    // Set a new personality
    if (type !== curPersonalityType) {
      // Get translation
      const translationData = translation.personalityTypes.find(
        (item) => item.type === type
      ) as PersonalityTypeTranslation;
      // Get MBTIMap data
      const mapItem = MBTIMap.get(type) as MBTIMapItem;
      // Configure the personality item
      const personItem: MBTIPersonalityItem = {
        mbti: {
          cognitiveFnArr,
          personalityType: type,
          functions: mapItem.cognitiveFns,
          matchPercent,
          status,
        },
        translation: translationData,
      };
      setPersonality(personItem);
    }

    // Update the existed personality match data
    if (type === curPersonalityType) {
      const updPersonItem = { ...(personality as MBTIPersonalityItem) };
      updPersonItem.mbti.matchPercent = matchPercent;
      updPersonItem.mbti.status = status;
      setPersonality(updPersonItem);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cognitiveFnArr, translation]);

  // Update personalities
  useEffect(() => {
    if (!personality) return;

    // Add the first item
    if (!personalities.length) {
      setPersonalities([personality]);
      return;
    }

    // Update the existing item
    const index = personalities.findIndex(
      (item) => item.mbti.personalityType === personality.mbti.personalityType
    );
    if (index > -1) {
      const updPersonalities = [...personalities];
      const updPersonality = updPersonalities[index];
      updPersonality.mbti.cognitiveFnArr = personality.mbti.cognitiveFnArr;
      updPersonality.mbti.matchPercent = personality.mbti.matchPercent;
      updPersonality.mbti.status = personality.mbti.status;
      updPersonalities[index] = updPersonality;
      const sortedItems = sortPersonalityItems(updPersonalities);
      setPersonalities(sortedItems);
    } else {
      // Add a new item
      setPersonalities((prev) => sortPersonalityItems([...prev, personality]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personality]);

  // Reset personalities
  useEffect(() => {
    if (cognFnArrayLength === 0) setPersonalities([]);
  }, [cognFnArrayLength]);

  if (!translation) return null;

  return (
    <div className="mbti-dashboard max-h-[920px] w-[400px] max-w-[400px] mx-auto relative flex flex-1 flex-col justify-between">
      <div className="top flex flex-1 flex-col max-h-[300px]">
        {/* Header: Personality Type */}
        <div className="h-28 my-4 flex flex-1 flex-col justify-center">
          <DashboardHeader personality={personality} />
        </div>

        {/* Personality Cards */}
        <PersonalityCards personalities={personalities} />
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

        {/* Cognitive Function List */}
        <div className="my-4 flex flex-1 flex-col justify-center">
          <CognFunctions
            cognitiveFnArr={cognitiveFnArr}
            translation={translation}
            onFunctionClick={handleCognFnListItemClick}
          />
        </div>

        {/* Toolbar */}
        {/* Cognitive Function Cards */}
        <CognFunctionCards
          cognitiveFnCards={cognitiveFnCards}
          onClick={handleCognFnButtonClick}
        />
      </div>

      {/* Topbar - position absolute */}
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

export default Dashboard;
