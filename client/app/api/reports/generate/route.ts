import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { reportType, range } = await request.json();
  const code = "RPT-" + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toISOString().split("T")[0];

  const reportContent = `
INDUSTRIALOS DIGITAL FACTORY SITE SYSTEM
OFFICIAL REPORT ARCHIVE - SECURE COMPLIANCE LOCK
===============================================
REPORT INDEX:   ${code}
GENERATE TIME:  ${dateStr}
RANGE MODEL:    ${range}
REPORT FOCUS:   ${reportType.toUpperCase()}
FACTORY SITE:   Site-Alpha-9 Sector-C

EXECUTIVE HEALTH SYNOPSIS
-------------------------
Factory Operational Index is at 94.2% overall efficiency.
Stamping machinery line registered minor vibration fluctuations of 3.4 mm/s.
Critical thermal breach localized on Molding Unit Delta-02 (M04) peaking at 104°C but currently flagged for administrative dispatch.

LOGISTICS & ASSEMBLY RAW DENSITY
---------------------------------
Total site throughput has achieved 43,070 aggregated units. Output trend shows a +12% climb over prior metrics.
Active compliance shift roster registered full coverage under plant supervision.

OPERATOR RECORD & SHIFT LOGS
----------------------------
Day Roster Supervised by Liam Henderson (Lead Systems Operator) with 98% Safety Compliance Quotient.
Evening Supervisor Elena Rostova flagged minor tooling chatter.

END OF AUTOMATED DIGITAL TRANSMISSION
  `.trim();

  return NextResponse.json({ success: true, reportId: code, generatedAt: dateStr, content: reportContent });
}
