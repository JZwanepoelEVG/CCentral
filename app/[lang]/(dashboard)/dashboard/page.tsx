"use client"
import WelcomeBlock from "./components/welcome-block";
import ReportsCard from "./components/reports";
import ReportChart from "./components/report-chart";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import RecentTickets from "./components/recent-tickets";
import RecentActivity from "./components/recent-activity";
import WorkCalendar from "@/app/[lang]/(dashboard)/dashboard/components/work-calendar";

const dashboardPage = () => {
    return (
        <div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4 mt-10 md:mt-0">
                    <WelcomeBlock/>
                </div>
                <div className="col-span-12 md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <ReportsCard/>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="grid grid-cols-1 sm:grid-cols-1 2xl:grid-cols-4 gap-2">
                        <div className="col-span-12">
                            <Card>
                                <CardHeader
                                    className="mb-0 border-none pt-6 pl-7 pb-0 flex-row flex-wrap items-center justify-between gap-2">
                                    <CardTitle className="whitespace-nowrap">Progress Chart</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <ReportChart/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <RecentTickets />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <RecentActivity />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <WorkCalendar />
                </div>
            </div>
        </div>
    );
};

export default dashboardPage;