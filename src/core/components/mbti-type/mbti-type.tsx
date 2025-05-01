'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CognFunctions from '@/core/components/mbti-dashboard/cogn-functions';
import PersonalityTypeHeader from '@/core/components/mbti-dashboard/personality-type-header';
import FamousPersons from '@/core/components/mbti-type/famous-persons';
import MBTITypeTable from '@/core/components/mbti-type/mbti-type-table';
import TextBox from '@/core/components/mbti-type/text-box';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { MBTI_TYPE_STATE_KEY } from '@/core/constants';
import { useLangCode } from '@/core/context/LangContext';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import {
  MBTITypeState,
  MBTITypeStateLS,
  MBTIType as TMBTIType,
} from '@/core/types/mbti';
import {
  MBTITypeDetailsTranslation,
  MBTITypeTranslation,
} from '@/core/types/translation';
import {
  getCognitiveFunctionsTranslation,
  getMBTITypeDetailsTranslation,
  getMBTITypesTranslation,
  getMBTITypeTranslation,
} from '@/core/utils/dictionary';
import { MBTIMap, similarTypeMap } from '@/core/utils/mbti';
import { useRouter } from 'next/navigation';

type MBTITypeProps = {
  type: string;
};

const initialState: MBTITypeState = {
  translation: null,
  cognitiveFnArr: [],
  similarTypes: [],
};

const MBTIType = ({ type }: MBTITypeProps) => {
  const { langCode } = useLangCode();
  const router = useRouter();
  const [getState, saveState] = useLocalStorage();

  const [state, setState] = useState<MBTITypeState>(initialState);
  // const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const { translation, similarTypes } = state;
  const traits = translation?.MBTITypeDetails.traitSet;
  const descriptionParagraphs = translation?.MBTITypeDetails.description;

  const handleTypeCardClick = (MBTIType: TMBTIType) => {
    router.push(`/mbti-type/${MBTIType}`);
  };

  // Init translations, restore state from LocalStorage
  useEffect(() => {
    const initData = async () => {
      // Get page translation
      const pageTranslation = await getMBTITypeTranslation(langCode);

      let typeMapTranslation = new Map<TMBTIType, MBTITypeTranslation>();
      let typeDetalsMapTranslation = new Map<
        TMBTIType,
        MBTITypeDetailsTranslation
      >();
      let cognFnsTranslation;

      // Try to restore typeMapTranslation from LocalStorage
      const stateFromLS = getState<MBTITypeStateLS>(MBTI_TYPE_STATE_KEY);
      const isDataFromLS = stateFromLS?.translation.typeMap.length;

      if (isDataFromLS) {
        typeMapTranslation = new Map(stateFromLS.translation.typeMap);
        typeDetalsMapTranslation = new Map(
          stateFromLS.translation.typeDetalsMap
        );
        cognFnsTranslation = stateFromLS.translation.cognitiveFunctions;
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
          translation: {
            page: pageTranslation,
            typeMap: [...typeMapTranslation],
            typeDetalsMap: [...typeDetalsMapTranslation],
            cognitiveFunctions: cognFnsTranslation,
          },
        });
      }

      // Configure translation
      const translation = {
        page: pageTranslation,
        MBTIType: typeMapTranslation.get(
          type as TMBTIType
        ) as MBTITypeTranslation,
        MBTITypeMap: typeMapTranslation,
        MBTITypeDetails: typeDetalsMapTranslation.get(
          type as TMBTIType
        ) as MBTITypeDetailsTranslation,
        cognitiveFunctions: cognFnsTranslation,
      };

      // Get cognitiveFns array for current MBTI type
      const cognitiveFnArr = MBTIMap.get(type)?.cognitiveFns as string[];

      // Get similar types
      const similarTypes = similarTypeMap.get(type as TMBTIType) as TMBTIType[];

      setState((prev) => ({
        ...prev,
        translation,
        cognitiveFnArr,
        similarTypes,
      }));
    };

    initData();
  }, [langCode, type, getState, saveState]);

  if (!translation) return null;

  return (
    <div className="mx-auto w-full base-max-w flex flex-col items-center gap-8 cursor-default">
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

      {/* {similarTypes.length ? (
        <div>
          <div className="px-1 text-xs text-accent-text font-semibold tracking-wide uppercase">
            {translation.page.similarTypesTitle}
          </div>
          <div className="mt-4 flex gap-0.5 p-0.5 rounded-2xl bg-card">
            {similarTypes.map((type) => (
              <MBTITypeCard
                title={translation.MBTITypeMap.get(type)!.title[0]}
                type={type}
                onClick={handleTypeCardClick}
                // isActive={true}
                key={type}
              />
            ))}
          </div>
        </div>
      ) : null} */}

      {/* Similar Types */}
      <div className="my-4">
        <div className="px-1 text-xs text-accent-text font-semibold tracking-wide uppercase">
          {translation.page.similarTypesTitle}
        </div>
        <div className="my-4">
          <MBTITypeTable
            activeItems={similarTypes}
            onClick={handleTypeCardClick}
            MBTITypeMapTranslation={translation.MBTITypeMap}
          />
        </div>
      </div>
    </div>
  );
};

export default MBTIType;
