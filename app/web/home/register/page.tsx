"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegionDropdown } from "react-country-region-selector";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  Loader2,
  ChevronDownIcon,
  Camera,
  X,
  Scan,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoSend } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FullScreenCountrySelect from "@/components/FullScreenCountrySelect";
import { Switch } from "@/components/ui/switch";
import Backbutton from "@/components/back/Backbutton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/context/Theme";

const formSchema = z.object({
  firstName: z.string().min(4, {
    message: "First name must be at least 4 characters.",
  }),
  otherName: z.string().optional(),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phoneNumber: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  office: z.string().optional(),
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
  maritalStatus: z
    .enum(["single", "married", "divorced", "widowed"], {
      message: "Please select a valid marital status.",
    })
    .optional(),
  country: z.string(),
  isKid: z.boolean(),
});

type ScanState = "initial" | "camera" | "scanning" | "success" | "error";
type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [scanState, setScanState] = useState<ScanState>("initial");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { handleSubmit } = useForm<FormData>();
  const { theme } = useTheme();
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

  const steps = [
    {
      id: 1,
      title: "Personal Information",
      description: "Basic details of the person you are registering",
    },
    {
      id: 2,
      title: "Contact & Birth Details",
      description: "Phone, email, and date of birth",
    },
    {
      id: 3,
      title: "Address Information",
      description: "Residential address and hometown",
    },
    {
      id: 4,
      title: "Church Involvement",
      description: "Role and fellowship details",
    },
    {
      id: 5,
      title: "Biometric Verification",
      description: "Capture your face to enable future biometric",
    },
    {
      id: 6,
      title: "Review & Submit",
      description: "Confirm details and complete registration",
    },
  ];

  const router = useRouter();

  const form: any = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      otherName: "",
      lastName: "",
      phoneNumber: "",
      office: "",
      residentialAddress: "",
      isHerald: "",
      referrer: "",
      dateOfBirth: "",
      gender: "male",
      email: "",
      network: "",
      country: "",
      maritalStatus: "single",
      isKid: false,
    },
  });

  const isKid = form.watch("isKid");

  const onSubmit = async (values: FormData) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Form submitted:", values);
      toast.success("Registration successful! The person has been added.", {
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
      setLoading(false);
      router.push("/web/home");
    }, 2000);
  };

  const handleNextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await form.trigger([
        "firstName",
        "lastName",
        "gender",
        "isKid",
      ]);
    } else if (step === 2) {
      isValid = await form.trigger(["dateOfBirth"]);
    } else if (step === 3) {
      isValid = await form.trigger(["country", "residentialAddress"]);
    } else if (step === 4) {
      isValid = await form.trigger(["isHerald"]);

      if (form.getValues("isHerald") === "true") {
        isValid = isValid && (await form.trigger(["office", "network"]));
      } else {
        isValid = isValid && (await form.trigger(["referrer"]));
      }
    } else if (step === 5) {
      isValid = await form.trigger(["faceScan"]);
    }

    if (isValid) {
      setLoading(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setLoading(false);
      }, 500);
    }
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col h-screen w-full pb-20 overflow-hidden">
      {scanState === "scanning" ||
        (scanState === "camera" ? "" : <Backbutton title="Registration" />)}
      <div className="h-full w-full flex">
        <div className=" mx-auto w-full flex gap-4 pb-28 pt-14 scrollbar-hide scroll-smooth overflow-y-auto justify-between h-full my-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-full"
            >
              <div className=" w-full h-full">
                <div className=" pt-9 px-4 mb-6">
                  <h1 className="font-bold text-xl">Register Another Person</h1>
                  <p className="font-light mt-2">
                    Fill in the details for the person you are registering
                  </p>
                </div>
                <div className="mb-6 mt-4 w-full lg:h-[8%]">
                  <div className="mb-6 px-3 mt-4 w-full lg:h-[8%]">
                    <div className="flex items-center justify-between relative">
                      {steps.map((s, index) => (
                        <div
                          key={s.id}
                          className="flex flex-col items-center relative"
                        >
                          {/* Step Circle */}
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                              step > s.id
                                ? `bg-green-500 border-green-500 text-white`
                                : step === s.id
                                ? `bg-blue-500 border-blue-500 text-white`
                                : `${
                                    theme === "dark"
                                      ? "border bg-neutral-500 text-white"
                                      : "bg-neutral-100 text-gray-500"
                                  } `
                            )}
                          >
                            {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                          </div>
                        </div>
                      ))}
                      <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -z-10" />
                      <div
                        className="absolute top-4 left-4 h-0.5 bg-green-500 -z-10 transition-all duration-500 ease-out"
                        style={{
                          width: `calc(${
                            ((step - 1) / (steps.length - 1)) * 100
                          }% - 16px)`,
                        }}
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h2 className="text-[17px] font-semibold">
                        {steps[step - 1]?.title}
                      </h2>
                      <p className="text-sm font-light text-gray-500">
                        {steps[step - 1]?.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:pt-16 h-full">
                    {step === 1 && (
                      <div className="flex pb-[180px] overflow-y-auto flex-col p-6 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter first name"
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
                              <FormLabel>Other Name (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter other name"
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
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter last name"
                                  {...field}
                                />
                              </FormControl>
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
                                    <SelectValue placeholder="Select Gender" />
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
                        <FormField
                          control={form.control}
                          name="isKid"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Registering a child?
                                </FormLabel>
                                <FormMessage />
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div
                          className={`fixed left-0 ${
                            theme === "dark"
                              ? "bg-black text-white"
                              : "bg-white"
                          } px-6 right-0 bottom-0 pb-7 pt-5 w-full`}
                        >
                          <Button
                            onClick={handleNextStep}
                            className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              "Next"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="flex pb-[180px] overflow-y-auto flex-col p-6 gap-4">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter email address"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <Label className="mb-1.5">Date of birth</Label>
                              <Popover
                                open={isCalendarOpen}
                                onOpenChange={setIsCalendarOpen}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full justify-between font-normal bg-transparent"
                                  >
                                    {date
                                      ? date.toLocaleDateString()
                                      : "Select date of birth"}
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
                                    onSelect={(selectedDate) => {
                                      setDate(selectedDate);
                                      field.onChange(
                                        selectedDate
                                          ?.toISOString()
                                          .split("T")[0] || ""
                                      );
                                      setIsCalendarOpen(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                        {!isKid && (
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
                                    <SelectItem value="single">
                                      Single
                                    </SelectItem>
                                    <SelectItem value="married">
                                      Married
                                    </SelectItem>
                                    <SelectItem value="divorced">
                                      Divorced
                                    </SelectItem>
                                    <SelectItem value="widowed">
                                      Widowed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        <div
                          className={`fixed left-0 ${
                            theme === "dark"
                              ? "bg-black text-white"
                              : "bg-white"
                          } px-6 right-0 bottom-0 pb-7 pt-5 w-full`}
                        >
                          <Button
                            onClick={handleNextStep}
                            className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              "Next"
                            )}
                          </Button>
                          <div className="flex mt-2 justify-center">
                            <button
                              className="h-12 flex justify-center items-center w-full border border-neutral-600 rounded-xl"
                              onClick={handlePreviousStep}
                            >
                              <h1 className="flex items-center gap-2 text-sm cursor-pointer">
                                <ArrowLeft size={18} /> Go back
                              </h1>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="flex pb-[180px] overflow-y-auto flex-col p-6 gap-4">
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
                            className="border h-20 p-2 text-[16px] text-neutral-500 rounded-md font-light shadow-xs focus-visible:border-[#0fa2f7] focus-visible:ring-ring/50 focus-visible:ring-[2px] cursor-pointer w-full"
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
                              <FormLabel>Residential Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter residential address"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div
                          className={`fixed left-0 ${
                            theme === "dark"
                              ? "bg-black text-white"
                              : "bg-white"
                          } px-6 right-0 bottom-0 pb-7 pt-5 w-full`}
                        >
                          <Button
                            onClick={handleNextStep}
                            className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              "Next"
                            )}
                          </Button>
                          <div className="flex mt-2 justify-center">
                            <button
                              className="h-12 flex justify-center items-center w-full border border-neutral-600 rounded-xl"
                              onClick={handlePreviousStep}
                            >
                              <h1 className="flex items-center gap-2 text-sm cursor-pointer">
                                <ArrowLeft size={18} /> Go back
                              </h1>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 4 && (
                      <div className="flex pb-[180px] overflow-y-auto flex-col p-6 gap-4">
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
                                    <SelectValue placeholder="Is this person a herald?" />
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
                                        <SelectValue placeholder="Select network" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="my-auto">
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
                        <div
                          className={`fixed left-0 ${
                            theme === "dark"
                              ? "bg-black text-white"
                              : "bg-white"
                          } px-6 right-0 bottom-0 pb-7 pt-5 w-full`}
                        >
                          <Button
                            onClick={handleNextStep}
                            className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="loader"></span>
                            ) : (
                              "Next"
                            )}
                          </Button>
                          <div className="flex mt-2 justify-center">
                            <button
                              className="h-12 flex justify-center items-center w-full border border-neutral-600 rounded-xl"
                              onClick={handlePreviousStep}
                            >
                              <h1 className="flex items-center gap-2 text-sm cursor-pointer">
                                <ArrowLeft size={18} /> Go back
                              </h1>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 5 && (
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
                                <div
                                  className={`fixed left-0 ${
                                    theme === "dark"
                                      ? "bg-black text-white"
                                      : "bg-white"
                                  } px-6 right-0 bottom-0 pb-7 pt-5 w-full`}
                                >
                                  <Button
                                    onClick={startCamera}
                                    className="w-full bg-[#0fa2f7] hover:bg-[#0fa2f7] cursor-pointer text-sm text-white py-3 rounded-lg transition-colors"
                                    size="lg"
                                  >
                                    <Camera className="w-5 h-5 mr-2" />
                                    Scan face
                                  </Button>

                                  <div className="flex mt-2 justify-center">
                                    <button
                                      className="h-12 flex justify-center items-center w-full border border-neutral-600 rounded-xl"
                                      onClick={handlePreviousStep}
                                    >
                                      <h1 className="flex items-center gap-2 text-sm cursor-pointer">
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
                                  <h1 className="text-xl font-bold">
                                    Face Captured Successfully!
                                  </h1>
                                  <p className="text-gray-600 font-light text-sm">
                                    We've successfully detected your face for
                                    future verification. You can now proceed
                                    with your registration.
                                  </p>
                                </div>
                                <div
                                  className={`fixed left-0 ${
                                    theme === "dark"
                                      ? "bg-black text-white"
                                      : "bg-white"
                                  } px-6 right-0 bottom-0 pb-7 pt-5 w-full`}
                                >
                                  <Button
                                    onClick={handleNextStep}
                                    className="bg-[#0fa2f7] w-full hover:bg-[#0fa2f7] cursor-pointer text-white"
                                    disabled={loading}
                                  >
                                    {loading ? (
                                      <span className="loader"></span>
                                    ) : (
                                      "Next"
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
                    {step === 6 && (
                      <div className="flex pb-[240px] overflow-y-auto flex-col p-6 gap-4">
                        <CardContent className="h-full pb-24">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                              Review Details
                            </h3>
                            <div className="flex items-center justify-between gap-2 text-sm">
                              <div className="space-y-2">
                                <p className="flex flex-col">
                                  <strong className="font-semibold">
                                    First Name:
                                  </strong>{" "}
                                  <span>{form.getValues("firstName")}</span>
                                </p>
                                {form.getValues("otherName") && (
                                  <p className="flex flex-col">
                                    <strong>Other Name:</strong>{" "}
                                    {form.getValues("otherName")}
                                  </p>
                                )}
                                <p className="flex flex-col">
                                  <strong>Last Name:</strong>{" "}
                                  <span> {form.getValues("lastName")}</span>
                                </p>
                                {form.getValues("phoneNumber") && (
                                  <p className="flex flex-col">
                                    <span className="font-bold">
                                      Phone Number:
                                    </span>{" "}
                                    {form.getValues("phoneNumber")}
                                  </p>
                                )}
                                {form.getValues("email") && (
                                  <p className="flex flex-col">
                                    <span>Email:</span>{" "}
                                    {form.getValues("email")}
                                  </p>
                                )}
                                <p className="flex flex-col">
                                  <strong>Date of Birth:</strong>{" "}
                                  {date ? date.toLocaleDateString() : "N/A"}
                                </p>
                                <p className="flex flex-col">
                                  <strong>Gender:</strong>{" "}
                                  {form.getValues("gender")}
                                </p>
                                <p className="flex flex-col">
                                  <strong>Residential Address:</strong>{" "}
                                  {form.getValues("residentialAddress")}
                                </p>
                              </div>
                              <div className="space-y-2">
                                {!isKid && form.getValues("maritalStatus") && (
                                  <p className="flex flex-col">
                                    <strong>Marital Status:</strong>{" "}
                                    {form.getValues("maritalStatus")}
                                  </p>
                                )}
                                <p className="flex flex-col">
                                  <strong>Country:</strong>{" "}
                                  {form.getValues("country")}
                                </p>
                                <p className="flex flex-col">
                                  <strong>Region:</strong> {region}
                                </p>

                                <p className="flex flex-col">
                                  <strong>Is a Child:</strong>{" "}
                                  {form.getValues("isKid") ? "Yes" : "No"}
                                </p>
                                <p className="flex flex-col">
                                  <strong>Is Herald:</strong>{" "}
                                  {form.getValues("isHerald") === "true"
                                    ? "Yes"
                                    : "No"}
                                </p>
                                {form.getValues("isHerald") === "true" ? (
                                  <>
                                    {form.getValues("office") && (
                                      <p className="flex flex-col">
                                        <strong>Office:</strong>{" "}
                                        {form.getValues("office")}
                                      </p>
                                    )}
                                    {form.getValues("network") && (
                                      <p className="flex flex-col">
                                        <strong>Network:</strong>{" "}
                                        {form.getValues("network")}
                                      </p>
                                    )}
                                  </>
                                ) : (
                                  form.getValues("referrer") && (
                                    <p className="flex flex-col">
                                      <strong>Referrer's Contact:</strong>{" "}
                                      {form.getValues("referrer")}
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <div
                          className={`fixed left-0 ${
                            theme === "dark"
                              ? "bg-black text-white"
                              : "bg-white"
                          } px-6 right-0 bottom-0 pb-7 pt-5 w-full`}
                        >
                          <Button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            className="w-full bg-[#0fa2f7] hover:bg-[#0fa2f7] cursor-pointer text-white"
                            disabled={loading}
                          >
                            {loading ? (
                              <Loader2 className="animate-spin w-4 h-4 mr-2" />
                            ) : (
                              <>
                                Submit Registration
                                <IoSend className="w-4 h-4 mr-2" />
                              </>
                            )}
                          </Button>
                          <div className="flex mt-2 justify-center">
                            <button
                              className="h-12 flex justify-center items-center w-full border border-neutral-600 rounded-xl"
                              onClick={handlePreviousStep}
                            >
                              <h1 className="flex items-center gap-2 text-sm cursor-pointer">
                                <ArrowLeft size={18} /> Go back
                              </h1>
                            </button>
                          </div>
                        </div>
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

export default Page;
