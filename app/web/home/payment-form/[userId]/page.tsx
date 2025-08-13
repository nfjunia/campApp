"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  loadAllPaymentData,
  saveAllPaymentData,
  type Transaction,
} from "@/lib/payment-utils";
import { TransactionDetailsSheet } from "@/components/Tdetails";
import { ArrowDown, ArrowLeftIcon, CreditCard, Phone } from "lucide-react";
import Backbutton from "@/components/back/Backbutton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import mtnLogo from "../../../../../public/payment/MTN-Icon-Logo-Vector.svg-.png";
import vodaphone from "../../../../../public/payment/Vodafone-Symbol.png";
import { toast } from "sonner";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DraggableBackButton from "@/components/DraggableBackButton";
import { useParams } from "next/navigation";
import { useTheme } from "@/context/Theme";
interface PaymentFormPageProps {
  params: {
    userId: string;
  };
}

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

const Page = () => {
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [totalAmountPaid, setTotalAmountPaid] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<
    (typeof registeredUsers)[0] | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showAllTransactions, setShowAllTransactions] =
    useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    const allData = loadAllPaymentData();
    const userInfo = allData[userId];

    if (userInfo) {
      setUserName(
        userId === "current_user"
          ? "You"
          : userId
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
      );
      setTotalAmountPaid(userInfo.totalAmountPaid);
      setTransactions(userInfo.transactions);
    } else {
      router.replace("/");
    }
  }, [userId, router]);

  const handlePayment = async () => {
    if (!selectedMethod || !phoneNumber || !paymentAmount) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(
        "Payment initiated! You will receive a prompt on your phone to complete the transaction.",
        {
          position: "top-center",
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "black",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
          },
        }
      );
      router.push("/web/home");
      setSelectedMethod("");
      setPhoneNumber("");
      setPaymentAmount("");
    }, 2000);
  };

  const latestTransaction = useMemo(() => transactions[0], [transactions]);

  const displayedTransactions = showAllTransactions
    ? transactions
    : latestTransaction
    ? [latestTransaction]
    : [];

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsSheetOpen(true);
  };
  const { theme } = useTheme();

  return (
    <div className="flex flex-col h-screen w-full pb-16 overflow-hidden">
      <Backbutton title="Make Payment" />
      <div className="pt-8 overflow-y-auto scrollbar-hide scroll-smooth pb-6 px-4">
        <CardHeader className="pt-28">
          <div className="flex items-center gap-2">
            <CardTitle>Make Payment for {userName}</CardTitle>
          </div>
          <div className="pt-6">
            <div className="">
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
                  <div className="relative flex items-center mt-2">
                    <Phone className="absolute left-3 h-4 w-4 text-gray-400" />
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
                    Amount {/**(Max: GH₵{remainingAmount.toFixed(2)}) */}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!selectedMethod || !phoneNumber || !paymentAmount}
                  className="w-full bg-[#3399FF] hover:bg-[#3399FF] cursor-pointer text-white"
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
          <DraggableBackButton />
          <Separator className="my-4" />
          <div className="w-full pb-20">
            <h1 className="font-bold mb-4">Transaction History</h1>
            <div className="border flex items-center mb-4 justify-between p-3 cursor-pointer border-neutral-300 rounded-xl w-full">
              <Drawer>
                <DrawerTrigger className="flex cursor-pointer w-full justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 flex items-center justify-center bg-[#30961c]/15 rounded-full">
                      <ArrowDown size={22} color="#30961c" />
                    </div>
                    <div className="text-start">
                      <h1>MTN Mobile Money</h1>
                      <p className="font-light text-xs text-neutral-400">
                        May 29,2025 03:55 PM
                      </p>
                    </div>
                  </div>
                  <div>
                    <h1 className="flex text-[#30961c] items-center">
                      + <span>&#8373;</span>0.01
                    </h1>
                    <p className="text-[#30961c]">Success</p>
                  </div>
                </DrawerTrigger>
                <DrawerContent className="h-full w-full pb-16 overflow-y-auto">
                  <div className="mx-auto h-[250px] w-full">
                    <DrawerTitle className="text-center mt-4">
                      Transaction Details
                    </DrawerTitle>
                    <Separator className="mt-3" />
                    <div className="px-3 mt-6">
                      <div className="w-full p-2 shadow rounded-md">
                        <h1 className=" mb-2 font-semibold">Account Details</h1>
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Amount payed
                          </p>
                          <p className="font-bold text-[#30961c] text-sm">
                            +GH₵0.01
                          </p>
                        </div>
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Transaction date
                          </p>
                          <p className="font-light text-sm">June 18, 2025</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 mt-6">
                      <div className="w-full p-2 shadow rounded-md">
                        <h1 className=" mb-2 font-semibold">Payment Details</h1>
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            Amount
                          </p>
                          <p className="font-semibold text-sm">GH₵0.01</p>
                        </div>
                        <div className="py-2 w-full">
                          <Separator />
                        </div>
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            Total
                          </p>
                          <p className="font-semibold text-sm">GH₵0.01</p>
                        </div>
                        <div className="py-4 w-full">
                          <Separator />
                        </div>
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            From
                          </p>
                          <p className="font-light text-sm">0531942973</p>
                        </div>
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[13px] text-neutral-500">
                            Receipt
                          </p>
                          <p className="font-light text-sm">2JKFI8JKF</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 mt-6">
                      <div className="w-full p-2 shadow rounded-md">
                        <h1 className=" mb-2 font-semibold">Account Details</h1>
                        <div className="flex w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Mobile money
                          </p>
                          <p className="font-light text-sm">0531942973</p>
                        </div>
                        <div className="flex mt-2 w-full justify-between items-center">
                          <p className="font-light text-[12.5px] text-neutral-500">
                            Provider
                          </p>
                          <p className="font-light text-sm">Mtn</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <Link
              href={"/web/home/transaction"}
              className=" cursor-pointer bg-transparent w-full rounded-xl"
            >
              <div className="w-full flex justify-center items-center rounded-xl border border-neutral-300 cursor-pointer h-12 bg-transparent text-black">
                <span className="text-[#3399FF]">View All Transactions</span>
              </div>
            </Link>
          </div>{" "}
        </CardHeader>
      </div>
    </div>
  );
};

export default Page;
