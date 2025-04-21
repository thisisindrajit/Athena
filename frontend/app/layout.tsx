import "./globals.css";

import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/common";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import CThemeProvider from "@/providers/CThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import CFooterAndBottomBar from "@/components/common/CFooterAndBottomBar";
import CQueryClientProvider from "@/providers/CQueryClientProvider";
import CAuthQueryProvider from "@/providers/CAuthQueryProvider";
import TopBar from "@/components/common/TopBar";

const onest = Onest({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <head>
      <link
        rel="icon"
        type="image/png"
        href="/favicons/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,viewport-fit=cover"
      />
    </head>
    <body className={`${onest.className} antialiased`}>
      <CQueryClientProvider>
        <CAuthQueryProvider>
          <CThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="m-auto 2xl:max-w-[1920px]">
              <div className="p-4 flex flex-col gap-4 min-h-[100dvh]">
                <TopBar />
                {children}
              </div>
              <CFooterAndBottomBar />
              <Toaster richColors closeButton />
              <Analytics />
              <SpeedInsights />
            </div>
          </CThemeProvider>
        </CAuthQueryProvider>
      </CQueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
