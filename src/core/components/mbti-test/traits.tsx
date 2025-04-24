'use client';

import { useCallback, useEffect, useState } from 'react';

import { Progress } from '@/core/components/ui/progress';
import { TraitIndex, TraitMap } from '@/core/types/mbti';
import {
  MBTITraitMapItem,
  MBTITraitsTranslation,
} from '@/core/types/translation';
import { cn } from '@/core/utils/common';
import { MBTIDichotomyMap } from '@/core/utils/mbti';

type TraitsProps = {
  traitMap: TraitMap;
  translation: MBTITraitsTranslation;
};

type TraitDichotomyContent = { text: string; isActive: boolean };

type TraitDichotomy = {
  id: string;
  title: string;
  percent: number;
  leftSideContent: TraitDichotomyContent;
  rightSideContent: TraitDichotomyContent;
  isReversed: boolean;
};

const Traits = ({ traitMap, translation }: TraitsProps) => {
  const [traits, setTraits] = useState<TraitDichotomy[]>([]);

  const configureTraitDichotomy = useCallback(
    ({
      dichotomyId,
      traitIds,
      traitMap,
      traitMapTranslation,
      dichotomyMapTranslation,
    }: {
      dichotomyId: string;
      traitIds: TraitIndex[];
      traitMap: TraitMap;
      traitMapTranslation: Map<string, MBTITraitMapItem>;
      dichotomyMapTranslation: Map<string, string>;
    }): TraitDichotomy => {
      const firstTraitId = traitIds[0];
      const secondTraitId = traitIds[1];
      const firstVal = traitMap.get(firstTraitId) as number;
      const secondVal = traitMap.get(secondTraitId) as number;
      const percent = Math.max(firstVal, secondVal);
      const isReversed = secondVal > firstVal;

      const firstTitle = (
        traitMapTranslation.get(firstTraitId) as MBTITraitMapItem
      ).title;
      const secondTitle = (
        traitMapTranslation.get(secondTraitId) as MBTITraitMapItem
      ).title;

      const leftSideContent: TraitDichotomyContent = {
        text: firstTitle,
        isActive: firstVal >= secondVal,
      };
      const rightSideContent: TraitDichotomyContent = {
        text: secondTitle,
        isActive: secondVal >= firstVal,
      };

      return {
        id: dichotomyId,
        title: dichotomyMapTranslation.get(dichotomyId) as string,
        percent,
        leftSideContent,
        rightSideContent,
        isReversed,
      };
    },
    []
  );

  useEffect(() => {
    const traitMapTranslation = new Map<string, MBTITraitMapItem>(
      translation.traitMap
    );
    const dichotomyMapTranslation = new Map<string, string>(
      translation.dichotomyMap
    );

    const dichotomies: TraitDichotomy[] = [];
    MBTIDichotomyMap.forEach((item, dichotomyId) => {
      const dichotomy = configureTraitDichotomy({
        dichotomyId,
        traitIds: item.traitIds,
        traitMap,
        dichotomyMapTranslation,
        traitMapTranslation,
      });
      dichotomies.push(dichotomy);
    });

    setTraits(dichotomies);
  }, [
    configureTraitDichotomy,
    traitMap,
    translation.dichotomyMap,
    translation.traitMap,
  ]);

  return (
    <div className="flex flex-1 flex-col items-stretch gap-6">
      {traits.map((item) => (
        <div className="" key={item.id}>
          {/* Text Content */}
          <div
            className={cn(
              `my-2 flex items-center justify-between text-xs font-medium tracking-wide uppercase`
            )}
          >
            {/* Left Side Content */}
            <div
              className={cn(`w-1/3`, {
                'text-accent-text': item.leftSideContent.isActive,
                'text-muted opacity-40': !item.leftSideContent.isActive,
              })}
            >
              {item.leftSideContent.text}
              {item.leftSideContent.isActive ? (
                <span className="pl-2">{item.percent}%</span>
              ) : null}
            </div>

            {/* Dichotomy Title */}
            <div className="w-1/3 text-center text-muted font-bold opacity-90">
              {item.id}
            </div>

            {/* Right Side Content */}
            <div
              className={cn(`w-1/3 text-right`, {
                'text-accent-text': item.rightSideContent.isActive,
                'text-muted opacity-40': !item.rightSideContent.isActive,
              })}
            >
              {item.rightSideContent.text}
              {item.rightSideContent.isActive ? (
                <span className="pl-2">{item.percent}%</span>
              ) : null}
            </div>
          </div>

          {/* Percentage Bar */}
          {item.percent === 50 ? (
            <div className="h-1 flex justify-center rounded-full bg-accent/10">
              <div className="h-1 w-8 rounded-full bg-accent" />
            </div>
          ) : (
            <div
              className={cn(``, {
                'scale-x-[-1]': item.isReversed,
              })}
            >
              <Progress value={item.percent} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Traits;
