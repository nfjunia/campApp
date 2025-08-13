"use client";

import { useEffect, useState } from "react";
import PaymentCard from "../../../../components/paymentcard/Card";
import {
  loadAllPaymentData,
  PaymentInfo,
  saveAllPaymentData,
} from "@/lib/payment-utils";
import Backbutton from "@/components/back/Backbutton";

export default function PaymentSection() {
  const [paymentData, setPaymentData] = useState<Record<string, PaymentInfo>>(
    {}
  );

  useEffect(() => {
    const data = loadAllPaymentData();
    setPaymentData(data);
  }, []);

  const handleUpdate = (userId: string, updatedInfo: PaymentInfo) => {
    const updated = { ...paymentData, [userId]: updatedInfo };
    setPaymentData(updated);
    saveAllPaymentData(updated);
  };

  const currentUserId = "current_user";
  const currentUserPayment = paymentData[currentUserId];
  const registeredUsers = Object.entries(paymentData).filter(
    ([id]) => id !== currentUserId
  );

  return (
    <div className="flex flex-col pt-24 h-screen w-full">
      <Backbutton title="Payment" /> {/* Page title and description */}
      <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth h-full pb-36 px-4">
        {currentUserPayment && (
          <PaymentCard
            userId={currentUserId}
            userName="You"
            initialPaymentInfo={currentUserPayment}
            onUpdate={handleUpdate}
          />
        )}

        {/* Main user card (no subheading) */}

        {/* Heading + Registered People Cards */}
        {registeredUsers.length > 0 && (
          <div className="space-y-4">
            <div className="mt-12">
              <h1 className="text-lg font-bold">People You Registered</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage payments for people you've registered and track
                outstanding amounts.
              </p>
            </div>

            {registeredUsers.map(([userId, info]) => {
              const formattedName = userId
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());

              return (
                <PaymentCard
                  key={userId}
                  userId={userId}
                  userName={formattedName}
                  initialPaymentInfo={info}
                  onUpdate={handleUpdate}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
