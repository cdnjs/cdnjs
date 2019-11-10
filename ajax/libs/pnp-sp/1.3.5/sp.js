/**
 * @license
 * v1.3.5
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { stringIsNullOrEmpty, extend, combine, hOP, RuntimeConfig, FetchClient, mergeHeaders, getCtxCallback, isUrlAbsolute, mergeOptions, getGUID, jsS, dateAdd, objectDefinedNotNull, getHashCode, isArray } from '@pnp/common';
import { Logger } from '@pnp/logging';
import { ODataParserBase, ODataDefaultParser, ODataQueryable, TextParser, BlobParser, JSONParser, BufferParser, ODataBatch, CachingOptions } from '@pnp/odata';
import { SiteScripts } from '..';

function extractWebUrl(candidateUrl) {
    if (stringIsNullOrEmpty(candidateUrl)) {
        return "";
    }
    let index = candidateUrl.indexOf("_api/");
    if (index < 0) {
        index = candidateUrl.indexOf("_vti_bin/");
    }
    if (index > -1) {
        return candidateUrl.substr(0, index);
    }
    // if all else fails just give them what they gave us back
    return candidateUrl;
}

function odataUrlFrom(candidate) {
    const parts = [];
    const s = ["odata.type", "odata.editLink", "__metadata", "odata.metadata"];
    if (hOP(candidate, s[0]) && candidate[s[0]] === "SP.Web") {
        // webs return an absolute url in the editLink
        if (hOP(candidate, s[1])) {
            parts.push(candidate[s[1]]);
        }
        else if (hOP(candidate, s[2])) {
            // we are dealing with verbose, which has an absolute uri
            parts.push(candidate.__metadata.uri);
        }
    }
    else {
        if (hOP(candidate, s[3]) && hOP(candidate, s[1])) {
            // we are dealign with minimal metadata (default)
            parts.push(extractWebUrl(candidate[s[3]]), "_api", candidate[s[1]]);
        }
        else if (hOP(candidate, s[1])) {
            parts.push("_api", candidate[s[1]]);
        }
        else if (hOP(candidate, s[2])) {
            // we are dealing with verbose, which has an absolute uri
            parts.push(candidate.__metadata.uri);
        }
    }
    if (parts.length < 1) {
        Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", 2 /* Warning */);
        return "";
    }
    return combine(...parts);
}
class SPODataEntityParserImpl extends ODataParserBase {
    constructor(factory) {
        super();
        this.factory = factory;
        this.hydrate = (d) => {
            const o = new this.factory(odataUrlFrom(d), null);
            return extend(o, d);
        };
    }
    parse(r) {
        return super.parse(r).then((d) => {
            const o = new this.factory(odataUrlFrom(d), null);
            return extend(o, d);
        });
    }
}
class SPODataEntityArrayParserImpl extends ODataParserBase {
    constructor(factory) {
        super();
        this.factory = factory;
        this.hydrate = (d) => {
            return d.map(v => {
                const o = new this.factory(odataUrlFrom(v), null);
                return extend(o, v);
            });
        };
    }
    parse(r) {
        return super.parse(r).then((d) => {
            return d.map(v => {
                const o = new this.factory(odataUrlFrom(v), null);
                return extend(o, v);
            });
        });
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
        if (spPart !== undefined && spPart.headers !== undefined) {
            return spPart.headers;
        }
        return {};
    }
    get baseUrl() {
        const spPart = RuntimeConfig.get("sp");
        if (spPart !== undefined && spPart.baseUrl !== undefined) {
            return spPart.baseUrl;
        }
        if (RuntimeConfig.spfxContext !== undefined && RuntimeConfig.spfxContext !== null) {
            return RuntimeConfig.spfxContext.pageContext.web.absoluteUrl;
        }
        return null;
    }
    get fetchClientFactory() {
        const spPart = RuntimeConfig.get("sp");
        if (spPart !== undefined && spPart.fetchClientFactory !== undefined) {
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
const digests = new Map();
class DigestCache {
    constructor(_httpClient, _digests = digests) {
        this._httpClient = _httpClient;
        this._digests = _digests;
    }
    getDigest(webUrl) {
        const cachedDigest = this._digests.get(webUrl);
        if (cachedDigest !== undefined) {
            const now = new Date();
            if (now < cachedDigest.expiration) {
                return Promise.resolve(cachedDigest.value);
            }
        }
        const url = combine(webUrl, "/_api/contextinfo");
        const headers = {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose;charset=utf-8",
        };
        return this._httpClient.fetchRaw(url, {
            cache: "no-cache",
            credentials: "same-origin",
            headers: extend(headers, SPRuntimeConfig.headers, true),
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
            this._digests.set(webUrl, newCachedDigest);
            return newCachedDigest.value;
        });
    }
    clear() {
        this._digests.clear();
    }
}

class SPHttpClient {
    constructor(_impl = SPRuntimeConfig.fetchClientFactory()) {
        this._impl = _impl;
        this._digestCache = new DigestCache(this);
    }
    fetch(url, options = {}) {
        let opts = extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
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
            headers.append("X-ClientService-ClientTag", "PnPCoreJS:@pnp-1.3.5");
        }
        if (!headers.has("User-Agent")) {
            // this marks the requests for understanding by the service
            headers.append("User-Agent", "NONISV|SharePointPnP|PnPCoreJS/1.3.5");
        }
        opts = extend(opts, { headers: headers });
        if (opts.method && opts.method.toUpperCase() !== "GET") {
            // if we have either a request digest or an authorization header we don't need a digest
            if (!headers.has("X-RequestDigest") && !headers.has("Authorization")) {
                return this._digestCache.getDigest(extractWebUrl(url))
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
        options = extend(options, { headers: rawHeaders });
        const retry = (ctx) => {
            // handles setting the proper timeout for a retry
            const setRetry = (response) => {
                let delay;
                if (response.headers.has("Retry-After")) {
                    // if we have gotten a header, use that value as the delay value
                    delay = parseInt(response.headers.get("Retry-After"), 10);
                }
                else {
                    // grab our current delay
                    delay = ctx.delay;
                    // Increment our counters.
                    ctx.delay *= 2;
                }
                ctx.attempts++;
                // If we have exceeded the retry count, reject.
                if (ctx.retryCount <= ctx.attempts) {
                    ctx.reject(Error(`Retry count exceeded (${ctx.retryCount}) for request. Response status: [${response.status}] ${response.statusText}`));
                }
                else {
                    // Set our retry timeout for {delay} milliseconds.
                    setTimeout(getCtxCallback(this, retry, ctx), delay);
                }
            };
            // send the actual request
            this._impl.fetch(url, options).then((response) => {
                if (response.status === 429) {
                    // we have been throttled
                    setRetry(response);
                }
                else {
                    ctx.resolve(response);
                }
            }).catch((response) => {
                if (response.status === 503) {
                    // http status code 503, we can retry this
                    setRetry(response);
                }
                else {
                    ctx.reject(response);
                }
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
        const opts = extend(options, { method: "GET" });
        return this.fetch(url, opts);
    }
    post(url, options = {}) {
        const opts = extend(options, { method: "POST" });
        return this.fetch(url, opts);
    }
    patch(url, options = {}) {
        const opts = extend(options, { method: "PATCH" });
        return this.fetch(url, opts);
    }
    delete(url, options = {}) {
        const opts = extend(options, { method: "DELETE" });
        return this.fetch(url, opts);
    }
}

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

/**
 * Ensures that a given url is absolute for the current web based on context
 *
 * @param candidateUrl The url to make absolute
 *
 */
function toAbsoluteUrl(candidateUrl) {
    return new Promise((resolve) => {
        if (isUrlAbsolute(candidateUrl)) {
            // if we are already absolute, then just return the url
            return resolve(candidateUrl);
        }
        if (SPRuntimeConfig.baseUrl !== null) {
            // base url specified either with baseUrl of spfxContext config property
            return resolve(combine(SPRuntimeConfig.baseUrl, candidateUrl));
        }
        if (global$1._spPageContextInfo !== undefined) {
            // operating in classic pages
            if (hOP(global$1._spPageContextInfo, "webAbsoluteUrl")) {
                return resolve(combine(global$1._spPageContextInfo.webAbsoluteUrl, candidateUrl));
            }
            else if (hOP(global$1._spPageContextInfo, "webServerRelativeUrl")) {
                return resolve(combine(global$1._spPageContextInfo.webServerRelativeUrl, candidateUrl));
            }
        }
        // does window.location exist and have a certain path part in it?
        if (global$1.location !== undefined) {
            const baseUrl = global$1.location.toString().toLowerCase();
            ["/_layouts/", "/siteassets/"].forEach((s) => {
                const index = baseUrl.indexOf(s);
                if (index > 0) {
                    return resolve(combine(baseUrl.substr(0, index), candidateUrl));
                }
            });
        }
        return resolve(candidateUrl);
    });
}

function metadata(type) {
    return {
        "__metadata": { "type": type },
    };
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
        this._forceCaching = false;
        if (typeof baseUrl === "string") {
            // we need to do some extra parsing to get the parent url correct if we are
            // being created from just a string.
            if (isUrlAbsolute(baseUrl) || baseUrl.lastIndexOf("/") < 0) {
                this._parentUrl = baseUrl;
                this._url = combine(baseUrl, path);
            }
            else if (baseUrl.lastIndexOf("/") > baseUrl.lastIndexOf("(")) {
                // .../items(19)/fields
                const index = baseUrl.lastIndexOf("/");
                this._parentUrl = baseUrl.slice(0, index);
                path = combine(baseUrl.slice(index), path);
                this._url = combine(this._parentUrl, path);
            }
            else {
                // .../items(19)
                const index = baseUrl.lastIndexOf("(");
                this._parentUrl = baseUrl.slice(0, index);
                this._url = combine(baseUrl, path);
            }
        }
        else {
            this.extend(baseUrl, path);
            const target = baseUrl.query.get("@target");
            if (target !== undefined) {
                this.query.set("@target", target);
            }
        }
    }
    /**
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new SharePointQueryable
     */
    as(factory) {
        const o = new factory(this._url, null);
        return extend(o, this, true);
    }
    /**
     * Gets the full url with query information
     *
     */
    toUrlAndQuery() {
        const aliasedParams = new Map(this.query);
        let url = this.toUrl().replace(/'!(@.*?)::(.*?)'/ig, (match, labelName, value) => {
            Logger.write(`Rewriting aliased parameter from match ${match} to label: ${labelName} value: ${value}`, 0 /* Verbose */);
            aliasedParams.set(labelName, `'${value}'`);
            return labelName;
        });
        if (aliasedParams.size > 0) {
            const char = url.indexOf("?") > -1 ? "&" : "?";
            url += `${char}${Array.from(aliasedParams).map((v) => v[0] + "=" + v[1]).join("&")}`;
        }
        return url;
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects) {
        if (selects.length > 0) {
            this.query.set("$select", selects.join(","));
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
            this.query.set("$expand", expands.join(","));
        }
        return this;
    }
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    getParent(factory, baseUrl = this.parentUrl, path, batch) {
        let parent = new factory(baseUrl, path).configureFrom(this);
        const t = "@target";
        if (this.query.has(t)) {
            parent.query.set(t, this.query.get(t));
        }
        if (batch !== undefined) {
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
        const clone = super._clone(new factory(this, additionalPath), { includeBatch });
        // handle sp specific clone actions
        const t = "@target";
        if (this.query.has(t)) {
            clone.query.set(t, this.query.get(t));
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
        const dependencyDispose = this.hasBatch ? this._batchDependency : () => { return; };
        return toAbsoluteUrl(this.toUrlAndQuery()).then(url => {
            mergeOptions(options, this._options);
            // build our request context
            const context = {
                batch: this.batch,
                batchDependency: dependencyDispose,
                cachingOptions: this._cachingOptions,
                clientFactory: () => new SPHttpClient(),
                isBatched: this.hasBatch,
                isCached: this._forceCaching || (this._useCaching && /^get$/i.test(verb)),
                options: options,
                parser: parser,
                pipeline: pipeline,
                requestAbsoluteUrl: url,
                requestId: getGUID(),
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
        this.query.set("$filter", filter);
        return this;
    }
    /**
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    orderBy(orderBy, ascending = true) {
        const o = "$orderby";
        const query = this.query.has(o) ? this.query.get(o).split(",") : [];
        query.push(`${orderBy} ${ascending ? "asc" : "desc"}`);
        this.query.set(o, query.join(","));
        return this;
    }
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    skip(skip) {
        this.query.set("$skip", skip.toString());
        return this;
    }
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top) {
        this.query.set("$top", top.toString());
        return this;
    }
}
/**
 * Represents an instance that can be selected
 *
 */
class SharePointQueryableInstance extends SharePointQueryable {
    /**
     * Curries the update function into the common pieces
     *
     * @param type
     * @param mapper
     */
    _update(type, mapper) {
        return (props) => this.postCore({
            body: jsS(extend(metadata(type), props)),
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((d) => mapper(d, props));
    }
    /**
    * Deletes this instance
    *
    */
    _delete() {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    /**
     * Deletes this instance with an etag value in the headers
     *
     * @param eTag eTag to delete
     */
    _deleteWithETag(eTag = "*") {
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
}
/**
 * Decorator used to specify the default path for SharePointQueryable objects
 *
 * @param path
 */
function defaultPath(path) {
    return function (target) {
        return class extends target {
            constructor(...args) {
                super(args[0], args.length > 1 && args[1] !== undefined ? args[1] : path);
            }
        };
    };
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var SiteUsers_1;
/**
 * Describes a collection of all site collection users
 *
 */
let SiteUsers = SiteUsers_1 = class SiteUsers extends SharePointQueryableCollection {
    /**
     * Gets a user from the collection by id
     *
     * @param id The id of the user to retrieve
     */
    getById(id) {
        return new SiteUser(this, `getById(${id})`);
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
     * Gets a user from the collection by login name
     *
     * @param loginName The login name of the user to retrieve
     */
    getByLoginName(loginName) {
        const su = new SiteUser(this);
        su.concat(`('!@v::${encodeURIComponent(loginName)}')`);
        return su;
    }
    /**
     * Removes a user from the collection by id
     *
     * @param id The id of the user to remove
     */
    removeById(id) {
        return this.clone(SiteUsers_1, `removeById(${id})`).postCore();
    }
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user to remove
     */
    removeByLoginName(loginName) {
        const o = this.clone(SiteUsers_1, `removeByLoginName(@v)`);
        o.query.set("@v", `'${encodeURIComponent(loginName)}'`);
        return o.postCore();
    }
    /**
     * Adds a user to a group
     *
     * @param loginName The login name of the user to add to the group
     *
     */
    add(loginName) {
        return this.clone(SiteUsers_1, null).postCore({
            body: jsS(extend(metadata("SP.User"), { LoginName: loginName })),
        }).then(() => this.getByLoginName(loginName));
    }
};
SiteUsers = SiteUsers_1 = __decorate([
    defaultPath("siteusers")
], SiteUsers);
/**
 * Base class for a user
 *
 */
class UserBase extends SharePointQueryableInstance {
    /**
     * Gets the groups for this user
     *
     */
    get groups() {
        return new SiteGroups(this, "groups");
    }
}
/**
 * Describes a single user
 *
 */
class SiteUser extends UserBase {
    constructor() {
        super(...arguments);
        /**
        * Updates this user instance with the supplied properties
        *
        * @param properties A plain object of property names and values to update for the user
        */
        this.update = this._update("SP.User", data => ({ data, user: this }));
        /**
         * Delete this user
         *
         */
        this.delete = this._delete;
    }
}
/**
 * Represents the current user
 */
let CurrentUser = class CurrentUser extends UserBase {
};
CurrentUser = __decorate([
    defaultPath("currentuser")
], CurrentUser);

var SiteGroups_1;
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
let SiteGroups = SiteGroups_1 = class SiteGroups extends SharePointQueryableCollection {
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
     * Adds a new group to the site collection
     *
     * @param props The group properties object of property names and values to be set for the group
     */
    add(properties) {
        const postBody = jsS(extend(metadata("SP.Group"), properties));
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
     * Removes the group with the specified member id from the collection
     *
     * @param id The id of the group to remove
     */
    removeById(id) {
        return this.clone(SiteGroups_1, `removeById('${id}')`).postCore();
    }
    /**
     * Removes the cross-site group with the specified name from the collection
     *
     * @param loginName The name of the group to remove
     */
    removeByLoginName(loginName) {
        return this.clone(SiteGroups_1, `removeByLoginName('${loginName}')`).postCore();
    }
};
SiteGroups = SiteGroups_1 = __decorate([
    defaultPath("sitegroups")
], SiteGroups);
/**
 * Describes a single group
 *
 */
class SiteGroup extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        this.update = this._update("SP.Group", (d, p) => {
            let retGroup = this;
            if (hOP(p, "Title")) {
                /* tslint:disable-next-line no-string-literal */
                retGroup = this.getParent(SiteGroup, this.parentUrl, `getByName('${p["Title"]}')`);
            }
            return {
                data: d,
                group: retGroup,
            };
        });
    }
    /**
     * Gets the users for this group
     *
     */
    get users() {
        return new SiteUsers(this, "users");
    }
}

var RoleAssignments_1;
/**
 * Describes a set of role assignments for the current scope
 *
 */
let RoleAssignments = RoleAssignments_1 = class RoleAssignments extends SharePointQueryableCollection {
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
    /**
     * Adds a new role assignment with the specified principal and role definitions to the collection
     *
     * @param principalId The id of the user or group to assign permissions to
     * @param roleDefId The id of the role definition that defines the permissions to assign
     *
     */
    add(principalId, roleDefId) {
        return this.clone(RoleAssignments_1, `addroleassignment(principalid=${principalId}, roledefid=${roleDefId})`).postCore();
    }
    /**
     * Removes the role assignment with the specified principal and role definition from the collection
     *
     * @param principalId The id of the user or group in the role assignment
     * @param roleDefId The id of the role definition in the role assignment
     *
     */
    remove(principalId, roleDefId) {
        return this.clone(RoleAssignments_1, `removeroleassignment(principalid=${principalId}, roledefid=${roleDefId})`).postCore();
    }
};
RoleAssignments = RoleAssignments_1 = __decorate([
    defaultPath("roleassignments")
], RoleAssignments);
/**
 * Describes a role assignment
 *
 */
class RoleAssignment extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
         * Deletes this role assignment
         *
         */
        this.delete = this._delete;
    }
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
}
/**
 * Describes a collection of role definitions
 *
 */
let RoleDefinitions = class RoleDefinitions extends SharePointQueryableCollection {
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
        const postBody = jsS({
            BasePermissions: {
                High: basePermissions.High.toString(),
                Low: basePermissions.Low.toString(),
            },
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
};
RoleDefinitions = __decorate([
    defaultPath("roledefinitions")
], RoleDefinitions);
/**
 * Describes a role definition
 *
 */
class RoleDefinition extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
         * Deletes this role definition
         *
         */
        this.delete = this._delete;
        /* tslint:enable */
    }
    /**
     * Updates this role definition with the supplied properties
     *
     * @param properties A plain object hash of values to update for the role definition
     */
    /* tslint:disable no-string-literal */
    update(properties) {
        if (hOP(properties, "BasePermissions") !== undefined) {
            properties["BasePermissions"] = extend({ __metadata: { type: "SP.BasePermissions" } }, {
                High: properties["BasePermissions"].High.toString(),
                Low: properties["BasePermissions"].Low.toString(),
            });
        }
        const postBody = jsS(extend(metadata("SP.RoleDefinition"), properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            let retDef = this;
            if (hOP(properties, "Name")) {
                const parent = this.getParent(RoleDefinitions, this.parentUrl, "");
                retDef = parent.getByName(properties["Name"]);
            }
            return {
                data: data,
                definition: retDef,
            };
        });
    }
}
/**
 * Describes the role definitons bound to a role assignment object
 *
 */
let RoleDefinitionBindings = class RoleDefinitionBindings extends SharePointQueryableCollection {
};
RoleDefinitionBindings = __decorate([
    defaultPath("roledefinitionbindings")
], RoleDefinitionBindings);

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
var DateTimeFieldFriendlyFormatType;
(function (DateTimeFieldFriendlyFormatType) {
    DateTimeFieldFriendlyFormatType[DateTimeFieldFriendlyFormatType["Unspecified"] = 0] = "Unspecified";
    DateTimeFieldFriendlyFormatType[DateTimeFieldFriendlyFormatType["Disabled"] = 1] = "Disabled";
    DateTimeFieldFriendlyFormatType[DateTimeFieldFriendlyFormatType["Relative"] = 2] = "Relative";
})(DateTimeFieldFriendlyFormatType || (DateTimeFieldFriendlyFormatType = {}));
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
/**
 * Specifies the type of a principal.
 */
/* tslint:disable:no-bitwise */
var PrincipalType$1;
(function (PrincipalType) {
    /**
     * Enumeration whose value specifies no principal type.
     */
    PrincipalType[PrincipalType["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies a user as the principal type.
     */
    PrincipalType[PrincipalType["User"] = 1] = "User";
    /**
     * Enumeration whose value specifies a distribution list as the principal type.
     */
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    /**
     * Enumeration whose value specifies a security group as the principal type.
     */
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    /**
     * Enumeration whose value specifies a group as the principal type.
     */
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    /**
     * Enumeration whose value specifies all principal types.
     */
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType$1 || (PrincipalType$1 = {}));
/* tslint:enable:no-bitwise */
/**
 * Specifies the source of a principal.
 */
/* tslint:disable:no-bitwise */
var PrincipalSource;
(function (PrincipalSource) {
    /**
     * Enumeration whose value specifies no principal source.
     */
    PrincipalSource[PrincipalSource["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies user information list as the principal source.
     */
    PrincipalSource[PrincipalSource["UserInfoList"] = 1] = "UserInfoList";
    /**
     * Enumeration whose value specifies Active Directory as the principal source.
     */
    PrincipalSource[PrincipalSource["Windows"] = 2] = "Windows";
    /**
     * Enumeration whose value specifies the current membership provider as the principal source.
     */
    PrincipalSource[PrincipalSource["MembershipProvider"] = 4] = "MembershipProvider";
    /**
     * Enumeration whose value specifies the current role provider as the principal source.
     */
    PrincipalSource[PrincipalSource["RoleProvider"] = 8] = "RoleProvider";
    /**
     * Enumeration whose value specifies all principal sources.
     */
    PrincipalSource[PrincipalSource["All"] = 15] = "All";
})(PrincipalSource || (PrincipalSource = {}));
/* tslint:enable:no-bitwise */
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
    RenderListDataOptions[RenderListDataOptions["ListContentType"] = 16] = "ListContentType";
    RenderListDataOptions[RenderListDataOptions["FileSystemItemId"] = 32] = "FileSystemItemId";
    RenderListDataOptions[RenderListDataOptions["ClientFormSchema"] = 64] = "ClientFormSchema";
    RenderListDataOptions[RenderListDataOptions["QuickLaunch"] = 128] = "QuickLaunch";
    RenderListDataOptions[RenderListDataOptions["Spotlight"] = 256] = "Spotlight";
    RenderListDataOptions[RenderListDataOptions["Visualization"] = 512] = "Visualization";
    RenderListDataOptions[RenderListDataOptions["ViewMetadata"] = 1024] = "ViewMetadata";
    RenderListDataOptions[RenderListDataOptions["DisableAutoHyperlink"] = 2048] = "DisableAutoHyperlink";
    RenderListDataOptions[RenderListDataOptions["EnableMediaTAUrls"] = 4096] = "EnableMediaTAUrls";
    RenderListDataOptions[RenderListDataOptions["ParentInfo"] = 8192] = "ParentInfo";
    RenderListDataOptions[RenderListDataOptions["PageContextInfo"] = 16384] = "PageContextInfo";
    RenderListDataOptions[RenderListDataOptions["ClientSideComponentManifest"] = 32768] = "ClientSideComponentManifest";
})(RenderListDataOptions || (RenderListDataOptions = {}));
var FieldUserSelectionMode;
(function (FieldUserSelectionMode) {
    FieldUserSelectionMode[FieldUserSelectionMode["PeopleAndGroups"] = 1] = "PeopleAndGroups";
    FieldUserSelectionMode[FieldUserSelectionMode["PeopleOnly"] = 0] = "PeopleOnly";
})(FieldUserSelectionMode || (FieldUserSelectionMode = {}));
var ChoiceFieldFormatType;
(function (ChoiceFieldFormatType) {
    ChoiceFieldFormatType[ChoiceFieldFormatType["Dropdown"] = 0] = "Dropdown";
    ChoiceFieldFormatType[ChoiceFieldFormatType["RadioButtons"] = 1] = "RadioButtons";
})(ChoiceFieldFormatType || (ChoiceFieldFormatType = {}));
/**
 * Specifies the originating zone of a request received.
 */
var UrlZone;
(function (UrlZone) {
    /**
     * Specifies the default zone used for requests unless another zone is specified.
     */
    UrlZone[UrlZone["DefaultZone"] = 0] = "DefaultZone";
    /**
     * Specifies an intranet zone.
     */
    UrlZone[UrlZone["Intranet"] = 1] = "Intranet";
    /**
     * Specifies an Internet zone.
     */
    UrlZone[UrlZone["Internet"] = 2] = "Internet";
    /**
     * Specifies a custom zone.
     */
    UrlZone[UrlZone["Custom"] = 3] = "Custom";
    /**
     * Specifies an extranet zone.
     */
    UrlZone[UrlZone["Extranet"] = 4] = "Extranet";
})(UrlZone || (UrlZone = {}));

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
        q.query.set("@user", `'${encodeURIComponent(loginName)}'`);
        return q.get().then(r => {
            // handle verbose mode
            return hOP(r, "GetUserEffectivePermissions") ? r.GetUserEffectivePermissions : r;
        });
    }
    /**
     * Gets the effective permissions for the current user
     */
    getCurrentUserEffectivePermissions() {
        // remove need to reference Web here, which created a circular build issue
        const w = new SharePointQueryableInstance("_api/web", "currentuser");
        return w.configureFrom(this).select("LoginName").get().then(user => {
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
            body: jsS({
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
        const userStr = jsS(loginNames.map(login => { return { Key: login }; }));
        const roleFilter = role === SharingRole.Edit ? RoleType.Contributor : RoleType.Reader;
        // start by looking up the role definition id we need to set the roleValue
        // remove need to reference Web here, which created a circular build issue
        const w = new SharePointQueryableCollection("_api/web", "roledefinitions");
        return w.select("Id").filter(`RoleTypeKind eq ${roleFilter}`).get().then((def) => {
            if (!Array.isArray(def) || def.length < 1) {
                throw Error(`Could not locate a role defintion with RoleTypeKind ${roleFilter}`);
            }
            let postBody = {
                includeAnonymousLinkInEmail: requireSignin,
                peoplePickerInput: userStr,
                propagateAcl: propagateAcl,
                roleValue: `role:${def[0].Id}`,
                useSimplifiedRoles: true,
            };
            if (emailData !== undefined) {
                postBody = extend(postBody, {
                    emailBody: emailData.body,
                    emailSubject: emailData.subject !== undefined ? emailData.subject : "",
                    sendEmail: true,
                });
            }
            return this.clone(SharePointQueryableShareable, "shareObject").postCore({
                body: jsS(postBody),
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
        options = extend(options, {
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
            const userStr = jsS(options.loginNames.map(login => { return { Key: login }; }));
            let postBody = {
                peoplePickerInput: userStr,
                roleValue: roleValue,
                url: options.url,
            };
            if (options.emailData !== undefined && options.emailData !== null) {
                postBody = extend(postBody, {
                    emailBody: options.emailData.body,
                    emailSubject: options.emailData.subject !== undefined ? options.emailData.subject : "Shared with you.",
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
            body: jsS({
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
            body: jsS({
                recipients: recipients,
            }),
        });
    }
    /**
     * Get Sharing Information.
     *
     * @param request The SharingInformationRequest Object.
     * @param expands Expand more fields.
     *
     */
    getSharingInformation(request = null, expands) {
        const q = this.clone(SharePointQueryableShareable, "getSharingInformation");
        return q.expand.apply(q, expands).postCore({
            body: jsS({
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
            body: jsS({
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
            body: jsS({ linkKind: kind }),
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
            body: jsS({ linkKind: kind, shareId: shareId }),
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
        if (group !== undefined && group !== null) {
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
                    throw Error("Could not determine role value for supplied value. Contributor, Reader, and Guest are supported");
            }
        }
        else {
            const roleFilter = role === SharingRole.Edit ? RoleType.Contributor : RoleType.Reader;
            // remove need to reference Web here, which created a circular build issue
            const roleDefs = new SharePointQueryableCollection("_api/web", "roledefinitions");
            return roleDefs.select("Id").top(1).filter(`RoleTypeKind eq ${roleFilter}`).get().then(def => {
                if (def.length < 1) {
                    throw Error("Could not locate associated role definition for supplied role. Edit and View are supported");
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
                body: jsS(options),
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
            return this.shareObject(combine(url, "/_layouts/15/aclinv.aspx?forSharing=1&mbypass=1"), loginNames, role, emailData);
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
     * @param expands Expand more fields.
     *
     */
    getSharingInformation(request = null, expands) {
        return this.clone(SharePointQueryableShareable, null).getSharingInformation(request, expands);
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
     * @param expands Expand more fields.
     *
     */
    getSharingInformation(request = null, expands) {
        const dependency = this.addBatchDependency();
        return this.getShareable().then(shareable => {
            dependency();
            return shareable.getSharingInformation(request, expands);
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
        return this.clone(SharePointQueryableShareableFile, "listItemAllFields", false).select("odata.id").get().then(d => {
            let shareable = new SharePointQueryableShareable(odataUrlFrom(d));
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
            body: jsS({ webPartId: id }),
        });
    }
    /**
     * Imports a webpart
     *
     * @param xml webpart definition which must be valid XML in the .dwp or .webpart format
     */
    import(xml) {
        return this.clone(LimitedWebPartManager, "ImportWebPart").postCore({
            body: jsS({ webPartXml: xml }),
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
let WebPart = class WebPart extends SharePointQueryableInstance {
};
WebPart = __decorate([
    defaultPath("webpart")
], WebPart);

var Folders_1;
/**
 * Describes a collection of Folder objects
 *
 */
let Folders = Folders_1 = class Folders extends SharePointQueryableCollection {
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
        return this.clone(Folders_1, `add('${url}')`).postCore().then((response) => {
            return {
                data: response,
                folder: this.getByName(url),
            };
        });
    }
};
Folders = Folders_1 = __decorate([
    defaultPath("folders")
], Folders);
/**
 * Describes a single Folder instance
 *
 */
class Folder extends SharePointQueryableShareableFolder {
    constructor() {
        super(...arguments);
        this.update = this._update("SP.Folder", data => ({ data, folder: this }));
    }
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
        return new SharePointQueryableInstance(this, "listItemAllFields");
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
            return extend(new Item(odataUrlFrom(d)), d);
        });
    }
    /**
     * Moves a folder to destination path
     *
     * @param destUrl Absolute or relative URL of the destination path
     */
    moveTo(destUrl) {
        return this.select("ServerRelativeUrl").get().then(({ ServerRelativeUrl: srcUrl }) => {
            const client = new SPHttpClient();
            const webBaseUrl = this.toUrl().split("/_api")[0];
            const hostUrl = webBaseUrl.replace("://", "___").split("/")[0].replace("___", "://");
            const methodUrl = `${webBaseUrl}/_api/SP.MoveCopyUtil.MoveFolder()`;
            return client.post(methodUrl, {
                body: jsS({
                    destUrl: destUrl.indexOf("http") === 0 ? destUrl : `${hostUrl}${destUrl}`,
                    srcUrl: `${hostUrl}${srcUrl}`,
                }),
            }).then(r => r.json());
        });
    }
}

var ContentTypes_1;
/**
 * Describes a collection of content types
 *
 */
let ContentTypes = ContentTypes_1 = class ContentTypes extends SharePointQueryableCollection {
    /**
     * Adds an existing contenttype to a content type collection
     *
     * @param contentTypeId in the following format, for example: 0x010102
     */
    addAvailableContentType(contentTypeId) {
        const postBody = jsS({
            "contentTypeId": contentTypeId,
        });
        return this.clone(ContentTypes_1, "addAvailableContentType").postCore({ body: postBody }).then((data) => {
            return {
                contentType: this.getById(data.id),
                data: data,
            };
        });
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
        const postBody = jsS(Object.assign(metadata("SP.ContentType"), {
            "Description": description,
            "Group": group,
            "Id": { "StringValue": id },
            "Name": name,
        }, additionalSettings));
        return this.postCore({ body: postBody }).then((data) => {
            return { contentType: this.getById(data.id), data: data };
        });
    }
};
ContentTypes = ContentTypes_1 = __decorate([
    defaultPath("contenttypes")
], ContentTypes);
/**
 * Describes a single ContentType instance
 *
 */
class ContentType extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
         * Delete this content type
         */
        this.delete = this._delete;
    }
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
}
/**
 * Represents a collection of field link instances
 */
let FieldLinks = class FieldLinks extends SharePointQueryableCollection {
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
};
FieldLinks = __decorate([
    defaultPath("fieldlinks")
], FieldLinks);
/**
 * Represents a field link instance
 */
class FieldLink extends SharePointQueryableInstance {
}

var AttachmentFiles_1;
/**
 * Describes a collection of Item objects
 *
 */
let AttachmentFiles = AttachmentFiles_1 = class AttachmentFiles extends SharePointQueryableCollection {
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
        return this.clone(AttachmentFiles_1, `add(FileName='${name}')`, false).postCore({
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
     * @param files The collection of files to add
     */
    addMultiple(files) {
        // add the files in series so we don't get update conflicts
        return files.reduce((chain, file) => chain.then(() => this.clone(AttachmentFiles_1, `add(FileName='${file.name}')`, false).postCore({
            body: file.content,
        })), Promise.resolve());
    }
    /**
     * Delete multiple attachments from the collection. Not supported for batching.
     *
     * @param files The collection of files to delete
     */
    deleteMultiple(...files) {
        return files.reduce((chain, file) => chain.then(() => this.getByName(file).delete()), Promise.resolve());
    }
    /**
     * Delete multiple attachments from the collection and send to recycle bin. Not supported for batching.
     *
     * @param files The collection of files to be deleted and sent to recycle bin
     */
    recycleMultiple(...files) {
        return files.reduce((chain, file) => chain.then(() => this.getByName(file).recycle()), Promise.resolve());
    }
};
AttachmentFiles = AttachmentFiles_1 = __decorate([
    defaultPath("AttachmentFiles")
], AttachmentFiles);
/**
 * Describes a single attachment file instance
 *
 */
class AttachmentFile extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        this.delete = this._deleteWithETag;
    }
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
     * Delete this attachment file and send it to recycle bin
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    recycle(eTag = "*") {
        return this.clone(AttachmentFile, "recycleObject").postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }
    // /**
    //  * Delete this attachment file
    //  *
    //  * @param eTag Value used in the IF-Match header, by default "*"
    //  */
    // public delete(eTag = "*"): Promise<void> {
    //     return this.postCore({
    //         headers: {
    //             "IF-Match": eTag,
    //             "X-HTTP-Method": "DELETE",
    //         },
    //     });
    // }
    getParsed(parser) {
        return this.clone(AttachmentFile, "$value", false).get(parser);
    }
}

var Views_1, ViewFields_1;
/**
 * Describes the views available in the current context
 *
 */
let Views = Views_1 = class Views extends SharePointQueryableCollection {
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
        const postBody = jsS(Object.assign(metadata("SP.View"), {
            "PersonalView": personalView,
            "Title": title,
        }, additionalSettings));
        return this.clone(Views_1, null).postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                view: this.getById(data.Id),
            };
        });
    }
};
Views = Views_1 = __decorate([
    defaultPath("views")
], Views);
/**
 * Describes a single View instance
 *
 */
class View extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
         * Updates this view intance with the supplied properties
         *
         * @param properties A plain object hash of values to update for the view
         */
        this.update = this._update("SP.View", data => ({ data, view: this }));
        /**
         * Delete this view
         *
         */
        this.delete = this._delete;
    }
    get fields() {
        return new ViewFields(this);
    }
    /**
     * Returns the list view as HTML.
     *
     */
    renderAsHtml() {
        return this.clone(SharePointQueryable, "renderashtml").get();
    }
    /**
     * Sets the view schema
     *
     * @param viewXml The view XML to set
     */
    setViewXml(viewXml) {
        return this.clone(View, "SetViewXml").postCore({
            body: jsS({
                viewXml,
            }),
        });
    }
}
let ViewFields = ViewFields_1 = class ViewFields extends SharePointQueryableCollection {
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
        return this.clone(ViewFields_1, `addviewfield('${fieldTitleOrInternalName}')`).postCore();
    }
    /**
     * Moves the field with the specified field internal name to the specified position in the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to move.
     * @param index The zero-based index of the new position for the field.
     */
    move(fieldInternalName, index) {
        return this.clone(ViewFields_1, "moveviewfieldto").postCore({
            body: jsS({ "field": fieldInternalName, "index": index }),
        });
    }
    /**
     * Removes all the fields from the collection.
     */
    removeAll() {
        return this.clone(ViewFields_1, "removeallviewfields").postCore();
    }
    /**
     * Removes the field with the specified field internal name from the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
     */
    remove(fieldInternalName) {
        return this.clone(ViewFields_1, `removeviewfield('${fieldInternalName}')`).postCore();
    }
};
ViewFields = ViewFields_1 = __decorate([
    defaultPath("viewfields")
], ViewFields);

var Fields_1;
/**
 * Describes a collection of Field objects
 *
 */
let Fields = Fields_1 = class Fields extends SharePointQueryableCollection {
    /**
     * Gets a field from the collection by id
     *
     * @param id The Id of the list
     */
    getById(id) {
        const f = new Field(this);
        f.concat(`('${id}')`);
        return f;
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
        const postBody = jsS({
            "parameters": extend(metadata("SP.XmlSchemaFieldCreationInformation"), info),
        });
        return this.clone(Fields_1, "createfieldasxml").postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                field: this.getById(data.Id),
            };
        });
    }
    /**
     * Adds a new field to the collection
     *
     * @param title The new field's title
     * @param fieldType The new field's type (ex: SP.FieldText)
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    add(title, fieldType, properties) {
        const postBody = jsS(Object.assign(metadata(fieldType), {
            "Title": title,
        }, properties));
        return this.clone(Fields_1, null).postCore({ body: postBody }).then((data) => {
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
        return this.add(title, "SP.FieldText", extend(props, properties));
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
        return this.add(title, "SP.FieldCalculated", extend(props, properties));
    }
    /**
     * Adds a new SP.FieldDateTime to the collection
     *
     * @param title The field title
     * @param displayFormat The format of the date and time that is displayed in the field.
     * @param calendarType Specifies the calendar type of the field.
     * @param friendlyDisplayFormat The type of friendly display format that is used in the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addDateTime(title, displayFormat = DateTimeFieldFormatType.DateOnly, calendarType = CalendarType.Gregorian, friendlyDisplayFormat = DateTimeFieldFriendlyFormatType.Unspecified, properties) {
        const props = {
            DateTimeCalendarType: calendarType,
            DisplayFormat: displayFormat,
            FieldTypeKind: 4,
            FriendlyDisplayFormat: friendlyDisplayFormat,
        };
        return this.add(title, "SP.FieldDateTime", extend(props, properties));
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
        if (minValue !== undefined) {
            props = extend({ MinimumValue: minValue }, props);
        }
        if (maxValue !== undefined) {
            props = extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldNumber", extend(props, properties));
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
        if (minValue !== undefined) {
            props = extend({ MinimumValue: minValue }, props);
        }
        if (maxValue !== undefined) {
            props = extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldCurrency", extend(props, properties));
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
        return this.add(title, "SP.FieldMultiLineText", extend(props, properties));
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
        return this.add(title, "SP.FieldUrl", extend(props, properties));
    }
    /** Adds a user field to the colleciton
    *
    * @param title The new field's title
    * @param selectionMode The selection mode of the field
    * @param selectionGroup Value that specifies the identifier of the SharePoint group whose members can be selected as values of the field
    * @param properties
    */
    addUser(title, selectionMode, properties) {
        const props = {
            FieldTypeKind: 20,
            SelectionMode: selectionMode,
        };
        return this.add(title, "SP.FieldUser", extend(props, properties));
    }
    /**
     * Adds a SP.FieldLookup to the collection
     *
     * @param title The new field's title
     * @param lookupListId The guid id of the list where the source of the lookup is found
     * @param lookupFieldName The internal name of the field in the source list
     * @param properties Set of additional properties to set on the new field
     */
    addLookup(title, lookupListId, lookupFieldName, properties) {
        const props = extend({
            FieldTypeKind: 7,
            LookupFieldName: lookupFieldName,
            LookupListId: lookupListId,
            Title: title,
        }, properties);
        const postBody = jsS({
            "parameters": extend(metadata("SP.FieldCreationInformation"), props),
        });
        return this.clone(Fields_1, "addfield").postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                field: this.getById(data.Id),
            };
        });
    }
    /**
     * Adds a new SP.FieldChoice to the collection
     *
     * @param title The field title.
     * @param choices The choices for the field.
     * @param format The display format of the available options for the field.
     * @param fillIn Specifies whether the field allows fill-in values.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addChoice(title, choices, format = ChoiceFieldFormatType.Dropdown, fillIn, properties) {
        const props = {
            Choices: {
                results: choices,
            },
            EditFormat: format,
            FieldTypeKind: 6,
            FillInChoice: fillIn,
        };
        return this.add(title, "SP.FieldChoice", extend(props, properties));
    }
    /**
     * Adds a new SP.FieldMultiChoice to the collection
     *
     * @param title The field title.
     * @param choices The choices for the field.
     * @param fillIn Specifies whether the field allows fill-in values.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addMultiChoice(title, choices, fillIn, properties) {
        const props = {
            Choices: {
                results: choices,
            },
            FieldTypeKind: 15,
            FillInChoice: fillIn,
        };
        return this.add(title, "SP.FieldMultiChoice", extend(props, properties));
    }
    /**
     * Adds a new SP.FieldBoolean to the collection
     *
     * @param title The field title.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addBoolean(title, properties) {
        const props = {
            FieldTypeKind: 8,
        };
        return this.add(title, "SP.Field", extend(props, properties));
    }
    /**
    * Creates a secondary (dependent) lookup field, based on the Id of the primary lookup field.
    *
    * @param displayName The display name of the new field.
    * @param primaryLookupFieldId The guid of the primary Lookup Field.
    * @param showField Which field to show from the lookup list.
    */
    addDependentLookupField(displayName, primaryLookupFieldId, showField) {
        return this.clone(Fields_1, `adddependentlookupfield(displayName='${displayName}', primarylookupfieldid='${primaryLookupFieldId}', showfield='${showField}')`)
            .postCore()
            .then(data => {
            return {
                data,
                field: this.getById(data.Id),
            };
        });
    }
    /**
     * Adds a new SP.FieldLocation to the collection
     *
     * @param title The field title.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addLocation(title, properties) {
        const props = { FieldTypeKind: 33 };
        return this.add(title, "SP.FieldLocation", extend(props, properties));
    }
};
Fields = Fields_1 = __decorate([
    defaultPath("fields")
], Fields);
/**
 * Describes a single of Field instance
 *
 */
class Field extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
         * Delete this fields
         *
         */
        this.delete = this._delete;
    }
    /**
     * Updates this field intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param fieldType The type value, required to update child field type properties
     */
    update(properties, fieldType = "SP.Field") {
        const postBody = jsS(extend(metadata(fieldType), properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                data,
                field: this,
            };
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
let Forms = class Forms extends SharePointQueryableCollection {
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
};
Forms = __decorate([
    defaultPath("forms")
], Forms);
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
let Subscriptions = class Subscriptions extends SharePointQueryableCollection {
    /**
     * Returns all the webhook subscriptions or the specified webhook subscription
     *
     * @param subscriptionId The id of a specific webhook subscription to retrieve, omit to retrieve all the webhook subscriptions
     */
    getById(subscriptionId) {
        const s = new Subscription(this);
        s.concat(`('${subscriptionId}')`);
        return s;
    }
    /**
     * Creates a new webhook subscription
     *
     * @param notificationUrl The url to receive the notifications
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months)
     * @param clientState A client specific string (optional)
     */
    add(notificationUrl, expirationDate, clientState) {
        const postBody = {
            "expirationDateTime": expirationDate,
            "notificationUrl": notificationUrl,
            "resource": this.toUrl(),
        };
        if (clientState) {
            postBody.clientState = clientState;
        }
        return this.postCore({ body: jsS(postBody), headers: { "Content-Type": "application/json" } }).then(result => {
            return { data: result, subscription: this.getById(result.id) };
        });
    }
};
Subscriptions = __decorate([
    defaultPath("subscriptions")
], Subscriptions);
/**
 * Describes a single webhook subscription instance
 *
 */
class Subscription extends SharePointQueryableInstance {
    /**
     * Renews this webhook subscription
     *
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months, optional)
     * @param notificationUrl The url to receive the notifications (optional)
     * @param clientState A client specific string (optional)
     */
    update(expirationDate, notificationUrl, clientState) {
        const postBody = {};
        if (expirationDate) {
            postBody.expirationDateTime = expirationDate;
        }
        if (notificationUrl) {
            postBody.notificationUrl = notificationUrl;
        }
        if (clientState) {
            postBody.clientState = clientState;
        }
        return this.patchCore({ body: jsS(postBody), headers: { "Content-Type": "application/json" } }).then(data => {
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

var UserCustomActions_1;
/**
 * Describes a collection of user custom actions
 *
 */
let UserCustomActions = UserCustomActions_1 = class UserCustomActions extends SharePointQueryableCollection {
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
        const postBody = jsS(extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
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
        return this.clone(UserCustomActions_1, "clear").postCore();
    }
};
UserCustomActions = UserCustomActions_1 = __decorate([
    defaultPath("usercustomactions")
], UserCustomActions);
/**
 * Describes a single user custom action
 *
 */
class UserCustomAction extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
        * Updates this user custom action with the supplied properties
        *
        * @param properties An information object of property names and values to update for this user custom action
        */
        this.update = this._update("SP.UserCustomAction", (data) => ({ data, action: this }));
    }
    /**
    * Removes this user custom action
    *
    */
    delete() {
        return super.deleteCore();
    }
}

var Lists_1;
/**
 * Describes a collection of List objects
 *
 */
let Lists = Lists_1 = class Lists extends SharePointQueryableCollection {
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
     * Gets a list from the collection by title
     *
     * @param title The title of the list
     */
    getByTitle(title) {
        return new List(this, `getByTitle('${title}')`);
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
        const addSettings = extend({
            "AllowContentTypes": enableContentTypes,
            "BaseTemplate": template,
            "ContentTypesEnabled": enableContentTypes,
            "Description": description,
            "Title": title,
            "__metadata": { "type": "SP.List" },
        }, additionalSettings);
        return this.postCore({ body: jsS(addSettings) }).then((data) => {
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
            throw Error("The ensure list method is not supported for use in a batch.");
        }
        return new Promise((resolve, reject) => {
            const addOrUpdateSettings = extend(additionalSettings, { Title: title, Description: description, ContentTypesEnabled: enableContentTypes }, true);
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
        return this.clone(Lists_1, "ensuresiteassetslibrary").postCore().then((json) => {
            return new List(odataUrlFrom(json));
        });
    }
    /**
     * Gets a list that is the default location for wiki pages.
     */
    ensureSitePagesLibrary() {
        return this.clone(Lists_1, "ensuresitepageslibrary").postCore().then((json) => {
            return new List(odataUrlFrom(json));
        });
    }
};
Lists = Lists_1 = __decorate([
    defaultPath("lists")
], Lists);
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
        const postBody = jsS(extend({
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
            if (hOP(properties, "Title")) {
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
            body: jsS({ "query": extend(metadata("SP.ChangeQuery"), query) }),
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
            body: jsS({ "query": extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) }),
        });
    }
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     */
    getListItemChangesSinceToken(query) {
        return this.clone(List, "getlistitemchangessincetoken").postCore({
            body: jsS({ "query": extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) }),
        }, { parse(r) { return r.text(); } });
    }
    /**
     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle() {
        return this.clone(List, "recycle").postCore().then(data => {
            if (hOP(data, "Recycle")) {
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
        q.query.set("@viewXml", `'${viewXml}'`);
        return q.postCore().then(data => {
            // data will be a string, so we parse it again
            return JSON.parse(hOP(data, "RenderListData") ? data.RenderListData : data);
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
            overrideParameters: extend(metadata("SP.RenderListDataOverrideParameters"), overrideParameters),
            parameters: extend(metadata("SP.RenderListDataParameters"), parameters),
        };
        return this.clone(List, "RenderListDataAsStream", true).postCore({
            body: jsS(postBody),
        });
    }
    /**
     * Gets the field values and field schema attributes for a list item.
     */
    renderListFormData(itemId, formId, mode) {
        return this.clone(List, `renderlistformdata(itemid=${itemId}, formid='${formId}', mode='${mode}')`).postCore().then(data => {
            // data will be a string, so we parse it again
            return JSON.parse(hOP(data, "RenderListFormData") ? data.RenderListFormData : data);
        });
    }
    /**
     * Reserves a list item ID for idempotent list item creation.
     */
    reserveListItemId() {
        return this.clone(List, "reservelistitemid").postCore().then(data => {
            if (hOP(data, "ReserveListItemId")) {
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
    /**
     * Creates an item using path (in a folder), validates and sets its field values.
     *
     * @param formValues The fields to change and their new values.
     * @param decodedUrl Path decoded url; folder's server relative path.
     * @param bNewDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     * @param checkInComment Optional check in comment.
     */
    addValidateUpdateItemUsingPath(formValues, decodedUrl, bNewDocumentUpdate = false, checkInComment) {
        return this.clone(List, "AddValidateUpdateItemUsingPath()").postCore({
            body: jsS({
                bNewDocumentUpdate,
                checkInComment,
                formValues,
                listItemCreateInfo: {
                    FolderPath: {
                        DecodedUrl: decodedUrl,
                        __metadata: { type: "SP.ResourcePath" },
                    },
                    __metadata: { type: "SP.ListItemCreationInformationUsingPath" },
                },
            }),
        }).then(res => {
            if (typeof res.AddValidateUpdateItemUsingPath !== "undefined") {
                return res.AddValidateUpdateItemUsingPath.results;
            }
            return res;
        });
    }
    /**
    * Gets the site script syntax (JSON) for the current list
    */
    getSiteScript() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootFolder = yield this.clone(List).rootFolder.select("ServerRelativeUrl").get();
            const absoluteListUrl = yield toAbsoluteUrl(rootFolder.ServerRelativeUrl);
            return new SiteScripts(this, "").getSiteScriptFromList(absoluteListUrl);
        });
    }
}

var Comments_1, Replies_1;
/**
 * Represents a Collection of comments
 */
let Comments = Comments_1 = class Comments extends SharePointQueryableCollection {
    /**
     * Adds a new comment to this collection
     *
     * @param info Comment information to add
     */
    add(info) {
        if (typeof info === "string") {
            info = { text: info };
        }
        const postBody = jsS(extend(metadata("Microsoft.SharePoint.Comments.comment"), info));
        return this.clone(Comments_1, null).postCore({ body: postBody }).then(d => {
            return extend(this.getById(d.id), d);
        });
    }
    /**
     * Gets a comment by id
     *
     * @param id Id of the comment to load
     */
    getById(id) {
        const c = new Comment(this);
        c.concat(`(${id})`);
        return c;
    }
    /**
     * Deletes all the comments in this collection
     */
    clear() {
        return this.clone(Comments_1, "DeleteAll").postCore();
    }
};
Comments = Comments_1 = __decorate([
    defaultPath("comments")
], Comments);
/**
 * Represents a comment
 */
class Comment extends SharePointQueryableInstance {
    get replies() {
        return new Replies(this);
    }
    /**
     * Likes the comment as the current user
     */
    like() {
        return this.clone(Comment, "Like").postCore();
    }
    /**
     * Unlikes the comment as the current user
     */
    unlike() {
        return this.clone(Comment, "Unlike").postCore();
    }
    /**
     * Deletes this comment
     */
    delete() {
        return this.deleteCore();
    }
}
/**
 * Represents a Collection of comments
 */
let Replies = Replies_1 = class Replies extends SharePointQueryableCollection {
    /**
     * Adds a new reply to this collection
     *
     * @param info Comment information to add
     */
    add(info) {
        if (typeof info === "string") {
            info = { text: info };
        }
        const postBody = jsS(extend(metadata("Microsoft.SharePoint.Comments.comment"), info));
        return this.clone(Replies_1, null).postCore({ body: postBody }).then(d => {
            return extend(new Comment(odataUrlFrom(d)), d);
        });
    }
};
Replies = Replies_1 = __decorate([
    defaultPath("replies")
], Replies);

var Items_1;
/**
 * Describes a collection of Item objects
 *
 */
let Items = Items_1 = class Items extends SharePointQueryableCollection {
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
     * @param reverse It true the PagedPrev=true parameter is added allowing backwards navigation in the collection
     */
    skip(skip, reverse = false) {
        if (reverse) {
            this.query.set("$skiptoken", encodeURIComponent(`Paged=TRUE&PagedPrev=TRUE&p_ID=${skip}`));
        }
        else {
            this.query.set("$skiptoken", encodeURIComponent(`Paged=TRUE&p_ID=${skip}`));
        }
        return this;
    }
    /**
     * Gets a collection designed to aid in paging through data
     *
     */
    getPaged(parser = new ODataDefaultParser()) {
        return this.get(new PagedItemCollectionParser(this, parser));
    }
    /**
     * Gets all the items in a list, regardless of count. Does not support batching or caching
     *
     *  @param requestSize Number of items to return in each request (Default: 2000)
     *  @param acceptHeader Allows for setting the value of the Accept header for SP 2013 support
     */
    getAll(requestSize = 2000, acceptHeader = "application/json;odata=nometadata") {
        Logger.write("Calling items.getAll should be done sparingly. Ensure this is the correct choice. If you are unsure, it is not.", 2 /* Warning */);
        // this will be used for the actual query
        // and we set no metadata here to try and reduce traffic
        const items = new Items_1(this, "").top(requestSize).configure({
            headers: {
                "Accept": acceptHeader,
            },
        });
        // let's copy over the odata query params that can be applied
        // $top - allow setting the page size this way (override what we did above)
        // $select - allow picking the return fields (good behavior)
        // $filter - allow setting a filter, though this may fail due for large lists
        this.query.forEach((v, k) => {
            if (/^\$select|filter|top|expand$/i.test(k)) {
                items.query.set(k, v);
            }
        });
        // give back the promise
        return new Promise((resolve, reject) => {
            // this will eventually hold the items we return
            const itemsCollector = [];
            // action that will gather up our results recursively
            const gatherer = (last) => {
                // collect that set of results
                [].push.apply(itemsCollector, last.results);
                // if we have more, repeat - otherwise resolve with the collected items
                if (last.hasNext) {
                    last.getNext().then(gatherer).catch(reject);
                }
                else {
                    resolve(itemsCollector);
                }
            };
            // start the cycle
            items.getPaged().then(gatherer).catch(reject);
        });
    }
    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     * @param listItemEntityTypeFullName The type name of the list's entities
     */
    add(properties = {}, listItemEntityTypeFullName = null) {
        const removeDependency = this.addBatchDependency();
        return this.ensureListItemEntityTypeName(listItemEntityTypeFullName).then(listItemEntityType => {
            const postBody = jsS(extend(metadata(listItemEntityType), properties));
            const promise = this.clone(Items_1, "").postCore({ body: postBody }).then((data) => {
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
};
Items = Items_1 = __decorate([
    defaultPath("items")
], Items);
/**
 * Descrines a single Item instance
 *
 */
class Item extends SharePointQueryableShareableItem {
    constructor() {
        super(...arguments);
        /**
         * Delete this item
         *
         * @param eTag Value used in the IF-Match header, by default "*"
         */
        this.delete = this._deleteWithETag;
    }
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
     * Gets the collection of comments associated with this list item
     */
    get comments() {
        return new Comments(this);
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
    get list() {
        return this.getParent(List, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/")));
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
                const postBody = jsS(extend(metadata(listItemEntityType), properties));
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
     * Gets the collection of people who have liked this item
     */
    getLikedBy() {
        return this.clone(Item, "likedBy").postCore();
    }
    /**
     * Likes this item as the current user
     */
    like() {
        return this.clone(Item, "like").postCore();
    }
    /**
     * Unlikes this item as the current user
     */
    unlike() {
        return this.clone(Item, "unlike").postCore();
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
        i.query.set("@action", action);
        return i.postCore().then((data) => {
            // handle verbose mode
            if (hOP(data, "GetWOPIFrameUrl")) {
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
            body: jsS({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate }),
        });
    }
    /**
     * Get the like by information for a modern site page
     */
    getLikedByInformation() {
        return this.clone(Item, "likedByInformation").expand("likedby").getCore();
    }
    /**
     * Ensures we have the proper list item entity type name, either from the value provided or from the list
     *
     * @param candidatelistItemEntityTypeFullName The potential type name
     */
    ensureListItemEntityTypeName(candidatelistItemEntityTypeFullName) {
        return candidatelistItemEntityTypeFullName ?
            Promise.resolve(candidatelistItemEntityTypeFullName) :
            this.list.getListItemEntityTypeFullName();
    }
}
/**
 * Describes a collection of Version objects
 *
 */
let ItemVersions = class ItemVersions extends SharePointQueryableCollection {
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
};
ItemVersions = __decorate([
    defaultPath("versions")
], ItemVersions);
/**
 * Describes a single Version instance
 *
 */
class ItemVersion extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
        * Delete a specific version of a file.
        *
        * @param eTag Value used in the IF-Match header, by default "*"
        */
        this.delete = this._deleteWithETag;
    }
}
/**
 * Provides paging functionality for list items
 */
class PagedItemCollection {
    constructor(parent, nextUrl, results, innerParser) {
        this.parent = parent;
        this.nextUrl = nextUrl;
        this.results = results;
        this.innerParser = innerParser;
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
            const items = new Items(this.nextUrl, null).configureFrom(this.parent);
            return items.getPaged(this.innerParser);
        }
        return new Promise(r => r(null));
    }
}
class PagedItemCollectionParser extends ODataParserBase {
    constructor(_parent, innerParser) {
        super();
        this._parent = _parent;
        this.innerParser = innerParser;
    }
    parse(r) {
        return this.innerParser.parse(r).then((items) => __awaiter(this, void 0, void 0, function* () {
            const json = this.innerParser.rawJson;
            const nextUrl = hOP(json, "d") && hOP(json.d, "__next") ? json.d.__next : json["odata.nextLink"];
            return new PagedItemCollection(this._parent, nextUrl, items, this.innerParser);
        }));
    }
}
class ItemUpdatedParser extends ODataParserBase {
    parse(r) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.handleError(r, reject)) {
                    resolve({
                        "odata.etag": r.headers.get("etag"),
                    });
                }
            });
        });
    }
}

var Files_1, Versions_1;
/**
 * Describes a collection of File objects
 *
 */
let Files = Files_1 = class Files extends SharePointQueryableCollection {
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
        return new Files_1(this, `add(overwrite=${shouldOverWrite},url='${url}')`)
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
        const adder = this.clone(Files_1, `add(overwrite=${shouldOverWrite},url='${url}')`, false);
        return adder.postCore()
            .then(() => this.getByName(url))
            .then(file => file.setContentChunked(content, progress, chunkSize));
    }
    /**
     * Adds a ghosted file to an existing list or document library. Not supported for batching.
     *
     * @param fileUrl The server-relative url where you want to save the file.
     * @param templateFileType The type of use to create the file.
     * @returns The template file that was added and the raw response.
     */
    addTemplateFile(fileUrl, templateFileType) {
        return this.clone(Files_1, `addTemplateFile(urloffile='${fileUrl}',templatefiletype=${templateFileType})`, false)
            .postCore().then((response) => {
            return {
                data: response,
                file: this.getByName(fileUrl),
            };
        });
    }
};
Files = Files_1 = __decorate([
    defaultPath("files")
], Files);
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
        return new SharePointQueryableInstance(this, "listItemAllFields");
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
            throw Error("The maximum comment length is 1023 characters.");
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
            throw Error("The maximum comment length is 1023 characters.");
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
            throw Error("The maximum comment length is 1023 characters.");
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
            throw Error("The maximum comment length is 1023 characters.");
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
            return extend((new Item(odataUrlFrom(d))).configureFrom(this), d);
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
        if (progress === undefined) {
            progress = () => null;
        }
        const fileSize = file.size;
        const blockCount = parseInt((file.size / chunkSize).toString(), 10) + ((file.size % chunkSize === 0) ? 1 : 0);
        const uploadId = getGUID();
        // start the chain with the first fragment
        progress({ uploadId, blockNumber: 1, chunkSize, currentPointer: 0, fileSize, stage: "starting", totalBlocks: blockCount });
        let chain = this.startUpload(uploadId, file.slice(0, chunkSize));
        // skip the first and last blocks
        for (let i = 2; i < blockCount; i++) {
            chain = chain.then(pointer => {
                progress({ uploadId, blockNumber: i, chunkSize, currentPointer: pointer, fileSize, stage: "continue", totalBlocks: blockCount });
                return this.continueUpload(uploadId, pointer, file.slice(pointer, pointer + chunkSize));
            });
        }
        return chain.then(pointer => {
            progress({ uploadId, blockNumber: blockCount, chunkSize, currentPointer: pointer, fileSize, stage: "finishing", totalBlocks: blockCount });
            return this.finishUpload(uploadId, pointer, file.slice(pointer));
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
        return this.clone(File, `startUpload(uploadId=guid'${uploadId}')`, false)
            .postCore({ body: fragment })
            .then(n => {
            // When OData=verbose the payload has the following shape:
            // { StartUpload: "10485760" }
            if (typeof n === "object") {
                n = n.StartUpload;
            }
            return parseFloat(n);
        });
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
        return this.clone(File, `continueUpload(uploadId=guid'${uploadId}',fileOffset=${fileOffset})`, false)
            .postCore({ body: fragment })
            .then(n => {
            // When OData=verbose the payload has the following shape:
            // { ContinueUpload: "20971520" }
            if (typeof n === "object") {
                n = n.ContinueUpload;
            }
            return parseFloat(n);
        });
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
            .postCore({ body: fragment })
            .then(response => {
            return {
                data: response,
                file: new File(odataUrlFrom(response)),
            };
        });
    }
}
/**
 * Describes a collection of Version objects
 *
 */
let Versions = Versions_1 = class Versions extends SharePointQueryableCollection {
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
        return new Versions_1(this, "deleteAll").postCore();
    }
    /**
     * Deletes the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    deleteById(versionId) {
        return this.clone(Versions_1, `deleteById(vid=${versionId})`).postCore();
    }
    /**
     * Recycles the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    recycleByID(versionId) {
        return this.clone(Versions_1, `recycleByID(vid=${versionId})`).postCore();
    }
    /**
     * Deletes the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    deleteByLabel(label) {
        return this.clone(Versions_1, `deleteByLabel(versionlabel='${label}')`).postCore();
    }
    /**
     * Recycles the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    recycleByLabel(label) {
        return this.clone(Versions_1, `recycleByLabel(versionlabel='${label}')`).postCore();
    }
    /**
     * Creates a new file version from the file specified by the version label.
     *
     * @param label The version label of the file version to restore, for example: 1.2
     */
    restoreByLabel(label) {
        return this.clone(Versions_1, `restoreByLabel(versionlabel='${label}')`).postCore();
    }
};
Versions = Versions_1 = __decorate([
    defaultPath("versions")
], Versions);
/**
 * Describes a single Version instance
 *
 */
class Version extends SharePointQueryableInstance {
    constructor() {
        super(...arguments);
        /**
        * Delete a specific version of a file.
        *
        * @param eTag Value used in the IF-Match header, by default "*"
        */
        this.delete = this._deleteWithETag;
        // /**
        // * Delete a specific version of a file.
        // *
        // * @param eTag Value used in the IF-Match header, by default "*"
        // */
        // public delete(eTag = "*"): Promise<void> {
        //     return this.postCore({
        //         headers: {
        //             "IF-Match": eTag,
        //             "X-HTTP-Method": "DELETE",
        //         },
        //     });
        // }
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
    TemplateFileType[TemplateFileType["ClientSidePage"] = 3] = "ClientSidePage";
})(TemplateFileType || (TemplateFileType = {}));

/**
 * Represents an app catalog
 */
class AppCatalog extends SharePointQueryableCollection {
    constructor(baseUrl, path = "_api/web/tenantappcatalog/AvailableApps") {
        super(extractWebUrl(typeof baseUrl === "string" ? baseUrl : baseUrl.toUrl()), path);
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
        const catalog = this.toUrl().indexOf("tenantappcatalog") > 0 ? "tenantappcatalog" : "sitecollectionappcatalog";
        // you don't add to the availableapps collection
        const adder = new AppCatalog(extractWebUrl(this.toUrl()), `_api/web/${catalog}/add(overwrite=${shouldOverWrite},url='${filename}')`);
        return adder.postCore({
            body: content,
        }).then(r => {
            return {
                data: r,
                file: new File(odataUrlFrom(r)),
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
     *
     * @param skipFeatureDeployment Deploy the app to the entire tenant
     */
    deploy(skipFeatureDeployment = false) {
        return this.clone(App, `Deploy(${skipFeatureDeployment})`).postCore();
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
                                throw Error(`Invalid response, line ${i}`);
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
                            throw Error(`Invalid status, line ${i}`);
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
                reject(Error("Unexpected end of input"));
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
                        currentChangeSetId = getGUID();
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
                const url = isUrlAbsolute(reqInfo.url) ? reqInfo.url : combine(absoluteRequestUrl, reqInfo.url);
                Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Adding request ${reqInfo.method} ${url} to batch.`, 0 /* Verbose */);
                if (reqInfo.method !== "GET") {
                    let method = reqInfo.method;
                    const castHeaders = reqInfo.options.headers;
                    if (hOP(reqInfo, "options") && hOP(reqInfo.options, "headers") && castHeaders["X-HTTP-Method"] !== undefined) {
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
                    headers.append("X-ClientService-ClientTag", "PnPCoreJS:@pnp-1.3.5");
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
            return client.fetch(combine(absoluteRequestUrl, "/_api/$batch"), batchOptions)
                .then(r => r.text())
                .then(SPBatch.ParseResponse)
                .then((responses) => {
                if (responses.length !== this.requests.length) {
                    throw Error("Could not properly parse responses to match requests in batch.");
                }
                Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched requests.`, 1 /* Info */);
                return responses.reduce((chain, response, index) => {
                    const request = this.requests[index];
                    Logger.write(`[${request.id}] (${(new Date()).getTime()}) Resolving request in batch ${this.batchId}.`, 1 /* Info */);
                    return chain.then(_ => request.parser.parse(response).then(request.resolve).catch(request.reject));
                }, Promise.resolve());
            });
        });
    }
}

var Features_1;
/**
 * Describes a collection of List objects
 *
 */
let Features = Features_1 = class Features extends SharePointQueryableCollection {
    /**
     * Adds a new list to the collection
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature activation will be forced
     */
    add(id, force = false) {
        return this.clone(Features_1, "add").postCore({
            body: jsS({
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
     * Removes (deactivates) a feature from the collection
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature deactivation will be forced
     */
    remove(id, force = false) {
        return this.clone(Features_1, "remove").postCore({
            body: jsS({
                featureId: id,
                force: force,
            }),
        });
    }
};
Features = Features_1 = __decorate([
    defaultPath("features")
], Features);
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

var Site_1;
/**
 * Describes a site collection
 *
 */
let Site = Site_1 = class Site extends SharePointQueryableInstance {
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
     * Gets a Web instance representing the root web of the site collection
     * correctly setup for chaining within the library
     */
    getRootWeb() {
        return this.rootWeb.select("Url").get().then(web => new Web(web.Url));
    }
    /**
     * Gets the context information for this site collection
     */
    getContextInfo() {
        const q = new Site_1(this.parentUrl, "_api/contextinfo");
        return q.postCore().then(data => {
            if (hOP(data, "GetContextWebInformation")) {
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
        q.query.set("@v", "'" + absoluteWebUrl + "'");
        return q.get().then(data => {
            if (hOP(data, "GetDocumentLibraries")) {
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
        q.query.set("@v", `'${absolutePageUrl}'`);
        return q.get().then(data => {
            if (hOP(data, "GetWebUrlFromPageUrl")) {
                return data.GetWebUrlFromPageUrl;
            }
            else {
                return data;
            }
        });
    }
    /**
     * Deletes the current site
     *
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const site = yield this.clone(Site_1, "").select("Id").get();
            const q = new Site_1(this.parentUrl, "_api/SPSiteManager/Delete");
            yield q.postCore({
                body: jsS({
                    siteId: site.Id,
                }),
            });
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
        return this.clone(Site_1, `openWebById('${webId}')`).postCore().then(d => ({
            data: d,
            web: Web.fromUrl(d["odata.id"] || d.__metadata.uri),
        }));
    }
    /**
     * Associates a site collection to a hub site.
     *
     * @param siteId Id of the hub site collection you want to join.
     * If you want to disassociate the site collection from hub site, then
     * pass the siteId as 00000000-0000-0000-0000-000000000000
     */
    joinHubSite(siteId) {
        return this.clone(Site_1, `joinHubSite('${siteId}')`).postCore();
    }
    /**
     * Registers the current site collection as hub site collection
     */
    registerHubSite() {
        return this.clone(Site_1, `registerHubSite`).postCore();
    }
    /**
     * Unregisters the current site collection as hub site collection.
     */
    unRegisterHubSite() {
        return this.clone(Site_1, `unRegisterHubSite`).postCore();
    }
    /**
     * Creates a Modern communication site.
     *
     * @param title The title of the site to create
     * @param lcid The language to use for the site. If not specified will default to 1033 (English).
     * @param shareByEmailEnabled If set to true, it will enable sharing files via Email. By default it is set to false
     * @param url The fully qualified URL (e.g. https://yourtenant.sharepoint.com/sites/mysitecollection) of the site.
     * @param description The description of the communication site.
     * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
     * @param siteDesignId The Guid of the site design to be used.
     *                     You can use the below default OOTB GUIDs:
     *                     Topic: 00000000-0000-0000-0000-000000000000
     *                     Showcase: 6142d2a0-63a5-4ba0-aede-d9fefca2c767
     *                     Blank: f6cc5403-0d63-442e-96c0-285923709ffc
     * @param owner Required when creating the site using app-only context
     */
    createCommunicationSite(title, lcid = 1033, shareByEmailEnabled = false, url, description = "", classification = "", siteDesignId = "00000000-0000-0000-0000-000000000000", hubSiteId = "00000000-0000-0000-0000-000000000000", owner) {
        const props = {
            Classification: classification,
            Description: description,
            HubSiteId: hubSiteId,
            Lcid: lcid,
            Owner: owner,
            ShareByEmailEnabled: shareByEmailEnabled,
            SiteDesignId: siteDesignId,
            Title: title,
            Url: url,
            WebTemplate: "SITEPAGEPUBLISHING#0",
            WebTemplateExtensionId: "00000000-0000-0000-0000-000000000000",
        };
        const postBody = jsS({
            "request": extend({
                "__metadata": { "type": "Microsoft.SharePoint.Portal.SPSiteCreationRequest" },
            }, props),
        });
        return this.getRootWeb().then((d) => __awaiter(this, void 0, void 0, function* () {
            const client = new SPHttpClient();
            const methodUrl = `${d.parentUrl}/_api/SPSiteManager/Create`;
            return client.post(methodUrl, {
                body: postBody,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose;charset=utf-8",
                },
            }).then(r => r.json());
        }));
    }
    /**
     * Creates a Modern team site backed by Office 365 group. For use in SP Online only. This will not work with App-only tokens
     *
     * @param displayName The title or display name of the Modern team site to be created
     * @param alias Alias of the underlying Office 365 Group
     * @param isPublic Defines whether the Office 365 Group will be public (default), or private.
     * @param lcid The language to use for the site. If not specified will default to English (1033).
     * @param description The description of the site to be created.
     * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
     * @param owners The Owners of the site to be created
     * @param siteDesignId The ID of the site design to apply to the new site
     */
    createModernTeamSite(displayName, alias, isPublic = true, lcid = 1033, description = "", classification = "", owners, hubSiteId = "00000000-0000-0000-0000-000000000000", siteDesignId) {
        const postBody = {
            alias: alias,
            displayName: displayName,
            isPublic: isPublic,
            optionalParams: {
                Classification: classification,
                CreationOptions: {
                    "results": [`SPSiteLanguage:${lcid}`, `HubSiteId:${hubSiteId}`],
                },
                Description: description,
                Owners: {
                    "results": owners ? owners : [],
                },
            },
        };
        if (siteDesignId) {
            postBody.optionalParams.CreationOptions.results.push(`implicit_formula_292aa8a00786498a87a5ca52d9f4214a_${siteDesignId}`);
        }
        return this.getRootWeb().then((d) => __awaiter(this, void 0, void 0, function* () {
            const client = new SPHttpClient();
            const methodUrl = `${d.parentUrl}/_api/GroupSiteManager/CreateGroupEx`;
            return client.post(methodUrl, {
                body: jsS(postBody),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose;charset=utf-8",
                },
            }).then(r => r.json());
        }));
    }
};
Site = Site_1 = __decorate([
    defaultPath("_api/site")
], Site);

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
        const postBody = jsS(extend(metadata("SP.NavigationNode"), {
            IsVisible: visible,
            Title: title,
            Url: url,
        }));
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
        const postBody = jsS({
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
    /**
     * Updates this node
     *
     * @param properties Properties used to update this node
     */
    update(properties) {
        const postBody = jsS(extend({
            "__metadata": { "type": "SP.NavigationNode" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                data: data,
                node: this,
            };
        });
    }
}
/**
 * Exposes the navigation components
 *
 */
let Navigation = class Navigation extends SharePointQueryable {
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
};
Navigation = __decorate([
    defaultPath("navigation")
], Navigation);
/**
 * Represents the top level navigation service
 */
class NavigationService extends SharePointQueryable {
    constructor(baseUrl, path = null) {
        super(baseUrl, path);
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
        return (new NavigationService(this, "_api/navigation/MenuState")).postCore({
            body: jsS({
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
        return (new NavigationService(this, "_api/navigation/MenuNodeKey")).postCore({
            body: jsS({
                currentUrl: currentUrl,
                mapProviderName: mapProviderName,
            }),
        });
    }
}

var RelatedItemManagerImpl_1;
let RelatedItemManagerImpl = RelatedItemManagerImpl_1 = class RelatedItemManagerImpl extends SharePointQueryable {
    static FromUrl(url) {
        if (url === null) {
            return new RelatedItemManagerImpl_1("");
        }
        const index = url.indexOf("_api/");
        if (index > -1) {
            return new RelatedItemManagerImpl_1(url.substr(0, index));
        }
        return new RelatedItemManagerImpl_1(url);
    }
    getRelatedItems(sourceListName, sourceItemId) {
        const query = this.clone(RelatedItemManagerImpl_1, null);
        query.concat(".GetRelatedItems");
        return query.postCore({
            body: jsS({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
            }),
        });
    }
    getPageOneRelatedItems(sourceListName, sourceItemId) {
        const query = this.clone(RelatedItemManagerImpl_1, null);
        query.concat(".GetPageOneRelatedItems");
        return query.postCore({
            body: jsS({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
            }),
        });
    }
    addSingleLink(sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemID, targetWebUrl, tryAddReverseLink = false) {
        const query = this.clone(RelatedItemManagerImpl_1, null);
        query.concat(".AddSingleLink");
        return query.postCore({
            body: jsS({
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
        const query = this.clone(RelatedItemManagerImpl_1, null);
        query.concat(".AddSingleLinkToUrl");
        return query.postCore({
            body: jsS({
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
        const query = this.clone(RelatedItemManagerImpl_1, null);
        query.concat(".AddSingleLinkFromUrl");
        return query.postCore({
            body: jsS({
                SourceItemUrl: sourceItemUrl,
                TargetItemID: targetItemId,
                TargetListName: targetListName,
                TryAddReverseLink: tryAddReverseLink,
            }),
        });
    }
    deleteSingleLink(sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemId, targetWebUrl, tryDeleteReverseLink = false) {
        const query = this.clone(RelatedItemManagerImpl_1, null);
        query.concat(".DeleteSingleLink");
        return query.postCore({
            body: jsS({
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
};
RelatedItemManagerImpl = RelatedItemManagerImpl_1 = __decorate([
    defaultPath("_api/SP.RelatedItemManager")
], RelatedItemManagerImpl);

var TimeZone_1, TimeZones_1;
/**
 * Describes regional settings ODada object
 */
let RegionalSettings = class RegionalSettings extends SharePointQueryableInstance {
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
};
RegionalSettings = __decorate([
    defaultPath("regionalsettings")
], RegionalSettings);
/**
 * Describes installed languages ODada queriable collection
 */
let InstalledLanguages = class InstalledLanguages extends SharePointQueryableCollection {
};
InstalledLanguages = __decorate([
    defaultPath("installedlanguages")
], InstalledLanguages);
/**
 * Describes TimeZone ODada object
 */
let TimeZone = TimeZone_1 = class TimeZone extends SharePointQueryableInstance {
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
        return this.clone(TimeZone_1, `utctolocaltime('${dateIsoString}')`)
            .postCore()
            .then(res => hOP(res, "UTCToLocalTime") ? res.UTCToLocalTime : res);
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
            dateIsoString = dateAdd(localTime, "minute", localTime.getTimezoneOffset() * -1).toISOString();
        }
        return this.clone(TimeZone_1, `localtimetoutc('${dateIsoString}')`)
            .postCore()
            .then(res => hOP(res, "LocalTimeToUTC") ? res.LocalTimeToUTC : res);
    }
};
TimeZone = TimeZone_1 = __decorate([
    defaultPath("timezone")
], TimeZone);
/**
 * Describes time zones queriable collection
 */
let TimeZones = TimeZones_1 = class TimeZones extends SharePointQueryableCollection {
    // https://msdn.microsoft.com/en-us/library/office/jj247008.aspx - timezones ids
    /**
     * Gets an TimeZone by id
     *
     * @param id The integer id of the timezone to retrieve
     */
    getById(id) {
        // do the post and merge the result into a TimeZone instance so the data and methods are available
        return this.clone(TimeZones_1, `GetById(${id})`).postCore({}, spODataEntity(TimeZone));
    }
};
TimeZones = TimeZones_1 = __decorate([
    defaultPath("timezones")
], TimeZones);

/**
 * Implements the site designs API REST methods
 *
 */
class SiteDesigns extends SharePointQueryable {
    /**
     * Creates a new instance of the SiteDesigns method class
     *
     * @param baseUrl The parent url provider
     * @param methodName The static method name to call on the utility class
     */
    constructor(baseUrl, methodName) {
        super(SiteDesigns.getBaseUrl(baseUrl), `_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.${methodName}`);
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
    execute(props) {
        return this.postCore({
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
    }
    /**
     * Creates a new site design available to users when they create a new site from the SharePoint home page.
     *
     * @param creationInfo A sitedesign creation information object
     */
    createSiteDesign(creationInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `CreateSiteDesign`).execute({ info: creationInfo });
        });
    }
    /**
     * Applies a site design to an existing site collection.
     *
     * @param siteDesignId The ID of the site design to apply.
     * @param webUrl The URL of the site collection where you want to apply the site design.
     */
    applySiteDesign(siteDesignId, webUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `ApplySiteDesign`).execute({ siteDesignId: siteDesignId, "webUrl": webUrl });
        });
    }
    /**
     * Gets a list of information about existing site designs.
     */
    getSiteDesigns() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `GetSiteDesigns`).execute({});
        });
    }
    /**
     * Gets information about a specific site design.
     * @param id The ID of the site design to get information about.
     */
    getSiteDesignMetadata(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `GetSiteDesignMetadata`).execute({ id: id });
        });
    }
    /**
     * Updates a site design with new values. In the REST call, all parameters are optional except the site script Id.
     * If you had previously set the IsDefault parameter to TRUE and wish it to remain true, you must pass in this parameter again (otherwise it will be reset to FALSE).
     * @param updateInfo A sitedesign update information object
     */
    updateSiteDesign(updateInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `UpdateSiteDesign`).execute({ updateInfo: updateInfo });
        });
    }
    /**
     * Deletes a site design.
     * @param id The ID of the site design to delete.
     */
    deleteSiteDesign(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `DeleteSiteDesign`).execute({ id: id });
        });
    }
    /**
     * Gets a list of principals that have access to a site design.
     * @param id The ID of the site design to get rights information from.
     */
    getSiteDesignRights(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `GetSiteDesignRights`).execute({ id: id });
        });
    }
    /**
     * Grants access to a site design for one or more principals.
     * @param id The ID of the site design to grant rights on.
     * @param principalNames An array of one or more principals to grant view rights.
     *                       Principals can be users or mail-enabled security groups in the form of "alias" or "alias@<domain name>.com"
     * @param grantedRights Always set to 1. This represents the View right.
     */
    grantSiteDesignRights(id, principalNames, grantedRights = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `GrantSiteDesignRights`)
                .execute({
                "grantedRights": grantedRights.toString(),
                "id": id,
                "principalNames": principalNames,
            });
        });
    }
    /**
     * Revokes access from a site design for one or more principals.
     * @param id The ID of the site design to revoke rights from.
     * @param principalNames An array of one or more principals to revoke view rights from.
     *                       If all principals have rights revoked on the site design, the site design becomes viewable to everyone.
     */
    revokeSiteDesignRights(id, principalNames) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `RevokeSiteDesignRights`)
                .execute({
                "id": id,
                "principalNames": principalNames,
            });
        });
    }
    /**
     * Adds a site design task on the specified web url to be invoked asynchronously.
     * @param webUrl The absolute url of the web on where to create the task
     * @param siteDesignId The ID of the site design to create a task for
     */
    addSiteDesignTask(webUrl, siteDesignId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `AddSiteDesignTask`)
                .execute({ "webUrl": webUrl, "siteDesignId": siteDesignId });
        });
    }
    /**
     * Adds a site design task on the current web to be invoked asynchronously.
     * @param siteDesignId The ID of the site design to create a task for
     */
    addSiteDesignTaskToCurrentWeb(siteDesignId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `AddSiteDesignTaskToCurrentWeb`)
                .execute({ "siteDesignId": siteDesignId });
        });
    }
    /**
     * Retrieves the site design task, if the task has finished running null will be returned
     * @param id The ID of the site design task
     */
    getSiteDesignTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.clone(SiteDesigns, `GetSiteDesignTask`)
                .execute({ "taskId": id });
            return hOP(task, "ID") ? task : null;
        });
    }
    /**
     * Retrieves a list of site design that have run on a specific web
     * @param webUrl The url of the web where the site design was applied
     * @param siteDesignId (Optional) the site design ID, if not provided will return all site design runs
     */
    getSiteDesignRun(webUrl, siteDesignId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `GetSiteDesignRun`)
                .execute({ "webUrl": webUrl, siteDesignId: siteDesignId });
        });
    }
    /**
     * Retrieves the status of a site design that has been run or is still running
     * @param webUrl The url of the web where the site design was applied
     * @param runId the run ID
     */
    getSiteDesignRunStatus(webUrl, runId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteDesigns, `GetSiteDesignRunStatus`)
                .execute({ "webUrl": webUrl, runId: runId });
        });
    }
}

/**
 * Implements the site script API REST methods
 *
 */
class SiteScripts$1 extends SharePointQueryable {
    /**
     * Creates a new instance of the SiteScripts method class
     *
     * @param baseUrl The parent url provider
     * @param methodName The static method name to call on the utility class
     */
    constructor(baseUrl, methodName) {
        super(SiteScripts$1.getBaseUrl(baseUrl), `_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.${methodName}`);
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
    execute(props) {
        return this.postCore({
            body: JSON.stringify(props),
        });
    }
    /**
     * Gets a list of information on all existing site scripts.
     */
    getSiteScripts() {
        return this.clone(SiteScripts$1, "GetSiteScripts", true).execute({});
    }
    /**
     * Creates a new site script.
     *
     * @param title The display name of the site design.
     * @param content JSON value that describes the script. For more information, see JSON reference.
     */
    createSiteScript(title, description, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteScripts$1, `CreateSiteScript(Title=@title,Description=@desc)?@title='${encodeURIComponent(title)}'&@desc='${encodeURIComponent(description)}'`)
                .execute(content);
        });
    }
    /**
     * Gets information about a specific site script. It also returns the JSON of the script.
     *
     * @param id The ID of the site script to get information about.
     */
    getSiteScriptMetadata(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteScripts$1, "GetSiteScriptMetadata").execute({ id: id });
        });
    }
    /**
     * Deletes a site script.
     *
     * @param id The ID of the site script to delete.
     */
    deleteSiteScript(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clone(SiteScripts$1, "DeleteSiteScript").execute({ id: id });
        });
    }
    /**
     * Updates a site script with new values. In the REST call, all parameters are optional except the site script Id.
     *
     * @param siteScriptUpdateInfo Object that contains the information to update a site script.
     *                             Make sure you stringify the content object or pass it in the second 'content' parameter
     * @param content (Optional) A new JSON script defining the script actions. For more information, see Site design JSON schema.
     */
    updateSiteScript(siteScriptUpdateInfo, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (content) {
                siteScriptUpdateInfo.Content = JSON.stringify(content);
            }
            return yield this.clone(SiteScripts$1, "UpdateSiteScript").execute({ updateInfo: siteScriptUpdateInfo });
        });
    }
    /**
     * Gets the site script syntax (JSON) for a specific list
     * @param listUrl The absolute url of the list to retrieve site script
     */
    getSiteScriptFromList(listUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteScripts$1, `GetSiteScriptFromList`)
                .execute({ "listUrl": listUrl });
        });
    }
    /**
     * Gets the site script syntax (JSON) for a specific web
     * @param webUrl The absolute url of the web to retrieve site script
     * @param extractInfo configuration object to specify what to extract
     */
    getSiteScriptFromWeb(webUrl, extractInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clone(SiteScripts$1, `getSiteScriptFromWeb`)
                .execute({ "webUrl": webUrl, info: extractInfo });
        });
    }
}

var Webs_1, Web_1;
/**
 * Describes a collection of webs
 *
 */
let Webs = Webs_1 = class Webs extends SharePointQueryableCollection {
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
        const postBody = jsS({
            "parameters": extend({
                "__metadata": { "type": "SP.WebCreationInformation" },
            }, props),
        });
        return this.clone(Webs_1, "add").postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                web: new Web(odataUrlFrom(data).replace(/_api\/web\/?/i, "")),
            };
        });
    }
};
Webs = Webs_1 = __decorate([
    defaultPath("webs")
], Webs);
/**
 * Describes a collection of web infos
 *
 */
let WebInfos = class WebInfos extends SharePointQueryableCollection {
};
WebInfos = __decorate([
    defaultPath("webinfos")
], WebInfos);
/**
 * Describes a web
 *
 */
let Web = Web_1 = class Web extends SharePointQueryableShareableWeb {
    /**
     * Creates a new web instance from the given url by indexing the location of the /_api/
     * segment. If this is not found the method creates a new web with the entire string as
     * supplied.
     *
     * @param url
     */
    static fromUrl(url, path) {
        return new Web_1(extractWebUrl(url), path);
    }
    /**
     * Gets this web's subwebs
     *
     */
    get webs() {
        return new Webs(this);
    }
    /**
     * Gets this web's parent web and data
     *
     */
    getParentWeb() {
        return this.select("ParentWeb/Id").expand("ParentWeb").get()
            .then(({ ParentWeb }) => ParentWeb ? new Site(this.parentUrl).openWebById(ParentWeb.Id) : null);
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
        return this.clone(SharePointQueryableInstance, "allproperties");
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
     * Gets the default document library for this web
     *
     */
    get defaultDocumentLibrary() {
        return new List(this, "DefaultDocumentLibrary");
    }
    /**
     * Gets a folder by id
     *
     * @param uniqueId The uniqueId of the folder
     */
    getFolderById(uniqueId) {
        return new Folder(this, `getFolderById('${uniqueId}')`);
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
     * Gets a folder by server relative relative path if your folder name contains # and % characters
     * you need to first encode the file name using encodeURIComponent() and then pass the url
     * let url = "/sites/test/Shared Documents/" + encodeURIComponent("%123");
     * This works only in SharePoint online.
     *
     * @param folderRelativeUrl The server relative path to the folder (including /sites/ if applicable)
     */
    getFolderByServerRelativePath(folderRelativeUrl) {
        return new Folder(this, `getFolderByServerRelativePath(decodedUrl='${folderRelativeUrl}')`);
    }
    /**
     * Gets a file by id
     *
     * @param uniqueId The uniqueId of the file
     */
    getFileById(uniqueId) {
        return new File(this, `getFileById('${uniqueId}')`);
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
     * Gets a file by server relative url if your file name contains # and % characters
     * you need to first encode the file name using encodeURIComponent() and then pass the url
     * let url = "/sites/test/Shared Documents/" + encodeURIComponent("%123.docx");
     *
     * @param fileRelativeUrl The server relative path to the file (including /sites/ if applicable)
     */
    getFileByServerRelativePath(fileRelativeUrl) {
        return new File(this, `getFileByServerRelativePath(decodedUrl='${fileRelativeUrl}')`);
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
        const postBody = jsS(extend({
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
        const postBody = jsS({
            backgroundImageUrl: backgroundImageUrl,
            colorPaletteUrl: colorPaletteUrl,
            fontSchemeUrl: fontSchemeUrl,
            shareGenerated: shareGenerated,
        });
        return this.clone(Web_1, "applytheme").postCore({ body: postBody });
    }
    /**
     * Applies the specified site definition or site template to the Web site that has no template applied to it
     *
     * @param template Name of the site definition or the name of the site template
     */
    applyWebTemplate(template) {
        const q = this.clone(Web_1, "applywebtemplate");
        q.concat(`(@t)`);
        q.query.set("@t", template);
        return q.postCore();
    }
    /**
     * Checks whether the specified login name belongs to a valid user in the web. If the user doesn't exist, adds the user to the web.
     *
     * @param loginName The login name of the user (ex: i:0#.f|membership|user@domain.onmicrosoft.com)
     */
    ensureUser(loginName) {
        const postBody = jsS({
            logonName: loginName,
        });
        return this.clone(Web_1, "ensureuser").postCore({ body: postBody }).then((data) => {
            return {
                data: data,
                user: new SiteUser(odataUrlFrom(data)),
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
        return this.clone(Web_1, `getcatalog(${type})`).select("Id").get().then((data) => {
            return new List(odataUrlFrom(data));
        });
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    getChanges(query) {
        const postBody = jsS({ "query": extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
        return this.clone(Web_1, "getchanges").postCore({ body: postBody });
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
        return this.clone(Web_1, `maptoicon(filename='${filename}', progid='${progId}', size=${size})`).get();
    }
    /**
     * Returns the tenant property corresponding to the specified key in the app catalog site
     *
     * @param key Id of storage entity to be set
     */
    getStorageEntity(key) {
        return this.clone(Web_1, `getStorageEntity('${key}')`).get();
    }
    /**
     * This will set the storage entity identified by the given key (MUST be called in the context of the app catalog)
     *
     * @param key Id of storage entity to be set
     * @param value Value of storage entity to be set
     * @param description Description of storage entity to be set
     * @param comments Comments of storage entity to be set
     */
    setStorageEntity(key, value, description = "", comments = "") {
        return this.clone(Web_1, `setStorageEntity`).postCore({
            body: jsS({
                comments,
                description,
                key,
                value,
            }),
        });
    }
    /**
     * This will remove the storage entity identified by the given key
     *
     * @param key Id of storage entity to be removed
     */
    removeStorageEntity(key) {
        return this.clone(Web_1, `removeStorageEntity('${key}')`).postCore();
    }
    /**
     * Gets the tenant app catalog for this web
     *
     * @param url Optional url or web containing the app catalog (default: current web)
     */
    getAppCatalog(url) {
        return new AppCatalog(url || this);
    }
    /**
     * Gets the site collection app catalog for this web
     *
     * @param url Optional url or web containing the app catalog (default: current web)
     */
    getSiteCollectionAppCatalog(url) {
        return new AppCatalog(url || this, "_api/web/sitecollectionappcatalog/AvailableApps");
    }
    /**
     * Gets the collection of available client side web parts for this web instance
     */
    getClientSideWebParts() {
        return this.clone(SharePointQueryableCollection, "GetClientSideWebParts").get();
    }
    /**
     * Creates a new client side page
     *
     * @param pageName Name of the new page
     * @param title Display title of the new page
     * @param libraryTitle Title of the library in which to create the new page. Default: "Site Pages"
     */
    addClientSidePage(pageName, title = pageName.replace(/\.[^/.]+$/, "")) {
        return ClientSidePage.create(this, pageName, title);
    }
    /**
     * Creates a new client side page using the library path
     *
     * @param pageName Name of the new page
     * @param listRelativePath The server relative path to the list's root folder (including /sites/ if applicable)
     * @param title Display title of the new page
     */
    addClientSidePageByPath(pageName, title = pageName.replace(/\.[^/.]+$/, "")) {
        return ClientSidePage.create(this, pageName, title);
    }
    /**
     * Creates the default associated groups (Members, Owners, Visitors) and gives them the default permissions on the site.
     * The target site must have unique permissions and no associated members / owners / visitors groups
     *
     * @param siteOwner The user login name to be added to the site Owners group. Default is the current user
     * @param siteOwner2 The second user login name to be added to the site Owners group. Default is empty
     * @param groupNameSeed The base group name. E.g. 'TestSite' would produce 'TestSite Members' etc.
     */
    createDefaultAssociatedGroups(siteOwner, siteOwner2, groupNameSeed) {
        const q = this.clone(Web_1, `createDefaultAssociatedGroups(userLogin=@u,userLogin2=@v,groupNameSeed=@s)`);
        q.query.set("@u", `'${encodeURIComponent(siteOwner || "")}'`);
        q.query.set("@v", `'${encodeURIComponent(siteOwner2 || "")}'`);
        q.query.set("@s", `'${encodeURIComponent(groupNameSeed || "")}'`);
        return q.postCore();
    }
    /**
     * Gets hub site data for the current web.
     *
     * @param forceRefresh Default value is false. When false, the data is returned from the server's cache.
     * When true, the cache is refreshed with the latest updates and then returned.
     * Use this if you just made changes and need to see those changes right away.
     */
    hubSiteData(forceRefresh = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clone(Web_1, `hubSiteData(${forceRefresh})`).get().then(r => JSON.parse(r));
        });
    }
    /**
     * Applies theme updates from the parent hub site collection.
     */
    syncHubSiteTheme() {
        return this.clone(Web_1, `syncHubSiteTheme`).postCore();
    }
    /**
     * Retrieves a list of site design that have run on the current web
     * @param siteDesignId (Optional) the site design ID, if not provided will return all site design runs
     */
    getSiteDesignRuns(siteDesignId) {
        return new SiteDesigns(this, "").getSiteDesignRun(undefined, siteDesignId);
    }
    /**
     * Gets the site script syntax (JSON) for a specific web
     * @param extractInfo configuration object to specify what to extract
     */
    getSiteScript(extractInfo) {
        return new SiteScripts$1(this, "").getSiteScriptFromWeb(undefined, extractInfo);
    }
    /**
     * Adds a site design task on the current web to be invoked asynchronously.
     * @param siteDesignId The ID of the site design to create a task for
     */
    addSiteDesignTask(siteDesignId) {
        return new SiteDesigns(this, "").addSiteDesignTaskToCurrentWeb(siteDesignId);
    }
    /**
     * Retrieves the status of a site design that has been run or is still running
     * @param runId the run ID
     */
    getSiteDesignRunStatus(runId) {
        return new SiteDesigns(this, "").getSiteDesignRunStatus(undefined, runId);
    }
};
Web = Web_1 = __decorate([
    defaultPath("_api/web")
], Web);

/**
 * Page promotion state
 */
var PromotedState;
(function (PromotedState) {
    /**
     * Regular client side page
     */
    PromotedState[PromotedState["NotPromoted"] = 0] = "NotPromoted";
    /**
     * Page that will be promoted as news article after publishing
     */
    PromotedState[PromotedState["PromoteOnPublish"] = 1] = "PromoteOnPublish";
    /**
     * Page that is promoted as news article
     */
    PromotedState[PromotedState["Promoted"] = 2] = "Promoted";
})(PromotedState || (PromotedState = {}));
/**
 * Gets the next order value 1 based for the provided collection
 *
 * @param collection Collection of orderable things
 */
function getNextOrder(collection) {
    if (collection.length < 1) {
        return 1;
    }
    return Math.max.apply(null, collection.map(i => i.order)) + 1;
}
/**
 * Normalizes the order value for all the sections, columns, and controls to be 1 based and stepped (1, 2, 3...)
 *
 * @param collection The collection to normalize
 */
function reindex(collection) {
    for (let i = 0; i < collection.length; i++) {
        collection[i].order = i + 1;
        if (hOP(collection[i], "columns")) {
            reindex(collection[i].columns);
        }
        else if (hOP(collection[i], "controls")) {
            reindex(collection[i].controls);
        }
    }
}
/**
 * Represents the data and methods associated with client side "modern" pages
 */
class ClientSidePage extends SharePointQueryable {
    /**
     * PLEASE DON'T USE THIS CONSTRUCTOR DIRECTLY
     *
     */
    constructor(baseUrl, path, json, noInit = false, sections = [], commentsDisabled = false) {
        super(baseUrl, path);
        this.json = json;
        this.sections = sections;
        this.commentsDisabled = commentsDisabled;
        this._bannerImageDirty = false;
        // ensure we have a good url to build on for the pages api
        if (typeof baseUrl === "string") {
            this._parentUrl = "";
            this._url = combine(extractWebUrl(baseUrl), path);
        }
        else {
            this.extend(ClientSidePage.initFrom(baseUrl, null), path);
        }
        // set a default page settings slice
        this._pageSettings = { controlType: 0, pageSettingsSlice: { isDefaultDescription: true, isDefaultThumbnail: true } };
        // set a default layout part
        this._layoutPart = ClientSidePage.getDefaultLayoutPart();
        if (typeof json !== "undefined" && !noInit) {
            this.fromJSON(json);
        }
    }
    /**
     * Creates a new blank page within the supplied library [does not work with batching]
     *
     * @param web Parent web in which we will create the page (we allow list here too matching the old api)
     * @param pageName Filename of the page, such as "page"
     * @param title The display title of the page
     * @param pageLayoutType Layout type of the page to use
     */
    static create(web, pageName, title, pageLayoutType = "Article") {
        return __awaiter(this, void 0, void 0, function* () {
            // patched because previously we used the full page name with the .aspx at the end
            // this allows folk's existing code to work after the re-write to the new API
            pageName = pageName.replace(/\.aspx$/i, "");
            // this is the user data we will use to init the author field
            // const currentUserLogin = await ClientSidePage.getPoster("/_api/web/currentuser").select("UserPrincipalName").get<{ UserPrincipalName: string }>();
            // initialize the page, at this point a checked-out page with a junk filename will be created.
            const pageInitData = yield ClientSidePage.initFrom(web, "_api/sitepages/pages").postCore({
                body: jsS(Object.assign(metadata("SP.Publishing.SitePage"), {
                    PageLayoutType: pageLayoutType,
                })),
            });
            // now we can init our page with the save data
            const newPage = new ClientSidePage(web, "", pageInitData);
            // newPage.authors = [currentUserLogin.UserPrincipalName];
            newPage.title = pageName;
            yield newPage.save(false);
            newPage.title = title;
            return newPage;
        });
    }
    /**
     * Creates a new ClientSidePage instance from the provided html content string
     *
     * @param html HTML markup representing the page
     */
    static fromFile(file) {
        return file.getItem().then(i => {
            const page = new ClientSidePage(extractWebUrl(file.toUrl()), "", { Id: i.Id }, true);
            return page.configureFrom(file).load();
        });
    }
    static getDefaultLayoutPart() {
        return {
            dataVersion: "1.4",
            description: "Title Region Description",
            id: "cbe7b0a9-3504-44dd-a3a3-0e5cacd07788",
            instanceId: "cbe7b0a9-3504-44dd-a3a3-0e5cacd07788",
            properties: {
                authors: [],
                layoutType: "FullWidthImage",
                showPublishDate: false,
                showTopicHeader: false,
                textAlignment: "Left",
                title: "",
                topicHeader: "",
            },
            serverProcessedContent: { htmlStrings: {}, searchablePlainTexts: {}, imageSources: {}, links: {} },
            title: "Title area",
        };
    }
    static initFrom(o, url) {
        return (new ClientSidePage(extractWebUrl(o.toUrl()), url)).configureFrom(o);
    }
    get pageLayout() {
        return this.json.PageLayoutType;
    }
    set pageLayout(value) {
        this.json.PageLayoutType = value;
    }
    get bannerImageUrl() {
        return this.json.BannerImageUrl;
    }
    set bannerImageUrl(value) {
        this.json.BannerImageUrl = value;
        this._bannerImageDirty = true;
    }
    get bannerImageSourceType() {
        return this._layoutPart.properties.imageSourceType;
    }
    set bannerImageSourceType(value) {
        this._layoutPart.properties.imageSourceType = value;
    }
    get topicHeader() {
        return objectDefinedNotNull(this.json.TopicHeader) ? this.json.TopicHeader : "";
    }
    set topicHeader(value) {
        this.json.TopicHeader = value;
        this._layoutPart.properties.topicHeader = value;
        if (stringIsNullOrEmpty(value)) {
            this.showTopicHeader = false;
        }
    }
    // public get authors(): string[] {
    //     return this._layoutPart.properties.authorByline;
    // }
    // public set authors(value: string[]) {
    //     this.json.AuthorByline = value;
    //     this._layoutPart.properties.authorByline = value;
    //     this._layoutPart.properties.authors = null;
    // }
    get title() {
        return this._layoutPart.properties.title;
    }
    set title(value) {
        this.json.Title = value;
        this._layoutPart.properties.title = value;
    }
    get layoutType() {
        return this._layoutPart.properties.layoutType;
    }
    set layoutType(value) {
        this._layoutPart.properties.layoutType = value;
    }
    get headerTextAlignment() {
        return this._layoutPart.properties.textAlignment;
    }
    set headerTextAlignment(value) {
        this._layoutPart.properties.textAlignment = value;
    }
    get showTopicHeader() {
        return this._layoutPart.properties.showTopicHeader;
    }
    set showTopicHeader(value) {
        this._layoutPart.properties.showTopicHeader = value;
    }
    get showPublishDate() {
        return this._layoutPart.properties.showPublishDate;
    }
    set showPublishDate(value) {
        this._layoutPart.properties.showPublishDate = value;
    }
    /**
     * Add a section to this page
     */
    addSection() {
        const section = new CanvasSection(this, getNextOrder(this.sections));
        this.sections.push(section);
        return section;
    }
    fromJSON(pageData) {
        this.json = pageData;
        const canvasControls = JSON.parse(pageData.CanvasContent1);
        const layouts = JSON.parse(pageData.LayoutWebpartsContent);
        if (layouts && layouts.length > 0) {
            this._layoutPart = layouts[0];
        }
        this.setControls(canvasControls);
        return this;
    }
    /**
     * Loads this page's content from the server
     */
    load() {
        // load item id, then load page data from new pages api
        return this.getItem("Id", "CommentsDisabled").then(item => {
            return (new SharePointQueryable(this, `_api/sitepages/pages(${item.Id})`)).get().then(pageData => {
                this.commentsDisabled = item.CommentsDisabled;
                return this.fromJSON(pageData);
            });
        });
    }
    /**
     * Persists the content changes (sections, columns, and controls) [does not work with batching]
     *
     * @param publish If true the page is published, if false the changes are persisted to SharePoint but not published
     */
    save(publish = true) {
        if (this.json.Id === null) {
            throw Error("The id for this page is null. If you want to create a new page, please use ClientSidePage.Create");
        }
        // we will chain our work on this promise
        let promise = Promise.resolve({});
        if (this._bannerImageDirty) {
            // we have to do these gymnastics to set the banner image url
            promise = promise.then(_ => new Promise((resolve, reject) => {
                let origImgUrl = this.json.BannerImageUrl;
                if (isUrlAbsolute(origImgUrl)) {
                    // do our best to make this a server relative url by removing the x.sharepoint.com part
                    origImgUrl = origImgUrl.replace(/^https?:\/\/[a-z0-9\.]*?\.[a-z]{2,3}\//i, "/");
                }
                const site = new Site(extractWebUrl(this.toUrl()));
                const web = new Web(extractWebUrl(this.toUrl()));
                const imgFile = web.getFileByServerRelativePath(origImgUrl);
                let siteId = "";
                let webId = "";
                let imgId = "";
                let listId = "";
                let webUrl = "";
                Promise.all([
                    site.select("Id", "Url").get().then(r => siteId = r.Id),
                    web.select("Id", "Url").get().then(r => { webId = r.Id; webUrl = r.Url; }),
                    imgFile.listItemAllFields.select("UniqueId", "ParentList/Id").expand("ParentList").get().then(r => { imgId = r.UniqueId; listId = r.ParentList.Id; }),
                ]).then(() => {
                    const f = new SharePointQueryable(webUrl, "_layouts/15/getpreview.ashx");
                    f.query.set("guidSite", `${siteId}`);
                    f.query.set("guidWeb", `${webId}`);
                    f.query.set("guidFile", `${imgId}`);
                    this.bannerImageUrl = f.toUrlAndQuery();
                    if (!objectDefinedNotNull(this._layoutPart.serverProcessedContent)) {
                        this._layoutPart.serverProcessedContent = {};
                    }
                    this._layoutPart.serverProcessedContent.imageSources = { imageSource: origImgUrl };
                    if (!objectDefinedNotNull(this._layoutPart.serverProcessedContent.customMetadata)) {
                        this._layoutPart.serverProcessedContent.customMetadata = {};
                    }
                    this._layoutPart.serverProcessedContent.customMetadata.imageSource = {
                        listId,
                        siteId,
                        uniqueId: imgId,
                        webId,
                    };
                    this._layoutPart.properties.webId = webId;
                    this._layoutPart.properties.siteId = siteId;
                    this._layoutPart.properties.listId = listId;
                    this._layoutPart.properties.uniqueId = imgId;
                    resolve();
                }).catch(reject);
            }));
        }
        // we need to update our authors if they have changed
        // if (this._layoutPart.properties.authors === null && this._layoutPart.properties.authorByline.length > 0) {
        //     promise = promise.then(_ => new Promise(resolve => {
        //         const collector: any[] = [];
        //         const userResolver = ClientSidePage.getPoster("/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerResolveUser");
        //         this._layoutPart.properties.authorByline.forEach(async author => {
        //             const userData = await userResolver.postCore({
        //                 body: jsS({
        //                     queryParams: {
        //                         AllowEmailAddresses: false,
        //                         MaximumEntitySuggestions: 1,
        //                         PrincipalSource: 15,
        //                         PrincipalType: 1,
        //                         QueryString: author,
        //                         SharePointGroupID: 0,
        //                     },
        //                 }),
        //             });
        //             collector.push({
        //                 email: userData.EntityData.Email,
        //                 id: userData.Key,
        //                 name: userData.DisplayName,
        //                 role: "",
        //                 upn: userData.EntityData.Email,
        //             });
        //         });
        //         this._layoutPart.properties.authors = collector;
        //         resolve();
        //     }));
        // }
        // we try and check out the page for the user
        if (!this.json.IsPageCheckedOutToCurrentUser) {
            promise = promise.then(_ => (ClientSidePage.initFrom(this, `_api/sitepages/pages(${this.json.Id})/checkoutpage`)).postCore());
        }
        promise = promise.then(_ => {
            const saveBody = Object.assign(metadata("SP.Publishing.SitePage"), {
                AuthorByline: this.json.AuthorByline || [],
                BannerImageUrl: this.bannerImageUrl,
                CanvasContent1: this.getCanvasContent1(),
                LayoutWebpartsContent: this.getLayoutWebpartsContent(),
                Title: this.title,
                TopicHeader: this.topicHeader,
            });
            const updater = ClientSidePage.initFrom(this, `_api/sitepages/pages(${this.json.Id})/savepage`);
            updater.configure({
                headers: {
                    "if-match": "*",
                },
            });
            return updater.postCore({ body: jsS(saveBody) });
        });
        if (publish) {
            promise = promise.then(_ => (ClientSidePage.initFrom(this, `_api/sitepages/pages(${this.json.Id})/publish`)).postCore()).then(r => {
                if (r) {
                    this.json.IsPageCheckedOutToCurrentUser = false;
                }
            });
        }
        promise = promise.then(_ => {
            // these are post-save actions
            this._bannerImageDirty = false;
        });
        return promise;
    }
    discardPageCheckout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.json.Id === null) {
                throw Error("The id for this page is null. If you want to create a new page, please use ClientSidePage.Create");
            }
            const d = yield ClientSidePage.initFrom(this, `_api/sitepages/pages(${this.json.Id})/discardPage`).postCore({
                body: jsS(metadata("SP.Publishing.SitePage")),
            });
            this.fromJSON(d);
        });
    }
    promoteToNews() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.promoteNewsImpl("promoteToNews");
        });
    }
    // API is currently broken on server side
    // public async demoteFromNews(): Promise<boolean> {
    //     return this.promoteNewsImpl("demoteFromNews");
    // }
    /**
     * Enables comments on this page
     */
    enableComments() {
        return this.setCommentsOn(true).then(r => {
            this.commentsDisabled = false;
            return r;
        });
    }
    /**
     * Disables comments on this page
     */
    disableComments() {
        return this.setCommentsOn(false).then(r => {
            this.commentsDisabled = true;
            return r;
        });
    }
    /**
     * Finds a control by the specified instance id
     *
     * @param id Instance id of the control to find
     */
    findControlById(id) {
        return this.findControl((c) => c.id === id);
    }
    /**
     * Finds a control within this page's control tree using the supplied predicate
     *
     * @param predicate Takes a control and returns true or false, if true that control is returned by findControl
     */
    findControl(predicate) {
        // check all sections
        for (let i = 0; i < this.sections.length; i++) {
            // check all columns
            for (let j = 0; j < this.sections[i].columns.length; j++) {
                // check all controls
                for (let k = 0; k < this.sections[i].columns[j].controls.length; k++) {
                    // check to see if the predicate likes this control
                    if (predicate(this.sections[i].columns[j].controls[k])) {
                        return this.sections[i].columns[j].controls[k];
                    }
                }
            }
        }
        // we found nothing so give nothing back
        return null;
    }
    /**
     * Like the modern site page
     */
    like() {
        return this.getItem().then(i => {
            return i.like();
        });
    }
    /**
     * Unlike the modern site page
     */
    unlike() {
        return this.getItem().then(i => {
            return i.unlike();
        });
    }
    /**
     * Get the liked by information for a modern site page
     */
    getLikedByInformation() {
        return this.getItem().then(i => {
            return i.getLikedByInformation();
        });
    }
    /**
     * Creates a copy of this page
     *
     * @param web The web where we will create the copy
     * @param pageName The file name of the new page
     * @param title The title of the new page
     * @param publish If true the page will be published
     */
    copyPage(web, pageName, title, publish = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield ClientSidePage.create(web, pageName, title, this.pageLayout);
            page.setControls(this.getControls());
            yield page.save(publish);
            return page;
        });
    }
    /**
     * Sets the modern page banner image
     *
     * @param url Url of the image to display
     * @param altText Alt text to describe the image
     * @param bannerProps Additional properties to control display of the banner
     */
    setBannerImage(url, props) {
        this.bannerImageUrl = url;
        this.bannerImageSourceType = 2; // this seems to always be true, so default?
        if (objectDefinedNotNull(props)) {
            if (hOP(props, "translateX")) {
                this._layoutPart.properties.translateX = props.translateX;
            }
            if (hOP(props, "translateY")) {
                this._layoutPart.properties.translateY = props.translateY;
            }
            if (hOP(props, "imageSourceType")) {
                this.bannerImageSourceType = props.imageSourceType;
            }
            if (hOP(props, "altText")) {
                this._layoutPart.properties.altText = props.altText;
            }
        }
    }
    getCanvasContent1() {
        return JSON.stringify(this.getControls());
    }
    getLayoutWebpartsContent() {
        if (this._layoutPart) {
            return JSON.stringify([this._layoutPart]);
        }
        else {
            return JSON.stringify(null);
        }
    }
    setControls(controls) {
        if (controls && controls.length) {
            for (let i = 0; i < controls.length; i++) {
                // if no control type is present this is a column which we give type 0 to let us process it
                const controlType = hOP(controls[i], "controlType") ? controls[i].controlType : 0;
                switch (controlType) {
                    case 0:
                        // empty canvas column or page settings
                        if (hOP(controls[i], "pageSettingsSlice")) {
                            this._pageSettings = controls[i];
                        }
                        else {
                            // we have an empty column
                            this.mergeColumnToTree(new CanvasColumn(controls[i]));
                        }
                        break;
                    case 3:
                        const part = new ClientSideWebpart(controls[i]);
                        this.mergePartToTree(part, part.data.position);
                        break;
                    case 4:
                        const textData = controls[i];
                        const text = new ClientSideText(textData.innerHTML, textData);
                        this.mergePartToTree(text, text.data.position);
                        break;
                }
            }
            reindex(this.sections);
        }
    }
    getControls() {
        // reindex things
        reindex(this.sections);
        // rollup the control changes
        const canvasData = [];
        this.sections.forEach(section => {
            section.columns.forEach(column => {
                if (column.controls.length < 1) {
                    // empty column
                    canvasData.push({
                        displayMode: column.data.displayMode,
                        emphasis: this.getEmphasisObj(section.emphasis),
                        position: column.data.position,
                    });
                }
                else {
                    column.controls.forEach(control => {
                        control.data.emphasis = this.getEmphasisObj(section.emphasis);
                        canvasData.push(control.data);
                    });
                }
            });
        });
        canvasData.push(this._pageSettings);
        return canvasData;
    }
    getEmphasisObj(value) {
        if (value < 1 || value > 3) {
            return {};
        }
        return { zoneEmphasis: value };
    }
    /**
     * Sets the comments flag for a page
     *
     * @param on If true comments are enabled, false they are disabled
     */
    setCommentsOn(on) {
        return this.getItem().then(i => {
            const updater = new Item(i, `SetCommentsDisabled(${!on})`);
            return updater.update({});
        });
    }
    promoteNewsImpl(method) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.json.Id === null) {
                throw Error("The id for this page is null. If you want to create a new page, please use ClientSidePage.Create");
            }
            const d = yield ClientSidePage.initFrom(this, `_api/sitepages/pages(${this.json.Id})/${method}`).postCore({
                body: jsS(metadata("SP.Publishing.SitePage")),
            });
            return d;
        });
    }
    /**
     * Merges the control into the tree of sections and columns for this page
     *
     * @param control The control to merge
     */
    mergePartToTree(control, positionData) {
        let section = null;
        let column = null;
        let sectionFactor = 12;
        let sectionIndex = 0;
        let zoneIndex = 0;
        // handle case where we don't have position data (shouldn't happen?)
        if (positionData) {
            if (hOP(positionData, "zoneIndex")) {
                zoneIndex = positionData.zoneIndex;
            }
            if (hOP(positionData, "sectionIndex")) {
                sectionIndex = positionData.sectionIndex;
            }
            if (hOP(positionData, "sectionFactor")) {
                sectionFactor = positionData.sectionFactor;
            }
        }
        const sections = this.sections.filter(s => s.order === zoneIndex);
        if (sections.length < 1) {
            section = new CanvasSection(this, zoneIndex);
            this.sections.push(section);
        }
        else {
            section = sections[0];
        }
        section.emphasis = control.data.emphasis && control.data.emphasis.zoneEmphasis ? control.data.emphasis.zoneEmphasis : 0;
        const columns = section.columns.filter(c => c.order === sectionIndex);
        if (columns.length < 1) {
            column = section.addColumn(sectionFactor);
        }
        else {
            column = columns[0];
        }
        control.column = column;
        column.addControl(control);
    }
    /**
     * Merges the supplied column into the tree
     *
     * @param column Column to merge
     * @param position The position data for the column
     */
    mergeColumnToTree(column) {
        const order = hOP(column.data, "position") && hOP(column.data.position, "zoneIndex") ? column.data.position.zoneIndex : 0;
        let section = null;
        const sections = this.sections.filter(s => s.order === order);
        if (sections.length < 1) {
            section = new CanvasSection(this, order);
            section.emphasis = column.data.emphasis.zoneEmphasis || 0;
            this.sections.push(section);
        }
        else {
            section = sections[0];
        }
        column.section = section;
        section.columns.push(column);
    }
    getItem(...selects) {
        const initer = ClientSidePage.initFrom(this, "/_api/lists/EnsureClientRenderedSitePagesLibrary").select("EnableModeration", "EnableMinorVersions", "Id");
        return initer.postCore().then(listData => {
            const item = (new List(listData["odata.id"])).configureFrom(this).items.getById(this.json.Id);
            return item.select.apply(item, selects).get().then((d) => {
                return extend((new Item(odataUrlFrom(d))).configureFrom(this), d);
            });
        });
    }
}
class CanvasSection {
    constructor(page, order, columns = [], _emphasis = 0) {
        this.page = page;
        this.columns = columns;
        this._emphasis = _emphasis;
        this._memId = getGUID();
        this._order = order;
    }
    get order() {
        return this._order;
    }
    set order(value) {
        this._order = value;
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].data.position.zoneIndex = value;
        }
    }
    /**
     * Default column (this.columns[0]) for this section
     */
    get defaultColumn() {
        if (this.columns.length < 1) {
            this.addColumn(12);
        }
        return this.columns[0];
    }
    /**
     * Adds a new column to this section
     */
    addColumn(factor) {
        const column = new CanvasColumn();
        column.section = this;
        column.data.position.zoneIndex = this.order;
        column.data.position.sectionFactor = factor;
        column.order = getNextOrder(this.columns);
        this.columns.push(column);
        return column;
    }
    /**
     * Adds a control to the default column for this section
     *
     * @param control Control to add to the default column
     */
    addControl(control) {
        this.defaultColumn.addControl(control);
        return this;
    }
    get emphasis() {
        return this._emphasis;
    }
    set emphasis(value) {
        this._emphasis = value;
    }
    /**
     * Removes this section and all contained columns and controls from the collection
     */
    remove() {
        this.page.sections = this.page.sections.filter(section => section._memId !== this._memId);
        reindex(this.page.sections);
    }
}
class CanvasColumn {
    constructor(json = JSON.parse(JSON.stringify(CanvasColumn.Default)), controls = []) {
        this.json = json;
        this.controls = controls;
        this._section = null;
        this._memId = getGUID();
    }
    get data() {
        return this.json;
    }
    get section() {
        return this._section;
    }
    set section(section) {
        this._section = section;
    }
    get order() {
        return this.data.position.sectionIndex;
    }
    set order(value) {
        this.data.position.sectionIndex = value;
        for (let i = 0; i < this.controls.length; i++) {
            this.controls[i].data.position.zoneIndex = this.data.position.zoneIndex;
            this.controls[i].data.position.sectionIndex = value;
        }
    }
    get factor() {
        return this.data.position.sectionFactor;
    }
    set factor(value) {
        this.data.position.sectionFactor = value;
    }
    addControl(control) {
        control.column = this;
        this.controls.push(control);
        return this;
    }
    getControl(index) {
        return this.controls[index];
    }
    remove() {
        this.section.columns = this.section.columns.filter(column => column._memId !== this._memId);
        reindex(this.section.columns);
    }
}
CanvasColumn.Default = {
    controlType: 0,
    displayMode: 2,
    emphasis: {},
    position: {
        layoutIndex: 1,
        sectionFactor: 12,
        sectionIndex: 1,
        zoneIndex: 1,
    },
};
class ColumnControl {
    constructor(json) {
        this.json = json;
    }
    get id() {
        return this.json.id;
    }
    get data() {
        return this.json;
    }
    get column() {
        return this._column;
    }
    set column(value) {
        this._column = value;
        this.onColumnChange(this._column);
    }
    remove() {
        this.column.controls = this.column.controls.filter(control => control.id !== this.id);
        reindex(this.column.controls);
    }
    setData(data) {
        this.json = data;
    }
}
class ClientSideText extends ColumnControl {
    constructor(text, json = JSON.parse(JSON.stringify(ClientSideText.Default))) {
        if (stringIsNullOrEmpty(json.id)) {
            json.id = getGUID();
            json.anchorComponentId = json.id;
        }
        super(json);
        this.text = text;
    }
    get text() {
        return this.data.innerHTML;
    }
    set text(value) {
        if (!value.startsWith("<p>")) {
            value = `<p>${value}</p>`;
        }
        this.data.innerHTML = value;
    }
    get order() {
        return this.data.position.controlIndex;
    }
    set order(value) {
        this.data.position.controlIndex = value;
    }
    onColumnChange(col) {
        this.data.position.sectionFactor = col.factor;
        this.data.position.controlIndex = getNextOrder(col.controls);
        this.data.position.zoneIndex = col.data.position.zoneIndex;
        this.data.position.sectionIndex = col.order;
    }
}
ClientSideText.Default = {
    addedFromPersistedData: false,
    anchorComponentId: "",
    controlType: 4,
    displayMode: 2,
    editorType: "CKEditor",
    emphasis: {},
    id: "",
    innerHTML: "",
    position: {
        controlIndex: 1,
        layoutIndex: 1,
        sectionFactor: 12,
        sectionIndex: 1,
        zoneIndex: 1,
    },
};
class ClientSideWebpart extends ColumnControl {
    constructor(json = JSON.parse(JSON.stringify(ClientSideWebpart.Default))) {
        super(json);
    }
    static fromComponentDef(definition) {
        const part = new ClientSideWebpart();
        part.import(definition);
        return part;
    }
    get title() {
        return this.data.webPartData.title;
    }
    set title(value) {
        this.data.webPartData.title = value;
    }
    get description() {
        return this.data.webPartData.description;
    }
    set description(value) {
        this.data.webPartData.description = value;
    }
    get order() {
        return this.data.position.controlIndex;
    }
    set order(value) {
        this.data.position.controlIndex = value;
    }
    get height() {
        return this.data.reservedHeight;
    }
    set height(value) {
        this.data.reservedHeight = value;
    }
    get width() {
        return this.data.reservedWidth;
    }
    set width(value) {
        this.data.reservedWidth = value;
    }
    get dataVersion() {
        return this.data.webPartData.dataVersion;
    }
    set dataVersion(value) {
        this.data.webPartData.dataVersion = value;
    }
    setProperties(properties) {
        this.data.webPartData.properties = extend(this.data.webPartData.properties, properties);
        return this;
    }
    getProperties() {
        return this.data.webPartData.properties;
    }
    onColumnChange(col) {
        this.data.position = {
            controlIndex: getNextOrder(col.controls),
            sectionFactor: col.factor,
            sectionIndex: col.data.position.sectionIndex,
            zoneIndex: col.data.position.zoneIndex,
        };
    }
    import(component) {
        const id = getGUID();
        const componendId = component.Id.replace(/^\{|\}$/g, "").toLowerCase();
        const manifest = JSON.parse(component.Manifest);
        const preconfiguredEntries = manifest.preconfiguredEntries[0];
        this.setData(Object.assign({}, this.data, {
            id,
            webPartData: {
                dataVersion: "1.0",
                description: preconfiguredEntries.description.default,
                id: componendId,
                instanceId: id,
                properties: preconfiguredEntries.properties,
                title: preconfiguredEntries.title.default,
            },
            webPartId: componendId,
        }));
    }
}
ClientSideWebpart.Default = {
    addedFromPersistedData: false,
    controlType: 3,
    displayMode: 2,
    emphasis: {},
    id: null,
    position: {
        controlIndex: 1,
        sectionFactor: 12,
        sectionIndex: 1,
        zoneIndex: 1,
    },
    reservedHeight: 500,
    reservedWidth: 500,
    webPartData: null,
    webPartId: null,
};

const funcs = new Map([
    ["text", "Querytext"],
    ["template", "QueryTemplate"],
    ["sourceId", "SourceId"],
    ["trimDuplicatesIncludeId", ""],
    ["startRow", ""],
    ["rowLimit", ""],
    ["rankingModelId", ""],
    ["rowsPerPage", ""],
    ["selectProperties", ""],
    ["culture", ""],
    ["timeZoneId", ""],
    ["refinementFilters", ""],
    ["refiners", ""],
    ["hiddenConstraints", ""],
    ["sortList", ""],
    ["timeout", ""],
    ["hithighlightedProperties", ""],
    ["clientType", ""],
    ["personalizationData", ""],
    ["resultsURL", ""],
    ["queryTag", ""],
    ["properties", ""],
    ["queryTemplatePropertiesUrl", ""],
    ["reorderingRules", ""],
    ["hitHighlightedMultivaluePropertyLimit", ""],
    ["collapseSpecification", ""],
    ["uiLanguage", ""],
    ["desiredSnippetLength", ""],
    ["maxSnippetLength", ""],
    ["summaryLength", ""],
]);
const props = new Map([]);
function toPropCase(str) {
    return str.replace(/^(.)/, ($1) => $1.toUpperCase());
}
/**
 * Creates a new instance of the SearchQueryBuilder
 *
 * @param queryText Initial query text
 * @param _query Any initial query configuration
 */
function SearchQueryBuilder(queryText = "", _query = {}) {
    return new Proxy({
        query: Object.assign({
            Querytext: queryText,
        }, _query),
    }, {
        get(self, propertyKey, proxy) {
            const pk = propertyKey.toString();
            if (pk === "toSearchQuery") {
                return () => self.query;
            }
            if (funcs.has(pk)) {
                return (...value) => {
                    const mappedPk = funcs.get(pk);
                    self.query[mappedPk.length > 0 ? mappedPk : toPropCase(pk)] = value.length > 1 ? value : value[0];
                    return proxy;
                };
            }
            const propKey = props.has(pk) ? props.get(pk) : toPropCase(pk);
            self.query[propKey] = true;
            return proxy;
        },
    });
}
/**
 * Describes the search API
 *
 */
let Search = class Search extends SharePointQueryableInstance {
    /**
     * @returns Promise
     */
    execute(queryInit) {
        const query = this.parseQuery(queryInit);
        const postBody = jsS({
            request: extend(metadata("Microsoft.Office.Server.Search.REST.SearchRequest"), Object.assign({}, query, {
                HitHighlightedProperties: this.fixArrProp(query.HitHighlightedProperties),
                Properties: this.fixArrProp(query.Properties),
                RefinementFilters: this.fixArrProp(query.RefinementFilters),
                ReorderingRules: this.fixArrProp(query.ReorderingRules),
                SelectProperties: this.fixArrProp(query.SelectProperties),
                SortList: this.fixArrProp(query.SortList),
            })),
        });
        // if we are using caching with this search request, then we need to handle some work upfront to enable that
        if (this._useCaching) {
            // force use of the cache for this request if .usingCaching was called
            this._forceCaching = true;
            // because all the requests use the same url they would collide in the cache we use a special key
            const cacheKey = `PnPjs.SearchWithCaching(${getHashCode(postBody)})`;
            if (objectDefinedNotNull(this._cachingOptions)) {
                // if our key ends in the postquery url we overwrite it
                if (/\/_api\/search\/postquery$/i.test(this._cachingOptions.key)) {
                    this._cachingOptions.key = cacheKey;
                }
            }
            else {
                this._cachingOptions = new CachingOptions(cacheKey);
            }
        }
        return this.postCore({ body: postBody }).then((data) => new SearchResults(data, this.toUrl(), query));
    }
    /**
     * Fix array property
     *
     * @param prop property to fix for container struct
     */
    fixArrProp(prop) {
        if (typeof prop === "undefined") {
            return ({ results: [] });
        }
        prop = isArray(prop) ? prop : [prop];
        return hOP(prop, "results") ? prop : { results: prop };
    }
    /**
     * Translates one of the query initializers into a SearchQuery instance
     *
     * @param query
     */
    parseQuery(query) {
        let finalQuery;
        if (typeof query === "string") {
            finalQuery = { Querytext: query };
        }
        else if (query.toSearchQuery) {
            finalQuery = query.toSearchQuery();
        }
        else {
            finalQuery = query;
        }
        return finalQuery;
    }
};
Search = __decorate([
    defaultPath("_api/search/postquery")
], Search);
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
        const rows = pageSize !== undefined ? pageSize : hOP(this._query, "RowLimit") ? this._query.RowLimit : 10;
        const query = extend(this._query, {
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
                    enumerable: true,
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
    QueryPropertyValueType[QueryPropertyValueType["Int32Type"] = 2] = "Int32Type";
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

let SearchSuggest = class SearchSuggest extends SharePointQueryableInstance {
    execute(query) {
        this.mapQueryToQueryString(query);
        return this.get().then(response => {
            const mapper = hOP(response, "suggest") ? (s) => response.suggest[s].results : (s) => response[s];
            return {
                PeopleNames: mapper("PeopleNames"),
                PersonalResults: mapper("PersonalResults"),
                Queries: mapper("Queries"),
            };
        });
    }
    mapQueryToQueryString(query) {
        const setProp = (q) => (checkProp) => (sp) => {
            if (hOP(q, checkProp)) {
                this.query.set(sp, q[checkProp].toString());
            }
        };
        this.query.set("querytext", `'${query.querytext}'`);
        const querySetter = setProp(query);
        querySetter("count")("inumberofquerysuggestions");
        querySetter("personalCount")("inumberofresultsuggestions");
        querySetter("preQuery")("fprequerysuggestions");
        querySetter("hitHighlighting")("fhithighlighting");
        querySetter("capitalize")("fcapitalizefirstletters");
        querySetter("culture")("culture");
        querySetter("stemming")("enablestemming");
        querySetter("includePeople")("showpeoplenamesuggestions");
        querySetter("queryRules")("enablequeryrules");
        querySetter("prefixMatch")("fprefixmatchallterms");
    }
};
SearchSuggest = __decorate([
    defaultPath("_api/search/suggest")
], SearchSuggest);

var ProfileLoader_1, ClientPeoplePickerQuery_1;
class UserProfileQuery extends SharePointQueryableInstance {
    /**
     * Creates a new instance of the UserProfileQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user profile query
     */
    constructor(baseUrl, path = "_api/sp.userprofiles.peoplemanager") {
        super(baseUrl, path);
        this.clientPeoplePickerQuery = (new ClientPeoplePickerQuery(baseUrl)).configureFrom(this);
        this.profileLoader = (new ProfileLoader(baseUrl)).configureFrom(this);
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
        q.query.set("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * A boolean value that indicates whether the current user is following the specified user
     *
     * @param loginName The account name of the user
     */
    amIFollowing(loginName) {
        const q = this.clone(UserProfileQuery, "amifollowing(@v)");
        q.query.set("@v", `'${encodeURIComponent(loginName)}'`);
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
        q.query.set("@v", `'${encodeURIComponent(loginName)}'`);
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
        q.query.set("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * Gets user properties for the specified user.
     *
     * @param loginName The account name of the user.
     */
    getPropertiesFor(loginName) {
        const q = this.clone(UserProfileQuery, "getpropertiesfor(@v)");
        q.query.set("@v", `'${encodeURIComponent(loginName)}'`);
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
        q.query.set("@v", `'${encodeURIComponent(loginName)}'`);
        return q.get();
    }
    /**
     * Removes the specified user from the user's list of suggested people to follow
     *
     * @param loginName The account name of the user
     */
    hideSuggestion(loginName) {
        const q = this.clone(UserProfileQuery, "hidesuggestion(@v)");
        q.query.set("@v", `'${encodeURIComponent(loginName)}'`);
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
        q.query.set("@v", `'${encodeURIComponent(follower)}'`);
        q.query.set("@y", `'${encodeURIComponent(followee)}'`);
        return q.get();
    }
    /**
     * Uploads and sets the user profile picture (Users can upload a picture to their own profile only). Not supported for batching.
     *
     * @param profilePicSource Blob data representing the user's picture in BMP, JPEG, or PNG format of up to 4.76MB
     */
    setMyProfilePic(profilePicSource) {
        return new Promise((resolve, reject) => {
            let buffer = null;
            const reader = new FileReader();
            reader.onload = (e) => buffer = e.target.result;
            reader.readAsArrayBuffer(profilePicSource);
            const request = new UserProfileQuery(this, "setmyprofilepicture");
            request.postCore({
                body: String.fromCharCode.apply(null, new Uint16Array(buffer)),
            }).then(_ => resolve()).catch(e => reject(e));
        });
    }
    /**
     * Sets single value User Profile property
     *
     * @param accountName The account name of the user
     * @param propertyName Property name
     * @param propertyValue Property value
     */
    setSingleValueProfileProperty(accountName, propertyName, propertyValue) {
        const postBody = jsS({
            accountName: accountName,
            propertyName: propertyName,
            propertyValue: propertyValue,
        });
        return this.clone(UserProfileQuery, "SetSingleValueProfileProperty")
            .postCore({ body: postBody });
    }
    /**
     * Sets multi valued User Profile property
     *
     * @param accountName The account name of the user
     * @param propertyName Property name
     * @param propertyValues Property values
     */
    setMultiValuedProfileProperty(accountName, propertyName, propertyValues) {
        const postBody = jsS({
            accountName: accountName,
            propertyName: propertyName,
            propertyValues: propertyValues,
        });
        return this.clone(UserProfileQuery, "SetMultiValuedProfileProperty")
            .postCore({ body: postBody });
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
    /**
     * Resolves user or group using specified query parameters
     *
     * @param queryParams The query parameters used to perform resolve
     */
    clientPeoplePickerResolveUser(queryParams) {
        return this.clientPeoplePickerQuery.clientPeoplePickerResolveUser(queryParams);
    }
    /**
     * Searches for users or groups using specified query parameters
     *
     * @param queryParams The query parameters used to perform search
     */
    clientPeoplePickerSearchUser(queryParams) {
        return this.clientPeoplePickerQuery.clientPeoplePickerSearchUser(queryParams);
    }
}
let ProfileLoader = ProfileLoader_1 = class ProfileLoader extends SharePointQueryable {
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only) Doesn't support batching
     *
     * @param emails The email addresses of the users to provision sites for
     */
    createPersonalSiteEnqueueBulk(emails) {
        return this.clone(ProfileLoader_1, "createpersonalsiteenqueuebulk", false).postCore({
            body: jsS({ "emailIDs": emails }),
        });
    }
    /**
     * Gets the user profile of the site owner.
     *
     */
    get ownerUserProfile() {
        let q = this.getParent(ProfileLoader_1, this.parentUrl, "_api/sp.userprofiles.profileloader.getowneruserprofile");
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
        return this.clone(ProfileLoader_1, "getuserprofile").postCore();
    }
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false (default) if non-interactively (client) initiated request
     */
    createPersonalSite(interactiveRequest = false) {
        return this.clone(ProfileLoader_1, `getuserprofile/createpersonalsiteenque(${interactiveRequest})`).postCore();
    }
    /**
     * Sets the privacy settings for this profile
     *
     * @param share true to make all social data public; false to make all social data private.
     */
    shareAllSocialData(share) {
        return this.clone(ProfileLoader_1, `getuserprofile/shareallsocialdata(${share})`).postCore();
    }
};
ProfileLoader = ProfileLoader_1 = __decorate([
    defaultPath("_api/sp.userprofiles.profileloader.getprofileloader")
], ProfileLoader);
let ClientPeoplePickerQuery = ClientPeoplePickerQuery_1 = class ClientPeoplePickerQuery extends SharePointQueryable {
    /**
     * Resolves user or group using specified query parameters
     *
     * @param queryParams The query parameters used to perform resolve
     */
    clientPeoplePickerResolveUser(queryParams) {
        const q = this.clone(ClientPeoplePickerQuery_1, null);
        q.concat(".clientpeoplepickerresolveuser");
        return q.postCore({
            body: this.createClientPeoplePickerQueryParametersRequestBody(queryParams),
        })
            .then(res => {
            if (typeof res === "object") {
                return res.ClientPeoplePickerResolveUser;
            }
            return res;
        })
            .then(JSON.parse);
    }
    /**
     * Searches for users or groups using specified query parameters
     *
     * @param queryParams The query parameters used to perform search
     */
    clientPeoplePickerSearchUser(queryParams) {
        const q = this.clone(ClientPeoplePickerQuery_1, null);
        q.concat(".clientpeoplepickersearchuser");
        return q.postCore({
            body: this.createClientPeoplePickerQueryParametersRequestBody(queryParams),
        })
            .then(res => {
            if (typeof res === "object") {
                return res.ClientPeoplePickerSearchUser;
            }
            return res;
        })
            .then(JSON.parse);
    }
    /**
     * Creates ClientPeoplePickerQueryParameters request body
     *
     * @param queryParams The query parameters to create request body
     */
    createClientPeoplePickerQueryParametersRequestBody(queryParams) {
        return jsS({
            "queryParams": extend(metadata("SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters"), queryParams),
        });
    }
};
ClientPeoplePickerQuery = ClientPeoplePickerQuery_1 = __decorate([
    defaultPath("_api/sp.ui.applicationpages.clientpeoplepickerwebserviceinterface")
], ClientPeoplePickerQuery);

var SocialQuery_1, MySocialQuery_1;
/**
 * Exposes social following methods
 */
let SocialQuery = SocialQuery_1 = class SocialQuery extends SharePointQueryableInstance {
    get my() {
        return new MySocialQuery(this);
    }
    /**
     * Gets a URI to a site that lists the current user's followed sites.
     */
    getFollowedSitesUri() {
        return this.clone(SocialQuery_1, "FollowedSitesUri").get().then(r => {
            return r.FollowedSitesUri || r;
        });
    }
    /**
     * Gets a URI to a site that lists the current user's followed documents.
     */
    getFollowedDocumentsUri() {
        return this.clone(SocialQuery_1, "FollowedDocumentsUri").get().then(r => {
            return r.FollowedDocumentsUri || r;
        });
    }
    /**
     * Makes the current user start following a user, document, site, or tag
     *
     * @param actorInfo The actor to start following
     */
    follow(actorInfo) {
        return this.clone(SocialQuery_1, "follow").postCore({ body: this.createSocialActorInfoRequestBody(actorInfo) });
    }
    /**
     * Indicates whether the current user is following a specified user, document, site, or tag
     *
     * @param actorInfo The actor to find the following status for
     */
    isFollowed(actorInfo) {
        return this.clone(SocialQuery_1, "isfollowed").postCore({ body: this.createSocialActorInfoRequestBody(actorInfo) });
    }
    /**
     * Makes the current user stop following a user, document, site, or tag
     *
     * @param actorInfo The actor to stop following
     */
    stopFollowing(actorInfo) {
        return this.clone(SocialQuery_1, "stopfollowing").postCore({ body: this.createSocialActorInfoRequestBody(actorInfo) });
    }
    /**
     * Creates SocialActorInfo request body
     *
     * @param actorInfo The actor to create request body
     */
    createSocialActorInfoRequestBody(actorInfo) {
        return jsS({
            "actor": Object.assign(metadata("SP.Social.SocialActorInfo"), {
                Id: null,
            }, actorInfo),
        });
    }
};
SocialQuery = SocialQuery_1 = __decorate([
    defaultPath("_api/social.following")
], SocialQuery);
let MySocialQuery = MySocialQuery_1 = class MySocialQuery extends SharePointQueryableInstance {
    /**
     * Gets users, documents, sites, and tags that the current user is following.
     *
     * @param types Bitwise set of SocialActorTypes to retrieve
     */
    followed(types) {
        return this.clone(MySocialQuery_1, `followed(types=${types})`).get().then(r => {
            return hOP(r, "Followed") ? r.Followed.results : r;
        });
    }
    /**
     * Gets the count of users, documents, sites, and tags that the current user is following.
     *
     * @param types Bitwise set of SocialActorTypes to retrieve
     */
    followedCount(types) {
        return this.clone(MySocialQuery_1, `followedcount(types=${types})`).get().then(r => {
            return r.FollowedCount || r;
        });
    }
    /**
     * Gets the users who are following the current user.
     */
    followers() {
        return this.clone(MySocialQuery_1, "followers").get().then(r => {
            return hOP(r, "Followers") ? r.Followers.results : r;
        });
    }
    /**
     * Gets users who the current user might want to follow.
     */
    suggestions() {
        return this.clone(MySocialQuery_1, "suggestions").get().then(r => {
            return hOP(r, "Suggestions") ? r.Suggestions.results : r;
        });
    }
};
MySocialQuery = MySocialQuery_1 = __decorate([
    defaultPath("my")
], MySocialQuery);
/**
 * Social actor type
 *
 */
var SocialActorType;
(function (SocialActorType) {
    SocialActorType[SocialActorType["User"] = 0] = "User";
    SocialActorType[SocialActorType["Document"] = 1] = "Document";
    SocialActorType[SocialActorType["Site"] = 2] = "Site";
    SocialActorType[SocialActorType["Tag"] = 3] = "Tag";
})(SocialActorType || (SocialActorType = {}));
/**
 * Social actor type
 *
 */
/* tslint:disable:no-bitwise */
var SocialActorTypes;
(function (SocialActorTypes) {
    SocialActorTypes[SocialActorTypes["None"] = 0] = "None";
    SocialActorTypes[SocialActorTypes["User"] = 1] = "User";
    SocialActorTypes[SocialActorTypes["Document"] = 2] = "Document";
    SocialActorTypes[SocialActorTypes["Site"] = 4] = "Site";
    SocialActorTypes[SocialActorTypes["Tag"] = 8] = "Tag";
    /**
     * The set excludes documents and sites that do not have feeds.
     */
    SocialActorTypes[SocialActorTypes["ExcludeContentWithoutFeeds"] = 268435456] = "ExcludeContentWithoutFeeds";
    /**
     * The set includes group sites
     */
    SocialActorTypes[SocialActorTypes["IncludeGroupsSites"] = 536870912] = "IncludeGroupsSites";
    /**
     * The set includes only items created within the last 24 hours
     */
    SocialActorTypes[SocialActorTypes["WithinLast24Hours"] = 1073741824] = "WithinLast24Hours";
})(SocialActorTypes || (SocialActorTypes = {}));
/* tslint:enable */
/**
 * Result from following
 *
 */
var SocialFollowResult;
(function (SocialFollowResult) {
    SocialFollowResult[SocialFollowResult["Ok"] = 0] = "Ok";
    SocialFollowResult[SocialFollowResult["AlreadyFollowing"] = 1] = "AlreadyFollowing";
    SocialFollowResult[SocialFollowResult["LimitReached"] = 2] = "LimitReached";
    SocialFollowResult[SocialFollowResult["InternalError"] = 3] = "InternalError";
})(SocialFollowResult || (SocialFollowResult = {}));
/**
 * Specifies an exception or status code.
 */
var SocialStatusCode;
(function (SocialStatusCode) {
    /**
     * The operation completed successfully
     */
    SocialStatusCode[SocialStatusCode["OK"] = 0] = "OK";
    /**
     * The request is invalid.
     */
    SocialStatusCode[SocialStatusCode["InvalidRequest"] = 1] = "InvalidRequest";
    /**
     *  The current user is not authorized to perform the operation.
     */
    SocialStatusCode[SocialStatusCode["AccessDenied"] = 2] = "AccessDenied";
    /**
     * The target of the operation was not found.
     */
    SocialStatusCode[SocialStatusCode["ItemNotFound"] = 3] = "ItemNotFound";
    /**
     * The operation is invalid for the target's current state.
     */
    SocialStatusCode[SocialStatusCode["InvalidOperation"] = 4] = "InvalidOperation";
    /**
     * The operation completed without modifying the target.
     */
    SocialStatusCode[SocialStatusCode["ItemNotModified"] = 5] = "ItemNotModified";
    /**
     * The operation failed because an internal error occurred.
     */
    SocialStatusCode[SocialStatusCode["InternalError"] = 6] = "InternalError";
    /**
     * The operation failed because the server could not access the distributed cache.
     */
    SocialStatusCode[SocialStatusCode["CacheReadError"] = 7] = "CacheReadError";
    /**
     * The operation succeeded but the server could not update the distributed cache.
     */
    SocialStatusCode[SocialStatusCode["CacheUpdateError"] = 8] = "CacheUpdateError";
    /**
     * No personal site exists for the current user, and no further information is available.
     */
    SocialStatusCode[SocialStatusCode["PersonalSiteNotFound"] = 9] = "PersonalSiteNotFound";
    /**
     * No personal site exists for the current user, and a previous attempt to create one failed.
     */
    SocialStatusCode[SocialStatusCode["FailedToCreatePersonalSite"] = 10] = "FailedToCreatePersonalSite";
    /**
     * No personal site exists for the current user, and a previous attempt to create one was not authorized.
     */
    SocialStatusCode[SocialStatusCode["NotAuthorizedToCreatePersonalSite"] = 11] = "NotAuthorizedToCreatePersonalSite";
    /**
     * No personal site exists for the current user, and no attempt should be made to create one.
     */
    SocialStatusCode[SocialStatusCode["CannotCreatePersonalSite"] = 12] = "CannotCreatePersonalSite";
    /**
     * The operation was rejected because an internal limit had been reached.
     */
    SocialStatusCode[SocialStatusCode["LimitReached"] = 13] = "LimitReached";
    /**
     * The operation failed because an error occurred during the processing of the specified attachment.
     */
    SocialStatusCode[SocialStatusCode["AttachmentError"] = 14] = "AttachmentError";
    /**
     * The operation succeeded with recoverable errors; the returned data is incomplete.
     */
    SocialStatusCode[SocialStatusCode["PartialData"] = 15] = "PartialData";
    /**
     * A required SharePoint feature is not enabled.
     */
    SocialStatusCode[SocialStatusCode["FeatureDisabled"] = 16] = "FeatureDisabled";
    /**
     * The site's storage quota has been exceeded.
     */
    SocialStatusCode[SocialStatusCode["StorageQuotaExceeded"] = 17] = "StorageQuotaExceeded";
    /**
     * The operation failed because the server could not access the database.
     */
    SocialStatusCode[SocialStatusCode["DatabaseError"] = 18] = "DatabaseError";
})(SocialStatusCode || (SocialStatusCode = {}));

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
            body: jsS(props),
        });
    }
    /**
     * Sends an email based on the supplied properties
     *
     * @param props The properties of the email to send
     */
    sendEmail(props) {
        const params = {
            properties: extend(metadata("SP.Utilities.EmailProperties"), {
                Body: props.Body,
                From: props.From,
                Subject: props.Subject,
            }),
        };
        if (props.To && props.To.length > 0) {
            params.properties = extend(params.properties, {
                To: { results: props.To },
            });
        }
        if (props.CC && props.CC.length > 0) {
            params.properties = extend(params.properties, {
                CC: { results: props.CC },
            });
        }
        if (props.BCC && props.BCC.length > 0) {
            params.properties = extend(params.properties, {
                BCC: { results: props.BCC },
            });
        }
        if (props.AdditionalHeaders) {
            params.properties = extend(params.properties, {
                AdditionalHeaders: props.AdditionalHeaders,
            });
        }
        return this.clone(UtilityMethod, "SendEmail", true).excute(params);
    }
    getCurrentUserEmailAddresses() {
        return this.clone(UtilityMethod, "GetCurrentUserEmailAddresses", true).excute({}).then(r => {
            return hOP(r, "GetCurrentUserEmailAddresses") ? r.GetCurrentUserEmailAddresses : r;
        });
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
        return this.clone(UtilityMethod, "ResolvePrincipalInCurrentContext", true).excute(params).then(r => {
            return hOP(r, "ResolvePrincipalInCurrentContext") ? r.ResolvePrincipalInCurrentContext : r;
        });
    }
    searchPrincipals(input, scopes, sources, groupName, maxCount) {
        const params = {
            groupName: groupName,
            input: input,
            maxCount: maxCount,
            scopes: scopes,
            sources: sources,
        };
        return this.clone(UtilityMethod, "SearchPrincipalsUsingContextWeb", true).excute(params).then(r => {
            return hOP(r, "SearchPrincipalsUsingContextWeb") ? r.SearchPrincipalsUsingContextWeb : r;
        });
    }
    createEmailBodyForInvitation(pageAddress) {
        const params = {
            pageAddress: pageAddress,
        };
        return this.clone(UtilityMethod, "CreateEmailBodyForInvitation", true).excute(params).then(r => {
            return hOP(r, "CreateEmailBodyForInvitation") ? r.CreateEmailBodyForInvitation : r;
        });
    }
    expandGroupsToPrincipals(inputs, maxCount = 30) {
        const params = {
            inputs: inputs,
            maxCount: maxCount,
        };
        return this.clone(UtilityMethod, "ExpandGroupsToPrincipals", true).excute(params).then(r => {
            return hOP(r, "ExpandGroupsToPrincipals") ? r.ExpandGroupsToPrincipals : r;
        });
    }
    createWikiPage(info) {
        return this.clone(UtilityMethod, "CreateWikiPageInContextWeb", true).excute({
            parameters: info,
        }).then(r => {
            return {
                data: hOP(r, "CreateWikiPageInContextWeb") ? r.CreateWikiPageInContextWeb : r,
                file: new File(odataUrlFrom(r)),
            };
        });
    }
    /**
     * Checks if file or folder name contains invalid characters
     *
     * @param input File or folder name to check
     * @param onPremise Set to true for SharePoint On-Premise
     * @returns True if contains invalid chars, false otherwise
     */
    containsInvalidFileFolderChars(input, onPremise = false) {
        if (onPremise) {
            return UtilityMethod.InvalidFileFolderNameCharsOnPremiseRegex.test(input);
        }
        else {
            return UtilityMethod.InvalidFileFolderNameCharsOnlineRegex.test(input);
        }
    }
    /**
     * Removes invalid characters from file or folder name
     *
     * @param input File or folder name
     * @param replacer Value that will replace invalid characters
     * @param onPremise Set to true for SharePoint On-Premise
     * @returns File or folder name with replaced invalid characters
     */
    stripInvalidFileFolderChars(input, replacer = "", onPremise = false) {
        if (onPremise) {
            return input.replace(UtilityMethod.InvalidFileFolderNameCharsOnPremiseRegex, replacer);
        }
        else {
            return input.replace(UtilityMethod.InvalidFileFolderNameCharsOnlineRegex, replacer);
        }
    }
}
UtilityMethod.InvalidFileFolderNameCharsOnlineRegex = /["*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;
UtilityMethod.InvalidFileFolderNameCharsOnPremiseRegex = /["#%*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;

/**
 * Describes a collection of Hub Sites
 *
 */
let HubSites = class HubSites extends SharePointQueryableCollection {
    /**
     * Gets a Hub Site from the collection by id
     *
     * @param id The Id of the Hub Site
     */
    getById(id) {
        return new HubSite(this, `GetById?hubSiteId='${id}'`);
    }
};
HubSites = __decorate([
    defaultPath("_api/hubsites")
], HubSites);
class HubSite extends SharePointQueryableInstance {
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
        return this.create(SearchSuggest).execute(finalQuery);
    }
    /**
     * Executes a search against this web context
     *
     * @param query The SearchQuery definition
     */
    search(query) {
        return this.create(Search).execute(query);
    }
    /**
     * Executes the provided search query, caching the results
     *
     * @param query The SearchQuery definition
     * @param options The set of caching options used to store the results
     */
    searchWithCaching(query, options) {
        return this.create(Search).usingCaching(options).execute(query);
    }
    /**
     * Begins a site collection scoped REST request
     *
     */
    get site() {
        return this.create(Site);
    }
    /**
     * Begins a web scoped REST request
     *
     */
    get web() {
        return this.create(Web);
    }
    /**
     * Access to user profile methods
     *
     */
    get profiles() {
        return this.create(UserProfileQuery);
    }
    /**
     * Access to social methods
     */
    get social() {
        return this.create(SocialQuery);
    }
    /**
     * Access to the site collection level navigation service
     */
    get navigation() {
        return this.create(NavigationService);
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
        return this.create(UtilityMethod, "");
    }
    /**
     * Access to sitescripts methods
     */
    get siteScripts() {
        return this.create(SiteScripts$1, "");
    }
    /**
     * Access to sitedesigns methods
     */
    get siteDesigns() {
        return this.create(SiteDesigns, "");
    }
    /**
     * Access to Hub Site methods
     */
    get hubSites() {
        return this.create(HubSites);
    }
    /**
     * Gets the Web instance representing the tenant app catalog web
     */
    getTenantAppCatalogWeb() {
        return this.create(Web, "_api/SP_TenantSettings_Current").get().then(r => {
            return (new Web(r.CorporateCatalogUrl)).configure(this._options);
        });
    }
    /**
     * Handles creating and configuring the objects returned from this class
     *
     * @param fm The factory method used to create the instance
     * @param path Optional additional path information to pass to the factory method
     */
    create(fm, path) {
        return new fm(this._baseUrl, path).configure(this._options);
    }
}
const sp = new SPRest();

export { odataUrlFrom, spODataEntity, spODataEntityArray, SharePointQueryable, SharePointQueryableInstance, SharePointQueryableCollection, SharePointQueryableSecurable, FileFolderShared, SharePointQueryableShareable, SharePointQueryableShareableFile, SharePointQueryableShareableFolder, SharePointQueryableShareableItem, SharePointQueryableShareableWeb, AppCatalog, App, SPBatch, ContentType, ContentTypes, FieldLink, FieldLinks, Field, Fields, CheckinType, WebPartsPersonalizationScope, MoveOperations, TemplateFileType, File, Files, Folder, Folders, SPHttpClient, Item, Items, ItemVersion, ItemVersions, PagedItemCollection, NavigationNodes, NavigationNode, NavigationService, List, Lists, RegionalSettings, InstalledLanguages, TimeZone, TimeZones, sp, SPRest, RoleDefinitionBindings, Search, SearchQueryBuilder, SearchResults, SortDirection, ReorderingRuleMatchType, QueryPropertyValueType, SearchBuiltInSourceId, SearchSuggest, Site, UserProfileQuery, toAbsoluteUrl, extractWebUrl, UtilityMethod, View, Views, ViewFields, WebPartDefinitions, WebPartDefinition, WebPart, Web, SiteScripts$1 as SiteScripts, SiteDesigns, HubSite, HubSites, PromotedState, ClientSidePage, CanvasSection, CanvasColumn, ColumnControl, ClientSideText, ClientSideWebpart, Comments, Comment, Replies, SocialQuery, MySocialQuery, SocialActorType, SocialActorTypes, SocialFollowResult, SocialStatusCode, ControlMode, FieldTypes, DateTimeFieldFormatType, DateTimeFieldFriendlyFormatType, AddFieldOptions, CalendarType, UrlFieldFormatType, PermissionKind, PrincipalType$1 as PrincipalType, PrincipalSource, RoleType, PageType, SharingLinkKind, SharingRole, SharingOperationStatusCode, SPSharedObjectType, SharingDomainRestrictionMode, RenderListDataOptions, FieldUserSelectionMode, ChoiceFieldFormatType, UrlZone };
//# sourceMappingURL=sp.js.map
