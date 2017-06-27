// knockout-postbox 0.4.2 | (c) 2013 Ryan Niemeyer |  http://www.opensource.org/licenses/mit-license
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
    var disposeTopicSubscription, existingSubscribe;

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
        var subscription, current;

        if (topic) {
            if (typeof target === "boolean") {
                initializeWithLatestValue = target;
                target = undefined;
            }

            subscription = existingSubscribe.call(exports, action, target, topic);

            if (initializeWithLatestValue) {
                current = exports.topicCache[topic];

                if (current !== undefined) {
                    action.call(target, current.value);
                }
            }

            return subscription;
        }
    };

    //by default publish when the previous cached value does not equal the new value
    exports.defaultComparer = function(newValue, cacheItem) {
        return cacheItem && exports.serializer(newValue) === cacheItem.serialized;
    };

    //augment observables/computeds with the ability to automatically publish updates on a topic
    ko.subscribable.fn.publishOn = function(topic, skipInitialOrEqualityComparer, equalityComparer) {
        var skipInitialPublish;
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
            this.postboxSubs[topic].publishOn = this.subscribe(function(newValue) {
                if (!equalityComparer.call(this, newValue, exports.topicCache[topic])) {
                    exports.publish(topic, newValue);
                }
            }, this);

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
        var initializeWithLatestValue, current, callback,
            self = this;

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

            //keep a reference to the subscription, so we can unsubscribe, if necessary
            this.postboxSubs[topic].subscribeTo = exports.subscribe(topic, callback);

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

    ko.postbox = exports;
}));
