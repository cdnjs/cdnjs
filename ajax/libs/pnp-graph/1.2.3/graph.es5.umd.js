/**
@license
 * @pnp/graph v1.2.3 - pnp - provides functionality to query the Microsoft Graph
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pnp/common'), require('tslib'), require('@pnp/odata'), require('@pnp/logging')) :
    typeof define === 'function' && define.amd ? define(['exports', '@pnp/common', 'tslib', '@pnp/odata', '@pnp/logging'], factory) :
    (factory((global.pnp = global.pnp || {}, global.pnp.graph = {}),global.pnp.common,global.tslib_1,global.pnp.odata,global.pnp.logging));
}(this, (function (exports,common,tslib_1,odata,logging) { 'use strict';

    function setup(config) {
        common.RuntimeConfig.extend(config);
    }
    var GraphRuntimeConfigImpl = /** @class */ (function () {
        function GraphRuntimeConfigImpl() {
        }
        Object.defineProperty(GraphRuntimeConfigImpl.prototype, "headers", {
            get: function () {
                var graphPart = common.RuntimeConfig.get("graph");
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
                var graphPart = common.RuntimeConfig.get("graph");
                // use a configured factory firt
                if (graphPart !== undefined && graphPart !== null && graphPart.fetchClientFactory !== undefined) {
                    return graphPart.fetchClientFactory;
                }
                // then try and use spfx context if available
                if (common.RuntimeConfig.spfxContext !== undefined) {
                    return function () { return common.AdalClient.fromSPFxContext(common.RuntimeConfig.spfxContext); };
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
            common.mergeHeaders(headers, GraphRuntimeConfig.headers);
            // second we add the local options so we can overwrite the globals
            common.mergeHeaders(headers, options.headers);
            if (!headers.has("Content-Type")) {
                headers.append("Content-Type", "application/json");
            }
            var opts = common.extend(options, { headers: headers });
            return this.fetchRaw(url, opts);
        };
        GraphHttpClient.prototype.fetchRaw = function (url, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            // here we need to normalize the headers
            var rawHeaders = new Headers();
            common.mergeHeaders(rawHeaders, options.headers);
            options = common.extend(options, { headers: rawHeaders });
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
                    setTimeout(common.getCtxCallback(_this, retry, ctx), delay);
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
            var opts = common.extend(options, { method: "GET" });
            return this.fetch(url, opts);
        };
        GraphHttpClient.prototype.post = function (url, options) {
            if (options === void 0) { options = {}; }
            var opts = common.extend(options, { method: "POST" });
            return this.fetch(url, opts);
        };
        GraphHttpClient.prototype.patch = function (url, options) {
            if (options === void 0) { options = {}; }
            var opts = common.extend(options, { method: "PATCH" });
            return this.fetch(url, opts);
        };
        GraphHttpClient.prototype.delete = function (url, options) {
            if (options === void 0) { options = {}; }
            var opts = common.extend(options, { method: "DELETE" });
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
        tslib_1.__extends(GraphQueryable, _super);
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
                _this._url = common.combine(urlStr, path);
            }
            else {
                _this.extend(baseUrl, path);
            }
            return _this;
        }
        /**
         * Creates a new instance of the supplied factory and extends this into that new instance
         *
         * @param factory constructor for the new queryable
         */
        GraphQueryable.prototype.as = function (factory) {
            var o = new factory(this._url, null);
            return common.extend(o, this, true);
        };
        /**
         * Gets the full url with query information
         *
         */
        GraphQueryable.prototype.toUrlAndQuery = function () {
            var url = this.toUrl();
            if (!common.isUrlAbsolute(url)) {
                url = common.combine("https://graph.microsoft.com", url);
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
            var clone = new factory(this, additionalPath);
            clone.configure(this._options);
            // TODO:: include batching info in clone
            if (includeBatch) {
                clone = clone.inBatch(this._batch);
            }
            return clone;
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
            // TODO:: add batch support
            return Promise.resolve({
                batch: this.batch,
                batchDependency: function () { return void (0); },
                cachingOptions: this._cachingOptions,
                clientFactory: function () { return new GraphHttpClient(); },
                isBatched: this.hasBatch,
                isCached: /^get$/i.test(verb) && this._useCaching,
                options: options,
                parser: parser,
                pipeline: pipeline,
                requestAbsoluteUrl: this.toUrlAndQuery(),
                requestId: common.getGUID(),
                verb: verb,
            });
        };
        return GraphQueryable;
    }(odata.ODataQueryable));
    /**
     * Represents a REST collection which can be filtered, paged, and selected
     *
     */
    var GraphQueryableCollection = /** @class */ (function (_super) {
        tslib_1.__extends(GraphQueryableCollection, _super);
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
         * Choose which fields to return
         *
         * @param selects One or more fields to return
         */
        GraphQueryableCollection.prototype.select = function () {
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
        GraphQueryableCollection.prototype.expand = function () {
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
            this.query.set("$top", num.toString());
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
        tslib_1.__extends(GraphQueryableSearchableCollection, _super);
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
        tslib_1.__extends(GraphQueryableInstance, _super);
        function GraphQueryableInstance() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Choose which fields to return
         *
         * @param selects One or more fields to return
         */
        GraphQueryableInstance.prototype.select = function () {
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
        GraphQueryableInstance.prototype.expand = function () {
            var expands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                expands[_i] = arguments[_i];
            }
            if (expands.length > 0) {
                this.query.set("$expand", expands.join(","));
            }
            return this;
        };
        return GraphQueryableInstance;
    }(GraphQueryable));

    var Members = /** @class */ (function (_super) {
        tslib_1.__extends(Members, _super);
        function Members(baseUrl, path) {
            if (path === void 0) { path = "members"; }
            return _super.call(this, baseUrl, path) || this;
        }
        /**
         * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
         * the members navigation property. You can add users or other groups.
         * Important: You can add only users to Office 365 groups.
         *
         * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: https://graph.microsoft.com/v1.0/directoryObjects/${id})
         */
        Members.prototype.add = function (id) {
            return this.clone(Members, "$ref").postCore({
                body: common.jsS({
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
        return Members;
    }(GraphQueryableCollection));
    var Member = /** @class */ (function (_super) {
        tslib_1.__extends(Member, _super);
        function Member() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Member;
    }(GraphQueryableInstance));
    var Owners = /** @class */ (function (_super) {
        tslib_1.__extends(Owners, _super);
        function Owners(baseUrl, path) {
            if (path === void 0) { path = "owners"; }
            return _super.call(this, baseUrl, path) || this;
        }
        return Owners;
    }(Members));

    // import { Attachments } from "./attachments";
    var Calendars = /** @class */ (function (_super) {
        tslib_1.__extends(Calendars, _super);
        function Calendars(baseUrl, path) {
            if (path === void 0) { path = "calendars"; }
            return _super.call(this, baseUrl, path) || this;
        }
        return Calendars;
    }(GraphQueryableCollection));
    var Calendar = /** @class */ (function (_super) {
        tslib_1.__extends(Calendar, _super);
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
        tslib_1.__extends(Events, _super);
        function Events(baseUrl, path) {
            if (path === void 0) { path = "events"; }
            return _super.call(this, baseUrl, path) || this;
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
                body: common.jsS(properties),
            }).then(function (r) {
                return {
                    data: r,
                    event: _this.getById(r.id),
                };
            });
        };
        return Events;
    }(GraphQueryableCollection));
    var Event = /** @class */ (function (_super) {
        tslib_1.__extends(Event, _super);
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
                body: common.jsS(properties),
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
        tslib_1.__extends(Attachments, _super);
        function Attachments(baseUrl, path) {
            if (path === void 0) { path = "attachments"; }
            return _super.call(this, baseUrl, path) || this;
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
                body: common.jsS({
                    "@odata.type": "#microsoft.graph.fileAttachment",
                    contentBytes: bytes,
                    name: name,
                }),
            });
        };
        return Attachments;
    }(GraphQueryableCollection));
    var Attachment = /** @class */ (function (_super) {
        tslib_1.__extends(Attachment, _super);
        function Attachment() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Attachment;
    }(GraphQueryableInstance));

    var Conversations = /** @class */ (function (_super) {
        tslib_1.__extends(Conversations, _super);
        function Conversations(baseUrl, path) {
            if (path === void 0) { path = "conversations"; }
            return _super.call(this, baseUrl, path) || this;
        }
        /**
         * Create a new conversation by including a thread and a post.
         *
         * @param properties Properties used to create the new conversation
         */
        Conversations.prototype.add = function (properties) {
            return this.postCore({
                body: common.jsS(properties),
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
        return Conversations;
    }(GraphQueryableCollection));
    var Threads = /** @class */ (function (_super) {
        tslib_1.__extends(Threads, _super);
        function Threads(baseUrl, path) {
            if (path === void 0) { path = "threads"; }
            return _super.call(this, baseUrl, path) || this;
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
                body: common.jsS(properties),
            });
        };
        return Threads;
    }(GraphQueryableCollection));
    var Posts = /** @class */ (function (_super) {
        tslib_1.__extends(Posts, _super);
        function Posts(baseUrl, path) {
            if (path === void 0) { path = "posts"; }
            return _super.call(this, baseUrl, path) || this;
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
                body: common.jsS(properties),
            });
        };
        return Posts;
    }(GraphQueryableCollection));
    var Conversation = /** @class */ (function (_super) {
        tslib_1.__extends(Conversation, _super);
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
                body: common.jsS(properties),
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
        tslib_1.__extends(Thread, _super);
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
                body: common.jsS({
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
        tslib_1.__extends(Post, _super);
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
                body: common.jsS(info),
            });
        };
        /**
         * Reply to a thread in a group conversation and add a new post to it
         *
         * @param post Contents of the post
         */
        Post.prototype.reply = function (post) {
            return this.clone(Post, "reply").postCore({
                body: common.jsS({
                    post: post,
                }),
            });
        };
        return Post;
    }(GraphQueryableInstance));
    var Senders = /** @class */ (function (_super) {
        tslib_1.__extends(Senders, _super);
        function Senders(baseUrl, path) {
            return _super.call(this, baseUrl, path) || this;
        }
        /**
         * Add a new user or group to this senders collection
         * @param id The full @odata.id value to add (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
         */
        Senders.prototype.add = function (id) {
            return this.clone(Senders, "$ref").postCore({
                body: common.jsS({
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

    var Plans = /** @class */ (function (_super) {
        tslib_1.__extends(Plans, _super);
        function Plans(baseUrl, path) {
            if (path === void 0) { path = "planner/plans"; }
            return _super.call(this, baseUrl, path) || this;
        }
        /**
         * Gets a plan from this collection by id
         *
         * @param id Plan's id
         */
        Plans.prototype.getById = function (id) {
            return new Plan(this, id);
        };
        return Plans;
    }(GraphQueryableCollection));
    var Plan = /** @class */ (function (_super) {
        tslib_1.__extends(Plan, _super);
        function Plan() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Plan;
    }(GraphQueryableInstance));

    var Photo = /** @class */ (function (_super) {
        tslib_1.__extends(Photo, _super);
        function Photo(baseUrl, path) {
            if (path === void 0) { path = "photo"; }
            return _super.call(this, baseUrl, path) || this;
        }
        /**
         * Gets the image bytes as a blob (browser)
         */
        Photo.prototype.getBlob = function () {
            return this.clone(Photo, "$value", false).get(new odata.BlobParser());
        };
        /**
         * Gets the image file byets as a Buffer (node.js)
         */
        Photo.prototype.getBuffer = function () {
            return this.clone(Photo, "$value", false).get(new odata.BufferParser());
        };
        /**
         * Sets the file bytes
         *
         * @param content Image file contents, max 4 MB
         */
        Photo.prototype.setContent = function (content) {
            return this.clone(Photo, "$value", false).patchCore({
                body: content,
            });
        };
        return Photo;
    }(GraphQueryableInstance));

    var Teams = /** @class */ (function () {
        function Teams() {
        }
        /**
         * Creates a new team and associated Group with the given information
         */
        Teams.prototype.create = function (name, description, teamProperties) {
            if (description === void 0) { description = ""; }
            if (teamProperties === void 0) { teamProperties = {}; }
            var groupProps = description && description.length > 0 ? { description: description } : {};
            return graph.groups.add(name, name, exports.GroupType.Office365, groupProps).then(function (gar) {
                return gar.group.createTeam(teamProperties).then(function (data) {
                    return {
                        data: data,
                        group: gar.group,
                        team: new Team(gar.group),
                    };
                });
            });
        };
        return Teams;
    }());
    /**
     * Represents a Microsoft Team
     */
    var Team = /** @class */ (function (_super) {
        tslib_1.__extends(Team, _super);
        function Team(baseUrl, path) {
            if (path === void 0) { path = "team"; }
            return _super.call(this, baseUrl, path) || this;
        }
        /**
         * Updates this team instance's properties
         *
         * @param properties The set of properties to update
         */
        // TODO:: update properties to be typed once type is available in graph-types
        Team.prototype.update = function (properties) {
            var _this = this;
            return this.clone(Team, "").setEndpoint(GraphEndpoints.Beta).patchCore({
                body: common.jsS(properties),
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
            if (parser === void 0) { parser = new odata.ODataDefaultParser(); }
            if (options === void 0) { options = {}; }
            return this.clone(Team, "").setEndpoint(GraphEndpoints.Beta).getCore(parser, options);
        };
        return Team;
    }(GraphQueryableInstance));

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
    })(exports.GroupType || (exports.GroupType = {}));
    /**
     * Describes a collection of Field objects
     *
     */
    var Groups = /** @class */ (function (_super) {
        tslib_1.__extends(Groups, _super);
        function Groups(baseUrl, path) {
            if (path === void 0) { path = "groups"; }
            return _super.call(this, baseUrl, path) || this;
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
            var postBody = common.extend({
                displayName: name,
                mailEnabled: groupType === exports.GroupType.Office365,
                mailNickname: mailNickname,
                securityEnabled: groupType !== exports.GroupType.Office365,
            }, additionalProperties);
            // include a group type if required
            if (groupType !== exports.GroupType.Security) {
                postBody = common.extend(postBody, {
                    groupTypes: groupType === exports.GroupType.Office365 ? ["Unified"] : ["DynamicMembership"],
                });
            }
            return this.postCore({
                body: common.jsS(postBody),
            }).then(function (r) {
                return {
                    data: r,
                    group: _this.getById(r.id),
                };
            });
        };
        return Groups;
    }(GraphQueryableCollection));
    /**
     * Represents a group entity
     */
    var Group = /** @class */ (function (_super) {
        tslib_1.__extends(Group, _super);
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
                return new Plans(this);
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
            return this.clone(Group, "team").setEndpoint(GraphEndpoints.Beta).putCore({
                body: common.jsS(properties),
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
                body: common.jsS({
                    securityEnabledOnly: securityEnabledOnly,
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
                body: common.jsS(properties),
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

    /**
     * Represents a onenote entity
     */
    var OneNote = /** @class */ (function (_super) {
        tslib_1.__extends(OneNote, _super);
        function OneNote(baseUrl, path) {
            if (path === void 0) { path = "onenote"; }
            return _super.call(this, baseUrl, path) || this;
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
        return OneNote;
    }(GraphQueryableInstance));
    /**
     * Describes a collection of Notebook objects
     *
     */
    var Notebooks = /** @class */ (function (_super) {
        tslib_1.__extends(Notebooks, _super);
        function Notebooks(baseUrl, path) {
            if (path === void 0) { path = "notebooks"; }
            return _super.call(this, baseUrl, path) || this;
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
                body: common.jsS(postBody),
            }).then(function (r) {
                return {
                    data: r,
                    notebook: _this.getById(r.id),
                };
            });
        };
        return Notebooks;
    }(GraphQueryableCollection));
    /**
     * Describes a notebook instance
     *
     */
    var Notebook = /** @class */ (function (_super) {
        tslib_1.__extends(Notebook, _super);
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
        tslib_1.__extends(Sections, _super);
        function Sections(baseUrl, path) {
            if (path === void 0) { path = "sections"; }
            return _super.call(this, baseUrl, path) || this;
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
                body: common.jsS(postBody),
            }).then(function (r) {
                return {
                    data: r,
                    section: _this.getById(r.id),
                };
            });
        };
        return Sections;
    }(GraphQueryableCollection));
    /**
     * Describes a sections instance
     *
     */
    var Section = /** @class */ (function (_super) {
        tslib_1.__extends(Section, _super);
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
        tslib_1.__extends(Pages, _super);
        function Pages(baseUrl, path) {
            if (path === void 0) { path = "pages"; }
            return _super.call(this, baseUrl, path) || this;
        }
        return Pages;
    }(GraphQueryableCollection));

    var Contacts = /** @class */ (function (_super) {
        tslib_1.__extends(Contacts, _super);
        function Contacts(baseUrl, path) {
            if (path === void 0) { path = "contacts"; }
            return _super.call(this, baseUrl, path) || this;
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
            var postBody = common.extend({
                businessPhones: businessPhones,
                emailAddresses: emailAddresses,
                givenName: givenName,
                surName: surName,
            }, additionalProperties);
            return this.postCore({
                body: common.jsS(postBody),
            }).then(function (r) {
                return {
                    contact: _this.getById(r.id),
                    data: r,
                };
            });
        };
        return Contacts;
    }(GraphQueryableCollection));
    var Contact = /** @class */ (function (_super) {
        tslib_1.__extends(Contact, _super);
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
                body: common.jsS(properties),
            });
        };
        return Contact;
    }(GraphQueryableInstance));
    var ContactFolders = /** @class */ (function (_super) {
        tslib_1.__extends(ContactFolders, _super);
        function ContactFolders(baseUrl, path) {
            if (path === void 0) { path = "contactFolders"; }
            return _super.call(this, baseUrl, path) || this;
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
                body: common.jsS(postBody),
            }).then(function (r) {
                return {
                    contactFolder: _this.getById(r.id),
                    data: r,
                };
            });
        };
        return ContactFolders;
    }(GraphQueryableCollection));
    var ContactFolder = /** @class */ (function (_super) {
        tslib_1.__extends(ContactFolder, _super);
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
                return new ChildFolders(this);
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
                body: common.jsS(properties),
            });
        };
        return ContactFolder;
    }(GraphQueryableInstance));
    var ChildFolders = /** @class */ (function (_super) {
        tslib_1.__extends(ChildFolders, _super);
        function ChildFolders(baseUrl, path) {
            if (path === void 0) { path = "childFolders"; }
            return _super.call(this, baseUrl, path) || this;
        }
        ChildFolders.prototype.getById = function (id) {
            return new ContactFolder(this, id);
        };
        /**
         * Create a new Child Folder in Contact folder.
         *
         * @param displayName The folder's display name.
         * @param parentFolderId The ID of the folder's parent folder.
         */
        ChildFolders.prototype.add = function (displayName, parentFolderId) {
            var _this = this;
            var postBody = {
                displayName: displayName,
                parentFolderId: parentFolderId,
            };
            return this.postCore({
                body: common.jsS(postBody),
            }).then(function (r) {
                return {
                    contactFolder: _this.getById(r.id),
                    data: r,
                };
            });
        };
        return ChildFolders;
    }(GraphQueryableInstance));

    var Me = /** @class */ (function (_super) {
        tslib_1.__extends(Me, _super);
        function Me(baseUrl, path) {
            if (path === void 0) { path = "me"; }
            return _super.call(this, baseUrl, path) || this;
        }
        Object.defineProperty(Me.prototype, "onenote", {
            /**
            * The onenote associated with me
            */
            get: function () {
                return new OneNote(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Me.prototype, "contacts", {
            /**
            * The Contacts associated with the user
            */
            get: function () {
                return new Contacts(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Me.prototype, "contactFolders", {
            /**
             * The Contact Folders associated with the user
             */
            get: function () {
                return new ContactFolders(this);
            },
            enumerable: true,
            configurable: true
        });
        return Me;
    }(GraphQueryableInstance));

    /**
     * Describes a collection of Users objects
     *
     */
    var Users = /** @class */ (function (_super) {
        tslib_1.__extends(Users, _super);
        function Users(baseUrl, path) {
            if (path === void 0) { path = "users"; }
            return _super.call(this, baseUrl, path) || this;
        }
        /**
         * Gets a user from the collection using the specified id
         *
         * @param id Id of the user to get from this collection
         */
        Users.prototype.getById = function (id) {
            return new User(this, id);
        };
        return Users;
    }(GraphQueryableCollection));
    /**
     * Represents a user entity
     */
    var User = /** @class */ (function (_super) {
        tslib_1.__extends(User, _super);
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
        return User;
    }(GraphQueryableInstance));

    var GraphRest = /** @class */ (function (_super) {
        tslib_1.__extends(GraphRest, _super);
        function GraphRest(baseUrl, path) {
            return _super.call(this, baseUrl, path) || this;
        }
        Object.defineProperty(GraphRest.prototype, "groups", {
            get: function () {
                return new Groups(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphRest.prototype, "teams", {
            get: function () {
                return new Teams();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphRest.prototype, "me", {
            get: function () {
                return new Me(this);
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
        GraphRest.prototype.setup = function (config) {
            setup(config);
        };
        return GraphRest;
    }(GraphQueryable));
    var graph = new GraphRest("v1.0");

    var GraphBatch = /** @class */ (function (_super) {
        tslib_1.__extends(GraphBatch, _super);
        function GraphBatch(batchUrl) {
            if (batchUrl === void 0) { batchUrl = "https://graph.microsoft.com/beta/$batch"; }
            var _this = _super.call(this) || this;
            _this.batchUrl = batchUrl;
            return _this;
        }
        GraphBatch.prototype.executeImpl = function () {
            var _this = this;
            logging.Logger.write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Executing batch with " + this.requests.length + " requests.", 1 /* Info */);
            var client = new GraphHttpClient();
            var batchRequest = {
                requests: this.formatRequests(),
            };
            var batchOptions = {
                body: common.jsS(batchRequest),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
            };
            logging.Logger.write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Sending batch request.", 1 /* Info */);
            // let nextLinkFlag = false;
            return client.fetch(this.batchUrl, batchOptions)
                .then(function (r) { return r.json(); })
                .then(this._parseResponse)
                .then(function (parsedResponse) {
                logging.Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched requests.", 1 /* Info */);
                return parsedResponse.responses.reduce(function (chain, response, index) {
                    var request = _this.requests[index];
                    if (common.objectDefinedNotNull(request)) {
                        logging.Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched request " + request.method + " " + request.url + ".", 0 /* Verbose */);
                        return chain.then(function (_) { return request.parser.parse(response).then(request.resolve).catch(request.reject); });
                    }
                    else {
                        // do we have a next url? if no this is an error
                        if (parsedResponse.nextLink) {
                            throw Error("Could not properly parse responses to match requests in batch.");
                        }
                        // nextLinkFlag = true;
                        // keep the chain moving, but don't add anything for this request yet
                        // here we need to process the next link - so what do we do?
                        // need to append a .then()
                        // TODO::
                        return chain;
                    }
                }, Promise.resolve());
            });
        };
        GraphBatch.prototype.formatRequests = function () {
            return this.requests.map(function (reqInfo, index) {
                var requestFragment = {
                    id: "" + ++index,
                    method: reqInfo.method,
                    url: reqInfo.url,
                };
                var headers = {};
                // merge global config headers
                if (GraphRuntimeConfig.headers !== undefined && GraphRuntimeConfig.headers !== null) {
                    headers = common.extend(headers, GraphRuntimeConfig.headers);
                }
                if (reqInfo.options !== undefined) {
                    // merge per request headers
                    if (reqInfo.options.headers !== undefined && reqInfo.options.headers !== null) {
                        headers = common.extend(headers, reqInfo.options.headers);
                    }
                    // add a request body
                    if (reqInfo.options.body !== undefined && reqInfo.options.body !== null) {
                        requestFragment = common.extend(requestFragment, {
                            body: reqInfo.options.body,
                        });
                    }
                }
                requestFragment = common.extend(requestFragment, {
                    headers: headers,
                });
                return requestFragment;
            });
        };
        GraphBatch.prototype._parseResponse = function (graphResponse) {
            var _this = this;
            return new Promise(function (resolve) {
                var parsedResponses = new Array(_this.requests.length).fill(null);
                for (var i = 0; i < graphResponse.responses.length; ++i) {
                    var response = graphResponse.responses[i];
                    // we create the request id by adding 1 to the index, so we place the response by subtracting one to match
                    // the array of requests and make it easier to map them by index
                    var responseId = parseInt(response.id, 10) - 1;
                    if (response.status === 204) {
                        parsedResponses[responseId] = new Response();
                    }
                    else {
                        parsedResponses[responseId] = new Response(null, {
                            headers: response.headers,
                            status: response.status,
                        });
                    }
                }
                resolve({
                    nextLink: graphResponse.nextLink,
                    responses: parsedResponses,
                });
            });
        };
        return GraphBatch;
    }(odata.ODataBatch));

    exports.graph = graph;
    exports.GraphRest = GraphRest;
    exports.Group = Group;
    exports.Groups = Groups;
    exports.GraphBatch = GraphBatch;
    exports.GraphQueryable = GraphQueryable;
    exports.GraphQueryableCollection = GraphQueryableCollection;
    exports.GraphQueryableInstance = GraphQueryableInstance;
    exports.GraphQueryableSearchableCollection = GraphQueryableSearchableCollection;
    exports.Teams = Teams;
    exports.Team = Team;
    exports.GraphEndpoints = GraphEndpoints;
    exports.OneNote = OneNote;
    exports.Notebooks = Notebooks;
    exports.Notebook = Notebook;
    exports.Sections = Sections;
    exports.Section = Section;
    exports.Pages = Pages;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=graph.es5.umd.js.map
