import Backbutton from "@/components/back/Backbutton";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCcw, CalendarX } from "lucide-react";
import Link from "next/link";

interface Meeting {
  id: string;
  date: string;
  topic: string;
  attended: boolean;
}

{
  /**change the attendance answer  from "Attendance is automatically tracked when you check in to each service using the app. Make sure to check in within the first 15 minutes of each service. If you miss checking in, contact a camp leader to manually mark your attendance.", and make that the attendance will be recorded at the entrance of the auditorium through face scan or barcode */
}

const mockMeetings: Meeting[] = [
  {
    id: "1",
    date: "2024-07-07",
    topic: "Sunday Service: Faith & Community",
    attended: true,
  },
  {
    id: "2",
    date: "2024-07-10",
    topic: "Mid-week Bible Study: Book of John",
    attended: false,
  },
  {
    id: "3",
    date: "2024-07-14",
    topic: "Sunday Service: Love & Forgiveness",
    attended: true,
  },
  { id: "4", date: "2024-07-17", topic: "Prayer Meeting", attended: true },
  {
    id: "5",
    date: "2024-07-21",
    topic: "Sunday Service: Hope in Adversity",
    attended: false,
  },
  {
    id: "6",
    date: "2024-07-24",
    topic: "Youth Group Gathering",
    attended: true,
  },
  {
    id: "7",
    date: "2024-07-28",
    topic: "Sunday Service: The Good Shepherd",
    attended: true,
  },
  { id: "8", date: "2024-07-31", topic: "Choir Practice", attended: false },
];

export default function NotRecordedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-center dark:bg-gray-950">
      <Backbutton title="Attendance" />
      {mockMeetings.length > 0 ? (
        <div></div>
      ) : (
        <div className="w-full overflow-y-auto pt-16 scrollbar-hide pb-20 scroll-smooth mx-auto p-4">
          <div className="flex justify-center mb-6">
            <CalendarX className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Attendance Not Recorded
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-md">
            It appears your presence for the recent service meeting has not been
            recorded yet.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-10 max-w-md">
            Please ensure you were within the designated area or contact support
            if you believe this is an error.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button className="w-full" asChild>
              <Link href="/home/support">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
