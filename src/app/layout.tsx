import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/core/components/ui/sonner';
import { ThemeProvider } from '@/core/components/ui/theme-provider';
import { LangProvider } from '@/core/context/LangContext';

import '@/core/globals.css';

export const metadata: Metadata = {
  title: 'Typify - Psychological Architecture',
  applicationName: 'Typify',
  description:
    'Wandering the halls of your inner architecture, where each room unveils a unique voice in your cognitive symphony.',
  openGraph: {
    title: 'Typify',
    description: 'Find Clarity Within',
    siteName: 'Typify',
    type: 'website',
    images: [
      {
        url: 'https://typify-zeta.vercel.app/icons/icon.svg',
        width: 1024,
        height: 1024,
      },
    ],
  },
  icons: {
    icon: {
      url: 'https://typify-zeta.vercel.app/favicon.ico',
      type: 'image/image/ico',
    },
  },
};

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
  viewportFit: 'cover',
};

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
        >
          <LangProvider>
            <div className="layout">{children}</div>
            <Toaster />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
