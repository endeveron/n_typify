'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SignOutButton from '@/core/components/auth/sign-out-btn';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import NavbarItem from '@/core/components/shared/navbar-item';
import { useLangCode } from '@/core/context/LangContext';
import { NavbarItem as TNavbarItem } from '@/core/types/common';
import { getNavbarTranslation } from '@/core/utils/dictionary';

import HomeIcon from '~/public/icons/navbar/home-blank.svg';
import TypesIcon from '~/public/icons/navbar/types.svg';
import TestIcon from '~/public/icons/navbar/test.svg';

const navbarItems: TNavbarItem[] = [
  {
    id: 'main',
    path: '/mbti-dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 'types',
    path: '/mbti-types',
    icon: <TypesIcon />,
  },
  {
    id: 'test',
    path: '/mbti-test',
    icon: <TestIcon />,
  },
];

export const NAVBAR_STATE_KEY = 'navbar_state';

const Navbar = () => {
  const { langCode } = useLangCode();
  const pathname = usePathname();
  const router = useRouter();

  const [translationMap, setTranslationMap] = useState<Map<string, string>>();
  const [isPending, setIsPending] = useState(false);

  const handleItemClick = (path?: string) => {
    if (!path) return;
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
        toast(`Unable to load localized data for navbar`);
        return;
      }
      const map = new Map(translation.itemMap);
      setTranslationMap(map);
    };

    initData();
  }, [langCode]);

  return (
    <AnimatedAppear className="h-14 pt-2 pb-1 w-full base-max-w mx-auto flex items-center justify-evenly bg-card rounded-full">
      {navbarItems.map((data) => (
        <NavbarItem
          onClick={handleItemClick}
          {...data}
          title={translationMap?.get(data.id) ?? data.id}
          pathname={pathname}
          key={data.id}
        />
      ))}
      <NavbarItem
        id="logout"
        icon={<SignOutButton />}
        onClick={handleLogout}
        isPending={isPending}
        title={translationMap?.get('logout') ?? 'Logout'}
        key="logout"
      />
    </AnimatedAppear>
  );
};

export default Navbar;
