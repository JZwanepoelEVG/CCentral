// hooks/useActiveTimer.ts
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import type { ITimerService, TimerRecord } from '@/services/ITimerService';

export function useActiveTimer(service: ITimerService) {
    const [display, setDisplay] = useState<string>('00:00:00');
    const intervalRef = useRef<number>();

    const { data: timer } = useQuery({
        queryKey: ['activeTimer'],
        queryFn: () => service.getActiveTimer(),
        refetchInterval: 15_000,
        retry: false,
    });

    useEffect(() => {
        // clear any previous interval
        if (intervalRef.current) clearInterval(intervalRef.current);

        // no timer → reset and bail
        if (!timer) {
            setDisplay('00:00:00');
            return;
        }

        // coerce elapsedMs to a number
        const raw = timer.elapsedMs;
        const baseMs = typeof raw === 'string'
            ? parseInt(raw, 10)
            : raw;

        const clientT0 = Date.now();

        const tick = () => {
            const extraMs = Date.now() - clientT0;
            const totalMs = baseMs + extraMs;

            // guard: if we don't have a finite number yet, show Starting…
            if (!Number.isFinite(totalMs) || totalMs < 0) {
                setDisplay('Starting...');
                return;
            }

            // otherwise compute HH:MM:SS
            const totalSec = Math.floor(totalMs / 1000);
            const h = Math.floor(totalSec / 3600);
            const m = Math.floor((totalSec % 3600) / 60);
            const s = totalSec % 60;
            const pad = (n: number) => String(n).padStart(2, '0');
            setDisplay(`${pad(h)}:${pad(m)}:${pad(s)}`);
        };

        // first tick and schedule
        tick();
        intervalRef.current = window.setInterval(tick, 1000);

        return () => clearInterval(intervalRef.current);
    }, [timer]);

    return { timer, display };
}
