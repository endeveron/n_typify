'use client';

export function useLocalStorage(): [
  getItem: <T>(key: string) => T | null,
  setItem: <T>(key: string, item: T) => void
] {
  const getItem = <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const setItem = (key: string, item: unknown) => {
    if (typeof window === 'undefined') return;
    try {
      if (typeof item === 'string') {
        window.localStorage.setItem(key, item);
      } else {
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [getItem, setItem];
}
