import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import Footer from "@/components/Footer";


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
        
      <CartProvider>
      {children}
    </CartProvider>       
    <Footer /> 
      </body>
    </html>
  );
}
