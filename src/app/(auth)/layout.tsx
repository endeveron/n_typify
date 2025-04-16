import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Typify - Begin the Journey',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex items-center justify-center">{children}</main>;
}
