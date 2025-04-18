'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import MBTITypesTableRow from '@/core/components/mbti-types/mbti-types-table-row';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Button } from '@/core/components/ui/button';
import { useLangCode } from '@/core/context/LangContext';
// import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { MBTIType, MBTITypesState } from '@/core/types/mbti';
import {
  MBTITypeMapTranslation,
  PersonalityTypeTranslation,
} from '@/core/types/translation';
import { getMBTITypesTranslation } from '@/core/utils/dictionary';
import { MBTITypeGroupMap, MBTITypeTableItems } from '@/core/utils/mbti';

export const MBTI_TYPES_STATE_KEY = 'mbti_types_state';

// type MBTITypesStateForLS = {
//   activeGroupId: string | null;
//   activeGroupDescription: string | null;
//   activeItems: MBTIType[];
// } | null;

const initialState: MBTITypesState = {
  translation: null,
  typeMapTranslation: null,
  typeGroupMapTranslation: null,
  activeGroupId: null,
  activeGroupDescription: null,
  activeItems: [],
};

const MBTITypes = () => {
  const { langCode } = useLangCode();
  // const [getState, saveState] = useLocalStorage();

  const [state, setState] = useState<MBTITypesState>(initialState);

  const handleCardClick = (type: MBTIType) => {
    console.log('handleCardClick type', type);
  };

  const handleSetGroup = (groupId: string | null, types: MBTIType[]) => {
    // Update local state
    setState((prev) => ({
      ...prev,
      activeItems: types,
      activeGroupId: groupId,
      activeGroupDescription: groupId
        ? prev.typeGroupMapTranslation!.get(groupId)?.description || ''
        : '',
    }));
  };

  // Init translation
  useEffect(() => {
    const initData = async () => {
      // Get translation
      const translation = await getMBTITypesTranslation(langCode);
      if (!translation) {
        toast(`Unable to get localized data`);
        return;
      }

      // Create type translation map
      const typeTranslationArr = translation.personalityTypes;
      const typeMapTranslation = new Map<
        MBTIType,
        PersonalityTypeTranslation
      >();
      for (const t of typeTranslationArr) {
        typeMapTranslation.set(t.type, t);
      }

      const typeGroupMapTranslation = new Map(translation.typeGroupMap);

      // // Check LocalStorage
      // const dataFromLocalStorage =
      //   getState<MBTITypesStateForLS>(MBTI_TYPES_STATE_KEY) || {};

      // Update local state
      setState((prev) => ({
        ...prev,
        translation,
        typeMapTranslation,
        typeGroupMapTranslation,
      }));
    };

    initData();
  }, [langCode]);

  // // Save state in LocalStorage
  // useEffect(() => {
  //   if (
  //     !state.translation ||
  //     !state.typeMapTranslation ||
  //     !state.typeGroupMapTranslation
  //   ) {
  //     return;
  //   }

  //   saveState<MBTITypesStateForLS>(MBTI_TYPES_STATE_KEY, {
  //     activeItems: state.activeItems,
  //     activeGroupId: state.activeGroupId,
  //     activeGroupDescription: state.activeGroupDescription,
  //   });
  // }, [state, saveState]);

  // // Restore state from LocalStorage
  // useEffect(() => {
  //   const stateFromStorage = getState<MBTITypesState>(MBTI_TYPES_STATE_KEY);
  //   console.log('stateFromStorage', stateFromStorage);
  //   // if (stateFromStorage) setState(stateFromStorage);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (
    !state.translation ||
    !state.typeMapTranslation ||
    !state.typeGroupMapTranslation
  )
    return null;

  return (
    <div className="relative max-h-[920px] base-max-w mx-auto flex flex-1 flex-col items-center justify-between">
      {/* Main Title */}

      <div className="min-h-20 max-h-32 flex flex-1 flex-col items-center justify-center">
        {!state.activeGroupDescription ? (
          <AnimatedAppear
            isShown={!state.activeGroupDescription}
            className="text-accent text-xl font-extrabold tracking-wider uppercase"
          >
            {state.translation.mainTitle}
          </AnimatedAppear>
        ) : null}
        <AnimatedAppear
          isShown={!!state.activeGroupDescription}
          className="px-4 text-center text-accent text-sm font-medium tracking-wide"
        >
          {state.activeGroupDescription}
        </AnimatedAppear>
      </div>

      {/* Table Rows */}
      {[0, 4, 8, 12].map((startIndex, index) => (
        <MBTITypesTableRow
          title={state.translation!.tableRowTitles[index]}
          items={MBTITypeTableItems}
          activeItems={state.activeItems}
          firstItemIndex={startIndex}
          lastItemIndex={startIndex + 4}
          typeMapTranslation={
            state.typeMapTranslation as MBTITypeMapTranslation
          }
          onClick={handleCardClick}
          key={startIndex}
        />
      ))}

      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatedAppear className="my-1 flex justify-center flex-wrap gap-1">
          {Array.from(MBTITypeGroupMap.entries()).map(([groupId, types]) => (
            <Button
              onClick={() => handleSetGroup(groupId, types)}
              variant={groupId === state.activeGroupId ? 'accent' : 'secondary'}
              size="sm"
              key={groupId}
            >
              {state.typeGroupMapTranslation
                ?.get(groupId)!
                .title.charAt(0)
                .toUpperCase() + groupId.slice(1)}
            </Button>
          ))}
          <Button
            onClick={() => handleSetGroup(null, [])}
            size="sm"
            variant="outline"
            key="reset"
          >
            {state.translation.resetBtnTitle}
          </Button>
        </AnimatedAppear>
      </div>
    </div>
  );
};

export default MBTITypes;
