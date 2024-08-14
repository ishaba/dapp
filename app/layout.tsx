import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transactions Explorer App",
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
        {children}
        <div className="text-xs opacity-50 p-4 text-center">&copy; 2024 TransactionsExplorer</div>
      </body>
    </html>
  );
}
