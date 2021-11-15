import { ClockService } from './ClockService';
import { ResponseValidator } from './ResponseValidator';
import { MetadataService } from './MetadataService';
import { OidcMetadata } from './OidcMetadata';
import { StateStore } from './StateStore';
export interface OidcClientSettings {
    /** The URL of the OIDC/OAuth2 provider */
    authority?: string;
    metadataUrl?: string;
    /** Provide metadata when authority server does not allow CORS on the metadata endpoint */
    metadata?: Partial<OidcMetadata>;
    /** Can be used to seed or add additional values to the results of the discovery request */
    metadataSeed?: Partial<OidcMetadata>;
    /** Provide signingKeys when authority server does not allow CORS on the jwks uri */
    signingKeys?: any[];
    /** Your client application's identifier as registered with the OIDC/OAuth2 */
    client_id?: string;
    client_secret?: string;
    /** The type of response desired from the OIDC/OAuth2 provider (default: 'id_token') */
    response_type?: string;
    /** The scope being requested from the OIDC/OAuth2 provider (default: 'openid') */
    scope?: string;
    /** The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider */
    redirect_uri?: string;
    /** The OIDC/OAuth2 post-logout redirect URI */
    post_logout_redirect_uri?: string;
    client_authentication?: string;
    prompt?: string;
    display?: string;
    max_age?: number;
    ui_locales?: string;
    acr_values?: string;
    resource?: string;
    response_mode?: string;
    /** Should OIDC protocol claims be removed from profile (default: true) */
    filterProtocolClaims?: boolean;
    /** Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile (default: true) */
    loadUserInfo?: boolean;
    /** Number (in seconds) indicating the age of state entries in storage for authorize requests that are considered abandoned and thus can be cleaned up (default: 300) */
    staleStateAge?: number;
    /** The window of time (in seconds) to allow the current time to deviate when validating id_token's iat, nbf, and exp values (default: 300) */
    clockSkew?: number;
    clockService?: ClockService;
    userInfoJwtIssuer?: 'ANY' | 'OP' | string;
    mergeClaims?: boolean;
    stateStore?: StateStore;
    ResponseValidatorCtor?: typeof ResponseValidator;
    MetadataServiceCtor?: typeof MetadataService;
    /** An object containing additional query string parameters to be including in the authorization request */
    extraQueryParams?: Record<string, any>;
    extraTokenParams?: Record<string, any>;
}
export declare class OidcClientSettingsStore {
    private _authority?;
    private _metadataUrl?;
    private _metadata?;
    private _metadataSeed?;
    private _signingKeys?;
    private _client_id;
    private _client_secret?;
    private _response_type;
    private _scope;
    private _redirect_uri?;
    private _post_logout_redirect_uri?;
    private _client_authentication?;
    private _prompt?;
    private _display?;
    private _max_age?;
    private _ui_locales?;
    private _acr_values?;
    private _resource?;
    private _response_mode?;
    private _filterProtocolClaims?;
    private _loadUserInfo?;
    private _staleStateAge;
    private _clockSkew;
    private _clockService;
    private _userInfoJwtIssuer?;
    private _mergeClaims?;
    private _stateStore;
    private _validator;
    private _metadataService;
    private _extraQueryParams?;
    private _extraTokenParams?;
    constructor({ authority, metadataUrl, metadata, signingKeys, metadataSeed, client_id, client_secret, response_type, scope, redirect_uri, post_logout_redirect_uri, client_authentication, prompt, display, max_age, ui_locales, acr_values, resource, response_mode, filterProtocolClaims, loadUserInfo, staleStateAge, clockSkew, clockService, userInfoJwtIssuer, mergeClaims, stateStore, ResponseValidatorCtor, MetadataServiceCtor, extraQueryParams, extraTokenParams }?: OidcClientSettings);
    get client_id(): string;
    set client_id(value: string);
    get client_secret(): string | undefined;
    get response_type(): string;
    get scope(): string;
    get redirect_uri(): string | undefined;
    get post_logout_redirect_uri(): string | undefined;
    get client_authentication(): string | undefined;
    get prompt(): string | undefined;
    get display(): string | undefined;
    get max_age(): number | undefined;
    get ui_locales(): string | undefined;
    get acr_values(): string | undefined;
    get resource(): string | undefined;
    get response_mode(): string | undefined;
    get authority(): string | undefined;
    set authority(value: string | undefined);
    get metadataUrl(): string | undefined;
    get metadata(): Partial<OidcMetadata> | undefined;
    set metadata(value: Partial<OidcMetadata> | undefined);
    get metadataSeed(): Partial<OidcMetadata> | undefined;
    set metadataSeed(value: Partial<OidcMetadata> | undefined);
    get signingKeys(): any[] | undefined;
    set signingKeys(value: any[] | undefined);
    get filterProtocolClaims(): boolean | undefined;
    get loadUserInfo(): boolean | undefined;
    get staleStateAge(): number;
    get clockSkew(): number;
    get userInfoJwtIssuer(): string | undefined;
    get mergeClaims(): boolean | undefined;
    get stateStore(): StateStore;
    get validator(): ResponseValidator;
    get metadataService(): MetadataService;
    get extraQueryParams(): Record<string, any> | undefined;
    set extraQueryParams(value: Record<string, any> | undefined);
    get extraTokenParams(): Record<string, any> | undefined;
    set extraTokenParams(value: Record<string, any> | undefined);
    getEpochTime(): Promise<number>;
}
