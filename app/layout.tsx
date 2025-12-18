import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FATIMA: A Call To Salvation",
  description: "Not A Promise Of Peace, But A Remedy For Souls. The original testimony of Fatima, presented without alteration or reinterpretation.",
  keywords: ["Fatima", "Salvation", "Immaculate Heart", "Rosary", "Catholic", "Reparation", "Obedience", "Souls", "Heaven", "Hell"],
  authors: [{ name: "Michael" }],
  openGraph: {
    title: "FATIMA: A Call To Salvation",
    description: "Not A Promise Of Peace, But A Remedy For Souls",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FATIMA: A Call To Salvation",
    description: "Not A Promise Of Peace, But A Remedy For Souls",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
