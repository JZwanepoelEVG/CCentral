// lib/data/timeLogService.ts

import sql from 'mssql';
import { config } from '@/src/lib/db/dbConfig';

export async function getTimeLogsForTicket(instanceId: number) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .input('InstanceID', sql.Int, instanceId)
        .execute('sp_GET_TimeLogsByInstanceID');

    return result.recordset;
}
