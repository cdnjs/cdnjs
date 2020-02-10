/* Sinon.JS 8.0.0, 2019-12-22, @license BSD-3 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sinon = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var behavior = require("./sinon/behavior");
var createSandbox = require("./sinon/create-sandbox");
var extend = require("./sinon/util/core/extend");
var fakeTimers = require("./sinon/util/fake-timers");
var format = require("./sinon/util/core/format");
var nise = require("nise");
var Sandbox = require("./sinon/sandbox");
var stub = require("./sinon/stub");

var apiMethods = {
    createSandbox: createSandbox,
    assert: require("./sinon/assert"),
    match: require("@sinonjs/samsam").createMatcher,
    restoreObject: require("./sinon/restore-object"),

    expectation: require("./sinon/mock-expectation"),
    defaultConfig: require("./sinon/util/core/default-config"),

    setFormatter: format.setFormatter,

    // fake timers
    timers: fakeTimers.timers,

    // fake XHR
    xhr: nise.fakeXhr.xhr,
    FakeXMLHttpRequest: nise.fakeXhr.FakeXMLHttpRequest,

    // fake server
    fakeServer: nise.fakeServer,
    fakeServerWithClock: nise.fakeServerWithClock,
    createFakeServer: nise.fakeServer.create.bind(nise.fakeServer),
    createFakeServerWithClock: nise.fakeServerWithClock.create.bind(nise.fakeServerWithClock),

    addBehavior: function(name, fn) {
        behavior.addBehavior(stub, name, fn);
    }
};

var sandbox = new Sandbox();

var api = extend(sandbox, apiMethods);

module.exports = api;

},{"./sinon/assert":2,"./sinon/behavior":3,"./sinon/create-sandbox":6,"./sinon/mock-expectation":9,"./sinon/restore-object":15,"./sinon/sandbox":16,"./sinon/stub":19,"./sinon/util/core/default-config":21,"./sinon/util/core/extend":23,"./sinon/util/core/format":24,"./sinon/util/fake-timers":37,"@sinonjs/samsam":80,"nise":98}],2:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var calledInOrder = require("@sinonjs/commons").calledInOrder;
var createMatcher = require("@sinonjs/samsam").createMatcher;
var orderByFirstCall = require("@sinonjs/commons").orderByFirstCall;
var timesInWords = require("./util/core/times-in-words");
var format = require("./util/core/format");
var stringSlice = require("@sinonjs/commons").prototypes.string.slice;
var globalObject = require("@sinonjs/commons").global;

var arraySlice = arrayProto.slice;
var concat = arrayProto.concat;
var forEach = arrayProto.forEach;
var join = arrayProto.join;
var splice = arrayProto.splice;

var assert;

function verifyIsStub() {
    var args = arraySlice(arguments);

    forEach(args, function(method) {
        if (!method) {
            assert.fail("fake is not a spy");
        }

        if (method.proxy && method.proxy.isSinonProxy) {
            verifyIsStub(method.proxy);
        } else {
            if (typeof method !== "function") {
                assert.fail(method + " is not a function");
            }

            if (typeof method.getCall !== "function") {
                assert.fail(method + " is not stubbed");
            }
        }
    });
}

function verifyIsValidAssertion(assertionMethod, assertionArgs) {
    switch (assertionMethod) {
        case "notCalled":
        case "called":
        case "calledOnce":
        case "calledTwice":
        case "calledThrice":
            if (assertionArgs.length !== 0) {
                assert.fail(
                    assertionMethod +
                        " takes 1 argument but was called with " +
                        (assertionArgs.length + 1) +
                        " arguments"
                );
            }
            break;
        default:
            break;
    }
}

function failAssertion(object, msg) {
    var obj = object || globalObject;
    var failMethod = obj.fail || assert.fail;
    failMethod.call(obj, msg);
}

function mirrorPropAsAssertion(name, method, message) {
    var msg = message;
    var meth = method;
    if (arguments.length === 2) {
        msg = method;
        meth = name;
    }

    assert[name] = function(fake) {
        verifyIsStub(fake);

        var args = arraySlice(arguments, 1);
        var failed = false;

        verifyIsValidAssertion(name, args);

        if (typeof meth === "function") {
            failed = !meth(fake);
        } else {
            failed = typeof fake[meth] === "function" ? !fake[meth].apply(fake, args) : !fake[meth];
        }

        if (failed) {
            failAssertion(this, (fake.printf || fake.proxy.printf).apply(fake, concat([msg], args)));
        } else {
            assert.pass(name);
        }
    };
}

function exposedName(prefix, prop) {
    return !prefix || /^fail/.test(prop) ? prop : prefix + stringSlice(prop, 0, 1).toUpperCase() + stringSlice(prop, 1);
}

assert = {
    failException: "AssertError",

    fail: function fail(message) {
        var error = new Error(message);
        error.name = this.failException || assert.failException;

        throw error;
    },

    pass: function pass() {
        return;
    },

    callOrder: function assertCallOrder() {
        verifyIsStub.apply(null, arguments);
        var expected = "";
        var actual = "";

        if (!calledInOrder(arguments)) {
            try {
                expected = join(arguments, ", ");
                var calls = arraySlice(arguments);
                var i = calls.length;
                while (i) {
                    if (!calls[--i].called) {
                        splice(calls, i, 1);
                    }
                }
                actual = join(orderByFirstCall(calls), ", ");
            } catch (e) {
                // If this fails, we'll just fall back to the blank string
            }

            failAssertion(this, "expected " + expected + " to be called in order but were called as " + actual);
        } else {
            assert.pass("callOrder");
        }
    },

    callCount: function assertCallCount(method, count) {
        verifyIsStub(method);

        if (method.callCount !== count) {
            var msg = "expected %n to be called " + timesInWords(count) + " but was called %c%C";
            failAssertion(this, method.printf(msg));
        } else {
            assert.pass("callCount");
        }
    },

    expose: function expose(target, options) {
        if (!target) {
            throw new TypeError("target is null or undefined");
        }

        var o = options || {};
        var prefix = (typeof o.prefix === "undefined" && "assert") || o.prefix;
        var includeFail = typeof o.includeFail === "undefined" || Boolean(o.includeFail);
        var instance = this;

        forEach(Object.keys(instance), function(method) {
            if (method !== "expose" && (includeFail || !/^(fail)/.test(method))) {
                target[exposedName(prefix, method)] = instance[method];
            }
        });

        return target;
    },

    match: function match(actual, expectation) {
        var matcher = createMatcher(expectation);
        if (matcher.test(actual)) {
            assert.pass("match");
        } else {
            var formatted = [
                "expected value to match",
                "    expected = " + format(expectation),
                "    actual = " + format(actual)
            ];

            failAssertion(this, join(formatted, "\n"));
        }
    }
};

mirrorPropAsAssertion("called", "expected %n to have been called at least once but was never called");
mirrorPropAsAssertion(
    "notCalled",
    function(spy) {
        return !spy.called;
    },
    "expected %n to not have been called but was called %c%C"
);
mirrorPropAsAssertion("calledOnce", "expected %n to be called once but was called %c%C");
mirrorPropAsAssertion("calledTwice", "expected %n to be called twice but was called %c%C");
mirrorPropAsAssertion("calledThrice", "expected %n to be called thrice but was called %c%C");
mirrorPropAsAssertion("calledOn", "expected %n to be called with %1 as this but was called with %t");
mirrorPropAsAssertion("alwaysCalledOn", "expected %n to always be called with %1 as this but was called with %t");
mirrorPropAsAssertion("calledWithNew", "expected %n to be called with new");
mirrorPropAsAssertion("alwaysCalledWithNew", "expected %n to always be called with new");
mirrorPropAsAssertion("calledWith", "expected %n to be called with arguments %D");
mirrorPropAsAssertion("calledWithMatch", "expected %n to be called with match %D");
mirrorPropAsAssertion("alwaysCalledWith", "expected %n to always be called with arguments %D");
mirrorPropAsAssertion("alwaysCalledWithMatch", "expected %n to always be called with match %D");
mirrorPropAsAssertion("calledWithExactly", "expected %n to be called with exact arguments %D");
mirrorPropAsAssertion("calledOnceWithExactly", "expected %n to be called once and with exact arguments %D");
mirrorPropAsAssertion("alwaysCalledWithExactly", "expected %n to always be called with exact arguments %D");
mirrorPropAsAssertion("neverCalledWith", "expected %n to never be called with arguments %*%C");
mirrorPropAsAssertion("neverCalledWithMatch", "expected %n to never be called with match %*%C");
mirrorPropAsAssertion("threw", "%n did not throw exception%C");
mirrorPropAsAssertion("alwaysThrew", "%n did not always throw exception%C");

module.exports = assert;

},{"./util/core/format":24,"./util/core/times-in-words":32,"@sinonjs/commons":44,"@sinonjs/samsam":80}],3:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var extend = require("./util/core/extend");
var functionName = require("@sinonjs/commons").functionName;
var nextTick = require("./util/core/next-tick");
var valueToString = require("@sinonjs/commons").valueToString;
var exportAsyncBehaviors = require("./util/core/export-async-behaviors");

var concat = arrayProto.concat;
var join = arrayProto.join;
var reverse = arrayProto.reverse;
var slice = arrayProto.slice;

var useLeftMostCallback = -1;
var useRightMostCallback = -2;

function getCallback(behavior, args) {
    var callArgAt = behavior.callArgAt;

    if (callArgAt >= 0) {
        return args[callArgAt];
    }

    var argumentList;

    if (callArgAt === useLeftMostCallback) {
        argumentList = args;
    }

    if (callArgAt === useRightMostCallback) {
        argumentList = reverse(slice(args));
    }

    var callArgProp = behavior.callArgProp;

    for (var i = 0, l = argumentList.length; i < l; ++i) {
        if (!callArgProp && typeof argumentList[i] === "function") {
            return argumentList[i];
        }

        if (callArgProp && argumentList[i] && typeof argumentList[i][callArgProp] === "function") {
            return argumentList[i][callArgProp];
        }
    }

    return null;
}

function getCallbackError(behavior, func, args) {
    if (behavior.callArgAt < 0) {
        var msg;

        if (behavior.callArgProp) {
            msg =
                functionName(behavior.stub) +
                " expected to yield to '" +
                valueToString(behavior.callArgProp) +
                "', but no object with such a property was passed.";
        } else {
            msg = functionName(behavior.stub) + " expected to yield, but no callback was passed.";
        }

        if (args.length > 0) {
            msg += " Received [" + join(args, ", ") + "]";
        }

        return msg;
    }

    return "argument at index " + behavior.callArgAt + " is not a function: " + func;
}

function ensureArgs(name, behavior, args) {
    // map function name to internal property
    //   callsArg => callArgAt
    var property = name.replace(/sArg/, "ArgAt");
    var index = behavior[property];

    if (index >= args.length) {
        throw new TypeError(
            name + " failed: " + (index + 1) + " arguments required but only " + args.length + " present"
        );
    }
}

function callCallback(behavior, args) {
    if (typeof behavior.callArgAt === "number") {
        ensureArgs("callsArg", behavior, args);
        var func = getCallback(behavior, args);

        if (typeof func !== "function") {
            throw new TypeError(getCallbackError(behavior, func, args));
        }

        if (behavior.callbackAsync) {
            nextTick(function() {
                func.apply(behavior.callbackContext, behavior.callbackArguments);
            });
        } else {
            return func.apply(behavior.callbackContext, behavior.callbackArguments);
        }
    }

    return undefined;
}

var proto = {
    create: function create(stub) {
        var behavior = extend({}, proto);
        delete behavior.create;
        delete behavior.addBehavior;
        delete behavior.createBehavior;
        behavior.stub = stub;

        if (stub.defaultBehavior && stub.defaultBehavior.promiseLibrary) {
            behavior.promiseLibrary = stub.defaultBehavior.promiseLibrary;
        }

        return behavior;
    },

    isPresent: function isPresent() {
        return (
            typeof this.callArgAt === "number" ||
            this.exception ||
            this.exceptionCreator ||
            typeof this.returnArgAt === "number" ||
            this.returnThis ||
            typeof this.resolveArgAt === "number" ||
            this.resolveThis ||
            typeof this.throwArgAt === "number" ||
            this.fakeFn ||
            this.returnValueDefined
        );
    },

    /*eslint complexity: ["error", 20]*/
    invoke: function invoke(context, args) {
        /*
         * callCallback (conditionally) calls ensureArgs
         *
         * Note: callCallback intentionally happens before
         * everything else and cannot be moved lower
         */
        var returnValue = callCallback(this, args);

        if (this.exception) {
            throw this.exception;
        } else if (this.exceptionCreator) {
            this.exception = this.exceptionCreator();
            this.exceptionCreator = undefined;
            throw this.exception;
        } else if (typeof this.returnArgAt === "number") {
            ensureArgs("returnsArg", this, args);
            return args[this.returnArgAt];
        } else if (this.returnThis) {
            return context;
        } else if (typeof this.throwArgAt === "number") {
            ensureArgs("throwsArg", this, args);
            throw args[this.throwArgAt];
        } else if (this.fakeFn) {
            return this.fakeFn.apply(context, args);
        } else if (typeof this.resolveArgAt === "number") {
            ensureArgs("resolvesArg", this, args);
            return (this.promiseLibrary || Promise).resolve(args[this.resolveArgAt]);
        } else if (this.resolveThis) {
            return (this.promiseLibrary || Promise).resolve(context);
        } else if (this.resolve) {
            return (this.promiseLibrary || Promise).resolve(this.returnValue);
        } else if (this.reject) {
            return (this.promiseLibrary || Promise).reject(this.returnValue);
        } else if (this.callsThrough) {
            var wrappedMethod = this.effectiveWrappedMethod();

            return wrappedMethod.apply(context, args);
        } else if (this.callsThroughWithNew) {
            // Get the original method (assumed to be a constructor in this case)
            var WrappedClass = this.effectiveWrappedMethod();
            // Turn the arguments object into a normal array
            var argsArray = slice(args);
            // Call the constructor
            var F = WrappedClass.bind.apply(WrappedClass, concat([null], argsArray));
            return new F();
        } else if (typeof this.returnValue !== "undefined") {
            return this.returnValue;
        } else if (typeof this.callArgAt === "number") {
            return returnValue;
        }

        return this.returnValue;
    },

    effectiveWrappedMethod: function effectiveWrappedMethod() {
        for (var stubb = this.stub; stubb; stubb = stubb.parent) {
            if (stubb.wrappedMethod) {
                return stubb.wrappedMethod;
            }
        }
        throw new Error("Unable to find wrapped method");
    },

    onCall: function onCall(index) {
        return this.stub.onCall(index);
    },

    onFirstCall: function onFirstCall() {
        return this.stub.onFirstCall();
    },

    onSecondCall: function onSecondCall() {
        return this.stub.onSecondCall();
    },

    onThirdCall: function onThirdCall() {
        return this.stub.onThirdCall();
    },

    withArgs: function withArgs(/* arguments */) {
        throw new Error(
            'Defining a stub by invoking "stub.onCall(...).withArgs(...)" ' +
                'is not supported. Use "stub.withArgs(...).onCall(...)" ' +
                "to define sequential behavior for calls with certain arguments."
        );
    }
};

function createBehavior(behaviorMethod) {
    return function() {
        this.defaultBehavior = this.defaultBehavior || proto.create(this);
        this.defaultBehavior[behaviorMethod].apply(this.defaultBehavior, arguments);
        return this;
    };
}

function addBehavior(stub, name, fn) {
    proto[name] = function() {
        fn.apply(this, concat([this], slice(arguments)));
        return this.stub || this;
    };

    stub[name] = createBehavior(name);
}

proto.addBehavior = addBehavior;
proto.createBehavior = createBehavior;

var asyncBehaviors = exportAsyncBehaviors(proto);

module.exports = extend.nonEnum({}, proto, asyncBehaviors);

},{"./util/core/export-async-behaviors":22,"./util/core/extend":23,"./util/core/next-tick":31,"@sinonjs/commons":44}],4:[function(require,module,exports){
"use strict";

var walk = require("./util/core/walk");
var getPropertyDescriptor = require("./util/core/get-property-descriptor");
var hasOwnProperty = require("@sinonjs/commons").prototypes.object.hasOwnProperty;
var push = require("@sinonjs/commons").prototypes.array.push;

function collectMethod(methods, object, prop, propOwner) {
    if (typeof getPropertyDescriptor(propOwner, prop).value === "function" && hasOwnProperty(object, prop)) {
        push(methods, object[prop]);
    }
}

// This function returns an array of all the own methods on the passed object
function collectOwnMethods(object) {
    var methods = [];

    walk(object, collectMethod.bind(null, methods, object));

    return methods;
}

module.exports = collectOwnMethods;

},{"./util/core/get-property-descriptor":27,"./util/core/walk":35,"@sinonjs/commons":44}],5:[function(require,module,exports){
"use strict";

var supportsColor = require("supports-color");

function colorize(str, color) {
    if (supportsColor.stdout === false) {
        return str;
    }

    return "\x1b[" + color + "m" + str + "\x1b[0m";
}

exports.red = function(str) {
    return colorize(str, 31);
};

exports.green = function(str) {
    return colorize(str, 32);
};

exports.cyan = function(str) {
    return colorize(str, 96);
};

exports.white = function(str) {
    return colorize(str, 39);
};

exports.bold = function(str) {
    return colorize(str, 1);
};

},{"supports-color":100}],6:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var Sandbox = require("./sandbox");

var forEach = arrayProto.forEach;
var push = arrayProto.push;

function prepareSandboxFromConfig(config) {
    var sandbox = new Sandbox();

    if (config.useFakeServer) {
        if (typeof config.useFakeServer === "object") {
            sandbox.serverPrototype = config.useFakeServer;
        }

        sandbox.useFakeServer();
    }

    if (config.useFakeTimers) {
        if (typeof config.useFakeTimers === "object") {
            sandbox.useFakeTimers(config.useFakeTimers);
        } else {
            sandbox.useFakeTimers();
        }
    }

    return sandbox;
}

function exposeValue(sandbox, config, key, value) {
    if (!value) {
        return;
    }

    if (config.injectInto && !(key in config.injectInto)) {
        config.injectInto[key] = value;
        push(sandbox.injectedKeys, key);
    } else {
        push(sandbox.args, value);
    }
}

function createSandbox(config) {
    if (!config) {
        return new Sandbox();
    }

    var configuredSandbox = prepareSandboxFromConfig(config);
    configuredSandbox.args = configuredSandbox.args || [];
    configuredSandbox.injectedKeys = [];
    configuredSandbox.injectInto = config.injectInto;
    var exposed = configuredSandbox.inject({});

    if (config.properties) {
        forEach(config.properties, function(prop) {
            var value = exposed[prop] || (prop === "sandbox" && configuredSandbox);
            exposeValue(configuredSandbox, config, prop, value);
        });
    } else {
        exposeValue(configuredSandbox, config, "sandbox");
    }

    return configuredSandbox;
}

module.exports = createSandbox;

},{"./sandbox":16,"@sinonjs/commons":44}],7:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var isPropertyConfigurable = require("./util/core/is-property-configurable");
var exportAsyncBehaviors = require("./util/core/export-async-behaviors");
var extend = require("./util/core/extend");

var slice = arrayProto.slice;

var useLeftMostCallback = -1;
var useRightMostCallback = -2;

function throwsException(fake, error, message) {
    if (typeof error === "function") {
        fake.exceptionCreator = error;
    } else if (typeof error === "string") {
        fake.exceptionCreator = function() {
            var newException = new Error(message || "");
            newException.name = error;
            return newException;
        };
    } else if (!error) {
        fake.exceptionCreator = function() {
            return new Error("Error");
        };
    } else {
        fake.exception = error;
    }
}

var defaultBehaviors = {
    callsFake: function callsFake(fake, fn) {
        fake.fakeFn = fn;
    },

    callsArg: function callsArg(fake, index) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }

        fake.callArgAt = index;
        fake.callbackArguments = [];
        fake.callbackContext = undefined;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
    },

    callsArgOn: function callsArgOn(fake, index, context) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }

        fake.callArgAt = index;
        fake.callbackArguments = [];
        fake.callbackContext = context;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
    },

    callsArgWith: function callsArgWith(fake, index) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }

        fake.callArgAt = index;
        fake.callbackArguments = slice(arguments, 2);
        fake.callbackContext = undefined;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
    },

    callsArgOnWith: function callsArgWith(fake, index, context) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }

        fake.callArgAt = index;
        fake.callbackArguments = slice(arguments, 3);
        fake.callbackContext = context;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
    },

    usingPromise: function usingPromise(fake, promiseLibrary) {
        fake.promiseLibrary = promiseLibrary;
    },

    yields: function(fake) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 1);
        fake.callbackContext = undefined;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
    },

    yieldsRight: function(fake) {
        fake.callArgAt = useRightMostCallback;
        fake.callbackArguments = slice(arguments, 1);
        fake.callbackContext = undefined;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
    },

    yieldsOn: function(fake, context) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 2);
        fake.callbackContext = context;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
    },

    yieldsTo: function(fake, prop) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 2);
        fake.callbackContext = undefined;
        fake.callArgProp = prop;
        fake.callbackAsync = false;
    },

    yieldsToOn: function(fake, prop, context) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 3);
        fake.callbackContext = context;
        fake.callArgProp = prop;
        fake.callbackAsync = false;
    },

    throws: throwsException,
    throwsException: throwsException,

    returns: function returns(fake, value) {
        fake.returnValue = value;
        fake.resolve = false;
        fake.reject = false;
        fake.returnValueDefined = true;
        fake.exception = undefined;
        fake.exceptionCreator = undefined;
        fake.fakeFn = undefined;
    },

    returnsArg: function returnsArg(fake, index) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }

        fake.returnArgAt = index;
    },

    throwsArg: function throwsArg(fake, index) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }

        fake.throwArgAt = index;
    },

    returnsThis: function returnsThis(fake) {
        fake.returnThis = true;
    },

    resolves: function resolves(fake, value) {
        fake.returnValue = value;
        fake.resolve = true;
        fake.resolveThis = false;
        fake.reject = false;
        fake.returnValueDefined = true;
        fake.exception = undefined;
        fake.exceptionCreator = undefined;
        fake.fakeFn = undefined;
    },

    resolvesArg: function resolvesArg(fake, index) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }
        fake.resolveArgAt = index;
        fake.returnValue = undefined;
        fake.resolve = true;
        fake.resolveThis = false;
        fake.reject = false;
        fake.returnValueDefined = false;
        fake.exception = undefined;
        fake.exceptionCreator = undefined;
        fake.fakeFn = undefined;
    },

    rejects: function rejects(fake, error, message) {
        var reason;
        if (typeof error === "string") {
            reason = new Error(message || "");
            reason.name = error;
        } else if (!error) {
            reason = new Error("Error");
        } else {
            reason = error;
        }
        fake.returnValue = reason;
        fake.resolve = false;
        fake.resolveThis = false;
        fake.reject = true;
        fake.returnValueDefined = true;
        fake.exception = undefined;
        fake.exceptionCreator = undefined;
        fake.fakeFn = undefined;

        return fake;
    },

    resolvesThis: function resolvesThis(fake) {
        fake.returnValue = undefined;
        fake.resolve = false;
        fake.resolveThis = true;
        fake.reject = false;
        fake.returnValueDefined = false;
        fake.exception = undefined;
        fake.exceptionCreator = undefined;
        fake.fakeFn = undefined;
    },

    callThrough: function callThrough(fake) {
        fake.callsThrough = true;
    },

    callThroughWithNew: function callThroughWithNew(fake) {
        fake.callsThroughWithNew = true;
    },

    get: function get(fake, getterFunction) {
        var rootStub = fake.stub || fake;

        Object.defineProperty(rootStub.rootObj, rootStub.propName, {
            get: getterFunction,
            configurable: isPropertyConfigurable(rootStub.rootObj, rootStub.propName)
        });

        return fake;
    },

    set: function set(fake, setterFunction) {
        var rootStub = fake.stub || fake;

        Object.defineProperty(
            rootStub.rootObj,
            rootStub.propName,
            // eslint-disable-next-line accessor-pairs
            {
                set: setterFunction,
                configurable: isPropertyConfigurable(rootStub.rootObj, rootStub.propName)
            }
        );

        return fake;
    },

    value: function value(fake, newVal) {
        var rootStub = fake.stub || fake;

        Object.defineProperty(rootStub.rootObj, rootStub.propName, {
            value: newVal,
            enumerable: true,
            configurable: isPropertyConfigurable(rootStub.rootObj, rootStub.propName)
        });

        return fake;
    }
};

var asyncBehaviors = exportAsyncBehaviors(defaultBehaviors);

module.exports = extend({}, defaultBehaviors, asyncBehaviors);

},{"./util/core/export-async-behaviors":22,"./util/core/extend":23,"./util/core/is-property-configurable":30,"@sinonjs/commons":44}],8:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var createProxy = require("./proxy");
var nextTick = require("./util/core/next-tick");

var slice = arrayProto.slice;

function getError(value) {
    return value instanceof Error ? value : new Error(value);
}

var uuid = 0;
function wrapFunc(f) {
    var proxy;
    var fakeInstance = function() {
        var lastArg = arguments.length > 0 ? arguments[arguments.length - 1] : undefined;
        var callback = lastArg && typeof lastArg === "function" ? lastArg : undefined;

        proxy.lastArg = lastArg;
        proxy.callback = callback;

        return f && f.apply(this, arguments);
    };
    proxy = createProxy(fakeInstance, f || fakeInstance);

    proxy.displayName = "fake";
    proxy.id = "fake#" + uuid++;

    return proxy;
}

function fake(f) {
    if (arguments.length > 0 && typeof f !== "function") {
        throw new TypeError("Expected f argument to be a Function");
    }

    return wrapFunc(f);
}

fake.returns = function returns(value) {
    function f() {
        return value;
    }

    return wrapFunc(f);
};

fake.throws = function throws(value) {
    function f() {
        throw getError(value);
    }

    return wrapFunc(f);
};

fake.resolves = function resolves(value) {
    function f() {
        return Promise.resolve(value);
    }

    return wrapFunc(f);
};

fake.rejects = function rejects(value) {
    function f() {
        return Promise.reject(getError(value));
    }

    return wrapFunc(f);
};

function yieldInternal(async, values) {
    function f() {
        var callback = arguments[arguments.length - 1];
        if (typeof callback !== "function") {
            throw new TypeError("Expected last argument to be a function");
        }
        if (async) {
            nextTick(function() {
                callback.apply(null, values);
            });
        } else {
            callback.apply(null, values);
        }
    }

    return wrapFunc(f);
}

fake.yields = function yields() {
    return yieldInternal(false, slice(arguments));
};

fake.yieldsAsync = function yieldsAsync() {
    return yieldInternal(true, slice(arguments));
};

module.exports = fake;

},{"./proxy":14,"./util/core/next-tick":31,"@sinonjs/commons":44}],9:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var proxyInvoke = require("./proxy-invoke");
var proxyCallToString = require("./proxy-call").toString;
var timesInWords = require("./util/core/times-in-words");
var extend = require("./util/core/extend");
var match = require("@sinonjs/samsam").createMatcher;
var stub = require("./stub");
var assert = require("./assert");
var deepEqual = require("@sinonjs/samsam").deepEqual;
var format = require("./util/core/format");
var valueToString = require("@sinonjs/commons").valueToString;

var every = arrayProto.every;
var forEach = arrayProto.forEach;
var push = arrayProto.push;
var slice = arrayProto.slice;

function callCountInWords(callCount) {
    if (callCount === 0) {
        return "never called";
    }

    return "called " + timesInWords(callCount);
}

function expectedCallCountInWords(expectation) {
    var min = expectation.minCalls;
    var max = expectation.maxCalls;

    if (typeof min === "number" && typeof max === "number") {
        var str = timesInWords(min);

        if (min !== max) {
            str = "at least " + str + " and at most " + timesInWords(max);
        }

        return str;
    }

    if (typeof min === "number") {
        return "at least " + timesInWords(min);
    }

    return "at most " + timesInWords(max);
}

function receivedMinCalls(expectation) {
    var hasMinLimit = typeof expectation.minCalls === "number";
    return !hasMinLimit || expectation.callCount >= expectation.minCalls;
}

function receivedMaxCalls(expectation) {
    if (typeof expectation.maxCalls !== "number") {
        return false;
    }

    return expectation.callCount === expectation.maxCalls;
}

function verifyMatcher(possibleMatcher, arg) {
    var isMatcher = match.isMatcher(possibleMatcher);

    return (isMatcher && possibleMatcher.test(arg)) || true;
}

var mockExpectation = {
    minCalls: 1,
    maxCalls: 1,

    create: function create(methodName) {
        var expectation = extend.nonEnum(stub(), mockExpectation);
        delete expectation.create;
        expectation.method = methodName;

        return expectation;
    },

    invoke: function invoke(func, thisValue, args) {
        this.verifyCallAllowed(thisValue, args);

        return proxyInvoke.apply(this, arguments);
    },

    atLeast: function atLeast(num) {
        if (typeof num !== "number") {
            throw new TypeError("'" + valueToString(num) + "' is not number");
        }

        if (!this.limitsSet) {
            this.maxCalls = null;
            this.limitsSet = true;
        }

        this.minCalls = num;

        return this;
    },

    atMost: function atMost(num) {
        if (typeof num !== "number") {
            throw new TypeError("'" + valueToString(num) + "' is not number");
        }

        if (!this.limitsSet) {
            this.minCalls = null;
            this.limitsSet = true;
        }

        this.maxCalls = num;

        return this;
    },

    never: function never() {
        return this.exactly(0);
    },

    once: function once() {
        return this.exactly(1);
    },

    twice: function twice() {
        return this.exactly(2);
    },

    thrice: function thrice() {
        return this.exactly(3);
    },

    exactly: function exactly(num) {
        if (typeof num !== "number") {
            throw new TypeError("'" + valueToString(num) + "' is not a number");
        }

        this.atLeast(num);
        return this.atMost(num);
    },

    met: function met() {
        return !this.failed && receivedMinCalls(this);
    },

    verifyCallAllowed: function verifyCallAllowed(thisValue, args) {
        var expectedArguments = this.expectedArguments;

        if (receivedMaxCalls(this)) {
            this.failed = true;
            mockExpectation.fail(this.method + " already called " + timesInWords(this.maxCalls));
        }

        if ("expectedThis" in this && this.expectedThis !== thisValue) {
            mockExpectation.fail(
                this.method +
                    " called with " +
                    valueToString(thisValue) +
                    " as thisValue, expected " +
                    valueToString(this.expectedThis)
            );
        }

        if (!("expectedArguments" in this)) {
            return;
        }

        if (!args) {
            mockExpectation.fail(this.method + " received no arguments, expected " + format(expectedArguments));
        }

        if (args.length < expectedArguments.length) {
            mockExpectation.fail(
                this.method +
                    " received too few arguments (" +
                    format(args) +
                    "), expected " +
                    format(expectedArguments)
            );
        }

        if (this.expectsExactArgCount && args.length !== expectedArguments.length) {
            mockExpectation.fail(
                this.method +
                    " received too many arguments (" +
                    format(args) +
                    "), expected " +
                    format(expectedArguments)
            );
        }

        forEach(
            expectedArguments,
            function(expectedArgument, i) {
                if (!verifyMatcher(expectedArgument, args[i])) {
                    mockExpectation.fail(
                        this.method +
                            " received wrong arguments " +
                            format(args) +
                            ", didn't match " +
                            String(expectedArguments)
                    );
                }

                if (!deepEqual(args[i], expectedArgument)) {
                    mockExpectation.fail(
                        this.method +
                            " received wrong arguments " +
                            format(args) +
                            ", expected " +
                            format(expectedArguments)
                    );
                }
            },
            this
        );
    },

    allowsCall: function allowsCall(thisValue, args) {
        var expectedArguments = this.expectedArguments;

        if (this.met() && receivedMaxCalls(this)) {
            return false;
        }

        if ("expectedThis" in this && this.expectedThis !== thisValue) {
            return false;
        }

        if (!("expectedArguments" in this)) {
            return true;
        }

        // eslint-disable-next-line no-underscore-dangle
        var _args = args || [];

        if (_args.length < expectedArguments.length) {
            return false;
        }

        if (this.expectsExactArgCount && _args.length !== expectedArguments.length) {
            return false;
        }

        return every(expectedArguments, function(expectedArgument, i) {
            if (!verifyMatcher(expectedArgument, _args[i])) {
                return false;
            }

            if (!deepEqual(_args[i], expectedArgument)) {
                return false;
            }

            return true;
        });
    },

    withArgs: function withArgs() {
        this.expectedArguments = slice(arguments);
        return this;
    },

    withExactArgs: function withExactArgs() {
        this.withArgs.apply(this, arguments);
        this.expectsExactArgCount = true;
        return this;
    },

    on: function on(thisValue) {
        this.expectedThis = thisValue;
        return this;
    },

    toString: function() {
        var args = slice(this.expectedArguments || []);

        if (!this.expectsExactArgCount) {
            push(args, "[...]");
        }

        var callStr = proxyCallToString.call({
            proxy: this.method || "anonymous mock expectation",
            args: args
        });

        var message = callStr.replace(", [...", "[, ...") + " " + expectedCallCountInWords(this);

        if (this.met()) {
            return "Expectation met: " + message;
        }

        return "Expected " + message + " (" + callCountInWords(this.callCount) + ")";
    },

    verify: function verify() {
        if (!this.met()) {
            mockExpectation.fail(String(this));
        } else {
            mockExpectation.pass(String(this));
        }

        return true;
    },

    pass: function pass(message) {
        assert.pass(message);
    },

    fail: function fail(message) {
        var exception = new Error(message);
        exception.name = "ExpectationError";

        throw exception;
    }
};

module.exports = mockExpectation;

},{"./assert":2,"./proxy-call":12,"./proxy-invoke":13,"./stub":19,"./util/core/extend":23,"./util/core/format":24,"./util/core/times-in-words":32,"@sinonjs/commons":44,"@sinonjs/samsam":80}],10:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var mockExpectation = require("./mock-expectation");
var proxyCallToString = require("./proxy-call").toString;
var extend = require("./util/core/extend");
var deepEqual = require("@sinonjs/samsam").deepEqual;
var wrapMethod = require("./util/core/wrap-method");
var usePromiseLibrary = require("./util/core/use-promise-library");

var concat = arrayProto.concat;
var filter = arrayProto.filter;
var forEach = arrayProto.forEach;
var every = arrayProto.every;
var join = arrayProto.join;
var push = arrayProto.push;
var slice = arrayProto.slice;
var unshift = arrayProto.unshift;

function mock(object) {
    if (!object || typeof object === "string") {
        return mockExpectation.create(object ? object : "Anonymous mock");
    }

    return mock.create(object);
}

function each(collection, callback) {
    var col = collection || [];

    forEach(col, callback);
}

function arrayEquals(arr1, arr2, compareLength) {
    if (compareLength && arr1.length !== arr2.length) {
        return false;
    }

    return every(arr1, function(element, i) {
        return deepEqual(arr2[i], element);
    });
}

extend(mock, {
    create: function create(object) {
        if (!object) {
            throw new TypeError("object is null");
        }

        var mockObject = extend.nonEnum({}, mock, { object: object });
        delete mockObject.create;

        return mockObject;
    },

    expects: function expects(method) {
        if (!method) {
            throw new TypeError("method is falsy");
        }

        if (!this.expectations) {
            this.expectations = {};
            this.proxies = [];
            this.failures = [];
        }

        if (!this.expectations[method]) {
            this.expectations[method] = [];
            var mockObject = this;

            wrapMethod(this.object, method, function() {
                return mockObject.invokeMethod(method, this, arguments);
            });

            push(this.proxies, method);
        }

        var expectation = mockExpectation.create(method);
        expectation.wrappedMethod = this.object[method].wrappedMethod;
        push(this.expectations[method], expectation);
        usePromiseLibrary(this.promiseLibrary, expectation);

        return expectation;
    },

    restore: function restore() {
        var object = this.object;

        each(this.proxies, function(proxy) {
            if (typeof object[proxy].restore === "function") {
                object[proxy].restore();
            }
        });
    },

    verify: function verify() {
        var expectations = this.expectations || {};
        var messages = this.failures ? slice(this.failures) : [];
        var met = [];

        each(this.proxies, function(proxy) {
            each(expectations[proxy], function(expectation) {
                if (!expectation.met()) {
                    push(messages, String(expectation));
                } else {
                    push(met, String(expectation));
                }
            });
        });

        this.restore();

        if (messages.length > 0) {
            mockExpectation.fail(join(concat(messages, met), "\n"));
        } else if (met.length > 0) {
            mockExpectation.pass(join(concat(messages, met), "\n"));
        }

        return true;
    },

    usingPromise: function usingPromise(promiseLibrary) {
        this.promiseLibrary = promiseLibrary;

        return this;
    },

    invokeMethod: function invokeMethod(method, thisValue, args) {
        /* if we cannot find any matching files we will explicitly call mockExpection#fail with error messages */
        /* eslint consistent-return: "off" */
        var expectations = this.expectations && this.expectations[method] ? this.expectations[method] : [];
        var currentArgs = args || [];
        var available;

        var expectationsWithMatchingArgs = filter(expectations, function(expectation) {
            var expectedArgs = expectation.expectedArguments || [];

            return arrayEquals(expectedArgs, currentArgs, expectation.expectsExactArgCount);
        });

        var expectationsToApply = filter(expectationsWithMatchingArgs, function(expectation) {
            return !expectation.met() && expectation.allowsCall(thisValue, args);
        });

        if (expectationsToApply.length > 0) {
            return expectationsToApply[0].apply(thisValue, args);
        }

        var messages = [];
        var exhausted = 0;

        forEach(expectationsWithMatchingArgs, function(expectation) {
            if (expectation.allowsCall(thisValue, args)) {
                available = available || expectation;
            } else {
                exhausted += 1;
            }
        });

        if (available && exhausted === 0) {
            return available.apply(thisValue, args);
        }

        forEach(expectations, function(expectation) {
            push(messages, "    " + String(expectation));
        });

        unshift(
            messages,
            "Unexpected call: " +
                proxyCallToString.call({
                    proxy: method,
                    args: args
                })
        );

        var err = new Error();
        if (!err.stack) {
            // PhantomJS does not serialize the stack trace until the error has been thrown
            try {
                throw err;
            } catch (e) {
                /* empty */
            }
        }
        push(
            this.failures,
            "Unexpected call: " +
                proxyCallToString.call({
                    proxy: method,
                    args: args,
                    stack: err.stack
                })
        );

        mockExpectation.fail(join(messages, "\n"));
    }
});

module.exports = mock;

},{"./mock-expectation":9,"./proxy-call":12,"./util/core/extend":23,"./util/core/use-promise-library":33,"./util/core/wrap-method":36,"@sinonjs/commons":44,"@sinonjs/samsam":80}],11:[function(require,module,exports){
"use strict";

var push = require("@sinonjs/commons").prototypes.array.push;

exports.incrementCallCount = function incrementCallCount(proxy) {
    proxy.called = true;
    proxy.callCount += 1;
    proxy.notCalled = false;
    proxy.calledOnce = proxy.callCount === 1;
    proxy.calledTwice = proxy.callCount === 2;
    proxy.calledThrice = proxy.callCount === 3;
};

exports.createCallProperties = function createCallProperties(proxy) {
    proxy.firstCall = proxy.getCall(0);
    proxy.secondCall = proxy.getCall(1);
    proxy.thirdCall = proxy.getCall(2);
    proxy.lastCall = proxy.getCall(proxy.callCount - 1);
};

exports.delegateToCalls = function delegateToCalls(
    proxy,
    method,
    matchAny,
    actual,
    returnsValues,
    notCalled,
    totalCallCount
) {
    proxy[method] = function() {
        if (!this.called) {
            if (notCalled) {
                return notCalled.apply(this, arguments);
            }
            return false;
        }

        if (totalCallCount !== undefined && this.callCount !== totalCallCount) {
            return false;
        }

        var currentCall;
        var matches = 0;
        var returnValues = [];

        for (var i = 0, l = this.callCount; i < l; i += 1) {
            currentCall = this.getCall(i);
            var returnValue = currentCall[actual || method].apply(currentCall, arguments);
            push(returnValues, returnValue);
            if (returnValue) {
                matches += 1;

                if (matchAny) {
                    return true;
                }
            }
        }

        if (returnsValues) {
            return returnValues;
        }
        return matches === this.callCount;
    };
};

},{"@sinonjs/commons":44}],12:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var match = require("@sinonjs/samsam").createMatcher;
var deepEqual = require("@sinonjs/samsam").deepEqual;
var functionName = require("@sinonjs/commons").functionName;
var sinonFormat = require("./util/core/format");
var valueToString = require("@sinonjs/commons").valueToString;

var concat = arrayProto.concat;
var filter = arrayProto.filter;
var join = arrayProto.join;
var map = arrayProto.map;
var reduce = arrayProto.reduce;
var slice = arrayProto.slice;

function throwYieldError(proxy, text, args) {
    var msg = functionName(proxy) + text;
    if (args.length) {
        msg += " Received [" + join(slice(args), ", ") + "]";
    }
    throw new Error(msg);
}

var callProto = {
    calledOn: function calledOn(thisValue) {
        if (match.isMatcher(thisValue)) {
            return thisValue.test(this.thisValue);
        }
        return this.thisValue === thisValue;
    },

    calledWith: function calledWith() {
        var self = this;
        var calledWithArgs = slice(arguments);

        if (calledWithArgs.length > self.args.length) {
            return false;
        }

        return reduce(
            calledWithArgs,
            function(prev, arg, i) {
                return prev && deepEqual(self.args[i], arg);
            },
            true
        );
    },

    calledWithMatch: function calledWithMatch() {
        var self = this;
        var calledWithMatchArgs = slice(arguments);

        if (calledWithMatchArgs.length > self.args.length) {
            return false;
        }

        return reduce(
            calledWithMatchArgs,
            function(prev, expectation, i) {
                var actual = self.args[i];

                return prev && match(expectation).test(actual);
            },
            true
        );
    },

    calledWithExactly: function calledWithExactly() {
        return arguments.length === this.args.length && this.calledWith.apply(this, arguments);
    },

    notCalledWith: function notCalledWith() {
        return !this.calledWith.apply(this, arguments);
    },

    notCalledWithMatch: function notCalledWithMatch() {
        return !this.calledWithMatch.apply(this, arguments);
    },

    returned: function returned(value) {
        return deepEqual(this.returnValue, value);
    },

    threw: function threw(error) {
        if (typeof error === "undefined" || !this.exception) {
            return Boolean(this.exception);
        }

        return this.exception === error || this.exception.name === error;
    },

    calledWithNew: function calledWithNew() {
        return this.proxy.prototype && this.thisValue instanceof this.proxy;
    },

    calledBefore: function(other) {
        return this.callId < other.callId;
    },

    calledAfter: function(other) {
        return this.callId > other.callId;
    },

    calledImmediatelyBefore: function(other) {
        return this.callId === other.callId - 1;
    },

    calledImmediatelyAfter: function(other) {
        return this.callId === other.callId + 1;
    },

    callArg: function(pos) {
        this.ensureArgIsAFunction(pos);
        return this.args[pos]();
    },

    callArgOn: function(pos, thisValue) {
        this.ensureArgIsAFunction(pos);
        return this.args[pos].apply(thisValue);
    },

    callArgWith: function(pos) {
        return this.callArgOnWith.apply(this, concat([pos, null], slice(arguments, 1)));
    },

    callArgOnWith: function(pos, thisValue) {
        this.ensureArgIsAFunction(pos);
        var args = slice(arguments, 2);
        return this.args[pos].apply(thisValue, args);
    },

    throwArg: function(pos) {
        if (pos > this.args.length) {
            throw new TypeError("Not enough arguments: " + pos + " required but only " + this.args.length + " present");
        }

        throw this.args[pos];
    },

    yield: function() {
        return this.yieldOn.apply(this, concat([null], slice(arguments, 0)));
    },

    yieldOn: function(thisValue) {
        var args = slice(this.args);
        var yieldFn = filter(args, function(arg) {
            return typeof arg === "function";
        })[0];

        if (!yieldFn) {
            throwYieldError(this.proxy, " cannot yield since no callback was passed.", args);
        }

        return yieldFn.apply(thisValue, slice(arguments, 1));
    },

    yieldTo: function(prop) {
        return this.yieldToOn.apply(this, concat([prop, null], slice(arguments, 1)));
    },

    yieldToOn: function(prop, thisValue) {
        var args = slice(this.args);
        var yieldArg = filter(args, function(arg) {
            return arg && typeof arg[prop] === "function";
        })[0];
        var yieldFn = yieldArg && yieldArg[prop];

        if (!yieldFn) {
            throwYieldError(
                this.proxy,
                " cannot yield to '" + valueToString(prop) + "' since no callback was passed.",
                args
            );
        }

        return yieldFn.apply(thisValue, slice(arguments, 2));
    },

    toString: function() {
        var callStr = this.proxy ? String(this.proxy) + "(" : "";
        var formattedArgs;

        if (!this.args) {
            return ":(";
        }

        formattedArgs = map(this.args, function(arg) {
            return sinonFormat(arg);
        });

        callStr = callStr + join(formattedArgs, ", ") + ")";

        if (typeof this.returnValue !== "undefined") {
            callStr += " => " + sinonFormat(this.returnValue);
        }

        if (this.exception) {
            callStr += " !" + this.exception.name;

            if (this.exception.message) {
                callStr += "(" + this.exception.message + ")";
            }
        }
        if (this.stack) {
            // Omit the error message and the two top stack frames in sinon itself:
            callStr += (this.stack.split("\n")[3] || "unknown").replace(/^\s*(?:at\s+|@)?/, " at ");
        }

        return callStr;
    },

    ensureArgIsAFunction: function(pos) {
        if (typeof this.args[pos] !== "function") {
            throw new TypeError(
                "Expected argument at position " + pos + " to be a Function, but was " + typeof this.args[pos]
            );
        }
    }
};
Object.defineProperty(callProto, "stack", {
    enumerable: true,
    configurable: true,
    get: function() {
        return (this.errorWithCallStack && this.errorWithCallStack.stack) || "";
    }
});

callProto.invokeCallback = callProto.yield;

function createProxyCall(proxy, thisValue, args, returnValue, exception, id, errorWithCallStack) {
    if (typeof id !== "number") {
        throw new TypeError("Call id is not a number");
    }

    var proxyCall = Object.create(callProto);
    var lastArg = (args.length > 0 && args[args.length - 1]) || undefined;
    var callback = lastArg && typeof lastArg === "function" ? lastArg : undefined;

    proxyCall.proxy = proxy;
    proxyCall.thisValue = thisValue;
    proxyCall.args = args;
    proxyCall.lastArg = lastArg;
    proxyCall.callback = callback;
    proxyCall.returnValue = returnValue;
    proxyCall.exception = exception;
    proxyCall.callId = id;
    proxyCall.errorWithCallStack = errorWithCallStack;

    return proxyCall;
}
createProxyCall.toString = callProto.toString; // used by mocks

module.exports = createProxyCall;

},{"./util/core/format":24,"@sinonjs/commons":44,"@sinonjs/samsam":80}],13:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var proxyCallUtil = require("./proxy-call-util");

var push = arrayProto.push;
var forEach = arrayProto.forEach;
var concat = arrayProto.concat;
var ErrorConstructor = Error.prototype.constructor;
var bind = Function.prototype.bind;

var callId = 0;

module.exports = function invoke(func, thisValue, args) {
    var matchings = this.matchingFakes(args);
    var currentCallId = callId++;
    var exception, returnValue;

    proxyCallUtil.incrementCallCount(this);
    push(this.thisValues, thisValue);
    push(this.args, args);
    push(this.callIds, currentCallId);
    forEach(matchings, function(matching) {
        proxyCallUtil.incrementCallCount(matching);
        push(matching.thisValues, thisValue);
        push(matching.args, args);
        push(matching.callIds, currentCallId);
    });

    // Make call properties available from within the spied function:
    proxyCallUtil.createCallProperties(this);
    forEach(matchings, proxyCallUtil.createCallProperties);

    try {
        this.invoking = true;

        var thisCall = this.getCall(this.callCount - 1);

        if (thisCall.calledWithNew()) {
            // Call through with `new`
            returnValue = new (bind.apply(this.func || func, concat([thisValue], args)))();

            if (typeof returnValue !== "object") {
                returnValue = thisValue;
            }
        } else {
            returnValue = (this.func || func).apply(thisValue, args);
        }
    } catch (e) {
        exception = e;
    } finally {
        delete this.invoking;
    }

    push(this.exceptions, exception);
    push(this.returnValues, returnValue);
    forEach(matchings, function(matching) {
        push(matching.exceptions, exception);
        push(matching.returnValues, returnValue);
    });

    var err = new ErrorConstructor();
    // 1. Please do not get stack at this point. It may be so very slow, and not actually used
    // 2. PhantomJS does not serialize the stack trace until the error has been thrown:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
    try {
        throw err;
    } catch (e) {
        /* empty */
    }
    push(this.errorsWithCallStack, err);
    forEach(matchings, function(matching) {
        push(matching.errorsWithCallStack, err);
    });

    // Make return value and exception available in the calls:
    proxyCallUtil.createCallProperties(this);
    forEach(matchings, proxyCallUtil.createCallProperties);

    if (exception !== undefined) {
        throw exception;
    }

    return returnValue;
};

},{"./proxy-call-util":11,"@sinonjs/commons":44}],14:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var extend = require("./util/core/extend");
var functionToString = require("./util/core/function-to-string");
var proxyCall = require("./proxy-call");
var proxyCallUtil = require("./proxy-call-util");
var proxyInvoke = require("./proxy-invoke");

var push = arrayProto.push;
var forEach = arrayProto.forEach;
var slice = arrayProto.slice;

var emptyFakes = Object.freeze([]);

// Public API
var proxyApi = {
    toString: functionToString,

    named: function named(name) {
        this.displayName = name;
        var nameDescriptor = Object.getOwnPropertyDescriptor(this, "name");
        if (nameDescriptor && nameDescriptor.configurable) {
            // IE 11 functions don't have a name.
            // Safari 9 has names that are not configurable.
            nameDescriptor.value = name;
            Object.defineProperty(this, "name", nameDescriptor);
        }
        return this;
    },

    invoke: proxyInvoke,

    /*
     * Hook for derived implementation to return fake instances matching the
     * given arguments.
     */
    matchingFakes: function(/*args, strict*/) {
        return emptyFakes;
    },

    getCall: function getCall(i) {
        if (i < 0 || i >= this.callCount) {
            return null;
        }

        return proxyCall(
            this,
            this.thisValues[i],
            this.args[i],
            this.returnValues[i],
            this.exceptions[i],
            this.callIds[i],
            this.errorsWithCallStack[i]
        );
    },

    getCalls: function() {
        var calls = [];
        var i;

        for (i = 0; i < this.callCount; i++) {
            push(calls, this.getCall(i));
        }

        return calls;
    },

    calledBefore: function calledBefore(proxy) {
        if (!this.called) {
            return false;
        }

        if (!proxy.called) {
            return true;
        }

        return this.callIds[0] < proxy.callIds[proxy.callIds.length - 1];
    },

    calledAfter: function calledAfter(proxy) {
        if (!this.called || !proxy.called) {
            return false;
        }

        return this.callIds[this.callCount - 1] > proxy.callIds[0];
    },

    calledImmediatelyBefore: function calledImmediatelyBefore(proxy) {
        if (!this.called || !proxy.called) {
            return false;
        }

        return this.callIds[this.callCount - 1] === proxy.callIds[proxy.callCount - 1] - 1;
    },

    calledImmediatelyAfter: function calledImmediatelyAfter(proxy) {
        if (!this.called || !proxy.called) {
            return false;
        }

        return this.callIds[this.callCount - 1] === proxy.callIds[proxy.callCount - 1] + 1;
    },

    resetHistory: function() {
        if (this.invoking) {
            var err = new Error(
                "Cannot reset Sinon function while invoking it. " +
                    "Move the call to .resetHistory outside of the callback."
            );
            err.name = "InvalidResetException";
            throw err;
        }

        this.called = false;
        this.notCalled = true;
        this.calledOnce = false;
        this.calledTwice = false;
        this.calledThrice = false;
        this.callCount = 0;
        this.firstCall = null;
        this.secondCall = null;
        this.thirdCall = null;
        this.lastCall = null;
        this.args = [];
        this.lastArg = null;
        this.returnValues = [];
        this.thisValues = [];
        this.exceptions = [];
        this.callIds = [];
        this.errorsWithCallStack = [];

        if (this.fakes) {
            forEach(this.fakes, function(fake) {
                fake.resetHistory();
            });
        }

        return this;
    }
};

var delegateToCalls = proxyCallUtil.delegateToCalls;
delegateToCalls(proxyApi, "calledOn", true);
delegateToCalls(proxyApi, "alwaysCalledOn", false, "calledOn");
delegateToCalls(proxyApi, "calledWith", true);
delegateToCalls(proxyApi, "calledOnceWith", true, "calledWith", false, undefined, 1);
delegateToCalls(proxyApi, "calledWithMatch", true);
delegateToCalls(proxyApi, "alwaysCalledWith", false, "calledWith");
delegateToCalls(proxyApi, "alwaysCalledWithMatch", false, "calledWithMatch");
delegateToCalls(proxyApi, "calledWithExactly", true);
delegateToCalls(proxyApi, "calledOnceWithExactly", true, "calledWithExactly", false, undefined, 1);
delegateToCalls(proxyApi, "alwaysCalledWithExactly", false, "calledWithExactly");
delegateToCalls(proxyApi, "neverCalledWith", false, "notCalledWith", false, function() {
    return true;
});
delegateToCalls(proxyApi, "neverCalledWithMatch", false, "notCalledWithMatch", false, function() {
    return true;
});
delegateToCalls(proxyApi, "threw", true);
delegateToCalls(proxyApi, "alwaysThrew", false, "threw");
delegateToCalls(proxyApi, "returned", true);
delegateToCalls(proxyApi, "alwaysReturned", false, "returned");
delegateToCalls(proxyApi, "calledWithNew", true);
delegateToCalls(proxyApi, "alwaysCalledWithNew", false, "calledWithNew");

function createProxy(func, originalFunc) {
    var proxy = wrapFunction(func, originalFunc);

    // Inherit function properties:
    extend(proxy, func);

    proxy.prototype = func.prototype;

    extend.nonEnum(proxy, proxyApi);

    return proxy;
}

function wrapFunction(func, originalFunc) {
    var arity = originalFunc.length;
    var p;
    // Do not change this to use an eval. Projects that depend on sinon block the use of eval.
    // ref: https://github.com/sinonjs/sinon/issues/710
    switch (arity) {
        /*eslint-disable no-unused-vars, max-len*/
        case 0:
            p = function proxy() {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 1:
            p = function proxy(a) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 2:
            p = function proxy(a, b) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 3:
            p = function proxy(a, b, c) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 4:
            p = function proxy(a, b, c, d) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 5:
            p = function proxy(a, b, c, d, e) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 6:
            p = function proxy(a, b, c, d, e, f) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 7:
            p = function proxy(a, b, c, d, e, f, g) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 8:
            p = function proxy(a, b, c, d, e, f, g, h) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 9:
            p = function proxy(a, b, c, d, e, f, g, h, i) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 10:
            p = function proxy(a, b, c, d, e, f, g, h, i, j) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 11:
            p = function proxy(a, b, c, d, e, f, g, h, i, j, k) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        case 12:
            p = function proxy(a, b, c, d, e, f, g, h, i, j, k, l) {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        default:
            p = function proxy() {
                return p.invoke(func, this, slice(arguments));
            };
            break;
        /*eslint-enable*/
    }
    var nameDescriptor = Object.getOwnPropertyDescriptor(originalFunc, "name");
    if (nameDescriptor && nameDescriptor.configurable) {
        // IE 11 functions don't have a name.
        // Safari 9 has names that are not configurable.
        Object.defineProperty(p, "name", nameDescriptor);
    }
    extend.nonEnum(p, {
        isSinonProxy: true,

        called: false,
        notCalled: true,
        calledOnce: false,
        calledTwice: false,
        calledThrice: false,
        callCount: 0,
        firstCall: null,
        secondCall: null,
        thirdCall: null,
        lastCall: null,
        lastArg: null,
        args: [],
        returnValues: [],
        thisValues: [],
        exceptions: [],
        callIds: [],
        errorsWithCallStack: []
    });
    return p;
}

module.exports = createProxy;

},{"./proxy-call":12,"./proxy-call-util":11,"./proxy-invoke":13,"./util/core/extend":23,"./util/core/function-to-string":25,"@sinonjs/commons":44}],15:[function(require,module,exports){
"use strict";

var walkObject = require("./util/core/walk-object");

function filter(object, property) {
    return object[property].restore && object[property].restore.sinon;
}

function restore(object, property) {
    object[property].restore();
}

function restoreObject(object) {
    return walkObject(restore, object, filter);
}

module.exports = restoreObject;

},{"./util/core/walk-object":34}],16:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var collectOwnMethods = require("./collect-own-methods");
var getPropertyDescriptor = require("./util/core/get-property-descriptor");
var isEsModule = require("./util/core/is-es-module");
var isPropertyConfigurable = require("./util/core/is-property-configurable");
var isNonExistentOwnProperty = require("./util/core/is-non-existent-own-property");
var match = require("@sinonjs/samsam").createMatcher;
var sinonAssert = require("./assert");
var sinonClock = require("./util/fake-timers");
var sinonMock = require("./mock");
var sinonSpy = require("./spy");
var sinonStub = require("./stub");
var sinonFake = require("./fake");
var valueToString = require("@sinonjs/commons").valueToString;
var fakeServer = require("nise").fakeServer;
var fakeXhr = require("nise").fakeXhr;
var usePromiseLibrary = require("./util/core/use-promise-library");

var filter = arrayProto.filter;
var forEach = arrayProto.filter;
var push = arrayProto.push;
var reverse = arrayProto.reverse;

function applyOnEach(fakes, method) {
    var matchingFakes = filter(fakes, function(fake) {
        return typeof fake[method] === "function";
    });

    forEach(matchingFakes, function(fake) {
        fake[method]();
    });
}

function Sandbox() {
    var sandbox = this;
    var collection = [];
    var fakeRestorers = [];
    var promiseLib;

    sandbox.serverPrototype = fakeServer;

    // this is for testing only
    sandbox.getFakes = function getFakes() {
        return collection;
    };

    // this is for testing only
    sandbox.getRestorers = function() {
        return fakeRestorers;
    };

    sandbox.createStubInstance = function createStubInstance() {
        var stubbed = sinonStub.createStubInstance.apply(null, arguments);

        var ownMethods = collectOwnMethods(stubbed);

        forEach(ownMethods, function(method) {
            push(collection, method);
        });

        usePromiseLibrary(promiseLib, ownMethods);

        return stubbed;
    };

    sandbox.inject = function inject(obj) {
        obj.spy = function() {
            return sandbox.spy.apply(null, arguments);
        };

        obj.stub = function() {
            return sandbox.stub.apply(null, arguments);
        };

        obj.mock = function() {
            return sandbox.mock.apply(null, arguments);
        };

        obj.createStubInstance = function() {
            return sandbox.createStubInstance.apply(sandbox, arguments);
        };

        obj.fake = function() {
            return sandbox.fake.apply(null, arguments);
        };

        obj.replace = function() {
            return sandbox.replace.apply(null, arguments);
        };

        obj.replaceSetter = function() {
            return sandbox.replaceSetter.apply(null, arguments);
        };

        obj.replaceGetter = function() {
            return sandbox.replaceGetter.apply(null, arguments);
        };

        if (sandbox.clock) {
            obj.clock = sandbox.clock;
        }

        if (sandbox.server) {
            obj.server = sandbox.server;
            obj.requests = sandbox.server.requests;
        }

        obj.match = match;

        return obj;
    };

    sandbox.mock = function mock() {
        var m = sinonMock.apply(null, arguments);

        push(collection, m);
        usePromiseLibrary(promiseLib, m);

        return m;
    };

    sandbox.reset = function reset() {
        applyOnEach(collection, "reset");
        applyOnEach(collection, "resetHistory");
    };

    sandbox.resetBehavior = function resetBehavior() {
        applyOnEach(collection, "resetBehavior");
    };

    sandbox.resetHistory = function resetHistory() {
        function privateResetHistory(f) {
            var method = f.resetHistory || f.reset;
            if (method) {
                method.call(f);
            }
        }

        forEach(collection, function(fake) {
            if (typeof fake === "function") {
                privateResetHistory(fake);
                return;
            }

            var methods = [];
            if (fake.get) {
                push(methods, fake.get);
            }

            if (fake.set) {
                push(methods, fake.set);
            }

            forEach(methods, privateResetHistory);
        });
    };

    sandbox.restore = function restore() {
        if (arguments.length) {
            throw new Error("sandbox.restore() does not take any parameters. Perhaps you meant stub.restore()");
        }

        reverse(collection);
        applyOnEach(collection, "restore");
        collection = [];

        forEach(fakeRestorers, function(restorer) {
            restorer();
        });
        fakeRestorers = [];

        sandbox.restoreContext();
    };

    sandbox.restoreContext = function restoreContext() {
        var injectedKeys = sandbox.injectedKeys;
        var injectInto = sandbox.injectInto;

        if (!injectedKeys) {
            return;
        }

        forEach(injectedKeys, function(injectedKey) {
            delete injectInto[injectedKey];
        });

        injectedKeys = [];
    };

    function getFakeRestorer(object, property) {
        var descriptor = getPropertyDescriptor(object, property);

        function restorer() {
            Object.defineProperty(object, property, descriptor);
        }
        restorer.object = object;
        restorer.property = property;
        return restorer;
    }

    function verifyNotReplaced(object, property) {
        forEach(fakeRestorers, function(fakeRestorer) {
            if (fakeRestorer.object === object && fakeRestorer.property === property) {
                throw new TypeError("Attempted to replace " + property + " which is already replaced");
            }
        });
    }

    sandbox.replace = function replace(object, property, replacement) {
        var descriptor = getPropertyDescriptor(object, property);

        if (typeof descriptor === "undefined") {
            throw new TypeError("Cannot replace non-existent own property " + valueToString(property));
        }

        if (typeof replacement === "undefined") {
            throw new TypeError("Expected replacement argument to be defined");
        }

        if (typeof descriptor.get === "function") {
            throw new Error("Use sandbox.replaceGetter for replacing getters");
        }

        if (typeof descriptor.set === "function") {
            throw new Error("Use sandbox.replaceSetter for replacing setters");
        }

        if (typeof object[property] !== typeof replacement) {
            throw new TypeError("Cannot replace " + typeof object[property] + " with " + typeof replacement);
        }

        verifyNotReplaced(object, property);

        // store a function for restoring the replaced property
        push(fakeRestorers, getFakeRestorer(object, property));

        object[property] = replacement;

        return replacement;
    };

    sandbox.replaceGetter = function replaceGetter(object, property, replacement) {
        var descriptor = getPropertyDescriptor(object, property);

        if (typeof descriptor === "undefined") {
            throw new TypeError("Cannot replace non-existent own property " + valueToString(property));
        }

        if (typeof replacement !== "function") {
            throw new TypeError("Expected replacement argument to be a function");
        }

        if (typeof descriptor.get !== "function") {
            throw new Error("`object.property` is not a getter");
        }

        verifyNotReplaced(object, property);

        // store a function for restoring the replaced property
        push(fakeRestorers, getFakeRestorer(object, property));

        Object.defineProperty(object, property, {
            get: replacement,
            configurable: isPropertyConfigurable(object, property)
        });

        return replacement;
    };

    sandbox.replaceSetter = function replaceSetter(object, property, replacement) {
        var descriptor = getPropertyDescriptor(object, property);

        if (typeof descriptor === "undefined") {
            throw new TypeError("Cannot replace non-existent own property " + valueToString(property));
        }

        if (typeof replacement !== "function") {
            throw new TypeError("Expected replacement argument to be a function");
        }

        if (typeof descriptor.set !== "function") {
            throw new Error("`object.property` is not a setter");
        }

        verifyNotReplaced(object, property);

        // store a function for restoring the replaced property
        push(fakeRestorers, getFakeRestorer(object, property));

        // eslint-disable-next-line accessor-pairs
        Object.defineProperty(object, property, {
            set: replacement,
            configurable: isPropertyConfigurable(object, property)
        });

        return replacement;
    };

    sandbox.spy = function spy() {
        var s = sinonSpy.apply(sinonSpy, arguments);

        push(collection, s);

        return s;
    };

    sandbox.stub = function stub(object, property) {
        if (isEsModule(object)) {
            throw new TypeError("ES Modules cannot be stubbed");
        }

        if (isNonExistentOwnProperty(object, property)) {
            throw new TypeError("Cannot stub non-existent own property " + valueToString(property));
        }

        var stubbed = sinonStub.apply(null, arguments);
        var isStubbingEntireObject = typeof property === "undefined" && typeof object === "object";

        if (isStubbingEntireObject) {
            var ownMethods = collectOwnMethods(stubbed);

            forEach(ownMethods, function(method) {
                push(collection, method);
            });

            usePromiseLibrary(promiseLib, ownMethods);
        } else {
            push(collection, stubbed);
            usePromiseLibrary(promiseLib, stubbed);
        }

        return stubbed;
    };

    // eslint-disable-next-line no-unused-vars
    sandbox.fake = function fake(f) {
        var s = sinonFake.apply(sinonFake, arguments);

        push(collection, s);

        return s;
    };

    forEach(Object.keys(sinonFake), function(key) {
        var fakeBehavior = sinonFake[key];
        if (typeof fakeBehavior === "function") {
            sandbox.fake[key] = function() {
                var s = fakeBehavior.apply(fakeBehavior, arguments);

                push(collection, s);

                return s;
            };
        }
    });

    sandbox.useFakeTimers = function useFakeTimers(args) {
        var clock = sinonClock.useFakeTimers.call(null, args);

        sandbox.clock = clock;
        push(collection, clock);

        return clock;
    };

    sandbox.verify = function verify() {
        applyOnEach(collection, "verify");
    };

    sandbox.verifyAndRestore = function verifyAndRestore() {
        var exception;

        try {
            sandbox.verify();
        } catch (e) {
            exception = e;
        }

        sandbox.restore();

        if (exception) {
            throw exception;
        }
    };

    sandbox.useFakeServer = function useFakeServer() {
        var proto = sandbox.serverPrototype || fakeServer;

        if (!proto || !proto.create) {
            return null;
        }

        sandbox.server = proto.create();
        push(collection, sandbox.server);

        return sandbox.server;
    };

    sandbox.useFakeXMLHttpRequest = function useFakeXMLHttpRequest() {
        var xhr = fakeXhr.useFakeXMLHttpRequest();
        push(collection, xhr);
        return xhr;
    };

    sandbox.usingPromise = function usingPromise(promiseLibrary) {
        promiseLib = promiseLibrary;
        collection.promiseLibrary = promiseLibrary;

        return sandbox;
    };
}

Sandbox.prototype.assert = sinonAssert;
Sandbox.prototype.match = match;

module.exports = Sandbox;

},{"./assert":2,"./collect-own-methods":4,"./fake":8,"./mock":10,"./spy":18,"./stub":19,"./util/core/get-property-descriptor":27,"./util/core/is-es-module":28,"./util/core/is-non-existent-own-property":29,"./util/core/is-property-configurable":30,"./util/core/use-promise-library":33,"./util/fake-timers":37,"@sinonjs/commons":44,"@sinonjs/samsam":80,"nise":98}],17:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var color = require("./color");
var match = require("@sinonjs/samsam").createMatcher;
var timesInWords = require("./util/core/times-in-words");
var sinonFormat = require("./util/core/format");
var jsDiff = require("diff");

var join = arrayProto.join;
var map = arrayProto.map;
var push = arrayProto.push;

function colorSinonMatchText(matcher, calledArg, calledArgMessage) {
    var calledArgumentMessage = calledArgMessage;
    if (!matcher.test(calledArg)) {
        matcher.message = color.red(matcher.message);
        if (calledArgumentMessage) {
            calledArgumentMessage = color.green(calledArgumentMessage);
        }
    }
    return calledArgumentMessage + " " + matcher.message;
}

function colorDiffText(diff) {
    var objects = map(diff, function(part) {
        var text = part.value;
        if (part.added) {
            text = color.green(text);
        } else if (part.removed) {
            text = color.red(text);
        }
        if (diff.length === 2) {
            text += " "; // format simple diffs
        }
        return text;
    });
    return join(objects, "");
}

module.exports = {
    c: function(spyInstance) {
        return timesInWords(spyInstance.callCount);
    },

    n: function(spyInstance) {
        // eslint-disable-next-line local-rules/no-prototype-methods
        return spyInstance.toString();
    },

    D: function(spyInstance, args) {
        var message = "";

        for (var i = 0, l = spyInstance.callCount; i < l; ++i) {
            // describe multiple calls
            if (l > 1) {
                message += "\nCall " + (i + 1) + ":";
            }
            var calledArgs = spyInstance.getCall(i).args;
            for (var j = 0; j < calledArgs.length || j < args.length; ++j) {
                message += "\n";
                var calledArgMessage = j < calledArgs.length ? sinonFormat(calledArgs[j]) : "";
                if (match.isMatcher(args[j])) {
                    message += colorSinonMatchText(args[j], calledArgs[j], calledArgMessage);
                } else {
                    var expectedArgMessage = j < args.length ? sinonFormat(args[j]) : "";
                    var diff = jsDiff.diffJson(calledArgMessage, expectedArgMessage);
                    message += colorDiffText(diff);
                }
            }
        }

        return message;
    },

    C: function(spyInstance) {
        var calls = [];

        for (var i = 0, l = spyInstance.callCount; i < l; ++i) {
            // eslint-disable-next-line local-rules/no-prototype-methods
            var stringifiedCall = "    " + spyInstance.getCall(i).toString();
            if (/\n/.test(calls[i - 1])) {
                stringifiedCall = "\n" + stringifiedCall;
            }
            push(calls, stringifiedCall);
        }

        return calls.length > 0 ? "\n" + join(calls, "\n") : "";
    },

    t: function(spyInstance) {
        var objects = [];

        for (var i = 0, l = spyInstance.callCount; i < l; ++i) {
            push(objects, sinonFormat(spyInstance.thisValues[i]));
        }

        return join(objects, ", ");
    },

    "*": function(spyInstance, args) {
        return join(
            map(args, function(arg) {
                return sinonFormat(arg);
            }),
            ", "
        );
    }
};

},{"./color":5,"./util/core/format":24,"./util/core/times-in-words":32,"@sinonjs/commons":44,"@sinonjs/samsam":80,"diff":82}],18:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var createProxy = require("./proxy");
var extend = require("./util/core/extend");
var functionName = require("@sinonjs/commons").functionName;
var getPropertyDescriptor = require("./util/core/get-property-descriptor");
var deepEqual = require("@sinonjs/samsam").deepEqual;
var isEsModule = require("./util/core/is-es-module");
var proxyCallUtil = require("./proxy-call-util");
var walkObject = require("./util/core/walk-object");
var wrapMethod = require("./util/core/wrap-method");
var sinonFormat = require("./util/core/format");
var valueToString = require("@sinonjs/commons").valueToString;

/* cache references to library methods so that they also can be stubbed without problems */
var forEach = arrayProto.forEach;
var pop = arrayProto.pop;
var push = arrayProto.push;
var slice = arrayProto.slice;
var filter = Array.prototype.filter;

var uuid = 0;

function matches(fake, args, strict) {
    var margs = fake.matchingArguments;
    if (margs.length <= args.length && deepEqual(slice(args, 0, margs.length), margs)) {
        return !strict || margs.length === args.length;
    }
    return false;
}

// Public API
var spyApi = {
    formatters: require("./spy-formatters"),

    withArgs: function() {
        var args = slice(arguments);
        var matching = pop(this.matchingFakes(args, true));
        if (matching) {
            return matching;
        }

        var original = this;
        var fake = this.instantiateFake();
        fake.matchingArguments = args;
        fake.parent = this;
        push(this.fakes, fake);

        fake.withArgs = function() {
            return original.withArgs.apply(original, arguments);
        };

        forEach(original.args, function(arg, i) {
            if (!matches(fake, arg)) {
                return;
            }

            proxyCallUtil.incrementCallCount(fake);
            push(fake.thisValues, original.thisValues[i]);
            push(fake.args, arg);
            push(fake.returnValues, original.returnValues[i]);
            push(fake.exceptions, original.exceptions[i]);
            push(fake.callIds, original.callIds[i]);
        });

        proxyCallUtil.createCallProperties(fake);

        return fake;
    },

    // Override proxy default implementation
    matchingFakes: function(args, strict) {
        return filter.call(this.fakes, function(fake) {
            return matches(fake, args, strict);
        });
    },

    printf: function(format) {
        var spyInstance = this;
        var args = slice(arguments, 1);
        var formatter;

        return (format || "").replace(/%(.)/g, function(match, specifyer) {
            formatter = spyApi.formatters[specifyer];

            if (typeof formatter === "function") {
                return String(formatter(spyInstance, args));
            } else if (!isNaN(parseInt(specifyer, 10))) {
                return sinonFormat(args[specifyer - 1]);
            }

            return "%" + specifyer;
        });
    }
};

/* eslint-disable local-rules/no-prototype-methods */
var delegateToCalls = proxyCallUtil.delegateToCalls;
delegateToCalls(spyApi, "callArg", false, "callArgWith", true, function() {
    throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
});
spyApi.callArgWith = spyApi.callArg;
delegateToCalls(spyApi, "callArgOn", false, "callArgOnWith", true, function() {
    throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
});
spyApi.callArgOnWith = spyApi.callArgOn;
delegateToCalls(spyApi, "throwArg", false, "throwArg", false, function() {
    throw new Error(this.toString() + " cannot throw arg since it was not yet invoked.");
});
delegateToCalls(spyApi, "yield", false, "yield", true, function() {
    throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
});
// "invokeCallback" is an alias for "yield" since "yield" is invalid in strict mode.
spyApi.invokeCallback = spyApi.yield;
delegateToCalls(spyApi, "yieldOn", false, "yieldOn", true, function() {
    throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
});
delegateToCalls(spyApi, "yieldTo", false, "yieldTo", true, function(property) {
    throw new Error(
        this.toString() + " cannot yield to '" + valueToString(property) + "' since it was not yet invoked."
    );
});
delegateToCalls(spyApi, "yieldToOn", false, "yieldToOn", true, function(property) {
    throw new Error(
        this.toString() + " cannot yield to '" + valueToString(property) + "' since it was not yet invoked."
    );
});
/* eslint-enable local-rules/no-prototype-methods */

function createSpy(func) {
    var name;
    var funk = func;

    if (typeof funk !== "function") {
        funk = function() {
            return;
        };
    } else {
        name = functionName(funk);
    }

    var proxy = createProxy(funk, funk);

    // Inherit spy API:
    extend.nonEnum(proxy, spyApi);
    extend.nonEnum(proxy, {
        displayName: name || "spy",
        fakes: [],
        instantiateFake: createSpy,
        id: "spy#" + uuid++
    });
    return proxy;
}

function spy(object, property, types) {
    var descriptor, methodDesc;

    if (isEsModule(object)) {
        throw new TypeError("ES Modules cannot be spied");
    }

    if (!property && typeof object === "function") {
        return createSpy(object);
    }

    if (!property && typeof object === "object") {
        return walkObject(spy, object);
    }

    if (!object && !property) {
        return createSpy(function() {
            return;
        });
    }

    if (!types) {
        return wrapMethod(object, property, createSpy(object[property]));
    }

    descriptor = {};
    methodDesc = getPropertyDescriptor(object, property);

    forEach(types, function(type) {
        descriptor[type] = createSpy(methodDesc[type]);
    });

    return wrapMethod(object, property, descriptor);
}

extend(spy, spyApi);
module.exports = spy;

},{"./proxy":14,"./proxy-call-util":11,"./spy-formatters":17,"./util/core/extend":23,"./util/core/format":24,"./util/core/get-property-descriptor":27,"./util/core/is-es-module":28,"./util/core/walk-object":34,"./util/core/wrap-method":36,"@sinonjs/commons":44,"@sinonjs/samsam":80}],19:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var behavior = require("./behavior");
var behaviors = require("./default-behaviors");
var createProxy = require("./proxy");
var functionName = require("@sinonjs/commons").functionName;
var hasOwnProperty = require("@sinonjs/commons").prototypes.object.hasOwnProperty;
var isNonExistentOwnProperty = require("./util/core/is-non-existent-own-property");
var spy = require("./spy");
var extend = require("./util/core/extend");
var getPropertyDescriptor = require("./util/core/get-property-descriptor");
var isEsModule = require("./util/core/is-es-module");
var wrapMethod = require("./util/core/wrap-method");
var throwOnFalsyObject = require("./throw-on-falsy-object");
var valueToString = require("@sinonjs/commons").valueToString;
var walkObject = require("./util/core/walk-object");

var forEach = arrayProto.forEach;
var pop = arrayProto.pop;
var slice = arrayProto.slice;
var sort = arrayProto.sort;

var uuid = 0;

function createStub(originalFunc) {
    var proxy;

    function functionStub() {
        var args = slice(arguments);
        var matchings = proxy.matchingFakes(args);

        var fnStub =
            pop(
                sort(matchings, function(a, b) {
                    return a.matchingArguments.length - b.matchingArguments.length;
                })
            ) || proxy;
        return getCurrentBehavior(fnStub).invoke(this, arguments);
    }

    proxy = createProxy(functionStub, originalFunc || functionStub);
    // Inherit spy API:
    extend.nonEnum(proxy, spy);
    // Inherit stub API:
    extend.nonEnum(proxy, stub);

    var name = originalFunc ? functionName(originalFunc) : null;
    extend.nonEnum(proxy, {
        fakes: [],
        instantiateFake: createStub,
        displayName: name || "stub",
        defaultBehavior: null,
        behaviors: [],
        id: "stub#" + uuid++
    });

    return proxy;
}

function stub(object, property) {
    if (arguments.length > 2) {
        throw new TypeError("stub(obj, 'meth', fn) has been removed, see documentation");
    }

    if (isEsModule(object)) {
        throw new TypeError("ES Modules cannot be stubbed");
    }

    throwOnFalsyObject.apply(null, arguments);

    if (isNonExistentOwnProperty(object, property)) {
        throw new TypeError("Cannot stub non-existent own property " + valueToString(property));
    }

    var actualDescriptor = getPropertyDescriptor(object, property);
    var isObjectOrFunction = typeof object === "object" || typeof object === "function";
    var isStubbingEntireObject = typeof property === "undefined" && isObjectOrFunction;
    var isCreatingNewStub = !object && typeof property === "undefined";
    var isStubbingNonFuncProperty =
        isObjectOrFunction &&
        typeof property !== "undefined" &&
        (typeof actualDescriptor === "undefined" || typeof actualDescriptor.value !== "function") &&
        typeof descriptor === "undefined";

    if (isStubbingEntireObject) {
        return walkObject(stub, object);
    }

    if (isCreatingNewStub) {
        return createStub();
    }

    var func = typeof actualDescriptor.value === "function" ? actualDescriptor.value : null;
    var s = createStub(func);

    extend.nonEnum(s, {
        rootObj: object,
        propName: property,
        restore: function restore() {
            if (actualDescriptor !== undefined) {
                Object.defineProperty(object, property, actualDescriptor);
                return;
            }

            delete object[property];
        }
    });

    return isStubbingNonFuncProperty ? s : wrapMethod(object, property, s);
}

stub.createStubInstance = function(constructor, overrides) {
    if (typeof constructor !== "function") {
        throw new TypeError("The constructor should be a function.");
    }

    var stubbedObject = stub(Object.create(constructor.prototype));

    forEach(Object.keys(overrides || {}), function(propertyName) {
        if (propertyName in stubbedObject) {
            var value = overrides[propertyName];
            if (value && value.createStubInstance) {
                stubbedObject[propertyName] = value;
            } else {
                stubbedObject[propertyName].returns(value);
            }
        } else {
            throw new Error("Cannot stub " + propertyName + ". Property does not exist!");
        }
    });
    return stubbedObject;
};

/*eslint-disable no-use-before-define*/
function getParentBehaviour(stubInstance) {
    return stubInstance.parent && getCurrentBehavior(stubInstance.parent);
}

function getDefaultBehavior(stubInstance) {
    return stubInstance.defaultBehavior || getParentBehaviour(stubInstance) || behavior.create(stubInstance);
}

function getCurrentBehavior(stubInstance) {
    var currentBehavior = stubInstance.behaviors[stubInstance.callCount - 1];
    return currentBehavior && currentBehavior.isPresent() ? currentBehavior : getDefaultBehavior(stubInstance);
}
/*eslint-enable no-use-before-define*/

var proto = {
    resetBehavior: function() {
        this.defaultBehavior = null;
        this.behaviors = [];

        delete this.returnValue;
        delete this.returnArgAt;
        delete this.throwArgAt;
        delete this.resolveArgAt;
        delete this.fakeFn;
        this.returnThis = false;
        this.resolveThis = false;

        forEach(this.fakes, function(fake) {
            fake.resetBehavior();
        });
    },

    reset: function() {
        this.resetHistory();
        this.resetBehavior();
    },

    onCall: function onCall(index) {
        if (!this.behaviors[index]) {
            this.behaviors[index] = behavior.create(this);
        }

        return this.behaviors[index];
    },

    onFirstCall: function onFirstCall() {
        return this.onCall(0);
    },

    onSecondCall: function onSecondCall() {
        return this.onCall(1);
    },

    onThirdCall: function onThirdCall() {
        return this.onCall(2);
    },

    withArgs: function withArgs() {
        var fake = spy.withArgs.apply(this, arguments);
        if (this.defaultBehavior && this.defaultBehavior.promiseLibrary) {
            fake.defaultBehavior = fake.defaultBehavior || behavior.create(fake);
            fake.defaultBehavior.promiseLibrary = this.defaultBehavior.promiseLibrary;
        }
        return fake;
    }
};

forEach(Object.keys(behavior), function(method) {
    if (
        hasOwnProperty(behavior, method) &&
        !hasOwnProperty(proto, method) &&
        method !== "create" &&
        method !== "invoke"
    ) {
        proto[method] = behavior.createBehavior(method);
    }
});

forEach(Object.keys(behaviors), function(method) {
    if (hasOwnProperty(behaviors, method) && !hasOwnProperty(proto, method)) {
        behavior.addBehavior(stub, method, behaviors[method]);
    }
});

extend(stub, proto);
module.exports = stub;

},{"./behavior":3,"./default-behaviors":7,"./proxy":14,"./spy":18,"./throw-on-falsy-object":20,"./util/core/extend":23,"./util/core/get-property-descriptor":27,"./util/core/is-es-module":28,"./util/core/is-non-existent-own-property":29,"./util/core/walk-object":34,"./util/core/wrap-method":36,"@sinonjs/commons":44}],20:[function(require,module,exports){
"use strict";
var valueToString = require("@sinonjs/commons").valueToString;

function throwOnFalsyObject(object, property) {
    if (property && !object) {
        var type = object === null ? "null" : "undefined";
        throw new Error("Trying to stub property '" + valueToString(property) + "' of " + type);
    }
}

module.exports = throwOnFalsyObject;

},{"@sinonjs/commons":44}],21:[function(require,module,exports){
"use strict";

module.exports = {
    injectInto: null,
    properties: [
        "spy",
        "stub",
        "mock",
        "clock",
        "server",
        "requests",
        "fake",
        "replace",
        "replaceSetter",
        "replaceGetter",
        "createStubInstance"
    ],
    useFakeTimers: true,
    useFakeServer: true
};

},{}],22:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var reduce = arrayProto.reduce;

module.exports = function exportAsyncBehaviors(behaviorMethods) {
    return reduce(
        Object.keys(behaviorMethods),
        function(acc, method) {
            // need to avoid creating another async versions of the newly added async methods
            if (method.match(/^(callsArg|yields)/) && !method.match(/Async/)) {
                acc[method + "Async"] = function() {
                    var result = behaviorMethods[method].apply(this, arguments);
                    this.callbackAsync = true;
                    return result;
                };
            }
            return acc;
        },
        {}
    );
};

},{"@sinonjs/commons":44}],23:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var hasOwnProperty = require("@sinonjs/commons").prototypes.object.hasOwnProperty;

var join = arrayProto.join;
var push = arrayProto.push;
var slice = arrayProto.slice;

// Adapted from https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
var hasDontEnumBug = (function() {
    var obj = {
        constructor: function() {
            return "0";
        },
        toString: function() {
            return "1";
        },
        valueOf: function() {
            return "2";
        },
        toLocaleString: function() {
            return "3";
        },
        prototype: function() {
            return "4";
        },
        isPrototypeOf: function() {
            return "5";
        },
        propertyIsEnumerable: function() {
            return "6";
        },
        hasOwnProperty: function() {
            return "7";
        },
        length: function() {
            return "8";
        },
        unique: function() {
            return "9";
        }
    };

    var result = [];
    for (var prop in obj) {
        if (hasOwnProperty(obj, prop)) {
            push(result, obj[prop]());
        }
    }
    return join(result, "") !== "0123456789";
})();

function extendCommon(target, sources, doCopy) {
    var source, i, prop;

    for (i = 0; i < sources.length; i++) {
        source = sources[i];

        for (prop in source) {
            if (hasOwnProperty(source, prop)) {
                doCopy(target, source, prop);
            }
        }

        // Make sure we copy (own) toString method even when in JScript with DontEnum bug
        // See https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
        if (hasDontEnumBug && hasOwnProperty(source, "toString") && source.toString !== target.toString) {
            target.toString = source.toString;
        }
    }

    return target;
}

/** Public: Extend target in place with all (own) properties from sources in-order. Thus, last source will
 *         override properties in previous sources.
 *
 * @arg {Object} target - The Object to extend
 * @arg {Object[]} sources - Objects to copy properties from.
 *
 * @returns {Object} the extended target
 */
module.exports = function extend(target /*, sources */) {
    var sources = slice(arguments, 1);

    return extendCommon(target, sources, function copyValue(dest, source, prop) {
        dest[prop] = source[prop];
    });
};

/** Public: Extend target in place with all (own) properties from sources in-order. Thus, last source will
 *         override properties in previous sources. Define the properties as non enumerable.
 *
 * @arg {Object} target - The Object to extend
 * @arg {Object[]} sources - Objects to copy properties from.
 *
 * @returns {Object} the extended target
 */
module.exports.nonEnum = function extendNonEnum(target /*, sources */) {
    var sources = slice(arguments, 1);

    return extendCommon(target, sources, function copyProperty(dest, source, prop) {
        Object.defineProperty(dest, prop, {
            value: source[prop],
            enumerable: false,
            configurable: true,
            writable: true
        });
    });
};

},{"@sinonjs/commons":44}],24:[function(require,module,exports){
"use strict";

var formatio = require("@sinonjs/formatio");

var formatter = formatio.configure({
    quoteStrings: false,
    limitChildrenCount: 250
});

var customFormatter;

function format() {
    if (customFormatter) {
        return customFormatter.apply(null, arguments);
    }

    return formatter.ascii.apply(formatter, arguments);
}

format.setFormatter = function(aCustomFormatter) {
    if (typeof aCustomFormatter !== "function") {
        throw new Error("format.setFormatter must be called with a function");
    }

    customFormatter = aCustomFormatter;
};

module.exports = format;

},{"@sinonjs/formatio":56}],25:[function(require,module,exports){
"use strict";

module.exports = function toString() {
    var i, prop, thisValue;
    if (this.getCall && this.callCount) {
        i = this.callCount;

        while (i--) {
            thisValue = this.getCall(i).thisValue;

            for (prop in thisValue) {
                if (thisValue[prop] === this) {
                    return prop;
                }
            }
        }
    }

    return this.displayName || "sinon fake";
};

},{}],26:[function(require,module,exports){
"use strict";

/* istanbul ignore next : not testing that setTimeout works */
function nextTick(callback) {
    setTimeout(callback, 0);
}

module.exports = function getNextTick(process, setImmediate) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
        return process.nextTick;
    }

    if (typeof setImmediate === "function") {
        return setImmediate;
    }

    return nextTick;
};

},{}],27:[function(require,module,exports){
"use strict";

module.exports = function getPropertyDescriptor(object, property) {
    var proto = object;
    var descriptor;

    while (proto && !(descriptor = Object.getOwnPropertyDescriptor(proto, property))) {
        proto = Object.getPrototypeOf(proto);
    }
    return descriptor;
};

},{}],28:[function(require,module,exports){
"use strict";

/**
 * Verify if an object is a ECMAScript Module
 *
 * As the exports from a module is immutable we cannot alter the exports
 * using spies or stubs. Let the consumer know this to avoid bug reports
 * on weird error messages.
 *
 * @param {Object} object The object to examine
 *
 * @returns {Boolean} true when the object is a module
 */
module.exports = function(object) {
    return (
        object && typeof Symbol !== "undefined" && object[Symbol.toStringTag] === "Module" && Object.isSealed(object)
    );
};

},{}],29:[function(require,module,exports){
"use strict";

function isNonExistentOwnProperty(object, property) {
    return object && typeof property !== "undefined" && !(property in object);
}

module.exports = isNonExistentOwnProperty;

},{}],30:[function(require,module,exports){
"use strict";

var getPropertyDescriptor = require("./get-property-descriptor");

function isPropertyConfigurable(obj, propName) {
    var propertyDescriptor = getPropertyDescriptor(obj, propName);

    return propertyDescriptor ? propertyDescriptor.configurable : true;
}

module.exports = isPropertyConfigurable;

},{"./get-property-descriptor":27}],31:[function(require,module,exports){
"use strict";

var globalObject = require("@sinonjs/commons").global;
var getNextTick = require("./get-next-tick");

module.exports = getNextTick(globalObject.process, globalObject.setImmediate);

},{"./get-next-tick":26,"@sinonjs/commons":44}],32:[function(require,module,exports){
"use strict";

var array = [null, "once", "twice", "thrice"];

module.exports = function timesInWords(count) {
    return array[count] || (count || 0) + " times";
};

},{}],33:[function(require,module,exports){
"use strict";

var forEach = Array.prototype.forEach;

function usePromiseLibrary(library, fakes) {
    if (typeof library === "undefined") {
        return;
    }

    if (Array.isArray(fakes)) {
        forEach.call(fakes, usePromiseLibrary.bind(null, library));

        return;
    }

    if (typeof fakes.usingPromise === "function") {
        fakes.usingPromise(library);
    }
}

module.exports = usePromiseLibrary;

},{}],34:[function(require,module,exports){
"use strict";

var functionName = require("@sinonjs/commons").functionName;

var getPropertyDescriptor = require("./get-property-descriptor");
var walk = require("./walk");

function walkObject(predicate, object, filter) {
    var called = false;
    var name = functionName(predicate);

    if (!object) {
        throw new Error("Trying to " + name + " object but received " + String(object));
    }

    walk(object, function(prop, propOwner) {
        // we don't want to stub things like toString(), valueOf(), etc. so we only stub if the object
        // is not Object.prototype
        if (
            propOwner !== Object.prototype &&
            prop !== "constructor" &&
            typeof getPropertyDescriptor(propOwner, prop).value === "function"
        ) {
            if (filter) {
                if (filter(object, prop)) {
                    called = true;
                    predicate(object, prop);
                }
            } else {
                called = true;
                predicate(object, prop);
            }
        }
    });

    if (!called) {
        throw new Error("Expected to " + name + " methods on object but found none");
    }

    return object;
}

module.exports = walkObject;

},{"./get-property-descriptor":27,"./walk":35,"@sinonjs/commons":44}],35:[function(require,module,exports){
"use strict";

var forEach = require("@sinonjs/commons").prototypes.array.forEach;

function walkInternal(obj, iterator, context, originalObj, seen) {
    var proto, prop;

    if (typeof Object.getOwnPropertyNames !== "function") {
        // We explicitly want to enumerate through all of the prototype's properties
        // in this case, therefore we deliberately leave out an own property check.
        /* eslint-disable-next-line guard-for-in */
        for (prop in obj) {
            iterator.call(context, obj[prop], prop, obj);
        }

        return;
    }

    forEach(Object.getOwnPropertyNames(obj), function(k) {
        if (seen[k] !== true) {
            seen[k] = true;
            var target = typeof Object.getOwnPropertyDescriptor(obj, k).get === "function" ? originalObj : obj;
            iterator.call(context, k, target);
        }
    });

    proto = Object.getPrototypeOf(obj);
    if (proto) {
        walkInternal(proto, iterator, context, originalObj, seen);
    }
}

/* Walks the prototype chain of an object and iterates over every own property
 * name encountered. The iterator is called in the same fashion that Array.prototype.forEach
 * works, where it is passed the value, key, and own object as the 1st, 2nd, and 3rd positional
 * argument, respectively. In cases where Object.getOwnPropertyNames is not available, walk will
 * default to using a simple for..in loop.
 *
 * obj - The object to walk the prototype chain for.
 * iterator - The function to be called on each pass of the walk.
 * context - (Optional) When given, the iterator will be called with this object as the receiver.
 */
module.exports = function walk(obj, iterator, context) {
    return walkInternal(obj, iterator, context, obj, {});
};

},{"@sinonjs/commons":44}],36:[function(require,module,exports){
"use strict";

var getPropertyDescriptor = require("./get-property-descriptor");
var extend = require("./extend");
var hasOwnProperty = require("@sinonjs/commons").prototypes.object.hasOwnProperty;
var valueToString = require("@sinonjs/commons").valueToString;

function isFunction(obj) {
    return typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply);
}

function mirrorProperties(target, source) {
    for (var prop in source) {
        if (!hasOwnProperty(target, prop)) {
            target[prop] = source[prop];
        }
    }
}

// Cheap way to detect if we have ES5 support.
var hasES5Support = "keys" in Object;

module.exports = function wrapMethod(object, property, method) {
    if (!object) {
        throw new TypeError("Should wrap property of object");
    }

    if (typeof method !== "function" && typeof method !== "object") {
        throw new TypeError("Method wrapper should be a function or a property descriptor");
    }

    function checkWrappedMethod(wrappedMethod) {
        var error;

        if (!isFunction(wrappedMethod)) {
            error = new TypeError(
                "Attempted to wrap " + typeof wrappedMethod + " property " + valueToString(property) + " as function"
            );
        } else if (wrappedMethod.restore && wrappedMethod.restore.sinon) {
            error = new TypeError("Attempted to wrap " + valueToString(property) + " which is already wrapped");
        } else if (wrappedMethod.calledBefore) {
            var verb = wrappedMethod.returns ? "stubbed" : "spied on";
            error = new TypeError("Attempted to wrap " + valueToString(property) + " which is already " + verb);
        }

        if (error) {
            if (wrappedMethod && wrappedMethod.stackTraceError) {
                error.stack += "\n--------------\n" + wrappedMethod.stackTraceError.stack;
            }
            throw error;
        }
    }

    var error, wrappedMethod, i, wrappedMethodDesc;

    function simplePropertyAssignment() {
        wrappedMethod = object[property];
        checkWrappedMethod(wrappedMethod);
        object[property] = method;
        method.displayName = property;
    }

    // Firefox has a problem when using hasOwn.call on objects from other frames.
    /* eslint-disable-next-line local-rules/no-prototype-methods */
    var owned = object.hasOwnProperty ? object.hasOwnProperty(property) : hasOwnProperty(object, property);

    if (hasES5Support) {
        var methodDesc = typeof method === "function" ? { value: method } : method;
        wrappedMethodDesc = getPropertyDescriptor(object, property);

        if (!wrappedMethodDesc) {
            error = new TypeError(
                "Attempted to wrap " + typeof wrappedMethod + " property " + property + " as function"
            );
        } else if (wrappedMethodDesc.restore && wrappedMethodDesc.restore.sinon) {
            error = new TypeError("Attempted to wrap " + property + " which is already wrapped");
        }
        if (error) {
            if (wrappedMethodDesc && wrappedMethodDesc.stackTraceError) {
                error.stack += "\n--------------\n" + wrappedMethodDesc.stackTraceError.stack;
            }
            throw error;
        }

        var types = Object.keys(methodDesc);
        for (i = 0; i < types.length; i++) {
            wrappedMethod = wrappedMethodDesc[types[i]];
            checkWrappedMethod(wrappedMethod);
        }

        mirrorProperties(methodDesc, wrappedMethodDesc);
        for (i = 0; i < types.length; i++) {
            mirrorProperties(methodDesc[types[i]], wrappedMethodDesc[types[i]]);
        }
        Object.defineProperty(object, property, methodDesc);

        // catch failing assignment
        // this is the converse of the check in `.restore` below
        if (typeof method === "function" && object[property] !== method) {
            // correct any wrongdoings caused by the defineProperty call above,
            // such as adding new items (if object was a Storage object)
            delete object[property];
            simplePropertyAssignment();
        }
    } else {
        simplePropertyAssignment();
    }

    extend.nonEnum(method, {
        displayName: property,

        wrappedMethod: wrappedMethod,

        // Set up an Error object for a stack trace which can be used later to find what line of
        // code the original method was created on.
        stackTraceError: new Error("Stack Trace for original"),

        restore: function() {
            // For prototype properties try to reset by delete first.
            // If this fails (ex: localStorage on mobile safari) then force a reset
            // via direct assignment.
            if (!owned) {
                // In some cases `delete` may throw an error
                try {
                    delete object[property];
                } catch (e) {} // eslint-disable-line no-empty
                // For native code functions `delete` fails without throwing an error
                // on Chrome < 43, PhantomJS, etc.
            } else if (hasES5Support) {
                Object.defineProperty(object, property, wrappedMethodDesc);
            }

            if (hasES5Support) {
                var descriptor = getPropertyDescriptor(object, property);
                if (descriptor && descriptor.value === method) {
                    object[property] = wrappedMethod;
                }
            } else {
                // Use strict equality comparison to check failures then force a reset
                // via direct assignment.
                if (object[property] === method) {
                    object[property] = wrappedMethod;
                }
            }
        }
    });

    method.restore.sinon = true;

    if (!hasES5Support) {
        mirrorProperties(method, wrappedMethod);
    }

    return method;
};

},{"./extend":23,"./get-property-descriptor":27,"@sinonjs/commons":44}],37:[function(require,module,exports){
"use strict";

var extend = require("./core/extend");
var llx = require("lolex");
var globalObject = require("@sinonjs/commons").global;

function createClock(config, globalCtx) {
    var llxCtx = llx;
    if (globalCtx !== null && typeof globalCtx === "object") {
        llxCtx = llx.withGlobal(globalCtx);
    }
    var clock = llxCtx.install(config);
    clock.restore = clock.uninstall;
    return clock;
}

function addIfDefined(obj, globalPropName) {
    var globalProp = globalObject[globalPropName];
    if (typeof globalProp !== "undefined") {
        obj[globalPropName] = globalProp;
    }
}

/**
 * @param {number|Date|Object} dateOrConfig The unix epoch value to install with (default 0)
 * @returns {Object} Returns a lolex clock instance
 */
exports.useFakeTimers = function(dateOrConfig) {
    var hasArguments = typeof dateOrConfig !== "undefined";
    var argumentIsDateLike =
        (typeof dateOrConfig === "number" || dateOrConfig instanceof Date) && arguments.length === 1;
    var argumentIsObject = dateOrConfig !== null && typeof dateOrConfig === "object" && arguments.length === 1;

    if (!hasArguments) {
        return createClock({
            now: 0
        });
    }

    if (argumentIsDateLike) {
        return createClock({
            now: dateOrConfig
        });
    }

    if (argumentIsObject) {
        var config = extend.nonEnum({}, dateOrConfig);
        var globalCtx = config.global;
        delete config.global;
        return createClock(config, globalCtx);
    }

    throw new TypeError("useFakeTimers expected epoch or config object. See https://github.com/sinonjs/sinon");
};

exports.clock = {
    create: function(now) {
        return llx.createClock(now);
    }
};

var timers = {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    Date: Date
};
addIfDefined(timers, "setImmediate");
addIfDefined(timers, "clearImmediate");

exports.timers = timers;

},{"./core/extend":23,"@sinonjs/commons":44,"lolex":86}],38:[function(require,module,exports){
"use strict";

var every = require("./prototypes/array").every;

function hasCallsLeft(callMap, spy) {
    if (callMap[spy.id] === undefined) {
        callMap[spy.id] = 0;
    }

    return callMap[spy.id] < spy.callCount;
}

function checkAdjacentCalls(callMap, spy, index, spies) {
    var calledBeforeNext = true;

    if (index !== spies.length - 1) {
        calledBeforeNext = spy.calledBefore(spies[index + 1]);
    }

    if (hasCallsLeft(callMap, spy) && calledBeforeNext) {
        callMap[spy.id] += 1;
        return true;
    }

    return false;
}

module.exports = function calledInOrder(spies) {
    var callMap = {};
    // eslint-disable-next-line no-underscore-dangle
    var _spies = arguments.length > 1 ? arguments : spies;

    return every(_spies, checkAdjacentCalls.bind(null, callMap));
};

},{"./prototypes/array":46}],39:[function(require,module,exports){
"use strict";

var functionName = require("./function-name");

module.exports = function className(value) {
    return (
        (value.constructor && value.constructor.name) ||
        // The next branch is for IE11 support only:
        // Because the name property is not set on the prototype
        // of the Function object, we finally try to grab the
        // name from its definition. This will never be reached
        // in node, so we are not able to test this properly.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
        (typeof value.constructor === "function" &&
            /* istanbul ignore next */
            functionName(value.constructor)) ||
        null
    );
};

},{"./function-name":42}],40:[function(require,module,exports){
/* eslint-disable no-console */
"use strict";

// wrap returns a function that will invoke the supplied function and print a deprecation warning to the console each
// time it is called.
exports.wrap = function(func, msg) {
    var wrapped = function() {
        exports.printWarning(msg);
        return func.apply(this, arguments);
    };
    if (func.prototype) {
        wrapped.prototype = func.prototype;
    }
    return wrapped;
};

// defaultMsg returns a string which can be supplied to `wrap()` to notify the user that a particular part of the
// sinon API has been deprecated.
exports.defaultMsg = function(packageName, funcName) {
    return (
        packageName +
        "." +
        funcName +
        " is deprecated and will be removed from the public API in a future version of " +
        packageName +
        "."
    );
};

exports.printWarning = function(msg) {
    // Watch out for IE7 and below! :(
    /* istanbul ignore next */
    if (typeof console !== "undefined") {
        if (console.info) {
            console.info(msg);
        } else {
            console.log(msg);
        }
    }
};

},{}],41:[function(require,module,exports){
"use strict";

// This is an `every` implementation that works for all iterables
module.exports = function every(obj, fn) {
    var pass = true;

    try {
        /* eslint-disable-next-line local-rules/no-prototype-methods */
        obj.forEach(function() {
            if (!fn.apply(this, arguments)) {
                // Throwing an error is the only way to break `forEach`
                throw new Error();
            }
        });
    } catch (e) {
        pass = false;
    }

    return pass;
};

},{}],42:[function(require,module,exports){
"use strict";

module.exports = function functionName(func) {
    if (!func) {
        return "";
    }

    return (
        func.displayName ||
        func.name ||
        // Use function decomposition as a last resort to get function
        // name. Does not rely on function decomposition to work - if it
        // doesn't debugging will be slightly less informative
        // (i.e. toString will say 'spy' rather than 'myFunc').
        (String(func).match(/function ([^\s(]+)/) || [])[1]
    );
};

},{}],43:[function(require,module,exports){
"use strict";

var globalObject;
/* istanbul ignore else */
if (typeof global !== "undefined") {
    // Node
    globalObject = global;
} else if (typeof window !== "undefined") {
    // Browser
    globalObject = window;
} else {
    // WebWorker
    globalObject = self;
}

module.exports = globalObject;

},{}],44:[function(require,module,exports){
"use strict";

module.exports = {
    global: require("./global"),
    calledInOrder: require("./called-in-order"),
    className: require("./class-name"),
    deprecated: require("./deprecated"),
    every: require("./every"),
    functionName: require("./function-name"),
    orderByFirstCall: require("./order-by-first-call"),
    prototypes: require("./prototypes"),
    typeOf: require("./type-of"),
    valueToString: require("./value-to-string")
};

},{"./called-in-order":38,"./class-name":39,"./deprecated":40,"./every":41,"./function-name":42,"./global":43,"./order-by-first-call":45,"./prototypes":49,"./type-of":54,"./value-to-string":55}],45:[function(require,module,exports){
"use strict";

var sort = require("./prototypes/array").sort;
var slice = require("./prototypes/array").slice;

function comparator(a, b) {
    // uuid, won't ever be equal
    var aCall = a.getCall(0);
    var bCall = b.getCall(0);
    var aId = (aCall && aCall.callId) || -1;
    var bId = (bCall && bCall.callId) || -1;

    return aId < bId ? -1 : 1;
}

module.exports = function orderByFirstCall(spies) {
    return sort(slice(spies), comparator);
};

},{"./prototypes/array":46}],46:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Array.prototype);

},{"./copy-prototype":47}],47:[function(require,module,exports){
"use strict";

var call = Function.call;

module.exports = function copyPrototypeMethods(prototype) {
    /* eslint-disable local-rules/no-prototype-methods */
    return Object.getOwnPropertyNames(prototype).reduce(function(result, name) {
        // ignore size because it throws from Map
        if (
            name !== "size" &&
            name !== "caller" &&
            name !== "callee" &&
            name !== "arguments" &&
            typeof prototype[name] === "function"
        ) {
            result[name] = call.bind(prototype[name]);
        }

        return result;
    }, Object.create(null));
};

},{}],48:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Function.prototype);

},{"./copy-prototype":47}],49:[function(require,module,exports){
"use strict";

module.exports = {
    array: require("./array"),
    function: require("./function"),
    map: require("./map"),
    object: require("./object"),
    set: require("./set"),
    string: require("./string")
};

},{"./array":46,"./function":48,"./map":50,"./object":51,"./set":52,"./string":53}],50:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Map.prototype);

},{"./copy-prototype":47}],51:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Object.prototype);

},{"./copy-prototype":47}],52:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Set.prototype);

},{"./copy-prototype":47}],53:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(String.prototype);

},{"./copy-prototype":47}],54:[function(require,module,exports){
"use strict";

var type = require("type-detect");

module.exports = function typeOf(value) {
    return type(value).toLowerCase();
};

},{"type-detect":101}],55:[function(require,module,exports){
"use strict";

function valueToString(value) {
    if (value && value.toString) {
        /* eslint-disable-next-line local-rules/no-prototype-methods */
        return value.toString();
    }
    return String(value);
}

module.exports = valueToString;

},{}],56:[function(require,module,exports){
"use strict";

var samsam = require("@sinonjs/samsam");
var functionName = require("@sinonjs/commons").functionName;
var typeOf = require("@sinonjs/commons").typeOf;

var formatio = {
    excludeConstructors: ["Object", /^.$/],
    quoteStrings: true,
    limitChildrenCount: 0
};

var specialObjects = [];
/* istanbul ignore else */
if (typeof global !== "undefined") {
    specialObjects.push({ object: global, value: "[object global]" });
}
if (typeof document !== "undefined") {
    specialObjects.push({
        object: document,
        value: "[object HTMLDocument]"
    });
}
if (typeof window !== "undefined") {
    specialObjects.push({ object: window, value: "[object Window]" });
}

function constructorName(f, object) {
    var name = functionName(object && object.constructor);
    var excludes = f.excludeConstructors || formatio.excludeConstructors;

    var i, l;
    for (i = 0, l = excludes.length; i < l; ++i) {
        if (typeof excludes[i] === "string" && excludes[i] === name) {
            return "";
        } else if (excludes[i].test && excludes[i].test(name)) {
            return "";
        }
    }

    return name;
}

function isCircular(object, objects) {
    if (typeof object !== "object") {
        return false;
    }
    var i, l;
    for (i = 0, l = objects.length; i < l; ++i) {
        if (objects[i] === object) {
            return true;
        }
    }
    return false;
}

// eslint-disable-next-line complexity
function ascii(f, object, processed, indent) {
    if (typeof object === "string") {
        if (object.length === 0) {
            return "(empty string)";
        }
        var qs = f.quoteStrings;
        var quote = typeof qs !== "boolean" || qs;
        // eslint-disable-next-line quotes
        return processed || quote ? '"' + object + '"' : object;
    }

    if (typeof object === "symbol") {
        return object.toString();
    }

    if (typeof object === "function" && !(object instanceof RegExp)) {
        return ascii.func(object);
    }

    // eslint supports bigint as of version 6.0.0
    // https://github.com/eslint/eslint/commit/e4ab0531c4e44c23494c6a802aa2329d15ac90e5
    // eslint-disable-next-line
    if (typeOf(object) === "bigint") {
        return object.toString();
    }

    var internalProcessed = processed || [];

    if (isCircular(object, internalProcessed)) {
        return "[Circular]";
    }

    if (typeOf(object) === "array") {
        return ascii.array.call(f, object, internalProcessed);
    }

    if (!object) {
        return String(1 / object === -Infinity ? "-0" : object);
    }
    if (samsam.isElement(object)) {
        return ascii.element(object);
    }

    if (
        typeof object.toString === "function" &&
        object.toString !== Object.prototype.toString
    ) {
        return object.toString();
    }

    var i, l;
    for (i = 0, l = specialObjects.length; i < l; i++) {
        if (object === specialObjects[i].object) {
            return specialObjects[i].value;
        }
    }

    if (samsam.isSet(object)) {
        return ascii.set.call(f, object, internalProcessed);
    }

    if (object instanceof Map) {
        return ascii.map.call(f, object, internalProcessed);
    }

    return ascii.object.call(f, object, internalProcessed, indent);
}

ascii.func = function(func) {
    var funcName = functionName(func) || "";
    return "function " + funcName + "() {}";
};

function delimit(str, delimiters) {
    var delims = delimiters || ["[", "]"];
    return delims[0] + str + delims[1];
}

ascii.array = function(array, processed, delimiters) {
    processed.push(array);
    var pieces = [];
    var i, l;
    l =
        this.limitChildrenCount > 0
            ? Math.min(this.limitChildrenCount, array.length)
            : array.length;

    for (i = 0; i < l; ++i) {
        pieces.push(ascii(this, array[i], processed));
    }

    if (l < array.length) {
        pieces.push("[... " + (array.length - l) + " more elements]");
    }

    return delimit(pieces.join(", "), delimiters);
};

ascii.set = function(set, processed) {
    return ascii.array.call(this, Array.from(set), processed, ["Set {", "}"]);
};

ascii.map = function(map, processed) {
    return ascii.array.call(this, Array.from(map), processed, ["Map [", "]"]);
};

function getSymbols(object) {
    if (samsam.isArguments(object)) {
        return [];
    }

    /* istanbul ignore else */
    if (typeof Object.getOwnPropertySymbols === "function") {
        return Object.getOwnPropertySymbols(object);
    }

    /* istanbul ignore next: This is only for IE, since getOwnPropertySymbols
     * does not exist on Object there
     */
    return [];
}

ascii.object = function(object, processed, indent) {
    processed.push(object);
    var internalIndent = indent || 0;
    var pieces = [];
    var properties = Object.keys(object)
        .sort()
        .concat(getSymbols(object));
    var length = 3;
    var prop, str, obj, i, k, l;
    l =
        this.limitChildrenCount > 0
            ? Math.min(this.limitChildrenCount, properties.length)
            : properties.length;

    for (i = 0; i < l; ++i) {
        prop = properties[i];
        obj = object[prop];

        if (isCircular(obj, processed)) {
            str = "[Circular]";
        } else {
            str = ascii(this, obj, processed, internalIndent + 2);
        }

        str =
            (typeof prop === "string" && /\s/.test(prop)
                ? // eslint-disable-next-line quotes
                  '"' + prop + '"'
                : prop.toString()) +
            ": " +
            str;
        length += str.length;
        pieces.push(str);
    }

    var cons = constructorName(this, object);
    var prefix = cons ? "[" + cons + "] " : "";
    var is = "";
    for (i = 0, k = internalIndent; i < k; ++i) {
        is += " ";
    }

    if (l < properties.length) {
        pieces.push("[... " + (properties.length - l) + " more elements]");
    }

    if (length + internalIndent > 80) {
        return (
            prefix + "{\n  " + is + pieces.join(",\n  " + is) + "\n" + is + "}"
        );
    }
    return prefix + "{ " + pieces.join(", ") + " }";
};

ascii.element = function(element) {
    var tagName = element.tagName.toLowerCase();
    var attrs = element.attributes;
    var pairs = [];
    var attr, attrName, i, l, val;

    for (i = 0, l = attrs.length; i < l; ++i) {
        attr = attrs.item(i);
        attrName = attr.nodeName.toLowerCase().replace("html:", "");
        val = attr.nodeValue;
        if (attrName !== "contenteditable" || val !== "inherit") {
            if (val) {
                // eslint-disable-next-line quotes
                pairs.push(attrName + '="' + val + '"');
            }
        }
    }

    var formatted = "<" + tagName + (pairs.length > 0 ? " " : "");
    // SVG elements have undefined innerHTML
    var content = element.innerHTML || "";

    if (content.length > 20) {
        content = content.substr(0, 20) + "[...]";
    }

    var res =
        formatted + pairs.join(" ") + ">" + content + "</" + tagName + ">";

    return res.replace(/ contentEditable="inherit"/, "");
};

function Formatio(options) {
    // eslint-disable-next-line guard-for-in
    for (var opt in options) {
        this[opt] = options[opt];
    }
}

Formatio.prototype = {
    functionName: functionName,

    configure: function(options) {
        return new Formatio(options);
    },

    constructorName: function(object) {
        return constructorName(this, object);
    },

    ascii: function(object, processed, indent) {
        return ascii(this, object, processed, indent);
    }
};

module.exports = Formatio.prototype;

},{"@sinonjs/commons":44,"@sinonjs/samsam":80}],57:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var deepEqual = require("./deep-equal").use(createMatcher); // eslint-disable-line no-use-before-define
var every = require("@sinonjs/commons").every;
var functionName = require("@sinonjs/commons").functionName;
var get = require("lodash.get");
var iterableToString = require("./iterable-to-string");
var objectProto = require("@sinonjs/commons").prototypes.object;
var typeOf = require("@sinonjs/commons").typeOf;
var valueToString = require("@sinonjs/commons").valueToString;

var assertMatcher = require("./create-matcher/assert-matcher");
var assertMethodExists = require("./create-matcher/assert-method-exists");
var assertType = require("./create-matcher/assert-type");
var isIterable = require("./create-matcher/is-iterable");
var isMatcher = require("./create-matcher/is-matcher");

var matcherPrototype = require("./create-matcher/matcher-prototype");

var arrayIndexOf = arrayProto.indexOf;
var some = arrayProto.some;

var hasOwnProperty = objectProto.hasOwnProperty;
var objectToString = objectProto.toString;

var TYPE_MAP = require("./create-matcher/type-map");

/**
 * Creates a matcher object for the passed expectation
 *
 * @alias module:samsam.createMatcher
 * @param {*} expectation An expecttation
 * @param {string} message A message for the expectation
 * @returns {object} A matcher object
 */
function createMatcher(expectation, message) {
    var m = Object.create(matcherPrototype);
    var type = typeOf(expectation);

    if (message !== undefined && typeof message !== "string") {
        throw new TypeError("Message should be a string");
    }

    if (arguments.length > 2) {
        throw new TypeError(
            "Expected 1 or 2 arguments, received " + arguments.length
        );
    }

    if (type in TYPE_MAP) {
        TYPE_MAP[type](m, expectation, message);
    } else {
        m.test = function(actual) {
            return deepEqual(actual, expectation);
        };
    }

    if (!m.message) {
        m.message = "match(" + valueToString(expectation) + ")";
    }

    return m;
}

createMatcher.isMatcher = isMatcher;

createMatcher.any = createMatcher(function() {
    return true;
}, "any");

createMatcher.defined = createMatcher(function(actual) {
    return actual !== null && actual !== undefined;
}, "defined");

createMatcher.truthy = createMatcher(function(actual) {
    return Boolean(actual);
}, "truthy");

createMatcher.falsy = createMatcher(function(actual) {
    return !actual;
}, "falsy");

createMatcher.same = function(expectation) {
    return createMatcher(function(actual) {
        return expectation === actual;
    }, "same(" + valueToString(expectation) + ")");
};

createMatcher.in = function(arrayOfExpectations) {
    if (typeOf(arrayOfExpectations) !== "array") {
        throw new TypeError("array expected");
    }

    return createMatcher(function(actual) {
        return some(arrayOfExpectations, function(expectation) {
            return expectation === actual;
        });
    }, "in(" + valueToString(arrayOfExpectations) + ")");
};

createMatcher.typeOf = function(type) {
    assertType(type, "string", "type");
    return createMatcher(function(actual) {
        return typeOf(actual) === type;
    }, 'typeOf("' + type + '")');
};

createMatcher.instanceOf = function(type) {
    /* istanbul ignore if */
    if (
        typeof Symbol === "undefined" ||
        typeof Symbol.hasInstance === "undefined"
    ) {
        assertType(type, "function", "type");
    } else {
        assertMethodExists(
            type,
            Symbol.hasInstance,
            "type",
            "[Symbol.hasInstance]"
        );
    }
    return createMatcher(function(actual) {
        return actual instanceof type;
    }, "instanceOf(" + (functionName(type) || objectToString(type)) + ")");
};

/**
 * Creates a property matcher
 *
 * @private
 * @param {Function} propertyTest A function to test the property against a value
 * @param {string} messagePrefix A prefix to use for messages generated by the matcher
 * @returns {object} A matcher
 */
function createPropertyMatcher(propertyTest, messagePrefix) {
    return function(property, value) {
        assertType(property, "string", "property");
        var onlyProperty = arguments.length === 1;
        var message = messagePrefix + '("' + property + '"';
        if (!onlyProperty) {
            message += ", " + valueToString(value);
        }
        message += ")";
        return createMatcher(function(actual) {
            if (
                actual === undefined ||
                actual === null ||
                !propertyTest(actual, property)
            ) {
                return false;
            }
            return onlyProperty || deepEqual(actual[property], value);
        }, message);
    };
}

createMatcher.has = createPropertyMatcher(function(actual, property) {
    if (typeof actual === "object") {
        return property in actual;
    }
    return actual[property] !== undefined;
}, "has");

createMatcher.hasOwn = createPropertyMatcher(function(actual, property) {
    return hasOwnProperty(actual, property);
}, "hasOwn");

createMatcher.hasNested = function(property, value) {
    assertType(property, "string", "property");
    var onlyProperty = arguments.length === 1;
    var message = 'hasNested("' + property + '"';
    if (!onlyProperty) {
        message += ", " + valueToString(value);
    }
    message += ")";
    return createMatcher(function(actual) {
        if (
            actual === undefined ||
            actual === null ||
            get(actual, property) === undefined
        ) {
            return false;
        }
        return onlyProperty || deepEqual(get(actual, property), value);
    }, message);
};

createMatcher.every = function(predicate) {
    assertMatcher(predicate);

    return createMatcher(function(actual) {
        if (typeOf(actual) === "object") {
            return every(Object.keys(actual), function(key) {
                return predicate.test(actual[key]);
            });
        }

        return (
            isIterable(actual) &&
            every(actual, function(element) {
                return predicate.test(element);
            })
        );
    }, "every(" + predicate.message + ")");
};

createMatcher.some = function(predicate) {
    assertMatcher(predicate);

    return createMatcher(function(actual) {
        if (typeOf(actual) === "object") {
            return !every(Object.keys(actual), function(key) {
                return !predicate.test(actual[key]);
            });
        }

        return (
            isIterable(actual) &&
            !every(actual, function(element) {
                return !predicate.test(element);
            })
        );
    }, "some(" + predicate.message + ")");
};

createMatcher.array = createMatcher.typeOf("array");

createMatcher.array.deepEquals = function(expectation) {
    return createMatcher(function(actual) {
        // Comparing lengths is the fastest way to spot a difference before iterating through every item
        var sameLength = actual.length === expectation.length;
        return (
            typeOf(actual) === "array" &&
            sameLength &&
            every(actual, function(element, index) {
                var expected = expectation[index];
                return typeOf(expected) === "array" &&
                    typeOf(element) === "array"
                    ? createMatcher.array.deepEquals(expected).test(element)
                    : deepEqual(expected, element);
            })
        );
    }, "deepEquals([" + iterableToString(expectation) + "])");
};

createMatcher.array.startsWith = function(expectation) {
    return createMatcher(function(actual) {
        return (
            typeOf(actual) === "array" &&
            every(expectation, function(expectedElement, index) {
                return actual[index] === expectedElement;
            })
        );
    }, "startsWith([" + iterableToString(expectation) + "])");
};

createMatcher.array.endsWith = function(expectation) {
    return createMatcher(function(actual) {
        // This indicates the index in which we should start matching
        var offset = actual.length - expectation.length;

        return (
            typeOf(actual) === "array" &&
            every(expectation, function(expectedElement, index) {
                return actual[offset + index] === expectedElement;
            })
        );
    }, "endsWith([" + iterableToString(expectation) + "])");
};

createMatcher.array.contains = function(expectation) {
    return createMatcher(function(actual) {
        return (
            typeOf(actual) === "array" &&
            every(expectation, function(expectedElement) {
                return arrayIndexOf(actual, expectedElement) !== -1;
            })
        );
    }, "contains([" + iterableToString(expectation) + "])");
};

createMatcher.map = createMatcher.typeOf("map");

createMatcher.map.deepEquals = function mapDeepEquals(expectation) {
    return createMatcher(function(actual) {
        // Comparing lengths is the fastest way to spot a difference before iterating through every item
        var sameLength = actual.size === expectation.size;
        return (
            typeOf(actual) === "map" &&
            sameLength &&
            every(actual, function(element, key) {
                return expectation.has(key) && expectation.get(key) === element;
            })
        );
    }, "deepEquals(Map[" + iterableToString(expectation) + "])");
};

createMatcher.map.contains = function mapContains(expectation) {
    return createMatcher(function(actual) {
        return (
            typeOf(actual) === "map" &&
            every(expectation, function(element, key) {
                return actual.has(key) && actual.get(key) === element;
            })
        );
    }, "contains(Map[" + iterableToString(expectation) + "])");
};

createMatcher.set = createMatcher.typeOf("set");

createMatcher.set.deepEquals = function setDeepEquals(expectation) {
    return createMatcher(function(actual) {
        // Comparing lengths is the fastest way to spot a difference before iterating through every item
        var sameLength = actual.size === expectation.size;
        return (
            typeOf(actual) === "set" &&
            sameLength &&
            every(actual, function(element) {
                return expectation.has(element);
            })
        );
    }, "deepEquals(Set[" + iterableToString(expectation) + "])");
};

createMatcher.set.contains = function setContains(expectation) {
    return createMatcher(function(actual) {
        return (
            typeOf(actual) === "set" &&
            every(expectation, function(element) {
                return actual.has(element);
            })
        );
    }, "contains(Set[" + iterableToString(expectation) + "])");
};

createMatcher.bool = createMatcher.typeOf("boolean");
createMatcher.number = createMatcher.typeOf("number");
createMatcher.string = createMatcher.typeOf("string");
createMatcher.object = createMatcher.typeOf("object");
createMatcher.func = createMatcher.typeOf("function");
createMatcher.regexp = createMatcher.typeOf("regexp");
createMatcher.date = createMatcher.typeOf("date");
createMatcher.symbol = createMatcher.typeOf("symbol");

module.exports = createMatcher;

},{"./create-matcher/assert-matcher":58,"./create-matcher/assert-method-exists":59,"./create-matcher/assert-type":60,"./create-matcher/is-iterable":61,"./create-matcher/is-matcher":62,"./create-matcher/matcher-prototype":64,"./create-matcher/type-map":65,"./deep-equal":66,"./iterable-to-string":78,"@sinonjs/commons":44,"lodash.get":85}],58:[function(require,module,exports){
"use strict";

var isMatcher = require("./is-matcher");

/**
 * Throws a TypeError when `value` is not a matcher
 *
 * @private
 * @param {*} value The value to examine
 */
function assertMatcher(value) {
    if (!isMatcher(value)) {
        throw new TypeError("Matcher expected");
    }
}

module.exports = assertMatcher;

},{"./is-matcher":62}],59:[function(require,module,exports){
"use strict";

/**
 * Throws a TypeError when expected method doesn't exist
 *
 * @private
 * @param {*} value A value to examine
 * @param {string} method The name of the method to look for
 * @param {name} name A name to use for the error message
 * @param {string} methodPath The name of the method to use for error messages
 * @throws {TypeError} When the method doesn't exist
 */
function assertMethodExists(value, method, name, methodPath) {
    if (value[method] === null || value[method] === undefined) {
        throw new TypeError(
            "Expected " + name + " to have method " + methodPath
        );
    }
}

module.exports = assertMethodExists;

},{}],60:[function(require,module,exports){
"use strict";

var typeOf = require("@sinonjs/commons").typeOf;

/**
 * Ensures that value is of type
 *
 * @private
 * @param {*} value A value to examine
 * @param {string} type A basic JavaScript type to compare to, e.g. "object", "string"
 * @param {string} name A string to use for the error message
 * @throws {TypeError} If value is not of the expected type
 * @returns {undefined}
 */
function assertType(value, type, name) {
    var actual = typeOf(value);
    if (actual !== type) {
        throw new TypeError(
            "Expected type of " +
                name +
                " to be " +
                type +
                ", but was " +
                actual
        );
    }
}

module.exports = assertType;

},{"@sinonjs/commons":44}],61:[function(require,module,exports){
"use strict";

var typeOf = require("@sinonjs/commons").typeOf;

/**
 * Returns `true` for iterables
 *
 * @private
 * @param {*} value A value to examine
 * @returns {boolean} Returns `true` when `value` looks like an iterable
 */
function isIterable(value) {
    return Boolean(value) && typeOf(value.forEach) === "function";
}

module.exports = isIterable;

},{"@sinonjs/commons":44}],62:[function(require,module,exports){
"use strict";

var isPrototypeOf = require("@sinonjs/commons").prototypes.object.isPrototypeOf;

var matcherPrototype = require("./matcher-prototype");

/**
 * Returns `true` when `object` is a matcher
 *
 * @private
 * @param {*} object A value to examine
 * @returns {boolean} Returns `true` when `object` is a matcher
 */
function isMatcher(object) {
    return isPrototypeOf(matcherPrototype, object);
}

module.exports = isMatcher;

},{"./matcher-prototype":64,"@sinonjs/commons":44}],63:[function(require,module,exports){
"use strict";

var every = require("@sinonjs/commons").prototypes.array.every;
var typeOf = require("@sinonjs/commons").typeOf;

var deepEqual = require("../deep-equal");

var isMatcher = require("./is-matcher");
/**
 * Matches `actual` with `expectation`
 *
 * @private
 * @param {*} actual A value to examine
 * @param {object} expectation An object with properties to match on
 * @returns {boolean} Returns true when `actual` matches all properties in `expectation`
 */
function matchObject(actual, expectation) {
    if (actual === null || actual === undefined) {
        return false;
    }

    return every(Object.keys(expectation), function(key) {
        var exp = expectation[key];
        var act = actual[key];

        if (isMatcher(exp)) {
            if (!exp.test(act)) {
                return false;
            }
        } else if (typeOf(exp) === "object") {
            if (!matchObject(act, exp)) {
                return false;
            }
        } else if (!deepEqual(act, exp)) {
            return false;
        }

        return true;
    });
}

module.exports = matchObject;

},{"../deep-equal":66,"./is-matcher":62,"@sinonjs/commons":44}],64:[function(require,module,exports){
"use strict";

var matcherPrototype = {
    toString: function() {
        return this.message;
    }
};

matcherPrototype.or = function(valueOrMatcher) {
    var createMatcher = require("../create-matcher");
    var isMatcher = createMatcher.isMatcher;

    if (!arguments.length) {
        throw new TypeError("Matcher expected");
    }

    var m2 = isMatcher(valueOrMatcher)
        ? valueOrMatcher
        : createMatcher(valueOrMatcher);
    var m1 = this;
    var or = Object.create(matcherPrototype);
    or.test = function(actual) {
        return m1.test(actual) || m2.test(actual);
    };
    or.message = m1.message + ".or(" + m2.message + ")";
    return or;
};

matcherPrototype.and = function(valueOrMatcher) {
    var createMatcher = require("../create-matcher");
    var isMatcher = createMatcher.isMatcher;

    if (!arguments.length) {
        throw new TypeError("Matcher expected");
    }

    var m2 = isMatcher(valueOrMatcher)
        ? valueOrMatcher
        : createMatcher(valueOrMatcher);
    var m1 = this;
    var and = Object.create(matcherPrototype);
    and.test = function(actual) {
        return m1.test(actual) && m2.test(actual);
    };
    and.message = m1.message + ".and(" + m2.message + ")";
    return and;
};

module.exports = matcherPrototype;

},{"../create-matcher":57}],65:[function(require,module,exports){
"use strict";

var functionName = require("@sinonjs/commons").functionName;
var join = require("@sinonjs/commons").prototypes.array.join;
var map = require("@sinonjs/commons").prototypes.array.map;
var stringIndexOf = require("@sinonjs/commons").prototypes.string.indexOf;
var valueToString = require("@sinonjs/commons").valueToString;

var matchObject = require("./match-object");

var TYPE_MAP = {
    function: function(m, expectation, message) {
        m.test = expectation;
        m.message = message || "match(" + functionName(expectation) + ")";
    },
    number: function(m, expectation) {
        m.test = function(actual) {
            // we need type coercion here
            return expectation == actual; // eslint-disable-line eqeqeq
        };
    },
    object: function(m, expectation) {
        var array = [];

        if (typeof expectation.test === "function") {
            m.test = function(actual) {
                return expectation.test(actual) === true;
            };
            m.message = "match(" + functionName(expectation.test) + ")";
            return m;
        }

        array = map(Object.keys(expectation), function(key) {
            return key + ": " + valueToString(expectation[key]);
        });

        m.test = function(actual) {
            return matchObject(actual, expectation);
        };
        m.message = "match(" + join(array, ", ") + ")";

        return m;
    },
    regexp: function(m, expectation) {
        m.test = function(actual) {
            return typeof actual === "string" && expectation.test(actual);
        };
    },
    string: function(m, expectation) {
        m.test = function(actual) {
            return (
                typeof actual === "string" &&
                stringIndexOf(actual, expectation) !== -1
            );
        };
        m.message = 'match("' + expectation + '")';
    }
};

module.exports = TYPE_MAP;

},{"./match-object":63,"@sinonjs/commons":44}],66:[function(require,module,exports){
"use strict";

var valueToString = require("@sinonjs/commons").valueToString;
var className = require("@sinonjs/commons").className;
var arrayProto = require("@sinonjs/commons").prototypes.array;
var objectProto = require("@sinonjs/commons").prototypes.object;
var mapForEach = require("@sinonjs/commons").prototypes.map.forEach;

var getClass = require("./get-class");
var identical = require("./identical");
var isArguments = require("./is-arguments");
var isDate = require("./is-date");
var isElement = require("./is-element");
var isMap = require("./is-map");
var isNaN = require("./is-nan");
var isObject = require("./is-object");
var isSet = require("./is-set");
var isSubset = require("./is-subset");

var concat = arrayProto.concat;
var every = arrayProto.every;
var push = arrayProto.push;

var getTime = Date.prototype.getTime;
var hasOwnProperty = objectProto.hasOwnProperty;
var indexOf = arrayProto.indexOf;
var keys = Object.keys;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;

/**
 * Deep equal comparison. Two values are "deep equal" when:
 *
 *   - They are equal, according to samsam.identical
 *   - They are both date objects representing the same time
 *   - They are both arrays containing elements that are all deepEqual
 *   - They are objects with the same set of properties, and each property
 *     in ``actual`` is deepEqual to the corresponding property in ``expectation``
 *
 * Supports cyclic objects.
 *
 * @alias module:samsam.deepEqual
 * @param {*} actual The object to examine
 * @param {*} expectation The object actual is expected to be equal to
 * @param {object} match A value to match on
 * @returns {boolean} Returns true when actual and expectation are considered equal
 */
function deepEqualCyclic(actual, expectation, match) {
    // used for cyclic comparison
    // contain already visited objects
    var actualObjects = [];
    var expectationObjects = [];
    // contain pathes (position in the object structure)
    // of the already visited objects
    // indexes same as in objects arrays
    var actualPaths = [];
    var expectationPaths = [];
    // contains combinations of already compared objects
    // in the manner: { "$1['ref']$2['ref']": true }
    var compared = {};

    // does the recursion for the deep equal check
    // eslint-disable-next-line complexity
    return (function deepEqual(
        actualObj,
        expectationObj,
        actualPath,
        expectationPath
    ) {
        // If both are matchers they must be the same instance in order to be
        // considered equal If we didn't do that we would end up running one
        // matcher against the other
        if (match && match.isMatcher(expectationObj)) {
            if (match.isMatcher(actualObj)) {
                return actualObj === expectationObj;
            }
            return expectationObj.test(actualObj);
        }

        var actualType = typeof actualObj;
        var expectationType = typeof expectationObj;

        if (
            actualObj === expectationObj ||
            isNaN(actualObj) ||
            isNaN(expectationObj) ||
            actualObj === null ||
            expectationObj === null ||
            actualObj === undefined ||
            expectationObj === undefined ||
            actualType !== "object" ||
            expectationType !== "object"
        ) {
            return identical(actualObj, expectationObj);
        }

        // Elements are only equal if identical(expected, actual)
        if (isElement(actualObj) || isElement(expectationObj)) {
            return false;
        }

        var isActualDate = isDate(actualObj);
        var isExpectationDate = isDate(expectationObj);
        if (isActualDate || isExpectationDate) {
            if (
                !isActualDate ||
                !isExpectationDate ||
                getTime.call(actualObj) !== getTime.call(expectationObj)
            ) {
                return false;
            }
        }

        if (actualObj instanceof RegExp && expectationObj instanceof RegExp) {
            if (valueToString(actualObj) !== valueToString(expectationObj)) {
                return false;
            }
        }

        if (actualObj instanceof Error && expectationObj instanceof Error) {
            return actualObj === expectationObj;
        }

        var actualClass = getClass(actualObj);
        var expectationClass = getClass(expectationObj);
        var actualKeys = keys(actualObj);
        var expectationKeys = keys(expectationObj);
        var actualName = className(actualObj);
        var expectationName = className(expectationObj);
        var expectationSymbols =
            typeof getOwnPropertySymbols === "function"
                ? getOwnPropertySymbols(expectationObj)
                : [];
        var expectationKeysAndSymbols = concat(
            expectationKeys,
            expectationSymbols
        );

        if (isArguments(actualObj) || isArguments(expectationObj)) {
            if (actualObj.length !== expectationObj.length) {
                return false;
            }
        } else {
            if (
                actualType !== expectationType ||
                actualClass !== expectationClass ||
                actualKeys.length !== expectationKeys.length ||
                (actualName &&
                    expectationName &&
                    actualName !== expectationName)
            ) {
                return false;
            }
        }

        if (isSet(actualObj) || isSet(expectationObj)) {
            if (
                !isSet(actualObj) ||
                !isSet(expectationObj) ||
                actualObj.size !== expectationObj.size
            ) {
                return false;
            }

            return isSubset(actualObj, expectationObj, deepEqual);
        }

        if (isMap(actualObj) || isMap(expectationObj)) {
            if (
                !isMap(actualObj) ||
                !isMap(expectationObj) ||
                actualObj.size !== expectationObj.size
            ) {
                return false;
            }

            var mapsDeeplyEqual = true;
            mapForEach(actualObj, function(value, key) {
                mapsDeeplyEqual =
                    mapsDeeplyEqual &&
                    deepEqualCyclic(value, expectationObj.get(key));
            });

            return mapsDeeplyEqual;
        }

        return every(expectationKeysAndSymbols, function(key) {
            if (!hasOwnProperty(actualObj, key)) {
                return false;
            }

            var actualValue = actualObj[key];
            var expectationValue = expectationObj[key];
            var actualObject = isObject(actualValue);
            var expectationObject = isObject(expectationValue);
            // determines, if the objects were already visited
            // (it's faster to check for isObject first, than to
            // get -1 from getIndex for non objects)
            var actualIndex = actualObject
                ? indexOf(actualObjects, actualValue)
                : -1;
            var expectationIndex = expectationObject
                ? indexOf(expectationObjects, expectationValue)
                : -1;
            // determines the new paths of the objects
            // - for non cyclic objects the current path will be extended
            //   by current property name
            // - for cyclic objects the stored path is taken
            var newActualPath =
                actualIndex !== -1
                    ? actualPaths[actualIndex]
                    : actualPath + "[" + JSON.stringify(key) + "]";
            var newExpectationPath =
                expectationIndex !== -1
                    ? expectationPaths[expectationIndex]
                    : expectationPath + "[" + JSON.stringify(key) + "]";
            var combinedPath = newActualPath + newExpectationPath;

            // stop recursion if current objects are already compared
            if (compared[combinedPath]) {
                return true;
            }

            // remember the current objects and their paths
            if (actualIndex === -1 && actualObject) {
                push(actualObjects, actualValue);
                push(actualPaths, newActualPath);
            }
            if (expectationIndex === -1 && expectationObject) {
                push(expectationObjects, expectationValue);
                push(expectationPaths, newExpectationPath);
            }

            // remember that the current objects are already compared
            if (actualObject && expectationObject) {
                compared[combinedPath] = true;
            }

            // End of cyclic logic

            // neither actualValue nor expectationValue is a cycle
            // continue with next level
            return deepEqual(
                actualValue,
                expectationValue,
                newActualPath,
                newExpectationPath
            );
        });
    })(actual, expectation, "$1", "$2");
}

deepEqualCyclic.use = function(match) {
    return function deepEqual(a, b) {
        return deepEqualCyclic(a, b, match);
    };
};

module.exports = deepEqualCyclic;

},{"./get-class":67,"./identical":68,"./is-arguments":69,"./is-date":70,"./is-element":71,"./is-map":72,"./is-nan":73,"./is-object":75,"./is-set":76,"./is-subset":77,"@sinonjs/commons":44}],67:[function(require,module,exports){
"use strict";

var toString = require("@sinonjs/commons").prototypes.object.toString;

/**
 * Returns the internal `Class` by calling `Object.prototype.toString`
 * with the provided value as `this`. Return value is a `String`, naming the
 * internal class, e.g. "Array"
 *
 * @private
 * @param  {*} value - Any value
 * @returns {string} - A string representation of the `Class` of `value`
 */
function getClass(value) {
    return toString(value).split(/[ \]]/)[1];
}

module.exports = getClass;

},{"@sinonjs/commons":44}],68:[function(require,module,exports){
"use strict";

var isNaN = require("./is-nan");
var isNegZero = require("./is-neg-zero");

/**
 * Strict equality check according to EcmaScript Harmony's `egal`.
 *
 * **From the Harmony wiki:**
 * > An `egal` function simply makes available the internal `SameValue` function
 * > from section 9.12 of the ES5 spec. If two values are egal, then they are not
 * > observably distinguishable.
 *
 * `identical` returns `true` when `===` is `true`, except for `-0` and
 * `+0`, where it returns `false`. Additionally, it returns `true` when
 * `NaN` is compared to itself.
 *
 * @alias module:samsam.identical
 * @param {*} obj1 The first value to compare
 * @param {*} obj2 The second value to compare
 * @returns {boolean} Returns `true` when the objects are *egal*, `false` otherwise
 */
function identical(obj1, obj2) {
    if (obj1 === obj2 || (isNaN(obj1) && isNaN(obj2))) {
        return obj1 !== 0 || isNegZero(obj1) === isNegZero(obj2);
    }

    return false;
}

module.exports = identical;

},{"./is-nan":73,"./is-neg-zero":74}],69:[function(require,module,exports){
"use strict";

var getClass = require("./get-class");

/**
 * Returns `true` when `object` is an `arguments` object, `false` otherwise
 *
 * @alias module:samsam.isArguments
 * @param  {*}  object - The object to examine
 * @returns {boolean} `true` when `object` is an `arguments` object
 */
function isArguments(object) {
    return getClass(object) === "Arguments";
}

module.exports = isArguments;

},{"./get-class":67}],70:[function(require,module,exports){
"use strict";

/**
 * Returns `true` when `value` is an instance of Date
 *
 * @private
 * @param  {Date}  value The value to examine
 * @returns {boolean}     `true` when `value` is an instance of Date
 */
function isDate(value) {
    return value instanceof Date;
}

module.exports = isDate;

},{}],71:[function(require,module,exports){
"use strict";

var div = typeof document !== "undefined" && document.createElement("div");

/**
 * Returns `true` when `object` is a DOM element node.
 *
 * Unlike Underscore.js/lodash, this function will return `false` if `object`
 * is an *element-like* object, i.e. a regular object with a `nodeType`
 * property that holds the value `1`.
 *
 * @alias module:samsam.isElement
 * @param {object} object The object to examine
 * @returns {boolean} Returns `true` for DOM element nodes
 */
function isElement(object) {
    if (!object || object.nodeType !== 1 || !div) {
        return false;
    }
    try {
        object.appendChild(div);
        object.removeChild(div);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = isElement;

},{}],72:[function(require,module,exports){
"use strict";

/**
 * Returns `true` when `value` is a Map
 *
 * @param {*} value A value to examine
 * @returns {boolean} `true` when `value` is an instance of `Map`, `false` otherwise
 * @private
 */
function isMap(value) {
    return typeof Map !== "undefined" && value instanceof Map;
}

module.exports = isMap;

},{}],73:[function(require,module,exports){
"use strict";

/**
 * Compares a `value` to `NaN`
 *
 * @private
 * @param {*} value A value to examine
 * @returns {boolean} Returns `true` when `value` is `NaN`
 */
function isNaN(value) {
    // Unlike global `isNaN`, this function avoids type coercion
    // `typeof` check avoids IE host object issues, hat tip to
    // lodash

    // eslint-disable-next-line no-self-compare
    return typeof value === "number" && value !== value;
}

module.exports = isNaN;

},{}],74:[function(require,module,exports){
"use strict";

/**
 * Returns `true` when `value` is `-0`
 *
 * @alias module:samsam.isNegZero
 * @param {*} value A value to examine
 * @returns {boolean} Returns `true` when `value` is `-0`
 */
function isNegZero(value) {
    return value === 0 && 1 / value === -Infinity;
}

module.exports = isNegZero;

},{}],75:[function(require,module,exports){
"use strict";

/**
 * Returns `true` when the value is a regular Object and not a specialized Object
 *
 * This helps speed up deepEqual cyclic checks
 *
 * The premise is that only Objects are stored in the visited array.
 * So if this function returns false, we don't have to do the
 * expensive operation of searching for the value in the the array of already
 * visited objects
 *
 * @private
 * @param  {object}   value The object to examine
 * @returns {boolean}       `true` when the object is a non-specialised object
 */
function isObject(value) {
    return (
        typeof value === "object" &&
        value !== null &&
        // none of these are collection objects, so we can return false
        !(value instanceof Boolean) &&
        !(value instanceof Date) &&
        !(value instanceof Error) &&
        !(value instanceof Number) &&
        !(value instanceof RegExp) &&
        !(value instanceof String)
    );
}

module.exports = isObject;

},{}],76:[function(require,module,exports){
"use strict";

/**
 * Returns `true` when the argument is an instance of Set, `false` otherwise
 *
 * @alias module:samsam.isSet
 * @param  {*}  val - A value to examine
 * @returns {boolean} Returns `true` when the argument is an instance of Set, `false` otherwise
 */
function isSet(val) {
    return (typeof Set !== "undefined" && val instanceof Set) || false;
}

module.exports = isSet;

},{}],77:[function(require,module,exports){
"use strict";

var forEach = require("@sinonjs/commons").prototypes.set.forEach;

/**
 * Returns `true` when `s1` is a subset of `s2`, `false` otherwise
 *
 * @private
 * @param  {Array|Set}  s1      The target value
 * @param  {Array|Set}  s2      The containing value
 * @param  {Function}  compare A comparison function, should return `true` when
 *                             values are considered equal
 * @returns {boolean} Returns `true` when `s1` is a subset of `s2`, `false`` otherwise
 */
function isSubset(s1, s2, compare) {
    var allContained = true;
    forEach(s1, function(v1) {
        var includes = false;
        forEach(s2, function(v2) {
            if (compare(v2, v1)) {
                includes = true;
            }
        });
        allContained = allContained && includes;
    });

    return allContained;
}

module.exports = isSubset;

},{"@sinonjs/commons":44}],78:[function(require,module,exports){
"use strict";

var slice = require("@sinonjs/commons").prototypes.string.slice;
var typeOf = require("@sinonjs/commons").typeOf;
var valueToString = require("@sinonjs/commons").valueToString;

/**
 * Creates a string represenation of an iterable object
 *
 * @private
 * @param   {object} obj The iterable object to stringify
 * @returns {string}     A string representation
 */
function iterableToString(obj) {
    if (typeOf(obj) === "map") {
        return mapToString(obj);
    }

    return genericIterableToString(obj);
}

/**
 * Creates a string representation of a Map
 *
 * @private
 * @param   {Map} map    The map to stringify
 * @returns {string}     A string representation
 */
function mapToString(map) {
    var representation = "";

    /* eslint-disable-next-line local-rules/no-prototype-methods */
    map.forEach(function(value, key) {
        representation += "[" + stringify(key) + "," + stringify(value) + "],";
    });

    representation = slice(representation, 0, -1);
    return representation;
}

/**
 * Create a string represenation for an iterable
 *
 * @private
 * @param   {object} iterable The iterable to stringify
 * @returns {string}          A string representation
 */
function genericIterableToString(iterable) {
    var representation = "";

    /* eslint-disable-next-line local-rules/no-prototype-methods */
    iterable.forEach(function(value) {
        representation += stringify(value) + ",";
    });

    representation = slice(representation, 0, -1);
    return representation;
}

/**
 * Creates a string representation of the passed `item`
 *
 * @private
 * @param  {object} item The item to stringify
 * @returns {string}      A string representation of `item`
 */
function stringify(item) {
    return typeof item === "string" ? "'" + item + "'" : valueToString(item);
}

module.exports = iterableToString;

},{"@sinonjs/commons":44}],79:[function(require,module,exports){
"use strict";

var valueToString = require("@sinonjs/commons").valueToString;
var indexOf = require("@sinonjs/commons").prototypes.string.indexOf;
var forEach = require("@sinonjs/commons").prototypes.array.forEach;

var deepEqual = require("./deep-equal").use(match); // eslint-disable-line no-use-before-define
var getClass = require("./get-class");
var isDate = require("./is-date");
var isSet = require("./is-set");
var isSubset = require("./is-subset");
var createMatcher = require("./create-matcher");

/**
 * Returns true when `array` contains all of `subset` as defined by the `compare`
 * argument
 *
 * @param  {Array} array   An array to search for a subset
 * @param  {Array} subset  The subset to find in the array
 * @param  {Function} compare A comparison function
 * @returns {boolean}         [description]
 * @private
 */
function arrayContains(array, subset, compare) {
    if (subset.length === 0) {
        return true;
    }
    var i, l, j, k;
    for (i = 0, l = array.length; i < l; ++i) {
        if (compare(array[i], subset[0])) {
            for (j = 0, k = subset.length; j < k; ++j) {
                if (i + j >= l) {
                    return false;
                }
                if (!compare(array[i + j], subset[j])) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

/* eslint-disable complexity */
/**
 * Matches an object with a matcher (or value)
 *
 * @alias module:samsam.match
 * @param {object} object The object candidate to match
 * @param {object} matcherOrValue A matcher or value to match against
 * @returns {boolean} true when `object` matches `matcherOrValue`
 */
function match(object, matcherOrValue) {
    if (matcherOrValue && typeof matcherOrValue.test === "function") {
        return matcherOrValue.test(object);
    }

    if (typeof matcherOrValue === "function") {
        return matcherOrValue(object) === true;
    }

    if (typeof matcherOrValue === "string") {
        var notNull = typeof object === "string" || Boolean(object);
        return (
            notNull &&
            indexOf(
                valueToString(object).toLowerCase(),
                matcherOrValue.toLowerCase()
            ) >= 0
        );
    }

    if (typeof matcherOrValue === "number") {
        return matcherOrValue === object;
    }

    if (typeof matcherOrValue === "boolean") {
        return matcherOrValue === object;
    }

    if (typeof matcherOrValue === "bigint") {
        return matcherOrValue === object;
    }

    if (typeof matcherOrValue === "undefined") {
        return typeof object === "undefined";
    }

    if (typeof matcherOrValue === "symbol") {
        return matcherOrValue === object;
    }

    if (matcherOrValue === null) {
        return object === null;
    }

    if (object === null) {
        return false;
    }

    if (isSet(object)) {
        return isSubset(matcherOrValue, object, match);
    }

    if (getClass(object) === "Array" && getClass(matcherOrValue) === "Array") {
        return arrayContains(object, matcherOrValue, match);
    }

    if (isDate(matcherOrValue)) {
        return isDate(object) && object.getTime() === matcherOrValue.getTime();
    }

    if (matcherOrValue && typeof matcherOrValue === "object") {
        if (matcherOrValue === object) {
            return true;
        }
        if (typeof object !== "object") {
            return false;
        }
        var prop;
        // eslint-disable-next-line guard-for-in
        for (prop in matcherOrValue) {
            var value = object[prop];
            if (
                typeof value === "undefined" &&
                typeof object.getAttribute === "function"
            ) {
                value = object.getAttribute(prop);
            }
            if (
                matcherOrValue[prop] === null ||
                typeof matcherOrValue[prop] === "undefined"
            ) {
                if (value !== matcherOrValue[prop]) {
                    return false;
                }
            } else if (
                typeof value === "undefined" ||
                !deepEqual(value, matcherOrValue[prop])
            ) {
                return false;
            }
        }
        return true;
    }

    /* istanbul ignore next */
    throw new Error("Matcher was an unknown or unsupported type");
}
/* eslint-enable complexity */

forEach(Object.keys(createMatcher), function(key) {
    match[key] = createMatcher[key];
});

module.exports = match;

},{"./create-matcher":57,"./deep-equal":66,"./get-class":67,"./is-date":70,"./is-set":76,"./is-subset":77,"@sinonjs/commons":44}],80:[function(require,module,exports){
"use strict";

/**
 * @module samsam
 */
var identical = require("./identical");
var isArguments = require("./is-arguments");
var isElement = require("./is-element");
var isNegZero = require("./is-neg-zero");
var isSet = require("./is-set");
var isMap = require("./is-map");
var match = require("./match");
var deepEqualCyclic = require("./deep-equal").use(match);
var createMatcher = require("./create-matcher");

module.exports = {
    createMatcher: createMatcher,
    deepEqual: deepEqualCyclic,
    identical: identical,
    isArguments: isArguments,
    isElement: isElement,
    isMap: isMap,
    isNegZero: isNegZero,
    isSet: isSet,
    match: match
};

},{"./create-matcher":57,"./deep-equal":66,"./identical":68,"./is-arguments":69,"./is-element":71,"./is-map":72,"./is-neg-zero":74,"./is-set":76,"./match":79}],81:[function(require,module,exports){

},{}],82:[function(require,module,exports){
/*!

 diff v4.0.1

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Diff = {}));
}(this, function (exports) { 'use strict';

  function Diff() {}
  Diff.prototype = {
    diff: function diff(oldString, newString) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      this.options = options;
      var self = this;

      function done(value) {
        if (callback) {
          setTimeout(function () {
            callback(undefined, value);
          }, 0);
          return true;
        } else {
          return value;
        }
      } // Allow subclasses to massage the input prior to running


      oldString = this.castInput(oldString);
      newString = this.castInput(newString);
      oldString = this.removeEmpty(this.tokenize(oldString));
      newString = this.removeEmpty(this.tokenize(newString));
      var newLen = newString.length,
          oldLen = oldString.length;
      var editLength = 1;
      var maxEditLength = newLen + oldLen;
      var bestPath = [{
        newPos: -1,
        components: []
      }]; // Seed editLength = 0, i.e. the content starts with the same values

      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);

      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        // Identity per the equality and tokenizer
        return done([{
          value: this.join(newString),
          count: newString.length
        }]);
      } // Main worker method. checks all permutations of a given edit length for acceptance.


      function execEditLength() {
        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
          var basePath = void 0;

          var addPath = bestPath[diagonalPath - 1],
              removePath = bestPath[diagonalPath + 1],
              _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

          if (addPath) {
            // No one else is going to attempt to use this value, clear it
            bestPath[diagonalPath - 1] = undefined;
          }

          var canAdd = addPath && addPath.newPos + 1 < newLen,
              canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;

          if (!canAdd && !canRemove) {
            // If this path is a terminal then prune
            bestPath[diagonalPath] = undefined;
            continue;
          } // Select the diagonal that we want to branch from. We select the prior
          // path whose position in the new string is the farthest from the origin
          // and does not pass the bounds of the diff graph


          if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
            basePath = clonePath(removePath);
            self.pushComponent(basePath.components, undefined, true);
          } else {
            basePath = addPath; // No need to clone, we've pulled it from the list

            basePath.newPos++;
            self.pushComponent(basePath.components, true, undefined);
          }

          _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done

          if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
            return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
          } else {
            // Otherwise track this path as a potential candidate and continue.
            bestPath[diagonalPath] = basePath;
          }
        }

        editLength++;
      } // Performs the length of edit iteration. Is a bit fugly as this has to support the
      // sync and async mode which is never fun. Loops over execEditLength until a value
      // is produced.


      if (callback) {
        (function exec() {
          setTimeout(function () {
            // This should not happen, but we want to be safe.

            /* istanbul ignore next */
            if (editLength > maxEditLength) {
              return callback();
            }

            if (!execEditLength()) {
              exec();
            }
          }, 0);
        })();
      } else {
        while (editLength <= maxEditLength) {
          var ret = execEditLength();

          if (ret) {
            return ret;
          }
        }
      }
    },
    pushComponent: function pushComponent(components, added, removed) {
      var last = components[components.length - 1];

      if (last && last.added === added && last.removed === removed) {
        // We need to clone here as the component clone operation is just
        // as shallow array clone
        components[components.length - 1] = {
          count: last.count + 1,
          added: added,
          removed: removed
        };
      } else {
        components.push({
          count: 1,
          added: added,
          removed: removed
        });
      }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
      var newLen = newString.length,
          oldLen = oldString.length,
          newPos = basePath.newPos,
          oldPos = newPos - diagonalPath,
          commonCount = 0;

      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
        newPos++;
        oldPos++;
        commonCount++;
      }

      if (commonCount) {
        basePath.components.push({
          count: commonCount
        });
      }

      basePath.newPos = newPos;
      return oldPos;
    },
    equals: function equals(left, right) {
      if (this.options.comparator) {
        return this.options.comparator(left, right);
      } else {
        return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
      }
    },
    removeEmpty: function removeEmpty(array) {
      var ret = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i]) {
          ret.push(array[i]);
        }
      }

      return ret;
    },
    castInput: function castInput(value) {
      return value;
    },
    tokenize: function tokenize(value) {
      return value.split('');
    },
    join: function join(chars) {
      return chars.join('');
    }
  };

  function buildValues(diff, components, newString, oldString, useLongestToken) {
    var componentPos = 0,
        componentLen = components.length,
        newPos = 0,
        oldPos = 0;

    for (; componentPos < componentLen; componentPos++) {
      var component = components[componentPos];

      if (!component.removed) {
        if (!component.added && useLongestToken) {
          var value = newString.slice(newPos, newPos + component.count);
          value = value.map(function (value, i) {
            var oldValue = oldString[oldPos + i];
            return oldValue.length > value.length ? oldValue : value;
          });
          component.value = diff.join(value);
        } else {
          component.value = diff.join(newString.slice(newPos, newPos + component.count));
        }

        newPos += component.count; // Common case

        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
        oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
        // The diffing algorithm is tied to add then remove output and this is the simplest
        // route to get the desired output with minimal overhead.

        if (componentPos && components[componentPos - 1].added) {
          var tmp = components[componentPos - 1];
          components[componentPos - 1] = components[componentPos];
          components[componentPos] = tmp;
        }
      }
    } // Special case handle for when one terminal is ignored (i.e. whitespace).
    // For this case we merge the terminal into the prior string and drop the change.
    // This is only available for string mode.


    var lastComponent = components[componentLen - 1];

    if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
      components[componentLen - 2].value += lastComponent.value;
      components.pop();
    }

    return components;
  }

  function clonePath(path) {
    return {
      newPos: path.newPos,
      components: path.components.slice(0)
    };
  }

  var characterDiff = new Diff();
  function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
  }

  function generateOptions(options, defaults) {
    if (typeof options === 'function') {
      defaults.callback = options;
    } else if (options) {
      for (var name in options) {
        /* istanbul ignore else */
        if (options.hasOwnProperty(name)) {
          defaults[name] = options[name];
        }
      }
    }

    return defaults;
  }

  //
  // Ranges and exceptions:
  // Latin-1 Supplement, 0080–00FF
  //  - U+00D7  × Multiplication sign
  //  - U+00F7  ÷ Division sign
  // Latin Extended-A, 0100–017F
  // Latin Extended-B, 0180–024F
  // IPA Extensions, 0250–02AF
  // Spacing Modifier Letters, 02B0–02FF
  //  - U+02C7  ˇ &#711;  Caron
  //  - U+02D8  ˘ &#728;  Breve
  //  - U+02D9  ˙ &#729;  Dot Above
  //  - U+02DA  ˚ &#730;  Ring Above
  //  - U+02DB  ˛ &#731;  Ogonek
  //  - U+02DC  ˜ &#732;  Small Tilde
  //  - U+02DD  ˝ &#733;  Double Acute Accent
  // Latin Extended Additional, 1E00–1EFF

  var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
  var reWhitespace = /\S/;
  var wordDiff = new Diff();

  wordDiff.equals = function (left, right) {
    if (this.options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }

    return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
  };

  wordDiff.tokenize = function (value) {
    var tokens = value.split(/(\s+|[()[\]{}'"]|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.

    for (var i = 0; i < tokens.length - 1; i++) {
      // If we have an empty string in the next field and we have only word chars before and after, merge
      if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
        tokens[i] += tokens[i + 2];
        tokens.splice(i + 1, 2);
        i--;
      }
    }

    return tokens;
  };

  function diffWords(oldStr, newStr, options) {
    options = generateOptions(options, {
      ignoreWhitespace: true
    });
    return wordDiff.diff(oldStr, newStr, options);
  }
  function diffWordsWithSpace(oldStr, newStr, options) {
    return wordDiff.diff(oldStr, newStr, options);
  }

  var lineDiff = new Diff();

  lineDiff.tokenize = function (value) {
    var retLines = [],
        linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line

    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    } // Merge the content and line separators into single tokens


    for (var i = 0; i < linesAndNewlines.length; i++) {
      var line = linesAndNewlines[i];

      if (i % 2 && !this.options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        if (this.options.ignoreWhitespace) {
          line = line.trim();
        }

        retLines.push(line);
      }
    }

    return retLines;
  };

  function diffLines(oldStr, newStr, callback) {
    return lineDiff.diff(oldStr, newStr, callback);
  }
  function diffTrimmedLines(oldStr, newStr, callback) {
    var options = generateOptions(callback, {
      ignoreWhitespace: true
    });
    return lineDiff.diff(oldStr, newStr, options);
  }

  var sentenceDiff = new Diff();

  sentenceDiff.tokenize = function (value) {
    return value.split(/(\S.+?[.!?])(?=\s+|$)/);
  };

  function diffSentences(oldStr, newStr, callback) {
    return sentenceDiff.diff(oldStr, newStr, callback);
  }

  var cssDiff = new Diff();

  cssDiff.tokenize = function (value) {
    return value.split(/([{}:;,]|\s+)/);
  };

  function diffCss(oldStr, newStr, callback) {
    return cssDiff.diff(oldStr, newStr, callback);
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var objectPrototypeToString = Object.prototype.toString;
  var jsonDiff = new Diff(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:

  jsonDiff.useLongestToken = true;
  jsonDiff.tokenize = lineDiff.tokenize;

  jsonDiff.castInput = function (value) {
    var _this$options = this.options,
        undefinedReplacement = _this$options.undefinedReplacement,
        _this$options$stringi = _this$options.stringifyReplacer,
        stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
      return typeof v === 'undefined' ? undefinedReplacement : v;
    } : _this$options$stringi;
    return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
  };

  jsonDiff.equals = function (left, right) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
  };

  function diffJson(oldObj, newObj, options) {
    return jsonDiff.diff(oldObj, newObj, options);
  } // This function handles the presence of circular references by bailing out when encountering an
  // object that is already on the "stack" of items being processed. Accepts an optional replacer

  function canonicalize(obj, stack, replacementStack, replacer, key) {
    stack = stack || [];
    replacementStack = replacementStack || [];

    if (replacer) {
      obj = replacer(key, obj);
    }

    var i;

    for (i = 0; i < stack.length; i += 1) {
      if (stack[i] === obj) {
        return replacementStack[i];
      }
    }

    var canonicalizedObj;

    if ('[object Array]' === objectPrototypeToString.call(obj)) {
      stack.push(obj);
      canonicalizedObj = new Array(obj.length);
      replacementStack.push(canonicalizedObj);

      for (i = 0; i < obj.length; i += 1) {
        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
      }

      stack.pop();
      replacementStack.pop();
      return canonicalizedObj;
    }

    if (obj && obj.toJSON) {
      obj = obj.toJSON();
    }

    if (_typeof(obj) === 'object' && obj !== null) {
      stack.push(obj);
      canonicalizedObj = {};
      replacementStack.push(canonicalizedObj);

      var sortedKeys = [],
          _key;

      for (_key in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(_key)) {
          sortedKeys.push(_key);
        }
      }

      sortedKeys.sort();

      for (i = 0; i < sortedKeys.length; i += 1) {
        _key = sortedKeys[i];
        canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
      }

      stack.pop();
      replacementStack.pop();
    } else {
      canonicalizedObj = obj;
    }

    return canonicalizedObj;
  }

  var arrayDiff = new Diff();

  arrayDiff.tokenize = function (value) {
    return value.slice();
  };

  arrayDiff.join = arrayDiff.removeEmpty = function (value) {
    return value;
  };

  function diffArrays(oldArr, newArr, callback) {
    return arrayDiff.diff(oldArr, newArr, callback);
  }

  function parsePatch(uniDiff) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        list = [],
        i = 0;

    function parseIndex() {
      var index = {};
      list.push(index); // Parse diff metadata

      while (i < diffstr.length) {
        var line = diffstr[i]; // File header found, end parsing diff metadata

        if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
          break;
        } // Diff index


        var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);

        if (header) {
          index.index = header[1];
        }

        i++;
      } // Parse file headers if they are defined. Unified diff requires them, but
      // there's no technical issues to have an isolated hunk without file header


      parseFileHeader(index);
      parseFileHeader(index); // Parse hunks

      index.hunks = [];

      while (i < diffstr.length) {
        var _line = diffstr[i];

        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
          break;
        } else if (/^@@/.test(_line)) {
          index.hunks.push(parseHunk());
        } else if (_line && options.strict) {
          // Ignore unexpected content unless in strict mode
          throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
        } else {
          i++;
        }
      }
    } // Parses the --- and +++ headers, if none are found, no lines
    // are consumed.


    function parseFileHeader(index) {
      var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);

      if (fileHeader) {
        var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
        var data = fileHeader[2].split('\t', 2);
        var fileName = data[0].replace(/\\\\/g, '\\');

        if (/^".*"$/.test(fileName)) {
          fileName = fileName.substr(1, fileName.length - 2);
        }

        index[keyPrefix + 'FileName'] = fileName;
        index[keyPrefix + 'Header'] = (data[1] || '').trim();
        i++;
      }
    } // Parses a hunk
    // This assumes that we are at the start of a hunk.


    function parseHunk() {
      var chunkHeaderIndex = i,
          chunkHeaderLine = diffstr[i++],
          chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
      var hunk = {
        oldStart: +chunkHeader[1],
        oldLines: +chunkHeader[2] || 1,
        newStart: +chunkHeader[3],
        newLines: +chunkHeader[4] || 1,
        lines: [],
        linedelimiters: []
      };
      var addCount = 0,
          removeCount = 0;

      for (; i < diffstr.length; i++) {
        // Lines starting with '---' could be mistaken for the "remove line" operation
        // But they could be the header for the next file. Therefore prune such cases out.
        if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
          break;
        }

        var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

        if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
          hunk.lines.push(diffstr[i]);
          hunk.linedelimiters.push(delimiters[i] || '\n');

          if (operation === '+') {
            addCount++;
          } else if (operation === '-') {
            removeCount++;
          } else if (operation === ' ') {
            addCount++;
            removeCount++;
          }
        } else {
          break;
        }
      } // Handle the empty block count case


      if (!addCount && hunk.newLines === 1) {
        hunk.newLines = 0;
      }

      if (!removeCount && hunk.oldLines === 1) {
        hunk.oldLines = 0;
      } // Perform optional sanity checking


      if (options.strict) {
        if (addCount !== hunk.newLines) {
          throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }

        if (removeCount !== hunk.oldLines) {
          throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }
      }

      return hunk;
    }

    while (i < diffstr.length) {
      parseIndex();
    }

    return list;
  }

  // Iterator that traverses in the range of [min, max], stepping
  // by distance from a given start position. I.e. for [0, 4], with
  // start of 2, this will iterate 2, 3, 1, 4, 0.
  function distanceIterator (start, minLine, maxLine) {
    var wantForward = true,
        backwardExhausted = false,
        forwardExhausted = false,
        localOffset = 1;
    return function iterator() {
      if (wantForward && !forwardExhausted) {
        if (backwardExhausted) {
          localOffset++;
        } else {
          wantForward = false;
        } // Check if trying to fit beyond text length, and if not, check it fits
        // after offset location (or desired location on first iteration)


        if (start + localOffset <= maxLine) {
          return localOffset;
        }

        forwardExhausted = true;
      }

      if (!backwardExhausted) {
        if (!forwardExhausted) {
          wantForward = true;
        } // Check if trying to fit before text beginning, and if not, check it fits
        // before offset location


        if (minLine <= start - localOffset) {
          return -localOffset++;
        }

        backwardExhausted = true;
        return iterator();
      } // We tried to fit hunk before text beginning and beyond text length, then
      // hunk can't fit on the text. Return undefined

    };
  }

  function applyPatch(source, uniDiff) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    if (Array.isArray(uniDiff)) {
      if (uniDiff.length > 1) {
        throw new Error('applyPatch only works with a single input.');
      }

      uniDiff = uniDiff[0];
    } // Apply the diff to the input


    var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        hunks = uniDiff.hunks,
        compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) {
      return line === patchContent;
    },
        errorCount = 0,
        fuzzFactor = options.fuzzFactor || 0,
        minLine = 0,
        offset = 0,
        removeEOFNL,
        addEOFNL;
    /**
     * Checks if the hunk exactly fits on the provided location
     */


    function hunkFits(hunk, toPos) {
      for (var j = 0; j < hunk.lines.length; j++) {
        var line = hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line;

        if (operation === ' ' || operation === '-') {
          // Context sanity check
          if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
            errorCount++;

            if (errorCount > fuzzFactor) {
              return false;
            }
          }

          toPos++;
        }
      }

      return true;
    } // Search best fit offsets for each hunk based on the previous ones


    for (var i = 0; i < hunks.length; i++) {
      var hunk = hunks[i],
          maxLine = lines.length - hunk.oldLines,
          localOffset = 0,
          toPos = offset + hunk.oldStart - 1;
      var iterator = distanceIterator(toPos, minLine, maxLine);

      for (; localOffset !== undefined; localOffset = iterator()) {
        if (hunkFits(hunk, toPos + localOffset)) {
          hunk.offset = offset += localOffset;
          break;
        }
      }

      if (localOffset === undefined) {
        return false;
      } // Set lower text limit to end of the current hunk, so next ones don't try
      // to fit over already patched text


      minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
    } // Apply patch hunks


    var diffOffset = 0;

    for (var _i = 0; _i < hunks.length; _i++) {
      var _hunk = hunks[_i],
          _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;

      diffOffset += _hunk.newLines - _hunk.oldLines;

      if (_toPos < 0) {
        // Creating a new file
        _toPos = 0;
      }

      for (var j = 0; j < _hunk.lines.length; j++) {
        var line = _hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line,
            delimiter = _hunk.linedelimiters[j];

        if (operation === ' ') {
          _toPos++;
        } else if (operation === '-') {
          lines.splice(_toPos, 1);
          delimiters.splice(_toPos, 1);
          /* istanbul ignore else */
        } else if (operation === '+') {
          lines.splice(_toPos, 0, content);
          delimiters.splice(_toPos, 0, delimiter);
          _toPos++;
        } else if (operation === '\\') {
          var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;

          if (previousOperation === '+') {
            removeEOFNL = true;
          } else if (previousOperation === '-') {
            addEOFNL = true;
          }
        }
      }
    } // Handle EOFNL insertion/removal


    if (removeEOFNL) {
      while (!lines[lines.length - 1]) {
        lines.pop();
        delimiters.pop();
      }
    } else if (addEOFNL) {
      lines.push('');
      delimiters.push('\n');
    }

    for (var _k = 0; _k < lines.length - 1; _k++) {
      lines[_k] = lines[_k] + delimiters[_k];
    }

    return lines.join('');
  } // Wrapper that supports multiple file patches via callbacks.

  function applyPatches(uniDiff, options) {
    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    var currentIndex = 0;

    function processIndex() {
      var index = uniDiff[currentIndex++];

      if (!index) {
        return options.complete();
      }

      options.loadFile(index, function (err, data) {
        if (err) {
          return options.complete(err);
        }

        var updatedContent = applyPatch(data, index, options);
        options.patched(index, updatedContent, function (err) {
          if (err) {
            return options.complete(err);
          }

          processIndex();
        });
      });
    }

    processIndex();
  }

  function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    if (!options) {
      options = {};
    }

    if (typeof options.context === 'undefined') {
      options.context = 4;
    }

    var diff = diffLines(oldStr, newStr, options);
    diff.push({
      value: '',
      lines: []
    }); // Append an empty value to make cleanup easier

    function contextLines(lines) {
      return lines.map(function (entry) {
        return ' ' + entry;
      });
    }

    var hunks = [];
    var oldRangeStart = 0,
        newRangeStart = 0,
        curRange = [],
        oldLine = 1,
        newLine = 1;

    var _loop = function _loop(i) {
      var current = diff[i],
          lines = current.lines || current.value.replace(/\n$/, '').split('\n');
      current.lines = lines;

      if (current.added || current.removed) {
        var _curRange;

        // If we have previous context, start with that
        if (!oldRangeStart) {
          var prev = diff[i - 1];
          oldRangeStart = oldLine;
          newRangeStart = newLine;

          if (prev) {
            curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
            oldRangeStart -= curRange.length;
            newRangeStart -= curRange.length;
          }
        } // Output our changes


        (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function (entry) {
          return (current.added ? '+' : '-') + entry;
        }))); // Track the updated file position


        if (current.added) {
          newLine += lines.length;
        } else {
          oldLine += lines.length;
        }
      } else {
        // Identical context lines. Track line changes
        if (oldRangeStart) {
          // Close out any changes that have been output (or join overlapping)
          if (lines.length <= options.context * 2 && i < diff.length - 2) {
            var _curRange2;

            // Overlapping
            (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
          } else {
            var _curRange3;

            // end the range and output
            var contextSize = Math.min(lines.length, options.context);

            (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));

            var hunk = {
              oldStart: oldRangeStart,
              oldLines: oldLine - oldRangeStart + contextSize,
              newStart: newRangeStart,
              newLines: newLine - newRangeStart + contextSize,
              lines: curRange
            };

            if (i >= diff.length - 2 && lines.length <= options.context) {
              // EOF is inside this hunk
              var oldEOFNewline = /\n$/.test(oldStr);
              var newEOFNewline = /\n$/.test(newStr);
              var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;

              if (!oldEOFNewline && noNlBeforeAdds) {
                // special case: old has no eol and no trailing context; no-nl can end up before adds
                curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
              }

              if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
                curRange.push('\\ No newline at end of file');
              }
            }

            hunks.push(hunk);
            oldRangeStart = 0;
            newRangeStart = 0;
            curRange = [];
          }
        }

        oldLine += lines.length;
        newLine += lines.length;
      }
    };

    for (var i = 0; i < diff.length; i++) {
      _loop(i);
    }

    return {
      oldFileName: oldFileName,
      newFileName: newFileName,
      oldHeader: oldHeader,
      newHeader: newHeader,
      hunks: hunks
    };
  }
  function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
    var ret = [];

    if (oldFileName == newFileName) {
      ret.push('Index: ' + oldFileName);
    }

    ret.push('===================================================================');
    ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
    ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

    for (var i = 0; i < diff.hunks.length; i++) {
      var hunk = diff.hunks[i];
      ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
      ret.push.apply(ret, hunk.lines);
    }

    return ret.join('\n') + '\n';
  }
  function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
    return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
  }

  function arrayEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    return arrayStartsWith(a, b);
  }
  function arrayStartsWith(array, start) {
    if (start.length > array.length) {
      return false;
    }

    for (var i = 0; i < start.length; i++) {
      if (start[i] !== array[i]) {
        return false;
      }
    }

    return true;
  }

  function calcLineCount(hunk) {
    var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines),
        oldLines = _calcOldNewLineCount.oldLines,
        newLines = _calcOldNewLineCount.newLines;

    if (oldLines !== undefined) {
      hunk.oldLines = oldLines;
    } else {
      delete hunk.oldLines;
    }

    if (newLines !== undefined) {
      hunk.newLines = newLines;
    } else {
      delete hunk.newLines;
    }
  }
  function merge(mine, theirs, base) {
    mine = loadPatch(mine, base);
    theirs = loadPatch(theirs, base);
    var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
    // Leaving sanity checks on this to the API consumer that may know more about the
    // meaning in their own context.

    if (mine.index || theirs.index) {
      ret.index = mine.index || theirs.index;
    }

    if (mine.newFileName || theirs.newFileName) {
      if (!fileNameChanged(mine)) {
        // No header or no change in ours, use theirs (and ours if theirs does not exist)
        ret.oldFileName = theirs.oldFileName || mine.oldFileName;
        ret.newFileName = theirs.newFileName || mine.newFileName;
        ret.oldHeader = theirs.oldHeader || mine.oldHeader;
        ret.newHeader = theirs.newHeader || mine.newHeader;
      } else if (!fileNameChanged(theirs)) {
        // No header or no change in theirs, use ours
        ret.oldFileName = mine.oldFileName;
        ret.newFileName = mine.newFileName;
        ret.oldHeader = mine.oldHeader;
        ret.newHeader = mine.newHeader;
      } else {
        // Both changed... figure it out
        ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
        ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
        ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
        ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
      }
    }

    ret.hunks = [];
    var mineIndex = 0,
        theirsIndex = 0,
        mineOffset = 0,
        theirsOffset = 0;

    while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
      var mineCurrent = mine.hunks[mineIndex] || {
        oldStart: Infinity
      },
          theirsCurrent = theirs.hunks[theirsIndex] || {
        oldStart: Infinity
      };

      if (hunkBefore(mineCurrent, theirsCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
        mineIndex++;
        theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
      } else if (hunkBefore(theirsCurrent, mineCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
        theirsIndex++;
        mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
      } else {
        // Overlap, merge as best we can
        var mergedHunk = {
          oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
          oldLines: 0,
          newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
          newLines: 0,
          lines: []
        };
        mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
        theirsIndex++;
        mineIndex++;
        ret.hunks.push(mergedHunk);
      }
    }

    return ret;
  }

  function loadPatch(param, base) {
    if (typeof param === 'string') {
      if (/^@@/m.test(param) || /^Index:/m.test(param)) {
        return parsePatch(param)[0];
      }

      if (!base) {
        throw new Error('Must provide a base reference or pass in a patch');
      }

      return structuredPatch(undefined, undefined, base, param);
    }

    return param;
  }

  function fileNameChanged(patch) {
    return patch.newFileName && patch.newFileName !== patch.oldFileName;
  }

  function selectField(index, mine, theirs) {
    if (mine === theirs) {
      return mine;
    } else {
      index.conflict = true;
      return {
        mine: mine,
        theirs: theirs
      };
    }
  }

  function hunkBefore(test, check) {
    return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
  }

  function cloneHunk(hunk, offset) {
    return {
      oldStart: hunk.oldStart,
      oldLines: hunk.oldLines,
      newStart: hunk.newStart + offset,
      newLines: hunk.newLines,
      lines: hunk.lines
    };
  }

  function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
    // This will generally result in a conflicted hunk, but there are cases where the context
    // is the only overlap where we can successfully merge the content here.
    var mine = {
      offset: mineOffset,
      lines: mineLines,
      index: 0
    },
        their = {
      offset: theirOffset,
      lines: theirLines,
      index: 0
    }; // Handle any leading content

    insertLeading(hunk, mine, their);
    insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.

    while (mine.index < mine.lines.length && their.index < their.lines.length) {
      var mineCurrent = mine.lines[mine.index],
          theirCurrent = their.lines[their.index];

      if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
        // Both modified ...
        mutualChange(hunk, mine, their);
      } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
        var _hunk$lines;

        // Mine inserted
        (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
      } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
        var _hunk$lines2;

        // Theirs inserted
        (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
      } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
        // Mine removed or edited
        removal(hunk, mine, their);
      } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
        // Their removed or edited
        removal(hunk, their, mine, true);
      } else if (mineCurrent === theirCurrent) {
        // Context identity
        hunk.lines.push(mineCurrent);
        mine.index++;
        their.index++;
      } else {
        // Context mismatch
        conflict(hunk, collectChange(mine), collectChange(their));
      }
    } // Now push anything that may be remaining


    insertTrailing(hunk, mine);
    insertTrailing(hunk, their);
    calcLineCount(hunk);
  }

  function mutualChange(hunk, mine, their) {
    var myChanges = collectChange(mine),
        theirChanges = collectChange(their);

    if (allRemoves(myChanges) && allRemoves(theirChanges)) {
      // Special case for remove changes that are supersets of one another
      if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
        var _hunk$lines3;

        (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));

        return;
      } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
        var _hunk$lines4;

        (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));

        return;
      }
    } else if (arrayEqual(myChanges, theirChanges)) {
      var _hunk$lines5;

      (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));

      return;
    }

    conflict(hunk, myChanges, theirChanges);
  }

  function removal(hunk, mine, their, swap) {
    var myChanges = collectChange(mine),
        theirChanges = collectContext(their, myChanges);

    if (theirChanges.merged) {
      var _hunk$lines6;

      (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
    } else {
      conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
    }
  }

  function conflict(hunk, mine, their) {
    hunk.conflict = true;
    hunk.lines.push({
      conflict: true,
      mine: mine,
      theirs: their
    });
  }

  function insertLeading(hunk, insert, their) {
    while (insert.offset < their.offset && insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
      insert.offset++;
    }
  }

  function insertTrailing(hunk, insert) {
    while (insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
    }
  }

  function collectChange(state) {
    var ret = [],
        operation = state.lines[state.index][0];

    while (state.index < state.lines.length) {
      var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.

      if (operation === '-' && line[0] === '+') {
        operation = '+';
      }

      if (operation === line[0]) {
        ret.push(line);
        state.index++;
      } else {
        break;
      }
    }

    return ret;
  }

  function collectContext(state, matchChanges) {
    var changes = [],
        merged = [],
        matchIndex = 0,
        contextChanges = false,
        conflicted = false;

    while (matchIndex < matchChanges.length && state.index < state.lines.length) {
      var change = state.lines[state.index],
          match = matchChanges[matchIndex]; // Once we've hit our add, then we are done

      if (match[0] === '+') {
        break;
      }

      contextChanges = contextChanges || change[0] !== ' ';
      merged.push(match);
      matchIndex++; // Consume any additions in the other block as a conflict to attempt
      // to pull in the remaining context after this

      if (change[0] === '+') {
        conflicted = true;

        while (change[0] === '+') {
          changes.push(change);
          change = state.lines[++state.index];
        }
      }

      if (match.substr(1) === change.substr(1)) {
        changes.push(change);
        state.index++;
      } else {
        conflicted = true;
      }
    }

    if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
      conflicted = true;
    }

    if (conflicted) {
      return changes;
    }

    while (matchIndex < matchChanges.length) {
      merged.push(matchChanges[matchIndex++]);
    }

    return {
      merged: merged,
      changes: changes
    };
  }

  function allRemoves(changes) {
    return changes.reduce(function (prev, change) {
      return prev && change[0] === '-';
    }, true);
  }

  function skipRemoveSuperset(state, removeChanges, delta) {
    for (var i = 0; i < delta; i++) {
      var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);

      if (state.lines[state.index + i] !== ' ' + changeContent) {
        return false;
      }
    }

    state.index += delta;
    return true;
  }

  function calcOldNewLineCount(lines) {
    var oldLines = 0;
    var newLines = 0;
    lines.forEach(function (line) {
      if (typeof line !== 'string') {
        var myCount = calcOldNewLineCount(line.mine);
        var theirCount = calcOldNewLineCount(line.theirs);

        if (oldLines !== undefined) {
          if (myCount.oldLines === theirCount.oldLines) {
            oldLines += myCount.oldLines;
          } else {
            oldLines = undefined;
          }
        }

        if (newLines !== undefined) {
          if (myCount.newLines === theirCount.newLines) {
            newLines += myCount.newLines;
          } else {
            newLines = undefined;
          }
        }
      } else {
        if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
          newLines++;
        }

        if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
          oldLines++;
        }
      }
    });
    return {
      oldLines: oldLines,
      newLines: newLines
    };
  }

  // See: http://code.google.com/p/google-diff-match-patch/wiki/API
  function convertChangesToDMP(changes) {
    var ret = [],
        change,
        operation;

    for (var i = 0; i < changes.length; i++) {
      change = changes[i];

      if (change.added) {
        operation = 1;
      } else if (change.removed) {
        operation = -1;
      } else {
        operation = 0;
      }

      ret.push([operation, change.value]);
    }

    return ret;
  }

  function convertChangesToXML(changes) {
    var ret = [];

    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];

      if (change.added) {
        ret.push('<ins>');
      } else if (change.removed) {
        ret.push('<del>');
      }

      ret.push(escapeHTML(change.value));

      if (change.added) {
        ret.push('</ins>');
      } else if (change.removed) {
        ret.push('</del>');
      }
    }

    return ret.join('');
  }

  function escapeHTML(s) {
    var n = s;
    n = n.replace(/&/g, '&amp;');
    n = n.replace(/</g, '&lt;');
    n = n.replace(/>/g, '&gt;');
    n = n.replace(/"/g, '&quot;');
    return n;
  }

  /* See LICENSE file for terms of use */

  exports.Diff = Diff;
  exports.diffChars = diffChars;
  exports.diffWords = diffWords;
  exports.diffWordsWithSpace = diffWordsWithSpace;
  exports.diffLines = diffLines;
  exports.diffTrimmedLines = diffTrimmedLines;
  exports.diffSentences = diffSentences;
  exports.diffCss = diffCss;
  exports.diffJson = diffJson;
  exports.diffArrays = diffArrays;
  exports.structuredPatch = structuredPatch;
  exports.createTwoFilesPatch = createTwoFilesPatch;
  exports.createPatch = createPatch;
  exports.applyPatch = applyPatch;
  exports.applyPatches = applyPatches;
  exports.parsePatch = parsePatch;
  exports.merge = merge;
  exports.convertChangesToDMP = convertChangesToDMP;
  exports.convertChangesToXML = convertChangesToXML;
  exports.canonicalize = canonicalize;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],83:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],84:[function(require,module,exports){
module.exports = extend;

/*
  var obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}

  var obj = {a: 3, b: 5};
  extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3]}

  extend({a: 4, b: 5}); // {a: 4, b: 5}
  extend({a: 4, b: 5}, 3); {a: 4, b: 5}
  extend({a: 4, b: 5}, true); {a: 4, b: 5}
  extend('hello', {a: 4, b: 5}); // throws
  extend(3, {a: 4, b: 5}); // throws
*/

function extend(/* [deep], obj1, obj2, [objn] */) {
  var args = [].slice.call(arguments);
  var deep = false;
  if (typeof args[0] == 'boolean') {
    deep = args.shift();
  }
  var result = args[0];
  if (!result || (typeof result != 'object' && typeof result != 'function')) {
    throw new Error('extendee must be an object');
  }
  var extenders = args.slice(1);
  var len = extenders.length;
  for (var i = 0; i < len; i++) {
    var extender = extenders[i];
    for (var key in extender) {
      if (extender.hasOwnProperty(key)) {
        var value = extender[key];
        if (deep && isCloneable(value)) {
          var base = Array.isArray(value) ? [] : {};
          result[key] = extend(true, result.hasOwnProperty(key) ? result[key] : base, value);
        } else {
          result[key] = value;
        }
      }
    }
  }
  return result;
}

function isCloneable(obj) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}

},{}],85:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{}],86:[function(require,module,exports){
"use strict";

var globalObject = require("@sinonjs/commons").global;

// eslint-disable-next-line complexity
function withGlobal(_global) {
    var userAgent = _global.navigator && _global.navigator.userAgent;
    var isRunningInIE = userAgent && userAgent.indexOf("MSIE ") > -1;
    var maxTimeout = Math.pow(2, 31) - 1; //see https://heycam.github.io/webidl/#abstract-opdef-converttoint
    var NOOP = function() {
        return undefined;
    };
    var NOOP_ARRAY = function() {
        return [];
    };
    var timeoutResult = _global.setTimeout(NOOP, 0);
    var addTimerReturnsObject = typeof timeoutResult === "object";
    var hrtimePresent =
        _global.process && typeof _global.process.hrtime === "function";
    var hrtimeBigintPresent =
        hrtimePresent && typeof _global.process.hrtime.bigint === "function";
    var nextTickPresent =
        _global.process && typeof _global.process.nextTick === "function";
    var performancePresent =
        _global.performance && typeof _global.performance.now === "function";
    var hasPerformancePrototype =
        _global.Performance &&
        (typeof _global.Performance).match(/^(function|object)$/);
    var queueMicrotaskPresent = _global.hasOwnProperty("queueMicrotask");
    var requestAnimationFramePresent =
        _global.requestAnimationFrame &&
        typeof _global.requestAnimationFrame === "function";
    var cancelAnimationFramePresent =
        _global.cancelAnimationFrame &&
        typeof _global.cancelAnimationFrame === "function";
    var requestIdleCallbackPresent =
        _global.requestIdleCallback &&
        typeof _global.requestIdleCallback === "function";
    var cancelIdleCallbackPresent =
        _global.cancelIdleCallback &&
        typeof _global.cancelIdleCallback === "function";
    var setImmediatePresent =
        _global.setImmediate && typeof _global.setImmediate === "function";

    // Make properties writable in IE, as per
    // http://www.adequatelygood.com/Replacing-setTimeout-Globally.html
    /* eslint-disable no-self-assign */
    if (isRunningInIE) {
        _global.setTimeout = _global.setTimeout;
        _global.clearTimeout = _global.clearTimeout;
        _global.setInterval = _global.setInterval;
        _global.clearInterval = _global.clearInterval;
        _global.Date = _global.Date;
    }

    // setImmediate is not a standard function
    // avoid adding the prop to the window object if not present
    if (setImmediatePresent) {
        _global.setImmediate = _global.setImmediate;
        _global.clearImmediate = _global.clearImmediate;
    }
    /* eslint-enable no-self-assign */

    _global.clearTimeout(timeoutResult);

    var NativeDate = _global.Date;
    var uniqueTimerId = 1;

    function isNumberFinite(num) {
        if (Number.isFinite) {
            return Number.isFinite(num);
        }

        if (typeof num !== "number") {
            return false;
        }

        return isFinite(num);
    }

    /**
     * Parse strings like "01:10:00" (meaning 1 hour, 10 minutes, 0 seconds) into
     * number of milliseconds. This is used to support human-readable strings passed
     * to clock.tick()
     */
    function parseTime(str) {
        if (!str) {
            return 0;
        }

        var strings = str.split(":");
        var l = strings.length;
        var i = l;
        var ms = 0;
        var parsed;

        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
            throw new Error(
                "tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits"
            );
        }

        while (i--) {
            parsed = parseInt(strings[i], 10);

            if (parsed >= 60) {
                throw new Error("Invalid time " + str);
            }

            ms += parsed * Math.pow(60, l - i - 1);
        }

        return ms * 1000;
    }

    /**
     * Get the decimal part of the millisecond value as nanoseconds
     *
     * @param {Number} msFloat the number of milliseconds
     * @returns {Number} an integer number of nanoseconds in the range [0,1e6)
     *
     * Example: nanoRemainer(123.456789) -> 456789
     */
    function nanoRemainder(msFloat) {
        var modulo = 1e6;
        var remainder = (msFloat * 1e6) % modulo;
        var positiveRemainder = remainder < 0 ? remainder + modulo : remainder;

        return Math.floor(positiveRemainder);
    }

    /**
     * Used to grok the `now` parameter to createClock.
     * @param epoch {Date|number} the system time
     */
    function getEpoch(epoch) {
        if (!epoch) {
            return 0;
        }
        if (typeof epoch.getTime === "function") {
            return epoch.getTime();
        }
        if (typeof epoch === "number") {
            return epoch;
        }
        throw new TypeError("now should be milliseconds since UNIX epoch");
    }

    function inRange(from, to, timer) {
        return timer && timer.callAt >= from && timer.callAt <= to;
    }

    function mirrorDateProperties(target, source) {
        var prop;
        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }

        // set special now implementation
        if (source.now) {
            target.now = function now() {
                return target.clock.now;
            };
        } else {
            delete target.now;
        }

        // set special toSource implementation
        if (source.toSource) {
            target.toSource = function toSource() {
                return source.toSource();
            };
        } else {
            delete target.toSource;
        }

        // set special toString implementation
        target.toString = function toString() {
            return source.toString();
        };

        target.prototype = source.prototype;
        target.parse = source.parse;
        target.UTC = source.UTC;
        target.prototype.toUTCString = source.prototype.toUTCString;

        return target;
    }

    function createDate() {
        function ClockDate(year, month, date, hour, minute, second, ms) {
            // the Date constructor called as a function, ref Ecma-262 Edition 5.1, section 15.9.2.
            // This remains so in the 10th edition of 2019 as well.
            if (!(this instanceof ClockDate)) {
                return new NativeDate(ClockDate.clock.now).toString();
            }

            // if Date is called as a constructor with 'new' keyword
            // Defensive and verbose to avoid potential harm in passing
            // explicit undefined when user does not pass argument
            switch (arguments.length) {
                case 0:
                    return new NativeDate(ClockDate.clock.now);
                case 1:
                    return new NativeDate(year);
                case 2:
                    return new NativeDate(year, month);
                case 3:
                    return new NativeDate(year, month, date);
                case 4:
                    return new NativeDate(year, month, date, hour);
                case 5:
                    return new NativeDate(year, month, date, hour, minute);
                case 6:
                    return new NativeDate(
                        year,
                        month,
                        date,
                        hour,
                        minute,
                        second
                    );
                default:
                    return new NativeDate(
                        year,
                        month,
                        date,
                        hour,
                        minute,
                        second,
                        ms
                    );
            }
        }

        return mirrorDateProperties(ClockDate, NativeDate);
    }

    function enqueueJob(clock, job) {
        // enqueues a microtick-deferred task - ecma262/#sec-enqueuejob
        if (!clock.jobs) {
            clock.jobs = [];
        }
        clock.jobs.push(job);
    }

    function runJobs(clock) {
        // runs all microtick-deferred tasks - ecma262/#sec-runjobs
        if (!clock.jobs) {
            return;
        }
        for (var i = 0; i < clock.jobs.length; i++) {
            var job = clock.jobs[i];
            job.func.apply(null, job.args);
            if (clock.loopLimit && i > clock.loopLimit) {
                throw new Error(
                    "Aborting after running " +
                        clock.loopLimit +
                        " timers, assuming an infinite loop!"
                );
            }
        }
        clock.jobs = [];
    }

    function addTimer(clock, timer) {
        if (timer.func === undefined) {
            throw new Error("Callback must be provided to timer calls");
        }

        timer.type = timer.immediate ? "Immediate" : "Timeout";

        if (timer.hasOwnProperty("delay")) {
            if (!isNumberFinite(timer.delay)) {
                timer.delay = 0;
            }
            timer.delay = timer.delay > maxTimeout ? 1 : timer.delay;
            timer.delay = Math.max(0, timer.delay);
        }

        if (timer.hasOwnProperty("interval")) {
            timer.type = "Interval";
            timer.interval = timer.interval > maxTimeout ? 1 : timer.interval;
        }

        if (timer.hasOwnProperty("animation")) {
            timer.type = "AnimationFrame";
            timer.animation = true;
        }

        if (!clock.timers) {
            clock.timers = {};
        }

        timer.id = uniqueTimerId++;
        timer.createdAt = clock.now;
        timer.callAt =
            clock.now + (parseInt(timer.delay) || (clock.duringTick ? 1 : 0));

        clock.timers[timer.id] = timer;

        if (addTimerReturnsObject) {
            var res = {
                id: timer.id,
                ref: function() {
                    return res;
                },
                unref: function() {
                    return res;
                },
                refresh: function() {
                    return res;
                }
            };
            return res;
        }

        return timer.id;
    }

    /* eslint consistent-return: "off" */
    function compareTimers(a, b) {
        // Sort first by absolute timing
        if (a.callAt < b.callAt) {
            return -1;
        }
        if (a.callAt > b.callAt) {
            return 1;
        }

        // Sort next by immediate, immediate timers take precedence
        if (a.immediate && !b.immediate) {
            return -1;
        }
        if (!a.immediate && b.immediate) {
            return 1;
        }

        // Sort next by creation time, earlier-created timers take precedence
        if (a.createdAt < b.createdAt) {
            return -1;
        }
        if (a.createdAt > b.createdAt) {
            return 1;
        }

        // Sort next by id, lower-id timers take precedence
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }

        // As timer ids are unique, no fallback `0` is necessary
    }

    function firstTimerInRange(clock, from, to) {
        var timers = clock.timers;
        var timer = null;
        var id, isInRange;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                isInRange = inRange(from, to, timers[id]);

                if (
                    isInRange &&
                    (!timer || compareTimers(timer, timers[id]) === 1)
                ) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    function firstTimer(clock) {
        var timers = clock.timers;
        var timer = null;
        var id;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                if (!timer || compareTimers(timer, timers[id]) === 1) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    function lastTimer(clock) {
        var timers = clock.timers;
        var timer = null;
        var id;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                if (!timer || compareTimers(timer, timers[id]) === -1) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    function callTimer(clock, timer) {
        if (typeof timer.interval === "number") {
            clock.timers[timer.id].callAt += timer.interval;
        } else {
            delete clock.timers[timer.id];
        }

        if (typeof timer.func === "function") {
            timer.func.apply(null, timer.args);
        } else {
            /* eslint no-eval: "off" */
            eval(timer.func);
        }
    }

    function clearTimer(clock, timerId, ttype) {
        if (!timerId) {
            // null appears to be allowed in most browsers, and appears to be
            // relied upon by some libraries, like Bootstrap carousel
            return;
        }

        if (!clock.timers) {
            clock.timers = {};
        }

        // in Node, timerId is an object with .ref()/.unref(), and
        // its .id field is the actual timer id.
        var id = typeof timerId === "object" ? timerId.id : timerId;

        if (clock.timers.hasOwnProperty(id)) {
            // check that the ID matches a timer of the correct type
            var timer = clock.timers[id];
            if (timer.type === ttype) {
                delete clock.timers[id];
            } else {
                var clear =
                    ttype === "AnimationFrame"
                        ? "cancelAnimationFrame"
                        : "clear" + ttype;
                var schedule =
                    timer.type === "AnimationFrame"
                        ? "requestAnimationFrame"
                        : "set" + timer.type;
                throw new Error(
                    "Cannot clear timer: timer created with " +
                        schedule +
                        "() but cleared with " +
                        clear +
                        "()"
                );
            }
        }
    }

    function uninstall(clock, target, config) {
        var method, i, l;
        var installedHrTime = "_hrtime";
        var installedNextTick = "_nextTick";

        for (i = 0, l = clock.methods.length; i < l; i++) {
            method = clock.methods[i];
            if (method === "hrtime" && target.process) {
                target.process.hrtime = clock[installedHrTime];
            } else if (method === "nextTick" && target.process) {
                target.process.nextTick = clock[installedNextTick];
            } else if (method === "performance") {
                var originalPerfDescriptor = Object.getOwnPropertyDescriptor(
                    clock,
                    "_" + method
                );
                if (
                    originalPerfDescriptor &&
                    originalPerfDescriptor.get &&
                    !originalPerfDescriptor.set
                ) {
                    Object.defineProperty(
                        target,
                        method,
                        originalPerfDescriptor
                    );
                } else if (originalPerfDescriptor.configurable) {
                    target[method] = clock["_" + method];
                }
            } else {
                if (target[method] && target[method].hadOwnProperty) {
                    target[method] = clock["_" + method];
                    if (
                        method === "clearInterval" &&
                        config.shouldAdvanceTime === true
                    ) {
                        target[method](clock.attachedInterval);
                    }
                } else {
                    try {
                        delete target[method];
                    } catch (ignore) {
                        /* eslint no-empty: "off" */
                    }
                }
            }
        }

        // Prevent multiple executions which will completely remove these props
        clock.methods = [];

        // return pending timers, to enable checking what timers remained on uninstall
        if (!clock.timers) {
            return [];
        }
        return Object.keys(clock.timers).map(function mapper(key) {
            return clock.timers[key];
        });
    }

    function hijackMethod(target, method, clock) {
        var prop;
        clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(
            target,
            method
        );
        clock["_" + method] = target[method];

        if (method === "Date") {
            var date = mirrorDateProperties(clock[method], target[method]);
            target[method] = date;
        } else if (method === "performance") {
            var originalPerfDescriptor = Object.getOwnPropertyDescriptor(
                target,
                method
            );
            // JSDOM has a read only performance field so we have to save/copy it differently
            if (
                originalPerfDescriptor &&
                originalPerfDescriptor.get &&
                !originalPerfDescriptor.set
            ) {
                Object.defineProperty(
                    clock,
                    "_" + method,
                    originalPerfDescriptor
                );

                var perfDescriptor = Object.getOwnPropertyDescriptor(
                    clock,
                    method
                );
                Object.defineProperty(target, method, perfDescriptor);
            } else {
                target[method] = clock[method];
            }
        } else {
            target[method] = function() {
                return clock[method].apply(clock, arguments);
            };

            for (prop in clock[method]) {
                if (clock[method].hasOwnProperty(prop)) {
                    target[method][prop] = clock[method][prop];
                }
            }
        }

        target[method].clock = clock;
    }

    function doIntervalTick(clock, advanceTimeDelta) {
        clock.tick(advanceTimeDelta);
    }

    var timers = {
        setTimeout: _global.setTimeout,
        clearTimeout: _global.clearTimeout,
        setInterval: _global.setInterval,
        clearInterval: _global.clearInterval,
        Date: _global.Date
    };

    if (setImmediatePresent) {
        timers.setImmediate = _global.setImmediate;
        timers.clearImmediate = _global.clearImmediate;
    }

    if (hrtimePresent) {
        timers.hrtime = _global.process.hrtime;
    }

    if (nextTickPresent) {
        timers.nextTick = _global.process.nextTick;
    }

    if (performancePresent) {
        timers.performance = _global.performance;
    }

    if (requestAnimationFramePresent) {
        timers.requestAnimationFrame = _global.requestAnimationFrame;
    }

    if (queueMicrotaskPresent) {
        timers.queueMicrotask = true;
    }

    if (cancelAnimationFramePresent) {
        timers.cancelAnimationFrame = _global.cancelAnimationFrame;
    }

    if (requestIdleCallbackPresent) {
        timers.requestIdleCallback = _global.requestIdleCallback;
    }

    if (cancelIdleCallbackPresent) {
        timers.cancelIdleCallback = _global.cancelIdleCallback;
    }

    var keys =
        Object.keys ||
        function(obj) {
            var ks = [];
            var key;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ks.push(key);
                }
            }

            return ks;
        };

    var originalSetTimeout = _global.setImmediate || _global.setTimeout;

    /**
     * @param start {Date|number} the system time - non-integer values are floored
     * @param loopLimit {number}  maximum number of timers that will be run when calling runAll()
     */
    function createClock(start, loopLimit) {
        // eslint-disable-next-line no-param-reassign
        start = Math.floor(getEpoch(start));
        // eslint-disable-next-line no-param-reassign
        loopLimit = loopLimit || 1000;
        var nanos = 0;
        var adjustedSystemTime = [0, 0]; // [millis, nanoremainder]

        if (NativeDate === undefined) {
            throw new Error(
                "The global scope doesn't have a `Date` object" +
                    " (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)"
            );
        }

        var clock = {
            now: start,
            timeouts: {},
            Date: createDate(),
            loopLimit: loopLimit
        };

        clock.Date.clock = clock;

        function getTimeToNextFrame() {
            return 16 - ((clock.now - start) % 16);
        }

        function hrtime(prev) {
            var millisSinceStart = clock.now - adjustedSystemTime[0] - start;
            var secsSinceStart = Math.floor(millisSinceStart / 1000);
            var remainderInNanos =
                (millisSinceStart - secsSinceStart * 1e3) * 1e6 +
                nanos -
                adjustedSystemTime[1];

            if (Array.isArray(prev)) {
                if (prev[1] > 1e9) {
                    throw new TypeError(
                        "Number of nanoseconds can't exceed a billion"
                    );
                }

                var oldSecs = prev[0];
                var nanoDiff = remainderInNanos - prev[1];
                var secDiff = secsSinceStart - oldSecs;

                if (nanoDiff < 0) {
                    nanoDiff += 1e9;
                    secDiff -= 1;
                }

                return [secDiff, nanoDiff];
            }
            return [secsSinceStart, remainderInNanos];
        }

        if (hrtimeBigintPresent) {
            hrtime.bigint = function() {
                var parts = hrtime();
                return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]); // eslint-disable-line
            };
        }

        clock.requestIdleCallback = function requestIdleCallback(
            func,
            timeout
        ) {
            var timeToNextIdlePeriod = 0;

            if (clock.countTimers() > 0) {
                timeToNextIdlePeriod = 50; // const for now
            }

            var result = addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay:
                    typeof timeout === "undefined"
                        ? timeToNextIdlePeriod
                        : Math.min(timeout, timeToNextIdlePeriod)
            });

            return result.id || result;
        };

        clock.cancelIdleCallback = function cancelIdleCallback(timerId) {
            return clearTimer(clock, timerId, "Timeout");
        };

        clock.setTimeout = function setTimeout(func, timeout) {
            return addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay: timeout
            });
        };

        clock.clearTimeout = function clearTimeout(timerId) {
            return clearTimer(clock, timerId, "Timeout");
        };

        clock.nextTick = function nextTick(func) {
            return enqueueJob(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        clock.queueMicrotask = function queueMicrotask(func) {
            return clock.nextTick(func); // explicitly drop additional arguments
        };

        clock.setInterval = function setInterval(func, timeout) {
            // eslint-disable-next-line no-param-reassign
            timeout = parseInt(timeout, 10);
            return addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay: timeout,
                interval: timeout
            });
        };

        clock.clearInterval = function clearInterval(timerId) {
            return clearTimer(clock, timerId, "Interval");
        };

        if (setImmediatePresent) {
            clock.setImmediate = function setImmediate(func) {
                return addTimer(clock, {
                    func: func,
                    args: Array.prototype.slice.call(arguments, 1),
                    immediate: true
                });
            };

            clock.clearImmediate = function clearImmediate(timerId) {
                return clearTimer(clock, timerId, "Immediate");
            };
        }

        clock.countTimers = function countTimers() {
            return (
                Object.keys(clock.timers || {}).length +
                (clock.jobs || []).length
            );
        };

        clock.requestAnimationFrame = function requestAnimationFrame(func) {
            var result = addTimer(clock, {
                func: func,
                delay: getTimeToNextFrame(),
                args: [clock.now + getTimeToNextFrame()],
                animation: true
            });

            return result.id || result;
        };

        clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
            return clearTimer(clock, timerId, "AnimationFrame");
        };

        clock.runMicrotasks = function runMicrotasks() {
            runJobs(clock);
        };

        function doTick(tickValue, isAsync, resolve, reject) {
            var msFloat =
                typeof tickValue === "number"
                    ? tickValue
                    : parseTime(tickValue);
            var ms = Math.floor(msFloat);
            var remainder = nanoRemainder(msFloat);
            var nanosTotal = nanos + remainder;
            var tickTo = clock.now + ms;

            if (msFloat < 0) {
                throw new TypeError("Negative ticks are not supported");
            }

            // adjust for positive overflow
            if (nanosTotal >= 1e6) {
                tickTo += 1;
                nanosTotal -= 1e6;
            }

            nanos = nanosTotal;
            var tickFrom = clock.now;
            var previous = clock.now;
            var timer,
                firstException,
                oldNow,
                nextPromiseTick,
                compensationCheck,
                postTimerCall;

            clock.duringTick = true;

            // perform microtasks
            oldNow = clock.now;
            runJobs(clock);
            if (oldNow !== clock.now) {
                // compensate for any setSystemTime() call during microtask callback
                tickFrom += clock.now - oldNow;
                tickTo += clock.now - oldNow;
            }

            function doTickInner() {
                // perform each timer in the requested range
                timer = firstTimerInRange(clock, tickFrom, tickTo);
                // eslint-disable-next-line no-unmodified-loop-condition
                while (timer && tickFrom <= tickTo) {
                    if (clock.timers[timer.id]) {
                        tickFrom = timer.callAt;
                        clock.now = timer.callAt;
                        oldNow = clock.now;
                        try {
                            runJobs(clock);
                            callTimer(clock, timer);
                        } catch (e) {
                            firstException = firstException || e;
                        }

                        if (isAsync) {
                            // finish up after native setImmediate callback to allow
                            // all native es6 promises to process their callbacks after
                            // each timer fires.
                            originalSetTimeout(nextPromiseTick);
                            return;
                        }

                        compensationCheck();
                    }

                    postTimerCall();
                }

                // perform process.nextTick()s again
                oldNow = clock.now;
                runJobs(clock);
                if (oldNow !== clock.now) {
                    // compensate for any setSystemTime() call during process.nextTick() callback
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                }
                clock.duringTick = false;

                // corner case: during runJobs new timers were scheduled which could be in the range [clock.now, tickTo]
                timer = firstTimerInRange(clock, tickFrom, tickTo);
                if (timer) {
                    try {
                        clock.tick(tickTo - clock.now); // do it all again - for the remainder of the requested range
                    } catch (e) {
                        firstException = firstException || e;
                    }
                } else {
                    // no timers remaining in the requested range: move the clock all the way to the end
                    clock.now = tickTo;

                    // update nanos
                    nanos = nanosTotal;
                }
                if (firstException) {
                    throw firstException;
                }

                if (isAsync) {
                    resolve(clock.now);
                } else {
                    return clock.now;
                }
            }

            nextPromiseTick =
                isAsync &&
                function() {
                    try {
                        compensationCheck();
                        postTimerCall();
                        doTickInner();
                    } catch (e) {
                        reject(e);
                    }
                };

            compensationCheck = function() {
                // compensate for any setSystemTime() call during timer callback
                if (oldNow !== clock.now) {
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                    previous += clock.now - oldNow;
                }
            };

            postTimerCall = function() {
                timer = firstTimerInRange(clock, previous, tickTo);
                previous = tickFrom;
            };

            return doTickInner();
        }

        /**
         * @param {tickValue} {String|Number} number of milliseconds or a human-readable value like "01:11:15"
         */
        clock.tick = function tick(tickValue) {
            return doTick(tickValue, false);
        };

        if (typeof _global.Promise !== "undefined") {
            clock.tickAsync = function tickAsync(ms) {
                return new _global.Promise(function(resolve, reject) {
                    originalSetTimeout(function() {
                        try {
                            doTick(ms, true, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.next = function next() {
            runJobs(clock);
            var timer = firstTimer(clock);
            if (!timer) {
                return clock.now;
            }

            clock.duringTick = true;
            try {
                clock.now = timer.callAt;
                callTimer(clock, timer);
                runJobs(clock);
                return clock.now;
            } finally {
                clock.duringTick = false;
            }
        };

        if (typeof _global.Promise !== "undefined") {
            clock.nextAsync = function nextAsync() {
                return new _global.Promise(function(resolve, reject) {
                    originalSetTimeout(function() {
                        try {
                            var timer = firstTimer(clock);
                            if (!timer) {
                                resolve(clock.now);
                                return;
                            }

                            var err;
                            clock.duringTick = true;
                            clock.now = timer.callAt;
                            try {
                                callTimer(clock, timer);
                            } catch (e) {
                                err = e;
                            }
                            clock.duringTick = false;

                            originalSetTimeout(function() {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(clock.now);
                                }
                            });
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.runAll = function runAll() {
            var numTimers, i;
            runJobs(clock);
            for (i = 0; i < clock.loopLimit; i++) {
                if (!clock.timers) {
                    return clock.now;
                }

                numTimers = keys(clock.timers).length;
                if (numTimers === 0) {
                    return clock.now;
                }

                clock.next();
            }

            throw new Error(
                "Aborting after running " +
                    clock.loopLimit +
                    " timers, assuming an infinite loop!"
            );
        };

        clock.runToFrame = function runToFrame() {
            return clock.tick(getTimeToNextFrame());
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runAllAsync = function runAllAsync() {
                return new _global.Promise(function(resolve, reject) {
                    var i = 0;
                    function doRun() {
                        originalSetTimeout(function() {
                            try {
                                var numTimers;
                                if (i < clock.loopLimit) {
                                    if (!clock.timers) {
                                        resolve(clock.now);
                                        return;
                                    }

                                    numTimers = Object.keys(clock.timers)
                                        .length;
                                    if (numTimers === 0) {
                                        resolve(clock.now);
                                        return;
                                    }

                                    clock.next();

                                    i++;

                                    doRun();
                                    return;
                                }

                                reject(
                                    new Error(
                                        "Aborting after running " +
                                            clock.loopLimit +
                                            " timers, assuming an infinite loop!"
                                    )
                                );
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }
                    doRun();
                });
            };
        }

        clock.runToLast = function runToLast() {
            var timer = lastTimer(clock);
            if (!timer) {
                runJobs(clock);
                return clock.now;
            }

            return clock.tick(timer.callAt - clock.now);
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runToLastAsync = function runToLastAsync() {
                return new _global.Promise(function(resolve, reject) {
                    originalSetTimeout(function() {
                        try {
                            var timer = lastTimer(clock);
                            if (!timer) {
                                resolve(clock.now);
                            }

                            resolve(clock.tickAsync(timer.callAt));
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.reset = function reset() {
            nanos = 0;
            clock.timers = {};
            clock.jobs = [];
            clock.now = start;
        };

        clock.setSystemTime = function setSystemTime(systemTime) {
            // determine time difference
            var newNow = getEpoch(systemTime);
            var difference = newNow - clock.now;
            var id, timer;

            adjustedSystemTime[0] = adjustedSystemTime[0] + difference;
            adjustedSystemTime[1] = adjustedSystemTime[1] + nanos;
            // update 'system clock'
            clock.now = newNow;
            nanos = 0;

            // update timers and intervals to keep them stable
            for (id in clock.timers) {
                if (clock.timers.hasOwnProperty(id)) {
                    timer = clock.timers[id];
                    timer.createdAt += difference;
                    timer.callAt += difference;
                }
            }
        };

        if (performancePresent) {
            clock.performance = Object.create(null);

            if (hasPerformancePrototype) {
                var proto = _global.Performance.prototype;

                Object.getOwnPropertyNames(proto).forEach(function(name) {
                    if (name.indexOf("getEntries") === 0) {
                        // match expected return type for getEntries functions
                        clock.performance[name] = NOOP_ARRAY;
                    } else {
                        clock.performance[name] = NOOP;
                    }
                });
            }

            clock.performance.now = function lolexNow() {
                var hrt = hrtime();
                var millis = hrt[0] * 1000 + hrt[1] / 1e6;
                return millis;
            };
        }

        if (hrtimePresent) {
            clock.hrtime = hrtime;
        }

        return clock;
    }

    /**
     * @param config {Object} optional config
     * @param config.target {Object} the target to install timers in (default `window`)
     * @param config.now {number|Date}  a number (in milliseconds) or a Date object (default epoch)
     * @param config.toFake {string[]} names of the methods that should be faked.
     * @param config.loopLimit {number} the maximum number of timers that will be run when calling runAll()
     * @param config.shouldAdvanceTime {Boolean} tells lolex to increment mocked time automatically (default false)
     * @param config.advanceTimeDelta {Number} increment mocked time every <<advanceTimeDelta>> ms (default: 20ms)
     */
    // eslint-disable-next-line complexity
    function install(config) {
        if (
            arguments.length > 1 ||
            config instanceof Date ||
            Array.isArray(config) ||
            typeof config === "number"
        ) {
            throw new TypeError(
                "lolex.install called with " +
                    String(config) +
                    " lolex 2.0+ requires an object parameter - see https://github.com/sinonjs/lolex"
            );
        }

        // eslint-disable-next-line no-param-reassign
        config = typeof config !== "undefined" ? config : {};
        config.shouldAdvanceTime = config.shouldAdvanceTime || false;
        config.advanceTimeDelta = config.advanceTimeDelta || 20;

        var i, l;
        var target = config.target || _global;
        var clock = createClock(config.now, config.loopLimit);

        clock.uninstall = function() {
            return uninstall(clock, target, config);
        };

        clock.methods = config.toFake || [];

        if (clock.methods.length === 0) {
            // do not fake nextTick by default - GitHub#126
            clock.methods = keys(timers).filter(function(key) {
                return key !== "nextTick" && key !== "queueMicrotask";
            });
        }

        for (i = 0, l = clock.methods.length; i < l; i++) {
            if (clock.methods[i] === "hrtime") {
                if (
                    target.process &&
                    typeof target.process.hrtime === "function"
                ) {
                    hijackMethod(target.process, clock.methods[i], clock);
                }
            } else if (clock.methods[i] === "nextTick") {
                if (
                    target.process &&
                    typeof target.process.nextTick === "function"
                ) {
                    hijackMethod(target.process, clock.methods[i], clock);
                }
            } else {
                if (
                    clock.methods[i] === "setInterval" &&
                    config.shouldAdvanceTime === true
                ) {
                    var intervalTick = doIntervalTick.bind(
                        null,
                        clock,
                        config.advanceTimeDelta
                    );
                    var intervalId = target[clock.methods[i]](
                        intervalTick,
                        config.advanceTimeDelta
                    );
                    clock.attachedInterval = intervalId;
                }
                hijackMethod(target, clock.methods[i], clock);
            }
        }

        return clock;
    }

    return {
        timers: timers,
        createClock: createClock,
        install: install,
        withGlobal: withGlobal
    };
}

var defaultImplementation = withGlobal(globalObject);

exports.timers = defaultImplementation.timers;
exports.createClock = defaultImplementation.createClock;
exports.install = defaultImplementation.install;
exports.withGlobal = withGlobal;

},{"@sinonjs/commons":44}],87:[function(require,module,exports){
"use strict";

// cache a reference to setTimeout, so that our reference won't be stubbed out
// when using fake timers and errors will still get logged
// https://github.com/cjohansen/Sinon.JS/issues/381
var realSetTimeout = setTimeout;

function configureLogger(config) {
    config = config || {};
    // Function which prints errors.
    if (!config.hasOwnProperty("logger")) {
        config.logger = function () { };
    }
    // When set to true, any errors logged will be thrown immediately;
    // If set to false, the errors will be thrown in separate execution frame.
    if (!config.hasOwnProperty("useImmediateExceptions")) {
        config.useImmediateExceptions = true;
    }
    // wrap realSetTimeout with something we can stub in tests
    if (!config.hasOwnProperty("setTimeout")) {
        config.setTimeout = realSetTimeout;
    }

    return function logError(label, e) {
        var msg = label + " threw exception: ";
        var err = { name: e.name || label, message: e.message || e.toString(), stack: e.stack };

        function throwLoggedError() {
            err.message = msg + err.message;
            throw err;
        }

        config.logger(msg + "[" + err.name + "] " + err.message);

        if (err.stack) {
            config.logger(err.stack);
        }

        if (config.useImmediateExceptions) {
            throwLoggedError();
        } else {
            config.setTimeout(throwLoggedError, 0);
        }
    };
}

module.exports = configureLogger;

},{}],88:[function(require,module,exports){
"use strict";

var Event = require("./event");

function CustomEvent(type, customData, target) {
    this.initEvent(type, false, false, target);
    this.detail = customData.detail || null;
}

CustomEvent.prototype = new Event();

CustomEvent.prototype.constructor = CustomEvent;

module.exports = CustomEvent;

},{"./event":90}],89:[function(require,module,exports){
"use strict";

function flattenOptions(options) {
    if (options !== Object(options)) {
        return {
            capture: Boolean(options),
            once: false,
            passive: false
        };
    }
    return {
        capture: Boolean(options.capture),
        once: Boolean(options.once),
        passive: Boolean(options.passive)
    };
}
function not(fn) {
    return function () {
        return !fn.apply(this, arguments);
    };
}
function hasListenerFilter(listener, capture) {
    return function (listenerSpec) {
        return listenerSpec.capture === capture
            && listenerSpec.listener === listener;
    };
}

var EventTarget = {
    // https://dom.spec.whatwg.org/#dom-eventtarget-addeventlistener
    addEventListener: function addEventListener(event, listener, providedOptions) {
        // 3. Let capture, passive, and once be the result of flattening more options.
        // Flatten property before executing step 2,
        // feture detection is usually based on registering handler with options object,
        // that has getter defined
        // addEventListener("load", () => {}, {
        //    get once() { supportsOnce = true; }
        // });
        var options = flattenOptions(providedOptions);

        // 2. If callback is null, then return.
        if (listener == null) {
            return;
        }

        this.eventListeners = this.eventListeners || {};
        this.eventListeners[event] = this.eventListeners[event] || [];

        // 4. If context object’s associated list of event listener
        //    does not contain an event listener whose type is type,
        //    callback is callback, and capture is capture, then append
        //    a new event listener to it, whose type is type, callback is
        //    callback, capture is capture, passive is passive, and once is once.
        if (!this.eventListeners[event].some(hasListenerFilter(listener, options.capture))) {
            this.eventListeners[event].push({
                listener: listener,
                capture: options.capture,
                once: options.once
            });
        }
    },

    // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
    removeEventListener: function removeEventListener(event, listener, providedOptions) {
        if (!this.eventListeners || !this.eventListeners[event]) {
            return;
        }

        // 2. Let capture be the result of flattening options.
        var options = flattenOptions(providedOptions);

        // 3. If there is an event listener in the associated list of
        //    event listeners whose type is type, callback is callback,
        //    and capture is capture, then set that event listener’s
        //    removed to true and remove it from the associated list of event listeners.
        this.eventListeners[event] = this.eventListeners[event]
            .filter(not(hasListenerFilter(listener, options.capture)));
    },

    dispatchEvent: function dispatchEvent(event) {
        if (!this.eventListeners || !this.eventListeners[event.type]) {
            return Boolean(event.defaultPrevented);
        }

        var self = this;
        var type = event.type;
        var listeners = self.eventListeners[type];

        // Remove listeners, that should be dispatched once
        // before running dispatch loop to avoid nested dispatch issues
        self.eventListeners[type] = listeners.filter(function (listenerSpec) {
            return !listenerSpec.once;
        });
        listeners.forEach(function (listenerSpec) {
            var listener = listenerSpec.listener;
            if (typeof listener === "function") {
                listener.call(self, event);
            } else {
                listener.handleEvent(event);
            }
        });

        return Boolean(event.defaultPrevented);
    }
};

module.exports = EventTarget;

},{}],90:[function(require,module,exports){
"use strict";

function Event(type, bubbles, cancelable, target) {
    this.initEvent(type, bubbles, cancelable, target);
}

Event.prototype = {
    initEvent: function (type, bubbles, cancelable, target) {
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.target = target;
        this.currentTarget = target;
    },

    stopPropagation: function () {},

    preventDefault: function () {
        this.defaultPrevented = true;
    }
};

module.exports = Event;

},{}],91:[function(require,module,exports){
"use strict";

module.exports = {
    Event: require("./event"),
    ProgressEvent: require("./progress-event"),
    CustomEvent: require("./custom-event"),
    EventTarget: require("./event-target")
};

},{"./custom-event":88,"./event":90,"./event-target":89,"./progress-event":92}],92:[function(require,module,exports){
"use strict";

var Event = require("./event");

function ProgressEvent(type, progressEventRaw, target) {
    this.initEvent(type, false, false, target);
    this.loaded = typeof progressEventRaw.loaded === "number" ? progressEventRaw.loaded : null;
    this.total = typeof progressEventRaw.total === "number" ? progressEventRaw.total : null;
    this.lengthComputable = !!progressEventRaw.total;
}

ProgressEvent.prototype = new Event();

ProgressEvent.prototype.constructor = ProgressEvent;

module.exports = ProgressEvent;

},{"./event":90}],93:[function(require,module,exports){
"use strict";

var lolex = require("lolex");
var fakeServer = require("./index");

function Server() {}
Server.prototype = fakeServer;

var fakeServerWithClock = new Server();

fakeServerWithClock.addRequest = function addRequest(xhr) {
    if (xhr.async) {
        if (typeof setTimeout.clock === "object") {
            this.clock = setTimeout.clock;
        } else {
            this.clock = lolex.install();
            this.resetClock = true;
        }

        if (!this.longestTimeout) {
            var clockSetTimeout = this.clock.setTimeout;
            var clockSetInterval = this.clock.setInterval;
            var server = this;

            this.clock.setTimeout = function (fn, timeout) {
                server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);

                return clockSetTimeout.apply(this, arguments);
            };

            this.clock.setInterval = function (fn, timeout) {
                server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);

                return clockSetInterval.apply(this, arguments);
            };
        }
    }

    return fakeServer.addRequest.call(this, xhr);
};

fakeServerWithClock.respond = function respond() {
    var returnVal = fakeServer.respond.apply(this, arguments);

    if (this.clock) {
        this.clock.tick(this.longestTimeout || 0);
        this.longestTimeout = 0;

        if (this.resetClock) {
            this.clock.uninstall();
            this.resetClock = false;
        }
    }

    return returnVal;
};

fakeServerWithClock.restore = function restore() {
    if (this.clock) {
        this.clock.uninstall();
    }

    return fakeServer.restore.apply(this, arguments);
};

module.exports = fakeServerWithClock;

},{"./index":95,"lolex":86}],94:[function(require,module,exports){
"use strict";

var formatio = require("@sinonjs/formatio");

var formatter = formatio.configure({
    quoteStrings: false,
    limitChildrenCount: 250
});

module.exports = function format() {
    return formatter.ascii.apply(formatter, arguments);
};

},{"@sinonjs/formatio":56}],95:[function(require,module,exports){
"use strict";

var fakeXhr = require("../fake-xhr");
var push = [].push;
var format = require("./format");
var configureLogError = require("../configure-logger");
var pathToRegexp = require("path-to-regexp");

var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";

function responseArray(handler) {
    var response = handler;

    if (Object.prototype.toString.call(handler) !== "[object Array]") {
        response = [200, {}, handler];
    }

    if (typeof response[2] !== "string") {
        if (!supportsArrayBuffer) {
            throw new TypeError("Fake server response body should be a string, but was " +
                                typeof response[2]);
        }
        else if (!(response[2] instanceof ArrayBuffer)) {
            throw new TypeError("Fake server response body should be a string or ArrayBuffer, but was " +
                                typeof response[2]);
        }
    }

    return response;
}

function getDefaultWindowLocation() {
    return { "host": "localhost", "protocol": "http" };
}

function getWindowLocation() {
    if (typeof window === "undefined") {
        // Fallback
        return getDefaultWindowLocation();
    }

    if (typeof window.location !== "undefined") {
        // Browsers place location on window
        return window.location;
    }

    if ((typeof window.window !== "undefined") && (typeof window.window.location !== "undefined")) {
        // React Native on Android places location on window.window
        return window.window.location;
    }

    return getDefaultWindowLocation();
}

function matchOne(response, reqMethod, reqUrl) {
    var rmeth = response.method;
    var matchMethod = !rmeth || rmeth.toLowerCase() === reqMethod.toLowerCase();
    var url = response.url;
    var matchUrl = !url || url === reqUrl || (typeof url.test === "function" && url.test(reqUrl));

    return matchMethod && matchUrl;
}

function match(response, request) {
    var wloc = getWindowLocation();

    var rCurrLoc = new RegExp("^" + wloc.protocol + "//" + wloc.host);

    var requestUrl = request.url;

    if (!/^https?:\/\//.test(requestUrl) || rCurrLoc.test(requestUrl)) {
        requestUrl = requestUrl.replace(rCurrLoc, "");
    }

    if (matchOne(response, this.getHTTPMethod(request), requestUrl)) {
        if (typeof response.response === "function") {
            var ru = response.url;
            var args = [request].concat(ru && typeof ru.exec === "function" ? ru.exec(requestUrl).slice(1) : []);
            return response.response.apply(response, args);
        }

        return true;
    }

    return false;
}

function incrementRequestCount() {
    var count = ++this.requestCount;

    this.requested = true;

    this.requestedOnce = count === 1;
    this.requestedTwice = count === 2;
    this.requestedThrice = count === 3;

    this.firstRequest = this.getRequest(0);
    this.secondRequest = this.getRequest(1);
    this.thirdRequest = this.getRequest(2);

    this.lastRequest = this.getRequest(count - 1);
}

var fakeServer = {
    create: function (config) {
        var server = Object.create(this);
        server.configure(config);
        this.xhr = fakeXhr.useFakeXMLHttpRequest();
        server.requests = [];
        server.requestCount = 0;
        server.queue = [];
        server.responses = [];


        this.xhr.onCreate = function (xhrObj) {
            xhrObj.unsafeHeadersEnabled = function () {
                return !(server.unsafeHeadersEnabled === false);
            };
            server.addRequest(xhrObj);
        };

        return server;
    },

    configure: function (config) {
        var self = this;
        var whitelist = {
            "autoRespond": true,
            "autoRespondAfter": true,
            "respondImmediately": true,
            "fakeHTTPMethods": true,
            "logger": true,
            "unsafeHeadersEnabled": true
        };

        config = config || {};

        Object.keys(config).forEach(function (setting) {
            if (setting in whitelist) {
                self[setting] = config[setting];
            }
        });

        self.logError = configureLogError(config);
    },

    addRequest: function addRequest(xhrObj) {
        var server = this;
        push.call(this.requests, xhrObj);

        incrementRequestCount.call(this);

        xhrObj.onSend = function () {
            server.handleRequest(this);

            if (server.respondImmediately) {
                server.respond();
            } else if (server.autoRespond && !server.responding) {
                setTimeout(function () {
                    server.responding = false;
                    server.respond();
                }, server.autoRespondAfter || 10);

                server.responding = true;
            }
        };
    },

    getHTTPMethod: function getHTTPMethod(request) {
        if (this.fakeHTTPMethods && /post/i.test(request.method)) {
            var matches = (request.requestBody || "").match(/_method=([^\b;]+)/);
            return matches ? matches[1] : request.method;
        }

        return request.method;
    },

    handleRequest: function handleRequest(xhr) {
        if (xhr.async) {
            push.call(this.queue, xhr);
        } else {
            this.processRequest(xhr);
        }
    },

    logger: function () {
        // no-op; override via configure()
    },

    logError: configureLogError({}),

    log: function log(response, request) {
        var str;

        str = "Request:\n" + format(request) + "\n\n";
        str += "Response:\n" + format(response) + "\n\n";

        if (typeof this.logger === "function") {
            this.logger(str);
        }
    },

    respondWith: function respondWith(method, url, body) {
        if (arguments.length === 1 && typeof method !== "function") {
            this.response = responseArray(method);
            return;
        }

        if (arguments.length === 1) {
            body = method;
            url = method = null;
        }

        if (arguments.length === 2) {
            body = url;
            url = method;
            method = null;
        }

        push.call(this.responses, {
            method: method,
            url: typeof url === "string" && url !== "" ? pathToRegexp(url) : url,
            response: typeof body === "function" ? body : responseArray(body)
        });
    },

    respond: function respond() {
        if (arguments.length > 0) {
            this.respondWith.apply(this, arguments);
        }

        var queue = this.queue || [];
        var requests = queue.splice(0, queue.length);
        var self = this;

        requests.forEach(function (request) {
            self.processRequest(request);
        });
    },

    respondAll: function respondAll() {
        if (this.respondImmediately) {
            return;
        }

        this.queue = this.requests.slice(0);

        var request;
        while ((request = this.queue.shift())) {
            this.processRequest(request);
        }
    },

    processRequest: function processRequest(request) {
        try {
            if (request.aborted) {
                return;
            }

            var response = this.response || [404, {}, ""];

            if (this.responses) {
                for (var l = this.responses.length, i = l - 1; i >= 0; i--) {
                    if (match.call(this, this.responses[i], request)) {
                        response = this.responses[i].response;
                        break;
                    }
                }
            }

            if (request.readyState !== 4) {
                this.log(response, request);

                request.respond(response[0], response[1], response[2]);
            }
        } catch (e) {
            this.logError("Fake server request processing", e);
        }
    },

    restore: function restore() {
        return this.xhr.restore && this.xhr.restore.apply(this.xhr, arguments);
    },

    getRequest: function getRequest(index) {
        return this.requests[index] || null;
    },

    reset: function reset() {
        this.resetBehavior();
        this.resetHistory();
    },

    resetBehavior: function resetBehavior() {
        this.responses.length = this.queue.length = 0;
    },

    resetHistory: function resetHistory() {
        this.requests.length = this.requestCount = 0;

        this.requestedOnce = this.requestedTwice = this.requestedThrice = this.requested = false;

        this.firstRequest = this.secondRequest = this.thirdRequest = this.lastRequest = null;
    }
};

module.exports = fakeServer;

},{"../configure-logger":87,"../fake-xhr":97,"./format":94,"path-to-regexp":99}],96:[function(require,module,exports){
"use strict";

exports.isSupported = (function () {
    try {
        return !!new Blob();
    } catch (e) {
        return false;
    }
}());

},{}],97:[function(require,module,exports){
"use strict";

var GlobalTextEncoder = typeof TextEncoder !== "undefined"
    ? TextEncoder
    : require("@sinonjs/text-encoding").TextEncoder;
var globalObject = require("@sinonjs/commons").global;
var configureLogError = require("../configure-logger");
var sinonEvent = require("../event");
var extend = require("just-extend");

var supportsProgress = typeof ProgressEvent !== "undefined";
var supportsCustomEvent = typeof CustomEvent !== "undefined";
var supportsFormData = typeof FormData !== "undefined";
var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
var supportsBlob = require("./blob").isSupported;

function getWorkingXHR(globalScope) {
    var supportsXHR = typeof globalScope.XMLHttpRequest !== "undefined";
    if (supportsXHR) {
        return globalScope.XMLHttpRequest;
    }

    var supportsActiveX = typeof globalScope.ActiveXObject !== "undefined";
    if (supportsActiveX) {
        return function () {
            return new globalScope.ActiveXObject("MSXML2.XMLHTTP.3.0");
        };
    }

    return false;
}

// Ref: https://fetch.spec.whatwg.org/#forbidden-header-name
var unsafeHeaders = {
    "Accept-Charset": true,
    "Access-Control-Request-Headers": true,
    "Access-Control-Request-Method": true,
    "Accept-Encoding": true,
    "Connection": true,
    "Content-Length": true,
    "Cookie": true,
    "Cookie2": true,
    "Content-Transfer-Encoding": true,
    "Date": true,
    "DNT": true,
    "Expect": true,
    "Host": true,
    "Keep-Alive": true,
    "Origin": true,
    "Referer": true,
    "TE": true,
    "Trailer": true,
    "Transfer-Encoding": true,
    "Upgrade": true,
    "User-Agent": true,
    "Via": true
};

function EventTargetHandler() {
    var self = this;
    var events = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];

    function addEventListener(eventName) {
        self.addEventListener(eventName, function (event) {
            var listener = self["on" + eventName];

            if (listener && typeof listener === "function") {
                listener.call(this, event);
            }
        });
    }

    events.forEach(addEventListener);
}

EventTargetHandler.prototype = sinonEvent.EventTarget;

function normalizeHeaderValue(value) {
    // Ref: https://fetch.spec.whatwg.org/#http-whitespace-bytes
    /*eslint no-control-regex: "off"*/
    return value.replace(/^[\x09\x0A\x0D\x20]+|[\x09\x0A\x0D\x20]+$/g, "");
}

function getHeader(headers, header) {
    var foundHeader = Object.keys(headers).filter(function (h) {
        return h.toLowerCase() === header.toLowerCase();
    });

    return foundHeader[0] || null;
}

function excludeSetCookie2Header(header) {
    return !/^Set-Cookie2?$/i.test(header);
}

function verifyResponseBodyType(body, responseType) {
    var error = null;
    var isString = typeof body === "string";

    if (responseType === "arraybuffer") {

        if (!isString && !(body instanceof ArrayBuffer)) {
            error = new Error("Attempted to respond to fake XMLHttpRequest with " +
                            body + ", which is not a string or ArrayBuffer.");
            error.name = "InvalidBodyException";
        }
    }
    else if (!isString) {
        error = new Error("Attempted to respond to fake XMLHttpRequest with " +
                        body + ", which is not a string.");
        error.name = "InvalidBodyException";
    }

    if (error) {
        throw error;
    }
}

function convertToArrayBuffer(body, encoding) {
    if (body instanceof ArrayBuffer) {
        return body;
    }

    return new GlobalTextEncoder(encoding || "utf-8").encode(body).buffer;
}

function isXmlContentType(contentType) {
    return !contentType || /(text\/xml)|(application\/xml)|(\+xml)/.test(contentType);
}

function clearResponse(xhr) {
    if (xhr.responseType === "" || xhr.responseType === "text") {
        xhr.response = xhr.responseText = "";
    } else {
        xhr.response = xhr.responseText = null;
    }
    xhr.responseXML = null;
}

function fakeXMLHttpRequestFor(globalScope) {
    var isReactNative = globalScope.navigator && globalScope.navigator.product === "ReactNative";
    var sinonXhr = { XMLHttpRequest: globalScope.XMLHttpRequest };
    sinonXhr.GlobalXMLHttpRequest = globalScope.XMLHttpRequest;
    sinonXhr.GlobalActiveXObject = globalScope.ActiveXObject;
    sinonXhr.supportsActiveX = typeof sinonXhr.GlobalActiveXObject !== "undefined";
    sinonXhr.supportsXHR = typeof sinonXhr.GlobalXMLHttpRequest !== "undefined";
    sinonXhr.workingXHR = getWorkingXHR(globalScope);
    sinonXhr.supportsTimeout =
        (sinonXhr.supportsXHR && "timeout" in (new sinonXhr.GlobalXMLHttpRequest()));
    sinonXhr.supportsCORS = isReactNative ||
        (sinonXhr.supportsXHR && "withCredentials" in (new sinonXhr.GlobalXMLHttpRequest()));

    // Note that for FakeXMLHttpRequest to work pre ES5
    // we lose some of the alignment with the spec.
    // To ensure as close a match as possible,
    // set responseType before calling open, send or respond;
    function FakeXMLHttpRequest(config) {
        EventTargetHandler.call(this);
        this.readyState = FakeXMLHttpRequest.UNSENT;
        this.requestHeaders = {};
        this.requestBody = null;
        this.status = 0;
        this.statusText = "";
        this.upload = new EventTargetHandler();
        this.responseType = "";
        this.response = "";
        this.logError = configureLogError(config);

        if (sinonXhr.supportsTimeout) {
            this.timeout = 0;
        }

        if (sinonXhr.supportsCORS) {
            this.withCredentials = false;
        }

        if (typeof FakeXMLHttpRequest.onCreate === "function") {
            FakeXMLHttpRequest.onCreate(this);
        }
    }

    function verifyState(xhr) {
        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
            throw new Error("INVALID_STATE_ERR");
        }

        if (xhr.sendFlag) {
            throw new Error("INVALID_STATE_ERR");
        }
    }

    // largest arity in XHR is 5 - XHR#open
    var apply = function (obj, method, args) {
        switch (args.length) {
            case 0: return obj[method]();
            case 1: return obj[method](args[0]);
            case 2: return obj[method](args[0], args[1]);
            case 3: return obj[method](args[0], args[1], args[2]);
            case 4: return obj[method](args[0], args[1], args[2], args[3]);
            case 5: return obj[method](args[0], args[1], args[2], args[3], args[4]);
            default: throw new Error("Unhandled case");
        }
    };

    FakeXMLHttpRequest.filters = [];
    FakeXMLHttpRequest.addFilter = function addFilter(fn) {
        this.filters.push(fn);
    };
    FakeXMLHttpRequest.defake = function defake(fakeXhr, xhrArgs) {
        var xhr = new sinonXhr.workingXHR(); // eslint-disable-line new-cap

        [
            "open",
            "setRequestHeader",
            "abort",
            "getResponseHeader",
            "getAllResponseHeaders",
            "addEventListener",
            "overrideMimeType",
            "removeEventListener"
        ].forEach(function (method) {
            fakeXhr[method] = function () {
                return apply(xhr, method, arguments);
            };
        });

        fakeXhr.send = function () {
            // Ref: https://xhr.spec.whatwg.org/#the-responsetype-attribute
            if (xhr.responseType !== fakeXhr.responseType) {
                xhr.responseType = fakeXhr.responseType;
            }
            return apply(xhr, "send", arguments);
        };

        var copyAttrs = function (args) {
            args.forEach(function (attr) {
                fakeXhr[attr] = xhr[attr];
            });
        };

        var stateChangeStart = function () {
            fakeXhr.readyState = xhr.readyState;
            if (xhr.readyState >= FakeXMLHttpRequest.HEADERS_RECEIVED) {
                copyAttrs(["status", "statusText"]);
            }
            if (xhr.readyState >= FakeXMLHttpRequest.LOADING) {
                copyAttrs(["response"]);
                if (xhr.responseType === "" || xhr.responseType === "text") {
                    copyAttrs(["responseText"]);
                }
            }
            if (
                xhr.readyState === FakeXMLHttpRequest.DONE &&
                (xhr.responseType === "" || xhr.responseType === "document")
            ) {
                copyAttrs(["responseXML"]);
            }
        };

        var stateChangeEnd = function () {
            if (fakeXhr.onreadystatechange) {
                fakeXhr.onreadystatechange.call(fakeXhr, { target: fakeXhr, currentTarget: fakeXhr });
            }
        };

        var stateChange = function stateChange() {
            stateChangeStart();
            stateChangeEnd();
        };

        if (xhr.addEventListener) {
            xhr.addEventListener("readystatechange", stateChangeStart);

            Object.keys(fakeXhr.eventListeners).forEach(function (event) {
                /*eslint-disable no-loop-func*/
                fakeXhr.eventListeners[event].forEach(function (handler) {
                    xhr.addEventListener(event, handler.listener, {
                        capture: handler.capture,
                        once: handler.once
                    });
                });
                /*eslint-enable no-loop-func*/
            });

            xhr.addEventListener("readystatechange", stateChangeEnd);
        } else {
            xhr.onreadystatechange = stateChange;
        }
        apply(xhr, "open", xhrArgs);
    };
    FakeXMLHttpRequest.useFilters = false;

    function verifyRequestOpened(xhr) {
        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
            throw new Error("INVALID_STATE_ERR - " + xhr.readyState);
        }
    }

    function verifyRequestSent(xhr) {
        if (xhr.readyState === FakeXMLHttpRequest.DONE) {
            throw new Error("Request done");
        }
    }

    function verifyHeadersReceived(xhr) {
        if (xhr.async && xhr.readyState !== FakeXMLHttpRequest.HEADERS_RECEIVED) {
            throw new Error("No headers received");
        }
    }

    function convertResponseBody(responseType, contentType, body) {
        if (responseType === "" || responseType === "text") {
            return body;
        } else if (supportsArrayBuffer && responseType === "arraybuffer") {
            return convertToArrayBuffer(body);
        } else if (responseType === "json") {
            try {
                return JSON.parse(body);
            } catch (e) {
                // Return parsing failure as null
                return null;
            }
        } else if (supportsBlob && responseType === "blob") {
            var blobOptions = {};
            if (contentType) {
                blobOptions.type = contentType;
            }
            return new Blob([convertToArrayBuffer(body)], blobOptions);
        } else if (responseType === "document") {
            if (isXmlContentType(contentType)) {
                return FakeXMLHttpRequest.parseXML(body);
            }
            return null;
        }
        throw new Error("Invalid responseType " + responseType);
    }

    /**
     * Steps to follow when there is an error, according to:
     * https://xhr.spec.whatwg.org/#request-error-steps
     */
    function requestErrorSteps(xhr) {
        clearResponse(xhr);
        xhr.errorFlag = true;
        xhr.requestHeaders = {};
        xhr.responseHeaders = {};

        if (xhr.readyState !== FakeXMLHttpRequest.UNSENT && xhr.sendFlag
            && xhr.readyState !== FakeXMLHttpRequest.DONE) {
            xhr.readyStateChange(FakeXMLHttpRequest.DONE);
            xhr.sendFlag = false;
        }
    }

    FakeXMLHttpRequest.parseXML = function parseXML(text) {
        // Treat empty string as parsing failure
        if (text !== "") {
            try {
                if (typeof DOMParser !== "undefined") {
                    var parser = new DOMParser();
                    var parsererrorNS = "";

                    try {
                        var parsererrors = parser
                            .parseFromString("INVALID", "text/xml")
                            .getElementsByTagName("parsererror");
                        if (parsererrors.length) {
                            parsererrorNS = parsererrors[0].namespaceURI;
                        }
                    } catch (e) {
                        // passing invalid XML makes IE11 throw
                        // so no namespace needs to be determined
                    }

                    var result;
                    try {
                        result = parser.parseFromString(text, "text/xml");
                    } catch (err) {
                        return null;
                    }

                    return result.getElementsByTagNameNS(parsererrorNS, "parsererror").length
                        ? null : result;
                }
                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(text);
                return xmlDoc.parseError.errorCode !== 0
                    ? null : xmlDoc;
            } catch (e) {
                // Unable to parse XML - no biggie
            }
        }

        return null;
    };

    FakeXMLHttpRequest.statusCodes = {
        100: "Continue",
        101: "Switching Protocols",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        300: "Multiple Choice",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Long",
        415: "Unsupported Media Type",
        416: "Requested Range Not Satisfiable",
        417: "Expectation Failed",
        422: "Unprocessable Entity",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported"
    };

    extend(FakeXMLHttpRequest.prototype, sinonEvent.EventTarget, {
        async: true,

        open: function open(method, url, async, username, password) {
            this.method = method;
            this.url = url;
            this.async = typeof async === "boolean" ? async : true;
            this.username = username;
            this.password = password;
            clearResponse(this);
            this.requestHeaders = {};
            this.sendFlag = false;

            if (FakeXMLHttpRequest.useFilters === true) {
                var xhrArgs = arguments;
                var defake = FakeXMLHttpRequest.filters.some(function (filter) {
                    return filter.apply(this, xhrArgs);
                });
                if (defake) {
                    FakeXMLHttpRequest.defake(this, arguments);
                    return;
                }
            }
            this.readyStateChange(FakeXMLHttpRequest.OPENED);
        },

        readyStateChange: function readyStateChange(state) {
            this.readyState = state;

            var readyStateChangeEvent = new sinonEvent.Event("readystatechange", false, false, this);
            var event, progress;

            if (typeof this.onreadystatechange === "function") {
                try {
                    this.onreadystatechange(readyStateChangeEvent);
                } catch (e) {
                    this.logError("Fake XHR onreadystatechange handler", e);
                }
            }

            if (this.readyState === FakeXMLHttpRequest.DONE) {
                if (this.timedOut || this.aborted || this.status === 0) {
                    progress = {loaded: 0, total: 0};
                    event = (this.timedOut && "timeout") || (this.aborted && "abort") || "error";
                } else {
                    progress = {loaded: 100, total: 100};
                    event = "load";
                }

                if (supportsProgress) {
                    this.upload.dispatchEvent(new sinonEvent.ProgressEvent("progress", progress, this));
                    this.upload.dispatchEvent(new sinonEvent.ProgressEvent(event, progress, this));
                    this.upload.dispatchEvent(new sinonEvent.ProgressEvent("loadend", progress, this));
                }

                this.dispatchEvent(new sinonEvent.ProgressEvent("progress", progress, this));
                this.dispatchEvent(new sinonEvent.ProgressEvent(event, progress, this));
                this.dispatchEvent(new sinonEvent.ProgressEvent("loadend", progress, this));
            }

            this.dispatchEvent(readyStateChangeEvent);
        },

        // Ref https://xhr.spec.whatwg.org/#the-setrequestheader()-method
        setRequestHeader: function setRequestHeader(header, value) {
            if (typeof value !== "string") {
                throw new TypeError("By RFC7230, section 3.2.4, header values should be strings. Got " + typeof value);
            }
            verifyState(this);

            var checkUnsafeHeaders = true;
            if (typeof this.unsafeHeadersEnabled === "function") {
                checkUnsafeHeaders = this.unsafeHeadersEnabled();
            }

            if (checkUnsafeHeaders && (getHeader(unsafeHeaders, header) !== null || /^(Sec-|Proxy-)/i.test(header))) {
                throw new Error("Refused to set unsafe header \"" + header + "\"");
            }

            value = normalizeHeaderValue(value);

            var existingHeader = getHeader(this.requestHeaders, header);
            if (existingHeader) {
                this.requestHeaders[existingHeader] += ", " + value;
            } else {
                this.requestHeaders[header] = value;
            }
        },

        setStatus: function setStatus(status) {
            var sanitizedStatus = typeof status === "number" ? status : 200;

            verifyRequestOpened(this);
            this.status = sanitizedStatus;
            this.statusText = FakeXMLHttpRequest.statusCodes[sanitizedStatus];
        },

        // Helps testing
        setResponseHeaders: function setResponseHeaders(headers) {
            verifyRequestOpened(this);

            var responseHeaders = this.responseHeaders = {};

            Object.keys(headers).forEach(function (header) {
                responseHeaders[header] = headers[header];
            });

            if (this.async) {
                this.readyStateChange(FakeXMLHttpRequest.HEADERS_RECEIVED);
            } else {
                this.readyState = FakeXMLHttpRequest.HEADERS_RECEIVED;
            }
        },

        // Currently treats ALL data as a DOMString (i.e. no Document)
        send: function send(data) {
            verifyState(this);

            if (!/^(head)$/i.test(this.method)) {
                var contentType = getHeader(this.requestHeaders, "Content-Type");
                if (this.requestHeaders[contentType]) {
                    var value = this.requestHeaders[contentType].split(";");
                    this.requestHeaders[contentType] = value[0] + ";charset=utf-8";
                } else if (supportsFormData && !(data instanceof FormData)) {
                    this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
                }

                this.requestBody = data;
            }

            this.errorFlag = false;
            this.sendFlag = this.async;
            clearResponse(this);

            if (typeof this.onSend === "function") {
                this.onSend(this);
            }

            // Only listen if setInterval and Date are a stubbed.
            if (sinonXhr.supportsTimeout && typeof setInterval.clock === "object" && typeof Date.clock === "object") {
                var initiatedTime = Date.now();
                var self = this;

                // Listen to any possible tick by fake timers and check to see if timeout has
                // been exceeded. It's important to note that timeout can be changed while a request
                // is in flight, so we must check anytime the end user forces a clock tick to make
                // sure timeout hasn't changed.
                // https://xhr.spec.whatwg.org/#dfnReturnLink-2
                var clearIntervalId = setInterval(function () {
                    // Check if the readyState has been reset or is done. If this is the case, there
                    // should be no timeout. This will also prevent aborted requests and
                    // fakeServerWithClock from triggering unnecessary responses.
                    if (self.readyState === FakeXMLHttpRequest.UNSENT
                    || self.readyState === FakeXMLHttpRequest.DONE) {
                        clearInterval(clearIntervalId);
                    } else if (typeof self.timeout === "number" && self.timeout > 0) {
                        if (Date.now() >= (initiatedTime + self.timeout)) {
                            self.triggerTimeout();
                            clearInterval(clearIntervalId);
                        }
                    }
                }, 1);
            }

            this.dispatchEvent(new sinonEvent.Event("loadstart", false, false, this));
        },

        abort: function abort() {
            this.aborted = true;
            requestErrorSteps(this);
            this.readyState = FakeXMLHttpRequest.UNSENT;
        },

        error: function () {
            clearResponse(this);
            this.errorFlag = true;
            this.requestHeaders = {};
            this.responseHeaders = {};

            this.readyStateChange(FakeXMLHttpRequest.DONE);
        },

        triggerTimeout: function triggerTimeout() {
            if (sinonXhr.supportsTimeout) {
                this.timedOut = true;
                requestErrorSteps(this);
            }
        },

        getResponseHeader: function getResponseHeader(header) {
            if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
                return null;
            }

            if (/^Set-Cookie2?$/i.test(header)) {
                return null;
            }

            header = getHeader(this.responseHeaders, header);

            return this.responseHeaders[header] || null;
        },

        getAllResponseHeaders: function getAllResponseHeaders() {
            if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
                return "";
            }

            var responseHeaders = this.responseHeaders;
            var headers = Object.keys(responseHeaders)
                .filter(excludeSetCookie2Header)
                .reduce(function (prev, header) {
                    var value = responseHeaders[header];

                    return prev + (header + ": " + value + "\r\n");
                }, "");

            return headers;
        },

        setResponseBody: function setResponseBody(body) {
            verifyRequestSent(this);
            verifyHeadersReceived(this);
            verifyResponseBodyType(body, this.responseType);
            var contentType = this.overriddenMimeType || this.getResponseHeader("Content-Type");

            var isTextResponse = this.responseType === "" || this.responseType === "text";
            clearResponse(this);
            if (this.async) {
                var chunkSize = this.chunkSize || 10;
                var index = 0;

                do {
                    this.readyStateChange(FakeXMLHttpRequest.LOADING);

                    if (isTextResponse) {
                        this.responseText = this.response += body.substring(index, index + chunkSize);
                    }
                    index += chunkSize;
                } while (index < body.length);
            }

            this.response = convertResponseBody(this.responseType, contentType, body);
            if (isTextResponse) {
                this.responseText = this.response;
            }

            if (this.responseType === "document") {
                this.responseXML = this.response;
            } else if (this.responseType === "" && isXmlContentType(contentType)) {
                this.responseXML = FakeXMLHttpRequest.parseXML(this.responseText);
            }
            this.readyStateChange(FakeXMLHttpRequest.DONE);
        },

        respond: function respond(status, headers, body) {
            this.setStatus(status);
            this.setResponseHeaders(headers || {});
            this.setResponseBody(body || "");
        },

        uploadProgress: function uploadProgress(progressEventRaw) {
            if (supportsProgress) {
                this.upload.dispatchEvent(new sinonEvent.ProgressEvent("progress", progressEventRaw, this.upload));
            }
        },

        downloadProgress: function downloadProgress(progressEventRaw) {
            if (supportsProgress) {
                this.dispatchEvent(new sinonEvent.ProgressEvent("progress", progressEventRaw, this));
            }
        },

        uploadError: function uploadError(error) {
            if (supportsCustomEvent) {
                this.upload.dispatchEvent(new sinonEvent.CustomEvent("error", {detail: error}));
            }
        },

        overrideMimeType: function overrideMimeType(type) {
            if (this.readyState >= FakeXMLHttpRequest.LOADING) {
                throw new Error("INVALID_STATE_ERR");
            }
            this.overriddenMimeType = type;
        }
    });

    var states = {
        UNSENT: 0,
        OPENED: 1,
        HEADERS_RECEIVED: 2,
        LOADING: 3,
        DONE: 4
    };

    extend(FakeXMLHttpRequest, states);
    extend(FakeXMLHttpRequest.prototype, states);

    function useFakeXMLHttpRequest() {
        FakeXMLHttpRequest.restore = function restore(keepOnCreate) {
            if (sinonXhr.supportsXHR) {
                globalScope.XMLHttpRequest = sinonXhr.GlobalXMLHttpRequest;
            }

            if (sinonXhr.supportsActiveX) {
                globalScope.ActiveXObject = sinonXhr.GlobalActiveXObject;
            }

            delete FakeXMLHttpRequest.restore;

            if (keepOnCreate !== true) {
                delete FakeXMLHttpRequest.onCreate;
            }
        };
        if (sinonXhr.supportsXHR) {
            globalScope.XMLHttpRequest = FakeXMLHttpRequest;
        }

        if (sinonXhr.supportsActiveX) {
            globalScope.ActiveXObject = function ActiveXObject(objId) {
                if (objId === "Microsoft.XMLHTTP" || /^Msxml2\.XMLHTTP/i.test(objId)) {

                    return new FakeXMLHttpRequest();
                }

                return new sinonXhr.GlobalActiveXObject(objId);
            };
        }

        return FakeXMLHttpRequest;
    }

    return {
        xhr: sinonXhr,
        FakeXMLHttpRequest: FakeXMLHttpRequest,
        useFakeXMLHttpRequest: useFakeXMLHttpRequest
    };
}

module.exports = extend(fakeXMLHttpRequestFor(globalObject), {
    fakeXMLHttpRequestFor: fakeXMLHttpRequestFor
});

},{"../configure-logger":87,"../event":91,"./blob":96,"@sinonjs/commons":44,"@sinonjs/text-encoding":81,"just-extend":84}],98:[function(require,module,exports){
"use strict";

module.exports = {
    fakeServer: require("./fake-server"),
    fakeServerWithClock: require("./fake-server/fake-server-with-clock"),
    fakeXhr: require("./fake-xhr")
};

},{"./fake-server":95,"./fake-server/fake-server-with-clock":93,"./fake-xhr":97}],99:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options))
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

},{"isarray":83}],100:[function(require,module,exports){
'use strict';
module.exports = {
	stdout: false,
	stderr: false
};

},{}],101:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.typeDetect = factory());
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object' && window !== null) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvc2lub24uanMiLCJsaWIvc2lub24vYXNzZXJ0LmpzIiwibGliL3Npbm9uL2JlaGF2aW9yLmpzIiwibGliL3Npbm9uL2NvbGxlY3Qtb3duLW1ldGhvZHMuanMiLCJsaWIvc2lub24vY29sb3IuanMiLCJsaWIvc2lub24vY3JlYXRlLXNhbmRib3guanMiLCJsaWIvc2lub24vZGVmYXVsdC1iZWhhdmlvcnMuanMiLCJsaWIvc2lub24vZmFrZS5qcyIsImxpYi9zaW5vbi9tb2NrLWV4cGVjdGF0aW9uLmpzIiwibGliL3Npbm9uL21vY2suanMiLCJsaWIvc2lub24vcHJveHktY2FsbC11dGlsLmpzIiwibGliL3Npbm9uL3Byb3h5LWNhbGwuanMiLCJsaWIvc2lub24vcHJveHktaW52b2tlLmpzIiwibGliL3Npbm9uL3Byb3h5LmpzIiwibGliL3Npbm9uL3Jlc3RvcmUtb2JqZWN0LmpzIiwibGliL3Npbm9uL3NhbmRib3guanMiLCJsaWIvc2lub24vc3B5LWZvcm1hdHRlcnMuanMiLCJsaWIvc2lub24vc3B5LmpzIiwibGliL3Npbm9uL3N0dWIuanMiLCJsaWIvc2lub24vdGhyb3ctb24tZmFsc3ktb2JqZWN0LmpzIiwibGliL3Npbm9uL3V0aWwvY29yZS9kZWZhdWx0LWNvbmZpZy5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvZXhwb3J0LWFzeW5jLWJlaGF2aW9ycy5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvZXh0ZW5kLmpzIiwibGliL3Npbm9uL3V0aWwvY29yZS9mb3JtYXQuanMiLCJsaWIvc2lub24vdXRpbC9jb3JlL2Z1bmN0aW9uLXRvLXN0cmluZy5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvZ2V0LW5leHQtdGljay5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvZ2V0LXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJsaWIvc2lub24vdXRpbC9jb3JlL2lzLWVzLW1vZHVsZS5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvaXMtbm9uLWV4aXN0ZW50LW93bi1wcm9wZXJ0eS5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvaXMtcHJvcGVydHktY29uZmlndXJhYmxlLmpzIiwibGliL3Npbm9uL3V0aWwvY29yZS9uZXh0LXRpY2suanMiLCJsaWIvc2lub24vdXRpbC9jb3JlL3RpbWVzLWluLXdvcmRzLmpzIiwibGliL3Npbm9uL3V0aWwvY29yZS91c2UtcHJvbWlzZS1saWJyYXJ5LmpzIiwibGliL3Npbm9uL3V0aWwvY29yZS93YWxrLW9iamVjdC5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvd2Fsay5qcyIsImxpYi9zaW5vbi91dGlsL2NvcmUvd3JhcC1tZXRob2QuanMiLCJsaWIvc2lub24vdXRpbC9mYWtlLXRpbWVycy5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi9jYWxsZWQtaW4tb3JkZXIuanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvY29tbW9ucy9saWIvY2xhc3MtbmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi9kZXByZWNhdGVkLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL2NvbW1vbnMvbGliL2V2ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL2NvbW1vbnMvbGliL2Z1bmN0aW9uLW5hbWUuanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvY29tbW9ucy9saWIvZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL2NvbW1vbnMvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL2NvbW1vbnMvbGliL29yZGVyLWJ5LWZpcnN0LWNhbGwuanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvY29tbW9ucy9saWIvcHJvdG90eXBlcy9hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi9wcm90b3R5cGVzL2NvcHktcHJvdG90eXBlLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL2NvbW1vbnMvbGliL3Byb3RvdHlwZXMvZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvY29tbW9ucy9saWIvcHJvdG90eXBlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi9wcm90b3R5cGVzL21hcC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi9wcm90b3R5cGVzL29iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi9wcm90b3R5cGVzL3NldC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi9wcm90b3R5cGVzL3N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9jb21tb25zL2xpYi90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL2NvbW1vbnMvbGliL3ZhbHVlLXRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9mb3JtYXRpby9saWIvZm9ybWF0aW8uanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvc2Ftc2FtL2xpYi9jcmVhdGUtbWF0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2NyZWF0ZS1tYXRjaGVyL2Fzc2VydC1tYXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvY3JlYXRlLW1hdGNoZXIvYXNzZXJ0LW1ldGhvZC1leGlzdHMuanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvc2Ftc2FtL2xpYi9jcmVhdGUtbWF0Y2hlci9hc3NlcnQtdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2NyZWF0ZS1tYXRjaGVyL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvY3JlYXRlLW1hdGNoZXIvaXMtbWF0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2NyZWF0ZS1tYXRjaGVyL21hdGNoLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2NyZWF0ZS1tYXRjaGVyL21hdGNoZXItcHJvdG90eXBlLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvY3JlYXRlLW1hdGNoZXIvdHlwZS1tYXAuanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvc2Ftc2FtL2xpYi9kZWVwLWVxdWFsLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvZ2V0LWNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvaWRlbnRpY2FsLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvaXMtYXJndW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvaXMtZGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2lzLWVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvc2Ftc2FtL2xpYi9pcy1tYXAuanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvc2Ftc2FtL2xpYi9pcy1uYW4uanMiLCJub2RlX21vZHVsZXMvQHNpbm9uanMvc2Ftc2FtL2xpYi9pcy1uZWctemVyby5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2lzLXNldC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2lzLXN1YnNldC5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL2l0ZXJhYmxlLXRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9Ac2lub25qcy9zYW1zYW0vbGliL21hdGNoLmpzIiwibm9kZV9tb2R1bGVzL0BzaW5vbmpzL3NhbXNhbS9saWIvc2Ftc2FtLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9kaWZmL2Rpc3QvZGlmZi5qcyIsIm5vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2p1c3QtZXh0ZW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5nZXQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9sZXgvc3JjL2xvbGV4LXNyYy5qcyIsIm5vZGVfbW9kdWxlcy9uaXNlL2xpYi9jb25maWd1cmUtbG9nZ2VyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25pc2UvbGliL2V2ZW50L2N1c3RvbS1ldmVudC5qcyIsIm5vZGVfbW9kdWxlcy9uaXNlL2xpYi9ldmVudC9ldmVudC10YXJnZXQuanMiLCJub2RlX21vZHVsZXMvbmlzZS9saWIvZXZlbnQvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvbmlzZS9saWIvZXZlbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbmlzZS9saWIvZXZlbnQvcHJvZ3Jlc3MtZXZlbnQuanMiLCJub2RlX21vZHVsZXMvbmlzZS9saWIvZmFrZS1zZXJ2ZXIvZmFrZS1zZXJ2ZXItd2l0aC1jbG9jay5qcyIsIm5vZGVfbW9kdWxlcy9uaXNlL2xpYi9mYWtlLXNlcnZlci9mb3JtYXQuanMiLCJub2RlX21vZHVsZXMvbmlzZS9saWIvZmFrZS1zZXJ2ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbmlzZS9saWIvZmFrZS14aHIvYmxvYi5qcyIsIm5vZGVfbW9kdWxlcy9uaXNlL2xpYi9mYWtlLXhoci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9uaXNlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoLXRvLXJlZ2V4cC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBwb3J0cy1jb2xvci9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3R5cGUtZGV0ZWN0L3R5cGUtZGV0ZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqakRBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0d0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaHhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi9zaW5vbi9iZWhhdmlvclwiKTtcbnZhciBjcmVhdGVTYW5kYm94ID0gcmVxdWlyZShcIi4vc2lub24vY3JlYXRlLXNhbmRib3hcIik7XG52YXIgZXh0ZW5kID0gcmVxdWlyZShcIi4vc2lub24vdXRpbC9jb3JlL2V4dGVuZFwiKTtcbnZhciBmYWtlVGltZXJzID0gcmVxdWlyZShcIi4vc2lub24vdXRpbC9mYWtlLXRpbWVyc1wiKTtcbnZhciBmb3JtYXQgPSByZXF1aXJlKFwiLi9zaW5vbi91dGlsL2NvcmUvZm9ybWF0XCIpO1xudmFyIG5pc2UgPSByZXF1aXJlKFwibmlzZVwiKTtcbnZhciBTYW5kYm94ID0gcmVxdWlyZShcIi4vc2lub24vc2FuZGJveFwiKTtcbnZhciBzdHViID0gcmVxdWlyZShcIi4vc2lub24vc3R1YlwiKTtcblxudmFyIGFwaU1ldGhvZHMgPSB7XG4gICAgY3JlYXRlU2FuZGJveDogY3JlYXRlU2FuZGJveCxcbiAgICBhc3NlcnQ6IHJlcXVpcmUoXCIuL3Npbm9uL2Fzc2VydFwiKSxcbiAgICBtYXRjaDogcmVxdWlyZShcIkBzaW5vbmpzL3NhbXNhbVwiKS5jcmVhdGVNYXRjaGVyLFxuICAgIHJlc3RvcmVPYmplY3Q6IHJlcXVpcmUoXCIuL3Npbm9uL3Jlc3RvcmUtb2JqZWN0XCIpLFxuXG4gICAgZXhwZWN0YXRpb246IHJlcXVpcmUoXCIuL3Npbm9uL21vY2stZXhwZWN0YXRpb25cIiksXG4gICAgZGVmYXVsdENvbmZpZzogcmVxdWlyZShcIi4vc2lub24vdXRpbC9jb3JlL2RlZmF1bHQtY29uZmlnXCIpLFxuXG4gICAgc2V0Rm9ybWF0dGVyOiBmb3JtYXQuc2V0Rm9ybWF0dGVyLFxuXG4gICAgLy8gZmFrZSB0aW1lcnNcbiAgICB0aW1lcnM6IGZha2VUaW1lcnMudGltZXJzLFxuXG4gICAgLy8gZmFrZSBYSFJcbiAgICB4aHI6IG5pc2UuZmFrZVhoci54aHIsXG4gICAgRmFrZVhNTEh0dHBSZXF1ZXN0OiBuaXNlLmZha2VYaHIuRmFrZVhNTEh0dHBSZXF1ZXN0LFxuXG4gICAgLy8gZmFrZSBzZXJ2ZXJcbiAgICBmYWtlU2VydmVyOiBuaXNlLmZha2VTZXJ2ZXIsXG4gICAgZmFrZVNlcnZlcldpdGhDbG9jazogbmlzZS5mYWtlU2VydmVyV2l0aENsb2NrLFxuICAgIGNyZWF0ZUZha2VTZXJ2ZXI6IG5pc2UuZmFrZVNlcnZlci5jcmVhdGUuYmluZChuaXNlLmZha2VTZXJ2ZXIpLFxuICAgIGNyZWF0ZUZha2VTZXJ2ZXJXaXRoQ2xvY2s6IG5pc2UuZmFrZVNlcnZlcldpdGhDbG9jay5jcmVhdGUuYmluZChuaXNlLmZha2VTZXJ2ZXJXaXRoQ2xvY2spLFxuXG4gICAgYWRkQmVoYXZpb3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgICAgIGJlaGF2aW9yLmFkZEJlaGF2aW9yKHN0dWIsIG5hbWUsIGZuKTtcbiAgICB9XG59O1xuXG52YXIgc2FuZGJveCA9IG5ldyBTYW5kYm94KCk7XG5cbnZhciBhcGkgPSBleHRlbmQoc2FuZGJveCwgYXBpTWV0aG9kcyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheVByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheTtcbnZhciBjYWxsZWRJbk9yZGVyID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikuY2FsbGVkSW5PcmRlcjtcbnZhciBjcmVhdGVNYXRjaGVyID0gcmVxdWlyZShcIkBzaW5vbmpzL3NhbXNhbVwiKS5jcmVhdGVNYXRjaGVyO1xudmFyIG9yZGVyQnlGaXJzdENhbGwgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5vcmRlckJ5Rmlyc3RDYWxsO1xudmFyIHRpbWVzSW5Xb3JkcyA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS90aW1lcy1pbi13b3Jkc1wiKTtcbnZhciBmb3JtYXQgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvZm9ybWF0XCIpO1xudmFyIHN0cmluZ1NsaWNlID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5zdHJpbmcuc2xpY2U7XG52YXIgZ2xvYmFsT2JqZWN0ID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikuZ2xvYmFsO1xuXG52YXIgYXJyYXlTbGljZSA9IGFycmF5UHJvdG8uc2xpY2U7XG52YXIgY29uY2F0ID0gYXJyYXlQcm90by5jb25jYXQ7XG52YXIgZm9yRWFjaCA9IGFycmF5UHJvdG8uZm9yRWFjaDtcbnZhciBqb2luID0gYXJyYXlQcm90by5qb2luO1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG52YXIgYXNzZXJ0O1xuXG5mdW5jdGlvbiB2ZXJpZnlJc1N0dWIoKSB7XG4gICAgdmFyIGFyZ3MgPSBhcnJheVNsaWNlKGFyZ3VtZW50cyk7XG5cbiAgICBmb3JFYWNoKGFyZ3MsIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICAgICAgYXNzZXJ0LmZhaWwoXCJmYWtlIGlzIG5vdCBhIHNweVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QucHJveHkgJiYgbWV0aG9kLnByb3h5LmlzU2lub25Qcm94eSkge1xuICAgICAgICAgICAgdmVyaWZ5SXNTdHViKG1ldGhvZC5wcm94eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmZhaWwobWV0aG9kICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWV0aG9kLmdldENhbGwgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5mYWlsKG1ldGhvZCArIFwiIGlzIG5vdCBzdHViYmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeUlzVmFsaWRBc3NlcnRpb24oYXNzZXJ0aW9uTWV0aG9kLCBhc3NlcnRpb25BcmdzKSB7XG4gICAgc3dpdGNoIChhc3NlcnRpb25NZXRob2QpIHtcbiAgICAgICAgY2FzZSBcIm5vdENhbGxlZFwiOlxuICAgICAgICBjYXNlIFwiY2FsbGVkXCI6XG4gICAgICAgIGNhc2UgXCJjYWxsZWRPbmNlXCI6XG4gICAgICAgIGNhc2UgXCJjYWxsZWRUd2ljZVwiOlxuICAgICAgICBjYXNlIFwiY2FsbGVkVGhyaWNlXCI6XG4gICAgICAgICAgICBpZiAoYXNzZXJ0aW9uQXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZmFpbChcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0aW9uTWV0aG9kICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIHRha2VzIDEgYXJndW1lbnQgYnV0IHdhcyBjYWxsZWQgd2l0aCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXNzZXJ0aW9uQXJncy5sZW5ndGggKyAxKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBhcmd1bWVudHNcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZmFpbEFzc2VydGlvbihvYmplY3QsIG1zZykge1xuICAgIHZhciBvYmogPSBvYmplY3QgfHwgZ2xvYmFsT2JqZWN0O1xuICAgIHZhciBmYWlsTWV0aG9kID0gb2JqLmZhaWwgfHwgYXNzZXJ0LmZhaWw7XG4gICAgZmFpbE1ldGhvZC5jYWxsKG9iaiwgbXNnKTtcbn1cblxuZnVuY3Rpb24gbWlycm9yUHJvcEFzQXNzZXJ0aW9uKG5hbWUsIG1ldGhvZCwgbWVzc2FnZSkge1xuICAgIHZhciBtc2cgPSBtZXNzYWdlO1xuICAgIHZhciBtZXRoID0gbWV0aG9kO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIG1zZyA9IG1ldGhvZDtcbiAgICAgICAgbWV0aCA9IG5hbWU7XG4gICAgfVxuXG4gICAgYXNzZXJ0W25hbWVdID0gZnVuY3Rpb24oZmFrZSkge1xuICAgICAgICB2ZXJpZnlJc1N0dWIoZmFrZSk7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBhcnJheVNsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHZhciBmYWlsZWQgPSBmYWxzZTtcblxuICAgICAgICB2ZXJpZnlJc1ZhbGlkQXNzZXJ0aW9uKG5hbWUsIGFyZ3MpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWV0aCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBmYWlsZWQgPSAhbWV0aChmYWtlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZhaWxlZCA9IHR5cGVvZiBmYWtlW21ldGhdID09PSBcImZ1bmN0aW9uXCIgPyAhZmFrZVttZXRoXS5hcHBseShmYWtlLCBhcmdzKSA6ICFmYWtlW21ldGhdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZhaWxlZCkge1xuICAgICAgICAgICAgZmFpbEFzc2VydGlvbih0aGlzLCAoZmFrZS5wcmludGYgfHwgZmFrZS5wcm94eS5wcmludGYpLmFwcGx5KGZha2UsIGNvbmNhdChbbXNnXSwgYXJncykpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFzc2VydC5wYXNzKG5hbWUpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZXhwb3NlZE5hbWUocHJlZml4LCBwcm9wKSB7XG4gICAgcmV0dXJuICFwcmVmaXggfHwgL15mYWlsLy50ZXN0KHByb3ApID8gcHJvcCA6IHByZWZpeCArIHN0cmluZ1NsaWNlKHByb3AsIDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmdTbGljZShwcm9wLCAxKTtcbn1cblxuYXNzZXJ0ID0ge1xuICAgIGZhaWxFeGNlcHRpb246IFwiQXNzZXJ0RXJyb3JcIixcblxuICAgIGZhaWw6IGZ1bmN0aW9uIGZhaWwobWVzc2FnZSkge1xuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIGVycm9yLm5hbWUgPSB0aGlzLmZhaWxFeGNlcHRpb24gfHwgYXNzZXJ0LmZhaWxFeGNlcHRpb247XG5cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSxcblxuICAgIHBhc3M6IGZ1bmN0aW9uIHBhc3MoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9LFxuXG4gICAgY2FsbE9yZGVyOiBmdW5jdGlvbiBhc3NlcnRDYWxsT3JkZXIoKSB7XG4gICAgICAgIHZlcmlmeUlzU3R1Yi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB2YXIgZXhwZWN0ZWQgPSBcIlwiO1xuICAgICAgICB2YXIgYWN0dWFsID0gXCJcIjtcblxuICAgICAgICBpZiAoIWNhbGxlZEluT3JkZXIoYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZCA9IGpvaW4oYXJndW1lbnRzLCBcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHZhciBjYWxscyA9IGFycmF5U2xpY2UoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGNhbGxzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxzWy0taV0uY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGxpY2UoY2FsbHMsIGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFjdHVhbCA9IGpvaW4ob3JkZXJCeUZpcnN0Q2FsbChjYWxscyksIFwiLCBcIik7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBmYWlscywgd2UnbGwganVzdCBmYWxsIGJhY2sgdG8gdGhlIGJsYW5rIHN0cmluZ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmYWlsQXNzZXJ0aW9uKHRoaXMsIFwiZXhwZWN0ZWQgXCIgKyBleHBlY3RlZCArIFwiIHRvIGJlIGNhbGxlZCBpbiBvcmRlciBidXQgd2VyZSBjYWxsZWQgYXMgXCIgKyBhY3R1YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXNzZXJ0LnBhc3MoXCJjYWxsT3JkZXJcIik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2FsbENvdW50OiBmdW5jdGlvbiBhc3NlcnRDYWxsQ291bnQobWV0aG9kLCBjb3VudCkge1xuICAgICAgICB2ZXJpZnlJc1N0dWIobWV0aG9kKTtcblxuICAgICAgICBpZiAobWV0aG9kLmNhbGxDb3VudCAhPT0gY291bnQpIHtcbiAgICAgICAgICAgIHZhciBtc2cgPSBcImV4cGVjdGVkICVuIHRvIGJlIGNhbGxlZCBcIiArIHRpbWVzSW5Xb3Jkcyhjb3VudCkgKyBcIiBidXQgd2FzIGNhbGxlZCAlYyVDXCI7XG4gICAgICAgICAgICBmYWlsQXNzZXJ0aW9uKHRoaXMsIG1ldGhvZC5wcmludGYobXNnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhc3NlcnQucGFzcyhcImNhbGxDb3VudFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBleHBvc2U6IGZ1bmN0aW9uIGV4cG9zZSh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHZhciBwcmVmaXggPSAodHlwZW9mIG8ucHJlZml4ID09PSBcInVuZGVmaW5lZFwiICYmIFwiYXNzZXJ0XCIpIHx8IG8ucHJlZml4O1xuICAgICAgICB2YXIgaW5jbHVkZUZhaWwgPSB0eXBlb2Ygby5pbmNsdWRlRmFpbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBCb29sZWFuKG8uaW5jbHVkZUZhaWwpO1xuICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgICAgIGZvckVhY2goT2JqZWN0LmtleXMoaW5zdGFuY2UpLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2QgIT09IFwiZXhwb3NlXCIgJiYgKGluY2x1ZGVGYWlsIHx8ICEvXihmYWlsKS8udGVzdChtZXRob2QpKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtleHBvc2VkTmFtZShwcmVmaXgsIG1ldGhvZCldID0gaW5zdGFuY2VbbWV0aG9kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9LFxuXG4gICAgbWF0Y2g6IGZ1bmN0aW9uIG1hdGNoKGFjdHVhbCwgZXhwZWN0YXRpb24pIHtcbiAgICAgICAgdmFyIG1hdGNoZXIgPSBjcmVhdGVNYXRjaGVyKGV4cGVjdGF0aW9uKTtcbiAgICAgICAgaWYgKG1hdGNoZXIudGVzdChhY3R1YWwpKSB7XG4gICAgICAgICAgICBhc3NlcnQucGFzcyhcIm1hdGNoXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZCA9IFtcbiAgICAgICAgICAgICAgICBcImV4cGVjdGVkIHZhbHVlIHRvIG1hdGNoXCIsXG4gICAgICAgICAgICAgICAgXCIgICAgZXhwZWN0ZWQgPSBcIiArIGZvcm1hdChleHBlY3RhdGlvbiksXG4gICAgICAgICAgICAgICAgXCIgICAgYWN0dWFsID0gXCIgKyBmb3JtYXQoYWN0dWFsKVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgZmFpbEFzc2VydGlvbih0aGlzLCBqb2luKGZvcm1hdHRlZCwgXCJcXG5cIikpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiY2FsbGVkXCIsIFwiZXhwZWN0ZWQgJW4gdG8gaGF2ZSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlIGJ1dCB3YXMgbmV2ZXIgY2FsbGVkXCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFxuICAgIFwibm90Q2FsbGVkXCIsXG4gICAgZnVuY3Rpb24oc3B5KSB7XG4gICAgICAgIHJldHVybiAhc3B5LmNhbGxlZDtcbiAgICB9LFxuICAgIFwiZXhwZWN0ZWQgJW4gdG8gbm90IGhhdmUgYmVlbiBjYWxsZWQgYnV0IHdhcyBjYWxsZWQgJWMlQ1wiXG4pO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiY2FsbGVkT25jZVwiLCBcImV4cGVjdGVkICVuIHRvIGJlIGNhbGxlZCBvbmNlIGJ1dCB3YXMgY2FsbGVkICVjJUNcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJjYWxsZWRUd2ljZVwiLCBcImV4cGVjdGVkICVuIHRvIGJlIGNhbGxlZCB0d2ljZSBidXQgd2FzIGNhbGxlZCAlYyVDXCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiY2FsbGVkVGhyaWNlXCIsIFwiZXhwZWN0ZWQgJW4gdG8gYmUgY2FsbGVkIHRocmljZSBidXQgd2FzIGNhbGxlZCAlYyVDXCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiY2FsbGVkT25cIiwgXCJleHBlY3RlZCAlbiB0byBiZSBjYWxsZWQgd2l0aCAlMSBhcyB0aGlzIGJ1dCB3YXMgY2FsbGVkIHdpdGggJXRcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJhbHdheXNDYWxsZWRPblwiLCBcImV4cGVjdGVkICVuIHRvIGFsd2F5cyBiZSBjYWxsZWQgd2l0aCAlMSBhcyB0aGlzIGJ1dCB3YXMgY2FsbGVkIHdpdGggJXRcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJjYWxsZWRXaXRoTmV3XCIsIFwiZXhwZWN0ZWQgJW4gdG8gYmUgY2FsbGVkIHdpdGggbmV3XCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiYWx3YXlzQ2FsbGVkV2l0aE5ld1wiLCBcImV4cGVjdGVkICVuIHRvIGFsd2F5cyBiZSBjYWxsZWQgd2l0aCBuZXdcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJjYWxsZWRXaXRoXCIsIFwiZXhwZWN0ZWQgJW4gdG8gYmUgY2FsbGVkIHdpdGggYXJndW1lbnRzICVEXCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiY2FsbGVkV2l0aE1hdGNoXCIsIFwiZXhwZWN0ZWQgJW4gdG8gYmUgY2FsbGVkIHdpdGggbWF0Y2ggJURcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJhbHdheXNDYWxsZWRXaXRoXCIsIFwiZXhwZWN0ZWQgJW4gdG8gYWx3YXlzIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyAlRFwiKTtcbm1pcnJvclByb3BBc0Fzc2VydGlvbihcImFsd2F5c0NhbGxlZFdpdGhNYXRjaFwiLCBcImV4cGVjdGVkICVuIHRvIGFsd2F5cyBiZSBjYWxsZWQgd2l0aCBtYXRjaCAlRFwiKTtcbm1pcnJvclByb3BBc0Fzc2VydGlvbihcImNhbGxlZFdpdGhFeGFjdGx5XCIsIFwiZXhwZWN0ZWQgJW4gdG8gYmUgY2FsbGVkIHdpdGggZXhhY3QgYXJndW1lbnRzICVEXCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiY2FsbGVkT25jZVdpdGhFeGFjdGx5XCIsIFwiZXhwZWN0ZWQgJW4gdG8gYmUgY2FsbGVkIG9uY2UgYW5kIHdpdGggZXhhY3QgYXJndW1lbnRzICVEXCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwiYWx3YXlzQ2FsbGVkV2l0aEV4YWN0bHlcIiwgXCJleHBlY3RlZCAlbiB0byBhbHdheXMgYmUgY2FsbGVkIHdpdGggZXhhY3QgYXJndW1lbnRzICVEXCIpO1xubWlycm9yUHJvcEFzQXNzZXJ0aW9uKFwibmV2ZXJDYWxsZWRXaXRoXCIsIFwiZXhwZWN0ZWQgJW4gdG8gbmV2ZXIgYmUgY2FsbGVkIHdpdGggYXJndW1lbnRzICUqJUNcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJuZXZlckNhbGxlZFdpdGhNYXRjaFwiLCBcImV4cGVjdGVkICVuIHRvIG5ldmVyIGJlIGNhbGxlZCB3aXRoIG1hdGNoICUqJUNcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJ0aHJld1wiLCBcIiVuIGRpZCBub3QgdGhyb3cgZXhjZXB0aW9uJUNcIik7XG5taXJyb3JQcm9wQXNBc3NlcnRpb24oXCJhbHdheXNUaHJld1wiLCBcIiVuIGRpZCBub3QgYWx3YXlzIHRocm93IGV4Y2VwdGlvbiVDXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2VydDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyYXlQcm90byA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2V4dGVuZFwiKTtcbnZhciBmdW5jdGlvbk5hbWUgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5mdW5jdGlvbk5hbWU7XG52YXIgbmV4dFRpY2sgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvbmV4dC10aWNrXCIpO1xudmFyIHZhbHVlVG9TdHJpbmcgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS52YWx1ZVRvU3RyaW5nO1xudmFyIGV4cG9ydEFzeW5jQmVoYXZpb3JzID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2V4cG9ydC1hc3luYy1iZWhhdmlvcnNcIik7XG5cbnZhciBjb25jYXQgPSBhcnJheVByb3RvLmNvbmNhdDtcbnZhciBqb2luID0gYXJyYXlQcm90by5qb2luO1xudmFyIHJldmVyc2UgPSBhcnJheVByb3RvLnJldmVyc2U7XG52YXIgc2xpY2UgPSBhcnJheVByb3RvLnNsaWNlO1xuXG52YXIgdXNlTGVmdE1vc3RDYWxsYmFjayA9IC0xO1xudmFyIHVzZVJpZ2h0TW9zdENhbGxiYWNrID0gLTI7XG5cbmZ1bmN0aW9uIGdldENhbGxiYWNrKGJlaGF2aW9yLCBhcmdzKSB7XG4gICAgdmFyIGNhbGxBcmdBdCA9IGJlaGF2aW9yLmNhbGxBcmdBdDtcblxuICAgIGlmIChjYWxsQXJnQXQgPj0gMCkge1xuICAgICAgICByZXR1cm4gYXJnc1tjYWxsQXJnQXRdO1xuICAgIH1cblxuICAgIHZhciBhcmd1bWVudExpc3Q7XG5cbiAgICBpZiAoY2FsbEFyZ0F0ID09PSB1c2VMZWZ0TW9zdENhbGxiYWNrKSB7XG4gICAgICAgIGFyZ3VtZW50TGlzdCA9IGFyZ3M7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxBcmdBdCA9PT0gdXNlUmlnaHRNb3N0Q2FsbGJhY2spIHtcbiAgICAgICAgYXJndW1lbnRMaXN0ID0gcmV2ZXJzZShzbGljZShhcmdzKSk7XG4gICAgfVxuXG4gICAgdmFyIGNhbGxBcmdQcm9wID0gYmVoYXZpb3IuY2FsbEFyZ1Byb3A7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50TGlzdC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgaWYgKCFjYWxsQXJnUHJvcCAmJiB0eXBlb2YgYXJndW1lbnRMaXN0W2ldID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudExpc3RbaV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbEFyZ1Byb3AgJiYgYXJndW1lbnRMaXN0W2ldICYmIHR5cGVvZiBhcmd1bWVudExpc3RbaV1bY2FsbEFyZ1Byb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudExpc3RbaV1bY2FsbEFyZ1Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldENhbGxiYWNrRXJyb3IoYmVoYXZpb3IsIGZ1bmMsIGFyZ3MpIHtcbiAgICBpZiAoYmVoYXZpb3IuY2FsbEFyZ0F0IDwgMCkge1xuICAgICAgICB2YXIgbXNnO1xuXG4gICAgICAgIGlmIChiZWhhdmlvci5jYWxsQXJnUHJvcCkge1xuICAgICAgICAgICAgbXNnID1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbk5hbWUoYmVoYXZpb3Iuc3R1YikgK1xuICAgICAgICAgICAgICAgIFwiIGV4cGVjdGVkIHRvIHlpZWxkIHRvICdcIiArXG4gICAgICAgICAgICAgICAgdmFsdWVUb1N0cmluZyhiZWhhdmlvci5jYWxsQXJnUHJvcCkgK1xuICAgICAgICAgICAgICAgIFwiJywgYnV0IG5vIG9iamVjdCB3aXRoIHN1Y2ggYSBwcm9wZXJ0eSB3YXMgcGFzc2VkLlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXNnID0gZnVuY3Rpb25OYW1lKGJlaGF2aW9yLnN0dWIpICsgXCIgZXhwZWN0ZWQgdG8geWllbGQsIGJ1dCBubyBjYWxsYmFjayB3YXMgcGFzc2VkLlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbXNnICs9IFwiIFJlY2VpdmVkIFtcIiArIGpvaW4oYXJncywgXCIsIFwiKSArIFwiXVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1zZztcbiAgICB9XG5cbiAgICByZXR1cm4gXCJhcmd1bWVudCBhdCBpbmRleCBcIiArIGJlaGF2aW9yLmNhbGxBcmdBdCArIFwiIGlzIG5vdCBhIGZ1bmN0aW9uOiBcIiArIGZ1bmM7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZUFyZ3MobmFtZSwgYmVoYXZpb3IsIGFyZ3MpIHtcbiAgICAvLyBtYXAgZnVuY3Rpb24gbmFtZSB0byBpbnRlcm5hbCBwcm9wZXJ0eVxuICAgIC8vICAgY2FsbHNBcmcgPT4gY2FsbEFyZ0F0XG4gICAgdmFyIHByb3BlcnR5ID0gbmFtZS5yZXBsYWNlKC9zQXJnLywgXCJBcmdBdFwiKTtcbiAgICB2YXIgaW5kZXggPSBiZWhhdmlvcltwcm9wZXJ0eV07XG5cbiAgICBpZiAoaW5kZXggPj0gYXJncy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgIG5hbWUgKyBcIiBmYWlsZWQ6IFwiICsgKGluZGV4ICsgMSkgKyBcIiBhcmd1bWVudHMgcmVxdWlyZWQgYnV0IG9ubHkgXCIgKyBhcmdzLmxlbmd0aCArIFwiIHByZXNlbnRcIlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsbENhbGxiYWNrKGJlaGF2aW9yLCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiBiZWhhdmlvci5jYWxsQXJnQXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgZW5zdXJlQXJncyhcImNhbGxzQXJnXCIsIGJlaGF2aW9yLCBhcmdzKTtcbiAgICAgICAgdmFyIGZ1bmMgPSBnZXRDYWxsYmFjayhiZWhhdmlvciwgYXJncyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmdW5jICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoZ2V0Q2FsbGJhY2tFcnJvcihiZWhhdmlvciwgZnVuYywgYXJncykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yLmNhbGxiYWNrQXN5bmMpIHtcbiAgICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoYmVoYXZpb3IuY2FsbGJhY2tDb250ZXh0LCBiZWhhdmlvci5jYWxsYmFja0FyZ3VtZW50cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KGJlaGF2aW9yLmNhbGxiYWNrQ29udGV4dCwgYmVoYXZpb3IuY2FsbGJhY2tBcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxudmFyIHByb3RvID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKHN0dWIpIHtcbiAgICAgICAgdmFyIGJlaGF2aW9yID0gZXh0ZW5kKHt9LCBwcm90byk7XG4gICAgICAgIGRlbGV0ZSBiZWhhdmlvci5jcmVhdGU7XG4gICAgICAgIGRlbGV0ZSBiZWhhdmlvci5hZGRCZWhhdmlvcjtcbiAgICAgICAgZGVsZXRlIGJlaGF2aW9yLmNyZWF0ZUJlaGF2aW9yO1xuICAgICAgICBiZWhhdmlvci5zdHViID0gc3R1YjtcblxuICAgICAgICBpZiAoc3R1Yi5kZWZhdWx0QmVoYXZpb3IgJiYgc3R1Yi5kZWZhdWx0QmVoYXZpb3IucHJvbWlzZUxpYnJhcnkpIHtcbiAgICAgICAgICAgIGJlaGF2aW9yLnByb21pc2VMaWJyYXJ5ID0gc3R1Yi5kZWZhdWx0QmVoYXZpb3IucHJvbWlzZUxpYnJhcnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmVoYXZpb3I7XG4gICAgfSxcblxuICAgIGlzUHJlc2VudDogZnVuY3Rpb24gaXNQcmVzZW50KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuY2FsbEFyZ0F0ID09PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICB0aGlzLmV4Y2VwdGlvbiB8fFxuICAgICAgICAgICAgdGhpcy5leGNlcHRpb25DcmVhdG9yIHx8XG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5yZXR1cm5BcmdBdCA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgICAgICAgdGhpcy5yZXR1cm5UaGlzIHx8XG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5yZXNvbHZlQXJnQXQgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVRoaXMgfHxcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnRocm93QXJnQXQgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgIHRoaXMuZmFrZUZuIHx8XG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlRGVmaW5lZFxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKmVzbGludCBjb21wbGV4aXR5OiBbXCJlcnJvclwiLCAyMF0qL1xuICAgIGludm9rZTogZnVuY3Rpb24gaW52b2tlKGNvbnRleHQsIGFyZ3MpIHtcbiAgICAgICAgLypcbiAgICAgICAgICogY2FsbENhbGxiYWNrIChjb25kaXRpb25hbGx5KSBjYWxscyBlbnN1cmVBcmdzXG4gICAgICAgICAqXG4gICAgICAgICAqIE5vdGU6IGNhbGxDYWxsYmFjayBpbnRlbnRpb25hbGx5IGhhcHBlbnMgYmVmb3JlXG4gICAgICAgICAqIGV2ZXJ5dGhpbmcgZWxzZSBhbmQgY2Fubm90IGJlIG1vdmVkIGxvd2VyXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSBjYWxsQ2FsbGJhY2sodGhpcywgYXJncyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyB0aGlzLmV4Y2VwdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmV4Y2VwdGlvbkNyZWF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZXhjZXB0aW9uID0gdGhpcy5leGNlcHRpb25DcmVhdG9yKCk7XG4gICAgICAgICAgICB0aGlzLmV4Y2VwdGlvbkNyZWF0b3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aHJvdyB0aGlzLmV4Y2VwdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5yZXR1cm5BcmdBdCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZW5zdXJlQXJncyhcInJldHVybnNBcmdcIiwgdGhpcywgYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gYXJnc1t0aGlzLnJldHVybkFyZ0F0XTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJldHVyblRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRocm93QXJnQXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGVuc3VyZUFyZ3MoXCJ0aHJvd3NBcmdcIiwgdGhpcywgYXJncyk7XG4gICAgICAgICAgICB0aHJvdyBhcmdzW3RoaXMudGhyb3dBcmdBdF07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mYWtlRm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZha2VGbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5yZXNvbHZlQXJnQXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGVuc3VyZUFyZ3MoXCJyZXNvbHZlc0FyZ1wiLCB0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5wcm9taXNlTGlicmFyeSB8fCBQcm9taXNlKS5yZXNvbHZlKGFyZ3NbdGhpcy5yZXNvbHZlQXJnQXRdKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlc29sdmVUaGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMucHJvbWlzZUxpYnJhcnkgfHwgUHJvbWlzZSkucmVzb2x2ZShjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlc29sdmUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5wcm9taXNlTGlicmFyeSB8fCBQcm9taXNlKS5yZXNvbHZlKHRoaXMucmV0dXJuVmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMucHJvbWlzZUxpYnJhcnkgfHwgUHJvbWlzZSkucmVqZWN0KHRoaXMucmV0dXJuVmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FsbHNUaHJvdWdoKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlZE1ldGhvZCA9IHRoaXMuZWZmZWN0aXZlV3JhcHBlZE1ldGhvZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlZE1ldGhvZC5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbGxzVGhyb3VnaFdpdGhOZXcpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgb3JpZ2luYWwgbWV0aG9kIChhc3N1bWVkIHRvIGJlIGEgY29uc3RydWN0b3IgaW4gdGhpcyBjYXNlKVxuICAgICAgICAgICAgdmFyIFdyYXBwZWRDbGFzcyA9IHRoaXMuZWZmZWN0aXZlV3JhcHBlZE1ldGhvZCgpO1xuICAgICAgICAgICAgLy8gVHVybiB0aGUgYXJndW1lbnRzIG9iamVjdCBpbnRvIGEgbm9ybWFsIGFycmF5XG4gICAgICAgICAgICB2YXIgYXJnc0FycmF5ID0gc2xpY2UoYXJncyk7XG4gICAgICAgICAgICAvLyBDYWxsIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgdmFyIEYgPSBXcmFwcGVkQ2xhc3MuYmluZC5hcHBseShXcmFwcGVkQ2xhc3MsIGNvbmNhdChbbnVsbF0sIGFyZ3NBcnJheSkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucmV0dXJuVmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJldHVyblZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNhbGxBcmdBdCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuVmFsdWU7XG4gICAgfSxcblxuICAgIGVmZmVjdGl2ZVdyYXBwZWRNZXRob2Q6IGZ1bmN0aW9uIGVmZmVjdGl2ZVdyYXBwZWRNZXRob2QoKSB7XG4gICAgICAgIGZvciAodmFyIHN0dWJiID0gdGhpcy5zdHViOyBzdHViYjsgc3R1YmIgPSBzdHViYi5wYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChzdHViYi53cmFwcGVkTWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0dWJiLndyYXBwZWRNZXRob2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGZpbmQgd3JhcHBlZCBtZXRob2RcIik7XG4gICAgfSxcblxuICAgIG9uQ2FsbDogZnVuY3Rpb24gb25DYWxsKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0dWIub25DYWxsKGluZGV4KTtcbiAgICB9LFxuXG4gICAgb25GaXJzdENhbGw6IGZ1bmN0aW9uIG9uRmlyc3RDYWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHViLm9uRmlyc3RDYWxsKCk7XG4gICAgfSxcblxuICAgIG9uU2Vjb25kQ2FsbDogZnVuY3Rpb24gb25TZWNvbmRDYWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHViLm9uU2Vjb25kQ2FsbCgpO1xuICAgIH0sXG5cbiAgICBvblRoaXJkQ2FsbDogZnVuY3Rpb24gb25UaGlyZENhbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0dWIub25UaGlyZENhbGwoKTtcbiAgICB9LFxuXG4gICAgd2l0aEFyZ3M6IGZ1bmN0aW9uIHdpdGhBcmdzKC8qIGFyZ3VtZW50cyAqLykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnRGVmaW5pbmcgYSBzdHViIGJ5IGludm9raW5nIFwic3R1Yi5vbkNhbGwoLi4uKS53aXRoQXJncyguLi4pXCIgJyArXG4gICAgICAgICAgICAgICAgJ2lzIG5vdCBzdXBwb3J0ZWQuIFVzZSBcInN0dWIud2l0aEFyZ3MoLi4uKS5vbkNhbGwoLi4uKVwiICcgK1xuICAgICAgICAgICAgICAgIFwidG8gZGVmaW5lIHNlcXVlbnRpYWwgYmVoYXZpb3IgZm9yIGNhbGxzIHdpdGggY2VydGFpbiBhcmd1bWVudHMuXCJcbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCZWhhdmlvcihiZWhhdmlvck1ldGhvZCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0QmVoYXZpb3IgPSB0aGlzLmRlZmF1bHRCZWhhdmlvciB8fCBwcm90by5jcmVhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuZGVmYXVsdEJlaGF2aW9yW2JlaGF2aW9yTWV0aG9kXS5hcHBseSh0aGlzLmRlZmF1bHRCZWhhdmlvciwgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYWRkQmVoYXZpb3Ioc3R1YiwgbmFtZSwgZm4pIHtcbiAgICBwcm90b1tuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmbi5hcHBseSh0aGlzLCBjb25jYXQoW3RoaXNdLCBzbGljZShhcmd1bWVudHMpKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnN0dWIgfHwgdGhpcztcbiAgICB9O1xuXG4gICAgc3R1YltuYW1lXSA9IGNyZWF0ZUJlaGF2aW9yKG5hbWUpO1xufVxuXG5wcm90by5hZGRCZWhhdmlvciA9IGFkZEJlaGF2aW9yO1xucHJvdG8uY3JlYXRlQmVoYXZpb3IgPSBjcmVhdGVCZWhhdmlvcjtcblxudmFyIGFzeW5jQmVoYXZpb3JzID0gZXhwb3J0QXN5bmNCZWhhdmlvcnMocHJvdG8pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZC5ub25FbnVtKHt9LCBwcm90bywgYXN5bmNCZWhhdmlvcnMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB3YWxrID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3dhbGtcIik7XG52YXIgZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2dldC1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpO1xudmFyIGhhc093blByb3BlcnR5ID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5vYmplY3QuaGFzT3duUHJvcGVydHk7XG52YXIgcHVzaCA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXkucHVzaDtcblxuZnVuY3Rpb24gY29sbGVjdE1ldGhvZChtZXRob2RzLCBvYmplY3QsIHByb3AsIHByb3BPd25lcikge1xuICAgIGlmICh0eXBlb2YgZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHByb3BPd25lciwgcHJvcCkudmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJiBoYXNPd25Qcm9wZXJ0eShvYmplY3QsIHByb3ApKSB7XG4gICAgICAgIHB1c2gobWV0aG9kcywgb2JqZWN0W3Byb3BdKTtcbiAgICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG93biBtZXRob2RzIG9uIHRoZSBwYXNzZWQgb2JqZWN0XG5mdW5jdGlvbiBjb2xsZWN0T3duTWV0aG9kcyhvYmplY3QpIHtcbiAgICB2YXIgbWV0aG9kcyA9IFtdO1xuXG4gICAgd2FsayhvYmplY3QsIGNvbGxlY3RNZXRob2QuYmluZChudWxsLCBtZXRob2RzLCBvYmplY3QpKTtcblxuICAgIHJldHVybiBtZXRob2RzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbGxlY3RPd25NZXRob2RzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdXBwb3J0c0NvbG9yID0gcmVxdWlyZShcInN1cHBvcnRzLWNvbG9yXCIpO1xuXG5mdW5jdGlvbiBjb2xvcml6ZShzdHIsIGNvbG9yKSB7XG4gICAgaWYgKHN1cHBvcnRzQ29sb3Iuc3Rkb3V0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHJldHVybiBcIlxceDFiW1wiICsgY29sb3IgKyBcIm1cIiArIHN0ciArIFwiXFx4MWJbMG1cIjtcbn1cblxuZXhwb3J0cy5yZWQgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gY29sb3JpemUoc3RyLCAzMSk7XG59O1xuXG5leHBvcnRzLmdyZWVuID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIGNvbG9yaXplKHN0ciwgMzIpO1xufTtcblxuZXhwb3J0cy5jeWFuID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIGNvbG9yaXplKHN0ciwgOTYpO1xufTtcblxuZXhwb3J0cy53aGl0ZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBjb2xvcml6ZShzdHIsIDM5KTtcbn07XG5cbmV4cG9ydHMuYm9sZCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBjb2xvcml6ZShzdHIsIDEpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyYXlQcm90byA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXk7XG52YXIgU2FuZGJveCA9IHJlcXVpcmUoXCIuL3NhbmRib3hcIik7XG5cbnZhciBmb3JFYWNoID0gYXJyYXlQcm90by5mb3JFYWNoO1xudmFyIHB1c2ggPSBhcnJheVByb3RvLnB1c2g7XG5cbmZ1bmN0aW9uIHByZXBhcmVTYW5kYm94RnJvbUNvbmZpZyhjb25maWcpIHtcbiAgICB2YXIgc2FuZGJveCA9IG5ldyBTYW5kYm94KCk7XG5cbiAgICBpZiAoY29uZmlnLnVzZUZha2VTZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcudXNlRmFrZVNlcnZlciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgc2FuZGJveC5zZXJ2ZXJQcm90b3R5cGUgPSBjb25maWcudXNlRmFrZVNlcnZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhbmRib3gudXNlRmFrZVNlcnZlcigpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcudXNlRmFrZVRpbWVycykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy51c2VGYWtlVGltZXJzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBzYW5kYm94LnVzZUZha2VUaW1lcnMoY29uZmlnLnVzZUZha2VUaW1lcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2FuZGJveC51c2VGYWtlVGltZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2FuZGJveDtcbn1cblxuZnVuY3Rpb24gZXhwb3NlVmFsdWUoc2FuZGJveCwgY29uZmlnLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5pbmplY3RJbnRvICYmICEoa2V5IGluIGNvbmZpZy5pbmplY3RJbnRvKSkge1xuICAgICAgICBjb25maWcuaW5qZWN0SW50b1trZXldID0gdmFsdWU7XG4gICAgICAgIHB1c2goc2FuZGJveC5pbmplY3RlZEtleXMsIGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHVzaChzYW5kYm94LmFyZ3MsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNhbmRib3goY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTYW5kYm94KCk7XG4gICAgfVxuXG4gICAgdmFyIGNvbmZpZ3VyZWRTYW5kYm94ID0gcHJlcGFyZVNhbmRib3hGcm9tQ29uZmlnKGNvbmZpZyk7XG4gICAgY29uZmlndXJlZFNhbmRib3guYXJncyA9IGNvbmZpZ3VyZWRTYW5kYm94LmFyZ3MgfHwgW107XG4gICAgY29uZmlndXJlZFNhbmRib3guaW5qZWN0ZWRLZXlzID0gW107XG4gICAgY29uZmlndXJlZFNhbmRib3guaW5qZWN0SW50byA9IGNvbmZpZy5pbmplY3RJbnRvO1xuICAgIHZhciBleHBvc2VkID0gY29uZmlndXJlZFNhbmRib3guaW5qZWN0KHt9KTtcblxuICAgIGlmIChjb25maWcucHJvcGVydGllcykge1xuICAgICAgICBmb3JFYWNoKGNvbmZpZy5wcm9wZXJ0aWVzLCBmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBleHBvc2VkW3Byb3BdIHx8IChwcm9wID09PSBcInNhbmRib3hcIiAmJiBjb25maWd1cmVkU2FuZGJveCk7XG4gICAgICAgICAgICBleHBvc2VWYWx1ZShjb25maWd1cmVkU2FuZGJveCwgY29uZmlnLCBwcm9wLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGV4cG9zZVZhbHVlKGNvbmZpZ3VyZWRTYW5kYm94LCBjb25maWcsIFwic2FuZGJveFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlndXJlZFNhbmRib3g7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2FuZGJveDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyYXlQcm90byA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXk7XG52YXIgaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZSA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9pcy1wcm9wZXJ0eS1jb25maWd1cmFibGVcIik7XG52YXIgZXhwb3J0QXN5bmNCZWhhdmlvcnMgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvZXhwb3J0LWFzeW5jLWJlaGF2aW9yc1wiKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvZXh0ZW5kXCIpO1xuXG52YXIgc2xpY2UgPSBhcnJheVByb3RvLnNsaWNlO1xuXG52YXIgdXNlTGVmdE1vc3RDYWxsYmFjayA9IC0xO1xudmFyIHVzZVJpZ2h0TW9zdENhbGxiYWNrID0gLTI7XG5cbmZ1bmN0aW9uIHRocm93c0V4Y2VwdGlvbihmYWtlLCBlcnJvciwgbWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBmYWtlLmV4Y2VwdGlvbkNyZWF0b3IgPSBlcnJvcjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBmYWtlLmV4Y2VwdGlvbkNyZWF0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBuZXdFeGNlcHRpb24gPSBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgICAgIG5ld0V4Y2VwdGlvbi5uYW1lID0gZXJyb3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3RXhjZXB0aW9uO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIWVycm9yKSB7XG4gICAgICAgIGZha2UuZXhjZXB0aW9uQ3JlYXRvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkVycm9yXCIpO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZha2UuZXhjZXB0aW9uID0gZXJyb3I7XG4gICAgfVxufVxuXG52YXIgZGVmYXVsdEJlaGF2aW9ycyA9IHtcbiAgICBjYWxsc0Zha2U6IGZ1bmN0aW9uIGNhbGxzRmFrZShmYWtlLCBmbikge1xuICAgICAgICBmYWtlLmZha2VGbiA9IGZuO1xuICAgIH0sXG5cbiAgICBjYWxsc0FyZzogZnVuY3Rpb24gY2FsbHNBcmcoZmFrZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFyZ3VtZW50IGluZGV4IGlzIG5vdCBudW1iZXJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmYWtlLmNhbGxBcmdBdCA9IGluZGV4O1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXJndW1lbnRzID0gW107XG4gICAgICAgIGZha2UuY2FsbGJhY2tDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxBcmdQcm9wID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXN5bmMgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgY2FsbHNBcmdPbjogZnVuY3Rpb24gY2FsbHNBcmdPbihmYWtlLCBpbmRleCwgY29udGV4dCkge1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXJndW1lbnQgaW5kZXggaXMgbm90IG51bWJlclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZha2UuY2FsbEFyZ0F0ID0gaW5kZXg7XG4gICAgICAgIGZha2UuY2FsbGJhY2tBcmd1bWVudHMgPSBbXTtcbiAgICAgICAgZmFrZS5jYWxsYmFja0NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICBmYWtlLmNhbGxBcmdQcm9wID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXN5bmMgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgY2FsbHNBcmdXaXRoOiBmdW5jdGlvbiBjYWxsc0FyZ1dpdGgoZmFrZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFyZ3VtZW50IGluZGV4IGlzIG5vdCBudW1iZXJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmYWtlLmNhbGxBcmdBdCA9IGluZGV4O1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXJndW1lbnRzID0gc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgZmFrZS5jYWxsYmFja0NvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZha2UuY2FsbEFyZ1Byb3AgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZha2UuY2FsbGJhY2tBc3luYyA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBjYWxsc0FyZ09uV2l0aDogZnVuY3Rpb24gY2FsbHNBcmdXaXRoKGZha2UsIGluZGV4LCBjb250ZXh0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBpbmRleCBpcyBub3QgbnVtYmVyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmFrZS5jYWxsQXJnQXQgPSBpbmRleDtcbiAgICAgICAgZmFrZS5jYWxsYmFja0FyZ3VtZW50cyA9IHNsaWNlKGFyZ3VtZW50cywgMyk7XG4gICAgICAgIGZha2UuY2FsbGJhY2tDb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgZmFrZS5jYWxsQXJnUHJvcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZmFrZS5jYWxsYmFja0FzeW5jID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHVzaW5nUHJvbWlzZTogZnVuY3Rpb24gdXNpbmdQcm9taXNlKGZha2UsIHByb21pc2VMaWJyYXJ5KSB7XG4gICAgICAgIGZha2UucHJvbWlzZUxpYnJhcnkgPSBwcm9taXNlTGlicmFyeTtcbiAgICB9LFxuXG4gICAgeWllbGRzOiBmdW5jdGlvbihmYWtlKSB7XG4gICAgICAgIGZha2UuY2FsbEFyZ0F0ID0gdXNlTGVmdE1vc3RDYWxsYmFjaztcbiAgICAgICAgZmFrZS5jYWxsYmFja0FyZ3VtZW50cyA9IHNsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGZha2UuY2FsbGJhY2tDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxBcmdQcm9wID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXN5bmMgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgeWllbGRzUmlnaHQ6IGZ1bmN0aW9uKGZha2UpIHtcbiAgICAgICAgZmFrZS5jYWxsQXJnQXQgPSB1c2VSaWdodE1vc3RDYWxsYmFjaztcbiAgICAgICAgZmFrZS5jYWxsYmFja0FyZ3VtZW50cyA9IHNsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGZha2UuY2FsbGJhY2tDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxBcmdQcm9wID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXN5bmMgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgeWllbGRzT246IGZ1bmN0aW9uKGZha2UsIGNvbnRleHQpIHtcbiAgICAgICAgZmFrZS5jYWxsQXJnQXQgPSB1c2VMZWZ0TW9zdENhbGxiYWNrO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXJndW1lbnRzID0gc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgZmFrZS5jYWxsYmFja0NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICBmYWtlLmNhbGxBcmdQcm9wID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXN5bmMgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgeWllbGRzVG86IGZ1bmN0aW9uKGZha2UsIHByb3ApIHtcbiAgICAgICAgZmFrZS5jYWxsQXJnQXQgPSB1c2VMZWZ0TW9zdENhbGxiYWNrO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXJndW1lbnRzID0gc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgZmFrZS5jYWxsYmFja0NvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZha2UuY2FsbEFyZ1Byb3AgPSBwcm9wO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXN5bmMgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgeWllbGRzVG9PbjogZnVuY3Rpb24oZmFrZSwgcHJvcCwgY29udGV4dCkge1xuICAgICAgICBmYWtlLmNhbGxBcmdBdCA9IHVzZUxlZnRNb3N0Q2FsbGJhY2s7XG4gICAgICAgIGZha2UuY2FsbGJhY2tBcmd1bWVudHMgPSBzbGljZShhcmd1bWVudHMsIDMpO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIGZha2UuY2FsbEFyZ1Byb3AgPSBwcm9wO1xuICAgICAgICBmYWtlLmNhbGxiYWNrQXN5bmMgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgdGhyb3dzOiB0aHJvd3NFeGNlcHRpb24sXG4gICAgdGhyb3dzRXhjZXB0aW9uOiB0aHJvd3NFeGNlcHRpb24sXG5cbiAgICByZXR1cm5zOiBmdW5jdGlvbiByZXR1cm5zKGZha2UsIHZhbHVlKSB7XG4gICAgICAgIGZha2UucmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZmFrZS5yZXNvbHZlID0gZmFsc2U7XG4gICAgICAgIGZha2UucmVqZWN0ID0gZmFsc2U7XG4gICAgICAgIGZha2UucmV0dXJuVmFsdWVEZWZpbmVkID0gdHJ1ZTtcbiAgICAgICAgZmFrZS5leGNlcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZha2UuZXhjZXB0aW9uQ3JlYXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgZmFrZS5mYWtlRm4gPSB1bmRlZmluZWQ7XG4gICAgfSxcblxuICAgIHJldHVybnNBcmc6IGZ1bmN0aW9uIHJldHVybnNBcmcoZmFrZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFyZ3VtZW50IGluZGV4IGlzIG5vdCBudW1iZXJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmYWtlLnJldHVybkFyZ0F0ID0gaW5kZXg7XG4gICAgfSxcblxuICAgIHRocm93c0FyZzogZnVuY3Rpb24gdGhyb3dzQXJnKGZha2UsIGluZGV4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBpbmRleCBpcyBub3QgbnVtYmVyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmFrZS50aHJvd0FyZ0F0ID0gaW5kZXg7XG4gICAgfSxcblxuICAgIHJldHVybnNUaGlzOiBmdW5jdGlvbiByZXR1cm5zVGhpcyhmYWtlKSB7XG4gICAgICAgIGZha2UucmV0dXJuVGhpcyA9IHRydWU7XG4gICAgfSxcblxuICAgIHJlc29sdmVzOiBmdW5jdGlvbiByZXNvbHZlcyhmYWtlLCB2YWx1ZSkge1xuICAgICAgICBmYWtlLnJldHVyblZhbHVlID0gdmFsdWU7XG4gICAgICAgIGZha2UucmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIGZha2UucmVzb2x2ZVRoaXMgPSBmYWxzZTtcbiAgICAgICAgZmFrZS5yZWplY3QgPSBmYWxzZTtcbiAgICAgICAgZmFrZS5yZXR1cm5WYWx1ZURlZmluZWQgPSB0cnVlO1xuICAgICAgICBmYWtlLmV4Y2VwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgZmFrZS5leGNlcHRpb25DcmVhdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmZha2VGbiA9IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgcmVzb2x2ZXNBcmc6IGZ1bmN0aW9uIHJlc29sdmVzQXJnKGZha2UsIGluZGV4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBpbmRleCBpcyBub3QgbnVtYmVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZha2UucmVzb2x2ZUFyZ0F0ID0gaW5kZXg7XG4gICAgICAgIGZha2UucmV0dXJuVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZha2UucmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIGZha2UucmVzb2x2ZVRoaXMgPSBmYWxzZTtcbiAgICAgICAgZmFrZS5yZWplY3QgPSBmYWxzZTtcbiAgICAgICAgZmFrZS5yZXR1cm5WYWx1ZURlZmluZWQgPSBmYWxzZTtcbiAgICAgICAgZmFrZS5leGNlcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZha2UuZXhjZXB0aW9uQ3JlYXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgZmFrZS5mYWtlRm4gPSB1bmRlZmluZWQ7XG4gICAgfSxcblxuICAgIHJlamVjdHM6IGZ1bmN0aW9uIHJlamVjdHMoZmFrZSwgZXJyb3IsIG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHJlYXNvbjtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmVhc29uID0gbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJcIik7XG4gICAgICAgICAgICByZWFzb24ubmFtZSA9IGVycm9yO1xuICAgICAgICB9IGVsc2UgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgcmVhc29uID0gbmV3IEVycm9yKFwiRXJyb3JcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWFzb24gPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBmYWtlLnJldHVyblZhbHVlID0gcmVhc29uO1xuICAgICAgICBmYWtlLnJlc29sdmUgPSBmYWxzZTtcbiAgICAgICAgZmFrZS5yZXNvbHZlVGhpcyA9IGZhbHNlO1xuICAgICAgICBmYWtlLnJlamVjdCA9IHRydWU7XG4gICAgICAgIGZha2UucmV0dXJuVmFsdWVEZWZpbmVkID0gdHJ1ZTtcbiAgICAgICAgZmFrZS5leGNlcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZha2UuZXhjZXB0aW9uQ3JlYXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgZmFrZS5mYWtlRm4gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIGZha2U7XG4gICAgfSxcblxuICAgIHJlc29sdmVzVGhpczogZnVuY3Rpb24gcmVzb2x2ZXNUaGlzKGZha2UpIHtcbiAgICAgICAgZmFrZS5yZXR1cm5WYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZmFrZS5yZXNvbHZlID0gZmFsc2U7XG4gICAgICAgIGZha2UucmVzb2x2ZVRoaXMgPSB0cnVlO1xuICAgICAgICBmYWtlLnJlamVjdCA9IGZhbHNlO1xuICAgICAgICBmYWtlLnJldHVyblZhbHVlRGVmaW5lZCA9IGZhbHNlO1xuICAgICAgICBmYWtlLmV4Y2VwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgZmFrZS5leGNlcHRpb25DcmVhdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICBmYWtlLmZha2VGbiA9IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgY2FsbFRocm91Z2g6IGZ1bmN0aW9uIGNhbGxUaHJvdWdoKGZha2UpIHtcbiAgICAgICAgZmFrZS5jYWxsc1Rocm91Z2ggPSB0cnVlO1xuICAgIH0sXG5cbiAgICBjYWxsVGhyb3VnaFdpdGhOZXc6IGZ1bmN0aW9uIGNhbGxUaHJvdWdoV2l0aE5ldyhmYWtlKSB7XG4gICAgICAgIGZha2UuY2FsbHNUaHJvdWdoV2l0aE5ldyA9IHRydWU7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KGZha2UsIGdldHRlckZ1bmN0aW9uKSB7XG4gICAgICAgIHZhciByb290U3R1YiA9IGZha2Uuc3R1YiB8fCBmYWtlO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyb290U3R1Yi5yb290T2JqLCByb290U3R1Yi5wcm9wTmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJGdW5jdGlvbixcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZShyb290U3R1Yi5yb290T2JqLCByb290U3R1Yi5wcm9wTmFtZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZha2U7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24gc2V0KGZha2UsIHNldHRlckZ1bmN0aW9uKSB7XG4gICAgICAgIHZhciByb290U3R1YiA9IGZha2Uuc3R1YiB8fCBmYWtlO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgICAgICAgICAgIHJvb3RTdHViLnJvb3RPYmosXG4gICAgICAgICAgICByb290U3R1Yi5wcm9wTmFtZSxcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhY2Nlc3Nvci1wYWlyc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNldDogc2V0dGVyRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBpc1Byb3BlcnR5Q29uZmlndXJhYmxlKHJvb3RTdHViLnJvb3RPYmosIHJvb3RTdHViLnByb3BOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBmYWtlO1xuICAgIH0sXG5cbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZmFrZSwgbmV3VmFsKSB7XG4gICAgICAgIHZhciByb290U3R1YiA9IGZha2Uuc3R1YiB8fCBmYWtlO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyb290U3R1Yi5yb290T2JqLCByb290U3R1Yi5wcm9wTmFtZSwge1xuICAgICAgICAgICAgdmFsdWU6IG5ld1ZhbCxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGlzUHJvcGVydHlDb25maWd1cmFibGUocm9vdFN0dWIucm9vdE9iaiwgcm9vdFN0dWIucHJvcE5hbWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWtlO1xuICAgIH1cbn07XG5cbnZhciBhc3luY0JlaGF2aW9ycyA9IGV4cG9ydEFzeW5jQmVoYXZpb3JzKGRlZmF1bHRCZWhhdmlvcnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZCh7fSwgZGVmYXVsdEJlaGF2aW9ycywgYXN5bmNCZWhhdmlvcnMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheVByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheTtcbnZhciBjcmVhdGVQcm94eSA9IHJlcXVpcmUoXCIuL3Byb3h5XCIpO1xudmFyIG5leHRUaWNrID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL25leHQtdGlja1wiKTtcblxudmFyIHNsaWNlID0gYXJyYXlQcm90by5zbGljZTtcblxuZnVuY3Rpb24gZ2V0RXJyb3IodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBFcnJvciA/IHZhbHVlIDogbmV3IEVycm9yKHZhbHVlKTtcbn1cblxudmFyIHV1aWQgPSAwO1xuZnVuY3Rpb24gd3JhcEZ1bmMoZikge1xuICAgIHZhciBwcm94eTtcbiAgICB2YXIgZmFrZUluc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsYXN0QXJnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBsYXN0QXJnICYmIHR5cGVvZiBsYXN0QXJnID09PSBcImZ1bmN0aW9uXCIgPyBsYXN0QXJnIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHByb3h5Lmxhc3RBcmcgPSBsYXN0QXJnO1xuICAgICAgICBwcm94eS5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgICAgIHJldHVybiBmICYmIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIHByb3h5ID0gY3JlYXRlUHJveHkoZmFrZUluc3RhbmNlLCBmIHx8IGZha2VJbnN0YW5jZSk7XG5cbiAgICBwcm94eS5kaXNwbGF5TmFtZSA9IFwiZmFrZVwiO1xuICAgIHByb3h5LmlkID0gXCJmYWtlI1wiICsgdXVpZCsrO1xuXG4gICAgcmV0dXJuIHByb3h5O1xufVxuXG5mdW5jdGlvbiBmYWtlKGYpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgZiBhcmd1bWVudCB0byBiZSBhIEZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwRnVuYyhmKTtcbn1cblxuZmFrZS5yZXR1cm5zID0gZnVuY3Rpb24gcmV0dXJucyh2YWx1ZSkge1xuICAgIGZ1bmN0aW9uIGYoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcEZ1bmMoZik7XG59O1xuXG5mYWtlLnRocm93cyA9IGZ1bmN0aW9uIHRocm93cyh2YWx1ZSkge1xuICAgIGZ1bmN0aW9uIGYoKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcEZ1bmMoZik7XG59O1xuXG5mYWtlLnJlc29sdmVzID0gZnVuY3Rpb24gcmVzb2x2ZXModmFsdWUpIHtcbiAgICBmdW5jdGlvbiBmKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcEZ1bmMoZik7XG59O1xuXG5mYWtlLnJlamVjdHMgPSBmdW5jdGlvbiByZWplY3RzKHZhbHVlKSB7XG4gICAgZnVuY3Rpb24gZigpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGdldEVycm9yKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBGdW5jKGYpO1xufTtcblxuZnVuY3Rpb24geWllbGRJbnRlcm5hbChhc3luYywgdmFsdWVzKSB7XG4gICAgZnVuY3Rpb24gZigpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgbGFzdCBhcmd1bWVudCB0byBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhc3luYykge1xuICAgICAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgdmFsdWVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgdmFsdWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3cmFwRnVuYyhmKTtcbn1cblxuZmFrZS55aWVsZHMgPSBmdW5jdGlvbiB5aWVsZHMoKSB7XG4gICAgcmV0dXJuIHlpZWxkSW50ZXJuYWwoZmFsc2UsIHNsaWNlKGFyZ3VtZW50cykpO1xufTtcblxuZmFrZS55aWVsZHNBc3luYyA9IGZ1bmN0aW9uIHlpZWxkc0FzeW5jKCkge1xuICAgIHJldHVybiB5aWVsZEludGVybmFsKHRydWUsIHNsaWNlKGFyZ3VtZW50cykpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmYWtlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheVByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheTtcbnZhciBwcm94eUludm9rZSA9IHJlcXVpcmUoXCIuL3Byb3h5LWludm9rZVwiKTtcbnZhciBwcm94eUNhbGxUb1N0cmluZyA9IHJlcXVpcmUoXCIuL3Byb3h5LWNhbGxcIikudG9TdHJpbmc7XG52YXIgdGltZXNJbldvcmRzID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3RpbWVzLWluLXdvcmRzXCIpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9leHRlbmRcIik7XG52YXIgbWF0Y2ggPSByZXF1aXJlKFwiQHNpbm9uanMvc2Ftc2FtXCIpLmNyZWF0ZU1hdGNoZXI7XG52YXIgc3R1YiA9IHJlcXVpcmUoXCIuL3N0dWJcIik7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZShcIi4vYXNzZXJ0XCIpO1xudmFyIGRlZXBFcXVhbCA9IHJlcXVpcmUoXCJAc2lub25qcy9zYW1zYW1cIikuZGVlcEVxdWFsO1xudmFyIGZvcm1hdCA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9mb3JtYXRcIik7XG52YXIgdmFsdWVUb1N0cmluZyA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnZhbHVlVG9TdHJpbmc7XG5cbnZhciBldmVyeSA9IGFycmF5UHJvdG8uZXZlcnk7XG52YXIgZm9yRWFjaCA9IGFycmF5UHJvdG8uZm9yRWFjaDtcbnZhciBwdXNoID0gYXJyYXlQcm90by5wdXNoO1xudmFyIHNsaWNlID0gYXJyYXlQcm90by5zbGljZTtcblxuZnVuY3Rpb24gY2FsbENvdW50SW5Xb3JkcyhjYWxsQ291bnQpIHtcbiAgICBpZiAoY2FsbENvdW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBcIm5ldmVyIGNhbGxlZFwiO1xuICAgIH1cblxuICAgIHJldHVybiBcImNhbGxlZCBcIiArIHRpbWVzSW5Xb3JkcyhjYWxsQ291bnQpO1xufVxuXG5mdW5jdGlvbiBleHBlY3RlZENhbGxDb3VudEluV29yZHMoZXhwZWN0YXRpb24pIHtcbiAgICB2YXIgbWluID0gZXhwZWN0YXRpb24ubWluQ2FsbHM7XG4gICAgdmFyIG1heCA9IGV4cGVjdGF0aW9uLm1heENhbGxzO1xuXG4gICAgaWYgKHR5cGVvZiBtaW4gPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIG1heCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICB2YXIgc3RyID0gdGltZXNJbldvcmRzKG1pbik7XG5cbiAgICAgICAgaWYgKG1pbiAhPT0gbWF4KSB7XG4gICAgICAgICAgICBzdHIgPSBcImF0IGxlYXN0IFwiICsgc3RyICsgXCIgYW5kIGF0IG1vc3QgXCIgKyB0aW1lc0luV29yZHMobWF4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtaW4gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiYXQgbGVhc3QgXCIgKyB0aW1lc0luV29yZHMobWluKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJhdCBtb3N0IFwiICsgdGltZXNJbldvcmRzKG1heCk7XG59XG5cbmZ1bmN0aW9uIHJlY2VpdmVkTWluQ2FsbHMoZXhwZWN0YXRpb24pIHtcbiAgICB2YXIgaGFzTWluTGltaXQgPSB0eXBlb2YgZXhwZWN0YXRpb24ubWluQ2FsbHMgPT09IFwibnVtYmVyXCI7XG4gICAgcmV0dXJuICFoYXNNaW5MaW1pdCB8fCBleHBlY3RhdGlvbi5jYWxsQ291bnQgPj0gZXhwZWN0YXRpb24ubWluQ2FsbHM7XG59XG5cbmZ1bmN0aW9uIHJlY2VpdmVkTWF4Q2FsbHMoZXhwZWN0YXRpb24pIHtcbiAgICBpZiAodHlwZW9mIGV4cGVjdGF0aW9uLm1heENhbGxzICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwZWN0YXRpb24uY2FsbENvdW50ID09PSBleHBlY3RhdGlvbi5tYXhDYWxscztcbn1cblxuZnVuY3Rpb24gdmVyaWZ5TWF0Y2hlcihwb3NzaWJsZU1hdGNoZXIsIGFyZykge1xuICAgIHZhciBpc01hdGNoZXIgPSBtYXRjaC5pc01hdGNoZXIocG9zc2libGVNYXRjaGVyKTtcblxuICAgIHJldHVybiAoaXNNYXRjaGVyICYmIHBvc3NpYmxlTWF0Y2hlci50ZXN0KGFyZykpIHx8IHRydWU7XG59XG5cbnZhciBtb2NrRXhwZWN0YXRpb24gPSB7XG4gICAgbWluQ2FsbHM6IDEsXG4gICAgbWF4Q2FsbHM6IDEsXG5cbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZShtZXRob2ROYW1lKSB7XG4gICAgICAgIHZhciBleHBlY3RhdGlvbiA9IGV4dGVuZC5ub25FbnVtKHN0dWIoKSwgbW9ja0V4cGVjdGF0aW9uKTtcbiAgICAgICAgZGVsZXRlIGV4cGVjdGF0aW9uLmNyZWF0ZTtcbiAgICAgICAgZXhwZWN0YXRpb24ubWV0aG9kID0gbWV0aG9kTmFtZTtcblxuICAgICAgICByZXR1cm4gZXhwZWN0YXRpb247XG4gICAgfSxcblxuICAgIGludm9rZTogZnVuY3Rpb24gaW52b2tlKGZ1bmMsIHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgICB0aGlzLnZlcmlmeUNhbGxBbGxvd2VkKHRoaXNWYWx1ZSwgYXJncyk7XG5cbiAgICAgICAgcmV0dXJuIHByb3h5SW52b2tlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIGF0TGVhc3Q6IGZ1bmN0aW9uIGF0TGVhc3QobnVtKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbnVtICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ1wiICsgdmFsdWVUb1N0cmluZyhudW0pICsgXCInIGlzIG5vdCBudW1iZXJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubGltaXRzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLm1heENhbGxzID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubGltaXRzU2V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWluQ2FsbHMgPSBudW07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGF0TW9zdDogZnVuY3Rpb24gYXRNb3N0KG51bSkge1xuICAgICAgICBpZiAodHlwZW9mIG51bSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidcIiArIHZhbHVlVG9TdHJpbmcobnVtKSArIFwiJyBpcyBub3QgbnVtYmVyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmxpbWl0c1NldCkge1xuICAgICAgICAgICAgdGhpcy5taW5DYWxscyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxpbWl0c1NldCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1heENhbGxzID0gbnVtO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBuZXZlcjogZnVuY3Rpb24gbmV2ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4YWN0bHkoMCk7XG4gICAgfSxcblxuICAgIG9uY2U6IGZ1bmN0aW9uIG9uY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4YWN0bHkoMSk7XG4gICAgfSxcblxuICAgIHR3aWNlOiBmdW5jdGlvbiB0d2ljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhhY3RseSgyKTtcbiAgICB9LFxuXG4gICAgdGhyaWNlOiBmdW5jdGlvbiB0aHJpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4YWN0bHkoMyk7XG4gICAgfSxcblxuICAgIGV4YWN0bHk6IGZ1bmN0aW9uIGV4YWN0bHkobnVtKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbnVtICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ1wiICsgdmFsdWVUb1N0cmluZyhudW0pICsgXCInIGlzIG5vdCBhIG51bWJlclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXRMZWFzdChudW0pO1xuICAgICAgICByZXR1cm4gdGhpcy5hdE1vc3QobnVtKTtcbiAgICB9LFxuXG4gICAgbWV0OiBmdW5jdGlvbiBtZXQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5mYWlsZWQgJiYgcmVjZWl2ZWRNaW5DYWxscyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdmVyaWZ5Q2FsbEFsbG93ZWQ6IGZ1bmN0aW9uIHZlcmlmeUNhbGxBbGxvd2VkKHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgICB2YXIgZXhwZWN0ZWRBcmd1bWVudHMgPSB0aGlzLmV4cGVjdGVkQXJndW1lbnRzO1xuXG4gICAgICAgIGlmIChyZWNlaXZlZE1heENhbGxzKHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLmZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBtb2NrRXhwZWN0YXRpb24uZmFpbCh0aGlzLm1ldGhvZCArIFwiIGFscmVhZHkgY2FsbGVkIFwiICsgdGltZXNJbldvcmRzKHRoaXMubWF4Q2FsbHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcImV4cGVjdGVkVGhpc1wiIGluIHRoaXMgJiYgdGhpcy5leHBlY3RlZFRoaXMgIT09IHRoaXNWYWx1ZSkge1xuICAgICAgICAgICAgbW9ja0V4cGVjdGF0aW9uLmZhaWwoXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2QgK1xuICAgICAgICAgICAgICAgICAgICBcIiBjYWxsZWQgd2l0aCBcIiArXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlVG9TdHJpbmcodGhpc1ZhbHVlKSArXG4gICAgICAgICAgICAgICAgICAgIFwiIGFzIHRoaXNWYWx1ZSwgZXhwZWN0ZWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZVRvU3RyaW5nKHRoaXMuZXhwZWN0ZWRUaGlzKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKFwiZXhwZWN0ZWRBcmd1bWVudHNcIiBpbiB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICBtb2NrRXhwZWN0YXRpb24uZmFpbCh0aGlzLm1ldGhvZCArIFwiIHJlY2VpdmVkIG5vIGFyZ3VtZW50cywgZXhwZWN0ZWQgXCIgKyBmb3JtYXQoZXhwZWN0ZWRBcmd1bWVudHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IGV4cGVjdGVkQXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgbW9ja0V4cGVjdGF0aW9uLmZhaWwoXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2QgK1xuICAgICAgICAgICAgICAgICAgICBcIiByZWNlaXZlZCB0b28gZmV3IGFyZ3VtZW50cyAoXCIgK1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQoYXJncykgK1xuICAgICAgICAgICAgICAgICAgICBcIiksIGV4cGVjdGVkIFwiICtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0KGV4cGVjdGVkQXJndW1lbnRzKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmV4cGVjdHNFeGFjdEFyZ0NvdW50ICYmIGFyZ3MubGVuZ3RoICE9PSBleHBlY3RlZEFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1vY2tFeHBlY3RhdGlvbi5mYWlsKFxuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kICtcbiAgICAgICAgICAgICAgICAgICAgXCIgcmVjZWl2ZWQgdG9vIG1hbnkgYXJndW1lbnRzIChcIiArXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdChhcmdzKSArXG4gICAgICAgICAgICAgICAgICAgIFwiKSwgZXhwZWN0ZWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQoZXhwZWN0ZWRBcmd1bWVudHMpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yRWFjaChcbiAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzLFxuICAgICAgICAgICAgZnVuY3Rpb24oZXhwZWN0ZWRBcmd1bWVudCwgaSkge1xuICAgICAgICAgICAgICAgIGlmICghdmVyaWZ5TWF0Y2hlcihleHBlY3RlZEFyZ3VtZW50LCBhcmdzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBtb2NrRXhwZWN0YXRpb24uZmFpbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiByZWNlaXZlZCB3cm9uZyBhcmd1bWVudHMgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdChhcmdzKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsIGRpZG4ndCBtYXRjaCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGV4cGVjdGVkQXJndW1lbnRzKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGVlcEVxdWFsKGFyZ3NbaV0sIGV4cGVjdGVkQXJndW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vY2tFeHBlY3RhdGlvbi5mYWlsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRob2QgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIHJlY2VpdmVkIHdyb25nIGFyZ3VtZW50cyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0KGFyZ3MpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiwgZXhwZWN0ZWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdChleHBlY3RlZEFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBhbGxvd3NDYWxsOiBmdW5jdGlvbiBhbGxvd3NDYWxsKHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgICB2YXIgZXhwZWN0ZWRBcmd1bWVudHMgPSB0aGlzLmV4cGVjdGVkQXJndW1lbnRzO1xuXG4gICAgICAgIGlmICh0aGlzLm1ldCgpICYmIHJlY2VpdmVkTWF4Q2FsbHModGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcImV4cGVjdGVkVGhpc1wiIGluIHRoaXMgJiYgdGhpcy5leHBlY3RlZFRoaXMgIT09IHRoaXNWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoXCJleHBlY3RlZEFyZ3VtZW50c1wiIGluIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgICAgICB2YXIgX2FyZ3MgPSBhcmdzIHx8IFtdO1xuXG4gICAgICAgIGlmIChfYXJncy5sZW5ndGggPCBleHBlY3RlZEFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmV4cGVjdHNFeGFjdEFyZ0NvdW50ICYmIF9hcmdzLmxlbmd0aCAhPT0gZXhwZWN0ZWRBcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXZlcnkoZXhwZWN0ZWRBcmd1bWVudHMsIGZ1bmN0aW9uKGV4cGVjdGVkQXJndW1lbnQsIGkpIHtcbiAgICAgICAgICAgIGlmICghdmVyaWZ5TWF0Y2hlcihleHBlY3RlZEFyZ3VtZW50LCBfYXJnc1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGVlcEVxdWFsKF9hcmdzW2ldLCBleHBlY3RlZEFyZ3VtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB3aXRoQXJnczogZnVuY3Rpb24gd2l0aEFyZ3MoKSB7XG4gICAgICAgIHRoaXMuZXhwZWN0ZWRBcmd1bWVudHMgPSBzbGljZShhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgd2l0aEV4YWN0QXJnczogZnVuY3Rpb24gd2l0aEV4YWN0QXJncygpIHtcbiAgICAgICAgdGhpcy53aXRoQXJncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmV4cGVjdHNFeGFjdEFyZ0NvdW50ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIG9uOiBmdW5jdGlvbiBvbih0aGlzVmFsdWUpIHtcbiAgICAgICAgdGhpcy5leHBlY3RlZFRoaXMgPSB0aGlzVmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2xpY2UodGhpcy5leHBlY3RlZEFyZ3VtZW50cyB8fCBbXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmV4cGVjdHNFeGFjdEFyZ0NvdW50KSB7XG4gICAgICAgICAgICBwdXNoKGFyZ3MsIFwiWy4uLl1cIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2FsbFN0ciA9IHByb3h5Q2FsbFRvU3RyaW5nLmNhbGwoe1xuICAgICAgICAgICAgcHJveHk6IHRoaXMubWV0aG9kIHx8IFwiYW5vbnltb3VzIG1vY2sgZXhwZWN0YXRpb25cIixcbiAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBjYWxsU3RyLnJlcGxhY2UoXCIsIFsuLi5cIiwgXCJbLCAuLi5cIikgKyBcIiBcIiArIGV4cGVjdGVkQ2FsbENvdW50SW5Xb3Jkcyh0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5tZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiRXhwZWN0YXRpb24gbWV0OiBcIiArIG1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gXCJFeHBlY3RlZCBcIiArIG1lc3NhZ2UgKyBcIiAoXCIgKyBjYWxsQ291bnRJbldvcmRzKHRoaXMuY2FsbENvdW50KSArIFwiKVwiO1xuICAgIH0sXG5cbiAgICB2ZXJpZnk6IGZ1bmN0aW9uIHZlcmlmeSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1ldCgpKSB7XG4gICAgICAgICAgICBtb2NrRXhwZWN0YXRpb24uZmFpbChTdHJpbmcodGhpcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9ja0V4cGVjdGF0aW9uLnBhc3MoU3RyaW5nKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBwYXNzOiBmdW5jdGlvbiBwYXNzKG1lc3NhZ2UpIHtcbiAgICAgICAgYXNzZXJ0LnBhc3MobWVzc2FnZSk7XG4gICAgfSxcblxuICAgIGZhaWw6IGZ1bmN0aW9uIGZhaWwobWVzc2FnZSkge1xuICAgICAgICB2YXIgZXhjZXB0aW9uID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBleGNlcHRpb24ubmFtZSA9IFwiRXhwZWN0YXRpb25FcnJvclwiO1xuXG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vY2tFeHBlY3RhdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyYXlQcm90byA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXk7XG52YXIgbW9ja0V4cGVjdGF0aW9uID0gcmVxdWlyZShcIi4vbW9jay1leHBlY3RhdGlvblwiKTtcbnZhciBwcm94eUNhbGxUb1N0cmluZyA9IHJlcXVpcmUoXCIuL3Byb3h5LWNhbGxcIikudG9TdHJpbmc7XG52YXIgZXh0ZW5kID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2V4dGVuZFwiKTtcbnZhciBkZWVwRXF1YWwgPSByZXF1aXJlKFwiQHNpbm9uanMvc2Ftc2FtXCIpLmRlZXBFcXVhbDtcbnZhciB3cmFwTWV0aG9kID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3dyYXAtbWV0aG9kXCIpO1xudmFyIHVzZVByb21pc2VMaWJyYXJ5ID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3VzZS1wcm9taXNlLWxpYnJhcnlcIik7XG5cbnZhciBjb25jYXQgPSBhcnJheVByb3RvLmNvbmNhdDtcbnZhciBmaWx0ZXIgPSBhcnJheVByb3RvLmZpbHRlcjtcbnZhciBmb3JFYWNoID0gYXJyYXlQcm90by5mb3JFYWNoO1xudmFyIGV2ZXJ5ID0gYXJyYXlQcm90by5ldmVyeTtcbnZhciBqb2luID0gYXJyYXlQcm90by5qb2luO1xudmFyIHB1c2ggPSBhcnJheVByb3RvLnB1c2g7XG52YXIgc2xpY2UgPSBhcnJheVByb3RvLnNsaWNlO1xudmFyIHVuc2hpZnQgPSBhcnJheVByb3RvLnVuc2hpZnQ7XG5cbmZ1bmN0aW9uIG1vY2sob2JqZWN0KSB7XG4gICAgaWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gbW9ja0V4cGVjdGF0aW9uLmNyZWF0ZShvYmplY3QgPyBvYmplY3QgOiBcIkFub255bW91cyBtb2NrXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBtb2NrLmNyZWF0ZShvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBlYWNoKGNvbGxlY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbCA9IGNvbGxlY3Rpb24gfHwgW107XG5cbiAgICBmb3JFYWNoKGNvbCwgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBhcnJheUVxdWFscyhhcnIxLCBhcnIyLCBjb21wYXJlTGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmVMZW5ndGggJiYgYXJyMS5sZW5ndGggIT09IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlcnkoYXJyMSwgZnVuY3Rpb24oZWxlbWVudCwgaSkge1xuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGFycjJbaV0sIGVsZW1lbnQpO1xuICAgIH0pO1xufVxuXG5leHRlbmQobW9jaywge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKG9iamVjdCkge1xuICAgICAgICBpZiAoIW9iamVjdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9iamVjdCBpcyBudWxsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1vY2tPYmplY3QgPSBleHRlbmQubm9uRW51bSh7fSwgbW9jaywgeyBvYmplY3Q6IG9iamVjdCB9KTtcbiAgICAgICAgZGVsZXRlIG1vY2tPYmplY3QuY3JlYXRlO1xuXG4gICAgICAgIHJldHVybiBtb2NrT2JqZWN0O1xuICAgIH0sXG5cbiAgICBleHBlY3RzOiBmdW5jdGlvbiBleHBlY3RzKG1ldGhvZCkge1xuICAgICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm1ldGhvZCBpcyBmYWxzeVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5leHBlY3RhdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwZWN0YXRpb25zID0ge307XG4gICAgICAgICAgICB0aGlzLnByb3hpZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZmFpbHVyZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5leHBlY3RhdGlvbnNbbWV0aG9kXSkge1xuICAgICAgICAgICAgdGhpcy5leHBlY3RhdGlvbnNbbWV0aG9kXSA9IFtdO1xuICAgICAgICAgICAgdmFyIG1vY2tPYmplY3QgPSB0aGlzO1xuXG4gICAgICAgICAgICB3cmFwTWV0aG9kKHRoaXMub2JqZWN0LCBtZXRob2QsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2NrT2JqZWN0Lmludm9rZU1ldGhvZChtZXRob2QsIHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHVzaCh0aGlzLnByb3hpZXMsIG1ldGhvZCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXhwZWN0YXRpb24gPSBtb2NrRXhwZWN0YXRpb24uY3JlYXRlKG1ldGhvZCk7XG4gICAgICAgIGV4cGVjdGF0aW9uLndyYXBwZWRNZXRob2QgPSB0aGlzLm9iamVjdFttZXRob2RdLndyYXBwZWRNZXRob2Q7XG4gICAgICAgIHB1c2godGhpcy5leHBlY3RhdGlvbnNbbWV0aG9kXSwgZXhwZWN0YXRpb24pO1xuICAgICAgICB1c2VQcm9taXNlTGlicmFyeSh0aGlzLnByb21pc2VMaWJyYXJ5LCBleHBlY3RhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIGV4cGVjdGF0aW9uO1xuICAgIH0sXG5cbiAgICByZXN0b3JlOiBmdW5jdGlvbiByZXN0b3JlKCkge1xuICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5vYmplY3Q7XG5cbiAgICAgICAgZWFjaCh0aGlzLnByb3hpZXMsIGZ1bmN0aW9uKHByb3h5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtwcm94eV0ucmVzdG9yZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W3Byb3h5XS5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB2ZXJpZnk6IGZ1bmN0aW9uIHZlcmlmeSgpIHtcbiAgICAgICAgdmFyIGV4cGVjdGF0aW9ucyA9IHRoaXMuZXhwZWN0YXRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgbWVzc2FnZXMgPSB0aGlzLmZhaWx1cmVzID8gc2xpY2UodGhpcy5mYWlsdXJlcykgOiBbXTtcbiAgICAgICAgdmFyIG1ldCA9IFtdO1xuXG4gICAgICAgIGVhY2godGhpcy5wcm94aWVzLCBmdW5jdGlvbihwcm94eSkge1xuICAgICAgICAgICAgZWFjaChleHBlY3RhdGlvbnNbcHJveHldLCBmdW5jdGlvbihleHBlY3RhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICghZXhwZWN0YXRpb24ubWV0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaChtZXNzYWdlcywgU3RyaW5nKGV4cGVjdGF0aW9uKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaChtZXQsIFN0cmluZyhleHBlY3RhdGlvbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlc3RvcmUoKTtcblxuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9ja0V4cGVjdGF0aW9uLmZhaWwoam9pbihjb25jYXQobWVzc2FnZXMsIG1ldCksIFwiXFxuXCIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9ja0V4cGVjdGF0aW9uLnBhc3Moam9pbihjb25jYXQobWVzc2FnZXMsIG1ldCksIFwiXFxuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICB1c2luZ1Byb21pc2U6IGZ1bmN0aW9uIHVzaW5nUHJvbWlzZShwcm9taXNlTGlicmFyeSkge1xuICAgICAgICB0aGlzLnByb21pc2VMaWJyYXJ5ID0gcHJvbWlzZUxpYnJhcnk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGludm9rZU1ldGhvZDogZnVuY3Rpb24gaW52b2tlTWV0aG9kKG1ldGhvZCwgdGhpc1ZhbHVlLCBhcmdzKSB7XG4gICAgICAgIC8qIGlmIHdlIGNhbm5vdCBmaW5kIGFueSBtYXRjaGluZyBmaWxlcyB3ZSB3aWxsIGV4cGxpY2l0bHkgY2FsbCBtb2NrRXhwZWN0aW9uI2ZhaWwgd2l0aCBlcnJvciBtZXNzYWdlcyAqL1xuICAgICAgICAvKiBlc2xpbnQgY29uc2lzdGVudC1yZXR1cm46IFwib2ZmXCIgKi9cbiAgICAgICAgdmFyIGV4cGVjdGF0aW9ucyA9IHRoaXMuZXhwZWN0YXRpb25zICYmIHRoaXMuZXhwZWN0YXRpb25zW21ldGhvZF0gPyB0aGlzLmV4cGVjdGF0aW9uc1ttZXRob2RdIDogW107XG4gICAgICAgIHZhciBjdXJyZW50QXJncyA9IGFyZ3MgfHwgW107XG4gICAgICAgIHZhciBhdmFpbGFibGU7XG5cbiAgICAgICAgdmFyIGV4cGVjdGF0aW9uc1dpdGhNYXRjaGluZ0FyZ3MgPSBmaWx0ZXIoZXhwZWN0YXRpb25zLCBmdW5jdGlvbihleHBlY3RhdGlvbikge1xuICAgICAgICAgICAgdmFyIGV4cGVjdGVkQXJncyA9IGV4cGVjdGF0aW9uLmV4cGVjdGVkQXJndW1lbnRzIHx8IFtdO1xuXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlFcXVhbHMoZXhwZWN0ZWRBcmdzLCBjdXJyZW50QXJncywgZXhwZWN0YXRpb24uZXhwZWN0c0V4YWN0QXJnQ291bnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZXhwZWN0YXRpb25zVG9BcHBseSA9IGZpbHRlcihleHBlY3RhdGlvbnNXaXRoTWF0Y2hpbmdBcmdzLCBmdW5jdGlvbihleHBlY3RhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuICFleHBlY3RhdGlvbi5tZXQoKSAmJiBleHBlY3RhdGlvbi5hbGxvd3NDYWxsKHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChleHBlY3RhdGlvbnNUb0FwcGx5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBleHBlY3RhdGlvbnNUb0FwcGx5WzBdLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdmFyIGV4aGF1c3RlZCA9IDA7XG5cbiAgICAgICAgZm9yRWFjaChleHBlY3RhdGlvbnNXaXRoTWF0Y2hpbmdBcmdzLCBmdW5jdGlvbihleHBlY3RhdGlvbikge1xuICAgICAgICAgICAgaWYgKGV4cGVjdGF0aW9uLmFsbG93c0NhbGwodGhpc1ZhbHVlLCBhcmdzKSkge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZSA9IGF2YWlsYWJsZSB8fCBleHBlY3RhdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhoYXVzdGVkICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhdmFpbGFibGUgJiYgZXhoYXVzdGVkID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYXZhaWxhYmxlLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JFYWNoKGV4cGVjdGF0aW9ucywgZnVuY3Rpb24oZXhwZWN0YXRpb24pIHtcbiAgICAgICAgICAgIHB1c2gobWVzc2FnZXMsIFwiICAgIFwiICsgU3RyaW5nKGV4cGVjdGF0aW9uKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVuc2hpZnQoXG4gICAgICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCBjYWxsOiBcIiArXG4gICAgICAgICAgICAgICAgcHJveHlDYWxsVG9TdHJpbmcuY2FsbCh7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5OiBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIC8vIFBoYW50b21KUyBkb2VzIG5vdCBzZXJpYWxpemUgdGhlIHN0YWNrIHRyYWNlIHVudGlsIHRoZSBlcnJvciBoYXMgYmVlbiB0aHJvd25cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8qIGVtcHR5ICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVzaChcbiAgICAgICAgICAgIHRoaXMuZmFpbHVyZXMsXG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgY2FsbDogXCIgK1xuICAgICAgICAgICAgICAgIHByb3h5Q2FsbFRvU3RyaW5nLmNhbGwoe1xuICAgICAgICAgICAgICAgICAgICBwcm94eTogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBhcmdzLFxuICAgICAgICAgICAgICAgICAgICBzdGFjazogZXJyLnN0YWNrXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBtb2NrRXhwZWN0YXRpb24uZmFpbChqb2luKG1lc3NhZ2VzLCBcIlxcblwiKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbW9jaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgcHVzaCA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXkucHVzaDtcblxuZXhwb3J0cy5pbmNyZW1lbnRDYWxsQ291bnQgPSBmdW5jdGlvbiBpbmNyZW1lbnRDYWxsQ291bnQocHJveHkpIHtcbiAgICBwcm94eS5jYWxsZWQgPSB0cnVlO1xuICAgIHByb3h5LmNhbGxDb3VudCArPSAxO1xuICAgIHByb3h5Lm5vdENhbGxlZCA9IGZhbHNlO1xuICAgIHByb3h5LmNhbGxlZE9uY2UgPSBwcm94eS5jYWxsQ291bnQgPT09IDE7XG4gICAgcHJveHkuY2FsbGVkVHdpY2UgPSBwcm94eS5jYWxsQ291bnQgPT09IDI7XG4gICAgcHJveHkuY2FsbGVkVGhyaWNlID0gcHJveHkuY2FsbENvdW50ID09PSAzO1xufTtcblxuZXhwb3J0cy5jcmVhdGVDYWxsUHJvcGVydGllcyA9IGZ1bmN0aW9uIGNyZWF0ZUNhbGxQcm9wZXJ0aWVzKHByb3h5KSB7XG4gICAgcHJveHkuZmlyc3RDYWxsID0gcHJveHkuZ2V0Q2FsbCgwKTtcbiAgICBwcm94eS5zZWNvbmRDYWxsID0gcHJveHkuZ2V0Q2FsbCgxKTtcbiAgICBwcm94eS50aGlyZENhbGwgPSBwcm94eS5nZXRDYWxsKDIpO1xuICAgIHByb3h5Lmxhc3RDYWxsID0gcHJveHkuZ2V0Q2FsbChwcm94eS5jYWxsQ291bnQgLSAxKTtcbn07XG5cbmV4cG9ydHMuZGVsZWdhdGVUb0NhbGxzID0gZnVuY3Rpb24gZGVsZWdhdGVUb0NhbGxzKFxuICAgIHByb3h5LFxuICAgIG1ldGhvZCxcbiAgICBtYXRjaEFueSxcbiAgICBhY3R1YWwsXG4gICAgcmV0dXJuc1ZhbHVlcyxcbiAgICBub3RDYWxsZWQsXG4gICAgdG90YWxDYWxsQ291bnRcbikge1xuICAgIHByb3h5W21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbGxlZCkge1xuICAgICAgICAgICAgaWYgKG5vdENhbGxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub3RDYWxsZWQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3RhbENhbGxDb3VudCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2FsbENvdW50ICE9PSB0b3RhbENhbGxDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN1cnJlbnRDYWxsO1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IDA7XG4gICAgICAgIHZhciByZXR1cm5WYWx1ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuY2FsbENvdW50OyBpIDwgbDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjdXJyZW50Q2FsbCA9IHRoaXMuZ2V0Q2FsbChpKTtcbiAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGN1cnJlbnRDYWxsW2FjdHVhbCB8fCBtZXRob2RdLmFwcGx5KGN1cnJlbnRDYWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcHVzaChyZXR1cm5WYWx1ZXMsIHJldHVyblZhbHVlKTtcbiAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMgKz0gMTtcblxuICAgICAgICAgICAgICAgIGlmIChtYXRjaEFueSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0dXJuc1ZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcyA9PT0gdGhpcy5jYWxsQ291bnQ7XG4gICAgfTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFycmF5UHJvdG8gPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLmFycmF5O1xudmFyIG1hdGNoID0gcmVxdWlyZShcIkBzaW5vbmpzL3NhbXNhbVwiKS5jcmVhdGVNYXRjaGVyO1xudmFyIGRlZXBFcXVhbCA9IHJlcXVpcmUoXCJAc2lub25qcy9zYW1zYW1cIikuZGVlcEVxdWFsO1xudmFyIGZ1bmN0aW9uTmFtZSA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLmZ1bmN0aW9uTmFtZTtcbnZhciBzaW5vbkZvcm1hdCA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9mb3JtYXRcIik7XG52YXIgdmFsdWVUb1N0cmluZyA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnZhbHVlVG9TdHJpbmc7XG5cbnZhciBjb25jYXQgPSBhcnJheVByb3RvLmNvbmNhdDtcbnZhciBmaWx0ZXIgPSBhcnJheVByb3RvLmZpbHRlcjtcbnZhciBqb2luID0gYXJyYXlQcm90by5qb2luO1xudmFyIG1hcCA9IGFycmF5UHJvdG8ubWFwO1xudmFyIHJlZHVjZSA9IGFycmF5UHJvdG8ucmVkdWNlO1xudmFyIHNsaWNlID0gYXJyYXlQcm90by5zbGljZTtcblxuZnVuY3Rpb24gdGhyb3dZaWVsZEVycm9yKHByb3h5LCB0ZXh0LCBhcmdzKSB7XG4gICAgdmFyIG1zZyA9IGZ1bmN0aW9uTmFtZShwcm94eSkgKyB0ZXh0O1xuICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBtc2cgKz0gXCIgUmVjZWl2ZWQgW1wiICsgam9pbihzbGljZShhcmdzKSwgXCIsIFwiKSArIFwiXVwiO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbn1cblxudmFyIGNhbGxQcm90byA9IHtcbiAgICBjYWxsZWRPbjogZnVuY3Rpb24gY2FsbGVkT24odGhpc1ZhbHVlKSB7XG4gICAgICAgIGlmIChtYXRjaC5pc01hdGNoZXIodGhpc1ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNWYWx1ZS50ZXN0KHRoaXMudGhpc1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50aGlzVmFsdWUgPT09IHRoaXNWYWx1ZTtcbiAgICB9LFxuXG4gICAgY2FsbGVkV2l0aDogZnVuY3Rpb24gY2FsbGVkV2l0aCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY2FsbGVkV2l0aEFyZ3MgPSBzbGljZShhcmd1bWVudHMpO1xuXG4gICAgICAgIGlmIChjYWxsZWRXaXRoQXJncy5sZW5ndGggPiBzZWxmLmFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVkdWNlKFxuICAgICAgICAgICAgY2FsbGVkV2l0aEFyZ3MsXG4gICAgICAgICAgICBmdW5jdGlvbihwcmV2LCBhcmcsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiAmJiBkZWVwRXF1YWwoc2VsZi5hcmdzW2ldLCBhcmcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgY2FsbGVkV2l0aE1hdGNoOiBmdW5jdGlvbiBjYWxsZWRXaXRoTWF0Y2goKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNhbGxlZFdpdGhNYXRjaEFyZ3MgPSBzbGljZShhcmd1bWVudHMpO1xuXG4gICAgICAgIGlmIChjYWxsZWRXaXRoTWF0Y2hBcmdzLmxlbmd0aCA+IHNlbGYuYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWR1Y2UoXG4gICAgICAgICAgICBjYWxsZWRXaXRoTWF0Y2hBcmdzLFxuICAgICAgICAgICAgZnVuY3Rpb24ocHJldiwgZXhwZWN0YXRpb24sIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0dWFsID0gc2VsZi5hcmdzW2ldO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXYgJiYgbWF0Y2goZXhwZWN0YXRpb24pLnRlc3QoYWN0dWFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIGNhbGxlZFdpdGhFeGFjdGx5OiBmdW5jdGlvbiBjYWxsZWRXaXRoRXhhY3RseSgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IHRoaXMuYXJncy5sZW5ndGggJiYgdGhpcy5jYWxsZWRXaXRoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIG5vdENhbGxlZFdpdGg6IGZ1bmN0aW9uIG5vdENhbGxlZFdpdGgoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jYWxsZWRXaXRoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIG5vdENhbGxlZFdpdGhNYXRjaDogZnVuY3Rpb24gbm90Q2FsbGVkV2l0aE1hdGNoKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuY2FsbGVkV2l0aE1hdGNoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIHJldHVybmVkOiBmdW5jdGlvbiByZXR1cm5lZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKHRoaXMucmV0dXJuVmFsdWUsIHZhbHVlKTtcbiAgICB9LFxuXG4gICAgdGhyZXc6IGZ1bmN0aW9uIHRocmV3KGVycm9yKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09IFwidW5kZWZpbmVkXCIgfHwgIXRoaXMuZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmV4Y2VwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5leGNlcHRpb24gPT09IGVycm9yIHx8IHRoaXMuZXhjZXB0aW9uLm5hbWUgPT09IGVycm9yO1xuICAgIH0sXG5cbiAgICBjYWxsZWRXaXRoTmV3OiBmdW5jdGlvbiBjYWxsZWRXaXRoTmV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm94eS5wcm90b3R5cGUgJiYgdGhpcy50aGlzVmFsdWUgaW5zdGFuY2VvZiB0aGlzLnByb3h5O1xuICAgIH0sXG5cbiAgICBjYWxsZWRCZWZvcmU6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxJZCA8IG90aGVyLmNhbGxJZDtcbiAgICB9LFxuXG4gICAgY2FsbGVkQWZ0ZXI6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxJZCA+IG90aGVyLmNhbGxJZDtcbiAgICB9LFxuXG4gICAgY2FsbGVkSW1tZWRpYXRlbHlCZWZvcmU6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxJZCA9PT0gb3RoZXIuY2FsbElkIC0gMTtcbiAgICB9LFxuXG4gICAgY2FsbGVkSW1tZWRpYXRlbHlBZnRlcjogZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbElkID09PSBvdGhlci5jYWxsSWQgKyAxO1xuICAgIH0sXG5cbiAgICBjYWxsQXJnOiBmdW5jdGlvbihwb3MpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVBcmdJc0FGdW5jdGlvbihwb3MpO1xuICAgICAgICByZXR1cm4gdGhpcy5hcmdzW3Bvc10oKTtcbiAgICB9LFxuXG4gICAgY2FsbEFyZ09uOiBmdW5jdGlvbihwb3MsIHRoaXNWYWx1ZSkge1xuICAgICAgICB0aGlzLmVuc3VyZUFyZ0lzQUZ1bmN0aW9uKHBvcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmFyZ3NbcG9zXS5hcHBseSh0aGlzVmFsdWUpO1xuICAgIH0sXG5cbiAgICBjYWxsQXJnV2l0aDogZnVuY3Rpb24ocG9zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxBcmdPbldpdGguYXBwbHkodGhpcywgY29uY2F0KFtwb3MsIG51bGxdLCBzbGljZShhcmd1bWVudHMsIDEpKSk7XG4gICAgfSxcblxuICAgIGNhbGxBcmdPbldpdGg6IGZ1bmN0aW9uKHBvcywgdGhpc1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlQXJnSXNBRnVuY3Rpb24ocG9zKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMsIDIpO1xuICAgICAgICByZXR1cm4gdGhpcy5hcmdzW3Bvc10uYXBwbHkodGhpc1ZhbHVlLCBhcmdzKTtcbiAgICB9LFxuXG4gICAgdGhyb3dBcmc6IGZ1bmN0aW9uKHBvcykge1xuICAgICAgICBpZiAocG9zID4gdGhpcy5hcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vdCBlbm91Z2ggYXJndW1lbnRzOiBcIiArIHBvcyArIFwiIHJlcXVpcmVkIGJ1dCBvbmx5IFwiICsgdGhpcy5hcmdzLmxlbmd0aCArIFwiIHByZXNlbnRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyB0aGlzLmFyZ3NbcG9zXTtcbiAgICB9LFxuXG4gICAgeWllbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55aWVsZE9uLmFwcGx5KHRoaXMsIGNvbmNhdChbbnVsbF0sIHNsaWNlKGFyZ3VtZW50cywgMCkpKTtcbiAgICB9LFxuXG4gICAgeWllbGRPbjogZnVuY3Rpb24odGhpc1ZhbHVlKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2xpY2UodGhpcy5hcmdzKTtcbiAgICAgICAgdmFyIHlpZWxkRm4gPSBmaWx0ZXIoYXJncywgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB9KVswXTtcblxuICAgICAgICBpZiAoIXlpZWxkRm4pIHtcbiAgICAgICAgICAgIHRocm93WWllbGRFcnJvcih0aGlzLnByb3h5LCBcIiBjYW5ub3QgeWllbGQgc2luY2Ugbm8gY2FsbGJhY2sgd2FzIHBhc3NlZC5cIiwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geWllbGRGbi5hcHBseSh0aGlzVmFsdWUsIHNsaWNlKGFyZ3VtZW50cywgMSkpO1xuICAgIH0sXG5cbiAgICB5aWVsZFRvOiBmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnlpZWxkVG9Pbi5hcHBseSh0aGlzLCBjb25jYXQoW3Byb3AsIG51bGxdLCBzbGljZShhcmd1bWVudHMsIDEpKSk7XG4gICAgfSxcblxuICAgIHlpZWxkVG9PbjogZnVuY3Rpb24ocHJvcCwgdGhpc1ZhbHVlKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2xpY2UodGhpcy5hcmdzKTtcbiAgICAgICAgdmFyIHlpZWxkQXJnID0gZmlsdGVyKGFyZ3MsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICAgICAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnW3Byb3BdID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH0pWzBdO1xuICAgICAgICB2YXIgeWllbGRGbiA9IHlpZWxkQXJnICYmIHlpZWxkQXJnW3Byb3BdO1xuXG4gICAgICAgIGlmICgheWllbGRGbikge1xuICAgICAgICAgICAgdGhyb3dZaWVsZEVycm9yKFxuICAgICAgICAgICAgICAgIHRoaXMucHJveHksXG4gICAgICAgICAgICAgICAgXCIgY2Fubm90IHlpZWxkIHRvICdcIiArIHZhbHVlVG9TdHJpbmcocHJvcCkgKyBcIicgc2luY2Ugbm8gY2FsbGJhY2sgd2FzIHBhc3NlZC5cIixcbiAgICAgICAgICAgICAgICBhcmdzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHlpZWxkRm4uYXBwbHkodGhpc1ZhbHVlLCBzbGljZShhcmd1bWVudHMsIDIpKTtcbiAgICB9LFxuXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2FsbFN0ciA9IHRoaXMucHJveHkgPyBTdHJpbmcodGhpcy5wcm94eSkgKyBcIihcIiA6IFwiXCI7XG4gICAgICAgIHZhciBmb3JtYXR0ZWRBcmdzO1xuXG4gICAgICAgIGlmICghdGhpcy5hcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCI6KFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0dGVkQXJncyA9IG1hcCh0aGlzLmFyZ3MsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICAgICAgcmV0dXJuIHNpbm9uRm9ybWF0KGFyZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNhbGxTdHIgPSBjYWxsU3RyICsgam9pbihmb3JtYXR0ZWRBcmdzLCBcIiwgXCIpICsgXCIpXCI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJldHVyblZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjYWxsU3RyICs9IFwiID0+IFwiICsgc2lub25Gb3JtYXQodGhpcy5yZXR1cm5WYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5leGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNhbGxTdHIgKz0gXCIgIVwiICsgdGhpcy5leGNlcHRpb24ubmFtZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZXhjZXB0aW9uLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjYWxsU3RyICs9IFwiKFwiICsgdGhpcy5leGNlcHRpb24ubWVzc2FnZSArIFwiKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAvLyBPbWl0IHRoZSBlcnJvciBtZXNzYWdlIGFuZCB0aGUgdHdvIHRvcCBzdGFjayBmcmFtZXMgaW4gc2lub24gaXRzZWxmOlxuICAgICAgICAgICAgY2FsbFN0ciArPSAodGhpcy5zdGFjay5zcGxpdChcIlxcblwiKVszXSB8fCBcInVua25vd25cIikucmVwbGFjZSgvXlxccyooPzphdFxccyt8QCk/LywgXCIgYXQgXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxTdHI7XG4gICAgfSxcblxuICAgIGVuc3VyZUFyZ0lzQUZ1bmN0aW9uOiBmdW5jdGlvbihwb3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFyZ3NbcG9zXSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgIFwiRXhwZWN0ZWQgYXJndW1lbnQgYXQgcG9zaXRpb24gXCIgKyBwb3MgKyBcIiB0byBiZSBhIEZ1bmN0aW9uLCBidXQgd2FzIFwiICsgdHlwZW9mIHRoaXMuYXJnc1twb3NdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWxsUHJvdG8sIFwic3RhY2tcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5lcnJvcldpdGhDYWxsU3RhY2sgJiYgdGhpcy5lcnJvcldpdGhDYWxsU3RhY2suc3RhY2spIHx8IFwiXCI7XG4gICAgfVxufSk7XG5cbmNhbGxQcm90by5pbnZva2VDYWxsYmFjayA9IGNhbGxQcm90by55aWVsZDtcblxuZnVuY3Rpb24gY3JlYXRlUHJveHlDYWxsKHByb3h5LCB0aGlzVmFsdWUsIGFyZ3MsIHJldHVyblZhbHVlLCBleGNlcHRpb24sIGlkLCBlcnJvcldpdGhDYWxsU3RhY2spIHtcbiAgICBpZiAodHlwZW9mIGlkICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYWxsIGlkIGlzIG5vdCBhIG51bWJlclwiKTtcbiAgICB9XG5cbiAgICB2YXIgcHJveHlDYWxsID0gT2JqZWN0LmNyZWF0ZShjYWxsUHJvdG8pO1xuICAgIHZhciBsYXN0QXJnID0gKGFyZ3MubGVuZ3RoID4gMCAmJiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHx8IHVuZGVmaW5lZDtcbiAgICB2YXIgY2FsbGJhY2sgPSBsYXN0QXJnICYmIHR5cGVvZiBsYXN0QXJnID09PSBcImZ1bmN0aW9uXCIgPyBsYXN0QXJnIDogdW5kZWZpbmVkO1xuXG4gICAgcHJveHlDYWxsLnByb3h5ID0gcHJveHk7XG4gICAgcHJveHlDYWxsLnRoaXNWYWx1ZSA9IHRoaXNWYWx1ZTtcbiAgICBwcm94eUNhbGwuYXJncyA9IGFyZ3M7XG4gICAgcHJveHlDYWxsLmxhc3RBcmcgPSBsYXN0QXJnO1xuICAgIHByb3h5Q2FsbC5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHByb3h5Q2FsbC5yZXR1cm5WYWx1ZSA9IHJldHVyblZhbHVlO1xuICAgIHByb3h5Q2FsbC5leGNlcHRpb24gPSBleGNlcHRpb247XG4gICAgcHJveHlDYWxsLmNhbGxJZCA9IGlkO1xuICAgIHByb3h5Q2FsbC5lcnJvcldpdGhDYWxsU3RhY2sgPSBlcnJvcldpdGhDYWxsU3RhY2s7XG5cbiAgICByZXR1cm4gcHJveHlDYWxsO1xufVxuY3JlYXRlUHJveHlDYWxsLnRvU3RyaW5nID0gY2FsbFByb3RvLnRvU3RyaW5nOyAvLyB1c2VkIGJ5IG1vY2tzXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUHJveHlDYWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheVByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheTtcbnZhciBwcm94eUNhbGxVdGlsID0gcmVxdWlyZShcIi4vcHJveHktY2FsbC11dGlsXCIpO1xuXG52YXIgcHVzaCA9IGFycmF5UHJvdG8ucHVzaDtcbnZhciBmb3JFYWNoID0gYXJyYXlQcm90by5mb3JFYWNoO1xudmFyIGNvbmNhdCA9IGFycmF5UHJvdG8uY29uY2F0O1xudmFyIEVycm9yQ29uc3RydWN0b3IgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG52YXIgYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kO1xuXG52YXIgY2FsbElkID0gMDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnZva2UoZnVuYywgdGhpc1ZhbHVlLCBhcmdzKSB7XG4gICAgdmFyIG1hdGNoaW5ncyA9IHRoaXMubWF0Y2hpbmdGYWtlcyhhcmdzKTtcbiAgICB2YXIgY3VycmVudENhbGxJZCA9IGNhbGxJZCsrO1xuICAgIHZhciBleGNlcHRpb24sIHJldHVyblZhbHVlO1xuXG4gICAgcHJveHlDYWxsVXRpbC5pbmNyZW1lbnRDYWxsQ291bnQodGhpcyk7XG4gICAgcHVzaCh0aGlzLnRoaXNWYWx1ZXMsIHRoaXNWYWx1ZSk7XG4gICAgcHVzaCh0aGlzLmFyZ3MsIGFyZ3MpO1xuICAgIHB1c2godGhpcy5jYWxsSWRzLCBjdXJyZW50Q2FsbElkKTtcbiAgICBmb3JFYWNoKG1hdGNoaW5ncywgZnVuY3Rpb24obWF0Y2hpbmcpIHtcbiAgICAgICAgcHJveHlDYWxsVXRpbC5pbmNyZW1lbnRDYWxsQ291bnQobWF0Y2hpbmcpO1xuICAgICAgICBwdXNoKG1hdGNoaW5nLnRoaXNWYWx1ZXMsIHRoaXNWYWx1ZSk7XG4gICAgICAgIHB1c2gobWF0Y2hpbmcuYXJncywgYXJncyk7XG4gICAgICAgIHB1c2gobWF0Y2hpbmcuY2FsbElkcywgY3VycmVudENhbGxJZCk7XG4gICAgfSk7XG5cbiAgICAvLyBNYWtlIGNhbGwgcHJvcGVydGllcyBhdmFpbGFibGUgZnJvbSB3aXRoaW4gdGhlIHNwaWVkIGZ1bmN0aW9uOlxuICAgIHByb3h5Q2FsbFV0aWwuY3JlYXRlQ2FsbFByb3BlcnRpZXModGhpcyk7XG4gICAgZm9yRWFjaChtYXRjaGluZ3MsIHByb3h5Q2FsbFV0aWwuY3JlYXRlQ2FsbFByb3BlcnRpZXMpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgdGhpcy5pbnZva2luZyA9IHRydWU7XG5cbiAgICAgICAgdmFyIHRoaXNDYWxsID0gdGhpcy5nZXRDYWxsKHRoaXMuY2FsbENvdW50IC0gMSk7XG5cbiAgICAgICAgaWYgKHRoaXNDYWxsLmNhbGxlZFdpdGhOZXcoKSkge1xuICAgICAgICAgICAgLy8gQ2FsbCB0aHJvdWdoIHdpdGggYG5ld2BcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gbmV3IChiaW5kLmFwcGx5KHRoaXMuZnVuYyB8fCBmdW5jLCBjb25jYXQoW3RoaXNWYWx1ZV0sIGFyZ3MpKSkoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdGhpc1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSAodGhpcy5mdW5jIHx8IGZ1bmMpLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGV4Y2VwdGlvbiA9IGU7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuaW52b2tpbmc7XG4gICAgfVxuXG4gICAgcHVzaCh0aGlzLmV4Y2VwdGlvbnMsIGV4Y2VwdGlvbik7XG4gICAgcHVzaCh0aGlzLnJldHVyblZhbHVlcywgcmV0dXJuVmFsdWUpO1xuICAgIGZvckVhY2gobWF0Y2hpbmdzLCBmdW5jdGlvbihtYXRjaGluZykge1xuICAgICAgICBwdXNoKG1hdGNoaW5nLmV4Y2VwdGlvbnMsIGV4Y2VwdGlvbik7XG4gICAgICAgIHB1c2gobWF0Y2hpbmcucmV0dXJuVmFsdWVzLCByZXR1cm5WYWx1ZSk7XG4gICAgfSk7XG5cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yQ29uc3RydWN0b3IoKTtcbiAgICAvLyAxLiBQbGVhc2UgZG8gbm90IGdldCBzdGFjayBhdCB0aGlzIHBvaW50LiBJdCBtYXkgYmUgc28gdmVyeSBzbG93LCBhbmQgbm90IGFjdHVhbGx5IHVzZWRcbiAgICAvLyAyLiBQaGFudG9tSlMgZG9lcyBub3Qgc2VyaWFsaXplIHRoZSBzdGFjayB0cmFjZSB1bnRpbCB0aGUgZXJyb3IgaGFzIGJlZW4gdGhyb3duOlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Vycm9yL1N0YWNrXG4gICAgdHJ5IHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogZW1wdHkgKi9cbiAgICB9XG4gICAgcHVzaCh0aGlzLmVycm9yc1dpdGhDYWxsU3RhY2ssIGVycik7XG4gICAgZm9yRWFjaChtYXRjaGluZ3MsIGZ1bmN0aW9uKG1hdGNoaW5nKSB7XG4gICAgICAgIHB1c2gobWF0Y2hpbmcuZXJyb3JzV2l0aENhbGxTdGFjaywgZXJyKTtcbiAgICB9KTtcblxuICAgIC8vIE1ha2UgcmV0dXJuIHZhbHVlIGFuZCBleGNlcHRpb24gYXZhaWxhYmxlIGluIHRoZSBjYWxsczpcbiAgICBwcm94eUNhbGxVdGlsLmNyZWF0ZUNhbGxQcm9wZXJ0aWVzKHRoaXMpO1xuICAgIGZvckVhY2gobWF0Y2hpbmdzLCBwcm94eUNhbGxVdGlsLmNyZWF0ZUNhbGxQcm9wZXJ0aWVzKTtcblxuICAgIGlmIChleGNlcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyYXlQcm90byA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2V4dGVuZFwiKTtcbnZhciBmdW5jdGlvblRvU3RyaW5nID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2Z1bmN0aW9uLXRvLXN0cmluZ1wiKTtcbnZhciBwcm94eUNhbGwgPSByZXF1aXJlKFwiLi9wcm94eS1jYWxsXCIpO1xudmFyIHByb3h5Q2FsbFV0aWwgPSByZXF1aXJlKFwiLi9wcm94eS1jYWxsLXV0aWxcIik7XG52YXIgcHJveHlJbnZva2UgPSByZXF1aXJlKFwiLi9wcm94eS1pbnZva2VcIik7XG5cbnZhciBwdXNoID0gYXJyYXlQcm90by5wdXNoO1xudmFyIGZvckVhY2ggPSBhcnJheVByb3RvLmZvckVhY2g7XG52YXIgc2xpY2UgPSBhcnJheVByb3RvLnNsaWNlO1xuXG52YXIgZW1wdHlGYWtlcyA9IE9iamVjdC5mcmVlemUoW10pO1xuXG4vLyBQdWJsaWMgQVBJXG52YXIgcHJveHlBcGkgPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uVG9TdHJpbmcsXG5cbiAgICBuYW1lZDogZnVuY3Rpb24gbmFtZWQobmFtZSkge1xuICAgICAgICB0aGlzLmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgICAgICAgdmFyIG5hbWVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBcIm5hbWVcIik7XG4gICAgICAgIGlmIChuYW1lRGVzY3JpcHRvciAmJiBuYW1lRGVzY3JpcHRvci5jb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgIC8vIElFIDExIGZ1bmN0aW9ucyBkb24ndCBoYXZlIGEgbmFtZS5cbiAgICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBuYW1lcyB0aGF0IGFyZSBub3QgY29uZmlndXJhYmxlLlxuICAgICAgICAgICAgbmFtZURlc2NyaXB0b3IudmFsdWUgPSBuYW1lO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibmFtZVwiLCBuYW1lRGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGludm9rZTogcHJveHlJbnZva2UsXG5cbiAgICAvKlxuICAgICAqIEhvb2sgZm9yIGRlcml2ZWQgaW1wbGVtZW50YXRpb24gdG8gcmV0dXJuIGZha2UgaW5zdGFuY2VzIG1hdGNoaW5nIHRoZVxuICAgICAqIGdpdmVuIGFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBtYXRjaGluZ0Zha2VzOiBmdW5jdGlvbigvKmFyZ3MsIHN0cmljdCovKSB7XG4gICAgICAgIHJldHVybiBlbXB0eUZha2VzO1xuICAgIH0sXG5cbiAgICBnZXRDYWxsOiBmdW5jdGlvbiBnZXRDYWxsKGkpIHtcbiAgICAgICAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5jYWxsQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3h5Q2FsbChcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICB0aGlzLnRoaXNWYWx1ZXNbaV0sXG4gICAgICAgICAgICB0aGlzLmFyZ3NbaV0sXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlc1tpXSxcbiAgICAgICAgICAgIHRoaXMuZXhjZXB0aW9uc1tpXSxcbiAgICAgICAgICAgIHRoaXMuY2FsbElkc1tpXSxcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzV2l0aENhbGxTdGFja1tpXVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBnZXRDYWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYWxscyA9IFtdO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYWxsQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgcHVzaChjYWxscywgdGhpcy5nZXRDYWxsKGkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYWxscztcbiAgICB9LFxuXG4gICAgY2FsbGVkQmVmb3JlOiBmdW5jdGlvbiBjYWxsZWRCZWZvcmUocHJveHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwcm94eS5jYWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbElkc1swXSA8IHByb3h5LmNhbGxJZHNbcHJveHkuY2FsbElkcy5sZW5ndGggLSAxXTtcbiAgICB9LFxuXG4gICAgY2FsbGVkQWZ0ZXI6IGZ1bmN0aW9uIGNhbGxlZEFmdGVyKHByb3h5KSB7XG4gICAgICAgIGlmICghdGhpcy5jYWxsZWQgfHwgIXByb3h5LmNhbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbElkc1t0aGlzLmNhbGxDb3VudCAtIDFdID4gcHJveHkuY2FsbElkc1swXTtcbiAgICB9LFxuXG4gICAgY2FsbGVkSW1tZWRpYXRlbHlCZWZvcmU6IGZ1bmN0aW9uIGNhbGxlZEltbWVkaWF0ZWx5QmVmb3JlKHByb3h5KSB7XG4gICAgICAgIGlmICghdGhpcy5jYWxsZWQgfHwgIXByb3h5LmNhbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbElkc1t0aGlzLmNhbGxDb3VudCAtIDFdID09PSBwcm94eS5jYWxsSWRzW3Byb3h5LmNhbGxDb3VudCAtIDFdIC0gMTtcbiAgICB9LFxuXG4gICAgY2FsbGVkSW1tZWRpYXRlbHlBZnRlcjogZnVuY3Rpb24gY2FsbGVkSW1tZWRpYXRlbHlBZnRlcihwcm94eSkge1xuICAgICAgICBpZiAoIXRoaXMuY2FsbGVkIHx8ICFwcm94eS5jYWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxJZHNbdGhpcy5jYWxsQ291bnQgLSAxXSA9PT0gcHJveHkuY2FsbElkc1twcm94eS5jYWxsQ291bnQgLSAxXSArIDE7XG4gICAgfSxcblxuICAgIHJlc2V0SGlzdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmludm9raW5nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIFwiQ2Fubm90IHJlc2V0IFNpbm9uIGZ1bmN0aW9uIHdoaWxlIGludm9raW5nIGl0LiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiTW92ZSB0aGUgY2FsbCB0byAucmVzZXRIaXN0b3J5IG91dHNpZGUgb2YgdGhlIGNhbGxiYWNrLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSBcIkludmFsaWRSZXNldEV4Y2VwdGlvblwiO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3RDYWxsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhbGxlZE9uY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYWxsZWRUd2ljZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbGxlZFRocmljZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbGxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZmlyc3RDYWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWNvbmRDYWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy50aGlyZENhbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RDYWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5hcmdzID0gW107XG4gICAgICAgIHRoaXMubGFzdEFyZyA9IG51bGw7XG4gICAgICAgIHRoaXMucmV0dXJuVmFsdWVzID0gW107XG4gICAgICAgIHRoaXMudGhpc1ZhbHVlcyA9IFtdO1xuICAgICAgICB0aGlzLmV4Y2VwdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5jYWxsSWRzID0gW107XG4gICAgICAgIHRoaXMuZXJyb3JzV2l0aENhbGxTdGFjayA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLmZha2VzKSB7XG4gICAgICAgICAgICBmb3JFYWNoKHRoaXMuZmFrZXMsIGZ1bmN0aW9uKGZha2UpIHtcbiAgICAgICAgICAgICAgICBmYWtlLnJlc2V0SGlzdG9yeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG52YXIgZGVsZWdhdGVUb0NhbGxzID0gcHJveHlDYWxsVXRpbC5kZWxlZ2F0ZVRvQ2FsbHM7XG5kZWxlZ2F0ZVRvQ2FsbHMocHJveHlBcGksIFwiY2FsbGVkT25cIiwgdHJ1ZSk7XG5kZWxlZ2F0ZVRvQ2FsbHMocHJveHlBcGksIFwiYWx3YXlzQ2FsbGVkT25cIiwgZmFsc2UsIFwiY2FsbGVkT25cIik7XG5kZWxlZ2F0ZVRvQ2FsbHMocHJveHlBcGksIFwiY2FsbGVkV2l0aFwiLCB0cnVlKTtcbmRlbGVnYXRlVG9DYWxscyhwcm94eUFwaSwgXCJjYWxsZWRPbmNlV2l0aFwiLCB0cnVlLCBcImNhbGxlZFdpdGhcIiwgZmFsc2UsIHVuZGVmaW5lZCwgMSk7XG5kZWxlZ2F0ZVRvQ2FsbHMocHJveHlBcGksIFwiY2FsbGVkV2l0aE1hdGNoXCIsIHRydWUpO1xuZGVsZWdhdGVUb0NhbGxzKHByb3h5QXBpLCBcImFsd2F5c0NhbGxlZFdpdGhcIiwgZmFsc2UsIFwiY2FsbGVkV2l0aFwiKTtcbmRlbGVnYXRlVG9DYWxscyhwcm94eUFwaSwgXCJhbHdheXNDYWxsZWRXaXRoTWF0Y2hcIiwgZmFsc2UsIFwiY2FsbGVkV2l0aE1hdGNoXCIpO1xuZGVsZWdhdGVUb0NhbGxzKHByb3h5QXBpLCBcImNhbGxlZFdpdGhFeGFjdGx5XCIsIHRydWUpO1xuZGVsZWdhdGVUb0NhbGxzKHByb3h5QXBpLCBcImNhbGxlZE9uY2VXaXRoRXhhY3RseVwiLCB0cnVlLCBcImNhbGxlZFdpdGhFeGFjdGx5XCIsIGZhbHNlLCB1bmRlZmluZWQsIDEpO1xuZGVsZWdhdGVUb0NhbGxzKHByb3h5QXBpLCBcImFsd2F5c0NhbGxlZFdpdGhFeGFjdGx5XCIsIGZhbHNlLCBcImNhbGxlZFdpdGhFeGFjdGx5XCIpO1xuZGVsZWdhdGVUb0NhbGxzKHByb3h5QXBpLCBcIm5ldmVyQ2FsbGVkV2l0aFwiLCBmYWxzZSwgXCJub3RDYWxsZWRXaXRoXCIsIGZhbHNlLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuZGVsZWdhdGVUb0NhbGxzKHByb3h5QXBpLCBcIm5ldmVyQ2FsbGVkV2l0aE1hdGNoXCIsIGZhbHNlLCBcIm5vdENhbGxlZFdpdGhNYXRjaFwiLCBmYWxzZSwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRydWU7XG59KTtcbmRlbGVnYXRlVG9DYWxscyhwcm94eUFwaSwgXCJ0aHJld1wiLCB0cnVlKTtcbmRlbGVnYXRlVG9DYWxscyhwcm94eUFwaSwgXCJhbHdheXNUaHJld1wiLCBmYWxzZSwgXCJ0aHJld1wiKTtcbmRlbGVnYXRlVG9DYWxscyhwcm94eUFwaSwgXCJyZXR1cm5lZFwiLCB0cnVlKTtcbmRlbGVnYXRlVG9DYWxscyhwcm94eUFwaSwgXCJhbHdheXNSZXR1cm5lZFwiLCBmYWxzZSwgXCJyZXR1cm5lZFwiKTtcbmRlbGVnYXRlVG9DYWxscyhwcm94eUFwaSwgXCJjYWxsZWRXaXRoTmV3XCIsIHRydWUpO1xuZGVsZWdhdGVUb0NhbGxzKHByb3h5QXBpLCBcImFsd2F5c0NhbGxlZFdpdGhOZXdcIiwgZmFsc2UsIFwiY2FsbGVkV2l0aE5ld1wiKTtcblxuZnVuY3Rpb24gY3JlYXRlUHJveHkoZnVuYywgb3JpZ2luYWxGdW5jKSB7XG4gICAgdmFyIHByb3h5ID0gd3JhcEZ1bmN0aW9uKGZ1bmMsIG9yaWdpbmFsRnVuYyk7XG5cbiAgICAvLyBJbmhlcml0IGZ1bmN0aW9uIHByb3BlcnRpZXM6XG4gICAgZXh0ZW5kKHByb3h5LCBmdW5jKTtcblxuICAgIHByb3h5LnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuXG4gICAgZXh0ZW5kLm5vbkVudW0ocHJveHksIHByb3h5QXBpKTtcblxuICAgIHJldHVybiBwcm94eTtcbn1cblxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMsIG9yaWdpbmFsRnVuYykge1xuICAgIHZhciBhcml0eSA9IG9yaWdpbmFsRnVuYy5sZW5ndGg7XG4gICAgdmFyIHA7XG4gICAgLy8gRG8gbm90IGNoYW5nZSB0aGlzIHRvIHVzZSBhbiBldmFsLiBQcm9qZWN0cyB0aGF0IGRlcGVuZCBvbiBzaW5vbiBibG9jayB0aGUgdXNlIG9mIGV2YWwuXG4gICAgLy8gcmVmOiBodHRwczovL2dpdGh1Yi5jb20vc2lub25qcy9zaW5vbi9pc3N1ZXMvNzEwXG4gICAgc3dpdGNoIChhcml0eSkge1xuICAgICAgICAvKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzLCBtYXgtbGVuKi9cbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcCA9IGZ1bmN0aW9uIHByb3h5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmludm9rZShmdW5jLCB0aGlzLCBzbGljZShhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcCA9IGZ1bmN0aW9uIHByb3h5KGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5pbnZva2UoZnVuYywgdGhpcywgc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHAgPSBmdW5jdGlvbiBwcm94eShhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuaW52b2tlKGZ1bmMsIHRoaXMsIHNsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBwID0gZnVuY3Rpb24gcHJveHkoYSwgYiwgYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmludm9rZShmdW5jLCB0aGlzLCBzbGljZShhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcCA9IGZ1bmN0aW9uIHByb3h5KGEsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5pbnZva2UoZnVuYywgdGhpcywgc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHAgPSBmdW5jdGlvbiBwcm94eShhLCBiLCBjLCBkLCBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuaW52b2tlKGZ1bmMsIHRoaXMsIHNsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICBwID0gZnVuY3Rpb24gcHJveHkoYSwgYiwgYywgZCwgZSwgZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmludm9rZShmdW5jLCB0aGlzLCBzbGljZShhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgcCA9IGZ1bmN0aW9uIHByb3h5KGEsIGIsIGMsIGQsIGUsIGYsIGcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5pbnZva2UoZnVuYywgdGhpcywgc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIHAgPSBmdW5jdGlvbiBwcm94eShhLCBiLCBjLCBkLCBlLCBmLCBnLCBoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuaW52b2tlKGZ1bmMsIHRoaXMsIHNsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBwID0gZnVuY3Rpb24gcHJveHkoYSwgYiwgYywgZCwgZSwgZiwgZywgaCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmludm9rZShmdW5jLCB0aGlzLCBzbGljZShhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgIHAgPSBmdW5jdGlvbiBwcm94eShhLCBiLCBjLCBkLCBlLCBmLCBnLCBoLCBpLCBqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuaW52b2tlKGZ1bmMsIHRoaXMsIHNsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgcCA9IGZ1bmN0aW9uIHByb3h5KGEsIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGksIGosIGspIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5pbnZva2UoZnVuYywgdGhpcywgc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICBwID0gZnVuY3Rpb24gcHJveHkoYSwgYiwgYywgZCwgZSwgZiwgZywgaCwgaSwgaiwgaywgbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmludm9rZShmdW5jLCB0aGlzLCBzbGljZShhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHAgPSBmdW5jdGlvbiBwcm94eSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5pbnZva2UoZnVuYywgdGhpcywgc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8qZXNsaW50LWVuYWJsZSovXG4gICAgfVxuICAgIHZhciBuYW1lRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxGdW5jLCBcIm5hbWVcIik7XG4gICAgaWYgKG5hbWVEZXNjcmlwdG9yICYmIG5hbWVEZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAvLyBJRSAxMSBmdW5jdGlvbnMgZG9uJ3QgaGF2ZSBhIG5hbWUuXG4gICAgICAgIC8vIFNhZmFyaSA5IGhhcyBuYW1lcyB0aGF0IGFyZSBub3QgY29uZmlndXJhYmxlLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocCwgXCJuYW1lXCIsIG5hbWVEZXNjcmlwdG9yKTtcbiAgICB9XG4gICAgZXh0ZW5kLm5vbkVudW0ocCwge1xuICAgICAgICBpc1Npbm9uUHJveHk6IHRydWUsXG5cbiAgICAgICAgY2FsbGVkOiBmYWxzZSxcbiAgICAgICAgbm90Q2FsbGVkOiB0cnVlLFxuICAgICAgICBjYWxsZWRPbmNlOiBmYWxzZSxcbiAgICAgICAgY2FsbGVkVHdpY2U6IGZhbHNlLFxuICAgICAgICBjYWxsZWRUaHJpY2U6IGZhbHNlLFxuICAgICAgICBjYWxsQ291bnQ6IDAsXG4gICAgICAgIGZpcnN0Q2FsbDogbnVsbCxcbiAgICAgICAgc2Vjb25kQ2FsbDogbnVsbCxcbiAgICAgICAgdGhpcmRDYWxsOiBudWxsLFxuICAgICAgICBsYXN0Q2FsbDogbnVsbCxcbiAgICAgICAgbGFzdEFyZzogbnVsbCxcbiAgICAgICAgYXJnczogW10sXG4gICAgICAgIHJldHVyblZhbHVlczogW10sXG4gICAgICAgIHRoaXNWYWx1ZXM6IFtdLFxuICAgICAgICBleGNlcHRpb25zOiBbXSxcbiAgICAgICAgY2FsbElkczogW10sXG4gICAgICAgIGVycm9yc1dpdGhDYWxsU3RhY2s6IFtdXG4gICAgfSk7XG4gICAgcmV0dXJuIHA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUHJveHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHdhbGtPYmplY3QgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvd2Fsay1vYmplY3RcIik7XG5cbmZ1bmN0aW9uIGZpbHRlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIG9iamVjdFtwcm9wZXJ0eV0ucmVzdG9yZSAmJiBvYmplY3RbcHJvcGVydHldLnJlc3RvcmUuc2lub247XG59XG5cbmZ1bmN0aW9uIHJlc3RvcmUob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIG9iamVjdFtwcm9wZXJ0eV0ucmVzdG9yZSgpO1xufVxuXG5mdW5jdGlvbiByZXN0b3JlT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiB3YWxrT2JqZWN0KHJlc3RvcmUsIG9iamVjdCwgZmlsdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN0b3JlT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheVByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheTtcbnZhciBjb2xsZWN0T3duTWV0aG9kcyA9IHJlcXVpcmUoXCIuL2NvbGxlY3Qtb3duLW1ldGhvZHNcIik7XG52YXIgZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2dldC1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpO1xudmFyIGlzRXNNb2R1bGUgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvaXMtZXMtbW9kdWxlXCIpO1xudmFyIGlzUHJvcGVydHlDb25maWd1cmFibGUgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvaXMtcHJvcGVydHktY29uZmlndXJhYmxlXCIpO1xudmFyIGlzTm9uRXhpc3RlbnRPd25Qcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9pcy1ub24tZXhpc3RlbnQtb3duLXByb3BlcnR5XCIpO1xudmFyIG1hdGNoID0gcmVxdWlyZShcIkBzaW5vbmpzL3NhbXNhbVwiKS5jcmVhdGVNYXRjaGVyO1xudmFyIHNpbm9uQXNzZXJ0ID0gcmVxdWlyZShcIi4vYXNzZXJ0XCIpO1xudmFyIHNpbm9uQ2xvY2sgPSByZXF1aXJlKFwiLi91dGlsL2Zha2UtdGltZXJzXCIpO1xudmFyIHNpbm9uTW9jayA9IHJlcXVpcmUoXCIuL21vY2tcIik7XG52YXIgc2lub25TcHkgPSByZXF1aXJlKFwiLi9zcHlcIik7XG52YXIgc2lub25TdHViID0gcmVxdWlyZShcIi4vc3R1YlwiKTtcbnZhciBzaW5vbkZha2UgPSByZXF1aXJlKFwiLi9mYWtlXCIpO1xudmFyIHZhbHVlVG9TdHJpbmcgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS52YWx1ZVRvU3RyaW5nO1xudmFyIGZha2VTZXJ2ZXIgPSByZXF1aXJlKFwibmlzZVwiKS5mYWtlU2VydmVyO1xudmFyIGZha2VYaHIgPSByZXF1aXJlKFwibmlzZVwiKS5mYWtlWGhyO1xudmFyIHVzZVByb21pc2VMaWJyYXJ5ID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3VzZS1wcm9taXNlLWxpYnJhcnlcIik7XG5cbnZhciBmaWx0ZXIgPSBhcnJheVByb3RvLmZpbHRlcjtcbnZhciBmb3JFYWNoID0gYXJyYXlQcm90by5maWx0ZXI7XG52YXIgcHVzaCA9IGFycmF5UHJvdG8ucHVzaDtcbnZhciByZXZlcnNlID0gYXJyYXlQcm90by5yZXZlcnNlO1xuXG5mdW5jdGlvbiBhcHBseU9uRWFjaChmYWtlcywgbWV0aG9kKSB7XG4gICAgdmFyIG1hdGNoaW5nRmFrZXMgPSBmaWx0ZXIoZmFrZXMsIGZ1bmN0aW9uKGZha2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmYWtlW21ldGhvZF0gPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9KTtcblxuICAgIGZvckVhY2gobWF0Y2hpbmdGYWtlcywgZnVuY3Rpb24oZmFrZSkge1xuICAgICAgICBmYWtlW21ldGhvZF0oKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gU2FuZGJveCgpIHtcbiAgICB2YXIgc2FuZGJveCA9IHRoaXM7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSBbXTtcbiAgICB2YXIgZmFrZVJlc3RvcmVycyA9IFtdO1xuICAgIHZhciBwcm9taXNlTGliO1xuXG4gICAgc2FuZGJveC5zZXJ2ZXJQcm90b3R5cGUgPSBmYWtlU2VydmVyO1xuXG4gICAgLy8gdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5XG4gICAgc2FuZGJveC5nZXRGYWtlcyA9IGZ1bmN0aW9uIGdldEZha2VzKCkge1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9O1xuXG4gICAgLy8gdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5XG4gICAgc2FuZGJveC5nZXRSZXN0b3JlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZha2VSZXN0b3JlcnM7XG4gICAgfTtcblxuICAgIHNhbmRib3guY3JlYXRlU3R1Ykluc3RhbmNlID0gZnVuY3Rpb24gY3JlYXRlU3R1Ykluc3RhbmNlKCkge1xuICAgICAgICB2YXIgc3R1YmJlZCA9IHNpbm9uU3R1Yi5jcmVhdGVTdHViSW5zdGFuY2UuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblxuICAgICAgICB2YXIgb3duTWV0aG9kcyA9IGNvbGxlY3RPd25NZXRob2RzKHN0dWJiZWQpO1xuXG4gICAgICAgIGZvckVhY2gob3duTWV0aG9kcywgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBwdXNoKGNvbGxlY3Rpb24sIG1ldGhvZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVzZVByb21pc2VMaWJyYXJ5KHByb21pc2VMaWIsIG93bk1ldGhvZHMpO1xuXG4gICAgICAgIHJldHVybiBzdHViYmVkO1xuICAgIH07XG5cbiAgICBzYW5kYm94LmluamVjdCA9IGZ1bmN0aW9uIGluamVjdChvYmopIHtcbiAgICAgICAgb2JqLnNweSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNhbmRib3guc3B5LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgb2JqLnN0dWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzYW5kYm94LnN0dWIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBvYmoubW9jayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNhbmRib3gubW9jay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG9iai5jcmVhdGVTdHViSW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzYW5kYm94LmNyZWF0ZVN0dWJJbnN0YW5jZS5hcHBseShzYW5kYm94LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG9iai5mYWtlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2FuZGJveC5mYWtlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgb2JqLnJlcGxhY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzYW5kYm94LnJlcGxhY2UuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBvYmoucmVwbGFjZVNldHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNhbmRib3gucmVwbGFjZVNldHRlci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG9iai5yZXBsYWNlR2V0dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2FuZGJveC5yZXBsYWNlR2V0dGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNhbmRib3guY2xvY2spIHtcbiAgICAgICAgICAgIG9iai5jbG9jayA9IHNhbmRib3guY2xvY2s7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2FuZGJveC5zZXJ2ZXIpIHtcbiAgICAgICAgICAgIG9iai5zZXJ2ZXIgPSBzYW5kYm94LnNlcnZlcjtcbiAgICAgICAgICAgIG9iai5yZXF1ZXN0cyA9IHNhbmRib3guc2VydmVyLnJlcXVlc3RzO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqLm1hdGNoID0gbWF0Y2g7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuXG4gICAgc2FuZGJveC5tb2NrID0gZnVuY3Rpb24gbW9jaygpIHtcbiAgICAgICAgdmFyIG0gPSBzaW5vbk1vY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblxuICAgICAgICBwdXNoKGNvbGxlY3Rpb24sIG0pO1xuICAgICAgICB1c2VQcm9taXNlTGlicmFyeShwcm9taXNlTGliLCBtKTtcblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9O1xuXG4gICAgc2FuZGJveC5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICBhcHBseU9uRWFjaChjb2xsZWN0aW9uLCBcInJlc2V0XCIpO1xuICAgICAgICBhcHBseU9uRWFjaChjb2xsZWN0aW9uLCBcInJlc2V0SGlzdG9yeVwiKTtcbiAgICB9O1xuXG4gICAgc2FuZGJveC5yZXNldEJlaGF2aW9yID0gZnVuY3Rpb24gcmVzZXRCZWhhdmlvcigpIHtcbiAgICAgICAgYXBwbHlPbkVhY2goY29sbGVjdGlvbiwgXCJyZXNldEJlaGF2aW9yXCIpO1xuICAgIH07XG5cbiAgICBzYW5kYm94LnJlc2V0SGlzdG9yeSA9IGZ1bmN0aW9uIHJlc2V0SGlzdG9yeSgpIHtcbiAgICAgICAgZnVuY3Rpb24gcHJpdmF0ZVJlc2V0SGlzdG9yeShmKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gZi5yZXNldEhpc3RvcnkgfHwgZi5yZXNldDtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QuY2FsbChmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24oZmFrZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmYWtlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBwcml2YXRlUmVzZXRIaXN0b3J5KGZha2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSBbXTtcbiAgICAgICAgICAgIGlmIChmYWtlLmdldCkge1xuICAgICAgICAgICAgICAgIHB1c2gobWV0aG9kcywgZmFrZS5nZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmFrZS5zZXQpIHtcbiAgICAgICAgICAgICAgICBwdXNoKG1ldGhvZHMsIGZha2Uuc2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yRWFjaChtZXRob2RzLCBwcml2YXRlUmVzZXRIaXN0b3J5KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNhbmRib3gucmVzdG9yZSA9IGZ1bmN0aW9uIHJlc3RvcmUoKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzYW5kYm94LnJlc3RvcmUoKSBkb2VzIG5vdCB0YWtlIGFueSBwYXJhbWV0ZXJzLiBQZXJoYXBzIHlvdSBtZWFudCBzdHViLnJlc3RvcmUoKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2UoY29sbGVjdGlvbik7XG4gICAgICAgIGFwcGx5T25FYWNoKGNvbGxlY3Rpb24sIFwicmVzdG9yZVwiKTtcbiAgICAgICAgY29sbGVjdGlvbiA9IFtdO1xuXG4gICAgICAgIGZvckVhY2goZmFrZVJlc3RvcmVycywgZnVuY3Rpb24ocmVzdG9yZXIpIHtcbiAgICAgICAgICAgIHJlc3RvcmVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBmYWtlUmVzdG9yZXJzID0gW107XG5cbiAgICAgICAgc2FuZGJveC5yZXN0b3JlQ29udGV4dCgpO1xuICAgIH07XG5cbiAgICBzYW5kYm94LnJlc3RvcmVDb250ZXh0ID0gZnVuY3Rpb24gcmVzdG9yZUNvbnRleHQoKSB7XG4gICAgICAgIHZhciBpbmplY3RlZEtleXMgPSBzYW5kYm94LmluamVjdGVkS2V5cztcbiAgICAgICAgdmFyIGluamVjdEludG8gPSBzYW5kYm94LmluamVjdEludG87XG5cbiAgICAgICAgaWYgKCFpbmplY3RlZEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvckVhY2goaW5qZWN0ZWRLZXlzLCBmdW5jdGlvbihpbmplY3RlZEtleSkge1xuICAgICAgICAgICAgZGVsZXRlIGluamVjdEludG9baW5qZWN0ZWRLZXldO1xuICAgICAgICB9KTtcblxuICAgICAgICBpbmplY3RlZEtleXMgPSBbXTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RmFrZVJlc3RvcmVyKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzdG9yZXIoKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdG9yZXIub2JqZWN0ID0gb2JqZWN0O1xuICAgICAgICByZXN0b3Jlci5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgICAgICByZXR1cm4gcmVzdG9yZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Tm90UmVwbGFjZWQob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgICBmb3JFYWNoKGZha2VSZXN0b3JlcnMsIGZ1bmN0aW9uKGZha2VSZXN0b3Jlcikge1xuICAgICAgICAgICAgaWYgKGZha2VSZXN0b3Jlci5vYmplY3QgPT09IG9iamVjdCAmJiBmYWtlUmVzdG9yZXIucHJvcGVydHkgPT09IHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkF0dGVtcHRlZCB0byByZXBsYWNlIFwiICsgcHJvcGVydHkgKyBcIiB3aGljaCBpcyBhbHJlYWR5IHJlcGxhY2VkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYW5kYm94LnJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlKG9iamVjdCwgcHJvcGVydHksIHJlcGxhY2VtZW50KSB7XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZXBsYWNlIG5vbi1leGlzdGVudCBvd24gcHJvcGVydHkgXCIgKyB2YWx1ZVRvU3RyaW5nKHByb3BlcnR5KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHJlcGxhY2VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgcmVwbGFjZW1lbnQgYXJndW1lbnQgdG8gYmUgZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlIHNhbmRib3gucmVwbGFjZUdldHRlciBmb3IgcmVwbGFjaW5nIGdldHRlcnNcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3Iuc2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZSBzYW5kYm94LnJlcGxhY2VTZXR0ZXIgZm9yIHJlcGxhY2luZyBzZXR0ZXJzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RbcHJvcGVydHldICE9PSB0eXBlb2YgcmVwbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVwbGFjZSBcIiArIHR5cGVvZiBvYmplY3RbcHJvcGVydHldICsgXCIgd2l0aCBcIiArIHR5cGVvZiByZXBsYWNlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnlOb3RSZXBsYWNlZChvYmplY3QsIHByb3BlcnR5KTtcblxuICAgICAgICAvLyBzdG9yZSBhIGZ1bmN0aW9uIGZvciByZXN0b3JpbmcgdGhlIHJlcGxhY2VkIHByb3BlcnR5XG4gICAgICAgIHB1c2goZmFrZVJlc3RvcmVycywgZ2V0RmFrZVJlc3RvcmVyKG9iamVjdCwgcHJvcGVydHkpKTtcblxuICAgICAgICBvYmplY3RbcHJvcGVydHldID0gcmVwbGFjZW1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIHJlcGxhY2VtZW50O1xuICAgIH07XG5cbiAgICBzYW5kYm94LnJlcGxhY2VHZXR0ZXIgPSBmdW5jdGlvbiByZXBsYWNlR2V0dGVyKG9iamVjdCwgcHJvcGVydHksIHJlcGxhY2VtZW50KSB7XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZXBsYWNlIG5vbi1leGlzdGVudCBvd24gcHJvcGVydHkgXCIgKyB2YWx1ZVRvU3RyaW5nKHByb3BlcnR5KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHJlcGxhY2VtZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCByZXBsYWNlbWVudCBhcmd1bWVudCB0byBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLmdldCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgb2JqZWN0LnByb3BlcnR5YCBpcyBub3QgYSBnZXR0ZXJcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJpZnlOb3RSZXBsYWNlZChvYmplY3QsIHByb3BlcnR5KTtcblxuICAgICAgICAvLyBzdG9yZSBhIGZ1bmN0aW9uIGZvciByZXN0b3JpbmcgdGhlIHJlcGxhY2VkIHByb3BlcnR5XG4gICAgICAgIHB1c2goZmFrZVJlc3RvcmVycywgZ2V0RmFrZVJlc3RvcmVyKG9iamVjdCwgcHJvcGVydHkpKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwge1xuICAgICAgICAgICAgZ2V0OiByZXBsYWNlbWVudCxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZShvYmplY3QsIHByb3BlcnR5KVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVwbGFjZW1lbnQ7XG4gICAgfTtcblxuICAgIHNhbmRib3gucmVwbGFjZVNldHRlciA9IGZ1bmN0aW9uIHJlcGxhY2VTZXR0ZXIob2JqZWN0LCBwcm9wZXJ0eSwgcmVwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlcGxhY2Ugbm9uLWV4aXN0ZW50IG93biBwcm9wZXJ0eSBcIiArIHZhbHVlVG9TdHJpbmcocHJvcGVydHkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgcmVwbGFjZW1lbnQgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIHJlcGxhY2VtZW50IGFyZ3VtZW50IHRvIGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3Iuc2V0ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImBvYmplY3QucHJvcGVydHlgIGlzIG5vdCBhIHNldHRlclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZlcmlmeU5vdFJlcGxhY2VkKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgICAgIC8vIHN0b3JlIGEgZnVuY3Rpb24gZm9yIHJlc3RvcmluZyB0aGUgcmVwbGFjZWQgcHJvcGVydHlcbiAgICAgICAgcHVzaChmYWtlUmVzdG9yZXJzLCBnZXRGYWtlUmVzdG9yZXIob2JqZWN0LCBwcm9wZXJ0eSkpO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhY2Nlc3Nvci1wYWlyc1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwge1xuICAgICAgICAgICAgc2V0OiByZXBsYWNlbWVudCxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZShvYmplY3QsIHByb3BlcnR5KVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVwbGFjZW1lbnQ7XG4gICAgfTtcblxuICAgIHNhbmRib3guc3B5ID0gZnVuY3Rpb24gc3B5KCkge1xuICAgICAgICB2YXIgcyA9IHNpbm9uU3B5LmFwcGx5KHNpbm9uU3B5LCBhcmd1bWVudHMpO1xuXG4gICAgICAgIHB1c2goY29sbGVjdGlvbiwgcyk7XG5cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfTtcblxuICAgIHNhbmRib3guc3R1YiA9IGZ1bmN0aW9uIHN0dWIob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgICBpZiAoaXNFc01vZHVsZShvYmplY3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRVMgTW9kdWxlcyBjYW5ub3QgYmUgc3R1YmJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05vbkV4aXN0ZW50T3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgc3R1YiBub24tZXhpc3RlbnQgb3duIHByb3BlcnR5IFwiICsgdmFsdWVUb1N0cmluZyhwcm9wZXJ0eSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0dWJiZWQgPSBzaW5vblN0dWIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIGlzU3R1YmJpbmdFbnRpcmVPYmplY3QgPSB0eXBlb2YgcHJvcGVydHkgPT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIjtcblxuICAgICAgICBpZiAoaXNTdHViYmluZ0VudGlyZU9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG93bk1ldGhvZHMgPSBjb2xsZWN0T3duTWV0aG9kcyhzdHViYmVkKTtcblxuICAgICAgICAgICAgZm9yRWFjaChvd25NZXRob2RzLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBwdXNoKGNvbGxlY3Rpb24sIG1ldGhvZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXNlUHJvbWlzZUxpYnJhcnkocHJvbWlzZUxpYiwgb3duTWV0aG9kcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdXNoKGNvbGxlY3Rpb24sIHN0dWJiZWQpO1xuICAgICAgICAgICAgdXNlUHJvbWlzZUxpYnJhcnkocHJvbWlzZUxpYiwgc3R1YmJlZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3R1YmJlZDtcbiAgICB9O1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgc2FuZGJveC5mYWtlID0gZnVuY3Rpb24gZmFrZShmKSB7XG4gICAgICAgIHZhciBzID0gc2lub25GYWtlLmFwcGx5KHNpbm9uRmFrZSwgYXJndW1lbnRzKTtcblxuICAgICAgICBwdXNoKGNvbGxlY3Rpb24sIHMpO1xuXG4gICAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgICBmb3JFYWNoKE9iamVjdC5rZXlzKHNpbm9uRmFrZSksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICB2YXIgZmFrZUJlaGF2aW9yID0gc2lub25GYWtlW2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgZmFrZUJlaGF2aW9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHNhbmRib3guZmFrZVtrZXldID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBmYWtlQmVoYXZpb3IuYXBwbHkoZmFrZUJlaGF2aW9yLCBhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICAgICAgcHVzaChjb2xsZWN0aW9uLCBzKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2FuZGJveC51c2VGYWtlVGltZXJzID0gZnVuY3Rpb24gdXNlRmFrZVRpbWVycyhhcmdzKSB7XG4gICAgICAgIHZhciBjbG9jayA9IHNpbm9uQ2xvY2sudXNlRmFrZVRpbWVycy5jYWxsKG51bGwsIGFyZ3MpO1xuXG4gICAgICAgIHNhbmRib3guY2xvY2sgPSBjbG9jaztcbiAgICAgICAgcHVzaChjb2xsZWN0aW9uLCBjbG9jayk7XG5cbiAgICAgICAgcmV0dXJuIGNsb2NrO1xuICAgIH07XG5cbiAgICBzYW5kYm94LnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeSgpIHtcbiAgICAgICAgYXBwbHlPbkVhY2goY29sbGVjdGlvbiwgXCJ2ZXJpZnlcIik7XG4gICAgfTtcblxuICAgIHNhbmRib3gudmVyaWZ5QW5kUmVzdG9yZSA9IGZ1bmN0aW9uIHZlcmlmeUFuZFJlc3RvcmUoKSB7XG4gICAgICAgIHZhciBleGNlcHRpb247XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNhbmRib3gudmVyaWZ5KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGU7XG4gICAgICAgIH1cblxuICAgICAgICBzYW5kYm94LnJlc3RvcmUoKTtcblxuICAgICAgICBpZiAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2FuZGJveC51c2VGYWtlU2VydmVyID0gZnVuY3Rpb24gdXNlRmFrZVNlcnZlcigpIHtcbiAgICAgICAgdmFyIHByb3RvID0gc2FuZGJveC5zZXJ2ZXJQcm90b3R5cGUgfHwgZmFrZVNlcnZlcjtcblxuICAgICAgICBpZiAoIXByb3RvIHx8ICFwcm90by5jcmVhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgc2FuZGJveC5zZXJ2ZXIgPSBwcm90by5jcmVhdGUoKTtcbiAgICAgICAgcHVzaChjb2xsZWN0aW9uLCBzYW5kYm94LnNlcnZlcik7XG5cbiAgICAgICAgcmV0dXJuIHNhbmRib3guc2VydmVyO1xuICAgIH07XG5cbiAgICBzYW5kYm94LnVzZUZha2VYTUxIdHRwUmVxdWVzdCA9IGZ1bmN0aW9uIHVzZUZha2VYTUxIdHRwUmVxdWVzdCgpIHtcbiAgICAgICAgdmFyIHhociA9IGZha2VYaHIudXNlRmFrZVhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHB1c2goY29sbGVjdGlvbiwgeGhyKTtcbiAgICAgICAgcmV0dXJuIHhocjtcbiAgICB9O1xuXG4gICAgc2FuZGJveC51c2luZ1Byb21pc2UgPSBmdW5jdGlvbiB1c2luZ1Byb21pc2UocHJvbWlzZUxpYnJhcnkpIHtcbiAgICAgICAgcHJvbWlzZUxpYiA9IHByb21pc2VMaWJyYXJ5O1xuICAgICAgICBjb2xsZWN0aW9uLnByb21pc2VMaWJyYXJ5ID0gcHJvbWlzZUxpYnJhcnk7XG5cbiAgICAgICAgcmV0dXJuIHNhbmRib3g7XG4gICAgfTtcbn1cblxuU2FuZGJveC5wcm90b3R5cGUuYXNzZXJ0ID0gc2lub25Bc3NlcnQ7XG5TYW5kYm94LnByb3RvdHlwZS5tYXRjaCA9IG1hdGNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbmRib3g7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFycmF5UHJvdG8gPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLmFycmF5O1xudmFyIGNvbG9yID0gcmVxdWlyZShcIi4vY29sb3JcIik7XG52YXIgbWF0Y2ggPSByZXF1aXJlKFwiQHNpbm9uanMvc2Ftc2FtXCIpLmNyZWF0ZU1hdGNoZXI7XG52YXIgdGltZXNJbldvcmRzID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3RpbWVzLWluLXdvcmRzXCIpO1xudmFyIHNpbm9uRm9ybWF0ID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2Zvcm1hdFwiKTtcbnZhciBqc0RpZmYgPSByZXF1aXJlKFwiZGlmZlwiKTtcblxudmFyIGpvaW4gPSBhcnJheVByb3RvLmpvaW47XG52YXIgbWFwID0gYXJyYXlQcm90by5tYXA7XG52YXIgcHVzaCA9IGFycmF5UHJvdG8ucHVzaDtcblxuZnVuY3Rpb24gY29sb3JTaW5vbk1hdGNoVGV4dChtYXRjaGVyLCBjYWxsZWRBcmcsIGNhbGxlZEFyZ01lc3NhZ2UpIHtcbiAgICB2YXIgY2FsbGVkQXJndW1lbnRNZXNzYWdlID0gY2FsbGVkQXJnTWVzc2FnZTtcbiAgICBpZiAoIW1hdGNoZXIudGVzdChjYWxsZWRBcmcpKSB7XG4gICAgICAgIG1hdGNoZXIubWVzc2FnZSA9IGNvbG9yLnJlZChtYXRjaGVyLm1lc3NhZ2UpO1xuICAgICAgICBpZiAoY2FsbGVkQXJndW1lbnRNZXNzYWdlKSB7XG4gICAgICAgICAgICBjYWxsZWRBcmd1bWVudE1lc3NhZ2UgPSBjb2xvci5ncmVlbihjYWxsZWRBcmd1bWVudE1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYWxsZWRBcmd1bWVudE1lc3NhZ2UgKyBcIiBcIiArIG1hdGNoZXIubWVzc2FnZTtcbn1cblxuZnVuY3Rpb24gY29sb3JEaWZmVGV4dChkaWZmKSB7XG4gICAgdmFyIG9iamVjdHMgPSBtYXAoZGlmZiwgZnVuY3Rpb24ocGFydCkge1xuICAgICAgICB2YXIgdGV4dCA9IHBhcnQudmFsdWU7XG4gICAgICAgIGlmIChwYXJ0LmFkZGVkKSB7XG4gICAgICAgICAgICB0ZXh0ID0gY29sb3IuZ3JlZW4odGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFydC5yZW1vdmVkKSB7XG4gICAgICAgICAgICB0ZXh0ID0gY29sb3IucmVkKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaWZmLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdGV4dCArPSBcIiBcIjsgLy8gZm9ybWF0IHNpbXBsZSBkaWZmc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0pO1xuICAgIHJldHVybiBqb2luKG9iamVjdHMsIFwiXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjOiBmdW5jdGlvbihzcHlJbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gdGltZXNJbldvcmRzKHNweUluc3RhbmNlLmNhbGxDb3VudCk7XG4gICAgfSxcblxuICAgIG46IGZ1bmN0aW9uKHNweUluc3RhbmNlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBsb2NhbC1ydWxlcy9uby1wcm90b3R5cGUtbWV0aG9kc1xuICAgICAgICByZXR1cm4gc3B5SW5zdGFuY2UudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgRDogZnVuY3Rpb24oc3B5SW5zdGFuY2UsIGFyZ3MpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3B5SW5zdGFuY2UuY2FsbENvdW50OyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAvLyBkZXNjcmliZSBtdWx0aXBsZSBjYWxsc1xuICAgICAgICAgICAgaWYgKGwgPiAxKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcbkNhbGwgXCIgKyAoaSArIDEpICsgXCI6XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FsbGVkQXJncyA9IHNweUluc3RhbmNlLmdldENhbGwoaSkuYXJncztcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FsbGVkQXJncy5sZW5ndGggfHwgaiA8IGFyZ3MubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxlZEFyZ01lc3NhZ2UgPSBqIDwgY2FsbGVkQXJncy5sZW5ndGggPyBzaW5vbkZvcm1hdChjYWxsZWRBcmdzW2pdKSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoLmlzTWF0Y2hlcihhcmdzW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGNvbG9yU2lub25NYXRjaFRleHQoYXJnc1tqXSwgY2FsbGVkQXJnc1tqXSwgY2FsbGVkQXJnTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGVjdGVkQXJnTWVzc2FnZSA9IGogPCBhcmdzLmxlbmd0aCA/IHNpbm9uRm9ybWF0KGFyZ3Nbal0pIDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmYgPSBqc0RpZmYuZGlmZkpzb24oY2FsbGVkQXJnTWVzc2FnZSwgZXhwZWN0ZWRBcmdNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBjb2xvckRpZmZUZXh0KGRpZmYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0sXG5cbiAgICBDOiBmdW5jdGlvbihzcHlJbnN0YW5jZSkge1xuICAgICAgICB2YXIgY2FsbHMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHNweUluc3RhbmNlLmNhbGxDb3VudDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGxvY2FsLXJ1bGVzL25vLXByb3RvdHlwZS1tZXRob2RzXG4gICAgICAgICAgICB2YXIgc3RyaW5naWZpZWRDYWxsID0gXCIgICAgXCIgKyBzcHlJbnN0YW5jZS5nZXRDYWxsKGkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoL1xcbi8udGVzdChjYWxsc1tpIC0gMV0pKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5naWZpZWRDYWxsID0gXCJcXG5cIiArIHN0cmluZ2lmaWVkQ2FsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHB1c2goY2FsbHMsIHN0cmluZ2lmaWVkQ2FsbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FsbHMubGVuZ3RoID4gMCA/IFwiXFxuXCIgKyBqb2luKGNhbGxzLCBcIlxcblwiKSA6IFwiXCI7XG4gICAgfSxcblxuICAgIHQ6IGZ1bmN0aW9uKHNweUluc3RhbmNlKSB7XG4gICAgICAgIHZhciBvYmplY3RzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzcHlJbnN0YW5jZS5jYWxsQ291bnQ7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIHB1c2gob2JqZWN0cywgc2lub25Gb3JtYXQoc3B5SW5zdGFuY2UudGhpc1ZhbHVlc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGpvaW4ob2JqZWN0cywgXCIsIFwiKTtcbiAgICB9LFxuXG4gICAgXCIqXCI6IGZ1bmN0aW9uKHNweUluc3RhbmNlLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBqb2luKFxuICAgICAgICAgICAgbWFwKGFyZ3MsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5vbkZvcm1hdChhcmcpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBcIiwgXCJcbiAgICAgICAgKTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheVByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheTtcbnZhciBjcmVhdGVQcm94eSA9IHJlcXVpcmUoXCIuL3Byb3h5XCIpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9leHRlbmRcIik7XG52YXIgZnVuY3Rpb25OYW1lID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikuZnVuY3Rpb25OYW1lO1xudmFyIGdldFByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9nZXQtcHJvcGVydHktZGVzY3JpcHRvclwiKTtcbnZhciBkZWVwRXF1YWwgPSByZXF1aXJlKFwiQHNpbm9uanMvc2Ftc2FtXCIpLmRlZXBFcXVhbDtcbnZhciBpc0VzTW9kdWxlID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2lzLWVzLW1vZHVsZVwiKTtcbnZhciBwcm94eUNhbGxVdGlsID0gcmVxdWlyZShcIi4vcHJveHktY2FsbC11dGlsXCIpO1xudmFyIHdhbGtPYmplY3QgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvd2Fsay1vYmplY3RcIik7XG52YXIgd3JhcE1ldGhvZCA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS93cmFwLW1ldGhvZFwiKTtcbnZhciBzaW5vbkZvcm1hdCA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9mb3JtYXRcIik7XG52YXIgdmFsdWVUb1N0cmluZyA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnZhbHVlVG9TdHJpbmc7XG5cbi8qIGNhY2hlIHJlZmVyZW5jZXMgdG8gbGlicmFyeSBtZXRob2RzIHNvIHRoYXQgdGhleSBhbHNvIGNhbiBiZSBzdHViYmVkIHdpdGhvdXQgcHJvYmxlbXMgKi9cbnZhciBmb3JFYWNoID0gYXJyYXlQcm90by5mb3JFYWNoO1xudmFyIHBvcCA9IGFycmF5UHJvdG8ucG9wO1xudmFyIHB1c2ggPSBhcnJheVByb3RvLnB1c2g7XG52YXIgc2xpY2UgPSBhcnJheVByb3RvLnNsaWNlO1xudmFyIGZpbHRlciA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXI7XG5cbnZhciB1dWlkID0gMDtcblxuZnVuY3Rpb24gbWF0Y2hlcyhmYWtlLCBhcmdzLCBzdHJpY3QpIHtcbiAgICB2YXIgbWFyZ3MgPSBmYWtlLm1hdGNoaW5nQXJndW1lbnRzO1xuICAgIGlmIChtYXJncy5sZW5ndGggPD0gYXJncy5sZW5ndGggJiYgZGVlcEVxdWFsKHNsaWNlKGFyZ3MsIDAsIG1hcmdzLmxlbmd0aCksIG1hcmdzKSkge1xuICAgICAgICByZXR1cm4gIXN0cmljdCB8fCBtYXJncy5sZW5ndGggPT09IGFyZ3MubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFB1YmxpYyBBUElcbnZhciBzcHlBcGkgPSB7XG4gICAgZm9ybWF0dGVyczogcmVxdWlyZShcIi4vc3B5LWZvcm1hdHRlcnNcIiksXG5cbiAgICB3aXRoQXJnczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2xpY2UoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIG1hdGNoaW5nID0gcG9wKHRoaXMubWF0Y2hpbmdGYWtlcyhhcmdzLCB0cnVlKSk7XG4gICAgICAgIGlmIChtYXRjaGluZykge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9yaWdpbmFsID0gdGhpcztcbiAgICAgICAgdmFyIGZha2UgPSB0aGlzLmluc3RhbnRpYXRlRmFrZSgpO1xuICAgICAgICBmYWtlLm1hdGNoaW5nQXJndW1lbnRzID0gYXJncztcbiAgICAgICAgZmFrZS5wYXJlbnQgPSB0aGlzO1xuICAgICAgICBwdXNoKHRoaXMuZmFrZXMsIGZha2UpO1xuXG4gICAgICAgIGZha2Uud2l0aEFyZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbC53aXRoQXJncy5hcHBseShvcmlnaW5hbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3JFYWNoKG9yaWdpbmFsLmFyZ3MsIGZ1bmN0aW9uKGFyZywgaSkge1xuICAgICAgICAgICAgaWYgKCFtYXRjaGVzKGZha2UsIGFyZykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb3h5Q2FsbFV0aWwuaW5jcmVtZW50Q2FsbENvdW50KGZha2UpO1xuICAgICAgICAgICAgcHVzaChmYWtlLnRoaXNWYWx1ZXMsIG9yaWdpbmFsLnRoaXNWYWx1ZXNbaV0pO1xuICAgICAgICAgICAgcHVzaChmYWtlLmFyZ3MsIGFyZyk7XG4gICAgICAgICAgICBwdXNoKGZha2UucmV0dXJuVmFsdWVzLCBvcmlnaW5hbC5yZXR1cm5WYWx1ZXNbaV0pO1xuICAgICAgICAgICAgcHVzaChmYWtlLmV4Y2VwdGlvbnMsIG9yaWdpbmFsLmV4Y2VwdGlvbnNbaV0pO1xuICAgICAgICAgICAgcHVzaChmYWtlLmNhbGxJZHMsIG9yaWdpbmFsLmNhbGxJZHNbaV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcm94eUNhbGxVdGlsLmNyZWF0ZUNhbGxQcm9wZXJ0aWVzKGZha2UpO1xuXG4gICAgICAgIHJldHVybiBmYWtlO1xuICAgIH0sXG5cbiAgICAvLyBPdmVycmlkZSBwcm94eSBkZWZhdWx0IGltcGxlbWVudGF0aW9uXG4gICAgbWF0Y2hpbmdGYWtlczogZnVuY3Rpb24oYXJncywgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLmZha2VzLCBmdW5jdGlvbihmYWtlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlcyhmYWtlLCBhcmdzLCBzdHJpY3QpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcHJpbnRmOiBmdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgdmFyIHNweUluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMsIDEpO1xuICAgICAgICB2YXIgZm9ybWF0dGVyO1xuXG4gICAgICAgIHJldHVybiAoZm9ybWF0IHx8IFwiXCIpLnJlcGxhY2UoLyUoLikvZywgZnVuY3Rpb24obWF0Y2gsIHNwZWNpZnllcikge1xuICAgICAgICAgICAgZm9ybWF0dGVyID0gc3B5QXBpLmZvcm1hdHRlcnNbc3BlY2lmeWVyXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXR0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcoZm9ybWF0dGVyKHNweUluc3RhbmNlLCBhcmdzKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihwYXJzZUludChzcGVjaWZ5ZXIsIDEwKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2lub25Gb3JtYXQoYXJnc1tzcGVjaWZ5ZXIgLSAxXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBcIiVcIiArIHNwZWNpZnllcjtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuLyogZXNsaW50LWRpc2FibGUgbG9jYWwtcnVsZXMvbm8tcHJvdG90eXBlLW1ldGhvZHMgKi9cbnZhciBkZWxlZ2F0ZVRvQ2FsbHMgPSBwcm94eUNhbGxVdGlsLmRlbGVnYXRlVG9DYWxscztcbmRlbGVnYXRlVG9DYWxscyhzcHlBcGksIFwiY2FsbEFyZ1wiLCBmYWxzZSwgXCJjYWxsQXJnV2l0aFwiLCB0cnVlLCBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy50b1N0cmluZygpICsgXCIgY2Fubm90IGNhbGwgYXJnIHNpbmNlIGl0IHdhcyBub3QgeWV0IGludm9rZWQuXCIpO1xufSk7XG5zcHlBcGkuY2FsbEFyZ1dpdGggPSBzcHlBcGkuY2FsbEFyZztcbmRlbGVnYXRlVG9DYWxscyhzcHlBcGksIFwiY2FsbEFyZ09uXCIsIGZhbHNlLCBcImNhbGxBcmdPbldpdGhcIiwgdHJ1ZSwgZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudG9TdHJpbmcoKSArIFwiIGNhbm5vdCBjYWxsIGFyZyBzaW5jZSBpdCB3YXMgbm90IHlldCBpbnZva2VkLlwiKTtcbn0pO1xuc3B5QXBpLmNhbGxBcmdPbldpdGggPSBzcHlBcGkuY2FsbEFyZ09uO1xuZGVsZWdhdGVUb0NhbGxzKHNweUFwaSwgXCJ0aHJvd0FyZ1wiLCBmYWxzZSwgXCJ0aHJvd0FyZ1wiLCBmYWxzZSwgZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudG9TdHJpbmcoKSArIFwiIGNhbm5vdCB0aHJvdyBhcmcgc2luY2UgaXQgd2FzIG5vdCB5ZXQgaW52b2tlZC5cIik7XG59KTtcbmRlbGVnYXRlVG9DYWxscyhzcHlBcGksIFwieWllbGRcIiwgZmFsc2UsIFwieWllbGRcIiwgdHJ1ZSwgZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudG9TdHJpbmcoKSArIFwiIGNhbm5vdCB5aWVsZCBzaW5jZSBpdCB3YXMgbm90IHlldCBpbnZva2VkLlwiKTtcbn0pO1xuLy8gXCJpbnZva2VDYWxsYmFja1wiIGlzIGFuIGFsaWFzIGZvciBcInlpZWxkXCIgc2luY2UgXCJ5aWVsZFwiIGlzIGludmFsaWQgaW4gc3RyaWN0IG1vZGUuXG5zcHlBcGkuaW52b2tlQ2FsbGJhY2sgPSBzcHlBcGkueWllbGQ7XG5kZWxlZ2F0ZVRvQ2FsbHMoc3B5QXBpLCBcInlpZWxkT25cIiwgZmFsc2UsIFwieWllbGRPblwiLCB0cnVlLCBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy50b1N0cmluZygpICsgXCIgY2Fubm90IHlpZWxkIHNpbmNlIGl0IHdhcyBub3QgeWV0IGludm9rZWQuXCIpO1xufSk7XG5kZWxlZ2F0ZVRvQ2FsbHMoc3B5QXBpLCBcInlpZWxkVG9cIiwgZmFsc2UsIFwieWllbGRUb1wiLCB0cnVlLCBmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgdGhpcy50b1N0cmluZygpICsgXCIgY2Fubm90IHlpZWxkIHRvICdcIiArIHZhbHVlVG9TdHJpbmcocHJvcGVydHkpICsgXCInIHNpbmNlIGl0IHdhcyBub3QgeWV0IGludm9rZWQuXCJcbiAgICApO1xufSk7XG5kZWxlZ2F0ZVRvQ2FsbHMoc3B5QXBpLCBcInlpZWxkVG9PblwiLCBmYWxzZSwgXCJ5aWVsZFRvT25cIiwgdHJ1ZSwgZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIHRoaXMudG9TdHJpbmcoKSArIFwiIGNhbm5vdCB5aWVsZCB0byAnXCIgKyB2YWx1ZVRvU3RyaW5nKHByb3BlcnR5KSArIFwiJyBzaW5jZSBpdCB3YXMgbm90IHlldCBpbnZva2VkLlwiXG4gICAgKTtcbn0pO1xuLyogZXNsaW50LWVuYWJsZSBsb2NhbC1ydWxlcy9uby1wcm90b3R5cGUtbWV0aG9kcyAqL1xuXG5mdW5jdGlvbiBjcmVhdGVTcHkoZnVuYykge1xuICAgIHZhciBuYW1lO1xuICAgIHZhciBmdW5rID0gZnVuYztcblxuICAgIGlmICh0eXBlb2YgZnVuayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGZ1bmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuYW1lID0gZnVuY3Rpb25OYW1lKGZ1bmspO1xuICAgIH1cblxuICAgIHZhciBwcm94eSA9IGNyZWF0ZVByb3h5KGZ1bmssIGZ1bmspO1xuXG4gICAgLy8gSW5oZXJpdCBzcHkgQVBJOlxuICAgIGV4dGVuZC5ub25FbnVtKHByb3h5LCBzcHlBcGkpO1xuICAgIGV4dGVuZC5ub25FbnVtKHByb3h5LCB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBuYW1lIHx8IFwic3B5XCIsXG4gICAgICAgIGZha2VzOiBbXSxcbiAgICAgICAgaW5zdGFudGlhdGVGYWtlOiBjcmVhdGVTcHksXG4gICAgICAgIGlkOiBcInNweSNcIiArIHV1aWQrK1xuICAgIH0pO1xuICAgIHJldHVybiBwcm94eTtcbn1cblxuZnVuY3Rpb24gc3B5KG9iamVjdCwgcHJvcGVydHksIHR5cGVzKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IsIG1ldGhvZERlc2M7XG5cbiAgICBpZiAoaXNFc01vZHVsZShvYmplY3QpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFUyBNb2R1bGVzIGNhbm5vdCBiZSBzcGllZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXByb3BlcnR5ICYmIHR5cGVvZiBvYmplY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlU3B5KG9iamVjdCk7XG4gICAgfVxuXG4gICAgaWYgKCFwcm9wZXJ0eSAmJiB0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiB3YWxrT2JqZWN0KHNweSwgb2JqZWN0KTtcbiAgICB9XG5cbiAgICBpZiAoIW9iamVjdCAmJiAhcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVNweShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0eXBlcykge1xuICAgICAgICByZXR1cm4gd3JhcE1ldGhvZChvYmplY3QsIHByb3BlcnR5LCBjcmVhdGVTcHkob2JqZWN0W3Byb3BlcnR5XSkpO1xuICAgIH1cblxuICAgIGRlc2NyaXB0b3IgPSB7fTtcbiAgICBtZXRob2REZXNjID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgZm9yRWFjaCh0eXBlcywgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICBkZXNjcmlwdG9yW3R5cGVdID0gY3JlYXRlU3B5KG1ldGhvZERlc2NbdHlwZV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHdyYXBNZXRob2Qob2JqZWN0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvcik7XG59XG5cbmV4dGVuZChzcHksIHNweUFwaSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNweTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyYXlQcm90byA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXk7XG52YXIgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi9iZWhhdmlvclwiKTtcbnZhciBiZWhhdmlvcnMgPSByZXF1aXJlKFwiLi9kZWZhdWx0LWJlaGF2aW9yc1wiKTtcbnZhciBjcmVhdGVQcm94eSA9IHJlcXVpcmUoXCIuL3Byb3h5XCIpO1xudmFyIGZ1bmN0aW9uTmFtZSA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLmZ1bmN0aW9uTmFtZTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMub2JqZWN0Lmhhc093blByb3BlcnR5O1xudmFyIGlzTm9uRXhpc3RlbnRPd25Qcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9pcy1ub24tZXhpc3RlbnQtb3duLXByb3BlcnR5XCIpO1xudmFyIHNweSA9IHJlcXVpcmUoXCIuL3NweVwiKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKFwiLi91dGlsL2NvcmUvZXh0ZW5kXCIpO1xudmFyIGdldFByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3V0aWwvY29yZS9nZXQtcHJvcGVydHktZGVzY3JpcHRvclwiKTtcbnZhciBpc0VzTW9kdWxlID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL2lzLWVzLW1vZHVsZVwiKTtcbnZhciB3cmFwTWV0aG9kID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3dyYXAtbWV0aG9kXCIpO1xudmFyIHRocm93T25GYWxzeU9iamVjdCA9IHJlcXVpcmUoXCIuL3Rocm93LW9uLWZhbHN5LW9iamVjdFwiKTtcbnZhciB2YWx1ZVRvU3RyaW5nID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikudmFsdWVUb1N0cmluZztcbnZhciB3YWxrT2JqZWN0ID0gcmVxdWlyZShcIi4vdXRpbC9jb3JlL3dhbGstb2JqZWN0XCIpO1xuXG52YXIgZm9yRWFjaCA9IGFycmF5UHJvdG8uZm9yRWFjaDtcbnZhciBwb3AgPSBhcnJheVByb3RvLnBvcDtcbnZhciBzbGljZSA9IGFycmF5UHJvdG8uc2xpY2U7XG52YXIgc29ydCA9IGFycmF5UHJvdG8uc29ydDtcblxudmFyIHV1aWQgPSAwO1xuXG5mdW5jdGlvbiBjcmVhdGVTdHViKG9yaWdpbmFsRnVuYykge1xuICAgIHZhciBwcm94eTtcblxuICAgIGZ1bmN0aW9uIGZ1bmN0aW9uU3R1YigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMpO1xuICAgICAgICB2YXIgbWF0Y2hpbmdzID0gcHJveHkubWF0Y2hpbmdGYWtlcyhhcmdzKTtcblxuICAgICAgICB2YXIgZm5TdHViID1cbiAgICAgICAgICAgIHBvcChcbiAgICAgICAgICAgICAgICBzb3J0KG1hdGNoaW5ncywgZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5tYXRjaGluZ0FyZ3VtZW50cy5sZW5ndGggLSBiLm1hdGNoaW5nQXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSB8fCBwcm94eTtcbiAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRCZWhhdmlvcihmblN0dWIpLmludm9rZSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHByb3h5ID0gY3JlYXRlUHJveHkoZnVuY3Rpb25TdHViLCBvcmlnaW5hbEZ1bmMgfHwgZnVuY3Rpb25TdHViKTtcbiAgICAvLyBJbmhlcml0IHNweSBBUEk6XG4gICAgZXh0ZW5kLm5vbkVudW0ocHJveHksIHNweSk7XG4gICAgLy8gSW5oZXJpdCBzdHViIEFQSTpcbiAgICBleHRlbmQubm9uRW51bShwcm94eSwgc3R1Yik7XG5cbiAgICB2YXIgbmFtZSA9IG9yaWdpbmFsRnVuYyA/IGZ1bmN0aW9uTmFtZShvcmlnaW5hbEZ1bmMpIDogbnVsbDtcbiAgICBleHRlbmQubm9uRW51bShwcm94eSwge1xuICAgICAgICBmYWtlczogW10sXG4gICAgICAgIGluc3RhbnRpYXRlRmFrZTogY3JlYXRlU3R1YixcbiAgICAgICAgZGlzcGxheU5hbWU6IG5hbWUgfHwgXCJzdHViXCIsXG4gICAgICAgIGRlZmF1bHRCZWhhdmlvcjogbnVsbCxcbiAgICAgICAgYmVoYXZpb3JzOiBbXSxcbiAgICAgICAgaWQ6IFwic3R1YiNcIiArIHV1aWQrK1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb3h5O1xufVxuXG5mdW5jdGlvbiBzdHViKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInN0dWIob2JqLCAnbWV0aCcsIGZuKSBoYXMgYmVlbiByZW1vdmVkLCBzZWUgZG9jdW1lbnRhdGlvblwiKTtcbiAgICB9XG5cbiAgICBpZiAoaXNFc01vZHVsZShvYmplY3QpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFUyBNb2R1bGVzIGNhbm5vdCBiZSBzdHViYmVkXCIpO1xuICAgIH1cblxuICAgIHRocm93T25GYWxzeU9iamVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKGlzTm9uRXhpc3RlbnRPd25Qcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHN0dWIgbm9uLWV4aXN0ZW50IG93biBwcm9wZXJ0eSBcIiArIHZhbHVlVG9TdHJpbmcocHJvcGVydHkpKTtcbiAgICB9XG5cbiAgICB2YXIgYWN0dWFsRGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICB2YXIgaXNPYmplY3RPckZ1bmN0aW9uID0gdHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb2JqZWN0ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgdmFyIGlzU3R1YmJpbmdFbnRpcmVPYmplY3QgPSB0eXBlb2YgcHJvcGVydHkgPT09IFwidW5kZWZpbmVkXCIgJiYgaXNPYmplY3RPckZ1bmN0aW9uO1xuICAgIHZhciBpc0NyZWF0aW5nTmV3U3R1YiA9ICFvYmplY3QgJiYgdHlwZW9mIHByb3BlcnR5ID09PSBcInVuZGVmaW5lZFwiO1xuICAgIHZhciBpc1N0dWJiaW5nTm9uRnVuY1Byb3BlcnR5ID1cbiAgICAgICAgaXNPYmplY3RPckZ1bmN0aW9uICYmXG4gICAgICAgIHR5cGVvZiBwcm9wZXJ0eSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAodHlwZW9mIGFjdHVhbERlc2NyaXB0b3IgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGFjdHVhbERlc2NyaXB0b3IudmFsdWUgIT09IFwiZnVuY3Rpb25cIikgJiZcbiAgICAgICAgdHlwZW9mIGRlc2NyaXB0b3IgPT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICBpZiAoaXNTdHViYmluZ0VudGlyZU9iamVjdCkge1xuICAgICAgICByZXR1cm4gd2Fsa09iamVjdChzdHViLCBvYmplY3QpO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0aW5nTmV3U3R1Yikge1xuICAgICAgICByZXR1cm4gY3JlYXRlU3R1YigpO1xuICAgIH1cblxuICAgIHZhciBmdW5jID0gdHlwZW9mIGFjdHVhbERlc2NyaXB0b3IudmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IGFjdHVhbERlc2NyaXB0b3IudmFsdWUgOiBudWxsO1xuICAgIHZhciBzID0gY3JlYXRlU3R1YihmdW5jKTtcblxuICAgIGV4dGVuZC5ub25FbnVtKHMsIHtcbiAgICAgICAgcm9vdE9iajogb2JqZWN0LFxuICAgICAgICBwcm9wTmFtZTogcHJvcGVydHksXG4gICAgICAgIHJlc3RvcmU6IGZ1bmN0aW9uIHJlc3RvcmUoKSB7XG4gICAgICAgICAgICBpZiAoYWN0dWFsRGVzY3JpcHRvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIGFjdHVhbERlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBpc1N0dWJiaW5nTm9uRnVuY1Byb3BlcnR5ID8gcyA6IHdyYXBNZXRob2Qob2JqZWN0LCBwcm9wZXJ0eSwgcyk7XG59XG5cbnN0dWIuY3JlYXRlU3R1Ykluc3RhbmNlID0gZnVuY3Rpb24oY29uc3RydWN0b3IsIG92ZXJyaWRlcykge1xuICAgIGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIGNvbnN0cnVjdG9yIHNob3VsZCBiZSBhIGZ1bmN0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB2YXIgc3R1YmJlZE9iamVjdCA9IHN0dWIoT2JqZWN0LmNyZWF0ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpKTtcblxuICAgIGZvckVhY2goT2JqZWN0LmtleXMob3ZlcnJpZGVzIHx8IHt9KSwgZnVuY3Rpb24ocHJvcGVydHlOYW1lKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgaW4gc3R1YmJlZE9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gb3ZlcnJpZGVzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuY3JlYXRlU3R1Ykluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgc3R1YmJlZE9iamVjdFtwcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0dWJiZWRPYmplY3RbcHJvcGVydHlOYW1lXS5yZXR1cm5zKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHViIFwiICsgcHJvcGVydHlOYW1lICsgXCIuIFByb3BlcnR5IGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHViYmVkT2JqZWN0O1xufTtcblxuLyplc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSovXG5mdW5jdGlvbiBnZXRQYXJlbnRCZWhhdmlvdXIoc3R1Ykluc3RhbmNlKSB7XG4gICAgcmV0dXJuIHN0dWJJbnN0YW5jZS5wYXJlbnQgJiYgZ2V0Q3VycmVudEJlaGF2aW9yKHN0dWJJbnN0YW5jZS5wYXJlbnQpO1xufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QmVoYXZpb3Ioc3R1Ykluc3RhbmNlKSB7XG4gICAgcmV0dXJuIHN0dWJJbnN0YW5jZS5kZWZhdWx0QmVoYXZpb3IgfHwgZ2V0UGFyZW50QmVoYXZpb3VyKHN0dWJJbnN0YW5jZSkgfHwgYmVoYXZpb3IuY3JlYXRlKHN0dWJJbnN0YW5jZSk7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRCZWhhdmlvcihzdHViSW5zdGFuY2UpIHtcbiAgICB2YXIgY3VycmVudEJlaGF2aW9yID0gc3R1Ykluc3RhbmNlLmJlaGF2aW9yc1tzdHViSW5zdGFuY2UuY2FsbENvdW50IC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnRCZWhhdmlvciAmJiBjdXJyZW50QmVoYXZpb3IuaXNQcmVzZW50KCkgPyBjdXJyZW50QmVoYXZpb3IgOiBnZXREZWZhdWx0QmVoYXZpb3Ioc3R1Ykluc3RhbmNlKTtcbn1cbi8qZXNsaW50LWVuYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSovXG5cbnZhciBwcm90byA9IHtcbiAgICByZXNldEJlaGF2aW9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0QmVoYXZpb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmJlaGF2aW9ycyA9IFtdO1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLnJldHVyblZhbHVlO1xuICAgICAgICBkZWxldGUgdGhpcy5yZXR1cm5BcmdBdDtcbiAgICAgICAgZGVsZXRlIHRoaXMudGhyb3dBcmdBdDtcbiAgICAgICAgZGVsZXRlIHRoaXMucmVzb2x2ZUFyZ0F0O1xuICAgICAgICBkZWxldGUgdGhpcy5mYWtlRm47XG4gICAgICAgIHRoaXMucmV0dXJuVGhpcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc29sdmVUaGlzID0gZmFsc2U7XG5cbiAgICAgICAgZm9yRWFjaCh0aGlzLmZha2VzLCBmdW5jdGlvbihmYWtlKSB7XG4gICAgICAgICAgICBmYWtlLnJlc2V0QmVoYXZpb3IoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZXNldEhpc3RvcnkoKTtcbiAgICAgICAgdGhpcy5yZXNldEJlaGF2aW9yKCk7XG4gICAgfSxcblxuICAgIG9uQ2FsbDogZnVuY3Rpb24gb25DYWxsKGluZGV4KSB7XG4gICAgICAgIGlmICghdGhpcy5iZWhhdmlvcnNbaW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLmJlaGF2aW9yc1tpbmRleF0gPSBiZWhhdmlvci5jcmVhdGUodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5iZWhhdmlvcnNbaW5kZXhdO1xuICAgIH0sXG5cbiAgICBvbkZpcnN0Q2FsbDogZnVuY3Rpb24gb25GaXJzdENhbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uQ2FsbCgwKTtcbiAgICB9LFxuXG4gICAgb25TZWNvbmRDYWxsOiBmdW5jdGlvbiBvblNlY29uZENhbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uQ2FsbCgxKTtcbiAgICB9LFxuXG4gICAgb25UaGlyZENhbGw6IGZ1bmN0aW9uIG9uVGhpcmRDYWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkNhbGwoMik7XG4gICAgfSxcblxuICAgIHdpdGhBcmdzOiBmdW5jdGlvbiB3aXRoQXJncygpIHtcbiAgICAgICAgdmFyIGZha2UgPSBzcHkud2l0aEFyZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEJlaGF2aW9yICYmIHRoaXMuZGVmYXVsdEJlaGF2aW9yLnByb21pc2VMaWJyYXJ5KSB7XG4gICAgICAgICAgICBmYWtlLmRlZmF1bHRCZWhhdmlvciA9IGZha2UuZGVmYXVsdEJlaGF2aW9yIHx8IGJlaGF2aW9yLmNyZWF0ZShmYWtlKTtcbiAgICAgICAgICAgIGZha2UuZGVmYXVsdEJlaGF2aW9yLnByb21pc2VMaWJyYXJ5ID0gdGhpcy5kZWZhdWx0QmVoYXZpb3IucHJvbWlzZUxpYnJhcnk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZha2U7XG4gICAgfVxufTtcblxuZm9yRWFjaChPYmplY3Qua2V5cyhiZWhhdmlvciksIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGlmIChcbiAgICAgICAgaGFzT3duUHJvcGVydHkoYmVoYXZpb3IsIG1ldGhvZCkgJiZcbiAgICAgICAgIWhhc093blByb3BlcnR5KHByb3RvLCBtZXRob2QpICYmXG4gICAgICAgIG1ldGhvZCAhPT0gXCJjcmVhdGVcIiAmJlxuICAgICAgICBtZXRob2QgIT09IFwiaW52b2tlXCJcbiAgICApIHtcbiAgICAgICAgcHJvdG9bbWV0aG9kXSA9IGJlaGF2aW9yLmNyZWF0ZUJlaGF2aW9yKG1ldGhvZCk7XG4gICAgfVxufSk7XG5cbmZvckVhY2goT2JqZWN0LmtleXMoYmVoYXZpb3JzKSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KGJlaGF2aW9ycywgbWV0aG9kKSAmJiAhaGFzT3duUHJvcGVydHkocHJvdG8sIG1ldGhvZCkpIHtcbiAgICAgICAgYmVoYXZpb3IuYWRkQmVoYXZpb3Ioc3R1YiwgbWV0aG9kLCBiZWhhdmlvcnNbbWV0aG9kXSk7XG4gICAgfVxufSk7XG5cbmV4dGVuZChzdHViLCBwcm90byk7XG5tb2R1bGUuZXhwb3J0cyA9IHN0dWI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciB2YWx1ZVRvU3RyaW5nID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikudmFsdWVUb1N0cmluZztcblxuZnVuY3Rpb24gdGhyb3dPbkZhbHN5T2JqZWN0KG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBpZiAocHJvcGVydHkgJiYgIW9iamVjdCkge1xuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdCA9PT0gbnVsbCA/IFwibnVsbFwiIDogXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJ5aW5nIHRvIHN0dWIgcHJvcGVydHkgJ1wiICsgdmFsdWVUb1N0cmluZyhwcm9wZXJ0eSkgKyBcIicgb2YgXCIgKyB0eXBlKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3dPbkZhbHN5T2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluamVjdEludG86IG51bGwsXG4gICAgcHJvcGVydGllczogW1xuICAgICAgICBcInNweVwiLFxuICAgICAgICBcInN0dWJcIixcbiAgICAgICAgXCJtb2NrXCIsXG4gICAgICAgIFwiY2xvY2tcIixcbiAgICAgICAgXCJzZXJ2ZXJcIixcbiAgICAgICAgXCJyZXF1ZXN0c1wiLFxuICAgICAgICBcImZha2VcIixcbiAgICAgICAgXCJyZXBsYWNlXCIsXG4gICAgICAgIFwicmVwbGFjZVNldHRlclwiLFxuICAgICAgICBcInJlcGxhY2VHZXR0ZXJcIixcbiAgICAgICAgXCJjcmVhdGVTdHViSW5zdGFuY2VcIlxuICAgIF0sXG4gICAgdXNlRmFrZVRpbWVyczogdHJ1ZSxcbiAgICB1c2VGYWtlU2VydmVyOiB0cnVlXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheVByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheTtcbnZhciByZWR1Y2UgPSBhcnJheVByb3RvLnJlZHVjZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHBvcnRBc3luY0JlaGF2aW9ycyhiZWhhdmlvck1ldGhvZHMpIHtcbiAgICByZXR1cm4gcmVkdWNlKFxuICAgICAgICBPYmplY3Qua2V5cyhiZWhhdmlvck1ldGhvZHMpLFxuICAgICAgICBmdW5jdGlvbihhY2MsIG1ldGhvZCkge1xuICAgICAgICAgICAgLy8gbmVlZCB0byBhdm9pZCBjcmVhdGluZyBhbm90aGVyIGFzeW5jIHZlcnNpb25zIG9mIHRoZSBuZXdseSBhZGRlZCBhc3luYyBtZXRob2RzXG4gICAgICAgICAgICBpZiAobWV0aG9kLm1hdGNoKC9eKGNhbGxzQXJnfHlpZWxkcykvKSAmJiAhbWV0aG9kLm1hdGNoKC9Bc3luYy8pKSB7XG4gICAgICAgICAgICAgICAgYWNjW21ldGhvZCArIFwiQXN5bmNcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGJlaGF2aW9yTWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tBc3luYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sXG4gICAgICAgIHt9XG4gICAgKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFycmF5UHJvdG8gPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLmFycmF5O1xudmFyIGhhc093blByb3BlcnR5ID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5vYmplY3QuaGFzT3duUHJvcGVydHk7XG5cbnZhciBqb2luID0gYXJyYXlQcm90by5qb2luO1xudmFyIHB1c2ggPSBhcnJheVByb3RvLnB1c2g7XG52YXIgc2xpY2UgPSBhcnJheVByb3RvLnNsaWNlO1xuXG4vLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9FQ01BU2NyaXB0X0RvbnRFbnVtX2F0dHJpYnV0ZSNKU2NyaXB0X0RvbnRFbnVtX0J1Z1xudmFyIGhhc0RvbnRFbnVtQnVnID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBvYmogPSB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjBcIjtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiMVwiO1xuICAgICAgICB9LFxuICAgICAgICB2YWx1ZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjJcIjtcbiAgICAgICAgfSxcbiAgICAgICAgdG9Mb2NhbGVTdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiM1wiO1xuICAgICAgICB9LFxuICAgICAgICBwcm90b3R5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiNFwiO1xuICAgICAgICB9LFxuICAgICAgICBpc1Byb3RvdHlwZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjVcIjtcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydHlJc0VudW1lcmFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiNlwiO1xuICAgICAgICB9LFxuICAgICAgICBoYXNPd25Qcm9wZXJ0eTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXCI3XCI7XG4gICAgICAgIH0sXG4gICAgICAgIGxlbmd0aDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXCI4XCI7XG4gICAgICAgIH0sXG4gICAgICAgIHVuaXF1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXCI5XCI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApKSB7XG4gICAgICAgICAgICBwdXNoKHJlc3VsdCwgb2JqW3Byb3BdKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBqb2luKHJlc3VsdCwgXCJcIikgIT09IFwiMDEyMzQ1Njc4OVwiO1xufSkoKTtcblxuZnVuY3Rpb24gZXh0ZW5kQ29tbW9uKHRhcmdldCwgc291cmNlcywgZG9Db3B5KSB7XG4gICAgdmFyIHNvdXJjZSwgaSwgcHJvcDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZXNbaV07XG5cbiAgICAgICAgZm9yIChwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5KHNvdXJjZSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBkb0NvcHkodGFyZ2V0LCBzb3VyY2UsIHByb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGNvcHkgKG93bikgdG9TdHJpbmcgbWV0aG9kIGV2ZW4gd2hlbiBpbiBKU2NyaXB0IHdpdGggRG9udEVudW0gYnVnXG4gICAgICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL0VDTUFTY3JpcHRfRG9udEVudW1fYXR0cmlidXRlI0pTY3JpcHRfRG9udEVudW1fQnVnXG4gICAgICAgIGlmIChoYXNEb250RW51bUJ1ZyAmJiBoYXNPd25Qcm9wZXJ0eShzb3VyY2UsIFwidG9TdHJpbmdcIikgJiYgc291cmNlLnRvU3RyaW5nICE9PSB0YXJnZXQudG9TdHJpbmcpIHtcbiAgICAgICAgICAgIHRhcmdldC50b1N0cmluZyA9IHNvdXJjZS50b1N0cmluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKiBQdWJsaWM6IEV4dGVuZCB0YXJnZXQgaW4gcGxhY2Ugd2l0aCBhbGwgKG93bikgcHJvcGVydGllcyBmcm9tIHNvdXJjZXMgaW4tb3JkZXIuIFRodXMsIGxhc3Qgc291cmNlIHdpbGxcbiAqICAgICAgICAgb3ZlcnJpZGUgcHJvcGVydGllcyBpbiBwcmV2aW91cyBzb3VyY2VzLlxuICpcbiAqIEBhcmcge09iamVjdH0gdGFyZ2V0IC0gVGhlIE9iamVjdCB0byBleHRlbmRcbiAqIEBhcmcge09iamVjdFtdfSBzb3VyY2VzIC0gT2JqZWN0cyB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgZXh0ZW5kZWQgdGFyZ2V0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCAvKiwgc291cmNlcyAqLykge1xuICAgIHZhciBzb3VyY2VzID0gc2xpY2UoYXJndW1lbnRzLCAxKTtcblxuICAgIHJldHVybiBleHRlbmRDb21tb24odGFyZ2V0LCBzb3VyY2VzLCBmdW5jdGlvbiBjb3B5VmFsdWUoZGVzdCwgc291cmNlLCBwcm9wKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgfSk7XG59O1xuXG4vKiogUHVibGljOiBFeHRlbmQgdGFyZ2V0IGluIHBsYWNlIHdpdGggYWxsIChvd24pIHByb3BlcnRpZXMgZnJvbSBzb3VyY2VzIGluLW9yZGVyLiBUaHVzLCBsYXN0IHNvdXJjZSB3aWxsXG4gKiAgICAgICAgIG92ZXJyaWRlIHByb3BlcnRpZXMgaW4gcHJldmlvdXMgc291cmNlcy4gRGVmaW5lIHRoZSBwcm9wZXJ0aWVzIGFzIG5vbiBlbnVtZXJhYmxlLlxuICpcbiAqIEBhcmcge09iamVjdH0gdGFyZ2V0IC0gVGhlIE9iamVjdCB0byBleHRlbmRcbiAqIEBhcmcge09iamVjdFtdfSBzb3VyY2VzIC0gT2JqZWN0cyB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgZXh0ZW5kZWQgdGFyZ2V0XG4gKi9cbm1vZHVsZS5leHBvcnRzLm5vbkVudW0gPSBmdW5jdGlvbiBleHRlbmROb25FbnVtKHRhcmdldCAvKiwgc291cmNlcyAqLykge1xuICAgIHZhciBzb3VyY2VzID0gc2xpY2UoYXJndW1lbnRzLCAxKTtcblxuICAgIHJldHVybiBleHRlbmRDb21tb24odGFyZ2V0LCBzb3VyY2VzLCBmdW5jdGlvbiBjb3B5UHJvcGVydHkoZGVzdCwgc291cmNlLCBwcm9wKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBwcm9wLCB7XG4gICAgICAgICAgICB2YWx1ZTogc291cmNlW3Byb3BdLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGZvcm1hdGlvID0gcmVxdWlyZShcIkBzaW5vbmpzL2Zvcm1hdGlvXCIpO1xuXG52YXIgZm9ybWF0dGVyID0gZm9ybWF0aW8uY29uZmlndXJlKHtcbiAgICBxdW90ZVN0cmluZ3M6IGZhbHNlLFxuICAgIGxpbWl0Q2hpbGRyZW5Db3VudDogMjUwXG59KTtcblxudmFyIGN1c3RvbUZvcm1hdHRlcjtcblxuZnVuY3Rpb24gZm9ybWF0KCkge1xuICAgIGlmIChjdXN0b21Gb3JtYXR0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGN1c3RvbUZvcm1hdHRlci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtYXR0ZXIuYXNjaWkuYXBwbHkoZm9ybWF0dGVyLCBhcmd1bWVudHMpO1xufVxuXG5mb3JtYXQuc2V0Rm9ybWF0dGVyID0gZnVuY3Rpb24oYUN1c3RvbUZvcm1hdHRlcikge1xuICAgIGlmICh0eXBlb2YgYUN1c3RvbUZvcm1hdHRlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImZvcm1hdC5zZXRGb3JtYXR0ZXIgbXVzdCBiZSBjYWxsZWQgd2l0aCBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGN1c3RvbUZvcm1hdHRlciA9IGFDdXN0b21Gb3JtYXR0ZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1hdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHZhciBpLCBwcm9wLCB0aGlzVmFsdWU7XG4gICAgaWYgKHRoaXMuZ2V0Q2FsbCAmJiB0aGlzLmNhbGxDb3VudCkge1xuICAgICAgICBpID0gdGhpcy5jYWxsQ291bnQ7XG5cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdGhpc1ZhbHVlID0gdGhpcy5nZXRDYWxsKGkpLnRoaXNWYWx1ZTtcblxuICAgICAgICAgICAgZm9yIChwcm9wIGluIHRoaXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzVmFsdWVbcHJvcF0gPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheU5hbWUgfHwgXCJzaW5vbiBmYWtlXCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0IDogbm90IHRlc3RpbmcgdGhhdCBzZXRUaW1lb3V0IHdvcmtzICovXG5mdW5jdGlvbiBuZXh0VGljayhjYWxsYmFjaykge1xuICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE5leHRUaWNrKHByb2Nlc3MsIHNldEltbWVkaWF0ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFRpY2s7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICB2YXIgcHJvdG8gPSBvYmplY3Q7XG4gICAgdmFyIGRlc2NyaXB0b3I7XG5cbiAgICB3aGlsZSAocHJvdG8gJiYgIShkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgcHJvcGVydHkpKSkge1xuICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9yO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFZlcmlmeSBpZiBhbiBvYmplY3QgaXMgYSBFQ01BU2NyaXB0IE1vZHVsZVxuICpcbiAqIEFzIHRoZSBleHBvcnRzIGZyb20gYSBtb2R1bGUgaXMgaW1tdXRhYmxlIHdlIGNhbm5vdCBhbHRlciB0aGUgZXhwb3J0c1xuICogdXNpbmcgc3BpZXMgb3Igc3R1YnMuIExldCB0aGUgY29uc3VtZXIga25vdyB0aGlzIHRvIGF2b2lkIGJ1ZyByZXBvcnRzXG4gKiBvbiB3ZWlyZCBlcnJvciBtZXNzYWdlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gZXhhbWluZVxuICpcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIHdoZW4gdGhlIG9iamVjdCBpcyBhIG1vZHVsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIG9iamVjdCAmJiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIG9iamVjdFtTeW1ib2wudG9TdHJpbmdUYWddID09PSBcIk1vZHVsZVwiICYmIE9iamVjdC5pc1NlYWxlZChvYmplY3QpXG4gICAgKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gaXNOb25FeGlzdGVudE93blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gb2JqZWN0ICYmIHR5cGVvZiBwcm9wZXJ0eSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhKHByb3BlcnR5IGluIG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOb25FeGlzdGVudE93blByb3BlcnR5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnZXRQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9nZXQtcHJvcGVydHktZGVzY3JpcHRvclwiKTtcblxuZnVuY3Rpb24gaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZShvYmosIHByb3BOYW1lKSB7XG4gICAgdmFyIHByb3BlcnR5RGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3BOYW1lKTtcblxuICAgIHJldHVybiBwcm9wZXJ0eURlc2NyaXB0b3IgPyBwcm9wZXJ0eURlc2NyaXB0b3IuY29uZmlndXJhYmxlIDogdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Byb3BlcnR5Q29uZmlndXJhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnbG9iYWxPYmplY3QgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5nbG9iYWw7XG52YXIgZ2V0TmV4dFRpY2sgPSByZXF1aXJlKFwiLi9nZXQtbmV4dC10aWNrXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5leHRUaWNrKGdsb2JhbE9iamVjdC5wcm9jZXNzLCBnbG9iYWxPYmplY3Quc2V0SW1tZWRpYXRlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyYXkgPSBbbnVsbCwgXCJvbmNlXCIsIFwidHdpY2VcIiwgXCJ0aHJpY2VcIl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGltZXNJbldvcmRzKGNvdW50KSB7XG4gICAgcmV0dXJuIGFycmF5W2NvdW50XSB8fCAoY291bnQgfHwgMCkgKyBcIiB0aW1lc1wiO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG5mdW5jdGlvbiB1c2VQcm9taXNlTGlicmFyeShsaWJyYXJ5LCBmYWtlcykge1xuICAgIGlmICh0eXBlb2YgbGlicmFyeSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmFrZXMpKSB7XG4gICAgICAgIGZvckVhY2guY2FsbChmYWtlcywgdXNlUHJvbWlzZUxpYnJhcnkuYmluZChudWxsLCBsaWJyYXJ5KSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZmFrZXMudXNpbmdQcm9taXNlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZmFrZXMudXNpbmdQcm9taXNlKGxpYnJhcnkpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VQcm9taXNlTGlicmFyeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZnVuY3Rpb25OYW1lID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikuZnVuY3Rpb25OYW1lO1xuXG52YXIgZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vZ2V0LXByb3BlcnR5LWRlc2NyaXB0b3JcIik7XG52YXIgd2FsayA9IHJlcXVpcmUoXCIuL3dhbGtcIik7XG5cbmZ1bmN0aW9uIHdhbGtPYmplY3QocHJlZGljYXRlLCBvYmplY3QsIGZpbHRlcikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgbmFtZSA9IGZ1bmN0aW9uTmFtZShwcmVkaWNhdGUpO1xuXG4gICAgaWYgKCFvYmplY3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJ5aW5nIHRvIFwiICsgbmFtZSArIFwiIG9iamVjdCBidXQgcmVjZWl2ZWQgXCIgKyBTdHJpbmcob2JqZWN0KSk7XG4gICAgfVxuXG4gICAgd2FsayhvYmplY3QsIGZ1bmN0aW9uKHByb3AsIHByb3BPd25lcikge1xuICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIHN0dWIgdGhpbmdzIGxpa2UgdG9TdHJpbmcoKSwgdmFsdWVPZigpLCBldGMuIHNvIHdlIG9ubHkgc3R1YiBpZiB0aGUgb2JqZWN0XG4gICAgICAgIC8vIGlzIG5vdCBPYmplY3QucHJvdG90eXBlXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHByb3BPd25lciAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgcHJvcCAhPT0gXCJjb25zdHJ1Y3RvclwiICYmXG4gICAgICAgICAgICB0eXBlb2YgZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHByb3BPd25lciwgcHJvcCkudmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyKG9iamVjdCwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlKG9iamVjdCwgcHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByZWRpY2F0ZShvYmplY3QsIHByb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCB0byBcIiArIG5hbWUgKyBcIiBtZXRob2RzIG9uIG9iamVjdCBidXQgZm91bmQgbm9uZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhbGtPYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLmFycmF5LmZvckVhY2g7XG5cbmZ1bmN0aW9uIHdhbGtJbnRlcm5hbChvYmosIGl0ZXJhdG9yLCBjb250ZXh0LCBvcmlnaW5hbE9iaiwgc2Vlbikge1xuICAgIHZhciBwcm90bywgcHJvcDtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBXZSBleHBsaWNpdGx5IHdhbnQgdG8gZW51bWVyYXRlIHRocm91Z2ggYWxsIG9mIHRoZSBwcm90b3R5cGUncyBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSwgdGhlcmVmb3JlIHdlIGRlbGliZXJhdGVseSBsZWF2ZSBvdXQgYW4gb3duIHByb3BlcnR5IGNoZWNrLlxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluICovXG4gICAgICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW3Byb3BdLCBwcm9wLCBvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvckVhY2goT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgICBpZiAoc2VlbltrXSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2VlbltrXSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrKS5nZXQgPT09IFwiZnVuY3Rpb25cIiA/IG9yaWdpbmFsT2JqIDogb2JqO1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBrLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIGlmIChwcm90bykge1xuICAgICAgICB3YWxrSW50ZXJuYWwocHJvdG8sIGl0ZXJhdG9yLCBjb250ZXh0LCBvcmlnaW5hbE9iaiwgc2Vlbik7XG4gICAgfVxufVxuXG4vKiBXYWxrcyB0aGUgcHJvdG90eXBlIGNoYWluIG9mIGFuIG9iamVjdCBhbmQgaXRlcmF0ZXMgb3ZlciBldmVyeSBvd24gcHJvcGVydHlcbiAqIG5hbWUgZW5jb3VudGVyZWQuIFRoZSBpdGVyYXRvciBpcyBjYWxsZWQgaW4gdGhlIHNhbWUgZmFzaGlvbiB0aGF0IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoXG4gKiB3b3Jrcywgd2hlcmUgaXQgaXMgcGFzc2VkIHRoZSB2YWx1ZSwga2V5LCBhbmQgb3duIG9iamVjdCBhcyB0aGUgMXN0LCAybmQsIGFuZCAzcmQgcG9zaXRpb25hbFxuICogYXJndW1lbnQsIHJlc3BlY3RpdmVseS4gSW4gY2FzZXMgd2hlcmUgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgaXMgbm90IGF2YWlsYWJsZSwgd2FsayB3aWxsXG4gKiBkZWZhdWx0IHRvIHVzaW5nIGEgc2ltcGxlIGZvci4uaW4gbG9vcC5cbiAqXG4gKiBvYmogLSBUaGUgb2JqZWN0IHRvIHdhbGsgdGhlIHByb3RvdHlwZSBjaGFpbiBmb3IuXG4gKiBpdGVyYXRvciAtIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZWFjaCBwYXNzIG9mIHRoZSB3YWxrLlxuICogY29udGV4dCAtIChPcHRpb25hbCkgV2hlbiBnaXZlbiwgdGhlIGl0ZXJhdG9yIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhpcyBvYmplY3QgYXMgdGhlIHJlY2VpdmVyLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdhbGsob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIHJldHVybiB3YWxrSW50ZXJuYWwob2JqLCBpdGVyYXRvciwgY29udGV4dCwgb2JqLCB7fSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnZXRQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9nZXQtcHJvcGVydHktZGVzY3JpcHRvclwiKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKFwiLi9leHRlbmRcIik7XG52YXIgaGFzT3duUHJvcGVydHkgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLm9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcbnZhciB2YWx1ZVRvU3RyaW5nID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikudmFsdWVUb1N0cmluZztcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiIHx8IEJvb2xlYW4ob2JqICYmIG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY2FsbCAmJiBvYmouYXBwbHkpO1xufVxuXG5mdW5jdGlvbiBtaXJyb3JQcm9wZXJ0aWVzKHRhcmdldCwgc291cmNlKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh0YXJnZXQsIHByb3ApKSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIENoZWFwIHdheSB0byBkZXRlY3QgaWYgd2UgaGF2ZSBFUzUgc3VwcG9ydC5cbnZhciBoYXNFUzVTdXBwb3J0ID0gXCJrZXlzXCIgaW4gT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdyYXBNZXRob2Qob2JqZWN0LCBwcm9wZXJ0eSwgbWV0aG9kKSB7XG4gICAgaWYgKCFvYmplY3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlNob3VsZCB3cmFwIHByb3BlcnR5IG9mIG9iamVjdFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBtZXRob2QgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk1ldGhvZCB3cmFwcGVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uIG9yIGEgcHJvcGVydHkgZGVzY3JpcHRvclwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZWRNZXRob2Qod3JhcHBlZE1ldGhvZCkge1xuICAgICAgICB2YXIgZXJyb3I7XG5cbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKHdyYXBwZWRNZXRob2QpKSB7XG4gICAgICAgICAgICBlcnJvciA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJBdHRlbXB0ZWQgdG8gd3JhcCBcIiArIHR5cGVvZiB3cmFwcGVkTWV0aG9kICsgXCIgcHJvcGVydHkgXCIgKyB2YWx1ZVRvU3RyaW5nKHByb3BlcnR5KSArIFwiIGFzIGZ1bmN0aW9uXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAod3JhcHBlZE1ldGhvZC5yZXN0b3JlICYmIHdyYXBwZWRNZXRob2QucmVzdG9yZS5zaW5vbikge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgVHlwZUVycm9yKFwiQXR0ZW1wdGVkIHRvIHdyYXAgXCIgKyB2YWx1ZVRvU3RyaW5nKHByb3BlcnR5KSArIFwiIHdoaWNoIGlzIGFscmVhZHkgd3JhcHBlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh3cmFwcGVkTWV0aG9kLmNhbGxlZEJlZm9yZSkge1xuICAgICAgICAgICAgdmFyIHZlcmIgPSB3cmFwcGVkTWV0aG9kLnJldHVybnMgPyBcInN0dWJiZWRcIiA6IFwic3BpZWQgb25cIjtcbiAgICAgICAgICAgIGVycm9yID0gbmV3IFR5cGVFcnJvcihcIkF0dGVtcHRlZCB0byB3cmFwIFwiICsgdmFsdWVUb1N0cmluZyhwcm9wZXJ0eSkgKyBcIiB3aGljaCBpcyBhbHJlYWR5IFwiICsgdmVyYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkTWV0aG9kICYmIHdyYXBwZWRNZXRob2Quc3RhY2tUcmFjZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3Iuc3RhY2sgKz0gXCJcXG4tLS0tLS0tLS0tLS0tLVxcblwiICsgd3JhcHBlZE1ldGhvZC5zdGFja1RyYWNlRXJyb3Iuc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlcnJvciwgd3JhcHBlZE1ldGhvZCwgaSwgd3JhcHBlZE1ldGhvZERlc2M7XG5cbiAgICBmdW5jdGlvbiBzaW1wbGVQcm9wZXJ0eUFzc2lnbm1lbnQoKSB7XG4gICAgICAgIHdyYXBwZWRNZXRob2QgPSBvYmplY3RbcHJvcGVydHldO1xuICAgICAgICBjaGVja1dyYXBwZWRNZXRob2Qod3JhcHBlZE1ldGhvZCk7XG4gICAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSBtZXRob2Q7XG4gICAgICAgIG1ldGhvZC5kaXNwbGF5TmFtZSA9IHByb3BlcnR5O1xuICAgIH1cblxuICAgIC8vIEZpcmVmb3ggaGFzIGEgcHJvYmxlbSB3aGVuIHVzaW5nIGhhc093bi5jYWxsIG9uIG9iamVjdHMgZnJvbSBvdGhlciBmcmFtZXMuXG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGxvY2FsLXJ1bGVzL25vLXByb3RvdHlwZS1tZXRob2RzICovXG4gICAgdmFyIG93bmVkID0gb2JqZWN0Lmhhc093blByb3BlcnR5ID8gb2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSA6IGhhc093blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgaWYgKGhhc0VTNVN1cHBvcnQpIHtcbiAgICAgICAgdmFyIG1ldGhvZERlc2MgPSB0eXBlb2YgbWV0aG9kID09PSBcImZ1bmN0aW9uXCIgPyB7IHZhbHVlOiBtZXRob2QgfSA6IG1ldGhvZDtcbiAgICAgICAgd3JhcHBlZE1ldGhvZERlc2MgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICAgICAgaWYgKCF3cmFwcGVkTWV0aG9kRGVzYykge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgIFwiQXR0ZW1wdGVkIHRvIHdyYXAgXCIgKyB0eXBlb2Ygd3JhcHBlZE1ldGhvZCArIFwiIHByb3BlcnR5IFwiICsgcHJvcGVydHkgKyBcIiBhcyBmdW5jdGlvblwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHdyYXBwZWRNZXRob2REZXNjLnJlc3RvcmUgJiYgd3JhcHBlZE1ldGhvZERlc2MucmVzdG9yZS5zaW5vbikge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgVHlwZUVycm9yKFwiQXR0ZW1wdGVkIHRvIHdyYXAgXCIgKyBwcm9wZXJ0eSArIFwiIHdoaWNoIGlzIGFscmVhZHkgd3JhcHBlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkTWV0aG9kRGVzYyAmJiB3cmFwcGVkTWV0aG9kRGVzYy5zdGFja1RyYWNlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5zdGFjayArPSBcIlxcbi0tLS0tLS0tLS0tLS0tXFxuXCIgKyB3cmFwcGVkTWV0aG9kRGVzYy5zdGFja1RyYWNlRXJyb3Iuc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0eXBlcyA9IE9iamVjdC5rZXlzKG1ldGhvZERlc2MpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHdyYXBwZWRNZXRob2QgPSB3cmFwcGVkTWV0aG9kRGVzY1t0eXBlc1tpXV07XG4gICAgICAgICAgICBjaGVja1dyYXBwZWRNZXRob2Qod3JhcHBlZE1ldGhvZCk7XG4gICAgICAgIH1cblxuICAgICAgICBtaXJyb3JQcm9wZXJ0aWVzKG1ldGhvZERlc2MsIHdyYXBwZWRNZXRob2REZXNjKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtaXJyb3JQcm9wZXJ0aWVzKG1ldGhvZERlc2NbdHlwZXNbaV1dLCB3cmFwcGVkTWV0aG9kRGVzY1t0eXBlc1tpXV0pO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBtZXRob2REZXNjKTtcblxuICAgICAgICAvLyBjYXRjaCBmYWlsaW5nIGFzc2lnbm1lbnRcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgY29udmVyc2Ugb2YgdGhlIGNoZWNrIGluIGAucmVzdG9yZWAgYmVsb3dcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmplY3RbcHJvcGVydHldICE9PSBtZXRob2QpIHtcbiAgICAgICAgICAgIC8vIGNvcnJlY3QgYW55IHdyb25nZG9pbmdzIGNhdXNlZCBieSB0aGUgZGVmaW5lUHJvcGVydHkgY2FsbCBhYm92ZSxcbiAgICAgICAgICAgIC8vIHN1Y2ggYXMgYWRkaW5nIG5ldyBpdGVtcyAoaWYgb2JqZWN0IHdhcyBhIFN0b3JhZ2Ugb2JqZWN0KVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgICAgICBzaW1wbGVQcm9wZXJ0eUFzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNpbXBsZVByb3BlcnR5QXNzaWdubWVudCgpO1xuICAgIH1cblxuICAgIGV4dGVuZC5ub25FbnVtKG1ldGhvZCwge1xuICAgICAgICBkaXNwbGF5TmFtZTogcHJvcGVydHksXG5cbiAgICAgICAgd3JhcHBlZE1ldGhvZDogd3JhcHBlZE1ldGhvZCxcblxuICAgICAgICAvLyBTZXQgdXAgYW4gRXJyb3Igb2JqZWN0IGZvciBhIHN0YWNrIHRyYWNlIHdoaWNoIGNhbiBiZSB1c2VkIGxhdGVyIHRvIGZpbmQgd2hhdCBsaW5lIG9mXG4gICAgICAgIC8vIGNvZGUgdGhlIG9yaWdpbmFsIG1ldGhvZCB3YXMgY3JlYXRlZCBvbi5cbiAgICAgICAgc3RhY2tUcmFjZUVycm9yOiBuZXcgRXJyb3IoXCJTdGFjayBUcmFjZSBmb3Igb3JpZ2luYWxcIiksXG5cbiAgICAgICAgcmVzdG9yZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBGb3IgcHJvdG90eXBlIHByb3BlcnRpZXMgdHJ5IHRvIHJlc2V0IGJ5IGRlbGV0ZSBmaXJzdC5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgZmFpbHMgKGV4OiBsb2NhbFN0b3JhZ2Ugb24gbW9iaWxlIHNhZmFyaSkgdGhlbiBmb3JjZSBhIHJlc2V0XG4gICAgICAgICAgICAvLyB2aWEgZGlyZWN0IGFzc2lnbm1lbnQuXG4gICAgICAgICAgICBpZiAoIW93bmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gSW4gc29tZSBjYXNlcyBgZGVsZXRlYCBtYXkgdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XG4gICAgICAgICAgICAgICAgLy8gRm9yIG5hdGl2ZSBjb2RlIGZ1bmN0aW9ucyBgZGVsZXRlYCBmYWlscyB3aXRob3V0IHRocm93aW5nIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgLy8gb24gQ2hyb21lIDwgNDMsIFBoYW50b21KUywgZXRjLlxuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNFUzVTdXBwb3J0KSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIHdyYXBwZWRNZXRob2REZXNjKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhhc0VTNVN1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlID09PSBtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IHdyYXBwZWRNZXRob2Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBVc2Ugc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb24gdG8gY2hlY2sgZmFpbHVyZXMgdGhlbiBmb3JjZSBhIHJlc2V0XG4gICAgICAgICAgICAgICAgLy8gdmlhIGRpcmVjdCBhc3NpZ25tZW50LlxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RbcHJvcGVydHldID09PSBtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IHdyYXBwZWRNZXRob2Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBtZXRob2QucmVzdG9yZS5zaW5vbiA9IHRydWU7XG5cbiAgICBpZiAoIWhhc0VTNVN1cHBvcnQpIHtcbiAgICAgICAgbWlycm9yUHJvcGVydGllcyhtZXRob2QsIHdyYXBwZWRNZXRob2QpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2Q7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBleHRlbmQgPSByZXF1aXJlKFwiLi9jb3JlL2V4dGVuZFwiKTtcbnZhciBsbHggPSByZXF1aXJlKFwibG9sZXhcIik7XG52YXIgZ2xvYmFsT2JqZWN0ID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikuZ2xvYmFsO1xuXG5mdW5jdGlvbiBjcmVhdGVDbG9jayhjb25maWcsIGdsb2JhbEN0eCkge1xuICAgIHZhciBsbHhDdHggPSBsbHg7XG4gICAgaWYgKGdsb2JhbEN0eCAhPT0gbnVsbCAmJiB0eXBlb2YgZ2xvYmFsQ3R4ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGxseEN0eCA9IGxseC53aXRoR2xvYmFsKGdsb2JhbEN0eCk7XG4gICAgfVxuICAgIHZhciBjbG9jayA9IGxseEN0eC5pbnN0YWxsKGNvbmZpZyk7XG4gICAgY2xvY2sucmVzdG9yZSA9IGNsb2NrLnVuaW5zdGFsbDtcbiAgICByZXR1cm4gY2xvY2s7XG59XG5cbmZ1bmN0aW9uIGFkZElmRGVmaW5lZChvYmosIGdsb2JhbFByb3BOYW1lKSB7XG4gICAgdmFyIGdsb2JhbFByb3AgPSBnbG9iYWxPYmplY3RbZ2xvYmFsUHJvcE5hbWVdO1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsUHJvcCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBvYmpbZ2xvYmFsUHJvcE5hbWVdID0gZ2xvYmFsUHJvcDtcbiAgICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ8RGF0ZXxPYmplY3R9IGRhdGVPckNvbmZpZyBUaGUgdW5peCBlcG9jaCB2YWx1ZSB0byBpbnN0YWxsIHdpdGggKGRlZmF1bHQgMClcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYSBsb2xleCBjbG9jayBpbnN0YW5jZVxuICovXG5leHBvcnRzLnVzZUZha2VUaW1lcnMgPSBmdW5jdGlvbihkYXRlT3JDb25maWcpIHtcbiAgICB2YXIgaGFzQXJndW1lbnRzID0gdHlwZW9mIGRhdGVPckNvbmZpZyAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICB2YXIgYXJndW1lbnRJc0RhdGVMaWtlID1cbiAgICAgICAgKHR5cGVvZiBkYXRlT3JDb25maWcgPT09IFwibnVtYmVyXCIgfHwgZGF0ZU9yQ29uZmlnIGluc3RhbmNlb2YgRGF0ZSkgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMTtcbiAgICB2YXIgYXJndW1lbnRJc09iamVjdCA9IGRhdGVPckNvbmZpZyAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0ZU9yQ29uZmlnID09PSBcIm9iamVjdFwiICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDE7XG5cbiAgICBpZiAoIWhhc0FyZ3VtZW50cykge1xuICAgICAgICByZXR1cm4gY3JlYXRlQ2xvY2soe1xuICAgICAgICAgICAgbm93OiAwXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChhcmd1bWVudElzRGF0ZUxpa2UpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUNsb2NrKHtcbiAgICAgICAgICAgIG5vdzogZGF0ZU9yQ29uZmlnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChhcmd1bWVudElzT2JqZWN0KSB7XG4gICAgICAgIHZhciBjb25maWcgPSBleHRlbmQubm9uRW51bSh7fSwgZGF0ZU9yQ29uZmlnKTtcbiAgICAgICAgdmFyIGdsb2JhbEN0eCA9IGNvbmZpZy5nbG9iYWw7XG4gICAgICAgIGRlbGV0ZSBjb25maWcuZ2xvYmFsO1xuICAgICAgICByZXR1cm4gY3JlYXRlQ2xvY2soY29uZmlnLCBnbG9iYWxDdHgpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ1c2VGYWtlVGltZXJzIGV4cGVjdGVkIGVwb2NoIG9yIGNvbmZpZyBvYmplY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc2lub25qcy9zaW5vblwiKTtcbn07XG5cbmV4cG9ydHMuY2xvY2sgPSB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgcmV0dXJuIGxseC5jcmVhdGVDbG9jayhub3cpO1xuICAgIH1cbn07XG5cbnZhciB0aW1lcnMgPSB7XG4gICAgc2V0VGltZW91dDogc2V0VGltZW91dCxcbiAgICBjbGVhclRpbWVvdXQ6IGNsZWFyVGltZW91dCxcbiAgICBzZXRJbnRlcnZhbDogc2V0SW50ZXJ2YWwsXG4gICAgY2xlYXJJbnRlcnZhbDogY2xlYXJJbnRlcnZhbCxcbiAgICBEYXRlOiBEYXRlXG59O1xuYWRkSWZEZWZpbmVkKHRpbWVycywgXCJzZXRJbW1lZGlhdGVcIik7XG5hZGRJZkRlZmluZWQodGltZXJzLCBcImNsZWFySW1tZWRpYXRlXCIpO1xuXG5leHBvcnRzLnRpbWVycyA9IHRpbWVycztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZXZlcnkgPSByZXF1aXJlKFwiLi9wcm90b3R5cGVzL2FycmF5XCIpLmV2ZXJ5O1xuXG5mdW5jdGlvbiBoYXNDYWxsc0xlZnQoY2FsbE1hcCwgc3B5KSB7XG4gICAgaWYgKGNhbGxNYXBbc3B5LmlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbGxNYXBbc3B5LmlkXSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGxNYXBbc3B5LmlkXSA8IHNweS5jYWxsQ291bnQ7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQWRqYWNlbnRDYWxscyhjYWxsTWFwLCBzcHksIGluZGV4LCBzcGllcykge1xuICAgIHZhciBjYWxsZWRCZWZvcmVOZXh0ID0gdHJ1ZTtcblxuICAgIGlmIChpbmRleCAhPT0gc3BpZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBjYWxsZWRCZWZvcmVOZXh0ID0gc3B5LmNhbGxlZEJlZm9yZShzcGllc1tpbmRleCArIDFdKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzQ2FsbHNMZWZ0KGNhbGxNYXAsIHNweSkgJiYgY2FsbGVkQmVmb3JlTmV4dCkge1xuICAgICAgICBjYWxsTWFwW3NweS5pZF0gKz0gMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxlZEluT3JkZXIoc3BpZXMpIHtcbiAgICB2YXIgY2FsbE1hcCA9IHt9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgIHZhciBfc3BpZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50cyA6IHNwaWVzO1xuXG4gICAgcmV0dXJuIGV2ZXJ5KF9zcGllcywgY2hlY2tBZGphY2VudENhbGxzLmJpbmQobnVsbCwgY2FsbE1hcCkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZnVuY3Rpb25OYW1lID0gcmVxdWlyZShcIi4vZnVuY3Rpb24tbmFtZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGFzc05hbWUodmFsdWUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICAodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IubmFtZSkgfHxcbiAgICAgICAgLy8gVGhlIG5leHQgYnJhbmNoIGlzIGZvciBJRTExIHN1cHBvcnQgb25seTpcbiAgICAgICAgLy8gQmVjYXVzZSB0aGUgbmFtZSBwcm9wZXJ0eSBpcyBub3Qgc2V0IG9uIHRoZSBwcm90b3R5cGVcbiAgICAgICAgLy8gb2YgdGhlIEZ1bmN0aW9uIG9iamVjdCwgd2UgZmluYWxseSB0cnkgdG8gZ3JhYiB0aGVcbiAgICAgICAgLy8gbmFtZSBmcm9tIGl0cyBkZWZpbml0aW9uLiBUaGlzIHdpbGwgbmV2ZXIgYmUgcmVhY2hlZFxuICAgICAgICAvLyBpbiBub2RlLCBzbyB3ZSBhcmUgbm90IGFibGUgdG8gdGVzdCB0aGlzIHByb3Blcmx5LlxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9uYW1lXG4gICAgICAgICh0eXBlb2YgdmFsdWUuY29uc3RydWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uTmFtZSh2YWx1ZS5jb25zdHJ1Y3RvcikpIHx8XG4gICAgICAgIG51bGxcbiAgICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblwidXNlIHN0cmljdFwiO1xuXG4vLyB3cmFwIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgaW52b2tlIHRoZSBzdXBwbGllZCBmdW5jdGlvbiBhbmQgcHJpbnQgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHRvIHRoZSBjb25zb2xlIGVhY2hcbi8vIHRpbWUgaXQgaXMgY2FsbGVkLlxuZXhwb3J0cy53cmFwID0gZnVuY3Rpb24oZnVuYywgbXNnKSB7XG4gICAgdmFyIHdyYXBwZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwb3J0cy5wcmludFdhcm5pbmcobXNnKTtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIGlmIChmdW5jLnByb3RvdHlwZSkge1xuICAgICAgICB3cmFwcGVkLnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlZDtcbn07XG5cbi8vIGRlZmF1bHRNc2cgcmV0dXJucyBhIHN0cmluZyB3aGljaCBjYW4gYmUgc3VwcGxpZWQgdG8gYHdyYXAoKWAgdG8gbm90aWZ5IHRoZSB1c2VyIHRoYXQgYSBwYXJ0aWN1bGFyIHBhcnQgb2YgdGhlXG4vLyBzaW5vbiBBUEkgaGFzIGJlZW4gZGVwcmVjYXRlZC5cbmV4cG9ydHMuZGVmYXVsdE1zZyA9IGZ1bmN0aW9uKHBhY2thZ2VOYW1lLCBmdW5jTmFtZSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIHBhY2thZ2VOYW1lICtcbiAgICAgICAgXCIuXCIgK1xuICAgICAgICBmdW5jTmFtZSArXG4gICAgICAgIFwiIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBwdWJsaWMgQVBJIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgXCIgK1xuICAgICAgICBwYWNrYWdlTmFtZSArXG4gICAgICAgIFwiLlwiXG4gICAgKTtcbn07XG5cbmV4cG9ydHMucHJpbnRXYXJuaW5nID0gZnVuY3Rpb24obXNnKSB7XG4gICAgLy8gV2F0Y2ggb3V0IGZvciBJRTcgYW5kIGJlbG93ISA6KFxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChjb25zb2xlLmluZm8pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhtc2cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gVGhpcyBpcyBhbiBgZXZlcnlgIGltcGxlbWVudGF0aW9uIHRoYXQgd29ya3MgZm9yIGFsbCBpdGVyYWJsZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlcnkob2JqLCBmbikge1xuICAgIHZhciBwYXNzID0gdHJ1ZTtcblxuICAgIHRyeSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBsb2NhbC1ydWxlcy9uby1wcm90b3R5cGUtbWV0aG9kcyAqL1xuICAgICAgICBvYmouZm9yRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgICAgIC8vIFRocm93aW5nIGFuIGVycm9yIGlzIHRoZSBvbmx5IHdheSB0byBicmVhayBgZm9yRWFjaGBcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwYXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhc3M7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnVuY3Rpb25OYW1lKGZ1bmMpIHtcbiAgICBpZiAoIWZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgZnVuYy5kaXNwbGF5TmFtZSB8fFxuICAgICAgICBmdW5jLm5hbWUgfHxcbiAgICAgICAgLy8gVXNlIGZ1bmN0aW9uIGRlY29tcG9zaXRpb24gYXMgYSBsYXN0IHJlc29ydCB0byBnZXQgZnVuY3Rpb25cbiAgICAgICAgLy8gbmFtZS4gRG9lcyBub3QgcmVseSBvbiBmdW5jdGlvbiBkZWNvbXBvc2l0aW9uIHRvIHdvcmsgLSBpZiBpdFxuICAgICAgICAvLyBkb2Vzbid0IGRlYnVnZ2luZyB3aWxsIGJlIHNsaWdodGx5IGxlc3MgaW5mb3JtYXRpdmVcbiAgICAgICAgLy8gKGkuZS4gdG9TdHJpbmcgd2lsbCBzYXkgJ3NweScgcmF0aGVyIHRoYW4gJ215RnVuYycpLlxuICAgICAgICAoU3RyaW5nKGZ1bmMpLm1hdGNoKC9mdW5jdGlvbiAoW15cXHMoXSspLykgfHwgW10pWzFdXG4gICAgKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGdsb2JhbE9iamVjdDtcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIE5vZGVcbiAgICBnbG9iYWxPYmplY3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyBCcm93c2VyXG4gICAgZ2xvYmFsT2JqZWN0ID0gd2luZG93O1xufSBlbHNlIHtcbiAgICAvLyBXZWJXb3JrZXJcbiAgICBnbG9iYWxPYmplY3QgPSBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbE9iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnbG9iYWw6IHJlcXVpcmUoXCIuL2dsb2JhbFwiKSxcbiAgICBjYWxsZWRJbk9yZGVyOiByZXF1aXJlKFwiLi9jYWxsZWQtaW4tb3JkZXJcIiksXG4gICAgY2xhc3NOYW1lOiByZXF1aXJlKFwiLi9jbGFzcy1uYW1lXCIpLFxuICAgIGRlcHJlY2F0ZWQ6IHJlcXVpcmUoXCIuL2RlcHJlY2F0ZWRcIiksXG4gICAgZXZlcnk6IHJlcXVpcmUoXCIuL2V2ZXJ5XCIpLFxuICAgIGZ1bmN0aW9uTmFtZTogcmVxdWlyZShcIi4vZnVuY3Rpb24tbmFtZVwiKSxcbiAgICBvcmRlckJ5Rmlyc3RDYWxsOiByZXF1aXJlKFwiLi9vcmRlci1ieS1maXJzdC1jYWxsXCIpLFxuICAgIHByb3RvdHlwZXM6IHJlcXVpcmUoXCIuL3Byb3RvdHlwZXNcIiksXG4gICAgdHlwZU9mOiByZXF1aXJlKFwiLi90eXBlLW9mXCIpLFxuICAgIHZhbHVlVG9TdHJpbmc6IHJlcXVpcmUoXCIuL3ZhbHVlLXRvLXN0cmluZ1wiKVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc29ydCA9IHJlcXVpcmUoXCIuL3Byb3RvdHlwZXMvYXJyYXlcIikuc29ydDtcbnZhciBzbGljZSA9IHJlcXVpcmUoXCIuL3Byb3RvdHlwZXMvYXJyYXlcIikuc2xpY2U7XG5cbmZ1bmN0aW9uIGNvbXBhcmF0b3IoYSwgYikge1xuICAgIC8vIHV1aWQsIHdvbid0IGV2ZXIgYmUgZXF1YWxcbiAgICB2YXIgYUNhbGwgPSBhLmdldENhbGwoMCk7XG4gICAgdmFyIGJDYWxsID0gYi5nZXRDYWxsKDApO1xuICAgIHZhciBhSWQgPSAoYUNhbGwgJiYgYUNhbGwuY2FsbElkKSB8fCAtMTtcbiAgICB2YXIgYklkID0gKGJDYWxsICYmIGJDYWxsLmNhbGxJZCkgfHwgLTE7XG5cbiAgICByZXR1cm4gYUlkIDwgYklkID8gLTEgOiAxO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9yZGVyQnlGaXJzdENhbGwoc3BpZXMpIHtcbiAgICByZXR1cm4gc29ydChzbGljZShzcGllcyksIGNvbXBhcmF0b3IpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY29weVByb3RvdHlwZSA9IHJlcXVpcmUoXCIuL2NvcHktcHJvdG90eXBlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlQcm90b3R5cGUoQXJyYXkucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLmNhbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29weVByb3RvdHlwZU1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbG9jYWwtcnVsZXMvbm8tcHJvdG90eXBlLW1ldGhvZHMgKi9cbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG90eXBlKS5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBuYW1lKSB7XG4gICAgICAgIC8vIGlnbm9yZSBzaXplIGJlY2F1c2UgaXQgdGhyb3dzIGZyb20gTWFwXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG5hbWUgIT09IFwic2l6ZVwiICYmXG4gICAgICAgICAgICBuYW1lICE9PSBcImNhbGxlclwiICYmXG4gICAgICAgICAgICBuYW1lICE9PSBcImNhbGxlZVwiICYmXG4gICAgICAgICAgICBuYW1lICE9PSBcImFyZ3VtZW50c1wiICYmXG4gICAgICAgICAgICB0eXBlb2YgcHJvdG90eXBlW25hbWVdID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXN1bHRbbmFtZV0gPSBjYWxsLmJpbmQocHJvdG90eXBlW25hbWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb3B5UHJvdG90eXBlID0gcmVxdWlyZShcIi4vY29weS1wcm90b3R5cGVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVByb3RvdHlwZShGdW5jdGlvbi5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5OiByZXF1aXJlKFwiLi9hcnJheVwiKSxcbiAgICBmdW5jdGlvbjogcmVxdWlyZShcIi4vZnVuY3Rpb25cIiksXG4gICAgbWFwOiByZXF1aXJlKFwiLi9tYXBcIiksXG4gICAgb2JqZWN0OiByZXF1aXJlKFwiLi9vYmplY3RcIiksXG4gICAgc2V0OiByZXF1aXJlKFwiLi9zZXRcIiksXG4gICAgc3RyaW5nOiByZXF1aXJlKFwiLi9zdHJpbmdcIilcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvcHlQcm90b3R5cGUgPSByZXF1aXJlKFwiLi9jb3B5LXByb3RvdHlwZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5UHJvdG90eXBlKE1hcC5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb3B5UHJvdG90eXBlID0gcmVxdWlyZShcIi4vY29weS1wcm90b3R5cGVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVByb3RvdHlwZShPYmplY3QucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY29weVByb3RvdHlwZSA9IHJlcXVpcmUoXCIuL2NvcHktcHJvdG90eXBlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlQcm90b3R5cGUoU2V0LnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvcHlQcm90b3R5cGUgPSByZXF1aXJlKFwiLi9jb3B5LXByb3RvdHlwZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5UHJvdG90eXBlKFN0cmluZy5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0eXBlID0gcmVxdWlyZShcInR5cGUtZGV0ZWN0XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHR5cGVPZih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlKHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiB2YWx1ZVRvU3RyaW5nKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLnRvU3RyaW5nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBsb2NhbC1ydWxlcy9uby1wcm90b3R5cGUtbWV0aG9kcyAqL1xuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWVUb1N0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc2Ftc2FtID0gcmVxdWlyZShcIkBzaW5vbmpzL3NhbXNhbVwiKTtcbnZhciBmdW5jdGlvbk5hbWUgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5mdW5jdGlvbk5hbWU7XG52YXIgdHlwZU9mID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikudHlwZU9mO1xuXG52YXIgZm9ybWF0aW8gPSB7XG4gICAgZXhjbHVkZUNvbnN0cnVjdG9yczogW1wiT2JqZWN0XCIsIC9eLiQvXSxcbiAgICBxdW90ZVN0cmluZ3M6IHRydWUsXG4gICAgbGltaXRDaGlsZHJlbkNvdW50OiAwXG59O1xuXG52YXIgc3BlY2lhbE9iamVjdHMgPSBbXTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWNpYWxPYmplY3RzLnB1c2goeyBvYmplY3Q6IGdsb2JhbCwgdmFsdWU6IFwiW29iamVjdCBnbG9iYWxdXCIgfSk7XG59XG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc3BlY2lhbE9iamVjdHMucHVzaCh7XG4gICAgICAgIG9iamVjdDogZG9jdW1lbnQsXG4gICAgICAgIHZhbHVlOiBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgfSk7XG59XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWNpYWxPYmplY3RzLnB1c2goeyBvYmplY3Q6IHdpbmRvdywgdmFsdWU6IFwiW29iamVjdCBXaW5kb3ddXCIgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdG9yTmFtZShmLCBvYmplY3QpIHtcbiAgICB2YXIgbmFtZSA9IGZ1bmN0aW9uTmFtZShvYmplY3QgJiYgb2JqZWN0LmNvbnN0cnVjdG9yKTtcbiAgICB2YXIgZXhjbHVkZXMgPSBmLmV4Y2x1ZGVDb25zdHJ1Y3RvcnMgfHwgZm9ybWF0aW8uZXhjbHVkZUNvbnN0cnVjdG9ycztcblxuICAgIHZhciBpLCBsO1xuICAgIGZvciAoaSA9IDAsIGwgPSBleGNsdWRlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBleGNsdWRlc1tpXSA9PT0gXCJzdHJpbmdcIiAmJiBleGNsdWRlc1tpXSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoZXhjbHVkZXNbaV0udGVzdCAmJiBleGNsdWRlc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuYW1lO1xufVxuXG5mdW5jdGlvbiBpc0NpcmN1bGFyKG9iamVjdCwgb2JqZWN0cykge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGksIGw7XG4gICAgZm9yIChpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGlmIChvYmplY3RzW2ldID09PSBvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIGFzY2lpKGYsIG9iamVjdCwgcHJvY2Vzc2VkLCBpbmRlbnQpIHtcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAob2JqZWN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiKGVtcHR5IHN0cmluZylcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcXMgPSBmLnF1b3RlU3RyaW5ncztcbiAgICAgICAgdmFyIHF1b3RlID0gdHlwZW9mIHFzICE9PSBcImJvb2xlYW5cIiB8fCBxcztcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHF1b3Rlc1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkIHx8IHF1b3RlID8gJ1wiJyArIG9iamVjdCArICdcIicgOiBvYmplY3Q7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcImZ1bmN0aW9uXCIgJiYgIShvYmplY3QgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgIHJldHVybiBhc2NpaS5mdW5jKG9iamVjdCk7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50IHN1cHBvcnRzIGJpZ2ludCBhcyBvZiB2ZXJzaW9uIDYuMC4wXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvY29tbWl0L2U0YWIwNTMxYzRlNDRjMjM0OTRjNmE4MDJhYTIzMjlkMTVhYzkwZTVcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBpZiAodHlwZU9mKG9iamVjdCkgPT09IFwiYmlnaW50XCIpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHZhciBpbnRlcm5hbFByb2Nlc3NlZCA9IHByb2Nlc3NlZCB8fCBbXTtcblxuICAgIGlmIChpc0NpcmN1bGFyKG9iamVjdCwgaW50ZXJuYWxQcm9jZXNzZWQpKSB7XG4gICAgICAgIHJldHVybiBcIltDaXJjdWxhcl1cIjtcbiAgICB9XG5cbiAgICBpZiAodHlwZU9mKG9iamVjdCkgPT09IFwiYXJyYXlcIikge1xuICAgICAgICByZXR1cm4gYXNjaWkuYXJyYXkuY2FsbChmLCBvYmplY3QsIGludGVybmFsUHJvY2Vzc2VkKTtcbiAgICB9XG5cbiAgICBpZiAoIW9iamVjdCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKDEgLyBvYmplY3QgPT09IC1JbmZpbml0eSA/IFwiLTBcIiA6IG9iamVjdCk7XG4gICAgfVxuICAgIGlmIChzYW1zYW0uaXNFbGVtZW50KG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGFzY2lpLmVsZW1lbnQob2JqZWN0KTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBvYmplY3QudG9TdHJpbmcgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBvYmplY3QudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHZhciBpLCBsO1xuICAgIGZvciAoaSA9IDAsIGwgPSBzcGVjaWFsT2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PT0gc3BlY2lhbE9iamVjdHNbaV0ub2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gc3BlY2lhbE9iamVjdHNbaV0udmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Ftc2FtLmlzU2V0KG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGFzY2lpLnNldC5jYWxsKGYsIG9iamVjdCwgaW50ZXJuYWxQcm9jZXNzZWQpO1xuICAgIH1cblxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgcmV0dXJuIGFzY2lpLm1hcC5jYWxsKGYsIG9iamVjdCwgaW50ZXJuYWxQcm9jZXNzZWQpO1xuICAgIH1cblxuICAgIHJldHVybiBhc2NpaS5vYmplY3QuY2FsbChmLCBvYmplY3QsIGludGVybmFsUHJvY2Vzc2VkLCBpbmRlbnQpO1xufVxuXG5hc2NpaS5mdW5jID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBmdW5jTmFtZSA9IGZ1bmN0aW9uTmFtZShmdW5jKSB8fCBcIlwiO1xuICAgIHJldHVybiBcImZ1bmN0aW9uIFwiICsgZnVuY05hbWUgKyBcIigpIHt9XCI7XG59O1xuXG5mdW5jdGlvbiBkZWxpbWl0KHN0ciwgZGVsaW1pdGVycykge1xuICAgIHZhciBkZWxpbXMgPSBkZWxpbWl0ZXJzIHx8IFtcIltcIiwgXCJdXCJdO1xuICAgIHJldHVybiBkZWxpbXNbMF0gKyBzdHIgKyBkZWxpbXNbMV07XG59XG5cbmFzY2lpLmFycmF5ID0gZnVuY3Rpb24oYXJyYXksIHByb2Nlc3NlZCwgZGVsaW1pdGVycykge1xuICAgIHByb2Nlc3NlZC5wdXNoKGFycmF5KTtcbiAgICB2YXIgcGllY2VzID0gW107XG4gICAgdmFyIGksIGw7XG4gICAgbCA9XG4gICAgICAgIHRoaXMubGltaXRDaGlsZHJlbkNvdW50ID4gMFxuICAgICAgICAgICAgPyBNYXRoLm1pbih0aGlzLmxpbWl0Q2hpbGRyZW5Db3VudCwgYXJyYXkubGVuZ3RoKVxuICAgICAgICAgICAgOiBhcnJheS5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIHBpZWNlcy5wdXNoKGFzY2lpKHRoaXMsIGFycmF5W2ldLCBwcm9jZXNzZWQpKTtcbiAgICB9XG5cbiAgICBpZiAobCA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICBwaWVjZXMucHVzaChcIlsuLi4gXCIgKyAoYXJyYXkubGVuZ3RoIC0gbCkgKyBcIiBtb3JlIGVsZW1lbnRzXVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsaW1pdChwaWVjZXMuam9pbihcIiwgXCIpLCBkZWxpbWl0ZXJzKTtcbn07XG5cbmFzY2lpLnNldCA9IGZ1bmN0aW9uKHNldCwgcHJvY2Vzc2VkKSB7XG4gICAgcmV0dXJuIGFzY2lpLmFycmF5LmNhbGwodGhpcywgQXJyYXkuZnJvbShzZXQpLCBwcm9jZXNzZWQsIFtcIlNldCB7XCIsIFwifVwiXSk7XG59O1xuXG5hc2NpaS5tYXAgPSBmdW5jdGlvbihtYXAsIHByb2Nlc3NlZCkge1xuICAgIHJldHVybiBhc2NpaS5hcnJheS5jYWxsKHRoaXMsIEFycmF5LmZyb20obWFwKSwgcHJvY2Vzc2VkLCBbXCJNYXAgW1wiLCBcIl1cIl0pO1xufTtcblxuZnVuY3Rpb24gZ2V0U3ltYm9scyhvYmplY3QpIHtcbiAgICBpZiAoc2Ftc2FtLmlzQXJndW1lbnRzKG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogVGhpcyBpcyBvbmx5IGZvciBJRSwgc2luY2UgZ2V0T3duUHJvcGVydHlTeW1ib2xzXG4gICAgICogZG9lcyBub3QgZXhpc3Qgb24gT2JqZWN0IHRoZXJlXG4gICAgICovXG4gICAgcmV0dXJuIFtdO1xufVxuXG5hc2NpaS5vYmplY3QgPSBmdW5jdGlvbihvYmplY3QsIHByb2Nlc3NlZCwgaW5kZW50KSB7XG4gICAgcHJvY2Vzc2VkLnB1c2gob2JqZWN0KTtcbiAgICB2YXIgaW50ZXJuYWxJbmRlbnQgPSBpbmRlbnQgfHwgMDtcbiAgICB2YXIgcGllY2VzID0gW107XG4gICAgdmFyIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhvYmplY3QpXG4gICAgICAgIC5zb3J0KClcbiAgICAgICAgLmNvbmNhdChnZXRTeW1ib2xzKG9iamVjdCkpO1xuICAgIHZhciBsZW5ndGggPSAzO1xuICAgIHZhciBwcm9wLCBzdHIsIG9iaiwgaSwgaywgbDtcbiAgICBsID1cbiAgICAgICAgdGhpcy5saW1pdENoaWxkcmVuQ291bnQgPiAwXG4gICAgICAgICAgICA/IE1hdGgubWluKHRoaXMubGltaXRDaGlsZHJlbkNvdW50LCBwcm9wZXJ0aWVzLmxlbmd0aClcbiAgICAgICAgICAgIDogcHJvcGVydGllcy5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBvYmogPSBvYmplY3RbcHJvcF07XG5cbiAgICAgICAgaWYgKGlzQ2lyY3VsYXIob2JqLCBwcm9jZXNzZWQpKSB7XG4gICAgICAgICAgICBzdHIgPSBcIltDaXJjdWxhcl1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0ciA9IGFzY2lpKHRoaXMsIG9iaiwgcHJvY2Vzc2VkLCBpbnRlcm5hbEluZGVudCArIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RyID1cbiAgICAgICAgICAgICh0eXBlb2YgcHJvcCA9PT0gXCJzdHJpbmdcIiAmJiAvXFxzLy50ZXN0KHByb3ApXG4gICAgICAgICAgICAgICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcXVvdGVzXG4gICAgICAgICAgICAgICAgICAnXCInICsgcHJvcCArICdcIidcbiAgICAgICAgICAgICAgICA6IHByb3AudG9TdHJpbmcoKSkgK1xuICAgICAgICAgICAgXCI6IFwiICtcbiAgICAgICAgICAgIHN0cjtcbiAgICAgICAgbGVuZ3RoICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHBpZWNlcy5wdXNoKHN0cik7XG4gICAgfVxuXG4gICAgdmFyIGNvbnMgPSBjb25zdHJ1Y3Rvck5hbWUodGhpcywgb2JqZWN0KTtcbiAgICB2YXIgcHJlZml4ID0gY29ucyA/IFwiW1wiICsgY29ucyArIFwiXSBcIiA6IFwiXCI7XG4gICAgdmFyIGlzID0gXCJcIjtcbiAgICBmb3IgKGkgPSAwLCBrID0gaW50ZXJuYWxJbmRlbnQ7IGkgPCBrOyArK2kpIHtcbiAgICAgICAgaXMgKz0gXCIgXCI7XG4gICAgfVxuXG4gICAgaWYgKGwgPCBwcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgICAgICBwaWVjZXMucHVzaChcIlsuLi4gXCIgKyAocHJvcGVydGllcy5sZW5ndGggLSBsKSArIFwiIG1vcmUgZWxlbWVudHNdXCIpO1xuICAgIH1cblxuICAgIGlmIChsZW5ndGggKyBpbnRlcm5hbEluZGVudCA+IDgwKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBwcmVmaXggKyBcIntcXG4gIFwiICsgaXMgKyBwaWVjZXMuam9pbihcIixcXG4gIFwiICsgaXMpICsgXCJcXG5cIiArIGlzICsgXCJ9XCJcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeCArIFwieyBcIiArIHBpZWNlcy5qb2luKFwiLCBcIikgKyBcIiB9XCI7XG59O1xuXG5hc2NpaS5lbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHZhciB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGF0dHJzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICAgIHZhciBwYWlycyA9IFtdO1xuICAgIHZhciBhdHRyLCBhdHRyTmFtZSwgaSwgbCwgdmFsO1xuXG4gICAgZm9yIChpID0gMCwgbCA9IGF0dHJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBhdHRyID0gYXR0cnMuaXRlbShpKTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcImh0bWw6XCIsIFwiXCIpO1xuICAgICAgICB2YWwgPSBhdHRyLm5vZGVWYWx1ZTtcbiAgICAgICAgaWYgKGF0dHJOYW1lICE9PSBcImNvbnRlbnRlZGl0YWJsZVwiIHx8IHZhbCAhPT0gXCJpbmhlcml0XCIpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcXVvdGVzXG4gICAgICAgICAgICAgICAgcGFpcnMucHVzaChhdHRyTmFtZSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0dGVkID0gXCI8XCIgKyB0YWdOYW1lICsgKHBhaXJzLmxlbmd0aCA+IDAgPyBcIiBcIiA6IFwiXCIpO1xuICAgIC8vIFNWRyBlbGVtZW50cyBoYXZlIHVuZGVmaW5lZCBpbm5lckhUTUxcbiAgICB2YXIgY29udGVudCA9IGVsZW1lbnQuaW5uZXJIVE1MIHx8IFwiXCI7XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGggPiAyMCkge1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5zdWJzdHIoMCwgMjApICsgXCJbLi4uXVwiO1xuICAgIH1cblxuICAgIHZhciByZXMgPVxuICAgICAgICBmb3JtYXR0ZWQgKyBwYWlycy5qb2luKFwiIFwiKSArIFwiPlwiICsgY29udGVudCArIFwiPC9cIiArIHRhZ05hbWUgKyBcIj5cIjtcblxuICAgIHJldHVybiByZXMucmVwbGFjZSgvIGNvbnRlbnRFZGl0YWJsZT1cImluaGVyaXRcIi8sIFwiXCIpO1xufTtcblxuZnVuY3Rpb24gRm9ybWF0aW8ob3B0aW9ucykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBndWFyZC1mb3ItaW5cbiAgICBmb3IgKHZhciBvcHQgaW4gb3B0aW9ucykge1xuICAgICAgICB0aGlzW29wdF0gPSBvcHRpb25zW29wdF07XG4gICAgfVxufVxuXG5Gb3JtYXRpby5wcm90b3R5cGUgPSB7XG4gICAgZnVuY3Rpb25OYW1lOiBmdW5jdGlvbk5hbWUsXG5cbiAgICBjb25maWd1cmU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGb3JtYXRpbyhvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgY29uc3RydWN0b3JOYW1lOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yTmFtZSh0aGlzLCBvYmplY3QpO1xuICAgIH0sXG5cbiAgICBhc2NpaTogZnVuY3Rpb24ob2JqZWN0LCBwcm9jZXNzZWQsIGluZGVudCkge1xuICAgICAgICByZXR1cm4gYXNjaWkodGhpcywgb2JqZWN0LCBwcm9jZXNzZWQsIGluZGVudCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb3JtYXRpby5wcm90b3R5cGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFycmF5UHJvdG8gPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLmFycmF5O1xudmFyIGRlZXBFcXVhbCA9IHJlcXVpcmUoXCIuL2RlZXAtZXF1YWxcIikudXNlKGNyZWF0ZU1hdGNoZXIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG52YXIgZXZlcnkgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5ldmVyeTtcbnZhciBmdW5jdGlvbk5hbWUgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5mdW5jdGlvbk5hbWU7XG52YXIgZ2V0ID0gcmVxdWlyZShcImxvZGFzaC5nZXRcIik7XG52YXIgaXRlcmFibGVUb1N0cmluZyA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlLXRvLXN0cmluZ1wiKTtcbnZhciBvYmplY3RQcm90byA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMub2JqZWN0O1xudmFyIHR5cGVPZiA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnR5cGVPZjtcbnZhciB2YWx1ZVRvU3RyaW5nID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikudmFsdWVUb1N0cmluZztcblxudmFyIGFzc2VydE1hdGNoZXIgPSByZXF1aXJlKFwiLi9jcmVhdGUtbWF0Y2hlci9hc3NlcnQtbWF0Y2hlclwiKTtcbnZhciBhc3NlcnRNZXRob2RFeGlzdHMgPSByZXF1aXJlKFwiLi9jcmVhdGUtbWF0Y2hlci9hc3NlcnQtbWV0aG9kLWV4aXN0c1wiKTtcbnZhciBhc3NlcnRUeXBlID0gcmVxdWlyZShcIi4vY3JlYXRlLW1hdGNoZXIvYXNzZXJ0LXR5cGVcIik7XG52YXIgaXNJdGVyYWJsZSA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1tYXRjaGVyL2lzLWl0ZXJhYmxlXCIpO1xudmFyIGlzTWF0Y2hlciA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1tYXRjaGVyL2lzLW1hdGNoZXJcIik7XG5cbnZhciBtYXRjaGVyUHJvdG90eXBlID0gcmVxdWlyZShcIi4vY3JlYXRlLW1hdGNoZXIvbWF0Y2hlci1wcm90b3R5cGVcIik7XG5cbnZhciBhcnJheUluZGV4T2YgPSBhcnJheVByb3RvLmluZGV4T2Y7XG52YXIgc29tZSA9IGFycmF5UHJvdG8uc29tZTtcblxudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxudmFyIFRZUEVfTUFQID0gcmVxdWlyZShcIi4vY3JlYXRlLW1hdGNoZXIvdHlwZS1tYXBcIik7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdGNoZXIgb2JqZWN0IGZvciB0aGUgcGFzc2VkIGV4cGVjdGF0aW9uXG4gKlxuICogQGFsaWFzIG1vZHVsZTpzYW1zYW0uY3JlYXRlTWF0Y2hlclxuICogQHBhcmFtIHsqfSBleHBlY3RhdGlvbiBBbiBleHBlY3R0YXRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEEgbWVzc2FnZSBmb3IgdGhlIGV4cGVjdGF0aW9uXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIG1hdGNoZXIgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1hdGNoZXIoZXhwZWN0YXRpb24sIG1lc3NhZ2UpIHtcbiAgICB2YXIgbSA9IE9iamVjdC5jcmVhdGUobWF0Y2hlclByb3RvdHlwZSk7XG4gICAgdmFyIHR5cGUgPSB0eXBlT2YoZXhwZWN0YXRpb24pO1xuXG4gICAgaWYgKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTWVzc2FnZSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICBcIkV4cGVjdGVkIDEgb3IgMiBhcmd1bWVudHMsIHJlY2VpdmVkIFwiICsgYXJndW1lbnRzLmxlbmd0aFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlmICh0eXBlIGluIFRZUEVfTUFQKSB7XG4gICAgICAgIFRZUEVfTUFQW3R5cGVdKG0sIGV4cGVjdGF0aW9uLCBtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtLnRlc3QgPSBmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RhdGlvbik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFtLm1lc3NhZ2UpIHtcbiAgICAgICAgbS5tZXNzYWdlID0gXCJtYXRjaChcIiArIHZhbHVlVG9TdHJpbmcoZXhwZWN0YXRpb24pICsgXCIpXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIG07XG59XG5cbmNyZWF0ZU1hdGNoZXIuaXNNYXRjaGVyID0gaXNNYXRjaGVyO1xuXG5jcmVhdGVNYXRjaGVyLmFueSA9IGNyZWF0ZU1hdGNoZXIoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRydWU7XG59LCBcImFueVwiKTtcblxuY3JlYXRlTWF0Y2hlci5kZWZpbmVkID0gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICByZXR1cm4gYWN0dWFsICE9PSBudWxsICYmIGFjdHVhbCAhPT0gdW5kZWZpbmVkO1xufSwgXCJkZWZpbmVkXCIpO1xuXG5jcmVhdGVNYXRjaGVyLnRydXRoeSA9IGNyZWF0ZU1hdGNoZXIoZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oYWN0dWFsKTtcbn0sIFwidHJ1dGh5XCIpO1xuXG5jcmVhdGVNYXRjaGVyLmZhbHN5ID0gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICByZXR1cm4gIWFjdHVhbDtcbn0sIFwiZmFsc3lcIik7XG5cbmNyZWF0ZU1hdGNoZXIuc2FtZSA9IGZ1bmN0aW9uKGV4cGVjdGF0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU1hdGNoZXIoZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgICAgIHJldHVybiBleHBlY3RhdGlvbiA9PT0gYWN0dWFsO1xuICAgIH0sIFwic2FtZShcIiArIHZhbHVlVG9TdHJpbmcoZXhwZWN0YXRpb24pICsgXCIpXCIpO1xufTtcblxuY3JlYXRlTWF0Y2hlci5pbiA9IGZ1bmN0aW9uKGFycmF5T2ZFeHBlY3RhdGlvbnMpIHtcbiAgICBpZiAodHlwZU9mKGFycmF5T2ZFeHBlY3RhdGlvbnMpICE9PSBcImFycmF5XCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFycmF5IGV4cGVjdGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVNYXRjaGVyKGZ1bmN0aW9uKGFjdHVhbCkge1xuICAgICAgICByZXR1cm4gc29tZShhcnJheU9mRXhwZWN0YXRpb25zLCBmdW5jdGlvbihleHBlY3RhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGF0aW9uID09PSBhY3R1YWw7XG4gICAgICAgIH0pO1xuICAgIH0sIFwiaW4oXCIgKyB2YWx1ZVRvU3RyaW5nKGFycmF5T2ZFeHBlY3RhdGlvbnMpICsgXCIpXCIpO1xufTtcblxuY3JlYXRlTWF0Y2hlci50eXBlT2YgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgYXNzZXJ0VHlwZSh0eXBlLCBcInN0cmluZ1wiLCBcInR5cGVcIik7XG4gICAgcmV0dXJuIGNyZWF0ZU1hdGNoZXIoZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlT2YoYWN0dWFsKSA9PT0gdHlwZTtcbiAgICB9LCAndHlwZU9mKFwiJyArIHR5cGUgKyAnXCIpJyk7XG59O1xuXG5jcmVhdGVNYXRjaGVyLmluc3RhbmNlT2YgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKFxuICAgICAgICB0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8XG4gICAgICAgIHR5cGVvZiBTeW1ib2wuaGFzSW5zdGFuY2UgPT09IFwidW5kZWZpbmVkXCJcbiAgICApIHtcbiAgICAgICAgYXNzZXJ0VHlwZSh0eXBlLCBcImZ1bmN0aW9uXCIsIFwidHlwZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhc3NlcnRNZXRob2RFeGlzdHMoXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgU3ltYm9sLmhhc0luc3RhbmNlLFxuICAgICAgICAgICAgXCJ0eXBlXCIsXG4gICAgICAgICAgICBcIltTeW1ib2wuaGFzSW5zdGFuY2VdXCJcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZU1hdGNoZXIoZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgICAgIHJldHVybiBhY3R1YWwgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH0sIFwiaW5zdGFuY2VPZihcIiArIChmdW5jdGlvbk5hbWUodHlwZSkgfHwgb2JqZWN0VG9TdHJpbmcodHlwZSkpICsgXCIpXCIpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgcHJvcGVydHkgbWF0Y2hlclxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9wZXJ0eVRlc3QgQSBmdW5jdGlvbiB0byB0ZXN0IHRoZSBwcm9wZXJ0eSBhZ2FpbnN0IGEgdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlUHJlZml4IEEgcHJlZml4IHRvIHVzZSBmb3IgbWVzc2FnZXMgZ2VuZXJhdGVkIGJ5IHRoZSBtYXRjaGVyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIG1hdGNoZXJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUHJvcGVydHlNYXRjaGVyKHByb3BlcnR5VGVzdCwgbWVzc2FnZVByZWZpeCkge1xuICAgIHJldHVybiBmdW5jdGlvbihwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgICAgYXNzZXJ0VHlwZShwcm9wZXJ0eSwgXCJzdHJpbmdcIiwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgdmFyIG9ubHlQcm9wZXJ0eSA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDE7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbWVzc2FnZVByZWZpeCArICcoXCInICsgcHJvcGVydHkgKyAnXCInO1xuICAgICAgICBpZiAoIW9ubHlQcm9wZXJ0eSkge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIiwgXCIgKyB2YWx1ZVRvU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlICs9IFwiKVwiO1xuICAgICAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBhY3R1YWwgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGFjdHVhbCA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICFwcm9wZXJ0eVRlc3QoYWN0dWFsLCBwcm9wZXJ0eSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvbmx5UHJvcGVydHkgfHwgZGVlcEVxdWFsKGFjdHVhbFtwcm9wZXJ0eV0sIHZhbHVlKTtcbiAgICAgICAgfSwgbWVzc2FnZSk7XG4gICAgfTtcbn1cblxuY3JlYXRlTWF0Y2hlci5oYXMgPSBjcmVhdGVQcm9wZXJ0eU1hdGNoZXIoZnVuY3Rpb24oYWN0dWFsLCBwcm9wZXJ0eSkge1xuICAgIGlmICh0eXBlb2YgYWN0dWFsID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eSBpbiBhY3R1YWw7XG4gICAgfVxuICAgIHJldHVybiBhY3R1YWxbcHJvcGVydHldICE9PSB1bmRlZmluZWQ7XG59LCBcImhhc1wiKTtcblxuY3JlYXRlTWF0Y2hlci5oYXNPd24gPSBjcmVhdGVQcm9wZXJ0eU1hdGNoZXIoZnVuY3Rpb24oYWN0dWFsLCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eShhY3R1YWwsIHByb3BlcnR5KTtcbn0sIFwiaGFzT3duXCIpO1xuXG5jcmVhdGVNYXRjaGVyLmhhc05lc3RlZCA9IGZ1bmN0aW9uKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIGFzc2VydFR5cGUocHJvcGVydHksIFwic3RyaW5nXCIsIFwicHJvcGVydHlcIik7XG4gICAgdmFyIG9ubHlQcm9wZXJ0eSA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDE7XG4gICAgdmFyIG1lc3NhZ2UgPSAnaGFzTmVzdGVkKFwiJyArIHByb3BlcnR5ICsgJ1wiJztcbiAgICBpZiAoIW9ubHlQcm9wZXJ0eSkge1xuICAgICAgICBtZXNzYWdlICs9IFwiLCBcIiArIHZhbHVlVG9TdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiKVwiO1xuICAgIHJldHVybiBjcmVhdGVNYXRjaGVyKGZ1bmN0aW9uKGFjdHVhbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBhY3R1YWwgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYWN0dWFsID09PSBudWxsIHx8XG4gICAgICAgICAgICBnZXQoYWN0dWFsLCBwcm9wZXJ0eSkgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb25seVByb3BlcnR5IHx8IGRlZXBFcXVhbChnZXQoYWN0dWFsLCBwcm9wZXJ0eSksIHZhbHVlKTtcbiAgICB9LCBtZXNzYWdlKTtcbn07XG5cbmNyZWF0ZU1hdGNoZXIuZXZlcnkgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICBhc3NlcnRNYXRjaGVyKHByZWRpY2F0ZSk7XG5cbiAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgaWYgKHR5cGVPZihhY3R1YWwpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZXZlcnkoT2JqZWN0LmtleXMoYWN0dWFsKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZWRpY2F0ZS50ZXN0KGFjdHVhbFtrZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGlzSXRlcmFibGUoYWN0dWFsKSAmJlxuICAgICAgICAgICAgZXZlcnkoYWN0dWFsLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZWRpY2F0ZS50ZXN0KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9LCBcImV2ZXJ5KFwiICsgcHJlZGljYXRlLm1lc3NhZ2UgKyBcIilcIik7XG59O1xuXG5jcmVhdGVNYXRjaGVyLnNvbWUgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICBhc3NlcnRNYXRjaGVyKHByZWRpY2F0ZSk7XG5cbiAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgaWYgKHR5cGVPZihhY3R1YWwpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gIWV2ZXJ5KE9iamVjdC5rZXlzKGFjdHVhbCksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhcHJlZGljYXRlLnRlc3QoYWN0dWFsW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaXNJdGVyYWJsZShhY3R1YWwpICYmXG4gICAgICAgICAgICAhZXZlcnkoYWN0dWFsLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFwcmVkaWNhdGUudGVzdChlbGVtZW50KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSwgXCJzb21lKFwiICsgcHJlZGljYXRlLm1lc3NhZ2UgKyBcIilcIik7XG59O1xuXG5jcmVhdGVNYXRjaGVyLmFycmF5ID0gY3JlYXRlTWF0Y2hlci50eXBlT2YoXCJhcnJheVwiKTtcblxuY3JlYXRlTWF0Y2hlci5hcnJheS5kZWVwRXF1YWxzID0gZnVuY3Rpb24oZXhwZWN0YXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgLy8gQ29tcGFyaW5nIGxlbmd0aHMgaXMgdGhlIGZhc3Rlc3Qgd2F5IHRvIHNwb3QgYSBkaWZmZXJlbmNlIGJlZm9yZSBpdGVyYXRpbmcgdGhyb3VnaCBldmVyeSBpdGVtXG4gICAgICAgIHZhciBzYW1lTGVuZ3RoID0gYWN0dWFsLmxlbmd0aCA9PT0gZXhwZWN0YXRpb24ubGVuZ3RoO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZU9mKGFjdHVhbCkgPT09IFwiYXJyYXlcIiAmJlxuICAgICAgICAgICAgc2FtZUxlbmd0aCAmJlxuICAgICAgICAgICAgZXZlcnkoYWN0dWFsLCBmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBleHBlY3RlZCA9IGV4cGVjdGF0aW9uW2luZGV4XTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZU9mKGV4cGVjdGVkKSA9PT0gXCJhcnJheVwiICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVPZihlbGVtZW50KSA9PT0gXCJhcnJheVwiXG4gICAgICAgICAgICAgICAgICAgID8gY3JlYXRlTWF0Y2hlci5hcnJheS5kZWVwRXF1YWxzKGV4cGVjdGVkKS50ZXN0KGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIDogZGVlcEVxdWFsKGV4cGVjdGVkLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSwgXCJkZWVwRXF1YWxzKFtcIiArIGl0ZXJhYmxlVG9TdHJpbmcoZXhwZWN0YXRpb24pICsgXCJdKVwiKTtcbn07XG5cbmNyZWF0ZU1hdGNoZXIuYXJyYXkuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKGV4cGVjdGF0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU1hdGNoZXIoZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0eXBlT2YoYWN0dWFsKSA9PT0gXCJhcnJheVwiICYmXG4gICAgICAgICAgICBldmVyeShleHBlY3RhdGlvbiwgZnVuY3Rpb24oZXhwZWN0ZWRFbGVtZW50LCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3R1YWxbaW5kZXhdID09PSBleHBlY3RlZEVsZW1lbnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0sIFwic3RhcnRzV2l0aChbXCIgKyBpdGVyYWJsZVRvU3RyaW5nKGV4cGVjdGF0aW9uKSArIFwiXSlcIik7XG59O1xuXG5jcmVhdGVNYXRjaGVyLmFycmF5LmVuZHNXaXRoID0gZnVuY3Rpb24oZXhwZWN0YXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgLy8gVGhpcyBpbmRpY2F0ZXMgdGhlIGluZGV4IGluIHdoaWNoIHdlIHNob3VsZCBzdGFydCBtYXRjaGluZ1xuICAgICAgICB2YXIgb2Zmc2V0ID0gYWN0dWFsLmxlbmd0aCAtIGV4cGVjdGF0aW9uLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZU9mKGFjdHVhbCkgPT09IFwiYXJyYXlcIiAmJlxuICAgICAgICAgICAgZXZlcnkoZXhwZWN0YXRpb24sIGZ1bmN0aW9uKGV4cGVjdGVkRWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0dWFsW29mZnNldCArIGluZGV4XSA9PT0gZXhwZWN0ZWRFbGVtZW50O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9LCBcImVuZHNXaXRoKFtcIiArIGl0ZXJhYmxlVG9TdHJpbmcoZXhwZWN0YXRpb24pICsgXCJdKVwiKTtcbn07XG5cbmNyZWF0ZU1hdGNoZXIuYXJyYXkuY29udGFpbnMgPSBmdW5jdGlvbihleHBlY3RhdGlvbikge1xuICAgIHJldHVybiBjcmVhdGVNYXRjaGVyKGZ1bmN0aW9uKGFjdHVhbCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZU9mKGFjdHVhbCkgPT09IFwiYXJyYXlcIiAmJlxuICAgICAgICAgICAgZXZlcnkoZXhwZWN0YXRpb24sIGZ1bmN0aW9uKGV4cGVjdGVkRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheUluZGV4T2YoYWN0dWFsLCBleHBlY3RlZEVsZW1lbnQpICE9PSAtMTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSwgXCJjb250YWlucyhbXCIgKyBpdGVyYWJsZVRvU3RyaW5nKGV4cGVjdGF0aW9uKSArIFwiXSlcIik7XG59O1xuXG5jcmVhdGVNYXRjaGVyLm1hcCA9IGNyZWF0ZU1hdGNoZXIudHlwZU9mKFwibWFwXCIpO1xuXG5jcmVhdGVNYXRjaGVyLm1hcC5kZWVwRXF1YWxzID0gZnVuY3Rpb24gbWFwRGVlcEVxdWFscyhleHBlY3RhdGlvbikge1xuICAgIHJldHVybiBjcmVhdGVNYXRjaGVyKGZ1bmN0aW9uKGFjdHVhbCkge1xuICAgICAgICAvLyBDb21wYXJpbmcgbGVuZ3RocyBpcyB0aGUgZmFzdGVzdCB3YXkgdG8gc3BvdCBhIGRpZmZlcmVuY2UgYmVmb3JlIGl0ZXJhdGluZyB0aHJvdWdoIGV2ZXJ5IGl0ZW1cbiAgICAgICAgdmFyIHNhbWVMZW5ndGggPSBhY3R1YWwuc2l6ZSA9PT0gZXhwZWN0YXRpb24uc2l6ZTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHR5cGVPZihhY3R1YWwpID09PSBcIm1hcFwiICYmXG4gICAgICAgICAgICBzYW1lTGVuZ3RoICYmXG4gICAgICAgICAgICBldmVyeShhY3R1YWwsIGZ1bmN0aW9uKGVsZW1lbnQsIGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHBlY3RhdGlvbi5oYXMoa2V5KSAmJiBleHBlY3RhdGlvbi5nZXQoa2V5KSA9PT0gZWxlbWVudDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSwgXCJkZWVwRXF1YWxzKE1hcFtcIiArIGl0ZXJhYmxlVG9TdHJpbmcoZXhwZWN0YXRpb24pICsgXCJdKVwiKTtcbn07XG5cbmNyZWF0ZU1hdGNoZXIubWFwLmNvbnRhaW5zID0gZnVuY3Rpb24gbWFwQ29udGFpbnMoZXhwZWN0YXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHR5cGVPZihhY3R1YWwpID09PSBcIm1hcFwiICYmXG4gICAgICAgICAgICBldmVyeShleHBlY3RhdGlvbiwgZnVuY3Rpb24oZWxlbWVudCwga2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdHVhbC5oYXMoa2V5KSAmJiBhY3R1YWwuZ2V0KGtleSkgPT09IGVsZW1lbnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0sIFwiY29udGFpbnMoTWFwW1wiICsgaXRlcmFibGVUb1N0cmluZyhleHBlY3RhdGlvbikgKyBcIl0pXCIpO1xufTtcblxuY3JlYXRlTWF0Y2hlci5zZXQgPSBjcmVhdGVNYXRjaGVyLnR5cGVPZihcInNldFwiKTtcblxuY3JlYXRlTWF0Y2hlci5zZXQuZGVlcEVxdWFscyA9IGZ1bmN0aW9uIHNldERlZXBFcXVhbHMoZXhwZWN0YXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgLy8gQ29tcGFyaW5nIGxlbmd0aHMgaXMgdGhlIGZhc3Rlc3Qgd2F5IHRvIHNwb3QgYSBkaWZmZXJlbmNlIGJlZm9yZSBpdGVyYXRpbmcgdGhyb3VnaCBldmVyeSBpdGVtXG4gICAgICAgIHZhciBzYW1lTGVuZ3RoID0gYWN0dWFsLnNpemUgPT09IGV4cGVjdGF0aW9uLnNpemU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0eXBlT2YoYWN0dWFsKSA9PT0gXCJzZXRcIiAmJlxuICAgICAgICAgICAgc2FtZUxlbmd0aCAmJlxuICAgICAgICAgICAgZXZlcnkoYWN0dWFsLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGF0aW9uLmhhcyhlbGVtZW50KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSwgXCJkZWVwRXF1YWxzKFNldFtcIiArIGl0ZXJhYmxlVG9TdHJpbmcoZXhwZWN0YXRpb24pICsgXCJdKVwiKTtcbn07XG5cbmNyZWF0ZU1hdGNoZXIuc2V0LmNvbnRhaW5zID0gZnVuY3Rpb24gc2V0Q29udGFpbnMoZXhwZWN0YXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcihmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHR5cGVPZihhY3R1YWwpID09PSBcInNldFwiICYmXG4gICAgICAgICAgICBldmVyeShleHBlY3RhdGlvbiwgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3R1YWwuaGFzKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9LCBcImNvbnRhaW5zKFNldFtcIiArIGl0ZXJhYmxlVG9TdHJpbmcoZXhwZWN0YXRpb24pICsgXCJdKVwiKTtcbn07XG5cbmNyZWF0ZU1hdGNoZXIuYm9vbCA9IGNyZWF0ZU1hdGNoZXIudHlwZU9mKFwiYm9vbGVhblwiKTtcbmNyZWF0ZU1hdGNoZXIubnVtYmVyID0gY3JlYXRlTWF0Y2hlci50eXBlT2YoXCJudW1iZXJcIik7XG5jcmVhdGVNYXRjaGVyLnN0cmluZyA9IGNyZWF0ZU1hdGNoZXIudHlwZU9mKFwic3RyaW5nXCIpO1xuY3JlYXRlTWF0Y2hlci5vYmplY3QgPSBjcmVhdGVNYXRjaGVyLnR5cGVPZihcIm9iamVjdFwiKTtcbmNyZWF0ZU1hdGNoZXIuZnVuYyA9IGNyZWF0ZU1hdGNoZXIudHlwZU9mKFwiZnVuY3Rpb25cIik7XG5jcmVhdGVNYXRjaGVyLnJlZ2V4cCA9IGNyZWF0ZU1hdGNoZXIudHlwZU9mKFwicmVnZXhwXCIpO1xuY3JlYXRlTWF0Y2hlci5kYXRlID0gY3JlYXRlTWF0Y2hlci50eXBlT2YoXCJkYXRlXCIpO1xuY3JlYXRlTWF0Y2hlci5zeW1ib2wgPSBjcmVhdGVNYXRjaGVyLnR5cGVPZihcInN5bWJvbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVNYXRjaGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc01hdGNoZXIgPSByZXF1aXJlKFwiLi9pcy1tYXRjaGVyXCIpO1xuXG4vKipcbiAqIFRocm93cyBhIFR5cGVFcnJvciB3aGVuIGB2YWx1ZWAgaXMgbm90IGEgbWF0Y2hlclxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBleGFtaW5lXG4gKi9cbmZ1bmN0aW9uIGFzc2VydE1hdGNoZXIodmFsdWUpIHtcbiAgICBpZiAoIWlzTWF0Y2hlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk1hdGNoZXIgZXhwZWN0ZWRcIik7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2VydE1hdGNoZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBUaHJvd3MgYSBUeXBlRXJyb3Igd2hlbiBleHBlY3RlZCBtZXRob2QgZG9lc24ndCBleGlzdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIEEgdmFsdWUgdG8gZXhhbWluZVxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHRvIGxvb2sgZm9yXG4gKiBAcGFyYW0ge25hbWV9IG5hbWUgQSBuYW1lIHRvIHVzZSBmb3IgdGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RQYXRoIFRoZSBuYW1lIG9mIHRoZSBtZXRob2QgdG8gdXNlIGZvciBlcnJvciBtZXNzYWdlc1xuICogQHRocm93cyB7VHlwZUVycm9yfSBXaGVuIHRoZSBtZXRob2QgZG9lc24ndCBleGlzdFxuICovXG5mdW5jdGlvbiBhc3NlcnRNZXRob2RFeGlzdHModmFsdWUsIG1ldGhvZCwgbmFtZSwgbWV0aG9kUGF0aCkge1xuICAgIGlmICh2YWx1ZVttZXRob2RdID09PSBudWxsIHx8IHZhbHVlW21ldGhvZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgXCJFeHBlY3RlZCBcIiArIG5hbWUgKyBcIiB0byBoYXZlIG1ldGhvZCBcIiArIG1ldGhvZFBhdGhcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzZXJ0TWV0aG9kRXhpc3RzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0eXBlT2YgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS50eXBlT2Y7XG5cbi8qKlxuICogRW5zdXJlcyB0aGF0IHZhbHVlIGlzIG9mIHR5cGVcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBIHZhbHVlIHRvIGV4YW1pbmVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEEgYmFzaWMgSmF2YVNjcmlwdCB0eXBlIHRvIGNvbXBhcmUgdG8sIGUuZy4gXCJvYmplY3RcIiwgXCJzdHJpbmdcIlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgQSBzdHJpbmcgdG8gdXNlIGZvciB0aGUgZXJyb3IgbWVzc2FnZVxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB2YWx1ZSBpcyBub3Qgb2YgdGhlIGV4cGVjdGVkIHR5cGVcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGFzc2VydFR5cGUodmFsdWUsIHR5cGUsIG5hbWUpIHtcbiAgICB2YXIgYWN0dWFsID0gdHlwZU9mKHZhbHVlKTtcbiAgICBpZiAoYWN0dWFsICE9PSB0eXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICBcIkV4cGVjdGVkIHR5cGUgb2YgXCIgK1xuICAgICAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgICAgIFwiIHRvIGJlIFwiICtcbiAgICAgICAgICAgICAgICB0eXBlICtcbiAgICAgICAgICAgICAgICBcIiwgYnV0IHdhcyBcIiArXG4gICAgICAgICAgICAgICAgYWN0dWFsXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2VydFR5cGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHR5cGVPZiA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnR5cGVPZjtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBmb3IgaXRlcmFibGVzXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQSB2YWx1ZSB0byBleGFtaW5lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgd2hlbiBgdmFsdWVgIGxvb2tzIGxpa2UgYW4gaXRlcmFibGVcbiAqL1xuZnVuY3Rpb24gaXNJdGVyYWJsZSh2YWx1ZSkge1xuICAgIHJldHVybiBCb29sZWFuKHZhbHVlKSAmJiB0eXBlT2YodmFsdWUuZm9yRWFjaCkgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5vYmplY3QuaXNQcm90b3R5cGVPZjtcblxudmFyIG1hdGNoZXJQcm90b3R5cGUgPSByZXF1aXJlKFwiLi9tYXRjaGVyLXByb3RvdHlwZVwiKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCB3aGVuIGBvYmplY3RgIGlzIGEgbWF0Y2hlclxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IG9iamVjdCBBIHZhbHVlIHRvIGV4YW1pbmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCB3aGVuIGBvYmplY3RgIGlzIGEgbWF0Y2hlclxuICovXG5mdW5jdGlvbiBpc01hdGNoZXIob2JqZWN0KSB7XG4gICAgcmV0dXJuIGlzUHJvdG90eXBlT2YobWF0Y2hlclByb3RvdHlwZSwgb2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hdGNoZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGV2ZXJ5ID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheS5ldmVyeTtcbnZhciB0eXBlT2YgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS50eXBlT2Y7XG5cbnZhciBkZWVwRXF1YWwgPSByZXF1aXJlKFwiLi4vZGVlcC1lcXVhbFwiKTtcblxudmFyIGlzTWF0Y2hlciA9IHJlcXVpcmUoXCIuL2lzLW1hdGNoZXJcIik7XG4vKipcbiAqIE1hdGNoZXMgYGFjdHVhbGAgd2l0aCBgZXhwZWN0YXRpb25gXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gYWN0dWFsIEEgdmFsdWUgdG8gZXhhbWluZVxuICogQHBhcmFtIHtvYmplY3R9IGV4cGVjdGF0aW9uIEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgdG8gbWF0Y2ggb25cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgd2hlbiBgYWN0dWFsYCBtYXRjaGVzIGFsbCBwcm9wZXJ0aWVzIGluIGBleHBlY3RhdGlvbmBcbiAqL1xuZnVuY3Rpb24gbWF0Y2hPYmplY3QoYWN0dWFsLCBleHBlY3RhdGlvbikge1xuICAgIGlmIChhY3R1YWwgPT09IG51bGwgfHwgYWN0dWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBldmVyeShPYmplY3Qua2V5cyhleHBlY3RhdGlvbiksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICB2YXIgZXhwID0gZXhwZWN0YXRpb25ba2V5XTtcbiAgICAgICAgdmFyIGFjdCA9IGFjdHVhbFtrZXldO1xuXG4gICAgICAgIGlmIChpc01hdGNoZXIoZXhwKSkge1xuICAgICAgICAgICAgaWYgKCFleHAudGVzdChhY3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVPZihleHApID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAoIW1hdGNoT2JqZWN0KGFjdCwgZXhwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghZGVlcEVxdWFsKGFjdCwgZXhwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWF0Y2hPYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1hdGNoZXJQcm90b3R5cGUgPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xuICAgIH1cbn07XG5cbm1hdGNoZXJQcm90b3R5cGUub3IgPSBmdW5jdGlvbih2YWx1ZU9yTWF0Y2hlcikge1xuICAgIHZhciBjcmVhdGVNYXRjaGVyID0gcmVxdWlyZShcIi4uL2NyZWF0ZS1tYXRjaGVyXCIpO1xuICAgIHZhciBpc01hdGNoZXIgPSBjcmVhdGVNYXRjaGVyLmlzTWF0Y2hlcjtcblxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTWF0Y2hlciBleHBlY3RlZFwiKTtcbiAgICB9XG5cbiAgICB2YXIgbTIgPSBpc01hdGNoZXIodmFsdWVPck1hdGNoZXIpXG4gICAgICAgID8gdmFsdWVPck1hdGNoZXJcbiAgICAgICAgOiBjcmVhdGVNYXRjaGVyKHZhbHVlT3JNYXRjaGVyKTtcbiAgICB2YXIgbTEgPSB0aGlzO1xuICAgIHZhciBvciA9IE9iamVjdC5jcmVhdGUobWF0Y2hlclByb3RvdHlwZSk7XG4gICAgb3IudGVzdCA9IGZ1bmN0aW9uKGFjdHVhbCkge1xuICAgICAgICByZXR1cm4gbTEudGVzdChhY3R1YWwpIHx8IG0yLnRlc3QoYWN0dWFsKTtcbiAgICB9O1xuICAgIG9yLm1lc3NhZ2UgPSBtMS5tZXNzYWdlICsgXCIub3IoXCIgKyBtMi5tZXNzYWdlICsgXCIpXCI7XG4gICAgcmV0dXJuIG9yO1xufTtcblxubWF0Y2hlclByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbih2YWx1ZU9yTWF0Y2hlcikge1xuICAgIHZhciBjcmVhdGVNYXRjaGVyID0gcmVxdWlyZShcIi4uL2NyZWF0ZS1tYXRjaGVyXCIpO1xuICAgIHZhciBpc01hdGNoZXIgPSBjcmVhdGVNYXRjaGVyLmlzTWF0Y2hlcjtcblxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTWF0Y2hlciBleHBlY3RlZFwiKTtcbiAgICB9XG5cbiAgICB2YXIgbTIgPSBpc01hdGNoZXIodmFsdWVPck1hdGNoZXIpXG4gICAgICAgID8gdmFsdWVPck1hdGNoZXJcbiAgICAgICAgOiBjcmVhdGVNYXRjaGVyKHZhbHVlT3JNYXRjaGVyKTtcbiAgICB2YXIgbTEgPSB0aGlzO1xuICAgIHZhciBhbmQgPSBPYmplY3QuY3JlYXRlKG1hdGNoZXJQcm90b3R5cGUpO1xuICAgIGFuZC50ZXN0ID0gZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgICAgIHJldHVybiBtMS50ZXN0KGFjdHVhbCkgJiYgbTIudGVzdChhY3R1YWwpO1xuICAgIH07XG4gICAgYW5kLm1lc3NhZ2UgPSBtMS5tZXNzYWdlICsgXCIuYW5kKFwiICsgbTIubWVzc2FnZSArIFwiKVwiO1xuICAgIHJldHVybiBhbmQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hdGNoZXJQcm90b3R5cGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGZ1bmN0aW9uTmFtZSA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLmZ1bmN0aW9uTmFtZTtcbnZhciBqb2luID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheS5qb2luO1xudmFyIG1hcCA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuYXJyYXkubWFwO1xudmFyIHN0cmluZ0luZGV4T2YgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLnN0cmluZy5pbmRleE9mO1xudmFyIHZhbHVlVG9TdHJpbmcgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS52YWx1ZVRvU3RyaW5nO1xuXG52YXIgbWF0Y2hPYmplY3QgPSByZXF1aXJlKFwiLi9tYXRjaC1vYmplY3RcIik7XG5cbnZhciBUWVBFX01BUCA9IHtcbiAgICBmdW5jdGlvbjogZnVuY3Rpb24obSwgZXhwZWN0YXRpb24sIG1lc3NhZ2UpIHtcbiAgICAgICAgbS50ZXN0ID0gZXhwZWN0YXRpb247XG4gICAgICAgIG0ubWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJtYXRjaChcIiArIGZ1bmN0aW9uTmFtZShleHBlY3RhdGlvbikgKyBcIilcIjtcbiAgICB9LFxuICAgIG51bWJlcjogZnVuY3Rpb24obSwgZXhwZWN0YXRpb24pIHtcbiAgICAgICAgbS50ZXN0ID0gZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHR5cGUgY29lcmNpb24gaGVyZVxuICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGF0aW9uID09IGFjdHVhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24obSwgZXhwZWN0YXRpb24pIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG5cbiAgICAgICAgaWYgKHR5cGVvZiBleHBlY3RhdGlvbi50ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG0udGVzdCA9IGZ1bmN0aW9uKGFjdHVhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHBlY3RhdGlvbi50ZXN0KGFjdHVhbCkgPT09IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbS5tZXNzYWdlID0gXCJtYXRjaChcIiArIGZ1bmN0aW9uTmFtZShleHBlY3RhdGlvbi50ZXN0KSArIFwiKVwiO1xuICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgIH1cblxuICAgICAgICBhcnJheSA9IG1hcChPYmplY3Qua2V5cyhleHBlY3RhdGlvbiksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSArIFwiOiBcIiArIHZhbHVlVG9TdHJpbmcoZXhwZWN0YXRpb25ba2V5XSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG0udGVzdCA9IGZ1bmN0aW9uKGFjdHVhbCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoT2JqZWN0KGFjdHVhbCwgZXhwZWN0YXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICBtLm1lc3NhZ2UgPSBcIm1hdGNoKFwiICsgam9pbihhcnJheSwgXCIsIFwiKSArIFwiKVwiO1xuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH0sXG4gICAgcmVnZXhwOiBmdW5jdGlvbihtLCBleHBlY3RhdGlvbikge1xuICAgICAgICBtLnRlc3QgPSBmdW5jdGlvbihhY3R1YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYWN0dWFsID09PSBcInN0cmluZ1wiICYmIGV4cGVjdGF0aW9uLnRlc3QoYWN0dWFsKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHN0cmluZzogZnVuY3Rpb24obSwgZXhwZWN0YXRpb24pIHtcbiAgICAgICAgbS50ZXN0ID0gZnVuY3Rpb24oYWN0dWFsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHR5cGVvZiBhY3R1YWwgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBzdHJpbmdJbmRleE9mKGFjdHVhbCwgZXhwZWN0YXRpb24pICE9PSAtMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgbS5tZXNzYWdlID0gJ21hdGNoKFwiJyArIGV4cGVjdGF0aW9uICsgJ1wiKSc7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUWVBFX01BUDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdmFsdWVUb1N0cmluZyA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnZhbHVlVG9TdHJpbmc7XG52YXIgY2xhc3NOYW1lID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikuY2xhc3NOYW1lO1xudmFyIGFycmF5UHJvdG8gPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLmFycmF5O1xudmFyIG9iamVjdFByb3RvID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5vYmplY3Q7XG52YXIgbWFwRm9yRWFjaCA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMubWFwLmZvckVhY2g7XG5cbnZhciBnZXRDbGFzcyA9IHJlcXVpcmUoXCIuL2dldC1jbGFzc1wiKTtcbnZhciBpZGVudGljYWwgPSByZXF1aXJlKFwiLi9pZGVudGljYWxcIik7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKFwiLi9pcy1hcmd1bWVudHNcIik7XG52YXIgaXNEYXRlID0gcmVxdWlyZShcIi4vaXMtZGF0ZVwiKTtcbnZhciBpc0VsZW1lbnQgPSByZXF1aXJlKFwiLi9pcy1lbGVtZW50XCIpO1xudmFyIGlzTWFwID0gcmVxdWlyZShcIi4vaXMtbWFwXCIpO1xudmFyIGlzTmFOID0gcmVxdWlyZShcIi4vaXMtbmFuXCIpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZShcIi4vaXMtb2JqZWN0XCIpO1xudmFyIGlzU2V0ID0gcmVxdWlyZShcIi4vaXMtc2V0XCIpO1xudmFyIGlzU3Vic2V0ID0gcmVxdWlyZShcIi4vaXMtc3Vic2V0XCIpO1xuXG52YXIgY29uY2F0ID0gYXJyYXlQcm90by5jb25jYXQ7XG52YXIgZXZlcnkgPSBhcnJheVByb3RvLmV2ZXJ5O1xudmFyIHB1c2ggPSBhcnJheVByb3RvLnB1c2g7XG5cbnZhciBnZXRUaW1lID0gRGF0ZS5wcm90b3R5cGUuZ2V0VGltZTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xudmFyIGluZGV4T2YgPSBhcnJheVByb3RvLmluZGV4T2Y7XG52YXIga2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKlxuICogRGVlcCBlcXVhbCBjb21wYXJpc29uLiBUd28gdmFsdWVzIGFyZSBcImRlZXAgZXF1YWxcIiB3aGVuOlxuICpcbiAqICAgLSBUaGV5IGFyZSBlcXVhbCwgYWNjb3JkaW5nIHRvIHNhbXNhbS5pZGVudGljYWxcbiAqICAgLSBUaGV5IGFyZSBib3RoIGRhdGUgb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIHNhbWUgdGltZVxuICogICAtIFRoZXkgYXJlIGJvdGggYXJyYXlzIGNvbnRhaW5pbmcgZWxlbWVudHMgdGhhdCBhcmUgYWxsIGRlZXBFcXVhbFxuICogICAtIFRoZXkgYXJlIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBzZXQgb2YgcHJvcGVydGllcywgYW5kIGVhY2ggcHJvcGVydHlcbiAqICAgICBpbiBgYGFjdHVhbGBgIGlzIGRlZXBFcXVhbCB0byB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpbiBgYGV4cGVjdGF0aW9uYGBcbiAqXG4gKiBTdXBwb3J0cyBjeWNsaWMgb2JqZWN0cy5cbiAqXG4gKiBAYWxpYXMgbW9kdWxlOnNhbXNhbS5kZWVwRXF1YWxcbiAqIEBwYXJhbSB7Kn0gYWN0dWFsIFRoZSBvYmplY3QgdG8gZXhhbWluZVxuICogQHBhcmFtIHsqfSBleHBlY3RhdGlvbiBUaGUgb2JqZWN0IGFjdHVhbCBpcyBleHBlY3RlZCB0byBiZSBlcXVhbCB0b1xuICogQHBhcmFtIHtvYmplY3R9IG1hdGNoIEEgdmFsdWUgdG8gbWF0Y2ggb25cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgd2hlbiBhY3R1YWwgYW5kIGV4cGVjdGF0aW9uIGFyZSBjb25zaWRlcmVkIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGRlZXBFcXVhbEN5Y2xpYyhhY3R1YWwsIGV4cGVjdGF0aW9uLCBtYXRjaCkge1xuICAgIC8vIHVzZWQgZm9yIGN5Y2xpYyBjb21wYXJpc29uXG4gICAgLy8gY29udGFpbiBhbHJlYWR5IHZpc2l0ZWQgb2JqZWN0c1xuICAgIHZhciBhY3R1YWxPYmplY3RzID0gW107XG4gICAgdmFyIGV4cGVjdGF0aW9uT2JqZWN0cyA9IFtdO1xuICAgIC8vIGNvbnRhaW4gcGF0aGVzIChwb3NpdGlvbiBpbiB0aGUgb2JqZWN0IHN0cnVjdHVyZSlcbiAgICAvLyBvZiB0aGUgYWxyZWFkeSB2aXNpdGVkIG9iamVjdHNcbiAgICAvLyBpbmRleGVzIHNhbWUgYXMgaW4gb2JqZWN0cyBhcnJheXNcbiAgICB2YXIgYWN0dWFsUGF0aHMgPSBbXTtcbiAgICB2YXIgZXhwZWN0YXRpb25QYXRocyA9IFtdO1xuICAgIC8vIGNvbnRhaW5zIGNvbWJpbmF0aW9ucyBvZiBhbHJlYWR5IGNvbXBhcmVkIG9iamVjdHNcbiAgICAvLyBpbiB0aGUgbWFubmVyOiB7IFwiJDFbJ3JlZiddJDJbJ3JlZiddXCI6IHRydWUgfVxuICAgIHZhciBjb21wYXJlZCA9IHt9O1xuXG4gICAgLy8gZG9lcyB0aGUgcmVjdXJzaW9uIGZvciB0aGUgZGVlcCBlcXVhbCBjaGVja1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgcmV0dXJuIChmdW5jdGlvbiBkZWVwRXF1YWwoXG4gICAgICAgIGFjdHVhbE9iaixcbiAgICAgICAgZXhwZWN0YXRpb25PYmosXG4gICAgICAgIGFjdHVhbFBhdGgsXG4gICAgICAgIGV4cGVjdGF0aW9uUGF0aFxuICAgICkge1xuICAgICAgICAvLyBJZiBib3RoIGFyZSBtYXRjaGVycyB0aGV5IG11c3QgYmUgdGhlIHNhbWUgaW5zdGFuY2UgaW4gb3JkZXIgdG8gYmVcbiAgICAgICAgLy8gY29uc2lkZXJlZCBlcXVhbCBJZiB3ZSBkaWRuJ3QgZG8gdGhhdCB3ZSB3b3VsZCBlbmQgdXAgcnVubmluZyBvbmVcbiAgICAgICAgLy8gbWF0Y2hlciBhZ2FpbnN0IHRoZSBvdGhlclxuICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2guaXNNYXRjaGVyKGV4cGVjdGF0aW9uT2JqKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoLmlzTWF0Y2hlcihhY3R1YWxPYmopKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdHVhbE9iaiA9PT0gZXhwZWN0YXRpb25PYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXhwZWN0YXRpb25PYmoudGVzdChhY3R1YWxPYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdHVhbFR5cGUgPSB0eXBlb2YgYWN0dWFsT2JqO1xuICAgICAgICB2YXIgZXhwZWN0YXRpb25UeXBlID0gdHlwZW9mIGV4cGVjdGF0aW9uT2JqO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGFjdHVhbE9iaiA9PT0gZXhwZWN0YXRpb25PYmogfHxcbiAgICAgICAgICAgIGlzTmFOKGFjdHVhbE9iaikgfHxcbiAgICAgICAgICAgIGlzTmFOKGV4cGVjdGF0aW9uT2JqKSB8fFxuICAgICAgICAgICAgYWN0dWFsT2JqID09PSBudWxsIHx8XG4gICAgICAgICAgICBleHBlY3RhdGlvbk9iaiA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgYWN0dWFsT2JqID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGV4cGVjdGF0aW9uT2JqID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGFjdHVhbFR5cGUgIT09IFwib2JqZWN0XCIgfHxcbiAgICAgICAgICAgIGV4cGVjdGF0aW9uVHlwZSAhPT0gXCJvYmplY3RcIlxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBpZGVudGljYWwoYWN0dWFsT2JqLCBleHBlY3RhdGlvbk9iaik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbGVtZW50cyBhcmUgb25seSBlcXVhbCBpZiBpZGVudGljYWwoZXhwZWN0ZWQsIGFjdHVhbClcbiAgICAgICAgaWYgKGlzRWxlbWVudChhY3R1YWxPYmopIHx8IGlzRWxlbWVudChleHBlY3RhdGlvbk9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc0FjdHVhbERhdGUgPSBpc0RhdGUoYWN0dWFsT2JqKTtcbiAgICAgICAgdmFyIGlzRXhwZWN0YXRpb25EYXRlID0gaXNEYXRlKGV4cGVjdGF0aW9uT2JqKTtcbiAgICAgICAgaWYgKGlzQWN0dWFsRGF0ZSB8fCBpc0V4cGVjdGF0aW9uRGF0ZSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFpc0FjdHVhbERhdGUgfHxcbiAgICAgICAgICAgICAgICAhaXNFeHBlY3RhdGlvbkRhdGUgfHxcbiAgICAgICAgICAgICAgICBnZXRUaW1lLmNhbGwoYWN0dWFsT2JqKSAhPT0gZ2V0VGltZS5jYWxsKGV4cGVjdGF0aW9uT2JqKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdHVhbE9iaiBpbnN0YW5jZW9mIFJlZ0V4cCAmJiBleHBlY3RhdGlvbk9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlVG9TdHJpbmcoYWN0dWFsT2JqKSAhPT0gdmFsdWVUb1N0cmluZyhleHBlY3RhdGlvbk9iaikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0dWFsT2JqIGluc3RhbmNlb2YgRXJyb3IgJiYgZXhwZWN0YXRpb25PYmogaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGFjdHVhbE9iaiA9PT0gZXhwZWN0YXRpb25PYmo7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0dWFsQ2xhc3MgPSBnZXRDbGFzcyhhY3R1YWxPYmopO1xuICAgICAgICB2YXIgZXhwZWN0YXRpb25DbGFzcyA9IGdldENsYXNzKGV4cGVjdGF0aW9uT2JqKTtcbiAgICAgICAgdmFyIGFjdHVhbEtleXMgPSBrZXlzKGFjdHVhbE9iaik7XG4gICAgICAgIHZhciBleHBlY3RhdGlvbktleXMgPSBrZXlzKGV4cGVjdGF0aW9uT2JqKTtcbiAgICAgICAgdmFyIGFjdHVhbE5hbWUgPSBjbGFzc05hbWUoYWN0dWFsT2JqKTtcbiAgICAgICAgdmFyIGV4cGVjdGF0aW9uTmFtZSA9IGNsYXNzTmFtZShleHBlY3RhdGlvbk9iaik7XG4gICAgICAgIHZhciBleHBlY3RhdGlvblN5bWJvbHMgPVxuICAgICAgICAgICAgdHlwZW9mIGdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgPyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXhwZWN0YXRpb25PYmopXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgdmFyIGV4cGVjdGF0aW9uS2V5c0FuZFN5bWJvbHMgPSBjb25jYXQoXG4gICAgICAgICAgICBleHBlY3RhdGlvbktleXMsXG4gICAgICAgICAgICBleHBlY3RhdGlvblN5bWJvbHNcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoaXNBcmd1bWVudHMoYWN0dWFsT2JqKSB8fCBpc0FyZ3VtZW50cyhleHBlY3RhdGlvbk9iaikpIHtcbiAgICAgICAgICAgIGlmIChhY3R1YWxPYmoubGVuZ3RoICE9PSBleHBlY3RhdGlvbk9iai5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgYWN0dWFsVHlwZSAhPT0gZXhwZWN0YXRpb25UeXBlIHx8XG4gICAgICAgICAgICAgICAgYWN0dWFsQ2xhc3MgIT09IGV4cGVjdGF0aW9uQ2xhc3MgfHxcbiAgICAgICAgICAgICAgICBhY3R1YWxLZXlzLmxlbmd0aCAhPT0gZXhwZWN0YXRpb25LZXlzLmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgIChhY3R1YWxOYW1lICYmXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGF0aW9uTmFtZSAmJlxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxOYW1lICE9PSBleHBlY3RhdGlvbk5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNTZXQoYWN0dWFsT2JqKSB8fCBpc1NldChleHBlY3RhdGlvbk9iaikpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhaXNTZXQoYWN0dWFsT2JqKSB8fFxuICAgICAgICAgICAgICAgICFpc1NldChleHBlY3RhdGlvbk9iaikgfHxcbiAgICAgICAgICAgICAgICBhY3R1YWxPYmouc2l6ZSAhPT0gZXhwZWN0YXRpb25PYmouc2l6ZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaXNTdWJzZXQoYWN0dWFsT2JqLCBleHBlY3RhdGlvbk9iaiwgZGVlcEVxdWFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01hcChhY3R1YWxPYmopIHx8IGlzTWFwKGV4cGVjdGF0aW9uT2JqKSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFpc01hcChhY3R1YWxPYmopIHx8XG4gICAgICAgICAgICAgICAgIWlzTWFwKGV4cGVjdGF0aW9uT2JqKSB8fFxuICAgICAgICAgICAgICAgIGFjdHVhbE9iai5zaXplICE9PSBleHBlY3RhdGlvbk9iai5zaXplXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtYXBzRGVlcGx5RXF1YWwgPSB0cnVlO1xuICAgICAgICAgICAgbWFwRm9yRWFjaChhY3R1YWxPYmosIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBtYXBzRGVlcGx5RXF1YWwgPVxuICAgICAgICAgICAgICAgICAgICBtYXBzRGVlcGx5RXF1YWwgJiZcbiAgICAgICAgICAgICAgICAgICAgZGVlcEVxdWFsQ3ljbGljKHZhbHVlLCBleHBlY3RhdGlvbk9iai5nZXQoa2V5KSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1hcHNEZWVwbHlFcXVhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBldmVyeShleHBlY3RhdGlvbktleXNBbmRTeW1ib2xzLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcGVydHkoYWN0dWFsT2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWN0dWFsVmFsdWUgPSBhY3R1YWxPYmpba2V5XTtcbiAgICAgICAgICAgIHZhciBleHBlY3RhdGlvblZhbHVlID0gZXhwZWN0YXRpb25PYmpba2V5XTtcbiAgICAgICAgICAgIHZhciBhY3R1YWxPYmplY3QgPSBpc09iamVjdChhY3R1YWxWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgZXhwZWN0YXRpb25PYmplY3QgPSBpc09iamVjdChleHBlY3RhdGlvblZhbHVlKTtcbiAgICAgICAgICAgIC8vIGRldGVybWluZXMsIGlmIHRoZSBvYmplY3RzIHdlcmUgYWxyZWFkeSB2aXNpdGVkXG4gICAgICAgICAgICAvLyAoaXQncyBmYXN0ZXIgdG8gY2hlY2sgZm9yIGlzT2JqZWN0IGZpcnN0LCB0aGFuIHRvXG4gICAgICAgICAgICAvLyBnZXQgLTEgZnJvbSBnZXRJbmRleCBmb3Igbm9uIG9iamVjdHMpXG4gICAgICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSBhY3R1YWxPYmplY3RcbiAgICAgICAgICAgICAgICA/IGluZGV4T2YoYWN0dWFsT2JqZWN0cywgYWN0dWFsVmFsdWUpXG4gICAgICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgICAgIHZhciBleHBlY3RhdGlvbkluZGV4ID0gZXhwZWN0YXRpb25PYmplY3RcbiAgICAgICAgICAgICAgICA/IGluZGV4T2YoZXhwZWN0YXRpb25PYmplY3RzLCBleHBlY3RhdGlvblZhbHVlKVxuICAgICAgICAgICAgICAgIDogLTE7XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmVzIHRoZSBuZXcgcGF0aHMgb2YgdGhlIG9iamVjdHNcbiAgICAgICAgICAgIC8vIC0gZm9yIG5vbiBjeWNsaWMgb2JqZWN0cyB0aGUgY3VycmVudCBwYXRoIHdpbGwgYmUgZXh0ZW5kZWRcbiAgICAgICAgICAgIC8vICAgYnkgY3VycmVudCBwcm9wZXJ0eSBuYW1lXG4gICAgICAgICAgICAvLyAtIGZvciBjeWNsaWMgb2JqZWN0cyB0aGUgc3RvcmVkIHBhdGggaXMgdGFrZW5cbiAgICAgICAgICAgIHZhciBuZXdBY3R1YWxQYXRoID1cbiAgICAgICAgICAgICAgICBhY3R1YWxJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgPyBhY3R1YWxQYXRoc1thY3R1YWxJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgOiBhY3R1YWxQYXRoICsgXCJbXCIgKyBKU09OLnN0cmluZ2lmeShrZXkpICsgXCJdXCI7XG4gICAgICAgICAgICB2YXIgbmV3RXhwZWN0YXRpb25QYXRoID1cbiAgICAgICAgICAgICAgICBleHBlY3RhdGlvbkluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICAgICA/IGV4cGVjdGF0aW9uUGF0aHNbZXhwZWN0YXRpb25JbmRleF1cbiAgICAgICAgICAgICAgICAgICAgOiBleHBlY3RhdGlvblBhdGggKyBcIltcIiArIEpTT04uc3RyaW5naWZ5KGtleSkgKyBcIl1cIjtcbiAgICAgICAgICAgIHZhciBjb21iaW5lZFBhdGggPSBuZXdBY3R1YWxQYXRoICsgbmV3RXhwZWN0YXRpb25QYXRoO1xuXG4gICAgICAgICAgICAvLyBzdG9wIHJlY3Vyc2lvbiBpZiBjdXJyZW50IG9iamVjdHMgYXJlIGFscmVhZHkgY29tcGFyZWRcbiAgICAgICAgICAgIGlmIChjb21wYXJlZFtjb21iaW5lZFBhdGhdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlbWVtYmVyIHRoZSBjdXJyZW50IG9iamVjdHMgYW5kIHRoZWlyIHBhdGhzXG4gICAgICAgICAgICBpZiAoYWN0dWFsSW5kZXggPT09IC0xICYmIGFjdHVhbE9iamVjdCkge1xuICAgICAgICAgICAgICAgIHB1c2goYWN0dWFsT2JqZWN0cywgYWN0dWFsVmFsdWUpO1xuICAgICAgICAgICAgICAgIHB1c2goYWN0dWFsUGF0aHMsIG5ld0FjdHVhbFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cGVjdGF0aW9uSW5kZXggPT09IC0xICYmIGV4cGVjdGF0aW9uT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcHVzaChleHBlY3RhdGlvbk9iamVjdHMsIGV4cGVjdGF0aW9uVmFsdWUpO1xuICAgICAgICAgICAgICAgIHB1c2goZXhwZWN0YXRpb25QYXRocywgbmV3RXhwZWN0YXRpb25QYXRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVtZW1iZXIgdGhhdCB0aGUgY3VycmVudCBvYmplY3RzIGFyZSBhbHJlYWR5IGNvbXBhcmVkXG4gICAgICAgICAgICBpZiAoYWN0dWFsT2JqZWN0ICYmIGV4cGVjdGF0aW9uT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29tcGFyZWRbY29tYmluZWRQYXRoXSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVuZCBvZiBjeWNsaWMgbG9naWNcblxuICAgICAgICAgICAgLy8gbmVpdGhlciBhY3R1YWxWYWx1ZSBub3IgZXhwZWN0YXRpb25WYWx1ZSBpcyBhIGN5Y2xlXG4gICAgICAgICAgICAvLyBjb250aW51ZSB3aXRoIG5leHQgbGV2ZWxcbiAgICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoXG4gICAgICAgICAgICAgICAgYWN0dWFsVmFsdWUsXG4gICAgICAgICAgICAgICAgZXhwZWN0YXRpb25WYWx1ZSxcbiAgICAgICAgICAgICAgICBuZXdBY3R1YWxQYXRoLFxuICAgICAgICAgICAgICAgIG5ld0V4cGVjdGF0aW9uUGF0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSkoYWN0dWFsLCBleHBlY3RhdGlvbiwgXCIkMVwiLCBcIiQyXCIpO1xufVxuXG5kZWVwRXF1YWxDeWNsaWMudXNlID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZGVlcEVxdWFsKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGRlZXBFcXVhbEN5Y2xpYyhhLCBiLCBtYXRjaCk7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcEVxdWFsQ3ljbGljO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMub2JqZWN0LnRvU3RyaW5nO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGludGVybmFsIGBDbGFzc2AgYnkgY2FsbGluZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2BcbiAqIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlIGFzIGB0aGlzYC4gUmV0dXJuIHZhbHVlIGlzIGEgYFN0cmluZ2AsIG5hbWluZyB0aGVcbiAqIGludGVybmFsIGNsYXNzLCBlLmcuIFwiQXJyYXlcIlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZSAtIEFueSB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ30gLSBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgYENsYXNzYCBvZiBgdmFsdWVgXG4gKi9cbmZ1bmN0aW9uIGdldENsYXNzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nKHZhbHVlKS5zcGxpdCgvWyBcXF1dLylbMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0Q2xhc3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzTmFOID0gcmVxdWlyZShcIi4vaXMtbmFuXCIpO1xudmFyIGlzTmVnWmVybyA9IHJlcXVpcmUoXCIuL2lzLW5lZy16ZXJvXCIpO1xuXG4vKipcbiAqIFN0cmljdCBlcXVhbGl0eSBjaGVjayBhY2NvcmRpbmcgdG8gRWNtYVNjcmlwdCBIYXJtb255J3MgYGVnYWxgLlxuICpcbiAqICoqRnJvbSB0aGUgSGFybW9ueSB3aWtpOioqXG4gKiA+IEFuIGBlZ2FsYCBmdW5jdGlvbiBzaW1wbHkgbWFrZXMgYXZhaWxhYmxlIHRoZSBpbnRlcm5hbCBgU2FtZVZhbHVlYCBmdW5jdGlvblxuICogPiBmcm9tIHNlY3Rpb24gOS4xMiBvZiB0aGUgRVM1IHNwZWMuIElmIHR3byB2YWx1ZXMgYXJlIGVnYWwsIHRoZW4gdGhleSBhcmUgbm90XG4gKiA+IG9ic2VydmFibHkgZGlzdGluZ3Vpc2hhYmxlLlxuICpcbiAqIGBpZGVudGljYWxgIHJldHVybnMgYHRydWVgIHdoZW4gYD09PWAgaXMgYHRydWVgLCBleGNlcHQgZm9yIGAtMGAgYW5kXG4gKiBgKzBgLCB3aGVyZSBpdCByZXR1cm5zIGBmYWxzZWAuIEFkZGl0aW9uYWxseSwgaXQgcmV0dXJucyBgdHJ1ZWAgd2hlblxuICogYE5hTmAgaXMgY29tcGFyZWQgdG8gaXRzZWxmLlxuICpcbiAqIEBhbGlhcyBtb2R1bGU6c2Ftc2FtLmlkZW50aWNhbFxuICogQHBhcmFtIHsqfSBvYmoxIFRoZSBmaXJzdCB2YWx1ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0geyp9IG9iajIgVGhlIHNlY29uZCB2YWx1ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgb2JqZWN0cyBhcmUgKmVnYWwqLCBgZmFsc2VgIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBpZGVudGljYWwob2JqMSwgb2JqMikge1xuICAgIGlmIChvYmoxID09PSBvYmoyIHx8IChpc05hTihvYmoxKSAmJiBpc05hTihvYmoyKSkpIHtcbiAgICAgICAgcmV0dXJuIG9iajEgIT09IDAgfHwgaXNOZWdaZXJvKG9iajEpID09PSBpc05lZ1plcm8ob2JqMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aWNhbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2V0Q2xhc3MgPSByZXF1aXJlKFwiLi9nZXQtY2xhc3NcIik7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgd2hlbiBgb2JqZWN0YCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKlxuICogQGFsaWFzIG1vZHVsZTpzYW1zYW0uaXNBcmd1bWVudHNcbiAqIEBwYXJhbSAgeyp9ICBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGV4YW1pbmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgd2hlbiBgb2JqZWN0YCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gICAgcmV0dXJuIGdldENsYXNzKG9iamVjdCkgPT09IFwiQXJndW1lbnRzXCI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCB3aGVuIGB2YWx1ZWAgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gIHtEYXRlfSAgdmFsdWUgVGhlIHZhbHVlIHRvIGV4YW1pbmVcbiAqIEByZXR1cm5zIHtib29sZWFufSAgICAgYHRydWVgIHdoZW4gYHZhbHVlYCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNEYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkaXYgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCB3aGVuIGBvYmplY3RgIGlzIGEgRE9NIGVsZW1lbnQgbm9kZS5cbiAqXG4gKiBVbmxpa2UgVW5kZXJzY29yZS5qcy9sb2Rhc2gsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gYGZhbHNlYCBpZiBgb2JqZWN0YFxuICogaXMgYW4gKmVsZW1lbnQtbGlrZSogb2JqZWN0LCBpLmUuIGEgcmVndWxhciBvYmplY3Qgd2l0aCBhIGBub2RlVHlwZWBcbiAqIHByb3BlcnR5IHRoYXQgaG9sZHMgdGhlIHZhbHVlIGAxYC5cbiAqXG4gKiBAYWxpYXMgbW9kdWxlOnNhbXNhbS5pc0VsZW1lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBleGFtaW5lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgZm9yIERPTSBlbGVtZW50IG5vZGVzXG4gKi9cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmplY3QpIHtcbiAgICBpZiAoIW9iamVjdCB8fCBvYmplY3Qubm9kZVR5cGUgIT09IDEgfHwgIWRpdikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIG9iamVjdC5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICBvYmplY3QucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgd2hlbiBgdmFsdWVgIGlzIGEgTWFwXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBBIHZhbHVlIHRvIGV4YW1pbmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgd2hlbiBgdmFsdWVgIGlzIGFuIGluc3RhbmNlIG9mIGBNYXBgLCBgZmFsc2VgIG90aGVyd2lzZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNNYXAodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIE1hcCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSBpbnN0YW5jZW9mIE1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvbXBhcmVzIGEgYHZhbHVlYCB0byBgTmFOYFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIEEgdmFsdWUgdG8gZXhhbWluZVxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIHdoZW4gYHZhbHVlYCBpcyBgTmFOYFxuICovXG5mdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuICAgIC8vIFVubGlrZSBnbG9iYWwgYGlzTmFOYCwgdGhpcyBmdW5jdGlvbiBhdm9pZHMgdHlwZSBjb2VyY2lvblxuICAgIC8vIGB0eXBlb2ZgIGNoZWNrIGF2b2lkcyBJRSBob3N0IG9iamVjdCBpc3N1ZXMsIGhhdCB0aXAgdG9cbiAgICAvLyBsb2Rhc2hcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc05hTjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIHdoZW4gYHZhbHVlYCBpcyBgLTBgXG4gKlxuICogQGFsaWFzIG1vZHVsZTpzYW1zYW0uaXNOZWdaZXJvXG4gKiBAcGFyYW0geyp9IHZhbHVlIEEgdmFsdWUgdG8gZXhhbWluZVxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIHdoZW4gYHZhbHVlYCBpcyBgLTBgXG4gKi9cbmZ1bmN0aW9uIGlzTmVnWmVybyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPT09IC1JbmZpbml0eTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc05lZ1plcm87XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSB2YWx1ZSBpcyBhIHJlZ3VsYXIgT2JqZWN0IGFuZCBub3QgYSBzcGVjaWFsaXplZCBPYmplY3RcbiAqXG4gKiBUaGlzIGhlbHBzIHNwZWVkIHVwIGRlZXBFcXVhbCBjeWNsaWMgY2hlY2tzXG4gKlxuICogVGhlIHByZW1pc2UgaXMgdGhhdCBvbmx5IE9iamVjdHMgYXJlIHN0b3JlZCBpbiB0aGUgdmlzaXRlZCBhcnJheS5cbiAqIFNvIGlmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSwgd2UgZG9uJ3QgaGF2ZSB0byBkbyB0aGVcbiAqIGV4cGVuc2l2ZSBvcGVyYXRpb24gb2Ygc2VhcmNoaW5nIGZvciB0aGUgdmFsdWUgaW4gdGhlIHRoZSBhcnJheSBvZiBhbHJlYWR5XG4gKiB2aXNpdGVkIG9iamVjdHNcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICB7b2JqZWN0fSAgIHZhbHVlIFRoZSBvYmplY3QgdG8gZXhhbWluZVxuICogQHJldHVybnMge2Jvb2xlYW59ICAgICAgIGB0cnVlYCB3aGVuIHRoZSBvYmplY3QgaXMgYSBub24tc3BlY2lhbGlzZWQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIHZhbHVlICE9PSBudWxsICYmXG4gICAgICAgIC8vIG5vbmUgb2YgdGhlc2UgYXJlIGNvbGxlY3Rpb24gb2JqZWN0cywgc28gd2UgY2FuIHJldHVybiBmYWxzZVxuICAgICAgICAhKHZhbHVlIGluc3RhbmNlb2YgQm9vbGVhbikgJiZcbiAgICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpICYmXG4gICAgICAgICEodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikgJiZcbiAgICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcikgJiZcbiAgICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkgJiZcbiAgICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZylcbiAgICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgU2V0LCBgZmFsc2VgIG90aGVyd2lzZVxuICpcbiAqIEBhbGlhcyBtb2R1bGU6c2Ftc2FtLmlzU2V0XG4gKiBAcGFyYW0gIHsqfSAgdmFsIC0gQSB2YWx1ZSB0byBleGFtaW5lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgU2V0LCBgZmFsc2VgIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBpc1NldCh2YWwpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBTZXQgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsIGluc3RhbmNlb2YgU2V0KSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnByb3RvdHlwZXMuc2V0LmZvckVhY2g7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgd2hlbiBgczFgIGlzIGEgc3Vic2V0IG9mIGBzMmAsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSAge0FycmF5fFNldH0gIHMxICAgICAgVGhlIHRhcmdldCB2YWx1ZVxuICogQHBhcmFtICB7QXJyYXl8U2V0fSAgczIgICAgICBUaGUgY29udGFpbmluZyB2YWx1ZVxuICogQHBhcmFtICB7RnVuY3Rpb259ICBjb21wYXJlIEEgY29tcGFyaXNvbiBmdW5jdGlvbiwgc2hvdWxkIHJldHVybiBgdHJ1ZWAgd2hlblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyBhcmUgY29uc2lkZXJlZCBlcXVhbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIHdoZW4gYHMxYCBpcyBhIHN1YnNldCBvZiBgczJgLCBgZmFsc2VgYCBvdGhlcndpc2VcbiAqL1xuZnVuY3Rpb24gaXNTdWJzZXQoczEsIHMyLCBjb21wYXJlKSB7XG4gICAgdmFyIGFsbENvbnRhaW5lZCA9IHRydWU7XG4gICAgZm9yRWFjaChzMSwgZnVuY3Rpb24odjEpIHtcbiAgICAgICAgdmFyIGluY2x1ZGVzID0gZmFsc2U7XG4gICAgICAgIGZvckVhY2goczIsIGZ1bmN0aW9uKHYyKSB7XG4gICAgICAgICAgICBpZiAoY29tcGFyZSh2MiwgdjEpKSB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWxsQ29udGFpbmVkID0gYWxsQ29udGFpbmVkICYmIGluY2x1ZGVzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFsbENvbnRhaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N1YnNldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc2xpY2UgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5wcm90b3R5cGVzLnN0cmluZy5zbGljZTtcbnZhciB0eXBlT2YgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS50eXBlT2Y7XG52YXIgdmFsdWVUb1N0cmluZyA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLnZhbHVlVG9TdHJpbmc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0cmluZyByZXByZXNlbmF0aW9uIG9mIGFuIGl0ZXJhYmxlIG9iamVjdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7b2JqZWN0fSBvYmogVGhlIGl0ZXJhYmxlIG9iamVjdCB0byBzdHJpbmdpZnlcbiAqIEByZXR1cm5zIHtzdHJpbmd9ICAgICBBIHN0cmluZyByZXByZXNlbnRhdGlvblxuICovXG5mdW5jdGlvbiBpdGVyYWJsZVRvU3RyaW5nKG9iaikge1xuICAgIGlmICh0eXBlT2Yob2JqKSA9PT0gXCJtYXBcIikge1xuICAgICAgICByZXR1cm4gbWFwVG9TdHJpbmcob2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2VuZXJpY0l0ZXJhYmxlVG9TdHJpbmcob2JqKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgTWFwXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSAgIHtNYXB9IG1hcCAgICBUaGUgbWFwIHRvIHN0cmluZ2lmeVxuICogQHJldHVybnMge3N0cmluZ30gICAgIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gKi9cbmZ1bmN0aW9uIG1hcFRvU3RyaW5nKG1hcCkge1xuICAgIHZhciByZXByZXNlbnRhdGlvbiA9IFwiXCI7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbG9jYWwtcnVsZXMvbm8tcHJvdG90eXBlLW1ldGhvZHMgKi9cbiAgICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJlcHJlc2VudGF0aW9uICs9IFwiW1wiICsgc3RyaW5naWZ5KGtleSkgKyBcIixcIiArIHN0cmluZ2lmeSh2YWx1ZSkgKyBcIl0sXCI7XG4gICAgfSk7XG5cbiAgICByZXByZXNlbnRhdGlvbiA9IHNsaWNlKHJlcHJlc2VudGF0aW9uLCAwLCAtMSk7XG4gICAgcmV0dXJuIHJlcHJlc2VudGF0aW9uO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmluZyByZXByZXNlbmF0aW9uIGZvciBhbiBpdGVyYWJsZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7b2JqZWN0fSBpdGVyYWJsZSBUaGUgaXRlcmFibGUgdG8gc3RyaW5naWZ5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAgICAgICAgICBBIHN0cmluZyByZXByZXNlbnRhdGlvblxuICovXG5mdW5jdGlvbiBnZW5lcmljSXRlcmFibGVUb1N0cmluZyhpdGVyYWJsZSkge1xuICAgIHZhciByZXByZXNlbnRhdGlvbiA9IFwiXCI7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbG9jYWwtcnVsZXMvbm8tcHJvdG90eXBlLW1ldGhvZHMgKi9cbiAgICBpdGVyYWJsZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJlcHJlc2VudGF0aW9uICs9IHN0cmluZ2lmeSh2YWx1ZSkgKyBcIixcIjtcbiAgICB9KTtcblxuICAgIHJlcHJlc2VudGF0aW9uID0gc2xpY2UocmVwcmVzZW50YXRpb24sIDAsIC0xKTtcbiAgICByZXR1cm4gcmVwcmVzZW50YXRpb247XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIGBpdGVtYFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0gVGhlIGl0ZW0gdG8gc3RyaW5naWZ5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAgICAgIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGBpdGVtYFxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnkoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIiA/IFwiJ1wiICsgaXRlbSArIFwiJ1wiIDogdmFsdWVUb1N0cmluZyhpdGVtKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpdGVyYWJsZVRvU3RyaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB2YWx1ZVRvU3RyaW5nID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikudmFsdWVUb1N0cmluZztcbnZhciBpbmRleE9mID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5zdHJpbmcuaW5kZXhPZjtcbnZhciBmb3JFYWNoID0gcmVxdWlyZShcIkBzaW5vbmpzL2NvbW1vbnNcIikucHJvdG90eXBlcy5hcnJheS5mb3JFYWNoO1xuXG52YXIgZGVlcEVxdWFsID0gcmVxdWlyZShcIi4vZGVlcC1lcXVhbFwiKS51c2UobWF0Y2gpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG52YXIgZ2V0Q2xhc3MgPSByZXF1aXJlKFwiLi9nZXQtY2xhc3NcIik7XG52YXIgaXNEYXRlID0gcmVxdWlyZShcIi4vaXMtZGF0ZVwiKTtcbnZhciBpc1NldCA9IHJlcXVpcmUoXCIuL2lzLXNldFwiKTtcbnZhciBpc1N1YnNldCA9IHJlcXVpcmUoXCIuL2lzLXN1YnNldFwiKTtcbnZhciBjcmVhdGVNYXRjaGVyID0gcmVxdWlyZShcIi4vY3JlYXRlLW1hdGNoZXJcIik7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIHdoZW4gYGFycmF5YCBjb250YWlucyBhbGwgb2YgYHN1YnNldGAgYXMgZGVmaW5lZCBieSB0aGUgYGNvbXBhcmVgXG4gKiBhcmd1bWVudFxuICpcbiAqIEBwYXJhbSAge0FycmF5fSBhcnJheSAgIEFuIGFycmF5IHRvIHNlYXJjaCBmb3IgYSBzdWJzZXRcbiAqIEBwYXJhbSAge0FycmF5fSBzdWJzZXQgIFRoZSBzdWJzZXQgdG8gZmluZCBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjb21wYXJlIEEgY29tcGFyaXNvbiBmdW5jdGlvblxuICogQHJldHVybnMge2Jvb2xlYW59ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYXJyYXlDb250YWlucyhhcnJheSwgc3Vic2V0LCBjb21wYXJlKSB7XG4gICAgaWYgKHN1YnNldC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHZhciBpLCBsLCBqLCBrO1xuICAgIGZvciAoaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgaWYgKGNvbXBhcmUoYXJyYXlbaV0sIHN1YnNldFswXSkpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IDAsIGsgPSBzdWJzZXQubGVuZ3RoOyBqIDwgazsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgKyBqID49IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmUoYXJyYXlbaSArIGpdLCBzdWJzZXRbal0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbi8qKlxuICogTWF0Y2hlcyBhbiBvYmplY3Qgd2l0aCBhIG1hdGNoZXIgKG9yIHZhbHVlKVxuICpcbiAqIEBhbGlhcyBtb2R1bGU6c2Ftc2FtLm1hdGNoXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgY2FuZGlkYXRlIHRvIG1hdGNoXG4gKiBAcGFyYW0ge29iamVjdH0gbWF0Y2hlck9yVmFsdWUgQSBtYXRjaGVyIG9yIHZhbHVlIHRvIG1hdGNoIGFnYWluc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIHdoZW4gYG9iamVjdGAgbWF0Y2hlcyBgbWF0Y2hlck9yVmFsdWVgXG4gKi9cbmZ1bmN0aW9uIG1hdGNoKG9iamVjdCwgbWF0Y2hlck9yVmFsdWUpIHtcbiAgICBpZiAobWF0Y2hlck9yVmFsdWUgJiYgdHlwZW9mIG1hdGNoZXJPclZhbHVlLnRlc3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlck9yVmFsdWUudGVzdChvYmplY3QpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWF0Y2hlck9yVmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlck9yVmFsdWUob2JqZWN0KSA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG1hdGNoZXJPclZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHZhciBub3ROdWxsID0gdHlwZW9mIG9iamVjdCA9PT0gXCJzdHJpbmdcIiB8fCBCb29sZWFuKG9iamVjdCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBub3ROdWxsICYmXG4gICAgICAgICAgICBpbmRleE9mKFxuICAgICAgICAgICAgICAgIHZhbHVlVG9TdHJpbmcob2JqZWN0KS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIG1hdGNoZXJPclZhbHVlLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICkgPj0gMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWF0Y2hlck9yVmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXJPclZhbHVlID09PSBvYmplY3Q7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtYXRjaGVyT3JWYWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXJPclZhbHVlID09PSBvYmplY3Q7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtYXRjaGVyT3JWYWx1ZSA9PT0gXCJiaWdpbnRcIikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlck9yVmFsdWUgPT09IG9iamVjdDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG1hdGNoZXJPclZhbHVlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSBcInVuZGVmaW5lZFwiO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWF0Y2hlck9yVmFsdWUgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXJPclZhbHVlID09PSBvYmplY3Q7XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoZXJPclZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPT09IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzU2V0KG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGlzU3Vic2V0KG1hdGNoZXJPclZhbHVlLCBvYmplY3QsIG1hdGNoKTtcbiAgICB9XG5cbiAgICBpZiAoZ2V0Q2xhc3Mob2JqZWN0KSA9PT0gXCJBcnJheVwiICYmIGdldENsYXNzKG1hdGNoZXJPclZhbHVlKSA9PT0gXCJBcnJheVwiKSB7XG4gICAgICAgIHJldHVybiBhcnJheUNvbnRhaW5zKG9iamVjdCwgbWF0Y2hlck9yVmFsdWUsIG1hdGNoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEYXRlKG1hdGNoZXJPclZhbHVlKSkge1xuICAgICAgICByZXR1cm4gaXNEYXRlKG9iamVjdCkgJiYgb2JqZWN0LmdldFRpbWUoKSA9PT0gbWF0Y2hlck9yVmFsdWUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIGlmIChtYXRjaGVyT3JWYWx1ZSAmJiB0eXBlb2YgbWF0Y2hlck9yVmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKG1hdGNoZXJPclZhbHVlID09PSBvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3A7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBndWFyZC1mb3ItaW5cbiAgICAgICAgZm9yIChwcm9wIGluIG1hdGNoZXJPclZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3RbcHJvcF07XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIG9iamVjdC5nZXRBdHRyaWJ1dGUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvYmplY3QuZ2V0QXR0cmlidXRlKHByb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG1hdGNoZXJPclZhbHVlW3Byb3BdID09PSBudWxsIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIG1hdGNoZXJPclZhbHVlW3Byb3BdID09PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG1hdGNoZXJPclZhbHVlW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiB8fFxuICAgICAgICAgICAgICAgICFkZWVwRXF1YWwodmFsdWUsIG1hdGNoZXJPclZhbHVlW3Byb3BdKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWF0Y2hlciB3YXMgYW4gdW5rbm93biBvciB1bnN1cHBvcnRlZCB0eXBlXCIpO1xufVxuLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbmZvckVhY2goT2JqZWN0LmtleXMoY3JlYXRlTWF0Y2hlciksIGZ1bmN0aW9uKGtleSkge1xuICAgIG1hdGNoW2tleV0gPSBjcmVhdGVNYXRjaGVyW2tleV07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEBtb2R1bGUgc2Ftc2FtXG4gKi9cbnZhciBpZGVudGljYWwgPSByZXF1aXJlKFwiLi9pZGVudGljYWxcIik7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKFwiLi9pcy1hcmd1bWVudHNcIik7XG52YXIgaXNFbGVtZW50ID0gcmVxdWlyZShcIi4vaXMtZWxlbWVudFwiKTtcbnZhciBpc05lZ1plcm8gPSByZXF1aXJlKFwiLi9pcy1uZWctemVyb1wiKTtcbnZhciBpc1NldCA9IHJlcXVpcmUoXCIuL2lzLXNldFwiKTtcbnZhciBpc01hcCA9IHJlcXVpcmUoXCIuL2lzLW1hcFwiKTtcbnZhciBtYXRjaCA9IHJlcXVpcmUoXCIuL21hdGNoXCIpO1xudmFyIGRlZXBFcXVhbEN5Y2xpYyA9IHJlcXVpcmUoXCIuL2RlZXAtZXF1YWxcIikudXNlKG1hdGNoKTtcbnZhciBjcmVhdGVNYXRjaGVyID0gcmVxdWlyZShcIi4vY3JlYXRlLW1hdGNoZXJcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZU1hdGNoZXI6IGNyZWF0ZU1hdGNoZXIsXG4gICAgZGVlcEVxdWFsOiBkZWVwRXF1YWxDeWNsaWMsXG4gICAgaWRlbnRpY2FsOiBpZGVudGljYWwsXG4gICAgaXNBcmd1bWVudHM6IGlzQXJndW1lbnRzLFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzTWFwOiBpc01hcCxcbiAgICBpc05lZ1plcm86IGlzTmVnWmVybyxcbiAgICBpc1NldDogaXNTZXQsXG4gICAgbWF0Y2g6IG1hdGNoXG59O1xuIiwiIiwiLyohXG5cbiBkaWZmIHY0LjAuMVxuXG5Tb2Z0d2FyZSBMaWNlbnNlIEFncmVlbWVudCAoQlNEIExpY2Vuc2UpXG5cbkNvcHlyaWdodCAoYykgMjAwOS0yMDE1LCBLZXZpbiBEZWNrZXIgPGtwZGVja2VyQGdtYWlsLmNvbT5cblxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBvZiB0aGlzIHNvZnR3YXJlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4qIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmVcbiAgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZVxuICBmb2xsb3dpbmcgZGlzY2xhaW1lci5cblxuKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlXG4gIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGVcbiAgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyXG4gIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cbiogTmVpdGhlciB0aGUgbmFtZSBvZiBLZXZpbiBEZWNrZXIgbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yXG4gIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SXG5JTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkRcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SXG5DT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMXG5EQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsXG5EQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUlxuSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVFxuT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuQGxpY2Vuc2VcbiovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZmFjdG9yeShnbG9iYWwuRGlmZiA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBEaWZmKCkge31cbiAgRGlmZi5wcm90b3R5cGUgPSB7XG4gICAgZGlmZjogZnVuY3Rpb24gZGlmZihvbGRTdHJpbmcsIG5ld1N0cmluZykge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBkb25lKHZhbHVlKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCB2YWx1ZSk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IC8vIEFsbG93IHN1YmNsYXNzZXMgdG8gbWFzc2FnZSB0aGUgaW5wdXQgcHJpb3IgdG8gcnVubmluZ1xuXG5cbiAgICAgIG9sZFN0cmluZyA9IHRoaXMuY2FzdElucHV0KG9sZFN0cmluZyk7XG4gICAgICBuZXdTdHJpbmcgPSB0aGlzLmNhc3RJbnB1dChuZXdTdHJpbmcpO1xuICAgICAgb2xkU3RyaW5nID0gdGhpcy5yZW1vdmVFbXB0eSh0aGlzLnRva2VuaXplKG9sZFN0cmluZykpO1xuICAgICAgbmV3U3RyaW5nID0gdGhpcy5yZW1vdmVFbXB0eSh0aGlzLnRva2VuaXplKG5ld1N0cmluZykpO1xuICAgICAgdmFyIG5ld0xlbiA9IG5ld1N0cmluZy5sZW5ndGgsXG4gICAgICAgICAgb2xkTGVuID0gb2xkU3RyaW5nLmxlbmd0aDtcbiAgICAgIHZhciBlZGl0TGVuZ3RoID0gMTtcbiAgICAgIHZhciBtYXhFZGl0TGVuZ3RoID0gbmV3TGVuICsgb2xkTGVuO1xuICAgICAgdmFyIGJlc3RQYXRoID0gW3tcbiAgICAgICAgbmV3UG9zOiAtMSxcbiAgICAgICAgY29tcG9uZW50czogW11cbiAgICAgIH1dOyAvLyBTZWVkIGVkaXRMZW5ndGggPSAwLCBpLmUuIHRoZSBjb250ZW50IHN0YXJ0cyB3aXRoIHRoZSBzYW1lIHZhbHVlc1xuXG4gICAgICB2YXIgb2xkUG9zID0gdGhpcy5leHRyYWN0Q29tbW9uKGJlc3RQYXRoWzBdLCBuZXdTdHJpbmcsIG9sZFN0cmluZywgMCk7XG5cbiAgICAgIGlmIChiZXN0UGF0aFswXS5uZXdQb3MgKyAxID49IG5ld0xlbiAmJiBvbGRQb3MgKyAxID49IG9sZExlbikge1xuICAgICAgICAvLyBJZGVudGl0eSBwZXIgdGhlIGVxdWFsaXR5IGFuZCB0b2tlbml6ZXJcbiAgICAgICAgcmV0dXJuIGRvbmUoW3tcbiAgICAgICAgICB2YWx1ZTogdGhpcy5qb2luKG5ld1N0cmluZyksXG4gICAgICAgICAgY291bnQ6IG5ld1N0cmluZy5sZW5ndGhcbiAgICAgICAgfV0pO1xuICAgICAgfSAvLyBNYWluIHdvcmtlciBtZXRob2QuIGNoZWNrcyBhbGwgcGVybXV0YXRpb25zIG9mIGEgZ2l2ZW4gZWRpdCBsZW5ndGggZm9yIGFjY2VwdGFuY2UuXG5cblxuICAgICAgZnVuY3Rpb24gZXhlY0VkaXRMZW5ndGgoKSB7XG4gICAgICAgIGZvciAodmFyIGRpYWdvbmFsUGF0aCA9IC0xICogZWRpdExlbmd0aDsgZGlhZ29uYWxQYXRoIDw9IGVkaXRMZW5ndGg7IGRpYWdvbmFsUGF0aCArPSAyKSB7XG4gICAgICAgICAgdmFyIGJhc2VQYXRoID0gdm9pZCAwO1xuXG4gICAgICAgICAgdmFyIGFkZFBhdGggPSBiZXN0UGF0aFtkaWFnb25hbFBhdGggLSAxXSxcbiAgICAgICAgICAgICAgcmVtb3ZlUGF0aCA9IGJlc3RQYXRoW2RpYWdvbmFsUGF0aCArIDFdLFxuICAgICAgICAgICAgICBfb2xkUG9zID0gKHJlbW92ZVBhdGggPyByZW1vdmVQYXRoLm5ld1BvcyA6IDApIC0gZGlhZ29uYWxQYXRoO1xuXG4gICAgICAgICAgaWYgKGFkZFBhdGgpIHtcbiAgICAgICAgICAgIC8vIE5vIG9uZSBlbHNlIGlzIGdvaW5nIHRvIGF0dGVtcHQgdG8gdXNlIHRoaXMgdmFsdWUsIGNsZWFyIGl0XG4gICAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGggLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgY2FuQWRkID0gYWRkUGF0aCAmJiBhZGRQYXRoLm5ld1BvcyArIDEgPCBuZXdMZW4sXG4gICAgICAgICAgICAgIGNhblJlbW92ZSA9IHJlbW92ZVBhdGggJiYgMCA8PSBfb2xkUG9zICYmIF9vbGRQb3MgPCBvbGRMZW47XG5cbiAgICAgICAgICBpZiAoIWNhbkFkZCAmJiAhY2FuUmVtb3ZlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIHBhdGggaXMgYSB0ZXJtaW5hbCB0aGVuIHBydW5lXG4gICAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGhdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSAvLyBTZWxlY3QgdGhlIGRpYWdvbmFsIHRoYXQgd2Ugd2FudCB0byBicmFuY2ggZnJvbS4gV2Ugc2VsZWN0IHRoZSBwcmlvclxuICAgICAgICAgIC8vIHBhdGggd2hvc2UgcG9zaXRpb24gaW4gdGhlIG5ldyBzdHJpbmcgaXMgdGhlIGZhcnRoZXN0IGZyb20gdGhlIG9yaWdpblxuICAgICAgICAgIC8vIGFuZCBkb2VzIG5vdCBwYXNzIHRoZSBib3VuZHMgb2YgdGhlIGRpZmYgZ3JhcGhcblxuXG4gICAgICAgICAgaWYgKCFjYW5BZGQgfHwgY2FuUmVtb3ZlICYmIGFkZFBhdGgubmV3UG9zIDwgcmVtb3ZlUGF0aC5uZXdQb3MpIHtcbiAgICAgICAgICAgIGJhc2VQYXRoID0gY2xvbmVQYXRoKHJlbW92ZVBhdGgpO1xuICAgICAgICAgICAgc2VsZi5wdXNoQ29tcG9uZW50KGJhc2VQYXRoLmNvbXBvbmVudHMsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhc2VQYXRoID0gYWRkUGF0aDsgLy8gTm8gbmVlZCB0byBjbG9uZSwgd2UndmUgcHVsbGVkIGl0IGZyb20gdGhlIGxpc3RcblxuICAgICAgICAgICAgYmFzZVBhdGgubmV3UG9zKys7XG4gICAgICAgICAgICBzZWxmLnB1c2hDb21wb25lbnQoYmFzZVBhdGguY29tcG9uZW50cywgdHJ1ZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfb2xkUG9zID0gc2VsZi5leHRyYWN0Q29tbW9uKGJhc2VQYXRoLCBuZXdTdHJpbmcsIG9sZFN0cmluZywgZGlhZ29uYWxQYXRoKTsgLy8gSWYgd2UgaGF2ZSBoaXQgdGhlIGVuZCBvZiBib3RoIHN0cmluZ3MsIHRoZW4gd2UgYXJlIGRvbmVcblxuICAgICAgICAgIGlmIChiYXNlUGF0aC5uZXdQb3MgKyAxID49IG5ld0xlbiAmJiBfb2xkUG9zICsgMSA+PSBvbGRMZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBkb25lKGJ1aWxkVmFsdWVzKHNlbGYsIGJhc2VQYXRoLmNvbXBvbmVudHMsIG5ld1N0cmluZywgb2xkU3RyaW5nLCBzZWxmLnVzZUxvbmdlc3RUb2tlbikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgdHJhY2sgdGhpcyBwYXRoIGFzIGEgcG90ZW50aWFsIGNhbmRpZGF0ZSBhbmQgY29udGludWUuXG4gICAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGhdID0gYmFzZVBhdGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWRpdExlbmd0aCsrO1xuICAgICAgfSAvLyBQZXJmb3JtcyB0aGUgbGVuZ3RoIG9mIGVkaXQgaXRlcmF0aW9uLiBJcyBhIGJpdCBmdWdseSBhcyB0aGlzIGhhcyB0byBzdXBwb3J0IHRoZVxuICAgICAgLy8gc3luYyBhbmQgYXN5bmMgbW9kZSB3aGljaCBpcyBuZXZlciBmdW4uIExvb3BzIG92ZXIgZXhlY0VkaXRMZW5ndGggdW50aWwgYSB2YWx1ZVxuICAgICAgLy8gaXMgcHJvZHVjZWQuXG5cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIChmdW5jdGlvbiBleGVjKCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gVGhpcyBzaG91bGQgbm90IGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8gYmUgc2FmZS5cblxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIGlmIChlZGl0TGVuZ3RoID4gbWF4RWRpdExlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGVjRWRpdExlbmd0aCgpKSB7XG4gICAgICAgICAgICAgIGV4ZWMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChlZGl0TGVuZ3RoIDw9IG1heEVkaXRMZW5ndGgpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gZXhlY0VkaXRMZW5ndGgoKTtcblxuICAgICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwdXNoQ29tcG9uZW50OiBmdW5jdGlvbiBwdXNoQ29tcG9uZW50KGNvbXBvbmVudHMsIGFkZGVkLCByZW1vdmVkKSB7XG4gICAgICB2YXIgbGFzdCA9IGNvbXBvbmVudHNbY29tcG9uZW50cy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKGxhc3QgJiYgbGFzdC5hZGRlZCA9PT0gYWRkZWQgJiYgbGFzdC5yZW1vdmVkID09PSByZW1vdmVkKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gY2xvbmUgaGVyZSBhcyB0aGUgY29tcG9uZW50IGNsb25lIG9wZXJhdGlvbiBpcyBqdXN0XG4gICAgICAgIC8vIGFzIHNoYWxsb3cgYXJyYXkgY2xvbmVcbiAgICAgICAgY29tcG9uZW50c1tjb21wb25lbnRzLmxlbmd0aCAtIDFdID0ge1xuICAgICAgICAgIGNvdW50OiBsYXN0LmNvdW50ICsgMSxcbiAgICAgICAgICBhZGRlZDogYWRkZWQsXG4gICAgICAgICAgcmVtb3ZlZDogcmVtb3ZlZFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICBhZGRlZDogYWRkZWQsXG4gICAgICAgICAgcmVtb3ZlZDogcmVtb3ZlZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4dHJhY3RDb21tb246IGZ1bmN0aW9uIGV4dHJhY3RDb21tb24oYmFzZVBhdGgsIG5ld1N0cmluZywgb2xkU3RyaW5nLCBkaWFnb25hbFBhdGgpIHtcbiAgICAgIHZhciBuZXdMZW4gPSBuZXdTdHJpbmcubGVuZ3RoLFxuICAgICAgICAgIG9sZExlbiA9IG9sZFN0cmluZy5sZW5ndGgsXG4gICAgICAgICAgbmV3UG9zID0gYmFzZVBhdGgubmV3UG9zLFxuICAgICAgICAgIG9sZFBvcyA9IG5ld1BvcyAtIGRpYWdvbmFsUGF0aCxcbiAgICAgICAgICBjb21tb25Db3VudCA9IDA7XG5cbiAgICAgIHdoaWxlIChuZXdQb3MgKyAxIDwgbmV3TGVuICYmIG9sZFBvcyArIDEgPCBvbGRMZW4gJiYgdGhpcy5lcXVhbHMobmV3U3RyaW5nW25ld1BvcyArIDFdLCBvbGRTdHJpbmdbb2xkUG9zICsgMV0pKSB7XG4gICAgICAgIG5ld1BvcysrO1xuICAgICAgICBvbGRQb3MrKztcbiAgICAgICAgY29tbW9uQ291bnQrKztcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbW1vbkNvdW50KSB7XG4gICAgICAgIGJhc2VQYXRoLmNvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgY291bnQ6IGNvbW1vbkNvdW50XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBiYXNlUGF0aC5uZXdQb3MgPSBuZXdQb3M7XG4gICAgICByZXR1cm4gb2xkUG9zO1xuICAgIH0sXG4gICAgZXF1YWxzOiBmdW5jdGlvbiBlcXVhbHMobGVmdCwgcmlnaHQpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcGFyYXRvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNvbXBhcmF0b3IobGVmdCwgcmlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxlZnQgPT09IHJpZ2h0IHx8IHRoaXMub3B0aW9ucy5pZ25vcmVDYXNlICYmIGxlZnQudG9Mb3dlckNhc2UoKSA9PT0gcmlnaHQudG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUVtcHR5OiBmdW5jdGlvbiByZW1vdmVFbXB0eShhcnJheSkge1xuICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheVtpXSkge1xuICAgICAgICAgIHJldC5wdXNoKGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG4gICAgY2FzdElucHV0OiBmdW5jdGlvbiBjYXN0SW5wdXQodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHRva2VuaXplOiBmdW5jdGlvbiB0b2tlbml6ZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcnKTtcbiAgICB9LFxuICAgIGpvaW46IGZ1bmN0aW9uIGpvaW4oY2hhcnMpIHtcbiAgICAgIHJldHVybiBjaGFycy5qb2luKCcnKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYnVpbGRWYWx1ZXMoZGlmZiwgY29tcG9uZW50cywgbmV3U3RyaW5nLCBvbGRTdHJpbmcsIHVzZUxvbmdlc3RUb2tlbikge1xuICAgIHZhciBjb21wb25lbnRQb3MgPSAwLFxuICAgICAgICBjb21wb25lbnRMZW4gPSBjb21wb25lbnRzLmxlbmd0aCxcbiAgICAgICAgbmV3UG9zID0gMCxcbiAgICAgICAgb2xkUG9zID0gMDtcblxuICAgIGZvciAoOyBjb21wb25lbnRQb3MgPCBjb21wb25lbnRMZW47IGNvbXBvbmVudFBvcysrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gY29tcG9uZW50c1tjb21wb25lbnRQb3NdO1xuXG4gICAgICBpZiAoIWNvbXBvbmVudC5yZW1vdmVkKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50LmFkZGVkICYmIHVzZUxvbmdlc3RUb2tlbikge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IG5ld1N0cmluZy5zbGljZShuZXdQb3MsIG5ld1BvcyArIGNvbXBvbmVudC5jb3VudCk7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG4gICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSBvbGRTdHJpbmdbb2xkUG9zICsgaV07XG4gICAgICAgICAgICByZXR1cm4gb2xkVmFsdWUubGVuZ3RoID4gdmFsdWUubGVuZ3RoID8gb2xkVmFsdWUgOiB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb21wb25lbnQudmFsdWUgPSBkaWZmLmpvaW4odmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBvbmVudC52YWx1ZSA9IGRpZmYuam9pbihuZXdTdHJpbmcuc2xpY2UobmV3UG9zLCBuZXdQb3MgKyBjb21wb25lbnQuY291bnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld1BvcyArPSBjb21wb25lbnQuY291bnQ7IC8vIENvbW1vbiBjYXNlXG5cbiAgICAgICAgaWYgKCFjb21wb25lbnQuYWRkZWQpIHtcbiAgICAgICAgICBvbGRQb3MgKz0gY29tcG9uZW50LmNvdW50O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnQudmFsdWUgPSBkaWZmLmpvaW4ob2xkU3RyaW5nLnNsaWNlKG9sZFBvcywgb2xkUG9zICsgY29tcG9uZW50LmNvdW50KSk7XG4gICAgICAgIG9sZFBvcyArPSBjb21wb25lbnQuY291bnQ7IC8vIFJldmVyc2UgYWRkIGFuZCByZW1vdmUgc28gcmVtb3ZlcyBhcmUgb3V0cHV0IGZpcnN0IHRvIG1hdGNoIGNvbW1vbiBjb252ZW50aW9uXG4gICAgICAgIC8vIFRoZSBkaWZmaW5nIGFsZ29yaXRobSBpcyB0aWVkIHRvIGFkZCB0aGVuIHJlbW92ZSBvdXRwdXQgYW5kIHRoaXMgaXMgdGhlIHNpbXBsZXN0XG4gICAgICAgIC8vIHJvdXRlIHRvIGdldCB0aGUgZGVzaXJlZCBvdXRwdXQgd2l0aCBtaW5pbWFsIG92ZXJoZWFkLlxuXG4gICAgICAgIGlmIChjb21wb25lbnRQb3MgJiYgY29tcG9uZW50c1tjb21wb25lbnRQb3MgLSAxXS5hZGRlZCkge1xuICAgICAgICAgIHZhciB0bXAgPSBjb21wb25lbnRzW2NvbXBvbmVudFBvcyAtIDFdO1xuICAgICAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50UG9zIC0gMV0gPSBjb21wb25lbnRzW2NvbXBvbmVudFBvc107XG4gICAgICAgICAgY29tcG9uZW50c1tjb21wb25lbnRQb3NdID0gdG1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBTcGVjaWFsIGNhc2UgaGFuZGxlIGZvciB3aGVuIG9uZSB0ZXJtaW5hbCBpcyBpZ25vcmVkIChpLmUuIHdoaXRlc3BhY2UpLlxuICAgIC8vIEZvciB0aGlzIGNhc2Ugd2UgbWVyZ2UgdGhlIHRlcm1pbmFsIGludG8gdGhlIHByaW9yIHN0cmluZyBhbmQgZHJvcCB0aGUgY2hhbmdlLlxuICAgIC8vIFRoaXMgaXMgb25seSBhdmFpbGFibGUgZm9yIHN0cmluZyBtb2RlLlxuXG5cbiAgICB2YXIgbGFzdENvbXBvbmVudCA9IGNvbXBvbmVudHNbY29tcG9uZW50TGVuIC0gMV07XG5cbiAgICBpZiAoY29tcG9uZW50TGVuID4gMSAmJiB0eXBlb2YgbGFzdENvbXBvbmVudC52YWx1ZSA9PT0gJ3N0cmluZycgJiYgKGxhc3RDb21wb25lbnQuYWRkZWQgfHwgbGFzdENvbXBvbmVudC5yZW1vdmVkKSAmJiBkaWZmLmVxdWFscygnJywgbGFzdENvbXBvbmVudC52YWx1ZSkpIHtcbiAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50TGVuIC0gMl0udmFsdWUgKz0gbGFzdENvbXBvbmVudC52YWx1ZTtcbiAgICAgIGNvbXBvbmVudHMucG9wKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZVBhdGgocGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBuZXdQb3M6IHBhdGgubmV3UG9zLFxuICAgICAgY29tcG9uZW50czogcGF0aC5jb21wb25lbnRzLnNsaWNlKDApXG4gICAgfTtcbiAgfVxuXG4gIHZhciBjaGFyYWN0ZXJEaWZmID0gbmV3IERpZmYoKTtcbiAgZnVuY3Rpb24gZGlmZkNoYXJzKG9sZFN0ciwgbmV3U3RyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGNoYXJhY3RlckRpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZU9wdGlvbnMob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRlZmF1bHRzLmNhbGxiYWNrID0gb3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gb3B0aW9ucykge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIGRlZmF1bHRzW25hbWVdID0gb3B0aW9uc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0cztcbiAgfVxuXG4gIC8vXG4gIC8vIFJhbmdlcyBhbmQgZXhjZXB0aW9uczpcbiAgLy8gTGF0aW4tMSBTdXBwbGVtZW50LCAwMDgw4oCTMDBGRlxuICAvLyAgLSBVKzAwRDcgIMOXIE11bHRpcGxpY2F0aW9uIHNpZ25cbiAgLy8gIC0gVSswMEY3ICDDtyBEaXZpc2lvbiBzaWduXG4gIC8vIExhdGluIEV4dGVuZGVkLUEsIDAxMDDigJMwMTdGXG4gIC8vIExhdGluIEV4dGVuZGVkLUIsIDAxODDigJMwMjRGXG4gIC8vIElQQSBFeHRlbnNpb25zLCAwMjUw4oCTMDJBRlxuICAvLyBTcGFjaW5nIE1vZGlmaWVyIExldHRlcnMsIDAyQjDigJMwMkZGXG4gIC8vICAtIFUrMDJDNyAgy4cgJiM3MTE7ICBDYXJvblxuICAvLyAgLSBVKzAyRDggIMuYICYjNzI4OyAgQnJldmVcbiAgLy8gIC0gVSswMkQ5ICDLmSAmIzcyOTsgIERvdCBBYm92ZVxuICAvLyAgLSBVKzAyREEgIMuaICYjNzMwOyAgUmluZyBBYm92ZVxuICAvLyAgLSBVKzAyREIgIMubICYjNzMxOyAgT2dvbmVrXG4gIC8vICAtIFUrMDJEQyAgy5wgJiM3MzI7ICBTbWFsbCBUaWxkZVxuICAvLyAgLSBVKzAyREQgIMudICYjNzMzOyAgRG91YmxlIEFjdXRlIEFjY2VudFxuICAvLyBMYXRpbiBFeHRlbmRlZCBBZGRpdGlvbmFsLCAxRTAw4oCTMUVGRlxuXG4gIHZhciBleHRlbmRlZFdvcmRDaGFycyA9IC9eW0EtWmEtelxceEMwLVxcdTAyQzZcXHUwMkM4LVxcdTAyRDdcXHUwMkRFLVxcdTAyRkZcXHUxRTAwLVxcdTFFRkZdKyQvO1xuICB2YXIgcmVXaGl0ZXNwYWNlID0gL1xcUy87XG4gIHZhciB3b3JkRGlmZiA9IG5ldyBEaWZmKCk7XG5cbiAgd29yZERpZmYuZXF1YWxzID0gZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pZ25vcmVDYXNlKSB7XG4gICAgICBsZWZ0ID0gbGVmdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmlnaHQgPSByaWdodC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBsZWZ0ID09PSByaWdodCB8fCB0aGlzLm9wdGlvbnMuaWdub3JlV2hpdGVzcGFjZSAmJiAhcmVXaGl0ZXNwYWNlLnRlc3QobGVmdCkgJiYgIXJlV2hpdGVzcGFjZS50ZXN0KHJpZ2h0KTtcbiAgfTtcblxuICB3b3JkRGlmZi50b2tlbml6ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciB0b2tlbnMgPSB2YWx1ZS5zcGxpdCgvKFxccyt8WygpW1xcXXt9J1wiXXxcXGIpLyk7IC8vIEpvaW4gdGhlIGJvdW5kYXJ5IHNwbGl0cyB0aGF0IHdlIGRvIG5vdCBjb25zaWRlciB0byBiZSBib3VuZGFyaWVzLiBUaGlzIGlzIHByaW1hcmlseSB0aGUgZXh0ZW5kZWQgTGF0aW4gY2hhcmFjdGVyIHNldC5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgLy8gSWYgd2UgaGF2ZSBhbiBlbXB0eSBzdHJpbmcgaW4gdGhlIG5leHQgZmllbGQgYW5kIHdlIGhhdmUgb25seSB3b3JkIGNoYXJzIGJlZm9yZSBhbmQgYWZ0ZXIsIG1lcmdlXG4gICAgICBpZiAoIXRva2Vuc1tpICsgMV0gJiYgdG9rZW5zW2kgKyAyXSAmJiBleHRlbmRlZFdvcmRDaGFycy50ZXN0KHRva2Vuc1tpXSkgJiYgZXh0ZW5kZWRXb3JkQ2hhcnMudGVzdCh0b2tlbnNbaSArIDJdKSkge1xuICAgICAgICB0b2tlbnNbaV0gKz0gdG9rZW5zW2kgKyAyXTtcbiAgICAgICAgdG9rZW5zLnNwbGljZShpICsgMSwgMik7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRpZmZXb3JkcyhvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBnZW5lcmF0ZU9wdGlvbnMob3B0aW9ucywge1xuICAgICAgaWdub3JlV2hpdGVzcGFjZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiB3b3JkRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBvcHRpb25zKTtcbiAgfVxuICBmdW5jdGlvbiBkaWZmV29yZHNXaXRoU3BhY2Uob2xkU3RyLCBuZXdTdHIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gd29yZERpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG4gIH1cblxuICB2YXIgbGluZURpZmYgPSBuZXcgRGlmZigpO1xuXG4gIGxpbmVEaWZmLnRva2VuaXplID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHJldExpbmVzID0gW10sXG4gICAgICAgIGxpbmVzQW5kTmV3bGluZXMgPSB2YWx1ZS5zcGxpdCgvKFxcbnxcXHJcXG4pLyk7IC8vIElnbm9yZSB0aGUgZmluYWwgZW1wdHkgdG9rZW4gdGhhdCBvY2N1cnMgaWYgdGhlIHN0cmluZyBlbmRzIHdpdGggYSBuZXcgbGluZVxuXG4gICAgaWYgKCFsaW5lc0FuZE5ld2xpbmVzW2xpbmVzQW5kTmV3bGluZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIGxpbmVzQW5kTmV3bGluZXMucG9wKCk7XG4gICAgfSAvLyBNZXJnZSB0aGUgY29udGVudCBhbmQgbGluZSBzZXBhcmF0b3JzIGludG8gc2luZ2xlIHRva2Vuc1xuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzQW5kTmV3bGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaW5lID0gbGluZXNBbmROZXdsaW5lc1tpXTtcblxuICAgICAgaWYgKGkgJSAyICYmICF0aGlzLm9wdGlvbnMubmV3bGluZUlzVG9rZW4pIHtcbiAgICAgICAgcmV0TGluZXNbcmV0TGluZXMubGVuZ3RoIC0gMV0gKz0gbGluZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaWdub3JlV2hpdGVzcGFjZSkge1xuICAgICAgICAgIGxpbmUgPSBsaW5lLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldExpbmVzLnB1c2gobGluZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldExpbmVzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRpZmZMaW5lcyhvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gbGluZURpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spO1xuICB9XG4gIGZ1bmN0aW9uIGRpZmZUcmltbWVkTGluZXMob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBnZW5lcmF0ZU9wdGlvbnMoY2FsbGJhY2ssIHtcbiAgICAgIGlnbm9yZVdoaXRlc3BhY2U6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gbGluZURpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG4gIH1cblxuICB2YXIgc2VudGVuY2VEaWZmID0gbmV3IERpZmYoKTtcblxuICBzZW50ZW5jZURpZmYudG9rZW5pemUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoLyhcXFMuKz9bLiE/XSkoPz1cXHMrfCQpLyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gZGlmZlNlbnRlbmNlcyhvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gc2VudGVuY2VEaWZmLmRpZmYob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBjc3NEaWZmID0gbmV3IERpZmYoKTtcblxuICBjc3NEaWZmLnRva2VuaXplID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KC8oW3t9OjssXXxcXHMrKS8pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRpZmZDc3Mob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGNzc0RpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBfdHlwZW9mKG9iaik7XG4gIH1cblxuICBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gICAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICAgICAgcmV0dXJuIGFycjI7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gICAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gIH1cblxuICB2YXIgb2JqZWN0UHJvdG90eXBlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIganNvbkRpZmYgPSBuZXcgRGlmZigpOyAvLyBEaXNjcmltaW5hdGUgYmV0d2VlbiB0d28gbGluZXMgb2YgcHJldHR5LXByaW50ZWQsIHNlcmlhbGl6ZWQgSlNPTiB3aGVyZSBvbmUgb2YgdGhlbSBoYXMgYVxuICAvLyBkYW5nbGluZyBjb21tYSBhbmQgdGhlIG90aGVyIGRvZXNuJ3QuIFR1cm5zIG91dCBpbmNsdWRpbmcgdGhlIGRhbmdsaW5nIGNvbW1hIHlpZWxkcyB0aGUgbmljZXN0IG91dHB1dDpcblxuICBqc29uRGlmZi51c2VMb25nZXN0VG9rZW4gPSB0cnVlO1xuICBqc29uRGlmZi50b2tlbml6ZSA9IGxpbmVEaWZmLnRva2VuaXplO1xuXG4gIGpzb25EaWZmLmNhc3RJbnB1dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBfdGhpcyRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICB1bmRlZmluZWRSZXBsYWNlbWVudCA9IF90aGlzJG9wdGlvbnMudW5kZWZpbmVkUmVwbGFjZW1lbnQsXG4gICAgICAgIF90aGlzJG9wdGlvbnMkc3RyaW5naSA9IF90aGlzJG9wdGlvbnMuc3RyaW5naWZ5UmVwbGFjZXIsXG4gICAgICAgIHN0cmluZ2lmeVJlcGxhY2VyID0gX3RoaXMkb3B0aW9ucyRzdHJpbmdpID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoaywgdikge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZFJlcGxhY2VtZW50IDogdjtcbiAgICB9IDogX3RoaXMkb3B0aW9ucyRzdHJpbmdpO1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBKU09OLnN0cmluZ2lmeShjYW5vbmljYWxpemUodmFsdWUsIG51bGwsIG51bGwsIHN0cmluZ2lmeVJlcGxhY2VyKSwgc3RyaW5naWZ5UmVwbGFjZXIsICcgICcpO1xuICB9O1xuXG4gIGpzb25EaWZmLmVxdWFscyA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuICAgIHJldHVybiBEaWZmLnByb3RvdHlwZS5lcXVhbHMuY2FsbChqc29uRGlmZiwgbGVmdC5yZXBsYWNlKC8sKFtcXHJcXG5dKS9nLCAnJDEnKSwgcmlnaHQucmVwbGFjZSgvLChbXFxyXFxuXSkvZywgJyQxJykpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRpZmZKc29uKG9sZE9iaiwgbmV3T2JqLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGpzb25EaWZmLmRpZmYob2xkT2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICB9IC8vIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB0aGUgcHJlc2VuY2Ugb2YgY2lyY3VsYXIgcmVmZXJlbmNlcyBieSBiYWlsaW5nIG91dCB3aGVuIGVuY291bnRlcmluZyBhblxuICAvLyBvYmplY3QgdGhhdCBpcyBhbHJlYWR5IG9uIHRoZSBcInN0YWNrXCIgb2YgaXRlbXMgYmVpbmcgcHJvY2Vzc2VkLiBBY2NlcHRzIGFuIG9wdGlvbmFsIHJlcGxhY2VyXG5cbiAgZnVuY3Rpb24gY2Fub25pY2FsaXplKG9iaiwgc3RhY2ssIHJlcGxhY2VtZW50U3RhY2ssIHJlcGxhY2VyLCBrZXkpIHtcbiAgICBzdGFjayA9IHN0YWNrIHx8IFtdO1xuICAgIHJlcGxhY2VtZW50U3RhY2sgPSByZXBsYWNlbWVudFN0YWNrIHx8IFtdO1xuXG4gICAgaWYgKHJlcGxhY2VyKSB7XG4gICAgICBvYmogPSByZXBsYWNlcihrZXksIG9iaik7XG4gICAgfVxuXG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChzdGFja1tpXSA9PT0gb2JqKSB7XG4gICAgICAgIHJldHVybiByZXBsYWNlbWVudFN0YWNrW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjYW5vbmljYWxpemVkT2JqO1xuXG4gICAgaWYgKCdbb2JqZWN0IEFycmF5XScgPT09IG9iamVjdFByb3RvdHlwZVRvU3RyaW5nLmNhbGwob2JqKSkge1xuICAgICAgc3RhY2sucHVzaChvYmopO1xuICAgICAgY2Fub25pY2FsaXplZE9iaiA9IG5ldyBBcnJheShvYmoubGVuZ3RoKTtcbiAgICAgIHJlcGxhY2VtZW50U3RhY2sucHVzaChjYW5vbmljYWxpemVkT2JqKTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjYW5vbmljYWxpemVkT2JqW2ldID0gY2Fub25pY2FsaXplKG9ialtpXSwgc3RhY2ssIHJlcGxhY2VtZW50U3RhY2ssIHJlcGxhY2VyLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICBzdGFjay5wb3AoKTtcbiAgICAgIHJlcGxhY2VtZW50U3RhY2sucG9wKCk7XG4gICAgICByZXR1cm4gY2Fub25pY2FsaXplZE9iajtcbiAgICB9XG5cbiAgICBpZiAob2JqICYmIG9iai50b0pTT04pIHtcbiAgICAgIG9iaiA9IG9iai50b0pTT04oKTtcbiAgICB9XG5cbiAgICBpZiAoX3R5cGVvZihvYmopID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwpIHtcbiAgICAgIHN0YWNrLnB1c2gob2JqKTtcbiAgICAgIGNhbm9uaWNhbGl6ZWRPYmogPSB7fTtcbiAgICAgIHJlcGxhY2VtZW50U3RhY2sucHVzaChjYW5vbmljYWxpemVkT2JqKTtcblxuICAgICAgdmFyIHNvcnRlZEtleXMgPSBbXSxcbiAgICAgICAgICBfa2V5O1xuXG4gICAgICBmb3IgKF9rZXkgaW4gb2JqKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoX2tleSkpIHtcbiAgICAgICAgICBzb3J0ZWRLZXlzLnB1c2goX2tleSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc29ydGVkS2V5cy5zb3J0KCk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBzb3J0ZWRLZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIF9rZXkgPSBzb3J0ZWRLZXlzW2ldO1xuICAgICAgICBjYW5vbmljYWxpemVkT2JqW19rZXldID0gY2Fub25pY2FsaXplKG9ialtfa2V5XSwgc3RhY2ssIHJlcGxhY2VtZW50U3RhY2ssIHJlcGxhY2VyLCBfa2V5KTtcbiAgICAgIH1cblxuICAgICAgc3RhY2sucG9wKCk7XG4gICAgICByZXBsYWNlbWVudFN0YWNrLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5vbmljYWxpemVkT2JqID0gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBjYW5vbmljYWxpemVkT2JqO1xuICB9XG5cbiAgdmFyIGFycmF5RGlmZiA9IG5ldyBEaWZmKCk7XG5cbiAgYXJyYXlEaWZmLnRva2VuaXplID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNsaWNlKCk7XG4gIH07XG5cbiAgYXJyYXlEaWZmLmpvaW4gPSBhcnJheURpZmYucmVtb3ZlRW1wdHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgZnVuY3Rpb24gZGlmZkFycmF5cyhvbGRBcnIsIG5ld0FyciwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gYXJyYXlEaWZmLmRpZmYob2xkQXJyLCBuZXdBcnIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlUGF0Y2godW5pRGlmZikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgZGlmZnN0ciA9IHVuaURpZmYuc3BsaXQoL1xcclxcbnxbXFxuXFx2XFxmXFxyXFx4ODVdLyksXG4gICAgICAgIGRlbGltaXRlcnMgPSB1bmlEaWZmLm1hdGNoKC9cXHJcXG58W1xcblxcdlxcZlxcclxceDg1XS9nKSB8fCBbXSxcbiAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICBpID0gMDtcblxuICAgIGZ1bmN0aW9uIHBhcnNlSW5kZXgoKSB7XG4gICAgICB2YXIgaW5kZXggPSB7fTtcbiAgICAgIGxpc3QucHVzaChpbmRleCk7IC8vIFBhcnNlIGRpZmYgbWV0YWRhdGFcblxuICAgICAgd2hpbGUgKGkgPCBkaWZmc3RyLmxlbmd0aCkge1xuICAgICAgICB2YXIgbGluZSA9IGRpZmZzdHJbaV07IC8vIEZpbGUgaGVhZGVyIGZvdW5kLCBlbmQgcGFyc2luZyBkaWZmIG1ldGFkYXRhXG5cbiAgICAgICAgaWYgKC9eKFxcLVxcLVxcLXxcXCtcXCtcXCt8QEApXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gLy8gRGlmZiBpbmRleFxuXG5cbiAgICAgICAgdmFyIGhlYWRlciA9IC9eKD86SW5kZXg6fGRpZmYoPzogLXIgXFx3KykrKVxccysoLis/KVxccyokLy5leGVjKGxpbmUpO1xuXG4gICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICBpbmRleC5pbmRleCA9IGhlYWRlclsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkrKztcbiAgICAgIH0gLy8gUGFyc2UgZmlsZSBoZWFkZXJzIGlmIHRoZXkgYXJlIGRlZmluZWQuIFVuaWZpZWQgZGlmZiByZXF1aXJlcyB0aGVtLCBidXRcbiAgICAgIC8vIHRoZXJlJ3Mgbm8gdGVjaG5pY2FsIGlzc3VlcyB0byBoYXZlIGFuIGlzb2xhdGVkIGh1bmsgd2l0aG91dCBmaWxlIGhlYWRlclxuXG5cbiAgICAgIHBhcnNlRmlsZUhlYWRlcihpbmRleCk7XG4gICAgICBwYXJzZUZpbGVIZWFkZXIoaW5kZXgpOyAvLyBQYXJzZSBodW5rc1xuXG4gICAgICBpbmRleC5odW5rcyA9IFtdO1xuXG4gICAgICB3aGlsZSAoaSA8IGRpZmZzdHIubGVuZ3RoKSB7XG4gICAgICAgIHZhciBfbGluZSA9IGRpZmZzdHJbaV07XG5cbiAgICAgICAgaWYgKC9eKEluZGV4OnxkaWZmfFxcLVxcLVxcLXxcXCtcXCtcXCspXFxzLy50ZXN0KF9saW5lKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKC9eQEAvLnRlc3QoX2xpbmUpKSB7XG4gICAgICAgICAgaW5kZXguaHVua3MucHVzaChwYXJzZUh1bmsoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX2xpbmUgJiYgb3B0aW9ucy5zdHJpY3QpIHtcbiAgICAgICAgICAvLyBJZ25vcmUgdW5leHBlY3RlZCBjb250ZW50IHVubGVzcyBpbiBzdHJpY3QgbW9kZVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBsaW5lICcgKyAoaSArIDEpICsgJyAnICsgSlNPTi5zdHJpbmdpZnkoX2xpbmUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIFBhcnNlcyB0aGUgLS0tIGFuZCArKysgaGVhZGVycywgaWYgbm9uZSBhcmUgZm91bmQsIG5vIGxpbmVzXG4gICAgLy8gYXJlIGNvbnN1bWVkLlxuXG5cbiAgICBmdW5jdGlvbiBwYXJzZUZpbGVIZWFkZXIoaW5kZXgpIHtcbiAgICAgIHZhciBmaWxlSGVhZGVyID0gL14oLS0tfFxcK1xcK1xcKylcXHMrKC4qKSQvLmV4ZWMoZGlmZnN0cltpXSk7XG5cbiAgICAgIGlmIChmaWxlSGVhZGVyKSB7XG4gICAgICAgIHZhciBrZXlQcmVmaXggPSBmaWxlSGVhZGVyWzFdID09PSAnLS0tJyA/ICdvbGQnIDogJ25ldyc7XG4gICAgICAgIHZhciBkYXRhID0gZmlsZUhlYWRlclsyXS5zcGxpdCgnXFx0JywgMik7XG4gICAgICAgIHZhciBmaWxlTmFtZSA9IGRhdGFbMF0ucmVwbGFjZSgvXFxcXFxcXFwvZywgJ1xcXFwnKTtcblxuICAgICAgICBpZiAoL15cIi4qXCIkLy50ZXN0KGZpbGVOYW1lKSkge1xuICAgICAgICAgIGZpbGVOYW1lID0gZmlsZU5hbWUuc3Vic3RyKDEsIGZpbGVOYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXhba2V5UHJlZml4ICsgJ0ZpbGVOYW1lJ10gPSBmaWxlTmFtZTtcbiAgICAgICAgaW5kZXhba2V5UHJlZml4ICsgJ0hlYWRlciddID0gKGRhdGFbMV0gfHwgJycpLnRyaW0oKTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gLy8gUGFyc2VzIGEgaHVua1xuICAgIC8vIFRoaXMgYXNzdW1lcyB0aGF0IHdlIGFyZSBhdCB0aGUgc3RhcnQgb2YgYSBodW5rLlxuXG5cbiAgICBmdW5jdGlvbiBwYXJzZUh1bmsoKSB7XG4gICAgICB2YXIgY2h1bmtIZWFkZXJJbmRleCA9IGksXG4gICAgICAgICAgY2h1bmtIZWFkZXJMaW5lID0gZGlmZnN0cltpKytdLFxuICAgICAgICAgIGNodW5rSGVhZGVyID0gY2h1bmtIZWFkZXJMaW5lLnNwbGl0KC9AQCAtKFxcZCspKD86LChcXGQrKSk/IFxcKyhcXGQrKSg/OiwoXFxkKykpPyBAQC8pO1xuICAgICAgdmFyIGh1bmsgPSB7XG4gICAgICAgIG9sZFN0YXJ0OiArY2h1bmtIZWFkZXJbMV0sXG4gICAgICAgIG9sZExpbmVzOiArY2h1bmtIZWFkZXJbMl0gfHwgMSxcbiAgICAgICAgbmV3U3RhcnQ6ICtjaHVua0hlYWRlclszXSxcbiAgICAgICAgbmV3TGluZXM6ICtjaHVua0hlYWRlcls0XSB8fCAxLFxuICAgICAgICBsaW5lczogW10sXG4gICAgICAgIGxpbmVkZWxpbWl0ZXJzOiBbXVxuICAgICAgfTtcbiAgICAgIHZhciBhZGRDb3VudCA9IDAsXG4gICAgICAgICAgcmVtb3ZlQ291bnQgPSAwO1xuXG4gICAgICBmb3IgKDsgaSA8IGRpZmZzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gTGluZXMgc3RhcnRpbmcgd2l0aCAnLS0tJyBjb3VsZCBiZSBtaXN0YWtlbiBmb3IgdGhlIFwicmVtb3ZlIGxpbmVcIiBvcGVyYXRpb25cbiAgICAgICAgLy8gQnV0IHRoZXkgY291bGQgYmUgdGhlIGhlYWRlciBmb3IgdGhlIG5leHQgZmlsZS4gVGhlcmVmb3JlIHBydW5lIHN1Y2ggY2FzZXMgb3V0LlxuICAgICAgICBpZiAoZGlmZnN0cltpXS5pbmRleE9mKCctLS0gJykgPT09IDAgJiYgaSArIDIgPCBkaWZmc3RyLmxlbmd0aCAmJiBkaWZmc3RyW2kgKyAxXS5pbmRleE9mKCcrKysgJykgPT09IDAgJiYgZGlmZnN0cltpICsgMl0uaW5kZXhPZignQEAnKSA9PT0gMCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wZXJhdGlvbiA9IGRpZmZzdHJbaV0ubGVuZ3RoID09IDAgJiYgaSAhPSBkaWZmc3RyLmxlbmd0aCAtIDEgPyAnICcgOiBkaWZmc3RyW2ldWzBdO1xuXG4gICAgICAgIGlmIChvcGVyYXRpb24gPT09ICcrJyB8fCBvcGVyYXRpb24gPT09ICctJyB8fCBvcGVyYXRpb24gPT09ICcgJyB8fCBvcGVyYXRpb24gPT09ICdcXFxcJykge1xuICAgICAgICAgIGh1bmsubGluZXMucHVzaChkaWZmc3RyW2ldKTtcbiAgICAgICAgICBodW5rLmxpbmVkZWxpbWl0ZXJzLnB1c2goZGVsaW1pdGVyc1tpXSB8fCAnXFxuJyk7XG5cbiAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICAgIGFkZENvdW50Kys7XG4gICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICctJykge1xuICAgICAgICAgICAgcmVtb3ZlQ291bnQrKztcbiAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJyAnKSB7XG4gICAgICAgICAgICBhZGRDb3VudCsrO1xuICAgICAgICAgICAgcmVtb3ZlQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gSGFuZGxlIHRoZSBlbXB0eSBibG9jayBjb3VudCBjYXNlXG5cblxuICAgICAgaWYgKCFhZGRDb3VudCAmJiBodW5rLm5ld0xpbmVzID09PSAxKSB7XG4gICAgICAgIGh1bmsubmV3TGluZXMgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlbW92ZUNvdW50ICYmIGh1bmsub2xkTGluZXMgPT09IDEpIHtcbiAgICAgICAgaHVuay5vbGRMaW5lcyA9IDA7XG4gICAgICB9IC8vIFBlcmZvcm0gb3B0aW9uYWwgc2FuaXR5IGNoZWNraW5nXG5cblxuICAgICAgaWYgKG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICAgIGlmIChhZGRDb3VudCAhPT0gaHVuay5uZXdMaW5lcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWRkZWQgbGluZSBjb3VudCBkaWQgbm90IG1hdGNoIGZvciBodW5rIGF0IGxpbmUgJyArIChjaHVua0hlYWRlckluZGV4ICsgMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbW92ZUNvdW50ICE9PSBodW5rLm9sZExpbmVzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW1vdmVkIGxpbmUgY291bnQgZGlkIG5vdCBtYXRjaCBmb3IgaHVuayBhdCBsaW5lICcgKyAoY2h1bmtIZWFkZXJJbmRleCArIDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaHVuaztcbiAgICB9XG5cbiAgICB3aGlsZSAoaSA8IGRpZmZzdHIubGVuZ3RoKSB7XG4gICAgICBwYXJzZUluZGV4KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICAvLyBJdGVyYXRvciB0aGF0IHRyYXZlcnNlcyBpbiB0aGUgcmFuZ2Ugb2YgW21pbiwgbWF4XSwgc3RlcHBpbmdcbiAgLy8gYnkgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0YXJ0IHBvc2l0aW9uLiBJLmUuIGZvciBbMCwgNF0sIHdpdGhcbiAgLy8gc3RhcnQgb2YgMiwgdGhpcyB3aWxsIGl0ZXJhdGUgMiwgMywgMSwgNCwgMC5cbiAgZnVuY3Rpb24gZGlzdGFuY2VJdGVyYXRvciAoc3RhcnQsIG1pbkxpbmUsIG1heExpbmUpIHtcbiAgICB2YXIgd2FudEZvcndhcmQgPSB0cnVlLFxuICAgICAgICBiYWNrd2FyZEV4aGF1c3RlZCA9IGZhbHNlLFxuICAgICAgICBmb3J3YXJkRXhoYXVzdGVkID0gZmFsc2UsXG4gICAgICAgIGxvY2FsT2Zmc2V0ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXRlcmF0b3IoKSB7XG4gICAgICBpZiAod2FudEZvcndhcmQgJiYgIWZvcndhcmRFeGhhdXN0ZWQpIHtcbiAgICAgICAgaWYgKGJhY2t3YXJkRXhoYXVzdGVkKSB7XG4gICAgICAgICAgbG9jYWxPZmZzZXQrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3YW50Rm9yd2FyZCA9IGZhbHNlO1xuICAgICAgICB9IC8vIENoZWNrIGlmIHRyeWluZyB0byBmaXQgYmV5b25kIHRleHQgbGVuZ3RoLCBhbmQgaWYgbm90LCBjaGVjayBpdCBmaXRzXG4gICAgICAgIC8vIGFmdGVyIG9mZnNldCBsb2NhdGlvbiAob3IgZGVzaXJlZCBsb2NhdGlvbiBvbiBmaXJzdCBpdGVyYXRpb24pXG5cblxuICAgICAgICBpZiAoc3RhcnQgKyBsb2NhbE9mZnNldCA8PSBtYXhMaW5lKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yd2FyZEV4aGF1c3RlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghYmFja3dhcmRFeGhhdXN0ZWQpIHtcbiAgICAgICAgaWYgKCFmb3J3YXJkRXhoYXVzdGVkKSB7XG4gICAgICAgICAgd2FudEZvcndhcmQgPSB0cnVlO1xuICAgICAgICB9IC8vIENoZWNrIGlmIHRyeWluZyB0byBmaXQgYmVmb3JlIHRleHQgYmVnaW5uaW5nLCBhbmQgaWYgbm90LCBjaGVjayBpdCBmaXRzXG4gICAgICAgIC8vIGJlZm9yZSBvZmZzZXQgbG9jYXRpb25cblxuXG4gICAgICAgIGlmIChtaW5MaW5lIDw9IHN0YXJ0IC0gbG9jYWxPZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gLWxvY2FsT2Zmc2V0Kys7XG4gICAgICAgIH1cblxuICAgICAgICBiYWNrd2FyZEV4aGF1c3RlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBpdGVyYXRvcigpO1xuICAgICAgfSAvLyBXZSB0cmllZCB0byBmaXQgaHVuayBiZWZvcmUgdGV4dCBiZWdpbm5pbmcgYW5kIGJleW9uZCB0ZXh0IGxlbmd0aCwgdGhlblxuICAgICAgLy8gaHVuayBjYW4ndCBmaXQgb24gdGhlIHRleHQuIFJldHVybiB1bmRlZmluZWRcblxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseVBhdGNoKHNvdXJjZSwgdW5pRGlmZikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcblxuICAgIGlmICh0eXBlb2YgdW5pRGlmZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVuaURpZmYgPSBwYXJzZVBhdGNoKHVuaURpZmYpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHVuaURpZmYpKSB7XG4gICAgICBpZiAodW5pRGlmZi5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXBwbHlQYXRjaCBvbmx5IHdvcmtzIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XG4gICAgICB9XG5cbiAgICAgIHVuaURpZmYgPSB1bmlEaWZmWzBdO1xuICAgIH0gLy8gQXBwbHkgdGhlIGRpZmYgdG8gdGhlIGlucHV0XG5cblxuICAgIHZhciBsaW5lcyA9IHNvdXJjZS5zcGxpdCgvXFxyXFxufFtcXG5cXHZcXGZcXHJcXHg4NV0vKSxcbiAgICAgICAgZGVsaW1pdGVycyA9IHNvdXJjZS5tYXRjaCgvXFxyXFxufFtcXG5cXHZcXGZcXHJcXHg4NV0vZykgfHwgW10sXG4gICAgICAgIGh1bmtzID0gdW5pRGlmZi5odW5rcyxcbiAgICAgICAgY29tcGFyZUxpbmUgPSBvcHRpb25zLmNvbXBhcmVMaW5lIHx8IGZ1bmN0aW9uIChsaW5lTnVtYmVyLCBsaW5lLCBvcGVyYXRpb24sIHBhdGNoQ29udGVudCkge1xuICAgICAgcmV0dXJuIGxpbmUgPT09IHBhdGNoQ29udGVudDtcbiAgICB9LFxuICAgICAgICBlcnJvckNvdW50ID0gMCxcbiAgICAgICAgZnV6ekZhY3RvciA9IG9wdGlvbnMuZnV6ekZhY3RvciB8fCAwLFxuICAgICAgICBtaW5MaW5lID0gMCxcbiAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgcmVtb3ZlRU9GTkwsXG4gICAgICAgIGFkZEVPRk5MO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgaHVuayBleGFjdGx5IGZpdHMgb24gdGhlIHByb3ZpZGVkIGxvY2F0aW9uXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGh1bmtGaXRzKGh1bmssIHRvUG9zKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGh1bmsubGluZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBodW5rLmxpbmVzW2pdLFxuICAgICAgICAgICAgb3BlcmF0aW9uID0gbGluZS5sZW5ndGggPiAwID8gbGluZVswXSA6ICcgJyxcbiAgICAgICAgICAgIGNvbnRlbnQgPSBsaW5lLmxlbmd0aCA+IDAgPyBsaW5lLnN1YnN0cigxKSA6IGxpbmU7XG5cbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJyAnIHx8IG9wZXJhdGlvbiA9PT0gJy0nKSB7XG4gICAgICAgICAgLy8gQ29udGV4dCBzYW5pdHkgY2hlY2tcbiAgICAgICAgICBpZiAoIWNvbXBhcmVMaW5lKHRvUG9zICsgMSwgbGluZXNbdG9Qb3NdLCBvcGVyYXRpb24sIGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBlcnJvckNvdW50Kys7XG5cbiAgICAgICAgICAgIGlmIChlcnJvckNvdW50ID4gZnV6ekZhY3Rvcikge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9Qb3MrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IC8vIFNlYXJjaCBiZXN0IGZpdCBvZmZzZXRzIGZvciBlYWNoIGh1bmsgYmFzZWQgb24gdGhlIHByZXZpb3VzIG9uZXNcblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGh1bmsgPSBodW5rc1tpXSxcbiAgICAgICAgICBtYXhMaW5lID0gbGluZXMubGVuZ3RoIC0gaHVuay5vbGRMaW5lcyxcbiAgICAgICAgICBsb2NhbE9mZnNldCA9IDAsXG4gICAgICAgICAgdG9Qb3MgPSBvZmZzZXQgKyBodW5rLm9sZFN0YXJ0IC0gMTtcbiAgICAgIHZhciBpdGVyYXRvciA9IGRpc3RhbmNlSXRlcmF0b3IodG9Qb3MsIG1pbkxpbmUsIG1heExpbmUpO1xuXG4gICAgICBmb3IgKDsgbG9jYWxPZmZzZXQgIT09IHVuZGVmaW5lZDsgbG9jYWxPZmZzZXQgPSBpdGVyYXRvcigpKSB7XG4gICAgICAgIGlmIChodW5rRml0cyhodW5rLCB0b1BvcyArIGxvY2FsT2Zmc2V0KSkge1xuICAgICAgICAgIGh1bmsub2Zmc2V0ID0gb2Zmc2V0ICs9IGxvY2FsT2Zmc2V0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsb2NhbE9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gLy8gU2V0IGxvd2VyIHRleHQgbGltaXQgdG8gZW5kIG9mIHRoZSBjdXJyZW50IGh1bmssIHNvIG5leHQgb25lcyBkb24ndCB0cnlcbiAgICAgIC8vIHRvIGZpdCBvdmVyIGFscmVhZHkgcGF0Y2hlZCB0ZXh0XG5cblxuICAgICAgbWluTGluZSA9IGh1bmsub2Zmc2V0ICsgaHVuay5vbGRTdGFydCArIGh1bmsub2xkTGluZXM7XG4gICAgfSAvLyBBcHBseSBwYXRjaCBodW5rc1xuXG5cbiAgICB2YXIgZGlmZk9mZnNldCA9IDA7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgaHVua3MubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2h1bmsgPSBodW5rc1tfaV0sXG4gICAgICAgICAgX3RvUG9zID0gX2h1bmsub2xkU3RhcnQgKyBfaHVuay5vZmZzZXQgKyBkaWZmT2Zmc2V0IC0gMTtcblxuICAgICAgZGlmZk9mZnNldCArPSBfaHVuay5uZXdMaW5lcyAtIF9odW5rLm9sZExpbmVzO1xuXG4gICAgICBpZiAoX3RvUG9zIDwgMCkge1xuICAgICAgICAvLyBDcmVhdGluZyBhIG5ldyBmaWxlXG4gICAgICAgIF90b1BvcyA9IDA7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2h1bmsubGluZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBfaHVuay5saW5lc1tqXSxcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IGxpbmUubGVuZ3RoID4gMCA/IGxpbmVbMF0gOiAnICcsXG4gICAgICAgICAgICBjb250ZW50ID0gbGluZS5sZW5ndGggPiAwID8gbGluZS5zdWJzdHIoMSkgOiBsaW5lLFxuICAgICAgICAgICAgZGVsaW1pdGVyID0gX2h1bmsubGluZWRlbGltaXRlcnNbal07XG5cbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJyAnKSB7XG4gICAgICAgICAgX3RvUG9zKys7XG4gICAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnLScpIHtcbiAgICAgICAgICBsaW5lcy5zcGxpY2UoX3RvUG9zLCAxKTtcbiAgICAgICAgICBkZWxpbWl0ZXJzLnNwbGljZShfdG9Qb3MsIDEpO1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICBsaW5lcy5zcGxpY2UoX3RvUG9zLCAwLCBjb250ZW50KTtcbiAgICAgICAgICBkZWxpbWl0ZXJzLnNwbGljZShfdG9Qb3MsIDAsIGRlbGltaXRlcik7XG4gICAgICAgICAgX3RvUG9zKys7XG4gICAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnXFxcXCcpIHtcbiAgICAgICAgICB2YXIgcHJldmlvdXNPcGVyYXRpb24gPSBfaHVuay5saW5lc1tqIC0gMV0gPyBfaHVuay5saW5lc1tqIC0gMV1bMF0gOiBudWxsO1xuXG4gICAgICAgICAgaWYgKHByZXZpb3VzT3BlcmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICAgIHJlbW92ZUVPRk5MID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByZXZpb3VzT3BlcmF0aW9uID09PSAnLScpIHtcbiAgICAgICAgICAgIGFkZEVPRk5MID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIEhhbmRsZSBFT0ZOTCBpbnNlcnRpb24vcmVtb3ZhbFxuXG5cbiAgICBpZiAocmVtb3ZlRU9GTkwpIHtcbiAgICAgIHdoaWxlICghbGluZXNbbGluZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgbGluZXMucG9wKCk7XG4gICAgICAgIGRlbGltaXRlcnMucG9wKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhZGRFT0ZOTCkge1xuICAgICAgbGluZXMucHVzaCgnJyk7XG4gICAgICBkZWxpbWl0ZXJzLnB1c2goJ1xcbicpO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBsaW5lcy5sZW5ndGggLSAxOyBfaysrKSB7XG4gICAgICBsaW5lc1tfa10gPSBsaW5lc1tfa10gKyBkZWxpbWl0ZXJzW19rXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGluZXMuam9pbignJyk7XG4gIH0gLy8gV3JhcHBlciB0aGF0IHN1cHBvcnRzIG11bHRpcGxlIGZpbGUgcGF0Y2hlcyB2aWEgY2FsbGJhY2tzLlxuXG4gIGZ1bmN0aW9uIGFwcGx5UGF0Y2hlcyh1bmlEaWZmLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB1bmlEaWZmID09PSAnc3RyaW5nJykge1xuICAgICAgdW5pRGlmZiA9IHBhcnNlUGF0Y2godW5pRGlmZik7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzSW5kZXgoKSB7XG4gICAgICB2YXIgaW5kZXggPSB1bmlEaWZmW2N1cnJlbnRJbmRleCsrXTtcblxuICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5jb21wbGV0ZSgpO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLmxvYWRGaWxlKGluZGV4LCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5jb21wbGV0ZShlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVwZGF0ZWRDb250ZW50ID0gYXBwbHlQYXRjaChkYXRhLCBpbmRleCwgb3B0aW9ucyk7XG4gICAgICAgIG9wdGlvbnMucGF0Y2hlZChpbmRleCwgdXBkYXRlZENvbnRlbnQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5jb21wbGV0ZShlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHByb2Nlc3NJbmRleCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb2Nlc3NJbmRleCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RydWN0dXJlZFBhdGNoKG9sZEZpbGVOYW1lLCBuZXdGaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmNvbnRleHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBvcHRpb25zLmNvbnRleHQgPSA0O1xuICAgIH1cblxuICAgIHZhciBkaWZmID0gZGlmZkxpbmVzKG9sZFN0ciwgbmV3U3RyLCBvcHRpb25zKTtcbiAgICBkaWZmLnB1c2goe1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgbGluZXM6IFtdXG4gICAgfSk7IC8vIEFwcGVuZCBhbiBlbXB0eSB2YWx1ZSB0byBtYWtlIGNsZWFudXAgZWFzaWVyXG5cbiAgICBmdW5jdGlvbiBjb250ZXh0TGluZXMobGluZXMpIHtcbiAgICAgIHJldHVybiBsaW5lcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiAnICcgKyBlbnRyeTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBodW5rcyA9IFtdO1xuICAgIHZhciBvbGRSYW5nZVN0YXJ0ID0gMCxcbiAgICAgICAgbmV3UmFuZ2VTdGFydCA9IDAsXG4gICAgICAgIGN1clJhbmdlID0gW10sXG4gICAgICAgIG9sZExpbmUgPSAxLFxuICAgICAgICBuZXdMaW5lID0gMTtcblxuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGkpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gZGlmZltpXSxcbiAgICAgICAgICBsaW5lcyA9IGN1cnJlbnQubGluZXMgfHwgY3VycmVudC52YWx1ZS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKTtcbiAgICAgIGN1cnJlbnQubGluZXMgPSBsaW5lcztcblxuICAgICAgaWYgKGN1cnJlbnQuYWRkZWQgfHwgY3VycmVudC5yZW1vdmVkKSB7XG4gICAgICAgIHZhciBfY3VyUmFuZ2U7XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBwcmV2aW91cyBjb250ZXh0LCBzdGFydCB3aXRoIHRoYXRcbiAgICAgICAgaWYgKCFvbGRSYW5nZVN0YXJ0KSB7XG4gICAgICAgICAgdmFyIHByZXYgPSBkaWZmW2kgLSAxXTtcbiAgICAgICAgICBvbGRSYW5nZVN0YXJ0ID0gb2xkTGluZTtcbiAgICAgICAgICBuZXdSYW5nZVN0YXJ0ID0gbmV3TGluZTtcblxuICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICBjdXJSYW5nZSA9IG9wdGlvbnMuY29udGV4dCA+IDAgPyBjb250ZXh0TGluZXMocHJldi5saW5lcy5zbGljZSgtb3B0aW9ucy5jb250ZXh0KSkgOiBbXTtcbiAgICAgICAgICAgIG9sZFJhbmdlU3RhcnQgLT0gY3VyUmFuZ2UubGVuZ3RoO1xuICAgICAgICAgICAgbmV3UmFuZ2VTdGFydCAtPSBjdXJSYW5nZS5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIE91dHB1dCBvdXIgY2hhbmdlc1xuXG5cbiAgICAgICAgKF9jdXJSYW5nZSA9IGN1clJhbmdlKS5wdXNoLmFwcGx5KF9jdXJSYW5nZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxpbmVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICByZXR1cm4gKGN1cnJlbnQuYWRkZWQgPyAnKycgOiAnLScpICsgZW50cnk7XG4gICAgICAgIH0pKSk7IC8vIFRyYWNrIHRoZSB1cGRhdGVkIGZpbGUgcG9zaXRpb25cblxuXG4gICAgICAgIGlmIChjdXJyZW50LmFkZGVkKSB7XG4gICAgICAgICAgbmV3TGluZSArPSBsaW5lcy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2xkTGluZSArPSBsaW5lcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElkZW50aWNhbCBjb250ZXh0IGxpbmVzLiBUcmFjayBsaW5lIGNoYW5nZXNcbiAgICAgICAgaWYgKG9sZFJhbmdlU3RhcnQpIHtcbiAgICAgICAgICAvLyBDbG9zZSBvdXQgYW55IGNoYW5nZXMgdGhhdCBoYXZlIGJlZW4gb3V0cHV0IChvciBqb2luIG92ZXJsYXBwaW5nKVxuICAgICAgICAgIGlmIChsaW5lcy5sZW5ndGggPD0gb3B0aW9ucy5jb250ZXh0ICogMiAmJiBpIDwgZGlmZi5sZW5ndGggLSAyKSB7XG4gICAgICAgICAgICB2YXIgX2N1clJhbmdlMjtcblxuICAgICAgICAgICAgLy8gT3ZlcmxhcHBpbmdcbiAgICAgICAgICAgIChfY3VyUmFuZ2UyID0gY3VyUmFuZ2UpLnB1c2guYXBwbHkoX2N1clJhbmdlMiwgX3RvQ29uc3VtYWJsZUFycmF5KGNvbnRleHRMaW5lcyhsaW5lcykpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIF9jdXJSYW5nZTM7XG5cbiAgICAgICAgICAgIC8vIGVuZCB0aGUgcmFuZ2UgYW5kIG91dHB1dFxuICAgICAgICAgICAgdmFyIGNvbnRleHRTaXplID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBvcHRpb25zLmNvbnRleHQpO1xuXG4gICAgICAgICAgICAoX2N1clJhbmdlMyA9IGN1clJhbmdlKS5wdXNoLmFwcGx5KF9jdXJSYW5nZTMsIF90b0NvbnN1bWFibGVBcnJheShjb250ZXh0TGluZXMobGluZXMuc2xpY2UoMCwgY29udGV4dFNpemUpKSkpO1xuXG4gICAgICAgICAgICB2YXIgaHVuayA9IHtcbiAgICAgICAgICAgICAgb2xkU3RhcnQ6IG9sZFJhbmdlU3RhcnQsXG4gICAgICAgICAgICAgIG9sZExpbmVzOiBvbGRMaW5lIC0gb2xkUmFuZ2VTdGFydCArIGNvbnRleHRTaXplLFxuICAgICAgICAgICAgICBuZXdTdGFydDogbmV3UmFuZ2VTdGFydCxcbiAgICAgICAgICAgICAgbmV3TGluZXM6IG5ld0xpbmUgLSBuZXdSYW5nZVN0YXJ0ICsgY29udGV4dFNpemUsXG4gICAgICAgICAgICAgIGxpbmVzOiBjdXJSYW5nZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGkgPj0gZGlmZi5sZW5ndGggLSAyICYmIGxpbmVzLmxlbmd0aCA8PSBvcHRpb25zLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgLy8gRU9GIGlzIGluc2lkZSB0aGlzIGh1bmtcbiAgICAgICAgICAgICAgdmFyIG9sZEVPRk5ld2xpbmUgPSAvXFxuJC8udGVzdChvbGRTdHIpO1xuICAgICAgICAgICAgICB2YXIgbmV3RU9GTmV3bGluZSA9IC9cXG4kLy50ZXN0KG5ld1N0cik7XG4gICAgICAgICAgICAgIHZhciBub05sQmVmb3JlQWRkcyA9IGxpbmVzLmxlbmd0aCA9PSAwICYmIGN1clJhbmdlLmxlbmd0aCA+IGh1bmsub2xkTGluZXM7XG5cbiAgICAgICAgICAgICAgaWYgKCFvbGRFT0ZOZXdsaW5lICYmIG5vTmxCZWZvcmVBZGRzKSB7XG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlOiBvbGQgaGFzIG5vIGVvbCBhbmQgbm8gdHJhaWxpbmcgY29udGV4dDsgbm8tbmwgY2FuIGVuZCB1cCBiZWZvcmUgYWRkc1xuICAgICAgICAgICAgICAgIGN1clJhbmdlLnNwbGljZShodW5rLm9sZExpbmVzLCAwLCAnXFxcXCBObyBuZXdsaW5lIGF0IGVuZCBvZiBmaWxlJyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIW9sZEVPRk5ld2xpbmUgJiYgIW5vTmxCZWZvcmVBZGRzIHx8ICFuZXdFT0ZOZXdsaW5lKSB7XG4gICAgICAgICAgICAgICAgY3VyUmFuZ2UucHVzaCgnXFxcXCBObyBuZXdsaW5lIGF0IGVuZCBvZiBmaWxlJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHVua3MucHVzaChodW5rKTtcbiAgICAgICAgICAgIG9sZFJhbmdlU3RhcnQgPSAwO1xuICAgICAgICAgICAgbmV3UmFuZ2VTdGFydCA9IDA7XG4gICAgICAgICAgICBjdXJSYW5nZSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9sZExpbmUgKz0gbGluZXMubGVuZ3RoO1xuICAgICAgICBuZXdMaW5lICs9IGxpbmVzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfbG9vcChpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgb2xkRmlsZU5hbWU6IG9sZEZpbGVOYW1lLFxuICAgICAgbmV3RmlsZU5hbWU6IG5ld0ZpbGVOYW1lLFxuICAgICAgb2xkSGVhZGVyOiBvbGRIZWFkZXIsXG4gICAgICBuZXdIZWFkZXI6IG5ld0hlYWRlcixcbiAgICAgIGh1bmtzOiBodW5rc1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlVHdvRmlsZXNQYXRjaChvbGRGaWxlTmFtZSwgbmV3RmlsZU5hbWUsIG9sZFN0ciwgbmV3U3RyLCBvbGRIZWFkZXIsIG5ld0hlYWRlciwgb3B0aW9ucykge1xuICAgIHZhciBkaWZmID0gc3RydWN0dXJlZFBhdGNoKG9sZEZpbGVOYW1lLCBuZXdGaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKTtcbiAgICB2YXIgcmV0ID0gW107XG5cbiAgICBpZiAob2xkRmlsZU5hbWUgPT0gbmV3RmlsZU5hbWUpIHtcbiAgICAgIHJldC5wdXNoKCdJbmRleDogJyArIG9sZEZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICByZXQucHVzaCgnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICAgIHJldC5wdXNoKCctLS0gJyArIGRpZmYub2xkRmlsZU5hbWUgKyAodHlwZW9mIGRpZmYub2xkSGVhZGVyID09PSAndW5kZWZpbmVkJyA/ICcnIDogJ1xcdCcgKyBkaWZmLm9sZEhlYWRlcikpO1xuICAgIHJldC5wdXNoKCcrKysgJyArIGRpZmYubmV3RmlsZU5hbWUgKyAodHlwZW9mIGRpZmYubmV3SGVhZGVyID09PSAndW5kZWZpbmVkJyA/ICcnIDogJ1xcdCcgKyBkaWZmLm5ld0hlYWRlcikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaWZmLmh1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaHVuayA9IGRpZmYuaHVua3NbaV07XG4gICAgICByZXQucHVzaCgnQEAgLScgKyBodW5rLm9sZFN0YXJ0ICsgJywnICsgaHVuay5vbGRMaW5lcyArICcgKycgKyBodW5rLm5ld1N0YXJ0ICsgJywnICsgaHVuay5uZXdMaW5lcyArICcgQEAnKTtcbiAgICAgIHJldC5wdXNoLmFwcGx5KHJldCwgaHVuay5saW5lcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldC5qb2luKCdcXG4nKSArICdcXG4nO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGNoKGZpbGVOYW1lLCBvbGRTdHIsIG5ld1N0ciwgb2xkSGVhZGVyLCBuZXdIZWFkZXIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gY3JlYXRlVHdvRmlsZXNQYXRjaChmaWxlTmFtZSwgZmlsZU5hbWUsIG9sZFN0ciwgbmV3U3RyLCBvbGRIZWFkZXIsIG5ld0hlYWRlciwgb3B0aW9ucyk7XG4gIH1cblxuICBmdW5jdGlvbiBhcnJheUVxdWFsKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5U3RhcnRzV2l0aChhLCBiKTtcbiAgfVxuICBmdW5jdGlvbiBhcnJheVN0YXJ0c1dpdGgoYXJyYXksIHN0YXJ0KSB7XG4gICAgaWYgKHN0YXJ0Lmxlbmd0aCA+IGFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChzdGFydFtpXSAhPT0gYXJyYXlbaV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY0xpbmVDb3VudChodW5rKSB7XG4gICAgdmFyIF9jYWxjT2xkTmV3TGluZUNvdW50ID0gY2FsY09sZE5ld0xpbmVDb3VudChodW5rLmxpbmVzKSxcbiAgICAgICAgb2xkTGluZXMgPSBfY2FsY09sZE5ld0xpbmVDb3VudC5vbGRMaW5lcyxcbiAgICAgICAgbmV3TGluZXMgPSBfY2FsY09sZE5ld0xpbmVDb3VudC5uZXdMaW5lcztcblxuICAgIGlmIChvbGRMaW5lcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBodW5rLm9sZExpbmVzID0gb2xkTGluZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBodW5rLm9sZExpbmVzO1xuICAgIH1cblxuICAgIGlmIChuZXdMaW5lcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBodW5rLm5ld0xpbmVzID0gbmV3TGluZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBodW5rLm5ld0xpbmVzO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtZXJnZShtaW5lLCB0aGVpcnMsIGJhc2UpIHtcbiAgICBtaW5lID0gbG9hZFBhdGNoKG1pbmUsIGJhc2UpO1xuICAgIHRoZWlycyA9IGxvYWRQYXRjaCh0aGVpcnMsIGJhc2UpO1xuICAgIHZhciByZXQgPSB7fTsgLy8gRm9yIGluZGV4IHdlIGp1c3QgbGV0IGl0IHBhc3MgdGhyb3VnaCBhcyBpdCBkb2Vzbid0IGhhdmUgYW55IG5lY2Vzc2FyeSBtZWFuaW5nLlxuICAgIC8vIExlYXZpbmcgc2FuaXR5IGNoZWNrcyBvbiB0aGlzIHRvIHRoZSBBUEkgY29uc3VtZXIgdGhhdCBtYXkga25vdyBtb3JlIGFib3V0IHRoZVxuICAgIC8vIG1lYW5pbmcgaW4gdGhlaXIgb3duIGNvbnRleHQuXG5cbiAgICBpZiAobWluZS5pbmRleCB8fCB0aGVpcnMuaW5kZXgpIHtcbiAgICAgIHJldC5pbmRleCA9IG1pbmUuaW5kZXggfHwgdGhlaXJzLmluZGV4O1xuICAgIH1cblxuICAgIGlmIChtaW5lLm5ld0ZpbGVOYW1lIHx8IHRoZWlycy5uZXdGaWxlTmFtZSkge1xuICAgICAgaWYgKCFmaWxlTmFtZUNoYW5nZWQobWluZSkpIHtcbiAgICAgICAgLy8gTm8gaGVhZGVyIG9yIG5vIGNoYW5nZSBpbiBvdXJzLCB1c2UgdGhlaXJzIChhbmQgb3VycyBpZiB0aGVpcnMgZG9lcyBub3QgZXhpc3QpXG4gICAgICAgIHJldC5vbGRGaWxlTmFtZSA9IHRoZWlycy5vbGRGaWxlTmFtZSB8fCBtaW5lLm9sZEZpbGVOYW1lO1xuICAgICAgICByZXQubmV3RmlsZU5hbWUgPSB0aGVpcnMubmV3RmlsZU5hbWUgfHwgbWluZS5uZXdGaWxlTmFtZTtcbiAgICAgICAgcmV0Lm9sZEhlYWRlciA9IHRoZWlycy5vbGRIZWFkZXIgfHwgbWluZS5vbGRIZWFkZXI7XG4gICAgICAgIHJldC5uZXdIZWFkZXIgPSB0aGVpcnMubmV3SGVhZGVyIHx8IG1pbmUubmV3SGVhZGVyO1xuICAgICAgfSBlbHNlIGlmICghZmlsZU5hbWVDaGFuZ2VkKHRoZWlycykpIHtcbiAgICAgICAgLy8gTm8gaGVhZGVyIG9yIG5vIGNoYW5nZSBpbiB0aGVpcnMsIHVzZSBvdXJzXG4gICAgICAgIHJldC5vbGRGaWxlTmFtZSA9IG1pbmUub2xkRmlsZU5hbWU7XG4gICAgICAgIHJldC5uZXdGaWxlTmFtZSA9IG1pbmUubmV3RmlsZU5hbWU7XG4gICAgICAgIHJldC5vbGRIZWFkZXIgPSBtaW5lLm9sZEhlYWRlcjtcbiAgICAgICAgcmV0Lm5ld0hlYWRlciA9IG1pbmUubmV3SGVhZGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQm90aCBjaGFuZ2VkLi4uIGZpZ3VyZSBpdCBvdXRcbiAgICAgICAgcmV0Lm9sZEZpbGVOYW1lID0gc2VsZWN0RmllbGQocmV0LCBtaW5lLm9sZEZpbGVOYW1lLCB0aGVpcnMub2xkRmlsZU5hbWUpO1xuICAgICAgICByZXQubmV3RmlsZU5hbWUgPSBzZWxlY3RGaWVsZChyZXQsIG1pbmUubmV3RmlsZU5hbWUsIHRoZWlycy5uZXdGaWxlTmFtZSk7XG4gICAgICAgIHJldC5vbGRIZWFkZXIgPSBzZWxlY3RGaWVsZChyZXQsIG1pbmUub2xkSGVhZGVyLCB0aGVpcnMub2xkSGVhZGVyKTtcbiAgICAgICAgcmV0Lm5ld0hlYWRlciA9IHNlbGVjdEZpZWxkKHJldCwgbWluZS5uZXdIZWFkZXIsIHRoZWlycy5uZXdIZWFkZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldC5odW5rcyA9IFtdO1xuICAgIHZhciBtaW5lSW5kZXggPSAwLFxuICAgICAgICB0aGVpcnNJbmRleCA9IDAsXG4gICAgICAgIG1pbmVPZmZzZXQgPSAwLFxuICAgICAgICB0aGVpcnNPZmZzZXQgPSAwO1xuXG4gICAgd2hpbGUgKG1pbmVJbmRleCA8IG1pbmUuaHVua3MubGVuZ3RoIHx8IHRoZWlyc0luZGV4IDwgdGhlaXJzLmh1bmtzLmxlbmd0aCkge1xuICAgICAgdmFyIG1pbmVDdXJyZW50ID0gbWluZS5odW5rc1ttaW5lSW5kZXhdIHx8IHtcbiAgICAgICAgb2xkU3RhcnQ6IEluZmluaXR5XG4gICAgICB9LFxuICAgICAgICAgIHRoZWlyc0N1cnJlbnQgPSB0aGVpcnMuaHVua3NbdGhlaXJzSW5kZXhdIHx8IHtcbiAgICAgICAgb2xkU3RhcnQ6IEluZmluaXR5XG4gICAgICB9O1xuXG4gICAgICBpZiAoaHVua0JlZm9yZShtaW5lQ3VycmVudCwgdGhlaXJzQ3VycmVudCkpIHtcbiAgICAgICAgLy8gVGhpcyBwYXRjaCBkb2VzIG5vdCBvdmVybGFwIHdpdGggYW55IG9mIHRoZSBvdGhlcnMsIHlheS5cbiAgICAgICAgcmV0Lmh1bmtzLnB1c2goY2xvbmVIdW5rKG1pbmVDdXJyZW50LCBtaW5lT2Zmc2V0KSk7XG4gICAgICAgIG1pbmVJbmRleCsrO1xuICAgICAgICB0aGVpcnNPZmZzZXQgKz0gbWluZUN1cnJlbnQubmV3TGluZXMgLSBtaW5lQ3VycmVudC5vbGRMaW5lcztcbiAgICAgIH0gZWxzZSBpZiAoaHVua0JlZm9yZSh0aGVpcnNDdXJyZW50LCBtaW5lQ3VycmVudCkpIHtcbiAgICAgICAgLy8gVGhpcyBwYXRjaCBkb2VzIG5vdCBvdmVybGFwIHdpdGggYW55IG9mIHRoZSBvdGhlcnMsIHlheS5cbiAgICAgICAgcmV0Lmh1bmtzLnB1c2goY2xvbmVIdW5rKHRoZWlyc0N1cnJlbnQsIHRoZWlyc09mZnNldCkpO1xuICAgICAgICB0aGVpcnNJbmRleCsrO1xuICAgICAgICBtaW5lT2Zmc2V0ICs9IHRoZWlyc0N1cnJlbnQubmV3TGluZXMgLSB0aGVpcnNDdXJyZW50Lm9sZExpbmVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3ZlcmxhcCwgbWVyZ2UgYXMgYmVzdCB3ZSBjYW5cbiAgICAgICAgdmFyIG1lcmdlZEh1bmsgPSB7XG4gICAgICAgICAgb2xkU3RhcnQ6IE1hdGgubWluKG1pbmVDdXJyZW50Lm9sZFN0YXJ0LCB0aGVpcnNDdXJyZW50Lm9sZFN0YXJ0KSxcbiAgICAgICAgICBvbGRMaW5lczogMCxcbiAgICAgICAgICBuZXdTdGFydDogTWF0aC5taW4obWluZUN1cnJlbnQubmV3U3RhcnQgKyBtaW5lT2Zmc2V0LCB0aGVpcnNDdXJyZW50Lm9sZFN0YXJ0ICsgdGhlaXJzT2Zmc2V0KSxcbiAgICAgICAgICBuZXdMaW5lczogMCxcbiAgICAgICAgICBsaW5lczogW11cbiAgICAgICAgfTtcbiAgICAgICAgbWVyZ2VMaW5lcyhtZXJnZWRIdW5rLCBtaW5lQ3VycmVudC5vbGRTdGFydCwgbWluZUN1cnJlbnQubGluZXMsIHRoZWlyc0N1cnJlbnQub2xkU3RhcnQsIHRoZWlyc0N1cnJlbnQubGluZXMpO1xuICAgICAgICB0aGVpcnNJbmRleCsrO1xuICAgICAgICBtaW5lSW5kZXgrKztcbiAgICAgICAgcmV0Lmh1bmtzLnB1c2gobWVyZ2VkSHVuayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRQYXRjaChwYXJhbSwgYmFzZSkge1xuICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoL15AQC9tLnRlc3QocGFyYW0pIHx8IC9eSW5kZXg6L20udGVzdChwYXJhbSkpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlUGF0Y2gocGFyYW0pWzBdO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWJhc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBiYXNlIHJlZmVyZW5jZSBvciBwYXNzIGluIGEgcGF0Y2gnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0cnVjdHVyZWRQYXRjaCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgYmFzZSwgcGFyYW0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVOYW1lQ2hhbmdlZChwYXRjaCkge1xuICAgIHJldHVybiBwYXRjaC5uZXdGaWxlTmFtZSAmJiBwYXRjaC5uZXdGaWxlTmFtZSAhPT0gcGF0Y2gub2xkRmlsZU5hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RGaWVsZChpbmRleCwgbWluZSwgdGhlaXJzKSB7XG4gICAgaWYgKG1pbmUgPT09IHRoZWlycykge1xuICAgICAgcmV0dXJuIG1pbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4LmNvbmZsaWN0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbmU6IG1pbmUsXG4gICAgICAgIHRoZWlyczogdGhlaXJzXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGh1bmtCZWZvcmUodGVzdCwgY2hlY2spIHtcbiAgICByZXR1cm4gdGVzdC5vbGRTdGFydCA8IGNoZWNrLm9sZFN0YXJ0ICYmIHRlc3Qub2xkU3RhcnQgKyB0ZXN0Lm9sZExpbmVzIDwgY2hlY2sub2xkU3RhcnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZUh1bmsoaHVuaywgb2Zmc2V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9sZFN0YXJ0OiBodW5rLm9sZFN0YXJ0LFxuICAgICAgb2xkTGluZXM6IGh1bmsub2xkTGluZXMsXG4gICAgICBuZXdTdGFydDogaHVuay5uZXdTdGFydCArIG9mZnNldCxcbiAgICAgIG5ld0xpbmVzOiBodW5rLm5ld0xpbmVzLFxuICAgICAgbGluZXM6IGh1bmsubGluZXNcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VMaW5lcyhodW5rLCBtaW5lT2Zmc2V0LCBtaW5lTGluZXMsIHRoZWlyT2Zmc2V0LCB0aGVpckxpbmVzKSB7XG4gICAgLy8gVGhpcyB3aWxsIGdlbmVyYWxseSByZXN1bHQgaW4gYSBjb25mbGljdGVkIGh1bmssIGJ1dCB0aGVyZSBhcmUgY2FzZXMgd2hlcmUgdGhlIGNvbnRleHRcbiAgICAvLyBpcyB0aGUgb25seSBvdmVybGFwIHdoZXJlIHdlIGNhbiBzdWNjZXNzZnVsbHkgbWVyZ2UgdGhlIGNvbnRlbnQgaGVyZS5cbiAgICB2YXIgbWluZSA9IHtcbiAgICAgIG9mZnNldDogbWluZU9mZnNldCxcbiAgICAgIGxpbmVzOiBtaW5lTGluZXMsXG4gICAgICBpbmRleDogMFxuICAgIH0sXG4gICAgICAgIHRoZWlyID0ge1xuICAgICAgb2Zmc2V0OiB0aGVpck9mZnNldCxcbiAgICAgIGxpbmVzOiB0aGVpckxpbmVzLFxuICAgICAgaW5kZXg6IDBcbiAgICB9OyAvLyBIYW5kbGUgYW55IGxlYWRpbmcgY29udGVudFxuXG4gICAgaW5zZXJ0TGVhZGluZyhodW5rLCBtaW5lLCB0aGVpcik7XG4gICAgaW5zZXJ0TGVhZGluZyhodW5rLCB0aGVpciwgbWluZSk7IC8vIE5vdyBpbiB0aGUgb3ZlcmxhcCBjb250ZW50LiBTY2FuIHRocm91Z2ggYW5kIHNlbGVjdCB0aGUgYmVzdCBjaGFuZ2VzIGZyb20gZWFjaC5cblxuICAgIHdoaWxlIChtaW5lLmluZGV4IDwgbWluZS5saW5lcy5sZW5ndGggJiYgdGhlaXIuaW5kZXggPCB0aGVpci5saW5lcy5sZW5ndGgpIHtcbiAgICAgIHZhciBtaW5lQ3VycmVudCA9IG1pbmUubGluZXNbbWluZS5pbmRleF0sXG4gICAgICAgICAgdGhlaXJDdXJyZW50ID0gdGhlaXIubGluZXNbdGhlaXIuaW5kZXhdO1xuXG4gICAgICBpZiAoKG1pbmVDdXJyZW50WzBdID09PSAnLScgfHwgbWluZUN1cnJlbnRbMF0gPT09ICcrJykgJiYgKHRoZWlyQ3VycmVudFswXSA9PT0gJy0nIHx8IHRoZWlyQ3VycmVudFswXSA9PT0gJysnKSkge1xuICAgICAgICAvLyBCb3RoIG1vZGlmaWVkIC4uLlxuICAgICAgICBtdXR1YWxDaGFuZ2UoaHVuaywgbWluZSwgdGhlaXIpO1xuICAgICAgfSBlbHNlIGlmIChtaW5lQ3VycmVudFswXSA9PT0gJysnICYmIHRoZWlyQ3VycmVudFswXSA9PT0gJyAnKSB7XG4gICAgICAgIHZhciBfaHVuayRsaW5lcztcblxuICAgICAgICAvLyBNaW5lIGluc2VydGVkXG4gICAgICAgIChfaHVuayRsaW5lcyA9IGh1bmsubGluZXMpLnB1c2guYXBwbHkoX2h1bmskbGluZXMsIF90b0NvbnN1bWFibGVBcnJheShjb2xsZWN0Q2hhbmdlKG1pbmUpKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoZWlyQ3VycmVudFswXSA9PT0gJysnICYmIG1pbmVDdXJyZW50WzBdID09PSAnICcpIHtcbiAgICAgICAgdmFyIF9odW5rJGxpbmVzMjtcblxuICAgICAgICAvLyBUaGVpcnMgaW5zZXJ0ZWRcbiAgICAgICAgKF9odW5rJGxpbmVzMiA9IGh1bmsubGluZXMpLnB1c2guYXBwbHkoX2h1bmskbGluZXMyLCBfdG9Db25zdW1hYmxlQXJyYXkoY29sbGVjdENoYW5nZSh0aGVpcikpKTtcbiAgICAgIH0gZWxzZSBpZiAobWluZUN1cnJlbnRbMF0gPT09ICctJyAmJiB0aGVpckN1cnJlbnRbMF0gPT09ICcgJykge1xuICAgICAgICAvLyBNaW5lIHJlbW92ZWQgb3IgZWRpdGVkXG4gICAgICAgIHJlbW92YWwoaHVuaywgbWluZSwgdGhlaXIpO1xuICAgICAgfSBlbHNlIGlmICh0aGVpckN1cnJlbnRbMF0gPT09ICctJyAmJiBtaW5lQ3VycmVudFswXSA9PT0gJyAnKSB7XG4gICAgICAgIC8vIFRoZWlyIHJlbW92ZWQgb3IgZWRpdGVkXG4gICAgICAgIHJlbW92YWwoaHVuaywgdGhlaXIsIG1pbmUsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChtaW5lQ3VycmVudCA9PT0gdGhlaXJDdXJyZW50KSB7XG4gICAgICAgIC8vIENvbnRleHQgaWRlbnRpdHlcbiAgICAgICAgaHVuay5saW5lcy5wdXNoKG1pbmVDdXJyZW50KTtcbiAgICAgICAgbWluZS5pbmRleCsrO1xuICAgICAgICB0aGVpci5pbmRleCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ29udGV4dCBtaXNtYXRjaFxuICAgICAgICBjb25mbGljdChodW5rLCBjb2xsZWN0Q2hhbmdlKG1pbmUpLCBjb2xsZWN0Q2hhbmdlKHRoZWlyKSk7XG4gICAgICB9XG4gICAgfSAvLyBOb3cgcHVzaCBhbnl0aGluZyB0aGF0IG1heSBiZSByZW1haW5pbmdcblxuXG4gICAgaW5zZXJ0VHJhaWxpbmcoaHVuaywgbWluZSk7XG4gICAgaW5zZXJ0VHJhaWxpbmcoaHVuaywgdGhlaXIpO1xuICAgIGNhbGNMaW5lQ291bnQoaHVuayk7XG4gIH1cblxuICBmdW5jdGlvbiBtdXR1YWxDaGFuZ2UoaHVuaywgbWluZSwgdGhlaXIpIHtcbiAgICB2YXIgbXlDaGFuZ2VzID0gY29sbGVjdENoYW5nZShtaW5lKSxcbiAgICAgICAgdGhlaXJDaGFuZ2VzID0gY29sbGVjdENoYW5nZSh0aGVpcik7XG5cbiAgICBpZiAoYWxsUmVtb3ZlcyhteUNoYW5nZXMpICYmIGFsbFJlbW92ZXModGhlaXJDaGFuZ2VzKSkge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciByZW1vdmUgY2hhbmdlcyB0aGF0IGFyZSBzdXBlcnNldHMgb2Ygb25lIGFub3RoZXJcbiAgICAgIGlmIChhcnJheVN0YXJ0c1dpdGgobXlDaGFuZ2VzLCB0aGVpckNoYW5nZXMpICYmIHNraXBSZW1vdmVTdXBlcnNldCh0aGVpciwgbXlDaGFuZ2VzLCBteUNoYW5nZXMubGVuZ3RoIC0gdGhlaXJDaGFuZ2VzLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIF9odW5rJGxpbmVzMztcblxuICAgICAgICAoX2h1bmskbGluZXMzID0gaHVuay5saW5lcykucHVzaC5hcHBseShfaHVuayRsaW5lczMsIF90b0NvbnN1bWFibGVBcnJheShteUNoYW5nZXMpKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKGFycmF5U3RhcnRzV2l0aCh0aGVpckNoYW5nZXMsIG15Q2hhbmdlcykgJiYgc2tpcFJlbW92ZVN1cGVyc2V0KG1pbmUsIHRoZWlyQ2hhbmdlcywgdGhlaXJDaGFuZ2VzLmxlbmd0aCAtIG15Q2hhbmdlcy5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBfaHVuayRsaW5lczQ7XG5cbiAgICAgICAgKF9odW5rJGxpbmVzNCA9IGh1bmsubGluZXMpLnB1c2guYXBwbHkoX2h1bmskbGluZXM0LCBfdG9Db25zdW1hYmxlQXJyYXkodGhlaXJDaGFuZ2VzKSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJyYXlFcXVhbChteUNoYW5nZXMsIHRoZWlyQ2hhbmdlcykpIHtcbiAgICAgIHZhciBfaHVuayRsaW5lczU7XG5cbiAgICAgIChfaHVuayRsaW5lczUgPSBodW5rLmxpbmVzKS5wdXNoLmFwcGx5KF9odW5rJGxpbmVzNSwgX3RvQ29uc3VtYWJsZUFycmF5KG15Q2hhbmdlcykpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uZmxpY3QoaHVuaywgbXlDaGFuZ2VzLCB0aGVpckNoYW5nZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZhbChodW5rLCBtaW5lLCB0aGVpciwgc3dhcCkge1xuICAgIHZhciBteUNoYW5nZXMgPSBjb2xsZWN0Q2hhbmdlKG1pbmUpLFxuICAgICAgICB0aGVpckNoYW5nZXMgPSBjb2xsZWN0Q29udGV4dCh0aGVpciwgbXlDaGFuZ2VzKTtcblxuICAgIGlmICh0aGVpckNoYW5nZXMubWVyZ2VkKSB7XG4gICAgICB2YXIgX2h1bmskbGluZXM2O1xuXG4gICAgICAoX2h1bmskbGluZXM2ID0gaHVuay5saW5lcykucHVzaC5hcHBseShfaHVuayRsaW5lczYsIF90b0NvbnN1bWFibGVBcnJheSh0aGVpckNoYW5nZXMubWVyZ2VkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZsaWN0KGh1bmssIHN3YXAgPyB0aGVpckNoYW5nZXMgOiBteUNoYW5nZXMsIHN3YXAgPyBteUNoYW5nZXMgOiB0aGVpckNoYW5nZXMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZsaWN0KGh1bmssIG1pbmUsIHRoZWlyKSB7XG4gICAgaHVuay5jb25mbGljdCA9IHRydWU7XG4gICAgaHVuay5saW5lcy5wdXNoKHtcbiAgICAgIGNvbmZsaWN0OiB0cnVlLFxuICAgICAgbWluZTogbWluZSxcbiAgICAgIHRoZWlyczogdGhlaXJcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydExlYWRpbmcoaHVuaywgaW5zZXJ0LCB0aGVpcikge1xuICAgIHdoaWxlIChpbnNlcnQub2Zmc2V0IDwgdGhlaXIub2Zmc2V0ICYmIGluc2VydC5pbmRleCA8IGluc2VydC5saW5lcy5sZW5ndGgpIHtcbiAgICAgIHZhciBsaW5lID0gaW5zZXJ0LmxpbmVzW2luc2VydC5pbmRleCsrXTtcbiAgICAgIGh1bmsubGluZXMucHVzaChsaW5lKTtcbiAgICAgIGluc2VydC5vZmZzZXQrKztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnNlcnRUcmFpbGluZyhodW5rLCBpbnNlcnQpIHtcbiAgICB3aGlsZSAoaW5zZXJ0LmluZGV4IDwgaW5zZXJ0LmxpbmVzLmxlbmd0aCkge1xuICAgICAgdmFyIGxpbmUgPSBpbnNlcnQubGluZXNbaW5zZXJ0LmluZGV4KytdO1xuICAgICAgaHVuay5saW5lcy5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbGxlY3RDaGFuZ2Uoc3RhdGUpIHtcbiAgICB2YXIgcmV0ID0gW10sXG4gICAgICAgIG9wZXJhdGlvbiA9IHN0YXRlLmxpbmVzW3N0YXRlLmluZGV4XVswXTtcblxuICAgIHdoaWxlIChzdGF0ZS5pbmRleCA8IHN0YXRlLmxpbmVzLmxlbmd0aCkge1xuICAgICAgdmFyIGxpbmUgPSBzdGF0ZS5saW5lc1tzdGF0ZS5pbmRleF07IC8vIEdyb3VwIGFkZGl0aW9ucyB0aGF0IGFyZSBpbW1lZGlhdGVseSBhZnRlciBzdWJ0cmFjdGlvbnMgYW5kIHRyZWF0IHRoZW0gYXMgb25lIFwiYXRvbWljXCIgbW9kaWZ5IGNoYW5nZS5cblxuICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJy0nICYmIGxpbmVbMF0gPT09ICcrJykge1xuICAgICAgICBvcGVyYXRpb24gPSAnKyc7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcGVyYXRpb24gPT09IGxpbmVbMF0pIHtcbiAgICAgICAgcmV0LnB1c2gobGluZSk7XG4gICAgICAgIHN0YXRlLmluZGV4Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgZnVuY3Rpb24gY29sbGVjdENvbnRleHQoc3RhdGUsIG1hdGNoQ2hhbmdlcykge1xuICAgIHZhciBjaGFuZ2VzID0gW10sXG4gICAgICAgIG1lcmdlZCA9IFtdLFxuICAgICAgICBtYXRjaEluZGV4ID0gMCxcbiAgICAgICAgY29udGV4dENoYW5nZXMgPSBmYWxzZSxcbiAgICAgICAgY29uZmxpY3RlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKG1hdGNoSW5kZXggPCBtYXRjaENoYW5nZXMubGVuZ3RoICYmIHN0YXRlLmluZGV4IDwgc3RhdGUubGluZXMubGVuZ3RoKSB7XG4gICAgICB2YXIgY2hhbmdlID0gc3RhdGUubGluZXNbc3RhdGUuaW5kZXhdLFxuICAgICAgICAgIG1hdGNoID0gbWF0Y2hDaGFuZ2VzW21hdGNoSW5kZXhdOyAvLyBPbmNlIHdlJ3ZlIGhpdCBvdXIgYWRkLCB0aGVuIHdlIGFyZSBkb25lXG5cbiAgICAgIGlmIChtYXRjaFswXSA9PT0gJysnKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Q2hhbmdlcyA9IGNvbnRleHRDaGFuZ2VzIHx8IGNoYW5nZVswXSAhPT0gJyAnO1xuICAgICAgbWVyZ2VkLnB1c2gobWF0Y2gpO1xuICAgICAgbWF0Y2hJbmRleCsrOyAvLyBDb25zdW1lIGFueSBhZGRpdGlvbnMgaW4gdGhlIG90aGVyIGJsb2NrIGFzIGEgY29uZmxpY3QgdG8gYXR0ZW1wdFxuICAgICAgLy8gdG8gcHVsbCBpbiB0aGUgcmVtYWluaW5nIGNvbnRleHQgYWZ0ZXIgdGhpc1xuXG4gICAgICBpZiAoY2hhbmdlWzBdID09PSAnKycpIHtcbiAgICAgICAgY29uZmxpY3RlZCA9IHRydWU7XG5cbiAgICAgICAgd2hpbGUgKGNoYW5nZVswXSA9PT0gJysnKSB7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKGNoYW5nZSk7XG4gICAgICAgICAgY2hhbmdlID0gc3RhdGUubGluZXNbKytzdGF0ZS5pbmRleF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1hdGNoLnN1YnN0cigxKSA9PT0gY2hhbmdlLnN1YnN0cigxKSkge1xuICAgICAgICBjaGFuZ2VzLnB1c2goY2hhbmdlKTtcbiAgICAgICAgc3RhdGUuaW5kZXgrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmZsaWN0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgobWF0Y2hDaGFuZ2VzW21hdGNoSW5kZXhdIHx8ICcnKVswXSA9PT0gJysnICYmIGNvbnRleHRDaGFuZ2VzKSB7XG4gICAgICBjb25mbGljdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmxpY3RlZCkge1xuICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgfVxuXG4gICAgd2hpbGUgKG1hdGNoSW5kZXggPCBtYXRjaENoYW5nZXMubGVuZ3RoKSB7XG4gICAgICBtZXJnZWQucHVzaChtYXRjaENoYW5nZXNbbWF0Y2hJbmRleCsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1lcmdlZDogbWVyZ2VkLFxuICAgICAgY2hhbmdlczogY2hhbmdlc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBhbGxSZW1vdmVzKGNoYW5nZXMpIHtcbiAgICByZXR1cm4gY2hhbmdlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGNoYW5nZSkge1xuICAgICAgcmV0dXJuIHByZXYgJiYgY2hhbmdlWzBdID09PSAnLSc7XG4gICAgfSwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBza2lwUmVtb3ZlU3VwZXJzZXQoc3RhdGUsIHJlbW92ZUNoYW5nZXMsIGRlbHRhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWx0YTsgaSsrKSB7XG4gICAgICB2YXIgY2hhbmdlQ29udGVudCA9IHJlbW92ZUNoYW5nZXNbcmVtb3ZlQ2hhbmdlcy5sZW5ndGggLSBkZWx0YSArIGldLnN1YnN0cigxKTtcblxuICAgICAgaWYgKHN0YXRlLmxpbmVzW3N0YXRlLmluZGV4ICsgaV0gIT09ICcgJyArIGNoYW5nZUNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRlLmluZGV4ICs9IGRlbHRhO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY09sZE5ld0xpbmVDb3VudChsaW5lcykge1xuICAgIHZhciBvbGRMaW5lcyA9IDA7XG4gICAgdmFyIG5ld0xpbmVzID0gMDtcbiAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICBpZiAodHlwZW9mIGxpbmUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBteUNvdW50ID0gY2FsY09sZE5ld0xpbmVDb3VudChsaW5lLm1pbmUpO1xuICAgICAgICB2YXIgdGhlaXJDb3VudCA9IGNhbGNPbGROZXdMaW5lQ291bnQobGluZS50aGVpcnMpO1xuXG4gICAgICAgIGlmIChvbGRMaW5lcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKG15Q291bnQub2xkTGluZXMgPT09IHRoZWlyQ291bnQub2xkTGluZXMpIHtcbiAgICAgICAgICAgIG9sZExpbmVzICs9IG15Q291bnQub2xkTGluZXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9sZExpbmVzID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdMaW5lcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKG15Q291bnQubmV3TGluZXMgPT09IHRoZWlyQ291bnQubmV3TGluZXMpIHtcbiAgICAgICAgICAgIG5ld0xpbmVzICs9IG15Q291bnQubmV3TGluZXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0xpbmVzID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG5ld0xpbmVzICE9PSB1bmRlZmluZWQgJiYgKGxpbmVbMF0gPT09ICcrJyB8fCBsaW5lWzBdID09PSAnICcpKSB7XG4gICAgICAgICAgbmV3TGluZXMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbGRMaW5lcyAhPT0gdW5kZWZpbmVkICYmIChsaW5lWzBdID09PSAnLScgfHwgbGluZVswXSA9PT0gJyAnKSkge1xuICAgICAgICAgIG9sZExpbmVzKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgb2xkTGluZXM6IG9sZExpbmVzLFxuICAgICAgbmV3TGluZXM6IG5ld0xpbmVzXG4gICAgfTtcbiAgfVxuXG4gIC8vIFNlZTogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1kaWZmLW1hdGNoLXBhdGNoL3dpa2kvQVBJXG4gIGZ1bmN0aW9uIGNvbnZlcnRDaGFuZ2VzVG9ETVAoY2hhbmdlcykge1xuICAgIHZhciByZXQgPSBbXSxcbiAgICAgICAgY2hhbmdlLFxuICAgICAgICBvcGVyYXRpb247XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYW5nZSA9IGNoYW5nZXNbaV07XG5cbiAgICAgIGlmIChjaGFuZ2UuYWRkZWQpIHtcbiAgICAgICAgb3BlcmF0aW9uID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbmdlLnJlbW92ZWQpIHtcbiAgICAgICAgb3BlcmF0aW9uID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGVyYXRpb24gPSAwO1xuICAgICAgfVxuXG4gICAgICByZXQucHVzaChbb3BlcmF0aW9uLCBjaGFuZ2UudmFsdWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydENoYW5nZXNUb1hNTChjaGFuZ2VzKSB7XG4gICAgdmFyIHJldCA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hhbmdlID0gY2hhbmdlc1tpXTtcblxuICAgICAgaWYgKGNoYW5nZS5hZGRlZCkge1xuICAgICAgICByZXQucHVzaCgnPGlucz4nKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbmdlLnJlbW92ZWQpIHtcbiAgICAgICAgcmV0LnB1c2goJzxkZWw+Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldC5wdXNoKGVzY2FwZUhUTUwoY2hhbmdlLnZhbHVlKSk7XG5cbiAgICAgIGlmIChjaGFuZ2UuYWRkZWQpIHtcbiAgICAgICAgcmV0LnB1c2goJzwvaW5zPicpO1xuICAgICAgfSBlbHNlIGlmIChjaGFuZ2UucmVtb3ZlZCkge1xuICAgICAgICByZXQucHVzaCgnPC9kZWw+Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldC5qb2luKCcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZUhUTUwocykge1xuICAgIHZhciBuID0gcztcbiAgICBuID0gbi5yZXBsYWNlKC8mL2csICcmYW1wOycpO1xuICAgIG4gPSBuLnJlcGxhY2UoLzwvZywgJyZsdDsnKTtcbiAgICBuID0gbi5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gICAgbiA9IG4ucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICAgIHJldHVybiBuO1xuICB9XG5cbiAgLyogU2VlIExJQ0VOU0UgZmlsZSBmb3IgdGVybXMgb2YgdXNlICovXG5cbiAgZXhwb3J0cy5EaWZmID0gRGlmZjtcbiAgZXhwb3J0cy5kaWZmQ2hhcnMgPSBkaWZmQ2hhcnM7XG4gIGV4cG9ydHMuZGlmZldvcmRzID0gZGlmZldvcmRzO1xuICBleHBvcnRzLmRpZmZXb3Jkc1dpdGhTcGFjZSA9IGRpZmZXb3Jkc1dpdGhTcGFjZTtcbiAgZXhwb3J0cy5kaWZmTGluZXMgPSBkaWZmTGluZXM7XG4gIGV4cG9ydHMuZGlmZlRyaW1tZWRMaW5lcyA9IGRpZmZUcmltbWVkTGluZXM7XG4gIGV4cG9ydHMuZGlmZlNlbnRlbmNlcyA9IGRpZmZTZW50ZW5jZXM7XG4gIGV4cG9ydHMuZGlmZkNzcyA9IGRpZmZDc3M7XG4gIGV4cG9ydHMuZGlmZkpzb24gPSBkaWZmSnNvbjtcbiAgZXhwb3J0cy5kaWZmQXJyYXlzID0gZGlmZkFycmF5cztcbiAgZXhwb3J0cy5zdHJ1Y3R1cmVkUGF0Y2ggPSBzdHJ1Y3R1cmVkUGF0Y2g7XG4gIGV4cG9ydHMuY3JlYXRlVHdvRmlsZXNQYXRjaCA9IGNyZWF0ZVR3b0ZpbGVzUGF0Y2g7XG4gIGV4cG9ydHMuY3JlYXRlUGF0Y2ggPSBjcmVhdGVQYXRjaDtcbiAgZXhwb3J0cy5hcHBseVBhdGNoID0gYXBwbHlQYXRjaDtcbiAgZXhwb3J0cy5hcHBseVBhdGNoZXMgPSBhcHBseVBhdGNoZXM7XG4gIGV4cG9ydHMucGFyc2VQYXRjaCA9IHBhcnNlUGF0Y2g7XG4gIGV4cG9ydHMubWVyZ2UgPSBtZXJnZTtcbiAgZXhwb3J0cy5jb252ZXJ0Q2hhbmdlc1RvRE1QID0gY29udmVydENoYW5nZXNUb0RNUDtcbiAgZXhwb3J0cy5jb252ZXJ0Q2hhbmdlc1RvWE1MID0gY29udmVydENoYW5nZXNUb1hNTDtcbiAgZXhwb3J0cy5jYW5vbmljYWxpemUgPSBjYW5vbmljYWxpemU7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmQ7XG5cbi8qXG4gIHZhciBvYmogPSB7YTogMywgYjogNX07XG4gIGV4dGVuZChvYmosIHthOiA0LCBjOiA4fSk7IC8vIHthOiA0LCBiOiA1LCBjOiA4fVxuICBvYmo7IC8vIHthOiA0LCBiOiA1LCBjOiA4fVxuXG4gIHZhciBvYmogPSB7YTogMywgYjogNX07XG4gIGV4dGVuZCh7fSwgb2JqLCB7YTogNCwgYzogOH0pOyAvLyB7YTogNCwgYjogNSwgYzogOH1cbiAgb2JqOyAvLyB7YTogMywgYjogNX1cblxuICB2YXIgYXJyID0gWzEsIDIsIDNdO1xuICB2YXIgb2JqID0ge2E6IDMsIGI6IDV9O1xuICBleHRlbmQob2JqLCB7YzogYXJyfSk7IC8vIHthOiAzLCBiOiA1LCBjOiBbMSwgMiwgM119XG4gIGFyci5wdXNoKDQpO1xuICBvYmo7IC8vIHthOiAzLCBiOiA1LCBjOiBbMSwgMiwgMywgNF19XG5cbiAgdmFyIGFyciA9IFsxLCAyLCAzXTtcbiAgdmFyIG9iaiA9IHthOiAzLCBiOiA1fTtcbiAgZXh0ZW5kKHRydWUsIG9iaiwge2M6IGFycn0pOyAvLyB7YTogMywgYjogNSwgYzogWzEsIDIsIDNdfVxuICBhcnIucHVzaCg0KTtcbiAgb2JqOyAvLyB7YTogMywgYjogNSwgYzogWzEsIDIsIDNdfVxuXG4gIGV4dGVuZCh7YTogNCwgYjogNX0pOyAvLyB7YTogNCwgYjogNX1cbiAgZXh0ZW5kKHthOiA0LCBiOiA1fSwgMyk7IHthOiA0LCBiOiA1fVxuICBleHRlbmQoe2E6IDQsIGI6IDV9LCB0cnVlKTsge2E6IDQsIGI6IDV9XG4gIGV4dGVuZCgnaGVsbG8nLCB7YTogNCwgYjogNX0pOyAvLyB0aHJvd3NcbiAgZXh0ZW5kKDMsIHthOiA0LCBiOiA1fSk7IC8vIHRocm93c1xuKi9cblxuZnVuY3Rpb24gZXh0ZW5kKC8qIFtkZWVwXSwgb2JqMSwgb2JqMiwgW29iam5dICovKSB7XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICB2YXIgZGVlcCA9IGZhbHNlO1xuICBpZiAodHlwZW9mIGFyZ3NbMF0gPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZGVlcCA9IGFyZ3Muc2hpZnQoKTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gYXJnc1swXTtcbiAgaWYgKCFyZXN1bHQgfHwgKHR5cGVvZiByZXN1bHQgIT0gJ29iamVjdCcgJiYgdHlwZW9mIHJlc3VsdCAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZXh0ZW5kZWUgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuICB2YXIgZXh0ZW5kZXJzID0gYXJncy5zbGljZSgxKTtcbiAgdmFyIGxlbiA9IGV4dGVuZGVycy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgZXh0ZW5kZXIgPSBleHRlbmRlcnNbaV07XG4gICAgZm9yICh2YXIga2V5IGluIGV4dGVuZGVyKSB7XG4gICAgICBpZiAoZXh0ZW5kZXIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBleHRlbmRlcltrZXldO1xuICAgICAgICBpZiAoZGVlcCAmJiBpc0Nsb25lYWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YXIgYmFzZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gW10gOiB7fTtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGV4dGVuZCh0cnVlLCByZXN1bHQuaGFzT3duUHJvcGVydHkoa2V5KSA/IHJlc3VsdFtrZXldIDogYmFzZSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaXNDbG9uZWFibGUob2JqKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KG9iaikgfHwge30udG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC8sXG4gICAgcmVMZWFkaW5nRG90ID0gL15cXC4vLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplKGZ1bmN0aW9uKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHJlTGVhZGluZ0RvdC50ZXN0KHN0cmluZykpIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBBc3NpZ24gY2FjaGUgdG8gYF8ubWVtb2l6ZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnbG9iYWxPYmplY3QgPSByZXF1aXJlKFwiQHNpbm9uanMvY29tbW9uc1wiKS5nbG9iYWw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiB3aXRoR2xvYmFsKF9nbG9iYWwpIHtcbiAgICB2YXIgdXNlckFnZW50ID0gX2dsb2JhbC5uYXZpZ2F0b3IgJiYgX2dsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIHZhciBpc1J1bm5pbmdJbklFID0gdXNlckFnZW50ICYmIHVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRSBcIikgPiAtMTtcbiAgICB2YXIgbWF4VGltZW91dCA9IE1hdGgucG93KDIsIDMxKSAtIDE7IC8vc2VlIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2Fic3RyYWN0LW9wZGVmLWNvbnZlcnR0b2ludFxuICAgIHZhciBOT09QID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICB2YXIgTk9PUF9BUlJBWSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfTtcbiAgICB2YXIgdGltZW91dFJlc3VsdCA9IF9nbG9iYWwuc2V0VGltZW91dChOT09QLCAwKTtcbiAgICB2YXIgYWRkVGltZXJSZXR1cm5zT2JqZWN0ID0gdHlwZW9mIHRpbWVvdXRSZXN1bHQgPT09IFwib2JqZWN0XCI7XG4gICAgdmFyIGhydGltZVByZXNlbnQgPVxuICAgICAgICBfZ2xvYmFsLnByb2Nlc3MgJiYgdHlwZW9mIF9nbG9iYWwucHJvY2Vzcy5ocnRpbWUgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB2YXIgaHJ0aW1lQmlnaW50UHJlc2VudCA9XG4gICAgICAgIGhydGltZVByZXNlbnQgJiYgdHlwZW9mIF9nbG9iYWwucHJvY2Vzcy5ocnRpbWUuYmlnaW50ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgdmFyIG5leHRUaWNrUHJlc2VudCA9XG4gICAgICAgIF9nbG9iYWwucHJvY2VzcyAmJiB0eXBlb2YgX2dsb2JhbC5wcm9jZXNzLm5leHRUaWNrID09PSBcImZ1bmN0aW9uXCI7XG4gICAgdmFyIHBlcmZvcm1hbmNlUHJlc2VudCA9XG4gICAgICAgIF9nbG9iYWwucGVyZm9ybWFuY2UgJiYgdHlwZW9mIF9nbG9iYWwucGVyZm9ybWFuY2Uubm93ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgdmFyIGhhc1BlcmZvcm1hbmNlUHJvdG90eXBlID1cbiAgICAgICAgX2dsb2JhbC5QZXJmb3JtYW5jZSAmJlxuICAgICAgICAodHlwZW9mIF9nbG9iYWwuUGVyZm9ybWFuY2UpLm1hdGNoKC9eKGZ1bmN0aW9ufG9iamVjdCkkLyk7XG4gICAgdmFyIHF1ZXVlTWljcm90YXNrUHJlc2VudCA9IF9nbG9iYWwuaGFzT3duUHJvcGVydHkoXCJxdWV1ZU1pY3JvdGFza1wiKTtcbiAgICB2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJlc2VudCA9XG4gICAgICAgIF9nbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAgIHR5cGVvZiBfZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIHZhciBjYW5jZWxBbmltYXRpb25GcmFtZVByZXNlbnQgPVxuICAgICAgICBfZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAgIHR5cGVvZiBfZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lID09PSBcImZ1bmN0aW9uXCI7XG4gICAgdmFyIHJlcXVlc3RJZGxlQ2FsbGJhY2tQcmVzZW50ID1cbiAgICAgICAgX2dsb2JhbC5yZXF1ZXN0SWRsZUNhbGxiYWNrICYmXG4gICAgICAgIHR5cGVvZiBfZ2xvYmFsLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB2YXIgY2FuY2VsSWRsZUNhbGxiYWNrUHJlc2VudCA9XG4gICAgICAgIF9nbG9iYWwuY2FuY2VsSWRsZUNhbGxiYWNrICYmXG4gICAgICAgIHR5cGVvZiBfZ2xvYmFsLmNhbmNlbElkbGVDYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiO1xuICAgIHZhciBzZXRJbW1lZGlhdGVQcmVzZW50ID1cbiAgICAgICAgX2dsb2JhbC5zZXRJbW1lZGlhdGUgJiYgdHlwZW9mIF9nbG9iYWwuc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCI7XG5cbiAgICAvLyBNYWtlIHByb3BlcnRpZXMgd3JpdGFibGUgaW4gSUUsIGFzIHBlclxuICAgIC8vIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tL1JlcGxhY2luZy1zZXRUaW1lb3V0LUdsb2JhbGx5Lmh0bWxcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1zZWxmLWFzc2lnbiAqL1xuICAgIGlmIChpc1J1bm5pbmdJbklFKSB7XG4gICAgICAgIF9nbG9iYWwuc2V0VGltZW91dCA9IF9nbG9iYWwuc2V0VGltZW91dDtcbiAgICAgICAgX2dsb2JhbC5jbGVhclRpbWVvdXQgPSBfZ2xvYmFsLmNsZWFyVGltZW91dDtcbiAgICAgICAgX2dsb2JhbC5zZXRJbnRlcnZhbCA9IF9nbG9iYWwuc2V0SW50ZXJ2YWw7XG4gICAgICAgIF9nbG9iYWwuY2xlYXJJbnRlcnZhbCA9IF9nbG9iYWwuY2xlYXJJbnRlcnZhbDtcbiAgICAgICAgX2dsb2JhbC5EYXRlID0gX2dsb2JhbC5EYXRlO1xuICAgIH1cblxuICAgIC8vIHNldEltbWVkaWF0ZSBpcyBub3QgYSBzdGFuZGFyZCBmdW5jdGlvblxuICAgIC8vIGF2b2lkIGFkZGluZyB0aGUgcHJvcCB0byB0aGUgd2luZG93IG9iamVjdCBpZiBub3QgcHJlc2VudFxuICAgIGlmIChzZXRJbW1lZGlhdGVQcmVzZW50KSB7XG4gICAgICAgIF9nbG9iYWwuc2V0SW1tZWRpYXRlID0gX2dsb2JhbC5zZXRJbW1lZGlhdGU7XG4gICAgICAgIF9nbG9iYWwuY2xlYXJJbW1lZGlhdGUgPSBfZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXNlbGYtYXNzaWduICovXG5cbiAgICBfZ2xvYmFsLmNsZWFyVGltZW91dCh0aW1lb3V0UmVzdWx0KTtcblxuICAgIHZhciBOYXRpdmVEYXRlID0gX2dsb2JhbC5EYXRlO1xuICAgIHZhciB1bmlxdWVUaW1lcklkID0gMTtcblxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyRmluaXRlKG51bSkge1xuICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKG51bSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG51bSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKG51bSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2Ugc3RyaW5ncyBsaWtlIFwiMDE6MTA6MDBcIiAobWVhbmluZyAxIGhvdXIsIDEwIG1pbnV0ZXMsIDAgc2Vjb25kcykgaW50b1xuICAgICAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMuIFRoaXMgaXMgdXNlZCB0byBzdXBwb3J0IGh1bWFuLXJlYWRhYmxlIHN0cmluZ3MgcGFzc2VkXG4gICAgICogdG8gY2xvY2sudGljaygpXG4gICAgICovXG4gICAgZnVuY3Rpb24gcGFyc2VUaW1lKHN0cikge1xuICAgICAgICBpZiAoIXN0cikge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RyaW5ncyA9IHN0ci5zcGxpdChcIjpcIik7XG4gICAgICAgIHZhciBsID0gc3RyaW5ncy5sZW5ndGg7XG4gICAgICAgIHZhciBpID0gbDtcbiAgICAgICAgdmFyIG1zID0gMDtcbiAgICAgICAgdmFyIHBhcnNlZDtcblxuICAgICAgICBpZiAobCA+IDMgfHwgIS9eKFxcZFxcZDopezAsMn1cXGRcXGQ/JC8udGVzdChzdHIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJ0aWNrIG9ubHkgdW5kZXJzdGFuZHMgbnVtYmVycywgJ206cycgYW5kICdoOm06cycuIEVhY2ggcGFydCBtdXN0IGJlIHR3byBkaWdpdHNcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZ3NbaV0sIDEwKTtcblxuICAgICAgICAgICAgaWYgKHBhcnNlZCA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGltZSBcIiArIHN0cik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1zICs9IHBhcnNlZCAqIE1hdGgucG93KDYwLCBsIC0gaSAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1zICogMTAwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRlY2ltYWwgcGFydCBvZiB0aGUgbWlsbGlzZWNvbmQgdmFsdWUgYXMgbmFub3NlY29uZHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtc0Zsb2F0IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG4gICAgICogQHJldHVybnMge051bWJlcn0gYW4gaW50ZWdlciBudW1iZXIgb2YgbmFub3NlY29uZHMgaW4gdGhlIHJhbmdlIFswLDFlNilcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6IG5hbm9SZW1haW5lcigxMjMuNDU2Nzg5KSAtPiA0NTY3ODlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBuYW5vUmVtYWluZGVyKG1zRmxvYXQpIHtcbiAgICAgICAgdmFyIG1vZHVsbyA9IDFlNjtcbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IChtc0Zsb2F0ICogMWU2KSAlIG1vZHVsbztcbiAgICAgICAgdmFyIHBvc2l0aXZlUmVtYWluZGVyID0gcmVtYWluZGVyIDwgMCA/IHJlbWFpbmRlciArIG1vZHVsbyA6IHJlbWFpbmRlcjtcblxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihwb3NpdGl2ZVJlbWFpbmRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBncm9rIHRoZSBgbm93YCBwYXJhbWV0ZXIgdG8gY3JlYXRlQ2xvY2suXG4gICAgICogQHBhcmFtIGVwb2NoIHtEYXRlfG51bWJlcn0gdGhlIHN5c3RlbSB0aW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RXBvY2goZXBvY2gpIHtcbiAgICAgICAgaWYgKCFlcG9jaCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBlcG9jaC5nZXRUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBlcG9jaC5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBlcG9jaCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGVwb2NoO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJub3cgc2hvdWxkIGJlIG1pbGxpc2Vjb25kcyBzaW5jZSBVTklYIGVwb2NoXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluUmFuZ2UoZnJvbSwgdG8sIHRpbWVyKSB7XG4gICAgICAgIHJldHVybiB0aW1lciAmJiB0aW1lci5jYWxsQXQgPj0gZnJvbSAmJiB0aW1lci5jYWxsQXQgPD0gdG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWlycm9yRGF0ZVByb3BlcnRpZXModGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgdmFyIHByb3A7XG4gICAgICAgIGZvciAocHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgc3BlY2lhbCBub3cgaW1wbGVtZW50YXRpb25cbiAgICAgICAgaWYgKHNvdXJjZS5ub3cpIHtcbiAgICAgICAgICAgIHRhcmdldC5ub3cgPSBmdW5jdGlvbiBub3coKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5jbG9jay5ub3c7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRhcmdldC5ub3c7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgc3BlY2lhbCB0b1NvdXJjZSBpbXBsZW1lbnRhdGlvblxuICAgICAgICBpZiAoc291cmNlLnRvU291cmNlKSB7XG4gICAgICAgICAgICB0YXJnZXQudG9Tb3VyY2UgPSBmdW5jdGlvbiB0b1NvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlLnRvU291cmNlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRhcmdldC50b1NvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCBzcGVjaWFsIHRvU3RyaW5nIGltcGxlbWVudGF0aW9uXG4gICAgICAgIHRhcmdldC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS50b1N0cmluZygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUgPSBzb3VyY2UucHJvdG90eXBlO1xuICAgICAgICB0YXJnZXQucGFyc2UgPSBzb3VyY2UucGFyc2U7XG4gICAgICAgIHRhcmdldC5VVEMgPSBzb3VyY2UuVVRDO1xuICAgICAgICB0YXJnZXQucHJvdG90eXBlLnRvVVRDU3RyaW5nID0gc291cmNlLnByb3RvdHlwZS50b1VUQ1N0cmluZztcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURhdGUoKSB7XG4gICAgICAgIGZ1bmN0aW9uIENsb2NrRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1zKSB7XG4gICAgICAgICAgICAvLyB0aGUgRGF0ZSBjb25zdHJ1Y3RvciBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgcmVmIEVjbWEtMjYyIEVkaXRpb24gNS4xLCBzZWN0aW9uIDE1LjkuMi5cbiAgICAgICAgICAgIC8vIFRoaXMgcmVtYWlucyBzbyBpbiB0aGUgMTB0aCBlZGl0aW9uIG9mIDIwMTkgYXMgd2VsbC5cbiAgICAgICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDbG9ja0RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXRpdmVEYXRlKENsb2NrRGF0ZS5jbG9jay5ub3cpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIERhdGUgaXMgY2FsbGVkIGFzIGEgY29uc3RydWN0b3Igd2l0aCAnbmV3JyBrZXl3b3JkXG4gICAgICAgICAgICAvLyBEZWZlbnNpdmUgYW5kIHZlcmJvc2UgdG8gYXZvaWQgcG90ZW50aWFsIGhhcm0gaW4gcGFzc2luZ1xuICAgICAgICAgICAgLy8gZXhwbGljaXQgdW5kZWZpbmVkIHdoZW4gdXNlciBkb2VzIG5vdCBwYXNzIGFyZ3VtZW50XG4gICAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTmF0aXZlRGF0ZShDbG9ja0RhdGUuY2xvY2subm93KTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTmF0aXZlRGF0ZSh5ZWFyKTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTmF0aXZlRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5hdGl2ZURhdGUoeWVhciwgbW9udGgsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXRpdmVEYXRlKHllYXIsIG1vbnRoLCBkYXRlLCBob3VyKTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTmF0aXZlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSwgaG91ciwgbWludXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTmF0aXZlRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOYXRpdmVEYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1pcnJvckRhdGVQcm9wZXJ0aWVzKENsb2NrRGF0ZSwgTmF0aXZlRGF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZUpvYihjbG9jaywgam9iKSB7XG4gICAgICAgIC8vIGVucXVldWVzIGEgbWljcm90aWNrLWRlZmVycmVkIHRhc2sgLSBlY21hMjYyLyNzZWMtZW5xdWV1ZWpvYlxuICAgICAgICBpZiAoIWNsb2NrLmpvYnMpIHtcbiAgICAgICAgICAgIGNsb2NrLmpvYnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBjbG9jay5qb2JzLnB1c2goam9iKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5Kb2JzKGNsb2NrKSB7XG4gICAgICAgIC8vIHJ1bnMgYWxsIG1pY3JvdGljay1kZWZlcnJlZCB0YXNrcyAtIGVjbWEyNjIvI3NlYy1ydW5qb2JzXG4gICAgICAgIGlmICghY2xvY2suam9icykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvY2suam9icy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGpvYiA9IGNsb2NrLmpvYnNbaV07XG4gICAgICAgICAgICBqb2IuZnVuYy5hcHBseShudWxsLCBqb2IuYXJncyk7XG4gICAgICAgICAgICBpZiAoY2xvY2subG9vcExpbWl0ICYmIGkgPiBjbG9jay5sb29wTGltaXQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiQWJvcnRpbmcgYWZ0ZXIgcnVubmluZyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9jay5sb29wTGltaXQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIgdGltZXJzLCBhc3N1bWluZyBhbiBpbmZpbml0ZSBsb29wIVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbG9jay5qb2JzID0gW107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGltZXIoY2xvY2ssIHRpbWVyKSB7XG4gICAgICAgIGlmICh0aW1lci5mdW5jID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIG11c3QgYmUgcHJvdmlkZWQgdG8gdGltZXIgY2FsbHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lci50eXBlID0gdGltZXIuaW1tZWRpYXRlID8gXCJJbW1lZGlhdGVcIiA6IFwiVGltZW91dFwiO1xuXG4gICAgICAgIGlmICh0aW1lci5oYXNPd25Qcm9wZXJ0eShcImRlbGF5XCIpKSB7XG4gICAgICAgICAgICBpZiAoIWlzTnVtYmVyRmluaXRlKHRpbWVyLmRlbGF5KSkge1xuICAgICAgICAgICAgICAgIHRpbWVyLmRlbGF5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVyLmRlbGF5ID0gdGltZXIuZGVsYXkgPiBtYXhUaW1lb3V0ID8gMSA6IHRpbWVyLmRlbGF5O1xuICAgICAgICAgICAgdGltZXIuZGVsYXkgPSBNYXRoLm1heCgwLCB0aW1lci5kZWxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZXIuaGFzT3duUHJvcGVydHkoXCJpbnRlcnZhbFwiKSkge1xuICAgICAgICAgICAgdGltZXIudHlwZSA9IFwiSW50ZXJ2YWxcIjtcbiAgICAgICAgICAgIHRpbWVyLmludGVydmFsID0gdGltZXIuaW50ZXJ2YWwgPiBtYXhUaW1lb3V0ID8gMSA6IHRpbWVyLmludGVydmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWVyLmhhc093blByb3BlcnR5KFwiYW5pbWF0aW9uXCIpKSB7XG4gICAgICAgICAgICB0aW1lci50eXBlID0gXCJBbmltYXRpb25GcmFtZVwiO1xuICAgICAgICAgICAgdGltZXIuYW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2xvY2sudGltZXJzKSB7XG4gICAgICAgICAgICBjbG9jay50aW1lcnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyLmlkID0gdW5pcXVlVGltZXJJZCsrO1xuICAgICAgICB0aW1lci5jcmVhdGVkQXQgPSBjbG9jay5ub3c7XG4gICAgICAgIHRpbWVyLmNhbGxBdCA9XG4gICAgICAgICAgICBjbG9jay5ub3cgKyAocGFyc2VJbnQodGltZXIuZGVsYXkpIHx8IChjbG9jay5kdXJpbmdUaWNrID8gMSA6IDApKTtcblxuICAgICAgICBjbG9jay50aW1lcnNbdGltZXIuaWRdID0gdGltZXI7XG5cbiAgICAgICAgaWYgKGFkZFRpbWVyUmV0dXJuc09iamVjdCkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgICAgICBpZDogdGltZXIuaWQsXG4gICAgICAgICAgICAgICAgcmVmOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVucmVmOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRpbWVyLmlkO1xuICAgIH1cblxuICAgIC8qIGVzbGludCBjb25zaXN0ZW50LXJldHVybjogXCJvZmZcIiAqL1xuICAgIGZ1bmN0aW9uIGNvbXBhcmVUaW1lcnMoYSwgYikge1xuICAgICAgICAvLyBTb3J0IGZpcnN0IGJ5IGFic29sdXRlIHRpbWluZ1xuICAgICAgICBpZiAoYS5jYWxsQXQgPCBiLmNhbGxBdCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLmNhbGxBdCA+IGIuY2FsbEF0KSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvcnQgbmV4dCBieSBpbW1lZGlhdGUsIGltbWVkaWF0ZSB0aW1lcnMgdGFrZSBwcmVjZWRlbmNlXG4gICAgICAgIGlmIChhLmltbWVkaWF0ZSAmJiAhYi5pbW1lZGlhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEuaW1tZWRpYXRlICYmIGIuaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvcnQgbmV4dCBieSBjcmVhdGlvbiB0aW1lLCBlYXJsaWVyLWNyZWF0ZWQgdGltZXJzIHRha2UgcHJlY2VkZW5jZVxuICAgICAgICBpZiAoYS5jcmVhdGVkQXQgPCBiLmNyZWF0ZWRBdCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLmNyZWF0ZWRBdCA+IGIuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvcnQgbmV4dCBieSBpZCwgbG93ZXItaWQgdGltZXJzIHRha2UgcHJlY2VkZW5jZVxuICAgICAgICBpZiAoYS5pZCA8IGIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYS5pZCA+IGIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXMgdGltZXIgaWRzIGFyZSB1bmlxdWUsIG5vIGZhbGxiYWNrIGAwYCBpcyBuZWNlc3NhcnlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJzdFRpbWVySW5SYW5nZShjbG9jaywgZnJvbSwgdG8pIHtcbiAgICAgICAgdmFyIHRpbWVycyA9IGNsb2NrLnRpbWVycztcbiAgICAgICAgdmFyIHRpbWVyID0gbnVsbDtcbiAgICAgICAgdmFyIGlkLCBpc0luUmFuZ2U7XG5cbiAgICAgICAgZm9yIChpZCBpbiB0aW1lcnMpIHtcbiAgICAgICAgICAgIGlmICh0aW1lcnMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICAgICAgICAgICAgaXNJblJhbmdlID0gaW5SYW5nZShmcm9tLCB0bywgdGltZXJzW2lkXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZSAmJlxuICAgICAgICAgICAgICAgICAgICAoIXRpbWVyIHx8IGNvbXBhcmVUaW1lcnModGltZXIsIHRpbWVyc1tpZF0pID09PSAxKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lciA9IHRpbWVyc1tpZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRpbWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpcnN0VGltZXIoY2xvY2spIHtcbiAgICAgICAgdmFyIHRpbWVycyA9IGNsb2NrLnRpbWVycztcbiAgICAgICAgdmFyIHRpbWVyID0gbnVsbDtcbiAgICAgICAgdmFyIGlkO1xuXG4gICAgICAgIGZvciAoaWQgaW4gdGltZXJzKSB7XG4gICAgICAgICAgICBpZiAodGltZXJzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGltZXIgfHwgY29tcGFyZVRpbWVycyh0aW1lciwgdGltZXJzW2lkXSkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZXIgPSB0aW1lcnNbaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aW1lcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXN0VGltZXIoY2xvY2spIHtcbiAgICAgICAgdmFyIHRpbWVycyA9IGNsb2NrLnRpbWVycztcbiAgICAgICAgdmFyIHRpbWVyID0gbnVsbDtcbiAgICAgICAgdmFyIGlkO1xuXG4gICAgICAgIGZvciAoaWQgaW4gdGltZXJzKSB7XG4gICAgICAgICAgICBpZiAodGltZXJzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGltZXIgfHwgY29tcGFyZVRpbWVycyh0aW1lciwgdGltZXJzW2lkXSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyID0gdGltZXJzW2lkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGltZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsbFRpbWVyKGNsb2NrLCB0aW1lcikge1xuICAgICAgICBpZiAodHlwZW9mIHRpbWVyLmludGVydmFsID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBjbG9jay50aW1lcnNbdGltZXIuaWRdLmNhbGxBdCArPSB0aW1lci5pbnRlcnZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjbG9jay50aW1lcnNbdGltZXIuaWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lci5mdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRpbWVyLmZ1bmMuYXBwbHkobnVsbCwgdGltZXIuYXJncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBlc2xpbnQgbm8tZXZhbDogXCJvZmZcIiAqL1xuICAgICAgICAgICAgZXZhbCh0aW1lci5mdW5jKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyVGltZXIoY2xvY2ssIHRpbWVySWQsIHR0eXBlKSB7XG4gICAgICAgIGlmICghdGltZXJJZCkge1xuICAgICAgICAgICAgLy8gbnVsbCBhcHBlYXJzIHRvIGJlIGFsbG93ZWQgaW4gbW9zdCBicm93c2VycywgYW5kIGFwcGVhcnMgdG8gYmVcbiAgICAgICAgICAgIC8vIHJlbGllZCB1cG9uIGJ5IHNvbWUgbGlicmFyaWVzLCBsaWtlIEJvb3RzdHJhcCBjYXJvdXNlbFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjbG9jay50aW1lcnMpIHtcbiAgICAgICAgICAgIGNsb2NrLnRpbWVycyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW4gTm9kZSwgdGltZXJJZCBpcyBhbiBvYmplY3Qgd2l0aCAucmVmKCkvLnVucmVmKCksIGFuZFxuICAgICAgICAvLyBpdHMgLmlkIGZpZWxkIGlzIHRoZSBhY3R1YWwgdGltZXIgaWQuXG4gICAgICAgIHZhciBpZCA9IHR5cGVvZiB0aW1lcklkID09PSBcIm9iamVjdFwiID8gdGltZXJJZC5pZCA6IHRpbWVySWQ7XG5cbiAgICAgICAgaWYgKGNsb2NrLnRpbWVycy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIHRoYXQgdGhlIElEIG1hdGNoZXMgYSB0aW1lciBvZiB0aGUgY29ycmVjdCB0eXBlXG4gICAgICAgICAgICB2YXIgdGltZXIgPSBjbG9jay50aW1lcnNbaWRdO1xuICAgICAgICAgICAgaWYgKHRpbWVyLnR5cGUgPT09IHR0eXBlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGNsb2NrLnRpbWVyc1tpZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjbGVhciA9XG4gICAgICAgICAgICAgICAgICAgIHR0eXBlID09PSBcIkFuaW1hdGlvbkZyYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJjYW5jZWxBbmltYXRpb25GcmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiY2xlYXJcIiArIHR0eXBlO1xuICAgICAgICAgICAgICAgIHZhciBzY2hlZHVsZSA9XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyLnR5cGUgPT09IFwiQW5pbWF0aW9uRnJhbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcInJlcXVlc3RBbmltYXRpb25GcmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwic2V0XCIgKyB0aW1lci50eXBlO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgXCJDYW5ub3QgY2xlYXIgdGltZXI6IHRpbWVyIGNyZWF0ZWQgd2l0aCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIigpIGJ1dCBjbGVhcmVkIHdpdGggXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIoKVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaW5zdGFsbChjbG9jaywgdGFyZ2V0LCBjb25maWcpIHtcbiAgICAgICAgdmFyIG1ldGhvZCwgaSwgbDtcbiAgICAgICAgdmFyIGluc3RhbGxlZEhyVGltZSA9IFwiX2hydGltZVwiO1xuICAgICAgICB2YXIgaW5zdGFsbGVkTmV4dFRpY2sgPSBcIl9uZXh0VGlja1wiO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBjbG9jay5tZXRob2RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbWV0aG9kID0gY2xvY2subWV0aG9kc1tpXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwiaHJ0aW1lXCIgJiYgdGFyZ2V0LnByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQucHJvY2Vzcy5ocnRpbWUgPSBjbG9ja1tpbnN0YWxsZWRIclRpbWVdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwibmV4dFRpY2tcIiAmJiB0YXJnZXQucHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wcm9jZXNzLm5leHRUaWNrID0gY2xvY2tbaW5zdGFsbGVkTmV4dFRpY2tdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicGVyZm9ybWFuY2VcIikge1xuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFBlcmZEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgICAgICAgICAgICAgY2xvY2ssXG4gICAgICAgICAgICAgICAgICAgIFwiX1wiICsgbWV0aG9kXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUGVyZkRlc2NyaXB0b3IgJiZcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQZXJmRGVzY3JpcHRvci5nZXQgJiZcbiAgICAgICAgICAgICAgICAgICAgIW9yaWdpbmFsUGVyZkRlc2NyaXB0b3Iuc2V0XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUGVyZkRlc2NyaXB0b3JcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9yaWdpbmFsUGVyZkRlc2NyaXB0b3IuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gY2xvY2tbXCJfXCIgKyBtZXRob2RdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFttZXRob2RdICYmIHRhcmdldFttZXRob2RdLmhhZE93blByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gY2xvY2tbXCJfXCIgKyBtZXRob2RdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QgPT09IFwiY2xlYXJJbnRlcnZhbFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuc2hvdWxkQWR2YW5jZVRpbWUgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXShjbG9jay5hdHRhY2hlZEludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGFyZ2V0W21ldGhvZF07XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50IG5vLWVtcHR5OiBcIm9mZlwiICovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmV2ZW50IG11bHRpcGxlIGV4ZWN1dGlvbnMgd2hpY2ggd2lsbCBjb21wbGV0ZWx5IHJlbW92ZSB0aGVzZSBwcm9wc1xuICAgICAgICBjbG9jay5tZXRob2RzID0gW107XG5cbiAgICAgICAgLy8gcmV0dXJuIHBlbmRpbmcgdGltZXJzLCB0byBlbmFibGUgY2hlY2tpbmcgd2hhdCB0aW1lcnMgcmVtYWluZWQgb24gdW5pbnN0YWxsXG4gICAgICAgIGlmICghY2xvY2sudGltZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNsb2NrLnRpbWVycykubWFwKGZ1bmN0aW9uIG1hcHBlcihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjbG9jay50aW1lcnNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlqYWNrTWV0aG9kKHRhcmdldCwgbWV0aG9kLCBjbG9jaykge1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgY2xvY2tbbWV0aG9kXS5oYWRPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICApO1xuICAgICAgICBjbG9ja1tcIl9cIiArIG1ldGhvZF0gPSB0YXJnZXRbbWV0aG9kXTtcblxuICAgICAgICBpZiAobWV0aG9kID09PSBcIkRhdGVcIikge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBtaXJyb3JEYXRlUHJvcGVydGllcyhjbG9ja1ttZXRob2RdLCB0YXJnZXRbbWV0aG9kXSk7XG4gICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IGRhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInBlcmZvcm1hbmNlXCIpIHtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFBlcmZEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gSlNET00gaGFzIGEgcmVhZCBvbmx5IHBlcmZvcm1hbmNlIGZpZWxkIHNvIHdlIGhhdmUgdG8gc2F2ZS9jb3B5IGl0IGRpZmZlcmVudGx5XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxQZXJmRGVzY3JpcHRvciAmJlxuICAgICAgICAgICAgICAgIG9yaWdpbmFsUGVyZkRlc2NyaXB0b3IuZ2V0ICYmXG4gICAgICAgICAgICAgICAgIW9yaWdpbmFsUGVyZkRlc2NyaXB0b3Iuc2V0XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgIGNsb2NrLFxuICAgICAgICAgICAgICAgICAgICBcIl9cIiArIG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQZXJmRGVzY3JpcHRvclxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGVyZkRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICAgICAgICAgICAgICBjbG9jayxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBtZXRob2QsIHBlcmZEZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBjbG9ja1ttZXRob2RdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvY2tbbWV0aG9kXS5hcHBseShjbG9jaywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAocHJvcCBpbiBjbG9ja1ttZXRob2RdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb2NrW21ldGhvZF0uaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF1bcHJvcF0gPSBjbG9ja1ttZXRob2RdW3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFttZXRob2RdLmNsb2NrID0gY2xvY2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9JbnRlcnZhbFRpY2soY2xvY2ssIGFkdmFuY2VUaW1lRGVsdGEpIHtcbiAgICAgICAgY2xvY2sudGljayhhZHZhbmNlVGltZURlbHRhKTtcbiAgICB9XG5cbiAgICB2YXIgdGltZXJzID0ge1xuICAgICAgICBzZXRUaW1lb3V0OiBfZ2xvYmFsLnNldFRpbWVvdXQsXG4gICAgICAgIGNsZWFyVGltZW91dDogX2dsb2JhbC5jbGVhclRpbWVvdXQsXG4gICAgICAgIHNldEludGVydmFsOiBfZ2xvYmFsLnNldEludGVydmFsLFxuICAgICAgICBjbGVhckludGVydmFsOiBfZ2xvYmFsLmNsZWFySW50ZXJ2YWwsXG4gICAgICAgIERhdGU6IF9nbG9iYWwuRGF0ZVxuICAgIH07XG5cbiAgICBpZiAoc2V0SW1tZWRpYXRlUHJlc2VudCkge1xuICAgICAgICB0aW1lcnMuc2V0SW1tZWRpYXRlID0gX2dsb2JhbC5zZXRJbW1lZGlhdGU7XG4gICAgICAgIHRpbWVycy5jbGVhckltbWVkaWF0ZSA9IF9nbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG4gICAgfVxuXG4gICAgaWYgKGhydGltZVByZXNlbnQpIHtcbiAgICAgICAgdGltZXJzLmhydGltZSA9IF9nbG9iYWwucHJvY2Vzcy5ocnRpbWU7XG4gICAgfVxuXG4gICAgaWYgKG5leHRUaWNrUHJlc2VudCkge1xuICAgICAgICB0aW1lcnMubmV4dFRpY2sgPSBfZ2xvYmFsLnByb2Nlc3MubmV4dFRpY2s7XG4gICAgfVxuXG4gICAgaWYgKHBlcmZvcm1hbmNlUHJlc2VudCkge1xuICAgICAgICB0aW1lcnMucGVyZm9ybWFuY2UgPSBfZ2xvYmFsLnBlcmZvcm1hbmNlO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcmVzZW50KSB7XG4gICAgICAgIHRpbWVycy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBfZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICB9XG5cbiAgICBpZiAocXVldWVNaWNyb3Rhc2tQcmVzZW50KSB7XG4gICAgICAgIHRpbWVycy5xdWV1ZU1pY3JvdGFzayA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNhbmNlbEFuaW1hdGlvbkZyYW1lUHJlc2VudCkge1xuICAgICAgICB0aW1lcnMuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBfZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0SWRsZUNhbGxiYWNrUHJlc2VudCkge1xuICAgICAgICB0aW1lcnMucmVxdWVzdElkbGVDYWxsYmFjayA9IF9nbG9iYWwucmVxdWVzdElkbGVDYWxsYmFjaztcbiAgICB9XG5cbiAgICBpZiAoY2FuY2VsSWRsZUNhbGxiYWNrUHJlc2VudCkge1xuICAgICAgICB0aW1lcnMuY2FuY2VsSWRsZUNhbGxiYWNrID0gX2dsb2JhbC5jYW5jZWxJZGxlQ2FsbGJhY2s7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPVxuICAgICAgICBPYmplY3Qua2V5cyB8fFxuICAgICAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgIHZhciBrcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGtzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBrcztcbiAgICAgICAgfTtcblxuICAgIHZhciBvcmlnaW5hbFNldFRpbWVvdXQgPSBfZ2xvYmFsLnNldEltbWVkaWF0ZSB8fCBfZ2xvYmFsLnNldFRpbWVvdXQ7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnQge0RhdGV8bnVtYmVyfSB0aGUgc3lzdGVtIHRpbWUgLSBub24taW50ZWdlciB2YWx1ZXMgYXJlIGZsb29yZWRcbiAgICAgKiBAcGFyYW0gbG9vcExpbWl0IHtudW1iZXJ9ICBtYXhpbXVtIG51bWJlciBvZiB0aW1lcnMgdGhhdCB3aWxsIGJlIHJ1biB3aGVuIGNhbGxpbmcgcnVuQWxsKClcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVDbG9jayhzdGFydCwgbG9vcExpbWl0KSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBzdGFydCA9IE1hdGguZmxvb3IoZ2V0RXBvY2goc3RhcnQpKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGxvb3BMaW1pdCA9IGxvb3BMaW1pdCB8fCAxMDAwO1xuICAgICAgICB2YXIgbmFub3MgPSAwO1xuICAgICAgICB2YXIgYWRqdXN0ZWRTeXN0ZW1UaW1lID0gWzAsIDBdOyAvLyBbbWlsbGlzLCBuYW5vcmVtYWluZGVyXVxuXG4gICAgICAgIGlmIChOYXRpdmVEYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBcIlRoZSBnbG9iYWwgc2NvcGUgZG9lc24ndCBoYXZlIGEgYERhdGVgIG9iamVjdFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2lub25qcy9zaW5vbi9pc3N1ZXMvMTg1MiNpc3N1ZWNvbW1lbnQtNDE5NjIyNzgwKVwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNsb2NrID0ge1xuICAgICAgICAgICAgbm93OiBzdGFydCxcbiAgICAgICAgICAgIHRpbWVvdXRzOiB7fSxcbiAgICAgICAgICAgIERhdGU6IGNyZWF0ZURhdGUoKSxcbiAgICAgICAgICAgIGxvb3BMaW1pdDogbG9vcExpbWl0XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xvY2suRGF0ZS5jbG9jayA9IGNsb2NrO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFRpbWVUb05leHRGcmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAxNiAtICgoY2xvY2subm93IC0gc3RhcnQpICUgMTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaHJ0aW1lKHByZXYpIHtcbiAgICAgICAgICAgIHZhciBtaWxsaXNTaW5jZVN0YXJ0ID0gY2xvY2subm93IC0gYWRqdXN0ZWRTeXN0ZW1UaW1lWzBdIC0gc3RhcnQ7XG4gICAgICAgICAgICB2YXIgc2Vjc1NpbmNlU3RhcnQgPSBNYXRoLmZsb29yKG1pbGxpc1NpbmNlU3RhcnQgLyAxMDAwKTtcbiAgICAgICAgICAgIHZhciByZW1haW5kZXJJbk5hbm9zID1cbiAgICAgICAgICAgICAgICAobWlsbGlzU2luY2VTdGFydCAtIHNlY3NTaW5jZVN0YXJ0ICogMWUzKSAqIDFlNiArXG4gICAgICAgICAgICAgICAgbmFub3MgLVxuICAgICAgICAgICAgICAgIGFkanVzdGVkU3lzdGVtVGltZVsxXTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldikpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldlsxXSA+IDFlOSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgbmFub3NlY29uZHMgY2FuJ3QgZXhjZWVkIGEgYmlsbGlvblwiXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG9sZFNlY3MgPSBwcmV2WzBdO1xuICAgICAgICAgICAgICAgIHZhciBuYW5vRGlmZiA9IHJlbWFpbmRlckluTmFub3MgLSBwcmV2WzFdO1xuICAgICAgICAgICAgICAgIHZhciBzZWNEaWZmID0gc2Vjc1NpbmNlU3RhcnQgLSBvbGRTZWNzO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5hbm9EaWZmIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBuYW5vRGlmZiArPSAxZTk7XG4gICAgICAgICAgICAgICAgICAgIHNlY0RpZmYgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gW3NlY0RpZmYsIG5hbm9EaWZmXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbc2Vjc1NpbmNlU3RhcnQsIHJlbWFpbmRlckluTmFub3NdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhydGltZUJpZ2ludFByZXNlbnQpIHtcbiAgICAgICAgICAgIGhydGltZS5iaWdpbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBocnRpbWUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQmlnSW50KHBhcnRzWzBdKSAqIEJpZ0ludCgxZTkpICsgQmlnSW50KHBhcnRzWzFdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsb2NrLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSBmdW5jdGlvbiByZXF1ZXN0SWRsZUNhbGxiYWNrKFxuICAgICAgICAgICAgZnVuYyxcbiAgICAgICAgICAgIHRpbWVvdXRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2YXIgdGltZVRvTmV4dElkbGVQZXJpb2QgPSAwO1xuXG4gICAgICAgICAgICBpZiAoY2xvY2suY291bnRUaW1lcnMoKSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aW1lVG9OZXh0SWRsZVBlcmlvZCA9IDUwOyAvLyBjb25zdCBmb3Igbm93XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhZGRUaW1lcihjbG9jaywge1xuICAgICAgICAgICAgICAgIGZ1bmM6IGZ1bmMsXG4gICAgICAgICAgICAgICAgYXJnczogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgICAgICAgICAgICBkZWxheTpcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHRpbWVvdXQgPT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGltZVRvTmV4dElkbGVQZXJpb2RcbiAgICAgICAgICAgICAgICAgICAgICAgIDogTWF0aC5taW4odGltZW91dCwgdGltZVRvTmV4dElkbGVQZXJpb2QpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5pZCB8fCByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xvY2suY2FuY2VsSWRsZUNhbGxiYWNrID0gZnVuY3Rpb24gY2FuY2VsSWRsZUNhbGxiYWNrKHRpbWVySWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGVhclRpbWVyKGNsb2NrLCB0aW1lcklkLCBcIlRpbWVvdXRcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xvY2suc2V0VGltZW91dCA9IGZ1bmN0aW9uIHNldFRpbWVvdXQoZnVuYywgdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIGFkZFRpbWVyKGNsb2NrLCB7XG4gICAgICAgICAgICAgICAgZnVuYzogZnVuYyxcbiAgICAgICAgICAgICAgICBhcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpLFxuICAgICAgICAgICAgICAgIGRlbGF5OiB0aW1lb3V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbG9jay5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBjbGVhclRpbWVvdXQodGltZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsZWFyVGltZXIoY2xvY2ssIHRpbWVySWQsIFwiVGltZW91dFwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbG9jay5uZXh0VGljayA9IGZ1bmN0aW9uIG5leHRUaWNrKGZ1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnF1ZXVlSm9iKGNsb2NrLCB7XG4gICAgICAgICAgICAgICAgZnVuYzogZnVuYyxcbiAgICAgICAgICAgICAgICBhcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbG9jay5xdWV1ZU1pY3JvdGFzayA9IGZ1bmN0aW9uIHF1ZXVlTWljcm90YXNrKGZ1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBjbG9jay5uZXh0VGljayhmdW5jKTsgLy8gZXhwbGljaXRseSBkcm9wIGFkZGl0aW9uYWwgYXJndW1lbnRzXG4gICAgICAgIH07XG5cbiAgICAgICAgY2xvY2suc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbiBzZXRJbnRlcnZhbChmdW5jLCB0aW1lb3V0KSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHRpbWVvdXQgPSBwYXJzZUludCh0aW1lb3V0LCAxMCk7XG4gICAgICAgICAgICByZXR1cm4gYWRkVGltZXIoY2xvY2ssIHtcbiAgICAgICAgICAgICAgICBmdW5jOiBmdW5jLFxuICAgICAgICAgICAgICAgIGFyZ3M6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICAgICAgICAgICAgZGVsYXk6IHRpbWVvdXQsXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWw6IHRpbWVvdXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsb2NrLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbiBjbGVhckludGVydmFsKHRpbWVySWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGVhclRpbWVyKGNsb2NrLCB0aW1lcklkLCBcIkludGVydmFsXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzZXRJbW1lZGlhdGVQcmVzZW50KSB7XG4gICAgICAgICAgICBjbG9jay5zZXRJbW1lZGlhdGUgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZnVuYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhZGRUaW1lcihjbG9jaywge1xuICAgICAgICAgICAgICAgICAgICBmdW5jOiBmdW5jLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNsb2NrLmNsZWFySW1tZWRpYXRlID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUodGltZXJJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGVhclRpbWVyKGNsb2NrLCB0aW1lcklkLCBcIkltbWVkaWF0ZVwiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjbG9jay5jb3VudFRpbWVycyA9IGZ1bmN0aW9uIGNvdW50VGltZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjbG9jay50aW1lcnMgfHwge30pLmxlbmd0aCArXG4gICAgICAgICAgICAgICAgKGNsb2NrLmpvYnMgfHwgW10pLmxlbmd0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbG9jay5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuYykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFkZFRpbWVyKGNsb2NrLCB7XG4gICAgICAgICAgICAgICAgZnVuYzogZnVuYyxcbiAgICAgICAgICAgICAgICBkZWxheTogZ2V0VGltZVRvTmV4dEZyYW1lKCksXG4gICAgICAgICAgICAgICAgYXJnczogW2Nsb2NrLm5vdyArIGdldFRpbWVUb05leHRGcmFtZSgpXSxcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmlkIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcblxuICAgICAgICBjbG9jay5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRpbWVySWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGVhclRpbWVyKGNsb2NrLCB0aW1lcklkLCBcIkFuaW1hdGlvbkZyYW1lXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsb2NrLnJ1bk1pY3JvdGFza3MgPSBmdW5jdGlvbiBydW5NaWNyb3Rhc2tzKCkge1xuICAgICAgICAgICAgcnVuSm9icyhjbG9jayk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZG9UaWNrKHRpY2tWYWx1ZSwgaXNBc3luYywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgbXNGbG9hdCA9XG4gICAgICAgICAgICAgICAgdHlwZW9mIHRpY2tWYWx1ZSA9PT0gXCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICA/IHRpY2tWYWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IHBhcnNlVGltZSh0aWNrVmFsdWUpO1xuICAgICAgICAgICAgdmFyIG1zID0gTWF0aC5mbG9vcihtc0Zsb2F0KTtcbiAgICAgICAgICAgIHZhciByZW1haW5kZXIgPSBuYW5vUmVtYWluZGVyKG1zRmxvYXQpO1xuICAgICAgICAgICAgdmFyIG5hbm9zVG90YWwgPSBuYW5vcyArIHJlbWFpbmRlcjtcbiAgICAgICAgICAgIHZhciB0aWNrVG8gPSBjbG9jay5ub3cgKyBtcztcblxuICAgICAgICAgICAgaWYgKG1zRmxvYXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5lZ2F0aXZlIHRpY2tzIGFyZSBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGp1c3QgZm9yIHBvc2l0aXZlIG92ZXJmbG93XG4gICAgICAgICAgICBpZiAobmFub3NUb3RhbCA+PSAxZTYpIHtcbiAgICAgICAgICAgICAgICB0aWNrVG8gKz0gMTtcbiAgICAgICAgICAgICAgICBuYW5vc1RvdGFsIC09IDFlNjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmFub3MgPSBuYW5vc1RvdGFsO1xuICAgICAgICAgICAgdmFyIHRpY2tGcm9tID0gY2xvY2subm93O1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gY2xvY2subm93O1xuICAgICAgICAgICAgdmFyIHRpbWVyLFxuICAgICAgICAgICAgICAgIGZpcnN0RXhjZXB0aW9uLFxuICAgICAgICAgICAgICAgIG9sZE5vdyxcbiAgICAgICAgICAgICAgICBuZXh0UHJvbWlzZVRpY2ssXG4gICAgICAgICAgICAgICAgY29tcGVuc2F0aW9uQ2hlY2ssXG4gICAgICAgICAgICAgICAgcG9zdFRpbWVyQ2FsbDtcblxuICAgICAgICAgICAgY2xvY2suZHVyaW5nVGljayA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIHBlcmZvcm0gbWljcm90YXNrc1xuICAgICAgICAgICAgb2xkTm93ID0gY2xvY2subm93O1xuICAgICAgICAgICAgcnVuSm9icyhjbG9jayk7XG4gICAgICAgICAgICBpZiAob2xkTm93ICE9PSBjbG9jay5ub3cpIHtcbiAgICAgICAgICAgICAgICAvLyBjb21wZW5zYXRlIGZvciBhbnkgc2V0U3lzdGVtVGltZSgpIGNhbGwgZHVyaW5nIG1pY3JvdGFzayBjYWxsYmFja1xuICAgICAgICAgICAgICAgIHRpY2tGcm9tICs9IGNsb2NrLm5vdyAtIG9sZE5vdztcbiAgICAgICAgICAgICAgICB0aWNrVG8gKz0gY2xvY2subm93IC0gb2xkTm93O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBkb1RpY2tJbm5lcigpIHtcbiAgICAgICAgICAgICAgICAvLyBwZXJmb3JtIGVhY2ggdGltZXIgaW4gdGhlIHJlcXVlc3RlZCByYW5nZVxuICAgICAgICAgICAgICAgIHRpbWVyID0gZmlyc3RUaW1lckluUmFuZ2UoY2xvY2ssIHRpY2tGcm9tLCB0aWNrVG8pO1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bm1vZGlmaWVkLWxvb3AtY29uZGl0aW9uXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRpbWVyICYmIHRpY2tGcm9tIDw9IHRpY2tUbykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvY2sudGltZXJzW3RpbWVyLmlkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja0Zyb20gPSB0aW1lci5jYWxsQXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9jay5ub3cgPSB0aW1lci5jYWxsQXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGROb3cgPSBjbG9jay5ub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkpvYnMoY2xvY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxUaW1lcihjbG9jaywgdGltZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RXhjZXB0aW9uID0gZmlyc3RFeGNlcHRpb24gfHwgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaW5pc2ggdXAgYWZ0ZXIgbmF0aXZlIHNldEltbWVkaWF0ZSBjYWxsYmFjayB0byBhbGxvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBuYXRpdmUgZXM2IHByb21pc2VzIHRvIHByb2Nlc3MgdGhlaXIgY2FsbGJhY2tzIGFmdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWFjaCB0aW1lciBmaXJlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFNldFRpbWVvdXQobmV4dFByb21pc2VUaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBlbnNhdGlvbkNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwb3N0VGltZXJDYWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBwcm9jZXNzLm5leHRUaWNrKClzIGFnYWluXG4gICAgICAgICAgICAgICAgb2xkTm93ID0gY2xvY2subm93O1xuICAgICAgICAgICAgICAgIHJ1bkpvYnMoY2xvY2spO1xuICAgICAgICAgICAgICAgIGlmIChvbGROb3cgIT09IGNsb2NrLm5vdykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wZW5zYXRlIGZvciBhbnkgc2V0U3lzdGVtVGltZSgpIGNhbGwgZHVyaW5nIHByb2Nlc3MubmV4dFRpY2soKSBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICB0aWNrRnJvbSArPSBjbG9jay5ub3cgLSBvbGROb3c7XG4gICAgICAgICAgICAgICAgICAgIHRpY2tUbyArPSBjbG9jay5ub3cgLSBvbGROb3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsb2NrLmR1cmluZ1RpY2sgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvcm5lciBjYXNlOiBkdXJpbmcgcnVuSm9icyBuZXcgdGltZXJzIHdlcmUgc2NoZWR1bGVkIHdoaWNoIGNvdWxkIGJlIGluIHRoZSByYW5nZSBbY2xvY2subm93LCB0aWNrVG9dXG4gICAgICAgICAgICAgICAgdGltZXIgPSBmaXJzdFRpbWVySW5SYW5nZShjbG9jaywgdGlja0Zyb20sIHRpY2tUbyk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9jay50aWNrKHRpY2tUbyAtIGNsb2NrLm5vdyk7IC8vIGRvIGl0IGFsbCBhZ2FpbiAtIGZvciB0aGUgcmVtYWluZGVyIG9mIHRoZSByZXF1ZXN0ZWQgcmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RFeGNlcHRpb24gPSBmaXJzdEV4Y2VwdGlvbiB8fCBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gdGltZXJzIHJlbWFpbmluZyBpbiB0aGUgcmVxdWVzdGVkIHJhbmdlOiBtb3ZlIHRoZSBjbG9jayBhbGwgdGhlIHdheSB0byB0aGUgZW5kXG4gICAgICAgICAgICAgICAgICAgIGNsb2NrLm5vdyA9IHRpY2tUbztcblxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgbmFub3NcbiAgICAgICAgICAgICAgICAgICAgbmFub3MgPSBuYW5vc1RvdGFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFeGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZmlyc3RFeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9jay5ub3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbG9jay5ub3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXh0UHJvbWlzZVRpY2sgPVxuICAgICAgICAgICAgICAgIGlzQXN5bmMgJiZcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBlbnNhdGlvbkNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0VGltZXJDYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb1RpY2tJbm5lcigpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb21wZW5zYXRpb25DaGVjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbXBlbnNhdGUgZm9yIGFueSBzZXRTeXN0ZW1UaW1lKCkgY2FsbCBkdXJpbmcgdGltZXIgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAob2xkTm93ICE9PSBjbG9jay5ub3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGlja0Zyb20gKz0gY2xvY2subm93IC0gb2xkTm93O1xuICAgICAgICAgICAgICAgICAgICB0aWNrVG8gKz0gY2xvY2subm93IC0gb2xkTm93O1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyArPSBjbG9jay5ub3cgLSBvbGROb3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcG9zdFRpbWVyQ2FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRpbWVyID0gZmlyc3RUaW1lckluUmFuZ2UoY2xvY2ssIHByZXZpb3VzLCB0aWNrVG8pO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gdGlja0Zyb207XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gZG9UaWNrSW5uZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3RpY2tWYWx1ZX0ge1N0cmluZ3xOdW1iZXJ9IG51bWJlciBvZiBtaWxsaXNlY29uZHMgb3IgYSBodW1hbi1yZWFkYWJsZSB2YWx1ZSBsaWtlIFwiMDE6MTE6MTVcIlxuICAgICAgICAgKi9cbiAgICAgICAgY2xvY2sudGljayA9IGZ1bmN0aW9uIHRpY2sodGlja1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9UaWNrKHRpY2tWYWx1ZSwgZmFsc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YgX2dsb2JhbC5Qcm9taXNlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjbG9jay50aWNrQXN5bmMgPSBmdW5jdGlvbiB0aWNrQXN5bmMobXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IF9nbG9iYWwuUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb1RpY2sobXMsIHRydWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjbG9jay5uZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJ1bkpvYnMoY2xvY2spO1xuICAgICAgICAgICAgdmFyIHRpbWVyID0gZmlyc3RUaW1lcihjbG9jayk7XG4gICAgICAgICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb2NrLm5vdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xvY2suZHVyaW5nVGljayA9IHRydWU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNsb2NrLm5vdyA9IHRpbWVyLmNhbGxBdDtcbiAgICAgICAgICAgICAgICBjYWxsVGltZXIoY2xvY2ssIHRpbWVyKTtcbiAgICAgICAgICAgICAgICBydW5Kb2JzKGNsb2NrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvY2subm93O1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBjbG9jay5kdXJpbmdUaWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfZ2xvYmFsLlByb21pc2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNsb2NrLm5leHRBc3luYyA9IGZ1bmN0aW9uIG5leHRBc3luYygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IF9nbG9iYWwuUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZXIgPSBmaXJzdFRpbWVyKGNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvY2subm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2suZHVyaW5nVGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2subm93ID0gdGltZXIuY2FsbEF0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxUaW1lcihjbG9jaywgdGltZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2suZHVyaW5nVGljayA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvY2subm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2xvY2sucnVuQWxsID0gZnVuY3Rpb24gcnVuQWxsKCkge1xuICAgICAgICAgICAgdmFyIG51bVRpbWVycywgaTtcbiAgICAgICAgICAgIHJ1bkpvYnMoY2xvY2spO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNsb2NrLmxvb3BMaW1pdDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjbG9jay50aW1lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsb2NrLm5vdztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBudW1UaW1lcnMgPSBrZXlzKGNsb2NrLnRpbWVycykubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChudW1UaW1lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsb2NrLm5vdztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjbG9jay5uZXh0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBcIkFib3J0aW5nIGFmdGVyIHJ1bm5pbmcgXCIgK1xuICAgICAgICAgICAgICAgICAgICBjbG9jay5sb29wTGltaXQgK1xuICAgICAgICAgICAgICAgICAgICBcIiB0aW1lcnMsIGFzc3VtaW5nIGFuIGluZmluaXRlIGxvb3AhXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xvY2sucnVuVG9GcmFtZSA9IGZ1bmN0aW9uIHJ1blRvRnJhbWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xvY2sudGljayhnZXRUaW1lVG9OZXh0RnJhbWUoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfZ2xvYmFsLlByb21pc2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNsb2NrLnJ1bkFsbEFzeW5jID0gZnVuY3Rpb24gcnVuQWxsQXN5bmMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBfZ2xvYmFsLlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9SdW4oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bVRpbWVycztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBjbG9jay5sb29wTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2xvY2sudGltZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9jay5ub3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVGltZXJzID0gT2JqZWN0LmtleXMoY2xvY2sudGltZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtVGltZXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9jay5ub3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2submV4dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvUnVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBYm9ydGluZyBhZnRlciBydW5uaW5nIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2subG9vcExpbWl0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgdGltZXJzLCBhc3N1bWluZyBhbiBpbmZpbml0ZSBsb29wIVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9SdW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjbG9jay5ydW5Ub0xhc3QgPSBmdW5jdGlvbiBydW5Ub0xhc3QoKSB7XG4gICAgICAgICAgICB2YXIgdGltZXIgPSBsYXN0VGltZXIoY2xvY2spO1xuICAgICAgICAgICAgaWYgKCF0aW1lcikge1xuICAgICAgICAgICAgICAgIHJ1bkpvYnMoY2xvY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbG9jay5ub3c7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjbG9jay50aWNrKHRpbWVyLmNhbGxBdCAtIGNsb2NrLm5vdyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfZ2xvYmFsLlByb21pc2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNsb2NrLnJ1blRvTGFzdEFzeW5jID0gZnVuY3Rpb24gcnVuVG9MYXN0QXN5bmMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBfZ2xvYmFsLlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVyID0gbGFzdFRpbWVyKGNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvY2subm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb2NrLnRpY2tBc3luYyh0aW1lci5jYWxsQXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsb2NrLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICBuYW5vcyA9IDA7XG4gICAgICAgICAgICBjbG9jay50aW1lcnMgPSB7fTtcbiAgICAgICAgICAgIGNsb2NrLmpvYnMgPSBbXTtcbiAgICAgICAgICAgIGNsb2NrLm5vdyA9IHN0YXJ0O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsb2NrLnNldFN5c3RlbVRpbWUgPSBmdW5jdGlvbiBzZXRTeXN0ZW1UaW1lKHN5c3RlbVRpbWUpIHtcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aW1lIGRpZmZlcmVuY2VcbiAgICAgICAgICAgIHZhciBuZXdOb3cgPSBnZXRFcG9jaChzeXN0ZW1UaW1lKTtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gbmV3Tm93IC0gY2xvY2subm93O1xuICAgICAgICAgICAgdmFyIGlkLCB0aW1lcjtcblxuICAgICAgICAgICAgYWRqdXN0ZWRTeXN0ZW1UaW1lWzBdID0gYWRqdXN0ZWRTeXN0ZW1UaW1lWzBdICsgZGlmZmVyZW5jZTtcbiAgICAgICAgICAgIGFkanVzdGVkU3lzdGVtVGltZVsxXSA9IGFkanVzdGVkU3lzdGVtVGltZVsxXSArIG5hbm9zO1xuICAgICAgICAgICAgLy8gdXBkYXRlICdzeXN0ZW0gY2xvY2snXG4gICAgICAgICAgICBjbG9jay5ub3cgPSBuZXdOb3c7XG4gICAgICAgICAgICBuYW5vcyA9IDA7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aW1lcnMgYW5kIGludGVydmFscyB0byBrZWVwIHRoZW0gc3RhYmxlXG4gICAgICAgICAgICBmb3IgKGlkIGluIGNsb2NrLnRpbWVycykge1xuICAgICAgICAgICAgICAgIGlmIChjbG9jay50aW1lcnMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyID0gY2xvY2sudGltZXJzW2lkXTtcbiAgICAgICAgICAgICAgICAgICAgdGltZXIuY3JlYXRlZEF0ICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyLmNhbGxBdCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocGVyZm9ybWFuY2VQcmVzZW50KSB7XG4gICAgICAgICAgICBjbG9jay5wZXJmb3JtYW5jZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgICAgICAgIGlmIChoYXNQZXJmb3JtYW5jZVByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm90byA9IF9nbG9iYWwuUGVyZm9ybWFuY2UucHJvdG90eXBlO1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKFwiZ2V0RW50cmllc1wiKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggZXhwZWN0ZWQgcmV0dXJuIHR5cGUgZm9yIGdldEVudHJpZXMgZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9jay5wZXJmb3JtYW5jZVtuYW1lXSA9IE5PT1BfQVJSQVk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9jay5wZXJmb3JtYW5jZVtuYW1lXSA9IE5PT1A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xvY2sucGVyZm9ybWFuY2Uubm93ID0gZnVuY3Rpb24gbG9sZXhOb3coKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhydCA9IGhydGltZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtaWxsaXMgPSBocnRbMF0gKiAxMDAwICsgaHJ0WzFdIC8gMWU2O1xuICAgICAgICAgICAgICAgIHJldHVybiBtaWxsaXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhydGltZVByZXNlbnQpIHtcbiAgICAgICAgICAgIGNsb2NrLmhydGltZSA9IGhydGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbG9jaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY29uZmlnIHtPYmplY3R9IG9wdGlvbmFsIGNvbmZpZ1xuICAgICAqIEBwYXJhbSBjb25maWcudGFyZ2V0IHtPYmplY3R9IHRoZSB0YXJnZXQgdG8gaW5zdGFsbCB0aW1lcnMgaW4gKGRlZmF1bHQgYHdpbmRvd2ApXG4gICAgICogQHBhcmFtIGNvbmZpZy5ub3cge251bWJlcnxEYXRlfSAgYSBudW1iZXIgKGluIG1pbGxpc2Vjb25kcykgb3IgYSBEYXRlIG9iamVjdCAoZGVmYXVsdCBlcG9jaClcbiAgICAgKiBAcGFyYW0gY29uZmlnLnRvRmFrZSB7c3RyaW5nW119IG5hbWVzIG9mIHRoZSBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGZha2VkLlxuICAgICAqIEBwYXJhbSBjb25maWcubG9vcExpbWl0IHtudW1iZXJ9IHRoZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcnMgdGhhdCB3aWxsIGJlIHJ1biB3aGVuIGNhbGxpbmcgcnVuQWxsKClcbiAgICAgKiBAcGFyYW0gY29uZmlnLnNob3VsZEFkdmFuY2VUaW1lIHtCb29sZWFufSB0ZWxscyBsb2xleCB0byBpbmNyZW1lbnQgbW9ja2VkIHRpbWUgYXV0b21hdGljYWxseSAoZGVmYXVsdCBmYWxzZSlcbiAgICAgKiBAcGFyYW0gY29uZmlnLmFkdmFuY2VUaW1lRGVsdGEge051bWJlcn0gaW5jcmVtZW50IG1vY2tlZCB0aW1lIGV2ZXJ5IDw8YWR2YW5jZVRpbWVEZWx0YT4+IG1zIChkZWZhdWx0OiAyMG1zKVxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgZnVuY3Rpb24gaW5zdGFsbChjb25maWcpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA+IDEgfHxcbiAgICAgICAgICAgIGNvbmZpZyBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoY29uZmlnKSB8fFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZyA9PT0gXCJudW1iZXJcIlxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJsb2xleC5pbnN0YWxsIGNhbGxlZCB3aXRoIFwiICtcbiAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGNvbmZpZykgK1xuICAgICAgICAgICAgICAgICAgICBcIiBsb2xleCAyLjArIHJlcXVpcmVzIGFuIG9iamVjdCBwYXJhbWV0ZXIgLSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Npbm9uanMvbG9sZXhcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBjb25maWcgPSB0eXBlb2YgY29uZmlnICE9PSBcInVuZGVmaW5lZFwiID8gY29uZmlnIDoge307XG4gICAgICAgIGNvbmZpZy5zaG91bGRBZHZhbmNlVGltZSA9IGNvbmZpZy5zaG91bGRBZHZhbmNlVGltZSB8fCBmYWxzZTtcbiAgICAgICAgY29uZmlnLmFkdmFuY2VUaW1lRGVsdGEgPSBjb25maWcuYWR2YW5jZVRpbWVEZWx0YSB8fCAyMDtcblxuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgdmFyIHRhcmdldCA9IGNvbmZpZy50YXJnZXQgfHwgX2dsb2JhbDtcbiAgICAgICAgdmFyIGNsb2NrID0gY3JlYXRlQ2xvY2soY29uZmlnLm5vdywgY29uZmlnLmxvb3BMaW1pdCk7XG5cbiAgICAgICAgY2xvY2sudW5pbnN0YWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5pbnN0YWxsKGNsb2NrLCB0YXJnZXQsIGNvbmZpZyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xvY2subWV0aG9kcyA9IGNvbmZpZy50b0Zha2UgfHwgW107XG5cbiAgICAgICAgaWYgKGNsb2NrLm1ldGhvZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBkbyBub3QgZmFrZSBuZXh0VGljayBieSBkZWZhdWx0IC0gR2l0SHViIzEyNlxuICAgICAgICAgICAgY2xvY2subWV0aG9kcyA9IGtleXModGltZXJzKS5maWx0ZXIoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSAhPT0gXCJuZXh0VGlja1wiICYmIGtleSAhPT0gXCJxdWV1ZU1pY3JvdGFza1wiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gY2xvY2subWV0aG9kcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjbG9jay5tZXRob2RzW2ldID09PSBcImhydGltZVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHJvY2VzcyAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdGFyZ2V0LnByb2Nlc3MuaHJ0aW1lID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgaGlqYWNrTWV0aG9kKHRhcmdldC5wcm9jZXNzLCBjbG9jay5tZXRob2RzW2ldLCBjbG9jayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbG9jay5tZXRob2RzW2ldID09PSBcIm5leHRUaWNrXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wcm9jZXNzICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiB0YXJnZXQucHJvY2Vzcy5uZXh0VGljayA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpamFja01ldGhvZCh0YXJnZXQucHJvY2VzcywgY2xvY2subWV0aG9kc1tpXSwgY2xvY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBjbG9jay5tZXRob2RzW2ldID09PSBcInNldEludGVydmFsXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnNob3VsZEFkdmFuY2VUaW1lID09PSB0cnVlXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnRlcnZhbFRpY2sgPSBkb0ludGVydmFsVGljay5iaW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb2NrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmFkdmFuY2VUaW1lRGVsdGFcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGludGVydmFsSWQgPSB0YXJnZXRbY2xvY2subWV0aG9kc1tpXV0oXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFRpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuYWR2YW5jZVRpbWVEZWx0YVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBjbG9jay5hdHRhY2hlZEludGVydmFsID0gaW50ZXJ2YWxJZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaGlqYWNrTWV0aG9kKHRhcmdldCwgY2xvY2subWV0aG9kc1tpXSwgY2xvY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsb2NrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHRpbWVyczogdGltZXJzLFxuICAgICAgICBjcmVhdGVDbG9jazogY3JlYXRlQ2xvY2ssXG4gICAgICAgIGluc3RhbGw6IGluc3RhbGwsXG4gICAgICAgIHdpdGhHbG9iYWw6IHdpdGhHbG9iYWxcbiAgICB9O1xufVxuXG52YXIgZGVmYXVsdEltcGxlbWVudGF0aW9uID0gd2l0aEdsb2JhbChnbG9iYWxPYmplY3QpO1xuXG5leHBvcnRzLnRpbWVycyA9IGRlZmF1bHRJbXBsZW1lbnRhdGlvbi50aW1lcnM7XG5leHBvcnRzLmNyZWF0ZUNsb2NrID0gZGVmYXVsdEltcGxlbWVudGF0aW9uLmNyZWF0ZUNsb2NrO1xuZXhwb3J0cy5pbnN0YWxsID0gZGVmYXVsdEltcGxlbWVudGF0aW9uLmluc3RhbGw7XG5leHBvcnRzLndpdGhHbG9iYWwgPSB3aXRoR2xvYmFsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGNhY2hlIGEgcmVmZXJlbmNlIHRvIHNldFRpbWVvdXQsIHNvIHRoYXQgb3VyIHJlZmVyZW5jZSB3b24ndCBiZSBzdHViYmVkIG91dFxuLy8gd2hlbiB1c2luZyBmYWtlIHRpbWVycyBhbmQgZXJyb3JzIHdpbGwgc3RpbGwgZ2V0IGxvZ2dlZFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nqb2hhbnNlbi9TaW5vbi5KUy9pc3N1ZXMvMzgxXG52YXIgcmVhbFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuXG5mdW5jdGlvbiBjb25maWd1cmVMb2dnZXIoY29uZmlnKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIC8vIEZ1bmN0aW9uIHdoaWNoIHByaW50cyBlcnJvcnMuXG4gICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoXCJsb2dnZXJcIikpIHtcbiAgICAgICAgY29uZmlnLmxvZ2dlciA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICB9XG4gICAgLy8gV2hlbiBzZXQgdG8gdHJ1ZSwgYW55IGVycm9ycyBsb2dnZWQgd2lsbCBiZSB0aHJvd24gaW1tZWRpYXRlbHk7XG4gICAgLy8gSWYgc2V0IHRvIGZhbHNlLCB0aGUgZXJyb3JzIHdpbGwgYmUgdGhyb3duIGluIHNlcGFyYXRlIGV4ZWN1dGlvbiBmcmFtZS5cbiAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcInVzZUltbWVkaWF0ZUV4Y2VwdGlvbnNcIikpIHtcbiAgICAgICAgY29uZmlnLnVzZUltbWVkaWF0ZUV4Y2VwdGlvbnMgPSB0cnVlO1xuICAgIH1cbiAgICAvLyB3cmFwIHJlYWxTZXRUaW1lb3V0IHdpdGggc29tZXRoaW5nIHdlIGNhbiBzdHViIGluIHRlc3RzXG4gICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoXCJzZXRUaW1lb3V0XCIpKSB7XG4gICAgICAgIGNvbmZpZy5zZXRUaW1lb3V0ID0gcmVhbFNldFRpbWVvdXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxvZ0Vycm9yKGxhYmVsLCBlKSB7XG4gICAgICAgIHZhciBtc2cgPSBsYWJlbCArIFwiIHRocmV3IGV4Y2VwdGlvbjogXCI7XG4gICAgICAgIHZhciBlcnIgPSB7IG5hbWU6IGUubmFtZSB8fCBsYWJlbCwgbWVzc2FnZTogZS5tZXNzYWdlIHx8IGUudG9TdHJpbmcoKSwgc3RhY2s6IGUuc3RhY2sgfTtcblxuICAgICAgICBmdW5jdGlvbiB0aHJvd0xvZ2dlZEVycm9yKCkge1xuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBtc2cgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5sb2dnZXIobXNnICsgXCJbXCIgKyBlcnIubmFtZSArIFwiXSBcIiArIGVyci5tZXNzYWdlKTtcblxuICAgICAgICBpZiAoZXJyLnN0YWNrKSB7XG4gICAgICAgICAgICBjb25maWcubG9nZ2VyKGVyci5zdGFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLnVzZUltbWVkaWF0ZUV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIHRocm93TG9nZ2VkRXJyb3IoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZy5zZXRUaW1lb3V0KHRocm93TG9nZ2VkRXJyb3IsIDApO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWd1cmVMb2dnZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEV2ZW50ID0gcmVxdWlyZShcIi4vZXZlbnRcIik7XG5cbmZ1bmN0aW9uIEN1c3RvbUV2ZW50KHR5cGUsIGN1c3RvbURhdGEsIHRhcmdldCkge1xuICAgIHRoaXMuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgdGFyZ2V0KTtcbiAgICB0aGlzLmRldGFpbCA9IGN1c3RvbURhdGEuZGV0YWlsIHx8IG51bGw7XG59XG5cbkN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IG5ldyBFdmVudCgpO1xuXG5DdXN0b21FdmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDdXN0b21FdmVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBDdXN0b21FdmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBmbGF0dGVuT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgIT09IE9iamVjdChvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FwdHVyZTogQm9vbGVhbihvcHRpb25zKSxcbiAgICAgICAgICAgIG9uY2U6IGZhbHNlLFxuICAgICAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FwdHVyZTogQm9vbGVhbihvcHRpb25zLmNhcHR1cmUpLFxuICAgICAgICBvbmNlOiBCb29sZWFuKG9wdGlvbnMub25jZSksXG4gICAgICAgIHBhc3NpdmU6IEJvb2xlYW4ob3B0aW9ucy5wYXNzaXZlKVxuICAgIH07XG59XG5mdW5jdGlvbiBub3QoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIWZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGhhc0xpc3RlbmVyRmlsdGVyKGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsaXN0ZW5lclNwZWMpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyU3BlYy5jYXB0dXJlID09PSBjYXB0dXJlXG4gICAgICAgICAgICAmJiBsaXN0ZW5lclNwZWMubGlzdGVuZXIgPT09IGxpc3RlbmVyO1xuICAgIH07XG59XG5cbnZhciBFdmVudFRhcmdldCA9IHtcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1ldmVudHRhcmdldC1hZGRldmVudGxpc3RlbmVyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIHByb3ZpZGVkT3B0aW9ucykge1xuICAgICAgICAvLyAzLiBMZXQgY2FwdHVyZSwgcGFzc2l2ZSwgYW5kIG9uY2UgYmUgdGhlIHJlc3VsdCBvZiBmbGF0dGVuaW5nIG1vcmUgb3B0aW9ucy5cbiAgICAgICAgLy8gRmxhdHRlbiBwcm9wZXJ0eSBiZWZvcmUgZXhlY3V0aW5nIHN0ZXAgMixcbiAgICAgICAgLy8gZmV0dXJlIGRldGVjdGlvbiBpcyB1c3VhbGx5IGJhc2VkIG9uIHJlZ2lzdGVyaW5nIGhhbmRsZXIgd2l0aCBvcHRpb25zIG9iamVjdCxcbiAgICAgICAgLy8gdGhhdCBoYXMgZ2V0dGVyIGRlZmluZWRcbiAgICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge30sIHtcbiAgICAgICAgLy8gICAgZ2V0IG9uY2UoKSB7IHN1cHBvcnRzT25jZSA9IHRydWU7IH1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHZhciBvcHRpb25zID0gZmxhdHRlbk9wdGlvbnMocHJvdmlkZWRPcHRpb25zKTtcblxuICAgICAgICAvLyAyLiBJZiBjYWxsYmFjayBpcyBudWxsLCB0aGVuIHJldHVybi5cbiAgICAgICAgaWYgKGxpc3RlbmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzIHx8IHt9O1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XSA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdIHx8IFtdO1xuXG4gICAgICAgIC8vIDQuIElmIGNvbnRleHQgb2JqZWN04oCZcyBhc3NvY2lhdGVkIGxpc3Qgb2YgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgLy8gICAgZG9lcyBub3QgY29udGFpbiBhbiBldmVudCBsaXN0ZW5lciB3aG9zZSB0eXBlIGlzIHR5cGUsXG4gICAgICAgIC8vICAgIGNhbGxiYWNrIGlzIGNhbGxiYWNrLCBhbmQgY2FwdHVyZSBpcyBjYXB0dXJlLCB0aGVuIGFwcGVuZFxuICAgICAgICAvLyAgICBhIG5ldyBldmVudCBsaXN0ZW5lciB0byBpdCwgd2hvc2UgdHlwZSBpcyB0eXBlLCBjYWxsYmFjayBpc1xuICAgICAgICAvLyAgICBjYWxsYmFjaywgY2FwdHVyZSBpcyBjYXB0dXJlLCBwYXNzaXZlIGlzIHBhc3NpdmUsIGFuZCBvbmNlIGlzIG9uY2UuXG4gICAgICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF0uc29tZShoYXNMaXN0ZW5lckZpbHRlcihsaXN0ZW5lciwgb3B0aW9ucy5jYXB0dXJlKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICBjYXB0dXJlOiBvcHRpb25zLmNhcHR1cmUsXG4gICAgICAgICAgICAgICAgb25jZTogb3B0aW9ucy5vbmNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1ldmVudHRhcmdldC1yZW1vdmVldmVudGxpc3RlbmVyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIHByb3ZpZGVkT3B0aW9ucykge1xuICAgICAgICBpZiAoIXRoaXMuZXZlbnRMaXN0ZW5lcnMgfHwgIXRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiBMZXQgY2FwdHVyZSBiZSB0aGUgcmVzdWx0IG9mIGZsYXR0ZW5pbmcgb3B0aW9ucy5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBmbGF0dGVuT3B0aW9ucyhwcm92aWRlZE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIDMuIElmIHRoZXJlIGlzIGFuIGV2ZW50IGxpc3RlbmVyIGluIHRoZSBhc3NvY2lhdGVkIGxpc3Qgb2ZcbiAgICAgICAgLy8gICAgZXZlbnQgbGlzdGVuZXJzIHdob3NlIHR5cGUgaXMgdHlwZSwgY2FsbGJhY2sgaXMgY2FsbGJhY2ssXG4gICAgICAgIC8vICAgIGFuZCBjYXB0dXJlIGlzIGNhcHR1cmUsIHRoZW4gc2V0IHRoYXQgZXZlbnQgbGlzdGVuZXLigJlzXG4gICAgICAgIC8vICAgIHJlbW92ZWQgdG8gdHJ1ZSBhbmQgcmVtb3ZlIGl0IGZyb20gdGhlIGFzc29jaWF0ZWQgbGlzdCBvZiBldmVudCBsaXN0ZW5lcnMuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdID0gdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF1cbiAgICAgICAgICAgIC5maWx0ZXIobm90KGhhc0xpc3RlbmVyRmlsdGVyKGxpc3RlbmVyLCBvcHRpb25zLmNhcHR1cmUpKSk7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXZlbnQ6IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50TGlzdGVuZXJzIHx8ICF0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50LnR5cGVdKSB7XG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbihldmVudC5kZWZhdWx0UHJldmVudGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHR5cGUgPSBldmVudC50eXBlO1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gc2VsZi5ldmVudExpc3RlbmVyc1t0eXBlXTtcblxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzLCB0aGF0IHNob3VsZCBiZSBkaXNwYXRjaGVkIG9uY2VcbiAgICAgICAgLy8gYmVmb3JlIHJ1bm5pbmcgZGlzcGF0Y2ggbG9vcCB0byBhdm9pZCBuZXN0ZWQgZGlzcGF0Y2ggaXNzdWVzXG4gICAgICAgIHNlbGYuZXZlbnRMaXN0ZW5lcnNbdHlwZV0gPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsaXN0ZW5lclNwZWMpIHtcbiAgICAgICAgICAgIHJldHVybiAhbGlzdGVuZXJTcGVjLm9uY2U7XG4gICAgICAgIH0pO1xuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXJTcGVjKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lclNwZWMubGlzdGVuZXI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHNlbGYsIGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuaGFuZGxlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gQm9vbGVhbihldmVudC5kZWZhdWx0UHJldmVudGVkKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50VGFyZ2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIEV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIHRhcmdldCkge1xuICAgIHRoaXMuaW5pdEV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIHRhcmdldCk7XG59XG5cbkV2ZW50LnByb3RvdHlwZSA9IHtcbiAgICBpbml0RXZlbnQ6IGZ1bmN0aW9uICh0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5idWJibGVzID0gYnViYmxlcztcbiAgICAgICAgdGhpcy5jYW5jZWxhYmxlID0gY2FuY2VsYWJsZTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgICB9LFxuXG4gICAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbiAoKSB7fSxcblxuICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBFdmVudDogcmVxdWlyZShcIi4vZXZlbnRcIiksXG4gICAgUHJvZ3Jlc3NFdmVudDogcmVxdWlyZShcIi4vcHJvZ3Jlc3MtZXZlbnRcIiksXG4gICAgQ3VzdG9tRXZlbnQ6IHJlcXVpcmUoXCIuL2N1c3RvbS1ldmVudFwiKSxcbiAgICBFdmVudFRhcmdldDogcmVxdWlyZShcIi4vZXZlbnQtdGFyZ2V0XCIpXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFdmVudCA9IHJlcXVpcmUoXCIuL2V2ZW50XCIpO1xuXG5mdW5jdGlvbiBQcm9ncmVzc0V2ZW50KHR5cGUsIHByb2dyZXNzRXZlbnRSYXcsIHRhcmdldCkge1xuICAgIHRoaXMuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgdGFyZ2V0KTtcbiAgICB0aGlzLmxvYWRlZCA9IHR5cGVvZiBwcm9ncmVzc0V2ZW50UmF3LmxvYWRlZCA9PT0gXCJudW1iZXJcIiA/IHByb2dyZXNzRXZlbnRSYXcubG9hZGVkIDogbnVsbDtcbiAgICB0aGlzLnRvdGFsID0gdHlwZW9mIHByb2dyZXNzRXZlbnRSYXcudG90YWwgPT09IFwibnVtYmVyXCIgPyBwcm9ncmVzc0V2ZW50UmF3LnRvdGFsIDogbnVsbDtcbiAgICB0aGlzLmxlbmd0aENvbXB1dGFibGUgPSAhIXByb2dyZXNzRXZlbnRSYXcudG90YWw7XG59XG5cblByb2dyZXNzRXZlbnQucHJvdG90eXBlID0gbmV3IEV2ZW50KCk7XG5cblByb2dyZXNzRXZlbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHJvZ3Jlc3NFdmVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzc0V2ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBsb2xleCA9IHJlcXVpcmUoXCJsb2xleFwiKTtcbnZhciBmYWtlU2VydmVyID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XG5cbmZ1bmN0aW9uIFNlcnZlcigpIHt9XG5TZXJ2ZXIucHJvdG90eXBlID0gZmFrZVNlcnZlcjtcblxudmFyIGZha2VTZXJ2ZXJXaXRoQ2xvY2sgPSBuZXcgU2VydmVyKCk7XG5cbmZha2VTZXJ2ZXJXaXRoQ2xvY2suYWRkUmVxdWVzdCA9IGZ1bmN0aW9uIGFkZFJlcXVlc3QoeGhyKSB7XG4gICAgaWYgKHhoci5hc3luYykge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQuY2xvY2sgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvY2sgPSBzZXRUaW1lb3V0LmNsb2NrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9jayA9IGxvbGV4Lmluc3RhbGwoKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRDbG9jayA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubG9uZ2VzdFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHZhciBjbG9ja1NldFRpbWVvdXQgPSB0aGlzLmNsb2NrLnNldFRpbWVvdXQ7XG4gICAgICAgICAgICB2YXIgY2xvY2tTZXRJbnRlcnZhbCA9IHRoaXMuY2xvY2suc2V0SW50ZXJ2YWw7XG4gICAgICAgICAgICB2YXIgc2VydmVyID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5jbG9jay5zZXRUaW1lb3V0ID0gZnVuY3Rpb24gKGZuLCB0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgc2VydmVyLmxvbmdlc3RUaW1lb3V0ID0gTWF0aC5tYXgodGltZW91dCwgc2VydmVyLmxvbmdlc3RUaW1lb3V0IHx8IDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb2NrU2V0VGltZW91dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5jbG9jay5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uIChmbiwgdGltZW91dCkge1xuICAgICAgICAgICAgICAgIHNlcnZlci5sb25nZXN0VGltZW91dCA9IE1hdGgubWF4KHRpbWVvdXQsIHNlcnZlci5sb25nZXN0VGltZW91dCB8fCAwKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBjbG9ja1NldEludGVydmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZha2VTZXJ2ZXIuYWRkUmVxdWVzdC5jYWxsKHRoaXMsIHhocik7XG59O1xuXG5mYWtlU2VydmVyV2l0aENsb2NrLnJlc3BvbmQgPSBmdW5jdGlvbiByZXNwb25kKCkge1xuICAgIHZhciByZXR1cm5WYWwgPSBmYWtlU2VydmVyLnJlc3BvbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLmNsb2NrKSB7XG4gICAgICAgIHRoaXMuY2xvY2sudGljayh0aGlzLmxvbmdlc3RUaW1lb3V0IHx8IDApO1xuICAgICAgICB0aGlzLmxvbmdlc3RUaW1lb3V0ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5yZXNldENsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLmNsb2NrLnVuaW5zdGFsbCgpO1xuICAgICAgICAgICAgdGhpcy5yZXNldENsb2NrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsO1xufTtcblxuZmFrZVNlcnZlcldpdGhDbG9jay5yZXN0b3JlID0gZnVuY3Rpb24gcmVzdG9yZSgpIHtcbiAgICBpZiAodGhpcy5jbG9jaykge1xuICAgICAgICB0aGlzLmNsb2NrLnVuaW5zdGFsbCgpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWtlU2VydmVyLnJlc3RvcmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmFrZVNlcnZlcldpdGhDbG9jaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZm9ybWF0aW8gPSByZXF1aXJlKFwiQHNpbm9uanMvZm9ybWF0aW9cIik7XG5cbnZhciBmb3JtYXR0ZXIgPSBmb3JtYXRpby5jb25maWd1cmUoe1xuICAgIHF1b3RlU3RyaW5nczogZmFsc2UsXG4gICAgbGltaXRDaGlsZHJlbkNvdW50OiAyNTBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdCgpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFzY2lpLmFwcGx5KGZvcm1hdHRlciwgYXJndW1lbnRzKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGZha2VYaHIgPSByZXF1aXJlKFwiLi4vZmFrZS14aHJcIik7XG52YXIgcHVzaCA9IFtdLnB1c2g7XG52YXIgZm9ybWF0ID0gcmVxdWlyZShcIi4vZm9ybWF0XCIpO1xudmFyIGNvbmZpZ3VyZUxvZ0Vycm9yID0gcmVxdWlyZShcIi4uL2NvbmZpZ3VyZS1sb2dnZXJcIik7XG52YXIgcGF0aFRvUmVnZXhwID0gcmVxdWlyZShcInBhdGgtdG8tcmVnZXhwXCIpO1xuXG52YXIgc3VwcG9ydHNBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuZnVuY3Rpb24gcmVzcG9uc2VBcnJheShoYW5kbGVyKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gaGFuZGxlcjtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaGFuZGxlcikgIT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgICByZXNwb25zZSA9IFsyMDAsIHt9LCBoYW5kbGVyXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlWzJdICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghc3VwcG9ydHNBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZha2Ugc2VydmVyIHJlc3BvbnNlIGJvZHkgc2hvdWxkIGJlIGEgc3RyaW5nLCBidXQgd2FzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHJlc3BvbnNlWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghKHJlc3BvbnNlWzJdIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFrZSBzZXJ2ZXIgcmVzcG9uc2UgYm9keSBzaG91bGQgYmUgYSBzdHJpbmcgb3IgQXJyYXlCdWZmZXIsIGJ1dCB3YXMgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgcmVzcG9uc2VbMl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0V2luZG93TG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHsgXCJob3N0XCI6IFwibG9jYWxob3N0XCIsIFwicHJvdG9jb2xcIjogXCJodHRwXCIgfTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93TG9jYXRpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgLy8gRmFsbGJhY2tcbiAgICAgICAgcmV0dXJuIGdldERlZmF1bHRXaW5kb3dMb2NhdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygd2luZG93LmxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIHBsYWNlIGxvY2F0aW9uIG9uIHdpbmRvd1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uO1xuICAgIH1cblxuICAgIGlmICgodHlwZW9mIHdpbmRvdy53aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpICYmICh0eXBlb2Ygd2luZG93LndpbmRvdy5sb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikpIHtcbiAgICAgICAgLy8gUmVhY3QgTmF0aXZlIG9uIEFuZHJvaWQgcGxhY2VzIGxvY2F0aW9uIG9uIHdpbmRvdy53aW5kb3dcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53aW5kb3cubG9jYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERlZmF1bHRXaW5kb3dMb2NhdGlvbigpO1xufVxuXG5mdW5jdGlvbiBtYXRjaE9uZShyZXNwb25zZSwgcmVxTWV0aG9kLCByZXFVcmwpIHtcbiAgICB2YXIgcm1ldGggPSByZXNwb25zZS5tZXRob2Q7XG4gICAgdmFyIG1hdGNoTWV0aG9kID0gIXJtZXRoIHx8IHJtZXRoLnRvTG93ZXJDYXNlKCkgPT09IHJlcU1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciB1cmwgPSByZXNwb25zZS51cmw7XG4gICAgdmFyIG1hdGNoVXJsID0gIXVybCB8fCB1cmwgPT09IHJlcVVybCB8fCAodHlwZW9mIHVybC50ZXN0ID09PSBcImZ1bmN0aW9uXCIgJiYgdXJsLnRlc3QocmVxVXJsKSk7XG5cbiAgICByZXR1cm4gbWF0Y2hNZXRob2QgJiYgbWF0Y2hVcmw7XG59XG5cbmZ1bmN0aW9uIG1hdGNoKHJlc3BvbnNlLCByZXF1ZXN0KSB7XG4gICAgdmFyIHdsb2MgPSBnZXRXaW5kb3dMb2NhdGlvbigpO1xuXG4gICAgdmFyIHJDdXJyTG9jID0gbmV3IFJlZ0V4cChcIl5cIiArIHdsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyB3bG9jLmhvc3QpO1xuXG4gICAgdmFyIHJlcXVlc3RVcmwgPSByZXF1ZXN0LnVybDtcblxuICAgIGlmICghL15odHRwcz86XFwvXFwvLy50ZXN0KHJlcXVlc3RVcmwpIHx8IHJDdXJyTG9jLnRlc3QocmVxdWVzdFVybCkpIHtcbiAgICAgICAgcmVxdWVzdFVybCA9IHJlcXVlc3RVcmwucmVwbGFjZShyQ3VyckxvYywgXCJcIik7XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoT25lKHJlc3BvbnNlLCB0aGlzLmdldEhUVFBNZXRob2QocmVxdWVzdCksIHJlcXVlc3RVcmwpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UucmVzcG9uc2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdmFyIHJ1ID0gcmVzcG9uc2UudXJsO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbcmVxdWVzdF0uY29uY2F0KHJ1ICYmIHR5cGVvZiBydS5leGVjID09PSBcImZ1bmN0aW9uXCIgPyBydS5leGVjKHJlcXVlc3RVcmwpLnNsaWNlKDEpIDogW10pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlc3BvbnNlLmFwcGx5KHJlc3BvbnNlLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaW5jcmVtZW50UmVxdWVzdENvdW50KCkge1xuICAgIHZhciBjb3VudCA9ICsrdGhpcy5yZXF1ZXN0Q291bnQ7XG5cbiAgICB0aGlzLnJlcXVlc3RlZCA9IHRydWU7XG5cbiAgICB0aGlzLnJlcXVlc3RlZE9uY2UgPSBjb3VudCA9PT0gMTtcbiAgICB0aGlzLnJlcXVlc3RlZFR3aWNlID0gY291bnQgPT09IDI7XG4gICAgdGhpcy5yZXF1ZXN0ZWRUaHJpY2UgPSBjb3VudCA9PT0gMztcblxuICAgIHRoaXMuZmlyc3RSZXF1ZXN0ID0gdGhpcy5nZXRSZXF1ZXN0KDApO1xuICAgIHRoaXMuc2Vjb25kUmVxdWVzdCA9IHRoaXMuZ2V0UmVxdWVzdCgxKTtcbiAgICB0aGlzLnRoaXJkUmVxdWVzdCA9IHRoaXMuZ2V0UmVxdWVzdCgyKTtcblxuICAgIHRoaXMubGFzdFJlcXVlc3QgPSB0aGlzLmdldFJlcXVlc3QoY291bnQgLSAxKTtcbn1cblxudmFyIGZha2VTZXJ2ZXIgPSB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHZhciBzZXJ2ZXIgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgICAgICBzZXJ2ZXIuY29uZmlndXJlKGNvbmZpZyk7XG4gICAgICAgIHRoaXMueGhyID0gZmFrZVhoci51c2VGYWtlWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgc2VydmVyLnJlcXVlc3RzID0gW107XG4gICAgICAgIHNlcnZlci5yZXF1ZXN0Q291bnQgPSAwO1xuICAgICAgICBzZXJ2ZXIucXVldWUgPSBbXTtcbiAgICAgICAgc2VydmVyLnJlc3BvbnNlcyA9IFtdO1xuXG5cbiAgICAgICAgdGhpcy54aHIub25DcmVhdGUgPSBmdW5jdGlvbiAoeGhyT2JqKSB7XG4gICAgICAgICAgICB4aHJPYmoudW5zYWZlSGVhZGVyc0VuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEoc2VydmVyLnVuc2FmZUhlYWRlcnNFbmFibGVkID09PSBmYWxzZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2VydmVyLmFkZFJlcXVlc3QoeGhyT2JqKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmVyO1xuICAgIH0sXG5cbiAgICBjb25maWd1cmU6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgd2hpdGVsaXN0ID0ge1xuICAgICAgICAgICAgXCJhdXRvUmVzcG9uZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJhdXRvUmVzcG9uZEFmdGVyXCI6IHRydWUsXG4gICAgICAgICAgICBcInJlc3BvbmRJbW1lZGlhdGVseVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmYWtlSFRUUE1ldGhvZHNcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibG9nZ2VyXCI6IHRydWUsXG4gICAgICAgICAgICBcInVuc2FmZUhlYWRlcnNFbmFibGVkXCI6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG5cbiAgICAgICAgT2JqZWN0LmtleXMoY29uZmlnKS5mb3JFYWNoKGZ1bmN0aW9uIChzZXR0aW5nKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZyBpbiB3aGl0ZWxpc3QpIHtcbiAgICAgICAgICAgICAgICBzZWxmW3NldHRpbmddID0gY29uZmlnW3NldHRpbmddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLmxvZ0Vycm9yID0gY29uZmlndXJlTG9nRXJyb3IoY29uZmlnKTtcbiAgICB9LFxuXG4gICAgYWRkUmVxdWVzdDogZnVuY3Rpb24gYWRkUmVxdWVzdCh4aHJPYmopIHtcbiAgICAgICAgdmFyIHNlcnZlciA9IHRoaXM7XG4gICAgICAgIHB1c2guY2FsbCh0aGlzLnJlcXVlc3RzLCB4aHJPYmopO1xuXG4gICAgICAgIGluY3JlbWVudFJlcXVlc3RDb3VudC5jYWxsKHRoaXMpO1xuXG4gICAgICAgIHhock9iai5vblNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXJ2ZXIuaGFuZGxlUmVxdWVzdCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHNlcnZlci5yZXNwb25kSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgICAgICAgICBzZXJ2ZXIucmVzcG9uZCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJ2ZXIuYXV0b1Jlc3BvbmQgJiYgIXNlcnZlci5yZXNwb25kaW5nKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZlci5yZXNwb25kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZlci5yZXNwb25kKCk7XG4gICAgICAgICAgICAgICAgfSwgc2VydmVyLmF1dG9SZXNwb25kQWZ0ZXIgfHwgMTApO1xuXG4gICAgICAgICAgICAgICAgc2VydmVyLnJlc3BvbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRIVFRQTWV0aG9kOiBmdW5jdGlvbiBnZXRIVFRQTWV0aG9kKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHRoaXMuZmFrZUhUVFBNZXRob2RzICYmIC9wb3N0L2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKHJlcXVlc3QucmVxdWVzdEJvZHkgfHwgXCJcIikubWF0Y2goL19tZXRob2Q9KFteXFxiO10rKS8pO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogcmVxdWVzdC5tZXRob2Q7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVxdWVzdC5tZXRob2Q7XG4gICAgfSxcblxuICAgIGhhbmRsZVJlcXVlc3Q6IGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoeGhyKSB7XG4gICAgICAgIGlmICh4aHIuYXN5bmMpIHtcbiAgICAgICAgICAgIHB1c2guY2FsbCh0aGlzLnF1ZXVlLCB4aHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmVxdWVzdCh4aHIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxvZ2dlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBuby1vcDsgb3ZlcnJpZGUgdmlhIGNvbmZpZ3VyZSgpXG4gICAgfSxcblxuICAgIGxvZ0Vycm9yOiBjb25maWd1cmVMb2dFcnJvcih7fSksXG5cbiAgICBsb2c6IGZ1bmN0aW9uIGxvZyhyZXNwb25zZSwgcmVxdWVzdCkge1xuICAgICAgICB2YXIgc3RyO1xuXG4gICAgICAgIHN0ciA9IFwiUmVxdWVzdDpcXG5cIiArIGZvcm1hdChyZXF1ZXN0KSArIFwiXFxuXFxuXCI7XG4gICAgICAgIHN0ciArPSBcIlJlc3BvbnNlOlxcblwiICsgZm9ybWF0KHJlc3BvbnNlKSArIFwiXFxuXFxuXCI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmxvZ2dlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihzdHIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc3BvbmRXaXRoOiBmdW5jdGlvbiByZXNwb25kV2l0aChtZXRob2QsIHVybCwgYm9keSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgbWV0aG9kICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZUFycmF5KG1ldGhvZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgYm9keSA9IG1ldGhvZDtcbiAgICAgICAgICAgIHVybCA9IG1ldGhvZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgYm9keSA9IHVybDtcbiAgICAgICAgICAgIHVybCA9IG1ldGhvZDtcbiAgICAgICAgICAgIG1ldGhvZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdXNoLmNhbGwodGhpcy5yZXNwb25zZXMsIHtcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiICYmIHVybCAhPT0gXCJcIiA/IHBhdGhUb1JlZ2V4cCh1cmwpIDogdXJsLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHR5cGVvZiBib2R5ID09PSBcImZ1bmN0aW9uXCIgPyBib2R5IDogcmVzcG9uc2VBcnJheShib2R5KVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVzcG9uZDogZnVuY3Rpb24gcmVzcG9uZCgpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbmRXaXRoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcXVldWUgPSB0aGlzLnF1ZXVlIHx8IFtdO1xuICAgICAgICB2YXIgcmVxdWVzdHMgPSBxdWV1ZS5zcGxpY2UoMCwgcXVldWUubGVuZ3RoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlbGYucHJvY2Vzc1JlcXVlc3QocmVxdWVzdCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZXNwb25kQWxsOiBmdW5jdGlvbiByZXNwb25kQWxsKCkge1xuICAgICAgICBpZiAodGhpcy5yZXNwb25kSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVldWUgPSB0aGlzLnJlcXVlc3RzLnNsaWNlKDApO1xuXG4gICAgICAgIHZhciByZXF1ZXN0O1xuICAgICAgICB3aGlsZSAoKHJlcXVlc3QgPSB0aGlzLnF1ZXVlLnNoaWZ0KCkpKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NSZXF1ZXN0KHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHByb2Nlc3NSZXF1ZXN0OiBmdW5jdGlvbiBwcm9jZXNzUmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlIHx8IFs0MDQsIHt9LCBcIlwiXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2VzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IHRoaXMucmVzcG9uc2VzLmxlbmd0aCwgaSA9IGwgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2guY2FsbCh0aGlzLCB0aGlzLnJlc3BvbnNlc1tpXSwgcmVxdWVzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy5yZXNwb25zZXNbaV0ucmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlc3BvbnNlLCByZXF1ZXN0KTtcblxuICAgICAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uZChyZXNwb25zZVswXSwgcmVzcG9uc2VbMV0sIHJlc3BvbnNlWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcihcIkZha2Ugc2VydmVyIHJlcXVlc3QgcHJvY2Vzc2luZ1wiLCBlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXN0b3JlOiBmdW5jdGlvbiByZXN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54aHIucmVzdG9yZSAmJiB0aGlzLnhoci5yZXN0b3JlLmFwcGx5KHRoaXMueGhyLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICBnZXRSZXF1ZXN0OiBmdW5jdGlvbiBnZXRSZXF1ZXN0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RzW2luZGV4XSB8fCBudWxsO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRCZWhhdmlvcigpO1xuICAgICAgICB0aGlzLnJlc2V0SGlzdG9yeSgpO1xuICAgIH0sXG5cbiAgICByZXNldEJlaGF2aW9yOiBmdW5jdGlvbiByZXNldEJlaGF2aW9yKCkge1xuICAgICAgICB0aGlzLnJlc3BvbnNlcy5sZW5ndGggPSB0aGlzLnF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfSxcblxuICAgIHJlc2V0SGlzdG9yeTogZnVuY3Rpb24gcmVzZXRIaXN0b3J5KCkge1xuICAgICAgICB0aGlzLnJlcXVlc3RzLmxlbmd0aCA9IHRoaXMucmVxdWVzdENvdW50ID0gMDtcblxuICAgICAgICB0aGlzLnJlcXVlc3RlZE9uY2UgPSB0aGlzLnJlcXVlc3RlZFR3aWNlID0gdGhpcy5yZXF1ZXN0ZWRUaHJpY2UgPSB0aGlzLnJlcXVlc3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZmlyc3RSZXF1ZXN0ID0gdGhpcy5zZWNvbmRSZXF1ZXN0ID0gdGhpcy50aGlyZFJlcXVlc3QgPSB0aGlzLmxhc3RSZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZha2VTZXJ2ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5pc1N1cHBvcnRlZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICEhbmV3IEJsb2IoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KCkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBHbG9iYWxUZXh0RW5jb2RlciA9IHR5cGVvZiBUZXh0RW5jb2RlciAhPT0gXCJ1bmRlZmluZWRcIlxuICAgID8gVGV4dEVuY29kZXJcbiAgICA6IHJlcXVpcmUoXCJAc2lub25qcy90ZXh0LWVuY29kaW5nXCIpLlRleHRFbmNvZGVyO1xudmFyIGdsb2JhbE9iamVjdCA9IHJlcXVpcmUoXCJAc2lub25qcy9jb21tb25zXCIpLmdsb2JhbDtcbnZhciBjb25maWd1cmVMb2dFcnJvciA9IHJlcXVpcmUoXCIuLi9jb25maWd1cmUtbG9nZ2VyXCIpO1xudmFyIHNpbm9uRXZlbnQgPSByZXF1aXJlKFwiLi4vZXZlbnRcIik7XG52YXIgZXh0ZW5kID0gcmVxdWlyZShcImp1c3QtZXh0ZW5kXCIpO1xuXG52YXIgc3VwcG9ydHNQcm9ncmVzcyA9IHR5cGVvZiBQcm9ncmVzc0V2ZW50ICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIHN1cHBvcnRzQ3VzdG9tRXZlbnQgPSB0eXBlb2YgQ3VzdG9tRXZlbnQgIT09IFwidW5kZWZpbmVkXCI7XG52YXIgc3VwcG9ydHNGb3JtRGF0YSA9IHR5cGVvZiBGb3JtRGF0YSAhPT0gXCJ1bmRlZmluZWRcIjtcbnZhciBzdXBwb3J0c0FycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIHN1cHBvcnRzQmxvYiA9IHJlcXVpcmUoXCIuL2Jsb2JcIikuaXNTdXBwb3J0ZWQ7XG5cbmZ1bmN0aW9uIGdldFdvcmtpbmdYSFIoZ2xvYmFsU2NvcGUpIHtcbiAgICB2YXIgc3VwcG9ydHNYSFIgPSB0eXBlb2YgZ2xvYmFsU2NvcGUuWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgaWYgKHN1cHBvcnRzWEhSKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxTY29wZS5YTUxIdHRwUmVxdWVzdDtcbiAgICB9XG5cbiAgICB2YXIgc3VwcG9ydHNBY3RpdmVYID0gdHlwZW9mIGdsb2JhbFNjb3BlLkFjdGl2ZVhPYmplY3QgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgaWYgKHN1cHBvcnRzQWN0aXZlWCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBnbG9iYWxTY29wZS5BY3RpdmVYT2JqZWN0KFwiTVNYTUwyLlhNTEhUVFAuMy4wXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8gUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jZm9yYmlkZGVuLWhlYWRlci1uYW1lXG52YXIgdW5zYWZlSGVhZGVycyA9IHtcbiAgICBcIkFjY2VwdC1DaGFyc2V0XCI6IHRydWUsXG4gICAgXCJBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LUhlYWRlcnNcIjogdHJ1ZSxcbiAgICBcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtTWV0aG9kXCI6IHRydWUsXG4gICAgXCJBY2NlcHQtRW5jb2RpbmdcIjogdHJ1ZSxcbiAgICBcIkNvbm5lY3Rpb25cIjogdHJ1ZSxcbiAgICBcIkNvbnRlbnQtTGVuZ3RoXCI6IHRydWUsXG4gICAgXCJDb29raWVcIjogdHJ1ZSxcbiAgICBcIkNvb2tpZTJcIjogdHJ1ZSxcbiAgICBcIkNvbnRlbnQtVHJhbnNmZXItRW5jb2RpbmdcIjogdHJ1ZSxcbiAgICBcIkRhdGVcIjogdHJ1ZSxcbiAgICBcIkROVFwiOiB0cnVlLFxuICAgIFwiRXhwZWN0XCI6IHRydWUsXG4gICAgXCJIb3N0XCI6IHRydWUsXG4gICAgXCJLZWVwLUFsaXZlXCI6IHRydWUsXG4gICAgXCJPcmlnaW5cIjogdHJ1ZSxcbiAgICBcIlJlZmVyZXJcIjogdHJ1ZSxcbiAgICBcIlRFXCI6IHRydWUsXG4gICAgXCJUcmFpbGVyXCI6IHRydWUsXG4gICAgXCJUcmFuc2Zlci1FbmNvZGluZ1wiOiB0cnVlLFxuICAgIFwiVXBncmFkZVwiOiB0cnVlLFxuICAgIFwiVXNlci1BZ2VudFwiOiB0cnVlLFxuICAgIFwiVmlhXCI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIEV2ZW50VGFyZ2V0SGFuZGxlcigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGV2ZW50cyA9IFtcImxvYWRzdGFydFwiLCBcInByb2dyZXNzXCIsIFwiYWJvcnRcIiwgXCJlcnJvclwiLCBcImxvYWRcIiwgXCJ0aW1lb3V0XCIsIFwibG9hZGVuZFwiXTtcblxuICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lKSB7XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gc2VsZltcIm9uXCIgKyBldmVudE5hbWVdO1xuXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIgJiYgdHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXZlbnRzLmZvckVhY2goYWRkRXZlbnRMaXN0ZW5lcik7XG59XG5cbkV2ZW50VGFyZ2V0SGFuZGxlci5wcm90b3R5cGUgPSBzaW5vbkV2ZW50LkV2ZW50VGFyZ2V0O1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXJWYWx1ZSh2YWx1ZSkge1xuICAgIC8vIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2h0dHAtd2hpdGVzcGFjZS1ieXRlc1xuICAgIC8qZXNsaW50IG5vLWNvbnRyb2wtcmVnZXg6IFwib2ZmXCIqL1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9eW1xceDA5XFx4MEFcXHgwRFxceDIwXSt8W1xceDA5XFx4MEFcXHgwRFxceDIwXSskL2csIFwiXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRIZWFkZXIoaGVhZGVycywgaGVhZGVyKSB7XG4gICAgdmFyIGZvdW5kSGVhZGVyID0gT2JqZWN0LmtleXMoaGVhZGVycykuZmlsdGVyKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiBoLnRvTG93ZXJDYXNlKCkgPT09IGhlYWRlci50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvdW5kSGVhZGVyWzBdIHx8IG51bGw7XG59XG5cbmZ1bmN0aW9uIGV4Y2x1ZGVTZXRDb29raWUySGVhZGVyKGhlYWRlcikge1xuICAgIHJldHVybiAhL15TZXQtQ29va2llMj8kL2kudGVzdChoZWFkZXIpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlSZXNwb25zZUJvZHlUeXBlKGJvZHksIHJlc3BvbnNlVHlwZSkge1xuICAgIHZhciBlcnJvciA9IG51bGw7XG4gICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCI7XG5cbiAgICBpZiAocmVzcG9uc2VUeXBlID09PSBcImFycmF5YnVmZmVyXCIpIHtcblxuICAgICAgICBpZiAoIWlzU3RyaW5nICYmICEoYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXCJBdHRlbXB0ZWQgdG8gcmVzcG9uZCB0byBmYWtlIFhNTEh0dHBSZXF1ZXN0IHdpdGggXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgKyBcIiwgd2hpY2ggaXMgbm90IGEgc3RyaW5nIG9yIEFycmF5QnVmZmVyLlwiKTtcbiAgICAgICAgICAgIGVycm9yLm5hbWUgPSBcIkludmFsaWRCb2R5RXhjZXB0aW9uXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoIWlzU3RyaW5nKSB7XG4gICAgICAgIGVycm9yID0gbmV3IEVycm9yKFwiQXR0ZW1wdGVkIHRvIHJlc3BvbmQgdG8gZmFrZSBYTUxIdHRwUmVxdWVzdCB3aXRoIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgKyBcIiwgd2hpY2ggaXMgbm90IGEgc3RyaW5nLlwiKTtcbiAgICAgICAgZXJyb3IubmFtZSA9IFwiSW52YWxpZEJvZHlFeGNlcHRpb25cIjtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0VG9BcnJheUJ1ZmZlcihib2R5LCBlbmNvZGluZykge1xuICAgIGlmIChib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBHbG9iYWxUZXh0RW5jb2RlcihlbmNvZGluZyB8fCBcInV0Zi04XCIpLmVuY29kZShib2R5KS5idWZmZXI7XG59XG5cbmZ1bmN0aW9uIGlzWG1sQ29udGVudFR5cGUoY29udGVudFR5cGUpIHtcbiAgICByZXR1cm4gIWNvbnRlbnRUeXBlIHx8IC8odGV4dFxcL3htbCl8KGFwcGxpY2F0aW9uXFwveG1sKXwoXFwreG1sKS8udGVzdChjb250ZW50VHlwZSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyUmVzcG9uc2UoeGhyKSB7XG4gICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiXCIgfHwgeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dCA9IG51bGw7XG4gICAgfVxuICAgIHhoci5yZXNwb25zZVhNTCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGZha2VYTUxIdHRwUmVxdWVzdEZvcihnbG9iYWxTY29wZSkge1xuICAgIHZhciBpc1JlYWN0TmF0aXZlID0gZ2xvYmFsU2NvcGUubmF2aWdhdG9yICYmIGdsb2JhbFNjb3BlLm5hdmlnYXRvci5wcm9kdWN0ID09PSBcIlJlYWN0TmF0aXZlXCI7XG4gICAgdmFyIHNpbm9uWGhyID0geyBYTUxIdHRwUmVxdWVzdDogZ2xvYmFsU2NvcGUuWE1MSHR0cFJlcXVlc3QgfTtcbiAgICBzaW5vblhoci5HbG9iYWxYTUxIdHRwUmVxdWVzdCA9IGdsb2JhbFNjb3BlLlhNTEh0dHBSZXF1ZXN0O1xuICAgIHNpbm9uWGhyLkdsb2JhbEFjdGl2ZVhPYmplY3QgPSBnbG9iYWxTY29wZS5BY3RpdmVYT2JqZWN0O1xuICAgIHNpbm9uWGhyLnN1cHBvcnRzQWN0aXZlWCA9IHR5cGVvZiBzaW5vblhoci5HbG9iYWxBY3RpdmVYT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIHNpbm9uWGhyLnN1cHBvcnRzWEhSID0gdHlwZW9mIHNpbm9uWGhyLkdsb2JhbFhNTEh0dHBSZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIHNpbm9uWGhyLndvcmtpbmdYSFIgPSBnZXRXb3JraW5nWEhSKGdsb2JhbFNjb3BlKTtcbiAgICBzaW5vblhoci5zdXBwb3J0c1RpbWVvdXQgPVxuICAgICAgICAoc2lub25YaHIuc3VwcG9ydHNYSFIgJiYgXCJ0aW1lb3V0XCIgaW4gKG5ldyBzaW5vblhoci5HbG9iYWxYTUxIdHRwUmVxdWVzdCgpKSk7XG4gICAgc2lub25YaHIuc3VwcG9ydHNDT1JTID0gaXNSZWFjdE5hdGl2ZSB8fFxuICAgICAgICAoc2lub25YaHIuc3VwcG9ydHNYSFIgJiYgXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiAobmV3IHNpbm9uWGhyLkdsb2JhbFhNTEh0dHBSZXF1ZXN0KCkpKTtcblxuICAgIC8vIE5vdGUgdGhhdCBmb3IgRmFrZVhNTEh0dHBSZXF1ZXN0IHRvIHdvcmsgcHJlIEVTNVxuICAgIC8vIHdlIGxvc2Ugc29tZSBvZiB0aGUgYWxpZ25tZW50IHdpdGggdGhlIHNwZWMuXG4gICAgLy8gVG8gZW5zdXJlIGFzIGNsb3NlIGEgbWF0Y2ggYXMgcG9zc2libGUsXG4gICAgLy8gc2V0IHJlc3BvbnNlVHlwZSBiZWZvcmUgY2FsbGluZyBvcGVuLCBzZW5kIG9yIHJlc3BvbmQ7XG4gICAgZnVuY3Rpb24gRmFrZVhNTEh0dHBSZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICBFdmVudFRhcmdldEhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gRmFrZVhNTEh0dHBSZXF1ZXN0LlVOU0VOVDtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVycyA9IHt9O1xuICAgICAgICB0aGlzLnJlcXVlc3RCb2R5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSBcIlwiO1xuICAgICAgICB0aGlzLnVwbG9hZCA9IG5ldyBFdmVudFRhcmdldEhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSBcIlwiO1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gXCJcIjtcbiAgICAgICAgdGhpcy5sb2dFcnJvciA9IGNvbmZpZ3VyZUxvZ0Vycm9yKGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKHNpbm9uWGhyLnN1cHBvcnRzVGltZW91dCkge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW5vblhoci5zdXBwb3J0c0NPUlMpIHtcbiAgICAgICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIEZha2VYTUxIdHRwUmVxdWVzdC5vbkNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBGYWtlWE1MSHR0cFJlcXVlc3Qub25DcmVhdGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlTdGF0ZSh4aHIpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSBGYWtlWE1MSHR0cFJlcXVlc3QuT1BFTkVEKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJTlZBTElEX1NUQVRFX0VSUlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4aHIuc2VuZEZsYWcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklOVkFMSURfU1RBVEVfRVJSXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbGFyZ2VzdCBhcml0eSBpbiBYSFIgaXMgNSAtIFhIUiNvcGVuXG4gICAgdmFyIGFwcGx5ID0gZnVuY3Rpb24gKG9iaiwgbWV0aG9kLCBhcmdzKSB7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG9ialttZXRob2RdKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBvYmpbbWV0aG9kXShhcmdzWzBdKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG9ialttZXRob2RdKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gb2JqW21ldGhvZF0oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBvYmpbbWV0aG9kXShhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIG9ialttZXRob2RdKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKFwiVW5oYW5kbGVkIGNhc2VcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRmFrZVhNTEh0dHBSZXF1ZXN0LmZpbHRlcnMgPSBbXTtcbiAgICBGYWtlWE1MSHR0cFJlcXVlc3QuYWRkRmlsdGVyID0gZnVuY3Rpb24gYWRkRmlsdGVyKGZuKSB7XG4gICAgICAgIHRoaXMuZmlsdGVycy5wdXNoKGZuKTtcbiAgICB9O1xuICAgIEZha2VYTUxIdHRwUmVxdWVzdC5kZWZha2UgPSBmdW5jdGlvbiBkZWZha2UoZmFrZVhociwgeGhyQXJncykge1xuICAgICAgICB2YXIgeGhyID0gbmV3IHNpbm9uWGhyLndvcmtpbmdYSFIoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG5cbiAgICAgICAgW1xuICAgICAgICAgICAgXCJvcGVuXCIsXG4gICAgICAgICAgICBcInNldFJlcXVlc3RIZWFkZXJcIixcbiAgICAgICAgICAgIFwiYWJvcnRcIixcbiAgICAgICAgICAgIFwiZ2V0UmVzcG9uc2VIZWFkZXJcIixcbiAgICAgICAgICAgIFwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzXCIsXG4gICAgICAgICAgICBcImFkZEV2ZW50TGlzdGVuZXJcIixcbiAgICAgICAgICAgIFwib3ZlcnJpZGVNaW1lVHlwZVwiLFxuICAgICAgICAgICAgXCJyZW1vdmVFdmVudExpc3RlbmVyXCJcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgICAgIGZha2VYaHJbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwbHkoeGhyLCBtZXRob2QsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBmYWtlWGhyLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZWY6IGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLXJlc3BvbnNldHlwZS1hdHRyaWJ1dGVcbiAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlICE9PSBmYWtlWGhyLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBmYWtlWGhyLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcHBseSh4aHIsIFwic2VuZFwiLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjb3B5QXR0cnMgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgICAgICAgICAgZmFrZVhoclthdHRyXSA9IHhoclthdHRyXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdGF0ZUNoYW5nZVN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZmFrZVhoci5yZWFkeVN0YXRlID0geGhyLnJlYWR5U3RhdGU7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPj0gRmFrZVhNTEh0dHBSZXF1ZXN0LkhFQURFUlNfUkVDRUlWRUQpIHtcbiAgICAgICAgICAgICAgICBjb3B5QXR0cnMoW1wic3RhdHVzXCIsIFwic3RhdHVzVGV4dFwiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPj0gRmFrZVhNTEh0dHBSZXF1ZXN0LkxPQURJTkcpIHtcbiAgICAgICAgICAgICAgICBjb3B5QXR0cnMoW1wicmVzcG9uc2VcIl0pO1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcIlwiIHx8IHhoci5yZXNwb25zZVR5cGUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvcHlBdHRycyhbXCJyZXNwb25zZVRleHRcIl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB4aHIucmVhZHlTdGF0ZSA9PT0gRmFrZVhNTEh0dHBSZXF1ZXN0LkRPTkUgJiZcbiAgICAgICAgICAgICAgICAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiB8fCB4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb3B5QXR0cnMoW1wicmVzcG9uc2VYTUxcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdGF0ZUNoYW5nZUVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChmYWtlWGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSkge1xuICAgICAgICAgICAgICAgIGZha2VYaHIub25yZWFkeXN0YXRlY2hhbmdlLmNhbGwoZmFrZVhociwgeyB0YXJnZXQ6IGZha2VYaHIsIGN1cnJlbnRUYXJnZXQ6IGZha2VYaHIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0YXRlQ2hhbmdlID0gZnVuY3Rpb24gc3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgICAgICBzdGF0ZUNoYW5nZVN0YXJ0KCk7XG4gICAgICAgICAgICBzdGF0ZUNoYW5nZUVuZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh4aHIuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsIHN0YXRlQ2hhbmdlU3RhcnQpO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhmYWtlWGhyLmV2ZW50TGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIC8qZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jKi9cbiAgICAgICAgICAgICAgICBmYWtlWGhyLmV2ZW50TGlzdGVuZXJzW2V2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLmxpc3RlbmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlOiBoYW5kbGVyLmNhcHR1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNlOiBoYW5kbGVyLm9uY2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLyplc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyovXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsIHN0YXRlQ2hhbmdlRW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBzdGF0ZUNoYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBhcHBseSh4aHIsIFwib3BlblwiLCB4aHJBcmdzKTtcbiAgICB9O1xuICAgIEZha2VYTUxIdHRwUmVxdWVzdC51c2VGaWx0ZXJzID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlSZXF1ZXN0T3BlbmVkKHhocikge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IEZha2VYTUxIdHRwUmVxdWVzdC5PUEVORUQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklOVkFMSURfU1RBVEVfRVJSIC0gXCIgKyB4aHIucmVhZHlTdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlSZXF1ZXN0U2VudCh4aHIpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBGYWtlWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWVzdCBkb25lXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmVyaWZ5SGVhZGVyc1JlY2VpdmVkKHhocikge1xuICAgICAgICBpZiAoeGhyLmFzeW5jICYmIHhoci5yZWFkeVN0YXRlICE9PSBGYWtlWE1MSHR0cFJlcXVlc3QuSEVBREVSU19SRUNFSVZFRCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gaGVhZGVycyByZWNlaXZlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRSZXNwb25zZUJvZHkocmVzcG9uc2VUeXBlLCBjb250ZW50VHlwZSwgYm9keSkge1xuICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSBcIlwiIHx8IHJlc3BvbnNlVHlwZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnRzQXJyYXlCdWZmZXIgJiYgcmVzcG9uc2VUeXBlID09PSBcImFycmF5YnVmZmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0VG9BcnJheUJ1ZmZlcihib2R5KTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZVR5cGUgPT09IFwianNvblwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiBwYXJzaW5nIGZhaWx1cmUgYXMgbnVsbFxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnRzQmxvYiAmJiByZXNwb25zZVR5cGUgPT09IFwiYmxvYlwiKSB7XG4gICAgICAgICAgICB2YXIgYmxvYk9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIGJsb2JPcHRpb25zLnR5cGUgPSBjb250ZW50VHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgQmxvYihbY29udmVydFRvQXJyYXlCdWZmZXIoYm9keSldLCBibG9iT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgICAgIGlmIChpc1htbENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBGYWtlWE1MSHR0cFJlcXVlc3QucGFyc2VYTUwoYm9keSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlc3BvbnNlVHlwZSBcIiArIHJlc3BvbnNlVHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RlcHMgdG8gZm9sbG93IHdoZW4gdGhlcmUgaXMgYW4gZXJyb3IsIGFjY29yZGluZyB0bzpcbiAgICAgKiBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3JlcXVlc3QtZXJyb3Itc3RlcHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXF1ZXN0RXJyb3JTdGVwcyh4aHIpIHtcbiAgICAgICAgY2xlYXJSZXNwb25zZSh4aHIpO1xuICAgICAgICB4aHIuZXJyb3JGbGFnID0gdHJ1ZTtcbiAgICAgICAgeGhyLnJlcXVlc3RIZWFkZXJzID0ge307XG4gICAgICAgIHhoci5yZXNwb25zZUhlYWRlcnMgPSB7fTtcblxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IEZha2VYTUxIdHRwUmVxdWVzdC5VTlNFTlQgJiYgeGhyLnNlbmRGbGFnXG4gICAgICAgICAgICAmJiB4aHIucmVhZHlTdGF0ZSAhPT0gRmFrZVhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgICAgICAgIHhoci5yZWFkeVN0YXRlQ2hhbmdlKEZha2VYTUxIdHRwUmVxdWVzdC5ET05FKTtcbiAgICAgICAgICAgIHhoci5zZW5kRmxhZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgRmFrZVhNTEh0dHBSZXF1ZXN0LnBhcnNlWE1MID0gZnVuY3Rpb24gcGFyc2VYTUwodGV4dCkge1xuICAgICAgICAvLyBUcmVhdCBlbXB0eSBzdHJpbmcgYXMgcGFyc2luZyBmYWlsdXJlXG4gICAgICAgIGlmICh0ZXh0ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgRE9NUGFyc2VyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZXJlcnJvck5TID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnNlcmVycm9ycyA9IHBhcnNlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJzZUZyb21TdHJpbmcoXCJJTlZBTElEXCIsIFwidGV4dC94bWxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXJzZXJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZXJlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyZXJyb3JOUyA9IHBhcnNlcmVycm9yc1swXS5uYW1lc3BhY2VVUkk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhc3NpbmcgaW52YWxpZCBYTUwgbWFrZXMgSUUxMSB0aHJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gbm8gbmFtZXNwYWNlIG5lZWRzIHRvIGJlIGRldGVybWluZWRcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHRleHQsIFwidGV4dC94bWxcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmdldEVsZW1lbnRzQnlUYWdOYW1lTlMocGFyc2VyZXJyb3JOUywgXCJwYXJzZXJlcnJvclwiKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbnVsbCA6IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHhtbERvYyA9IG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxET01cIik7XG4gICAgICAgICAgICAgICAgeG1sRG9jLmFzeW5jID0gXCJmYWxzZVwiO1xuICAgICAgICAgICAgICAgIHhtbERvYy5sb2FkWE1MKHRleHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB4bWxEb2MucGFyc2VFcnJvci5lcnJvckNvZGUgIT09IDBcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsIDogeG1sRG9jO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIFVuYWJsZSB0byBwYXJzZSBYTUwgLSBubyBiaWdnaWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBGYWtlWE1MSHR0cFJlcXVlc3Quc3RhdHVzQ29kZXMgPSB7XG4gICAgICAgIDEwMDogXCJDb250aW51ZVwiLFxuICAgICAgICAxMDE6IFwiU3dpdGNoaW5nIFByb3RvY29sc1wiLFxuICAgICAgICAyMDA6IFwiT0tcIixcbiAgICAgICAgMjAxOiBcIkNyZWF0ZWRcIixcbiAgICAgICAgMjAyOiBcIkFjY2VwdGVkXCIsXG4gICAgICAgIDIwMzogXCJOb24tQXV0aG9yaXRhdGl2ZSBJbmZvcm1hdGlvblwiLFxuICAgICAgICAyMDQ6IFwiTm8gQ29udGVudFwiLFxuICAgICAgICAyMDU6IFwiUmVzZXQgQ29udGVudFwiLFxuICAgICAgICAyMDY6IFwiUGFydGlhbCBDb250ZW50XCIsXG4gICAgICAgIDIwNzogXCJNdWx0aS1TdGF0dXNcIixcbiAgICAgICAgMzAwOiBcIk11bHRpcGxlIENob2ljZVwiLFxuICAgICAgICAzMDE6IFwiTW92ZWQgUGVybWFuZW50bHlcIixcbiAgICAgICAgMzAyOiBcIkZvdW5kXCIsXG4gICAgICAgIDMwMzogXCJTZWUgT3RoZXJcIixcbiAgICAgICAgMzA0OiBcIk5vdCBNb2RpZmllZFwiLFxuICAgICAgICAzMDU6IFwiVXNlIFByb3h5XCIsXG4gICAgICAgIDMwNzogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcbiAgICAgICAgNDAwOiBcIkJhZCBSZXF1ZXN0XCIsXG4gICAgICAgIDQwMTogXCJVbmF1dGhvcml6ZWRcIixcbiAgICAgICAgNDAyOiBcIlBheW1lbnQgUmVxdWlyZWRcIixcbiAgICAgICAgNDAzOiBcIkZvcmJpZGRlblwiLFxuICAgICAgICA0MDQ6IFwiTm90IEZvdW5kXCIsXG4gICAgICAgIDQwNTogXCJNZXRob2QgTm90IEFsbG93ZWRcIixcbiAgICAgICAgNDA2OiBcIk5vdCBBY2NlcHRhYmxlXCIsXG4gICAgICAgIDQwNzogXCJQcm94eSBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiLFxuICAgICAgICA0MDg6IFwiUmVxdWVzdCBUaW1lb3V0XCIsXG4gICAgICAgIDQwOTogXCJDb25mbGljdFwiLFxuICAgICAgICA0MTA6IFwiR29uZVwiLFxuICAgICAgICA0MTE6IFwiTGVuZ3RoIFJlcXVpcmVkXCIsXG4gICAgICAgIDQxMjogXCJQcmVjb25kaXRpb24gRmFpbGVkXCIsXG4gICAgICAgIDQxMzogXCJSZXF1ZXN0IEVudGl0eSBUb28gTGFyZ2VcIixcbiAgICAgICAgNDE0OiBcIlJlcXVlc3QtVVJJIFRvbyBMb25nXCIsXG4gICAgICAgIDQxNTogXCJVbnN1cHBvcnRlZCBNZWRpYSBUeXBlXCIsXG4gICAgICAgIDQxNjogXCJSZXF1ZXN0ZWQgUmFuZ2UgTm90IFNhdGlzZmlhYmxlXCIsXG4gICAgICAgIDQxNzogXCJFeHBlY3RhdGlvbiBGYWlsZWRcIixcbiAgICAgICAgNDIyOiBcIlVucHJvY2Vzc2FibGUgRW50aXR5XCIsXG4gICAgICAgIDUwMDogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgNTAxOiBcIk5vdCBJbXBsZW1lbnRlZFwiLFxuICAgICAgICA1MDI6IFwiQmFkIEdhdGV3YXlcIixcbiAgICAgICAgNTAzOiBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIixcbiAgICAgICAgNTA0OiBcIkdhdGV3YXkgVGltZW91dFwiLFxuICAgICAgICA1MDU6IFwiSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWRcIlxuICAgIH07XG5cbiAgICBleHRlbmQoRmFrZVhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgc2lub25FdmVudC5FdmVudFRhcmdldCwge1xuICAgICAgICBhc3luYzogdHJ1ZSxcblxuICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKG1ldGhvZCwgdXJsLCBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICAgICAgdGhpcy5hc3luYyA9IHR5cGVvZiBhc3luYyA9PT0gXCJib29sZWFuXCIgPyBhc3luYyA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgICAgICBjbGVhclJlc3BvbnNlKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5zZW5kRmxhZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoRmFrZVhNTEh0dHBSZXF1ZXN0LnVzZUZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeGhyQXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICB2YXIgZGVmYWtlID0gRmFrZVhNTEh0dHBSZXF1ZXN0LmZpbHRlcnMuc29tZShmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXIuYXBwbHkodGhpcywgeGhyQXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmFrZSkge1xuICAgICAgICAgICAgICAgICAgICBGYWtlWE1MSHR0cFJlcXVlc3QuZGVmYWtlKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGVDaGFuZ2UoRmFrZVhNTEh0dHBSZXF1ZXN0Lk9QRU5FRCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZHlTdGF0ZUNoYW5nZTogZnVuY3Rpb24gcmVhZHlTdGF0ZUNoYW5nZShzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHZhciByZWFkeVN0YXRlQ2hhbmdlRXZlbnQgPSBuZXcgc2lub25FdmVudC5FdmVudChcInJlYWR5c3RhdGVjaGFuZ2VcIiwgZmFsc2UsIGZhbHNlLCB0aGlzKTtcbiAgICAgICAgICAgIHZhciBldmVudCwgcHJvZ3Jlc3M7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25yZWFkeXN0YXRlY2hhbmdlKHJlYWR5U3RhdGVDaGFuZ2VFdmVudCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKFwiRmFrZSBYSFIgb25yZWFkeXN0YXRlY2hhbmdlIGhhbmRsZXJcIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBGYWtlWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVkT3V0IHx8IHRoaXMuYWJvcnRlZCB8fCB0aGlzLnN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IHtsb2FkZWQ6IDAsIHRvdGFsOiAwfTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSAodGhpcy50aW1lZE91dCAmJiBcInRpbWVvdXRcIikgfHwgKHRoaXMuYWJvcnRlZCAmJiBcImFib3J0XCIpIHx8IFwiZXJyb3JcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IHtsb2FkZWQ6IDEwMCwgdG90YWw6IDEwMH07XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gXCJsb2FkXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRzUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWQuZGlzcGF0Y2hFdmVudChuZXcgc2lub25FdmVudC5Qcm9ncmVzc0V2ZW50KFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MsIHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWQuZGlzcGF0Y2hFdmVudChuZXcgc2lub25FdmVudC5Qcm9ncmVzc0V2ZW50KGV2ZW50LCBwcm9ncmVzcywgdGhpcykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZC5kaXNwYXRjaEV2ZW50KG5ldyBzaW5vbkV2ZW50LlByb2dyZXNzRXZlbnQoXCJsb2FkZW5kXCIsIHByb2dyZXNzLCB0aGlzKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBzaW5vbkV2ZW50LlByb2dyZXNzRXZlbnQoXCJwcm9ncmVzc1wiLCBwcm9ncmVzcywgdGhpcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgc2lub25FdmVudC5Qcm9ncmVzc0V2ZW50KGV2ZW50LCBwcm9ncmVzcywgdGhpcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgc2lub25FdmVudC5Qcm9ncmVzc0V2ZW50KFwibG9hZGVuZFwiLCBwcm9ncmVzcywgdGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQocmVhZHlTdGF0ZUNoYW5nZUV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZWYgaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtc2V0cmVxdWVzdGhlYWRlcigpLW1ldGhvZFxuICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQnkgUkZDNzIzMCwgc2VjdGlvbiAzLjIuNCwgaGVhZGVyIHZhbHVlcyBzaG91bGQgYmUgc3RyaW5ncy4gR290IFwiICsgdHlwZW9mIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZlcmlmeVN0YXRlKHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgY2hlY2tVbnNhZmVIZWFkZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy51bnNhZmVIZWFkZXJzRW5hYmxlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVbnNhZmVIZWFkZXJzID0gdGhpcy51bnNhZmVIZWFkZXJzRW5hYmxlZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hlY2tVbnNhZmVIZWFkZXJzICYmIChnZXRIZWFkZXIodW5zYWZlSGVhZGVycywgaGVhZGVyKSAhPT0gbnVsbCB8fCAvXihTZWMtfFByb3h5LSkvaS50ZXN0KGhlYWRlcikpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVmdXNlZCB0byBzZXQgdW5zYWZlIGhlYWRlciBcXFwiXCIgKyBoZWFkZXIgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlID0gbm9ybWFsaXplSGVhZGVyVmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdIZWFkZXIgPSBnZXRIZWFkZXIodGhpcy5yZXF1ZXN0SGVhZGVycywgaGVhZGVyKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0hlYWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnNbZXhpc3RpbmdIZWFkZXJdICs9IFwiLCBcIiArIHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXJzW2hlYWRlcl0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZXRTdGF0dXM6IGZ1bmN0aW9uIHNldFN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgICAgIHZhciBzYW5pdGl6ZWRTdGF0dXMgPSB0eXBlb2Ygc3RhdHVzID09PSBcIm51bWJlclwiID8gc3RhdHVzIDogMjAwO1xuXG4gICAgICAgICAgICB2ZXJpZnlSZXF1ZXN0T3BlbmVkKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBzYW5pdGl6ZWRTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSBGYWtlWE1MSHR0cFJlcXVlc3Quc3RhdHVzQ29kZXNbc2FuaXRpemVkU3RhdHVzXTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBIZWxwcyB0ZXN0aW5nXG4gICAgICAgIHNldFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24gc2V0UmVzcG9uc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIHZlcmlmeVJlcXVlc3RPcGVuZWQodGhpcyk7XG5cbiAgICAgICAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSB0aGlzLnJlc3BvbnNlSGVhZGVycyA9IHt9O1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnNbaGVhZGVyXSA9IGhlYWRlcnNbaGVhZGVyXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZUNoYW5nZShGYWtlWE1MSHR0cFJlcXVlc3QuSEVBREVSU19SRUNFSVZFRCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IEZha2VYTUxIdHRwUmVxdWVzdC5IRUFERVJTX1JFQ0VJVkVEO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEN1cnJlbnRseSB0cmVhdHMgQUxMIGRhdGEgYXMgYSBET01TdHJpbmcgKGkuZS4gbm8gRG9jdW1lbnQpXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoZGF0YSkge1xuICAgICAgICAgICAgdmVyaWZ5U3RhdGUodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghL14oaGVhZCkkL2kudGVzdCh0aGlzLm1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSBnZXRIZWFkZXIodGhpcy5yZXF1ZXN0SGVhZGVycywgXCJDb250ZW50LVR5cGVcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdEhlYWRlcnNbY29udGVudFR5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMucmVxdWVzdEhlYWRlcnNbY29udGVudFR5cGVdLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyc1tjb250ZW50VHlwZV0gPSB2YWx1ZVswXSArIFwiO2NoYXJzZXQ9dXRmLThcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnRzRm9ybURhdGEgJiYgIShkYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcInRleHQvcGxhaW47Y2hhcnNldD11dGYtOFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEJvZHkgPSBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVycm9yRmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZW5kRmxhZyA9IHRoaXMuYXN5bmM7XG4gICAgICAgICAgICBjbGVhclJlc3BvbnNlKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub25TZW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VuZCh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT25seSBsaXN0ZW4gaWYgc2V0SW50ZXJ2YWwgYW5kIERhdGUgYXJlIGEgc3R1YmJlZC5cbiAgICAgICAgICAgIGlmIChzaW5vblhoci5zdXBwb3J0c1RpbWVvdXQgJiYgdHlwZW9mIHNldEludGVydmFsLmNsb2NrID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBEYXRlLmNsb2NrID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYXRlZFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIC8vIExpc3RlbiB0byBhbnkgcG9zc2libGUgdGljayBieSBmYWtlIHRpbWVycyBhbmQgY2hlY2sgdG8gc2VlIGlmIHRpbWVvdXQgaGFzXG4gICAgICAgICAgICAgICAgLy8gYmVlbiBleGNlZWRlZC4gSXQncyBpbXBvcnRhbnQgdG8gbm90ZSB0aGF0IHRpbWVvdXQgY2FuIGJlIGNoYW5nZWQgd2hpbGUgYSByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLy8gaXMgaW4gZmxpZ2h0LCBzbyB3ZSBtdXN0IGNoZWNrIGFueXRpbWUgdGhlIGVuZCB1c2VyIGZvcmNlcyBhIGNsb2NrIHRpY2sgdG8gbWFrZVxuICAgICAgICAgICAgICAgIC8vIHN1cmUgdGltZW91dCBoYXNuJ3QgY2hhbmdlZC5cbiAgICAgICAgICAgICAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI2RmblJldHVybkxpbmstMlxuICAgICAgICAgICAgICAgIHZhciBjbGVhckludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSByZWFkeVN0YXRlIGhhcyBiZWVuIHJlc2V0IG9yIGlzIGRvbmUuIElmIHRoaXMgaXMgdGhlIGNhc2UsIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBubyB0aW1lb3V0LiBUaGlzIHdpbGwgYWxzbyBwcmV2ZW50IGFib3J0ZWQgcmVxdWVzdHMgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vIGZha2VTZXJ2ZXJXaXRoQ2xvY2sgZnJvbSB0cmlnZ2VyaW5nIHVubmVjZXNzYXJ5IHJlc3BvbnNlcy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYucmVhZHlTdGF0ZSA9PT0gRmFrZVhNTEh0dHBSZXF1ZXN0LlVOU0VOVFxuICAgICAgICAgICAgICAgICAgICB8fCBzZWxmLnJlYWR5U3RhdGUgPT09IEZha2VYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNsZWFySW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYudGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBzZWxmLnRpbWVvdXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRGF0ZS5ub3coKSA+PSAoaW5pdGlhdGVkVGltZSArIHNlbGYudGltZW91dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJUaW1lb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjbGVhckludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgc2lub25FdmVudC5FdmVudChcImxvYWRzdGFydFwiLCBmYWxzZSwgZmFsc2UsIHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhYm9ydDogZnVuY3Rpb24gYWJvcnQoKSB7XG4gICAgICAgICAgICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVxdWVzdEVycm9yU3RlcHModGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBGYWtlWE1MSHR0cFJlcXVlc3QuVU5TRU5UO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhclJlc3BvbnNlKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lcnJvckZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zZUhlYWRlcnMgPSB7fTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlQ2hhbmdlKEZha2VYTUxIdHRwUmVxdWVzdC5ET05FKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyVGltZW91dDogZnVuY3Rpb24gdHJpZ2dlclRpbWVvdXQoKSB7XG4gICAgICAgICAgICBpZiAoc2lub25YaHIuc3VwcG9ydHNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lZE91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEVycm9yU3RlcHModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uIGdldFJlc3BvbnNlSGVhZGVyKGhlYWRlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA8IEZha2VYTUxIdHRwUmVxdWVzdC5IRUFERVJTX1JFQ0VJVkVEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgvXlNldC1Db29raWUyPyQvaS50ZXN0KGhlYWRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZGVyID0gZ2V0SGVhZGVyKHRoaXMucmVzcG9uc2VIZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZUhlYWRlcnNbaGVhZGVyXSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA8IEZha2VYTUxIdHRwUmVxdWVzdC5IRUFERVJTX1JFQ0VJVkVEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSB0aGlzLnJlc3BvbnNlSGVhZGVycztcbiAgICAgICAgICAgIHZhciBoZWFkZXJzID0gT2JqZWN0LmtleXMocmVzcG9uc2VIZWFkZXJzKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZXhjbHVkZVNldENvb2tpZTJIZWFkZXIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAocHJldiwgaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlc3BvbnNlSGVhZGVyc1toZWFkZXJdO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ICsgKGhlYWRlciArIFwiOiBcIiArIHZhbHVlICsgXCJcXHJcXG5cIik7XG4gICAgICAgICAgICAgICAgfSwgXCJcIik7XG5cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFJlc3BvbnNlQm9keTogZnVuY3Rpb24gc2V0UmVzcG9uc2VCb2R5KGJvZHkpIHtcbiAgICAgICAgICAgIHZlcmlmeVJlcXVlc3RTZW50KHRoaXMpO1xuICAgICAgICAgICAgdmVyaWZ5SGVhZGVyc1JlY2VpdmVkKHRoaXMpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzcG9uc2VCb2R5VHlwZShib2R5LCB0aGlzLnJlc3BvbnNlVHlwZSk7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB0aGlzLm92ZXJyaWRkZW5NaW1lVHlwZSB8fCB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuXG4gICAgICAgICAgICB2YXIgaXNUZXh0UmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiB8fCB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gXCJ0ZXh0XCI7XG4gICAgICAgICAgICBjbGVhclJlc3BvbnNlKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2h1bmtTaXplID0gdGhpcy5jaHVua1NpemUgfHwgMTA7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlQ2hhbmdlKEZha2VYTUxIdHRwUmVxdWVzdC5MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUZXh0UmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VUZXh0ID0gdGhpcy5yZXNwb25zZSArPSBib2R5LnN1YnN0cmluZyhpbmRleCwgaW5kZXggKyBjaHVua1NpemUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ICs9IGNodW5rU2l6ZTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChpbmRleCA8IGJvZHkubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IGNvbnZlcnRSZXNwb25zZUJvZHkodGhpcy5yZXNwb25zZVR5cGUsIGNvbnRlbnRUeXBlLCBib2R5KTtcbiAgICAgICAgICAgIGlmIChpc1RleHRSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VUZXh0ID0gdGhpcy5yZXNwb25zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlWE1MID0gdGhpcy5yZXNwb25zZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZXNwb25zZVR5cGUgPT09IFwiXCIgJiYgaXNYbWxDb250ZW50VHlwZShjb250ZW50VHlwZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlWE1MID0gRmFrZVhNTEh0dHBSZXF1ZXN0LnBhcnNlWE1MKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZUNoYW5nZShGYWtlWE1MSHR0cFJlcXVlc3QuRE9ORSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVzcG9uZDogZnVuY3Rpb24gcmVzcG9uZChzdGF0dXMsIGhlYWRlcnMsIGJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHN0YXR1cyk7XG4gICAgICAgICAgICB0aGlzLnNldFJlc3BvbnNlSGVhZGVycyhoZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVzcG9uc2VCb2R5KGJvZHkgfHwgXCJcIik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBsb2FkUHJvZ3Jlc3M6IGZ1bmN0aW9uIHVwbG9hZFByb2dyZXNzKHByb2dyZXNzRXZlbnRSYXcpIHtcbiAgICAgICAgICAgIGlmIChzdXBwb3J0c1Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWQuZGlzcGF0Y2hFdmVudChuZXcgc2lub25FdmVudC5Qcm9ncmVzc0V2ZW50KFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NFdmVudFJhdywgdGhpcy51cGxvYWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkb3dubG9hZFByb2dyZXNzOiBmdW5jdGlvbiBkb3dubG9hZFByb2dyZXNzKHByb2dyZXNzRXZlbnRSYXcpIHtcbiAgICAgICAgICAgIGlmIChzdXBwb3J0c1Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBzaW5vbkV2ZW50LlByb2dyZXNzRXZlbnQoXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0V2ZW50UmF3LCB0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBsb2FkRXJyb3I6IGZ1bmN0aW9uIHVwbG9hZEVycm9yKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoc3VwcG9ydHNDdXN0b21FdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkLmRpc3BhdGNoRXZlbnQobmV3IHNpbm9uRXZlbnQuQ3VzdG9tRXZlbnQoXCJlcnJvclwiLCB7ZGV0YWlsOiBlcnJvcn0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBvdmVycmlkZU1pbWVUeXBlOiBmdW5jdGlvbiBvdmVycmlkZU1pbWVUeXBlKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPj0gRmFrZVhNTEh0dHBSZXF1ZXN0LkxPQURJTkcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJTlZBTElEX1NUQVRFX0VSUlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub3ZlcnJpZGRlbk1pbWVUeXBlID0gdHlwZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICAgVU5TRU5UOiAwLFxuICAgICAgICBPUEVORUQ6IDEsXG4gICAgICAgIEhFQURFUlNfUkVDRUlWRUQ6IDIsXG4gICAgICAgIExPQURJTkc6IDMsXG4gICAgICAgIERPTkU6IDRcbiAgICB9O1xuXG4gICAgZXh0ZW5kKEZha2VYTUxIdHRwUmVxdWVzdCwgc3RhdGVzKTtcbiAgICBleHRlbmQoRmFrZVhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgc3RhdGVzKTtcblxuICAgIGZ1bmN0aW9uIHVzZUZha2VYTUxIdHRwUmVxdWVzdCgpIHtcbiAgICAgICAgRmFrZVhNTEh0dHBSZXF1ZXN0LnJlc3RvcmUgPSBmdW5jdGlvbiByZXN0b3JlKGtlZXBPbkNyZWF0ZSkge1xuICAgICAgICAgICAgaWYgKHNpbm9uWGhyLnN1cHBvcnRzWEhSKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsU2NvcGUuWE1MSHR0cFJlcXVlc3QgPSBzaW5vblhoci5HbG9iYWxYTUxIdHRwUmVxdWVzdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNpbm9uWGhyLnN1cHBvcnRzQWN0aXZlWCkge1xuICAgICAgICAgICAgICAgIGdsb2JhbFNjb3BlLkFjdGl2ZVhPYmplY3QgPSBzaW5vblhoci5HbG9iYWxBY3RpdmVYT2JqZWN0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgRmFrZVhNTEh0dHBSZXF1ZXN0LnJlc3RvcmU7XG5cbiAgICAgICAgICAgIGlmIChrZWVwT25DcmVhdGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgRmFrZVhNTEh0dHBSZXF1ZXN0Lm9uQ3JlYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoc2lub25YaHIuc3VwcG9ydHNYSFIpIHtcbiAgICAgICAgICAgIGdsb2JhbFNjb3BlLlhNTEh0dHBSZXF1ZXN0ID0gRmFrZVhNTEh0dHBSZXF1ZXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbm9uWGhyLnN1cHBvcnRzQWN0aXZlWCkge1xuICAgICAgICAgICAgZ2xvYmFsU2NvcGUuQWN0aXZlWE9iamVjdCA9IGZ1bmN0aW9uIEFjdGl2ZVhPYmplY3Qob2JqSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqSWQgPT09IFwiTWljcm9zb2Z0LlhNTEhUVFBcIiB8fCAvXk1zeG1sMlxcLlhNTEhUVFAvaS50ZXN0KG9iaklkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmFrZVhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBzaW5vblhoci5HbG9iYWxBY3RpdmVYT2JqZWN0KG9iaklkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRmFrZVhNTEh0dHBSZXF1ZXN0O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHhocjogc2lub25YaHIsXG4gICAgICAgIEZha2VYTUxIdHRwUmVxdWVzdDogRmFrZVhNTEh0dHBSZXF1ZXN0LFxuICAgICAgICB1c2VGYWtlWE1MSHR0cFJlcXVlc3Q6IHVzZUZha2VYTUxIdHRwUmVxdWVzdFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKGZha2VYTUxIdHRwUmVxdWVzdEZvcihnbG9iYWxPYmplY3QpLCB7XG4gICAgZmFrZVhNTEh0dHBSZXF1ZXN0Rm9yOiBmYWtlWE1MSHR0cFJlcXVlc3RGb3Jcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZha2VTZXJ2ZXI6IHJlcXVpcmUoXCIuL2Zha2Utc2VydmVyXCIpLFxuICAgIGZha2VTZXJ2ZXJXaXRoQ2xvY2s6IHJlcXVpcmUoXCIuL2Zha2Utc2VydmVyL2Zha2Utc2VydmVyLXdpdGgtY2xvY2tcIiksXG4gICAgZmFrZVhocjogcmVxdWlyZShcIi4vZmFrZS14aHJcIilcbn07XG4iLCJ2YXIgaXNhcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG4vKipcbiAqIEV4cG9zZSBgcGF0aFRvUmVnZXhwYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoVG9SZWdleHBcbm1vZHVsZS5leHBvcnRzLnBhcnNlID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb0Z1bmN0aW9uID0gdG9rZW5zVG9GdW5jdGlvblxubW9kdWxlLmV4cG9ydHMudG9rZW5zVG9SZWdFeHAgPSB0b2tlbnNUb1JlZ0V4cFxuXG4vKipcbiAqIFRoZSBtYWluIHBhdGggbWF0Y2hpbmcgcmVnZXhwIHV0aWxpdHkuXG4gKlxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xudmFyIFBBVEhfUkVHRVhQID0gbmV3IFJlZ0V4cChbXG4gIC8vIE1hdGNoIGVzY2FwZWQgY2hhcmFjdGVycyB0aGF0IHdvdWxkIG90aGVyd2lzZSBhcHBlYXIgaW4gZnV0dXJlIG1hdGNoZXMuXG4gIC8vIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIGVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgdGhhdCB3b24ndCB0cmFuc2Zvcm0uXG4gICcoXFxcXFxcXFwuKScsXG4gIC8vIE1hdGNoIEV4cHJlc3Mtc3R5bGUgcGFyYW1ldGVycyBhbmQgdW4tbmFtZWQgcGFyYW1ldGVycyB3aXRoIGEgcHJlZml4XG4gIC8vIGFuZCBvcHRpb25hbCBzdWZmaXhlcy4gTWF0Y2hlcyBhcHBlYXIgYXM6XG4gIC8vXG4gIC8vIFwiLzp0ZXN0KFxcXFxkKyk/XCIgPT4gW1wiL1wiLCBcInRlc3RcIiwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgXCI/XCIsIHVuZGVmaW5lZF1cbiAgLy8gXCIvcm91dGUoXFxcXGQrKVwiICA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICAvLyBcIi8qXCIgICAgICAgICAgICA9PiBbXCIvXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCIqXCJdXG4gICcoW1xcXFwvLl0pPyg/Oig/OlxcXFw6KFxcXFx3KykoPzpcXFxcKCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpXSkrKVxcXFwpKT98XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSkoWysqP10pP3woXFxcXCopKSdcbl0uam9pbignfCcpLCAnZycpXG5cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgZm9yIHRoZSByYXcgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7IUFycmF5fVxuICovXG5mdW5jdGlvbiBwYXJzZSAoc3RyLCBvcHRpb25zKSB7XG4gIHZhciB0b2tlbnMgPSBbXVxuICB2YXIga2V5ID0gMFxuICB2YXIgaW5kZXggPSAwXG4gIHZhciBwYXRoID0gJydcbiAgdmFyIGRlZmF1bHREZWxpbWl0ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJ1xuICB2YXIgcmVzXG5cbiAgd2hpbGUgKChyZXMgPSBQQVRIX1JFR0VYUC5leGVjKHN0cikpICE9IG51bGwpIHtcbiAgICB2YXIgbSA9IHJlc1swXVxuICAgIHZhciBlc2NhcGVkID0gcmVzWzFdXG4gICAgdmFyIG9mZnNldCA9IHJlcy5pbmRleFxuICAgIHBhdGggKz0gc3RyLnNsaWNlKGluZGV4LCBvZmZzZXQpXG4gICAgaW5kZXggPSBvZmZzZXQgKyBtLmxlbmd0aFxuXG4gICAgLy8gSWdub3JlIGFscmVhZHkgZXNjYXBlZCBzZXF1ZW5jZXMuXG4gICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgIHBhdGggKz0gZXNjYXBlZFsxXVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB2YXIgbmV4dCA9IHN0cltpbmRleF1cbiAgICB2YXIgcHJlZml4ID0gcmVzWzJdXG4gICAgdmFyIG5hbWUgPSByZXNbM11cbiAgICB2YXIgY2FwdHVyZSA9IHJlc1s0XVxuICAgIHZhciBncm91cCA9IHJlc1s1XVxuICAgIHZhciBtb2RpZmllciA9IHJlc1s2XVxuICAgIHZhciBhc3RlcmlzayA9IHJlc1s3XVxuXG4gICAgLy8gUHVzaCB0aGUgY3VycmVudCBwYXRoIG9udG8gdGhlIHRva2Vucy5cbiAgICBpZiAocGF0aCkge1xuICAgICAgdG9rZW5zLnB1c2gocGF0aClcbiAgICAgIHBhdGggPSAnJ1xuICAgIH1cblxuICAgIHZhciBwYXJ0aWFsID0gcHJlZml4ICE9IG51bGwgJiYgbmV4dCAhPSBudWxsICYmIG5leHQgIT09IHByZWZpeFxuICAgIHZhciByZXBlYXQgPSBtb2RpZmllciA9PT0gJysnIHx8IG1vZGlmaWVyID09PSAnKidcbiAgICB2YXIgb3B0aW9uYWwgPSBtb2RpZmllciA9PT0gJz8nIHx8IG1vZGlmaWVyID09PSAnKidcbiAgICB2YXIgZGVsaW1pdGVyID0gcmVzWzJdIHx8IGRlZmF1bHREZWxpbWl0ZXJcbiAgICB2YXIgcGF0dGVybiA9IGNhcHR1cmUgfHwgZ3JvdXBcblxuICAgIHRva2Vucy5wdXNoKHtcbiAgICAgIG5hbWU6IG5hbWUgfHwga2V5KyssXG4gICAgICBwcmVmaXg6IHByZWZpeCB8fCAnJyxcbiAgICAgIGRlbGltaXRlcjogZGVsaW1pdGVyLFxuICAgICAgb3B0aW9uYWw6IG9wdGlvbmFsLFxuICAgICAgcmVwZWF0OiByZXBlYXQsXG4gICAgICBwYXJ0aWFsOiBwYXJ0aWFsLFxuICAgICAgYXN0ZXJpc2s6ICEhYXN0ZXJpc2ssXG4gICAgICBwYXR0ZXJuOiBwYXR0ZXJuID8gZXNjYXBlR3JvdXAocGF0dGVybikgOiAoYXN0ZXJpc2sgPyAnLionIDogJ1teJyArIGVzY2FwZVN0cmluZyhkZWxpbWl0ZXIpICsgJ10rPycpXG4gICAgfSlcbiAgfVxuXG4gIC8vIE1hdGNoIGFueSBjaGFyYWN0ZXJzIHN0aWxsIHJlbWFpbmluZy5cbiAgaWYgKGluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgIHBhdGggKz0gc3RyLnN1YnN0cihpbmRleClcbiAgfVxuXG4gIC8vIElmIHRoZSBwYXRoIGV4aXN0cywgcHVzaCBpdCBvbnRvIHRoZSBlbmQuXG4gIGlmIChwYXRoKSB7XG4gICAgdG9rZW5zLnB1c2gocGF0aClcbiAgfVxuXG4gIHJldHVybiB0b2tlbnNcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgc3RyaW5nIHRvIGEgdGVtcGxhdGUgZnVuY3Rpb24gZm9yIHRoZSBwYXRoLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFmdW5jdGlvbihPYmplY3Q9LCBPYmplY3Q9KX1cbiAqL1xuZnVuY3Rpb24gY29tcGlsZSAoc3RyLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b2tlbnNUb0Z1bmN0aW9uKHBhcnNlKHN0ciwgb3B0aW9ucyksIG9wdGlvbnMpXG59XG5cbi8qKlxuICogUHJldHRpZXIgZW5jb2Rpbmcgb2YgVVJJIHBhdGggc2VnbWVudHMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgKHN0cikge1xuICByZXR1cm4gZW5jb2RlVVJJKHN0cikucmVwbGFjZSgvW1xcLz8jXS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBFbmNvZGUgdGhlIGFzdGVyaXNrIHBhcmFtZXRlci4gU2ltaWxhciB0byBgcHJldHR5YCwgYnV0IGFsbG93cyBzbGFzaGVzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlQXN0ZXJpc2sgKHN0cikge1xuICByZXR1cm4gZW5jb2RlVVJJKHN0cikucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBFeHBvc2UgYSBtZXRob2QgZm9yIHRyYW5zZm9ybWluZyB0b2tlbnMgaW50byB0aGUgcGF0aCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9GdW5jdGlvbiAodG9rZW5zLCBvcHRpb25zKSB7XG4gIC8vIENvbXBpbGUgYWxsIHRoZSB0b2tlbnMgaW50byByZWdleHBzLlxuICB2YXIgbWF0Y2hlcyA9IG5ldyBBcnJheSh0b2tlbnMubGVuZ3RoKVxuXG4gIC8vIENvbXBpbGUgYWxsIHRoZSBwYXR0ZXJucyBiZWZvcmUgY29tcGlsYXRpb24uXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiB0b2tlbnNbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICBtYXRjaGVzW2ldID0gbmV3IFJlZ0V4cCgnXig/OicgKyB0b2tlbnNbaV0ucGF0dGVybiArICcpJCcsIGZsYWdzKG9wdGlvbnMpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBvcHRzKSB7XG4gICAgdmFyIHBhdGggPSAnJ1xuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9XG4gICAgdmFyIGVuY29kZSA9IG9wdGlvbnMucHJldHR5ID8gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IDogZW5jb2RlVVJJQ29tcG9uZW50XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggKz0gdG9rZW5cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUgPSBkYXRhW3Rva2VuLm5hbWVdXG4gICAgICB2YXIgc2VnbWVudFxuXG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAvLyBQcmVwZW5kIHBhcnRpYWwgc2VnbWVudCBwcmVmaXhlcy5cbiAgICAgICAgICBpZiAodG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXhcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gYmUgZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzYXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICghdG9rZW4ucmVwZWF0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgcmVwZWF0LCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnYCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCBiZSBlbXB0eScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHNlZ21lbnQgPSBlbmNvZGUodmFsdWVbal0pXG5cbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudCkgKyAnYCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBzZWdtZW50ID0gdG9rZW4uYXN0ZXJpc2sgPyBlbmNvZGVBc3Rlcmlzayh2YWx1ZSkgOiBlbmNvZGUodmFsdWUpXG5cbiAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIFwiJyArIHNlZ21lbnQgKyAnXCInKVxuICAgICAgfVxuXG4gICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnRcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG59XG5cbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18XFwvXFxcXF0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5c1xuICByZXR1cm4gcmVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmbGFncyAob3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLnNlbnNpdGl2ZSA/ICcnIDogJ2knXG59XG5cbi8qKlxuICogUHVsbCBvdXQga2V5cyBmcm9tIGEgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHBhdGhcbiAqIEBwYXJhbSAgeyFBcnJheX0gIGtleXNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHJlZ2V4cFRvUmVnZXhwIChwYXRoLCBrZXlzKSB7XG4gIC8vIFVzZSBhIG5lZ2F0aXZlIGxvb2thaGVhZCB0byBtYXRjaCBvbmx5IGNhcHR1cmluZyBncm91cHMuXG4gIHZhciBncm91cHMgPSBwYXRoLnNvdXJjZS5tYXRjaCgvXFwoKD8hXFw/KS9nKVxuXG4gIGlmIChncm91cHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogaSxcbiAgICAgICAgcHJlZml4OiBudWxsLFxuICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgcGFydGlhbDogZmFsc2UsXG4gICAgICAgIGFzdGVyaXNrOiBmYWxzZSxcbiAgICAgICAgcGF0dGVybjogbnVsbFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0YWNoS2V5cyhwYXRoLCBrZXlzKVxufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhbiBhcnJheSBpbnRvIGEgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFBcnJheX0gIHBhdGhcbiAqIEBwYXJhbSAge0FycmF5fSAgIGtleXNcbiAqIEBwYXJhbSAgeyFPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgdmFyIHBhcnRzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICBwYXJ0cy5wdXNoKHBhdGhUb1JlZ2V4cChwYXRoW2ldLCBrZXlzLCBvcHRpb25zKS5zb3VyY2UpXG4gIH1cblxuICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgnKD86JyArIHBhcnRzLmpvaW4oJ3wnKSArICcpJywgZmxhZ3Mob3B0aW9ucykpXG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocmVnZXhwLCBrZXlzKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHBhdGggcmVnZXhwIGZyb20gc3RyaW5nIGlucHV0LlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHBhdGhcbiAqIEBwYXJhbSAgeyFBcnJheX0gIGtleXNcbiAqIEBwYXJhbSAgeyFPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b2tlbnNUb1JlZ0V4cChwYXJzZShwYXRoLCBvcHRpb25zKSwga2V5cywgb3B0aW9ucylcbn1cblxuLyoqXG4gKiBFeHBvc2UgYSBmdW5jdGlvbiBmb3IgdGFraW5nIHRva2VucyBhbmQgcmV0dXJuaW5nIGEgUmVnRXhwLlxuICpcbiAqIEBwYXJhbSAgeyFBcnJheX0gICAgICAgICAgdG9rZW5zXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19IGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9SZWdFeHAgKHRva2Vucywga2V5cywgb3B0aW9ucykge1xuICBpZiAoIWlzYXJyYXkoa2V5cykpIHtcbiAgICBvcHRpb25zID0gLyoqIEB0eXBlIHshT2JqZWN0fSAqLyAoa2V5cyB8fCBvcHRpb25zKVxuICAgIGtleXMgPSBbXVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgc3RyaWN0ID0gb3B0aW9ucy5zdHJpY3RcbiAgdmFyIGVuZCA9IG9wdGlvbnMuZW5kICE9PSBmYWxzZVxuICB2YXIgcm91dGUgPSAnJ1xuXG4gIC8vIEl0ZXJhdGUgb3ZlciB0aGUgdG9rZW5zIGFuZCBjcmVhdGUgb3VyIHJlZ2V4cCBzdHJpbmcuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgcm91dGUgKz0gZXNjYXBlU3RyaW5nKHRva2VuKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJlZml4ID0gZXNjYXBlU3RyaW5nKHRva2VuLnByZWZpeClcbiAgICAgIHZhciBjYXB0dXJlID0gJyg/OicgKyB0b2tlbi5wYXR0ZXJuICsgJyknXG5cbiAgICAgIGtleXMucHVzaCh0b2tlbilcblxuICAgICAgaWYgKHRva2VuLnJlcGVhdCkge1xuICAgICAgICBjYXB0dXJlICs9ICcoPzonICsgcHJlZml4ICsgY2FwdHVyZSArICcpKidcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgIGlmICghdG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgIGNhcHR1cmUgPSAnKD86JyArIHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSk/J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhcHR1cmUgPSBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJyk/J1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpJ1xuICAgICAgfVxuXG4gICAgICByb3V0ZSArPSBjYXB0dXJlXG4gICAgfVxuICB9XG5cbiAgdmFyIGRlbGltaXRlciA9IGVzY2FwZVN0cmluZyhvcHRpb25zLmRlbGltaXRlciB8fCAnLycpXG4gIHZhciBlbmRzV2l0aERlbGltaXRlciA9IHJvdXRlLnNsaWNlKC1kZWxpbWl0ZXIubGVuZ3RoKSA9PT0gZGVsaW1pdGVyXG5cbiAgLy8gSW4gbm9uLXN0cmljdCBtb2RlIHdlIGFsbG93IGEgc2xhc2ggYXQgdGhlIGVuZCBvZiBtYXRjaC4gSWYgdGhlIHBhdGggdG9cbiAgLy8gbWF0Y2ggYWxyZWFkeSBlbmRzIHdpdGggYSBzbGFzaCwgd2UgcmVtb3ZlIGl0IGZvciBjb25zaXN0ZW5jeS4gVGhlIHNsYXNoXG4gIC8vIGlzIHZhbGlkIGF0IHRoZSBlbmQgb2YgYSBwYXRoIG1hdGNoLCBub3QgaW4gdGhlIG1pZGRsZS4gVGhpcyBpcyBpbXBvcnRhbnRcbiAgLy8gaW4gbm9uLWVuZGluZyBtb2RlLCB3aGVyZSBcIi90ZXN0L1wiIHNob3VsZG4ndCBtYXRjaCBcIi90ZXN0Ly9yb3V0ZVwiLlxuICBpZiAoIXN0cmljdCkge1xuICAgIHJvdXRlID0gKGVuZHNXaXRoRGVsaW1pdGVyID8gcm91dGUuc2xpY2UoMCwgLWRlbGltaXRlci5sZW5ndGgpIDogcm91dGUpICsgJyg/OicgKyBkZWxpbWl0ZXIgKyAnKD89JCkpPydcbiAgfVxuXG4gIGlmIChlbmQpIHtcbiAgICByb3V0ZSArPSAnJCdcbiAgfSBlbHNlIHtcbiAgICAvLyBJbiBub24tZW5kaW5nIG1vZGUsIHdlIG5lZWQgdGhlIGNhcHR1cmluZyBncm91cHMgdG8gbWF0Y2ggYXMgbXVjaCBhc1xuICAgIC8vIHBvc3NpYmxlIGJ5IHVzaW5nIGEgcG9zaXRpdmUgbG9va2FoZWFkIHRvIHRoZSBlbmQgb3IgbmV4dCBwYXRoIHNlZ21lbnQuXG4gICAgcm91dGUgKz0gc3RyaWN0ICYmIGVuZHNXaXRoRGVsaW1pdGVyID8gJycgOiAnKD89JyArIGRlbGltaXRlciArICd8JCknXG4gIH1cblxuICByZXR1cm4gYXR0YWNoS2V5cyhuZXcgUmVnRXhwKCdeJyArIHJvdXRlLCBmbGFncyhvcHRpb25zKSksIGtleXMpXG59XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBnaXZlbiBwYXRoIHN0cmluZywgcmV0dXJuaW5nIGEgcmVndWxhciBleHByZXNzaW9uLlxuICpcbiAqIEFuIGVtcHR5IGFycmF5IGNhbiBiZSBwYXNzZWQgaW4gZm9yIHRoZSBrZXlzLCB3aGljaCB3aWxsIGhvbGQgdGhlXG4gKiBwbGFjZWhvbGRlciBrZXkgZGVzY3JpcHRpb25zLiBGb3IgZXhhbXBsZSwgdXNpbmcgYC91c2VyLzppZGAsIGBrZXlzYCB3aWxsXG4gKiBjb250YWluIGBbeyBuYW1lOiAnaWQnLCBkZWxpbWl0ZXI6ICcvJywgb3B0aW9uYWw6IGZhbHNlLCByZXBlYXQ6IGZhbHNlIH1dYC5cbiAqXG4gKiBAcGFyYW0gIHsoc3RyaW5nfFJlZ0V4cHxBcnJheSl9IHBhdGhcbiAqIEBwYXJhbSAgeyhBcnJheXxPYmplY3QpPX0gICAgICAga2V5c1xuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBwYXRoVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucylcbiAgICBrZXlzID0gW11cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gcmVnZXhwVG9SZWdleHAocGF0aCwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSlcbiAgfVxuXG4gIGlmIChpc2FycmF5KHBhdGgpKSB7XG4gICAgcmV0dXJuIGFycmF5VG9SZWdleHAoLyoqIEB0eXBlIHshQXJyYXl9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdUb1JlZ2V4cCgvKiogQHR5cGUge3N0cmluZ30gKi8gKHBhdGgpLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpLCBvcHRpb25zKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHN0ZG91dDogZmFsc2UsXG5cdHN0ZGVycjogZmFsc2Vcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwudHlwZURldGVjdCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuLyogIVxuICogdHlwZS1kZXRlY3RcbiAqIENvcHlyaWdodChjKSAyMDEzIGpha2UgbHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbnZhciBwcm9taXNlRXhpc3RzID0gdHlwZW9mIFByb21pc2UgPT09ICdmdW5jdGlvbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG52YXIgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnID8gc2VsZiA6IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpZC1ibGFja2xpc3RcblxudmFyIHN5bWJvbEV4aXN0cyA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnO1xudmFyIG1hcEV4aXN0cyA9IHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnO1xudmFyIHNldEV4aXN0cyA9IHR5cGVvZiBTZXQgIT09ICd1bmRlZmluZWQnO1xudmFyIHdlYWtNYXBFeGlzdHMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgd2Vha1NldEV4aXN0cyA9IHR5cGVvZiBXZWFrU2V0ICE9PSAndW5kZWZpbmVkJztcbnZhciBkYXRhVmlld0V4aXN0cyA9IHR5cGVvZiBEYXRhVmlldyAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgc3ltYm9sSXRlcmF0b3JFeGlzdHMgPSBzeW1ib2xFeGlzdHMgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgc3ltYm9sVG9TdHJpbmdUYWdFeGlzdHMgPSBzeW1ib2xFeGlzdHMgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgc2V0RW50cmllc0V4aXN0cyA9IHNldEV4aXN0cyAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5lbnRyaWVzID09PSAnZnVuY3Rpb24nO1xudmFyIG1hcEVudHJpZXNFeGlzdHMgPSBtYXBFeGlzdHMgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUuZW50cmllcyA9PT0gJ2Z1bmN0aW9uJztcbnZhciBzZXRJdGVyYXRvclByb3RvdHlwZSA9IHNldEVudHJpZXNFeGlzdHMgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBTZXQoKS5lbnRyaWVzKCkpO1xudmFyIG1hcEl0ZXJhdG9yUHJvdG90eXBlID0gbWFwRW50cmllc0V4aXN0cyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IE1hcCgpLmVudHJpZXMoKSk7XG52YXIgYXJyYXlJdGVyYXRvckV4aXN0cyA9IHN5bWJvbEl0ZXJhdG9yRXhpc3RzICYmIHR5cGVvZiBBcnJheS5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJztcbnZhciBhcnJheUl0ZXJhdG9yUHJvdG90eXBlID0gYXJyYXlJdGVyYXRvckV4aXN0cyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoW11bU3ltYm9sLml0ZXJhdG9yXSgpKTtcbnZhciBzdHJpbmdJdGVyYXRvckV4aXN0cyA9IHN5bWJvbEl0ZXJhdG9yRXhpc3RzICYmIHR5cGVvZiBTdHJpbmcucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG52YXIgc3RyaW5nSXRlcmF0b3JQcm90b3R5cGUgPSBzdHJpbmdJdGVyYXRvckV4aXN0cyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoJydbU3ltYm9sLml0ZXJhdG9yXSgpKTtcbnZhciB0b1N0cmluZ0xlZnRTbGljZUxlbmd0aCA9IDg7XG52YXIgdG9TdHJpbmdSaWdodFNsaWNlTGVuZ3RoID0gLTE7XG4vKipcbiAqICMjIyB0eXBlT2YgKG9iailcbiAqXG4gKiBVc2VzIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYW4gb2JqZWN0LFxuICogbm9ybWFsaXNpbmcgYmVoYXZpb3VyIGFjcm9zcyBlbmdpbmUgdmVyc2lvbnMgJiB3ZWxsIG9wdGltaXNlZC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAqIEByZXR1cm4ge1N0cmluZ30gb2JqZWN0IHR5cGVcbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHR5cGVEZXRlY3Qob2JqKSB7XG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICAqIFByZTpcbiAgICogICBzdHJpbmcgbGl0ZXJhbCAgICAgeCAzLDAzOSwwMzUgb3BzL3NlYyDCsTEuNjIlICg3OCBydW5zIHNhbXBsZWQpXG4gICAqICAgYm9vbGVhbiBsaXRlcmFsICAgIHggMSw0MjQsMTM4IG9wcy9zZWMgwrE0LjU0JSAoNzUgcnVucyBzYW1wbGVkKVxuICAgKiAgIG51bWJlciBsaXRlcmFsICAgICB4IDEsNjUzLDE1MyBvcHMvc2VjIMKxMS45MSUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgICogICB1bmRlZmluZWQgICAgICAgICAgeCA5LDk3OCw2NjAgb3BzL3NlYyDCsTEuOTIlICg3NSBydW5zIHNhbXBsZWQpXG4gICAqICAgZnVuY3Rpb24gICAgICAgICAgIHggMiw1NTYsNzY5IG9wcy9zZWMgwrExLjczJSAoNzcgcnVucyBzYW1wbGVkKVxuICAgKiBQb3N0OlxuICAgKiAgIHN0cmluZyBsaXRlcmFsICAgICB4IDM4LDU2NCw3OTYgb3BzL3NlYyDCsTEuMTUlICg3OSBydW5zIHNhbXBsZWQpXG4gICAqICAgYm9vbGVhbiBsaXRlcmFsICAgIHggMzEsMTQ4LDk0MCBvcHMvc2VjIMKxMS4xMCUgKDc5IHJ1bnMgc2FtcGxlZClcbiAgICogICBudW1iZXIgbGl0ZXJhbCAgICAgeCAzMiw2NzksMzMwIG9wcy9zZWMgwrExLjkwJSAoNzggcnVucyBzYW1wbGVkKVxuICAgKiAgIHVuZGVmaW5lZCAgICAgICAgICB4IDMyLDM2MywzNjggb3BzL3NlYyDCsTEuMDclICg4MiBydW5zIHNhbXBsZWQpXG4gICAqICAgZnVuY3Rpb24gICAgICAgICAgIHggMzEsMjk2LDg3MCBvcHMvc2VjIMKxMC45NiUgKDgzIHJ1bnMgc2FtcGxlZClcbiAgICovXG4gIHZhciB0eXBlb2ZPYmogPSB0eXBlb2Ygb2JqO1xuICBpZiAodHlwZW9mT2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlb2ZPYmo7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAgKiBQcmU6XG4gICAqICAgbnVsbCAgICAgICAgICAgICAgIHggMjgsNjQ1LDc2NSBvcHMvc2VjIMKxMS4xNyUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgICogUG9zdDpcbiAgICogICBudWxsICAgICAgICAgICAgICAgeCAzNiw0MjgsOTYyIG9wcy9zZWMgwrExLjM3JSAoODQgcnVucyBzYW1wbGVkKVxuICAgKi9cbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnbnVsbCc7XG4gIH1cblxuICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cpYGBcbiAgICogIC0gTm9kZSA9PT0gXCJbb2JqZWN0IGdsb2JhbF1cIlxuICAgKiAgLSBDaHJvbWUgPT09IFwiW29iamVjdCBnbG9iYWxdXCJcbiAgICogIC0gRmlyZWZveCA9PT0gXCJbb2JqZWN0IFdpbmRvd11cIlxuICAgKiAgLSBQaGFudG9tSlMgPT09IFwiW29iamVjdCBXaW5kb3ddXCJcbiAgICogIC0gU2FmYXJpID09PSBcIltvYmplY3QgV2luZG93XVwiXG4gICAqICAtIElFIDExID09PSBcIltvYmplY3QgV2luZG93XVwiXG4gICAqICAtIElFIEVkZ2UgPT09IFwiW29iamVjdCBXaW5kb3ddXCJcbiAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzKWBgXG4gICAqICAtIENocm9tZSBXb3JrZXIgPT09IFwiW29iamVjdCBnbG9iYWxdXCJcbiAgICogIC0gRmlyZWZveCBXb3JrZXIgPT09IFwiW29iamVjdCBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZV1cIlxuICAgKiAgLSBTYWZhcmkgV29ya2VyID09PSBcIltvYmplY3QgRGVkaWNhdGVkV29ya2VyR2xvYmFsU2NvcGVdXCJcbiAgICogIC0gSUUgMTEgV29ya2VyID09PSBcIltvYmplY3QgV29ya2VyR2xvYmFsU2NvcGVdXCJcbiAgICogIC0gSUUgRWRnZSBXb3JrZXIgPT09IFwiW29iamVjdCBXb3JrZXJHbG9iYWxTY29wZV1cIlxuICAgKi9cbiAgaWYgKG9iaiA9PT0gZ2xvYmFsT2JqZWN0KSB7XG4gICAgcmV0dXJuICdnbG9iYWwnO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgICogUHJlOlxuICAgKiAgIGFycmF5IGxpdGVyYWwgICAgICB4IDIsODg4LDM1MiBvcHMvc2VjIMKxMC42NyUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgICogUG9zdDpcbiAgICogICBhcnJheSBsaXRlcmFsICAgICAgeCAyMiw0NzksNjUwIG9wcy9zZWMgwrEwLjk2JSAoODEgcnVucyBzYW1wbGVkKVxuICAgKi9cbiAgaWYgKFxuICAgIEFycmF5LmlzQXJyYXkob2JqKSAmJlxuICAgIChzeW1ib2xUb1N0cmluZ1RhZ0V4aXN0cyA9PT0gZmFsc2UgfHwgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gb2JqKSlcbiAgKSB7XG4gICAgcmV0dXJuICdBcnJheSc7XG4gIH1cblxuICAvLyBOb3QgY2FjaGluZyBleGlzdGVuY2Ugb2YgYHdpbmRvd2AgYW5kIHJlbGF0ZWQgcHJvcGVydGllcyBkdWUgdG8gcG90ZW50aWFsXG4gIC8vIGZvciBgd2luZG93YCB0byBiZSB1bnNldCBiZWZvcmUgdGVzdHMgaW4gcXVhc2ktYnJvd3NlciBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvYnJvd3NlcnMuaHRtbCNsb2NhdGlvbilcbiAgICAgKiBXaGF0V0cgSFRNTCQ3LjcuMyAtIFRoZSBgTG9jYXRpb25gIGludGVyZmFjZVxuICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93LmxvY2F0aW9uKWBgXG4gICAgICogIC0gSUUgPD0xMSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgICAqICAtIElFIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgICAqL1xuICAgIGlmICh0eXBlb2Ygd2luZG93LmxvY2F0aW9uID09PSAnb2JqZWN0JyAmJiBvYmogPT09IHdpbmRvdy5sb2NhdGlvbikge1xuICAgICAgcmV0dXJuICdMb2NhdGlvbic7XG4gICAgfVxuXG4gICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICogKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI2RvY3VtZW50KVxuICAgICAqIFdoYXRXRyBIVE1MJDMuMS4xIC0gVGhlIGBEb2N1bWVudGAgb2JqZWN0XG4gICAgICogTm90ZTogTW9zdCBicm93c2VycyBjdXJyZW50bHkgYWRoZXIgdG8gdGhlIFczQyBET00gTGV2ZWwgMiBzcGVjXG4gICAgICogICAgICAgKGh0dHBzOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1IVE1ML2h0bWwuaHRtbCNJRC0yNjgwOTI2OClcbiAgICAgKiAgICAgICB3aGljaCBzdWdnZXN0cyB0aGF0IGJyb3dzZXJzIHNob3VsZCB1c2UgSFRNTFRhYmxlQ2VsbEVsZW1lbnQgZm9yXG4gICAgICogICAgICAgYm90aCBURCBhbmQgVEggZWxlbWVudHMuIFdoYXRXRyBzZXBhcmF0ZXMgdGhlc2UuXG4gICAgICogICAgICAgV2hhdFdHIEhUTUwgc3RhdGVzOlxuICAgICAqICAgICAgICAgPiBGb3IgaGlzdG9yaWNhbCByZWFzb25zLCBXaW5kb3cgb2JqZWN0cyBtdXN0IGFsc28gaGF2ZSBhXG4gICAgICogICAgICAgICA+IHdyaXRhYmxlLCBjb25maWd1cmFibGUsIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVkXG4gICAgICogICAgICAgICA+IEhUTUxEb2N1bWVudCB3aG9zZSB2YWx1ZSBpcyB0aGUgRG9jdW1lbnQgaW50ZXJmYWNlIG9iamVjdC5cbiAgICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRvY3VtZW50KWBgXG4gICAgICogIC0gQ2hyb21lID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICogIC0gRmlyZWZveCA9PT0gXCJbb2JqZWN0IEhUTUxEb2N1bWVudF1cIlxuICAgICAqICAtIFNhZmFyaSA9PT0gXCJbb2JqZWN0IEhUTUxEb2N1bWVudF1cIlxuICAgICAqICAtIElFIDw9MTAgPT09IFwiW29iamVjdCBEb2N1bWVudF1cIlxuICAgICAqICAtIElFIDExID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICogIC0gSUUgRWRnZSA8PTEzID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgPT09ICdvYmplY3QnICYmIG9iaiA9PT0gd2luZG93LmRvY3VtZW50KSB7XG4gICAgICByZXR1cm4gJ0RvY3VtZW50JztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IgPT09ICdvYmplY3QnKSB7XG4gICAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgICAqIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS93ZWJhcHBhcGlzLmh0bWwjbWltZXR5cGVhcnJheSlcbiAgICAgICAqIFdoYXRXRyBIVE1MJDguNi4xLjUgLSBQbHVnaW5zIC0gSW50ZXJmYWNlIE1pbWVUeXBlQXJyYXlcbiAgICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmF2aWdhdG9yLm1pbWVUeXBlcylgYFxuICAgICAgICogIC0gSUUgPD0xMCA9PT0gXCJbb2JqZWN0IE1TTWltZVR5cGVzQ29sbGVjdGlvbl1cIlxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgIG9iaiA9PT0gd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXMpIHtcbiAgICAgICAgcmV0dXJuICdNaW1lVHlwZUFycmF5JztcbiAgICAgIH1cblxuICAgICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvd2ViYXBwYXBpcy5odG1sI3BsdWdpbmFycmF5KVxuICAgICAgICogV2hhdFdHIEhUTUwkOC42LjEuNSAtIFBsdWdpbnMgLSBJbnRlcmZhY2UgUGx1Z2luQXJyYXlcbiAgICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmF2aWdhdG9yLnBsdWdpbnMpYGBcbiAgICAgICAqICAtIElFIDw9MTAgPT09IFwiW29iamVjdCBNU1BsdWdpbnNDb2xsZWN0aW9uXVwiXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgIG9iaiA9PT0gd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zKSB7XG4gICAgICAgIHJldHVybiAnUGx1Z2luQXJyYXknO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgodHlwZW9mIHdpbmRvdy5IVE1MRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICB0eXBlb2Ygd2luZG93LkhUTUxFbGVtZW50ID09PSAnb2JqZWN0JykgJiZcbiAgICAgICAgb2JqIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50KSB7XG4gICAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgICogKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3dlYmFwcGFwaXMuaHRtbCNwbHVnaW5hcnJheSlcbiAgICAgICogV2hhdFdHIEhUTUwkNC40LjQgLSBUaGUgYGJsb2NrcXVvdGVgIGVsZW1lbnQgLSBJbnRlcmZhY2UgYEhUTUxRdW90ZUVsZW1lbnRgXG4gICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYmxvY2txdW90ZScpKWBgXG4gICAgICAqICAtIElFIDw9MTAgPT09IFwiW29iamVjdCBIVE1MQmxvY2tFbGVtZW50XVwiXG4gICAgICAqL1xuICAgICAgaWYgKG9iai50YWdOYW1lID09PSAnQkxPQ0tRVU9URScpIHtcbiAgICAgICAgcmV0dXJuICdIVE1MUXVvdGVFbGVtZW50JztcbiAgICAgIH1cblxuICAgICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jaHRtbHRhYmxlZGF0YWNlbGxlbGVtZW50KVxuICAgICAgICogV2hhdFdHIEhUTUwkNC45LjkgLSBUaGUgYHRkYCBlbGVtZW50IC0gSW50ZXJmYWNlIGBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnRgXG4gICAgICAgKiBOb3RlOiBNb3N0IGJyb3dzZXJzIGN1cnJlbnRseSBhZGhlciB0byB0aGUgVzNDIERPTSBMZXZlbCAyIHNwZWNcbiAgICAgICAqICAgICAgIChodHRwczovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItSFRNTC9odG1sLmh0bWwjSUQtODI5MTUwNzUpXG4gICAgICAgKiAgICAgICB3aGljaCBzdWdnZXN0cyB0aGF0IGJyb3dzZXJzIHNob3VsZCB1c2UgSFRNTFRhYmxlQ2VsbEVsZW1lbnQgZm9yXG4gICAgICAgKiAgICAgICBib3RoIFREIGFuZCBUSCBlbGVtZW50cy4gV2hhdFdHIHNlcGFyYXRlcyB0aGVzZS5cbiAgICAgICAqIFRlc3Q6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKVxuICAgICAgICogIC0gQ2hyb21lID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqICAtIEZpcmVmb3ggPT09IFwiW29iamVjdCBIVE1MVGFibGVDZWxsRWxlbWVudF1cIlxuICAgICAgICogIC0gU2FmYXJpID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqL1xuICAgICAgaWYgKG9iai50YWdOYW1lID09PSAnVEQnKSB7XG4gICAgICAgIHJldHVybiAnSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50JztcbiAgICAgIH1cblxuICAgICAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jaHRtbHRhYmxlaGVhZGVyY2VsbGVsZW1lbnQpXG4gICAgICAgKiBXaGF0V0cgSFRNTCQ0LjkuOSAtIFRoZSBgdGRgIGVsZW1lbnQgLSBJbnRlcmZhY2UgYEhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50YFxuICAgICAgICogTm90ZTogTW9zdCBicm93c2VycyBjdXJyZW50bHkgYWRoZXIgdG8gdGhlIFczQyBET00gTGV2ZWwgMiBzcGVjXG4gICAgICAgKiAgICAgICAoaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUhUTUwvaHRtbC5odG1sI0lELTgyOTE1MDc1KVxuICAgICAgICogICAgICAgd2hpY2ggc3VnZ2VzdHMgdGhhdCBicm93c2VycyBzaG91bGQgdXNlIEhUTUxUYWJsZUNlbGxFbGVtZW50IGZvclxuICAgICAgICogICAgICAgYm90aCBURCBhbmQgVEggZWxlbWVudHMuIFdoYXRXRyBzZXBhcmF0ZXMgdGhlc2UuXG4gICAgICAgKiBUZXN0OiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSlcbiAgICAgICAqICAtIENocm9tZSA9PT0gXCJbb2JqZWN0IEhUTUxUYWJsZUNlbGxFbGVtZW50XVwiXG4gICAgICAgKiAgLSBGaXJlZm94ID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqICAtIFNhZmFyaSA9PT0gXCJbb2JqZWN0IEhUTUxUYWJsZUNlbGxFbGVtZW50XVwiXG4gICAgICAgKi9cbiAgICAgIGlmIChvYmoudGFnTmFtZSA9PT0gJ1RIJykge1xuICAgICAgICByZXR1cm4gJ0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIEZsb2F0NjRBcnJheSAgICAgICB4IDYyNSw2NDQgb3BzL3NlYyDCsTEuNTglICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBGbG9hdDMyQXJyYXkgICAgICAgeCAxLDI3OSw4NTIgb3BzL3NlYyDCsTIuOTElICg3NyBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MzJBcnJheSAgICAgICAgeCAxLDE3OCwxODUgb3BzL3NlYyDCsTEuOTUlICg4MyBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MTZBcnJheSAgICAgICAgeCAxLDAwOCwzODAgb3BzL3NlYyDCsTIuMjUlICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OEFycmF5ICAgICAgICAgeCAxLDEyOCwwNDAgb3BzL3NlYyDCsTIuMTElICg4MSBydW5zIHNhbXBsZWQpXG4gICogICBJbnQzMkFycmF5ICAgICAgICAgeCAxLDE3MCwxMTkgb3BzL3NlYyDCsTIuODglICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBJbnQxNkFycmF5ICAgICAgICAgeCAxLDE3NiwzNDggb3BzL3NlYyDCsTUuNzklICg4NiBydW5zIHNhbXBsZWQpXG4gICogICBJbnQ4QXJyYXkgICAgICAgICAgeCAxLDA1OCw3MDcgb3BzL3NlYyDCsTQuOTQlICg3NyBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OENsYW1wZWRBcnJheSAgeCAxLDExMCw2MzMgb3BzL3NlYyDCsTQuMjAlICg4MCBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIEZsb2F0NjRBcnJheSAgICAgICB4IDcsMTA1LDY3MSBvcHMvc2VjIMKxMTMuNDclICg2NCBydW5zIHNhbXBsZWQpXG4gICogICBGbG9hdDMyQXJyYXkgICAgICAgeCA1LDg4Nyw5MTIgb3BzL3NlYyDCsTEuNDYlICg4MiBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MzJBcnJheSAgICAgICAgeCA2LDQ5MSw2NjEgb3BzL3NlYyDCsTEuNzYlICg3OSBydW5zIHNhbXBsZWQpXG4gICogICBVaW50MTZBcnJheSAgICAgICAgeCA2LDU1OSw3OTUgb3BzL3NlYyDCsTEuNjclICg4MiBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OEFycmF5ICAgICAgICAgeCA2LDQ2Myw5NjYgb3BzL3NlYyDCsTEuNDMlICg4NSBydW5zIHNhbXBsZWQpXG4gICogICBJbnQzMkFycmF5ICAgICAgICAgeCA1LDY0MSw4NDEgb3BzL3NlYyDCsTMuNDklICg4MSBydW5zIHNhbXBsZWQpXG4gICogICBJbnQxNkFycmF5ICAgICAgICAgeCA2LDU4Myw1MTEgb3BzL3NlYyDCsTEuOTglICg4MCBydW5zIHNhbXBsZWQpXG4gICogICBJbnQ4QXJyYXkgICAgICAgICAgeCA2LDYwNiwwNzggb3BzL3NlYyDCsTEuNzQlICg4MSBydW5zIHNhbXBsZWQpXG4gICogICBVaW50OENsYW1wZWRBcnJheSAgeCA2LDYwMiwyMjQgb3BzL3NlYyDCsTEuNzclICg4MyBydW5zIHNhbXBsZWQpXG4gICovXG4gIHZhciBzdHJpbmdUYWcgPSAoc3ltYm9sVG9TdHJpbmdUYWdFeGlzdHMgJiYgb2JqW1N5bWJvbC50b1N0cmluZ1RhZ10pO1xuICBpZiAodHlwZW9mIHN0cmluZ1RhZyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3RyaW5nVGFnO1xuICB9XG5cbiAgdmFyIG9ialByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIHJlZ2V4IGxpdGVyYWwgICAgICB4IDEsNzcyLDM4NSBvcHMvc2VjIMKxMS44NSUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKiAgIHJlZ2V4IGNvbnN0cnVjdG9yICB4IDIsMTQzLDYzNCBvcHMvc2VjIMKxMi40NiUgKDc4IHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgcmVnZXggbGl0ZXJhbCAgICAgIHggMyw5MjgsMDA5IG9wcy9zZWMgwrEwLjY1JSAoNzggcnVucyBzYW1wbGVkKVxuICAqICAgcmVnZXggY29uc3RydWN0b3IgIHggMyw5MzEsMTA4IG9wcy9zZWMgwrEwLjU4JSAoODQgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAob2JqUHJvdG90eXBlID09PSBSZWdFeHAucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdSZWdFeHAnO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgKiBQcmU6XG4gICogICBkYXRlICAgICAgICAgICAgICAgeCAyLDEzMCwwNzQgb3BzL3NlYyDCsTQuNDIlICg2OCBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIGRhdGUgICAgICAgICAgICAgICB4IDMsOTUzLDc3OSBvcHMvc2VjIMKxMS4zNSUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgaWYgKG9ialByb3RvdHlwZSA9PT0gRGF0ZS5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ0RhdGUnO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLXByb21pc2UucHJvdG90eXBlLUBAdG9zdHJpbmd0YWcpXG4gICAqIEVTNiQyNS40LjUuNCAtIFByb21pc2UucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddIHNob3VsZCBiZSBcIlByb21pc2VcIjpcbiAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQcm9taXNlLnJlc29sdmUoKSlgYFxuICAgKiAgLSBDaHJvbWUgPD00NyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKiAgLSBFZGdlIDw9MjAgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICogIC0gRmlyZWZveCAyOS1MYXRlc3QgPT09IFwiW29iamVjdCBQcm9taXNlXVwiXG4gICAqICAtIFNhZmFyaSA3LjEtTGF0ZXN0ID09PSBcIltvYmplY3QgUHJvbWlzZV1cIlxuICAgKi9cbiAgaWYgKHByb21pc2VFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBQcm9taXNlLnByb3RvdHlwZSkge1xuICAgIHJldHVybiAnUHJvbWlzZSc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIHNldCAgICAgICAgICAgICAgICB4IDIsMjIyLDE4NiBvcHMvc2VjIMKxMS4zMSUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgc2V0ICAgICAgICAgICAgICAgIHggNCw1NDUsODc5IG9wcy9zZWMgwrExLjEzJSAoODMgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAoc2V0RXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gU2V0LnByb3RvdHlwZSkge1xuICAgIHJldHVybiAnU2V0JztcbiAgfVxuXG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICogUHJlOlxuICAqICAgbWFwICAgICAgICAgICAgICAgIHggMiwzOTYsODQyIG9wcy9zZWMgwrExLjU5JSAoODEgcnVucyBzYW1wbGVkKVxuICAqIFBvc3Q6XG4gICogICBtYXAgICAgICAgICAgICAgICAgeCA0LDE4Myw5NDUgb3BzL3NlYyDCsTYuNTklICg4MiBydW5zIHNhbXBsZWQpXG4gICovXG4gIGlmIChtYXBFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBNYXAucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdNYXAnO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgKiBQcmU6XG4gICogICB3ZWFrc2V0ICAgICAgICAgICAgeCAxLDMyMywyMjAgb3BzL3NlYyDCsTIuMTclICg3NiBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIHdlYWtzZXQgICAgICAgICAgICB4IDQsMjM3LDUxMCBvcHMvc2VjIMKxMi4wMSUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgaWYgKHdlYWtTZXRFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBXZWFrU2V0LnByb3RvdHlwZSkge1xuICAgIHJldHVybiAnV2Vha1NldCc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIHdlYWttYXAgICAgICAgICAgICB4IDEsNTAwLDI2MCBvcHMvc2VjIMKxMi4wMiUgKDc4IHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgd2Vha21hcCAgICAgICAgICAgIHggMyw4ODEsMzg0IG9wcy9zZWMgwrExLjQ1JSAoODIgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAod2Vha01hcEV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IFdlYWtNYXAucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdXZWFrTWFwJztcbiAgfVxuXG4gIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgKiAoaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC9pbmRleC5odG1sI3NlYy1kYXRhdmlldy5wcm90b3R5cGUtQEB0b3N0cmluZ3RhZylcbiAgICogRVM2JDI0LjIuNC4yMSAtIERhdGFWaWV3LnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSBzaG91bGQgYmUgXCJEYXRhVmlld1wiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKWBgXG4gICAqICAtIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKi9cbiAgaWYgKGRhdGFWaWV3RXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gRGF0YVZpZXcucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdEYXRhVmlldyc7XG4gIH1cblxuICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICogKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvaW5kZXguaHRtbCNzZWMtJW1hcGl0ZXJhdG9ycHJvdG90eXBlJS1AQHRvc3RyaW5ndGFnKVxuICAgKiBFUzYkMjMuMS41LjIuMiAtICVNYXBJdGVyYXRvclByb3RvdHlwZSVbQEB0b1N0cmluZ1RhZ10gc2hvdWxkIGJlIFwiTWFwIEl0ZXJhdG9yXCI6XG4gICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3IE1hcCgpLmVudHJpZXMoKSlgYFxuICAgKiAgLSBFZGdlIDw9MTMgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICovXG4gIGlmIChtYXBFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBtYXBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgIHJldHVybiAnTWFwIEl0ZXJhdG9yJztcbiAgfVxuXG4gIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgKiAoaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC9pbmRleC5odG1sI3NlYy0lc2V0aXRlcmF0b3Jwcm90b3R5cGUlLUBAdG9zdHJpbmd0YWcpXG4gICAqIEVTNiQyMy4yLjUuMi4yIC0gJVNldEl0ZXJhdG9yUHJvdG90eXBlJVtAQHRvU3RyaW5nVGFnXSBzaG91bGQgYmUgXCJTZXQgSXRlcmF0b3JcIjpcbiAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXcgU2V0KCkuZW50cmllcygpKWBgXG4gICAqICAtIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKi9cbiAgaWYgKHNldEV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IHNldEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdTZXQgSXRlcmF0b3InO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS1AQHRvc3RyaW5ndGFnKVxuICAgKiBFUzYkMjIuMS41LjIuMiAtICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJVtAQHRvU3RyaW5nVGFnXSBzaG91bGQgYmUgXCJBcnJheSBJdGVyYXRvclwiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSlgYFxuICAgKiAgLSBFZGdlIDw9MTMgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICovXG4gIGlmIChhcnJheUl0ZXJhdG9yRXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gYXJyYXlJdGVyYXRvclByb3RvdHlwZSkge1xuICAgIHJldHVybiAnQXJyYXkgSXRlcmF0b3InO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUtQEB0b3N0cmluZ3RhZylcbiAgICogRVM2JDIxLjEuNS4yLjIgLSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlW0BAdG9TdHJpbmdUYWddIHNob3VsZCBiZSBcIlN0cmluZyBJdGVyYXRvclwiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSlgYFxuICAgKiAgLSBFZGdlIDw9MTMgPT09IFwiW29iamVjdCBPYmplY3RdXCJcbiAgICovXG4gIGlmIChzdHJpbmdJdGVyYXRvckV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IHN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdTdHJpbmcgSXRlcmF0b3InO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgKiBQcmU6XG4gICogICBvYmplY3QgZnJvbSBudWxsICAgeCAyLDQyNCwzMjAgb3BzL3NlYyDCsTEuNjclICg3NiBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIG9iamVjdCBmcm9tIG51bGwgICB4IDUsODM4LDAwMCBvcHMvc2VjIMKxMC45OSUgKDg0IHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgaWYgKG9ialByb3RvdHlwZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxuXG4gIHJldHVybiBPYmplY3RcbiAgICAucHJvdG90eXBlXG4gICAgLnRvU3RyaW5nXG4gICAgLmNhbGwob2JqKVxuICAgIC5zbGljZSh0b1N0cmluZ0xlZnRTbGljZUxlbmd0aCwgdG9TdHJpbmdSaWdodFNsaWNlTGVuZ3RoKTtcbn1cblxucmV0dXJuIHR5cGVEZXRlY3Q7XG5cbn0pKSk7XG4iXX0=
