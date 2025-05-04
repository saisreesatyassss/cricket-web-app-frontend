"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "./ui/button"
import { Check } from "lucide-react"
import { Android } from "./ui/android"

export function MobileAppPreview() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <div ref={ref} className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div
            className={`flex flex-col justify-center space-y-4 transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Experience Cricket Panga on Mobile
              </h2>
              <p className="max-w-[600px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed">
                Our mobile app is coming soon! Get ready for the ultimate fantasy cricket experience on Android and iOS devices.
              </p>
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-orange-100 text-orange-700 border-orange-200 mt-2">
                <span className="font-semibold">Scan Karo, Pay Karo, Join Karo.</span>
              </div>
            </div>

            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <span className="text-sm sm:text-base">Live match updates and real-time scoring</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <span className="text-sm sm:text-base">Create teams and join contests on the go</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <span className="text-sm sm:text-base">Instant notifications for match events</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <span className="text-sm sm:text-base">Secure payments with Indian payment options</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <Button
                variant="outline"
                className="border-gray-300 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 text-sm sm:text-base flex items-center gap-2 opacity-80 relative overflow-hidden"
                disabled
              >
                <span className="absolute inset-0 bg-gray-100 opacity-50"></span>
                {/* <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.9 5c-.2 0-.3 0-.4.1l-9.5 5.4c-.4.2-.4.8 0 1l9.5 5.4c.3.2.7.1.9-.2.1-.1.1-.3.1-.4V5.7c0-.4-.3-.7-.6-.7zm3.8.4c0-.4-.3-.7-.7-.7H3.7c-.4 0-.7.3-.7.7v13.1c0 .4.3.7.7.7h17.3c.4 0 .7-.3.7-.7V5.4z" />
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<linearGradient id="qEgbNKPnXPMNLVof8H4Lwa_W2HHhrY716fb_gr1" x1="17.34" x2="17.34" y1="-4.253" y2="71.648" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#qEgbNKPnXPMNLVof8H4Lwa_W2HHhrY716fb_gr1)" d="M7.705,4.043C7.292,4.15,7,4.507,7,5.121c0,1.802,0,18.795,0,18.795S7,42.28,7,43.091	c0,0.446,0.197,0.745,0.5,0.856l20.181-20.064L7.705,4.043z"></path><linearGradient id="qEgbNKPnXPMNLVof8H4Lwb_W2HHhrY716fb_gr2" x1="20.471" x2="20.471" y1="-15.513" y2="34.417" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#qEgbNKPnXPMNLVof8H4Lwb_W2HHhrY716fb_gr2)" d="M33.237,18.36l-8.307-4.796c0,0-15.245-8.803-16.141-9.32C8.401,4.02,8.019,3.961,7.705,4.043	l19.977,19.84L33.237,18.36z"></path><linearGradient id="qEgbNKPnXPMNLVof8H4Lwc_W2HHhrY716fb_gr3" x1="20.391" x2="20.391" y1="-5.236" y2="45.289" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#qEgbNKPnXPMNLVof8H4Lwc_W2HHhrY716fb_gr3)" d="M8.417,43.802c0.532-0.308,15.284-8.825,24.865-14.357l-5.601-5.562L7.5,43.947	C7.748,44.038,8.066,44.004,8.417,43.802z"></path><linearGradient id="qEgbNKPnXPMNLVof8H4Lwd_W2HHhrY716fb_gr4" x1="30.429" x2="40.332" y1="11.68" y2="38.889" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#qEgbNKPnXPMNLVof8H4Lwd_W2HHhrY716fb_gr4)" d="M41.398,23.071c-0.796-0.429-8.1-4.676-8.1-4.676l-0.061-0.035l-5.556,5.523l5.601,5.562	c4.432-2.559,7.761-4.48,8.059-4.653C42.285,24.248,42.194,23.5,41.398,23.071z"></path>
</svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Coming Soon on</span>
                  <span className="font-semibold">Google Play</span>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="border-gray-300 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 text-sm sm:text-base flex items-center gap-2 opacity-80 relative overflow-hidden"
                disabled
              >
                <span className="absolute inset-0 bg-gray-100 opacity-50"></span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Coming Soon on</span>
                  <span className="font-semibold">App Store</span>
                </div>
              </Button>
              
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 text-sm sm:text-base mt-2 sm:mt-0"
              >
                Stay Notified
              </Button>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative flex justify-center">
              <div className="relative">
                <Android 
                  className="w-auto h-auto max-h-[500px]" 
                  src="/splash/apple-splash-828-1792.png" 
                />
                
                <div
                  className="absolute top-1/4 -right-8 sm:-right-16 bg-white rounded-lg p-2 sm:p-3 shadow-lg animate-bounce text-xs sm:text-sm"
                  style={{ animationDuration: "3s" }}
                >
                  <div className="font-medium">AI Fantasy Teams!</div>
                </div>

                <div
                  className="absolute bottom-1/4 -left-8 sm:-left-16 bg-white rounded-lg p-2 sm:p-3 shadow-lg animate-bounce text-xs sm:text-sm"
                  style={{ animationDuration: "4s", animationDelay: "1s" }}
                >
                  <div className="font-medium">₹50 Bonus!</div>
                </div>
                
                <div
                  className="absolute top-2/3 -right-12 sm:-right-20 bg-white rounded-lg p-2 sm:p-3 shadow-lg text-xs sm:text-sm"
                >
                  <div className="font-medium text-blue-600">Coming Soon!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}