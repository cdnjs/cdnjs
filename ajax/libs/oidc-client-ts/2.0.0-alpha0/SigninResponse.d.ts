export declare class SigninResponse {
    readonly code: string;
    state: string | undefined;
    error: string | undefined;
    error_description: string | undefined;
    error_uri: string | undefined;
    id_token: string | undefined;
    session_state: string | undefined;
    access_token: string | undefined;
    token_type: string | undefined;
    scope: string | undefined;
    expires_at: number | undefined;
    profile: any | undefined;
    constructor(url?: string, delimiter?: string);
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    get expired(): boolean | undefined;
    get scopes(): string[];
    get isOpenIdConnect(): boolean;
}
