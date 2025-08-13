export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: "payment" | "registration"; // Distinguish between direct payments and payments for registered individuals
  payer?: string; // Optional: Name of the person making the payment (if different from current user)
  recipient?: string; // Optional: Name of the person for whom the payment was made (e.g., registered user)
}

export interface PaymentInfo {
  totalAmountPaid: number;
  transactions: Transaction[];
}

// This will now store a map of userId to PaymentInfo
export type AllPaymentData = Record<string, PaymentInfo>;

const LOCAL_STORAGE_KEY = "allPaymentAppData";
export const TOTAL_AMOUNT_DUE = 700; // The total amount for each user is supposed to pay in Cedis

const initialAllPaymentData: AllPaymentData = {
  current_user: {
    totalAmountPaid: 100,
    transactions: [
      {
        id: "txn_user_001",
        amount: 0.01,
        date: "2024-07-29",
        description: "Initial service payment (You)",
        type: "payment",
      },
    ],
  },
  john_doe: {
    totalAmountPaid: 50.0,
    transactions: [
      {
        id: "txn_john_001",
        amount: 5.5,
        date: "2024-07-28",
        description: "Registration fee for John Doe",
        type: "registration",
        recipient: "John Doe",
      },
    ],
  },
  jane_smith: {
    totalAmountPaid: 20.0,
    transactions: [
      {
        id: "txn_jane_001",
        amount: 20,
        date: "2024-07-27",
        description: "Partial payment for Jane Smith",
        type: "payment",
        recipient: "Jane Smith",
      },
    ],
  },
};

export function loadAllPaymentData(): AllPaymentData {
  if (typeof window === "undefined") {
    return initialAllPaymentData;
  }
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData: AllPaymentData = JSON.parse(storedData);

      return { ...initialAllPaymentData, ...parsedData };
    }
  } catch (error) {
    console.error("Failed to load payment data from localStorage:", error);
  }
  return initialAllPaymentData;
}

export function saveAllPaymentData(data: AllPaymentData): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save payment data to localStorage:", error);
  }
}
