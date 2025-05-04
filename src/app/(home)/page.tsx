// import { useAuthCheck } from "@/utils/client-auth";
// import { checkAuth } from "@/utils/server-auth";
// import Link from "next/link";
// import React from "react";

// const WelcomeComponent = () => {
  
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-6">
    
  
//     </div>
//   );
// };

// export default WelcomeComponent;

import { HeroSection } from "@/components/home/hero-section";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { FAQ } from "@/components/home/faq";
import { EarlyAccess } from "@/components/home/early-access";
import { MiniGame } from "@/components/home/mini-game";
import { RegionalSupport } from "@/components/home/regional-support";
import { ScanPayJoin } from "@/components/home/scan-pay-join";
import { CountdownTimer } from "@/components/home/countdown-timer";
import { AITeamMaker } from "@/components/home/ai-team-maker";
import { MobileAppPreview } from "@/components/home/mobile-app-preview";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <main className="flex-1 mt-10 md:mt-0">
        <HeroSection />
        <div className="py-8 md:py-12 bg-white">
          <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
            <CountdownTimer />
          </div>
        </div>
        <EarlyAccess />
        <ScanPayJoin />
        <AITeamMaker />
        <MobileAppPreview/>
        <Features />
        <HowItWorks />
        <MiniGame />
        <RegionalSupport />
        <FAQ />
      </main>
    </div>
  );
}
