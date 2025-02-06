import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Food Ordering System",
  description: "Order your favorite food online!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {children}
        <footer className="text-center p-4 mt-10 text-gray-600">
          © 2025 Food Ordering System. All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}
