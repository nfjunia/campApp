"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Backbutton from "@/components/back/Backbutton";
import { Button } from "@/components/ui/button";

const userData = {
  name: "John Doe",
  email: "john.doe@email.com",
  totalAmount: 700.0,
  paidAmount: 300.0,
  paymentHistory: [
    {
      id: 1,
      amount: 60.0,
      date: "May 29, 2025 03:55 PM",
      method: "MTN Mobile Money",
      phone: "0244123456",
      status: "Success",
      reference: "TXN001234",
    },
    {
      id: 2,
      amount: 150.0,
      date: "May 29, 2025 03:55 PM",
      method: "Vodafone Cash",
      phone: "0208765432",
      status: "Success",
      reference: "TXN001235",
    },
    {
      id: 3,
      amount: 400.0,
      date: "May 29, 2025 03:55 AM",
      method: "Vodafone Cash",
      phone: "0208765432",
      status: "Pending",
      reference: "TXN001236",
    },
    {
      id: 4,
      amount: 150.0,
      date: "May 29, 2025 03:55 PM",
      method: "Vodafone Cash",
      phone: "0208765432",
      status: "Success",
      reference: "TXN001237",
    },
  ],
};

const Page = () => {
  const [searchT, setSearchT] = useState("");
  const remainingAmount = userData.totalAmount - userData.paidAmount;
  const isFullyPaid = remainingAmount <= 0;

  const filteredTransaction = userData.paymentHistory.filter((d) =>
    d.reference.toLowerCase().includes(searchT.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen w-full pb-16 overflow-hidden">
      <Backbutton title="Transactions" />

      <div className="pt-28 overflow-y-auto scrollbar-hide scroll-smooth pb-6 px-4">
        <div className="w-full mb-4">
          <div className="w-full flex items-center relative">
            <Search className="absolute left-3" size={18} />
            <Input
              onChange={(e) => setSearchT(e.target.value)}
              placeholder="Search by Receipt Number"
              className="w-full border border-neutral-400 pl-8 rounded-md"
            />
          </div>
        </div>

        <Separator />

        {/* Payment History Header */}
        <div className={isFullyPaid ? "lg:col-span-2" : ""}>
          <CardHeader className="mb-3 mt-3">
            <CardTitle>Payment History</CardTitle>
          </CardHeader>

          {/* Transaction List with Drawers */}
          <div>
            {filteredTransaction.map((d, index) => (
              <Drawer key={index}>
                {filteredTransaction.length > 0 ? (
                  <div className="border flex items-center mb-4 justify-between p-3 cursor-pointer border-neutral-300 rounded-xl w-full">
                    <DrawerTrigger className="flex cursor-pointer w-full justify-between items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 flex items-center justify-center bg-[#30961c]/15 rounded-full">
                          <ArrowDown size={22} color="#30961c" />
                        </div>
                        <div className="text-start">
                          <h1>{d.method}</h1>
                          <p className="font-light text-xs text-neutral-400">
                            {d.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <h1 className="flex text-[#30961c] items-center">
                          + <span>&#8373;</span>
                          {d.amount}
                        </h1>
                        <p className="text-[#30961c]">{d.status}</p>
                      </div>
                    </DrawerTrigger>
                  </div>
                ) : (
                  <div className="mt-5 w-full">
                    <h1 className="font-bold text-center text-xl">
                      No Transactions Yet
                    </h1>
                    <p className="text-sm mt-2 text-center">
                      Looks like you haven’t made any transactions yet. Once you
                      do, they’ll show up here.
                    </p>
                  </div>
                )}

                {/* Drawer Content */}
                <DrawerContent className="h-full w-full pb-16 scrollbar-hide scroll-smooth overflow-y-auto">
                  <div className="mx-auto w-full">
                    <DrawerTitle className="text-center mt-4">
                      Transaction Details
                    </DrawerTitle>
                    <Separator className="mt-3" />

                    {/* Account Details */}
                    <div className="px-3 mt-6">
                      <div className="w-full p-2 shadow rounded-md">
                        <h1 className="mb-2 font-semibold">Account Details</h1>
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Amount Paid
                          </p>
                          <p className="font-bold text-[#30961c] text-sm">
                            +GH₵{d.amount}
                          </p>
                        </div>
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Transaction Date
                          </p>
                          <p className="font-light text-sm">{d.date}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="px-3 mt-6">
                      <div className="w-full p-2 shadow rounded-md">
                        <h1 className="mb-2 font-semibold">Payment Details</h1>
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            Amount
                          </p>
                          <p className="font-semibold text-sm">GH₵{d.amount}</p>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            Total
                          </p>
                          <p className="font-semibold text-sm">GH₵{d.amount}</p>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            From
                          </p>
                          <p className="font-light text-sm">{d.phone}</p>
                        </div>
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            Receipt
                          </p>
                          <p className="font-light text-sm">{d.reference}</p>
                        </div>
                      </div>
                    </div>

                    {/* Provider Info */}
                    <div className="px-3 mt-6 mb-6">
                      <div className="w-full p-2 shadow rounded-md">
                        <h1 className="mb-2 font-semibold">Account Info</h1>
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Mobile Money
                          </p>
                          <p className="font-light text-sm">{d.phone}</p>
                        </div>
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Provider
                          </p>
                          <p className="font-light text-sm">{d.method}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
