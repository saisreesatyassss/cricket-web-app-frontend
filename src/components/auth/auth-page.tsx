'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';
import { LockKeyhole, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-card rounded-2xl shadow-[24px_12px_65px_-5px_rgba(0,0,0,0.37)] overflow-hidden">
        <div className="grid md:grid-cols-2 md:min-h-[600px]">
          {/* Left Column - Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 flex flex-col justify-center"
          >
            <div className="max-w-md w-full mx-auto space-y-8">
              <div className="flex items-center space-x-2 text-primary">
                <LockKeyhole className="w-6 h-6" />
                <h2 className="text-2xl font-bold">
                  {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
              </div>
              {isLogin ? <LoginForm /> : <SignupForm />}
              <div className="text-sm text-muted-foreground text-center">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative
            
            
            flex flex-col justify-center p-12 bg-black text-white overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative z-10"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-8 h-8" />
                <h3 className="text-3xl font-bold">Experience the Magic</h3>
              </div>
              <p className="text-lg mb-6 text-primary-foreground/80">
                Join our community of innovators and creators. Discover a world of
                possibilities with our cutting-edge platform.
              </p>
              <ul className="space-y-4 text-primary-foreground/80">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Advanced security features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Seamless integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>24/7 dedicated support</span>
                </li>
              </ul>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}