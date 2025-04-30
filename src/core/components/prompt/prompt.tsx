'use client';

import { useRouter } from 'next/navigation';
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
  MBTI_TEST_RESULTS_STATE_KEY,
  PROMPT_SIMPLE_OUTPUT_KEY,
  PROMPT_STATE_KEY,
} from '@/core/constants';
import { useLangCode } from '@/core/context/LangContext';
import { useClipboard } from '@/core/hooks/useClipboard';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  MBTIDashboardState,
  MBTITestResultsStateLS,
  MBTIType,
  PromptState,
} from '@/core/types/mbti';
import {
  CognitiveFunctionsTranslation,
  PromptTranslation,
} from '@/core/types/translation';
import { cn } from '@/core/utils/common';
import {
  getMBTITypesTranslation,
  getPromptTranslation,
} from '@/core/utils/dictionary';
import {
  getDominantTraits,
  initMBTIDashboardCard,
  initMBTITestCard,
} from '@/core/utils/mbti';
import MBTITypeCard from '@/core/components/mbti-dashboard/mbti-type-card';

type PromptStateForLS = {
  translation: PromptTranslation;
} | null;

const initialState: PromptState = {
  translation: null,
  MBTIDashboardCard: null,
  MBTITestCard: null,
  prompt: null,
};

const PromptClient = () => {
  const { langCode } = useLangCode();
  const router = useRouter();
  const [getState, saveState] = useLocalStorage();
  const { copy } = useClipboard();

  const [state, setState] = useState<PromptState>(initialState);
  const [isSimpleOutput, setIsSimpleOutput] = useState(false);

  const { MBTIDashboardCard, MBTITestCard, prompt, translation } = state;
  const isPromptAllowed =
    (MBTIDashboardCard?.dataStatus === 'ok' && MBTIDashboardCard.isActive) ||
    (MBTITestCard?.dataStatus === 'ok' && MBTITestCard.isActive);

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

  const handleMBTITestCardToggle = () => {
    if (!MBTITestCard || !translation) return;

    setState((prev) => ({
      ...prev,
      MBTITestCard: {
        ...MBTITestCard,
        isActive: !prev.MBTITestCard?.isActive,
        message: translation.disabledCardMessage,
      },
    }));
  };

  const handleMBTITestTypeCardClick = (type: MBTIType) => {
    router.push(`/mbti-type/${type}`);
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

  const handleCancelBtnClick = () => {
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

    let prompt = 'Cognitive functions typing results:';

    // Handle cognitive functions
    if (MBTIDashboardCard.data.cognitiveFnArr.length) {
      const cognitiveFunctions = MBTIDashboardCard.data.cognitiveFnArr.map(
        ([cognFnId, matchNum]) => `${cognFnId}: ${matchNum}`
      );
      prompt += `\n- Match count: ${cognitiveFunctions.join(', ')}. `;
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

      // Handle the output mode
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

      // Card 1 - MBTI dashboard page data

      const MBTIDashboardCard = initMBTIDashboardCard();
      const MBTIDashboardStateFromLS =
        getState<MBTIDashboardState>(DASHBOARD_STATE_KEY);

      if (MBTIDashboardStateFromLS) {
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
      } else {
        MBTIDashboardCard.dataStatus = 'no-data';
        MBTIDashboardCard.message = translation.noDataMessage;
      }

      // Card 2 - MBTI Test page data

      const MBTITestCard = initMBTITestCard();
      const MBTITestStateFromLS = getState<MBTITestResultsStateLS>(
        MBTI_TEST_RESULTS_STATE_KEY
      );

      if (MBTITestStateFromLS) {
        const type = MBTITestStateFromLS.type;
        const traitMap = MBTITestStateFromLS.traitMap;
        const traitMapTranslation =
          MBTITestStateFromLS.translations.traits.traitMap;

        if (type && traitMap.length && traitMapTranslation.length) {
          // Get MBTI types translation
          const MBTITypeTranslation = await getMBTITypesTranslation(langCode);

          const MBTITypeItemTranslation = MBTITypeTranslation.find(
            (item) => item.type === type
          );
          if (!MBTITypeItemTranslation) {
            toast(`Unable to load localized data`);
            return;
          }

          // Data is ok
          MBTITestCard.dataStatus = 'ok';
          MBTITestCard.isActive = true;

          // Init values
          MBTITestCard.data!.type = type;
          MBTITestCard.data!.typeBoxTitle = MBTITypeItemTranslation.title[0];
          MBTITestCard.data!.dominantTraits = getDominantTraits({
            traitMap,
            traitMapTranslation,
          });
        }
      } else {
        // No data
        MBTITestCard.dataStatus = 'no-data';
        MBTITestCard.message = translation.noDataMessage;
      }

      setState((prev) => ({
        ...prev,
        MBTIDashboardCard,
        MBTITestCard,
      }));
    };

    initData();
  }, [getState, saveState, langCode]);

  // Update output state in LocalStorage
  useEffect(() => {
    saveState<boolean>(PROMPT_SIMPLE_OUTPUT_KEY, isSimpleOutput);
  }, [isSimpleOutput, getState, saveState]);

  // useEffect(() => {
  //   if (copied) {
  //     toast('Prompt copied to clipboard');
  //   }
  // }, [copied]);

  if (!translation) return null;

  return (
    <div className="max-h-[920px] w-full base-max-w mx-auto flex flex-1 flex-col justify-between px-1 pt-4">
      <div className="flex flex-1 flex-col gap-4">
        {/* Header */}
        <AnimatedAppear className="flex flex-1 min-h-24 max-h-32 flex-col justify-center gap-2 items-center no-select">
          <div className="text-xl font-extrabold text-accent tracking-wide uppercase">
            {translation.headerTitle}
          </div>
          <div className="text-xs font-semibold text-muted/80 tracking-wide">
            {translation.headerDescription}
          </div>
        </AnimatedAppear>

        {/* Content Cards */}

        <div className="flex flex-col gap-8 pb-4">
          {/* Cognitive Functions / MBTI Dashboard / Main page) */}
          <AnimatedAppear>
            <PromptCard
              title={translation.MBTIDashboardCardTitle}
              onStateToggle={handleMBTIDashboardCardToggle}
              isActive={MBTIDashboardCard?.isActive}
              message={MBTIDashboardCard?.message}
              dataStatus={MBTIDashboardCard?.dataStatus}
            >
              {!!MBTIDashboardCard?.data ? (
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
          </AnimatedAppear>

          {/* MBTI Test */}
          <AnimatedAppear>
            <PromptCard
              title={translation.MBTITestCardTitle}
              onStateToggle={handleMBTITestCardToggle}
              isActive={MBTITestCard?.isActive}
              message={MBTITestCard?.message}
              dataStatus={MBTITestCard?.dataStatus}
            >
              {!!MBTITestCard?.data ? (
                <div className="flex items-center fustify-center gap-6 cursor-default">
                  {/* MBTI Type Card */}
                  <div className="p-0.5 bg-card rounded-2xl">
                    <MBTITypeCard
                      title={MBTITestCard.data.typeBoxTitle}
                      type={MBTITestCard.data.type as MBTIType}
                      isActive={true}
                      onClick={handleMBTITestTypeCardClick}
                    />
                  </div>

                  {/* Dominant Trait List */}
                  <div className="flex flex-col gap-1 justify-between">
                    {MBTITestCard.data.dominantTraits.map((item) => (
                      <div
                        className="flex text-xs text-accent-text font-medium tracking-wide"
                        key={item[0]}
                      >
                        {/* Trait Title */}
                        <div>{item[0]}:</div>
                        {/* Percentage */}
                        <div className="ml-2">{item[1]}</div>
                        <div className="pl-0.5 font-bold text-muted/40">%</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </PromptCard>
          </AnimatedAppear>
        </div>
      </div>

      <div className="py-4 sticky bottom-0 bg-background z-20">
        {/* Prompt */}
        {prompt ? (
          <AnimatedAppear isShown={!!prompt && isPromptAllowed} className="">
            <div className="p-4 text-sm font-medium text-accent-text whitespace-pre-wrap border-2 border-accent rounded-2xl">
              {prompt}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-4">
              {/* Reset */}
              <Button onClick={handleCancelBtnClick} variant="secondary">
                {translation.cancelBtnTitle}
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
            <div className="flex items-center justify-between px-0.5">
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
    </div>
  );
};

export default PromptClient;
