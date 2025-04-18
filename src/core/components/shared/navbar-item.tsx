'use client';

import { NavbarItem as TNavbarItem } from '@/core/types/common';
import { cn } from '@/core/utils/common';
import { ReactElement } from 'react';

type NavbarItemProps = TNavbarItem & {
  icon: ReactElement;
  title: string;
  onClick: (itemId: string, path?: string) => void;
  activeItemId?: string;
  isPending?: boolean;
};

const NavbarItem = ({
  id,
  icon,
  path,
  title,
  onClick,
  activeItemId,
  isPending,
}: NavbarItemProps) => {
  const handleClick = () => {
    if (id === activeItemId) return;
    onClick(id, path);
  };

  const isActiveState = id === activeItemId || isPending;
  const isNormalState = id !== activeItemId && !isPending;

  return (
    <div
      onClick={handleClick}
      className={cn(
        `w-10 flex flex-col items-center justify-center transition-opacity`,
        {
          'opacity-100 text-accent': isActiveState,
          'opacity-50 hover:opacity-100 cursor-pointer': isNormalState,
        }
      )}
    >
      {icon}
      <div
        className={cn(
          `mt-1 text-[8px] font-bold tracking-wider uppercase cursor-default opacity-80 select-none`,
          {
            'text-accent': isActiveState,
            'text-muted': isNormalState,
          }
        )}
      >
        {title}
      </div>
    </div>
  );
};

export default NavbarItem;
