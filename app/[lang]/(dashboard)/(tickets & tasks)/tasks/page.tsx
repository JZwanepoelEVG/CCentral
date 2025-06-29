"use client";

import { useState } from "react";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {padStart} from "lodash-es";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import StartTimerButton from "@/components/StartTimerButton";


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
  resolution?: string;
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
  onViewTask: (task: Task) => void;
  borderColor?: string;
}

const Column: React.FC<ColumnProps> = ({ label, status, tasks, onViewTask, borderColor = 'border-gray-800' }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
      <div
          ref={setNodeRef}
          className={`
        bg-gray-50 dark:bg-gray-800
        border-t-4 border-solid
        ${borderColor}
        rounded-md p-2
        min-h-[350px] flex flex-col
      `}
      >
        <h3 className="text-center font-semibold mb-2 text-default-900 dark:text-default-50">
          {label}
        </h3>
        {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onView={onViewTask} />
        ))}
      </div>
  );
};

interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
}

const TaskCard = ({ task, onView }: TaskCardProps) => {
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
      className="drop-shadow-lg mb-2 cursor-grab focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm w-100">
          <div className="flex justify-between md:grid md:grid-cols-2 gap-2 items-center pb-2">
            <span>#{padStart(task.id,6,'0')} | {task.subject}</span>
            <span className="md:justify-self-end pr-2 flex gap-1">
               <StartTimerButton ticketId={task.id} />
               <Button
                 size="icon"
                 variant="outline"
                 color="secondary"
                 onClick={() => onView(task)}
                 aria-label="View task details"
               >
                 <Eye className="w-4 h-4" />
               </Button>
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
            <span className="font-semibold">Linked Ticket:</span> {task.ticketNumber}
          </p>
        )}
        </div>
      </CardContent>
    </Card>
  );
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [resolutionText, setResolutionText] = useState("");
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((t) => {
    const term = searchTerm.toLowerCase();
    return (
      t.subject.toLowerCase().includes(term) ||
      t.client.toLowerCase().includes(term) ||
      t.companyName.toLowerCase().includes(term) ||
      (t.ticketNumber && t.ticketNumber.toLowerCase().includes(term)) ||
      t.id.includes(term)
    );
  });

  const handleViewTask = (task: Task) => {
    setDetailTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id as Status;
    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    if (newStatus === "completed" && activeTask.status !== "completed") {
      setPendingTaskId(active.id as string);
      setResolutionOpen(true);
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t))
    );
  };

  const handleResolutionSubmit = () => {
    if (!pendingTaskId) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === pendingTaskId ? { ...t, status: "completed", resolution: resolutionText } : t
      )
    );
    setResolutionText("");
    setPendingTaskId(null);
    setResolutionOpen(false);
  };

  const handleResolutionCancel = () => {
    setResolutionText("");
    setPendingTaskId(null);
    setResolutionOpen(false);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Tickets & Tasks</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Tasks</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium  text-default-900 mb-4">Tasks</div>
      <div className="relative max-w-xs mb-4">
        <Search className="absolute top-1/2 -translate-y-1/2 left-2 w-4 h-4 text-default-500" />
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-7"
        />
      </div>

      <Dialog open={!!detailTask} onOpenChange={(o) => !o && setDetailTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {detailTask && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Subject:</span> {detailTask.subject}
              </p>
              <p>
                <span className="font-semibold">Client:</span> {detailTask.client}
              </p>
              <p>
                <span className="font-semibold">Company:</span> {detailTask.companyName}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailTask(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={resolutionOpen} onOpenChange={setResolutionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Resolution</DialogTitle>
            <DialogDescription>
              Please provide a resolution description before completing this task.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={resolutionText}
            onChange={(e) => setResolutionText(e.target.value)}
            placeholder="Resolution details"
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleResolutionCancel}>Cancel</Button>
            <Button onClick={handleResolutionSubmit} disabled={!resolutionText.trim()}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Column
            label="To-Do"
            status="todo"
            borderColor={'border-amber-900'}
            tasks={filteredTasks.filter((t) => t.status === "todo")}
            onViewTask={handleViewTask}
          />
          <Column
            label="In-Progress"
            status="in-progress"
            borderColor={'border-blue-400'}
            tasks={filteredTasks.filter((t) => t.status === "in-progress")}
            onViewTask={handleViewTask}
          />
          <Column
            label="Completed"
            status="completed"
            borderColor={'border-lime-500'}
            tasks={filteredTasks.filter((t) => t.status === "completed")}
            onViewTask={handleViewTask}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default TasksPage;
