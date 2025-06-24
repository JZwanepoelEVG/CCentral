// app/api/tickets/[ticketNo]/forms/route.ts
import { NextRequest } from "next/server";
import { getFormsForTicket } from "@/src/lib/data/formService";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ ticketNo: string }> }
) {
    try {
        // 1. Await the params promise
        const { ticketNo: ticketNoStr } = await context.params;

        // 2. Parse and validate
        const ticketNo = Number(ticketNoStr);
        if (isNaN(ticketNo)) {
            return new Response(
                JSON.stringify({ success: false, error: "Invalid ticket number" }),
                { status: 400 }
            );
        }

        // 3. Fetch your forms
        const forms = await getFormsForTicket(ticketNo);
        return new Response(
            JSON.stringify({ success: true, forms }),
            { status: 200 }
        );
    } catch (error) {
        console.error("API error:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
