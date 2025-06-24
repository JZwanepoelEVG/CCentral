"use client"
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, Fragment } from "react";
import moment from 'moment-timezone';

interface LinkedTasksProps {
    ticketID: number;
}

interface LinkedTask {
    ID: number;
    TaskSubject: string;
    Severity: string;
}


const LinkedTasks = ({ticketID}: LinkedTasksProps) => {
    const [linkedTasks, setLinkedTasks] = useState<LinkedTask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await fetch(`/api/tasks/${ticketID}/tasklogs`);
                const data = await res.json();
                if (data.success) setLinkedTasks(data.logs);
                else console.error(data.error);
            } catch (err) {
                console.error("Error fetching task logs:", err);
            } finally {
                setLoading(false);
            }
        }

        if (ticketID) void fetchLogs();
    }, [ticketID]);

    return (
        <Fragment>
            {loading ? (
                <p className="text-sm text-default-500 px-4 py-2">Loading linked tasks...</p>
            ) : linkedTasks.length === 0 ? (
                <p className="text-sm text-default-500 px-4 py-2">
                    No linked tasks associated with this ticket.
                </p>
            ) : (
                <ul className="divide-y divide-default-300">
                    {linkedTasks.map((item, index) => (
                        <li
                            className="flex justify-between items-center gap-2 border-b border-default-300 py-3 px-1 hover:bg-default-100"
                            key={`linked-task-${index}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-default-700">
                                    #{item.ID} | {item.TaskSubject}
                                </span>
                                </div>
                            </div>
                            <Badge color="info" className="rounded-none">Pending</Badge>
                            <a href="#"><span className="text-xs text-default-600">View</span></a>
                        </li>
                    ))}
                </ul>
            )}
        </Fragment>
    );
};

export default LinkedTasks;
