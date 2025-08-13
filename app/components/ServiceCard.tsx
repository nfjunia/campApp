import Link from "next/link";
import { Bookmark, CheckCircle, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  icon: LucideIcon;
  dayOfWeek: string;
  href: string;
}

export function ServiceCard({
  title,
  icon: Icon,
  href,
  dayOfWeek,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="border bg-neutral-50 flex p-2.5 w-full rounded-xl"
    >
      <div className="flex w-full items-center space-x-4">
        <div className="w-10 h-10 bg-[#3399FF]/15 rounded-xl flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#3399FF]" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-[12px]">{dayOfWeek}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </Link>
  );
}
