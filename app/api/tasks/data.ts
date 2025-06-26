export interface Task {
  id: string;
  title: string;
  boardId?: string;
  desc?: string;
  priority?: string;
  status?: string;
  tags?: string[];
  assign?: { name?: string; image?: { src: string } }[];
  image?: string;
  category?: string;
  pages?: unknown;
  messageCount?: number;
  link?: string;
  date?: string;
  time?: string;
}

export interface SubTask {
  id: string;
  title: string;
  taskId?: string;
  completed?: boolean;
  assignDate?: string;
  priority?: string;
  assign?: { name?: string; image?: string }[];
}
