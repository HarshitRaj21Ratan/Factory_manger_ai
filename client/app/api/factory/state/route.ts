import { NextResponse } from "next/server";
import { store } from "@/src/lib/store";

export async function GET() {
  return NextResponse.json(store.getFullState());
}
