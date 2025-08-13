import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const AttendanceEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full text-center">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-blue-500" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No Attendance Records
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            You have not yet been recorded for camp meeting attendance. Click
            the button below to record your attendance.
          </p>
        </CardContent>
      </Card>
      <Button className="mt-6 w-full h-12 absolute cursor-pointer  bg-[#73D468] hover:bg-[#73D468]/90 text-white py-3 rounded-lg transition-colors">
        Record Attendance
      </Button>
    </div>
  );
};
export default AttendanceEmptyState;
