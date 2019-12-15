/** MobX - (c) Michel Weststrate 2015, 2016 - MIT Licensed */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const mobxDidRunLazyInitializersSymbol = Symbol("mobx did run lazy initializers");
const mobxPendingDecorators = Symbol("mobx pending decorators");
const enumerableDescriptorCache = {};
const nonEnumerableDescriptorCache = {};
function createPropertyInitializerDescriptor(prop, enumerable) {
    const cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
    return (cache[prop] ||
        (cache[prop] = {
            configurable: true,
            enumerable: enumerable,
            get() {
                initializeInstance(this);
                return this[prop];
            },
            set(value) {
                initializeInstance(this);
                this[prop] = value;
            }
        }));
}
function initializeInstance(target) {
    if (target[mobxDidRunLazyInitializersSymbol] === true)
        return;
    const decorators = target[mobxPendingDecorators];
    if (decorators) {
        addHiddenProp(target, mobxDidRunLazyInitializersSymbol, true);
        for (let key in decorators) {
            const d = decorators[key];
            d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
        }
    }
}
function createPropDecorator(propertyInitiallyEnumerable, propertyCreator) {
    return function decoratorFactory() {
        let decoratorArguments;
        const decorator = function decorate(target, prop, descriptor, applyImmediately
        // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
        // as the instance to apply the decorator to equals the target
        ) {
            if (applyImmediately === true) {
                propertyCreator(target, prop, descriptor, target, decoratorArguments);
                return null;
            }
            if (process.env.NODE_ENV !== "production" && !quacksLikeADecorator(arguments))
                fail$1("This function is a decorator, but it wasn't invoked like a decorator");
            if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators)) {
                const inheritedDecorators = target[mobxPendingDecorators];
                addHiddenProp(target, mobxPendingDecorators, Object.assign({}, inheritedDecorators));
            }
            target[mobxPendingDecorators][prop] = {
                prop,
                propertyCreator,
                descriptor,
                decoratorTarget: target,
                decoratorArguments
            };
            return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
        };
        if (quacksLikeADecorator(arguments)) {
            // @decorator
            decoratorArguments = EMPTY_ARRAY;
            return decorator.apply(null, arguments);
        }
        else {
            // @decorator(args)
            decoratorArguments = Array.prototype.slice.call(arguments);
            return decorator;
        }
    };
}
function quacksLikeADecorator(args) {
    return (((args.length === 2 || args.length === 3) && typeof args[1] === "string") ||
        (args.length === 4 && args[3] === true));
}

function isSpyEnabled() {
    return process.env.NODE_ENV !== "production" && !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (process.env.NODE_ENV === "production")
        return; // dead code elimination can do the rest
    if (!globalState.spyListeners.length)
        return;
    const listeners = globalState.spyListeners;
    for (let i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    if (process.env.NODE_ENV === "production")
        return;
    const change = Object.assign({}, event, { spyReportStart: true });
    spyReport(change);
}
const END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (process.env.NODE_ENV === "production")
        return;
    if (change)
        spyReport(Object.assign({}, change, { spyReportEnd: true }));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    if (process.env.NODE_ENV === "production") {
        console.warn(`[mobx.spy] Is a no-op in production builds`);
    }
    else {
        globalState.spyListeners.push(listener);
        return once(() => {
            globalState.spyListeners = globalState.spyListeners.filter(l => l !== listener);
        });
    }
}

function createAction(actionName, fn) {
    if (process.env.NODE_ENV !== "production") {
        invariant(typeof fn === "function", "`action` can only be invoked on functions");
        if (typeof actionName !== "string" || !actionName)
            fail$1(`actions should have valid names, got: '${actionName}'`);
    }
    const res = function () {
        return executeAction(actionName, fn, this, arguments);
    };
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    const runInfo = startAction(actionName, fn, scope, args);
    try {
        return fn.apply(scope, args);
    }
    finally {
        endAction(runInfo);
    }
}
function startAction(actionName, fn, scope, args) {
    const notifySpy = isSpyEnabled() && !!actionName;
    let startTime = 0;
    if (notifySpy && process.env.NODE_ENV !== "production") {
        startTime = Date.now();
        const l = (args && args.length) || 0;
        const flattendArgs = new Array(l);
        if (l > 0)
            for (let i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: "action",
            name: actionName,
            object: scope,
            arguments: flattendArgs
        });
    }
    const prevDerivation = untrackedStart();
    startBatch();
    const prevAllowStateChanges = allowStateChangesStart(true);
    return {
        prevDerivation,
        prevAllowStateChanges,
        notifySpy,
        startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy && process.env.NODE_ENV !== "production")
        spyReportEnd({ time: Date.now() - runInfo.startTime });
}
function allowStateChanges(allowStateChanges, func) {
    const prev = allowStateChangesStart(allowStateChanges);
    let res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    const prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}

function dontReassignFields() {
    fail$1(process.env.NODE_ENV !== "production" && "@action fields are not reassignable");
}
function namedActionDecorator(name) {
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
                    value: createAction(name, descriptor.value),
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
                    return createAction(name, initializer.call(this));
                }
            };
        }
        // bound instance methods
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function actionFieldDecorator(name) {
    // Simple property that writes on first invocation to the current instance
    return function (target, prop, descriptor) {
        Object.defineProperty(target, prop, {
            configurable: true,
            enumerable: false,
            get() {
                return undefined;
            },
            set(value) {
                addHiddenProp(this, prop, action(name, value));
            }
        });
    };
}
function boundActionDecorator(target, propertyName, descriptor, applyToInstance) {
    if (applyToInstance === true) {
        defineBoundAction(target, propertyName, descriptor.value);
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
                defineBoundAction(this, propertyName, descriptor.value || descriptor.initializer.call(this));
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
            defineBoundAction(this, propertyName, v);
        },
        get() {
            return undefined;
        }
    };
}

var action = function action(arg1, arg2, arg3, arg4) {
    // action(fn() {})
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction(arg1.name || "<unnamed action>", arg1);
    // action("name", fn() {})
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction(arg1, arg2);
    // @action("name") fn() {}
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator(arg1);
    // @action fn() {}
    if (arg4 === true) {
        // apply to instance immediately
        addHiddenProp(arg1, arg2, createAction(arg1.name || arg2, arg3.value));
    }
    else {
        return namedActionDecorator(arg2).apply(null, arguments);
    }
};
action.bound = boundActionDecorator;
function runInAction(arg1, arg2) {
    const actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    const fn = typeof arg1 === "function" ? arg1 : arg2;
    if (process.env.NODE_ENV !== "production") {
        invariant(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
        if (typeof actionName !== "string" || !actionName)
            fail$1(`actions should have valid names, got: '${actionName}'`);
    }
    return executeAction(actionName, fn, this, undefined);
}
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
function defineBoundAction(target, propertyName, fn) {
    addHiddenProp(target, propertyName, createAction(propertyName, fn.bind(target)));
}

const toString = Object.prototype.toString;
function deepEqual(a, b) {
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
            if (!(has$$1(b, key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
}
function unwrap(a) {
    if (isObservableArray(a))
        return a.slice();
    if (isES6Map(a) || isObservableMap(a))
        return Array.from(a.entries());
    return a;
}
function has$$1(a, key) {
    return Object.prototype.hasOwnProperty.call(a, key);
}

function identityComparer(a, b) {
    return a === b;
}
function structuralComparer(a, b) {
    return deepEqual(a, b);
}
function defaultComparer(a, b) {
    return Object.is(a, b);
}
const comparer = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer
};

/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
function autorun(view, opts = EMPTY_OBJECT) {
    if (process.env.NODE_ENV !== "production") {
        invariant(typeof view === "function", "Autorun expects a function as first argument");
        invariant(isAction(view) === false, "Autorun does not accept actions since actions are untrackable");
    }
    const name = (opts && opts.name) || view.name || "Autorun@" + getNextId();
    const runSync = !opts.scheduler && !opts.delay;
    let reaction;
    if (runSync) {
        // normal autorun
        reaction = new Reaction(name, function () {
            this.track(reactionRunner);
        }, opts.onError);
    }
    else {
        const scheduler = createSchedulerFromOptions(opts);
        // debounced autorun
        let isScheduled = false;
        reaction = new Reaction(name, () => {
            if (!isScheduled) {
                isScheduled = true;
                scheduler(() => {
                    isScheduled = false;
                    if (!reaction.isDisposed)
                        reaction.track(reactionRunner);
                });
            }
        }, opts.onError);
    }
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
const run = (f) => f();
function createSchedulerFromOptions(opts) {
    return opts.scheduler
        ? opts.scheduler
        : opts.delay ? (f) => setTimeout(f, opts.delay) : run;
}
function reaction(expression, effect, opts = EMPTY_OBJECT) {
    if (process.env.NODE_ENV !== "production") {
        invariant(typeof expression === "function", "First argument to reaction should be a function");
        invariant(typeof opts === "object", "Third argument of reactions should be an object");
    }
    const name = opts.name || "Reaction@" + getNextId();
    const effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    const runSync = !opts.scheduler && !opts.delay;
    const scheduler = createSchedulerFromOptions(opts);
    let firstTime = true;
    let isScheduled = false;
    let value;
    const equals = opts.compareStructural
        ? comparer.structural
        : opts.equals || comparer.default;
    const r = new Reaction(name, () => {
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
class ComputedValue {
    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `equals` property specifies the comparer function to use to determine if a newly produced
     * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
     * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
     * Structural comparison can be convenient if you always produce an new aggregated object and
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
        this.__mapid = "#" + getNextId();
        this.value = new CaughtException(null);
        this.isComputing = false; // to check for cycles
        this.isRunningSetter = false;
        this.isTracing = TraceMode.NONE;
        if (process.env.NODE_ENV !== "production" && !options.get)
            return fail$1("missing option for computed: get");
        this.derivation = options.get;
        this.name = options.name || "ComputedValue@" + getNextId();
        if (options.set)
            this.setter = createAction(this.name + "-setter", options.set);
        this.equals =
            options.equals ||
                (options.compareStructural || options.struct
                    ? comparer.structural
                    : comparer.default);
        this.scope = options.context;
        this.requiresReaction = !!options.requiresReaction;
        if (options.keepAlive === true) {
            // dangerous: never exposed, so this cmputed value should not depend on observables
            // that live globally, or it will never get disposed! (nor anything attached to it)
            autorun(() => this.get());
        }
    }
    onBecomeStale() {
        propagateMaybeChanged(this);
    }
    onBecomeUnobserved() { }
    onBecomeObserved() { }
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    get() {
        if (this.isComputing)
            fail$1(`Cycle detected in computation ${this.name}: ${this.derivation}`);
        if (globalState.inBatch === 0 && this.observers.size === 0) {
            if (shouldCompute(this)) {
                this.warnAboutUntrackedRead();
                startBatch(); // See perf test 'computed memoization'
                this.value = this.computeValue(false);
                endBatch();
            }
        }
        else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        const result = this.value;
        if (isCaughtException(result))
            throw result.cause;
        return result;
    }
    peek() {
        const res = this.computeValue(false);
        if (isCaughtException(res))
            throw res.cause;
        return res;
    }
    set(value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, `The setter of computed value '${this
                .name}' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?`);
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant(false, process.env.NODE_ENV !== "production" &&
                `[ComputedValue '${this
                    .name}'] It is not possible to assign a new value to a computed value.`);
    }
    trackAndCompute() {
        if (isSpyEnabled() && process.env.NODE_ENV !== "production") {
            spyReport({
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
            isCaughtException(oldValue) ||
            isCaughtException(newValue) ||
            !this.equals(oldValue, newValue);
        if (changed) {
            this.value = newValue;
        }
        return changed;
    }
    computeValue(track) {
        this.isComputing = true;
        globalState.computationDepth++;
        let res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        }
        else {
            if (globalState.disableErrorBoundaries === true) {
                res = this.derivation.call(this.scope);
            }
            else {
                try {
                    res = this.derivation.call(this.scope);
                }
                catch (e) {
                    res = new CaughtException(e);
                }
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    }
    suspend() {
        clearObserving(this);
        this.value = undefined; // don't hold on to computed value!
    }
    observe(listener, fireImmediately) {
        let firstTime = true;
        let prevValue = undefined;
        return autorun(() => {
            let newValue = this.get();
            if (!firstTime || fireImmediately) {
                const prevU = untrackedStart();
                listener({
                    type: "update",
                    object: this,
                    newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
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
        if (this.isTracing !== TraceMode.NONE) {
            console.log(`[mobx.trace] '${this
                .name}' is being read outside a reactive context. Doing a full recompute`);
        }
        if (globalState.computedRequiresReaction) {
            console.warn(`[mobx] Computed value ${this
                .name} is being read outside a reactive context. Doing a full recompute`);
        }
    }
    toJSON() {
        return this.get();
    }
    toString() {
        return `${this.name}[${this.derivation.toString()}]`;
    }
    valueOf() {
        return toPrimitive(this.get());
    }
    [Symbol.toPrimitive]() {
        return this.valueOf();
    }
}
const isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);

function hasInterceptors(interceptable) {
    return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}
function registerInterceptor(interceptable, handler) {
    const interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(() => {
        const idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    const prevU = untrackedStart();
    try {
        const interceptors = interceptable.interceptors;
        if (interceptors)
            for (let i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
                if (!change)
                    break;
            }
        return change;
    }
    finally {
        untrackedEnd(prevU);
    }
}

function hasListeners(listenable) {
    return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    const listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(() => {
        const idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    const prevU = untrackedStart();
    let listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (let i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}

const UNCHANGED = {};
declareAtom();
class ObservableValue extends Atom {
    constructor(value, enhancer, name = "ObservableValue@" + getNextId(), notifySpy = true) {
        super(name);
        this.enhancer = enhancer;
        this.hasUnreportedChange = false;
        this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled() && process.env.NODE_ENV !== "production") {
            // only notify spy if this is a stand-alone observable
            spyReport({ type: "create", name: this.name, newValue: "" + this.value });
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
        if (newValue !== UNCHANGED) {
            const notifySpy = isSpyEnabled();
            if (notifySpy && process.env.NODE_ENV !== "production") {
                spyReportStart({
                    type: "update",
                    name: this.name,
                    newValue,
                    oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd();
        }
    }
    prepareNewValue(newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            const change = interceptChange(this, {
                object: this,
                type: "update",
                newValue
            });
            if (!change)
                return UNCHANGED;
            newValue = change.newValue;
        }
        // apply modifier
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.value !== newValue ? newValue : UNCHANGED;
    }
    setNewValue(newValue) {
        const oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
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
        return registerInterceptor(this, handler);
    }
    observe(listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener(this, listener);
    }
    toJSON() {
        return this.get();
    }
    toString() {
        return `${this.name}[${this.value}]`;
    }
    valueOf() {
        return toPrimitive(this.get());
    }
    [Symbol.toPrimitive]() {
        return this.valueOf();
    }
}
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);

class ObservableObjectAdministration {
    constructor(target, values = new Map(), name, defaultEnhancer) {
        this.target = target;
        this.values = values;
        this.name = name;
        this.defaultEnhancer = defaultEnhancer;
        this.keysAtom = new Atom(name + ".keys");
    }
    read(key) {
        return this.values.get(key).get();
    }
    write(key, newValue) {
        const instance = this.target;
        const observable = this.values.get(key);
        if (observable instanceof ComputedValue) {
            observable.set(newValue);
            return;
        }
        // intercept
        if (hasInterceptors(this)) {
            const change = interceptChange(this, {
                type: "update",
                object: this.proxy || instance,
                name: key,
                newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        newValue = observable.prepareNewValue(newValue);
        // notify spy & observers
        if (newValue !== UNCHANGED) {
            const notify = hasListeners(this);
            const notifySpy = isSpyEnabled();
            const change = notify || notifySpy
                ? {
                    type: "update",
                    object: this.proxy || instance,
                    oldValue: observable.value,
                    name: key,
                    newValue
                }
                : null;
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportStart(Object.assign({}, change, { name: this.name, key }));
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd();
        }
    }
    has(key) {
        if (this.values.get(key) instanceof ObservableValue)
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
            entry = new ObservableValue(false, referenceEnhancer, `${this.name}.${key.toString()}?`, false);
            map.set(key, entry);
        }
        entry.get(); // read to subscribe
    }
    addObservableProp(propName, newValue, enhancer = this.defaultEnhancer) {
        const { target } = this;
        assertPropertyConfigurable(target, propName);
        if (hasInterceptors(this)) {
            const change = interceptChange(this, {
                object: this.proxy || target,
                name: propName,
                type: "add",
                newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        const observable = new ObservableValue(newValue, enhancer, `${this.name}.${propName}`, false);
        this.values.set(propName, observable);
        newValue = observable.value; // observableValue might have changed it
        Object.defineProperty(target, propName, generateObservablePropConfig(propName));
        this.notifyPropertyAddition(propName, newValue);
    }
    addComputedProp(propertyOwner, // where is the property declared?
    propName, options) {
        const { target } = this;
        options.name = options.name || `${this.name}.${propName}`;
        options.context = target;
        this.values.set(propName, new ComputedValue(options));
        if (propertyOwner === target || isPropertyConfigurable(propertyOwner, propName))
            Object.defineProperty(propertyOwner, propName, generateComputedPropConfig(propName));
    }
    remove(key) {
        if (!this.values.has(key))
            return;
        const { target } = this;
        if (hasInterceptors(this)) {
            const change = interceptChange(this, {
                object: this.proxy || target,
                name: key,
                type: "remove"
            });
            if (!change)
                return;
        }
        try {
            startBatch();
            const notify = hasListeners(this);
            const notifySpy = isSpyEnabled();
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
                spyReportStart(Object.assign({}, change, { name: this.name, key }));
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd();
        }
        finally {
            endBatch();
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
            invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    }
    intercept(handler) {
        return registerInterceptor(this, handler);
    }
    notifyPropertyAddition(key, newValue) {
        const notify = hasListeners(this);
        const notifySpy = isSpyEnabled();
        const change = notify || notifySpy
            ? {
                type: "add",
                object: this.proxy || this.target,
                name: key,
                newValue
            }
            : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportStart(Object.assign({}, change, { name: this.name, key }));
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd();
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
            if (value instanceof ObservableValue)
                res.push(key);
        return res;
    }
}
function asObservableObject(target, name = "", defaultEnhancer = deepEnhancer) {
    if (Object.prototype.hasOwnProperty.call(target, $mobx))
        return target[$mobx];
    process.env.NODE_ENV !== "production" &&
        invariant(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
    if (!isPlainObject(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name)
        name = "ObservableObject@" + getNextId();
    const adm = new ObservableObjectAdministration(target, new Map(), name, defaultEnhancer);
    addHiddenProp(target, $mobx, adm);
    return adm;
}
const observablePropertyConfigs = {};
const computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    return (observablePropertyConfigs[propName] ||
        (observablePropertyConfigs[propName] = {
            configurable: true,
            enumerable: true,
            get() {
                return this[$mobx].read(propName);
            },
            set(v) {
                this[$mobx].write(propName, v);
            }
        }));
}
function getAdministrationForComputedPropOwner(owner) {
    const adm = owner[$mobx];
    if (!adm) {
        // because computed props are declared on proty,
        // the current instance might not have been initialized yet
        initializeInstance(owner);
        return owner[$mobx];
    }
    return adm;
}
function generateComputedPropConfig(propName) {
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
const isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance(thing);
        return isObservableObjectAdministration(thing[$mobx]);
    }
    return false;
}

function createDecoratorForEnhancer(enhancer) {
    const decorator = createPropDecorator(true, (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) => {
        if (process.env.NODE_ENV !== "production") {
            invariant(!descriptor || !descriptor.get, `@observable cannot be used on getter (property "${propertyName}"), use @computed instead.`);
        }
        const initialValue = descriptor
            ? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value
            : undefined;
        asObservableObject(target).addObservableProp(propertyName, initialValue, enhancer);
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

function _isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (process.env.NODE_ENV !== "production" &&
            (isObservableMap(value) || isObservableArray(value)))
            return fail$1("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
        if (isObservableObject(value)) {
            return value[$mobx].values.has(property);
        }
        return false;
    }
    // For first check, see #701
    return (isObservableObject(value) ||
        !!value[$mobx] ||
        isAtom(value) ||
        isReaction(value) ||
        isComputedValue(value));
}
function isObservable(value) {
    if (arguments.length !== 1)
        fail$1(process.env.NODE_ENV !== "production" &&
            `isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property`);
    return _isObservable(value);
}
function isObservableProp(value, propName) {
    if (typeof propName !== "string")
        return fail$1(process.env.NODE_ENV !== "production" && `expected a property name as second argument`);
    return _isObservable(value, propName);
}

function _isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        if (!value[$mobx].values.has(property))
            return false;
        const atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
function isComputed(value) {
    if (arguments.length > 1)
        return fail$1(process.env.NODE_ENV !== "production" &&
            `isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property`);
    return _isComputed(value);
}
function isComputedProp(value, propName) {
    if (typeof propName !== "string")
        return fail$1(process.env.NODE_ENV !== "production" &&
            `isComputed expected a property name as second argument`);
    return _isComputed(value, propName);
}

const computedDecorator = createPropDecorator(false, (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) => {
    const { get, set } = descriptor; // initialValue is the descriptor for get / set props
    // Optimization: faster on decorator target or instance? Assuming target
    // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
    const options = decoratorArgs[0] || {};
    asObservableObject(instance).addComputedProp(decoratorTarget, propertyName, Object.assign({ get,
        set }, options));
});
const computedStructDecorator = computedDecorator({ equals: comparer.structural });
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed = function computed(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        // @computed
        return computedDecorator.apply(null, arguments);
    }
    if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
        // @computed({ options })
        return computedDecorator.apply(null, arguments);
    }
    // computed(expr, options?)
    if (process.env.NODE_ENV !== "production") {
        invariant(typeof arg1 === "function", "First argument to `computed` should be an expression.");
        invariant(arguments.length < 3, "Computed takes one or two arguments if used as function");
    }
    const opts = typeof arg2 === "object" ? arg2 : {};
    opts.get = arg1;
    opts.set = typeof arg2 === "function" ? arg2 : opts.set;
    opts.name = opts.name || arg1.name || ""; /* for generated name */
    return new ComputedValue(opts);
};
computed.struct = computedStructDecorator;

function extendObservable(target, properties, decorators, options) {
    if (process.env.NODE_ENV !== "production") {
        invariant(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
        invariant(typeof target === "object", "'extendObservable' expects an object as first argument");
        invariant(!isObservableMap(target), "'extendObservable' should not be used on maps, use map.merge instead");
        invariant(!isObservable(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
        if (decorators)
            for (let key in decorators)
                if (!(key in properties))
                    fail$1(`Trying to declare a decorator for unspecified property '${key}'`);
    }
    options = asCreateObservableOptions(options);
    const defaultDecorator = options.defaultDecorator || (options.deep === false ? refDecorator : deepDecorator);
    asObservableObject(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props
    startBatch();
    try {
        for (let key in properties) {
            const descriptor = Object.getOwnPropertyDescriptor(properties, key);
            if (process.env.NODE_ENV !== "production") {
                if (Object.getOwnPropertyDescriptor(target, key))
                    fail$1(`'extendObservable' can only be used to introduce new properties. Use 'set' or 'decorate' instead. The property '${key}' already exists on '${target}'`);
                if (isComputed(descriptor.value))
                    fail$1(`Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead`);
            }
            const decorator = decorators && key in decorators
                ? decorators[key]
                : descriptor.get ? computedDecorator : defaultDecorator;
            if (process.env.NODE_ENV !== "production" && typeof decorator !== "function")
                return fail$1(`Not a valid decorator for '${key}', got: ${decorator}`);
            const resultDescriptor = decorator(target, key, descriptor, true);
            if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
            )
                Object.defineProperty(target, key, resultDescriptor);
        }
    }
    finally {
        endBatch();
    }
    return target;
}

function keys(obj) {
    if (isObservableObject(obj)) {
        return obj[$mobx].getKeys();
    }
    if (isObservableMap(obj)) {
        return Array.from(obj.keys());
    }
    return fail$1(process.env.NODE_ENV !== "production" &&
        "'keys()' can only be used on observable objects and maps");
}
function values(obj) {
    if (isObservableObject(obj)) {
        return keys(obj).map(key => obj[key]);
    }
    if (isObservableMap(obj)) {
        return keys(obj).map(key => obj.get(key));
    }
    if (isObservableArray(obj)) {
        return obj.slice();
    }
    return fail$1(process.env.NODE_ENV !== "production" &&
        "'values()' can only be used on observable objects, arrays and maps");
}
function entries(obj) {
    if (isObservableObject(obj)) {
        return keys(obj).map(key => [key, obj[key]]);
    }
    if (isObservableMap(obj)) {
        return keys(obj).map(key => [key, obj.get(key)]);
    }
    if (isObservableArray(obj)) {
        return obj.map((key, index) => [index, key]);
    }
    return fail$1(process.env.NODE_ENV !== "production" &&
        "'entries()' can only be used on observable objects, arrays and maps");
}
function set(obj, key, value) {
    if (arguments.length === 2) {
        startBatch();
        const values = key;
        try {
            for (let key in values)
                set(obj, key, values[key]);
        }
        finally {
            endBatch();
        }
        return;
    }
    if (isObservableObject(obj)) {
        const adm = obj[$mobx];
        const existingObservable = adm.values.get(key);
        if (existingObservable) {
            adm.write(key, value);
        }
        else {
            adm.addObservableProp(key, value, adm.defaultEnhancer);
        }
    }
    else if (isObservableMap(obj)) {
        obj.set(key, value);
    }
    else if (isObservableArray(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant(key >= 0, `Not a valid index: '${key}'`);
        startBatch();
        if (key >= obj.length)
            obj.length = key + 1;
        obj[key] = value;
        endBatch();
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'set()' can only be used on observable objects, arrays and maps");
    }
}
function remove(obj, key) {
    if (isObservableObject(obj)) {
        
        obj[$mobx].remove(key);
    }
    else if (isObservableMap(obj)) {
        obj.delete(key);
    }
    else if (isObservableArray(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant(key >= 0, `Not a valid index: '${key}'`);
        obj.splice(key, 1);
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'remove()' can only be used on observable objects, arrays and maps");
    }
}
function has$1(obj, key) {
    if (isObservableObject(obj)) {
        // return keys(obj).indexOf(key) >= 0
        const adm = getAdministration(obj);
        return adm.has(key);
    }
    else if (isObservableMap(obj)) {
        return obj.has(key);
    }
    else if (isObservableArray(obj)) {
        return key >= 0 && key < obj.length;
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'has()' can only be used on observable objects, arrays and maps");
    }
}
function get(obj, key) {
    if (!has$1(obj, key))
        return undefined;
    if (isObservableObject(obj)) {
        return obj[key];
    }
    else if (isObservableMap(obj)) {
        return obj.get(key);
    }
    else if (isObservableArray(obj)) {
        return obj[key];
    }
    else {
        return fail$1(process.env.NODE_ENV !== "production" &&
            "'get()' can only be used on observable objects, arrays and maps");
    }
}

function getAdm(target) {
    return target[$mobx];
}
// Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!
const objectProxyTraps = {
    get(target, name) {
        if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol)
            return target[name];
        const adm = getAdm(target);
        const observable = adm.values.get(name);
        if (observable instanceof Atom)
            return observable.get();
        // make sure we start listening to future keys
        // note that we only do this here for optimization
        if (typeof name === "string")
            adm.has(name);
        return target[name];
    },
    set(target, name, value) {
        if (typeof name !== "string")
            return false;
        set(target, name, value);
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
function createDynamicObservableObject(base) {
    const proxy = new Proxy(base, objectProxyTraps);
    base[$mobx].proxy = proxy;
    return proxy;
}

// Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases
const defaultCreateObservableOptions = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
};
Object.freeze(defaultCreateObservableOptions);
function assertValidOption(key) {
    if (!/^(deep|name|defaultDecorator|proxy)$/.test(key))
        fail$1(`invalid option for (extend)observable: ${key}`);
}
function asCreateObservableOptions(thing) {
    if (thing === null || thing === undefined)
        return defaultCreateObservableOptions;
    if (typeof thing === "string")
        return { name: thing, deep: true, proxy: true };
    if (process.env.NODE_ENV !== "production") {
        if (typeof thing !== "object")
            return fail$1("expected options object");
        Object.keys(thing).forEach(assertValidOption);
    }
    return thing;
}
function getEnhancerFromOptions(options) {
    return options.defaultDecorator
        ? options.defaultDecorator.enhancer
        : options.deep === false ? referenceEnhancer : deepEnhancer;
}
const deepDecorator = createDecoratorForEnhancer(deepEnhancer);
const shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
const refDecorator = createDecoratorForEnhancer(referenceEnhancer);
const refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */
function createObservable(v, arg2, arg3) {
    // @observable someProp;
    if (typeof arguments[1] === "string") {
        return deepDecorator.apply(null, arguments);
    }
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    const res = isPlainObject(v)
        ? observable.object(v, arg2, arg3)
        : Array.isArray(v) ? observable.array(v, arg2) : isES6Map(v) ? observable.map(v, arg2) : v;
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
        const o = asCreateObservableOptions(options);
        return new ObservableValue(value, getEnhancerFromOptions(o), o.name);
    },
    array(initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        const o = asCreateObservableOptions(options);
        return createObservableArray(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map(initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        const o = asCreateObservableOptions(options);
        return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object(props, decorators, options) {
        if (typeof arguments[1] === "string")
            incorrectlyUsedAsDecorator("object");
        const o = asCreateObservableOptions(options);
        const base = extendObservable({}, props, decorators, o);
        if (o.proxy === false) {
            return base;
        }
        return createDynamicObservableObject(base);
    },
    ref: refDecorator,
    shallow: shallowDecorator,
    deep: deepDecorator,
    struct: refStructDecorator
};
const observable = createObservable;
// weird trick to keep our typings nicely with our funcs, and still extend the observable function
Object.keys(observableFactories).forEach(name => (observable[name] = observableFactories[name]));
function incorrectlyUsedAsDecorator(methodName) {
    fail$1(
    // process.env.NODE_ENV !== "production" &&
    `Expected one or two arguments to observable.${methodName}. Did you accidentally try to use observable.${methodName} as decorator?`);
}

function deepEnhancer(v, _, name) {
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    if (Array.isArray(v))
        return observable.array(v, { name });
    if (isPlainObject(v))
        return observable.object(v, undefined, { name });
    if (isES6Map(v))
        return observable.map(v, { name });
    return v;
}
function shallowEnhancer(v, _, name) {
    if (v === undefined || v === null)
        return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v))
        return v;
    if (Array.isArray(v))
        return observable.array(v, { name, deep: false });
    if (isPlainObject(v))
        return observable.object(v, undefined, { name, deep: false });
    if (isES6Map(v))
        return observable.map(v, { name, deep: false });
    return fail$1(process.env.NODE_ENV !== "production" &&
        "The shallow modifier / decorator can only used in combination with arrays, objects and maps");
}
function referenceEnhancer(newValue) {
    // never turn into an observable
    return newValue;
}
function refStructEnhancer(v, oldValue, name) {
    if (process.env.NODE_ENV !== "production" && isObservable(v))
        throw `observable.struct should not be used with observable values`;
    if (deepEqual(v, oldValue))
        return oldValue;
    return v;
}

function makeIterable(iterator) {
    iterator[Symbol.iterator] = self;
    return iterator;
}
function self() {
    return this;
}

/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction(action, thisArg = undefined) {
    startBatch();
    try {
        return action.apply(thisArg);
    }
    finally {
        endBatch();
    }
}

const ObservableMapMarker = {};
// just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556
class ObservableMap {
    constructor(initialData, enhancer = deepEnhancer, name = "ObservableMap@" + getNextId()) {
        this.enhancer = enhancer;
        this.name = name;
        this[_a] = ObservableMapMarker;
        this._keysAtom = createAtom(`${this.name}.keys()`);
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
        if (hasInterceptors(this)) {
            const change = interceptChange(this, {
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
        if (hasInterceptors(this)) {
            const change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            const notifySpy = isSpyEnabled();
            const notify = hasListeners(this);
            const change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: this._data.get(key).value,
                    name: key
                }
                : null;
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportStart(Object.assign({}, change, { name: this.name, key }));
            transaction(() => {
                this._keysAtom.reportChanged();
                this._updateHasMapEntry(key, false);
                const observable = this._data.get(key);
                observable.setNewValue(undefined);
                this._data.delete(key);
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd();
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
            entry = new ObservableValue(value, referenceEnhancer, `${this.name}.${key}?`, false);
            this._hasMap.set(key, entry);
        }
        return entry;
    }
    _updateValue(key, newValue) {
        const observable = this._data.get(key);
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            const notifySpy = isSpyEnabled();
            const notify = hasListeners(this);
            const change = notify || notifySpy
                ? {
                    type: "update",
                    object: this,
                    oldValue: observable.value,
                    name: key,
                    newValue
                }
                : null;
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportStart(Object.assign({}, change, { name: this.name, key }));
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && process.env.NODE_ENV !== "production")
                spyReportEnd();
        }
    }
    _addValue(key, newValue) {
        checkIfStateModificationsAreAllowed(this._keysAtom);
        transaction(() => {
            const observable = new ObservableValue(newValue, this.enhancer, `${this.name}.${key}`, false);
            this._data.set(key, observable);
            newValue = observable.value; // value might have been changed
            this._updateHasMapEntry(key, true);
            this._keysAtom.reportChanged();
        });
        const notifySpy = isSpyEnabled();
        const notify = hasListeners(this);
        const change = notify || notifySpy
            ? {
                type: "add",
                object: this,
                name: key,
                newValue
            }
            : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportStart(Object.assign({}, change, { name: this.name, key }));
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd();
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
        const keys = Array.from(this.keys());
        return makeIterable({
            next() {
                return nextIndex < keys.length
                    ? { value: self.get(keys[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    }
    entries() {
        const self = this;
        let nextIndex = 0;
        const keys = Array.from(this.keys());
        return makeIterable({
            next: function () {
                if (nextIndex < keys.length) {
                    const key = keys[nextIndex++];
                    return {
                        value: [key, self.get(key)],
                        done: false
                    };
                }
                return { done: true };
            }
        });
    }
    [(_a = $mobx, Symbol.iterator)]() {
        return this.entries();
    }
    forEach(callback, thisArg) {
        for (const [key, value] of this)
            callback.call(thisArg, value, key, this);
    }
    /** Merge another object into this object, returns this. */
    merge(other) {
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        transaction(() => {
            if (isPlainObject(other))
                Object.keys(other).forEach(key => this.set(key, other[key]));
            else if (Array.isArray(other))
                other.forEach(([key, value]) => this.set(key, value));
            else if (isES6Map(other))
                other.forEach((value, key) => this.set(key, value));
            else if (other !== null && other !== undefined)
                fail$1("Cannot initialize map from " + other);
        });
        return this;
    }
    clear() {
        transaction(() => {
            untracked(() => {
                for (const key of this.keys())
                    this.delete(key);
            });
        });
    }
    replace(values) {
        transaction(() => {
            // grab all the keys that are present in the new map but not present in the current map
            // and delete them from the map, then merge the new map
            // this will cause reactions only on changed values
            const newKeys = getMapLikeKeys(values);
            const oldKeys = Array.from(this.keys());
            const missingKeys = oldKeys.filter(k => newKeys.indexOf(k) === -1);
            missingKeys.forEach(k => this.delete(k));
            this.merge(values);
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
            Array.from(this.keys()).map(key => `${key}: ${"" + this.get(key)}`).join(", ") +
            " }]");
    }
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    observe(listener, fireImmediately) {
        process.env.NODE_ENV !== "production" &&
            invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
        return registerListener(this, listener);
    }
    intercept(handler) {
        return registerInterceptor(this, handler);
    }
}
/* 'var' fixes small-build issue */
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
var _a;

function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            if (property !== undefined)
                fail$1(process.env.NODE_ENV !== "production" &&
                    "It is not possible to get index atoms from arrays");
            return thing[$mobx].atom;
        }
        if (isObservableMap(thing)) {
            const anyThing = thing;
            if (property === undefined)
                return anyThing._keysAtom;
            const observable = anyThing._data.get(property) || anyThing._hasMap.get(property);
            if (!observable)
                fail$1(process.env.NODE_ENV !== "production" &&
                    `the entry '${property}' does not exist in the observable map '${getDebugName(thing)}'`);
            return observable;
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance(thing);
        if (property && !thing[$mobx])
            thing[property]; // See #1072
        if (isObservableObject(thing)) {
            if (!property)
                return fail$1(process.env.NODE_ENV !== "production" && `please specify a property`);
            const observable = thing[$mobx].values.get(property);
            if (!observable)
                fail$1(process.env.NODE_ENV !== "production" &&
                    `no observable property '${property}' found on the observable object '${getDebugName(thing)}'`);
            return observable;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction(thing[$mobx])) {
            // disposer function
            return thing[$mobx];
        }
    }
    return fail$1(process.env.NODE_ENV !== "production" && "Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    if (!thing)
        fail$1("Expecting some object");
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing))
        return thing;
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance(thing);
    if (thing[$mobx])
        return thing[$mobx];
    fail$1(process.env.NODE_ENV !== "production" && "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    let named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing); // valid for arrays as well
    return named.name;
}

function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook("onBecomeObserved", thing, arg2, arg3);
}
function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
    const atom = typeof arg2 === "string" ? getAtom(thing, arg2) : getAtom(thing);
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

/**
 * Anything that can be used to _store_ state is an Atom in mobx. Atoms have two important jobs
 *
 * 1) detect when they are being _used_ and report this (using reportObserved). This allows mobx to make the connection between running functions and the data they used
 * 2) they should notify mobx whenever they have _changed_. This way mobx can re-run any functions (derivations) that are using this atom.
 */
let Atom;
let isAtom;
function declareAtom() {
    if (Atom)
        return;
    Atom = class AtomImpl {
        /**
         * Create a new atom. For debugging purposes it is recommended to give it a name.
         * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
         */
        constructor(name = "Atom@" + getNextId()) {
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
            return reportObserved(this);
        }
        /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
        reportChanged() {
            startBatch();
            propagateChanged(this);
            endBatch();
        }
        toString() {
            return this.name;
        }
    };
    isAtom = createInstanceofPredicate("Atom", Atom);
}
function createAtom(name, onBecomeObservedHandler = noop, onBecomeUnobservedHandler = noop) {
    const atom = new Atom(name);
    onBecomeObserved(atom, onBecomeObservedHandler);
    onBecomeUnobserved(atom, onBecomeUnobservedHandler);
    return atom;
}

const MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
const arrayTraps = {
    get(target, name) {
        if (name === $mobx)
            return target[$mobx];
        if (name === "length")
            return target[$mobx].getArrayLength();
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
            target[$mobx].setArrayLength(value);
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
function createObservableArray(initialValues, enhancer, name = "ObservableArray@" + getNextId(), owned = false) {
    const adm = new ObservableArrayAdministration(name, enhancer, owned);
    addHiddenFinalProp(adm.values, $mobx, adm);
    const proxy = new Proxy(adm.values, arrayTraps);
    adm.proxy = proxy;
    if (initialValues && initialValues.length)
        adm.spliceWithArray(0, 0, initialValues);
    return proxy;
}
class ObservableArrayAdministration {
    constructor(name, enhancer, owned) {
        this.owned = owned;
        this.values = [];
        this.proxy = undefined;
        this.lastKnownLength = 0;
        this.atom = new Atom(name || "ObservableArray@" + getNextId());
        this.enhancer = (newV, oldV) => enhancer(newV, oldV, name + "[..]");
    }
    dehanceValue(value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    }
    dehanceValues(values) {
        if (this.dehancer !== undefined && this.values.length > 0)
            return values.map(this.dehancer);
        return values;
    }
    intercept(handler) {
        return registerInterceptor(this, handler);
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
        return registerListener(this, listener);
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
        checkIfStateModificationsAreAllowed(this.atom);
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
            newItems = EMPTY_ARRAY;
        if (hasInterceptors(this)) {
            const change = interceptChange(this, {
                object: this.proxy,
                type: "splice",
                index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
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
        const notifySpy = !this.owned && isSpyEnabled();
        const notify = hasListeners(this);
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
            spyReportStart(Object.assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd();
    }
    notifyArraySplice(index, added, removed) {
        const notifySpy = !this.owned && isSpyEnabled();
        const notify = hasListeners(this);
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
            spyReportStart(Object.assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
            spyReportEnd();
    }
}
const arrayExtensions = {
    intercept(handler) {
        return this[$mobx].intercept(handler);
    },
    observe(listener, fireImmediately = false) {
        const adm = this[$mobx];
        return adm.observe(listener, fireImmediately);
    },
    clear() {
        return this.splice(0);
    },
    replace(newItems) {
        const adm = this[$mobx];
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
        const adm = this[$mobx];
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
        const adm = this[$mobx];
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    push(...items) {
        const adm = this[$mobx];
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    },
    pop() {
        return this.splice(Math.max(this[$mobx].values.length - 1, 0), 1)[0];
    },
    shift() {
        return this.splice(0, 1)[0];
    },
    unshift(...items) {
        const adm = this[$mobx];
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    },
    reverse() {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        // so we deviate from the default and just make it an dervitation
        const clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    },
    sort(compareFn) {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        const clone = this.slice();
        return clone.sort.apply(clone, arguments);
    },
    remove(value) {
        const adm = this[$mobx];
        const idx = adm.dehanceValues(adm.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    },
    get(index) {
        const adm = this[$mobx];
        if (adm) {
            if (index < adm.values.length) {
                adm.atom.reportObserved();
                return adm.dehanceValue(adm.values[index]);
            }
            console.warn(`[mobx.array] Attempt to read an array index (${index}) that is out of bounds (${adm
                .values
                .length}). Please check length first. Out of bound indices will not be tracked by MobX`);
        }
        return undefined;
    },
    set(index, newValue) {
        const adm = this[$mobx];
        const values = adm.values;
        if (index < values.length) {
            // update at index in range
            checkIfStateModificationsAreAllowed(adm.atom);
            const oldValue = values[index];
            if (hasInterceptors(adm)) {
                const change = interceptChange(adm, {
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
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values.length) {
            // add a new item
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else {
            // out of bounds
            throw new Error(`[mobx.array] Index out of bounds, ${index} is larger than ${values.length}`);
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
        const adm = this[$mobx];
        adm.atom.reportObserved();
        const res = adm.dehanceValues(adm.values);
        return baseFunc.apply(res, arguments);
    };
});
const isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}

const OBFUSCATED_ERROR = "An invariant failed, however the error is obfuscated because this is an production build.";
const EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
const EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
const $mobx = Symbol("mobx administration");
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail$1(message) {
    invariant(false, message);
    throw "X"; // unreachable
}
function invariant(check, message) {
    if (!check)
        throw new Error("[mobx] " + (message || OBFUSCATED_ERROR));
}

/**
 * Makes sure that the provided function is invoked at most once.
 */
function once(func) {
    let invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
const noop = () => { };
function unique(list) {
    const res = [];
    list.forEach(item => {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}


function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value
    });
}
function isPropertyConfigurable(object, prop) {
    const descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable(object, prop) {
    if (process.env.NODE_ENV !== "production" && !isPropertyConfigurable(object, prop))
        fail$1(`Cannot make property '${prop}' observable, it is not configurable and writable in the target object`);
}
function createInstanceofPredicate(name, clazz) {
    const propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
function isES6Map(thing) {
    return thing instanceof Map;
}
function getMapLikeKeys(map) {
    if (isPlainObject(map))
        return Object.keys(map);
    if (Array.isArray(map))
        return map.map(([key]) => key);
    if (isES6Map(map) || isObservableMap(map))
        return Array.from(map.keys());
    return fail$1(`Cannot get keys from '${map}'`);
}
function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
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
class MobXGlobals {
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
let globalState = new MobXGlobals();
let runInIsolationCalled = false;
{
    const global = getGlobal();
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
function isolateGlobalState() {
    runInIsolationCalled = true;
    getGlobal().__mobxInstanceCount--;
}
function getGlobalState() {
    return globalState;
}
/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */
function resetGlobalState() {
    const defaultGlobals = new MobXGlobals();
    for (let key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.enforceActions;
}
function getGlobal() {
    return typeof window !== "undefined" ? window : global;
}

function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    const result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    const result = {
        name: node.name
    };
    if (hasObservers(node))
        result.observers = Array.from(getObservers(node)).map(nodeToObserverTree);
    return result;
}

function hasObservers(observable) {
    return observable.observers && observable.observers.size > 0;
}
function getObservers(observable) {
    return observable.observers;
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
function addObserver(observable, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    observable.observers.add(node);
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}
function removeObserver(observable, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    observable.observers.delete(node);
    if (observable.observers.size === 0) {
        // deleting last observer
        queueForUnobservation(observable);
    }
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation(observable) {
    if (observable.isPendingUnobservation === false) {
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        // the batch is actually about to finish, all unobserving should happen here.
        const list = globalState.pendingUnobservations;
        for (let i = 0; i < list.length; i++) {
            const observable = list[i];
            observable.isPendingUnobservation = false;
            if (observable.observers.size === 0) {
                if (observable.isBeingObserved) {
                    // if this observable had reactive observers, trigger the hooks
                    observable.isBeingObserved = false;
                    observable.onBecomeUnobserved();
                }
                if (observable instanceof ComputedValue) {
                    // computed values are automatically teared down when the last observer leaves
                    // this process happens recursively, this computed might be the last observabe of another, etc..
                    observable.suspend();
                }
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    const derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
            if (!observable.isBeingObserved) {
                observable.isBeingObserved = true;
                observable.onBecomeObserved();
            }
        }
        return true;
    }
    else if (observable.observers.size === 0 && globalState.inBatch > 0) {
        queueForUnobservation(observable);
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
function propagateChanged(observable) {
    // invariantLOS(observable, "changed start");
    if (observable.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable.lowestObserverState = exports.IDerivationState.STALE;
    for (const d of observable.observers) {
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
            if (d.isTracing !== TraceMode.NONE) {
                logTraceInfo(d, observable);
            }
            d.onBecomeStale();
        }
        d.dependenciesState = exports.IDerivationState.STALE;
    }
    // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed(observable) {
    // invariantLOS(observable, "confirmed start");
    if (observable.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable.lowestObserverState = exports.IDerivationState.STALE;
    for (const d of observable.observers) {
        if (d.dependenciesState === exports.IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = exports.IDerivationState.STALE;
        else if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
        )
            observable.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
    }
    // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged(observable) {
    // invariantLOS(observable, "maybe start");
    if (observable.lowestObserverState !== exports.IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = exports.IDerivationState.POSSIBLY_STALE;
    for (const d of observable.observers) {
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
            d.dependenciesState = exports.IDerivationState.POSSIBLY_STALE;
            if (d.isTracing !== TraceMode.NONE) {
                logTraceInfo(d, observable);
            }
            d.onBecomeStale();
        }
    }
    // invariantLOS(observable, "maybe end");
}
function logTraceInfo(derivation, observable) {
    console.log(`[mobx.trace] '${derivation.name}' is invalidated due to a change in: '${observable.name}'`);
    if (derivation.isTracing === TraceMode.BREAK) {
        const lines = [];
        printDepTree(getDependencyTree(derivation), lines, 1);
        // prettier-ignore
        new Function(`debugger;
/*
Tracing '${derivation.name}'

You are entering this break point because derivation '${derivation.name}' is being traced and '${observable.name}' is now forcing it to update.
Just follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update
The stackframe you are looking for is at least ~6-8 stack-frames up.

${derivation instanceof ComputedValue ? derivation.derivation.toString() : ""}

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

(function (IDerivationState) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    // A shallow dependency has changed since last computation and the derivation
    // will need to recompute when it's needed next.
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(exports.IDerivationState || (exports.IDerivationState = {}));
var TraceMode;
(function (TraceMode) {
    TraceMode[TraceMode["NONE"] = 0] = "NONE";
    TraceMode[TraceMode["LOG"] = 1] = "LOG";
    TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));
class CaughtException {
    constructor(cause) {
        this.cause = cause;
        // Empty
    }
}
function isCaughtException(e) {
    return e instanceof CaughtException;
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
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case exports.IDerivationState.UP_TO_DATE:
            return false;
        case exports.IDerivationState.NOT_TRACKING:
        case exports.IDerivationState.STALE:
            return true;
        case exports.IDerivationState.POSSIBLY_STALE: {
            const prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
            const obs = derivation.observing, l = obs.length;
            for (let i = 0; i < l; i++) {
                const obj = obs[i];
                if (isComputedValue(obj)) {
                    if (globalState.disableErrorBoundaries) {
                        obj.get();
                    }
                    else {
                        try {
                            obj.get();
                        }
                        catch (e) {
                            // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                    }
                    // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                    // and `derivation` is an observer of `obj`
                    // invariantShouldCompute(derivation)
                    if (derivation.dependenciesState === exports.IDerivationState.STALE) {
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
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
function isComputingDerivation() {
    return globalState.trackingDerivation !== null; // filter out actions inside computations
}
function checkIfStateModificationsAreAllowed(atom) {
    const hasObservers$$1 = atom.observers.size > 0;
    // Should never be possible to change an observed observable from inside computed, see #798
    if (globalState.computationDepth > 0 && hasObservers$$1)
        fail$1(process.env.NODE_ENV !== "production" &&
            `Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: ${atom.name}`);
    // Should not be possible to change observed state outside strict mode, except during initialization, see #563
    if (!globalState.allowStateChanges && (hasObservers$$1 || globalState.enforceActions === "strict"))
        fail$1(process.env.NODE_ENV !== "production" &&
            (globalState.enforceActions
                ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: "
                : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") +
                atom.name);
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction(derivation, f, context) {
    // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    const prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    let result;
    if (globalState.disableErrorBoundaries === true) {
        result = f.call(context);
    }
    else {
        try {
            result = f.call(context);
        }
        catch (e) {
            result = new CaughtException(e);
        }
    }
    globalState.trackingDerivation = prevTracking;
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
            removeObserver(dep, derivation);
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
            addObserver(dep, derivation);
        }
    }
    // Some new observed derivations may become stale during this derivation computation
    // so they have had no chance to propagate staleness (#916)
    if (lowestNewObservingDerivationState !== exports.IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    const obs = derivation.observing;
    derivation.observing = [];
    let i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = exports.IDerivationState.NOT_TRACKING;
}
function untracked(action) {
    const prev = untrackedStart();
    const res = action();
    untrackedEnd(prev);
    return res;
}
function untrackedStart() {
    const prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === exports.IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = exports.IDerivationState.UP_TO_DATE;
    const obs = derivation.observing;
    let i = obs.length;
    while (i--)
        obs[i].lowestObserverState = exports.IDerivationState.UP_TO_DATE;
}

function trace(...args) {
    let enterBreakPoint = false;
    if (typeof args[args.length - 1] === "boolean")
        enterBreakPoint = args.pop();
    const derivation = getAtomFromArgs(args);
    if (!derivation) {
        return fail$1(process.env.NODE_ENV !== "production" &&
            `'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly`);
    }
    if (derivation.isTracing === TraceMode.NONE) {
        console.log(`[mobx.trace] '${derivation.name}' tracing enabled`);
    }
    derivation.isTracing = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}
function getAtomFromArgs(args) {
    switch (args.length) {
        case 0:
            return globalState.trackingDerivation;
        case 1:
            return getAtom(args[0]);
        case 2:
            return getAtom(args[0], args[1]);
    }
}

class Reaction {
    constructor(name = "Reaction@" + getNextId(), onInvalidate, errorHandler) {
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.errorHandler = errorHandler;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
        this.isTracing = TraceMode.NONE;
    }
    onBecomeStale() {
        this.schedule();
    }
    schedule() {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
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
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                try {
                    this.onInvalidate();
                    if (this._isTrackPending &&
                        isSpyEnabled() &&
                        process.env.NODE_ENV !== "production") {
                        // onInvalidate didn't trigger track right away..
                        spyReport({
                            name: this.name,
                            type: "scheduled-reaction"
                        });
                    }
                }
                catch (e) {
                    this.reportExceptionInDerivation(e);
                }
            }
            endBatch();
        }
    }
    track(fn) {
        startBatch();
        const notify = isSpyEnabled();
        let startTime;
        if (notify && process.env.NODE_ENV !== "production") {
            startTime = Date.now();
            spyReportStart({
                name: this.name,
                type: "reaction"
            });
        }
        this._isRunning = true;
        const result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving(this);
        }
        if (isCaughtException(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify && process.env.NODE_ENV !== "production") {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    }
    reportExceptionInDerivation(error) {
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        if (globalState.disableErrorBoundaries)
            throw error;
        const message = `[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '${this}`;
        console.error(message, error);
        /** If debugging brought you here, please, read the above message :-). Tnx! */
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                name: this.name,
                message,
                error: "" + error
            });
        }
        globalState.globalReactionErrorHandlers.forEach(f => f(error, this));
    }
    dispose() {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    }
    getDisposer() {
        const r = this.dispose.bind(this);
        r[$mobx] = this;
        return r;
    }
    toString() {
        return `Reaction[${this.name}]`;
    }
    trace(enterBreakPoint = false) {
        trace(this, enterBreakPoint);
    }
}
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return () => {
        const idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
const MAX_REACTION_ITERATIONS = 100;
let reactionScheduler = f => f();
function runReactions() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    const allReactions = globalState.pendingReactions;
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
    globalState.isRunningReactions = false;
}
const isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    const baseScheduler = reactionScheduler;
    reactionScheduler = f => fn(() => baseScheduler(f));
}

function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}

function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}

function when(predicate, arg1, arg2) {
    if (arguments.length === 1 || (arg1 && typeof arg1 === "object"))
        return whenPromise(predicate, arg1);
    return _when(predicate, arg1, arg2 || {});
}
function _when(predicate, effect, opts) {
    let timeoutHandle;
    if (typeof opts.timeout === "number") {
        timeoutHandle = setTimeout(() => {
            if (!disposer[$mobx].isDisposed) {
                disposer();
                const error = new Error("WHEN_TIMEOUT");
                if (opts.onError)
                    opts.onError(error);
                else
                    throw error;
            }
        }, opts.timeout);
    }
    opts.name = opts.name || "When@" + getNextId();
    const effectAction = createAction(opts.name + "-effect", effect);
    const disposer = autorun(r => {
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

function decorate(thing, decorators) {
    process.env.NODE_ENV !== "production" &&
        invariant(isPlainObject(decorators), "Decorators should be a key value map");
    const target = typeof thing === "function" ? thing.prototype : thing;
    for (let prop in decorators) {
        const decorator = decorators[prop];
        process.env.NODE_ENV !== "production" &&
            invariant(typeof decorator === "function", `Decorate: expected a decorator function for '${prop}'`);
        const descriptor = Object.getOwnPropertyDescriptor(target, prop);
        const newDescriptor = decorator(target, prop, descriptor);
        if (newDescriptor)
            Object.defineProperty(target, prop, newDescriptor);
    }
    return thing;
}

function configure(options) {
    const { enforceActions, computedRequiresReaction, disableErrorBoundaries, reactionScheduler } = options;
    if (enforceActions !== undefined) {
        if (typeof enforceActions !== "boolean" && enforceActions !== "strict")
            return fail(`Invalid configuration for 'enforceActions': ${enforceActions}`);
        globalState.enforceActions = enforceActions;
        globalState.allowStateChanges =
            enforceActions === true || enforceActions === "strict" ? false : true;
    }
    if (computedRequiresReaction !== undefined) {
        globalState.computedRequiresReaction = !!computedRequiresReaction;
    }
    if (options.isolateGlobalState === true) {
        isolateGlobalState();
    }
    if (disableErrorBoundaries !== undefined) {
        if (disableErrorBoundaries === true)
            console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
        globalState.disableErrorBoundaries = !!disableErrorBoundaries;
    }
    if (reactionScheduler) {
        setReactionScheduler(reactionScheduler);
    }
}

let generatorId = 0;
function flow(generator) {
    if (arguments.length !== 1)
        fail$1(process.env.NODE_ENV && `Flow expects one 1 argument and cannot be used as decorator`);
    const name = generator.name || "<unnamed flow>";
    // Implementation based on https://github.com/tj/co/blob/master/index.js
    return function () {
        const ctx = this;
        const args = arguments;
        const runId = ++generatorId;
        const gen = action(`${name} - runid: ${runId} - init`, generator).apply(ctx, args);
        let rejector;
        let pendingPromise = undefined;
        const res = new Promise(function (resolve, reject) {
            let stepId = 0;
            rejector = reject;
            function onFulfilled(res) {
                pendingPromise = undefined;
                let ret;
                try {
                    ret = action(`${name} - runid: ${runId} - yield ${stepId++}`, gen.next).call(gen, res);
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
                    ret = action(`${name} - runid: ${runId} - yield ${stepId++}`, gen.throw).call(gen, err);
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
        res.cancel = action(`${name} - runid: ${runId} - cancel`, function () {
            try {
                if (pendingPromise)
                    cancelPromise(pendingPromise);
                // Finally block can return (or yield) stuff..
                const res = gen.return();
                // eat anything that promise would do, it's cancelled!
                const yieldedPromise = Promise.resolve(res.value);
                yieldedPromise.then(noop, noop);
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
    if (!isObservable(source))
        return source;
    const detectCycles = options.detectCycles === true;
    if (detectCycles &&
        source !== null &&
        typeof source === "object" &&
        __alreadySeen.has(source)) {
        return __alreadySeen.get(source);
    }
    if (isObservableArray(source)) {
        const res = cache(__alreadySeen, source, [], options);
        const toAdd = source.map(value => toJSHelper(value, options, __alreadySeen));
        res.length = toAdd.length;
        for (let i = 0, l = toAdd.length; i < l; i++)
            res[i] = toAdd[i];
        return res;
    }
    if (isObservableObject(source)) {
        const res = cache(__alreadySeen, source, {}, options);
        keys(source); // make sure we track the keys of the object
        for (let key in source) {
            res[key] = toJSHelper(source[key], options, __alreadySeen);
        }
        return res;
    }
    if (isObservableMap(source)) {
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
    if (isObservableValue(source))
        return toJSHelper(source.get(), options, __alreadySeen);
    return source;
}
function toJS(source, options) {
    if (!isObservable(source))
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

function interceptReads(thing, propOrHandler, handler) {
    let target;
    if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing);
    }
    else if (isObservableObject(thing)) {
        if (typeof propOrHandler !== "string")
            return fail$1(process.env.NODE_ENV !== "production" &&
                `InterceptReads can only be used with a specific property, not with an object in general`);
        target = getAdministration(thing, propOrHandler);
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

/**
 * (c) Michel Weststrate 2015 - 2016
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
// This line should come after all the imports as well, for the same reason
// as noted above. I will file a bug with rollupjs - @rossipedia
// Devtools support
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // See: https://github.com/andykog/mobx-devtools/
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy,
        extras: {
            getDebugName
        }
    });
}

exports.Reaction = Reaction;
exports.untracked = untracked;
exports.createAtom = createAtom;
exports.spy = spy;
exports.comparer = comparer;
exports.isObservableObject = isObservableObject;
exports.isBoxedObservable = isObservableValue;
exports.isObservableArray = isObservableArray;
exports.ObservableMap = ObservableMap;
exports.isObservableMap = isObservableMap;
exports.transaction = transaction;
exports.observable = observable;
exports.computed = computed;
exports.isObservable = isObservable;
exports.isObservableProp = isObservableProp;
exports.isComputed = isComputed;
exports.isComputedProp = isComputedProp;
exports.extendObservable = extendObservable;
exports.observe = observe;
exports.intercept = intercept;
exports.autorun = autorun;
exports.reaction = reaction;
exports.when = when;
exports.action = action;
exports.isAction = isAction;
exports.runInAction = runInAction;
exports.keys = keys;
exports.values = values;
exports.entries = entries;
exports.set = set;
exports.remove = remove;
exports.has = has$1;
exports.get = get;
exports.decorate = decorate;
exports.configure = configure;
exports.onBecomeObserved = onBecomeObserved;
exports.onBecomeUnobserved = onBecomeUnobserved;
exports.flow = flow;
exports.toJS = toJS;
exports.trace = trace;
exports.getDependencyTree = getDependencyTree;
exports.getObserverTree = getObserverTree;
exports._resetGlobalState = resetGlobalState;
exports._getGlobalState = getGlobalState;
exports.getDebugName = getDebugName;
exports.getAtom = getAtom;
exports._getAdministration = getAdministration;
exports._allowStateChanges = allowStateChanges;
exports.isArrayLike = isArrayLike;
exports.$mobx = $mobx;
exports._isComputingDerivation = isComputingDerivation;
exports.onReactionError = onReactionError;
exports._interceptReads = interceptReads;
