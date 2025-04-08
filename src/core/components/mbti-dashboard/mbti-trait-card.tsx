'use client';

import MBTICardButton from '@/core/components/mbti-dashboard/mbti-card-button';
import { TraitCard } from '@/core/types/mbti';

type MBTITraitCardProps = TraitCard & {};

const MBTITraitCard = ({ buttons }: MBTITraitCardProps) => {
  return (
    <div className="flex px-3 py-4 gap-4 bg-card rounded-4xl">
      {buttons.map((data) => (
        <MBTICardButton {...data} key={data.title} />
      ))}
    </div>
  );
};

export default MBTITraitCard;
