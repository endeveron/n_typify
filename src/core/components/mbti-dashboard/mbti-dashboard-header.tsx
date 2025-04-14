'use client';

import { useEffect, useState } from 'react';

import {
  CognFunctionArr,
  MBTIPersonalityData,
  MBTIPersonalityType,
  MBTIMapItem,
} from '@/core/types/mbti';
import {
  MBTIDashboardTranslation,
  PersonalityTypeTranslation,
} from '@/core/types/translation';
import {
  getCognFnPattern,
  getMBTITypeByCognFnPattern,
  MBTIMap,
} from '@/core/utils/mbti';

type MBTITypeProps = {
  cognitiveFnArr: CognFunctionArr;
  translation: MBTIDashboardTranslation;
  onMatch: (data: MBTIPersonalityData) => void;
};

const MBTIPersonality = ({
  cognitiveFnArr,
  translation,
  onMatch,
}: MBTITypeProps) => {
  const [MBTIType, setMBTIType] = useState<MBTIPersonalityType | null>(null);
  const [personTypeTranslation, setPersonTypeTranslation] =
    useState<PersonalityTypeTranslation | null>(null);
  const [personality, setPersonality] = useState<MBTIPersonalityData>();

  // Update personality
  useEffect(() => {
    if (cognitiveFnArr.length < 2) {
      setMBTIType(null);
      setPersonTypeTranslation(null);
      return;
    }

    const cognFnPattern = getCognFnPattern(cognitiveFnArr);
    const { type, matchPercent, status } =
      getMBTITypeByCognFnPattern(cognFnPattern);

    if (!type) {
      setMBTIType(null);
      setPersonTypeTranslation(null);
    }

    // Set a new personality type
    if (type && type !== MBTIType) {
      setMBTIType(type);

      // Get translations
      const translationData = translation.personalityTypes.find(
        (item) => item.type === type
      );
      setPersonTypeTranslation(translationData as PersonalityTypeTranslation);

      // Get MBTIMap data
      const mapItem = MBTIMap.get(type) as MBTIMapItem;

      // Configure MBTIPersonalityData
      const personalityItem: MBTIPersonalityData = {
        personalityType: type,
        functions: mapItem.cognitiveFns,
        matchPercent,
        status,
      };

      setPersonality(personalityItem);
      onMatch(personalityItem);
      return;
    }

    // Update the existed personality type
    if (type && type === MBTIType) {
      const personalityItem: MBTIPersonalityData = {
        ...(personality as MBTIPersonalityData),
        matchPercent,
        status,
      };
      onMatch(personalityItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cognitiveFnArr, translation.personalityTypes]);

  return (
    <div className="flex flex-col items-center uppercase cursor-default">
      {MBTIType ? (
        <>
          {/* MBTI Personality Type */}
          <div className="mb-1.5 text-[3.5rem] leading-none text-muted font-bold opacity-50">
            {MBTIType}
          </div>
          {/* Title */}
          <div className="text-accent text-xl font-extrabold tracking-wider">
            {`The ${personTypeTranslation?.title[0]}`}
          </div>
          {/* Subtitle */}
          <div className="mt-0.5 text-muted text-[11px] font-bold tracking-wider opacity-80">
            {personTypeTranslation?.subtitle}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MBTIPersonality;
