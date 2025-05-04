"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowRight, Check, Bot } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { TextShimmer } from "./ui/text-shimmer";
const legalGamingStates = [
  "Arunachal Pradesh",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Chandigarh",
  "Andaman and Nicobar Islands"
];
export function EarlyAccess() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    state: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  interface FormState {
    name: string;
    phone: string;
    state: string;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    
    // Clear phone error when user types
    if (id === "phone") {
      setPhoneError("");
    }
    
    setFormState((prev: FormState) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Validate phone number - accepts standard Indian mobile numbers
  const validatePhone = (phone: string): boolean => {
    // Indian phone validation - 10 digits, optionally with country code
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Validate phone before submission
    if (!validatePhone(formState.phone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      // Call the API endpoint
      const response = await fetch("https://cricket-web-app-backend.vercel.app/api/earlyaccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phonenumber: formState.phone,
          name: formState.name,
          state: formState.state,
          paid: true
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }
      
      // If successful, redirect to WhatsApp with provided number
      setIsSuccess(true);
      
      // Prepare WhatsApp redirect with the provided number
      setTimeout(() => {
        const whatsappNumber = "918237358618"; // Using the number you provided
        const message = encodeURIComponent("Hi, I've made the payment for Cricket Panga. Here's my screenshot.");
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`);
        
        // Reset form after a delay
        setTimeout(() => {
          setIsSuccess(false);
          setFormState({
            name: "",
            phone: "",
            state: "",
          });
        }, 3000);
      }, 1500);
      
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="early-access"
      className="py-12 md:py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
    >
      <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div ref={ref} className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            className={`flex flex-col justify-center space-y-4 transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get Early Access Today
              </h2>
              <p className="max-w-[600px] text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join Cricket Panga now and get exclusive benefits for Indian
                cricket fans, including our AI Team Maker worth ₹1200 for FREE!
              </p>
            </div>
            <ul className="grid gap-3">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-600 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="flex items-center text-sm sm:text-base">
                  Deposit <span> </span>
                  <TextShimmer
                    duration={1.2}
                    className="font-medium [--base-color:theme(colors.orange.500)] [--base-gradient-color:theme(colors.orange.200)] dark:[--base-color:theme(colors.orange.500)] dark:[--base-gradient-color:theme(colors.orange.200)]"
                  >
                    ₹49
                  </TextShimmer>
                  , get <span> </span>
                  <TextShimmer
                    duration={1.2}
                    className="font-medium [--base-color:theme(colors.orange.500)] [--base-gradient-color:theme(colors.orange.200)] dark:[--base-color:theme(colors.orange.500)] dark:[--base-gradient-color:theme(colors.orange.200)]"
                  >
                    ₹99
                  </TextShimmer>{" "}
                  after launch
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-600 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">
                  Early access to premium IPL contests
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-600 p-1">
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">
                  <span className="font-bold">FREE AI Team Maker</span> worth
                  ₹1200 - Launching June 1, 2025
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-600 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">
                  Lower entry fees for the first month
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-600 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">
                  Priority customer support in your language
                </span>
              </li>
            </ul>

            <div className="relative mt-4 md:mt-6 p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                Limited Time Offer!
              </div>
              <div className="flex items-center justify-between flex-nowrap space-x-2">
                {/* Pay side */}
                <div className="flex flex-nowrap items-center space-x-1">
                  <div className="text-base md:text-lg">Pay</div>
                  <div className="text-md md:text-3xl font-bold flex items-center whitespace-nowrap">
                    <TextShimmer
                      duration={1.2}
                      className="font-medium [--base-color:theme(colors.orange.500)] [--base-gradient-color:theme(colors.orange.200)] dark:[--base-color:theme(colors.orange.500)] dark:[--base-gradient-color:theme(colors.orange.200)]"
                    >
                      ₹49
                    </TextShimmer>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-md md:text-4xl font-bold shrink-0">→</div>

                {/* Get side */}
                <div className="flex flex-nowrap items-center space-x-1">
                  <div className="text-base md:text-lg">Get</div>
                  <div className="text-md md:text-3xl font-bold flex items-center whitespace-nowrap">
                    <TextShimmer
                      duration={1.2}
                      className="font-medium [--base-color:theme(colors.orange.500)] [--base-gradient-color:theme(colors.orange.200)] dark:[--base-color:theme(colors.orange.500)] dark:[--base-gradient-color:theme(colors.orange.200)]"
                    >
                      ₹99
                    </TextShimmer>{" "}
                    + AI Team Maker
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-center transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-full max-w-md space-y-4 md:space-y-6 rounded-lg bg-white p-4 md:p-6 text-gray-900 shadow-lg">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 md:py-10 space-y-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <Check className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-center">
                    Thank You!
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 text-center">
                    Your early access request has been received. We're redirecting you to WhatsApp to complete the process.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl md:text-2xl font-bold">
                      Sign Up for Early Access
                    </h3>
                    <p className="text-sm md:text-base text-gray-500">
                      Limited time offer - Get{" "}
                      <TextShimmer
                        duration={1.2}
                        className="font-medium [--base-color:theme(colors.orange.500)] [--base-gradient-color:theme(colors.orange.200)] dark:[--base-color:theme(colors.orange.500)] dark:[--base-gradient-color:theme(colors.orange.200)]"
                      >
                        ₹99
                      </TextShimmer>{" "}
                      + FREE AI Team Maker (worth ₹1200) for just{" "}
                      <TextShimmer
                        duration={1.2}
                        className="font-medium [--base-color:theme(colors.orange.500)] [--base-gradient-color:theme(colors.orange.200)] dark:[--base-color:theme(colors.orange.500)] dark:[--base-gradient-color:theme(colors.orange.200)]"
                      >
                        ₹49
                      </TextShimmer>
                    </p>
                  </div>
                  <div className="flex items-center justify-center my-3 md:my-4">
                    <div className="bg-orange-100 text-orange-700 px-3 md:px-4 py-1 md:py-2 rounded-full font-semibold text-center text-sm md:text-base">
                      Scan Karo, Pay Karo, Join Karo.
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="px-4 py-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-100 text-center">
                      {errorMessage}
                    </div>
                  )}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 md:space-y-4"
                  >
                    <div className="space-y-1 md:space-y-2">
                      <Label htmlFor="name" className="text-sm md:text-base">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="focus:border-blue-700 focus:ring-blue-700 text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <Label htmlFor="phone" className="text-sm md:text-base">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Enter your 10-digit phone number"
                        value={formState.phone}
                        onChange={handleChange}
                        pattern="(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}"
                        title="Please enter a valid Indian phone number"
                        required
                        className={`focus:border-blue-700 focus:ring-blue-700 text-sm md:text-base ${
                          phoneError ? "border-red-400 focus:border-red-600 focus:ring-red-600" : ""
                        }`}
                      />
                      {phoneError && (
                        <p className="text-xs text-red-600 mt-1">{phoneError}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Enter a valid Indian mobile number (eg: 9876543210)
                      </p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <Label htmlFor="state" className="text-sm md:text-base">
                        State
                      </Label>
                      <select
                        id="state"
                        name="state"
                        required
                        value={formState.state}
                        onChange={handleChange}
                        className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                      >
                        <option value="" disabled>
                          -- Please Select --
                        </option>
                        {legalGamingStates.map((state, index) => (
                          <option key={`${state}-${index}`} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1.5 text-xs text-gray-500">
                        Only states where participation is permitted are listed.
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 group text-sm md:text-base"
                      disabled={isSubmitting}
                    >
                      <span className="text-white inline-flex items-center gap-2">
                        {isSubmitting ? (
                          "Processing..."
                        ) : (
                          <>
                            Pay{" "}
                            <span className="font-bold text-[#ff7723]">
                              ₹49
                            </span>{" "}
                            & Get Started{" "}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                    <div className="flex flex-col items-center justify-center mt-3 md:mt-4 mb-2">
                      <div className="relative h-24 w-24 md:h-32 md:w-32 mb-2">
                        <Image
                          src="/qr-code.png"
                          alt="Scan QR Code"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-xs md:text-sm font-medium text-[#ff7723]">
                        Scan Karo, Pay Karo, Join Karo.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
                      <img
                        src="/upi-icon.svg"
                        alt="UPI"
                        className="h-5 md:h-6"
                      />
                      <img
                        src="/paytm-icon.svg"
                        alt="Paytm"
                        className="h-5 md:h-6"
                      />
                      <img
                        src="/phonepe-icon.svg"
                        alt="PhonePe"
                        className="h-5 md:h-6"
                      />
                      <img
                        src="/gpay-icon.svg"
                        alt="Google Pay"
                        className="h-5 md:h-6"
                      />
                    </div>
                    <p className="text-[10px] md:text-xs text-center text-gray-500">
                      By signing up, you agree to our Terms of Service and
                      Privacy Policy
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}