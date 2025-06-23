/* Sinon.JS 20.0.0, 2025-03-24, @license BSD-3 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sinon = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

const behavior = require("./sinon/behavior");
const createSandbox = require("./sinon/create-sandbox");
const extend = require("./sinon/util/core/extend");
const fakeTimers = require("./sinon/util/fake-timers");
const Sandbox = require("./sinon/sandbox");
const stub = require("./sinon/stub");
const promise = require("./sinon/promise");

/**
 * @returns {object} a configured sandbox
 */
module.exports = function createApi() {
    const apiMethods = {
        createSandbox: createSandbox,
        match: require("@sinonjs/samsam").createMatcher,
        restoreObject: require("./sinon/restore-object"),

        expectation: require("./sinon/mock-expectation"),

        // fake timers
        timers: fakeTimers.timers,

        addBehavior: function (name, fn) {
            behavior.addBehavior(stub, name, fn);
        },

        // fake promise
        promise: promise,
    };

    const sandbox = new Sandbox();
    return extend(sandbox, apiMethods);
};

},{"./sinon/behavior":4,"./sinon/create-sandbox":7,"./sinon/mock-expectation":11,"./sinon/promise":13,"./sinon/restore-object":18,"./sinon/sandbox":19,"./sinon/stub":22,"./sinon/util/core/extend":25,"./sinon/util/fake-timers":39,"@sinonjs/samsam":86}],2:[function(require,module,exports){
"use strict";

const createApi = require("./create-sinon-api");

module.exports = createApi();

},{"./create-sinon-api":1}],3:[function(require,module,exports){
"use strict";
/** @module */

const arrayProto = require("@sinonjs/commons").prototypes.array;
const calledInOrder = require("@sinonjs/commons").calledInOrder;
const createMatcher = require("@sinonjs/samsam").createMatcher;
const orderByFirstCall = require("@sinonjs/commons").orderByFirstCall;
const timesInWords = require("./util/core/times-in-words");
const inspect = require("util").inspect;
const stringSlice = require("@sinonjs/commons").prototypes.string.slice;
const globalObject = require("@sinonjs/commons").global;

const arraySlice = arrayProto.slice;
const concat = arrayProto.concat;
const forEach = arrayProto.forEach;
const join = arrayProto.join;
const splice = arrayProto.splice;

function applyDefaults(obj, defaults) {
    for (const key of Object.keys(defaults)) {
        const val = obj[key];
        if (val === null || typeof val === "undefined") {
            obj[key] = defaults[key];
        }
    }
}

/**
 * @typedef {object} CreateAssertOptions
 * @global
 *
 * @property {boolean} [shouldLimitAssertionLogs] default is false
 * @property {number}  [assertionLogLimit] default is 10K
 */

/**
 * Create an assertion object that exposes several methods to invoke
 *
 * @param {CreateAssertOptions}  [opts] options bag
 * @returns {object} object with multiple assertion methods
 */
function createAssertObject(opts) {
    const cleanedAssertOptions = opts || {};
    applyDefaults(cleanedAssertOptions, {
        shouldLimitAssertionLogs: false,
        assertionLogLimit: 1e4,
    });

    const assert = {
        failException: "AssertError",

        fail: function fail(message) {
            let msg = message;
            if (cleanedAssertOptions.shouldLimitAssertionLogs) {
                msg = message.substring(
                    0,
                    cleanedAssertOptions.assertionLogLimit,
                );
            }
            const error = new Error(msg);
            error.name = this.failException || assert.failException;

            throw error;
        },

        pass: function pass() {
            return;
        },

        callOrder: function assertCallOrder() {
            verifyIsStub.apply(null, arguments);
            let expected = "";
            let actual = "";

            if (!calledInOrder(arguments)) {
                try {
                    expected = join(arguments, ", ");
                    const calls = arraySlice(arguments);
                    let i = calls.length;
                    while (i) {
                        if (!calls[--i].called) {
                            splice(calls, i, 1);
                        }
                    }
                    actual = join(orderByFirstCall(calls), ", ");
                } catch (e) {
                    // If this fails, we'll just fall back to the blank string
                }

                failAssertion(
                    this,
                    `expected ${expected} to be called in order but were called as ${actual}`,
                );
            } else {
                assert.pass("callOrder");
            }
        },

        callCount: function assertCallCount(method, count) {
            verifyIsStub(method);

            let msg;
            if (typeof count !== "number") {
                msg =
                    `expected ${inspect(count)} to be a number ` +
                    `but was of type ${typeof count}`;
                failAssertion(this, msg);
            } else if (method.callCount !== count) {
                msg =
                    `expected %n to be called ${timesInWords(count)} ` +
                    `but was called %c%C`;
                failAssertion(this, method.printf(msg));
            } else {
                assert.pass("callCount");
            }
        },

        expose: function expose(target, options) {
            if (!target) {
                throw new TypeError("target is null or undefined");
            }

            const o = options || {};
            const prefix =
                (typeof o.prefix === "undefined" && "assert") || o.prefix;
            const includeFail =
                typeof o.includeFail === "undefined" || Boolean(o.includeFail);
            const instance = this;

            forEach(Object.keys(instance), function (method) {
                if (
                    method !== "expose" &&
                    (includeFail || !/^(fail)/.test(method))
                ) {
                    target[exposedName(prefix, method)] = instance[method];
                }
            });

            return target;
        },

        match: function match(actual, expectation) {
            const matcher = createMatcher(expectation);
            if (matcher.test(actual)) {
                assert.pass("match");
            } else {
                const formatted = [
                    "expected value to match",
                    `    expected = ${inspect(expectation)}`,
                    `    actual = ${inspect(actual)}`,
                ];

                failAssertion(this, join(formatted, "\n"));
            }
        },
    };

    function verifyIsStub() {
        const args = arraySlice(arguments);

        forEach(args, function (method) {
            if (!method) {
                assert.fail("fake is not a spy");
            }

            if (method.proxy && method.proxy.isSinonProxy) {
                verifyIsStub(method.proxy);
            } else {
                if (typeof method !== "function") {
                    assert.fail(`${method} is not a function`);
                }

                if (typeof method.getCall !== "function") {
                    assert.fail(`${method} is not stubbed`);
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
                        `${assertionMethod} takes 1 argument but was called with ${
                            assertionArgs.length + 1
                        } arguments`,
                    );
                }
                break;
            default:
                break;
        }
    }

    function failAssertion(object, msg) {
        const obj = object || globalObject;
        const failMethod = obj.fail || assert.fail;
        failMethod.call(obj, msg);
    }

    function mirrorPropAsAssertion(name, method, message) {
        let msg = message;
        let meth = method;
        if (arguments.length === 2) {
            msg = method;
            meth = name;
        }

        assert[name] = function (fake) {
            verifyIsStub(fake);

            const args = arraySlice(arguments, 1);
            let failed = false;

            verifyIsValidAssertion(name, args);

            if (typeof meth === "function") {
                failed = !meth(fake);
            } else {
                failed =
                    typeof fake[meth] === "function"
                        ? !fake[meth].apply(fake, args)
                        : !fake[meth];
            }

            if (failed) {
                failAssertion(
                    this,
                    (fake.printf || fake.proxy.printf).apply(
                        fake,
                        concat([msg], args),
                    ),
                );
            } else {
                assert.pass(name);
            }
        };
    }

    function exposedName(prefix, prop) {
        return !prefix || /^fail/.test(prop)
            ? prop
            : prefix +
                  stringSlice(prop, 0, 1).toUpperCase() +
                  stringSlice(prop, 1);
    }

    mirrorPropAsAssertion(
        "called",
        "expected %n to have been called at least once but was never called",
    );
    mirrorPropAsAssertion(
        "notCalled",
        function (spy) {
            return !spy.called;
        },
        "expected %n to not have been called but was called %c%C",
    );
    mirrorPropAsAssertion(
        "calledOnce",
        "expected %n to be called once but was called %c%C",
    );
    mirrorPropAsAssertion(
        "calledTwice",
        "expected %n to be called twice but was called %c%C",
    );
    mirrorPropAsAssertion(
        "calledThrice",
        "expected %n to be called thrice but was called %c%C",
    );
    mirrorPropAsAssertion(
        "calledOn",
        "expected %n to be called with %1 as this but was called with %t",
    );
    mirrorPropAsAssertion(
        "alwaysCalledOn",
        "expected %n to always be called with %1 as this but was called with %t",
    );
    mirrorPropAsAssertion("calledWithNew", "expected %n to be called with new");
    mirrorPropAsAssertion(
        "alwaysCalledWithNew",
        "expected %n to always be called with new",
    );
    mirrorPropAsAssertion(
        "calledWith",
        "expected %n to be called with arguments %D",
    );
    mirrorPropAsAssertion(
        "calledWithMatch",
        "expected %n to be called with match %D",
    );
    mirrorPropAsAssertion(
        "alwaysCalledWith",
        "expected %n to always be called with arguments %D",
    );
    mirrorPropAsAssertion(
        "alwaysCalledWithMatch",
        "expected %n to always be called with match %D",
    );
    mirrorPropAsAssertion(
        "calledWithExactly",
        "expected %n to be called with exact arguments %D",
    );
    mirrorPropAsAssertion(
        "calledOnceWithExactly",
        "expected %n to be called once and with exact arguments %D",
    );
    mirrorPropAsAssertion(
        "calledOnceWithMatch",
        "expected %n to be called once and with match %D",
    );
    mirrorPropAsAssertion(
        "alwaysCalledWithExactly",
        "expected %n to always be called with exact arguments %D",
    );
    mirrorPropAsAssertion(
        "neverCalledWith",
        "expected %n to never be called with arguments %*%C",
    );
    mirrorPropAsAssertion(
        "neverCalledWithMatch",
        "expected %n to never be called with match %*%C",
    );
    mirrorPropAsAssertion("threw", "%n did not throw exception%C");
    mirrorPropAsAssertion("alwaysThrew", "%n did not always throw exception%C");

    return assert;
}

module.exports = createAssertObject();
module.exports.createAssertObject = createAssertObject;

},{"./util/core/times-in-words":35,"@sinonjs/commons":46,"@sinonjs/samsam":86,"util":90}],4:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const extend = require("./util/core/extend");
const functionName = require("@sinonjs/commons").functionName;
const nextTick = require("./util/core/next-tick");
const valueToString = require("@sinonjs/commons").valueToString;
const exportAsyncBehaviors = require("./util/core/export-async-behaviors");

const concat = arrayProto.concat;
const join = arrayProto.join;
const reverse = arrayProto.reverse;
const slice = arrayProto.slice;

const useLeftMostCallback = -1;
const useRightMostCallback = -2;

function getCallback(behavior, args) {
    const callArgAt = behavior.callArgAt;

    if (callArgAt >= 0) {
        return args[callArgAt];
    }

    let argumentList;

    if (callArgAt === useLeftMostCallback) {
        argumentList = args;
    }

    if (callArgAt === useRightMostCallback) {
        argumentList = reverse(slice(args));
    }

    const callArgProp = behavior.callArgProp;

    for (let i = 0, l = argumentList.length; i < l; ++i) {
        if (!callArgProp && typeof argumentList[i] === "function") {
            return argumentList[i];
        }

        if (
            callArgProp &&
            argumentList[i] &&
            typeof argumentList[i][callArgProp] === "function"
        ) {
            return argumentList[i][callArgProp];
        }
    }

    return null;
}

function getCallbackError(behavior, func, args) {
    if (behavior.callArgAt < 0) {
        let msg;

        if (behavior.callArgProp) {
            msg = `${functionName(
                behavior.stub,
            )} expected to yield to '${valueToString(
                behavior.callArgProp,
            )}', but no object with such a property was passed.`;
        } else {
            msg = `${functionName(
                behavior.stub,
            )} expected to yield, but no callback was passed.`;
        }

        if (args.length > 0) {
            msg += ` Received [${join(args, ", ")}]`;
        }

        return msg;
    }

    return `argument at index ${behavior.callArgAt} is not a function: ${func}`;
}

function ensureArgs(name, behavior, args) {
    // map function name to internal property
    //   callsArg => callArgAt
    const property = name.replace(/sArg/, "ArgAt");
    const index = behavior[property];

    if (index >= args.length) {
        throw new TypeError(
            `${name} failed: ${index + 1} arguments required but only ${
                args.length
            } present`,
        );
    }
}

function callCallback(behavior, args) {
    if (typeof behavior.callArgAt === "number") {
        ensureArgs("callsArg", behavior, args);
        const func = getCallback(behavior, args);

        if (typeof func !== "function") {
            throw new TypeError(getCallbackError(behavior, func, args));
        }

        if (behavior.callbackAsync) {
            nextTick(function () {
                func.apply(
                    behavior.callbackContext,
                    behavior.callbackArguments,
                );
            });
        } else {
            return func.apply(
                behavior.callbackContext,
                behavior.callbackArguments,
            );
        }
    }

    return undefined;
}

const proto = {
    create: function create(stub) {
        const behavior = extend({}, proto);
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
        const returnValue = callCallback(this, args);

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
            return (this.promiseLibrary || Promise).resolve(
                args[this.resolveArgAt],
            );
        } else if (this.resolveThis) {
            return (this.promiseLibrary || Promise).resolve(context);
        } else if (this.resolve) {
            return (this.promiseLibrary || Promise).resolve(this.returnValue);
        } else if (this.reject) {
            return (this.promiseLibrary || Promise).reject(this.returnValue);
        } else if (this.callsThrough) {
            const wrappedMethod = this.effectiveWrappedMethod();

            return wrappedMethod.apply(context, args);
        } else if (this.callsThroughWithNew) {
            // Get the original method (assumed to be a constructor in this case)
            const WrappedClass = this.effectiveWrappedMethod();
            // Turn the arguments object into a normal array
            const argsArray = slice(args);
            // Call the constructor
            const F = WrappedClass.bind.apply(
                WrappedClass,
                concat([null], argsArray),
            );
            return new F();
        } else if (typeof this.returnValue !== "undefined") {
            return this.returnValue;
        } else if (typeof this.callArgAt === "number") {
            return returnValue;
        }

        return this.returnValue;
    },

    effectiveWrappedMethod: function effectiveWrappedMethod() {
        for (let stubb = this.stub; stubb; stubb = stubb.parent) {
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
                "to define sequential behavior for calls with certain arguments.",
        );
    },
};

function createBehavior(behaviorMethod) {
    return function () {
        this.defaultBehavior = this.defaultBehavior || proto.create(this);
        this.defaultBehavior[behaviorMethod].apply(
            this.defaultBehavior,
            arguments,
        );
        return this;
    };
}

function addBehavior(stub, name, fn) {
    proto[name] = function () {
        fn.apply(this, concat([this], slice(arguments)));
        return this.stub || this;
    };

    stub[name] = createBehavior(name);
}

proto.addBehavior = addBehavior;
proto.createBehavior = createBehavior;

const asyncBehaviors = exportAsyncBehaviors(proto);

module.exports = extend.nonEnum({}, proto, asyncBehaviors);

},{"./util/core/export-async-behaviors":24,"./util/core/extend":25,"./util/core/next-tick":33,"@sinonjs/commons":46}],5:[function(require,module,exports){
"use strict";

const walk = require("./util/core/walk");
const getPropertyDescriptor = require("./util/core/get-property-descriptor");
const hasOwnProperty =
    require("@sinonjs/commons").prototypes.object.hasOwnProperty;
const push = require("@sinonjs/commons").prototypes.array.push;

function collectMethod(methods, object, prop, propOwner) {
    if (
        typeof getPropertyDescriptor(propOwner, prop).value === "function" &&
        hasOwnProperty(object, prop)
    ) {
        push(methods, object[prop]);
    }
}

// This function returns an array of all the own methods on the passed object
function collectOwnMethods(object) {
    const methods = [];

    walk(object, collectMethod.bind(null, methods, object));

    return methods;
}

module.exports = collectOwnMethods;

},{"./util/core/get-property-descriptor":28,"./util/core/walk":37,"@sinonjs/commons":46}],6:[function(require,module,exports){
"use strict";

module.exports = class Colorizer {
    constructor(supportsColor = require("supports-color")) {
        this.supportsColor = supportsColor;
    }

    /**
     * Should be renamed to true #privateField
     * when we can ensure ES2022 support
     *
     * @private
     */
    colorize(str, color) {
        if (this.supportsColor.stdout === false) {
            return str;
        }

        return `\x1b[${color}m${str}\x1b[0m`;
    }

    red(str) {
        return this.colorize(str, 31);
    }

    green(str) {
        return this.colorize(str, 32);
    }

    cyan(str) {
        return this.colorize(str, 96);
    }

    white(str) {
        return this.colorize(str, 39);
    }

    bold(str) {
        return this.colorize(str, 1);
    }
};

},{"supports-color":93}],7:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const Sandbox = require("./sandbox");

const forEach = arrayProto.forEach;
const push = arrayProto.push;

function prepareSandboxFromConfig(config) {
    const sandbox = new Sandbox({ assertOptions: config.assertOptions });

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

/**
 * Options to customize a sandbox
 *
 * The sandbox's methods can be injected into another object for
 * convenience. The `injectInto` configuration option can name an
 * object to add properties to.
 *
 * @typedef {object} SandboxConfig
 * @property {string[]} properties The properties of the API to expose on the sandbox. Examples: ['spy', 'fake', 'restore']
 * @property {object} injectInto an object in which to inject properties from the sandbox (a facade). This is mostly an integration feature (sinon-test being one).
 * @property {boolean} useFakeTimers  whether timers are faked by default
 * @property {object} [assertOptions] see CreateAssertOptions in ./assert
 *
 * This type def is really suffering from JSDoc not having standardized
 * how to reference types defined in other modules :(
 */

/**
 * A configured sinon sandbox (private type)
 *
 * @typedef {object} ConfiguredSinonSandboxType
 * @private
 * @augments Sandbox
 * @property {string[]} injectedKeys the keys that have been injected (from config.injectInto)
 * @property {*[]} args the arguments for the sandbox
 */

/**
 * Create a sandbox
 *
 * As of Sinon 5 the `sinon` instance itself is a Sandbox, so you
 * hardly ever need to create additional instances for the sake of testing
 *
 * @param config {SandboxConfig}
 * @returns {Sandbox}
 */
function createSandbox(config) {
    if (!config) {
        return new Sandbox();
    }

    const configuredSandbox = prepareSandboxFromConfig(config);
    configuredSandbox.args = configuredSandbox.args || [];
    configuredSandbox.injectedKeys = [];
    configuredSandbox.injectInto = config.injectInto;
    const exposed = configuredSandbox.inject({});

    if (config.properties) {
        forEach(config.properties, function (prop) {
            const value =
                exposed[prop] || (prop === "sandbox" && configuredSandbox);
            exposeValue(configuredSandbox, config, prop, value);
        });
    } else {
        exposeValue(configuredSandbox, config, "sandbox");
    }

    return configuredSandbox;
}

module.exports = createSandbox;

},{"./sandbox":19,"@sinonjs/commons":46}],8:[function(require,module,exports){
"use strict";

const stub = require("./stub");
const sinonType = require("./util/core/sinon-type");
const forEach = require("@sinonjs/commons").prototypes.array.forEach;

function isStub(value) {
    return sinonType.get(value) === "stub";
}

module.exports = function createStubInstance(constructor, overrides) {
    if (typeof constructor !== "function") {
        throw new TypeError("The constructor should be a function.");
    }

    const stubInstance = Object.create(constructor.prototype);
    sinonType.set(stubInstance, "stub-instance");

    const stubbedObject = stub(stubInstance);

    forEach(Object.keys(overrides || {}), function (propertyName) {
        if (propertyName in stubbedObject) {
            const value = overrides[propertyName];
            if (isStub(value)) {
                stubbedObject[propertyName] = value;
            } else {
                stubbedObject[propertyName].returns(value);
            }
        } else {
            throw new Error(
                `Cannot stub ${propertyName}. Property does not exist!`,
            );
        }
    });
    return stubbedObject;
};

},{"./stub":22,"./util/core/sinon-type":34,"@sinonjs/commons":46}],9:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const isPropertyConfigurable = require("./util/core/is-property-configurable");
const exportAsyncBehaviors = require("./util/core/export-async-behaviors");
const extend = require("./util/core/extend");

const slice = arrayProto.slice;

const useLeftMostCallback = -1;
const useRightMostCallback = -2;

function throwsException(fake, error, message) {
    if (typeof error === "function") {
        fake.exceptionCreator = error;
    } else if (typeof error === "string") {
        fake.exceptionCreator = function () {
            const newException = new Error(
                message || `Sinon-provided ${error}`,
            );
            newException.name = error;
            return newException;
        };
    } else if (!error) {
        fake.exceptionCreator = function () {
            return new Error("Error");
        };
    } else {
        fake.exception = error;
    }
}

const defaultBehaviors = {
    callsFake: function callsFake(fake, fn) {
        fake.fakeFn = fn;
        fake.exception = undefined;
        fake.exceptionCreator = undefined;
        fake.callsThrough = false;
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
        fake.callsThrough = false;
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
        fake.callsThrough = false;
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
        fake.callsThrough = false;
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
        fake.callsThrough = false;
    },

    yields: function (fake) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 1);
        fake.callbackContext = undefined;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
        fake.fakeFn = undefined;
        fake.callsThrough = false;
    },

    yieldsRight: function (fake) {
        fake.callArgAt = useRightMostCallback;
        fake.callbackArguments = slice(arguments, 1);
        fake.callbackContext = undefined;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
        fake.callsThrough = false;
        fake.fakeFn = undefined;
    },

    yieldsOn: function (fake, context) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 2);
        fake.callbackContext = context;
        fake.callArgProp = undefined;
        fake.callbackAsync = false;
        fake.callsThrough = false;
        fake.fakeFn = undefined;
    },

    yieldsTo: function (fake, prop) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 2);
        fake.callbackContext = undefined;
        fake.callArgProp = prop;
        fake.callbackAsync = false;
        fake.callsThrough = false;
        fake.fakeFn = undefined;
    },

    yieldsToOn: function (fake, prop, context) {
        fake.callArgAt = useLeftMostCallback;
        fake.callbackArguments = slice(arguments, 3);
        fake.callbackContext = context;
        fake.callArgProp = prop;
        fake.callbackAsync = false;
        fake.fakeFn = undefined;
    },

    throws: throwsException,
    throwsException: throwsException,

    returns: function returns(fake, value) {
        fake.callsThrough = false;
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
        fake.callsThrough = false;

        fake.returnArgAt = index;
    },

    throwsArg: function throwsArg(fake, index) {
        if (typeof index !== "number") {
            throw new TypeError("argument index is not number");
        }
        fake.callsThrough = false;

        fake.throwArgAt = index;
    },

    returnsThis: function returnsThis(fake) {
        fake.returnThis = true;
        fake.callsThrough = false;
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
        fake.callsThrough = false;
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
        fake.callsThrough = false;
    },

    rejects: function rejects(fake, error, message) {
        let reason;
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
        fake.callsThrough = false;

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
        fake.callsThrough = false;
    },

    callThrough: function callThrough(fake) {
        fake.callsThrough = true;
    },

    callThroughWithNew: function callThroughWithNew(fake) {
        fake.callsThroughWithNew = true;
    },

    get: function get(fake, getterFunction) {
        const rootStub = fake.stub || fake;

        Object.defineProperty(rootStub.rootObj, rootStub.propName, {
            get: getterFunction,
            configurable: isPropertyConfigurable(
                rootStub.rootObj,
                rootStub.propName,
            ),
        });

        return fake;
    },

    set: function set(fake, setterFunction) {
        const rootStub = fake.stub || fake;

        Object.defineProperty(
            rootStub.rootObj,
            rootStub.propName,
            // eslint-disable-next-line accessor-pairs
            {
                set: setterFunction,
                configurable: isPropertyConfigurable(
                    rootStub.rootObj,
                    rootStub.propName,
                ),
            },
        );

        return fake;
    },

    value: function value(fake, newVal) {
        const rootStub = fake.stub || fake;

        Object.defineProperty(rootStub.rootObj, rootStub.propName, {
            value: newVal,
            enumerable: true,
            writable: true,
            configurable:
                rootStub.shadowsPropOnPrototype ||
                isPropertyConfigurable(rootStub.rootObj, rootStub.propName),
        });

        return fake;
    },
};

const asyncBehaviors = exportAsyncBehaviors(defaultBehaviors);

module.exports = extend({}, defaultBehaviors, asyncBehaviors);

},{"./util/core/export-async-behaviors":24,"./util/core/extend":25,"./util/core/is-property-configurable":31,"@sinonjs/commons":46}],10:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const createProxy = require("./proxy");
const nextTick = require("./util/core/next-tick");

const slice = arrayProto.slice;

module.exports = fake;

/**
 * Returns a `fake` that records all calls, arguments and return values.
 *
 * When an `f` argument is supplied, this implementation will be used.
 *
 * @example
 * // create an empty fake
 * var f1 = sinon.fake();
 *
 * f1();
 *
 * f1.calledOnce()
 * // true
 *
 * @example
 * function greet(greeting) {
 *   console.log(`Hello ${greeting}`);
 * }
 *
 * // create a fake with implementation
 * var f2 = sinon.fake(greet);
 *
 * // Hello world
 * f2("world");
 *
 * f2.calledWith("world");
 * // true
 *
 * @param {Function|undefined} f
 * @returns {Function}
 * @namespace
 */
function fake(f) {
    if (arguments.length > 0 && typeof f !== "function") {
        throw new TypeError("Expected f argument to be a Function");
    }

    return wrapFunc(f);
}

/**
 * Creates a `fake` that returns the provided `value`, as well as recording all
 * calls, arguments and return values.
 *
 * @example
 * var f1 = sinon.fake.returns(42);
 *
 * f1();
 * // 42
 *
 * @memberof fake
 * @param {*} value
 * @returns {Function}
 */
fake.returns = function returns(value) {
    // eslint-disable-next-line jsdoc/require-jsdoc
    function f() {
        return value;
    }

    return wrapFunc(f);
};

/**
 * Creates a `fake` that throws an Error.
 * If the `value` argument does not have Error in its prototype chain, it will
 * be used for creating a new error.
 *
 * @example
 * var f1 = sinon.fake.throws("hello");
 *
 * f1();
 * // Uncaught Error: hello
 *
 * @example
 * var f2 = sinon.fake.throws(new TypeError("Invalid argument"));
 *
 * f2();
 * // Uncaught TypeError: Invalid argument
 *
 * @memberof fake
 * @param {*|Error} value
 * @returns {Function}
 */
fake.throws = function throws(value) {
    // eslint-disable-next-line jsdoc/require-jsdoc
    function f() {
        throw getError(value);
    }

    return wrapFunc(f);
};

/**
 * Creates a `fake` that returns a promise that resolves to the passed `value`
 * argument.
 *
 * @example
 * var f1 = sinon.fake.resolves("apple pie");
 *
 * await f1();
 * // "apple pie"
 *
 * @memberof fake
 * @param {*} value
 * @returns {Function}
 */
fake.resolves = function resolves(value) {
    // eslint-disable-next-line jsdoc/require-jsdoc
    function f() {
        return Promise.resolve(value);
    }

    return wrapFunc(f);
};

/**
 * Creates a `fake` that returns a promise that rejects to the passed `value`
 * argument. When `value` does not have Error in its prototype chain, it will be
 * wrapped in an Error.
 *
 * @example
 * var f1 = sinon.fake.rejects(":(");
 *
 * try {
 *   await f1();
 * } catch (error) {
 *   console.log(error);
 *   // ":("
 * }
 *
 * @memberof fake
 * @param {*} value
 * @returns {Function}
 */
fake.rejects = function rejects(value) {
    // eslint-disable-next-line jsdoc/require-jsdoc
    function f() {
        return Promise.reject(getError(value));
    }

    return wrapFunc(f);
};

/**
 * Returns a `fake` that calls the callback with the defined arguments.
 *
 * @example
 * function callback() {
 *   console.log(arguments.join("*"));
 * }
 *
 * const f1 = sinon.fake.yields("apple", "pie");
 *
 * f1(callback);
 * // "apple*pie"
 *
 * @memberof fake
 * @returns {Function}
 */
fake.yields = function yields() {
    const values = slice(arguments);

    // eslint-disable-next-line jsdoc/require-jsdoc
    function f() {
        const callback = arguments[arguments.length - 1];
        if (typeof callback !== "function") {
            throw new TypeError("Expected last argument to be a function");
        }

        callback.apply(null, values);
    }

    return wrapFunc(f);
};

/**
 * Returns a `fake` that calls the callback **asynchronously** with the
 * defined arguments.
 *
 * @example
 * function callback() {
 *   console.log(arguments.join("*"));
 * }
 *
 * const f1 = sinon.fake.yields("apple", "pie");
 *
 * f1(callback);
 *
 * setTimeout(() => {
 *   // "apple*pie"
 * });
 *
 * @memberof fake
 * @returns {Function}
 */
fake.yieldsAsync = function yieldsAsync() {
    const values = slice(arguments);

    // eslint-disable-next-line jsdoc/require-jsdoc
    function f() {
        const callback = arguments[arguments.length - 1];
        if (typeof callback !== "function") {
            throw new TypeError("Expected last argument to be a function");
        }
        nextTick(function () {
            callback.apply(null, values);
        });
    }

    return wrapFunc(f);
};

let uuid = 0;
/**
 * Creates a proxy (sinon concept) from the passed function.
 *
 * @private
 * @param  {Function} f
 * @returns {Function}
 */
function wrapFunc(f) {
    const fakeInstance = function () {
        let firstArg, lastArg;

        if (arguments.length > 0) {
            firstArg = arguments[0];
            lastArg = arguments[arguments.length - 1];
        }

        const callback =
            lastArg && typeof lastArg === "function" ? lastArg : undefined;

        /* eslint-disable no-use-before-define */
        proxy.firstArg = firstArg;
        proxy.lastArg = lastArg;
        proxy.callback = callback;

        return f && f.apply(this, arguments);
    };
    const proxy = createProxy(fakeInstance, f || fakeInstance);

    proxy.displayName = "fake";
    proxy.id = `fake#${uuid++}`;

    return proxy;
}

/**
 * Returns an Error instance from the passed value, if the value is not
 * already an Error instance.
 *
 * @private
 * @param  {*} value [description]
 * @returns {Error}       [description]
 */
function getError(value) {
    return value instanceof Error ? value : new Error(value);
}

},{"./proxy":17,"./util/core/next-tick":33,"@sinonjs/commons":46}],11:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const proxyInvoke = require("./proxy-invoke");
const proxyCallToString = require("./proxy-call").toString;
const timesInWords = require("./util/core/times-in-words");
const extend = require("./util/core/extend");
const match = require("@sinonjs/samsam").createMatcher;
const stub = require("./stub");
const assert = require("./assert");
const deepEqual = require("@sinonjs/samsam").deepEqual;
const inspect = require("util").inspect;
const valueToString = require("@sinonjs/commons").valueToString;

const every = arrayProto.every;
const forEach = arrayProto.forEach;
const push = arrayProto.push;
const slice = arrayProto.slice;

function callCountInWords(callCount) {
    if (callCount === 0) {
        return "never called";
    }

    return `called ${timesInWords(callCount)}`;
}

function expectedCallCountInWords(expectation) {
    const min = expectation.minCalls;
    const max = expectation.maxCalls;

    if (typeof min === "number" && typeof max === "number") {
        let str = timesInWords(min);

        if (min !== max) {
            str = `at least ${str} and at most ${timesInWords(max)}`;
        }

        return str;
    }

    if (typeof min === "number") {
        return `at least ${timesInWords(min)}`;
    }

    return `at most ${timesInWords(max)}`;
}

function receivedMinCalls(expectation) {
    const hasMinLimit = typeof expectation.minCalls === "number";
    return !hasMinLimit || expectation.callCount >= expectation.minCalls;
}

function receivedMaxCalls(expectation) {
    if (typeof expectation.maxCalls !== "number") {
        return false;
    }

    return expectation.callCount === expectation.maxCalls;
}

function verifyMatcher(possibleMatcher, arg) {
    const isMatcher = match.isMatcher(possibleMatcher);

    return (isMatcher && possibleMatcher.test(arg)) || true;
}

const mockExpectation = {
    minCalls: 1,
    maxCalls: 1,

    create: function create(methodName) {
        const expectation = extend.nonEnum(stub(), mockExpectation);
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
            throw new TypeError(`'${valueToString(num)}' is not number`);
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
            throw new TypeError(`'${valueToString(num)}' is not number`);
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
            throw new TypeError(`'${valueToString(num)}' is not a number`);
        }

        this.atLeast(num);
        return this.atMost(num);
    },

    met: function met() {
        return !this.failed && receivedMinCalls(this);
    },

    verifyCallAllowed: function verifyCallAllowed(thisValue, args) {
        const expectedArguments = this.expectedArguments;

        if (receivedMaxCalls(this)) {
            this.failed = true;
            mockExpectation.fail(
                `${this.method} already called ${timesInWords(this.maxCalls)}`,
            );
        }

        if ("expectedThis" in this && this.expectedThis !== thisValue) {
            mockExpectation.fail(
                `${this.method} called with ${valueToString(
                    thisValue,
                )} as thisValue, expected ${valueToString(this.expectedThis)}`,
            );
        }

        if (!("expectedArguments" in this)) {
            return;
        }

        if (!args) {
            mockExpectation.fail(
                `${this.method} received no arguments, expected ${inspect(
                    expectedArguments,
                )}`,
            );
        }

        if (args.length < expectedArguments.length) {
            mockExpectation.fail(
                `${this.method} received too few arguments (${inspect(
                    args,
                )}), expected ${inspect(expectedArguments)}`,
            );
        }

        if (
            this.expectsExactArgCount &&
            args.length !== expectedArguments.length
        ) {
            mockExpectation.fail(
                `${this.method} received too many arguments (${inspect(
                    args,
                )}), expected ${inspect(expectedArguments)}`,
            );
        }

        forEach(
            expectedArguments,
            function (expectedArgument, i) {
                if (!verifyMatcher(expectedArgument, args[i])) {
                    mockExpectation.fail(
                        `${this.method} received wrong arguments ${inspect(
                            args,
                        )}, didn't match ${String(expectedArguments)}`,
                    );
                }

                if (!deepEqual(args[i], expectedArgument)) {
                    mockExpectation.fail(
                        `${this.method} received wrong arguments ${inspect(
                            args,
                        )}, expected ${inspect(expectedArguments)}`,
                    );
                }
            },
            this,
        );
    },

    allowsCall: function allowsCall(thisValue, args) {
        const expectedArguments = this.expectedArguments;

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
        const _args = args || [];

        if (_args.length < expectedArguments.length) {
            return false;
        }

        if (
            this.expectsExactArgCount &&
            _args.length !== expectedArguments.length
        ) {
            return false;
        }

        return every(expectedArguments, function (expectedArgument, i) {
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

    toString: function () {
        const args = slice(this.expectedArguments || []);

        if (!this.expectsExactArgCount) {
            push(args, "[...]");
        }

        const callStr = proxyCallToString.call({
            proxy: this.method || "anonymous mock expectation",
            args: args,
        });

        const message = `${callStr.replace(
            ", [...",
            "[, ...",
        )} ${expectedCallCountInWords(this)}`;

        if (this.met()) {
            return `Expectation met: ${message}`;
        }

        return `Expected ${message} (${callCountInWords(this.callCount)})`;
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
        const exception = new Error(message);
        exception.name = "ExpectationError";

        throw exception;
    },
};

module.exports = mockExpectation;

},{"./assert":3,"./proxy-call":15,"./proxy-invoke":16,"./stub":22,"./util/core/extend":25,"./util/core/times-in-words":35,"@sinonjs/commons":46,"@sinonjs/samsam":86,"util":90}],12:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const mockExpectation = require("./mock-expectation");
const proxyCallToString = require("./proxy-call").toString;
const extend = require("./util/core/extend");
const deepEqual = require("@sinonjs/samsam").deepEqual;
const wrapMethod = require("./util/core/wrap-method");

const concat = arrayProto.concat;
const filter = arrayProto.filter;
const forEach = arrayProto.forEach;
const every = arrayProto.every;
const join = arrayProto.join;
const push = arrayProto.push;
const slice = arrayProto.slice;
const unshift = arrayProto.unshift;

function mock(object) {
    if (!object || typeof object === "string") {
        return mockExpectation.create(object ? object : "Anonymous mock");
    }

    return mock.create(object);
}

function each(collection, callback) {
    const col = collection || [];

    forEach(col, callback);
}

function arrayEquals(arr1, arr2, compareLength) {
    if (compareLength && arr1.length !== arr2.length) {
        return false;
    }

    return every(arr1, function (element, i) {
        return deepEqual(arr2[i], element);
    });
}

extend(mock, {
    create: function create(object) {
        if (!object) {
            throw new TypeError("object is null");
        }

        const mockObject = extend.nonEnum({}, mock, { object: object });
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
            const mockObject = this;

            wrapMethod(this.object, method, function () {
                return mockObject.invokeMethod(method, this, arguments);
            });

            push(this.proxies, method);
        }

        const expectation = mockExpectation.create(method);
        expectation.wrappedMethod = this.object[method].wrappedMethod;
        push(this.expectations[method], expectation);

        return expectation;
    },

    restore: function restore() {
        const object = this.object;

        each(this.proxies, function (proxy) {
            if (typeof object[proxy].restore === "function") {
                object[proxy].restore();
            }
        });
    },

    verify: function verify() {
        const expectations = this.expectations || {};
        const messages = this.failures ? slice(this.failures) : [];
        const met = [];

        each(this.proxies, function (proxy) {
            each(expectations[proxy], function (expectation) {
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

    invokeMethod: function invokeMethod(method, thisValue, args) {
        /* if we cannot find any matching files we will explicitly call mockExpection#fail with error messages */
        /* eslint consistent-return: "off" */
        const expectations =
            this.expectations && this.expectations[method]
                ? this.expectations[method]
                : [];
        const currentArgs = args || [];
        let available;

        const expectationsWithMatchingArgs = filter(
            expectations,
            function (expectation) {
                const expectedArgs = expectation.expectedArguments || [];

                return arrayEquals(
                    expectedArgs,
                    currentArgs,
                    expectation.expectsExactArgCount,
                );
            },
        );

        const expectationsToApply = filter(
            expectationsWithMatchingArgs,
            function (expectation) {
                return (
                    !expectation.met() &&
                    expectation.allowsCall(thisValue, args)
                );
            },
        );

        if (expectationsToApply.length > 0) {
            return expectationsToApply[0].apply(thisValue, args);
        }

        const messages = [];
        let exhausted = 0;

        forEach(expectationsWithMatchingArgs, function (expectation) {
            if (expectation.allowsCall(thisValue, args)) {
                available = available || expectation;
            } else {
                exhausted += 1;
            }
        });

        if (available && exhausted === 0) {
            return available.apply(thisValue, args);
        }

        forEach(expectations, function (expectation) {
            push(messages, `    ${String(expectation)}`);
        });

        unshift(
            messages,
            `Unexpected call: ${proxyCallToString.call({
                proxy: method,
                args: args,
            })}`,
        );

        const err = new Error();
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
            `Unexpected call: ${proxyCallToString.call({
                proxy: method,
                args: args,
                stack: err.stack,
            })}`,
        );

        mockExpectation.fail(join(messages, "\n"));
    },
});

module.exports = mock;

},{"./mock-expectation":11,"./proxy-call":15,"./util/core/extend":25,"./util/core/wrap-method":38,"@sinonjs/commons":46,"@sinonjs/samsam":86}],13:[function(require,module,exports){
"use strict";

const fake = require("./fake");
const isRestorable = require("./util/core/is-restorable");

const STATUS_PENDING = "pending";
const STATUS_RESOLVED = "resolved";
const STATUS_REJECTED = "rejected";

/**
 * Returns a fake for a given function or undefined. If no function is given, a
 * new fake is returned. If the given function is already a fake, it is
 * returned as is. Otherwise the given function is wrapped in a new fake.
 *
 * @param {Function} [executor] The optional executor function.
 * @returns {Function}
 */
function getFakeExecutor(executor) {
    if (isRestorable(executor)) {
        return executor;
    }
    if (executor) {
        return fake(executor);
    }
    return fake();
}

/**
 * Returns a new promise that exposes it's internal `status`, `resolvedValue`
 * and `rejectedValue` and can be resolved or rejected from the outside by
 * calling `resolve(value)` or `reject(reason)`.
 *
 * @param {Function} [executor] The optional executor function.
 * @returns {Promise}
 */
function promise(executor) {
    const fakeExecutor = getFakeExecutor(executor);
    const sinonPromise = new Promise(fakeExecutor);

    sinonPromise.status = STATUS_PENDING;
    sinonPromise
        .then(function (value) {
            sinonPromise.status = STATUS_RESOLVED;
            sinonPromise.resolvedValue = value;
        })
        .catch(function (reason) {
            sinonPromise.status = STATUS_REJECTED;
            sinonPromise.rejectedValue = reason;
        });

    /**
     * Resolves or rejects the promise with the given status and value.
     *
     * @param {string} status
     * @param {*} value
     * @param {Function} callback
     */
    function finalize(status, value, callback) {
        if (sinonPromise.status !== STATUS_PENDING) {
            throw new Error(`Promise already ${sinonPromise.status}`);
        }

        sinonPromise.status = status;
        callback(value);
    }

    sinonPromise.resolve = function (value) {
        finalize(STATUS_RESOLVED, value, fakeExecutor.firstCall.args[0]);
        // Return the promise so that callers can await it:
        return sinonPromise;
    };
    sinonPromise.reject = function (reason) {
        finalize(STATUS_REJECTED, reason, fakeExecutor.firstCall.args[1]);
        // Return a new promise that resolves when the sinon promise was
        // rejected, so that callers can await it:
        return new Promise(function (resolve) {
            sinonPromise.catch(() => resolve());
        });
    };

    return sinonPromise;
}

module.exports = promise;

},{"./fake":10,"./util/core/is-restorable":32}],14:[function(require,module,exports){
"use strict";

const push = require("@sinonjs/commons").prototypes.array.push;

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
    totalCallCount,
) {
    proxy[method] = function () {
        if (!this.called) {
            if (notCalled) {
                return notCalled.apply(this, arguments);
            }
            return false;
        }

        if (totalCallCount !== undefined && this.callCount !== totalCallCount) {
            return false;
        }

        let currentCall;
        let matches = 0;
        const returnValues = [];

        for (let i = 0, l = this.callCount; i < l; i += 1) {
            currentCall = this.getCall(i);
            const returnValue = currentCall[actual || method].apply(
                currentCall,
                arguments,
            );
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

},{"@sinonjs/commons":46}],15:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const match = require("@sinonjs/samsam").createMatcher;
const deepEqual = require("@sinonjs/samsam").deepEqual;
const functionName = require("@sinonjs/commons").functionName;
const inspect = require("util").inspect;
const valueToString = require("@sinonjs/commons").valueToString;

const concat = arrayProto.concat;
const filter = arrayProto.filter;
const join = arrayProto.join;
const map = arrayProto.map;
const reduce = arrayProto.reduce;
const slice = arrayProto.slice;

/**
 * @param proxy
 * @param text
 * @param args
 */
function throwYieldError(proxy, text, args) {
    let msg = functionName(proxy) + text;
    if (args.length) {
        msg += ` Received [${join(slice(args), ", ")}]`;
    }
    throw new Error(msg);
}

const callProto = {
    calledOn: function calledOn(thisValue) {
        if (match.isMatcher(thisValue)) {
            return thisValue.test(this.thisValue);
        }
        return this.thisValue === thisValue;
    },

    calledWith: function calledWith() {
        const self = this;
        const calledWithArgs = slice(arguments);

        if (calledWithArgs.length > self.args.length) {
            return false;
        }

        return reduce(
            calledWithArgs,
            function (prev, arg, i) {
                return prev && deepEqual(self.args[i], arg);
            },
            true,
        );
    },

    calledWithMatch: function calledWithMatch() {
        const self = this;
        const calledWithMatchArgs = slice(arguments);

        if (calledWithMatchArgs.length > self.args.length) {
            return false;
        }

        return reduce(
            calledWithMatchArgs,
            function (prev, expectation, i) {
                const actual = self.args[i];

                return prev && match(expectation).test(actual);
            },
            true,
        );
    },

    calledWithExactly: function calledWithExactly() {
        return (
            arguments.length === this.args.length &&
            this.calledWith.apply(this, arguments)
        );
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

    calledBefore: function (other) {
        return this.callId < other.callId;
    },

    calledAfter: function (other) {
        return this.callId > other.callId;
    },

    calledImmediatelyBefore: function (other) {
        return this.callId === other.callId - 1;
    },

    calledImmediatelyAfter: function (other) {
        return this.callId === other.callId + 1;
    },

    callArg: function (pos) {
        this.ensureArgIsAFunction(pos);
        return this.args[pos]();
    },

    callArgOn: function (pos, thisValue) {
        this.ensureArgIsAFunction(pos);
        return this.args[pos].apply(thisValue);
    },

    callArgWith: function (pos) {
        return this.callArgOnWith.apply(
            this,
            concat([pos, null], slice(arguments, 1)),
        );
    },

    callArgOnWith: function (pos, thisValue) {
        this.ensureArgIsAFunction(pos);
        const args = slice(arguments, 2);
        return this.args[pos].apply(thisValue, args);
    },

    throwArg: function (pos) {
        if (pos > this.args.length) {
            throw new TypeError(
                `Not enough arguments: ${pos} required but only ${this.args.length} present`,
            );
        }

        throw this.args[pos];
    },

    yield: function () {
        return this.yieldOn.apply(this, concat([null], slice(arguments, 0)));
    },

    yieldOn: function (thisValue) {
        const args = slice(this.args);
        const yieldFn = filter(args, function (arg) {
            return typeof arg === "function";
        })[0];

        if (!yieldFn) {
            throwYieldError(
                this.proxy,
                " cannot yield since no callback was passed.",
                args,
            );
        }

        return yieldFn.apply(thisValue, slice(arguments, 1));
    },

    yieldTo: function (prop) {
        return this.yieldToOn.apply(
            this,
            concat([prop, null], slice(arguments, 1)),
        );
    },

    yieldToOn: function (prop, thisValue) {
        const args = slice(this.args);
        const yieldArg = filter(args, function (arg) {
            return arg && typeof arg[prop] === "function";
        })[0];
        const yieldFn = yieldArg && yieldArg[prop];

        if (!yieldFn) {
            throwYieldError(
                this.proxy,
                ` cannot yield to '${valueToString(
                    prop,
                )}' since no callback was passed.`,
                args,
            );
        }

        return yieldFn.apply(thisValue, slice(arguments, 2));
    },

    toString: function () {
        if (!this.args) {
            return ":(";
        }

        let callStr = this.proxy ? `${String(this.proxy)}(` : "";
        const formattedArgs = map(this.args, function (arg) {
            return inspect(arg);
        });

        callStr = `${callStr + join(formattedArgs, ", ")})`;

        if (typeof this.returnValue !== "undefined") {
            callStr += ` => ${inspect(this.returnValue)}`;
        }

        if (this.exception) {
            callStr += ` !${this.exception.name}`;

            if (this.exception.message) {
                callStr += `(${this.exception.message})`;
            }
        }
        if (this.stack) {
            // If we have a stack, add the first frame that's in end-user code
            // Skip the first two frames because they will refer to Sinon code
            callStr += (this.stack.split("\n")[3] || "unknown").replace(
                /^\s*(?:at\s+|@)?/,
                " at ",
            );
        }

        return callStr;
    },

    ensureArgIsAFunction: function (pos) {
        if (typeof this.args[pos] !== "function") {
            throw new TypeError(
                `Expected argument at position ${pos} to be a Function, but was ${typeof this
                    .args[pos]}`,
            );
        }
    },
};
Object.defineProperty(callProto, "stack", {
    enumerable: true,
    configurable: true,
    get: function () {
        return (this.errorWithCallStack && this.errorWithCallStack.stack) || "";
    },
});

callProto.invokeCallback = callProto.yield;

/**
 * @param proxy
 * @param thisValue
 * @param args
 * @param returnValue
 * @param exception
 * @param id
 * @param errorWithCallStack
 *
 * @returns {object} proxyCall
 */
function createProxyCall(
    proxy,
    thisValue,
    args,
    returnValue,
    exception,
    id,
    errorWithCallStack,
) {
    if (typeof id !== "number") {
        throw new TypeError("Call id is not a number");
    }

    let firstArg, lastArg;

    if (args.length > 0) {
        firstArg = args[0];
        lastArg = args[args.length - 1];
    }

    const proxyCall = Object.create(callProto);
    const callback =
        lastArg && typeof lastArg === "function" ? lastArg : undefined;

    proxyCall.proxy = proxy;
    proxyCall.thisValue = thisValue;
    proxyCall.args = args;
    proxyCall.firstArg = firstArg;
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

},{"@sinonjs/commons":46,"@sinonjs/samsam":86,"util":90}],16:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const proxyCallUtil = require("./proxy-call-util");

const push = arrayProto.push;
const forEach = arrayProto.forEach;
const concat = arrayProto.concat;
const ErrorConstructor = Error.prototype.constructor;
const bind = Function.prototype.bind;

let callId = 0;

module.exports = function invoke(func, thisValue, args) {
    const matchings = this.matchingFakes(args);
    const currentCallId = callId++;
    let exception, returnValue;

    proxyCallUtil.incrementCallCount(this);
    push(this.thisValues, thisValue);
    push(this.args, args);
    push(this.callIds, currentCallId);
    forEach(matchings, function (matching) {
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

        const thisCall = this.getCall(this.callCount - 1);

        if (thisCall.calledWithNew()) {
            // Call through with `new`
            returnValue = new (bind.apply(
                this.func || func,
                concat([thisValue], args),
            ))();

            if (
                typeof returnValue !== "object" &&
                typeof returnValue !== "function"
            ) {
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
    forEach(matchings, function (matching) {
        push(matching.exceptions, exception);
        push(matching.returnValues, returnValue);
    });

    const err = new ErrorConstructor();
    // 1. Please do not get stack at this point. It may be so very slow, and not actually used
    // 2. PhantomJS does not serialize the stack trace until the error has been thrown:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
    try {
        throw err;
    } catch (e) {
        /* empty */
    }
    push(this.errorsWithCallStack, err);
    forEach(matchings, function (matching) {
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

},{"./proxy-call-util":14,"@sinonjs/commons":46}],17:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const extend = require("./util/core/extend");
const functionToString = require("./util/core/function-to-string");
const proxyCall = require("./proxy-call");
const proxyCallUtil = require("./proxy-call-util");
const proxyInvoke = require("./proxy-invoke");
const inspect = require("util").inspect;

const push = arrayProto.push;
const forEach = arrayProto.forEach;
const slice = arrayProto.slice;

const emptyFakes = Object.freeze([]);

// Public API
const proxyApi = {
    toString: functionToString,

    named: function named(name) {
        this.displayName = name;
        const nameDescriptor = Object.getOwnPropertyDescriptor(this, "name");
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
    matchingFakes: function (/*args, strict*/) {
        return emptyFakes;
    },

    getCall: function getCall(index) {
        let i = index;
        if (i < 0) {
            // Negative indices means counting backwards from the last call
            i += this.callCount;
        }
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
            this.errorsWithCallStack[i],
        );
    },

    getCalls: function () {
        const calls = [];
        let i;

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

        return (
            this.callIds[this.callCount - 1] ===
            proxy.callIds[proxy.callCount - 1] - 1
        );
    },

    calledImmediatelyAfter: function calledImmediatelyAfter(proxy) {
        if (!this.called || !proxy.called) {
            return false;
        }

        return (
            this.callIds[this.callCount - 1] ===
            proxy.callIds[proxy.callCount - 1] + 1
        );
    },

    formatters: require("./spy-formatters"),
    printf: function (format) {
        const spyInstance = this;
        const args = slice(arguments, 1);
        let formatter;

        return (format || "").replace(/%(.)/g, function (match, specifier) {
            formatter = proxyApi.formatters[specifier];

            if (typeof formatter === "function") {
                return String(formatter(spyInstance, args));
            } else if (!isNaN(parseInt(specifier, 10))) {
                return inspect(args[specifier - 1]);
            }

            return `%${specifier}`;
        });
    },

    resetHistory: function () {
        if (this.invoking) {
            const err = new Error(
                "Cannot reset Sinon function while invoking it. " +
                    "Move the call to .resetHistory outside of the callback.",
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
        this.firstArg = null;
        this.lastArg = null;
        this.returnValues = [];
        this.thisValues = [];
        this.exceptions = [];
        this.callIds = [];
        this.errorsWithCallStack = [];

        if (this.fakes) {
            forEach(this.fakes, function (fake) {
                fake.resetHistory();
            });
        }

        return this;
    },
};

const delegateToCalls = proxyCallUtil.delegateToCalls;
delegateToCalls(proxyApi, "calledOn", true);
delegateToCalls(proxyApi, "alwaysCalledOn", false, "calledOn");
delegateToCalls(proxyApi, "calledWith", true);
delegateToCalls(
    proxyApi,
    "calledOnceWith",
    true,
    "calledWith",
    false,
    undefined,
    1,
);
delegateToCalls(proxyApi, "calledWithMatch", true);
delegateToCalls(proxyApi, "alwaysCalledWith", false, "calledWith");
delegateToCalls(proxyApi, "alwaysCalledWithMatch", false, "calledWithMatch");
delegateToCalls(proxyApi, "calledWithExactly", true);
delegateToCalls(
    proxyApi,
    "calledOnceWithExactly",
    true,
    "calledWithExactly",
    false,
    undefined,
    1,
);
delegateToCalls(
    proxyApi,
    "calledOnceWithMatch",
    true,
    "calledWithMatch",
    false,
    undefined,
    1,
);
delegateToCalls(
    proxyApi,
    "alwaysCalledWithExactly",
    false,
    "calledWithExactly",
);
delegateToCalls(
    proxyApi,
    "neverCalledWith",
    false,
    "notCalledWith",
    false,
    function () {
        return true;
    },
);
delegateToCalls(
    proxyApi,
    "neverCalledWithMatch",
    false,
    "notCalledWithMatch",
    false,
    function () {
        return true;
    },
);
delegateToCalls(proxyApi, "threw", true);
delegateToCalls(proxyApi, "alwaysThrew", false, "threw");
delegateToCalls(proxyApi, "returned", true);
delegateToCalls(proxyApi, "alwaysReturned", false, "returned");
delegateToCalls(proxyApi, "calledWithNew", true);
delegateToCalls(proxyApi, "alwaysCalledWithNew", false, "calledWithNew");

function createProxy(func, originalFunc) {
    const proxy = wrapFunction(func, originalFunc);

    // Inherit function properties:
    extend(proxy, func);

    proxy.prototype = func.prototype;

    extend.nonEnum(proxy, proxyApi);

    return proxy;
}

function wrapFunction(func, originalFunc) {
    const arity = originalFunc.length;
    let p;
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
    const nameDescriptor = Object.getOwnPropertyDescriptor(
        originalFunc,
        "name",
    );
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
        firstArg: null,
        secondCall: null,
        thirdCall: null,
        lastCall: null,
        lastArg: null,
        args: [],
        returnValues: [],
        thisValues: [],
        exceptions: [],
        callIds: [],
        errorsWithCallStack: [],
    });
    return p;
}

module.exports = createProxy;

},{"./proxy-call":15,"./proxy-call-util":14,"./proxy-invoke":16,"./spy-formatters":20,"./util/core/extend":25,"./util/core/function-to-string":26,"@sinonjs/commons":46,"util":90}],18:[function(require,module,exports){
"use strict";

const walkObject = require("./util/core/walk-object");

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

},{"./util/core/walk-object":36}],19:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const logger = require("@sinonjs/commons").deprecated;
const collectOwnMethods = require("./collect-own-methods");
const getPropertyDescriptor = require("./util/core/get-property-descriptor");
const isPropertyConfigurable = require("./util/core/is-property-configurable");
const match = require("@sinonjs/samsam").createMatcher;
const sinonAssert = require("./assert");
const sinonClock = require("./util/fake-timers");
const sinonMock = require("./mock");
const sinonSpy = require("./spy");
const sinonStub = require("./stub");
const sinonCreateStubInstance = require("./create-stub-instance");
const sinonFake = require("./fake");
const valueToString = require("@sinonjs/commons").valueToString;

const DEFAULT_LEAK_THRESHOLD = 10000;

const filter = arrayProto.filter;
const forEach = arrayProto.forEach;
const push = arrayProto.push;
const reverse = arrayProto.reverse;

function applyOnEach(fakes, method) {
    const matchingFakes = filter(fakes, function (fake) {
        return typeof fake[method] === "function";
    });

    forEach(matchingFakes, function (fake) {
        fake[method]();
    });
}

function throwOnAccessors(descriptor) {
    if (typeof descriptor.get === "function") {
        throw new Error("Use sandbox.replaceGetter for replacing getters");
    }

    if (typeof descriptor.set === "function") {
        throw new Error("Use sandbox.replaceSetter for replacing setters");
    }
}

function verifySameType(object, property, replacement) {
    if (typeof object[property] !== typeof replacement) {
        throw new TypeError(
            `Cannot replace ${typeof object[
                property
            ]} with ${typeof replacement}`,
        );
    }
}

function checkForValidArguments(descriptor, property, replacement) {
    if (typeof descriptor === "undefined") {
        throw new TypeError(
            `Cannot replace non-existent property ${valueToString(
                property,
            )}. Perhaps you meant sandbox.define()?`,
        );
    }

    if (typeof replacement === "undefined") {
        throw new TypeError("Expected replacement argument to be defined");
    }
}

/**
 * A sinon sandbox
 *
 * @param opts
 * @param {object} [opts.assertOptions] see the CreateAssertOptions in ./assert
 * @class
 */
function Sandbox(opts = {}) {
    const sandbox = this;
    const assertOptions = opts.assertOptions || {};
    let fakeRestorers = [];

    let collection = [];
    let loggedLeakWarning = false;
    sandbox.leakThreshold = DEFAULT_LEAK_THRESHOLD;

    function addToCollection(object) {
        if (
            push(collection, object) > sandbox.leakThreshold &&
            !loggedLeakWarning
        ) {
            // eslint-disable-next-line no-console
            logger.printWarning(
                "Potential memory leak detected; be sure to call restore() to clean up your sandbox. To suppress this warning, modify the leakThreshold property of your sandbox.",
            );
            loggedLeakWarning = true;
        }
    }

    sandbox.assert = sinonAssert.createAssertObject(assertOptions);

    // this is for testing only
    sandbox.getFakes = function getFakes() {
        return collection;
    };

    sandbox.createStubInstance = function createStubInstance() {
        const stubbed = sinonCreateStubInstance.apply(null, arguments);

        const ownMethods = collectOwnMethods(stubbed);

        forEach(ownMethods, function (method) {
            addToCollection(method);
        });

        return stubbed;
    };

    sandbox.inject = function inject(obj) {
        obj.spy = function () {
            return sandbox.spy.apply(null, arguments);
        };

        obj.stub = function () {
            return sandbox.stub.apply(null, arguments);
        };

        obj.mock = function () {
            return sandbox.mock.apply(null, arguments);
        };

        obj.createStubInstance = function () {
            return sandbox.createStubInstance.apply(sandbox, arguments);
        };

        obj.fake = function () {
            return sandbox.fake.apply(null, arguments);
        };

        obj.define = function () {
            return sandbox.define.apply(null, arguments);
        };

        obj.replace = function () {
            return sandbox.replace.apply(null, arguments);
        };

        obj.replaceSetter = function () {
            return sandbox.replaceSetter.apply(null, arguments);
        };

        obj.replaceGetter = function () {
            return sandbox.replaceGetter.apply(null, arguments);
        };

        if (sandbox.clock) {
            obj.clock = sandbox.clock;
        }

        obj.match = match;

        return obj;
    };

    sandbox.mock = function mock() {
        const m = sinonMock.apply(null, arguments);

        addToCollection(m);

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
            const method = f.resetHistory || f.reset;
            if (method) {
                method.call(f);
            }
        }

        forEach(collection, privateResetHistory);
    };

    sandbox.restore = function restore() {
        if (arguments.length) {
            throw new Error(
                "sandbox.restore() does not take any parameters. Perhaps you meant stub.restore()",
            );
        }

        reverse(collection);
        applyOnEach(collection, "restore");
        collection = [];

        forEach(fakeRestorers, function (restorer) {
            restorer();
        });
        fakeRestorers = [];

        sandbox.restoreContext();
    };

    sandbox.restoreContext = function restoreContext() {
        if (!sandbox.injectedKeys) {
            return;
        }

        forEach(sandbox.injectedKeys, function (injectedKey) {
            delete sandbox.injectInto[injectedKey];
        });

        sandbox.injectedKeys.length = 0;
    };

    /**
     * Creates a restorer function for the property
     *
     * @param {object|Function} object
     * @param {string} property
     * @param {boolean} forceAssignment
     * @returns {Function} restorer function
     */
    function getFakeRestorer(object, property, forceAssignment = false) {
        const descriptor = getPropertyDescriptor(object, property);
        const value = forceAssignment && object[property];

        function restorer() {
            if (forceAssignment) {
                object[property] = value;
            } else if (descriptor?.isOwn) {
                Object.defineProperty(object, property, descriptor);
            } else {
                delete object[property];
            }
        }

        restorer.object = object;
        restorer.property = property;
        return restorer;
    }

    function verifyNotReplaced(object, property) {
        forEach(fakeRestorers, function (fakeRestorer) {
            if (
                fakeRestorer.object === object &&
                fakeRestorer.property === property
            ) {
                throw new TypeError(
                    `Attempted to replace ${property} which is already replaced`,
                );
            }
        });
    }

    /**
     * Replace an existing property
     *
     * @param {object|Function} object
     * @param {string} property
     * @param {*} replacement a fake, stub, spy or any other value
     * @returns {*}
     */
    sandbox.replace = function replace(object, property, replacement) {
        const descriptor = getPropertyDescriptor(object, property);
        checkForValidArguments(descriptor, property, replacement);
        throwOnAccessors(descriptor);
        verifySameType(object, property, replacement);

        verifyNotReplaced(object, property);

        // store a function for restoring the replaced property
        push(fakeRestorers, getFakeRestorer(object, property));

        object[property] = replacement;

        return replacement;
    };

    sandbox.replace.usingAccessor = function replaceUsingAccessor(
        object,
        property,
        replacement,
    ) {
        const descriptor = getPropertyDescriptor(object, property);
        checkForValidArguments(descriptor, property, replacement);
        verifySameType(object, property, replacement);

        verifyNotReplaced(object, property);

        // store a function for restoring the replaced property
        push(fakeRestorers, getFakeRestorer(object, property, true));

        object[property] = replacement;

        return replacement;
    };

    sandbox.define = function define(object, property, value) {
        const descriptor = getPropertyDescriptor(object, property);

        if (descriptor) {
            throw new TypeError(
                `Cannot define the already existing property ${valueToString(
                    property,
                )}. Perhaps you meant sandbox.replace()?`,
            );
        }

        if (typeof value === "undefined") {
            throw new TypeError("Expected value argument to be defined");
        }

        verifyNotReplaced(object, property);

        // store a function for restoring the defined property
        push(fakeRestorers, getFakeRestorer(object, property));

        object[property] = value;

        return value;
    };

    sandbox.replaceGetter = function replaceGetter(
        object,
        property,
        replacement,
    ) {
        const descriptor = getPropertyDescriptor(object, property);

        if (typeof descriptor === "undefined") {
            throw new TypeError(
                `Cannot replace non-existent property ${valueToString(
                    property,
                )}`,
            );
        }

        if (typeof replacement !== "function") {
            throw new TypeError(
                "Expected replacement argument to be a function",
            );
        }

        if (typeof descriptor.get !== "function") {
            throw new Error("`object.property` is not a getter");
        }

        verifyNotReplaced(object, property);

        // store a function for restoring the replaced property
        push(fakeRestorers, getFakeRestorer(object, property));

        Object.defineProperty(object, property, {
            get: replacement,
            configurable: isPropertyConfigurable(object, property),
        });

        return replacement;
    };

    sandbox.replaceSetter = function replaceSetter(
        object,
        property,
        replacement,
    ) {
        const descriptor = getPropertyDescriptor(object, property);

        if (typeof descriptor === "undefined") {
            throw new TypeError(
                `Cannot replace non-existent property ${valueToString(
                    property,
                )}`,
            );
        }

        if (typeof replacement !== "function") {
            throw new TypeError(
                "Expected replacement argument to be a function",
            );
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
            configurable: isPropertyConfigurable(object, property),
        });

        return replacement;
    };

    function commonPostInitSetup(args, spy) {
        const [object, property, types] = args;

        const isSpyingOnEntireObject =
            typeof property === "undefined" && typeof object === "object";

        if (isSpyingOnEntireObject) {
            const ownMethods = collectOwnMethods(spy);

            forEach(ownMethods, function (method) {
                addToCollection(method);
            });
        } else if (Array.isArray(types)) {
            for (const accessorType of types) {
                addToCollection(spy[accessorType]);
            }
        } else {
            addToCollection(spy);
        }

        return spy;
    }

    sandbox.spy = function spy() {
        const createdSpy = sinonSpy.apply(sinonSpy, arguments);
        return commonPostInitSetup(arguments, createdSpy);
    };

    sandbox.stub = function stub() {
        const createdStub = sinonStub.apply(sinonStub, arguments);
        return commonPostInitSetup(arguments, createdStub);
    };

    // eslint-disable-next-line no-unused-vars
    sandbox.fake = function fake(f) {
        const s = sinonFake.apply(sinonFake, arguments);

        addToCollection(s);

        return s;
    };

    forEach(Object.keys(sinonFake), function (key) {
        const fakeBehavior = sinonFake[key];
        if (typeof fakeBehavior === "function") {
            sandbox.fake[key] = function () {
                const s = fakeBehavior.apply(fakeBehavior, arguments);

                addToCollection(s);

                return s;
            };
        }
    });

    sandbox.useFakeTimers = function useFakeTimers(args) {
        const clock = sinonClock.useFakeTimers.call(null, args);

        sandbox.clock = clock;
        addToCollection(clock);

        return clock;
    };

    sandbox.verify = function verify() {
        applyOnEach(collection, "verify");
    };

    sandbox.verifyAndRestore = function verifyAndRestore() {
        let exception;

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
}

Sandbox.prototype.match = match;

module.exports = Sandbox;

},{"./assert":3,"./collect-own-methods":5,"./create-stub-instance":8,"./fake":10,"./mock":12,"./spy":21,"./stub":22,"./util/core/get-property-descriptor":28,"./util/core/is-property-configurable":31,"./util/fake-timers":39,"@sinonjs/commons":46,"@sinonjs/samsam":86}],20:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const Colorizer = require("./colorizer");
const colororizer = new Colorizer();
const match = require("@sinonjs/samsam").createMatcher;
const timesInWords = require("./util/core/times-in-words");
const inspect = require("util").inspect;
const jsDiff = require("diff");

const join = arrayProto.join;
const map = arrayProto.map;
const push = arrayProto.push;
const slice = arrayProto.slice;

/**
 *
 * @param matcher
 * @param calledArg
 * @param calledArgMessage
 *
 * @returns {string} the colored text
 */
function colorSinonMatchText(matcher, calledArg, calledArgMessage) {
    let calledArgumentMessage = calledArgMessage;
    let matcherMessage = matcher.message;
    if (!matcher.test(calledArg)) {
        matcherMessage = colororizer.red(matcher.message);
        if (calledArgumentMessage) {
            calledArgumentMessage = colororizer.green(calledArgumentMessage);
        }
    }
    return `${calledArgumentMessage} ${matcherMessage}`;
}

/**
 * @param diff
 *
 * @returns {string} the colored diff
 */
function colorDiffText(diff) {
    const objects = map(diff, function (part) {
        let text = part.value;
        if (part.added) {
            text = colororizer.green(text);
        } else if (part.removed) {
            text = colororizer.red(text);
        }
        if (diff.length === 2) {
            text += " "; // format simple diffs
        }
        return text;
    });
    return join(objects, "");
}

/**
 *
 * @param value
 * @returns {string} a quoted string
 */
function quoteStringValue(value) {
    if (typeof value === "string") {
        return JSON.stringify(value);
    }
    return value;
}

module.exports = {
    c: function (spyInstance) {
        return timesInWords(spyInstance.callCount);
    },

    n: function (spyInstance) {
        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
        return spyInstance.toString();
    },

    D: function (spyInstance, args) {
        let message = "";

        for (let i = 0, l = spyInstance.callCount; i < l; ++i) {
            // describe multiple calls
            if (l > 1) {
                message += `\nCall ${i + 1}:`;
            }
            const calledArgs = spyInstance.getCall(i).args;
            const expectedArgs = slice(args);

            for (
                let j = 0;
                j < calledArgs.length || j < expectedArgs.length;
                ++j
            ) {
                let calledArg = calledArgs[j];
                let expectedArg = expectedArgs[j];
                if (calledArg) {
                    calledArg = quoteStringValue(calledArg);
                }

                if (expectedArg) {
                    expectedArg = quoteStringValue(expectedArg);
                }

                message += "\n";

                const calledArgMessage =
                    j < calledArgs.length ? inspect(calledArg) : "";
                if (match.isMatcher(expectedArg)) {
                    message += colorSinonMatchText(
                        expectedArg,
                        calledArg,
                        calledArgMessage,
                    );
                } else {
                    const expectedArgMessage =
                        j < expectedArgs.length ? inspect(expectedArg) : "";
                    const diff = jsDiff.diffJson(
                        calledArgMessage,
                        expectedArgMessage,
                    );
                    message += colorDiffText(diff);
                }
            }
        }

        return message;
    },

    C: function (spyInstance) {
        const calls = [];

        for (let i = 0, l = spyInstance.callCount; i < l; ++i) {
            // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
            let stringifiedCall = `    ${spyInstance.getCall(i).toString()}`;
            if (/\n/.test(calls[i - 1])) {
                stringifiedCall = `\n${stringifiedCall}`;
            }
            push(calls, stringifiedCall);
        }

        return calls.length > 0 ? `\n${join(calls, "\n")}` : "";
    },

    t: function (spyInstance) {
        const objects = [];

        for (let i = 0, l = spyInstance.callCount; i < l; ++i) {
            push(objects, inspect(spyInstance.thisValues[i]));
        }

        return join(objects, ", ");
    },

    "*": function (spyInstance, args) {
        return join(
            map(args, function (arg) {
                return inspect(arg);
            }),
            ", ",
        );
    },
};

},{"./colorizer":6,"./util/core/times-in-words":35,"@sinonjs/commons":46,"@sinonjs/samsam":86,"diff":91,"util":90}],21:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const createProxy = require("./proxy");
const extend = require("./util/core/extend");
const functionName = require("@sinonjs/commons").functionName;
const getPropertyDescriptor = require("./util/core/get-property-descriptor");
const deepEqual = require("@sinonjs/samsam").deepEqual;
const isEsModule = require("./util/core/is-es-module");
const proxyCallUtil = require("./proxy-call-util");
const walkObject = require("./util/core/walk-object");
const wrapMethod = require("./util/core/wrap-method");
const valueToString = require("@sinonjs/commons").valueToString;

/* cache references to library methods so that they also can be stubbed without problems */
const forEach = arrayProto.forEach;
const pop = arrayProto.pop;
const push = arrayProto.push;
const slice = arrayProto.slice;
const filter = Array.prototype.filter;

let uuid = 0;

function matches(fake, args, strict) {
    const margs = fake.matchingArguments;
    if (
        margs.length <= args.length &&
        deepEqual(slice(args, 0, margs.length), margs)
    ) {
        return !strict || margs.length === args.length;
    }
    return false;
}

// Public API
const spyApi = {
    withArgs: function () {
        const args = slice(arguments);
        const matching = pop(this.matchingFakes(args, true));
        if (matching) {
            return matching;
        }

        const original = this;
        const fake = this.instantiateFake();
        fake.matchingArguments = args;
        fake.parent = this;
        push(this.fakes, fake);

        fake.withArgs = function () {
            return original.withArgs.apply(original, arguments);
        };

        forEach(original.args, function (arg, i) {
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
    matchingFakes: function (args, strict) {
        return filter.call(this.fakes, function (fake) {
            return matches(fake, args, strict);
        });
    },
};

/* eslint-disable @sinonjs/no-prototype-methods/no-prototype-methods */
const delegateToCalls = proxyCallUtil.delegateToCalls;
delegateToCalls(spyApi, "callArg", false, "callArgWith", true, function () {
    throw new Error(
        `${this.toString()} cannot call arg since it was not yet invoked.`,
    );
});
spyApi.callArgWith = spyApi.callArg;
delegateToCalls(spyApi, "callArgOn", false, "callArgOnWith", true, function () {
    throw new Error(
        `${this.toString()} cannot call arg since it was not yet invoked.`,
    );
});
spyApi.callArgOnWith = spyApi.callArgOn;
delegateToCalls(spyApi, "throwArg", false, "throwArg", false, function () {
    throw new Error(
        `${this.toString()} cannot throw arg since it was not yet invoked.`,
    );
});
delegateToCalls(spyApi, "yield", false, "yield", true, function () {
    throw new Error(
        `${this.toString()} cannot yield since it was not yet invoked.`,
    );
});
// "invokeCallback" is an alias for "yield" since "yield" is invalid in strict mode.
spyApi.invokeCallback = spyApi.yield;
delegateToCalls(spyApi, "yieldOn", false, "yieldOn", true, function () {
    throw new Error(
        `${this.toString()} cannot yield since it was not yet invoked.`,
    );
});
delegateToCalls(spyApi, "yieldTo", false, "yieldTo", true, function (property) {
    throw new Error(
        `${this.toString()} cannot yield to '${valueToString(
            property,
        )}' since it was not yet invoked.`,
    );
});
delegateToCalls(
    spyApi,
    "yieldToOn",
    false,
    "yieldToOn",
    true,
    function (property) {
        throw new Error(
            `${this.toString()} cannot yield to '${valueToString(
                property,
            )}' since it was not yet invoked.`,
        );
    },
);

function createSpy(func) {
    let name;
    let funk = func;

    if (typeof funk !== "function") {
        funk = function () {
            return;
        };
    } else {
        name = functionName(funk);
    }

    const proxy = createProxy(funk, funk);

    // Inherit spy API:
    extend.nonEnum(proxy, spyApi);
    extend.nonEnum(proxy, {
        displayName: name || "spy",
        fakes: [],
        instantiateFake: createSpy,
        id: `spy#${uuid++}`,
    });
    return proxy;
}

function spy(object, property, types) {
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
        return createSpy(function () {
            return;
        });
    }

    if (!types) {
        return wrapMethod(object, property, createSpy(object[property]));
    }

    const descriptor = {};
    const methodDesc = getPropertyDescriptor(object, property);

    forEach(types, function (type) {
        descriptor[type] = createSpy(methodDesc[type]);
    });

    return wrapMethod(object, property, descriptor);
}

extend(spy, spyApi);
module.exports = spy;

},{"./proxy":17,"./proxy-call-util":14,"./util/core/extend":25,"./util/core/get-property-descriptor":28,"./util/core/is-es-module":29,"./util/core/walk-object":36,"./util/core/wrap-method":38,"@sinonjs/commons":46,"@sinonjs/samsam":86}],22:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const behavior = require("./behavior");
const behaviors = require("./default-behaviors");
const createProxy = require("./proxy");
const functionName = require("@sinonjs/commons").functionName;
const hasOwnProperty =
    require("@sinonjs/commons").prototypes.object.hasOwnProperty;
const isNonExistentProperty = require("./util/core/is-non-existent-property");
const spy = require("./spy");
const extend = require("./util/core/extend");
const getPropertyDescriptor = require("./util/core/get-property-descriptor");
const isEsModule = require("./util/core/is-es-module");
const sinonType = require("./util/core/sinon-type");
const wrapMethod = require("./util/core/wrap-method");
const throwOnFalsyObject = require("./throw-on-falsy-object");
const valueToString = require("@sinonjs/commons").valueToString;
const walkObject = require("./util/core/walk-object");

const forEach = arrayProto.forEach;
const pop = arrayProto.pop;
const slice = arrayProto.slice;
const sort = arrayProto.sort;

let uuid = 0;

function createStub(originalFunc) {
    // eslint-disable-next-line prefer-const
    let proxy;

    function functionStub() {
        const args = slice(arguments);
        const matchings = proxy.matchingFakes(args);

        const fnStub =
            pop(
                sort(matchings, function (a, b) {
                    return (
                        a.matchingArguments.length - b.matchingArguments.length
                    );
                }),
            ) || proxy;
        return getCurrentBehavior(fnStub).invoke(this, arguments);
    }

    proxy = createProxy(functionStub, originalFunc || functionStub);
    // Inherit spy API:
    extend.nonEnum(proxy, spy);
    // Inherit stub API:
    extend.nonEnum(proxy, stub);

    const name = originalFunc ? functionName(originalFunc) : null;
    extend.nonEnum(proxy, {
        fakes: [],
        instantiateFake: createStub,
        displayName: name || "stub",
        defaultBehavior: null,
        behaviors: [],
        id: `stub#${uuid++}`,
    });

    sinonType.set(proxy, "stub");

    return proxy;
}

function stub(object, property) {
    if (arguments.length > 2) {
        throw new TypeError(
            "stub(obj, 'meth', fn) has been removed, see documentation",
        );
    }

    if (isEsModule(object)) {
        throw new TypeError("ES Modules cannot be stubbed");
    }

    throwOnFalsyObject.apply(null, arguments);

    if (isNonExistentProperty(object, property)) {
        throw new TypeError(
            `Cannot stub non-existent property ${valueToString(property)}`,
        );
    }

    const actualDescriptor = getPropertyDescriptor(object, property);

    assertValidPropertyDescriptor(actualDescriptor, property);

    const isObjectOrFunction =
        typeof object === "object" || typeof object === "function";
    const isStubbingEntireObject =
        typeof property === "undefined" && isObjectOrFunction;
    const isCreatingNewStub = !object && typeof property === "undefined";
    const isStubbingNonFuncProperty =
        isObjectOrFunction &&
        typeof property !== "undefined" &&
        (typeof actualDescriptor === "undefined" ||
            typeof actualDescriptor.value !== "function");

    if (isStubbingEntireObject) {
        return walkObject(stub, object);
    }

    if (isCreatingNewStub) {
        return createStub();
    }

    const func =
        typeof actualDescriptor.value === "function"
            ? actualDescriptor.value
            : null;
    const s = createStub(func);

    extend.nonEnum(s, {
        rootObj: object,
        propName: property,
        shadowsPropOnPrototype: !actualDescriptor.isOwn,
        restore: function restore() {
            if (actualDescriptor !== undefined && actualDescriptor.isOwn) {
                Object.defineProperty(object, property, actualDescriptor);
                return;
            }

            delete object[property];
        },
    });

    return isStubbingNonFuncProperty ? s : wrapMethod(object, property, s);
}

function assertValidPropertyDescriptor(descriptor, property) {
    if (!descriptor || !property) {
        return;
    }
    if (descriptor.isOwn && !descriptor.configurable && !descriptor.writable) {
        throw new TypeError(
            `Descriptor for property ${property} is non-configurable and non-writable`,
        );
    }
    if ((descriptor.get || descriptor.set) && !descriptor.configurable) {
        throw new TypeError(
            `Descriptor for accessor property ${property} is non-configurable`,
        );
    }
    if (isDataDescriptor(descriptor) && !descriptor.writable) {
        throw new TypeError(
            `Descriptor for data property ${property} is non-writable`,
        );
    }
}

function isDataDescriptor(descriptor) {
    return (
        !descriptor.value &&
        !descriptor.writable &&
        !descriptor.set &&
        !descriptor.get
    );
}

/*eslint-disable no-use-before-define*/
function getParentBehaviour(stubInstance) {
    return stubInstance.parent && getCurrentBehavior(stubInstance.parent);
}

function getDefaultBehavior(stubInstance) {
    return (
        stubInstance.defaultBehavior ||
        getParentBehaviour(stubInstance) ||
        behavior.create(stubInstance)
    );
}

function getCurrentBehavior(stubInstance) {
    const currentBehavior = stubInstance.behaviors[stubInstance.callCount - 1];
    return currentBehavior && currentBehavior.isPresent()
        ? currentBehavior
        : getDefaultBehavior(stubInstance);
}
/*eslint-enable no-use-before-define*/

const proto = {
    resetBehavior: function () {
        this.defaultBehavior = null;
        this.behaviors = [];

        delete this.returnValue;
        delete this.returnArgAt;
        delete this.throwArgAt;
        delete this.resolveArgAt;
        delete this.fakeFn;
        this.returnThis = false;
        this.resolveThis = false;

        forEach(this.fakes, function (fake) {
            fake.resetBehavior();
        });
    },

    reset: function () {
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
        const fake = spy.withArgs.apply(this, arguments);
        if (this.defaultBehavior && this.defaultBehavior.promiseLibrary) {
            fake.defaultBehavior =
                fake.defaultBehavior || behavior.create(fake);
            fake.defaultBehavior.promiseLibrary =
                this.defaultBehavior.promiseLibrary;
        }
        return fake;
    },
};

forEach(Object.keys(behavior), function (method) {
    if (
        hasOwnProperty(behavior, method) &&
        !hasOwnProperty(proto, method) &&
        method !== "create" &&
        method !== "invoke"
    ) {
        proto[method] = behavior.createBehavior(method);
    }
});

forEach(Object.keys(behaviors), function (method) {
    if (hasOwnProperty(behaviors, method) && !hasOwnProperty(proto, method)) {
        behavior.addBehavior(stub, method, behaviors[method]);
    }
});

extend(stub, proto);
module.exports = stub;

},{"./behavior":4,"./default-behaviors":9,"./proxy":17,"./spy":21,"./throw-on-falsy-object":23,"./util/core/extend":25,"./util/core/get-property-descriptor":28,"./util/core/is-es-module":29,"./util/core/is-non-existent-property":30,"./util/core/sinon-type":34,"./util/core/walk-object":36,"./util/core/wrap-method":38,"@sinonjs/commons":46}],23:[function(require,module,exports){
"use strict";
const valueToString = require("@sinonjs/commons").valueToString;

function throwOnFalsyObject(object, property) {
    if (property && !object) {
        const type = object === null ? "null" : "undefined";
        throw new Error(
            `Trying to stub property '${valueToString(property)}' of ${type}`,
        );
    }
}

module.exports = throwOnFalsyObject;

},{"@sinonjs/commons":46}],24:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const reduce = arrayProto.reduce;

module.exports = function exportAsyncBehaviors(behaviorMethods) {
    return reduce(
        Object.keys(behaviorMethods),
        function (acc, method) {
            // need to avoid creating another async versions of the newly added async methods
            if (method.match(/^(callsArg|yields)/) && !method.match(/Async/)) {
                acc[`${method}Async`] = function () {
                    const result = behaviorMethods[method].apply(
                        this,
                        arguments,
                    );
                    this.callbackAsync = true;
                    return result;
                };
            }
            return acc;
        },
        {},
    );
};

},{"@sinonjs/commons":46}],25:[function(require,module,exports){
"use strict";

const arrayProto = require("@sinonjs/commons").prototypes.array;
const hasOwnProperty =
    require("@sinonjs/commons").prototypes.object.hasOwnProperty;

const join = arrayProto.join;
const push = arrayProto.push;

// Adapted from https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
const hasDontEnumBug = (function () {
    const obj = {
        constructor: function () {
            return "0";
        },
        toString: function () {
            return "1";
        },
        valueOf: function () {
            return "2";
        },
        toLocaleString: function () {
            return "3";
        },
        prototype: function () {
            return "4";
        },
        isPrototypeOf: function () {
            return "5";
        },
        propertyIsEnumerable: function () {
            return "6";
        },
        hasOwnProperty: function () {
            return "7";
        },
        length: function () {
            return "8";
        },
        unique: function () {
            return "9";
        },
    };

    const result = [];
    for (const prop in obj) {
        if (hasOwnProperty(obj, prop)) {
            push(result, obj[prop]());
        }
    }
    return join(result, "") !== "0123456789";
})();

/**
 *
 * @param target
 * @param sources
 * @param doCopy
 * @returns {*} target
 */
function extendCommon(target, sources, doCopy) {
    let source, i, prop;

    for (i = 0; i < sources.length; i++) {
        source = sources[i];

        for (prop in source) {
            if (hasOwnProperty(source, prop)) {
                doCopy(target, source, prop);
            }
        }

        // Make sure we copy (own) toString method even when in JScript with DontEnum bug
        // See https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
        if (
            hasDontEnumBug &&
            hasOwnProperty(source, "toString") &&
            source.toString !== target.toString
        ) {
            target.toString = source.toString;
        }
    }

    return target;
}

/**
 * Public: Extend target in place with all (own) properties, except 'name' when [[writable]] is false,
 *         from sources in-order. Thus, last source will override properties in previous sources.
 *
 * @param {object} target - The Object to extend
 * @param {object[]} sources - Objects to copy properties from.
 * @returns {object} the extended target
 */
module.exports = function extend(target, ...sources) {
    return extendCommon(
        target,
        sources,
        function copyValue(dest, source, prop) {
            const destOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(
                dest,
                prop,
            );
            const sourceOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(
                source,
                prop,
            );

            if (prop === "name" && !destOwnPropertyDescriptor.writable) {
                return;
            }
            const descriptors = {
                configurable: sourceOwnPropertyDescriptor.configurable,
                enumerable: sourceOwnPropertyDescriptor.enumerable,
            };
            /*
                if the source has an Accessor property copy over the accessor functions (get and set)
                data properties has writable attribute where as accessor property don't
                REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#properties
            */

            if (hasOwnProperty(sourceOwnPropertyDescriptor, "writable")) {
                descriptors.writable = sourceOwnPropertyDescriptor.writable;
                descriptors.value = sourceOwnPropertyDescriptor.value;
            } else {
                if (sourceOwnPropertyDescriptor.get) {
                    descriptors.get =
                        sourceOwnPropertyDescriptor.get.bind(dest);
                }
                if (sourceOwnPropertyDescriptor.set) {
                    descriptors.set =
                        sourceOwnPropertyDescriptor.set.bind(dest);
                }
            }
            Object.defineProperty(dest, prop, descriptors);
        },
    );
};

/**
 * Public: Extend target in place with all (own) properties from sources in-order. Thus, last source will
 *         override properties in previous sources. Define the properties as non enumerable.
 *
 * @param {object} target - The Object to extend
 * @param {object[]} sources - Objects to copy properties from.
 * @returns {object} the extended target
 */
module.exports.nonEnum = function extendNonEnum(target, ...sources) {
    return extendCommon(
        target,
        sources,
        function copyProperty(dest, source, prop) {
            Object.defineProperty(dest, prop, {
                value: source[prop],
                enumerable: false,
                configurable: true,
                writable: true,
            });
        },
    );
};

},{"@sinonjs/commons":46}],26:[function(require,module,exports){
"use strict";

module.exports = function toString() {
    let i, prop, thisValue;
    if (this.getCall && this.callCount) {
        i = this.callCount;

        while (i--) {
            thisValue = this.getCall(i).thisValue;

            // eslint-disable-next-line guard-for-in
            for (prop in thisValue) {
                try {
                    if (thisValue[prop] === this) {
                        return prop;
                    }
                } catch (e) {
                    // no-op - accessing props can throw an error, nothing to do here
                }
            }
        }
    }

    return this.displayName || "sinon fake";
};

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
"use strict";

/**
 * @typedef {object} PropertyDescriptor
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#description
 * @property {boolean} configurable defaults to false
 * @property {boolean} enumerable   defaults to false
 * @property {boolean} writable     defaults to false
 * @property {*} value defaults to undefined
 * @property {Function} get defaults to undefined
 * @property {Function} set defaults to undefined
 */

/*
 * The following type def is strictly speaking illegal in JSDoc, but the expression forms a
 * legal Typescript union type and is understood by Visual Studio and the IntelliJ
 * family of editors. The "TS" flavor of JSDoc is becoming the de-facto standard these
 * days for that reason (and the fact that JSDoc is essentially unmaintained)
 */

/**
 * @typedef {{isOwn: boolean} & PropertyDescriptor} SinonPropertyDescriptor
 * a slightly enriched property descriptor
 * @property {boolean} isOwn true if the descriptor is owned by this object, false if it comes from the prototype
 */

/**
 * Returns a slightly modified property descriptor that one can tell is from the object or the prototype
 *
 * @param {*} object
 * @param {string} property
 * @returns {SinonPropertyDescriptor}
 */
function getPropertyDescriptor(object, property) {
    let proto = object;
    let descriptor;
    const isOwn = Boolean(
        object && Object.getOwnPropertyDescriptor(object, property),
    );

    while (
        proto &&
        !(descriptor = Object.getOwnPropertyDescriptor(proto, property))
    ) {
        proto = Object.getPrototypeOf(proto);
    }

    if (descriptor) {
        descriptor.isOwn = isOwn;
    }

    return descriptor;
}

module.exports = getPropertyDescriptor;

},{}],29:[function(require,module,exports){
"use strict";

/**
 * Verify if an object is a ECMAScript Module
 *
 * As the exports from a module is immutable we cannot alter the exports
 * using spies or stubs. Let the consumer know this to avoid bug reports
 * on weird error messages.
 *
 * @param {object} object The object to examine
 * @returns {boolean} true when the object is a module
 */
module.exports = function (object) {
    return (
        object &&
        typeof Symbol !== "undefined" &&
        object[Symbol.toStringTag] === "Module" &&
        Object.isSealed(object)
    );
};

},{}],30:[function(require,module,exports){
"use strict";

/**
 * @param {*} object
 * @param {string} property
 * @returns {boolean} whether a prop exists in the prototype chain
 */
function isNonExistentProperty(object, property) {
    return Boolean(
        object && typeof property !== "undefined" && !(property in object),
    );
}

module.exports = isNonExistentProperty;

},{}],31:[function(require,module,exports){
"use strict";

const getPropertyDescriptor = require("./get-property-descriptor");

function isPropertyConfigurable(obj, propName) {
    const propertyDescriptor = getPropertyDescriptor(obj, propName);

    return propertyDescriptor ? propertyDescriptor.configurable : true;
}

module.exports = isPropertyConfigurable;

},{"./get-property-descriptor":28}],32:[function(require,module,exports){
"use strict";

function isRestorable(obj) {
    return (
        typeof obj === "function" &&
        typeof obj.restore === "function" &&
        obj.restore.sinon
    );
}

module.exports = isRestorable;

},{}],33:[function(require,module,exports){
"use strict";

const globalObject = require("@sinonjs/commons").global;
const getNextTick = require("./get-next-tick");

module.exports = getNextTick(globalObject.process, globalObject.setImmediate);

},{"./get-next-tick":27,"@sinonjs/commons":46}],34:[function(require,module,exports){
"use strict";

const sinonTypeSymbolProperty = Symbol("SinonType");

module.exports = {
    /**
     * Set the type of a Sinon object to make it possible to identify it later at runtime
     *
     * @param {object|Function} object  object/function to set the type on
     * @param {string} type the named type of the object/function
     */
    set(object, type) {
        Object.defineProperty(object, sinonTypeSymbolProperty, {
            value: type,
            configurable: false,
            enumerable: false,
        });
    },
    get(object) {
        return object && object[sinonTypeSymbolProperty];
    },
};

},{}],35:[function(require,module,exports){
"use strict";

const array = [null, "once", "twice", "thrice"];

module.exports = function timesInWords(count) {
    return array[count] || `${count || 0} times`;
};

},{}],36:[function(require,module,exports){
"use strict";

const functionName = require("@sinonjs/commons").functionName;

const getPropertyDescriptor = require("./get-property-descriptor");
const walk = require("./walk");

/**
 * A utility that allows traversing an object, applying mutating functions on the properties
 *
 * @param {Function} mutator called on each property
 * @param {object} object the object we are walking over
 * @param {Function} filter a predicate (boolean function) that will decide whether or not to apply the mutator to the current property
 * @returns {void} nothing
 */
function walkObject(mutator, object, filter) {
    let called = false;
    const name = functionName(mutator);

    if (!object) {
        throw new Error(
            `Trying to ${name} object but received ${String(object)}`,
        );
    }

    walk(object, function (prop, propOwner) {
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
                    mutator(object, prop);
                }
            } else {
                called = true;
                mutator(object, prop);
            }
        }
    });

    if (!called) {
        throw new Error(
            `Found no methods on object to which we could apply mutations`,
        );
    }

    return object;
}

module.exports = walkObject;

},{"./get-property-descriptor":28,"./walk":37,"@sinonjs/commons":46}],37:[function(require,module,exports){
"use strict";

const forEach = require("@sinonjs/commons").prototypes.array.forEach;

function walkInternal(obj, iterator, context, originalObj, seen) {
    let prop;
    const proto = Object.getPrototypeOf(obj);

    if (typeof Object.getOwnPropertyNames !== "function") {
        // We explicitly want to enumerate through all of the prototype's properties
        // in this case, therefore we deliberately leave out an own property check.
        /* eslint-disable-next-line guard-for-in */
        for (prop in obj) {
            iterator.call(context, obj[prop], prop, obj);
        }

        return;
    }

    forEach(Object.getOwnPropertyNames(obj), function (k) {
        if (seen[k] !== true) {
            seen[k] = true;
            const target =
                typeof Object.getOwnPropertyDescriptor(obj, k).get ===
                "function"
                    ? originalObj
                    : obj;
            iterator.call(context, k, target);
        }
    });

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

},{"@sinonjs/commons":46}],38:[function(require,module,exports){
"use strict";

// eslint-disable-next-line no-empty-function
const noop = () => {};
const getPropertyDescriptor = require("./get-property-descriptor");
const extend = require("./extend");
const sinonType = require("./sinon-type");
const hasOwnProperty =
    require("@sinonjs/commons").prototypes.object.hasOwnProperty;
const valueToString = require("@sinonjs/commons").valueToString;
const push = require("@sinonjs/commons").prototypes.array.push;

function isFunction(obj) {
    return (
        typeof obj === "function" ||
        Boolean(obj && obj.constructor && obj.call && obj.apply)
    );
}

function mirrorProperties(target, source) {
    for (const prop in source) {
        if (!hasOwnProperty(target, prop)) {
            target[prop] = source[prop];
        }
    }
}

function getAccessor(object, property, method) {
    const accessors = ["get", "set"];
    const descriptor = getPropertyDescriptor(object, property);

    for (let i = 0; i < accessors.length; i++) {
        if (
            descriptor[accessors[i]] &&
            descriptor[accessors[i]].name === method.name
        ) {
            return accessors[i];
        }
    }
    return null;
}

// Cheap way to detect if we have ES5 support.
const hasES5Support = "keys" in Object;

module.exports = function wrapMethod(object, property, method) {
    if (!object) {
        throw new TypeError("Should wrap property of object");
    }

    if (typeof method !== "function" && typeof method !== "object") {
        throw new TypeError(
            "Method wrapper should be a function or a property descriptor",
        );
    }

    function checkWrappedMethod(wrappedMethod) {
        let error;

        if (!isFunction(wrappedMethod)) {
            error = new TypeError(
                `Attempted to wrap ${typeof wrappedMethod} property ${valueToString(
                    property,
                )} as function`,
            );
        } else if (wrappedMethod.restore && wrappedMethod.restore.sinon) {
            error = new TypeError(
                `Attempted to wrap ${valueToString(
                    property,
                )} which is already wrapped`,
            );
        } else if (wrappedMethod.calledBefore) {
            const verb = wrappedMethod.returns ? "stubbed" : "spied on";
            error = new TypeError(
                `Attempted to wrap ${valueToString(
                    property,
                )} which is already ${verb}`,
            );
        }

        if (error) {
            if (wrappedMethod && wrappedMethod.stackTraceError) {
                error.stack += `\n--------------\n${wrappedMethod.stackTraceError.stack}`;
            }
            throw error;
        }
    }

    let error, wrappedMethod, i, wrappedMethodDesc, target, accessor;

    const wrappedMethods = [];

    function simplePropertyAssignment() {
        wrappedMethod = object[property];
        checkWrappedMethod(wrappedMethod);
        object[property] = method;
        method.displayName = property;
    }

    // Firefox has a problem when using hasOwn.call on objects from other frames.
    const owned = object.hasOwnProperty
        ? object.hasOwnProperty(property) // eslint-disable-line @sinonjs/no-prototype-methods/no-prototype-methods
        : hasOwnProperty(object, property);

    if (hasES5Support) {
        const methodDesc =
            typeof method === "function" ? { value: method } : method;
        wrappedMethodDesc = getPropertyDescriptor(object, property);

        if (!wrappedMethodDesc) {
            error = new TypeError(
                `Attempted to wrap ${typeof wrappedMethod} property ${property} as function`,
            );
        } else if (
            wrappedMethodDesc.restore &&
            wrappedMethodDesc.restore.sinon
        ) {
            error = new TypeError(
                `Attempted to wrap ${property} which is already wrapped`,
            );
        }
        if (error) {
            if (wrappedMethodDesc && wrappedMethodDesc.stackTraceError) {
                error.stack += `\n--------------\n${wrappedMethodDesc.stackTraceError.stack}`;
            }
            throw error;
        }

        const types = Object.keys(methodDesc);
        for (i = 0; i < types.length; i++) {
            wrappedMethod = wrappedMethodDesc[types[i]];
            checkWrappedMethod(wrappedMethod);
            push(wrappedMethods, wrappedMethod);
        }

        mirrorProperties(methodDesc, wrappedMethodDesc);
        for (i = 0; i < types.length; i++) {
            mirrorProperties(methodDesc[types[i]], wrappedMethodDesc[types[i]]);
        }

        // you are not allowed to flip the configurable prop on an
        // existing descriptor to anything but false (#2514)
        if (!owned) {
            methodDesc.configurable = true;
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

    extendObjectWithWrappedMethods();

    function extendObjectWithWrappedMethods() {
        for (i = 0; i < wrappedMethods.length; i++) {
            accessor = getAccessor(object, property, wrappedMethods[i]);
            target = accessor ? method[accessor] : method;
            extend.nonEnum(target, {
                displayName: property,
                wrappedMethod: wrappedMethods[i],

                // Set up an Error object for a stack trace which can be used later to find what line of
                // code the original method was created on.
                stackTraceError: new Error("Stack Trace for original"),

                restore: restore,
            });

            target.restore.sinon = true;
            if (!hasES5Support) {
                mirrorProperties(target, wrappedMethod);
            }
        }
    }

    function restore() {
        accessor = getAccessor(object, property, this.wrappedMethod);
        let descriptor;
        // For prototype properties try to reset by delete first.
        // If this fails (ex: localStorage on mobile safari) then force a reset
        // via direct assignment.
        if (accessor) {
            if (!owned) {
                try {
                    // In some cases `delete` may throw an error
                    delete object[property][accessor];
                } catch (e) {} // eslint-disable-line no-empty
                // For native code functions `delete` fails without throwing an error
                // on Chrome < 43, PhantomJS, etc.
            } else if (hasES5Support) {
                descriptor = getPropertyDescriptor(object, property);
                descriptor[accessor] = wrappedMethodDesc[accessor];
                Object.defineProperty(object, property, descriptor);
            }

            if (hasES5Support) {
                descriptor = getPropertyDescriptor(object, property);
                if (descriptor && descriptor.value === target) {
                    object[property][accessor] = this.wrappedMethod;
                }
            } else {
                // Use strict equality comparison to check failures then force a reset
                // via direct assignment.
                if (object[property][accessor] === target) {
                    object[property][accessor] = this.wrappedMethod;
                }
            }
        } else {
            if (!owned) {
                try {
                    delete object[property];
                } catch (e) {} // eslint-disable-line no-empty
            } else if (hasES5Support) {
                Object.defineProperty(object, property, wrappedMethodDesc);
            }

            if (hasES5Support) {
                descriptor = getPropertyDescriptor(object, property);
                if (descriptor && descriptor.value === target) {
                    object[property] = this.wrappedMethod;
                }
            } else {
                if (object[property] === target) {
                    object[property] = this.wrappedMethod;
                }
            }
        }
        if (sinonType.get(object) === "stub-instance") {
            // this is simply to avoid errors after restoring if something should
            // traverse the object in a cleanup phase, ref #2477
            object[property] = noop;
        }
    }

    return method;
};

},{"./extend":25,"./get-property-descriptor":28,"./sinon-type":34,"@sinonjs/commons":46}],39:[function(require,module,exports){
"use strict";

const extend = require("./core/extend");
const FakeTimers = require("@sinonjs/fake-timers");
const globalObject = require("@sinonjs/commons").global;

/**
 *
 * @param config
 * @param globalCtx
 *
 * @returns {object} the clock, after installing it on the global context, if given
 */
function createClock(config, globalCtx) {
    let FakeTimersCtx = FakeTimers;
    if (globalCtx !== null && typeof globalCtx === "object") {
        FakeTimersCtx = FakeTimers.withGlobal(globalCtx);
    }
    const clock = FakeTimersCtx.install(config);
    clock.restore = clock.uninstall;
    return clock;
}

/**
 *
 * @param obj
 * @param globalPropName
 */
function addIfDefined(obj, globalPropName) {
    const globalProp = globalObject[globalPropName];
    if (typeof globalProp !== "undefined") {
        obj[globalPropName] = globalProp;
    }
}

/**
 * @param {number|Date|object} dateOrConfig The unix epoch value to install with (default 0)
 * @returns {object} Returns a lolex clock instance
 */
exports.useFakeTimers = function (dateOrConfig) {
    const hasArguments = typeof dateOrConfig !== "undefined";
    const argumentIsDateLike =
        (typeof dateOrConfig === "number" || dateOrConfig instanceof Date) &&
        arguments.length === 1;
    const argumentIsObject =
        dateOrConfig !== null &&
        typeof dateOrConfig === "object" &&
        arguments.length === 1;

    if (!hasArguments) {
        return createClock({
            now: 0,
        });
    }

    if (argumentIsDateLike) {
        return createClock({
            now: dateOrConfig,
        });
    }

    if (argumentIsObject) {
        const config = extend.nonEnum({}, dateOrConfig);
        const globalCtx = config.global;
        delete config.global;
        return createClock(config, globalCtx);
    }

    throw new TypeError(
        "useFakeTimers expected epoch or config object. See https://github.com/sinonjs/sinon",
    );
};

exports.clock = {
    create: function (now) {
        return FakeTimers.createClock(now);
    },
};

const timers = {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    Date: Date,
};
addIfDefined(timers, "setImmediate");
addIfDefined(timers, "clearImmediate");

exports.timers = timers;

},{"./core/extend":25,"@sinonjs/commons":46,"@sinonjs/fake-timers":59}],40:[function(require,module,exports){
"use strict";

var every = require("./prototypes/array").every;

/**
 * @private
 */
function hasCallsLeft(callMap, spy) {
    if (callMap[spy.id] === undefined) {
        callMap[spy.id] = 0;
    }

    return callMap[spy.id] < spy.callCount;
}

/**
 * @private
 */
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

/**
 * A Sinon proxy object (fake, spy, stub)
 * @typedef {object} SinonProxy
 * @property {Function} calledBefore - A method that determines if this proxy was called before another one
 * @property {string} id - Some id
 * @property {number} callCount - Number of times this proxy has been called
 */

/**
 * Returns true when the spies have been called in the order they were supplied in
 * @param  {SinonProxy[] | SinonProxy} spies An array of proxies, or several proxies as arguments
 * @returns {boolean} true when spies are called in order, false otherwise
 */
function calledInOrder(spies) {
    var callMap = {};
    // eslint-disable-next-line no-underscore-dangle
    var _spies = arguments.length > 1 ? arguments : spies;

    return every(_spies, checkAdjacentCalls.bind(null, callMap));
}

module.exports = calledInOrder;

},{"./prototypes/array":48}],41:[function(require,module,exports){
"use strict";

/**
 * Returns a display name for a value from a constructor
 * @param  {object} value A value to examine
 * @returns {(string|null)} A string or null
 */
function className(value) {
    const name = value.constructor && value.constructor.name;
    return name || null;
}

module.exports = className;

},{}],42:[function(require,module,exports){
/* eslint-disable no-console */
"use strict";

/**
 * Returns a function that will invoke the supplied function and print a
 * deprecation warning to the console each time it is called.
 * @param  {Function} func
 * @param  {string} msg
 * @returns {Function}
 */
exports.wrap = function (func, msg) {
    var wrapped = function () {
        exports.printWarning(msg);
        return func.apply(this, arguments);
    };
    if (func.prototype) {
        wrapped.prototype = func.prototype;
    }
    return wrapped;
};

/**
 * Returns a string which can be supplied to `wrap()` to notify the user that a
 * particular part of the sinon API has been deprecated.
 * @param  {string} packageName
 * @param  {string} funcName
 * @returns {string}
 */
exports.defaultMsg = function (packageName, funcName) {
    return `${packageName}.${funcName} is deprecated and will be removed from the public API in a future version of ${packageName}.`;
};

/**
 * Prints a warning on the console, when it exists
 * @param  {string} msg
 * @returns {undefined}
 */
exports.printWarning = function (msg) {
    /* istanbul ignore next */
    if (typeof process === "object" && process.emitWarning) {
        // Emit Warnings in Node
        process.emitWarning(msg);
    } else if (console.info) {
        console.info(msg);
    } else {
        console.log(msg);
    }
};

},{}],43:[function(require,module,exports){
"use strict";

/**
 * Returns true when fn returns true for all members of obj.
 * This is an every implementation that works for all iterables
 * @param  {object}   obj
 * @param  {Function} fn
 * @returns {boolean}
 */
module.exports = function every(obj, fn) {
    var pass = true;

    try {
        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
        obj.forEach(function () {
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

},{}],44:[function(require,module,exports){
"use strict";

/**
 * Returns a display name for a function
 * @param  {Function} func
 * @returns {string}
 */
module.exports = function functionName(func) {
    if (!func) {
        return "";
    }

    try {
        return (
            func.displayName ||
            func.name ||
            // Use function decomposition as a last resort to get function
            // name. Does not rely on function decomposition to work - if it
            // doesn't debugging will be slightly less informative
            // (i.e. toString will say 'spy' rather than 'myFunc').
            (String(func).match(/function ([^\s(]+)/) || [])[1]
        );
    } catch (e) {
        // Stringify may fail and we might get an exception, as a last-last
        // resort fall back to empty string.
        return "";
    }
};

},{}],45:[function(require,module,exports){
"use strict";

/**
 * A reference to the global object
 * @type {object} globalObject
 */
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

},{}],46:[function(require,module,exports){
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
    valueToString: require("./value-to-string"),
};

},{"./called-in-order":40,"./class-name":41,"./deprecated":42,"./every":43,"./function-name":44,"./global":45,"./order-by-first-call":47,"./prototypes":51,"./type-of":57,"./value-to-string":58}],47:[function(require,module,exports){
"use strict";

var sort = require("./prototypes/array").sort;
var slice = require("./prototypes/array").slice;

/**
 * @private
 */
function comparator(a, b) {
    // uuid, won't ever be equal
    var aCall = a.getCall(0);
    var bCall = b.getCall(0);
    var aId = (aCall && aCall.callId) || -1;
    var bId = (bCall && bCall.callId) || -1;

    return aId < bId ? -1 : 1;
}

/**
 * A Sinon proxy object (fake, spy, stub)
 * @typedef {object} SinonProxy
 * @property {Function} getCall - A method that can return the first call
 */

/**
 * Sorts an array of SinonProxy instances (fake, spy, stub) by their first call
 * @param  {SinonProxy[] | SinonProxy} spies
 * @returns {SinonProxy[]}
 */
function orderByFirstCall(spies) {
    return sort(slice(spies), comparator);
}

module.exports = orderByFirstCall;

},{"./prototypes/array":48}],48:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype-methods");

module.exports = copyPrototype(Array.prototype);

},{"./copy-prototype-methods":49}],49:[function(require,module,exports){
"use strict";

var call = Function.call;
var throwsOnProto = require("./throws-on-proto");

var disallowedProperties = [
    // ignore size because it throws from Map
    "size",
    "caller",
    "callee",
    "arguments",
];

// This branch is covered when tests are run with `--disable-proto=throw`,
// however we can test both branches at the same time, so this is ignored
/* istanbul ignore next */
if (throwsOnProto) {
    disallowedProperties.push("__proto__");
}

module.exports = function copyPrototypeMethods(prototype) {
    // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
    return Object.getOwnPropertyNames(prototype).reduce(function (
        result,
        name
    ) {
        if (disallowedProperties.includes(name)) {
            return result;
        }

        if (typeof prototype[name] !== "function") {
            return result;
        }

        result[name] = call.bind(prototype[name]);

        return result;
    },
    Object.create(null));
};

},{"./throws-on-proto":56}],50:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype-methods");

module.exports = copyPrototype(Function.prototype);

},{"./copy-prototype-methods":49}],51:[function(require,module,exports){
"use strict";

module.exports = {
    array: require("./array"),
    function: require("./function"),
    map: require("./map"),
    object: require("./object"),
    set: require("./set"),
    string: require("./string"),
};

},{"./array":48,"./function":50,"./map":52,"./object":53,"./set":54,"./string":55}],52:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype-methods");

module.exports = copyPrototype(Map.prototype);

},{"./copy-prototype-methods":49}],53:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype-methods");

module.exports = copyPrototype(Object.prototype);

},{"./copy-prototype-methods":49}],54:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype-methods");

module.exports = copyPrototype(Set.prototype);

},{"./copy-prototype-methods":49}],55:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype-methods");

module.exports = copyPrototype(String.prototype);

},{"./copy-prototype-methods":49}],56:[function(require,module,exports){
"use strict";

/**
 * Is true when the environment causes an error to be thrown for accessing the
 * __proto__ property.
 * This is necessary in order to support `node --disable-proto=throw`.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
 * @type {boolean}
 */
let throwsOnProto;
try {
    const object = {};
    // eslint-disable-next-line no-proto, no-unused-expressions
    object.__proto__;
    throwsOnProto = false;
} catch (_) {
    // This branch is covered when tests are run with `--disable-proto=throw`,
    // however we can test both branches at the same time, so this is ignored
    /* istanbul ignore next */
    throwsOnProto = true;
}

module.exports = throwsOnProto;

},{}],57:[function(require,module,exports){
"use strict";

var type = require("type-detect");

/**
 * Returns the lower-case result of running type from type-detect on the value
 * @param  {*} value
 * @returns {string}
 */
module.exports = function typeOf(value) {
    return type(value).toLowerCase();
};

},{"type-detect":94}],58:[function(require,module,exports){
"use strict";

/**
 * Returns a string representation of the value
 * @param  {*} value
 * @returns {string}
 */
function valueToString(value) {
    if (value && value.toString) {
        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
        return value.toString();
    }
    return String(value);
}

module.exports = valueToString;

},{}],59:[function(require,module,exports){
"use strict";

const globalObject = require("@sinonjs/commons").global;
let timersModule, timersPromisesModule;
if (typeof require === "function" && typeof module === "object") {
    try {
        timersModule = require("timers");
    } catch (e) {
        // ignored
    }
    try {
        timersPromisesModule = require("timers/promises");
    } catch (e) {
        // ignored
    }
}

/**
 * @typedef {object} IdleDeadline
 * @property {boolean} didTimeout - whether or not the callback was called before reaching the optional timeout
 * @property {function():number} timeRemaining - a floating-point value providing an estimate of the number of milliseconds remaining in the current idle period
 */

/**
 * Queues a function to be called during a browser's idle periods
 *
 * @callback RequestIdleCallback
 * @param {function(IdleDeadline)} callback
 * @param {{timeout: number}} options - an options object
 * @returns {number} the id
 */

/**
 * @callback NextTick
 * @param {VoidVarArgsFunc} callback - the callback to run
 * @param {...*} args - optional arguments to call the callback with
 * @returns {void}
 */

/**
 * @callback SetImmediate
 * @param {VoidVarArgsFunc} callback - the callback to run
 * @param {...*} args - optional arguments to call the callback with
 * @returns {NodeImmediate}
 */

/**
 * @callback VoidVarArgsFunc
 * @param {...*} callback - the callback to run
 * @returns {void}
 */

/**
 * @typedef RequestAnimationFrame
 * @property {function(number):void} requestAnimationFrame
 * @returns {number} - the id
 */

/**
 * @typedef Performance
 * @property {function(): number} now
 */

/* eslint-disable jsdoc/require-property-description */
/**
 * @typedef {object} Clock
 * @property {number} now - the current time
 * @property {Date} Date - the Date constructor
 * @property {number} loopLimit - the maximum number of timers before assuming an infinite loop
 * @property {RequestIdleCallback} requestIdleCallback
 * @property {function(number):void} cancelIdleCallback
 * @property {setTimeout} setTimeout
 * @property {clearTimeout} clearTimeout
 * @property {NextTick} nextTick
 * @property {queueMicrotask} queueMicrotask
 * @property {setInterval} setInterval
 * @property {clearInterval} clearInterval
 * @property {SetImmediate} setImmediate
 * @property {function(NodeImmediate):void} clearImmediate
 * @property {function():number} countTimers
 * @property {RequestAnimationFrame} requestAnimationFrame
 * @property {function(number):void} cancelAnimationFrame
 * @property {function():void} runMicrotasks
 * @property {function(string | number): number} tick
 * @property {function(string | number): Promise<number>} tickAsync
 * @property {function(): number} next
 * @property {function(): Promise<number>} nextAsync
 * @property {function(): number} runAll
 * @property {function(): number} runToFrame
 * @property {function(): Promise<number>} runAllAsync
 * @property {function(): number} runToLast
 * @property {function(): Promise<number>} runToLastAsync
 * @property {function(): void} reset
 * @property {function(number | Date): void} setSystemTime
 * @property {function(number): void} jump
 * @property {Performance} performance
 * @property {function(number[]): number[]} hrtime - process.hrtime (legacy)
 * @property {function(): void} uninstall Uninstall the clock.
 * @property {Function[]} methods - the methods that are faked
 * @property {boolean} [shouldClearNativeTimers] inherited from config
 * @property {{methodName:string, original:any}[] | undefined} timersModuleMethods
 * @property {{methodName:string, original:any}[] | undefined} timersPromisesModuleMethods
 * @property {Map<function(): void, AbortSignal>} abortListenerMap
 */
/* eslint-enable jsdoc/require-property-description */

/**
 * Configuration object for the `install` method.
 *
 * @typedef {object} Config
 * @property {number|Date} [now] a number (in milliseconds) or a Date object (default epoch)
 * @property {string[]} [toFake] names of the methods that should be faked.
 * @property {number} [loopLimit] the maximum number of timers that will be run when calling runAll()
 * @property {boolean} [shouldAdvanceTime] tells FakeTimers to increment mocked time automatically (default false)
 * @property {number} [advanceTimeDelta] increment mocked time every <<advanceTimeDelta>> ms (default: 20ms)
 * @property {boolean} [shouldClearNativeTimers] forwards clear timer calls to native functions if they are not fakes (default: false)
 * @property {boolean} [ignoreMissingTimers] default is false, meaning asking to fake timers that are not present will throw an error
 */

/* eslint-disable jsdoc/require-property-description */
/**
 * The internal structure to describe a scheduled fake timer
 *
 * @typedef {object} Timer
 * @property {Function} func
 * @property {*[]} args
 * @property {number} delay
 * @property {number} callAt
 * @property {number} createdAt
 * @property {boolean} immediate
 * @property {number} id
 * @property {Error} [error]
 */

/**
 * A Node timer
 *
 * @typedef {object} NodeImmediate
 * @property {function(): boolean} hasRef
 * @property {function(): NodeImmediate} ref
 * @property {function(): NodeImmediate} unref
 */
/* eslint-enable jsdoc/require-property-description */

/* eslint-disable complexity */

/**
 * Mocks available features in the specified global namespace.
 *
 * @param {*} _global Namespace to mock (e.g. `window`)
 * @returns {FakeTimers}
 */
function withGlobal(_global) {
    const maxTimeout = Math.pow(2, 31) - 1; //see https://heycam.github.io/webidl/#abstract-opdef-converttoint
    const idCounterStart = 1e12; // arbitrarily large number to avoid collisions with native timer IDs
    const NOOP = function () {
        return undefined;
    };
    const NOOP_ARRAY = function () {
        return [];
    };
    const isPresent = {};
    let timeoutResult,
        addTimerReturnsObject = false;

    if (_global.setTimeout) {
        isPresent.setTimeout = true;
        timeoutResult = _global.setTimeout(NOOP, 0);
        addTimerReturnsObject = typeof timeoutResult === "object";
    }
    isPresent.clearTimeout = Boolean(_global.clearTimeout);
    isPresent.setInterval = Boolean(_global.setInterval);
    isPresent.clearInterval = Boolean(_global.clearInterval);
    isPresent.hrtime =
        _global.process && typeof _global.process.hrtime === "function";
    isPresent.hrtimeBigint =
        isPresent.hrtime && typeof _global.process.hrtime.bigint === "function";
    isPresent.nextTick =
        _global.process && typeof _global.process.nextTick === "function";
    const utilPromisify = _global.process && require("util").promisify;
    isPresent.performance =
        _global.performance && typeof _global.performance.now === "function";
    const hasPerformancePrototype =
        _global.Performance &&
        (typeof _global.Performance).match(/^(function|object)$/);
    const hasPerformanceConstructorPrototype =
        _global.performance &&
        _global.performance.constructor &&
        _global.performance.constructor.prototype;
    isPresent.queueMicrotask = _global.hasOwnProperty("queueMicrotask");
    isPresent.requestAnimationFrame =
        _global.requestAnimationFrame &&
        typeof _global.requestAnimationFrame === "function";
    isPresent.cancelAnimationFrame =
        _global.cancelAnimationFrame &&
        typeof _global.cancelAnimationFrame === "function";
    isPresent.requestIdleCallback =
        _global.requestIdleCallback &&
        typeof _global.requestIdleCallback === "function";
    isPresent.cancelIdleCallbackPresent =
        _global.cancelIdleCallback &&
        typeof _global.cancelIdleCallback === "function";
    isPresent.setImmediate =
        _global.setImmediate && typeof _global.setImmediate === "function";
    isPresent.clearImmediate =
        _global.clearImmediate && typeof _global.clearImmediate === "function";
    isPresent.Intl = _global.Intl && typeof _global.Intl === "object";

    if (_global.clearTimeout) {
        _global.clearTimeout(timeoutResult);
    }

    const NativeDate = _global.Date;
    const NativeIntl = _global.Intl;
    let uniqueTimerId = idCounterStart;

    if (NativeDate === undefined) {
        throw new Error(
            "The global scope doesn't have a `Date` object" +
                " (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)",
        );
    }
    isPresent.Date = true;

    /**
     * The PerformanceEntry object encapsulates a single performance metric
     * that is part of the browser's performance timeline.
     *
     * This is an object returned by the `mark` and `measure` methods on the Performance prototype
     */
    class FakePerformanceEntry {
        constructor(name, entryType, startTime, duration) {
            this.name = name;
            this.entryType = entryType;
            this.startTime = startTime;
            this.duration = duration;
        }

        toJSON() {
            return JSON.stringify({ ...this });
        }
    }

    /**
     * @param {number} num
     * @returns {boolean}
     */
    function isNumberFinite(num) {
        if (Number.isFinite) {
            return Number.isFinite(num);
        }

        return isFinite(num);
    }

    let isNearInfiniteLimit = false;

    /**
     * @param {Clock} clock
     * @param {number} i
     */
    function checkIsNearInfiniteLimit(clock, i) {
        if (clock.loopLimit && i === clock.loopLimit - 1) {
            isNearInfiniteLimit = true;
        }
    }

    /**
     *
     */
    function resetIsNearInfiniteLimit() {
        isNearInfiniteLimit = false;
    }

    /**
     * Parse strings like "01:10:00" (meaning 1 hour, 10 minutes, 0 seconds) into
     * number of milliseconds. This is used to support human-readable strings passed
     * to clock.tick()
     *
     * @param {string} str
     * @returns {number}
     */
    function parseTime(str) {
        if (!str) {
            return 0;
        }

        const strings = str.split(":");
        const l = strings.length;
        let i = l;
        let ms = 0;
        let parsed;

        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
            throw new Error(
                "tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits",
            );
        }

        while (i--) {
            parsed = parseInt(strings[i], 10);

            if (parsed >= 60) {
                throw new Error(`Invalid time ${str}`);
            }

            ms += parsed * Math.pow(60, l - i - 1);
        }

        return ms * 1000;
    }

    /**
     * Get the decimal part of the millisecond value as nanoseconds
     *
     * @param {number} msFloat the number of milliseconds
     * @returns {number} an integer number of nanoseconds in the range [0,1e6)
     *
     * Example: nanoRemainer(123.456789) -> 456789
     */
    function nanoRemainder(msFloat) {
        const modulo = 1e6;
        const remainder = (msFloat * 1e6) % modulo;
        const positiveRemainder =
            remainder < 0 ? remainder + modulo : remainder;

        return Math.floor(positiveRemainder);
    }

    /**
     * Used to grok the `now` parameter to createClock.
     *
     * @param {Date|number} epoch the system time
     * @returns {number}
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

    /**
     * @param {number} from
     * @param {number} to
     * @param {Timer} timer
     * @returns {boolean}
     */
    function inRange(from, to, timer) {
        return timer && timer.callAt >= from && timer.callAt <= to;
    }

    /**
     * @param {Clock} clock
     * @param {Timer} job
     */
    function getInfiniteLoopError(clock, job) {
        const infiniteLoopError = new Error(
            `Aborting after running ${clock.loopLimit} timers, assuming an infinite loop!`,
        );

        if (!job.error) {
            return infiniteLoopError;
        }

        // pattern never matched in Node
        const computedTargetPattern = /target\.*[<|(|[].*?[>|\]|)]\s*/;
        let clockMethodPattern = new RegExp(
            String(Object.keys(clock).join("|")),
        );

        if (addTimerReturnsObject) {
            // node.js environment
            clockMethodPattern = new RegExp(
                `\\s+at (Object\\.)?(?:${Object.keys(clock).join("|")})\\s+`,
            );
        }

        let matchedLineIndex = -1;
        job.error.stack.split("\n").some(function (line, i) {
            // If we've matched a computed target line (e.g. setTimeout) then we
            // don't need to look any further. Return true to stop iterating.
            const matchedComputedTarget = line.match(computedTargetPattern);
            /* istanbul ignore if */
            if (matchedComputedTarget) {
                matchedLineIndex = i;
                return true;
            }

            // If we've matched a clock method line, then there may still be
            // others further down the trace. Return false to keep iterating.
            const matchedClockMethod = line.match(clockMethodPattern);
            if (matchedClockMethod) {
                matchedLineIndex = i;
                return false;
            }

            // If we haven't matched anything on this line, but we matched
            // previously and set the matched line index, then we can stop.
            // If we haven't matched previously, then we should keep iterating.
            return matchedLineIndex >= 0;
        });

        const stack = `${infiniteLoopError}\n${job.type || "Microtask"} - ${
            job.func.name || "anonymous"
        }\n${job.error.stack
            .split("\n")
            .slice(matchedLineIndex + 1)
            .join("\n")}`;

        try {
            Object.defineProperty(infiniteLoopError, "stack", {
                value: stack,
            });
        } catch (e) {
            // noop
        }

        return infiniteLoopError;
    }

    //eslint-disable-next-line jsdoc/require-jsdoc
    function createDate() {
        class ClockDate extends NativeDate {
            /**
             * @param {number} year
             * @param {number} month
             * @param {number} date
             * @param {number} hour
             * @param {number} minute
             * @param {number} second
             * @param {number} ms
             * @returns void
             */
            // eslint-disable-next-line no-unused-vars
            constructor(year, month, date, hour, minute, second, ms) {
                // Defensive and verbose to avoid potential harm in passing
                // explicit undefined when user does not pass argument
                if (arguments.length === 0) {
                    super(ClockDate.clock.now);
                } else {
                    super(...arguments);
                }

                // ensures identity checks using the constructor prop still works
                // this should have no other functional effect
                Object.defineProperty(this, "constructor", {
                    value: NativeDate,
                    enumerable: false,
                });
            }

            static [Symbol.hasInstance](instance) {
                return instance instanceof NativeDate;
            }
        }

        ClockDate.isFake = true;

        if (NativeDate.now) {
            ClockDate.now = function now() {
                return ClockDate.clock.now;
            };
        }

        if (NativeDate.toSource) {
            ClockDate.toSource = function toSource() {
                return NativeDate.toSource();
            };
        }

        ClockDate.toString = function toString() {
            return NativeDate.toString();
        };

        // noinspection UnnecessaryLocalVariableJS
        /**
         * A normal Class constructor cannot be called without `new`, but Date can, so we need
         * to wrap it in a Proxy in order to ensure this functionality of Date is kept intact
         *
         * @type {ClockDate}
         */
        const ClockDateProxy = new Proxy(ClockDate, {
            // handler for [[Call]] invocations (i.e. not using `new`)
            apply() {
                // the Date constructor called as a function, ref Ecma-262 Edition 5.1, section 15.9.2.
                // This remains so in the 10th edition of 2019 as well.
                if (this instanceof ClockDate) {
                    throw new TypeError(
                        "A Proxy should only capture `new` calls with the `construct` handler. This is not supposed to be possible, so check the logic.",
                    );
                }

                return new NativeDate(ClockDate.clock.now).toString();
            },
        });

        return ClockDateProxy;
    }

    /**
     * Mirror Intl by default on our fake implementation
     *
     * Most of the properties are the original native ones,
     * but we need to take control of those that have a
     * dependency on the current clock.
     *
     * @returns {object} the partly fake Intl implementation
     */
    function createIntl() {
        const ClockIntl = {};
        /*
         * All properties of Intl are non-enumerable, so we need
         * to do a bit of work to get them out.
         */
        Object.getOwnPropertyNames(NativeIntl).forEach(
            (property) => (ClockIntl[property] = NativeIntl[property]),
        );

        ClockIntl.DateTimeFormat = function (...args) {
            const realFormatter = new NativeIntl.DateTimeFormat(...args);
            const formatter = {};

            ["formatRange", "formatRangeToParts", "resolvedOptions"].forEach(
                (method) => {
                    formatter[method] =
                        realFormatter[method].bind(realFormatter);
                },
            );

            ["format", "formatToParts"].forEach((method) => {
                formatter[method] = function (date) {
                    return realFormatter[method](date || ClockIntl.clock.now);
                };
            });

            return formatter;
        };

        ClockIntl.DateTimeFormat.prototype = Object.create(
            NativeIntl.DateTimeFormat.prototype,
        );

        ClockIntl.DateTimeFormat.supportedLocalesOf =
            NativeIntl.DateTimeFormat.supportedLocalesOf;

        return ClockIntl;
    }

    //eslint-disable-next-line jsdoc/require-jsdoc
    function enqueueJob(clock, job) {
        // enqueues a microtick-deferred task - ecma262/#sec-enqueuejob
        if (!clock.jobs) {
            clock.jobs = [];
        }
        clock.jobs.push(job);
    }

    //eslint-disable-next-line jsdoc/require-jsdoc
    function runJobs(clock) {
        // runs all microtick-deferred tasks - ecma262/#sec-runjobs
        if (!clock.jobs) {
            return;
        }
        for (let i = 0; i < clock.jobs.length; i++) {
            const job = clock.jobs[i];
            job.func.apply(null, job.args);

            checkIsNearInfiniteLimit(clock, i);
            if (clock.loopLimit && i > clock.loopLimit) {
                throw getInfiniteLoopError(clock, job);
            }
        }
        resetIsNearInfiniteLimit();
        clock.jobs = [];
    }

    /**
     * @param {Clock} clock
     * @param {Timer} timer
     * @returns {number} id of the created timer
     */
    function addTimer(clock, timer) {
        if (timer.func === undefined) {
            throw new Error("Callback must be provided to timer calls");
        }

        if (addTimerReturnsObject) {
            // Node.js environment
            if (typeof timer.func !== "function") {
                throw new TypeError(
                    `[ERR_INVALID_CALLBACK]: Callback must be a function. Received ${
                        timer.func
                    } of type ${typeof timer.func}`,
                );
            }
        }

        if (isNearInfiniteLimit) {
            timer.error = new Error();
        }

        timer.type = timer.immediate ? "Immediate" : "Timeout";

        if (timer.hasOwnProperty("delay")) {
            if (typeof timer.delay !== "number") {
                timer.delay = parseInt(timer.delay, 10);
            }

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

        if (timer.hasOwnProperty("idleCallback")) {
            timer.type = "IdleCallback";
            timer.idleCallback = true;
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
            const res = {
                refed: true,
                ref: function () {
                    this.refed = true;
                    return res;
                },
                unref: function () {
                    this.refed = false;
                    return res;
                },
                hasRef: function () {
                    return this.refed;
                },
                refresh: function () {
                    timer.callAt =
                        clock.now +
                        (parseInt(timer.delay) || (clock.duringTick ? 1 : 0));

                    // it _might_ have been removed, but if not the assignment is perfectly fine
                    clock.timers[timer.id] = timer;

                    return res;
                },
                [Symbol.toPrimitive]: function () {
                    return timer.id;
                },
            };
            return res;
        }

        return timer.id;
    }

    /* eslint consistent-return: "off" */
    /**
     * Timer comparitor
     *
     * @param {Timer} a
     * @param {Timer} b
     * @returns {number}
     */
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

    /**
     * @param {Clock} clock
     * @param {number} from
     * @param {number} to
     * @returns {Timer}
     */
    function firstTimerInRange(clock, from, to) {
        const timers = clock.timers;
        let timer = null;
        let id, isInRange;

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

    /**
     * @param {Clock} clock
     * @returns {Timer}
     */
    function firstTimer(clock) {
        const timers = clock.timers;
        let timer = null;
        let id;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                if (!timer || compareTimers(timer, timers[id]) === 1) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    /**
     * @param {Clock} clock
     * @returns {Timer}
     */
    function lastTimer(clock) {
        const timers = clock.timers;
        let timer = null;
        let id;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                if (!timer || compareTimers(timer, timers[id]) === -1) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    /**
     * @param {Clock} clock
     * @param {Timer} timer
     */
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
            const eval2 = eval;
            (function () {
                eval2(timer.func);
            })();
        }
    }

    /**
     * Gets clear handler name for a given timer type
     *
     * @param {string} ttype
     */
    function getClearHandler(ttype) {
        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
            return `cancel${ttype}`;
        }
        return `clear${ttype}`;
    }

    /**
     * Gets schedule handler name for a given timer type
     *
     * @param {string} ttype
     */
    function getScheduleHandler(ttype) {
        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
            return `request${ttype}`;
        }
        return `set${ttype}`;
    }

    /**
     * Creates an anonymous function to warn only once
     */
    function createWarnOnce() {
        let calls = 0;
        return function (msg) {
            // eslint-disable-next-line
            !calls++ && console.warn(msg);
        };
    }
    const warnOnce = createWarnOnce();

    /**
     * @param {Clock} clock
     * @param {number} timerId
     * @param {string} ttype
     */
    function clearTimer(clock, timerId, ttype) {
        if (!timerId) {
            // null appears to be allowed in most browsers, and appears to be
            // relied upon by some libraries, like Bootstrap carousel
            return;
        }

        if (!clock.timers) {
            clock.timers = {};
        }

        // in Node, the ID is stored as the primitive value for `Timeout` objects
        // for `Immediate` objects, no ID exists, so it gets coerced to NaN
        const id = Number(timerId);

        if (Number.isNaN(id) || id < idCounterStart) {
            const handlerName = getClearHandler(ttype);

            if (clock.shouldClearNativeTimers === true) {
                const nativeHandler = clock[`_${handlerName}`];
                return typeof nativeHandler === "function"
                    ? nativeHandler(timerId)
                    : undefined;
            }
            warnOnce(
                `FakeTimers: ${handlerName} was invoked to clear a native timer instead of one created by this library.` +
                    "\nTo automatically clean-up native timers, use `shouldClearNativeTimers`.",
            );
        }

        if (clock.timers.hasOwnProperty(id)) {
            // check that the ID matches a timer of the correct type
            const timer = clock.timers[id];
            if (
                timer.type === ttype ||
                (timer.type === "Timeout" && ttype === "Interval") ||
                (timer.type === "Interval" && ttype === "Timeout")
            ) {
                delete clock.timers[id];
            } else {
                const clear = getClearHandler(ttype);
                const schedule = getScheduleHandler(timer.type);
                throw new Error(
                    `Cannot clear timer: timer created with ${schedule}() but cleared with ${clear}()`,
                );
            }
        }
    }

    /**
     * @param {Clock} clock
     * @param {Config} config
     * @returns {Timer[]}
     */
    function uninstall(clock, config) {
        let method, i, l;
        const installedHrTime = "_hrtime";
        const installedNextTick = "_nextTick";

        for (i = 0, l = clock.methods.length; i < l; i++) {
            method = clock.methods[i];
            if (method === "hrtime" && _global.process) {
                _global.process.hrtime = clock[installedHrTime];
            } else if (method === "nextTick" && _global.process) {
                _global.process.nextTick = clock[installedNextTick];
            } else if (method === "performance") {
                const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
                    clock,
                    `_${method}`,
                );
                if (
                    originalPerfDescriptor &&
                    originalPerfDescriptor.get &&
                    !originalPerfDescriptor.set
                ) {
                    Object.defineProperty(
                        _global,
                        method,
                        originalPerfDescriptor,
                    );
                } else if (originalPerfDescriptor.configurable) {
                    _global[method] = clock[`_${method}`];
                }
            } else {
                if (_global[method] && _global[method].hadOwnProperty) {
                    _global[method] = clock[`_${method}`];
                } else {
                    try {
                        delete _global[method];
                    } catch (ignore) {
                        /* eslint no-empty: "off" */
                    }
                }
            }
            if (clock.timersModuleMethods !== undefined) {
                for (let j = 0; j < clock.timersModuleMethods.length; j++) {
                    const entry = clock.timersModuleMethods[j];
                    timersModule[entry.methodName] = entry.original;
                }
            }
            if (clock.timersPromisesModuleMethods !== undefined) {
                for (
                    let j = 0;
                    j < clock.timersPromisesModuleMethods.length;
                    j++
                ) {
                    const entry = clock.timersPromisesModuleMethods[j];
                    timersPromisesModule[entry.methodName] = entry.original;
                }
            }
        }

        if (config.shouldAdvanceTime === true) {
            _global.clearInterval(clock.attachedInterval);
        }

        // Prevent multiple executions which will completely remove these props
        clock.methods = [];

        for (const [listener, signal] of clock.abortListenerMap.entries()) {
            signal.removeEventListener("abort", listener);
            clock.abortListenerMap.delete(listener);
        }

        // return pending timers, to enable checking what timers remained on uninstall
        if (!clock.timers) {
            return [];
        }
        return Object.keys(clock.timers).map(function mapper(key) {
            return clock.timers[key];
        });
    }

    /**
     * @param {object} target the target containing the method to replace
     * @param {string} method the keyname of the method on the target
     * @param {Clock} clock
     */
    function hijackMethod(target, method, clock) {
        clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(
            target,
            method,
        );
        clock[`_${method}`] = target[method];

        if (method === "Date") {
            target[method] = clock[method];
        } else if (method === "Intl") {
            target[method] = clock[method];
        } else if (method === "performance") {
            const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
                target,
                method,
            );
            // JSDOM has a read only performance field so we have to save/copy it differently
            if (
                originalPerfDescriptor &&
                originalPerfDescriptor.get &&
                !originalPerfDescriptor.set
            ) {
                Object.defineProperty(
                    clock,
                    `_${method}`,
                    originalPerfDescriptor,
                );

                const perfDescriptor = Object.getOwnPropertyDescriptor(
                    clock,
                    method,
                );
                Object.defineProperty(target, method, perfDescriptor);
            } else {
                target[method] = clock[method];
            }
        } else {
            target[method] = function () {
                return clock[method].apply(clock, arguments);
            };

            Object.defineProperties(
                target[method],
                Object.getOwnPropertyDescriptors(clock[method]),
            );
        }

        target[method].clock = clock;
    }

    /**
     * @param {Clock} clock
     * @param {number} advanceTimeDelta
     */
    function doIntervalTick(clock, advanceTimeDelta) {
        clock.tick(advanceTimeDelta);
    }

    /**
     * @typedef {object} Timers
     * @property {setTimeout} setTimeout
     * @property {clearTimeout} clearTimeout
     * @property {setInterval} setInterval
     * @property {clearInterval} clearInterval
     * @property {Date} Date
     * @property {Intl} Intl
     * @property {SetImmediate=} setImmediate
     * @property {function(NodeImmediate): void=} clearImmediate
     * @property {function(number[]):number[]=} hrtime
     * @property {NextTick=} nextTick
     * @property {Performance=} performance
     * @property {RequestAnimationFrame=} requestAnimationFrame
     * @property {boolean=} queueMicrotask
     * @property {function(number): void=} cancelAnimationFrame
     * @property {RequestIdleCallback=} requestIdleCallback
     * @property {function(number): void=} cancelIdleCallback
     */

    /** @type {Timers} */
    const timers = {
        setTimeout: _global.setTimeout,
        clearTimeout: _global.clearTimeout,
        setInterval: _global.setInterval,
        clearInterval: _global.clearInterval,
        Date: _global.Date,
    };

    if (isPresent.setImmediate) {
        timers.setImmediate = _global.setImmediate;
    }

    if (isPresent.clearImmediate) {
        timers.clearImmediate = _global.clearImmediate;
    }

    if (isPresent.hrtime) {
        timers.hrtime = _global.process.hrtime;
    }

    if (isPresent.nextTick) {
        timers.nextTick = _global.process.nextTick;
    }

    if (isPresent.performance) {
        timers.performance = _global.performance;
    }

    if (isPresent.requestAnimationFrame) {
        timers.requestAnimationFrame = _global.requestAnimationFrame;
    }

    if (isPresent.queueMicrotask) {
        timers.queueMicrotask = _global.queueMicrotask;
    }

    if (isPresent.cancelAnimationFrame) {
        timers.cancelAnimationFrame = _global.cancelAnimationFrame;
    }

    if (isPresent.requestIdleCallback) {
        timers.requestIdleCallback = _global.requestIdleCallback;
    }

    if (isPresent.cancelIdleCallback) {
        timers.cancelIdleCallback = _global.cancelIdleCallback;
    }

    if (isPresent.Intl) {
        timers.Intl = _global.Intl;
    }

    const originalSetTimeout = _global.setImmediate || _global.setTimeout;

    /**
     * @param {Date|number} [start] the system time - non-integer values are floored
     * @param {number} [loopLimit] maximum number of timers that will be run when calling runAll()
     * @returns {Clock}
     */
    function createClock(start, loopLimit) {
        // eslint-disable-next-line no-param-reassign
        start = Math.floor(getEpoch(start));
        // eslint-disable-next-line no-param-reassign
        loopLimit = loopLimit || 1000;
        let nanos = 0;
        const adjustedSystemTime = [0, 0]; // [millis, nanoremainder]

        const clock = {
            now: start,
            Date: createDate(),
            loopLimit: loopLimit,
        };

        clock.Date.clock = clock;

        //eslint-disable-next-line jsdoc/require-jsdoc
        function getTimeToNextFrame() {
            return 16 - ((clock.now - start) % 16);
        }

        //eslint-disable-next-line jsdoc/require-jsdoc
        function hrtime(prev) {
            const millisSinceStart = clock.now - adjustedSystemTime[0] - start;
            const secsSinceStart = Math.floor(millisSinceStart / 1000);
            const remainderInNanos =
                (millisSinceStart - secsSinceStart * 1e3) * 1e6 +
                nanos -
                adjustedSystemTime[1];

            if (Array.isArray(prev)) {
                if (prev[1] > 1e9) {
                    throw new TypeError(
                        "Number of nanoseconds can't exceed a billion",
                    );
                }

                const oldSecs = prev[0];
                let nanoDiff = remainderInNanos - prev[1];
                let secDiff = secsSinceStart - oldSecs;

                if (nanoDiff < 0) {
                    nanoDiff += 1e9;
                    secDiff -= 1;
                }

                return [secDiff, nanoDiff];
            }
            return [secsSinceStart, remainderInNanos];
        }

        /**
         * A high resolution timestamp in milliseconds.
         *
         * @typedef {number} DOMHighResTimeStamp
         */

        /**
         * performance.now()
         *
         * @returns {DOMHighResTimeStamp}
         */
        function fakePerformanceNow() {
            const hrt = hrtime();
            const millis = hrt[0] * 1000 + hrt[1] / 1e6;
            return millis;
        }

        if (isPresent.hrtimeBigint) {
            hrtime.bigint = function () {
                const parts = hrtime();
                return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]); // eslint-disable-line
            };
        }

        if (isPresent.Intl) {
            clock.Intl = createIntl();
            clock.Intl.clock = clock;
        }

        clock.requestIdleCallback = function requestIdleCallback(
            func,
            timeout,
        ) {
            let timeToNextIdlePeriod = 0;

            if (clock.countTimers() > 0) {
                timeToNextIdlePeriod = 50; // const for now
            }

            const result = addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay:
                    typeof timeout === "undefined"
                        ? timeToNextIdlePeriod
                        : Math.min(timeout, timeToNextIdlePeriod),
                idleCallback: true,
            });

            return Number(result);
        };

        clock.cancelIdleCallback = function cancelIdleCallback(timerId) {
            return clearTimer(clock, timerId, "IdleCallback");
        };

        clock.setTimeout = function setTimeout(func, timeout) {
            return addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay: timeout,
            });
        };
        if (typeof _global.Promise !== "undefined" && utilPromisify) {
            clock.setTimeout[utilPromisify.custom] =
                function promisifiedSetTimeout(timeout, arg) {
                    return new _global.Promise(function setTimeoutExecutor(
                        resolve,
                    ) {
                        addTimer(clock, {
                            func: resolve,
                            args: [arg],
                            delay: timeout,
                        });
                    });
                };
        }

        clock.clearTimeout = function clearTimeout(timerId) {
            return clearTimer(clock, timerId, "Timeout");
        };

        clock.nextTick = function nextTick(func) {
            return enqueueJob(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 1),
                error: isNearInfiniteLimit ? new Error() : null,
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
                interval: timeout,
            });
        };

        clock.clearInterval = function clearInterval(timerId) {
            return clearTimer(clock, timerId, "Interval");
        };

        if (isPresent.setImmediate) {
            clock.setImmediate = function setImmediate(func) {
                return addTimer(clock, {
                    func: func,
                    args: Array.prototype.slice.call(arguments, 1),
                    immediate: true,
                });
            };

            if (typeof _global.Promise !== "undefined" && utilPromisify) {
                clock.setImmediate[utilPromisify.custom] =
                    function promisifiedSetImmediate(arg) {
                        return new _global.Promise(
                            function setImmediateExecutor(resolve) {
                                addTimer(clock, {
                                    func: resolve,
                                    args: [arg],
                                    immediate: true,
                                });
                            },
                        );
                    };
            }

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
            const result = addTimer(clock, {
                func: func,
                delay: getTimeToNextFrame(),
                get args() {
                    return [fakePerformanceNow()];
                },
                animation: true,
            });

            return Number(result);
        };

        clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
            return clearTimer(clock, timerId, "AnimationFrame");
        };

        clock.runMicrotasks = function runMicrotasks() {
            runJobs(clock);
        };

        /**
         * @param {number|string} tickValue milliseconds or a string parseable by parseTime
         * @param {boolean} isAsync
         * @param {Function} resolve
         * @param {Function} reject
         * @returns {number|undefined} will return the new `now` value or nothing for async
         */
        function doTick(tickValue, isAsync, resolve, reject) {
            const msFloat =
                typeof tickValue === "number"
                    ? tickValue
                    : parseTime(tickValue);
            const ms = Math.floor(msFloat);
            const remainder = nanoRemainder(msFloat);
            let nanosTotal = nanos + remainder;
            let tickTo = clock.now + ms;

            if (msFloat < 0) {
                throw new TypeError("Negative ticks are not supported");
            }

            // adjust for positive overflow
            if (nanosTotal >= 1e6) {
                tickTo += 1;
                nanosTotal -= 1e6;
            }

            nanos = nanosTotal;
            let tickFrom = clock.now;
            let previous = clock.now;
            // ESLint fails to detect this correctly
            /* eslint-disable prefer-const */
            let timer,
                firstException,
                oldNow,
                nextPromiseTick,
                compensationCheck,
                postTimerCall;
            /* eslint-enable prefer-const */

            clock.duringTick = true;

            // perform microtasks
            oldNow = clock.now;
            runJobs(clock);
            if (oldNow !== clock.now) {
                // compensate for any setSystemTime() call during microtask callback
                tickFrom += clock.now - oldNow;
                tickTo += clock.now - oldNow;
            }

            //eslint-disable-next-line jsdoc/require-jsdoc
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
                function () {
                    try {
                        compensationCheck();
                        postTimerCall();
                        doTickInner();
                    } catch (e) {
                        reject(e);
                    }
                };

            compensationCheck = function () {
                // compensate for any setSystemTime() call during timer callback
                if (oldNow !== clock.now) {
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                    previous += clock.now - oldNow;
                }
            };

            postTimerCall = function () {
                timer = firstTimerInRange(clock, previous, tickTo);
                previous = tickFrom;
            };

            return doTickInner();
        }

        /**
         * @param {string|number} tickValue number of milliseconds or a human-readable value like "01:11:15"
         * @returns {number} will return the new `now` value
         */
        clock.tick = function tick(tickValue) {
            return doTick(tickValue, false);
        };

        if (typeof _global.Promise !== "undefined") {
            /**
             * @param {string|number} tickValue number of milliseconds or a human-readable value like "01:11:15"
             * @returns {Promise}
             */
            clock.tickAsync = function tickAsync(tickValue) {
                return new _global.Promise(function (resolve, reject) {
                    originalSetTimeout(function () {
                        try {
                            doTick(tickValue, true, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.next = function next() {
            runJobs(clock);
            const timer = firstTimer(clock);
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
                return new _global.Promise(function (resolve, reject) {
                    originalSetTimeout(function () {
                        try {
                            const timer = firstTimer(clock);
                            if (!timer) {
                                resolve(clock.now);
                                return;
                            }

                            let err;
                            clock.duringTick = true;
                            clock.now = timer.callAt;
                            try {
                                callTimer(clock, timer);
                            } catch (e) {
                                err = e;
                            }
                            clock.duringTick = false;

                            originalSetTimeout(function () {
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
            let numTimers, i;
            runJobs(clock);
            for (i = 0; i < clock.loopLimit; i++) {
                if (!clock.timers) {
                    resetIsNearInfiniteLimit();
                    return clock.now;
                }

                numTimers = Object.keys(clock.timers).length;
                if (numTimers === 0) {
                    resetIsNearInfiniteLimit();
                    return clock.now;
                }

                clock.next();
                checkIsNearInfiniteLimit(clock, i);
            }

            const excessJob = firstTimer(clock);
            throw getInfiniteLoopError(clock, excessJob);
        };

        clock.runToFrame = function runToFrame() {
            return clock.tick(getTimeToNextFrame());
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runAllAsync = function runAllAsync() {
                return new _global.Promise(function (resolve, reject) {
                    let i = 0;
                    /**
                     *
                     */
                    function doRun() {
                        originalSetTimeout(function () {
                            try {
                                runJobs(clock);

                                let numTimers;
                                if (i < clock.loopLimit) {
                                    if (!clock.timers) {
                                        resetIsNearInfiniteLimit();
                                        resolve(clock.now);
                                        return;
                                    }

                                    numTimers = Object.keys(
                                        clock.timers,
                                    ).length;
                                    if (numTimers === 0) {
                                        resetIsNearInfiniteLimit();
                                        resolve(clock.now);
                                        return;
                                    }

                                    clock.next();

                                    i++;

                                    doRun();
                                    checkIsNearInfiniteLimit(clock, i);
                                    return;
                                }

                                const excessJob = firstTimer(clock);
                                reject(getInfiniteLoopError(clock, excessJob));
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
            const timer = lastTimer(clock);
            if (!timer) {
                runJobs(clock);
                return clock.now;
            }

            return clock.tick(timer.callAt - clock.now);
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runToLastAsync = function runToLastAsync() {
                return new _global.Promise(function (resolve, reject) {
                    originalSetTimeout(function () {
                        try {
                            const timer = lastTimer(clock);
                            if (!timer) {
                                runJobs(clock);
                                resolve(clock.now);
                            }

                            resolve(clock.tickAsync(timer.callAt - clock.now));
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
            const newNow = getEpoch(systemTime);
            const difference = newNow - clock.now;
            let id, timer;

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

        /**
         * @param {string|number} tickValue number of milliseconds or a human-readable value like "01:11:15"
         * @returns {number} will return the new `now` value
         */
        clock.jump = function jump(tickValue) {
            const msFloat =
                typeof tickValue === "number"
                    ? tickValue
                    : parseTime(tickValue);
            const ms = Math.floor(msFloat);

            for (const timer of Object.values(clock.timers)) {
                if (clock.now + ms > timer.callAt) {
                    timer.callAt = clock.now + ms;
                }
            }
            clock.tick(ms);
        };

        if (isPresent.performance) {
            clock.performance = Object.create(null);
            clock.performance.now = fakePerformanceNow;
        }

        if (isPresent.hrtime) {
            clock.hrtime = hrtime;
        }

        return clock;
    }

    /* eslint-disable complexity */

    /**
     * @param {Config=} [config] Optional config
     * @returns {Clock}
     */
    function install(config) {
        if (
            arguments.length > 1 ||
            config instanceof Date ||
            Array.isArray(config) ||
            typeof config === "number"
        ) {
            throw new TypeError(
                `FakeTimers.install called with ${String(
                    config,
                )} install requires an object parameter`,
            );
        }

        if (_global.Date.isFake === true) {
            // Timers are already faked; this is a problem.
            // Make the user reset timers before continuing.
            throw new TypeError(
                "Can't install fake timers twice on the same global object.",
            );
        }

        // eslint-disable-next-line no-param-reassign
        config = typeof config !== "undefined" ? config : {};
        config.shouldAdvanceTime = config.shouldAdvanceTime || false;
        config.advanceTimeDelta = config.advanceTimeDelta || 20;
        config.shouldClearNativeTimers =
            config.shouldClearNativeTimers || false;

        if (config.target) {
            throw new TypeError(
                "config.target is no longer supported. Use `withGlobal(target)` instead.",
            );
        }

        /**
         * @param {string} timer/object the name of the thing that is not present
         * @param timer
         */
        function handleMissingTimer(timer) {
            if (config.ignoreMissingTimers) {
                return;
            }

            throw new ReferenceError(
                `non-existent timers and/or objects cannot be faked: '${timer}'`,
            );
        }

        let i, l;
        const clock = createClock(config.now, config.loopLimit);
        clock.shouldClearNativeTimers = config.shouldClearNativeTimers;

        clock.uninstall = function () {
            return uninstall(clock, config);
        };

        clock.abortListenerMap = new Map();

        clock.methods = config.toFake || [];

        if (clock.methods.length === 0) {
            clock.methods = Object.keys(timers);
        }

        if (config.shouldAdvanceTime === true) {
            const intervalTick = doIntervalTick.bind(
                null,
                clock,
                config.advanceTimeDelta,
            );
            const intervalId = _global.setInterval(
                intervalTick,
                config.advanceTimeDelta,
            );
            clock.attachedInterval = intervalId;
        }

        if (clock.methods.includes("performance")) {
            const proto = (() => {
                if (hasPerformanceConstructorPrototype) {
                    return _global.performance.constructor.prototype;
                }
                if (hasPerformancePrototype) {
                    return _global.Performance.prototype;
                }
            })();
            if (proto) {
                Object.getOwnPropertyNames(proto).forEach(function (name) {
                    if (name !== "now") {
                        clock.performance[name] =
                            name.indexOf("getEntries") === 0
                                ? NOOP_ARRAY
                                : NOOP;
                    }
                });
                // ensure `mark` returns a value that is valid
                clock.performance.mark = (name) =>
                    new FakePerformanceEntry(name, "mark", 0, 0);
                clock.performance.measure = (name) =>
                    new FakePerformanceEntry(name, "measure", 0, 100);
            } else if ((config.toFake || []).includes("performance")) {
                return handleMissingTimer("performance");
            }
        }
        if (_global === globalObject && timersModule) {
            clock.timersModuleMethods = [];
        }
        if (_global === globalObject && timersPromisesModule) {
            clock.timersPromisesModuleMethods = [];
        }
        for (i = 0, l = clock.methods.length; i < l; i++) {
            const nameOfMethodToReplace = clock.methods[i];

            if (!isPresent[nameOfMethodToReplace]) {
                handleMissingTimer(nameOfMethodToReplace);
                // eslint-disable-next-line
                continue;
            }

            if (nameOfMethodToReplace === "hrtime") {
                if (
                    _global.process &&
                    typeof _global.process.hrtime === "function"
                ) {
                    hijackMethod(_global.process, nameOfMethodToReplace, clock);
                }
            } else if (nameOfMethodToReplace === "nextTick") {
                if (
                    _global.process &&
                    typeof _global.process.nextTick === "function"
                ) {
                    hijackMethod(_global.process, nameOfMethodToReplace, clock);
                }
            } else {
                hijackMethod(_global, nameOfMethodToReplace, clock);
            }
            if (
                clock.timersModuleMethods !== undefined &&
                timersModule[nameOfMethodToReplace]
            ) {
                const original = timersModule[nameOfMethodToReplace];
                clock.timersModuleMethods.push({
                    methodName: nameOfMethodToReplace,
                    original: original,
                });
                timersModule[nameOfMethodToReplace] =
                    _global[nameOfMethodToReplace];
            }
            if (clock.timersPromisesModuleMethods !== undefined) {
                if (nameOfMethodToReplace === "setTimeout") {
                    clock.timersPromisesModuleMethods.push({
                        methodName: "setTimeout",
                        original: timersPromisesModule.setTimeout,
                    });

                    timersPromisesModule.setTimeout = (
                        delay,
                        value,
                        options = {},
                    ) =>
                        new Promise((resolve, reject) => {
                            const abort = () => {
                                options.signal.removeEventListener(
                                    "abort",
                                    abort,
                                );
                                clock.abortListenerMap.delete(abort);

                                // This is safe, there is no code path that leads to this function
                                // being invoked before handle has been assigned.
                                // eslint-disable-next-line no-use-before-define
                                clock.clearTimeout(handle);
                                reject(options.signal.reason);
                            };

                            const handle = clock.setTimeout(() => {
                                if (options.signal) {
                                    options.signal.removeEventListener(
                                        "abort",
                                        abort,
                                    );
                                    clock.abortListenerMap.delete(abort);
                                }

                                resolve(value);
                            }, delay);

                            if (options.signal) {
                                if (options.signal.aborted) {
                                    abort();
                                } else {
                                    options.signal.addEventListener(
                                        "abort",
                                        abort,
                                    );
                                    clock.abortListenerMap.set(
                                        abort,
                                        options.signal,
                                    );
                                }
                            }
                        });
                } else if (nameOfMethodToReplace === "setImmediate") {
                    clock.timersPromisesModuleMethods.push({
                        methodName: "setImmediate",
                        original: timersPromisesModule.setImmediate,
                    });

                    timersPromisesModule.setImmediate = (value, options = {}) =>
                        new Promise((resolve, reject) => {
                            const abort = () => {
                                options.signal.removeEventListener(
                                    "abort",
                                    abort,
                                );
                                clock.abortListenerMap.delete(abort);

                                // This is safe, there is no code path that leads to this function
                                // being invoked before handle has been assigned.
                                // eslint-disable-next-line no-use-before-define
                                clock.clearImmediate(handle);
                                reject(options.signal.reason);
                            };

                            const handle = clock.setImmediate(() => {
                                if (options.signal) {
                                    options.signal.removeEventListener(
                                        "abort",
                                        abort,
                                    );
                                    clock.abortListenerMap.delete(abort);
                                }

                                resolve(value);
                            });

                            if (options.signal) {
                                if (options.signal.aborted) {
                                    abort();
                                } else {
                                    options.signal.addEventListener(
                                        "abort",
                                        abort,
                                    );
                                    clock.abortListenerMap.set(
                                        abort,
                                        options.signal,
                                    );
                                }
                            }
                        });
                } else if (nameOfMethodToReplace === "setInterval") {
                    clock.timersPromisesModuleMethods.push({
                        methodName: "setInterval",
                        original: timersPromisesModule.setInterval,
                    });

                    timersPromisesModule.setInterval = (
                        delay,
                        value,
                        options = {},
                    ) => ({
                        [Symbol.asyncIterator]: () => {
                            const createResolvable = () => {
                                let resolve, reject;
                                const promise = new Promise((res, rej) => {
                                    resolve = res;
                                    reject = rej;
                                });
                                promise.resolve = resolve;
                                promise.reject = reject;
                                return promise;
                            };

                            let done = false;
                            let hasThrown = false;
                            let returnCall;
                            let nextAvailable = 0;
                            const nextQueue = [];

                            const handle = clock.setInterval(() => {
                                if (nextQueue.length > 0) {
                                    nextQueue.shift().resolve();
                                } else {
                                    nextAvailable++;
                                }
                            }, delay);

                            const abort = () => {
                                options.signal.removeEventListener(
                                    "abort",
                                    abort,
                                );
                                clock.abortListenerMap.delete(abort);

                                clock.clearInterval(handle);
                                done = true;
                                for (const resolvable of nextQueue) {
                                    resolvable.resolve();
                                }
                            };

                            if (options.signal) {
                                if (options.signal.aborted) {
                                    done = true;
                                } else {
                                    options.signal.addEventListener(
                                        "abort",
                                        abort,
                                    );
                                    clock.abortListenerMap.set(
                                        abort,
                                        options.signal,
                                    );
                                }
                            }

                            return {
                                next: async () => {
                                    if (options.signal?.aborted && !hasThrown) {
                                        hasThrown = true;
                                        throw options.signal.reason;
                                    }

                                    if (done) {
                                        return { done: true, value: undefined };
                                    }

                                    if (nextAvailable > 0) {
                                        nextAvailable--;
                                        return { done: false, value: value };
                                    }

                                    const resolvable = createResolvable();
                                    nextQueue.push(resolvable);

                                    await resolvable;

                                    if (returnCall && nextQueue.length === 0) {
                                        returnCall.resolve();
                                    }

                                    if (options.signal?.aborted && !hasThrown) {
                                        hasThrown = true;
                                        throw options.signal.reason;
                                    }

                                    if (done) {
                                        return { done: true, value: undefined };
                                    }

                                    return { done: false, value: value };
                                },
                                return: async () => {
                                    if (done) {
                                        return { done: true, value: undefined };
                                    }

                                    if (nextQueue.length > 0) {
                                        returnCall = createResolvable();
                                        await returnCall;
                                    }

                                    clock.clearInterval(handle);
                                    done = true;

                                    if (options.signal) {
                                        options.signal.removeEventListener(
                                            "abort",
                                            abort,
                                        );
                                        clock.abortListenerMap.delete(abort);
                                    }

                                    return { done: true, value: undefined };
                                },
                            };
                        },
                    });
                }
            }
        }

        return clock;
    }

    /* eslint-enable complexity */

    return {
        timers: timers,
        createClock: createClock,
        install: install,
        withGlobal: withGlobal,
    };
}

/**
 * @typedef {object} FakeTimers
 * @property {Timers} timers
 * @property {createClock} createClock
 * @property {Function} install
 * @property {withGlobal} withGlobal
 */

/* eslint-enable complexity */

/** @type {FakeTimers} */
const defaultImplementation = withGlobal(globalObject);

exports.timers = defaultImplementation.timers;
exports.createClock = defaultImplementation.createClock;
exports.install = defaultImplementation.install;
exports.withGlobal = withGlobal;

},{"@sinonjs/commons":46,"timers":undefined,"timers/promises":undefined,"util":90}],60:[function(require,module,exports){
"use strict";

var ARRAY_TYPES = [
    Array,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
];

module.exports = ARRAY_TYPES;

},{}],61:[function(require,module,exports){
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

var TYPE_MAP = require("./create-matcher/type-map")(createMatcher); // eslint-disable-line no-use-before-define

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
            `Expected 1 or 2 arguments, received ${arguments.length}`,
        );
    }

    if (type in TYPE_MAP) {
        TYPE_MAP[type](m, expectation, message);
    } else {
        m.test = function (actual) {
            return deepEqual(actual, expectation);
        };
    }

    if (!m.message) {
        m.message = `match(${valueToString(expectation)})`;
    }

    // ensure that nothing mutates the exported message value, ref https://github.com/sinonjs/sinon/issues/2502
    Object.defineProperty(m, "message", {
        configurable: false,
        writable: false,
        value: m.message,
    });

    return m;
}

createMatcher.isMatcher = isMatcher;

createMatcher.any = createMatcher(function () {
    return true;
}, "any");

createMatcher.defined = createMatcher(function (actual) {
    return actual !== null && actual !== undefined;
}, "defined");

createMatcher.truthy = createMatcher(function (actual) {
    return Boolean(actual);
}, "truthy");

createMatcher.falsy = createMatcher(function (actual) {
    return !actual;
}, "falsy");

createMatcher.same = function (expectation) {
    return createMatcher(
        function (actual) {
            return expectation === actual;
        },
        `same(${valueToString(expectation)})`,
    );
};

createMatcher.in = function (arrayOfExpectations) {
    if (typeOf(arrayOfExpectations) !== "array") {
        throw new TypeError("array expected");
    }

    return createMatcher(
        function (actual) {
            return some(arrayOfExpectations, function (expectation) {
                return expectation === actual;
            });
        },
        `in(${valueToString(arrayOfExpectations)})`,
    );
};

createMatcher.typeOf = function (type) {
    assertType(type, "string", "type");
    return createMatcher(function (actual) {
        return typeOf(actual) === type;
    }, `typeOf("${type}")`);
};

createMatcher.instanceOf = function (type) {
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
            "[Symbol.hasInstance]",
        );
    }
    return createMatcher(
        function (actual) {
            return actual instanceof type;
        },
        `instanceOf(${functionName(type) || objectToString(type)})`,
    );
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
    return function (property, value) {
        assertType(property, "string", "property");
        var onlyProperty = arguments.length === 1;
        var message = `${messagePrefix}("${property}"`;
        if (!onlyProperty) {
            message += `, ${valueToString(value)}`;
        }
        message += ")";
        return createMatcher(function (actual) {
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

createMatcher.has = createPropertyMatcher(function (actual, property) {
    if (typeof actual === "object") {
        return property in actual;
    }
    return actual[property] !== undefined;
}, "has");

createMatcher.hasOwn = createPropertyMatcher(function (actual, property) {
    return hasOwnProperty(actual, property);
}, "hasOwn");

createMatcher.hasNested = function (property, value) {
    assertType(property, "string", "property");
    var onlyProperty = arguments.length === 1;
    var message = `hasNested("${property}"`;
    if (!onlyProperty) {
        message += `, ${valueToString(value)}`;
    }
    message += ")";
    return createMatcher(function (actual) {
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

var jsonParseResultTypes = {
    null: true,
    boolean: true,
    number: true,
    string: true,
    object: true,
    array: true,
};
createMatcher.json = function (value) {
    if (!jsonParseResultTypes[typeOf(value)]) {
        throw new TypeError("Value cannot be the result of JSON.parse");
    }
    var message = `json(${JSON.stringify(value, null, "  ")})`;
    return createMatcher(function (actual) {
        var parsed;
        try {
            parsed = JSON.parse(actual);
        } catch (e) {
            return false;
        }
        return deepEqual(parsed, value);
    }, message);
};

createMatcher.every = function (predicate) {
    assertMatcher(predicate);

    return createMatcher(function (actual) {
        if (typeOf(actual) === "object") {
            return every(Object.keys(actual), function (key) {
                return predicate.test(actual[key]);
            });
        }

        return (
            isIterable(actual) &&
            every(actual, function (element) {
                return predicate.test(element);
            })
        );
    }, `every(${predicate.message})`);
};

createMatcher.some = function (predicate) {
    assertMatcher(predicate);

    return createMatcher(function (actual) {
        if (typeOf(actual) === "object") {
            return !every(Object.keys(actual), function (key) {
                return !predicate.test(actual[key]);
            });
        }

        return (
            isIterable(actual) &&
            !every(actual, function (element) {
                return !predicate.test(element);
            })
        );
    }, `some(${predicate.message})`);
};

createMatcher.array = createMatcher.typeOf("array");

createMatcher.array.deepEquals = function (expectation) {
    return createMatcher(
        function (actual) {
            // Comparing lengths is the fastest way to spot a difference before iterating through every item
            var sameLength = actual.length === expectation.length;
            return (
                typeOf(actual) === "array" &&
                sameLength &&
                every(actual, function (element, index) {
                    var expected = expectation[index];
                    return typeOf(expected) === "array" &&
                        typeOf(element) === "array"
                        ? createMatcher.array.deepEquals(expected).test(element)
                        : deepEqual(expected, element);
                })
            );
        },
        `deepEquals([${iterableToString(expectation)}])`,
    );
};

createMatcher.array.startsWith = function (expectation) {
    return createMatcher(
        function (actual) {
            return (
                typeOf(actual) === "array" &&
                every(expectation, function (expectedElement, index) {
                    return actual[index] === expectedElement;
                })
            );
        },
        `startsWith([${iterableToString(expectation)}])`,
    );
};

createMatcher.array.endsWith = function (expectation) {
    return createMatcher(
        function (actual) {
            // This indicates the index in which we should start matching
            var offset = actual.length - expectation.length;

            return (
                typeOf(actual) === "array" &&
                every(expectation, function (expectedElement, index) {
                    return actual[offset + index] === expectedElement;
                })
            );
        },
        `endsWith([${iterableToString(expectation)}])`,
    );
};

createMatcher.array.contains = function (expectation) {
    return createMatcher(
        function (actual) {
            return (
                typeOf(actual) === "array" &&
                every(expectation, function (expectedElement) {
                    return arrayIndexOf(actual, expectedElement) !== -1;
                })
            );
        },
        `contains([${iterableToString(expectation)}])`,
    );
};

createMatcher.map = createMatcher.typeOf("map");

createMatcher.map.deepEquals = function mapDeepEquals(expectation) {
    return createMatcher(
        function (actual) {
            // Comparing lengths is the fastest way to spot a difference before iterating through every item
            var sameLength = actual.size === expectation.size;
            return (
                typeOf(actual) === "map" &&
                sameLength &&
                every(actual, function (element, key) {
                    return (
                        expectation.has(key) && expectation.get(key) === element
                    );
                })
            );
        },
        `deepEquals(Map[${iterableToString(expectation)}])`,
    );
};

createMatcher.map.contains = function mapContains(expectation) {
    return createMatcher(
        function (actual) {
            return (
                typeOf(actual) === "map" &&
                every(expectation, function (element, key) {
                    return actual.has(key) && actual.get(key) === element;
                })
            );
        },
        `contains(Map[${iterableToString(expectation)}])`,
    );
};

createMatcher.set = createMatcher.typeOf("set");

createMatcher.set.deepEquals = function setDeepEquals(expectation) {
    return createMatcher(
        function (actual) {
            // Comparing lengths is the fastest way to spot a difference before iterating through every item
            var sameLength = actual.size === expectation.size;
            return (
                typeOf(actual) === "set" &&
                sameLength &&
                every(actual, function (element) {
                    return expectation.has(element);
                })
            );
        },
        `deepEquals(Set[${iterableToString(expectation)}])`,
    );
};

createMatcher.set.contains = function setContains(expectation) {
    return createMatcher(
        function (actual) {
            return (
                typeOf(actual) === "set" &&
                every(expectation, function (element) {
                    return actual.has(element);
                })
            );
        },
        `contains(Set[${iterableToString(expectation)}])`,
    );
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

},{"./create-matcher/assert-matcher":62,"./create-matcher/assert-method-exists":63,"./create-matcher/assert-type":64,"./create-matcher/is-iterable":65,"./create-matcher/is-matcher":66,"./create-matcher/matcher-prototype":68,"./create-matcher/type-map":69,"./deep-equal":70,"./iterable-to-string":84,"@sinonjs/commons":46,"lodash.get":92}],62:[function(require,module,exports){
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

},{"./is-matcher":66}],63:[function(require,module,exports){
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
        throw new TypeError(`Expected ${name} to have method ${methodPath}`);
    }
}

module.exports = assertMethodExists;

},{}],64:[function(require,module,exports){
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
            `Expected type of ${name} to be ${type}, but was ${actual}`,
        );
    }
}

module.exports = assertType;

},{"@sinonjs/commons":46}],65:[function(require,module,exports){
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

},{"@sinonjs/commons":46}],66:[function(require,module,exports){
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

},{"./matcher-prototype":68,"@sinonjs/commons":46}],67:[function(require,module,exports){
"use strict";

var every = require("@sinonjs/commons").prototypes.array.every;
var concat = require("@sinonjs/commons").prototypes.array.concat;
var typeOf = require("@sinonjs/commons").typeOf;

var deepEqualFactory = require("../deep-equal").use;

var identical = require("../identical");
var isMatcher = require("./is-matcher");

var keys = Object.keys;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;

/**
 * Matches `actual` with `expectation`
 *
 * @private
 * @param {*} actual A value to examine
 * @param {object} expectation An object with properties to match on
 * @param {object} matcher A matcher to use for comparison
 * @returns {boolean} Returns true when `actual` matches all properties in `expectation`
 */
function matchObject(actual, expectation, matcher) {
    var deepEqual = deepEqualFactory(matcher);
    if (actual === null || actual === undefined) {
        return false;
    }

    var expectedKeys = keys(expectation);
    /* istanbul ignore else: cannot collect coverage for engine that doesn't support Symbol */
    if (typeOf(getOwnPropertySymbols) === "function") {
        expectedKeys = concat(expectedKeys, getOwnPropertySymbols(expectation));
    }

    return every(expectedKeys, function (key) {
        var exp = expectation[key];
        var act = actual[key];

        if (isMatcher(exp)) {
            if (!exp.test(act)) {
                return false;
            }
        } else if (typeOf(exp) === "object") {
            if (identical(exp, act)) {
                return true;
            }
            if (!matchObject(act, exp, matcher)) {
                return false;
            }
        } else if (!deepEqual(act, exp)) {
            return false;
        }

        return true;
    });
}

module.exports = matchObject;

},{"../deep-equal":70,"../identical":72,"./is-matcher":66,"@sinonjs/commons":46}],68:[function(require,module,exports){
"use strict";

var matcherPrototype = {
    toString: function () {
        return this.message;
    },
};

matcherPrototype.or = function (valueOrMatcher) {
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
    or.test = function (actual) {
        return m1.test(actual) || m2.test(actual);
    };
    or.message = `${m1.message}.or(${m2.message})`;
    return or;
};

matcherPrototype.and = function (valueOrMatcher) {
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
    and.test = function (actual) {
        return m1.test(actual) && m2.test(actual);
    };
    and.message = `${m1.message}.and(${m2.message})`;
    return and;
};

module.exports = matcherPrototype;

},{"../create-matcher":61}],69:[function(require,module,exports){
"use strict";

var functionName = require("@sinonjs/commons").functionName;
var join = require("@sinonjs/commons").prototypes.array.join;
var map = require("@sinonjs/commons").prototypes.array.map;
var stringIndexOf = require("@sinonjs/commons").prototypes.string.indexOf;
var valueToString = require("@sinonjs/commons").valueToString;

var matchObject = require("./match-object");

var createTypeMap = function (match) {
    return {
        function: function (m, expectation, message) {
            m.test = expectation;
            m.message = message || `match(${functionName(expectation)})`;
        },
        number: function (m, expectation) {
            m.test = function (actual) {
                // we need type coercion here
                return expectation == actual; // eslint-disable-line eqeqeq
            };
        },
        object: function (m, expectation) {
            var array = [];

            if (typeof expectation.test === "function") {
                m.test = function (actual) {
                    return expectation.test(actual) === true;
                };
                m.message = `match(${functionName(expectation.test)})`;
                return m;
            }

            array = map(Object.keys(expectation), function (key) {
                return `${key}: ${valueToString(expectation[key])}`;
            });

            m.test = function (actual) {
                return matchObject(actual, expectation, match);
            };
            m.message = `match(${join(array, ", ")})`;

            return m;
        },
        regexp: function (m, expectation) {
            m.test = function (actual) {
                return typeof actual === "string" && expectation.test(actual);
            };
        },
        string: function (m, expectation) {
            m.test = function (actual) {
                return (
                    typeof actual === "string" &&
                    stringIndexOf(actual, expectation) !== -1
                );
            };
            m.message = `match("${expectation}")`;
        },
    };
};

module.exports = createTypeMap;

},{"./match-object":67,"@sinonjs/commons":46}],70:[function(require,module,exports){
"use strict";

var valueToString = require("@sinonjs/commons").valueToString;
var className = require("@sinonjs/commons").className;
var typeOf = require("@sinonjs/commons").typeOf;
var arrayProto = require("@sinonjs/commons").prototypes.array;
var objectProto = require("@sinonjs/commons").prototypes.object;
var mapForEach = require("@sinonjs/commons").prototypes.map.forEach;

var getClass = require("./get-class");
var identical = require("./identical");
var isArguments = require("./is-arguments");
var isArrayType = require("./is-array-type");
var isDate = require("./is-date");
var isElement = require("./is-element");
var isIterable = require("./is-iterable");
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
        expectationPath,
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

        if (actualObj instanceof Promise && expectationObj instanceof Promise) {
            return actualObj === expectationObj;
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
            typeOf(getOwnPropertySymbols) === "function"
                ? getOwnPropertySymbols(expectationObj)
                : /* istanbul ignore next: cannot collect coverage for engine that doesn't support Symbol */
                  [];
        var expectationKeysAndSymbols = concat(
            expectationKeys,
            expectationSymbols,
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
            mapForEach(actualObj, function (value, key) {
                mapsDeeplyEqual =
                    mapsDeeplyEqual &&
                    deepEqualCyclic(value, expectationObj.get(key));
            });

            return mapsDeeplyEqual;
        }

        // jQuery objects have iteration protocols
        // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
        // But, they don't work well with the implementation concerning iterables below,
        // so we will detect them and use jQuery's own equality function
        /* istanbul ignore next -- this can only be tested in the `test-headless` script */
        if (
            actualObj.constructor &&
            actualObj.constructor.name === "jQuery" &&
            typeof actualObj.is === "function"
        ) {
            return actualObj.is(expectationObj);
        }

        var isActualNonArrayIterable =
            isIterable(actualObj) &&
            !isArrayType(actualObj) &&
            !isArguments(actualObj);
        var isExpectationNonArrayIterable =
            isIterable(expectationObj) &&
            !isArrayType(expectationObj) &&
            !isArguments(expectationObj);
        if (isActualNonArrayIterable || isExpectationNonArrayIterable) {
            var actualArray = Array.from(actualObj);
            var expectationArray = Array.from(expectationObj);
            if (actualArray.length !== expectationArray.length) {
                return false;
            }

            var arrayDeeplyEquals = true;
            every(actualArray, function (key) {
                arrayDeeplyEquals =
                    arrayDeeplyEquals &&
                    deepEqualCyclic(actualArray[key], expectationArray[key]);
            });

            return arrayDeeplyEquals;
        }

        return every(expectationKeysAndSymbols, function (key) {
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
                    : `${actualPath}[${JSON.stringify(key)}]`;
            var newExpectationPath =
                expectationIndex !== -1
                    ? expectationPaths[expectationIndex]
                    : `${expectationPath}[${JSON.stringify(key)}]`;
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
                newExpectationPath,
            );
        });
    })(actual, expectation, "$1", "$2");
}

deepEqualCyclic.use = function (match) {
    return function deepEqual(a, b) {
        return deepEqualCyclic(a, b, match);
    };
};

module.exports = deepEqualCyclic;

},{"./get-class":71,"./identical":72,"./is-arguments":73,"./is-array-type":74,"./is-date":75,"./is-element":76,"./is-iterable":77,"./is-map":78,"./is-nan":79,"./is-object":81,"./is-set":82,"./is-subset":83,"@sinonjs/commons":46}],71:[function(require,module,exports){
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

},{"@sinonjs/commons":46}],72:[function(require,module,exports){
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

},{"./is-nan":79,"./is-neg-zero":80}],73:[function(require,module,exports){
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

},{"./get-class":71}],74:[function(require,module,exports){
"use strict";

var functionName = require("@sinonjs/commons").functionName;
var indexOf = require("@sinonjs/commons").prototypes.array.indexOf;
var map = require("@sinonjs/commons").prototypes.array.map;
var ARRAY_TYPES = require("./array-types");
var type = require("type-detect");

/**
 * Returns `true` when `object` is an array type, `false` otherwise
 *
 * @param  {*}  object - The object to examine
 * @returns {boolean} `true` when `object` is an array type
 * @private
 */
function isArrayType(object) {
    return indexOf(map(ARRAY_TYPES, functionName), type(object)) !== -1;
}

module.exports = isArrayType;

},{"./array-types":60,"@sinonjs/commons":46,"type-detect":87}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
"use strict";

/**
 * Returns `true` when the argument is an iterable, `false` otherwise
 *
 * @alias module:samsam.isIterable
 * @param  {*}  val - A value to examine
 * @returns {boolean} Returns `true` when the argument is an iterable, `false` otherwise
 */
function isIterable(val) {
    // checks for null and undefined
    if (typeof val !== "object") {
        return false;
    }
    return typeof val[Symbol.iterator] === "function";
}

module.exports = isIterable;

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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
    forEach(s1, function (v1) {
        var includes = false;
        forEach(s2, function (v2) {
            if (compare(v2, v1)) {
                includes = true;
            }
        });
        allContained = allContained && includes;
    });

    return allContained;
}

module.exports = isSubset;

},{"@sinonjs/commons":46}],84:[function(require,module,exports){
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

    // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
    map.forEach(function (value, key) {
        representation += `[${stringify(key)},${stringify(value)}],`;
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

    // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
    iterable.forEach(function (value) {
        representation += `${stringify(value)},`;
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
    return typeof item === "string" ? `'${item}'` : valueToString(item);
}

module.exports = iterableToString;

},{"@sinonjs/commons":46}],85:[function(require,module,exports){
"use strict";

var valueToString = require("@sinonjs/commons").valueToString;
var indexOf = require("@sinonjs/commons").prototypes.string.indexOf;
var forEach = require("@sinonjs/commons").prototypes.array.forEach;
var type = require("type-detect");

var engineCanCompareMaps = typeof Array.from === "function";
var deepEqual = require("./deep-equal").use(match); // eslint-disable-line no-use-before-define
var isArrayType = require("./is-array-type");
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

    switch (type(matcherOrValue)) {
        case "bigint":
        case "boolean":
        case "number":
        case "symbol":
            return matcherOrValue === object;
        case "function":
            return matcherOrValue(object) === true;
        case "string":
            var notNull = typeof object === "string" || Boolean(object);
            return (
                notNull &&
                indexOf(
                    valueToString(object).toLowerCase(),
                    matcherOrValue.toLowerCase(),
                ) >= 0
            );
        case "null":
            return object === null;
        case "undefined":
            return typeof object === "undefined";
        case "Date":
            /* istanbul ignore else */
            if (type(object) === "Date") {
                return object.getTime() === matcherOrValue.getTime();
            }
            /* istanbul ignore next: this is basically the rest of the function, which is covered */
            break;
        case "Array":
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
            return (
                isArrayType(matcherOrValue) &&
                arrayContains(object, matcherOrValue, match)
            );
        case "Map":
            /* istanbul ignore next: this is covered by a test, that is only run in IE, but we collect coverage information in node*/
            if (!engineCanCompareMaps) {
                throw new Error(
                    "The JavaScript engine does not support Array.from and cannot reliably do value comparison of Map instances",
                );
            }

            return (
                type(object) === "Map" &&
                arrayContains(
                    Array.from(object),
                    Array.from(matcherOrValue),
                    match,
                )
            );
        default:
            break;
    }

    switch (type(object)) {
        case "null":
            return false;
        case "Set":
            return isSubset(matcherOrValue, object, match);
        default:
            break;
    }

    /* istanbul ignore else */
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

forEach(Object.keys(createMatcher), function (key) {
    match[key] = createMatcher[key];
});

module.exports = match;

},{"./create-matcher":61,"./deep-equal":70,"./is-array-type":74,"./is-subset":83,"@sinonjs/commons":46,"type-detect":87}],86:[function(require,module,exports){
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
    match: match,
};

},{"./create-matcher":61,"./deep-equal":70,"./identical":72,"./is-arguments":73,"./is-element":76,"./is-map":78,"./is-neg-zero":80,"./is-set":82,"./match":85}],87:[function(require,module,exports){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.typeDetect = factory());
})(this, (function () { 'use strict';

    var promiseExists = typeof Promise === 'function';
    var globalObject = (function (Obj) {
        if (typeof globalThis === 'object') {
            return globalThis;
        }
        Object.defineProperty(Obj, 'typeDetectGlobalObject', {
            get: function get() {
                return this;
            },
            configurable: true,
        });
        var global = typeDetectGlobalObject;
        delete Obj.typeDetectGlobalObject;
        return global;
    })(Object.prototype);
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
    function typeDetect(obj) {
        var typeofObj = typeof obj;
        if (typeofObj !== 'object') {
            return typeofObj;
        }
        if (obj === null) {
            return 'null';
        }
        if (obj === globalObject) {
            return 'global';
        }
        if (Array.isArray(obj) &&
            (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
            return 'Array';
        }
        if (typeof window === 'object' && window !== null) {
            if (typeof window.location === 'object' && obj === window.location) {
                return 'Location';
            }
            if (typeof window.document === 'object' && obj === window.document) {
                return 'Document';
            }
            if (typeof window.navigator === 'object') {
                if (typeof window.navigator.mimeTypes === 'object' &&
                    obj === window.navigator.mimeTypes) {
                    return 'MimeTypeArray';
                }
                if (typeof window.navigator.plugins === 'object' &&
                    obj === window.navigator.plugins) {
                    return 'PluginArray';
                }
            }
            if ((typeof window.HTMLElement === 'function' ||
                typeof window.HTMLElement === 'object') &&
                obj instanceof window.HTMLElement) {
                if (obj.tagName === 'BLOCKQUOTE') {
                    return 'HTMLQuoteElement';
                }
                if (obj.tagName === 'TD') {
                    return 'HTMLTableDataCellElement';
                }
                if (obj.tagName === 'TH') {
                    return 'HTMLTableHeaderCellElement';
                }
            }
        }
        var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
        if (typeof stringTag === 'string') {
            return stringTag;
        }
        var objPrototype = Object.getPrototypeOf(obj);
        if (objPrototype === RegExp.prototype) {
            return 'RegExp';
        }
        if (objPrototype === Date.prototype) {
            return 'Date';
        }
        if (promiseExists && objPrototype === Promise.prototype) {
            return 'Promise';
        }
        if (setExists && objPrototype === Set.prototype) {
            return 'Set';
        }
        if (mapExists && objPrototype === Map.prototype) {
            return 'Map';
        }
        if (weakSetExists && objPrototype === WeakSet.prototype) {
            return 'WeakSet';
        }
        if (weakMapExists && objPrototype === WeakMap.prototype) {
            return 'WeakMap';
        }
        if (dataViewExists && objPrototype === DataView.prototype) {
            return 'DataView';
        }
        if (mapExists && objPrototype === mapIteratorPrototype) {
            return 'Map Iterator';
        }
        if (setExists && objPrototype === setIteratorPrototype) {
            return 'Set Iterator';
        }
        if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
            return 'Array Iterator';
        }
        if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
            return 'String Iterator';
        }
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

}));

},{}],88:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],89:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],90:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"./support/isBuffer":89,"inherits":88}],91:[function(require,module,exports){
/*!

 diff v7.0.0

BSD 3-Clause License

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

@license
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Diff = {}));
})(this, (function (exports) { 'use strict';

  function Diff() {}
  Diff.prototype = {
    diff: function diff(oldString, newString) {
      var _options$timeout;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      var self = this;
      function done(value) {
        value = self.postProcess(value, options);
        if (callback) {
          setTimeout(function () {
            callback(value);
          }, 0);
          return true;
        } else {
          return value;
        }
      }

      // Allow subclasses to massage the input prior to running
      oldString = this.castInput(oldString, options);
      newString = this.castInput(newString, options);
      oldString = this.removeEmpty(this.tokenize(oldString, options));
      newString = this.removeEmpty(this.tokenize(newString, options));
      var newLen = newString.length,
        oldLen = oldString.length;
      var editLength = 1;
      var maxEditLength = newLen + oldLen;
      if (options.maxEditLength != null) {
        maxEditLength = Math.min(maxEditLength, options.maxEditLength);
      }
      var maxExecutionTime = (_options$timeout = options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : Infinity;
      var abortAfterTimestamp = Date.now() + maxExecutionTime;
      var bestPath = [{
        oldPos: -1,
        lastComponent: undefined
      }];

      // Seed editLength = 0, i.e. the content starts with the same values
      var newPos = this.extractCommon(bestPath[0], newString, oldString, 0, options);
      if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
        // Identity per the equality and tokenizer
        return done(buildValues(self, bestPath[0].lastComponent, newString, oldString, self.useLongestToken));
      }

      // Once we hit the right edge of the edit graph on some diagonal k, we can
      // definitely reach the end of the edit graph in no more than k edits, so
      // there's no point in considering any moves to diagonal k+1 any more (from
      // which we're guaranteed to need at least k+1 more edits).
      // Similarly, once we've reached the bottom of the edit graph, there's no
      // point considering moves to lower diagonals.
      // We record this fact by setting minDiagonalToConsider and
      // maxDiagonalToConsider to some finite value once we've hit the edge of
      // the edit graph.
      // This optimization is not faithful to the original algorithm presented in
      // Myers's paper, which instead pointlessly extends D-paths off the end of
      // the edit graph - see page 7 of Myers's paper which notes this point
      // explicitly and illustrates it with a diagram. This has major performance
      // implications for some common scenarios. For instance, to compute a diff
      // where the new text simply appends d characters on the end of the
      // original text of length n, the true Myers algorithm will take O(n+d^2)
      // time while this optimization needs only O(n+d) time.
      var minDiagonalToConsider = -Infinity,
        maxDiagonalToConsider = Infinity;

      // Main worker method. checks all permutations of a given edit length for acceptance.
      function execEditLength() {
        for (var diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
          var basePath = void 0;
          var removePath = bestPath[diagonalPath - 1],
            addPath = bestPath[diagonalPath + 1];
          if (removePath) {
            // No one else is going to attempt to use this value, clear it
            bestPath[diagonalPath - 1] = undefined;
          }
          var canAdd = false;
          if (addPath) {
            // what newPos will be after we do an insertion:
            var addPathNewPos = addPath.oldPos - diagonalPath;
            canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
          }
          var canRemove = removePath && removePath.oldPos + 1 < oldLen;
          if (!canAdd && !canRemove) {
            // If this path is a terminal then prune
            bestPath[diagonalPath] = undefined;
            continue;
          }

          // Select the diagonal that we want to branch from. We select the prior
          // path whose position in the old string is the farthest from the origin
          // and does not pass the bounds of the diff graph
          if (!canRemove || canAdd && removePath.oldPos < addPath.oldPos) {
            basePath = self.addToPath(addPath, true, false, 0, options);
          } else {
            basePath = self.addToPath(removePath, false, true, 1, options);
          }
          newPos = self.extractCommon(basePath, newString, oldString, diagonalPath, options);
          if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
            // If we have hit the end of both strings, then we are done
            return done(buildValues(self, basePath.lastComponent, newString, oldString, self.useLongestToken));
          } else {
            bestPath[diagonalPath] = basePath;
            if (basePath.oldPos + 1 >= oldLen) {
              maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
            }
            if (newPos + 1 >= newLen) {
              minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
            }
          }
        }
        editLength++;
      }

      // Performs the length of edit iteration. Is a bit fugly as this has to support the
      // sync and async mode which is never fun. Loops over execEditLength until a value
      // is produced, or until the edit length exceeds options.maxEditLength (if given),
      // in which case it will return undefined.
      if (callback) {
        (function exec() {
          setTimeout(function () {
            if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) {
              return callback();
            }
            if (!execEditLength()) {
              exec();
            }
          }, 0);
        })();
      } else {
        while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
          var ret = execEditLength();
          if (ret) {
            return ret;
          }
        }
      }
    },
    addToPath: function addToPath(path, added, removed, oldPosInc, options) {
      var last = path.lastComponent;
      if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) {
        return {
          oldPos: path.oldPos + oldPosInc,
          lastComponent: {
            count: last.count + 1,
            added: added,
            removed: removed,
            previousComponent: last.previousComponent
          }
        };
      } else {
        return {
          oldPos: path.oldPos + oldPosInc,
          lastComponent: {
            count: 1,
            added: added,
            removed: removed,
            previousComponent: last
          }
        };
      }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath, options) {
      var newLen = newString.length,
        oldLen = oldString.length,
        oldPos = basePath.oldPos,
        newPos = oldPos - diagonalPath,
        commonCount = 0;
      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(oldString[oldPos + 1], newString[newPos + 1], options)) {
        newPos++;
        oldPos++;
        commonCount++;
        if (options.oneChangePerToken) {
          basePath.lastComponent = {
            count: 1,
            previousComponent: basePath.lastComponent,
            added: false,
            removed: false
          };
        }
      }
      if (commonCount && !options.oneChangePerToken) {
        basePath.lastComponent = {
          count: commonCount,
          previousComponent: basePath.lastComponent,
          added: false,
          removed: false
        };
      }
      basePath.oldPos = oldPos;
      return newPos;
    },
    equals: function equals(left, right, options) {
      if (options.comparator) {
        return options.comparator(left, right);
      } else {
        return left === right || options.ignoreCase && left.toLowerCase() === right.toLowerCase();
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
      return Array.from(value);
    },
    join: function join(chars) {
      return chars.join('');
    },
    postProcess: function postProcess(changeObjects) {
      return changeObjects;
    }
  };
  function buildValues(diff, lastComponent, newString, oldString, useLongestToken) {
    // First we convert our linked list of components in reverse order to an
    // array in the right order:
    var components = [];
    var nextComponent;
    while (lastComponent) {
      components.push(lastComponent);
      nextComponent = lastComponent.previousComponent;
      delete lastComponent.previousComponent;
      lastComponent = nextComponent;
    }
    components.reverse();
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
        newPos += component.count;

        // Common case
        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
        oldPos += component.count;
      }
    }
    return components;
  }

  var characterDiff = new Diff();
  function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
  }

  function longestCommonPrefix(str1, str2) {
    var i;
    for (i = 0; i < str1.length && i < str2.length; i++) {
      if (str1[i] != str2[i]) {
        return str1.slice(0, i);
      }
    }
    return str1.slice(0, i);
  }
  function longestCommonSuffix(str1, str2) {
    var i;

    // Unlike longestCommonPrefix, we need a special case to handle all scenarios
    // where we return the empty string since str1.slice(-0) will return the
    // entire string.
    if (!str1 || !str2 || str1[str1.length - 1] != str2[str2.length - 1]) {
      return '';
    }
    for (i = 0; i < str1.length && i < str2.length; i++) {
      if (str1[str1.length - (i + 1)] != str2[str2.length - (i + 1)]) {
        return str1.slice(-i);
      }
    }
    return str1.slice(-i);
  }
  function replacePrefix(string, oldPrefix, newPrefix) {
    if (string.slice(0, oldPrefix.length) != oldPrefix) {
      throw Error("string ".concat(JSON.stringify(string), " doesn't start with prefix ").concat(JSON.stringify(oldPrefix), "; this is a bug"));
    }
    return newPrefix + string.slice(oldPrefix.length);
  }
  function replaceSuffix(string, oldSuffix, newSuffix) {
    if (!oldSuffix) {
      return string + newSuffix;
    }
    if (string.slice(-oldSuffix.length) != oldSuffix) {
      throw Error("string ".concat(JSON.stringify(string), " doesn't end with suffix ").concat(JSON.stringify(oldSuffix), "; this is a bug"));
    }
    return string.slice(0, -oldSuffix.length) + newSuffix;
  }
  function removePrefix(string, oldPrefix) {
    return replacePrefix(string, oldPrefix, '');
  }
  function removeSuffix(string, oldSuffix) {
    return replaceSuffix(string, oldSuffix, '');
  }
  function maximumOverlap(string1, string2) {
    return string2.slice(0, overlapCount(string1, string2));
  }

  // Nicked from https://stackoverflow.com/a/60422853/1709587
  function overlapCount(a, b) {
    // Deal with cases where the strings differ in length
    var startA = 0;
    if (a.length > b.length) {
      startA = a.length - b.length;
    }
    var endB = b.length;
    if (a.length < b.length) {
      endB = a.length;
    }
    // Create a back-reference for each index
    //   that should be followed in case of a mismatch.
    //   We only need B to make these references:
    var map = Array(endB);
    var k = 0; // Index that lags behind j
    map[0] = 0;
    for (var j = 1; j < endB; j++) {
      if (b[j] == b[k]) {
        map[j] = map[k]; // skip over the same character (optional optimisation)
      } else {
        map[j] = k;
      }
      while (k > 0 && b[j] != b[k]) {
        k = map[k];
      }
      if (b[j] == b[k]) {
        k++;
      }
    }
    // Phase 2: use these references while iterating over A
    k = 0;
    for (var i = startA; i < a.length; i++) {
      while (k > 0 && a[i] != b[k]) {
        k = map[k];
      }
      if (a[i] == b[k]) {
        k++;
      }
    }
    return k;
  }

  /**
   * Returns true if the string consistently uses Windows line endings.
   */
  function hasOnlyWinLineEndings(string) {
    return string.includes('\r\n') && !string.startsWith('\n') && !string.match(/[^\r]\n/);
  }

  /**
   * Returns true if the string consistently uses Unix line endings.
   */
  function hasOnlyUnixLineEndings(string) {
    return !string.includes('\r\n') && string.includes('\n');
  }

  // Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
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
  var extendedWordChars = "a-zA-Z0-9_\\u{C0}-\\u{FF}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}";

  // Each token is one of the following:
  // - A punctuation mark plus the surrounding whitespace
  // - A word plus the surrounding whitespace
  // - Pure whitespace (but only in the special case where this the entire text
  //   is just whitespace)
  //
  // We have to include surrounding whitespace in the tokens because the two
  // alternative approaches produce horribly broken results:
  // * If we just discard the whitespace, we can't fully reproduce the original
  //   text from the sequence of tokens and any attempt to render the diff will
  //   get the whitespace wrong.
  // * If we have separate tokens for whitespace, then in a typical text every
  //   second token will be a single space character. But this often results in
  //   the optimal diff between two texts being a perverse one that preserves
  //   the spaces between words but deletes and reinserts actual common words.
  //   See https://github.com/kpdecker/jsdiff/issues/160#issuecomment-1866099640
  //   for an example.
  //
  // Keeping the surrounding whitespace of course has implications for .equals
  // and .join, not just .tokenize.

  // This regex does NOT fully implement the tokenization rules described above.
  // Instead, it gives runs of whitespace their own "token". The tokenize method
  // then handles stitching whitespace tokens onto adjacent word or punctuation
  // tokens.
  var tokenizeIncludingWhitespace = new RegExp("[".concat(extendedWordChars, "]+|\\s+|[^").concat(extendedWordChars, "]"), 'ug');
  var wordDiff = new Diff();
  wordDiff.equals = function (left, right, options) {
    if (options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }
    return left.trim() === right.trim();
  };
  wordDiff.tokenize = function (value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var parts;
    if (options.intlSegmenter) {
      if (options.intlSegmenter.resolvedOptions().granularity != 'word') {
        throw new Error('The segmenter passed must have a granularity of "word"');
      }
      parts = Array.from(options.intlSegmenter.segment(value), function (segment) {
        return segment.segment;
      });
    } else {
      parts = value.match(tokenizeIncludingWhitespace) || [];
    }
    var tokens = [];
    var prevPart = null;
    parts.forEach(function (part) {
      if (/\s/.test(part)) {
        if (prevPart == null) {
          tokens.push(part);
        } else {
          tokens.push(tokens.pop() + part);
        }
      } else if (/\s/.test(prevPart)) {
        if (tokens[tokens.length - 1] == prevPart) {
          tokens.push(tokens.pop() + part);
        } else {
          tokens.push(prevPart + part);
        }
      } else {
        tokens.push(part);
      }
      prevPart = part;
    });
    return tokens;
  };
  wordDiff.join = function (tokens) {
    // Tokens being joined here will always have appeared consecutively in the
    // same text, so we can simply strip off the leading whitespace from all the
    // tokens except the first (and except any whitespace-only tokens - but such
    // a token will always be the first and only token anyway) and then join them
    // and the whitespace around words and punctuation will end up correct.
    return tokens.map(function (token, i) {
      if (i == 0) {
        return token;
      } else {
        return token.replace(/^\s+/, '');
      }
    }).join('');
  };
  wordDiff.postProcess = function (changes, options) {
    if (!changes || options.oneChangePerToken) {
      return changes;
    }
    var lastKeep = null;
    // Change objects representing any insertion or deletion since the last
    // "keep" change object. There can be at most one of each.
    var insertion = null;
    var deletion = null;
    changes.forEach(function (change) {
      if (change.added) {
        insertion = change;
      } else if (change.removed) {
        deletion = change;
      } else {
        if (insertion || deletion) {
          // May be false at start of text
          dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, change);
        }
        lastKeep = change;
        insertion = null;
        deletion = null;
      }
    });
    if (insertion || deletion) {
      dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, null);
    }
    return changes;
  };
  function diffWords(oldStr, newStr, options) {
    // This option has never been documented and never will be (it's clearer to
    // just call `diffWordsWithSpace` directly if you need that behavior), but
    // has existed in jsdiff for a long time, so we retain support for it here
    // for the sake of backwards compatibility.
    if ((options === null || options === void 0 ? void 0 : options.ignoreWhitespace) != null && !options.ignoreWhitespace) {
      return diffWordsWithSpace(oldStr, newStr, options);
    }
    return wordDiff.diff(oldStr, newStr, options);
  }
  function dedupeWhitespaceInChangeObjects(startKeep, deletion, insertion, endKeep) {
    // Before returning, we tidy up the leading and trailing whitespace of the
    // change objects to eliminate cases where trailing whitespace in one object
    // is repeated as leading whitespace in the next.
    // Below are examples of the outcomes we want here to explain the code.
    // I=insert, K=keep, D=delete
    // 1. diffing 'foo bar baz' vs 'foo baz'
    //    Prior to cleanup, we have K:'foo ' D:' bar ' K:' baz'
    //    After cleanup, we want:   K:'foo ' D:'bar ' K:'baz'
    //
    // 2. Diffing 'foo bar baz' vs 'foo qux baz'
    //    Prior to cleanup, we have K:'foo ' D:' bar ' I:' qux ' K:' baz'
    //    After cleanup, we want K:'foo ' D:'bar' I:'qux' K:' baz'
    //
    // 3. Diffing 'foo\nbar baz' vs 'foo baz'
    //    Prior to cleanup, we have K:'foo ' D:'\nbar ' K:' baz'
    //    After cleanup, we want K'foo' D:'\nbar' K:' baz'
    //
    // 4. Diffing 'foo baz' vs 'foo\nbar baz'
    //    Prior to cleanup, we have K:'foo\n' I:'\nbar ' K:' baz'
    //    After cleanup, we ideally want K'foo' I:'\nbar' K:' baz'
    //    but don't actually manage this currently (the pre-cleanup change
    //    objects don't contain enough information to make it possible).
    //
    // 5. Diffing 'foo   bar baz' vs 'foo  baz'
    //    Prior to cleanup, we have K:'foo  ' D:'   bar ' K:'  baz'
    //    After cleanup, we want K:'foo  ' D:' bar ' K:'baz'
    //
    // Our handling is unavoidably imperfect in the case where there's a single
    // indel between keeps and the whitespace has changed. For instance, consider
    // diffing 'foo\tbar\nbaz' vs 'foo baz'. Unless we create an extra change
    // object to represent the insertion of the space character (which isn't even
    // a token), we have no way to avoid losing information about the texts'
    // original whitespace in the result we return. Still, we do our best to
    // output something that will look sensible if we e.g. print it with
    // insertions in green and deletions in red.

    // Between two "keep" change objects (or before the first or after the last
    // change object), we can have either:
    // * A "delete" followed by an "insert"
    // * Just an "insert"
    // * Just a "delete"
    // We handle the three cases separately.
    if (deletion && insertion) {
      var oldWsPrefix = deletion.value.match(/^\s*/)[0];
      var oldWsSuffix = deletion.value.match(/\s*$/)[0];
      var newWsPrefix = insertion.value.match(/^\s*/)[0];
      var newWsSuffix = insertion.value.match(/\s*$/)[0];
      if (startKeep) {
        var commonWsPrefix = longestCommonPrefix(oldWsPrefix, newWsPrefix);
        startKeep.value = replaceSuffix(startKeep.value, newWsPrefix, commonWsPrefix);
        deletion.value = removePrefix(deletion.value, commonWsPrefix);
        insertion.value = removePrefix(insertion.value, commonWsPrefix);
      }
      if (endKeep) {
        var commonWsSuffix = longestCommonSuffix(oldWsSuffix, newWsSuffix);
        endKeep.value = replacePrefix(endKeep.value, newWsSuffix, commonWsSuffix);
        deletion.value = removeSuffix(deletion.value, commonWsSuffix);
        insertion.value = removeSuffix(insertion.value, commonWsSuffix);
      }
    } else if (insertion) {
      // The whitespaces all reflect what was in the new text rather than
      // the old, so we essentially have no information about whitespace
      // insertion or deletion. We just want to dedupe the whitespace.
      // We do that by having each change object keep its trailing
      // whitespace and deleting duplicate leading whitespace where
      // present.
      if (startKeep) {
        insertion.value = insertion.value.replace(/^\s*/, '');
      }
      if (endKeep) {
        endKeep.value = endKeep.value.replace(/^\s*/, '');
      }
      // otherwise we've got a deletion and no insertion
    } else if (startKeep && endKeep) {
      var newWsFull = endKeep.value.match(/^\s*/)[0],
        delWsStart = deletion.value.match(/^\s*/)[0],
        delWsEnd = deletion.value.match(/\s*$/)[0];

      // Any whitespace that comes straight after startKeep in both the old and
      // new texts, assign to startKeep and remove from the deletion.
      var newWsStart = longestCommonPrefix(newWsFull, delWsStart);
      deletion.value = removePrefix(deletion.value, newWsStart);

      // Any whitespace that comes straight before endKeep in both the old and
      // new texts, and hasn't already been assigned to startKeep, assign to
      // endKeep and remove from the deletion.
      var newWsEnd = longestCommonSuffix(removePrefix(newWsFull, newWsStart), delWsEnd);
      deletion.value = removeSuffix(deletion.value, newWsEnd);
      endKeep.value = replacePrefix(endKeep.value, newWsFull, newWsEnd);

      // If there's any whitespace from the new text that HASN'T already been
      // assigned, assign it to the start:
      startKeep.value = replaceSuffix(startKeep.value, newWsFull, newWsFull.slice(0, newWsFull.length - newWsEnd.length));
    } else if (endKeep) {
      // We are at the start of the text. Preserve all the whitespace on
      // endKeep, and just remove whitespace from the end of deletion to the
      // extent that it overlaps with the start of endKeep.
      var endKeepWsPrefix = endKeep.value.match(/^\s*/)[0];
      var deletionWsSuffix = deletion.value.match(/\s*$/)[0];
      var overlap = maximumOverlap(deletionWsSuffix, endKeepWsPrefix);
      deletion.value = removeSuffix(deletion.value, overlap);
    } else if (startKeep) {
      // We are at the END of the text. Preserve all the whitespace on
      // startKeep, and just remove whitespace from the start of deletion to
      // the extent that it overlaps with the end of startKeep.
      var startKeepWsSuffix = startKeep.value.match(/\s*$/)[0];
      var deletionWsPrefix = deletion.value.match(/^\s*/)[0];
      var _overlap = maximumOverlap(startKeepWsSuffix, deletionWsPrefix);
      deletion.value = removePrefix(deletion.value, _overlap);
    }
  }
  var wordWithSpaceDiff = new Diff();
  wordWithSpaceDiff.tokenize = function (value) {
    // Slightly different to the tokenizeIncludingWhitespace regex used above in
    // that this one treats each individual newline as a distinct tokens, rather
    // than merging them into other surrounding whitespace. This was requested
    // in https://github.com/kpdecker/jsdiff/issues/180 &
    //    https://github.com/kpdecker/jsdiff/issues/211
    var regex = new RegExp("(\\r?\\n)|[".concat(extendedWordChars, "]+|[^\\S\\n\\r]+|[^").concat(extendedWordChars, "]"), 'ug');
    return value.match(regex) || [];
  };
  function diffWordsWithSpace(oldStr, newStr, options) {
    return wordWithSpaceDiff.diff(oldStr, newStr, options);
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

  var lineDiff = new Diff();
  lineDiff.tokenize = function (value, options) {
    if (options.stripTrailingCr) {
      // remove one \r before \n to match GNU diff's --strip-trailing-cr behavior
      value = value.replace(/\r\n/g, '\n');
    }
    var retLines = [],
      linesAndNewlines = value.split(/(\n|\r\n)/);

    // Ignore the final empty token that occurs if the string ends with a new line
    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    }

    // Merge the content and line separators into single tokens
    for (var i = 0; i < linesAndNewlines.length; i++) {
      var line = linesAndNewlines[i];
      if (i % 2 && !options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        retLines.push(line);
      }
    }
    return retLines;
  };
  lineDiff.equals = function (left, right, options) {
    // If we're ignoring whitespace, we need to normalise lines by stripping
    // whitespace before checking equality. (This has an annoying interaction
    // with newlineIsToken that requires special handling: if newlines get their
    // own token, then we DON'T want to trim the *newline* tokens down to empty
    // strings, since this would cause us to treat whitespace-only line content
    // as equal to a separator between lines, which would be weird and
    // inconsistent with the documented behavior of the options.)
    if (options.ignoreWhitespace) {
      if (!options.newlineIsToken || !left.includes('\n')) {
        left = left.trim();
      }
      if (!options.newlineIsToken || !right.includes('\n')) {
        right = right.trim();
      }
    } else if (options.ignoreNewlineAtEof && !options.newlineIsToken) {
      if (left.endsWith('\n')) {
        left = left.slice(0, -1);
      }
      if (right.endsWith('\n')) {
        right = right.slice(0, -1);
      }
    }
    return Diff.prototype.equals.call(this, left, right, options);
  };
  function diffLines(oldStr, newStr, callback) {
    return lineDiff.diff(oldStr, newStr, callback);
  }

  // Kept for backwards compatibility. This is a rather arbitrary wrapper method
  // that just calls `diffLines` with `ignoreWhitespace: true`. It's confusing to
  // have two ways to do exactly the same thing in the API, so we no longer
  // document this one (library users should explicitly use `diffLines` with
  // `ignoreWhitespace: true` instead) but we keep it around to maintain
  // compatibility with code that used old versions.
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

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var jsonDiff = new Diff();
  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
  jsonDiff.useLongestToken = true;
  jsonDiff.tokenize = lineDiff.tokenize;
  jsonDiff.castInput = function (value, options) {
    var undefinedReplacement = options.undefinedReplacement,
      _options$stringifyRep = options.stringifyReplacer,
      stringifyReplacer = _options$stringifyRep === void 0 ? function (k, v) {
        return typeof v === 'undefined' ? undefinedReplacement : v;
      } : _options$stringifyRep;
    return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
  };
  jsonDiff.equals = function (left, right, options) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'), options);
  };
  function diffJson(oldObj, newObj, options) {
    return jsonDiff.diff(oldObj, newObj, options);
  }

  // This function handles the presence of circular references by bailing out when encountering an
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
    if ('[object Array]' === Object.prototype.toString.call(obj)) {
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
        if (Object.prototype.hasOwnProperty.call(obj, _key)) {
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

  function unixToWin(patch) {
    if (Array.isArray(patch)) {
      return patch.map(unixToWin);
    }
    return _objectSpread2(_objectSpread2({}, patch), {}, {
      hunks: patch.hunks.map(function (hunk) {
        return _objectSpread2(_objectSpread2({}, hunk), {}, {
          lines: hunk.lines.map(function (line, i) {
            var _hunk$lines;
            return line.startsWith('\\') || line.endsWith('\r') || (_hunk$lines = hunk.lines[i + 1]) !== null && _hunk$lines !== void 0 && _hunk$lines.startsWith('\\') ? line : line + '\r';
          })
        });
      })
    });
  }
  function winToUnix(patch) {
    if (Array.isArray(patch)) {
      return patch.map(winToUnix);
    }
    return _objectSpread2(_objectSpread2({}, patch), {}, {
      hunks: patch.hunks.map(function (hunk) {
        return _objectSpread2(_objectSpread2({}, hunk), {}, {
          lines: hunk.lines.map(function (line) {
            return line.endsWith('\r') ? line.substring(0, line.length - 1) : line;
          })
        });
      })
    });
  }

  /**
   * Returns true if the patch consistently uses Unix line endings (or only involves one line and has
   * no line endings).
   */
  function isUnix(patch) {
    if (!Array.isArray(patch)) {
      patch = [patch];
    }
    return !patch.some(function (index) {
      return index.hunks.some(function (hunk) {
        return hunk.lines.some(function (line) {
          return !line.startsWith('\\') && line.endsWith('\r');
        });
      });
    });
  }

  /**
   * Returns true if the patch uses Windows line endings and only Windows line endings.
   */
  function isWin(patch) {
    if (!Array.isArray(patch)) {
      patch = [patch];
    }
    return patch.some(function (index) {
      return index.hunks.some(function (hunk) {
        return hunk.lines.some(function (line) {
          return line.endsWith('\r');
        });
      });
    }) && patch.every(function (index) {
      return index.hunks.every(function (hunk) {
        return hunk.lines.every(function (line, i) {
          var _hunk$lines2;
          return line.startsWith('\\') || line.endsWith('\r') || ((_hunk$lines2 = hunk.lines[i + 1]) === null || _hunk$lines2 === void 0 ? void 0 : _hunk$lines2.startsWith('\\'));
        });
      });
    });
  }

  function parsePatch(uniDiff) {
    var diffstr = uniDiff.split(/\n/),
      list = [],
      i = 0;
    function parseIndex() {
      var index = {};
      list.push(index);

      // Parse diff metadata
      while (i < diffstr.length) {
        var line = diffstr[i];

        // File header found, end parsing diff metadata
        if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
          break;
        }

        // Diff index
        var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
        if (header) {
          index.index = header[1];
        }
        i++;
      }

      // Parse file headers if they are defined. Unified diff requires them, but
      // there's no technical issues to have an isolated hunk without file header
      parseFileHeader(index);
      parseFileHeader(index);

      // Parse hunks
      index.hunks = [];
      while (i < diffstr.length) {
        var _line = diffstr[i];
        if (/^(Index:\s|diff\s|\-\-\-\s|\+\+\+\s|===================================================================)/.test(_line)) {
          break;
        } else if (/^@@/.test(_line)) {
          index.hunks.push(parseHunk());
        } else if (_line) {
          throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
        } else {
          i++;
        }
      }
    }

    // Parses the --- and +++ headers, if none are found, no lines
    // are consumed.
    function parseFileHeader(index) {
      var fileHeader = /^(---|\+\+\+)\s+(.*)\r?$/.exec(diffstr[i]);
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
    }

    // Parses a hunk
    // This assumes that we are at the start of a hunk.
    function parseHunk() {
      var chunkHeaderIndex = i,
        chunkHeaderLine = diffstr[i++],
        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
      var hunk = {
        oldStart: +chunkHeader[1],
        oldLines: typeof chunkHeader[2] === 'undefined' ? 1 : +chunkHeader[2],
        newStart: +chunkHeader[3],
        newLines: typeof chunkHeader[4] === 'undefined' ? 1 : +chunkHeader[4],
        lines: []
      };

      // Unified Diff Format quirk: If the chunk size is 0,
      // the first number is one lower than one would expect.
      // https://www.artima.com/weblogs/viewpost.jsp?thread=164293
      if (hunk.oldLines === 0) {
        hunk.oldStart += 1;
      }
      if (hunk.newLines === 0) {
        hunk.newStart += 1;
      }
      var addCount = 0,
        removeCount = 0;
      for (; i < diffstr.length && (removeCount < hunk.oldLines || addCount < hunk.newLines || (_diffstr$i = diffstr[i]) !== null && _diffstr$i !== void 0 && _diffstr$i.startsWith('\\')); i++) {
        var _diffstr$i;
        var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];
        if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
          hunk.lines.push(diffstr[i]);
          if (operation === '+') {
            addCount++;
          } else if (operation === '-') {
            removeCount++;
          } else if (operation === ' ') {
            addCount++;
            removeCount++;
          }
        } else {
          throw new Error("Hunk at line ".concat(chunkHeaderIndex + 1, " contained invalid line ").concat(diffstr[i]));
        }
      }

      // Handle the empty block count case
      if (!addCount && hunk.newLines === 1) {
        hunk.newLines = 0;
      }
      if (!removeCount && hunk.oldLines === 1) {
        hunk.oldLines = 0;
      }

      // Perform sanity checking
      if (addCount !== hunk.newLines) {
        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }
      if (removeCount !== hunk.oldLines) {
        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
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
        }

        // Check if trying to fit beyond text length, and if not, check it fits
        // after offset location (or desired location on first iteration)
        if (start + localOffset <= maxLine) {
          return start + localOffset;
        }
        forwardExhausted = true;
      }
      if (!backwardExhausted) {
        if (!forwardExhausted) {
          wantForward = true;
        }

        // Check if trying to fit before text beginning, and if not, check it fits
        // before offset location
        if (minLine <= start - localOffset) {
          return start - localOffset++;
        }
        backwardExhausted = true;
        return iterator();
      }

      // We tried to fit hunk before text beginning and beyond text length, then
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
    }
    if (options.autoConvertLineEndings || options.autoConvertLineEndings == null) {
      if (hasOnlyWinLineEndings(source) && isUnix(uniDiff)) {
        uniDiff = unixToWin(uniDiff);
      } else if (hasOnlyUnixLineEndings(source) && isWin(uniDiff)) {
        uniDiff = winToUnix(uniDiff);
      }
    }

    // Apply the diff to the input
    var lines = source.split('\n'),
      hunks = uniDiff.hunks,
      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) {
        return line === patchContent;
      },
      fuzzFactor = options.fuzzFactor || 0,
      minLine = 0;
    if (fuzzFactor < 0 || !Number.isInteger(fuzzFactor)) {
      throw new Error('fuzzFactor must be a non-negative integer');
    }

    // Special case for empty patch.
    if (!hunks.length) {
      return source;
    }

    // Before anything else, handle EOFNL insertion/removal. If the patch tells us to make a change
    // to the EOFNL that is redundant/impossible - i.e. to remove a newline that's not there, or add a
    // newline that already exists - then we either return false and fail to apply the patch (if
    // fuzzFactor is 0) or simply ignore the problem and do nothing (if fuzzFactor is >0).
    // If we do need to remove/add a newline at EOF, this will always be in the final hunk:
    var prevLine = '',
      removeEOFNL = false,
      addEOFNL = false;
    for (var i = 0; i < hunks[hunks.length - 1].lines.length; i++) {
      var line = hunks[hunks.length - 1].lines[i];
      if (line[0] == '\\') {
        if (prevLine[0] == '+') {
          removeEOFNL = true;
        } else if (prevLine[0] == '-') {
          addEOFNL = true;
        }
      }
      prevLine = line;
    }
    if (removeEOFNL) {
      if (addEOFNL) {
        // This means the final line gets changed but doesn't have a trailing newline in either the
        // original or patched version. In that case, we do nothing if fuzzFactor > 0, and if
        // fuzzFactor is 0, we simply validate that the source file has no trailing newline.
        if (!fuzzFactor && lines[lines.length - 1] == '') {
          return false;
        }
      } else if (lines[lines.length - 1] == '') {
        lines.pop();
      } else if (!fuzzFactor) {
        return false;
      }
    } else if (addEOFNL) {
      if (lines[lines.length - 1] != '') {
        lines.push('');
      } else if (!fuzzFactor) {
        return false;
      }
    }

    /**
     * Checks if the hunk can be made to fit at the provided location with at most `maxErrors`
     * insertions, substitutions, or deletions, while ensuring also that:
     * - lines deleted in the hunk match exactly, and
     * - wherever an insertion operation or block of insertion operations appears in the hunk, the
     *   immediately preceding and following lines of context match exactly
     *
     * `toPos` should be set such that lines[toPos] is meant to match hunkLines[0].
     *
     * If the hunk can be applied, returns an object with properties `oldLineLastI` and
     * `replacementLines`. Otherwise, returns null.
     */
    function applyHunk(hunkLines, toPos, maxErrors) {
      var hunkLinesI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var lastContextLineMatched = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var patchedLines = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
      var patchedLinesLength = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var nConsecutiveOldContextLines = 0;
      var nextContextLineMustMatch = false;
      for (; hunkLinesI < hunkLines.length; hunkLinesI++) {
        var hunkLine = hunkLines[hunkLinesI],
          operation = hunkLine.length > 0 ? hunkLine[0] : ' ',
          content = hunkLine.length > 0 ? hunkLine.substr(1) : hunkLine;
        if (operation === '-') {
          if (compareLine(toPos + 1, lines[toPos], operation, content)) {
            toPos++;
            nConsecutiveOldContextLines = 0;
          } else {
            if (!maxErrors || lines[toPos] == null) {
              return null;
            }
            patchedLines[patchedLinesLength] = lines[toPos];
            return applyHunk(hunkLines, toPos + 1, maxErrors - 1, hunkLinesI, false, patchedLines, patchedLinesLength + 1);
          }
        }
        if (operation === '+') {
          if (!lastContextLineMatched) {
            return null;
          }
          patchedLines[patchedLinesLength] = content;
          patchedLinesLength++;
          nConsecutiveOldContextLines = 0;
          nextContextLineMustMatch = true;
        }
        if (operation === ' ') {
          nConsecutiveOldContextLines++;
          patchedLines[patchedLinesLength] = lines[toPos];
          if (compareLine(toPos + 1, lines[toPos], operation, content)) {
            patchedLinesLength++;
            lastContextLineMatched = true;
            nextContextLineMustMatch = false;
            toPos++;
          } else {
            if (nextContextLineMustMatch || !maxErrors) {
              return null;
            }

            // Consider 3 possibilities in sequence:
            // 1. lines contains a *substitution* not included in the patch context, or
            // 2. lines contains an *insertion* not included in the patch context, or
            // 3. lines contains a *deletion* not included in the patch context
            // The first two options are of course only possible if the line from lines is non-null -
            // i.e. only option 3 is possible if we've overrun the end of the old file.
            return lines[toPos] && (applyHunk(hunkLines, toPos + 1, maxErrors - 1, hunkLinesI + 1, false, patchedLines, patchedLinesLength + 1) || applyHunk(hunkLines, toPos + 1, maxErrors - 1, hunkLinesI, false, patchedLines, patchedLinesLength + 1)) || applyHunk(hunkLines, toPos, maxErrors - 1, hunkLinesI + 1, false, patchedLines, patchedLinesLength);
          }
        }
      }

      // Before returning, trim any unmodified context lines off the end of patchedLines and reduce
      // toPos (and thus oldLineLastI) accordingly. This allows later hunks to be applied to a region
      // that starts in this hunk's trailing context.
      patchedLinesLength -= nConsecutiveOldContextLines;
      toPos -= nConsecutiveOldContextLines;
      patchedLines.length = patchedLinesLength;
      return {
        patchedLines: patchedLines,
        oldLineLastI: toPos - 1
      };
    }
    var resultLines = [];

    // Search best fit offsets for each hunk based on the previous ones
    var prevHunkOffset = 0;
    for (var _i = 0; _i < hunks.length; _i++) {
      var hunk = hunks[_i];
      var hunkResult = void 0;
      var maxLine = lines.length - hunk.oldLines + fuzzFactor;
      var toPos = void 0;
      for (var maxErrors = 0; maxErrors <= fuzzFactor; maxErrors++) {
        toPos = hunk.oldStart + prevHunkOffset - 1;
        var iterator = distanceIterator(toPos, minLine, maxLine);
        for (; toPos !== undefined; toPos = iterator()) {
          hunkResult = applyHunk(hunk.lines, toPos, maxErrors);
          if (hunkResult) {
            break;
          }
        }
        if (hunkResult) {
          break;
        }
      }
      if (!hunkResult) {
        return false;
      }

      // Copy everything from the end of where we applied the last hunk to the start of this hunk
      for (var _i2 = minLine; _i2 < toPos; _i2++) {
        resultLines.push(lines[_i2]);
      }

      // Add the lines produced by applying the hunk:
      for (var _i3 = 0; _i3 < hunkResult.patchedLines.length; _i3++) {
        var _line = hunkResult.patchedLines[_i3];
        resultLines.push(_line);
      }

      // Set lower text limit to end of the current hunk, so next ones don't try
      // to fit over already patched text
      minLine = hunkResult.oldLineLastI + 1;

      // Note the offset between where the patch said the hunk should've applied and where we
      // applied it, so we can adjust future hunks accordingly:
      prevHunkOffset = toPos + 1 - hunk.oldStart;
    }

    // Copy over the rest of the lines from the old text
    for (var _i4 = minLine; _i4 < lines.length; _i4++) {
      resultLines.push(lines[_i4]);
    }
    return resultLines.join('\n');
  }

  // Wrapper that supports multiple file patches via callbacks.
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
    if (typeof options === 'function') {
      options = {
        callback: options
      };
    }
    if (typeof options.context === 'undefined') {
      options.context = 4;
    }
    if (options.newlineIsToken) {
      throw new Error('newlineIsToken may not be used with patch-generation functions, only with diffing functions');
    }
    if (!options.callback) {
      return diffLinesResultToPatch(diffLines(oldStr, newStr, options));
    } else {
      var _options = options,
        _callback = _options.callback;
      diffLines(oldStr, newStr, _objectSpread2(_objectSpread2({}, options), {}, {
        callback: function callback(diff) {
          var patch = diffLinesResultToPatch(diff);
          _callback(patch);
        }
      }));
    }
    function diffLinesResultToPatch(diff) {
      // STEP 1: Build up the patch with no "\ No newline at end of file" lines and with the arrays
      //         of lines containing trailing newline characters. We'll tidy up later...

      if (!diff) {
        return;
      }
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
      var _loop = function _loop() {
        var current = diff[i],
          lines = current.lines || splitLines(current.value);
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
          }

          // Output our changes
          (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function (entry) {
            return (current.added ? '+' : '-') + entry;
          })));

          // Track the updated file position
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
              var _hunk = {
                oldStart: oldRangeStart,
                oldLines: oldLine - oldRangeStart + contextSize,
                newStart: newRangeStart,
                newLines: newLine - newRangeStart + contextSize,
                lines: curRange
              };
              hunks.push(_hunk);
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
        _loop();
      }

      // Step 2: eliminate the trailing `\n` from each line of each hunk, and, where needed, add
      //         "\ No newline at end of file".
      for (var _i = 0, _hunks = hunks; _i < _hunks.length; _i++) {
        var hunk = _hunks[_i];
        for (var _i2 = 0; _i2 < hunk.lines.length; _i2++) {
          if (hunk.lines[_i2].endsWith('\n')) {
            hunk.lines[_i2] = hunk.lines[_i2].slice(0, -1);
          } else {
            hunk.lines.splice(_i2 + 1, 0, '\\ No newline at end of file');
            _i2++; // Skip the line we just added, then continue iterating
          }
        }
      }
      return {
        oldFileName: oldFileName,
        newFileName: newFileName,
        oldHeader: oldHeader,
        newHeader: newHeader,
        hunks: hunks
      };
    }
  }
  function formatPatch(diff) {
    if (Array.isArray(diff)) {
      return diff.map(formatPatch).join('\n');
    }
    var ret = [];
    if (diff.oldFileName == diff.newFileName) {
      ret.push('Index: ' + diff.oldFileName);
    }
    ret.push('===================================================================');
    ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
    ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));
    for (var i = 0; i < diff.hunks.length; i++) {
      var hunk = diff.hunks[i];
      // Unified Diff Format quirk: If the chunk size is 0,
      // the first number is one lower than one would expect.
      // https://www.artima.com/weblogs/viewpost.jsp?thread=164293
      if (hunk.oldLines === 0) {
        hunk.oldStart -= 1;
      }
      if (hunk.newLines === 0) {
        hunk.newStart -= 1;
      }
      ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
      ret.push.apply(ret, hunk.lines);
    }
    return ret.join('\n') + '\n';
  }
  function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    var _options2;
    if (typeof options === 'function') {
      options = {
        callback: options
      };
    }
    if (!((_options2 = options) !== null && _options2 !== void 0 && _options2.callback)) {
      var patchObj = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
      if (!patchObj) {
        return;
      }
      return formatPatch(patchObj);
    } else {
      var _options3 = options,
        _callback2 = _options3.callback;
      structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, _objectSpread2(_objectSpread2({}, options), {}, {
        callback: function callback(patchObj) {
          if (!patchObj) {
            _callback2();
          } else {
            _callback2(formatPatch(patchObj));
          }
        }
      }));
    }
  }
  function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
    return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
  }

  /**
   * Split `text` into an array of lines, including the trailing newline character (where present)
   */
  function splitLines(text) {
    var hasTrailingNl = text.endsWith('\n');
    var result = text.split('\n').map(function (line) {
      return line + '\n';
    });
    if (hasTrailingNl) {
      result.pop();
    } else {
      result.push(result.pop().slice(0, -1));
    }
    return result;
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
    var ret = {};

    // For index we just let it pass through as it doesn't have any necessary meaning.
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
      };

    // Handle any leading content
    insertLeading(hunk, mine, their);
    insertLeading(hunk, their, mine);

    // Now in the overlap content. Scan through and select the best changes from each.
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
    }

    // Now push anything that may be remaining
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
      var line = state.lines[state.index];

      // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.
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
        match = matchChanges[matchIndex];

      // Once we've hit our add, then we are done
      if (match[0] === '+') {
        break;
      }
      contextChanges = contextChanges || change[0] !== ' ';
      merged.push(match);
      matchIndex++;

      // Consume any additions in the other block as a conflict to attempt
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

  function reversePatch(structuredPatch) {
    if (Array.isArray(structuredPatch)) {
      return structuredPatch.map(reversePatch).reverse();
    }
    return _objectSpread2(_objectSpread2({}, structuredPatch), {}, {
      oldFileName: structuredPatch.newFileName,
      oldHeader: structuredPatch.newHeader,
      newFileName: structuredPatch.oldFileName,
      newHeader: structuredPatch.oldHeader,
      hunks: structuredPatch.hunks.map(function (hunk) {
        return {
          oldLines: hunk.newLines,
          oldStart: hunk.newStart,
          newLines: hunk.oldLines,
          newStart: hunk.oldStart,
          lines: hunk.lines.map(function (l) {
            if (l.startsWith('-')) {
              return "+".concat(l.slice(1));
            }
            if (l.startsWith('+')) {
              return "-".concat(l.slice(1));
            }
            return l;
          })
        };
      })
    });
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

  exports.Diff = Diff;
  exports.applyPatch = applyPatch;
  exports.applyPatches = applyPatches;
  exports.canonicalize = canonicalize;
  exports.convertChangesToDMP = convertChangesToDMP;
  exports.convertChangesToXML = convertChangesToXML;
  exports.createPatch = createPatch;
  exports.createTwoFilesPatch = createTwoFilesPatch;
  exports.diffArrays = diffArrays;
  exports.diffChars = diffChars;
  exports.diffCss = diffCss;
  exports.diffJson = diffJson;
  exports.diffLines = diffLines;
  exports.diffSentences = diffSentences;
  exports.diffTrimmedLines = diffTrimmedLines;
  exports.diffWords = diffWords;
  exports.diffWordsWithSpace = diffWordsWithSpace;
  exports.formatPatch = formatPatch;
  exports.merge = merge;
  exports.parsePatch = parsePatch;
  exports.reversePatch = reversePatch;
  exports.structuredPatch = structuredPatch;

}));

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
'use strict';
module.exports = {
	stdout: false,
	stderr: false
};

},{}],94:[function(require,module,exports){
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

},{}]},{},[2])(2)
});
