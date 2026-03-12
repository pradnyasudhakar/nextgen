import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
      className="[&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}