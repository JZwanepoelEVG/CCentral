// src/lib/data/timerService.ts
import sql from "mssql";
import { config } from "@/src/lib/db/dbConfig";

export interface TimerRecord {
    id:        number;
    ticketId:  number;
    startTime: Date;
    elapsedMs: number;
    comments:  string;
}

/**
 * Fetch the one active timer for this user.
 */
export async function getActiveTimerForUser(
    userId: number
): Promise<TimerRecord | null> {
    const pool   = await sql.connect(config);
    const result = await pool.request()
        .input("UserId", sql.Int, userId)
        .execute("sp_TIMER_GetActiveTimerForUser");

    const row = result.recordset[0];
    if (!row) return null;

    return {
        id:            row.TimerId,
        ticketId:      row.TicketId,
        entryClient:   row.EntryClient,
        entryDate:     row.EntryStartDate,
        entryTime:     row.EntryStartTime,
        startTime:     new Date(row.StartTime),
        elapsedMs:     Number(row.ElapsedMs),
        comments:      row.Comments,
        subject:       row.Subject
    };
}

/**
 * Start (or get) the active timer for this user/ticket.
 */
export async function startTimerForUser(
    userId: number,
    ticketId: number,
    lastModifiedUser: string,
    comment?: string
): Promise<TimerRecord | null> {
    const pool   = await sql.connect(config);
    const result = await pool.request()
        .input("UserId",           sql.Int,          userId)
        .input("TicketId",         sql.Int,          ticketId)
        .input("LastModifiedUser", sql.VarChar(200), lastModifiedUser)
        .input("Comment",          sql.VarChar(500), comment ?? null)
        .execute("sp_TIMER_StartTimerForUser");

    const row = result.recordset[0];
    if (!row) return null;

    return {
        id:        row.TimerId,
        ticketId:  row.TicketId,
        startTime: new Date(row.StartTime),
        elapsedMs: 0,                   // fresh start has zero elapsed
        comments:  row.Comments,
    };
}

/**
 * Stop the currently running timer for this user.
 */
export async function stopTimerForUser(
    userId: number,
    lastModifiedUser: string,
    comment?: string
): Promise<TimerRecord | null> {
    try {
        const pool   = await sql.connect(config);
        const result = await pool.request()
            .input("UserId",           sql.Int,          userId)
            .input("LastModifiedUser", sql.VarChar(200), lastModifiedUser)
            .input("Comment",          sql.VarChar(500), comment ?? null)
            .execute("sp_TIMER_StopTimerForUser");

        const row = result.recordset[0];
        if (!row) return null;

        const start = new Date(row.StartTime);
        const end   = new Date(row.EndTime);
        const elapsedMs = end.getTime() - start.getTime();

        return {
            id:        row.TimerId,
            ticketId:  row.TicketId,
            startTime: start,
            elapsedMs,
            comments:  row.Comments,
        };
    } catch (err) {
        console.error("stopTimerForUser error:", err);
        return null;
    }
}