'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  CognFunctionArr,
  CognitiveFnId,
  MBTIDashboardState,
  MBTIMapItem,
  MBTIPersonalityItem,
} from '@/core/types/mbti';
import { LangCode, PersonalityTypeTranslation } from '@/core/types/translation';
import { getMBTIDashboardTranslation } from '@/core/utils/dictionary';

// // `energy` trait
// import IntroversionIcon from '~/public/icons/mbti/arrows-minimize.svg';
// import ExtraversionIcon from '~/public/icons/mbti/arrows-maximize.svg';
// // `tactics` trait
// import JudgingIcon from '~/public/icons/mbti/list.svg';
// import PerceivingIcon from '~/public/icons/mbti/network.svg';
// import MBTITraitCard from '@/core/components/mbti-dashboard/mbti-trait-card';

import SignOutButton from '@/core/components/auth/sign-out-btn';
import CleanUpResults from '@/core/components/mbti-dashboard/clean-up-results';
import CognFunctionCards from '@/core/components/mbti-dashboard/cogn-function-cards';
import CognFunctions from '@/core/components/mbti-dashboard/cogn-functions';
import DashboardHeader from '@/core/components/mbti-dashboard/dashboard-header';
import PersonalityCards from '@/core/components/mbti-dashboard/personality-cards';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  configureCognitiveFnCards,
  defaultCognFnCounterMap,
  getCognFnPattern,
  getMBTITypeByCognFnPattern,
  MBTIMap,
  sortPersonalityItems,
} from '@/core/utils/mbti';

const STATE_SAVE_INTERVAL_SEC = 20;
const STATE_KEY = 'dashboard_state';

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

const initialState: MBTIDashboardState = {
  translation: null,
  personality: null,
  personalities: [],
  cognitiveFnArr: [],
  cognitiveFnCards: [],
};

type DashboardProps = {
  langCode?: LangCode;
};

const Dashboard = ({ langCode }: DashboardProps) => {
  const [getState, saveState] = useLocalStorage();

  const [state, setState] = useState<MBTIDashboardState>(initialState);

  const cognFnArrayLength = state.cognitiveFnArr.length;

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
      const updCognFnArr = [...state.cognitiveFnArr];
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
      return [...state.cognitiveFnArr, [cognFnId, counter]];
    } else {
      // Add the first item
      return [[cognFnId, counter]];
    }
  };

  const handleCognFnButtonClick = (cognFnId: CognitiveFnId): void => {
    // Increase counter value by 1
    const updCognFnCountMap = updateCognFnCounterMap(cognFnId);
    const cognitiveFnArr = updateCognFnArray(cognFnId, updCognFnCountMap);
    setState((prev) => ({
      ...prev,
      cognitiveFnArr,
    }));
  };

  const handleCognFnListItemClick = (cognFnId: CognitiveFnId) => {
    // Decrease counter value by 1
    const updCognFnCountMap = updateCognFnCounterMap(cognFnId, true);
    const cognitiveFnArr = updateCognFnArray(cognFnId, updCognFnCountMap);
    setState((prev) => ({
      ...prev,
      cognitiveFnArr,
    }));
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
    setState((prev) => ({
      ...prev,
      cognitiveFnArr: [],
    }));
    saveState(STATE_KEY, initialState);
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

  // Init toolbar cards and translation
  useEffect(() => {
    const initData = async () => {
      // Get translation
      const translation = await getMBTIDashboardTranslation(langCode);
      if (!translation) {
        toast(`Unable to get translations`);
        return;
      }

      // Init toolbar cards
      const cognitiveFnCards = configureCognitiveFnCards(translation);

      // Update local state
      setState((prev) => ({
        ...prev,
        cognitiveFnCards,
        translation,
      }));
    };

    initData();
  }, [langCode]);

  // Update personality
  useEffect(() => {
    if (!state.translation) return;

    // Exit if there is not enough data
    if (state.personality && cognFnArrayLength < 2) {
      setState((prev) => ({
        ...prev,
        personality: null,
      }));
      return;
    }

    // Generate the cognitive fn pattern (serializing the cognitive fn array)
    const cognFnPattern = getCognFnPattern(state.cognitiveFnArr);

    // Check whether the cognitive fn pattern is matches to a personality type
    const { type, matchPercent, status } =
      getMBTITypeByCognFnPattern(cognFnPattern);

    // Exit if there is no match
    if (!type) {
      if (state.personality) {
        setState((prev) => ({ ...prev, personality: null }));
      }
      return;
    }

    const curPersonalityType = state.personality?.mbti.personalityType;

    // Set a new personality
    if (type !== curPersonalityType) {
      // Get translation
      const translationData = state.translation.personalityTypes.find(
        (item) => item.type === type
      ) as PersonalityTypeTranslation;
      // Get MBTIMap data
      const mapItem = MBTIMap.get(type) as MBTIMapItem;
      // Configure the personality item
      const personality: MBTIPersonalityItem = {
        mbti: {
          cognitiveFnArr: state.cognitiveFnArr,
          personalityType: type,
          functions: mapItem.cognitiveFns,
          matchPercent,
          status,
        },
        translation: translationData,
      };
      setState((prev) => ({ ...prev, personality }));
    }

    // Update the existed personality match data
    if (type === curPersonalityType) {
      const personality = { ...(state.personality as MBTIPersonalityItem) };
      personality.mbti.matchPercent = matchPercent;
      personality.mbti.status = status;
      setState((prev) => ({ ...prev, personality }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cognitiveFnArr, state.translation]);

  // Update personalities
  useEffect(() => {
    if (!state.personality) return;

    const personality = state.personality as MBTIPersonalityItem;

    // Add the first item
    if (!state.personalities.length) {
      setState((prev) => ({
        ...prev,
        personalities: [personality],
      }));
      return;
    }

    // Update the existing item
    const index = state.personalities.findIndex(
      (item) => item.mbti.personalityType === personality.mbti.personalityType
    );
    if (index > -1) {
      const updPersonalities = [...state.personalities];
      const updPersonality = updPersonalities[index];
      updPersonality.mbti.cognitiveFnArr = personality.mbti.cognitiveFnArr;
      updPersonality.mbti.matchPercent = personality.mbti.matchPercent;
      updPersonality.mbti.status = personality.mbti.status;
      updPersonalities[index] = updPersonality;
      const sortedItems = sortPersonalityItems(updPersonalities);
      setState((prev) => ({
        ...prev,
        personalities: sortedItems,
      }));
    } else {
      // Add a new item
      const sortedItems = sortPersonalityItems([
        ...state.personalities,
        personality,
      ]);
      setState((prev) => ({
        ...prev,
        personalities: sortedItems,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.personality]);

  // Reset personalities
  useEffect(() => {
    if (cognFnArrayLength === 0) {
      setState((prev) => ({ ...prev, personalities: [] }));
    }
  }, [cognFnArrayLength]);

  // Restore state from LocalStorage
  useEffect(() => {
    const stateFromStorage = getState<MBTIDashboardState>(STATE_KEY);
    if (stateFromStorage) setState(stateFromStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save state in LocalStorage
  useEffect(() => {
    const timerId = setInterval(() => {
      saveState(STATE_KEY, state);
    }, STATE_SAVE_INTERVAL_SEC * 1000);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveState]);

  if (!state.translation) return null;

  return (
    <div className="mbti-dashboard max-h-[920px] w-[400px] max-w-[400px] mx-auto relative flex flex-1 flex-col justify-between">
      <div className="top flex flex-1 flex-col max-h-[300px]">
        {/* Header: Personality Type */}
        <div className="h-28 my-4 flex flex-1 flex-col justify-center">
          <DashboardHeader personality={state.personality} />
        </div>

        {/* Personality Cards */}
        <PersonalityCards personalities={state.personalities} />
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
            cognitiveFnArr={state.cognitiveFnArr}
            translation={state.translation}
            onFunctionClick={handleCognFnListItemClick}
          />
        </div>

        {/* Toolbar */}
        {/* <div className="my-4 flex justify-center gap-4">
          <Button size="sm" onClick={handleSaveState}>
            Save
          </Button>
        </div> */}
        {/* Cognitive Function Cards */}
        <CognFunctionCards
          cognitiveFnCards={state.cognitiveFnCards}
          onClick={handleCognFnButtonClick}
        />
      </div>

      {/* Topbar - position absolute */}
      <div className="absolute top-4 left-2 z-10">
        <SignOutButton />
      </div>
      <div className="absolute top-4 right-2 z-20">
        <CleanUpResults
          cleanUpResultsPrompt={state.translation.cleanUpResultsPrompt}
          isAllow={!!state.cognitiveFnArr.length}
          onCleanUp={cleanUpData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
