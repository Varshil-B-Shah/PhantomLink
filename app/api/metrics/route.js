// app/api/metrics/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = await fetch(
      "https://7ef4-2402-3a80-4167-2230-30d8-e783-a7d2-4f9a.ngrok-free.app/metrics"
    );
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in proxy route:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
