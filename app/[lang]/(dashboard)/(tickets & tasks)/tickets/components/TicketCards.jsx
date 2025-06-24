import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

// Helper function to get company acronym
const getAcronym = (name) => {
    return name
        .split('')
        .filter(char => /[A-Z0-9]/.test(char))
        .join('');
};

const TicketCards = ({ ticket }) => {

    const router = useRouter();
    const companyClient = getAcronym(ticket.Client);

    // Function to handle ticket click
    const handleTicketClick = () => {
        router.push(`/tickets/${ticket.Instance_ID}`); // Navigate to ticket overview
    };

    return (
        <Card onClick={handleTicketClick} className="rounded-lg col-span-12 h-full shadow-sm hover:shadow-md hover:border-b-gray-400 hover:border-b-3 hover:cursor-pointer border overflow-hidden">
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    {/* Left Section: Avatar + Ticket Info */}
                    <div className="flex items-start sm:items-center gap-3 w-full min-w-0">
                        <Avatar className="hidden h-[64px] w-[64px] drop-shadow sm:block flex-shrink-0">
                            <AvatarImage src={ticket.avatar} alt={ticket.user} />
                            <AvatarFallback>
                                {ticket.avatar ? ticket.Client : companyClient}
                            </AvatarFallback>
                        </Avatar>
                        <div className="w-full min-w-0">
                            <h5 className="text-md font-semibold truncate">#{ticket.Instance_ID} | {ticket.Subject}</h5>
                            <p className="font-light text-sm line-clamp-2 sm:line-clamp-1">
                                {ticket.Details}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                {ticket.CheckedOutByFullKnownName} ({ticket.Client}) • {ticket.BudgetedTime}
                            </p>
                        </div>
                    </div>
                    {/* Right Section: Status + Priority */}
                    <div className="flex flex-row sm:flex-col items-end gap-1 flex-shrink-0">
                        <Badge
                            className={
                                ticket.priorityNo === "1"
                                    ? "bg-red-100 text-red-600 rounded-none"
                                    : ticket.priorityNo === "2"
                                        ? "bg-amber-100 text-amber-600 rounded-none"
                                        : ticket.priorityNo === "3"
                                            ? "bg-primary-100 text-primary-600 rounded-none"
                                            : "bg-blue-100 text-blue-600 rounded-none"
                            }
                        >
                            {ticket.Severity}
                        </Badge>
                        <Badge
                            className={
                                new Date(ticket.DueDate) < new Date()
                                    ? "bg-red-100 text-red-600 rounded-none animate-pulse"
                                    : "bg-gray-100 text-gray-600 rounded-none"
                            }
                        >
                            <p>{ticket.DueDate}</p>
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};



export default function TicketList({ tickets, searchValue, priorityFilter }) {
    const filteredTicketsSearch = tickets.filter(ticket =>
        ticket.Subject.toLowerCase().includes(searchValue.toLowerCase()) ||
        ticket.CheckedOutByFullKnownName.toLowerCase().includes(searchValue.toLowerCase()) ||
        ticket.Instance_ID.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        ticket.Client.toLowerCase().includes(searchValue.toLowerCase())
    );

    const filteredTicketsPriorities = filteredTicketsSearch.filter(ticket => {
        const currentDate = new Date();

        if (!priorityFilter && ticket.status !== 'resolved') return true;

        if (priorityFilter === '1' && ticket.Severity === 'Severity 1 (Priority)' && ticket.status !== 'resolved' && ticket.status !== 'feedback') return true;
        if (priorityFilter === '2' && ticket.Severity === 'Severity 2 (Critical)' && ticket.status !== 'resolved' && ticket.status !== 'feedback') return true;
        if (priorityFilter === '3' && ticket.Severity === 'Severity 3 (Urgent)' && ticket.status !== 'resolved' && ticket.status !== 'feedback') return true;
        if (priorityFilter === '4' && ticket.Severity === 'Severity 4 (Future Request)' && ticket.status !== 'resolved' && ticket.status !== 'feedback') return true;

        if (priorityFilter === 'feedback' && ticket.status === 'feedback') return true;
       // if (priorityFilter === 'resolved' && ticket.status === 'resolved') return true;

        if (priorityFilter === 'overdue' && new Date(ticket.DueDate) < currentDate && ticket.status !== 'resolved' && ticket.status !== 'feedback') return true;

        return false;
    });

    return (
        <div className="grid grid-cols-12 gap-1">
            {filteredTicketsPriorities.length === 0 ? (
                <div className="col-span-12 text-center text-gray-500 py-6">
                    No tickets found matching your filter or search.
                </div>
            ) : (
                filteredTicketsPriorities.map((ticket, index) => (
                    <TicketCards key={index} ticket={ticket} />
                ))
            )}
        </div>
    );
}

