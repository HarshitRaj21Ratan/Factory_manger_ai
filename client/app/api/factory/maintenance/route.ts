import { NextRequest, NextResponse } from "next/server";
import { store } from "@/src/lib/store";
import { Alert } from "@/src/types";

export async function POST(request: NextRequest) {
  const { machineId, action } = await request.json();

  const target = store.getMachines().find((m) => m.id === machineId);
  if (!target) {
    return NextResponse.json({ error: "Machine not found" }, { status: 404 });
  }

  store.updateMachine(machineId, {
    status: "monitoring",
    temperature: 65,
    vibration: 2.1,
  });

  const newAlert: Alert = {
    id: "A-" + Date.now(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    type: "info",
    title: "Maintenance Assigned",
    message: `Enacted direct: '${action}' for ${target.name}. Thermals recalibrating.`,
    machineId,
  };
  store.addAlert(newAlert);

  return NextResponse.json({ success: true, machines: store.getMachines(), alerts: store.getAlerts() });
}
