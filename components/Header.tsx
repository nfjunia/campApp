"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import churchLogo from "../public/photos/logo-removebg-preview.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useRouter();
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 30) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`w-full fixed transition-all duration-200 left-0 px-5 right-0 ${
        blur ? "backdrop-blur-sm bg-white/50" : "bg-white"
      } z-20 top-0 h-[70px] border `}
    >
      <div className="w-full flex items-center h-full  mx-auto justify-between max-w-[1300px]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src={churchLogo}
              className="object-cover w-[45px] h-[45px]"
              alt="church_app_logo"
            />
            <span className="font-bold">HWMI CAMP</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button className="relative cursor-pointer">
            {" "}
            <Bell />
            <span className="absolute w-[7px] top-0.5 right-1 h-[7px] rounded-full bg-red-600"></span>
          </button>
          <div className="cursor-pointer flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none cursor-pointer gap-2.5">
                <div className="flex">
                  <Avatar>
                    <AvatarFallback className="font-semibold">
                      PT
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="font-light text-[15px] hidden lg:block">
                  Pastor Tutu
                </span>
                <ChevronDown size={15} className=" hidden lg:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>+233531942973</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigate.push("/")}
                  className="flex hover:text-red-600 cursor-pointer hover:bg-red-600/25 items-center gap-2.5"
                >
                  <LogOut />
                  <span>LogOut</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
