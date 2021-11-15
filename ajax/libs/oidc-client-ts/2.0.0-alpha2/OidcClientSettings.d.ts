import { OidcMetadata } from "./OidcMetadata";
import { StateStore } from "./StateStore";
export interface OidcClientSettings {
    /** The URL of the OIDC/OAuth2 provider */
    authority: string;
    metadataUrl?: string;
    /** Provide metadata when authority server does not allow CORS on the metadata endpoint */
    metadata?: Partial<OidcMetadata>;
    /** Can be used to seed or add additional values to the results of the discovery request */
    metadataSeed?: Partial<OidcMetadata>;
    /** Provide signingKeys when authority server does not allow CORS on the jwks uri */
    signingKeys?: Record<string, string>[];
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
export declare class OidcClientSettingsStore {
    readonly authority: string;
    readonly metadataUrl: string | undefined;
    readonly metadata: Partial<OidcMetadata> | undefined;
    readonly metadataSeed: Partial<OidcMetadata> | undefined;
    readonly signingKeys: Record<string, string>[] | undefined;
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
