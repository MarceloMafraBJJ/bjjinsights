import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Navbar } from "@/components";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/utils/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BJJInsights | Revolução Digital",
  description: "BJJInsights, uma revolução no Jiu-Jitsu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 dark:scrollbar-track-dark_primary dark:scrollbar-thumb-dark_secondary`}
      >
        <AuthProvider>
          <Toaster />

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-white text-black dark:bg-[#0f172a] dark:text-[#ddd]">
              <div className="mx-auto px-10 md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1536px] xl:px-20">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
