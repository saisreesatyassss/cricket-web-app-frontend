import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


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
        <div className="flex flex-col">
         
          <main className="">
            {children}
          </main>
      
        </div>
      </body>
    </html>
  );
}