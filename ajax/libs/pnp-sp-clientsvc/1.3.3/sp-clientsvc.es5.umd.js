/**
 * @license
 * v1.3.3
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pnp/common'), require('@pnp/odata'), require('@pnp/sp'), require('@pnp/logging')) :
    typeof define === 'function' && define.amd ? define(['exports', '@pnp/common', '@pnp/odata', '@pnp/sp', '@pnp/logging'], factory) :
    (factory((global.pnp = global.pnp || {}, global.pnp['sp-clientsvc'] = {}),global.pnp.common,global.pnp.odata,global.pnp.sp,global.pnp.logging));
}(this, (function (exports,common,odata,sp,logging) { 'use strict';

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

    function objectPath() {
        return "<ObjectPath Id=\"$$ID$$\" ObjectPathId=\"$$PATH_ID$$\" />";
    }
    function identityQuery() {
        return "<ObjectIdentityQuery Id=\"$$ID$$\" ObjectPathId=\"$$PATH_ID$$\" />";
    }
    function opQuery(selectProperties, childSelectProperties) {
        // this is fairly opaque behavior, but is the simplest way to convey the required information.
        // if selectProperties.length === 0 or null then select all
        // else select indicated properties
        if (selectProperties === void 0) { selectProperties = null; }
        if (childSelectProperties === void 0) { childSelectProperties = null; }
        // if childSelectProperties === null do not include that block
        // if childSelectProperties.length === 0 then select all
        // else select indicated properties
        var builder = [];
        builder.push("<Query Id=\"$$ID$$\" ObjectPathId=\"$$PATH_ID$$\">");
        if (selectProperties === null || selectProperties.length < 1) {
            builder.push("<Query SelectAllProperties=\"true\" >");
            builder.push("<Properties />");
            builder.push("</Query >");
        }
        else {
            builder.push("<Query SelectAllProperties=\"false\" >");
            builder.push("<Properties>");
            [].push.apply(builder, selectProperties.map(function (p) { return "<Property Name=\"" + p + "\" SelectAll=\"true\" />"; }));
            builder.push("</Properties>");
            builder.push("</Query >");
        }
        if (childSelectProperties !== null) {
            if (childSelectProperties.length < 1) {
                builder.push("<ChildItemQuery SelectAllProperties=\"true\" >");
                builder.push("<Properties />");
                builder.push("</ChildItemQuery >");
            }
            else {
                builder.push("<ChildItemQuery SelectAllProperties=\"false\" >");
                builder.push("<Properties>");
                [].push.apply(builder, childSelectProperties.map(function (p) { return "<Property Name=\"" + p + "\" SelectAll=\"true\" />"; }));
                builder.push("</Properties>");
                builder.push("</ChildItemQuery >");
            }
        }
        builder.push("</Query >");
        return builder.join("");
    }
    function setProperty(name, type, value) {
        var builder = [];
        builder.push("<SetProperty Id=\"$$ID$$\" ObjectPathId=\"$$PATH_ID$$\" Name=\"" + name + "\">");
        builder.push("<Parameter Type=\"" + type + "\">" + value + "</Parameter>");
        builder.push("</SetProperty>");
        return builder.join("");
    }
    function methodAction(name, params) {
        var builder = [];
        builder.push("<Method Id=\"$$ID$$\" ObjectPathId=\"$$PATH_ID$$\" Name=\"" + name + "\">");
        if (params !== null) {
            var arrParams = params.toArray();
            if (arrParams.length < 1) {
                builder.push("<Parameters />");
            }
            else {
                builder.push("<Parameters>");
                [].push.apply(builder, arrParams.map(function (p) { return "<Parameter Type=\"" + p.type + "\">" + p.value + "</Parameter>"; }));
                builder.push("</Parameters>");
            }
        }
        builder.push("</Method>");
        return builder.join("");
    }
    function objectProperties(o) {
        return Object.getOwnPropertyNames(o).map(function (name) {
            var value = o[name];
            if (typeof value === "boolean") {
                return setProperty(name, "Boolean", "" + value);
            }
            else if (typeof value === "number") {
                return setProperty(name, "Number", "" + value);
            }
            else if (typeof value === "string") {
                return setProperty(name, "String", "" + value);
            }
            return "";
        }, []);
    }

    function property(name) {
        var actions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            actions[_i - 1] = arguments[_i];
        }
        return new ObjectPath("<Property Id=\"$$ID$$\" ParentId=\"$$PARENT_ID$$\" Name=\"" + name + "\" />", actions);
    }
    function staticMethod(name, typeId) {
        var actions = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            actions[_i - 2] = arguments[_i];
        }
        return new ObjectPath("<StaticMethod Id=\"$$ID$$\" Name=\"" + name + "\" TypeId=\"" + typeId + "\" />", actions);
    }
    function staticProperty(name, typeId) {
        var actions = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            actions[_i - 2] = arguments[_i];
        }
        return new ObjectPath("<StaticProperty Id=\"$$ID$$\" Name=\"" + name + "\" TypeId=\"" + typeId + "\" />", actions);
    }
    function objConstructor(typeId) {
        var actions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            actions[_i - 1] = arguments[_i];
        }
        return new ObjectPath("<Constructor Id=\"$$ID$$\" TypeId=\"" + typeId + "\" />", actions);
    }
    /**
     * Used to build parameters when calling methods
     */
    var MethodParams = /** @class */ (function () {
        function MethodParams(_p) {
            if (_p === void 0) { _p = []; }
            this._p = _p;
        }
        MethodParams.build = function (initValues) {
            if (initValues === void 0) { initValues = []; }
            var params = new MethodParams();
            [].push.apply(params._p, initValues);
            return params;
        };
        MethodParams.prototype.string = function (value) {
            return this.a("String", value);
        };
        MethodParams.prototype.number = function (value) {
            return this.a("Number", value.toString());
        };
        MethodParams.prototype.boolean = function (value) {
            return this.a("Boolean", value.toString());
        };
        MethodParams.prototype.strArray = function (values) {
            return this.a("Array", values.map(function (v) { return "<Object Type=\"String\">" + v + "</Object>"; }).join(""));
        };
        MethodParams.prototype.objectPath = function (inputIndex) {
            return this.a("ObjectPath", inputIndex.toString());
        };
        MethodParams.prototype.toArray = function () {
            return this._p;
        };
        MethodParams.prototype.a = function (type, value) {
            this._p.push({ type: type, value: value });
            return this;
        };
        return MethodParams;
    }());
    function method(name, params) {
        var actions = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            actions[_i - 2] = arguments[_i];
        }
        var builder = [];
        builder.push("<Method Id=\"$$ID$$\" ParentId=\"$$PARENT_ID$$\" Name=\"" + name + "\">");
        if (params !== null) {
            var arrParams = params.toArray();
            if (arrParams.length < 1) {
                builder.push("<Parameters />");
            }
            else {
                builder.push("<Parameters>");
                [].push.apply(builder, arrParams.map(function (p) {
                    if (p.type === "ObjectPath") {
                        return "<Parameter ObjectPathId=\"$$OP_PARAM_ID_" + p.value + "$$\" />";
                    }
                    return "<Parameter Type=\"" + p.type + "\">" + p.value + "</Parameter>";
                }));
                builder.push("</Parameters>");
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
        var actions = [];
        var paths = [];
        objectPaths.forEach(function (op) {
            paths.push(op.path);
            actions.push.apply(actions, op.actions);
        });
        // create our xml payload
        return [
            "<Request xmlns=\"http://schemas.microsoft.com/sharepoint/clientquery/2009\" SchemaVersion=\"15.0.0.0\" LibraryVersion=\"16.0.0.0\" ApplicationName=\"PnPjs\">",
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
    var ObjectPath = /** @class */ (function () {
        function ObjectPath(path, actions, id, replaceAfter) {
            if (actions === void 0) { actions = []; }
            if (id === void 0) { id = -1; }
            if (replaceAfter === void 0) { replaceAfter = []; }
            this.path = path;
            this.actions = actions;
            this.id = id;
            this.replaceAfter = replaceAfter;
        }
        return ObjectPath;
    }());
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
    function opSetPathParamId(map, xml, indexMapper) {
        if (indexMapper === void 0) { indexMapper = function (n) { return n; }; }
        // this approach works because input params must come before the things that need them
        // meaning the right id will always be in the map
        var matches = /\$\$OP_PARAM_ID_(\d+)\$\$/ig.exec(xml);
        if (matches !== null) {
            for (var i = 1; i < matches.length; i++) {
                var index = parseInt(matches[i], 10);
                var regex = new RegExp("\\$\\$OP_PARAM_ID_" + index + "\\$\\$", "ig");
                xml = xml.replace(regex, map[indexMapper(index)].toString());
            }
        }
        return xml;
    }
    /**
     * Represents a collection of IObjectPaths
     */
    var ObjectPathQueue = /** @class */ (function () {
        function ObjectPathQueue(_paths, _relationships) {
            if (_paths === void 0) { _paths = []; }
            if (_relationships === void 0) { _relationships = {}; }
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
        ObjectPathQueue.prototype.add = function (op) {
            this.dirty();
            this._paths.push(op);
            return this.lastIndex;
        };
        ObjectPathQueue.prototype.addChildRelationship = function (parentIndex, childIndex) {
            if (common.objectDefinedNotNull(this._relationships["_" + parentIndex])) {
                this._relationships["_" + parentIndex].push(childIndex);
            }
            else {
                this._relationships["_" + parentIndex] = [childIndex];
            }
        };
        ObjectPathQueue.prototype.getChildRelationship = function (parentIndex) {
            if (common.objectDefinedNotNull(this._relationships["_" + parentIndex])) {
                return this._relationships["_" + parentIndex];
            }
            else {
                return [];
            }
        };
        ObjectPathQueue.prototype.getChildRelationships = function () {
            return this._relationships;
        };
        /**
         * Appends an action to the supplied IObjectPath, replacing placeholders
         *
         * @param op IObjectPath to which the action will be appended
         * @param action The action to append
         */
        ObjectPathQueue.prototype.appendAction = function (op, action) {
            this.dirty();
            op.actions.push(action);
            return this;
        };
        /**
         * Appends an action to the last IObjectPath in the collection
         *
         * @param action
         */
        ObjectPathQueue.prototype.appendActionToLast = function (action) {
            return this.appendAction(this.last, action);
        };
        /**
         * Creates a linked copy of this ObjectPathQueue
         */
        ObjectPathQueue.prototype.copy = function () {
            var copy = new ObjectPathQueue(this.toArray(), common.extend({}, this._relationships));
            copy._contextIndex = this._contextIndex;
            copy._siteIndex = this._siteIndex;
            copy._webIndex = this._webIndex;
            return copy;
        };
        /**
         * Creates an independent clone of this ObjectPathQueue
         */
        ObjectPathQueue.prototype.clone = function () {
            var clone = new ObjectPathQueue(this.toArray().map(function (p) { return Object.assign({}, p); }), common.extend({}, this._relationships));
            clone._contextIndex = this._contextIndex;
            clone._siteIndex = this._siteIndex;
            clone._webIndex = this._webIndex;
            return clone;
        };
        /**
         * Gets a copy of this instance's paths
         */
        ObjectPathQueue.prototype.toArray = function () {
            return this._paths.slice(0);
        };
        Object.defineProperty(ObjectPathQueue.prototype, "last", {
            /**
             * The last IObjectPath instance added to this collection
             */
            get: function () {
                if (this._paths.length < 1) {
                    return null;
                }
                return this._paths[this.lastIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectPathQueue.prototype, "lastIndex", {
            /**
             * Index of the last IObjectPath added to the queue
             */
            get: function () {
                return this._paths.length - 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectPathQueue.prototype, "siteIndex", {
            /**
             * Gets the index of the current site in the queue
             */
            get: function () {
                if (this._siteIndex < 0) {
                    // this needs to be here in case we create it
                    var contextIndex = this.contextIndex;
                    this._siteIndex = this.add(property("Site", 
                    // actions
                    objectPath()));
                    this.addChildRelationship(contextIndex, this._siteIndex);
                }
                return this._siteIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectPathQueue.prototype, "webIndex", {
            /**
             * Gets the index of the current web in the queue
             */
            get: function () {
                if (this._webIndex < 0) {
                    // this needs to be here in case we create it
                    var contextIndex = this.contextIndex;
                    this._webIndex = this.add(property("Web", 
                    // actions
                    objectPath()));
                    this.addChildRelationship(contextIndex, this._webIndex);
                }
                return this._webIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectPathQueue.prototype, "contextIndex", {
            /**
             * Gets the index of the Current context in the queue, can be used to establish parent -> child rels
             */
            get: function () {
                if (this._contextIndex < 0) {
                    this._contextIndex = this.add(staticProperty("Current", "{3747adcd-a3c3-41b9-bfab-4a64dd2f1e0a}", 
                    // actions
                    objectPath()));
                }
                return this._contextIndex;
            },
            enumerable: true,
            configurable: true
        });
        ObjectPathQueue.prototype.toBody = function () {
            if (common.objectDefinedNotNull(this._xml)) {
                return this._xml;
            }
            // create our xml payload
            this._xml = writeObjectPathBody(this.toIndexedTree());
            return this._xml;
        };
        /**
         * Conducts the string replacements for id, parent id, and path id
         *
         * @returns The tree with all string replacements made
         */
        ObjectPathQueue.prototype.toIndexedTree = function () {
            var _this = this;
            var builderIndex = -1;
            var lastOpId = -1;
            var idIndexMap = [];
            return this.toArray().map(function (op, index, arr) {
                var opId = ++builderIndex;
                // track the array index => opId relationship
                idIndexMap.push(opId);
                // do path replacements
                op.path = opSetPathParamId(idIndexMap, opSetId(opId.toString(), op.path));
                if (lastOpId >= 0) {
                    // if we have a parent do the replace
                    op.path = opSetParentId(lastOpId.toString(), op.path);
                }
                // rewrite actions with placeholders replaced
                op.actions = op.actions.map(function (a) {
                    var actionId = ++builderIndex;
                    return opSetId(actionId.toString(), opSetPathId(opId.toString(), a));
                });
                // handle any specific child relationships
                _this.getChildRelationship(index).forEach(function (childIndex) {
                    // set the parent id for our non-immediate children, thus removing the token so it isn't overwritten
                    arr[childIndex].path = opSetParentId(opId.toString(), arr[childIndex].path);
                });
                // and remember our last object path id for the parent replace above
                lastOpId = opId;
                return op;
            });
        };
        /**
         * Dirties this queue clearing any cached data
         */
        ObjectPathQueue.prototype.dirty = function () {
            this._xml = null;
        };
        return ObjectPathQueue;
    }());

    /**
     * Used within the request pipeline to parse ProcessQuery results
     */
    var ProcessQueryParser = /** @class */ (function () {
        function ProcessQueryParser(op) {
            this.op = op;
        }
        /**
         * Parses the response checking for errors
         *
         * @param r Response object
         */
        ProcessQueryParser.prototype.parse = function (r) {
            var _this = this;
            return r.text().then(function (t) {
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
            }).then(function (parsed) {
                // here we need to check for an error body
                if (parsed.length > 0 && common.hOP(parsed[0], "ErrorInfo") && parsed[0].ErrorInfo !== null) {
                    throw Error(common.jsS(parsed[0].ErrorInfo));
                }
                return _this.findResult(parsed);
            });
        };
        ProcessQueryParser.prototype.findResult = function (json) {
            for (var i = 0; i < this.op.actions.length; i++) {
                var a = this.op.actions[i];
                // let's see if the result is null based on the ObjectPath action, if it exists
                // <ObjectPath Id="8" ObjectPathId="7" />
                if (/^<ObjectPath /i.test(a)) {
                    var result = this.getParsedResultById(json, parseInt(common.getAttrValueFromString(a, "Id"), 10));
                    if (!result || (result && result.IsNull)) {
                        return Promise.resolve(null);
                    }
                }
                // let's see if we have a query result
                // <Query Id="5" ObjectPathId = "3" >
                if (/^<Query /i.test(a)) {
                    var result = this.getParsedResultById(json, parseInt(common.getAttrValueFromString(a, "Id"), 10));
                    if (result && common.hOP(result, "_Child_Items_")) {
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
                    return Promise.resolve(this.getParsedResultById(json, parseInt(common.getAttrValueFromString(a, "Id"), 10)));
                }
            }
            // no result could be found so we are effectively returning void
            // issue is we really don't know if we should be returning void (a method invocation with a void return) or
            // if we just didn't find something above. We will let downstream things worry about that
        };
        /**
         * Locates a result by ObjectPath id
         *
         * @param parsed the parsed JSON body from the response
         * @param id The ObjectPath id whose result we want
         */
        ProcessQueryParser.prototype.getParsedResultById = function (parsed, id) {
            for (var i = 0; i < parsed.length; i++) {
                if (parsed[i] === id) {
                    return parsed[i + 1];
                }
            }
            return null;
        };
        return ProcessQueryParser;
    }());

    var ProcessQueryPath = "_vti_bin/client.svc/ProcessQuery";
    var ClientSvcQueryable = /** @class */ (function (_super) {
        __extends(ClientSvcQueryable, _super);
        function ClientSvcQueryable(parent, _objectPaths) {
            if (parent === void 0) { parent = ""; }
            if (_objectPaths === void 0) { _objectPaths = null; }
            var _this = _super.call(this) || this;
            _this._objectPaths = _objectPaths;
            _this._selects = [];
            _this._batch = null;
            _this._batchDependency = null;
            if (typeof parent === "string") {
                // we assume the parent here is an absolute url to a web
                _this._parentUrl = parent;
                _this._url = common.combine(parent.replace(ProcessQueryPath, ""), ProcessQueryPath);
                if (!common.objectDefinedNotNull(_this._objectPaths)) {
                    _this._objectPaths = new ObjectPathQueue();
                }
            }
            else {
                _this._parentUrl = parent._parentUrl;
                _this._url = common.combine(parent._parentUrl, ProcessQueryPath);
                if (!common.objectDefinedNotNull(_objectPaths)) {
                    _this._objectPaths = parent._objectPaths.clone();
                }
                _this.configureFrom(parent);
            }
            return _this;
        }
        /**
         * Choose which fields to return
         *
         * @param selects One or more fields to return
         */
        ClientSvcQueryable.prototype.select = function () {
            var selects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selects[_i] = arguments[_i];
            }
            [].push.apply(this._selects, selects);
            return this;
        };
        /**
         * Adds this query to the supplied batch
         *
         */
        ClientSvcQueryable.prototype.inBatch = function (batch) {
            if (this.batch !== null) {
                throw Error("This query is already part of a batch.");
            }
            if (common.objectDefinedNotNull(batch)) {
                this._batch = batch;
                this._batchDependency = batch.addDependency();
            }
            return this;
        };
        /**
         * Gets the full url with query information
         *
         */
        ClientSvcQueryable.prototype.toUrlAndQuery = function () {
            return _super.prototype.toUrl.call(this) + "?" + Array.from(this.query).map(function (v) { return v[0] + "=" + v[1]; }).join("&");
        };
        ClientSvcQueryable.prototype.getSelects = function () {
            return common.objectDefinedNotNull(this._selects) ? this._selects : [];
        };
        /**
         * Gets a child object based on this instance's paths and the supplied paramters
         *
         * @param factory Instance factory of the child type
         * @param methodName Name of the method used to load the child
         * @param params Parameters required by the method to load the child
         */
        ClientSvcQueryable.prototype.getChild = function (factory, methodName, params) {
            var objectPaths = this._objectPaths.copy();
            objectPaths.add(method(methodName, params, 
            // actions
            objectPath()));
            return new factory(this, objectPaths);
        };
        /**
         * Gets a property of the current instance
         *
         * @param factory Instance factory of the child type
         * @param propertyName Name of the property to load
         */
        ClientSvcQueryable.prototype.getChildProperty = function (factory, propertyName) {
            var objectPaths = this._objectPaths.copy();
            objectPaths.add(property(propertyName));
            return new factory(this, objectPaths);
        };
        /**
         * Sends a request
         *
         * @param op
         * @param options
         * @param parser
         */
        ClientSvcQueryable.prototype.send = function (objectPaths, options, parser) {
            if (options === void 0) { options = {}; }
            if (parser === void 0) { parser = null; }
            // here we need to create a clone because all the string indexes and references
            // will be updated and all need to relate for this operation being sent. The parser
            // and the postCore method need to share an independent value of the objectPaths
            // See for https://github.com/pnp/pnpjs/issues/419 for details
            var clonedOps = objectPaths.clone();
            if (!common.objectDefinedNotNull(parser)) {
                // we assume here that we want to return for this index path
                parser = new ProcessQueryParser(clonedOps.last);
            }
            if (this.hasBatch) {
                // this is using the options variable to pass some extra information downstream to the batch
                options = common.extend(options, {
                    clientsvc_ObjectPaths: clonedOps,
                });
            }
            else {
                if (!common.hOP(options, "body")) {
                    options = common.extend(options, {
                        body: clonedOps.toBody(),
                    });
                }
            }
            return _super.prototype.postCore.call(this, options, parser);
        };
        /**
         * Sends the request, merging the result data with a new instance of factory
         */
        ClientSvcQueryable.prototype.sendGet = function (factory) {
            var _this = this;
            var ops = this._objectPaths.copy().appendActionToLast(opQuery(this.getSelects()));
            return this.send(ops).then(function (r) { return common.extend(new factory(_this), r); });
        };
        /**
         * Sends the request, merging the result data array with a new instances of factory
         */
        ClientSvcQueryable.prototype.sendGetCollection = function (factory) {
            var ops = this._objectPaths.copy().appendActionToLast(opQuery([], this.getSelects()));
            return this.send(ops).then(function (r) { return r.map(function (d) { return common.extend(factory(d), d); }); });
        };
        /**
         * Invokes the specified method on the server and returns the result
         *
         * @param methodName Name of the method to invoke
         * @param params Method parameters
         * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
         */
        ClientSvcQueryable.prototype.invokeMethod = function (methodName, params) {
            if (params === void 0) { params = null; }
            var actions = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                actions[_i - 2] = arguments[_i];
            }
            return this.invokeMethodImpl(methodName, params, actions, opQuery([], null));
        };
        /**
         * Invokes a method action that returns a single result and does not have an associated query (ex: GetDescription on Term)
         *
         * @param methodName Name of the method to invoke
         * @param params Method parameters
         * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
         */
        ClientSvcQueryable.prototype.invokeMethodAction = function (methodName, params) {
            if (params === void 0) { params = null; }
            var actions = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                actions[_i - 2] = arguments[_i];
            }
            return this.invokeMethodImpl(methodName, params, actions, null, true);
        };
        /**
         * Invokes the specified non-query method on the server
         *
         * @param methodName Name of the method to invoke
         * @param params Method parameters
         * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
         */
        ClientSvcQueryable.prototype.invokeNonQuery = function (methodName, params) {
            if (params === void 0) { params = null; }
            var actions = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                actions[_i - 2] = arguments[_i];
            }
            // by definition we are not returning anything from these calls so we should not be caching the results
            this._useCaching = false;
            return this.invokeMethodImpl(methodName, params, actions, null, true);
        };
        /**
         * Invokes the specified method on the server and returns the resulting collection
         *
         * @param methodName Name of the method to invoke
         * @param params Method parameters
         * @param actions Any additional actions to execute in addition to the method invocation (set property for example)
         */
        ClientSvcQueryable.prototype.invokeMethodCollection = function (methodName, params) {
            if (params === void 0) { params = null; }
            var actions = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                actions[_i - 2] = arguments[_i];
            }
            return this.invokeMethodImpl(methodName, params, actions, opQuery([], []));
        };
        /**
         * Updates this instance, returning a copy merged with the updated data after the update
         *
         * @param properties Plain object of the properties and values to update
         * @param factory Factory method use to create a new instance of FactoryType
         */
        ClientSvcQueryable.prototype.invokeUpdate = function (properties, factory) {
            var _this = this;
            var ops = this._objectPaths.copy();
            // append setting all the properties to this instance
            objectProperties(properties).map(function (a) { return ops.appendActionToLast(a); });
            ops.appendActionToLast(opQuery([], null));
            return this.send(ops).then(function (r) { return common.extend(new factory(_this), r); });
        };
        /**
         * Converts the current instance to a request context
         *
         * @param verb The request verb
         * @param options The set of supplied request options
         * @param parser The supplied ODataParser instance
         * @param pipeline Optional request processing pipeline
         */
        ClientSvcQueryable.prototype.toRequestContext = function (verb, options, parser, pipeline) {
            var _this = this;
            return sp.toAbsoluteUrl(this.toUrlAndQuery()).then(function (url) {
                common.mergeOptions(options, _this._options);
                var headers = new Headers();
                common.mergeHeaders(headers, options.headers);
                common.mergeHeaders(headers, {
                    "accept": "*/*",
                    "content-type": "text/xml",
                });
                options = common.extend(options, { headers: headers });
                // we need to do some special cache handling to ensure we have a good key
                if (_this._useCaching) {
                    var keyStr = options.body;
                    if (common.stringIsNullOrEmpty(keyStr)) {
                        if (common.hOP(options, "clientsvc_ObjectPaths")) {
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
                    var cacheKey = "PnPjs.ProcessQueryClient(" + common.getHashCode(keyStr) + ")";
                    if (common.objectDefinedNotNull(_this._cachingOptions)) {
                        // if our key ends in the ProcessQuery url we overwrite it
                        if (/\/client\.svc\/ProcessQuery\?$/i.test(_this._cachingOptions.key)) {
                            _this._cachingOptions.key = cacheKey;
                        }
                    }
                    else {
                        _this._cachingOptions = new odata.CachingOptions(cacheKey);
                    }
                }
                var dependencyDispose = _this.hasBatch ? _this._batchDependency : function () { return; };
                // build our request context
                var context = {
                    batch: _this.batch,
                    batchDependency: dependencyDispose,
                    cachingOptions: _this._cachingOptions,
                    clientFactory: function () { return new sp.SPHttpClient(); },
                    isBatched: _this.hasBatch,
                    isCached: _this._useCaching,
                    options: options,
                    parser: parser,
                    pipeline: pipeline,
                    requestAbsoluteUrl: url,
                    requestId: common.getGUID(),
                    verb: verb,
                };
                return context;
            });
        };
        /**
         * Blocks a batch call from occuring, MUST be cleared by calling the returned function
        */
        ClientSvcQueryable.prototype.addBatchDependency = function () {
            if (this._batch !== null) {
                return this._batch.addDependency();
            }
            return function () { return null; };
        };
        Object.defineProperty(ClientSvcQueryable.prototype, "hasBatch", {
            /**
             * Indicates if the current query has a batch associated
             *
             */
            get: function () {
                return common.objectDefinedNotNull(this._batch);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClientSvcQueryable.prototype, "batch", {
            /**
             * The batch currently associated with this query or null
             *
             */
            get: function () {
                return this.hasBatch ? this._batch : null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Executes the actual invoke method call
         *
         * @param methodName Name of the method to invoke
         * @param params Method parameters
         * @param queryAction Specifies the query action to take
         */
        ClientSvcQueryable.prototype.invokeMethodImpl = function (methodName, params, actions, queryAction, isAction) {
            if (isAction === void 0) { isAction = false; }
            var ops = this._objectPaths.copy();
            if (isAction) {
                ops.appendActionToLast(methodAction(methodName, params));
            }
            else {
                ops.add(method.apply(void 0, [methodName, params].concat([objectPath()].concat(actions, [queryAction]))));
            }
            return this.send(ops);
        };
        return ClientSvcQueryable;
    }(odata.Queryable));

    /**
     * Implements ODataBatch for use with the ObjectPath framework
     */
    var ObjectPathBatch = /** @class */ (function (_super) {
        __extends(ObjectPathBatch, _super);
        function ObjectPathBatch(parentUrl, _batchId) {
            var _this = _super.call(this, _batchId) || this;
            _this.parentUrl = parentUrl;
            return _this;
        }
        ObjectPathBatch.prototype.executeImpl = function () {
            // if we don't have any requests, don't bother sending anything
            // this could be due to caching further upstream, or just an empty batch
            if (this.requests.length < 1) {
                logging.Logger.write("Resolving empty batch.", 1 /* Info */);
                return Promise.resolve();
            }
            var executor = new BatchExecutor(this.parentUrl, this.batchId);
            executor.appendRequests(this.requests);
            return executor.execute();
        };
        return ObjectPathBatch;
    }(odata.ODataBatch));
    var BatchExecutor = /** @class */ (function (_super) {
        __extends(BatchExecutor, _super);
        function BatchExecutor(parentUrl, batchId) {
            var _this = _super.call(this, parentUrl) || this;
            _this.batchId = batchId;
            _this._requests = [];
            _this._builderIndex = 1;
            // we add our session object path and hard code in the IDs so we can reference it
            var method$$1 = staticMethod("GetTaxonomySession", "{981cbc68-9edc-4f8d-872f-71146fcbb84f}");
            method$$1.path = opSetId("0", method$$1.path);
            method$$1.actions.push(opSetId("1", opSetPathId("0", objectPath())));
            _this._objectPaths.add(method$$1);
            return _this;
        }
        BatchExecutor.prototype.appendRequests = function (requests) {
            var _this = this;
            requests.forEach(function (request) {
                // grab the special property we added to options when we created the batch info
                var pathQueue = request.options.clientsvc_ObjectPaths;
                var paths = pathQueue.toArray();
                // getChildRelationships
                if (paths.length < 0) {
                    return;
                }
                var indexMappingFunction = function (n) { return n; };
                if (/GetTaxonomySession/i.test(paths[0].path)) {
                    // drop the first thing as it is a get session object path, which we add once for the entire batch
                    paths = paths.slice(1);
                    // replace the next item's parent id with 0, which will be the id of the session call at the root of this request
                    paths[0].path = opSetParentId("0", paths[0].path);
                    indexMappingFunction = function (n) { return n - 1; };
                }
                var lastOpId = -1;
                var idIndexMap = [];
                paths.map(function (op, index, arr) {
                    // rewrite the path string
                    var opId = ++_this._builderIndex;
                    // track the array index => opId relationship
                    idIndexMap.push(opId);
                    var path = opSetPathParamId(idIndexMap, opSetId(opId.toString(), op.path), indexMappingFunction);
                    if (lastOpId >= 0) {
                        path = opSetParentId(lastOpId.toString(), path);
                    }
                    // rewrite actions with placeholders replaced
                    var opActions = op.actions.map(function (a) {
                        var actionId = ++_this._builderIndex;
                        return opSetId(actionId.toString(), opSetPathId(opId.toString(), a));
                    });
                    // handle any specific child relationships
                    // the childIndex is reduced by 1 because we are removing the Session Path
                    pathQueue.getChildRelationship(index + 1).map(function (i) { return i - 1; }).forEach(function (childIndex) {
                        // set the parent id for our non-immediate children
                        arr[childIndex].path = opSetParentId(opId.toString(), arr[childIndex].path);
                    });
                    // and remember our last object path id for the parent replace above
                    lastOpId = opId;
                    // return our now substituted path and actions as a new object path instance
                    return new ObjectPath(path, opActions);
                }).forEach(function (op) { return _this._objectPaths.add(op); });
                // get this once
                var obPaths = _this._objectPaths.toArray();
                // create a new parser to handle finding the result based on the path
                var parser = new ProcessQueryParser(obPaths[obPaths.length - 1]);
                if (request.parser instanceof odata.CachingParserWrapper) {
                    // handle special case of caching
                    request.parser = new ProcessQueryCachingParserWrapper(parser, request.parser);
                }
                else {
                    request.parser = parser;
                }
                // add the request to our batch requests
                _this._requests.push(request);
                // remove the temp property
                delete request.options.clientsvc_ObjectPaths;
            });
        };
        BatchExecutor.prototype.execute = function () {
            var _this = this;
            logging.Logger.write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Executing batch with " + this._requests.length + " requests.", 1 /* Info */);
            // create our request body from all the merged object paths
            var options = {
                body: writeObjectPathBody(this._objectPaths.toArray()),
            };
            logging.Logger.write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Sending batch request.", 1 /* Info */);
            // send the batch
            return _super.prototype.postCore.call(this, options, new BatchParser()).then(function (rawResponse) {
                logging.Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched requests.", 1 /* Info */);
                return _this._requests.reduce(function (chain, request) {
                    logging.Logger.write("[" + request.id + "] (" + (new Date()).getTime() + ") Resolving request in batch " + _this.batchId + ".", 1 /* Info */);
                    return chain.then(function (_) { return request.parser.findResult(rawResponse).then(request.resolve).catch(request.reject); });
                }, Promise.resolve());
            });
        };
        return BatchExecutor;
    }(ClientSvcQueryable));
    /**
     * Used to return the raw results from parsing the batch
     */
    var BatchParser = /** @class */ (function (_super) {
        __extends(BatchParser, _super);
        function BatchParser() {
            return _super.call(this, null) || this;
        }
        BatchParser.prototype.findResult = function (json) {
            // we leave it to the individual request parsers to find their results in the raw json body
            return json;
        };
        return BatchParser;
    }(ProcessQueryParser));
    /**
     * Handles processing batched results that are also cached
     */
    var ProcessQueryCachingParserWrapper = /** @class */ (function (_super) {
        __extends(ProcessQueryCachingParserWrapper, _super);
        function ProcessQueryCachingParserWrapper(parser, wrapper) {
            return _super.call(this, parser, wrapper.cacheOptions) || this;
        }
        ProcessQueryCachingParserWrapper.prototype.findResult = function (json) {
            var _this = this;
            return this.parser.findResult(json).then(function (d) { return _this.cacheData(d); });
        };
        return ProcessQueryCachingParserWrapper;
    }(odata.CachingParserWrapper));

    exports.ObjectPathBatch = ObjectPathBatch;
    exports.ClientSvcQueryable = ClientSvcQueryable;
    exports.ObjectPath = ObjectPath;
    exports.opSetId = opSetId;
    exports.opSetPathId = opSetPathId;
    exports.opSetParentId = opSetParentId;
    exports.opSetPathParamId = opSetPathParamId;
    exports.ObjectPathQueue = ObjectPathQueue;
    exports.objectPath = objectPath;
    exports.identityQuery = identityQuery;
    exports.opQuery = opQuery;
    exports.setProperty = setProperty;
    exports.methodAction = methodAction;
    exports.objectProperties = objectProperties;
    exports.property = property;
    exports.staticMethod = staticMethod;
    exports.staticProperty = staticProperty;
    exports.objConstructor = objConstructor;
    exports.MethodParams = MethodParams;
    exports.method = method;
    exports.ProcessQueryParser = ProcessQueryParser;
    exports.writeObjectPathBody = writeObjectPathBody;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sp-clientsvc.es5.umd.js.map
