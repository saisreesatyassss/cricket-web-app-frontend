"use client"

import { useRouter } from "next/navigation"
import { Trophy, Menu, X, User, LogIn } from "lucide-react"
import { useState, useEffect } from "react"

export default function UserHeader() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    // Function to get a cookie value by name
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split(";")
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split("=")
        if (cookieName === name) {
          return cookieValue
        }
      }
      return null
    }

    // Check for auth token in cookies
    const authToken = getCookie("authToken")
    setIsLoggedIn(!!authToken)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("user-mobile-menu")
      const button = document.getElementById("user-menu-button")
      if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navigation = [
    { name: "Matches", href: "/matches" },
    { name: "My Teams", href: "/my-teams" },
    { name: "Leaderboard", href: "/leaderboard" },
  ]

  const handleAuthAction = () => {
    if (isLoggedIn) {
      
      router.push("/profile")
    } else {
      
      router.push("/login")
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm md:sticky w-full top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => router.push("/")} className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-black" />
              <span className="text-xl font-bold text-gray-900">Cricket Fantasy</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className="text-gray-600 hover:text-black transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleAuthAction}
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isLoggedIn ? (
                <>
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="user-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-black transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Sliding from right */}
        <div
          id="user-mobile-menu"
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
          style={{ marginTop: "64px" }}
        >
          <div className="flex flex-col py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.href)
                  setIsMenuOpen(false)
                }}
                className="text-gray-600 hover:text-black hover:bg-gray-50 transition-colors px-6 py-3 text-left"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleAuthAction}
              className="flex items-center space-x-2 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors px-6 py-3"
            >
              {isLoggedIn ? (
                <>
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden"
            style={{ marginTop: "64px" }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  )
}

