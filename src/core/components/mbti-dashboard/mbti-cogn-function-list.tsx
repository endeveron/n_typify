'use client';
import { useEffect, useState } from 'react';

import MBTICognFunction from '@/core/components/mbti-dashboard/mbti-cogn-function';
import {
  CognFunction,
  CognFunctionArr,
  CognitiveFnId,
} from '@/core/types/mbti';
import {
  MBTICognitiveFnTranslation,
  MBTIDashboardTranslation,
} from '@/core/types/translation';

type MBTICognFunctionsProps = {
  cognitiveFnArr: CognFunctionArr;
  translation: MBTIDashboardTranslation;
  onFunctionClick: (functionId: CognitiveFnId) => void;
};

const MBTICognFunctions = ({
  cognitiveFnArr,
  translation,
  onFunctionClick,
}: MBTICognFunctionsProps) => {
  const [cognitiveFnNameStack, setCognitiveFnNameStack] = useState<string[]>();
  const [cognitiveFnMap, setCognitiveFnMap] =
    useState<Map<string, MBTICognitiveFnTranslation>>();
  const [cognFnItems, setCognFnItems] = useState<CognFunction[]>();

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

    const items: CognFunction[] = cognitiveFnArr.map(
      ([id, counter], index) => ({
        id,
        title: cognitiveFnNameStack[index],
        description: cognitiveFnMap.get(id)?.description || '',
        counter,
      })
    );
    setCognFnItems(items);
  }, [cognitiveFnArr, cognitiveFnMap, cognitiveFnNameStack]);

  return (
    <div className="flex justify-center">
      {cognFnItems ? (
        <div>
          <div className="flex flex-col gap-1">
            {cognFnItems.slice(0, 4).map((data) => (
              <MBTICognFunction
                {...data}
                onClick={() => onFunctionClick(data.id as CognitiveFnId)}
                key={data.id}
              />
            ))}
          </div>

          {cognFnItems.length > 4 ? (
            <div className="mt-3 flex flex-col gap-1 opacity-50">
              {cognFnItems.slice(4).map((data) => (
                <MBTICognFunction
                  {...data}
                  onClick={() => handleItemClick(data.id as CognitiveFnId)}
                  isShadow={true}
                  key={data.id}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MBTICognFunctions;
