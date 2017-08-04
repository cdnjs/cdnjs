/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('rxjs/Rx')) :
	typeof define === 'function' && define.amd ? define(['rxjs/Rx'], factory) :
	(factory(global.Rx));
}(this, (function (Rx) { 'use strict';

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
    var patchObservableInstance = function (observable) {
        observable._zone = Zone.current;
        // patch inner function this._subscribe to check
        // SubscriptionZone is same with ConstuctorZone or not
        if (observable._subscribe && typeof observable._subscribe === 'function' &&
            !observable._originalSubscribe) {
            observable._originalSubscribe = observable._subscribe;
            observable._subscribe = _patchedSubscribe;
        }
    };
    var _patchedSubscribe = function () {
        var currentZone = Zone.current;
        var _zone = this._zone;
        var args = Array.prototype.slice.call(arguments);
        var subscriber = args.length > 0 ? args[0] : undefined;
        // also keep currentZone in Subscriber
        // for later Subscriber.next/error/complete method
        if (subscriber && !subscriber._zone) {
            subscriber._zone = currentZone;
        }
        // _subscribe should run in ConstructorZone
        // but for performance concern, we should check
        // whether ConsturctorZone === Zone.current here
        var tearDownLogic = _zone !== Zone.current ?
            _zone.run(this._originalSubscribe, this, args, subscribeSource) :
            this._originalSubscribe.apply(this, args);
        if (tearDownLogic && typeof tearDownLogic === 'function') {
            var patchedTearDownLogic = function () {
                // tearDownLogic should also run in ConstructorZone
                // but for performance concern, we should check
                // whether ConsturctorZone === Zone.current here
                if (_zone && _zone !== Zone.current) {
                    return _zone.run(tearDownLogic, this, arguments, teardownSource);
                }
                else {
                    return tearDownLogic.apply(this, arguments);
                }
            };
            return patchedTearDownLogic;
        }
        return tearDownLogic;
    };
    var patchObservable = function (Rx$$1, observableType) {
        var symbolObservable = symbol(observableType);
        var Observable$$1 = Rx$$1[observableType];
        if (!Observable$$1 || Observable$$1[symbolObservable]) {
            // the subclass of Observable not loaded or have been patched
            return;
        }
        // monkey-patch Observable to save the
        // current zone as ConstructorZone
        var patchedObservable = Rx$$1[observableType] = function () {
            Observable$$1.apply(this, arguments);
            patchObservableInstance(this);
            return this;
        };
        patchedObservable.prototype = Observable$$1.prototype;
        patchedObservable[symbolObservable] = Observable$$1;
        Object.keys(Observable$$1).forEach(function (key) {
            patchedObservable[key] = Observable$$1[key];
        });
        var ObservablePrototype = Observable$$1.prototype;
        var symbolSubscribe = symbol('subscribe');
        if (!ObservablePrototype[symbolSubscribe]) {
            var subscribe_1 = ObservablePrototype[symbolSubscribe] = ObservablePrototype.subscribe;
            // patch Observable.prototype.subscribe
            // if SubscripitionZone is different with ConstructorZone
            // we should run _subscribe in ConstructorZone and
            // create sinke in SubscriptionZone,
            // and tearDown should also run into ConstructorZone
            Observable$$1.prototype.subscribe = function () {
                var _zone = this._zone;
                var currentZone = Zone.current;
                // if operator is involved, we should also
                // patch the call method to save the Subscription zone
                if (this.operator && _zone && _zone !== currentZone) {
                    var call_1 = this.operator.call;
                    this.operator.call = function () {
                        var args = Array.prototype.slice.call(arguments);
                        var subscriber = args.length > 0 ? args[0] : undefined;
                        if (!subscriber._zone) {
                            subscriber._zone = currentZone;
                        }
                        return _zone.run(call_1, this, args, subscribeSource);
                    };
                }
                var result = subscribe_1.apply(this, arguments);
                // the result is the subscriber sink,
                // we save the current Zone here
                if (!result._zone) {
                    result._zone = currentZone;
                }
                return result;
            };
        }
        var symbolLift = symbol('lift');
        if (!ObservablePrototype[symbolLift]) {
            var lift_1 = ObservablePrototype[symbolLift] = ObservablePrototype.lift;
            // patch lift method to save ConstructorZone of Observable
            Observable$$1.prototype.lift = function () {
                var observable = lift_1.apply(this, arguments);
                patchObservableInstance(observable);
                return observable;
            };
        }
        var symbolCreate = symbol('create');
        if (!patchedObservable[symbolCreate]) {
            var create_1 = patchedObservable[symbolCreate] = Observable$$1.create;
            // patch create method to save ConstructorZone of Observable
            Rx$$1.Observable.create = function () {
                var observable = create_1.apply(this, arguments);
                patchObservableInstance(observable);
                return observable;
            };
        }
    };
    var patchSubscriber = function () {
        var Subscriber$$1 = Rx.Subscriber;
        var next = Subscriber$$1.prototype.next;
        var error = Subscriber$$1.prototype.error;
        var complete = Subscriber$$1.prototype.complete;
        var unsubscribe = Subscriber$$1.prototype.unsubscribe;
        // patch Subscriber.next to make sure it run
        // into SubscriptionZone
        Subscriber$$1.prototype.next = function () {
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
        Subscriber$$1.prototype.error = function () {
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
        Subscriber$$1.prototype.complete = function () {
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
        Subscriber$$1.prototype.unsubscribe = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(unsubscribe, this, arguments, unsubscribeSource);
            }
            else {
                return unsubscribe.apply(this, arguments);
            }
        };
    };
    var patchObservableFactoryCreator = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factoryCreator = obj[symbolFactory] = obj[factoryName];
        obj[factoryName] = function () {
            var factory = factoryCreator.apply(this, arguments);
            return function () {
                var observable = factory.apply(this, arguments);
                patchObservableInstance(observable);
                return observable;
            };
        };
    };
    patchObservable(Rx, 'Observable');
    patchSubscriber();
    patchObservableFactoryCreator(Rx.Observable, 'bindCallback');
    patchObservableFactoryCreator(Rx.Observable, 'bindNodeCallback');
});

})));
