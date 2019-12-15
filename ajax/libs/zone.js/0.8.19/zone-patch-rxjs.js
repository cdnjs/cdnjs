/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('rxjs/add/observable/bindCallback'), require('rxjs/add/observable/bindNodeCallback'), require('rxjs/add/observable/defer'), require('rxjs/add/observable/forkJoin'), require('rxjs/add/observable/fromEventPattern'), require('rxjs/add/operator/multicast'), require('rxjs/Observable'), require('rxjs/scheduler/asap'), require('rxjs/Subscriber'), require('rxjs/Subscription'), require('rxjs/symbol/rxSubscriber')) :
	typeof define === 'function' && define.amd ? define(['rxjs/add/observable/bindCallback', 'rxjs/add/observable/bindNodeCallback', 'rxjs/add/observable/defer', 'rxjs/add/observable/forkJoin', 'rxjs/add/observable/fromEventPattern', 'rxjs/add/operator/multicast', 'rxjs/Observable', 'rxjs/scheduler/asap', 'rxjs/Subscriber', 'rxjs/Subscription', 'rxjs/symbol/rxSubscriber'], factory) :
	(factory(null,null,null,null,null,null,global.Rx,global.Rx.Scheduler,global.Rx,global.Rx,global.Rx.Symbol));
}(this, (function (rxjs_add_observable_bindCallback,rxjs_add_observable_bindNodeCallback,rxjs_add_observable_defer,rxjs_add_observable_forkJoin,rxjs_add_observable_fromEventPattern,rxjs_add_operator_multicast,rxjs_Observable,rxjs_scheduler_asap,rxjs_Subscriber,rxjs_Subscription,rxjs_symbol_rxSubscriber) { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('rxjs', function (global, Zone, api) {
    var symbol = Zone.__symbol__;
    var subscribeSource = 'rxjs.subscribe';
    var nextSource = 'rxjs.Subscriber.next';
    var errorSource = 'rxjs.Subscriber.error';
    var completeSource = 'rxjs.Subscriber.complete';
    var unsubscribeSource = 'rxjs.Subscriber.unsubscribe';
    var teardownSource = 'rxjs.Subscriber.teardownLogic';
    var empty = {
        closed: true,
        next: function (value) { },
        error: function (err) { throw err; },
        complete: function () { }
    };
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof rxjs_Subscriber.Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxjs_symbol_rxSubscriber.rxSubscriber]) {
                return nextOrObserver[rxjs_symbol_rxSubscriber.rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new rxjs_Subscriber.Subscriber(empty);
        }
        return new rxjs_Subscriber.Subscriber(nextOrObserver, error, complete);
    }
    var patchObservable = function () {
        var ObservablePrototype = rxjs_Observable.Observable.prototype;
        var symbolSubscribe = symbol('subscribe');
        var _symbolSubscribe = symbol('_subscribe');
        var _subscribe = ObservablePrototype[_symbolSubscribe] = ObservablePrototype._subscribe;
        var subscribe = ObservablePrototype[symbolSubscribe] = ObservablePrototype.subscribe;
        Object.defineProperties(rxjs_Observable.Observable.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneSource: { value: null, writable: true, configurable: true },
            _zoneSubscribe: { value: null, writable: true, configurable: true },
            source: {
                configurable: true,
                get: function () {
                    return this._zoneSource;
                },
                set: function (source) {
                    this._zone = Zone.current;
                    this._zoneSource = source;
                }
            },
            _subscribe: {
                configurable: true,
                get: function () {
                    if (this._zoneSubscribe) {
                        return this._zoneSubscribe;
                    }
                    else if (this.constructor === rxjs_Observable.Observable) {
                        return _subscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._subscribe;
                },
                set: function (subscribe) {
                    this._zone = Zone.current;
                    this._zoneSubscribe = subscribe;
                }
            },
            subscribe: {
                writable: true,
                configurable: true,
                value: function (observerOrNext, error, complete) {
                    // Only grab a zone if we Zone exists and it is different from the current zone.
                    var _zone = this._zone;
                    if (_zone && _zone !== Zone.current) {
                        // Current Zone is different from the intended zone.
                        // Restore the zone before invoking the subscribe callback.
                        return _zone.run(subscribe, this, [toSubscriber(observerOrNext, error, complete)]);
                    }
                    return subscribe.call(this, observerOrNext, error, complete);
                }
            }
        });
    };
    var patchSubscription = function () {
        var unsubscribeSymbol = symbol('unsubscribe');
        var unsubscribe = rxjs_Subscription.Subscription.prototype[unsubscribeSymbol] =
            rxjs_Subscription.Subscription.prototype.unsubscribe;
        Object.defineProperties(rxjs_Subscription.Subscription.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneUnsubscribe: { value: null, writable: true, configurable: true },
            _unsubscribe: {
                get: function () {
                    if (this._zoneUnsubscribe) {
                        return this._zoneUnsubscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._unsubscribe;
                },
                set: function (unsubscribe) {
                    this._zone = Zone.current;
                    this._zoneUnsubscribe = unsubscribe;
                }
            },
            unsubscribe: {
                writable: true,
                configurable: true,
                value: function () {
                    // Only grab a zone if we Zone exists and it is different from the current zone.
                    var _zone = this._zone;
                    if (_zone && _zone !== Zone.current) {
                        // Current Zone is different from the intended zone.
                        // Restore the zone before invoking the subscribe callback.
                        _zone.run(unsubscribe, this);
                    }
                    else {
                        unsubscribe.apply(this);
                    }
                }
            }
        });
    };
    var patchSubscriber = function () {
        var next = rxjs_Subscriber.Subscriber.prototype.next;
        var error = rxjs_Subscriber.Subscriber.prototype.error;
        var complete = rxjs_Subscriber.Subscriber.prototype.complete;
        Object.defineProperty(rxjs_Subscriber.Subscriber.prototype, 'destination', {
            configurable: true,
            get: function () {
                return this._zoneDestination;
            },
            set: function (destination) {
                this._zone = Zone.current;
                this._zoneDestination = destination;
            }
        });
        // patch Subscriber.next to make sure it run
        // into SubscriptionZone
        rxjs_Subscriber.Subscriber.prototype.next = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(next, this, arguments, nextSource);
            }
            else {
                return next.apply(this, arguments);
            }
        };
        rxjs_Subscriber.Subscriber.prototype.error = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(error, this, arguments, errorSource);
            }
            else {
                return error.apply(this, arguments);
            }
        };
        rxjs_Subscriber.Subscriber.prototype.complete = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(complete, this, arguments, completeSource);
            }
            else {
                return complete.apply(this, arguments);
            }
        };
    };
    var patchObservableInstance = function (observable) {
        observable._zone = Zone.current;
    };
    var patchObservableFactoryCreator = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factoryCreator = obj[symbolFactory] = obj[factoryName];
        if (!factoryCreator) {
            return;
        }
        obj[factoryName] = function () {
            var factory = factoryCreator.apply(this, arguments);
            return function () {
                var observable = factory.apply(this, arguments);
                patchObservableInstance(observable);
                return observable;
            };
        };
    };
    var patchObservableFactory = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var observable = factory.apply(this, arguments);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchObservableFactoryArgs = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var initZone = Zone.current;
            var args = Array.prototype.slice.call(arguments);
            var _loop_1 = function (i) {
                var arg = args[i];
                if (typeof arg === 'function') {
                    args[i] = function () {
                        var argArgs = Array.prototype.slice.call(arguments);
                        var runningZone = Zone.current;
                        if (initZone && runningZone && initZone !== runningZone) {
                            return initZone.run(arg, this, argArgs);
                        }
                        else {
                            return arg.apply(this, argArgs);
                        }
                    };
                }
            };
            for (var i = 0; i < args.length; i++) {
                _loop_1(i);
            }
            var observable = factory.apply(this, args);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchMulticast = function () {
        var obj = rxjs_Observable.Observable.prototype;
        var factoryName = 'multicast';
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var _zone = Zone.current;
            var args = Array.prototype.slice.call(arguments);
            var subjectOrSubjectFactory = args.length > 0 ? args[0] : undefined;
            if (typeof subjectOrSubjectFactory !== 'function') {
                var originalFactory_1 = subjectOrSubjectFactory;
                subjectOrSubjectFactory = function () {
                    return originalFactory_1;
                };
            }
            args[0] = function () {
                var subject;
                if (_zone && _zone !== Zone.current) {
                    subject = _zone.run(subjectOrSubjectFactory, this, arguments);
                }
                else {
                    subject = subjectOrSubjectFactory.apply(this, arguments);
                }
                if (subject && _zone) {
                    subject._zone = _zone;
                }
                return subject;
            };
            var observable = factory.apply(this, args);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchImmediate = function (asap$$1) {
        if (!asap$$1) {
            return;
        }
        var scheduleSymbol = symbol('scheduleSymbol');
        var flushSymbol = symbol('flushSymbol');
        var zoneSymbol = symbol('zone');
        if (asap$$1[scheduleSymbol]) {
            return;
        }
        var schedule = asap$$1[scheduleSymbol] = asap$$1.schedule;
        asap$$1.schedule = function () {
            var args = Array.prototype.slice.call(arguments);
            var work = args.length > 0 ? args[0] : undefined;
            var delay = args.length > 1 ? args[1] : 0;
            var state = (args.length > 2 ? args[2] : undefined) || {};
            state[zoneSymbol] = Zone.current;
            var patchedWork = function () {
                var workArgs = Array.prototype.slice.call(arguments);
                var action = workArgs.length > 0 ? workArgs[0] : undefined;
                var scheduleZone = action && action[zoneSymbol];
                if (scheduleZone && scheduleZone !== Zone.current) {
                    return scheduleZone.runGuarded(work, this, arguments);
                }
                else {
                    return work.apply(this, arguments);
                }
            };
            return schedule.apply(this, [patchedWork, delay, state]);
        };
    };
    patchObservable();
    patchSubscription();
    patchSubscriber();
    patchObservableFactoryCreator(rxjs_Observable.Observable, 'bindCallback');
    patchObservableFactoryCreator(rxjs_Observable.Observable, 'bindNodeCallback');
    patchObservableFactory(rxjs_Observable.Observable, 'defer');
    patchObservableFactory(rxjs_Observable.Observable, 'forkJoin');
    patchObservableFactoryArgs(rxjs_Observable.Observable, 'fromEventPattern');
    patchMulticast();
    patchImmediate(rxjs_scheduler_asap.asap);
});

})));
