'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Switch } from '@/core/components/ui/switch';
import { cn } from '@/core/utils/common';
import { PropsWithChildren } from 'react';

type TPromptCardProps = PropsWithChildren & {
  title: string;
  isActive: boolean;
  disabledCardMessage: string;
  onStateToggle: () => void;
};

const PromptCard = ({
  children,
  isActive,
  title,
  disabledCardMessage,
  onStateToggle,
}: TPromptCardProps) => {
  return (
    <AnimatedAppear className="flex flex-col border-2 border-border rounded-2xl">
      {/* Header */}
      <div className="self-stretch -my-2.5 flex items-center justify-between px-4">
        <div
          className={cn(
            `px-2 text-xs font-semibold tracking-wide uppercase no-select bg-background transition-color`,
            {
              'text-accent-text': isActive,
              'text-muted/70': !isActive,
            }
          )}
        >
          {title}
        </div>
        <div className="z-10 flex items-center px-2 rounded-full bg-background">
          <Switch checked={isActive} onClick={() => onStateToggle()} />
        </div>
      </div>

      {/* Content */}
      {isActive ? (
        <AnimatedAppear className="py-8 flex flex-col items-center gap-6">
          {children}
        </AnimatedAppear>
      ) : (
        <div className="p-8 text-center text-xs font-semibold text-muted/70 tracking-wide uppercase no-select">
          {disabledCardMessage}
        </div>
      )}
    </AnimatedAppear>
  );
};

export default PromptCard;
