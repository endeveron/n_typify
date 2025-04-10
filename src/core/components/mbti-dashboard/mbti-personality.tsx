'use client';

import { CognFunctionArr, MBTIMapItem } from '@/core/types/mbti';
import {
  MBTIDashboardTranslation,
  PersonalityType,
} from '@/core/types/translation';
import {
  getCognFnPattern,
  getMBTITypeByCognFnPattern,
} from '@/core/utils/mbti';
import { useEffect, useState } from 'react';

type MBTITypeProps = {
  cognitiveFnArr: CognFunctionArr;
  translation: MBTIDashboardTranslation;
};

const MBTIPersonality = ({ cognitiveFnArr, translation }: MBTITypeProps) => {
  const [MBTIData, setMBTIData] = useState<MBTIMapItem | null>(null);
  const [personTypeTranslation, setPersonTypeTranslation] =
    useState<PersonalityType | null>(null);

  // Update personality
  useEffect(() => {
    if (cognitiveFnArr.length < 4) {
      setMBTIData(null);
      setPersonTypeTranslation(null);
      return;
    }

    const cognFnPattern = getCognFnPattern(cognitiveFnArr);
    const result = getMBTITypeByCognFnPattern(cognFnPattern);
    if (result.data) {
      setMBTIData(result.data);

      // Get translations
      const translationData = translation.personalityTypes.find(
        (data) => data.type === result.data?.personalityType
      );
      if (translationData) {
        setPersonTypeTranslation(translationData);
      }
    } else {
      setMBTIData(null);
      setPersonTypeTranslation(null);
    }
  }, [cognitiveFnArr, translation.personalityTypes]);

  return (
    <div className="h-28 my-6 flex flex-col items-center uppercase cursor-default">
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
