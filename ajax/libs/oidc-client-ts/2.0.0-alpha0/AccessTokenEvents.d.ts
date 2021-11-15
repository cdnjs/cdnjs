import { Timer } from './Timer';
import { User } from './User';
export declare type AccessTokenCallback = (...ev: any[]) => void;
export declare class AccessTokenEvents {
    private _accessTokenExpiringNotificationTime;
    private _accessTokenExpiring;
    private _accessTokenExpired;
    constructor({ accessTokenExpiringNotificationTime, accessTokenExpiringTimer, accessTokenExpiredTimer }?: {
        accessTokenExpiringNotificationTime?: number | undefined;
        accessTokenExpiringTimer?: Timer | undefined;
        accessTokenExpiredTimer?: Timer | undefined;
    });
    load(container: User): void;
    unload(): void;
    addAccessTokenExpiring(cb: AccessTokenCallback): void;
    removeAccessTokenExpiring(cb: AccessTokenCallback): void;
    addAccessTokenExpired(cb: AccessTokenCallback): void;
    removeAccessTokenExpired(cb: AccessTokenCallback): void;
}
