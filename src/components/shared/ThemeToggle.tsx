"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`relative flex h-5 w-12 cursor-pointer items-center justify-center space-x-3 rounded-xl ${
        theme === "dark" ? "bg-[#fff]" : "bg-[#0f172a]"
      }`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Image src="/moon.png" alt="Moon" width={14} height={14} />
      <div
        className={`absolute h-4 w-4 rounded-full ${
          theme === "dark" ? "-left-2 bg-[#0f172a]" : "right-1 bg-[#fff]"
        }`}
      />
      <Image src="/sun.png" alt="Sun" width={14} height={14} />
    </button>
  );
};

export default ThemeToggle;
