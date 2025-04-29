'use client';

import { PropsWithChildren } from 'react';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Switch } from '@/core/components/ui/switch';
import { PromptCardDataStatus } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type TPromptCardProps = PropsWithChildren & {
  title: string;
  isActive: boolean;
  message: string | null;
  onStateToggle: () => void;
  dataStatus?: PromptCardDataStatus;
};

const PromptCard = ({
  children,
  isActive,
  title,
  message,
  onStateToggle,
  dataStatus,
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
        {dataStatus === 'ok' ? (
          <div className="z-10 flex items-center px-2 rounded-full bg-background">
            <Switch checked={isActive} onClick={() => onStateToggle()} />
          </div>
        ) : null}
      </div>

      {/* Content */}
      {isActive ? (
        <AnimatedAppear className="py-8 flex flex-col items-center gap-6">
          {children}
        </AnimatedAppear>
      ) : null}

      {message && !isActive ? (
        <div className="p-8 text-center text-xs font-semibold text-muted/70 tracking-wide uppercase no-select">
          {message}
        </div>
      ) : null}
    </AnimatedAppear>
  );
};

export default PromptCard;
