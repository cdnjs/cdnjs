/*! { "name": "vissense", "version": "0.4.0-rc1", "homepage": "https://vissense.github.io/vissense","copyright": "(c) 2015 tbk" } */
!function(root, factory) {
    "use strict";
    root.VisSense = factory(root, root.document);
}(this, function(window, document, undefined) {
    "use strict";
    function async(callback, delay) {
        return function() {
            var args = arguments;
            return defer(function() {
                callback.apply(undefined, args);
            }, delay || 0);
        };
    }
    function debounce(callback, delay) {
        var cancel = noop;
        return function() {
            var self = this, args = arguments;
            cancel(), cancel = defer(function() {
                callback.apply(self, args);
            }, delay);
        };
    }
    function defaults(dest, source) {
        var sourceIsObject = isObject(source), destIsObject = isObject(dest);
        return sourceIsObject || destIsObject ? sourceIsObject && destIsObject ? (forEach(Object.keys(source), function(property) {
            dest[property] === undefined && (dest[property] = source[property]);
        }), dest) : sourceIsObject ? source : dest : source;
    }
    function defer(callback, delay) {
        var timer = setTimeout(function() {
            callback();
        }, delay || 0);
        return function() {
            clearTimeout(timer);
        };
    }
    function fireIf(when, callback) {
        return function() {
            return (isFunction(when) ? when() : when) ? callback() : undefined;
        };
    }
    function extend(dest, source, callback) {
        for (var index = -1, props = Object.keys(source), length = props.length, ask = isFunction(callback); ++index < length; ) {
            var key = props[index];
            dest[key] = ask ? callback(dest[key], source[key], key, dest, source) : source[key];
        }
        return dest;
    }
    function forEach(array, callback, thisArg) {
        for (var i = 0, n = array.length; n > i; i++) {
            var result = callback.call(thisArg, array[i], i, array);
            if (result !== undefined) return result;
        }
    }
    function identity(value) {
        return value;
    }
    function isDefined(value) {
        return value !== undefined;
    }
    function isArray(value) {
        return value && "object" == typeof value && "number" == typeof value.length && "[object Array]" === Object.prototype.toString.call(value) || !1;
    }
    function isElement(value) {
        return value && 1 === value.nodeType || !1;
    }
    function isFunction(value) {
        return "function" == typeof value || !1;
    }
    function isObject(value) {
        var type = typeof value;
        return "function" === type || value && "object" === type || !1;
    }
    function noop() {}
    function now() {
        return new Date().getTime();
    }
    function once(callback) {
        var cache, called = !1;
        return function() {
            return called || (cache = callback.apply(undefined, arguments), called = !0), cache;
        };
    }
    function viewport() {
        return {
            height: window.innerHeight,
            width: window.innerWidth
        };
    }
    function computedStyle(element) {
        return window.getComputedStyle(element, null);
    }
    function styleProperty(style, property) {
        return style.getPropertyValue(property);
    }
    function isDisplayed(element, style) {
        style || (style = computedStyle(element));
        var display = styleProperty(style, "display");
        if ("none" === display) return !1;
        var visibility = styleProperty(style, "visibility");
        if ("hidden" === visibility || "collapse" === visibility) return !1;
        var parent = element.parentNode;
        return isElement(parent) ? isDisplayed(parent) : !0;
    }
    function isVisibleByStyling(element) {
        if (element === document) return !0;
        if (!element || !element.parentNode) return !1;
        var style = computedStyle(element);
        return isDisplayed(element, style);
    }
    function isInViewport(rect, viewport) {
        return !rect || rect.width <= 0 || rect.height <= 0 ? !1 : rect.bottom > 0 && rect.right > 0 && rect.top < viewport.height && rect.left < viewport.width;
    }
    function percentage(element) {
        var rect = element.getBoundingClientRect(), view = viewport();
        if (!isInViewport(rect, view) || !isVisibleByStyling(element)) return 0;
        var vh = 0, vw = 0;
        return rect.top >= 0 ? vh = Math.min(rect.height, view.height - rect.top) : rect.bottom > 0 && (vh = Math.min(view.height, rect.bottom)), 
        rect.left >= 0 ? vw = Math.min(rect.width, view.width - rect.left) : rect.right > 0 && (vw = Math.min(view.width, rect.right)), 
        Math.round(vh * vw / (rect.height * rect.width) * 1e3) / 1e3;
    }
    function isPageVisible() {
        return VisibilityApi ? !document[VisibilityApi[0]] : !0;
    }
    function VisSense(element, config) {
        if (!(this instanceof VisSense)) return new VisSense(element, config);
        if (!isElement(element)) throw new Error("not an element node");
        this._element = element, this._config = defaults(config, {
            fullyvisible: 1,
            hidden: 0,
            percentageHook: percentage,
            visibilityHooks: []
        }), this._config.visibilityHooks.push(function() {
            return isPageVisible();
        });
    }
    function nextState(visobj, currentState) {
        var newState = visobj.state(), percentage = newState.percentage;
        return currentState && percentage === currentState.percentage && currentState.percentage === currentState.previous.percentage ? currentState : newState.hidden ? VisSense.VisState.hidden(percentage, currentState) : newState.fullyvisible ? VisSense.VisState.fullyvisible(percentage, currentState) : VisSense.VisState.visible(percentage, currentState);
    }
    function VisMon(visobj, config) {
        this._visobj = visobj, this._state = {}, this._pubsub = new PubSub(), this._events = [ "start", "stop", "update", "hidden", "visible", "fullyvisible", "percentagechange", "visibilitychange" ];
        var _config = defaults(config, {
            strategy: [ new VisMon.Strategy.PollingStrategy(), new VisMon.Strategy.EventStrategy() ],
            async: !1
        });
        this._setStrategy(_config.strategy), this._pubsub.on("update", function(monitor) {
            var newValue = monitor._state.percentage, oldValue = monitor._state.previous.percentage;
            newValue !== oldValue && monitor._pubsub.publish("percentagechange", [ monitor, newValue, oldValue ]);
        }), this._pubsub.on("update", function(monitor) {
            monitor._state.code !== monitor._state.previous.code && monitor._pubsub.publish("visibilitychange", [ monitor ]);
        }), this._pubsub.on("visibilitychange", function(monitor) {
            monitor._state.visible && !monitor._state.previous.visible && monitor._pubsub.publish("visible", [ monitor ]);
        }), this._pubsub.on("visibilitychange", function(monitor) {
            monitor._state.fullyvisible && monitor._pubsub.publish("fullyvisible", [ monitor ]);
        }), this._pubsub.on("visibilitychange", function(monitor) {
            monitor._state.hidden && monitor._pubsub.publish("hidden", [ monitor ]);
        }), forEach(this._events, function(event) {
            isFunction(_config[event]) && this.on(event, _config[event]);
        }, this);
    }
    var VisibilityApi = function(undefined) {
        var event = "visibilitychange", dict = [ [ "hidden", event ], [ "mozHidden", "moz" + event ], [ "webkitHidden", "webkit" + event ], [ "msHidden", "ms" + event ] ];
        return forEach(dict, function(entry) {
            return document[entry[0]] !== undefined ? entry : void 0;
        });
    }(), PubSub = function(undefined) {
        function PubSub(config) {
            this._cache = {}, this._onAnyCache = [], this._config = defaults(config, {
                async: !1,
                anyTopicName: "*"
            });
        }
        var fireListeners = function(topic, listeners, args) {
            forEach(listeners, function(listener) {
                listener(args);
            });
        };
        return PubSub.prototype.on = function(topic, callback) {
            if (!isFunction(callback)) return noop;
            var applyCallback = function(args) {
                return callback.apply(undefined, args || []);
            }, listener = this._config.async ? async(applyCallback) : applyCallback, unregister = function(listener, array, topic) {
                return function() {
                    var index = array.indexOf(listener);
                    return index > -1 ? (array.splice(index, 1), !0) : !1;
                };
            };
            return topic === this._config.anyTopicName ? (this._onAnyCache.push(listener), unregister(listener, this._onAnyCache, "*")) : (this._cache[topic] || (this._cache[topic] = []), 
            this._cache[topic].push(listener), unregister(listener, this._cache[topic], topic));
        }, PubSub.prototype.publish = function(topic, args) {
            var listeners = (this._cache[topic] || []).concat(topic === this._config.anyTopicName ? [] : this._onAnyCache), syncOrAsyncPublish = this._config.async ? async(fireListeners) : fireListeners;
            return syncOrAsyncPublish(topic, listeners, args || []);
        }, PubSub;
    }();
    VisSense.prototype.state = function() {
        var hiddenByHook = forEach(this._config.visibilityHooks, function(hook) {
            return hook(this._element) ? void 0 : VisSense.VisState.hidden(0);
        }, this);
        return hiddenByHook || function(element, config) {
            var perc = config.percentageHook(element);
            return perc <= config.hidden ? VisSense.VisState.hidden(perc) : perc >= config.fullyvisible ? VisSense.VisState.fullyvisible(perc) : VisSense.VisState.visible(perc);
        }(this._element, this._config);
    }, VisSense.prototype.percentage = function() {
        return this.state().percentage;
    }, VisSense.prototype.element = function() {
        return this._element;
    }, VisSense.prototype.isFullyVisible = function() {
        return this.state().fullyvisible;
    }, VisSense.prototype.isVisible = function() {
        return this.state().visible;
    }, VisSense.prototype.isHidden = function() {
        return this.state().hidden;
    }, VisSense.fn = VisSense.prototype, VisSense.of = function(element, config) {
        return new VisSense(element, config);
    };
    var STATES = {
        HIDDEN: [ 0, "hidden" ],
        VISIBLE: [ 1, "visible" ],
        FULLY_VISIBLE: [ 2, "fullyvisible" ]
    };
    return VisSense.VisState = function() {
        function newVisState(state, percentage, previous) {
            return previous && delete previous.previous, {
                code: state[0],
                state: state[1],
                percentage: percentage,
                previous: previous || {},
                fullyvisible: state[0] === STATES.FULLY_VISIBLE[0],
                visible: state[0] === STATES.VISIBLE[0] || state[0] === STATES.FULLY_VISIBLE[0],
                hidden: state[0] === STATES.HIDDEN[0]
            };
        }
        return {
            hidden: function(percentage, previous) {
                return newVisState(STATES.HIDDEN, percentage, previous);
            },
            visible: function(percentage, previous) {
                return newVisState(STATES.VISIBLE, percentage, previous);
            },
            fullyvisible: function(percentage, previous) {
                return newVisState(STATES.FULLY_VISIBLE, percentage, previous);
            }
        };
    }(), VisMon.prototype._setStrategy = function(strategies) {
        this._strategy = new VisMon.Strategy.CompositeStrategy(strategies), this._strategy.init(this);
    }, VisMon.prototype.visobj = function() {
        return this._visobj;
    }, VisMon.prototype.state = function() {
        return this._state;
    }, VisMon.prototype.start = function(config) {
        var _config = defaults(config, {
            async: !1
        });
        return this._cancelAsyncStart && this._cancelAsyncStart(), _config.async ? this.startAsync() : (this.update(), 
        this._pubsub.publish("start", [ this ]), this._strategy.start(this), this);
    }, VisMon.prototype.startAsync = function(config) {
        this._cancelAsyncStart && this._cancelAsyncStart();
        var me = this, cancelAsyncStart = defer(function() {
            me.start(extend(defaults(config, {}), {
                async: !1
            }));
        });
        return this._cancelAsyncStart = function() {
            cancelAsyncStart(), me._cancelAsyncStart = null;
        }, this;
    }, VisMon.prototype.stop = function() {
        this._cancelAsyncStart ? this._cancelAsyncStart() : (this._strategy.stop(this), 
        this._pubsub.publish("stop", [ this ]));
    }, VisMon.prototype.use = function(strategy) {
        return this.stop(), this._setStrategy(strategy), this.start();
    }, VisMon.prototype.update = function() {
        this._state = nextState(this._visobj, this._state), this._pubsub.publish("update", [ this ]);
    }, VisMon.prototype.onUpdate = function(callback) {
        return this.on("update", callback);
    }, VisMon.prototype.onVisibilityChange = function(callback) {
        return this.on("visibilitychange", callback);
    }, VisMon.prototype.onPercentageChange = function(callback) {
        return this.on("percentagechange", callback);
    }, VisMon.prototype.onVisible = function(callback) {
        return this.on("visible", callback);
    }, VisMon.prototype.onFullyVisible = function(callback) {
        return this.on("fullyvisible", callback);
    }, VisMon.prototype.onHidden = function(callback) {
        return this.on("hidden", callback);
    }, VisMon.prototype.on = function(topic, callback) {
        return this._pubsub.on(topic, callback);
    }, VisMon.Strategy = function() {}, VisMon.Strategy.prototype.init = noop, VisMon.Strategy.prototype.start = noop, 
    VisMon.Strategy.prototype.stop = noop, VisMon.Strategy.CompositeStrategy = function(strategies) {
        this._strategies = isArray(strategies) ? strategies : [ strategies ];
    }, VisMon.Strategy.CompositeStrategy.prototype = Object.create(VisMon.Strategy.prototype), 
    VisMon.Strategy.CompositeStrategy.prototype.init = function(monitor) {
        forEach(this._strategies, function(strategy) {
            isFunction(strategy.init) && strategy.init(monitor);
        });
    }, VisMon.Strategy.CompositeStrategy.prototype.start = function(monitor) {
        forEach(this._strategies, function(strategy) {
            isFunction(strategy.start) && strategy.start(monitor);
        });
    }, VisMon.Strategy.CompositeStrategy.prototype.stop = function(monitor) {
        forEach(this._strategies, function(strategy) {
            isFunction(strategy.stop) && strategy.stop(monitor);
        });
    }, VisMon.Strategy.PollingStrategy = function(config) {
        this._config = defaults(config, {
            interval: 1e3
        }), this._started = !1;
    }, VisMon.Strategy.PollingStrategy.prototype = Object.create(VisMon.Strategy.prototype), 
    VisMon.Strategy.PollingStrategy.prototype.start = function(monitor) {
        return this._started || (this._clearInterval = function(interval) {
            var intervalId = setInterval(function() {
                monitor.update();
            }, interval);
            return function() {
                clearInterval(intervalId);
            };
        }(this._config.interval), this._started = !0), this._started;
    }, VisMon.Strategy.PollingStrategy.prototype.stop = function() {
        return this._started ? (this._clearInterval(), this._started = !1, !0) : !1;
    }, VisMon.Strategy.EventStrategy = function(config) {
        this._config = defaults(config, {
            debounce: 50
        }), this._started = !1;
    }, VisMon.Strategy.EventStrategy.prototype = Object.create(VisMon.Strategy.prototype), 
    VisMon.Strategy.EventStrategy.prototype.start = function(monitor) {
        if (!this._started) {
            var me = this;
            this._removeEventListeners = function() {
                var update = debounce(function() {
                    monitor.update();
                }, me._config.debounce);
                return VisibilityApi && addEventListener(VisibilityApi[1], update), addEventListener("scroll", update), 
                addEventListener("resize", update), function() {
                    removeEventListener("resize", update), removeEventListener("scroll", update), VisibilityApi && removeEventListener(VisibilityApi[1], update);
                };
            }(), this._started = !0;
        }
        return this._started;
    }, VisMon.Strategy.EventStrategy.prototype.stop = function() {
        return this._started ? (this._removeEventListeners(), this._started = !1, !0) : !1;
    }, VisSense.VisMon = VisMon, VisSense.PubSub = PubSub, VisSense.fn.monitor = function(config) {
        return new VisMon(this, config);
    }, VisSense.Utils = {
        async: async,
        debounce: debounce,
        defaults: defaults,
        defer: defer,
        extend: extend,
        forEach: forEach,
        fireIf: fireIf,
        identity: identity,
        isArray: isArray,
        isDefined: isDefined,
        isElement: isElement,
        isFunction: isFunction,
        isObject: isObject,
        isPageVisible: isPageVisible,
        isVisibleByStyling: isVisibleByStyling,
        noop: noop,
        now: now,
        once: once,
        percentage: percentage,
        _viewport: viewport,
        _isInViewport: isInViewport,
        _isDisplayed: isDisplayed,
        _computedStyle: computedStyle,
        _styleProperty: styleProperty
    }, VisSense;
});