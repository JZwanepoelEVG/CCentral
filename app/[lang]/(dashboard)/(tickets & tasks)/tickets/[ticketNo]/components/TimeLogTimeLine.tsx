"use client";
import { Timeline, TimelineItem, TimelineContent, TimelineDot, TimelineConnector, TimelineSeparator } from "@/components/ui/timeline";
import { useEffect, useState, Fragment } from "react";
import moment from "moment-timezone";

interface TimeLogsTimeLineProps {
    ticketID: number;
}

interface TimeLog {
    FullNamePlain: string;
    EntryEndDate: string;
    EntryEndTime: string;
    DurationMinutes: number;
    Instance_ID: number;
}

const TimeLogsTimeLine = ({ ticketID }: TimeLogsTimeLineProps) => {
    const [logs, setLogs] = useState<TimeLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await fetch(`/api/tickets/${ticketID}/timelogs`);
                const data = await res.json();
                if (data.success) setLogs(data.logs);
                else console.error(data.error);
            } catch (err) {
                console.error("Error fetching time logs:", err);
            } finally {
                setLoading(false);
            }
        }

        if (ticketID) void fetchLogs();
    }, [ticketID]);

    const formatDuration = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = Math.floor(mins % 60);
        const s = Math.round((mins % 1) * 60);
        return `${h ? `${h} Hour${h > 1 ? "s" : ""} ` : ""}${m ? `${m} Minute${m > 1 ? "s" : ""} ` : ""}${s ? `${s} Second${s > 1 ? "s" : ""}` : ""}`.trim();
    };

    const formatDateTime = (date: string, time: string): string => {
        const combined = `${date} ${time.slice(11, 19)}`;
        const parsed = moment.tz(combined, "YYYY-MM-DD HH:mm:ss", "Africa/Johannesburg");

        if (!parsed.isValid()) return "Invalid Date";

        const now = moment.tz("Africa/Johannesburg");
        const diffInHours = now.diff(parsed, "hours");

        return diffInHours < 24
            ? parsed.from(now)
            : parsed.format("DD MMM YYYY, HH:mm");
    };

    return (
        <Fragment>
            {loading ? (
                <p className="text-sm text-default-500 px-4 py-2">Loading timeline...</p>
            ) : logs.length === 0 ? (
                <p className="text-sm text-default-500 px-4 py-2">No time logs found for this ticket.</p>
            ) : (
                <Timeline className="mt-2">
                    {logs.map((log, index) => (
                        <TimelineItem key={index} className="pb-4">
                            <TimelineSeparator>
                                <TimelineDot color={index === 0 ? "primary" : "default"} />
                                {index !== logs.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <div className="md:flex gap-2">
                                    <div className="grow">
                                        <h5 className="font-medium text-sm text-default-600">
                                            {log.FullNamePlain}
                                        </h5>
                                    </div>
                                    <div className="text-default-400 text-xs md:min-w-[90px] md:max-w-[120px] md:text-right">
                                        {formatDateTime(log.EntryEndDate, log.EntryEndTime)}
                                    </div>
                                </div>
                                <p className="text-sm text-default-500 mt-1">
                                    {formatDuration(log.DurationMinutes)} <br />
                                    Ticket {log.Instance_ID} Log
                                </p>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            )}
        </Fragment>
    );
};

export default TimeLogsTimeLine;
