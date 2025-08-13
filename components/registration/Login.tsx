"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Signup from "./Signup";
import { toast } from "sonner";
import OtpInput from "react-otp-input";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/Theme";

const schema = z.object({
  phoneNumber: z
    .string()
    .min(9, { message: "Phone number must be at least 9 digits" })
    .nonempty({ message: "Phone number is required" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [otp, setOtp] = useState("");
  const [verification, setVerification] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();
  const [timer, setTimer] = useState(36);
  const [canResend, setCanResend] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  const handleResend = () => {
    if (!canResend) return;

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtp(newOtp);

    toast.success("New OTP sent to your number", {
      position: "top-center",
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: theme === "dark" ? "white" : "black",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "12px",
      },
    });

    setTimer(36);
    setCanResend(false);
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);

    setTimeout(() => {
      setVerification(true);
      setLoading(false);

      setTimeout(() => {
        setOtp(generatedOtp);
      }, 1500);
    }, 1000);
  };

  if (signUp) return <Signup />;

  if (verification) {
    return (
      <div
        className={`w-full h-screen fixed px-5 flex ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <div className="w-full  fixed top-0 z-50 right-0 left-0 px-4 flex items-center justify-between h-[80px] border-gray-100">
          <div className="h-[90px] w-full fixed top-0 left-0 right-0 flex items-center px-3">
            <div
              onClick={() => setVerification(false)}
              className="flex font-bold gap-2.5 cursor-pointer items-center"
            >
              <ChevronLeft />
              Back
            </div>
          </div>
        </div>
        <div className="h-full w-full flex pt-28 justify-center">
          <div className="mx-auto w-full flex gap-6 justify-between rounded-md">
            <div className=" w-full relative h-full">
              <div className="p-6">
                <h1 className="font-bold text-center text-xl">
                  We've sent an SMS
                </h1>
                <p className="font-light text-center mt-2 text-sm text-neutral-500">
                  Enter the security code sent to your phone number
                </p>
              </div>

              <div className="flex flex-col gap-4 px-6">
                <div className="flex items-center justify-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    inputStyle={{
                      border: "1px solid #a3a2a2",
                      padding: "10px",
                      width: "3rem",
                      textAlign: "center",
                      borderRadius: "8px",
                    }}
                    renderSeparator={<span className="mx-1">-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>

                <Button
                  onClick={() => {
                    setLoading(true);
                    if (otp === generatedOtp) {
                      toast.success("🎉 Verified! Redirecting...", {
                        position: "top-center",
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: theme === "dark" ? "white" : "black",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "12px",
                        },
                      });
                      setTimeout(() => {
                        router.push("/web/home");
                      }, 1000);
                    } else {
                      toast.error("Incorrect OTP");
                    }
                  }}
                  className="bg-[#0fa2f7] hover:bg-[#0fa2f7] cursor-pointer text-white"
                >
                  {loading ? <span className="loader"></span> : "Verify"}
                </Button>

                <h1
                  onClick={handleResend}
                  className={`text-center font-light ${
                    canResend
                      ? "text-[#0fa2f7] cursor-pointer"
                      : "text-gray-400"
                  }`}
                >
                  Resend - 00:{timer.toString().padStart(2, "0")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full fixed top-0 bottom-0 left-0 right-0 flex ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="h-[90px] w-full fixed top-0 left-0 right-0 flex items-center px-3">
        <div
          onClick={() => setSignUp(true)}
          className="flex font-bold gap-2.5 cursor-pointer items-center"
        >
          <ChevronLeft />
          Back
        </div>
      </div>

      <div className="h-full w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full flex gap-6 justify-between h-[80%] my-auto rounded-md"
        >
          <div className="w-full relative h-full">
            <div className="p-6">
              <h1 className="font-bold text-center text-2xl">Login Account</h1>
              <p className="font-light text-center mt-2 text-sm text-neutral-500">
                You will receive a 4 digit code to verify next
              </p>
            </div>

            <div className="w-full">
              <div className="flex px-6 flex-col h-full gap-4">
                <Input
                  type="number"
                  placeholder="Enter Phone number"
                  className="w-full"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </span>
                )}

                <Button
                  type="submit"
                  className="bg-[#0fa2f7] hover:bg-[#0fa2f7] cursor-pointer text-white"
                >
                  {loading ? <span className="loader"></span> : "Continue"}
                </Button>

                <h1
                  onClick={() => setSignUp(true)}
                  className="cursor-pointer text-center font-light text-sm text-neutral-500"
                >
                  Don't have an account?{" "}
                  <span className="text-[#0fa2f7]">Create new account now</span>
                </h1>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
