"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  SearchIcon,
  TrashIcon,
  ZapIcon,
  Terminal,
} from "lucide-react";

const UserHistory = () => {
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        user_id: "12345",
        name: "John Doe",
        email: "johndoe@example.com",
        history: [
          {
            command: "Search for best laptops under $1000",
            timestamp: "2025-03-06T10:15:30Z",
            status: "success",
          },
          {
            command: "Find nearest coffee shops",
            timestamp: "2025-03-06T11:00:45Z",
            status: "success",
          },
          {
            command: "Weather forecast for New York",
            timestamp: "2025-03-06T11:45:10Z",
            status: "unsuccessful",
          },
          {
            command: "Latest news on AI advancements",
            timestamp: "2025-03-06T12:30:20Z",
            status: "success",
          },
        ],
      });
    }, 500);
  }, []);

  useEffect(() => {
    if (!userData) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * userData.history.length);
      setHighlightedCard(randomIndex);

      setTimeout(() => setHighlightedCard(null), 700);
    }, 3000);

    return () => clearInterval(interval);
  }, [userData]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="">
          <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse"></div>
          <div className="flex flex-col items-center relative">
            <Terminal className="h-16 w-16 text-cyan-400 animate-pulse mb-4" />
            <div className="text-cyan-400 text-xl font-mono border border-cyan-800 p-4 bg-black">
              <span className="inline-block animate-pulse">Initializing</span>
              <span className="inline-block animate-ping delay-100">.</span>
              <span className="inline-block animate-ping delay-200">.</span>
              <span className="inline-block animate-ping delay-300">.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateForComparison = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatSelectedDateDisplay = (date) => {
    if (!date) return "Filter by date";

    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredHistory = selectedDate
    ? userData.history.filter((item) => {
        const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
        return itemDate === formatDateForComparison(selectedDate);
      })
    : userData.history;

  return (
    <div className="min-h-screen bg-black overflow-hidden text-cyan-300 p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0),rgba(0,200,255,0.05),rgba(0,0,0,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,30,40,0.8)_100%)]"></div>

      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_1px,transparent_1px,transparent_2px)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-8 border-b border-cyan-900/70 pb-4 relative">
          <div className="absolute -left-4 -top-2 h-12 w-1 bg-cyan-500 animate-pulse"></div>
          <h1 className="text-4xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent relative">
            USER::HISTORY
            <span className="absolute top-14 right-0 text-xs text-cyan-500 font-mono animate-pulse">
              [SYS.42]
            </span>
          </h1>
          <div className="flex items-center mt-2">
            <div className="h-1 w-4 bg-cyan-500 mr-2 animate-pulse"></div>
            <p className="text-cyan-500 font-mono text-sm">
              <span className="text-cyan-400">{">"}</span> DISPLAYING{" "}
              {filteredHistory.length} OF {userData.history.length} COMMANDS
            </p>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="border-cyan-700 bg-black/70 hover:bg-cyan-950/70 text-cyan-300 flex items-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent group-hover:translate-x-full transition-all duration-700 ease-in-out"></div>
                <CalendarIcon className="h-4 w-4" />
                {formatSelectedDateDisplay(selectedDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-black/95 border-cyan-700 text-cyan-300 p-0 backdrop-blur-lg">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setIsCalendarOpen(false);
                }}
                className="bg-transparent text-cyan-300"
              />
            </PopoverContent>
          </Popover>

          {selectedDate && (
            <Button
              variant="outline"
              className="border-cyan-700 bg-black/70 hover:bg-cyan-950/70 text-cyan-300 flex items-center gap-2 group relative overflow-hidden"
              onClick={() => setSelectedDate(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent group-hover:translate-x-full transition-all duration-700 ease-in-out"></div>
              <TrashIcon className="h-4 w-4" />
              CLEAR FILTER
            </Button>
          )}
        </div>

        {filteredHistory.length === 0 ? (
          <div className="bg-slate-900/30 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-8 text-center">
            <SearchIcon className="mx-auto h-12 w-12 text-cyan-700 mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-cyan-400 mb-2 font-mono">
              NO DATA FOUND
            </h3>
            <p className="text-cyan-600 font-mono">
              SYSTEM SCAN COMPLETE :: NO COMMANDS LOGGED FOR SELECTED TIMEFRAME
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item, index) => (
              <Card
                key={index}
                className={`bg-slate-900/50 backdrop-blur-sm border-cyan-900/70 hover:shadow-cyan-800/40 transition-all duration-300 overflow-hidden relative group ${
                  highlightedCard === index
                    ? "ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/50"
                    : "shadow-lg shadow-cyan-900/20"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div
                  className={`absolute left-0 top-0 w-1 h-full ${
                    item.status === "success"
                      ? "bg-emerald-500/70"
                      : "bg-red-500/70"
                  }`}
                ></div>

                <CardHeader className="px-4 pt-4 pb-2 border-b border-cyan-900/30 flex justify-between">
                  <CardTitle className="text-lg text-cyan-300 font-mono flex items-center gap-2">
                    <ZapIcon
                      className={`h-4 w-4 ${
                        item.status === "success"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    />
                    {item.command.length > 30
                      ? `${item.command.substring(0, 30)}...`
                      : item.command}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-cyan-500 font-mono">
                      {formatDate(item.timestamp)}
                    </p>
                    <Badge
                      className={`${
                        item.status === "success"
                          ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50"
                          : "bg-red-900/50 text-red-300 border border-red-700/50"
                      } uppercase font-mono text-xs`}
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistory;
