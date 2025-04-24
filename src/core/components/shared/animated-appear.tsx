'use client';

import { cn } from '@/core/utils/common';
import { forwardRef, PropsWithChildren, useEffect, useState } from 'react';

const DEFAULT_TIMEOUT = 500; // 0.5sec

type AnimatedAppearProps = PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement> & {
    isShown?: boolean;
    timeout?: number;
    delay?: number;
  };

const AnimatedAppear = forwardRef<HTMLDivElement, AnimatedAppearProps>(
  (
    { children, className, delay, timeout = DEFAULT_TIMEOUT, isShown, onClick },
    ref
  ) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      let delayTimeout: NodeJS.Timeout;

      if (delay) {
        delayTimeout = setTimeout(() => {
          setIsReady(true);
        }, delay);
        return;
      }

      if (isShown === undefined) {
        setIsReady(true);
        return;
      }
      setIsReady(isShown);

      return () => {
        if (delayTimeout) clearTimeout(delayTimeout);
      };
    }, [delay, isShown]);

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          `opacity-0 transition-opacity duration-${timeout}`,
          {
            'opacity-100': isReady,
          },
          className
        )}
      >
        {children}
      </div>
    );
  }
);

AnimatedAppear.displayName = 'AnimatedAppear';

export default AnimatedAppear;
