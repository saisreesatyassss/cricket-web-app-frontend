'use client';

import { motion } from 'framer-motion';
import { Phone, Lock } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });
const router=useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

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
        throw new Error(data.error|| 'Login failed');
      }

      // Store the token in cookies
      Cookies.set('authToken', data.token, {
        expires: 7, // Token expires in 7 days
        secure: true, // Only send over HTTPS
        sameSite: 'strict' // Protect against CSRF
      });
      Cookies.set('role', data.user.role);
      if(data.user.role==="admin"){
        router.push("/admin")
      }else{
        router.push("/matches")
      }
      // router.push("/matches")
      console.log('Login successful:', data);
      // You can add additional success handling here (e.g., redirect)
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <motion.div
        variants={inputVariants}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <label htmlFor="phoneNumber" className="block text-sm font-medium">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>
      </motion.div>

      <motion.div
        variants={inputVariants}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-2"
      >
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm text-center"
        >
          {error}
        </motion.div>
      )}

      <motion.div
        variants={inputVariants}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </motion.div>

      <motion.div
        variants={inputVariants}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="text-sm text-center"
      >
        <a href="#" className="text-primary hover:underline">
          Forgot your password?
        </a>
      </motion.div>
    </form>
  );
}