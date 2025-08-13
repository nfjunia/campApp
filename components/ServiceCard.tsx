import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useTheme } from "@/context/Theme";

interface ServiceCardProps {
  dayNumber: string;
  dayOfWeek: string;
  slug: string;
}

export default function ServiceCard({
  dayNumber,
  dayOfWeek,
  slug,
}: ServiceCardProps) {
  const { theme } = useTheme();
  const href = `/web/home/services/${slug}`;
  return (
    <Link href={href} className="block">
      <Card
        className={`w-full h-32 flex flex-col ${
          theme === "dark" ? "border" : "bg-[#f8f8f8] border-none"
        } items-center justify-center text-center p-4 rounded-xl duration-200 cursor-pointer`}
      >
        <div className="p-3 rounded-full bg-[#3399FF]/15">
          <CalendarDays className="h-7 w-7 text-[#3399FF]" />
        </div>
        <div className="mt-[-7px]">
          <h3 className="text-[13px] font-semibold text-gray-900 dark:text-gray-50">
            {dayNumber}
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {dayOfWeek}
          </p>
        </div>
      </Card>
    </Link>
  );
}
