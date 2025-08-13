import Backbutton from "@/components/back/Backbutton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideoOff } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen w-full pb-28 overflow-hidden">
      <Backbutton title="Sermons" />

      <div className="w-full pt-36 mx-auto scrollbar-hide pb-20 scroll-smooth overflow-y-auto p-4 space-y-6">
        <div className="w-full">
          <div className="flex items-center justify-center mb-4">
            <VideoOff className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">
            No Videos Yet
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center mt-2">
            It looks like you haven't added any videos. Start by uploading or
            embedding your first video!
          </CardDescription>
        </div>
      </div>
    </div>
  );
};

export default page;
