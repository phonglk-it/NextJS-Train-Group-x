import type { Metadata } from 'next';
import "./fontawesome";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Created with Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
