"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiPlus } from "react-icons/fi";
import {
  TOTAL_AMOUNT_DUE,
  type Transaction,
  type PaymentInfo,
} from "@/lib/payment-utils";
import { TransactionDetailsSheet } from "../Tdetails";
import { Separator } from "../ui/separator";
import { FaCreditCard } from "react-icons/fa6";

interface PaymentCardProps {
  userId: string;
  userName: string;
  initialPaymentInfo: PaymentInfo;
  onUpdate: (userId: string, updatedInfo: PaymentInfo) => void;
}

export default function PaymentCard({
  userId,
  userName,
  initialPaymentInfo,
  onUpdate,
}: PaymentCardProps) {
  const router = useRouter();
  const [totalAmountPaid, setTotalAmountPaid] = useState<number>(
    initialPaymentInfo.totalAmountPaid
  );
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialPaymentInfo.transactions
  );

  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setTotalAmountPaid(initialPaymentInfo.totalAmountPaid);
    setTransactions(initialPaymentInfo.transactions);
  }, [initialPaymentInfo]);

  const handleMakePaymentClick = () => {
    router.push(`/web/home/payment-form/${userId}`);
  };

  const handleMakePayment = (amount: number, description: string) => {
    const parsedAmount = Number.parseFloat(amount.toString());
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction: Transaction = {
      id: `txn_${userId}_${Date.now()}`,
      amount: parsedAmount,
      date: new Date().toISOString().split("T")[0],
      description,
      type: "payment",
      recipient: userName !== "You" ? userName : undefined,
    };

    const updatedTransactions = [newTransaction, ...transactions];
    const updatedTotalAmountPaid = totalAmountPaid + parsedAmount;

    setTransactions(updatedTransactions);
    setTotalAmountPaid(updatedTotalAmountPaid);

    onUpdate(userId, {
      totalAmountPaid: updatedTotalAmountPaid,
      transactions: updatedTransactions,
    });

    setCustomAmount("");
  };
  const remainingAmount = TOTAL_AMOUNT_DUE - totalAmountPaid;
  const isCurrentUser = userName === "You";

  return (
    <div className="flex justify-center w-full items-center">
      <div className={`w-full text-white darkcard relative rounded-[20px] p-3`}>
        <CardHeader>
          <div className="w-full flex justify-between">
            <CardTitle className="flex items-center gap-2 text-[17px]">
              {/**  <Image src={cardIcon} alt="cardIcon" className="h-6 w-6" /> */}
              <FaCreditCard size={25} />
              {isCurrentUser ? "My Card" : `${userName}'s Card`}
            </CardTitle>
            <div className="flex items-center justify-between">
              <div className="text-sm font-light">Camp Fee:</div>
              <div className="flex items-center gap-1 text-white">
                <span className="text-[16px] font-light">&#8373;</span>
                <p className="font-semibold">{TOTAL_AMOUNT_DUE.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-[11px] mt-2">Amout payed</h1>
            <div className="flex items-center gap-1.5">
              <span className="text-xl">&#8373;</span>
              <p className="font-bold text-2xl">{totalAmountPaid.toFixed(2)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-1 mt-2">
          <div className="flex items-center justify-between">
            <div className="text-sm">Outstanding balance:</div>
            <div className="flex items-center gap-1 text-white">
              <span className="text-[16px] font-light">&#8373;</span>
              <p className="font-bold">{remainingAmount.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
        <div className="py-2.5">
          <Separator />
        </div>
        <Button
          className="w-full mt-2 rounded-md hover:bg-white bg-white text-black cursor-pointer"
          onClick={handleMakePaymentClick}
        >
          <FiPlus /> Make Payment
        </Button>
      </div>

      <TransactionDetailsSheet
        transaction={selectedTransaction}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}
