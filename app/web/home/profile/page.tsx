"use client";

import {
  ChevronLeft,
  User,
  Trash2,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoHelpCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Backbutton from "@/components/back/Backbutton";
import PullToRefresh from "react-pull-to-refresh";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/Theme";

const page = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
    return Promise.resolve();
  };
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col h-screen w-full pb-16 overflow-hidden">
      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth">
        <Backbutton title="User Profile" />
        <div
          className="absolute top-7 cursor-pointer z-20 right-6"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          )}
        </div>

        <div className="w-full min-h-screen">
          {/* Header */}
          <div className="w-full flex items-center justify-center pt-24 flex-col gap-2.5">
            <div
              className={`${
                theme === "dark" ? "bg-neutral-500" : "bg-neutral-100"
              } h-20 w-20 flex  items-center justify-center p-5 rounded-full shadow`}
            >
              <FaUserCheck size={30} />
            </div>
            <div>
              <h2 className="font-bold">Leader Solomon</h2>
              <h2 className="font-light text-sm text-center mt-1">
                +223531942973
              </h2>
            </div>
          </div>

          {/* Menu Section */}
          <div className="px-4 pt-7 w-full pb-6">
            <div
              className={`space-y-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } w-full`}
            >
              {/* Notifications */}
              <Link
                href={"/web/home/notification"}
                className="border flex p-2.5 w-full  rounded-xl"
              >
                <div className="flex w-full items-center space-x-4">
                  <div className="w-10 h-10 bg-[#3399FF]/15 rounded-xl flex items-center justify-center">
                    <IoIosNotificationsOutline className="h-5 w-5 text-[#3399FF]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold ">Notifications</h4>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>

              {/* Profile Details */}
              <Link
                href={"/web/home/pdetail"}
                className="border flex p-2.5 w-full  rounded-xl"
              >
                <div className="flex w-full items-center space-x-4">
                  <div className="w-10 h-10 bg-[#3399FF]/15 rounded-xl flex items-center justify-center">
                    <User className="h-5 w-5 text-[#3399FF]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Profile details</h4>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>

              {/* Help & Support */}
              <Link
                href={"/web/home/support"}
                className="border flex p-2.5 w-full  rounded-xl"
              >
                <div className="flex w-full items-center space-x-4">
                  <div className="w-10 h-10 bg-[#3399FF]/15 rounded-xl flex items-center justify-center">
                    <IoHelpCircleOutline className="h-5 w-5 text-[#3399FF]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Help & Support</h4>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            </div>

            {/* Danger Zone */}
            <div className="mt-4">
              <div
                onClick={() => {
                  toast.success("You’ve signed out successfully", {
                    style: {
                      backgroundColor: "#30961c",
                      color: "white",
                    },
                  });
                  router.push("/");
                }}
                className="border rounded-xl p-2 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-600/15 rounded-xl flex items-center justify-center">
                    <FiLogOut className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-600">LogOut</h4>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 pt-6 pb-10">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">App Version 2.0.1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
