"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  KeyRoundIcon,
  PhoneIcon,
  MapPinIcon,
  UsersIcon,
  NetworkIcon,
  ArrowUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

interface MemberCardProps {
  id: string;
  firstName: string;
  lastName: string;
  briefDetails: string;
  isKeyHolder?: boolean;
  onAssignKeyHolder: (id: string) => void;
  status?: string;
  network?: string;
  Contact?: string;
  residentialAddress?: string;
}

export default function MemberCard({
  id,
  firstName,
  lastName,
  briefDetails,
  isKeyHolder,
  onAssignKeyHolder,
  status,
  network,
  Contact,
  residentialAddress,
}: MemberCardProps) {
  return (
    <Card
      className={`w-full border-b-4 relative ${
        isKeyHolder ? "border-b-[#30961c]" : "border-b-[#4397eb]"
      } rounded-xl`}
    >
      <CardContent className="flex justify-between px-3">
        <Drawer>
          <DrawerTrigger asChild>
            <div className="flex flex-col gap-2.5 flex-grow cursor-pointer">
              <h3 className="text-[18px] font-semibold">
                {firstName} {lastName}
                {isKeyHolder && (
                     <KeyRoundIcon className="ml-2 inline-block h-5 w-5 text-[#30961c]" />
                )}
              </h3>
              <button className={` ${
                      isKeyHolder
                        ? "bg-[#30961c]/15 text-[#30961c]"
                        : "bg-[#4397eb]/15 text-[#4397eb]"
                    } rounded-full p-2.5 absolute right-3 bottom-3`}>
                <ArrowUp/>
              </button>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <h1>Office:</h1>
                  <span
                    className={`text-[12px]  py-1 px-2 rounded-xl ${
                      isKeyHolder
                        ? "bg-[#30961c]/15 text-[#30961c]"
                        : "bg-[#4397eb]/15 text-[#4397eb]"
                    } `}
                  >
                    {status}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <h1>Network:</h1>
                  <span className="text-[12px]">{network}</span>
                </div>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className=" h-full px-4 w-full">
            <DialogHeader className="mt-3">
              <DialogTitle>
                {firstName} {lastName}'s Details
              </DialogTitle>
              <DialogDescription>
                Full information about {firstName} {lastName}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Status:</span> {status || "N/A"}
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <NetworkIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Network:</span> {network || "N/A"}
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Contact:</span> {Contact || "N/A"}
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Address:</span>{" "}
                {residentialAddress || "N/A"}
              </div>
              <Separator />
            </div>
          </DrawerContent>
        </Drawer>

        {!isKeyHolder && (
          <Button
            variant="outline"
            className="rounded-md cursor-pointer"
            size="sm"
            onClick={() => onAssignKeyHolder(id)}
          >
            Assign Key Holder
          </Button>
        )}
        {isKeyHolder && (
          <Button variant="ghost" size="sm" disabled>
            Key Holder
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
