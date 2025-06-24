// lib/data/formService.ts
import sql from 'mssql';
import { config } from '@/src/lib/db/dbConfig';

export async function getFormsForTicket(ticketId: number) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .input('Instance_ID', sql.Int, ticketId)
        .execute('sp_GET_TicketDetailsV3'); // Replace with actual SP

    return result.recordset;
}
