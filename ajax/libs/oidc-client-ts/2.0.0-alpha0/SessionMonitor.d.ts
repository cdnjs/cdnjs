import { CheckSessionIFrame } from './CheckSessionIFrame';
import { UserManager } from './UserManager';
export declare class SessionMonitor {
    private _userManager;
    private _CheckSessionIFrameCtor;
    private _timer;
    private _sub;
    private _sid;
    private _checkSessionIFrame?;
    constructor(userManager: UserManager, CheckSessionIFrameCtor?: typeof CheckSessionIFrame, timer?: {
        setInterval: (cb: (...args: any[]) => void, duration?: number | undefined) => number;
        clearInterval: (handle: number) => void;
    });
    get _settings(): import("./UserManagerSettings").UserManagerSettingsStore;
    get _metadataService(): import("./MetadataService").MetadataService;
    get _client_id(): string;
    get _checkSessionInterval(): number;
    get _stopCheckSessionOnError(): boolean | undefined;
    _start(user: any): void;
    _stop(): void;
    _callback(): void;
}
