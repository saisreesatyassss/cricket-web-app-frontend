import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

export const isTokenExpired = (token: string | undefined) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Server-side auth check
export const checkAuth = async() => {
  const cookieStore = cookies();
  const token = (await cookieStore).get('authToken')?.value;

  if (isTokenExpired(token)) {
    redirect('/login');
  }

  return token;
};