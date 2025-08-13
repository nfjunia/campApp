"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CountryDropdown,
  CountryRegionData,
  RegionDropdown,
} from "react-country-region-selector";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Camera,
  Check,
  CheckCircle,
  ChevronLeft,
  Loader,
  Loader2,
  Scan,
  Send,
  X,
  XCircle,
} from "lucide-react";
import Login from "./Login";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { toast } from "sonner";
import "react-day-picker/style.css";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoSend } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { countries } from "countries-list";
import FullScreenCountrySelect from "../FullScreenCountrySelect";

const formSchema = z.object({
  firstName: z.string().min(4, {
    message: "First name must be at least 4 characters.",
  }),
  otherName: z.string().optional(),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  office: z.string().optional(),
  hometown: z.string().min(2, {
    message: "Hometown must be at least 2 characters.",
  }),
  residentialAddress: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  isHerald: z.string(),
  referrer: z.string().optional(),
  dateOfBirth: z.string().min(4, {
    message: "Please enter a valid date of birth.",
  }),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a valid gender.",
  }),
  network: z.string().min(2, {
    message: "Please select a network.",
  }),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    message: "Please select a valid marital status.",
  }),
  country: z.string(),
});

type ScanState = "initial" | "camera" | "scanning" | "success" | "error";
type FormData = z.infer<typeof formSchema>;

const Signup = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [scanState, setScanState] = useState<ScanState>("initial");
  const [progress, setProgress] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [step, setStep] = useState(1);
  const { handleSubmit } = useForm<FormData>();

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const clearProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const steps = [
    {
      id: 1,
      title: " Personal Information",
      description: "Basic information",
    },
    {
      id: 2,
      title: "Address & Birth",
      description: "Location and birth details",
    },
    {
      id: 3,
      title: "Church Involvement",
      description: "Share your role and where you fellowship in church.",
    },
    {
      id: 4,
      title: "Biometric Verification",
      description: "Capture your face to enable future biometric",
    },
  ];
  const startCamera = async () => {
    try {
      setScanState("camera");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setScanState("error");
    }
  };

  const startScanning = () => {
    setScanState("scanning");
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setScanState("success");
          return 100;
        }
        return prev + 3;
      });
    }, 100);
  };

  const goBack = () => {
    clearProgress();
    stopCamera();
    setScanState("initial");
    setProgress(0);
  };

  const retry = () => {
    clearProgress();
    stopCamera();
    setScanState("initial");
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      clearProgress();
      stopCamera();
    };
  }, [clearProgress, stopCamera]);
  const [currentStep, setCurrentStep] = useState(2);
  const [selected, setSelected] = useState<Date>();
  const [open, setOpen] = React.useState(false);
  const [next, setNext] = useState("1");
  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const onChangeCountry = (val: any) => {
    setCountry(val);
    if (!val) {
      setRegion("");
    }
  };

  useEffect(() => {
    const stepMap: Record<string, number> = {
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
    };
    if (stepMap[next]) {
      setCurrentStep(stepMap[next]);
    }
  }, [next]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      otherName: "",
      lastName: "",
      phoneNumber: "",
      office: "",
      residentialAddress: "",
      hometown: "",
      isHerald: "",
      referrer: "",
      dateOfBirth: "",
      gender: "male",
      email: "",
      network: "",
      country: "",
      maritalStatus: "single",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setLoading(true);
    console.log(values);
    setTimeout(() => {
      console.log("Form submitted:");
      toast.success(
        "Face Scan and registration successful.Thank you! Your identity has been verified and details recorded",
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
      setLoading(false);
      router.push("/home");
    }, 2000);
  };
  const handleSubmitForm = handleSubmit(onSubmit);

  if (signUp) {
    return <Login />;
  }

  return (
    <div className="flex flex-col h-screen bg-white w-full overflow-hidden">
      <div className="w-full fixed top-0 bg-white z-10 right-0 left-0 px-4 flex items-center h-[80px]">
        <button
          className="flex font-bold items-center gap-2"
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
            } else {
              setSignUp(true);
            }
          }}
        >
          <ChevronLeft /> Back
        </button>
      </div>

      <div className="h-full w-full flex">
        <div className=" mx-auto w-full flex gap-4 py-20 scrollbar-hide scroll-smooth overflow-y-auto justify-between h-full my-auto rounded-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-full"
            >
              <div className=" w-full h-full">
                <div className=" pt-9 px-4 mb-6">
                  <h1 className="font-bold text-xl">Sign Up For Camp 2025</h1>
                  <p className="font-light mt-2">
                    Create an account to get started
                  </p>
                </div>
                <div className="mb-6 mt-4 w-full lg:h-[8%]">
                  <div className="mb-6 flex relative items-center px-3 mt-4 w-full">
                    <div
                      className="absolute top-1/2 left-0 h-1 bg-[#30961c] transform -translate-y-1/2 z-0 transition-all duration-300 ease-in-out"
                      style={{
                        width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                      }}
                    />
                    <div className="relative w-full flex justify-between items-center">
                      {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                              s.id === 4 && scanState === "success"
                                ? "bg-[#30961c] text-white"
                                : step > s.id
                                ? "bg-[#30961c] text-white"
                                : step === s.id
                                ? "bg-[#0fa2f7] text-white"
                                : "bg-neutral-100 text-gray-500"
                            )}
                          >
                            {step > s.id ||
                            (s.id === 4 && scanState === "success") ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              s.id
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {scanState === "success" ? (
                    <div className="text-center mt-4">
                      <h1 className="text-[17px] font-semibold text-gray-900">
                        You're Successfully Registered
                      </h1>
                    </div>
                  ) : (
                    <div className="text-center mt-4">
                      <h2 className="text-[17px] font-semibold text-gray-900">
                        {steps[step - 1]?.title}
                      </h2>
                      <p className="text-sm font-light text-gray-500">
                        {steps[step - 1]?.description}
                      </p>
                    </div>
                  )}
                  <div className="w-full lg:pt-16 h-full">
                    {step === 1 && (
                      <div className="flex pb-[230px] overflow-y-auto flex-col p-6 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your first name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="otherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Other</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your other name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your last name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="fixed left-0 bg-white px-6 right-0 bottom-0 pb-7 pt-5 w-full">
                          <Button
                            onClick={() => {
                              setLoading(true);
                              setTimeout(() => {
                                setStep(2);
                                setLoading(false);
                              }, 1500);
                            }}
                            className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                          >
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              "Next"
                            )}
                          </Button>
                          <h1
                            onClick={() => setSignUp(true)}
                            className="cursor-pointer text-center mt-4 font-semibold text-black"
                          >
                            already have an account?{" "}
                            <span className="text-[#0fa2f7] underline">
                              Log in
                            </span>
                          </h1>
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="flex pb-[250px] overflow-y-auto flex-col p-6 gap-4">
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FullScreenCountrySelect
                                label="Country"
                                value={field.value}
                                onChange={(val) => {
                                  field.onChange(val);
                                  setCountry(val);
                                }}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div>
                          <Label className="mb-1.5">Region</Label>
                          <RegionDropdown
                            className="border bg-white h-20 p-2 text-[16px] text-neutral-500 rounded-md font-light shadow-xs focus-visible:border-[#0fa2f7] focus-visible:ring-ring/50 focus-visible:ring-[2px] cursor-pointer w-full"
                            country={country}
                            countryValueType="short"
                            value={region}
                            style={{
                              height: 48,
                              lineHeight: "80px",
                              paddingBottom: 10,
                              paddingTop: 10,
                              borderRadius: 12,
                              outline: "none",
                            }}
                            blankOptionLabel="No country selected"
                            onChange={(val) => setRegion(val)}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="residentialAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Residentail address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your address"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <Label className="mb-1.5">Date of birth</Label>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full justify-between font-normal"
                                  >
                                    {date
                                      ? date.toLocaleDateString()
                                      : "date of birth"}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto overflow-hidden p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                      setDate(date);
                                      setOpen(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                        <FormField
                          control={form.control}
                          name="maritalStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marital Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full border cursor-pointer">
                                    <SelectValue placeholder="Select Marital Status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="single">Single</SelectItem>
                                  <SelectItem value="married">
                                    Married
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <Label className="mb-1.5">Gender</Label>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full border cursor-pointer">
                                    <SelectValue placeholder="Select Marital Status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="fixed left-0 bg-white px-6 right-0 bottom-0 pb-7 pt-5 w-full">
                          <Button
                            onClick={() => {
                              setLoading(true);
                              setTimeout(() => {
                                setStep(3);
                                setLoading(false);
                              }, 2000);
                            }}
                            className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                          >
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              "Next"
                            )}
                          </Button>

                          <div className="flex mt-2 justify-center">
                            <button className="h-12 flex justify-center items-center w-full border border-neutral-300 rounded-xl">
                              <h1
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <ArrowLeft size={18} /> Go back
                              </h1>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="flex pb-[250px] overflow-y-auto flex-col p-6 gap-4">
                        <FormField
                          control={form.control}
                          name="isHerald"
                          render={({ field }) => (
                            <FormItem>
                              <Label>Herald status</Label>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full border cursor-pointer">
                                    <SelectValue placeholder="Are you a herald?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="true">
                                    Yes, I am a Herald
                                  </SelectItem>
                                  <SelectItem value="false">
                                    No, I am not a Herald
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {form.watch("isHerald") === "true" ? (
                          <>
                            {/* Office Select */}
                            <FormField
                              control={form.control}
                              name="office"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Office</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select office" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="pastor">
                                        Pastor
                                      </SelectItem>
                                      <SelectItem value="elder">
                                        Elder
                                      </SelectItem>
                                      <SelectItem value="deacon">
                                        Deacon
                                      </SelectItem>
                                      <SelectItem value="deaconess">
                                        Deaconess
                                      </SelectItem>
                                      <SelectItem value="steward">
                                        Steward
                                      </SelectItem>
                                      <SelectItem value="leader">
                                        Leader
                                      </SelectItem>
                                      <SelectItem value="member">
                                        Member
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Network Select */}
                            <FormField
                              control={form.control}
                              name="network"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Network</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your network" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="grace haven">
                                        Grace Haven
                                      </SelectItem>
                                      <SelectItem value="fountain of life">
                                        Fountain of Life
                                      </SelectItem>
                                      <SelectItem value="philadelfia">
                                        Philadelfia
                                      </SelectItem>
                                      <SelectItem value="cape coast">
                                        Cape Coast
                                      </SelectItem>
                                      <SelectItem value="mampong">
                                        Mampong
                                      </SelectItem>
                                      <SelectItem value="barnabas">
                                        Barnabas
                                      </SelectItem>
                                      <SelectItem value="knust">
                                        KNUST
                                      </SelectItem>
                                      <SelectItem value="fruitful">
                                        Fruitful
                                      </SelectItem>
                                      <SelectItem value="kabod">
                                        Kabod
                                      </SelectItem>
                                      <SelectItem value="techiman">
                                        Techiman
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        ) : (
                          <FormField
                            control={form.control}
                            name="referrer"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Referrer's Contact</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Phone number"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <div className="fixed left-0 bg-white px-6 right-0 bottom-0 pb-7 pt-5 w-full">
                          <Button
                            onClick={() => {
                              setLoading(true);
                              setTimeout(() => {
                                setStep(4);
                                setLoading(false);
                              }, 2000);
                            }}
                            className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                          >
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              "Next"
                            )}
                          </Button>

                          <div className="flex mt-2 justify-center">
                            <button className="h-12 flex justify-center items-center w-full border border-neutral-300 rounded-xl">
                              <h1
                                onClick={() => setStep(2)}
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <ArrowLeft size={18} /> Go back
                              </h1>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 4 && (
                      <div className="w-full h-full mx-auto">
                        <CardContent className="p-8">
                          <div className="space-y-6">
                            {scanState === "initial" && (
                              <div className="space-y-6 opacity-100 transition-opacity duration-300">
                                <div className="space-y-4">
                                  <p className="text-gray-600  text-center mt-16 text-sm">
                                    To finish your registration, we'll need to
                                    perform a quick face scan. This ensures your
                                    identity is securely verified.
                                  </p>
                                </div>
                                <div className="fixed left-0 bg-white px-6 right-0 bottom-0 pb-7 pt-5 w-full">
                                  <Button
                                    onClick={startCamera}
                                    className="w-full bg-[#0fa2f7] hover:bg-[#0fa2f7] cursor-pointer text-sm text-white py-3 rounded-lg transition-colors"
                                    size="lg"
                                  >
                                    <Camera className="w-5 h-5 mr-2" />
                                    Scan face
                                  </Button>

                                  <div className="flex mt-2 justify-center">
                                    <button className="h-12 flex justify-center items-center w-full border border-neutral-300 rounded-xl">
                                      <h1
                                        onClick={() => setStep(3)}
                                        className="flex items-center gap-2 text-sm cursor-pointer"
                                      >
                                        <ArrowLeft size={18} /> Go back
                                      </h1>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {scanState === "camera" && (
                              <div className="space-y-6 opacity-100 h-full w-full transition-opacity duration-300">
                                <div className="space-y-4">
                                  <h1 className="text-2xl font-bold text-gray-900">
                                    Position Your Face
                                  </h1>
                                  <p className="text-gray-600">
                                    Center your face in the camera view and
                                    click scan when ready.
                                  </p>
                                </div>

                                <div className="w-full h-full fixed left-0  bottom-0 z-10 bg-black top-0">
                                  {" "}
                                  <div className="absolute inset-0 w-full h-full">
                                    <div>
                                      <Button
                                        variant="default"
                                        onClick={goBack}
                                        className="w-9 h-9 absolute top-6 rounded-md cursor-pointer z-10 backdrop-blur-md bg-white/50 hover:bg-white/50 border-none gap-2 flex items-center left-3  transition-colors"
                                      >
                                        <X className="w-4 h-4" color="white" />
                                      </Button>
                                    </div>
                                    <video
                                      ref={videoRef}
                                      autoPlay
                                      playsInline
                                      muted
                                      className="w-full h-full object-cover bg-gray-100"
                                    />
                                    <DotLottieReact
                                      src="https://lottie.host/952fd5cf-886e-4c24-9e72-56baf4816f0c/cUeCXaVlvB.lottie"
                                      loop
                                      style={{
                                        background: "transparent",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        bottom: 0,
                                        right: 0,
                                      }}
                                      autoplay
                                    />
                                    <div className="w-full flex justify-center">
                                      <Button
                                        onClick={startScanning}
                                        className="flex-1 w-[95%] mx-auto cursor-pointer bg-[#0fa2f7] z-20 hover:bg-[#0fa2f7] h-11 absolute bottom-6 text-white"
                                      >
                                        <Scan className="w-4 h-4 mr-2" />
                                        Start scan
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {scanState === "scanning" && (
                              <div className="space-y-6 opacity-100 h-full w-full transition-opacity duration-300">
                                <div className="space-y-4">
                                  <h1 className="text-2xl font-bold text-gray-900">
                                    Position Your Face
                                  </h1>
                                  <p className="text-gray-600">
                                    Center your face in the camera view and
                                    click scan when ready.
                                  </p>
                                </div>

                                <div className="w-full h-full fixed left-0  bottom-0 z-10 bg-black top-0">
                                  {" "}
                                  <div className="absolute inset-0 w-full h-full">
                                    <Button
                                      variant="default"
                                      onClick={goBack}
                                      className="p-4 absolute top-6 cursor-pointer z-10 backdrop-blur-md hover:bg-white/50 border-none gap-2 flex items-center left-3 bg-white/40 transition-colors"
                                    >
                                      <X className="w-6 h-4" color="white" />
                                    </Button>
                                    <video
                                      ref={videoRef}
                                      autoPlay
                                      playsInline
                                      muted
                                      className="w-full h-full object-cover bg-gray-100"
                                    />
                                    <DotLottieReact
                                      src="https://lottie.host/952fd5cf-886e-4c24-9e72-56baf4816f0c/cUeCXaVlvB.lottie"
                                      loop
                                      style={{
                                        background: "transparent",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        bottom: 0,
                                        right: 0,
                                      }}
                                      autoplay
                                    />
                                    <div className="w-full flex justify-center">
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-black">
                                            Scanning progress
                                          </span>
                                          <span className="text-[#0fa2f7] font-medium">
                                            {Math.round(progress)}%
                                          </span>
                                        </div>
                                        <Progress
                                          value={progress}
                                          className="h-2"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {scanState === "success" && (
                              <div className="space-y-6 text-center opacity-100 transition-opacity duration-300">
                                <div className="mx-auto w-16 h-16 bg-[#30961c]/15 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-8 h-8 text-[#30961c]" />
                                </div>

                                <div className="space-y-2">
                                  <h1 className="text-xl font-bold text-gray-900">
                                    Face Captured Successfully!
                                  </h1>
                                  <p className="text-gray-600 font-light text-sm">
                                    We've successfully detected your face for
                                    future verification. You can now proceed
                                    with your registration.
                                  </p>
                                </div>
                                <div className="fixed left-0 bg-white px-6 right-0 bottom-0 pb-8 pt-5 w-full">
                                  <Button
                                    className="w-full bg-[#0fa2f7] cursor-pointer hover:bg-[#0fa2f7] text-white transition-colors"
                                    size="lg"
                                    type="button"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={loading}
                                  >
                                    {loading ? (
                                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                    ) : (
                                      <>
                                        submit
                                        <IoSend className="w-4 h-4 mr-2" />
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}

                            {scanState === "error" && (
                              <div className="space-y-6 text-center opacity-100 transition-opacity duration-300">
                                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                  <XCircle className="w-8 h-8 text-red-600" />
                                </div>

                                <div className="space-y-2">
                                  <h1 className="text-2xl font-bold text-gray-900">
                                    Scan Failed
                                  </h1>
                                  <p className="text-gray-600">
                                    We couldn't access your camera or complete
                                    the scan. Please check your camera
                                    permissions and try again.
                                  </p>
                                </div>

                                <div className="flex gap-3">
                                  <Button
                                    onClick={retry}
                                    className="flex-1 bg-[#0fa2f7] hover:bg-[#0fa2f7] text-white transition-colors"
                                  >
                                    Try Again
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={goBack}
                                    className="flex-1 bg-transparent transition-colors"
                                  >
                                    Go Back
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
