"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import churchLogo from "@/public/banner/HWogo.png";
import { Button } from "@/components/ui/button";
import churchBanner from "../../../public/banner/banner.jpg";
import { useRouter } from "next/navigation";
import { BiFoodMenu, BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdBedroomParent } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import ServiceCard from "../../../components/ServiceCard";
import { useTheme } from "@/context/Theme";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import churchLogo2 from "../../../public/banner/HWogoW.png";

const serviceDays = [
  { dayNumber: "Day One", dayOfWeek: "Thursday", slug: "day-1" },
  { dayNumber: "Day Two", dayOfWeek: "Friday", slug: "day-2" },
  { dayNumber: "Day Three", dayOfWeek: "Saturday", slug: "day-3" },
  { dayNumber: "Day Four", dayOfWeek: "Sunday", slug: "day-4" },
];

const Page = () => {
  const navigate = useRouter();
  const { theme, toggleTheme } = useTheme();
  const navigationItems = [
    {
      title: "Payment",
      description: "Manage payments and billing",
      icon: FaCreditCard,
      href: "/web/home/payment",
      available: true,
    },
    {
      title: "Food",
      description: "Room bookings and management",
      icon: BiFoodMenu,
      href: "/web/home/register",
      available: false,
    },
    {
      title: "Room",
      description: "Room bookings and management",
      icon: MdBedroomParent,
      href: "/web/home/room",
      available: true,
    },
    {
      title: "Sermons",
      description: "",
      icon: BiSolidMessageSquareDetail,
      href: "/web/home/messages",
      available: true,
      badge: "soon",
    },
  ];

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Fixed Header */}
      <div className="z-10 h-[94px] px-4 fixed top-0 right-0 left-0 w-full flex items-center justify-between">
        <div className="">
          {theme === "dark" ? (
            <Image
              src={churchLogo2}
              alt="church_logo"
              className="w-[120px] object-cover h-[60px]"
            />
          ) : (
            <Image
              src={churchLogo}
              alt="church_logo"
              className="w-[120px] object-cover h-[61px]"
            />
          )}
        </div>
        <Link href={"/web/home/profile"}>
          <Card className="border relative gap-2 p-1.5 items-center flex flex-row rounded-xl">
            <FaUser color="#808080" size={26} />
            <div className="flex flex-col">
              <h1
                className={`font-semibold text-[13px] ${
                  theme === "dark" ? "text-white" : "text-black"
                } text-start `}
              >
                Solomon,
              </h1>
              <p className="font-light text-[12px] text-neutral-500">
                Welcome Home
              </p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Scrollable Main Content */}
      <main className="flex-1 mt-[98px] pb-[150px] overflow-y-auto scrollbar-hide scroll-smooth px-4 lg:px-8">
        {/* Banner */}
        <div className="w-full">
          <Image
            src={churchBanner}
            alt="placeholder_banner"
            className="h-[160px] lg:h-[390px] rounded-xl w-full object-cover lg:object-fill"
          />
        </div>

        {/* Navigation Grid */}
        <div className="flex justify-between mt-6 flex-wrap">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;

            const content = (
              <>
                <div className="w-[70px] h-[70px] rounded-full border flex items-center justify-center transition-all relative">
                  <IconComponent size={27} color={"#3399FF"} />
                </div>
                {item.available ? (
                  ""
                ) : (
                  <Badge className="bg-yellow-500 text-[12px] absolute top-3 left-1 px-1">
                    Soon
                  </Badge>
                )}
                <span
                  className={`text-sm text-neutral-600 font-medium transition-colors text-center`}
                >
                  {item.title}
                </span>
              </>
            );

            return item.available ? (
              <Link
                href={item.href}
                key={item.title}
                className="flex flex-col items-center space-y-2 group relative"
              >
                {content}
              </Link>
            ) : (
              <div
                key={item.title}
                className="flex flex-col items-center space-y-2 group relative"
              >
                {content}
              </div>
            );
          })}
        </div>
        {/* Services Section */}
        <section className="flex-1 pt-6">
          <h2 className="text-xl font-bold mb-4">Services</h2>
          <div className="grid grid-cols-2 gap-4">
            {serviceDays.map((dayInfo) => (
              <ServiceCard
                key={dayInfo.slug}
                dayNumber={dayInfo.dayNumber}
                dayOfWeek={dayInfo.dayOfWeek}
                slug={dayInfo.slug}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Button */}
      <div
        onClick={() => navigate.push("/web/home/register")}
        className={`w-full fixed bottom-0 ${
          theme === "dark" ? "bg-black" : "bg-white"
        } py-4 px-7 z-50`}
      >
        <Button className="w-full h-13 cursor-pointer bg-[#3399FF] hover:bg-[#3399FF]/80 text-white py-3 rounded-lg transition-all group">
          <span className="flex items-center justify-center gap-2">
            Register Someone
            <ArrowRight
              size={18}
              className="opacity-80 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Page;
