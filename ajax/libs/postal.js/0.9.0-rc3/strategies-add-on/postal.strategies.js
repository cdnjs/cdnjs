/**
 * postal - Pub/Sub library providing wildcard subscriptions, complex message handling, etc.  Works server and client-side.
 * Author: Jim Cowart (http://freshbrewedcode.com/jimcowart)
 * Version: v0.9.0-rc3
 * Url: http://github.com/postaljs/postal.js
 * License(s): MIT, GPL
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        // Node, or CommonJS-Like environments
        module.exports = function (postal) {
            return factory(postal, this);
        };
    } else if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["postal"], function (postal) {
            return factory(postal, root);
        });
    } else {
        // Browser globals
        root.postal = factory(root.postal, root);
    }
}(this, function (postal, global, undefined) {
    (function (SubscriptionDefinition) {
        var ConsecutiveDistinctPredicate = function () {
            var previous;
            return function (data) {
                var eq = false;
                if (_.isString(data)) {
                    eq = data === previous;
                    previous = data;
                }
                else {
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
            this.callback = new Conduit({
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
            this.publish = new Conduit({
                target: oldPub,
                context: this
            });
        };
    }(postal.SubscriptionDefinition));
    return postal;
}));