'use client';

import { LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    // Delete cookies
    Cookies.remove('authToken');
    Cookies.remove('role');
    Cookies.remove('userName');
    Cookies.remove('userId');
    Cookies.remove('referralId');

    // Optionally clear localStorage if used
    localStorage.clear();

    // Redirect to login
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition shadow disabled:opacity-60"
    >
      <LogOut className="w-4 h-4" />
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
