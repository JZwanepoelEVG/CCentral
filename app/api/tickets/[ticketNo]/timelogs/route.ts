import { NextRequest } from "next/server";
import { getTimeLogsForTicket } from "@/src/lib/data/timeLogService";

// Prevent this route from running on Edge
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    context: any
) {
    // Await the params promise before accessing its properties
    const { ticketNo } = await context.params;
    const ticketId = parseInt(ticketNo, 10);

    if (isNaN(ticketId)) {
        return Response.json(
            { success: false, error: "Invalid ticket ID" },
            { status: 400 }
        );
    }

    try {
        const logs = await getTimeLogsForTicket(ticketId);
        return Response.json({ success: true, logs });
    } catch (err) {
        console.error("Failed to fetch time logs:", err);
        return Response.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
