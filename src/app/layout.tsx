import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Fraunces, DM_Sans, Caveat } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { SITE_URL, resolveGaId } from '@/lib/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ChildhoodWish — Because some wishes never expire',
    template: '%s | ChildhoodWish',
  },
  description: "India's nostalgia gifting company. Curated gifts that unlock childhood memories — for birthdays, self-gifting, and every occasion that deserves something real.",
  keywords: ['nostalgia gifts India', 'childhood gifts', '90s kids gifts', 'retro toys India', 'gift boxes India', 'meaningful gifts'],
  authors: [{ name: 'Abhishek', url: SITE_URL }],
  creator: 'ChildhoodWish',
  publisher: 'ChildhoodWish',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'ChildhoodWish — Because some wishes never expire',
    description: "India's nostalgia gifting company. Your childhood wish, finally fulfilled.",
    siteName: 'ChildhoodWish',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChildhoodWish — Because some wishes never expire',
    description: "India's nostalgia gifting company.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable}`}>
      <body className="font-sans bg-cream antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={resolveGaId()} />
      </body>
    </html>
  );
}
