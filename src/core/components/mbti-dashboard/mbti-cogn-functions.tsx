'use client';
import { useEffect, useState } from 'react';

import { CognFunction, CognFunctionArr } from '@/core/types/mbti';
import {
  MBTICognitiveFnTranslation,
  MBTIDashboardTranslation,
} from '@/core/types/translation';
import MBTICognFunction from '@/core/components/mbti-dashboard/mbti-cogn-function';

type MBTICognFunctionsProps = {
  cognitiveFnArr: CognFunctionArr;
  translation: MBTIDashboardTranslation;
};

const MBTICognFunctions = ({
  cognitiveFnArr,
  translation,
}: MBTICognFunctionsProps) => {
  const [cognitiveFnNameStack, setCognitiveFnNameStack] = useState<string[]>();
  const [cognitiveFnMap, setCognitiveFnMap] =
    useState<Map<string, MBTICognitiveFnTranslation>>();
  const [cognFnItems, setCognFnItems] = useState<CognFunction[]>();

  // console.log('cognitiveFnArr', cognitiveFnArr);

  const handleItemClick = (id: string) => {
    console.log('id', id);
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
    console.log('map', [...map]);
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

  // const handleButtonClick = (id: string) => {
  //   console.log('id', id);
  // };

  // useEffect(() => {
  //   if (!cognFnButtonMap) return;

  //   // Add `counter` prop to cognFnButtonMap items
  //   const buttons = [];
  //   for (const [id, counter] of cognitiveFnArr) {
  //     const cognFnButtonMapData = cognFnButtonMap.get(
  //       id
  //     ) as CognFunctionButton;
  //     buttons.push({ ...cognFnButtonMapData, counter });
  //   }

  //   setCognFnButtons(buttons);
  // }, [cognFnButtonMap, cognitiveFnArr]);

  // Init buttons map with translations
  useEffect(() => {
    // const map = new Map<string, CognitiveFnCardItem>([
    //   [
    //     'Te',
    //     {
    //       id: 'Te',
    //       title: translation.thinkingCard.extraverted_function.title,
    //       description:
    //         translation.thinkingCard.extraverted_function.description,
    //       icon: <ExtravertedThinkingIcon />,
    //       className: 'bg-sky',
    //     },
    //   ],
    //   [
    //     'Ti',
    //     {
    //       id: 'Ti',
    //       title: translation.thinkingCard.introverted_function.title,
    //       description:
    //         translation.thinkingCard.introverted_function.description,
    //       icon: <IntrovertedThinkingIcon />,
    //       className: 'bg-sky',
    //     },
    //   ],
    //   [
    //     'Fe',
    //     {
    //       id: 'Fe',
    //       title: translation.feelingCard.extraverted_function.title,
    //       description: translation.feelingCard.extraverted_function.description,
    //       icon: <ExtravertedFeelingIcon />,
    //       className: 'bg-rose',
    //     },
    //   ],
    //   [
    //     'Fi',
    //     {
    //       id: 'Fi',
    //       title: translation.feelingCard.introverted_function.title,
    //       description: translation.feelingCard.introverted_function.description,
    //       icon: <IntrovertedFeelingIcon />,
    //       className: 'bg-rose',
    //     },
    //   ],
    //   [
    //     'Se',
    //     {
    //       idSe',
    //       title: translation.sensingCard.extraverted_function.title,
    //       description: translation.sensingCard.extraverted_function.description,
    //       icon: <ExtravertedSensingIcon />,
    //       className: 'bg-amber',
    //     },
    //   ],
    //   [
    //     'Si',
    //     {
    //       id: 'Si',
    //       title: translation.sensingCard.introverted_function.title,
    //       description: translation.sensingCard.introverted_function.description,
    //       icon: <IntrovertedSensingIcon />,
    //       className: 'bg-amber',
    //     },
    //   ],
    //   [
    //     'Ne',
    //     {
    //       id: 'Ne',
    //       title: translation.intuitionCard.extraverted_function.title,
    //       description:
    //         translation.intuitionCard.extraverted_function.description,
    //       icon: <ExtravertedIntuitionIcon />,
    //       className: 'bg-teal',
    //     },
    //   ],
    //   [
    //     'Ni',
    //     {
    //       id: 'Ni',
    //       title: translation.intuitionCard.introverted_function.title,
    //       description:
    //         translation.intuitionCard.introverted_function.description,
    //       icon: <IntrovertedIntuitionIcon />,
    //       className: 'bg-teal',
    //     },
    //   ],
    // ]);
    // setCognFnButtonMap(map);
  }, [translation]);

  return (
    <div className="my-6 flex justify-center">
      {cognFnItems ? (
        <div>
          <div className="flex flex-col gap-1">
            {cognFnItems.slice(0, 4).map((data) => (
              <MBTICognFunction
                {...data}
                onClick={() => handleItemClick(data.id)}
                key={data.id}
              />
            ))}
          </div>

          {cognFnItems.length > 4 ? (
            <div className="mt-3 flex flex-col gap-1 opacity-60">
              {cognFnItems.slice(4).map((data) => (
                <MBTICognFunction
                  {...data}
                  onClick={() => handleItemClick(data.id)}
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
