import { OidcClientSettings, OidcClientSettingsStore } from "./OidcClientSettings";
import { ResponseValidator } from "./ResponseValidator";
import { MetadataService } from "./MetadataService";
import { SigninRequest } from "./SigninRequest";
import { SigninResponse } from "./SigninResponse";
import { SignoutRequest } from "./SignoutRequest";
import { SignoutResponse } from "./SignoutResponse";
import { SigninState } from "./SigninState";
import { State } from "./State";
export declare class OidcClient {
    readonly settings: OidcClientSettingsStore;
    readonly metadataService: MetadataService;
    protected readonly _validator: ResponseValidator;
    constructor(settings: OidcClientSettings);
    createSigninRequest({ response_type, scope, redirect_uri, data, state, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, request, request_uri, response_mode, extraQueryParams, extraTokenParams, request_type, skipUserInfo }?: any): Promise<SigninRequest>;
    readSigninResponseState(url?: string, removeState?: boolean): Promise<{
        state: SigninState;
        response: SigninResponse;
    }>;
    processSigninResponse(url: string): Promise<SigninResponse>;
    createSignoutRequest({ id_token_hint, data, state, post_logout_redirect_uri, extraQueryParams, request_type }?: any): Promise<SignoutRequest>;
    readSignoutResponseState(url?: string, removeState?: boolean): Promise<{
        state: undefined | State;
        response: SignoutResponse;
    }>;
    processSignoutResponse(url: string): Promise<SignoutResponse>;
    clearStaleState(): Promise<void>;
}
