export declare class CheckSessionIFrame {
    private _callback;
    private _client_id;
    private _interval;
    private _stopOnError;
    private _frame_origin;
    private _frame;
    private _boundMessageEvent;
    private _timer;
    private _session_state;
    constructor(callback: () => void, client_id: string, url: string, interval?: number, stopOnError?: boolean);
    load(): Promise<void>;
    _message(e: any): void;
    start(session_state: any): void;
    stop(): void;
}
