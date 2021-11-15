import { OidcClientSettings, OidcClientSettingsStore } from "./OidcClientSettings";
import { ResponseValidator } from "./ResponseValidator";
import { MetadataService } from "./MetadataService";
import { SigninRequest } from "./SigninRequest";
import { SigninResponse } from "./SigninResponse";
import { SignoutRequest, SignoutRequestArgs } from "./SignoutRequest";
import { SignoutResponse } from "./SignoutResponse";
import { SigninState } from "./SigninState";
import { State } from "./State";
export interface CreateSigninRequestArgs {
    redirect_uri?: string;
    response_type?: string;
    scope?: string;
    data?: any;
    state?: any;
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
export declare type CreateSignoutRequestArgs = Omit<SignoutRequestArgs, "url"> & {
    state?: any;
};
export declare class OidcClient {
    readonly settings: OidcClientSettingsStore;
    readonly metadataService: MetadataService;
    protected readonly _validator: ResponseValidator;
    constructor(settings: OidcClientSettings);
    createSigninRequest({ response_type, scope, redirect_uri, data, state, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, request, request_uri, response_mode, extraQueryParams, extraTokenParams, request_type, skipUserInfo }: CreateSigninRequestArgs): Promise<SigninRequest>;
    readSigninResponseState(url?: string, removeState?: boolean): Promise<{
        state: SigninState;
        response: SigninResponse;
    }>;
    processSigninResponse(url: string): Promise<SigninResponse>;
    createSignoutRequest({ id_token_hint, data, state, post_logout_redirect_uri, extraQueryParams, request_type }?: CreateSignoutRequestArgs): Promise<SignoutRequest>;
    readSignoutResponseState(url?: string, removeState?: boolean): Promise<{
        state: undefined | State;
        response: SignoutResponse;
    }>;
    processSignoutResponse(url: string): Promise<SignoutResponse>;
    clearStaleState(): Promise<void>;
}
