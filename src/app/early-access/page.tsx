 
// app/login/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/home/ui/button";
 import React, { ChangeEvent, FormEvent } from 'react';

// Reminder: Keep this list updated based on current legal regulations for online gaming in India.

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

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

const [userData, setUserData] = useState({
  name: "",
  referral: "",
  phone: "",
  state: ""
});

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setUserData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setFormSubmitted(true);
};


  const handlePaymentComplete = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      // Send data to the API endpoint
      const response = await fetch("https://cricket-web-app-backend.vercel.app/api/earlyaccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phonenumber: userData.phone,
          name: userData.name,
          state: userData.state,
          paid: true,
          referral: userData.referral,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      // If successful, redirect to WhatsApp
      const whatsappNumber = "8237358618"; // Replace with your actual number
      const message = encodeURIComponent("Hi, I've made the payment for Cricket Panga. Here's my screenshot.");
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
      
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage( "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-orange-50 my-10">


      {/* Form Section */}
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8 bg-white p-8 md:p-10 shadow-lg rounded-xl border border-gray-100">
          {!formSubmitted ? (
            <>
              <div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                  Join <span className="text-blue-700">Cricket Panga</span>
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Enter your details to get started. It's quick and easy!
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-5 rounded-md ">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g., Virat Kohli"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>
                 
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Select Your State
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={userData.state}
                      onChange={handleInputChange}
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
                </div>
 <div>
                    <label
                      htmlFor="referral"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Referral Id
                    </label>
                    <input
                      id="referral"
                      name="referral"
                      type="text"
                      placeholder="e.g., XYZ123   (Optional)"
                      value={userData.referral}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded transition duration-150 ease-in-out"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      & confirm I am 18+ and reside in a permitted state.
                    </label>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
                    disabled={!agreed}
                  >
                    Continue to Play
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6">
              <h2 className="text-center text-2xl font-bold text-gray-900">
                Complete Your Registration
              </h2>
              <div className="text-center mb-4">
                <p className="text-gray-700">Hi {userData.name}, you're almost there!</p>
                <p className="text-gray-700 mt-2">Pay ₹49 to activate your Cricket Panga account</p>
                <p className="text-sm text-gray-500 mt-1">Scan the QR code below to make payment</p>
              </div>
              
              <div className="border-4 border-blue-100 p-3 rounded-lg bg-white">
                {/* QR Code Image - Replace with actual QR code */}
                <Image 
                  src="/qr-code.png" 
                  alt="Payment QR Code"
                  width={200}
                  height={200}
                  className="mx-auto"
                  // If you don't have an actual QR code image yet, use placeholder
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/200/200";
                  }}
                />
              </div>
              
              <div className="text-center">
                <p className="font-medium text-gray-800">Amount: ₹49 only</p>
                <p className="text-sm text-gray-600 mt-1">After payment, click the button below</p>
              </div>
              
              {errorMessage && (
                <div className="w-full px-4 py-3 rounded-md bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm text-center">{errorMessage}</p>
                </div>
              )}
              
              <Button
                onClick={handlePaymentComplete}
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
              >
                {isSubmitting ? "Processing..." : "I've Made Payment - Send Screenshot"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Your account will be activated after payment verification.
                Screenshot will be sent via WhatsApp for faster verification.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}