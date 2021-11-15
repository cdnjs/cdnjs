export declare class User {
    id_token: string;
    session_state: any;
    access_token: string;
    refresh_token: string;
    token_type: string;
    scope: string;
    profile: any;
    state: any;
    expires_at: number;
    constructor({ id_token, session_state, access_token, refresh_token, token_type, scope, profile, expires_at, state }: any);
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    get expired(): boolean | undefined;
    get scopes(): string[];
    toStorageString(): string;
    static fromStorageString(storageString: string): User;
}
