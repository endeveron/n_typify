'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CognFunctions from '@/core/components/mbti-dashboard/cogn-functions';
import PersonalityCards from '@/core/components/mbti-dashboard/personality-cards';
import PromptCard from '@/core/components/prompt/prompt-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Button } from '@/core/components/ui/button';
import { Switch } from '@/core/components/ui/switch';
import {
  DASHBOARD_STATE_KEY,
  PROMPT_SIMPLE_OUTPUT_KEY,
  PROMPT_STATE_KEY,
} from '@/core/constants';
import { useLangCode } from '@/core/context/LangContext';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  MBTIDashboardCard,
  MBTIDashboardState,
  PromptState,
} from '@/core/types/mbti';
import {
  CognitiveFunctionsTranslation,
  PromptTranslation,
} from '@/core/types/translation';
import { cn } from '@/core/utils/common';
import { getPromptTranslation } from '@/core/utils/dictionary';
import { initDashboardCard } from '@/core/utils/mbti';
import { useClipboard } from '@/core/hooks/useClipboard';

type PromptStateForLS = {
  translation: PromptTranslation;
} | null;

const initialState: PromptState = {
  translation: null,
  MBTIDashboardCard: null,
  prompt: null,
};

const PromptClient = () => {
  const { langCode } = useLangCode();
  const [getState, saveState] = useLocalStorage();
  const { copy, copied } = useClipboard();

  const [state, setState] = useState<PromptState>(initialState);
  const [isSimpleOutput, setIsSimpleOutput] = useState(false);

  const { MBTIDashboardCard, prompt, translation } = state;
  const isPromptAllowed =
    MBTIDashboardCard?.dataStatus === 'ok' && MBTIDashboardCard.isActive;

  const handleMBTIDashboardCardToggle = () => {
    if (!MBTIDashboardCard || !translation) return;

    setState((prev) => ({
      ...prev,
      MBTIDashboardCard: {
        ...MBTIDashboardCard,
        isActive: !prev.MBTIDashboardCard?.isActive,
        message: translation.disabledCardMessage,
      },
    }));
  };

  const handleCreatePromptBtnClick = () => {
    const prompt = createPrompt();
    setState((prev) => ({
      ...prev,
      prompt,
    }));
  };

  const handleCopyPromptBtnClick = () => {
    if (!prompt) return;
    copy(prompt);
  };

  const handleResetPromptBtnClick = () => {
    setState((prev) => ({
      ...prev,
      prompt: null,
    }));
  };

  const toggleOutputForm = () => {
    setIsSimpleOutput((prev) => !prev);
  };

  const createPrompt = (): string | null => {
    if (
      !MBTIDashboardCard?.data?.cognitiveFnArr.length &&
      !MBTIDashboardCard?.data?.personalities.length
    ) {
      toast(`Unable to generate prompt. Invalid Input data`);
      return null;
    }

    let prompt = 'MBTI typing results:';

    // Handle cognitive functions
    if (MBTIDashboardCard.data.cognitiveFnArr.length) {
      const cognitiveFunctions = MBTIDashboardCard.data.cognitiveFnArr.map(
        ([cognFnId, matchNum]) => `${cognFnId}: ${matchNum}`
      );
      prompt += `\n- Cognitive functions match count: ${cognitiveFunctions.join(
        ', '
      )}. `;
    }

    // Handle MBTI type
    if (MBTIDashboardCard.data.personalities.length) {
      const MBTITypes = MBTIDashboardCard.data.personalities.map(
        (personality) =>
          `${personality.mbti.personalityType}: ${personality.mbti.matchPercent}%`
      );
      prompt += `\n- MBTI type match percentage: ${MBTITypes.join(', ')}. `;
    }

    const useDataStr = `using the data provided.`;
    prompt += `\nAnswer the question(s) `;
    prompt += isSimpleOutput
      ? `in a simple, casual manner, ${useDataStr} Avoid MBTI terms.`
      : useDataStr;

    return prompt;
  };

  // Init translations, restore state from LocalStorage
  useEffect(() => {
    const initData = async () => {
      // Try to restore state from LocalStorage
      const stateFromLS = getState<PromptStateForLS>(PROMPT_STATE_KEY);
      let translation: PromptTranslation;
      if (stateFromLS) {
        translation = stateFromLS.translation;
      } else {
        // Init state
        translation = await getPromptTranslation(langCode);

        // Save state in LocalStorage
        saveState(PROMPT_STATE_KEY, {
          translation,
        });
      }

      // Handle output mode
      const isSimpleOutputFromLS = getState<boolean>(PROMPT_SIMPLE_OUTPUT_KEY);
      if (isSimpleOutputFromLS) {
        setIsSimpleOutput(true);
      } else {
        // Save the output mode in LocalStorage
        saveState<boolean>(PROMPT_SIMPLE_OUTPUT_KEY, false);
      }

      setState((prev) => ({
        ...prev,
        translation,
      }));

      // Get the MBTI dashboard page data for the prompt
      let MBTIDashboardCard: MBTIDashboardCard | null = null;
      // Try to get data from LocalStorage
      const MBTIDashboardStateFromLS =
        getState<MBTIDashboardState>(DASHBOARD_STATE_KEY);

      if (MBTIDashboardStateFromLS) {
        MBTIDashboardCard = initDashboardCard();

        const personalities = MBTIDashboardStateFromLS.personalities;
        const isPersonalities = personalities.length;
        const cognitiveFnArr = MBTIDashboardStateFromLS.cognitiveFnArr;
        const isCognitiveFnArrLength = cognitiveFnArr.length;
        let totalMatchNum = 0;

        // Personality (MBTI type) cards data
        if (isPersonalities) {
          MBTIDashboardCard.data!.personalities = [...personalities];
        }

        // Cognitive functions and translations
        if (isCognitiveFnArrLength) {
          MBTIDashboardCard.data!.cognitiveFnArr = [...cognitiveFnArr];

          // Calculate total match
          totalMatchNum = cognitiveFnArr.reduce((total, [, curNum]) => {
            return (total += curNum);
          }, 0);
        }
        if (MBTIDashboardStateFromLS.translation?.cognitiveFunctions) {
          MBTIDashboardCard.data!.cognitiveFnTranslation = {
            ...MBTIDashboardStateFromLS.translation.cognitiveFunctions,
          };
        }

        if (isPersonalities && totalMatchNum >= 4) {
          // Data is ok
          MBTIDashboardCard.dataStatus = 'ok';
          MBTIDashboardCard.isActive = true;
        }
        if (MBTIDashboardCard.data && totalMatchNum < 4) {
          // Not enough data
          MBTIDashboardCard.dataStatus = 'not-enough-data';
          MBTIDashboardCard.message = translation.notEnoughDataMessage;
        }
        if (!MBTIDashboardCard.data?.cognitiveFnArr.length) {
          // No data
          MBTIDashboardCard.dataStatus = 'no-data';
          MBTIDashboardCard.message = translation.noDataMessage;
        }
      }

      setState((prev) => ({
        ...prev,
        MBTIDashboardCard,
      }));
    };

    initData();
  }, [getState, saveState, langCode]);

  // Update output state in LocalStorage
  useEffect(() => {
    saveState<boolean>(PROMPT_SIMPLE_OUTPUT_KEY, isSimpleOutput);
  }, [isSimpleOutput, getState, saveState]);

  useEffect(() => {
    if (copied) {
      toast('Prompt copied to clipboard');
    }
  }, [copied]);

  if (!translation) return null;

  return (
    <div className="max-h-[920px] w-full base-max-w mx-auto flex flex-1 flex-col justify-between px-1 py-4">
      <div className="flex flex-1 flex-col gap-4">
        {/* Header */}
        <AnimatedAppear className="flex flex-1 max-h-28 flex-col justify-center gap-2 items-center no-select">
          <div className="text-xl font-extrabold text-accent tracking-wide uppercase">
            {translation.headerTitle}
          </div>
          <div className="text-xs font-medium text-muted/80 tracking-wide">
            {translation.headerDescription}
          </div>
        </AnimatedAppear>

        {/* Content Cards */}

        {/* Cognitive Functions (MBTI Dashboard / Main page) */}
        {MBTIDashboardCard ? (
          <PromptCard
            title={translation.dashboardDataTitle}
            onStateToggle={handleMBTIDashboardCardToggle}
            isActive={MBTIDashboardCard.isActive}
            message={MBTIDashboardCard.message}
            dataStatus={MBTIDashboardCard.dataStatus}
          >
            {MBTIDashboardCard.data ? (
              <>
                <div className="max-w-[380px]">
                  <PersonalityCards
                    personalities={MBTIDashboardCard.data?.personalities}
                    showPrompt={false}
                  />
                </div>

                <CognFunctions
                  cognitiveFnArr={MBTIDashboardCard.data.cognitiveFnArr}
                  translation={
                    MBTIDashboardCard.data
                      .cognitiveFnTranslation as CognitiveFunctionsTranslation
                  }
                />
              </>
            ) : null}
          </PromptCard>
        ) : null}

        {/* MBTI Test */}
      </div>

      {/* Prompt */}
      {prompt ? (
        <AnimatedAppear
          isShown={!!prompt && isPromptAllowed}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="p-4 text-sm font-medium text-accent-text whitespace-pre-wrap border-2 border-accent rounded-2xl">
            {prompt}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {/* Reset */}
            <Button onClick={handleResetPromptBtnClick} variant="secondary">
              {translation.resetBtnTitle}
            </Button>
            {/* Copy Prompt to Clipboard */}
            <Button
              className="flex-1"
              onClick={handleCopyPromptBtnClick}
              variant="accent"
            >
              {translation.copyPromptBtnTitle}
            </Button>
          </div>
        </AnimatedAppear>
      ) : null}

      {!prompt ? (
        <AnimatedAppear
          isShown={isPromptAllowed && !prompt}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            {/* Simplify Output Toggle */}
            <div
              className={cn(
                `text-xs font-semibold tracking-wide no-select transition-color`,
                {
                  'text-accent-text': isSimpleOutput,
                  'text-muted/60': !isSimpleOutput,
                }
              )}
            >
              <div onClick={toggleOutputForm} className="py-1 cursor-pointer">
                {translation.simplifyOutputTitle}
              </div>
            </div>

            <Switch
              className="cursor-pointer"
              onClick={toggleOutputForm}
              checked={isSimpleOutput}
            />
          </div>

          {/* Create Prompt Button */}
          <Button onClick={handleCreatePromptBtnClick} variant="accent">
            {translation.createPromptBtnTitle}
          </Button>
        </AnimatedAppear>
      ) : null}
    </div>
  );
};

export default PromptClient;
