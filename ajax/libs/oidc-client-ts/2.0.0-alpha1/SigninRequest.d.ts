import { SigninState } from "./SigninState";
export declare class SigninRequest {
    readonly url: string;
    readonly state: SigninState;
    constructor({ url, authority, client_id, redirect_uri, response_type, scope, data, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, response_mode, request, request_uri, extraQueryParams, request_type, client_secret, extraTokenParams, skipUserInfo }: any);
    static isOidc(response_type: string): boolean;
    static isOAuth(response_type: string): boolean;
    static isCode(response_type: string): boolean;
}
