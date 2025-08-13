"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRoundIcon } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import Backbutton from "@/components/back/Backbutton";

export default function RoomStatusPage() {
  const [roomMembers, setRoomMembers] = useState([
    {
      id: "1",
      firstName: "Alice",
      lastName: "Johnson",
      network: "Grace Haven",
      status: "Deaconess",
      Contact: "0531942973",
      briefDetails:
        "Joined in 2020, serves in the choir and youth ministry. Enjoys community outreach.",
      isKeyHolder: true,
      residentialAddress: "123 Main St, City",
    },
    {
      id: "2",
      firstName: "Boe",
      lastName: "William",
      status: "Elder",
      network: "Kabod",
      Contact: "0531942973",
      briefDetails:
        "A long-standing member, active in the finance committee. Known for his wisdom and guidance.",
      isKeyHolder: false,
      residentialAddress: "accra",
    },
    {
      id: "3",
      firstName: "Charlie",
      lastName: "Brown",
      network: "Fruitful",
      status: "Leader",
      Contact: "0531942973",
      briefDetails:
        "Newest member, enthusiastic about volunteering for church events. Learning guitar for worship.",
      isKeyHolder: false,
      residentialAddress: "456 Oak Ave, Town",
    },
    {
      id: "4",
      firstName: "Asare",
      lastName: "Gideon",
      status: "Steward",
      network: "Kabod",
      Contact: "0531942973",
      briefDetails:
        "Leads the Sunday school program and organizes charity drives. Passionate about children's education.",
      isKeyHolder: false,
      residentialAddress: "789 Pine Ln, Village",
    },
  ]);

  const handleAssignKeyHolder = (memberId: string) => {
    setRoomMembers((prevMembers) =>
      prevMembers.map((member) => ({
        ...member,
        isKeyHolder: member.id === memberId,
      }))
    );
  };

  const roomKeyHolder = roomMembers.find((member) => member.isKeyHolder);
  const roomKeyHolderName = roomKeyHolder
    ? `${roomKeyHolder.firstName} ${roomKeyHolder.lastName}`
    : "No one assigned";

  return (
    <div className="flex flex-col h-screen w-full pt-24 overflow-hidden">
      <Backbutton title="Room members" />
      <div className="flex-1 overflow-y-auto px-4 pb-28 scrollbar-hide scroll-smooth">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50">
          Room Status
        </h1>
        <Card className="w-full px-3 mb-6 relative mt-4 rounded-xl border-b-4 border-b-[#fc9c00]">
          <CardHeader className="flex mb-[-5px] flex-row items-center justify-between space-y-0  ">
            <CardTitle className="text-[18px] font-medium">
              Room Key Holder
            </CardTitle>
            <KeyRoundIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#fc9c00] dark:text-[#fc9c00]">
              {roomKeyHolderName}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Responsible for the room key
            </p>
          </CardContent>
          <div className="absolute flex gap-1.5 items-center text-[11px] right-3 bottom-6">
            Status:
           <span className="bg-[#fc9c00]/15 text-[#fc9c00] px-2 py-0.5 rounded-xl mr-1.5"> {roomKeyHolder?.status}</span>
          </div>
        </Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-50">
            Room Members ({roomMembers.length})
          </h2>
          <div className="grid gap-4">
            {roomMembers.map((member) => (
              <MemberCard
                key={member.id}
                id={member.id}
                firstName={member.firstName}
                lastName={member.lastName}
                briefDetails={member.briefDetails}
                isKeyHolder={member.isKeyHolder}
                onAssignKeyHolder={handleAssignKeyHolder}
                status={member.status}
                network={member.network}
                Contact={member.Contact}
                residentialAddress={member.residentialAddress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
