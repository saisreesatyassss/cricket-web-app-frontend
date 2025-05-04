import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MobileMenu } from "./mobile-menu";

export function Navmenu() {
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-8xl mx-auto flex h-16 items-center justify-between px-4 md:px-6 2xl:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/Logo.svg"
            alt="Cricket Panga Logo"
            width={130}
            height={60}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-blue-700 group-hover:text-blue-600 transition-colors">
            Cricket Panga{" "}
            <span className="text-orange-500 text-sm font-semibold">
              India Edition
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 lg:gap-8">
          <Link
            href="/#features"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:bg-blue-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:bg-blue-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            How It Works
          </Link>
          <Link
            href="/#ai-team-maker"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:bg-blue-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            AI Team Maker
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:bg-blue-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            asChild
            className="text-white hidden sm:flex bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="text-white hidden sm:flex bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-blue-200 transition-all duration-300"
          >  
            <Link href="/signup">Sign Up</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
