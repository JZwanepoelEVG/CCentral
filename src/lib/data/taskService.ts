import sql from 'mssql';
import { config } from '@/src/lib/db/dbConfig';

export async function getUserTasksFromDatabase(userId: number) {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('UserID', sql.Int, userId)
      // call stored procedure for user tasks
      .execute('sp_GET_UserTasksV3');

    return result.recordset;
  } catch (err) {
    console.error('Database error in getUserTasksFromDatabase:', err);
    throw err;
  }
}
