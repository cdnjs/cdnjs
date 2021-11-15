import { State } from "./State";
export interface SignoutRequestArgs {
    url: string;
    id_token_hint?: string;
    post_logout_redirect_uri?: string;
    data?: string;
    extraQueryParams?: Record<string, any>;
    request_type?: string;
}
export declare class SignoutRequest {
    readonly url: string;
    readonly state?: State;
    constructor({ url, id_token_hint, post_logout_redirect_uri, data, extraQueryParams, request_type }: SignoutRequestArgs);
}
