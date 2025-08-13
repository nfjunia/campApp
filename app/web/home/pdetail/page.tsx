"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Button } from "@/components/ui/button";
import {
  Camera,
  ChevronLeft,
  Edit3,
  Save,
  User,
  MapPin,
  Church,
  Phone,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Backbutton from "@/components/back/Backbutton";
import FullScreenCountrySelect from "@/components/FullScreenCountrySelect";
import { format } from "date-fns";
import { useTheme } from "@/context/Theme";

interface ProfileData {
  firstName: string;
  otherName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  office: string;
  residentialAddress: string;
  isHerald: string;
  referrer: string;
  dateOfBirth: string;
  gender: string;
  network: string;
  maritalStatus: string;
  country: string;
  region: string;
}

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("1990-01-01"));
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const { theme } = useTheme();
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    otherName: "Michael",
    lastName: "Doe",
    phoneNumber: "+233 24 123 4567",
    email: "john.doe@example.com",
    office: "Elder",
    residentialAddress: "123 Main Street, East Legon",
    isHerald: "true",
    referrer: "",
    dateOfBirth: "1990-01-01",
    gender: "male",
    network: "grace haven",
    maritalStatus: "married",
    country: "Ghana",
    region: "Greater Accra",
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        style: {
          background: "#30961c",
          color: "white",
        },
      });
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header */}
      <Backbutton title="Profile Details" />

      {/* Content */}
      <div className="pt-20 overflow-y-auto scrollbar-hide scroll-smooth pb-24 px-4">
        {/* Profile Header */}
        <div className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="bg-[#3399FF]/15 text-[#3399FF] text-2xl">
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 bg-[#3399FF] text-white p-2 rounded-full">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold">
                {profileData.firstName} {profileData.otherName}{" "}
                {profileData.lastName}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{profileData.email}</p>
              <div className="flex gap-3 mt-3">
                {profileData.isHerald === "true" && (
                  <Badge className="bg-[#3399FF]/15 text-[#3399FF]">
                    Herald
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="text-[#3399FF] border-[#3399FF]"
                >
                  {profileData.office}
                </Badge>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center cursor-pointer gap-1 text-[#3399FF] font-medium"
                >
                  {isEditing ? <X size={18} /> : <Edit3 size={18} />}
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Personal Information */}
        <Card className="mb-6 p-3">
          <CardHeader>
            <CardTitle className="flex  items-center gap-2 text-lg">
              <div className="bg-[#3399FF]/15 p-2.5 rounded-full">
                <User size={20} className="text-[#3399FF]" />
              </div>
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">First Name</Label>
                {isEditing ? (
                  <Input
                    value={profileData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1">{profileData.firstName}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium">Last Name</Label>
                {isEditing ? (
                  <Input
                    value={profileData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1">{profileData.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium ">Other Name</Label>
              {isEditing ? (
                <Input
                  value={profileData.otherName}
                  onChange={(e) =>
                    handleInputChange("otherName", e.target.value)
                  }
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profileData.otherName || "Not provided"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium ">Gender</Label>
                {isEditing ? (
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 capitalize">{profileData.gender}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium ">Marital Status</Label>
                {isEditing ? (
                  <Select
                    value={profileData.maritalStatus}
                    onValueChange={(value) =>
                      handleInputChange("maritalStatus", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900 capitalize">
                    {profileData.maritalStatus}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium ">Date of Birth</Label>
              {isEditing ? (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between font-normal mt-1 bg-transparent"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <CalendarComponent
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
              ) : (
                <p className="mt-1 ">
                  {format(new Date(profileData.dateOfBirth), "dd/MM/yyyy")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6 p-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="bg-[#3399FF]/15 p-2.5 rounded-full">
                <Phone size={20} className="text-[#3399FF]" />
              </div>
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium ">Phone Number</Label>
              {isEditing ? (
                <Input
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profileData.phoneNumber}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium ">Email Address</Label>
              {isEditing ? (
                <Input
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                  type="email"
                />
              ) : (
                <p className="mt-1 ">{profileData.email}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className="mb-6 p-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="bg-[#3399FF]/15 p-2.5 rounded-full">
                <MapPin size={20} className="text-[#3399FF]" />
              </div>
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium ">Country</Label>
                {isEditing ? (
                  <FullScreenCountrySelect
                    value={profileData.country}
                    onChange={(val) => handleInputChange("country", val)}
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profileData.country}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium pb-1">Region</Label>
                {isEditing ? (
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
                ) : (
                  <p className="mt-1 text-gray-900">{profileData.region}</p>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium ">
                Residential Address
              </Label>
              {isEditing ? (
                <Input
                  value={profileData.residentialAddress}
                  onChange={(e) =>
                    handleInputChange("residentialAddress", e.target.value)
                  }
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profileData.residentialAddress}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Church Information */}
        <Card className="mb-6 p-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="bg-[#3399FF]/15 p-2.5 rounded-full">
                <Church size={20} className="text-[#3399FF]" />
              </div>
              Church Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium0">Herald Status</Label>
              {isEditing ? (
                <Select
                  value={profileData.isHerald}
                  onValueChange={(value) =>
                    handleInputChange("isHerald", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes, I am a Herald</SelectItem>
                    <SelectItem value="false">No, I am not a Herald</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 ">
                  {profileData.isHerald === "true"
                    ? "Yes, I am a Herald"
                    : "No, I am not a Herald"}
                </p>
              )}
            </div>

            {profileData.isHerald === "true" && (
              <>
                <div>
                  <Label className="text-sm font-medium ">
                    Office/Position
                  </Label>
                  {isEditing ? (
                    <Select
                      value={profileData.office}
                      onValueChange={(value) =>
                        handleInputChange("office", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pastor">Pastor</SelectItem>
                        <SelectItem value="elder">Elder</SelectItem>
                        <SelectItem value="deacon">Deacon</SelectItem>
                        <SelectItem value="deaconess">Deaconess</SelectItem>
                        <SelectItem value="steward">Steward</SelectItem>
                        <SelectItem value="leader">Leader</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1  capitalize">{profileData.office}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium ">Network</Label>
                  {isEditing ? (
                    <Select
                      value={profileData.network}
                      onValueChange={(value) =>
                        handleInputChange("network", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grace haven">Grace Haven</SelectItem>
                        <SelectItem value="fountain of life">
                          Fountain of Life
                        </SelectItem>
                        <SelectItem value="philadelfia">Philadelfia</SelectItem>
                        <SelectItem value="cape coast">Cape Coast</SelectItem>
                        <SelectItem value="mampong">Mampong</SelectItem>
                        <SelectItem value="barnabas">Barnabas</SelectItem>
                        <SelectItem value="knust">KNUST</SelectItem>
                        <SelectItem value="fruitful">Fruitful</SelectItem>
                        <SelectItem value="kabod">Kabod</SelectItem>
                        <SelectItem value="techiman">Techiman</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 capitalize">{profileData.network}</p>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Save Button - Only show when editing */}
        {isEditing && (
          <div
            className={`fixed left-0 px-4 ${
              theme === "dark" ? "bg-black" : "bg-white"
            } right-0 bottom-0 pb-7 pt-5 w-full`}
          >
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-[#3399FF] cursor-pointer hover:bg-[#3399FF]/90 text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
