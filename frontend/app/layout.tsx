import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/common";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const onest = Onest({
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
      <body
        className={`${onest.className} antialiased m-auto 2xl:max-w-[1920px] p-4 lg:p-6 flex flex-col gap-16`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
