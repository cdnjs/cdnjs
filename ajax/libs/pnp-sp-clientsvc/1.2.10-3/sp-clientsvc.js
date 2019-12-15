/**
 * @license
 * v1.2.10-3
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { extend, objectDefinedNotNull, getAttrValueFromString, jsS, hOP, combine, getGUID, mergeHeaders, mergeOptions, getHashCode, stringIsNullOrEmpty } from '@pnp/common';
import { CachingOptions, Queryable, CachingParserWrapper, ODataBatch } from '@pnp/odata';
import { SPHttpClient, toAbsoluteUrl } from '@pnp/sp';
import { Logger } from '@pnp/logging';

function objectPath() {
    return `<ObjectPath Id="$$ID$$" ObjectPathId="$$PATH_ID$$" />`;
}
function identityQuery() {
    return `<ObjectIdentityQuery Id="$$ID$$" ObjectPathId="$$PATH_ID$$" />`;
}
function opQuery(selectProperties = null, childSelectProperties = null) {
    // this is fairly opaque behavior, but is the simplest way to convey the required information.
    // if selectProperties.length === 0 or null then select all
    // else select indicated properties
    // if childSelectProperties === null do not include that block
    // if childSelectProperties.length === 0 then select all
    // else select indicated properties
    const builder = [];
    builder.push(`<Query Id="$$ID$$" ObjectPathId="$$PATH_ID$$">`);
    if (selectProperties === null || selectProperties.length < 1) {
        builder.push(`<Query SelectAllProperties="true" >`);
        builder.push(`<Properties />`);
        builder.push(`</Query >`);
    }
    else {
        builder.push(`<Query SelectAllProperties="false" >`);
        builder.push(`<Properties>`);
        [].push.apply(builder, selectProperties.map(p => `<Property Name="${p}" SelectAll="true" />`));
        builder.push(`</Properties>`);
        builder.push(`</Query >`);
    }
    if (childSelectProperties !== null) {
        if (childSelectProperties.length < 1) {
            builder.push(`<ChildItemQuery SelectAllProperties="true" >`);
            builder.push(`<Properties />`);
            builder.push(`</ChildItemQuery >`);
        }
        else {
            builder.push(`<ChildItemQuery SelectAllProperties="false" >`);
            builder.push(`<Properties>`);
            [].push.apply(builder, childSelectProperties.map(p => `<Property Name="${p}" SelectAll="true" />`));
            builder.push(`</Properties>`);
            builder.push(`</ChildItemQuery >`);
        }
    }
    builder.push(`</Query >`);
    return builder.join("");
}
function setProperty(name, type, value) {
    const builder = [];
    builder.push(`<SetProperty Id="$$ID$$" ObjectPathId="$$PATH_ID$$" Name="${name}">`);
    builder.push(`<Parameter Type="${type}">${value}</Parameter>`);
    builder.push(`</SetProperty>`);
    return builder.join("");
}
function methodAction(name, params) {
    const builder = [];
    builder.push(`<Method Id="$$ID$$" ObjectPathId="$$PATH_ID$$" Name="${name}">`);
    if (params !== null) {
        const arrParams = params.toArray();
        if (arrParams.length < 1) {
            builder.push(`<Parameters />`);
        }
        else {
            builder.push(`<Parameters>`);
            [].push.apply(builder, arrParams.map(p => `<Parameter Type="${p.type}">${p.value}</Parameter>`));
            builder.push(`</Parameters>`);
        }
    }
    builder.push("</Method>");
    return builder.join("");
}
function objectProperties(o) {
    return Object.getOwnPropertyNames(o).map((name) => {
        const value = o[name];
        if (typeof value === "boolean") {
            return setProperty(name, "Boolean", `${value}`);
        }
        else if (typeof value === "number") {
            return setProperty(name, "Number", `${value}`);
        }
        else if (typeof value === "string") {
            return setProperty(name, "String", `${value}`);
        }
        return "";
    }, []);
}

function property(name, ...actions) {
    return new ObjectPath(`<Property Id="$$ID$$" ParentId="$$PARENT_ID$$" Name="${name}" />`, actions);
}
function staticMethod(name, typeId, ...actions) {
    return new ObjectPath(`<StaticMethod Id="$$ID$$" Name="${name}" TypeId="${typeId}" />`, actions);
}
function staticProperty(name, typeId, ...actions) {
    return new ObjectPath(`<StaticProperty Id="$$ID$$" Name="${name}" TypeId="${typeId}" />`, actions);
}
function objConstructor(typeId, ...actions) {
    return new ObjectPath(`<Constructor Id="$$ID$$" TypeId="${typeId}" />`, actions);
}
/**
 * Used to build parameters when calling methods
 */
class MethodParams {
    constructor(_p = []) {
        this._p = _p;
    }
    static build(initValues = []) {
        const params = new MethodParams();
        [].push.apply(params._p, initValues);
        return params;
    }
    string(value) {
        return this.a("String", value);
    }
    number(value) {
        return this.a("Number", value.toString());
    }
    boolean(value) {
        return this.a("Boolean", value.toString());
    }
    strArray(values) {
        return this.a("Array", values.map(v => `<Object Type="String">${v}</Object>`).join(""));
    }
    objectPath(inputIndex) {
        return this.a("ObjectPath", inputIndex.toString());
    }
    toArray() {
        return this._p;
    }
    a(type, value) {
        this._p.push({ type, value });
        return this;
    }
}
function method(name, params, ...actions) {
    const builder = [];
    builder.push(`<Method Id="$$ID$$" ParentId="$$PARENT_ID$$" Name="${name}">`);
    if (params !== null) {
        const arrParams = params.toArray();
        if (arrParams.length < 1) {
            builder.push(`<Parameters />`);
        }
        else {
            builder.push(`<Parameters>`);
            [].push.apply(builder, arrParams.map(p => {
                if (p.type === "ObjectPath") {
                    return `<Parameter ObjectPathId="$$OP_PARAM_ID_${p.value}$$" />`;
                }
                return `<Parameter Type="${p.type}">${p.value}</Parameter>`;
            }));
            builder.push(`</Parameters>`);
        }
    }
    builder.push("</Method>");
    return new ObjectPath(builder.join(""), actions);
}

/**
 * Transforms an array of object paths into a request xml body. Does not do placeholder substitutions.
 *
 * @param objectPaths The object paths for which we want to generate a body
 */
function writeObjectPathBody(objectPaths) {
    const actions = [];
    const paths = [];
    objectPaths.forEach(op => {
        paths.push(op.path);
        actions.push(...op.actions);
    });
    // create our xml payload
    return [
        `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="PnPjs">`,
        "<Actions>",
        actions.join(""),
        "</Actions>",
        "<ObjectPaths>",
        paths.join(""),
        "</ObjectPaths>",
        "</Request>",
    ].join("");
}

/**
 * Represents an ObjectPath used when querying ProcessQuery
 */
class ObjectPath {
    constructor(path, actions = [], id = -1, replaceAfter = []) {
        this.path = path;
        this.actions = actions;
        this.id = id;
        this.replaceAfter = replaceAfter;
    }
}
/**
 * Replaces all found instance of the $$ID$$ placeholder in the supplied xml string
 *
 * @param id New value to be insterted
 * @param xml The existing xml fragment in which the replace should occur
 */
function opSetId(id, xml) {
    return xml.replace(/\$\$ID\$\$/g, id);
}
/**
 * Replaces all found instance of the $$PATH_ID$$ placeholder in the supplied xml string
 *
 * @param id New value to be insterted
 * @param xml The existing xml fragment in which the replace should occur
 */
function opSetPathId(id, xml) {
    return xml.replace(/\$\$PATH_ID\$\$/g, id);
}
/**
 * Replaces all found instance of the $$PARENT_ID$$ placeholder in the supplied xml string
 *
 * @param id New value to be insterted
 * @param xml The existing xml fragment in which the replace should occur
 */
function opSetParentId(id, xml) {
    return xml.replace(/\$\$PARENT_ID\$\$/g, id);
}
/**
 * Replaces all found instance of the $$OP_PARAM_ID$$ placeholder in the supplied xml string
 *
 * @param map A mapping where [index] = replaced_object_path_id
 * @param xml The existing xml fragment in which the replace should occur
 * @param indexMapper Used when creating batches, not meant for direct use external to this library
 */
function opSetPathParamId(map, xml, indexMapper = (n) => n) {
    // this approach works because input params must come before the things that need them
    // meaning the right id will always be in the map
    const matches = /\$\$OP_PARAM_ID_(\d+)\$\$/ig.exec(xml);
    if (matches !== null) {
        for (let i = 1; i < matches.length; i++) {
            const index = parseInt(matches[i], 10);
            const regex = new RegExp(`\\$\\$OP_PARAM_ID_${index}\\$\\$`, "ig");
            xml = xml.replace(regex, map[indexMapper(index)].toString());
        }
    }
    return xml;
}
/**
 * Represents a collection of IObjectPaths
 */
class ObjectPathQueue {
    constructor(_paths = [], _relationships = {}) {
        this._paths = _paths;
        this._relationships = _relationships;
        this._contextIndex = -1;
        this._siteIndex = -1;
        this._webIndex = -1;
    }
    /**
     * Adds an object path to the queue
     *
     * @param op The action to add
     * @returns The index of the added object path
     */
    add(op) {
        this.dirty();
        this._paths.push(op);
        return this.lastIndex;
    }
    addChildRelationship(parentIndex, childIndex) {
        if (objectDefinedNotNull(this._relationships[`_${parentIndex}`])) {
            this._relationships[`_${parentIndex}`].push(childIndex);
        }
        else {
            this._relationships[`_${parentIndex}`] = [childIndex];
        }
    }
    getChildRelationship(parentIndex) {
        if (objectDefinedNotNull(this._relationships[`_${parentIndex}`])) {
            return this._relationships[`_${parentIndex}`];
        }
        else {
            return [];
        }
    }
    getChildRelationships() {
        return this._relationships;
    }
    /**
     * Appends an action to the supplied IObjectPath, replacing placeholders
     *
     * @param op IObjectPath to which the action will be appended
     * @param action The action to append
     */
    appendAction(op, action) {
        this.dirty();
        op.actions.push(action);
        return this;
    }
    /**
     * Appends an action to the last IObjectPath in the collection
     *
     * @param action
     */
    appendActionToLast(action) {
        return this.appendAction(this.last, action);
    }
    /**
     * Creates a linked copy of this ObjectPathQueue
     */
    copy() {
        const copy = new ObjectPathQueue(this.toArray(), extend({}, this._relationships));
        copy._contextIndex = this._contextIndex;
        copy._siteIndex = this._siteIndex;
        copy._webIndex = this._webIndex;
        return copy;
    }
    /**
     * Creates an independent clone of this ObjectPathQueue
     */
    clone() {
        const clone = new ObjectPathQueue(this.toArray().map(p => Object.assign({}, p)), extend({}, this._relationships));
        clone._contextIndex = this._contextIndex;
        clone._siteIndex = this._siteIndex;
        clone._webIndex = this._webIndex;
        return clone;
    }
    /**
     * Gets a copy of this instance's paths
     */
    toArray() {
        return this._paths.slice(0);
    }
    /**
     * The last IObjectPath instance added to this collection
     */
    get last() {
        if (this._paths.length < 1) {
            return null;
        }
        return this._paths[this.lastIndex];
    }
    /**
     * Index of the last IObjectPath added to the queue
     */
    get lastIndex() {
        return this._paths.length - 1;
    }
    /**
     * Gets the index of the current site in the queue
     */
    get siteIndex() {
        if (this._siteIndex < 0) {
            // this needs to be here in case we create it
            const contextIndex = this.contextIndex;
            this._siteIndex = this.add(property("Site", 
            // actions
            objectPath()));
            this.addChildRelationship(contextIndex, this._siteIndex);
        }
        return this._siteIndex;
    }
    /**
     * Gets the index of the current web in the queue
     */
    get webIndex() {
        if (this._webIndex < 0) {
            // this needs to be here in case we create it
            const contextIndex = this.contextIndex;
            this._webIndex = this.add(property("Web", 
            // actions
            objectPath()));
            this.addChildRelationship(contextIndex, this._webIndex);
        }
        return this._webIndex;
    }
    /**
     * Gets the index of the Current context in the queue, can be used to establish parent -> child rels
     */
    get contextIndex() {
        if (this._contextIndex < 0) {
            this._contextIndex = this.add(staticProperty("Current", "{3747adcd-a3c3-41b9-bfab-4a64dd2f1e0a}", 
            // actions
            objectPath()));
        }
        return this._contextIndex;
    }
    toBody() {
        if (objectDefinedNotNull(this._xml)) {
            return this._xml;
        }
        // create our xml payload
        this._xml = writeObjectPathBody(this.toIndexedTree());
        return this._xml;
    }
    /**
     * Conducts the string replacements for id, parent id, and path id
     *
     * @returns The tree with all string replacements made
     */
    toIndexedTree() {
        let builderIndex = -1;
        let lastOpId = -1;
        const idIndexMap = [];
        return this.toArray().map((op, index, arr) => {
            const opId = ++builderIndex;
            // track the array index => opId relationship
            idIndexMap.push(opId);
            // do path replacements
            op.path = opSetPathParamId(idIndexMap, opSetId(opId.toString(), op.path));
            if (lastOpId >= 0) {
                // if we have a parent do the replace
                op.path = opSetParentId(lastOpId.toString(), op.path);
            }
            // rewrite actions with placeholders replaced
            op.actions = op.actions.map(a => {
                const actionId = ++builderIndex;
                return opSetId(actionId.toString(), opSetPathId(opId.toString(), a));
            });
            // handle any specific child relationships
            this.getChildRelationship(index).forEach(childIndex => {
                // set the parent id for our non-immediate children, thus removing the token so it isn't overwritten
                arr[childIndex].path = opSetParentId(opId.toString(), arr[childIndex].path);
            });
            // and remember our last object path id for the parent replace above
            lastOpId = opId;
            return op;
        });
    }
    /**
     * Dirties this queue clearing any cached data
     */
    dirty() {
        this._xml = null;
    }
}

/**
 * Used within the request pipeline to parse ProcessQuery results
 */
class ProcessQueryParser {
    constructor(op) {
        this.op = op;
    }
    /**
     * Parses the response checking for errors
     *
     * @param r Response object
     */
    parse(r) {
        return r.text().then(t => {
            if (!r.ok) {
                throw Error(t);
            }
            try {
                return JSON.parse(t);
            }
            catch (e) {
                // special case in ProcessQuery where we got an error back, but it is not in json format
                throw Error(t);
            }
        }).then((parsed) => {
            // here we need to check for an error body
            if (parsed.length > 0 && hOP(parsed[0], "ErrorInfo") && parsed[0].ErrorInfo !== null) {
                throw Error(jsS(parsed[0].ErrorInfo));
            }
            return this.findResult(parsed);
        });
    }
    findResult(json) {
        for (let i = 0; i < this.op.actions.length; i++) {
            const a = this.op.actions[i];
            // let's see if the result is null based on the ObjectPath action, if it exists
            // <ObjectPath Id="8" ObjectPathId="7" />
            if (/^<ObjectPath /i.test(a)) {
                const result = this.getParsedResultById(json, parseInt(getAttrValueFromString(a, "Id"), 10));
                if (!result || (result && result.IsNull)) {
                    return Promise.resolve(null);
                }
            }
            // let's see if we have a query result
            // <Query Id="5" ObjectPathId = "3" >
            if (/^<Query /i.test(a)) {
                const result = this.getParsedResultById(json, parseInt(getAttrValueFromString(a, "Id"), 10));
                if (result && hOP(result, "_Child_Items_")) {
                    // this is a collection result
                    /* tslint:disable:no-string-literal */
                    return Promise.resolve(result["_Child_Items_"]);
                    /* tslint:enable:no-string-literal */
                }
                else {
                    // this is an instance result
                    return Promise.resolve(result);
                }
            }
            // this is an invokeMethodAction so the last method action corresponds to our result
            if (i === (this.op.actions.length - 1) && /^<Method /i.test(a)) {
                return Promise.resolve(this.getParsedResultById(json, parseInt(getAttrValueFromString(a, "Id"), 10)));
            }
        }
        // no result could be found so we are effectively returning void
        // issue is we really don't know if we should be returning void (a method invocation with a void return) or
        // if we just didn't find something above. We will let downstream things worry about that
    }
    /**
     * Locates a result by ObjectPath id
     *
     * @param parsed the parsed JSON body from the response
     * @param id The ObjectPath id whose result we want
     */
    getParsedResultById(parsed, id) {
        for (let i = 0; i < parsed.length; i++) {
            if (parsed[i] === id) {
                return parsed[i + 1];
            }
        }
        return null;
    }
}

const ProcessQueryPath = "_vti_bin/client.svc/ProcessQuery";
class ClientSvcQueryable extends Queryable {
    constructor(parent = "", _objectPaths = null) {
        super();
        this._objectPaths = _objectPaths;
        this._selects = [];
        this._batch = null;
        this._batchDependency = null;
        if (typeof parent === "string") {
            // we assume the parent here is an absolute url to a web
            this._parentUrl = parent;
            this._url = combine(parent.replace(ProcessQueryPath, ""), ProcessQueryPath);
            if (!objectDefinedNotNull(this._objectPaths)) {
                this._objectPaths = new ObjectPathQueue();
            }
        }
        else {
            this._parentUrl = parent._parentUrl;
            this._url = combine(parent._parentUrl, ProcessQueryPath);
            if (!objectDefinedNotNull(_objectPaths)) {
                this._objectPaths = parent._objectPaths.clone();
            }
            this.configureFrom(parent);
        }
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects) {
        [].push.apply(this._selects, selects);
        return this;
    }
    /**
     * Adds this query to the supplied batch
     *
     */
    inBatch(batch) {
        if (this.batch !== null) {
            throw Error("This query is already part of a batch.");
        }
        if (objectDefinedNotNull(batch)) {
            this._batch = batch;
            this._batchDependency = batch.addDependency();
        }
        return this;
    }
    /**
     * Gets the full url with query information
     *
     */
    toUrlAndQuery() {
        return `${super.toUrl()}?${Array.from(this.query).map((v) => v[0] + "=" + v[1]).join("&")}`;
    }
    getSelects() {
        return objectDefinedNotNull(this._selects) ? this._selects : [];
    }
    /**
     * Gets a child object based on this instance's paths and the supplied paramters
     *
     * @param factory Instance factory of the child type
     * @param methodName Name of the method used to load the child
     * @param params Parameters required by the method to load the child
     */
    getChild(factory, methodName, params) {
        const objectPaths = this._objectPaths.copy();
        objectPaths.add(method(methodName, params, 
        // actions
        objectPath()));
        return new factory(this, objectPaths);
    }
    /**
     * Gets a property of the current instance
     *
     * @param factory Instance factory of the child type
     * @param propertyName Name of the property to load
     */
    getChildProperty(factory, propertyName) {
        const objectPaths = this._objectPaths.copy();
        objectPaths.add(property(propertyName));
        return new factory(this, objectPaths);
    }
    /**
     * Sends a request
     *
     * @param op
     * @param options
     * @param parser
     */
    send(objectPaths, options = {}, parser = null) {
        // here we need to create a clone because all the string indexes and references
        // will be updated and all need to relate for this operation being sent. The parser
        // and the postCore method need to share an independent value of the objectPaths
        // See for https://github.com/pnp/pnpjs/issues/419 for details
        const clonedOps = objectPaths.clone();
        if (!objectDefinedNotNull(parser)) {
            // we assume here that we want to return for this index path
            parser = new ProcessQueryParser(clonedOps.last);
        }
        if (this.hasBatch) {
            // this is using the options variable to pass some extra information downstream to the batch
            options = extend(options, {
                clientsvc_ObjectPaths: clonedOps,
            });
        }
        else {
            if (!hOP(options, "body")) {
                options = extend(options, {
                    body: clonedOps.toBody(),
                });
            }
        }
        return super.postCore(options, parser);
    }
    /**
     * Sends the request, merging the result data with a new instance of factory
     */
    sendGet(factory) {
        const ops = this._objectPaths.copy().appendActionToLast(opQuery(this.getSelects()));
        return this.send(ops).then(r => extend(new factory(this), r));
    }
    /**
     * Sends the request, merging the result data array with a new instances of factory
     */
    sendGetCollection(factory) {
        const ops = this._objectPaths.copy().appendActionToLast(opQuery([], this.getSelects()));
        return this.send(ops).then(r => r.map(d => extend(factory(d), d)));
    }
    /**
     * Invokes the specified method on the server and returns the result
     *
     * @param methodName Name of the method to invoke
     * @param params Method parameters
     * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
     */
    invokeMethod(methodName, params = null, ...actions) {
        return this.invokeMethodImpl(methodName, params, actions, opQuery([], null));
    }
    /**
     * Invokes a method action that returns a single result and does not have an associated query (ex: GetDescription on Term)
     *
     * @param methodName Name of the method to invoke
     * @param params Method parameters
     * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
     */
    invokeMethodAction(methodName, params = null, ...actions) {
        return this.invokeMethodImpl(methodName, params, actions, null, true);
    }
    /**
     * Invokes the specified non-query method on the server
     *
     * @param methodName Name of the method to invoke
     * @param params Method parameters
     * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
     */
    invokeNonQuery(methodName, params = null, ...actions) {
        // by definition we are not returning anything from these calls so we should not be caching the results
        this._useCaching = false;
        return this.invokeMethodImpl(methodName, params, actions, null, true);
    }
    /**
     * Invokes the specified method on the server and returns the resulting collection
     *
     * @param methodName Name of the method to invoke
     * @param params Method parameters
     * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
     */
    invokeMethodCollection(methodName, params = null, ...actions) {
        return this.invokeMethodImpl(methodName, params, actions, opQuery([], []));
    }
    /**
     * Updates this instance, returning a copy merged with the updated data after the update
     *
     * @param properties Plain object of the properties and values to update
     * @param factory Factory method use to create a new instance of FactoryType
     */
    invokeUpdate(properties, factory) {
        const ops = this._objectPaths.copy();
        // append setting all the properties to this instance
        objectProperties(properties).map(a => ops.appendActionToLast(a));
        ops.appendActionToLast(opQuery([], null));
        return this.send(ops).then(r => extend(new factory(this), r));
    }
    /**
     * Converts the current instance to a request context
     *
     * @param verb The request verb
     * @param options The set of supplied request options
     * @param parser The supplied ODataParser instance
     * @param pipeline Optional request processing pipeline
     */
    toRequestContext(verb, options, parser, pipeline) {
        return toAbsoluteUrl(this.toUrlAndQuery()).then(url => {
            mergeOptions(options, this._options);
            const headers = new Headers();
            mergeHeaders(headers, options.headers);
            mergeHeaders(headers, {
                "accept": "*/*",
                "content-type": "text/xml",
            });
            options = extend(options, { headers });
            // we need to do some special cache handling to ensure we have a good key
            if (this._useCaching) {
                let keyStr = options.body;
                if (stringIsNullOrEmpty(keyStr)) {
                    if (hOP(options, "clientsvc_ObjectPaths")) {
                        // if we are using caching and batching together we need to create our string from the paths stored for the
                        // batching operation (see: https://github.com/pnp/pnpjs/issues/449) but not update the ones passed to
                        // the batch as they will be indexed during the batch creation process
                        keyStr = options.clientsvc_ObjectPaths.clone().toBody();
                    }
                    else {
                        // this case shouldn't happen
                        keyStr = "";
                    }
                }
                // because all the requests use the same url they would collide in the cache we use a special key
                const cacheKey = `PnPjs.ProcessQueryClient(${getHashCode(keyStr)})`;
                if (objectDefinedNotNull(this._cachingOptions)) {
                    // if our key ends in the ProcessQuery url we overwrite it
                    if (/\/client\.svc\/ProcessQuery\?$/i.test(this._cachingOptions.key)) {
                        this._cachingOptions.key = cacheKey;
                    }
                }
                else {
                    this._cachingOptions = new CachingOptions(cacheKey);
                }
            }
            const dependencyDispose = this.hasBatch ? this._batchDependency : () => { return; };
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
                requestId: getGUID(),
                verb: verb,
            };
            return context;
        });
    }
    /**
     * Blocks a batch call from occuring, MUST be cleared by calling the returned function
    */
    addBatchDependency() {
        if (this._batch !== null) {
            return this._batch.addDependency();
        }
        return () => null;
    }
    /**
     * Indicates if the current query has a batch associated
     *
     */
    get hasBatch() {
        return objectDefinedNotNull(this._batch);
    }
    /**
     * The batch currently associated with this query or null
     *
     */
    get batch() {
        return this.hasBatch ? this._batch : null;
    }
    /**
     * Executes the actual invoke method call
     *
     * @param methodName Name of the method to invoke
     * @param params Method parameters
     * @param queryAction Specifies the query action to take
     */
    invokeMethodImpl(methodName, params, actions, queryAction, isAction = false) {
        const ops = this._objectPaths.copy();
        if (isAction) {
            ops.appendActionToLast(methodAction(methodName, params));
        }
        else {
            ops.add(method(methodName, params, ...[objectPath(), ...actions, queryAction]));
        }
        return this.send(ops);
    }
}

/**
 * Implements ODataBatch for use with the ObjectPath framework
 */
class ObjectPathBatch extends ODataBatch {
    constructor(parentUrl, _batchId) {
        super(_batchId);
        this.parentUrl = parentUrl;
    }
    executeImpl() {
        // if we don't have any requests, don't bother sending anything
        // this could be due to caching further upstream, or just an empty batch
        if (this.requests.length < 1) {
            Logger.write(`Resolving empty batch.`, 1 /* Info */);
            return Promise.resolve();
        }
        const executor = new BatchExecutor(this.parentUrl, this.batchId);
        executor.appendRequests(this.requests);
        return executor.execute();
    }
}
class BatchExecutor extends ClientSvcQueryable {
    constructor(parentUrl, batchId) {
        super(parentUrl);
        this.batchId = batchId;
        this._requests = [];
        this._builderIndex = 1;
        // we add our session object path and hard code in the IDs so we can reference it
        const method$$1 = staticMethod("GetTaxonomySession", "{981cbc68-9edc-4f8d-872f-71146fcbb84f}");
        method$$1.path = opSetId("0", method$$1.path);
        method$$1.actions.push(opSetId("1", opSetPathId("0", objectPath())));
        this._objectPaths.add(method$$1);
    }
    appendRequests(requests) {
        requests.forEach(request => {
            // grab the special property we added to options when we created the batch info
            const pathQueue = request.options.clientsvc_ObjectPaths;
            let paths = pathQueue.toArray();
            // getChildRelationships
            if (paths.length < 0) {
                return;
            }
            let indexMappingFunction = (n) => n;
            if (/GetTaxonomySession/i.test(paths[0].path)) {
                // drop the first thing as it is a get session object path, which we add once for the entire batch
                paths = paths.slice(1);
                // replace the next item's parent id with 0, which will be the id of the session call at the root of this request
                paths[0].path = opSetParentId("0", paths[0].path);
                indexMappingFunction = (n) => n - 1;
            }
            let lastOpId = -1;
            const idIndexMap = [];
            paths.map((op, index, arr) => {
                // rewrite the path string
                const opId = ++this._builderIndex;
                // track the array index => opId relationship
                idIndexMap.push(opId);
                let path = opSetPathParamId(idIndexMap, opSetId(opId.toString(), op.path), indexMappingFunction);
                if (lastOpId >= 0) {
                    path = opSetParentId(lastOpId.toString(), path);
                }
                // rewrite actions with placeholders replaced
                const opActions = op.actions.map(a => {
                    const actionId = ++this._builderIndex;
                    return opSetId(actionId.toString(), opSetPathId(opId.toString(), a));
                });
                // handle any specific child relationships
                // the childIndex is reduced by 1 because we are removing the Session Path
                pathQueue.getChildRelationship(index + 1).map(i => i - 1).forEach(childIndex => {
                    // set the parent id for our non-immediate children
                    arr[childIndex].path = opSetParentId(opId.toString(), arr[childIndex].path);
                });
                // and remember our last object path id for the parent replace above
                lastOpId = opId;
                // return our now substituted path and actions as a new object path instance
                return new ObjectPath(path, opActions);
            }).forEach(op => this._objectPaths.add(op));
            // get this once
            const obPaths = this._objectPaths.toArray();
            // create a new parser to handle finding the result based on the path
            const parser = new ProcessQueryParser(obPaths[obPaths.length - 1]);
            if (request.parser instanceof CachingParserWrapper) {
                // handle special case of caching
                request.parser = new ProcessQueryCachingParserWrapper(parser, request.parser);
            }
            else {
                request.parser = parser;
            }
            // add the request to our batch requests
            this._requests.push(request);
            // remove the temp property
            delete request.options.clientsvc_ObjectPaths;
        });
    }
    execute() {
        Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Executing batch with ${this._requests.length} requests.`, 1 /* Info */);
        // create our request body from all the merged object paths
        const options = {
            body: writeObjectPathBody(this._objectPaths.toArray()),
        };
        Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Sending batch request.`, 1 /* Info */);
        // send the batch
        return super.postCore(options, new BatchParser()).then((rawResponse) => {
            Logger.write(`[${this.batchId}] (${(new Date()).getTime()}) Resolving batched requests.`, 1 /* Info */);
            return this._requests.reduce((chain, request) => {
                Logger.write(`[${request.id}] (${(new Date()).getTime()}) Resolving request in batch ${this.batchId}.`, 1 /* Info */);
                return chain.then(_ => request.parser.findResult(rawResponse).then(request.resolve).catch(request.reject));
            }, Promise.resolve());
        });
    }
}
/**
 * Used to return the raw results from parsing the batch
 */
class BatchParser extends ProcessQueryParser {
    constructor() {
        super(null);
    }
    findResult(json) {
        // we leave it to the individual request parsers to find their results in the raw json body
        return json;
    }
}
/**
 * Handles processing batched results that are also cached
 */
class ProcessQueryCachingParserWrapper extends CachingParserWrapper {
    constructor(parser, wrapper) {
        super(parser, wrapper.cacheOptions);
    }
    findResult(json) {
        return this.parser.findResult(json).then((d) => this.cacheData(d));
    }
}

export { ObjectPathBatch, ClientSvcQueryable, ObjectPath, opSetId, opSetPathId, opSetParentId, opSetPathParamId, ObjectPathQueue, objectPath, identityQuery, opQuery, setProperty, methodAction, objectProperties, property, staticMethod, staticProperty, objConstructor, MethodParams, method, ProcessQueryParser, writeObjectPathBody };
//# sourceMappingURL=sp-clientsvc.js.map
