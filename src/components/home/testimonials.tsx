"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { useInView } from "react-intersection-observer"

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Delhi",
      avatar: "/avatar1.png",
      comment:
        "I won ₹25,000 in my first week on Cricket Panga! The platform is super easy to use and withdrawals are instant. The India-specific contests are amazing!",
      rating: 5,
    },
    {
      name: "Priya Patel",
      location: "Mumbai",
      avatar: "/avatar2.png",
      comment:
        "The early access bonus helped me get started without risking much. Now I'm playing regularly and winning consistently. Love the IPL special contests!",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      location: "Bangalore",
      avatar: "/avatar3.png",
      comment:
        "Cricket Panga has the best UI among all fantasy apps I've used. Creating teams is intuitive and the live score updates are fast. UPI payments make it so convenient!",
      rating: 5,
    },
    {
      name: "Sneha Reddy",
      location: "Hyderabad",
      avatar: "/avatar4.png",
      comment:
        "Being able to use the app in Telugu makes it so much more accessible. I've recommended Cricket Panga to all my friends who love cricket!",
      rating: 5,
    },
    {
      name: "Rajesh Verma",
      location: "Jaipur",
      avatar: "/avatar5.png",
      comment:
        "The private leagues feature is fantastic! I created a league for my office colleagues during the IPL and we had a blast competing against each other.",
      rating: 4,
    },
    {
      name: "Ananya Das",
      location: "Kolkata",
      avatar: "/avatar6.png",
      comment:
        "Customer support is excellent. I had an issue with a withdrawal and it was resolved within minutes. Truly the best fantasy cricket platform in India!",
      rating: 5,
    },
  ]

  useEffect(() => {
    if (!inView) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [inView, testimonials.length])

  // Removed unused getVisibleCount function

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
            <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              What Indian Cricket Fans Say
            </h2>
            <p className="max-w-[900px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don&apos;t just take our word for it - hear from our satisfied users across India
            </p>
          </div>
        </div>

        <div ref={ref} className="mt-8 md:mt-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>

          <div className="relative max-w-6xl mx-auto px-4">
            <div className="flex overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(activeIndex * 100) / testimonials.length}%)`,
                  width: `${testimonials.length * 100}%`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4"
                    style={{ flex: `0 0 ${100 / testimonials.length}%` }}
                  >
                    <Card
                      className={`h-full transition-all duration-500 ${
                        activeIndex === index
                          ? "scale-100 sm:scale-105 shadow-lg border-blue-200"
                          : "scale-95 sm:scale-100 shadow-sm"
                      }`}
                    >
                      <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                        <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                          {Array(testimonial.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          {Array(5 - testimonial.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
                            ))}
                        </div>
                        <p className="flex-1 text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">{testimonial.comment}</p>
                        <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg?height=48&width=48"}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-blue-100"
                          />
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500">{testimonial.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index ? "bg-blue-700 w-4 sm:w-6" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
