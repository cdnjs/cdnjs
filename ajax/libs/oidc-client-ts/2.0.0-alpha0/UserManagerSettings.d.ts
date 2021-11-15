import { OidcClientSettings, OidcClientSettingsStore } from './OidcClientSettings';
import { RedirectNavigator } from './RedirectNavigator';
import { PopupNavigator } from './PopupNavigator';
import { IFrameNavigator } from './IFrameNavigator';
import { WebStorageStateStore } from './WebStorageStateStore';
export interface UserManagerSettings extends OidcClientSettings {
    /** The URL for the page containing the call to signinPopupCallback to handle the callback from the OIDC/OAuth2 */
    popup_redirect_uri?: string;
    popup_post_logout_redirect_uri?: string;
    /** The features parameter to window.open for the popup signin window.
     *  default: 'location=no,toolbar=no,width=500,height=500,left=100,top=100'
     */
    popupWindowFeatures?: string;
    /** The target parameter to window.open for the popup signin window (default: '_blank') */
    popupWindowTarget?: any;
    /** The URL for the page containing the code handling the silent renew */
    silent_redirect_uri?: any;
    /** Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out (default: 10000) */
    silentRequestTimeout?: any;
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
    redirectNavigator?: any;
    popupNavigator?: any;
    iframeNavigator?: any;
    /** Storage object used to persist User for currently authenticated user (default: session storage) */
    userStore?: WebStorageStateStore;
}
export declare class UserManagerSettingsStore extends OidcClientSettingsStore {
    private readonly _popup_redirect_uri?;
    private readonly _popup_post_logout_redirect_uri?;
    private readonly _popupWindowFeatures?;
    private readonly _popupWindowTarget?;
    private readonly _silent_redirect_uri?;
    private readonly _silentRequestTimeout?;
    private readonly _automaticSilentRenew;
    private readonly _validateSubOnSilentRenew;
    private readonly _includeIdTokenInSilentRenew;
    private readonly _monitorSession;
    private readonly _monitorAnonymousSession;
    private readonly _checkSessionInterval;
    private readonly _query_status_response_type?;
    private readonly _stopCheckSessionOnError?;
    private readonly _revokeAccessTokenOnSignout;
    private readonly _accessTokenExpiringNotificationTime;
    private readonly _redirectNavigator;
    private readonly _popupNavigator;
    private readonly _iframeNavigator;
    private readonly _userStore;
    constructor({ popup_redirect_uri, popup_post_logout_redirect_uri, popupWindowFeatures, popupWindowTarget, silent_redirect_uri, silentRequestTimeout, automaticSilentRenew, validateSubOnSilentRenew, includeIdTokenInSilentRenew, monitorSession, monitorAnonymousSession, checkSessionInterval, stopCheckSessionOnError, query_status_response_type, revokeAccessTokenOnSignout, accessTokenExpiringNotificationTime, redirectNavigator, popupNavigator, iframeNavigator, userStore }?: UserManagerSettings);
    get popup_redirect_uri(): string | undefined;
    get popup_post_logout_redirect_uri(): string | undefined;
    get popupWindowFeatures(): string | undefined;
    get popupWindowTarget(): any;
    get silent_redirect_uri(): any;
    get silentRequestTimeout(): any;
    get automaticSilentRenew(): boolean;
    get validateSubOnSilentRenew(): boolean;
    get includeIdTokenInSilentRenew(): boolean;
    get accessTokenExpiringNotificationTime(): number;
    get monitorSession(): boolean;
    get monitorAnonymousSession(): boolean;
    get checkSessionInterval(): number;
    get stopCheckSessionOnError(): boolean | undefined;
    get query_status_response_type(): string | undefined;
    get revokeAccessTokenOnSignout(): boolean;
    get redirectNavigator(): RedirectNavigator;
    get popupNavigator(): PopupNavigator;
    get iframeNavigator(): IFrameNavigator;
    get userStore(): WebStorageStateStore;
}
