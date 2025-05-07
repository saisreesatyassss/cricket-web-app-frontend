"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

export default function PaymentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('Cricket Fan');
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Check for authentication and user data
  useEffect(() => {
    console.log("Payment page mounted, checking auth...");
    
    const checkAuth = () => {
      // Try to get data from cookies first
      let token = Cookies.get('authToken');
      let username = Cookies.get('username');
      
      // If cookies don't have the data, check localStorage as fallback
      if (!token || !username) {
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const parsedData = JSON.parse(userData);
            token = token || parsedData.authToken;
            username = username || parsedData.username;
            
            // Restore cookies if they were lost during navigation
            if (parsedData.authToken && !Cookies.get('authToken')) {
              Cookies.set('authToken', parsedData.authToken, { 
                expires: 7, 
                path: '/',
                sameSite: 'lax' 
              });
            }
            
            if (parsedData.username && !Cookies.get('username')) {
              Cookies.set('username', parsedData.username, { 
                expires: 7, 
                path: '/',
                sameSite: 'lax' 
              });
            }
          }
        } catch (e) {
          console.error("Error parsing localStorage data:", e);
        }
      }
      
      console.log("Auth check - token:", !!token, "username:", username);
      
      if (username) {
        setUserName(username);
      }
      
      if (token) {
        setAuthToken(token);
        setIsLoading(false);
      } else {
        console.warn("No auth token found, redirecting to login");
        router.push("/login");
      }
    };
    
    // First check immediately
    checkAuth();
    
    // Then check again after a short delay to handle race conditions
    const timeoutId = setTimeout(checkAuth, 500);
    
    return () => clearTimeout(timeoutId);
  }, [router]);

  const handlePaymentComplete = async () => {
    console.log("Payment complete button clicked");
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      console.log("Redirecting to profile page");
      router.push("/profile");
    } catch (error) {
      console.error("Error during payment completion:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading payment page...</p>
      </div>
    );
  }


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
                className="mx-auto" />
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
              {isSubmitting ? "Processing..." : "I've Made Payment"}
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