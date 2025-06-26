import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'R&D FOR ALL',
  description:
    'IG12 blends creativity, analysis, and experimentation to rethink the way we understand and shape our shared worlds.',
  generator: 'Next.js',
  applicationName: 'IG12',
  authors: [{ name: 'IG12 Studio' }],
  keywords: ['IG12', 'Civic Innovation', 'Research Consultancy', 'Design', 'Community Systems'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'icon', url: '/favicon-96x96.png', sizes: '96x96' },
    ],
  },
  openGraph: {
    title: 'IG12 — Research Consultancy for Civic Innovation',
    description:
      'Exploring meaningful questions at the intersection of culture, community, and critical systems design.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'IG12',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IG12 Consultancy Open Graph Image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IG12 — Research Consultancy for Civic Innovation',
    description:
      'IG12 blends creativity, analysis, and experimentation to rethink shared systems and spaces.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
