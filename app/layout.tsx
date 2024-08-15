import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transactions Explorer",
  description: "Ethereum and Polygon Transactions List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <div className="p-4 text-center text-xs opacity-50">&copy; 2024 Transactions Explorer</div>
        </Providers>
      </body>
    </html>
  );
}
