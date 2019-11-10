/**
 * @license
 * v1.2.10-4
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { RuntimeConfig, AdalClient, extend, mergeHeaders, getCtxCallback, combine, isUrlAbsolute, getGUID, jsS } from '@pnp/common';
import { ODataQueryable, BlobParser, BufferParser, ODataDefaultParser, ODataBatch } from '@pnp/odata';
import { Logger } from '@pnp/logging';

function setup(config) {
    RuntimeConfig.extend(config);
}
class GraphRuntimeConfigImpl {
    get headers() {
        const graphPart = RuntimeConfig.get("graph");
        if (graphPart !== undefined && graphPart !== null && graphPart.headers !== undefined) {
            return graphPart.headers;
        }
        return {};
    }
    get fetchClientFactory() {
        const graphPart = RuntimeConfig.get("graph");
        // use a configured factory firt
        if (graphPart !== undefined && graphPart !== null && graphPart.fetchClientFactory !== undefined) {
            return graphPart.fetchClientFactory;
        }
        // then try and use spfx context if available
        if (RuntimeConfig.spfxContext !== undefined) {
            return () => AdalClient.fromSPFxContext(RuntimeConfig.spfxContext);
        }
        throw Error("There is no Graph Client available, either set one using configuraiton or provide a valid SPFx Context using setup.");
    }
}
let GraphRuntimeConfig = new GraphRuntimeConfigImpl();

class GraphHttpClient {
    constructor() {
        this._impl = GraphRuntimeConfig.fetchClientFactory();
    }
    fetch(url, options = {}) {
        const headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        mergeHeaders(headers, GraphRuntimeConfig.headers);
        // second we add the local options so we can overwrite the globals
        mergeHeaders(headers, options.headers);
        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json");
        }
        const opts = extend(options, { headers: headers });
        return this.fetchRaw(url, opts);
    }
    fetchRaw(url, options = {}) {
        // here we need to normalize the headers
        const rawHeaders = new Headers();
        mergeHeaders(rawHeaders, options.headers);
        options = extend(options, { headers: rawHeaders });
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
                setTimeout(getCtxCallback(this, retry, ctx), delay);
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

class GraphEndpoints {
    /**
     *
     * @param url The url to set the endpoint
     */
    static ensure(url, endpoint) {
        const all = [GraphEndpoints.Beta, GraphEndpoints.V1];
        let regex = new RegExp(endpoint, "i");
        const replaces = all.filter(s => !regex.test(s)).map(s => s.replace(".", "\\."));
        regex = new RegExp(`/?(${replaces.join("|")})/`, "ig");
        return url.replace(regex, `/${endpoint}/`);
    }
}
GraphEndpoints.Beta = "beta";
GraphEndpoints.V1 = "v1.0";

/**
 * Queryable Base Class
 *
 */
class GraphQueryable extends ODataQueryable {
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param baseUrl A string or Queryable that should form the base part of the url
     *
     */
    constructor(baseUrl, path) {
        super();
        if (typeof baseUrl === "string") {
            const urlStr = baseUrl;
            this._parentUrl = urlStr;
            this._url = combine(urlStr, path);
        }
        else {
            this.extend(baseUrl, path);
        }
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
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new queryable
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
        let url = this.toUrl();
        if (!isUrlAbsolute(url)) {
            url = combine("https://graph.microsoft.com", url);
        }
        if (this.query.size > 0) {
            const char = url.indexOf("?") > -1 ? "&" : "?";
            url += `${char}${Array.from(this.query).map((v) => v[0] + "=" + v[1]).join("&")}`;
        }
        return url;
    }
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    getParent(factory, baseUrl = this.parentUrl, path) {
        return new factory(baseUrl, path);
    }
    /**
     * Clones this queryable into a new queryable instance of T
     * @param factory Constructor used to create the new instance
     * @param additionalPath Any additional path to include in the clone
     * @param includeBatch If true this instance's batch will be added to the cloned instance
     */
    clone(factory, additionalPath, includeBatch = true) {
        return super._clone(new factory(this, additionalPath), { includeBatch });
    }
    setEndpoint(endpoint) {
        this._url = GraphEndpoints.ensure(this._url, endpoint);
        return this;
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
        return Promise.resolve({
            batch: this.batch,
            batchDependency: dependencyDispose,
            cachingOptions: this._cachingOptions,
            clientFactory: () => new GraphHttpClient(),
            isBatched: this.hasBatch,
            isCached: /^get$/i.test(verb) && this._useCaching,
            options: options,
            parser: parser,
            pipeline: pipeline,
            requestAbsoluteUrl: this.toUrlAndQuery(),
            requestId: getGUID(),
            verb: verb,
        });
    }
}
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
class GraphQueryableCollection extends GraphQueryable {
    /**
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
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top) {
        this.query.set("$top", top.toString());
        return this;
    }
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    skip(num) {
        this.query.set("$skip", num.toString());
        return this;
    }
    /**
     * 	To request second and subsequent pages of Graph data
     */
    skipToken(token) {
        this.query.set("$skiptoken", token);
        return this;
    }
    /**
     * 	Retrieves the total count of matching resources
     */
    get count() {
        this.query.set("$count", "true");
        return this;
    }
}
class GraphQueryableSearchableCollection extends GraphQueryableCollection {
    /**
     * 	To request second and subsequent pages of Graph data
     */
    search(query) {
        this.query.set("$search", query);
        return this;
    }
}
/**
 * Represents an instance that can be selected
 *
 */
class GraphQueryableInstance extends GraphQueryable {
}
/**
 * Decorator used to specify the default path for Queryable objects
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

var Members_1;
let Members = Members_1 = class Members extends GraphQueryableCollection {
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: https://graph.microsoft.com/v1.0/directoryObjects/${id})
     */
    add(id) {
        return this.clone(Members_1, "$ref").postCore({
            body: jsS({
                "@odata.id": id,
            }),
        });
    }
    /**
     * Gets a member of the group by id
     *
     * @param id Group member's id
     */
    getById(id) {
        return new Member(this, id);
    }
};
Members = Members_1 = __decorate([
    defaultPath("members")
], Members);
class Member extends GraphQueryableInstance {
    /**
     * Removes this Member
     */
    remove() {
        return this.clone(Member, "$ref").deleteCore();
    }
}
let Owners = class Owners extends Members {
};
Owners = __decorate([
    defaultPath("owners")
], Owners);

// import { Attachments } from "./attachments";
let Calendars = class Calendars extends GraphQueryableCollection {
};
Calendars = __decorate([
    defaultPath("calendars")
], Calendars);
class Calendar extends GraphQueryableInstance {
    get events() {
        return new Events(this);
    }
}
let Events = class Events extends GraphQueryableCollection {
    getById(id) {
        return new Event(this, id);
    }
    /**
     * Adds a new event to the collection
     *
     * @param properties The set of properties used to create the event
     */
    add(properties) {
        return this.postCore({
            body: jsS(properties),
        }).then(r => {
            return {
                data: r,
                event: this.getById(r.id),
            };
        });
    }
};
Events = __decorate([
    defaultPath("events")
], Events);
class Event extends GraphQueryableInstance {
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
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
    /**
     * Deletes this event
     */
    delete() {
        return this.deleteCore();
    }
}

let Attachments = class Attachments extends GraphQueryableCollection {
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    getById(id) {
        return new Attachment(this, id);
    }
    /**
     * Add attachment to this collection
     *
     * @param name Name given to the attachment file
     * @param bytes File content
     */
    addFile(name, bytes) {
        return this.postCore({
            body: jsS({
                "@odata.type": "#microsoft.graph.fileAttachment",
                contentBytes: bytes,
                name: name,
            }),
        });
    }
};
Attachments = __decorate([
    defaultPath("attachments")
], Attachments);
class Attachment extends GraphQueryableInstance {
}

let Conversations = class Conversations extends GraphQueryableCollection {
    /**
     * Create a new conversation by including a thread and a post.
     *
     * @param properties Properties used to create the new conversation
     */
    add(properties) {
        return this.postCore({
            body: jsS(properties),
        });
    }
    /**
     * Gets a conversation from this collection by id
     *
     * @param id Group member's id
     */
    getById(id) {
        return new Conversation(this, id);
    }
};
Conversations = __decorate([
    defaultPath("conversations")
], Conversations);
let Threads = class Threads extends GraphQueryableCollection {
    /**
     * Gets a thread from this collection by id
     *
     * @param id Group member's id
     */
    getById(id) {
        return new Thread(this, id);
    }
    /**
     * Adds a new thread to this collection
     *
     * @param properties properties used to create the new thread
     * @returns Id of the new thread
     */
    add(properties) {
        return this.postCore({
            body: jsS(properties),
        });
    }
};
Threads = __decorate([
    defaultPath("threads")
], Threads);
let Posts = class Posts extends GraphQueryableCollection {
    /**
     * Gets a thread from this collection by id
     *
     * @param id Group member's id
     */
    getById(id) {
        return new Post(this, id);
    }
    /**
     * Adds a new thread to this collection
     *
     * @param properties properties used to create the new thread
     * @returns Id of the new thread
     */
    add(properties) {
        return this.postCore({
            body: jsS(properties),
        });
    }
};
Posts = __decorate([
    defaultPath("posts")
], Posts);
class Conversation extends GraphQueryableInstance {
    /**
     * Get all the threads in a group conversation.
     */
    get threads() {
        return new Threads(this);
    }
    /**
     * Updates this conversation
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
    /**
     * Deletes this member from the group
     */
    delete() {
        return this.deleteCore();
    }
}
class Thread extends GraphQueryableInstance {
    /**
     * Get all the threads in a group conversation.
     */
    get posts() {
        return new Posts(this);
    }
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    reply(post) {
        return this.clone(Thread, "reply").postCore({
            body: jsS({
                post: post,
            }),
        });
    }
    /**
     * Deletes this member from the group
     */
    delete() {
        return this.deleteCore();
    }
}
class Post extends GraphQueryableInstance {
    get attachments() {
        return new Attachments(this);
    }
    /**
     * Deletes this post
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Forward a post to a recipient
     */
    forward(info) {
        return this.clone(Post, "forward").postCore({
            body: jsS(info),
        });
    }
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    reply(post) {
        return this.clone(Post, "reply").postCore({
            body: jsS({
                post: post,
            }),
        });
    }
}
class Senders extends GraphQueryableCollection {
    constructor(baseUrl, path) {
        super(baseUrl, path);
    }
    /**
     * Add a new user or group to this senders collection
     * @param id The full @odata.id value to add (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    add(id) {
        return this.clone(Senders, "$ref").postCore({
            body: jsS({
                "@odata.id": id,
            }),
        });
    }
    /**
     * Removes the entity from the collection
     *
     * @param id The full @odata.id value to remove (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    remove(id) {
        const remover = this.clone(Senders, "$ref");
        remover.query.set("$id", id);
        return remover.deleteCore();
    }
}

let Planner = class Planner extends GraphQueryableInstance {
    // Should Only be able to get by id, or else error occur
    get plans() {
        return new Plans(this);
    }
    // Should Only be able to get by id, or else error occur
    get tasks() {
        return new Tasks(this);
    }
    // Should Only be able to get by id, or else error occur
    get buckets() {
        return new Buckets(this);
    }
};
Planner = __decorate([
    defaultPath("planner")
], Planner);
let Plans = class Plans extends GraphQueryableCollection {
    getById(id) {
        return new Plan(this, id);
    }
    /**
     * Create a new Planner Plan.
     *
     * @param owner Id of Group object.
     * @param title The Title of the Plan.
     */
    add(owner, title) {
        const postBody = {
            owner: owner,
            title: title,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
                plan: this.getById(r.id),
            };
        });
    }
};
Plans = __decorate([
    defaultPath("plans")
], Plans);
/**
 * Should not be able to get by Id
 */
class Plan extends GraphQueryableInstance {
    get tasks() {
        return new Tasks(this);
    }
    get buckets() {
        return new Buckets(this);
    }
    get details() {
        return new Details(this);
    }
    /**
     * Deletes this Plan
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a Plan
     *
     * @param properties Set of properties of this Plan to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
}
let Tasks = class Tasks extends GraphQueryableCollection {
    getById(id) {
        return new Task(this, id);
    }
    /**
     * Create a new Planner Task.
     *
     * @param planId Id of Plan.
     * @param title The Title of the Task.
     * @param assignments Assign the task
     * @param bucketId Id of Bucket
     */
    add(planId, title, assignments, bucketId) {
        let postBody = extend({
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
        }).then(r => {
            return {
                data: r,
                task: this.getById(r.id),
            };
        });
    }
};
Tasks = __decorate([
    defaultPath("tasks")
], Tasks);
class Task extends GraphQueryableInstance {
    /**
     * Deletes this Task
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a Task
     *
     * @param properties Set of properties of this Task to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
    get details() {
        return new Details(this);
    }
}
let Buckets = class Buckets extends GraphQueryableCollection {
    /**
     * Create a new Bucket.
     *
     * @param name Name of Bucket object.
     * @param planId The Id of the Plan.
     * @param oderHint Hint used to order items of this type in a list view.
     */
    add(name, planId, orderHint) {
        const postBody = {
            name: name,
            orderHint: orderHint ? orderHint : "",
            planId: planId,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                bucket: this.getById(r.id),
                data: r,
            };
        });
    }
    getById(id) {
        return new Bucket(this, id);
    }
};
Buckets = __decorate([
    defaultPath("buckets")
], Buckets);
class Bucket extends GraphQueryableInstance {
    /**
     * Deletes this Bucket
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a Bucket
     *
     * @param properties Set of properties of this Bucket to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
    get tasks() {
        return new Tasks(this);
    }
}
let Details = class Details extends GraphQueryableCollection {
};
Details = __decorate([
    defaultPath("details")
], Details);

var Photo_1;
let Photo = Photo_1 = class Photo extends GraphQueryableInstance {
    /**
     * Gets the image bytes as a blob (browser)
     */
    getBlob() {
        return this.clone(Photo_1, "$value", false).get(new BlobParser());
    }
    /**
     * Gets the image file byets as a Buffer (node.js)
     */
    getBuffer() {
        return this.clone(Photo_1, "$value", false).get(new BufferParser());
    }
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    setContent(content) {
        return this.clone(Photo_1, "$value", false).patchCore({
            body: content,
        });
    }
};
Photo = Photo_1 = __decorate([
    defaultPath("photo")
], Photo);

var Team_1, Tab_1;
let Teams = class Teams extends GraphQueryableCollection {
    /**
     * Creates a new team and associated Group with the given information
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param ownerId Add an owner with a user id from the graph
     */
    create(name, description = "", ownerId, teamProperties = {}) {
        const groupProps = {
            "description": description && description.length > 0 ? description : "",
            "owners@odata.bind": [
                `https://graph.microsoft.com/v1.0/users/${ownerId}`,
            ],
        };
        return graph.groups.add(name, name, GroupType.Office365, groupProps).then((gar) => {
            return gar.group.createTeam(teamProperties).then(data => {
                return {
                    data: data,
                    group: gar.group,
                    team: new Team(gar.group),
                };
            });
        });
    }
    getById(id) {
        return new Team(this, id);
    }
};
Teams = __decorate([
    defaultPath("teams")
], Teams);
/**
 * Represents a Microsoft Team
 */
let Team = Team_1 = class Team extends GraphQueryableInstance {
    get channels() {
        return new Channels(this);
    }
    get installedApps() {
        return new Apps(this);
    }
    /**
     * Updates this team instance's properties
     *
     * @param properties The set of properties to update
     */
    // TODO:: update properties to be typed once type is available in graph-types
    update(properties) {
        return this.clone(Team_1, "").patchCore({
            body: jsS(properties),
        }).then(data => {
            return {
                data: data,
                team: this,
            };
        });
    }
    /**
     * Archives this Team
     *
     * @param shouldSetSpoSiteReadOnlyForMembers Should members have Read-only in associated Team Site
     */
    // TODO:: update properties to be typed once type is available in graph-types
    archive(shouldSetSpoSiteReadOnlyForMembers) {
        let postBody;
        if (shouldSetSpoSiteReadOnlyForMembers != null) {
            postBody = extend(postBody, {
                shouldSetSpoSiteReadOnlyForMembers: shouldSetSpoSiteReadOnlyForMembers,
            });
        }
        return this.clone(Team_1, "archive").postCore({
            body: jsS(postBody),
        }).then(data => {
            return {
                data: data,
                team: this,
            };
        });
    }
    /**
    * Unarchives this Team
    *
    */
    // TODO:: update properties to be typed once type is available in graph-types
    unarchive() {
        return this.clone(Team_1, "unarchive").postCore({}).then(data => {
            return {
                data: data,
                team: this,
            };
        });
    }
    /**
     * Clones this Team
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param partsToClone Parts to clone ex: apps,tabs,settings,channels,members
     * @param visibility Set visibility to public or private
     */
    // TODO:: update properties to be typed once type is available in graph-types
    cloneTeam(name, description = "", partsToClone, visibility) {
        const postBody = {
            description: description ? description : "",
            displayName: name,
            mailNickname: name,
            partsToClone: partsToClone,
            visibility: visibility,
        };
        return this.clone(Team_1, "clone").postCore({
            body: jsS(postBody),
        }).then(data => {
            return {
                data: data,
                team: this,
            };
        });
    }
    /**
     * Executes the currently built request
     *
     * @param parser Allows you to specify a parser to handle the result
     * @param getOptions The options used for this request
     */
    get(parser = new ODataDefaultParser(), options = {}) {
        return this.clone(Team_1, "").getCore(parser, options);
    }
};
Team = Team_1 = __decorate([
    defaultPath("team")
], Team);
let Channels = class Channels extends GraphQueryableCollection {
    /**
     * Creates a new Channel in the Team
     * @param name The display name of the new channel
     * @param description Optional description of the channel
     *
     */
    create(name, description = "") {
        const postBody = {
            description: description && description.length > 0 ? description : "",
            displayName: name,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                channel: this.getById(r.id),
                data: r,
            };
        });
    }
    getById(id) {
        return new Channel(this, id);
    }
};
Channels = __decorate([
    defaultPath("channels")
], Channels);
class Channel extends GraphQueryableInstance {
    get tabs() {
        return new Tabs(this);
    }
}
let Apps = class Apps extends GraphQueryableCollection {
    /**
     * Creates a new App in the Team
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     *
     */
    add(appUrl) {
        const postBody = {
            "teamsApp@odata.bind": appUrl,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
            };
        });
    }
    /**
     * Deletes this app
     */
    remove() {
        return this.deleteCore();
    }
};
Apps = __decorate([
    defaultPath("installedApps")
], Apps);
let Tabs = class Tabs extends GraphQueryableCollection {
    /**
     * Adds a tab to the cahnnel
     * @param name The name of the new Tab
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     * @param tabsConfiguration visit https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/teamstab_add for reference
     */
    add(name, appUrl, properties) {
        const postBody = extend({
            name: name,
            "teamsApp@odata.bind": appUrl,
        }, properties);
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
                tab: this.getById(r.id),
            };
        });
    }
    getById(id) {
        return new Tab(this, id);
    }
};
Tabs = __decorate([
    defaultPath("tabs")
], Tabs);
/**
 * Represents a Microsoft Team
 */
let Tab = Tab_1 = class Tab extends GraphQueryableInstance {
    /**
     * Updates this tab
     *
     * @param properties The set of properties to update
     */
    // TODO:: update properties to be typed once type is available in graph-types
    update(properties) {
        return this.clone(Tab_1, "").patchCore({
            body: jsS(properties),
        }).then(data => {
            return {
                data: data,
                tab: this,
            };
        });
    }
    /**
     * Deletes this tab
     */
    remove() {
        return this.deleteCore();
    }
};
Tab = Tab_1 = __decorate([
    defaultPath("tab")
], Tab);

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
let Groups = class Groups extends GraphQueryableCollection {
    /**
     * Gets a group from the collection using the specified id
     *
     * @param id Id of the group to get from this collection
     */
    getById(id) {
        return new Group(this, id);
    }
    /**
     * Create a new group as specified in the request body.
     *
     * @param name Name to display in the address book for the group
     * @param mailNickname Mail alias for the group
     * @param groupType Type of group being created
     * @param additionalProperties A plain object collection of additional properties you want to set on the new group
     */
    add(name, mailNickname, groupType, additionalProperties = {}) {
        let postBody = extend({
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
        }).then(r => {
            return {
                data: r,
                group: this.getById(r.id),
            };
        });
    }
};
Groups = __decorate([
    defaultPath("groups")
], Groups);
/**
 * Represents a group entity
 */
class Group extends GraphQueryableInstance {
    /**
     * The calendar associated with this group
     */
    get calendar() {
        return new Calendar(this, "calendar");
    }
    /**
     * Retrieve a list of event objects
     */
    get events() {
        return new Events(this);
    }
    /**
     * Gets the collection of owners for this group
     */
    get owners() {
        return new Owners(this);
    }
    /**
     * The collection of plans for this group
     */
    get plans() {
        return new Plans(this, "planner/plans");
    }
    /**
     * Gets the collection of members for this group
     */
    get members() {
        return new Members(this);
    }
    /**
     * Gets the conversations collection for this group
     */
    get conversations() {
        return new Conversations(this);
    }
    /**
     * Gets the collection of accepted senders for this group
     */
    get acceptedSenders() {
        return new Senders(this, "acceptedsenders");
    }
    /**
     * Gets the collection of rejected senders for this group
     */
    get rejectedSenders() {
        return new Senders(this, "rejectedsenders");
    }
    /**
     * The photo associated with the group
     */
    get photo() {
        return new Photo(this);
    }
    /**
     * Gets the team associated with this group, if it exists
     */
    get team() {
        return new Team(this);
    }
    /**
     * Add the group to the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    addFavorite() {
        return this.clone(Group, "addFavorite").postCore();
    }
    /**
     * Creates a Microsoft Team associated with this group
     *
     * @param properties Initial properties for the new Team
     */
    createTeam(properties) {
        return this.clone(Group, "team").putCore({
            body: jsS(properties),
        });
    }
    /**
     * Returns all the groups and directory roles that the specified group is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    getMemberObjects(securityEnabledOnly = false) {
        return this.clone(Group, "getMemberObjects").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    }
    /**
     * Return all the groups that the specified group is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    getMemberGroups(securityEnabledOnly = false) {
        return this.clone(Group, "getMemberGroups").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    }
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    checkMemberGroups(groupIds) {
        return this.clone(Group, "checkMemberGroups").postCore({
            body: jsS({
                groupIds: groupIds,
            }),
        });
    }
    /**
     * Deletes this group
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a group object
     *
     * @param properties Set of properties of this group to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
    /**
     * Remove the group from the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    removeFavorite() {
        return this.clone(Group, "removeFavorite").postCore();
    }
    /**
     * Reset the unseenCount of all the posts that the current user has not seen since their last visit
     */
    resetUnseenCount() {
        return this.clone(Group, "resetUnseenCount").postCore();
    }
    /**
     * Calling this method will enable the current user to receive email notifications for this group,
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    subscribeByMail() {
        return this.clone(Group, "subscribeByMail").postCore();
    }
    /**
     * Calling this method will prevent the current user from receiving email notifications for this group
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    unsubscribeByMail() {
        return this.clone(Group, "unsubscribeByMail").postCore();
    }
    /**
     * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range, from the default calendar of a group
     *
     * @param start Start date and time of the time range
     * @param end End date and time of the time range
     */
    getCalendarView(start, end) {
        const view = this.clone(Group, "calendarView");
        view.query.set("startDateTime", start.toISOString());
        view.query.set("endDateTime", end.toISOString());
        return view.get();
    }
}

let Contacts = class Contacts extends GraphQueryableCollection {
    getById(id) {
        return new Contact(this, id);
    }
    /**
    * Create a new Contact for the user.
    *
    * @param givenName The contact's given name.
    * @param surName The contact's surname.
    * @param emailAddresses The contact's email addresses.
    * @param businessPhones The contact's business phone numbers.
    * @param additionalProperties A plain object collection of additional properties you want to set on the new contact
    */
    add(givenName, surName, emailAddresses, businessPhones, additionalProperties = {}) {
        const postBody = extend({
            businessPhones: businessPhones,
            emailAddresses: emailAddresses,
            givenName: givenName,
            surName: surName,
        }, additionalProperties);
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                contact: this.getById(r.id),
                data: r,
            };
        });
    }
};
Contacts = __decorate([
    defaultPath("contacts")
], Contacts);
class Contact extends GraphQueryableInstance {
    /**
     * Deletes this contact
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a contact object
     *
     * @param properties Set of properties of this contact to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
}
let ContactFolders = class ContactFolders extends GraphQueryableCollection {
    getById(id) {
        return new ContactFolder(this, id);
    }
    /**
     * Create a new Contact Folder for the user.
     *
     * @param displayName The folder's display name.
     * @param parentFolderId The ID of the folder's parent folder.
     */
    add(displayName, parentFolderId) {
        const postBody = {
            displayName: displayName,
            parentFolderId: parentFolderId,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                contactFolder: this.getById(r.id),
                data: r,
            };
        });
    }
};
ContactFolders = __decorate([
    defaultPath("contactFolders")
], ContactFolders);
class ContactFolder extends GraphQueryableInstance {
    /**
     * Gets the contacts in this contact folder
     */
    get contacts() {
        return new Contacts(this);
    }
    /**
    * Gets the contacts in this contact folder
    */
    get childFolders() {
        return new ContactFolders(this, "childFolders");
    }
    /**
     * Deletes this contact folder
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a contact folder
     *
     * @param properties Set of properties of this contact folder to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
}

/**
 * Represents a onenote entity
 */
let OneNote = class OneNote extends GraphQueryableInstance {
    get notebooks() {
        return new Notebooks(this);
    }
    get sections() {
        return new Sections(this);
    }
    get pages() {
        return new Pages(this);
    }
};
OneNote = __decorate([
    defaultPath("onenote")
], OneNote);
/**
 * Describes a collection of Notebook objects
 *
 */
let Notebooks = class Notebooks extends GraphQueryableCollection {
    /**
     * Gets a notebook instance by id
     *
     * @param id Notebook id
     */
    getById(id) {
        return new Notebook(this, id);
    }
    /**
     * Create a new notebook as specified in the request body.
     *
     * @param displayName Notebook display name
     */
    add(displayName) {
        const postBody = {
            displayName: displayName,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
                notebook: this.getById(r.id),
            };
        });
    }
};
Notebooks = __decorate([
    defaultPath("notebooks")
], Notebooks);
/**
 * Describes a notebook instance
 *
 */
class Notebook extends GraphQueryableInstance {
    constructor(baseUrl, path) {
        super(baseUrl, path);
    }
    get sections() {
        return new Sections(this);
    }
}
/**
 * Describes a collection of Sections objects
 *
 */
let Sections = class Sections extends GraphQueryableCollection {
    /**
     * Gets a section instance by id
     *
     * @param id Section id
     */
    getById(id) {
        return new Section(this, id);
    }
    /**
     * Adds a new section
     *
     * @param displayName New section display name
     */
    add(displayName) {
        const postBody = {
            displayName: displayName,
        };
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
                section: this.getById(r.id),
            };
        });
    }
};
Sections = __decorate([
    defaultPath("sections")
], Sections);
/**
 * Describes a sections instance
 *
 */
class Section extends GraphQueryableInstance {
    constructor(baseUrl, path) {
        super(baseUrl, path);
    }
}
/**
 * Describes a collection of Pages objects
 *
 */
let Pages = class Pages extends GraphQueryableCollection {
};
Pages = __decorate([
    defaultPath("pages")
], Pages);

/**
 * Describes a collection of Drive objects
 *
 */
let Drives = class Drives extends GraphQueryableCollection {
    /**
     * Gets a Drive instance by id
     *
     * @param id Drive id
     */
    getById(id) {
        return new Drive(this, id);
    }
};
Drives = __decorate([
    defaultPath("drives")
], Drives);
/**
 * Describes a Drive instance
 *
 */
let Drive = class Drive extends GraphQueryableInstance {
    get root() {
        return new Root(this);
    }
    get items() {
        return new DriveItems(this);
    }
    get list() {
        return new DriveList(this);
    }
    get recent() {
        return new Recent(this);
    }
    get sharedWithMe() {
        return new SharedWithMe(this);
    }
};
Drive = __decorate([
    defaultPath("drive")
], Drive);
/**
 * Describes a Root instance
 *
 */
let Root = class Root extends GraphQueryableInstance {
    get children() {
        return new Children(this);
    }
    search(query) {
        return new DriveSearch(this, `search(q='${query}')`);
    }
};
Root = __decorate([
    defaultPath("root")
], Root);
/**
 * Describes a collection of Drive Item objects
 *
 */
let DriveItems = class DriveItems extends GraphQueryableCollection {
    /**
     * Gets a Drive Item instance by id
     *
     * @param id Drive Item id
     */
    getById(id) {
        return new DriveItem(this, id);
    }
};
DriveItems = __decorate([
    defaultPath("items")
], DriveItems);
/**
 * Describes a Drive Item instance
 *
 */
class DriveItem extends GraphQueryableInstance {
    get children() {
        return new Children(this);
    }
    get thumbnails() {
        return new Thumbnails(this);
    }
    /**
     * Deletes this Drive Item
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a Drive item
     *
     * @param properties Set of properties of this Drive Item to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
    /**
     * Move the Drive item and optionally update the properties
     *
     * @param parentReference Should contain Id of new parent folder
     * @param properties Optional set of properties of this Drive Item to update
     */
    move(parentReference, properties) {
        let patchBody = extend({}, parentReference);
        if (properties) {
            patchBody = extend({}, properties);
        }
        return this.patchCore({
            body: jsS(patchBody),
        });
    }
}
/**
 * Return a collection of DriveItems in the children relationship of a DriveItem
 *
 */
let Children = class Children extends GraphQueryableCollection {
    /**
    * Create a new folder or DriveItem in a Drive with a specified parent item or path
    * Currently only Folder or File works
    * @param name The name of the Drive Item.
    * @param properties Type of Drive Item to create.
    * */
    add(name, driveItemType) {
        const postBody = extend({
            name: name,
        }, driveItemType);
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
                driveItem: new DriveItem(this, r.id),
            };
        });
    }
};
Children = __decorate([
    defaultPath("children")
], Children);
let DriveList = class DriveList extends GraphQueryableCollection {
};
DriveList = __decorate([
    defaultPath("list")
], DriveList);
let Recent = class Recent extends GraphQueryableInstance {
};
Recent = __decorate([
    defaultPath("recent")
], Recent);
let SharedWithMe = class SharedWithMe extends GraphQueryableInstance {
};
SharedWithMe = __decorate([
    defaultPath("sharedWithMe")
], SharedWithMe);
let DriveSearch = class DriveSearch extends GraphQueryableInstance {
};
DriveSearch = __decorate([
    defaultPath("search")
], DriveSearch);
let Thumbnails = class Thumbnails extends GraphQueryableInstance {
};
Thumbnails = __decorate([
    defaultPath("thumbnails")
], Thumbnails);

let Messages = class Messages extends GraphQueryableCollection {
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    getById(id) {
        return new Message(this, id);
    }
    /**
     * Add a message to this collection
     *
     * @param message The message details
     */
    add(message) {
        return this.postCore({
            body: jsS(message),
        });
    }
};
Messages = __decorate([
    defaultPath("messages")
], Messages);
class Message extends GraphQueryableInstance {
}
let MailFolders = class MailFolders extends GraphQueryableCollection {
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    getById(id) {
        return new MailFolder(this, id);
    }
    /**
     * Add a mail folder to this collection
     *
     * @param message The message details
     */
    add(mailFolder) {
        return this.postCore({
            body: jsS(mailFolder),
        });
    }
};
MailFolders = __decorate([
    defaultPath("mailFolders")
], MailFolders);
class MailFolder extends GraphQueryableInstance {
}
let MailboxSettings = class MailboxSettings extends GraphQueryableInstance {
    update(settings) {
        return this.patchCore({
            body: jsS(settings),
        });
    }
};
MailboxSettings = __decorate([
    defaultPath("mailboxSettings")
], MailboxSettings);

var DirectoryObjects_1;
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
let DirectoryObjects = DirectoryObjects_1 = class DirectoryObjects extends GraphQueryableCollection {
    /**
     * Gets a directoryObject from the collection using the specified id
     *
     * @param id Id of the Directory Object to get from this collection
     */
    getById(id) {
        return new DirectoryObject(this, id);
    }
    /**
    * Returns the directory objects specified in a list of ids. NOTE: The directory objects returned are the full objects containing all their properties.
    * The $select query option is not available for this operation.
    *
    * @param ids A collection of ids for which to return objects. You can specify up to 1000 ids.
    * @param type A collection of resource types that specifies the set of resource collections to search. Default is directoryObject.
    */
    getByIds(ids, type = DirectoryObjectType.directoryObject) {
        return this.clone(DirectoryObjects_1, "getByIds").postCore({
            body: jsS({
                ids,
                type,
            }),
        });
    }
};
DirectoryObjects = DirectoryObjects_1 = __decorate([
    defaultPath("directoryObjects")
], DirectoryObjects);
/**
 * Represents a Directory Object entity
 */
class DirectoryObject extends GraphQueryableInstance {
    /**
     * Deletes this group
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Returns all the groups and directory roles that the specified Directory Object is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    getMemberObjects(securityEnabledOnly = false) {
        return this.clone(DirectoryObject, "getMemberObjects").postCore({
            body: jsS({
                securityEnabledOnly,
            }),
        });
    }
    /**
     * Returns all the groups that the specified Directory Object is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    getMemberGroups(securityEnabledOnly = false) {
        return this.clone(DirectoryObject, "getMemberGroups").postCore({
            body: jsS({
                securityEnabledOnly,
            }),
        });
    }
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    checkMemberGroups(groupIds) {
        return this.clone(DirectoryObject, "checkMemberGroups").postCore({
            body: jsS({
                groupIds,
            }),
        });
    }
}

/**
 * Describes a collection of Users objects
 *
 */
let Users = class Users extends GraphQueryableCollection {
    /**
     * Gets a user from the collection using the specified id
     *
     * @param id Id of the user to get from this collection
     */
    getById(id) {
        return new User(this, id);
    }
};
Users = __decorate([
    defaultPath("users")
], Users);
/**
 * Represents a user entity
 */
class User extends GraphQueryableInstance {
    /**
    * The onenote associated with me
    */
    get onenote() {
        return new OneNote(this);
    }
    /**
    * The Contacts associated with the user
    */
    get contacts() {
        return new Contacts(this);
    }
    /**
    * The Teams associated with the user
    */
    get joinedTeams() {
        return new Teams(this, "joinedTeams");
    }
    /**
    * The groups and directory roles associated with the user
    */
    get memberOf() {
        return new DirectoryObjects(this, "memberOf");
    }
    /**
     * Returns all the groups and directory roles that the specified useris a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    getMemberObjects(securityEnabledOnly = false) {
        return this.clone(User, "getMemberObjects").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    }
    /**
     * Return all the groups that the specified user is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    getMemberGroups(securityEnabledOnly = false) {
        return this.clone(User, "getMemberGroups").postCore({
            body: jsS({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    }
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    checkMemberGroups(groupIds) {
        return this.clone(User, "checkMemberGroups").postCore({
            body: jsS({
                groupIds: groupIds,
            }),
        });
    }
    /**
    * The Contact Folders associated with the user
    */
    get contactFolders() {
        return new ContactFolders(this);
    }
    /**
    * The default Drive associated with the user
    */
    get drive() {
        return new Drive(this);
    }
    /**
    * The Drives the user has available
    */
    get drives() {
        return new Drives(this);
    }
    /**
    * The Tasks the user has available
    */
    get tasks() {
        return new Tasks(this, "planner/tasks");
    }
    /**
     * Get the messages in the signed-in user's mailbox
     */
    get messages() {
        return new Messages(this);
    }
    /**
     * Get the MailboxSettings in the signed-in user's mailbox
     */
    get mailboxSettings() {
        return new MailboxSettings(this);
    }
    /**
     * Get the MailboxSettings in the signed-in user's mailbox
     */
    get mailFolders() {
        return new MailFolders(this);
    }
    /**
     * Updates this user
     *
     * @param properties Properties used to update this user
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
    /**
     * Deletes this user
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Send the message specified in the request body. The message is saved in the Sent Items folder by default.
     */
    sendMail(message) {
        return this.clone(User, "sendMail").postCore({
            body: jsS(message),
        });
    }
}

class GraphBatch extends ODataBatch {
    constructor(batchUrl = "https://graph.microsoft.com/v1.0/$batch", maxRequests = 20) {
        super();
        this.batchUrl = batchUrl;
        this.maxRequests = maxRequests;
    }
    /**
     * Urls come to the batch absolute, but the processor expects relative
     * @param url Url to ensure is relative
     */
    static makeUrlRelative(url) {
        if (!isUrlAbsolute(url)) {
            // already not absolute, just give it back
            return url;
        }
        let index = url.indexOf(".com/v1.0/");
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
    }
    static formatRequests(requests) {
        return requests.map((reqInfo, index) => {
            let requestFragment = {
                id: `${++index}`,
                method: reqInfo.method,
                url: this.makeUrlRelative(reqInfo.url),
            };
            let headers = {};
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
    }
    static parseResponse(requests, graphResponse) {
        return new Promise((resolve) => {
            const parsedResponses = new Array(requests.length).fill(null);
            for (let i = 0; i < graphResponse.responses.length; ++i) {
                const response = graphResponse.responses[i];
                // we create the request id by adding 1 to the index, so we place the response by subtracting one to match
                // the array of requests and make it easier to map them by index
                const responseId = parseInt(response.id, 10) - 1;
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
    }
    executeImpl() {
        Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Executing batch with ${this.requests.length} requests.`, 1 /* Info */);
        if (this.requests.length < 1) {
            Logger.write(`Resolving empty batch.`, 1 /* Info */);
            return Promise.resolve();
        }
        const client = new GraphHttpClient();
        // create a working copy of our requests
        const requests = this.requests.slice();
        // this is the root of our promise chain
        const promise = Promise.resolve();
        while (requests.length > 0) {
            const requestsChunk = requests.splice(0, this.maxRequests);
            const batchRequest = {
                requests: GraphBatch.formatRequests(requestsChunk),
            };
            const batchOptions = {
                body: jsS(batchRequest),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
            };
            Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Sending batch request.`, 1 /* Info */);
            client.fetch(this.batchUrl, batchOptions)
                .then(r => r.json())
                .then((j) => GraphBatch.parseResponse(requestsChunk, j))
                .then((parsedResponse) => {
                Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched requests.`, 1 /* Info */);
                parsedResponse.responses.reduce((chain, response, index) => {
                    const request = requestsChunk[index];
                    Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched request ${request.method} ${request.url}.`, 0 /* Verbose */);
                    return chain.then(_ => request.parser.parse(response).then(request.resolve).catch(request.reject));
                }, promise);
            });
        }
        return promise;
    }
}

let Invitations = class Invitations extends GraphQueryableCollection {
    /**
     * Create a new Invitation via invitation manager.
     *
     * @param invitedUserEmailAddress The email address of the user being invited.
     * @param inviteRedirectUrl The URL user should be redirected to once the invitation is redeemed.
     * @param additionalProperties A plain object collection of additional properties you want to set in the invitation
     */
    create(invitedUserEmailAddress, inviteRedirectUrl, additionalProperties = {}) {
        const postBody = extend({
            inviteRedirectUrl: inviteRedirectUrl,
            invitedUserEmailAddress: invitedUserEmailAddress,
        }, additionalProperties);
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
            };
        });
    }
};
Invitations = __decorate([
    defaultPath("invitations")
], Invitations);

let Subscriptions = class Subscriptions extends GraphQueryableCollection {
    getById(id) {
        return new Subscription(this, id);
    }
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
    add(changeType, notificationUrl, resource, expirationDateTime, additionalProperties = {}) {
        const postBody = extend({
            changeType: changeType,
            expirationDateTime: expirationDateTime,
            notificationUrl: notificationUrl,
            resource: resource,
        }, additionalProperties);
        return this.postCore({
            body: jsS(postBody),
        }).then(r => {
            return {
                data: r,
                subscription: this.getById(r.id),
            };
        });
    }
};
Subscriptions = __decorate([
    defaultPath("subscriptions")
], Subscriptions);
class Subscription extends GraphQueryableInstance {
    /**
     * Deletes this Subscription
     */
    delete() {
        return this.deleteCore();
    }
    /**
     * Update the properties of a Subscription
     *
     * @param properties Set of properties of this Subscription to update
     */
    update(properties) {
        return this.patchCore({
            body: jsS(properties),
        });
    }
}

class GraphRest extends GraphQueryable {
    constructor(baseUrl, path) {
        super(baseUrl, path);
    }
    get directoryObjects() {
        return new DirectoryObjects(this);
    }
    get groups() {
        return new Groups(this);
    }
    get teams() {
        return new Teams(this);
    }
    get me() {
        return new User(this, "me");
    }
    get planner() {
        return new Planner(this);
    }
    get users() {
        return new Users(this);
    }
    get invitations() {
        return new Invitations(this);
    }
    get subscriptions() {
        return new Subscriptions(this);
    }
    createBatch() {
        return new GraphBatch();
    }
    setup(config) {
        setup(config);
    }
}
let graph = new GraphRest("v1.0");

export { graph, GraphRest, GroupType, Group, Groups, GraphBatch, GraphQueryable, GraphQueryableCollection, GraphQueryableInstance, GraphQueryableSearchableCollection, Teams, Team, Channels, Channel, Apps, Tabs, Tab, GraphEndpoints, OneNote, Notebooks, Notebook, Sections, Section, Pages, Contacts, Contact, ContactFolders, ContactFolder, Drives, Drive, Root, DriveItems, DriveItem, Children, DriveList, Recent, SharedWithMe, DriveSearch, Thumbnails, Planner, Plans, Plan, Tasks, Task, Buckets, Bucket, Details, DirectoryObjectType, DirectoryObjects, DirectoryObject, Invitations, Subscriptions, Subscription };
//# sourceMappingURL=graph.js.map
