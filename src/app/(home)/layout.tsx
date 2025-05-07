

import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/home/theme-provider";
import Script from "next/script"; 
import { Footer } from "@/components/home/footer";
import { Navmenu } from "@/components/home/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://cricketpanga.com"), // Add this line
  title: "Cricket Panga - Fantasy Cricket Game",
  description: "Join India's fastest growing fantasy cricket platform. Create your dream team, compete with friends, and win real cash prizes.",
  keywords: [
    "cricket panga",  
    "fantasy cricket",
    "fantasy cricket game",
    "fantasy sports",
    "cricket fantasy",
    "fantasy league",
    "fantasy cricket app",
    "IPL",
    "T20",
    "cricket",
    "fantasy sports app",
    "fantasy cricket league",
    "fantasy cricket tips",
    "fantasy cricket strategy",
    "cricket fantasy league",
    "fantasy cricket team",
    "fantasy cricket predictions"
  ],
  icons: {
    icon: [
      { url: "/Logo.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Cricket Panga - Fantasy Cricket Game",
    description: "Join India's fastest growing fantasy cricket platform. Create your dream team, compete with friends, and win real cash prizes.",
    url: "https://cricketpanga.com",
    siteName: "Cricket Panga",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 1200,
        height: 630,
        alt: "Cricket Panga - Fantasy Cricket Game"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cricket Panga - Fantasy Cricket Game",
    description: "Join India's fastest growing fantasy cricket platform. Create your dream team, compete with friends, and win real cash prizes.",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 1200,
        height: 630,
        alt: "Cricket Panga - Fantasy Cricket Game"
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Cricket Panga",
    statusBarStyle: "default",
    startupImage: [
      { url: "/icons/icon-512x512.png" }
    ],
  },
  verification: {
    google: "G-BE71J3TM4W",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navmenu/>
          {children}
          <Footer />
        </ThemeProvider>

        {/* Google Analytics Script - correct way in App Router */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-BE71J3TM4W" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BE71J3TM4W');
          `}
        </Script>
      </body>
    </html>
  );
}