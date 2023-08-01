type event = [number, Function];
export declare class Timer {
    #private;
    beginTime: number | null;
    pauseAmount: number;
    pauseBegin: number | null;
    paused: boolean;
    callbacks: event[];
    _timeline: Array<[number, number]>;
    duration: number;
    /**
     * Function to help you format time
     * @param time - A time in ms
     * @param format - The format, accepted formats are: 'ms', 'ss', 'mm', 'hh', 'dd', 'ww', 'mo', 'yy', 'yyyy', and you may use multiple formats at once, for example: 'hh:mm:ss'
     * @returns The formatted time
     */
    static formatTime(time: number, format?: string): string;
    formatTime(time: number, format?: string): string;
    /**
     * Ensures that the time is in ms, and if not, converts it to ms
     * @param time - The time to convert, if string, it must be in the format: 'number + unit', ex: '1s', '1m', '1h', '1d', '1w', '1mo', '1y'
     * @throws {Error} If the time string is not in the correct format
     * @returns The time converted to ms
     */
    static toMs(time: number | string): number;
    toMs(time: number | string): number;
    /**
     * Create a new Timer with a duration
     * @constructor
     * @param duration - The duration of the timer, in ms
     */
    constructor(duration: number);
    /**
     * Set the duration of the timer
     * @param duration - The duration of the timer, in ms
     */
    setDuration(duration: number): void;
    /**
     * Add a duration to the timer duration, or removes it if the duration is negative
     * @param duration - The duration to add to the timer, in ms
     */
    addDuration(duration: number): void;
    /**
     * Sets the running time of the timer(overrides the current running time)
     * @param duration - The new running time of the timer
     */
    setRunningTime(duration: number): void;
    /**
     * Add a duration to the running time of the timer, or removes it if the provided duration is negative
     * @param duration - The duration to add to the running time of the timer, in ms
     */
    addRunningTime(duration: number): void;
    /**
     * Gives the current running time of the timer
     */
    get runningTime(): number;
    /**
     * Gives the current time left of the timer
     */
    get timeLeft(): number;
    get ended(): boolean;
    /**
     * Starts the timer.
     * Triggers the onStart event.
     * @returns Returns true if the timer was paused, false if not
     */
    start(): boolean;
    /**
     * Stops/pauses the timer.
     * Triggers the onStop event.
     * @returns Returns true if the timer was running, false if not
     */
    stop(): boolean;
    /**
     * Resets the timer to its initial state but keeps the events.
     * If you want to reset completely, just create a new timer.
     * Trigger the onReset event.
     */
    reset(): void;
    /**
     * Add a callback to the onStart event, you may add multiple ones
     */
    set onStart(callback: Function);
    /**
     * Add a callback to the onStop event, you may add multiple ones
     */
    set onStop(callback: Function);
    /**
     * Add a callback to the onReset event, you may add multiple ones
     */
    set onEnd(callback: Function);
    /**
     * Add a callback to the onReset event, you may add multiple ones
     */
    set onReset(callback: Function);
    /**
     * Dispatches one of the special events
     * @param event - The event to dispatch
     */
    dispatchSpecialEvent(event: "start" | "stop" | "reset" | "end"): void;
    /**
     * Destroys all the callbacks of a special event
     * @param event - The event type to destroy
     */
    destroySpecialEvent(event: "start" | "stop" | "reset" | "end"): void;
    /**
     * Destroys all the callbacks of all the special events
     */
    destroyAllSpecialEvents(): void;
    /**
     * Add an event listener, to trigger at a specific interval of time
     * @param event - The interval of time the event should be triggered at
     * @param callback - The callback to trigger
     */
    addEventListener(event: number, callback: Function): void;
    /**
     * Removes all the callbacks of a specific time interval
     * @param event - The event to remove
     */
    removeEventListener(event: number): void;
    /**
     * Triggers all the callbacks of a specific time interval
     * @param event - The interval of the callbacks to trigger
     * @returns The amount of callbacks triggered
     */
    dispatchEvent(event: number): number;
    checkEvents(): void;
    timerEndRoutine(): void;
}
export {};
