"use client"
import { useState } from 'react';
import { 
  Trophy, 
  Home, 
  Users, 
  Calendar, 
  Star, 
  Wallet, 
  Settings, 
  LogOut,
  TrendingUp,
  X,
  Menu,
  User
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: "/dashboard", icon: <Home className="mr-3 h-5 w-5" />, label: "Dashboard", active: true },
    { href: "/my-bets", icon: <Star className="mr-3 h-5 w-5" />, label: "My Bets" },
    { href: "/matches", icon: <Calendar className="mr-3 h-5 w-5" />, label: "Matches" },
    { href: "/leaderboard", icon: <TrendingUp className="mr-3 h-5 w-5" />, label: "Leaderboard" },
    { href: "/teams", icon: <Users className="mr-3 h-5 w-5" />, label: "Teams" },
    { href: "/wallet", icon: <Wallet className="mr-3 h-5 w-5" />, label: "Wallet" },
  ];

  const bottomMenuItems = [
    { href: "/settings", icon: <Settings className="mr-3 h-5 w-5" />, label: "Settings" },
    { href: "/logout", icon: <LogOut className="mr-3 h-5 w-5" />, label: "Sign out" },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {/* <div className="md:hidden fixed top-4 right-4 z-20">
        <button 
          className="p-2 rounded-md text-gray-600 bg-white shadow-md hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </div> */}
      
       {mobileMenuOpen && (
              <div className="md:hidden bg-white border-b border-gray-200 py-2">
                <div className="px-4 space-y-1">
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 bg-blue-50">
                    Dashboard
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                    My Bets
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                    Wallet
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                    Profile
                  </a>
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700">Rohit Sharma</p>
                        <p className="text-sm text-gray-500">₹5,000</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                        Settings
                      </a>
                      <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
      {/* Mobile Sidebar (Slide-in) */}
      <div className={`fixed inset-0 z-10 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="relative flex flex-col w-64 h-full bg-white shadow-lg">
          {/* Logo */}
          <div className="px-4 py-5 flex items-center">
            <Trophy className="h-6 w-6 text-blue-700" />
            <span className="ml-2 text-lg font-bold text-blue-700">Cricket Panga</span>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex-1 overflow-y-auto px-4">
            <nav className="space-y-1 mt-5">
              {menuItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    item.active 
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Mobile Bottom Menu */}
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-1">
              {bottomMenuItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Semi-transparent overlay */}
        <div 
          className="absolute inset-0 bg-gray-600 opacity-50 -z-10"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 px-4 space-y-2">
              {menuItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    item.active 
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-2">
              {bottomMenuItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}