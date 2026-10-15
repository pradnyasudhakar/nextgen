import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const eudoxusSans = localFont({
  src: [
    { path: "./fonts/EudoxusSans-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/EudoxusSans-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/EudoxusSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/EudoxusSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/EudoxusSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/EudoxusSans-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-eudoxus",
});

// export const metadata ... (bilkul same rahega)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${eudoxusSans.variable} [&::-webkit-scrollbar]:hidden [scrollbar-width:none]`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans" suppressHydrationWarning>
        <ConditionalLayout>
          <main className="flex-1">{children}</main>
        </ConditionalLayout>
      </body>
      <GoogleAnalytics gaId="G-PT0XH3BZRY" />
    </html>
  );
}