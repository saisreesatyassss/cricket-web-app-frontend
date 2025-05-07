// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu } from "lucide-react"
// import { Button } from "./ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
// import { Badge } from "./ui/badge"

// export function MobileMenu() {
//   const [open, setOpen] = useState(false)

//   const navLinks = [
//     { href: "/#features", label: "Features" },
//     { href: "/#how-it-works", label: "How It Works" },
//     { href: "/#live-matches", label: "Live Matches", comingSoon: true },
//     // { href: "/#analytics", label: "Analytics", comingSoon: true },
//     // { href: "/#discussion-board", label: "Discussion Board", comingSoon: true },
//     // {href: "/#", label:"India's first online multi player cricket game", comingSoon: true},
//     // { href: "/#ai-team-maker", label: "AI Team Maker", comingSoon: true },
//     { href: "/#faq", label: "FAQ" },
//   ]
//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="md:hidden">
//           <Menu className="h-6 w-6" />
//           <span className="sr-only">Toggle menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="right" className="w-[300px] sm:w-[350px] pt-10 px-5">
//         <nav className="flex flex-col gap-4">
//           {navLinks.map((link) => (
//             <div key={link.href} className="flex items-center justify-between">
//               <Link
//                 href={link.href}
//                 className="text-lg font-medium py-2 hover:text-blue-700 transition-colors relative group"
//                 onClick={() => setOpen(false)}
//               >
//                 {link.label}
//                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//               {link.comingSoon && (
//                 <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border border-gray-300">
//                   Coming Soon
//                 </Badge>
//               )}
//             </div>
//           ))}
//           <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
//             <Button
//               asChild
//               className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
//             >
//               <Link href="/login" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2">
//                 Login
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
//                   <path d="M5 12h14"></path>
//                   <path d="m12 5 7 7-7 7"></path>
//                 </svg>
//               </Link>
//             </Button>
//             <Button
//               asChild
//               className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
//             >
//               <Link href="/signup" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2">
//                 Sign Up
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
//                   <path d="M5 12h14"></path>
//                   <path d="m12 5 7 7-7 7"></path>
//                 </svg>
//               </Link>
//             </Button>
//           </div>
//         </nav>
//       </SheetContent>
//     </Sheet>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import Cookies from "js-cookie"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Badge } from "./ui/badge"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = Cookies.get("authToken")
    setIsLoggedIn(!!token)
  }, [])

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#live-matches", label: "Live Matches", comingSoon: true },
    { href: "/#faq", label: "FAQ" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] pt-10 px-5">
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <div key={link.href} className="flex items-center justify-between">
              <Link
                href={link.href}
                className="text-lg font-medium py-2 hover:text-blue-700 transition-colors relative group"
                onClick={() => setOpen(false)}
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              {link.comingSoon && (
                <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border border-gray-300">
                  Coming Soon
                </Badge>
              )}
            </div>
          ))}

          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            {!isLoggedIn ? (
              <>
                <Button
                  asChild
                  className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
                >
                  <Link href="/login" onClick={() => setOpen(false)} className="text-white flex items-center justify-center gap-2">
                    Login
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
                >
                  <Link href="/signup" onClick={() => setOpen(false)} className="text-white flex items-center justify-center gap-2">
                    Sign Up
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
              >
                <Link href="/profile" onClick={() => setOpen(false)} className=" text-white flex items-center justify-center gap-2">
                  Profile
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M5.5 21h13a2.5 2.5 0 0 0-13-5 2.5 2.5 0 0 0 0 5z"></path>
                  </svg>
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
