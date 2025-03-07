"use client";
import { useEffect, useState, useCallback } from "react";
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
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  MessageSquareIcon,
  CloudIcon,
  ShoppingCartIcon,
  MapPinIcon,
  MusicIcon,
} from "lucide-react";

const UserHistory = () => {
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [expandedCommands, setExpandedCommands] = useState({});
  const [highlightedItem, setHighlightedItem] = useState(null);

  useEffect(() => {
    // Create style element for the cyberpunk scrollbar
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Cyberpunk Scrollbar Styling */
      .cyber-scrollbar::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      
      .cyber-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
        border-left: 1px solid rgba(0, 200, 255, 0.2);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      }
      
      .cyber-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, rgba(0, 255, 255, 0.7), rgba(0, 100, 200, 0.7));
        border-radius: 0;
        box-shadow: 
          0 0 0 1px rgba(0, 0, 0, 0.8),
          inset 0 0 3px rgba(255, 255, 255, 0.5);
      }
      
      .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, rgba(0, 255, 255, 1), rgba(255, 50, 50, 0.8));
        box-shadow: 
          0 0 0 1px #000,
          inset 0 0 5px rgba(255, 255, 255, 0.8);
      }
      
      /* Flame animation effect */
      .cyber-scrollbar::-webkit-scrollbar-thumb:active {
        background: linear-gradient(180deg, #ff3, #f50);
        box-shadow: 
          0 0 3px 1px rgba(255, 100, 0, 0.6),
          inset 0 0 10px rgba(255, 200, 0, 0.8);
      }
      
      /* Enhanced cyberpunk panel glow */
      .cyber-panel {
        box-shadow: 
          0 0 5px rgba(0, 200, 255, 0.3),
          0 0 10px rgba(0, 150, 255, 0.1),
          inset 0 0 2px rgba(0, 200, 255, 0.4);
        transition: all 0.3s ease;
      }
      
      .cyber-panel:hover {
        box-shadow: 
          0 0 8px rgba(0, 200, 255, 0.5),
          0 0 15px rgba(0, 150, 255, 0.3),
          inset 0 0 3px rgba(0, 200, 255, 0.6);
      }
      
      /* Glitch animation for elements */
      @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
      }
      
      .cyber-glitch:hover {
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        text-shadow: 
          0 0 5px rgba(0, 255, 255, 0.7),
          0 0 10px rgba(0, 200, 255, 0.5),
          0 0 15px rgba(0, 150, 255, 0.3);
      }
      
      /* Neon edges for items */
      .neon-edge {
        position: relative;
        overflow: hidden;
      }
      
      .neon-edge::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(to right, 
          transparent 0%, 
          rgba(0, 200, 255, 0) 20%, 
          rgba(0, 200, 255, 0.8) 50%, 
          rgba(0, 200, 255, 0) 80%, 
          transparent 100%);
        filter: blur(1px);
        animation: neon-flow 3s infinite linear;
      }
      
      @keyframes neon-flow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setUserData({
        user_id: "12345",
        name: "John Doe",
        email: "johndoe@example.com",
        history: [
          {
            id: "cmd-001",
            command: "Call Mom",
            timestamp: "2025-03-06T10:15:30Z",
            subCommands: [
              {
                id: "subcmd-001-1",
                command: "Retrieve contact details",
                timestamp: "2025-03-06T10:16:10Z",
                status: "success",
              },
              {
                id: "subcmd-001-2",
                command: "Check network signal",
                timestamp: "2025-03-06T10:17:45Z",
                status: "success",
              },
              {
                id: "subcmd-001-3",
                command: "Establish call connection",
                timestamp: "2025-03-06T10:19:20Z",
                status: "unsuccessful",
              },
            ],
          },
          {
            id: "cmd-002",
            command: "Send message to David",
            timestamp: "2025-03-06T11:00:45Z",
            subCommands: [
              {
                id: "subcmd-002-1",
                command: "Open messaging app",
                timestamp: "2025-03-06T11:01:15Z",
                status: "success",
              },
              {
                id: "subcmd-002-2",
                command: "Compose message",
                timestamp: "2025-03-06T11:02:30Z",
                status: "success",
              },
              {
                id: "subcmd-002-3",
                command: "Send message",
                timestamp: "2025-03-06T11:03:45Z",
                status: "success",
              },
            ],
          },
          {
            id: "cmd-003",
            command: "Check weather in New York",
            timestamp: "2025-03-06T11:45:10Z",
            subCommands: [
              {
                id: "subcmd-003-1",
                command: "Access weather service",
                timestamp: "2025-03-06T11:46:05Z",
                status: "success",
              },
              {
                id: "subcmd-003-2",
                command: "Retrieve location data",
                timestamp: "2025-03-06T11:47:20Z",
                status: "unsuccessful",
              },
              {
                id: "subcmd-003-3",
                command: "Display forecast",
                timestamp: "2025-03-06T11:48:10Z",
                status: "unsuccessful",
              },
            ],
          },
          {
            id: "cmd-004",
            command: "Order food delivery",
            timestamp: "2025-03-07T09:30:20Z",
            subCommands: [
              {
                id: "subcmd-004-1",
                command: "Find nearby restaurants",
                timestamp: "2025-03-07T09:31:15Z",
                status: "success",
              },
              {
                id: "subcmd-004-2",
                command: "Select items from menu",
                timestamp: "2025-03-07T09:32:40Z",
                status: "success",
              },
              {
                id: "subcmd-004-3",
                command: "Process payment",
                timestamp: "2025-03-07T09:34:05Z",
                status: "success",
              },
            ],
          },
          {
            id: "cmd-005",
            command: "Navigate to coffee shop",
            timestamp: "2025-03-07T14:15:30Z",
            subCommands: [
              {
                id: "subcmd-005-1",
                command: "Access GPS service",
                timestamp: "2025-03-07T14:16:10Z",
                status: "success",
              },
              {
                id: "subcmd-005-2",
                command: "Find nearest coffee shop",
                timestamp: "2025-03-07T14:17:45Z",
                status: "success",
              },
              {
                id: "subcmd-005-3",
                command: "Calculate optimal route",
                timestamp: "2025-03-07T14:19:20Z",
                status: "success",
              },
            ],
          },
          {
            id: "cmd-006",
            command: "Play music playlist",
            timestamp: "2025-03-07T19:00:45Z",
            subCommands: [
              {
                id: "subcmd-006-1",
                command: "Open music app",
                timestamp: "2025-03-07T19:01:15Z",
                status: "success",
              },
              {
                id: "subcmd-006-2",
                command: "Find 'Favorites' playlist",
                timestamp: "2025-03-07T19:02:30Z",
                status: "success",
              },
              {
                id: "subcmd-006-3",
                command: "Start playback",
                timestamp: "2025-03-07T19:03:45Z",
                status: "unsuccessful",
              },
            ],
          },
        ],
      });
    }, 500);
  }, []);

  // Update status of parent commands based on child commands
  useEffect(() => {
    if (!userData) return;

    // Check if statuses are already calculated
    const alreadyHasStatus =
      userData.history.length > 0 &&
      userData.history[0].hasOwnProperty("status");
    if (alreadyHasStatus) return;

    const updatedHistory = userData.history.map((item) => {
      // Check if any subcommand is unsuccessful
      const hasUnsuccessful = item.subCommands.some(
        (sub) => sub.status === "unsuccessful"
      );
      // Update parent status based on children
      return {
        ...item,
        status: hasUnsuccessful ? "unsuccessful" : "success",
      };
    });

    setUserData((prev) => ({
      ...prev,
      history: updatedHistory,
    }));
  }, [userData]);

  // Fix for automatic dropdown opening - using state control
  // Modified to avoid auto-opening of dropdown elements
  const highlightRandomItem = useCallback(() => {
    if (!userData) return;
    
    const randomParentIndex = Math.floor(
      Math.random() * userData.history.length
    );
    const randomParent = userData.history[randomParentIndex];
  
    // Your existing code
    
    setTimeout(() => setHighlightedItem(null), 700);
  }, [userData]);
  
  // Setup the interval for highlighting
  useEffect(() => {
    if (!userData) return;
  
    const interval = setInterval(highlightRandomItem, 5000);
    return () => clearInterval(interval);
  }, [userData, highlightRandomItem]);

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

  const toggleExpand = (id) => {
    setExpandedCommands((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Get icon based on command name
  const getCommandIcon = (command) => {
    if (command.toLowerCase().includes("call"))
      return <PhoneIcon className="h-4 w-4 mr-2" />;
    if (command.toLowerCase().includes("message"))
      return <MessageSquareIcon className="h-4 w-4 mr-2" />;
    if (command.toLowerCase().includes("weather"))
      return <CloudIcon className="h-4 w-4 mr-2" />;
    if (
      command.toLowerCase().includes("order") ||
      command.toLowerCase().includes("food")
    )
      return <ShoppingCartIcon className="h-4 w-4 mr-2" />;
    if (
      command.toLowerCase().includes("navigate") ||
      command.toLowerCase().includes("coffee")
    )
      return <MapPinIcon className="h-4 w-4 mr-2" />;
    if (
      command.toLowerCase().includes("music") ||
      command.toLowerCase().includes("play")
    )
      return <MusicIcon className="h-4 w-4 mr-2" />;
    return <ZapIcon className="h-4 w-4 mr-2" />;
  };

  const filteredHistory = selectedDate
    ? userData.history.filter((item) => {
        const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
        return itemDate === formatDateForComparison(selectedDate);
      })
    : userData.history;

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden text-cyan-300 p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0),rgba(0,200,255,0.05),rgba(0,0,0,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,30,40,0.8)_100%)]"></div>

      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_1px,transparent_1px,transparent_2px)] opacity-20 pointer-events-none"></div>

      <div className="max-w-full relative z-10">
        <header className="mb-8 border-b border-cyan-900/70 pb-4 relative pl-4">
          <div className="absolute -left-4 -top-2 h-12 w-1 bg-cyan-500 animate-pulse"></div>
          <h1 className="text-4xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent relative cyber-glitch">
            USER::HISTORY
            <span className="absolute top-14 right-0 text-xs text-cyan-500 font-mono animate-pulse">
              [SYS.42]
            </span>
          </h1>
          <div className="flex items-center mt-2">
            <div className="h-1 w-4 bg-cyan-500 mr-2 animate-pulse"></div>
            <p className="text-cyan-500 font-mono text-sm">
              <span className="text-cyan-400">{">"}</span> DISPLAYING{" "}
              {filteredHistory.length} OF {userData.history.length} COMMAND
              SEQUENCES
            </p>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="border-cyan-700 bg-black/70 hover:bg-cyan-950/70 text-cyan-300 flex items-center gap-2 group relative overflow-hidden neon-edge"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent group-hover:translate-x-full transition-all duration-700 ease-in-out"></div>
                <CalendarIcon className="h-4 w-4" />
                {formatSelectedDateDisplay(selectedDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-black/95 border-cyan-700 text-cyan-300 p-0 backdrop-blur-lg cyber-panel">
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
              className="border-cyan-700 bg-black/70 hover:bg-cyan-950/70 text-cyan-300 flex items-center gap-2 group relative overflow-hidden neon-edge"
              onClick={() => setSelectedDate(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent group-hover:translate-x-full transition-all duration-700 ease-in-out"></div>
              <TrashIcon className="h-4 w-4" />
              CLEAR FILTER
            </Button>
          )}
        </div>

        {filteredHistory.length === 0 ? (
          <div className="bg-slate-900/30 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-8 text-center cyber-panel">
            <SearchIcon className="mx-auto h-12 w-12 text-cyan-700 mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-cyan-400 mb-2 font-mono cyber-glitch">
              NO DATA FOUND
            </h3>
            <p className="text-cyan-600 font-mono">
              SYSTEM SCAN COMPLETE :: NO COMMANDS LOGGED FOR SELECTED TIMEFRAME
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/30 backdrop-blur-sm border border-cyan-900/50 rounded-lg divide-y divide-cyan-900/50 max-h-[calc(100vh-220px)] overflow-y-auto cyber-scrollbar cyber-panel">
            {filteredHistory.map((item) => (
              <div key={item.id} className="relative">
                <div
                  className={`px-4 py-3 cursor-pointer hover:bg-cyan-900/10 flex items-center transition-all duration-200 ${
                    highlightedItem === item.id ? "bg-cyan-900/30" : ""
                  } neon-edge`}
                  onClick={() => toggleExpand(item.id)}
                >
                  <div
                    className={`absolute left-0 top-0 w-1 h-full ${
                      item.status === "success"
                        ? "bg-emerald-500/70"
                        : "bg-red-500/70"
                    }`}
                  ></div>

                  <div className="mr-2 transition-transform duration-300 ease-in-out">
                    {expandedCommands[item.id] ? (
                      <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-cyan-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center">
                      {getCommandIcon(item.command)}
                      <span className="font-mono text-cyan-300 cyber-glitch">
                        {item.command}
                      </span>
                    </div>
                  </div>

                  <div className="ml-2 flex items-center gap-4">
                    <span className="text-xs text-cyan-500 font-mono">
                      {formatDate(item.timestamp)}
                    </span>
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
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedCommands[item.id] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="pl-10 pr-4 bg-cyan-950/20 border-t border-cyan-900/30 transition-all duration-300 ease-in-out">
                    {item.subCommands.map((subCmd) => (
                      <div
                        key={subCmd.id}
                        className={`py-2 flex items-center border-b border-cyan-900/20 last:border-0 transition-all duration-300 
                        ${
                          highlightedItem === `${item.id}-${subCmd.id}`
                            ? "bg-cyan-900/30"
                            : ""
                        }
                        `}
                      >
                        {subCmd.status === "success" ? (
                          <CheckCircleIcon className="h-4 w-4 text-emerald-400 mr-2" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 text-red-400 mr-2" />
                        )}

                        <div className="flex-1">
                          <span className="font-mono text-sm text-cyan-300">
                            {subCmd.command}
                          </span>
                        </div>

                        <div className="ml-2 flex items-center gap-4">
                          <span className="text-xs text-cyan-500/80 font-mono">
                            {formatDate(subCmd.timestamp)}
                          </span>
                          <Badge
                            className={`${
                              subCmd.status === "success"
                                ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700/30"
                                : "bg-red-900/30 text-red-300 border border-red-700/30"
                            } uppercase font-mono text-xs`}
                          >
                            {subCmd.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistory;