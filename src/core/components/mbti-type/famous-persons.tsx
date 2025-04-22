'use client';

import FamousPersonCard from '@/core/components/mbti-type/famous-person-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';

type FamousPersonsProps = {
  persons: string[];
};

const FamousPersons = ({ persons }: FamousPersonsProps) => {
  return (
    <AnimatedAppear
      isShown={!!persons.length}
      className="flex justify-center gap-4"
    >
      {persons.slice(0, 4).map((name) => (
        <FamousPersonCard name={name} key={name} />
      ))}
    </AnimatedAppear>
  );
};

export default FamousPersons;
