import { Event } from './Event';
export declare type IntervalTimer = {
    setInterval: (cb: (...args: any[]) => void, duration?: number | undefined) => number;
    clearInterval: (handle: number) => void;
};
export declare class Timer extends Event {
    private _timer;
    private _nowFunc;
    private _timerHandle;
    private _expiration;
    constructor(name: string, timer?: {
        setInterval: (cb: (...args: any[]) => void, duration?: number | undefined) => number;
        clearInterval: (handle: number) => void;
    }, nowFunc?: (() => number));
    get now(): number;
    init(duration: number): void;
    get expiration(): number;
    cancel(): void;
    _callback(): void;
}
