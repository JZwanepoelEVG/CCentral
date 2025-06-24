"use client"

import {Docs} from "@/components/svg";
import {Card} from "@/components/ui/card";
import {CheckIcon, LucideCalendarClock, TrendingDown, TrendingUp} from "lucide-react";
import React, {Fragment} from "react";

const ReportsCard = () => {
    interface ReportItem {
        id: number;
        name: string;
        count: string;
        rate: number;
        icon: React.ReactNode;
        color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'destructive' | 'default' | 'dark'
    }

    const reports: ReportItem[] = [
        {
            id: 1,
            name: "Hours This Month",
            count: "163",
            rate: 12,
            icon: <LucideCalendarClock className="w-6 h-6 text-primary"/>,
            color: "primary"
        },
        {
            id: 2,
            name: "Hours This Week",
            count: "40",
            rate: 8.2,
            icon: <Docs className="w-6 h-6 text-success"/>,
            color: "success"
        },
        {
            id: 3,
            name: "Hours Today",
            count: "3",
            rate: -5.2,
            icon: <Docs className="w-6 h-6 text-destructive"/>,
            color: "destructive"
        }
    ]
    return (
        <Fragment>
            {
                reports.map(item => (
                    <Card key={item.id}
                          className="rounded-lg p-4 xl:p-2 xl:py-6 2xl:p-6  flex flex-col items-center 2xl:min-w-[168px]">
                        <div>
              <span className={`h-12 w-12 rounded-full flex justify-center items-center bg-${item.color}/10`}>
                {item.icon}
              </span>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="text-base font-medium text-default-600">{item.name}</div>
                            <div className={`text-3xl font-semibold text-${item.color} mt-1`}>{item.count}</div>
                            <div className="flex items-center gap-1 mt-2.5">
                                <span className="text-xs xl:text-sm font-medium text-default-600 whitespace-nowrap">Change</span>
                                {item.rate > 0 ?
                                    <><span
                                        className="text-xs xl:text-sm font-medium text-success">+{item.rate}%</span><TrendingUp
                                        className="h-[14px] w-[14px] text-success/90"/></>
                                    :
                                    <><span
                                        className="text-xs xl:text-sm font-medium text-red-600">{item.rate}%</span><TrendingDown
                                        className="h-[14px] w-[14px] text-red-600/90"/></>
                                }
                            </div>
                        </div>
                    </Card>
                ))
            }
        </Fragment>
    );
};

export default ReportsCard;