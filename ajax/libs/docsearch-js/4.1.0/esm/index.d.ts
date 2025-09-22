import { InsightsMethodMap as InsightsMethodMap$1, InsightsClient as InsightsClient$1 } from 'search-insights';
import React, { JSX } from 'react';

type Cache = {
    /**
     * Gets the value of the given `key`.
     */
    get: <TValue>(key: Record<string, any> | string, defaultValue: () => Promise<TValue>, events?: CacheEvents<TValue> | undefined) => Promise<TValue>;
    /**
     * Sets the given value with the given `key`.
     */
    set: <TValue>(key: Record<string, any> | string, value: TValue) => Promise<TValue>;
    /**
     * Deletes the given `key`.
     */
    delete: (key: Record<string, any> | string) => Promise<void>;
    /**
     * Clears the cache.
     */
    clear: () => Promise<void>;
};
type CacheEvents<TValue> = {
    /**
     * The callback when the given `key` is missing from the cache.
     */
    miss: (value: TValue) => Promise<any>;
};

type Host = {
    /**
     * The host URL.
     */
    url: string;
    /**
     * The accepted transporter.
     */
    accept: 'read' | 'readWrite' | 'write';
    /**
     * The protocol of the host URL.
     */
    protocol: 'http' | 'https';
    /**
     * The port of the host URL.
     */
    port?: number | undefined;
};
type Logger = {
    /**
     * Logs debug messages.
     */
    debug: (message: string, args?: any | undefined) => Promise<void>;
    /**
     * Logs info messages.
     */
    info: (message: string, args?: any | undefined) => Promise<void>;
    /**
     * Logs error messages.
     */
    error: (message: string, args?: any | undefined) => Promise<void>;
};

type Headers = Record<string, string>;
type QueryParameters = Record<string, any>;
/**
 * The method of the request.
 */
type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
type Request = {
    method: Method;
    /**
     * The path of the REST API to send the request to.
     */
    path: string;
    queryParameters: QueryParameters;
    data?: Array<Record<string, any>> | Record<string, any> | undefined;
    headers: Headers;
    /**
     * If the given request should persist on the cache. Keep in mind,
     * that some methods may have this option enabled by default.
     */
    cacheable?: boolean | undefined;
    /**
     * Some POST methods in the Algolia REST API uses the `read` transporter.
     * This information is defined at the spec level.
     */
    useReadTransporter?: boolean | undefined;
};
type EndRequest = Pick<Request, 'headers' | 'method'> & {
    /**
     * The full URL of the REST API.
     */
    url: string;
    /**
     * The connection timeout, in milliseconds.
     */
    connectTimeout: number;
    /**
     * The response timeout, in milliseconds.
     */
    responseTimeout: number;
    data?: string | undefined;
};
type Response = {
    /**
     * The body of the response.
     */
    content: string;
    /**
     * Whether the API call is timed out or not.
     */
    isTimedOut: boolean;
    /**
     * The HTTP status code of the response.
     */
    status: number;
};
type Requester = {
    /**
     * Sends the given `request` to the server.
     */
    send: (request: EndRequest) => Promise<Response>;
};

type RequestOptions = Pick<Request, 'cacheable'> & {
    /**
     * Custom timeout for the request. Note that, in normal situations
     * the given timeout will be applied. But the transporter layer may
     * increase this timeout if there is need for it.
     */
    timeouts?: Partial<Timeouts> | undefined;
    /**
     * Custom headers for the request. This headers are
     * going to be merged the transporter headers.
     */
    headers?: Headers | undefined;
    /**
     * Custom query parameters for the request. This query parameters are
     * going to be merged the transporter query parameters.
     */
    queryParameters?: QueryParameters | undefined;
    /**
     * Custom data for the request. This data is
     * going to be merged the transporter data.
     */
    data?: Array<Record<string, any>> | Record<string, any> | undefined;
};
type AlgoliaAgentOptions = {
    /**
     * The segment. Usually the integration name.
     */
    segment: string;
    /**
     * The version. Usually the integration version.
     */
    version?: string | undefined;
};
type AlgoliaAgent = {
    /**
     * The raw value of the user agent.
     */
    value: string;
    /**
     * Mutates the current user agent adding the given user agent options.
     */
    add: (options: AlgoliaAgentOptions) => AlgoliaAgent;
};
type Timeouts = {
    /**
     * Timeout in milliseconds before the connection is established.
     */
    connect: number;
    /**
     * Timeout in milliseconds before reading the response on a read request.
     */
    read: number;
    /**
     * Timeout in milliseconds before reading the response on a write request.
     */
    write: number;
};
type TransporterOptions = {
    /**
     * The cache of the hosts. Usually used to persist
     * the state of the host when its down.
     */
    hostsCache: Cache;
    /**
     * The logger instance to send events of the transporter.
     */
    logger: Logger;
    /**
     * The underlying requester used. Should differ
     * depending of the environment where the client
     * will be used.
     */
    requester: Requester;
    /**
     * The cache of the requests. When requests are
     * `cacheable`, the returned promised persists
     * in this cache to shared in similar requests
     * before being resolved.
     */
    requestsCache: Cache;
    /**
     * The cache of the responses. When requests are
     * `cacheable`, the returned responses persists
     * in this cache to shared in similar requests.
     */
    responsesCache: Cache;
    /**
     * The timeouts used by the requester. The transporter
     * layer may increase this timeouts as defined on the
     * retry strategy.
     */
    timeouts: Timeouts;
    /**
     * The hosts used by the requester.
     */
    hosts: Host[];
    /**
     * The headers used by the requester. The transporter
     * layer may add some extra headers during the request
     * for the user agent, and others.
     */
    baseHeaders: Headers;
    /**
     * The query parameters used by the requester. The transporter
     * layer may add some extra headers during the request
     * for the user agent, and others.
     */
    baseQueryParameters: QueryParameters;
    /**
     * The user agent used. Sent on query parameters.
     */
    algoliaAgent: AlgoliaAgent;
};
type Transporter = TransporterOptions & {
    /**
     * Performs a request.
     * The `baseRequest` and `baseRequestOptions` will be merged accordingly.
     */
    request: <TResponse>(baseRequest: Request, baseRequestOptions?: RequestOptions) => Promise<TResponse>;
};

type AuthMode = 'WithinHeaders' | 'WithinQueryParameters';
type OverriddenTransporterOptions = 'baseHeaders' | 'baseQueryParameters' | 'hosts';
type CreateClientOptions = Omit<TransporterOptions, OverriddenTransporterOptions | 'algoliaAgent'> & Partial<Pick<TransporterOptions, OverriddenTransporterOptions>> & {
    appId: string;
    apiKey: string;
    authMode?: AuthMode | undefined;
    algoliaAgents: AlgoliaAgentOptions[];
};
type ClientOptions = Partial<Omit<CreateClientOptions, 'apiKey' | 'appId'>>;

type IterableOptions<TResponse> = Partial<{
    /**
     * The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     */
    aggregator: (response: TResponse) => unknown | PromiseLike<unknown>;
    /**
     * The `validate` condition to throw an error and its message.
     */
    error: {
        /**
         * The function to validate the error condition.
         */
        validate: (response: TResponse) => boolean | PromiseLike<boolean>;
        /**
         * The error message to throw.
         */
        message: (response: TResponse) => string | PromiseLike<string>;
    };
    /**
     * The function to decide how long to wait between iterations.
     */
    timeout: () => number | PromiseLike<number>;
}>;
type CreateIterablePromise<TResponse> = IterableOptions<TResponse> & {
    /**
     * The function to run, which returns a promise.
     *
     * The `previousResponse` parameter (`undefined` on the first call) allows you to build your request with incremental logic, to iterate on `page` or `cursor` for example.
     */
    func: (previousResponse?: TResponse | undefined) => Promise<TResponse>;
    /**
     * The validator function. It receive the resolved return of the API call.
     */
    validate: (response: TResponse) => boolean | PromiseLike<boolean>;
};

type AddApiKeyResponse = {
    /**
     * API key.
     */
    key: string;
    /**
     * Date and time when the object was created, in RFC 3339 format.
     */
    createdAt: string;
};

/**
 * Access control list permissions.
 */
type Acl = 'addObject' | 'analytics' | 'browse' | 'deleteObject' | 'deleteIndex' | 'editSettings' | 'inference' | 'listIndexes' | 'logs' | 'personalization' | 'recommendation' | 'search' | 'seeUnretrievableAttributes' | 'settings' | 'usage';

/**
 * API key object.
 */
type ApiKey = {
    /**
     * Permissions that determine the type of API requests this key can make. The required ACL is listed in each endpoint\'s reference. For more information, see [access control list](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).
     */
    acl: Array<Acl>;
    /**
     * Description of an API key to help you identify this API key.
     */
    description?: string | undefined;
    /**
     * Index names or patterns that this API key can access. By default, an API key can access all indices in the same application.  You can use leading and trailing wildcard characters (`*`):  - `dev_*` matches all indices starting with \"dev_\". - `*_dev` matches all indices ending with \"_dev\". - `*_products_*` matches all indices containing \"_products_\".
     */
    indexes?: Array<string> | undefined;
    /**
     * Maximum number of results this API key can retrieve in one query. By default, there\'s no limit.
     */
    maxHitsPerQuery?: number | undefined;
    /**
     * Maximum number of API requests allowed per IP address or [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/) per hour.  If this limit is reached, the API returns an error with status code `429`. By default, there\'s no limit.
     */
    maxQueriesPerIPPerHour?: number | undefined;
    /**
     * Query parameters to add when making API requests with this API key.  To restrict this API key to specific IP addresses, add the `restrictSources` parameter. You can only add a single source, but you can provide a range of IP addresses.  Creating an API key fails if the request is made from an IP address outside the restricted range.
     */
    queryParameters?: string | undefined;
    /**
     * Allowed HTTP referrers for this API key.  By default, all referrers are allowed. You can use leading and trailing wildcard characters (`*`):  - `https://algolia.com/_*` allows all referrers starting with \"https://algolia.com/\" - `*.algolia.com` allows all referrers ending with \".algolia.com\" - `*algolia.com*` allows all referrers in the domain \"algolia.com\".  Like all HTTP headers, referrers can be spoofed. Don\'t rely on them to secure your data. For more information, see [HTTP referrer restrictions](https://www.algolia.com/doc/guides/security/security-best-practices/#http-referrers-restrictions).
     */
    referers?: Array<string> | undefined;
    /**
     * Duration (in seconds) after which the API key expires. By default, API keys don\'t expire.
     */
    validity?: number | undefined;
};

/**
 * Which indexing operation to perform:  - `addObject`: adds records to an index.    Equivalent to the \"Add a new record (with auto-generated object ID)\" operation. - `updateObject`: adds or replaces records in an index.    Equivalent to the \"Add or replace a record\" operation. - `partialUpdateObject`: adds or updates attributes within records.    Equivalent to the \"Add or update attributes\" operation with the `createIfNoExists` parameter set to true.    (If a record with the specified `objectID` doesn\'t exist in the specified index, this action creates adds the record to the index) - `partialUpdateObjectNoCreate`: same as `partialUpdateObject`, but with `createIfNoExists` set to false.    (A record isn\'t added to the index if its `objectID` doesn\'t exist) - `deleteObject`: delete records from an index.   Equivalent to the \"Delete a record\" operation. - `delete`. Delete an index. Equivalent to the \"Delete an index\" operation. - `clear`: delete all records from an index. Equivalent to the \"Delete all records from an index operation\".
 */
type Action = 'addObject' | 'updateObject' | 'partialUpdateObject' | 'partialUpdateObjectNoCreate' | 'deleteObject' | 'delete' | 'clear';

type MultipleBatchRequest = {
    action: Action;
    /**
     * Operation arguments (varies with specified `action`).
     */
    body?: Record<string, unknown> | undefined;
    /**
     * Index name (case-sensitive).
     */
    indexName: string;
};

/**
 * Batch parameters.
 */
type BatchParams = {
    requests: Array<MultipleBatchRequest>;
};

type BatchResponse = {
    /**
     * Unique identifier of a task.  A successful API response means that a task was added to a queue. It might not run immediately. You can check the task\'s progress with the [`task` operation](#tag/Indices/operation/getTask) and this `taskID`.
     */
    taskID: number;
    /**
     * Unique record identifiers.
     */
    objectIDs: Array<string>;
};

/**
 * Whether certain properties of the search response are calculated exhaustive (exact) or approximated.
 */
type Exhaustive$1 = {
    /**
     * Whether the facet count is exhaustive (`true`) or approximate (`false`). See the [related discussion](https://support.algolia.com/hc/en-us/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate-).
     */
    facetsCount?: boolean | undefined;
    /**
     * The value is `false` if not all facet values are retrieved.
     */
    facetValues?: boolean | undefined;
    /**
     * Whether the `nbHits` is exhaustive (`true`) or approximate (`false`). When the query takes more than 50ms to be processed, the engine makes an approximation. This can happen when using complex filters on millions of records, when typo-tolerance was not exhaustive, or when enough hits have been retrieved (for example, after the engine finds 10,000 exact matches). `nbHits` is reported as non-exhaustive whenever an approximation is made, even if the approximation didn’t, in the end, impact the exhaustivity of the query.
     */
    nbHits?: boolean | undefined;
    /**
     * Rules matching exhaustivity. The value is `false` if rules were enable for this query, and could not be fully processed due a timeout. This is generally caused by the number of alternatives (such as typos) which is too large.
     */
    rulesMatch?: boolean | undefined;
    /**
     * Whether the typo search was exhaustive (`true`) or approximate (`false`). An approximation is done when the typo search query part takes more than 10% of the query budget (ie. 5ms by default) to be processed (this can happen when a lot of typo alternatives exist for the query). This field will not be included when typo-tolerance is entirely disabled.
     */
    typo?: boolean | undefined;
};

type FacetStats$1 = {
    /**
     * Minimum value in the results.
     */
    min?: number | undefined;
    /**
     * Maximum value in the results.
     */
    max?: number | undefined;
    /**
     * Average facet value in the results.
     */
    avg?: number | undefined;
    /**
     * Sum of all values in the results.
     */
    sum?: number | undefined;
};

/**
 * Redirect rule data.
 */
type RedirectRuleIndexData$1 = {
    ruleObjectID: string;
};

type RedirectRuleIndexMetadata$1 = {
    /**
     * Source index for the redirect rule.
     */
    source: string;
    /**
     * Destination index for the redirect rule.
     */
    dest: string;
    /**
     * Reason for the redirect rule.
     */
    reason: string;
    /**
     * Redirect rule status.
     */
    succeed: boolean;
    data: RedirectRuleIndexData$1;
};

/**
 * [Redirect results to a URL](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/redirects/), this this parameter is for internal use only.
 */
type Redirect$1 = {
    index?: Array<RedirectRuleIndexMetadata$1> | undefined;
};

/**
 * Order of facet names.
 */
type Facets = {
    /**
     * Explicit order of facets or facet values.  This setting lets you always show specific facets or facet values at the top of the list.
     */
    order?: Array<string> | undefined;
};

/**
 * Order of facet values that aren\'t explicitly positioned with the `order` setting.  - `count`.   Order remaining facet values by decreasing count.   The count is the number of matching records containing this facet value.  - `alpha`.   Sort facet values alphabetically.  - `hidden`.   Don\'t show facet values that aren\'t explicitly positioned.
 */
type SortRemainingBy$1 = 'count' | 'alpha' | 'hidden';

type Value$1 = {
    /**
     * Explicit order of facets or facet values.  This setting lets you always show specific facets or facet values at the top of the list.
     */
    order?: Array<string> | undefined;
    sortRemainingBy?: SortRemainingBy$1 | undefined;
    /**
     * Hide facet values.
     */
    hide?: Array<string> | undefined;
};

/**
 * Order of facet names and facet values in your UI.
 */
type FacetOrdering$1 = {
    facets?: Facets | undefined;
    /**
     * Order of facet values. One object for each facet.
     */
    values?: {
        [key: string]: Value$1;
    } | undefined;
};

/**
 * The redirect rule container.
 */
type RedirectURL$1 = {
    url?: string | undefined;
};

/**
 * URL for an image to show inside a banner.
 */
type BannerImageUrl$1 = {
    url?: string | undefined;
};

/**
 * Image to show inside a banner.
 */
type BannerImage$1 = {
    urls?: Array<BannerImageUrl$1> | undefined;
    title?: string | undefined;
};

/**
 * Link for a banner defined in the Merchandising Studio.
 */
type BannerLink$1 = {
    url?: string | undefined;
};

/**
 * Banner with image and link to redirect users.
 */
type Banner$1 = {
    image?: BannerImage$1 | undefined;
    link?: BannerLink$1 | undefined;
};

/**
 * Widgets returned from any rules that are applied to the current search.
 */
type Widgets$1 = {
    /**
     * Banners defined in the Merchandising Studio for a given search.
     */
    banners?: Array<Banner$1> | undefined;
};

/**
 * Extra data that can be used in the search UI.  You can use this to control aspects of your search UI, such as the order of facet names and values without changing your frontend code.
 */
type RenderingContent$1 = {
    facetOrdering?: FacetOrdering$1 | undefined;
    redirect?: RedirectURL$1 | undefined;
    widgets?: Widgets$1 | undefined;
};

type BaseSearchResponse$1 = Record<string, any> & {
    /**
     * A/B test ID. This is only included in the response for indices that are part of an A/B test.
     */
    abTestID?: number | undefined;
    /**
     * Variant ID. This is only included in the response for indices that are part of an A/B test.
     */
    abTestVariantID?: number | undefined;
    /**
     * Computed geographical location.
     */
    aroundLatLng?: string | undefined;
    /**
     * Distance from a central coordinate provided by `aroundLatLng`.
     */
    automaticRadius?: string | undefined;
    exhaustive?: Exhaustive$1 | undefined;
    /**
     * Rules applied to the query.
     */
    appliedRules?: Array<Record<string, unknown>> | undefined;
    /**
     * See the `facetsCount` field of the `exhaustive` object in the response.
     */
    exhaustiveFacetsCount?: boolean | undefined;
    /**
     * See the `nbHits` field of the `exhaustive` object in the response.
     */
    exhaustiveNbHits?: boolean | undefined;
    /**
     * See the `typo` field of the `exhaustive` object in the response.
     */
    exhaustiveTypo?: boolean | undefined;
    /**
     * Facet counts.
     */
    facets?: {
        [key: string]: {
            [key: string]: number;
        };
    } | undefined;
    /**
     * Statistics for numerical facets.
     */
    facets_stats?: {
        [key: string]: FacetStats$1;
    } | undefined;
    /**
     * Index name used for the query.
     */
    index?: string | undefined;
    /**
     * Index name used for the query. During A/B testing, the targeted index isn\'t always the index used by the query.
     */
    indexUsed?: string | undefined;
    /**
     * Warnings about the query.
     */
    message?: string | undefined;
    /**
     * Number of hits selected and sorted by the relevant sort algorithm.
     */
    nbSortedHits?: number | undefined;
    /**
     * Post-[normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/#what-does-normalization-mean) query string that will be searched.
     */
    parsedQuery?: string | undefined;
    /**
     * Time the server took to process the request, in milliseconds.
     */
    processingTimeMS?: number | undefined;
    /**
     * Experimental. List of processing steps and their times, in milliseconds. You can use this list to investigate performance issues.
     */
    processingTimingsMS?: Record<string, unknown> | undefined;
    /**
     * Markup text indicating which parts of the original query have been removed to retrieve a non-empty result set.
     */
    queryAfterRemoval?: string | undefined;
    redirect?: Redirect$1 | undefined;
    renderingContent?: RenderingContent$1 | undefined;
    /**
     * Time the server took to process the request, in milliseconds.
     */
    serverTimeMS?: number | undefined;
    /**
     * Host name of the server that processed the request.
     */
    serverUsed?: string | undefined;
    /**
     * An object with custom data.  You can store up to 32kB as custom data.
     */
    userData?: any | null | undefined;
    /**
     * Unique identifier for the query. This is used for [click analytics](https://www.algolia.com/doc/guides/analytics/click-analytics/).
     */
    queryID?: string | undefined;
    /**
     * Whether automatic events collection is enabled for the application.
     */
    _automaticInsights?: boolean | undefined;
};

type BrowsePagination = {
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Number of results (hits).
     */
    nbHits?: number | undefined;
    /**
     * Number of pages of results.
     */
    nbPages?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
};

type Cursor = {
    /**
     * Cursor to get the next page of the response.  The parameter must match the value returned in the response of a previous request. The last page of the response does not return a `cursor` attribute.
     */
    cursor?: string | undefined;
};

/**
 * Whether the whole query string matches or only a part.
 */
type MatchLevel$1 = 'none' | 'partial' | 'full';

/**
 * Surround words that match the query with HTML tags for highlighting.
 */
type HighlightResultOption$1 = {
    /**
     * Highlighted attribute value, including HTML tags.
     */
    value: string;
    matchLevel: MatchLevel$1;
    /**
     * List of matched words from the search query.
     */
    matchedWords: Array<string>;
    /**
     * Whether the entire attribute value is highlighted.
     */
    fullyHighlighted?: boolean | undefined;
};

type HighlightResult$1 = HighlightResultOption$1 | {
    [key: string]: HighlightResult$1;
} | Array<HighlightResult$1>;

type MatchedGeoLocation$1 = {
    /**
     * Latitude of the matched location.
     */
    lat?: number | undefined;
    /**
     * Longitude of the matched location.
     */
    lng?: number | undefined;
    /**
     * Distance between the matched location and the search location (in meters).
     */
    distance?: number | undefined;
};

type Personalization$1 = {
    /**
     * The score of the filters.
     */
    filtersScore?: number | undefined;
    /**
     * The score of the ranking.
     */
    rankingScore?: number | undefined;
    /**
     * The score of the event.
     */
    score?: number | undefined;
};

/**
 * Object with detailed information about the record\'s ranking.
 */
type RankingInfo$1 = {
    /**
     * Whether a filter matched the query.
     */
    filters?: number | undefined;
    /**
     * Position of the first matched word in the best matching attribute of the record.
     */
    firstMatchedWord: number;
    /**
     * Distance between the geo location in the search query and the best matching geo location in the record, divided by the geo precision (in meters).
     */
    geoDistance: number;
    /**
     * Precision used when computing the geo distance, in meters.
     */
    geoPrecision?: number | undefined;
    matchedGeoLocation?: MatchedGeoLocation$1 | undefined;
    personalization?: Personalization$1 | undefined;
    /**
     * Number of exactly matched words.
     */
    nbExactWords: number;
    /**
     * Number of typos encountered when matching the record.
     */
    nbTypos: number;
    /**
     * Whether the record was promoted by a rule.
     */
    promoted?: boolean | undefined;
    /**
     * Number of words between multiple matches in the query plus 1. For single word queries, `proximityDistance` is 0.
     */
    proximityDistance?: number | undefined;
    /**
     * Overall ranking of the record, expressed as a single integer. This attribute is internal.
     */
    userScore: number;
    /**
     * Number of matched words.
     */
    words?: number | undefined;
    /**
     * Whether the record is re-ranked.
     */
    promotedByReRanking?: boolean | undefined;
};

/**
 * Snippets that show the context around a matching search query.
 */
type SnippetResultOption$1 = {
    /**
     * Highlighted attribute value, including HTML tags.
     */
    value: string;
    matchLevel: MatchLevel$1;
};

type SnippetResult$1 = SnippetResultOption$1 | {
    [key: string]: SnippetResult$1;
} | Array<SnippetResult$1>;

/**
 * Search result.  A hit is a record from your index, augmented with special attributes for highlighting, snippeting, and ranking.
 */
type Hit$1<T = Record<string, unknown>> = T & {
    /**
     * Unique record identifier.
     */
    objectID: string;
    /**
     * Surround words that match the query with HTML tags for highlighting.
     */
    _highlightResult?: {
        [key: string]: HighlightResult$1;
    } | undefined;
    /**
     * Snippets that show the context around a matching search query.
     */
    _snippetResult?: {
        [key: string]: SnippetResult$1;
    } | undefined;
    _rankingInfo?: RankingInfo$1 | undefined;
    _distinctSeqID?: number | undefined;
};

type SearchHits$1<T = Record<string, unknown>> = Record<string, any> & {
    /**
     * Search results (hits).  Hits are records from your index that match the search criteria, augmented with additional attributes, such as, for highlighting.
     */
    hits: Hit$1<T>[];
    /**
     * Search query.
     */
    query: string;
    /**
     * URL-encoded string of all search parameters.
     */
    params: string;
};

type BrowseResponse<T = Record<string, unknown>> = BaseSearchResponse$1 & BrowsePagination & SearchHits$1<T> & Cursor;

/**
 * Response and creation timestamp.
 */
type CreatedAtResponse = {
    /**
     * Date and time when the object was created, in RFC 3339 format.
     */
    createdAt: string;
};

type DeleteApiKeyResponse = {
    /**
     * Date and time when the object was deleted, in RFC 3339 format.
     */
    deletedAt: string;
};

type DeleteSourceResponse = {
    /**
     * Date and time when the object was deleted, in RFC 3339 format.
     */
    deletedAt: string;
};

/**
 * Response, taskID, and deletion timestamp.
 */
type DeletedAtResponse = {
    /**
     * Unique identifier of a task.  A successful API response means that a task was added to a queue. It might not run immediately. You can check the task\'s progress with the [`task` operation](#tag/Indices/operation/getTask) and this `taskID`.
     */
    taskID: number;
    /**
     * Date and time when the object was deleted, in RFC 3339 format.
     */
    deletedAt: string;
};

/**
 * Key-value pairs of [supported language ISO codes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/) and boolean values.
 */
type StandardEntries = {
    /**
     * Key-value pair of a language ISO code and a boolean value.
     */
    plurals?: {
        [key: string]: boolean;
    } | null | undefined;
    /**
     * Key-value pair of a language ISO code and a boolean value.
     */
    stopwords?: {
        [key: string]: boolean;
    } | null | undefined;
    /**
     * Key-value pair of a language ISO code and a boolean value.
     */
    compounds?: {
        [key: string]: boolean;
    } | null | undefined;
};

/**
 * Turn on or off the built-in Algolia stop words for a specific language.
 */
type DictionarySettingsParams = {
    disableStandardEntries: StandardEntries;
};

type BaseGetApiKeyResponse = {
    /**
     * API key.
     */
    value: string;
    /**
     * Timestamp when the object was created, in milliseconds since the Unix epoch.
     */
    createdAt: number;
};

type GetApiKeyResponse = BaseGetApiKeyResponse & ApiKey;

type GetDictionarySettingsResponse = {
    disableStandardEntries: StandardEntries;
};

type LogQuery = {
    /**
     * Index targeted by the query.
     */
    index_name?: string | undefined;
    /**
     * A user identifier.
     */
    user_token?: string | undefined;
    /**
     * Unique query identifier.
     */
    query_id?: string | undefined;
};

type Log = {
    /**
     * Date and time of the API request, in RFC 3339 format.
     */
    timestamp: string;
    /**
     * HTTP method of the request.
     */
    method: string;
    /**
     * HTTP status code of the response.
     */
    answer_code: string;
    /**
     * Request body.
     */
    query_body: string;
    /**
     * Response body.
     */
    answer: string;
    /**
     * URL of the API endpoint.
     */
    url: string;
    /**
     * IP address of the client that performed the request.
     */
    ip: string;
    /**
     * Request headers (API keys are obfuscated).
     */
    query_headers: string;
    /**
     * SHA1 signature of the log entry.
     */
    sha1: string;
    /**
     * Number of API requests.
     */
    nb_api_calls?: string | undefined;
    /**
     * Processing time for the query in milliseconds. This doesn\'t include latency due to the network.
     */
    processing_time_ms: string;
    /**
     * Index targeted by the query.
     */
    index?: string | undefined;
    /**
     * Query parameters sent with the request.
     */
    query_params?: string | undefined;
    /**
     * Number of search results (hits) returned for the query.
     */
    query_nb_hits?: string | undefined;
    /**
     * Queries performed for the given request.
     */
    inner_queries?: Array<LogQuery> | undefined;
};

type GetLogsResponse = {
    logs: Array<Log>;
};

/**
 * Request body for retrieving records.
 */
type GetObjectsRequest = {
    /**
     * Attributes to retrieve. If not specified, all retrievable attributes are returned.
     */
    attributesToRetrieve?: Array<string> | undefined;
    /**
     * Object ID for the record to retrieve.
     */
    objectID: string;
    /**
     * Index from which to retrieve the records.
     */
    indexName: string;
};

/**
 * Request parameters.
 */
type GetObjectsParams = {
    requests: Array<GetObjectsRequest>;
};

type GetObjectsResponse<T = Record<string, unknown>> = {
    /**
     * An optional status message.
     */
    message?: string | undefined;
    /**
     * Retrieved records.
     */
    results: T[];
};

/**
 * Task status, `published` if the task is completed, `notPublished` otherwise.
 */
type TaskStatus = 'published' | 'notPublished';

type GetTaskResponse = {
    status: TaskStatus;
};

/**
 * Unique user ID.
 */
type UserId = {
    /**
     * Unique identifier of the user who makes the search request.
     */
    userID: string;
    /**
     * Cluster to which the user is assigned.
     */
    clusterName: string;
    /**
     * Number of records belonging to the user.
     */
    nbRecords: number;
    /**
     * Data size used by the user.
     */
    dataSize: number;
};

/**
 * User IDs and clusters.
 */
type GetTopUserIdsResponse = {
    /**
     * Key-value pairs with cluster names as keys and lists of users with the highest number of records per cluster as values.
     */
    topUsers: Array<{
        [key: string]: Array<UserId>;
    }>;
};

type HasPendingMappingsResponse = {
    /**
     * Whether there are clusters undergoing migration, creation, or deletion.
     */
    pending: boolean;
    /**
     * Cluster pending mapping state: migrating, creating, deleting.
     */
    clusters?: {
        [key: string]: Array<string>;
    } | undefined;
};

/**
 * Dictionary type. If `null`, this dictionary type isn\'t supported for the language.
 */
type DictionaryLanguage = {
    /**
     * Number of custom dictionary entries.
     */
    nbCustomEntries?: number | undefined;
};

/**
 * Dictionary language.
 */
type Languages = {
    plurals: DictionaryLanguage | null;
    stopwords: DictionaryLanguage | null;
    compounds: DictionaryLanguage | null;
};

type ListApiKeysResponse = {
    /**
     * API keys.
     */
    keys: Array<GetApiKeyResponse>;
};

/**
 * Clusters.
 */
type ListClustersResponse = {
    /**
     * Key-value pairs with cluster names as keys and lists of users with the highest number of records per cluster as values.
     */
    topUsers: Array<string>;
};

type FetchedIndex = {
    /**
     * Index name.
     */
    name: string;
    /**
     * Index creation date. An empty string means that the index has no records.
     */
    createdAt: string;
    /**
     * Date and time when the object was updated, in RFC 3339 format.
     */
    updatedAt: string;
    /**
     * Number of records contained in the index.
     */
    entries: number;
    /**
     * Number of bytes of the index in minified format.
     */
    dataSize: number;
    /**
     * Number of bytes of the index binary file.
     */
    fileSize: number;
    /**
     * Last build time.
     */
    lastBuildTimeS: number;
    /**
     * Number of pending indexing operations. This value is deprecated and should not be used.
     */
    numberOfPendingTasks: number;
    /**
     * A boolean which says whether the index has pending tasks. This value is deprecated and should not be used.
     */
    pendingTask: boolean;
    /**
     * Only present if the index is a replica. Contains the name of the related primary index.
     */
    primary?: string | undefined;
    /**
     * Only present if the index is a primary index with replicas. Contains the names of all linked replicas.
     */
    replicas?: Array<string> | undefined;
    /**
     * Only present if the index is a [virtual replica](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-an-index-alphabetically/#virtual-replicas).
     */
    virtual?: boolean | undefined;
};

type ListIndicesResponse = {
    /**
     * All indices in your Algolia application.
     */
    items: Array<FetchedIndex>;
    /**
     * Number of pages.
     */
    nbPages?: number | undefined;
};

/**
 * User ID data.
 */
type ListUserIdsResponse = {
    /**
     * User IDs.
     */
    userIDs: Array<UserId>;
};

type MultipleBatchResponse = {
    /**
     * Task IDs. One for each index.
     */
    taskID: {
        [key: string]: number;
    };
    /**
     * Unique record identifiers.
     */
    objectIDs: Array<string>;
};

type RemoveUserIdResponse = {
    /**
     * Date and time when the object was deleted, in RFC 3339 format.
     */
    deletedAt: string;
};

/**
 * Response, taskID, and update timestamp.
 */
type UpdatedAtResponse = {
    /**
     * Unique identifier of a task.  A successful API response means that a task was added to a queue. It might not run immediately. You can check the task\'s progress with the [`task` operation](#tag/Indices/operation/getTask) and this `taskID`.
     */
    taskID: number;
    /**
     * Date and time when the object was updated, in RFC 3339 format.
     */
    updatedAt: string;
};

type ReplaceAllObjectsResponse = {
    copyOperationResponse: UpdatedAtResponse;
    /**
     * The response of the `batch` request(s).
     */
    batchResponses: Array<BatchResponse>;
    moveOperationResponse: UpdatedAtResponse;
};

type ReplaceSourceResponse = {
    /**
     * Date and time when the object was updated, in RFC 3339 format.
     */
    updatedAt: string;
};

/**
 * Which part of the search query the pattern should match:  - `startsWith`. The pattern must match the beginning of the query. - `endsWith`. The pattern must match the end of the query. - `is`. The pattern must match the query exactly. - `contains`. The pattern must match anywhere in the query.  Empty queries are only allowed as patterns with `anchoring: is`.
 */
type Anchoring = 'is' | 'startsWith' | 'endsWith' | 'contains';

type Condition = {
    /**
     * Query pattern that triggers the rule.  You can use either a literal string, or a special pattern `{facet:ATTRIBUTE}`, where `ATTRIBUTE` is a facet name. The rule is triggered if the query matches the literal string or a value of the specified facet. For example, with `pattern: {facet:genre}`, the rule is triggered when users search for a genre, such as \"comedy\".
     */
    pattern?: string | undefined;
    anchoring?: Anchoring | undefined;
    /**
     * Whether the pattern should match plurals, synonyms, and typos.
     */
    alternatives?: boolean | undefined;
    /**
     * An additional restriction that only triggers the rule, when the search has the same value as `ruleContexts` parameter. For example, if `context: mobile`, the rule is only triggered when the search request has a matching `ruleContexts: mobile`. A rule context must only contain alphanumeric characters.
     */
    context?: string | undefined;
    /**
     * Filters that trigger the rule.  You can add filters using the syntax `facet:value` so that the rule is triggered, when the specific filter is selected. You can use `filters` on its own or combine it with the `pattern` parameter. You can\'t combine multiple filters with `OR` and you can\'t use numeric filters.
     */
    filters?: string | undefined;
};

/**
 * Object ID of the record to hide.
 */
type ConsequenceHide = {
    /**
     * Unique record identifier.
     */
    objectID: string;
};

/**
 * Range object with lower and upper values in meters to define custom ranges.
 */
type Range$1 = {
    /**
     * Lower boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.
     */
    from?: number | undefined;
    /**
     * Upper boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.
     */
    value?: number | undefined;
};

/**
 * Precision of a coordinate-based search in meters to group results with similar distances.  The Geo ranking criterion considers all matches within the same range of distances to be equal.
 */
type AroundPrecision$1 = number | Array<Range$1>;

/**
 * Return all records with a valid `_geoloc` attribute. Don\'t filter by distance.
 */
type AroundRadiusAll$1 = 'all';

/**
 * Maximum radius for a search around a central location.  This parameter works in combination with the `aroundLatLng` and `aroundLatLngViaIP` parameters. By default, the search radius is determined automatically from the density of hits around the central location. The search radius is small if there are many hits close to the central coordinates.
 */
type AroundRadius$1 = number | AroundRadiusAll$1;

/**
 * Filter the search by facet values, so that only records with the same facet values are retrieved.  **Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**  - `[filter1, filter2]` is interpreted as `filter1 AND filter2`. - `[[filter1, filter2], filter3]` is interpreted as `filter1 OR filter2 AND filter3`. - `facet:-value` is interpreted as `NOT facet:value`.  While it\'s best to avoid attributes that start with a `-`, you can still filter them by escaping with a backslash: `facet:\\-value`.
 */
type FacetFilters$1 = Array<FacetFilters$1> | string;

type InsideBoundingBox$1 = string | Array<Array<number>>;

/**
 * Filter by numeric facets.  **Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**  You can use numeric comparison operators: `<`, `<=`, `=`, `!=`, `>`, `>=`. Comparisons are precise up to 3 decimals. You can also provide ranges: `facet:<lower> TO <upper>`. The range includes the lower and upper boundaries. The same combination rules apply as for `facetFilters`.
 */
type NumericFilters$1 = Array<NumericFilters$1> | string;

/**
 * Filters to promote or demote records in the search results.  Optional filters work like facet filters, but they don\'t exclude records from the search results. Records that match the optional filter rank before records that don\'t match. If you\'re using a negative filter `facet:-value`, matching records rank after records that don\'t match.  - Optional filters don\'t work on virtual replicas. - Optional filters are applied _after_ sort-by attributes. - Optional filters are applied _before_ custom ranking attributes (in the default [ranking](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/)). - Optional filters don\'t work with numeric attributes.
 */
type OptionalFilters$1 = Array<OptionalFilters$1> | string;

/**
 * ISO code for a supported language.
 */
type SupportedLanguage$1 = 'af' | 'ar' | 'az' | 'bg' | 'bn' | 'ca' | 'cs' | 'cy' | 'da' | 'de' | 'el' | 'en' | 'eo' | 'es' | 'et' | 'eu' | 'fa' | 'fi' | 'fo' | 'fr' | 'ga' | 'gl' | 'he' | 'hi' | 'hu' | 'hy' | 'id' | 'is' | 'it' | 'ja' | 'ka' | 'kk' | 'ko' | 'ku' | 'ky' | 'lt' | 'lv' | 'mi' | 'mn' | 'mr' | 'ms' | 'mt' | 'nb' | 'nl' | 'no' | 'ns' | 'pl' | 'ps' | 'pt' | 'pt-br' | 'qu' | 'ro' | 'ru' | 'sk' | 'sq' | 'sv' | 'sw' | 'ta' | 'te' | 'th' | 'tl' | 'tn' | 'tr' | 'tt' | 'uk' | 'ur' | 'uz' | 'zh';

/**
 * Filter the search by values of the special `_tags` attribute.  **Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**  Different from regular facets, `_tags` can only be used for filtering (including or excluding records). You won\'t get a facet count. The same combination and escaping rules apply as for `facetFilters`.
 */
type TagFilters$1 = Array<TagFilters$1> | string;

type BaseSearchParamsWithoutQuery$1 = {
    /**
     * Keywords to be used instead of the search query to conduct a more broader search Using the `similarQuery` parameter changes other settings - `queryType` is set to `prefixNone`. - `removeStopWords` is set to true. - `words` is set as the first ranking criterion. - All remaining words are treated as `optionalWords` Since the `similarQuery` is supposed to do a broad search, they usually return many results. Combine it with `filters` to narrow down the list of results.
     */
    similarQuery?: string | undefined;
    /**
     * Filter expression to only include items that match the filter criteria in the response.  You can use these filter expressions:  - **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`. - **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive). - **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value. - **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive). - **Boolean filters.** `<facet>: true | false`.  You can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:  - You can only combine filters of the same type with `OR`.   **Not supported:** `facet:value OR num > 3`. - You can\'t use `NOT` with combinations of filters.   **Not supported:** `NOT(facet:value OR facet:value)` - You can\'t combine conjunctions (`AND`) with `OR`.   **Not supported:** `facet:value OR (facet:value AND facet:value)`  Use quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes. If a facet attribute is an array, the filter matches if it matches at least one element of the array.  For more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).
     */
    filters?: string | undefined;
    facetFilters?: FacetFilters$1 | undefined;
    optionalFilters?: OptionalFilters$1 | undefined;
    numericFilters?: NumericFilters$1 | undefined;
    tagFilters?: TagFilters$1 | undefined;
    /**
     * Whether to sum all filter scores If true, all filter scores are summed. Otherwise, the maximum filter score is kept. For more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).
     */
    sumOrFiltersScores?: boolean | undefined;
    /**
     * Restricts a search to a subset of your searchable attributes. Attribute names are case-sensitive.
     */
    restrictSearchableAttributes?: Array<string> | undefined;
    /**
     * Facets for which to retrieve facet values that match the search criteria and the number of matching facet values To retrieve all facets, use the wildcard character `*`. For more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).
     */
    facets?: Array<string> | undefined;
    /**
     * Whether faceting should be applied after deduplication with `distinct` This leads to accurate facet counts when using faceting in combination with `distinct`. It\'s usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting, as `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.
     */
    facetingAfterDistinct?: boolean | undefined;
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Position of the first hit to retrieve.
     */
    offset?: number | undefined;
    /**
     * Number of hits to retrieve (used in combination with `offset`).
     */
    length?: number | undefined;
    /**
     * Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.  Only records included within a circle around this central location are included in the results. The radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings. This parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.
     */
    aroundLatLng?: string | undefined;
    /**
     * Whether to obtain the coordinates from the request\'s IP address.
     */
    aroundLatLngViaIP?: boolean | undefined;
    aroundRadius?: AroundRadius$1 | undefined;
    aroundPrecision?: AroundPrecision$1 | undefined;
    /**
     * Minimum radius (in meters) for a search around a location when `aroundRadius` isn\'t set.
     */
    minimumAroundRadius?: number | undefined;
    insideBoundingBox?: InsideBoundingBox$1 | null | undefined;
    /**
     * Coordinates of a polygon in which to search.  Polygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude. Provide multiple polygons as nested arrays. For more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas). This parameter is ignored if you also specify `insideBoundingBox`.
     */
    insidePolygon?: Array<Array<number>> | undefined;
    /**
     * ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches) - Sets `removeStopWords` and `ignorePlurals` to the list of provided languages. - Sets `removeWordsIfNoResults` to `allOptional`. - Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.
     */
    naturalLanguages?: Array<SupportedLanguage$1> | undefined;
    /**
     * Assigns a rule context to the search query [Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.
     */
    ruleContexts?: Array<string> | undefined;
    /**
     * Impact that Personalization should have on this search The higher this value is, the more Personalization determines the ranking compared to other factors. For more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).
     */
    personalizationImpact?: number | undefined;
    /**
     * Unique pseudonymous or anonymous user identifier.  This helps with analytics and click and conversion events. For more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/).
     */
    userToken?: string | undefined;
    /**
     * Whether the search response should include detailed ranking information.
     */
    getRankingInfo?: boolean | undefined;
    /**
     * Whether to take into account an index\'s synonyms for this search.
     */
    synonyms?: boolean | undefined;
    /**
     * Whether to include a `queryID` attribute in the response The query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/guides/sending-events/getting-started/).
     */
    clickAnalytics?: boolean | undefined;
    /**
     * Whether this search will be included in Analytics.
     */
    analytics?: boolean | undefined;
    /**
     * Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     */
    analyticsTags?: Array<string> | undefined;
    /**
     * Whether to include this search when calculating processing-time percentiles.
     */
    percentileComputation?: boolean | undefined;
    /**
     * Whether to enable A/B testing for this search.
     */
    enableABTest?: boolean | undefined;
};

type AdvancedSyntaxFeatures$1 = 'exactPhrase' | 'excludeWords';

type AlternativesAsExact$1 = 'ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym' | 'ignoreConjugations';

/**
 * Determines how many records of a group are included in the search results.  Records with the same value for the `attributeForDistinct` attribute are considered a group. The `distinct` setting controls how many members of the group are returned. This is useful for [deduplication and grouping](https://www.algolia.com/doc/guides/managing-results/refine-results/grouping/#introducing-algolias-distinct-feature).  The `distinct` setting is ignored if `attributeForDistinct` is not set.
 */
type Distinct$1 = boolean | number;

/**
 * Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.  - `attribute`.   The Exact ranking criterion is 1 if the query word and attribute value are the same.   For example, a search for \"road\" will match the value \"road\", but not \"road trip\".  - `none`.   The Exact ranking criterion is ignored on single-word searches.  - `word`.   The Exact ranking criterion is 1 if the query word is found in the attribute value.   The query word must have at least 3 characters and must not be a stop word.   Only exact matches will be highlighted,   partial and prefix matches won\'t.
 */
type ExactOnSingleWordQuery$1 = 'attribute' | 'none' | 'word';

type BooleanString$1 = 'true' | 'false';

/**
 * Treat singular, plurals, and other forms of declensions as equivalent. You should only use this feature for the languages used in your index.
 */
type IgnorePlurals$1 = Array<SupportedLanguage$1> | BooleanString$1 | boolean;

/**
 * Search mode the index will use to query for results.  This setting only applies to indices, for which Algolia enabled NeuralSearch for you.
 */
type Mode$1 = 'neuralSearch' | 'keywordSearch';

/**
 * Words that should be considered optional when found in the query.  By default, records must match all words in the search query to be included in the search results. Adding optional words can help to increase the number of search results by running an additional search query that doesn\'t include the optional words. For example, if the search query is \"action video\" and \"video\" is an optional word, the search engine runs two queries. One for \"action video\" and one for \"action\". Records that match all words are ranked higher.  For a search query with 4 or more words **and** all its words are optional, the number of matched words required for a record to be included in the search results increases for every 1,000 records:  - If `optionalWords` has less than 10 words, the required number of matched words increases by 1:   results 1 to 1,000 require 1 matched word, results 1,001 to 2000 need 2 matched words. - If `optionalWords` has 10 or more words, the number of required matched words increases by the number of optional words divided by 5 (rounded down).   For example, with 18 optional words: results 1 to 1,000 require 1 matched word, results 1,001 to 2000 need 4 matched words.  For more information, see [Optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).
 */
type OptionalWords$1 = string | Array<string>;

/**
 * Determines if and how query words are interpreted as prefixes.  By default, only the last query word is treated as a prefix (`prefixLast`). To turn off prefix search, use `prefixNone`. Avoid `prefixAll`, which treats all query words as prefixes. This might lead to counterintuitive results and makes your search slower.  For more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching/).
 */
type QueryType$1 = 'prefixLast' | 'prefixAll' | 'prefixNone';

/**
 * Restrict [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/) to records that match these filters.
 */
type ReRankingApplyFilter$1 = Array<ReRankingApplyFilter$1> | string;

/**
 * Removes stop words from the search query.  Stop words are common words like articles, conjunctions, prepositions, or pronouns that have little or no meaning on their own. In English, \"the\", \"a\", or \"and\" are stop words.  You should only use this feature for the languages used in your index.
 */
type RemoveStopWords$1 = Array<SupportedLanguage$1> | boolean;

/**
 * Strategy for removing words from the query when it doesn\'t return any results. This helps to avoid returning empty search results.  - `none`.   No words are removed when a query doesn\'t return results.  - `lastWords`.   Treat the last (then second to last, then third to last) word as optional,   until there are results or at most 5 words have been removed.  - `firstWords`.   Treat the first (then second, then third) word as optional,   until there are results or at most 5 words have been removed.  - `allOptional`.   Treat all words as optional.  For more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results/).
 */
type RemoveWordsIfNoResults$1 = 'none' | 'lastWords' | 'firstWords' | 'allOptional';

/**
 * Settings for the semantic search part of NeuralSearch. Only used when `mode` is `neuralSearch`.
 */
type SemanticSearch$1 = {
    /**
     * Indices from which to collect click and conversion events.  If null, the current index and all its replicas are used.
     */
    eventSources?: Array<string> | null | undefined;
};

/**
 * - `min`. Return matches with the lowest number of typos.   For example, if you have matches without typos, only include those.   But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos). - `strict`. Return matches with the two lowest numbers of typos.   With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.
 */
type TypoToleranceEnum$1 = 'min' | 'strict' | 'true' | 'false';

/**
 * Whether [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/) is enabled and how it is applied.  If typo tolerance is true, `min`, or `strict`, [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation/) are also active.
 */
type TypoTolerance$1 = boolean | TypoToleranceEnum$1;

type IndexSettingsAsSearchParams$1 = {
    /**
     * Attributes to include in the API response To reduce the size of your response, you can retrieve only some of the attributes. Attribute names are case-sensitive - `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings. - To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `[\"*\", \"-ATTRIBUTE\"]`. - The `objectID` attribute is always included.
     */
    attributesToRetrieve?: Array<string> | undefined;
    /**
     * Determines the order in which Algolia returns your results.  By default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/). The tie-breaking algorithm sequentially applies each criterion in the order they\'re specified. If you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/), you put the sorting attribute at the top of the list.  **Modifiers**  - `asc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in ascending order. - `desc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in descending order.  Before you modify the default setting, you should test your changes in the dashboard, and by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/).
     */
    ranking?: Array<string> | undefined;
    /**
     * Relevancy threshold below which less relevant results aren\'t included in the results You can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas). Use this setting to strike a balance between the relevance and number of returned results.
     */
    relevancyStrictness?: number | undefined;
    /**
     * Attributes to highlight By default, all searchable attributes are highlighted. Use `*` to highlight all attributes or use an empty array `[]` to turn off highlighting. Attribute names are case-sensitive With highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`. You can use this to visually highlight matching parts of a search query in your UI For more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/).
     */
    attributesToHighlight?: Array<string> | undefined;
    /**
     * Attributes for which to enable snippets. Attribute names are case-sensitive Snippets provide additional context to matched words. If you enable snippets, they include 10 words, including the matched word. The matched word will also be wrapped by HTML tags for highlighting. You can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`, where `NUMBER` is the number of words to be extracted.
     */
    attributesToSnippet?: Array<string> | undefined;
    /**
     * HTML tag to insert before the highlighted parts in all highlighted results and snippets.
     */
    highlightPreTag?: string | undefined;
    /**
     * HTML tag to insert after the highlighted parts in all highlighted results and snippets.
     */
    highlightPostTag?: string | undefined;
    /**
     * String used as an ellipsis indicator when a snippet is truncated.
     */
    snippetEllipsisText?: string | undefined;
    /**
     * Whether to restrict highlighting and snippeting to items that at least partially matched the search query. By default, all items are highlighted and snippeted.
     */
    restrictHighlightAndSnippetArrays?: boolean | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
    /**
     * Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).
     */
    minWordSizefor1Typo?: number | undefined;
    /**
     * Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).
     */
    minWordSizefor2Typos?: number | undefined;
    typoTolerance?: TypoTolerance$1 | undefined;
    /**
     * Whether to allow typos on numbers in the search query Turn off this setting to reduce the number of irrelevant matches when searching in large sets of similar numbers.
     */
    allowTyposOnNumericTokens?: boolean | undefined;
    /**
     * Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/). Attribute names are case-sensitive Returning only exact matches can help when - [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/). - Reducing the number of matches when you have too many.   This can happen with attributes that are long blocks of text, such as product descriptions Consider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.
     */
    disableTypoToleranceOnAttributes?: Array<string> | undefined;
    ignorePlurals?: IgnorePlurals$1 | undefined;
    removeStopWords?: RemoveStopWords$1 | undefined;
    /**
     * Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries  This setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings. This setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages. To support this, you must place the CJK language **first**  **You should always specify a query language.** If you don\'t specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/), or the languages you specified with the `ignorePlurals` or `removeStopWords` parameters. This can lead to unexpected search results. For more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).
     */
    queryLanguages?: Array<SupportedLanguage$1> | undefined;
    /**
     * Whether to split compound words in the query into their building blocks For more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words). Word segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian. Decompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark). For example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).
     */
    decompoundQuery?: boolean | undefined;
    /**
     * Whether to enable rules.
     */
    enableRules?: boolean | undefined;
    /**
     * Whether to enable Personalization.
     */
    enablePersonalization?: boolean | undefined;
    queryType?: QueryType$1 | undefined;
    removeWordsIfNoResults?: RemoveWordsIfNoResults$1 | undefined;
    mode?: Mode$1 | undefined;
    semanticSearch?: SemanticSearch$1 | undefined;
    /**
     * Whether to support phrase matching and excluding words from search queries Use the `advancedSyntaxFeatures` parameter to control which feature is supported.
     */
    advancedSyntax?: boolean | undefined;
    optionalWords?: OptionalWords$1 | null | undefined;
    /**
     * Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes). Attribute names are case-sensitive This can be useful for attributes with long values, where the likelihood of an exact match is high, such as product descriptions. Turning off the Exact ranking criterion for these attributes favors exact matching on other attributes. This reduces the impact of individual attributes with a lot of content on ranking.
     */
    disableExactOnAttributes?: Array<string> | undefined;
    exactOnSingleWordQuery?: ExactOnSingleWordQuery$1 | undefined;
    /**
     * Determine which plurals and synonyms should be considered an exact matches By default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching. For example - \"swimsuit\" and \"swimsuits\" are treated the same - \"swimsuit\" and \"swimwear\" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms)) - `ignorePlurals`.   Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches - `singleWordSynonym`.   Single-word synonyms, such as \"NY\" = \"NYC\", are considered exact matches - `multiWordsSynonym`.   Multi-word synonyms, such as \"NY\" = \"New York\", are considered exact matches.
     */
    alternativesAsExact?: Array<AlternativesAsExact$1> | undefined;
    /**
     * Advanced search syntax features you want to support - `exactPhrase`.   Phrases in quotes must match exactly.   For example, `sparkly blue \"iPhone case\"` only returns records with the exact string \"iPhone case\" - `excludeWords`.   Query words prefixed with a `-` must not occur in a record.   For example, `search -engine` matches records that contain \"search\" but not \"engine\" This setting only has an effect if `advancedSyntax` is true.
     */
    advancedSyntaxFeatures?: Array<AdvancedSyntaxFeatures$1> | undefined;
    distinct?: Distinct$1 | undefined;
    /**
     * Whether to replace a highlighted word with the matched synonym By default, the original words are highlighted even if a synonym matches. For example, with `home` as a synonym for `house` and a search for `home`, records matching either \"home\" or \"house\" are included in the search results, and either \"home\" or \"house\" are highlighted With `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records, but all occurrences of \"house\" are replaced by \"home\" in the highlighted response.
     */
    replaceSynonymsInHighlight?: boolean | undefined;
    /**
     * Minimum proximity score for two matching words This adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity) by equally scoring matches that are farther apart For example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.
     */
    minProximity?: number | undefined;
    /**
     * Properties to include in the API response of search and browse requests By default, all response properties are included. To reduce the response size, you can select which properties should be included An empty list may lead to an empty API response (except properties you can\'t exclude) You can\'t exclude these properties: `message`, `warning`, `cursor`, `abTestVariantID`, or any property added by setting `getRankingInfo` to true Your search depends on the `hits` field. If you omit this field, searches won\'t return any results. Your UI might also depend on other properties, for example, for pagination. Before restricting the response size, check the impact on your search experience.
     */
    responseFields?: Array<string> | undefined;
    /**
     * Maximum number of facet values to return for each facet.
     */
    maxValuesPerFacet?: number | undefined;
    /**
     * Order in which to retrieve facet values - `count`.   Facet values are retrieved by decreasing count.   The count is the number of matching records containing this facet value - `alpha`.   Retrieve facet values alphabetically This setting doesn\'t influence how facet values are displayed in your UI (see `renderingContent`). For more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js/).
     */
    sortFacetValuesBy?: string | undefined;
    /**
     * Whether the best matching attribute should be determined by minimum proximity This setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting. If true, the best matching attribute is selected based on the minimum proximity of multiple matches. Otherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.
     */
    attributeCriteriaComputedByMinProximity?: boolean | undefined;
    renderingContent?: RenderingContent$1 | undefined;
    /**
     * Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/) This setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.
     */
    enableReRanking?: boolean | undefined;
    reRankingApplyFilter?: ReRankingApplyFilter$1 | null | undefined;
};

/**
 * Filter or optional filter to be applied to the search.
 */
type AutomaticFacetFilter = {
    /**
     * Facet name to be applied as filter. The name must match placeholders in the `pattern` parameter. For example, with `pattern: {facet:genre}`, `automaticFacetFilters` must be `genre`.
     */
    facet: string;
    /**
     * Filter scores to give different weights to individual filters.
     */
    score?: number | undefined;
    /**
     * Whether the filter is disjunctive or conjunctive.  If true the filter has multiple matches, multiple occurences are combined with the logical `OR` operation. If false, multiple occurences are combined with the logical `AND` operation.
     */
    disjunctive?: boolean | undefined;
};

/**
 * Filter to be applied to the search.  You can use this to respond to search queries that match a facet value. For example, if users search for \"comedy\", which matches a facet value of the \"genre\" facet, you can filter the results to show the top-ranked comedy movies.
 */
type AutomaticFacetFilters = Array<AutomaticFacetFilter> | Array<string>;

/**
 * Type of edit.
 */
type EditType = 'remove' | 'replace';

type Edit = {
    type?: EditType | undefined;
    /**
     * Text or patterns to remove from the query string.
     */
    delete?: string | undefined;
    /**
     * Text to be added in place of the deleted text inside the query string.
     */
    insert?: string | undefined;
};

type ConsequenceQueryObject = {
    /**
     * Words to remove from the search query.
     */
    remove?: Array<string> | undefined;
    /**
     * Changes to make to the search query.
     */
    edits?: Array<Edit> | undefined;
};

/**
 * Replace or edit the search query.  If `consequenceQuery` is a string, the entire search query is replaced with that string. If `consequenceQuery` is an object, it describes incremental edits made to the query.
 */
type ConsequenceQuery = ConsequenceQueryObject | string;

/**
 * Parameters to apply to this search.  You can use all search parameters, plus special `automaticFacetFilters`, `automaticOptionalFacetFilters`, and `query`.
 */
type Params = {
    query?: ConsequenceQuery | undefined;
    automaticFacetFilters?: AutomaticFacetFilters | undefined;
    automaticOptionalFacetFilters?: AutomaticFacetFilters | undefined;
    renderingContent?: RenderingContent$1 | undefined;
};

type ConsequenceParams = BaseSearchParamsWithoutQuery$1 & IndexSettingsAsSearchParams$1 & Params;

/**
 * Record to promote.
 */
type PromoteObjectID = {
    /**
     * Unique record identifier.
     */
    objectID: string;
    /**
     * Position in the search results where you want to show the promoted records.
     */
    position: number;
};

/**
 * Records to promote.
 */
type PromoteObjectIDs = {
    /**
     * Object IDs of the records you want to promote.  The records are placed as a group at the `position`. For example, if you want to promote four records to position `0`, they will be the first four search results.
     */
    objectIDs: Array<string>;
    /**
     * Position in the search results where you want to show the promoted records.
     */
    position: number;
};

type Promote = PromoteObjectIDs | PromoteObjectID;

/**
 * Effect of the rule.  For more information, see [Consequences](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#consequences).
 */
type Consequence = {
    params?: ConsequenceParams | undefined;
    /**
     * Records you want to pin to a specific position in the search results.  You can promote up to 300 records, either individually, or as groups of up to 100 records each.
     */
    promote?: Array<Promote> | undefined;
    /**
     * Determines whether promoted records must also match active filters for the consequence to apply.  This ensures user-applied filters take priority and irrelevant matches aren\'t shown. For example, if you promote a record with `color: red` but the user filters for `color: blue`, the \"red\" record won\'t be shown.  > In the Algolia dashboard, when you use the **Pin an item** consequence, `filterPromotes` appears as the checkbox: **Pinned items must match active filters to be displayed.** For examples, see [Promote results with rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits/#promote-results-matching-active-filters).
     */
    filterPromotes?: boolean | undefined;
    /**
     * Records you want to hide from the search results.
     */
    hide?: Array<ConsequenceHide> | undefined;
    /**
     * A JSON object with custom data that will be appended to the `userData` array in the response. This object isn\'t interpreted by the API and is limited to 1&nbsp;kB of minified JSON.
     */
    userData?: Record<string, unknown> | undefined;
};

type TimeRange = {
    /**
     * When the rule should start to be active, in Unix epoch time.
     */
    from?: number | undefined;
    /**
     * When the rule should stop to be active, in Unix epoch time.
     */
    until?: number | undefined;
};

/**
 * Rule object.
 */
type Rule = {
    /**
     * Unique identifier of a rule object.
     */
    objectID: string;
    /**
     * Conditions that trigger a rule.  Some consequences require specific conditions or don\'t require any condition. For more information, see [Conditions](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#conditions).
     */
    conditions?: Array<Condition> | undefined;
    consequence: Consequence;
    /**
     * Description of the rule\'s purpose to help you distinguish between different rules.
     */
    description?: string | undefined;
    /**
     * Whether the rule is active.
     */
    enabled?: boolean | undefined;
    /**
     * Time periods when the rule is active.
     */
    validity?: Array<TimeRange> | undefined;
};

type SaveObjectResponse = {
    /**
     * Date and time when the object was created, in RFC 3339 format.
     */
    createdAt: string;
    /**
     * Unique identifier of a task.  A successful API response means that a task was added to a queue. It might not run immediately. You can check the task\'s progress with the [`task` operation](#tag/Indices/operation/getTask) and this `taskID`.
     */
    taskID: number;
    /**
     * Unique record identifier.
     */
    objectID?: string | undefined;
};

type SaveSynonymResponse = {
    /**
     * Unique identifier of a task.  A successful API response means that a task was added to a queue. It might not run immediately. You can check the task\'s progress with the [`task` operation](#tag/Indices/operation/getTask) and this `taskID`.
     */
    taskID: number;
    /**
     * Date and time when the object was updated, in RFC 3339 format.
     */
    updatedAt: string;
    /**
     * Unique identifier of a synonym object.
     */
    id: string;
};

/**
 * Whether a dictionary entry is active.
 */
type DictionaryEntryState = 'enabled' | 'disabled';

/**
 * Whether a dictionary entry is provided by Algolia (standard), or has been added by you (custom).
 */
type DictionaryEntryType = 'custom' | 'standard';

/**
 * Dictionary entry.
 */
type DictionaryEntry = Record<string, any> & {
    /**
     * Unique identifier for the dictionary entry.
     */
    objectID: string;
    language?: SupportedLanguage$1 | undefined;
    /**
     * Matching dictionary word for `stopwords` and `compounds` dictionaries.
     */
    word?: string | undefined;
    /**
     * Matching words in the `plurals` dictionary including declensions.
     */
    words?: Array<string> | undefined;
    /**
     * Invividual components of a compound word in the `compounds` dictionary.
     */
    decomposition?: Array<string> | undefined;
    state?: DictionaryEntryState | undefined;
    type?: DictionaryEntryType | undefined;
};

type SearchDictionaryEntriesResponse = {
    /**
     * Dictionary entries matching the search criteria.
     */
    hits: Array<DictionaryEntry>;
    /**
     * Requested page of the API response.  Algolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js/)).  - `hitsPerPage`: sets the number of search results (_hits_) displayed per page. - `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.  For example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.
     */
    page: number;
    /**
     * Number of results (hits).
     */
    nbHits: number;
    /**
     * Number of pages of results.
     */
    nbPages: number;
};

type FacetHits$1 = {
    /**
     * Facet value.
     */
    value: string;
    /**
     * Highlighted attribute value, including HTML tags.
     */
    highlighted: string;
    /**
     * Number of records with this facet value. [The count may be approximated](https://support.algolia.com/hc/en-us/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate-).
     */
    count: number;
};

type SearchForFacetValuesResponse$2 = {
    /**
     * Matching facet values.
     */
    facetHits: Array<FacetHits$1>;
    /**
     * Whether the facet count is exhaustive (true) or approximate (false). For more information, see [Why are my facet and hit counts not accurate](https://support.algolia.com/hc/en-us/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate-).
     */
    exhaustiveFacetsCount: boolean;
    /**
     * Time the server took to process the request, in milliseconds.
     */
    processingTimeMS?: number | undefined;
};

/**
 * - `default`: perform a search query - `facet` [searches for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
 */
type SearchTypeFacet$1 = 'facet';

type SearchForFacetsOptions$1 = {
    /**
     * Facet name.
     */
    facet: string;
    /**
     * Index name (case-sensitive).
     */
    indexName: string;
    /**
     * Text to search inside the facet\'s values.
     */
    facetQuery?: string | undefined;
    /**
     * Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
     */
    maxFacetHits?: number | undefined;
    type: SearchTypeFacet$1;
};

type SearchParamsQuery$1 = {
    /**
     * Search query.
     */
    query?: string | undefined;
};

type BaseSearchParams$1 = SearchParamsQuery$1 & BaseSearchParamsWithoutQuery$1;

/**
 * Each parameter value, including the `query` must not be larger than 512 bytes.
 */
type SearchParamsObject$1 = BaseSearchParams$1 & IndexSettingsAsSearchParams$1;

/**
 * Search parameters as query string.
 */
type SearchParamsString$1 = {
    /**
     * Search parameters as a URL-encoded query string.
     */
    params?: string | undefined;
};

type SearchParams$1 = SearchParamsString$1 | SearchParamsObject$1;

type SearchForFacets$1 = SearchParams$1 & SearchForFacetsOptions$1;

/**
 * - `default`: perform a search query - `facet` [searches for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
 */
type SearchTypeDefault$1 = 'default';

type SearchForHitsOptions$1 = {
    /**
     * Index name (case-sensitive).
     */
    indexName: string;
    type?: SearchTypeDefault$1 | undefined;
} & {
    facet?: never | undefined;
    maxFacetHits?: never | undefined;
    facetQuery?: never | undefined;
};

type SearchForHits$1 = SearchParams$1 & SearchForHitsOptions$1;

type SearchQuery$1 = SearchForHits$1 | SearchForFacets$1;

/**
 * Strategy for multiple search queries:  - `none`. Run all queries. - `stopIfEnoughMatches`. Run the queries one by one, stopping as soon as a query matches at least the `hitsPerPage` number of results.
 */
type SearchStrategy$1 = 'none' | 'stopIfEnoughMatches';

type SearchMethodParams$1 = {
    requests: Array<SearchQuery$1>;
    strategy?: SearchStrategy$1 | undefined;
};

type SearchPagination$1 = {
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Number of results (hits).
     */
    nbHits?: number | undefined;
    /**
     * Number of pages of results.
     */
    nbPages?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
};

type SearchResponse$2<T = Record<string, unknown>> = BaseSearchResponse$1 & SearchPagination$1 & SearchHits$1<T>;

type SearchResult$1<T = Record<string, unknown>> = SearchResponse$2<T> | SearchForFacetValuesResponse$2;

type SearchResponses$1<T = Record<string, unknown>> = {
    results: SearchResult$1<T>[];
};

type SearchRulesResponse = {
    /**
     * Rules that matched the search criteria.
     */
    hits: Array<Rule>;
    /**
     * Number of rules that matched the search criteria.
     */
    nbHits: number;
    /**
     * Current page.
     */
    page: number;
    /**
     * Number of pages.
     */
    nbPages: number;
};

/**
 * Synonym type.
 */
type SynonymType = 'synonym' | 'onewaysynonym' | 'altcorrection1' | 'altcorrection2' | 'placeholder' | 'oneWaySynonym' | 'altCorrection1' | 'altCorrection2';

/**
 * Synonym object.
 */
type SynonymHit = {
    /**
     * Unique identifier of a synonym object.
     */
    objectID: string;
    type: SynonymType;
    /**
     * Words or phrases considered equivalent.
     */
    synonyms?: Array<string> | undefined;
    /**
     * Word or phrase to appear in query strings (for [`onewaysynonym`s](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/one-way-synonyms/)).
     */
    input?: string | undefined;
    /**
     * Word or phrase to appear in query strings (for [`altcorrection1` and `altcorrection2`](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-alternative-corrections/)).
     */
    word?: string | undefined;
    /**
     * Words to be matched in records.
     */
    corrections?: Array<string> | undefined;
    /**
     * [Placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders/) to be put inside records.
     */
    placeholder?: string | undefined;
    /**
     * Query words that will match the [placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders/).
     */
    replacements?: Array<string> | undefined;
};

type SearchSynonymsResponse = Record<string, any> & {
    /**
     * Matching synonyms.
     */
    hits: Array<SynonymHit>;
    /**
     * Number of results (hits).
     */
    nbHits: number;
};

/**
 * OK
 */
type SearchUserIdsParams = {
    /**
     * Query to search. The search is a prefix search with [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/) enabled. An empty query will retrieve all users.
     */
    query: string;
    /**
     * Cluster name.
     */
    clusterName?: string | undefined;
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
};

type UserHighlightResult = {
    userID: HighlightResult$1;
    clusterName: HighlightResult$1;
};

type UserHit = {
    /**
     * Unique identifier of the user who makes the search request.
     */
    userID: string;
    /**
     * Cluster name.
     */
    clusterName: string;
    /**
     * Number of records in the cluster.
     */
    nbRecords: number;
    /**
     * Data size taken by all the users assigned to the cluster.
     */
    dataSize: number;
    /**
     * userID of the requested user. Same as userID.
     */
    objectID: string;
    _highlightResult: UserHighlightResult;
};

/**
 * userIDs data.
 */
type SearchUserIdsResponse = {
    /**
     * User objects that match the query.
     */
    hits: Array<UserHit>;
    /**
     * Number of results (hits).
     */
    nbHits: number;
    /**
     * Page of search results to retrieve.
     */
    page: number;
    /**
     * Maximum number of hits per page.  Algolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js/)).  - `hitsPerPage`: sets the number of search results (_hits_) displayed per page. - `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.  For example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.
     */
    hitsPerPage: number;
    /**
     * Date and time when the object was updated, in RFC 3339 format.
     */
    updatedAt: string;
};

type BaseIndexSettings$1 = {
    /**
     * Attributes used for [faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/).  Facets are attributes that let you categorize search results. They can be used for filtering search results. By default, no attribute is used for faceting. Attribute names are case-sensitive.  **Modifiers**  - `filterOnly(\"ATTRIBUTE\")`.   Allows the attribute to be used as a filter but doesn\'t evaluate the facet values.  - `searchable(\"ATTRIBUTE\")`.   Allows searching for facet values.  - `afterDistinct(\"ATTRIBUTE\")`.   Evaluates the facet count _after_ deduplication with `distinct`.   This ensures accurate facet counts.   You can apply this modifier to searchable facets: `afterDistinct(searchable(ATTRIBUTE))`.
     */
    attributesForFaceting?: Array<string> | undefined;
    /**
     * Creates [replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/).  Replicas are copies of a primary index with the same records but different settings, synonyms, or rules. If you want to offer a different ranking or sorting of your search results, you\'ll use replica indices. All index operations on a primary index are automatically forwarded to its replicas. To add a replica index, you must provide the complete set of replicas to this parameter. If you omit a replica from this list, the replica turns into a regular, standalone index that will no longer be synced with the primary index.  **Modifier**  - `virtual(\"REPLICA\")`.   Create a virtual replica,   Virtual replicas don\'t increase the number of records and are optimized for [Relevant sorting](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/relevant-sort/).
     */
    replicas?: Array<string> | undefined;
    /**
     * Maximum number of search results that can be obtained through pagination.  Higher pagination limits might slow down your search. For pagination limits above 1,000, the sorting of results beyond the 1,000th hit can\'t be guaranteed.
     */
    paginationLimitedTo?: number | undefined;
    /**
     * Attributes that can\'t be retrieved at query time.  This can be useful if you want to use an attribute for ranking or to [restrict access](https://www.algolia.com/doc/guides/security/api-keys/how-to/user-restricted-access-to-data/), but don\'t want to include it in the search results. Attribute names are case-sensitive.
     */
    unretrievableAttributes?: Array<string> | undefined;
    /**
     * Creates a list of [words which require exact matches](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#turn-off-typo-tolerance-for-certain-words). This also turns off [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation/) for the specified words.
     */
    disableTypoToleranceOnWords?: Array<string> | undefined;
    /**
     * Attributes, for which you want to support [Japanese transliteration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#japanese-transliteration-and-type-ahead).  Transliteration supports searching in any of the Japanese writing systems. To support transliteration, you must set the indexing language to Japanese. Attribute names are case-sensitive.
     */
    attributesToTransliterate?: Array<string> | undefined;
    /**
     * Attributes for which to split [camel case](https://wikipedia.org/wiki/Camel_case) words. Attribute names are case-sensitive.
     */
    camelCaseAttributes?: Array<string> | undefined;
    /**
     * Searchable attributes to which Algolia should apply [word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-segmentation/) (decompounding). Attribute names are case-sensitive.  Compound words are formed by combining two or more individual words, and are particularly prevalent in Germanic languages—for example, \"firefighter\". With decompounding, the individual components are indexed separately.  You can specify different lists for different languages. Decompounding is supported for these languages: Dutch (`nl`), German (`de`), Finnish (`fi`), Danish (`da`), Swedish (`sv`), and Norwegian (`no`). Decompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark). For example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).
     */
    decompoundedAttributes?: Record<string, unknown> | undefined;
    /**
     * Languages for language-specific processing steps, such as word detection and dictionary settings.  **You should always specify an indexing language.** If you don\'t specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/), or the languages you specified with the `ignorePlurals` or `removeStopWords` parameters. This can lead to unexpected search results. For more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).
     */
    indexLanguages?: Array<SupportedLanguage$1> | undefined;
    /**
     * Searchable attributes for which you want to turn off [prefix matching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/#adjusting-prefix-search). Attribute names are case-sensitive.
     */
    disablePrefixOnAttributes?: Array<string> | undefined;
    /**
     * Whether arrays with exclusively non-negative integers should be compressed for better performance. If true, the compressed arrays may be reordered.
     */
    allowCompressionOfIntegerArray?: boolean | undefined;
    /**
     * Numeric attributes that can be used as [numerical filters](https://www.algolia.com/doc/guides/managing-results/rules/detecting-intent/how-to/applying-a-custom-filter-for-a-specific-query/#numerical-filters). Attribute names are case-sensitive.  By default, all numeric attributes are available as numerical filters. For faster indexing, reduce the number of numeric attributes.  To turn off filtering for all numeric attributes, specify an attribute that doesn\'t exist in your index, such as `NO_NUMERIC_FILTERING`.  **Modifier**  - `equalOnly(\"ATTRIBUTE\")`.   Support only filtering based on equality comparisons `=` and `!=`.
     */
    numericAttributesForFiltering?: Array<string> | undefined;
    /**
     * Control which non-alphanumeric characters are indexed.  By default, Algolia ignores [non-alphanumeric characters](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/#handling-non-alphanumeric-characters) like hyphen (`-`), plus (`+`), and parentheses (`(`,`)`). To include such characters, define them with `separatorsToIndex`.  Separators are all non-letter characters except spaces and currency characters, such as $€£¥.  With `separatorsToIndex`, Algolia treats separator characters as separate words. For example, in a search for \"Disney+\", Algolia considers \"Disney\" and \"+\" as two separate words.
     */
    separatorsToIndex?: string | undefined;
    /**
     * Attributes used for searching. Attribute names are case-sensitive.  By default, all attributes are searchable and the [Attribute](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#attribute) ranking criterion is turned off. With a non-empty list, Algolia only returns results with matches in the selected attributes. In addition, the Attribute ranking criterion is turned on: matches in attributes that are higher in the list of `searchableAttributes` rank first. To make matches in two attributes rank equally, include them in a comma-separated string, such as `\"title,alternate_title\"`. Attributes with the same priority are always unordered.  For more information, see [Searchable attributes](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/setting-searchable-attributes/).  **Modifier**  - `unordered(\"ATTRIBUTE\")`.   Ignore the position of a match within the attribute.  Without a modifier, matches at the beginning of an attribute rank higher than matches at the end.
     */
    searchableAttributes?: Array<string> | undefined;
    /**
     * An object with custom data.  You can store up to 32kB as custom data.
     */
    userData?: any | null | undefined;
    /**
     * Characters and their normalized replacements. This overrides Algolia\'s default [normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/).
     */
    customNormalization?: {
        [key: string]: {
            [key: string]: string;
        };
    } | undefined;
    /**
     * Attribute that should be used to establish groups of results. Attribute names are case-sensitive.  All records with the same value for this attribute are considered a group. You can combine `attributeForDistinct` with the `distinct` search parameter to control how many items per group are included in the search results.  If you want to use the same attribute also for faceting, use the `afterDistinct` modifier of the `attributesForFaceting` setting. This applies faceting _after_ deduplication, which will result in accurate facet counts.
     */
    attributeForDistinct?: string | undefined;
    /**
     * Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
     */
    maxFacetHits?: number | undefined;
    /**
     * Characters for which diacritics should be preserved.  By default, Algolia removes diacritics from letters. For example, `é` becomes `e`. If this causes issues in your search, you can specify characters that should keep their diacritics.
     */
    keepDiacriticsOnCharacters?: string | undefined;
    /**
     * Attributes to use as [custom ranking](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/). Attribute names are case-sensitive.  The custom ranking attributes decide which items are shown first if the other ranking criteria are equal.  Records with missing values for your selected custom ranking attributes are always sorted last. Boolean attributes are sorted based on their alphabetical order.  **Modifiers**  - `asc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in ascending order.  - `desc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in descending order.  If you use two or more custom ranking attributes, [reduce the precision](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/controlling-custom-ranking-metrics-precision/) of your first attributes, or the other attributes will never be applied.
     */
    customRanking?: Array<string> | undefined;
};

/**
 * Index settings.
 */
type IndexSettings = BaseIndexSettings$1 & IndexSettingsAsSearchParams$1;

type WithPrimary = {
    /**
     * Replica indices only: the name of the primary index for this replica.
     */
    primary?: string | undefined;
};

type SettingsResponse = IndexSettings & WithPrimary;

/**
 * Source.
 */
type Source = {
    /**
     * IP address range of the source.
     */
    source: string;
    /**
     * Source description.
     */
    description?: string | undefined;
};

type UpdateApiKeyResponse = {
    /**
     * API key.
     */
    key: string;
    /**
     * Date and time when the object was updated, in RFC 3339 format.
     */
    updatedAt: string;
};

/**
 * Response, taskID, unique object identifier, and an update timestamp.
 */
type UpdatedAtWithObjectIdResponse = {
    /**
     * Unique identifier of a task.  A successful API response means that a task was added to a queue. It might not run immediately. You can check the task\'s progress with the [`task` operation](#tag/Indices/operation/getTask) and this `taskID`.
     */
    taskID?: number | undefined;
    /**
     * Date and time when the object was updated, in RFC 3339 format.
     */
    updatedAt?: string | undefined;
    /**
     * Unique record identifier.
     */
    objectID?: string | undefined;
};

type ApiKeyOperation = 'add' | 'delete' | 'update';

/**
 * Assign userID parameters.
 */
type AssignUserIdParams = {
    /**
     * Cluster name.
     */
    cluster: string;
};

/**
 * Assign userID parameters.
 */
type BatchAssignUserIdsParams = {
    /**
     * Cluster name.
     */
    cluster: string;
    /**
     * User IDs to assign.
     */
    users: Array<string>;
};

/**
 * Actions to perform.
 */
type DictionaryAction = 'addEntry' | 'deleteEntry';

type BatchDictionaryEntriesRequest = {
    action: DictionaryAction;
    body: DictionaryEntry;
};

/**
 * Request body for updating dictionary entries.
 */
type BatchDictionaryEntriesParams = {
    /**
     * Whether to replace all custom entries in the dictionary with the ones sent with this request.
     */
    clearExistingDictionaryEntries?: boolean | undefined;
    /**
     * List of additions and deletions to your dictionaries.
     */
    requests: Array<BatchDictionaryEntriesRequest>;
};

type BatchRequest = {
    action: Action;
    /**
     * Operation arguments (varies with specified `action`).
     */
    body: Record<string, unknown>;
};

/**
 * Batch parameters.
 */
type BatchWriteParams = {
    requests: Array<BatchRequest>;
};

type BrowseParamsObject = SearchParamsObject$1 & Cursor;

type BrowseParams = SearchParamsString$1 | BrowseParamsObject;

type DeleteByParams = {
    facetFilters?: FacetFilters$1 | undefined;
    /**
     * Filter expression to only include items that match the filter criteria in the response.  You can use these filter expressions:  - **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`. - **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive). - **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value. - **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive). - **Boolean filters.** `<facet>: true | false`.  You can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:  - You can only combine filters of the same type with `OR`.   **Not supported:** `facet:value OR num > 3`. - You can\'t use `NOT` with combinations of filters.   **Not supported:** `NOT(facet:value OR facet:value)` - You can\'t combine conjunctions (`AND`) with `OR`.   **Not supported:** `facet:value OR (facet:value AND facet:value)`  Use quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes. If a facet attribute is an array, the filter matches if it matches at least one element of the array.  For more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).
     */
    filters?: string | undefined;
    numericFilters?: NumericFilters$1 | undefined;
    tagFilters?: TagFilters$1 | undefined;
    /**
     * Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.  Only records included within a circle around this central location are included in the results. The radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings. This parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.
     */
    aroundLatLng?: string | undefined;
    aroundRadius?: AroundRadius$1 | undefined;
    insideBoundingBox?: InsideBoundingBox$1 | null | undefined;
    /**
     * Coordinates of a polygon in which to search.  Polygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude. Provide multiple polygons as nested arrays. For more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas). This parameter is ignored if you also specify `insideBoundingBox`.
     */
    insidePolygon?: Array<Array<number>> | undefined;
};

type DictionaryType = 'plurals' | 'stopwords' | 'compounds';

type LogType = 'all' | 'query' | 'build' | 'error';

/**
 * Operation to perform on the index.
 */
type OperationType = 'move' | 'copy';

type ScopeType = 'settings' | 'synonyms' | 'rules';

type OperationIndexParams = {
    operation: OperationType;
    /**
     * Index name (case-sensitive).
     */
    destination: string;
    /**
     * **Only for copying.**  If you specify a scope, only the selected scopes are copied. Records and the other scopes are left unchanged. If you omit the `scope` parameter, everything is copied: records, settings, synonyms, and rules.
     */
    scope?: Array<ScopeType> | undefined;
};

/**
 * Search parameter.
 */
type SearchDictionaryEntriesParams = {
    /**
     * Search query.
     */
    query: string;
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
    language?: SupportedLanguage$1 | undefined;
};

type SearchForFacetValuesRequest = {
    /**
     * Search parameters as a URL-encoded query string.
     */
    params?: string | undefined;
    /**
     * Text to search inside the facet\'s values.
     */
    facetQuery?: string | undefined;
    /**
     * Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
     */
    maxFacetHits?: number | undefined;
};

/**
 * Rules search parameters.
 */
type SearchRulesParams = {
    /**
     * Search query for rules.
     */
    query?: string | undefined;
    anchoring?: Anchoring | undefined;
    /**
     * Only return rules that match the context (exact match).
     */
    context?: string | undefined;
    /**
     * Requested page of the API response.  Algolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js/)).  - `hitsPerPage`: sets the number of search results (_hits_) displayed per page. - `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.  For example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.
     */
    page?: number | undefined;
    /**
     * Maximum number of hits per page.  Algolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js/)).  - `hitsPerPage`: sets the number of search results (_hits_) displayed per page. - `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.  For example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.
     */
    hitsPerPage?: number | undefined;
    /**
     * If `true`, return only enabled rules. If `false`, return only inactive rules. By default, _all_ rules are returned.
     */
    enabled?: boolean | null | undefined;
};

type SearchSynonymsParams = {
    /**
     * Search query.
     */
    query?: string | undefined;
    type?: SynonymType | undefined;
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
};

type SecuredApiKeyRestrictions = {
    searchParams?: SearchParamsObject$1 | undefined;
    /**
     * Filters that apply to every search made with the secured API key. Extra filters added at search time will be combined with `AND`. For example, if you set `group:admin` as fixed filter on your generated API key, and add `groups:visitors` to the search query, the complete set of filters will be `group:admin AND groups:visitors`.
     */
    filters?: string | undefined;
    /**
     * Timestamp when the secured API key expires, measured in seconds since the Unix epoch.
     */
    validUntil?: number | undefined;
    /**
     * Index names or patterns that this API key can access. By default, an API key can access all indices in the same application.  You can use leading and trailing wildcard characters (`*`):  - `dev_*` matches all indices starting with \"dev_\". - `*_dev` matches all indices ending with \"_dev\". - `*_products_*` matches all indices containing \"_products_\".
     */
    restrictIndices?: Array<string> | undefined;
    /**
     * IP network that are allowed to use this key.  You can only add a single source, but you can provide a range of IP addresses. Use this to protect against API key leaking and reuse.
     */
    restrictSources?: string | undefined;
    /**
     * Pseudonymous user identifier to restrict usage of this API key to specific users.  By default, rate limits are set based on IP addresses. This can be an issue if many users search from the same IP address. To avoid this, add a user token to each generated API key.
     */
    userToken?: string | undefined;
};

/**
 * Properties for the `addOrUpdateObject` method.
 */
type AddOrUpdateObjectProps<T extends object> = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique record identifier.
     */
    objectID: string;
    /**
     * The record. A schemaless object with attributes that are useful in the context of search and discovery.
     */
    body: T;
};
/**
 * Properties for the `assignUserId` method.
 */
type AssignUserIdProps = {
    /**
     * Unique identifier of the user who makes the search request.
     */
    xAlgoliaUserID: string;
    assignUserIdParams: AssignUserIdParams;
};
/**
 * Properties for the `batch` method.
 */
type BatchProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    batchWriteParams: BatchWriteParams;
};
/**
 * Properties for the `batchAssignUserIds` method.
 */
type BatchAssignUserIdsProps = {
    /**
     * Unique identifier of the user who makes the search request.
     */
    xAlgoliaUserID: string;
    batchAssignUserIdsParams: BatchAssignUserIdsParams;
};
/**
 * Properties for the `batchDictionaryEntries` method.
 */
type BatchDictionaryEntriesProps = {
    /**
     * Dictionary type in which to search.
     */
    dictionaryName: DictionaryType;
    batchDictionaryEntriesParams: BatchDictionaryEntriesParams;
};
/**
 * Properties for the `browse` method.
 */
type BrowseProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    browseParams?: BrowseParams | undefined;
};
/**
 * Properties for the `clearObjects` method.
 */
type ClearObjectsProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
};
/**
 * Properties for the `clearRules` method.
 */
type ClearRulesProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
};
/**
 * Properties for the `clearSynonyms` method.
 */
type ClearSynonymsProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
};
/**
 * Properties for the `customDelete` method.
 */
type CustomDeleteProps = {
    /**
     * Path of the endpoint, for example `1/newFeature`.
     */
    path: string;
    /**
     * Query parameters to apply to the current query.
     */
    parameters?: {
        [key: string]: any;
    } | undefined;
};
/**
 * Properties for the `customGet` method.
 */
type CustomGetProps = {
    /**
     * Path of the endpoint, for example `1/newFeature`.
     */
    path: string;
    /**
     * Query parameters to apply to the current query.
     */
    parameters?: {
        [key: string]: any;
    } | undefined;
};
/**
 * Properties for the `customPost` method.
 */
type CustomPostProps$1 = {
    /**
     * Path of the endpoint, for example `1/newFeature`.
     */
    path: string;
    /**
     * Query parameters to apply to the current query.
     */
    parameters?: {
        [key: string]: any;
    } | undefined;
    /**
     * Parameters to send with the custom request.
     */
    body?: Record<string, unknown> | undefined;
};
/**
 * Properties for the `customPut` method.
 */
type CustomPutProps = {
    /**
     * Path of the endpoint, for example `1/newFeature`.
     */
    path: string;
    /**
     * Query parameters to apply to the current query.
     */
    parameters?: {
        [key: string]: any;
    } | undefined;
    /**
     * Parameters to send with the custom request.
     */
    body?: Record<string, unknown> | undefined;
};
/**
 * Properties for the `deleteApiKey` method.
 */
type DeleteApiKeyProps = {
    /**
     * API key.
     */
    key: string;
};
/**
 * Properties for the `deleteBy` method.
 */
type DeleteByProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    deleteByParams: DeleteByParams;
};
/**
 * Properties for the `deleteIndex` method.
 */
type DeleteIndexProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
};
/**
 * Properties for the `deleteObject` method.
 */
type DeleteObjectProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique record identifier.
     */
    objectID: string;
};
/**
 * Properties for the `deleteRule` method.
 */
type DeleteRuleProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique identifier of a rule object.
     */
    objectID: string;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
};
/**
 * Properties for the `deleteSource` method.
 */
type DeleteSourceProps = {
    /**
     * IP address range of the source.
     */
    source: string;
};
/**
 * Properties for the `deleteSynonym` method.
 */
type DeleteSynonymProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique identifier of a synonym object.
     */
    objectID: string;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
};
/**
 * Properties for the `getApiKey` method.
 */
type GetApiKeyProps = {
    /**
     * API key.
     */
    key: string;
};
/**
 * Properties for the `getAppTask` method.
 */
type GetAppTaskProps = {
    /**
     * Unique task identifier.
     */
    taskID: number;
};
/**
 * Properties for the `getLogs` method.
 */
type GetLogsProps = {
    /**
     * First log entry to retrieve. The most recent entries are listed first.
     */
    offset?: number | undefined;
    /**
     * Maximum number of entries to retrieve.
     */
    length?: number | undefined;
    /**
     * Index for which to retrieve log entries. By default, log entries are retrieved for all indices.
     */
    indexName?: string | undefined;
    /**
     * Type of log entries to retrieve. By default, all log entries are retrieved.
     */
    type?: LogType | undefined;
};
/**
 * Properties for the `getObject` method.
 */
type GetObjectProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique record identifier.
     */
    objectID: string;
    /**
     * Attributes to include with the records in the response. This is useful to reduce the size of the API response. By default, all retrievable attributes are returned.  `objectID` is always retrieved.  Attributes included in `unretrievableAttributes` won\'t be retrieved unless the request is authenticated with the admin API key.
     */
    attributesToRetrieve?: Array<string> | undefined;
};
/**
 * Properties for the `getRule` method.
 */
type GetRuleProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique identifier of a rule object.
     */
    objectID: string;
};
/**
 * Properties for the `getSettings` method.
 */
type GetSettingsProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * When set to 2, the endpoint will not include `synonyms` in the response. This parameter is here for backward compatibility.
     */
    getVersion?: number | undefined;
};
/**
 * Properties for the `getSynonym` method.
 */
type GetSynonymProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique identifier of a synonym object.
     */
    objectID: string;
};
/**
 * Properties for the `getTask` method.
 */
type GetTaskProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique task identifier.
     */
    taskID: number;
};
/**
 * Properties for the `getUserId` method.
 */
type GetUserIdProps = {
    /**
     * Unique identifier of the user who makes the search request.
     */
    userID: string;
};
/**
 * Properties for the `hasPendingMappings` method.
 */
type HasPendingMappingsProps = {
    /**
     * Whether to include the cluster\'s pending mapping state in the response.
     */
    getClusters?: boolean | undefined;
};
/**
 * Properties for the `listIndices` method.
 */
type ListIndicesProps = {
    /**
     * Requested page of the API response. If `null`, the API response is not paginated.
     */
    page?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
};
/**
 * Properties for the `listUserIds` method.
 */
type ListUserIdsProps = {
    /**
     * Requested page of the API response. If `null`, the API response is not paginated.
     */
    page?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
};
/**
 * Properties for the `operationIndex` method.
 */
type OperationIndexProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    operationIndexParams: OperationIndexParams;
};
/**
 * Properties for the `partialUpdateObject` method.
 */
type PartialUpdateObjectProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique record identifier.
     */
    objectID: string;
    /**
     * Attributes with their values.
     */
    attributesToUpdate: Record<string, unknown>;
    /**
     * Whether to create a new record if it doesn\'t exist.
     */
    createIfNotExists?: boolean | undefined;
};
/**
 * Properties for the `removeUserId` method.
 */
type RemoveUserIdProps = {
    /**
     * Unique identifier of the user who makes the search request.
     */
    userID: string;
};
/**
 * Properties for the `replaceSources` method.
 */
type ReplaceSourcesProps = {
    /**
     * Allowed sources.
     */
    source: Array<Source>;
};
/**
 * Properties for the `restoreApiKey` method.
 */
type RestoreApiKeyProps = {
    /**
     * API key.
     */
    key: string;
};
/**
 * Properties for the `saveObject` method.
 */
type SaveObjectProps<T extends object> = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * The record. A schemaless object with attributes that are useful in the context of search and discovery.
     */
    body: T;
};
/**
 * Properties for the `saveRule` method.
 */
type SaveRuleProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique identifier of a rule object.
     */
    objectID: string;
    rule: Rule;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
};
/**
 * Properties for the `saveRules` method.
 */
type SaveRulesProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    rules: Array<Rule>;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
    /**
     * Whether existing rules should be deleted before adding this batch.
     */
    clearExistingRules?: boolean | undefined;
};
/**
 * Properties for the `saveSynonym` method.
 */
type SaveSynonymProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Unique identifier of a synonym object.
     */
    objectID: string;
    synonymHit: SynonymHit;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
};
/**
 * Properties for the `saveSynonyms` method.
 */
type SaveSynonymsProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    synonymHit: Array<SynonymHit>;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
    /**
     * Whether to replace all synonyms in the index with the ones sent with this request.
     */
    replaceExistingSynonyms?: boolean | undefined;
};
/**
 * In v4, the search parameters are wrapped in a `params` parameter.
 *
 * @deprecated The `search` method now accepts flat `searchParams` at the root of the method.
 */
type LegacySearchParams$1 = {
    params?: SearchParamsObject$1 | undefined;
};
/**
 * In v4, the search parameters are wrapped in a `params` parameter.
 *
 * @deprecated The `search` method now accepts flat `searchParams` at the root of the method.
 */
type LegacySearchForFacets$1 = LegacySearchParams$1 & SearchForFacetsOptions$1;
/**
 * In v4, the search parameters are wrapped in a `params` parameter.
 *
 * @deprecated The `search` method now accepts flat `searchParams` at the root of the method.
 */
type LegacySearchForHits$1 = LegacySearchParams$1 & SearchForHitsOptions$1;
type LegacySearchQuery$1 = LegacySearchForFacets$1 | LegacySearchForHits$1;
/**
 * Search method signature compatible with the `algoliasearch` v4 package. When using this signature, extra computation will be required to make it match the new signature.
 *
 * @deprecated This signature will be removed from the next major version, we recommend using the `SearchMethodParams` type for performances and future proof reasons.
 */
type LegacySearchMethodProps$1 = LegacySearchQuery$1[];
/**
 * Properties for the `searchDictionaryEntries` method.
 */
type SearchDictionaryEntriesProps = {
    /**
     * Dictionary type in which to search.
     */
    dictionaryName: DictionaryType;
    searchDictionaryEntriesParams: SearchDictionaryEntriesParams;
};
/**
 * Properties for the `searchForFacetValues` method.
 */
type SearchForFacetValuesProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Facet attribute in which to search for values.  This attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.
     */
    facetName: string;
    searchForFacetValuesRequest?: SearchForFacetValuesRequest | undefined;
};
/**
 * Properties for the `searchRules` method.
 */
type SearchRulesProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    searchRulesParams?: SearchRulesParams | undefined;
};
/**
 * Properties for the `searchSingleIndex` method.
 */
type SearchSingleIndexProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    searchParams?: SearchParams$1 | undefined;
};
/**
 * Properties for the `searchSynonyms` method.
 */
type SearchSynonymsProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    /**
     * Body of the `searchSynonyms` operation.
     */
    searchSynonymsParams?: SearchSynonymsParams | undefined;
};
/**
 * Properties for the `setSettings` method.
 */
type SetSettingsProps = {
    /**
     * Name of the index on which to perform the operation.
     */
    indexName: string;
    indexSettings: IndexSettings;
    /**
     * Whether changes are applied to replica indices.
     */
    forwardToReplicas?: boolean | undefined;
};
/**
 * Properties for the `updateApiKey` method.
 */
type UpdateApiKeyProps = {
    /**
     * API key.
     */
    key: string;
    apiKey: ApiKey;
};
/**
 * The `browseObjects`, `browseRules`, `browseSynonyms` options.
 */
type BrowseOptions<T> = Partial<Pick<CreateIterablePromise<T>, 'validate'>> & Required<Pick<CreateIterablePromise<T>, 'aggregator'>>;
type WaitForOptions = Partial<{
    /**
     * The maximum number of retries. 50 by default.
     */
    maxRetries: number;
    /**
     * The function to decide how long to wait between retries.
     */
    timeout: (retryCount: number) => number;
}>;
type WaitForAppTaskOptions = WaitForOptions & {
    /**
     * The `taskID` returned by the method response.
     */
    taskID: number;
};
type WaitForTaskOptions = WaitForAppTaskOptions & {
    /**
     * The `indexName` where the operation was performed.
     */
    indexName: string;
};
type WaitForApiKeyOptions = WaitForOptions & {
    /**
     * The API Key.
     */
    key: string;
} & ({
    /**
     * The operation that has been performed, used to compute the stop condition.
     */
    operation: Extract<ApiKeyOperation, 'add' | 'delete'>;
    apiKey?: never;
} | {
    /**
     * The operation that has been performed, used to compute the stop condition.
     */
    operation: Extract<ApiKeyOperation, 'update'>;
    /**
     * The updated fields, used to compute the stop condition.
     */
    apiKey: Partial<ApiKey>;
});
type GenerateSecuredApiKeyOptions = {
    /**
     * The base API key from which to generate the new secured one.
     */
    parentApiKey: string;
    /**
     * A set of properties defining the restrictions of the secured API key.
     */
    restrictions?: SecuredApiKeyRestrictions | undefined;
};
type GetSecuredApiKeyRemainingValidityOptions = {
    /**
     * The secured API key generated with the `generateSecuredApiKey` method.
     */
    securedApiKey: string;
};
type SearchClientNodeHelpers = {
    accountCopyIndex: (opts: AccountCopyIndexOptions) => Promise<void>;
    generateSecuredApiKey: (opts: GenerateSecuredApiKeyOptions) => string;
    getSecuredApiKeyRemainingValidity: (opts: GetSecuredApiKeyRemainingValidityOptions) => number;
};
type DeleteObjectsOptions = Pick<ChunkedBatchOptions, 'indexName' | 'waitForTasks' | 'batchSize'> & {
    /**
     * The objectIDs to delete.
     */
    objectIDs: string[];
};
type PartialUpdateObjectsOptions = Pick<ChunkedBatchOptions, 'indexName' | 'objects' | 'waitForTasks' | 'batchSize'> & {
    /**
     *To be provided if non-existing objects are passed, otherwise, the call will fail.
     */
    createIfNotExists?: boolean | undefined;
};
type SaveObjectsOptions = Pick<ChunkedBatchOptions, 'indexName' | 'objects' | 'waitForTasks' | 'batchSize'>;
type ChunkedBatchOptions = ReplaceAllObjectsOptions & {
    /**
     * The `batch` `action` to perform on the given array of `objects`, defaults to `addObject`.
     */
    action?: Action | undefined;
    /**
     * Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     */
    waitForTasks?: boolean | undefined;
};
type ReplaceAllObjectsOptions = {
    /**
     * The `indexName` to replace `objects` in.
     */
    indexName: string;
    /**
     * The array of `objects` to store in the given Algolia `indexName`.
     */
    objects: Array<Record<string, unknown>>;
    /**
     * The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     */
    batchSize?: number | undefined;
    /**
     * The `scopes` to keep from the index. Defaults to ['settings', 'rules', 'synonyms'].
     */
    scopes?: Array<ScopeType> | undefined;
};
type AccountCopyIndexOptions = {
    /**
     * The name of the index to copy to the `destinationClient`.
     */
    sourceIndexName: string;
    /**
     * The application ID to write the index to.
     */
    destinationAppID: string;
    /**
     * The API Key of the `destinationAppID` to write the index to, must have write ACLs.
     */
    destinationApiKey: string;
    /**
     * The name of the index to write the copy in.
     */
    destinationIndexName: string;
    /**
     * The size of the chunk of `objects`. Defaults to 1000.
     */
    batchSize?: number | undefined;
};
declare function createSearchClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, ...options }: CreateClientOptions): {
    transporter: Transporter;
    /**
     * The `appId` currently in use.
     */
    appId: string;
    /**
     * The `apiKey` currently in use.
     */
    apiKey: string;
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache(): Promise<void>;
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    readonly _ua: string;
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment: string, version?: string | undefined): void;
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }: {
        apiKey: string;
    }): void;
    /**
     * Helper: Wait for a task to be published (completed) for a given `indexName` and `taskID`.
     *
     * @summary Helper method that waits for a task to be published (completed).
     * @param waitForTaskOptions - The `waitForTaskOptions` object.
     * @param waitForTaskOptions.indexName - The `indexName` where the operation was performed.
     * @param waitForTaskOptions.taskID - The `taskID` returned in the method response.
     * @param waitForTaskOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForTaskOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    waitForTask({ indexName, taskID, maxRetries, timeout, }: WaitForTaskOptions, requestOptions?: RequestOptions | undefined): Promise<GetTaskResponse>;
    /**
     * Helper: Wait for an application-level task to complete for a given `taskID`.
     *
     * @summary Helper method that waits for a task to be published (completed).
     * @param waitForAppTaskOptions - The `waitForTaskOptions` object.
     * @param waitForAppTaskOptions.taskID - The `taskID` returned in the method response.
     * @param waitForAppTaskOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForAppTaskOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    waitForAppTask({ taskID, maxRetries, timeout, }: WaitForAppTaskOptions, requestOptions?: RequestOptions | undefined): Promise<GetTaskResponse>;
    /**
     * Helper: Wait for an API key to be added, updated or deleted based on a given `operation`.
     *
     * @summary Helper method that waits for an API key task to be processed.
     * @param waitForApiKeyOptions - The `waitForApiKeyOptions` object.
     * @param waitForApiKeyOptions.operation - The `operation` that was done on a `key`.
     * @param waitForApiKeyOptions.key - The `key` that has been added, deleted or updated.
     * @param waitForApiKeyOptions.apiKey - Necessary to know if an `update` operation has been processed, compare fields of the response with it.
     * @param waitForApiKeyOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForApiKeyOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getApikey` method and merged with the transporter requestOptions.
     */
    waitForApiKey({ operation, key, apiKey, maxRetries, timeout, }: WaitForApiKeyOptions, requestOptions?: RequestOptions | undefined): Promise<GetApiKeyResponse | undefined>;
    /**
     * Helper: Iterate on the `browse` method of the client to allow aggregating objects of an index.
     *
     * @summary Helper method that iterates on the `browse` method.
     * @param browseObjects - The `browseObjects` object.
     * @param browseObjects.indexName - The index in which to perform the request.
     * @param browseObjects.browseParams - The `browse` parameters.
     * @param browseObjects.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is no `cursor` in the response.
     * @param browseObjects.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `browse` method and merged with the transporter requestOptions.
     */
    browseObjects<T>({ indexName, browseParams, ...browseObjectsOptions }: BrowseOptions<BrowseResponse<T>> & BrowseProps, requestOptions?: RequestOptions | undefined): Promise<BrowseResponse<T>>;
    /**
     * Helper: Iterate on the `searchRules` method of the client to allow aggregating rules of an index.
     *
     * @summary Helper method that iterates on the `searchRules` method.
     * @param browseRules - The `browseRules` object.
     * @param browseRules.indexName - The index in which to perform the request.
     * @param browseRules.searchRulesParams - The `searchRules` method parameters.
     * @param browseRules.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
     * @param browseRules.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchRules` method and merged with the transporter requestOptions.
     */
    browseRules({ indexName, searchRulesParams, ...browseRulesOptions }: BrowseOptions<SearchRulesResponse> & SearchRulesProps, requestOptions?: RequestOptions | undefined): Promise<SearchRulesResponse>;
    /**
     * Helper: Iterate on the `searchSynonyms` method of the client to allow aggregating rules of an index.
     *
     * @summary Helper method that iterates on the `searchSynonyms` method.
     * @param browseSynonyms - The `browseSynonyms` object.
     * @param browseSynonyms.indexName - The index in which to perform the request.
     * @param browseSynonyms.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
     * @param browseSynonyms.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param browseSynonyms.searchSynonymsParams - The `searchSynonyms` method parameters.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchSynonyms` method and merged with the transporter requestOptions.
     */
    browseSynonyms({ indexName, searchSynonymsParams, ...browseSynonymsOptions }: BrowseOptions<SearchSynonymsResponse> & SearchSynonymsProps, requestOptions?: RequestOptions | undefined): Promise<SearchSynonymsResponse>;
    /**
     * Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
     *
     * @summary Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
     * @param chunkedBatch - The `chunkedBatch` object.
     * @param chunkedBatch.indexName - The `indexName` to replace `objects` in.
     * @param chunkedBatch.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param chunkedBatch.action - The `batch` `action` to perform on the given array of `objects`, defaults to `addObject`.
     * @param chunkedBatch.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param chunkedBatch.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    chunkedBatch({ indexName, objects, action, waitForTasks, batchSize }: ChunkedBatchOptions, requestOptions?: RequestOptions): Promise<Array<BatchResponse>>;
    /**
     * Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     *
     * @summary Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     * @param saveObjects - The `saveObjects` object.
     * @param saveObjects.indexName - The `indexName` to save `objects` in.
     * @param saveObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param saveObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param saveObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
     */
    saveObjects({ indexName, objects, waitForTasks, batchSize }: SaveObjectsOptions, requestOptions?: RequestOptions | undefined): Promise<BatchResponse[]>;
    /**
     * Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
     *
     * @summary Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
     * @param deleteObjects - The `deleteObjects` object.
     * @param deleteObjects.indexName - The `indexName` to delete `objectIDs` from.
     * @param deleteObjects.objectIDs - The objectIDs to delete.
     * @param deleteObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param deleteObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
     */
    deleteObjects({ indexName, objectIDs, waitForTasks, batchSize }: DeleteObjectsOptions, requestOptions?: RequestOptions | undefined): Promise<BatchResponse[]>;
    /**
     * Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     *
     * @summary Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     * @param partialUpdateObjects - The `partialUpdateObjects` object.
     * @param partialUpdateObjects.indexName - The `indexName` to update `objects` in.
     * @param partialUpdateObjects.objects - The array of `objects` to update in the given Algolia `indexName`.
     * @param partialUpdateObjects.createIfNotExists - To be provided if non-existing objects are passed, otherwise, the call will fail..
     * @param partialUpdateObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param partialUpdateObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    partialUpdateObjects({ indexName, objects, createIfNotExists, waitForTasks, batchSize }: PartialUpdateObjectsOptions, requestOptions?: RequestOptions | undefined): Promise<BatchResponse[]>;
    /**
     * Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
     * See https://api-clients-automation.netlify.app/docs/custom-helpers/#replaceallobjects for implementation details.
     *
     * @summary Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
     * @param replaceAllObjects - The `replaceAllObjects` object.
     * @param replaceAllObjects.indexName - The `indexName` to replace `objects` in.
     * @param replaceAllObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param replaceAllObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `objects.length / batchSize`. Defaults to 1000.
     * @param replaceAllObjects.scopes - The `scopes` to keep from the index. Defaults to ['settings', 'rules', 'synonyms'].
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch`, `operationIndex` and `getTask` method and merged with the transporter requestOptions.
     */
    replaceAllObjects({ indexName, objects, batchSize, scopes }: ReplaceAllObjectsOptions, requestOptions?: RequestOptions | undefined): Promise<ReplaceAllObjectsResponse>;
    indexExists({ indexName }: GetSettingsProps): Promise<boolean>;
    /**
     * Helper: calls the `search` method but with certainty that we will only request Algolia records (hits) and not facets.
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `hits` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `hits`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForHits<T>(searchMethodParams: LegacySearchMethodProps$1 | SearchMethodParams$1, requestOptions?: RequestOptions | undefined): Promise<{
        results: Array<SearchResponse$2<T>>;
    }>;
    /**
     * Helper: calls the `search` method but with certainty that we will only request Algolia facets and not records (hits).
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `facets` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `facets`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForFacets(searchMethodParams: LegacySearchMethodProps$1 | SearchMethodParams$1, requestOptions?: RequestOptions | undefined): Promise<{
        results: Array<SearchForFacetValuesResponse$2>;
    }>;
    /**
     * Creates a new API key with specific permissions and restrictions.
     *
     * Required API Key ACLs:
     *  - admin
     * @param apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    addApiKey(apiKey: ApiKey, requestOptions?: RequestOptions): Promise<AddApiKeyResponse>;
    /**
     * If a record with the specified object ID exists, the existing record is replaced. Otherwise, a new record is added to the index.  If you want to use auto-generated object IDs, use the [`saveObject` operation](#tag/Records/operation/saveObject). To update _some_ attributes of an existing record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject) instead. To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param addOrUpdateObject - The addOrUpdateObject object.
     * @param addOrUpdateObject.indexName - Name of the index on which to perform the operation.
     * @param addOrUpdateObject.objectID - Unique record identifier.
     * @param addOrUpdateObject.body - The record. A schemaless object with attributes that are useful in the context of search and discovery.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    addOrUpdateObject<T extends object>({ indexName, objectID, body }: AddOrUpdateObjectProps<T>, requestOptions?: RequestOptions): Promise<UpdatedAtWithObjectIdResponse>;
    /**
     * Adds a source to the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param source - Source to add.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    appendSource(source: Source, requestOptions?: RequestOptions): Promise<CreatedAtResponse>;
    /**
     * Assigns or moves a user ID to a cluster.  The time it takes to move a user is proportional to the amount of data linked to the user ID.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param assignUserId - The assignUserId object.
     * @param assignUserId.xAlgoliaUserID - Unique identifier of the user who makes the search request.
     * @param assignUserId.assignUserIdParams - The assignUserIdParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    assignUserId({ xAlgoliaUserID, assignUserIdParams }: AssignUserIdProps, requestOptions?: RequestOptions): Promise<CreatedAtResponse>;
    /**
     * Adds, updates, or deletes records in one index with a single API request.  Batching index updates reduces latency and increases data integrity.  - Actions are applied in the order they\'re specified. - Actions are equivalent to the individual API requests of the same name.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     * @param batch - The batch object.
     * @param batch.indexName - Name of the index on which to perform the operation.
     * @param batch.batchWriteParams - The batchWriteParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batch({ indexName, batchWriteParams }: BatchProps, requestOptions?: RequestOptions): Promise<BatchResponse>;
    /**
     * Assigns multiple user IDs to a cluster.  **You can\'t move users with this operation**.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param batchAssignUserIds - The batchAssignUserIds object.
     * @param batchAssignUserIds.xAlgoliaUserID - Unique identifier of the user who makes the search request.
     * @param batchAssignUserIds.batchAssignUserIdsParams - The batchAssignUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batchAssignUserIds({ xAlgoliaUserID, batchAssignUserIdsParams }: BatchAssignUserIdsProps, requestOptions?: RequestOptions): Promise<CreatedAtResponse>;
    /**
     * Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param batchDictionaryEntries - The batchDictionaryEntries object.
     * @param batchDictionaryEntries.dictionaryName - Dictionary type in which to search.
     * @param batchDictionaryEntries.batchDictionaryEntriesParams - The batchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batchDictionaryEntries({ dictionaryName, batchDictionaryEntriesParams }: BatchDictionaryEntriesProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Retrieves records from an index, up to 1,000 per request.  While searching retrieves _hits_ (records augmented with attributes for highlighting and ranking details), browsing _just_ returns matching records. This can be useful if you want to export your indices.  - The Analytics API doesn\'t collect data when using `browse`. - Records are ranked by attributes and custom ranking. - There\'s no ranking for: typo-tolerance, number of matched words, proximity, geo distance.  Browse requests automatically apply these settings:  - `advancedSyntax`: `false` - `attributesToHighlight`: `[]` - `attributesToSnippet`: `[]` - `distinct`: `false` - `enablePersonalization`: `false` - `enableRules`: `false` - `facets`: `[]` - `getRankingInfo`: `false` - `ignorePlurals`: `false` - `optionalFilters`: `[]` - `typoTolerance`: `true` or `false` (`min` and `strict` evaluate to `true`)  If you send these parameters with your browse requests, they\'ll be ignored.
     *
     * Required API Key ACLs:
     *  - browse
     * @param browse - The browse object.
     * @param browse.indexName - Name of the index on which to perform the operation.
     * @param browse.browseParams - The browseParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    browse<T>({ indexName, browseParams }: BrowseProps, requestOptions?: RequestOptions): Promise<BrowseResponse<T>>;
    /**
     * Deletes only the records from an index while keeping settings, synonyms, and rules. This operation is resource-intensive and subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param clearObjects - The clearObjects object.
     * @param clearObjects.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearObjects({ indexName }: ClearObjectsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Deletes all rules from the index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param clearRules - The clearRules object.
     * @param clearRules.indexName - Name of the index on which to perform the operation.
     * @param clearRules.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearRules({ indexName, forwardToReplicas }: ClearRulesProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Deletes all synonyms from the index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param clearSynonyms - The clearSynonyms object.
     * @param clearSynonyms.indexName - Name of the index on which to perform the operation.
     * @param clearSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearSynonyms({ indexName, forwardToReplicas }: ClearSynonymsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, for example `1/newFeature`.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }: CustomDeleteProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>>;
    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, for example `1/newFeature`.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }: CustomGetProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>>;
    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, for example `1/newFeature`.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }: CustomPostProps$1, requestOptions?: RequestOptions): Promise<Record<string, unknown>>;
    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, for example `1/newFeature`.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }: CustomPutProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>>;
    /**
     * Deletes the API key.
     *
     * Required API Key ACLs:
     *  - admin
     * @param deleteApiKey - The deleteApiKey object.
     * @param deleteApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteApiKey({ key }: DeleteApiKeyProps, requestOptions?: RequestOptions): Promise<DeleteApiKeyResponse>;
    /**
     * This operation doesn\'t accept empty filters.  This operation is resource-intensive. You should only use it if you can\'t get the object IDs of the records you want to delete. It\'s more efficient to get a list of object IDs with the [`browse` operation](#tag/Search/operation/browse), and then delete the records using the [`batch` operation](#tag/Records/operation/batch).  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param deleteBy - The deleteBy object.
     * @param deleteBy.indexName - Name of the index on which to perform the operation.
     * @param deleteBy.deleteByParams - The deleteByParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteBy({ indexName, deleteByParams }: DeleteByProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Deletes an index and all its settings.  - Deleting an index doesn\'t delete its analytics data. - If you try to delete a non-existing index, the operation is ignored without warning. - If the index you want to delete has replica indices, the replicas become independent indices. - If the index you want to delete is a replica index, you must first unlink it from its primary index before you can delete it.   For more information, see [Delete replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/deleting-replicas/).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param deleteIndex - The deleteIndex object.
     * @param deleteIndex.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteIndex({ indexName }: DeleteIndexProps, requestOptions?: RequestOptions): Promise<DeletedAtResponse>;
    /**
     * Deletes a record by its object ID.  To delete more than one record, use the [`batch` operation](#tag/Records/operation/batch). To delete records matching a query, use the [`deleteBy` operation](#tag/Records/operation/deleteBy).
     *
     * Required API Key ACLs:
     *  - deleteObject
     * @param deleteObject - The deleteObject object.
     * @param deleteObject.indexName - Name of the index on which to perform the operation.
     * @param deleteObject.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteObject({ indexName, objectID }: DeleteObjectProps, requestOptions?: RequestOptions): Promise<DeletedAtResponse>;
    /**
     * Deletes a rule by its ID. To find the object ID for rules, use the [`search` operation](#tag/Rules/operation/searchRules).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteRule - The deleteRule object.
     * @param deleteRule.indexName - Name of the index on which to perform the operation.
     * @param deleteRule.objectID - Unique identifier of a rule object.
     * @param deleteRule.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteRule({ indexName, objectID, forwardToReplicas }: DeleteRuleProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Deletes a source from the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param deleteSource - The deleteSource object.
     * @param deleteSource.source - IP address range of the source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteSource({ source }: DeleteSourceProps, requestOptions?: RequestOptions): Promise<DeleteSourceResponse>;
    /**
     * Deletes a synonym by its ID. To find the object IDs of your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteSynonym - The deleteSynonym object.
     * @param deleteSynonym.indexName - Name of the index on which to perform the operation.
     * @param deleteSynonym.objectID - Unique identifier of a synonym object.
     * @param deleteSynonym.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteSynonym({ indexName, objectID, forwardToReplicas }: DeleteSynonymProps, requestOptions?: RequestOptions): Promise<DeletedAtResponse>;
    /**
     * Gets the permissions and restrictions of an API key.  When authenticating with the admin API key, you can request information for any of your application\'s keys. When authenticating with other API keys, you can only retrieve information for that key, with the description replaced by `<redacted>`.
     * @param getApiKey - The getApiKey object.
     * @param getApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getApiKey({ key }: GetApiKeyProps, requestOptions?: RequestOptions): Promise<GetApiKeyResponse>;
    /**
     * Checks the status of a given application task.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param getAppTask - The getAppTask object.
     * @param getAppTask.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAppTask({ taskID }: GetAppTaskProps, requestOptions?: RequestOptions): Promise<GetTaskResponse>;
    /**
     * Lists supported languages with their supported dictionary types and number of custom entries.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getDictionaryLanguages(requestOptions?: RequestOptions | undefined): Promise<{
        [key: string]: Languages;
    }>;
    /**
     * Retrieves the languages for which standard dictionary entries are turned off.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getDictionarySettings(requestOptions?: RequestOptions | undefined): Promise<GetDictionarySettingsResponse>;
    /**
     * The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).  - Logs are held for the last seven days. - Up to 1,000 API requests per server are logged. - This request counts towards your [operations quota](https://support.algolia.com/hc/en-us/articles/4406981829777-How-does-Algolia-count-records-and-operations-) but doesn\'t appear in the logs itself.
     *
     * Required API Key ACLs:
     *  - logs
     * @param getLogs - The getLogs object.
     * @param getLogs.offset - First log entry to retrieve. The most recent entries are listed first.
     * @param getLogs.length - Maximum number of entries to retrieve.
     * @param getLogs.indexName - Index for which to retrieve log entries. By default, log entries are retrieved for all indices.
     * @param getLogs.type - Type of log entries to retrieve. By default, all log entries are retrieved.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getLogs({ offset, length, indexName, type }?: GetLogsProps, requestOptions?: RequestOptions | undefined): Promise<GetLogsResponse>;
    /**
     * Retrieves one record by its object ID.  To retrieve more than one record, use the [`objects` operation](#tag/Records/operation/getObjects).
     *
     * Required API Key ACLs:
     *  - search
     * @param getObject - The getObject object.
     * @param getObject.indexName - Name of the index on which to perform the operation.
     * @param getObject.objectID - Unique record identifier.
     * @param getObject.attributesToRetrieve - Attributes to include with the records in the response. This is useful to reduce the size of the API response. By default, all retrievable attributes are returned.  `objectID` is always retrieved.  Attributes included in `unretrievableAttributes` won\'t be retrieved unless the request is authenticated with the admin API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getObject({ indexName, objectID, attributesToRetrieve }: GetObjectProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>>;
    /**
     * Retrieves one or more records, potentially from different indices.  Records are returned in the same order as the requests.
     *
     * Required API Key ACLs:
     *  - search
     * @param getObjectsParams - Request object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getObjects<T>(getObjectsParams: GetObjectsParams, requestOptions?: RequestOptions): Promise<GetObjectsResponse<T>>;
    /**
     * Retrieves a rule by its ID. To find the object ID of rules, use the [`search` operation](#tag/Rules/operation/searchRules).
     *
     * Required API Key ACLs:
     *  - settings
     * @param getRule - The getRule object.
     * @param getRule.indexName - Name of the index on which to perform the operation.
     * @param getRule.objectID - Unique identifier of a rule object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRule({ indexName, objectID }: GetRuleProps, requestOptions?: RequestOptions): Promise<Rule>;
    /**
     * Retrieves an object with non-null index settings.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getSettings - The getSettings object.
     * @param getSettings.indexName - Name of the index on which to perform the operation.
     * @param getSettings.getVersion - When set to 2, the endpoint will not include `synonyms` in the response. This parameter is here for backward compatibility.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSettings({ indexName, getVersion }: GetSettingsProps, requestOptions?: RequestOptions): Promise<SettingsResponse>;
    /**
     * Retrieves all allowed IP addresses with access to your application.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSources(requestOptions?: RequestOptions | undefined): Promise<Array<Source>>;
    /**
     * Retrieves a synonym by its ID. To find the object IDs for your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
     *
     * Required API Key ACLs:
     *  - settings
     * @param getSynonym - The getSynonym object.
     * @param getSynonym.indexName - Name of the index on which to perform the operation.
     * @param getSynonym.objectID - Unique identifier of a synonym object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSynonym({ indexName, objectID }: GetSynonymProps, requestOptions?: RequestOptions): Promise<SynonymHit>;
    /**
     * Checks the status of a given task.  Indexing tasks are asynchronous. When you add, update, or delete records or indices, a task is created on a queue and completed depending on the load on the server.  The indexing tasks\' responses include a task ID that you can use to check the status.
     *
     * Required API Key ACLs:
     *  - addObject
     * @param getTask - The getTask object.
     * @param getTask.indexName - Name of the index on which to perform the operation.
     * @param getTask.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTask({ indexName, taskID }: GetTaskProps, requestOptions?: RequestOptions): Promise<GetTaskResponse>;
    /**
     * Get the IDs of the 10 users with the highest number of records per cluster.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopUserIds(requestOptions?: RequestOptions | undefined): Promise<GetTopUserIdsResponse>;
    /**
     * Returns the user ID data stored in the mapping.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param getUserId - The getUserId object.
     * @param getUserId.userID - Unique identifier of the user who makes the search request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getUserId({ userID }: GetUserIdProps, requestOptions?: RequestOptions): Promise<UserId>;
    /**
     * To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param hasPendingMappings - The hasPendingMappings object.
     * @param hasPendingMappings.getClusters - Whether to include the cluster\'s pending mapping state in the response.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    hasPendingMappings({ getClusters }?: HasPendingMappingsProps, requestOptions?: RequestOptions | undefined): Promise<HasPendingMappingsResponse>;
    /**
     * Lists all API keys associated with your Algolia application, including their permissions and restrictions.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listApiKeys(requestOptions?: RequestOptions | undefined): Promise<ListApiKeysResponse>;
    /**
     * Lists the available clusters in a multi-cluster setup.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listClusters(requestOptions?: RequestOptions | undefined): Promise<ListClustersResponse>;
    /**
     * Lists all indices in the current Algolia application.  The request follows any index restrictions of the API key you use to make the request.
     *
     * Required API Key ACLs:
     *  - listIndexes
     * @param listIndices - The listIndices object.
     * @param listIndices.page - Requested page of the API response. If `null`, the API response is not paginated.
     * @param listIndices.hitsPerPage - Number of hits per page.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listIndices({ page, hitsPerPage }?: ListIndicesProps, requestOptions?: RequestOptions | undefined): Promise<ListIndicesResponse>;
    /**
     * Lists the userIDs assigned to a multi-cluster application.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param listUserIds - The listUserIds object.
     * @param listUserIds.page - Requested page of the API response. If `null`, the API response is not paginated.
     * @param listUserIds.hitsPerPage - Number of hits per page.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listUserIds({ page, hitsPerPage }?: ListUserIdsProps, requestOptions?: RequestOptions | undefined): Promise<ListUserIdsResponse>;
    /**
     * Adds, updates, or deletes records in multiple indices with a single API request.  - Actions are applied in the order they are specified. - Actions are equivalent to the individual API requests of the same name.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     * @param batchParams - The batchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    multipleBatch(batchParams: BatchParams, requestOptions?: RequestOptions): Promise<MultipleBatchResponse>;
    /**
     * Copies or moves (renames) an index within the same Algolia application.  - Existing destination indices are overwritten, except for their analytics data. - If the destination index doesn\'t exist yet, it\'ll be created. - This operation is resource-intensive.  **Copy**  - Copying a source index that doesn\'t exist creates a new index with 0 records and default settings. - The API keys of the source index are merged with the existing keys in the destination index. - You can\'t copy the `enableReRanking`, `mode`, and `replicas` settings. - You can\'t copy to a destination index that already has replicas. - Be aware of the [size limits](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits). - Related guide: [Copy indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices/)  **Move**  - Moving a source index that doesn\'t exist is ignored without returning an error. - When moving an index, the analytics data keeps its original name, and a new set of analytics data is started for the new name.   To access the original analytics in the dashboard, create an index with the original name. - If the destination index has replicas, moving will overwrite the existing index and copy the data to the replica indices. - Related guide: [Move indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices/).  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param operationIndex - The operationIndex object.
     * @param operationIndex.indexName - Name of the index on which to perform the operation.
     * @param operationIndex.operationIndexParams - The operationIndexParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    operationIndex({ indexName, operationIndexParams }: OperationIndexProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Adds new attributes to a record, or updates existing ones.  - If a record with the specified object ID doesn\'t exist,   a new record is added to the index **if** `createIfNotExists` is true. - If the index doesn\'t exist yet, this method creates a new index. - You can use any first-level attribute but not nested attributes.   If you specify a nested attribute, this operation replaces its first-level ancestor.  To update an attribute without pushing the entire record, you can use these built-in operations. These operations can be helpful if you don\'t have access to your initial data.  - Increment: increment a numeric attribute - Decrement: decrement a numeric attribute - Add: append a number or string element to an array attribute - Remove: remove all matching number or string elements from an array attribute made of numbers or strings - AddUnique: add a number or string element to an array attribute made of numbers or strings only if it\'s not already present - IncrementFrom: increment a numeric integer attribute only if the provided value matches the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementFrom value of 2 for the version attribute, but the current value of the attribute is 1, the engine ignores the update. If the object doesn\'t exist, the engine only creates it if you pass an IncrementFrom value of 0. - IncrementSet: increment a numeric integer attribute only if the provided value is greater than the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementSet value of 2 for the version attribute, and the current value of the attribute is 1, the engine updates the object. If the object doesn\'t exist yet, the engine only creates it if you pass an IncrementSet value greater than 0.  You can specify an operation by providing an object with the attribute to update as the key and its value being an object with the following properties:  - _operation: the operation to apply on the attribute - value: the right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.  When updating multiple attributes or using multiple operations targeting the same record, you should use a single partial update for faster processing.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param partialUpdateObject - The partialUpdateObject object.
     * @param partialUpdateObject.indexName - Name of the index on which to perform the operation.
     * @param partialUpdateObject.objectID - Unique record identifier.
     * @param partialUpdateObject.attributesToUpdate - Attributes with their values.
     * @param partialUpdateObject.createIfNotExists - Whether to create a new record if it doesn\'t exist.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    partialUpdateObject({ indexName, objectID, attributesToUpdate, createIfNotExists }: PartialUpdateObjectProps, requestOptions?: RequestOptions): Promise<UpdatedAtWithObjectIdResponse>;
    /**
     * Deletes a user ID and its associated data from the clusters.
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param removeUserId - The removeUserId object.
     * @param removeUserId.userID - Unique identifier of the user who makes the search request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    removeUserId({ userID }: RemoveUserIdProps, requestOptions?: RequestOptions): Promise<RemoveUserIdResponse>;
    /**
     * Replaces the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param replaceSources - The replaceSources object.
     * @param replaceSources.source - Allowed sources.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    replaceSources({ source }: ReplaceSourcesProps, requestOptions?: RequestOptions): Promise<ReplaceSourceResponse>;
    /**
     * Restores a deleted API key.  Restoring resets the `validity` attribute to `0`.  Algolia stores up to 1,000 API keys per application. If you create more, the oldest API keys are deleted and can\'t be restored.
     *
     * Required API Key ACLs:
     *  - admin
     * @param restoreApiKey - The restoreApiKey object.
     * @param restoreApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    restoreApiKey({ key }: RestoreApiKeyProps, requestOptions?: RequestOptions): Promise<AddApiKeyResponse>;
    /**
     * Adds a record to an index or replaces it.  - If the record doesn\'t have an object ID, a new record with an auto-generated object ID is added to your index. - If a record with the specified object ID exists, the existing record is replaced. - If a record with the specified object ID doesn\'t exist, a new record is added to your index. - If you add a record to an index that doesn\'t exist yet, a new index is created.  To update _some_ attributes of a record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject). To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param saveObject - The saveObject object.
     * @param saveObject.indexName - Name of the index on which to perform the operation.
     * @param saveObject.body - The record. A schemaless object with attributes that are useful in the context of search and discovery.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveObject<T extends object>({ indexName, body }: SaveObjectProps<T>, requestOptions?: RequestOptions): Promise<SaveObjectResponse>;
    /**
     * If a rule with the specified object ID doesn\'t exist, it\'s created. Otherwise, the existing rule is replaced.  To create or update more than one rule, use the [`batch` operation](#tag/Rules/operation/saveRules).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveRule - The saveRule object.
     * @param saveRule.indexName - Name of the index on which to perform the operation.
     * @param saveRule.objectID - Unique identifier of a rule object.
     * @param saveRule.rule - The rule object.
     * @param saveRule.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveRule({ indexName, objectID, rule, forwardToReplicas }: SaveRuleProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Create or update multiple rules.  If a rule with the specified object ID doesn\'t exist, Algolia creates a new one. Otherwise, existing rules are replaced.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveRules - The saveRules object.
     * @param saveRules.indexName - Name of the index on which to perform the operation.
     * @param saveRules.rules - The rules object.
     * @param saveRules.forwardToReplicas - Whether changes are applied to replica indices.
     * @param saveRules.clearExistingRules - Whether existing rules should be deleted before adding this batch.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveRules({ indexName, rules, forwardToReplicas, clearExistingRules }: SaveRulesProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * If a synonym with the specified object ID doesn\'t exist, Algolia adds a new one. Otherwise, the existing synonym is replaced. To add multiple synonyms in a single API request, use the [`batch` operation](#tag/Synonyms/operation/saveSynonyms).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveSynonym - The saveSynonym object.
     * @param saveSynonym.indexName - Name of the index on which to perform the operation.
     * @param saveSynonym.objectID - Unique identifier of a synonym object.
     * @param saveSynonym.synonymHit - The synonymHit object.
     * @param saveSynonym.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveSynonym({ indexName, objectID, synonymHit, forwardToReplicas }: SaveSynonymProps, requestOptions?: RequestOptions): Promise<SaveSynonymResponse>;
    /**
     * If a synonym with the `objectID` doesn\'t exist, Algolia adds a new one. Otherwise, existing synonyms are replaced.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveSynonyms - The saveSynonyms object.
     * @param saveSynonyms.indexName - Name of the index on which to perform the operation.
     * @param saveSynonyms.synonymHit - The synonymHit object.
     * @param saveSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
     * @param saveSynonyms.replaceExistingSynonyms - Whether to replace all synonyms in the index with the ones sent with this request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveSynonyms({ indexName, synonymHit, forwardToReplicas, replaceExistingSynonyms }: SaveSynonymsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Sends multiple search requests to one or more indices.  This can be useful in these cases:  - Different indices for different purposes, such as, one index for products, another one for marketing content. - Multiple searches to the same index—for example, with different filters.  Use the helper `searchForHits` or `searchForFacets` to get the results in a more convenient format, if you already know the return type you want.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchMethodParams - Muli-search request body. Results are returned in the same order as the requests.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    search<T>(searchMethodParams: SearchMethodParams$1 | LegacySearchMethodProps$1, requestOptions?: RequestOptions): Promise<SearchResponses$1<T>>;
    /**
     * Searches for standard and custom dictionary entries.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchDictionaryEntries - The searchDictionaryEntries object.
     * @param searchDictionaryEntries.dictionaryName - Dictionary type in which to search.
     * @param searchDictionaryEntries.searchDictionaryEntriesParams - The searchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchDictionaryEntries({ dictionaryName, searchDictionaryEntriesParams }: SearchDictionaryEntriesProps, requestOptions?: RequestOptions): Promise<SearchDictionaryEntriesResponse>;
    /**
     * Searches for values of a specified facet attribute.  - By default, facet values are sorted by decreasing count.   You can adjust this with the `sortFacetValueBy` parameter. - Searching for facet values doesn\'t work if you have **more than 65 searchable facets and searchable attributes combined**.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchForFacetValues - The searchForFacetValues object.
     * @param searchForFacetValues.indexName - Name of the index on which to perform the operation.
     * @param searchForFacetValues.facetName - Facet attribute in which to search for values.  This attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.
     * @param searchForFacetValues.searchForFacetValuesRequest - The searchForFacetValuesRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForFacetValues({ indexName, facetName, searchForFacetValuesRequest }: SearchForFacetValuesProps, requestOptions?: RequestOptions): Promise<SearchForFacetValuesResponse$2>;
    /**
     * Searches for rules in your index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchRules - The searchRules object.
     * @param searchRules.indexName - Name of the index on which to perform the operation.
     * @param searchRules.searchRulesParams - The searchRulesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchRules({ indexName, searchRulesParams }: SearchRulesProps, requestOptions?: RequestOptions): Promise<SearchRulesResponse>;
    /**
     * Searches a single index and returns matching search results (_hits_).  This method lets you retrieve up to 1,000 hits. If you need more, use the [`browse` operation](#tag/Search/operation/browse) or increase the `paginatedLimitedTo` index setting.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchSingleIndex - The searchSingleIndex object.
     * @param searchSingleIndex.indexName - Name of the index on which to perform the operation.
     * @param searchSingleIndex.searchParams - The searchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchSingleIndex<T>({ indexName, searchParams }: SearchSingleIndexProps, requestOptions?: RequestOptions): Promise<SearchResponse$2<T>>;
    /**
     * Searches for synonyms in your index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchSynonyms - The searchSynonyms object.
     * @param searchSynonyms.indexName - Name of the index on which to perform the operation.
     * @param searchSynonyms.searchSynonymsParams - Body of the `searchSynonyms` operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchSynonyms({ indexName, searchSynonymsParams }: SearchSynonymsProps, requestOptions?: RequestOptions): Promise<SearchSynonymsResponse>;
    /**
     * Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.  To ensure rapid updates, the user IDs index isn\'t built at the same time as the mapping. Instead, it\'s built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).
     *
     * Required API Key ACLs:
     *  - admin
     *
     * @deprecated
     * @param searchUserIdsParams - The searchUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchUserIds(searchUserIdsParams: SearchUserIdsParams, requestOptions?: RequestOptions): Promise<SearchUserIdsResponse>;
    /**
     * Turns standard stop word dictionary entries on or off for a given language.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param dictionarySettingsParams - The dictionarySettingsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    setDictionarySettings(dictionarySettingsParams: DictionarySettingsParams, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Update the specified index settings.  Index settings that you don\'t specify are left unchanged. Specify `null` to reset a setting to its default value.  For best performance, update the index settings before you add new records to your index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param setSettings - The setSettings object.
     * @param setSettings.indexName - Name of the index on which to perform the operation.
     * @param setSettings.indexSettings - The indexSettings object.
     * @param setSettings.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    setSettings({ indexName, indexSettings, forwardToReplicas }: SetSettingsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse>;
    /**
     * Replaces the permissions of an existing API key.  Any unspecified attribute resets that attribute to its default value.
     *
     * Required API Key ACLs:
     *  - admin
     * @param updateApiKey - The updateApiKey object.
     * @param updateApiKey.key - API key.
     * @param updateApiKey.apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateApiKey({ key, apiKey }: UpdateApiKeyProps, requestOptions?: RequestOptions): Promise<UpdateApiKeyResponse>;
};

type SearchClient$1 = ReturnType<typeof createSearchClient> & SearchClientNodeHelpers;

declare function searchClient(appId: string, apiKey: string, options?: ClientOptions | undefined): SearchClient$1;

declare type MaybePromise<TResolution> = Promise<TResolution> | TResolution;

/**
 * Range object with lower and upper values in meters to define custom ranges.
 */
type Range = {
    /**
     * Lower boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.
     */
    from?: number | undefined;
    /**
     * Upper boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.
     */
    value?: number | undefined;
};

/**
 * Precision of a coordinate-based search in meters to group results with similar distances.  The Geo ranking criterion considers all matches within the same range of distances to be equal.
 */
type AroundPrecision = number | Array<Range>;

/**
 * Return all records with a valid `_geoloc` attribute. Don\'t filter by distance.
 */
type AroundRadiusAll = 'all';

/**
 * Maximum radius for a search around a central location.  This parameter works in combination with the `aroundLatLng` and `aroundLatLngViaIP` parameters. By default, the search radius is determined automatically from the density of hits around the central location. The search radius is small if there are many hits close to the central coordinates.
 */
type AroundRadius = number | AroundRadiusAll;

/**
 * Filter the search by facet values, so that only records with the same facet values are retrieved.  **Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**  - `[filter1, filter2]` is interpreted as `filter1 AND filter2`. - `[[filter1, filter2], filter3]` is interpreted as `filter1 OR filter2 AND filter3`. - `facet:-value` is interpreted as `NOT facet:value`.  While it\'s best to avoid attributes that start with a `-`, you can still filter them by escaping with a backslash: `facet:\\-value`.
 */
type FacetFilters = Array<FacetFilters> | string;

type InsideBoundingBox = string | Array<Array<number>>;

/**
 * Filter by numeric facets.  **Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**  You can use numeric comparison operators: `<`, `<=`, `=`, `!=`, `>`, `>=`. Comparisons are precise up to 3 decimals. You can also provide ranges: `facet:<lower> TO <upper>`. The range includes the lower and upper boundaries. The same combination rules apply as for `facetFilters`.
 */
type NumericFilters = Array<NumericFilters> | string;

/**
 * Filters to promote or demote records in the search results.  Optional filters work like facet filters, but they don\'t exclude records from the search results. Records that match the optional filter rank before records that don\'t match. If you\'re using a negative filter `facet:-value`, matching records rank after records that don\'t match.  - Optional filters don\'t work on virtual replicas. - Optional filters are applied _after_ sort-by attributes. - Optional filters are applied _before_ custom ranking attributes (in the default [ranking](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/)). - Optional filters don\'t work with numeric attributes.
 */
type OptionalFilters = Array<OptionalFilters> | string;

/**
 * ISO code for a supported language.
 */
type SupportedLanguage = 'af' | 'ar' | 'az' | 'bg' | 'bn' | 'ca' | 'cs' | 'cy' | 'da' | 'de' | 'el' | 'en' | 'eo' | 'es' | 'et' | 'eu' | 'fa' | 'fi' | 'fo' | 'fr' | 'ga' | 'gl' | 'he' | 'hi' | 'hu' | 'hy' | 'id' | 'is' | 'it' | 'ja' | 'ka' | 'kk' | 'ko' | 'ku' | 'ky' | 'lt' | 'lv' | 'mi' | 'mn' | 'mr' | 'ms' | 'mt' | 'nb' | 'nl' | 'no' | 'ns' | 'pl' | 'ps' | 'pt' | 'pt-br' | 'qu' | 'ro' | 'ru' | 'sk' | 'sq' | 'sv' | 'sw' | 'ta' | 'te' | 'th' | 'tl' | 'tn' | 'tr' | 'tt' | 'uk' | 'ur' | 'uz' | 'zh';

/**
 * Filter the search by values of the special `_tags` attribute.  **Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**  Different from regular facets, `_tags` can only be used for filtering (including or excluding records). You won\'t get a facet count. The same combination and escaping rules apply as for `facetFilters`.
 */
type TagFilters = Array<TagFilters> | string;

type BaseRecommendSearchParams = {
    /**
     * Keywords to be used instead of the search query to conduct a more broader search Using the `similarQuery` parameter changes other settings - `queryType` is set to `prefixNone`. - `removeStopWords` is set to true. - `words` is set as the first ranking criterion. - All remaining words are treated as `optionalWords` Since the `similarQuery` is supposed to do a broad search, they usually return many results. Combine it with `filters` to narrow down the list of results.
     */
    similarQuery?: string | undefined;
    /**
     * Filter expression to only include items that match the filter criteria in the response.  You can use these filter expressions:  - **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`. - **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive). - **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value. - **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive). - **Boolean filters.** `<facet>: true | false`.  You can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:  - You can only combine filters of the same type with `OR`.   **Not supported:** `facet:value OR num > 3`. - You can\'t use `NOT` with combinations of filters.   **Not supported:** `NOT(facet:value OR facet:value)` - You can\'t combine conjunctions (`AND`) with `OR`.   **Not supported:** `facet:value OR (facet:value AND facet:value)`  Use quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes. If a facet attribute is an array, the filter matches if it matches at least one element of the array.  For more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).
     */
    filters?: string | undefined;
    facetFilters?: FacetFilters | undefined;
    optionalFilters?: OptionalFilters | undefined;
    numericFilters?: NumericFilters | undefined;
    tagFilters?: TagFilters | undefined;
    /**
     * Whether to sum all filter scores If true, all filter scores are summed. Otherwise, the maximum filter score is kept. For more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).
     */
    sumOrFiltersScores?: boolean | undefined;
    /**
     * Restricts a search to a subset of your searchable attributes. Attribute names are case-sensitive.
     */
    restrictSearchableAttributes?: Array<string> | undefined;
    /**
     * Facets for which to retrieve facet values that match the search criteria and the number of matching facet values To retrieve all facets, use the wildcard character `*`. For more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).
     */
    facets?: Array<string> | undefined;
    /**
     * Whether faceting should be applied after deduplication with `distinct` This leads to accurate facet counts when using faceting in combination with `distinct`. It\'s usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting, as `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.
     */
    facetingAfterDistinct?: boolean | undefined;
    /**
     * Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.  Only records included within a circle around this central location are included in the results. The radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings. This parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.
     */
    aroundLatLng?: string | undefined;
    /**
     * Whether to obtain the coordinates from the request\'s IP address.
     */
    aroundLatLngViaIP?: boolean | undefined;
    aroundRadius?: AroundRadius | undefined;
    aroundPrecision?: AroundPrecision | undefined;
    /**
     * Minimum radius (in meters) for a search around a location when `aroundRadius` isn\'t set.
     */
    minimumAroundRadius?: number | undefined;
    insideBoundingBox?: InsideBoundingBox | null | undefined;
    /**
     * Coordinates of a polygon in which to search.  Polygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude. Provide multiple polygons as nested arrays. For more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas). This parameter is ignored if you also specify `insideBoundingBox`.
     */
    insidePolygon?: Array<Array<number>> | undefined;
    /**
     * ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches) - Sets `removeStopWords` and `ignorePlurals` to the list of provided languages. - Sets `removeWordsIfNoResults` to `allOptional`. - Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.
     */
    naturalLanguages?: Array<SupportedLanguage> | undefined;
    /**
     * Assigns a rule context to the search query [Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.
     */
    ruleContexts?: Array<string> | undefined;
    /**
     * Impact that Personalization should have on this search The higher this value is, the more Personalization determines the ranking compared to other factors. For more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).
     */
    personalizationImpact?: number | undefined;
    /**
     * Unique pseudonymous or anonymous user identifier.  This helps with analytics and click and conversion events. For more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/).
     */
    userToken?: string | undefined;
    /**
     * Whether the search response should include detailed ranking information.
     */
    getRankingInfo?: boolean | undefined;
    /**
     * Whether to take into account an index\'s synonyms for this search.
     */
    synonyms?: boolean | undefined;
    /**
     * Whether to include a `queryID` attribute in the response The query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/guides/sending-events/getting-started/).
     */
    clickAnalytics?: boolean | undefined;
    /**
     * Whether this search will be included in Analytics.
     */
    analytics?: boolean | undefined;
    /**
     * Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     */
    analyticsTags?: Array<string> | undefined;
    /**
     * Whether to include this search when calculating processing-time percentiles.
     */
    percentileComputation?: boolean | undefined;
    /**
     * Whether to enable A/B testing for this search.
     */
    enableABTest?: boolean | undefined;
};

type BaseIndexSettings = {
    /**
     * Attributes used for [faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/).  Facets are attributes that let you categorize search results. They can be used for filtering search results. By default, no attribute is used for faceting. Attribute names are case-sensitive.  **Modifiers**  - `filterOnly(\"ATTRIBUTE\")`.   Allows the attribute to be used as a filter but doesn\'t evaluate the facet values.  - `searchable(\"ATTRIBUTE\")`.   Allows searching for facet values.  - `afterDistinct(\"ATTRIBUTE\")`.   Evaluates the facet count _after_ deduplication with `distinct`.   This ensures accurate facet counts.   You can apply this modifier to searchable facets: `afterDistinct(searchable(ATTRIBUTE))`.
     */
    attributesForFaceting?: Array<string> | undefined;
    /**
     * Creates [replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/).  Replicas are copies of a primary index with the same records but different settings, synonyms, or rules. If you want to offer a different ranking or sorting of your search results, you\'ll use replica indices. All index operations on a primary index are automatically forwarded to its replicas. To add a replica index, you must provide the complete set of replicas to this parameter. If you omit a replica from this list, the replica turns into a regular, standalone index that will no longer be synced with the primary index.  **Modifier**  - `virtual(\"REPLICA\")`.   Create a virtual replica,   Virtual replicas don\'t increase the number of records and are optimized for [Relevant sorting](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/relevant-sort/).
     */
    replicas?: Array<string> | undefined;
    /**
     * Maximum number of search results that can be obtained through pagination.  Higher pagination limits might slow down your search. For pagination limits above 1,000, the sorting of results beyond the 1,000th hit can\'t be guaranteed.
     */
    paginationLimitedTo?: number | undefined;
    /**
     * Attributes that can\'t be retrieved at query time.  This can be useful if you want to use an attribute for ranking or to [restrict access](https://www.algolia.com/doc/guides/security/api-keys/how-to/user-restricted-access-to-data/), but don\'t want to include it in the search results. Attribute names are case-sensitive.
     */
    unretrievableAttributes?: Array<string> | undefined;
    /**
     * Creates a list of [words which require exact matches](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#turn-off-typo-tolerance-for-certain-words). This also turns off [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation/) for the specified words.
     */
    disableTypoToleranceOnWords?: Array<string> | undefined;
    /**
     * Attributes, for which you want to support [Japanese transliteration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#japanese-transliteration-and-type-ahead).  Transliteration supports searching in any of the Japanese writing systems. To support transliteration, you must set the indexing language to Japanese. Attribute names are case-sensitive.
     */
    attributesToTransliterate?: Array<string> | undefined;
    /**
     * Attributes for which to split [camel case](https://wikipedia.org/wiki/Camel_case) words. Attribute names are case-sensitive.
     */
    camelCaseAttributes?: Array<string> | undefined;
    /**
     * Searchable attributes to which Algolia should apply [word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-segmentation/) (decompounding). Attribute names are case-sensitive.  Compound words are formed by combining two or more individual words, and are particularly prevalent in Germanic languages—for example, \"firefighter\". With decompounding, the individual components are indexed separately.  You can specify different lists for different languages. Decompounding is supported for these languages: Dutch (`nl`), German (`de`), Finnish (`fi`), Danish (`da`), Swedish (`sv`), and Norwegian (`no`). Decompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark). For example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).
     */
    decompoundedAttributes?: Record<string, unknown> | undefined;
    /**
     * Languages for language-specific processing steps, such as word detection and dictionary settings.  **You should always specify an indexing language.** If you don\'t specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/), or the languages you specified with the `ignorePlurals` or `removeStopWords` parameters. This can lead to unexpected search results. For more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).
     */
    indexLanguages?: Array<SupportedLanguage> | undefined;
    /**
     * Searchable attributes for which you want to turn off [prefix matching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/#adjusting-prefix-search). Attribute names are case-sensitive.
     */
    disablePrefixOnAttributes?: Array<string> | undefined;
    /**
     * Whether arrays with exclusively non-negative integers should be compressed for better performance. If true, the compressed arrays may be reordered.
     */
    allowCompressionOfIntegerArray?: boolean | undefined;
    /**
     * Numeric attributes that can be used as [numerical filters](https://www.algolia.com/doc/guides/managing-results/rules/detecting-intent/how-to/applying-a-custom-filter-for-a-specific-query/#numerical-filters). Attribute names are case-sensitive.  By default, all numeric attributes are available as numerical filters. For faster indexing, reduce the number of numeric attributes.  To turn off filtering for all numeric attributes, specify an attribute that doesn\'t exist in your index, such as `NO_NUMERIC_FILTERING`.  **Modifier**  - `equalOnly(\"ATTRIBUTE\")`.   Support only filtering based on equality comparisons `=` and `!=`.
     */
    numericAttributesForFiltering?: Array<string> | undefined;
    /**
     * Control which non-alphanumeric characters are indexed.  By default, Algolia ignores [non-alphanumeric characters](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/#handling-non-alphanumeric-characters) like hyphen (`-`), plus (`+`), and parentheses (`(`,`)`). To include such characters, define them with `separatorsToIndex`.  Separators are all non-letter characters except spaces and currency characters, such as $€£¥.  With `separatorsToIndex`, Algolia treats separator characters as separate words. For example, in a search for \"Disney+\", Algolia considers \"Disney\" and \"+\" as two separate words.
     */
    separatorsToIndex?: string | undefined;
    /**
     * Attributes used for searching. Attribute names are case-sensitive.  By default, all attributes are searchable and the [Attribute](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#attribute) ranking criterion is turned off. With a non-empty list, Algolia only returns results with matches in the selected attributes. In addition, the Attribute ranking criterion is turned on: matches in attributes that are higher in the list of `searchableAttributes` rank first. To make matches in two attributes rank equally, include them in a comma-separated string, such as `\"title,alternate_title\"`. Attributes with the same priority are always unordered.  For more information, see [Searchable attributes](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/setting-searchable-attributes/).  **Modifier**  - `unordered(\"ATTRIBUTE\")`.   Ignore the position of a match within the attribute.  Without a modifier, matches at the beginning of an attribute rank higher than matches at the end.
     */
    searchableAttributes?: Array<string> | undefined;
    /**
     * An object with custom data.  You can store up to 32kB as custom data.
     */
    userData?: any | null | undefined;
    /**
     * Characters and their normalized replacements. This overrides Algolia\'s default [normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/).
     */
    customNormalization?: {
        [key: string]: {
            [key: string]: string;
        };
    } | undefined;
    /**
     * Attribute that should be used to establish groups of results. Attribute names are case-sensitive.  All records with the same value for this attribute are considered a group. You can combine `attributeForDistinct` with the `distinct` search parameter to control how many items per group are included in the search results.  If you want to use the same attribute also for faceting, use the `afterDistinct` modifier of the `attributesForFaceting` setting. This applies faceting _after_ deduplication, which will result in accurate facet counts.
     */
    attributeForDistinct?: string | undefined;
    /**
     * Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
     */
    maxFacetHits?: number | undefined;
    /**
     * Characters for which diacritics should be preserved.  By default, Algolia removes diacritics from letters. For example, `é` becomes `e`. If this causes issues in your search, you can specify characters that should keep their diacritics.
     */
    keepDiacriticsOnCharacters?: string | undefined;
    /**
     * Attributes to use as [custom ranking](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/). Attribute names are case-sensitive.  The custom ranking attributes decide which items are shown first if the other ranking criteria are equal.  Records with missing values for your selected custom ranking attributes are always sorted last. Boolean attributes are sorted based on their alphabetical order.  **Modifiers**  - `asc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in ascending order.  - `desc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in descending order.  If you use two or more custom ranking attributes, [reduce the precision](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/controlling-custom-ranking-metrics-precision/) of your first attributes, or the other attributes will never be applied.
     */
    customRanking?: Array<string> | undefined;
};

type AdvancedSyntaxFeatures = 'exactPhrase' | 'excludeWords';

type AlternativesAsExact = 'ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym' | 'ignoreConjugations';

/**
 * Determines how many records of a group are included in the search results.  Records with the same value for the `attributeForDistinct` attribute are considered a group. The `distinct` setting controls how many members of the group are returned. This is useful for [deduplication and grouping](https://www.algolia.com/doc/guides/managing-results/refine-results/grouping/#introducing-algolias-distinct-feature).  The `distinct` setting is ignored if `attributeForDistinct` is not set.
 */
type Distinct = boolean | number;

/**
 * Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.  - `attribute`.   The Exact ranking criterion is 1 if the query word and attribute value are the same.   For example, a search for \"road\" will match the value \"road\", but not \"road trip\".  - `none`.   The Exact ranking criterion is ignored on single-word searches.  - `word`.   The Exact ranking criterion is 1 if the query word is found in the attribute value.   The query word must have at least 3 characters and must not be a stop word.   Only exact matches will be highlighted,   partial and prefix matches won\'t.
 */
type ExactOnSingleWordQuery = 'attribute' | 'none' | 'word';

type BooleanString = 'true' | 'false';

/**
 * Treat singular, plurals, and other forms of declensions as equivalent. You should only use this feature for the languages used in your index.
 */
type IgnorePlurals = Array<SupportedLanguage> | BooleanString | boolean;

/**
 * Words that should be considered optional when found in the query.  By default, records must match all words in the search query to be included in the search results. Adding optional words can help to increase the number of search results by running an additional search query that doesn\'t include the optional words. For example, if the search query is \"action video\" and \"video\" is an optional word, the search engine runs two queries. One for \"action video\" and one for \"action\". Records that match all words are ranked higher.  For a search query with 4 or more words **and** all its words are optional, the number of matched words required for a record to be included in the search results increases for every 1,000 records:  - If `optionalWords` has less than 10 words, the required number of matched words increases by 1:   results 1 to 1,000 require 1 matched word, results 1,001 to 2000 need 2 matched words. - If `optionalWords` has 10 or more words, the number of required matched words increases by the number of optional words divided by 5 (rounded down).   For example, with 18 optional words: results 1 to 1,000 require 1 matched word, results 1,001 to 2000 need 4 matched words.  For more information, see [Optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).
 */
type OptionalWords = string | Array<string>;

/**
 * Determines if and how query words are interpreted as prefixes.  By default, only the last query word is treated as a prefix (`prefixLast`). To turn off prefix search, use `prefixNone`. Avoid `prefixAll`, which treats all query words as prefixes. This might lead to counterintuitive results and makes your search slower.  For more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching/).
 */
type QueryType = 'prefixLast' | 'prefixAll' | 'prefixNone';

/**
 * Restrict [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/) to records that match these filters.
 */
type ReRankingApplyFilter = Array<ReRankingApplyFilter> | string;

/**
 * Removes stop words from the search query.  Stop words are common words like articles, conjunctions, prepositions, or pronouns that have little or no meaning on their own. In English, \"the\", \"a\", or \"and\" are stop words.  You should only use this feature for the languages used in your index.
 */
type RemoveStopWords = Array<SupportedLanguage> | boolean;

/**
 * Strategy for removing words from the query when it doesn\'t return any results. This helps to avoid returning empty search results.  - `none`.   No words are removed when a query doesn\'t return results.  - `lastWords`.   Treat the last (then second to last, then third to last) word as optional,   until there are results or at most 5 words have been removed.  - `firstWords`.   Treat the first (then second, then third) word as optional,   until there are results or at most 5 words have been removed.  - `allOptional`.   Treat all words as optional.  For more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results/).
 */
type RemoveWordsIfNoResults = 'none' | 'lastWords' | 'firstWords' | 'allOptional';

/**
 * Order of facet names.
 */
type IndexSettingsFacets = {
    /**
     * Explicit order of facets or facet values.  This setting lets you always show specific facets or facet values at the top of the list.
     */
    order?: Array<string> | undefined;
};

/**
 * Order of facet values that aren\'t explicitly positioned with the `order` setting.  - `count`.   Order remaining facet values by decreasing count.   The count is the number of matching records containing this facet value.  - `alpha`.   Sort facet values alphabetically.  - `hidden`.   Don\'t show facet values that aren\'t explicitly positioned.
 */
type SortRemainingBy = 'count' | 'alpha' | 'hidden';

type Value = {
    /**
     * Explicit order of facets or facet values.  This setting lets you always show specific facets or facet values at the top of the list.
     */
    order?: Array<string> | undefined;
    sortRemainingBy?: SortRemainingBy | undefined;
    /**
     * Hide facet values.
     */
    hide?: Array<string> | undefined;
};

/**
 * Order of facet names and facet values in your UI.
 */
type FacetOrdering = {
    facets?: IndexSettingsFacets | undefined;
    /**
     * Order of facet values. One object for each facet.
     */
    values?: {
        [key: string]: Value;
    } | undefined;
};

/**
 * The redirect rule container.
 */
type RedirectURL = {
    url?: string | undefined;
};

/**
 * URL for an image to show inside a banner.
 */
type BannerImageUrl = {
    url?: string | undefined;
};

/**
 * Image to show inside a banner.
 */
type BannerImage = {
    urls?: Array<BannerImageUrl> | undefined;
    title?: string | undefined;
};

/**
 * Link for a banner defined in the Merchandising Studio.
 */
type BannerLink = {
    url?: string | undefined;
};

/**
 * Banner with image and link to redirect users.
 */
type Banner = {
    image?: BannerImage | undefined;
    link?: BannerLink | undefined;
};

/**
 * Widgets returned from any rules that are applied to the current search.
 */
type Widgets = {
    /**
     * Banners defined in the Merchandising Studio for a given search.
     */
    banners?: Array<Banner> | undefined;
};

/**
 * Extra data that can be used in the search UI.  You can use this to control aspects of your search UI, such as the order of facet names and values without changing your frontend code.
 */
type RenderingContent = {
    facetOrdering?: FacetOrdering | undefined;
    redirect?: RedirectURL | undefined;
    widgets?: Widgets | undefined;
};

/**
 * - `min`. Return matches with the lowest number of typos.   For example, if you have matches without typos, only include those.   But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos). - `strict`. Return matches with the two lowest numbers of typos.   With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.
 */
type TypoToleranceEnum = 'min' | 'strict' | 'true' | 'false';

/**
 * Whether [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/) is enabled and how it is applied.  If typo tolerance is true, `min`, or `strict`, [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation/) are also active.
 */
type TypoTolerance = boolean | TypoToleranceEnum;

type BaseRecommendIndexSettings = {
    /**
     * Attributes to include in the API response To reduce the size of your response, you can retrieve only some of the attributes. Attribute names are case-sensitive - `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings. - To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `[\"*\", \"-ATTRIBUTE\"]`. - The `objectID` attribute is always included.
     */
    attributesToRetrieve?: Array<string> | undefined;
    /**
     * Determines the order in which Algolia returns your results.  By default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/). The tie-breaking algorithm sequentially applies each criterion in the order they\'re specified. If you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/), you put the sorting attribute at the top of the list.  **Modifiers**  - `asc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in ascending order. - `desc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in descending order.  Before you modify the default setting, you should test your changes in the dashboard, and by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/).
     */
    ranking?: Array<string> | undefined;
    /**
     * Relevancy threshold below which less relevant results aren\'t included in the results You can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas). Use this setting to strike a balance between the relevance and number of returned results.
     */
    relevancyStrictness?: number | undefined;
    /**
     * Attributes to highlight By default, all searchable attributes are highlighted. Use `*` to highlight all attributes or use an empty array `[]` to turn off highlighting. Attribute names are case-sensitive With highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`. You can use this to visually highlight matching parts of a search query in your UI For more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/).
     */
    attributesToHighlight?: Array<string> | undefined;
    /**
     * Attributes for which to enable snippets. Attribute names are case-sensitive Snippets provide additional context to matched words. If you enable snippets, they include 10 words, including the matched word. The matched word will also be wrapped by HTML tags for highlighting. You can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`, where `NUMBER` is the number of words to be extracted.
     */
    attributesToSnippet?: Array<string> | undefined;
    /**
     * HTML tag to insert before the highlighted parts in all highlighted results and snippets.
     */
    highlightPreTag?: string | undefined;
    /**
     * HTML tag to insert after the highlighted parts in all highlighted results and snippets.
     */
    highlightPostTag?: string | undefined;
    /**
     * String used as an ellipsis indicator when a snippet is truncated.
     */
    snippetEllipsisText?: string | undefined;
    /**
     * Whether to restrict highlighting and snippeting to items that at least partially matched the search query. By default, all items are highlighted and snippeted.
     */
    restrictHighlightAndSnippetArrays?: boolean | undefined;
    /**
     * Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).
     */
    minWordSizefor1Typo?: number | undefined;
    /**
     * Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).
     */
    minWordSizefor2Typos?: number | undefined;
    typoTolerance?: TypoTolerance | undefined;
    /**
     * Whether to allow typos on numbers in the search query Turn off this setting to reduce the number of irrelevant matches when searching in large sets of similar numbers.
     */
    allowTyposOnNumericTokens?: boolean | undefined;
    /**
     * Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/). Attribute names are case-sensitive Returning only exact matches can help when - [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/). - Reducing the number of matches when you have too many.   This can happen with attributes that are long blocks of text, such as product descriptions Consider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.
     */
    disableTypoToleranceOnAttributes?: Array<string> | undefined;
    ignorePlurals?: IgnorePlurals | undefined;
    removeStopWords?: RemoveStopWords | undefined;
    /**
     * Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries  This setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings. This setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages. To support this, you must place the CJK language **first**  **You should always specify a query language.** If you don\'t specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/), or the languages you specified with the `ignorePlurals` or `removeStopWords` parameters. This can lead to unexpected search results. For more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).
     */
    queryLanguages?: Array<SupportedLanguage> | undefined;
    /**
     * Whether to split compound words in the query into their building blocks For more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words). Word segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian. Decompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark). For example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).
     */
    decompoundQuery?: boolean | undefined;
    /**
     * Whether to enable rules.
     */
    enableRules?: boolean | undefined;
    /**
     * Whether to enable Personalization.
     */
    enablePersonalization?: boolean | undefined;
    queryType?: QueryType | undefined;
    removeWordsIfNoResults?: RemoveWordsIfNoResults | undefined;
    /**
     * Whether to support phrase matching and excluding words from search queries Use the `advancedSyntaxFeatures` parameter to control which feature is supported.
     */
    advancedSyntax?: boolean | undefined;
    optionalWords?: OptionalWords | null | undefined;
    /**
     * Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes). Attribute names are case-sensitive This can be useful for attributes with long values, where the likelihood of an exact match is high, such as product descriptions. Turning off the Exact ranking criterion for these attributes favors exact matching on other attributes. This reduces the impact of individual attributes with a lot of content on ranking.
     */
    disableExactOnAttributes?: Array<string> | undefined;
    exactOnSingleWordQuery?: ExactOnSingleWordQuery | undefined;
    /**
     * Determine which plurals and synonyms should be considered an exact matches By default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching. For example - \"swimsuit\" and \"swimsuits\" are treated the same - \"swimsuit\" and \"swimwear\" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms)) - `ignorePlurals`.   Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches - `singleWordSynonym`.   Single-word synonyms, such as \"NY\" = \"NYC\", are considered exact matches - `multiWordsSynonym`.   Multi-word synonyms, such as \"NY\" = \"New York\", are considered exact matches.
     */
    alternativesAsExact?: Array<AlternativesAsExact> | undefined;
    /**
     * Advanced search syntax features you want to support - `exactPhrase`.   Phrases in quotes must match exactly.   For example, `sparkly blue \"iPhone case\"` only returns records with the exact string \"iPhone case\" - `excludeWords`.   Query words prefixed with a `-` must not occur in a record.   For example, `search -engine` matches records that contain \"search\" but not \"engine\" This setting only has an effect if `advancedSyntax` is true.
     */
    advancedSyntaxFeatures?: Array<AdvancedSyntaxFeatures> | undefined;
    distinct?: Distinct | undefined;
    /**
     * Whether to replace a highlighted word with the matched synonym By default, the original words are highlighted even if a synonym matches. For example, with `home` as a synonym for `house` and a search for `home`, records matching either \"home\" or \"house\" are included in the search results, and either \"home\" or \"house\" are highlighted With `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records, but all occurrences of \"house\" are replaced by \"home\" in the highlighted response.
     */
    replaceSynonymsInHighlight?: boolean | undefined;
    /**
     * Minimum proximity score for two matching words This adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity) by equally scoring matches that are farther apart For example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.
     */
    minProximity?: number | undefined;
    /**
     * Properties to include in the API response of search and browse requests By default, all response properties are included. To reduce the response size, you can select which properties should be included An empty list may lead to an empty API response (except properties you can\'t exclude) You can\'t exclude these properties: `message`, `warning`, `cursor`, `abTestVariantID`, or any property added by setting `getRankingInfo` to true Your search depends on the `hits` field. If you omit this field, searches won\'t return any results. Your UI might also depend on other properties, for example, for pagination. Before restricting the response size, check the impact on your search experience.
     */
    responseFields?: Array<string> | undefined;
    /**
     * Maximum number of facet values to return for each facet.
     */
    maxValuesPerFacet?: number | undefined;
    /**
     * Order in which to retrieve facet values - `count`.   Facet values are retrieved by decreasing count.   The count is the number of matching records containing this facet value - `alpha`.   Retrieve facet values alphabetically This setting doesn\'t influence how facet values are displayed in your UI (see `renderingContent`). For more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js/).
     */
    sortFacetValuesBy?: string | undefined;
    /**
     * Whether the best matching attribute should be determined by minimum proximity This setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting. If true, the best matching attribute is selected based on the minimum proximity of multiple matches. Otherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.
     */
    attributeCriteriaComputedByMinProximity?: boolean | undefined;
    renderingContent?: RenderingContent | undefined;
    /**
     * Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/) This setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.
     */
    enableReRanking?: boolean | undefined;
    reRankingApplyFilter?: ReRankingApplyFilter | null | undefined;
};

/**
 * Index settings.
 */
type RecommendIndexSettings = BaseIndexSettings & BaseRecommendIndexSettings;

type SearchParamsQuery = {
    /**
     * Search query.
     */
    query?: string | undefined;
};

/**
 * Search parameters for filtering the recommendations.
 */
type RecommendSearchParams = BaseRecommendSearchParams & SearchParamsQuery & RecommendIndexSettings;

type BaseRecommendRequest = {
    /**
     * Index name (case-sensitive).
     */
    indexName: string;
    /**
     * Minimum score a recommendation must have to be included in the response.
     */
    threshold: number;
    /**
     * Maximum number of recommendations to retrieve. By default, all recommendations are returned and no fallback request is made. Depending on the available recommendations and the other request parameters, the actual number of recommendations may be lower than this value.
     */
    maxRecommendations?: number | undefined;
    queryParameters?: RecommendSearchParams | undefined;
};

/**
 * Frequently bought together model.  This model recommends items that have been purchased within 1 day with the item with the ID `objectID`.
 */
type FbtModel = 'bought-together';

type FrequentlyBoughtTogether = {
    model: FbtModel;
    /**
     * Unique record identifier.
     */
    objectID: string;
};

type BoughtTogetherQuery = BaseRecommendRequest & FrequentlyBoughtTogether;

type FallbackParams = RecommendSearchParams & Record<string, unknown>;

/**
 * Looking similar model.  This model recommends items that look similar to the item with the ID `objectID` based on image attributes in your index.
 */
type LookingSimilarModel = 'looking-similar';

type LookingSimilar = {
    model: LookingSimilarModel;
    /**
     * Unique record identifier.
     */
    objectID: string;
    fallbackParameters?: FallbackParams | undefined;
};

type LookingSimilarQuery = BaseRecommendRequest & LookingSimilar;

/**
 * Related products or similar content model.  This model recommends items that are similar to the item with the ID `objectID`. Similarity is determined from the user interactions and attributes.
 */
type RelatedModel = 'related-products';

type RelatedProducts = {
    model: RelatedModel;
    /**
     * Unique record identifier.
     */
    objectID: string;
    fallbackParameters?: FallbackParams | undefined;
};

type RelatedQuery = BaseRecommendRequest & RelatedProducts;

/**
 * Trending facet values model.  This model recommends trending facet values for the specified facet attribute.
 */
type TrendingFacetsModel = 'trending-facets';

type TrendingFacets = {
    /**
     * Facet attribute for which to retrieve trending facet values.
     */
    facetName: string;
    model: TrendingFacetsModel;
    fallbackParameters?: FallbackParams | undefined;
};

type TrendingFacetsQuery = BaseRecommendRequest & TrendingFacets;

/**
 * Trending items model.  Trending items are determined from the number of conversion events collected on them.
 */
type TrendingItemsModel = 'trending-items';

type TrendingItems = {
    /**
     * Facet attribute. To be used in combination with `facetValue`. If specified, only recommendations matching the facet filter will be returned.
     */
    facetName?: string | undefined;
    /**
     * Facet value. To be used in combination with `facetName`. If specified, only recommendations matching the facet filter will be returned.
     */
    facetValue?: string | undefined;
    model: TrendingItemsModel;
    fallbackParameters?: FallbackParams | undefined;
};

type TrendingItemsQuery = BaseRecommendRequest & TrendingItems;

type RecommendationsRequest = BoughtTogetherQuery | RelatedQuery | TrendingItemsQuery | TrendingFacetsQuery | LookingSimilarQuery;

/**
 * Recommend request body.
 */
type GetRecommendationsParams = {
    /**
     * Recommendation request with parameters depending on the requested model.
     */
    requests: Array<RecommendationsRequest>;
};

/**
 * Whether certain properties of the search response are calculated exhaustive (exact) or approximated.
 */
type Exhaustive = {
    /**
     * Whether the facet count is exhaustive (`true`) or approximate (`false`). See the [related discussion](https://support.algolia.com/hc/en-us/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate-).
     */
    facetsCount?: boolean | undefined;
    /**
     * The value is `false` if not all facet values are retrieved.
     */
    facetValues?: boolean | undefined;
    /**
     * Whether the `nbHits` is exhaustive (`true`) or approximate (`false`). When the query takes more than 50ms to be processed, the engine makes an approximation. This can happen when using complex filters on millions of records, when typo-tolerance was not exhaustive, or when enough hits have been retrieved (for example, after the engine finds 10,000 exact matches). `nbHits` is reported as non-exhaustive whenever an approximation is made, even if the approximation didn’t, in the end, impact the exhaustivity of the query.
     */
    nbHits?: boolean | undefined;
    /**
     * Rules matching exhaustivity. The value is `false` if rules were enable for this query, and could not be fully processed due a timeout. This is generally caused by the number of alternatives (such as typos) which is too large.
     */
    rulesMatch?: boolean | undefined;
    /**
     * Whether the typo search was exhaustive (`true`) or approximate (`false`). An approximation is done when the typo search query part takes more than 10% of the query budget (ie. 5ms by default) to be processed (this can happen when a lot of typo alternatives exist for the query). This field will not be included when typo-tolerance is entirely disabled.
     */
    typo?: boolean | undefined;
};

type FacetStats = {
    /**
     * Minimum value in the results.
     */
    min?: number | undefined;
    /**
     * Maximum value in the results.
     */
    max?: number | undefined;
    /**
     * Average facet value in the results.
     */
    avg?: number | undefined;
    /**
     * Sum of all values in the results.
     */
    sum?: number | undefined;
};

/**
 * Redirect rule data.
 */
type RedirectRuleIndexData = {
    ruleObjectID: string;
};

type RedirectRuleIndexMetadata = {
    /**
     * Source index for the redirect rule.
     */
    source: string;
    /**
     * Destination index for the redirect rule.
     */
    dest: string;
    /**
     * Reason for the redirect rule.
     */
    reason: string;
    /**
     * Redirect rule status.
     */
    succeed: boolean;
    data: RedirectRuleIndexData;
};

/**
 * [Redirect results to a URL](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/redirects/), this this parameter is for internal use only.
 */
type Redirect = {
    index?: Array<RedirectRuleIndexMetadata> | undefined;
};

type BaseSearchResponse = Record<string, any> & {
    /**
     * A/B test ID. This is only included in the response for indices that are part of an A/B test.
     */
    abTestID?: number | undefined;
    /**
     * Variant ID. This is only included in the response for indices that are part of an A/B test.
     */
    abTestVariantID?: number | undefined;
    /**
     * Computed geographical location.
     */
    aroundLatLng?: string | undefined;
    /**
     * Distance from a central coordinate provided by `aroundLatLng`.
     */
    automaticRadius?: string | undefined;
    exhaustive?: Exhaustive | undefined;
    /**
     * Rules applied to the query.
     */
    appliedRules?: Array<Record<string, unknown>> | undefined;
    /**
     * See the `facetsCount` field of the `exhaustive` object in the response.
     */
    exhaustiveFacetsCount?: boolean | undefined;
    /**
     * See the `nbHits` field of the `exhaustive` object in the response.
     */
    exhaustiveNbHits?: boolean | undefined;
    /**
     * See the `typo` field of the `exhaustive` object in the response.
     */
    exhaustiveTypo?: boolean | undefined;
    /**
     * Facet counts.
     */
    facets?: {
        [key: string]: {
            [key: string]: number;
        };
    } | undefined;
    /**
     * Statistics for numerical facets.
     */
    facets_stats?: {
        [key: string]: FacetStats;
    } | undefined;
    /**
     * Index name used for the query.
     */
    index?: string | undefined;
    /**
     * Index name used for the query. During A/B testing, the targeted index isn\'t always the index used by the query.
     */
    indexUsed?: string | undefined;
    /**
     * Warnings about the query.
     */
    message?: string | undefined;
    /**
     * Number of hits selected and sorted by the relevant sort algorithm.
     */
    nbSortedHits?: number | undefined;
    /**
     * Post-[normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/#what-does-normalization-mean) query string that will be searched.
     */
    parsedQuery?: string | undefined;
    /**
     * Time the server took to process the request, in milliseconds.
     */
    processingTimeMS?: number | undefined;
    /**
     * Experimental. List of processing steps and their times, in milliseconds. You can use this list to investigate performance issues.
     */
    processingTimingsMS?: Record<string, unknown> | undefined;
    /**
     * Markup text indicating which parts of the original query have been removed to retrieve a non-empty result set.
     */
    queryAfterRemoval?: string | undefined;
    redirect?: Redirect | undefined;
    renderingContent?: RenderingContent | undefined;
    /**
     * Time the server took to process the request, in milliseconds.
     */
    serverTimeMS?: number | undefined;
    /**
     * Host name of the server that processed the request.
     */
    serverUsed?: string | undefined;
    /**
     * An object with custom data.  You can store up to 32kB as custom data.
     */
    userData?: any | null | undefined;
    /**
     * Unique identifier for the query. This is used for [click analytics](https://www.algolia.com/doc/guides/analytics/click-analytics/).
     */
    queryID?: string | undefined;
    /**
     * Whether automatic events collection is enabled for the application.
     */
    _automaticInsights?: boolean | undefined;
};

/**
 * Whether the whole query string matches or only a part.
 */
type MatchLevel = 'none' | 'partial' | 'full';

/**
 * Surround words that match the query with HTML tags for highlighting.
 */
type HighlightResultOption = {
    /**
     * Highlighted attribute value, including HTML tags.
     */
    value: string;
    matchLevel: MatchLevel;
    /**
     * List of matched words from the search query.
     */
    matchedWords: Array<string>;
    /**
     * Whether the entire attribute value is highlighted.
     */
    fullyHighlighted?: boolean | undefined;
};

type HighlightResult = HighlightResultOption | {
    [key: string]: HighlightResult;
} | Array<HighlightResult>;

type MatchedGeoLocation = {
    /**
     * Latitude of the matched location.
     */
    lat?: number | undefined;
    /**
     * Longitude of the matched location.
     */
    lng?: number | undefined;
    /**
     * Distance between the matched location and the search location (in meters).
     */
    distance?: number | undefined;
};

type Personalization = {
    /**
     * The score of the filters.
     */
    filtersScore?: number | undefined;
    /**
     * The score of the ranking.
     */
    rankingScore?: number | undefined;
    /**
     * The score of the event.
     */
    score?: number | undefined;
};

/**
 * Object with detailed information about the record\'s ranking.
 */
type RankingInfo = {
    /**
     * Whether a filter matched the query.
     */
    filters?: number | undefined;
    /**
     * Position of the first matched word in the best matching attribute of the record.
     */
    firstMatchedWord: number;
    /**
     * Distance between the geo location in the search query and the best matching geo location in the record, divided by the geo precision (in meters).
     */
    geoDistance: number;
    /**
     * Precision used when computing the geo distance, in meters.
     */
    geoPrecision?: number | undefined;
    matchedGeoLocation?: MatchedGeoLocation | undefined;
    personalization?: Personalization | undefined;
    /**
     * Number of exactly matched words.
     */
    nbExactWords: number;
    /**
     * Number of typos encountered when matching the record.
     */
    nbTypos: number;
    /**
     * Whether the record was promoted by a rule.
     */
    promoted?: boolean | undefined;
    /**
     * Number of words between multiple matches in the query plus 1. For single word queries, `proximityDistance` is 0.
     */
    proximityDistance?: number | undefined;
    /**
     * Overall ranking of the record, expressed as a single integer. This attribute is internal.
     */
    userScore: number;
    /**
     * Number of matched words.
     */
    words?: number | undefined;
    /**
     * Whether the record is re-ranked.
     */
    promotedByReRanking?: boolean | undefined;
};

/**
 * Snippets that show the context around a matching search query.
 */
type SnippetResultOption = {
    /**
     * Highlighted attribute value, including HTML tags.
     */
    value: string;
    matchLevel: MatchLevel;
};

type SnippetResult = SnippetResultOption | {
    [key: string]: SnippetResult;
} | Array<SnippetResult>;

/**
 * Recommend hit.
 */
type RecommendHit = Record<string, any> & {
    /**
     * Unique record identifier.
     */
    objectID: string;
    /**
     * Surround words that match the query with HTML tags for highlighting.
     */
    _highlightResult?: {
        [key: string]: HighlightResult;
    } | undefined;
    /**
     * Snippets that show the context around a matching search query.
     */
    _snippetResult?: {
        [key: string]: SnippetResult;
    } | undefined;
    _rankingInfo?: RankingInfo | undefined;
    _distinctSeqID?: number | undefined;
    /**
     * Recommendation score.
     */
    _score?: number | undefined;
};

/**
 * Trending facet hit.
 */
type TrendingFacetHit = {
    /**
     * Recommendation score.
     */
    _score?: number | undefined;
    /**
     * Facet attribute. To be used in combination with `facetValue`. If specified, only recommendations matching the facet filter will be returned.
     */
    facetName: string;
    /**
     * Facet value. To be used in combination with `facetName`. If specified, only recommendations matching the facet filter will be returned.
     */
    facetValue: string;
};

type RecommendationsHit = RecommendHit | TrendingFacetHit;

type RecommendationsHits = {
    hits: Array<RecommendationsHit>;
};

type SearchPagination = {
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Number of results (hits).
     */
    nbHits?: number | undefined;
    /**
     * Number of pages of results.
     */
    nbPages?: number | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
};

type RecommendationsResults = BaseSearchResponse & SearchPagination & RecommendationsHits;

type GetRecommendationsResponse = {
    results: Array<RecommendationsResults>;
};

/**
 * - `default`: perform a search query - `facet` [searches for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
 */
type SearchTypeFacet = 'facet';

type SearchForFacetsOptions = {
    /**
     * Facet name.
     */
    facet: string;
    /**
     * Index name (case-sensitive).
     */
    indexName: string;
    /**
     * Text to search inside the facet\'s values.
     */
    facetQuery?: string | undefined;
    /**
     * Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
     */
    maxFacetHits?: number | undefined;
    type: SearchTypeFacet;
};

type BaseSearchParamsWithoutQuery = {
    /**
     * Keywords to be used instead of the search query to conduct a more broader search Using the `similarQuery` parameter changes other settings - `queryType` is set to `prefixNone`. - `removeStopWords` is set to true. - `words` is set as the first ranking criterion. - All remaining words are treated as `optionalWords` Since the `similarQuery` is supposed to do a broad search, they usually return many results. Combine it with `filters` to narrow down the list of results.
     */
    similarQuery?: string | undefined;
    /**
     * Filter expression to only include items that match the filter criteria in the response.  You can use these filter expressions:  - **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`. - **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive). - **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value. - **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive). - **Boolean filters.** `<facet>: true | false`.  You can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:  - You can only combine filters of the same type with `OR`.   **Not supported:** `facet:value OR num > 3`. - You can\'t use `NOT` with combinations of filters.   **Not supported:** `NOT(facet:value OR facet:value)` - You can\'t combine conjunctions (`AND`) with `OR`.   **Not supported:** `facet:value OR (facet:value AND facet:value)`  Use quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes. If a facet attribute is an array, the filter matches if it matches at least one element of the array.  For more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).
     */
    filters?: string | undefined;
    facetFilters?: FacetFilters | undefined;
    optionalFilters?: OptionalFilters | undefined;
    numericFilters?: NumericFilters | undefined;
    tagFilters?: TagFilters | undefined;
    /**
     * Whether to sum all filter scores If true, all filter scores are summed. Otherwise, the maximum filter score is kept. For more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).
     */
    sumOrFiltersScores?: boolean | undefined;
    /**
     * Restricts a search to a subset of your searchable attributes. Attribute names are case-sensitive.
     */
    restrictSearchableAttributes?: Array<string> | undefined;
    /**
     * Facets for which to retrieve facet values that match the search criteria and the number of matching facet values To retrieve all facets, use the wildcard character `*`. For more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).
     */
    facets?: Array<string> | undefined;
    /**
     * Whether faceting should be applied after deduplication with `distinct` This leads to accurate facet counts when using faceting in combination with `distinct`. It\'s usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting, as `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.
     */
    facetingAfterDistinct?: boolean | undefined;
    /**
     * Page of search results to retrieve.
     */
    page?: number | undefined;
    /**
     * Position of the first hit to retrieve.
     */
    offset?: number | undefined;
    /**
     * Number of hits to retrieve (used in combination with `offset`).
     */
    length?: number | undefined;
    /**
     * Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.  Only records included within a circle around this central location are included in the results. The radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings. This parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.
     */
    aroundLatLng?: string | undefined;
    /**
     * Whether to obtain the coordinates from the request\'s IP address.
     */
    aroundLatLngViaIP?: boolean | undefined;
    aroundRadius?: AroundRadius | undefined;
    aroundPrecision?: AroundPrecision | undefined;
    /**
     * Minimum radius (in meters) for a search around a location when `aroundRadius` isn\'t set.
     */
    minimumAroundRadius?: number | undefined;
    insideBoundingBox?: InsideBoundingBox | null | undefined;
    /**
     * Coordinates of a polygon in which to search.  Polygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude. Provide multiple polygons as nested arrays. For more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas). This parameter is ignored if you also specify `insideBoundingBox`.
     */
    insidePolygon?: Array<Array<number>> | undefined;
    /**
     * ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches) - Sets `removeStopWords` and `ignorePlurals` to the list of provided languages. - Sets `removeWordsIfNoResults` to `allOptional`. - Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.
     */
    naturalLanguages?: Array<SupportedLanguage> | undefined;
    /**
     * Assigns a rule context to the search query [Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.
     */
    ruleContexts?: Array<string> | undefined;
    /**
     * Impact that Personalization should have on this search The higher this value is, the more Personalization determines the ranking compared to other factors. For more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).
     */
    personalizationImpact?: number | undefined;
    /**
     * Unique pseudonymous or anonymous user identifier.  This helps with analytics and click and conversion events. For more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/).
     */
    userToken?: string | undefined;
    /**
     * Whether the search response should include detailed ranking information.
     */
    getRankingInfo?: boolean | undefined;
    /**
     * Whether to take into account an index\'s synonyms for this search.
     */
    synonyms?: boolean | undefined;
    /**
     * Whether to include a `queryID` attribute in the response The query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/guides/sending-events/getting-started/).
     */
    clickAnalytics?: boolean | undefined;
    /**
     * Whether this search will be included in Analytics.
     */
    analytics?: boolean | undefined;
    /**
     * Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     */
    analyticsTags?: Array<string> | undefined;
    /**
     * Whether to include this search when calculating processing-time percentiles.
     */
    percentileComputation?: boolean | undefined;
    /**
     * Whether to enable A/B testing for this search.
     */
    enableABTest?: boolean | undefined;
};

type BaseSearchParams = SearchParamsQuery & BaseSearchParamsWithoutQuery;

/**
 * Search mode the index will use to query for results.  This setting only applies to indices, for which Algolia enabled NeuralSearch for you.
 */
type Mode = 'neuralSearch' | 'keywordSearch';

/**
 * Settings for the semantic search part of NeuralSearch. Only used when `mode` is `neuralSearch`.
 */
type SemanticSearch = {
    /**
     * Indices from which to collect click and conversion events.  If null, the current index and all its replicas are used.
     */
    eventSources?: Array<string> | null | undefined;
};

type IndexSettingsAsSearchParams = {
    /**
     * Attributes to include in the API response To reduce the size of your response, you can retrieve only some of the attributes. Attribute names are case-sensitive - `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings. - To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `[\"*\", \"-ATTRIBUTE\"]`. - The `objectID` attribute is always included.
     */
    attributesToRetrieve?: Array<string> | undefined;
    /**
     * Determines the order in which Algolia returns your results.  By default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/). The tie-breaking algorithm sequentially applies each criterion in the order they\'re specified. If you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/), you put the sorting attribute at the top of the list.  **Modifiers**  - `asc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in ascending order. - `desc(\"ATTRIBUTE\")`.   Sort the index by the values of an attribute, in descending order.  Before you modify the default setting, you should test your changes in the dashboard, and by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/).
     */
    ranking?: Array<string> | undefined;
    /**
     * Relevancy threshold below which less relevant results aren\'t included in the results You can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas). Use this setting to strike a balance between the relevance and number of returned results.
     */
    relevancyStrictness?: number | undefined;
    /**
     * Attributes to highlight By default, all searchable attributes are highlighted. Use `*` to highlight all attributes or use an empty array `[]` to turn off highlighting. Attribute names are case-sensitive With highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`. You can use this to visually highlight matching parts of a search query in your UI For more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/).
     */
    attributesToHighlight?: Array<string> | undefined;
    /**
     * Attributes for which to enable snippets. Attribute names are case-sensitive Snippets provide additional context to matched words. If you enable snippets, they include 10 words, including the matched word. The matched word will also be wrapped by HTML tags for highlighting. You can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`, where `NUMBER` is the number of words to be extracted.
     */
    attributesToSnippet?: Array<string> | undefined;
    /**
     * HTML tag to insert before the highlighted parts in all highlighted results and snippets.
     */
    highlightPreTag?: string | undefined;
    /**
     * HTML tag to insert after the highlighted parts in all highlighted results and snippets.
     */
    highlightPostTag?: string | undefined;
    /**
     * String used as an ellipsis indicator when a snippet is truncated.
     */
    snippetEllipsisText?: string | undefined;
    /**
     * Whether to restrict highlighting and snippeting to items that at least partially matched the search query. By default, all items are highlighted and snippeted.
     */
    restrictHighlightAndSnippetArrays?: boolean | undefined;
    /**
     * Number of hits per page.
     */
    hitsPerPage?: number | undefined;
    /**
     * Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).
     */
    minWordSizefor1Typo?: number | undefined;
    /**
     * Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).
     */
    minWordSizefor2Typos?: number | undefined;
    typoTolerance?: TypoTolerance | undefined;
    /**
     * Whether to allow typos on numbers in the search query Turn off this setting to reduce the number of irrelevant matches when searching in large sets of similar numbers.
     */
    allowTyposOnNumericTokens?: boolean | undefined;
    /**
     * Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/). Attribute names are case-sensitive Returning only exact matches can help when - [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/). - Reducing the number of matches when you have too many.   This can happen with attributes that are long blocks of text, such as product descriptions Consider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.
     */
    disableTypoToleranceOnAttributes?: Array<string> | undefined;
    ignorePlurals?: IgnorePlurals | undefined;
    removeStopWords?: RemoveStopWords | undefined;
    /**
     * Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries  This setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings. This setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages. To support this, you must place the CJK language **first**  **You should always specify a query language.** If you don\'t specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/), or the languages you specified with the `ignorePlurals` or `removeStopWords` parameters. This can lead to unexpected search results. For more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).
     */
    queryLanguages?: Array<SupportedLanguage> | undefined;
    /**
     * Whether to split compound words in the query into their building blocks For more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words). Word segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian. Decompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark). For example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).
     */
    decompoundQuery?: boolean | undefined;
    /**
     * Whether to enable rules.
     */
    enableRules?: boolean | undefined;
    /**
     * Whether to enable Personalization.
     */
    enablePersonalization?: boolean | undefined;
    queryType?: QueryType | undefined;
    removeWordsIfNoResults?: RemoveWordsIfNoResults | undefined;
    mode?: Mode | undefined;
    semanticSearch?: SemanticSearch | undefined;
    /**
     * Whether to support phrase matching and excluding words from search queries Use the `advancedSyntaxFeatures` parameter to control which feature is supported.
     */
    advancedSyntax?: boolean | undefined;
    optionalWords?: OptionalWords | null | undefined;
    /**
     * Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes). Attribute names are case-sensitive This can be useful for attributes with long values, where the likelihood of an exact match is high, such as product descriptions. Turning off the Exact ranking criterion for these attributes favors exact matching on other attributes. This reduces the impact of individual attributes with a lot of content on ranking.
     */
    disableExactOnAttributes?: Array<string> | undefined;
    exactOnSingleWordQuery?: ExactOnSingleWordQuery | undefined;
    /**
     * Determine which plurals and synonyms should be considered an exact matches By default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching. For example - \"swimsuit\" and \"swimsuits\" are treated the same - \"swimsuit\" and \"swimwear\" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms)) - `ignorePlurals`.   Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches - `singleWordSynonym`.   Single-word synonyms, such as \"NY\" = \"NYC\", are considered exact matches - `multiWordsSynonym`.   Multi-word synonyms, such as \"NY\" = \"New York\", are considered exact matches.
     */
    alternativesAsExact?: Array<AlternativesAsExact> | undefined;
    /**
     * Advanced search syntax features you want to support - `exactPhrase`.   Phrases in quotes must match exactly.   For example, `sparkly blue \"iPhone case\"` only returns records with the exact string \"iPhone case\" - `excludeWords`.   Query words prefixed with a `-` must not occur in a record.   For example, `search -engine` matches records that contain \"search\" but not \"engine\" This setting only has an effect if `advancedSyntax` is true.
     */
    advancedSyntaxFeatures?: Array<AdvancedSyntaxFeatures> | undefined;
    distinct?: Distinct | undefined;
    /**
     * Whether to replace a highlighted word with the matched synonym By default, the original words are highlighted even if a synonym matches. For example, with `home` as a synonym for `house` and a search for `home`, records matching either \"home\" or \"house\" are included in the search results, and either \"home\" or \"house\" are highlighted With `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records, but all occurrences of \"house\" are replaced by \"home\" in the highlighted response.
     */
    replaceSynonymsInHighlight?: boolean | undefined;
    /**
     * Minimum proximity score for two matching words This adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity) by equally scoring matches that are farther apart For example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.
     */
    minProximity?: number | undefined;
    /**
     * Properties to include in the API response of search and browse requests By default, all response properties are included. To reduce the response size, you can select which properties should be included An empty list may lead to an empty API response (except properties you can\'t exclude) You can\'t exclude these properties: `message`, `warning`, `cursor`, `abTestVariantID`, or any property added by setting `getRankingInfo` to true Your search depends on the `hits` field. If you omit this field, searches won\'t return any results. Your UI might also depend on other properties, for example, for pagination. Before restricting the response size, check the impact on your search experience.
     */
    responseFields?: Array<string> | undefined;
    /**
     * Maximum number of facet values to return for each facet.
     */
    maxValuesPerFacet?: number | undefined;
    /**
     * Order in which to retrieve facet values - `count`.   Facet values are retrieved by decreasing count.   The count is the number of matching records containing this facet value - `alpha`.   Retrieve facet values alphabetically This setting doesn\'t influence how facet values are displayed in your UI (see `renderingContent`). For more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js/).
     */
    sortFacetValuesBy?: string | undefined;
    /**
     * Whether the best matching attribute should be determined by minimum proximity This setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting. If true, the best matching attribute is selected based on the minimum proximity of multiple matches. Otherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.
     */
    attributeCriteriaComputedByMinProximity?: boolean | undefined;
    renderingContent?: RenderingContent | undefined;
    /**
     * Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/) This setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.
     */
    enableReRanking?: boolean | undefined;
    reRankingApplyFilter?: ReRankingApplyFilter | null | undefined;
};

/**
 * Each parameter value, including the `query` must not be larger than 512 bytes.
 */
type SearchParamsObject = BaseSearchParams & IndexSettingsAsSearchParams;

/**
 * Search parameters as query string.
 */
type SearchParamsString = {
    /**
     * Search parameters as a URL-encoded query string.
     */
    params?: string | undefined;
};

type SearchParams = SearchParamsString | SearchParamsObject;

type SearchForFacets = SearchParams & SearchForFacetsOptions;

/**
 * - `default`: perform a search query - `facet` [searches for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).
 */
type SearchTypeDefault = 'default';

type SearchForHitsOptions = {
    /**
     * Index name (case-sensitive).
     */
    indexName: string;
    type?: SearchTypeDefault | undefined;
} & {
    facet?: never | undefined;
    maxFacetHits?: never | undefined;
    facetQuery?: never | undefined;
};

type SearchForHits = SearchParams & SearchForHitsOptions;

type SearchQuery = SearchForHits | SearchForFacets;

/**
 * Strategy for multiple search queries:  - `none`. Run all queries. - `stopIfEnoughMatches`. Run the queries one by one, stopping as soon as a query matches at least the `hitsPerPage` number of results.
 */
type SearchStrategy = 'none' | 'stopIfEnoughMatches';

type SearchMethodParams = {
    requests: Array<SearchQuery>;
    strategy?: SearchStrategy | undefined;
};

type FacetHits = {
    /**
     * Facet value.
     */
    value: string;
    /**
     * Highlighted attribute value, including HTML tags.
     */
    highlighted: string;
    /**
     * Number of records with this facet value. [The count may be approximated](https://support.algolia.com/hc/en-us/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate-).
     */
    count: number;
};

type SearchForFacetValuesResponse$1 = {
    /**
     * Matching facet values.
     */
    facetHits: Array<FacetHits>;
    /**
     * Whether the facet count is exhaustive (true) or approximate (false). For more information, see [Why are my facet and hit counts not accurate](https://support.algolia.com/hc/en-us/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate-).
     */
    exhaustiveFacetsCount: boolean;
    /**
     * Time the server took to process the request, in milliseconds.
     */
    processingTimeMS?: number | undefined;
};

/**
 * Search result.  A hit is a record from your index, augmented with special attributes for highlighting, snippeting, and ranking.
 */
type Hit<T = Record<string, unknown>> = T & {
    /**
     * Unique record identifier.
     */
    objectID: string;
    /**
     * Surround words that match the query with HTML tags for highlighting.
     */
    _highlightResult?: {
        [key: string]: HighlightResult;
    } | undefined;
    /**
     * Snippets that show the context around a matching search query.
     */
    _snippetResult?: {
        [key: string]: SnippetResult;
    } | undefined;
    _rankingInfo?: RankingInfo | undefined;
    _distinctSeqID?: number | undefined;
};

type SearchHits<T = Record<string, unknown>> = Record<string, any> & {
    /**
     * Search results (hits).  Hits are records from your index that match the search criteria, augmented with additional attributes, such as, for highlighting.
     */
    hits: Hit<T>[];
    /**
     * Search query.
     */
    query: string;
    /**
     * URL-encoded string of all search parameters.
     */
    params: string;
};

type SearchResponse$1<T = Record<string, unknown>> = BaseSearchResponse & SearchPagination & SearchHits<T>;

type SearchResult<T = Record<string, unknown>> = SearchResponse$1<T> | SearchForFacetValuesResponse$1;

type SearchResponses<T = Record<string, unknown>> = {
    results: SearchResult<T>[];
};

/**
 * Properties for the `customPost` method.
 */
type CustomPostProps = {
    /**
     * Path of the endpoint, for example `1/newFeature`.
     */
    path: string;
    /**
     * Query parameters to apply to the current query.
     */
    parameters?: {
        [key: string]: any;
    } | undefined;
    /**
     * Parameters to send with the custom request.
     */
    body?: Record<string, unknown> | undefined;
};
/**
 * Recommend method signature compatible with the `algoliasearch` v4 package. When using this signature, extra computation will be required to make it match the new signature.
 *
 * @deprecated This signature will be removed from the next major version, we recommend using the `GetRecommendationsParams` type for performances and future proof reasons.
 */
type LegacyGetRecommendationsParams = RecommendationsRequest[];
/**
 * In v4, the search parameters are wrapped in a `params` parameter.
 *
 * @deprecated The `search` method now accepts flat `searchParams` at the root of the method.
 */
type LegacySearchParams = {
    params?: SearchParamsObject | undefined;
};
/**
 * In v4, the search parameters are wrapped in a `params` parameter.
 *
 * @deprecated The `search` method now accepts flat `searchParams` at the root of the method.
 */
type LegacySearchForFacets = LegacySearchParams & SearchForFacetsOptions;
/**
 * In v4, the search parameters are wrapped in a `params` parameter.
 *
 * @deprecated The `search` method now accepts flat `searchParams` at the root of the method.
 */
type LegacySearchForHits = LegacySearchParams & SearchForHitsOptions;
type LegacySearchQuery = LegacySearchForFacets | LegacySearchForHits;
/**
 * Search method signature compatible with the `algoliasearch` v4 package. When using this signature, extra computation will be required to make it match the new signature.
 *
 * @deprecated This signature will be removed from the next major version, we recommend using the `SearchMethodParams` type for performances and future proof reasons.
 */
type LegacySearchMethodProps = LegacySearchQuery[];
declare function createLiteClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, ...options }: CreateClientOptions): {
    transporter: Transporter;
    /**
     * The `appId` currently in use.
     */
    appId: string;
    /**
     * The `apiKey` currently in use.
     */
    apiKey: string;
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache(): Promise<void>;
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    readonly _ua: string;
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment: string, version?: string | undefined): void;
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }: {
        apiKey: string;
    }): void;
    /**
     * Helper: calls the `search` method but with certainty that we will only request Algolia records (hits) and not facets.
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `hits` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `hits`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForHits<T>(searchMethodParams: LegacySearchMethodProps | SearchMethodParams, requestOptions?: RequestOptions | undefined): Promise<{
        results: Array<SearchResponse$1<T>>;
    }>;
    /**
     * Helper: calls the `search` method but with certainty that we will only request Algolia facets and not records (hits).
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `facets` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `facets`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForFacets(searchMethodParams: LegacySearchMethodProps | SearchMethodParams, requestOptions?: RequestOptions | undefined): Promise<{
        results: Array<SearchForFacetValuesResponse$1>;
    }>;
    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, for example `1/newFeature`.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }: CustomPostProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>>;
    /**
     * Retrieves recommendations from selected AI models.
     *
     * Required API Key ACLs:
     *  - search
     * @param getRecommendationsParams - The getRecommendationsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRecommendations(getRecommendationsParams: GetRecommendationsParams | LegacyGetRecommendationsParams, requestOptions?: RequestOptions): Promise<GetRecommendationsResponse>;
    /**
     * Sends multiple search requests to one or more indices.  This can be useful in these cases:  - Different indices for different purposes, such as, one index for products, another one for marketing content. - Multiple searches to the same index—for example, with different filters.  Use the helper `searchForHits` or `searchForFacets` to get the results in a more convenient format, if you already know the return type you want.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchMethodParams - Muli-search request body. Results are returned in the same order as the requests.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    search<T>(searchMethodParams: SearchMethodParams | LegacySearchMethodProps, requestOptions?: RequestOptions): Promise<SearchResponses<T>>;
};

type LiteClient = ReturnType<typeof createLiteClient>;

declare function liteClient(appId: string, apiKey: string, options?: ClientOptions | undefined): LiteClient;

declare type AnyToUnknown<TSubject> = (0 extends 1 & TSubject ? true : false) extends true ? unknown : TSubject;
declare type SearchClientShape = {
    search: unknown;
};
declare type ClientLiteV5 = AnyToUnknown<
/** @ts-ignore */
ReturnType<typeof liteClient>>;
declare type ClientSearchV5 = AnyToUnknown<
/** @ts-ignore */
ReturnType<typeof searchClient>>;
declare type ClientV5 = ClientLiteV5 extends SearchClientShape ? ClientLiteV5 : ClientSearchV5 extends SearchClientShape ? ClientSearchV5 : unknown;
declare type PickForClient<TMapping extends {
    v4: unknown;
    v5: unknown;
}> = ClientV5 extends SearchClientShape ? TMapping['v5'] : TMapping['v4'];
declare type SearchClient = PickForClient<{
    /** @ts-ignore */
    v4: undefined;
    /** @ts-ignore */
    v5: ClientV5;
}>;
declare type MultipleQueriesQuery = PickForClient<{
    /** @ts-ignore */
    v4: undefined;
    /** @ts-ignore */
    v5: LegacySearchMethodProps[number];
}>;
declare type SearchForFacetValuesResponse = PickForClient<{
    /** @ts-ignore */
    v4: SearchForFacetValuesResponse$2;
    /** @ts-ignore */
    v5: SearchForFacetValuesResponse$1;
}>;
declare type FacetHit$1 = PickForClient<{
    /** @ts-ignore */
    v4: undefined;
    /** @ts-ignore */
    v5: FacetHits;
}>;

declare type SearchResponse<TObject> = SearchResponse$2<TObject> & {
    _automaticInsights?: true;
};

declare type FacetHit = {
    label: string;
    count: number;
    _highlightResult: {
        label: {
            value: string;
        };
    };
};
declare type TransformResponseParams<THit> = {
    results: Array<SearchResponse<THit> | SearchForFacetValuesResponse>;
    hits: Array<SearchResponse<THit>['hits']>;
    facetHits: FacetHit[][];
};
declare type TransformedRequesterResponse<THit> = Array<SearchResponse<THit>['hits']> | SearchResponse<THit>['hits'] | FacetHit[][] | FacetHit[];
declare type TransformResponse<THit> = (response: TransformResponseParams<THit>) => TransformedRequesterResponse<THit>;
declare type FetcherParamsQuery<THit> = {
    query: MultipleQueriesQuery;
    sourceId: string;
    transformResponse: TransformResponse<THit>;
};
declare type ExecuteParams<THit> = {
    searchClient: SearchClient;
    requests: Array<FetcherParamsQuery<THit>>;
};
declare type Execute<THit> = (params: ExecuteParams<THit>) => Promise<ExecuteResponse<THit>>;
declare type ExecuteResponse<THit> = Array<{
    items: SearchResponse<THit> | SearchForFacetValuesResponse;
    sourceId: string;
    transformResponse: TransformResponse<THit>;
}>;
declare type RequesterDescription<THit> = {
    /**
     * The search client used for this request. Multiple queries with the same client are batched (if `requesterId` is also the same).
     */
    searchClient: SearchClient;
    /**
     * Identifies requesters to confirm their queries should be batched.
     * This ensures that requesters with the same client but different
     * post-processing functions don't get batched.
     * When falsy, batching is disabled.
     * For example, the Algolia requesters use "algolia".
     */
    requesterId?: string;
    /**
     * The search parameters used for this query.
     */
    queries: MultipleQueriesQuery[];
    /**
     * Transforms the response of this search before returning it to the caller.
     */
    transformResponse: TransformResponse<THit>;
    /**
     * Post-processing function for multi-queries.
     */
    execute: Execute<THit>;
};

declare type AutocompleteEnvironment = Window | {
    [prop: string]: unknown;
    addEventListener: Window['addEventListener'];
    removeEventListener: Window['removeEventListener'];
    setTimeout: Window['setTimeout'];
    clearTimeout: Window['clearTimeout'];
    document: Window['document'];
    location: {
        assign: Location['assign'];
    };
    open: Window['open'];
    navigator?: Partial<Window['navigator']>;
};

declare type AutocompleteReshapeSource<TItem extends BaseItem> = AutocompleteSource$1<TItem> & {
    getItems(): TItem[];
};
declare type AutocompleteReshapeSourcesBySourceId<TItem extends BaseItem> = Record<string, AutocompleteReshapeSource<TItem>>;
declare type ReshapeParams<TItem extends BaseItem, TState extends AutocompleteState$1<TItem> = AutocompleteState$1<TItem>> = {
    /**
     * The resolved sources provided by [`getSources`](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getsources)
     */
    sources: Array<AutocompleteReshapeSource<TItem>>;
    /**
     * The resolved sources grouped by [`sourceId`](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-sourceid)s
     */
    sourcesBySourceId: AutocompleteReshapeSourcesBySourceId<TItem>;
    /**
     * The current Autocomplete state.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state
     */
    state: TState;
};
declare type Reshape<TItem extends BaseItem, TState extends AutocompleteState$1<TItem> = AutocompleteState$1<TItem>> = (params: ReshapeParams<TItem, TState>) => Array<AutocompleteReshapeSource<TItem>>;
declare type PluginReshape<TItem extends BaseItem, TState extends AutocompleteState$1<TItem> = AutocompleteState$1<TItem>> = (params: Omit<ReshapeParams<TItem, TState>, 'sources'>) => Omit<ReshapeParams<TItem, TState>, 'sources'>;

declare type PluginSubscriber<TParams> = (params: TParams) => void;
interface PluginSubscribeParams<TItem extends BaseItem> extends AutocompleteScopeApi<TItem> {
    onSelect(fn: PluginSubscriber<OnSelectParams$1<TItem>>): void;
    onActive(fn: PluginSubscriber<OnActiveParams$1<TItem>>): void;
    onResolve(fn: PluginSubscriber<OnResolveParams<TItem>>): void;
}
declare type AutocompletePlugin<TItem extends BaseItem, TData = unknown> = Partial<Pick<AutocompleteOptions$1<any>, 'onStateChange' | 'onSubmit' | 'onReset'> & Pick<AutocompleteOptions$1<TItem>, 'getSources'>> & {
    /**
     * The function called when Autocomplete starts.
     *
     * It lets you subscribe to lifecycle hooks and interact with the instance's state and context.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#param-subscribe
     */
    subscribe?(params: PluginSubscribeParams<any>): void;
    /**
     * An extra plugin object to expose properties and functions as APIs.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#param-data
     */
    data?: TData;
    /**
     * A name to identify the plugin.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#param-name
     */
    name?: string;
    /**
     * A function to reshape the sources.
     *
     * It gets called before the user's reshape function.
     */
    reshape?: PluginReshape<TItem>;
    /**
     * @internal
     */
    __autocomplete_pluginOptions?: Record<string, any>;
};

declare type AutocompleteEnterKeyHint = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
interface OnSubmitParams<TItem extends BaseItem> extends AutocompleteScopeApi<TItem> {
    state: AutocompleteState$1<TItem>;
    event: any;
}
declare type OnResetParams<TItem extends BaseItem> = OnSubmitParams<TItem>;
interface OnInputParams<TItem extends BaseItem> extends AutocompleteScopeApi<TItem> {
    query: string;
    state: AutocompleteState$1<TItem>;
}
declare type GetSourcesParams<TItem extends BaseItem> = OnInputParams<TItem>;
declare type GetSources<TItem extends BaseItem> = (params: GetSourcesParams<TItem>) => MaybePromise<Array<AutocompleteSource$1<TItem> | boolean | undefined>>;
interface OnStateChangeProps<TItem extends BaseItem> extends AutocompleteScopeApi<TItem> {
    /**
     * The current Autocomplete state.
     */
    state: AutocompleteState$1<TItem>;
    /**
     * The previous Autocomplete state.
     */
    prevState: AutocompleteState$1<TItem>;
}
interface AutocompleteOptions$1<TItem extends BaseItem> {
    /**
     * A flag to activate the debug mode.
     *
     * This is useful while developing because it keeps the panel open even when the blur event occurs. **Make sure to disable it in production.**
     *
     * See [**Debugging**](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/debugging/) for more information.
     *
     * @default false
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-debug
     */
    debug?: boolean;
    /**
     * An ID for the autocomplete to create accessible attributes.
     *
     * It is incremented by default when creating a new Autocomplete instance.
     *
     * @default "autocomplete-0"
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-id
     */
    id?: string;
    /**
     * The function called when the internal state changes.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-onstatechange
     */
    onStateChange?(props: OnStateChangeProps<TItem>): void;
    /**
     * The action label or icon to present for the enter key on virtual keyboards.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-enterkeyhint
     */
    enterKeyHint?: AutocompleteEnterKeyHint;
    /**
     * Whether to update the search input value in the middle of a
     * composition session.
     *
     * @default false
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-ignorecompositionevents
     */
    ignoreCompositionEvents?: boolean;
    /**
     * The placeholder text to show in the search input when there's no query.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-placeholder
     */
    placeholder?: string;
    /**
     * Whether to focus the search input or not when the page is loaded.
     *
     * @default false
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-autofocus
     */
    autoFocus?: boolean;
    /**
     * The default item index to pre-select.
     *
     * We recommend using `0` when the autocomplete is used to open links, instead of triggering a search in an application.
     *
     * @default null
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-defaultactiveitemid
     */
    defaultActiveItemId?: number | null;
    /**
     * Whether to open the panel on focus when there's no query.
     *
     * @default false
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-openonfocus
     */
    openOnFocus?: boolean;
    /**
     * How many milliseconds must elapse before considering the autocomplete experience [stalled](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-status).
     *
     * @default 300
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-stallthreshold
     */
    stallThreshold?: number;
    /**
     * The initial state to apply when autocomplete is created.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-initialstate
     */
    initialState?: Partial<AutocompleteState$1<TItem>>;
    /**
     * The [sources](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/) to get the suggestions from.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-getsources
     */
    getSources?: GetSources<TItem>;
    /**
     * The environment in which your application is running.
     *
     * This is useful if you're using autocomplete in a different context than `window`.
     *
     * @default window
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-environment
     */
    environment?: AutocompleteEnvironment;
    /**
     * An implementation of Autocomplete's Navigator API to redirect the user when opening a link.
     *
     * Learn more on the [**Navigator API**](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/) documentation.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-navigator
     */
    navigator?: Partial<AutocompleteNavigator<TItem>>;
    /**
     * The function called to determine whether the panel should open or not.
     *
     * By default, the panel opens when there are items in the state.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-shouldpanelopen
     */
    shouldPanelOpen?(params: {
        state: AutocompleteState$1<TItem>;
    }): boolean;
    /**
     * The function called when submitting the Autocomplete form.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-onsubmit
     */
    onSubmit?(params: OnSubmitParams<TItem>): void;
    /**
     * The function called when resetting the Autocomplete form.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-onreset
     */
    onReset?(params: OnResetParams<TItem>): void;
    /**
     * The plugins that encapsulate and distribute custom Autocomplete behaviors.
     *
     * See [**Plugins**](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/) for more information.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-plugins
     */
    plugins?: Array<AutocompletePlugin<any, any>>;
    /**
     * The function called to reshape the sources after they're resolved.
     *
     * This is useful to transform sources before rendering them. You can group sources by attribute, remove duplicates, create shared limits between sources, etc.
     *
     * See [**Reshaping sources**](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/reshaping-sources/) for more information.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-reshape
     */
    reshape?: Reshape<TItem>;
}

interface OnSelectParams$1<TItem extends BaseItem> extends AutocompleteScopeApi<TItem> {
    state: AutocompleteState$1<TItem>;
    event: any;
    item: TItem;
    itemInputValue: ReturnType<InternalAutocompleteSource$1<TItem>['getItemInputValue']>;
    itemUrl: ReturnType<InternalAutocompleteSource$1<TItem>['getItemUrl']>;
    source: InternalAutocompleteSource$1<TItem>;
}
declare type OnActiveParams$1<TItem extends BaseItem> = OnSelectParams$1<TItem>;
declare type OnResolveParams<TItem extends BaseItem> = {
    source: AutocompleteSource$1<TItem>;
    results: SearchForFacetValuesResponse | SearchResponse<TItem> | TItem[] | TItem[][];
    items: FacetHit$1[][] | FacetHit$1[] | Array<Hit$1<TItem>> | Array<SearchForFacetValuesResponse | SearchResponse<TItem> | TItem[] | TItem[][]>;
    state: AutocompleteState$1<TItem>;
};
declare type DefaultIndicator = {
    /**
     * Optional key on a function to indicate it's the default value of this function.
     */
    __default?: boolean;
};
interface AutocompleteSource$1<TItem extends BaseItem> {
    /**
     * Unique identifier for the source.
     */
    sourceId: string;
    /**
     * The function called to get the value of an item.
     *
     * The value is used to fill the search box.
     */
    getItemInputValue?: DefaultIndicator & (({ item, state, }: {
        item: TItem;
        state: AutocompleteState$1<TItem>;
    }) => string);
    /**
     * The function called to get the URL of the item.
     *
     * The value is used to add [keyboard accessibility](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/) features to let users open items in the current tab, a new tab, or a new window.
     */
    getItemUrl?: DefaultIndicator & (({ item, state, }: {
        item: TItem;
        state: AutocompleteState$1<TItem>;
    }) => string | undefined);
    /**
     * The function called when the input changes.
     *
     * You can use this function to filter the items based on the query.
     */
    getItems(params: GetSourcesParams<TItem>): MaybePromise<TItem[] | TItem[][] | RequesterDescription<TItem>>;
    /**
     * The function called whenever an item is selected.
     */
    onSelect?: DefaultIndicator & ((params: OnSelectParams$1<TItem>) => void);
    /**
     * The function called whenever an item is active.
     *
     * You can trigger different behaviors if the item is active depending on the triggering event using the `event` parameter.
     */
    onActive?: DefaultIndicator & ((params: OnActiveParams$1<TItem>) => void);
    /**
     * The function called whenever a source resolves.
     */
    onResolve?: DefaultIndicator & ((params: OnResolveParams<TItem>) => void);
}
declare type InternalAutocompleteSource$1<TItem extends BaseItem> = {
    [KParam in keyof AutocompleteSource$1<TItem>]-?: AutocompleteSource$1<TItem>[KParam];
};

interface AutocompleteCollection$1<TItem extends BaseItem> {
    source: InternalAutocompleteSource$1<TItem>;
    items: TItem[];
}
interface AutocompleteCollectionItemsArray<TItem extends BaseItem> {
    source: InternalAutocompleteSource$1<TItem>;
    items: TItem[][];
}

interface AutocompleteContext {
    [key: string]: unknown;
}

interface AutocompleteState$1<TItem extends BaseItem> {
    activeItemId: number | null;
    query: string;
    completion: string | null;
    collections: Array<AutocompleteCollection$1<TItem>>;
    isOpen: boolean;
    status: 'idle' | 'loading' | 'stalled' | 'error';
    context: AutocompleteContext;
}

interface AutocompleteNavigator<TItem extends BaseItem> {
    /**
     * Called when a URL should be open in the current page.
     */
    navigate(params: {
        itemUrl: string;
        item: TItem;
        state: AutocompleteState$1<TItem>;
    }): void;
    /**
     * Called when a URL should be open in a new tab.
     */
    navigateNewTab(params: {
        itemUrl: string;
        item: TItem;
        state: AutocompleteState$1<TItem>;
    }): void;
    /**
     * Called when a URL should be open in a new window.
     */
    navigateNewWindow(params: {
        itemUrl: string;
        item: TItem;
        state: AutocompleteState$1<TItem>;
    }): void;
}

declare type StateUpdater<TState> = (value: TState) => void;
interface AutocompleteSetters<TItem extends BaseItem> {
    /**
     * Sets the highlighted item index.
     *
     * Pass `null` to unselect items.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-setactiveitemid
     */
    setActiveItemId: StateUpdater<AutocompleteState$1<TItem>['activeItemId']>;
    /**
     * Sets the query.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-setquery
     */
    setQuery: StateUpdater<AutocompleteState$1<TItem>['query']>;
    /**
     * Sets the collections.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-setcollections
     */
    setCollections: StateUpdater<Array<AutocompleteCollection$1<TItem> | AutocompleteCollectionItemsArray<TItem>>>;
    /**
     * Sets whether the panel is open or not.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-setisopen
     */
    setIsOpen: StateUpdater<AutocompleteState$1<TItem>['isOpen']>;
    /**
     * Sets the status of the autocomplete.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-setisopen
     */
    setStatus: StateUpdater<AutocompleteState$1<TItem>['status']>;
    /**
     * Sets the context passed to lifecycle hooks.
     *
     * See more in [**Context**](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/context/).
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-setcontext
     */
    setContext: StateUpdater<AutocompleteState$1<TItem>['context']>;
}

declare type BaseItem = Record<string, unknown>;
interface AutocompleteScopeApi<TItem extends BaseItem> extends AutocompleteSetters<TItem> {
    /**
     * Triggers a search to refresh the state.
     */
    refresh(): Promise<void>;
    /**
     * Functions to navigate to a URL.
     */
    navigator: AutocompleteNavigator<TItem>;
}

declare type Pragma = (type: any, props: Record<string, any> | null, ...children: ComponentChildren[]) => VNode<any>;
declare type PragmaFrag = any;
declare type ComponentChild = VNode<any> | string | number | boolean | null | undefined;
declare type ComponentChildren = ComponentChild[] | ComponentChild;
declare type VNode<TProps = {}> = {
    type: any;
    key: string | number | any;
    props: TProps & {
        children: ComponentChildren;
    };
};
declare type Render = (vnode: ComponentChild, parent: Element | Document | ShadowRoot | DocumentFragment, replaceNode?: Element | Text | undefined) => void;
declare type AutocompleteRenderer = {
    /**
     * The function to create virtual nodes.
     *
     * @default preact.createElement
     */
    createElement: Pragma;
    /**
     * The component to use to create fragments.
     *
     * @default preact.Fragment
     */
    Fragment: PragmaFrag;
    /**
     * The function to render children to an element.
     */
    render?: Render;
};
declare type HTMLTemplate = (strings: TemplateStringsArray, ...values: any[]) => VNode | VNode[];

declare type HighlightHitParams<THit> = {
    /**
     * The Algolia hit whose attribute to retrieve the highlighted parts from.
     */
    hit: THit;
    /**
     * The attribute to retrieve the highlighted parts from.
     *
     * You can use the array syntax to reference nested attributes.
     */
    attribute: keyof THit | Array<string | number>;
    /**
     * The tag name to use for highlighted parts.
     *
     * @default "mark"
     */
    tagName?: string;
};

declare type AutocompleteHighlightComponent = <THit>({ hit, attribute, tagName, }: HighlightHitParams<THit>) => VNode<any>;
declare type PublicAutocompleteComponents = Record<string, (props: any) => VNode<any>>;
interface AutocompleteComponents extends PublicAutocompleteComponents {
    /**
     * Highlight matches in an Algolia hit.
     */
    Highlight: AutocompleteHighlightComponent;
    /**
     * Reverse-highlight matches in an Algolia hit.
     */
    ReverseHighlight: AutocompleteHighlightComponent;
    /**
     * Reverse-highlight and snippets matches in an Algolia hit.
     */
    ReverseSnippet: AutocompleteHighlightComponent;
    /**
     * Highlight and snippet matches in an Algolia hit.
     */
    Snippet: AutocompleteHighlightComponent;
}

declare type AutocompleteState<TItem extends BaseItem> = Omit<AutocompleteState$1<TItem>, 'collections'> & {
    /**
     * The collections of items.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/state/#param-collections
     */
    collections: Array<AutocompleteCollection<TItem>>;
};

declare type Template<TParams> = (params: TParams & AutocompleteRenderer & {
    components: AutocompleteComponents;
    html: HTMLTemplate;
}) => VNode | VNode[] | string;
/**
 * Templates to display in the autocomplete panel.
 *
 * A template can either return a string, or perform DOM mutations (manipulating DOM elements with JavaScript and attaching events) without returning a string.
 */
declare type SourceTemplates<TItem extends BaseItem> = {
    /**
     * A function that returns the template for each item of the source.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#param-item
     */
    item: Template<{
        item: TItem;
        state: AutocompleteState<TItem>;
    }>;
    /**
     * A function that returns the template for the header (before the list of items).
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#param-header
     */
    header?: Template<{
        state: AutocompleteState<TItem>;
        source: AutocompleteSource<TItem>;
        items: TItem[];
    }>;
    /**
     * A function that returns the template for the footer (after the list of items).
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#param-footer
     */
    footer?: Template<{
        state: AutocompleteState<TItem>;
        source: AutocompleteSource<TItem>;
        items: TItem[];
    }>;
    /**
     * A function that returns the template for when there are no items.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#param-noresults
     */
    noResults?: Template<{
        state: AutocompleteState<TItem>;
        source: AutocompleteSource<TItem>;
    }>;
};
declare type WithTemplates<TType, TItem extends BaseItem> = TType & {
    /**
     * A set of templates to customize how sections and their items are displayed.
     *
     * See [**Displaying items with Templates**](templates) for more information.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-templates
     */
    templates: SourceTemplates<TItem>;
};
interface AutocompleteCoreSourceWithDocs<TItem extends BaseItem> extends AutocompleteSource$1<TItem> {
    /**
     * Unique identifier for the source.
     *
     * It is used as value for the `data-autocomplete-source-id` attribute of the source `section` container.
     */
    sourceId: string;
}
declare type AutocompleteSource<TItem extends BaseItem> = WithTemplates<AutocompleteCoreSourceWithDocs<TItem>, TItem>;
declare type InternalAutocompleteSource<TItem extends BaseItem> = WithTemplates<InternalAutocompleteSource$1<TItem>, TItem>;

interface AutocompleteCollection<TItem extends BaseItem> {
    source: InternalAutocompleteSource<TItem>;
    items: TItem[];
}

declare type AlgoliaInsightsHit = {
    objectID: string;
    __autocomplete_indexName: string;
    __autocomplete_queryID: string;
    __autocomplete_algoliaCredentials: {
        appId: string;
        apiKey: string;
    };
};

declare function createSearchInsightsApi(searchInsights: InsightsClient): {
    /**
     * Initializes Insights with Algolia credentials.
     */
    init(appId: string, apiKey: string): void;
    /**
     * Sets the authenticated user token to attach to events.
     * Unsets the authenticated token by passing `undefined`.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/set-authenticated-user-token/
     */
    setAuthenticatedUserToken(authenticatedUserToken: string | undefined): void;
    /**
     * Sets the user token to attach to events.
     */
    setUserToken(userToken: string): void;
    /**
     * Sends click events to capture a query and its clicked items and positions.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids-after-search/
     */
    clickedObjectIDsAfterSearch(...params: Array<WithArbitraryParams<InsightsParamsWithItems<ClickedObjectIDsAfterSearchParams>>>): void;
    /**
     * Sends click events to capture clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids/
     */
    clickedObjectIDs(...params: Array<WithArbitraryParams<InsightsParamsWithItems<ClickedObjectIDsParams>>>): void;
    /**
     * Sends click events to capture the filters a user clicks on.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/clicked-filters/
     */
    clickedFilters(...params: Array<WithArbitraryParams<ClickedFiltersParams>>): void;
    /**
     * Sends conversion events to capture a query and its clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids-after-search/
     */
    convertedObjectIDsAfterSearch(...params: Array<WithArbitraryParams<InsightsParamsWithItems<ConvertedObjectIDsAfterSearchParams>>>): void;
    /**
     * Sends conversion events to capture clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids/
     */
    convertedObjectIDs(...params: Array<WithArbitraryParams<InsightsParamsWithItems<ConvertedObjectIDsParams>>>): void;
    /**
     * Sends conversion events to capture the filters a user uses when converting.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/converted-filters/
     */
    convertedFilters(...params: Array<WithArbitraryParams<ConvertedFiltersParams>>): void;
    /**
     * Sends view events to capture clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/viewed-object-ids/
     */
    viewedObjectIDs(...params: Array<WithArbitraryParams<InsightsParamsWithItems<ViewedObjectIDsParams>>>): void;
    /**
     * Sends view events to capture the filters a user uses when viewing.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/viewed-filters/
     */
    viewedFilters(...params: Array<WithArbitraryParams<ViewedFiltersParams>>): void;
};

declare type AutocompleteInsightsApi = ReturnType<typeof createSearchInsightsApi>;
declare type WithArbitraryParams<TParams extends Record<string, unknown>> = Record<string, unknown> & TParams;
declare type InsightsParamsWithItems<TParams extends {
    objectIDs: string[];
}> = Omit<TParams, 'objectIDs'> & {
    items: AlgoliaInsightsHit[];
    /**
     * @deprecated use `items` instead
     */
    objectIDs?: string[];
};
declare type ClickedObjectIDsAfterSearchParams = {
    eventName: string;
    index: string;
    objectIDs: string[];
    positions: number[];
    queryID: string;
    userToken?: string;
};
declare type ClickedObjectIDsParams = {
    eventName: string;
    index: string;
    objectIDs: string[];
    userToken?: string;
};
declare type ClickedFiltersParams = {
    eventName: string;
    filters: string[];
    index: string;
    userToken: string;
};
declare type ConvertedObjectIDsAfterSearchParams = {
    eventName: string;
    index: string;
    objectIDs: string[];
    queryID: string;
    userToken?: string;
};
declare type ConvertedObjectIDsParams = {
    eventName: string;
    index: string;
    objectIDs: string[];
    userToken: string;
};
declare type ConvertedFiltersParams = {
    eventName: string;
    filters: string[];
    index: string;
    userToken: string;
};
declare type ViewedObjectIDsParams = {
    eventName: string;
    index: string;
    objectIDs: string[];
    userToken?: string;
};
declare type ViewedFiltersParams = {
    eventName: string;
    filters: string[];
    index: string;
    userToken: string;
};

declare type OnSelectParams = {
    insights: AutocompleteInsightsApi;
    insightsEvents: Array<InsightsParamsWithItems<ClickedObjectIDsAfterSearchParams & {
        algoliaSource?: string[];
    }>>;
    item: AlgoliaInsightsHit;
    state: AutocompleteState<any>;
    event: any;
};
declare type OnActiveParams = OnSelectParams;
declare type OnItemsChangeParams = {
    insights: AutocompleteInsightsApi;
    insightsEvents: Array<InsightsParamsWithItems<ViewedObjectIDsParams & {
        algoliaSource?: string[];
    }>>;
    state: AutocompleteState<any>;
};

declare type InsightsMethodMap = InsightsMethodMap$1;
declare type QueueItemMap = Record<string, unknown>;
declare type QueueItem = QueueItemMap[keyof QueueItemMap];
declare type InsightsClient = InsightsClient$1 & {
    queue?: QueueItem[];
    version?: string;
};

declare type CreateAlgoliaInsightsPluginParams = {
    /**
     * The initialized Search Insights client.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/createAlgoliaInsightsPlugin/#param-insightsclient
     */
    insightsClient?: InsightsClient;
    /**
     * Insights parameters to forward to the Insights client’s init method.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/createAlgoliaInsightsPlugin/#param-insightsinitparams
     */
    insightsInitParams?: Partial<InsightsMethodMap['init'][0]>;
    /**
     * Hook to send an Insights event when the items change.
     *
     * By default, it sends a `viewedObjectIDs` event.
     *
     * In as-you-type experiences, items change as the user types. This hook is debounced every 400ms to reflect actual items that users notice and avoid generating too many events for items matching "in progress" queries.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/createAlgoliaInsightsPlugin/#param-onitemschange
     */
    onItemsChange?(params: OnItemsChangeParams): void;
    /**
     * Hook to send an Insights event when an item is selected.
     *
     * By default, it sends a clickedObjectIDsAfterSearch event.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/createAlgoliaInsightsPlugin/#param-onselect
     */
    onSelect?(params: OnSelectParams): void;
    /**
     * Hook to send an Insights event when an item is active.
     *
     * By default, it doesn't send any events.
     *
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/createAlgoliaInsightsPlugin/#param-onactive
     */
    onActive?(params: OnActiveParams): void;
    /**
     * @internal
     */
    __autocomplete_clickAnalytics?: boolean;
};

declare type InsightsOption = {
    /**
     * Whether to enable the Insights plugin and load the Insights library if it has not been loaded yet.
     *
     * See [**autocomplete-plugin-algolia-insights**](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/) for more information.
     *
     * @default undefined
     * @link https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-insights
     */
    insights?: CreateAlgoliaInsightsPluginParams | boolean | undefined;
};
interface AutocompleteOptions<TItem extends BaseItem> extends AutocompleteOptions$1<TItem>, InsightsOption {
}

// ==================================================================================================
// JSON Schema Draft 07
// ==================================================================================================
// https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
// --------------------------------------------------------------------------------------------------

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
type JSONSchema7TypeName =
    | "string" //
    | "number"
    | "integer"
    | "boolean"
    | "object"
    | "array"
    | "null";

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
type JSONSchema7Type =
    | string //
    | number
    | boolean
    | JSONSchema7Object
    | JSONSchema7Array
    | null;

// Workaround for infinite type recursion
interface JSONSchema7Object {
    [key: string]: JSONSchema7Type;
}

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
interface JSONSchema7Array extends Array<JSONSchema7Type> {}

/**
 * Meta schema
 *
 * Recommended values:
 * - 'http://json-schema.org/schema#'
 * - 'http://json-schema.org/hyper-schema#'
 * - 'http://json-schema.org/draft-07/schema#'
 * - 'http://json-schema.org/draft-07/hyper-schema#'
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-5
 */
type JSONSchema7Version = string;

/**
 * JSON Schema v7
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 */
type JSONSchema7Definition = JSONSchema7 | boolean;
interface JSONSchema7 {
    $id?: string | undefined;
    $ref?: string | undefined;
    $schema?: JSONSchema7Version | undefined;
    $comment?: string | undefined;

    /**
     * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-8.2.4
     * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#appendix-A
     */
    $defs?: {
        [key: string]: JSONSchema7Definition;
    } | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
     */
    type?: JSONSchema7TypeName | JSONSchema7TypeName[] | undefined;
    enum?: JSONSchema7Type[] | undefined;
    const?: JSONSchema7Type | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
     */
    multipleOf?: number | undefined;
    maximum?: number | undefined;
    exclusiveMaximum?: number | undefined;
    minimum?: number | undefined;
    exclusiveMinimum?: number | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
     */
    maxLength?: number | undefined;
    minLength?: number | undefined;
    pattern?: string | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
     */
    items?: JSONSchema7Definition | JSONSchema7Definition[] | undefined;
    additionalItems?: JSONSchema7Definition | undefined;
    maxItems?: number | undefined;
    minItems?: number | undefined;
    uniqueItems?: boolean | undefined;
    contains?: JSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
     */
    maxProperties?: number | undefined;
    minProperties?: number | undefined;
    required?: string[] | undefined;
    properties?: {
        [key: string]: JSONSchema7Definition;
    } | undefined;
    patternProperties?: {
        [key: string]: JSONSchema7Definition;
    } | undefined;
    additionalProperties?: JSONSchema7Definition | undefined;
    dependencies?: {
        [key: string]: JSONSchema7Definition | string[];
    } | undefined;
    propertyNames?: JSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
     */
    if?: JSONSchema7Definition | undefined;
    then?: JSONSchema7Definition | undefined;
    else?: JSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
     */
    allOf?: JSONSchema7Definition[] | undefined;
    anyOf?: JSONSchema7Definition[] | undefined;
    oneOf?: JSONSchema7Definition[] | undefined;
    not?: JSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
     */
    format?: string | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
     */
    contentMediaType?: string | undefined;
    contentEncoding?: string | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
     */
    definitions?: {
        [key: string]: JSONSchema7Definition;
    } | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
     */
    title?: string | undefined;
    description?: string | undefined;
    default?: JSONSchema7Type | undefined;
    readOnly?: boolean | undefined;
    writeOnly?: boolean | undefined;
    examples?: JSONSchema7Type | undefined;
}

type SharedV2Headers = Record<string, string>;

/**
A JSON value can be a string, number, boolean, object, array, or null.
JSON values can be serialized and deserialized by the JSON.stringify and JSON.parse methods.
 */
type JSONValue = null | string | number | boolean | JSONObject | JSONArray;
type JSONObject = {
    [key: string]: JSONValue;
};
type JSONArray = JSONValue[];

/**
 * Additional provider-specific metadata.
 * Metadata are additional outputs from the provider.
 * They are passed through to the provider from the AI SDK
 * and enable provider-specific functionality
 * that can be fully encapsulated in the provider.
 *
 * This enables us to quickly ship provider-specific functionality
 * without affecting the core AI SDK.
 *
 * The outer record is keyed by the provider name, and the inner
 * record is keyed by the provider-specific metadata key.
 *
 * ```ts
 * {
 *   "anthropic": {
 *     "cacheControl": { "type": "ephemeral" }
 *   }
 * }
 * ```
 */
type SharedV2ProviderMetadata = Record<string, Record<string, JSONValue>>;

/**
 * Additional provider-specific options.
 * Options are additional input to the provider.
 * They are passed through to the provider from the AI SDK
 * and enable provider-specific functionality
 * that can be fully encapsulated in the provider.
 *
 * This enables us to quickly ship provider-specific functionality
 * without affecting the core AI SDK.
 *
 * The outer record is keyed by the provider name, and the inner
 * record is keyed by the provider-specific metadata key.
 *
 * ```ts
 * {
 *   "anthropic": {
 *     "cacheControl": { "type": "ephemeral" }
 *   }
 * }
 * ```
 */
type SharedV2ProviderOptions = Record<string, Record<string, JSONValue>>;

/**
An embedding is a vector, i.e. an array of numbers.
It is e.g. used to represent a text as a vector of word embeddings.
 */
type EmbeddingModelV2Embedding = Array<number>;

/**
Specification for an embedding model that implements the embedding model
interface version 1.

VALUE is the type of the values that the model can embed.
This will allow us to go beyond text embeddings in the future,
e.g. to support image embeddings
 */
type EmbeddingModelV2<VALUE> = {
    /**
  The embedding model must specify which embedding model interface
  version it implements. This will allow us to evolve the embedding
  model interface and retain backwards compatibility. The different
  implementation versions can be handled as a discriminated union
  on our side.
     */
    readonly specificationVersion: 'v2';
    /**
  Name of the provider for logging purposes.
     */
    readonly provider: string;
    /**
  Provider-specific model ID for logging purposes.
     */
    readonly modelId: string;
    /**
  Limit of how many embeddings can be generated in a single API call.
  
  Use Infinity for models that do not have a limit.
     */
    readonly maxEmbeddingsPerCall: PromiseLike<number | undefined> | number | undefined;
    /**
  True if the model can handle multiple embedding calls in parallel.
     */
    readonly supportsParallelCalls: PromiseLike<boolean> | boolean;
    /**
  Generates a list of embeddings for the given input text.
  
  Naming: "do" prefix to prevent accidental direct usage of the method
  by the user.
     */
    doEmbed(options: {
        /**
    List of values to embed.
         */
        values: Array<VALUE>;
        /**
    Abort signal for cancelling the operation.
         */
        abortSignal?: AbortSignal;
        /**
    Additional provider-specific options. They are passed through
    to the provider from the AI SDK and enable provider-specific
    functionality that can be fully encapsulated in the provider.
        */
        providerOptions?: SharedV2ProviderOptions;
        /**
      Additional HTTP headers to be sent with the request.
      Only applicable for HTTP-based providers.
         */
        headers?: Record<string, string | undefined>;
    }): PromiseLike<{
        /**
    Generated embeddings. They are in the same order as the input values.
         */
        embeddings: Array<EmbeddingModelV2Embedding>;
        /**
    Token usage. We only have input tokens for embeddings.
        */
        usage?: {
            tokens: number;
        };
        /**
    Additional provider-specific metadata. They are passed through
    from the provider to the AI SDK and enable provider-specific
    results that can be fully encapsulated in the provider.
         */
        providerMetadata?: SharedV2ProviderMetadata;
        /**
    Optional response information for debugging purposes.
         */
        response?: {
            /**
      Response headers.
             */
            headers?: SharedV2Headers;
            /**
            The response body.
            */
            body?: unknown;
        };
    }>;
};

type ImageModelV2CallOptions = {
    /**
  Prompt for the image generation.
       */
    prompt: string;
    /**
  Number of images to generate.
   */
    n: number;
    /**
  Size of the images to generate.
  Must have the format `{width}x{height}`.
  `undefined` will use the provider's default size.
   */
    size: `${number}x${number}` | undefined;
    /**
  Aspect ratio of the images to generate.
  Must have the format `{width}:{height}`.
  `undefined` will use the provider's default aspect ratio.
   */
    aspectRatio: `${number}:${number}` | undefined;
    /**
  Seed for the image generation.
  `undefined` will use the provider's default seed.
   */
    seed: number | undefined;
    /**
  Additional provider-specific options that are passed through to the provider
  as body parameters.
  
  The outer record is keyed by the provider name, and the inner
  record is keyed by the provider-specific metadata key.
  ```ts
  {
    "openai": {
      "style": "vivid"
    }
  }
  ```
   */
    providerOptions: SharedV2ProviderOptions;
    /**
  Abort signal for cancelling the operation.
   */
    abortSignal?: AbortSignal;
    /**
  Additional HTTP headers to be sent with the request.
  Only applicable for HTTP-based providers.
   */
    headers?: Record<string, string | undefined>;
};

/**
Warning from the model provider for this call. The call will proceed, but e.g.
some settings might not be supported, which can lead to suboptimal results.
 */
type ImageModelV2CallWarning = {
    type: 'unsupported-setting';
    setting: keyof ImageModelV2CallOptions;
    details?: string;
} | {
    type: 'other';
    message: string;
};

type ImageModelV2ProviderMetadata = Record<string, {
    images: JSONArray;
} & JSONValue>;
type GetMaxImagesPerCallFunction = (options: {
    modelId: string;
}) => PromiseLike<number | undefined> | number | undefined;
/**
Image generation model specification version 2.
 */
type ImageModelV2 = {
    /**
  The image model must specify which image model interface
  version it implements. This will allow us to evolve the image
  model interface and retain backwards compatibility. The different
  implementation versions can be handled as a discriminated union
  on our side.
     */
    readonly specificationVersion: 'v2';
    /**
  Name of the provider for logging purposes.
     */
    readonly provider: string;
    /**
  Provider-specific model ID for logging purposes.
     */
    readonly modelId: string;
    /**
  Limit of how many images can be generated in a single API call.
  Can be set to a number for a fixed limit, to undefined to use
  the global limit, or a function that returns a number or undefined,
  optionally as a promise.
     */
    readonly maxImagesPerCall: number | undefined | GetMaxImagesPerCallFunction;
    /**
  Generates an array of images.
     */
    doGenerate(options: ImageModelV2CallOptions): PromiseLike<{
        /**
    Generated images as base64 encoded strings or binary data.
    The images should be returned without any unnecessary conversion.
    If the API returns base64 encoded strings, the images should be returned
    as base64 encoded strings. If the API returns binary data, the images should
    be returned as binary data.
         */
        images: Array<string> | Array<Uint8Array>;
        /**
    Warnings for the call, e.g. unsupported settings.
         */
        warnings: Array<ImageModelV2CallWarning>;
        /**
    Additional provider-specific metadata. They are passed through
    from the provider to the AI SDK and enable provider-specific
    results that can be fully encapsulated in the provider.
    
    The outer record is keyed by the provider name, and the inner
    record is provider-specific metadata. It always includes an
    `images` key with image-specific metadata
    
    ```ts
    {
      "openai": {
        "images": ["revisedPrompt": "Revised prompt here."]
      }
    }
    ```
          */
        providerMetadata?: ImageModelV2ProviderMetadata;
        /**
    Response information for telemetry and debugging purposes.
         */
        response: {
            /**
      Timestamp for the start of the generated response.
            */
            timestamp: Date;
            /**
      The ID of the response model that was used to generate the response.
            */
            modelId: string;
            /**
      Response headers.
            */
            headers: Record<string, string> | undefined;
        };
    }>;
};

/**
A tool has a name, a description, and a set of parameters.

Note: this is **not** the user-facing tool definition. The AI SDK methods will
map the user-facing tool definitions to this format.
 */
type LanguageModelV2FunctionTool = {
    /**
  The type of the tool (always 'function').
     */
    type: 'function';
    /**
  The name of the tool. Unique within this model call.
     */
    name: string;
    /**
  A description of the tool. The language model uses this to understand the
  tool's purpose and to provide better completion suggestions.
     */
    description?: string;
    /**
  The parameters that the tool expects. The language model uses this to
  understand the tool's input requirements and to provide matching suggestions.
     */
    inputSchema: JSONSchema7;
    /**
  The provider-specific options for the tool.
     */
    providerOptions?: SharedV2ProviderOptions;
};

/**
Data content. Can be a Uint8Array, base64 encoded data as a string or a URL.
*/
type LanguageModelV2DataContent = Uint8Array | string | URL;

/**
A prompt is a list of messages.

Note: Not all models and prompt formats support multi-modal inputs and
tool calls. The validation happens at runtime.

Note: This is not a user-facing prompt. The AI SDK methods will map the
user-facing prompt types such as chat or instruction prompts to this format.
 */
type LanguageModelV2Prompt = Array<LanguageModelV2Message>;
type LanguageModelV2Message = ({
    role: 'system';
    content: string;
} | {
    role: 'user';
    content: Array<LanguageModelV2TextPart | LanguageModelV2FilePart>;
} | {
    role: 'assistant';
    content: Array<LanguageModelV2TextPart | LanguageModelV2FilePart | LanguageModelV2ReasoningPart | LanguageModelV2ToolCallPart | LanguageModelV2ToolResultPart>;
} | {
    role: 'tool';
    content: Array<LanguageModelV2ToolResultPart>;
}) & {
    /**
     * Additional provider-specific options. They are passed through
     * to the provider from the AI SDK and enable provider-specific
     * functionality that can be fully encapsulated in the provider.
     */
    providerOptions?: SharedV2ProviderOptions;
};
/**
Text content part of a prompt. It contains a string of text.
 */
interface LanguageModelV2TextPart {
    type: 'text';
    /**
  The text content.
     */
    text: string;
    /**
     * Additional provider-specific options. They are passed through
     * to the provider from the AI SDK and enable provider-specific
     * functionality that can be fully encapsulated in the provider.
     */
    providerOptions?: SharedV2ProviderOptions;
}
/**
Reasoning content part of a prompt. It contains a string of reasoning text.
 */
interface LanguageModelV2ReasoningPart {
    type: 'reasoning';
    /**
  The reasoning text.
     */
    text: string;
    /**
     * Additional provider-specific options. They are passed through
     * to the provider from the AI SDK and enable provider-specific
     * functionality that can be fully encapsulated in the provider.
     */
    providerOptions?: SharedV2ProviderOptions;
}
/**
File content part of a prompt. It contains a file.
 */
interface LanguageModelV2FilePart {
    type: 'file';
    /**
     * Optional filename of the file.
     */
    filename?: string;
    /**
  File data. Can be a Uint8Array, base64 encoded data as a string or a URL.
  */
    data: LanguageModelV2DataContent;
    /**
  IANA media type of the file.
  
  Can support wildcards, e.g. `image/*` (in which case the provider needs to take appropriate action).
  
  @see https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    mediaType: string;
    /**
     * Additional provider-specific options. They are passed through
     * to the provider from the AI SDK and enable provider-specific
     * functionality that can be fully encapsulated in the provider.
     */
    providerOptions?: SharedV2ProviderOptions;
}
/**
Tool call content part of a prompt. It contains a tool call (usually generated by the AI model).
 */
interface LanguageModelV2ToolCallPart {
    type: 'tool-call';
    /**
  ID of the tool call. This ID is used to match the tool call with the tool result.
   */
    toolCallId: string;
    /**
  Name of the tool that is being called.
   */
    toolName: string;
    /**
  Arguments of the tool call. This is a JSON-serializable object that matches the tool's input schema.
     */
    input: unknown;
    /**
     * Whether the tool call will be executed by the provider.
     * If this flag is not set or is false, the tool call will be executed by the client.
     */
    providerExecuted?: boolean;
    /**
     * Additional provider-specific options. They are passed through
     * to the provider from the AI SDK and enable provider-specific
     * functionality that can be fully encapsulated in the provider.
     */
    providerOptions?: SharedV2ProviderOptions;
}
/**
Tool result content part of a prompt. It contains the result of the tool call with the matching ID.
 */
interface LanguageModelV2ToolResultPart {
    type: 'tool-result';
    /**
  ID of the tool call that this result is associated with.
   */
    toolCallId: string;
    /**
  Name of the tool that generated this result.
    */
    toolName: string;
    /**
  Result of the tool call.
     */
    output: LanguageModelV2ToolResultOutput;
    /**
     * Additional provider-specific options. They are passed through
     * to the provider from the AI SDK and enable provider-specific
     * functionality that can be fully encapsulated in the provider.
     */
    providerOptions?: SharedV2ProviderOptions;
}
type LanguageModelV2ToolResultOutput = {
    type: 'text';
    value: string;
} | {
    type: 'json';
    value: JSONValue;
} | {
    type: 'error-text';
    value: string;
} | {
    type: 'error-json';
    value: JSONValue;
} | {
    type: 'content';
    value: Array<{
        type: 'text';
        /**
Text content.
*/
        text: string;
    } | {
        type: 'media';
        /**
Base-64 encoded media data.
*/
        data: string;
        /**
IANA media type.
@see https://www.iana.org/assignments/media-types/media-types.xhtml
*/
        mediaType: string;
    }>;
};

/**
The configuration of a tool that is defined by the provider.
 */
type LanguageModelV2ProviderDefinedTool = {
    /**
  The type of the tool (always 'provider-defined').
     */
    type: 'provider-defined';
    /**
  The ID of the tool. Should follow the format `<provider-name>.<unique-tool-name>`.
     */
    id: `${string}.${string}`;
    /**
  The name of the tool that the user must use in the tool set.
     */
    name: string;
    /**
  The arguments for configuring the tool. Must match the expected arguments defined by the provider for this tool.
    */
    args: Record<string, unknown>;
};

type LanguageModelV2ToolChoice = {
    type: 'auto';
} | {
    type: 'none';
} | {
    type: 'required';
} | {
    type: 'tool';
    toolName: string;
};

type LanguageModelV2CallOptions = {
    /**
  A language mode prompt is a standardized prompt type.
  
  Note: This is **not** the user-facing prompt. The AI SDK methods will map the
  user-facing prompt types such as chat or instruction prompts to this format.
  That approach allows us to evolve the user  facing prompts without breaking
  the language model interface.
     */
    prompt: LanguageModelV2Prompt;
    /**
  Maximum number of tokens to generate.
     */
    maxOutputTokens?: number;
    /**
  Temperature setting. The range depends on the provider and model.
   */
    temperature?: number;
    /**
  Stop sequences.
  If set, the model will stop generating text when one of the stop sequences is generated.
  Providers may have limits on the number of stop sequences.
   */
    stopSequences?: string[];
    /**
  Nucleus sampling.
   */
    topP?: number;
    /**
  Only sample from the top K options for each subsequent token.
  
  Used to remove "long tail" low probability responses.
  Recommended for advanced use cases only. You usually only need to use temperature.
   */
    topK?: number;
    /**
  Presence penalty setting. It affects the likelihood of the model to
  repeat information that is already in the prompt.
   */
    presencePenalty?: number;
    /**
  Frequency penalty setting. It affects the likelihood of the model
  to repeatedly use the same words or phrases.
   */
    frequencyPenalty?: number;
    /**
  Response format. The output can either be text or JSON. Default is text.
  
  If JSON is selected, a schema can optionally be provided to guide the LLM.
   */
    responseFormat?: {
        type: 'text';
    } | {
        type: 'json';
        /**
         * JSON schema that the generated output should conform to.
         */
        schema?: JSONSchema7;
        /**
         * Name of output that should be generated. Used by some providers for additional LLM guidance.
         */
        name?: string;
        /**
         * Description of the output that should be generated. Used by some providers for additional LLM guidance.
         */
        description?: string;
    };
    /**
  The seed (integer) to use for random sampling. If set and supported
  by the model, calls will generate deterministic results.
   */
    seed?: number;
    /**
  The tools that are available for the model.
    */
    tools?: Array<LanguageModelV2FunctionTool | LanguageModelV2ProviderDefinedTool>;
    /**
  Specifies how the tool should be selected. Defaults to 'auto'.
  */
    toolChoice?: LanguageModelV2ToolChoice;
    /**
  Include raw chunks in the stream. Only applicable for streaming calls.
   */
    includeRawChunks?: boolean;
    /**
  Abort signal for cancelling the operation.
   */
    abortSignal?: AbortSignal;
    /**
  Additional HTTP headers to be sent with the request.
  Only applicable for HTTP-based providers.
   */
    headers?: Record<string, string | undefined>;
    /**
     * Additional provider-specific options. They are passed through
     * to the provider from the AI SDK and enable provider-specific
     * functionality that can be fully encapsulated in the provider.
     */
    providerOptions?: SharedV2ProviderOptions;
};

/**
Warning from the model provider for this call. The call will proceed, but e.g.
some settings might not be supported, which can lead to suboptimal results.
 */
type LanguageModelV2CallWarning = {
    type: 'unsupported-setting';
    setting: Omit<keyof LanguageModelV2CallOptions, 'prompt'>;
    details?: string;
} | {
    type: 'unsupported-tool';
    tool: LanguageModelV2FunctionTool | LanguageModelV2ProviderDefinedTool;
    details?: string;
} | {
    type: 'other';
    message: string;
};

/**
A file that has been generated by the model.
Generated files as base64 encoded strings or binary data.
The files should be returned without any unnecessary conversion.
 */
type LanguageModelV2File = {
    type: 'file';
    /**
  The IANA media type of the file, e.g. `image/png` or `audio/mp3`.
  
  @see https://www.iana.org/assignments/media-types/media-types.xhtml
         */
    mediaType: string;
    /**
  Generated file data as base64 encoded strings or binary data.
  
  The file data should be returned without any unnecessary conversion.
  If the API returns base64 encoded strings, the file data should be returned
  as base64 encoded strings. If the API returns binary data, the file data should
  be returned as binary data.
   */
    data: string | Uint8Array;
};

/**
Reasoning that the model has generated.
 */
type LanguageModelV2Reasoning = {
    type: 'reasoning';
    text: string;
    /**
     * Optional provider-specific metadata for the reasoning part.
     */
    providerMetadata?: SharedV2ProviderMetadata;
};

/**
A source that has been used as input to generate the response.
 */
type LanguageModelV2Source = {
    type: 'source';
    /**
     * The type of source - URL sources reference web content.
     */
    sourceType: 'url';
    /**
     * The ID of the source.
     */
    id: string;
    /**
     * The URL of the source.
     */
    url: string;
    /**
     * The title of the source.
     */
    title?: string;
    /**
     * Additional provider metadata for the source.
     */
    providerMetadata?: SharedV2ProviderMetadata;
} | {
    type: 'source';
    /**
     * The type of source - document sources reference files/documents.
     */
    sourceType: 'document';
    /**
     * The ID of the source.
     */
    id: string;
    /**
     * IANA media type of the document (e.g., 'application/pdf').
     */
    mediaType: string;
    /**
     * The title of the document.
     */
    title: string;
    /**
     * Optional filename of the document.
     */
    filename?: string;
    /**
     * Additional provider metadata for the source.
     */
    providerMetadata?: SharedV2ProviderMetadata;
};

/**
Text that the model has generated.
 */
type LanguageModelV2Text = {
    type: 'text';
    /**
  The text content.
     */
    text: string;
    providerMetadata?: SharedV2ProviderMetadata;
};

/**
Tool calls that the model has generated.
     */
type LanguageModelV2ToolCall = {
    type: 'tool-call';
    toolCallId: string;
    toolName: string;
    /**
  Stringified JSON object with the tool call arguments. Must match the
  parameters schema of the tool.
     */
    input: string;
    /**
     * Whether the tool call will be executed by the provider.
     * If this flag is not set or is false, the tool call will be executed by the client.
     */
    providerExecuted?: boolean;
    /**
     * Additional provider-specific metadata for the tool call.
     */
    providerMetadata?: SharedV2ProviderMetadata;
};

/**
Result of a tool call that has been executed by the provider.
 */
type LanguageModelV2ToolResult = {
    type: 'tool-result';
    /**
     * The ID of the tool call that this result is associated with.
     */
    toolCallId: string;
    /**
     * Name of the tool that generated this result.
     */
    toolName: string;
    /**
     * Result of the tool call. This is a JSON-serializable object.
     */
    result: unknown;
    /**
     * Optional flag if the result is an error or an error message.
     */
    isError?: boolean;
    /**
     * Whether the tool result was generated by the provider.
     * If this flag is set to true, the tool result was generated by the provider.
     * If this flag is not set or is false, the tool result was generated by the client.
     */
    providerExecuted?: boolean;
    /**
     * Additional provider-specific metadata for the tool result.
     */
    providerMetadata?: SharedV2ProviderMetadata;
};

type LanguageModelV2Content = LanguageModelV2Text | LanguageModelV2Reasoning | LanguageModelV2File | LanguageModelV2Source | LanguageModelV2ToolCall | LanguageModelV2ToolResult;

/**
Reason why a language model finished generating a response.

Can be one of the following:
- `stop`: model generated stop sequence
- `length`: model generated maximum number of tokens
- `content-filter`: content filter violation stopped the model
- `tool-calls`: model triggered tool calls
- `error`: model stopped because of an error
- `other`: model stopped for other reasons
- `unknown`: the model has not transmitted a finish reason
 */
type LanguageModelV2FinishReason = 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other' | 'unknown';

interface LanguageModelV2ResponseMetadata {
    /**
  ID for the generated response, if the provider sends one.
       */
    id?: string;
    /**
  Timestamp for the start of the generated response, if the provider sends one.
  */
    timestamp?: Date;
    /**
  The ID of the response model that was used to generate the response, if the provider sends one.
  */
    modelId?: string;
}

/**
Usage information for a language model call.

If your API return additional usage information, you can add it to the
provider metadata under your provider's key.
 */
type LanguageModelV2Usage = {
    /**
  The number of input (prompt) tokens used.
     */
    inputTokens: number | undefined;
    /**
  The number of output (completion) tokens used.
     */
    outputTokens: number | undefined;
    /**
  The total number of tokens as reported by the provider.
  This number might be different from the sum of `inputTokens` and `outputTokens`
  and e.g. include reasoning tokens or other overhead.
     */
    totalTokens: number | undefined;
    /**
  The number of reasoning tokens used.
     */
    reasoningTokens?: number | undefined;
    /**
  The number of cached input tokens.
     */
    cachedInputTokens?: number | undefined;
};

type LanguageModelV2StreamPart = {
    type: 'text-start';
    providerMetadata?: SharedV2ProviderMetadata;
    id: string;
} | {
    type: 'text-delta';
    id: string;
    providerMetadata?: SharedV2ProviderMetadata;
    delta: string;
} | {
    type: 'text-end';
    providerMetadata?: SharedV2ProviderMetadata;
    id: string;
} | {
    type: 'reasoning-start';
    providerMetadata?: SharedV2ProviderMetadata;
    id: string;
} | {
    type: 'reasoning-delta';
    id: string;
    providerMetadata?: SharedV2ProviderMetadata;
    delta: string;
} | {
    type: 'reasoning-end';
    id: string;
    providerMetadata?: SharedV2ProviderMetadata;
} | {
    type: 'tool-input-start';
    id: string;
    toolName: string;
    providerMetadata?: SharedV2ProviderMetadata;
    providerExecuted?: boolean;
} | {
    type: 'tool-input-delta';
    id: string;
    delta: string;
    providerMetadata?: SharedV2ProviderMetadata;
} | {
    type: 'tool-input-end';
    id: string;
    providerMetadata?: SharedV2ProviderMetadata;
} | LanguageModelV2ToolCall | LanguageModelV2ToolResult | LanguageModelV2File | LanguageModelV2Source | {
    type: 'stream-start';
    warnings: Array<LanguageModelV2CallWarning>;
} | ({
    type: 'response-metadata';
} & LanguageModelV2ResponseMetadata) | {
    type: 'finish';
    usage: LanguageModelV2Usage;
    finishReason: LanguageModelV2FinishReason;
    providerMetadata?: SharedV2ProviderMetadata;
} | {
    type: 'raw';
    rawValue: unknown;
} | {
    type: 'error';
    error: unknown;
};

/**
Specification for a language model that implements the language model interface version 2.
 */
type LanguageModelV2 = {
    /**
  The language model must specify which language model interface version it implements.
     */
    readonly specificationVersion: 'v2';
    /**
  Name of the provider for logging purposes.
     */
    readonly provider: string;
    /**
  Provider-specific model ID for logging purposes.
     */
    readonly modelId: string;
    /**
  Supported URL patterns by media type for the provider.
  
  The keys are media type patterns or full media types (e.g. `*\/*` for everything, `audio/*`, `video/*`, or `application/pdf`).
  and the values are arrays of regular expressions that match the URL paths.
  
  The matching should be against lower-case URLs.
  
  Matched URLs are supported natively by the model and are not downloaded.
  
  @returns A map of supported URL patterns by media type (as a promise or a plain object).
     */
    supportedUrls: PromiseLike<Record<string, RegExp[]>> | Record<string, RegExp[]>;
    /**
  Generates a language model output (non-streaming).
  
  Naming: "do" prefix to prevent accidental direct usage of the method
  by the user.
     */
    doGenerate(options: LanguageModelV2CallOptions): PromiseLike<{
        /**
    Ordered content that the model has generated.
         */
        content: Array<LanguageModelV2Content>;
        /**
    Finish reason.
         */
        finishReason: LanguageModelV2FinishReason;
        /**
      Usage information.
         */
        usage: LanguageModelV2Usage;
        /**
    Additional provider-specific metadata. They are passed through
    from the provider to the AI SDK and enable provider-specific
    results that can be fully encapsulated in the provider.
         */
        providerMetadata?: SharedV2ProviderMetadata;
        /**
    Optional request information for telemetry and debugging purposes.
         */
        request?: {
            /**
      Request HTTP body that was sent to the provider API.
             */
            body?: unknown;
        };
        /**
    Optional response information for telemetry and debugging purposes.
         */
        response?: LanguageModelV2ResponseMetadata & {
            /**
      Response headers.
            */
            headers?: SharedV2Headers;
            /**
      Response HTTP body.
      */
            body?: unknown;
        };
        /**
    Warnings for the call, e.g. unsupported settings.
         */
        warnings: Array<LanguageModelV2CallWarning>;
    }>;
    /**
  Generates a language model output (streaming).
  
  Naming: "do" prefix to prevent accidental direct usage of the method
  by the user.
     *
  @return A stream of higher-level language model output parts.
     */
    doStream(options: LanguageModelV2CallOptions): PromiseLike<{
        stream: ReadableStream<LanguageModelV2StreamPart>;
        /**
    Optional request information for telemetry and debugging purposes.
         */
        request?: {
            /**
      Request HTTP body that was sent to the provider API.
         */
            body?: unknown;
        };
        /**
    Optional response data.
         */
        response?: {
            /**
      Response headers.
             */
            headers?: SharedV2Headers;
        };
    }>;
};

type SpeechModelV2ProviderOptions = Record<string, Record<string, JSONValue>>;
type SpeechModelV2CallOptions = {
    /**
     * Text to convert to speech.
     */
    text: string;
    /**
     * The voice to use for speech synthesis.
     * This is provider-specific and may be a voice ID, name, or other identifier.
     */
    voice?: string;
    /**
     * The desired output format for the audio e.g. "mp3", "wav", etc.
     */
    outputFormat?: string;
    /**
     * Instructions for the speech generation e.g. "Speak in a slow and steady tone".
     */
    instructions?: string;
    /**
     * The speed of the speech generation.
     */
    speed?: number;
    /**
     * The language for speech generation. This should be an ISO 639-1 language code (e.g. "en", "es", "fr")
     * or "auto" for automatic language detection. Provider support varies.
     */
    language?: string;
    /**
     * Additional provider-specific options that are passed through to the provider
     * as body parameters.
     *
     * The outer record is keyed by the provider name, and the inner
     * record is keyed by the provider-specific metadata key.
     * ```ts
     * {
     *   "openai": {}
     * }
     * ```
     */
    providerOptions?: SpeechModelV2ProviderOptions;
    /**
     * Abort signal for cancelling the operation.
     */
    abortSignal?: AbortSignal;
    /**
     * Additional HTTP headers to be sent with the request.
     * Only applicable for HTTP-based providers.
     */
    headers?: Record<string, string | undefined>;
};

/**
 * Warning from the model provider for this call. The call will proceed, but e.g.
 * some settings might not be supported, which can lead to suboptimal results.
 */
type SpeechModelV2CallWarning = {
    type: 'unsupported-setting';
    setting: keyof SpeechModelV2CallOptions;
    details?: string;
} | {
    type: 'other';
    message: string;
};

/**
 * Speech model specification version 2.
 */
type SpeechModelV2 = {
    /**
     * The speech model must specify which speech model interface
     * version it implements. This will allow us to evolve the speech
     * model interface and retain backwards compatibility. The different
     * implementation versions can be handled as a discriminated union
     * on our side.
     */
    readonly specificationVersion: 'v2';
    /**
     * Name of the provider for logging purposes.
     */
    readonly provider: string;
    /**
     * Provider-specific model ID for logging purposes.
     */
    readonly modelId: string;
    /**
     * Generates speech audio from text.
     */
    doGenerate(options: SpeechModelV2CallOptions): PromiseLike<{
        /**
         * Generated audio as an ArrayBuffer.
         * The audio should be returned without any unnecessary conversion.
         * If the API returns base64 encoded strings, the audio should be returned
         * as base64 encoded strings. If the API returns binary data, the audio
         * should be returned as binary data.
         */
        audio: string | Uint8Array;
        /**
         * Warnings for the call, e.g. unsupported settings.
         */
        warnings: Array<SpeechModelV2CallWarning>;
        /**
         * Optional request information for telemetry and debugging purposes.
         */
        request?: {
            /**
             * Response body (available only for providers that use HTTP requests).
             */
            body?: unknown;
        };
        /**
         * Response information for telemetry and debugging purposes.
         */
        response: {
            /**
             * Timestamp for the start of the generated response.
             */
            timestamp: Date;
            /**
             * The ID of the response model that was used to generate the response.
             */
            modelId: string;
            /**
             * Response headers.
             */
            headers?: SharedV2Headers;
            /**
             * Response body.
             */
            body?: unknown;
        };
        /**
         * Additional provider-specific metadata. They are passed through
         * from the provider to the AI SDK and enable provider-specific
         * results that can be fully encapsulated in the provider.
         */
        providerMetadata?: Record<string, Record<string, JSONValue>>;
    }>;
};

type TranscriptionModelV2ProviderOptions = Record<string, Record<string, JSONValue>>;
type TranscriptionModelV2CallOptions = {
    /**
  Audio data to transcribe.
  Accepts a `Uint8Array` or `string`, where `string` is a base64 encoded audio file.
       */
    audio: Uint8Array | string;
    /**
  The IANA media type of the audio data.
  
  @see https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    mediaType: string;
    /**
  Additional provider-specific options that are passed through to the provider
  as body parameters.
  
  The outer record is keyed by the provider name, and the inner
  record is keyed by the provider-specific metadata key.
  ```ts
  {
  "openai": {
  "timestampGranularities": ["word"]
  }
  }
  ```
   */
    providerOptions?: TranscriptionModelV2ProviderOptions;
    /**
  Abort signal for cancelling the operation.
   */
    abortSignal?: AbortSignal;
    /**
  Additional HTTP headers to be sent with the request.
  Only applicable for HTTP-based providers.
   */
    headers?: Record<string, string | undefined>;
};

/**
Warning from the model provider for this call. The call will proceed, but e.g.
some settings might not be supported, which can lead to suboptimal results.
 */
type TranscriptionModelV2CallWarning = {
    type: 'unsupported-setting';
    setting: keyof TranscriptionModelV2CallOptions;
    details?: string;
} | {
    type: 'other';
    message: string;
};

/**
Transcription model specification version 2.
 */
type TranscriptionModelV2 = {
    /**
  The transcription model must specify which transcription model interface
  version it implements. This will allow us to evolve the transcription
  model interface and retain backwards compatibility. The different
  implementation versions can be handled as a discriminated union
  on our side.
     */
    readonly specificationVersion: 'v2';
    /**
  Name of the provider for logging purposes.
     */
    readonly provider: string;
    /**
  Provider-specific model ID for logging purposes.
     */
    readonly modelId: string;
    /**
  Generates a transcript.
     */
    doGenerate(options: TranscriptionModelV2CallOptions): PromiseLike<{
        /**
         * The complete transcribed text from the audio.
         */
        text: string;
        /**
         * Array of transcript segments with timing information.
         * Each segment represents a portion of the transcribed text with start and end times.
         */
        segments: Array<{
            /**
             * The text content of this segment.
             */
            text: string;
            /**
             * The start time of this segment in seconds.
             */
            startSecond: number;
            /**
             * The end time of this segment in seconds.
             */
            endSecond: number;
        }>;
        /**
         * The detected language of the audio content, as an ISO-639-1 code (e.g., 'en' for English).
         * May be undefined if the language couldn't be detected.
         */
        language: string | undefined;
        /**
         * The total duration of the audio file in seconds.
         * May be undefined if the duration couldn't be determined.
         */
        durationInSeconds: number | undefined;
        /**
    Warnings for the call, e.g. unsupported settings.
         */
        warnings: Array<TranscriptionModelV2CallWarning>;
        /**
    Optional request information for telemetry and debugging purposes.
         */
        request?: {
            /**
      Raw request HTTP body that was sent to the provider API as a string (JSON should be stringified).
      Non-HTTP(s) providers should not set this.
             */
            body?: string;
        };
        /**
    Response information for telemetry and debugging purposes.
         */
        response: {
            /**
      Timestamp for the start of the generated response.
            */
            timestamp: Date;
            /**
      The ID of the response model that was used to generate the response.
            */
            modelId: string;
            /**
      Response headers.
            */
            headers?: SharedV2Headers;
            /**
      Response body.
            */
            body?: unknown;
        };
        /**
    Additional provider-specific metadata. They are passed through
    from the provider to the AI SDK and enable provider-specific
    results that can be fully encapsulated in the provider.
         */
        providerMetadata?: Record<string, Record<string, JSONValue>>;
    }>;
};

/**
 * Provider for language, text embedding, and image generation models.
 */
interface ProviderV2 {
    /**
  Returns the language model with the given id.
  The model id is then passed to the provider function to get the model.
  
  @param {string} modelId - The id of the model to return.
  
  @returns {LanguageModel} The language model associated with the id
  
  @throws {NoSuchModelError} If no such model exists.
     */
    languageModel(modelId: string): LanguageModelV2;
    /**
  Returns the text embedding model with the given id.
  The model id is then passed to the provider function to get the model.
  
  @param {string} modelId - The id of the model to return.
  
  @returns {LanguageModel} The language model associated with the id
  
  @throws {NoSuchModelError} If no such model exists.
     */
    textEmbeddingModel(modelId: string): EmbeddingModelV2<string>;
    /**
  Returns the image model with the given id.
  The model id is then passed to the provider function to get the model.
  
  @param {string} modelId - The id of the model to return.
  
  @returns {ImageModel} The image model associated with the id
  */
    imageModel(modelId: string): ImageModelV2;
    /**
  Returns the transcription model with the given id.
  The model id is then passed to the provider function to get the model.
  
  @param {string} modelId - The id of the model to return.
  
  @returns {TranscriptionModel} The transcription model associated with the id
    */
    transcriptionModel?(modelId: string): TranscriptionModelV2;
    /**
  Returns the speech model with the given id.
  The model id is then passed to the provider function to get the model.
  
  @param {string} modelId - The id of the model to return.
  
  @returns {SpeechModel} The speech model associated with the id
    */
    speechModel?(modelId: string): SpeechModelV2;
}

type Warning = LanguageModelV2CallWarning | ImageModelV2CallWarning | SpeechModelV2CallWarning | TranscriptionModelV2CallWarning;
type LogWarningsFunction = (warnings: Warning[]) => void;

declare global {
    /**
     * The default provider to use for the AI SDK.
     * String model ids are resolved to the default provider and model id.
     *
     * If not set, the default provider is the Vercel AI gateway provider.
     *
     * @see https://ai-sdk.dev/docs/ai-sdk-core/provider-management#global-provider-configuration
     */
    var AI_SDK_DEFAULT_PROVIDER: ProviderV2 | undefined;
    /**
     * The warning logger to use for the AI SDK.
     *
     * If not set, the default logger is the console.warn function.
     *
     * If set to false, no warnings are logged.
     */
    var AI_SDK_LOG_WARNINGS: LogWarningsFunction | undefined | false;
}

type ContentType = 'askAI' | 'content' | 'lvl0' | 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4' | 'lvl5' | 'lvl6';
interface DocSearchHitAttributeHighlightResult {
    value: string;
    matchLevel: 'full' | 'none' | 'partial';
    matchedWords: string[];
    fullyHighlighted?: boolean;
}
interface DocSearchHitHighlightResultHierarchy {
    lvl0: DocSearchHitAttributeHighlightResult;
    lvl1: DocSearchHitAttributeHighlightResult;
    lvl2: DocSearchHitAttributeHighlightResult;
    lvl3: DocSearchHitAttributeHighlightResult;
    lvl4: DocSearchHitAttributeHighlightResult;
    lvl5: DocSearchHitAttributeHighlightResult;
    lvl6: DocSearchHitAttributeHighlightResult;
}
interface DocSearchHitHighlightResult {
    content: DocSearchHitAttributeHighlightResult;
    hierarchy: DocSearchHitHighlightResultHierarchy;
    hierarchy_camel: DocSearchHitHighlightResultHierarchy[];
}
interface DocSearchHitAttributeSnippetResult {
    value: string;
    matchLevel: 'full' | 'none' | 'partial';
}
interface DocSearchHitSnippetResult {
    content: DocSearchHitAttributeSnippetResult;
    hierarchy: DocSearchHitHighlightResultHierarchy;
    hierarchy_camel: DocSearchHitHighlightResultHierarchy[];
}
declare type DocSearchHit = {
    objectID: string;
    content: string | null;
    query?: string;
    url: string;
    url_without_anchor: string;
    type: ContentType;
    anchor: string | null;
    hierarchy: {
        lvl0: string;
        lvl1: string;
        lvl2: string | null;
        lvl3: string | null;
        lvl4: string | null;
        lvl5: string | null;
        lvl6: string | null;
    };
    _highlightResult: DocSearchHitHighlightResult;
    _snippetResult: DocSearchHitSnippetResult;
    _rankingInfo?: {
        promoted: boolean;
        nbTypos: number;
        firstMatchedWord: number;
        proximityDistance?: number;
        geoDistance: number;
        geoPrecision?: number;
        nbExactWords: number;
        words: number;
        filters: number;
        userScore: number;
        matchedGeoLocation?: {
            lat: number;
            lng: number;
            distance: number;
        };
    };
    _distinctSeqID?: number;
    __autocomplete_indexName?: string;
    __autocomplete_queryID?: string;
    __autocomplete_algoliaCredentials?: {
        appId: string;
        apiKey: string;
    };
    __autocomplete_id?: number;
};

type DocSearchTheme = 'dark' | 'light';

type InternalDocSearchHit = DocSearchHit & {
    __docsearch_parent: InternalDocSearchHit | null;
};

interface KeyboardShortcuts {
    /**
     * Enable/disable the Ctrl/Cmd+K shortcut to toggle the search modal.
     *
     * @default true
     */
    'Ctrl/Cmd+K'?: boolean;
    /**
     * Enable/disable the / shortcut to open the search modal.
     *
     * @default true
     */
    '/'?: boolean;
}

type StoredDocSearchHit = Omit<DocSearchHit, '_highlightResult' | '_snippetResult'>;

type DocSearchTranslations = Partial<{
    button: ButtonTranslations;
    modal: ModalTranslations;
}>;
type DocSearchTransformClient = {
    search: LiteClient['search'];
    addAlgoliaAgent: LiteClient['addAlgoliaAgent'];
    transporter: Pick<LiteClient['transporter'], 'algoliaAgent'>;
};
type DocSearchAskAi = {
    /**
     * The index name to use for the ask AI feature. Your assistant will search this index for relevant documents.
     * If not provided, the index name will be used.
     */
    indexName?: string;
    /**
     * The API key to use for the ask AI feature. Your assistant will use this API key to search the index.
     * If not provided, the API key will be used.
     */
    apiKey?: string;
    /**
     * The app ID to use for the ask AI feature. Your assistant will use this app ID to search the index.
     * If not provided, the app ID will be used.
     */
    appId?: string;
    /**
     * The assistant ID to use for the ask AI feature.
     */
    assistantId: string | null;
    /**
     * The search parameters to use for the ask AI feature.
     */
    searchParameters?: {
        facetFilters?: SearchParamsObject['facetFilters'];
    };
};
interface DocSearchIndex {
    name: string;
    searchParameters?: SearchParamsObject;
}
interface DocSearchProps$1 {
    /**
     * Algolia application id used by the search client.
     */
    appId: string;
    /**
     * Public api key with search permissions for the index.
     */
    apiKey: string;
    /**
     * Name of the algolia index to query.
     *
     * @deprecated `indexName` will be removed in a future version. Please use `indices` property going forward.
     */
    indexName?: string;
    /**
     * List of indices and _optional_ searchParameters to be used for search.
     *
     * @see {@link https://docsearch.algolia.com/docs/api#indices}
     */
    indices?: Array<DocSearchIndex | string>;
    /**
     * Configuration or assistant id to enable ask ai mode. Pass a string assistant id or a full config object.
     */
    askAi?: DocSearchAskAi | string;
    /**
     * Theme overrides applied to the modal and related components.
     */
    theme?: DocSearchTheme;
    /**
     * Placeholder text for the search input.
     */
    placeholder?: string;
    /**
     * Additional algolia search parameters to merge into each query.
     *
     * @deprecated `searchParameters` will be removed in a future version. Please use `indices` property going forward.
     */
    searchParameters?: SearchParamsObject;
    /**
     * Maximum number of hits to display per source/group.
     */
    maxResultsPerGroup?: number;
    /**
     * Hook to post-process hits before rendering.
     */
    transformItems?: (items: DocSearchHit[]) => DocSearchHit[];
    /**
     * Custom component to render an individual hit.
     */
    hitComponent?: (props: {
        hit: InternalDocSearchHit | StoredDocSearchHit;
        children: React.ReactNode;
    }) => JSX.Element;
    /**
     * Custom component rendered at the bottom of the results panel.
     */
    resultsFooterComponent?: (props: {
        state: AutocompleteState$1<InternalDocSearchHit>;
    }) => JSX.Element | null;
    /**
     * Hook to wrap or modify the algolia search client.
     */
    transformSearchClient?: (searchClient: DocSearchTransformClient) => DocSearchTransformClient;
    /**
     * Disable storage and usage of recent and favorite searches.
     */
    disableUserPersonalization?: boolean;
    /**
     * Query string to prefill when opening the modal.
     */
    initialQuery?: string;
    /**
     * Custom navigator for controlling link navigation.
     */
    navigator?: AutocompleteOptions<InternalDocSearchHit>['navigator'];
    /**
     * Localized strings for the button and modal ui.
     */
    translations?: DocSearchTranslations;
    /**
     * Builds a url to report missing results for a given query.
     */
    getMissingResultsUrl?: ({ query }: {
        query: string;
    }) => string;
    /**
     * Insights client integration options to send analytics events.
     */
    insights?: AutocompleteOptions<InternalDocSearchHit>['insights'];
    /**
     * The container element where the modal should be portaled to. Defaults to document.body.
     */
    portalContainer?: DocumentFragment | Element;
    /**
     * Limit of how many recent searches should be saved/displayed..
     *
     * @default 7
     */
    recentSearchesLimit?: number;
    /**
     * Limit of how many recent searches should be saved/displayed when there are favorited searches..
     *
     * @default 4
     */
    recentSearchesWithFavoritesLimit?: number;
    /**
     * Configuration for keyboard shortcuts. Allows enabling/disabling specific shortcuts.
     */
    keyboardShortcuts?: KeyboardShortcuts;
}

type ButtonTranslations = Partial<{
    buttonText: string;
    buttonAriaLabel: string;
}>;

type FooterTranslations = Partial<{
    selectText: string;
    submitQuestionText: string;
    selectKeyAriaLabel: string;
    navigateText: string;
    navigateUpKeyAriaLabel: string;
    navigateDownKeyAriaLabel: string;
    closeText: string;
    backToSearchText: string;
    closeKeyAriaLabel: string;
    poweredByText: string;
}>;

type AskAiScreenTranslations = Partial<{
    disclaimerText: string;
    relatedSourcesText: string;
    thinkingText: string;
    copyButtonText: string;
    copyButtonCopiedText: string;
    copyButtonTitle: string;
    likeButtonTitle: string;
    dislikeButtonTitle: string;
    thanksForFeedbackText: string;
    preToolCallText: string;
    duringToolCallText: string;
    afterToolCallText: string;
    /**
     * Build the full jsx element for the aggregated search block.
     * If provided, completely overrides the default english renderer.
     */
    aggregatedToolCallNode?: (queries: string[], onSearchQueryClick: (query: string) => void) => React.ReactNode;
    /**
     * Generate the list connective parts only (backwards compatibility).
     * Receives full list of queries and should return translation parts for before/after/separators.
     * Example: (qs) => ({ before: 'searched for ', separator: ', ', lastSeparator: ' and ', after: '' }).
     */
    aggregatedToolCallText?: (queries: string[]) => {
        before?: string;
        separator?: string;
        lastSeparator?: string;
        after?: string;
    };
}>;

type ErrorScreenTranslations = Partial<{
    titleText: string;
    helpText: string;
}>;

type NoResultsScreenTranslations = Partial<{
    noResultsText: string;
    suggestedQueryText: string;
    reportMissingResultsText: string;
    reportMissingResultsLinkText: string;
}>;

type ResultsScreenTranslations = Partial<{
    askAiPlaceholder: string;
}>;

type StartScreenTranslations = Partial<{
    recentSearchesTitle: string;
    noRecentSearchesText: string;
    saveRecentSearchButtonTitle: string;
    removeRecentSearchButtonTitle: string;
    favoriteSearchesTitle: string;
    removeFavoriteSearchButtonTitle: string;
    recentConversationsTitle: string;
    removeRecentConversationButtonTitle: string;
}>;

type ScreenStateTranslations = Partial<{
    errorScreen: ErrorScreenTranslations;
    startScreen: StartScreenTranslations;
    noResultsScreen: NoResultsScreenTranslations;
    resultsScreen: ResultsScreenTranslations;
    askAiScreen: AskAiScreenTranslations;
}>;

type SearchBoxTranslations = Partial<{
    clearButtonTitle: string;
    clearButtonAriaLabel: string;
    closeButtonText: string;
    closeButtonAriaLabel: string;
    placeholderText: string;
    placeholderTextAskAi: string;
    placeholderTextAskAiStreaming: string;
    enterKeyHint: string;
    enterKeyHintAskAi: string;
    searchInputLabel: string;
    backToKeywordSearchButtonText: string;
    backToKeywordSearchButtonAriaLabel: string;
}>;

type ModalTranslations = Partial<{
    searchBox: SearchBoxTranslations;
    footer: FooterTranslations;
}> & ScreenStateTranslations;

interface DocSearchProps extends DocSearchProps$1 {
    container: HTMLElement | string;
    environment?: typeof window;
}
declare function docsearch(props: DocSearchProps): () => void;

export { docsearch as default };
