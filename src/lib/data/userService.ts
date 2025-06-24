import sql from 'mssql';
import { config } from '@/src/lib/db/dbConfig';

export async function getUserDetails(email: string) {
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .input('Email', sql.VarChar, email) // Correct parameter name
            .execute('sp_UserData_GetUserDetailsV3');

        const user = result.recordset[0];

        if (!user) return null;

        return {
            employee_No: user.Employee_No,
            firstName: user.FirstName,
            lastName: user.LastName,
            fullName: user.FullName,
            nickname: user.NickName,
            email: user.EmailAddress,
            avatar: user.PhotoURL,
            company: user.Company,
            directManagerName: user.DirectManagerName,
            directManagerEmployee_No: user.DirectManagerEmployeeNo,
        };
    } catch (error) {
        console.error('Error in getUserDetails:', error);
        return null;
    }
}
