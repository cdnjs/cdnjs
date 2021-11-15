import { State } from "./State";
export declare class SignoutRequest {
    readonly url: string;
    readonly state?: State;
    constructor({ url, id_token_hint, post_logout_redirect_uri, data, extraQueryParams, request_type }: any);
}
