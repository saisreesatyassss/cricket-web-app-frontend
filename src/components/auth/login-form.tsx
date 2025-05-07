'use client';

import { useState, FormEvent } from 'react';
import { Phone, Lock } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setErrorMessage('');

  try {
    const response = await fetch('https://cricket-web-app-backend.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store the token and user data in cookies with proper configuration
    Cookies.set('authToken', data.token, {
      expires: 7,
      path: '/',
      sameSite: 'lax' // Changed from 'strict' to 'lax' to allow navigation
    });
    
    Cookies.set('role', data.user.role, {
      expires: 7,
      path: '/',
      sameSite: 'lax'
    });
    
    // Also store username if available
    if (data.user.username) {
      Cookies.set('username', data.user.username, {
        expires: 7,
        path: '/',
        sameSite: 'lax'
      });
    }
    
    // Store user data in localStorage as a backup
    localStorage.setItem('userData', JSON.stringify({
      username: data.user.username,
      role: data.user.role,
      authToken: data.token
    }));
    
    console.log("User successfully logged in. Role:", data.user.role);
    console.log("Cookies set:", {
      authToken: !!data.token,
      role: data.user.role,
      username: data.user.username 
    });
    
    // Ensure cookies have time to be set
    setTimeout(() => {
      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        // Force a full page load instead of using the router
        window.location.href = "/profile";
      }
    }, 300);
    
  } catch (err) {
    console.error('Login error:', err);
    setErrorMessage(err instanceof Error ? err.message : 'Login failed');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="w-full px-4 py-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm text-center">{errorMessage}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}