'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function PaymentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('Cricket Fan');

  useEffect(() => {
    const cookieUser = Cookies.get('userName');
    if (cookieUser) setUserName(cookieUser);
  }, []);

  const handlePaymentComplete = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      router.push("/profile");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-2xl font-bold text-center">Cricket Panga</h1>
            <p className="text-center text-blue-100 mt-1">Complete your registration</p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center justify-center space-y-6">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Complete Your Registration
            </h2>

            <div className="text-center mb-2">
              <p className="text-gray-700">Hi {userName}, you're almost there!</p>
              <p className="text-gray-700 mt-2">Pay ₹49 to activate your Cricket Panga account</p>
              <p className="text-sm text-gray-500 mt-1">Scan the QR code below to make payment</p>
            </div>

            <div className="border-4 border-blue-100 p-3 rounded-lg bg-white">
              <Image 
                src="/qr-code.png" 
                alt="Payment QR Code"
                width={200}
                height={200}
                className="mx-auto"
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

            <button
              onClick={handlePaymentComplete}
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
            >
              {isSubmitting ? "Processing..." : "I’ve Made Payment"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              Your account will be activated after payment verification.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
