import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { Transaction } from "@/lib/payment-utils";

interface TransactionDetailsSheetProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsSheet({
  transaction,
  isOpen,
  onOpenChange,
}: TransactionDetailsSheetProps) {
  if (!transaction) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Transaction Details</SheetTitle>
          <SheetDescription>
            Detailed information about this payment.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Transaction ID:</span>
            <span>{transaction.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Amount:</span>
            <span className="text-lg font-bold">
              {transaction.amount} Cedis
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Date:</span>
            <span>{transaction.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Description:</span>
            <span>{transaction.description}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Type:</span>
            <span>
              {transaction.type === "payment"
                ? "Direct Payment"
                : "Registration Payment"}
            </span>
          </div>
          {transaction.payer && (
            <div className="flex justify-between items-center">
              <span className="font-medium">Payer:</span>
              <span>{transaction.payer}</span>
            </div>
          )}
          {transaction.recipient && (
            <div className="flex justify-between items-center">
              <span className="font-medium">Recipient:</span>
              <span>{transaction.recipient}</span>
            </div>
          )}
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground mt-4">
          This is a record of a payment made. For any discrepancies, please
          contact support.
        </p>
      </SheetContent>
    </Sheet>
  );
}
