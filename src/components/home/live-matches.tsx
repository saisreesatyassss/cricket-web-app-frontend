"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export function LiveMatches() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const matches = [
    {
      id: 1,
      team1: "Mumbai Indians",
      team2: "Chennai Super Kings",
      team1Logo: "/mi-logo.png",
      team2Logo: "/csk-logo.png",
      startTime: new Date(currentTime.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
      prizePool: "₹2 Crore",
      entryFee: "₹49",
      isLive: false,
    },
    {
      id: 2,
      team1: "Royal Challengers Bangalore",
      team2: "Kolkata Knight Riders",
      team1Logo: "/rcb-logo.png",
      team2Logo: "/kkr-logo.png",
      startTime: new Date(currentTime.getTime() + 20 * 60 * 1000), // 20 minutes from now
      prizePool: "₹1.5 Crore",
      entryFee: "₹39",
      isLive: false,
    },
    {
      id: 3,
      team1: "India",
      team2: "Australia",
      team1Logo: "/india-logo.png",
      team2Logo: "/australia-logo.png",
      startTime: new Date(currentTime.getTime() - 1 * 60 * 60 * 1000), // Started 1 hour ago
      prizePool: "₹5 Crore",
      entryFee: "₹49",
      isLive: true,
      score1: "245/4 (35.2)",
      score2: "187/6 (29.0)",
    },
  ]

  const formatTimeRemaining = (startTime: Date): string => {
    const diff = startTime.getTime() - currentTime.getTime()
    if (diff <= 0) return "Started"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  return (
    <section id="live-matches" className="py-12 md:py-16 bg-white">
      <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-10">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">Upcoming & Live Matches</h2>
            <p className="max-w-[900px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Create your fantasy teams for these exciting cricket matches
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {match.isLive ? (
                      <Badge className="bg-red-500 animate-pulse text-xs">LIVE</Badge>
                    ) : (
                      <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeRemaining(match.startTime)}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-gray-600">Prize: {match.prizePool}</div>
                </div>

                <div className="p-3 md:p-6 flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="relative h-12 w-12 md:h-16 md:w-16 mb-2 transform group-hover:scale-110 transition-transform">
                      <Image
                        src={match.team1Logo || "/placeholder.svg?height=64&width=64"}
                        alt={match.team1}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xs md:text-sm font-semibold text-center">{match.team1}</h3>
                    {match.isLive && <div className="text-[10px] md:text-xs text-gray-600 mt-1">{match.score1}</div>}
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-base md:text-lg font-bold mb-2">VS</div>
                    {match.isLive && <Badge className="bg-green-600 animate-pulse mb-2 text-xs">LIVE NOW</Badge>}
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative h-12 w-12 md:h-16 md:w-16 mb-2 transform group-hover:scale-110 transition-transform">
                      <Image
                        src={match.team2Logo || "/placeholder.svg?height=64&width=64"}
                        alt={match.team2}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xs md:text-sm font-semibold text-center">{match.team2}</h3>
                    {match.isLive && <div className="text-[10px] md:text-xs text-gray-600 mt-1">{match.score2}</div>}
                  </div>
                </div>

                <div className="p-3 md:p-4 border-t flex justify-between items-center">
                  <div className="text-xs md:text-sm">
                    Entry: <span className="font-semibold">{match.entryFee}</span>
                  </div>
                  <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800 group text-xs md:text-sm">
                    <Link href="#" className="inline-flex items-center gap-1">
                      {match.isLive ? "Join Now" : "Create Team"}
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
          >
            <Link href="#">View All Matches</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}