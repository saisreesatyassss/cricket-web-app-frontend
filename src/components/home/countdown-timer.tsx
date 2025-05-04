"use client"

import { useState, useEffect } from "react"
import { Card } from "./ui/card"
import { Calendar, Clock } from "lucide-react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date("June 1, 2025 00:00:00").getTime()
      const now = new Date().getTime()
      const difference = launchDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-orange-500" />
        <p className="text-sm sm:text-base md:text-lg font-medium">
          Official Launch: <span className="font-bold text-blue-700">June 1, 2025</span>
        </p>
        <Clock className="h-5 w-5 text-orange-500" />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item) => (
          <Card
            key={item.label}
            className="flex flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200"
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700">{item.value}</span>
            <span className="text-xs sm:text-sm text-gray-600">{item.label}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}
