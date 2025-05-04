'use client';

import { LockKeyhole } from 'lucide-react';
import { SignupForm } from '@/components/auth/signup-form';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-orange-50 py-10">
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8 bg-white p-8 md:p-10 shadow-lg rounded-xl border border-gray-100">
          <div>
            <div className="flex items-center justify-center space-x-2">
              <LockKeyhole className="h-6 w-6 text-blue-600" />
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Create Account
              </h2>
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your details to get started. It's quick and easy!
            </p>
          </div>

          <SignupForm />
        </div>
      </main>
    </div>
  );
}
