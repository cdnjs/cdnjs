/**
 * @public
 */
export declare type AccessTokenCallback = (...ev: unknown[]) => (Promise<void> | void);

/**
 * @public
 */
export declare class AccessTokenEvents {
    protected readonly _logger: Logger;
    private readonly _expiringTimer;
    private readonly _expiredTimer;
    private readonly _expiringNotificationTimeInSeconds;
    constructor(args: {
        expiringNotificationTimeInSeconds: number;
    });
    load(container: User): Promise<void>;
    unload(): Promise<void>;
    /**
     * Add callback: Raised prior to the access token expiring.
     */
    addAccessTokenExpiring(cb: AccessTokenCallback): () => void;
    /**
     * Remove callback: Raised prior to the access token expiring.
     */
    removeAccessTokenExpiring(cb: AccessTokenCallback): void;
    /**
     * Add callback: Raised after the access token has expired.
     */
    addAccessTokenExpired(cb: AccessTokenCallback): () => void;
    /**
     * Remove callback: Raised after the access token has expired.
     */
    removeAccessTokenExpired(cb: AccessTokenCallback): void;
}

/**
 * @public
 */
export declare interface AsyncStorage {
    /** Returns the number of key/value pairs. */
    readonly length: Promise<number>;
    /**
     * Removes all key/value pairs, if there are any.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    clear(): Promise<void>;
    /** Returns the current value associated with the given key, or null if the given key does not exist. */
    getItem(key: string): Promise<string | null>;
    /** Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs. */
    key(index: number): Promise<string | null>;
    /**
     * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    removeItem(key: string): Promise<void>;
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     *
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    setItem(key: string, value: string): Promise<void>;
}

/**
 * @internal
 */
export declare class CheckSessionIFrame {
    private _callback;
    private _client_id;
    private _intervalInSeconds;
    private _stopOnError;
    private readonly _logger;
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
 * @internal
 */
declare class ClaimsService {
    protected readonly _settings: OidcClientSettingsStore;
    protected readonly _logger: Logger;
    constructor(_settings: OidcClientSettingsStore);
    filterProtocolClaims(claims: UserProfile): UserProfile;
    mergeClaims(claims1: JwtClaims, claims2: JwtClaims): UserProfile;
}

/**
 * @public
 */
export declare interface CreateSigninRequestArgs extends Omit<SigninRequestCreateArgs, "url" | "authority" | "client_id" | "redirect_uri" | "response_type" | "scope" | "state_data"> {
    redirect_uri?: string;
    response_type?: string;
    scope?: string;
    dpopJkt?: string;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state?: unknown;
}

/**
 * @public
 */
export declare type CreateSignoutRequestArgs = Omit<SignoutRequestArgs, "url" | "state_data"> & {
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state?: unknown;
};

/**
 * Optional DPoP settings
 * @public
 */
declare interface DPoPSettings {
    bind_authorization_code?: boolean;
    store: DPoPStore;
}

/**
 * @public
 */
export declare class DPoPState {
    readonly keys: CryptoKeyPair;
    nonce?: string | undefined;
    constructor(keys: CryptoKeyPair, nonce?: string | undefined);
}

/**
 * @public
 */
declare interface DPoPStore {
    set(key: string, value: DPoPState): Promise<void>;
    get(key: string): Promise<DPoPState>;
    remove(key: string): Promise<DPoPState>;
    getAllKeys(): Promise<string[]>;
}

/**
 * Error class thrown in case of an authentication error.
 *
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 */
export declare class ErrorResponse extends Error {
    /** The x-www-form-urlencoded request body sent to the authority server */
    readonly form?: URLSearchParams | undefined;
    /** Marker to detect class: "ErrorResponse" */
    readonly name: string;
    /** An error code string that can be used to classify the types of errors that occur and to respond to errors. */
    readonly error: string | null;
    /** additional information that can help a developer identify the cause of the error.*/
    readonly error_description: string | null;
    /**
     * URI identifying a human-readable web page with information about the error, used to provide the client
     developer with additional information about the error.
     */
    readonly error_uri: string | null;
    /** custom state data set during the initial signin request */
    state?: unknown;
    readonly session_state: string | null;
    url_state?: string;
    constructor(args: {
        error?: string | null;
        error_description?: string | null;
        error_uri?: string | null;
        userState?: unknown;
        session_state?: string | null;
        url_state?: string;
    }, 
    /** The x-www-form-urlencoded request body sent to the authority server */
    form?: URLSearchParams | undefined);
}

/**
 * Error class thrown in case of network timeouts (e.g IFrame time out).
 *
 * @public
 */
export declare class ErrorTimeout extends Error {
    /** Marker to detect class: "ErrorTimeout" */
    readonly name: string;
    constructor(message?: string);
}

/**
 * @internal
 */
declare interface ExchangeCodeArgs {
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
    grant_type?: string;
    code: string;
    code_verifier?: string;
    extraHeaders?: Record<string, ExtraHeader>;
}

/**
 * @internal
 */
declare interface ExchangeCredentialsArgs {
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
    scope?: string;
    username: string;
    password: string;
}

/**
 * @internal
 */
declare interface ExchangeRefreshTokenArgs {
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
    grant_type?: string;
    refresh_token: string;
    scope?: string;
    resource?: string | string[];
    timeoutInSeconds?: number;
    extraHeaders?: Record<string, ExtraHeader>;
}

/**
 * @public
 */
export declare type ExtraHeader = string | (() => string);

/**
 * @public
 */
export declare type ExtraSigninRequestArgs = Pick<CreateSigninRequestArgs, "nonce" | "extraQueryParams" | "extraTokenParams" | "state" | "redirect_uri" | "prompt" | "acr_values" | "login_hint" | "scope" | "max_age" | "ui_locales" | "resource" | "url_state">;

/**
 * @public
 */
export declare type ExtraSignoutRequestArgs = Pick<CreateSignoutRequestArgs, "extraQueryParams" | "state" | "id_token_hint" | "post_logout_redirect_uri" | "url_state">;

/**
 * Standard ID Token claims.
 *
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 */
export declare interface IdTokenClaims extends Mandatory<OidcStandardClaims, "sub">, Mandatory<JwtClaims, "iss" | "sub" | "aud" | "exp" | "iat">, Pick<JwtClaims, "nbf" | "jti"> {
    [claim: string]: unknown;
    /** Time when the End-User authentication occurred. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. When a max_age request is made or when auth_time is requested as an Essential Claim, then this Claim is REQUIRED; otherwise, its inclusion is OPTIONAL. (The auth_time Claim semantically corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] auth_time response parameter.) */
    auth_time?: number;
    /** String value used to associate a Client session with an ID Token, and to mitigate replay attacks. The value is passed through unmodified from the Authentication Request to the ID Token. If present in the ID Token, Clients MUST verify that the nonce Claim Value is equal to the value of the nonce parameter sent in the Authentication Request. If present in the Authentication Request, Authorization Servers MUST include a nonce Claim in the ID Token with the Claim Value being the nonce value sent in the Authentication Request. Authorization Servers SHOULD perform no other processing on nonce values used. The nonce value is a case sensitive string. */
    nonce?: string;
    /** Authentication Context Class Reference. String specifying an Authentication Context Class Reference value that identifies the Authentication Context Class that the authentication performed satisfied. The value "0" indicates the End-User authentication did not meet the requirements of ISO/IEC 29115 [ISO29115] level 1. Authentication using a long-lived browser cookie, for instance, is one example where the use of "level 0" is appropriate. Authentications with level 0 SHOULD NOT be used to authorize access to any resource of any monetary value. (This corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] nist_auth_level 0.) An absolute URI or an RFC 6711 [RFC6711] registered name SHOULD be used as the acr value; registered names MUST NOT be used with a different meaning than that which is registered. Parties using this claim will need to agree upon the meanings of the values used, which may be context-specific. The acr value is a case sensitive string. */
    acr?: string;
    /** Authentication Methods References. JSON array of strings that are identifiers for authentication methods used in the authentication. For instance, values might indicate that both password and OTP authentication methods were used. The definition of particular values to be used in the amr Claim is beyond the scope of this specification. Parties using this claim will need to agree upon the meanings of the values used, which may be context-specific. The amr value is an array of case sensitive strings. */
    amr?: unknown;
    /** Authorized party - the party to which the ID Token was issued. If present, it MUST contain the OAuth 2.0 Client ID of this party. This Claim is only needed when the ID Token has a single audience value and that audience is different than the authorized party. It MAY be included even when the authorized party is the same as the sole audience. The azp value is a case sensitive string containing a StringOrURI value. */
    azp?: string;
    /**
     * Session ID - String identifier for a Session. This represents a Session of a User Agent or device for a logged-in End-User at an RP. Different sid values are used to identify distinct sessions at an OP. The sid value need only be unique in the context of a particular issuer. Its contents are opaque to the RP. Its syntax is the same as an OAuth 2.0 Client Identifier.
     * @see https://openid.net/specs/openid-connect-frontchannel-1_0.html#OPLogout
     * */
    sid?: string;
}

/**
 * @public
 */
export declare interface IFrameWindowParams {
    silentRequestTimeoutInSeconds?: number;
}

/**
 * Native interface
 *
 * @public
 */
export declare interface ILogger {
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}

/**
 * @public
 */
export declare interface INavigator {
    prepare(params: unknown): Promise<IWindow>;
    callback(url: string, params?: unknown): Promise<void>;
}

/**
 * Provides a default implementation of the DPoP store using IndexedDB.
 *
 * @public
 */
export declare class IndexedDbDPoPStore implements DPoPStore {
    readonly _dbName: string;
    readonly _storeName: string;
    set(key: string, value: DPoPState): Promise<void>;
    get(key: string): Promise<DPoPState>;
    remove(key: string): Promise<DPoPState>;
    getAllKeys(): Promise<string[]>;
    promisifyRequest<T = undefined>(request: IDBRequest<T> | IDBTransaction): Promise<T>;
    createStore<T>(dbName: string, storeName: string): Promise<(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>) => Promise<T>>;
}

/**
 * @public
 */
export declare class InMemoryWebStorage implements Storage {
    private readonly _logger;
    private _data;
    clear(): void;
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    get length(): number;
    key(index: number): string;
}

/**
 * @public
 */
export declare interface IWindow {
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    close(): void;
}

/**
 * Standard JWT claims.
 *
 * @public
 * @see https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
 */
export declare interface JwtClaims {
    [claim: string]: unknown;
    /** The "iss" (issuer) claim identifies the principal that issued the JWT. The processing of this claim is generally application specific. The "iss" value is a case-sensitive string containing a StringOrURI value. */
    iss?: string;
    /** The "sub" (subject) claim identifies the principal that is the subject of the JWT. The claims in a JWT are normally statements about the subject. The subject value MUST either be scoped to be locally unique in the context of the issuer or be globally unique. The processing of this claim is generally application specific. The "sub" value is a case-sensitive string containing a StringOrURI value. */
    sub?: string;
    /** The "aud" (audience) claim identifies the recipients that the JWT is intended for. Each principal intended to process the JWT MUST identify itself with a value in the audience claim. If the principal processing the claim does not identify itself with a value in the "aud" claim when this claim is present, then the JWT MUST be rejected. In the general case, the "aud" value is an array of case-sensitive strings, each containing a StringOrURI value. In the special case when the JWT has one audience, the "aud" value MAY be a single case-sensitive string containing a StringOrURI value. The interpretation of audience values is generally application specific. */
    aud?: string | string[];
    /** The "exp" (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing. The processing of the "exp" claim requires that the current date/time MUST be before the expiration date/time listed in the "exp" claim. Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. Its value MUST be a number containing a NumericDate value. */
    exp?: number;
    /** The "nbf" (not before) claim identifies the time before which the JWT MUST NOT be accepted for processing. The processing of the "nbf" claim requires that the current date/time MUST be after or equal to the not-before date/time listed in the "nbf" claim. Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. Its value MUST be a number containing a NumericDate value. */
    nbf?: number;
    /** The "iat" (issued at) claim identifies the time at which the JWT was issued. This claim can be used to determine the age of the JWT. Its value MUST be a number containing a NumericDate value. */
    iat?: number;
    /** The "jti" (JWT ID) claim provides a unique identifier for the JWT. The identifier value MUST be assigned in a manner that ensures that there is a negligible probability that the same value will be accidentally assigned to a different data object; if the application uses multiple issuers, collisions MUST be prevented among values produced by different issuers as well. The "jti" claim can be used to prevent the JWT from being replayed. The "jti" value is a case-sensitive string. */
    jti?: string;
}

/**
 * Log levels
 *
 * @public
 */
export declare enum Log {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4
}

/**
 * Log manager
 *
 * @public
 */
export declare namespace Log {
    export function reset(): void;
    export function setLevel(value: Log): void;
    export function setLogger(value: ILogger): void;
}

/**
 * Internal logger instance
 *
 * @public
 */
export declare class Logger {
    private _name;
    private _method?;
    constructor(_name: string);
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    throw(err: Error): never;
    create(method: string): Logger;
    static createStatic(name: string, staticMethod: string): Logger;
    private static _format;
    static debug(name: string, ...args: unknown[]): void;
    static info(name: string, ...args: unknown[]): void;
    static warn(name: string, ...args: unknown[]): void;
    static error(name: string, ...args: unknown[]): void;
}

/**
 * @internal
 */
declare type Mandatory<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * @public
 * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
 */
export declare class MetadataService {
    private readonly _settings;
    private readonly _logger;
    private readonly _jsonService;
    private _metadataUrl;
    private _signingKeys;
    private _metadata;
    private _fetchRequestCredentials;
    constructor(_settings: OidcClientSettingsStore);
    resetSigningKeys(): void;
    getMetadata(): Promise<Partial<OidcMetadata>>;
    getIssuer(): Promise<string>;
    getAuthorizationEndpoint(): Promise<string>;
    getUserInfoEndpoint(): Promise<string>;
    getTokenEndpoint(optional: false): Promise<string>;
    getTokenEndpoint(optional?: true): Promise<string | undefined>;
    getCheckSessionIframe(): Promise<string | undefined>;
    getEndSessionEndpoint(): Promise<string | undefined>;
    getRevocationEndpoint(optional: false): Promise<string>;
    getRevocationEndpoint(optional?: true): Promise<string | undefined>;
    getKeysEndpoint(optional: false): Promise<string>;
    getKeysEndpoint(optional?: true): Promise<string | undefined>;
    protected _getMetadataProperty(name: keyof OidcMetadata, optional?: boolean): Promise<string | boolean | string[] | undefined>;
    getSigningKeys(): Promise<SigningKey[] | null>;
}

/**
 * @public
 */
export declare interface NavigateParams {
    url: string;
    /** The request "nonce" parameter. */
    nonce?: string;
    /** The request "state" parameter. For sign out requests, this parameter is optional. */
    state?: string;
    response_mode?: "query" | "fragment";
    scriptOrigin?: string;
}

/**
 * @public
 */
export declare interface NavigateResponse {
    url: string;
}

/**
 * Standard OpenID Connect address claim.
 * The Address Claim represents a physical mailing address.
 *
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AddressClaim
 */
export declare interface OidcAddressClaim {
    /** Full mailing address, formatted for display or use on a mailing label. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\\r\\n") or as a single line feed character ("\\n"). */
    formatted?: string;
    /** Full street address component, which MAY include house number, street name, Post Office Box, and multi-line extended street address information. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\\r\\n") or as a single line feed character ("\\n"). */
    street_address?: string;
    /** City or locality component. */
    locality?: string;
    /** State, province, prefecture, or region component. */
    region?: string;
    /** Zip code or postal code component. */
    postal_code?: string;
    /** Country name component. */
    country?: string;
}

/**
 * Provides the raw OIDC/OAuth2 protocol support for the authorization endpoint and the end session endpoint in the
 * authorization server. It provides a bare-bones protocol implementation and is used by the UserManager class.
 * Only use this class if you simply want protocol support without the additional management features of the
 * UserManager class.
 *
 * @public
 */
export declare class OidcClient {
    readonly settings: OidcClientSettingsStore;
    protected readonly _logger: Logger;
    readonly metadataService: MetadataService;
    protected readonly _claimsService: ClaimsService;
    protected readonly _validator: ResponseValidator;
    protected readonly _tokenClient: TokenClient;
    constructor(settings: OidcClientSettings);
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    createSigninRequest({ state, request, request_uri, request_type, id_token_hint, login_hint, skipUserInfo, nonce, url_state, response_type, scope, redirect_uri, prompt, display, max_age, ui_locales, acr_values, resource, response_mode, extraQueryParams, extraTokenParams, dpopJkt, omitScopeWhenRequesting, }: CreateSigninRequestArgs): Promise<SigninRequest>;
    readSigninResponseState(url: string, removeState?: boolean): Promise<{
        state: SigninState;
        response: SigninResponse;
    }>;
    processSigninResponse(url: string, extraHeaders?: Record<string, ExtraHeader>, removeState?: boolean): Promise<SigninResponse>;
    getDpopProof(dpopStore: DPoPStore, nonce?: string): Promise<string>;
    processResourceOwnerPasswordCredentials({ username, password, skipUserInfo, extraTokenParams, }: ProcessResourceOwnerPasswordCredentialsArgs): Promise<SigninResponse>;
    useRefreshToken({ state, redirect_uri, resource, timeoutInSeconds, extraHeaders, extraTokenParams, }: UseRefreshTokenArgs): Promise<SigninResponse>;
    createSignoutRequest({ state, id_token_hint, client_id, request_type, url_state, post_logout_redirect_uri, extraQueryParams, }?: CreateSignoutRequestArgs): Promise<SignoutRequest>;
    readSignoutResponseState(url: string, removeState?: boolean): Promise<{
        state: State | undefined;
        response: SignoutResponse;
    }>;
    processSignoutResponse(url: string): Promise<SignoutResponse>;
    clearStaleState(): Promise<void>;
    revokeToken(token: string, type?: "access_token" | "refresh_token"): Promise<void>;
}

/**
 * The settings used to configure the {@link OidcClient}.
 *
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
    /**
     * Client authentication method that is used to authenticate when using the token endpoint (default: "client_secret_post")
     * - "client_secret_basic": using the HTTP Basic authentication scheme
     * - "client_secret_post": including the client credentials in the request body
     *
     * See https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication
     */
    client_authentication?: "client_secret_basic" | "client_secret_post";
    /** optional protocol param */
    prompt?: string;
    /** optional protocol param */
    display?: string;
    /** optional protocol param */
    max_age?: number;
    /** optional protocol param */
    ui_locales?: string;
    /** optional protocol param */
    acr_values?: string;
    /** optional protocol param */
    resource?: string | string[];
    /**
     * Optional protocol param
     * The response mode used by the authority server is defined by the response_type unless explicitly specified:
     * - Response mode for the OAuth 2.0 response type "code" is the "query" encoding
     * - Response mode for the OAuth 2.0 response type "token" is the "fragment" encoding
     *
     * @see https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes
     */
    response_mode?: "query" | "fragment";
    /**
     * Should optional OIDC protocol claims be removed from profile or specify the ones to be removed (default: true)
     * When true, the following claims are removed by default: ["nbf", "jti", "auth_time", "nonce", "acr", "amr", "azp", "at_hash"]
     * When specifying claims, the following claims are not allowed: ["sub", "iss", "aud", "exp", "iat"]
     */
    filterProtocolClaims?: boolean | string[];
    /** Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile (default: false) */
    loadUserInfo?: boolean;
    /** Number (in seconds) indicating the age of state entries in storage for authorize requests that are considered abandoned and thus can be cleaned up (default: 900) */
    staleStateAgeInSeconds?: number;
    /**
     * Indicates how objects returned from the user info endpoint as claims (e.g. `address`) are merged into the claims from the
     * id token as a single object.  (default: `{ array: "replace" }`)
     * - array: "replace": natives (string, int, float) and arrays are replaced, objects are merged as distinct objects
     * - array: "merge": natives (string, int, float) are replaced, arrays and objects are merged as distinct objects
     */
    mergeClaimsStrategy?: {
        array: "replace" | "merge";
    };
    /**
     * Storage object used to persist interaction state (default: window.localStorage, InMemoryWebStorage iff no window).
     * E.g. `stateStore: new WebStorageStateStore({ store: window.localStorage })`
     */
    stateStore?: StateStore;
    /**
     * An object containing additional query string parameters to be including in the authorization request.
     * E.g, when using Azure AD to obtain an access token an additional resource parameter is required. extraQueryParams: `{resource:"some_identifier"}`
     */
    extraQueryParams?: Record<string, string | number | boolean>;
    extraTokenParams?: Record<string, unknown>;
    /**
     * An object containing additional header to be including in request.
     */
    extraHeaders?: Record<string, ExtraHeader>;
    /**
     * DPoP enabled or disabled
     */
    dpop?: DPoPSettings | undefined;
    /**
     * Will check the content type header of the response of the revocation endpoint to match these passed values (default: [])
     */
    revokeTokenAdditionalContentTypes?: string[];
    /**
     * Will disable PKCE validation, changing to true will not append to sign in request code_challenge and code_challenge_method. (default: false)
     */
    disablePKCE?: boolean;
    /**
     * Sets the credentials for fetch requests. (default: "same-origin")
     * Use this if you need to send cookies to the OIDC/OAuth2 provider or if you are using a proxy that requires cookies
     */
    fetchRequestCredentials?: RequestCredentials;
    /**
     * Only scopes in this list will be passed in the token refresh request.
     */
    refreshTokenAllowedScope?: string | undefined;
    /**
     * Defines request timeouts globally across all requests made to the authorisation server
     */
    requestTimeoutInSeconds?: number | undefined;
    /**
     * https://datatracker.ietf.org/doc/html/rfc6749#section-3.3 describes behavior when omitting scopes from sign in requests
     * If the IDP supports default scopes, this setting will ignore the scopes property passed to the config. (Default: false)
     */
    omitScopeWhenRequesting?: boolean;
}

/**
 * The settings with defaults applied of the {@link OidcClient}.
 *
 * @public
 * @see {@link OidcClientSettings}
 */
export declare class OidcClientSettingsStore {
    readonly authority: string;
    readonly metadataUrl: string;
    readonly metadata: Partial<OidcMetadata> | undefined;
    readonly metadataSeed: Partial<OidcMetadata> | undefined;
    readonly signingKeys: SigningKey[] | undefined;
    readonly client_id: string;
    readonly client_secret: string | undefined;
    readonly response_type: string;
    readonly scope: string;
    readonly redirect_uri: string;
    readonly post_logout_redirect_uri: string | undefined;
    readonly client_authentication: "client_secret_basic" | "client_secret_post";
    readonly prompt: string | undefined;
    readonly display: string | undefined;
    readonly max_age: number | undefined;
    readonly ui_locales: string | undefined;
    readonly acr_values: string | undefined;
    readonly resource: string | string[] | undefined;
    readonly response_mode: "query" | "fragment" | undefined;
    readonly filterProtocolClaims: boolean | string[];
    readonly loadUserInfo: boolean;
    readonly staleStateAgeInSeconds: number;
    readonly mergeClaimsStrategy: {
        array: "replace" | "merge";
    };
    readonly omitScopeWhenRequesting: boolean;
    readonly stateStore: StateStore;
    readonly extraQueryParams: Record<string, string | number | boolean>;
    readonly extraTokenParams: Record<string, unknown>;
    readonly dpop: DPoPSettings | undefined;
    readonly extraHeaders: Record<string, ExtraHeader>;
    readonly revokeTokenAdditionalContentTypes?: string[];
    readonly fetchRequestCredentials: RequestCredentials;
    readonly refreshTokenAllowedScope: string | undefined;
    readonly disablePKCE: boolean;
    readonly requestTimeoutInSeconds: number | undefined;
    constructor({ authority, metadataUrl, metadata, signingKeys, metadataSeed, client_id, client_secret, response_type, scope, redirect_uri, post_logout_redirect_uri, client_authentication, prompt, display, max_age, ui_locales, acr_values, resource, response_mode, filterProtocolClaims, loadUserInfo, requestTimeoutInSeconds, staleStateAgeInSeconds, mergeClaimsStrategy, disablePKCE, stateStore, revokeTokenAdditionalContentTypes, fetchRequestCredentials, refreshTokenAllowedScope, extraQueryParams, extraTokenParams, extraHeaders, dpop, omitScopeWhenRequesting, }: OidcClientSettings);
}

/**
 * OpenID Providers have metadata describing their configuration.
 *
 * @public
 */
export declare interface OidcMetadata {
    /**
     * REQUIRED. URL using the `https` scheme with no query or fragment component that the OP asserts as its Issuer
     * Identifier. If Issuer discovery is supported
     * (see [Section 2](https://openid.net/specs/openid-connect-discovery-1_0.html#IssuerDiscovery)),
     * this value MUST be identical to the issuer value
     * returned by WebFinger. This also MUST be identical to the `iss` Claim value in ID Tokens issued from this Issuer.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    issuer: string;
    /**
     * REQUIRED. URL of the OP's OAuth 2.0 Authorization Endpoint
     * [[OpenID.Core](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)].
     * This URL MUST use the `https` scheme and MAY contain port, path, and query parameter components.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    authorization_endpoint: string;
    /**
     * URL of the OP's OAuth 2.0 Token Endpoint
     * [[OpenID.Core](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)].
     * This is REQUIRED unless only the Implicit Flow is used. This URL MUST use the `https` scheme and MAY contain
     * port, path, and query parameter components.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    token_endpoint: string;
    /**
     * OPTIONAL. JSON array containing a list of Client Authentication methods supported by this Token Endpoint.
     * The options are `client_secret_post`, `client_secret_basic`, `client_secret_jwt`, and `private_key_jwt`, as
     * described in Section 9 of
     * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)
     * [OpenID.Core]. Other authentication methods MAY be defined by extensions. If omitted, the default is
     * `client_secret_basic` -- the HTTP Basic Authentication Scheme specified in Section 2.3.1 of
     * [OAuth 2.0](https://openid.net/specs/openid-connect-discovery-1_0.html#RFC6749) [RFC6749].
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    token_endpoint_auth_methods_supported: string[];
    /**
     * OPTIONAL. JSON array containing a list of the JWS signing algorithms (`alg` values) supported by the
     * Token Endpoint for the signature on the JWT
     * [[JWT](https://openid.net/specs/openid-connect-discovery-1_0.html#JWT)]
     * used to authenticate the Client at the Token Endpoint for the `private_key_jwt` and `client_secret_jwt`
     * authentication methods. Servers SHOULD support RS256. The value none MUST NOT be used.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    token_endpoint_auth_signing_alg_values_supported: string[];
    /**
     * RECOMMENDED. URL of the OP's UserInfo Endpoint
     * [[OpenID.Core](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)].
     * This URL MUST use the https scheme and MAY contain port, path, and query parameter components.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    userinfo_endpoint: string;
    /**
     * REQUIRED. URL of an OP iframe that supports cross-origin communications for session state information with the
     * RP Client, using the HTML5 postMessage API. This URL MUST use the `https` scheme and MAY contain port, path, and
     * query parameter components. The page is loaded from an invisible iframe embedded in an RP page so that it can run
     * in the OP's security context. It accepts postMessage requests from the relevant RP iframe and uses postMessage to
     * post back the login status of the End-User at the OP.
     *
     * @see https://openid.net/specs/openid-connect-session-1_0.html#OPMetadata
     */
    check_session_iframe: string;
    /**
     * REQUIRED. URL at the OP to which an RP can perform a redirect to request that the End-User be logged out at the OP.
     *
     * @see https://openid.net/specs/openid-connect-session-1_0-17.html#OPMetadata
     */
    end_session_endpoint: string;
    /**
     * REQUIRED. URL of the OP's JWK Set
     * [[JWK](https://openid.net/specs/openid-connect-discovery-1_0.html#JWK)]
     * document, which MUST use the `https` scheme. This contains the signing key(s) the RP uses to validate signatures from
     * the OP. The JWK Set MAY also contain the Server's encryption key(s), which are used by RPs to encrypt requests to the Server.
     * When both signing and encryption keys are made available, a `use` (public key use) parameter value is REQUIRED for all keys
     * in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for
     * both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK `x5c` parameter MAY be used to provide
     * X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the
     * certificate. The JWK Set MUST NOT contain private or symmetric key values.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    jwks_uri: string;
    /**
     * RECOMMENDED. URL of the OP's Dynamic Client Registration Endpoint
     * [[OpenID.Registration](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Registration)],
     * which MUST use the `https` scheme.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    registration_endpoint: string;
    /**
     * RECOMMENDED. JSON array containing a list of the
     * [OAuth 2.0](https://openid.net/specs/openid-connect-discovery-1_0.html#RFC6749)
     * [RFC6749] scope values that this server supports. The server MUST support the openid scope value. Servers MAY choose not
     * to advertise some supported scope values even when this parameter is used, although those defined in
     * [[OpenID.Core](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)]
     * SHOULD be listed, if supported.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    scopes_supported: string[];
    /**
     * REQUIRED. JSON array containing a list of the OAuth 2.0 `response_type` values that this OP supports. Dynamic OpenID
     * Providers MUST support the `code`, `id_token`, and the `id_token token` Response Type values.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    response_types_supported: string[];
    /**
     * OPTIONAL. JSON array containing a list of the Authentication Context Class References that this OP supports.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    acr_values_supported: string[];
    /**
     * REQUIRED. JSON array containing a list of the Subject Identifier types that this OP supports. Valid types include `pairwise`
     * and `public`.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    subject_types_supported: string[];
    /**
     * OPTIONAL. JSON array containing a list of the JWS signing algorithms (`alg` values) supported by the OP for Request Objects,
     * which are described in Section 6.1 of
     * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)
     * [OpenID.Core]. These algorithms are used both when the Request Object is passed by value (using the `request` parameter) and
     * when it is passed by reference (using the `request_uri` parameter). Servers SHOULD support `none` and `RS256`.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    request_object_signing_alg_values_supported: string[];
    /**
     * OPTIONAL. JSON array containing a list of the `display` parameter values that the OpenID Provider supports. These values are
     * described in Section 3.1.2.1 of
     * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)
     * [OpenID.Core].
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    display_values_supported: string[];
    /**
     * OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described
     * in Section 5.6 of
     * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html#OpenID.Core)
     * [OpenID.Core]. Values defined by this specification are `normal`, `aggregated`, and `distributed`. If omitted, the
     * implementation supports only normal Claims.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    claim_types_supported: string[];
    /**
     * RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply
     * values for. Note that for privacy or other reasons, this might not be an exhaustive list.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    claims_supported: string[];
    /**
     * OPTIONAL. Boolean value specifying whether the OP supports use of the `claims` parameter, with `true` indicating support. If
     * omitted, the default value is `false`.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    claims_parameter_supported: boolean;
    /**
     * OPTIONAL. URL of a page containing human-readable information that developers might want or need to know when using the
     * OpenID Provider. In particular, if the OpenID Provider does not support Dynamic Client Registration, then information on
     * how to register Clients needs to be provided in this documentation.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    service_documentation: string;
    /**
     * OPTIONAL. Languages and scripts supported for the user interface, represented as a JSON array of
     * [BCP47](https://openid.net/specs/openid-connect-discovery-1_0.html#RFC5646)
     * [RFC5646] language tag values.
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    ui_locales_supported: string[];
    /**
     * The fully qualified URL of the server's revocation endpoint defined by
     * [OAuth 2.0 Token Revocation](https://openid.net/specs/openid-heart-oauth2-2015-12-07.html#RFC7009)
     * [RFC7009].
     *
     * @see https://openid.net/specs/openid-heart-oauth2-2015-12-07.html#rfc.section.4.1
     */
    revocation_endpoint: string;
    /**
     * The fully qualified URL of the server's introspection endpoint defined by
     * [OAuth Token Introspection](https://openid.net/specs/openid-heart-oauth2-2015-12-07.html#RFC7662)
     * [RFC7662].
     *
     * @see https://openid.net/specs/openid-heart-oauth2-2015-12-07.html#rfc.section.4.1
     */
    introspection_endpoint: string;
    /**
     * OPTIONAL. Boolean value specifying whether the OP supports HTTP-based logout, with `true` indicating support. If omitted,
     * the default value is `false`.
     *
     * @see https://openid.net/specs/openid-connect-frontchannel-1_0.html#OPLogout
     */
    frontchannel_logout_supported: boolean;
    /**
     * OPTIONAL. Boolean value specifying whether the OP can pass iss (issuer) and `sid` (session ID) query parameters to identify
     * the RP session with the OP when the `frontchannel_logout_uri` is used. If supported, the `sid` Claim is also included in
     * ID Tokens issued by the OP. If omitted, the default value is `false`.
     *
     * @see https://openid.net/specs/openid-connect-frontchannel-1_0.html#OPLogout
     */
    frontchannel_logout_session_supported: boolean;
    /**
     * OPTIONAL. Boolean value specifying whether the OP supports back-channel logout, with `true` indicating support. If omitted,
     * the default value is `false`.
     *
     * @see https://openid.net/specs/openid-connect-backchannel-1_0.html#BCSupport
     */
    backchannel_logout_supported: boolean;
    /**
     * OPTIONAL. Boolean value specifying whether the OP can pass a `sid` (session ID) Claim in the Logout Token to identify the
     * RP session with the OP. If supported, the `sid` Claim is also included in ID Tokens issued by the OP. If omitted, the default
     * value is `false`.
     *
     * @see https://openid.net/specs/openid-connect-backchannel-1_0.html#BCSupport
     */
    backchannel_logout_session_supported: boolean;
    /**
     * OPTIONAL. JSON array containing a list of the OAuth 2.0 Grant Type values that this OP supports. Dynamic OpenID Providers
     * MUST support the `authorization_code` and `implicit` Grant Type values and MAY support other Grant Types. If omitted, the
     * default value is [`"authorization_code"`, `"implicit"`].
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    grant_types_supported: string[];
    /**
     * OPTIONAL. JSON array containing a list of the OAuth 2.0 response_mode values that this OP supports, as specified in
     * [OAuth 2.0 Multiple Response Type Encoding Practices](https://openid.net/specs/openid-connect-discovery-1_0.html#OAuth.Responses)
     * [OAuth.Responses]. If omitted, the default for Dynamic OpenID Providers is [`"query"`, `"fragment"`].
     *
     * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
     */
    response_modes_supported: string[];
    /**
     * OPTIONAL. JSON array containing a list of
     * [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636)
     * [RFC7636] code challenge methods supported by this authorization server.  Code challenge method values are used in
     * the "code_challenge_method" parameter defined in Section 4.3 of [RFC7636]. The valid code challenge method values are
     * those registered in the
     * [IANA "PKCE Code Challenge Methods" registry](https://datatracker.ietf.org/doc/html/rfc8414#ref-IANA.OAuth.Parameters)
     * [IANA.OAuth.Parameters]. If omitted, the authorization server does not support PKCE.
     *
     * @see https://datatracker.ietf.org/doc/html/rfc8414
     */
    code_challenge_methods_supported: string[];
}

/**
 * Standard OpenID Connect claims.
 * They can be requested to be returned either in the UserInfo Response or in the ID Token.
 *
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
 */
export declare interface OidcStandardClaims {
    /** Subject - Identifier for the End-User at the Issuer. */
    sub?: string;
    /** End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences. */
    name?: string;
    /** Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters. */
    given_name?: string;
    /** Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters. */
    family_name?: string;
    /** Middle name(s) of the End-User. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names are not used. */
    middle_name?: string;
    /** Casual name of the End-User that may or may not be the same as the given_name. For instance, a nickname value of Mike might be returned alongside a given_name value of Michael. */
    nickname?: string;
    /** Shorthand name by which the End-User wishes to be referred to at the RP, such as janedoe or j.doe. This value MAY be any valid JSON string including special characters such as \@, /, or whitespace. */
    preferred_username?: string;
    /** URL of the End-User's profile page. The contents of this Web page SHOULD be about the End-User. */
    profile?: string;
    /** URL of the End-User's profile picture. This URL MUST refer to an image file (for example, a PNG, JPEG, or GIF image file), rather than to a Web page containing an image. Note that this URL SHOULD specifically reference a profile photo of the End-User suitable for displaying when describing the End-User, rather than an arbitrary photo taken by the End-User. */
    picture?: string;
    /** URL of the End-User's Web page or blog. This Web page SHOULD contain information published by the End-User or an organization that the End-User is affiliated with. */
    website?: string;
    /** End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 addr-spec syntax. */
    email?: string;
    /** True if the End-User's e-mail address has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this e-mail address was controlled by the End-User at the time the verification was performed. The means by which an e-mail address is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating. */
    email_verified?: boolean;
    /** End-User's gender. Values defined by this specification are female and male. Other values MAY be used when neither of the defined values are applicable. */
    gender?: string;
    /** End-User's birthday, represented as an ISO 8601:2004 [ISO8601‑2004] YYYY-MM-DD format. The year MAY be 0000, indicating that it is omitted. To represent only the year, YYYY format is allowed. Note that depending on the underlying platform's date related function, providing just year can result in varying month and day, so the implementers need to take this factor into account to correctly process the dates. */
    birthdate?: string;
    /** String from zoneinfo [zoneinfo] time zone database representing the End-User's time zone. For example, Europe/Paris or America/Los_Angeles. */
    zoneinfo?: string;
    /** End-User's locale, represented as a BCP47 [RFC5646] language tag. This is typically an ISO 639-1 Alpha-2 [ISO639‑1] language code in lowercase and an ISO 3166-1 Alpha-2 [ISO3166‑1] country code in uppercase, separated by a dash. For example, en-US or fr-CA. As a compatibility note, some implementations have used an underscore as the separator rather than a dash, for example, en_US; */
    locale?: string;
    /** End-User's preferred telephone number. E.164 [E.164] is RECOMMENDED as the format of this Claim, for example, +1 (425) 555-1212 or +56 (2) 687 2400. If the phone number contains an extension, it is RECOMMENDED that the extension be represented using the RFC 3966 [RFC3966] extension syntax, for example, +1 (604) 555-1234;ext=5678. */
    phone_number?: string;
    /** True if the End-User's phone number has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this phone number was controlled by the End-User at the time the verification was performed. The means by which a phone number is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating. When true, the phone_number Claim MUST be in E.164 format and any extensions MUST be represented in RFC 3966 format. */
    phone_number_verified?: boolean;
    /** End-User's preferred postal address. The value of the address member is a JSON [RFC4627] structure containing some or all of the members defined in Section 5.1.1. */
    address?: OidcAddressClaim;
    /** Time the End-User's information was last updated. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. */
    updated_at?: number;
}

/**
 *
 * @public
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/open#window_features
 */
export declare interface PopupWindowFeatures {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    menubar?: boolean | string;
    toolbar?: boolean | string;
    location?: boolean | string;
    status?: boolean | string;
    resizable?: boolean | string;
    scrollbars?: boolean | string;
    /** Close popup window after time in seconds, by default it is -1. To enable this feature, set value greater than 0. */
    closePopupWindowAfterInSeconds?: number;
    [k: string]: boolean | string | number | undefined;
}

/**
 * @public
 */
export declare interface PopupWindowParams {
    popupWindowFeatures?: PopupWindowFeatures;
    popupWindowTarget?: string;
    /** An AbortSignal to set request's signal. */
    popupSignal?: AbortSignal | null;
}

/**
 * @public
 */
export declare type ProcessResourceOwnerPasswordCredentialsArgs = {
    username: string;
    password: string;
    skipUserInfo?: boolean;
    extraTokenParams?: Record<string, unknown>;
};

/**
 * @public
 */
export declare type QuerySessionStatusArgs = IFrameWindowParams & ExtraSigninRequestArgs;

/**
 * @public
 */
export declare interface RedirectParams {
    redirectMethod?: "replace" | "assign";
    redirectTarget?: "top" | "self";
}

/**
 * Fake state store implementation necessary for validating refresh token requests.
 *
 * @public
 */
export declare class RefreshState {
    /** custom "state", which can be used by a caller to have "data" round tripped */
    readonly data?: unknown;
    readonly refresh_token: string;
    readonly id_token?: string;
    readonly session_state: string | null;
    readonly scope?: string;
    readonly profile: UserProfile;
    constructor(args: {
        refresh_token: string;
        id_token?: string;
        session_state: string | null;
        scope?: string;
        profile: UserProfile;
        state?: unknown;
    });
}

/**
 * @internal
 */
declare class ResponseValidator {
    protected readonly _settings: OidcClientSettingsStore;
    protected readonly _metadataService: MetadataService;
    protected readonly _claimsService: ClaimsService;
    protected readonly _logger: Logger;
    protected readonly _userInfoService: UserInfoService;
    protected readonly _tokenClient: TokenClient;
    constructor(_settings: OidcClientSettingsStore, _metadataService: MetadataService, _claimsService: ClaimsService);
    validateSigninResponse(response: SigninResponse, state: SigninState, extraHeaders?: Record<string, ExtraHeader>): Promise<void>;
    validateCredentialsResponse(response: SigninResponse, skipUserInfo: boolean): Promise<void>;
    validateRefreshResponse(response: SigninResponse, state: RefreshState): Promise<void>;
    validateSignoutResponse(response: SignoutResponse, state: State): void;
    protected _processSigninState(response: SigninResponse, state: SigninState): void;
    protected _processClaims(response: SigninResponse, skipUserInfo?: boolean, validateSub?: boolean): Promise<void>;
    protected _processCode(response: SigninResponse, state: SigninState, extraHeaders?: Record<string, ExtraHeader>): Promise<void>;
    protected _validateIdTokenAttributes(response: SigninResponse, existingToken?: string): void;
}

/**
 * @internal
 */
declare interface RevokeArgs {
    token: string;
    token_type_hint?: "access_token" | "refresh_token";
}

/**
 * @public
 */
export declare type RevokeTokensTypes = UserManagerSettings["revokeTokenTypes"];

/**
 * @public
 */
export declare class SessionMonitor {
    private readonly _userManager;
    private readonly _logger;
    private _sub;
    private _checkSessionIFrame?;
    constructor(_userManager: UserManager);
    protected _init(): Promise<void>;
    protected _start: (user: User | {
        session_state: string;
        profile: {
            sub: string;
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

/**
 * @public
 */
export declare class SigninRequest {
    private static readonly _logger;
    readonly url: string;
    readonly state: SigninState;
    private constructor();
    static create({ url, authority, client_id, redirect_uri, response_type, scope, state_data, response_mode, request_type, client_secret, nonce, url_state, resource, skipUserInfo, extraQueryParams, extraTokenParams, disablePKCE, dpopJkt, omitScopeWhenRequesting, ...optionalParams }: SigninRequestCreateArgs): Promise<SigninRequest>;
}

/**
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
 */
export declare interface SigninRequestCreateArgs {
    url: string;
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    response_mode?: "query" | "fragment";
    nonce?: string;
    display?: string;
    dpopJkt?: string;
    prompt?: string;
    max_age?: number;
    ui_locales?: string;
    id_token_hint?: string;
    login_hint?: string;
    acr_values?: string;
    resource?: string | string[];
    request?: string;
    request_uri?: string;
    request_type?: string;
    extraQueryParams?: Record<string, string | number | boolean>;
    extraTokenParams?: Record<string, unknown>;
    client_secret?: string;
    skipUserInfo?: boolean;
    disablePKCE?: boolean;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state_data?: unknown;
    url_state?: string;
    omitScopeWhenRequesting?: boolean;
}

/**
 * @public
 */
export declare type SigninResourceOwnerCredentialsArgs = ProcessResourceOwnerPasswordCredentialsArgs;

/**
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthResponse
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 */
export declare class SigninResponse {
    readonly state: string | null;
    /** @see {@link User.session_state} */
    session_state: string | null;
    /** @see {@link ErrorResponse.error} */
    readonly error: string | null;
    /** @see {@link ErrorResponse.error_description} */
    readonly error_description: string | null;
    /** @see {@link ErrorResponse.error_uri} */
    readonly error_uri: string | null;
    readonly code: string | null;
    /** @see {@link User.id_token} */
    id_token?: string;
    /** @see {@link User.access_token} */
    access_token: string;
    /** @see {@link User.token_type} */
    token_type: string;
    /** @see {@link User.refresh_token} */
    refresh_token?: string;
    /** @see {@link User.scope} */
    scope?: string;
    /** @see {@link User.expires_at} */
    expires_at?: number;
    /** custom state data set during the initial signin request */
    userState: unknown;
    url_state?: string;
    /** @see {@link User.profile} */
    profile: UserProfile;
    constructor(params: URLSearchParams);
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    get isOpenId(): boolean;
}

/**
 * @public
 */
export declare type SigninSilentArgs = IFrameWindowParams & ExtraSigninRequestArgs;

/**
 * @public
 */
export declare class SigninState extends State {
    /** The same code_verifier that was used to obtain the authorization_code via PKCE. */
    readonly code_verifier: string | undefined;
    /** Used to secure authorization code grants via Proof Key for Code Exchange (PKCE). */
    readonly code_challenge: string | undefined;
    /** @see {@link OidcClientSettings.authority} */
    readonly authority: string;
    /** @see {@link OidcClientSettings.client_id} */
    readonly client_id: string;
    /** @see {@link OidcClientSettings.redirect_uri} */
    readonly redirect_uri: string;
    /** @see {@link OidcClientSettings.scope} */
    readonly scope: string;
    /** @see {@link OidcClientSettings.client_secret} */
    readonly client_secret: string | undefined;
    /** @see {@link OidcClientSettings.extraTokenParams} */
    readonly extraTokenParams: Record<string, unknown> | undefined;
    /** @see {@link OidcClientSettings.response_mode} */
    readonly response_mode: "query" | "fragment" | undefined;
    readonly skipUserInfo: boolean | undefined;
    private constructor();
    static create(args: SigninStateCreateArgs): Promise<SigninState>;
    toStorageString(): string;
    static fromStorageString(storageString: string): Promise<SigninState>;
}

/** @public */
export declare interface SigninStateArgs {
    id?: string;
    data?: unknown;
    created?: number;
    request_type?: string;
    code_verifier?: string;
    code_challenge?: string;
    authority: string;
    client_id: string;
    redirect_uri: string;
    scope: string;
    client_secret?: string;
    extraTokenParams?: Record<string, unknown>;
    response_mode?: "query" | "fragment";
    skipUserInfo?: boolean;
    url_state?: string;
}

/** @public */
export declare type SigninStateCreateArgs = Omit<SigninStateArgs, "code_verifier"> & {
    code_verifier?: string | boolean;
};

/**
 * @public
 */
export declare type SignoutPopupArgs = PopupWindowParams & ExtraSignoutRequestArgs;

/**
 * @public
 */
export declare type SignoutRedirectArgs = RedirectParams & ExtraSignoutRequestArgs;

/**
 * @public
 */
export declare class SignoutRequest {
    private readonly _logger;
    readonly url: string;
    readonly state?: State;
    constructor({ url, state_data, id_token_hint, post_logout_redirect_uri, extraQueryParams, request_type, client_id, url_state, }: SignoutRequestArgs);
}

/**
 * @public
 * @see https://openid.net/specs/openid-connect-rpinitiated-1_0.html#RPLogout
 */
export declare interface SignoutRequestArgs {
    url: string;
    id_token_hint?: string;
    client_id?: string;
    post_logout_redirect_uri?: string;
    extraQueryParams?: Record<string, string | number | boolean>;
    request_type?: string;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state_data?: unknown;
    url_state?: string;
}

/**
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 */
export declare class SignoutResponse {
    readonly state: string | null;
    /** @see {@link ErrorResponse.error} */
    error: string | null;
    /** @see {@link ErrorResponse.error_description} */
    error_description: string | null;
    /** @see {@link ErrorResponse.error_uri} */
    error_uri: string | null;
    /** custom state data set during the initial signin request */
    userState: unknown;
    url_state?: string;
    constructor(params: URLSearchParams);
}

/**
 * @public
 */
export declare type SignoutSilentArgs = IFrameWindowParams & ExtraSignoutRequestArgs;

/**
 * @public
 */
export declare type SilentRenewErrorCallback = (error: Error) => Promise<void> | void;

/**
 * @internal
 */
declare class SilentRenewService {
    private _userManager;
    protected _logger: Logger;
    private _isStarted;
    private readonly _retryTimer;
    constructor(_userManager: UserManager);
    start(): Promise<void>;
    stop(): void;
    protected _tokenExpiring: AccessTokenCallback;
}

/**
 * @public
 */
export declare class State {
    readonly id: string;
    readonly created: number;
    readonly request_type: string | undefined;
    readonly url_state: string | undefined;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    readonly data?: unknown;
    constructor(args: {
        id?: string;
        data?: unknown;
        created?: number;
        request_type?: string;
        url_state?: string;
    });
    toStorageString(): string;
    static fromStorageString(storageString: string): Promise<State>;
    static clearStaleState(storage: StateStore, age: number): Promise<void>;
}

/**
 * @public
 */
export declare interface StateStore {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    remove(key: string): Promise<string | null>;
    getAllKeys(): Promise<string[]>;
}

/**
 * @internal
 */
declare class TokenClient {
    private readonly _settings;
    private readonly _metadataService;
    private readonly _logger;
    private readonly _jsonService;
    constructor(_settings: OidcClientSettingsStore, _metadataService: MetadataService);
    /**
     * Exchange code.
     *
     * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
     */
    exchangeCode({ grant_type, redirect_uri, client_id, client_secret, extraHeaders, ...args }: ExchangeCodeArgs): Promise<Record<string, unknown>>;
    /**
     * Exchange credentials.
     *
     * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.3.2
     */
    exchangeCredentials({ grant_type, client_id, client_secret, scope, ...args }: ExchangeCredentialsArgs): Promise<Record<string, unknown>>;
    /**
     * Exchange a refresh token.
     *
     * @see https://www.rfc-editor.org/rfc/rfc6749#section-6
     */
    exchangeRefreshToken({ grant_type, client_id, client_secret, timeoutInSeconds, extraHeaders, ...args }: ExchangeRefreshTokenArgs): Promise<Record<string, unknown>>;
    /**
     * Revoke an access or refresh token.
     *
     * @see https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
     */
    revoke(args: RevokeArgs): Promise<void>;
}

/**
 * @public
 */
export declare class User {
    /**
     * A JSON Web Token (JWT). Only provided if `openid` scope was requested.
     * The application can access the data decoded by using the `profile` property.
     */
    id_token?: string;
    /** The session state value returned from the OIDC provider. */
    session_state: string | null;
    /**
     * The requested access token returned from the OIDC provider. The application can use this token to
     * authenticate itself to the secured resource.
     */
    access_token: string;
    /**
     * An OAuth 2.0 refresh token. The app can use this token to acquire additional access tokens after the
     * current access token expires. Refresh tokens are long-lived and can be used to maintain access to resources
     * for extended periods of time.
     */
    refresh_token?: string;
    /** Typically "Bearer" */
    token_type: string;
    /** The scopes that the requested access token is valid for. */
    scope?: string;
    /** The claims represented by a combination of the `id_token` and the user info endpoint. */
    profile: UserProfile;
    /** The expires at returned from the OIDC provider. */
    expires_at?: number;
    /** custom state data set during the initial signin request */
    readonly state: unknown;
    readonly url_state?: string;
    constructor(args: {
        id_token?: string;
        session_state?: string | null;
        access_token: string;
        refresh_token?: string;
        token_type: string;
        scope?: string;
        profile: UserProfile;
        expires_at?: number;
        userState?: unknown;
        url_state?: string;
    });
    /** Computed number of seconds the access token has remaining. */
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    /** Computed value indicating if the access token is expired. */
    get expired(): boolean | undefined;
    /** Array representing the parsed values from the `scope`. */
    get scopes(): string[];
    toStorageString(): string;
    static fromStorageString(storageString: string): User;
}

/**
 * @public
 */
export declare interface UseRefreshTokenArgs {
    redirect_uri?: string;
    resource?: string | string[];
    extraTokenParams?: Record<string, unknown>;
    timeoutInSeconds?: number;
    state: RefreshState;
    extraHeaders?: Record<string, ExtraHeader>;
}

/**
 * @internal
 */
declare class UserInfoService {
    private readonly _settings;
    private readonly _metadataService;
    protected readonly _logger: Logger;
    private readonly _jsonService;
    constructor(_settings: OidcClientSettingsStore, _metadataService: MetadataService);
    getClaims(token: string): Promise<JwtClaims>;
    protected _getClaimsFromJwt: (responseText: string) => Promise<JwtClaims>;
}

/**
 * @public
 */
export declare type UserLoadedCallback = (user: User) => Promise<void> | void;

/**
 * Provides a higher level API for signing a user in, signing out, managing the user's claims returned from the identity provider,
 * and managing an access token returned from the identity provider (OAuth2/OIDC).
 *
 * @public
 */
export declare class UserManager {
    /** Get the settings used to configure the `UserManager`. */
    readonly settings: UserManagerSettingsStore;
    protected readonly _logger: Logger;
    protected readonly _client: OidcClient;
    protected readonly _redirectNavigator: INavigator;
    protected readonly _popupNavigator: INavigator;
    protected readonly _iframeNavigator: INavigator;
    protected readonly _events: UserManagerEvents;
    protected readonly _silentRenewService: SilentRenewService;
    protected readonly _sessionMonitor: SessionMonitor | null;
    constructor(settings: UserManagerSettings, redirectNavigator?: INavigator, popupNavigator?: INavigator, iframeNavigator?: INavigator);
    /**
     * Get object used to register for events raised by the `UserManager`.
     */
    get events(): UserManagerEvents;
    /**
     * Get object used to access the metadata configuration of the identity provider.
     */
    get metadataService(): MetadataService;
    /**
     * Load the `User` object for the currently authenticated user.
     *
     * @param raiseEvent - If `true`, the `UserLoaded` event will be raised. Defaults to false.
     * @returns A promise
     */
    getUser(raiseEvent?: boolean): Promise<User | null>;
    /**
     * Remove from any storage the currently authenticated user.
     *
     * @returns A promise
     */
    removeUser(): Promise<void>;
    /**
     * Trigger a redirect of the current window to the authorization endpoint.
     *
     * @returns A promise
     *
     * @throws `Error` In cases of wrong authentication.
     */
    signinRedirect(args?: SigninRedirectArgs): Promise<void>;
    /**
     * Process the response (callback) from the authorization endpoint.
     * It is recommended to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise containing the authenticated `User`.
     *
     * @see {@link UserManager.signinCallback}
     */
    signinRedirectCallback(url?: string): Promise<User>;
    /**
     * Trigger the signin with user/password.
     *
     * @returns A promise containing the authenticated `User`.
     * @throws {@link ErrorResponse} In cases of wrong authentication.
         */
     signinResourceOwnerCredentials({ username, password, skipUserInfo, }: SigninResourceOwnerCredentialsArgs): Promise<User>;
     /**
      * Trigger a request (via a popup window) to the authorization endpoint.
      *
      * @returns A promise containing the authenticated `User`.
      * @throws `Error` In cases of wrong authentication.
      */
     signinPopup(args?: SigninPopupArgs): Promise<User>;
     /**
      * Notify the opening window of response (callback) from the authorization endpoint.
      * It is recommended to use {@link UserManager.signinCallback} instead.
      *
      * @returns A promise
      *
      * @see {@link UserManager.signinCallback}
      */
     signinPopupCallback(url?: string, keepOpen?: boolean): Promise<void>;
     /**
      * Trigger a silent request (via refresh token or an iframe) to the authorization endpoint.
      *
      * @returns A promise that contains the authenticated `User`.
      */
     signinSilent(args?: SigninSilentArgs): Promise<User | null>;
     protected _useRefreshToken(args: UseRefreshTokenArgs): Promise<User>;
     /**
      *
      * Notify the parent window of response (callback) from the authorization endpoint.
      * It is recommended to use {@link UserManager.signinCallback} instead.
      *
      * @returns A promise
      *
      * @see {@link UserManager.signinCallback}
      */
     signinSilentCallback(url?: string): Promise<void>;
     /**
      * Process any response (callback) from the authorization endpoint, by dispatching the request_type
      * and executing one of the following functions:
      * - {@link UserManager.signinRedirectCallback}
      * - {@link UserManager.signinPopupCallback}
      * - {@link UserManager.signinSilentCallback}
      *
      * @throws `Error` If request_type is unknown or signin cannot be processed.
      */
     signinCallback(url?: string): Promise<User | undefined>;
     /**
      * Process any response (callback) from the end session endpoint, by dispatching the request_type
      * and executing one of the following functions:
      * - {@link UserManager.signoutRedirectCallback}
      * - {@link UserManager.signoutPopupCallback}
      * - {@link UserManager.signoutSilentCallback}
      *
      * @throws `Error` If request_type is unknown or signout cannot be processed.
      */
     signoutCallback(url?: string, keepOpen?: boolean): Promise<SignoutResponse | undefined>;
     /**
      * Query OP for user's current signin status.
      *
      * @returns A promise object with session_state and subject identifier.
      */
     querySessionStatus(args?: QuerySessionStatusArgs): Promise<SessionStatus | null>;
     protected _signin(args: CreateSigninRequestArgs, handle: IWindow, verifySub?: string): Promise<User>;
     protected _signinStart(args: CreateSigninRequestArgs, handle: IWindow): Promise<NavigateResponse>;
     protected _signinEnd(url: string, verifySub?: string): Promise<User>;
     protected _buildUser(signinResponse: SigninResponse, verifySub?: string): Promise<User>;
     /**
      * Trigger a redirect of the current window to the end session endpoint.
      *
      * @returns A promise
      */
     signoutRedirect(args?: SignoutRedirectArgs): Promise<void>;
     /**
      * Process response (callback) from the end session endpoint.
      * It is recommended to use {@link UserManager.signoutCallback} instead.
      *
      * @returns A promise containing signout response
      *
      * @see {@link UserManager.signoutCallback}
      */
     signoutRedirectCallback(url?: string): Promise<SignoutResponse>;
     /**
      * Trigger a redirect of a popup window to the end session endpoint.
      *
      * @returns A promise
      */
     signoutPopup(args?: SignoutPopupArgs): Promise<void>;
     /**
      * Process response (callback) from the end session endpoint from a popup window.
      * It is recommended to use {@link UserManager.signoutCallback} instead.
      *
      * @returns A promise
      *
      * @see {@link UserManager.signoutCallback}
      */
     signoutPopupCallback(url?: string, keepOpen?: boolean): Promise<void>;
     protected _signout(args: CreateSignoutRequestArgs, handle: IWindow): Promise<SignoutResponse>;
     protected _signoutStart(args: CreateSignoutRequestArgs | undefined, handle: IWindow): Promise<NavigateResponse>;
     protected _signoutEnd(url: string): Promise<SignoutResponse>;
     /**
      * Trigger a silent request (via an iframe) to the end session endpoint.
      *
      * @returns A promise
      */
     signoutSilent(args?: SignoutSilentArgs): Promise<void>;
     /**
      * Notify the parent window of response (callback) from the end session endpoint.
      * It is recommended to use {@link UserManager.signoutCallback} instead.
      *
      * @returns A promise
      *
      * @see {@link UserManager.signoutCallback}
      */
     signoutSilentCallback(url?: string): Promise<void>;
     revokeTokens(types?: RevokeTokensTypes): Promise<void>;
     protected _revokeInternal(user: User | null, types?: ("access_token" | "refresh_token")[]): Promise<void>;
     /**
      * Enables silent renew for the `UserManager`.
      */
     startSilentRenew(): void;
     /**
      * Disables silent renew for the `UserManager`.
      */
     stopSilentRenew(): void;
     protected get _userStoreKey(): string;
     protected _loadUser(): Promise<User | null>;
     storeUser(user: User | null): Promise<void>;
     /**
      * Removes stale state entries in storage for incomplete authorize requests.
      */
     clearStaleState(): Promise<void>;
     /**
      * Dynamically generates a DPoP proof for a given user, URL and optional Http method.
      * This method is useful when you need to make a request to a resource server
      * with fetch or similar, and you need to include a DPoP proof in a DPoP header.
      * @param url - The URL to generate the DPoP proof for
      * @param user - The user to generate the DPoP proof for
      * @param httpMethod - Optional, defaults to "GET"
      * @param nonce - Optional nonce provided by the resource server
      *
      * @returns A promise containing the DPoP proof or undefined if DPoP is not enabled/no user is found.
      */
     dpopProof(url: string, user: User, httpMethod?: string, nonce?: string): Promise<string | undefined>;
     generateDPoPJkt(dpopSettings: DPoPSettings): Promise<string | undefined>;
    }

    /**
     * @public
     */
    export declare class UserManagerEvents extends AccessTokenEvents {
        protected readonly _logger: Logger;
        private readonly _userLoaded;
        private readonly _userUnloaded;
        private readonly _silentRenewError;
        private readonly _userSignedIn;
        private readonly _userSignedOut;
        private readonly _userSessionChanged;
        constructor(settings: UserManagerSettingsStore);
        load(user: User, raiseEvent?: boolean): Promise<void>;
        unload(): Promise<void>;
        /**
         * Add callback: Raised when a user session has been established (or re-established).
         */
        addUserLoaded(cb: UserLoadedCallback): () => void;
        /**
         * Remove callback: Raised when a user session has been established (or re-established).
         */
        removeUserLoaded(cb: UserLoadedCallback): void;
        /**
         * Add callback: Raised when a user session has been terminated.
         */
        addUserUnloaded(cb: UserUnloadedCallback): () => void;
        /**
         * Remove callback: Raised when a user session has been terminated.
         */
        removeUserUnloaded(cb: UserUnloadedCallback): void;
        /**
         * Add callback: Raised when the automatic silent renew has failed.
         */
        addSilentRenewError(cb: SilentRenewErrorCallback): () => void;
        /**
         * Remove callback: Raised when the automatic silent renew has failed.
         */
        removeSilentRenewError(cb: SilentRenewErrorCallback): void;
        /**
         * @internal
         */
        _raiseSilentRenewError(e: Error): Promise<void>;
        /**
         * Add callback: Raised when the user is signed in (when `monitorSession` is set).
         * @see {@link UserManagerSettings.monitorSession}
         */
        addUserSignedIn(cb: UserSignedInCallback): () => void;
        /**
         * Remove callback: Raised when the user is signed in (when `monitorSession` is set).
         */
        removeUserSignedIn(cb: UserSignedInCallback): void;
        /**
         * @internal
         */
        _raiseUserSignedIn(): Promise<void>;
        /**
         * Add callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
         * @see {@link UserManagerSettings.monitorSession}
         */
        addUserSignedOut(cb: UserSignedOutCallback): () => void;
        /**
         * Remove callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
         */
        removeUserSignedOut(cb: UserSignedOutCallback): void;
        /**
         * @internal
         */
        _raiseUserSignedOut(): Promise<void>;
        /**
         * Add callback: Raised when the user session changed (when `monitorSession` is set).
         * @see {@link UserManagerSettings.monitorSession}
         */
        addUserSessionChanged(cb: UserSessionChangedCallback): () => void;
        /**
         * Remove callback: Raised when the user session changed (when `monitorSession` is set).
         */
        removeUserSessionChanged(cb: UserSessionChangedCallback): void;
        /**
         * @internal
         */
        _raiseUserSessionChanged(): Promise<void>;
    }

    /**
     * The settings used to configure the {@link UserManager}.
     *
     * @public
     */
    export declare interface UserManagerSettings extends OidcClientSettings {
        /** The URL for the page containing the call to signinPopupCallback to handle the callback from the OIDC/OAuth2 */
        popup_redirect_uri?: string;
        popup_post_logout_redirect_uri?: string;
        /**
         * The features parameter to window.open for the popup signin window. By default, the popup is
         * placed centered in front of the window opener.
         * (default: \{ location: false, menubar: false, height: 640, closePopupWindowAfterInSeconds: -1 \})
         */
        popupWindowFeatures?: PopupWindowFeatures;
        /** The target parameter to window.open for the popup signin window (default: "_blank") */
        popupWindowTarget?: string;
        /** The methods window.location method used to redirect (default: "assign") */
        redirectMethod?: "replace" | "assign";
        /** The methods target window being redirected (default: "self") */
        redirectTarget?: "top" | "self";
        /** The target to pass while calling postMessage inside iframe for callback (default: window.location.origin) */
        iframeNotifyParentOrigin?: string;
        /** The script origin to check during 'message' callback execution while performing silent auth via iframe (default: window.location.origin) */
        iframeScriptOrigin?: string;
        /** The URL for the page containing the code handling the silent renew */
        silent_redirect_uri?: string;
        /** Number of seconds to wait for the silent renew to return before assuming it has failed or timed out (default: 10) */
        silentRequestTimeoutInSeconds?: number;
        /** Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration. The automatic renew attempt starts 1 minute before the access token expires (default: true) */
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
        /**
         * The `token_type_hint`s to pass to the authority server by default (default: ["access_token", "refresh_token"])
         *
         * Token types will be revoked in the same order as they are given here.
         */
        revokeTokenTypes?: ("access_token" | "refresh_token")[];
        /** Will invoke the revocation endpoint on signout if there is an access token for the user (default: false) */
        revokeTokensOnSignout?: boolean;
        /** Flag to control if id_token is included as id_token_hint in silent signout calls (default: false) */
        includeIdTokenInSilentSignout?: boolean;
        /** The number of seconds before an access token is to expire to raise the accessTokenExpiring event (default: 60) */
        accessTokenExpiringNotificationTimeInSeconds?: number;
        /**
         * Storage object used to persist User for currently authenticated user (default: window.sessionStorage, InMemoryWebStorage iff no window).
         *  E.g. `userStore: new WebStorageStateStore({ store: window.localStorage })`
         */
        userStore?: StateStore;
    }

    /**
     * The settings with defaults applied of the {@link UserManager}.
     * @see {@link UserManagerSettings}
     *
     * @public
     */
    export declare class UserManagerSettingsStore extends OidcClientSettingsStore {
        readonly popup_redirect_uri: string;
        readonly popup_post_logout_redirect_uri: string | undefined;
        readonly popupWindowFeatures: PopupWindowFeatures;
        readonly popupWindowTarget: string;
        readonly redirectMethod: "replace" | "assign";
        readonly redirectTarget: "top" | "self";
        readonly iframeNotifyParentOrigin: string | undefined;
        readonly iframeScriptOrigin: string | undefined;
        readonly silent_redirect_uri: string;
        readonly silentRequestTimeoutInSeconds: number;
        readonly automaticSilentRenew: boolean;
        readonly validateSubOnSilentRenew: boolean;
        readonly includeIdTokenInSilentRenew: boolean;
        readonly monitorSession: boolean;
        readonly monitorAnonymousSession: boolean;
        readonly checkSessionIntervalInSeconds: number;
        readonly query_status_response_type: string;
        readonly stopCheckSessionOnError: boolean;
        readonly revokeTokenTypes: ("access_token" | "refresh_token")[];
        readonly revokeTokensOnSignout: boolean;
        readonly includeIdTokenInSilentSignout: boolean;
        readonly accessTokenExpiringNotificationTimeInSeconds: number;
        readonly userStore: StateStore;
        constructor(args: UserManagerSettings);
    }

    /**
     * Holds claims represented by a combination of the `id_token` and the user info endpoint.
     *
     * @public
     */
    export declare type UserProfile = IdTokenClaims;

    /**
     * @public
     */
    export declare type UserSessionChangedCallback = () => Promise<void> | void;

    /**
     * @public
     */
    export declare type UserSignedInCallback = () => Promise<void> | void;

    /**
     * @public
     */
    export declare type UserSignedOutCallback = () => Promise<void> | void;

    /**
     * @public
     */
    export declare type UserUnloadedCallback = () => Promise<void> | void;

    /**
     * @public
     */
    export declare const Version: string;

    /**
     * @public
     */
    export declare class WebStorageStateStore implements StateStore {
        private readonly _logger;
        private readonly _store;
        private readonly _prefix;
        constructor({ prefix, store, }?: {
            prefix?: string;
            store?: AsyncStorage | Storage;
        });
        set(key: string, value: string): Promise<void>;
        get(key: string): Promise<string | null>;
        remove(key: string): Promise<string | null>;
        getAllKeys(): Promise<string[]>;
    }

    export { }
