'use client';

import MBTITypeCard from '@/core/components/mbti-dashboard/mbti-type-card';
import { MBTIType } from '@/core/types/mbti';
import { MBTITypeTranslation } from '@/core/types/translation';
import { MBTITypeTableItems } from '@/core/utils/mbti';

type TMBTITypeTableProps = {
  activeItems: MBTIType[];
  MBTITypeMapTranslation: Map<MBTIType, MBTITypeTranslation>;
  onClick: (type: MBTIType) => void;
};

const MBTITypeTable = ({
  activeItems = [],
  MBTITypeMapTranslation,
  onClick,
}: TMBTITypeTableProps) => {
  return (
    <div className="">
      {[0, 4, 8, 12].map((startIndex, index) => (
        <div
          className="-mt-0.5 flex gap-0.5 p-0.5 rounded-2xl bg-card"
          key={index}
        >
          {MBTITypeTableItems.slice(startIndex, startIndex + 4).map((type) => (
            <MBTITypeCard
              title={MBTITypeMapTranslation.get(type)!.title[0]}
              type={type}
              onClick={onClick}
              isActive={
                activeItems.length ? activeItems.includes(type) : undefined
              }
              key={type}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MBTITypeTable;
