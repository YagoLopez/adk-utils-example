import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const _geistSans = Geist({
  subsets: ["latin"],
});

const _geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADK Agent Chat",
  description: "AI-powered chat interface for Google ADK agents",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${_geistSans.className} ${_geistMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
