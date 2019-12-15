(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Bacon = factory();
}(this, function () {
    'use strict';
    function nop() {
    }
    function former(x) {
        return x;
    }
    function cloneArray(xs) {
        return xs.slice(0);
    }
    var isArray = Array.isArray || function (xs) {
        return xs instanceof Array;
    };
    var isObservable = function (x) {
        return x && x._isObservable;
    };
    function extend(target) {
        var length = arguments.length;
        for (var i = 1; 1 < length ? i < length : i > length; 1 < length ? i++ : i--) {
            for (var prop in arguments[i]) {
                target[prop] = arguments[i][prop];
            }
        }
        return target;
    }
    function inherit(child, parent) {
        var hasProp = {}.hasOwnProperty;
        function ctor() {
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        for (var key in parent) {
            if (hasProp.call(parent, key)) {
                child[key] = parent[key];
            }
        }
        return child;
    }
    function symbol(key) {
        if (typeof Symbol !== 'undefined' && Symbol[key]) {
            return Symbol[key];
        } else if (typeof Symbol !== 'undefined' && typeof Symbol['for'] === 'function') {
            return Symbol[key] = Symbol['for'](key);
        } else {
            return '@@' + key;
        }
    }
    function Some(value) {
        this.value = value;
    }
    extend(Some.prototype, {
        _isSome: true,
        getOrElse: function () {
            return this.value;
        },
        get: function () {
            return this.value;
        },
        filter: function (f) {
            if (f(this.value)) {
                return new Some(this.value);
            } else {
                return None;
            }
        },
        map: function (f) {
            return new Some(f(this.value));
        },
        forEach: function (f) {
            return f(this.value);
        },
        isDefined: true,
        toArray: function () {
            return [this.value];
        },
        inspect: function () {
            return 'Some(' + this.value + ')';
        },
        toString: function () {
            return this.inspect();
        }
    });
    var None = {
        _isNone: true,
        getOrElse: function (value) {
            return value;
        },
        filter: function () {
            return None;
        },
        map: function () {
            return None;
        },
        forEach: function () {
        },
        isDefined: false,
        toArray: function () {
            return [];
        },
        inspect: function () {
            return 'None';
        },
        toString: function () {
            return this.inspect();
        }
    };
    var toOption = function (v) {
        if (v && (v._isSome || v.isNone)) {
            return v;
        } else {
            return new Some(v);
        }
    };
    var _ = {
        indexOf: function () {
            if (Array.prototype.indexOf) {
                return function (xs, x) {
                    return xs.indexOf(x);
                };
            } else {
                return function (xs, x) {
                    for (var i = 0, y; i < xs.length; i++) {
                        y = xs[i];
                        if (x === y) {
                            return i;
                        }
                    }
                    return -1;
                };
            }
        }(),
        indexWhere: function (xs, f) {
            for (var i = 0, y; i < xs.length; i++) {
                y = xs[i];
                if (f(y)) {
                    return i;
                }
            }
            return -1;
        },
        head: function (xs) {
            return xs[0];
        },
        always: function (x) {
            return function () {
                return x;
            };
        },
        negate: function (f) {
            return function (x) {
                return !f(x);
            };
        },
        empty: function (xs) {
            return xs.length === 0;
        },
        tail: function (xs) {
            return xs.slice(1, xs.length);
        },
        filter: function (f, xs) {
            var filtered = [];
            for (var i = 0, x; i < xs.length; i++) {
                x = xs[i];
                if (f(x)) {
                    filtered.push(x);
                }
            }
            return filtered;
        },
        map: function (f, xs) {
            return function () {
                var result = [];
                for (var i = 0, x; i < xs.length; i++) {
                    x = xs[i];
                    result.push(f(x));
                }
                return result;
            }();
        },
        each: function (xs, f) {
            for (var key in xs) {
                if (Object.prototype.hasOwnProperty.call(xs, key)) {
                    var value = xs[key];
                    f(key, value);
                }
            }
        },
        toArray: function (xs) {
            return isArray(xs) ? xs : [xs];
        },
        contains: function (xs, x) {
            return _.indexOf(xs, x) !== -1;
        },
        id: function (x) {
            return x;
        },
        last: function (xs) {
            return xs[xs.length - 1];
        },
        all: function (xs) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.id;
            for (var i = 0, x; i < xs.length; i++) {
                x = xs[i];
                if (!f(x)) {
                    return false;
                }
            }
            return true;
        },
        any: function (xs) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.id;
            for (var i = 0, x; i < xs.length; i++) {
                x = xs[i];
                if (f(x)) {
                    return true;
                }
            }
            return false;
        },
        without: function (x, xs) {
            return _.filter(function (y) {
                return y !== x;
            }, xs);
        },
        remove: function (x, xs) {
            var i = _.indexOf(xs, x);
            if (i >= 0) {
                return xs.splice(i, 1);
            }
        },
        fold: function (xs, seed, f) {
            for (var i = 0, x; i < xs.length; i++) {
                x = xs[i];
                seed = f(seed, x);
            }
            return seed;
        },
        flatMap: function (f, xs) {
            return _.fold(xs, [], function (ys, x) {
                return ys.concat(f(x));
            });
        },
        cached: function (f) {
            var value = None;
            return function () {
                if (typeof value !== 'undefined' && value !== null ? value._isNone : undefined) {
                    value = f();
                    f = undefined;
                }
                return value;
            };
        },
        bind: function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        },
        isFunction: function (f) {
            return typeof f === 'function';
        },
        toString: function (obj) {
            var internals, key, value;
            var hasProp = {}.hasOwnProperty;
            try {
                recursionDepth++;
                if (obj == null) {
                    return 'undefined';
                } else if (_.isFunction(obj)) {
                    return 'function';
                } else if (isArray(obj)) {
                    if (recursionDepth > 5) {
                        return '[..]';
                    }
                    return '[' + _.map(_.toString, obj).toString() + ']';
                } else if ((obj != null ? obj.toString : void 0) != null && obj.toString !== Object.prototype.toString) {
                    return obj.toString();
                } else if (typeof obj === 'object') {
                    if (recursionDepth > 5) {
                        return '{..}';
                    }
                    internals = function () {
                        var results = [];
                        for (key in obj) {
                            if (!hasProp.call(obj, key))
                                continue;
                            value = function () {
                                try {
                                    return obj[key];
                                } catch (error) {
                                    return error;
                                }
                            }();
                            results.push(_.toString(key) + ':' + _.toString(value));
                        }
                        return results;
                    }();
                    return '{' + internals + '}';
                } else {
                    return obj;
                }
            } finally {
                recursionDepth--;
            }
        }
    };
    var recursionDepth = 0;
    var eventIdCounter = 0;
    function Event() {
        this.id = ++eventIdCounter;
    }
    Event.prototype._isEvent = true;
    Event.prototype.isEvent = true;
    Event.prototype.isEnd = false;
    Event.prototype.isInitial = false;
    Event.prototype.isNext = false;
    Event.prototype.isError = false;
    Event.prototype.hasValue = false;
    Event.prototype.filter = function () {
        return true;
    };
    Event.prototype.inspect = function () {
        return this.toString();
    };
    Event.prototype.log = function () {
        return this.toString();
    };
    Event.prototype.toNext = function () {
        return this;
    };
    function Next(value) {
        if (!(this instanceof Next)) {
            return new Next(value);
        }
        Event.call(this);
        this.value = value;
    }
    inherit(Next, Event);
    Next.prototype.isNext = true;
    Next.prototype.hasValue = true;
    Next.prototype.fmap = function (f) {
        return this.apply(f(this.value));
    };
    Next.prototype.apply = function (value) {
        return new Next(value);
    };
    Next.prototype.filter = function (f) {
        return f(this.value);
    };
    Next.prototype.toString = function () {
        return _.toString(this.value);
    };
    Next.prototype.log = function () {
        return this.value;
    };
    Next.prototype._isNext = true;
    function Initial(value) {
        if (!(this instanceof Initial)) {
            return new Initial(value);
        }
        Next.call(this, value);
    }
    inherit(Initial, Next);
    Initial.prototype._isInitial = true;
    Initial.prototype.isInitial = true;
    Initial.prototype.isNext = false;
    Initial.prototype.apply = function (value) {
        return new Initial(value);
    };
    Initial.prototype.toNext = function () {
        return new Next(this.value);
    };
    function End() {
        if (!(this instanceof End)) {
            return new End();
        }
        Event.call(this);
    }
    inherit(End, Event);
    End.prototype.isEnd = true;
    End.prototype.fmap = function () {
        return this;
    };
    End.prototype.apply = function () {
        return this;
    };
    End.prototype.toString = function () {
        return '<end>';
    };
    function Error$1(error) {
        if (!(this instanceof Error$1)) {
            return new Error$1(error);
        }
        this.error = error;
        Event.call(this);
    }
    inherit(Error$1, Event);
    Error$1.prototype.isError = true;
    Error$1.prototype.fmap = function () {
        return this;
    };
    Error$1.prototype.apply = function () {
        return this;
    };
    Error$1.prototype.toString = function () {
        return '<error> ' + _.toString(this.error);
    };
    function initialEvent(value) {
        return new Initial(value);
    }
    function nextEvent(value) {
        return new Next(value);
    }
    function endEvent() {
        return new End();
    }
    function toEvent(x) {
        if (x && x._isEvent) {
            return x;
        } else {
            return nextEvent(x);
        }
    }
    var noMore = '<no-more>';
    var more = '<more>';
    var spies = [];
    function registerObs(obs) {
        if (spies.length) {
            if (!registerObs.running) {
                try {
                    registerObs.running = true;
                    spies.forEach(function (spy) {
                        spy(obs);
                    });
                } finally {
                    delete registerObs.running;
                }
            }
        }
    }
    var spy = function (spy) {
        return spies.push(spy);
    };
    function Desc(context, method, args) {
        this.context = context;
        this.method = method;
        this.args = args;
    }
    extend(Desc.prototype, {
        _isDesc: true,
        deps: function () {
            if (!this.cached) {
                this.cached = findDeps([this.context].concat(this.args));
            }
            return this.cached;
        },
        toString: function () {
            var args = _.map(_.toString, this.args);
            return _.toString(this.context) + '.' + _.toString(this.method) + '(' + args + ')';
        }
    });
    function describe(context, method) {
        var ref = context || method;
        if (ref && ref._isDesc) {
            return context || method;
        } else {
            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }
            return new Desc(context, method, args);
        }
    }
    function withDesc(desc, obs) {
        obs.desc = desc;
        return obs;
    }
    function findDeps(x) {
        if (isArray(x)) {
            return _.flatMap(findDeps, x);
        } else if (isObservable(x)) {
            return [x];
        } else if (typeof x !== 'undefined' && x !== null ? x._isSource : undefined) {
            return [x.obs];
        } else {
            return [];
        }
    }
    var scheduler = {
        setTimeout: function (f, d) {
            return setTimeout(f, d);
        },
        setInterval: function (f, i) {
            return setInterval(f, i);
        },
        clearInterval: function (id) {
            return clearInterval(id);
        },
        clearTimeout: function (id) {
            return clearTimeout(id);
        },
        now: function () {
            return new Date().getTime();
        }
    };
    var UpdateBarrier = function () {
        var rootEvent;
        var waiterObs = [];
        var waiters = {};
        var aftersStack = [];
        var aftersStackHeight = 0;
        var flushed = {};
        var processingAfters = false;
        function toString() {
            return _.toString({
                rootEvent: rootEvent,
                processingAfters: processingAfters,
                waiterObs: waiterObs,
                waiters: waiters,
                aftersStack: aftersStack,
                aftersStackHeight: aftersStackHeight,
                flushed: flushed
            });
        }
        function ensureStackHeight(h) {
            if (h <= aftersStackHeight)
                return;
            if (!aftersStack[h - 1]) {
                aftersStack[h - 1] = [
                    [],
                    0
                ];
            }
            aftersStackHeight = h;
        }
        function soonButNotYet(obs, f) {
            if (rootEvent) {
                whenDoneWith(obs, f);
            } else {
                Bacon.scheduler.setTimeout(f, 0);
            }
        }
        function afterTransaction(obs, f) {
            if (rootEvent || processingAfters) {
                ensureStackHeight(1);
                var stackIndexForThisObs = 0;
                while (stackIndexForThisObs < aftersStackHeight - 1) {
                    if (containsObs(obs, aftersStack[stackIndexForThisObs][0])) {
                        break;
                    }
                    stackIndexForThisObs++;
                }
                var listFromStack = aftersStack[stackIndexForThisObs][0];
                listFromStack.push([
                    obs,
                    f
                ]);
                if (!rootEvent) {
                    processAfters();
                }
            } else {
                return f();
            }
        }
        function containsObs(obs, aftersList) {
            for (var i = 0; i < aftersList.length; i++) {
                if (aftersList[i][0].id == obs.id)
                    return true;
            }
            return false;
        }
        function processAfters() {
            var stackSizeAtStart = aftersStackHeight;
            if (!stackSizeAtStart)
                return;
            var isRoot = !processingAfters;
            processingAfters = true;
            try {
                while (aftersStackHeight >= stackSizeAtStart) {
                    var topOfStack = aftersStack[aftersStackHeight - 1];
                    if (!topOfStack)
                        throw new Error('Unexpected stack top: ' + topOfStack);
                    var topAfters = topOfStack[0], index = topOfStack[1];
                    if (index < topAfters.length) {
                        var _topAfters$index = topAfters[index], after = _topAfters$index[1];
                        topOfStack[1]++;
                        ensureStackHeight(aftersStackHeight + 1);
                        var callSuccess = false;
                        try {
                            after();
                            callSuccess = true;
                            while (aftersStackHeight > stackSizeAtStart && aftersStack[aftersStackHeight - 1][0].length == 0) {
                                aftersStackHeight--;
                            }
                        } finally {
                            if (!callSuccess) {
                                aftersStack = [];
                                aftersStackHeight = 0;
                            }
                        }
                    } else {
                        topOfStack[0] = [];
                        topOfStack[1] = 0;
                        break;
                    }
                }
            } finally {
                if (isRoot)
                    processingAfters = false;
            }
        }
        function whenDoneWith(obs, f) {
            if (rootEvent) {
                var obsWaiters = waiters[obs.id];
                if (!(typeof obsWaiters !== 'undefined' && obsWaiters !== null)) {
                    obsWaiters = waiters[obs.id] = [f];
                    return waiterObs.push(obs);
                } else {
                    return obsWaiters.push(f);
                }
            } else {
                return f();
            }
        }
        function flush() {
            while (waiterObs.length > 0) {
                flushWaiters(0, true);
            }
            flushed = {};
        }
        function flushWaiters(index, deps) {
            var obs = waiterObs[index];
            var obsId = obs.id;
            var obsWaiters = waiters[obsId];
            waiterObs.splice(index, 1);
            delete waiters[obsId];
            if (deps && waiterObs.length > 0) {
                flushDepsOf(obs);
            }
            for (var i = 0, f; i < obsWaiters.length; i++) {
                f = obsWaiters[i];
                f();
            }
        }
        function flushDepsOf(obs) {
            if (flushed[obs.id])
                return;
            var deps = obs.internalDeps();
            for (var i = 0, dep; i < deps.length; i++) {
                dep = deps[i];
                flushDepsOf(dep);
                if (waiters[dep.id]) {
                    var index = _.indexOf(waiterObs, dep);
                    flushWaiters(index, false);
                }
            }
            flushed[obs.id] = true;
        }
        function inTransaction(event, context, f, args) {
            if (rootEvent) {
                return f.apply(context, args);
            } else {
                rootEvent = event;
                try {
                    var result = f.apply(context, args);
                    flush();
                } finally {
                    rootEvent = undefined;
                    processAfters();
                }
                return result;
            }
        }
        function currentEventId() {
            return rootEvent ? rootEvent.id : undefined;
        }
        function wrappedSubscribe(obs, sink) {
            var unsubd = false;
            var shouldUnsub = false;
            var doUnsub = function () {
                shouldUnsub = true;
                return shouldUnsub;
            };
            function unsub() {
                unsubd = true;
                return doUnsub();
            }
            doUnsub = obs.dispatcher.subscribe(function (event) {
                return afterTransaction(obs, function () {
                    if (!unsubd) {
                        var reply = sink(event);
                        if (reply === noMore) {
                            return unsub();
                        }
                    }
                });
            });
            if (shouldUnsub) {
                doUnsub();
            }
            return unsub;
        }
        function hasWaiters() {
            return waiterObs.length > 0;
        }
        return {
            toString: toString,
            whenDoneWith: whenDoneWith,
            hasWaiters: hasWaiters,
            inTransaction: inTransaction,
            currentEventId: currentEventId,
            wrappedSubscribe: wrappedSubscribe,
            afterTransaction: afterTransaction,
            soonButNotYet: soonButNotYet
        };
    }();
    function Dispatcher(_subscribe, _handleEvent) {
        this._subscribe = _subscribe;
        this._handleEvent = _handleEvent;
        this.subscribe = _.bind(this.subscribe, this);
        this.handleEvent = _.bind(this.handleEvent, this);
        this.pushing = false;
        this.ended = false;
        this.prevError = undefined;
        this.unsubSrc = undefined;
        this.subscriptions = [];
        this.queue = [];
    }
    Dispatcher.prototype.hasSubscribers = function () {
        return this.subscriptions.length > 0;
    };
    Dispatcher.prototype.removeSub = function (subscription) {
        this.subscriptions = _.without(subscription, this.subscriptions);
        return this.subscriptions;
    };
    Dispatcher.prototype.push = function (event) {
        if (event.isEnd) {
            this.ended = true;
        }
        return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
    };
    Dispatcher.prototype.pushToSubscriptions = function (event) {
        try {
            var tmp = this.subscriptions;
            var len = tmp.length;
            for (var i = 0; i < len; i++) {
                var sub = tmp[i];
                var reply = sub.sink(event);
                if (reply === noMore || event.isEnd) {
                    this.removeSub(sub);
                }
            }
            return true;
        } catch (error) {
            this.pushing = false;
            this.queue = [];
            throw error;
        }
    };
    Dispatcher.prototype.pushIt = function (event) {
        if (!this.pushing) {
            if (event === this.prevError) {
                return;
            }
            if (event.isError) {
                this.prevError = event;
            }
            this.pushing = true;
            this.pushToSubscriptions(event);
            this.pushing = false;
            while (this.queue.length) {
                event = this.queue.shift();
                this.push(event);
            }
            if (this.hasSubscribers()) {
                return more;
            } else {
                this.unsubscribeFromSource();
                return noMore;
            }
        } else {
            this.queue.push(event);
            return more;
        }
    };
    Dispatcher.prototype.handleEvent = function (event) {
        if (this._handleEvent) {
            return this._handleEvent(event);
        } else {
            return this.push(event);
        }
    };
    Dispatcher.prototype.unsubscribeFromSource = function () {
        if (this.unsubSrc) {
            this.unsubSrc();
        }
        this.unsubSrc = undefined;
    };
    Dispatcher.prototype.subscribe = function (sink) {
        var subscription;
        if (this.ended) {
            sink(endEvent());
            return nop;
        } else {
            subscription = { sink: sink };
            this.subscriptions.push(subscription);
            if (this.subscriptions.length === 1) {
                this.unsubSrc = this._subscribe(this.handleEvent);
            }
            return function (_this) {
                return function () {
                    _this.removeSub(subscription);
                    if (!_this.hasSubscribers()) {
                        return _this.unsubscribeFromSource();
                    }
                };
            }(this);
        }
    };
    function withMethodCallSupport(wrapped) {
        return function (f) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            if (typeof f === 'object' && args.length) {
                var context = f;
                var methodName = args[0];
                f = function () {
                    return context[methodName].apply(context, arguments);
                };
                args = args.slice(1);
            }
            return wrapped.apply(undefined, [f].concat(args));
        };
    }
    function makeFunctionArgs(args) {
        args = Array.prototype.slice.call(args);
        return makeFunction_.apply(undefined, args);
    }
    function partiallyApplied(f, applied) {
        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }
            return f.apply(undefined, applied.concat(args));
        };
    }
    function toSimpleExtractor(args) {
        return function (key) {
            return function (value) {
                if (!(typeof value !== 'undefined' && value !== null)) {
                    return;
                } else {
                    var fieldValue = value[key];
                    if (_.isFunction(fieldValue)) {
                        return fieldValue.apply(value, args);
                    } else {
                        return fieldValue;
                    }
                }
            };
        };
    }
    function toFieldExtractor(f, args) {
        var parts = f.slice(1).split('.');
        var partFuncs = _.map(toSimpleExtractor(args), parts);
        return function (value) {
            for (var i = 0, f; i < partFuncs.length; i++) {
                f = partFuncs[i];
                value = f(value);
            }
            return value;
        };
    }
    function isFieldKey(f) {
        return typeof f === 'string' && f.length > 1 && f.charAt(0) === '.';
    }
    var makeFunction_ = withMethodCallSupport(function (f) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
        }
        if (_.isFunction(f)) {
            if (args.length) {
                return partiallyApplied(f, args);
            } else {
                return f;
            }
        } else if (isFieldKey(f)) {
            return toFieldExtractor(f, args);
        } else {
            return _.always(f);
        }
    });
    function makeFunction(f, args) {
        return makeFunction_.apply(undefined, [f].concat(args));
    }
    function convertArgsToFunction(obs, f, args, method) {
        if (f && f._isProperty) {
            var sampled = f.sampledBy(obs, function (p, s) {
                return [
                    p,
                    s
                ];
            });
            return method.call(sampled, function (_ref) {
                var p = _ref[0];
                return p;
            }).map(function (_ref2) {
                var s = _ref2[1];
                return s;
            });
        } else {
            f = makeFunction(f, args);
            return method.call(obs, f);
        }
    }
    function toCombinator(f) {
        if (_.isFunction(f)) {
            return f;
        } else if (isFieldKey(f)) {
            var key = toFieldKey(f);
            return function (left, right) {
                return left[key](right);
            };
        } else {
            throw new Error('not a function or a field key: ' + f);
        }
    }
    function toFieldKey(f) {
        return f.slice(1);
    }
    var idCounter = 0;
    function Observable(desc) {
        this.desc = desc;
        this.id = ++idCounter;
        this.initialDesc = this.desc;
    }
    extend(Observable.prototype, {
        _isObservable: true,
        subscribe: function (sink) {
            return UpdateBarrier.wrappedSubscribe(this, sink);
        },
        subscribeInternal: function (sink) {
            return this.dispatcher.subscribe(sink);
        },
        onValue: function () {
            var f = makeFunctionArgs(arguments);
            return this.subscribe(function (event) {
                if (event.hasValue) {
                    return f(event.value);
                }
            });
        },
        onValues: function (f) {
            return this.onValue(function (args) {
                return f.apply(undefined, args);
            });
        },
        onError: function () {
            var f = makeFunctionArgs(arguments);
            return this.subscribe(function (event) {
                if (event.isError) {
                    return f(event.error);
                }
            });
        },
        onEnd: function () {
            var f = makeFunctionArgs(arguments);
            return this.subscribe(function (event) {
                if (event.isEnd) {
                    return f();
                }
            });
        },
        name: function (name) {
            this._name = name;
            return this;
        },
        withDescription: function () {
            this.desc = describe.apply(undefined, arguments);
            return this;
        },
        toString: function () {
            if (this._name) {
                return this._name;
            } else {
                return this.desc.toString();
            }
        },
        deps: function () {
            return this.desc.deps();
        },
        internalDeps: function () {
            return this.initialDesc.deps();
        }
    });
    Observable.prototype.assign = Observable.prototype.onValue;
    Observable.prototype.forEach = Observable.prototype.onValue;
    Observable.prototype.inspect = Observable.prototype.toString;
    function PropertyDispatcher(property, subscribe, handleEvent) {
        Dispatcher.call(this, subscribe, handleEvent);
        this.property = property;
        this.subscribe = _.bind(this.subscribe, this);
        this.current = None;
        this.currentValueRootId = undefined;
        this.propertyEnded = false;
    }
    inherit(PropertyDispatcher, Dispatcher);
    extend(PropertyDispatcher.prototype, {
        push: function (event) {
            if (event.isEnd) {
                this.propertyEnded = true;
            }
            if (event.hasValue) {
                this.current = new Some(event);
                this.currentValueRootId = UpdateBarrier.currentEventId();
            }
            return Dispatcher.prototype.push.call(this, event);
        },
        maybeSubSource: function (sink, reply) {
            if (reply === Bacon.noMore) {
                return nop;
            } else if (this.propertyEnded) {
                sink(endEvent());
                return nop;
            } else {
                return Dispatcher.prototype.subscribe.call(this, sink);
            }
        },
        subscribe: function (sink) {
            var _this = this;
            var reply = Bacon.more;
            if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
                var dispatchingId = UpdateBarrier.currentEventId();
                var valId = this.currentValueRootId;
                if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
                    UpdateBarrier.whenDoneWith(this.property, function () {
                        if (_this.currentValueRootId === valId) {
                            return sink(initialEvent(_this.current.get().value));
                        }
                    });
                    return this.maybeSubSource(sink, reply);
                } else {
                    UpdateBarrier.inTransaction(undefined, this, function () {
                        reply = sink(initialEvent(this.current.get().value));
                        return reply;
                    }, []);
                    return this.maybeSubSource(sink, reply);
                }
            } else {
                return this.maybeSubSource(sink, reply);
            }
        }
    });
    function propertyFromStreamSubscribe(desc, subscribe) {
        return new Property(desc, streamSubscribeToPropertySubscribe(None, subscribe));
    }
    function Property(desc, subscribe, handler) {
        Observable.call(this, desc);
        this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
        registerObs(this);
    }
    inherit(Property, Observable);
    extend(Property.prototype, {
        _isProperty: true,
        changes: function () {
            var _this2 = this;
            return new EventStream(new Desc(this, 'changes', []), function (sink) {
                return _this2.dispatcher.subscribe(function (event) {
                    if (!event.isInitial) {
                        return sink(event);
                    }
                });
            });
        },
        withHandler: function (handler) {
            return new Property(new Desc(this, 'withHandler', [handler]), this.dispatcher.subscribe, handler);
        },
        toProperty: function () {
            return this;
        },
        toEventStream: function () {
            var _this3 = this;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;
            return new EventStream(new Desc(this, 'toEventStream', []), function (sink) {
                return _this3.dispatcher.subscribe(function (event) {
                    return sink(event.toNext());
                });
            }, null, options);
        }
    });
    var defaultOptions = { forceAsync: true };
    var allowSync = { forceAsync: false };
    var defaultDesc = describe('Bacon', 'new EventStream', []);
    function EventStream(desc, subscribe, handler) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultOptions;
        if (!(this instanceof EventStream)) {
            return new EventStream(desc, subscribe, handler);
        }
        if (_.isFunction(desc)) {
            handler = subscribe;
            subscribe = desc;
            desc = defaultDesc;
        }
        if (options !== allowSync) {
            subscribe = asyncWrapSubscribe(this, subscribe);
        }
        Observable.call(this, desc);
        this.dispatcher = new Dispatcher(subscribe, handler);
        registerObs(this);
    }
    function asyncWrapSubscribe(obs, subscribe) {
        var subscribing = false;
        return function wrappedSubscribe(sink) {
            subscribing = true;
            try {
                return subscribe(function wrappedSink(event) {
                    if (subscribing) {
                        UpdateBarrier.soonButNotYet(obs, function () {
                            sink(event);
                        });
                    } else {
                        return sink(event);
                    }
                });
            } finally {
                subscribing = false;
            }
        };
    }
    function streamSubscribeToPropertySubscribe(initValue, streamSubscribe) {
        return function (sink) {
            var initSent = false;
            var subbed = false;
            var unsub = nop;
            var reply = more;
            var sendInit = function () {
                if (!initSent) {
                    return initValue.forEach(function (value) {
                        initSent = true;
                        reply = sink(new Initial(value));
                        if (reply === noMore) {
                            unsub();
                            unsub = nop;
                            return nop;
                        }
                    });
                }
            };
            unsub = streamSubscribe(function (event) {
                if (event.hasValue) {
                    if (event.isInitial && !subbed) {
                        initValue = new Some(event.value);
                        return more;
                    } else {
                        if (!event.isInitial) {
                            sendInit();
                        }
                        initSent = true;
                        initValue = new Some(event.value);
                        return sink(event);
                    }
                } else {
                    if (event.isEnd) {
                        reply = sendInit();
                    }
                    if (reply !== noMore) {
                        return sink(event);
                    }
                }
            });
            subbed = true;
            sendInit();
            return unsub;
        };
    }
    inherit(EventStream, Observable);
    extend(EventStream.prototype, {
        _isEventStream: true,
        toProperty: function (initValue_) {
            var initValue = arguments.length === 0 ? None : toOption(initValue_);
            var disp = this.dispatcher;
            var desc = new Desc(this, 'toProperty', [initValue_]);
            var streamSubscribe = function (sink) {
                return disp.subscribe(sink);
            };
            return new Property(desc, streamSubscribeToPropertySubscribe(initValue, streamSubscribe));
        },
        toEventStream: function () {
            return this;
        },
        withHandler: function (handler) {
            return new EventStream(new Desc(this, 'withHandler', [handler]), this.dispatcher.subscribe, handler);
        }
    });
    function CompositeUnsubscribe() {
        var ss = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.unsubscribe = _.bind(this.unsubscribe, this);
        this.unsubscribed = false;
        this.subscriptions = [];
        this.starting = [];
        for (var i = 0, s; i < ss.length; i++) {
            s = ss[i];
            this.add(s);
        }
    }
    extend(CompositeUnsubscribe.prototype, {
        add: function (subscription) {
            var _this = this;
            if (this.unsubscribed) {
                return;
            }
            var ended = false;
            var unsub = nop;
            this.starting.push(subscription);
            var unsubMe = function () {
                if (_this.unsubscribed) {
                    return;
                }
                ended = true;
                _this.remove(unsub);
                return _.remove(subscription, _this.starting);
            };
            unsub = subscription(this.unsubscribe, unsubMe);
            if (!(this.unsubscribed || ended)) {
                this.subscriptions.push(unsub);
            } else {
                unsub();
            }
            _.remove(subscription, this.starting);
            return unsub;
        },
        remove: function (unsub) {
            if (this.unsubscribed) {
                return;
            }
            if (_.remove(unsub, this.subscriptions) !== undefined) {
                return unsub();
            }
        },
        unsubscribe: function () {
            if (this.unsubscribed) {
                return;
            }
            this.unsubscribed = true;
            var iterable = this.subscriptions;
            for (var i = 0; i < iterable.length; i++) {
                iterable[i]();
            }
            this.subscriptions = [];
            this.starting = [];
            return [];
        },
        count: function () {
            if (this.unsubscribed) {
                return 0;
            }
            return this.subscriptions.length + this.starting.length;
        },
        empty: function () {
            return this.count() === 0;
        }
    });
    function never() {
        return new EventStream(describe(Bacon, 'never'), function (sink) {
            sink(endEvent());
            return nop;
        });
    }
    function constant(value) {
        return new Property(new Desc(Bacon, 'constant', [value]), function (sink) {
            sink(initialEvent(value));
            sink(endEvent());
            return nop;
        });
    }
    var Bacon = {
        toString: function () {
            return 'Bacon';
        },
        _: _,
        Event: Event,
        Next: Next,
        Initial: Initial,
        Error: Error$1,
        End: End,
        noMore: noMore,
        more: more,
        Desc: Desc,
        spy: spy,
        UpdateBarrier: UpdateBarrier,
        scheduler: scheduler,
        Dispatcher: Dispatcher,
        Observable: Observable,
        EventStream: EventStream,
        Property: Property,
        CompositeUnsubscribe: CompositeUnsubscribe,
        never: never,
        constant: constant,
        version: '<version>'
    };
    Bacon.Bacon = Bacon;
    function map(p) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        return convertArgsToFunction(this, p, args, function (f) {
            return withDesc(new Desc(this, 'map', [f]), this.withHandler(function (event) {
                return this.push(event.fmap(f));
            }));
        });
    }
    Observable.prototype.map = map;
    Observable.prototype.withStateMachine = function (initState, f) {
        var state = initState;
        var desc = new Desc(this, 'withStateMachine', [
            initState,
            f
        ]);
        return withDesc(desc, this.withHandler(function (event) {
            var fromF = f(state, event);
            var newState = fromF[0], outputs = fromF[1];
            state = newState;
            var reply = more;
            for (var i = 0, output; i < outputs.length; i++) {
                output = outputs[i];
                reply = this.push(output);
                if (reply === noMore) {
                    return reply;
                }
            }
            return reply;
        }));
    };
    var equals = function (a, b) {
        return a === b;
    };
    var isNone = function (object) {
        return typeof object !== 'undefined' && object !== null ? object._isNone : false;
    };
    Observable.prototype.skipDuplicates = function () {
        var isEqual = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : equals;
        var desc = new Desc(this, 'skipDuplicates', []);
        return withDesc(desc, this.withStateMachine(None, function (prev, event) {
            if (!event.hasValue) {
                return [
                    prev,
                    [event]
                ];
            } else if (event.isInitial || isNone(prev) || !isEqual(prev.get(), event.value)) {
                return [
                    new Some(event.value),
                    [event]
                ];
            } else {
                return [
                    prev,
                    []
                ];
            }
        }));
    };
    function Source(obs, sync) {
        this.obs = obs;
        this.sync = sync;
        this.queue = [];
    }
    extend(Source.prototype, {
        _isSource: true,
        subscribe: function (sink) {
            return this.obs.dispatcher.subscribe(sink);
        },
        toString: function () {
            return this.obs.toString();
        },
        markEnded: function () {
            this.ended = true;
            return true;
        },
        consume: function () {
            return this.queue[0];
        },
        push: function (x) {
            this.queue = [x];
        },
        mayHave: function () {
            return true;
        },
        hasAtLeast: function () {
            return this.queue.length;
        },
        flatten: true
    });
    function ConsumingSource() {
        Source.apply(this, arguments);
    }
    inherit(ConsumingSource, Source);
    extend(ConsumingSource.prototype, {
        consume: function () {
            return this.queue.shift();
        },
        push: function (x) {
            return this.queue.push(x);
        },
        mayHave: function (c) {
            return !this.ended || this.queue.length >= c;
        },
        hasAtLeast: function (c) {
            return this.queue.length >= c;
        },
        flatten: false
    });
    function BufferingSource(obs) {
        Source.call(this, obs, true);
    }
    inherit(BufferingSource, Source);
    extend(BufferingSource.prototype, {
        consume: function () {
            var values = this.queue;
            this.queue = [];
            return { value: values };
        },
        push: function (x) {
            return this.queue.push(x.value);
        },
        hasAtLeast: function () {
            return true;
        }
    });
    Source.isTrigger = function (s) {
        if (s == null)
            return false;
        if (s._isSource) {
            return s.sync;
        } else {
            return s._isEventStream;
        }
    };
    Source.fromObservable = function (s) {
        if (s != null && s._isSource) {
            return s;
        } else if (s != null && s._isProperty) {
            return new Source(s, false);
        } else {
            return new ConsumingSource(s, true);
        }
    };
    function when() {
        return when_(EventStream, arguments);
    }
    function whenP() {
        return when_(propertyFromStreamSubscribe, arguments);
    }
    function extractPatternsAndSources(sourceArgs) {
        var len = sourceArgs.length;
        var sources = [];
        var pats = [];
        var i = 0;
        var patterns = [];
        while (i < len) {
            patterns[i] = sourceArgs[i];
            patterns[i + 1] = sourceArgs[i + 1];
            var patSources = _.toArray(sourceArgs[i]);
            var f = constantToFunction(sourceArgs[i + 1]);
            var pat = {
                f: f,
                ixs: []
            };
            var triggerFound = false;
            for (var j = 0, s; j < patSources.length; j++) {
                s = patSources[j];
                var index = _.indexOf(sources, s);
                if (!triggerFound) {
                    triggerFound = Source.isTrigger(s);
                }
                if (index < 0) {
                    sources.push(s);
                    index = sources.length - 1;
                }
                for (var k = 0, ix; k < pat.ixs.length; k++) {
                    ix = pat.ixs[k];
                    if (ix.index === index) {
                        ix.count++;
                    }
                }
                pat.ixs.push({
                    index: index,
                    count: 1
                });
            }
            if (patSources.length > 0) {
                pats.push(pat);
            }
            i = i + 2;
        }
        var usage = 'when: expecting arguments in the form (Observable+,function)+';
        return [
            sources,
            pats,
            patterns
        ];
    }
    function when_(ctor, sourceArgs) {
        if (sourceArgs.length === 0) {
            return never();
        }
        var _extractPatternsAndSo = extractPatternsAndSources(sourceArgs), sources = _extractPatternsAndSo[0], pats = _extractPatternsAndSo[1], patterns = _extractPatternsAndSo[2];
        if (!sources.length) {
            return never();
        }
        sources = _.map(Source.fromObservable, sources);
        var needsBarrier = _.any(sources, function (s) {
            return s.flatten;
        }) && containsDuplicateDeps(_.map(function (s) {
            return s.obs;
        }, sources));
        var desc = new Desc(Bacon, 'when', patterns);
        var resultStream = ctor(desc, function (sink) {
            var triggers = [];
            var ends = false;
            function match(p) {
                for (var i = 0; i < p.ixs.length; i++) {
                    var ix = p.ixs[i];
                    if (!sources[ix.index].hasAtLeast(ix.count)) {
                        return false;
                    }
                }
                return true;
            }
            function cannotMatch(p) {
                for (var i = 0; i < p.ixs.length; i++) {
                    var ix = p.ixs[i];
                    if (!sources[ix.index].mayHave(ix.count)) {
                        return true;
                    }
                }
            }
            function nonFlattened(trigger) {
                return !trigger.source.flatten;
            }
            function part(source) {
                return function (unsubAll) {
                    function flushLater() {
                        return UpdateBarrier.whenDoneWith(resultStream, flush);
                    }
                    function flushWhileTriggers() {
                        if (triggers.length > 0) {
                            var reply = more;
                            var trigger = triggers.pop();
                            for (var i = 0, p; i < pats.length; i++) {
                                p = pats[i];
                                if (match(p)) {
                                    var values = [];
                                    for (var j = 0; j < p.ixs.length; j++) {
                                        var event = sources[p.ixs[j].index].consume();
                                        values.push(event.value);
                                    }
                                    var applied = p.f.apply(null, values);
                                    reply = sink(trigger.e.apply(applied));
                                    if (triggers.length) {
                                        triggers = _.filter(nonFlattened, triggers);
                                    }
                                    if (reply === noMore) {
                                        return reply;
                                    } else {
                                        return flushWhileTriggers();
                                    }
                                }
                            }
                        } else {
                            return more;
                        }
                    }
                    function flush() {
                        var reply = flushWhileTriggers();
                        if (ends) {
                            if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
                                reply = noMore;
                                sink(endEvent());
                            }
                        }
                        if (reply === noMore) {
                            unsubAll();
                        }
                        return reply;
                    }
                    return source.subscribe(function (e) {
                        if (e.isEnd) {
                            ends = true;
                            source.markEnded();
                            flushLater();
                        } else if (e.isError) {
                            var reply = sink(e);
                        } else {
                            source.push(e);
                            if (source.sync) {
                                triggers.push({
                                    source: source,
                                    e: e
                                });
                                if (needsBarrier || UpdateBarrier.hasWaiters()) {
                                    flushLater();
                                } else {
                                    flush();
                                }
                            }
                        }
                        if (reply === noMore) {
                            unsubAll();
                        }
                        return reply || more;
                    });
                };
            }
            return new CompositeUnsubscribe(function () {
                var result = [];
                for (var i = 0, s; i < sources.length; i++) {
                    s = sources[i];
                    result.push(part(s));
                }
                return result;
            }()).unsubscribe;
        });
        return resultStream;
    }
    function containsDuplicateDeps(observables) {
        var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        function checkObservable(obs) {
            if (_.contains(state, obs)) {
                return true;
            } else {
                var deps = obs.internalDeps();
                if (deps.length) {
                    state.push(obs);
                    return _.any(deps, checkObservable);
                } else {
                    state.push(obs);
                    return false;
                }
            }
        }
        return _.any(observables, checkObservable);
    }
    function constantToFunction(f) {
        if (_.isFunction(f)) {
            return f;
        } else {
            return _.always(f);
        }
    }
    function cannotSync(source) {
        return !source.sync || source.ended;
    }
    Bacon.when = when;
    function groupSimultaneous() {
        for (var _len = arguments.length, streams = Array(_len), _key = 0; _key < _len; _key++) {
            streams[_key] = arguments[_key];
        }
        return groupSimultaneous_(streams);
    }
    function groupSimultaneous_(streams) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
        if (streams.length === 1 && isArray(streams[0])) {
            streams = streams[0];
        }
        var sources = function () {
            var result = [];
            for (var i = 0; i < streams.length; i++) {
                result.push(new BufferingSource(streams[i]));
            }
            return result;
        }();
        var ctor = function (desc, subscribe) {
            return new EventStream(desc, subscribe, null, options);
        };
        return withDesc(new Desc(Bacon, 'groupSimultaneous', streams), when_(ctor, [
            sources,
            function () {
                for (var _len2 = arguments.length, xs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    xs[_key2] = arguments[_key2];
                }
                return xs;
            }
        ]));
    }
    Bacon.groupSimultaneous = groupSimultaneous;
    function awaiting(other) {
        var desc = new Desc(this, 'awaiting', [other]);
        return withDesc(desc, groupSimultaneous_([
            this,
            other
        ], allowSync).map(function (values) {
            return values[1].length === 0;
        }).toProperty(false).skipDuplicates());
    }
    Observable.prototype.awaiting = awaiting;
    function argumentsToObservables(args) {
        if (isArray(args[0])) {
            return args[0];
        } else {
            return Array.prototype.slice.call(args);
        }
    }
    function argumentsToObservablesAndFunction(args) {
        if (_.isFunction(args[0])) {
            return [
                argumentsToObservables(Array.prototype.slice.call(args, 1)),
                args[0]
            ];
        } else {
            return [
                argumentsToObservables(Array.prototype.slice.call(args, 0, args.length - 1)),
                _.last(args)
            ];
        }
    }
    Bacon.combineAsArray = function () {
        var streams = argumentsToObservables(arguments);
        if (streams.length) {
            var sources = [];
            for (var i = 0; i < streams.length; i++) {
                var stream = isObservable(streams[i]) ? streams[i] : Bacon.constant(streams[i]);
                sources.push(new Source(stream, true));
            }
            return withDesc(new Bacon.Desc(Bacon, 'combineAsArray', streams), whenP(sources, function () {
                for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
                    xs[_key] = arguments[_key];
                }
                return xs;
            }));
        } else {
            return constant([]);
        }
    };
    Bacon.onValues = function () {
        return Bacon.combineAsArray(Array.prototype.slice.call(arguments, 0, arguments.length - 1)).onValues(arguments[arguments.length - 1]);
    };
    Bacon.combineWith = function () {
        var _argumentsToObservabl = argumentsToObservablesAndFunction(arguments), streams = _argumentsToObservabl[0], f = _argumentsToObservabl[1];
        var desc = new Desc(Bacon, 'combineWith', [f].concat(streams));
        return withDesc(desc, Bacon.combineAsArray(streams).map(function (values) {
            return f.apply(undefined, values);
        }));
    };
    Observable.prototype.combine = function (other, f) {
        var combinator = toCombinator(f);
        var desc = new Desc(this, 'combine', [
            other,
            f
        ]);
        return withDesc(desc, Bacon.combineAsArray(this, other).map(function (values) {
            return combinator(values[0], values[1]);
        }));
    };
    Observable.prototype.not = function () {
        return withDesc(new Desc(this, 'not', []), this.map(function (x) {
            return !x;
        }));
    };
    Property.prototype.and = function (other) {
        return withDesc(new Desc(this, 'and', [other]), this.combine(other, function (x, y) {
            return x && y;
        }));
    };
    Property.prototype.or = function (other) {
        return withDesc(new Desc(this, 'or', [other]), this.combine(other, function (x, y) {
            return x || y;
        }));
    };
    EventStream.prototype.bufferWithTime = function (delay) {
        return withDesc(new Desc(this, 'bufferWithTime', [delay]), this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
    };
    EventStream.prototype.bufferWithCount = function (count) {
        return withDesc(new Desc(this, 'bufferWithCount', [count]), this.bufferWithTimeOrCount(undefined, count));
    };
    EventStream.prototype.bufferWithTimeOrCount = function (delay, count) {
        var flushOrSchedule = function (buffer) {
            if (buffer.values.length === count) {
                return buffer.flush();
            } else if (delay !== undefined) {
                return buffer.schedule();
            }
        };
        var desc = new Desc(this, 'bufferWithTimeOrCount', [
            delay,
            count
        ]);
        return withDesc(desc, this.buffer(delay, flushOrSchedule, flushOrSchedule));
    };
    EventStream.prototype.buffer = function (delay) {
        var onInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nop;
        var onFlush = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : nop;
        var buffer = {
            scheduled: null,
            end: undefined,
            values: [],
            flush: function () {
                if (this.scheduled) {
                    Bacon.scheduler.clearTimeout(this.scheduled);
                    this.scheduled = null;
                }
                if (this.values.length > 0) {
                    var valuesToPush = this.values;
                    this.values = [];
                    var reply = this.push(nextEvent(valuesToPush));
                    if (this.end != null) {
                        return this.push(this.end);
                    } else if (reply !== noMore) {
                        return onFlush(this);
                    }
                } else {
                    if (this.end != null) {
                        return this.push(this.end);
                    }
                }
            },
            schedule: function () {
                var _this = this;
                if (!this.scheduled) {
                    return this.scheduled = delay(function () {
                        return _this.flush();
                    });
                }
            }
        };
        var reply = more;
        if (!_.isFunction(delay)) {
            var delayMs = delay;
            delay = function (f) {
                return Bacon.scheduler.setTimeout(f, delayMs);
            };
        }
        return withDesc(new Desc(this, 'buffer', []), this.withHandler(function (event) {
            var _this2 = this;
            buffer.push = function (event) {
                return _this2.push(event);
            };
            if (event.isError) {
                reply = this.push(event);
            } else if (event.isEnd) {
                buffer.end = event;
                if (!buffer.scheduled) {
                    buffer.flush();
                }
            } else {
                buffer.values.push(event.value);
                onInput(buffer);
            }
            return reply;
        }));
    };
    Observable.prototype.filter = function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        return convertArgsToFunction(this, f, args, function (f) {
            return withDesc(new Desc(this, 'filter', [f]), this.withHandler(function (event) {
                if (event.filter(f)) {
                    return this.push(event);
                } else {
                    return more;
                }
            }));
        });
    };
    function once(value) {
        var s = new EventStream(new Desc(Bacon, 'once', [value]), function (sink) {
            UpdateBarrier.soonButNotYet(s, function () {
                sink(toEvent(value));
                sink(endEvent());
            });
            return nop;
        });
        return s;
    }
    Bacon.once = once;
    Observable.prototype.flatMap_ = function (f) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var root = this;
        var rootDep = [root];
        var childDeps = [];
        var isProperty = this._isProperty;
        var ctor = isProperty ? propertyFromStreamSubscribe : EventStream;
        var initialSpawned = false;
        var result = ctor(params.desc || new Desc(this, 'flatMap_', arguments), function (sink) {
            var composite = new CompositeUnsubscribe();
            var queue = [];
            var spawn = function (event) {
                if (isProperty && event.isInitial) {
                    if (initialSpawned) {
                        return more;
                    }
                    initialSpawned = true;
                }
                var child = makeObservable(f(event));
                childDeps.push(child);
                return composite.add(function (unsubAll, unsubMe) {
                    return child.dispatcher.subscribe(function (event) {
                        if (event.isEnd) {
                            _.remove(child, childDeps);
                            checkQueue();
                            checkEnd(unsubMe);
                            return noMore;
                        } else {
                            event = event.toNext();
                            var reply = sink(event);
                            if (reply === noMore) {
                                unsubAll();
                            }
                            return reply;
                        }
                    });
                });
            };
            var checkQueue = function () {
                var event = queue.shift();
                if (event) {
                    return spawn(event);
                }
            };
            var checkEnd = function (unsub) {
                unsub();
                if (composite.empty()) {
                    return sink(endEvent());
                }
            };
            composite.add(function (__, unsubRoot) {
                return root.dispatcher.subscribe(function (event) {
                    if (event.isEnd) {
                        return checkEnd(unsubRoot);
                    } else if (event.isError && !params.mapError) {
                        return sink(event);
                    } else if (params.firstOnly && composite.count() > 1) {
                        return more;
                    } else {
                        if (composite.unsubscribed) {
                            return noMore;
                        }
                        if (params.limit && composite.count() > params.limit) {
                            return queue.push(event);
                        } else {
                            return spawn(event);
                        }
                    }
                });
            });
            return composite.unsubscribe;
        });
        result.internalDeps = function () {
            if (childDeps.length) {
                return rootDep.concat(childDeps);
            } else {
                return rootDep;
            }
        };
        return result;
    };
    var handleEventValueWith = function (f) {
        return function (event) {
            return f(event.value);
        };
    };
    function makeSpawner(args) {
        if (args.length === 1 && isObservable(args[0])) {
            return _.always(args[0]);
        } else {
            return makeFunctionArgs(args);
        }
    }
    function makeObservable(x) {
        if (isObservable(x)) {
            return x;
        } else {
            return once(x);
        }
    }
    Observable.prototype.flatMapWithConcurrencyLimit = function (limit) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        return this.flatMap_(handleEventValueWith(makeSpawner(args)), {
            limit: limit,
            desc: new Desc(this, 'flatMapWithConcurrencyLimit', [limit].concat(args))
        });
    };
    Observable.prototype.flatMapConcat = function () {
        var desc = new Desc(this, 'flatMapConcat', Array.prototype.slice.call(arguments, 0));
        return withDesc(desc, this.flatMapWithConcurrencyLimit.apply(this, [1].concat(Array.prototype.slice.call(arguments))));
    };
    function addPropertyInitValueToStream(property, stream) {
        var justInitValue = new EventStream(describe(property, 'justInitValue'), function (sink) {
            var value = void 0;
            var unsub = property.dispatcher.subscribe(function (event) {
                if (!event.isEnd) {
                    value = event;
                }
                return noMore;
            });
            UpdateBarrier.whenDoneWith(justInitValue, function () {
                if (typeof value !== 'undefined' && value !== null) {
                    sink(value);
                }
                return sink(endEvent());
            });
            return unsub;
        }, null, allowSync);
        return justInitValue.concat(stream).toProperty();
    }
    EventStream.prototype.concat = function (right) {
        var left = this;
        return new EventStream(new Desc(left, 'concat', [right]), function (sink) {
            var unsubRight = nop;
            var unsubLeft = left.dispatcher.subscribe(function (e) {
                if (e.isEnd) {
                    unsubRight = right.toEventStream().dispatcher.subscribe(sink);
                    return unsubRight;
                } else {
                    return sink(e);
                }
            });
            return function () {
                return unsubLeft(), unsubRight();
            };
        });
    };
    Property.prototype.concat = function (right) {
        return addPropertyInitValueToStream(this, this.changes().concat(right));
    };
    Bacon.concatAll = function () {
        var streams = argumentsToObservables(arguments);
        if (streams.length) {
            return withDesc(new Desc(Bacon, 'concatAll', streams), _.fold(_.tail(streams), _.head(streams).toEventStream(), function (a, b) {
                return a.concat(b);
            }));
        } else {
            return never();
        }
    };
    function fromBinder(binder) {
        var eventTransformer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.id;
        var desc = new Desc(Bacon, 'fromBinder', [
            binder,
            eventTransformer
        ]);
        return new EventStream(desc, function (sink) {
            var unbound = false;
            var shouldUnbind = false;
            var unbind = function () {
                if (!unbound) {
                    if (typeof unbinder !== 'undefined' && unbinder !== null) {
                        unbinder();
                        return unbound = true;
                    } else {
                        return shouldUnbind = true;
                    }
                }
            };
            var unbinder = binder(function () {
                var ref;
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                var value = eventTransformer.apply(this, args);
                if (!(isArray(value) && ((ref = _.last(value)) != null ? ref._isEvent : undefined))) {
                    value = [value];
                }
                var reply = Bacon.more;
                for (var i = 0, event; i < value.length; i++) {
                    event = value[i];
                    reply = sink(event = toEvent(event));
                    if (reply === Bacon.noMore || event.isEnd) {
                        unbind();
                        return reply;
                    }
                }
                return reply;
            });
            if (shouldUnbind) {
                unbind();
            }
            return unbind;
        });
    }
    Bacon.fromBinder = fromBinder;
    function later(delay, value) {
        return withDesc(new Desc(Bacon, 'later', [
            delay,
            value
        ]), fromBinder(function (sink) {
            var sender = function () {
                return sink([
                    value,
                    endEvent()
                ]);
            };
            var id = Bacon.scheduler.setTimeout(sender, delay);
            return function () {
                return Bacon.scheduler.clearTimeout(id);
            };
        }));
    }
    Bacon.later = later;
    Observable.prototype.bufferingThrottle = function (minimumInterval) {
        var desc = new Desc(this, 'bufferingThrottle', [minimumInterval]);
        return withDesc(desc, this.flatMapConcat(function (x) {
            return once(x).concat(later(minimumInterval).filter(false));
        }));
    };
    Property.prototype.bufferingThrottle = function () {
        return Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
    };
    function Bus() {
        if (!(this instanceof Bus)) {
            return new Bus();
        }
        this.unsubAll = _.bind(this.unsubAll, this);
        this.subscribeAll = _.bind(this.subscribeAll, this);
        this.guardedSink = _.bind(this.guardedSink, this);
        this.sink = undefined;
        this.subscriptions = [];
        this.ended = false;
        EventStream.call(this, new Desc(Bacon, 'Bus', []), this.subscribeAll);
    }
    inherit(Bus, EventStream);
    extend(Bus.prototype, {
        unsubAll: function () {
            var iterable = this.subscriptions;
            for (var i = 0, sub; i < iterable.length; i++) {
                sub = iterable[i];
                if (typeof sub.unsub === 'function') {
                    sub.unsub();
                }
            }
        },
        subscribeAll: function (newSink) {
            if (this.ended) {
                newSink(endEvent());
            } else {
                this.sink = newSink;
                var iterable = cloneArray(this.subscriptions);
                for (var i = 0, subscription; i < iterable.length; i++) {
                    subscription = iterable[i];
                    this.subscribeInput(subscription);
                }
            }
            return this.unsubAll;
        },
        guardedSink: function (input) {
            var _this = this;
            return function (event) {
                if (event.isEnd) {
                    _this.unsubscribeInput(input);
                    return Bacon.noMore;
                } else {
                    return _this.sink(event);
                }
            };
        },
        subscribeInput: function (subscription) {
            subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
            return subscription.unsub;
        },
        unsubscribeInput: function (input) {
            var iterable = this.subscriptions;
            for (var i = 0, sub; i < iterable.length; i++) {
                sub = iterable[i];
                if (sub.input === input) {
                    if (typeof sub.unsub === 'function') {
                        sub.unsub();
                    }
                    this.subscriptions.splice(i, 1);
                    return;
                }
            }
        },
        plug: function (input) {
            var _this2 = this;
            if (this.ended) {
                return;
            }
            var sub = { input: input };
            this.subscriptions.push(sub);
            if (typeof this.sink !== 'undefined') {
                this.subscribeInput(sub);
            }
            return function () {
                return _this2.unsubscribeInput(input);
            };
        },
        end: function () {
            this.ended = true;
            this.unsubAll();
            if (typeof this.sink === 'function') {
                return this.sink(endEvent());
            }
        },
        push: function (value) {
            if (!this.ended && typeof this.sink === 'function') {
                var rootPush = !this.pushing;
                if (!rootPush) {
                    if (!this.pushQueue)
                        this.pushQueue = [];
                    this.pushQueue.push(value);
                    return;
                }
                this.pushing = true;
                try {
                    return this.sink(nextEvent(value));
                } finally {
                    if (rootPush && this.pushQueue) {
                        var i = 0;
                        while (i < this.pushQueue.length) {
                            var v = this.pushQueue[i];
                            this.sink(nextEvent(v));
                            i++;
                        }
                        this.pushQueue = null;
                    }
                    this.pushing = false;
                }
            }
        },
        error: function (error) {
            if (typeof this.sink === 'function') {
                return this.sink(new Error$1(error));
            }
        }
    });
    Bacon.Bus = Bus;
    Observable.prototype.flatMap = function () {
        return this.flatMap_(handleEventValueWith(makeSpawner(arguments)), { desc: new Desc(this, 'flatMap', arguments) });
    };
    var liftCallback = function (desc, wrapped) {
        return withMethodCallSupport(function (f) {
            var stream = partiallyApplied(wrapped, [function (values, callback) {
                    return f.apply(undefined, values.concat([callback]));
                }]);
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            return withDesc(new Desc(Bacon, desc, [f].concat(args)), Bacon.combineAsArray(args).flatMap(stream).changes());
        });
    };
    Bacon.fromCallback = liftCallback('fromCallback', function (f) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }
        return fromBinder(function (handler) {
            makeFunction(f, args)(handler);
            return nop;
        }, function (value) {
            return [
                value,
                endEvent()
            ];
        });
    });
    Bacon.fromNodeCallback = liftCallback('fromNodeCallback', function (f) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
        }
        return fromBinder(function (handler) {
            makeFunction(f, args)(handler);
            return nop;
        }, function (error, value) {
            if (error) {
                return [
                    new Error$1(error),
                    endEvent()
                ];
            }
            return [
                value,
                endEvent()
            ];
        });
    });
    function combineTemplate(template) {
        function current(ctxStack) {
            return ctxStack[ctxStack.length - 1];
        }
        function setValue(ctxStack, key, value) {
            current(ctxStack)[key] = value;
            return value;
        }
        function applyStreamValue(key, index) {
            return function (ctxStack, values) {
                setValue(ctxStack, key, values[index]);
            };
        }
        function constantValue(key, value) {
            return function (ctxStack) {
                setValue(ctxStack, key, value);
            };
        }
        function mkContext(template) {
            return isArray(template) ? [] : {};
        }
        function pushContext(key, value) {
            return function (ctxStack) {
                var newContext = mkContext(value);
                setValue(ctxStack, key, newContext);
                ctxStack.push(newContext);
            };
        }
        function containsObservables(value) {
            if (isObservable(value)) {
                return true;
            } else if (value && (value.constructor == Object || value.constructor == Array)) {
                for (var key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        var child = value[key];
                        if (containsObservables(child))
                            return true;
                    }
                }
            }
        }
        function compile(key, value) {
            if (isObservable(value)) {
                streams.push(value);
                funcs.push(applyStreamValue(key, streams.length - 1));
            } else if (containsObservables(value)) {
                var popContext = function (ctxStack) {
                    ctxStack.pop();
                };
                funcs.push(pushContext(key, value));
                compileTemplate(value);
                funcs.push(popContext);
            } else {
                funcs.push(constantValue(key, value));
            }
        }
        function combinator(values) {
            var rootContext = mkContext(template);
            var ctxStack = [rootContext];
            for (var i = 0, f; i < funcs.length; i++) {
                f = funcs[i];
                f(ctxStack, values);
            }
            return rootContext;
        }
        function compileTemplate(template) {
            _.each(template, compile);
        }
        var funcs = [];
        var streams = [];
        var resultProperty = containsObservables(template) ? (compileTemplate(template), Bacon.combineAsArray(streams).map(combinator)) : Bacon.constant(template);
        return withDesc(new Desc(Bacon, 'combineTemplate', [template]), resultProperty);
    }
    Bacon.combineTemplate = combineTemplate;
    Observable.prototype.mapEnd = function () {
        var f = makeFunctionArgs(arguments);
        return withDesc(new Desc(this, 'mapEnd', [f]), this.withHandler(function (event) {
            if (event.isEnd) {
                this.push(nextEvent(f(event)));
                this.push(endEvent());
                return noMore;
            } else {
                return this.push(event);
            }
        }));
    };
    Observable.prototype.skipErrors = function () {
        return withDesc(new Desc(this, 'skipErrors', []), this.withHandler(function (event) {
            if (event.isError) {
                return more;
            } else {
                return this.push(event);
            }
        }));
    };
    Observable.prototype.takeUntil = function (stopper) {
        var endMarker = {};
        var withEndMarker = groupSimultaneous_([
            this.mapEnd(endMarker),
            stopper.skipErrors()
        ], allowSync);
        if (this instanceof Property)
            withEndMarker = withEndMarker.toProperty();
        var impl = withEndMarker.withHandler(function (event) {
            if (!event.hasValue) {
                return this.push(event);
            } else {
                var _event$value = event.value, data = _event$value[0], stopper = _event$value[1];
                if (stopper.length) {
                    return this.push(endEvent());
                } else {
                    var reply = more;
                    for (var i = 0, value; i < data.length; i++) {
                        value = data[i];
                        if (value === endMarker) {
                            reply = this.push(endEvent());
                        } else {
                            reply = this.push(nextEvent(value));
                        }
                    }
                    return reply;
                }
            }
        });
        return withDesc(new Desc(this, 'takeUntil', [stopper]), impl);
    };
    Observable.prototype.flatMapLatest = function () {
        var f = makeSpawner(arguments);
        var stream = this._isProperty ? this.toEventStream(allowSync) : this;
        var flatMapped = stream.flatMap(function (value) {
            return makeObservable(f(value)).takeUntil(stream);
        });
        if (this._isProperty)
            flatMapped = flatMapped.toProperty();
        return withDesc(new Desc(this, 'flatMapLatest', [f]), flatMapped);
    };
    Property.prototype.delayChanges = function (desc, f) {
        return withDesc(desc, addPropertyInitValueToStream(this, f(this.changes())));
    };
    EventStream.prototype.delayChanges = function (desc, f) {
        return withDesc(desc, f(this));
    };
    Observable.prototype.delay = function (delay) {
        return this.delayChanges(new Desc(this, 'delay', [delay]), function (changes) {
            return changes.flatMap(function (value) {
                return later(delay, value);
            });
        });
    };
    Bacon.Observable.prototype.debounce = function (delay) {
        return this.delayChanges(new Desc(this, 'debounce', [delay]), function (changes) {
            return changes.flatMapLatest(function (value) {
                return Bacon.later(delay, value);
            });
        });
    };
    Bacon.Observable.prototype.debounceImmediate = function (delay) {
        return this.delayChanges(new Desc(this, 'debounceImmediate', [delay]), function (changes) {
            return changes.flatMapFirst(function (value) {
                return Bacon.once(value).concat(Bacon.later(delay).filter(false));
            });
        });
    };
    Observable.prototype.decode = function (cases) {
        return withDesc(new Desc(this, 'decode', [cases]), this.combine(combineTemplate(cases), function (key, values) {
            return values[key];
        }));
    };
    function scan(seed, f) {
        var _this = this;
        var resultProperty;
        f = toCombinator(f);
        var acc = seed;
        var initHandled = false;
        var subscribe = function (sink) {
            var initSent = false;
            var unsub = nop;
            var reply = more;
            var sendInit = function () {
                if (!initSent) {
                    initSent = initHandled = true;
                    reply = sink(new Initial(acc));
                    if (reply === noMore) {
                        unsub();
                        unsub = nop;
                    }
                }
            };
            unsub = _this.dispatcher.subscribe(function (event) {
                if (event.hasValue) {
                    if (initHandled && event.isInitial) {
                        return more;
                    } else {
                        if (!event.isInitial) {
                            sendInit();
                        }
                        initSent = initHandled = true;
                        var prev = acc;
                        var next = f(prev, event.value);
                        acc = next;
                        return sink(event.apply(next));
                    }
                } else {
                    if (event.isEnd) {
                        reply = sendInit();
                    }
                    if (reply !== noMore) {
                        return sink(event);
                    }
                }
            });
            UpdateBarrier.whenDoneWith(resultProperty, sendInit);
            return unsub;
        };
        return resultProperty = new Property(new Desc(this, 'scan', [
            seed,
            f
        ]), subscribe);
    }
    Observable.prototype.scan = scan;
    Observable.prototype.diff = function (start, f) {
        f = toCombinator(f);
        return withDesc(new Desc(this, 'diff', [
            start,
            f
        ]), this.scan([start], function (prevTuple, next) {
            return [
                next,
                f(prevTuple[0], next)
            ];
        }).filter(function (tuple) {
            return tuple.length === 2;
        }).map(function (tuple) {
            return tuple[1];
        }));
    };
    Observable.prototype.doAction = function () {
        var f = makeFunctionArgs(arguments);
        return withDesc(new Desc(this, 'doAction', [f]), this.withHandler(function (event) {
            if (event.hasValue) {
                f(event.value);
            }
            return this.push(event);
        }));
    };
    Observable.prototype.doEnd = function () {
        var f = makeFunctionArgs(arguments);
        return withDesc(new Desc(this, 'doEnd', [f]), this.withHandler(function (event) {
            if (event.isEnd) {
                f();
            }
            return this.push(event);
        }));
    };
    Observable.prototype.doError = function () {
        var f = makeFunctionArgs(arguments);
        return withDesc(new Desc(this, 'doError', [f]), this.withHandler(function (event) {
            if (event.isError) {
                f(event.error);
            }
            return this.push(event);
        }));
    };
    Observable.prototype.doLog = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return withDesc(new Desc(this, 'doLog', args), this.withHandler(function (event) {
            if (typeof console !== 'undefined' && console !== null && typeof console.log === 'function') {
                var _console;
                (_console = console).log.apply(_console, args.concat([event.log()]));
            }
            return this.push(event);
        }));
    };
    Observable.prototype.endOnError = function (f) {
        if (!(typeof f !== 'undefined' && f !== null)) {
            f = true;
        }
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        return convertArgsToFunction(this, f, args, function (f) {
            return withDesc(new Desc(this, 'endOnError', []), this.withHandler(function (event) {
                if (event.isError && f(event.error)) {
                    this.push(event);
                    return this.push(endEvent());
                } else {
                    return this.push(event);
                }
            }));
        });
    };
    Observable.prototype.errors = function () {
        return withDesc(new Desc(this, 'errors', []), this.filter(function () {
            return false;
        }));
    };
    function ESObservable(observable) {
        this.observable = observable;
    }
    ESObservable.prototype.subscribe = function (observerOrOnNext, onError, onComplete) {
        var observer = typeof observerOrOnNext === 'function' ? {
            next: observerOrOnNext,
            error: onError,
            complete: onComplete
        } : observerOrOnNext;
        var subscription = {
            closed: false,
            unsubscribe: function () {
                subscription.closed = true;
                cancel();
            }
        };
        var cancel = this.observable.subscribe(function (event) {
            if (event.isError) {
                if (observer.error)
                    observer.error(event.error);
                subscription.unsubscribe();
            } else if (event.isEnd) {
                subscription.closed = true;
                if (observer.complete)
                    observer.complete();
            } else if (observer.next) {
                observer.next(event.value);
            }
        });
        return subscription;
    };
    ESObservable.prototype[symbol('observable')] = function () {
        return this;
    };
    Observable.prototype.toESObservable = function () {
        return new ESObservable(this);
    };
    Observable.prototype[symbol('observable')] = Observable.prototype.toESObservable;
    Observable.prototype.take = function (count) {
        if (count <= 0) {
            return never();
        }
        return withDesc(new Desc(this, 'take', [count]), this.withHandler(function (event) {
            if (!event.hasValue) {
                return this.push(event);
            } else {
                count--;
                if (count > 0) {
                    return this.push(event);
                } else {
                    if (count === 0) {
                        this.push(event);
                    }
                    this.push(endEvent());
                    return noMore;
                }
            }
        }));
    };
    Observable.prototype.first = function () {
        return withDesc(new Desc(this, 'first', []), this.take(1));
    };
    Observable.prototype.flatMapEvent = function () {
        return this.flatMap_(makeSpawner(arguments), {
            mapError: true,
            desc: new Desc(this, 'flatMapEvent', arguments)
        });
    };
    Observable.prototype.flatMapFirst = function () {
        return this.flatMap_(handleEventValueWith(makeSpawner(arguments)), {
            firstOnly: true,
            desc: new Desc(this, 'flatMapFirst', arguments)
        });
    };
    Observable.prototype.mapError = function () {
        var f = makeFunctionArgs(arguments);
        return withDesc(new Desc(this, 'mapError', [f]), this.withHandler(function (event) {
            if (event.isError) {
                return this.push(nextEvent(f(event.error)));
            } else {
                return this.push(event);
            }
        }));
    };
    Observable.prototype.flatMapError = function (fn) {
        return this.flatMap_(function (x) {
            if (x instanceof Error$1) {
                return fn(x.error);
            } else {
                return x;
            }
        }, {
            mapError: true,
            desc: new Desc(this, 'flatMapError', [fn])
        });
    };
    Observable.prototype.flatScan = function (seed, f) {
        var current = seed;
        return this.flatMapConcat(function (next) {
            return makeObservable(f(current, next)).doAction(function (updated) {
                return current = updated;
            });
        }).toProperty(seed);
    };
    EventStream.prototype.sampledBy = function (sampler, combinator) {
        return withDesc(new Desc(this, 'sampledBy', [
            sampler,
            combinator
        ]), this.toProperty().sampledBy(sampler, combinator));
    };
    Property.prototype.sampledBy = function (sampler, combinator) {
        if (typeof combinator !== 'undefined' && combinator !== null) {
            combinator = toCombinator(combinator);
        } else {
            combinator = Bacon._.id;
        }
        var thisSource = new Source(this, false);
        var samplerSource = new Source(sampler, true);
        var w = sampler._isProperty ? whenP : when;
        var result = w([
            thisSource,
            samplerSource
        ], combinator);
        return withDesc(new Desc(this, 'sampledBy', [
            sampler,
            combinator
        ]), result);
    };
    Property.prototype.sample = function (interval) {
        return withDesc(new Desc(this, 'sample', [interval]), this.sampledBy(Bacon.interval(interval, {})));
    };
    Observable.prototype.map = function (p) {
        if (p && p._isProperty) {
            return p.sampledBy(this, former);
        } else {
            return map.apply(this, arguments);
        }
    };
    Observable.prototype.fold = function (seed, f) {
        return withDesc(new Desc(this, 'fold', [
            seed,
            f
        ]), this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
    };
    Observable.prototype.reduce = Observable.prototype.fold;
    Bacon.fromArray = function (values) {
        if (!values.length) {
            return withDesc(new Desc(Bacon, 'fromArray', values), never());
        } else {
            var i = 0;
            var stream = new EventStream(new Desc(Bacon, 'fromArray', [values]), function (sink) {
                var unsubd = false;
                var reply = more;
                var pushing = false;
                var pushNeeded = false;
                function push() {
                    pushNeeded = true;
                    if (pushing) {
                        return;
                    }
                    pushing = true;
                    while (pushNeeded) {
                        pushNeeded = false;
                        if (reply !== noMore && !unsubd) {
                            var value = values[i++];
                            reply = sink(toEvent(value));
                            if (reply !== noMore) {
                                if (i === values.length) {
                                    sink(endEvent());
                                } else {
                                    UpdateBarrier.afterTransaction(stream, push);
                                }
                            }
                        }
                    }
                    pushing = false;
                    return pushing;
                }
                UpdateBarrier.soonButNotYet(stream, push);
                return function () {
                    unsubd = true;
                    return unsubd;
                };
            });
            return stream;
        }
    };
    Bacon.fromESObservable = function (_observable) {
        var observable;
        if (_observable[symbol('observable')]) {
            observable = _observable[symbol('observable')]();
        } else {
            observable = _observable;
        }
        var desc = new Desc(Bacon, 'fromESObservable', [observable]);
        return new EventStream(desc, function (sink) {
            var cancel = observable.subscribe({
                error: function () {
                    sink(new Bacon.Error());
                    sink(new Bacon.End());
                },
                next: function (value) {
                    sink(new Bacon.Next(value, true));
                },
                complete: function () {
                    sink(new Bacon.End());
                }
            });
            if (cancel.unsubscribe) {
                return function () {
                    cancel.unsubscribe();
                };
            } else {
                return cancel;
            }
        });
    };
    var eventMethods = [
        [
            'addEventListener',
            'removeEventListener'
        ],
        [
            'addListener',
            'removeListener'
        ],
        [
            'on',
            'off'
        ],
        [
            'bind',
            'unbind'
        ]
    ];
    var findHandlerMethods = function (target) {
        var pair;
        for (var i = 0; i < eventMethods.length; i++) {
            pair = eventMethods[i];
            var methodPair = [
                target[pair[0]],
                target[pair[1]]
            ];
            if (methodPair[0] && methodPair[1]) {
                return methodPair;
            }
        }
        for (var j = 0; j < eventMethods.length; j++) {
            pair = eventMethods[j];
            var addListener = target[pair[0]];
            if (addListener) {
                return [
                    addListener,
                    function () {
                    }
                ];
            }
        }
        throw new Error('No suitable event methods in ' + target);
    };
    function fromEventTarget(target, eventName, eventTransformer) {
        var _findHandlerMethods = findHandlerMethods(target), sub = _findHandlerMethods[0], unsub = _findHandlerMethods[1];
        var desc = new Desc(Bacon, 'fromEvent', [
            target,
            eventName
        ]);
        return withDesc(desc, fromBinder(function (handler) {
            sub.call(target, eventName, handler);
            return function () {
                return unsub.call(target, eventName, handler);
            };
        }, eventTransformer));
    }
    Bacon.fromEvent = Bacon.fromEventTarget = fromEventTarget;
    function fromPoll(delay, poll) {
        var desc = new Desc(Bacon, 'fromPoll', [
            delay,
            poll
        ]);
        return withDesc(desc, fromBinder(function (handler) {
            var id = Bacon.scheduler.setInterval(handler, delay);
            return function () {
                return Bacon.scheduler.clearInterval(id);
            };
        }, poll));
    }
    Bacon.fromPoll = fromPoll;
    function valueAndEnd(value) {
        return [
            value,
            endEvent()
        ];
    }
    function fromPromise(promise, abort) {
        var eventTransformer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : valueAndEnd;
        return withDesc(new Desc(Bacon, 'fromPromise', [promise]), fromBinder(function (handler) {
            var bound = promise.then(handler, function (e) {
                return handler(new Error$1(e));
            });
            if (bound && typeof bound.done === 'function') {
                bound.done();
            }
            if (abort) {
                return function () {
                    if (typeof promise.abort === 'function') {
                        return promise.abort();
                    }
                };
            } else {
                return function () {
                };
            }
        }, eventTransformer));
    }
    Bacon.fromPromise = fromPromise;
    Observable.prototype.groupBy = function (keyF) {
        var limitF = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.id;
        var streams = {};
        var src = this;
        return src.filter(function (x) {
            return !streams[keyF(x)];
        }).map(function (x) {
            var key = keyF(x);
            var similar = src.filter(function (x) {
                return keyF(x) === key;
            });
            var data = once(x).concat(similar);
            var limited = limitF(data, x).withHandler(function (event) {
                this.push(event);
                if (event.isEnd) {
                    return delete streams[key];
                }
            });
            streams[key] = limited;
            return limited;
        });
    };
    EventStream.prototype.holdWhen = function (valve) {
        var onHold = false;
        var bufferedValues = [];
        var src = this;
        var srcIsEnded = false;
        return new EventStream(new Desc(this, 'holdWhen', [valve]), function (sink) {
            var composite = new CompositeUnsubscribe();
            var subscribed = false;
            var endIfBothEnded = function (unsub) {
                if (typeof unsub === 'function') {
                    unsub();
                }
                if (composite.empty() && subscribed) {
                    return sink(endEvent());
                }
            };
            composite.add(function (unsubAll, unsubMe) {
                return valve.subscribeInternal(function (event) {
                    if (event.hasValue) {
                        onHold = event.value;
                        if (!onHold) {
                            var toSend = bufferedValues;
                            bufferedValues = [];
                            return function () {
                                var result = [];
                                for (var i = 0, value; i < toSend.length; i++) {
                                    value = toSend[i];
                                    result.push(sink(nextEvent(value)));
                                }
                                if (srcIsEnded) {
                                    result.push(sink(endEvent()));
                                    unsubMe();
                                }
                                return result;
                            }();
                        }
                    } else if (event.isEnd) {
                        return endIfBothEnded(unsubMe);
                    } else {
                        return sink(event);
                    }
                });
            });
            composite.add(function (unsubAll, unsubMe) {
                return src.subscribeInternal(function (event) {
                    if (onHold && event.hasValue) {
                        return bufferedValues.push(event.value);
                    } else if (event.isEnd && bufferedValues.length) {
                        srcIsEnded = true;
                        return endIfBothEnded(unsubMe);
                    } else {
                        return sink(event);
                    }
                });
            });
            subscribed = true;
            endIfBothEnded();
            return composite.unsubscribe;
        });
    };
    function interval(delay) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return withDesc(new Desc(Bacon, 'interval', [
            delay,
            value
        ]), fromPoll(delay, function () {
            return nextEvent(value);
        }));
    }
    Bacon.interval = interval;
    Bacon.$ = {};
    Bacon.$.asEventStream = function (eventName, selector, eventTransformer) {
        var _this = this;
        if (_.isFunction(selector)) {
            eventTransformer = selector;
            selector = undefined;
        }
        return withDesc(new Desc(this.selector || this, 'asEventStream', [eventName]), fromBinder(function (handler) {
            _this.on(eventName, selector, handler);
            return function () {
                return _this.off(eventName, selector, handler);
            };
        }, eventTransformer));
    };
    if (typeof jQuery !== 'undefined' && jQuery) {
        jQuery.fn.asEventStream = Bacon.$.asEventStream;
    }
    if (typeof Zepto !== 'undefined' && Zepto) {
        Zepto.fn.asEventStream = Bacon.$.asEventStream;
    }
    Observable.prototype.last = function () {
        var lastEvent;
        return withDesc(new Desc(this, 'last', []), this.withHandler(function (event) {
            if (event.isEnd) {
                if (lastEvent) {
                    this.push(lastEvent);
                }
                this.push(endEvent());
                return noMore;
            } else {
                lastEvent = event;
            }
        }));
    };
    Observable.prototype.log = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        this.subscribe(function (event) {
            if (typeof console !== 'undefined' && typeof console.log === 'function') {
                var _console;
                (_console = console).log.apply(_console, args.concat([event.log()]));
            }
        });
        return this;
    };
    EventStream.prototype.merge = function (right) {
        var left = this;
        return withDesc(new Desc(left, 'merge', [right]), mergeAll(this, right));
    };
    function mergeAll() {
        var streams = argumentsToObservables(arguments);
        if (streams.length) {
            return new EventStream(new Desc(Bacon, 'mergeAll', streams), function (sink) {
                var ends = 0;
                var smartSink = function (obs) {
                    return function (unsubBoth) {
                        return obs.dispatcher.subscribe(function (event) {
                            if (event.isEnd) {
                                ends++;
                                if (ends === streams.length) {
                                    return sink(endEvent());
                                } else {
                                    return more;
                                }
                            } else {
                                var reply = sink(event);
                                if (reply === noMore) {
                                    unsubBoth();
                                }
                                return reply;
                            }
                        });
                    };
                };
                var sinks = _.map(smartSink, streams);
                return new CompositeUnsubscribe(sinks).unsubscribe;
            });
        } else {
            return never();
        }
    }
    Bacon.mergeAll = mergeAll;
    function repeatedly(delay, values) {
        var index = 0;
        return withDesc(new Desc(Bacon, 'repeatedly', [
            delay,
            values
        ]), fromPoll(delay, function () {
            return values[index++ % values.length];
        }));
    }
    Bacon.repeatedly = repeatedly;
    function repeat(generator) {
        var index = 0;
        return fromBinder(function (sink) {
            var flag = false;
            var reply = more;
            var unsub = function () {
            };
            function handleEvent(event) {
                if (event.isEnd) {
                    if (!flag) {
                        return flag = true;
                    } else {
                        return subscribeNext();
                    }
                } else {
                    return reply = sink(event);
                }
            }
            function subscribeNext() {
                var next;
                flag = true;
                while (flag && reply !== noMore) {
                    next = generator(index++);
                    flag = false;
                    if (next) {
                        unsub = next.subscribeInternal(handleEvent);
                    } else {
                        sink(endEvent());
                    }
                }
                return flag = true;
            }
            subscribeNext();
            return function () {
                return unsub();
            };
        });
    }
    Bacon.repeat = repeat;
    Bacon.retry = function (options) {
        if (!_.isFunction(options.source)) {
            throw new Error('\'source\' option has to be a function');
        }
        var source = options.source;
        var retries = options.retries || 0;
        var retriesDone = 0;
        var delay = options.delay || function () {
            return 0;
        };
        var isRetryable = options.isRetryable || function () {
            return true;
        };
        var finished = false;
        var error = null;
        return withDesc(new Desc(Bacon, 'retry', [options]), Bacon.repeat(function (count) {
            function valueStream() {
                return source(count).endOnError().withHandler(function (event) {
                    if (event.isError) {
                        error = event;
                        if (!(isRetryable(error.error) && (retries === 0 || retriesDone < retries))) {
                            finished = true;
                            return this.push(event);
                        }
                    } else {
                        if (event.hasValue) {
                            error = null;
                            finished = true;
                        }
                        return this.push(event);
                    }
                });
            }
            if (finished) {
                return null;
            } else if (error) {
                var context = {
                    error: error.error,
                    retriesDone: retriesDone
                };
                var pause = later(delay(context)).filter(false);
                retriesDone++;
                return pause.concat(Bacon.once().flatMap(valueStream));
            } else {
                return valueStream();
            }
        }));
    };
    function sequentially(delay, values) {
        var index = 0;
        return withDesc(new Desc(Bacon, 'sequentially', [
            delay,
            values
        ]), fromPoll(delay, function () {
            var value = values[index++];
            if (index < values.length) {
                return value;
            } else if (index === values.length) {
                return [
                    value,
                    endEvent()
                ];
            } else {
                return endEvent();
            }
        }));
    }
    Bacon.sequentially = sequentially;
    Observable.prototype.skip = function (count) {
        return withDesc(new Desc(this, 'skip', [count]), this.withHandler(function (event) {
            if (!event.hasValue) {
                return this.push(event);
            } else if (count > 0) {
                count--;
                return more;
            } else {
                return this.push(event);
            }
        }));
    };
    EventStream.prototype.skipUntil = function (starter) {
        var started = starter.take(1).map(true).toProperty(false);
        return withDesc(new Desc(this, 'skipUntil', [starter]), this.filter(started));
    };
    EventStream.prototype.skipWhile = function (f) {
        var ok = false;
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        return convertArgsToFunction(this, f, args, function (f) {
            return withDesc(new Desc(this, 'skipWhile', [f]), this.withHandler(function (event) {
                if (ok || !event.hasValue || !f(event.value)) {
                    if (event.hasValue) {
                        ok = true;
                    }
                    return this.push(event);
                } else {
                    return more;
                }
            }));
        });
    };
    Property.prototype.startWith = function (seed) {
        return withDesc(new Desc(this, 'startWith', [seed]), this.scan(seed, function (prev, next) {
            return next;
        }));
    };
    EventStream.prototype.startWith = function (seed) {
        return withDesc(new Desc(this, 'startWith', [seed]), once(seed).concat(this));
    };
    Observable.prototype.slidingWindow = function (n) {
        var minValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return withDesc(new Desc(this, 'slidingWindow', [
            n,
            minValues
        ]), this.scan([], function (window, value) {
            return window.concat([value]).slice(-n);
        }).filter(function (values) {
            return values.length >= minValues;
        }));
    };
    Observable.prototype.takeWhile = function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        return convertArgsToFunction(this, f, args, function (f) {
            return withDesc(new Desc(this, 'takeWhile', [f]), this.withHandler(function (event) {
                if (event.filter(f)) {
                    return this.push(event);
                } else {
                    this.push(endEvent());
                    return noMore;
                }
            }));
        });
    };
    Observable.prototype.throttle = function (delay) {
        return this.delayChanges(new Desc(this, 'throttle', [delay]), function (changes) {
            return changes.bufferWithTime(delay).map(function (values) {
                return values[values.length - 1];
            });
        });
    };
    Observable.prototype.firstToPromise = function (PromiseCtr) {
        var _this = this;
        if (typeof PromiseCtr !== 'function') {
            if (typeof Promise === 'function') {
                PromiseCtr = Promise;
            } else {
                throw new Error('There isn\'t default Promise, use shim or parameter');
            }
        }
        return new PromiseCtr(function (resolve, reject) {
            return _this.subscribe(function (event) {
                if (event.hasValue) {
                    resolve(event.value);
                }
                if (event.isError) {
                    reject(event.error);
                }
                return noMore;
            });
        });
    };
    Observable.prototype.toPromise = function (PromiseCtr) {
        return this.last().firstToPromise(PromiseCtr);
    };
    function tryF(f) {
        return function (value) {
            try {
                return once(f(value));
            } catch (e) {
                return new Error$1(e);
            }
        };
    }
    Bacon['try'] = tryF;
    function update(initial) {
        function lateBindFirst(f) {
            return function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }
                return function (i) {
                    return f.apply(undefined, [i].concat(args));
                };
            };
        }
        for (var _len = arguments.length, patterns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            patterns[_key - 1] = arguments[_key];
        }
        var i = patterns.length - 1;
        while (i > 0) {
            if (!(patterns[i] instanceof Function)) {
                patterns[i] = _.always(patterns[i]);
            }
            patterns[i] = lateBindFirst(patterns[i]);
            i = i - 2;
        }
        return withDesc(new Desc(Bacon, 'update', [initial].concat(patterns)), when.apply(undefined, patterns).scan(initial, function (x, f) {
            return f(x);
        }));
    }
    Bacon.update = update;
    Bacon.zipAsArray = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        var streams = argumentsToObservables(args);
        return withDesc(new Desc(Bacon, 'zipAsArray', streams), Bacon.zipWith(streams, function () {
            for (var _len2 = arguments.length, xs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                xs[_key2] = arguments[_key2];
            }
            return xs;
        }));
    };
    Bacon.zipWith = function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }
        var observablesAndFunction = argumentsToObservablesAndFunction(args);
        var streams = observablesAndFunction[0];
        var f = observablesAndFunction[1];
        streams = _.map(function (s) {
            return s.toEventStream();
        }, streams);
        return withDesc(new Desc(Bacon, 'zipWith', [f].concat(streams)), Bacon.when(streams, f));
    };
    Observable.prototype.zip = function (other, f) {
        return withDesc(new Desc(this, 'zip', [other]), Bacon.zipWith([
            this,
            other
        ], f || Array));
    };
    return Bacon;
}));