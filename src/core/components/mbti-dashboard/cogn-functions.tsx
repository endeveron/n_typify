'use client';
import { useEffect, useState } from 'react';

import CognFunction from '@/core/components/mbti-dashboard/cogn-function';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import {
  CognFunctionArr,
  CognitiveFnId,
  CognFunction as TCognFunction,
} from '@/core/types/mbti';
import {
  CognitiveFunctionsTranslation,
  MBTICognitiveFnTranslation,
} from '@/core/types/translation';

type CognFunctionsProps = {
  cognitiveFnArr: CognFunctionArr;
  translation: CognitiveFunctionsTranslation;
  onFunctionClick?: (functionId: CognitiveFnId) => void;
};

const CognFunctions = ({
  cognitiveFnArr,
  translation,
  onFunctionClick,
}: CognFunctionsProps) => {
  const [cognitiveFnNameStack, setCognitiveFnNameStack] = useState<string[]>();
  const [cognitiveFnMap, setCognitiveFnMap] =
    useState<Map<string, MBTICognitiveFnTranslation>>();
  const [cognFnItems, setCognFnItems] = useState<TCognFunction[]>();

  const translMap = translation?.map;
  const translStack = translation?.stack;
  const isClickAllowed = typeof onFunctionClick === 'function';

  const handleItemClick = (functionId: CognitiveFnId) => {
    if (isClickAllowed) onFunctionClick(functionId);
  };

  // Init cognitive function name stack translations
  useEffect(() => {
    if (!translStack) return;

    setCognitiveFnNameStack(translStack);
  }, [translStack]);

  // Init cognitive function data map translations
  useEffect(() => {
    if (!translMap) return;

    // Convert `translation.cognitiveFunctions` object into a Map
    const map = new Map<string, MBTICognitiveFnTranslation>(
      Object.entries(translMap)
    );
    setCognitiveFnMap(map);
  }, [translMap]);

  // Update cognitive function items
  useEffect(() => {
    if (!cognitiveFnArr.length || !cognitiveFnNameStack || !cognitiveFnMap)
      return;

    const items: TCognFunction[] = cognitiveFnArr.map(
      ([id, counter], index) => ({
        id,
        title: cognitiveFnNameStack[index],
        description: cognitiveFnMap.get(id)?.description || '',
        counter,
      })
    );
    setCognFnItems(items);
  }, [cognitiveFnArr, cognitiveFnMap, cognitiveFnNameStack]);

  if (!cognFnItems) return null;

  return (
    <AnimatedAppear
      isShown={!!cognitiveFnArr.length}
      className="flex justify-center"
    >
      <div>
        <div className="flex flex-col gap-1">
          {cognFnItems.slice(0, 4).map((data, index) => (
            <CognFunction
              {...data}
              onClick={() => handleItemClick(data.id as CognitiveFnId)}
              isClickable={isClickAllowed}
              key={data.id}
              index={index}
            />
          ))}
        </div>

        {cognFnItems.length > 4 ? (
          <div className="mt-3 flex flex-col gap-1 opacity-80">
            {cognFnItems.slice(4).map((data, index) => (
              <CognFunction
                {...data}
                onClick={() => handleItemClick(data.id as CognitiveFnId)}
                isClickable={isClickAllowed}
                isShadow={true}
                key={data.id}
                index={index}
              />
            ))}
          </div>
        ) : null}
      </div>
    </AnimatedAppear>
  );
};

export default CognFunctions;
