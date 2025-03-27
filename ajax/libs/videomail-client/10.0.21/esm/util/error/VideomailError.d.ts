import { IBrowser, ICPU, IDevice, IEngine, IOS } from "ua-parser-js";
import { VideomailClientOptions } from "../../types/options";
import HTTPError from "./HTTPError";
export interface ErrData extends ErrorOptions {
    explanation: string | undefined;
    logLines?: string[] | undefined;
    err?: Error | undefined;
}
declare class VideomailError extends HTTPError {
    readonly title = "videomail-client error";
    readonly location: string;
    explanation: string | undefined;
    logLines?: string[] | undefined;
    siteName: string | undefined;
    cookie: string | undefined;
    err?: Error | undefined;
    promise?: Promise<any> | undefined;
    reason?: any;
    browser: IBrowser;
    cpu?: ICPU | undefined;
    device?: IDevice | undefined;
    engine: IEngine;
    os?: IOS | undefined;
    screen: string;
    orientation?: string | undefined;
    private readonly classList?;
    static readonly PERMISSION_DENIED = "PERMISSION_DENIED";
    static readonly NOT_ALLOWED_ERROR = "NotAllowedError";
    static readonly DOM_EXCEPTION = "DOMException";
    static readonly STARTING_FAILED = "Starting video failed";
    static readonly MEDIA_DEVICE_NOT_SUPPORTED = "MediaDeviceNotSupported";
    static readonly BROWSER_PROBLEM = "browser-problem";
    static readonly WEBCAM_PROBLEM = "webcam-problem";
    static readonly OVERCONSTRAINED = "OverconstrainedError";
    static readonly NOT_READABLE_ERROR = "NotReadableError";
    static readonly SECURITY_ERROR = "SecurityError";
    static readonly TRACK_START_ERROR = "TrackStartError";
    static readonly INVALID_STATE_ERROR = "InvalidStateError";
    constructor(message: string, options: VideomailClientOptions, classList?: string[], errData?: ErrData);
    private hasClass;
    isBrowserProblem(): boolean | undefined;
    getClassList(): string[] | undefined;
}
export default VideomailError;
