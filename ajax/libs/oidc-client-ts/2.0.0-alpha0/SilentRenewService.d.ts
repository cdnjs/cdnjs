import { UserManager } from './UserManager';
export declare class SilentRenewService {
    private _userManager;
    private _callback;
    constructor(userManager: UserManager);
    start(): void;
    stop(): void;
    _tokenExpiring(): void;
}
