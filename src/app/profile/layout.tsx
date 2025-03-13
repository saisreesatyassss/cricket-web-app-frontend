import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import UserHeader from '@/components/user/header';
import UserFooter from '@/components/user/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cricket Fantasy',
  description: 'Play fantasy cricket and win exciting prizes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <UserHeader />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <UserFooter />
        </div>
      </body>
    </html>
  );
}