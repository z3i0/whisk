import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Whisk — Discover Delicious Recipes",
    template: "%s | Whisk",
  },
  description:
    "Discover curated recipes from around the world, browse by cuisine or category, and follow clear step-by-step cooking directions.",
  keywords: [
    "recipes",
    "cooking",
    "food discovery",
    "meals",
    "cuisine",
    "ingredients",
    "culinary",
  ],
  openGraph: {
    title: "Whisk — Discover Delicious Recipes",
    description:
      "Discover curated recipes from around the world, browse by cuisine or category, and follow clear step-by-step cooking directions.",
    type: "website",
    siteName: "Whisk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
