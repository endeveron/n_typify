'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import PersonalityTypeHeader from '@/core/components/mbti-dashboard/personality-type-header';
import Traits from '@/core/components/mbti-test/traits';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { MBTIResult, MBTITestResultsState, MBTIType } from '@/core/types/mbti';
import { LangCode, MBTITypeTranslation } from '@/core/types/translation';
import {
  getMBTITestResultsTranslation,
  getMBTITraitsTranslation,
  getMBTITypesTranslation,
} from '@/core/utils/dictionary';
import { Button } from '@/core/components/ui/button';
import { useRouter } from 'next/navigation';

type MBTITestResultsProps = {
  langCode: LangCode;
  result: MBTIResult | null;
};

const MBTITestResults = ({ langCode, result }: MBTITestResultsProps) => {
  const router = useRouter();
  const [state, setState] = useState<MBTITestResultsState>(null);

  const handleActionBtnClick = () => {
    const type = state?.type;
    if (!type) return;
    router.push(`/mbti-type/${type}`);
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

  if (!state) return null;

  return (
    <AnimatedAppear className="flex flex-1 flex-col">
      <PersonalityTypeHeader
        MBTIType={state.type as MBTIType}
        title={state.translations.type.title[0]}
        subtitle={state.translations.type.subtitle}
      />

      <Traits
        traitMap={state.traitMap}
        translation={state.translations.traits}
      />

      <div className="my-8 flex flex-col items-center justify-center gap-2">
        <Button variant="accent" onClick={handleActionBtnClick}>
          Save my results in profile
        </Button>
        <Button variant="accent" onClick={handleActionBtnClick}>
          {state.translations.page.actionBtnTitle}
        </Button>
        <Button variant="outline" onClick={handleActionBtnClick}>
          Send to my account email
        </Button>
      </div>

      <div className="my-8 flex text-sm flex-col items-center justify-center gap-2">
        <div className=" text-orange-300">TODO: keep state in LS</div>
        <div className=" text-orange-300">TODO: Share results ?</div>
      </div>
    </AnimatedAppear>
  );
};

export default MBTITestResults;
