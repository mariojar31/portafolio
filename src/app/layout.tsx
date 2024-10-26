import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

const mainFont = localFont({
  src: './SoDoSans-Regular.woff',
  display: 'swap',
})

const lang = typeof navigator !== 'undefined' ? navigator.language.startsWith('es')?'es': navigator.language.startsWith('fr')?'fr':'en':'en';

export const metadata: Metadata = {
  title: "Mario Acendra | Web Developer & Data Analyst",
  description: "Mario Acendra has worked for around 3 years as a fullstack web developer and Data Analyst. On this website, you can see a little of his work.",
  creator: "Mario Acendra",
  icons: "./favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={lang}>
      <body className={mainFont.className}>{children}</body>
    </html>
  );
}
