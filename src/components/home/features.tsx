"use client"

import { BirdIcon as Cricket, Shield, Zap, Award, Smartphone, CreditCard, Users, IndianRupee } from "lucide-react"
import { useInView } from "react-intersection-observer"

export function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "First-Come, First-Serve",
      description: "Limited to 1 Lakh Sign-Ups with only 50,000 players per match",
    },
    {
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "Exciting Prize Pools",
      description: "25+ lakhs to be won across 25+ editions of cricket tournaments",
    },
    {
      icon: <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "Complete Coverage",
      description: "Play fantasy cricket for IPL, Team India, WPL, and international matches",
    },
    {
      icon: <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "Easy Sign-Up",
      description: "Scan QR code, pay ₹49, and get ₹99 credited to your wallet",
    },
    {
      icon: <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "State-Specific Editions",
      description: "Enjoy localized contests for Goa, Delhi, Mumbai and more regions",
    },
    {
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "Transparent Gameplay",
      description: "India's first honest fantasy sports platform with complete transparency",
    },
    {
      icon: <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "Affordable Entry",
      description: "Participate in matches for just ₹10 per contest with big winning potential",
    },
    {
      icon: <Cricket className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />,
      title: "Comprehensive Analytics",
      description: "Access detailed statistics and performance data from previous matches",
    },
  ]

  return (
    <section id="features" className="py-12 md:py-20 bg-white">
      <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 border-blue-200">
              <Cricket className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Features
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              Why Choose Cricket Panga?
            </h2>
            <p className="max-w-[900px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              India's First Honest Fantasy Sports Platform designed for true cricket fans
            </p>
          </div>
        </div>
        <div
          ref={ref}
          className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-8 md:py-12"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center space-y-2 rounded-lg border p-4 md:p-6 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-blue-100 p-2 sm:p-3 transition-transform hover:scale-110 duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center">{feature.title}</h3>
              <p className="text-center text-sm md:text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}