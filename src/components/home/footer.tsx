import Image from "next/image";
import Link from "next/link";
import {
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-5">
      <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-full transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/Logo.svg"
                  alt="Cricket Panga Logo"
                  width={40}
                  height={40}
                  className="h-8 w-8 md:h-10 md:w-10"
                />
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Cricket Panga
                </span>
                <div className="text-xs text-orange-400">India Edition</div>
              </div>
            </Link>
            <p className="text-xs md:text-sm">
              India's first honest fantasy sports platform. Create your dream
              team with players from IPL, Team India, WPL, and all Indian
              cricket leagues! Limited to 1 lakh users only.
            </p>
            <div className="mt-2 py-1 md:py-2 px-3 md:px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg inline-block">
              <p className="text-xs md:text-sm font-bold">
                Scan Karo, Pay Karo, Join Karo.
              </p>
            </div>
            <div className="flex gap-3 md:gap-4">
              {/* <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Facebook</span>
              </Link> */}
              <Link
                href="https://www.linkedin.com/company/pintude-solutions/"
                className="hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://x.com/PinTudeSoln"
                className="hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.instagram.com/hellopintude/"
                className="hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.youtube.com/@hellopintude"
                className="hover:text-white transition-colors"
              >
                <Youtube className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>

            <div className="pt-3 md:pt-4 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-blue-400 mt-0.5" />
                <span className="text-xs md:text-sm">
                  Flat No. J-9, Feira Alta Apartments, Gaunsa Vaddo, Mapusa,
                  Bardez, Goa – 403507, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                <span className="text-xs md:text-sm">+91 82373 58619</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                <span className="text-xs md:text-sm">social@pintude.biz</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  About Us
                </Link>
              </li> */}
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  How It Works
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Refer & Earn
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  IPL Fantasy
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-white">
              Support
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              {/* <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Help Center
                </Link>
              </li> */}
              <li>
                <Link
                  href="#faq"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  FAQs
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Contact Us
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Responsible Play
                </Link>
              </li> */}
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-white transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:space-y-4">
            {/*<h3 className="text-base md:text-lg font-semibold text-white">
              Download App
            </h3>
            <p className="text-xs md:text-sm">
              Get the Cricket Panga app for the ultimate fantasy cricket
              experience on your mobile device.
            </p>
            <div className="flex flex-col gap-2 md:gap-3">
              <Link
                href="#"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="/google-play.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={45}
                  className="h-auto w-28 md:w-36"
                />
              </Link>
              <Link
                href="#"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="/app-store.png"
                  alt="Download on the App Store"
                  width={150}
                  height={45}
                  className="h-auto w-28 md:w-36"
                />
              </Link>
            </div> */}

            <div className="pt-3 md:pt-4">
              <h4 className="text-xs md:text-sm font-semibold mb-2">
                We Accept
              </h4>
              <div className="flex flex-wrap gap-2">
                <img src="/upi-icon.svg" alt="UPI" className="h-5 md:h-6" />
                <img src="/paytm-icon.svg" alt="Paytm" className="h-5 md:h-6" />
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
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 border-t border-gray-800 pt-4 md:pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-center">
            <p className="text-[10px] md:text-xs text-center md:text-left">
              © {new Date().getFullYear()} Cricket Panga. All rights reserved.
            </p>
            <p className="text-[10px] md:text-xs text-center md:text-right">
              18+ only. Fantasy sports involves financial risk and may be
              addictive. Not available in Andhra Pradesh, Assam, Odisha,
              Telangana, Nagaland and Sikkim.
            </p>
          </div>

          {/* <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              href="#"
              className="text-[10px] md:text-xs hover:text-white transition-colors"
            >
              Legality
            </Link>
            <Link
              href="#"
              className="text-[10px] md:text-xs hover:text-white transition-colors"
            >
              Responsible Gaming
            </Link>
            <Link
              href="#"
              className="text-[10px] md:text-xs hover:text-white transition-colors"
            >
              Self-Exclusion
            </Link>
            <Link
              href="#"
              className="text-[10px] md:text-xs hover:text-white transition-colors"
            >
              Fair Play
            </Link>
            <Link
              href="#"
              className="text-[10px] md:text-xs hover:text-white transition-colors"
            >
              Security
            </Link>
            <Link
              href="#"
              className="text-[10px] md:text-xs hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
