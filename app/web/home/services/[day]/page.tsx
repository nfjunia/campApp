"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Backbutton from "@/components/back/Backbutton";

type AttendanceRecord = {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
};

type User = {
  id: string;
  name: string;
  attendance: {
    [day: string]: AttendanceRecord;
  };
};

const allUsersData: User[] = [
  {
    id: "user-1",
    name: "Solomon",
    attendance: {
      "day-1": { morning: true, afternoon: true, evening: false },
      "day-2": { morning: true, afternoon: true, evening: true },
      "day-3": { morning: false, afternoon: true, evening: true },
      "day-4": { morning: true, afternoon: true, evening: false },
      "day-5": { morning: true, afternoon: true, evening: true },
      "day-6": { morning: false, afternoon: true, evening: false },
      "day-7": { morning: true, afternoon: true, evening: false },
    },
  },
  {
    id: "user-2",
    name: "Sarah",
    attendance: {
      "day-1": { morning: false, afternoon: true, evening: true },
      "day-2": { morning: true, afternoon: true, evening: false },
      "day-3": { morning: true, afternoon: true, evening: true },
      "day-4": { morning: false, afternoon: true, evening: false },
      "day-5": { morning: false, afternoon: true, evening: true },
      "day-6": { morning: true, afternoon: true, evening: true },
      "day-7": { morning: false, afternoon: true, evening: true },
    },
  },
  {
    id: "user-3",
    name: "David",
    attendance: {
      "day-1": { morning: true, afternoon: true, evening: true },
      "day-2": { morning: false, afternoon: true, evening: false },
      "day-3": { morning: true, afternoon: false, evening: false },
      "day-4": { morning: true, afternoon: true, evening: true },
      "day-5": { morning: false, afternoon: true, evening: false },
      "day-6": { morning: false, afternoon: true, evening: true },
      "day-7": { morning: true, afternoon: true, evening: false },
    },
  },
];

const dayDisplayNames: Record<string, string> = {
  "day-1": "Day One",
  "day-2": "Day Two",
  "day-3": "Day Three",
  "day-4": "Day Four",
  "day-5": "Day Five",
  "day-6": "Day Six",
  "day-7": "Day Seven",
};

export default function ServiceDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = React.use(params); // unwrap params once here

  const displayDay =
    dayDisplayNames[day] ||
    day.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentUserAttendance, setCurrentUserAttendance] =
    useState<AttendanceRecord | null>(null);

  useEffect(() => {
    if (allUsersData.length > 0 && !selectedUserId) {
      setSelectedUserId(allUsersData[0].id);
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedUserId) {
      const user = allUsersData.find((u) => u.id === selectedUserId);
      if (user) {
        setCurrentUserAttendance(
          user.attendance[day] || {
            morning: false,
            afternoon: false,
            evening: false,
          }
        );
      }
    }
  }, [selectedUserId, day]);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Backbutton title="Attendance" />
      <div className="w-full pt-28 mb-4">
        <Select onValueChange={setSelectedUserId} value={selectedUserId || ""}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a person" />
          </SelectTrigger>
          <SelectContent>
            {allUsersData.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="w-full border-0 px-3">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {displayDay} Service Details
          </CardTitle>
          <CardDescription className="text-center">
            View your attendance for morning, afternoon, and evening services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentUserAttendance && (
            <Accordion type="single" collapsible className="w-full">
              {["morning", "afternoon", "evening"].map((time) => (
                <AccordionItem key={time} value={`${time}-service`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {time.charAt(0).toUpperCase() + time.slice(1)} Service
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center gap-2 py-2">
                      {currentUserAttendance[time as keyof AttendanceRecord] ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-600 font-medium">
                            Present
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="text-red-600 font-medium">
                            Absent
                          </span>
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
