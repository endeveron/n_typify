'use client';
import { useEffect, useState } from 'react';

import MBTICognitiveFunctionButton from '@/core/components/mbti-dashboard/mbti-cognitive-function-button';
import {
  CognitiveFunction,
  CognitiveFunctionArr,
  CognitiveFunctionButton,
} from '@/core/types/mbti';
import { MBTIDashboardTranslation } from '@/core/types/translation';

// `thinking` cognitive functions
import ExtravertedThinkingIcon from '~/public/icons/mbti/gear.svg';
import IntrovertedThinkingIcon from '~/public/icons/mbti/graph.svg';
// `feeling` cognitive functions
import ExtravertedFeelingIcon from '~/public/icons/mbti/heart.svg';
import IntrovertedFeelingIcon from '~/public/icons/mbti/theater.svg';
// `sensing` cognitive functions
import ExtravertedSensingIcon from '~/public/icons/mbti/bolt.svg';
import IntrovertedSensingIcon from '~/public/icons/mbti/home.svg';
// `intuition` cognitive functions
import ExtravertedIntuitionIcon from '~/public/icons/mbti/clock.svg';
import IntrovertedIntuitionIcon from '~/public/icons/mbti/squares.svg';

type MBTICognitiveFunctionsProps = {
  cognitiveFnArr: CognitiveFunctionArr;
  translation: MBTIDashboardTranslation;
};

const MBTICognitiveFunctions = ({
  cognitiveFnArr,
  translation,
}: MBTICognitiveFunctionsProps) => {
  const [cognFnButtonMap, setCognFnButtonMap] =
    useState<Map<string, CognitiveFunction>>();
  const [cognFnButtons, setCognFnButtons] = useState<CognitiveFunctionButton[]>(
    []
  );

  const handleButtonClick = (fnIndex: string) => {
    console.log('fnIndex', fnIndex);
  };

  useEffect(() => {
    if (!cognFnButtonMap) return;

    // Add `counter` prop to cognFnButtonMap items
    const buttons = [];
    for (const [fnIndex, counter] of cognitiveFnArr) {
      const cognFnButtonMapData = cognFnButtonMap.get(
        fnIndex
      ) as CognitiveFunctionButton;
      buttons.push({ ...cognFnButtonMapData, counter });
    }

    setCognFnButtons(buttons);
  }, [cognFnButtonMap, cognitiveFnArr]);

  // Init buttons map with translations
  useEffect(() => {
    const map = new Map<string, CognitiveFunction>([
      [
        'Te',
        {
          index: 'Te',
          title: translation.thinkingCard.extraverted_function.title,
          description:
            translation.thinkingCard.extraverted_function.description,
          icon: <ExtravertedThinkingIcon />,
          className: 'bg-sky',
        },
      ],
      [
        'Ti',
        {
          index: 'Ti',
          title: translation.thinkingCard.introverted_function.title,
          description:
            translation.thinkingCard.introverted_function.description,
          icon: <IntrovertedThinkingIcon />,
          className: 'bg-sky',
        },
      ],
      [
        'Fe',
        {
          index: 'Fe',
          title: translation.feelingCard.extraverted_function.title,
          description: translation.feelingCard.extraverted_function.description,
          icon: <ExtravertedFeelingIcon />,
          className: 'bg-rose',
        },
      ],
      [
        'Fi',
        {
          index: 'Fi',
          title: translation.feelingCard.introverted_function.title,
          description: translation.feelingCard.introverted_function.description,
          icon: <IntrovertedFeelingIcon />,
          className: 'bg-rose',
        },
      ],
      [
        'Se',
        {
          index: 'Se',
          title: translation.sensingCard.extraverted_function.title,
          description: translation.sensingCard.extraverted_function.description,
          icon: <ExtravertedSensingIcon />,
          className: 'bg-amber',
        },
      ],
      [
        'Si',
        {
          index: 'Si',
          title: translation.sensingCard.introverted_function.title,
          description: translation.sensingCard.introverted_function.description,
          icon: <IntrovertedSensingIcon />,
          className: 'bg-amber',
        },
      ],
      [
        'Ne',
        {
          index: 'Ne',
          title: translation.intuitionCard.extraverted_function.title,
          description:
            translation.intuitionCard.extraverted_function.description,
          icon: <ExtravertedIntuitionIcon />,
          className: 'bg-teal',
        },
      ],
      [
        'Ni',
        {
          index: 'Ni',
          title: translation.intuitionCard.introverted_function.title,
          description:
            translation.intuitionCard.introverted_function.description,
          icon: <IntrovertedIntuitionIcon />,
          className: 'bg-teal',
        },
      ],
    ]);
    setCognFnButtonMap(map);
  }, [translation]);

  return (
    <div className="my-8 flex flex-wrap justify-center gap-2">
      {cognFnButtons.map((data) => (
        <MBTICognitiveFunctionButton
          {...data}
          onClick={() => handleButtonClick(data.index)}
          key={data.index}
        />
      ))}
    </div>
  );
};

export default MBTICognitiveFunctions;
