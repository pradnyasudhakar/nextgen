import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "NextGen Lending Group",
    template: "NextGen Lending Group",
  },
  description: "Your trusted finance broker in Melbourne.",
  icons: {
    icon: "/images/NextGenicon.png",       
    apple: "/images/NextGenicon.png",       
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="[&::-webkit-scrollbar]:hidden [scrollbar-width:none]" lang="en" suppressHydrationWarning>
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