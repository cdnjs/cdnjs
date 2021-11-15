export declare class CheckSessionIFrame {
    private _callback;
    private _client_id;
    private _intervalInSeconds;
    private _stopOnError;
    private _frame_origin;
    private _frame;
    private _boundMessageEvent;
    private _timer;
    private _session_state;
    constructor(callback: () => Promise<void> | void, client_id: string, url: string, intervalInSeconds: number, stopOnError: boolean);
    load(): Promise<void>;
    private _message;
    start(session_state: string): void;
    stop(): void;
}
