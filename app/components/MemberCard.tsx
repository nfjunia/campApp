"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  KeyRoundIcon,
  PhoneIcon,
  MapPinIcon,
  UsersIcon,
  NetworkIcon,
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
      className={`w-full border-b-4 ${
        isKeyHolder ? "border-b-[#30961c]" : "border-b-[#4397eb]"
      } rounded-xl`}
    >
      <CardContent className="flex justify-between p-3">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col flex-grow cursor-pointer">
              <h3 className="text-lg font-semibold">
                {firstName} {lastName}
                {isKeyHolder && (
                  <KeyRoundIcon className="ml-2 inline-block h-5 w-5 text-[#30961c]" />
                )}
              </h3>
              <div>
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
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
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
              <div className="flex flex-col">
                <span className="font-medium">Brief Details:</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {briefDetails}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {!isKeyHolder && (
          <Button
            variant="outline"
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
