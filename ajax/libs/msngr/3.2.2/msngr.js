/*
	main.js

	The main entry point for msngr.js. Covers internal and external interface generation,
	versioning (for programmatic access) and the core extend method.
*/
var msngr = msngr || (function() {
    "use strict";

    // Defaults for some internal functions
    var internal = {
        warnings: true
    };

    internal.config = { };

    // The main method for msngr uses the message object
    var external = function(topic, category, subcategory) {
        return internal.objects.message(topic, category, subcategory);
    };

    external.version = "3.2.2";

    var getType = function(input) {
        return Object.prototype.toString.call(input);
    };

    var extractFunction = function(input) {
        return input.bind({});
    };

    // Merge two inputs into one
    var twoMerge = function(input1, input2) {
        if (input1 === undefined || input1 === null) {
            return input2;
        }

        if (input2 === undefined || input2 === null) {
            return input1;
        }

        var result;
        var type1 = Object.prototype.toString.call(input1);
        var type2 = Object.prototype.toString.call(input2);

        if (type1 === "[object Object]" && type2 === "[object Object]") {
            // Object merging time!
            result = {};
            // Copy input1 into result
            for (var key in input1) {
                if (input1.hasOwnProperty(key)) {
                    result[key] = input1[key];
                }
            }
            for (var key in input2) {
                if (input2.hasOwnProperty(key)) {
                    if (Object.prototype.toString.call(input2[key]) === "[object Object]") {
                        if (result[key] === undefined) {
                            result[key] = {};
                        }
                        result[key] = external.merge(input1[key], input2[key]);
                    } else if (Object.prototype.toString.call(input1[key]) === "[object Array]" && Object.prototype.toString.call(input2[key]) === "[object Array]") {
                        result[key] = (input1[key] || []);
                        for (var i = 0; i < input2[key].length; ++i) {
                            if (result[key].indexOf(input2[key][i]) === -1) {
                                result[key].push(input2[key][i]);
                            }
                        }
                    } else {
                        result[key] = input2[key];
                    }
                }
            }
            return result;
        }

        if (type1 === "[object String]" && type2 === "[object String]") {
            result = input1 + input2;
            return result;
        }

        if (type1 === "[object Array]" && type2 === "[object Array]") {
            result = input1;
            for (var i = 0; i < input2.length; ++i) {
                if (result.indexOf(input2[i]) === -1) {
                    result.push(input2[i]);
                }
            }
            return result;
        }

        if (type1 === "[object Function]" && type2 === "[object Function]") {
            return (function(i1, i2, args) {
                return function() {
                    return external.merge(i1.apply(this, args), i2.apply(this, args));
                };
            }(input1, input2, arguments));
        }

        var similarObjectTypes = ["[object Function]", "[object Object]"];

        if (similarObjectTypes.indexOf(type1) !== -1 && similarObjectTypes.indexOf(type2) !== -1) {
            var method = (type1 === "[object Function]") ? input1 : input2;
            var props = (type1 === "[object Object]") ? input1 : input2;

            if (method !== undefined && props !== undefined) {
                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        method[key] = props[key];
                    }
                }
            }
            result = method;
            return result;
        }

        return result;
    };

    external.extend = function(obj, target) {
        target = (target || external);

        if (Object.prototype.toString.call(obj) === "[object Function]") {
            obj = obj.apply(this, [external, internal]);
        }

        target = external.merge(obj, target);

        return target;
    };

    external.merge = function() {
        var result;
        if (arguments.length > 0) {
            for (var i = 0; i < arguments.length; ++i) {
                result = twoMerge(result, arguments[i]);
            }
        }

        return result;
    };

    external.copy = function(obj) {
        if (obj === undefined || obj === null) {
            return obj;
        }
        var objType = getType(obj);
        if (["[object Object]", "[object Function]"].indexOf(objType) === -1) {
            return obj;
        }

        var result;
        if (getType(obj) === "[object Object]") {
            result = {};
        } else if (getType(obj) === "[object Function]") {
            result = extractFunction(obj)
        }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var keyType = getType(obj[key]);
                if (["[object Object]", "[object Function]"].indexOf(keyType) !== -1) {
                    result[key] = external.copy(obj[key]);
                } else {
                    result[key] = obj[key];
                }
            }
        }

        return result;
    };

    external.config = function(key, value) {
        if (value !== undefined) {
            internal.config[key] = external.merge((internal.config[key] || { }), external.copy(value));
        }
        return internal.config[key];
    };

    // Create a debug property to allow explicit exposure to the internal object structure.
    // This should only be used during unit test runs and debugging.
    Object.defineProperty(external, "debug", {
        set: function(value) {
            if (value === true) {
                external.internal = internal;
            } else if (value === false) {
                delete external.internal;
            }
        },
        get: function() {
            return (external.internal !== undefined)
        }
    });

    // This governs warning messages that some methods may spit into the console when warranted (du'h).
    Object.defineProperty(external, "warnings", {
        set: function(value) {
            internal.warnings = value;
        },
        get: function() {
            return internal.warnings;
        }
    });

    return external;
}());

msngr.extend((function(external, internal) {
    "use strict";

    return {
        argumentsToArray: function(args) {
            if (external.isArray(args)) {
                return args;
            }
            if (external.isArguments(args)) {
                return Array.prototype.slice.call(args, 0);
            }
            return [args];
        }
    };
}));

msngr.extend((function(external, internal) {
    "use strict";

    return {
        isHtmlElement: function(obj) {
            var t = this.getType(obj);
            return (t.indexOf("[object HTML") === 0) || (t.indexOf("[object global]") === 0);
        },
        isNodeList: function(obj) {
            return (this.getType(obj) === "[object NodeList]");
        },
        findElement: function(element, root) {
            var elms = external.findElements(element, root);
            if (elms !== undefined && elms.length > 0) {
                return elms[0];
            }

            return elms;
        },
        findElements: function(selector, root) {
            var elm;
            if (external.isHtmlElement(selector)) {
                elm = selector;
            }

            if (elm === undefined && external.isString(selector)) {
                var doc = root || document;
                var result = external.querySelectorAllWithEq(selector, doc);
                if (result !== null) {
                    elm = result;
                }
            }

            return elm;
        },
        getDomPath: function(element) {
            var node = external.findElement(element);
            // User gave us jack shit. What the hell, user? Return undefined!
            if (node === undefined) {
                return undefined;
            }

            // There is an id on a node which, by definition, must be unique. So return that!
            if (!external.isEmptyString(node.id)) {
                return "#" + node.id;
            }

            var path;
            var currentTag;
            var next = function(elm) {
                var parent = elm.parentNode;
                if (external.exist(parent)) {
                    currentTag = elm.tagName;
                    if (parent.childNodes.length > 1) {
                        for (var i = 0; i < parent.childNodes.length; ++i) {
                            if (parent.childNodes[i] === elm) {
                                // Found it!
                                currentTag = currentTag + ":eq(" + i + ")";
                                break;
                            }
                        }
                    }

                    if (external.isEmptyString(path)) {
                        path = currentTag;
                    } else {
                        path = currentTag + " > " + path;
                    }

                    if (external.exist(parent.parentNode)) {
                        next(parent);
                    }
                }
            };

            next(element);
            if (external.isEmptyString(path)) {
                node.id = external.id();
                path = "#" + node.id;;
            }

            return path;
        },
        querySelectorAllWithEq: function(selector, root) {
            if (selector === undefined) {
                return null;
            }
            var doc = root || document;
            var queue = [];
            var process = function(input) {
                if (input.indexOf(":eq(") === -1) {
                    return undefined;
                }

                var eqlLoc = input.indexOf(":eq(");
                var sel = input.substring(0, eqlLoc);
                var ind = input.substring((eqlLoc + 4), input.indexOf(")", eqlLoc));
                selector = input.substring(input.indexOf(")", eqlLoc) + 1, input.length).trim();

                if (sel.charAt(0) === ">") {
                    sel = sel.substring(1, sel.length);
                }

                if (selector.charAt(0) === ">") {
                    selector = selector.substring(1, selector.length);
                }

                queue.push({
                    selector: sel,
                    index: parseInt(ind, 10)
                });
            }
            while (selector.indexOf(":eq") !== -1) {
                process(selector);
            }

            var result;
            while (queue.length > 0) {
                var item = queue.shift();
                result = (result || doc).querySelectorAll(item.selector)[item.index];
            }

            if (selector.trim().length > 0) {
                return (result || doc).querySelectorAll(selector);
            }
            return [result];
        },
        querySelectorWithEq: function(selector, root) {
            return external.querySelectorAllWithEq(selector, root)[0];
        }
    };
}));

msngr.extend((function(external, internal) {
    "use strict";

    internal.InvalidParametersException = function(str, reason) {
        var m = {
            name: "InvalidParametersException",
            severity: "unrecoverable",
            message: ("Invalid parameters supplied to the {method} method".replace("{method}", str))
        };
        if (!external.isEmptyString(reason)) {
            m.message = m.message + " " + reason;
        }
        return m;
    };

    internal.ReservedKeywordsException = function(keyword) {
        return {
            name: "ReservedKeywordsException",
            severity: "unrecoverable",
            message: ("Reserved keyword {keyword} supplied as action.".replace("{keyword}", keyword))
        };
    };

    internal.MangledException = function(variable, method) {
        return {
            name: "MangledException",
            severity: "unrecoverable",
            message: ("The {variable} was unexpectedly mangled in {method}.".replace("{variable}", variable).replace("{method}", method))
        };
    };

    // This is an internal extension; do not export explicitly.
    return {};
}));

msngr.extend((function(external, internal) {
    "use strict";

    // This chunk of code is only for the browser as a setImmediate workaround
    if (typeof window !== "undefined" && typeof window.postMessage !== "undefined") {
        external.config("immediate", {
            channel: "__msngr_immediate"
        });

        var immediateQueue = [];

        window.addEventListener("message", function(event) {
            if (event.source === window && event.data === internal.config["immediate"].channel) {
                event.stopPropagation();
                if (immediateQueue.length > 0) {
                    immediateQueue.shift()();
                }
            }
        }, true);
    }

    var nowPerformance = function() {
        return performance.now();
    };

    var nowNode = function() {
        return (process.hrtime()[1] / 1000000);
    };

    var nowLegacy = function() {
        return Date.now();
    };

    var nowExec = undefined;
    var nowExecDebugLabel = "";
    var lastNow = undefined;
    var isBrowserCached;
    var immediateFn;

    return {
        id: function() {
            var d = external.now();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        now: function(noDuplicate) {
            if (nowExec === undefined) {
                if (typeof performance !== "undefined") {
                    nowExec = nowPerformance;
                    nowExecDebugLabel = "performance";
                } else if (typeof process !== "undefined") {
                    nowExec = nowNode;
                    nowExecDebugLabel = "node";
                } else {
                    nowExec = nowLegacy;
                    nowExecDebugLabel = "legacy";
                }
            }
            var now = nowExec();
            if (noDuplicate === true && lastNow === now) {
                return external.now(noDuplicate);
            }
            lastNow = now;
            return now;
        },
        removeFromArray: function(arr, value) {
            var inx = arr.indexOf(value);
            var endIndex = arr.length - 1;
            if (inx !== endIndex) {
                var temp = arr[endIndex];
                arr[endIndex] = arr[inx];
                arr[inx] = temp;
            }
            arr.pop();
        },
        deDupeArray: function(arr) {
            var hash = { };
            var result = [];
            var arrLength = arr.length;
            for (var i = 0; i < arrLength; ++i) {
                if (hash[arr[i]] === undefined) {
                    hash[arr[i]] = true;
                    result.push(arr[i]);
                }
            }

            return result;
        },
        isBrowser: function() {
            if (isBrowserCached === undefined) {
                isBrowserCached = (typeof XMLHttpRequest !== "undefined");
            }
            return isBrowserCached;
        },
        immediate: function(fn) {
            if (immediateFn === undefined) {
                if (typeof setImmediate !== "undefined") {
                    immediateFn = setImmediate;
                } else if (typeof window !== "undefined" && typeof window.postMessage !== "undefined") {
                    immediateFn = function(f) {
                        immediateQueue.push(f);
                        window.postMessage(internal.config["immediate"].channel, "*");
                    };
                } else {
                    immediateFn = function(f) {
                        setTimeout(f, 0);
                    };
                }
            }
            immediateFn(fn);
        }
    };
}));

msngr.extend((function(external, internal) {
    "use strict";

    internal.reiterativeValidation = function(validationMethod, inputs) {
        var result = false;
        if (external.exist(validationMethod) && external.exist(inputs)) {
            if (!external.isArray(inputs)) {
                inputs = [inputs];
            }
            for (var i = 0; i < inputs.length; ++i) {
                result = validationMethod.apply(this, [inputs[i]]);
                if (result === false) {
                    break;
                }
            }
        }
        return result;
    };

    return {
        getType: function(obj) {
            if (!external.exist(obj)) {
                return "" + obj;
            }
            return Object.prototype.toString.call(obj);
        },
        isArguments: function(obj) {
            return (external.getType(obj) === "[object Arguments]");
        },
        areArguments: function() {
            return internal.reiterativeValidation(external.isArguments, external.argumentsToArray(arguments));
        },
        isNullOrUndefined: function(obj) {
            return (obj === undefined || obj === null);
        },
        exist: function(obj) {
            return !external.isNullOrUndefined(obj);
        },
        exists: function() {
            return internal.reiterativeValidation(external.exist, external.argumentsToArray(arguments));
        },
        isString: function(str) {
            return (external.getType(str) === "[object String]");
        },
        areStrings: function() {
            return internal.reiterativeValidation(external.isString, external.argumentsToArray(arguments));
        },
        isDate: function(obj) {
            return (external.getType(obj) === "[object Date]");
        },
        areDates: function() {
            return internal.reiterativeValidation(external.isDate, external.argumentsToArray(arguments));
        },
        isArray: function(obj) {
            return (external.getType(obj) === "[object Array]");
        },
        areArrays: function() {
            return internal.reiterativeValidation(external.isArray, external.argumentsToArray(arguments));
        },
        isNumber: function(obj) {
            return (external.getType(obj) === "[object Number]");
        },
        areNumbers: function() {
            return internal.reiterativeValidation(external.isNumber, external.argumentsToArray(arguments));
        },
        isObject: function(obj) {
            return (external.getType(obj) === "[object Object]");
        },
        areObjects: function() {
            return internal.reiterativeValidation(external.isObject, external.argumentsToArray(arguments));
        },
        isFunction: function(func) {
            return (external.getType(func) === "[object Function]");
        },
        areFunctions: function() {
            return internal.reiterativeValidation(external.isFunction, external.argumentsToArray(arguments));
        },
        isEmptyString: function(str) {
            var isStr = external.isString(str);
            if (str === undefined || str === null || (isStr && str.toString().trim().length === 0)) {
                return true;
            }
            return false;
        },
        areEmptyStrings: function() {
            return internal.reiterativeValidation(external.isEmptyString, external.argumentsToArray(arguments));
        }
    };
}));

msngr.extend((function(external, internal) {
    "use strict";

    internal.objects = internal.objects || {};
    internal.objects.executer = function(methods) {

        if (!external.exist(methods) || !external.isArray(methods)) {
            throw internal.InvalidParametersException("executor");
        }

        // Support passing in just methods
        for (var i = 0; i < methods.length; ++i) {
            if (external.isFunction(methods[i])) {
                methods[i] = {
                    method: methods[i]
                };
            }
        }

        var exec = function(method, params, ctx, done) {
            external.immediate(function() {
                var asyncFlag = false;
                var asyncFunc = function() {
                    asyncFlag = true;
                    return function(result) {
                        done.apply(ctx, [result]);
                    };
                }

                if (!external.isArray(params)) {
                    if (external.exist(params)) {
                        params = [params];
                    } else {
                        params = [];
                    }
                }
                params.push(asyncFunc);
                var syncResult = method.apply(ctx || this, params);
                if (asyncFlag !== true) {
                    done.apply(ctx, [syncResult]);
                }
            });
        };

        return {
            parallel: function(done) {
                var results = [];
                var executed = 0;

                if (methods.length === 0 && external.exist(done)) {
                    return done.apply(context, [
                        []
                    ]);
                }

                for (var i = 0; i < methods.length; ++i) {
                    var method = methods[i].method;
                    var params = methods[i].params;
                    var context = methods[i].context;

                    (function(m, p, c) {
                        exec(m, p, c, function(result) {
                            if (external.exist(result)) {
                                results.push(result);
                            }

                            ++executed;

                            if (executed === methods.length && external.exist(done)) {
                                done.apply(context, [results]);
                            }
                        });
                    }(method, params, context));
                }
            }
        };
    };

    // This is an internal extension; do not export explicitly.
    return {
        executer: internal.objects.executer
    };
}));

msngr.extend((function(external, internal) {
    "use strict";

    internal.objects = internal.objects || {};
    internal.objects.memory = function() {

        // Index for id to message objects
        var id_to_message = {};

        // Direct index (no partials) for message
        var index = { };

        // Message index count
        var index_count = 0;

        var mem = {
            index: function(message) {
                if (external.exist(message) && external.exist(message.topic)) {
                    var uuid = external.id();
                    id_to_message[uuid] = external.copy(message);

                    if (!external.exist(index[message.topic])) {
                        index[message.topic] = {
                            uuids: [],
                            category: { }
                        };
                    }

                    if (!external.exist(index[message.topic].category[message.category])) {
                        index[message.topic].category[message.category] = {
                            uuids: [],
                            subcategory: { }
                        }
                    }

                    if (!external.exist(index[message.topic].category[message.category].subcategory[message.subcategory])) {
                        index[message.topic].category[message.category].subcategory[message.subcategory] = {
                            uuids: []
                        }
                    }


                    if (!external.exist(message.category) && !external.exist(message.subcategory)) {
                        index[message.topic].uuids.push(uuid);
                    }

                    if (external.exist(message.category) && !external.exist(message.subcategory)) {
                        index[message.topic].category[message.category].uuids.push(uuid);
                    }

                    if (external.exist(message.category) && external.exist(message.subcategory)) {
                        index[message.topic].category[message.category].subcategory[message.subcategory].uuids.push(uuid);
                    }

                    index_count++;

                    return uuid;
                }
                return undefined;
            },
            delete: function(uuid) {
                if (external.exist(uuid) && external.exist(id_to_message[uuid])) {
                    var message = id_to_message[uuid];

                    external.removeFromArray(index[message.topic].uuids, uuid);
                    external.removeFromArray(index[message.topic].category[message.category].uuids, uuid);
                    external.removeFromArray(index[message.topic].category[message.category].subcategory[message.subcategory].uuids, uuid);

                    delete id_to_message[uuid];
                    index_count--;

                    return true;
                }
                return false;
            },
            query: function(message) {
                var result = [];
                if (external.exist(message) && external.exist(message.topic) && external.exist(index[message.topic])) {
                    var indexTopic = index[message.topic];
                    var indexTopicCategory = ((indexTopic || { }).category || { })[message.category];
                    var indexTopicCategorySubcategory = ((indexTopicCategory || { }).subcategory || { })[message.subcategory];

                    result = result.concat(indexTopic.uuids || []);
                    result = result.concat((indexTopicCategory || { }).uuids || []);
                    result = result.concat((indexTopicCategorySubcategory || { }).uuids || []);
                }

                return external.deDupeArray(result);
            },
            clear: function() {
                // Index for id to message objects
                id_to_message = {};

                // Direct index (no partials) for message
                index = { };

                index_count = 0;

                return true;
            }
        };

        Object.defineProperty(mem, "count", {
            get: function() {
                return index_count;
            }
        });

        return mem;
    };

    // This is an internal extension; do not export explicitly.
    return {};
}));

/*
    ./objects/message.js

    The primary object of msngr; handles all message sending, receiving and binding.
*/
msngr.extend((function(external, internal) {
    "use strict";

    internal.objects = internal.objects || {};
    internal.option = function(opt, handler) {
        internal.option[opt] = handler;
    };

    var messageIndex = internal.objects.memory();
    var payloadIndex = internal.objects.memory();

    var handlers = {};
    var handlerCount = 0;

    var payloads = {};
    var payloadCount = 0;

    var boundDOMPaths = {};
    var boundCount = 0;

    Object.defineProperty(internal, "handlerCount", {
        get: function() {
            return handlerCount;
        }
    });

    Object.defineProperty(internal, "boundCount", {
        get: function() {
            return boundCount;
        }
    });

    Object.defineProperty(internal, "payloadCount", {
        get: function() {
            return payloadCount;
        }
    });

    internal.reset = function() {
        handlers = {};
        boundDOMPaths = {};
        handlerCount = 0;
        boundCount = 0;
        messageIndex.clear();
        payloadIndex.clear();
        payloads = {};
        payloadCount = 0;
    };

    internal.processOpts = function(opts, message, payload, callback) {
        var optProcessors = [];
        for (var key in opts) {
            if (opts.hasOwnProperty(key) && external.exist(internal.option[key])) {
                optProcessors.push({
                    method: internal.option[key],
                    params: [message, payload, opts]
                });
            }
        }

        // Short circuit for no options
        if (optProcessors.length === 0) {
            return callback.apply(this, [payload]);
        }

        // Long circuit to do stuff (du'h)
        var execs = internal.objects.executer(optProcessors);

        execs.parallel(function(results) {
            var result = payload;
            if (external.exist(results) && results.length > 0) {
                for (var i = 0; i < results.length; ++i) {
                    if (external.exist(results[i])) {
                        result = external.merge(results[i], result);
                    }
                }
            }
            callback.apply(this, [result]);
        });
    };

    internal.domListener = function(event) {
        var node = this;
        var path = external.getDomPath(node);

        if (external.exist(boundDOMPaths[path])) {
            if (external.exist(boundDOMPaths[path][event.type])) {
                return boundDOMPaths[path][event.type].emit();
            }
        }
    };

    internal.objects.message = function(topic, category, subcategory) {
        var msg = undefined;
        if (!external.exist(topic)) {
            throw internal.InvalidParametersException("msngr");
        }

        if (!external.isObject(topic) && !external.isString(topic)) {
            throw internal.InvalidParametersException("msngr");
        }

        if (external.isEmptyString(topic)) {
            throw internal.InvalidParametersException("msngr");
        }

        if (external.isObject(topic)) {
            msg = external.copy(topic);
        } else {
            msg = {};
            msg.topic = topic;

            if (!external.isEmptyString(category)) {
                msg.category = category;
            }

            if (!external.isEmptyString(subcategory)) {
                msg.subcategory = subcategory;
            }
        }

        // Normalize message to lowercase
        msg.topic = (msg.topic) ? msg.topic.toLowerCase() : msg.topic;
        msg.category = (msg.category) ? msg.category.toLowerCase() : msg.category;
        msg.subcategory = (msg.subcategory) ? msg.subcategory.toLowerCase() : msg.subcategory;

        var options = {};
        var counts = {
            emits: 0,
            persists: 0,
            options: 0,
            ons: 0,
            onces: 0,
            binds: 0
        };

        var explicitEmit = function(payload, uuids, callback) {
            var uuids = uuids || messageIndex.query(msg) || [];

            internal.processOpts(options, msg, payload, function(result) {
                var methods = [];
                var toDrop = [];
                for (var i = 0; i < uuids.length; ++i) {
                    var obj = handlers[uuids[i]];
                    methods.push({
                        method: obj.handler,
                        params: [result, msg]
                    });

                    if (obj.once === true) {
                        toDrop.push(obj.handler);
                    }
                }

                var execs = internal.objects.executer(methods);

                for (var i = 0; i < toDrop.length; ++i) {
                    msgObj.drop(toDrop[i]);
                }

                execs.parallel(callback);

            });
        };

        var fetchPersisted = function() {
            var uuids = payloadIndex.query(msg);

            var fpay;

            if (uuids.length === 0) {
                return undefined;
            }

            if (uuids.length === 1) {
                return payloads[uuids[0]];
            }

            for (var i = 0; i < uuids.length; ++i) {
                fpay = external.extend(innerPay, fpay);
            }

            return fpay;
        };

        var msgObj = {
            option: function(key, value) {
                if (!external.exist(key) || !external.isString(key)) {
                    throw internal.InvalidParametersException("option");
                }

                options[key] = value;
                counts.options = counts.options + 1;

                return msgObj;
            },
            emit: function(payload, callback) {
                if (external.isFunction(payload)) {
                    callback = payload;
                    payload = undefined;
                }
                explicitEmit(payload, undefined, callback);
                counts.emits = counts.emits + 1;

                return msgObj;
            },
            persist: function(payload) {
                if (payload === undefined) {
                    payload = null;
                }

                var uuids = payloadIndex.query(msg);
                if (uuids.length === 0) {
                    var uuid = payloadIndex.index(msg);
                    payloads[uuid] = payload;
                    uuids = [uuid];
                } else {
                    for (var i = 0; i < uuids.length; ++i) {
                        payloads[uuids[i]] = external.merge(payload, payloads[uuids[i]]);
                    }
                }

                var fpay = fetchPersisted();

                ++payloadCount;

                counts.persists = counts.persists + 1;

                return msgObj.emit(fpay);
            },
            cease: function() {
                var uuids = payloadIndex.query(msg);

                for (var i = 0; i < uuids.length; ++i) {
                    delete payloads[uuids[i]];
                    --payloadCount;
                }

                return msgObj;
            },
            on: function(handler) {
                var uuid = messageIndex.index(msg);
                handlers[uuid] = {
                    handler: handler,
                    context: (msg.context || this),
                    once: false
                };
                handlerCount++;

                var payload = fetchPersisted();
                if (payload !== undefined) {
                    explicitEmit(payload, [uuid], undefined);
                }
                counts.ons = counts.ons + 1;

                return msgObj;
            },
            once: function(handler) {
                var uuid = messageIndex.index(msg);
                handlers[uuid] = {
                    handler: handler,
                    context: (msg.context || this),
                    once: true
                };
                handlerCount++;

                var payload = fetchPersisted();
                if (payload !== undefined) {
                    explicitEmit(payload, [uuid], undefined);
                }
                counts.onces = counts.onces + 1;

                return msgObj;
            },
            bind: function(element, event) {
                var node = external.findElement(element);
                var path = external.getDomPath(node);

                if (!external.exist(boundDOMPaths[path])) {
                    boundDOMPaths[path] = {};
                }

                boundDOMPaths[path][event] = msgObj;

                node.addEventListener(event, internal.domListener);

                ++boundCount;
                counts.binds = counts.binds + 1;

                return msgObj;
            },
            drop: function(handler) {
                var uuids = messageIndex.query(msg);
                if (uuids.length > 0) {
                    for (var i = 0; i < uuids.length; ++i) {
                        var uuid = uuids[i];
                        if (handlers[uuid].handler === handler) {
                            delete handlers[uuid];
                            handlerCount--;

                            messageIndex.delete(uuid);
                        }
                    }
                }

                return msgObj;
            },
            unbind: function(element, event) {
                var node = external.findElement(element);
                var path = external.getDomPath(node);

                if (external.exist(boundDOMPaths[path])) {
                    if (external.exist(boundDOMPaths[path][event])) {
                        node.removeEventListener(event, internal.domListener);

                        delete boundDOMPaths[path][event];

                        --boundCount;
                    }
                }

                return msgObj;
            },
            dropAll: function() {
                var uuids = messageIndex.query(msg);
                if (uuids.length > 0) {
                    for (var i = 0; i < uuids.length; ++i) {
                        var uuid = uuids[i];
                        delete handlers[uuid];
                        handlerCount--;

                        messageIndex.delete(uuid);
                    }
                }

                return msgObj;
            }
        };

        // Expose the raw message object itself via a message property.
        // Do not allow modification.
        Object.defineProperty(msgObj, "message", {
            get: function() {
                return msg;
            }
        });

        Object.defineProperty(msgObj, "topic", {
            get: function() {
                return msg.topic;
            }
        });

        Object.defineProperty(msgObj, "category", {
            get: function() {
                return msg.category;
            }
        });

        Object.defineProperty(msgObj, "subcategory", {
            get: function() {
                return msg.subcategory;
            }
        });

        // Setup a property to get subscribers
        Object.defineProperty(msgObj, "subscribers", {
            get: function() {
                return messageIndex.query(msg).length;
            }
        });

        // If debug mode is enabled then let's expose the internal method hit counts.
        // These counts are only good if a method is called and succeeds.
        if (external.debug === true) {
            Object.defineProperty(msgObj, "counts", {
                get: function() {
                    return counts;
                }
            });
        }

        return msgObj;
    };

    // This is an internal extension; do not export explicitly.
    return {};
}));

msngr.extend((function(external, internal) {
    "use strict";

    // Setup constants
    external.config("net", {
        defaults: {
            protocol: "http",
            port: {
                http: "80",
                https: "443"
            },
            autoJson: true
        }
    });

    // This method handles requests when msngr is running within a semi-modern net browser
    var browser = function(server, options, callback) {
        try {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        var obj;
                        if (options.autoJson === true && this.getResponseHeader("content-type") === "application/json") {
                            try {
                                obj = JSON.parse(xhr.response);
                            } catch (ex) {
                                // Don't do anything; probably wasn't JSON anyway
                                // Set obj to undefined just incase it contains something awful
                                obj = undefined;
                            }
                        }
                        callback.apply(undefined, [null, (obj || xhr.response)]);
                    } else {
                        var errObj = {
                            status: xhr.status,
                            response: xhr.response
                        };
                        callback.apply(undefined, [errObj, null]);
                    }
                }
            };

            var url = server.protocol + "://" + server.host;
            if (server.canOmitPort === true) {
                url = url + options.path;
            } else {
                url = url + ":" + server.port + options.path;
            }

            var datum;
            if (external.exist(options.payload)) {
                if (external.isObject(options.payload)) {
                    try {
                        datum = JSON.stringify(options.payload);
                    } catch (ex) {
                        // Really couldn't give a shit about this exception
                    }
                }

                // undefined has no meaning in JSON but null does; so let's only
                // and explicitly set anything if it's still undefined (so no null checks)
                if (datum === undefined) {
                    datum = options.payload;
                }
            }

            xhr.open(options.method, url);
            if (external.exist(options.headers)) {
                for (var key in options.headers) {
                    if (options.headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    }
                }
            }
            xhr.send(datum);
        } catch (ex) {
            callback.apply(undefined, [ex, null]);
        }
    };

    // This method handles requests when msngr is running within node.js
    var node = function(server, options, callback) {
        var http = require("http");
        var request = http.request({
            method: options.method,
            host: server.host,
            port: server.port,
            path: options.path,
            headers: options.headers
        }, function(response) {
            response.setEncoding("utf8");
            var body = "";
            response.on("data", function(chunk) {
                body = body + chunk;
            });

            response.on("end", function() {
                var obj;
                if (options.autoJson === true && response.headers["content-type"] === "application/json") {
                    try {
                        obj = JSON.parse(body);
                    } catch (ex) {
                        // Don't do anything; probably wasn't JSON anyway
                        // Set obj to undefined just incase it contains something awful
                        obj = undefined;
                    }
                }
                obj = obj || body;
                var errObj;
                if (request.statusCode >= 400) {
                        errObj = {
                        status: request.statusCode,
                        response: (obj || body)
                    };
                    obj = null;
                }
                callback.apply(undefined, [errObj, obj]);
            });
        });

        if (external.exist(options.payload)) {
            var datum;
            if (external.isObject(options.payload)) {
                try {
                    datum = JSON.stringify(options.payload);
                } catch (ex) {
                    // Really couldn't give a shit about this exception
                }
            }

            // undefined has no meaning in JSON but null does; so let's only
            // and explicitly set anything if it's still undefined (so no null checks)
            if (datum === undefined) {
                datum = options.payload;
            }

            request.write(datum);
        }

        request.end();
    };

    var request = function(server, opts, callback) {
        opts.path = opts.path || "/";
        opts.autoJson = opts.autoJson || internal.config["net"].defaults.autoJson;

        if (external.exist(opts.query)) {
            if (external.isString(opts.query)) {
                opts.queryString = opts.query;
            }

            if (external.isObject(opts.query)) {
                opts.queryString = "?";
                for (var key in opts.query) {
                    if (opts.query.hasOwnProperty(key)) {
                        if (opts.queryString !== "?") {
                            opts.queryString = opts.queryString + "&";
                        }
                        opts.queryString = opts.queryString + encodeURIComponent(key) + "=" + encodeURIComponent(opts.query[key]);
                    }
                }
            }
        }

        opts.path = opts.path + (opts.queryString || "");

        if (external.isBrowser()) {
            browser(server, opts, callback);
        } else {
            node(server, opts, callback);
        }
    };

    // This method is crazy; tries to figure out what the developer sent to
    // the net() method to allow maximum flexibility. Normalization is important here.
    var figureOutServer = function(protocol, host, port) {
        var server = { protocol: undefined, host: undefined, port: undefined, canOmitPort: false };
        var handled = false;
        var invalid = false;
        var invalidReason;

        if (external.isEmptyString(protocol)) {
            invalid = true;
            invalidReason = "Protocol or host not provided";
        }

        if (!invalid && !external.isEmptyString(protocol) && external.isEmptyString(host) && external.isEmptyString(port)) {
            // Only one argument was provided; must be whole host.
            var split = protocol.split("://");
            if (split.length == 2) {
                server.protocol = split[0];
                server.host = split[1];
            } else {
                // Must have omitted protocol.
                server.host = protocol;
                server.protocol = internal.config.net.defaults.protocol;
            }

            var lastColon = server.host.lastIndexOf(":");
            if (lastColon !== -1) {
                // There is a port; let's grab it!
                server.port = server.host.substring(lastColon + 1, server.host.length);
                server.host = server.host.substring(0, lastColon);
            } else {
                // There ain't no port!
                server.port = internal.config.net.defaults.port[server.protocol];
            }

            handled = true;
        }

        if (!invalid && !handled && !external.isEmptyString(protocol) && !external.isEmptyString(host) && external.isEmptyString(port)) {
            // Okay, protocol and host are provided. Figure out port!
            server.protocol = protocol;
            server.host = host;

            var lastColon = server.host.lastIndexOf(":");
            if (lastColon !== -1) {
                // There is a port; let's grab it!
                server.port = server.host.substring(lastColon + 1, server.host.length);
                server.host = server.host.substring(0, lastColon);
            } else {
                // There ain't no port!
                server.port = internal.config.net.defaults.port[server.protocol];
            }

            handled = true;
        }

        if (!invalid && !handled && !external.isEmptyString(protocol) && !external.isEmptyString(host) && !external.isEmptyString(port)) {
            // Everything is provided. Holy shit, does that ever happen!?
            server.protocol = protocol;
            server.host = host;
            server.port = port;

            handled = true;
        }

        // Port explicitness can be omitted for some protocols where the port is their default
        // so let's mark them as can be omitted. This will make output less confusing for
        // more inexperienced developers plus it looks prettier :).
        if (!invalid && handled && internal.config.net.defaults.port[server.protocol] === server.port) {
            server.canOmitPort = true;
        }

        if (!invalid && !handled) {
            // Well we didn't handle the input but also didn't think it was invalid. Crap!
            invalid = true;
            invalidReason = "Unable to handle input into method. Please open a GitHub issue with your input :)";
        }

        if (invalid === true) {
            throw internal.InvalidParametersException("net", invalidReason);
        }

        // Strip any supplied paths
        var stripPath = function(input) {
            var index = input.indexOf("/");
            return input.substring(0, ((index === -1) ? input.length : index));
        };

        server.host = stripPath(server.host);
        server.port = stripPath(server.port);

        return server;
    };

    return {
        net: function(protocol, host, port) {
            var server = figureOutServer(protocol, host, port);

            var netObj = {
                get: function(options, callback) {
                    var opts = external.merge(options, { });
                    opts.method = "get";
                    request(server, opts, callback);
                },
                post: function(options, callback) {
                    var opts = external.merge(options, { });
                    opts.method = "post";
                    request(server, opts, callback);
                },
                put: function(options, callback) {
                    var opts = external.merge(options, { });
                    opts.method = "put";
                    request(server, opts, callback);
                },
                delete: function(options, callback) {
                    var opts = external.merge(options, { });
                    opts.method = "delete";
                    request(server, opts, callback);
                },
                options: function(options, callback) {
                    var opts = external.merge(options, { });
                    opts.method = "options";
                    request(server, opts, callback);
                }
            };

            Object.defineProperty(netObj, "protocol", {
                get: function() {
                    return server.protocol;
                }
            });

            Object.defineProperty(netObj, "host", {
                get: function() {
                    return server.host;
                }
            });

            Object.defineProperty(netObj, "port", {
                get: function() {
                    return server.port;
                }
            });

            return netObj;
        }
    };
}));

/*
    ./options/cross-window.js

    The cross-window option; provides the ability to emit and receive messages across
    multiple browser tabs / windows within the same web browser.
*/
msngr.extend((function(external, internal) {
    "use strict";

    external.config("cross-window", {
        channel: "__msngr_cross-window"
    });

    // Let's check if localstorage is even available. If it isn't we shouldn't register
    if (typeof localStorage === "undefined" || typeof window === "undefined") {
        return {};
    }

    window.addEventListener("storage", function(event) {
        if (event.key === internal.config["cross-window"].channel) {
            // New message data. Respond!
            var obj;
            try {
                obj = JSON.parse(event.newValue);
            } catch (ex) {
                throw "msngr was unable to parse the data in its storage channel"
            }

            if (obj !== undefined && external.isObject(obj)) {
                internal.objects.message(obj.message).emit(obj.payload);
            }
        }
    });

    internal.option("cross-window", function(message, payload, options, async) {
        // Normalize all of the inputs
        options = options || {};
        options = options["cross-window"] || {};

        var obj = {
            message: message,
            payload: payload
        };

        try {
            localStorage.setItem(internal.config["cross-window"].channel, JSON.stringify(obj));
        } catch (ex) {
            throw "msngr was unable to store data in its storage channel";
        }

        return undefined;
    });

    // This is an internal extension; do not export explicitly.
    return {};
}));

/*
    ./options/dom.js

    The dom option; provides value gathering from supplied selectors
*/
msngr.extend((function(external, internal) {
    "use strict";

    internal.option("dom", function(message, payload, options, async) {
        // Normalize all of the inputs
        options = options || {};
        options = options.dom || {};
        var doc = options.doc || options.document || document;

        var selectors = undefined;
        if (external.isObject(options) && external.exist(options.selectors) && external.isString(options.selectors)) {
            selectors = [options.selectors];
        } else if (external.isString(options)) {
            selectors = [options];
        } else if (external.isArray(options)) {
            selectors = options;
        }

        if (!external.exist(doc) || !external.exist(selectors) || selectors.length === 0) {
            return undefined;
        }

        // Process all selectors and put them into a single array
        var elements = [];
        var selLength = selectors.length;
        for (var i = 0; i < selLength; ++i) {
            var found = external.findElements(selectors[i], doc);
            if (found.length > 0) {
                elements = elements.concat(Array.prototype.slice.call(found));
            }
        }

        // Short circuit because no elements
        if (elements.length === 0) {
            return undefined;
        }

        // Iterate through found elements and aggregate the results
        var resultMap = undefined;
        var elmLength = elements.length;
        var unnamedTags = 0;
        for (var i = 0; i < elmLength; ++i) {
            var key = undefined, value = undefined;
            var elm = elements[i];

            var nameAttr = elm.getAttribute("name");
            var idAttr = elm.id;
            var tagName = elm.tagName.toLowerCase();
            var val = elm.value;

            if (external.exist(nameAttr) && !external.isEmptyString(nameAttr)) {
                key = nameAttr;
            } else if (external.exist(idAttr) && !external.isEmptyString(idAttr)) {
                key = idAttr;
            } else {
                key = (tagName + unnamedTags);
                unnamedTags++;
            }

            if (resultMap === undefined) {
                resultMap = {};
            }
            resultMap[key] = val;
        }

        return resultMap;

    });

    // This is an internal extension; do not export explicitly.
    return {};
}));

/*
	module.exports.js

	If we're running in a node.js.
*/
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = msngr;
}
