"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function UserHistoryPage() {
  const { user, isLoaded } = useUser();
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!isLoaded || !user) return;

      try {
        const userEmail = user.emailAddresses?.[0]?.emailAddress;
        const q = query(
          collection(db, "user_history"),
          where("email", "==", userEmail)
        );
        const snapshot = await getDocs(q);

        const results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setHistoryData(results);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    fetchHistory();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-cyan-300">
        Loading user data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyan-300 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-500 tracking-widest">
        CYBERPUNK USER HISTORY
      </h1>

      {historyData.length === 0 && (
        <div className="text-center text-gray-400">
          No history found for this user.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {historyData.map((doc) => (
          <Card
            key={doc.id}
            className="border border-cyan-500/50 bg-gradient-to-br from-black via-black to-gray-900 text-cyan-200 shadow-cyan-800 shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-pink-400 text-lg">
                {doc.username || "Unknown User"}
              </CardTitle>
              <CardDescription className="text-cyan-500 text-xs">
                {doc.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {doc.history && doc.history.length > 0 ? (
                doc.history.map((item, index) => (
                  <div
                    key={index}
                    className="border border-cyan-400/30 rounded p-3 mb-3 bg-black/40"
                  >
                    <p className="text-sm mb-1">
                      <span className="text-pink-500">Command:</span>{" "}
                      {item.command}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="text-pink-500">Timestamp:</span>{" "}
                      {item.timestamp}
                    </p>

                    {item.tool_name && (
                      <span className="inline-block bg-pink-600 text-white text-xs px-2 py-1 rounded mr-2">
                        {item.tool_name}
                      </span>
                    )}

                    <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">
                      SUCCESS
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No commands found</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
