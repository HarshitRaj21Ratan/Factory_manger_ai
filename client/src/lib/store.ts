import { Machine, Alert, InventoryItem, Worker } from "@/src/types";

// In-memory store (persists across requests in Next.js dev/prod server lifecycle)
let machines: Machine[] = [
  { id: "M01", name: "Assembly Line Alpha-01", type: "Assembler", status: "optimal", temperature: 68, vibration: 1.2, efficiency: 98.2, statusTime: "12,450 / hr", operator: "Liam Henderson" },
  { id: "M02", name: "Packaging Beta-04", type: "Packer", status: "monitoring", temperature: 84, vibration: 3.4, efficiency: 84.5, statusTime: "8,200 / hr", operator: "Olivia Chen" },
  { id: "M03", name: "Stamping Gamma-09", type: "Press", status: "optimal", temperature: 71, vibration: 1.8, efficiency: 94.1, statusTime: "15,100 / hr", operator: "Rajesh Kumar" },
  { id: "M04", name: "Molding Delta-02", type: "Molder", status: "critical", temperature: 104, vibration: 6.2, efficiency: 62.8, statusTime: "4,320 / hr", operator: "Elena Rostova" },
  { id: "M05", name: "Laser Cutter Epsilon-03", type: "Cutter", status: "optimal", temperature: 45, vibration: 0.8, efficiency: 95.0, statusTime: "3,100 / hr", operator: "Marcus Thorne" },
];

let alerts: Alert[] = [
  { id: "A1", time: "09:41 AM", type: "critical", title: "Motor Overheat", message: "Line 4, Stamping Station B. Operating at 104°C (Threshold 95°C).", machineId: "M04" },
  { id: "A2", time: "08:15 AM", type: "warning", title: "Material Low", message: "Steel coil inventory below 15% on Station C.", machineId: "M03" },
  { id: "A3", time: "07:00 AM", type: "info", title: "System Maintenance", message: "Scheduled DB backup completed successfully." },
];

let inventory: InventoryItem[] = [
  { id: "I1", name: "Steel Coils (Grade-A)", category: "Raw Materials", currentLevel: 14, minThreshold: 15, unit: "coils" },
  { id: "I2", name: "Component Lubricant", category: "Consumables", currentLevel: 85, minThreshold: 20, unit: "liters" },
  { id: "I3", name: "Controller Microchips", category: "Electronics", currentLevel: 450, minThreshold: 100, unit: "units" },
  { id: "I4", name: "Corrugated Containers", category: "Packaging", currentLevel: 1200, minThreshold: 500, unit: "boxes" },
];

const workers: Worker[] = [
  { id: "W1", name: "Liam Henderson", role: "Lead Systems Operator", shift: "Day (06:00 - 14:00)", safetyScore: 98, activeLine: "Assembly Alpha-01", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120" },
  { id: "W2", name: "Olivia Chen", role: "Junior Automation Engineer", shift: "Day (06:00 - 14:00)", safetyScore: 94, activeLine: "Packaging Beta-04", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" },
  { id: "W3", name: "Rajesh Kumar", role: "Maintenance Specialist", shift: "Night (22:00 - 06:00)", safetyScore: 100, activeLine: "Stamping Gamma-09", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
  { id: "W4", name: "Elena Rostova", role: "Molding Technician", shift: "Evening (14:00 - 22:00)", safetyScore: 91, activeLine: "Molding Delta-02", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120" },
];

const productionTargets = [
  { line: "Assembly Line Alpha", actual: 9200, target: 10000, color: "bg-blue-600" },
  { line: "Assembly Line Beta", actual: 11400, target: 10000, color: "bg-indigo-600" },
  { line: "Packaging Area Gamma", actual: 4100, target: 10000, color: "bg-red-600" },
];

let systemAuditNotes = "Diagnostic overview: System health overall is 94.2%. Machine Delta-02 holds anomalous thermals, operator Elena reported sensor chatter. Recommended: Perform motor bearing lube rinse.";

export const store = {
  getMachines: () => machines,
  getAlerts: () => alerts,
  getInventory: () => inventory,
  getWorkers: () => workers,
  getProductionTargets: () => productionTargets,
  getSystemAuditNotes: () => systemAuditNotes,

  updateMachine: (machineId: string, updates: Partial<Machine>) => {
    machines = machines.map((m) => m.id === machineId ? { ...m, ...updates } : m);
  },

  removeAlertsByMachine: (machineId: string) => {
    alerts = alerts.filter((a) => a.machineId !== machineId);
  },

  addAlert: (alert: Alert) => {
    alerts = [alert, ...alerts];
  },

  clearAlerts: () => {
    alerts = [];
  },

  updateInventoryItem: (itemId: string, amount: number) => {
    inventory = inventory.map((item) =>
      item.id === itemId ? { ...item, currentLevel: item.currentLevel + amount } : item
    );
  },

  getFullState: () => ({
    machines,
    alerts,
    inventory,
    workers,
    productionTargets,
    systemAuditNotes,
  }),
};
