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
      dueDate: t.DueDate,
      severity: t.Severity,
      subject: t.Subject,
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
