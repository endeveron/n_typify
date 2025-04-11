'use client';

import { useEffect, useState } from 'react';

import {
  CognFunctionArr,
  MBTIMapItem,
  MBTIPersonalityData,
} from '@/core/types/mbti';
import {
  MBTIDashboardTranslation,
  PersonalityTypeTranslation,
} from '@/core/types/translation';
import {
  getCognFnPattern,
  getMBTITypeByCognFnPattern,
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
  const [MBTIData, setMBTIData] = useState<MBTIMapItem | null>(null);
  const [personTypeTranslation, setPersonTypeTranslation] =
    useState<PersonalityTypeTranslation | null>(null);

  // Update personality
  useEffect(() => {
    if (cognitiveFnArr.length < 4) {
      setMBTIData(null);
      setPersonTypeTranslation(null);
      return;
    }

    const cognFnPattern = getCognFnPattern(cognitiveFnArr);
    const { data, status } = getMBTITypeByCognFnPattern(cognFnPattern);
    if (data) {
      setMBTIData(data);

      // Get translations
      const translationData = translation.personalityTypes.find(
        (item) => item.type === data?.personalityType
      );
      if (translationData) {
        setPersonTypeTranslation(translationData);

        // Configure MBTIPersonalityData
        const personalityItem: MBTIPersonalityData = {
          ...data,
          status,
        };
        onMatch(personalityItem);
      }
    } else {
      setMBTIData(null);
      setPersonTypeTranslation(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cognitiveFnArr, translation.personalityTypes]);

  return (
    <div className="h-28 my-4 flex flex-col items-center uppercase cursor-default">
      {MBTIData ? (
        <>
          {/* MBTI Personality Type */}
          <div className="mb-1.5 text-[3.5rem] leading-none text-muted font-bold opacity-40">
            {MBTIData.personalityType}
          </div>
          {/* Title */}
          <div className="text-accent text-xl font-bold tracking-wider">
            {personTypeTranslation?.title}
          </div>
          {/* Subtitle */}
          <div className="mt-0.5 text-muted text-[11px] font-medium tracking-wide opacity-60">
            {personTypeTranslation?.subtitle}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MBTIPersonality;
