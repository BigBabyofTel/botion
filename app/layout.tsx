import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { Toaster } from 'sonner';
import { ModalProvider } from '@/components/providers/modal-provider';
import React from 'react';
import { ConvexClientProvider } from '@/components/providers/ConvexClientProvider';

export const metadata: Metadata = {
  title: 'Botion',
  description: 'A cocoon where work will expediently happen',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/botion-logo-light.svg',
        href: '/botion-logo-light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/botion-logo-dark.svg',
        href: '/botion-logo-dark.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
