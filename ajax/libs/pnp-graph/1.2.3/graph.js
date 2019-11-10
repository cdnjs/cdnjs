/**
@license
 * @pnp/graph v1.2.3 - pnp - provides functionality to query the Microsoft Graph
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { RuntimeConfig, AdalClient, extend, mergeHeaders, getCtxCallback, combine, isUrlAbsolute, getGUID, jsS, objectDefinedNotNull } from '@pnp/common';
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
        let clone = new factory(this, additionalPath);
        clone.configure(this._options);
        // TODO:: include batching info in clone
        if (includeBatch) {
            clone = clone.inBatch(this._batch);
        }
        return clone;
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
        // TODO:: add batch support
        return Promise.resolve({
            batch: this.batch,
            batchDependency: () => void (0),
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
        this.query.set("$top", num.toString());
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
}

class Members extends GraphQueryableCollection {
    constructor(baseUrl, path = "members") {
        super(baseUrl, path);
    }
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: https://graph.microsoft.com/v1.0/directoryObjects/${id})
     */
    add(id) {
        return this.clone(Members, "$ref").postCore({
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
}
class Member extends GraphQueryableInstance {
}
class Owners extends Members {
    constructor(baseUrl, path = "owners") {
        super(baseUrl, path);
    }
}

class Calendar extends GraphQueryableInstance {
    get events() {
        return new Events(this);
    }
}
class Events extends GraphQueryableCollection {
    constructor(baseUrl, path = "events") {
        super(baseUrl, path);
    }
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
}
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

class Attachments extends GraphQueryableCollection {
    constructor(baseUrl, path = "attachments") {
        super(baseUrl, path);
    }
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
}
class Attachment extends GraphQueryableInstance {
}

class Conversations extends GraphQueryableCollection {
    constructor(baseUrl, path = "conversations") {
        super(baseUrl, path);
    }
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
}
class Threads extends GraphQueryableCollection {
    constructor(baseUrl, path = "threads") {
        super(baseUrl, path);
    }
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
}
class Posts extends GraphQueryableCollection {
    constructor(baseUrl, path = "posts") {
        super(baseUrl, path);
    }
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
}
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

class Plans extends GraphQueryableCollection {
    constructor(baseUrl, path = "planner/plans") {
        super(baseUrl, path);
    }
    /**
     * Gets a plan from this collection by id
     *
     * @param id Plan's id
     */
    getById(id) {
        return new Plan(this, id);
    }
}
class Plan extends GraphQueryableInstance {
}

class Photo extends GraphQueryableInstance {
    constructor(baseUrl, path = "photo") {
        super(baseUrl, path);
    }
    /**
     * Gets the image bytes as a blob (browser)
     */
    getBlob() {
        return this.clone(Photo, "$value", false).get(new BlobParser());
    }
    /**
     * Gets the image file byets as a Buffer (node.js)
     */
    getBuffer() {
        return this.clone(Photo, "$value", false).get(new BufferParser());
    }
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    setContent(content) {
        return this.clone(Photo, "$value", false).patchCore({
            body: content,
        });
    }
}

class Teams {
    /**
     * Creates a new team and associated Group with the given information
     */
    create(name, description = "", teamProperties = {}) {
        const groupProps = description && description.length > 0 ? { description: description } : {};
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
}
/**
 * Represents a Microsoft Team
 */
class Team extends GraphQueryableInstance {
    constructor(baseUrl, path = "team") {
        super(baseUrl, path);
    }
    /**
     * Updates this team instance's properties
     *
     * @param properties The set of properties to update
     */
    // TODO:: update properties to be typed once type is available in graph-types
    update(properties) {
        return this.clone(Team, "").setEndpoint(GraphEndpoints.Beta).patchCore({
            body: jsS(properties),
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
        return this.clone(Team, "").setEndpoint(GraphEndpoints.Beta).getCore(parser, options);
    }
}

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
class Groups extends GraphQueryableCollection {
    constructor(baseUrl, path = "groups") {
        super(baseUrl, path);
    }
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
}
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
        return new Plans(this);
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
        return this.clone(Group, "team").setEndpoint(GraphEndpoints.Beta).putCore({
            body: jsS(properties),
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

/**
 * Represents a onenote entity
 */
class OneNote extends GraphQueryableInstance {
    constructor(baseUrl, path = "onenote") {
        super(baseUrl, path);
    }
    get notebooks() {
        return new Notebooks(this);
    }
    get sections() {
        return new Sections(this);
    }
    get pages() {
        return new Pages(this);
    }
}
/**
 * Describes a collection of Notebook objects
 *
 */
class Notebooks extends GraphQueryableCollection {
    constructor(baseUrl, path = "notebooks") {
        super(baseUrl, path);
    }
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
}
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
class Sections extends GraphQueryableCollection {
    constructor(baseUrl, path = "sections") {
        super(baseUrl, path);
    }
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
}
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
class Pages extends GraphQueryableCollection {
    constructor(baseUrl, path = "pages") {
        super(baseUrl, path);
    }
}

class Contacts extends GraphQueryableCollection {
    constructor(baseUrl, path = "contacts") {
        super(baseUrl, path);
    }
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
}
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
class ContactFolders extends GraphQueryableCollection {
    constructor(baseUrl, path = "contactFolders") {
        super(baseUrl, path);
    }
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
}
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
        return new ChildFolders(this);
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
class ChildFolders extends GraphQueryableInstance {
    constructor(baseUrl, path = "childFolders") {
        super(baseUrl, path);
    }
    getById(id) {
        return new ContactFolder(this, id);
    }
    /**
     * Create a new Child Folder in Contact folder.
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
}

class Me extends GraphQueryableInstance {
    constructor(baseUrl, path = "me") {
        super(baseUrl, path);
    }
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
     * The Contact Folders associated with the user
     */
    get contactFolders() {
        return new ContactFolders(this);
    }
}

/**
 * Describes a collection of Users objects
 *
 */
class Users extends GraphQueryableCollection {
    constructor(baseUrl, path = "users") {
        super(baseUrl, path);
    }
    /**
     * Gets a user from the collection using the specified id
     *
     * @param id Id of the user to get from this collection
     */
    getById(id) {
        return new User(this, id);
    }
}
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
    * The Contact Folders associated with the user
    */
    get contactFolders() {
        return new ContactFolders(this);
    }
}

class GraphRest extends GraphQueryable {
    constructor(baseUrl, path) {
        super(baseUrl, path);
    }
    get groups() {
        return new Groups(this);
    }
    get teams() {
        return new Teams();
    }
    get me() {
        return new Me(this);
    }
    get users() {
        return new Users(this);
    }
    setup(config) {
        setup(config);
    }
}
let graph = new GraphRest("v1.0");

class GraphBatch extends ODataBatch {
    constructor(batchUrl = "https://graph.microsoft.com/beta/$batch") {
        super();
        this.batchUrl = batchUrl;
    }
    executeImpl() {
        Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Executing batch with ${this.requests.length} requests.`, 1 /* Info */);
        const client = new GraphHttpClient();
        const batchRequest = {
            requests: this.formatRequests(),
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
        // let nextLinkFlag = false;
        return client.fetch(this.batchUrl, batchOptions)
            .then(r => r.json())
            .then(this._parseResponse)
            .then((parsedResponse) => {
            Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched requests.`, 1 /* Info */);
            return parsedResponse.responses.reduce((chain, response, index) => {
                const request = this.requests[index];
                if (objectDefinedNotNull(request)) {
                    Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched request ${request.method} ${request.url}.`, 0 /* Verbose */);
                    return chain.then(_ => request.parser.parse(response).then(request.resolve).catch(request.reject));
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
    }
    formatRequests() {
        return this.requests.map((reqInfo, index) => {
            let requestFragment = {
                id: `${++index}`,
                method: reqInfo.method,
                url: reqInfo.url,
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
    _parseResponse(graphResponse) {
        return new Promise((resolve) => {
            const parsedResponses = new Array(this.requests.length).fill(null);
            for (let i = 0; i < graphResponse.responses.length; ++i) {
                const response = graphResponse.responses[i];
                // we create the request id by adding 1 to the index, so we place the response by subtracting one to match
                // the array of requests and make it easier to map them by index
                const responseId = parseInt(response.id, 10) - 1;
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
    }
}

export { graph, GraphRest, GroupType, Group, Groups, GraphBatch, GraphQueryable, GraphQueryableCollection, GraphQueryableInstance, GraphQueryableSearchableCollection, Teams, Team, GraphEndpoints, OneNote, Notebooks, Notebook, Sections, Section, Pages };
//# sourceMappingURL=graph.js.map
