"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Trophy,
  Users,
  TrendingUp,
  Star,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "IPL",
      description:
        "Create your dream team with players from the biggest cricket league in India",
      image: "/ipl-slide.png",
    },
    {
      title: "India - Men, Women",
      description: "Support Team India by building your perfect fantasy lineup",
      image: "/ind-aus-slide.png",
    },
    {
      title: "International Cricket",
      description:
        "Compete globally with fantasy teams from international matches",
      image: "/t20-slide.png",
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-28 xl:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div
            className={`flex flex-col justify-center space-y-4 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-orange-50 text-orange-700 border-orange-200 mb-4">
              <Star className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Cricket Panga - 25+ Editions
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl font-bold tracking-tighter">
                India's { " "}
                <span className="text-blue-700 relative">
                  First Honest Fantasy Cricket
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-orange-500"></span>
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-orange-100 text-orange-700 border-orange-200 animate-pulse">
                  <span className="font-semibold">
                    Scan Karo, Pay Karo, Join Karo.
                  </span>
                </div>
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 border-blue-200">
                  <Calendar className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="font-semibold">Launching June 1, 2025</span>
                </div>
              </div>
              <p className="max-w-[600px] text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 mt-4">
                Join Cricket Panga's <span className="font-semibold text-blue-700">honest fantasy platform</span>. Create your
                dream team with players from
                <span className="font-semibold text-blue-700"> IPL</span>,
                <span className="font-semibold text-blue-700"> Team India</span>
                , and
                <span className="font-semibold text-blue-700">
                  {" "}
                  international cricket
                </span>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-[400px]:flex-row mt-6">
              <Button
                asChild
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 group px-6"
              >
                <Link
                  href="#early-access"
                  className="text-white inline-flex items-center gap-2"
                >
                  Login Today{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover:border-blue-700 hover:text-blue-700 transition-all duration-300 px-6"
              >
                <Link href="#ai-team-maker">AI Team Maker</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-4 lg:pt-8">
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-700" />
                <span className="text-xs sm:text-sm font-medium">
                  Only 50,000 Players per Match
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-blue-700" />
                <span className="text-xs sm:text-sm font-medium">
                  ₹25+ Lakhs to be won
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-700" />
                <span className="text-xs sm:text-sm font-medium">
                  Limited to 1 Lakh Sign-Ups
                </span>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center justify-center mt-8 lg:mt-0 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full opacity-20 blur-3xl"></div>

              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    currentSlide === index
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-95 rotate-3"
                  }`}
                >
                  <div className="relative h-full w-full rounded-xl overflow-hidden border shadow-xl">
                    <Image
                      src={
                        slide.image || "/placeholder.svg?height=400&width=400"
                      }
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 md:p-6">
                      <h3 className="text-white text-base sm:text-xl lg:text-2xl font-bold">
                        {slide.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm md:text-base">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? "bg-blue-700 w-6" : "bg-blue-300"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`View slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
