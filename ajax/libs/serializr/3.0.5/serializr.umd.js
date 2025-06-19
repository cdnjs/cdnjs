(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.serializr = {}));
})(this, (function (exports) { 'use strict';

    /**
     * Creates a model schema that (de)serializes from / to plain javascript objects.
     * Its factory method is: `() => ({})`
     *
     * @example
     * const todoSchema = createSimpleSchema({
     *     title: true,
     *     done: true,
     * })
     *
     * const json = serialize(todoSchema, { title: 'Test', done: false })
     * const todo = deserialize(todoSchema, json)
     *
     * @param props property mapping,
     * @returns model schema
     */
    function createSimpleSchema(props) {
        return {
            factory: function () {
                return {};
            },
            props: props,
        };
    }

    var formatters = {
        j: function json(v) {
            try {
                return JSON.stringify(v);
            }
            catch (error) {
                return "[UnexpectedJSONParseError]: ".concat(error.message);
            }
        },
        l: function symbol(s) {
            return s.toString();
        },
    };
    function invariant(condition, message) {
        var variables = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            variables[_i - 2] = arguments[_i];
        }
        if (!condition) {
            var variablesToLog_1 = [];
            var index_1 = 0;
            var formattedMessage = message.replace(/%([a-zA-Z%])/g, function (match, format) {
                if (match === "%%")
                    return match;
                var formatter = formatters[format];
                if (typeof formatter === "function") {
                    var variable = variables[index_1++];
                    variablesToLog_1.push(variable);
                    return formatter(variable);
                }
                return match;
            });
            if (console && variablesToLog_1.length > 0) {
                // eslint-disable-next-line no-console
                console.log.apply(console, variablesToLog_1);
            }
            throw new Error("[serializr] " + (formattedMessage || "Illegal State"));
        }
    }

    function GUARDED_NOOP(err) {
        if (err)
            // unguarded error...
            throw new Error(err);
    }
    function once(fn) {
        var fired = false;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!fired) {
                fired = true;
                return fn.apply(void 0, args);
            }
            invariant(false, "callback was invoked twice");
        };
    }
    function parallel(ar, processor, cb) {
        // TODO: limit parallelization?
        if (ar.length === 0)
            return void cb(null, []);
        var left = ar.filter(function (x) { return true; }).length; // only count items processed by forEach
        var resultArray = [];
        var failed = false;
        ar.forEach(function (value, idx) {
            processor(value, function (err, result) {
                if (err) {
                    if (!failed) {
                        failed = true;
                        cb(err);
                    }
                }
                else {
                    resultArray[idx] = result;
                    if (--left === 0)
                        cb(null, resultArray);
                }
            }, idx);
        });
    }
    function isPrimitive(value) {
        if (value === null)
            return true;
        return typeof value !== "object" && typeof value !== "function";
    }
    function isModelSchema(thing) {
        return thing && thing.factory && thing.props;
    }
    function isPropSchema(thing) {
        return thing && thing.serializer && thing.deserializer;
    }
    function isAliasedPropSchema(propSchema) {
        return typeof propSchema === "object" && "string" == typeof propSchema.jsonname;
    }
    function isIdentifierPropSchema(propSchema) {
        return typeof propSchema === "object" && propSchema.identifier === true;
    }
    function isAssignableTo(actualType, expectedType) {
        var currentActualType = actualType;
        while (currentActualType) {
            if (currentActualType === expectedType)
                return true;
            currentActualType = currentActualType.extends;
        }
        return false;
    }
    function isMapLike(thing) {
        return (thing &&
            typeof thing.keys === "function" &&
            typeof thing.clear === "function" &&
            typeof thing.forEach === "function" &&
            typeof thing.set === "function");
    }
    function getIdentifierProp(modelSchema) {
        invariant(isModelSchema(modelSchema), "modelSchema must be a ModelSchema");
        // optimization: cache this lookup
        var currentModelSchema = modelSchema;
        while (currentModelSchema) {
            for (var propName in currentModelSchema.props)
                if (isIdentifierPropSchema(currentModelSchema.props[propName]))
                    return propName;
            currentModelSchema = currentModelSchema.extends;
        }
        return undefined;
    }
    function processAdditionalPropArgs(propSchema, additionalArgs) {
        if (additionalArgs) {
            invariant(isPropSchema(propSchema), "expected a propSchema");
            Object.assign(propSchema, additionalArgs);
        }
        return propSchema;
    }
    function isRegExp(obj) {
        return typeof obj === "object" && obj.test;
    }

    /**
     * Returns the standard model schema associated with a class / constructor function
     *
     */
    function getDefaultModelSchema(thing) {
        if (!thing)
            return undefined;
        if (isModelSchema(thing))
            return thing;
        if (isModelSchema(thing.serializeInfo))
            return thing.serializeInfo;
        if (thing.constructor && thing.constructor.serializeInfo)
            return thing.constructor.serializeInfo;
    }

    /**
     * Sets the default model schema for class / constructor function.
     * Everywhere where a model schema is required as argument, this class / constructor function
     * can be passed in as well (for example when using `object` or `ref`.
     *
     * When passing an instance of this class to `serialize`, it is not required to pass the model schema
     * as first argument anymore, because the default schema will be inferred from the instance type.
     *
     * @param clazz class or constructor function
     * @param modelSchema - a model schema
     * @returns model schema
     */
    function setDefaultModelSchema(clazz, modelSchema) {
        invariant(isModelSchema(modelSchema), "expected modelSchema, got ".concat(modelSchema));
        clazz.serializeInfo = modelSchema;
        return modelSchema;
    }

    /**
     * Creates a model schema that (de)serializes an object created by a constructor function (class).
     * The created model schema is associated by the targeted type as default model schema, see setDefaultModelSchema.
     * Its factory method is `() => new clazz()` (unless overriden, see third arg).
     *
     * @example
     * function Todo(title, done) {
     *     this.title = title
     *     this.done = done
     * }
     *
     * createModelSchema(Todo, {
     *     title: true,
     *     done: true,
     * })
     *
     * const json = serialize(new Todo('Test', false))
     * const todo = deserialize(Todo, json)
     *
     * @param clazz class or constructor function
     * @param props property mapping
     * @param factory optional custom factory. Receives context as first arg
     * @returns model schema
     */
    function createModelSchema(clazz, props, factory) {
        invariant(clazz !== Object, "one cannot simply put define a model schema for Object");
        invariant(typeof clazz === "function", "expected constructor function");
        var model = {
            targetClass: clazz,
            factory: factory ||
                function () {
                    return new clazz();
                },
            props: props,
        };
        // find super model
        if (clazz.prototype.constructor !== Object) {
            var s = getDefaultModelSchema(clazz.prototype.constructor);
            if (s && s.targetClass !== clazz)
                model.extends = s;
        }
        setDefaultModelSchema(clazz, model);
        return model;
    }

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * Indicates that this field contains a primitive value (or Date) which should be serialized literally to json.
     *
     * @example
     * createModelSchema(Todo, {
     *     title: primitive(),
     * })
     *
     * serialize(new Todo('test')) // { "title": "test" }
     *
     * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
     */
    function primitive(additionalArgs) {
        var result = {
            serializer: function (value) {
                invariant(isPrimitive(value), "this value is not primitive: ".concat(value));
                return value;
            },
            deserializer: function (jsonValue, done) {
                if (!isPrimitive(jsonValue))
                    return void done("[serializr] this value is not primitive: ".concat(jsonValue));
                return void done(null, jsonValue);
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * If you want to skip serialization or deserialization, you can use SKIP.
     *
     * @example
     * const schema = createSimpleSchema({
     *     a: custom(
     *         () => SKIP,
     *         v => v,
     *     ),
     * })
     * serialize(s, { a: 4 }) // {}
     * deserialize(s, { "a": 4 }) // { a: 4 }
     *
     * @example
     * // Skipping deserialization with computed mobx property.
     *
     * class TodoState {
     *     // Todo.category is @serializable(reference(...))
     *     \@serializable(list(object(Todo)))
     *     \@observable
     *     todos: Todo[]
     *
     *     // we want to serialize the categories, so that the references in
     *     // this.todos can be resolved, but we don't want to set this property
     *     \@serializable(
     *         list(object(TodoCategory),
     *         { afterDeserialize: callback => callback(undefined, SKIP) }))
     *     \@computed
     *     get categories() {
     *         return this.todos.map(todo => todo.category)
     *     }
     * }
     */
    var SKIP = typeof Symbol !== "undefined" ? Symbol("SKIP") : { SKIP: true };
    /**
     * When using the decorator shorthand we store the given value in
     * a specific attribute of the result structure. This constant contains
     * the attribute name used in such scenario.
     */
    var DEFAULT_DISCRIMINATOR_ATTR = "_type";
    var _defaultPrimitiveProp = primitive();

    // Ugly way to get the parameter names since they aren't easily retrievable via reflection
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    function getParamNames(func) {
        var _a;
        var fnStr = func.toString().replace(STRIP_COMMENTS, "");
        return (_a = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES)) !== null && _a !== void 0 ? _a : [];
    }
    function serializableDecorator(propSchema, target, propName, descriptor) {
        invariant(arguments.length >= 2, "too few arguments. Please use @serializable as property decorator");
        // Fix for @serializable used in class constructor params (typescript)
        var factory;
        if (propName === undefined &&
            typeof target === "function" &&
            target.prototype &&
            descriptor !== undefined &&
            typeof descriptor === "number") {
            invariant(isPropSchema(propSchema), "Constructor params must use alias(name)");
            invariant(isAliasedPropSchema(propSchema), "Constructor params must use alias(name)");
            var paramNames = getParamNames(target);
            if (paramNames.length >= descriptor) {
                propName = paramNames[descriptor];
                propSchema.paramNumber = descriptor;
                descriptor = undefined;
                target = target.prototype;
                // Create a factory so the constructor is called properly
                factory = function (context) {
                    var _a;
                    var params = [];
                    var _loop_1 = function (i) {
                        Object.keys(context.modelSchema.props).forEach(function (key) {
                            var prop = context.modelSchema.props[key];
                            if (prop.paramNumber === i) {
                                params[i] = context.json[prop.jsonname];
                            }
                        });
                    };
                    for (var i = 0; i < target.constructor.length; i++) {
                        _loop_1(i);
                    }
                    return (_a = target.constructor).bind.apply(_a, __spreadArray([undefined], params, false));
                };
            }
        }
        invariant(typeof propName === "string", "incorrect usage of @serializable decorator");
        var info = getDefaultModelSchema(target);
        if (!info || !Object.prototype.hasOwnProperty.call(target.constructor, "serializeInfo"))
            info = createModelSchema(target.constructor, {}, factory);
        if (info && info.targetClass !== target.constructor)
            // fixes typescript issue that tends to copy fields from super constructor to sub constructor in extends
            info = createModelSchema(target.constructor, {}, factory);
        info.props[propName] = propSchema;
        // MWE: why won't babel work without?
        if (descriptor && !descriptor.get && !descriptor.set)
            descriptor.writable = true;
        return descriptor;
    }
    function serializable(targetOrPropSchema, key, baseDescriptor) {
        if (!key) {
            // decorated with propSchema
            var propSchema = targetOrPropSchema === true
                ? _defaultPrimitiveProp
                : targetOrPropSchema;
            invariant(isPropSchema(propSchema), "@serializable expects prop schema");
            var result = serializableDecorator.bind(null, propSchema);
            return result;
        }
        else {
            // decorated without arguments, treat as primitive
            serializableDecorator(primitive(), targetOrPropSchema, key, baseDescriptor);
        }
    }

    function serialize() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        invariant(args.length === 1 || args.length === 2, "serialize expects one or 2 arguments");
        var schema;
        var value;
        if (args.length === 1) {
            schema = undefined;
            value = args[0];
        }
        else {
            schema = args[0], value = args[1];
        }
        if (Array.isArray(value)) {
            return value.map(function (item) { return (schema ? serialize(schema, item) : serialize(item)); });
        }
        if (!schema) {
            schema = getDefaultModelSchema(value);
        }
        else if (typeof schema !== "object") {
            schema = getDefaultModelSchema(schema);
        }
        if (!schema) {
            // only call modelSchemaOrInstance.toString() on error
            invariant(schema, "Failed to find default schema for ".concat(value));
        }
        return serializeWithSchema(schema, value);
    }
    function serializeWithSchema(schema, obj) {
        var _a;
        invariant(schema && typeof schema === "object" && schema.props, "Expected schema");
        invariant(obj && typeof obj === "object", "Expected object");
        var res;
        if (schema.extends)
            res = serializeWithSchema(schema.extends, obj);
        else {
            // TODO: make invariant?:  invariant(!obj.constructor.prototype.constructor.serializeInfo, "object has a serializable supertype, but modelschema did not provide extends clause")
            res = {};
        }
        Object.keys(schema.props).forEach(function (key) {
            var propDef = schema.props[key];
            if (!propDef)
                return;
            if (key === "*") {
                serializeStarProps(schema, propDef, obj, res);
                return;
            }
            if (propDef === true)
                propDef = _defaultPrimitiveProp;
            var jsonValue = propDef.serializer(obj[key], key, obj);
            if (jsonValue === SKIP) {
                return;
            }
            res[propDef.jsonname || key] = jsonValue;
        });
        if ((_a = schema.discriminator) === null || _a === void 0 ? void 0 : _a.storeDiscriminator) {
            schema.discriminator.storeDiscriminator(res);
        }
        return res;
    }
    function serializeStarProps(schema, propDef, obj, target) {
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!(key in schema.props)) {
                if (propDef === true || (propDef && (!propDef.pattern || propDef.pattern.test(key)))) {
                    var value = obj[key];
                    if (propDef === true) {
                        if (isPrimitive(value)) {
                            target[key] = value;
                        }
                    }
                    else {
                        var jsonValue = propDef.serializer(value, key, obj);
                        if (jsonValue === SKIP) {
                            return;
                        }
                        // TODO: propDef.jsonname could be a transform function on
                        // key
                        target[key] = jsonValue;
                    }
                }
            }
        }
    }

    var Context = /** @class */ (function () {
        function Context(parentContext, modelSchema, json, onReadyCb, customArgs) {
            this.parentContext = parentContext;
            this.modelSchema = modelSchema;
            this.json = json;
            this.onReadyCb = onReadyCb;
            this.isRoot = !parentContext;
            this.pendingCallbacks = 0;
            this.pendingRefsCount = 0;
            this.target = undefined; // always set this property using setTarget
            this.hasError = false;
            if (!parentContext) {
                this.rootContext = this;
                this.args = customArgs;
                this.pendingRefs = {};
                this.resolvedRefs = {};
            }
            else {
                this.rootContext = parentContext.rootContext;
                this.args = parentContext.args;
            }
        }
        Context.prototype.createCallback = function (fn) {
            var _this = this;
            this.pendingCallbacks++;
            // once: defend against user-land calling 'done' twice
            return once(function (err, value) {
                if (err) {
                    if (!_this.hasError) {
                        _this.hasError = true;
                        _this.onReadyCb(err);
                        Context.rootContextCache.delete(_this);
                    }
                }
                else if (!_this.hasError) {
                    fn(value);
                    if (--_this.pendingCallbacks === _this.pendingRefsCount) {
                        if (_this.pendingRefsCount > 0) {
                            // all pending callbacks are pending reference resolvers. not good.
                            _this.onReadyCb(new Error("Unresolvable references in json: \"".concat(Object.keys(_this.pendingRefs)
                                .filter(function (uuid) { return _this.pendingRefs[uuid].length > 0; })
                                .join(
                            // prettier-ignore
                            "\", \""), "\"")));
                            Context.rootContextCache.delete(_this);
                        }
                        else {
                            _this.onReadyCb(null, _this.target);
                            Context.rootContextCache.delete(_this);
                        }
                    }
                }
            });
        };
        // given an object with uuid, modelSchema, callback, awaits until the given uuid is available
        // resolve immediately if possible
        Context.prototype.await = function (modelSchema, uuid, callback) {
            invariant(this.isRoot, "await can only be called on the root context");
            if (uuid in this.resolvedRefs) {
                var match = this.resolvedRefs[uuid].filter(function (resolved) {
                    return isAssignableTo(resolved.modelSchema, modelSchema);
                })[0];
                if (match)
                    return void callback(null, match.value);
            }
            this.pendingRefsCount++;
            if (!this.pendingRefs[uuid])
                this.pendingRefs[uuid] = [];
            this.pendingRefs[uuid].push({
                modelSchema: modelSchema,
                uuid: uuid,
                callback: callback,
            });
        };
        // given a model schema, uuid and value, resolve all references that were looking for this object
        Context.prototype.resolve = function (modelSchema, uuid, value) {
            invariant(this.isRoot, "resolve can only called on the root context");
            if (!this.resolvedRefs[uuid])
                this.resolvedRefs[uuid] = [];
            this.resolvedRefs[uuid].push({
                modelSchema: modelSchema,
                value: value,
            });
            if (uuid in this.pendingRefs) {
                for (var i = this.pendingRefs[uuid].length - 1; i >= 0; i--) {
                    var opts = this.pendingRefs[uuid][i];
                    if (isAssignableTo(modelSchema, opts.modelSchema)) {
                        this.pendingRefs[uuid].splice(i, 1);
                        this.pendingRefsCount--;
                        opts.callback(null, value);
                    }
                }
            }
        };
        // set target and update root context cache
        Context.prototype.setTarget = function (target) {
            if (this.isRoot && this.target) {
                Context.rootContextCache.delete(this.target);
            }
            this.target = target;
            Context.rootContextCache.set(this.target, this);
        };
        // call all remaining reference lookup callbacks indicating an error during ref resolution
        Context.prototype.cancelAwaits = function () {
            var _this = this;
            invariant(this.isRoot, "cancelAwaits can only be called on the root context");
            Object.keys(this.pendingRefs).forEach(function (uuid) {
                _this.pendingRefs[uuid].forEach(function (refOpts) {
                    _this.pendingRefsCount--;
                    refOpts.callback(new Error("Reference resolution canceled for " + uuid));
                });
            });
            this.pendingRefs = {};
            this.pendingRefsCount = 0;
        };
        Context.getTargetContext = function (target) {
            return Context.rootContextCache.get(target);
        };
        Context.rootContextCache = new WeakMap();
        return Context;
    }());
    /**
     * @deprecated Use `Context.getTargetContext(target)` directly.
     * @param target
     * @returns
     */
    function getTargetContext(target) {
        return Context.getTargetContext(target);
    }

    /*
     * Deserialization
     */
    function schemaHasAlias(schema, name) {
        for (var key in schema.props) {
            var propSchema = schema.props[key];
            if (typeof propSchema === "object" && propSchema.jsonname === name)
                return true;
        }
        return false;
    }
    function deserializeStarProps(context, schema, propDef, obj, json) {
        var _loop_1 = function (key) {
            if (!(key in schema.props) && !schemaHasAlias(schema, key)) {
                var jsonValue = json[key];
                if (propDef === true) {
                    // when deserializing we don't want to silently ignore 'unparseable data' to avoid
                    // confusing bugs
                    invariant(isPrimitive(jsonValue), "encountered non primitive value while deserializing '*' properties in property '".concat(key, "': ").concat(jsonValue));
                    obj[key] = jsonValue;
                }
                else if (propDef && (!propDef.pattern || propDef.pattern.test(key))) {
                    propDef.deserializer(jsonValue, 
                    // for individual props, use root context based callbacks
                    // this allows props to complete after completing the object itself
                    // enabling reference resolving and such
                    context.rootContext.createCallback(function (r) { return r !== SKIP && (obj[key] = r); }), context);
                }
            }
        };
        for (var key in json) {
            _loop_1(key);
        }
    }
    function identifyActualSchema(json, baseSchema) {
        var _a;
        if ((_a = baseSchema.subSchemas) === null || _a === void 0 ? void 0 : _a.length) {
            for (var _i = 0, _b = baseSchema.subSchemas; _i < _b.length; _i++) {
                var subSchema = _b[_i];
                if (subSchema.discriminator) {
                    if (subSchema.discriminator.isActualType(json)) {
                        return subSchema;
                    }
                    var subtypeSchema = identifyActualSchema(json, subSchema);
                    // If we got subSchema back -- ignore it, because we've checked its discriminator already.
                    if (subtypeSchema !== subSchema) {
                        return subtypeSchema;
                    }
                }
            }
        }
        // If we can't find a specific schema we go with the base.
        return baseSchema;
    }
    function deserialize(clazzOrModelSchema, json, callback, customArgs) {
        if (callback === void 0) { callback = GUARDED_NOOP; }
        invariant(arguments.length >= 2, "deserialize expects at least 2 arguments");
        var schema = getDefaultModelSchema(clazzOrModelSchema);
        invariant(isModelSchema(schema), "first argument should be model schema");
        if (Array.isArray(json)) {
            var items_1 = [];
            parallel(json, function (childJson, itemDone) {
                var instance = deserializeObjectWithSchema(undefined, schema, childJson, itemDone, customArgs);
                // instance is created synchronously so can be pushed
                items_1.push(instance);
            }, callback);
            return items_1;
        }
        else {
            return deserializeObjectWithSchema(undefined, schema, json, callback, customArgs);
        }
    }
    function deserializeObjectWithSchema(parentContext, modelSchema, json, callback, customArgs) {
        if (json === null || json === undefined || typeof json !== "object")
            return void callback(null, null);
        var actualSchema = identifyActualSchema(json, modelSchema);
        var context = new Context(parentContext, actualSchema, json, callback, customArgs);
        var target = actualSchema.factory(context);
        // todo async invariant
        invariant(!!target, "No object returned from factory");
        // TODO: make invariant?            invariant(schema.extends ||
        // !target.constructor.prototype.constructor.serializeInfo, "object has a serializable
        // supertype, but modelschema did not provide extends clause")
        context.setTarget(target);
        var lock = context.createCallback(GUARDED_NOOP);
        deserializePropsWithSchema(context, actualSchema, json, target);
        lock();
        return target;
    }
    var onBeforeDeserialize = function (callback, jsonValue, jsonParentValue, propNameOrIndex, context, propDef) {
        if (propDef && typeof propDef.beforeDeserialize === "function") {
            propDef.beforeDeserialize(callback, jsonValue, jsonParentValue, propNameOrIndex, context, propDef);
        }
        else {
            callback(null, jsonValue);
        }
    };
    var onAfterDeserialize = function (callback, err, newValue, jsonValue, jsonParentValue, propNameOrIndex, context, propDef) {
        if (propDef && typeof propDef.afterDeserialize === "function") {
            propDef.afterDeserialize(callback, err, newValue, jsonValue, jsonParentValue, propNameOrIndex, context, propDef);
        }
        else {
            callback(err, newValue);
        }
    };
    function deserializePropsWithSchema(context, modelSchema, json, target) {
        var _a;
        if (modelSchema.extends)
            deserializePropsWithSchema(context, modelSchema.extends, json, target);
        function deserializeProp(propDef, jsonValue, propName) {
            var whenDone = context.rootContext.createCallback(function (r) { return r !== SKIP && (target[propName] = r); });
            propDef.deserializer(jsonValue, 
            // for individual props, use root context based callbacks
            // this allows props to complete after completing the object itself
            // enabling reference resolving and such
            function (err, newValue) {
                return onAfterDeserialize(whenDone, err, newValue, jsonValue, json, propName, context, propDef);
            }, context, target[propName] // initial value
            );
        }
        var _loop_2 = function (key) {
            var propDef = modelSchema.props[key];
            if (!propDef)
                return { value: void 0 };
            if (key === "*") {
                deserializeStarProps(context, modelSchema, propDef, target, json);
                return { value: void 0 };
            }
            if (propDef === true)
                propDef = _defaultPrimitiveProp;
            var jsonAttr = (_a = propDef.jsonname) !== null && _a !== void 0 ? _a : key;
            invariant("symbol" !== typeof jsonAttr, "You must alias symbol properties. prop = %l", key);
            var jsonValue = json[jsonAttr];
            var propSchema = propDef;
            var callbackDeserialize = function (err, jsonVal) {
                if (!err && jsonVal !== undefined) {
                    deserializeProp(propSchema, jsonVal, key);
                }
            };
            onBeforeDeserialize(callbackDeserialize, jsonValue, json, jsonAttr, context, propDef);
        };
        for (var _i = 0, _b = Object.keys(modelSchema.props); _i < _b.length; _i++) {
            var key = _b[_i];
            var state_1 = _loop_2(key);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }

    /**
     * `object` indicates that this property contains an object that needs to be (de)serialized
     * using its own model schema.
     *
     * N.B. mind issues with circular dependencies when importing model schema's from other files! The module resolve algorithm might expose classes before `createModelSchema` is executed for the target class.
     *
     * @example
     * class SubTask {}
     * class Todo {}
     *
     * createModelSchema(SubTask, {
     *     title: true,
     * })
     * createModelSchema(Todo, {
     *     title: true,
     *     subTask: object(SubTask),
     * })
     *
     * const todo = deserialize(Todo, {
     *     title: 'Task',
     *     subTask: {
     *         title: 'Sub task',
     *     },
     * })
     *
     * @param modelSchema to be used to (de)serialize the object
     * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
     */
    function object(modelSchema, additionalArgs) {
        invariant(typeof modelSchema === "object" || typeof modelSchema === "function", "No modelschema provided. If you are importing it from another file be aware of circular dependencies.");
        var result = {
            serializer: function (item) {
                var actualSchema = getDefaultModelSchema(item) || getDefaultModelSchema(modelSchema);
                invariant(isModelSchema(actualSchema), "expected modelSchema, got ".concat(actualSchema));
                if (item === null || item === undefined)
                    return item;
                return serialize(actualSchema, item);
            },
            deserializer: function (childJson, done, context) {
                modelSchema = getDefaultModelSchema(modelSchema);
                invariant(isModelSchema(modelSchema), "expected modelSchema, got ".concat(modelSchema));
                if (childJson === null || childJson === undefined)
                    return void done(null, childJson);
                return void deserializeObjectWithSchema(context, modelSchema, childJson, done, undefined);
            },
        };
        return processAdditionalPropArgs(result, additionalArgs);
    }

    function serializeAll(targetOrPattern, propertyType) {
        var propSchema;
        if (arguments.length === 1) {
            propSchema = true;
            return decorator(targetOrPattern);
        }
        else {
            invariant(isRegExp(targetOrPattern), "@serializeAll pattern doesn't have test");
            if (typeof propertyType === "function") {
                propertyType = object(propertyType);
            }
            if (true === propertyType) {
                propertyType = _defaultPrimitiveProp;
            }
            invariant(isPropSchema(propertyType), "couldn't resolve schema");
            propSchema = Object.assign({}, propertyType, {
                pattern: targetOrPattern,
            });
        }
        function decorator(target) {
            invariant(typeof target === "function", "@serializeAll can only be used as class decorator");
            var info = getDefaultModelSchema(target);
            if (!info) {
                info = createModelSchema(target, {});
                setDefaultModelSchema(target, info);
            }
            info.props["*"] = propSchema;
            return target;
        }
        return decorator;
    }

    /**
     * A simple util that retrieve the existing schema or create a default one.
     * @param src
     * @returns
     */
    var getOrCreateSchema = function (src) {
        if (isModelSchema(src)) {
            return src;
        }
        else {
            var schema = getDefaultModelSchema(src);
            if (!schema) {
                schema = createModelSchema(src, {});
            }
            return schema;
        }
    };

    /**
     * Sometimes, when working with schema hierarchies, we may want to deserialize an object to
     * a specific sub-schema. The `subSchema` decorator is used to handle such scenario.
     * What schema is picked among those available is decided using a "discriminator". The
     * discriminator can be a string (which is added to the serialized object) or a object
     * containing callbacks allowing for more complex behaviour.
     *
     *
     * @example
     * ```ts
     *   class Todo {
     *      @serializable
     *       id: string;
     *
     *       @serializable
     *       text: string;
     *   }
     *
     *   @subSchema("picture")
     *   class PictureTodo extends Todo {
     *       @serializable
     *       pictureUrl: string;
     *   }
     *
     *   const ser = serialize(Object.assign(new PictureTodo(), {
     *       id: "pic1",
     *       text: "Lorem Ipsum",
     *       pictureUrl:"foobar",
     *   }));
     *   // ser now holds an object like the following result
     *   // {
     *   //    id: "pic1",
     *   //    _type: "picture"
     *   //    text: "Lorem Ipsum",
     *   //    pictureUrl:"foobar",
     *   // }
     *   const deser = deserialize(Todo, ser);
     *   console.log(deser instanceof PictureTodo); // true
     * ```
     *
     * @example
     * Using the `parent` argument it's possible to specify the subschema parent instead
     * of relying on auto-detention.
     * ```ts
     *   class Todo {
     *      @serializable
     *       id: string;
     *
     *       @serializable
     *       text: string;
     *   }
     *
     *   @subSchema("picture")
     *   class PictureTodo extends Todo {
     *       @serializable
     *       pictureUrl: string;
     *   }
     *
     *   @subSchema("betterPicture", Todo)
     *   class BetterPictureTodo extends PictureTodo {
     *       @serializable
     *       altText: string;
     *   }
     *
     *
     *   const ser = serialize(Object.assign(new BetterPictureTodo(), {
     *       id: "pic1",
     *       text: "Lorem Ipsum",
     *       pictureUrl:"foobar",
     *       altText: "Alt text",
     *   }));
     *   // ser now holds an object like the following result
     *   // {
     *   //    id: "pic1",
     *   //    _type: "betterPicture"
     *   //    text: "Lorem Ipsum",
     *   //    pictureUrl:"foobar",
     *   //    altText: "Alt text",
     *   // }
     *   const deser = deserialize(Todo, ser);
     *   console.log(deser instanceof BetterPictureTodo); // true
     *   console.log(deser instanceof PictureTodo); // true
     *
     *   const ser2 = serialize(Object.assign(new PictureTodo(), {
     *       id: "pic2",
     *       text: "Lorem Ipsum",
     *       pictureUrl:"foobar",
     *   }));
     *   // ser2 now holds an object like the following result
     *   // {
     *   //    id: "pic2",
     *   //    _type: "picture"
     *   //    text: "Lorem Ipsum",
     *   //    pictureUrl:"foobar",
     *   // }
     *   const deser2 = deserialize(Todo, ser2);
     *   console.log(deser2 instanceof BetterPictureTodo); // false
     *   console.log(deser2 instanceof PictureTodo); // true
     * ```
     *
     * @param discriminator An object providing the discriminator logic or a string/number
     * that will be stored into the `_type` attribute.
     * @param parent When there are multiple levels of hierarchy involved you may provide this
     * argument to indicate the main schema used for deserialization. When not give the parent
     * schema is inferred as the direct parent (the class/schema that is extended).
     *
     * @returns
     */
    function subSchema(discriminator, parent) {
        return function (target) {
            var _a;
            var childSchema = getOrCreateSchema(target);
            invariant(childSchema === null || childSchema === void 0 ? void 0 : childSchema.extends, "Can not apply subSchema on a schema not extending another one.");
            var parentSchema = getOrCreateSchema(parent || childSchema.extends);
            parentSchema.subSchemas = (_a = parentSchema.subSchemas) !== null && _a !== void 0 ? _a : [];
            parentSchema.subSchemas.push(childSchema);
            if (typeof discriminator === "object") {
                childSchema.discriminator = discriminator;
            }
            else {
                childSchema.discriminator = {
                    isActualType: function (src) {
                        return src[DEFAULT_DISCRIMINATOR_ATTR] === discriminator;
                    },
                    storeDiscriminator: function (result) {
                        result[DEFAULT_DISCRIMINATOR_ATTR] = discriminator;
                    },
                };
            }
            return target;
        };
    }

    /*
     * Deserialization
     */
    /**
     * Cancels an asynchronous deserialization or update operation for the specified target object.
     * @param instance object that was previously returned from deserialize or update method
     */
    function cancelDeserialize(instance) {
        invariant(typeof instance === "object" && instance && !Array.isArray(instance), "cancelDeserialize needs an object");
        var context = getTargetContext(instance);
        if (context) {
            context.cancelAwaits();
        }
    }

    /*
     * Update
     */
    function update() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var modelSchema;
        if (typeof args[0] === "function" || isModelSchema(args[0])) {
            // First overload
            modelSchema = getDefaultModelSchema(args[0]);
            args.shift();
        }
        else {
            modelSchema = getDefaultModelSchema(args[0]);
        }
        var target = args[0], json = args[1], callback = args[2], customArgs = args[3];
        invariant(isModelSchema(modelSchema), "update failed to determine schema");
        invariant(typeof target === "object" && target && !Array.isArray(target), "update needs an object");
        var context = new Context(undefined, modelSchema, json, callback || GUARDED_NOOP, customArgs);
        context.setTarget(target);
        var lock = context.createCallback(GUARDED_NOOP);
        var result = deserializePropsWithSchema(context, modelSchema, json, target);
        lock();
        return result;
    }

    var defaultRegisterFunction = function (id, value, context) {
        context.rootContext.resolve(context.modelSchema, id, context.target);
    };
    function identifier(arg1, arg2) {
        var registerFn;
        var additionalArgs;
        if (typeof arg1 === "function") {
            registerFn = arg1;
            additionalArgs = arg2;
        }
        else {
            additionalArgs = arg1;
        }
        invariant(!additionalArgs || typeof additionalArgs === "object", "Additional property arguments should be an object, register function should be omitted or a funtion");
        var result = {
            identifier: true,
            serializer: _defaultPrimitiveProp.serializer,
            deserializer: function (jsonValue, done, context) {
                _defaultPrimitiveProp.deserializer(jsonValue, function (err, id) {
                    defaultRegisterFunction(id, context.target, context);
                    if (registerFn)
                        registerFn(id, context.target, context);
                    done(err, id);
                }, context);
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * Similar to primitive, serializes instances of Date objects
     *
     * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
     */
    function date(additionalArgs) {
        // TODO: add format option?
        var result = {
            serializer: function (value) {
                if (value === null || value === undefined)
                    return value;
                invariant(value instanceof Date, "Expected Date object");
                return value.getTime();
            },
            deserializer: function (jsonValue, done) {
                if (jsonValue === null || jsonValue === undefined)
                    return void done(null, jsonValue);
                return void done(null, new Date(jsonValue));
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * Alias indicates that this model property should be named differently in the generated json.
     * Alias should be the outermost propschema.
     *
     * @example
     * createModelSchema(Todo, {
     *     title: alias('task', primitive()),
     * })
     *
     * serialize(new Todo('test')) // { "task": "test" }
     *
     * @param name name of the json field to be used for this property
     * @param propSchema propSchema to (de)serialize the contents of this field
     */
    function alias(name, propSchema) {
        invariant(name && typeof name === "string", "expected prop name as first argument");
        propSchema = !propSchema || propSchema === true ? _defaultPrimitiveProp : propSchema;
        invariant(isPropSchema(propSchema), "expected prop schema as second argument");
        invariant(!isAliasedPropSchema(propSchema), "provided prop is already aliased");
        return {
            jsonname: name,
            serializer: propSchema.serializer,
            deserializer: propSchema.deserializer,
            identifier: isIdentifierPropSchema(propSchema) || undefined,
            beforeDeserialize: propSchema.beforeDeserialize,
            afterDeserialize: propSchema.afterDeserialize,
        };
    }

    function custom(serializer, deserializer, additionalArgs) {
        invariant(typeof serializer === "function", "first argument should be function");
        invariant(typeof deserializer === "function", "second argument should be a function or promise");
        var result = {
            serializer: serializer,
            deserializer: function (jsonValue, done, context, oldValue) {
                var result2 = deserializer(jsonValue, context, oldValue, done);
                // FIXME: checking for result === undefined instead of Function.length
                // would be nicer, but strictly speaking a breaking change.
                if (deserializer.length !== 4) {
                    done(null, result2);
                }
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * Optional indicates that this model property shouldn't be serialized if it isn't present.
     *
     * Note that if we use `optional` together with another prop schema such as `custom`,
     * the prop schema for `custom` will be applied first and the result of that serialization
     * will be used to feed into `optional`. As such, it might be better to just use `custom`
     * with `SKIP` to achieve the same goal.
     *
     * @example
     * createModelSchema(Todo, {
     *     title: optional(primitive()),
     *     user: optional(custom(value => value?.name, () => SKIP))
     * })
     *
     * serialize(new Todo()) // {}
     *
     * @param propSchema propSchema to (de)serialize the contents of this field
     */
    function optional(propSchema) {
        propSchema = !propSchema || propSchema === true ? _defaultPrimitiveProp : propSchema;
        invariant(isPropSchema(propSchema), "expected prop schema as second argument");
        var propSerializer = propSchema.serializer;
        invariant(typeof propSerializer === "function", "expected prop schema to have a callable serializer");
        var serializer = function (sourcePropertyValue, key, sourceObject) {
            var result = propSerializer(sourcePropertyValue, key, sourceObject);
            if (result === undefined) {
                return SKIP;
            }
            return result;
        };
        return Object.assign({}, propSchema, { serializer: serializer });
    }

    function createDefaultRefLookup(modelSchema) {
        return function resolve(uuid, cb, context) {
            context.rootContext.await(modelSchema, uuid, cb);
        };
    }
    function reference(target, lookupFnOrAdditionalPropArgs, additionalArgs) {
        invariant(!!target, "No modelSchema provided. If you are importing it from another file be aware of circular dependencies.");
        var lookupFn = "function" === typeof lookupFnOrAdditionalPropArgs
            ? lookupFnOrAdditionalPropArgs
            : undefined;
        additionalArgs =
            additionalArgs ||
                (lookupFn ? undefined : lookupFnOrAdditionalPropArgs);
        var initialized = false;
        var childIdentifierAttribute;
        function initialize() {
            initialized = true;
            invariant(typeof target !== "string" || typeof lookupFn === "function", "if the reference target is specified by attribute name, a lookup function is required");
            invariant(!lookupFn || typeof lookupFn === "function", "second argument should be a lookup function or additional arguments object");
            if (typeof target === "string") {
                childIdentifierAttribute = target;
            }
            else {
                var modelSchema = getDefaultModelSchema(target);
                invariant(isModelSchema(modelSchema), "expected model schema or string as first argument for 'ref', got ".concat(modelSchema));
                lookupFn = lookupFn || createDefaultRefLookup(modelSchema);
                childIdentifierAttribute = getIdentifierProp(modelSchema);
                invariant(!!childIdentifierAttribute, "provided model schema doesn't define an identifier() property and cannot be used by 'ref'.");
            }
        }
        var result = {
            serializer: function (item) {
                if (!initialized)
                    initialize();
                return item ? item[childIdentifierAttribute] : null;
            },
            deserializer: function (identifierValue, done, context) {
                if (!initialized)
                    initialize();
                if (identifierValue === null || identifierValue === undefined)
                    done(null, identifierValue);
                else
                    lookupFn(identifierValue, done, context);
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * List indicates that this property contains a list of things.
     * Accepts a sub model schema to serialize the contents
     *
     * @example
     * class SubTask {}
     * class Task {}
     * class Todo {}
     *
     * createModelSchema(SubTask, {
     *     title: true,
     * })
     * createModelSchema(Todo, {
     *     title: true,
     *     subTask: list(object(SubTask)),
     * })
     *
     * const todo = deserialize(Todo, {
     *     title: 'Task',
     *     subTask: [
     *         {
     *             title: 'Sub task 1',
     *         },
     *     ],
     * })
     *
     * @param propSchema to be used to (de)serialize the contents of the array
     * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
     */
    function list(propSchema, additionalArgs) {
        propSchema = propSchema || _defaultPrimitiveProp;
        invariant(isPropSchema(propSchema), "expected prop schema as first argument");
        invariant(!isAliasedPropSchema(propSchema), "provided prop is aliased, please put aliases first");
        var result = {
            serializer: function (ar) {
                if (ar === undefined) {
                    return SKIP;
                }
                if (ar === null) {
                    return null;
                }
                invariant(ar && "length" in ar && "map" in ar, "expected array (like) object");
                return ar.map(propSchema.serializer);
            },
            deserializer: function (jsonArray, done, context) {
                if (jsonArray === null)
                    return void done(null, jsonArray);
                if (!Array.isArray(jsonArray))
                    return void done("[serializr] expected JSON array");
                function processItem(jsonValue, onItemDone, itemIndex) {
                    function callbackBefore(err, value) {
                        if (!err) {
                            propSchema.deserializer(value, deserializeDone, context);
                        }
                        else {
                            onItemDone(err);
                        }
                    }
                    function deserializeDone(err, value) {
                        if (typeof propSchema.afterDeserialize === "function") {
                            onAfterDeserialize(onItemDone, err, value, jsonValue, jsonArray, itemIndex, context, propSchema);
                        }
                        else {
                            onItemDone(err, value);
                        }
                    }
                    onBeforeDeserialize(callbackBefore, jsonValue, jsonArray, itemIndex, context, propSchema);
                }
                parallel(jsonArray, processItem, function (err, result2) {
                    if (err) {
                        return void done(err);
                    }
                    done(undefined, result2.filter(function (x) { return SKIP !== x; }));
                });
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * Similar to list, but map represents a string keyed dynamic collection.
     * This can be both plain objects (default) or ES6 Map like structures.
     * This will be inferred from the initial value of the targetted attribute.
     *
     * For `Map`s which are not string-keyed, check out `mapAsArray`.
     *
     * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
     */
    function map(propSchema, additionalArgs) {
        propSchema = propSchema || _defaultPrimitiveProp;
        invariant(isPropSchema(propSchema), "expected prop schema as first argument");
        invariant(!isAliasedPropSchema(propSchema), "provided prop is aliased, please put aliases first");
        var result = {
            serializer: function (m) {
                invariant(m && typeof m === "object", "expected object or Map");
                var result2 = {};
                if (isMapLike(m)) {
                    m.forEach(function (value, key) { return (result2[key] = propSchema.serializer(value, key, m)); });
                }
                else {
                    for (var key in m)
                        result2[key] = propSchema.serializer(m[key], key, m);
                }
                return result2;
            },
            deserializer: function (jsonObject, done, context, oldValue) {
                if (!jsonObject || typeof jsonObject !== "object")
                    return void done("[serializr] expected JSON object");
                var keys = Object.keys(jsonObject);
                list(propSchema, additionalArgs).deserializer(keys.map(function (key) { return jsonObject[key]; }), function (err, values) {
                    if (err)
                        return void done(err);
                    var isMap = isMapLike(oldValue);
                    var newValue;
                    if (isMap) {
                        // if the oldValue is a map, we recycle it
                        // there are many variations and this way we don't have to
                        // know about the original constructor
                        oldValue.clear();
                        newValue = oldValue;
                    }
                    else
                        newValue = {};
                    for (var i = 0, l = keys.length; i < l; i++) {
                        if (isMap)
                            newValue.set(keys[i], values[i]);
                        else
                            newValue[keys[i]] = values[i];
                    }
                    done(null, newValue);
                }, context);
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * Similar to map, mapAsArray can be used to serialize a map-like collection where the key is
     * contained in the 'value object'. Example: consider Map<id: number, customer: Customer> where the
     * Customer object has the id stored on itself. mapAsArray stores all values from the map into an
     * array which is serialized. Deserialization returns a ES6 Map or plain object object where the
     * `keyPropertyName` of each object is used for keys. For ES6 maps this has the benefit of being
     * allowed to have non-string keys in the map. The serialized json also may be slightly more
     * compact.
     *
     * @param keyPropertyName - the property of stored objects used as key in the map
     * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
     */
    function mapAsArray(propSchema, keyPropertyName, additionalArgs) {
        propSchema = propSchema || _defaultPrimitiveProp;
        invariant(isPropSchema(propSchema), "expected prop schema as first argument");
        invariant(!!keyPropertyName, "expected key property name as second argument");
        var result = {
            serializer: function (m) {
                invariant(m && typeof m === "object", "expected object or Map");
                var result2 = [];
                if (isMapLike(m)) {
                    m.forEach(function (value, key) { return result2.push(propSchema.serializer(value, key, m)); });
                }
                else {
                    for (var key in m)
                        result2.push(propSchema.serializer(m[key], key, m));
                }
                return result2;
            },
            deserializer: function (jsonArray, done, context, oldValue) {
                list(propSchema, additionalArgs).deserializer(jsonArray, function (err, values) {
                    if (err)
                        return void done(err);
                    var oldValueIsMap = isMapLike(oldValue);
                    var newValue;
                    if (oldValueIsMap) {
                        oldValue.clear();
                        newValue = oldValue;
                    }
                    else {
                        newValue = {};
                    }
                    for (var i = 0, l = jsonArray.length; i < l; i++)
                        if (oldValueIsMap)
                            newValue.set(values[i][keyPropertyName], values[i]);
                        else
                            newValue[values[i][keyPropertyName].toString()] =
                                values[i];
                    done(null, newValue);
                }, context, undefined);
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    /**
     * Indicates that this field is only need to putted in the serialized json or
     * deserialized instance, without any transformations. Stay with its original value
     *
     * @example
     * createModelSchema(Model, {
     *     rawData: raw(),
     * })
     *
     * serialize(new Model({ rawData: { a: 1, b: [], c: {} } } }))
     * // { "rawData": { a: 1, b: [], c: {} } } }
     *
     * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
     */
    function raw(additionalArgs) {
        var result = {
            serializer: function (value) {
                return value;
            },
            deserializer: function (jsonValue, done) {
                return void done(null, jsonValue);
            },
        };
        result = processAdditionalPropArgs(result, additionalArgs);
        return result;
    }

    exports.DEFAULT_DISCRIMINATOR_ATTR = DEFAULT_DISCRIMINATOR_ATTR;
    exports.SKIP = SKIP;
    exports.alias = alias;
    exports.cancelDeserialize = cancelDeserialize;
    exports.createModelSchema = createModelSchema;
    exports.createSimpleSchema = createSimpleSchema;
    exports.custom = custom;
    exports.date = date;
    exports.deserialize = deserialize;
    exports.getDefaultModelSchema = getDefaultModelSchema;
    exports.identifier = identifier;
    exports.list = list;
    exports.map = map;
    exports.mapAsArray = mapAsArray;
    exports.object = object;
    exports.optional = optional;
    exports.primitive = primitive;
    exports.raw = raw;
    exports.reference = reference;
    exports.serializable = serializable;
    exports.serialize = serialize;
    exports.serializeAll = serializeAll;
    exports.setDefaultModelSchema = setDefaultModelSchema;
    exports.subSchema = subSchema;
    exports.update = update;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=serializr.umd.js.map
