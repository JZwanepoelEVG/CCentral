import { NextRequest } from "next/server";
import { getTaskLogsForTicket } from "@/src/lib/data/taskLogService";

// Prevent this route from running on Edge
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    context: any
) {
    const { ticketNo } = await context.params;
    const id = parseInt(ticketNo, 10);

    if (isNaN(id)) {
        return Response.json(
            { success: false, error: "Invalid ticket ID" },
            { status: 400 }
        );
    }

    try {
        const logs = await getTaskLogsForTicket(id);
        return Response.json({ success: true, logs });
    } catch (err) {
        console.error("Failed to fetch task logs:", err);
        return Response.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
