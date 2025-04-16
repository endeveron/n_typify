'use client';
import { useEffect, useState } from 'react';

import CognFunction from '@/core/components/mbti-dashboard/cogn-function';
import {
  CognFunction as TCognFunction,
  CognFunctionArr,
  CognitiveFnId,
} from '@/core/types/mbti';
import {
  MBTICognitiveFnTranslation,
  MBTIDashboardTranslation,
} from '@/core/types/translation';
import AnimatedAppear from '@/core/components/shared/animated-appear';

type CognFunctionsProps = {
  cognitiveFnArr: CognFunctionArr;
  translation: MBTIDashboardTranslation;
  onFunctionClick: (functionId: CognitiveFnId) => void;
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

  const handleItemClick = (functionId: CognitiveFnId) => {
    onFunctionClick(functionId);
  };

  // Init cognitive function name stack translations
  useEffect(() => {
    setCognitiveFnNameStack(translation.cognitiveFnStack);
  }, [translation.cognitiveFnStack]);

  // Init cognitive function data map translations
  useEffect(() => {
    // Convert `translation.cognitiveFunctions` object into a Map
    const map = new Map<string, MBTICognitiveFnTranslation>(
      Object.entries(translation.cognitiveFunctions)
    );
    setCognitiveFnMap(map);
  }, [translation.cognitiveFunctions]);

  // Update cognitive function items
  useEffect(() => {
    if (!cognitiveFnNameStack || !cognitiveFnMap) return;

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
              onClick={() => onFunctionClick(data.id as CognitiveFnId)}
              key={data.id}
              index={index}
            />
          ))}
        </div>

        {cognFnItems.length > 4 ? (
          <div className="mt-3 flex flex-col gap-1 opacity-50">
            {cognFnItems.slice(4).map((data) => (
              <CognFunction
                {...data}
                onClick={() => handleItemClick(data.id as CognitiveFnId)}
                isShadow={true}
                key={data.id}
              />
            ))}
          </div>
        ) : null}
      </div>
    </AnimatedAppear>
  );
};

export default CognFunctions;
