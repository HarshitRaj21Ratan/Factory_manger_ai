import { NextRequest, NextResponse } from "next/server";
import { store } from "@/src/lib/store";

export async function POST(request: NextRequest) {
  const { itemId, amount } = await request.json();
  store.updateInventoryItem(itemId, Number(amount));
  return NextResponse.json({ success: true, inventory: store.getInventory() });
}
