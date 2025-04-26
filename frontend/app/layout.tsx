import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/common";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import CThemeProvider from "@/providers/CThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/common/Footer";
import CQueryClientProvider from "@/providers/CQueryClientProvider";
import CAuthQueryProvider from "@/providers/CAuthQueryProvider";
import TopBar from "@/components/common/TopBar";
import CBottomBar from "@/components/common/CBottomBar";

const onest = Onest({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
              <div className="px-4 flex flex-col justify-between gap-8 min-h-[100dvh] lg:mb-0">
                <TopBar />
                {children}
                <Footer />
              </div>
              <CBottomBar />
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
