'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SignOutButton from '@/core/components/auth/sign-out-btn';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import NavbarItem from '@/core/components/shared/navbar-item';
import { useLangCode } from '@/core/context/LangContext';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { NavbarState, NavbarItem as TNavbarItem } from '@/core/types/common';
import { getNavbarTranslation } from '@/core/utils/dictionary';

import HomeIcon from '~/public/icons/navbar/home-blank.svg';
import TypesIcon from '~/public/icons/navbar/types.svg';

const navbarItems: TNavbarItem[] = [
  {
    id: 'main',
    path: '/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 'types',
    path: '/mbti-types',
    icon: <TypesIcon />,
  },
];

export const NAVBAR_STATE_KEY = 'navbar_state';

const initialState: NavbarState = {
  translation: null,
  activeItemId: 'main',
};

const Navbar = () => {
  const { langCode } = useLangCode();
  const [getState, saveState] = useLocalStorage();
  const router = useRouter();

  const [state, setState] = useState(initialState);
  const [translationMap, setTranslationMap] = useState<Map<string, string>>();
  const [isPending, setIsPending] = useState(false);

  const handleItemClick = (itemId: string, path?: string) => {
    if (!path) return;

    let newState: NavbarState = initialState;
    setState((prev) => {
      newState = {
        ...prev,
        activeItemId: itemId,
      };
      return newState;
    });
    saveState(NAVBAR_STATE_KEY, newState);
    router.push(path);
  };

  const handleLogout = () => {
    setIsPending(true);
  };

  useEffect(() => {
    const initData = async () => {
      // Get translation
      const translation = await getNavbarTranslation(langCode);
      if (!translation) {
        toast(`Unable to get localized data for navbar`);
        return;
      }
      const map = new Map(translation.itemMap);
      setTranslationMap(map);
    };

    initData();
  }, [langCode]);

  // Restore state from LocalStorage
  useEffect(() => {
    const stateFromStorage = getState<NavbarState>(NAVBAR_STATE_KEY);
    if (stateFromStorage) setState(stateFromStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedAppear className="p-2 w-full base-max-w mx-auto flex items-center justify-evenly bg-card rounded-full">
      <NavbarItem
        id="logout"
        icon={<SignOutButton />}
        onClick={handleLogout}
        isPending={isPending}
        title={translationMap?.get('logout') ?? 'Logout'}
        key="logout"
      />
      {navbarItems.map((data) => (
        <NavbarItem
          onClick={handleItemClick}
          {...data}
          title={translationMap?.get(data.id) ?? data.id}
          activeItemId={state.activeItemId}
          key={data.id}
        />
      ))}
    </AnimatedAppear>
  );
};

export default Navbar;
