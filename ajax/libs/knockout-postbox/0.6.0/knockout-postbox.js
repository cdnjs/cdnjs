// knockout-postbox 0.6.0 | (c) 2017 Ryan Niemeyer |  http://www.opensource.org/licenses/mit-license
;(function(factory) {
    //CommonJS
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        factory(require("knockout"), exports);
    //AMD
    } else if (typeof define === "function" && define.amd) {
        define(["knockout", "exports"], factory);
    //normal script tag
    } else {
        factory(ko, ko.postbox = {});
    }
}(function(ko, exports, undefined) {
    var disposeTopicSubscription, ensureDispose, existingSubscribe,
        subscriptions = {},
        subId = 1;

    exports.subscriptions = subscriptions;

    //create a global postbox that supports subscribing/publishing
    ko.subscribable.call(exports);

    //keep a cache of the latest value and subscribers
    exports.topicCache = {};

    //allow customization of the function used to serialize values for the topic cache
    exports.serializer = ko.toJSON;

    //wrap notifySubscribers passing topic first and caching latest value
    exports.publish = function(topic, value) {
        if (topic) {
            //keep the value and a serialized version for comparison
            exports.topicCache[topic] = {
                value: value,
                serialized: exports.serializer(value)
            };
            exports.notifySubscribers(value, topic);
        }
    };

    //provide a subscribe API for the postbox that takes in the topic as first arg
    existingSubscribe = exports.subscribe;
    exports.subscribe = function(topic, action, target, initializeWithLatestValue) {
        var subscription, current, existingDispose;

        if (topic) {
            if (typeof target === "boolean") {
                initializeWithLatestValue = target;
                target = undefined;
            }

            subscription = existingSubscribe.call(exports, action, target, topic);
            subscription.subId = ++subId;
            subscriptions[ subId ] = subscription;

            if (initializeWithLatestValue) {
                current = exports.topicCache[topic];

                if (current !== undefined) {
                    action.call(target, current.value);
                }
            }

            existingDispose = subscription.dispose;
            subscription.dispose = function() {
                delete subscriptions[subscription.subId];
                existingDispose.call(subscription);
            };

            return subscription;
        }
    };

    //clean up all subscriptions and references
    exports.reset = function() {
        var subscription;

        for (var id in subscriptions) {
            if (subscriptions.hasOwnProperty(id)) {
                subscription = subscriptions[id];

                if (subscription && typeof subscription.dispose === "function") {
                    subscription.dispose();
                }
            }
        }

        exports.topicCache = {};
    };

    //by default publish when the previous cached value does not equal the new value
    exports.defaultComparer = function(newValue, cacheItem) {
        return cacheItem && exports.serializer(newValue) === cacheItem.serialized;
    };

    // Ensures that a `subscribable` has a `dispose` method which cleans up all
    // subscriptions added by `knockout-postbox`.
    ensureDispose = function() {
        var existingDispose,
            self = this;

        // Make sure we're adding the custom `dispose` method at most once.
        if (!self.willDisposePostbox) {
            self.willDisposePostbox = true;

            existingDispose = self.dispose;
            self.dispose = function() {
                var topic, types, type, sub,
                    subs = self.postboxSubs;

                if (subs) {
                    for (topic in subs) {
                        if (subs.hasOwnProperty(topic)) {
                            types = subs[topic];
                            if (types) {
                                for (type in types) {
                                    if (types.hasOwnProperty(type)) {
                                        sub = types[type];
                                        if (sub && typeof sub.dispose == "function") {
                                            sub.dispose();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (existingDispose) {
                    existingDispose.call(self);
                }
            };
        }
    };

    //augment observables/computeds with the ability to automatically publish updates on a topic
    ko.subscribable.fn.publishOn = function(topic, skipInitialOrEqualityComparer, equalityComparer) {
        var skipInitialPublish, subscription, existingDispose;

        ensureDispose.call(this);

        if (topic) {
            //allow passing the equalityComparer as the second argument
            if (typeof skipInitialOrEqualityComparer === "function") {
                equalityComparer = skipInitialOrEqualityComparer;
            } else {
                skipInitialPublish = skipInitialOrEqualityComparer;
            }

            equalityComparer = equalityComparer || exports.defaultComparer;

            //remove any existing subs
            disposeTopicSubscription.call(this, topic, "publishOn");

            //keep a reference to the subscription, so we can stop publishing
            subscription = this.subscribe(function(newValue) {
                if (!equalityComparer.call(this, newValue, exports.topicCache[topic])) {
                    exports.publish(topic, newValue);
                }
            }, this);

            //track the subscription in case of a reset
            subscription.id = ++subId;
            subscriptions[subId] = subscription;

            //ensure that we cleanup pointers to subscription on dispose
            existingDispose = subscription.dispose;
            subscription.dispose = function() {
                delete this.postboxSubs[topic].publishOn;
                delete subscriptions[subscription.id];

                existingDispose.call(subscription);
            }.bind(this);

            this.postboxSubs[topic].publishOn = subscription;

            //do an initial publish
            if (!skipInitialPublish) {
                exports.publish(topic, this());
            }
        }

        return this;
    };

    //handle disposing a subscription used to publish or subscribe to a topic
    disposeTopicSubscription = function(topic, type) {
        var subs = this.postboxSubs = this.postboxSubs || {};
        subs[topic] = subs[topic] || {};

        if (subs[topic][type]) {
            subs[topic][type].dispose();
        }
    };

    //discontinue automatically publishing on a topic
    ko.subscribable.fn.stopPublishingOn = function(topic) {
        disposeTopicSubscription.call(this, topic, "publishOn");

        return this;
    };

    //augment observables/computeds to automatically be updated by notifications on a topic
    ko.subscribable.fn.subscribeTo = function(topic, initializeWithLatestValueOrTransform, transform) {
        var initializeWithLatestValue, current, callback, subscription, existingDispose,
            self = this;

        ensureDispose.call(this);

        //allow passing the filter as the second argument
        if (typeof initializeWithLatestValueOrTransform === "function") {
            transform = initializeWithLatestValueOrTransform;
        } else {
            initializeWithLatestValue = initializeWithLatestValueOrTransform;
        }

        if (topic && ko.isWriteableObservable(this)) {
            //remove any existing subs
            disposeTopicSubscription.call(this, topic, "subscribeTo");

            //if specified, apply a filter function in the subscription
            callback = function(newValue) {
                self(transform ? transform.call(self, newValue) : newValue);
            };

            ////keep a reference to the subscription, so we can unsubscribe, if necessary
            subscription = exports.subscribe(topic, callback);
            this.postboxSubs[topic].subscribeTo = subscription;

            //ensure that we cleanup pointers to subscription on dispose
            existingDispose = subscription.dispose;
            subscription.dispose = function() {
                delete this.postboxSubs[topic].subscribeTo;
                existingDispose.call(subscription);
            }.bind(this);

            if (initializeWithLatestValue) {
                current = exports.topicCache[topic];

                if (current !== undefined) {
                    callback(current.value);
                }
            }
        }

        return this;
    };

    //discontinue receiving updates on a topic
    ko.subscribable.fn.unsubscribeFrom = function(topic) {
        disposeTopicSubscription.call(this, topic, "subscribeTo");

        return this;
    };

    // both subscribe and publish on the same topic
    //   -allows the ability to sync an observable/writeable computed/observableArray between view models
    //   -subscribeTo should really not use a filter function, as it would likely cause infinite recursion
    ko.subscribable.fn.syncWith = function(topic, initializeWithLatestValue, skipInitialOrEqualityComparer, equalityComparer) {
        this.subscribeTo(topic, initializeWithLatestValue).publishOn(topic, skipInitialOrEqualityComparer, equalityComparer);

        return this;
    };

    ko.subscribable.fn.stopSyncingWith = function(topic) {
        this.unsubscribeFrom(topic).stopPublishingOn(topic);

        return this;
    };

    ko.postbox = exports;
}));
