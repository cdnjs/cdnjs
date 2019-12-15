/** MobX - (c) Michel Weststrate 2015 - 2018 - MIT Licensed */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const OBFUSCATED_ERROR$$1 = "An invariant failed, however the error is obfuscated because this is an production build.";
const EMPTY_ARRAY$$1 = [];
Object.freeze(EMPTY_ARRAY$$1);
const EMPTY_OBJECT$$1 = {};
Object.freeze(EMPTY_OBJECT$$1);
function getNextId$$1() {
    return ++globalState$$1.mobxGuid;
}
function fail$1(message) {
    invariant$$1(false, message);
    throw "X"; // unreachable
}
function invariant$$1(check, message) {
    if (!check)
        throw new Error("[mobx] " + (message || OBFUSCATED_ERROR$$1));
}

/**
 * Makes sure that the provided function is invoked at most once.
 */
function once$$1(func) {
    let invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
const noop$$1 = () => { };
function unique$$1(list) {
    const res = [];
    list.forEach(item => {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function isObject$$1(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject$$1(value) {
    if (value === null || typeof value !== "object")
        return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

function addHiddenProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value
    });
}
function addHiddenFinalProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value
    });
}
function isPropertyConfigurable$$1(object, prop) {
    const descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable$$1(object, prop) {
    if (process.env.NODE_ENV !== "production" && !isPropertyConfigurable$$1(object, prop))
        fail$1(`Cannot make property '${prop.toString()}' observable, it is not configurable and writable in the target object`);
}
function createInstanceofPredicate$$1(name, clazz) {
    const propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject$$1(x) && x[propName] === true;
    };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */
function isArrayLike$$1(x) {
    return Array.isArray(x) || isObservableArray$$1(x);
}
function isES6Map$$1(thing) {
    return thing instanceof Map;
}
function getMapLikeKeys$$1(map) {
    if (isPlainObject$$1(map))
        return Object.keys(map);
    if (Array.isArray(map))
        return map.map(([key]) => key);
    if (isES6Map$$1(map) || isObservableMap$$1(map))
        return Array.from(map.keys());
    return fail$1(`Cannot get keys from '${map}'`);
}
function toPrimitive$$1(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
}

const $mobx$$1 = Symbol("mobx administration");
class Atom$$1 {
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    constructor(name = "Atom@" + getNextId$$1()) {
        this.name = name;
        this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
        this.isBeingObserved = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = exports.IDerivationState.NOT_TRACKING;
    }
    onBecomeUnobserved() {
        // noop
    }
    onBecomeObserved() {
        /* noop */
    }
    /**
     * Invoke this method to notify mobx that your atom has been used somehow.
     * Returns true if there is currently a reactive context.
     */
    reportObserved() {
        return reportObserved$$1(this);
    }
    /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
    reportChanged() {
        startBatch$$1();
        propagateChanged$$1(this);
        endBatch$$1();
    }
    toString() {
        return this.name;
    }
}
const isAtom$$1 = createInstanceofPredicate$$1("Atom", Atom$$1);
function createAtom$$1(name, onBecomeObservedHandler = noop$$1, onBecomeUnobservedHandler = noop$$1) {
    const atom = new Atom$$1(name);
    onBecomeObserved$$1(atom, onBecomeObservedHandler);
    onBecomeUnobserved$$1(atom, onBecomeUnobservedHandler);
    return atom;
}

function identityComparer(a, b) {
    return a === b;
}
function structuralComparer(a, b) {
    return deepEqual$$1(a, b);
}
function defaultComparer(a, b) {
    return Object.is(a, b);
}
const comparer$$1 = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer
};

const mobxDidRunLazyInitializersSymbol$$1 = Symbol("mobx did run lazy initializers");
const mobxPendingDecorators$$1 = Symbol("mobx pending decorators");
const enumerableDescriptorCache = {};
const nonEnumerableDescriptorCache = {};
function createPropertyInitializerDescriptor(prop, enumerable) {
    const cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
    return (cache[prop] ||
        (cache[prop] = {
            configurable: true,
            enumerable: enumerable,
            get() {
                initializeInstance$$1(this);
                return this[prop];
            },
            set(value) {
                initializeInstance$$1(this);
                this[prop] = value;
            }
        }));
}
function initializeInstance$$1(target) {
    if (target[mobxDidRunLazyInitializersSymbol$$1] === true)
        return;
    const decorators = target[mobxPendingDecorators$$1];
    if (decorators) {
        addHiddenProp$$1(target, mobxDidRunLazyInitializersSymbol$$1, true);
        for (let key in decorators) {
            const d = decorators[key];
            d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
        }
    }
}
function createPropDecorator$$1(propertyInitiallyEnumerable, propertyCreator) {
    return function decoratorFactory() {
        let decoratorArguments;
        const decorator = function decorate$$1(target, prop, descriptor, applyImmediately
        // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
        // as the instance to apply the decorator to equals the target
        ) {
            if (applyImmediately === true) {
                propertyCreator(target, prop, descriptor, target, decoratorArguments);
                return null;
            }
            if (process.env.NODE_ENV !== "production" && !quacksLikeADecorator$$1(arguments))
                fail$1("This function is a decorator, but it wasn't invoked like a decorator");
            if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators$$1)) {
                const inheritedDecorators = target[mobxPendingDecorators$$1];
                addHiddenProp$$1(target, mobxPendingDecorators$$1, Object.assign({}, inheritedDecorators));
            }
            target[mobxPendingDecorators$$1][prop] = {
                prop,
                propertyCreator,
                descriptor,
                decoratorTarget: target,
                decoratorArguments
            };
            return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
        };
        if (quacksLikeADecorator$$1(arguments)) {
            // @decorator
            decoratorArguments = EMPTY_ARRAY$$1;
            return decorator.apply(null, arguments);
        }
        else {
            // @decorator(args)
            decoratorArguments = Array.prototype.slice.call(arguments);
            return decorator;
        }
    };
}
function quacksLikeADecorator$$1(args) {
    return (((args.length === 2 || args.length === 3) && typeof args[1] === "string") ||
        (args.length === 4 && args[3] === true));
}

function deepEnhancer$$1(v, _, name) {
    // it is an observable already, done
    if (isObservable$$1(v))
        return v;
    // something that can be converted and mutated?
    if (Array.isArray(v))
        return observable$$1.array(v, { name });
    if (isPlainObject$$1(v))
        return observable$$1.object(v, undefined, { name });
    if (isES6Map$$1(v))
        return observable$$1.map(v, { name });
    return v;
}
function shallowEnhancer$$1(v, _, name) {
    if (v === undefined || v === null)
        return v;
    if (isObservableObject$$1(v) || isObservableArray$$1(v) || isObservableMap$$1(v))
        return v;
    if (Array.isArray(v))
        return observable$$1.array(v, { name, deep: false });
    if (isPlainObject$$1(v))
        return observable$$1.object(v, undefined, { name, deep: false });
    if (isES6Map$$1(v))
        return observable$$1.map(v, { name, deep: false });
    return fail$1(process.env.NODE_ENV !== "production" &&
        "The shallow modifier / decorator can only used in combination with arrays, objects and maps");
}
function referenceEnhancer$$1(newValue) {
    // never turn into an observable
    return newValue;
}
function refStructEnhancer$$1(v, oldValue, name) {
    if (process.env.NODE_ENV !== "production" && isObservable$$1(v))
        throw `observable.struct should not be used with observable values`;
    if (deepEqual$$1(v, oldValue))
        return oldValue;
    return v;
}

function createDecoratorForEnhancer$$1(enhancer) {
    invariant$$1(enhancer);
    const decorator = createPropDecorator$$1(true, (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) => {
        if (process.env.NODE_ENV !== "production") {
            invariant$$1(!descriptor || !descriptor.get, `@observable cannot be used on getter (property "${propertyName}"), use @computed instead.`);
        }
        const initialValue = descriptor
            ? descriptor.initializer
                ? descriptor.initializer.call(target)
                : descriptor.value
            : undefined;
        asObservableObject$$1(target).addObservableProp(propertyName, initialValue, enhancer);
    });
    const res = 
    // Extra process checks, as this happens during module initialization
    typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production"
        ? function observableDecorator() {
            // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
            // and simply return the created prop decorator
            if (arguments.length < 2)
                return fail$1("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
            return decorator.apply(null, arguments);
        }
        : decorator;
    res.enhancer = enhancer;
    return res;
}

// Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases
const defaultCreateObservableOptions$$1 = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
};
Object.freeze(defaultCreateObservableOptions$$1);
function assertValidOption(key) {
    if (!/^(deep|name|defaultDecorator|proxy)$/.test(key))
        fail$1(`invalid option for (extend)observable: ${key}`);
}
function asCreateObservableOptions$$1(thing) {
    if (thing === null || thing === undefined)
        return defaultCreateObservableOptions$$1;
    if (typeof thing === "string")
        return { name: thing, deep: true, proxy: true };
    if (process.env.NODE_ENV !== "production") {
        if (typeof thing !== "object")
            return fail$1("expected options object");
        Object.keys(thing).forEach(assertValidOption);
    }
    return thing;
}
const deepDecorator$$1 = createDecoratorForEnhancer$$1(deepEnhancer$$1);
const shallowDecorator = createDecoratorForEnhancer$$1(shallowEnhancer$$1);
const refDecorator$$1 = createDecoratorForEnhancer$$1(referenceEnhancer$$1);
const refStructDecorator = createDecoratorForEnhancer$$1(refStructEnhancer$$1);
function getEnhancerFromOptions(options) {
    return options.defaultDecorator
        ? options.defaultDecorator.enhancer
        : options.deep === false
            ? referenceEnhancer$$1
            : deepEnhancer$$1;
}
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */
function createObservable(v, arg2, arg3) {
    // @observable someProp;
    if (typeof arguments[1] === "string") {
        return deepDecorator$$1.apply(null, arguments);
    }
    // it is an observable already, done
    if (isObservable$$1(v))
        return v;
    // something that can be converted and mutated?
    const res = isPlainObject$$1(v)
        ? observable$$1.object(v, arg2, arg3)
        : Array.isArray(v)
            ? observable$$1.array(v, arg2)
            : isES6Map$$1(v)
                ? observable$$1.map(v, arg2)
                : v;
    // this value could be converted to a new observable data structure, return it
    if (res !== v)
        return res;
    // otherwise, just box it
    fail$1(process.env.NODE_ENV !== "production" &&
        `The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'`);
}
const observableFactories = {
    box(value, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("box");
        const o = asCreateObservableOptions$$1(options);
        return new ObservableValue$$1(value, getEnhancerFromOptions(o), o.name);
    },
    array(initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        const o = asCreateObservableOptions$$1(options);
        return createObservableArray$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map(initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        const o = asCreateObservableOptions$$1(options);
        return new ObservableMap$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object(props, decorators, options) {
        if (typeof arguments[1] === "string")
            incorrectlyUsedAsDecorator("object");
        const o = asCreateObservableOptions$$1(options);
        if (o.proxy === false) {
            return extendObservable$$1({}, props, decorators, o);
        }
        else {
            const defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(o);
            const base = extendObservable$$1({}, undefined, undefined, o);
            const proxy = createDynamicObservableObject$$1(base);
            extendObservableObjectWithProperties$$1(proxy, props, decorators, defaultDecorator);
            return proxy;
        }
    },
    ref: refDecorator$$1,
    shallow: shallowDecorator,
    deep: deepDecorator$$1,
    struct: refStructDecorator
};
const observable$$1 = createObservable;
// weird trick to keep our typings nicely with our funcs, and still extend the observable function
Object.keys(observableFactories).forEach(name => (observable$$1[name] = observableFactories[name]));
function incorrectlyUsedAsDecorator(methodName) {
    fail$1(
    // process.env.NODE_ENV !== "production" &&
    `Expected one or two arguments to observable.${methodName}. Did you accidentally try to use observable.${methodName} as decorator?`);
}

const computedDecorator$$1 = createPropDecorator$$1(false, (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) => {
    const { get: get$$1, set: set$$1 } = descriptor; // initialValue is the descriptor for get / set props
    // Optimization: faster on decorator target or instance? Assuming target
    // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
    const options = decoratorArgs[0] || {};
    asObservableObject$$1(instance).addComputedProp(decoratorTarget, propertyName, Object.assign({ get: get$$1,
        set: set$$1, context: instance }, options));
});
const computedStructDecorator = computedDecorator$$1({ equals: comparer$$1.structural });
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed$$1 = function computed$$1(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        // @computed
        return computedDecorator$$1.apply(null, arguments);
    }
    if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
        // @computed({ options })
        return computedDecorator$$1.apply(null, arguments);
    }
    // computed(expr, options?)
    if (process.env.NODE_ENV !== "production") {
        invariant$$1(typeof arg1 === "function", "First argument to `computed` should be an expression.");
        invariant$$1(arguments.length < 3, "Computed takes one or two arguments if used as function");
    }
    const opts = typeof arg2 === "object" ? arg2 : {};
    opts.get = arg1;
    opts.set = typeof arg2 === "function" ? arg2 : opts.set;
    opts.name = opts.name || arg1.name || ""; /* for generated name */
    return new ComputedValue$$1(opts);
};
computed$$1.struct = computedStructDecorator;

function createAction$$1(actionName, fn) {
    if (process.env.NODE_ENV !== "production") {
        invariant$$1(typeof fn === "function", "`action` can only be invoked on functions");
        if (typeof actionName !== "string" || !actionName)
            fail$1(`actions should have valid names, got: '${actionName}'`);
    }
    const res = function () {
        return executeAction$$1(actionName, fn, this, arguments);
    };
    res.isMobxAction = true;
    return res;
}
function executeAction$$1(actionName, fn, scope, args) {
    const runInfo = startAction(actionName, fn, scope, args);
    try {
        return fn.apply(scope, args);
    }
    finally {
        endAction(runInfo);
    }
}
function startAction(actionName, fn, scope, args) {
    const notifySpy = isSpyEnabled$$1() && !!actionName;
    let startTime = 0;
    if (notifySpy && process.env.NODE_ENV !== "production") {
        startTime = Date.now();
        const l = (args && args.length) || 0;
        const flattendArgs = new Array(l);
        if (l > 0)
            for (let i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart$$1({
            type: "action",
            name: actionName,
            object: scope,
            arguments: flattendArgs
        });
    }
    const prevDerivation = untrackedStart$$1();
    startBatch$$1();
    const prevAllowStateChanges = allowStateChangesStart$$1(true);
    return {
        prevDerivation,
        prevAllowStateChanges,
        notifySpy,
        startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd$$1(runInfo.prevAllowStateChanges);
    endBatch$$1();
    untrackedEnd$$1(runInfo.prevDerivation);
    if (runInfo.notifySpy && process.env.NODE_ENV !== "production")
        spyReportEnd$$1({ time: Date.now() - runInfo.startTime });
}
function allowStateChanges$$1(allowStateChanges$$1, func) {
    const prev = allowStateChangesStart$$1(allowStateChanges$$1);
    let res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd$$1(prev);
    }
    return res;
}
function allowStateChangesStart$$1(allowStateChanges$$1) {
    const prev = globalState$$1.allowStateChanges;
    globalState$$1.allowStateChanges = allowStateChanges$$1;
    return prev;
}
function allowStateChangesEnd$$1(prev) {
    globalState$$1.allowStateChanges = prev;
}

const UNCHANGED$$1 = {};
class ObservableValue$$1 extends Atom$$1 {
    constructor(value, enhancer, name = "ObservableValue@" + getNextId$$1(), notifySpy = true) {
        super(name);
        this.enhancer = enhancer;
        this.hasUnreportedChange = false;
        this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
            // only notify spy if this is a stand-alone observable
            spyReport$$1({ type: "create", name: this.name, newValue: "" + this.value });
        }
    }
    dehanceValue(value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    }
    set(newValue) {
        const oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED$$1) {
            const notifySpy = isSpyEnabled$$1();
            if (notifySpy && process.env.NODE_ENV !== "production") {
                spyReportStart$$1({
                    type: "update",
                    name: this.name,
                    newValue,
                    oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd$$1();
        }
    }
    prepareNewValue(newValue) {
        checkIfStateModificationsAreAllowed$$1(this);
        if (hasInterceptors$$1(this)) {
            const change = interceptChange$$1(this, {
                object: this,
                type: "update",
                newValue
            });
            if (!change)
                return UNCHANGED$$1;
            newValue = change.newValue;
        }
        // apply modifier
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.value !== newValue ? newValue : UNCHANGED$$1;
    }
    setNewValue(newValue) {
        const oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners$$1(this)) {
            notifyListeners$$1(this, {
                type: "update",
                object: this,
                newValue,
                oldValue
            });
        }
    }
    get() {
        this.reportObserved();
        return this.dehanceValue(this.value);
    }
    intercept(handler) {
        return registerInterceptor$$1(this, handler);
    }
    observe(listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener$$1(this, listener);
    }
    toJSON() {
        return this.get();
    }
    toString() {
        return `${this.name}[${this.value}]`;
    }
    valueOf() {
        return toPrimitive$$1(this.get());
    }
    [Symbol.toPrimitive]() {
        return this.valueOf();
    }
}
var isObservableValue$$1 = createInstanceofPredicate$$1("ObservableValue", ObservableValue$$1);

/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember the result of the computation for the duration of the batch, or
 * while being observed.
 *
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */
class ComputedValue$$1 {
    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `equals` property specifies the comparer function to use to determine if a newly produced
     * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
     * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
     * Structural comparison can be convenient if you always produce a new aggregated object and
     * don't want to notify observers if it is structurally the same.
     * This is useful for working with vectors, mouse coordinates etc.
     */
    constructor(options) {
        this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = null; // during tracking it's an array with new observed observers
        this.isBeingObserved = false;
        this.isPendingUnobservation = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId$$1();
        this.value = new CaughtException$$1(null);
        this.isComputing = false; // to check for cycles
        this.isRunningSetter = false;
        this.isTracing = TraceMode$$1.NONE;
        this.firstGet = true;
        if (process.env.NODE_ENV !== "production" && !options.get)
            throw "[mobx] missing option for computed: get";
        this.derivation = options.get;
        this.name = options.name || "ComputedValue@" + getNextId$$1();
        if (options.set)
            this.setter = createAction$$1(this.name + "-setter", options.set);
        this.equals =
            options.equals ||
                (options.compareStructural || options.struct
                    ? comparer$$1.structural
                    : comparer$$1.default);
        this.scope = options.context;
        this.requiresReaction = !!options.requiresReaction;
        this.keepAlive = !!options.keepAlive;
    }
    onBecomeStale() {
        propagateMaybeChanged$$1(this);
    }
    onBecomeUnobserved() { }
    onBecomeObserved() { }
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    get() {
        if (this.keepAlive && this.firstGet) {
            this.firstGet = false;
            autorun$$1(() => this.get());
        }
        if (this.isComputing)
            fail$1(`Cycle detected in computation ${this.name}: ${this.derivation}`);
        if (globalState$$1.inBatch === 0 && this.observers.size === 0) {
            if (shouldCompute$$1(this)) {
                this.warnAboutUntrackedRead();
                startBatch$$1(); // See perf test 'computed memoization'
                this.value = this.computeValue(false);
                endBatch$$1();
            }
        }
        else {
            reportObserved$$1(this);
            if (shouldCompute$$1(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed$$1(this);
        }
        const result = this.value;
        if (isCaughtException$$1(result))
            throw result.cause;
        return result;
    }
    peek() {
        const res = this.computeValue(false);
        if (isCaughtException$$1(res))
            throw res.cause;
        return res;
    }
    set(value) {
        if (this.setter) {
            invariant$$1(!this.isRunningSetter, `The setter of computed value '${this.name}' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?`);
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant$$1(false, process.env.NODE_ENV !== "production" &&
                `[ComputedValue '${this.name}'] It is not possible to assign a new value to a computed value.`);
    }
    trackAndCompute() {
        if (isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
            spyReport$$1({
                object: this.scope,
                type: "compute",
                name: this.name
            });
        }
        const oldValue = this.value;
        const wasSuspended = 
        /* see #1208 */ this.dependenciesState === exports.IDerivationState.NOT_TRACKING;
        const newValue = this.computeValue(true);
        const changed = wasSuspended ||
            isCaughtException$$1(oldValue) ||
            isCaughtException$$1(newValue) ||
            !this.equals(oldValue, newValue);
        if (changed) {
            this.value = newValue;
        }
        return changed;
    }
    computeValue(track) {
        this.isComputing = true;
        globalState$$1.computationDepth++;
        let res;
        if (track) {
            res = trackDerivedFunction$$1(this, this.derivation, this.scope);
        }
        else {
            if (globalState$$1.disableErrorBoundaries === true) {
                res = this.derivation.call(this.scope);
            }
            else {
                try {
                    res = this.derivation.call(this.scope);
                }
                catch (e) {
                    res = new CaughtException$$1(e);
                }
            }
        }
        globalState$$1.computationDepth--;
        this.isComputing = false;
        return res;
    }
    suspend() {
        clearObserving$$1(this);
        this.value = undefined; // don't hold on to computed value!
    }
    observe(listener, fireImmediately) {
        let firstTime = true;
        let prevValue = undefined;
        return autorun$$1(() => {
            let newValue = this.get();
            if (!firstTime || fireImmediately) {
                const prevU = untrackedStart$$1();
                listener({
                    type: "update",
                    object: this,
                    newValue,
                    oldValue: prevValue
                });
                untrackedEnd$$1(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    }
    warnAboutUntrackedRead() {
        if (process.env.NODE_ENV === "production")
            return;
        if (this.requiresReaction === true) {
            fail$1(`[mobx] Computed value ${this.name} is read outside a reactive context`);
        }
        if (this.isTracing !== TraceMode$$1.NONE) {
            console.log(`[mobx.trace] '${this.name}' is being read outside a reactive context. Doing a full recompute`);
        }
        if (globalState$$1.computedRequiresReaction) {
            console.warn(`[mobx] Computed value ${this.name} is being read outside a reactive context. Doing a full recompute`);
        }
    }
    toJSON() {
        return this.get();
    }
    toString() {
        return `${this.name}[${this.derivation.toString()}]`;
    }
    valueOf() {
        return toPrimitive$$1(this.get());
    }
    [Symbol.toPrimitive]() {
        return this.valueOf();
    }
}
const isComputedValue$$1 = createInstanceofPredicate$$1("ComputedValue", ComputedValue$$1);

(function (IDerivationState$$1) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState$$1[IDerivationState$$1["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast
    IDerivationState$$1[IDerivationState$$1["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed
    IDerivationState$$1[IDerivationState$$1["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    // A shallow dependency has changed since last computation and the derivation
    // will need to recompute when it's needed next.
    IDerivationState$$1[IDerivationState$$1["STALE"] = 2] = "STALE";
})(exports.IDerivationState || (exports.IDerivationState = {}));
var TraceMode$$1;
(function (TraceMode$$1) {
    TraceMode$$1[TraceMode$$1["NONE"] = 0] = "NONE";
    TraceMode$$1[TraceMode$$1["LOG"] = 1] = "LOG";
    TraceMode$$1[TraceMode$$1["BREAK"] = 2] = "BREAK";
})(TraceMode$$1 || (TraceMode$$1 = {}));
class CaughtException$$1 {
    constructor(cause) {
        this.cause = cause;
        // Empty
    }
}
function isCaughtException$$1(e) {
    return e instanceof CaughtException$$1;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */
function shouldCompute$$1(derivation) {
    switch (derivation.dependenciesState) {
        case exports.IDerivationState.UP_TO_DATE:
            return false;
        case exports.IDerivationState.NOT_TRACKING:
        case exports.IDerivationState.STALE:
            return true;
        case exports.IDerivationState.POSSIBLY_STALE: {
            const prevUntracked = untrackedStart$$1(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
            const obs = derivation.observing, l = obs.length;
            for (let i = 0; i < l; i++) {
                const obj = obs[i];
                if (isComputedValue$$1(obj)) {
                    if (globalState$$1.disableErrorBoundaries) {
                        obj.get();
                    }
                    else {
                        try {
                            obj.get();
                        }
                        catch (e) {
                            // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                            untrackedEnd$$1(prevUntracked);
                            return true;
                        }
                    }
                    // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                    // and `derivation` is an observer of `obj`
                    // invariantShouldCompute(derivation)
                    if (derivation.dependenciesState === exports.IDerivationState.STALE) {
                        untrackedEnd$$1(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0$$1(derivation);
            untrackedEnd$$1(prevUntracked);
            return false;
        }
    }
}
// function invariantShouldCompute(derivation: IDerivation) {
//     const newDepState = (derivation as any).dependenciesState
//     if (
//         process.env.NODE_ENV === "production" &&
//         (newDepState === IDerivationState.POSSIBLY_STALE ||
//             newDepState === IDerivationState.NOT_TRACKING)
//     )
//         fail("Illegal dependency state")
// }
function isComputingDerivation$$1() {
    return globalState$$1.trackingDerivation !== null; // filter out actions inside computations
}
function checkIfStateModificationsAreAllowed$$1(atom) {
    const hasObservers$$1 = atom.observers.size > 0;
    // Should never be possible to change an observed observable from inside computed, see #798
    if (globalState$$1.computationDepth > 0 && hasObservers$$1)
        fail$1(process.env.NODE_ENV !== "production" &&
            `Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: ${atom.name}`);
    // Should not be possible to change observed state outside strict mode, except during initialization, see #563
    if (!globalState$$1.allowStateChanges && (hasObservers$$1 || globalState$$1.enforceActions === "strict"))
        fail$1(process.env.NODE_ENV !== "production" &&
            (globalState$$1.enforceActions
                ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: "
                : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") +
                atom.name);
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction$$1(derivation, f, context) {
    // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies
    changeDependenciesStateTo0$$1(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState$$1.runId;
    const prevTracking = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = derivation;
    let result;
    if (globalState$$1.disableErrorBoundaries === true) {
        result = f.call(context);
    }
    else {
        try {
            result = f.call(context);
        }
        catch (e) {
            result = new CaughtException$$1(e);
        }
    }
    globalState$$1.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */
function bindDependencies(derivation) {
    // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
    const prevObserving = derivation.observing;
    const observing = (derivation.observing = derivation.newObserving);
    let lowestNewObservingDerivationState = exports.IDerivationState.UP_TO_DATE;
    // Go through all new observables and check diffValue: (this list can contain duplicates):
    //   0: first occurrence, change to 1 and keep it
    //   1: extra occurrence, drop it
    let i0 = 0, l = derivation.unboundDepsCount;
    for (let i = 0; i < l; i++) {
        const dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
        // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition
        if (dep.dependenciesState > lowestNewObservingDerivationState) {
            lowestNewObservingDerivationState = dep.dependenciesState;
        }
    }
    observing.length = i0;
    derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
    // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
    //   0: it's not in new observables, unobserve it
    //   1: it keeps being observed, don't want to notify it. change to 0
    l = prevObserving.length;
    while (l--) {
        const dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver$$1(dep, derivation);
        }
        dep.diffValue = 0;
    }
    // Go through all new observables and check diffValue: (now it should be unique)
    //   0: it was set to 0 in last loop. don't need to do anything.
    //   1: it wasn't observed, let's observe it. set back to 0
    while (i0--) {
        const dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver$$1(dep, derivation);
        }
    }
    // Some new observed derivations may become stale during this derivation computation
    // so they have had no chance to propagate staleness (#916)
    if (lowestNewObservingDerivationState !== exports.IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving$$1(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    const obs = derivation.observing;
    derivation.observing = [];
    let i = obs.length;
    while (i--)
        removeObserver$$1(obs[i], derivation);
    derivation.dependenciesState = exports.IDerivationState.NOT_TRACKING;
}
function untracked$$1(action$$1) {
    const prev = untrackedStart$$1();
    try {
        return action$$1();
    }
    finally {
        untrackedEnd$$1(prev);
    }
}
function untrackedStart$$1() {
    const prev = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = null;
    return prev;
}
function untrackedEnd$$1(prev) {
    globalState$$1.trackingDerivation = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0$$1(derivation) {
    if (derivation.dependenciesState === exports.IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = exports.IDerivationState.UP_TO_DATE;
    const obs = derivation.observing;
    let i = obs.length;
    while (i--)
        obs[i].lowestObserverState = exports.IDerivationState.UP_TO_DATE;
}

/**
 * These values will persist if global state is reset
 */
const persistentKeys = [
    "mobxGuid",
    "spyListeners",
    "enforceActions",
    "computedRequiresReaction",
    "disableErrorBoundaries",
    "runId"
];
class MobXGlobals$$1 {
    constructor() {
        /**
         * MobXGlobals version.
         * MobX compatiblity with other versions loaded in memory as long as this version matches.
         * It indicates that the global state still stores similar information
         */
        this.version = 5;
        /**
         * Currently running derivation
         */
        this.trackingDerivation = null;
        /**
         * Are we running a computation currently? (not a reaction)
         */
        this.computationDepth = 0;
        /**
         * Each time a derivation is tracked, it is assigned a unique run-id
         */
        this.runId = 0;
        /**
         * 'guid' for general purpose. Will be persisted amongst resets.
         */
        this.mobxGuid = 0;
        /**
         * Are we in a batch block? (and how many of them)
         */
        this.inBatch = 0;
        /**
         * Observables that don't have observers anymore, and are about to be
         * suspended, unless somebody else accesses it in the same batch
         *
         * @type {IObservable[]}
         */
        this.pendingUnobservations = [];
        /**
         * List of scheduled, not yet executed, reactions.
         */
        this.pendingReactions = [];
        /**
         * Are we currently processing reactions?
         */
        this.isRunningReactions = false;
        /**
         * Is it allowed to change observables at this point?
         * In general, MobX doesn't allow that when running computations and React.render.
         * To ensure that those functions stay pure.
         */
        this.allowStateChanges = true;
        /**
         * If strict mode is enabled, state changes are by default not allowed
         */
        this.enforceActions = false;
        /**
         * Spy callbacks
         */
        this.spyListeners = [];
        /**
         * Globally attached error handlers that react specifically to errors in reactions
         */
        this.globalReactionErrorHandlers = [];
        /**
         * Warn if computed values are accessed outside a reactive context
         */
        this.computedRequiresReaction = false;
        /*
         * Don't catch and rethrow exceptions. This is useful for inspecting the state of
         * the stack when an exception occurs while debugging.
         */
        this.disableErrorBoundaries = false;
    }
}
let globalState$$1 = new MobXGlobals$$1();
let runInIsolationCalled = false;
{
    const global = getGlobal$$1();
    if (!global.__mobxInstanceCount) {
        global.__mobxInstanceCount = 1;
    }
    else {
        global.__mobxInstanceCount++;
        setTimeout(() => {
            if (!runInIsolationCalled) {
                fail$1(process.env.NODE_ENV !== "production" &&
                    "There are multiple mobx instances active. This might lead to unexpected results. See https://github.com/mobxjs/mobx/issues/1082 for details.");
            }
        }, 1);
    }
}
function isolateGlobalState$$1() {
    runInIsolationCalled = true;
    getGlobal$$1().__mobxInstanceCount--;
}
function getGlobalState$$1() {
    return globalState$$1;
}
/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */
function resetGlobalState$$1() {
    const defaultGlobals = new MobXGlobals$$1();
    for (let key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState$$1[key] = defaultGlobals[key];
    globalState$$1.allowStateChanges = !globalState$$1.enforceActions;
}
function getGlobal$$1() {
    return typeof window !== "undefined" ? window : global;
}

function hasObservers$$1(observable$$1) {
    return observable$$1.observers && observable$$1.observers.size > 0;
}
function getObservers$$1(observable$$1) {
    return observable$$1.observers;
}
// function invariantObservers(observable: IObservable) {
//     const list = observable.observers
//     const map = observable.observersIndexes
//     const l = list.length
//     for (let i = 0; i < l; i++) {
//         const id = list[i].__mapid
//         if (i) {
//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
//         } else {
//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
//         }
//     }
//     invariant(
//         list.length === 0 || Object.keys(map).length === list.length - 1,
//         "INTERNAL ERROR there is no junk in map"
//     )
// }
function addObserver$$1(observable$$1, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    observable$$1.observers.add(node);
    if (observable$$1.lowestObserverState > node.dependenciesState)
        observable$$1.lowestObserverState = node.dependenciesState;
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}
function removeObserver$$1(observable$$1, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    observable$$1.observers.delete(node);
    if (observable$$1.observers.size === 0) {
        // deleting last observer
        queueForUnobservation$$1(observable$$1);
    }
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation$$1(observable$$1) {
    if (observable$$1.isPendingUnobservation === false) {
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable$$1.isPendingUnobservation = true;
        globalState$$1.pendingUnobservations.push(observable$$1);
    }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch$$1() {
    globalState$$1.inBatch++;
}
function endBatch$$1() {
    if (--globalState$$1.inBatch === 0) {
        runReactions$$1();
        // the batch is actually about to finish, all unobserving should happen here.
        const list = globalState$$1.pendingUnobservations;
        for (let i = 0; i < list.length; i++) {
            const observable$$1 = list[i];
            observable$$1.isPendingUnobservation = false;
            if (observable$$1.observers.size === 0) {
                if (observable$$1.isBeingObserved) {
                    // if this observable had reactive observers, trigger the hooks
                    observable$$1.isBeingObserved = false;
                    observable$$1.onBecomeUnobserved();
                }
                if (observable$$1 instanceof ComputedValue$$1) {
                    // computed values are automatically teared down when the last observer leaves
                    // this process happens recursively, this computed might be the last observabe of another, etc..
                    observable$$1.suspend();
                }
            }
        }
        globalState$$1.pendingUnobservations = [];
    }
}
function reportObserved$$1(observable$$1) {
    const derivation = globalState$$1.trackingDerivation;
    if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId !== observable$$1.lastAccessedBy) {
            observable$$1.lastAccessedBy = derivation.runId;
            // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...
            derivation.newObserving[derivation.unboundDepsCount++] = observable$$1;
            if (!observable$$1.isBeingObserved) {
                observable$$1.isBeingObserved = true;
                observable$$1.onBecomeObserved();
            }
        }
        return true;
    }
    else if (observable$$1.observers.size === 0 && globalState$$1.inBatch > 0) {
        queueForUnobservation$$1(observable$$1);
    }
    return false;
}
// function invariantLOS(observable: IObservable, msg: string) {
//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
//     throw new Error(
//         "lowestObserverState is wrong for " +
//             msg +
//             " because " +
//             min +
//             " < " +
//             observable.lowestObserverState
//     )
// }
/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes
function propagateChanged$$1(observable$$1) {
    // invariantLOS(observable, "changed start");
    if (observable$$1.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable$$1.lowestObserverState = exports.IDerivationState.STALE;
    for (const d of observable$$1.observers) {
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
            if (d.isTracing !== TraceMode$$1.NONE) {
                logTraceInfo(d, observable$$1);
            }
            d.onBecomeStale();
        }
        d.dependenciesState = exports.IDerivationState.STALE;
    }
    // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed$$1(observable$$1) {
    // invariantLOS(observable, "confirmed start");
    if (observable$$1.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable$$1.lowestObserverState = exports.IDerivationState.STALE;
    for (const d of observable$$1.observers) {
        if (d.dependenciesState === exports.IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = exports.IDerivationState.STALE;
        else if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
        )
            observable$$1.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
    }
    // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged$$1(observable$$1) {
    // invariantLOS(observable, "maybe start");
    if (observable$$1.lowestObserverState !== exports.IDerivationState.UP_TO_DATE)
        return;
    observable$$1.lowestObserverState = exports.IDerivationState.POSSIBLY_STALE;
    for (const d of observable$$1.observers) {
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
            d.dependenciesState = exports.IDerivationState.POSSIBLY_STALE;
            if (d.isTracing !== TraceMode$$1.NONE) {
                logTraceInfo(d, observable$$1);
            }
            d.onBecomeStale();
        }
    }
    // invariantLOS(observable, "maybe end");
}
function logTraceInfo(derivation, observable$$1) {
    console.log(`[mobx.trace] '${derivation.name}' is invalidated due to a change in: '${observable$$1.name}'`);
    if (derivation.isTracing === TraceMode$$1.BREAK) {
        const lines = [];
        printDepTree(getDependencyTree$$1(derivation), lines, 1);
        // prettier-ignore
        new Function(`debugger;
/*
Tracing '${derivation.name}'

You are entering this break point because derivation '${derivation.name}' is being traced and '${observable$$1.name}' is now forcing it to update.
Just follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update
The stackframe you are looking for is at least ~6-8 stack-frames up.

${derivation instanceof ComputedValue$$1 ? derivation.derivation.toString() : ""}

The dependencies for this derivation are:

${lines.join("\n")}
*/
    `)();
    }
}
function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
        lines.push("(and many more)");
        return;
    }
    lines.push(`${new Array(depth).join("\t")}${tree.name}`); // MWE: not the fastest, but the easiest way :)
    if (tree.dependencies)
        tree.dependencies.forEach(child => printDepTree(child, lines, depth + 1));
}

class Reaction$$1 {
    constructor(name = "Reaction@" + getNextId$$1(), onInvalidate, errorHandler) {
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.errorHandler = errorHandler;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId$$1();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
        this.isTracing = TraceMode$$1.NONE;
    }
    onBecomeStale() {
        this.schedule();
    }
    schedule() {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState$$1.pendingReactions.push(this);
            runReactions$$1();
        }
    }
    isScheduled() {
        return this._isScheduled;
    }
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    runReaction() {
        if (!this.isDisposed) {
            startBatch$$1();
            this._isScheduled = false;
            if (shouldCompute$$1(this)) {
                this._isTrackPending = true;
                try {
                    this.onInvalidate();
                    if (this._isTrackPending &&
                        isSpyEnabled$$1() &&
                        process.env.NODE_ENV !== "production") {
                        // onInvalidate didn't trigger track right away..
                        spyReport$$1({
                            name: this.name,
                            type: "scheduled-reaction"
                        });
                    }
                }
                catch (e) {
                    this.reportExceptionInDerivation(e);
                }
            }
            endBatch$$1();
        }
    }
    track(fn) {
        startBatch$$1();
        const notify = isSpyEnabled$$1();
        let startTime;
        if (notify && process.env.NODE_ENV !== "production") {
            startTime = Date.now();
            spyReportStart$$1({
                name: this.name,
                type: "reaction"
            });
        }
        this._isRunning = true;
        const result = trackDerivedFunction$$1(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving$$1(this);
        }
        if (isCaughtException$$1(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify && process.env.NODE_ENV !== "production") {
            spyReportEnd$$1({
                time: Date.now() - startTime
            });
        }
        endBatch$$1();
    }
    reportExceptionInDerivation(error) {
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        if (globalState$$1.disableErrorBoundaries)
            throw error;
        const message = `[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '${this}`;
        console.error(message, error);
        /** If debugging brought you here, please, read the above message :-). Tnx! */
        if (isSpyEnabled$$1()) {
            spyReport$$1({
                type: "error",
                name: this.name,
                message,
                error: "" + error
            });
        }
        globalState$$1.globalReactionErrorHandlers.forEach(f => f(error, this));
    }
    dispose() {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch$$1();
                clearObserving$$1(this);
                endBatch$$1();
            }
        }
    }
    getDisposer() {
        const r = this.dispose.bind(this);
        r[$mobx$$1] = this;
        return r;
    }
    toString() {
        return `Reaction[${this.name}]`;
    }
    trace(enterBreakPoint = false) {
        trace$$1(this, enterBreakPoint);
    }
}
function onReactionError$$1(handler) {
    globalState$$1.globalReactionErrorHandlers.push(handler);
    return () => {
        const idx = globalState$$1.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState$$1.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
const MAX_REACTION_ITERATIONS = 100;
let reactionScheduler = f => f();
function runReactions$$1() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState$$1.inBatch > 0 || globalState$$1.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState$$1.isRunningReactions = true;
    const allReactions = globalState$$1.pendingReactions;
    let iterations = 0;
    // While running reactions, new reactions might be triggered.
    // Hence we work with two variables and check whether
    // we converge to no remaining reactions after a while.
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error(`Reaction doesn't converge to a stable state after ${MAX_REACTION_ITERATIONS} iterations.` +
                ` Probably there is a cycle in the reactive function: ${allReactions[0]}`);
            allReactions.splice(0); // clear reactions
        }
        let remainingReactions = allReactions.splice(0);
        for (let i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState$$1.isRunningReactions = false;
}
const isReaction$$1 = createInstanceofPredicate$$1("Reaction", Reaction$$1);
function setReactionScheduler$$1(fn) {
    const baseScheduler = reactionScheduler;
    reactionScheduler = f => fn(() => baseScheduler(f));
}

function isSpyEnabled$$1() {
    return process.env.NODE_ENV !== "production" && !!globalState$$1.spyListeners.length;
}
function spyReport$$1(event) {
    if (process.env.NODE_ENV === "production")
        return; // dead code elimination can do the rest
    if (!globalState$$1.spyListeners.length)
        return;
    const listeners = globalState$$1.spyListeners;
    for (let i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart$$1(event) {
    if (process.env.NODE_ENV === "production")
        return;
    const change = Object.assign({}, event, { spyReportStart: true });
    spyReport$$1(change);
}
const END_EVENT = { spyReportEnd: true };
function spyReportEnd$$1(change) {
    if (process.env.NODE_ENV === "production")
        return;
    if (change)
        spyReport$$1(Object.assign({}, change, { spyReportEnd: true }));
    else
        spyReport$$1(END_EVENT);
}
function spy$$1(listener) {
    if (process.env.NODE_ENV === "production") {
        console.warn(`[mobx.spy] Is a no-op in production builds`);
        return function () { };
    }
    else {
        globalState$$1.spyListeners.push(listener);
        return once$$1(() => {
            globalState$$1.spyListeners = globalState$$1.spyListeners.filter(l => l !== listener);
        });
    }
}

function dontReassignFields() {
    fail$1(process.env.NODE_ENV !== "production" && "@action fields are not reassignable");
}
function namedActionDecorator$$1(name) {
    return function (target, prop, descriptor) {
        if (descriptor) {
            if (process.env.NODE_ENV !== "production" && descriptor.get !== undefined) {
                return fail$1("@action cannot be used with getters");
            }
            // babel / typescript
            // @action method() { }
            if (descriptor.value) {
                // typescript
                return {
                    value: createAction$$1(name, descriptor.value),
                    enumerable: false,
                    configurable: true,
                    writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)
                };
            }
            // babel only: @action method = () => {}
            const { initializer } = descriptor;
            return {
                enumerable: false,
                configurable: true,
                writable: true,
                initializer() {
                    // N.B: we can't immediately invoke initializer; this would be wrong
                    return createAction$$1(name, initializer.call(this));
                }
            };
        }
        // bound instance methods
        return actionFieldDecorator$$1(name).apply(this, arguments);
    };
}
function actionFieldDecorator$$1(name) {
    // Simple property that writes on first invocation to the current instance
    return function (target, prop, descriptor) {
        Object.defineProperty(target, prop, {
            configurable: true,
            enumerable: false,
            get() {
                return undefined;
            },
            set(value) {
                addHiddenProp$$1(this, prop, action$$1(name, value));
            }
        });
    };
}
function boundActionDecorator$$1(target, propertyName, descriptor, applyToInstance) {
    if (applyToInstance === true) {
        defineBoundAction$$1(target, propertyName, descriptor.value);
        return null;
    }
    if (descriptor) {
        // if (descriptor.value)
        // Typescript / Babel: @action.bound method() { }
        // also: babel @action.bound method = () => {}
        return {
            configurable: true,
            enumerable: false,
            get() {
                defineBoundAction$$1(this, propertyName, descriptor.value || descriptor.initializer.call(this));
                return this[propertyName];
            },
            set: dontReassignFields
        };
    }
    // field decorator Typescript @action.bound method = () => {}
    return {
        enumerable: false,
        configurable: true,
        set(v) {
            defineBoundAction$$1(this, propertyName, v);
        },
        get() {
            return undefined;
        }
    };
}

var action$$1 = function action$$1(arg1, arg2, arg3, arg4) {
    // action(fn() {})
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction$$1(arg1.name || "<unnamed action>", arg1);
    // action("name", fn() {})
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction$$1(arg1, arg2);
    // @action("name") fn() {}
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator$$1(arg1);
    // @action fn() {}
    if (arg4 === true) {
        // apply to instance immediately
        addHiddenProp$$1(arg1, arg2, createAction$$1(arg1.name || arg2, arg3.value));
    }
    else {
        return namedActionDecorator$$1(arg2).apply(null, arguments);
    }
};
action$$1.bound = boundActionDecorator$$1;
function runInAction$$1(arg1, arg2) {
    const actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    const fn = typeof arg1 === "function" ? arg1 : arg2;
    if (process.env.NODE_ENV !== "production") {
        invariant$$1(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
        if (typeof actionName !== "string" || !actionName)
            fail$1(`actions should have valid names, got: '${actionName}'`);
    }
    return executeAction$$1(actionName, fn, this, undefined);
}
function isAction$$1(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
function defineBoundAction$$1(target, propertyName, fn) {
    addHiddenProp$$1(target, propertyName, createAction$$1(propertyName, fn.bind(target)));
}

/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
function autorun$$1(view, opts = EMPTY_OBJECT$$1) {
    if (process.env.NODE_ENV !== "production") {
        invariant$$1(typeof view === "function", "Autorun expects a function as first argument");
        invariant$$1(isAction$$1(view) === false, "Autorun does not accept actions since actions are untrackable");
    }
    const name = (opts && opts.name) || view.name || "Autorun@" + getNextId$$1();
    const runSync = !opts.scheduler && !opts.delay;
    let reaction$$1;
    if (runSync) {
        // normal autorun
        reaction$$1 = new Reaction$$1(name, function () {
            this.track(reactionRunner);
        }, opts.onError);
    }
    else {
        const scheduler = createSchedulerFromOptions(opts);
        // debounced autorun
        let isScheduled = false;
        reaction$$1 = new Reaction$$1(name, () => {
            if (!isScheduled) {
                isScheduled = true;
                scheduler(() => {
                    isScheduled = false;
                    if (!reaction$$1.isDisposed)
                        reaction$$1.track(reactionRunner);
                });
            }
        }, opts.onError);
    }
    function reactionRunner() {
        view(reaction$$1);
    }
    reaction$$1.schedule();
    return reaction$$1.getDisposer();
}
const run = (f) => f();
function createSchedulerFromOptions(opts) {
    return opts.scheduler
        ? opts.scheduler
        : opts.delay
            ? (f) => setTimeout(f, opts.delay)
            : run;
}
function reaction$$1(expression, effect, opts = EMPTY_OBJECT$$1) {
    if (process.env.NODE_ENV !== "production") {
        invariant$$1(typeof expression === "function", "First argument to reaction should be a function");
        invariant$$1(typeof opts === "object", "Third argument of reactions should be an object");
    }
    const name = opts.name || "Reaction@" + getNextId$$1();
    const effectAction = action$$1(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    const runSync = !opts.scheduler && !opts.delay;
    const scheduler = createSchedulerFromOptions(opts);
    let firstTime = true;
    let isScheduled = false;
    let value;
    const equals = opts.compareStructural
        ? comparer$$1.structural
        : opts.equals || comparer$$1.default;
    const r = new Reaction$$1(name, () => {
        if (firstTime || runSync) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            scheduler(reactionRunner);
        }
    }, opts.onError);
    function reactionRunner() {
        isScheduled = false; // Q: move into reaction runner?
        if (r.isDisposed)
            return;
        let changed = false;
        r.track(() => {
            const nextValue = expression(r);
            changed = firstTime || !equals(value, nextValue);
            value = nextValue;
        });
        if (firstTime && opts.fireImmediately)
            effectAction(value, r);
        if (!firstTime && changed === true)
            effectAction(value, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
function wrapErrorHandler(errorHandler, baseFn) {
    return function () {
        try {
            return baseFn.apply(this, arguments);
        }
        catch (e) {
            errorHandler.call(this, e);
        }
    };
}

function onBecomeObserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeObserved", thing, arg2, arg3);
}
function onBecomeUnobserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
    const atom = typeof arg2 === "string" ? getAtom$$1(thing, arg2) : getAtom$$1(thing);
    const cb = typeof arg2 === "string" ? arg3 : arg2;
    const orig = atom[hook];
    if (typeof orig !== "function")
        return fail$1(process.env.NODE_ENV !== "production" && "Not an atom that can be (un)observed");
    atom[hook] = function () {
        orig.call(this);
        cb.call(this);
    };
    return function () {
        atom[hook] = orig;
    };
}

function configure$$1(options) {
    const { enforceActions, computedRequiresReaction, disableErrorBoundaries, reactionScheduler } = options;
    if (enforceActions !== undefined) {
        if (typeof enforceActions !== "boolean" && enforceActions !== "strict")
            return fail(`Invalid configuration for 'enforceActions': ${enforceActions}`);
        globalState$$1.enforceActions = enforceActions;
        globalState$$1.allowStateChanges =
            enforceActions === true || enforceActions === "strict" ? false : true;
    }
    if (computedRequiresReaction !== undefined) {
        globalState$$1.computedRequiresReaction = !!computedRequiresReaction;
    }
    if (options.isolateGlobalState === true) {
        isolateGlobalState$$1();
    }
    if (disableErrorBoundaries !== undefined) {
        if (disableErrorBoundaries === true)
            console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
        globalState$$1.disableErrorBoundaries = !!disableErrorBoundaries;
    }
    if (reactionScheduler) {
        setReactionScheduler$$1(reactionScheduler);
    }
}

function decorate$$1(thing, decorators) {
    process.env.NODE_ENV !== "production" &&
        invariant$$1(isPlainObject$$1(decorators), "Decorators should be a key value map");
    const target = typeof thing === "function" ? thing.prototype : thing;
    for (let prop in decorators) {
        const decorator = decorators[prop];
        process.env.NODE_ENV !== "production" &&
            invariant$$1(typeof decorator === "function", `Decorate: expected a decorator function for '${prop}'`);
        const descriptor = Object.getOwnPropertyDescriptor(target, prop);
        const newDescriptor = decorator(target, prop, descriptor);
        if (newDescriptor)
            Object.defineProperty(target, prop, newDescriptor);
    }
    return thing;
}

function extendObservable$$1(target, properties, decorators, options) {
    if (process.env.NODE_ENV !== "production") {
        invariant$$1(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
        invariant$$1(typeof target === "object", "'extendObservable' expects an object as first argument");
        invariant$$1(!isObservableMap$$1(target), "'extendObservable' should not be used on maps, use map.merge instead");
    }
    options = asCreateObservableOptions$$1(options);
    const defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(options);
    asObservableObject$$1(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props
    if (properties)
        extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator);
    return target;
}
function getDefaultDecoratorFromObjectOptions$$1(options) {
    return options.defaultDecorator || (options.deep === false ? refDecorator$$1 : deepDecorator$$1);
}
function extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator) {
    if (process.env.NODE_ENV !== "production") {
        invariant$$1(!isObservable$$1(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
        if (decorators)
            for (let key in decorators)
                if (!(key in properties))
                    fail$1(`Trying to declare a decorator for unspecified property '${key}'`);
    }
    startBatch$$1();
    try {
        for (let key in properties) {
            const descriptor = Object.getOwnPropertyDescriptor(properties, key);
            if (process.env.NODE_ENV !== "production") {
                if (Object.getOwnPropertyDescriptor(target, key))
                    fail$1(`'extendObservable' can only be used to introduce new properties. Use 'set' or 'decorate' instead. The property '${key}' already exists on '${target}'`);
                if (isComputed$$1(descriptor.value))
                    fail$1(`Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead`);
            }
            const decorator = decorators && key in decorators
                ? decorators[key]
                : descriptor.get
                    ? computedDecorator$$1
                    : defaultDecorator;
            if (process.env.NODE_ENV !== "production" && typeof decorator !== "function")
                fail$1(`Not a valid decorator for '${key}', got: ${decorator}`);
            const resultDescriptor = decorator(target, key, descriptor, true);
            if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
            )
                Object.defineProperty(target, key, resultDescriptor);
        }
    }
    finally {
        endBatch$$1();
    }
}

function getDependencyTree$$1(thing, property) {
    return nodeToDependencyTree(getAtom$$1(thing, property));
}
function nodeToDependencyTree(node) {
    const result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique$$1(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree$$1(thing, property) {
    return nodeToObserverTree(getAtom$$1(thing, property));
}
function nodeToObserverTree(node) {
    const result = {
        name: node.name
    };
    if (hasObservers$$1(node))
        result.observers = Array.from(getObservers$$1(node)).map(nodeToObserverTree);
    return result;
}

let generatorId = 0;
function flow$$1(generator) {
    if (arguments.length !== 1)
        fail$1(process.env.NODE_ENV && `Flow expects one 1 argument and cannot be used as decorator`);
    const name = generator.name || "<unnamed flow>";
    // Implementation based on https://github.com/tj/co/blob/master/index.js
    return function () {
        const ctx = this;
        const args = arguments;
        const runId = ++generatorId;
        const gen = action$$1(`${name} - runid: ${runId} - init`, generator).apply(ctx, args);
        let rejector;
        let pendingPromise = undefined;
        const res = new Promise(function (resolve, reject) {
            let stepId = 0;
            rejector = reject;
            function onFulfilled(res) {
                pendingPromise = undefined;
                let ret;
                try {
                    ret = action$$1(`${name} - runid: ${runId} - yield ${stepId++}`, gen.next).call(gen, res);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function onRejected(err) {
                pendingPromise = undefined;
                let ret;
                try {
                    ret = action$$1(`${name} - runid: ${runId} - yield ${stepId++}`, gen.throw).call(gen, err);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function next(ret) {
                if (ret && typeof ret.then === "function") {
                    // an async iterator
                    ret.then(next, reject);
                    return;
                }
                if (ret.done)
                    return resolve(ret.value);
                pendingPromise = Promise.resolve(ret.value);
                return pendingPromise.then(onFulfilled, onRejected);
            }
            onFulfilled(undefined); // kick off the process
        });
        res.cancel = action$$1(`${name} - runid: ${runId} - cancel`, function () {
            try {
                if (pendingPromise)
                    cancelPromise(pendingPromise);
                // Finally block can return (or yield) stuff..
                const res = gen.return();
                // eat anything that promise would do, it's cancelled!
                const yieldedPromise = Promise.resolve(res.value);
                yieldedPromise.then(noop$$1, noop$$1);
                cancelPromise(yieldedPromise); // maybe it can be cancelled :)
                // reject our original promise
                rejector(new Error("FLOW_CANCELLED"));
            }
            catch (e) {
                rejector(e); // there could be a throwing finally block
            }
        });
        return res;
    };
}
function cancelPromise(promise) {
    if (typeof promise.cancel === "function")
        promise.cancel();
}

function interceptReads$$1(thing, propOrHandler, handler) {
    let target;
    if (isObservableMap$$1(thing) || isObservableArray$$1(thing) || isObservableValue$$1(thing)) {
        target = getAdministration$$1(thing);
    }
    else if (isObservableObject$$1(thing)) {
        if (typeof propOrHandler !== "string")
            return fail$1(process.env.NODE_ENV !== "production" &&
                `InterceptReads can only be used with a specific property, not with an object in general`);
        target = getAdministration$$1(thing, propOrHandler);
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            `Expected observable map, object or array as first array`);
    }
    if (target.dehancer !== undefined)
        return fail$1(process.env.NODE_ENV !== "production" && `An intercept reader was already established`);
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return () => {
        target.dehancer = undefined;
    };
}

function intercept$$1(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration$$1(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration$$1(thing, property).intercept(handler);
}

function _isComputed$$1(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject$$1(value) === false)
            return false;
        if (!value[$mobx$$1].values.has(property))
            return false;
        const atom = getAtom$$1(value, property);
        return isComputedValue$$1(atom);
    }
    return isComputedValue$$1(value);
}
function isComputed$$1(value) {
    if (arguments.length > 1)
        return fail$1(process.env.NODE_ENV !== "production" &&
            `isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property`);
    return _isComputed$$1(value);
}
function isComputedProp$$1(value, propName) {
    if (typeof propName !== "string")
        return fail$1(process.env.NODE_ENV !== "production" &&
            `isComputed expected a property name as second argument`);
    return _isComputed$$1(value, propName);
}

function _isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (process.env.NODE_ENV !== "production" &&
            (isObservableMap$$1(value) || isObservableArray$$1(value)))
            return fail$1("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
        if (isObservableObject$$1(value)) {
            return value[$mobx$$1].values.has(property);
        }
        return false;
    }
    // For first check, see #701
    return (isObservableObject$$1(value) ||
        !!value[$mobx$$1] ||
        isAtom$$1(value) ||
        isReaction$$1(value) ||
        isComputedValue$$1(value));
}
function isObservable$$1(value) {
    if (arguments.length !== 1)
        fail$1(process.env.NODE_ENV !== "production" &&
            `isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property`);
    return _isObservable(value);
}
function isObservableProp$$1(value, propName) {
    if (typeof propName !== "string")
        return fail$1(process.env.NODE_ENV !== "production" && `expected a property name as second argument`);
    return _isObservable(value, propName);
}

function keys$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return obj[$mobx$$1].getKeys();
    }
    if (isObservableMap$$1(obj)) {
        return Array.from(obj.keys());
    }
    return fail$1(process.env.NODE_ENV !== "production" &&
        "'keys()' can only be used on observable objects and maps");
}
function values$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return keys$$1(obj).map(key => obj[key]);
    }
    if (isObservableMap$$1(obj)) {
        return keys$$1(obj).map(key => obj.get(key));
    }
    if (isObservableArray$$1(obj)) {
        return obj.slice();
    }
    return fail$1(process.env.NODE_ENV !== "production" &&
        "'values()' can only be used on observable objects, arrays and maps");
}
function entries$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return keys$$1(obj).map(key => [key, obj[key]]);
    }
    if (isObservableMap$$1(obj)) {
        return keys$$1(obj).map(key => [key, obj.get(key)]);
    }
    if (isObservableArray$$1(obj)) {
        return obj.map((key, index) => [index, key]);
    }
    return fail$1(process.env.NODE_ENV !== "production" &&
        "'entries()' can only be used on observable objects, arrays and maps");
}
function set$$1(obj, key, value) {
    if (arguments.length === 2) {
        startBatch$$1();
        const values$$1 = key;
        try {
            for (let key in values$$1)
                set$$1(obj, key, values$$1[key]);
        }
        finally {
            endBatch$$1();
        }
        return;
    }
    if (isObservableObject$$1(obj)) {
        const adm = obj[$mobx$$1];
        const existingObservable = adm.values.get(key);
        if (existingObservable) {
            adm.write(key, value);
        }
        else {
            adm.addObservableProp(key, value, adm.defaultEnhancer);
        }
    }
    else if (isObservableMap$$1(obj)) {
        obj.set(key, value);
    }
    else if (isObservableArray$$1(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant$$1(key >= 0, `Not a valid index: '${key}'`);
        startBatch$$1();
        if (key >= obj.length)
            obj.length = key + 1;
        obj[key] = value;
        endBatch$$1();
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'set()' can only be used on observable objects, arrays and maps");
    }
}
function remove$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
        
        obj[$mobx$$1].remove(key);
    }
    else if (isObservableMap$$1(obj)) {
        obj.delete(key);
    }
    else if (isObservableArray$$1(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant$$1(key >= 0, `Not a valid index: '${key}'`);
        obj.splice(key, 1);
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'remove()' can only be used on observable objects, arrays and maps");
    }
}
function has$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
        // return keys(obj).indexOf(key) >= 0
        const adm = getAdministration$$1(obj);
        return adm.has(key);
    }
    else if (isObservableMap$$1(obj)) {
        return obj.has(key);
    }
    else if (isObservableArray$$1(obj)) {
        return key >= 0 && key < obj.length;
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'has()' can only be used on observable objects, arrays and maps");
    }
}
function get$$1(obj, key) {
    if (!has$$1(obj, key))
        return undefined;
    if (isObservableObject$$1(obj)) {
        return obj[key];
    }
    else if (isObservableMap$$1(obj)) {
        return obj.get(key);
    }
    else if (isObservableArray$$1(obj)) {
        return obj[key];
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'get()' can only be used on observable objects, arrays and maps");
    }
}

function observe$$1(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration$$1(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration$$1(thing, property).observe(listener, fireImmediately);
}

const defaultOptions = {
    detectCycles: true,
    exportMapsAsObjects: true
};
function cache(map, key, value, options) {
    if (options.detectCycles)
        map.set(key, value);
    return value;
}
function toJSHelper(source, options, __alreadySeen) {
    if (!isObservable$$1(source))
        return source;
    const detectCycles = options.detectCycles === true;
    if (detectCycles &&
        source !== null &&
        typeof source === "object" &&
        __alreadySeen.has(source)) {
        return __alreadySeen.get(source);
    }
    if (isObservableArray$$1(source)) {
        const res = cache(__alreadySeen, source, [], options);
        const toAdd = source.map(value => toJSHelper(value, options, __alreadySeen));
        res.length = toAdd.length;
        for (let i = 0, l = toAdd.length; i < l; i++)
            res[i] = toAdd[i];
        return res;
    }
    if (isObservableObject$$1(source)) {
        const res = cache(__alreadySeen, source, {}, options);
        keys$$1(source); // make sure we track the keys of the object
        for (let key in source) {
            res[key] = toJSHelper(source[key], options, __alreadySeen);
        }
        return res;
    }
    if (isObservableMap$$1(source)) {
        if (options.exportMapsAsObjects === false) {
            const res = cache(__alreadySeen, source, new Map(), options);
            source.forEach((value, key) => {
                res.set(key, toJSHelper(value, options, __alreadySeen));
            });
            return res;
        }
        else {
            const res = cache(__alreadySeen, source, {}, options);
            source.forEach((value, key) => {
                res[key] = toJSHelper(value, options, __alreadySeen);
            });
            return res;
        }
    }
    if (isObservableValue$$1(source))
        return toJSHelper(source.get(), options, __alreadySeen);
    return source;
}
function toJS$$1(source, options) {
    if (!isObservable$$1(source))
        return source;
    // backward compatibility
    if (typeof options === "boolean")
        options = { detectCycles: options };
    if (!options)
        options = defaultOptions;
    const detectCycles = options.detectCycles === true;
    let __alreadySeen;
    if (detectCycles)
        __alreadySeen = new Map();
    return toJSHelper(source, options, __alreadySeen);
}

function trace$$1(...args) {
    let enterBreakPoint = false;
    if (typeof args[args.length - 1] === "boolean")
        enterBreakPoint = args.pop();
    const derivation = getAtomFromArgs(args);
    if (!derivation) {
        return fail$1(process.env.NODE_ENV !== "production" &&
            `'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly`);
    }
    if (derivation.isTracing === TraceMode$$1.NONE) {
        console.log(`[mobx.trace] '${derivation.name}' tracing enabled`);
    }
    derivation.isTracing = enterBreakPoint ? TraceMode$$1.BREAK : TraceMode$$1.LOG;
}
function getAtomFromArgs(args) {
    switch (args.length) {
        case 0:
            return globalState$$1.trackingDerivation;
        case 1:
            return getAtom$$1(args[0]);
        case 2:
            return getAtom$$1(args[0], args[1]);
    }
}

/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction$$1(action$$1, thisArg = undefined) {
    startBatch$$1();
    try {
        return action$$1.apply(thisArg);
    }
    finally {
        endBatch$$1();
    }
}

function when$$1(predicate, arg1, arg2) {
    if (arguments.length === 1 || (arg1 && typeof arg1 === "object"))
        return whenPromise(predicate, arg1);
    return _when(predicate, arg1, arg2 || {});
}
function _when(predicate, effect, opts) {
    let timeoutHandle;
    if (typeof opts.timeout === "number") {
        timeoutHandle = setTimeout(() => {
            if (!disposer[$mobx$$1].isDisposed) {
                disposer();
                const error = new Error("WHEN_TIMEOUT");
                if (opts.onError)
                    opts.onError(error);
                else
                    throw error;
            }
        }, opts.timeout);
    }
    opts.name = opts.name || "When@" + getNextId$$1();
    const effectAction = createAction$$1(opts.name + "-effect", effect);
    const disposer = autorun$$1(r => {
        if (predicate()) {
            r.dispose();
            if (timeoutHandle)
                clearTimeout(timeoutHandle);
            effectAction();
        }
    }, opts);
    return disposer;
}
function whenPromise(predicate, opts) {
    if (process.env.NODE_ENV !== "production" && opts && opts.onError)
        return fail$1(`the options 'onError' and 'promise' cannot be combined`);
    let cancel;
    const res = new Promise((resolve, reject) => {
        let disposer = _when(predicate, resolve, Object.assign({}, opts, { onError: reject }));
        cancel = () => {
            disposer();
            reject("WHEN_CANCELLED");
        };
    });
    res.cancel = cancel;
    return res;
}

function getAdm(target) {
    return target[$mobx$$1];
}
// Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!
const objectProxyTraps = {
    has(target, name) {
        if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
            return true;
        const adm = getAdm(target);
        if (adm.values.get(name))
            return true;
        if (typeof name === "string")
            return adm.has(name);
        return name in target;
    },
    get(target, name) {
        if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
            return target[name];
        const adm = getAdm(target);
        const observable$$1 = adm.values.get(name);
        if (observable$$1 instanceof Atom$$1)
            return observable$$1.get();
        // make sure we start listening to future keys
        // note that we only do this here for optimization
        if (typeof name === "string")
            adm.has(name);
        return target[name];
    },
    set(target, name, value) {
        if (typeof name !== "string")
            return false;
        set$$1(target, name, value);
        return true;
    },
    deleteProperty(target, name) {
        if (typeof name !== "string")
            return false;
        const adm = getAdm(target);
        adm.remove(name);
        return true;
    },
    ownKeys(target) {
        const adm = getAdm(target);
        adm.keysAtom.reportObserved();
        return Reflect.ownKeys(target);
    },
    preventExtensions(target) {
        fail$1(`Dynamic observable objects cannot be frozen`);
        return false;
    }
};
function createDynamicObservableObject$$1(base) {
    const proxy = new Proxy(base, objectProxyTraps);
    base[$mobx$$1].proxy = proxy;
    return proxy;
}

function hasInterceptors$$1(interceptable) {
    return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}
function registerInterceptor$$1(interceptable, handler) {
    const interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once$$1(() => {
        const idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange$$1(interceptable, change) {
    const prevU = untrackedStart$$1();
    try {
        const interceptors = interceptable.interceptors;
        if (interceptors)
            for (let i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant$$1(!change || change.type, "Intercept handlers should return nothing or a change object");
                if (!change)
                    break;
            }
        return change;
    }
    finally {
        untrackedEnd$$1(prevU);
    }
}

function hasListeners$$1(listenable) {
    return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}
function registerListener$$1(listenable, handler) {
    const listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once$$1(() => {
        const idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners$$1(listenable, change) {
    const prevU = untrackedStart$$1();
    let listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (let i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd$$1(prevU);
}

const MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
const arrayTraps = {
    get(target, name) {
        if (name === $mobx$$1)
            return target[$mobx$$1];
        if (name === "length")
            return target[$mobx$$1].getArrayLength();
        if (typeof name === "number") {
            return arrayExtensions.get.call(target, name);
        }
        if (typeof name === "string" && !isNaN(name)) {
            return arrayExtensions.get.call(target, parseInt(name));
        }
        if (arrayExtensions.hasOwnProperty(name)) {
            return arrayExtensions[name];
        }
        return target[name];
    },
    set(target, name, value) {
        if (name === "length") {
            target[$mobx$$1].setArrayLength(value);
            return true;
        }
        if (typeof name === "number") {
            arrayExtensions.set.call(target, name, value);
            return true;
        }
        if (!isNaN(name)) {
            arrayExtensions.set.call(target, parseInt(name), value);
            return true;
        }
        return false;
    },
    defineProperty(target, key, descriptor) {
        fail$1(`Defining properties on observable arrays is not supported, directly assign them instead`);
        return false;
    },
    preventExtensions(target) {
        fail$1(`Observable arrays cannot be frozen`);
        return false;
    }
};
function createObservableArray$$1(initialValues, enhancer, name = "ObservableArray@" + getNextId$$1(), owned = false) {
    const adm = new ObservableArrayAdministration(name, enhancer, owned);
    addHiddenFinalProp$$1(adm.values, $mobx$$1, adm);
    const proxy = new Proxy(adm.values, arrayTraps);
    adm.proxy = proxy;
    if (initialValues && initialValues.length) {
        const prev = allowStateChangesStart$$1(true);
        adm.spliceWithArray(0, 0, initialValues);
        allowStateChangesEnd$$1(prev);
    }
    return proxy;
}
class ObservableArrayAdministration {
    constructor(name, enhancer, owned) {
        this.owned = owned;
        this.values = [];
        this.proxy = undefined;
        this.lastKnownLength = 0;
        this.atom = new Atom$$1(name || "ObservableArray@" + getNextId$$1());
        this.enhancer = (newV, oldV) => enhancer(newV, oldV, name + "[..]");
    }
    dehanceValue(value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    }
    dehanceValues(values$$1) {
        if (this.dehancer !== undefined && this.values.length > 0)
            return values$$1.map(this.dehancer);
        return values$$1;
    }
    intercept(handler) {
        return registerInterceptor$$1(this, handler);
    }
    observe(listener, fireImmediately = false) {
        if (fireImmediately) {
            listener({
                object: this.proxy,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener$$1(this, listener);
    }
    getArrayLength() {
        this.atom.reportObserved();
        return this.values.length;
    }
    setArrayLength(newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        let currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength) {
            const newItems = new Array(newLength - currentLength);
            for (let i = 0; i < newLength - currentLength; i++)
                newItems[i] = undefined; // No Array.fill everywhere...
            this.spliceWithArray(currentLength, 0, newItems);
        }
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    }
    updateArrayLength(oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
        this.lastKnownLength += delta;
    }
    spliceWithArray(index, deleteCount, newItems) {
        checkIfStateModificationsAreAllowed$$1(this.atom);
        const length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = EMPTY_ARRAY$$1;
        if (hasInterceptors$$1(this)) {
            const change = interceptChange$$1(this, {
                object: this.proxy,
                type: "splice",
                index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY$$1;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.length === 0 ? newItems : newItems.map(v => this.enhancer(v, undefined));
        if (process.env.NODE_ENV !== "production") {
            const lengthDelta = newItems.length - deleteCount;
            this.updateArrayLength(length, lengthDelta); // checks if internal array wasn't modified
        }
        const res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return this.dehanceValues(res);
    }
    spliceItemsIntoValues(index, deleteCount, newItems) {
        if (newItems.length < MAX_SPLICE_SIZE) {
            return this.values.splice(index, deleteCount, ...newItems);
        }
        else {
            const res = this.values.slice(index, index + deleteCount);
            this.values = this.values
                .slice(0, index)
                .concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
    }
    notifyArrayChildUpdate(index, newValue, oldValue) {
        const notifySpy = !this.owned && isSpyEnabled$$1();
        const notify = hasListeners$$1(this);
        const change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "update",
                index,
                newValue,
                oldValue
            }
            : null;
        // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
        // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportStart$$1(Object.assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd$$1();
    }
    notifyArraySplice(index, added, removed) {
        const notifySpy = !this.owned && isSpyEnabled$$1();
        const notify = hasListeners$$1(this);
        const change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "splice",
                index,
                removed,
                added,
                removedCount: removed.length,
                addedCount: added.length
            }
            : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportStart$$1(Object.assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd$$1();
    }
}
const arrayExtensions = {
    intercept(handler) {
        return this[$mobx$$1].intercept(handler);
    },
    observe(listener, fireImmediately = false) {
        const adm = this[$mobx$$1];
        return adm.observe(listener, fireImmediately);
    },
    clear() {
        return this.splice(0);
    },
    replace(newItems) {
        const adm = this[$mobx$$1];
        return adm.spliceWithArray(0, adm.values.length, newItems);
    },
    /**
     * Converts this array back to a (shallow) javascript structure.
     * For a deep clone use mobx.toJS
     */
    toJS() {
        return this.slice();
    },
    toJSON() {
        // Used by JSON.stringify
        return this.toJS();
    },
    /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
    splice(index, deleteCount, ...newItems) {
        const adm = this[$mobx$$1];
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return adm.spliceWithArray(index);
            case 2:
                return adm.spliceWithArray(index, deleteCount);
        }
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    spliceWithArray(index, deleteCount, newItems) {
        const adm = this[$mobx$$1];
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    push(...items) {
        const adm = this[$mobx$$1];
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    },
    pop() {
        return this.splice(Math.max(this[$mobx$$1].values.length - 1, 0), 1)[0];
    },
    shift() {
        return this.splice(0, 1)[0];
    },
    unshift(...items) {
        const adm = this[$mobx$$1];
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    },
    reverse() {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        // so we deviate from the default and just make it an dervitation
        if (process.env.NODE_ENV !== "production") {
            console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
        }
        const clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    },
    sort(compareFn) {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        if (process.env.NODE_ENV !== "production") {
            console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
        }
        const clone = this.slice();
        return clone.sort.apply(clone, arguments);
    },
    remove(value) {
        const adm = this[$mobx$$1];
        const idx = adm.dehanceValues(adm.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    },
    get(index) {
        const adm = this[$mobx$$1];
        if (adm) {
            if (index < adm.values.length) {
                adm.atom.reportObserved();
                return adm.dehanceValue(adm.values[index]);
            }
            console.warn(`[mobx.array] Attempt to read an array index (${index}) that is out of bounds (${adm.values.length}). Please check length first. Out of bound indices will not be tracked by MobX`);
        }
        return undefined;
    },
    set(index, newValue) {
        const adm = this[$mobx$$1];
        const values$$1 = adm.values;
        if (index < values$$1.length) {
            // update at index in range
            checkIfStateModificationsAreAllowed$$1(adm.atom);
            const oldValue = values$$1[index];
            if (hasInterceptors$$1(adm)) {
                const change = interceptChange$$1(adm, {
                    type: "update",
                    object: this,
                    index,
                    newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            const changed = newValue !== oldValue;
            if (changed) {
                values$$1[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values$$1.length) {
            // add a new item
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else {
            // out of bounds
            throw new Error(`[mobx.array] Index out of bounds, ${index} is larger than ${values$$1.length}`);
        }
    }
};
[
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some",
    "toString",
    "toLocaleString"
].forEach(funcName => {
    const baseFunc = Array.prototype[funcName];
    arrayExtensions[funcName] = function () {
        const adm = this[$mobx$$1];
        adm.atom.reportObserved();
        const res = adm.dehanceValues(adm.values);
        return baseFunc.apply(res, arguments);
    };
});
const isObservableArrayAdministration = createInstanceofPredicate$$1("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray$$1(thing) {
    return isObject$$1(thing) && isObservableArrayAdministration(thing[$mobx$$1]);
}

var _a;
const ObservableMapMarker = {};
// just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556
class ObservableMap$$1 {
    constructor(initialData, enhancer = deepEnhancer$$1, name = "ObservableMap@" + getNextId$$1()) {
        this.enhancer = enhancer;
        this.name = name;
        this[_a] = ObservableMapMarker;
        this._keysAtom = createAtom$$1(`${this.name}.keys()`);
        this[Symbol.toStringTag] = "Map";
        if (typeof Map !== "function") {
            throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
        }
        this._data = new Map();
        this._hasMap = new Map();
        this.merge(initialData);
    }
    _has(key) {
        return this._data.has(key);
    }
    has(key) {
        if (this._hasMap.has(key))
            return this._hasMap.get(key).get();
        return this._updateHasMapEntry(key, false).get();
    }
    set(key, value) {
        const hasKey = this._has(key);
        if (hasInterceptors$$1(this)) {
            const change = interceptChange$$1(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
        return this;
    }
    delete(key) {
        if (hasInterceptors$$1(this)) {
            const change = interceptChange$$1(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            const notifySpy = isSpyEnabled$$1();
            const notify = hasListeners$$1(this);
            const change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: this._data.get(key).value,
                    name: key
                }
                : null;
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportStart$$1(Object.assign({}, change, { name: this.name, key }));
            transaction$$1(() => {
                this._keysAtom.reportChanged();
                this._updateHasMapEntry(key, false);
                const observable$$1 = this._data.get(key);
                observable$$1.setNewValue(undefined);
                this._data.delete(key);
            });
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd$$1();
            return true;
        }
        return false;
    }
    _updateHasMapEntry(key, value) {
        // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore
        let entry = this._hasMap.get(key);
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = new ObservableValue$$1(value, referenceEnhancer$$1, `${this.name}.${key}?`, false);
            this._hasMap.set(key, entry);
        }
        return entry;
    }
    _updateValue(key, newValue) {
        const observable$$1 = this._data.get(key);
        newValue = observable$$1.prepareNewValue(newValue);
        if (newValue !== UNCHANGED$$1) {
            const notifySpy = isSpyEnabled$$1();
            const notify = hasListeners$$1(this);
            const change = notify || notifySpy
                ? {
                    type: "update",
                    object: this,
                    oldValue: observable$$1.value,
                    name: key,
                    newValue
                }
                : null;
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportStart$$1(Object.assign({}, change, { name: this.name, key }));
            observable$$1.setNewValue(newValue);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd$$1();
        }
    }
    _addValue(key, newValue) {
        checkIfStateModificationsAreAllowed$$1(this._keysAtom);
        transaction$$1(() => {
            const observable$$1 = new ObservableValue$$1(newValue, this.enhancer, `${this.name}.${key}`, false);
            this._data.set(key, observable$$1);
            newValue = observable$$1.value; // value might have been changed
            this._updateHasMapEntry(key, true);
            this._keysAtom.reportChanged();
        });
        const notifySpy = isSpyEnabled$$1();
        const notify = hasListeners$$1(this);
        const change = notify || notifySpy
            ? {
                type: "add",
                object: this,
                name: key,
                newValue
            }
            : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportStart$$1(Object.assign({}, change, { name: this.name, key }));
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd$$1();
    }
    get(key) {
        if (this.has(key))
            return this.dehanceValue(this._data.get(key).get());
        return this.dehanceValue(undefined);
    }
    dehanceValue(value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    }
    keys() {
        this._keysAtom.reportObserved();
        return this._data.keys();
    }
    values() {
        const self = this;
        let nextIndex = 0;
        const keys$$1 = Array.from(this.keys());
        return makeIterable({
            next() {
                return nextIndex < keys$$1.length
                    ? { value: self.get(keys$$1[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    }
    entries() {
        const self = this;
        let nextIndex = 0;
        const keys$$1 = Array.from(this.keys());
        return makeIterable({
            next: function () {
                if (nextIndex < keys$$1.length) {
                    const key = keys$$1[nextIndex++];
                    return {
                        value: [key, self.get(key)],
                        done: false
                    };
                }
                return { done: true };
            }
        });
    }
    [(_a = $mobx$$1, Symbol.iterator)]() {
        return this.entries();
    }
    forEach(callback, thisArg) {
        for (const [key, value] of this)
            callback.call(thisArg, value, key, this);
    }
    /** Merge another object into this object, returns this. */
    merge(other) {
        if (isObservableMap$$1(other)) {
            other = other.toJS();
        }
        transaction$$1(() => {
            if (isPlainObject$$1(other))
                Object.keys(other).forEach(key => this.set(key, other[key]));
            else if (Array.isArray(other))
                other.forEach(([key, value]) => this.set(key, value));
            else if (isES6Map$$1(other))
                other.forEach((value, key) => this.set(key, value));
            else if (other !== null && other !== undefined)
                fail$1("Cannot initialize map from " + other);
        });
        return this;
    }
    clear() {
        transaction$$1(() => {
            untracked$$1(() => {
                for (const key of this.keys())
                    this.delete(key);
            });
        });
    }
    replace(values$$1) {
        transaction$$1(() => {
            // grab all the keys that are present in the new map but not present in the current map
            // and delete them from the map, then merge the new map
            // this will cause reactions only on changed values
            const newKeys = getMapLikeKeys$$1(values$$1);
            const oldKeys = Array.from(this.keys());
            const missingKeys = oldKeys.filter(k => newKeys.indexOf(k) === -1);
            missingKeys.forEach(k => this.delete(k));
            this.merge(values$$1);
        });
        return this;
    }
    get size() {
        return this._data.size;
    }
    /**
     * Returns a plain object that represents this map.
     * Note that all the keys being stringified.
     * If there are duplicating keys after converting them to strings, behaviour is undetermined.
     */
    toPOJO() {
        const res = {};
        for (const [key, value] of this) {
            res["" + key] = value;
        }
        return res;
    }
    /**
     * Returns a shallow non observable object clone of this map.
     * Note that the values migth still be observable. For a deep clone use mobx.toJS.
     */
    toJS() {
        return new Map(this);
    }
    toJSON() {
        // Used by JSON.stringify
        return this.toPOJO();
    }
    toString() {
        return (this.name +
            "[{ " +
            Array.from(this.keys())
                .map(key => `${key}: ${"" + this.get(key)}`)
                .join(", ") +
            " }]");
    }
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    observe(listener, fireImmediately) {
        process.env.NODE_ENV !== "production" &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
        return registerListener$$1(this, listener);
    }
    intercept(handler) {
        return registerInterceptor$$1(this, handler);
    }
}
/* 'var' fixes small-build issue */
var isObservableMap$$1 = createInstanceofPredicate$$1("ObservableMap", ObservableMap$$1);

class ObservableObjectAdministration$$1 {
    constructor(target, values$$1 = new Map(), name, defaultEnhancer) {
        this.target = target;
        this.values = values$$1;
        this.name = name;
        this.defaultEnhancer = defaultEnhancer;
        this.keysAtom = new Atom$$1(name + ".keys");
    }
    read(key) {
        return this.values.get(key).get();
    }
    write(key, newValue) {
        const instance = this.target;
        const observable$$1 = this.values.get(key);
        if (observable$$1 instanceof ComputedValue$$1) {
            observable$$1.set(newValue);
            return;
        }
        // intercept
        if (hasInterceptors$$1(this)) {
            const change = interceptChange$$1(this, {
                type: "update",
                object: this.proxy || instance,
                name: key,
                newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        newValue = observable$$1.prepareNewValue(newValue);
        // notify spy & observers
        if (newValue !== UNCHANGED$$1) {
            const notify = hasListeners$$1(this);
            const notifySpy = isSpyEnabled$$1();
            const change = notify || notifySpy
                ? {
                    type: "update",
                    object: this.proxy || instance,
                    oldValue: observable$$1.value,
                    name: key,
                    newValue
                }
                : null;
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportStart$$1(Object.assign({}, change, { name: this.name, key }));
            observable$$1.setNewValue(newValue);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd$$1();
        }
    }
    has(key) {
        if (this.values.get(key) instanceof ObservableValue$$1)
            return true;
        else {
            this.waitForKey(key);
            return false;
        }
    }
    waitForKey(key) {
        const map = this.pendingKeys || (this.pendingKeys = new Map());
        let entry = map.get(key);
        if (!entry) {
            entry = new ObservableValue$$1(false, referenceEnhancer$$1, `${this.name}.${key.toString()}?`, false);
            map.set(key, entry);
        }
        entry.get(); // read to subscribe
    }
    addObservableProp(propName, newValue, enhancer = this.defaultEnhancer) {
        const { target } = this;
        assertPropertyConfigurable$$1(target, propName);
        if (hasInterceptors$$1(this)) {
            const change = interceptChange$$1(this, {
                object: this.proxy || target,
                name: propName,
                type: "add",
                newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        const observable$$1 = new ObservableValue$$1(newValue, enhancer, `${this.name}.${propName}`, false);
        this.values.set(propName, observable$$1);
        newValue = observable$$1.value; // observableValue might have changed it
        Object.defineProperty(target, propName, generateObservablePropConfig$$1(propName));
        this.notifyPropertyAddition(propName, newValue);
    }
    addComputedProp(propertyOwner, // where is the property declared?
    propName, options) {
        const { target } = this;
        options.name = options.name || `${this.name}.${propName}`;
        this.values.set(propName, new ComputedValue$$1(options));
        if (propertyOwner === target || isPropertyConfigurable$$1(propertyOwner, propName))
            Object.defineProperty(propertyOwner, propName, generateComputedPropConfig$$1(propName));
    }
    remove(key) {
        if (!this.values.has(key))
            return;
        const { target } = this;
        if (hasInterceptors$$1(this)) {
            const change = interceptChange$$1(this, {
                object: this.proxy || target,
                name: key,
                type: "remove"
            });
            if (!change)
                return;
        }
        try {
            startBatch$$1();
            const notify = hasListeners$$1(this);
            const notifySpy = isSpyEnabled$$1();
            const oldObservable = this.values.get(key);
            const oldValue = oldObservable && oldObservable.get();
            oldObservable && oldObservable.set(undefined);
            this.keysAtom.reportChanged();
            this.values.delete(key);
            delete this.target[key];
            const change = notify || notifySpy
                ? {
                    type: "remove",
                    object: this.proxy || target,
                    oldValue: oldValue,
                    name: key
                }
                : null;
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportStart$$1(Object.assign({}, change, { name: this.name, key }));
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd$$1();
        }
        finally {
            endBatch$$1();
        }
    }
    illegalAccess(owner, propName) {
        /**
         * This happens if a property is accessed through the prototype chain, but the property was
         * declared directly as own property on the prototype.
         *
         * E.g.:
         * class A {
         * }
         * extendObservable(A.prototype, { x: 1 })
         *
         * classB extens A {
         * }
         * console.log(new B().x)
         *
         * It is unclear whether the property should be considered 'static' or inherited.
         * Either use `console.log(A.x)`
         * or: decorate(A, { x: observable })
         *
         * When using decorate, the property will always be redeclared as own property on the actual instance
         */
        console.warn(`Property '${propName}' of '${owner}' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner`);
    }
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    observe(callback, fireImmediately) {
        process.env.NODE_ENV !== "production" &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener$$1(this, callback);
    }
    intercept(handler) {
        return registerInterceptor$$1(this, handler);
    }
    notifyPropertyAddition(key, newValue) {
        const notify = hasListeners$$1(this);
        const notifySpy = isSpyEnabled$$1();
        const change = notify || notifySpy
            ? {
                type: "add",
                object: this.proxy || this.target,
                name: key,
                newValue
            }
            : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportStart$$1(Object.assign({}, change, { name: this.name, key }));
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd$$1();
        if (this.pendingKeys) {
            const entry = this.pendingKeys.get(key);
            if (entry)
                entry.set(true);
        }
        this.keysAtom.reportChanged();
    }
    getKeys() {
        this.keysAtom.reportObserved();
        // return Reflect.ownKeys(this.values) as any
        const res = [];
        for (const [key, value] of this.values)
            if (value instanceof ObservableValue$$1)
                res.push(key);
        return res;
    }
}
function asObservableObject$$1(target, name = "", defaultEnhancer = deepEnhancer$$1) {
    if (Object.prototype.hasOwnProperty.call(target, $mobx$$1))
        return target[$mobx$$1];
    process.env.NODE_ENV !== "production" &&
        invariant$$1(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
    if (!isPlainObject$$1(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId$$1();
    if (!name)
        name = "ObservableObject@" + getNextId$$1();
    const adm = new ObservableObjectAdministration$$1(target, new Map(), name, defaultEnhancer);
    addHiddenProp$$1(target, $mobx$$1, adm);
    return adm;
}
const observablePropertyConfigs = {};
const computedPropertyConfigs = {};
function generateObservablePropConfig$$1(propName) {
    return (observablePropertyConfigs[propName] ||
        (observablePropertyConfigs[propName] = {
            configurable: true,
            enumerable: true,
            get() {
                return this[$mobx$$1].read(propName);
            },
            set(v) {
                this[$mobx$$1].write(propName, v);
            }
        }));
}
function getAdministrationForComputedPropOwner(owner) {
    const adm = owner[$mobx$$1];
    if (!adm) {
        // because computed props are declared on proty,
        // the current instance might not have been initialized yet
        initializeInstance$$1(owner);
        return owner[$mobx$$1];
    }
    return adm;
}
function generateComputedPropConfig$$1(propName) {
    return (computedPropertyConfigs[propName] ||
        (computedPropertyConfigs[propName] = {
            configurable: true,
            enumerable: false,
            get() {
                return getAdministrationForComputedPropOwner(this).read(propName);
            },
            set(v) {
                getAdministrationForComputedPropOwner(this).write(propName, v);
            }
        }));
}
const isObservableObjectAdministration = createInstanceofPredicate$$1("ObservableObjectAdministration", ObservableObjectAdministration$$1);
function isObservableObject$$1(thing) {
    if (isObject$$1(thing)) {
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance$$1(thing);
        return isObservableObjectAdministration(thing[$mobx$$1]);
    }
    return false;
}

function getAtom$$1(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray$$1(thing)) {
            if (property !== undefined)
                fail$1(process.env.NODE_ENV !== "production" &&
                    "It is not possible to get index atoms from arrays");
            return thing[$mobx$$1].atom;
        }
        if (isObservableMap$$1(thing)) {
            const anyThing = thing;
            if (property === undefined)
                return anyThing._keysAtom;
            const observable$$1 = anyThing._data.get(property) || anyThing._hasMap.get(property);
            if (!observable$$1)
                fail$1(process.env.NODE_ENV !== "production" &&
                    `the entry '${property}' does not exist in the observable map '${getDebugName$$1(thing)}'`);
            return observable$$1;
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance$$1(thing);
        if (property && !thing[$mobx$$1])
            thing[property]; // See #1072
        if (isObservableObject$$1(thing)) {
            if (!property)
                return fail$1(process.env.NODE_ENV !== "production" && `please specify a property`);
            const observable$$1 = thing[$mobx$$1].values.get(property);
            if (!observable$$1)
                fail$1(process.env.NODE_ENV !== "production" &&
                    `no observable property '${property}' found on the observable object '${getDebugName$$1(thing)}'`);
            return observable$$1;
        }
        if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction$$1(thing[$mobx$$1])) {
            // disposer function
            return thing[$mobx$$1];
        }
    }
    return fail$1(process.env.NODE_ENV !== "production" && "Cannot obtain atom from " + thing);
}
function getAdministration$$1(thing, property) {
    if (!thing)
        fail$1("Expecting some object");
    if (property !== undefined)
        return getAdministration$$1(getAtom$$1(thing, property));
    if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing))
        return thing;
    if (isObservableMap$$1(thing))
        return thing;
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance$$1(thing);
    if (thing[$mobx$$1])
        return thing[$mobx$$1];
    fail$1(process.env.NODE_ENV !== "production" && "Cannot obtain administration from " + thing);
}
function getDebugName$$1(thing, property) {
    let named;
    if (property !== undefined)
        named = getAtom$$1(thing, property);
    else if (isObservableObject$$1(thing) || isObservableMap$$1(thing))
        named = getAdministration$$1(thing);
    else
        named = getAtom$$1(thing); // valid for arrays as well
    return named.name;
}

const toString = Object.prototype.toString;
function deepEqual$$1(a, b) {
    return eq(a, b);
}
// Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
// Internal recursive comparison function for `isEqual`.
function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null)
        return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a)
        return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== "function" && type !== "object" && typeof b != "object")
        return false;
    return deepEq(a, b, aStack, bStack);
}
// Internal recursive comparison function for `isEqual`.
function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    a = unwrap(a);
    b = unwrap(b);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b))
        return false;
    switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        case "[object RegExp]":
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case "[object String]":
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return "" + a === "" + b;
        case "[object Number]":
            // `NaN`s are equivalent, but non-reflexive.
            // Object(NaN) is equivalent to NaN.
            if (+a !== +a)
                return +b !== +b;
            // An `egal` comparison is performed for other numeric values.
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a === +b;
        case "[object Symbol]":
            return (typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b));
    }
    var areArrays = className === "[object Array]";
    if (!areArrays) {
        if (typeof a != "object" || typeof b != "object")
            return false;
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor &&
            !(typeof aCtor === "function" &&
                aCtor instanceof aCtor &&
                typeof bCtor === "function" &&
                bCtor instanceof bCtor) &&
            ("constructor" in a && "constructor" in b)) {
            return false;
        }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a)
            return bStack[length] === b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    // Recursively compare objects and arrays.
    if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length)
            return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack))
                return false;
        }
    }
    else {
        // Deep compare objects.
        var keys$$1 = Object.keys(a), key;
        length = keys$$1.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (Object.keys(b).length !== length)
            return false;
        while (length--) {
            // Deep compare each member
            key = keys$$1[length];
            if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
}
function unwrap(a) {
    if (isObservableArray$$1(a))
        return a.slice();
    if (isES6Map$$1(a) || isObservableMap$$1(a))
        return Array.from(a.entries());
    return a;
}
function has$1(a, key) {
    return Object.prototype.hasOwnProperty.call(a, key);
}

function makeIterable(iterator) {
    iterator[Symbol.iterator] = self;
    return iterator;
}
function self() {
    return this;
}

/*
The only reason for this file to exist is pure horror:
Without it rollup can make the bundling fail at any point in time; when it rolls up the files in the wrong order
it will cause undefined errors (for example because super classes or local variables not being hosted).
With this file that will still happen,
but at least in this file we can magically reorder the imports with trial and error until the build succeeds again.
*/

/**
 * (c) Michel Weststrate 2015 - 2018
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */
if (typeof Proxy === "undefined") {
    throw new Error("[mobx] MobX 5+ requires Proxy objects. If your environment doesn't support Proxy objects, please downgrade to MobX 4.");
}
try {
    // define process.env if needed
    // if this is not a production build in the first place
    // (in which case the expression below would be substituted with 'production')
    process.env.NODE_ENV;
}
catch (e) {
    var g = typeof window !== "undefined" ? window : global;
    if (typeof process === "undefined")
        g.process = {};
    g.process.env = {};
}

(() => {
    function testCodeMinification() { }
    if (testCodeMinification.name !== "testCodeMinification" &&
        process.env.NODE_ENV !== "production") {
        console.warn("[mobx] you are running a minified build, but 'process.env.NODE_ENV' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
    }
})();
// Devtools support
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // See: https://github.com/andykog/mobx-devtools/
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy: spy$$1,
        extras: {
            getDebugName: getDebugName$$1
        }
    });
}

exports.Reaction = Reaction$$1;
exports.untracked = untracked$$1;
exports.createAtom = createAtom$$1;
exports.spy = spy$$1;
exports.comparer = comparer$$1;
exports.isObservableObject = isObservableObject$$1;
exports.isBoxedObservable = isObservableValue$$1;
exports.isObservableArray = isObservableArray$$1;
exports.ObservableMap = ObservableMap$$1;
exports.isObservableMap = isObservableMap$$1;
exports.transaction = transaction$$1;
exports.observable = observable$$1;
exports.computed = computed$$1;
exports.isObservable = isObservable$$1;
exports.isObservableProp = isObservableProp$$1;
exports.isComputed = isComputed$$1;
exports.isComputedProp = isComputedProp$$1;
exports.extendObservable = extendObservable$$1;
exports.observe = observe$$1;
exports.intercept = intercept$$1;
exports.autorun = autorun$$1;
exports.reaction = reaction$$1;
exports.when = when$$1;
exports.action = action$$1;
exports.isAction = isAction$$1;
exports.runInAction = runInAction$$1;
exports.keys = keys$$1;
exports.values = values$$1;
exports.entries = entries$$1;
exports.set = set$$1;
exports.remove = remove$$1;
exports.has = has$$1;
exports.get = get$$1;
exports.decorate = decorate$$1;
exports.configure = configure$$1;
exports.onBecomeObserved = onBecomeObserved$$1;
exports.onBecomeUnobserved = onBecomeUnobserved$$1;
exports.flow = flow$$1;
exports.toJS = toJS$$1;
exports.trace = trace$$1;
exports.getDependencyTree = getDependencyTree$$1;
exports.getObserverTree = getObserverTree$$1;
exports._resetGlobalState = resetGlobalState$$1;
exports._getGlobalState = getGlobalState$$1;
exports.getDebugName = getDebugName$$1;
exports.getAtom = getAtom$$1;
exports._getAdministration = getAdministration$$1;
exports._allowStateChanges = allowStateChanges$$1;
exports.isArrayLike = isArrayLike$$1;
exports.$mobx = $mobx$$1;
exports._isComputingDerivation = isComputingDerivation$$1;
exports.onReactionError = onReactionError$$1;
exports._interceptReads = interceptReads$$1;
