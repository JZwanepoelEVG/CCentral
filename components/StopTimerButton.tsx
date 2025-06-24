// components/StopTimerButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

export default function StopTimerButton() {
    const [isStopping, setIsStopping] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleStop = async () => {
        setIsStopping(true);
        try {
            const res = await fetch('/api/timer/stop', { method: 'POST' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            // 1) Clear out any stale timer immediately
            queryClient.setQueryData(['activeTimer'], null);

            // 2) Re-fetch from the server (so if there really is no timer,
            //    fetchActiveTimer will return null and the component hides)
            await queryClient.invalidateQueries({ queryKey: ['activeTimer'] });

            // 3) (Optional) also refresh any server-rendered UI
            router.refresh();
        } catch (err) {
            console.error('Failed to stop timer:', err);
        } finally {
            setIsStopping(false);
        }
    };

    return (
        <Button
            onClick={handleStop}
            disabled={isStopping}
            color="destructive"
            size="sm icon"
            variant="outline"
            className="rounded-full"
            aria-label={isStopping ? 'Stopping…' : 'Stop timer'}
        >
            <Icon
                icon="material-symbols:stop"
                className={`h-4 w-4 transition-transform ${
                    isStopping ? 'animate-spin' : ''
                }`}
            />
        </Button>
    );
}
