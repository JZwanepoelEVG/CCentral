// services/ITimerService.ts
export interface TimerRecord {
    id:            number;
    ticketId:      number;
    entryClient:   string;
    entryDate:     string;   // legacy
    entryTime:     string;   // legacy
    startTime:     Date;
    elapsedMs:     number;
    comments:      string;
    subject:       string;   // new!
}
export interface ITimerService {
    getActiveTimer(): Promise<TimerRecord | null>;
}
