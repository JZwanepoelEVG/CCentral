import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTicketsFromDatabase } from "@/src/lib/data/ticketService";

export async function GET() {
    const session = await getServerSession(authOptions);
    console.log("SESSION:", session);

    if (!session?.user?.userId) {
        return Response.json({ error: "Unauthorised" }, { status: 401 });
    }

    const userId = session.user.userId;

    try {
        const tickets = await getTicketsFromDatabase(userId);
        return Response.json({ success: true, tickets });
    } catch (err) {
        console.error("Database error:", err);
        return Response.json({ error: "Ticket fetch failed" }, { status: 500 });
    }
}
