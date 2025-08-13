"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { countries as countryData } from "countries-list";
import ReactDOM from "react-dom";
import { useTheme } from "@/context/Theme";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  label?: string; // only used for accessibility
}

export default function FullScreenCountrySelect({
  value,
  onChange,
  label = "Select Country",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const countries = React.useMemo(() => {
    return Object.entries(countryData).map(([code, data]) => ({
      code,
      name: data.name,
    }));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  const selected = countries.find((c) => c.code === value);
  const { theme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={`w-full border hover:bg-transparent text-neutral-500 bg-transparent bg-none cursor-pointer h-12 shadow-0 justify-between`}
          aria-label={label}
        >
          {selected ? (
            <span className="flex items-center gap-2">
              <span className="text-xl">{getFlagEmoji(selected.code)}</span>
              {selected.name}
            </span>
          ) : (
            <span className=" flex items-center gap-2">Select a country</span>
          )}
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`w-full ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        } pt-20 h-screen flex flex-col p-0`}
      >
        <div className="flex items-center pt-20 justify-between px-4">
          <DialogTitle className="text-lg font-semibold">
            Select a country
          </DialogTitle>
        </div>

        <div className="p-4">
          <Input
            placeholder="Search country..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-hidden px-4 pb-4">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  className="w-full cursor-pointer text-left p-2 rounded flex items-center gap-3"
                  onClick={() => {
                    onChange(country.code);
                    setOpen(false);
                  }}
                >
                  <span className="text-xl">{getFlagEmoji(country.code)}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getFlagEmoji(code: string): string {
  if (!code) return "🏳️";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
