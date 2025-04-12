'use client';

import { useState } from 'react';

import CheckIcon from '~/public/icons/check.svg';
import CloseIcon from '~/public/icons/close.svg';

type ResetProps = {
  isAllow: boolean;
  cleanUpResultsPrompt: string;
  onCleanUp: () => void;
};

const CleanUpResults = ({
  isAllow,
  cleanUpResultsPrompt,
  onCleanUp,
}: ResetProps) => {
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  const handleCleanUpButtonClick = () => {
    setIsConfirmMode(true);
  };

  const handleConfirmButtonClick = () => {
    onCleanUp();
    setTimeout(() => {
      setIsConfirmMode(false);
    }, 100);
  };

  const handleCancelButtonClick = () => {
    setIsConfirmMode(false);
  };

  return isAllow || isConfirmMode ? (
    <>
      {isConfirmMode ? (
        <div className="relative w-[400px] h-36">
          <div className="relative z-10 flex items-center justify-end gap-2">
            <div className="text-accent font-semibold pr-4 cursor-default">
              {cleanUpResultsPrompt}
            </div>
            <div className="flex gap-3">
              <div
                onClick={handleConfirmButtonClick}
                className="w-14 h-14 flex items-center justify-center rounded-full cursor-pointer bg-card opacity-60 hover:opacity-100 transition-opacity"
              >
                <CheckIcon />
              </div>
              <div
                onClick={handleCancelButtonClick}
                className="w-14 h-14 flex items-center justify-center rounded-full cursor-pointer bg-card opacity-60 hover:opacity-100 transition-opacity"
              >
                <CloseIcon />
              </div>
            </div>
          </div>
          <div className="absolute z-0 inset-0 bg-background opacity-90"></div>
        </div>
      ) : (
        <div
          onClick={handleCleanUpButtonClick}
          className="w-14 h-14 flex items-center justify-center rounded-full cursor-pointer bg-card opacity-30 hover:opacity-100 transition-opacity"
        >
          <CloseIcon />
        </div>
      )}
    </>
  ) : null;
};

export default CleanUpResults;
