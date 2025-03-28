import { redirect } from 'next/navigation';

import { verifyEmailToken } from '@/core/actions/auth';
import { DEFAULT_REDIRECT } from '@/core/routes';

type TPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = async ({ searchParams }: TPageProps) => {
  const { e: email, t: token, i: userObjId } = await searchParams;

  if (!email || !token || !userObjId) {
    throw new Error('Invalid page search params');
  }

  // Verify the token
  const res = await verifyEmailToken({
    userObjId,
    token,
  });

  if (!res.success) {
    // Get error code. See EmailErrorCodes
    if (res?.success === false) {
      if ('code' in res.error) {
        const errCode = res.error.code as number;
        redirect(`/email/error?c=${errCode}&e=${email}`);
      } else {
        throw new Error('Unexpected error format.');
      }
    }
    throw new Error('Unable to verify email token.');
  }

  if (res.data === 'created') redirect(DEFAULT_REDIRECT);
  if (res.data === 'onboard') redirect(`/onboarding?t=${userObjId}`);
};

export default Page;
