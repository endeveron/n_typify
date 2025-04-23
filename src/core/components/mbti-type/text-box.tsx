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
      className="mx-1 px-8 py-10 flex flex-col gap-6 bg-card rounded-3xl"
    >
      {title ? (
        <div className="text-xs text-accent-text font-semibold tracking-wide uppercase">
          {title}
        </div>
      ) : (
        <div className="h-1 w-24 -translate-x-10 bg-accent rounded-full"></div>
      )}
      {paragraphs.map((text, index) => (
        <div className="font-light leading-relaxed opacity-90" key={index}>
          {text}
        </div>
      ))}
    </AnimatedAppear>
  );
};

export default TextBox;
