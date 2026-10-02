import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'RIVIOKET — Premium Jewelry & Fine Bijoux',
  description: 'Exquisite fine jewelry, gold chains, solitaire rings, artisan bracelets, necklaces, luxury watches, and fine bijoux.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#0B0A08] text-[#F5F1E8]">
        {children}
      </body>
    </html>
  );
}
