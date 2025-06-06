import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './page.module.css'
import Navigation from "./components/basic-navigation";
import { Analytics } from "@vercel/analytics/react"
import StructuredData from "./components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Gratilog',
    default: 'Gratilog - Social Gratitude Journal',
  },
  description: "Transform your mindset with gratitude journaling and community support. Join a supportive community sharing daily moments of gratitude.",
  keywords: [
    'gratitude journal',
    'mindfulness',
    'social journaling',
    'daily gratitude',
    'mental wellness',
    'positive mindset',
    'personal growth',
    'gratitude community',
    'mindfulness journal',
    'well-being'
  ],
  authors: [{ name: 'Gratilog' }],
  openGraph: {
    title: 'Gratilog - Social Gratitude Journal',
    description: 'Transform your mindset with gratitude journaling and community support',
    url: 'https://gratilog.co.uk',
    siteName: 'Gratilog',
    images: [],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gratilog - Social Gratitude Journal',
    description: 'Transform your mindset with gratitude journaling and community support',
    images: ['/icon.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png' },
    ],
    apple: [],
    shortcut: ['/shortcut-icon.png'],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#042630',
    'theme-color': '#042630',
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
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${styles.page}`}>
        <main className={styles.main}>
          <Navigation />
          {children}
          <Analytics />
          <footer className={styles.footer}>
            <h4 className="subheader">Sitemap</h4>

            <p className="sitemap-link">
              <a href="/home" aria-label="Go to home page">Home</a>
            </p>
            <p className="sitemap-link">
              <a href="/journal" aria-label="Go to journal page">Journal</a>
            </p>
            <p className="sitemap-link">
              <a href="/social" aria-label="Go to social page">Socail</a>
            </p>
            <p className="footer-cw">Created by l-h-solutions</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
