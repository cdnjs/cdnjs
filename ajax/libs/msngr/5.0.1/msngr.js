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
    external.version = "5.0.1";

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
    ./src/exceptional.js

    Handles throwing and creating errors and warnings
*/

msngr.extend(function (external, internal) {
    "use strict";

    internal.InvalidParametersException = function (str, reason) {
        var m = {
            name: "InvalidParametersException",
            severity: "unrecoverable",
            message: ("Invalid parameters supplied to the {method} method".replace("{method}", str))
        };
        if (!external.is(reason).empty) {
            m.message = m.message + " " + reason;
        }
        return m;
    };

    internal.DuplicateException = function (str) {
        return {
            name: "DuplicateException",
            severity: "unrecoverable",
            message: ("Duplicate input provided to {method} where duplicates are not allowed.".replace("{method}", str))
        };
    };

    internal.ReservedKeywordsException = function (keyword) {
        return {
            name: "ReservedKeywordsException",
            severity: "unrecoverable",
            message: ("Reserved keyword {keyword} supplied as action.".replace("{keyword}", keyword))
        };
    };

    internal.MangledException = function (variable, method) {
        return {
            name: "MangledException",
            severity: "unrecoverable",
            message: ("The {variable} was unexpectedly mangled in {method}.".replace("{variable}", variable).replace("{method}", method))
        };
    };

});

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
        promise: "[object Promise]", // node.js 4.x returns [object Object] for promises so limited testing possible

        // HTML DOM Types
        nodeList: "[object NodeList]"
    };

    // Harder type checking here; requires custom methods
    var harderTypes = {
        // HTML DOM Types
        htmlElement: function (type) {
            return (type.indexOf("[object HTML") === 0) || (type.indexOf("[object global]") === 0);
        }
    };

    var getType = function (item) {
        return Object.prototype.toString.call(item);
    };

    // Check a type against an input
    var checkType = function (type, item, hard) {
        if (hard) {
            return harderTypes[type](getType(item));
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
    ./src/utils/deDupeArray.js

    Provides a funtion for de-duping an array
*/

msngr.extend(function (external, internal) {
    "use strict";

    external.deDupeArray = function (arr) {
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
    };

});

/*
    ./src/utils/identifier.js

    Utils for handling and creating identifiers
*/

msngr.extend(function (external, internal) {
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

msngr.extend(function (external, internal) {
    "use strict";

    var nowExec = undefined;
    var nowExecDebugLabel = "";
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
    };

});

/*
    ./src/mutators/asyncify.js

    Takes a synchronous method and makes it work asynchronously
*/

msngr.extend(function (external, internal) {
    "use strict";

    /*
        msngr.asyncify() accepts a single parameter and returns it with a new, async method.

        fn -> the function, which should be synchronous, to add an async() method to.
    */
    external.asyncify = function(fn) {
        if (external.is(fn).function) {
            fn.async = function () {
                var args = [].slice.call(arguments);
                var callback = args.pop();
                if (external.is(callback).function) {
                    (function (a, c) {
                        external.immediate(function () {
                            try {
                                c.apply(null, [null, fn.apply(null, a)]);
                            } catch (e) {
                                c.apply(null, [e, null]);
                            }
                        });
                    }(args, callback));
                }
            };
        }

        return fn;
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
        var cdate = new Date();
        cdate.setTime(d.getTime());

        return cdate;
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

        var exceptional = undefined;
        if (acceptableForObj1.indexOf(obj1Type) === -1 || acceptableForObj2.indexOf(obj2Type) === -1) {
            exceptional = internal.InvalidParametersException("msngr.merge()", "Only objects, arrays or a single function followed by objects can be merged!");
        }

        if ([obj1Type, obj2Type].indexOf(internal.types.array) !== -1 && (obj1Type !== internal.types.array || obj2Type !== internal.types.array)) {
            exceptional = internal.InvalidParametersException("msngr.merge()", "Arrays cannot be merged with objects or functions!");
        }

        if (exceptional !== undefined) {
            if (overwrite === true) {
                return obj2;
            }
            throw exceptional;
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
    ./src/mutators/safe.js

    Provides a safe way to access objects and functions
*/

msngr.extend(function (external, internal) {
    "use strict";

    /*
        msngr.safe() accepts 2 required parameters and 1 optional.

        obj -> the object to inspect.
        path -> the json path to a specific property separated by dots; note that this will fail if an object key actually contains a dot.
        def (optional) -> the default value to return should the requested property not exist.
    */
    external.safe = function (obj, path, def) {
        if (!external.is(obj).object || !external.is(path).string) {
            throw internal.InvalidParametersException("msngr.safe");
        }

        var props = path.split(".");
        var position = obj, prop = undefined;
        while (prop = props.shift()) {
            position = position[prop];
            if (position === undefined) {
                break;
            }
        }

        return (external.is(position).there) ? position : def;
    };

});

/*
    ./src/messaging/executer.js

    Executer provides asynchronous execution of indexed methods
*/

msngr.extend((function (external, internal) {
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
                var syncResult = method.apply(ctx || this, params);
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

                    (function (m, p, c) {
                        exec(m, p, c, function(result) {
                            if (external.is(result).there) {
                                results.push(result);
                            }

                            ++executed;

                            if (executed === methods.length && isDone.there) {
                                done.apply((c || null), [results]);
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
                    (function (m, p, c) {
                        exec(m, p, c, function (result) {
                            if (external.is(result).there) {
                                results.push(result);
                            }

                            if (methods.length === 0 && isDone.there) {
                                done.apply((c || null), [results]);
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
}));

/*
    ./src/messaging/memory.js

    An indexer for message objects.
*/

msngr.extend((function (external, internal) {
    "use strict";

    // Wait, why are you re-implementing the functionality of msngr.is().there?
    // Listen there boyscout. The memory indexer needs to be fast. Like very fast.
    // So this simplifies and imlpements only what we need. This is slightly faster.
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
}));

/*
    ./messaging/message.js

    The primary object of msngr; handles all message sending, receiving and binding.
*/
msngr.extend((function (external, internal) {
    "use strict";

    var messageIndex = internal.memory();
    var payloadIndex = internal.memory();

    var handlers = {};
    var handlerCount = 0;

    var payloads = {};
    var payloadCount = 0;

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
    };

    /*
        Private APIs
    */
    var fetchPersistedPayload = function (msg) {
        var ids = payloadIndex.query(msg);

        if (ids.length === 0) {
            return undefined;
        }

        var payload = payloads[ids[0]];

        if (ids.length > 1) {
            for (var i = 1; i < ids.length; ++i) {
                payload = external.merge(innerPay, fpay);
            }
        }

        return payload;
    };

    var explicitEmit = function (msgOrIds, middlewares, payload, callback) {

        // Execute middlewares if any
        internal.executeMiddlewares(middlewares, payload, function (newPayload) {
            var ids = (external.is(msgOrIds).array) ? msgOrIds : messageIndex.query(msgOrIds);

            if (ids.length > 0) {
                var methods = [];
                var toDrop = [];
                for (var i = 0; i < ids.length; ++i) {
                    var msg = (external.is(msgOrIds).object) ? external.copy(msgOrIds) : external.copy(messageIndex.query(ids[i]));
                    var obj = handlers[ids[i]];
                    methods.push({
                        method: obj.handler,
                        params: [newPayload, msg]
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
        });
    };

    /*
        msngr() / msngr.message() returns a set of chainable methods for handling messaging
    */
    external.message = function (topic, category, subcategory) {
        var isTopic = external.is(topic);
        var isCategory = external.is(category);
        var isSubcategory = external.is(subcategory);
        if (!isTopic.there) {
            throw internal.InvalidParametersException("msngr()");
        }

        if (!isTopic.object && !isTopic.string) {
            throw internal.InvalidParametersException("msngr()");
        }

        if (isTopic.empty) {
            throw internal.InvalidParametersException("msngr()");
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
                if (!external.is(middleware).empty) {
                    uses.push(middleware.toLowerCase());
                }

                return msgObj;
            },
            emit: function (payload, callback) {
                var isPayload = external.is(payload);
                if (isPayload.function) {
                    callback = payload;
                    payload = undefined;
                }

                explicitEmit(msg, uses, payload, callback);

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
                    explicitEmit([id], uses, payload, undefined);
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
                    explicitEmit([id], uses, payload, undefined);
                }

                return msgObj;
            },
            drop: function(handler) {
                var ids = messageIndex.query(msg);
                if (ids.length > 0) {
                    for (var i = 0; i < ids.length; ++i) {
                        var id = ids[i];
                        if (handlers[id].handler === handler) {
                            delete handlers[id];
                            handlerCount--;

                            messageIndex.delete(id);
                        }
                    }
                }

                return msgObj;
            },
            dropAll: function() {
                var ids = messageIndex.query(msg);
                if (ids.length > 0) {
                    for (var i = 0; i < ids.length; ++i) {
                        var id = ids[i];
                        delete handlers[id];
                        handlerCount--;

                        messageIndex.delete(id);
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
}));

/*
    ./src/messaging/middleware.js

    Supports executing middleware during message delegation
*/

msngr.extend((function (external, internal) {
    "use strict";

    var middlewares = { };
    var forced = [];

    /*
        Internal APIs
    */
    internal.getMiddlewares = function (uses, payload) {
        var results = [];
        var keys = (uses || []).concat(forced);
        for (var i = 0; i < keys.length; ++i) {
            if (middlewares[keys[i]] !== undefined) {
                results.push({
                    method: middlewares[keys[i]],
                    params: payload
                });
            }
        }

        return results;
    };

    internal.executeMiddlewares = function (uses, payload, callback) {
        var middles = internal.getMiddlewares(uses, payload);

        var execute = internal.executer(middles).series(function (result) {
            return callback(internal.merge.apply(this, [payload].concat(result)));
        });
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
            throw internal.InvalidParametersException("msngr.middleware()");
        }

        if (external.is(middlewares[key]).there) {
            throw internal.DuplicateException("msngr.middleware()");
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
            throw internal.InvalidParametersException("msngr.unmiddleware()");
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

}));

/*
    ./src/mache/mache.js

    A merge cache
*/

msngr.extend((function (external, internal) {
    "use strict";

    external.mache = function (opts) {
        opts = opts || { };
        var meta = {
            events: {
                onChange: {
                    topic: "msngr.mache",
                    category: "change",
                    emit: opts.emitChanges || false
                }
            },
            revisions: {
                toKeep: (opts.revisions || 3)
            }
        }
        var flatCache = { };
        var data = { };
        var transData = undefined;
        var transRemovals = undefined;
        var transacting = false;

        var normalGet = function (id) {
            if (data[id] === undefined) {
                return undefined;
            }
            return data[id][data[id].length - 1];
        };

        var transGet = function (id) {
            return (transRemovals[id] === true) ? undefined : (transData[id] || normalGet(id));
        };

        var normalSet = function (id, value) {
            if (data[id] === undefined) {
                data[id] = [];
            }

            data[id].push(internal.merge(external.copy(api.get(id)), external.copy(value)));
            flatCache[id] = api.get(id);

            if (data[id].length > meta.revisions.toKeep) {
                data[id].shift();
            }

            if (meta.events.onChange.emit) {
                var msg = external.message(meta.events.onChange.topic, meta.events.onChange.category, id);
                msg.emit({
                    id: id,
                    oldValue: data[id][data[id].length - 2],
                    newValue: data[id][data[id].length - 1]
                });
            }

            return true;
        };

        var transSet = function (id, value) {
            transData[id] = internal.merge((transData[id] || normalGet(id)), external.copy(value));
            return true;
        };

        var normalRemove = function (id) {
            if (data[id] === undefined) {
                return false;
            }

            delete data[id];
            delete flatCache[id];
            return true;
        };

        var transRemove = function (id) {
            if (transData[id] === undefined && data[id] === undefined) {
                return false;
            }

            if (transData[id] !== undefined) {
                delete transData[id];
            }

            transRemovals[id] = true;
            return true;
        };

        var normalRevert = function (id) {
            if (data[id] === undefined) {
                return false;
            }

            if (data[id].length === 1) {
                delete data[id];
                delete flatCache[id];
                return true;
            }

            data[id].pop();
            flatCache[id] = api.get(id);
            
            return true;
        };

        var api = {
            get: function (id) {
                return (transacting) ? transGet(id) : normalGet(id);
            },
            getDeep: function (id, property, defaultValue) {
                var obj = api.get(id);
                if (obj === undefined || external.is(property).empty) {
                    return defaultValue;
                }

                var keys = property.trim().split(".");
                var currentObj = obj;
                for (var i = 0; i < keys.length; ++i) {
                    if (currentObj[keys[i]] === undefined) {
                        return defaultValue;
                    }
                    currentObj = currentObj[keys[i]];
                }

                return (external.is(currentObj).there) ? currentObj : defaultValue;
            },
            set: function (id, value) {
                return (transacting) ? transSet(id, value) : normalSet(id, value);
            },
            remove: function (id) {
                return (transacting) ? transRemove(id) : normalRemove(id);
            },
            revert: function (id) {
                return (transacting) ? false : normalRevert(id);
            },
            begin: function () {
                if (transacting) {
                    // Shit we're already transacting!
                    return false;
                }
                transacting = true;
                transData = { };
                transRemovals = { };
                return true;
            },
            rollback: function () {
                if (!transacting) {
                    // How can we rollback outside of a transaction? ugh
                    return false;
                }

                transacting = false;
                transData = undefined;
                transRemovals = undefined;
                return true;
            },
            commit: function () {
                if (!transacting) {
                    // How can we commit outside of a transaction? ugh
                    return false;
                }

                transacting = false;
                for (var key in transData) {
                    if (transData.hasOwnProperty(key)) {
                        normalSet(key, transData[key]);
                    }
                }
                for (var key in transRemovals) {
                    if (transRemovals.hasOwnProperty(key)) {
                        normalRemove(key);
                    }
                }
                transData = undefined;
                transRemovals = undefined;
                return true;
            }
        };

        Object.defineProperty(api, "meta", {
            get: function () {
                return meta;
            }
        });

        Object.defineProperty(api, "data", {
            get: function () {
                return (transacting) ? internal.merge(flatCache, transData) : flatCache;
            }
        });

        return api;
    };

    // Provide a mache instance for msngr.config.
    external.config = external.mache();
}));

msngr.extend((function(external, internal) {
    "use strict";

    // Setup constants
    var defaults = {
        path: "/",
        protocol: "http",
        port: {
            http: "80",
            https: "443"
        },
        autoJson: true
    };

    // This method handles requests when msngr is running within a semi-modern net browser
    var browser = function(server, options, callback) {
        try {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        var obj;
                        if (options.autoJson === true && (this.getResponseHeader("content-type") || "").toLowerCase() === "application/json") {
                            try {
                                obj = JSON.parse(xhr.response);
                            } catch (ex) {
                                // Don't do anything; probably wasn't JSON anyway
                                // Set obj to undefined just incase it contains something awful
                                obj = undefined;
                            }
                        }
                        if (external.is(callback).there) {
                            callback.apply(undefined, [null, (obj || xhr.response)]);
                        }
                    } else {
                        var errObj = {
                            status: xhr.status,
                            response: xhr.response
                        };
                        if (external.is(callback).there) {
                            callback.apply(undefined, [errObj, null]);
                        }
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
            if (external.is(options.payload).there) {
                if (external.is(options.payload).object) {
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

            xhr.open(options.method, url, true);
            if (external.is(options.headers).there) {
                for (var key in options.headers) {
                    if (options.headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    }
                }
            }
            xhr.send(datum);
        } catch (ex) {
            if (external.is(callback).there) {
                callback.apply(undefined, [ex, null]);
            }
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
                if (options.autoJson === true && (response.headers["content-type"] || "").toLowerCase() === "application/json") {
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
                if (external.is(callback).there) {
                    callback.apply(undefined, [errObj, obj]);
                }
            });
        });

        if (external.is(options.payload).there) {
            var datum;
            if (external.is(options.payload).object) {
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
        if (external.is(opts.query).there) {
            if (external.is(opts.query).string) {
                opts.queryString = opts.query;
            }

            if (external.is(opts.query).object) {
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

        if (external.is.browser) {
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

        if (external.is(protocol).empty) {
            invalid = true;
            invalidReason = "Protocol or host not provided";
        }

        if (!invalid && !external.is(protocol).empty && external.is(host).empty && external.is(port).empty) {
            // Only one argument was provided; must be whole host.
            var split = protocol.split("://");
            if (split.length == 2) {
                server.protocol = split[0];
                server.host = split[1];
            } else {
                // Must have omitted protocol.
                server.host = protocol;
                server.protocol = defaults.protocol;
            }

            var lastColon = server.host.lastIndexOf(":");
            if (lastColon !== -1) {
                // There is a port; let's grab it!
                server.port = server.host.substring(lastColon + 1, server.host.length);
                server.host = server.host.substring(0, lastColon);
            } else {
                // There ain't no port!
                server.port = defaults.port[server.protocol];
            }

            handled = true;
        }

        if (!invalid && !handled && !external.is(protocol).empty && !external.is(host).empty && external.is(port).empty) {
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
                server.port = defaults.port[server.protocol];
            }

            handled = true;
        }

        if (!invalid && !handled && !external.is(protocol).empty && !external.is(host).empty && !external.is(port).empty) {
            // Everything is provided. Holy shit, does that ever happen!?
            server.protocol = protocol;
            server.host = host;
            server.port = port;

            handled = true;
        }

        // Port explicitness can be omitted for some protocols where the port is their default
        // so let's mark them as can be omitted. This will make output less confusing for
        // more inexperienced developers plus it looks prettier :).
        if (!invalid && handled && defaults.port[server.protocol] === server.port) {
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

    external.net = function(protocol, host, port) {
        var server = figureOutServer(protocol, host, port);

        var netObj = {
            get: function(options, callback) {
                var opts = internal.merge(external.copy(defaults), options);
                opts.method = "get";
                request(server, opts, callback);
            },
            post: function(options, callback) {
                var opts = internal.merge(external.copy(defaults), options);
                opts.method = "post";
                request(server, opts, callback);
            },
            put: function(options, callback) {
                var opts = internal.merge(external.copy(defaults), options);
                opts.method = "put";
                request(server, opts, callback);
            },
            delete: function(options, callback) {
                var opts = internal.merge(external.copy(defaults), options);
                opts.method = "delete";
                request(server, opts, callback);
            },
            options: function(options, callback) {
                var opts = internal.merge(external.copy(defaults), options);
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
    };
}));

/*
	module.exports.js

	If we're running in a node.js.
*/
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = msngr;
}
