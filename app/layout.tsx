import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/lib/use-auth";
import { SwRegister } from "@/components/sw-register";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "A structured learning path through the molecular genetics of the nervous system — from foundational concepts to advanced mechanisms of neurological disease.",
  applicationName: "Curriculum",
  // iOS: open standalone (no Safari chrome) when added to the home screen.
  appleWebApp: {
    capable: true,
    title: "Curriculum",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
          <SwRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
