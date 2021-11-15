import { IWindow } from './IWindow';
export declare class CordovaPopupWindow implements IWindow {
    private _promise;
    private _resolve;
    private _reject;
    private features;
    private target;
    private redirect_uri;
    private _popup;
    private _exitCallbackEvent?;
    private _loadStartCallbackEvent?;
    constructor(params: any);
    _isInAppBrowserInstalled(cordovaMetadata: any): boolean;
    navigate(params: any): Promise<unknown>;
    get promise(): Promise<unknown>;
    _loadStartCallback(event: any): void;
    _exitCallback(message: string): void;
    _success(data: any): void;
    _error(message: string): void;
    close(): void;
    _cleanup(): void;
}
