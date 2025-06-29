import sql from 'mssql';
import { config } from '@/src/lib/db/dbConfig';

export async function getUserTasksFromDatabase(userId: number) {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('UserID', sql.Int, userId)
      .execute('sp_GET_UserTasks');

    return result.recordset;
  } catch (err) {
    console.error('Database error in getUserTasksFromDatabase:', err);
    throw err;
  }
}
