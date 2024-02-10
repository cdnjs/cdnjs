import { FunctionPlotDatum } from '../types.js';
interface IntervalTask {
    d: FunctionPlotDatum;
    lo: number;
    hi: number;
    n: number;
    nGroup: number;
    interval2d: Float32Array;
    valid?: boolean;
    nTask?: number;
    backpressure?: 'invalidate' | 'none';
}
export declare enum BackpressureStrategy {
    None = "none",
    InvalidateSeenScan = "invalidateSeenScan",
    InvalidateSeenMap = "invalidateSeenMap",
    InvalidateSeenLimit = "invalidateSeenLimit"
}
export declare class IntervalWorkerPool {
    private tasks;
    private idleWorkers;
    private resolves;
    private rejects;
    private taskIdToIdx;
    private nTasks;
    private backpressure;
    constructor(nThreads: number);
    setBackpressure(backpressure: BackpressureStrategy): IntervalWorkerPool;
    terminate(): void;
    queue(task: IntervalTask): Promise<ArrayBuffer>;
    drain(): void;
    hasWork(): boolean;
}
export {};
