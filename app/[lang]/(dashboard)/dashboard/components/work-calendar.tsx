"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import {
    isSameDay,
    startOfMonth,
    endOfMonth,
    format,
} from "date-fns";
import moment from "moment-timezone";

interface CalendarItem {
    task: string;
    date: string;
    host: string;
    link: string;
    time?: string;
}

const WorkCalendar = () => {
    const timeZone = "Africa/Johannesburg";
    const today = moment().tz(timeZone).toDate();

    const [data, setData] = useState<CalendarItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(today);
    const [activeDates, setActiveDates] = useState<Record<string, "past" | "future" | "mixed">>({});
    const [currentMonth, setCurrentMonth] = useState<Date>(today);

    const fetchEvents = async (month: Date) => {
        try {
            setLoading(true);
            const start = startOfMonth(month).toISOString();
            const end = endOfMonth(month).toISOString();
            const res = await fetch(`/api/calendar-events?start=${start}&end=${end}`);

            if (!res.ok) throw new Error("Failed to fetch calendar data");

            const json = await res.json();
            const events = Array.isArray(json) ? json : [];

            setData(events);

            const now = moment().tz(timeZone);
            const dateStatusMap: Record<string, "past" | "future" | "mixed"> = {};
            const grouped: Record<string, CalendarItem[]> = {};

            events.forEach((item) => {
                const eventMoment = moment.tz(`${item.date} ${item.time ?? "00:00"}`, "DD MMM YYYY HH:mm", timeZone);
                const dateKey = eventMoment.format("YYYY-MM-DD");
                if (!grouped[dateKey]) grouped[dateKey] = [];
                grouped[dateKey].push(item);
            });

            for (const [dateKey, items] of Object.entries(grouped)) {
                let hasPast = false;
                let hasFuture = false;

                for (const event of items) {
                    const eventMoment = moment.tz(`${event.date} ${event.time ?? "00:00"}`, "DD MMM YYYY HH:mm", timeZone);
                    if (eventMoment.isBefore(now)) hasPast = true;
                    else hasFuture = true;
                }

                dateStatusMap[dateKey] = hasPast && hasFuture ? "mixed" : hasPast ? "past" : "future";
            }

            setActiveDates(dateStatusMap);
        } catch (err) {
            console.error("Failed to load calendar data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(currentMonth);
    }, [currentMonth]);

    const filtered = Array.isArray(data) && selectedDate
        ? data.filter((item) =>
            isSameDay(moment.tz(`${item.date} ${item.time ?? "00:00"}`, "DD MMM YYYY HH:mm", timeZone).toDate(), selectedDate)
        )
        : data;

    return (
        <Card>
            <CardHeader className="sm:flex-row border-none gap-4 mb-0 pt-6">
                <div className="flex-1">
                    <div className="text-xl font-medium tex-default-900">What's on the Note!</div>
                    <div className="text-sm font-medium text-default-600">
                        {loading
                            ? "Loading events..."
                            : `Total ${filtered.length} item(s) on ${selectedDate ? format(selectedDate, "dd MMM yyyy") : format(currentMonth, "MMMM yyyy")}`}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-3 md:px-6 pt-0">
                <Calendar
                    className="dark:bg-background shadow-sm rounded-lg"
                    selected={selectedDate ?? undefined}
                    onDayClick={(day) => setSelectedDate(day)}
                    onMonthChange={(date) => setCurrentMonth(date)}
                    modifiers={{
                        today: (day: Date) => isSameDay(day, today),
                        pastEvent: (day: Date) => activeDates[moment(day).format("YYYY-MM-DD")] === "past",
                        futureEvent: (day: Date) => activeDates[moment(day).format("YYYY-MM-DD")] === "future",
                        mixedEvent: (day: Date) => activeDates[moment(day).format("YYYY-MM-DD")] === "mixed",
                    }}
                    modifiersClassNames={{
                        today: "border border-primary text-primary font-bold",
                        pastEvent:
                            "relative before:content-[''] before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-500",
                        futureEvent:
                            "relative before:content-[''] before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500",
                        mixedEvent:
                            "relative before:content-[''] before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-500",
                    }}
                />

                <div className="space-y-5 mt-6">
                    {filtered.map((item, index) => {
                        const eventDateTime = moment.tz(`${item.date} ${item.time ?? "00:00"}`, "DD MMM YYYY HH:mm", timeZone);
                        const isPast = eventDateTime.isBefore(moment().tz(timeZone));
                        const borderClass = isPast ? "before:bg-red-500" : "before:bg-blue-500";

                        return (
                            <div
                                key={`works-note-${index}`}
                                className={`flex justify-between items-center gap-4 pl-4 relative before:absolute before:top-0 before:left-0 before:h-full before:w-1 ${borderClass}`}
                            >
                                <div>
                                    <div className="text-xs text-default-500 mb-1.5">
                                        {eventDateTime.format("DD MMM YYYY • HH:mm")}
                                    </div>
                                    <div className="text-sm font-medium text-default-800 mb-[2px]">{item.task}</div>
                                    <div className="text-xs text-default-600">
                                        Lead By <span className="font-medium text-primary/90 ml-1">{item.host}</span>
                                    </div>
                                </div>
                                <Button type="button" color="secondary" size="sm" className="h-8" asChild>
                                    <Link target={'_blank'} href={item.link}>View</Link>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default WorkCalendar;