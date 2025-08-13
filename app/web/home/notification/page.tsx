"use client";

import {
  Bell,
  BellRing,
  Settings,
  Calendar,
  Users,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Backbutton from "@/components/back/Backbutton";
import { useTheme } from "@/context/Theme";

const Page = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col h-screen pt-20 w-full overflow-hidden">
      {/* Header */}
      <Backbutton title="Notifications" />
      <div className="w-full overflow-y-auto pt-16 scrollbar-hide pb-20 scroll-smooth mx-auto p-4">
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-[#3399FF]/15 rounded-full flex items-center justify-center">
              <Bell color="#3399FF" className="h-10 w-10" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-2">No notifications yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            You're all caught up! When there are updates about services, room
            assignments, or camp activities, they'll appear here.
          </p>
        </div>

        {/* What You'll Receive Section */}
        <div className="mb-6 w-full">
          <CardHeader>
            <CardTitle>What notifications will you receive?</CardTitle>
            <CardDescription>
              Stay informed about important camp updates and activities
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-[#3399FF] mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Service Reminders</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified 15 minutes before each service starts
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    High Priority
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Users className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Room Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Messages from your room key holder and roommate updates
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Medium Priority
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Camp Announcements</h3>
                  <p className="text-sm text-muted-foreground">
                    Important updates from camp leadership and schedule changes
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    High Priority
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Bell className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Activity Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Reminders for meals, activities, and special events
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Low Priority
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Tips Section */}
        <Card
          className={`${
            theme === "dark" ? "border" : "bg-blue-50 border-blue-200"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#3399FF]/15 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="h-4 w-4 text-[#3399FF]" />
              </div>
              <div>
                <h3
                  className={`font-medium ${
                    theme === "dark" ? "text-[#3399FF]" : "text-[#3399FF]"
                  } mb-1`}
                >
                  💡 Pro Tip
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-neutral-500" : "text-[#3399FF]"
                  }`}
                >
                  Make sure to enable push notifications in your device settings
                  to receive important camp updates even when the app is closed.
                  You can always adjust your preferences later.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Page;
