import { OidcClientSettings, OidcClientSettingsStore } from './OidcClientSettings';
import { SigninRequest } from './SigninRequest';
import { SigninResponse } from './SigninResponse';
import { SignoutRequest } from './SignoutRequest';
import { SignoutResponse } from './SignoutResponse';
import { SigninState } from './SigninState';
import { StateStore } from './StateStore';
import { State } from './State';
export declare class OidcClient {
    protected _settings: OidcClientSettingsStore;
    constructor(settings?: OidcClientSettings);
    get _stateStore(): StateStore;
    get _validator(): import("./ResponseValidator").ResponseValidator;
    get _metadataService(): import("./MetadataService").MetadataService;
    get settings(): OidcClientSettingsStore;
    get metadataService(): import("./MetadataService").MetadataService;
    createSigninRequest({ response_type, scope, redirect_uri, data, state, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, request, request_uri, response_mode, extraQueryParams, extraTokenParams, request_type, skipUserInfo }?: any, stateStore?: StateStore): Promise<SigninRequest>;
    readSigninResponseState(url?: string, stateStore?: StateStore | null, removeState?: boolean): Promise<{
        state: SigninState;
        response: SigninResponse;
    }>;
    processSigninResponse(url: string, stateStore?: StateStore | null): Promise<SigninResponse>;
    createSignoutRequest({ id_token_hint, data, state, post_logout_redirect_uri, extraQueryParams, request_type }?: any, stateStore?: StateStore | null): Promise<SignoutRequest>;
    readSignoutResponseState(url: string, stateStore?: StateStore | null, removeState?: boolean): Promise<{
        state: undefined | State;
        response: SignoutResponse;
    }>;
    processSignoutResponse(url: string, stateStore?: StateStore | null): Promise<SignoutResponse>;
    clearStaleState(stateStore?: StateStore | null): Promise<void>;
}
