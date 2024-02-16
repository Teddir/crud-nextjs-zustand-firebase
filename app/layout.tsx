import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/next-auth.provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CRUD Nextjs 14, Zustand & Firebase",
    template: `%s - velociti-group`,
  },
  description:
    "The purpose of this interview test is to assess your skills and proficiency in front end development.",
  keywords: [
    "Firebase, Zustand, Nextjs 14",
    "Authentication Firebase, Zustand & NextAuth",
    "Zustand beginner",
    "Nextjs 14 with nextAuth",
    "Nextjs 14 combine zustand",
    "create delete update firebase",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <NextAuthProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
