// components/StartTimerButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

interface TimerRecord {
    id: number;
    userId: number;
    ticketId: number;
    startTime: string;
    endTime: string | null;
    comments: string;
}

export default function StartTimerButton({ ticketId }: { ticketId: string }) {
    const [isStarting, setIsStarting] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClick = async () => {
        setIsStarting(true);

        // 1) Optimistically write a timer into the cache immediately
        const nowIso = new Date().toISOString();
        const optimisticTimer: TimerRecord = {
            id: -1,
            userId: -1,
            ticketId: parseInt(ticketId, 10),
            startTime: nowIso,
            endTime: null,
            comments: `${ticketId} Time log`,
        };
        queryClient.setQueryData<{ success: true; timer: TimerRecord; serverTime: string }>(
            ['activeTimer'],
            { success: true, timer: optimisticTimer, serverTime: nowIso }
        );

        try {
            // 2) Fire the real API
            const res = await fetch('/api/timer/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // send the ticketId as originally provided; the API will coerce
                body: JSON.stringify({ ticketId }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const body = await res.json() as { success: boolean; timer: TimerRecord; serverTime?: string };

            // 3) Overwrite with the authoritative server response (and actual serverTime)
            queryClient.setQueryData(['activeTimer'], {
                success: true,
                timer: body.timer,
                serverTime: body.serverTime || new Date().toISOString(),
            });

            // 4) Invalidate so any other watchers refetch if needed
            await queryClient.invalidateQueries({ queryKey: ['activeTimer'] });

            // 5) Refresh any SSR state if you like
            router.refresh();
        } catch (err) {
            console.error('Failed to start timer:', err);
            // Roll back on error
            queryClient.setQueryData(['activeTimer'], null);
        } finally {
            setIsStarting(false);
        }
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isStarting}
            color="dark"
            size="icon"
            variant="outline"
            className="group w-full"
            aria-label={isStarting ? 'Starting timer…' : 'Start timer'}
        >
            <Icon
                icon="material-symbols:timer-play-outline"
                className={`h-6 w-6 transition-transform ${isStarting ? 'animate-spin' : ''}`}
            />
        </Button>
    );
}
