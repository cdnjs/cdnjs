interface SerializeOptions {
    encode?: (val: string | number | boolean) => string;
    maxAge?: number;
    domain?: string;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    priority?: string;
    sameSite?: boolean | string;
}
type AuthModel = {
    [key: string]: any;
} | null;
type OnStoreChangeFunc = (token: string, model: AuthModel) => void;
/**
 * Base AuthStore class that is intended to be extended by all other
 * PocketBase AuthStore implementations.
 */
declare abstract class BaseAuthStore {
    protected baseToken: string;
    protected baseModel: AuthModel;
    private _onChangeCallbacks;
    /**
     * Retrieves the stored token (if any).
     */
    get token(): string;
    /**
     * Retrieves the stored model data (if any).
     */
    get model(): AuthModel;
    /**
     * Loosely checks if the store has valid token (aka. existing and unexpired exp claim).
     */
    get isValid(): boolean;
    /**
     * Checks whether the current store state is for admin authentication.
     */
    get isAdmin(): boolean;
    /**
     * Checks whether the current store state is for auth record authentication.
     */
    get isAuthRecord(): boolean;
    /**
     * Saves the provided new token and model data in the auth store.
     */
    save(token: string, model?: AuthModel): void;
    /**
     * Removes the stored token and model data form the auth store.
     */
    clear(): void;
    /**
     * Parses the provided cookie string and updates the store state
     * with the cookie's token and model data.
     *
     * NB! This function doesn't validate the token or its data.
     * Usually this isn't a concern if you are interacting only with the
     * PocketBase API because it has the proper server-side security checks in place,
     * but if you are using the store `isValid` state for permission controls
     * in a node server (eg. SSR), then it is recommended to call `authRefresh()`
     * after loading the cookie to ensure an up-to-date token and model state.
     * For example:
     *
     * ```js
     * pb.authStore.loadFromCookie("cookie string...");
     *
     * try {
     *     // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
     *     pb.authStore.isValid && await pb.collection('users').authRefresh();
     * } catch (_) {
     *     // clear the auth store on failed refresh
     *     pb.authStore.clear();
     * }
     * ```
     */
    loadFromCookie(cookie: string, key?: string): void;
    /**
     * Exports the current store state as cookie string.
     *
     * By default the following optional attributes are added:
     * - Secure
     * - HttpOnly
     * - SameSite=Strict
     * - Path=/
     * - Expires={the token expiration date}
     *
     * NB! If the generated cookie exceeds 4096 bytes, this method will
     * strip the model data to the bare minimum to try to fit within the
     * recommended size in https://www.rfc-editor.org/rfc/rfc6265#section-6.1.
     */
    exportToCookie(options?: SerializeOptions, key?: string): string;
    /**
     * Register a callback function that will be called on store change.
     *
     * You can set the `fireImmediately` argument to true in order to invoke
     * the provided callback right after registration.
     *
     * Returns a removal function that you could call to "unsubscribe" from the changes.
     */
    onChange(callback: OnStoreChangeFunc, fireImmediately?: boolean): () => void;
    protected triggerChange(): void;
}
/**
 * BaseService class that should be inherited from all API services.
 */
declare abstract class BaseService {
    readonly client: Client;
    constructor(client: Client);
}
interface SendOptions extends RequestInit {
    // for backward compatibility and to minimize the verbosity,
    // any top-level field that doesn't exist in RequestInit or the
    // fields below will be treated as query parameter.
    [key: string]: any;
    /**
     * Optional custom fetch function to use for sending the request.
     */
    fetch?: (url: RequestInfo | URL, config?: RequestInit) => Promise<Response>;
    /**
     * Custom headers to send with the requests.
     */
    headers?: {
        [key: string]: string;
    };
    /**
     * The body of the request (serialized automatically for json requests).
     */
    body?: any;
    /**
     * Query parameters that will be appended to the request url.
     */
    query?: {
        [key: string]: any;
    };
    /**
     * @deprecated use `query` instead
     *
     * for backward-compatibility `params` values are merged with `query`,
     * but this option may get removed in the final v1 release
     */
    params?: {
        [key: string]: any;
    };
    /**
     * The request identifier that can be used to cancel pending requests.
     */
    requestKey?: string | null;
    /**
     * @deprecated use `requestKey:string` instead
     */
    $cancelKey?: string;
    /**
     * @deprecated use `requestKey:null` instead
     */
    $autoCancel?: boolean;
}
interface CommonOptions extends SendOptions {
    fields?: string;
}
interface ListOptions extends CommonOptions {
    page?: number;
    perPage?: number;
    sort?: string;
    filter?: string;
    skipTotal?: boolean;
}
interface FullListOptions extends ListOptions {
    batch?: number;
}
interface RecordOptions extends CommonOptions {
    expand?: string;
}
interface RecordListOptions extends ListOptions, RecordOptions {
}
interface RecordFullListOptions extends FullListOptions, RecordOptions {
}
interface LogStatsOptions extends CommonOptions {
    filter?: string;
}
interface FileOptions extends CommonOptions {
    thumb?: string;
    download?: boolean;
}
interface AuthOptions extends CommonOptions {
    /**
     * If autoRefreshThreshold is set it will take care to auto refresh
     * when necessary the auth data before each request to ensure that
     * the auth state is always valid.
     *
     * The value must be in seconds, aka. the amount of seconds
     * that will be subtracted from the current token `exp` claim in order
     * to determine whether it is going to expire within the specified time threshold.
     *
     * For example, if you want to auto refresh the token if it is
     * going to expire in the next 30mins (or already has expired),
     * it can be set to `1800`
     */
    autoRefreshThreshold?: number;
}
interface appleClientSecret {
    secret: string;
}
declare class SettingsService extends BaseService {
    /**
     * Fetch all available app settings.
     *
     * @throws {ClientResponseError}
     */
    getAll(options?: CommonOptions): Promise<{
        [key: string]: any;
    }>;
    /**
     * Bulk updates app settings.
     *
     * @throws {ClientResponseError}
     */
    update(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): Promise<{
        [key: string]: any;
    }>;
    /**
     * Performs a S3 filesystem connection test.
     *
     * The currently supported `filesystem` are "storage" and "backups".
     *
     * @throws {ClientResponseError}
     */
    testS3(filesystem?: string, options?: CommonOptions): Promise<boolean>;
    /**
     * Sends a test email.
     *
     * The possible `emailTemplate` values are:
     * - verification
     * - password-reset
     * - email-change
     *
     * @throws {ClientResponseError}
     */
    testEmail(toEmail: string, emailTemplate: string, options?: CommonOptions): Promise<boolean>;
    /**
     * Generates a new Apple OAuth2 client secret.
     *
     * @throws {ClientResponseError}
     */
    generateAppleClientSecret(clientId: string, teamId: string, keyId: string, privateKey: string, duration: number, options?: CommonOptions): Promise<appleClientSecret>;
}
interface ListResult<T> {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: Array<T>;
}
interface BaseModel {
    [key: string]: any;
    id: string;
    created: string;
    updated: string;
}
interface AdminModel extends BaseModel {
    avatar: number;
    email: string;
}
interface SchemaField {
    id: string;
    name: string;
    type: string;
    system: boolean;
    required: boolean;
    presentable: boolean;
    options: {
        [key: string]: any;
    };
}
interface CollectionModel extends BaseModel {
    name: string;
    type: string;
    schema: Array<SchemaField>;
    indexes: Array<string>;
    system: boolean;
    listRule?: string;
    viewRule?: string;
    createRule?: string;
    updateRule?: string;
    deleteRule?: string;
    options: {
        [key: string]: any;
    };
}
interface ExternalAuthModel extends BaseModel {
    recordId: string;
    collectionId: string;
    provider: string;
    providerId: string;
}
interface LogModel extends BaseModel {
    level: string;
    message: string;
    data: {
        [key: string]: any;
    };
}
interface RecordModel extends BaseModel {
    collectionId: string;
    collectionName: string;
    expand?: {
        [key: string]: any;
    };
}
declare abstract class CrudService<M> extends BaseService {
    /**
     * Base path for the crud actions (without trailing slash, eg. '/admins').
     */
    abstract get baseCrudPath(): string;
    /**
     * Response data decoder.
     */
    decode<T = M>(data: {
        [key: string]: any;
    }): T;
    /**
     * Returns a promise with all list items batch fetched at once
     * (by default 500 items per request; to change it set the `batch` query param).
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    getFullList<T = M>(options?: FullListOptions): Promise<Array<T>>;
    /**
     * Legacy version of getFullList with explicitly specified batch size.
     */
    getFullList<T = M>(batch?: number, options?: ListOptions): Promise<Array<T>>;
    /**
     * Returns paginated items list.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    getList<T = M>(page?: number, perPage?: number, options?: ListOptions): Promise<ListResult<T>>;
    /**
     * Returns the first found item by the specified filter.
     *
     * Internally it calls `getList(1, 1, { filter, skipTotal })` and
     * returns the first found item.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * For consistency with `getOne`, this method will throw a 404
     * ClientResponseError if no item was found.
     *
     * @throws {ClientResponseError}
     */
    getFirstListItem<T = M>(filter: string, options?: CommonOptions): Promise<T>;
    /**
     * Returns single item by its id.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * If `id` is empty it will throw a 404 error.
     *
     * @throws {ClientResponseError}
     */
    getOne<T = M>(id: string, options?: CommonOptions): Promise<T>;
    /**
     * Creates a new item.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    create<T = M>(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): Promise<T>;
    /**
     * Updates an existing item by its id.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    update<T = M>(id: string, bodyParams?: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): Promise<T>;
    /**
     * Deletes an existing item by its id.
     *
     * @throws {ClientResponseError}
     */
    delete(id: string, options?: CommonOptions): Promise<boolean>;
    /**
     * Returns a promise with all list items batch fetched at once.
     */
    protected _getFullList<T = M>(batchSize?: number, options?: ListOptions): Promise<Array<T>>;
}
interface AdminAuthResponse {
    [key: string]: any;
    token: string;
    admin: AdminModel;
}
declare class AdminService extends CrudService<AdminModel> {
    /**
     * @inheritdoc
     */
    get baseCrudPath(): string;
    // ---------------------------------------------------------------
    // Post update/delete AuthStore sync
    // ---------------------------------------------------------------
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.model` matches with the updated id, then
     * on success the `client.authStore.model` will be updated with the result.
     */
    update<T = AdminModel>(id: string, bodyParams?: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): Promise<T>;
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.model` matches with the deleted id,
     * then on success the `client.authStore` will be cleared.
     */
    delete(id: string, options?: CommonOptions): Promise<boolean>;
    // ---------------------------------------------------------------
    // Auth handlers
    // ---------------------------------------------------------------
    /**
     * Prepare successful authorize response.
     */
    protected authResponse(responseData: any): AdminAuthResponse;
    /**
     * Authenticate an admin account with its email and password
     * and returns a new admin token and data.
     *
     * On success this method automatically updates the client's AuthStore data.
     *
     * @throws {ClientResponseError}
     */
    authWithPassword(email: string, password: string, options?: AuthOptions): Promise<AdminAuthResponse>;
    /**
     * @deprecated
     * Consider using authWithPassword(email, password, options?).
     */
    authWithPassword(email: string, password: string, body?: any, query?: any): Promise<AdminAuthResponse>;
    /**
     * Refreshes the current admin authenticated instance and
     * returns a new token and admin data.
     *
     * On success this method automatically updates the client's AuthStore data.
     *
     * @throws {ClientResponseError}
     */
    authRefresh(options?: CommonOptions): Promise<AdminAuthResponse>;
    /**
     * @deprecated
     * Consider using authRefresh(options?).
     */
    authRefresh(body?: any, query?: any): Promise<AdminAuthResponse>;
    /**
     * Sends admin password reset request.
     *
     * @throws {ClientResponseError}
     */
    requestPasswordReset(email: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using requestPasswordReset(email, options?).
     */
    requestPasswordReset(email: string, body?: any, query?: any): Promise<boolean>;
    /**
     * Confirms admin password reset request.
     *
     * @throws {ClientResponseError}
     */
    confirmPasswordReset(resetToken: string, password: string, passwordConfirm: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using confirmPasswordReset(resetToken, password, passwordConfirm, options?).
     */
    confirmPasswordReset(resetToken: string, password: string, passwordConfirm: string, body?: any, query?: any): Promise<boolean>;
}
type UnsubscribeFunc = () => Promise<void>;
declare class RealtimeService extends BaseService {
    clientId: string;
    private eventSource;
    private subscriptions;
    private lastSentSubscriptions;
    private connectTimeoutId;
    private maxConnectTimeout;
    private reconnectTimeoutId;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private predefinedReconnectIntervals;
    private pendingConnects;
    /**
     * Returns whether the realtime connection has been established.
     */
    get isConnected(): boolean;
    /**
     * Register the subscription listener.
     *
     * You can subscribe multiple times to the same topic.
     *
     * If the SSE connection is not started yet,
     * this method will also initialize it.
     */
    subscribe(topic: string, callback: (data: any) => void, options?: SendOptions): Promise<UnsubscribeFunc>;
    /**
     * Unsubscribe from all subscription listeners with the specified topic.
     *
     * If `topic` is not provided, then this method will unsubscribe
     * from all active subscriptions.
     *
     * This method is no-op if there are no active subscriptions.
     *
     * The related sse connection will be autoclosed if after the
     * unsubscribe operation there are no active subscriptions left.
     */
    unsubscribe(topic?: string): Promise<void>;
    /**
     * Unsubscribe from all subscription listeners starting with the specified topic prefix.
     *
     * This method is no-op if there are no active subscriptions with the specified topic prefix.
     *
     * The related sse connection will be autoclosed if after the
     * unsubscribe operation there are no active subscriptions left.
     */
    unsubscribeByPrefix(keyPrefix: string): Promise<void>;
    /**
     * Unsubscribe from all subscriptions matching the specified topic and listener function.
     *
     * This method is no-op if there are no active subscription with
     * the specified topic and listener.
     *
     * The related sse connection will be autoclosed if after the
     * unsubscribe operation there are no active subscriptions left.
     */
    unsubscribeByTopicAndListener(topic: string, listener: EventListener): Promise<void>;
    private hasSubscriptionListeners;
    private submitSubscriptions;
    private getSubscriptionsCancelKey;
    private getSubscriptionsByTopic;
    private getNonEmptySubscriptionKeys;
    private addAllSubscriptionListeners;
    private removeAllSubscriptionListeners;
    private connect;
    private initConnect;
    private hasUnsentSubscriptions;
    private connectErrorHandler;
    private disconnect;
}
interface RecordAuthResponse<T = RecordModel> {
    /**
     * The signed PocketBase auth record.
     */
    record: T;
    /**
     * The PocketBase record auth token.
     *
     * If you are looking for the OAuth2 access and refresh tokens
     * they are available under the `meta.accessToken` and `meta.refreshToken` props.
     */
    token: string;
    /**
     * Auth meta data usually filled when OAuth2 is used.
     */
    meta?: {
        [key: string]: any;
    };
}
interface AuthProviderInfo {
    name: string;
    displayName: string;
    state: string;
    authUrl: string;
    codeVerifier: string;
    codeChallenge: string;
    codeChallengeMethod: string;
}
interface AuthMethodsList {
    usernamePassword: boolean;
    emailPassword: boolean;
    onlyVerified: boolean;
    authProviders: Array<AuthProviderInfo>;
}
interface RecordSubscription<T = RecordModel> {
    action: string; // eg. create, update, delete
    record: T;
}
type OAuth2UrlCallback = (url: string) => void | Promise<void>;
interface OAuth2AuthConfig extends SendOptions {
    // the name of the OAuth2 provider (eg. "google")
    provider: string;
    // custom scopes to overwrite the default ones
    scopes?: Array<string>;
    // optional record create data
    createData?: {
        [key: string]: any;
    };
    // optional callback that is triggered after the OAuth2 sign-in/sign-up url generation
    urlCallback?: OAuth2UrlCallback;
    // optional query params to send with the PocketBase auth request (eg. fields, expand, etc.)
    query?: RecordOptions;
}
declare class RecordService<M = RecordModel> extends CrudService<M> {
    readonly collectionIdOrName: string;
    constructor(client: Client, collectionIdOrName: string);
    /**
     * @inheritdoc
     */
    get baseCrudPath(): string;
    /**
     * Returns the current collection service base path.
     */
    get baseCollectionPath(): string;
    // ---------------------------------------------------------------
    // Realtime handlers
    // ---------------------------------------------------------------
    /**
     * Subscribe to realtime changes to the specified topic ("*" or record id).
     *
     * If `topic` is the wildcard "*", then this method will subscribe to
     * any record changes in the collection.
     *
     * If `topic` is a record id, then this method will subscribe only
     * to changes of the specified record id.
     *
     * It's OK to subscribe multiple times to the same topic.
     * You can use the returned `UnsubscribeFunc` to remove only a single subscription.
     * Or use `unsubscribe(topic)` if you want to remove all subscriptions attached to the topic.
     */
    subscribe<T = M>(topic: string, callback: (data: RecordSubscription<T>) => void, options?: SendOptions): Promise<UnsubscribeFunc>;
    /**
     * Unsubscribe from all subscriptions of the specified topic
     * ("*" or record id).
     *
     * If `topic` is not set, then this method will unsubscribe from
     * all subscriptions associated to the current collection.
     */
    unsubscribe(topic?: string): Promise<void>;
    // ---------------------------------------------------------------
    // Crud handers
    // ---------------------------------------------------------------
    /**
     * @inheritdoc
     */
    getFullList<T = M>(options?: RecordFullListOptions): Promise<Array<T>>;
    /**
     * @inheritdoc
     */
    getFullList<T = M>(batch?: number, options?: RecordListOptions): Promise<Array<T>>;
    /**
     * @inheritdoc
     */
    getList<T = M>(page?: number, perPage?: number, options?: RecordListOptions): Promise<ListResult<T>>;
    /**
     * @inheritdoc
     */
    getFirstListItem<T = M>(filter: string, options?: RecordListOptions): Promise<T>;
    /**
     * @inheritdoc
     */
    getOne<T = M>(id: string, options?: RecordOptions): Promise<T>;
    /**
     * @inheritdoc
     */
    create<T = M>(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: RecordOptions): Promise<T>;
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.model` matches with the updated id, then
     * on success the `client.authStore.model` will be updated with the result.
     */
    update<T = M>(id: string, bodyParams?: {
        [key: string]: any;
    } | FormData, options?: RecordOptions): Promise<T>;
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.model` matches with the deleted id,
     * then on success the `client.authStore` will be cleared.
     */
    delete(id: string, options?: CommonOptions): Promise<boolean>;
    // ---------------------------------------------------------------
    // Auth handlers
    // ---------------------------------------------------------------
    /**
     * Prepare successful collection authorization response.
     */
    protected authResponse<T = M>(responseData: any): RecordAuthResponse<T>;
    /**
     * Returns all available collection auth methods.
     *
     * @throws {ClientResponseError}
     */
    listAuthMethods(options?: CommonOptions): Promise<AuthMethodsList>;
    /**
     * Authenticate a single auth collection record via its username/email and password.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     *
     * @throws {ClientResponseError}
     */
    authWithPassword<T = M>(usernameOrEmail: string, password: string, options?: RecordOptions): Promise<RecordAuthResponse<T>>;
    /**
     * @deprecated
     * Consider using authWithPassword(usernameOrEmail, password, options?).
     */
    authWithPassword<T = M>(usernameOrEmail: string, password: string, body?: any, query?: any): Promise<RecordAuthResponse<T>>;
    /**
     * Authenticate a single auth collection record with OAuth2 code.
     *
     * If you don't have an OAuth2 code you may also want to check `authWithOAuth2` method.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     * - the OAuth2 account data (eg. name, email, avatar, etc.)
     *
     * @throws {ClientResponseError}
     */
    authWithOAuth2Code<T = M>(provider: string, code: string, codeVerifier: string, redirectUrl: string, createData?: {
        [key: string]: any;
    }, options?: RecordOptions): Promise<RecordAuthResponse<T>>;
    /**
     * @deprecated
     * Consider using authWithOAuth2Code(provider, code, codeVerifier, redirectUrl, createdData, options?).
     */
    authWithOAuth2Code<T = M>(provider: string, code: string, codeVerifier: string, redirectUrl: string, createData?: {
        [key: string]: any;
    }, body?: any, query?: any): Promise<RecordAuthResponse<T>>;
    /**
     * @deprecated This form of authWithOAuth2 is deprecated.
     *
     * Please use `authWithOAuth2Code()` OR its simplified realtime version
     * as shown in https://pocketbase.io/docs/authentication/#oauth2-integration.
     */
    authWithOAuth2<T = M>(provider: string, code: string, codeVerifier: string, redirectUrl: string, createData?: {
        [key: string]: any;
    }, bodyParams?: {
        [key: string]: any;
    }, queryParams?: RecordOptions): Promise<RecordAuthResponse<T>>;
    /**
     * Authenticate a single auth collection record with OAuth2
     * **without custom redirects, deeplinks or even page reload**.
     *
     * This method initializes a one-off realtime subscription and will
     * open a popup window with the OAuth2 vendor page to authenticate.
     * Once the external OAuth2 sign-in/sign-up flow is completed, the popup
     * window will be automatically closed and the OAuth2 data sent back
     * to the user through the previously established realtime connection.
     *
     * You can specify an optional `urlCallback` prop to customize
     * the default url `window.open` behavior.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     * - the OAuth2 account data (eg. name, email, avatar, etc.)
     *
     * Example:
     *
     * ```js
     * const authData = await pb.collection("users").authWithOAuth2({
     *     provider: "google",
     * })
     * ```
     *
     * _Site-note_: when creating the OAuth2 app in the provider dashboard
     * you have to configure `https://yourdomain.com/api/oauth2-redirect`
     * as redirect URL.
     *
     * @throws {ClientResponseError}
     */
    authWithOAuth2<T = M>(options: OAuth2AuthConfig): Promise<RecordAuthResponse<T>>;
    /**
     * Refreshes the current authenticated record instance and
     * returns a new token and record data.
     *
     * On success this method also automatically updates the client's AuthStore.
     *
     * @throws {ClientResponseError}
     */
    authRefresh<T = M>(options?: RecordOptions): Promise<RecordAuthResponse<T>>;
    /**
     * @deprecated
     * Consider using authRefresh(options?).
     */
    authRefresh<T = M>(body?: any, query?: any): Promise<RecordAuthResponse<T>>;
    /**
     * Sends auth record password reset request.
     *
     * @throws {ClientResponseError}
     */
    requestPasswordReset(email: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using requestPasswordReset(email, options?).
     */
    requestPasswordReset(email: string, body?: any, query?: any): Promise<boolean>;
    /**
     * Confirms auth record password reset request.
     *
     * @throws {ClientResponseError}
     */
    confirmPasswordReset(passwordResetToken: string, password: string, passwordConfirm: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using confirmPasswordReset(passwordResetToken, password, passwordConfirm, options?).
     */
    confirmPasswordReset(passwordResetToken: string, password: string, passwordConfirm: string, body?: any, query?: any): Promise<boolean>;
    /**
     * Sends auth record verification email request.
     *
     * @throws {ClientResponseError}
     */
    requestVerification(email: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using requestVerification(email, options?).
     */
    requestVerification(email: string, body?: any, query?: any): Promise<boolean>;
    /**
     * Confirms auth record email verification request.
     *
     * @throws {ClientResponseError}
     */
    confirmVerification(verificationToken: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using confirmVerification(verificationToken, options?).
     */
    confirmVerification(verificationToken: string, body?: any, query?: any): Promise<boolean>;
    /**
     * Sends an email change request to the authenticated record model.
     *
     * @throws {ClientResponseError}
     */
    requestEmailChange(newEmail: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using requestEmailChange(newEmail, options?).
     */
    requestEmailChange(newEmail: string, body?: any, query?: any): Promise<boolean>;
    /**
     * Confirms auth record's new email address.
     *
     * @throws {ClientResponseError}
     */
    confirmEmailChange(emailChangeToken: string, password: string, options?: CommonOptions): Promise<boolean>;
    /**
     * @deprecated
     * Consider using confirmEmailChange(emailChangeToken, password, options?).
     */
    confirmEmailChange(emailChangeToken: string, password: string, body?: any, query?: any): Promise<boolean>;
    /**
     * Lists all linked external auth providers for the specified auth record.
     *
     * @throws {ClientResponseError}
     */
    listExternalAuths(recordId: string, options?: CommonOptions): Promise<Array<ExternalAuthModel>>;
    /**
     * Unlink a single external auth provider from the specified auth record.
     *
     * @throws {ClientResponseError}
     */
    unlinkExternalAuth(recordId: string, provider: string, options?: CommonOptions): Promise<boolean>;
    // ---------------------------------------------------------------
    // very rudimentary url query params replacement because at the moment
    // URL (and URLSearchParams) doesn't seem to be fully supported in React Native
    //
    // note: for details behind some of the decode/encode parsing check https://unixpapa.com/js/querystring.html
    private _replaceQueryParams;
}
declare class CollectionService extends CrudService<CollectionModel> {
    /**
     * @inheritdoc
     */
    get baseCrudPath(): string;
    /**
     * Imports the provided collections.
     *
     * If `deleteMissing` is `true`, all local collections and schema fields,
     * that are not present in the imported configuration, WILL BE DELETED
     * (including their related records data)!
     *
     * @throws {ClientResponseError}
     */
    import(collections: Array<CollectionModel>, deleteMissing?: boolean, options?: CommonOptions): Promise<true>;
}
interface HourlyStats {
    total: number;
    date: string;
}
declare class LogService extends BaseService {
    /**
     * Returns paginated logs list.
     *
     * @throws {ClientResponseError}
     */
    getList(page?: number, perPage?: number, options?: ListOptions): Promise<ListResult<LogModel>>;
    /**
     * Returns a single log by its id.
     *
     * If `id` is empty it will throw a 404 error.
     *
     * @throws {ClientResponseError}
     */
    getOne(id: string, options?: CommonOptions): Promise<LogModel>;
    /**
     * Returns logs statistics.
     *
     * @throws {ClientResponseError}
     */
    getStats(options?: LogStatsOptions): Promise<Array<HourlyStats>>;
}
interface HealthCheckResponse {
    code: number;
    message: string;
    data: {
        [key: string]: any;
    };
}
declare class HealthService extends BaseService {
    /**
     * Checks the health status of the api.
     *
     * @throws {ClientResponseError}
     */
    check(options?: CommonOptions): Promise<HealthCheckResponse>;
}
declare class FileService extends BaseService {
    /**
     * Builds and returns an absolute record file url for the provided filename.
     */
    getUrl(record: {
        [key: string]: any;
    }, filename: string, queryParams?: FileOptions): string;
    /**
     * Requests a new private file access token for the current auth model (admin or record).
     *
     * @throws {ClientResponseError}
     */
    getToken(options?: CommonOptions): Promise<string>;
}
interface BackupFileInfo {
    key: string;
    size: number;
    modified: string;
}
declare class BackupService extends BaseService {
    /**
     * Returns list with all available backup files.
     *
     * @throws {ClientResponseError}
     */
    getFullList(options?: CommonOptions): Promise<Array<BackupFileInfo>>;
    /**
     * Initializes a new backup.
     *
     * @throws {ClientResponseError}
     */
    create(basename: string, options?: CommonOptions): Promise<boolean>;
    /**
     * Uploads an existing backup file.
     *
     * Example:
     *
     * ```js
     * await pb.backups.upload({
     *     file: new Blob([...]),
     * });
     * ```
     *
     * @throws {ClientResponseError}
     */
    upload(bodyParams: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): Promise<boolean>;
    /**
     * Deletes a single backup file.
     *
     * @throws {ClientResponseError}
     */
    delete(key: string, options?: CommonOptions): Promise<boolean>;
    /**
     * Initializes an app data restore from an existing backup.
     *
     * @throws {ClientResponseError}
     */
    restore(key: string, options?: CommonOptions): Promise<boolean>;
    /**
     * Builds a download url for a single existing backup using an
     * admin file token and the backup file key.
     *
     * The file token can be generated via `pb.files.getToken()`.
     */
    getDownloadUrl(token: string, key: string): string;
}
interface BeforeSendResult {
    [key: string]: any;
    url?: string;
    options?: {
        [key: string]: any;
    };
}
/**
 * PocketBase JS Client.
 */
declare class Client {
    /**
     * The base PocketBase backend url address (eg. 'http://127.0.0.1.8090').
     */
    baseUrl: string;
    /**
     * Hook that get triggered right before sending the fetch request,
     * allowing you to inspect and modify the url and request options.
     *
     * For list of the possible options check https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
     *
     * You can return a non-empty result object `{ url, options }` to replace the url and request options entirely.
     *
     * Example:
     * ```js
     * client.beforeSend = function (url, options) {
     *     options.headers = Object.assign({}, options.headers, {
     *         'X-Custom-Header': 'example',
     *     });
     *
     *     return { url, options }
     * };
     * ```
     */
    beforeSend?: (url: string, options: SendOptions) => BeforeSendResult | Promise<BeforeSendResult>;
    /**
     * Hook that get triggered after successfully sending the fetch request,
     * allowing you to inspect/modify the response object and its parsed data.
     *
     * Returns the new Promise resolved `data` that will be returned to the client.
     *
     * Example:
     * ```js
     * client.afterSend = function (response, data) {
     *     if (response.status != 200) {
     *         throw new ClientResponseError({
     *             url:      response.url,
     *             status:   response.status,
     *             response: { ... },
     *         });
     *     }
     *
     *     return data;
     * };
     * ```
     */
    afterSend?: (response: Response, data: any) => any;
    /**
     * Optional language code (default to `en-US`) that will be sent
     * with the requests to the server as `Accept-Language` header.
     */
    lang: string;
    /**
     * A replaceable instance of the local auth store service.
     */
    authStore: BaseAuthStore;
    /**
     * An instance of the service that handles the **Settings APIs**.
     */
    readonly settings: SettingsService;
    /**
     * An instance of the service that handles the **Admin APIs**.
     */
    readonly admins: AdminService;
    /**
     * An instance of the service that handles the **Collection APIs**.
     */
    readonly collections: CollectionService;
    /**
     * An instance of the service that handles the **File APIs**.
     */
    readonly files: FileService;
    /**
     * An instance of the service that handles the **Log APIs**.
     */
    readonly logs: LogService;
    /**
     * An instance of the service that handles the **Realtime APIs**.
     */
    readonly realtime: RealtimeService;
    /**
     * An instance of the service that handles the **Health APIs**.
     */
    readonly health: HealthService;
    /**
     * An instance of the service that handles the **Backup APIs**.
     */
    readonly backups: BackupService;
    private cancelControllers;
    private recordServices;
    private enableAutoCancellation;
    constructor(baseUrl?: string, authStore?: BaseAuthStore | null, lang?: string);
    /**
     * Returns the RecordService associated to the specified collection.
     *
     * @param  {string} idOrName
     * @return {RecordService}
     */
    /**
     * Returns the RecordService associated to the specified collection.
     *
     * @param  {string} idOrName
     * @return {RecordService}
     */
    collection<M = RecordModel>(idOrName: string): RecordService<M>;
    /**
     * Globally enable or disable auto cancellation for pending duplicated requests.
     */
    /**
     * Globally enable or disable auto cancellation for pending duplicated requests.
     */
    autoCancellation(enable: boolean): Client;
    /**
     * Cancels single request by its cancellation key.
     */
    /**
     * Cancels single request by its cancellation key.
     */
    cancelRequest(requestKey: string): Client;
    /**
     * Cancels all pending requests.
     */
    /**
     * Cancels all pending requests.
     */
    cancelAllRequests(): Client;
    /**
     * Constructs a filter expression with placeholders populated from a parameters object.
     *
     * Placeholder parameters are defined with the `{:paramName}` notation.
     *
     * The following parameter values are supported:
     *
     * - `string` (_single quotes are autoescaped_)
     * - `number`
     * - `boolean`
     * - `Date` object (_stringified into the PocketBase datetime format_)
     * - `null`
     * - everything else is converted to a string using `JSON.stringify()`
     *
     * Example:
     *
     * ```js
     * pb.collection("example").getFirstListItem(pb.filter(
     *    'title ~ {:title} && created >= {:created}',
     *    { title: "example", created: new Date()}
     * ))
     * ```
     */
    /**
     * Constructs a filter expression with placeholders populated from a parameters object.
     *
     * Placeholder parameters are defined with the `{:paramName}` notation.
     *
     * The following parameter values are supported:
     *
     * - `string` (_single quotes are autoescaped_)
     * - `number`
     * - `boolean`
     * - `Date` object (_stringified into the PocketBase datetime format_)
     * - `null`
     * - everything else is converted to a string using `JSON.stringify()`
     *
     * Example:
     *
     * ```js
     * pb.collection("example").getFirstListItem(pb.filter(
     *    'title ~ {:title} && created >= {:created}',
     *    { title: "example", created: new Date()}
     * ))
     * ```
     */
    filter(raw: string, params?: {
        [key: string]: any;
    }): string;
    /**
     * Legacy alias of `pb.files.getUrl()`.
     */
    /**
     * Legacy alias of `pb.files.getUrl()`.
     */
    getFileUrl(record: {
        [key: string]: any;
    }, filename: string, queryParams?: FileOptions): string;
    /**
     * Builds a full client url by safely concatenating the provided path.
     */
    /**
     * Builds a full client url by safely concatenating the provided path.
     */
    buildUrl(path: string): string;
    /**
     * Sends an api http request.
     *
     * @throws {ClientResponseError}
     */
    /**
     * Sends an api http request.
     *
     * @throws {ClientResponseError}
     */
    send<T = any>(path: string, options: SendOptions): Promise<T>;
    /**
     * Shallow copy the provided object and takes care to initialize
     * any options required to preserve the backward compatability.
     *
     * @param  {SendOptions} options
     * @return {SendOptions}
     */
    /**
     * Shallow copy the provided object and takes care to initialize
     * any options required to preserve the backward compatability.
     *
     * @param  {SendOptions} options
     * @return {SendOptions}
     */
    private initSendOptions;
    /**
     * Converts analyzes the provided body and converts it to FormData
     * in case a plain object with File/Blob values is used.
     */
    /**
     * Converts analyzes the provided body and converts it to FormData
     * in case a plain object with File/Blob values is used.
     */
    private convertToFormDataIfNeeded;
    // @todo remove after PocketBase v0.21 and the @json field support
    private normalizeFormDataValue;
    /**
     * Checks if the submitted body object has at least one Blob/File field.
     */
    /**
     * Checks if the submitted body object has at least one Blob/File field.
     */
    private hasBlobField;
    /**
     * Extracts the header with the provided name in case-insensitive manner.
     * Returns `null` if no header matching the name is found.
     */
    /**
     * Extracts the header with the provided name in case-insensitive manner.
     * Returns `null` if no header matching the name is found.
     */
    private getHeader;
    /**
     * Loosely checks if the specified body is a FormData instance.
     */
    /**
     * Loosely checks if the specified body is a FormData instance.
     */
    private isFormData;
    /**
     * Serializes the provided query parameters into a query string.
     */
    /**
     * Serializes the provided query parameters into a query string.
     */
    private serializeQueryParams;
}
export { BeforeSendResult, Client as default };
