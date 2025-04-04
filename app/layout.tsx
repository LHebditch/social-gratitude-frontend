import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './page.module.css'
import Navigation from "./components/basic-navigation";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HEAD INFO NOT SET FOR PAGE",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
