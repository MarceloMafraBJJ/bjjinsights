import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Footer, Navbar, BottomBar } from "@/components/shared";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/utils/AuthProvider";
import { Toaster } from "react-hot-toast";

const raleway = Raleway({ subsets: ["latin"] });

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
        className={`${raleway.className} dark:scrollbar-track-dark_primary dark:scrollbar-thumb-dark_secondary scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300`}
      >
        <AuthProvider>
          <Toaster toastOptions={{ duration: 3000 }} />

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-primary text-default_text">
              <div className="mx-auto px-10 md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1536px] xl:px-20">
                <Navbar />
                {children}
                <Footer />
                <BottomBar />
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
