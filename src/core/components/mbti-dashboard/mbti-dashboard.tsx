'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { LangCode, MBTIDashboardTranslation } from '@/core/types/translation';
import { getMBTIDashboardTranslation } from '@/core/utils/dictionary';
import {
  CognitiveFnCard,
  CognitiveFunctionArr,
  // TraitCard,
} from '@/core/types/mbti';

// // `energy` trait
// import IntroversionIcon from '~/public/icons/mbti/arrows-minimize.svg';
// import ExtraversionIcon from '~/public/icons/mbti/arrows-maximize.svg';
// // `tactics` trait
// import JudgingIcon from '~/public/icons/mbti/list.svg';
// import PerceivingIcon from '~/public/icons/mbti/network.svg';
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

// import MBTITraitCard from '@/core/components/mbti-dashboard/mbti-trait-card';
import MBTICognitiveFunctionCard from '@/core/components/mbti-dashboard/mbti-cognitive-function-card';
import { defaultCognFnCounterMap } from '@/core/utils/mbti';
import MBTIPersonality from '@/core/components/mbti-dashboard/mbti-personality';
import MBTICognitiveFunctions from '@/core/components/mbti-dashboard/mbti-cognitive-functions';
import { Button } from '@/core/components/ui/button';

const cognFnCounterMap = new Map<string, number>([
  ['Te', 0],
  ['Ti', 0],
  ['Fe', 0],
  ['Fi', 0],
  ['Se', 0],
  ['Si', 0],
  ['Ne', 0],
  ['Ni', 0],
]);

type TMBTIDashboardProps = {
  langCode?: LangCode;
};

const MBTIDashboard = ({ langCode }: TMBTIDashboardProps) => {
  const [translation, setTranslation] = useState<MBTIDashboardTranslation>();

  // const [traitCards, setTraitCards] = useState<TraitCard[]>([]);
  const [cognitiveFnCards, setCognitiveFnCards] = useState<CognitiveFnCard[]>(
    []
  );
  const [cognitiveFnArr, setCognitiveFnArr] = useState<CognitiveFunctionArr>(
    []
  );

  const handleCognFnButtonClick = (fnIndex: string): void => {
    const updCognFnCountMap = updateCognFnCounterMap(fnIndex);
    const cognFnArray = createCognFnArray(updCognFnCountMap);
    setCognitiveFnArr(cognFnArray);
  };

  const updateCognFnCounterMap = (fnIndex: string): Map<string, number> => {
    cognFnCounterMap.set(fnIndex, (cognFnCounterMap.get(fnIndex) ?? 0) + 1);
    return cognFnCounterMap;
  };

  // This keeps the same Map object (important because it’s being referenced)
  const resetData = (): void => {
    cognFnCounterMap.clear();
    for (const [key, value] of defaultCognFnCounterMap) {
      cognFnCounterMap.set(key, value);
    }
    setCognitiveFnArr([]);
  };

  /**
   * Converts map entries into an array, filters out zero values,
   * and sorts by count descending.
   * Complexity: O(1) since n = 8.
   */
  const createCognFnArray = (
    map: Map<string, number>
  ): CognitiveFunctionArr => {
    return Array.from(map.entries())
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a);
  };

  // const initTraitCards = (translation: MBTIDashboardTranslation) => {
  //   const data: TraitCard[] = [
  //     {
  //       type: 'energy',
  //       buttons: [
  //         {
  //           title: translation.energyCard.introversion_title,
  //           icon: <IntroversionIcon />,
  //           className: 'bg-slate',
  //         },
  //         {
  //           title: translation.energyCard.extraversion_title,
  //           icon: <ExtraversionIcon />,
  //           className: 'bg-slate',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'tactics',
  //       buttons: [
  //         {
  //           title: translation.tacticsCard.introversion_title,
  //           icon: <JudgingIcon />,
  //           className: 'bg-violet',
  //         },
  //         {
  //           title: translation.tacticsCard.extraversion_title,
  //           icon: <PerceivingIcon />,
  //           className: 'bg-violet',
  //         },
  //       ],
  //     },
  //   ];

  //   setTraitCards(data);
  // };

  const initCognitiveFnCards = (translation: MBTIDashboardTranslation) => {
    const data: CognitiveFnCard[] = [
      // thinking
      {
        title: translation.thinkingCard.title,
        cognitiveFunctions: [
          {
            index: 'Te',
            title: translation.thinkingCard.extraverted_function.title,
            description:
              translation.thinkingCard.extraverted_function.description,
            icon: <ExtravertedThinkingIcon />,
            className: 'bg-sky',
          },
          {
            index: 'Ti',
            title: translation.thinkingCard.introverted_function.title,
            description:
              translation.thinkingCard.introverted_function.description,
            icon: <IntrovertedThinkingIcon />,
            className: 'bg-sky',
          },
        ],
      },
      // feeling
      {
        title: translation.feelingCard.title,
        cognitiveFunctions: [
          {
            index: 'Fe',
            title: translation.feelingCard.extraverted_function.title,
            description:
              translation.feelingCard.extraverted_function.description,
            icon: <ExtravertedFeelingIcon />,
            className: 'bg-rose',
          },
          {
            index: 'Fi',
            title: translation.feelingCard.introverted_function.title,
            description:
              translation.feelingCard.introverted_function.description,
            icon: <IntrovertedFeelingIcon />,
            className: 'bg-rose',
          },
        ],
      },
      // sensing
      {
        title: translation.sensingCard.title,
        cognitiveFunctions: [
          {
            index: 'Se',
            title: translation.sensingCard.extraverted_function.title,
            description:
              translation.sensingCard.extraverted_function.description,
            icon: <ExtravertedSensingIcon />,
            className: 'bg-amber',
          },
          {
            index: 'Si',
            title: translation.sensingCard.introverted_function.title,
            description:
              translation.sensingCard.introverted_function.description,
            icon: <IntrovertedSensingIcon />,
            className: 'bg-amber',
          },
        ],
      },
      // intuition
      {
        title: translation.intuitionCard.title,
        cognitiveFunctions: [
          {
            index: 'Ne',
            title: translation.intuitionCard.extraverted_function.title,
            description:
              translation.intuitionCard.extraverted_function.description,
            icon: <ExtravertedIntuitionIcon />,
            className: 'bg-teal',
          },
          {
            index: 'Ni',
            title: translation.intuitionCard.introverted_function.title,
            description:
              translation.intuitionCard.introverted_function.description,
            icon: <IntrovertedIntuitionIcon />,
            className: 'bg-teal',
          },
        ],
      },
    ];

    setCognitiveFnCards(data);
  };

  // Init data
  useEffect(() => {
    const initData = async () => {
      // Get translations
      const translations = await getMBTIDashboardTranslation(langCode);
      if (!translations) {
        toast(`Unable to get translations`);
        return;
      }
      setTranslation(translations);

      // Init cards
      // initTraitCards(translations);
      initCognitiveFnCards(translations);
    };

    initData();
  }, [langCode]);

  if (!translation) return null;

  return (
    <div className="mbti-dashboard flex flex-1 flex-col justify-between">
      <div className="output">
        <MBTIPersonality cognitiveFnArr={cognitiveFnArr} />
        <MBTICognitiveFunctions
          cognitiveFnArr={cognitiveFnArr}
          translation={translation}
        />
      </div>

      <div className="input">
        <div className="flex justify-center">
          <Button onClick={resetData} variant="secondary">
            Reset
          </Button>
        </div>
        {/* Trait Cards */}
        {/* {traitCards.length ? (
        <div className="row flex gap-1 justify-center">
          {traitCards.map((data) => (
            <MBTITraitCard {...data} key={data.type} />
          ))}
        </div>
      ) : null} */}

        {/* Cognitive Function Cards */}
        {cognitiveFnCards.length ? (
          <div className="my-6 flex flex-wrap items-center justify-center gap-1">
            {cognitiveFnCards.map((data) => (
              <MBTICognitiveFunctionCard
                {...data}
                onClick={handleCognFnButtonClick}
                key={data.title}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MBTIDashboard;
