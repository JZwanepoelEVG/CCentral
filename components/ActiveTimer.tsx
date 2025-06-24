// components/ActiveTimer.tsx
'use client';

import { useActiveTimer } from '@/hooks/useActiveTimer';
import { TimerApiService } from '@/services/TimerApiService';
import StopTimerButton from "@/components/StopTimerButton";
import React from "react";
import { Clock2 } from 'lucide-react';

export default function ActiveTimer() {
    const { timer, display } = useActiveTimer(new TimerApiService());

    if (!timer) return null;

    return (
        <div className="rounded-full border-2 border-gray-300 px-3 py-1.5 shadow">
            <div className="flex items-center space-x-1 font-mono drop-shadow-xl text-sm">
                <a href={`/en/tickets/${timer.ticketId}`} className="underline">
                    #{timer.ticketId}
                </a>
                <div className="text-sm text-gray-900 ">| {timer.subject} |</div>
                <span>  {display}</span>
                <StopTimerButton/>
            </div>
        </div>
    );
}
