"use client"
import Image from "next/image"
// import { Button } from "@/ui/button"
import { Button } from "./ui/button"
import { ArrowRight, Bot, Sparkles, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { Badge } from "./ui/badge"

export function AITeamMaker() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white" id="ai-team-maker">
     <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <Badge className="px-3 py-1 bg-blue-100 text-blue-700 border-blue-200 rounded-full">
            <Bot className="mr-1 h-3.5 w-3.5" />
            <span className="text-xs sm:text-sm">Exclusive Feature</span>
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            AI Cricket Fantasy Team Maker
          </h2>
          <p className="max-w-[900px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Get our advanced AI to create winning fantasy teams based on player statistics, form, and match conditions
          </p>
        </div>

        <div ref={ref} className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div
            className={`relative transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="relative rounded-xl overflow-hidden border shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/100 to-purple-600/90 rounded-xl"></div>
              <div className="relative aspect-video overflow-hidden">
                <Image src="/ai-team-maker.png" alt="AI Cricket Fantasy Team Maker" fill className="object-contain" />
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  Worth ₹1200
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col justify-center space-y-4 transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-green-50 text-green-700 border-green-200 mb-2">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>Free for Early Access Users</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold">Let AI Build Your Winning Team</h3>

            <p className="text-sm sm:text-base text-gray-600">
              Our advanced AI analyzes thousands of data points to create the perfect fantasy cricket team for each
              match. This premium feature (worth ₹1200) is <span className="font-bold text-blue-700">FREE</span> for all
              &quot;Scan Karo, Pay Karo, Join Karo&quot; early access users.
            </p>

            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Zap className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <span className="font-medium">Advanced Player Analysis</span>
                  <p className="text-sm text-gray-500">
                    AI evaluates player form, pitch conditions, and historical performance
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Zap className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <span className="font-medium">Multiple Team Suggestions</span>
                  <p className="text-sm text-gray-500">Get up to 5 different team combinations for each match</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Zap className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <span className="font-medium">Captain & Vice-Captain Picks</span>
                  <p className="text-sm text-gray-500">
                    AI recommends the best multiplier choices based on match analysis
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Trophy className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <span className="font-medium">Proven Success Rate</span>
                  <p className="text-sm text-gray-500">
                    Teams created by our AI have 78% higher win rates than manual selections
                  </p>
                </div>
              </li>
            </ul>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="text-white bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 group"
              >
                <Link href="#scan-pay-join" className="inline-flex items-center gap-2">
                  Pre Launch Offer <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                *Limited time offer. AI Team Maker will be available at ₹1200 after launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
