'use client';

import { cn } from '@/core/utils/common';
import Checkmark from '~/public/icons/checkmark.svg';

export type RadioButtonProps = {
  label: string;
  value: number;
  onClick: (value: number) => void;
  checkedButtonValue?: number;
};

const RadioButton = ({
  label,
  value,
  checkedButtonValue,
  onClick,
}: RadioButtonProps) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  const isChecked = checkedButtonValue === value;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div className="radio-button relative h-full w-full" onClick={handleClick}>
      <input
        className="opacity-0 absolute inset-0 cursor-pointer"
        aria-label={label}
        type="radio"
        value={value}
      />
      <div
        className={cn(
          `flex items-center justify-center h-full w-full rounded-full transition-all`,
          {
            'border-2 border-green': isPositive && !isChecked,
            'border-2 border-purple': !isPositive && !isChecked,
            'border-2 border-neutral': isNeutral && !isChecked,
            'bg-green': isPositive && isChecked,
            'bg-purple': !isPositive && isChecked,
            'bg-neutral': isNeutral && isChecked,
          }
        )}
      >
        {isChecked ? (
          <div className="checkmark text-white">
            <Checkmark />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RadioButton;
