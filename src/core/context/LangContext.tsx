'use client';

import { LANG_CODE_KEY } from '@/core/constants';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { LangCode } from '@/core/types/translation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface LangContextType {
  langCode?: LangCode;
  toggleLangCode: () => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [langCode, setLangCode] = useState<LangCode>();
  const [getLangCodeFromStorage, saveLangCodeInStorage] = useLocalStorage();

  const toggleLangCode = () => {
    setLangCode((prev) => {
      const newLangCode = prev === 'en' ? 'uk' : 'en';
      saveLangCodeInStorage<LangCode>(LANG_CODE_KEY, newLangCode);
      return newLangCode;
    });
  };

  useEffect(() => {
    const langCodeFromStorage = getLangCodeFromStorage<LangCode>(LANG_CODE_KEY);
    if (langCodeFromStorage) {
      setLangCode(langCodeFromStorage);
    } else {
      saveLangCodeInStorage<LangCode>(LANG_CODE_KEY, 'en');
    }
  }, [getLangCodeFromStorage, saveLangCodeInStorage]);

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
