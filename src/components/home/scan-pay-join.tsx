"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, QrCode, Smartphone, CreditCard } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export function ScanPayJoin() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Scan Karo",
      description: "Scan the QR code with your UPI app",
      icon: <QrCode className="h-6 w-6 md:h-8 md:w-8 text-blue-700" />,
      image: "/scan-step.png",
    },
    {
      title: "Pay Karo",
      description: "Pay ₹49 using your favorite payment method",
      icon: <CreditCard className="h-6 w-6 md:h-8 md:w-8 text-blue-700" />,
      image: "/pay-step.png",
    },
    {
      title: "Join Karo",
      description: "Start playing and win big prizes",
      icon: <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-blue-700" />,
      image: "/join-step.png",
    },
  ];

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50"
      id="scan-pay-join"
    >
            <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-10">
          <div className="inline-flex items-center rounded-full border px-4 py-1 md:px-6 md:py-2 text-base md:text-lg font-bold bg-orange-100 text-orange-700 border-orange-200">
            Scan Karo, Pay Karo, Join Karo.
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">
            Join Cricket Panga in 3 Simple Steps
          </h2>
          <p className="max-w-[600px] text-sm sm:text-base text-gray-500">
            Our simple process makes it easy to start playing fantasy cricket in
            minutes
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center"
        >
          <div
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full">
              <div className="absolute inset-0 bg-blue-100 rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-blue-700 flex items-center px-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-white text-xs md:text-sm font-medium ml-2">
                    UPI Payment
                  </div>
                </div>

                <div className="absolute top-10 md:top-12 left-0 right-0 bottom-0 flex items-center justify-center">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-500 ${
                        activeStep === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    >
                      <div className="relative h-32 w-32 md:h-48 md:w-48 mb-4 md:mb-6">
                        <Image
                          src={
                            step.image ||
                            "/placeholder.svg?height=200&width=200"
                          }
                          alt={step.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-blue-700 mb-1 md:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-4 md:-bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                      activeStep === index
                        ? "bg-blue-700 w-6 md:w-8"
                        : "bg-blue-300"
                    }`}
                    onClick={() => setActiveStep(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className={`space-y-6 md:space-y-8 transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 md:gap-4 transition-all duration-300 ${
                  activeStep === index ? "scale-105" : "scale-100 opacity-70"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div
                  className={`rounded-full p-3 md:p-4 ${
                    activeStep === index
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-500 mt-1">
                    {step.description}
                  </p>
                  {activeStep === index && (
                    <div className="mt-2 animate-fadeIn">
                      <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                        {index === 0 && (
                          <>
                            <li className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                              Open any UPI app like Google Pay, PhonePe, or
                              Paytm
                            </li>
                            <li className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                              Scan the Cricket Panga QR code
                            </li>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <li className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                              Pay{" "}
                              <span className="font-bold text-blue-700">
                                ₹49
                              </span>{" "}
                              using UPI, net banking, or cards
                            </li>
                            <li className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                              Get{" "}
                              <span className="font-bold text-blue-700">
                                ₹99
                              </span>{" "}
                              credited to your wallet at launch
                            </li>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <li className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                              Create your fantasy cricket teams
                            </li>
                            <li className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                              Join contests and win cash prizes
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button
                asChild
                className="bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 group"
              >
                <Link
                  href="#early-access"
                  className="text-white inline-flex items-center gap-2"
                >
                  Get Started Now{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
