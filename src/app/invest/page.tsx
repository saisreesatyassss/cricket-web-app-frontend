import { InvestmentOpportunity } from "@/components/investment-opportunity";
import { Metadata } from "next";

// Define metadata for the page
export const metadata: Metadata = {
  title: "Cricket Panga City Edition Investment Opportunity",
  description: "Invest in Cricket Panga City Editions - India's fastest growing fantasy cricket platform. Passive investment with guaranteed returns and capital recovery within two years.",
  keywords: [
    "cricket panga", 
    "fantasy cricket", 
    "cricket investment", 
    "passive investment", 
    "city edition", 
    "cricket franchise", 
    "fantasy sports investment"
  ],
  openGraph: {
    title: "Cricket Panga City Edition Investment | Passive Investment Opportunity",
    description: "Invest ₹10 lakhs in Cricket Panga City Editions and receive 25% profit sharing with full capital recovery in two years. Marketing support by Pintude Solutions.",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 1200,
        height: 630,
        alt: "Cricket Panga Investment Opportunity"
      }
    ],
    siteName: "/icons/icon-512x512.png",
    type: "website",
    url: "https://cricketpanga.com/invest"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cricket Panga City Edition Investment | 25% Profit Sharing",
    description: "Passive investment opportunity in India's growing fantasy cricket platform. Full capital recovery in two years with marketing support from Pintude Solutions.",
    images: ["/icons/icon-512x512.png"],
    creator: "@cricketpanga"
  },
  alternates: {
    canonical: "https://cricketpanga.com/invest"
  }
};

export default function InvestmentPage() {
  return (
    <>
      <main className="min-h-screen">
        <InvestmentOpportunity />
      </main>
    </>
  );
}