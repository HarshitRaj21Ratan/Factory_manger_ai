import { NextRequest, NextResponse } from "next/server";
import { store } from "@/src/lib/store";

export async function POST(request: NextRequest) {
  const { machineId, status, temperature, vibration } = await request.json();

  store.updateMachine(machineId, {
    ...(status !== undefined && { status }),
    ...(temperature !== undefined && { temperature }),
    ...(vibration !== undefined && { vibration }),
  });

  if (status === "optimal" || status === "offline") {
    store.removeAlertsByMachine(machineId);
  }

  return NextResponse.json({ success: true, machines: store.getMachines() });
}
