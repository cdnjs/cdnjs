import { UserManager } from "./UserManager";
import { User } from "./User";
export declare class SessionMonitor {
    private readonly _userManager;
    private readonly _timer;
    private _sub;
    private _sid;
    private _checkSessionIFrame?;
    constructor(userManager: UserManager);
    protected _init(): Promise<void>;
    protected _start(user: User | {
        session_state: string;
        profile: {
            sub: string;
            sid: string;
        } | null;
    }): Promise<void>;
    protected _stop(): void;
    protected _callback(): Promise<void>;
}
