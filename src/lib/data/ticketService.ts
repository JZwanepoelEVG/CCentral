import sql from 'mssql';
import { config } from '@/src/lib/db/dbConfig'; // Externalised config

export async function getTicketsFromDatabase(userId: number) {
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .input("UserID", sql.Int, userId) // userId must come from function param
            .execute("sp_GET_UserTicketsV3");

        return result.recordset;
    } catch (err) {
        console.error("Database error in getTicketsFromDatabase:", err);
        throw err;
    }
}