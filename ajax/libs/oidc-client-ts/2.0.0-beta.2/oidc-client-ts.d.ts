declare type AccessTokenCallback = (...ev: any[]) => void;

/**
 * @public
 */
export declare class AccessTokenEvents {
    private _expiringNotificationTimeInSeconds;
    private _expiringTimer;
    private _expiredTimer;
    constructor({ expiringNotificationTimeInSeconds }: {
        expiringNotificationTimeInSeconds: number;
    });
    load(container: User): void;
    unload(): void;
    addAccessTokenExpiring(cb: AccessTokenCallback): void;
    removeAccessTokenExpiring(cb: AccessTokenCallback): void;
    addAccessTokenExpired(cb: AccessTokenCallback): void;
    removeAccessTokenExpired(cb: AccessTokenCallback): void;
}

/**
 * @public
 */
export declare class CheckSessionIFrame {
    private _callback;
    private _client_id;
    private _intervalInSeconds;
    private _stopOnError;
    private _frame_origin;
    private _frame;
    private _timer;
    private _session_state;
    constructor(_callback: () => Promise<void>, _client_id: string, url: string, _intervalInSeconds: number, _stopOnError: boolean);
    load(): Promise<void>;
    private _message;
    start(session_state: string): void;
    stop(): void;
}

/**
 * @public
 */
export declare interface CreateSigninRequestArgs {
    redirect_uri?: string;
    response_type?: string;
    scope?: string;
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

/**
 * @public
 */
export declare type CreateSignoutRequestArgs = Omit<SignoutRequestArgs, "url" | "state_data"> & {
    state?: any;
};

declare interface ExchangeCodeArgs {
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
    grant_type?: string;
    code: string;
    code_verifier: string;
}

declare interface ExchangeRefreshTokenArgs {
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
    refresh_token: string;
}

declare type ExtraSigninRequestArgs = Pick<CreateSigninRequestArgs, "extraQueryParams" | "extraTokenParams">;

declare type ExtraSignoutRequestArgs = Pick<CreateSignoutRequestArgs, "extraQueryParams">;

declare class IFrameNavigator implements INavigator {
    private _settings;
    constructor(_settings: UserManagerSettingsStore);
    prepare({ silentRequestTimeoutInSeconds }: IFrameWindowParams): Promise<IFrameWindow>;
    callback(url: string | undefined): Promise<void>;
}

declare class IFrameWindow implements IWindow {
    private _resolve;
    private _reject;
    private _promise;
    private _timeoutInSeconds;
    private _frame;
    private _timer;
    constructor({ silentRequestTimeoutInSeconds }: IFrameWindowParams);
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    protected _success(data: NavigateResponse): void;
    protected _error(message: string): void;
    close(): void;
    protected _cleanup(): void;
    protected _timeout: () => void;
    protected _message: (e: MessageEvent) => void;
    static notifyParent(url: string | undefined): void;
}

declare interface IFrameWindowParams {
    silentRequestTimeoutInSeconds?: number;
}

declare interface INavigator {
    prepare(params: unknown): Promise<IWindow>;
}

/**
 * @public
 */
export declare class InMemoryWebStorage implements Storage {
    private _data;
    constructor();
    clear(): void;
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    get length(): number;
    key(index: number): string;
}

declare interface IWindow {
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    close(): void;
}

declare interface JwtPayload {
    iss?: string;
    aud?: string;
    azp?: string;
    iat?: number;
    nbf?: number;
    exp?: number;
    sub?: string;
    nonce?: string;
    auth_time?: number;
}

/**
 * @public
 */
export declare class Log {
    static get NONE(): number;
    static get ERROR(): number;
    static get WARN(): number;
    static get INFO(): number;
    static get DEBUG(): number;
    static reset(): void;
    static get level(): number;
    static set level(value: number);
    static get logger(): Logger;
    static set logger(value: Logger);
    static debug(...args: any[]): void;
    static info(...args: any[]): void;
    static warn(...args: any[]): void;
    static error(...args: any[]): void;
}

declare interface Logger {
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

/**
 * @public
 */
export declare class MetadataService {
    private readonly _settings;
    private readonly _jsonService;
    private _metadataUrl;
    private _signingKeys;
    private _metadata;
    constructor(settings: OidcClientSettingsStore);
    resetSigningKeys(): void;
    getMetadata(): Promise<Partial<OidcMetadata>>;
    getIssuer(): Promise<string>;
    getAuthorizationEndpoint(): Promise<string>;
    getUserInfoEndpoint(): Promise<string>;
    getTokenEndpoint(optional?: boolean): Promise<string | undefined>;
    getCheckSessionIframe(): Promise<string | undefined>;
    getEndSessionEndpoint(): Promise<string | undefined>;
    getRevocationEndpoint(): Promise<string | undefined>;
    getKeysEndpoint(optional?: boolean): Promise<string | undefined>;
    protected _getMetadataProperty(name: keyof OidcMetadata, optional?: boolean): Promise<string | boolean | string[] | undefined>;
    getSigningKeys(): Promise<SigningKey[] | null>;
}

declare interface NavigateParams {
    url: string;
    id?: string;
}

declare interface NavigateResponse {
    url: string;
}

/**
 * @public
 */
export declare class OidcClient {
    readonly settings: OidcClientSettingsStore;
    readonly metadataService: MetadataService;
    protected readonly _validator: ResponseValidator;
    constructor(settings: OidcClientSettings);
    createSigninRequest({ response_type, scope, redirect_uri, state, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, request, request_uri, response_mode, extraQueryParams, extraTokenParams, request_type, skipUserInfo }: CreateSigninRequestArgs): Promise<SigninRequest>;
    readSigninResponseState(url?: string, removeState?: boolean): Promise<{
        state: SigninState;
        response: SigninResponse;
    }>;
    processSigninResponse(url?: string): Promise<SigninResponse>;
    createSignoutRequest({ state, id_token_hint, post_logout_redirect_uri, extraQueryParams, request_type }?: CreateSignoutRequestArgs): Promise<SignoutRequest>;
    readSignoutResponseState(url?: string, removeState?: boolean): Promise<{
        state: undefined | State;
        response: SignoutResponse;
    }>;
    processSignoutResponse(url: string): Promise<SignoutResponse>;
    clearStaleState(): Promise<void>;
}

/**
 * @public
 */
export declare interface OidcClientSettings {
    /** The URL of the OIDC/OAuth2 provider */
    authority: string;
    metadataUrl?: string;
    /** Provide metadata when authority server does not allow CORS on the metadata endpoint */
    metadata?: Partial<OidcMetadata>;
    /** Can be used to seed or add additional values to the results of the discovery request */
    metadataSeed?: Partial<OidcMetadata>;
    /** Provide signingKeys when authority server does not allow CORS on the jwks uri */
    signingKeys?: SigningKey[];
    /** Your client application's identifier as registered with the OIDC/OAuth2 */
    client_id: string;
    client_secret?: string;
    /** The type of response desired from the OIDC/OAuth2 provider (default: "code") */
    response_type?: string;
    /** The scope being requested from the OIDC/OAuth2 provider (default: "openid") */
    scope?: string;
    /** The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider */
    redirect_uri: string;
    /** The OIDC/OAuth2 post-logout redirect URI */
    post_logout_redirect_uri?: string;
    client_authentication?: string;
    prompt?: string;
    display?: string;
    max_age?: number;
    ui_locales?: string;
    acr_values?: string;
    resource?: string;
    response_mode?: "query" | "fragment";
    /** Should OIDC protocol claims be removed from profile (default: true) */
    filterProtocolClaims?: boolean;
    /** Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile (default: true) */
    loadUserInfo?: boolean;
    /** Number (in seconds) indicating the age of state entries in storage for authorize requests that are considered abandoned and thus can be cleaned up (default: 300) */
    staleStateAgeInSeconds?: number;
    /** The window of time (in seconds) to allow the current time to deviate when validating id_token's iat, nbf, and exp values (default: 300) */
    clockSkewInSeconds?: number;
    userInfoJwtIssuer?: "ANY" | "OP" | string;
    mergeClaims?: boolean;
    stateStore?: StateStore;
    /** An object containing additional query string parameters to be including in the authorization request */
    extraQueryParams?: Record<string, any>;
    extraTokenParams?: Record<string, any>;
}

declare class OidcClientSettingsStore {
    readonly authority: string;
    readonly metadataUrl: string | undefined;
    readonly metadata: Partial<OidcMetadata> | undefined;
    readonly metadataSeed: Partial<OidcMetadata> | undefined;
    readonly signingKeys: SigningKey[] | undefined;
    readonly client_id: string;
    readonly client_secret: string | undefined;
    readonly response_type: string;
    readonly scope: string;
    readonly redirect_uri: string;
    readonly post_logout_redirect_uri: string | undefined;
    readonly client_authentication: string | undefined;
    readonly prompt: string | undefined;
    readonly display: string | undefined;
    readonly max_age: number | undefined;
    readonly ui_locales: string | undefined;
    readonly acr_values: string | undefined;
    readonly resource: string | undefined;
    readonly response_mode: "query" | "fragment" | undefined;
    readonly filterProtocolClaims: boolean | undefined;
    readonly loadUserInfo: boolean | undefined;
    readonly staleStateAgeInSeconds: number;
    readonly clockSkewInSeconds: number;
    readonly userInfoJwtIssuer: "ANY" | "OP" | string | undefined;
    readonly mergeClaims: boolean | undefined;
    readonly stateStore: StateStore;
    readonly extraQueryParams: Record<string, any> | undefined;
    readonly extraTokenParams: Record<string, any> | undefined;
    constructor({ authority, metadataUrl, metadata, signingKeys, metadataSeed, client_id, client_secret, response_type, scope, redirect_uri, post_logout_redirect_uri, client_authentication, prompt, display, max_age, ui_locales, acr_values, resource, response_mode, filterProtocolClaims, loadUserInfo, staleStateAgeInSeconds, clockSkewInSeconds, userInfoJwtIssuer, mergeClaims, stateStore, extraQueryParams, extraTokenParams }: OidcClientSettings);
}

declare interface OidcMetadata {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    token_endpoint_auth_methods_supported: string[];
    token_endpoint_auth_signing_alg_values_supported: string[];
    userinfo_endpoint: string;
    check_session_iframe: string;
    end_session_endpoint: string;
    jwks_uri: string;
    registration_endpoint: string;
    scopes_supported: string[];
    response_types_supported: string[];
    acr_values_supported: string[];
    subject_types_supported: string[];
    userinfo_signing_alg_values_supported: string[];
    userinfo_encryption_alg_values_supported: string[];
    userinfo_encryption_enc_values_supported: string[];
    id_token_signing_alg_values_supported: string[];
    id_token_encryption_alg_values_supported: string[];
    id_token_encryption_enc_values_supported: string[];
    request_object_signing_alg_values_supported: string[];
    display_values_supported: string[];
    claim_types_supported: string[];
    claims_supported: string[];
    claims_parameter_supported: boolean;
    service_documentation: string;
    ui_locales_supported: string[];
    revocation_endpoint: string;
    introspection_endpoint: string;
    frontchannel_logout_supported: boolean;
    frontchannel_logout_session_supported: boolean;
    backchannel_logout_supported: boolean;
    backchannel_logout_session_supported: boolean;
    grant_types_supported: string[];
    response_modes_supported: string[];
    code_challenge_methods_supported: string[];
}

declare interface ParsedJwt {
    header: {
        alg: string;
        typ: string;
        kid?: string;
    };
    payload?: JwtPayload;
}

declare class PopupNavigator implements INavigator {
    private _settings;
    constructor(_settings: UserManagerSettingsStore);
    prepare({ popupWindowFeatures, popupWindowTarget, }: PopupWindowParams): Promise<PopupWindow>;
    callback(url: string | undefined, keepOpen: boolean, delimiter: string): Promise<void>;
}

declare class PopupWindow implements IWindow {
    private _resolve;
    private _reject;
    private _promise;
    private _popup;
    private _checkForPopupClosedTimer;
    private _id;
    constructor({ popupWindowTarget, popupWindowFeatures }: PopupWindowParams);
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    protected _messageReceived: (event: MessageEvent) => void;
    protected _success(data: NavigateResponse): void;
    protected _error(message: string): void;
    close(): void;
    protected _cleanup(keepOpen?: boolean): void;
    protected _checkForPopupClosed: () => void;
    protected _callback: (url: string, keepOpen: boolean) => void;
    static notifyOpener(url: string | undefined, keepOpen: boolean, delimiter: string): void;
}

declare interface PopupWindowParams {
    popupWindowFeatures?: string;
    popupWindowTarget?: string;
}

/**
 * @public
 */
export declare type QuerySessionStatusArgs = IFrameWindowParams & ExtraSigninRequestArgs;

declare class RedirectNavigator implements INavigator, IWindow {
    private _settings;
    private _redirectMethod;
    constructor(_settings: UserManagerSettingsStore);
    prepare({ redirectMethod }: RedirectParams): Promise<RedirectNavigator>;
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    close(): void;
}

declare interface RedirectParams {
    redirectMethod?: "replace" | "assign";
}

declare class ResponseValidator {
    protected readonly _settings: OidcClientSettingsStore;
    protected readonly _metadataService: MetadataService;
    protected readonly _userInfoService: UserInfoService;
    protected readonly _tokenClient: TokenClient;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    validateSigninResponse(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    validateSignoutResponse(state: State, response: SignoutResponse): SignoutResponse;
    protected _processSigninParams(state: SigninState, response: SigninResponse): SigninResponse;
    protected _processClaims(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    protected _mergeClaims(claims1: UserProfile, claims2: any): UserProfile;
    protected _filterProtocolClaims(claims: UserProfile): UserProfile;
    protected _validateTokens(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    protected _processCode(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    protected _validateIdTokenAttributes(state: SigninState, response: SigninResponse, id_token: string): Promise<SigninResponse>;
    protected _getSigningKeyForJwt(jwt: ParsedJwt): Promise<SigningKey | null>;
    protected _getSigningKeyForJwtWithSingleRetry(jwt: ParsedJwt): Promise<SigningKey | null>;
    protected _validateIdToken(state: SigninState, response: SigninResponse, id_token: string): Promise<SigninResponse>;
    protected _filterByAlg(keys: SigningKey[], alg: string): SigningKey[];
    protected _validateAccessToken(response: SigninResponse, access_token: string): SigninResponse;
}

/**
 * @public
 */
export declare class SessionMonitor {
    private readonly _userManager;
    private readonly _timer;
    private _sub;
    private _sid;
    private _checkSessionIFrame?;
    constructor(userManager: UserManager);
    protected _init(): Promise<void>;
    protected _start: (user: User | {
        session_state: string;
        profile: {
            sub: string;
            sid: string;
        } | null;
    }) => Promise<void>;
    protected _stop: () => void;
    protected _callback: () => Promise<void>;
}

/**
 * @public
 */
export declare interface SessionStatus {
    /** Opaque session state used to validate if session changed (monitorSession) */
    session_state: string;
    /** Subject identifier */
    sub?: string;
    /** Session ID */
    sid?: string;
}

/**
 * @public
 */
export declare type SigningKey = Record<string, string | string[]>;

/**
 * @public
 */
export declare type SigninPopupArgs = PopupWindowParams & ExtraSigninRequestArgs;

/**
 * @public
 */
export declare type SigninRedirectArgs = RedirectParams & ExtraSigninRequestArgs;

declare class SigninRequest {
    readonly url: string;
    readonly state: SigninState;
    constructor({ url, authority, client_id, redirect_uri, response_type, scope, state_data, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, response_mode, request, request_uri, extraQueryParams, request_type, client_secret, extraTokenParams, skipUserInfo }: SigninRequestArgs);
    static isOidc(response_type: string): boolean;
    static isOAuth(response_type: string): boolean;
    static isCode(response_type: string): boolean;
}

declare interface SigninRequestArgs {
    url: string;
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    state_data?: any;
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

declare class SigninResponse {
    readonly code: string;
    state: any | undefined;
    error: string | undefined;
    error_description: string | undefined;
    error_uri: string | undefined;
    id_token: string | undefined;
    session_state: string | undefined;
    access_token: string;
    token_type: string;
    scope: string | undefined;
    expires_at: number | undefined;
    profile: UserProfile;
    constructor(url?: string, delimiter?: string);
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    get expired(): boolean | undefined;
    get scopes(): string[];
    get isOpenIdConnect(): boolean;
}

/**
 * @public
 */
export declare type SigninSilentArgs = IFrameWindowParams & ExtraSigninRequestArgs;

declare class SigninState extends State {
    readonly nonce: string | undefined;
    readonly code_verifier: string | undefined;
    readonly code_challenge: string | undefined;
    readonly authority: string;
    readonly client_id: string;
    readonly redirect_uri: string;
    readonly scope: string;
    readonly client_secret: string | undefined;
    readonly extraTokenParams: Record<string, any> | undefined;
    readonly response_mode: string | undefined;
    readonly skipUserInfo: boolean | undefined;
    constructor(args: {
        id?: string;
        data?: any;
        created?: number;
        request_type?: string;
        nonce?: string | boolean;
        code_verifier?: string | boolean;
        authority: string;
        client_id: string;
        redirect_uri: string;
        scope: string;
        client_secret?: string;
        extraTokenParams?: Record<string, any>;
        response_mode?: string;
        skipUserInfo?: boolean;
    });
    toStorageString(): string;
    static fromStorageString(storageString: string): SigninState;
}

/**
 * @public
 */
export declare type SignoutPopupArgs = PopupWindowParams & ExtraSignoutRequestArgs;

/**
 * @public
 */
export declare type SignoutRedirectArgs = RedirectParams & ExtraSignoutRequestArgs;

declare class SignoutRequest {
    readonly url: string;
    readonly state?: State;
    constructor({ url, state_data, id_token_hint, post_logout_redirect_uri, extraQueryParams, request_type }: SignoutRequestArgs);
}

declare interface SignoutRequestArgs {
    url: string;
    state_data?: any;
    id_token_hint?: string;
    post_logout_redirect_uri?: string;
    extraQueryParams?: Record<string, any>;
    request_type?: string;
}

declare class SignoutResponse {
    error: string | undefined;
    error_description: string | undefined;
    error_uri: string | undefined;
    state: any | undefined;
    constructor(url?: string);
}

declare type SilentRenewErrorCallback = (error: Error) => Promise<void> | void;

declare class SilentRenewService {
    private _userManager;
    private _isStarted;
    constructor(_userManager: UserManager);
    start(): Promise<void>;
    stop(): void;
    protected _tokenExpiring: AccessTokenCallback;
}

declare class State {
    readonly id: string;
    readonly data: any;
    readonly created: number;
    readonly request_type: string | undefined;
    constructor(args: {
        id?: string;
        data?: any;
        created?: number;
        request_type?: string;
    });
    toStorageString(): string;
    static fromStorageString(storageString: string): State;
    static clearStaleState(storage: StateStore, age: number): Promise<void>;
}

declare interface StateStore {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    remove(key: string): Promise<string | null>;
    getAllKeys(): Promise<string[]>;
}

declare class TokenClient {
    private readonly _settings;
    private readonly _jsonService;
    private readonly _metadataService;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    exchangeCode(args: ExchangeCodeArgs): Promise<any>;
    exchangeRefreshToken(args: ExchangeRefreshTokenArgs): Promise<any>;
}

/**
 * @public
 */
export declare class TokenRevocationClient {
    private _settings;
    private _metadataService;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    revoke(token: string, required: boolean, type?: string): Promise<void>;
    protected _revoke(url: string, client_id: string, client_secret: string | undefined, token: string, type: string): Promise<void>;
}

/**
 * @public
 */
export declare class User {
    id_token: string | undefined;
    session_state: string | undefined;
    access_token: string;
    refresh_token: string | undefined;
    token_type: string;
    scope: string | undefined;
    profile: UserProfile;
    expires_at: number | undefined;
    constructor(args: {
        id_token?: string;
        session_state?: string;
        access_token: string;
        refresh_token?: string;
        token_type: string;
        scope?: string;
        profile: UserProfile;
        expires_at?: number;
    });
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    get expired(): boolean | undefined;
    get scopes(): string[];
    toStorageString(): string;
    static fromStorageString(storageString: string): User;
}

declare class UserInfoService {
    private _settings;
    private _jsonService;
    private _metadataService;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    getClaims(token?: string): Promise<any>;
    protected _getClaimsFromJwt: (responseText: string) => Promise<any>;
    protected _filterByAlg(keys: SigningKey[], alg: string): SigningKey[];
}

declare type UserLoadedCallback = (user: User) => Promise<void> | void;

/**
 * @public
 */
export declare class UserManager {
    readonly settings: UserManagerSettingsStore;
    protected readonly _client: OidcClient;
    protected readonly _redirectNavigator: RedirectNavigator;
    protected readonly _popupNavigator: PopupNavigator;
    protected readonly _iframeNavigator: IFrameNavigator;
    protected readonly _events: UserManagerEvents;
    protected readonly _silentRenewService: SilentRenewService;
    protected readonly _sessionMonitor: SessionMonitor | null;
    protected readonly _tokenRevocationClient: TokenRevocationClient;
    protected readonly _tokenClient: TokenClient;
    constructor(settings: UserManagerSettings);
    get events(): UserManagerEvents;
    get metadataService(): MetadataService;
    getUser(): Promise<User | null>;
    removeUser(): Promise<void>;
    signinRedirect(args?: SigninRedirectArgs): Promise<void>;
    signinRedirectCallback(url?: string): Promise<User>;
    signinPopup(args?: SigninPopupArgs): Promise<User>;
    signinPopupCallback(url?: string): Promise<void>;
    signinSilent(args?: SigninSilentArgs): Promise<User | null>;
    protected _useRefreshToken(user: User): Promise<User>;
    protected _validateIdTokenFromTokenRefreshToken(profile: UserProfile, id_token: string): Promise<void>;
    signinSilentCallback(url?: string): Promise<void>;
    signinCallback(url?: string): Promise<User | null>;
    signoutCallback(url?: string, keepOpen?: boolean): Promise<void>;
    querySessionStatus(args?: QuerySessionStatusArgs): Promise<SessionStatus | null>;
    protected _signin(args: CreateSigninRequestArgs, handle: IWindow, verifySub?: string): Promise<User>;
    protected _signinStart(args: CreateSigninRequestArgs, handle: IWindow): Promise<NavigateResponse>;
    protected _signinEnd(url: string, verifySub?: string): Promise<User>;
    protected _signinCallback(url: string | undefined, navigator: IFrameNavigator | PopupNavigator): Promise<void>;
    signoutRedirect(args?: SignoutRedirectArgs): Promise<void>;
    signoutRedirectCallback(url?: string): Promise<SignoutResponse>;
    signoutPopup(args?: SignoutPopupArgs): Promise<void>;
    signoutPopupCallback(url?: string, keepOpen?: boolean): Promise<void>;
    protected _signout(args: CreateSignoutRequestArgs, handle: IWindow): Promise<SignoutResponse>;
    protected _signoutStart(args: CreateSignoutRequestArgs | undefined, handle: IWindow): Promise<NavigateResponse>;
    protected _signoutEnd(url: string): Promise<SignoutResponse>;
    revokeAccessToken(): Promise<void>;
    protected _revokeInternal(user: User | null, required?: boolean): Promise<boolean>;
    protected _revokeAccessTokenInternal(access_token: string, required: boolean): Promise<boolean>;
    protected _revokeRefreshTokenInternal(refresh_token: string | undefined, required: boolean): Promise<boolean>;
    startSilentRenew(): void;
    stopSilentRenew(): void;
    protected get _userStoreKey(): string;
    protected _loadUser(): Promise<User | null>;
    storeUser(user: User | null): Promise<void>;
    clearStaleState(): Promise<void>;
}

/**
 * @public
 */
export declare class UserManagerEvents extends AccessTokenEvents {
    private _userLoaded;
    private _userUnloaded;
    private _silentRenewError;
    private _userSignedIn;
    private _userSignedOut;
    private _userSessionChanged;
    constructor(settings: UserManagerSettingsStore);
    load(user: User, raiseEvent?: boolean): void;
    unload(): void;
    addUserLoaded(cb: UserLoadedCallback): void;
    removeUserLoaded(cb: UserLoadedCallback): void;
    addUserUnloaded(cb: UserUnloadedCallback): void;
    removeUserUnloaded(cb: UserUnloadedCallback): void;
    addSilentRenewError(cb: SilentRenewErrorCallback): void;
    removeSilentRenewError(cb: SilentRenewErrorCallback): void;
    _raiseSilentRenewError(e: Error): void;
    addUserSignedIn(cb: UserSignedInCallback): void;
    removeUserSignedIn(cb: UserSignedInCallback): void;
    _raiseUserSignedIn(): void;
    addUserSignedOut(cb: UserSignedOutCallback): void;
    removeUserSignedOut(cb: UserSignedOutCallback): void;
    _raiseUserSignedOut(): void;
    addUserSessionChanged(cb: UserSessionChangedCallback): void;
    removeUserSessionChanged(cb: UserSessionChangedCallback): void;
    _raiseUserSessionChanged(): void;
}

/**
 * @public
 */
export declare interface UserManagerSettings extends OidcClientSettings {
    /** The URL for the page containing the call to signinPopupCallback to handle the callback from the OIDC/OAuth2 */
    popup_redirect_uri?: string;
    popup_post_logout_redirect_uri?: string;
    /** The features parameter to window.open for the popup signin window.
     *  default: 'location=no,toolbar=no,width=500,height=500,left=100,top=100'
     */
    popupWindowFeatures?: string;
    /** The target parameter to window.open for the popup signin window (default: "_blank") */
    popupWindowTarget?: string;
    /** The methods window.location method used to redirect (default: "assign") */
    redirectMethod?: "replace" | "assign";
    /** The URL for the page containing the code handling the silent renew */
    silent_redirect_uri?: string;
    /** Number of seconds to wait for the silent renew to return before assuming it has failed or timed out (default: 10) */
    silentRequestTimeoutInSeconds?: number;
    /** Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration (default: true) */
    automaticSilentRenew?: boolean;
    /** Flag to validate user.profile.sub in silent renew calls (default: true) */
    validateSubOnSilentRenew?: boolean;
    /** Flag to control if id_token is included as id_token_hint in silent renew calls (default: false) */
    includeIdTokenInSilentRenew?: boolean;
    /** Will raise events for when user has performed a signout at the OP (default: false) */
    monitorSession?: boolean;
    monitorAnonymousSession?: boolean;
    /** Interval in seconds to check the user's session (default: 2) */
    checkSessionIntervalInSeconds?: number;
    query_status_response_type?: string;
    stopCheckSessionOnError?: boolean;
    /** Will invoke the revocation endpoint on signout if there is an access token for the user (default: false) */
    revokeAccessTokenOnSignout?: boolean;
    /** The number of seconds before an access token is to expire to raise the accessTokenExpiring event (default: 60) */
    accessTokenExpiringNotificationTimeInSeconds?: number;
    /** Storage object used to persist User for currently authenticated user (default: session storage) */
    userStore?: WebStorageStateStore;
}

declare class UserManagerSettingsStore extends OidcClientSettingsStore {
    readonly popup_redirect_uri: string | undefined;
    readonly popup_post_logout_redirect_uri: string | undefined;
    readonly popupWindowFeatures: string | undefined;
    readonly popupWindowTarget: string | undefined;
    readonly redirectMethod: "replace" | "assign";
    readonly silent_redirect_uri: string | undefined;
    readonly silentRequestTimeoutInSeconds: number | undefined;
    readonly automaticSilentRenew: boolean;
    readonly validateSubOnSilentRenew: boolean;
    readonly includeIdTokenInSilentRenew: boolean;
    readonly monitorSession: boolean;
    readonly monitorAnonymousSession: boolean;
    readonly checkSessionIntervalInSeconds: number;
    readonly query_status_response_type: string | undefined;
    readonly stopCheckSessionOnError: boolean;
    readonly revokeAccessTokenOnSignout: boolean;
    readonly accessTokenExpiringNotificationTimeInSeconds: number;
    readonly userStore: WebStorageStateStore;
    constructor(args: UserManagerSettings);
}

declare interface UserProfile {
    sub?: string;
    sid?: string;
    azp?: string;
    at_hash?: string;
    auth_time?: number;
}

declare type UserSessionChangedCallback = () => Promise<void> | void;

declare type UserSignedInCallback = () => Promise<void> | void;

declare type UserSignedOutCallback = () => Promise<void> | void;

declare type UserUnloadedCallback = () => Promise<void> | void;

/**
 * @public
 */
export declare const Version: string;

/**
 * @public
 */
export declare class WebStorageStateStore implements StateStore {
    private _store;
    private _prefix;
    constructor({ prefix, store }?: {
        prefix?: string | undefined;
        store?: Storage | undefined;
    });
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    remove(key: string): Promise<string | null>;
    getAllKeys(): Promise<string[]>;
}

export { }
