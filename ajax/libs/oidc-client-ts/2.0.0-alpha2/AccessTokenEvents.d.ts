import { User } from "./User";
export declare type AccessTokenCallback = (...ev: any[]) => void;
export declare class AccessTokenEvents {
    private _expiringNotificationTimeInSeconds;
    private _expiringTimer;
    private _expiredTimer;
    constructor({ expiringNotificationTimeInSeconds }: {
        expiringNotificationTimeInSeconds: number;
    });
    load(container: User): void;
    unload(): void;
    addAccessTokenExpiring(cb: AccessTokenCallback): void;
    removeAccessTokenExpiring(cb: AccessTokenCallback): void;
    addAccessTokenExpired(cb: AccessTokenCallback): void;
    removeAccessTokenExpired(cb: AccessTokenCallback): void;
}
