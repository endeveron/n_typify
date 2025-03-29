import { redirect } from 'next/navigation';

import { auth } from '~/auth';
import { DEFAULT_SIGNOUT_REDIRECT } from '@/core/routes';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) return redirect(DEFAULT_SIGNOUT_REDIRECT);

  return <>{children}</>;
}
