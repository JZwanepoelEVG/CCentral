import { ITimerService, TimerRecord } from './ITimerService';
export class TimerApiService implements ITimerService {
    async getActiveTimer(): Promise<TimerRecord | null> {
        const res = await fetch('/api/timer/active');
        if (!res.ok) return null;
        const { success, timer } = await res.json() as {
            success: boolean;
            timer: TimerRecord | null;
        };
        return success ? timer : null;
    }
}