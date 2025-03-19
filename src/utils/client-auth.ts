import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface JwtPayload {
  exp: number;
}

export const removeAuthCookies = () => {
  Cookies.remove('authToken');
  Cookies.remove('role');
};

export const isTokenExpired = () => {
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    return true;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(authToken);
    const currentTime = Date.now() / 1000;
    
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Client-side auth check hook
export const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (isTokenExpired()) {
        removeAuthCookies();
        router.push('/login');
      }
    };

    // Check immediately
    checkAuth();

    // Set up interval to check periodically (every minute)
    const interval = setInterval(checkAuth, 60000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [router]);
};