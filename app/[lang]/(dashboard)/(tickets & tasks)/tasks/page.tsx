"use client";

import { useState } from "react";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";


type Status = "todo" | "in-progress" | "completed";

interface Task {
  id: string;
  client: string;
  dueDate: string;
  severity: string;
  subject: string;
  estimatedTime: string;
  companyName: string;
  ticketNumber?: string;
  status: Status;
}

const initialTasks: Task[] = [
  {
    id: "1",
    client: "John Doe",
    dueDate: "2024-07-01",
    severity: "High",
    subject: "Fix login bug",
    estimatedTime: "3h",
    companyName: "Acme Corp",
    ticketNumber: "T-101",
    status: "todo",
  },
  {
    id: "2",
    client: "Jane Smith",
    dueDate: "2024-07-05",
    severity: "Medium",
    subject: "Update documentation",
    estimatedTime: "2h",
    companyName: "Widgets Ltd",
    status: "todo",
  },
  {
    id: "3",
    client: "Bob Jones",
    dueDate: "2024-06-30",
    severity: "Low",
    subject: "Design new logo",
    estimatedTime: "5h",
    companyName: "Brandify",
    ticketNumber: "T-102",
    status: "in-progress",
  },
  {
    id: "4",
    client: "Alice Green",
    dueDate: "2024-07-02",
    severity: "High",
    subject: "Database migration",
    estimatedTime: "8h",
    companyName: "DataSys",
    status: "in-progress",
  },
  {
    id: "5",
    client: "Steve White",
    dueDate: "2024-06-20",
    severity: "Medium",
    subject: "Create onboarding guide",
    estimatedTime: "4h",
    companyName: "Onboard Co",
    status: "completed",
  },
  {
    id: "6",
    client: "Carol Black",
    dueDate: "2024-06-18",
    severity: "Low",
    subject: "Cleanup repo",
    estimatedTime: "1h",
    companyName: "Utils Inc",
    ticketNumber: "T-099",
    status: "completed",
  },
];

interface ColumnProps {
  label: string;
  status: Status;
  tasks: Task[];
}

const Column = ({ label, status, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 dark:bg-gray-800 rounded-md p-2 min-h-[350px] flex flex-col"
    >
      <h3 className="text-center font-semibold mb-2 text-default-900 dark:text-default-50">
        {label}
      </h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id: task.id, data: { status: task.status } });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      tabIndex={0}
      className="shadow-sm mb-2 cursor-grab focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{task.subject}</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>
          <span className="font-semibold">Client:</span> {task.client}
        </p>
        <p>
          <span className="font-semibold">Due:</span> {task.dueDate}
        </p>
        <p>
          <span className="font-semibold">Severity:</span> {task.severity}
        </p>
        <p>
          <span className="font-semibold">Est. Time:</span> {task.estimatedTime}
        </p>
        <p>
          <span className="font-semibold">Company:</span> {task.companyName}
        </p>
        {task.ticketNumber && (
          <p>
            <span className="font-semibold">Ticket:</span> {task.ticketNumber}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id as Status;

    setTasks((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Tickets & Tasks</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Tasks</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900 mb-4">Tasks</div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Column
            label="To-Do"
            status="todo"
            tasks={tasks.filter((t) => t.status === "todo")}
          />
          <Column
            label="In-Progress"
            status="in-progress"
            tasks={tasks.filter((t) => t.status === "in-progress")}
          />
          <Column
            label="Completed"
            status="completed"
            tasks={tasks.filter((t) => t.status === "completed")}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default TasksPage;
