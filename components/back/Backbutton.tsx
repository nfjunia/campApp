"use client";
import { useTheme } from "@/context/Theme";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Backbutton = ({ title }: { title: string }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div
      className={`w-full  fixed top-0 ${
        theme === "dark" ? "bgcolor2" : "bgcolorr"
      }  ${
        pathName === "/web/home/profile" ? "z-10" : "z-30"
      } right-0 left-0 px-4 flex items-center justify-between h-[80px] border-gray-100`}
    >
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer font-bold text-xl items-center gap-2"
      >
        <ChevronLeft color="#3399FF" /> <span>{title}</span>
      </button>
    </div>
  );
};

export default Backbutton;
