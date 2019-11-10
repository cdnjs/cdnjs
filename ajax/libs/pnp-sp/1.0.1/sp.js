/**
@license
 * @pnp/sp v1.0.1 - pnp - provides a fluent api for working with SharePoint REST
 * MIT (https://github.com/pnp/pnp/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: http://officedev.github.io/PnP-JS-Core
 * source: https://github.com/pnp/pnp
 * bugs: https://github.com/pnp/pnp/issues
 */
import { Dictionary, FetchClient, RuntimeConfig, Util, mergeHeaders, mergeOptions, readBlobAsArrayBuffer } from '@pnp/common';
import { Logger } from '@pnp/logging';
import { BlobParser, BufferParser, JSONParser, ODataBatch, ODataDefaultParser, ODataParserBase, ODataQueryable, TextParser } from '@pnp/odata';

function extractWebUrl(candidateUrl) {
    if (candidateUrl === null) {
        return "";
    }
    const index = candidateUrl.indexOf("_api/");
    if (index > -1) {
        return candidateUrl.substr(0, index);
    }
    // if all else fails just give them what they gave us back
    return candidateUrl;
}

class SPBatchParseException extends Error {
    constructor(msg) {
        super(msg);
        this.name = "BatchParseException";
        Logger.error(this);
    }
}
class SPODataIdException extends Error {
    constructor(data, msg = "Could not extract odata id in object, you may be using nometadata. Object data logged to logger.") {
        super(msg);
        this.data = data;
        this.name = "ODataIdException";
        Logger.error(this);
    }
}
class MaxCommentLengthException extends Error {
    constructor(msg = "The maximum comment length is 1023 characters.") {
        super(msg);
        this.name = "MaxCommentLengthException";
        Logger.error(this);
    }
}
class NotSupportedInBatchException extends Error {
    constructor(operation = "This operation") {
        super(`${operation} is not supported as part of a batch.`);
        this.name = "NotSupportedInBatchException";
        Logger.error(this);
    }
}
class APIUrlException extends Error {
    constructor(msg = "Unable to determine API url.") {
        super(msg);
        this.name = "APIUrlException";
        Logger.error(this);
    }
}

function spExtractODataId(candidate) {
    if (candidate.hasOwnProperty("odata.id")) {
        return candidate["odata.id"];
    }
    else if (candidate.hasOwnProperty("__metadata") && candidate.__metadata.hasOwnProperty("id")) {
        return candidate.__metadata.id;
    }
    else {
        throw new SPODataIdException(candidate);
    }
}
class SPODataEntityParserImpl extends ODataParserBase {
    constructor(factory) {
        super();
        this.factory = factory;
        this.hydrate = (d) => {
            const o = new this.factory(spGetEntityUrl(d), null);
            return Util.extend(o, d);
        };
    }
    parse(r) {
        return super.parse(r).then((d) => {
            const o = new this.factory(spGetEntityUrl(d), null);
            return Util.extend(o, d);
        });
    }
}
class SPODataEntityArrayParserImpl extends ODataParserBase {
    constructor(factory) {
        super();
        this.factory = factory;
        this.hydrate = (d) => {
            return d.map(v => {
                const o = new this.factory(spGetEntityUrl(v), null);
                return Util.extend(o, v);
            });
        };
    }
    parse(r) {
        return super.parse(r).then((d) => {
            return d.map(v => {
                const o = new this.factory(spGetEntityUrl(v), null);
                return Util.extend(o, v);
            });
        });
    }
}
function spGetEntityUrl(entity) {
    if (entity.hasOwnProperty("odata.metadata") && entity.hasOwnProperty("odata.editLink")) {
        // we are dealign with minimal metadata (default)
        return Util.combinePaths(extractWebUrl(entity["odata.metadata"]), "_api", entity["odata.editLink"]);
    }
    else if (entity.hasOwnProperty("__metadata")) {
        // we are dealing with verbose, which has an absolute uri
        return entity.__metadata.uri;
    }
    else {
        // we are likely dealing with nometadata, so don't error but we won't be able to
        // chain off these objects
        Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", 2 /* Warning */);
        return "";
    }
}
function spODataEntity(factory) {
    return new SPODataEntityParserImpl(factory);
}
function spODataEntityArray(factory) {
    return new SPODataEntityArrayParserImpl(factory);
}

function setup(config) {
    RuntimeConfig.extend(config);
}
class SPRuntimeConfigImpl {
    get headers() {
        const spPart = RuntimeConfig.get("sp");
        if (spPart !== null && typeof spPart !== "undefined" && typeof spPart.headers !== "undefined") {
            return spPart.headers;
        }
        return {};
    }
    get baseUrl() {
        const spPart = RuntimeConfig.get("sp");
        if (spPart !== null && typeof spPart.baseUrl !== "undefined") {
            return spPart.baseUrl;
        }
        if (RuntimeConfig.spfxContext !== null) {
            return RuntimeConfig.spfxContext.pageContext.web.absoluteUrl;
        }
        return null;
    }
    get fetchClientFactory() {
        const spPart = RuntimeConfig.get("sp");
        // use a configured factory firt
        if (spPart !== null && typeof spPart.fetchClientFactory !== "undefined") {
            return spPart.fetchClientFactory;
        }
        else {
            return () => new FetchClient();
        }
    }
}
let SPRuntimeConfig = new SPRuntimeConfigImpl();

class CachedDigest {
}
// allows for the caching of digests across all HttpClient's which each have their own DigestCache wrapper.
const digests = new Dictionary();
class DigestCache {
    constructor(_httpClient, _digests = digests) {
        this._httpClient = _httpClient;
        this._digests = _digests;
    }
    getDigest(webUrl) {
        const cachedDigest = this._digests.get(webUrl);
        if (cachedDigest !== null) {
            const now = new Date();
            if (now < cachedDigest.expiration) {
                return Promise.resolve(cachedDigest.value);
            }
        }
        const url = Util.combinePaths(webUrl, "/_api/contextinfo");
        const headers = {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose;charset=utf-8",
        };
        return this._httpClient.fetchRaw(url, {
            cache: "no-cache",
            credentials: "same-origin",
            headers: Util.extend(headers, SPRuntimeConfig.headers, true),
            method: "POST",
        }).then((response) => {
            const parser = new ODataDefaultParser();
            return parser.parse(response).then((d) => d.GetContextWebInformation);
        }).then((data) => {
            const newCachedDigest = new CachedDigest();
            newCachedDigest.value = data.FormDigestValue;
            const seconds = data.FormDigestTimeoutSeconds;
            const expiration = new Date();
            expiration.setTime(expiration.getTime() + 1000 * seconds);
            newCachedDigest.expiration = expiration;
            this._digests.add(webUrl, newCachedDigest);
            return newCachedDigest.value;
        });
    }
    clear() {
        this._digests.clear();
    }
}

class SPHttpClient {
    constructor() {
        this._impl = SPRuntimeConfig.fetchClientFactory();
        this._digestCache = new DigestCache(this);
    }
    fetch(url, options = {}) {
        let opts = Util.extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
        const headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        mergeHeaders(headers, SPRuntimeConfig.headers);
        // second we add the local options so we can overwrite the globals
        mergeHeaders(headers, options.headers);
        // lastly we apply any default headers we need that may not exist
        if (!headers.has("Accept")) {
            headers.append("Accept", "application/json");
        }
        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
        }
        if (!headers.has("X-ClientService-ClientTag")) {
            headers.append("X-ClientService-ClientTag", "PnPCoreJS:@pnp-$$Version$$");
        }
        if (!headers.has("User-Agent")) {
            // this marks the requests for understanding by the service
            headers.append("User-Agent", "NONISV|SharePointPnP|PnPCoreJS/$$Version$$");
        }
        opts = Util.extend(opts, { headers: headers });
        if (opts.method && opts.method.toUpperCase() !== "GET") {
            // if we have either a request digest or an authorization header we don't need a digest
            if (!headers.has("X-RequestDigest") && !headers.has("Authorization")) {
                const index = url.indexOf("_api/");
                if (index < 0) {
                    throw new APIUrlException();
                }
                const webUrl = url.substr(0, index);
                return this._digestCache.getDigest(webUrl)
                    .then((digest) => {
                    headers.append("X-RequestDigest", digest);
                    return this.fetchRaw(url, opts);
                });
            }
        }
        return this.fetchRaw(url, opts);
    }
    fetchRaw(url, options = {}) {
        // here we need to normalize the headers
        const rawHeaders = new Headers();
        mergeHeaders(rawHeaders, options.headers);
        options = Util.extend(options, { headers: rawHeaders });
        const retry = (ctx) => {
            this._impl.fetch(url, options).then((response) => ctx.resolve(response)).catch((response) => {
                // Check if request was throttled - http status code 429
                // Check if request failed due to server unavailable - http status code 503
                if (response.status !== 429 && response.status !== 503) {
                    ctx.reject(response);
                }
                // grab our current delay
                const delay = ctx.delay;
                // Increment our counters.
                ctx.delay *= 2;
                ctx.attempts++;
                // If we have exceeded the retry count, reject.
                if (ctx.retryCount <= ctx.attempts) {
                    ctx.reject(response);
                }
                // Set our retry timeout for {delay} milliseconds.
                setTimeout(Util.getCtxCallback(this, retry, ctx), delay);
            });
        };
        return new Promise((resolve, reject) => {
            const retryContext = {
                attempts: 0,
                delay: 100,
                reject: reject,
                resolve: resolve,
                retryCount: 7,
            };
            retry.call(this, retryContext);
        });
    }
    get(url, options = {}) {
        const opts = Util.extend(options, { method: "GET" });
        return this.fetch(url, opts);
    }
    post(url, options = {}) {
        const opts = Util.extend(options, { method: "POST" });
        return this.fetch(url, opts);
    }
    patch(url, options = {}) {
        const opts = Util.extend(options, { method: "PATCH" });
        return this.fetch(url, opts);
    }
    delete(url, options = {}) {
        const opts = Util.extend(options, { method: "DELETE" });
        return this.fetch(url, opts);
    }
}

/**
 * Ensures that a given url is absolute for the current web based on context
 *
 * @param candidateUrl The url to make absolute
 *
 */
function toAbsoluteUrl(candidateUrl) {
    return new Promise((resolve) => {
        if (Util.isUrlAbsolute(candidateUrl)) {
            // if we are already absolute, then just return the url
            return resolve(candidateUrl);
        }
        if (SPRuntimeConfig.baseUrl !== null) {
            // base url specified either with baseUrl of spfxContext config property
            return resolve(Util.combinePaths(SPRuntimeConfig.baseUrl, candidateUrl));
        }
        if (typeof global._spPageContextInfo !== "undefined") {
            // operating in classic pages
            if (global._spPageContextInfo.hasOwnProperty("webAbsoluteUrl")) {
                return resolve(Util.combinePaths(global._spPageContextInfo.webAbsoluteUrl, candidateUrl));
            }
            else if (global._spPageContextInfo.hasOwnProperty("webServerRelativeUrl")) {
                return resolve(Util.combinePaths(global._spPageContextInfo.webServerRelativeUrl, candidateUrl));
            }
        }
        // does window.location exist and have a certain path part in it?
        if (typeof global.location !== "undefined") {
            const baseUrl = global.location.toString().toLowerCase();
            ["/_layouts/", "/siteassets/"].forEach((s) => {
                const index = baseUrl.indexOf(s);
                if (index > 0) {
                    return resolve(Util.combinePaths(baseUrl.substr(0, index), candidateUrl));
                }
            });
        }
        return resolve(candidateUrl);
    });
}

/**
 * SharePointQueryable Base Class
 *
 */
class SharePointQueryable extends ODataQueryable {
    /**
     * Creates a new instance of the SharePointQueryable class
     *
     * @constructor
     * @param baseUrl A string or SharePointQueryable that should form the base part of the url
     *
     */
    constructor(baseUrl, path) {
        super();
        if (typeof baseUrl === "string") {
            // we need to do some extra parsing to get the parent url correct if we are
            // being created from just a string.
            const urlStr = baseUrl;
            if (Util.isUrlAbsolute(urlStr) || urlStr.lastIndexOf("/") < 0) {
                this._parentUrl = urlStr;
                this._url = Util.combinePaths(urlStr, path);
            }
            else if (urlStr.lastIndexOf("/") > urlStr.lastIndexOf("(")) {
                // .../items(19)/fields
                const index = urlStr.lastIndexOf("/");
                this._parentUrl = urlStr.slice(0, index);
                path = Util.combinePaths(urlStr.slice(index), path);
                this._url = Util.combinePaths(this._parentUrl, path);
            }
            else {
                // .../items(19)
                const index = urlStr.lastIndexOf("(");
                this._parentUrl = urlStr.slice(0, index);
                this._url = Util.combinePaths(urlStr, path);
            }
        }
        else {
            const q = baseUrl;
            this._parentUrl = q._url;
            this._options = q._options;
            const target = q._query.get("@target");
            if (target !== null) {
                this._query.add("@target", target);
            }
            this._url = Util.combinePaths(this._parentUrl, path);
        }
    }
    /**
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new SharePointQueryable
     */
    as(factory) {
        const o = new factory(this._url, null);
        return Util.extend(o, this, true);
    }
    /**
     * Gets the full url with query information
     *
     */
    toUrlAndQuery() {
        const aliasedParams = new Dictionary();
        let url = this.toUrl().replace(/'!(@.*?)::(.*?)'/ig, (match, labelName, value) => {
            Logger.write(`Rewriting aliased parameter from match ${match} to label: ${labelName} value: ${value}`, 0 /* Verbose */);
            aliasedParams.add(labelName, `'${value}'`);
            return labelName;
        });
        // inlude our explicitly set query string params
        aliasedParams.merge(this._query);
        if (aliasedParams.count > 0) {
            url += `?${aliasedParams.getKeys().map(key => `${key}=${aliasedParams.get(key)}`).join("&")}`;
        }
        return url;
    }
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    getParent(factory, baseUrl = this.parentUrl, path, batch) {
        let parent = new factory(baseUrl, path);
        parent.configure(this._options);
        const target = this.query.get("@target");
        if (target !== null) {
            parent.query.add("@target", target);
        }
        if (typeof batch !== "undefined") {
            parent = parent.inBatch(batch);
        }
        return parent;
    }
    /**
     * Clones this SharePointQueryable into a new SharePointQueryable instance of T
     * @param factory Constructor used to create the new instance
     * @param additionalPath Any additional path to include in the clone
     * @param includeBatch If true this instance's batch will be added to the cloned instance
     */
    clone(factory, additionalPath, includeBatch = true) {
        let clone = new factory(this, additionalPath);
        const target = this.query.get("@target");
        if (target !== null) {
            clone.query.add("@target", target);
        }
        if (includeBatch && this.hasBatch) {
            clone = clone.inBatch(this.batch);
        }
        return clone;
    }
    /**
     * Converts the current instance to a request context
     *
     * @param verb The request verb
     * @param options The set of supplied request options
     * @param parser The supplied ODataParser instance
     * @param pipeline Optional request processing pipeline
     */
    toRequestContext(verb, options = {}, parser, pipeline) {
        const dependencyDispose = this.hasBatch ? this.addBatchDependency() : () => { return; };
        return toAbsoluteUrl(this.toUrlAndQuery()).then(url => {
            mergeOptions(options, this._options);
            // build our request context
            const context = {
                batch: this.batch,
                batchDependency: dependencyDispose,
                cachingOptions: this._cachingOptions,
                clientFactory: () => new SPHttpClient(),
                isBatched: this.hasBatch,
                isCached: this._useCaching,
                options: options,
                parser: parser,
                pipeline: pipeline,
                requestAbsoluteUrl: url,
                requestId: Util.getGUID(),
                verb: verb,
            };
            return context;
        });
    }
}
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
class SharePointQueryableCollection extends SharePointQueryable {
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
     *
     * @param filter The string representing the filter query
     */
    filter(filter) {
        this._query.add("$filter", filter);
        return this;
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects) {
        if (selects.length > 0) {
            this._query.add("$select", selects.join(","));
        }
        return this;
    }
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    expand(...expands) {
        if (expands.length > 0) {
            this._query.add("$expand", expands.join(","));
        }
        return this;
    }
    /**
     * Orders based on the supplied fields ascending
     *
     * @param orderby The name of the field to sort on
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    orderBy(orderBy, ascending = true) {
        const keys = this._query.getKeys();
        const query = [];
        const asc = ascending ? " asc" : " desc";
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "$orderby") {
                query.push(this._query.get("$orderby"));
                break;
            }
        }
        query.push(`${orderBy}${asc}`);
        this._query.add("$orderby", query.join(","));
        return this;
    }
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    skip(skip) {
        this._query.add("$skip", skip.toString());
        return this;
    }
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top) {
        this._query.add("$top", top.toString());
        return this;
    }
}
/**
 * Represents an instance that can be selected
 *
 */
class SharePointQueryableInstance extends SharePointQueryable {
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects) {
        if (selects.length > 0) {
            this._query.add("$select", selects.join(","));
        }
        return this;
    }
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    expand(...expands) {
        if (expands.length > 0) {
            this._query.add("$expand", expands.join(","));
        }
        return this;
    }
}

/**
 * Describes a collection of all site collection users
 *
 */
class SiteUsers extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the SiteUsers class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user collection
     */
    constructor(baseUrl, path = "siteusers") {
        super(baseUrl, path);
    }
    /**
     * Gets a user from the collection by email
     *
     * @param email The email address of the user to retrieve
     */
    getByEmail(email) {
        return new SiteUser(this, `getByEmail('${email}')`);
    }
    /**
     * Gets a user from the collection by id
     *
     * @param id The id of the user to retrieve
     */
    getById(id) {
        return new SiteUser(this, `getById(${id})`);
    }
    /**
     * Gets a user from the collection by login name
     *
     * @param loginName The login name of the user to retrieve
     */
    getByLoginName(loginName) {
        const su = new SiteUser(this);
        su.concat("(@v)");
        su.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return su;
    }
    /**
     * Removes a user from the collection by id
     *
     * @param id The id of the user to remove
     */
    removeById(id) {
        return this.clone(SiteUsers, `removeById(${id})`).postCore();
    }
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user to remove
     */
    removeByLoginName(loginName) {
        const o = this.clone(SiteUsers, `removeByLoginName(@v)`);
        o.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return o.postCore();
    }
    /**
     * Adds a user to a group
     *
     * @param loginName The login name of the user to add to the group
     *
     */
    add(loginName) {
        return this.clone(SiteUsers, null).postCore({
            body: JSON.stringify({ "__metadata": { "type": "SP.User" }, LoginName: loginName }),
        }).then(() => this.getByLoginName(loginName));
    }
}
/**
 * Describes a single user
 *
 */
class SiteUser extends SharePointQueryableInstance {
    /**
     * Gets the groups for this user
     *
     */
    get groups() {
        return new SiteGroups(this, "groups");
    }
    /**
    * Updates this user instance with the supplied properties
    *
    * @param properties A plain object of property names and values to update for the user
    */
    update(properties) {
        const postBody = Util.extend({ "__metadata": { "type": "SP.User" } }, properties);
        return this.postCore({
            body: JSON.stringify(postBody),
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                data: data,
                user: this,
            };
        });
    }
    /**
     * Delete this user
     *
     */
    delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
}
/**
 * Represents the current user
 */
class CurrentUser extends SharePointQueryableInstance {
    constructor(baseUrl, path = "currentuser") {
        super(baseUrl, path);
    }
}

/**
 * Principal Type enum
 *
 */
var PrincipalType;
(function (PrincipalType) {
    PrincipalType[PrincipalType["None"] = 0] = "None";
    PrincipalType[PrincipalType["User"] = 1] = "User";
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType || (PrincipalType = {}));
/**
 * Describes a collection of site groups
 *
 */
class SiteGroups extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the SiteGroups class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this group collection
     */
    constructor(baseUrl, path = "sitegroups") {
        super(baseUrl, path);
    }
    /**
     * Adds a new group to the site collection
     *
     * @param props The group properties object of property names and values to be set for the group
     */
    add(properties) {
        const postBody = JSON.stringify(Util.extend({ "__metadata": { "type": "SP.Group" } }, properties));
        return this.postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                group: this.getById(data.Id),
            };
        });
    }
    /**
     * Gets a group from the collection by name
     *
     * @param groupName The name of the group to retrieve
     */
    getByName(groupName) {
        return new SiteGroup(this, `getByName('${groupName}')`);
    }
    /**
     * Gets a group from the collection by id
     *
     * @param id The id of the group to retrieve
     */
    getById(id) {
        const sg = new SiteGroup(this);
        sg.concat(`(${id})`);
        return sg;
    }
    /**
     * Removes the group with the specified member id from the collection
     *
     * @param id The id of the group to remove
     */
    removeById(id) {
        return this.clone(SiteGroups, `removeById('${id}')`).postCore();
    }
    /**
     * Removes the cross-site group with the specified name from the collection
     *
     * @param loginName The name of the group to remove
     */
    removeByLoginName(loginName) {
        return this.clone(SiteGroups, `removeByLoginName('${loginName}')`).postCore();
    }
}
/**
 * Describes a single group
 *
 */
class SiteGroup extends SharePointQueryableInstance {
    /**
     * Gets the users for this group
     *
     */
    get users() {
        return new SiteUsers(this, "users");
    }
    /**
    * Updates this group instance with the supplied properties
    *
    * @param properties A GroupWriteableProperties object of property names and values to update for the group
    */
    /* tslint:disable no-string-literal */
    update(properties) {
        const postBody = Util.extend({ "__metadata": { "type": "SP.Group" } }, properties);
        return this.postCore({
            body: JSON.stringify(postBody),
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            let retGroup = this;
            if (properties.hasOwnProperty("Title")) {
                retGroup = this.getParent(SiteGroup, this.parentUrl, `getByName('${properties["Title"]}')`);
            }
            return {
                data: data,
                group: retGroup,
            };
        });
    }
}

/**
 * Describes a set of role assignments for the current scope
 *
 */
class RoleAssignments extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the RoleAssignments class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this role assignments collection
     */
    constructor(baseUrl, path = "roleassignments") {
        super(baseUrl, path);
    }
    /**
     * Adds a new role assignment with the specified principal and role definitions to the collection
     *
     * @param principalId The id of the user or group to assign permissions to
     * @param roleDefId The id of the role definition that defines the permissions to assign
     *
     */
    add(principalId, roleDefId) {
        return this.clone(RoleAssignments, `addroleassignment(principalid=${principalId}, roledefid=${roleDefId})`).postCore();
    }
    /**
     * Removes the role assignment with the specified principal and role definition from the collection
     *
     * @param principalId The id of the user or group in the role assignment
     * @param roleDefId The id of the role definition in the role assignment
     *
     */
    remove(principalId, roleDefId) {
        return this.clone(RoleAssignments, `removeroleassignment(principalid=${principalId}, roledefid=${roleDefId})`).postCore();
    }
    /**
     * Gets the role assignment associated with the specified principal id from the collection.
     *
     * @param id The id of the role assignment
     */
    getById(id) {
        const ra = new RoleAssignment(this);
        ra.concat(`(${id})`);
        return ra;
    }
}
/**
 * Describes a role assignment
 *
 */
class RoleAssignment extends SharePointQueryableInstance {
    /**
     * Gets the groups that directly belong to the access control list (ACL) for this securable object
     *
     */
    get groups() {
        return new SiteGroups(this, "groups");
    }
    /**
     * Gets the role definition bindings for this role assignment
     *
     */
    get bindings() {
        return new RoleDefinitionBindings(this);
    }
    /**
     * Deletes this role assignment
     *
     */
    delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
}
/**
 * Describes a collection of role definitions
 *
 */
class RoleDefinitions extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the RoleDefinitions class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this role definitions collection
     *
     */
    constructor(baseUrl, path = "roledefinitions") {
        super(baseUrl, path);
    }
    /**
     * Gets the role definition with the specified id from the collection
     *
     * @param id The id of the role definition
     *
     */
    getById(id) {
        return new RoleDefinition(this, `getById(${id})`);
    }
    /**
     * Gets the role definition with the specified name
     *
     * @param name The name of the role definition
     *
     */
    getByName(name) {
        return new RoleDefinition(this, `getbyname('${name}')`);
    }
    /**
     * Gets the role definition with the specified role type
     *
     * @param roleTypeKind The roletypekind of the role definition (None=0, Guest=1, Reader=2, Contributor=3, WebDesigner=4, Administrator=5, Editor=6, System=7)
     *
     */
    getByType(roleTypeKind) {
        return new RoleDefinition(this, `getbytype(${roleTypeKind})`);
    }
    /**
     * Creates a role definition
     *
     * @param name The new role definition's name
     * @param description The new role definition's description
     * @param order The order in which the role definition appears
     * @param basePermissions The permissions mask for this role definition
     *
     */
    add(name, description, order, basePermissions) {
        const postBody = JSON.stringify({
            BasePermissions: Util.extend({ __metadata: { type: "SP.BasePermissions" } }, basePermissions),
            Description: description,
            Name: name,
            Order: order,
            __metadata: { "type": "SP.RoleDefinition" },
        });
        return this.postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                definition: this.getById(data.Id),
            };
        });
    }
}
/**
 * Describes a role definition
 *
 */
class RoleDefinition extends SharePointQueryableInstance {
    /**
     * Updates this role definition with the supplied properties
     *
     * @param properties A plain object hash of values to update for the role definition
     */
    /* tslint:disable no-string-literal */
    update(properties) {
        if (typeof properties.hasOwnProperty("BasePermissions") !== "undefined") {
            properties["BasePermissions"] = Util.extend({ __metadata: { type: "SP.BasePermissions" } }, properties["BasePermissions"]);
        }
        const postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": "SP.RoleDefinition" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            let retDef = this;
            if (properties.hasOwnProperty("Name")) {
                const parent = this.getParent(RoleDefinitions, this.parentUrl, "");
                retDef = parent.getByName(properties["Name"]);
            }
            return {
                data: data,
                definition: retDef,
            };
        });
    }
    /* tslint:enable */
    /**
     * Deletes this role definition
     *
     */
    delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
}
/**
 * Describes the role definitons bound to a role assignment object
 *
 */
class RoleDefinitionBindings extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the RoleDefinitionBindings class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this role definition bindings collection
     */
    constructor(baseUrl, path = "roledefinitionbindings") {
        super(baseUrl, path);
    }
}

/**
 * Determines the display mode of the given control or view
 */
var ControlMode;
(function (ControlMode) {
    ControlMode[ControlMode["Display"] = 1] = "Display";
    ControlMode[ControlMode["Edit"] = 2] = "Edit";
    ControlMode[ControlMode["New"] = 3] = "New";
})(ControlMode || (ControlMode = {}));
/**
 * Specifies the type of the field.
 */
var FieldTypes;
(function (FieldTypes) {
    FieldTypes[FieldTypes["Invalid"] = 0] = "Invalid";
    FieldTypes[FieldTypes["Integer"] = 1] = "Integer";
    FieldTypes[FieldTypes["Text"] = 2] = "Text";
    FieldTypes[FieldTypes["Note"] = 3] = "Note";
    FieldTypes[FieldTypes["DateTime"] = 4] = "DateTime";
    FieldTypes[FieldTypes["Counter"] = 5] = "Counter";
    FieldTypes[FieldTypes["Choice"] = 6] = "Choice";
    FieldTypes[FieldTypes["Lookup"] = 7] = "Lookup";
    FieldTypes[FieldTypes["Boolean"] = 8] = "Boolean";
    FieldTypes[FieldTypes["Number"] = 9] = "Number";
    FieldTypes[FieldTypes["Currency"] = 10] = "Currency";
    FieldTypes[FieldTypes["URL"] = 11] = "URL";
    FieldTypes[FieldTypes["Computed"] = 12] = "Computed";
    FieldTypes[FieldTypes["Threading"] = 13] = "Threading";
    FieldTypes[FieldTypes["Guid"] = 14] = "Guid";
    FieldTypes[FieldTypes["MultiChoice"] = 15] = "MultiChoice";
    FieldTypes[FieldTypes["GridChoice"] = 16] = "GridChoice";
    FieldTypes[FieldTypes["Calculated"] = 17] = "Calculated";
    FieldTypes[FieldTypes["File"] = 18] = "File";
    FieldTypes[FieldTypes["Attachments"] = 19] = "Attachments";
    FieldTypes[FieldTypes["User"] = 20] = "User";
    FieldTypes[FieldTypes["Recurrence"] = 21] = "Recurrence";
    FieldTypes[FieldTypes["CrossProjectLink"] = 22] = "CrossProjectLink";
    FieldTypes[FieldTypes["ModStat"] = 23] = "ModStat";
    FieldTypes[FieldTypes["Error"] = 24] = "Error";
    FieldTypes[FieldTypes["ContentTypeId"] = 25] = "ContentTypeId";
    FieldTypes[FieldTypes["PageSeparator"] = 26] = "PageSeparator";
    FieldTypes[FieldTypes["ThreadIndex"] = 27] = "ThreadIndex";
    FieldTypes[FieldTypes["WorkflowStatus"] = 28] = "WorkflowStatus";
    FieldTypes[FieldTypes["AllDayEvent"] = 29] = "AllDayEvent";
    FieldTypes[FieldTypes["WorkflowEventType"] = 30] = "WorkflowEventType";
})(FieldTypes || (FieldTypes = {}));
var DateTimeFieldFormatType;
(function (DateTimeFieldFormatType) {
    DateTimeFieldFormatType[DateTimeFieldFormatType["DateOnly"] = 0] = "DateOnly";
    DateTimeFieldFormatType[DateTimeFieldFormatType["DateTime"] = 1] = "DateTime";
})(DateTimeFieldFormatType || (DateTimeFieldFormatType = {}));
/**
 * Specifies the control settings while adding a field.
 */
var AddFieldOptions;
(function (AddFieldOptions) {
    /**
     *  Specify that a new field added to the list must also be added to the default content type in the site collection
     */
    AddFieldOptions[AddFieldOptions["DefaultValue"] = 0] = "DefaultValue";
    /**
     * Specify that a new field added to the list must also be added to the default content type in the site collection.
     */
    AddFieldOptions[AddFieldOptions["AddToDefaultContentType"] = 1] = "AddToDefaultContentType";
    /**
     * Specify that a new field must not be added to any other content type
     */
    AddFieldOptions[AddFieldOptions["AddToNoContentType"] = 2] = "AddToNoContentType";
    /**
     *  Specify that a new field that is added to the specified list must also be added to all content types in the site collection
     */
    AddFieldOptions[AddFieldOptions["AddToAllContentTypes"] = 4] = "AddToAllContentTypes";
    /**
     * Specify adding an internal field name hint for the purpose of avoiding possible database locking or field renaming operations
     */
    AddFieldOptions[AddFieldOptions["AddFieldInternalNameHint"] = 8] = "AddFieldInternalNameHint";
    /**
     * Specify that a new field that is added to the specified list must also be added to the default list view
     */
    AddFieldOptions[AddFieldOptions["AddFieldToDefaultView"] = 16] = "AddFieldToDefaultView";
    /**
     * Specify to confirm that no other field has the same display name
     */
    AddFieldOptions[AddFieldOptions["AddFieldCheckDisplayName"] = 32] = "AddFieldCheckDisplayName";
})(AddFieldOptions || (AddFieldOptions = {}));
var CalendarType;
(function (CalendarType) {
    CalendarType[CalendarType["Gregorian"] = 1] = "Gregorian";
    CalendarType[CalendarType["Japan"] = 3] = "Japan";
    CalendarType[CalendarType["Taiwan"] = 4] = "Taiwan";
    CalendarType[CalendarType["Korea"] = 5] = "Korea";
    CalendarType[CalendarType["Hijri"] = 6] = "Hijri";
    CalendarType[CalendarType["Thai"] = 7] = "Thai";
    CalendarType[CalendarType["Hebrew"] = 8] = "Hebrew";
    CalendarType[CalendarType["GregorianMEFrench"] = 9] = "GregorianMEFrench";
    CalendarType[CalendarType["GregorianArabic"] = 10] = "GregorianArabic";
    CalendarType[CalendarType["GregorianXLITEnglish"] = 11] = "GregorianXLITEnglish";
    CalendarType[CalendarType["GregorianXLITFrench"] = 12] = "GregorianXLITFrench";
    CalendarType[CalendarType["KoreaJapanLunar"] = 14] = "KoreaJapanLunar";
    CalendarType[CalendarType["ChineseLunar"] = 15] = "ChineseLunar";
    CalendarType[CalendarType["SakaEra"] = 16] = "SakaEra";
    CalendarType[CalendarType["UmAlQura"] = 23] = "UmAlQura";
})(CalendarType || (CalendarType = {}));
var UrlFieldFormatType;
(function (UrlFieldFormatType) {
    UrlFieldFormatType[UrlFieldFormatType["Hyperlink"] = 0] = "Hyperlink";
    UrlFieldFormatType[UrlFieldFormatType["Image"] = 1] = "Image";
})(UrlFieldFormatType || (UrlFieldFormatType = {}));
var PermissionKind;
(function (PermissionKind) {
    /**
     * Has no permissions on the Site. Not available through the user interface.
     */
    PermissionKind[PermissionKind["EmptyMask"] = 0] = "EmptyMask";
    /**
     * View items in lists, documents in document libraries, and Web discussion comments.
     */
    PermissionKind[PermissionKind["ViewListItems"] = 1] = "ViewListItems";
    /**
     * Add items to lists, documents to document libraries, and Web discussion comments.
     */
    PermissionKind[PermissionKind["AddListItems"] = 2] = "AddListItems";
    /**
     * Edit items in lists, edit documents in document libraries, edit Web discussion comments
     * in documents, and customize Web Part Pages in document libraries.
     */
    PermissionKind[PermissionKind["EditListItems"] = 3] = "EditListItems";
    /**
     * Delete items from a list, documents from a document library, and Web discussion
     * comments in documents.
     */
    PermissionKind[PermissionKind["DeleteListItems"] = 4] = "DeleteListItems";
    /**
     * Approve a minor version of a list item or document.
     */
    PermissionKind[PermissionKind["ApproveItems"] = 5] = "ApproveItems";
    /**
     * View the source of documents with server-side file handlers.
     */
    PermissionKind[PermissionKind["OpenItems"] = 6] = "OpenItems";
    /**
     * View past versions of a list item or document.
     */
    PermissionKind[PermissionKind["ViewVersions"] = 7] = "ViewVersions";
    /**
     * Delete past versions of a list item or document.
     */
    PermissionKind[PermissionKind["DeleteVersions"] = 8] = "DeleteVersions";
    /**
     * Discard or check in a document which is checked out to another user.
     */
    PermissionKind[PermissionKind["CancelCheckout"] = 9] = "CancelCheckout";
    /**
     * Create, change, and delete personal views of lists.
     */
    PermissionKind[PermissionKind["ManagePersonalViews"] = 10] = "ManagePersonalViews";
    /**
     * Create and delete lists, add or remove columns in a list, and add or remove public views of a list.
     */
    PermissionKind[PermissionKind["ManageLists"] = 12] = "ManageLists";
    /**
     * View forms, views, and application pages, and enumerate lists.
     */
    PermissionKind[PermissionKind["ViewFormPages"] = 13] = "ViewFormPages";
    /**
     * Make content of a list or document library retrieveable for anonymous users through SharePoint search.
     * The list permissions in the site do not change.
     */
    PermissionKind[PermissionKind["AnonymousSearchAccessList"] = 14] = "AnonymousSearchAccessList";
    /**
     * Allow users to open a Site, list, or folder to access items inside that container.
     */
    PermissionKind[PermissionKind["Open"] = 17] = "Open";
    /**
     * View pages in a Site.
     */
    PermissionKind[PermissionKind["ViewPages"] = 18] = "ViewPages";
    /**
     * Add, change, or delete HTML pages or Web Part Pages, and edit the Site using
     * a Windows SharePoint Services compatible editor.
     */
    PermissionKind[PermissionKind["AddAndCustomizePages"] = 19] = "AddAndCustomizePages";
    /**
     * Apply a theme or borders to the entire Site.
     */
    PermissionKind[PermissionKind["ApplyThemeAndBorder"] = 20] = "ApplyThemeAndBorder";
    /**
     * Apply a style sheet (.css file) to the Site.
     */
    PermissionKind[PermissionKind["ApplyStyleSheets"] = 21] = "ApplyStyleSheets";
    /**
     * View reports on Site usage.
     */
    PermissionKind[PermissionKind["ViewUsageData"] = 22] = "ViewUsageData";
    /**
     * Create a Site using Self-Service Site Creation.
     */
    PermissionKind[PermissionKind["CreateSSCSite"] = 23] = "CreateSSCSite";
    /**
     * Create subsites such as team sites, Meeting Workspace sites, and Document Workspace sites.
     */
    PermissionKind[PermissionKind["ManageSubwebs"] = 24] = "ManageSubwebs";
    /**
     * Create a group of users that can be used anywhere within the site collection.
     */
    PermissionKind[PermissionKind["CreateGroups"] = 25] = "CreateGroups";
    /**
     * Create and change permission levels on the Site and assign permissions to users
     * and groups.
     */
    PermissionKind[PermissionKind["ManagePermissions"] = 26] = "ManagePermissions";
    /**
     * Enumerate files and folders in a Site using Microsoft Office SharePoint Designer
     * and WebDAV interfaces.
     */
    PermissionKind[PermissionKind["BrowseDirectories"] = 27] = "BrowseDirectories";
    /**
     * View information about users of the Site.
     */
    PermissionKind[PermissionKind["BrowseUserInfo"] = 28] = "BrowseUserInfo";
    /**
     * Add or remove personal Web Parts on a Web Part Page.
     */
    PermissionKind[PermissionKind["AddDelPrivateWebParts"] = 29] = "AddDelPrivateWebParts";
    /**
     * Update Web Parts to display personalized information.
     */
    PermissionKind[PermissionKind["UpdatePersonalWebParts"] = 30] = "UpdatePersonalWebParts";
    /**
     * Grant the ability to perform all administration tasks for the Site as well as
     * manage content, activate, deactivate, or edit properties of Site scoped Features
     * through the object model or through the user interface (UI). When granted on the
     * root Site of a Site Collection, activate, deactivate, or edit properties of
     * site collection scoped Features through the object model. To browse to the Site
     * Collection Features page and activate or deactivate Site Collection scoped Features
     * through the UI, you must be a Site Collection administrator.
     */
    PermissionKind[PermissionKind["ManageWeb"] = 31] = "ManageWeb";
    /**
     * Content of lists and document libraries in the Web site will be retrieveable for anonymous users through
     * SharePoint search if the list or document library has AnonymousSearchAccessList set.
     */
    PermissionKind[PermissionKind["AnonymousSearchAccessWebLists"] = 32] = "AnonymousSearchAccessWebLists";
    /**
     * Use features that launch client applications. Otherwise, users must work on documents
     * locally and upload changes.
     */
    PermissionKind[PermissionKind["UseClientIntegration"] = 37] = "UseClientIntegration";
    /**
     * Use SOAP, WebDAV, or Microsoft Office SharePoint Designer interfaces to access the Site.
     */
    PermissionKind[PermissionKind["UseRemoteAPIs"] = 38] = "UseRemoteAPIs";
    /**
     * Manage alerts for all users of the Site.
     */
    PermissionKind[PermissionKind["ManageAlerts"] = 39] = "ManageAlerts";
    /**
     * Create e-mail alerts.
     */
    PermissionKind[PermissionKind["CreateAlerts"] = 40] = "CreateAlerts";
    /**
     * Allows a user to change his or her user information, such as adding a picture.
     */
    PermissionKind[PermissionKind["EditMyUserInfo"] = 41] = "EditMyUserInfo";
    /**
     * Enumerate permissions on Site, list, folder, document, or list item.
     */
    PermissionKind[PermissionKind["EnumeratePermissions"] = 63] = "EnumeratePermissions";
    /**
     * Has all permissions on the Site. Not available through the user interface.
     */
    PermissionKind[PermissionKind["FullMask"] = 65] = "FullMask";
})(PermissionKind || (PermissionKind = {}));
var PrincipalType$1;
(function (PrincipalType) {
    PrincipalType[PrincipalType["None"] = 0] = "None";
    PrincipalType[PrincipalType["User"] = 1] = "User";
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType$1 || (PrincipalType$1 = {}));
var PrincipalSource;
(function (PrincipalSource) {
    PrincipalSource[PrincipalSource["None"] = 0] = "None";
    PrincipalSource[PrincipalSource["UserInfoList"] = 1] = "UserInfoList";
    PrincipalSource[PrincipalSource["Windows"] = 2] = "Windows";
    PrincipalSource[PrincipalSource["MembershipProvider"] = 4] = "MembershipProvider";
    PrincipalSource[PrincipalSource["RoleProvider"] = 8] = "RoleProvider";
    PrincipalSource[PrincipalSource["All"] = 15] = "All";
})(PrincipalSource || (PrincipalSource = {}));
var RoleType;
(function (RoleType) {
    RoleType[RoleType["None"] = 0] = "None";
    RoleType[RoleType["Guest"] = 1] = "Guest";
    RoleType[RoleType["Reader"] = 2] = "Reader";
    RoleType[RoleType["Contributor"] = 3] = "Contributor";
    RoleType[RoleType["WebDesigner"] = 4] = "WebDesigner";
    RoleType[RoleType["Administrator"] = 5] = "Administrator";
})(RoleType || (RoleType = {}));
var PageType;
(function (PageType) {
    PageType[PageType["Invalid"] = -1] = "Invalid";
    PageType[PageType["DefaultView"] = 0] = "DefaultView";
    PageType[PageType["NormalView"] = 1] = "NormalView";
    PageType[PageType["DialogView"] = 2] = "DialogView";
    PageType[PageType["View"] = 3] = "View";
    PageType[PageType["DisplayForm"] = 4] = "DisplayForm";
    PageType[PageType["DisplayFormDialog"] = 5] = "DisplayFormDialog";
    PageType[PageType["EditForm"] = 6] = "EditForm";
    PageType[PageType["EditFormDialog"] = 7] = "EditFormDialog";
    PageType[PageType["NewForm"] = 8] = "NewForm";
    PageType[PageType["NewFormDialog"] = 9] = "NewFormDialog";
    PageType[PageType["SolutionForm"] = 10] = "SolutionForm";
    PageType[PageType["PAGE_MAXITEMS"] = 11] = "PAGE_MAXITEMS";
})(PageType || (PageType = {}));
var SharingLinkKind;
(function (SharingLinkKind) {
    /**
     * Uninitialized link
     */
    SharingLinkKind[SharingLinkKind["Uninitialized"] = 0] = "Uninitialized";
    /**
     * Direct link to the object being shared
     */
    SharingLinkKind[SharingLinkKind["Direct"] = 1] = "Direct";
    /**
     * Organization-shareable link to the object being shared with view permissions
     */
    SharingLinkKind[SharingLinkKind["OrganizationView"] = 2] = "OrganizationView";
    /**
     * Organization-shareable link to the object being shared with edit permissions
     */
    SharingLinkKind[SharingLinkKind["OrganizationEdit"] = 3] = "OrganizationEdit";
    /**
     * View only anonymous link
     */
    SharingLinkKind[SharingLinkKind["AnonymousView"] = 4] = "AnonymousView";
    /**
     * Read/Write anonymous link
     */
    SharingLinkKind[SharingLinkKind["AnonymousEdit"] = 5] = "AnonymousEdit";
    /**
     * Flexible sharing Link where properties can change without affecting link URL
     */
    SharingLinkKind[SharingLinkKind["Flexible"] = 6] = "Flexible";
})(SharingLinkKind || (SharingLinkKind = {}));
/**
 * Indicates the role of the sharing link
 */
var SharingRole;
(function (SharingRole) {
    SharingRole[SharingRole["None"] = 0] = "None";
    SharingRole[SharingRole["View"] = 1] = "View";
    SharingRole[SharingRole["Edit"] = 2] = "Edit";
    SharingRole[SharingRole["Owner"] = 3] = "Owner";
})(SharingRole || (SharingRole = {}));
var SharingOperationStatusCode;
(function (SharingOperationStatusCode) {
    /**
     * The share operation completed without errors.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CompletedSuccessfully"] = 0] = "CompletedSuccessfully";
    /**
     * The share operation completed and generated requests for access.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["AccessRequestsQueued"] = 1] = "AccessRequestsQueued";
    /**
     * The share operation failed as there were no resolved users.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["NoResolvedUsers"] = -1] = "NoResolvedUsers";
    /**
     * The share operation failed due to insufficient permissions.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["AccessDenied"] = -2] = "AccessDenied";
    /**
     * The share operation failed when attempting a cross site share, which is not supported.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CrossSiteRequestNotSupported"] = -3] = "CrossSiteRequestNotSupported";
    /**
     * The sharing operation failed due to an unknown error.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["UnknowError"] = -4] = "UnknowError";
    /**
     * The text you typed is too long. Please shorten it.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["EmailBodyTooLong"] = -5] = "EmailBodyTooLong";
    /**
     * The maximum number of unique scopes in the list has been exceeded.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["ListUniqueScopesExceeded"] = -6] = "ListUniqueScopesExceeded";
    /**
     * The share operation failed because a sharing capability is disabled in the site.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CapabilityDisabled"] = -7] = "CapabilityDisabled";
    /**
     * The specified object for the share operation is not supported.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["ObjectNotSupported"] = -8] = "ObjectNotSupported";
    /**
     * A SharePoint group cannot contain another SharePoint group.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["NestedGroupsNotSupported"] = -9] = "NestedGroupsNotSupported";
})(SharingOperationStatusCode || (SharingOperationStatusCode = {}));
var SPSharedObjectType;
(function (SPSharedObjectType) {
    SPSharedObjectType[SPSharedObjectType["Unknown"] = 0] = "Unknown";
    SPSharedObjectType[SPSharedObjectType["File"] = 1] = "File";
    SPSharedObjectType[SPSharedObjectType["Folder"] = 2] = "Folder";
    SPSharedObjectType[SPSharedObjectType["Item"] = 3] = "Item";
    SPSharedObjectType[SPSharedObjectType["List"] = 4] = "List";
    SPSharedObjectType[SPSharedObjectType["Web"] = 5] = "Web";
    SPSharedObjectType[SPSharedObjectType["Max"] = 6] = "Max";
})(SPSharedObjectType || (SPSharedObjectType = {}));
var SharingDomainRestrictionMode;
(function (SharingDomainRestrictionMode) {
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["None"] = 0] = "None";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["AllowList"] = 1] = "AllowList";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["BlockList"] = 2] = "BlockList";
})(SharingDomainRestrictionMode || (SharingDomainRestrictionMode = {}));
var RenderListDataOptions;
(function (RenderListDataOptions) {
    RenderListDataOptions[RenderListDataOptions["None"] = 0] = "None";
    RenderListDataOptions[RenderListDataOptions["ContextInfo"] = 1] = "ContextInfo";
    RenderListDataOptions[RenderListDataOptions["ListData"] = 2] = "ListData";
    RenderListDataOptions[RenderListDataOptions["ListSchema"] = 4] = "ListSchema";
    RenderListDataOptions[RenderListDataOptions["MenuView"] = 8] = "MenuView";
})(RenderListDataOptions || (RenderListDataOptions = {}));

class SharePointQueryableSecurable extends SharePointQueryableInstance {
    /**
     * Gets the set of role assignments for this item
     *
     */
    get roleAssignments() {
        return new RoleAssignments(this);
    }
    /**
     * Gets the closest securable up the security hierarchy whose permissions are applied to this list item
     *
     */
    get firstUniqueAncestorSecurableObject() {
        return new SharePointQueryableInstance(this, "FirstUniqueAncestorSecurableObject");
    }
    /**
     * Gets the effective permissions for the user supplied
     *
     * @param loginName The claims username for the user (ex: i:0#.f|membership|user@domain.com)
     */
    getUserEffectivePermissions(loginName) {
        const q = this.clone(SharePointQueryable, "getUserEffectivePermissions(@user)");
        q.query.add("@user", `'${encodeURIComponent(loginName)}'`);
        return q.get().then(r => {
            // handle verbose mode
            return r.hasOwnProperty("GetUserEffectivePermissions") ? r.GetUserEffectivePermissions : r;
        });
    }
    /**
     * Gets the effective permissions for the current user
     */
    getCurrentUserEffectivePermissions() {
        // remove need to reference Web here, which created a circular build issue
        const w = new SharePointQueryableInstance("_api/web", "currentuser");
        return w.select("LoginName").get().then(user => {
            return this.getUserEffectivePermissions(user.LoginName);
        });
    }
    /**
     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
     *
     * @param copyRoleAssignments If true the permissions are copied from the current parent scope
     * @param clearSubscopes Optional. true to make all child securable objects inherit role assignments from the current object
     */
    breakRoleInheritance(copyRoleAssignments = false, clearSubscopes = false) {
        return this.clone(SharePointQueryableSecurable, `breakroleinheritance(copyroleassignments=${copyRoleAssignments}, clearsubscopes=${clearSubscopes})`).postCore();
    }
    /**
     * Removes the local role assignments so that it re-inherit role assignments from the parent object.
     *
     */
    resetRoleInheritance() {
        return this.clone(SharePointQueryableSecurable, "resetroleinheritance").postCore();
    }
    /**
     * Determines if a given user has the appropriate permissions
     *
     * @param loginName The user to check
     * @param permission The permission being checked
     */
    userHasPermissions(loginName, permission) {
        return this.getUserEffectivePermissions(loginName).then(perms => {
            return this.hasPermissions(perms, permission);
        });
    }
    /**
     * Determines if the current user has the requested permissions
     *
     * @param permission The permission we wish to check
     */
    currentUserHasPermissions(permission) {
        return this.getCurrentUserEffectivePermissions().then(perms => {
            return this.hasPermissions(perms, permission);
        });
    }
    /**
     * Taken from sp.js, checks the supplied permissions against the mask
     *
     * @param value The security principal's permissions on the given object
     * @param perm The permission checked against the value
     */
    /* tslint:disable:no-bitwise */
    hasPermissions(value, perm) {
        if (!perm) {
            return true;
        }
        if (perm === PermissionKind.FullMask) {
            return (value.High & 32767) === 32767 && value.Low === 65535;
        }
        perm = perm - 1;
        let num = 1;
        if (perm >= 0 && perm < 32) {
            num = num << perm;
            return 0 !== (value.Low & num);
        }
        else if (perm >= 32 && perm < 64) {
            num = num << perm - 32;
            return 0 !== (value.High & num);
        }
        return false;
    }
}

/**
 * Internal helper class used to augment classes to include sharing functionality
 */
class SharePointQueryableShareable extends SharePointQueryable {
    /**
     * Gets a sharing link for the supplied
     *
     * @param kind The kind of link to share
     * @param expiration The optional expiration for this link
     */
    getShareLink(kind, expiration = null) {
        // date needs to be an ISO string or null
        const expString = expiration !== null ? expiration.toISOString() : null;
        // clone using the factory and send the request
        return this.clone(SharePointQueryableShareable, "shareLink").postCore({
            body: JSON.stringify({
                request: {
                    createLink: true,
                    emailData: null,
                    settings: {
                        expiration: expString,
                        linkKind: kind,
                    },
                },
            }),
        });
    }
    /**
     * Shares this instance with the supplied users
     *
     * @param loginNames Resolved login names to share
     * @param role The role
     * @param requireSignin True to require the user is authenticated, otherwise false
     * @param propagateAcl True to apply this share to all children
     * @param emailData If supplied an email will be sent with the indicated properties
     */
    shareWith(loginNames, role, requireSignin = false, propagateAcl = false, emailData) {
        // handle the multiple input types
        if (!Array.isArray(loginNames)) {
            loginNames = [loginNames];
        }
        const userStr = JSON.stringify(loginNames.map(login => { return { Key: login }; }));
        const roleFilter = role === SharingRole.Edit ? RoleType.Contributor : RoleType.Reader;
        // start by looking up the role definition id we need to set the roleValue
        // remove need to reference Web here, which created a circular build issue
        const w = new SharePointQueryableCollection("_api/web", "roledefinitions");
        return w.select("Id").filter(`RoleTypeKind eq ${roleFilter}`).get().then((def) => {
            if (!Array.isArray(def) || def.length < 1) {
                throw new Error(`Could not locate a role defintion with RoleTypeKind ${roleFilter}`);
            }
            let postBody = {
                includeAnonymousLinkInEmail: requireSignin,
                peoplePickerInput: userStr,
                propagateAcl: propagateAcl,
                roleValue: `role:${def[0].Id}`,
                useSimplifiedRoles: true,
            };
            if (typeof emailData !== "undefined") {
                postBody = Util.extend(postBody, {
                    emailBody: emailData.body,
                    emailSubject: typeof emailData.subject !== "undefined" ? emailData.subject : "",
                    sendEmail: true,
                });
            }
            return this.clone(SharePointQueryableShareable, "shareObject").postCore({
                body: JSON.stringify(postBody),
            });
        });
    }
    /**
     * Shares an object based on the supplied options
     *
     * @param options The set of options to send to the ShareObject method
     * @param bypass If true any processing is skipped and the options are sent directly to the ShareObject method
     */
    shareObject(options, bypass = false) {
        if (bypass) {
            // if the bypass flag is set send the supplied parameters directly to the service
            return this.sendShareObjectRequest(options);
        }
        // extend our options with some defaults
        options = Util.extend(options, {
            group: null,
            includeAnonymousLinkInEmail: false,
            propagateAcl: false,
            useSimplifiedRoles: true,
        }, true);
        return this.getRoleValue(options.role, options.group).then(roleValue => {
            // handle the multiple input types
            if (!Array.isArray(options.loginNames)) {
                options.loginNames = [options.loginNames];
            }
            const userStr = JSON.stringify(options.loginNames.map(login => { return { Key: login }; }));
            let postBody = {
                peoplePickerInput: userStr,
                roleValue: roleValue,
                url: options.url,
            };
            if (typeof options.emailData !== "undefined" && options.emailData !== null) {
                postBody = Util.extend(postBody, {
                    emailBody: options.emailData.body,
                    emailSubject: typeof options.emailData.subject !== "undefined" ? options.emailData.subject : "Shared with you.",
                    sendEmail: true,
                });
            }
            return this.sendShareObjectRequest(postBody);
        });
    }
    /**
     * Calls the web's UnshareObject method
     *
     * @param url The url of the object to unshare
     */
    unshareObjectWeb(url) {
        return this.clone(SharePointQueryableShareable, "unshareObject").postCore({
            body: JSON.stringify({
                url: url,
            }),
        });
    }
    /**
     * Checks Permissions on the list of Users and returns back role the users have on the Item.
     *
     * @param recipients The array of Entities for which Permissions need to be checked.
     */
    checkPermissions(recipients) {
        return this.clone(SharePointQueryableShareable, "checkPermissions").postCore({
            body: JSON.stringify({
                recipients: recipients,
            }),
        });
    }
    /**
     * Get Sharing Information.
     *
     * @param request The SharingInformationRequest Object.
     */
    getSharingInformation(request = null) {
        return this.clone(SharePointQueryableShareable, "getSharingInformation").postCore({
            body: JSON.stringify({
                request: request,
            }),
        });
    }
    /**
     * Gets the sharing settings of an item.
     *
     * @param useSimplifiedRoles Determines whether to use simplified roles.
     */
    getObjectSharingSettings(useSimplifiedRoles = true) {
        return this.clone(SharePointQueryableShareable, "getObjectSharingSettings").postCore({
            body: JSON.stringify({
                useSimplifiedRoles: useSimplifiedRoles,
            }),
        });
    }
    /**
     * Unshares this object
     */
    unshareObject() {
        return this.clone(SharePointQueryableShareable, "unshareObject").postCore();
    }
    /**
     * Deletes a link by type
     *
     * @param kind Deletes a sharing link by the kind of link
     */
    deleteLinkByKind(kind) {
        return this.clone(SharePointQueryableShareable, "deleteLinkByKind").postCore({
            body: JSON.stringify({ linkKind: kind }),
        });
    }
    /**
     * Removes the specified link to the item.
     *
     * @param kind The kind of link to be deleted.
     * @param shareId
     */
    unshareLink(kind, shareId = "00000000-0000-0000-0000-000000000000") {
        return this.clone(SharePointQueryableShareable, "unshareLink").postCore({
            body: JSON.stringify({ linkKind: kind, shareId: shareId }),
        });
    }
    /**
     * Calculates the roleValue string used in the sharing query
     *
     * @param role The Sharing Role
     * @param group The Group type
     */
    getRoleValue(role, group) {
        // we will give group precedence, because we had to make a choice
        if (typeof group !== "undefined" && group !== null) {
            switch (group) {
                case RoleType.Contributor:
                    // remove need to reference Web here, which created a circular build issue
                    const memberGroup = new SharePointQueryableInstance("_api/web", "associatedmembergroup");
                    return memberGroup.select("Id").get().then(g => `group: ${g.Id}`);
                case RoleType.Reader:
                case RoleType.Guest:
                    // remove need to reference Web here, which created a circular build issue
                    const visitorGroup = new SharePointQueryableInstance("_api/web", "associatedvisitorgroup");
                    return visitorGroup.select("Id").get().then(g => `group: ${g.Id}`);
                default:
                    throw new Error("Could not determine role value for supplied value. Contributor, Reader, and Guest are supported");
            }
        }
        else {
            const roleFilter = role === SharingRole.Edit ? RoleType.Contributor : RoleType.Reader;
            // remove need to reference Web here, which created a circular build issue
            const roleDefs = new SharePointQueryableCollection("_api/web", "roledefinitions");
            return roleDefs.select("Id").top(1).filter(`RoleTypeKind eq ${roleFilter}`).get().then(def => {
                if (def.length < 1) {
                    throw new Error("Could not locate associated role definition for supplied role. Edit and View are supported");
                }
                return `role: ${def[0].Id}`;
            });
        }
    }
    getShareObjectWeb(candidate) {
        return Promise.resolve(new SharePointQueryableInstance(extractWebUrl(candidate), "/_api/SP.Web.ShareObject"));
    }
    sendShareObjectRequest(options) {
        return this.getShareObjectWeb(this.toUrl()).then(web => {
            return web.expand("UsersWithAccessRequests", "GroupsSharedWith").as(SharePointQueryableShareable).postCore({
                body: JSON.stringify(options),
            });
        });
    }
}
class SharePointQueryableShareableWeb extends SharePointQueryableSecurable {
    /**
     * Shares this web with the supplied users
     * @param loginNames The resolved login names to share
     * @param role The role to share this web
     * @param emailData Optional email data
     */
    shareWith(loginNames, role = SharingRole.View, emailData) {
        const dependency = this.addBatchDependency();
        // remove need to reference Web here, which created a circular build issue
        const web = new SharePointQueryableInstance(extractWebUrl(this.toUrl()), "/_api/web/url");
        return web.get().then((url) => {
            dependency();
            return this.shareObject(Util.combinePaths(url, "/_layouts/15/aclinv.aspx?forSharing=1&mbypass=1"), loginNames, role, emailData);
        });
    }
    /**
     * Provides direct access to the static web.ShareObject method
     *
     * @param url The url to share
     * @param loginNames Resolved loginnames string[] of a single login name string
     * @param roleValue Role value
     * @param emailData Optional email data
     * @param groupId Optional group id
     * @param propagateAcl
     * @param includeAnonymousLinkInEmail
     * @param useSimplifiedRoles
     */
    shareObject(url, loginNames, role, emailData, group, propagateAcl = false, includeAnonymousLinkInEmail = false, useSimplifiedRoles = true) {
        return this.clone(SharePointQueryableShareable, null).shareObject({
            emailData: emailData,
            group: group,
            includeAnonymousLinkInEmail: includeAnonymousLinkInEmail,
            loginNames: loginNames,
            propagateAcl: propagateAcl,
            role: role,
            url: url,
            useSimplifiedRoles: useSimplifiedRoles,
        });
    }
    /**
     * Supplies a method to pass any set of arguments to ShareObject
     *
     * @param options The set of options to send to ShareObject
     */
    shareObjectRaw(options) {
        return this.clone(SharePointQueryableShareable, null).shareObject(options, true);
    }
    /**
     * Unshares the object
     *
     * @param url The url of the object to stop sharing
     */
    unshareObject(url) {
        return this.clone(SharePointQueryableShareable, null).unshareObjectWeb(url);
    }
}
class SharePointQueryableShareableItem extends SharePointQueryableSecurable {
    /**
     * Gets a link suitable for sharing for this item
     *
     * @param kind The type of link to share
     * @param expiration The optional expiration date
     */
    getShareLink(kind = SharingLinkKind.OrganizationView, expiration = null) {
        return this.clone(SharePointQueryableShareable, null).getShareLink(kind, expiration);
    }
    /**
     * Shares this item with one or more users
     *
     * @param loginNames string or string[] of resolved login names to which this item will be shared
     * @param role The role (View | Edit) applied to the share
     * @param emailData Optional, if inlucded an email will be sent. Note subject currently has no effect.
     */
    shareWith(loginNames, role = SharingRole.View, requireSignin = false, emailData) {
        return this.clone(SharePointQueryableShareable, null).shareWith(loginNames, role, requireSignin, false, emailData);
    }
    /**
     * Checks Permissions on the list of Users and returns back role the users have on the Item.
     *
     * @param recipients The array of Entities for which Permissions need to be checked.
     */
    checkSharingPermissions(recipients) {
        return this.clone(SharePointQueryableShareable, null).checkPermissions(recipients);
    }
    /**
     * Get Sharing Information.
     *
     * @param request The SharingInformationRequest Object.
     */
    getSharingInformation(request = null) {
        return this.clone(SharePointQueryableShareable, null).getSharingInformation(request);
    }
    /**
     * Gets the sharing settings of an item.
     *
     * @param useSimplifiedRoles Determines whether to use simplified roles.
     */
    getObjectSharingSettings(useSimplifiedRoles = true) {
        return this.clone(SharePointQueryableShareable, null).getObjectSharingSettings(useSimplifiedRoles);
    }
    /**
     * Unshare this item
     */
    unshare() {
        return this.clone(SharePointQueryableShareable, null).unshareObject();
    }
    /**
     * Deletes a sharing link by kind
     *
     * @param kind Deletes a sharing link by the kind of link
     */
    deleteSharingLinkByKind(kind) {
        return this.clone(SharePointQueryableShareable, null).deleteLinkByKind(kind);
    }
    /**
     * Removes the specified link to the item.
     *
     * @param kind The kind of link to be deleted.
     * @param shareId
     */
    unshareLink(kind, shareId) {
        return this.clone(SharePointQueryableShareable, null).unshareLink(kind, shareId);
    }
}
class FileFolderShared extends SharePointQueryableInstance {
    /**
     * Gets a link suitable for sharing
     *
     * @param kind The kind of link to get
     * @param expiration Optional, an expiration for this link
     */
    getShareLink(kind = SharingLinkKind.OrganizationView, expiration = null) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.getShareLink(kind, expiration);
        });
    }
    /**
         * Checks Permissions on the list of Users and returns back role the users have on the Item.
         *
         * @param recipients The array of Entities for which Permissions need to be checked.
         */
    checkSharingPermissions(recipients) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.checkPermissions(recipients);
        });
    }
    /**
     * Get Sharing Information.
     *
     * @param request The SharingInformationRequest Object.
     */
    getSharingInformation(request = null) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.getSharingInformation(request);
        });
    }
    /**
     * Gets the sharing settings of an item.
     *
     * @param useSimplifiedRoles Determines whether to use simplified roles.
     */
    getObjectSharingSettings(useSimplifiedRoles = true) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.getObjectSharingSettings(useSimplifiedRoles);
        });
    }
    /**
     * Unshare this item
     */
    unshare() {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.unshareObject();
        });
    }
    /**
     * Deletes a sharing link by the kind of link
     *
     * @param kind The kind of link to be deleted.
     */
    deleteSharingLinkByKind(kind) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.deleteLinkByKind(kind);
        });
    }
    /**
     * Removes the specified link to the item.
     *
     * @param kind The kind of link to be deleted.
     * @param shareId The share id to delete
     */
    unshareLink(kind, shareId) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.unshareLink(kind, shareId);
        });
    }
    /**
     * For files and folders we need to use the associated item end point
     */
    getShareable() {
        // sharing only works on the item end point, not the file one - so we create a folder instance with the item url internally
        return this.clone(SharePointQueryableShareableFile, "listItemAllFields", false).select("odata.editlink").get().then(d => {
            let shareable = new SharePointQueryableShareable(spGetEntityUrl(d));
            // we need to handle batching
            if (this.hasBatch) {
                shareable = shareable.inBatch(this.batch);
            }
            return shareable;
        });
    }
}
class SharePointQueryableShareableFile extends FileFolderShared {
    /**
     * Shares this item with one or more users
     *
     * @param loginNames string or string[] of resolved login names to which this item will be shared
     * @param role The role (View | Edit) applied to the share
     * @param shareEverything Share everything in this folder, even items with unique permissions.
     * @param requireSignin If true the user must signin to view link, otherwise anyone with the link can access the resource
     * @param emailData Optional, if inlucded an email will be sent. Note subject currently has no effect.
     */
    shareWith(loginNames, role = SharingRole.View, requireSignin = false, emailData) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.shareWith(loginNames, role, requireSignin, false, emailData);
        });
    }
}
class SharePointQueryableShareableFolder extends FileFolderShared {
    /**
     * Shares this item with one or more users
     *
     * @param loginNames string or string[] of resolved login names to which this item will be shared
     * @param role The role (View | Edit) applied to the share
     * @param shareEverything Share everything in this folder, even items with unique permissions.
     * @param requireSignin If true the user must signin to view link, otherwise anyone with the link can access the resource
     * @param emailData Optional, if inlucded an email will be sent. Note subject currently has no effect.
     */
    shareWith(loginNames, role = SharingRole.View, requireSignin = false, shareEverything = false, emailData) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.shareWith(loginNames, role, requireSignin, shareEverything, emailData);
        });
    }
}

class LimitedWebPartManager extends SharePointQueryable {
    /**
     * Gets the set of web part definitions contained by this web part manager
     *
     */
    get webparts() {
        return new WebPartDefinitions(this, "webparts");
    }
    /**
     * Exports a webpart definition
     *
     * @param id the GUID id of the definition to export
     */
    export(id) {
        return this.clone(LimitedWebPartManager, "ExportWebPart").postCore({
            body: JSON.stringify({ webPartId: id }),
        });
    }
    /**
     * Imports a webpart
     *
     * @param xml webpart definition which must be valid XML in the .dwp or .webpart format
     */
    import(xml) {
        return this.clone(LimitedWebPartManager, "ImportWebPart").postCore({
            body: JSON.stringify({ webPartXml: xml }),
        });
    }
}
class WebPartDefinitions extends SharePointQueryableCollection {
    /**
     * Gets a web part definition from the collection by id
     *
     * @param id The storage ID of the SPWebPartDefinition to retrieve
     */
    getById(id) {
        return new WebPartDefinition(this, `getbyid('${id}')`);
    }
    /**
     * Gets a web part definition from the collection by storage id
     *
     * @param id The WebPart.ID of the SPWebPartDefinition to retrieve
     */
    getByControlId(id) {
        return new WebPartDefinition(this, `getByControlId('${id}')`);
    }
}
class WebPartDefinition extends SharePointQueryableInstance {
    /**
     * Gets the webpart information associated with this definition
     */
    get webpart() {
        return new WebPart(this);
    }
    /**
     * Saves changes to the Web Part made using other properties and methods on the SPWebPartDefinition object
     */
    saveChanges() {
        return this.clone(WebPartDefinition, "SaveWebPartChanges").postCore();
    }
    /**
     * Moves the Web Part to a different location on a Web Part Page
     *
     * @param zoneId The ID of the Web Part Zone to which to move the Web Part
     * @param zoneIndex A Web Part zone index that specifies the position at which the Web Part is to be moved within the destination Web Part zone
     */
    moveTo(zoneId, zoneIndex) {
        return this.clone(WebPartDefinition, `MoveWebPartTo(zoneID='${zoneId}', zoneIndex=${zoneIndex})`).postCore();
    }
    /**
     * Closes the Web Part. If the Web Part is already closed, this method does nothing
     */
    close() {
        return this.clone(WebPartDefinition, "CloseWebPart").postCore();
    }
    /**
     * Opens the Web Part. If the Web Part is already closed, this method does nothing
     */
    open() {
        return this.clone(WebPartDefinition, "OpenWebPart").postCore();
    }
    /**
     * Removes a webpart from a page, all settings will be lost
     */
    delete() {
        return this.clone(WebPartDefinition, "DeleteWebPart").postCore();
    }
}
class WebPart extends SharePointQueryableInstance {
    /**
     * Creates a new instance of the WebPart class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    constructor(baseUrl, path = "webpart") {
        super(baseUrl, path);
    }
}

/**
 * Describes a collection of Folder objects
 *
 */
class Folders extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Folders class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "folders") {
        super(baseUrl, path);
    }
    /**
     * Gets a folder by folder name
     *
     */
    getByName(name) {
        const f = new Folder(this);
        f.concat(`('${name}')`);
        return f;
    }
    /**
     * Adds a new folder to the current folder (relative) or any folder (absolute)
     *
     * @param url The relative or absolute url where the new folder will be created. Urls starting with a forward slash are absolute.
     * @returns The new Folder and the raw response.
     */
    add(url) {
        return this.clone(Folders, `add('${url}')`).postCore().then((response) => {
            return {
                data: response,
                folder: this.getByName(url),
            };
        });
    }
}
/**
 * Describes a single Folder instance
 *
 */
class Folder extends SharePointQueryableShareableFolder {
    /**
     * Specifies the sequence in which content types are displayed.
     *
     */
    get contentTypeOrder() {
        return new SharePointQueryableCollection(this, "contentTypeOrder");
    }
    /**
     * Gets this folder's files
     *
     */
    get files() {
        return new Files(this);
    }
    /**
     * Gets this folder's sub folders
     *
     */
    get folders() {
        return new Folders(this);
    }
    /**
     * Gets this folder's list item field values
     *
     */
    get listItemAllFields() {
        return new SharePointQueryableCollection(this, "listItemAllFields");
    }
    /**
     * Gets the parent folder, if available
     *
     */
    get parentFolder() {
        return new Folder(this, "parentFolder");
    }
    /**
     * Gets this folder's properties
     *
     */
    get properties() {
        return new SharePointQueryableInstance(this, "properties");
    }
    /**
     * Gets this folder's server relative url
     *
     */
    get serverRelativeUrl() {
        return new SharePointQueryable(this, "serverRelativeUrl");
    }
    /**
     * Gets a value that specifies the content type order.
     *
     */
    get uniqueContentTypeOrder() {
        return new SharePointQueryableCollection(this, "uniqueContentTypeOrder");
    }
    update(properties) {
        const postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": "SP.Folder" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                data: data,
                folder: this,
            };
        });
    }
    /**
    * Delete this folder
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    delete(eTag = "*") {
        return this.clone(Folder, null).postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    /**
     * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle() {
        return this.clone(Folder, "recycle").postCore();
    }
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    getItem(...selects) {
        const q = this.listItemAllFields;
        return q.select.apply(q, selects).get().then((d) => {
            return Util.extend(new Item(spGetEntityUrl(d)), d);
        });
    }
}

/**
 * Describes a collection of content types
 *
 */
class ContentTypes extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the ContentTypes class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this content types collection
     */
    constructor(baseUrl, path = "contenttypes") {
        super(baseUrl, path);
    }
    /**
     * Gets a ContentType by content type id
     */
    getById(id) {
        const ct = new ContentType(this);
        ct.concat(`('${id}')`);
        return ct;
    }
    /**
     * Adds an existing contenttype to a content type collection
     *
     * @param contentTypeId in the following format, for example: 0x010102
     */
    addAvailableContentType(contentTypeId) {
        const postBody = JSON.stringify({
            "contentTypeId": contentTypeId,
        });
        return this.clone(ContentTypes, "addAvailableContentType").postCore({ body: postBody }).then((data) => {
            return {
                contentType: this.getById(data.id),
                data: data,
            };
        });
    }
    /**
     * Adds a new content type to the collection
     *
     * @param id The desired content type id for the new content type (also determines the parent content type)
     * @param name The name of the content type
     * @param description The description of the content type
     * @param group The group in which to add the content type
     * @param additionalSettings Any additional settings to provide when creating the content type
     *
     */
    add(id, name, description = "", group = "Custom Content Types", additionalSettings = {}) {
        const postBody = JSON.stringify(Util.extend({
            "Description": description,
            "Group": group,
            "Id": { "StringValue": id },
            "Name": name,
            "__metadata": { "type": "SP.ContentType" },
        }, additionalSettings));
        return this.postCore({ body: postBody }).then((data) => {
            return { contentType: this.getById(data.id), data: data };
        });
    }
}
/**
 * Describes a single ContentType instance
 *
 */
class ContentType extends SharePointQueryableInstance {
    /**
     * Gets the column (also known as field) references in the content type.
    */
    get fieldLinks() {
        return new FieldLinks(this);
    }
    /**
     * Gets a value that specifies the collection of fields for the content type.
     */
    get fields() {
        return new SharePointQueryableCollection(this, "fields");
    }
    /**
     * Gets the parent content type of the content type.
     */
    get parent() {
        return new ContentType(this, "parent");
    }
    /**
     * Gets a value that specifies the collection of workflow associations for the content type.
     */
    get workflowAssociations() {
        return new SharePointQueryableCollection(this, "workflowAssociations");
    }
    /**
     * Delete this content type
     */
    delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
}
/**
 * Represents a collection of field link instances
 */
class FieldLinks extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the ContentType class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this content type instance
     */
    constructor(baseUrl, path = "fieldlinks") {
        super(baseUrl, path);
    }
    /**
     * Gets a FieldLink by GUID id
     *
     * @param id The GUID id of the field link
     */
    getById(id) {
        const fl = new FieldLink(this);
        fl.concat(`(guid'${id}')`);
        return fl;
    }
}
/**
 * Represents a field link instance
 */
class FieldLink extends SharePointQueryableInstance {
}

/**
 * Describes a collection of Item objects
 *
 */
class AttachmentFiles extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the AttachmentFiles class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this attachments collection
     */
    constructor(baseUrl, path = "AttachmentFiles") {
        super(baseUrl, path);
    }
    /**
     * Gets a Attachment File by filename
     *
     * @param name The name of the file, including extension.
     */
    getByName(name) {
        const f = new AttachmentFile(this);
        f.concat(`('${name}')`);
        return f;
    }
    /**
     * Adds a new attachment to the collection. Not supported for batching.
     *
     * @param name The name of the file, including extension.
     * @param content The Base64 file content.
     */
    add(name, content) {
        return this.clone(AttachmentFiles, `add(FileName='${name}')`, false).postCore({
            body: content,
        }).then((response) => {
            return {
                data: response,
                file: this.getByName(name),
            };
        });
    }
    /**
     * Adds multiple new attachment to the collection. Not supported for batching.
     *
     * @files name The collection of files to add
     */
    addMultiple(files) {
        // add the files in series so we don't get update conflicts
        return files.reduce((chain, file) => chain.then(() => this.clone(AttachmentFiles, `add(FileName='${file.name}')`, false).postCore({
            body: file.content,
        })), Promise.resolve());
    }
    /**
     * Delete multiple attachments from the collection. Not supported for batching.
     *
     * @files name The collection of files to delete
     */
    deleteMultiple(...files) {
        return files.reduce((chain, file) => chain.then(() => this.getByName(file).delete()), Promise.resolve());
    }
}
/**
 * Describes a single attachment file instance
 *
 */
class AttachmentFile extends SharePointQueryableInstance {
    /**
     * Gets the contents of the file as text
     *
     */
    getText() {
        return this.getParsed(new TextParser());
    }
    /**
     * Gets the contents of the file as a blob, does not work in Node.js
     *
     */
    getBlob() {
        return this.getParsed(new BlobParser());
    }
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js
     */
    getBuffer() {
        return this.getParsed(new BufferParser());
    }
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js
     */
    getJSON() {
        return this.getParsed(new JSONParser());
    }
    /**
     * Sets the content of a file. Not supported for batching
     *
     * @param content The value to set for the file contents
     */
    setContent(content) {
        return this.clone(AttachmentFile, "$value", false).postCore({
            body: content,
            headers: {
                "X-HTTP-Method": "PUT",
            },
        }).then(_ => new AttachmentFile(this));
    }
    /**
     * Delete this attachment file
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag = "*") {
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    getParsed(parser) {
        return this.clone(AttachmentFile, "$value", false).get(parser);
    }
}

/**
 * Describes the views available in the current context
 *
 */
class Views extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Views class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "views") {
        super(baseUrl, path);
    }
    /**
     * Gets a view by guid id
     *
     * @param id The GUID id of the view
     */
    getById(id) {
        const v = new View(this);
        v.concat(`('${id}')`);
        return v;
    }
    /**
     * Gets a view by title (case-sensitive)
     *
     * @param title The case-sensitive title of the view
     */
    getByTitle(title) {
        return new View(this, `getByTitle('${title}')`);
    }
    /**
     * Adds a new view to the collection
     *
     * @param title The new views's title
     * @param personalView True if this is a personal view, otherwise false, default = false
     * @param additionalSettings Will be passed as part of the view creation body
     */
    add(title, personalView = false, additionalSettings = {}) {
        const postBody = JSON.stringify(Util.extend({
            "PersonalView": personalView,
            "Title": title,
            "__metadata": { "type": "SP.View" },
        }, additionalSettings));
        return this.clone(Views, null).postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                view: this.getById(data.Id),
            };
        });
    }
}
/**
 * Describes a single View instance
 *
 */
class View extends SharePointQueryableInstance {
    get fields() {
        return new ViewFields(this);
    }
    /**
     * Updates this view intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the view
     */
    update(properties) {
        const postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": "SP.View" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                data: data,
                view: this,
            };
        });
    }
    /**
     * Delete this view
     *
     */
    delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    /**
     * Returns the list view as HTML.
     *
     */
    renderAsHtml() {
        return this.clone(SharePointQueryable, "renderashtml").get();
    }
}
class ViewFields extends SharePointQueryableCollection {
    constructor(baseUrl, path = "viewfields") {
        super(baseUrl, path);
    }
    /**
     * Gets a value that specifies the XML schema that represents the collection.
     */
    getSchemaXml() {
        return this.clone(SharePointQueryable, "schemaxml").get();
    }
    /**
     * Adds the field with the specified field internal name or display name to the collection.
     *
     * @param fieldTitleOrInternalName The case-sensitive internal name or display name of the field to add.
     */
    add(fieldTitleOrInternalName) {
        return this.clone(ViewFields, `addviewfield('${fieldTitleOrInternalName}')`).postCore();
    }
    /**
     * Moves the field with the specified field internal name to the specified position in the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to move.
     * @param index The zero-based index of the new position for the field.
     */
    move(fieldInternalName, index) {
        return this.clone(ViewFields, "moveviewfieldto").postCore({
            body: JSON.stringify({ "field": fieldInternalName, "index": index }),
        });
    }
    /**
     * Removes all the fields from the collection.
     */
    removeAll() {
        return this.clone(ViewFields, "removeallviewfields").postCore();
    }
    /**
     * Removes the field with the specified field internal name from the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
     */
    remove(fieldInternalName) {
        return this.clone(ViewFields, `removeviewfield('${fieldInternalName}')`).postCore();
    }
}

/**
 * Describes a collection of Field objects
 *
 */
class Fields extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "fields") {
        super(baseUrl, path);
    }
    /**
     * Gets a field from the collection by title
     *
     * @param title The case-sensitive title of the field
     */
    getByTitle(title) {
        return new Field(this, `getByTitle('${title}')`);
    }
    /**
     * Gets a field from the collection by using internal name or title
     *
     * @param name The case-sensitive internal name or title of the field
     */
    getByInternalNameOrTitle(name) {
        return new Field(this, `getByInternalNameOrTitle('${name}')`);
    }
    /**
     * Gets a list from the collection by guid id
     *
     * @param title The Id of the list
     */
    getById(id) {
        const f = new Field(this);
        f.concat(`('${id}')`);
        return f;
    }
    /**
     * Creates a field based on the specified schema
     */
    createFieldAsXml(xml) {
        let info;
        if (typeof xml === "string") {
            info = { SchemaXml: xml };
        }
        else {
            info = xml;
        }
        const postBody = JSON.stringify({
            "parameters": Util.extend({
                "__metadata": {
                    "type": "SP.XmlSchemaFieldCreationInformation",
                },
            }, info),
        });
        return this.clone(Fields, "createfieldasxml").postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                field: this.getById(data.Id),
            };
        });
    }
    /**
     * Adds a new list to the collection
     *
     * @param title The new field's title
     * @param fieldType The new field's type (ex: SP.FieldText)
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    add(title, fieldType, properties = {}) {
        const postBody = JSON.stringify(Util.extend({
            "Title": title,
            "__metadata": { "type": fieldType },
        }, properties));
        return this.clone(Fields, null).postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                field: this.getById(data.Id),
            };
        });
    }
    /**
     * Adds a new SP.FieldText to the collection
     *
     * @param title The field title
     * @param maxLength The maximum number of characters allowed in the value of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addText(title, maxLength = 255, properties) {
        const props = {
            FieldTypeKind: 2,
            MaxLength: maxLength,
        };
        return this.add(title, "SP.FieldText", Util.extend(props, properties));
    }
    /**
     * Adds a new SP.FieldCalculated to the collection
     *
     * @param title The field title.
     * @param formula The formula for the field.
     * @param dateFormat The date and time format that is displayed in the field.
     * @param outputType Specifies the output format for the field. Represents a FieldType value.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addCalculated(title, formula, dateFormat, outputType = FieldTypes.Text, properties) {
        const props = {
            DateFormat: dateFormat,
            FieldTypeKind: 17,
            Formula: formula,
            OutputType: outputType,
        };
        return this.add(title, "SP.FieldCalculated", Util.extend(props, properties));
    }
    /**
     * Adds a new SP.FieldDateTime to the collection
     *
     * @param title The field title
     * @param displayFormat The format of the date and time that is displayed in the field.
     * @param calendarType Specifies the calendar type of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addDateTime(title, displayFormat = DateTimeFieldFormatType.DateOnly, calendarType = CalendarType.Gregorian, friendlyDisplayFormat = 0, properties) {
        const props = {
            DateTimeCalendarType: calendarType,
            DisplayFormat: displayFormat,
            FieldTypeKind: 4,
            FriendlyDisplayFormat: friendlyDisplayFormat,
        };
        return this.add(title, "SP.FieldDateTime", Util.extend(props, properties));
    }
    /**
     * Adds a new SP.FieldNumber to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addNumber(title, minValue, maxValue, properties) {
        let props = { FieldTypeKind: 9 };
        if (typeof minValue !== "undefined") {
            props = Util.extend({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = Util.extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldNumber", Util.extend(props, properties));
    }
    /**
     * Adds a new SP.FieldCurrency to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param currencyLocalId Specifies the language code identifier (LCID) used to format the value of the field
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addCurrency(title, minValue, maxValue, currencyLocalId = 1033, properties) {
        let props = {
            CurrencyLocaleId: currencyLocalId,
            FieldTypeKind: 10,
        };
        if (typeof minValue !== "undefined") {
            props = Util.extend({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = Util.extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldCurrency", Util.extend(props, properties));
    }
    /**
     * Adds a new SP.FieldMultiLineText to the collection
     *
     * @param title The field title
     * @param numberOfLines Specifies the number of lines of text to display for the field.
     * @param richText Specifies whether the field supports rich formatting.
     * @param restrictedMode Specifies whether the field supports a subset of rich formatting.
     * @param appendOnly Specifies whether all changes to the value of the field are displayed in list forms.
     * @param allowHyperlink Specifies whether a hyperlink is allowed as a value of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     *
     */
    addMultilineText(title, numberOfLines = 6, richText = true, restrictedMode = false, appendOnly = false, allowHyperlink = true, properties) {
        const props = {
            AllowHyperlink: allowHyperlink,
            AppendOnly: appendOnly,
            FieldTypeKind: 3,
            NumberOfLines: numberOfLines,
            RestrictedMode: restrictedMode,
            RichText: richText,
        };
        return this.add(title, "SP.FieldMultiLineText", Util.extend(props, properties));
    }
    /**
     * Adds a new SP.FieldUrl to the collection
     *
     * @param title The field title
     */
    addUrl(title, displayFormat = UrlFieldFormatType.Hyperlink, properties) {
        const props = {
            DisplayFormat: displayFormat,
            FieldTypeKind: 11,
        };
        return this.add(title, "SP.FieldUrl", Util.extend(props, properties));
    }
}
/**
 * Describes a single of Field instance
 *
 */
class Field extends SharePointQueryableInstance {
    /**
     * Updates this field intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param fieldType The type value, required to update child field type properties
     */
    update(properties, fieldType = "SP.Field") {
        const postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": fieldType },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                data: data,
                field: this,
            };
        });
    }
    /**
     * Delete this fields
     *
     */
    delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    /**
     * Sets the value of the ShowInDisplayForm property for this field.
     */
    setShowInDisplayForm(show) {
        return this.clone(Field, `setshowindisplayform(${show})`).postCore();
    }
    /**
     * Sets the value of the ShowInEditForm property for this field.
     */
    setShowInEditForm(show) {
        return this.clone(Field, `setshowineditform(${show})`).postCore();
    }
    /**
     * Sets the value of the ShowInNewForm property for this field.
     */
    setShowInNewForm(show) {
        return this.clone(Field, `setshowinnewform(${show})`).postCore();
    }
}

/**
 * Describes a collection of Field objects
 *
 */
class Forms extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "forms") {
        super(baseUrl, path);
    }
    /**
     * Gets a form by id
     *
     * @param id The guid id of the item to retrieve
     */
    getById(id) {
        const i = new Form(this);
        i.concat(`('${id}')`);
        return i;
    }
}
/**
 * Describes a single of Form instance
 *
 */
class Form extends SharePointQueryableInstance {
}

/**
 * Describes a collection of webhook subscriptions
 *
 */
class Subscriptions extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Subscriptions class
     *
     * @param baseUrl - The url or SharePointQueryable which forms the parent of this webhook subscriptions collection
     */
    constructor(baseUrl, path = "subscriptions") {
        super(baseUrl, path);
    }
    /**
     * Returns all the webhook subscriptions or the specified webhook subscription
     *
     * @param subscriptionId The id of a specific webhook subscription to retrieve, omit to retrieve all the webhook subscriptions
     */
    getById(subscriptionId) {
        const subscription = new Subscription(this);
        subscription.concat(`('${subscriptionId}')`);
        return subscription;
    }
    /**
     * Creates a new webhook subscription
     *
     * @param notificationUrl The url to receive the notifications
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months)
     * @param clientState A client specific string (defaults to pnp-js-core-subscription when omitted)
     */
    add(notificationUrl, expirationDate, clientState) {
        const postBody = JSON.stringify({
            "clientState": clientState || "pnp-js-core-subscription",
            "expirationDateTime": expirationDate,
            "notificationUrl": notificationUrl,
            "resource": this.toUrl(),
        });
        return this.postCore({ body: postBody, headers: { "Content-Type": "application/json" } }).then(result => {
            return { data: result, subscription: this.getById(result.id) };
        });
    }
}
/**
 * Describes a single webhook subscription instance
 *
 */
class Subscription extends SharePointQueryableInstance {
    /**
     * Renews this webhook subscription
     *
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months)
     */
    update(expirationDate) {
        const postBody = JSON.stringify({
            "expirationDateTime": expirationDate,
        });
        return this.patchCore({ body: postBody, headers: { "Content-Type": "application/json" } }).then(data => {
            return { data: data, subscription: this };
        });
    }
    /**
     * Removes this webhook subscription
     *
     */
    delete() {
        return super.deleteCore();
    }
}

/**
 * Describes a collection of user custom actions
 *
 */
class UserCustomActions extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the UserCustomActions class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user custom actions collection
     */
    constructor(baseUrl, path = "usercustomactions") {
        super(baseUrl, path);
    }
    /**
     * Returns the user custom action with the specified id
     *
     * @param id The GUID id of the user custom action to retrieve
     */
    getById(id) {
        const uca = new UserCustomAction(this);
        uca.concat(`('${id}')`);
        return uca;
    }
    /**
     * Creates a user custom action
     *
     * @param properties The information object of property names and values which define the new user custom action
     *
     */
    add(properties) {
        const postBody = JSON.stringify(Util.extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
        return this.postCore({ body: postBody }).then((data) => {
            return {
                action: this.getById(data.Id),
                data: data,
            };
        });
    }
    /**
     * Deletes all user custom actions in the collection
     *
     */
    clear() {
        return this.clone(UserCustomActions, "clear").postCore();
    }
}
/**
 * Describes a single user custom action
 *
 */
class UserCustomAction extends SharePointQueryableInstance {
    /**
    * Updates this user custom action with the supplied properties
    *
    * @param properties An information object of property names and values to update for this user custom action
    */
    update(properties) {
        const postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": "SP.UserCustomAction" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                action: this,
                data: data,
            };
        });
    }
    /**
    * Removes this user custom action
    *
    */
    delete() {
        return super.deleteCore();
    }
}

/**
 * Describes a collection of List objects
 *
 */
class Lists extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "lists") {
        super(baseUrl, path);
    }
    /**
     * Gets a list from the collection by title
     *
     * @param title The title of the list
     */
    getByTitle(title) {
        return new List(this, `getByTitle('${title}')`);
    }
    /**
     * Gets a list from the collection by guid id
     *
     * @param id The Id of the list (GUID)
     */
    getById(id) {
        const list = new List(this);
        list.concat(`('${id}')`);
        return list;
    }
    /**
     * Adds a new list to the collection
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    add(title, description = "", template = 100, enableContentTypes = false, additionalSettings = {}) {
        const addSettings = Util.extend({
            "AllowContentTypes": enableContentTypes,
            "BaseTemplate": template,
            "ContentTypesEnabled": enableContentTypes,
            "Description": description,
            "Title": title,
            "__metadata": { "type": "SP.List" },
        }, additionalSettings);
        return this.postCore({ body: JSON.stringify(addSettings) }).then((data) => {
            return { data: data, list: this.getByTitle(addSettings.Title) };
        });
    }
    /**
     * Ensures that the specified list exists in the collection (note: this method not supported for batching)
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body or used to update an existing list
     */
    ensure(title, description = "", template = 100, enableContentTypes = false, additionalSettings = {}) {
        if (this.hasBatch) {
            throw new NotSupportedInBatchException("The ensure list method");
        }
        return new Promise((resolve, reject) => {
            const addOrUpdateSettings = Util.extend(additionalSettings, { Title: title, Description: description, ContentTypesEnabled: enableContentTypes }, true);
            const list = this.getByTitle(addOrUpdateSettings.Title);
            list.get().then(_ => {
                list.update(addOrUpdateSettings).then(d => {
                    resolve({ created: false, data: d, list: this.getByTitle(addOrUpdateSettings.Title) });
                }).catch(e => reject(e));
            }).catch(_ => {
                this.add(title, description, template, enableContentTypes, addOrUpdateSettings).then((r) => {
                    resolve({ created: true, data: r.data, list: this.getByTitle(addOrUpdateSettings.Title) });
                }).catch((e) => reject(e));
            });
        });
    }
    /**
     * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
     */
    ensureSiteAssetsLibrary() {
        return this.clone(Lists, "ensuresiteassetslibrary").postCore().then((json) => {
            return new List(spExtractODataId(json));
        });
    }
    /**
     * Gets a list that is the default location for wiki pages.
     */
    ensureSitePagesLibrary() {
        return this.clone(Lists, "ensuresitepageslibrary").postCore().then((json) => {
            return new List(spExtractODataId(json));
        });
    }
}
/**
 * Describes a single List instance
 *
 */
class List extends SharePointQueryableSecurable {
    /**
     * Gets the content types in this list
     *
     */
    get contentTypes() {
        return new ContentTypes(this);
    }
    /**
     * Gets the items in this list
     *
     */
    get items() {
        return new Items(this);
    }
    /**
     * Gets the views in this list
     *
     */
    get views() {
        return new Views(this);
    }
    /**
     * Gets the fields in this list
     *
     */
    get fields() {
        return new Fields(this);
    }
    /**
     * Gets the forms in this list
     *
     */
    get forms() {
        return new Forms(this);
    }
    /**
     * Gets the default view of this list
     *
     */
    get defaultView() {
        return new View(this, "DefaultView");
    }
    /**
     * Get all custom actions on a site collection
     *
     */
    get userCustomActions() {
        return new UserCustomActions(this);
    }
    /**
     * Gets the effective base permissions of this list
     *
     */
    get effectiveBasePermissions() {
        return new SharePointQueryable(this, "EffectiveBasePermissions");
    }
    /**
     * Gets the event receivers attached to this list
     *
     */
    get eventReceivers() {
        return new SharePointQueryableCollection(this, "EventReceivers");
    }
    /**
     * Gets the related fields of this list
     *
     */
    get relatedFields() {
        return new SharePointQueryable(this, "getRelatedFields");
    }
    /**
     * Gets the IRM settings for this list
     *
     */
    get informationRightsManagementSettings() {
        return new SharePointQueryable(this, "InformationRightsManagementSettings");
    }
    /**
     * Gets the webhook subscriptions of this list
     *
     */
    get subscriptions() {
        return new Subscriptions(this);
    }
    /**
     * The root folder of the list
     */
    get rootFolder() {
        return new Folder(this, "rootFolder");
    }
    /**
     * Gets a view by view guid id
     *
     */
    getView(viewId) {
        return new View(this, `getView('${viewId}')`);
    }
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    /* tslint:disable no-string-literal */
    update(properties, eTag = "*") {
        const postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": "SP.List" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            let retList = this;
            if (properties.hasOwnProperty("Title")) {
                retList = this.getParent(List, this.parentUrl, `getByTitle('${properties["Title"]}')`);
            }
            return {
                data: data,
                list: retList,
            };
        });
    }
    /* tslint:enable */
    /**
     * Delete this list
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag = "*") {
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     */
    getChanges(query) {
        return this.clone(List, "getchanges").postCore({
            body: JSON.stringify({ "query": Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) }),
        });
    }
    /**
     * Returns a collection of items from the list based on the specified query.
     *
     * @param CamlQuery The Query schema of Collaborative Application Markup
     * Language (CAML) is used in various ways within the context of Microsoft SharePoint Foundation
     * to define queries against list data.
     * see:
     *
     * https://msdn.microsoft.com/en-us/library/office/ms467521.aspx
     *
     * @param expands A URI with a $expand System Query Option indicates that Entries associated with
     * the Entry or Collection of Entries identified by the Resource Path
     * section of the URI must be represented inline (i.e. eagerly loaded).
     * see:
     *
     * https://msdn.microsoft.com/en-us/library/office/fp142385.aspx
     *
     * http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#ExpandSystemQueryOption
     */
    getItemsByCAMLQuery(query, ...expands) {
        const q = this.clone(List, "getitems");
        return q.expand.apply(q, expands).postCore({
            body: JSON.stringify({ "query": Util.extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) }),
        });
    }
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     */
    getListItemChangesSinceToken(query) {
        return this.clone(List, "getlistitemchangessincetoken").postCore({
            body: JSON.stringify({ "query": Util.extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) }),
        }, { parse(r) { return r.text(); } });
    }
    /**
     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle() {
        return this.clone(List, "recycle").postCore().then(data => {
            if (data.hasOwnProperty("Recycle")) {
                return data.Recycle;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Renders list data based on the view xml provided
     */
    renderListData(viewXml) {
        const q = this.clone(List, "renderlistdata(@viewXml)");
        q.query.add("@viewXml", `'${viewXml}'`);
        return q.postCore().then(data => {
            // data will be a string, so we parse it again
            data = JSON.parse(data);
            if (data.hasOwnProperty("RenderListData")) {
                return data.RenderListData;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Returns the data for the specified query view
     *
     * @param parameters The parameters to be used to render list data as JSON string.
     * @param overrideParameters The parameters that are used to override and extend the regular SPRenderListDataParameters.
     */
    renderListDataAsStream(parameters, overrideParameters = null) {
        const postBody = {
            overrideParameters: Util.extend({
                "__metadata": { "type": "SP.RenderListDataOverrideParameters" },
            }, overrideParameters),
            parameters: Util.extend({
                "__metadata": { "type": "SP.RenderListDataParameters" },
            }, parameters),
        };
        return this.clone(List, "RenderListDataAsStream", true).postCore({
            body: JSON.stringify(postBody),
        });
    }
    /**
     * Gets the field values and field schema attributes for a list item.
     */
    renderListFormData(itemId, formId, mode) {
        return this.clone(List, `renderlistformdata(itemid=${itemId}, formid='${formId}', mode='${mode}')`).postCore().then(data => {
            // data will be a string, so we parse it again
            data = JSON.parse(data);
            if (data.hasOwnProperty("ListData")) {
                return data.ListData;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Reserves a list item ID for idempotent list item creation.
     */
    reserveListItemId() {
        return this.clone(List, "reservelistitemid").postCore().then(data => {
            if (data.hasOwnProperty("ReserveListItemId")) {
                return data.ReserveListItemId;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Returns the ListItemEntityTypeFullName for this list, used when adding/updating list items. Does not support batching.
     *
     */
    getListItemEntityTypeFullName() {
        return this.clone(List, null, false).select("ListItemEntityTypeFullName").get().then(o => o.ListItemEntityTypeFullName);
    }
}

/**
 * Describes a collection of Item objects
 *
 */
class Items extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "items") {
        super(baseUrl, path);
    }
    /**
     * Gets an Item by id
     *
     * @param id The integer id of the item to retrieve
     */
    getById(id) {
        const i = new Item(this);
        i.concat(`(${id})`);
        return i;
    }
    /**
     * Gets BCS Item by string id
     *
     * @param stringId The string id of the BCS item to retrieve
     */
    getItemByStringId(stringId) {
        // creates an item with the parent list path and append out method call
        return new Item(this.parentUrl, `getItemByStringId('${stringId}')`);
    }
    /**
     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
     *
     * @param skip The starting id where the page should start, use with top to specify pages
     */
    skip(skip) {
        this._query.add("$skiptoken", encodeURIComponent(`Paged=TRUE&p_ID=${skip}`));
        return this;
    }
    /**
     * Gets a collection designed to aid in paging through data
     *
     */
    getPaged() {
        return this.get(new PagedItemCollectionParser());
    }
    //
    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     * @param listItemEntityTypeFullName The type name of the list's entities
     */
    add(properties = {}, listItemEntityTypeFullName = null) {
        const removeDependency = this.addBatchDependency();
        return this.ensureListItemEntityTypeName(listItemEntityTypeFullName).then(listItemEntityType => {
            const postBody = JSON.stringify(Util.extend({
                "__metadata": { "type": listItemEntityType },
            }, properties));
            const promise = this.clone(Items, null).postCore({ body: postBody }).then((data) => {
                return {
                    data: data,
                    item: this.getById(data.Id),
                };
            });
            removeDependency();
            return promise;
        });
    }
    /**
     * Ensures we have the proper list item entity type name, either from the value provided or from the list
     *
     * @param candidatelistItemEntityTypeFullName The potential type name
     */
    ensureListItemEntityTypeName(candidatelistItemEntityTypeFullName) {
        return candidatelistItemEntityTypeFullName ?
            Promise.resolve(candidatelistItemEntityTypeFullName) :
            this.getParent(List).getListItemEntityTypeFullName();
    }
}
/**
 * Descrines a single Item instance
 *
 */
class Item extends SharePointQueryableShareableItem {
    /**
     * Gets the set of attachments for this item
     *
     */
    get attachmentFiles() {
        return new AttachmentFiles(this);
    }
    /**
     * Gets the content type for this item
     *
     */
    get contentType() {
        return new ContentType(this, "ContentType");
    }
    /**
     * Gets the effective base permissions for the item
     *
     */
    get effectiveBasePermissions() {
        return new SharePointQueryable(this, "EffectiveBasePermissions");
    }
    /**
     * Gets the effective base permissions for the item in a UI context
     *
     */
    get effectiveBasePermissionsForUI() {
        return new SharePointQueryable(this, "EffectiveBasePermissionsForUI");
    }
    /**
     * Gets the field values for this list item in their HTML representation
     *
     */
    get fieldValuesAsHTML() {
        return new SharePointQueryableInstance(this, "FieldValuesAsHTML");
    }
    /**
     * Gets the field values for this list item in their text representation
     *
     */
    get fieldValuesAsText() {
        return new SharePointQueryableInstance(this, "FieldValuesAsText");
    }
    /**
     * Gets the field values for this list item for use in editing controls
     *
     */
    get fieldValuesForEdit() {
        return new SharePointQueryableInstance(this, "FieldValuesForEdit");
    }
    /**
     * Gets the folder associated with this list item (if this item represents a folder)
     *
     */
    get folder() {
        return new Folder(this, "folder");
    }
    /**
     * Gets the folder associated with this list item (if this item represents a folder)
     *
     */
    get file() {
        return new File(this, "file");
    }
    /**
     * Gets the collection of versions associated with this item
     */
    get versions() {
        return new ItemVersions(this);
    }
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     * @param listItemEntityTypeFullName The type name of the list's entities
     */
    update(properties, eTag = "*", listItemEntityTypeFullName = null) {
        return new Promise((resolve, reject) => {
            const removeDependency = this.addBatchDependency();
            return this.ensureListItemEntityTypeName(listItemEntityTypeFullName).then(listItemEntityType => {
                const postBody = JSON.stringify(Util.extend({
                    "__metadata": { "type": listItemEntityType },
                }, properties));
                removeDependency();
                return this.postCore({
                    body: postBody,
                    headers: {
                        "IF-Match": eTag,
                        "X-HTTP-Method": "MERGE",
                    },
                }, new ItemUpdatedParser()).then((data) => {
                    resolve({
                        data: data,
                        item: this,
                    });
                });
            }).catch(e => reject(e));
        });
    }
    /**
     * Delete this item
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag = "*") {
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    /**
     * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle() {
        return this.clone(Item, "recycle").postCore();
    }
    /**
     * Gets a string representation of the full URL to the WOPI frame.
     * If there is no associated WOPI application, or no associated action, an empty string is returned.
     *
     * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
     */
    getWopiFrameUrl(action = 0) {
        const i = this.clone(Item, "getWOPIFrameUrl(@action)");
        i._query.add("@action", action);
        return i.postCore().then((data) => {
            // handle verbose mode
            if (data.hasOwnProperty("GetWOPIFrameUrl")) {
                return data.GetWOPIFrameUrl;
            }
            return data;
        });
    }
    /**
     * Validates and sets the values of the specified collection of fields for the list item.
     *
     * @param formValues The fields to change and their new values.
     * @param newDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     */
    validateUpdateListItem(formValues, newDocumentUpdate = false) {
        return this.clone(Item, "validateupdatelistitem").postCore({
            body: JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate }),
        });
    }
    /**
     * Ensures we have the proper list item entity type name, either from the value provided or from the list
     *
     * @param candidatelistItemEntityTypeFullName The potential type name
     */
    ensureListItemEntityTypeName(candidatelistItemEntityTypeFullName) {
        return candidatelistItemEntityTypeFullName ?
            Promise.resolve(candidatelistItemEntityTypeFullName) :
            this.getParent(List, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/"))).getListItemEntityTypeFullName();
    }
}
/**
 * Describes a collection of Version objects
 *
 */
class ItemVersions extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "versions") {
        super(baseUrl, path);
    }
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    getById(versionId) {
        const v = new ItemVersion(this);
        v.concat(`(${versionId})`);
        return v;
    }
}
/**
 * Describes a single Version instance
 *
 */
class ItemVersion extends SharePointQueryableInstance {
    /**
    * Delete a specific version of a file.
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
}
/**
 * Provides paging functionality for list items
 */
class PagedItemCollection {
    constructor(nextUrl, results) {
        this.nextUrl = nextUrl;
        this.results = results;
    }
    /**
     * If true there are more results available in the set, otherwise there are not
     */
    get hasNext() {
        return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
    }
    /**
     * Gets the next set of results, or resolves to null if no results are available
     */
    getNext() {
        if (this.hasNext) {
            const items = new Items(this.nextUrl, null);
            return items.getPaged();
        }
        return new Promise(r => r(null));
    }
}
class PagedItemCollectionParser extends ODataParserBase {
    parse(r) {
        return new Promise((resolve, reject) => {
            if (this.handleError(r, reject)) {
                r.json().then(json => {
                    const nextUrl = json.hasOwnProperty("d") && json.d.hasOwnProperty("__next") ? json.d.__next : json["odata.nextLink"];
                    resolve(new PagedItemCollection(nextUrl, this.parseODataJSON(json)));
                });
            }
        });
    }
}
class ItemUpdatedParser extends ODataParserBase {
    parse(r) {
        return new Promise((resolve, reject) => {
            if (this.handleError(r, reject)) {
                resolve({
                    "odata.etag": r.headers.get("etag"),
                });
            }
        });
    }
}

/**
 * Describes a collection of File objects
 *
 */
class Files extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Files class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "files") {
        super(baseUrl, path);
    }
    /**
     * Gets a File by filename
     *
     * @param name The name of the file, including extension.
     */
    getByName(name) {
        const f = new File(this);
        f.concat(`('${name}')`);
        return f;
    }
    /**
     * Uploads a file. Not supported for batching
     *
     * @param url The folder-relative url of the file.
     * @param content The file contents blob.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
     * @returns The new File and the raw response.
     */
    add(url, content, shouldOverWrite = true) {
        return new Files(this, `add(overwrite=${shouldOverWrite},url='${url}')`)
            .postCore({
            body: content,
        }).then((response) => {
            return {
                data: response,
                file: this.getByName(url),
            };
        });
    }
    /**
     * Uploads a file. Not supported for batching
     *
     * @param url The folder-relative url of the file.
     * @param content The Blob file content to add
     * @param progress A callback function which can be used to track the progress of the upload
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
     * @returns The new File and the raw response.
     */
    addChunked(url, content, progress, shouldOverWrite = true, chunkSize = 10485760) {
        const adder = this.clone(Files, `add(overwrite=${shouldOverWrite},url='${url}')`, false);
        return adder.postCore().then(() => this.getByName(url)).then(file => file.setContentChunked(content, progress, chunkSize)).then((response) => {
            return {
                data: response,
                file: this.getByName(url),
            };
        });
    }
    /**
     * Adds a ghosted file to an existing list or document library. Not supported for batching.
     *
     * @param fileUrl The server-relative url where you want to save the file.
     * @param templateFileType The type of use to create the file.
     * @returns The template file that was added and the raw response.
     */
    addTemplateFile(fileUrl, templateFileType) {
        return this.clone(Files, `addTemplateFile(urloffile='${fileUrl}',templatefiletype=${templateFileType})`, false)
            .postCore().then((response) => {
            return {
                data: response,
                file: this.getByName(fileUrl),
            };
        });
    }
}
/**
 * Describes a single File instance
 *
 */
class File extends SharePointQueryableShareableFile {
    /**
     * Gets a value that specifies the list item field values for the list item corresponding to the file.
     *
     */
    get listItemAllFields() {
        return new SharePointQueryableCollection(this, "listItemAllFields");
    }
    /**
     * Gets a collection of versions
     *
     */
    get versions() {
        return new Versions(this);
    }
    /**
     * Approves the file submitted for content approval with the specified comment.
     * Only documents in lists that are enabled for content approval can be approved.
     *
     * @param comment The comment for the approval.
     */
    approve(comment = "") {
        return this.clone(File, `approve(comment='${comment}')`).postCore();
    }
    /**
     * Stops the chunk upload session without saving the uploaded data. Does not support batching.
     * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
     * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     */
    cancelUpload(uploadId) {
        return this.clone(File, `cancelUpload(uploadId=guid'${uploadId}')`, false).postCore();
    }
    /**
     * Checks the file in to a document library based on the check-in type.
     *
     * @param comment A comment for the check-in. Its length must be <= 1023.
     * @param checkinType The check-in type for the file.
     */
    checkin(comment = "", checkinType = CheckinType.Major) {
        if (comment.length > 1023) {
            throw new MaxCommentLengthException();
        }
        return this.clone(File, `checkin(comment='${comment}',checkintype=${checkinType})`).postCore();
    }
    /**
     * Checks out the file from a document library.
     */
    checkout() {
        return this.clone(File, "checkout").postCore();
    }
    /**
     * Copies the file to the destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to copy to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     */
    copyTo(url, shouldOverWrite = true) {
        return this.clone(File, `copyTo(strnewurl='${url}',boverwrite=${shouldOverWrite})`).postCore();
    }
    /**
     * Delete this file.
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag = "*") {
        return this.clone(File, null).postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    /**
     * Denies approval for a file that was submitted for content approval.
     * Only documents in lists that are enabled for content approval can be denied.
     *
     * @param comment The comment for the denial.
     */
    deny(comment = "") {
        if (comment.length > 1023) {
            throw new MaxCommentLengthException();
        }
        return this.clone(File, `deny(comment='${comment}')`).postCore();
    }
    /**
     * Specifies the control set used to access, modify, or add Web Parts associated with this Web Part Page and view.
     * An exception is thrown if the file is not an ASPX page.
     *
     * @param scope The WebPartsPersonalizationScope view on the Web Parts page.
     */
    getLimitedWebPartManager(scope = WebPartsPersonalizationScope.Shared) {
        return new LimitedWebPartManager(this, `getLimitedWebPartManager(scope=${scope})`);
    }
    /**
     * Moves the file to the specified destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to move to.
     * @param moveOperations The bitwise MoveOperations value for how to move the file.
     */
    moveTo(url, moveOperations = MoveOperations.Overwrite) {
        return this.clone(File, `moveTo(newurl='${url}',flags=${moveOperations})`).postCore();
    }
    /**
     * Submits the file for content approval with the specified comment.
     *
     * @param comment The comment for the published file. Its length must be <= 1023.
     */
    publish(comment = "") {
        if (comment.length > 1023) {
            throw new MaxCommentLengthException();
        }
        return this.clone(File, `publish(comment='${comment}')`).postCore();
    }
    /**
     * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     *
     * @returns The GUID of the recycled file.
     */
    recycle() {
        return this.clone(File, "recycle").postCore();
    }
    /**
     * Reverts an existing checkout for the file.
     *
     */
    undoCheckout() {
        return this.clone(File, "undoCheckout").postCore();
    }
    /**
     * Removes the file from content approval or unpublish a major version.
     *
     * @param comment The comment for the unpublish operation. Its length must be <= 1023.
     */
    unpublish(comment = "") {
        if (comment.length > 1023) {
            throw new MaxCommentLengthException();
        }
        return this.clone(File, `unpublish(comment='${comment}')`).postCore();
    }
    /**
     * Gets the contents of the file as text. Not supported in batching.
     *
     */
    getText() {
        return this.clone(File, "$value", false).get(new TextParser(), { headers: { "binaryStringResponseBody": "true" } });
    }
    /**
     * Gets the contents of the file as a blob, does not work in Node.js. Not supported in batching.
     *
     */
    getBlob() {
        return this.clone(File, "$value", false).get(new BlobParser(), { headers: { "binaryStringResponseBody": "true" } });
    }
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    getBuffer() {
        return this.clone(File, "$value", false).get(new BufferParser(), { headers: { "binaryStringResponseBody": "true" } });
    }
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    getJSON() {
        return this.clone(File, "$value", false).get(new JSONParser(), { headers: { "binaryStringResponseBody": "true" } });
    }
    /**
     * Sets the content of a file, for large files use setContentChunked. Not supported in batching.
     *
     * @param content The file content
     *
     */
    setContent(content) {
        return this.clone(File, "$value", false).postCore({
            body: content,
            headers: {
                "X-HTTP-Method": "PUT",
            },
        }).then(_ => new File(this));
    }
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    getItem(...selects) {
        const q = this.listItemAllFields;
        return q.select.apply(q, selects).get().then((d) => {
            return Util.extend(new Item(spGetEntityUrl(d)), d);
        });
    }
    /**
     * Sets the contents of a file using a chunked upload approach. Not supported in batching.
     *
     * @param file The file to upload
     * @param progress A callback function which can be used to track the progress of the upload
     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
     */
    setContentChunked(file, progress, chunkSize = 10485760) {
        if (typeof progress === "undefined") {
            progress = () => null;
        }
        const self = this;
        const fileSize = file.size;
        const blockCount = parseInt((file.size / chunkSize).toString(), 10) + ((file.size % chunkSize === 0) ? 1 : 0);
        const uploadId = Util.getGUID();
        // start the chain with the first fragment
        progress({ blockNumber: 1, chunkSize: chunkSize, currentPointer: 0, fileSize: fileSize, stage: "starting", totalBlocks: blockCount });
        let chain = self.startUpload(uploadId, file.slice(0, chunkSize));
        // skip the first and last blocks
        for (let i = 2; i < blockCount; i++) {
            chain = chain.then(pointer => {
                progress({ blockNumber: i, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "continue", totalBlocks: blockCount });
                return self.continueUpload(uploadId, pointer, file.slice(pointer, pointer + chunkSize));
            });
        }
        return chain.then(pointer => {
            progress({ blockNumber: blockCount, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "finishing", totalBlocks: blockCount });
            return self.finishUpload(uploadId, pointer, file.slice(pointer));
        }).then(_ => {
            return self;
        });
    }
    /**
     * Starts a new chunk upload session and uploads the first fragment.
     * The current file content is not changed when this method completes.
     * The method is idempotent (and therefore does not change the result) as long as you use the same values for uploadId and stream.
     * The upload session ends either when you use the CancelUpload method or when you successfully
     * complete the upload session by passing the rest of the file contents through the ContinueUpload and FinishUpload methods.
     * The StartUpload and ContinueUpload methods return the size of the running total of uploaded data in bytes,
     * so you can pass those return values to subsequent uses of ContinueUpload and FinishUpload.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    startUpload(uploadId, fragment) {
        return this.clone(File, `startUpload(uploadId=guid'${uploadId}')`, false).postCore({ body: fragment }).then(n => parseFloat(n));
    }
    /**
     * Continues the chunk upload session with an additional fragment.
     * The current file content is not changed.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    continueUpload(uploadId, fileOffset, fragment) {
        return this.clone(File, `continueUpload(uploadId=guid'${uploadId}',fileOffset=${fileOffset})`, false).postCore({ body: fragment }).then(n => parseFloat(n));
    }
    /**
     * Uploads the last file fragment and commits the file. The current file content is changed when this method completes.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The newly uploaded file.
     */
    finishUpload(uploadId, fileOffset, fragment) {
        return this.clone(File, `finishUpload(uploadId=guid'${uploadId}',fileOffset=${fileOffset})`, false)
            .postCore({ body: fragment }).then((response) => {
            return {
                data: response,
                file: new File(response.ServerRelativeUrl),
            };
        });
    }
}
/**
 * Describes a collection of Version objects
 *
 */
class Versions extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "versions") {
        super(baseUrl, path);
    }
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    getById(versionId) {
        const v = new Version(this);
        v.concat(`(${versionId})`);
        return v;
    }
    /**
     * Deletes all the file version objects in the collection.
     *
     */
    deleteAll() {
        return new Versions(this, "deleteAll").postCore();
    }
    /**
     * Deletes the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    deleteById(versionId) {
        return this.clone(Versions, `deleteById(vid=${versionId})`).postCore();
    }
    /**
     * Recycles the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    recycleByID(versionId) {
        return this.clone(Versions, `recycleByID(vid=${versionId})`).postCore();
    }
    /**
     * Deletes the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    deleteByLabel(label) {
        return this.clone(Versions, `deleteByLabel(versionlabel='${label}')`).postCore();
    }
    /**
     * Recycles the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    recycleByLabel(label) {
        return this.clone(Versions, `recycleByLabel(versionlabel='${label}')`).postCore();
    }
    /**
     * Creates a new file version from the file specified by the version label.
     *
     * @param label The version label of the file version to restore, for example: 1.2
     */
    restoreByLabel(label) {
        return this.clone(Versions, `restoreByLabel(versionlabel='${label}')`).postCore();
    }
}
/**
 * Describes a single Version instance
 *
 */
class Version extends SharePointQueryableInstance {
    /**
    * Delete a specific version of a file.
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    delete(eTag = "*") {
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
}
var CheckinType;
(function (CheckinType) {
    CheckinType[CheckinType["Minor"] = 0] = "Minor";
    CheckinType[CheckinType["Major"] = 1] = "Major";
    CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
})(CheckinType || (CheckinType = {}));
var WebPartsPersonalizationScope;
(function (WebPartsPersonalizationScope) {
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
})(WebPartsPersonalizationScope || (WebPartsPersonalizationScope = {}));
var MoveOperations;
(function (MoveOperations) {
    MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
    MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
})(MoveOperations || (MoveOperations = {}));
var TemplateFileType;
(function (TemplateFileType) {
    TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
    TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
    TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
})(TemplateFileType || (TemplateFileType = {}));

/**
 * Represents an app catalog
 */
class AppCatalog extends SharePointQueryableCollection {
    constructor(baseUrl, path = "_api/web/tenantappcatalog/AvailableApps") {
        // we need to handle the case of getting created from something that already has "_api/..." or does not
        let candidateUrl = "";
        if (typeof baseUrl === "string") {
            candidateUrl = baseUrl;
        }
        else if (typeof baseUrl !== "undefined") {
            candidateUrl = baseUrl.toUrl();
        }
        super(extractWebUrl(candidateUrl), path);
    }
    /**
     * Get details of specific app from the app catalog
     * @param id - Specify the guid of the app
     */
    getAppById(id) {
        return new App(this, `getById('${id}')`);
    }
    /**
     * Uploads an app package. Not supported for batching
     *
     * @param filename Filename to create.
     * @param content app package data (eg: the .app or .sppkg file).
     * @param shouldOverWrite Should an app with the same name in the same location be overwritten? (default: true)
     * @returns Promise<AppAddResult>
     */
    add(filename, content, shouldOverWrite = true) {
        // you don't add to the availableapps collection
        const adder = new AppCatalog(extractWebUrl(this.toUrl()), `_api/web/tenantappcatalog/add(overwrite=${shouldOverWrite},url='${filename}')`);
        return adder.postCore({
            body: content,
        }).then(r => {
            return {
                data: r,
                file: new File(spExtractODataId(r)),
            };
        });
    }
}
/**
 * Represents the actions you can preform on a given app within the catalog
 */
class App extends SharePointQueryableInstance {
    /**
     * This method deploys an app on the app catalog.  It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    deploy() {
        return this.clone(App, "Deploy").postCore();
    }
    /**
     * This method retracts a deployed app on the app catalog.  It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    retract() {
        return this.clone(App, "Retract").postCore();
    }
    /**
     * This method allows an app which is already deployed to be installed on a web
     */
    install() {
        return this.clone(App, "Install").postCore();
    }
    /**
     * This method allows an app which is already insatlled to be uninstalled on a web
     */
    uninstall() {
        return this.clone(App, "Uninstall").postCore();
    }
    /**
     * This method allows an app which is already insatlled to be upgraded on a web
     */
    upgrade() {
        return this.clone(App, "Upgrade").postCore();
    }
    /**
     * This method removes an app from the app catalog.  It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    remove() {
        return this.clone(App, "Remove").postCore();
    }
}

/**
 * Represents a collection of navigation nodes
 *
 */
class NavigationNodes extends SharePointQueryableCollection {
    /**
     * Gets a navigation node by id
     *
     * @param id The id of the node
     */
    getById(id) {
        const node = new NavigationNode(this);
        node.concat(`(${id})`);
        return node;
    }
    /**
     * Adds a new node to the collection
     *
     * @param title Display name of the node
     * @param url The url of the node
     * @param visible If true the node is visible, otherwise it is hidden (default: true)
     */
    add(title, url, visible = true) {
        const postBody = JSON.stringify({
            IsVisible: visible,
            Title: title,
            Url: url,
            "__metadata": { "type": "SP.NavigationNode" },
        });
        return this.clone(NavigationNodes, null).postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                node: this.getById(data.Id),
            };
        });
    }
    /**
     * Moves a node to be after another node in the navigation
     *
     * @param nodeId Id of the node to move
     * @param previousNodeId Id of the node after which we move the node specified by nodeId
     */
    moveAfter(nodeId, previousNodeId) {
        const postBody = JSON.stringify({
            nodeId: nodeId,
            previousNodeId: previousNodeId,
        });
        return this.clone(NavigationNodes, "MoveAfter").postCore({ body: postBody });
    }
}
/**
 * Represents an instance of a navigation node
 *
 */
class NavigationNode extends SharePointQueryableInstance {
    /**
     * Represents the child nodes of this node
     */
    get children() {
        return new NavigationNodes(this, "Children");
    }
    /**
     * Deletes this node and any child nodes
     */
    delete() {
        return super.deleteCore();
    }
}
/**
 * Exposes the navigation components
 *
 */
class Navigation extends SharePointQueryable {
    /**
     * Creates a new instance of the Navigation class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of these navigation components
     */
    constructor(baseUrl, path = "navigation") {
        super(baseUrl, path);
    }
    /**
     * Gets the quicklaunch navigation nodes for the current context
     *
     */
    get quicklaunch() {
        return new NavigationNodes(this, "quicklaunch");
    }
    /**
     * Gets the top bar navigation nodes for the current context
     *
     */
    get topNavigationBar() {
        return new NavigationNodes(this, "topnavigationbar");
    }
}
/**
 * Represents the top level navigation service
 */
class NavigationService extends SharePointQueryable {
    constructor(path = null) {
        super("_api/navigation", path);
    }
    /**
     * The MenuState service operation returns a Menu-State (dump) of a SiteMapProvider on a site.
     *
     * @param menuNodeKey MenuNode.Key of the start node within the SiteMapProvider If no key is provided the SiteMapProvider.RootNode will be the root of the menu state.
     * @param depth Depth of the dump. If no value is provided a dump with the depth of 10 is returned
     * @param mapProviderName The name identifying the SiteMapProvider to be used
     * @param customProperties comma seperated list of custom properties to be returned.
     */
    getMenuState(menuNodeKey = null, depth = 10, mapProviderName = null, customProperties = null) {
        return (new NavigationService("MenuState")).postCore({
            body: JSON.stringify({
                customProperties: customProperties,
                depth: depth,
                mapProviderName: mapProviderName,
                menuNodeKey: menuNodeKey,
            }),
        });
    }
    /**
     * Tries to get a SiteMapNode.Key for a given URL within a site collection.
     *
     * @param currentUrl A url representing the SiteMapNode
     * @param mapProviderName The name identifying the SiteMapProvider to be used
     */
    getMenuNodeKey(currentUrl, mapProviderName = null) {
        return (new NavigationService("MenuNodeKey")).postCore({
            body: JSON.stringify({
                currentUrl: currentUrl,
                mapProviderName: mapProviderName,
            }),
        });
    }
}

/**
 * Allows for the fluent construction of search queries
 */
class SearchQueryBuilder {
    constructor(queryText = "", _query = {}) {
        this._query = _query;
        if (typeof queryText === "string" && queryText.length > 0) {
            this.extendQuery({ Querytext: queryText });
        }
    }
    static create(queryText = "", queryTemplate = {}) {
        return new SearchQueryBuilder(queryText, queryTemplate);
    }
    text(queryText) {
        return this.extendQuery({ Querytext: queryText });
    }
    template(template) {
        return this.extendQuery({ QueryTemplate: template });
    }
    sourceId(id) {
        return this.extendQuery({ SourceId: id });
    }
    get enableInterleaving() {
        return this.extendQuery({ EnableInterleaving: true });
    }
    get enableStemming() {
        return this.extendQuery({ EnableStemming: true });
    }
    get trimDuplicates() {
        return this.extendQuery({ TrimDuplicates: true });
    }
    trimDuplicatesIncludeId(n) {
        return this.extendQuery({ TrimDuplicatesIncludeId: n });
    }
    get enableNicknames() {
        return this.extendQuery({ EnableNicknames: true });
    }
    get enableFql() {
        return this.extendQuery({ EnableFQL: true });
    }
    get enablePhonetic() {
        return this.extendQuery({ EnablePhonetic: true });
    }
    get bypassResultTypes() {
        return this.extendQuery({ BypassResultTypes: true });
    }
    get processBestBets() {
        return this.extendQuery({ ProcessBestBets: true });
    }
    get enableQueryRules() {
        return this.extendQuery({ EnableQueryRules: true });
    }
    get enableSorting() {
        return this.extendQuery({ EnableSorting: true });
    }
    get generateBlockRankLog() {
        return this.extendQuery({ GenerateBlockRankLog: true });
    }
    rankingModelId(id) {
        return this.extendQuery({ RankingModelId: id });
    }
    startRow(n) {
        return this.extendQuery({ StartRow: n });
    }
    rowLimit(n) {
        return this.extendQuery({ RowLimit: n });
    }
    rowsPerPage(n) {
        return this.extendQuery({ RowsPerPage: n });
    }
    selectProperties(...properties) {
        return this.extendQuery({ SelectProperties: properties });
    }
    culture(culture) {
        return this.extendQuery({ Culture: culture });
    }
    timeZoneId(id) {
        return this.extendQuery({ TimeZoneId: id });
    }
    refinementFilters(...filters) {
        return this.extendQuery({ RefinementFilters: filters });
    }
    refiners(refiners) {
        return this.extendQuery({ Refiners: refiners });
    }
    hiddenConstraints(constraints) {
        return this.extendQuery({ HiddenConstraints: constraints });
    }
    sortList(...sorts) {
        return this.extendQuery({ SortList: sorts });
    }
    timeout(milliseconds) {
        return this.extendQuery({ Timeout: milliseconds });
    }
    hithighlightedProperties(...properties) {
        return this.extendQuery({ HitHighlightedProperties: properties });
    }
    clientType(clientType) {
        return this.extendQuery({ ClientType: clientType });
    }
    personalizationData(data) {
        return this.extendQuery({ PersonalizationData: data });
    }
    resultsURL(url) {
        return this.extendQuery({ ResultsUrl: url });
    }
    queryTag(...tags) {
        return this.extendQuery({ QueryTag: tags });
    }
    properties(...properties) {
        return this.extendQuery({ Properties: properties });
    }
    get processPersonalFavorites() {
        return this.extendQuery({ ProcessPersonalFavorites: true });
    }
    queryTemplatePropertiesUrl(url) {
        return this.extendQuery({ QueryTemplatePropertiesUrl: url });
    }
    reorderingRules(...rules) {
        return this.extendQuery({ ReorderingRules: rules });
    }
    hitHighlightedMultivaluePropertyLimit(limit) {
        return this.extendQuery({ HitHighlightedMultivaluePropertyLimit: limit });
    }
    get enableOrderingHitHighlightedProperty() {
        return this.extendQuery({ EnableOrderingHitHighlightedProperty: true });
    }
    collapseSpecification(spec) {
        return this.extendQuery({ CollapseSpecification: spec });
    }
    uiLanguage(lang) {
        return this.extendQuery({ UILanguage: lang });
    }
    desiredSnippetLength(len) {
        return this.extendQuery({ DesiredSnippetLength: len });
    }
    maxSnippetLength(len) {
        return this.extendQuery({ MaxSnippetLength: len });
    }
    summaryLength(len) {
        return this.extendQuery({ SummaryLength: len });
    }
    toSearchQuery() {
        return this._query;
    }
    extendQuery(part) {
        this._query = Util.extend(this._query, part);
        return this;
    }
}
/**
 * Describes the search API
 *
 */
class Search extends SharePointQueryableInstance {
    /**
     * Creates a new instance of the Search class
     *
     * @param baseUrl The url for the search context
     * @param query The SearchQuery object to execute
     */
    constructor(baseUrl, path = "_api/search/postquery") {
        super(baseUrl, path);
    }
    /**
     * .......
     * @returns Promise
     */
    execute(query) {
        let formattedBody;
        formattedBody = query;
        if (formattedBody.SelectProperties) {
            formattedBody.SelectProperties = this.fixupProp(query.SelectProperties);
        }
        if (formattedBody.RefinementFilters) {
            formattedBody.RefinementFilters = this.fixupProp(query.RefinementFilters);
        }
        if (formattedBody.SortList) {
            formattedBody.SortList = this.fixupProp(query.SortList);
        }
        if (formattedBody.HithighlightedProperties) {
            formattedBody.HithighlightedProperties = this.fixupProp(query.HitHighlightedProperties);
        }
        if (formattedBody.ReorderingRules) {
            formattedBody.ReorderingRules = this.fixupProp(query.ReorderingRules);
        }
        if (formattedBody.Properties) {
            formattedBody.Properties = this.fixupProp(query.Properties);
        }
        const postBody = JSON.stringify({
            request: Util.extend({
                "__metadata": { "type": "Microsoft.Office.Server.Search.REST.SearchRequest" },
            }, formattedBody),
        });
        return this.postCore({ body: postBody }).then((data) => new SearchResults(data, this.toUrl(), query));
    }
    /**
     * Fixes up properties that expect to consist of a "results" collection when needed
     *
     * @param prop property to fixup for container struct
     */
    fixupProp(prop) {
        if (prop.hasOwnProperty("results")) {
            return prop;
        }
        return { results: prop };
    }
}
/**
 * Describes the SearchResults class, which returns the formatted and raw version of the query response
 */
class SearchResults {
    /**
     * Creates a new instance of the SearchResult class
     *
     */
    constructor(rawResponse, _url, _query, _raw = null, _primary = null) {
        this._url = _url;
        this._query = _query;
        this._raw = _raw;
        this._primary = _primary;
        this._raw = rawResponse.postquery ? rawResponse.postquery : rawResponse;
    }
    get ElapsedTime() {
        return this.RawSearchResults.ElapsedTime;
    }
    get RowCount() {
        return this.RawSearchResults.PrimaryQueryResult.RelevantResults.RowCount;
    }
    get TotalRows() {
        return this.RawSearchResults.PrimaryQueryResult.RelevantResults.TotalRows;
    }
    get TotalRowsIncludingDuplicates() {
        return this.RawSearchResults.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates;
    }
    get RawSearchResults() {
        return this._raw;
    }
    get PrimarySearchResults() {
        if (this._primary === null) {
            this._primary = this.formatSearchResults(this._raw.PrimaryQueryResult.RelevantResults.Table.Rows);
        }
        return this._primary;
    }
    /**
     * Gets a page of results
     *
     * @param pageNumber Index of the page to return. Used to determine StartRow
     * @param pageSize Optional, items per page (default = 10)
     */
    getPage(pageNumber, pageSize) {
        // if we got all the available rows we don't have another page
        if (this.TotalRows < this.RowCount) {
            return Promise.resolve(null);
        }
        // if pageSize is supplied, then we use that regardless of any previous values
        // otherwise get the previous RowLimit or default to 10
        const rows = typeof pageSize !== "undefined" ? pageSize : this._query.hasOwnProperty("RowLimit") ? this._query.RowLimit : 10;
        const query = Util.extend(this._query, {
            RowLimit: rows,
            StartRow: rows * (pageNumber - 1),
        });
        // we have reached the end
        if (query.StartRow > this.TotalRows) {
            return Promise.resolve(null);
        }
        const search = new Search(this._url, null);
        return search.execute(query);
    }
    /**
     * Formats a search results array
     *
     * @param rawResults The array to process
     */
    formatSearchResults(rawResults) {
        const results = new Array();
        const tempResults = rawResults.results ? rawResults.results : rawResults;
        for (const tempResult of tempResults) {
            const cells = tempResult.Cells.results ? tempResult.Cells.results : tempResult.Cells;
            results.push(cells.reduce((res, cell) => {
                Object.defineProperty(res, cell.Key, {
                    configurable: false,
                    enumerable: false,
                    value: cell.Value,
                    writable: false,
                });
                return res;
            }, {}));
        }
        return results;
    }
}
/**
 * defines the SortDirection enum
 */
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
    SortDirection[SortDirection["Descending"] = 1] = "Descending";
    SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
})(SortDirection || (SortDirection = {}));
/**
 * defines the ReorderingRuleMatchType  enum
 */
var ReorderingRuleMatchType;
(function (ReorderingRuleMatchType) {
    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultContainsKeyword"] = 0] = "ResultContainsKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleContainsKeyword"] = 1] = "TitleContainsKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleMatchesKeyword"] = 2] = "TitleMatchesKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlStartsWith"] = 3] = "UrlStartsWith";
    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlExactlyMatches"] = 4] = "UrlExactlyMatches";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ContentTypeIs"] = 5] = "ContentTypeIs";
    ReorderingRuleMatchType[ReorderingRuleMatchType["FileExtensionMatches"] = 6] = "FileExtensionMatches";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultHasTag"] = 7] = "ResultHasTag";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ManualCondition"] = 8] = "ManualCondition";
})(ReorderingRuleMatchType || (ReorderingRuleMatchType = {}));
/**
 * Specifies the type value for the property
 */
var QueryPropertyValueType;
(function (QueryPropertyValueType) {
    QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
    QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
    QueryPropertyValueType[QueryPropertyValueType["Int32TYpe"] = 2] = "Int32TYpe";
    QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
    QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
    QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
})(QueryPropertyValueType || (QueryPropertyValueType = {}));
class SearchBuiltInSourceId {
}
SearchBuiltInSourceId.Documents = "e7ec8cee-ded8-43c9-beb5-436b54b31e84";
SearchBuiltInSourceId.ItemsMatchingContentType = "5dc9f503-801e-4ced-8a2c-5d1237132419";
SearchBuiltInSourceId.ItemsMatchingTag = "e1327b9c-2b8c-4b23-99c9-3730cb29c3f7";
SearchBuiltInSourceId.ItemsRelatedToCurrentUser = "48fec42e-4a92-48ce-8363-c2703a40e67d";
SearchBuiltInSourceId.ItemsWithSameKeywordAsThisItem = "5c069288-1d17-454a-8ac6-9c642a065f48";
SearchBuiltInSourceId.LocalPeopleResults = "b09a7990-05ea-4af9-81ef-edfab16c4e31";
SearchBuiltInSourceId.LocalReportsAndDataResults = "203fba36-2763-4060-9931-911ac8c0583b";
SearchBuiltInSourceId.LocalSharePointResults = "8413cd39-2156-4e00-b54d-11efd9abdb89";
SearchBuiltInSourceId.LocalVideoResults = "78b793ce-7956-4669-aa3b-451fc5defebf";
SearchBuiltInSourceId.Pages = "5e34578e-4d08-4edc-8bf3-002acf3cdbcc";
SearchBuiltInSourceId.Pictures = "38403c8c-3975-41a8-826e-717f2d41568a";
SearchBuiltInSourceId.Popular = "97c71db1-58ce-4891-8b64-585bc2326c12";
SearchBuiltInSourceId.RecentlyChangedItems = "ba63bbae-fa9c-42c0-b027-9a878f16557c";
SearchBuiltInSourceId.RecommendedItems = "ec675252-14fa-4fbe-84dd-8d098ed74181";
SearchBuiltInSourceId.Wiki = "9479bf85-e257-4318-b5a8-81a180f5faa1";

class SearchSuggest extends SharePointQueryableInstance {
    constructor(baseUrl, path = "_api/search/suggest") {
        super(baseUrl, path);
    }
    execute(query) {
        this.mapQueryToQueryString(query);
        return this.get().then(response => new SearchSuggestResult(response));
    }
    mapQueryToQueryString(query) {
        this.query.add("querytext", `'${query.querytext}'`);
        if (query.hasOwnProperty("count")) {
            this.query.add("inumberofquerysuggestions", query.count.toString());
        }
        if (query.hasOwnProperty("personalCount")) {
            this.query.add("inumberofresultsuggestions", query.personalCount.toString());
        }
        if (query.hasOwnProperty("preQuery")) {
            this.query.add("fprequerysuggestions", query.preQuery.toString());
        }
        if (query.hasOwnProperty("hitHighlighting")) {
            this.query.add("fhithighlighting", query.hitHighlighting.toString());
        }
        if (query.hasOwnProperty("capitalize")) {
            this.query.add("fcapitalizefirstletters", query.capitalize.toString());
        }
        if (query.hasOwnProperty("culture")) {
            this.query.add("culture", query.culture.toString());
        }
        if (query.hasOwnProperty("stemming")) {
            this.query.add("enablestemming", query.stemming.toString());
        }
        if (query.hasOwnProperty("includePeople")) {
            this.query.add("showpeoplenamesuggestions", query.includePeople.toString());
        }
        if (query.hasOwnProperty("queryRules")) {
            this.query.add("enablequeryrules", query.queryRules.toString());
        }
        if (query.hasOwnProperty("prefixMatch")) {
            this.query.add("fprefixmatchallterms", query.prefixMatch.toString());
        }
    }
}
class SearchSuggestResult {
    constructor(json) {
        if (json.hasOwnProperty("suggest")) {
            // verbose
            this.PeopleNames = json.suggest.PeopleNames.results;
            this.PersonalResults = json.suggest.PersonalResults.results;
            this.Queries = json.suggest.Queries.results;
        }
        else {
            this.PeopleNames = json.PeopleNames;
            this.PersonalResults = json.PersonalResults;
            this.Queries = json.Queries;
        }
    }
}

/**
 * Manages a batch of OData operations
 */
class SPBatch extends ODataBatch {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
    }
    /**
     * Parses the response from a batch request into an array of Response instances
     *
     * @param body Text body of the response from the batch request
     */
    static ParseResponse(body) {
        return new Promise((resolve, reject) => {
            const responses = [];
            const header = "--batchresponse_";
            // Ex. "HTTP/1.1 500 Internal Server Error"
            const statusRegExp = new RegExp("^HTTP/[0-9.]+ +([0-9]+) +(.*)", "i");
            const lines = body.split("\n");
            let state = "batch";
            let status;
            let statusText;
            for (let i = 0; i < lines.length; ++i) {
                const line = lines[i];
                switch (state) {
                    case "batch":
                        if (line.substr(0, header.length) === header) {
                            state = "batchHeaders";
                        }
                        else {
                            if (line.trim() !== "") {
                                throw new SPBatchParseException(`Invalid response, line ${i}`);
                            }
                        }
                        break;
                    case "batchHeaders":
                        if (line.trim() === "") {
                            state = "status";
                        }
                        break;
                    case "status":
                        const parts = statusRegExp.exec(line);
                        if (parts.length !== 3) {
                            throw new SPBatchParseException(`Invalid status, line ${i}`);
                        }
                        status = parseInt(parts[1], 10);
                        statusText = parts[2];
                        state = "statusHeaders";
                        break;
                    case "statusHeaders":
                        if (line.trim() === "") {
                            state = "body";
                        }
                        break;
                    case "body":
                        responses.push((status === 204) ? new Response() : new Response(line, { status: status, statusText: statusText }));
                        state = "batch";
                        break;
                }
            }
            if (state !== "status") {
                reject(new SPBatchParseException("Unexpected end of input"));
            }
            resolve(responses);
        });
    }
    executeImpl() {
        Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Executing batch with ${this.requests.length} requests.`, 1 /* Info */);
        // if we don't have any requests, don't bother sending anything
        // this could be due to caching further upstream, or just an empty batch
        if (this.requests.length < 1) {
            Logger.write(`Resolving empty batch.`, 1 /* Info */);
            return Promise.resolve();
        }
        // creating the client here allows the url to be populated for nodejs client as well as potentially
        // any other hacks needed for other types of clients. Essentially allows the absoluteRequestUrl
        // below to be correct
        const client = new SPHttpClient();
        // due to timing we need to get the absolute url here so we can use it for all the individual requests
        // and for sending the entire batch
        return toAbsoluteUrl(this.baseUrl).then(absoluteRequestUrl => {
            // build all the requests, send them, pipe results in order to parsers
            const batchBody = [];
            let currentChangeSetId = "";
            for (let i = 0; i < this.requests.length; i++) {
                const reqInfo = this.requests[i];
                if (reqInfo.method === "GET") {
                    if (currentChangeSetId.length > 0) {
                        // end an existing change set
                        batchBody.push(`--changeset_${currentChangeSetId}--\n\n`);
                        currentChangeSetId = "";
                    }
                    batchBody.push(`--batch_${this.batchId}\n`);
                }
                else {
                    if (currentChangeSetId.length < 1) {
                        // start new change set
                        currentChangeSetId = Util.getGUID();
                        batchBody.push(`--batch_${this.batchId}\n`);
                        batchBody.push(`Content-Type: multipart/mixed; boundary="changeset_${currentChangeSetId}"\n\n`);
                    }
                    batchBody.push(`--changeset_${currentChangeSetId}\n`);
                }
                // common batch part prefix
                batchBody.push(`Content-Type: application/http\n`);
                batchBody.push(`Content-Transfer-Encoding: binary\n\n`);
                const headers = new Headers();
                // this is the url of the individual request within the batch
                const url = Util.isUrlAbsolute(reqInfo.url) ? reqInfo.url : Util.combinePaths(absoluteRequestUrl, reqInfo.url);
                Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Adding request ${reqInfo.method} ${url} to batch.`, 0 /* Verbose */);
                if (reqInfo.method !== "GET") {
                    let method = reqInfo.method;
                    const castHeaders = reqInfo.options.headers;
                    if (reqInfo.hasOwnProperty("options") && reqInfo.options.hasOwnProperty("headers") && typeof castHeaders["X-HTTP-Method"] !== "undefined") {
                        method = castHeaders["X-HTTP-Method"];
                        delete castHeaders["X-HTTP-Method"];
                    }
                    batchBody.push(`${method} ${url} HTTP/1.1\n`);
                    headers.set("Content-Type", "application/json;odata=verbose;charset=utf-8");
                }
                else {
                    batchBody.push(`${reqInfo.method} ${url} HTTP/1.1\n`);
                }
                // merge global config headers
                mergeHeaders(headers, SPRuntimeConfig.headers);
                // merge per-request headers
                if (reqInfo.options) {
                    mergeHeaders(headers, reqInfo.options.headers);
                }
                // lastly we apply any default headers we need that may not exist
                if (!headers.has("Accept")) {
                    headers.append("Accept", "application/json");
                }
                if (!headers.has("Content-Type")) {
                    headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
                }
                if (!headers.has("X-ClientService-ClientTag")) {
                    headers.append("X-ClientService-ClientTag", "PnPCoreJS:@pnp-$$Version$$");
                }
                // write headers into batch body
                headers.forEach((value, name) => {
                    batchBody.push(`${name}: ${value}\n`);
                });
                batchBody.push("\n");
                if (reqInfo.options.body) {
                    batchBody.push(`${reqInfo.options.body}\n\n`);
                }
            }
            if (currentChangeSetId.length > 0) {
                // Close the changeset
                batchBody.push(`--changeset_${currentChangeSetId}--\n\n`);
                currentChangeSetId = "";
            }
            batchBody.push(`--batch_${this.batchId}--\n`);
            const batchOptions = {
                "body": batchBody.join(""),
                "headers": {
                    "Content-Type": `multipart/mixed; boundary=batch_${this.batchId}`,
                },
                "method": "POST",
            };
            Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Sending batch request.`, 1 /* Info */);
            return client.fetch(Util.combinePaths(absoluteRequestUrl, "/_api/$batch"), batchOptions)
                .then(r => r.text())
                .then(SPBatch.ParseResponse)
                .then((responses) => {
                if (responses.length !== this.requests.length) {
                    throw new SPBatchParseException("Could not properly parse responses to match requests in batch.");
                }
                Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched requests.`, 1 /* Info */);
                return responses.reduce((chain, response, index) => {
                    const request = this.requests[index];
                    Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched request ${request.method} ${request.url}.`, 0 /* Verbose */);
                    return chain.then(_ => request.parser.parse(response).then(request.resolve).catch(request.reject));
                }, Promise.resolve());
            });
        });
    }
}

/**
 * Describes a collection of List objects
 *
 */
class Features extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    constructor(baseUrl, path = "features") {
        super(baseUrl, path);
    }
    /**
     * Gets a list from the collection by guid id
     *
     * @param id The Id of the feature (GUID)
     */
    getById(id) {
        const feature = new Feature(this);
        feature.concat(`('${id}')`);
        return feature;
    }
    /**
     * Adds a new list to the collection
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature activation will be forced
     */
    add(id, force = false) {
        return this.clone(Features, "add").postCore({
            body: JSON.stringify({
                featdefScope: 0,
                featureId: id,
                force: force,
            }),
        }).then(data => {
            return {
                data: data,
                feature: this.getById(id),
            };
        });
    }
    /**
     * Removes (deactivates) a feature from the collection
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature deactivation will be forced
     */
    remove(id, force = false) {
        return this.clone(Features, "remove").postCore({
            body: JSON.stringify({
                featureId: id,
                force: force,
            }),
        });
    }
}
class Feature extends SharePointQueryableInstance {
    /**
     * Removes (deactivates) a feature from the collection
     *
     * @param force If true the feature deactivation will be forced
     */
    deactivate(force = false) {
        const removeDependency = this.addBatchDependency();
        const idGet = new Feature(this).select("DefinitionId");
        return idGet.get().then(feature => {
            const promise = this.getParent(Features, this.parentUrl, "", this.batch).remove(feature.DefinitionId, force);
            removeDependency();
            return promise;
        });
    }
}

class RelatedItemManagerImpl extends SharePointQueryable {
    constructor(baseUrl, path = "_api/SP.RelatedItemManager") {
        super(baseUrl, path);
    }
    static FromUrl(url) {
        if (url === null) {
            return new RelatedItemManagerImpl("");
        }
        const index = url.indexOf("_api/");
        if (index > -1) {
            return new RelatedItemManagerImpl(url.substr(0, index));
        }
        return new RelatedItemManagerImpl(url);
    }
    getRelatedItems(sourceListName, sourceItemId) {
        const query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".GetRelatedItems");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
            }),
        });
    }
    getPageOneRelatedItems(sourceListName, sourceItemId) {
        const query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".GetPageOneRelatedItems");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
            }),
        });
    }
    addSingleLink(sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemID, targetWebUrl, tryAddReverseLink = false) {
        const query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".AddSingleLink");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
                SourceWebUrl: sourceWebUrl,
                TargetItemID: targetItemID,
                TargetListName: targetListName,
                TargetWebUrl: targetWebUrl,
                TryAddReverseLink: tryAddReverseLink,
            }),
        });
    }
    /**
     * Adds a related item link from an item specified by list name and item id, to an item specified by url
     *
     * @param sourceListName The source list name or list id
     * @param sourceItemId The source item id
     * @param targetItemUrl The target item url
     * @param tryAddReverseLink If set to true try to add the reverse link (will not return error if it fails)
     */
    addSingleLinkToUrl(sourceListName, sourceItemId, targetItemUrl, tryAddReverseLink = false) {
        const query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".AddSingleLinkToUrl");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
                TargetItemUrl: targetItemUrl,
                TryAddReverseLink: tryAddReverseLink,
            }),
        });
    }
    /**
     * Adds a related item link from an item specified by url, to an item specified by list name and item id
     *
     * @param sourceItemUrl The source item url
     * @param targetListName The target list name or list id
     * @param targetItemId The target item id
     * @param tryAddReverseLink If set to true try to add the reverse link (will not return error if it fails)
     */
    addSingleLinkFromUrl(sourceItemUrl, targetListName, targetItemId, tryAddReverseLink = false) {
        const query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".AddSingleLinkFromUrl");
        return query.postCore({
            body: JSON.stringify({
                SourceItemUrl: sourceItemUrl,
                TargetItemID: targetItemId,
                TargetListName: targetListName,
                TryAddReverseLink: tryAddReverseLink,
            }),
        });
    }
    deleteSingleLink(sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemId, targetWebUrl, tryDeleteReverseLink = false) {
        const query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".DeleteSingleLink");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
                SourceWebUrl: sourceWebUrl,
                TargetItemID: targetItemId,
                TargetListName: targetListName,
                TargetWebUrl: targetWebUrl,
                TryDeleteReverseLink: tryDeleteReverseLink,
            }),
        });
    }
}

/**
 * Describes regional settings ODada object
 */
class RegionalSettings extends SharePointQueryableInstance {
    /**
     * Creates a new instance of the RegionalSettings class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this regional settings collection
     */
    constructor(baseUrl, path = "regionalsettings") {
        super(baseUrl, path);
    }
    /**
     * Gets the collection of languages used in a server farm.
     */
    get installedLanguages() {
        return new InstalledLanguages(this);
    }
    /**
     * Gets the collection of language packs that are installed on the server.
     */
    get globalInstalledLanguages() {
        return new InstalledLanguages(this, "globalinstalledlanguages");
    }
    /**
     * Gets time zone
     */
    get timeZone() {
        return new TimeZone(this);
    }
    /**
     * Gets time zones
     */
    get timeZones() {
        return new TimeZones(this);
    }
}
/**
 * Describes installed languages ODada queriable collection
 */
class InstalledLanguages extends SharePointQueryableCollection {
    constructor(baseUrl, path = "installedlanguages") {
        super(baseUrl, path);
    }
}
/**
 * Describes TimeZone ODada object
 */
class TimeZone extends SharePointQueryableInstance {
    constructor(baseUrl, path = "timezone") {
        super(baseUrl, path);
    }
    /**
     * Gets an Local Time by UTC Time
     *
     * @param utcTime UTC Time as Date or ISO String
     */
    utcToLocalTime(utcTime) {
        let dateIsoString;
        if (typeof utcTime === "string") {
            dateIsoString = utcTime;
        }
        else {
            dateIsoString = utcTime.toISOString();
        }
        return this.clone(TimeZone, `utctolocaltime('${dateIsoString}')`)
            .postCore()
            .then(res => res.hasOwnProperty("UTCToLocalTime") ? res.UTCToLocalTime : res);
    }
    /**
     * Gets an UTC Time by Local Time
     *
     * @param localTime Local Time as Date or ISO String
     */
    localTimeToUTC(localTime) {
        let dateIsoString;
        if (typeof localTime === "string") {
            dateIsoString = localTime;
        }
        else {
            dateIsoString = Util.dateAdd(localTime, "minute", localTime.getTimezoneOffset() * -1).toISOString();
        }
        return this.clone(TimeZone, `localtimetoutc('${dateIsoString}')`)
            .postCore()
            .then(res => res.hasOwnProperty("LocalTimeToUTC") ? res.LocalTimeToUTC : res);
    }
}
/**
 * Describes time zones queriable collection
 */
class TimeZones extends SharePointQueryableCollection {
    constructor(baseUrl, path = "timezones") {
        super(baseUrl, path);
    }
    // https://msdn.microsoft.com/en-us/library/office/jj247008.aspx - timezones ids
    /**
     * Gets an TimeZone by id
     *
     * @param id The integer id of the timezone to retrieve
     */
    getById(id) {
        // do the post and merge the result into a TimeZone instance so the data and methods are available
        return this.clone(TimeZones, `GetById(${id})`).postCore({}, spODataEntity(TimeZone));
    }
}

/**
 * Describes a collection of webs
 *
 */
class Webs extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the Webs class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this web collection
     */
    constructor(baseUrl, webPath = "webs") {
        super(baseUrl, webPath);
    }
    /**
     * Adds a new web to the collection
     *
     * @param title The new web's title
     * @param url The new web's relative url
     * @param description The new web's description
     * @param template The new web's template internal name (default = STS)
     * @param language The locale id that specifies the new web's language (default = 1033 [English, US])
     * @param inheritPermissions When true, permissions will be inherited from the new web's parent (default = true)
     */
    add(title, url, description = "", template = "STS", language = 1033, inheritPermissions = true) {
        const props = {
            Description: description,
            Language: language,
            Title: title,
            Url: url,
            UseSamePermissionsAsParentSite: inheritPermissions,
            WebTemplate: template,
        };
        const postBody = JSON.stringify({
            "parameters": Util.extend({
                "__metadata": { "type": "SP.WebCreationInformation" },
            }, props),
        });
        return this.clone(Webs, "add").postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                web: new Web(spExtractODataId(data).replace(/_api\/web\/?/i, "")),
            };
        });
    }
}
/**
 * Describes a collection of web infos
 *
 */
class WebInfos extends SharePointQueryableCollection {
    /**
     * Creates a new instance of the WebInfos class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this web infos collection
     */
    constructor(baseUrl, webPath = "webinfos") {
        super(baseUrl, webPath);
    }
}
/**
 * Describes a web
 *
 */
class Web extends SharePointQueryableShareableWeb {
    /**
     * Creates a new instance of the Web class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this web
     */
    constructor(baseUrl, path = "_api/web") {
        super(baseUrl, path);
    }
    /**
     * Creates a new web instance from the given url by indexing the location of the /_api/
     * segment. If this is not found the method creates a new web with the entire string as
     * supplied.
     *
     * @param url
     */
    static fromUrl(url, path) {
        return new Web(extractWebUrl(url), path);
    }
    /**
     * Gets this web's subwebs
     *
     */
    get webs() {
        return new Webs(this);
    }
    /**
    * Returns a collection of objects that contain metadata about subsites of the current site in which the current user is a member.
    *
    * @param nWebTemplateFilter Specifies the site definition (default = -1)
    * @param nConfigurationFilter A 16-bit integer that specifies the identifier of a configuration (default = -1)
    */
    getSubwebsFilteredForCurrentUser(nWebTemplateFilter = -1, nConfigurationFilter = -1) {
        return this.clone(Webs, `getSubwebsFilteredForCurrentUser(nWebTemplateFilter=${nWebTemplateFilter},nConfigurationFilter=${nConfigurationFilter})`);
    }
    /**
     * Allows access to the web's all properties collection
     */
    get allProperties() {
        return this.clone(SharePointQueryableCollection, "allproperties");
    }
    /**
     * Gets a collection of WebInfos for this web's subwebs
     *
     */
    get webinfos() {
        return new WebInfos(this);
    }
    /**
     * Gets the content types available in this web
     *
     */
    get contentTypes() {
        return new ContentTypes(this);
    }
    /**
     * Gets the lists in this web
     *
     */
    get lists() {
        return new Lists(this);
    }
    /**
     * Gets the fields in this web
     *
     */
    get fields() {
        return new Fields(this);
    }
    /**
     * Gets the active features for this web
     *
     */
    get features() {
        return new Features(this);
    }
    /**
     * Gets the available fields in this web
     *
     */
    get availablefields() {
        return new Fields(this, "availablefields");
    }
    /**
     * Gets the navigation options in this web
     *
     */
    get navigation() {
        return new Navigation(this);
    }
    /**
     * Gets the site users
     *
     */
    get siteUsers() {
        return new SiteUsers(this);
    }
    /**
     * Gets the site groups
     *
     */
    get siteGroups() {
        return new SiteGroups(this);
    }
    /**
     * Gets site user info list
     *
     */
    get siteUserInfoList() {
        return new List(this, "siteuserinfolist");
    }
    /**
     * Gets regional settings
     *
     */
    get regionalSettings() {
        return new RegionalSettings(this);
    }
    /**
     * Gets the current user
     */
    get currentUser() {
        return new CurrentUser(this);
    }
    /**
     * Gets the top-level folders in this web
     *
     */
    get folders() {
        return new Folders(this);
    }
    /**
     * Gets all user custom actions for this web
     *
     */
    get userCustomActions() {
        return new UserCustomActions(this);
    }
    /**
     * Gets the collection of RoleDefinition resources
     *
     */
    get roleDefinitions() {
        return new RoleDefinitions(this);
    }
    /**
     * Provides an interface to manage related items
     *
     */
    get relatedItems() {
        return RelatedItemManagerImpl.FromUrl(this.toUrl());
    }
    /**
     * Creates a new batch for requests within the context of this web
     *
     */
    createBatch() {
        return new SPBatch(this.parentUrl);
    }
    /**
     * Gets the root folder of this web
     *
     */
    get rootFolder() {
        return new Folder(this, "rootFolder");
    }
    /**
     * Gets the associated owner group for this web
     *
     */
    get associatedOwnerGroup() {
        return new SiteGroup(this, "associatedownergroup");
    }
    /**
     * Gets the associated member group for this web
     *
     */
    get associatedMemberGroup() {
        return new SiteGroup(this, "associatedmembergroup");
    }
    /**
     * Gets the associated visitor group for this web
     *
     */
    get associatedVisitorGroup() {
        return new SiteGroup(this, "associatedvisitorgroup");
    }
    /**
     * Gets a folder by server relative url
     *
     * @param folderRelativeUrl The server relative path to the folder (including /sites/ if applicable)
     */
    getFolderByServerRelativeUrl(folderRelativeUrl) {
        return new Folder(this, `getFolderByServerRelativeUrl('${folderRelativeUrl}')`);
    }
    /**
     * Gets a file by server relative url
     *
     * @param fileRelativeUrl The server relative path to the file (including /sites/ if applicable)
     */
    getFileByServerRelativeUrl(fileRelativeUrl) {
        return new File(this, `getFileByServerRelativeUrl('${fileRelativeUrl}')`);
    }
    /**
     * Gets a list by server relative url (list's root folder)
     *
     * @param listRelativeUrl The server relative path to the list's root folder (including /sites/ if applicable)
     */
    getList(listRelativeUrl) {
        return new List(this, `getList('${listRelativeUrl}')`);
    }
    /**
     * Updates this web instance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    update(properties) {
        const postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": "SP.Web" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                data: data,
                web: this,
            };
        });
    }
    /**
     * Deletes this web
     *
     */
    delete() {
        return super.deleteCore();
    }
    /**
     * Applies the theme specified by the contents of each of the files specified in the arguments to the site
     *
     * @param colorPaletteUrl The server-relative URL of the color palette file
     * @param fontSchemeUrl The server-relative URL of the font scheme
     * @param backgroundImageUrl The server-relative URL of the background image
     * @param shareGenerated When true, the generated theme files are stored in the root site. When false, they are stored in this web
     */
    applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
        const postBody = JSON.stringify({
            backgroundImageUrl: backgroundImageUrl,
            colorPaletteUrl: colorPaletteUrl,
            fontSchemeUrl: fontSchemeUrl,
            shareGenerated: shareGenerated,
        });
        return this.clone(Web, "applytheme").postCore({ body: postBody });
    }
    /**
     * Applies the specified site definition or site template to the Web site that has no template applied to it
     *
     * @param template Name of the site definition or the name of the site template
     */
    applyWebTemplate(template) {
        const q = this.clone(Web, "applywebtemplate");
        q.concat(`(@t)`);
        q.query.add("@t", template);
        return q.postCore();
    }
    /**
     * Checks whether the specified login name belongs to a valid user in the web. If the user doesn't exist, adds the user to the web.
     *
     * @param loginName The login name of the user (ex: i:0#.f|membership|user@domain.onmicrosoft.com)
     */
    ensureUser(loginName) {
        const postBody = JSON.stringify({
            logonName: loginName,
        });
        return this.clone(Web, "ensureuser").postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                user: new SiteUser(spExtractODataId(data)),
            };
        });
    }
    /**
     * Returns a collection of site templates available for the site
     *
     * @param language The locale id of the site templates to retrieve (default = 1033 [English, US])
     * @param includeCrossLanguage When true, includes language-neutral site templates; otherwise false (default = true)
     */
    availableWebTemplates(language = 1033, includeCrossLanugage = true) {
        return new SharePointQueryableCollection(this, `getavailablewebtemplates(lcid=${language}, doincludecrosslanguage=${includeCrossLanugage})`);
    }
    /**
     * Returns the list gallery on the site
     *
     * @param type The gallery type - WebTemplateCatalog = 111, WebPartCatalog = 113 ListTemplateCatalog = 114,
     * MasterPageCatalog = 116, SolutionCatalog = 121, ThemeCatalog = 123, DesignCatalog = 124, AppDataCatalog = 125
     */
    getCatalog(type) {
        return this.clone(Web, `getcatalog(${type})`).select("Id").get().then((data) => {
            return new List(spExtractODataId(data));
        });
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    getChanges(query) {
        const postBody = JSON.stringify({ "query": Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
        return this.clone(Web, "getchanges").postCore({ body: postBody });
    }
    /**
     * Gets the custom list templates for the site
     *
     */
    get customListTemplate() {
        return new SharePointQueryableCollection(this, "getcustomlisttemplates");
    }
    /**
     * Returns the user corresponding to the specified member identifier for the current site
     *
     * @param id The id of the user
     */
    getUserById(id) {
        return new SiteUser(this, `getUserById(${id})`);
    }
    /**
     * Returns the name of the image file for the icon that is used to represent the specified file
     *
     * @param filename The file name. If this parameter is empty, the server returns an empty string
     * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1 (default = 0)
     * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
     */
    mapToIcon(filename, size = 0, progId = "") {
        return this.clone(Web, `maptoicon(filename='${filename}', progid='${progId}', size=${size})`).get();
    }
    /**
     * Returns the tenant property corresponding to the specified key in the app catalog site
     *
     * @param key
     */
    getStorageEntity(key) {
        return this.clone(Web, `getStorageEntity('${key}')`).get();
    }
    /**
     * Gets the app catalog for this web
     *
     * @param url Optional url or web containing the app catalog (default: current web)
     */
    getAppCatalog(url) {
        return new AppCatalog(url || this);
    }
}

/**
 * Describes a site collection
 *
 */
class Site extends SharePointQueryableInstance {
    /**
     * Creates a new instance of the Site class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this site collection
     */
    constructor(baseUrl, path = "_api/site") {
        super(baseUrl, path);
    }
    /**
     * Gets the root web of the site collection
     *
     */
    get rootWeb() {
        return new Web(this, "rootweb");
    }
    /**
     * Gets the active features for this site collection
     *
     */
    get features() {
        return new Features(this);
    }
    /**
     * Gets all custom actions for this site collection
     *
     */
    get userCustomActions() {
        return new UserCustomActions(this);
    }
    /**
     * Gets the context information for this site collection
     */
    getContextInfo() {
        const q = new Site(this.parentUrl, "_api/contextinfo");
        return q.postCore().then(data => {
            if (data.hasOwnProperty("GetContextWebInformation")) {
                const info = data.GetContextWebInformation;
                info.SupportedSchemaVersions = info.SupportedSchemaVersions.results;
                return info;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Gets the document libraries on a site. Static method. (SharePoint Online only)
     *
     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
     */
    getDocumentLibraries(absoluteWebUrl) {
        const q = new SharePointQueryable("", "_api/sp.web.getdocumentlibraries(@v)");
        q.query.add("@v", "'" + absoluteWebUrl + "'");
        return q.get().then(data => {
            if (data.hasOwnProperty("GetDocumentLibraries")) {
                return data.GetDocumentLibraries;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Gets the site url from a page url
     *
     * @param absolutePageUrl The absolute url of the page
     */
    getWebUrlFromPageUrl(absolutePageUrl) {
        const q = new SharePointQueryable("", "_api/sp.web.getweburlfrompageurl(@v)");
        q.query.add("@v", "'" + absolutePageUrl + "'");
        return q.get().then(data => {
            if (data.hasOwnProperty("GetWebUrlFromPageUrl")) {
                return data.GetWebUrlFromPageUrl;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Creates a new batch for requests within the context of this site collection
     *
     */
    createBatch() {
        return new SPBatch(this.parentUrl);
    }
    /**
     * Opens a web by id (using POST)
     *
     * @param webId The GUID id of the web to open
     */
    openWebById(webId) {
        return this.clone(Site, `openWebById('${webId}')`).postCore().then(d => {
            return {
                data: d,
                web: Web.fromUrl(spExtractODataId(d)),
            };
        });
    }
}

class UserProfileQuery extends SharePointQueryableInstance {
    /**
     * Creates a new instance of the UserProfileQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user profile query
     */
    constructor(baseUrl, path = "_api/sp.userprofiles.peoplemanager") {
        super(baseUrl, path);
        this.profileLoader = new ProfileLoader(baseUrl);
    }
    /**
     * The url of the edit profile page for the current user
     */
    get editProfileLink() {
        return this.clone(UserProfileQuery, "EditProfileLink").get();
    }
    /**
     * A boolean value that indicates whether the current user's "People I'm Following" list is public
     */
    get isMyPeopleListPublic() {
        return this.clone(UserProfileQuery, "IsMyPeopleListPublic").get();
    }
    /**
     * A boolean value that indicates whether the current user is being followed by the specified user
     *
     * @param loginName The account name of the user
     */
    amIFollowedBy(loginName) {
        const q = this.clone(UserProfileQuery, "amifollowedby(@v)");
        q.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * A boolean value that indicates whether the current user is following the specified user
     *
     * @param loginName The account name of the user
     */
    amIFollowing(loginName) {
        const q = this.clone(UserProfileQuery, "amifollowing(@v)");
        q.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * Gets tags that the current user is following
     *
     * @param maxCount The maximum number of tags to retrieve (default is 20)
     */
    getFollowedTags(maxCount = 20) {
        return this.clone(UserProfileQuery, `getfollowedtags(${maxCount})`).get();
    }
    /**
     * Gets the people who are following the specified user
     *
     * @param loginName The account name of the user
     */
    getFollowersFor(loginName) {
        const q = this.clone(UserProfileQuery, "getfollowersfor(@v)");
        q.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * Gets the people who are following the current user
     *
     */
    get myFollowers() {
        return new SharePointQueryableCollection(this, "getmyfollowers");
    }
    /**
     * Gets user properties for the current user
     *
     */
    get myProperties() {
        return new UserProfileQuery(this, "getmyproperties");
    }
    /**
     * Gets the people who the specified user is following
     *
     * @param loginName The account name of the user.
     */
    getPeopleFollowedBy(loginName) {
        const q = this.clone(UserProfileQuery, "getpeoplefollowedby(@v)");
        q.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * Gets user properties for the specified user.
     *
     * @param loginName The account name of the user.
     */
    getPropertiesFor(loginName) {
        const q = this.clone(UserProfileQuery, "getpropertiesfor(@v)");
        q.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * Gets the 20 most popular hash tags over the past week, sorted so that the most popular tag appears first
     *
     */
    get trendingTags() {
        const q = this.clone(UserProfileQuery, null);
        q.concat(".gettrendingtags");
        return q.get();
    }
    /**
     * Gets the specified user profile property for the specified user
     *
     * @param loginName The account name of the user
     * @param propertyName The case-sensitive name of the property to get
     */
    getUserProfilePropertyFor(loginName, propertyName) {
        const q = this.clone(UserProfileQuery, `getuserprofilepropertyfor(accountname=@v, propertyname='${propertyName}')`);
        q.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * Removes the specified user from the user's list of suggested people to follow
     *
     * @param loginName The account name of the user
     */
    hideSuggestion(loginName) {
        const q = this.clone(UserProfileQuery, "hidesuggestion(@v)");
        q.query.add("@v", `'${encodeURIComponent(loginName)}'`);
        return q.postCore();
    }
    /**
     * A boolean values that indicates whether the first user is following the second user
     *
     * @param follower The account name of the user who might be following the followee
     * @param followee The account name of the user who might be followed by the follower
     */
    isFollowing(follower, followee) {
        const q = this.clone(UserProfileQuery, null);
        q.concat(`.isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)`);
        q.query.add("@v", `'${encodeURIComponent(follower)}'`);
        q.query.add("@y", `'${encodeURIComponent(followee)}'`);
        return q.get();
    }
    /**
     * Uploads and sets the user profile picture (Users can upload a picture to their own profile only). Not supported for batching.
     *
     * @param profilePicSource Blob data representing the user's picture in BMP, JPEG, or PNG format of up to 4.76MB
     */
    setMyProfilePic(profilePicSource) {
        return new Promise((resolve, reject) => {
            readBlobAsArrayBuffer(profilePicSource).then((buffer) => {
                const request = new UserProfileQuery(this, "setmyprofilepicture");
                request.postCore({
                    body: String.fromCharCode.apply(null, new Uint16Array(buffer)),
                }).then(_ => resolve());
            }).catch(e => reject(e));
        });
    }
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
     *
     * @param emails The email addresses of the users to provision sites for
     */
    createPersonalSiteEnqueueBulk(...emails) {
        return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
    }
    /**
     * Gets the user profile of the site owner
     *
     */
    get ownerUserProfile() {
        return this.profileLoader.ownerUserProfile;
    }
    /**
     * Gets the user profile for the current user
     */
    get userProfile() {
        return this.profileLoader.userProfile;
    }
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false (default) if non-interactively (client) initiated request
     */
    createPersonalSite(interactiveRequest = false) {
        return this.profileLoader.createPersonalSite(interactiveRequest);
    }
    /**
     * Sets the privacy settings for this profile
     *
     * @param share true to make all social data public; false to make all social data private
     */
    shareAllSocialData(share) {
        return this.profileLoader.shareAllSocialData(share);
    }
}
class ProfileLoader extends SharePointQueryable {
    /**
   * Creates a new instance of the ProfileLoader class
   *
   * @param baseUrl The url or SharePointQueryable which forms the parent of this profile loader
   */
    constructor(baseUrl, path = "_api/sp.userprofiles.profileloader.getprofileloader") {
        super(baseUrl, path);
    }
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only) Doesn't support batching
     *
     * @param emails The email addresses of the users to provision sites for
     */
    createPersonalSiteEnqueueBulk(emails) {
        return this.clone(ProfileLoader, "createpersonalsiteenqueuebulk", false).postCore({
            body: JSON.stringify({ "emailIDs": emails }),
        });
    }
    /**
     * Gets the user profile of the site owner.
     *
     */
    get ownerUserProfile() {
        let q = this.getParent(ProfileLoader, this.parentUrl, "_api/sp.userprofiles.profileloader.getowneruserprofile");
        if (this.hasBatch) {
            q = q.inBatch(this.batch);
        }
        return q.postCore();
    }
    /**
     * Gets the user profile of the current user.
     *
     */
    get userProfile() {
        return this.clone(ProfileLoader, "getuserprofile").postCore();
    }
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false (default) if non-interactively (client) initiated request
     */
    createPersonalSite(interactiveRequest = false) {
        return this.clone(ProfileLoader, `getuserprofile/createpersonalsiteenque(${interactiveRequest})`).postCore();
    }
    /**
     * Sets the privacy settings for this profile
     *
     * @param share true to make all social data public; false to make all social data private.
     */
    shareAllSocialData(share) {
        return this.clone(ProfileLoader, `getuserprofile/shareallsocialdata(${share})`).postCore();
    }
}

/**
 * Allows for calling of the static SP.Utilities.Utility methods by supplying the method name
 */
class UtilityMethod extends SharePointQueryable {
    /**
     * Creates a new instance of the Utility method class
     *
     * @param baseUrl The parent url provider
     * @param methodName The static method name to call on the utility class
     */
    constructor(baseUrl, methodName) {
        super(UtilityMethod.getBaseUrl(baseUrl), `_api/SP.Utilities.Utility.${methodName}`);
    }
    static getBaseUrl(candidate) {
        if (typeof candidate === "string") {
            return candidate;
        }
        const c = candidate;
        const url = c.toUrl();
        const index = url.indexOf("_api/");
        if (index < 0) {
            return url;
        }
        return url.substr(0, index);
    }
    excute(props) {
        return this.postCore({
            body: JSON.stringify(props),
        });
    }
    /**
     * Sends an email based on the supplied properties
     *
     * @param props The properties of the email to send
     */
    sendEmail(props) {
        const params = {
            properties: {
                Body: props.Body,
                From: props.From,
                Subject: props.Subject,
                "__metadata": { "type": "SP.Utilities.EmailProperties" },
            },
        };
        if (props.To && props.To.length > 0) {
            params.properties = Util.extend(params.properties, {
                To: { results: props.To },
            });
        }
        if (props.CC && props.CC.length > 0) {
            params.properties = Util.extend(params.properties, {
                CC: { results: props.CC },
            });
        }
        if (props.BCC && props.BCC.length > 0) {
            params.properties = Util.extend(params.properties, {
                BCC: { results: props.BCC },
            });
        }
        if (props.AdditionalHeaders) {
            params.properties = Util.extend(params.properties, {
                AdditionalHeaders: props.AdditionalHeaders,
            });
        }
        return this.clone(UtilityMethod, "SendEmail", true).excute(params);
    }
    getCurrentUserEmailAddresses() {
        return this.clone(UtilityMethod, "GetCurrentUserEmailAddresses", true).excute({});
    }
    resolvePrincipal(input, scopes, sources, inputIsEmailOnly, addToUserInfoList, matchUserInfoList = false) {
        const params = {
            addToUserInfoList: addToUserInfoList,
            input: input,
            inputIsEmailOnly: inputIsEmailOnly,
            matchUserInfoList: matchUserInfoList,
            scopes: scopes,
            sources: sources,
        };
        return this.clone(UtilityMethod, "ResolvePrincipalInCurrentContext", true).excute(params);
    }
    searchPrincipals(input, scopes, sources, groupName, maxCount) {
        const params = {
            groupName: groupName,
            input: input,
            maxCount: maxCount,
            scopes: scopes,
            sources: sources,
        };
        return this.clone(UtilityMethod, "SearchPrincipalsUsingContextWeb", true).excute(params);
    }
    createEmailBodyForInvitation(pageAddress) {
        const params = {
            pageAddress: pageAddress,
        };
        return this.clone(UtilityMethod, "CreateEmailBodyForInvitation", true).excute(params);
    }
    expandGroupsToPrincipals(inputs, maxCount = 30) {
        const params = {
            inputs: inputs,
            maxCount: maxCount,
        };
        return this.clone(UtilityMethod, "ExpandGroupsToPrincipals", true).excute(params);
    }
    createWikiPage(info) {
        return this.clone(UtilityMethod, "CreateWikiPageInContextWeb", true).excute({
            parameters: info,
        }).then(r => {
            return {
                data: r,
                file: new File(spExtractODataId(r)),
            };
        });
    }
}

/**
 * Root of the SharePoint REST module
 */
class SPRest {
    /**
     * Creates a new instance of the SPRest class
     *
     * @param options Additional options
     * @param baseUrl A string that should form the base part of the url
     */
    constructor(_options = {}, _baseUrl = "") {
        this._options = _options;
        this._baseUrl = _baseUrl;
    }
    /**
     * Configures instance with additional options and baseUrl.
     * Provided configuration used by other objects in a chain
     *
     * @param options Additional options
     * @param baseUrl A string that should form the base part of the url
     */
    configure(options, baseUrl = "") {
        return new SPRest(options, baseUrl);
    }
    /**
     * Global SharePoint configuration options
     *
     * @param config The SharePoint configuration to apply
     */
    setup(config) {
        setup(config);
    }
    /**
     * Executes a search against this web context
     *
     * @param query The SearchQuery definition
     */
    searchSuggest(query) {
        let finalQuery;
        if (typeof query === "string") {
            finalQuery = { querytext: query };
        }
        else {
            finalQuery = query;
        }
        return new SearchSuggest(this._baseUrl).configure(this._options).execute(finalQuery);
    }
    /**
     * Executes a search against this web context
     *
     * @param query The SearchQuery definition
     */
    search(query) {
        let finalQuery;
        if (typeof query === "string") {
            finalQuery = { Querytext: query };
        }
        else if (query instanceof SearchQueryBuilder) {
            finalQuery = query.toSearchQuery();
        }
        else {
            finalQuery = query;
        }
        return new Search(this._baseUrl).configure(this._options).execute(finalQuery);
    }
    /**
     * Begins a site collection scoped REST request
     *
     */
    get site() {
        return new Site(this._baseUrl).configure(this._options);
    }
    /**
     * Begins a web scoped REST request
     *
     */
    get web() {
        return new Web(this._baseUrl).configure(this._options);
    }
    /**
     * Access to user profile methods
     *
     */
    get profiles() {
        return new UserProfileQuery(this._baseUrl).configure(this._options);
    }
    /**
     * Access to the site collection level navigation service
     */
    get navigation() {
        return new NavigationService();
    }
    /**
     * Creates a new batch object for use with the SharePointQueryable.addToBatch method
     *
     */
    createBatch() {
        return this.web.createBatch();
    }
    /**
     * Static utilities methods from SP.Utilities.Utility
     */
    get utility() {
        return new UtilityMethod(this._baseUrl, "").configure(this._options);
    }
}
const sp = new SPRest();

export { spExtractODataId, spODataEntity, spODataEntityArray, SharePointQueryable, SharePointQueryableInstance, SharePointQueryableCollection, SharePointQueryableSecurable, FileFolderShared, SharePointQueryableShareable, SharePointQueryableShareableFile, SharePointQueryableShareableFolder, SharePointQueryableShareableItem, SharePointQueryableShareableWeb, AppCatalog, App, Field, Fields, CheckinType, WebPartsPersonalizationScope, MoveOperations, TemplateFileType, File, Files, Folder, Folders, SPHttpClient, Item, Items, ItemVersion, ItemVersions, PagedItemCollection, NavigationNodes, NavigationNode, NavigationService, List, Lists, sp, SPRest, RoleDefinitionBindings, Search, SearchQueryBuilder, SearchResults, SortDirection, ReorderingRuleMatchType, QueryPropertyValueType, SearchBuiltInSourceId, SearchSuggest, SearchSuggestResult, Site, UtilityMethod, WebPartDefinitions, WebPartDefinition, WebPart, Web, ControlMode, FieldTypes, DateTimeFieldFormatType, AddFieldOptions, CalendarType, UrlFieldFormatType, PermissionKind, PrincipalType$1 as PrincipalType, PrincipalSource, RoleType, PageType, SharingLinkKind, SharingRole, SharingOperationStatusCode, SPSharedObjectType, SharingDomainRestrictionMode, RenderListDataOptions };
//# sourceMappingURL=sp.js.map
