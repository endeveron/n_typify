import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/core/components/ui/sonner';
import { ThemeProvider } from '@/core/components/ui/theme-provider';

import '@/core/globals.css';

export const metadata: Metadata = {
  title: 'NeurAI - Find Clarity Within',
  applicationName: 'NeurAI',
  description: 'NeurAI - Find Clarity Within',
  // openGraph: {
  //   title: 'NeurAI',
  //   description: 'Find Clarity Within',
  //   siteName: 'NeurAI',
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
          <div className="layout">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
