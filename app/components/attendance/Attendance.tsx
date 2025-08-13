import { ServiceCard } from "@/components/ServiceCard";
import { User, Calendar, CheckSquare, Heart } from "lucide-react";

const Attendance = () => {
  const services = [
    {
      id: "service-1",
      dayOfWeek: "Thursday",
      title: "Day One",
      icon: Calendar,
      href: "/service/2024-12-25",
    },
    {
      id: "service-2",
      dayOfWeek: "Friday",
      title: "Day Two",
      icon: Calendar,
      href: "/service/2024-12-26",
    },
    {
      id: "service-3",
      dayOfWeek: "Saturday",
      title: "Day Three",
      icon: Calendar,
      href: "/service/2024-12-27",
    },
    {
      id: "service-4",
      dayOfWeek: "Sunday",
      icon: Calendar,
      title: "Day Four",
      href: "/service/2024-12-28",
    },
  ];

  return (
    <div className="container mx-auto py-8 md:py-12">
      <h1 className="text-xl font-bold text-gray-800 mb-5">My Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};
export default Attendance;
