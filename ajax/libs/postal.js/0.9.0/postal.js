/**
 * postal - Pub/Sub library providing wildcard subscriptions, complex message handling, etc.  Works server and client-side.
 * Author: Jim Cowart (http://freshbrewedcode.com/jimcowart)
 * Version: v0.9.0
 * Url: http://github.com/postaljs/postal.js
 * License(s): MIT, GPL
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        // Node, or CommonJS-Like environments
        module.exports = factory(require("underscore"), this);
    } else if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["underscore"], function (_) {
            return factory(_, root);
        });
    } else {
        // Browser globals
        root.postal = factory(root._, root);
    }
}(this, function (_, global, undefined) {
    var _postal;
    var prevPostal = global.postal;
    var Conduit = (function () {
        function Conduit(options) {
            if (typeof options.target !== "function") {
                throw new Error("You can only make functions into Conduits.");
            }
            var _steps = {
                pre: options.pre || [],
                post: options.post || [],
                all: []
            };
            var _defaultContext = options.context;
            var _targetStep = {
                isTarget: true,
                fn: options.sync ?
                function () {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var result = options.target.apply(_defaultContext, args);
                    return result;
                } : function (next) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    args.splice(1, 1, options.target.apply(_defaultContext, args));
                    next.apply(this, args);
                }
            };
            var _genPipeline = function () {
                _steps.all = _steps.pre.concat([_targetStep].concat(_steps.post));
            };
            _genPipeline();
            var conduit = function () {
                var idx = 0;
                var retval;
                var phase;
                var next = function next() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var thisIdx = idx;
                    var step;
                    var nextArgs;
                    idx += 1;
                    if (thisIdx < _steps.all.length) {
                        step = _steps.all[thisIdx];
                        phase = (phase === "target") ? "after" : (step.isTarget) ? "target" : "before";
                        if (options.sync) {
                            if (phase === "before") {
                                nextArgs = step.fn.apply(step.context || _defaultContext, args);
                                next.apply(this, nextArgs || args);
                            } else {
                                retval = step.fn.apply(step.context || _defaultContext, args) || retval;
                                next.apply(this, [retval].concat(args));
                            }
                        } else {
                            step.fn.apply(step.context || _defaultContext, [next].concat(args));
                        }
                    }
                };
                next.apply(this, arguments);
                return retval;
            };
            conduit.steps = function () {
                return _steps.all;
            };
            conduit.context = function (ctx) {
                if (arguments.length === 0) {
                    return _defaultContext;
                } else {
                    _defaultContext = ctx;
                }
            };
            conduit.before = function (step, options) {
                step = typeof step === "function" ? {
                    fn: step
                } : step;
                options = options || {};
                if (options.prepend) {
                    _steps.pre.unshift(step);
                } else {
                    _steps.pre.push(step);
                }
                _genPipeline();
            };
            conduit.after = function (step, options) {
                step = typeof step === "function" ? {
                    fn: step
                } : step;
                options = options || {};
                if (options.prepend) {
                    _steps.post.unshift(step);
                } else {
                    _steps.post.push(step);
                }
                _genPipeline();
            };
            conduit.clear = function () {
                _steps = {
                    pre: [],
                    post: [],
                    all: []
                };
                _genPipeline();
            };
            return conduit;
        }
        return {
            Sync: function (options) {
                options.sync = true;
                return Conduit.call(this, options);
            },
            Async: function (options) {
                return Conduit.call(this, options);
            }
        };
    }());
    var ChannelDefinition = function (channelName) {
        this.channel = channelName || _postal.configuration.DEFAULT_CHANNEL;
        this.initialize();
    };
    ChannelDefinition.prototype.initialize = function () {};
    ChannelDefinition.prototype.subscribe = function () {
        return _postal.subscribe({
            channel: this.channel,
            topic: (arguments.length === 1 ? arguments[0].topic : arguments[0]),
            callback: (arguments.length === 1 ? arguments[0].callback : arguments[1])
        });
    };
    ChannelDefinition.prototype.publish = function () {
        var envelope = arguments.length === 1 ? (Object.prototype.toString.call(arguments[0]) === "[object String]" ? {
            topic: arguments[0]
        } : arguments[0]) : {
            topic: arguments[0],
            data: arguments[1]
        };
        envelope.channel = this.channel;
        _postal.publish(envelope);
    };
    var SubscriptionDefinition = function (channel, topic, callback) {
        if (arguments.length !== 3) {
            throw new Error("You must provide a channel, topic and callback when creating a SubscriptionDefinition instance.");
        }
        if (topic.length === 0) {
            throw new Error("Topics cannot be empty");
        }
        this.channel = channel;
        this.topic = topic;
        this.subscribe(callback);
    };
    SubscriptionDefinition.prototype = {
        unsubscribe: function () {
            if (!this.inactive) {
                this.inactive = true;
                _postal.unsubscribe(this);
            }
        },
        subscribe: function (callback) {
            this.callback = callback;
            return this;
        },
        withContext: function (context) {
            this.context = context;
            return this;
        }
    }; /* global,SubscriptionDefinition,Conduit,ChannelDefinition */
    var ConsecutiveDistinctPredicate = function () {
        var previous;
        return function (data) {
            var eq = false;
            if (_.isString(data)) {
                eq = data === previous;
                previous = data;
            } else {
                eq = _.isEqual(data, previous);
                previous = _.clone(data);
            }
            return !eq;
        };
    };
    var DistinctPredicate = function () {
        var previous = [];
        return function (data) {
            var isDistinct = !_.any(previous, function (p) {
                if (_.isObject(data) || _.isArray(data)) {
                    return _.isEqual(data, p);
                }
                return data === p;
            });
            if (isDistinct) {
                previous.push(data);
            }
            return isDistinct;
        };
    };
    var strats = {
        withDelay: function (ms) {
            if (_.isNaN(ms)) {
                throw "Milliseconds must be a number";
            }
            return {
                name: "withDelay",
                fn: function (next, data, envelope) {
                    setTimeout(function () {
                        next(data, envelope);
                    }, ms);
                }
            };
        },
        defer: function () {
            return this.withDelay(0);
        },
        stopAfter: function (maxCalls, callback) {
            if (_.isNaN(maxCalls) || maxCalls <= 0) {
                throw "The value provided to disposeAfter (maxCalls) must be a number greater than zero.";
            }
            var dispose = _.after(maxCalls, callback);
            return {
                name: "stopAfter",
                fn: function (next, data, envelope) {
                    dispose();
                    next(data, envelope);
                }
            };
        },
        withThrottle: function (ms) {
            if (_.isNaN(ms)) {
                throw "Milliseconds must be a number";
            }
            return {
                name: "withThrottle",
                fn: _.throttle(function (next, data, envelope) {
                    next(data, envelope);
                }, ms)
            };
        },
        withDebounce: function (ms, immediate) {
            if (_.isNaN(ms)) {
                throw "Milliseconds must be a number";
            }
            return {
                name: "debounce",
                fn: _.debounce(function (next, data, envelope) {
                    next(data, envelope);
                }, ms, !! immediate)
            };
        },
        withConstraint: function (pred) {
            if (!_.isFunction(pred)) {
                throw "Predicate constraint must be a function";
            }
            return {
                name: "withConstraint",
                fn: function (next, data, envelope) {
                    if (pred.call(this, data, envelope)) {
                        next.call(this, data, envelope);
                    }
                }
            };
        },
        distinct: function (options) {
            options = options || {};
            var accessor = function (args) {
                return args[0];
            };
            var check = options.all ? new DistinctPredicate(accessor) : new ConsecutiveDistinctPredicate(accessor);
            return {
                name: "distinct",
                fn: function (next, data, envelope) {
                    if (check(data)) {
                        next(data, envelope);
                    }
                }
            };
        }
    };
    SubscriptionDefinition.prototype.defer = function () {
        this.callback.before(strats.defer());
        return this;
    };
    SubscriptionDefinition.prototype.disposeAfter = function (maxCalls) {
        var self = this;
        self.callback.before(strats.stopAfter(maxCalls, function () {
            self.unsubscribe.call(self);
        }));
        return self;
    };
    SubscriptionDefinition.prototype.distinctUntilChanged = function () {
        this.callback.before(strats.distinct());
        return this;
    };
    SubscriptionDefinition.prototype.distinct = function () {
        this.callback.before(strats.distinct({
            all: true
        }));
        return this;
    };
    SubscriptionDefinition.prototype.once = function () {
        this.disposeAfter(1);
        return this;
    };
    SubscriptionDefinition.prototype.withConstraint = function (predicate) {
        this.callback.before(strats.withConstraint(predicate));
        return this;
    };
    SubscriptionDefinition.prototype.withConstraints = function (preds) {
        while (preds.length) {
            this.callback.before(strats.withConstraint(preds.shift()));
        }
        return this;
    };
    SubscriptionDefinition.prototype.withDebounce = function (milliseconds, immediate) {
        this.callback.before(strats.withDebounce(milliseconds, immediate));
        return this;
    };
    SubscriptionDefinition.prototype.withDelay = function (milliseconds) {
        this.callback.before(strats.withDelay(milliseconds));
        return this;
    };
    SubscriptionDefinition.prototype.withThrottle = function (milliseconds) {
        this.callback.before(strats.withThrottle(milliseconds));
        return this;
    };
    SubscriptionDefinition.prototype.subscribe = function (callback) {
        this.callback = new Conduit.Async({
            target: callback,
            context: this
        });
        return this;
    };
    SubscriptionDefinition.prototype.withContext = function (context) {
        this.callback.context(context);
        return this;
    };
    SubscriptionDefinition.prototype.after = function () {
        this.callback.after.apply(this, arguments);
    };
    SubscriptionDefinition.prototype.before = function () {
        this.callback.before.apply(this, arguments);
    };
    ChannelDefinition.prototype.initialize = function () {
        var oldPub = this.publish;
        this.publish = new Conduit.Async({
            target: oldPub,
            context: this
        });
    };
    var bindingsResolver = {
        cache: {},
        regex: {},
        compare: function (binding, topic) {
            var pattern, rgx, prevSegment, result = (this.cache[topic] && this.cache[topic][binding]);
            if (typeof result !== "undefined") {
                return result;
            }
            if (!(rgx = this.regex[binding])) {
                pattern = "^" + _.map(binding.split("."), function (segment) {
                    var res = "";
                    if ( !! prevSegment) {
                        res = prevSegment !== "#" ? "\\.\\b" : "\\b";
                    }
                    if (segment === "#") {
                        res += "[\\s\\S]*";
                    } else if (segment === "*") {
                        res += "[^.]+";
                    } else {
                        res += segment;
                    }
                    prevSegment = segment;
                    return res;
                }).join("") + "$";
                rgx = this.regex[binding] = new RegExp(pattern);
            }
            this.cache[topic] = this.cache[topic] || {};
            this.cache[topic][binding] = result = rgx.test(topic);
            return result;
        },
        reset: function () {
            this.cache = {};
            this.regex = {};
        }
    };
    var fireSub = function (subDef, envelope) {
        if (!subDef.inactive && _postal.configuration.resolver.compare(subDef.topic, envelope.topic)) {
            subDef.callback.call(subDef.context || this, envelope.data, envelope);
        }
    };
    var pubInProgress = 0;
    var unSubQueue = [];
    var clearUnSubQueue = function () {
        while (unSubQueue.length) {
            _postal.unsubscribe(unSubQueue.shift());
        }
    };
    var getPredicate = function (options) {
        if (typeof options === "function") {
            return options;
        } else if (!options) {
            return function () {
                return true;
            };
        } else {
            return function (sub) {
                var compared = 0,
                    matched = 0;
                _.each(options, function (val, prop) {
                    compared += 1;
                    if (
                    // We use the bindings resolver to compare the options.topic to subDef.topic
                    (prop === "topic" && _postal.configuration.resolver.compare(sub.topic, options.topic))
                    // We need to account for the context possibly being available on callback due to Conduit
                    || (prop === "context" && options.context === (sub.callback.context && sub.callback.context() || sub.context))
                    // Any other potential prop/value matching outside topic & context...
                    || (sub[prop] === options[prop])) {
                        matched += 1;
                    }
                });
                return compared === matched;
            };
        }
    };
    _postal = {
        configuration: {
            resolver: bindingsResolver,
            DEFAULT_CHANNEL: "/",
            SYSTEM_CHANNEL: "postal"
        },
        subscriptions: {},
        wireTaps: [],
        ChannelDefinition: ChannelDefinition,
        SubscriptionDefinition: SubscriptionDefinition,
        channel: function (channelName) {
            return new ChannelDefinition(channelName);
        },
        subscribe: function (options) {
            var subDef = new SubscriptionDefinition(options.channel || this.configuration.DEFAULT_CHANNEL, options.topic, options.callback);
            var channel = this.subscriptions[subDef.channel];
            var subs;
            this.publish({
                channel: this.configuration.SYSTEM_CHANNEL,
                topic: "subscription.created",
                data: {
                    event: "subscription.created",
                    channel: subDef.channel,
                    topic: subDef.topic
                }
            });
            if (!channel) {
                channel = this.subscriptions[subDef.channel] = {};
            }
            subs = this.subscriptions[subDef.channel][subDef.topic];
            if (!subs) {
                subs = this.subscriptions[subDef.channel][subDef.topic] = [];
            }
            subs.push(subDef);
            return subDef;
        },
        publish: function (envelope) {
            ++pubInProgress;
            envelope.channel = envelope.channel || this.configuration.DEFAULT_CHANNEL;
            envelope.timeStamp = new Date();
            _.each(this.wireTaps, function (tap) {
                tap(envelope.data, envelope);
            });
            if (this.subscriptions[envelope.channel]) {
                _.each(this.subscriptions[envelope.channel], function (subscribers) {
                    var idx = 0,
                        len = subscribers.length,
                        subDef;
                    while (idx < len) {
                        if (subDef = subscribers[idx++]) {
                            fireSub(subDef, envelope);
                        }
                    }
                });
            }
            if (--pubInProgress === 0) {
                clearUnSubQueue();
            }
        },
        unsubscribe: function () {
            var idx = 0;
            var subs = Array.prototype.slice.call(arguments, 0);
            var subDef;
            while (subDef = subs.shift()) {
                if (pubInProgress) {
                    unSubQueue.push(subDef);
                    return;
                }
                if (this.subscriptions[subDef.channel] && this.subscriptions[subDef.channel][subDef.topic]) {
                    var len = this.subscriptions[subDef.channel][subDef.topic].length;
                    idx = 0;
                    while (idx < len) {
                        if (this.subscriptions[subDef.channel][subDef.topic][idx] === subDef) {
                            this.subscriptions[subDef.channel][subDef.topic].splice(idx, 1);
                            break;
                        }
                        idx += 1;
                    }
                }
                this.publish({
                    channel: this.configuration.SYSTEM_CHANNEL,
                    topic: "subscription.removed",
                    data: {
                        event: "subscription.removed",
                        channel: subDef.channel,
                        topic: subDef.topic
                    }
                });
            }
        },
        addWireTap: function (callback) {
            var self = this;
            self.wireTaps.push(callback);
            return function () {
                var idx = self.wireTaps.indexOf(callback);
                if (idx !== -1) {
                    self.wireTaps.splice(idx, 1);
                }
            };
        },
        noConflict: function () {
            if (typeof window === "undefined" || (typeof window !== "undefined" && typeof define === "function" && define.amd)) {
                throw new Error("noConflict can only be used in browser clients which aren't using AMD modules");
            }
            global.postal = prevPostal;
            return this;
        },
        getSubscribersFor: function (options) {
            var result = [];
            _.each(this.subscriptions, function (channel) {
                _.each(channel, function (subList) {
                    result = result.concat(_.filter(subList, getPredicate(options)));
                });
            });
            return result;
        },
        reset: function () {
            this.unsubscribeFor();
            this.configuration.resolver.reset();
            this.subscriptions = {};
        },
        unsubscribeFor: function (options) {
            var toDispose = [];
            if (this.subscriptions) {
                toDispose = this.getSubscribersFor(options);
                this.unsubscribe.apply(this, toDispose);
            }
        }
    };
    var _publish = _postal.publish;
    _postal.publish = new Conduit.Async({
        target: _publish,
        context: _postal
    });
    _postal.subscriptions[_postal.configuration.SYSTEM_CHANNEL] = {};
    _postal.linkChannels = function (sources, destinations) {
        var result = [],
            self = this;
        sources = !_.isArray(sources) ? [sources] : sources;
        destinations = !_.isArray(destinations) ? [destinations] : destinations;
        _.each(sources, function (source) {
            var sourceTopic = source.topic || "#";
            _.each(destinations, function (destination) {
                var destChannel = destination.channel || self.configuration.DEFAULT_CHANNEL;
                result.push(
                self.subscribe({
                    channel: source.channel || self.configuration.DEFAULT_CHANNEL,
                    topic: sourceTopic,
                    callback: function (data, env) {
                        var newEnv = _.clone(env);
                        newEnv.topic = _.isFunction(destination.topic) ? destination.topic(env.topic) : destination.topic || env.topic;
                        newEnv.channel = destChannel;
                        newEnv.data = data;
                        self.publish(newEnv);
                    }
                }));
            });
        });
        return result;
    };
    if (global && Object.prototype.hasOwnProperty.call(global, "__postalReady__") && _.isArray(global.__postalReady__)) {
        while (global.__postalReady__.length) {
            global.__postalReady__.shift().onReady(_postal);
        }
    }
    return _postal;
}));