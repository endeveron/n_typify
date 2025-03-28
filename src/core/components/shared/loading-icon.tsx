'use client';

import { cn } from '@/core/utils/common';

type TLoadingIconProps = {
  className?: string;
};

// TODO: add loading icon

const LoadingIcon = ({ className }: TLoadingIconProps) => {
  return <div className={cn('loading-icon', className)}>Loading...</div>;
};

export default LoadingIcon;
