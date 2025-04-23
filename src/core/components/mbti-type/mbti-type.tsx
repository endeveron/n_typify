'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CognFunctions from '@/core/components/mbti-dashboard/cogn-functions';
import PersonalityTypeHeader from '@/core/components/mbti-dashboard/personality-type-header';
import { useLangCode } from '@/core/context/LangContext';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { MBTITypeState, MBTIType as TMBTIType } from '@/core/types/mbti';
import {
  CognitiveFunctionsTranslation,
  MBTITypeDetailsTranslation,
  MBTITypeTranslation,
} from '@/core/types/translation';
import {
  getCognitiveFunctionsTranslation,
  getMBTITypeDetailsTranslation,
  getMBTITypesTranslation,
} from '@/core/utils/dictionary';
import { MBTIMap } from '@/core/utils/mbti';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import TextBox from '@/core/components/mbti-type/text-box';
import FamousPersons from '@/core/components/mbti-type/famous-persons';

export const MBTI_TYPE_STATE_KEY = 'mbti_type_state';

type MBTITypeStateLS = {
  typeMapTranslation: [TMBTIType, MBTITypeTranslation][];
  typeDetalsMapTranslation: [TMBTIType, MBTITypeDetailsTranslation][];
  cognFnsTranslation: CognitiveFunctionsTranslation;
};

type MBTITypeProps = {
  type: string;
};

const initialState: MBTITypeState = {
  translation: null,
  cognitiveFnArr: [],
};

const MBTIType = ({ type }: MBTITypeProps) => {
  const { langCode } = useLangCode();
  const [getState, saveState] = useLocalStorage();

  const [state, setState] = useState<MBTITypeState>(initialState);
  // const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const { translation } = state;
  const traits = translation?.MBTITypeDetails.traitSet;
  const descriptionParagraphs = translation?.MBTITypeDetails.description;

  // const handle = useCallback(
  //   () => {
  //   },
  //   []
  // );

  // Init translations, restore state from LocalStorage
  useEffect(() => {
    const initData = async () => {
      // Get page translation
      // const translation = await getMBTITypeTranslation(langCode);

      let typeMapTranslation = new Map<TMBTIType, MBTITypeTranslation>();
      let typeDetalsMapTranslation = new Map<
        TMBTIType,
        MBTITypeDetailsTranslation
      >();
      let cognFnsTranslation;

      // Try to restore typeMapTranslation from LocalStorage
      const stateFromLS = getState<MBTITypeStateLS>(MBTI_TYPE_STATE_KEY);
      const isDataFromLS = stateFromLS?.typeMapTranslation.length;

      if (isDataFromLS) {
        typeMapTranslation = new Map(stateFromLS.typeMapTranslation);
        typeDetalsMapTranslation = new Map(
          stateFromLS.typeDetalsMapTranslation
        );
        // cognFnsMapTranslation = new Map(stateFromLS.cognFnsMapTranslation);
        // cognFnsStackTranslation = stateFromLS.cognFnsStackTranslation;
        cognFnsTranslation = stateFromLS.cognFnsTranslation;
      } else {
        // Get translations
        const MBTITypesTranslation = await getMBTITypesTranslation(langCode);
        const MBTITypeDetailsTranslation = await getMBTITypeDetailsTranslation(
          langCode
        );
        cognFnsTranslation = await getCognitiveFunctionsTranslation(langCode);
        if (
          !MBTITypesTranslation ||
          !MBTITypeDetailsTranslation ||
          !cognFnsTranslation
        ) {
          toast(`Unable to load localized data`);
          return;
        }

        // Init typeMapTranslation
        for (const t of MBTITypesTranslation) {
          typeMapTranslation.set(t.type, t);
        }

        // Init typeDetailsMapTranslation
        for (const d of MBTITypeDetailsTranslation) {
          typeDetalsMapTranslation.set(d.type, d);
        }

        // Save state in LocalStorage
        saveState<MBTITypeStateLS>(MBTI_TYPE_STATE_KEY, {
          typeMapTranslation: [...typeMapTranslation],
          typeDetalsMapTranslation: [...typeDetalsMapTranslation],
          cognFnsTranslation,
        });
      }

      // Configure translation
      const translation = {
        MBTIType: typeMapTranslation.get(
          type as TMBTIType
        ) as MBTITypeTranslation,
        MBTITypeDetails: typeDetalsMapTranslation.get(
          type as TMBTIType
        ) as MBTITypeDetailsTranslation,
        cognitiveFunctions: cognFnsTranslation,
      };

      // Get cognitiveFns array for current MBTI type
      const cognitiveFnArr = MBTIMap.get(type)?.cognitiveFns as string[];

      setState((prev) => ({
        ...prev,
        translation,
        cognitiveFnArr,
      }));
    };

    initData();
  }, [langCode, type, getState, saveState]);

  if (!translation) return null;

  return (
    <div className="base-max-w mx-auto flex flex-col items-center gap-8 cursor-default">
      {/* Personality Type */}
      <div className="mt-8 flex flex-col gap-4">
        <PersonalityTypeHeader
          MBTIType={translation.MBTIType.type}
          title={translation.MBTIType.title[0]}
          subtitle={translation.MBTIType.subtitle}
        />
      </div>

      {/* Traits */}
      <AnimatedAppear
        isShown={!!traits}
        className="flex items-center justify-center gap-4 text-xs text-accent-text font-semibold tracking-wide uppercase"
      >
        {translation.MBTITypeDetails.traitSet.map((trait) => (
          <div key={trait}>{trait}</div>
        ))}
      </AnimatedAppear>

      {/* Cognitive Function List */}
      <div className="flex flex-col justify-center">
        <CognFunctions
          cognitiveFnArr={state.cognitiveFnArr.map((id) => [id, 0])}
          translation={translation.cognitiveFunctions}
        />
      </div>

      {/* Famous Persons */}
      <div className="my-4 flex flex-1 flex-col gap-4">
        <FamousPersons persons={translation.MBTITypeDetails.famousPersons} />
      </div>

      {/* Description Paragraphs */}
      {descriptionParagraphs?.length ? (
        <TextBox paragraphs={descriptionParagraphs} />
      ) : null}
    </div>
  );
};

export default MBTIType;
