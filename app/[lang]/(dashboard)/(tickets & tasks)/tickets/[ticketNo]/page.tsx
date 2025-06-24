"use client"
import {Breadcrumbs, BreadcrumbItem} from "@/components/ui/breadcrumbs";
import {useParams} from "next/navigation";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button'
import { Icon } from "@iconify/react";
import LinkedTasks from "@/app/[lang]/(dashboard)/(tickets & tasks)/tickets/[ticketNo]/components/LinkedTasks";
import ContactDetails from "@/app/[lang]/(dashboard)/(tickets & tasks)/tickets/[ticketNo]/components/ContactDetails";
import TimeLogsTimeLine from "@/app/[lang]/(dashboard)/(tickets & tasks)/tickets/[ticketNo]/components/TimeLogTimeLine";
import TicketDetails from "@/app/[lang]/(dashboard)/(tickets & tasks)/tickets/[ticketNo]/components/TicketDetails";
import StartTimerButton from "@/components/StartTimerButton";

const TicketOverview = () => {

    const {ticketNo} = useParams();
    // Ensure ticketNo is a string and convert to number
    const ticketID = Array.isArray(ticketNo) ? parseInt(ticketNo[0]) : parseInt(ticketNo);

    return (
        <div>
            <Breadcrumbs className="mb-4">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem disabled>Tickets & Tasks</BreadcrumbItem>
                <BreadcrumbItem href={'/tickets'}> Tickets</BreadcrumbItem>
                <BreadcrumbItem className="text-primary">
                    {ticketNo ? <span>#{ticketID}</span> : <span>Unknown Ticket</span>}
                </BreadcrumbItem>
            </Breadcrumbs>

            <div className="grid grid-cols-12 sm:grid-cols-12 gap-4">
                <div className="col-span-12  sm:col-span-6 md:col-span-8 lg:col-span-9">
                    <TicketDetails ticketID={ticketID} />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <Card className="shadow-sm  mb-2 overflow-hidden">
                        <CardHeader className={'mb-0'}>Action</CardHeader>
                        <CardContent className="p-4 flex flex-auto align-middle">
                            <div className={'grid grid-cols-3 gap-2 justify-center w-full'}>
                                <StartTimerButton ticketId={ticketID} />
                            <Button size="icon" variant="outline" className="group w-full">
                                <Icon icon="material-symbols:support" className=" h-6 w-6 " />
                            </Button>
                            <Button color={'success'} size="icon" variant="outline" className="group w-full">
                                <Icon icon="material-symbols:rocket-launch-rounded" className=" h-6 w-6 " />
                            </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Accordion type="single" collapsible className="w-full space-y-3.5">
                        <AccordionItem value="item-1" className={'bg-white shadow-md'}>
                            <AccordionTrigger>Contact Details</AccordionTrigger>
                            <AccordionContent>
                                <ContactDetails />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className={'bg-white shadow-md'}>
                            <AccordionTrigger>Time Logs</AccordionTrigger>
                            <AccordionContent>
                                <TimeLogsTimeLine  ticketID={ticketID}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className={'bg-white shadow-md'}>
                            <AccordionTrigger>Linked Tasks</AccordionTrigger>
                            <AccordionContent>
                                <LinkedTasks ticketID={ticketID}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default TicketOverview;