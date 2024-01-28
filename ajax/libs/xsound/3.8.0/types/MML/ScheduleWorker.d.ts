export type MMLScheduleWorkerMessageEventType = 'schedule' | 'next' | 'stop';
export type MMLScheduleWorkerMessageEventData = {
    type: MMLScheduleWorkerMessageEventType;
    duration?: number;
};
export declare const schedule: () => void;
//# sourceMappingURL=ScheduleWorker.d.ts.map