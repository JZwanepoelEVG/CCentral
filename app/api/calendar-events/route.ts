// app/api/calendar-events/route.ts
import { NextResponse }       from "next/server";
import { getServerSession }   from "next-auth/next";       // <-- App-Router import
import { authOptions }        from "@/lib/auth";
import { getGraphClient }     from "@/lib/graph";
import moment                 from "moment-timezone";

export const runtime = "nodejs";

export async function GET(request: Request) {
    // 1) authenticate and grab a fresh accessToken
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    // 2) allow a simple health check
    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start");
    const end   = searchParams.get("end");
    if (!start || !end) {
        // if you just browse to /api/calendar-events without params:
        if (!start && !end && !searchParams.toString()) {
            return NextResponse.json({ status: "ok" }, { status: 200 });
        }
        return NextResponse.json(
            { error: "Missing ‘start’ or ‘end’ query parameter" },
            { status: 400 }
        );
    }

    try {
        // 3) build a Graph client with our valid token
        const client = getGraphClient(session.accessToken);

        // 4) find the default calendar
        const calendars = await client.api("/me/calendars").get();
        const defaultCal = calendars.value.find((c: any) => c.isDefaultCalendar);
        if (!defaultCal) {
            return NextResponse.json(
                { error: "No default calendar found" },
                { status: 404 }
            );
        }

        // 5) fetch the calendarView for the window
        const events = await client
            .api(`/me/calendars/${defaultCal.id}/calendarView`)
            .query({
                startDateTime: start,
                endDateTime:   end,
            })
            .orderby("start/dateTime")
            .top(100)
            .get();

        // 6) format into your UI shape
        const formatted = events.value.map((ev: any) => {
            const utc      = moment.utc(ev.start.dateTime);
            const local    = utc.tz("Africa/Johannesburg");
            return {
                task:  ev.subject || "No title",
                date:  local.format("DD MMM YYYY"),
                time:  local.format("HH:mm"),
                host:  ev.organizer?.emailAddress?.name || "Unknown",
                link:  ev.webLink || "#",
            };
        });

        return NextResponse.json(formatted, { status: 200 });
    } catch (err: any) {
        console.error("❌ Graph API error:", err);
        return NextResponse.json(
            { error: "Failed to fetch calendar events." },
            { status: 500 }
        );
    }
}
