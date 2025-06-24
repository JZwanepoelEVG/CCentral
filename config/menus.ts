import {
    LucideActivitySquare,
    BrainCircuitIcon,
    Codesandbox,
    LucideFileStack,
    NewspaperIcon,
    LucideLayoutDashboard,
    LucideTicket,
    LucideHeartHandshake,
    LucideClock,
    LucideCalendar,
    LucideUserCircle,
    LucideUsers,
    LucideAtom,
    LucideListTodo,
    LucideBookUp,
    LucideAlarmClock, LucideHelpCircle
} from 'lucide-react';

export const menusConfig = {
    sidebarNav: {
        modern: [
            {
                title: "Dashboard",
                icon: LucideLayoutDashboard ,
                href: "/dashboard",
            },
            {
                title: "Tickets & Tasks",
                icon: LucideAtom,
                child: [
                    {
                        title: "Tickets",
                        icon: LucideTicket,
                        href: "/tickets",
                    },
                    {
                        title: "Tasks",
                        icon: LucideListTodo,
                        href: "/tasks",
                    },
                    {
                        title: "Assistance Requests",
                        icon: LucideHelpCircle,
                        href: "/assistance_requests",
                    },
                    {
                        title: "Projects",
                        icon: LucideBookUp,
                        href: "/projects",
                    }
                ],
            },
            {
                title: "Calender",
                icon: LucideCalendar,
                href: "/calender",
            },
            {
                title: "Time Tracking",
                icon: LucideClock,
                child: [
                    {
                        title: "Time Tracker",
                        icon: LucideAlarmClock,
                        href: "/timetracker",
                    },
                    {
                        title: "Time Sheets",
                        icon: LucideFileStack,
                        href: "/timesheets",
                    }
                ],
            },

            {
                title: "Team",
                icon: LucideUsers,
                href: "/team"
            },
            {
                title: "Clients",
                icon: LucideUserCircle,
                href: "/clients"
            },

            {
                title: "Tools & More",
                icon: LucideHeartHandshake,
                child: [
                    {
                        title: "Changelog",
                        icon: Codesandbox,
                        href: "/changelog",
                    },
                    {
                        title: "Report IT Issue",
                        icon: LucideActivitySquare,
                        href: "/reportITIssue",
                    },
                    {
                        title: "Knowledge Base",
                        icon: BrainCircuitIcon,
                        href: "https://confidence.scubed.co.za/",
                    },
                    {
                        title: "News Letter",
                        icon: NewspaperIcon,
                        href: "https://confidence.scubed.co.za/books/internal-newsletters",
                    },
                ],
            }
        ],
    },
};


export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]
