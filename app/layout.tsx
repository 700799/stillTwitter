import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Claude Code Tweet Dashboard',
  description: 'Post and schedule Claude Code AI agent tips to Twitter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              News Admin
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
