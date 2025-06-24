"use client";
import { useState, useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TicketCards from "@/app/[lang]/(dashboard)/(tickets & tasks)/tickets/components/TicketCards";

const TicketsPage = () => {
    const [ticketFilter, setTicketFilter] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleButtonClick = (filter: string) => {
        setTicketFilter(filter);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        async function fetchTickets() {
            try {
                const res = await fetch("/api/tickets");
                const data = await res.json();
                if (data.success) {
                    setTickets(data.tickets);
                } else {
                    console.error("Ticket fetch failed:", data.error);
                }
            } catch (err) {
                console.error("Error fetching tickets:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchTickets();
    }, []);

    return (
        <div>
            <Breadcrumbs className={'mb-4'}>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Tickets & Tasks</BreadcrumbItem>
                <BreadcrumbItem className="text-primary">Tickets</BreadcrumbItem>
            </Breadcrumbs>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-2">
                    <Card className="shadow-sm">
                        <CardHeader className="mb-0 pt-4 pl-4 pb-4 flex-row border-b-black-100 flex-wrap items-center justify-between gap-2">
                            <CardTitle className="whitespace-nowrap">Quick Filter</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {["", "1", "2", "3", "4", "overdue", "feedback" ].map((filter) => (
                                <Button
                                    key={filter}
                                    onClick={() => handleButtonClick(filter)}
                                    disabled={ticketFilter === filter}
                                    className="w-full rounded-none shadow mb-2"
                                    variant="outline"
                                    color={
                                        filter === "1"
                                            ? "destructive"
                                            : filter === "2"
                                                ? "warning"
                                                : filter === "3"
                                                    ? "primary"
                                                    : filter === "4"
                                                        ? "success"
                                                        : filter === "overdue"
                                                            ? "warning"
                                                            : filter === "feedback"
                                                                ? "info"
                                                                : filter === "resolved"
                                                                    ? "success"
                                                                    : "secondary"
                                    }
                                >
                                    {filter === "" ? "Overview" : filter === "1" ? "Severity 1 (Priority)" : filter === "2" ? "Severity 2 (Critical)" :  filter === "3" ? "Severity 3 (Urgent)" : filter === "4" ? "Severity 4 (Future Request)" :  filter === "overdue" ? "Overdue" : filter === "feedback" ? "Awaiting Feedback" : "Resolved"}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-12 md:col-span-10">
                    <Card className="shadow-sm">
                        <CardHeader className="mb-0 pt-4 pl-4 pb-4 flex-row border-b-black-100 flex-wrap items-center justify-between gap-2">
                            <CardTitle className="whitespace-nowrap">Overview</CardTitle>
                            <div className="md:col-span-10">
                                <Input onChange={handleSearchChange} type="text" placeholder="Search" value={searchValue} size="sm" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-4 bg-gray-50 dark:bg-gray-700">
                            {loading ? (
                                <p>Loading tickets...</p>
                            ) : (
                                <TicketCards tickets={tickets} searchValue={searchValue} priorityFilter={ticketFilter} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TicketsPage;
