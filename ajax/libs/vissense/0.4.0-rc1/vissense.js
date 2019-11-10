/*! { "name": "vissense", "version": "0.4.0-rc1", "homepage": "https://vissense.github.io/vissense","copyright": "(c) 2015 tbk" } */
!function(root, factory) {
    "use strict";
    root.VisSense = factory(root, root.document);
}(this, function(window, document, undefined) {
    "use strict";
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
        if (!sourceIsObject && !destIsObject) return source;
        if (!sourceIsObject || !destIsObject) return sourceIsObject ? source : dest;
        for (var keys = Object.keys(source), i = 0, n = keys.length; n > i; i++) {
            var prop = keys[i];
            dest[prop] === undefined && (dest[prop] = source[prop]);
        }
        return dest;
    }
    function defer(callback, delay) {
        var timer = setTimeout(function() {
            callback();
        }, delay || 0);
        return function() {
            clearTimeout(timer);
        };
    }
    function async(callback, delay) {
        return function() {
            var args = arguments;
            return defer(function() {
                callback.apply(undefined, args);
            }, delay || 0);
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
        });
        for (var i = 0, n = this._events.length; n > i; i++) _config[this._events[i]] && this.on(this._events[i], _config[this._events[i]]);
    }
    var VisibilityApi = function(undefined) {
        for (var event = "visibilitychange", dict = [ [ "hidden", event ], [ "mozHidden", "moz" + event ], [ "webkitHidden", "webkit" + event ], [ "msHidden", "ms" + event ] ], i = 0, n = dict.length; n > i; i++) if (document[dict[i][0]] !== undefined) return dict[i];
    }(), PubSub = function(undefined) {
        function PubSub(config) {
            this._cache = {}, this._config = defaults(config, {
                async: !1,
                anyTopicName: "*"
            });
        }
        return PubSub.prototype.on = function(topic, callback) {
            if (!isFunction(callback)) return noop;
            this._cache[topic] || (this._cache[topic] = []);
            var applyCallback = function(args) {
                return callback.apply(undefined, args || []);
            }, listener = this._config.async ? async(applyCallback) : applyCallback;
            this._cache[topic].push(listener);
            var me = this;
            return function() {
                var index = me._cache[topic].indexOf(listener);
                return index > -1 ? (me._cache[topic].splice(index, 1), !0) : !1;
            };
        }, PubSub.prototype.publish = function(topic, args) {
            var me = this, anyTopic = this._config.anyTopicName, fireListeners = function(listenersOrNull, args) {
                for (var listeners = listenersOrNull || [], i = 0, n = listeners.length; n > i; i++) listeners[i](args || []);
                topic !== anyTopic && me.publish(anyTopic, args);
            };
            return (this._config.async ? async(fireListeners) : fireListeners)(this._cache[topic], args);
        }, PubSub;
    }();
    VisSense.prototype.state = function() {
        for (var i = 0, n = this._config.visibilityHooks.length; n > i; i++) if (!this._config.visibilityHooks[i](this._element)) return VisSense.VisState.hidden(0);
        var perc = this._config.percentageHook(this._element);
        return perc <= this._config.hidden ? VisSense.VisState.hidden(perc) : perc >= this._config.fullyvisible ? VisSense.VisState.fullyvisible(perc) : VisSense.VisState.visible(perc);
    }, VisSense.prototype.percentage = function() {
        return this.state().percentage;
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
        this._strategy = new VisMon.Strategy.CompositeStrategy(strategies);
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
    }, VisMon.Strategy = function() {}, VisMon.Strategy.prototype.start = function() {
        throw new Error("Strategy#start needs to be overridden.");
    }, VisMon.Strategy.prototype.stop = function() {
        throw new Error("Strategy#stop needs to be overridden.");
    }, VisMon.Strategy.CompositeStrategy = function(strategies) {
        this._strategies = isArray(strategies) ? strategies : [ strategies ];
    }, VisMon.Strategy.CompositeStrategy.prototype = Object.create(VisMon.Strategy.prototype), 
    VisMon.Strategy.CompositeStrategy.prototype.start = function(monitor) {
        for (var i = 0, n = this._strategies.length; n > i; i++) this._strategies[i].start(monitor);
    }, VisMon.Strategy.CompositeStrategy.prototype.stop = function(monitor) {
        for (var i = 0, n = this._strategies.length; n > i; i++) this._strategies[i].stop(monitor);
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