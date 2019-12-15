/**
 * @license
 * v1.2.9
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { RuntimeConfig, AdalClient, extend, mergeHeaders, getCtxCallback, combine, isUrlAbsolute, getGUID, jsS } from '@pnp/common';
import { ODataQueryable, BlobParser, BufferParser, ODataDefaultParser, ODataBatch } from '@pnp/odata';
import { Logger } from '@pnp/logging';

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function setup(config) {
    RuntimeConfig.extend(config);
}
var GraphRuntimeConfigImpl = /** @class */ (function () {
    function GraphRuntimeConfigImpl() {
    }
    Object.defineProperty(GraphRuntimeConfigImpl.prototype, "headers", {
        get: function () {
            var graphPart = RuntimeConfig.get("graph");
            if (graphPart !== undefined && graphPart !== null && graphPart.headers !== undefined) {
                return graphPart.headers;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRuntimeConfigImpl.prototype, "fetchClientFactory", {
        get: function () {
            var graphPart = RuntimeConfig.get("graph");
            // use a configured factory firt
            if (graphPart !== undefined && graphPart !== null && graphPart.fetchClientFactory !== undefined) {
                return graphPart.fetchClientFactory;
            }
            // then try and use spfx context if available
            if (RuntimeConfig.spfxContext !== undefined) {
                return function () { return AdalClient.fromSPFxContext(RuntimeConfig.spfxContext); };
            }
            throw Error("There is no Graph Client available, either set one using configuraiton or provide a valid SPFx Context using setup.");
        },
        enumerable: true,
        configurable: true
    });
    return GraphRuntimeConfigImpl;
}());
var GraphRuntimeConfig = new GraphRuntimeConfigImpl();

var GraphHttpClient = /** @class */ (function () {
    function GraphHttpClient() {
        this._impl = GraphRuntimeConfig.fetchClientFactory();
    }
    GraphHttpClient.prototype.fetch = function (url, options) {
        if (options === void 0) { options = {}; }
        var headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        mergeHeaders(headers, GraphRuntimeConfig.headers);
        // second we add the local options so we can overwrite the globals
        mergeHeaders(headers, options.headers);
        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json");
        }
        var opts = extend(options, { headers: headers });
        return this.fetchRaw(url, opts);
    };
    GraphHttpClient.prototype.fetchRaw = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // here we need to normalize the headers
        var rawHeaders = new Headers();
        mergeHeaders(rawHeaders, options.headers);
        options = extend(options, { headers: rawHeaders });
        var retry = function (ctx) {
            _this._impl.fetch(url, options).then(function (response) { return ctx.resolve(response); }).catch(function (response) {
                // Check if request was throttled - http status code 429
                // Check if request failed due to server unavailable - http status code 503
                if (response.status !== 429 && response.status !== 503) {
                    ctx.reject(response);
                }
                // grab our current delay
                var delay = ctx.delay;
                // Increment our counters.
                ctx.delay *= 2;
                ctx.attempts++;
                // If we have exceeded the retry count, reject.
                if (ctx.retryCount <= ctx.attempts) {
                    ctx.reject(response);
                }
                // Set our retry timeout for {delay} milliseconds.
                setTimeout(getCtxCallback(_this, retry, ctx), delay);
            });
        };
        return new Promise(function (resolve, reject) {
            var retryContext = {
                attempts: 0,
                delay: 100,
                reject: reject,
                resolve: resolve,
                retryCount: 7,
            };
            retry.call(_this, retryContext);
        });
    };
    GraphHttpClient.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = extend(options, { method: "GET" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.post = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = extend(options, { method: "POST" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.patch = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = extend(options, { method: "PATCH" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = extend(options, { method: "DELETE" });
        return this.fetch(url, opts);
    };
    return GraphHttpClient;
}());

var GraphEndpoints = /** @class */ (function () {
    function GraphEndpoints() {
    }
    /**
     *
     * @param url The url to set the endpoint
     */
    GraphEndpoints.ensure = function (url, endpoint) {
        var all = [GraphEndpoints.Beta, GraphEndpoints.V1];
        var regex = new RegExp(endpoint, "i");
        var replaces = all.filter(function (s) { return !regex.test(s); }).map(function (s) { return s.replace(".", "\\."); });
        regex = new RegExp("/?(" + replaces.join("|") + ")/", "ig");
        return url.replace(regex, "/" + endpoint + "/");
    };
    GraphEndpoints.Beta = "beta";
    GraphEndpoints.V1 = "v1.0";
    return GraphEndpoints;
}());

/**
 * Queryable Base Class
 *
 */
var GraphQueryable = /** @class */ (function (_super) {
    __extends(GraphQueryable, _super);
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param baseUrl A string or Queryable that should form the base part of the url
     *
     */
    function GraphQueryable(baseUrl, path) {
        var _this = _super.call(this) || this;
        if (typeof baseUrl === "string") {
            var urlStr = baseUrl;
            _this._parentUrl = urlStr;
            _this._url = combine(urlStr, path);
        }
        else {
            _this.extend(baseUrl, path);
        }
        return _this;
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    GraphQueryable.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        if (selects.length > 0) {
            this.query.set("$select", selects.join(","));
        }
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    GraphQueryable.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i] = arguments[_i];
        }
        if (expands.length > 0) {
            this.query.set("$expand", expands.join(","));
        }
        return this;
    };
    /**
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new queryable
     */
    GraphQueryable.prototype.as = function (factory) {
        var o = new factory(this._url, null);
        return extend(o, this, true);
    };
    /**
     * Gets the full url with query information
     *
     */
    GraphQueryable.prototype.toUrlAndQuery = function () {
        var url = this.toUrl();
        if (!isUrlAbsolute(url)) {
            url = combine("https://graph.microsoft.com", url);
        }
        if (this.query.size > 0) {
            var char = url.indexOf("?") > -1 ? "&" : "?";
            url += "" + char + Array.from(this.query).map(function (v) { return v[0] + "=" + v[1]; }).join("&");
        }
        return url;
    };
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    GraphQueryable.prototype.getParent = function (factory, baseUrl, path) {
        if (baseUrl === void 0) { baseUrl = this.parentUrl; }
        return new factory(baseUrl, path);
    };
    /**
     * Clones this queryable into a new queryable instance of T
     * @param factory Constructor used to create the new instance
     * @param additionalPath Any additional path to include in the clone
     * @param includeBatch If true this instance's batch will be added to the cloned instance
     */
    GraphQueryable.prototype.clone = function (factory, additionalPath, includeBatch) {
        if (includeBatch === void 0) { includeBatch = true; }
        return _super.prototype._clone.call(this, new factory(this, additionalPath), { includeBatch: includeBatch });
    };
    GraphQueryable.prototype.setEndpoint = function (endpoint) {
        this._url = GraphEndpoints.ensure(this._url, endpoint);
        return this;
    };
    /**
     * Converts the current instance to a request context
     *
     * @param verb The request verb
     * @param options The set of supplied request options
     * @param parser The supplied ODataParser instance
     * @param pipeline Optional request processing pipeline
     */
    GraphQueryable.prototype.toRequestContext = function (verb, options, parser, pipeline) {
        if (options === void 0) { options = {}; }
        var dependencyDispose = this.hasBatch ? this._batchDependency : function () { return; };
        return Promise.resolve({
            batch: this.batch,
            batchDependency: dependencyDispose,
            cachingOptions: this._cachingOptions,
            clientFactory: function () { return new GraphHttpClient(); },
            isBatched: this.hasBatch,
            isCached: /^get$/i.test(verb) && this._useCaching,
            options: options,
            parser: parser,
            pipeline: pipeline,
            requestAbsoluteUrl: this.toUrlAndQuery(),
            requestId: getGUID(),
            verb: verb,
        });
    };
    return GraphQueryable;
}(ODataQueryable));
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
var GraphQueryableCollection = /** @class */ (function (_super) {
    __extends(GraphQueryableCollection, _super);
    function GraphQueryableCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param filter The string representing the filter query
     */
    GraphQueryableCollection.prototype.filter = function (filter) {
        this.query.set("$filter", filter);
        return this;
    };
    /**
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    GraphQueryableCollection.prototype.orderBy = function (orderBy, ascending) {
        if (ascending === void 0) { ascending = true; }
        var o = "$orderby";
        var query = this.query.has(o) ? this.query.get(o).split(",") : [];
        query.push(orderBy + " " + (ascending ? "asc" : "desc"));
        this.query.set(o, query.join(","));
        return this;
    };
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    GraphQueryableCollection.prototype.top = function (top) {
        this.query.set("$top", top.toString());
        return this;
    };
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    GraphQueryableCollection.prototype.skip = function (num) {
        this.query.set("$skip", num.toString());
        return this;
    };
    /**
     * 	To request second and subsequent pages of Graph data
     */
    GraphQueryableCollection.prototype.skipToken = function (token) {
        this.query.set("$skiptoken", token);
        return this;
    };
    Object.defineProperty(GraphQueryableCollection.prototype, "count", {
        /**
         * 	Retrieves the total count of matching resources
         */
        get: function () {
            this.query.set("$count", "true");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    return GraphQueryableCollection;
}(GraphQueryable));
var GraphQueryableSearchableCollection = /** @class */ (function (_super) {
    __extends(GraphQueryableSearchableCollection, _super);
    function GraphQueryableSearchableCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 	To request second and subsequent pages of Graph data
     */
    GraphQueryableSearchableCollection.prototype.search = function (query) {
        this.query.set("$search", query);
        return this;
    };
    return GraphQueryableSearchableCollection;
}(GraphQueryableCollection));
/**
 * Represents an instance that can be selected
 *
 */
var GraphQueryableInstance = /** @class */ (function (_super) {
    __extends(GraphQueryableInstance, _super);
    function GraphQueryableInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GraphQueryableInstance;
}(GraphQueryable));
/**
 * Decorator used to specify the default path for Queryable objects
 *
 * @param path
 */
function defaultPath(path) {
    return function (target) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.call(this, args[0], args.length > 1 && args[1] !== undefined ? args[1] : path) || this;
            }
            return class_1;
        }(target));
    };
}

var Members = /** @class */ (function (_super) {
    __extends(Members, _super);
    function Members() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Members_1 = Members;
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: https://graph.microsoft.com/v1.0/directoryObjects/${id})
     */
    Members.prototype.add = function (id) {
        return this.clone(Members_1, "$ref").postCore({
            body: jsS({
                "@odata.id": id,
            }),
        });
    };
    /**
     * Gets a member of the group by id
     *
     * @param id Group member's id
     */
    Members.prototype.getById = function (id) {
        return new Member(this, id);
    };
    var Members_1;
    Members = Members_1 = __decorate([
        defaultPath("members")
    ], Members);
    return Members;
}(GraphQueryableCollection));
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Removes this Member
     */
    Member.prototype.remove = function () {
        return this.clone(Member, "$ref").deleteCore();
    };
    return Member;
}(GraphQueryableInstance));
var Owners = /** @class */ (function (_super) {
    __extends(Owners, _super);
    function Owners() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Owners = __decorate([
        defaultPath("owners")
    ], Owners);
    return Owners;
}(Members));

// import { Attachments } from "./attachments";
var Calendars = /** @class */ (function (_super) {
    __extends(Calendars, _super);
    function Calendars() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Calendars = __decorate([
        defaultPath("calendars")
    ], Calendars);
    return Calendars;
}(GraphQueryableCollection));
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Calendar.prototype, "events", {
        get: function () {
            return new Events(this);
        },
        enumerable: true,
        configurable: true
    });
    return Calendar;
}(GraphQueryableInstance));
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Events.prototype.getById = function (id) {
        return new Event(this, id);
    };
    /**
     * Adds a new event to the collection
     *
     * @param properties The set of properties used to create the event
     */
    Events.prototype.add = function (properties) {
        var _this = this;
        return this.postCore({
            body: jsS(properties),
        }).then(function (r) {
            return {
                data: r,
                event: _this.getById(r.id),
            };
        });
    };
    Events = __decorate([
        defaultPath("events")
    ], Events);
    return Events;
}(GraphQueryableCollection));
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // TODO:: when supported
    // /**
    //  * Gets the collection of attachments for this event
    //  */
    // public get attachments(): Attachments {
    //     return new Attachments(this);
    // }
    /**
     * Update the properties of an event object
     *
     * @param properties Set of properties of this event to update
     */
    Event.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    /**
     * Deletes this event
     */
    Event.prototype.delete = function () {
        return this.deleteCore();
    };
    return Event;
}(GraphQueryableInstance));

var Attachments = /** @class */ (function (_super) {
    __extends(Attachments, _super);
    function Attachments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    Attachments.prototype.getById = function (id) {
        return new Attachment(this, id);
    };
    /**
     * Add attachment to this collection
     *
     * @param name Name given to the attachment file
     * @param bytes File content
     */
    Attachments.prototype.addFile = function (name, bytes) {
        return this.postCore({
            body: jsS({
                "@odata.type": "#microsoft.graph.fileAttachment",
                contentBytes: bytes,
                name: name,
            }),
        });
    };
    Attachments = __decorate([
        defaultPath("attachments")
    ], Attachments);
    return Attachments;
}(GraphQueryableCollection));
var Attachment = /** @class */ (function (_super) {
    __extends(Attachment, _super);
    function Attachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Attachment;
}(GraphQueryableInstance));

var Conversations = /** @class */ (function (_super) {
    __extends(Conversations, _super);
    function Conversations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new conversation by including a thread and a post.
     *
     * @param properties Properties used to create the new conversation
     */
    Conversations.prototype.add = function (properties) {
        return this.postCore({
            body: jsS(properties),
        });
    };
    /**
     * Gets a conversation from this collection by id
     *
     * @param id Group member's id
     */
    Conversations.prototype.getById = function (id) {
        return new Conversation(this, id);
    };
    Conversations = __decorate([
        defaultPath("conversations")
    ], Conversations);
    return Conversations;
}(GraphQueryableCollection));
var Threads = /** @class */ (function (_super) {
    __extends(Threads, _super);
    function Threads() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a thread from this collection by id
     *
     * @param id Group member's id
     */
    Threads.prototype.getById = function (id) {
        return new Thread(this, id);
    };
    /**
     * Adds a new thread to this collection
     *
     * @param properties properties used to create the new thread
     * @returns Id of the new thread
     */
    Threads.prototype.add = function (properties) {
        return this.postCore({
            body: jsS(properties),
        });
    };
    Threads = __decorate([
        defaultPath("threads")
    ], Threads);
    return Threads;
}(GraphQueryableCollection));
var Posts = /** @class */ (function (_super) {
    __extends(Posts, _super);
    function Posts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a thread from this collection by id
     *
     * @param id Group member's id
     */
    Posts.prototype.getById = function (id) {
        return new Post(this, id);
    };
    /**
     * Adds a new thread to this collection
     *
     * @param properties properties used to create the new thread
     * @returns Id of the new thread
     */
    Posts.prototype.add = function (properties) {
        return this.postCore({
            body: jsS(properties),
        });
    };
    Posts = __decorate([
        defaultPath("posts")
    ], Posts);
    return Posts;
}(GraphQueryableCollection));
var Conversation = /** @class */ (function (_super) {
    __extends(Conversation, _super);
    function Conversation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Conversation.prototype, "threads", {
        /**
         * Get all the threads in a group conversation.
         */
        get: function () {
            return new Threads(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this conversation
     */
    Conversation.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    /**
     * Deletes this member from the group
     */
    Conversation.prototype.delete = function () {
        return this.deleteCore();
    };
    return Conversation;
}(GraphQueryableInstance));
var Thread = /** @class */ (function (_super) {
    __extends(Thread, _super);
    function Thread() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Thread.prototype, "posts", {
        /**
         * Get all the threads in a group conversation.
         */
        get: function () {
            return new Posts(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    Thread.prototype.reply = function (post) {
        return this.clone(Thread, "reply").postCore({
            body: jsS({
                post: post,
            }),
        });
    };
    /**
     * Deletes this member from the group
     */
    Thread.prototype.delete = function () {
        return this.deleteCore();
    };
    return Thread;
}(GraphQueryableInstance));
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Post.prototype, "attachments", {
        get: function () {
            return new Attachments(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this post
     */
    Post.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Forward a post to a recipient
     */
    Post.prototype.forward = function (info) {
        return this.clone(Post, "forward").postCore({
            body: jsS(info),
        });
    };
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    Post.prototype.reply = function (post) {
        return this.clone(Post, "reply").postCore({
            body: jsS({
                post: post,
            }),
        });
    };
    return Post;
}(GraphQueryableInstance));
var Senders = /** @class */ (function (_super) {
    __extends(Senders, _super);
    function Senders(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Add a new user or group to this senders collection
     * @param id The full @odata.id value to add (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    Senders.prototype.add = function (id) {
        return this.clone(Senders, "$ref").postCore({
            body: jsS({
                "@odata.id": id,
            }),
        });
    };
    /**
     * Removes the entity from the collection
     *
     * @param id The full @odata.id value to remove (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    Senders.prototype.remove = function (id) {
        var remover = this.clone(Senders, "$ref");
        remover.query.set("$id", id);
        return remover.deleteCore();
    };
    return Senders;
}(GraphQueryableCollection));

var Planner = /** @class */ (function (_super) {
    __extends(Planner, _super);
    function Planner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Planner.prototype, "plans", {
        // Should Only be able to get by id, or else error occur
        get: function () {
            return new Plans(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Planner.prototype, "tasks", {
        // Should Only be able to get by id, or else error occur
        get: function () {
            return new Tasks(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Planner.prototype, "buckets", {
        // Should Only be able to get by id, or else error occur
        get: function () {
            return new Buckets(this);
        },
        enumerable: true,
        configurable: true
    });
    Planner = __decorate([
        defaultPath("planner")
    ], Planner);
    return Planner;
}(GraphQueryableInstance));
var Plans = /** @class */ (function (_super) {
    __extends(Plans, _super);
    function Plans() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plans.prototype.getById = function (id) {
        return new Plan(this, id);
    };
    /**
     * Create a new Planner Plan.
     *
     * @param owner Id of Group object.
     * @param title The Title of the Plan.
     */
    Plans.prototype.add = function (owner, title) {
        var _this = this;
        var postBody = {
            owner: owner,
            title: title,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                plan: _this.getById(r.id),
            };
        });
    };
    Plans = __decorate([
        defaultPath("plans")
    ], Plans);
    return Plans;
}(GraphQueryableCollection));
/**
 * Should not be able to get by Id
 */
var Plan = /** @class */ (function (_super) {
    __extends(Plan, _super);
    function Plan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Plan.prototype, "tasks", {
        get: function () {
            return new Tasks(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plan.prototype, "buckets", {
        get: function () {
            return new Buckets(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plan.prototype, "details", {
        get: function () {
            return new Details(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this Plan
     */
    Plan.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Plan
     *
     * @param properties Set of properties of this Plan to update
     */
    Plan.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    return Plan;
}(GraphQueryableInstance));
var Tasks = /** @class */ (function (_super) {
    __extends(Tasks, _super);
    function Tasks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tasks.prototype.getById = function (id) {
        return new Task(this, id);
    };
    /**
     * Create a new Planner Task.
     *
     * @param planId Id of Plan.
     * @param title The Title of the Task.
     * @param assignments Assign the task
     * @param bucketId Id of Bucket
     */
    Tasks.prototype.add = function (planId, title, assignments, bucketId) {
        var _this = this;
        var postBody = extend({
            planId: planId,
            title: title,
        }, assignments);
        if (bucketId) {
            postBody = extend(postBody, {
                bucketId: bucketId,
            });
        }
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                task: _this.getById(r.id),
            };
        });
    };
    Tasks = __decorate([
        defaultPath("tasks")
    ], Tasks);
    return Tasks;
}(GraphQueryableCollection));
var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this Task
     */
    Task.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Task
     *
     * @param properties Set of properties of this Task to update
     */
    Task.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    Object.defineProperty(Task.prototype, "details", {
        get: function () {
            return new Details(this);
        },
        enumerable: true,
        configurable: true
    });
    return Task;
}(GraphQueryableInstance));
var Buckets = /** @class */ (function (_super) {
    __extends(Buckets, _super);
    function Buckets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new Bucket.
     *
     * @param name Name of Bucket object.
     * @param planId The Id of the Plan.
     * @param oderHint Hint used to order items of this type in a list view.
     */
    Buckets.prototype.add = function (name, planId, orderHint) {
        var _this = this;
        var postBody = {
            name: name,
            orderHint: orderHint ? orderHint : "",
            planId: planId,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                bucket: _this.getById(r.id),
                data: r,
            };
        });
    };
    Buckets.prototype.getById = function (id) {
        return new Bucket(this, id);
    };
    Buckets = __decorate([
        defaultPath("buckets")
    ], Buckets);
    return Buckets;
}(GraphQueryableCollection));
var Bucket = /** @class */ (function (_super) {
    __extends(Bucket, _super);
    function Bucket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this Bucket
     */
    Bucket.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Bucket
     *
     * @param properties Set of properties of this Bucket to update
     */
    Bucket.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    Object.defineProperty(Bucket.prototype, "tasks", {
        get: function () {
            return new Tasks(this);
        },
        enumerable: true,
        configurable: true
    });
    return Bucket;
}(GraphQueryableInstance));
var Details = /** @class */ (function (_super) {
    __extends(Details, _super);
    function Details() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Details = __decorate([
        defaultPath("details")
    ], Details);
    return Details;
}(GraphQueryableCollection));

var Photo = /** @class */ (function (_super) {
    __extends(Photo, _super);
    function Photo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Photo_1 = Photo;
    /**
     * Gets the image bytes as a blob (browser)
     */
    Photo.prototype.getBlob = function () {
        return this.clone(Photo_1, "$value", false).get(new BlobParser());
    };
    /**
     * Gets the image file byets as a Buffer (node.js)
     */
    Photo.prototype.getBuffer = function () {
        return this.clone(Photo_1, "$value", false).get(new BufferParser());
    };
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    Photo.prototype.setContent = function (content) {
        return this.clone(Photo_1, "$value", false).patchCore({
            body: content,
        });
    };
    var Photo_1;
    Photo = Photo_1 = __decorate([
        defaultPath("photo")
    ], Photo);
    return Photo;
}(GraphQueryableInstance));

var Teams = /** @class */ (function (_super) {
    __extends(Teams, _super);
    function Teams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new team and associated Group with the given information
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param ownerId Add an owner with a user id from the graph
     */
    Teams.prototype.create = function (name, description, ownerId, teamProperties) {
        if (description === void 0) { description = ""; }
        if (teamProperties === void 0) { teamProperties = {}; }
        var groupProps = {
            "description": description && description.length > 0 ? description : "",
            "owners@odata.bind": [
                "https://graph.microsoft.com/v1.0/users/" + ownerId,
            ],
        };
        return graph.groups.add(name, name, GroupType.Office365, groupProps).then(function (gar) {
            return gar.group.createTeam(teamProperties).then(function (data) {
                return {
                    data: data,
                    group: gar.group,
                    team: new Team(gar.group),
                };
            });
        });
    };
    Teams.prototype.getById = function (id) {
        return new Team(this, id);
    };
    Teams = __decorate([
        defaultPath("teams")
    ], Teams);
    return Teams;
}(GraphQueryableCollection));
/**
 * Represents a Microsoft Team
 */
var Team = /** @class */ (function (_super) {
    __extends(Team, _super);
    function Team() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Team_1 = Team;
    Object.defineProperty(Team.prototype, "channels", {
        get: function () {
            return new Channels(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "installedApps", {
        get: function () {
            return new Apps(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this team instance's properties
     *
     * @param properties The set of properties to update
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.update = function (properties) {
        var _this = this;
        return this.clone(Team_1, "").patchCore({
            body: jsS(properties),
        }).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
     * Archives this Team
     *
     * @param shouldSetSpoSiteReadOnlyForMembers Should members have Read-only in associated Team Site
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.archive = function (shouldSetSpoSiteReadOnlyForMembers) {
        var _this = this;
        var postBody;
        if (shouldSetSpoSiteReadOnlyForMembers != null) {
            postBody = extend(postBody, {
                shouldSetSpoSiteReadOnlyForMembers: shouldSetSpoSiteReadOnlyForMembers,
            });
        }
        return this.clone(Team_1, "archive").postCore({
            body: jsS(postBody),
        }).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
    * Unarchives this Team
    *
    */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.unarchive = function () {
        var _this = this;
        return this.clone(Team_1, "unarchive").postCore({}).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
     * Clones this Team
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param partsToClone Parts to clone ex: apps,tabs,settings,channels,members
     * @param visibility Set visibility to public or private
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.cloneTeam = function (name, description, partsToClone, visibility) {
        var _this = this;
        if (description === void 0) { description = ""; }
        var postBody = {
            description: description ? description : "",
            displayName: name,
            mailNickname: name,
            partsToClone: partsToClone,
            visibility: visibility,
        };
        return this.clone(Team_1, "clone").postCore({
            body: jsS(postBody),
        }).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
     * Executes the currently built request
     *
     * @param parser Allows you to specify a parser to handle the result
     * @param getOptions The options used for this request
     */
    Team.prototype.get = function (parser, options) {
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        if (options === void 0) { options = {}; }
        return this.clone(Team_1, "").getCore(parser, options);
    };
    var Team_1;
    Team = Team_1 = __decorate([
        defaultPath("team")
    ], Team);
    return Team;
}(GraphQueryableInstance));
var Channels = /** @class */ (function (_super) {
    __extends(Channels, _super);
    function Channels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new Channel in the Team
     * @param name The display name of the new channel
     * @param description Optional description of the channel
     *
     */
    Channels.prototype.create = function (name, description) {
        var _this = this;
        if (description === void 0) { description = ""; }
        var postBody = {
            description: description && description.length > 0 ? description : "",
            displayName: name,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                channel: _this.getById(r.id),
                data: r,
            };
        });
    };
    Channels.prototype.getById = function (id) {
        return new Channel(this, id);
    };
    Channels = __decorate([
        defaultPath("channels")
    ], Channels);
    return Channels;
}(GraphQueryableCollection));
var Channel = /** @class */ (function (_super) {
    __extends(Channel, _super);
    function Channel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Channel.prototype, "tabs", {
        get: function () {
            return new Tabs(this);
        },
        enumerable: true,
        configurable: true
    });
    return Channel;
}(GraphQueryableInstance));
var Apps = /** @class */ (function (_super) {
    __extends(Apps, _super);
    function Apps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new App in the Team
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     *
     */
    Apps.prototype.add = function (appUrl) {
        var postBody = {
            "teamsApp@odata.bind": appUrl,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
            };
        });
    };
    /**
     * Deletes this app
     */
    Apps.prototype.remove = function () {
        return this.deleteCore();
    };
    Apps = __decorate([
        defaultPath("installedApps")
    ], Apps);
    return Apps;
}(GraphQueryableCollection));
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Adds a tab to the cahnnel
     * @param name The name of the new Tab
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     * @param tabsConfiguration visit https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/teamstab_add for reference
     */
    Tabs.prototype.add = function (name, appUrl, properties) {
        var _this = this;
        var postBody = extend({
            name: name,
            "teamsApp@odata.bind": appUrl,
        }, properties);
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                tab: _this.getById(r.id),
            };
        });
    };
    Tabs.prototype.getById = function (id) {
        return new Tab(this, id);
    };
    Tabs = __decorate([
        defaultPath("tabs")
    ], Tabs);
    return Tabs;
}(GraphQueryableCollection));
/**
 * Represents a Microsoft Team
 */
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab_1 = Tab;
    /**
     * Updates this tab
     *
     * @param properties The set of properties to update
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Tab.prototype.update = function (properties) {
        var _this = this;
        return this.clone(Tab_1, "").patchCore({
            body: jsS(properties),
        }).then(function (data) {
            return {
                data: data,
                tab: _this,
            };
        });
    };
    /**
     * Deletes this tab
     */
    Tab.prototype.remove = function () {
        return this.deleteCore();
    };
    var Tab_1;
    Tab = Tab_1 = __decorate([
        defaultPath("tab")
    ], Tab);
    return Tab;
}(GraphQueryableInstance));

var GroupType;
(function (GroupType) {
    /**
     * Office 365 (aka unified group)
     */
    GroupType[GroupType["Office365"] = 0] = "Office365";
    /**
     * Dynamic membership
     */
    GroupType[GroupType["Dynamic"] = 1] = "Dynamic";
    /**
     * Security
     */
    GroupType[GroupType["Security"] = 2] = "Security";
})(GroupType || (GroupType = {}));
/**
 * Describes a collection of Field objects
 *
 */
var Groups = /** @class */ (function (_super) {
    __extends(Groups, _super);
    function Groups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a group from the collection using the specified id
     *
     * @param id Id of the group to get from this collection
     */
    Groups.prototype.getById = function (id) {
        return new Group(this, id);
    };
    /**
     * Create a new group as specified in the request body.
     *
     * @param name Name to display in the address book for the group
     * @param mailNickname Mail alias for the group
     * @param groupType Type of group being created
     * @param additionalProperties A plain object collection of additional properties you want to set on the new group
     */
    Groups.prototype.add = function (name, mailNickname, groupType, additionalProperties) {
        var _this = this;
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = extend({
            displayName: name,
            mailEnabled: groupType === GroupType.Office365,
            mailNickname: mailNickname,
            securityEnabled: groupType !== GroupType.Office365,
        }, additionalProperties);
        // include a group type if required
        if (groupType !== GroupType.Security) {
            postBody = extend(postBody, {
                groupTypes: groupType === GroupType.Office365 ? ["Unified"] : ["DynamicMembership"],
            });
        }
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                group: _this.getById(r.id),
            };
        });
    };
    Groups = __decorate([
        defaultPath("groups")
    ], Groups);
    return Groups;
}(GraphQueryableCollection));
/**
 * Represents a group entity
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Group.prototype, "calendar", {
        /**
         * The calendar associated with this group
         */
        get: function () {
            return new Calendar(this, "calendar");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "events", {
        /**
         * Retrieve a list of event objects
         */
        get: function () {
            return new Events(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "owners", {
        /**
         * Gets the collection of owners for this group
         */
        get: function () {
            return new Owners(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "plans", {
        /**
         * The collection of plans for this group
         */
        get: function () {
            return new Plans(this, "planner/plans");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "members", {
        /**
         * Gets the collection of members for this group
         */
        get: function () {
            return new Members(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "conversations", {
        /**
         * Gets the conversations collection for this group
         */
        get: function () {
            return new Conversations(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "acceptedSenders", {
        /**
         * Gets the collection of accepted senders for this group
         */
        get: function () {
            return new Senders(this, "acceptedsenders");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "rejectedSenders", {
        /**
         * Gets the collection of rejected senders for this group
         */
        get: function () {
            return new Senders(this, "rejectedsenders");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "photo", {
        /**
         * The photo associated with the group
         */
        get: function () {
            return new Photo(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "team", {
        /**
         * Gets the team associated with this group, if it exists
         */
        get: function () {
            return new Team(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add the group to the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    Group.prototype.addFavorite = function () {
        return this.clone(Group, "addFavorite").postCore();
    };
    /**
     * Creates a Microsoft Team associated with this group
     *
     * @param properties Initial properties for the new Team
     */
    Group.prototype.createTeam = function (properties) {
        return this.clone(Group, "team").putCore({
            body: jsS(properties),
        });
    };
    /**
     * Returns all the groups and directory roles that the specified group is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    Group.prototype.getMemberObjects = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(Group, "getMemberObjects").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Return all the groups that the specified group is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    Group.prototype.getMemberGroups = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(Group, "getMemberGroups").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    Group.prototype.checkMemberGroups = function (groupIds) {
        return this.clone(Group, "checkMemberGroups").postCore({
            body: jsS({
                groupIds: groupIds,
            }),
        });
    };
    /**
     * Deletes this group
     */
    Group.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a group object
     *
     * @param properties Set of properties of this group to update
     */
    Group.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    /**
     * Remove the group from the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    Group.prototype.removeFavorite = function () {
        return this.clone(Group, "removeFavorite").postCore();
    };
    /**
     * Reset the unseenCount of all the posts that the current user has not seen since their last visit
     */
    Group.prototype.resetUnseenCount = function () {
        return this.clone(Group, "resetUnseenCount").postCore();
    };
    /**
     * Calling this method will enable the current user to receive email notifications for this group,
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    Group.prototype.subscribeByMail = function () {
        return this.clone(Group, "subscribeByMail").postCore();
    };
    /**
     * Calling this method will prevent the current user from receiving email notifications for this group
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    Group.prototype.unsubscribeByMail = function () {
        return this.clone(Group, "unsubscribeByMail").postCore();
    };
    /**
     * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range, from the default calendar of a group
     *
     * @param start Start date and time of the time range
     * @param end End date and time of the time range
     */
    Group.prototype.getCalendarView = function (start, end) {
        var view = this.clone(Group, "calendarView");
        view.query.set("startDateTime", start.toISOString());
        view.query.set("endDateTime", end.toISOString());
        return view.get();
    };
    return Group;
}(GraphQueryableInstance));

var Contacts = /** @class */ (function (_super) {
    __extends(Contacts, _super);
    function Contacts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Contacts.prototype.getById = function (id) {
        return new Contact(this, id);
    };
    /**
    * Create a new Contact for the user.
    *
    * @param givenName The contact's given name.
    * @param surName The contact's surname.
    * @param emailAddresses The contact's email addresses.
    * @param businessPhones The contact's business phone numbers.
    * @param additionalProperties A plain object collection of additional properties you want to set on the new contact
    */
    Contacts.prototype.add = function (givenName, surName, emailAddresses, businessPhones, additionalProperties) {
        var _this = this;
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = extend({
            businessPhones: businessPhones,
            emailAddresses: emailAddresses,
            givenName: givenName,
            surName: surName,
        }, additionalProperties);
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                contact: _this.getById(r.id),
                data: r,
            };
        });
    };
    Contacts = __decorate([
        defaultPath("contacts")
    ], Contacts);
    return Contacts;
}(GraphQueryableCollection));
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this contact
     */
    Contact.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a contact object
     *
     * @param properties Set of properties of this contact to update
     */
    Contact.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    return Contact;
}(GraphQueryableInstance));
var ContactFolders = /** @class */ (function (_super) {
    __extends(ContactFolders, _super);
    function ContactFolders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactFolders.prototype.getById = function (id) {
        return new ContactFolder(this, id);
    };
    /**
     * Create a new Contact Folder for the user.
     *
     * @param displayName The folder's display name.
     * @param parentFolderId The ID of the folder's parent folder.
     */
    ContactFolders.prototype.add = function (displayName, parentFolderId) {
        var _this = this;
        var postBody = {
            displayName: displayName,
            parentFolderId: parentFolderId,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                contactFolder: _this.getById(r.id),
                data: r,
            };
        });
    };
    ContactFolders = __decorate([
        defaultPath("contactFolders")
    ], ContactFolders);
    return ContactFolders;
}(GraphQueryableCollection));
var ContactFolder = /** @class */ (function (_super) {
    __extends(ContactFolder, _super);
    function ContactFolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ContactFolder.prototype, "contacts", {
        /**
         * Gets the contacts in this contact folder
         */
        get: function () {
            return new Contacts(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFolder.prototype, "childFolders", {
        /**
        * Gets the contacts in this contact folder
        */
        get: function () {
            return new ContactFolders(this, "childFolders");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this contact folder
     */
    ContactFolder.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a contact folder
     *
     * @param properties Set of properties of this contact folder to update
     */
    ContactFolder.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    return ContactFolder;
}(GraphQueryableInstance));

/**
 * Represents a onenote entity
 */
var OneNote = /** @class */ (function (_super) {
    __extends(OneNote, _super);
    function OneNote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OneNote.prototype, "notebooks", {
        get: function () {
            return new Notebooks(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneNote.prototype, "sections", {
        get: function () {
            return new Sections(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneNote.prototype, "pages", {
        get: function () {
            return new Pages(this);
        },
        enumerable: true,
        configurable: true
    });
    OneNote = __decorate([
        defaultPath("onenote")
    ], OneNote);
    return OneNote;
}(GraphQueryableInstance));
/**
 * Describes a collection of Notebook objects
 *
 */
var Notebooks = /** @class */ (function (_super) {
    __extends(Notebooks, _super);
    function Notebooks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a notebook instance by id
     *
     * @param id Notebook id
     */
    Notebooks.prototype.getById = function (id) {
        return new Notebook(this, id);
    };
    /**
     * Create a new notebook as specified in the request body.
     *
     * @param displayName Notebook display name
     */
    Notebooks.prototype.add = function (displayName) {
        var _this = this;
        var postBody = {
            displayName: displayName,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                notebook: _this.getById(r.id),
            };
        });
    };
    Notebooks = __decorate([
        defaultPath("notebooks")
    ], Notebooks);
    return Notebooks;
}(GraphQueryableCollection));
/**
 * Describes a notebook instance
 *
 */
var Notebook = /** @class */ (function (_super) {
    __extends(Notebook, _super);
    function Notebook(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(Notebook.prototype, "sections", {
        get: function () {
            return new Sections(this);
        },
        enumerable: true,
        configurable: true
    });
    return Notebook;
}(GraphQueryableInstance));
/**
 * Describes a collection of Sections objects
 *
 */
var Sections = /** @class */ (function (_super) {
    __extends(Sections, _super);
    function Sections() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a section instance by id
     *
     * @param id Section id
     */
    Sections.prototype.getById = function (id) {
        return new Section(this, id);
    };
    /**
     * Adds a new section
     *
     * @param displayName New section display name
     */
    Sections.prototype.add = function (displayName) {
        var _this = this;
        var postBody = {
            displayName: displayName,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                section: _this.getById(r.id),
            };
        });
    };
    Sections = __decorate([
        defaultPath("sections")
    ], Sections);
    return Sections;
}(GraphQueryableCollection));
/**
 * Describes a sections instance
 *
 */
var Section = /** @class */ (function (_super) {
    __extends(Section, _super);
    function Section(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    return Section;
}(GraphQueryableInstance));
/**
 * Describes a collection of Pages objects
 *
 */
var Pages = /** @class */ (function (_super) {
    __extends(Pages, _super);
    function Pages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pages = __decorate([
        defaultPath("pages")
    ], Pages);
    return Pages;
}(GraphQueryableCollection));

/**
 * Describes a collection of Drive objects
 *
 */
var Drives = /** @class */ (function (_super) {
    __extends(Drives, _super);
    function Drives() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a Drive instance by id
     *
     * @param id Drive id
     */
    Drives.prototype.getById = function (id) {
        return new Drive(this, id);
    };
    Drives = __decorate([
        defaultPath("drives")
    ], Drives);
    return Drives;
}(GraphQueryableCollection));
/**
 * Describes a Drive instance
 *
 */
var Drive = /** @class */ (function (_super) {
    __extends(Drive, _super);
    function Drive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Drive.prototype, "root", {
        get: function () {
            return new Root(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "items", {
        get: function () {
            return new DriveItems(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "list", {
        get: function () {
            return new DriveList(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "recent", {
        get: function () {
            return new Recent(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "sharedWithMe", {
        get: function () {
            return new SharedWithMe(this);
        },
        enumerable: true,
        configurable: true
    });
    Drive = __decorate([
        defaultPath("drive")
    ], Drive);
    return Drive;
}(GraphQueryableInstance));
/**
 * Describes a Root instance
 *
 */
var Root = /** @class */ (function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Root.prototype, "children", {
        get: function () {
            return new Children(this);
        },
        enumerable: true,
        configurable: true
    });
    Root.prototype.search = function (query) {
        return new DriveSearch(this, "search(q='" + query + "')");
    };
    Root = __decorate([
        defaultPath("root")
    ], Root);
    return Root;
}(GraphQueryableInstance));
/**
 * Describes a collection of Drive Item objects
 *
 */
var DriveItems = /** @class */ (function (_super) {
    __extends(DriveItems, _super);
    function DriveItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a Drive Item instance by id
     *
     * @param id Drive Item id
     */
    DriveItems.prototype.getById = function (id) {
        return new DriveItem(this, id);
    };
    DriveItems = __decorate([
        defaultPath("items")
    ], DriveItems);
    return DriveItems;
}(GraphQueryableCollection));
/**
 * Describes a Drive Item instance
 *
 */
var DriveItem = /** @class */ (function (_super) {
    __extends(DriveItem, _super);
    function DriveItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DriveItem.prototype, "children", {
        get: function () {
            return new Children(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DriveItem.prototype, "thumbnails", {
        get: function () {
            return new Thumbnails(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this Drive Item
     */
    DriveItem.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Drive item
     *
     * @param properties Set of properties of this Drive Item to update
     */
    DriveItem.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    /**
     * Move the Drive item and optionally update the properties
     *
     * @param parentReference Should contain Id of new parent folder
     * @param properties Optional set of properties of this Drive Item to update
     */
    DriveItem.prototype.move = function (parentReference, properties) {
        var patchBody = extend({}, parentReference);
        if (properties) {
            patchBody = extend({}, properties);
        }
        return this.patchCore({
            body: jsS(patchBody),
        });
    };
    return DriveItem;
}(GraphQueryableInstance));
/**
 * Return a collection of DriveItems in the children relationship of a DriveItem
 *
 */
var Children = /** @class */ (function (_super) {
    __extends(Children, _super);
    function Children() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Create a new folder or DriveItem in a Drive with a specified parent item or path
    * Currently only Folder or File works
    * @param name The name of the Drive Item.
    * @param properties Type of Drive Item to create.
    * */
    Children.prototype.add = function (name, driveItemType) {
        var _this = this;
        var postBody = extend({
            name: name,
        }, driveItemType);
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                driveItem: new DriveItem(_this, r.id),
            };
        });
    };
    Children = __decorate([
        defaultPath("children")
    ], Children);
    return Children;
}(GraphQueryableCollection));
var DriveList = /** @class */ (function (_super) {
    __extends(DriveList, _super);
    function DriveList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DriveList = __decorate([
        defaultPath("list")
    ], DriveList);
    return DriveList;
}(GraphQueryableCollection));
var Recent = /** @class */ (function (_super) {
    __extends(Recent, _super);
    function Recent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Recent = __decorate([
        defaultPath("recent")
    ], Recent);
    return Recent;
}(GraphQueryableInstance));
var SharedWithMe = /** @class */ (function (_super) {
    __extends(SharedWithMe, _super);
    function SharedWithMe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SharedWithMe = __decorate([
        defaultPath("sharedWithMe")
    ], SharedWithMe);
    return SharedWithMe;
}(GraphQueryableInstance));
var DriveSearch = /** @class */ (function (_super) {
    __extends(DriveSearch, _super);
    function DriveSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DriveSearch = __decorate([
        defaultPath("search")
    ], DriveSearch);
    return DriveSearch;
}(GraphQueryableInstance));
var Thumbnails = /** @class */ (function (_super) {
    __extends(Thumbnails, _super);
    function Thumbnails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Thumbnails = __decorate([
        defaultPath("thumbnails")
    ], Thumbnails);
    return Thumbnails;
}(GraphQueryableInstance));

var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    Messages.prototype.getById = function (id) {
        return new Message(this, id);
    };
    /**
     * Add a message to this collection
     *
     * @param message The message details
     */
    Messages.prototype.add = function (message) {
        return this.postCore({
            body: jsS(message),
        });
    };
    Messages = __decorate([
        defaultPath("messages")
    ], Messages);
    return Messages;
}(GraphQueryableCollection));
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Message;
}(GraphQueryableInstance));
var MailFolders = /** @class */ (function (_super) {
    __extends(MailFolders, _super);
    function MailFolders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    MailFolders.prototype.getById = function (id) {
        return new MailFolder(this, id);
    };
    /**
     * Add a mail folder to this collection
     *
     * @param message The message details
     */
    MailFolders.prototype.add = function (mailFolder) {
        return this.postCore({
            body: jsS(mailFolder),
        });
    };
    MailFolders = __decorate([
        defaultPath("mailFolders")
    ], MailFolders);
    return MailFolders;
}(GraphQueryableCollection));
var MailFolder = /** @class */ (function (_super) {
    __extends(MailFolder, _super);
    function MailFolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MailFolder;
}(GraphQueryableInstance));
var MailboxSettings = /** @class */ (function (_super) {
    __extends(MailboxSettings, _super);
    function MailboxSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailboxSettings.prototype.update = function (settings) {
        return this.patchCore({
            body: jsS(settings),
        });
    };
    MailboxSettings = __decorate([
        defaultPath("mailboxSettings")
    ], MailboxSettings);
    return MailboxSettings;
}(GraphQueryableInstance));

var DirectoryObjectType;
(function (DirectoryObjectType) {
    /**
     * Directory Objects
     */
    DirectoryObjectType[DirectoryObjectType["directoryObject"] = 0] = "directoryObject";
    /**
     * User
     */
    DirectoryObjectType[DirectoryObjectType["user"] = 1] = "user";
    /**
     * Group
     */
    DirectoryObjectType[DirectoryObjectType["group"] = 2] = "group";
    /**
     * Device
     */
    DirectoryObjectType[DirectoryObjectType["device"] = 3] = "device";
})(DirectoryObjectType || (DirectoryObjectType = {}));
/**
 * Describes a collection of Directory Objects
 *
 */
var DirectoryObjects = /** @class */ (function (_super) {
    __extends(DirectoryObjects, _super);
    function DirectoryObjects() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectoryObjects_1 = DirectoryObjects;
    /**
     * Gets a directoryObject from the collection using the specified id
     *
     * @param id Id of the Directory Object to get from this collection
     */
    DirectoryObjects.prototype.getById = function (id) {
        return new DirectoryObject(this, id);
    };
    /**
    * Returns the directory objects specified in a list of ids. NOTE: The directory objects returned are the full objects containing all their properties.
    * The $select query option is not available for this operation.
    *
    * @param ids A collection of ids for which to return objects. You can specify up to 1000 ids.
    * @param type A collection of resource types that specifies the set of resource collections to search. Default is directoryObject.
    */
    DirectoryObjects.prototype.getByIds = function (ids, type) {
        if (type === void 0) { type = DirectoryObjectType.directoryObject; }
        return this.clone(DirectoryObjects_1, "getByIds").postCore({
            body: jsS({
                ids: ids,
                type: type,
            }),
        });
    };
    var DirectoryObjects_1;
    DirectoryObjects = DirectoryObjects_1 = __decorate([
        defaultPath("directoryObjects")
    ], DirectoryObjects);
    return DirectoryObjects;
}(GraphQueryableCollection));
/**
 * Represents a Directory Object entity
 */
var DirectoryObject = /** @class */ (function (_super) {
    __extends(DirectoryObject, _super);
    function DirectoryObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this group
     */
    DirectoryObject.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Returns all the groups and directory roles that the specified Directory Object is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    DirectoryObject.prototype.getMemberObjects = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(DirectoryObject, "getMemberObjects").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Returns all the groups that the specified Directory Object is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    DirectoryObject.prototype.getMemberGroups = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(DirectoryObject, "getMemberGroups").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    DirectoryObject.prototype.checkMemberGroups = function (groupIds) {
        return this.clone(DirectoryObject, "checkMemberGroups").postCore({
            body: jsS({
                groupIds: groupIds,
            }),
        });
    };
    return DirectoryObject;
}(GraphQueryableInstance));

/**
 * Describes a collection of Users objects
 *
 */
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a user from the collection using the specified id
     *
     * @param id Id of the user to get from this collection
     */
    Users.prototype.getById = function (id) {
        return new User(this, id);
    };
    Users = __decorate([
        defaultPath("users")
    ], Users);
    return Users;
}(GraphQueryableCollection));
/**
 * Represents a user entity
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(User.prototype, "onenote", {
        /**
        * The onenote associated with me
        */
        get: function () {
            return new OneNote(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "contacts", {
        /**
        * The Contacts associated with the user
        */
        get: function () {
            return new Contacts(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "joinedTeams", {
        /**
        * The Teams associated with the user
        */
        get: function () {
            return new Teams(this, "joinedTeams");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "memberOf", {
        /**
        * The groups and directory roles associated with the user
        */
        get: function () {
            return new DirectoryObjects(this, "memberOf");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns all the groups and directory roles that the specified useris a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    User.prototype.getMemberObjects = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(User, "getMemberObjects").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Return all the groups that the specified user is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    User.prototype.getMemberGroups = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(User, "getMemberGroups").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    User.prototype.checkMemberGroups = function (groupIds) {
        return this.clone(User, "checkMemberGroups").postCore({
            body: jsS({
                groupIds: groupIds,
            }),
        });
    };
    Object.defineProperty(User.prototype, "contactFolders", {
        /**
        * The Contact Folders associated with the user
        */
        get: function () {
            return new ContactFolders(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "drive", {
        /**
        * The default Drive associated with the user
        */
        get: function () {
            return new Drive(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "drives", {
        /**
        * The Drives the user has available
        */
        get: function () {
            return new Drives(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "tasks", {
        /**
        * The Tasks the user has available
        */
        get: function () {
            return new Tasks(this, "planner/tasks");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "messages", {
        /**
         * Get the messages in the signed-in user's mailbox
         */
        get: function () {
            return new Messages(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "mailboxSettings", {
        /**
         * Get the MailboxSettings in the signed-in user's mailbox
         */
        get: function () {
            return new MailboxSettings(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "mailFolders", {
        /**
         * Get the MailboxSettings in the signed-in user's mailbox
         */
        get: function () {
            return new MailFolders(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this user
     *
     * @param properties Properties used to update this user
     */
    User.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    /**
     * Deletes this user
     */
    User.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Send the message specified in the request body. The message is saved in the Sent Items folder by default.
     */
    User.prototype.sendMail = function (message) {
        return this.clone(User, "sendMail").postCore({
            body: jsS(message),
        });
    };
    return User;
}(GraphQueryableInstance));

var GraphBatch = /** @class */ (function (_super) {
    __extends(GraphBatch, _super);
    function GraphBatch(batchUrl, maxRequests) {
        if (batchUrl === void 0) { batchUrl = "https://graph.microsoft.com/v1.0/$batch"; }
        if (maxRequests === void 0) { maxRequests = 20; }
        var _this = _super.call(this) || this;
        _this.batchUrl = batchUrl;
        _this.maxRequests = maxRequests;
        return _this;
    }
    /**
     * Urls come to the batch absolute, but the processor expects relative
     * @param url Url to ensure is relative
     */
    GraphBatch.makeUrlRelative = function (url) {
        if (!isUrlAbsolute(url)) {
            // already not absolute, just give it back
            return url;
        }
        var index = url.indexOf(".com/v1.0/");
        if (index < 0) {
            index = url.indexOf(".com/beta/");
            if (index > -1) {
                // beta url
                return url.substr(index + 10);
            }
        }
        else {
            // v1.0 url
            return url.substr(index + 9);
        }
        // no idea
        return url;
    };
    GraphBatch.formatRequests = function (requests) {
        var _this = this;
        return requests.map(function (reqInfo, index) {
            var requestFragment = {
                id: "" + ++index,
                method: reqInfo.method,
                url: _this.makeUrlRelative(reqInfo.url),
            };
            var headers = {};
            // merge global config headers
            if (GraphRuntimeConfig.headers !== undefined && GraphRuntimeConfig.headers !== null) {
                headers = extend(headers, GraphRuntimeConfig.headers);
            }
            if (reqInfo.options !== undefined) {
                // merge per request headers
                if (reqInfo.options.headers !== undefined && reqInfo.options.headers !== null) {
                    headers = extend(headers, reqInfo.options.headers);
                }
                // add a request body
                if (reqInfo.options.body !== undefined && reqInfo.options.body !== null) {
                    requestFragment = extend(requestFragment, {
                        body: reqInfo.options.body,
                    });
                }
            }
            requestFragment = extend(requestFragment, {
                headers: headers,
            });
            return requestFragment;
        });
    };
    GraphBatch.parseResponse = function (requests, graphResponse) {
        return new Promise(function (resolve) {
            var parsedResponses = new Array(requests.length).fill(null);
            for (var i = 0; i < graphResponse.responses.length; ++i) {
                var response = graphResponse.responses[i];
                // we create the request id by adding 1 to the index, so we place the response by subtracting one to match
                // the array of requests and make it easier to map them by index
                var responseId = parseInt(response.id, 10) - 1;
                if (response.status === 204) {
                    parsedResponses[responseId] = new Response();
                }
                else {
                    parsedResponses[responseId] = new Response(JSON.stringify(response.body), response);
                }
            }
            resolve({
                nextLink: graphResponse.nextLink,
                responses: parsedResponses,
            });
        });
    };
    GraphBatch.prototype.executeImpl = function () {
        var _this = this;
        Logger.write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Executing batch with " + this.requests.length + " requests.", 1 /* Info */);
        if (this.requests.length < 1) {
            Logger.write("Resolving empty batch.", 1 /* Info */);
            return Promise.resolve();
        }
        var client = new GraphHttpClient();
        // create a working copy of our requests
        var requests = this.requests.slice();
        // this is the root of our promise chain
        var promise = Promise.resolve();
        var _loop_1 = function () {
            var requestsChunk = requests.splice(0, this_1.maxRequests);
            var batchRequest = {
                requests: GraphBatch.formatRequests(requestsChunk),
            };
            var batchOptions = {
                body: jsS(batchRequest),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
            };
            Logger.write("[" + this_1.batchId + "] (" + (new Date()).getTime() + ") Sending batch request.", 1 /* Info */);
            client.fetch(this_1.batchUrl, batchOptions)
                .then(function (r) { return r.json(); })
                .then(function (j) { return GraphBatch.parseResponse(requestsChunk, j); })
                .then(function (parsedResponse) {
                Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched requests.", 1 /* Info */);
                parsedResponse.responses.reduce(function (chain, response, index) {
                    var request = requestsChunk[index];
                    Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched request " + request.method + " " + request.url + ".", 0 /* Verbose */);
                    return chain.then(function (_) { return request.parser.parse(response).then(request.resolve).catch(request.reject); });
                }, promise);
            });
        };
        var this_1 = this;
        while (requests.length > 0) {
            _loop_1();
        }
        return promise;
    };
    return GraphBatch;
}(ODataBatch));

var Invitations = /** @class */ (function (_super) {
    __extends(Invitations, _super);
    function Invitations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new Invitation via invitation manager.
     *
     * @param invitedUserEmailAddress The email address of the user being invited.
     * @param inviteRedirectUrl The URL user should be redirected to once the invitation is redeemed.
     * @param additionalProperties A plain object collection of additional properties you want to set in the invitation
     */
    Invitations.prototype.create = function (invitedUserEmailAddress, inviteRedirectUrl, additionalProperties) {
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = extend({
            inviteRedirectUrl: inviteRedirectUrl,
            invitedUserEmailAddress: invitedUserEmailAddress,
        }, additionalProperties);
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
            };
        });
    };
    Invitations = __decorate([
        defaultPath("invitations")
    ], Invitations);
    return Invitations;
}(GraphQueryableCollection));

var Subscriptions = /** @class */ (function (_super) {
    __extends(Subscriptions, _super);
    function Subscriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Subscriptions.prototype.getById = function (id) {
        return new Subscription(this, id);
    };
    /**
     * Create a new Subscription.
     *
     * @param changeType Indicates the type of change in the subscribed resource that will raise a notification. The supported values are: created, updated, deleted.
     * @param notificationUrl The URL of the endpoint that will receive the notifications. This URL must make use of the HTTPS protocol.
     * @param resource Specifies the resource that will be monitored for changes. Do not include the base URL (https://graph.microsoft.com/v1.0/).
     * @param expirationDateTime Specifies the date and time when the webhook subscription expires. The time is in UTC.
     * @param additionalProperties A plain object collection of additional properties you want to set on the new subscription
     *
     */
    Subscriptions.prototype.add = function (changeType, notificationUrl, resource, expirationDateTime, additionalProperties) {
        var _this = this;
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = extend({
            changeType: changeType,
            expirationDateTime: expirationDateTime,
            notificationUrl: notificationUrl,
            resource: resource,
        }, additionalProperties);
        return this.postCore({
            body: jsS(postBody),
        }).then(function (r) {
            return {
                data: r,
                subscription: _this.getById(r.id),
            };
        });
    };
    Subscriptions = __decorate([
        defaultPath("subscriptions")
    ], Subscriptions);
    return Subscriptions;
}(GraphQueryableCollection));
var Subscription = /** @class */ (function (_super) {
    __extends(Subscription, _super);
    function Subscription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this Subscription
     */
    Subscription.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Subscription
     *
     * @param properties Set of properties of this Subscription to update
     */
    Subscription.prototype.update = function (properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    };
    return Subscription;
}(GraphQueryableInstance));

var GraphRest = /** @class */ (function (_super) {
    __extends(GraphRest, _super);
    function GraphRest(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(GraphRest.prototype, "directoryObjects", {
        get: function () {
            return new DirectoryObjects(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "groups", {
        get: function () {
            return new Groups(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "teams", {
        get: function () {
            return new Teams(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "me", {
        get: function () {
            return new User(this, "me");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "planner", {
        get: function () {
            return new Planner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "users", {
        get: function () {
            return new Users(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "invitations", {
        get: function () {
            return new Invitations(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "subscriptions", {
        get: function () {
            return new Subscriptions(this);
        },
        enumerable: true,
        configurable: true
    });
    GraphRest.prototype.createBatch = function () {
        return new GraphBatch();
    };
    GraphRest.prototype.setup = function (config) {
        setup(config);
    };
    return GraphRest;
}(GraphQueryable));
var graph = new GraphRest("v1.0");

export { graph, GraphRest, GroupType, Group, Groups, GraphBatch, GraphQueryable, GraphQueryableCollection, GraphQueryableInstance, GraphQueryableSearchableCollection, Teams, Team, Channels, Channel, Apps, Tabs, Tab, GraphEndpoints, OneNote, Notebooks, Notebook, Sections, Section, Pages, Contacts, Contact, ContactFolders, ContactFolder, Drives, Drive, Root, DriveItems, DriveItem, Children, DriveList, Recent, SharedWithMe, DriveSearch, Thumbnails, Planner, Plans, Plan, Tasks, Task, Buckets, Bucket, Details, DirectoryObjectType, DirectoryObjects, DirectoryObject, Invitations, Subscriptions, Subscription };
//# sourceMappingURL=graph.es5.js.map
