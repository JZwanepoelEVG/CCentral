import sql from 'mssql';
import { config } from '@/src/lib/db/dbConfig'; // Externalised config

export async function getTaskLogsForTicket(instanceId: number) {
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .input('InstanceID', sql.Int, instanceId)
            .execute("sp_GET_LinkedTasksByInstanceID");

        return result.recordset;
    } catch (err) {
        console.error("Database error in sp_GET_LinkedTasksByInstanceID:", err);
        throw err;
    }
}