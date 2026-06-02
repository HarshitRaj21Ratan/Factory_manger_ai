import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data in reverse dependency order
  await prisma.notification.deleteMany();
  await prisma.defect.deleteMany();
  await prisma.maintenanceLog.deleteMany();
  await prisma.production.deleteMany();
  await prisma.shiftWorker.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.worker.deleteMany();
  await prisma.machine.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared. Seeding users...");

  // Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password123", salt);

  // Users
  const owner = await prisma.user.create({
    data: {
      email: "owner@factory.com",
      password: hashedPassword,
      name: "Arthur Pendragon",
      role: "OWNER",
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: "manager@factory.com",
      password: hashedPassword,
      name: "Guinevere Vance",
      role: "MANAGER",
    },
  });

  const supervisor = await prisma.user.create({
    data: {
      email: "supervisor@factory.com",
      password: hashedPassword,
      name: "Lancelot DuLac",
      role: "SUPERVISOR",
    },
  });

  const inventoryManager = await prisma.user.create({
    data: {
      email: "inventory@factory.com",
      password: hashedPassword,
      name: "Gawain Green",
      role: "INVENTORY_MANAGER",
    },
  });

  const machineOperator = await prisma.user.create({
    data: {
      email: "operator@factory.com",
      password: hashedPassword,
      name: "Galahad Pure",
      role: "MACHINE_OPERATOR",
    },
  });

  console.log("Users seeded. Seeding workers...");

  // Workers
  const worker1 = await prisma.worker.create({
    data: { name: "John Doe", email: "john.doe@factory.com", phone: "+1234567890", skillLevel: "Expert", status: "ACTIVE" },
  });

  const worker2 = await prisma.worker.create({
    data: { name: "Jane Smith", email: "jane.smith@factory.com", phone: "+1234567891", skillLevel: "Intermediate", status: "ACTIVE" },
  });

  const worker3 = await prisma.worker.create({
    data: { name: "Bob Johnson", email: "bob.johnson@factory.com", phone: "+1234567892", skillLevel: "Beginner", status: "ACTIVE" },
  });

  const worker4 = await prisma.worker.create({
    data: { name: "Alice Davis", email: "alice.davis@factory.com", phone: "+1234567893", skillLevel: "Expert", status: "ACTIVE" },
  });

  console.log("Workers seeded. Seeding machines...");

  // Machines
  const machineCNC = await prisma.machine.create({
    data: { name: "CNC Milling Machine A", code: "CNC-001", type: "CNC", status: "ACTIVE", efficiency: 94.5 },
  });

  const machineWelder = await prisma.machine.create({
    data: { name: "Robotic Welder B", code: "ROB-002", type: "Welding", status: "IDLE", efficiency: 98.0 },
  });

  const machineConveyor = await prisma.machine.create({
    data: { name: "Conveyor Belt Line 1", code: "CON-003", type: "Assembly", status: "ACTIVE", efficiency: 88.2 },
  });

  const machinePackaging = await prisma.machine.create({
    data: { name: "Packaging Assembly D", code: "PKG-004", type: "Packaging", status: "FAULT", efficiency: 65.0 },
  });

  console.log("Machines seeded. Seeding inventory...");

  // Inventory
  const steelSheet = await prisma.inventory.create({
    data: {
      name: "Structural Steel Sheets (1mx2m)",
      sku: "RM-STEEL-001",
      type: "RAW_MATERIAL",
      quantity: 1200.0,
      unit: "kg",
      minThreshold: 200.0,
      supplierInfo: "Steel Corp Inc.",
    },
  });

  const screws = await prisma.inventory.create({
    data: {
      name: "M6 Hex Screws",
      sku: "RM-SCREW-002",
      type: "RAW_MATERIAL",
      quantity: 45000.0,
      unit: "pieces",
      minThreshold: 5000.0,
      supplierInfo: "Fastener Global Ltd.",
    },
  });

  const hydraulicFluid = await prisma.inventory.create({
    data: {
      name: "Premium Hydraulic Oil",
      sku: "RM-FLUID-003",
      type: "RAW_MATERIAL",
      quantity: 15.0, // Below threshold
      unit: "liters",
      minThreshold: 50.0,
      supplierInfo: "Apex Lubricants",
    },
  });

  const finishedWidget = await prisma.inventory.create({
    data: {
      name: "Assembled Steel Bracket Type A",
      sku: "FG-WIDGET-001",
      type: "FINISHED_GOOD",
      quantity: 250.0,
      unit: "pieces",
      minThreshold: 50.0,
      supplierInfo: "Self-Manufactured",
    },
  });

  console.log("Inventory seeded. Seeding shifts...");

  // Shifts
  const today = new Date();
  
  // Shift A (Completed today morning)
  const shiftAStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0);
  const shiftAEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0, 0);
  const shiftA = await prisma.shift.create({
    data: {
      name: "Morning Shift (Shift A)",
      startTime: shiftAStart,
      endTime: shiftAEnd,
      date: today,
      supervisorId: supervisor.id,
      status: "COMPLETED",
    },
  });

  // Shift B (Active now)
  const shiftBStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0, 0);
  const shiftBEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22, 0, 0);
  const shiftB = await prisma.shift.create({
    data: {
      name: "Evening Shift (Shift B)",
      startTime: shiftBStart,
      endTime: shiftBEnd,
      date: today,
      supervisorId: supervisor.id,
      status: "ACTIVE",
    },
  });

  // Shift Workers
  await prisma.shiftWorker.createMany({
    data: [
      { shiftId: shiftA.id, workerId: worker1.id },
      { shiftId: shiftA.id, workerId: worker2.id },
      { shiftId: shiftB.id, workerId: worker3.id },
      { shiftId: shiftB.id, workerId: worker4.id },
    ],
  });

  console.log("Shifts seeded. Seeding production records...");

  // Production Records
  // Shift A Production
  const prodA1 = await prisma.production.create({
    data: {
      lineId: "Line 1",
      targetUnits: 300,
      producedUnits: 295,
      rejectedUnits: 5,
      pendingUnits: 5,
      status: "COMPLETED",
      supervisorId: supervisor.id,
      shiftId: shiftA.id,
      date: shiftAStart,
    },
  });

  const prodA2 = await prisma.production.create({
    data: {
      lineId: "Line 2",
      targetUnits: 200,
      producedUnits: 175,
      rejectedUnits: 20, // High Rejection Rate (>10%)
      pendingUnits: 25,
      status: "COMPLETED",
      delayReason: "Material quality checks",
      supervisorId: supervisor.id,
      shiftId: shiftA.id,
      date: shiftAStart,
    },
  });

  // Shift B Production (In Progress)
  const prodB1 = await prisma.production.create({
    data: {
      lineId: "Line 1",
      targetUnits: 300,
      producedUnits: 150,
      rejectedUnits: 2,
      pendingUnits: 150,
      status: "IN_PROGRESS",
      supervisorId: supervisor.id,
      shiftId: shiftB.id,
      date: shiftBStart,
    },
  });

  console.log("Production seeded. Seeding defect logs...");

  // Defects
  await prisma.defect.create({
    data: {
      productionId: prodA2.id,
      category: "Structural",
      quantity: 15,
      description: "Cracks observed in bracket flanges due to stamping pressure",
      loggedById: supervisor.id,
    },
  });

  await prisma.defect.create({
    data: {
      productionId: prodA2.id,
      category: "Cosmetic",
      quantity: 5,
      description: "Surface scratches on powder coating",
      loggedById: supervisor.id,
    },
  });

  console.log("Defect logs seeded. Seeding maintenance logs...");

  // Maintenance Logs
  // Resolved Log
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);
  await prisma.maintenanceLog.create({
    data: {
      machineId: machineCNC.id,
      description: "Calibrated spindles and lubed gears",
      status: "RESOLVED",
      loggedById: machineOperator.id,
      resolvedById: manager.id,
      downtimeMinutes: 45,
      createdAt: pastDate,
      updatedAt: pastDate,
    },
  });

  // Active / Pending Log
  await prisma.maintenanceLog.create({
    data: {
      machineId: machinePackaging.id,
      description: "PLC controller error code E-904 (Power surge)",
      status: "PENDING",
      loggedById: machineOperator.id,
      createdAt: new Date(Date.now() - 120 * 60000), // 2 hours ago
    },
  });

  console.log("Maintenance logs seeded. Seeding notifications...");

  // Notifications
  await prisma.notification.createMany({
    data: [
      {
        title: "Low Inventory Alert: Hydraulic Fluid",
        message: "Inventory item 'Premium Hydraulic Oil' (sku: RM-FLUID-003) is at 15.0 liters, which is below the threshold of 50.0 liters.",
        type: "LOW_INVENTORY",
        read: false,
      },
      {
        title: "Machine Failure: Packaging Assembly D",
        message: "Machine Packaging Assembly D (code: PKG-004) has reported a fault: PLC controller error code E-904 (Power surge)",
        type: "MACHINE_FAILURE",
        read: false,
      },
      {
        title: "High Rejection Rate: Line 2",
        message: "Shift A production run on Line 2 reported 20 rejected units (10.0% rejection rate).",
        type: "HIGH_REJECTION_RATE",
        read: true,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
