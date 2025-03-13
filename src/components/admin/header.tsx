"use client"
import { useRouter } from 'next/navigation';
import { Trophy, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminHeader() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('admin-mobile-menu');
      const button = document.getElementById('admin-menu-button');
      if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Create Match', href: '/admin/create-match' },
    { name: 'Add Players', href: '/admin/add-players' },
  ];

  return (
    <header className="bg-white shadow-sm md:sticky w-full top-0 md:z-10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center space-x-2"
            >
              <Trophy className="h-8 w-8 text-black" />
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="admin-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-black transition-colors relative z-[999]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Sliding from right */}
        <div
          id="admin-mobile-menu"
          className={`fixed top-0 right-0 h-full w-64 bg-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        //   style={{ marginTop: '64px' }}
        >
          <div className="flex flex-col py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.href);
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-black hover:bg-gray-50 transition-colors px-6 py-3 text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black z-20 bg-opacity-50 transition-opacity md:hidden"
            // style={{ marginTop: '64px' }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}