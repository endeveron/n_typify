import Navbar from '@/core/components/shared/navbar';
import { redirect } from 'next/navigation';

import { auth } from '~/auth';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) return redirect('/sign-in');

  return (
    <div className="relative h-dvh max-h-dvh flex flex-1 flex-col">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {children}
        <div className="h-14" />
      </div>
      <div className="absolute inset-x-0 bottom-1">
        <Navbar />
      </div>
    </div>
  );
}
