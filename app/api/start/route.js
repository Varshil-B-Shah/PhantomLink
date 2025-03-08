import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = await fetch(
      "https://1d37-203-192-202-84.ngrok-free.app/start"
    );
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in proxy route:", error);
    return NextResponse.json(
      { error: "Failed to fetch Sos" },
      { status: 500 }
    );
  }
}
