// app/api/timer/active/route.ts
import { NextResponse }            from "next/server";
import { getServerSession }        from "next-auth/next";
import { authOptions }             from "@/lib/auth";
import { getActiveTimerForUser }   from "@/src/lib/data/timerService";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.userId) {
        return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.userId as number;

    const timer = await getActiveTimerForUser(userId);
    return NextResponse.json({ success: true, timer });
}
