'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { LangCode } from '@/core/types/translation';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';

interface LangContextType {
  langCode?: LangCode;
  toggleLangCode: () => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [langCode, setLangCode] = useState<LangCode>();
  const [langCodeFromStorage, saveLangCode] = useLocalStorage<LangCode>(
    'langCode',
    'en'
  );

  const toggleLangCode = () => {
    setLangCode((prev) => {
      const newLangCode = prev === 'en' ? 'uk' : 'en';
      saveLangCode(newLangCode);
      return newLangCode;
    });
  };

  useEffect(() => {
    if (langCodeFromStorage) {
      setLangCode(langCodeFromStorage);
    } else {
      saveLangCode('en');
    }
  }, [langCodeFromStorage, saveLangCode]);

  return (
    <LangContext.Provider value={{ langCode, toggleLangCode }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLangCode() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLangCode must be used within LangProvider');
  return context;
}
