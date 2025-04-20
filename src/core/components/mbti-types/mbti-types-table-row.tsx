'use client';

import MBTITypeCard from '@/core/components/mbti-dashboard/mbti-type-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { MBTIType } from '@/core/types/mbti';
import { MBTITypeMapTranslation } from '@/core/types/translation';
import { MBTITypeTableItems } from '@/core/utils/mbti';

type MBTITypesTableRowProps = {
  title: string;
  firstItemIndex: number;
  lastItemIndex: number;
  items: MBTIType[];
  activeItems: MBTIType[];
  typeMapTranslation: MBTITypeMapTranslation;
  onClick: (type: MBTIType) => void;
};

const MBTITypesTableRow = ({
  title,
  firstItemIndex,
  lastItemIndex,
  items,
  activeItems,
  typeMapTranslation,
  onClick,
}: MBTITypesTableRowProps) => {
  if (!items.length) return null;

  return (
    <AnimatedAppear isShown={!!items.length} className="">
      <div className="mb-2 text-center text-xs text-[10px] leading-none uppercase font-bold text-muted tracking-wide opacity-60 cursor-default select-none">
        {title}
      </div>
      <div className="flex gap-1 p-1 rounded-2xl bg-card">
        {MBTITypeTableItems.slice(firstItemIndex, lastItemIndex).map((type) => (
          <MBTITypeCard
            title={typeMapTranslation.get(type)!.title[0]}
            type={type}
            onClick={onClick}
            isActive={
              activeItems.length ? activeItems.includes(type) : undefined
            }
            key={type}
          />
        ))}
      </div>
    </AnimatedAppear>
  );
};

export default MBTITypesTableRow;
