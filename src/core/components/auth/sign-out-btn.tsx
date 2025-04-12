'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

import SignOutIcon from '~/public/icons/auth/sign-out.svg';
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
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-card opacity-60 animate-spin">
          <LoadingIcon />
        </div>
      ) : (
        <div className="w-14 h-14 flex items-center justify-center rounded-full cursor-pointer bg-card opacity-30 hover:opacity-100 transition-opacity ">
          <SignOutIcon />
        </div>
      )}
    </div>
  );
};

export default SignOutButton;
