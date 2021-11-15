import { IWindow } from './IWindow';
export declare class PopupWindow implements IWindow {
    private _promise;
    private _resolve;
    private _reject;
    private _popup;
    private _checkForPopupClosedTimer;
    private _id;
    constructor(params: any);
    get promise(): Promise<unknown>;
    navigate(params: any): Promise<unknown>;
    _success(data: any): void;
    _error(message: string): void;
    close(): void;
    _cleanup(keepOpen?: boolean): void;
    _checkForPopupClosed(): void;
    _callback(url: string, keepOpen: boolean): void;
    static notifyOpener(url: string, keepOpen: boolean, delimiter: string): void;
}
