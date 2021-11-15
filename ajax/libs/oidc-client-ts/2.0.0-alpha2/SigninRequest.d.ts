import { SigninState } from "./SigninState";
export interface SigninRequestArgs {
    url: string;
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    data?: any;
    prompt?: string;
    display?: string;
    max_age?: number;
    ui_locales?: string;
    id_token_hint?: string;
    login_hint?: string;
    acr_values?: string;
    resource?: string;
    response_mode?: string;
    request?: string;
    request_uri?: string;
    extraQueryParams?: Record<string, any>;
    request_type?: string;
    client_secret?: string;
    extraTokenParams?: Record<string, any>;
    skipUserInfo?: boolean;
}
export declare class SigninRequest {
    readonly url: string;
    readonly state: SigninState;
    constructor({ url, authority, client_id, redirect_uri, response_type, scope, data, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, response_mode, request, request_uri, extraQueryParams, request_type, client_secret, extraTokenParams, skipUserInfo }: SigninRequestArgs);
    static isOidc(response_type: string): boolean;
    static isOAuth(response_type: string): boolean;
    static isCode(response_type: string): boolean;
}
