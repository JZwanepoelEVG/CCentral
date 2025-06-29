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
    const tasks = await getUserTasksFromDatabase(userId);
    return Response.json({ success: true, tasks });
  } catch (err) {
    console.error('Database error:', err);
    return Response.json({ error: 'Task fetch failed' }, { status: 500 });
  }
}
