import { IWindow } from './IWindow';
export declare class IFrameWindow implements IWindow {
    private _promise;
    private _resolve;
    private _reject;
    private _boundMessageEvent;
    private _frame;
    private _timer;
    constructor(_params: any);
    navigate(params: any): Promise<unknown>;
    get promise(): Promise<unknown>;
    _success(data: any): void;
    _error(message: string): void;
    close(): void;
    _cleanup(): void;
    _timeout(): void;
    _message(e: any): void;
    get _origin(): string;
    static notifyParent(url: string): void;
}
