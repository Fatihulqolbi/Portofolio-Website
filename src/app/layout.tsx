import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Obi",
  description:
    "Personal portfolio of Muhammad Fatihul Qolbi Ash Shiddiqi (Obi). Information Technology student at ITS, specializing in AI Engineering, Fullstack Development, and Internet of Things.",
  keywords: [
    "Obi",
    "Muhammad Fatihul Qolbi",
    "portfolio",
    "AI Engineer",
    "Fullstack Developer",
    "IoT",
    "web developer",
    "ITS",
    "Institut Teknologi Sepuluh Nopember",
  ],
  authors: [{ name: "Muhammad Fatihul Qolbi Ash Shiddiqi" }],
  creator: "Obi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://obi.dev",
    title: "Obi",
    description:
      "Personal portfolio of Muhammad Fatihul Qolbi Ash Shiddiqi. Building intelligent systems, scalable web apps, and IoT solutions.",
    siteName: "Obi.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obi",
    description:
      "Personal portfolio of Muhammad Fatihul Qolbi Ash Shiddiqi (Obi).",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
