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
  percentage: number;
  leftSideContent: TraitDichotomyContent;
  rightSideContent: TraitDichotomyContent;
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
      const [firstTraitId, secondTraitId] = traitIds;

      // Get apercentage value
      const firstVal = traitMap.get(firstTraitId) as number;
      const secondVal = traitMap.get(secondTraitId) as number;
      const percentage = Math.max(firstVal, secondVal);

      // Configure text content
      const dichotomyTitle = dichotomyMapTranslation.get(dichotomyId)!;
      const firstTitle = traitMapTranslation.get(firstTraitId)!.title;
      const secondTitle = traitMapTranslation.get(secondTraitId)!.title;
      const firstValGreaterOrEqual = firstVal >= secondVal;

      const leftSideContent: TraitDichotomyContent = {
        text: firstValGreaterOrEqual ? firstTitle : secondTitle,
        isActive: true,
      };
      const rightSideContent: TraitDichotomyContent = {
        text: firstValGreaterOrEqual ? secondTitle : firstTitle,
        isActive: firstVal === secondVal,
      };

      return {
        id: dichotomyId,
        title: dichotomyTitle,
        percentage,
        leftSideContent,
        rightSideContent,
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
            <div className="flex flex-1 text-accent-text">
              {item.leftSideContent.text}
              {item.leftSideContent.isActive ? (
                <span className="pl-2">{item.percentage}%</span>
              ) : null}
            </div>

            {/* Dichotomy Title */}
            <div className="text-muted font-bold opacity-90">{item.id}</div>

            {/* Right Side Content */}
            <div
              className={cn(`flex flex-1 justify-end`, {
                'text-accent-text': item.rightSideContent.isActive,
                'text-muted opacity-40': !item.rightSideContent.isActive,
              })}
            >
              <span className="mr-2">{100 - item.percentage}%</span>
              {item.rightSideContent.text}
            </div>
          </div>

          {/* Percentage Bar */}
          {item.percentage === 50 ? (
            <div className="h-1 flex justify-center rounded-full bg-accent/10">
              <div className="h-1 w-8 rounded-full bg-accent" />
            </div>
          ) : (
            <Progress value={item.percentage} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Traits;
