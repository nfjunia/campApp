"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Users,
  Key,
  CheckCircle,
  Clock,
  Home,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Backbutton from "@/components/back/Backbutton";
import { useTheme } from "@/context/Theme";

const Page = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { theme, toggleTheme } = useTheme();

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const router = useRouter();

  {
    /**change the attendance answer  from "Attendance is automatically tracked when you check in to each service using the app. Make sure to check in within the first 15 minutes of each service. If you miss checking in, contact a camp leader to manually mark your attendance.", and make that the attendance will be recorded at the entrance of the auditorium through face scan or barcode */
  }
  const faqItems = [
    {
      id: "room-keys",
      question: "How do room keys work?",
      answer:
        "Each room has 4 members, and one person is designated as the key holder. The key holder is responsible for managing room access and helping roommates with any room-related issues. You can see who holds your room key in the 'My Room' section of the app.",
    },

    {
      id: "attendance",
      question: "How is attendance marked for services?",
      answer:
        "Attendance is automatically tracked when you check in to each service using the app. Make sure to check in within the first 15 minutes of each service. If you miss checking in, contact a camp leader to manually mark your attendance.",
    },
    {
      id: "roommate-issues",
      question: "What if I have issues with my roommates?",
      answer:
        "First, try to resolve the issue directly with your roommates. If that doesn't work, contact your room key holder for assistance. For serious issues, reach out to camp leadership through the support contact options below.",
    },
    {
      id: "lost-access",
      question: "What if I can't access my room?",
      answer:
        "Contact your room key holder immediately. If they're unavailable, reach out to camp staff through the emergency contact number provided during check-in, or use the support contact form below.",
    },
    {
      id: "schedule-changes",
      question: "How will I know about schedule changes?",
      answer:
        "All schedule updates and announcements will be pushed through the app notifications. Make sure you have notifications enabled. You can also check the 'Schedule' section for the most up-to-date information.",
    },
    {
      id: "technical-issues",
      question: "The app isn't working properly. What should I do?",
      answer:
        "Try closing and reopening the app first. If issues persist, check your internet connection. For ongoing technical problems, use the support form below or contact our technical support team.",
    },
  ];

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header */}
      <Backbutton title="Help & Support" />
      <div className="w-full pt-36 mx-auto scrollbar-hide pb-20 scroll-smooth overflow-y-auto p-4 space-y-6">
        {/* Getting Started Guide */}
        <Card className="p-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Essential information for new campers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  1
                </Badge>
                <div>
                  <h4 className="font-medium">Check Your Room Assignment</h4>
                  <p className="text-sm text-muted-foreground">
                    Go to 'My Room' to see your roommates and identify your room
                    key holder.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  2
                </Badge>
                <div>
                  <h4 className="font-medium">Enable Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Turn on push notifications to receive important updates and
                    schedule changes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  3
                </Badge>
                <div>
                  <h4 className="font-medium">Check In to Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the 'Check In' button when you arrive at each service
                    for attendance tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  4
                </Badge>
                <div>
                  <h4 className="font-medium">Connect with Roommates</h4>
                  <p className="text-sm text-muted-foreground">
                    Introduce yourself to your roommates and exchange contact
                    information.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="p-3">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {faqItems.map((item) => (
                <Collapsible key={item.id}>
                  <CollapsibleTrigger
                    className="flex items-center justify-between w-full p-3 text-left hover:bg-muted rounded-lg transition-colors"
                    onClick={() => toggleSection(item.id)}
                  >
                    <span className="font-medium">{item.question}</span>
                    {openSections.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="p-3">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Get in touch with our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Emergency</p>
                  <p className="text-sm text-muted-foreground">
                    (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    help@churchcamp.org
                  </p>
                </div>
              </div>
            </div>

            {/* Support Form */}
            <div className="space-y-4">
              <h3 className="font-semibold">Send us a message</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room Number</Label>
                  <Input id="room" placeholder="e.g., Room 101" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full bg-[#3399FF] cursor-pointer text-white hover:bg-[#3399FF] md:w-auto">
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Information */}
        <Card
          className={`border text-red-800  p-3 ${
            theme === "dark" ? "bg-red-600/15" : "bg-red-50"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-xl">Emergency Information</CardTitle>
            <h1>Important contacts for urgent situations</h1>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Medical Emergency:</strong> Call 911 immediately
              </p>
              <p>
                <strong>Camp Emergency Line:</strong> (555) 123-4567
              </p>
              <p>
                <strong>Camp Director:</strong> Available 24/7 at (555) 987-6543
              </p>
              <p className="text-sm mt-3">
                For non-emergency issues, please use the support form above or
                contact regular support channels.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Page;
