"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  CheckCircle,
  Clock,
  Phone,
  Wallet,
  ChevronLeft,
  Users,
  TrendingUp,
  Eye,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import mtnLogo from "@/public/payment/MTN-Icon-Logo-Vector.svg-.png";
import vodaphone from "../../../../public/payment/Vodafone-Symbol.png";
import Backbutton from "@/components/back/Backbutton";

// Mock data for current user
const userData = {
  name: "John Doe",
  email: "john.doe@email.com",
  totalAmount: 700.0,
  paidAmount: 300.0,
  paymentHistory: [
    {
      id: 1,
      amount: 150.0,
      date: "2024-01-15",
      method: "MTN Mobile Money",
      phone: "0244123456",
      status: "Completed",
      reference: "TXN001234",
    },
    {
      id: 2,
      amount: 150.0,
      date: "2024-01-20",
      method: "Vodafone Cash",
      phone: "0244123456",
      status: "Completed",
      reference: "TXN001235",
    },
  ],
};

const registeredUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "0244567890",
    totalAmount: 700.0,
    paidAmount: 700.0,
    registrationDate: "2024-01-10",
    paymentHistory: [
      {
        id: 1,
        amount: 350.0,
        date: "2024-01-12",
        method: "MTN Mobile Money",
        status: "Completed",
        reference: "TXN002001",
      },
      {
        id: 2,
        amount: 350.0,
        date: "2024-01-15",
        method: "MTN Mobile Money",
        status: "Completed",
        reference: "TXN002002",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.b@email.com",
    phone: "0244789012",
    totalAmount: 700.0,
    paidAmount: 200.0,
    registrationDate: "2024-01-12",
    paymentHistory: [
      {
        id: 1,
        amount: 200.0,
        date: "2024-01-14",
        method: "Vodafone Cash",
        status: "Completed",
        reference: "TXN003001",
      },
    ],
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "0244345678",
    totalAmount: 700.0,
    paidAmount: 0.0,
    registrationDate: "2024-01-18",
    paymentHistory: [],
  },
];

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    (typeof registeredUsers)[0] | null
  >(null);

  const router = useRouter();

  const remainingAmount = userData.totalAmount - userData.paidAmount;
  const isFullyPaid = remainingAmount <= 0;

  // Calculate totals for registered users
  const totalRegistered = registeredUsers.length;
  const totalCollected = registeredUsers.reduce(
    (sum, user) => sum + user.paidAmount,
    0
  );
  const totalOutstanding = registeredUsers.reduce(
    (sum, user) => sum + (user.totalAmount - user.paidAmount),
    0
  );
  const fullyPaidUsers = registeredUsers.filter(
    (user) => user.paidAmount >= user.totalAmount
  ).length;

  const handlePayment = async () => {
    if (!selectedMethod || !phoneNumber || !paymentAmount) {
      alert("Please fill in all required fields");
      return;
    }
    if (Number.parseFloat(paymentAmount) > remainingAmount) {
      alert(
        `Payment amount cannot exceed remaining balance of GH₵${remainingAmount.toFixed(
          2
        )}`
      );
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(
        "Payment initiated! You will receive a prompt on your phone to complete the transaction."
      );
      setSelectedMethod("");
      setPhoneNumber("");
      setPaymentAmount("");
    }, 2000);
  };

  const getPaymentStatus = (paidAmount: number, totalAmount: number) => {
    if (paidAmount >= totalAmount) {
      return {
        status: "Fully Paid",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      };
    } else if (paidAmount > 0) {
      return {
        status: "Partial Payment",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      };
    } else {
      return {
        status: "No Payment",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    }
  };

  return (
    <div className="min-h-screen pb-[100px] bg-white w-full">
      {/* Header */}
      <Backbutton title="Payment" />

      <main className="w-full mx-auto px-4 pt-32 sm:px-6 lg:px-8 pb-8">
        {/* Your Payment Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Payment Status</h2>
          <div className="bg-white border p-3 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-[#30961c]/15 text-[#30961c] rounded-full">
                  <Wallet className="w-5 h-5" />
                </div>
                <span>Your Registration Payment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-600 font-light">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold">
                    GH₵{userData.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-light">
                    Amount Paid
                  </p>
                  <p className="text-lg font-bold text-[#30961c]">
                    GH₵{userData.paidAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-light">
                    Remaining Balance
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      isFullyPaid ? "text-[#30961c]" : "text-orange-600"
                    }`}
                  >
                    GH₵{remainingAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Badge
                  variant={isFullyPaid ? "default" : "secondary"}
                  className={
                    isFullyPaid
                      ? "bg-[#30961c] text-[#30961c]"
                      : "bg-orange-100 text-orange-700"
                  }
                >
                  {isFullyPaid ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Fully Paid
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-1" />
                      Partial Payment
                    </>
                  )}
                </Badge>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Referral Summary Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Referral Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Total Registered</p>
                    <p className="text-xl font-bold">{totalRegistered}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#30961c]" />
                  <div>
                    <p className="text-xs text-gray-600">Fully Paid</p>
                    <p className="text-xl font-bold text-[#30961c]">
                      {fullyPaidUsers}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#30961c]" />
                  <div>
                    <p className="text-xs text-gray-600">Total Collected</p>
                    <p className="text-xl font-bold text-[#30961c]">
                      GH₵{totalCollected.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-600">Outstanding</p>
                    <p className="text-xl font-bold text-orange-600">
                      GH₵{totalOutstanding.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* People You've Registered */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">People You've Registered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {registeredUsers.map((user) => {
              const remaining = user.totalAmount - user.paidAmount;
              const paymentStatus = getPaymentStatus(
                user.paidAmount,
                user.totalAmount
              );

              return (
                <div
                  key={user.id}
                  className={cn(
                    "bg-white border p-3 rounded-xl shadow-sm",
                    paymentStatus.borderColor
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <Badge
                        className={cn(
                          "text-xs",
                          paymentStatus.bgColor,
                          paymentStatus.color
                        )}
                      >
                        {paymentStatus.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Total Amount:
                        </span>
                        <span className="font-semibold">
                          GH₵{user.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Amount Paid:
                        </span>
                        <span className="font-semibold text-[#30961c]">
                          GH₵{user.paidAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Remaining:
                        </span>
                        <span
                          className={cn(
                            "font-semibold",
                            remaining > 0 ? "text-orange-600" : "text-[#30961c]"
                          )}
                        >
                          GH₵{remaining.toFixed(2)}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (user.paidAmount / user.totalAmount) * 100
                            }%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Registered: {user.registrationDate}</span>
                        <span>{user.paymentHistory.length} payments</span>
                      </div>

                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full border h-12 cursor-pointer text-black mt-2 bg-transparent"
                            onClick={() => setSelectedUser(user)}
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 mr-2" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent className="h-[80vh] pb-7">
                          <DrawerHeader>
                            <DrawerTitle>
                              {selectedUser?.name} - Payment Details
                            </DrawerTitle>
                            <DrawerDescription>
                              Registration and payment history
                            </DrawerDescription>
                          </DrawerHeader>

                          <div className="px-4 overflow-y-auto">
                            {selectedUser && (
                              <div className="space-y-4">
                                {/* User Info */}
                                <div className="p-3 border rounded-xl">
                                  <CardHeader>
                                    <CardTitle className="text-lg">
                                      Contact Information
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                          Email:
                                        </span>
                                        <span className="text-sm">
                                          {selectedUser.email}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">
                                          Phone:
                                        </span>
                                        <span className="text-sm">
                                          {selectedUser.phone}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">
                                          Registered:
                                        </span>
                                        <span className="text-sm">
                                          {selectedUser.registrationDate}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </div>

                                {/* Payment Summary */}
                                <div className="p-3 border rounded-xl">
                                  <CardHeader>
                                    <CardTitle className="text-lg">
                                      Payment Summary
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-xs text-gray-600">
                                          Total Amount
                                        </p>
                                        <p className="text-lg font-bold">
                                          GH₵
                                          {selectedUser.totalAmount.toFixed(2)}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">
                                          Amount Paid
                                        </p>
                                        <p className="text-lg font-bold text-[#30961c]">
                                          GH₵
                                          {selectedUser.paidAmount.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </div>

                                {/* Payment History */}
                                <div className="p-3 border rounded-xl">
                                  <CardHeader>
                                    <CardTitle className="text-lg">
                                      Payment History
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    {selectedUser.paymentHistory.length > 0 ? (
                                      <div className="space-y-3">
                                        {selectedUser.paymentHistory.map(
                                          (payment) => (
                                            <div
                                              key={payment.id}
                                              className="border rounded-lg p-3"
                                            >
                                              <div className="flex justify-between items-start">
                                                <div>
                                                  <p className="font-semibold">
                                                    GH₵
                                                    {payment.amount.toFixed(2)}
                                                  </p>
                                                  <p className="text-sm text-gray-600">
                                                    {payment.method}
                                                  </p>
                                                  <p className="text-xs text-gray-500">
                                                    Ref: {payment.reference}
                                                  </p>
                                                </div>
                                                <div className="text-right">
                                                  <Badge className="bg-green-100 text-[#30961c]">
                                                    {payment.status}
                                                  </Badge>
                                                  <p className="text-sm text-gray-500 mt-1">
                                                    {payment.date}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <div className="text-center py-4 text-gray-500">
                                        <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                        <p>No payments made yet</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </div>
                              </div>
                            )}
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </CardContent>
                </div>
              );
            })}
          </div>
        </div>

        {/* Your Payment Form - Only show if not fully paid */}
        {!isFullyPaid && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Make Your Payment</h2>
            <div className="bg-white border rounded-xl p-3 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-[#30961c]/15 text-[#30961c] rounded-full">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span>Complete Your Registration Payment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Select Network Provider</Label>
                  <Select
                    value={selectedMethod}
                    onValueChange={setSelectedMethod}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Choose your network provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mtn">
                        <div className="flex cursor-pointer items-center space-x-3">
                          <div className=" flex items-center justify-center text-white text-xs">
                            <Image
                              src={mtnLogo}
                              className="w-8 h-3  object-cover"
                              alt="mtn_paymet"
                            />
                          </div>
                          <span>MTN</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="vodafone">
                        <div className="flex items-center space-x-3">
                          <div className=" flex items-center justify-center text-white text-xs">
                            <Image
                              src={vodaphone}
                              className="w-8 h-5  object-cover"
                              alt="mtn_paymet"
                            />
                          </div>
                          <span>Vodafone</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+233244123456"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="amount">
                    Amount (Max: GH₵{remainingAmount.toFixed(2)})
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    max={remainingAmount}
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={
                    isProcessing ||
                    !selectedMethod ||
                    !phoneNumber ||
                    !paymentAmount
                  }
                  className="w-full bg-[#30961c] text-white"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay GH₵${paymentAmount || "0.00"}`
                  )}
                </Button>
              </CardContent>
            </div>
          </div>
        )}

        {/* Fully Paid Message */}
        {isFullyPaid && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Payment Complete!
              </h3>
              <p className="text-green-700">
                Congratulations! You have successfully completed all your
                payments. You can continue to track the payment status of people
                you've registered.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
