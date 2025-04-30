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
    <div className="flex flex-col h-dvh min-h-dvh max-h-dvh">
      {/* Content area, scrollable */}
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      {/* Bottom */}
      <Navbar />
    </div>
  );
}
