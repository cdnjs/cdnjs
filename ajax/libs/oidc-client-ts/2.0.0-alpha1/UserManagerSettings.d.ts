import { OidcClientSettings, OidcClientSettingsStore } from "./OidcClientSettings";
import { WebStorageStateStore } from "./WebStorageStateStore";
export interface UserManagerSettings extends OidcClientSettings {
    /** The URL for the page containing the call to signinPopupCallback to handle the callback from the OIDC/OAuth2 */
    popup_redirect_uri?: string;
    popup_post_logout_redirect_uri?: string;
    /** The features parameter to window.open for the popup signin window.
     *  default: 'location=no,toolbar=no,width=500,height=500,left=100,top=100'
     */
    popupWindowFeatures?: string;
    /** The target parameter to window.open for the popup signin window (default: "_blank") */
    popupWindowTarget?: string;
    /** The URL for the page containing the code handling the silent renew */
    silent_redirect_uri?: string;
    /** Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out (default: 10000) */
    silentRequestTimeout?: number;
    /** Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration (default: false) */
    automaticSilentRenew?: boolean;
    validateSubOnSilentRenew?: boolean;
    /** Flag to control if id_token is included as id_token_hint in silent renew calls (default: true) */
    includeIdTokenInSilentRenew?: boolean;
    /** Will raise events for when user has performed a signout at the OP (default: true) */
    monitorSession?: boolean;
    monitorAnonymousSession?: boolean;
    /** Interval, in ms, to check the user's session (default: 2000) */
    checkSessionInterval?: number;
    query_status_response_type?: string;
    stopCheckSessionOnError?: boolean;
    /** Will invoke the revocation endpoint on signout if there is an access token for the user (default: false) */
    revokeAccessTokenOnSignout?: boolean;
    /** The number of seconds before an access token is to expire to raise the accessTokenExpiring event (default: 60) */
    accessTokenExpiringNotificationTime?: number;
    /** Storage object used to persist User for currently authenticated user (default: session storage) */
    userStore?: WebStorageStateStore;
}
export declare class UserManagerSettingsStore extends OidcClientSettingsStore {
    readonly popup_redirect_uri: string | undefined;
    readonly popup_post_logout_redirect_uri: string | undefined;
    readonly popupWindowFeatures: string | undefined;
    readonly popupWindowTarget: string | undefined;
    readonly silent_redirect_uri: string | undefined;
    readonly silentRequestTimeout: number | undefined;
    readonly automaticSilentRenew: boolean;
    readonly validateSubOnSilentRenew: boolean;
    readonly includeIdTokenInSilentRenew: boolean;
    readonly monitorSession: boolean;
    readonly monitorAnonymousSession: boolean;
    readonly checkSessionInterval: number;
    readonly query_status_response_type: string | undefined;
    readonly stopCheckSessionOnError: boolean | undefined;
    readonly revokeAccessTokenOnSignout: boolean;
    readonly accessTokenExpiringNotificationTime: number;
    readonly userStore: WebStorageStateStore;
    constructor(args: UserManagerSettings);
}
