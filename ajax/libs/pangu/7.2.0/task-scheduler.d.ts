export interface TaskSchedulerConfig {
    enabled: boolean;
    chunkSize: number;
    timeout: number;
}
export declare class TaskQueue {
    private queue;
    private isProcessing;
    private onComplete?;
    add(task: () => void): void;
    clear(): void;
    setOnComplete(onComplete?: () => void): void;
    get length(): number;
    private scheduleProcessing;
    private process;
}
/**
 * Schedules and executes text spacing operations during browser idle time to avoid blocking the UI.
 * Uses requestIdleCallback to process task in chunks when the browser has spare time,
 * ensuring smooth user experience even when processing large amounts of text.
 */
export declare class TaskScheduler {
    readonly config: TaskSchedulerConfig;
    private taskQueue;
    get queue(): TaskQueue;
    processInChunks<T>(items: T[], processor: (chunk: T[]) => void, onComplete?: () => void): void;
    clear(): void;
    updateConfig(config: Partial<TaskSchedulerConfig>): void;
}
