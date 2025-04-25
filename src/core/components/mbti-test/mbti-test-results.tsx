'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import PersonalityTypeHeader from '@/core/components/mbti-dashboard/personality-type-header';
import Traits from '@/core/components/mbti-test/traits';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Button } from '@/core/components/ui/button';
import { MBTI_TEST_RESULTS_STATE_KEY } from '@/core/constants';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  MBTIResult,
  MBTITestResultsState,
  MBTITestResultsStateLS,
  MBTIType,
} from '@/core/types/mbti';
import { LangCode, MBTITypeTranslation } from '@/core/types/translation';
import {
  getMBTITestResultsTranslation,
  getMBTITraitsTranslation,
  getMBTITypesTranslation,
} from '@/core/utils/dictionary';
import { useRouter } from 'next/navigation';

type MBTITestResultsProps = {
  langCode: LangCode;
  result: MBTIResult | null;
  onReset: () => void;
};

const MBTITestResults = ({
  langCode,
  result,
  onReset,
}: MBTITestResultsProps) => {
  const router = useRouter();
  const [, saveState] = useLocalStorage();

  const [state, setState] = useState<MBTITestResultsState>(null);

  const handleDetailsBtnClick = () => {
    const type = state?.type;
    if (!type) return;
    router.push(`/mbti-type/${type}`);
  };

  const handleTestAgainBtnClick = () => {
    setState(null);
    onReset();
  };

  // Init data
  useEffect(() => {
    if (!result) return;

    const initData = async () => {
      const { identity, traitMap, type } = result;

      // Get translations
      // Get page translation
      const pageTranslation = await getMBTITestResultsTranslation(langCode);
      // Get MBTI types translation
      const MBTITypesTranslation = await getMBTITypesTranslation(langCode);
      // Get Traits translation
      const MBTITraitsTranslation = await getMBTITraitsTranslation(langCode);
      if (!pageTranslation || !MBTITypesTranslation || !MBTITraitsTranslation) {
        toast(`Unable to get translations`);
        return;
      }

      const typeTranslation = MBTITypesTranslation.find(
        (item) => item.type === type
      ) as MBTITypeTranslation;

      const translations = {
        page: pageTranslation,
        type: typeTranslation,
        traits: MBTITraitsTranslation,
      };

      setState((prev) => ({
        ...prev,
        type,
        identity,
        traitMap,
        translations,
      }));
    };

    initData();
  }, [langCode, result]);

  // Save state in LocalStorage
  useEffect(() => {
    if (!state?.traitMap) return;
    saveState<MBTITestResultsStateLS>(MBTI_TEST_RESULTS_STATE_KEY, {
      ...state,
      traitMap: [...state.traitMap],
    });
  }, [state, saveState]);

  if (!state) return null;

  return (
    <AnimatedAppear className="flex flex-1 flex-col px-4">
      <PersonalityTypeHeader
        MBTIType={state.type as MBTIType}
        title={state.translations.type.title[0]}
        subtitle={state.translations.type.subtitle}
      />

      <Traits
        traitMap={state.traitMap}
        translation={state.translations.traits}
      />

      <div className="my-8 flex flex-col items-center justify-center gap-4">
        <Button variant="accent" onClick={handleDetailsBtnClick}>
          {state.translations.page.detailsBtnTitle}
        </Button>
        <Button variant="outline" onClick={handleTestAgainBtnClick}>
          {state.translations.page.testAgainBtnTitle}
        </Button>
      </div>
    </AnimatedAppear>
  );
};

export default MBTITestResults;
