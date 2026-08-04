import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import HealthCheck from "@/components/common/HealthCheck";

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

const apiUrl = process.env.NODE_ENV === "production"
  ? process.env.NEXT_BACKEND_URL_PROD
  : process.env.NEXT_BACKEND_URL_LOCAL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HealthCheck />
        <Toaster position="top-right" richColors/>
        {children}
      </body>
    </html>
  );
}
