'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import MBTITypesTableRow from '@/core/components/mbti-types/mbti-types-table-row';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Button } from '@/core/components/ui/button';
import { useLangCode } from '@/core/context/LangContext';
// import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { MBTIType, MBTITypesState } from '@/core/types/mbti';
import {
  MBTITypeGroupMapTranslation,
  MBTITypeMapTranslation,
  PersonalityTypeTranslation,
} from '@/core/types/translation';
import { getMBTITypesTranslation } from '@/core/utils/dictionary';
import { MBTITypeGroupMap, MBTITypeTableItems } from '@/core/utils/mbti';
import SelectTypeGroup from '@/core/components/mbti-types/select-type-group';

export const MBTI_TYPES_STATE_KEY = 'mbti_types_state';

type MBTITypesStateForLS = {
  activeGroupId: string | null;
  activeGroupDescription: string | null;
  activeItems: MBTIType[];
} | null;

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
  const [getState, saveState] = useLocalStorage();

  const [state, setState] = useState<MBTITypesState>(initialState);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const {
    activeGroupDescription,
    activeGroupId,
    activeItems,
    translation,
    typeGroupMapTranslation,
    typeMapTranslation,
  } = state;

  const isTranslationsReady =
    translation && state.typeMapTranslation && state.typeGroupMapTranslation;

  const handleCardClick = (type: MBTIType) => {
    console.log('handleCardClick type', type);
  };

  const handleSetGroup = useCallback(
    (groupId: string | null, types: MBTIType[]) => {
      if (!hasUserInteracted) setHasUserInteracted(true);

      setState((prev) => ({
        ...prev,
        activeItems: types,
        activeGroupId: groupId,
        activeGroupDescription: groupId
          ? prev.typeGroupMapTranslation!.get(groupId)?.description || ''
          : '',
      }));
    },
    [hasUserInteracted]
  );

  // Init translations, restore state from LocalStorage
  useEffect(() => {
    const initData = async () => {
      const translation = await getMBTITypesTranslation(langCode);
      if (!translation) {
        toast(`Unable to get localized data`);
        return;
      }

      // Create the map of types
      const typeTranslationArr = translation.personalityTypes;
      const typeMapTranslation = new Map<
        MBTIType,
        PersonalityTypeTranslation
      >();
      for (const t of typeTranslationArr) {
        typeMapTranslation.set(t.type, t);
      }

      // Create the type group map
      const typeGroupMapTranslation = new Map(translation.typeGroupMap);

      // Try to restore state from LocalStorage
      const stateFromStorage =
        getState<MBTITypesStateForLS>(MBTI_TYPES_STATE_KEY) ?? {};

      setState((prev) => ({
        ...prev,
        ...stateFromStorage,
        translation,
        typeMapTranslation,
        typeGroupMapTranslation,
      }));
    };

    initData();
  }, [getState, langCode]);

  // Save state to LocalStorage when it changes
  useEffect(() => {
    if (!hasUserInteracted) return;

    saveState<MBTITypesStateForLS>(MBTI_TYPES_STATE_KEY, {
      activeItems,
      activeGroupId,
      activeGroupDescription,
    });
  }, [
    hasUserInteracted,
    activeItems,
    activeGroupId,
    activeGroupDescription,
    saveState,
  ]);

  if (!isTranslationsReady) return null;

  return (
    <div className="relative max-h-[920px] base-max-w mx-auto flex flex-1 flex-col items-center justify-between">
      {/* Title */}
      <div className="min-h-32 max-h-40 flex flex-1 flex-col items-center justify-center">
        {!activeGroupDescription ? (
          <AnimatedAppear
            isShown={!activeGroupDescription}
            className="text-accent text-xl font-extrabold tracking-wider uppercase cursor-default select-none"
          >
            {translation!.mainTitle}
          </AnimatedAppear>
        ) : null}
        <AnimatedAppear
          isShown={!!activeGroupDescription}
          className="px-4 text-center text-accent-text text-sm font-medium"
        >
          {activeGroupDescription}
        </AnimatedAppear>
      </div>

      {/* Table */}
      <div className="flex flex-1 flex-col gap-4">
        {[0, 4, 8, 12].map((startIndex, index) => (
          <MBTITypesTableRow
            title={translation!.tableRowTitles[index]}
            items={MBTITypeTableItems}
            activeItems={activeItems}
            firstItemIndex={startIndex}
            lastItemIndex={startIndex + 4}
            typeMapTranslation={typeMapTranslation as MBTITypeMapTranslation}
            onClick={handleCardClick}
            key={startIndex}
          />
        ))}
      </div>

      {/* Select Group */}
      <AnimatedAppear className="my-4 flex flex-1 items-center justify-center gap-4">
        <SelectTypeGroup
          activeGroupId={activeGroupId}
          typeGroupMap={MBTITypeGroupMap}
          typeGroupMapTranslation={
            typeGroupMapTranslation as MBTITypeGroupMapTranslation
          }
          onSelect={handleSetGroup}
        />
        <Button
          onClick={() => handleSetGroup(null, [])}
          variant="outline"
          key="reset"
          className={activeGroupId ? '' : 'opacity-40 pointer-events-none'}
        >
          {translation!.resetBtnTitle}
        </Button>
      </AnimatedAppear>
    </div>
  );
};

export default MBTITypes;
