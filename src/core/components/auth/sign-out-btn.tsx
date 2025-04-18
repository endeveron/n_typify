'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

import LogoutIcon from '~/public/icons/auth/logout.svg';
import LoadingIcon from '~/public/icons/loading.svg';

const SignOutButton = () => {
  const [pending, setPending] = useState(false);

  const handleClick = () => {
    setPending(true);
    signOut();
  };
  return (
    <div onClick={handleClick}>
      {pending ? (
        <div className="w-6 h-6 flex items-center justify-center animate-spin">
          <LoadingIcon />
        </div>
      ) : (
        <div className="w-6 h-6 flex items-center justify-center">
          <LogoutIcon />
        </div>
      )}
    </div>
  );
};

export default SignOutButton;
