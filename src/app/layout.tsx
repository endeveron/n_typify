import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/core/components/ui/sonner';
import { ThemeProvider } from '@/core/components/ui/theme-provider';

import '@/core/globals.css';
import { LangProvider } from '@/core/context/LangContext';

export const metadata: Metadata = {
  title: 'Typify - Find Clarity Within',
  applicationName: 'Typify',
  description: 'Typify - Find Clarity Within',
  // openGraph: {
  //   title: 'Typify',
  //   description: 'Find Clarity Within',
  //   siteName: 'Typify',
  //   type: 'website',
  //   images: [
  //     {
  //       url: 'https://chatai-sigma-three.vercel.app/icon.svg',
  //       width: 512,
  //       height: 512,
  //     },
  //   ],
  // },
  // icons: {
  //   icon: {
  //     url: '/icon.svg',
  //     type: 'image/svg+xml',
  //   },
  // },
};

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
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
          defaultTheme="light"
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
