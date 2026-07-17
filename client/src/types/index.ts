export interface Machine {
  id: string;
  name: string;
  type: string;
  status: "optimal" | "monitoring" | "critical" | "offline";
  temperature: number;
  vibration: number;
  efficiency: number;
  statusTime: string;
  operator: string;
}

export interface Alert {
  id: string;
  time: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  machineId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  minThreshold: number;
  unit: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  shift: string;
  safetyScore: number;
  activeLine: string;
  avatar: string;
}

export interface ProductionTarget {
  line: string;
  actual: number;
  target: number;
  color: string;
}

export interface FactoryState {
  machines: Machine[];
  alerts: Alert[];
  inventory: InventoryItem[];
  workers: Worker[];
  productionTargets: ProductionTarget[];
  systemAuditNotes: string;
}
