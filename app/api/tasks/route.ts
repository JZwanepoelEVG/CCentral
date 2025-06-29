import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserTasksFromDatabase } from '@/src/lib/data/taskService';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.userId) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const userId = session.user.userId;

  try {
    const rawTasks = await getUserTasksFromDatabase(userId);
    const tasks = rawTasks.map((t: any) => ({
      id: String(t.Instance_ID),
      client: t.Client,
      clientId: t.ClientID,
      details: t.Details,
      dueDate: t.DueDate,
      createdAt: t.CreatedAt,
      severity: t.Severity,
      subject: t.Subject,
      ticketNumber: t.LinkedToTicketID ? String(t.LinkedToTicketID) : undefined,
      ticketSubject: t.TicketSubject,
      projectId: t.LinkedToProjectID,
      allocatedTime: t.AllocatedTime,
      projectName: t.ProjectName,
      resolved: t.Resolved,
      createdBy: t.CreatedBy,
      status:
        t.Status === 0
          ? 'todo'
          : t.Status === 1
            ? 'in-progress'
            : 'completed',
    }));

    return Response.json({ success: true, tasks });
  } catch (err) {
    console.error('Database error:', err);
    return Response.json({ error: 'Task fetch failed' }, { status: 500 });
  }
}
