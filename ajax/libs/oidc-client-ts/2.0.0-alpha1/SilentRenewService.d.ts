import { UserManager } from "./UserManager";
export declare class SilentRenewService {
    private _userManager;
    private _callback;
    constructor(userManager: UserManager);
    start(): Promise<void>;
    stop(): void;
    protected _tokenExpiring(): Promise<void>;
}
