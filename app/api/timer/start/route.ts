// app/api/timer/start/route.ts
import { NextResponse }        from "next/server";
import { getServerSession }    from "next-auth/next";
import { authOptions }         from "@/lib/auth";
import { startTimerForUser }   from "@/src/lib/data/timerService";

export async function POST(request: Request) {
    // 1) Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.userId) {
        return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.userId as number;
    const lastModifiedUser = session.user.email ?? "";

    // 2) Parse body
    const { ticketId, comment } = await request.json();
    if (typeof ticketId !== "number") {
        return NextResponse.json(
            { success: false, error: "Missing or invalid ticketId" },
            { status: 400 }
        );
    }

    // 3) Start timer
    const timer = await startTimerForUser(
        userId,
        ticketId,
        lastModifiedUser,
        comment
    );

    if (!timer) {
        return NextResponse.json(
            { success: false, error: "Could not start timer" },
            { status: 500 }
        );
    }

    // 4) Respond
    return NextResponse.json(
        { success: true, timer },
        { status: 200 }
    );
}
