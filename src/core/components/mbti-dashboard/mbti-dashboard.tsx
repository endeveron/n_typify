'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import CleanUpResults from '@/core/components/mbti-dashboard/clean-up-results';
import CognFunctionCards from '@/core/components/mbti-dashboard/cogn-function-cards';
import CognFunctions from '@/core/components/mbti-dashboard/cogn-functions';
import MBTIVisual from '@/core/components/mbti-dashboard/mbti-visual';
import PersonalityCards from '@/core/components/mbti-dashboard/personality-cards';
import PersonalityTypeHeader from '@/core/components/mbti-dashboard/personality-type-header';
import { useLangCode } from '@/core/context/LangContext';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  CognFunctionArr,
  CognitiveFnId,
  MBTIDashboardState,
  MBTIMapItem,
  MBTIPersonalityItem,
} from '@/core/types/mbti';
import {
  CognitiveFunctionsTranslation,
  MBTITypeTranslation,
} from '@/core/types/translation';
import { cn } from '@/core/utils/common';
import {
  getCognitiveFunctionsTranslation,
  getMBTIDashboardTranslation,
  getMBTITypesTranslation,
} from '@/core/utils/dictionary';
import {
  configureCognitiveFnCards,
  defaultCognFnCounterMap,
  getCognFnPattern,
  getMBTITypeByCognFnPattern,
  MBTIMap,
  sortPersonalityItems,
} from '@/core/utils/mbti';

export const DASHBOARD_STATE_KEY = 'dashboard_state';

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
  isCleanUpConfirmMode: false,
};

const MBTIDashboard = () => {
  const { langCode } = useLangCode();
  const [getState, saveState] = useLocalStorage();

  const [state, setState] = useState<MBTIDashboardState>(initialState);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const {
    cognitiveFnArr,
    cognitiveFnCards,
    personality,
    personalities,
    translation,
  } = state;
  const cognFnArrayLength = cognitiveFnArr.length;
  const personalitiesLength = personalities.length;
  const isOutput = personality || personalitiesLength || cognFnArrayLength;

  // Converts map entries into an array, filters out zero values and sorts by count descending. Complexity: O(1) since n = 8.
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
    if (!hasUserInteracted) setHasUserInteracted(true);
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

  const handleCleanUpModeChange = useCallback((isConfirmMode: boolean) => {
    setState((prev) => ({
      ...prev,
      isCleanUpConfirmMode: isConfirmMode,
    }));
  }, []);

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
    saveState(DASHBOARD_STATE_KEY, initialState);
  };

  // Init toolbar cards and translation
  useEffect(() => {
    const initData = async () => {
      // Get page translation
      const dashboardTranslation = await getMBTIDashboardTranslation(langCode);
      // Get MBTI types translation
      const MBTITypeTranslation = await getMBTITypesTranslation(langCode);
      // Get Cognitive Functions translation
      const cognFnsTranslation = await getCognitiveFunctionsTranslation(
        langCode
      );
      if (
        !dashboardTranslation ||
        !MBTITypeTranslation ||
        !cognFnsTranslation
      ) {
        toast(`Unable to get translations`);
        return;
      }

      // Merge translations
      const translation = {
        ...dashboardTranslation,
        cognitiveFunctions: cognFnsTranslation,
        MBTITypes: MBTITypeTranslation,
      };

      // Init toolbar cards
      const cognitiveFnCards = configureCognitiveFnCards(translation);

      // Try to restore state from LocalStorage
      const stateFromStorage =
        getState<MBTIDashboardState>(DASHBOARD_STATE_KEY) ?? {};

      // Update local state
      setState((prev) => ({
        ...prev,
        ...stateFromStorage,
        cognitiveFnCards,
        translation,
      }));
    };

    initData();
  }, [getState, langCode]);

  // Update personality
  useEffect(() => {
    if (!translation) return;

    // Exit if there is not enough data
    if (personality && cognFnArrayLength < 2) {
      setState((prev) => ({
        ...prev,
        personality: null,
      }));
      return;
    }

    // Generate the cognitive fn pattern (serializing the cognitive fn array)
    const cognFnPattern = getCognFnPattern(cognitiveFnArr);

    // Check whether the cognitive fn pattern is matches to a personality type
    const { type, matchPercent, status } =
      getMBTITypeByCognFnPattern(cognFnPattern);

    // Exit if there is no match
    if (!type) {
      if (personality) {
        setState((prev) => ({ ...prev, personality: null }));
      }
      return;
    }

    // Must be here to avoid warnings in the useEffect dependency tree
    const currentType = personality?.mbti.personalityType;

    // Set a new personality
    if (type !== currentType) {
      // Get translation
      const translationData = translation.MBTITypes!.find(
        (item) => item.type === type
      ) as MBTITypeTranslation;

      // Get MBTIMap data
      const mapItem = MBTIMap.get(type) as MBTIMapItem;

      // Configure the personality item
      const newPersonality: MBTIPersonalityItem = {
        mbti: {
          cognitiveFnArr,
          personalityType: type,
          functions: mapItem.cognitiveFns,
          matchPercent,
          status,
        },
        translation: translationData,
      };

      setState((prev) => ({ ...prev, personality: newPersonality }));
      return;
    }

    // Update the existed personality
    const updPersonality = { ...(personality as MBTIPersonalityItem) };
    updPersonality.mbti.matchPercent = matchPercent;
    updPersonality.mbti.status = status;
    setState((prev) => ({ ...prev, personality: updPersonality }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cognitiveFnArr, translation, cognFnArrayLength]);

  // Update personalities
  useEffect(() => {
    if (!personality) return;

    // Add the first item
    if (!personalitiesLength) {
      setState((prev) => ({
        ...prev,
        personalities: [personality],
      }));
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
      setState((prev) => ({
        ...prev,
        personalities: sortedItems,
      }));
    } else {
      // Add a new item
      const sortedItems = sortPersonalityItems([...personalities, personality]);
      setState((prev) => ({
        ...prev,
        personalities: sortedItems,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personality]);

  // Reset personalities
  useEffect(() => {
    if (cognFnArrayLength === 0) {
      setState((prev) => ({ ...prev, personalities: [] }));
    }
  }, [cognFnArrayLength]);

  // Save state to LocalStorage when it changes
  useEffect(() => {
    if (hasUserInteracted) {
      saveState(DASHBOARD_STATE_KEY, state);
    }
  }, [hasUserInteracted, state, saveState]);

  if (!translation) return null;

  return (
    <div className="relative max-h-[920px] base-max-w mx-auto flex flex-1 flex-col justify-between">
      {isOutput ? (
        <>
          <div className="flex flex-1 flex-col max-h-[300px]">
            {/* Header: Personality Type */}

            <div
              className={cn(`flex flex-1 min-h-32 transition-opacity`, {
                'opacity-0': state.isCleanUpConfirmMode,
              })}
            >
              {personality ? (
                <PersonalityTypeHeader
                  MBTIType={personality.mbti.personalityType}
                  title={personality.translation.title[0]}
                  subtitle={personality.translation.subtitle}
                />
              ) : null}
            </div>

            {/* Personality Cards */}
            <div className="px-6">
              <PersonalityCards personalities={personalities} />
            </div>
          </div>

          {/* Cognitive Function List */}
          <div className="my-4 flex flex-1 flex-col justify-center">
            <CognFunctions
              cognitiveFnArr={cognitiveFnArr}
              translation={
                translation.cognitiveFunctions as CognitiveFunctionsTranslation
              }
              onFunctionClick={handleCognFnListItemClick}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <MBTIVisual />
        </div>
      )}

      {/* Toolbar */}
      <CognFunctionCards
        cognitiveFnCards={cognitiveFnCards}
        onClick={handleCognFnButtonClick}
      />

      {/* Absolute Positioned Content (Top) */}
      <div className="absolute top-2 right-0 z-20">
        <CleanUpResults
          cleanUpResultsPrompt={translation.cleanUpResultsPrompt}
          isAllow={!!cognitiveFnArr.length}
          onCleanUp={cleanUpData}
          onModeChanged={handleCleanUpModeChange}
        />
      </div>
    </div>
  );
};

export default MBTIDashboard;
