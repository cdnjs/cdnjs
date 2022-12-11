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
declare abstract class BaseModel {
    id: string;
    created: string;
    updated: string;
    constructor(data?: {
        [key: string]: any;
    });
    /**
     * Loads `data` into the current model.
     */
    load(data: {
        [key: string]: any;
    }): void;
    /**
     * Returns whether the current loaded data represent a stored db record.
     */
    get isNew(): boolean;
    /**
     * Robust deep clone of a model.
     */
    clone(): BaseModel;
    /**
     * Exports all model properties as a new plain object.
     */
    export(): {
        [key: string]: any;
    };
}
declare class Record extends BaseModel {
    [key: string]: any;
    "@collectionId": string;
    "@collectionName": string;
    "@expand": {
        [key: string]: any;
    };
    /**
     * @inheritdoc
     */
    load(data: {
        [key: string]: any;
    }): void;
}
declare class User extends BaseModel {
    email: string;
    verified: boolean;
    lastResetSentAt: string;
    lastVerificationSentAt: string;
    profile: null | Record;
    /**
     * @inheritdoc
     */
    load(data: {
        [key: string]: any;
    }): void;
}
declare class Admin extends BaseModel {
    avatar: number;
    email: string;
    lastResetSentAt: string;
    /**
     * @inheritdoc
     */
    load(data: {
        [key: string]: any;
    }): void;
}
type onChangeFunc = (token: string, model: User | Admin | null) => void;
/**
 * Base AuthStore class that is intended to be extended by all other
 * PocketBase AuthStore implementations.
 */
declare abstract class BaseAuthStore {
    protected baseToken: string;
    protected baseModel: User | Admin | null;
    private _onChangeCallbacks;
    /**
     * Retrieves the stored token (if any).
     */
    get token(): string;
    /**
     * Retrieves the stored model data (if any).
     */
    get model(): User | Admin | null;
    /**
     * Checks if the store has valid (aka. existing and unexpired) token.
     */
    get isValid(): boolean;
    /**
     * Saves the provided new token and model data in the auth store.
     */
    save(token: string, model: User | Admin | null): void;
    /**
     * Removes the stored token and model data form the auth store.
     */
    clear(): void;
    /**
     * Parses the provided cookie string and updates the store state
     * with the cookie's token and model data.
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
    onChange(callback: onChangeFunc, fireImmediately?: boolean): () => void;
    protected triggerChange(): void;
}
/**
 * BaseService class that should be inherited from all API services.
 */
declare abstract class BaseService {
    readonly client: Client;
    constructor(client: Client);
}
declare class Settings extends BaseService {
    /**
     * Fetch all available app settings.
     */
    getAll(queryParams?: {}): Promise<{
        [key: string]: any;
    }>;
    /**
     * Bulk updates app settings.
     */
    update(bodyParams?: {}, queryParams?: {}): Promise<{
        [key: string]: any;
    }>;
    /**
     * Performs a S3 storage connection test.
     */
    testS3(queryParams?: {}): Promise<boolean>;
    /**
     * Sends a test email.
     *
     * The possible `emailTemplate` values are:
     * - verification
     * - password-reset
     * - email-change
     */
    testEmail(toEmail: string, emailTemplate: string, queryParams?: {}): Promise<boolean>;
}
declare class ListResult<M extends BaseModel> {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: Array<M>;
    constructor(page: number, perPage: number, totalItems: number, totalPages: number, items: Array<M>);
}
declare abstract class BaseCrudService<M extends BaseModel> extends BaseService {
    /**
     * Response data decoder.
     */
    abstract decode(data: {
        [key: string]: any;
    }): M;
    /**
     * Returns a promise with all list items batch fetched at once.
     */
    protected _getFullList(basePath: string, batchSize?: number, queryParams?: {}): Promise<Array<M>>;
    /**
     * Returns paginated items list.
     */
    protected _getList(basePath: string, page?: number, perPage?: number, queryParams?: {}): Promise<ListResult<M>>;
    /**
     * Returns single item by its id.
     */
    protected _getOne(basePath: string, id: string, queryParams?: {}): Promise<M>;
    /**
     * Creates a new item.
     */
    protected _create(basePath: string, bodyParams?: {}, queryParams?: {}): Promise<M>;
    /**
     * Updates an existing item by its id.
     */
    protected _update(basePath: string, id: string, bodyParams?: {}, queryParams?: {}): Promise<M>;
    /**
     * Deletes an existing item by its id.
     */
    protected _delete(basePath: string, id: string, queryParams?: {}): Promise<boolean>;
}
declare abstract class CrudService<M extends BaseModel> extends BaseCrudService<M> {
    /**
     * Base path for the crud actions (without trailing slash, eg. '/admins').
     */
    abstract baseCrudPath(): string;
    /**
     * Returns a promise with all list items batch fetched at once.
     */
    getFullList(batchSize?: number, queryParams?: {}): Promise<Array<M>>;
    /**
     * Returns paginated items list.
     */
    getList(page?: number, perPage?: number, queryParams?: {}): Promise<ListResult<M>>;
    /**
     * Returns single item by its id.
     */
    getOne(id: string, queryParams?: {}): Promise<M>;
    /**
     * Creates a new item.
     */
    create(bodyParams?: {}, queryParams?: {}): Promise<M>;
    /**
     * Updates an existing item by its id.
     */
    update(id: string, bodyParams?: {}, queryParams?: {}): Promise<M>;
    /**
     * Deletes an existing item by its id.
     */
    delete(id: string, queryParams?: {}): Promise<boolean>;
}
type AdminAuthResponse = {
    [key: string]: any;
    token: string;
    admin: Admin;
};
declare class Admins extends CrudService<Admin> {
    /**
     * @inheritdoc
     */
    decode(data: {
        [key: string]: any;
    }): Admin;
    /**
     * @inheritdoc
     */
    baseCrudPath(): string;
    /**
     * Prepare successful authorize response.
     */
    protected authResponse(responseData: any): AdminAuthResponse;
    /**
     * Authenticate an admin account by its email and password
     * and returns a new admin token and data.
     *
     * On success this method automatically updates the client's AuthStore data.
     */
    authViaEmail(email: string, password: string, bodyParams?: {}, queryParams?: {}): Promise<AdminAuthResponse>;
    /**
     * Refreshes the current admin authenticated instance and
     * returns a new token and admin data.
     *
     * On success this method automatically updates the client's AuthStore data.
     */
    refresh(bodyParams?: {}, queryParams?: {}): Promise<AdminAuthResponse>;
    /**
     * Sends admin password reset request.
     */
    requestPasswordReset(email: string, bodyParams?: {}, queryParams?: {}): Promise<boolean>;
    /**
     * Confirms admin password reset request.
     */
    confirmPasswordReset(passwordResetToken: string, password: string, passwordConfirm: string, bodyParams?: {}, queryParams?: {}): Promise<AdminAuthResponse>;
}
declare class ExternalAuth extends BaseModel {
    userId: string;
    provider: string;
    providerId: string;
    /**
     * @inheritdoc
     */
    load(data: {
        [key: string]: any;
    }): void;
}
type UserAuthResponse = {
    [key: string]: any;
    token: string;
    user: User;
};
type AuthProviderInfo = {
    name: string;
    state: string;
    codeVerifier: string;
    codeChallenge: string;
    codeChallengeMethod: string;
    authUrl: string;
};
type AuthMethodsList = {
    [key: string]: any;
    emailPassword: boolean;
    authProviders: Array<AuthProviderInfo>;
};
declare class Users extends CrudService<User> {
    /**
     * @inheritdoc
     */
    decode(data: {
        [key: string]: any;
    }): User;
    /**
     * @inheritdoc
     */
    baseCrudPath(): string;
    /**
     * Prepare successful authorization response.
     */
    protected authResponse(responseData: any): UserAuthResponse;
    /**
     * Returns all available application auth methods.
     */
    listAuthMethods(queryParams?: {}): Promise<AuthMethodsList>;
    /**
     * Authenticate a user via its email and password.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - new user authentication token
     * - the authenticated user model record
     */
    authViaEmail(email: string, password: string, bodyParams?: {}, queryParams?: {}): Promise<UserAuthResponse>;
    /**
     * Authenticate a user via OAuth2 client provider.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - new user authentication token
     * - the authenticated user model record
     * - the OAuth2 user profile data (eg. name, email, avatar, etc.)
     */
    authViaOAuth2(provider: string, code: string, codeVerifier: string, redirectUrl: string, bodyParams?: {}, queryParams?: {}): Promise<UserAuthResponse>;
    /**
     * Refreshes the current user authenticated instance and
     * returns a new token and user data.
     *
     * On success this method also automatically updates the client's AuthStore data.
     */
    refresh(bodyParams?: {}, queryParams?: {}): Promise<UserAuthResponse>;
    /**
     * Sends user password reset request.
     */
    requestPasswordReset(email: string, bodyParams?: {}, queryParams?: {}): Promise<boolean>;
    /**
     * Confirms user password reset request.
     */
    confirmPasswordReset(passwordResetToken: string, password: string, passwordConfirm: string, bodyParams?: {}, queryParams?: {}): Promise<UserAuthResponse>;
    /**
     * Sends user verification email request.
     */
    requestVerification(email: string, bodyParams?: {}, queryParams?: {}): Promise<boolean>;
    /**
     * Confirms user email verification request.
     */
    confirmVerification(verificationToken: string, bodyParams?: {}, queryParams?: {}): Promise<UserAuthResponse>;
    /**
     * Sends an email change request to the authenticated user.
     */
    requestEmailChange(newEmail: string, bodyParams?: {}, queryParams?: {}): Promise<boolean>;
    /**
     * Confirms user new email address.
     */
    confirmEmailChange(emailChangeToken: string, password: string, bodyParams?: {}, queryParams?: {}): Promise<UserAuthResponse>;
    /**
     * Lists all linked external auth providers for the specified user.
     */
    listExternalAuths(userId: string, queryParams?: {}): Promise<Array<ExternalAuth>>;
    /**
     * Unlink a single external auth provider from the specified user.
     */
    unlinkExternalAuth(userId: string, provider: string, queryParams?: {}): Promise<boolean>;
}
declare class SchemaField {
    id: string;
    name: string;
    type: string;
    system: boolean;
    required: boolean;
    unique: boolean;
    options: {
        [key: string]: any;
    };
    constructor(data?: {
        [key: string]: any;
    });
    /**
     * Loads `data` into the field.
     */
    load(data: {
        [key: string]: any;
    }): void;
}
declare class Collection extends BaseModel {
    name: string;
    schema: Array<SchemaField>;
    system: boolean;
    listRule: null | string;
    viewRule: null | string;
    createRule: null | string;
    updateRule: null | string;
    deleteRule: null | string;
    /**
     * @inheritdoc
     */
    load(data: {
        [key: string]: any;
    }): void;
}
declare class Collections extends CrudService<Collection> {
    /**
     * @inheritdoc
     */
    decode(data: {
        [key: string]: any;
    }): Collection;
    /**
     * @inheritdoc
     */
    baseCrudPath(): string;
    /**
     * Imports the provided collections.
     *
     * If `deleteMissing` is `true`, all local collections and schema fields,
     * that are not present in the imported configuration, WILL BE DELETED
     * (including their related records data)!
     */
    import(collections: Array<Collection>, deleteMissing?: boolean, queryParams?: {}): Promise<true>;
}
declare abstract class SubCrudService<M extends BaseModel> extends BaseCrudService<M> {
    /**
     * Base path for the crud actions (without trailing slash, eg. '/collections/{:sub}/records').
     */
    abstract baseCrudPath(sub: string): string;
    /**
     * Returns a promise with all list items batch fetched at once.
     */
    getFullList(sub: string, batchSize?: number, queryParams?: {}): Promise<Array<M>>;
    /**
     * Returns paginated items list.
     */
    getList(sub: string, page?: number, perPage?: number, queryParams?: {}): Promise<ListResult<M>>;
    /**
     * Returns single item by its id.
     */
    getOne(sub: string, id: string, queryParams?: {}): Promise<M>;
    /**
     * Creates a new item.
     */
    create(sub: string, bodyParams?: {}, queryParams?: {}): Promise<M>;
    /**
     * Updates an existing item by its id.
     */
    update(sub: string, id: string, bodyParams?: {}, queryParams?: {}): Promise<M>;
    /**
     * Deletes an existing item by its id.
     */
    delete(sub: string, id: string, queryParams?: {}): Promise<boolean>;
}
declare class Records extends SubCrudService<Record> {
    /**
     * @inheritdoc
     */
    decode(data: {
        [key: string]: any;
    }): Record;
    /**
     * @inheritdoc
     */
    baseCrudPath(collectionIdOrName: string): string;
    /**
     * Builds and returns an absolute record file url.
     */
    getFileUrl(record: Record, filename: string, queryParams?: {}): string;
}
declare class LogRequest extends BaseModel {
    url: string;
    method: string;
    status: number;
    auth: string;
    remoteIp: string;
    userIp: string;
    referer: string;
    userAgent: string;
    meta: null | {
        [key: string]: any;
    };
    /**
     * @inheritdoc
     */
    load(data: {
        [key: string]: any;
    }): void;
}
type HourlyStats = {
    total: number;
    date: string;
};
declare class Logs extends BaseService {
    /**
     * Returns paginated logged requests list.
     */
    getRequestsList(page?: number, perPage?: number, queryParams?: {}): Promise<ListResult<LogRequest>>;
    /**
     * Returns a single logged request by its id.
     */
    getRequest(id: string, queryParams?: {}): Promise<LogRequest>;
    /**
     * Returns request logs statistics.
     */
    getRequestsStats(queryParams?: {}): Promise<Array<HourlyStats>>;
}
interface MessageData {
    [key: string]: any;
    action: string;
    record: Record;
}
interface SubscriptionFunc {
    (data: MessageData): void;
}
declare class Realtime extends BaseService {
    private clientId;
    private eventSource;
    private subscriptions;
    /**
     * Inits the sse connection (if not already) and register the subscription.
     */
    subscribe(subscription: string, callback: SubscriptionFunc): Promise<void>;
    /**
     * Unsubscribe from a subscription.
     *
     * If the `subscription` argument is not set,
     * then the client will unsubscribe from all registered subscriptions.
     *
     * The related sse connection will be autoclosed if after the
     * unsubscribe operations there are no active subscriptions left.
     */
    unsubscribe(subscription?: string): Promise<void>;
    private submitSubscriptions;
    private addSubscriptionListeners;
    private removeSubscriptionListeners;
    private connectHandler;
    private connect;
    private disconnect;
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
     * allowing you to inspect/modify the request config.
     *
     * Returns the new modified config that will be used to send the request.
     *
     * For list of the possible options check https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
     *
     * Example:
     * ```js
     * client.beforeSend = function (url, reqConfig) {
     *     reqConfig.headers = Object.assign({}, reqConfig.headers, {
     *         'X-Custom-Header': 'example',
     *     });
     *
     *     return reqConfig;
     * };
     * ```
     */
    beforeSend?: (url: string, reqConfig: {
        [key: string]: any;
    }) => {
        [key: string]: any;
    };
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
     *             data:     data,
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
    readonly settings: Settings;
    /**
     * An instance of the service that handles the **Admin APIs**.
     */
    readonly admins: Admins;
    /**
     * An instance of the service that handles the **User APIs**.
     */
    readonly users: Users;
    /**
     * An instance of the service that handles the **Collection APIs**.
     */
    readonly collections: Collections;
    /**
     * An instance of the service that handles the **Record APIs**.
     */
    readonly records: Records;
    /**
     * An instance of the service that handles the **Log APIs**.
     */
    readonly logs: Logs;
    /**
     * An instance of the service that handles the **Realtime APIs**.
     */
    readonly realtime: Realtime;
    private cancelControllers;
    constructor(baseUrl?: string, lang?: string, authStore?: BaseAuthStore | null);
    /**
     * @deprecated Legacy alias for `this.authStore`.
     */
    get AuthStore(): BaseAuthStore;
    /**
     * @deprecated Legacy alias for `this.settings`.
     */
    get Settings(): Settings;
    /**
     * @deprecated Legacy alias for `this.admins`.
     */
    get Admins(): Admins;
    /**
     * @deprecated Legacy alias for `this.users`.
     */
    get Users(): Users;
    /**
     * @deprecated Legacy alias for `this.collections`.
     */
    get Collections(): Collections;
    /**
     * @deprecated Legacy alias for `this.records`.
     */
    get Records(): Records;
    /**
     * @deprecated Legacy alias for `this.logs`.
     */
    get Logs(): Logs;
    /**
     * @deprecated Legacy alias for `this.realtime`.
     */
    get Realtime(): Realtime;
    /**
     * Cancels single request by its cancellation key.
     */
    /**
     * Cancels single request by its cancellation key.
     */
    cancelRequest(cancelKey: string): Client;
    /**
     * Cancels all pending requests.
     */
    /**
     * Cancels all pending requests.
     */
    cancelAllRequests(): Client;
    /**
     * Sends an api http request.
     */
    /**
     * Sends an api http request.
     */
    send(path: string, reqConfig: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Builds a full client url by safely concatenating the provided path.
     */
    /**
     * Builds a full client url by safely concatenating the provided path.
     */
    buildUrl(path: string): string;
    /**
     * Serializes the provided query parameters into a query string.
     */
    /**
     * Serializes the provided query parameters into a query string.
     */
    private serializeQueryParams;
}
export { Client as default };
