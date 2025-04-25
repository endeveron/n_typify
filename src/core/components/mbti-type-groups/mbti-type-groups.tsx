'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import MBTITypesTableRow from '@/core/components/mbti-type-groups/mbti-type-group-table-row';
import SelectTypeGroup from '@/core/components/mbti-type-groups/select-type-group';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Button } from '@/core/components/ui/button';
import { MBTI_TYPES_STATE_KEY } from '@/core/constants';
import { useLangCode } from '@/core/context/LangContext';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { MBTIType, MBTITypesState } from '@/core/types/mbti';
import {
  MBTITypeGroupMapTranslation,
  MBTITypeMapTranslation,
  MBTITypeTranslation,
} from '@/core/types/translation';
import {
  getMBTITypeGroupsTranslation,
  getMBTITypesTranslation,
} from '@/core/utils/dictionary';
import { MBTITypeGroupMap, MBTITypeTableItems } from '@/core/utils/mbti';
import { useRouter } from 'next/navigation';

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

const MBTITypeGroups = () => {
  const { langCode } = useLangCode();
  const router = useRouter();
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
    translation && typeMapTranslation && typeGroupMapTranslation;

  const handleCardClick = (type: MBTIType) => {
    router.push(`/mbti-type/${type}`);
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
      // Get page translation
      const translation = await getMBTITypeGroupsTranslation(langCode);
      // Get MBTI types translation
      const MBTITypeTranslation = await getMBTITypesTranslation(langCode);
      if (!translation || !MBTITypeTranslation) {
        toast(`Unable to load localized data`);
        return;
      }

      // Create the map of types
      const typeMapTranslation = new Map<MBTIType, MBTITypeTranslation>();
      for (const t of MBTITypeTranslation) {
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
    <div className="relative max-h-[920px] mx-auto w-full base-max-w flex flex-1 flex-col items-center justify-between">
      {/* Title */}
      <div className="min-h-32 max-h-40 flex flex-1 flex-col items-center justify-center cursor-default select-none">
        {!activeGroupDescription ? (
          <AnimatedAppear
            isShown={!activeGroupDescription}
            className="text-xl font-extrabold text-accent tracking-wide uppercase"
          >
            {translation!.mainTitle}
          </AnimatedAppear>
        ) : null}
        <AnimatedAppear
          isShown={!!activeGroupDescription}
          className="px-4 text-center text-accent-text font-medium"
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
      <AnimatedAppear className="my-4 flex flex-1 items-center gap-4">
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
          className={activeGroupId ? '' : 'opacity-0 pointer-events-none'}
        >
          {translation!.resetBtnTitle}
        </Button>
      </AnimatedAppear>
    </div>
  );
};

export default MBTITypeGroups;
