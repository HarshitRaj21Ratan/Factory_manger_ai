import { NextResponse } from "next/server";
import { store } from "@/src/lib/store";

export async function POST() {
  store.clearAlerts();
  return NextResponse.json({ success: true, alerts: [] });
}
