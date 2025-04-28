'use client';

import { useEffect, useState } from 'react';

import CognFunctions from '@/core/components/mbti-dashboard/cogn-functions';
import PersonalityCards from '@/core/components/mbti-dashboard/personality-cards';
import PromptCard from '@/core/components/prompt/prompt-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { DASHBOARD_STATE_KEY, PROMPT_STATE_KEY } from '@/core/constants';
import { useLangCode } from '@/core/context/LangContext';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  CognitiveFnDataForPrompt,
  MBTIDashboardState,
  PromptState,
} from '@/core/types/mbti';
import {
  CognitiveFunctionsTranslation,
  PromptTranslation,
} from '@/core/types/translation';
import { getPromptTranslation } from '@/core/utils/dictionary';
import { createEmptyDashboardData } from '@/core/utils/mbti';

type PromptStateForLS = {
  translation: PromptTranslation;
} | null;

const initialState: PromptState = {
  MBTIDashboardData: null,
  translation: null,
  isCognFnDataActive: true,
};

const PromptClient = () => {
  const { langCode } = useLangCode();
  const [getState, saveState] = useLocalStorage();

  const [state, setState] = useState<PromptState>(initialState);
  // const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const { MBTIDashboardData, isCognFnDataActive, translation } = state;

  const handleCognFnCardToggle = () => {
    setState((prev) => ({
      ...prev,
      isCognFnDataActive: !prev.isCognFnDataActive,
    }));
  };

  // Init translations, restore state from LocalStorage
  useEffect(() => {
    const initData = async () => {
      // Get page translation
      let translation: PromptTranslation;
      // Try to restore state from LocalStorage
      const stateFromLS = getState<PromptStateForLS>(PROMPT_STATE_KEY);
      if (stateFromLS) {
        translation = stateFromLS.translation;
      } else {
        translation = await getPromptTranslation(langCode);

        // Save state in LocalStorage
        saveState(PROMPT_STATE_KEY, {
          translation,
        });
      }
      setState((prev) => ({
        ...prev,
        translation,
      }));

      // Get the MBTI dashboard page data for the prompt
      let MBTIDashboardData: CognitiveFnDataForPrompt | null = null;
      // Try to get data from LocalStorage
      const MBTIDashboardStateFromLS =
        getState<MBTIDashboardState>(DASHBOARD_STATE_KEY);

      if (MBTIDashboardStateFromLS) {
        MBTIDashboardData = createEmptyDashboardData();

        // Personality (MBTI type) cards data
        if (MBTIDashboardStateFromLS.personalities.length) {
          MBTIDashboardData.personalities = [
            ...MBTIDashboardStateFromLS.personalities,
          ];
        }

        // Cognitive functions and translations
        if (MBTIDashboardStateFromLS.cognitiveFnArr.length) {
          MBTIDashboardData.cognitiveFnArr = [
            ...MBTIDashboardStateFromLS.cognitiveFnArr,
          ];
        }
        if (MBTIDashboardStateFromLS.translation?.cognitiveFunctions) {
          MBTIDashboardData.cognitiveFnTranslation = {
            ...MBTIDashboardStateFromLS.translation.cognitiveFunctions,
          };
        }
      }

      // console.log('dashboardData', dashboardData);

      // Cognitive function match count - cognitiveFnArr
      // cognitiveFnArr + cognitiveFnTranslation => for list
      // personalities => for cards

      setState((prev) => ({
        ...prev,
        MBTIDashboardData,
      }));
    };

    initData();
  }, [getState, saveState, langCode]);

  if (!translation) return null;

  return (
    <div className="max-h-[920px] w-full base-max-w mx-auto flex flex-col flex-1 gap-12 pt-12 px-1">
      {/* Main Title */}
      <AnimatedAppear className="text-center text-xl font-extrabold text-accent tracking-wide uppercase no-select">
        {translation.mainTitle}
      </AnimatedAppear>

      {/* Content Cards */}

      {/* Cognitive Functions (MBTI Dashboard / Main page) */}
      {MBTIDashboardData ? (
        <PromptCard
          title={translation.dashboardDataTitle}
          onStateToggle={handleCognFnCardToggle}
          isActive={isCognFnDataActive}
          disabledCardMessage={translation.disabledCardMessage}
        >
          {/* Personality Cards */}
          <div className="max-w-[380px]">
            <PersonalityCards
              personalities={MBTIDashboardData.personalities}
              showPrompt={false}
            />
          </div>

          {/* Cognitive Function List */}
          <CognFunctions
            cognitiveFnArr={MBTIDashboardData.cognitiveFnArr}
            translation={
              MBTIDashboardData.cognitiveFnTranslation as CognitiveFunctionsTranslation
            }
          />
        </PromptCard>
      ) : null}
    </div>
  );
};

export default PromptClient;
