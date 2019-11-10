/*
	./src/main.js

	The main entry point for msngr.js. Covers internal and external interface generation,
	versioning (for programmatic access) and the core extend method.
*/
var msngr = msngr || (function () {
    "use strict";

    // The internal object for holding the internal API
    var internal = { };

    // The external function that holds all external APIs
    var external = function () {
        var inputs = Array.prototype.slice.call(arguments, 0);

        return external.message.apply(this, inputs);
    };

    // Built version of msngr.js for programatic access; this is auto generated
    external.version = "7.0.0";

    // Takes a function, executes it passing in the external and internal interfaces
    external.extend = function (fn) {
        if (fn === undefined || fn === null) {
            return undefined;
        }

        var fnType = Object.prototype.toString.call(fn);
        if (fnType !== "[object Function]") {
            return undefined;
        }

        return fn.apply(this, [external, internal]);
    };

    // Create a debug property to allow explicit exposure to the internal object structure.
    // This should only be used during unit test runs and debugging.
    Object.defineProperty(external, "debug", {
        set: function (value) {
            if (value === true) {
                external.internal = internal;
            } else if (value === false) {
                delete external.internal;
            }
        },
        get: function () {
            return (external.internal !== undefined)
        }
    });

    return external;
}());

/*
    ./src/validators/is.js

    The is function used for validation
*/

msngr.extend(function (external, internal) {
    "use strict";

    // A list of built-in JavaScript types and their string representation
    var simpleTypes = {
        // ECMAScript 5 Types
        arguments: "[object Arguments]",
        boolean: "[object Boolean]",
        string: "[object String]",
        date: "[object Date]",
        array: "[object Array]",
        number: "[object Number]",
        object: "[object Object]",
        function: "[object Function]",
        undefined: "[object Undefined]",
        null: "[object Null]",

        // ECMAScript 6 Types
        symbol: "[object Symbol]",

        // HTML DOM Types
        nodeList: "[object NodeList]"
    };

    var getType = function (item) {
        return Object.prototype.toString.call(item);
    };

    // Harder type checking here; requires custom methods
    var harderTypes = {
        // HTML DOM Types
        htmlElement: function (type) {
            return (type.indexOf("[object HTML") === 0) || (type.indexOf("[object global]") === 0);
        },
        promise: function (type, obj) {
            // Easy check, node.js 4.x / non-native promises returns [object Object] so limited
            if (type === "[object Promise]") {
                return true;
            }
            // May have a non-promise or a platform where promises are not native, check harder
            if (type === simpleTypes.object || type === simpleTypes.function) {
                return (item.then !== undefined && getType(item.then) === simpleTypes.function);
            }
            return false;
        }
    };

    // Check a type against an input
    var checkType = function (type, item, hard) {
        if (hard) {
            return harderTypes[type](getType(item), item);
        }
        return (getType(item) === simpleTypes[type]);
    }

    // Check an object for empiness
    var checkEmpty = function (type, item) {
        switch(type) {
            case simpleTypes.undefined:
            case simpleTypes.null:
                return true;
            case simpleTypes.string:
                if (item.trim().length === 0) {
                    return true;
                }
                return false;
            case simpleTypes.object:
                return (Object.keys(item).length === 0);
            case simpleTypes.array:
                return (item.length === 0);
            default:
                return false;
        };
    };

    // Bulld the properties that the is function returns for testing values
    var buildProps = function (inputs) {
        var props = { };

        // Create a function to call with simple and hard types
        // This is done so simple types don't need to check for hard types
        var generateProps = function (types, hard) {
            for (var t in types) {
                if (types.hasOwnProperty(t)) {
                    (function (prop) {
                        Object.defineProperty(props, prop, {
                            get: function () {
                                for (var i = 0; i < inputs.length; ++i) {
                                    if (!checkType(prop, inputs[i], hard)) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        });
                    }(t));
                }
            }
        };

        generateProps(simpleTypes, false);
        generateProps(harderTypes, true);

        // Check whether the specified inputs even exist
        Object.defineProperty(props, "there", {
            get: function () {
                for (var i = 0; i < inputs.length; ++i) {
                    if (inputs[i] === undefined || inputs[i] === null) {
                        return false;
                    }
                }
                return true;
            }
        });

        // Check whether a passed in input is considered empty or not
        Object.defineProperty(props, "empty", {
            get: function () {
                for (var i = 0; i < inputs.length; ++i) {
                    if (!checkEmpty(getType(inputs[i]), inputs[i])) {
                        return false;
                    }
                }
                return true;
            }
        });

        return props;
    };

    // Add simple types to the internal interface
    internal.types = simpleTypes;

    // The external `is` interface that supports N number of arguments.
    external.is = function () {
        var inputs = Array.prototype.slice.call(arguments, 0);
        inputs = inputs || [undefined];
        var props = buildProps(inputs);

        // Returns the first input's type
        props.getType = function () {
            return Object.prototype.toString.call(inputs[0]);
        };

        // Returns the types for all inputs, in order
        props.getTypes = function () {
            var result = [];
            for (var i = 0; i < inputs.length; ++i) {
                result.push(Object.prototype.toString.call(inputs[i]));
            }

            return result;
        };

        return props;
    };

    // Returns whether we're in a browser or not
    external.is.browser = (typeof XMLHttpRequest !== "undefined");

});

/*
    ./src/utils/identifier.js

    Utils for handling and creating identifiers
*/

msngr.extend(function (external) {
    "use strict";

    var atomicCount = 0;
    var seed = "Mxxx".replace(/[x]/g, function () {
        return Math.floor(Math.random() * 100);
    });

    external.id = function () {
        ++atomicCount;
        return (seed + atomicCount);
    };

    external.uuid = function () {
        var d = external.now();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

});

/*
    ./src/utils/immediate.js

    A cross platform implementation of immediate()
*/

msngr.extend(function (external, internal) {
    "use strict";
    var postMessageChannel = "__msngr_immediate";
    var immediateFn;

    // This chunk of code is only for the browser as a setImmediate workaround
    if (typeof window !== "undefined" && typeof window.postMessage !== "undefined") {
        var immediateQueue = [];

        window.addEventListener("message", function(event) {
            if (event.source === window && event.data === postMessageChannel) {
                event.stopPropagation();
                if (immediateQueue.length > 0) {
                    immediateQueue.shift()();
                }
            }
        }, true);
    }

    external.immediate = function(fn) {
        if (immediateFn === undefined) {
            if (typeof setImmediate !== "undefined") {
                immediateFn = setImmediate;
            } else if (typeof window !== "undefined" && typeof window.postMessage !== "undefined") {
                immediateFn = function(f) {
                    immediateQueue.push(f);
                    window.postMessage(postMessageChannel, "*");
                };
            } else {
                immediateFn = function(f) {
                    setTimeout(f, 0);
                };
            }
        }
        immediateFn(fn);
    };

});

/*
    ./src/utils/now.js

    An implementation of the best-performing now() available
*/

msngr.extend(function (external) {
    "use strict";

    var nowExec = undefined;
    var lastNow = undefined;

    var nowPerformance = function() {
        return performance.now();
    };

    var nowNode = function() {
        return (process.hrtime()[1] / 1000000);
    };

    var nowLegacy = function() {
        return Date.now();
    };

    external.now = function (noDuplicate) {
        if (nowExec === undefined) {
            if (typeof performance !== "undefined") {
                nowExec = nowPerformance;
            } else if (typeof process !== "undefined") {
                nowExec = nowNode;
            } else {
                nowExec = nowLegacy;
            }
        }
        var now = nowExec();
        if (noDuplicate === true && lastNow === now) {
            return external.now(noDuplicate);
        }
        lastNow = now;
        return now;
    };

});

/*
    ./src/mutators/copy.js

    Creates a copy of the passed in object
*/

msngr.extend(function (external, internal) {
    "use strict";

    var copyHandlers = { };
    // Immutable types that can be straight returned
    copyHandlers[internal.types.string] = function (str) { return str; };
    copyHandlers[internal.types.number] = function (num) { return num; };
    copyHandlers[internal.types.boolean] = function (bool) { return bool; };

    // Mutable types that need to be specially handled
    copyHandlers[internal.types.date] = function (d) {
        return new Date(d);
    };

    copyHandlers[internal.types.object] = function (obj) {
        var cobj = { };
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                cobj[key] = external.copy(obj[key]);
            }
        }

        return cobj;
    };

    copyHandlers[internal.types.array] = function (arr) {
        var carr = [];
        for (var i = 0; i < arr.length; i++) {
            carr[i] = external.copy(arr[i]);
        }

        return carr;
    };

    copyHandlers[internal.types.function] = function (fn) {
        var cfn = fn.bind({}); // Pulls the function away from its properties
        for (var key in fn) {
            if (fn.hasOwnProperty(key)) {
                cfn[key] = external.copy(fn[key]);
            }
        }

        return cfn;
    };

    // Accepts any input and attempts to copy it
    // Unknown input is simply returned as is and is NOT copied
    // While that sounds incorrect there are custom types that may or may not
    // be copy-able so this is basically the best case scenario.
    external.copy = function (input) {
        if (input === undefined || input === null) {
            return input;
        }

        var inputType = external.is(input).getType();

        if (copyHandlers[inputType] !== undefined) {
            return copyHandlers[inputType](input);
        }

        // Return the input since we don't know what it is.
        return input;
    };

});

/*
    ./src/mutators/merge.js

    Creates a merged object from the input
*/

msngr.extend(function (external, internal) {
    "use strict";

    var acceptableForObj1 = [internal.types.object, internal.types.function, internal.types.array];
    var acceptableForObj2 = [internal.types.object, internal.types.array];

    // Merge two items together and return the result
    var twoMerge = function (obj1, obj2, overwrite) {
        if (obj1 === undefined || obj1 === null) { return obj2; };
        if (obj2 === undefined || obj2 === null) { return obj1; };

        var obj1Type = external.is(obj1).getType();
        var obj2Type = external.is(obj2).getType();

        var exceptionMsg;
        if (acceptableForObj1.indexOf(obj1Type) === -1 || acceptableForObj2.indexOf(obj2Type) === -1) {
            exceptionMsg = "msngr.merge() - Only objects, arrays or a single function followed by objects can be merged!";
        }

        if ([obj1Type, obj2Type].indexOf(internal.types.array) !== -1 && (obj1Type !== internal.types.array || obj2Type !== internal.types.array)) {
            exceptionMsg = "msngr.merge() - Arrays cannot be merged with objects or functions!";
        }

        if (overwrite === true) {
            return obj2;
        }

        if (exceptionMsg) {
            throw new Error(exceptionMsg);
        }

        var result = obj1;

        // If we're in the weird spot of getting only arrays then concat and return
        // Seriously though, Mr or Mrs or Ms dev, just use Array.prototype.concat()!
        if (obj1Type === internal.types.array && obj2Type === internal.types.array) {
            return obj1.concat(obj2);
        }

        for (var key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                var is = external.is(obj2[key]);
                if (is.object) {
                    result[key] = result[key] || { };
                    result[key] = twoMerge(result[key], obj2[key]);
                } else if (is.array) {
                    result[key] = result[key] || [];
                    result[key] = result[key].concat(obj2[key]);
                } else {
                    result[key] = obj2[key];
                }
            }
        }

        return result;
    };

    /*
        Internal API
    */
    // Same as external merge except if an unmerge-able type is passed it
    // it is simply overwritten with each subsequent value.
    internal.merge = function () {
        var inputs = Array.prototype.slice.call(arguments, 0);

        if (inputs.length <= 1) {
            return inputs[0];
        }

        var result = inputs.shift();
        while (inputs.length > 0) {
            result = twoMerge(result, inputs.shift(), true);
        }
        return result;
    };

    /*
        External API
    */

    // Takes N number of inputs and merges them together
    // The next parameter always wins over the previous one
    external.merge = function () {
        var inputs = Array.prototype.slice.call(arguments, 0);

        if (inputs.length <= 1) {
            return inputs[0];
        }

        var result = inputs.shift();
        while (inputs.length > 0) {
            result = twoMerge(result, inputs.shift());
        }

        return result;
    };

});

/*
    ./src/messaging/executer.js

    Executer provides asynchronous execution of indexed methods
*/

msngr.extend(function (external, internal) {
    "use strict";

    internal.executer = function (methods) {
        // Support passing in just methods
        for (var i = 0; i < methods.length; ++i) {
            if (external.is(methods[i]).function) {
                methods[i] = {
                    method: methods[i]
                };
            }
        }

        var exec = function (method, params, ctx, done) {
            var isParams = external.is(params);
            external.immediate(function () {
                var asyncFlag = false;
                var asyncFunc = function () {
                    asyncFlag = true;
                    return function (result) {
                        done.apply(ctx, [result]);
                    };
                }

                if (!isParams.array) {
                    if (isParams.there) {
                        params = [params];
                    } else {
                        params = [];
                    }
                }
                params.push(asyncFunc);
                var syncResult = method.apply(ctx || undefined, params);
                if (asyncFlag !== true) {
                    done.apply(ctx, [syncResult]);
                }
            });
        };

        return {
            parallel: function (done) {
                var isDone = external.is(done);
                var results = [];
                var executed = 0;

                if (methods.length === 0 && isDone.there) {
                    return done.apply(null, [ [] ]);
                }

                for (var i = 0; i < methods.length; ++i) {
                    var method = methods[i].method;
                    var params = methods[i].params;
                    var context = methods[i].context;

                    (function (_method, _params, _context) {
                        exec(_method, _params, _context, function(result) {
                            if (external.is(result).there) {
                                results.push(result);
                            }

                            ++executed;

                            if (executed === methods.length && isDone.there) {
                                done.apply((_context || null), [results]);
                            }
                        });
                    }(method, params, context));
                }
            },
            series: function (done) {
                var isDone = external.is(done);
                var results = [];

                if (methods.length === 0 && isDone.there) {
                    return done.apply(null, [ [] ]);
                }

                var again = function () {
                    var method = methods.shift();
                    (function (_method, _params, _context) {
                        exec(_method, _params, _context, function (result) {
                            if (external.is(result).there) {
                                results.push(result);
                            }

                            if (methods.length === 0 && isDone.there) {
                                done.apply((_context || null), [results]);
                            } else {
                                again();
                            }
                        });
                    }(method.method, method.params, method.context));
                };
                again();
            }
        };
    };

    external.parallel = function (methods, handler) {
        internal.executer(methods).parallel.apply(this, [handler]);
    };

    external.series = function (methods, handler) {
        internal.executer(methods).series.apply(this, [handler]);
    };

});

/*
    ./src/messaging/memory.js

    An indexer for message objects.
*/

msngr.extend(function (external, internal) {
    "use strict";

    // Wait, why are you re-implementing the functionality of msngr.is().there?
    // Alright, here's the deal. The memory indexer needs to be fast. Like very fast.
    // So this simplifies and implements only what we need. This is slightly faster.
    var exists = function (input) {
        return (input !== undefined && input !== null);
    };

    // A more efficient element removal from an array in cases where the array is large
    var removeFromArray = function(arr, value) {
        var inx = arr.indexOf(value);
        var endIndex = arr.length - 1;
        if (inx !== endIndex) {
            var temp = arr[endIndex];
            arr[endIndex] = arr[inx];
            arr[inx] = temp;
        }
        arr.pop();
    };

    internal.memory = function () {
        // Index for id to message objects
        var id_to_message = {};

        // Direct index (no partials) for message
        var index = { };

        // Message index count
        var index_count = 0;

        // Memory indexer API
        var mem = {
            index: function(message) {
                if (exists(message) && exists(message.topic)) {
                    var id = external.id();
                    id_to_message[id] = external.copy(message);

                    if (!exists(index[message.topic])) {
                        index[message.topic] = {
                            ids: [],
                            category: { }
                        };
                    }

                    if (!exists(index[message.topic].category[message.category])) {
                        index[message.topic].category[message.category] = {
                            ids: [],
                            subcategory: { }
                        }
                    }

                    if (!exists(index[message.topic].category[message.category].subcategory[message.subcategory])) {
                        index[message.topic].category[message.category].subcategory[message.subcategory] = {
                            ids: []
                        }
                    }


                    if (!exists(message.category) && !exists(message.subcategory)) {
                        index[message.topic].ids.push(id);
                    }

                    if (exists(message.category) && !exists(message.subcategory)) {
                        index[message.topic].category[message.category].ids.push(id);
                    }

                    if (exists(message.category) && exists(message.subcategory)) {
                        index[message.topic].category[message.category].subcategory[message.subcategory].ids.push(id);
                    }

                    index_count++;

                    return id;
                }
                return undefined;
            },
            getById: function (id) {
                return id_to_message[id];
            },
            delete: function(id) {
                if (exists(id) && exists(id_to_message[id])) {
                    var message = id_to_message[id];

                    removeFromArray(index[message.topic].ids, id);
                    removeFromArray(index[message.topic].category[message.category].ids, id);
                    removeFromArray(index[message.topic].category[message.category].subcategory[message.subcategory].ids, id);

                    delete id_to_message[id];
                    index_count--;

                    return true;
                }
                return false;
            },
            query: function(message) {
                var result = [];
                if (exists(message) && exists(message.topic) && exists(index[message.topic])) {
                    var indexTopic = index[message.topic];
                    var indexTopicCategory = ((indexTopic || { }).category || { })[message.category];
                    var indexTopicCategorySubcategory = ((indexTopicCategory || { }).subcategory || { })[message.subcategory];

                    result = result.concat(indexTopic.ids || []);
                    result = result.concat((indexTopicCategory || { }).ids || []);
                    result = result.concat((indexTopicCategorySubcategory || { }).ids || []);
                }

                // Now let's de-dupe the array
                var hash = { };
                var deduped = [];
                var resultLength = result.length;
                for (var i = 0; i < resultLength; ++i) {
                    if (hash[result[i]] === undefined) {
                        hash[result[i]] = true;
                        deduped.push(result[i]);
                    }
                }
                return deduped;
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
});

/*
    ./messaging/message.js

    The primary object of msngr; handles all message sending, receiving and binding.
*/
msngr.extend(function (external, internal) {
    "use strict";

    // Memory indexers for messages and payloads
    var messageIndex = internal.memory();
    var payloadIndex = internal.memory();

    // Holds handlers
    var handlers = {};
    var handlerCount = 0;

    // Holds payloads for persist
    var payloads = {};
    var payloadCount = 0;

    // Holds middlewares
    var middlewares = { };
    var forced = [];

    /*
        Internal APIs
    */
    Object.defineProperty(internal, "handlerCount", {
        get: function() {
            return handlerCount;
        }
    });

    Object.defineProperty(internal, "payloadCount", {
        get: function() {
            return payloadCount;
        }
    });

    internal.reset = function() {
        handlers = {};
        handlerCount = 0;

        messageIndex.clear();
        payloadIndex.clear();

        payloads = {};
        payloadCount = 0;

        middlewares = { };
        forced = [];
    };

    /*
        Private APIs
    */
    var fetchPersistedPayload = function (msg) {
        var ids = payloadIndex.query(msg);

        if (ids.length === 0) {
            return;
        }

        var payload = payloads[ids[0]];

        if (ids.length > 1) {
            for (var i = 1; i < ids.length; ++i) {
                payload = external.merge(innerPay, fpay);
            }
        }

        return payload;
    };

    // gets a listing of middlewares
    var getMiddlewares = function (uses, payload, message) {
        var results = [];
        var keys = (uses || []);
        for (var i = 0; i < forced.length; ++i) {
            if (keys.indexOf(forced[i]) === -1) {
                keys.push(forced[i]);
            }
        }

        for (var i = 0; i < keys.length; ++i) {
            if (middlewares[keys[i]] !== undefined) {
                results.push({
                    method: middlewares[keys[i]],
                    params: [payload, message]
                });
            }
        }

        return results;
    };

    internal.getMiddlewares = getMiddlewares; // Expose method to the internal API for testing

    // Executes middlewares
    var executeMiddlewares = function (uses, payload, message, callback) {
        var middles = getMiddlewares(uses, payload, message);
        internal.executer(middles).series(function (result) {
            return callback(internal.merge.apply(this, [payload].concat(result)));
        });
    };

    // Settles middlewares
    var settleMiddleware = function (uses, payload, message, callback) {
        executeMiddlewares(uses, payload, message, function (newPayload) {
            callback.apply(undefined, [newPayload]);
        });
    };

    // An explicit emit
    var explicitEmit = function (msgOrIds, payload, callback) {
        var ids = (external.is(msgOrIds).array) ? msgOrIds : messageIndex.query(msgOrIds);

        if (ids.length > 0) {
            var methods = [];
            var toDrop = [];
            for (var i = 0; i < ids.length; ++i) {
                var msg = (external.is(msgOrIds).object) ? external.copy(msgOrIds) : external.copy(messageIndex.query(ids[i]));
                var obj = handlers[ids[i]];
                methods.push({
                    method: obj.handler,
                    params: [payload, msg]
                });

                if (obj.once === true) {
                    toDrop.push({
                        msg: msg,
                        handler: obj.handler
                    });
                }
            }

            var execs = internal.executer(methods);

            for (var i = 0; i < toDrop.length; ++i) {
                external(toDrop[i].msg).drop(toDrop[i].handler);
            }

            execs.parallel(callback);
        }
    };

    /*
        msngr() / msngr.message() returns a set of chainable methods for handling messaging
    */
    external.message = function (topic, category, subcategory) {
        var isTopic = external.is(topic);
        var isCategory = external.is(category);
        var isSubcategory = external.is(subcategory);
        if (!isTopic.there) {
            throw new Error("msngr() - Invalid parameters");
        }

        if (!isTopic.object && !isTopic.string) {
            throw new Error("msngr() - Invalid parameters");
        }

        if (isTopic.empty) {
            throw new Error("msngr() - Invalid parameters");
        }

        var msg;
        if (isTopic.object) {
            msg = external.copy(topic);
        } else {
            msg = {};
            msg.topic = topic;

            if (!isCategory.empty && isCategory.string) {
                msg.category = category;
            }

            if (!isSubcategory.empty && isSubcategory.string) {
                msg.subcategory = subcategory;
            }
        }

        // Normalize message to lowercase
        for (var prop in msg) {
            if (msg.hasOwnProperty(prop)) {
                msg[prop] = msg[prop].toLowerCase();
            }
        }

        var uses = [];

        var msgObj = {
            use: function (middleware) {
                if (external.is(middleware).string) {
                    var normalizedKey = middleware.toLowerCase();
                    uses.indexOf(normalizedKey) === -1 && uses.push(middleware.toLowerCase());
                }

                return msgObj;
            },
            emit: function (payload, callback) {
                var isPayload = external.is(payload);
                if (isPayload.function) {
                    callback = payload;
                    payload = undefined;
                }

                if (uses.length > 0 || forced.length > 0) {
                    settleMiddleware(uses, payload, msg, function (newPayload) {
                        explicitEmit(msg, newPayload, callback);
                    });
                } else {
                    explicitEmit(msg, payload, callback);
                }
                

                return msgObj;
            },
            persist: function (payload) {
                if (payload === undefined) {
                    payload = null;
                }

                var ids = payloadIndex.query(msg);
                if (ids.length === 0) {
                    var id = payloadIndex.index(msg);
                    payloads[id] = payload;
                    ids = [id];
                } else {
                    for (var i = 0; i < ids.length; ++i) {
                        payloads[ids[i]] = external.merge(payload, payloads[ids[i]]);
                    }
                }
                ++payloadCount;

                return msgObj.emit(fetchPersistedPayload(msg));
            },
            cease: function() {
                var ids = payloadIndex.query(msg);

                for (var i = 0; i < ids.length; ++i) {
                    delete payloads[ids[i]];
                    --payloadCount;
                }

                return msgObj;
            },
            on: function(handler) {
                var id = messageIndex.index(msg);
                handlers[id] = {
                    handler: handler,
                    context: (msg.context || this),
                    once: false
                };
                handlerCount++;

                var payload = fetchPersistedPayload(msg);
                if (payload !== undefined) {
                    if (uses.length > 0 || forced.length > 0) {
                        settleMiddleware(uses, payload, msg, function (newPayload) {
                            explicitEmit([id], newPayload);
                        });
                    } else {
                        explicitEmit([id], payload);
                    }
                }

                return msgObj;
            },
            once: function(handler) {
                var id = messageIndex.index(msg);
                handlers[id] = {
                    handler: handler,
                    context: (msg.context || this),
                    once: true
                };
                handlerCount++;

                var payload = fetchPersistedPayload(msg);
                if (payload !== undefined) {
                    if (uses.length > 0 || forced.length > 0) {
                        settleMiddleware(uses, payload, msg, function (newPayload) {
                            explicitEmit([id], newPayload);
                        });
                    } else {
                        explicitEmit([id], payload);
                    }
                }

                return msgObj;
            },
            drop: function(handler) {
                var ids = messageIndex.query(msg);
                if (ids.length > 0) {
                    for (var i = 0; i < ids.length; ++i) {
                        if (handlers[ids[i]].handler === handler) {
                            delete handlers[ids[i]];
                            handlerCount--;

                            messageIndex.delete(ids[i]);
                        }
                    }
                }

                return msgObj;
            },
            dropAll: function() {
                var ids = messageIndex.query(msg);
                if (ids.length > 0) {
                    for (var i = 0; i < ids.length; ++i) {
                        delete handlers[ids[i]];
                        handlerCount--;

                        messageIndex.delete(ids[i]);
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

        // Setup a property to get the handlers count
        Object.defineProperty(msgObj, "handlers", {
            get: function() {
                return messageIndex.query(msg).length;
            }
        });

        return msgObj;
    };

    /*
        msngr.middleware(key, fn, force) provides a way to execute code during each message delegation

        key -> identifier for the middleware (think unique name or id).
        fn -> the function to execute for the middleware.
        force (optional) -> a boolean to force whether the middleware is always executed or only when explicitly specified.
    */
    external.middleware = function (key, fn, force) {
        var isKey = external.is(key);
        var isFn = external.is(fn);
        if (!isKey.there || !isKey.string || isKey.empty || !isFn.there || !isFn.function) {
            throw new Error("msngr.middleware() - Invalid parameters");
        }

        if (external.is(middlewares[key]).there) {
            throw new Error("msngr.middleware() - Invalid parameters");
        }

        var normalizedKey = key.toLowerCase();
        middlewares[normalizedKey] = fn;
        if (force === true) {
            forced.push(normalizedKey);
        }
    };

    /*
        msngr.unmiddleware(key) removes a middleware

        key -> identifier for the middleware to remove.
    */
    external.unmiddleware = function (key) {
        var isKey = external.is(key);
        if (!isKey.there || !isKey.string || isKey.empty) {
            throw new Error("msngr.unmiddleware() - Invalid parameters");
        }

        var normalizedKey = key.toLowerCase();
        var forcedInx = forced.indexOf(normalizedKey);
        if (forcedInx !== -1) {
            forced.splice(forcedInx, 1);
        }

        if (middlewares[normalizedKey] !== undefined) {
            delete middlewares[normalizedKey];
        }
    };
});

/*
	module.exports.js

	If we're running in node.js.
*/
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = msngr;
}
