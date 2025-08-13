"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Backbutton = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="w-full  fixed top-0 bgcolorr z-50 right-0 left-0 px-4 flex items-center justify-between h-[80px] border-gray-100">
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
