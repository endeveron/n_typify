'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';

type TextBoxProps = {
  paragraphs: string[];
  title?: string;
};

const TextBox = ({ paragraphs, title }: TextBoxProps) => {
  return (
    <AnimatedAppear
      isShown={!!paragraphs.length}
      timeout={1000}
      className="px-6 py-8 flex flex-col gap-6 bg-card rounded-3xl"
    >
      {title ? (
        <div className="text-xs text-accent-text font-semibold tracking-wide uppercase">
          {title}
        </div>
      ) : null}
      {paragraphs.map((text, index) => (
        <div
          className="text-sm font-light leading-loose opacity-90"
          key={index}
        >
          {text}
        </div>
      ))}
    </AnimatedAppear>
  );
};

export default TextBox;
