import type { Metadata } from "next";
import localFont from "next/font/local";
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
  variable: "--font-eudoxus",   // 👈 naam badla
});

export const metadata: Metadata = {
  title: {
    default: "Next Generation Lending Group",
    template: "%s | Next Generation Lending Group",
  },
  description:
    "Your Partner For What Comes Next. Next Generation Lending Group is your trusted financial broker in Victoria, Melbourne.",

  metadataBase: new URL("https://www.nextgenlg.com.au"),

  icons: {
    icon: "/images/NextGenicon.png",
    apple: "/images/NextGenicon.png",
  },

  openGraph: {
    title: "Next Generation Lending Group",
    description:
      "Your Partner For What Comes Next. Next Generation Lending Group is your trusted financial broker in Victoria, Melbourne.",
    url: "https://www.nextgenlg.com.au",
    siteName: "Next Generation Lending Group",
    images: [
      {
        url: "/images/NextGenicon.png",
        width: 150,
        height: 150,
        alt: "Next Generation Lending Group",
      },
    ],
    locale: "en_AU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Next Generation Lending Group",
    description:
      "Your Partner For What Comes Next. Next Generation Lending Group is your trusted financial broker.",
    images: ["/images/NextGenicon.png"],
  },
};

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
    </html>
  );
}