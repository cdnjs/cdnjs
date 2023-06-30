export declare type MMLScheduleWorkerMessageEventType = 'schedule' | 'next' | 'stop';
export declare type MMLScheduleWorkerMessageEventData = {
    type: MMLScheduleWorkerMessageEventType;
    duration?: number;
};
export declare const schedule: () => void;
//# sourceMappingURL=ScheduleWorker.d.ts.map