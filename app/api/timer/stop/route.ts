// app/api/timer/stop/route.ts
import { NextResponse }       from "next/server";
import { getServerSession }   from "next-auth/next";
import { authOptions }        from "@/lib/auth";
import { stopTimerForUser }   from "@/src/lib/data/timerService";

export const runtime = "nodejs";

export async function POST(request: Request) {
    // 1) Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.userId) {
        return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.userId as number;
    const lastModifiedUser = session.user.email ?? "";

    // 2) Safely parse an optional JSON body
    let comment: string | undefined;
    try {
        // read raw text first
        const text = await request.text();
        if (text) {
            const body = JSON.parse(text) as { comment?: string };
            comment = body.comment;
        }
    } catch {
        // invalid or empty JSON, just ignore
        comment = undefined;
    }

    // 3) Stop the timer
    const timer = await stopTimerForUser(userId, lastModifiedUser, comment);
    if (!timer) {
        return NextResponse.json(
            { success: false, error: "No active timer to stop" },
            { status: 404 }
        );
    }

    // 4) Return the stopped timer record
    return NextResponse.json(
        { success: true, timer },
        { status: 200 }
    );
}
