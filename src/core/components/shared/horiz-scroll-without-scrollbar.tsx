'use client';

import { cn } from '@/core/utils/common';
import { PropsWithChildren } from 'react';

type HorizScrollWithoutScrollbarProps = PropsWithChildren & {
  className: string;
};

const HorizScrollWithoutScrollbar = ({
  children,
  className,
}: HorizScrollWithoutScrollbarProps) => {
  return (
    <div
      className={cn(
        `horizontal-scroll overflow-x-auto scrollbar-hide`,
        className
      )}
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
      }}
    >
      {children}

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HorizScrollWithoutScrollbar;
