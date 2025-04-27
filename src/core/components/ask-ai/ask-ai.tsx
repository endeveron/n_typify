'use client';

import { useEffect } from 'react';

// import { useLangCode } from '@/core/context/LangContext';
import AnimatedAppear from '@/core/components/shared/animated-appear';

const AskAIClient = () => {
  // const { langCode } = useLangCode();

  useEffect(() => {}, []);

  return (
    <AnimatedAppear className="flex flex-col flex-1 mx-auto w-full base-max-w">
      <div className="text-accent-text pt-8 px-8">AskAIClient</div>
      <div className="text-sm text-muted pt-4 px-8">Check LS</div>
    </AnimatedAppear>
  );
};

export default AskAIClient;
