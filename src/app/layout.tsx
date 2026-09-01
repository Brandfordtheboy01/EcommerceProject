import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MultiVendor Marketplace",
  description: "A premium multivendor e-commerce storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <footer className="border-t bg-muted/40 py-12 mt-16">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Safety Center</li>
                <li>Community Guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Cookies Policy</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Law Enforcement</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Install App</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>iOS App</li>
                <li>Android App</li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2026 MultiVendor Storefront. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
