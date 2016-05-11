/*
	main.js

	The main entry point for msngr.js. Covers internal and external interface generation,
	versioning (for programmatic access) and the core extend method.
*/
var msngr = msngr || (function() {
    "use strict";

    // Defaults for some internal functions
    var internal = {
        globalOptions: {},
        warnings: true
    };

    // The main method for msngr uses the message object
    var external = function(topic, category, subcategory) {
        return internal.objects.message(topic, category, subcategory);
    };

    external.version = "2.3.0";

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

    // An external options interface for global options settings
    external.options = function(key, value) {
        if (!external.exist(key)) {
            throw internal.InvalidParametersException("key");
        }

        internal.globalOptions[key] = value;
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
                var result = doc.querySelectorAll(selector);
                if (result !== null) {
                    elm = result;
                }
            }

            return elm;
        },
        getDomPath: function(element) {
            var node = external.isHtmlElement(element) ? element : undefined;
            if (node === undefined) {
                return undefined;
            }

            if (node.id === undefined) {
                node.id = external.id();
            }

            return "#" + node.id;
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
                selector = input.substring(input.indexOf(")", eqlLoc) + 1, input.length);

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

    internal.InvalidParametersException = function(str) {
        return {
            name: "InvalidParametersException",
            severity: "unrecoverable",
            message: ("Invalid parameters supplied to the {method} method".replace("{method}", str))
        };
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

    var nowPerformance = function() {
        return performance.now();
    };

    var nowNode = function() {
        return (process.hrtime()[1] / 1000000);
    };

    var nowLegacy = function() {
        return (new Date).getTime();
    };

    var nowExec = undefined;
    var nowExecDebugLabel = "";
    var lastNow = undefined;

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
        },
        hasWildCard: function(str) {
            return (str.indexOf("*") !== -1);
        }
    };
}));

msngr.extend((function(external, internal) {
    "use strict";

    internal.objects = internal.objects || {};
    internal.objects.executer = function(methods, payload, context) {

        if (external.isFunction(methods)) {
            methods = [methods];
        }

        if (!external.exist(methods) || !external.isArray(methods)) {
            throw internal.InvalidParametersException("executor");
        }

        var exec = function(method, pay, ctx, done) {
            setTimeout(function() {
                var async = false;
                var asyncFunc = function() {
                    async = true;
                    return function(result) {
                        done.apply(ctx, [result]);
                    };
                }

                var params = undefined;
                if (external.isArray(pay)) {
                    params = pay;
                } else {
                    params = [pay];
                }
                params.push(asyncFunc);

                var syncResult = method.apply(ctx || this, params);
                if (async !== true) {
                    done.apply(ctx, [syncResult]);
                }
            }, 0);
        };

        return {
            execute: function(done) {
                if (methods.length === 0 && external.exist(done)) {
                    return done.apply(context, [
                        []
                    ]);
                }
                return exec(methods[0], payload, context, done);
            },
            parallel: function(done) {
                var results = [];
                var executed = 0;

                if (methods.length === 0 && external.exist(done)) {
                    return done.apply(context, [
                        []
                    ]);
                }

                for (var i = 0; i < methods.length; ++i) {
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
                    }(methods[i], payload, context));
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
        var direct_index = {
            topic_to_id: {},
            topic_cat_to_id: {},
            topic_scat_to_id: {},
            topic_cat_scat_to_id: {}
        };

        // Message index count
        var index_count = 0;

        var mem = {
            index: function(message) {
                if (external.exist(message) && external.exist(message.topic)) {
                    var uuid = external.id();
                    id_to_message[uuid] = message;

                    if (direct_index.topic_to_id[message.topic] === undefined) {
                        direct_index.topic_to_id[message.topic] = [];
                    }
                    direct_index.topic_to_id[message.topic].push(uuid);

                    if (external.exist(message.category)) {
                        if (direct_index.topic_cat_to_id[message.topic] === undefined) {
                            direct_index.topic_cat_to_id[message.topic] = {};
                        }

                        if (direct_index.topic_cat_to_id[message.topic][message.category] === undefined) {
                            direct_index.topic_cat_to_id[message.topic][message.category] = [];
                        }

                        direct_index.topic_cat_to_id[message.topic][message.category].push(uuid);
                    }

                    if (external.exist(message.subcategory)) {
                        if (direct_index.topic_scat_to_id[message.topic] === undefined) {
                            direct_index.topic_scat_to_id[message.topic] = {};
                        }

                        if (direct_index.topic_scat_to_id[message.topic][message.subcategory] === undefined) {
                            direct_index.topic_scat_to_id[message.topic][message.subcategory] = [];
                        }

                        direct_index.topic_scat_to_id[message.topic][message.subcategory].push(uuid);
                    }

                    if (external.exist(message.category) && external.exist(message.subcategory)) {
                        if (direct_index.topic_cat_scat_to_id[message.topic] === undefined) {
                            direct_index.topic_cat_scat_to_id[message.topic] = {};
                        }

                        if (direct_index.topic_cat_scat_to_id[message.topic][message.category] === undefined) {
                            direct_index.topic_cat_scat_to_id[message.topic][message.category] = {};
                        }

                        if (direct_index.topic_cat_scat_to_id[message.topic][message.category][message.subcategory] === undefined) {
                            direct_index.topic_cat_scat_to_id[message.topic][message.category][message.subcategory] = [];
                        }

                        direct_index.topic_cat_scat_to_id[message.topic][message.category][message.subcategory].push(uuid);
                    }

                    index_count++;

                    return uuid;
                }
                return undefined;
            },
            delete: function(uuid) {
                if (external.exist(uuid) && external.exist(id_to_message[uuid])) {
                    var message = id_to_message[uuid];

                    if (external.exist(message.topic)) {
                        external.removeFromArray(direct_index.topic_to_id[message.topic], uuid);

                        if (external.exist(message.category)) {
                            external.removeFromArray(direct_index.topic_cat_to_id[message.topic][message.category], uuid);
                        }

                        if (external.exist(message.subcategory)) {
                            external.removeFromArray(direct_index.topic_scat_to_id[message.topic][message.subcategory], uuid);
                        }

                        if (external.exist(message.category) && external.exist(message.subcategory)) {
                            external.removeFromArray(direct_index.topic_cat_scat_to_id[message.topic][message.category][message.subcategory], uuid);
                        }
                    }

                    delete id_to_message[uuid];
                    index_count--;

                    return true;
                }
                return false;
            },
            query: function(message) {
                if (external.exist(message)) {
                    if (external.exist(message.topic)) {
                        // Topic Only Results
                        if (!external.exist(message.category) && !external.exist(message.subcategory)) {
                            return direct_index.topic_to_id[message.topic] || [];
                        }

                        // Topic + Category Results
                        if (external.exist(message.category) && !external.exist(message.subcategory)) {
                            return (direct_index.topic_cat_to_id[message.topic] || {})[message.category] || [];
                        }

                        // Topic + Data Type Results
                        if (external.exist(message.subcategory) && !external.exist(message.category)) {
                            return (direct_index.topic_scat_to_id[message.topic] || {})[message.subcategory] || [];
                        }

                        // Topic + Category + Data Type Results
                        if (external.exist(message.category) && external.exist(message.subcategory)) {
                            return ((direct_index.topic_cat_scat_to_id[message.topic] || {})[message.category] || {})[message.subcategory] || [];
                        }
                    }
                }

                return [];
            },
            clear: function() {
                // Index for id to message objects
                id_to_message = {};

                // Direct index (no partials) for message
                direct_index = {
                    topic_to_id: {},
                    topic_cat_to_id: {},
                    topic_scat_to_id: {},
                    topic_cat_scat_to_id: {}
                };

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
            if (opts.hasOwnProperty(key) && external.exist(internal.options[key])) {
                optProcessors.push(internal.options[key]);
            }
        }

        // Short circuit for no options
        if (optProcessors.length === 0) {
            return callback.apply(this, [payload]);
        }

        // Long circuit to do stuff (du'h)
        var execs = internal.objects.executer(optProcessors, [message, payload, opts], this);

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
            msg = topic;
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

        // Copy global options
        var options = external.merge({}, internal.globalOptions);

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
            var methods = [];
            var toDrop = [];
            for (var i = 0; i < uuids.length; ++i) {
                var obj = handlers[uuids[i]];
                methods.push(obj.handler);

                if (obj.once === true) {
                    toDrop.push(obj.handler);
                }
            }

            internal.processOpts(options, msg, payload, function(result) {
                var execs = internal.objects.executer(methods, result, (msg.context || this));

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
                        payloads[uuids[i]] = external.extend(payload, payloads[uuids[i]]);
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

/*
    ./options/cross-window.js

    The cross-window option; provides the ability to emit and receive messages across
    multiple browser tabs / windows within the same web browser.
*/
msngr.extend((function(external, internal) {
    "use strict";

    var CHANNEL_NAME = "__msngr_cross-window";

    internal.options = internal.options || {};

    // Let's check if localstorage is even available. If it isn't we shouldn't register
    if (typeof localStorage === "undefined" || typeof window === "undefined") {
        return {};
    }

    window.addEventListener("storage", function(event) {
        if (event.key === CHANNEL_NAME) {
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

    internal.options["cross-window"] = function(message, payload, options, async) {
        // Normalize all of the inputs
        options = options || {};
        options = options["cross-window"] || {};

        var obj = {
            message: message,
            payload: payload
        };

        try {
            localStorage.setItem(CHANNEL_NAME, JSON.stringify(obj));
        } catch (ex) {
            throw "msngr was unable to store data in its storage channel";
        }

        return undefined;
    };

    // This is an internal extension; do not export explicitly.
    return {};
}));

/*
    ./options/dom.js

    The dom option; provides value gathering from supplied selectors
*/
msngr.extend((function(external, internal) {
    "use strict";

    internal.options = internal.options || {};

    internal.options.dom = function(message, payload, options, async) {
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

    };

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
