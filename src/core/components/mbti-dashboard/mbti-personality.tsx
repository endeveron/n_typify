'use client';

import { CognitiveFunctionArr, MBTIMapItem } from '@/core/types/mbti';
import {
  getCognFnPattern,
  getMBTITypeByCognFnPattern,
} from '@/core/utils/mbti';
import { useEffect, useState } from 'react';

type MBTITypeProps = {
  cognitiveFnArr: CognitiveFunctionArr;
};

const MBTIPersonality = ({ cognitiveFnArr }: MBTITypeProps) => {
  const [data, setData] = useState<MBTIMapItem | null>(null);

  // Move

  // Update personality
  useEffect(() => {
    if (cognitiveFnArr.length < 4) return;

    const cognFnPattern = getCognFnPattern(cognitiveFnArr);
    console.log('cognFnPattern', cognFnPattern);

    const result = getMBTITypeByCognFnPattern(cognFnPattern);
    if (result.data) {
      setData(result.data);
    } else {
      setData(null);
    }
  }, [cognitiveFnArr, cognitiveFnArr.length]);

  return (
    <div className="h-20 my-8 flex flex-col items-center justify-between">
      {data ? (
        <>
          {/* Title */}
          <div className="text-5xl font-semibold cursor-default">
            {data.personality.type}
          </div>
          {/* Name */}
          <div className="text-muted font-semibold cursor-default">
            {data.personality.name}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MBTIPersonality;
