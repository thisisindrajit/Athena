import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/common";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} antialiased p-4 md:p-6`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
