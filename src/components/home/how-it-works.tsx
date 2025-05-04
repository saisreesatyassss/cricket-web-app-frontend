"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"

export function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      number: 1,
      title: "Scan, Pay & Join",
      description: "Scan the QR code, pay ₹49, and text 'Hi' to 8237358618 on WhatsApp",
      image: "/step1.png",
    },
    {
      number: 2,
      title: "Share Receipt & Get Bonus",
      description: "Send your payment receipt via WhatsApp to receive your ₹50 bonus",
      image: "/step2.png",
    },
    {
      number: 3,
      title: "Join Contests & Win Big",
      description: "Participate in matches for just ₹10 per contest and win from the 25+ lakh prize pool",
      image: "/step3.png",
    },
  ]

  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-gray-50">
           <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">

        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              How Cricket Panga Works
            </h2>
            <p className="max-w-[900px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get started with India's first honest fantasy sports platform in just three simple steps
            </p>
          </div>
        </div>

        <div ref={ref} className="relative mt-8 md:mt-16 mb-12 md:mb-20">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -translate-y-1/2 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center transition-all duration-1000 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 mb-4 md:mb-6 group">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-100 text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 z-10 transform transition-transform group-hover:scale-110 duration-300">
                    {step.number}
                  </div>
                  <div
                    className="absolute inset-0 rounded-full bg-blue-700 opacity-10 animate-ping"
                    style={{ animationDuration: "3s", animationDelay: `${index * 0.5}s` }}
                  ></div>
                  <Image
                    src={step?.image || "/placeholder.svg?height=160&width=160"}
                    alt={step.title}
                    fill
                    className="object-contain p-8 z-0"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                <p className="text-center text-sm md:text-base text-gray-500 mt-2">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute top-14 sm:top-16 md:top-20 -right-5 md:right-0 transform translate-x-1/2 rotate-90 md:rotate-0 text-blue-300 block md:hidden">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}

                {index < steps.length - 1 && (
                  <div className="absolute top-14 sm:top-16 md:top-20 right-0 transform translate-x-1/2 rotate-0 md:rotate-90 text-blue-300 hidden md:block">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="text-white bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 group"
          >
            <Link href="#scan-pay-join" className="inline-flex items-center gap-2">
             Launching June 1, 2025 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}