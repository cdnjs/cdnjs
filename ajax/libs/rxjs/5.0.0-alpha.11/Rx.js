(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('./Subscriber');
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        var index = this.index++;
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, index);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
    };
    return InnerSubscriber;
})(Subscriber_1.Subscriber);
exports.InnerSubscriber = InnerSubscriber;

},{"./Subscriber":7}],2:[function(require,module,exports){
var Observable_1 = require('./Observable');
var Notification = (function () {
    function Notification(kind, value, exception) {
        this.kind = kind;
        this.value = value;
        this.exception = exception;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next(this.value);
            case 'E':
                return observer.error(this.exception);
            case 'C':
                return observer.complete();
        }
    };
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next(this.value);
            case 'E':
                return error(this.exception);
            case 'C':
                return complete();
        }
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.exception);
            case 'C':
                return Observable_1.Observable.empty();
        }
    };
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return this.undefinedValueNotification;
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return this.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
})();
exports.Notification = Notification;

},{"./Observable":3}],3:[function(require,module,exports){
var Subscriber_1 = require('./Subscriber');
var root_1 = require('./util/root');
var Symbol_observable_1 = require('./util/Symbol_observable');
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is
     * called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify
     * of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @returns {Observable} a new observable with the Operator applied
     * @description creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * @method Symbol.observable
     * @returns {Observable} this instance of the observable
     * @description an interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     */
    Observable.prototype[Symbol_observable_1.$$observable] = function () {
        return this;
    };
    /**
     * @method subscribe
     * @param {Observer|Function} observerOrNext (optional) either an observer defining all functions to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled
     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
     * @returns {Subscription} a subscription reference to the registered handlers
     * @description registers handlers for handling emitted values, error and completions from the observable, and
     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var subscriber;
        if (observerOrNext && typeof observerOrNext === 'object') {
            if (observerOrNext instanceof Subscriber_1.Subscriber) {
                subscriber = observerOrNext;
            }
            else {
                subscriber = new Subscriber_1.Subscriber(observerOrNext);
            }
        }
        else {
            var next = observerOrNext;
            subscriber = Subscriber_1.Subscriber.create(next, error, complete);
        }
        subscriber.add(this._subscribe(subscriber));
        return subscriber;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} PromiseCtor? a constructor function used to instantiate the Promise
     * @returns {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            _this.subscribe(next, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source._subscribe(this.operator.call(subscriber));
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * @static
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @returns {Observable} a new cold observable
     * @description creates a new cold Observable by calling the Observable constructor
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
})();
exports.Observable = Observable;

},{"./Subscriber":7,"./util/Symbol_observable":134,"./util/root":144}],4:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('./Subscriber');
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyComplete = function (inner) {
        this.destination.complete();
    };
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, inner) {
        this.destination.error(error);
    };
    return OuterSubscriber;
})(Subscriber_1.Subscriber);
exports.OuterSubscriber = OuterSubscriber;

},{"./Subscriber":7}],5:[function(require,module,exports){
var Observable_1 = require('./Observable');
exports.Observable = Observable_1.Observable;
// statics
/* tslint:disable:no-use-before-declare */
require('./operators/combineLatest-static');
require('./operators/concat-static');
require('./operators/merge-static');
require('./observable/defer');
require('./observable/empty');
require('./observable/forkJoin');
require('./observable/from');
require('./observable/fromArray');
require('./observable/fromEvent');
require('./observable/fromEventPattern');
require('./observable/fromPromise');
require('./observable/fromCallback');
require('./observable/interval');
require('./observable/never');
require('./observable/range');
require('./observable/throw');
require('./observable/timer');
require('./operators/zip-static');
//operators
require('./operators/buffer');
require('./operators/bufferCount');
require('./operators/bufferTime');
require('./operators/bufferToggle');
require('./operators/bufferWhen');
require('./operators/catch');
require('./operators/combineAll');
require('./operators/combineLatest');
require('./operators/concat');
require('./operators/concatAll');
require('./operators/concatMap');
require('./operators/concatMapTo');
require('./operators/count');
require('./operators/dematerialize');
require('./operators/debounce');
require('./operators/debounceTime');
require('./operators/defaultIfEmpty');
require('./operators/delay');
require('./operators/distinctUntilChanged');
require('./operators/do');
require('./operators/expand');
require('./operators/filter');
require('./operators/finally');
require('./operators/first');
require('./operators/groupBy');
require('./operators/ignoreElements');
require('./operators/every');
require('./operators/last');
require('./operators/map');
require('./operators/mapTo');
require('./operators/materialize');
require('./operators/merge');
require('./operators/mergeAll');
require('./operators/mergeMap');
require('./operators/mergeMapTo');
require('./operators/multicast');
require('./operators/observeOn');
require('./operators/partition');
require('./operators/publish');
require('./operators/publishBehavior');
require('./operators/publishReplay');
require('./operators/reduce');
require('./operators/repeat');
require('./operators/retry');
require('./operators/retryWhen');
require('./operators/sample');
require('./operators/sampleTime');
require('./operators/scan');
require('./operators/share');
require('./operators/single');
require('./operators/skip');
require('./operators/skipUntil');
require('./operators/skipWhile');
require('./operators/startWith');
require('./operators/subscribeOn');
require('./operators/switch');
require('./operators/switchFirst');
require('./operators/switchMap');
require('./operators/switchMapFirst');
require('./operators/switchMapTo');
require('./operators/take');
require('./operators/takeUntil');
require('./operators/takeWhile');
require('./operators/throttle');
require('./operators/throttleTime');
require('./operators/timeout');
require('./operators/timeoutWith');
require('./operators/toArray');
require('./operators/toPromise');
require('./operators/window');
require('./operators/windowCount');
require('./operators/windowTime');
require('./operators/windowToggle');
require('./operators/windowWhen');
require('./operators/withLatestFrom');
require('./operators/zip');
require('./operators/zipAll');
/* tslint:disable:no-unused-variable */
var Subject_1 = require('./Subject');
exports.Subject = Subject_1.Subject;
var Subscription_1 = require('./Subscription');
exports.Subscription = Subscription_1.Subscription;
var Subscriber_1 = require('./Subscriber');
exports.Subscriber = Subscriber_1.Subscriber;
var ReplaySubject_1 = require('./subjects/ReplaySubject');
exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
var BehaviorSubject_1 = require('./subjects/BehaviorSubject');
exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
var ConnectableObservable_1 = require('./observable/ConnectableObservable');
exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
var Notification_1 = require('./Notification');
exports.Notification = Notification_1.Notification;
var EmptyError_1 = require('./util/EmptyError');
exports.EmptyError = EmptyError_1.EmptyError;
var ArgumentOutOfRangeError_1 = require('./util/ArgumentOutOfRangeError');
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
var nextTick_1 = require('./schedulers/nextTick');
var immediate_1 = require('./schedulers/immediate');
/* tslint:enable:no-unused-variable */
/* tslint:disable:no-var-keyword */
var Scheduler = {
    nextTick: nextTick_1.nextTick,
    immediate: immediate_1.immediate
};
exports.Scheduler = Scheduler;
/* tslint:enable:no-var-keyword */

},{"./Notification":2,"./Observable":3,"./Subject":6,"./Subscriber":7,"./Subscription":8,"./observable/ConnectableObservable":9,"./observable/defer":13,"./observable/empty":14,"./observable/forkJoin":15,"./observable/from":16,"./observable/fromArray":17,"./observable/fromCallback":18,"./observable/fromEvent":19,"./observable/fromEventPattern":20,"./observable/fromPromise":21,"./observable/interval":22,"./observable/never":23,"./observable/range":24,"./observable/throw":25,"./observable/timer":26,"./operators/buffer":27,"./operators/bufferCount":28,"./operators/bufferTime":29,"./operators/bufferToggle":30,"./operators/bufferWhen":31,"./operators/catch":32,"./operators/combineAll":33,"./operators/combineLatest":36,"./operators/combineLatest-static":34,"./operators/concat":38,"./operators/concat-static":37,"./operators/concatAll":39,"./operators/concatMap":40,"./operators/concatMapTo":41,"./operators/count":42,"./operators/debounce":43,"./operators/debounceTime":44,"./operators/defaultIfEmpty":45,"./operators/delay":46,"./operators/dematerialize":47,"./operators/distinctUntilChanged":48,"./operators/do":49,"./operators/every":50,"./operators/expand":52,"./operators/filter":53,"./operators/finally":54,"./operators/first":55,"./operators/groupBy":57,"./operators/ignoreElements":58,"./operators/last":59,"./operators/map":60,"./operators/mapTo":61,"./operators/materialize":62,"./operators/merge":64,"./operators/merge-static":63,"./operators/mergeAll":66,"./operators/mergeMap":68,"./operators/mergeMapTo":70,"./operators/multicast":71,"./operators/observeOn":73,"./operators/partition":74,"./operators/publish":75,"./operators/publishBehavior":76,"./operators/publishReplay":77,"./operators/reduce":79,"./operators/repeat":80,"./operators/retry":81,"./operators/retryWhen":82,"./operators/sample":83,"./operators/sampleTime":84,"./operators/scan":85,"./operators/share":86,"./operators/single":87,"./operators/skip":88,"./operators/skipUntil":89,"./operators/skipWhile":90,"./operators/startWith":91,"./operators/subscribeOn":92,"./operators/switch":93,"./operators/switchFirst":94,"./operators/switchMap":95,"./operators/switchMapFirst":96,"./operators/switchMapTo":97,"./operators/take":98,"./operators/takeUntil":99,"./operators/takeWhile":100,"./operators/throttle":101,"./operators/throttleTime":102,"./operators/timeout":103,"./operators/timeoutWith":104,"./operators/toArray":105,"./operators/toPromise":106,"./operators/window":107,"./operators/windowCount":108,"./operators/windowTime":109,"./operators/windowToggle":110,"./operators/windowWhen":111,"./operators/withLatestFrom":112,"./operators/zip":115,"./operators/zip-static":113,"./operators/zipAll":116,"./schedulers/immediate":122,"./schedulers/nextTick":123,"./subjects/BehaviorSubject":124,"./subjects/ReplaySubject":125,"./util/ArgumentOutOfRangeError":127,"./util/EmptyError":128}],6:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('./Observable');
var Subscriber_1 = require('./Subscriber');
var Subscription_1 = require('./Subscription');
var SubjectSubscription_1 = require('./subjects/SubjectSubscription');
var subscriptionAdd = Subscription_1.Subscription.prototype.add;
var subscriptionRemove = Subscription_1.Subscription.prototype.remove;
var subscriptionUnsubscribe = Subscription_1.Subscription.prototype.unsubscribe;
var subscriberNext = Subscriber_1.Subscriber.prototype.next;
var subscriberError = Subscriber_1.Subscriber.prototype.error;
var subscriberComplete = Subscriber_1.Subscriber.prototype.complete;
var _subscriberNext = Subscriber_1.Subscriber.prototype._next;
var _subscriberError = Subscriber_1.Subscriber.prototype._error;
var _subscriberComplete = Subscriber_1.Subscriber.prototype._complete;
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.apply(this, arguments);
        this.observers = [];
        this.isUnsubscribed = false;
        this.dispatching = false;
        this.errorSignal = false;
        this.completeSignal = false;
    }
    Subject.create = function (source, destination) {
        return new BidirectionalSubject(source, destination);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new BidirectionalSubject(this, this.destination || this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (subscriber.isUnsubscribed) {
            return;
        }
        else if (this.errorSignal) {
            subscriber.error(this.errorInstance);
            return;
        }
        else if (this.completeSignal) {
            subscriber.complete();
            return;
        }
        else if (this.isUnsubscribed) {
            throw new Error('Cannot subscribe to a disposed Subject.');
        }
        this.observers.push(subscriber);
        return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
    };
    Subject.prototype.add = function (subscription) {
        subscriptionAdd.call(this, subscription);
    };
    Subject.prototype.remove = function (subscription) {
        subscriptionRemove.call(this, subscription);
    };
    Subject.prototype.unsubscribe = function () {
        this.observers = void 0;
        subscriptionUnsubscribe.call(this);
    };
    Subject.prototype.next = function (value) {
        if (this.isUnsubscribed) {
            return;
        }
        this.dispatching = true;
        this._next(value);
        this.dispatching = false;
        if (this.errorSignal) {
            this.error(this.errorInstance);
        }
        else if (this.completeSignal) {
            this.complete();
        }
    };
    Subject.prototype.error = function (err) {
        if (this.isUnsubscribed || this.completeSignal) {
            return;
        }
        this.errorSignal = true;
        this.errorInstance = err;
        if (this.dispatching) {
            return;
        }
        this._error(err);
        this.unsubscribe();
    };
    Subject.prototype.complete = function () {
        if (this.isUnsubscribed || this.errorSignal) {
            return;
        }
        this.completeSignal = true;
        if (this.dispatching) {
            return;
        }
        this._complete();
        this.unsubscribe();
    };
    Subject.prototype._next = function (value) {
        var index = -1;
        var observers = this.observers.slice(0);
        var len = observers.length;
        while (++index < len) {
            observers[index].next(value);
        }
    };
    Subject.prototype._error = function (err) {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        // optimization -- block next, complete, and unsubscribe while dispatching
        this.observers = void 0;
        this.isUnsubscribed = true;
        while (++index < len) {
            observers[index].error(err);
        }
        this.isUnsubscribed = false;
    };
    Subject.prototype._complete = function () {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        // optimization -- block next, complete, and unsubscribe while dispatching
        this.observers = void 0; // optimization
        this.isUnsubscribed = true;
        while (++index < len) {
            observers[index].complete();
        }
        this.isUnsubscribed = false;
    };
    return Subject;
})(Observable_1.Observable);
exports.Subject = Subject;
var BidirectionalSubject = (function (_super) {
    __extends(BidirectionalSubject, _super);
    function BidirectionalSubject(source, destination) {
        _super.call(this);
        this.source = source;
        this.destination = destination;
    }
    BidirectionalSubject.prototype._subscribe = function (subscriber) {
        var operator = this.operator;
        return this.source._subscribe.call(this.source, operator ? operator.call(subscriber) : subscriber);
    };
    BidirectionalSubject.prototype.next = function (value) {
        subscriberNext.call(this, value);
    };
    BidirectionalSubject.prototype.error = function (err) {
        subscriberError.call(this, err);
    };
    BidirectionalSubject.prototype.complete = function () {
        subscriberComplete.call(this);
    };
    BidirectionalSubject.prototype._next = function (value) {
        _subscriberNext.call(this, value);
    };
    BidirectionalSubject.prototype._error = function (err) {
        _subscriberError.call(this, err);
    };
    BidirectionalSubject.prototype._complete = function () {
        _subscriberComplete.call(this);
    };
    return BidirectionalSubject;
})(Subject);

},{"./Observable":3,"./Subscriber":7,"./Subscription":8,"./subjects/SubjectSubscription":126}],7:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var noop_1 = require('./util/noop');
var throwError_1 = require('./util/throwError');
var tryOrOnError_1 = require('./util/tryOrOnError');
var Subscription_1 = require('./Subscription');
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        _super.call(this);
        this.destination = destination;
        this._isUnsubscribed = false;
        if (!this.destination) {
            return;
        }
        var subscription = destination._subscription;
        if (subscription) {
            this._subscription = subscription;
        }
        else if (destination instanceof Subscriber) {
            this._subscription = destination;
        }
    }
    Object.defineProperty(Subscriber.prototype, "isUnsubscribed", {
        get: function () {
            var subscription = this._subscription;
            if (subscription) {
                // route to the shared Subscription if it exists
                return this._isUnsubscribed || subscription.isUnsubscribed;
            }
            else {
                return this._isUnsubscribed;
            }
        },
        set: function (value) {
            var subscription = this._subscription;
            if (subscription) {
                // route to the shared Subscription if it exists
                subscription.isUnsubscribed = Boolean(value);
            }
            else {
                this._isUnsubscribed = Boolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber();
        subscriber._next = (typeof next === 'function') && tryOrOnError_1.tryOrOnError(next) || noop_1.noop;
        subscriber._error = (typeof error === 'function') && error || throwError_1.throwError;
        subscriber._complete = (typeof complete === 'function') && complete || noop_1.noop;
        return subscriber;
    };
    Subscriber.prototype.add = function (sub) {
        // route add to the shared Subscription if it exists
        var _subscription = this._subscription;
        if (_subscription) {
            _subscription.add(sub);
        }
        else {
            _super.prototype.add.call(this, sub);
        }
    };
    Subscriber.prototype.remove = function (sub) {
        // route remove to the shared Subscription if it exists
        if (this._subscription) {
            this._subscription.remove(sub);
        }
        else {
            _super.prototype.remove.call(this, sub);
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this._isUnsubscribed) {
            return;
        }
        else if (this._subscription) {
            this._isUnsubscribed = true;
        }
        else {
            _super.prototype.unsubscribe.call(this);
        }
    };
    Subscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.next) {
            destination.next(value);
        }
    };
    Subscriber.prototype._error = function (err) {
        var destination = this.destination;
        if (destination.error) {
            destination.error(err);
        }
    };
    Subscriber.prototype._complete = function () {
        var destination = this.destination;
        if (destination.complete) {
            destination.complete();
        }
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isUnsubscribed) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isUnsubscribed) {
            this._error(err);
            this.unsubscribe();
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isUnsubscribed) {
            this._complete();
            this.unsubscribe();
        }
    };
    return Subscriber;
})(Subscription_1.Subscription);
exports.Subscriber = Subscriber;

},{"./Subscription":8,"./util/noop":142,"./util/throwError":146,"./util/tryOrOnError":148}],8:[function(require,module,exports){
var noop_1 = require('./util/noop');
var Subscription = (function () {
    function Subscription(_unsubscribe) {
        this.isUnsubscribed = false;
        if (_unsubscribe) {
            this._unsubscribe = _unsubscribe;
        }
    }
    Subscription.prototype._unsubscribe = function () {
        noop_1.noop();
    };
    Subscription.prototype.unsubscribe = function () {
        if (this.isUnsubscribed) {
            return;
        }
        this.isUnsubscribed = true;
        var unsubscribe = this._unsubscribe;
        var subscriptions = this._subscriptions;
        this._subscriptions = void 0;
        if (unsubscribe) {
            unsubscribe.call(this);
        }
        if (subscriptions != null) {
            var index = -1;
            var len = subscriptions.length;
            while (++index < len) {
                subscriptions[index].unsubscribe();
            }
        }
    };
    Subscription.prototype.add = function (subscription) {
        // return early if:
        //  1. the subscription is null
        //  2. we're attempting to add our this
        //  3. we're attempting to add the static `empty` Subscription
        if (!subscription || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var sub = subscription;
        switch (typeof subscription) {
            case 'function':
                sub = new Subscription(subscription);
            case 'object':
                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.isUnsubscribed) {
                    sub.unsubscribe();
                }
                else {
                    var subscriptions = this._subscriptions || (this._subscriptions = []);
                    subscriptions.push(sub);
                }
                break;
            default:
                throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
        }
    };
    Subscription.prototype.remove = function (subscription) {
        // return early if:
        //  1. the subscription is null
        //  2. we're attempting to remove ourthis
        //  3. we're attempting to remove the static `empty` Subscription
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.isUnsubscribed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
})();
exports.Subscription = Subscription;

},{"./util/noop":142}],9:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscription_1 = require('../Subscription');
var Subscriber_1 = require('../Subscriber');
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this._getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype._getSubject = function () {
        var subject = this.subject;
        if (subject && !subject.isUnsubscribed) {
            return subject;
        }
        return (this.subject = this.subjectFactory());
    };
    ConnectableObservable.prototype.connect = function () {
        var source = this.source;
        var subscription = this.subscription;
        if (subscription && !subscription.isUnsubscribed) {
            return subscription;
        }
        subscription = source.subscribe(this._getSubject());
        subscription.add(new ConnectableSubscription(this));
        return (this.subscription = subscription);
    };
    ConnectableObservable.prototype.refCount = function () {
        return new RefCountObservable(this);
    };
    return ConnectableObservable;
})(Observable_1.Observable);
exports.ConnectableObservable = ConnectableObservable;
var ConnectableSubscription = (function (_super) {
    __extends(ConnectableSubscription, _super);
    function ConnectableSubscription(connectable) {
        _super.call(this);
        this.connectable = connectable;
    }
    ConnectableSubscription.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        connectable.subject = void 0;
        connectable.subscription = void 0;
        this.connectable = void 0;
    };
    return ConnectableSubscription;
})(Subscription_1.Subscription);
var RefCountObservable = (function (_super) {
    __extends(RefCountObservable, _super);
    function RefCountObservable(connectable, refCount) {
        if (refCount === void 0) { refCount = 0; }
        _super.call(this);
        this.connectable = connectable;
        this.refCount = refCount;
    }
    RefCountObservable.prototype._subscribe = function (subscriber) {
        var connectable = this.connectable;
        var refCountSubscriber = new RefCountSubscriber(subscriber, this);
        var subscription = connectable.subscribe(refCountSubscriber);
        if (!subscription.isUnsubscribed && ++this.refCount === 1) {
            refCountSubscriber.connection = this.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountObservable;
})(Observable_1.Observable);
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, refCountObservable) {
        _super.call(this, null);
        this.destination = destination;
        this.refCountObservable = refCountObservable;
        this.connection = refCountObservable.connection;
        destination.add(this);
    }
    RefCountSubscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    RefCountSubscriber.prototype._error = function (err) {
        this._resetConnectable();
        this.destination.error(err);
    };
    RefCountSubscriber.prototype._complete = function () {
        this._resetConnectable();
        this.destination.complete();
    };
    RefCountSubscriber.prototype._resetConnectable = function () {
        var observable = this.refCountObservable;
        var obsConnection = observable.connection;
        var subConnection = this.connection;
        if (subConnection && subConnection === obsConnection) {
            observable.refCount = 0;
            obsConnection.unsubscribe();
            observable.connection = void 0;
            this.unsubscribe();
        }
    };
    RefCountSubscriber.prototype._unsubscribe = function () {
        var observable = this.refCountObservable;
        if (observable.refCount === 0) {
            return;
        }
        if (--observable.refCount === 0) {
            var obsConnection = observable.connection;
            var subConnection = this.connection;
            if (subConnection && subConnection === obsConnection) {
                obsConnection.unsubscribe();
                observable.connection = void 0;
            }
        }
    };
    return RefCountSubscriber;
})(Subscriber_1.Subscriber);

},{"../Observable":3,"../Subscriber":7,"../Subscription":8}],10:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var root_1 = require('../util/root');
var Symbol_iterator_1 = require('../util/Symbol_iterator');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var IteratorObservable = (function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, project, thisArg, scheduler) {
        _super.call(this);
        this.project = project;
        this.thisArg = thisArg;
        this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        if (project && typeof project !== 'function') {
            throw new Error('When provided, `project` must be a function.');
        }
        this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, project, thisArg, scheduler) {
        return new IteratorObservable(iterator, project, thisArg, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, thisArg = state.thisArg, project = state.project, iterator = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        if (project) {
            result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index);
            if (result === errorObject_1.errorObject) {
                state.error = errorObject_1.errorObject.e;
                state.hasError = true;
            }
            else {
                subscriber.next(result);
                state.index = index + 1;
            }
        }
        else {
            subscriber.next(result.value);
            state.index = index + 1;
        }
        if (subscriber.isUnsubscribed) {
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator = _a.iterator, project = _a.project, thisArg = _a.thisArg, scheduler = _a.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, thisArg: thisArg, project: project, iterator: iterator, subscriber: subscriber
            }));
        }
        else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else if (project) {
                    result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
                    if (result === errorObject_1.errorObject) {
                        subscriber.error(errorObject_1.errorObject.e);
                        break;
                    }
                    subscriber.next(result);
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.isUnsubscribed) {
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
})(Observable_1.Observable);
exports.IteratorObservable = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = str.length; }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[Symbol_iterator_1.$$iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
})();
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = toLength(arr); }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[Symbol_iterator_1.$$iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
})();
function getIterator(obj) {
    var i = obj[Symbol_iterator_1.$$iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('Object is not iterable');
    }
    return obj[Symbol_iterator_1.$$iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}

},{"../Observable":3,"../util/Symbol_iterator":133,"../util/errorObject":136,"../util/root":144,"../util/tryCatch":147}],11:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var throw_1 = require('./throw');
var empty_1 = require('./empty');
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            }));
        }
        else {
            subscriber.next(value);
            if (!subscriber.isUnsubscribed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
})(Observable_1.Observable);
exports.ScalarObservable = ScalarObservable;
// TypeScript is weird about class prototype member functions and instance properties touching on it's plate.
var proto = ScalarObservable.prototype;
proto.map = function (project, thisArg) {
    var result = tryCatch_1.tryCatch(project).call(thisArg || this, this.value, 0);
    if (result === errorObject_1.errorObject) {
        return new throw_1.ErrorObservable(errorObject_1.errorObject.e);
    }
    else {
        return new ScalarObservable(project.call(thisArg || this, this.value, 0));
    }
};
proto.filter = function (select, thisArg) {
    var result = tryCatch_1.tryCatch(select).call(thisArg || this, this.value, 0);
    if (result === errorObject_1.errorObject) {
        return new throw_1.ErrorObservable(errorObject_1.errorObject.e);
    }
    else if (result) {
        return this;
    }
    else {
        return new empty_1.EmptyObservable();
    }
};
proto.reduce = function (project, seed) {
    if (typeof seed === 'undefined') {
        return this;
    }
    var result = tryCatch_1.tryCatch(project)(seed, this.value);
    if (result === errorObject_1.errorObject) {
        return new throw_1.ErrorObservable(errorObject_1.errorObject.e);
    }
    else {
        return new ScalarObservable(result);
    }
};
proto.scan = function (project, acc) {
    return this.reduce(project, acc);
};
proto.count = function (predicate, thisArg) {
    if (!predicate) {
        return new ScalarObservable(1);
    }
    else {
        var result = tryCatch_1.tryCatch(predicate).call(thisArg || this, this.value, 0, this);
        if (result === errorObject_1.errorObject) {
            return new throw_1.ErrorObservable(errorObject_1.errorObject.e);
        }
        else {
            return new ScalarObservable(result ? 1 : 0);
        }
    }
};
proto.skip = function (count) {
    if (count > 0) {
        return new empty_1.EmptyObservable();
    }
    return this;
};
proto.take = function (count) {
    if (count > 0) {
        return this;
    }
    return new empty_1.EmptyObservable();
};

},{"../Observable":3,"../util/errorObject":136,"../util/tryCatch":147,"./empty":14,"./throw":25}],12:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var nextTick_1 = require('../schedulers/nextTick');
var isNumeric_1 = require('../util/isNumeric');
var SubscribeOnObservable = (function (_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) { delayTime = 0; }
        if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
        _super.call(this);
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
            this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = nextTick_1.nextTick;
        }
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) { delay = 0; }
        if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (_a) {
        var source = _a.source, subscriber = _a.subscriber;
        return source.subscribe(subscriber);
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        }));
    };
    return SubscribeOnObservable;
})(Observable_1.Observable);
exports.SubscribeOnObservable = SubscribeOnObservable;

},{"../Observable":3,"../schedulers/nextTick":123,"../util/isNumeric":139}],13:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var DeferObservable = (function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
    }
    DeferObservable.create = function (observableFactory) {
        return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
        var result = tryCatch_1.tryCatch(this.observableFactory)();
        if (result === errorObject_1.errorObject) {
            subscriber.error(errorObject_1.errorObject.e);
        }
        else {
            result.subscribe(subscriber);
        }
    };
    return DeferObservable;
})(Observable_1.Observable);
exports.DeferObservable = DeferObservable;
Observable_1.Observable.defer = DeferObservable.create;

},{"../Observable":3,"../util/errorObject":136,"../util/tryCatch":147}],14:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (_a) {
        var subscriber = _a.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber }));
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
})(Observable_1.Observable);
exports.EmptyObservable = EmptyObservable;
Observable_1.Observable.empty = EmptyObservable.create;

},{"../Observable":3}],15:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var fromPromise_1 = require('./fromPromise');
var empty_1 = require('./empty');
var isPromise_1 = require('../util/isPromise');
var isArray_1 = require('../util/isArray');
var ForkJoinObservable = (function (_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    ForkJoinObservable.create = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
            return new empty_1.EmptyObservable();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = sources.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
            sources = sources[0];
        }
        return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function (subscriber) {
        var sources = this.sources;
        var len = sources.length;
        var context = { completed: 0, total: len, values: emptyArray(len), selector: this.resultSelector };
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            if (isPromise_1.isPromise(source)) {
                source = new fromPromise_1.PromiseObservable(source);
            }
            source.subscribe(new AllSubscriber(subscriber, i, context));
        }
    };
    return ForkJoinObservable;
})(Observable_1.Observable);
exports.ForkJoinObservable = ForkJoinObservable;
var AllSubscriber = (function (_super) {
    __extends(AllSubscriber, _super);
    function AllSubscriber(destination, index, context) {
        _super.call(this, destination);
        this.index = index;
        this.context = context;
        this._value = null;
    }
    AllSubscriber.prototype._next = function (value) {
        this._value = value;
    };
    AllSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this._value == null) {
            destination.complete();
        }
        var context = this.context;
        context.completed++;
        context.values[this.index] = this._value;
        var values = context.values;
        if (context.completed !== values.length) {
            return;
        }
        if (values.every(hasValue)) {
            var value = context.selector ? context.selector.apply(this, values) :
                values;
            destination.next(value);
        }
        destination.complete();
    };
    return AllSubscriber;
})(Subscriber_1.Subscriber);
function hasValue(x) {
    return x !== null;
}
function emptyArray(len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(null);
    }
    return arr;
}
Observable_1.Observable.forkJoin = ForkJoinObservable.create;

},{"../Observable":3,"../Subscriber":7,"../util/isArray":137,"../util/isPromise":140,"./empty":14,"./fromPromise":21}],16:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fromPromise_1 = require('./fromPromise');
var IteratorObservable_1 = require('./IteratorObservable');
var fromArray_1 = require('./fromArray');
var Symbol_observable_1 = require('../util/Symbol_observable');
var Symbol_iterator_1 = require('../util/Symbol_iterator');
var Observable_1 = require('../Observable');
var observeOn_support_1 = require('../operators/observeOn-support');
var immediate_1 = require('../schedulers/immediate');
var isArray = Array.isArray;
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    FromObservable.create = function (ish, scheduler) {
        if (scheduler === void 0) { scheduler = immediate_1.immediate; }
        if (ish) {
            if (isArray(ish)) {
                return new fromArray_1.ArrayObservable(ish, scheduler);
            }
            else if (typeof ish.then === 'function') {
                return new fromPromise_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[Symbol_observable_1.$$observable] === 'function') {
                if (ish instanceof Observable_1.Observable) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (typeof ish[Symbol_iterator_1.$$iterator] === 'function') {
                return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
            }
        }
        throw new TypeError((typeof ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler === immediate_1.immediate) {
            return ish[Symbol_observable_1.$$observable]().subscribe(subscriber);
        }
        else {
            return ish[Symbol_observable_1.$$observable]().subscribe(new observeOn_support_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
})(Observable_1.Observable);
exports.FromObservable = FromObservable;
Observable_1.Observable.from = FromObservable.create;

},{"../Observable":3,"../operators/observeOn-support":72,"../schedulers/immediate":122,"../util/Symbol_iterator":133,"../util/Symbol_observable":134,"./IteratorObservable":10,"./fromArray":17,"./fromPromise":21}],17:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var ScalarObservable_1 = require('./ScalarObservable');
var empty_1 = require('./empty');
var isScheduler_1 = require('../util/isScheduler');
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = void 0;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new empty_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            }));
        }
        else {
            for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
})(Observable_1.Observable);
exports.ArrayObservable = ArrayObservable;
Observable_1.Observable.of = ArrayObservable.of;
Observable_1.Observable.fromArray = ArrayObservable.create;

},{"../Observable":3,"../util/isScheduler":141,"./ScalarObservable":11,"./empty":14}],18:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscription_1 = require('../Subscription');
var immediate_1 = require('../schedulers/immediate');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var CallbackObservable = (function (_super) {
    __extends(CallbackObservable, _super);
    function CallbackObservable(callbackFunc, ctx, selector, args, scheduler) {
        if (scheduler === void 0) { scheduler = immediate_1.immediate; }
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.ctx = ctx;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
        this._isScalar = false;
    }
    CallbackObservable.create = function (callbackFunc, ctx, selector, scheduler) {
        if (ctx === void 0) { ctx = undefined; }
        if (selector === void 0) { selector = undefined; }
        if (scheduler === void 0) { scheduler = immediate_1.immediate; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return new CallbackObservable(callbackFunc, ctx, selector, args, scheduler);
        };
    };
    CallbackObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var callbackFunc = this.callbackFunc;
        var ctx = this.ctx;
        var selector = this.selector;
        var args = this.args;
        var scheduler = this.scheduler;
        var handler;
        if (scheduler === immediate_1.immediate) {
            if (this._isScalar) {
                subscriber.next(this.value);
                subscriber.complete();
            }
            else {
                handler = function () {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i - 0] = arguments[_i];
                    }
                    var results;
                    _this._isScalar = true;
                    _this.value = innerArgs;
                    if (selector) {
                        results = tryCatch_1.tryCatch(selector).apply(ctx, innerArgs);
                        if (results === errorObject_1.errorObject) {
                            return subscriber.error(results.e);
                        }
                        subscriber.next(results);
                    }
                    else {
                        if (innerArgs.length <= 1) {
                            subscriber.next(innerArgs[0]);
                        }
                        else {
                            subscriber.next(innerArgs);
                        }
                    }
                    subscriber.complete();
                };
            }
        }
        else {
            var subscription = new Subscription_1.Subscription();
            if (this._isScalar) {
                var value = this.value;
                subscription.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
            }
            else {
                handler = function () {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i - 0] = arguments[_i];
                    }
                    var results;
                    _this._isScalar = true;
                    if (selector) {
                        results = tryCatch_1.tryCatch(selector).apply(ctx, innerArgs);
                        if (results === errorObject_1.errorObject) {
                            return subscription.add(scheduler.schedule(dispatchError, 0, { err: results.e, subscriber: subscriber }));
                        }
                        _this.value = results;
                    }
                    else {
                        if (innerArgs.length <= 1) {
                            _this.value = innerArgs[0];
                        }
                        else {
                            _this.value = innerArgs;
                        }
                    }
                    var value = _this.value;
                    subscription.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                };
                return subscription;
            }
        }
        if (handler) {
            args.push(handler);
            callbackFunc.apply(ctx, args);
        }
    };
    return CallbackObservable;
})(Observable_1.Observable);
exports.CallbackObservable = CallbackObservable;
function dispatchNext(_a) {
    var value = _a.value, subscriber = _a.subscriber;
    subscriber.next(value);
    subscriber.complete();
}
function dispatchError(_a) {
    var err = _a.err, subscriber = _a.subscriber;
    subscriber.error(err);
}
Observable_1.Observable.fromCallback = CallbackObservable.create;

},{"../Observable":3,"../Subscription":8,"../schedulers/immediate":122,"../util/errorObject":136,"../util/tryCatch":147}],19:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var Subscription_1 = require('../Subscription');
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
    }
    FromEventObservable.create = function (sourceObj, eventName, selector) {
        return new FromEventObservable(sourceObj, eventName, selector);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber) {
        var unsubscribe;
        var tag = sourceObj.toString();
        if (tag === '[object NodeList]' || tag === '[object HTMLCollection]') {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
            }
        }
        else if (typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function') {
            sourceObj.addEventListener(eventName, handler);
            unsubscribe = function () { return sourceObj.removeEventListener(eventName, handler); };
        }
        else if (typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function') {
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return sourceObj.off(eventName, handler); };
        }
        else if (typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function') {
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return sourceObj.removeListener(eventName, handler); };
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var selector = this.selector;
        var handler = selector ? function (e) {
            var result = tryCatch_1.tryCatch(selector)(e);
            if (result === errorObject_1.errorObject) {
                subscriber.error(result.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
    };
    return FromEventObservable;
})(Observable_1.Observable);
exports.FromEventObservable = FromEventObservable;
Observable_1.Observable.fromEvent = FromEventObservable.create;

},{"../Observable":3,"../Subscription":8,"../util/errorObject":136,"../util/tryCatch":147}],20:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscription_1 = require('../Subscription');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var FromEventPatternObservable = (function (_super) {
    __extends(FromEventPatternObservable, _super);
    function FromEventPatternObservable(addHandler, removeHandler, selector) {
        _super.call(this);
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.selector = selector;
    }
    FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
    };
    FromEventPatternObservable.prototype._subscribe = function (subscriber) {
        var addHandler = this.addHandler;
        var removeHandler = this.removeHandler;
        var selector = this.selector;
        var handler = selector ? function (e) {
            var result = tryCatch_1.tryCatch(selector).apply(null, arguments);
            if (result === errorObject_1.errorObject) {
                subscriber.error(result.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { subscriber.next(e); };
        var result = tryCatch_1.tryCatch(addHandler)(handler);
        if (result === errorObject_1.errorObject) {
            subscriber.error(result.e);
        }
        subscriber.add(new Subscription_1.Subscription(function () {
            //TODO: determine whether or not to forward to error handler
            removeHandler(handler);
        }));
    };
    return FromEventPatternObservable;
})(Observable_1.Observable);
exports.FromEventPatternObservable = FromEventPatternObservable;
Observable_1.Observable.fromEventPattern = FromEventPatternObservable.create;

},{"../Observable":3,"../Subscription":8,"../util/errorObject":136,"../util/tryCatch":147}],21:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscription_1 = require('../Subscription');
var immediate_1 = require('../schedulers/immediate');
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        if (scheduler === void 0) { scheduler = immediate_1.immediate; }
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
        this._isScalar = false;
    }
    PromiseObservable.create = function (promise, scheduler) {
        if (scheduler === void 0) { scheduler = immediate_1.immediate; }
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var scheduler = this.scheduler;
        var promise = this.promise;
        if (scheduler === immediate_1.immediate) {
            if (this._isScalar) {
                subscriber.next(this.value);
                subscriber.complete();
            }
            else {
                promise.then(function (value) {
                    _this._isScalar = true;
                    _this.value = value;
                    subscriber.next(value);
                    subscriber.complete();
                }, function (err) { return subscriber.error(err); })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    setTimeout(function () { throw err; });
                });
            }
        }
        else {
            var subscription = new Subscription_1.Subscription();
            if (this._isScalar) {
                var value = this.value;
                subscription.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
            }
            else {
                promise.then(function (value) {
                    _this._isScalar = true;
                    _this.value = value;
                    subscription.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                }, function (err) { return subscription.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber })); })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    scheduler.schedule(function () { throw err; });
                });
            }
            return subscription;
        }
    };
    return PromiseObservable;
})(Observable_1.Observable);
exports.PromiseObservable = PromiseObservable;
function dispatchNext(_a) {
    var value = _a.value, subscriber = _a.subscriber;
    subscriber.next(value);
    subscriber.complete();
}
function dispatchError(_a) {
    var err = _a.err, subscriber = _a.subscriber;
    subscriber.error(err);
}
Observable_1.Observable.fromPromise = PromiseObservable.create;

},{"../Observable":3,"../Subscription":8,"../schedulers/immediate":122}],22:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = require('../util/isNumeric');
var Observable_1 = require('../Observable');
var nextTick_1 = require('../schedulers/nextTick');
var IntervalObservable = (function (_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = nextTick_1.nextTick;
        }
    }
    IntervalObservable.create = function (period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
        return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
        var index = state.index, subscriber = state.subscriber, period = state.period;
        subscriber.next(index);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };
    return IntervalObservable;
})(Observable_1.Observable);
exports.IntervalObservable = IntervalObservable;
Observable_1.Observable.interval = IntervalObservable.create;

},{"../Observable":3,"../schedulers/nextTick":123,"../util/isNumeric":139}],23:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var noop_1 = require('../util/noop');
var InfiniteObservable = (function (_super) {
    __extends(InfiniteObservable, _super);
    function InfiniteObservable() {
        _super.call(this);
    }
    InfiniteObservable.create = function () {
        return new InfiniteObservable();
    };
    InfiniteObservable.prototype._subscribe = function (subscriber) {
        noop_1.noop();
    };
    return InfiniteObservable;
})(Observable_1.Observable);
exports.InfiniteObservable = InfiniteObservable;
Observable_1.Observable.never = InfiniteObservable.create;

},{"../Observable":3,"../util/noop":142}],24:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var RangeObservable = (function (_super) {
    __extends(RangeObservable, _super);
    function RangeObservable(start, end, scheduler) {
        _super.call(this);
        this.start = start;
        this.end = end;
        this.scheduler = scheduler;
    }
    RangeObservable.create = function (start, end, scheduler) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        return new RangeObservable(start, end, scheduler);
    };
    RangeObservable.dispatch = function (state) {
        var start = state.start, index = state.index, end = state.end, subscriber = state.subscriber;
        if (index >= end) {
            subscriber.complete();
            return;
        }
        subscriber.next(start);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
    };
    RangeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var start = this.start;
        var end = this.end;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(RangeObservable.dispatch, 0, {
                index: index, end: end, start: start, subscriber: subscriber
            }));
        }
        else {
            do {
                if (index++ >= end) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(start++);
                if (subscriber.isUnsubscribed) {
                    break;
                }
            } while (true);
        }
    };
    return RangeObservable;
})(Observable_1.Observable);
exports.RangeObservable = RangeObservable;
Observable_1.Observable.range = RangeObservable.create;

},{"../Observable":3}],25:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var ErrorObservable = (function (_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
        _super.call(this);
        this.error = error;
        this.scheduler = scheduler;
    }
    ErrorObservable.create = function (error, scheduler) {
        return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function (_a) {
        var error = _a.error, subscriber = _a.subscriber;
        subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function (subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(ErrorObservable.dispatch, 0, {
                error: error, subscriber: subscriber
            }));
        }
        else {
            subscriber.error(error);
        }
    };
    return ErrorObservable;
})(Observable_1.Observable);
exports.ErrorObservable = ErrorObservable;
Observable_1.Observable.throw = ErrorObservable.create;

},{"../Observable":3}],26:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = require('../util/isNumeric');
var Observable_1 = require('../Observable');
var nextTick_1 = require('../schedulers/nextTick');
var isScheduler_1 = require('../util/isScheduler');
var isDate_1 = require('../util/isDate');
var TimerObservable = (function (_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
            this._period = Number(period) < 1 && 1 || Number(period);
        }
        else if (isScheduler_1.isScheduler(period)) {
            scheduler = period;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            scheduler = nextTick_1.nextTick;
        }
        this.scheduler = scheduler;
        var absoluteDueTime = isDate_1.isDate(dueTime);
        this.dueTime = absoluteDueTime ? (+dueTime - this.scheduler.now()) : dueTime;
    }
    TimerObservable.create = function (dueTime, period, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        return new TimerObservable(dueTime, period, scheduler);
    };
    TimerObservable.dispatch = function (state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (typeof period === 'undefined') {
            subscriber.complete();
            return;
        }
        else if (subscriber.isUnsubscribed) {
            return;
        }
        if (typeof action.delay === 'undefined') {
            action.add(action.scheduler.schedule(TimerObservable.dispatch, period, {
                index: index + 1, period: period, subscriber: subscriber
            }));
        }
        else {
            state.index = index + 1;
            action.schedule(state, period);
        }
    };
    TimerObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this._period;
        var dueTime = this.dueTime;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(TimerObservable.dispatch, dueTime, { index: index, period: period, subscriber: subscriber }));
    };
    return TimerObservable;
})(Observable_1.Observable);
exports.TimerObservable = TimerObservable;
Observable_1.Observable.timer = TimerObservable.create;

},{"../Observable":3,"../schedulers/nextTick":123,"../util/isDate":138,"../util/isNumeric":139,"../util/isScheduler":141}],27:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
/**
 * buffers the incoming observable values until the passed `closingNotifier` emits a value, at which point
 * it emits the buffer on the returned observable and starts a new buffer internally, awaiting the
 * next time `closingNotifier` emits
 *
 * @param {Observable<any>} closingNotifier an observable, that signals the buffer to be emitted} from the returned observable
 * @returns {Observable<T[]>} an observable of buffers, which are arrays of values
 */
function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}
exports.buffer = buffer;
var BufferOperator = (function () {
    function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    BufferOperator.prototype.call = function (subscriber) {
        return new BufferSubscriber(subscriber, this.closingNotifier);
    };
    return BufferOperator;
})();
var BufferSubscriber = (function (_super) {
    __extends(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.buffer = [];
        this.notifierSubscriber = null;
        this.notifierSubscriber = new BufferClosingNotifierSubscriber(this);
        this.add(closingNotifier._subscribe(this.notifierSubscriber));
    }
    BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferSubscriber.prototype._error = function (err) {
        this.destination.error(err);
    };
    BufferSubscriber.prototype._complete = function () {
        this.destination.complete();
    };
    BufferSubscriber.prototype.flushBuffer = function () {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
        if (this.isUnsubscribed) {
            this.notifierSubscriber.unsubscribe();
        }
    };
    return BufferSubscriber;
})(Subscriber_1.Subscriber);
var BufferClosingNotifierSubscriber = (function (_super) {
    __extends(BufferClosingNotifierSubscriber, _super);
    function BufferClosingNotifierSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    BufferClosingNotifierSubscriber.prototype._next = function (value) {
        this.parent.flushBuffer();
    };
    BufferClosingNotifierSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    BufferClosingNotifierSubscriber.prototype._complete = function () {
        this.parent.complete();
    };
    return BufferClosingNotifierSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.buffer = buffer;

},{"../Observable":3,"../Subscriber":7}],28:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
/**
 * buffers a number of values from the source observable by `bufferSize` then emits the buffer and clears it, and starts a
 * new buffer each `startBufferEvery` values. If `startBufferEvery` is not provided or is `null`, then new buffers are
 * started immediately at the start of the source and when each buffer closes and is emitted.
 * @param {number} bufferSize the maximum size of the buffer emitted.
 * @param {number} [startBufferEvery] optional interval at which to start a new buffer. (e.g. if `startBufferEvery` is `2`,asdf then a
 *   new buffer will be started on every other value from the source.) A new buffer is started at the beginning of the source by default.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}
exports.bufferCount = bufferCount;
var BufferCountOperator = (function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
    }
    BufferCountOperator.prototype.call = function (subscriber) {
        return new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery);
    };
    return BufferCountOperator;
})();
var BufferCountSubscriber = (function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _super.call(this, destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [[]];
        this.count = 0;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var count = (this.count += 1);
        var destination = this.destination;
        var bufferSize = this.bufferSize;
        var startBufferEvery = (this.startBufferEvery == null) ? bufferSize : this.startBufferEvery;
        var buffers = this.buffers;
        var len = buffers.length;
        var remove = -1;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = 0; i < len; i++) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                remove = i;
                destination.next(buffer);
            }
        }
        if (remove !== -1) {
            buffers.splice(remove, 1);
        }
    };
    BufferCountSubscriber.prototype._error = function (err) {
        this.destination.error(err);
    };
    BufferCountSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var buffers = this.buffers;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        destination.complete();
    };
    return BufferCountSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.bufferCount = bufferCount;

},{"../Observable":3,"../Subscriber":7}],29:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var nextTick_1 = require('../schedulers/nextTick');
/**
 * buffers values from the source for a specific time period. Optionally allows new buffers to be set up at an interval.
 * @param {number} the amount of time to fill each buffer for before emitting them and clearing them.
 * @param {number} [bufferCreationInterval] the interval at which to start new buffers.
 * @param {Scheduler} [scheduler] (optional, defaults to `nextTick` scheduler) The scheduler on which to schedule the
 *  intervals that determine buffer boundaries.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */
function bufferTime(bufferTimeSpan, bufferCreationInterval, scheduler) {
    if (bufferCreationInterval === void 0) { bufferCreationInterval = null; }
    if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
}
exports.bufferTime = bufferTime;
var BufferTimeOperator = (function () {
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
    }
    BufferTimeOperator.prototype.call = function (subscriber) {
        return new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler);
    };
    return BufferTimeOperator;
})();
var BufferTimeSubscriber = (function (_super) {
    __extends(BufferTimeSubscriber, _super);
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, scheduler) {
        _super.call(this, destination);
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
        this.buffers = [];
        var buffer = this.openBuffer();
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            var closeState = { subscriber: this, buffer: buffer };
            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: this, scheduler: scheduler };
            this.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
        else {
            var timeSpanOnlyState = { subscriber: this, buffer: buffer, bufferTimeSpan: bufferTimeSpan };
            this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    }
    BufferTimeSubscriber.prototype._next = function (value) {
        var buffers = this.buffers;
        var len = buffers.length;
        for (var i = 0; i < len; i++) {
            buffers[i].push(value);
        }
    };
    BufferTimeSubscriber.prototype._error = function (err) {
        this.buffers.length = 0;
        this.destination.error(err);
    };
    BufferTimeSubscriber.prototype._complete = function () {
        var buffers = this.buffers;
        while (buffers.length > 0) {
            this.destination.next(buffers.shift());
        }
        this.destination.complete();
    };
    BufferTimeSubscriber.prototype.openBuffer = function () {
        var buffer = [];
        this.buffers.push(buffer);
        return buffer;
    };
    BufferTimeSubscriber.prototype.closeBuffer = function (buffer) {
        this.destination.next(buffer);
        var buffers = this.buffers;
        buffers.splice(buffers.indexOf(buffer), 1);
    };
    return BufferTimeSubscriber;
})(Subscriber_1.Subscriber);
function dispatchBufferTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var prevBuffer = state.buffer;
    if (prevBuffer) {
        subscriber.closeBuffer(prevBuffer);
    }
    state.buffer = subscriber.openBuffer();
    if (!subscriber.isUnsubscribed) {
        this.schedule(state, state.bufferTimeSpan);
    }
}
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
    var buffer = subscriber.openBuffer();
    var action = this;
    if (!subscriber.isUnsubscribed) {
        action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, buffer: buffer }));
        action.schedule(state, bufferCreationInterval);
    }
}
function dispatchBufferClose(_a) {
    var subscriber = _a.subscriber, buffer = _a.buffer;
    subscriber.closeBuffer(buffer);
}
Observable_1.Observable.prototype.bufferTime = bufferTime;

},{"../Observable":3,"../Subscriber":7,"../schedulers/nextTick":123}],30:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subscription_1 = require('../Subscription');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
/**
 * buffers values from the source by opening the buffer via signals from an observable provided to `openings`, and closing
 * and sending the buffers when an observable returned by the `closingSelector` emits.
 * @param {Observable<O>} openings An observable of notifications to start new buffers
 * @param {Function} an function, that takes the value emitted by the `openings` observable and returns an Observable, which,
 *  when it emits, signals that the associated buffer should be emitted and cleared.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */
function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
}
exports.bufferToggle = bufferToggle;
var BufferToggleOperator = (function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber) {
        return new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector);
    };
    return BufferToggleOperator;
})();
var BufferToggleSubscriber = (function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openings._subscribe(new BufferToggleOpeningsSubscriber(this)));
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        this.contexts = null;
        this.destination.error(err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            this.destination.next(context.buffer);
            context.subscription.unsubscribe();
            context.buffer = null;
        }
        this.destination.complete();
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        var closingSelector = this.closingSelector;
        var contexts = this.contexts;
        var closingNotifier = tryCatch_1.tryCatch(closingSelector)(value);
        if (closingNotifier === errorObject_1.errorObject) {
            var err = closingNotifier.e;
            this.contexts = null;
            this.destination.error(err);
        }
        else {
            var context = {
                buffer: [],
                subscription: new Subscription_1.Subscription()
            };
            contexts.push(context);
            var subscriber = new BufferClosingNotifierSubscriber(this, context);
            var subscription = closingNotifier._subscribe(subscriber);
            this.add(context.subscription.add(subscription));
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts === null) {
            return;
        }
        var buffer = context.buffer, subscription = context.subscription;
        this.destination.next(buffer);
        contexts.splice(contexts.indexOf(context), 1);
        this.remove(subscription);
        subscription.unsubscribe();
    };
    return BufferToggleSubscriber;
})(Subscriber_1.Subscriber);
var BufferClosingNotifierSubscriber = (function (_super) {
    __extends(BufferClosingNotifierSubscriber, _super);
    function BufferClosingNotifierSubscriber(parent, context) {
        _super.call(this, null);
        this.parent = parent;
        this.context = context;
    }
    BufferClosingNotifierSubscriber.prototype._next = function () {
        this.parent.closeBuffer(this.context);
    };
    BufferClosingNotifierSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    BufferClosingNotifierSubscriber.prototype._complete = function () {
        this.parent.closeBuffer(this.context);
    };
    return BufferClosingNotifierSubscriber;
})(Subscriber_1.Subscriber);
var BufferToggleOpeningsSubscriber = (function (_super) {
    __extends(BufferToggleOpeningsSubscriber, _super);
    function BufferToggleOpeningsSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    BufferToggleOpeningsSubscriber.prototype._next = function (value) {
        this.parent.openBuffer(value);
    };
    BufferToggleOpeningsSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    BufferToggleOpeningsSubscriber.prototype._complete = function () {
        // noop
    };
    return BufferToggleOpeningsSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.bufferToggle = bufferToggle;

},{"../Observable":3,"../Subscriber":7,"../Subscription":8,"../util/errorObject":136,"../util/tryCatch":147}],31:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
/**
 * Opens a buffer immediately, then closes the buffer when the observable returned by calling `closingSelector` emits a value.
 * It that immediately opens a new buffer and repeats the process
 * @param {function} a function that takes no arguments and returns an Observable that signals buffer closure
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */
function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}
exports.bufferWhen = bufferWhen;
var BufferWhenOperator = (function () {
    function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function (subscriber) {
        return new BufferWhenSubscriber(subscriber, this.closingSelector);
    };
    return BufferWhenOperator;
})();
var BufferWhenSubscriber = (function (_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.closingSelector = closingSelector;
        this.openBuffer();
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._error = function (err) {
        this.buffer = null;
        this.destination.error(err);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        this.destination.next(buffer);
        this.buffer = null;
        this.destination.complete();
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var prevClosingNotification = this.closingNotification;
        if (prevClosingNotification) {
            this.remove(prevClosingNotification);
            prevClosingNotification.unsubscribe();
        }
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            var err = closingNotifier.e;
            this.buffer = null;
            this.destination.error(err);
        }
        else {
            this.add(this.closingNotification = closingNotifier._subscribe(new BufferClosingNotifierSubscriber(this)));
        }
    };
    return BufferWhenSubscriber;
})(Subscriber_1.Subscriber);
var BufferClosingNotifierSubscriber = (function (_super) {
    __extends(BufferClosingNotifierSubscriber, _super);
    function BufferClosingNotifierSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    BufferClosingNotifierSubscriber.prototype._next = function () {
        this.parent.openBuffer();
    };
    BufferClosingNotifierSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    BufferClosingNotifierSubscriber.prototype._complete = function () {
        this.parent.openBuffer();
    };
    return BufferClosingNotifierSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.bufferWhen = bufferWhen;

},{"../Observable":3,"../Subscriber":7,"../util/errorObject":136,"../util/tryCatch":147}],32:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} an observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 */
function _catch(selector) {
    var catchOperator = new CatchOperator(selector);
    var caught = this.lift(catchOperator);
    catchOperator.caught = caught;
    return caught;
}
exports._catch = _catch;
var CatchOperator = (function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber) {
        return new CatchSubscriber(subscriber, this.selector, this.caught);
    };
    return CatchOperator;
})();
var CatchSubscriber = (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        _super.call(this, null);
        this.destination = destination;
        this.selector = selector;
        this.caught = caught;
        this.lastSubscription = this;
    }
    CatchSubscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    CatchSubscriber.prototype._error = function (err) {
        var result = tryCatch_1.tryCatch(this.selector)(err, this.caught);
        if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
        }
        else {
            this.lastSubscription.unsubscribe();
            this.lastSubscription = result.subscribe(this.destination);
        }
    };
    CatchSubscriber.prototype._complete = function () {
        this.lastSubscription.unsubscribe();
        this.destination.complete();
    };
    CatchSubscriber.prototype._unsubscribe = function () {
        this.lastSubscription.unsubscribe();
    };
    return CatchSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.catch = _catch;

},{"../Observable":3,"../Subscriber":7,"../util/errorObject":136,"../util/tryCatch":147}],33:[function(require,module,exports){
var combineLatest_support_1 = require('./combineLatest-support');
var Observable_1 = require('../Observable');
/**
 * Takes an Observable of Observables, and collects all observables from it. Once the outer observable
 * completes, it subscribes to all collected observables and "combines" their values, such that:
 *  - every time an observable emits, the returned observable emits
 *  - when the returned observable emits, it emits all of the most recent values by:
 *    - if a `project` function is provided, it is called with each recent value from each observable in whatever order they arrived,
 *      and the result of the `project` function is what is emitted by the returned observable
 *    - if there is no `project` function, an array of all of the most recent values is emitted by the returned observable.
 * @param {function} [project] an optional function to map the most recent values from each observable into a new result. Takes each of the
 *   most recent values from each collected observable as arguments, in order.
 * @returns {Observable} an observable of projected results or arrays of recent values.
 */
function combineAll(project) {
    return this.lift(new combineLatest_support_1.CombineLatestOperator(project));
}
exports.combineAll = combineAll;
Observable_1.Observable.prototype.combineAll = combineAll;

},{"../Observable":3,"./combineLatest-support":35}],34:[function(require,module,exports){
var Observable_1 = require('../Observable');
var fromArray_1 = require('../observable/fromArray');
var combineLatest_support_1 = require('./combineLatest-support');
var isScheduler_1 = require('../util/isScheduler');
var isArray_1 = require('../util/isArray');
/**
 * Combines the values from observables passed as arguments. This is done by subscribing
 * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
 * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
 * value of that, or just emitting the array of recent values directly if there is no `project` function.
 * @param {...Observable} observables the observables to combine
 * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
 * @returns {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
 * the most recent values from each observable.
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    var scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return new fromArray_1.ArrayObservable(observables, scheduler).lift(new combineLatest_support_1.CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
Observable_1.Observable.combineLatest = combineLatest;

},{"../Observable":3,"../observable/fromArray":17,"../util/isArray":137,"../util/isScheduler":141,"./combineLatest-support":35}],35:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber) {
        return new CombineLatestSubscriber(subscriber, this.project);
    };
    return CombineLatestOperator;
})();
exports.CombineLatestOperator = CombineLatestOperator;
var CombineLatestSubscriber = (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
        this.toRespond = [];
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        var toRespond = this.toRespond;
        toRespond.push(toRespond.length);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (innerSubscriber) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (observable, value, outerIndex, innerIndex) {
        var values = this.values;
        values[outerIndex] = value;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
        if (toRespond.length === 0) {
            var project = this.project;
            var destination = this.destination;
            if (project) {
                var result = tryCatch_1.tryCatch(project).apply(this, values);
                if (result === errorObject_1.errorObject) {
                    destination.error(errorObject_1.errorObject.e);
                }
                else {
                    destination.next(result);
                }
            }
            else {
                destination.next(values);
            }
        }
    };
    return CombineLatestSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
exports.CombineLatestSubscriber = CombineLatestSubscriber;

},{"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],36:[function(require,module,exports){
var Observable_1 = require('../Observable');
var fromArray_1 = require('../observable/fromArray');
var combineLatest_support_1 = require('./combineLatest-support');
var isArray_1 = require('../util/isArray');
/**
 * Combines the values from this observable with values from observables passed as arguments. This is done by subscribing
 * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
 * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
 * value of that, or just emitting the array of recent values directly if there is no `project` function.
 * @param {...Observable} observables the observables to combine the source with
 * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
 * @returns {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
 * the most recent values from each observable.
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    observables.unshift(this);
    return new fromArray_1.ArrayObservable(observables).lift(new combineLatest_support_1.CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
Observable_1.Observable.prototype.combineLatest = combineLatest;

},{"../Observable":3,"../observable/fromArray":17,"../util/isArray":137,"./combineLatest-support":35}],37:[function(require,module,exports){
var Observable_1 = require('../Observable');
var immediate_1 = require('../schedulers/immediate');
var mergeAll_support_1 = require('./mergeAll-support');
var fromArray_1 = require('../observable/fromArray');
var isScheduler_1 = require('../util/isScheduler');
/**
 * Joins multiple observables together by subscribing to them one at a time and merging their results
 * into the returned observable. Will wait for each observable to complete before moving on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var scheduler = immediate_1.immediate;
    var args = observables;
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
        scheduler = args.pop();
    }
    return new fromArray_1.ArrayObservable(observables, scheduler).lift(new mergeAll_support_1.MergeAllOperator(1));
}
exports.concat = concat;
Observable_1.Observable.concat = concat;

},{"../Observable":3,"../observable/fromArray":17,"../schedulers/immediate":122,"../util/isScheduler":141,"./mergeAll-support":65}],38:[function(require,module,exports){
var Observable_1 = require('../Observable');
var isScheduler_1 = require('../util/isScheduler');
var fromArray_1 = require('../observable/fromArray');
var mergeAll_support_1 = require('./mergeAll-support');
/**
 * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
 * and merging their results into the returned observable. Will wait for each observable to complete before moving
 * on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var args = observables;
    args.unshift(this);
    var scheduler = null;
    if (isScheduler_1.isScheduler(args[args.length - 1])) {
        scheduler = args.pop();
    }
    return new fromArray_1.ArrayObservable(args, scheduler).lift(new mergeAll_support_1.MergeAllOperator(1));
}
exports.concat = concat;
Observable_1.Observable.prototype.concat = concat;

},{"../Observable":3,"../observable/fromArray":17,"../util/isScheduler":141,"./mergeAll-support":65}],39:[function(require,module,exports){
var Observable_1 = require('../Observable');
var mergeAll_support_1 = require('./mergeAll-support');
/**
 * Joins every Observable emitted by the source (an Observable of Observables), in a serial
 * fashion. Subscribing to each one only when the previous one has completed, and merging
 * all of their values into the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and endlessly, and the
 * Observables it emits generally complete slower than the source emits, you can run into
 * memory issues as the incoming observables collect in an unbounded buffer.
 *
 * @returns {Observable} an observable of values merged from the incoming observables.
 */
function concatAll() {
    return this.lift(new mergeAll_support_1.MergeAllOperator(1));
}
exports.concatAll = concatAll;
Observable_1.Observable.prototype.concatAll = concatAll;

},{"../Observable":3,"./mergeAll-support":65}],40:[function(require,module,exports){
var Observable_1 = require('../Observable');
var mergeMap_support_1 = require('./mergeMap-support');
/**
 * Maps values from the source observable into new Observables, then merges them in a serialized fashion,
 * waiting for each one to complete before merging the next.
 *
 * __Warning:__ if incoming values arrive endlessly and faster than the observables they're being mapped
 * to can complete, it will result in memory issues as created observables amass in an unbounded buffer
 * waiting for their turn to be subscribed to.
 *
 * @param {function} project a function to map incoming values into Observables to be concatenated. accepts
 * the `value` and the `index` as arguments.
 * @param {function} [projectResult] an optional result selector that is applied to values before they're
 * merged into the returned observable. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @returns {Observable} an observable of values merged from the projected Observables as they were subscribed to,
 * one at a time. Optionally, these values may have been projected from a passed `projectResult` argument.
 */
function concatMap(project, projectResult) {
    return this.lift(new mergeMap_support_1.MergeMapOperator(project, projectResult, 1));
}
exports.concatMap = concatMap;
Observable_1.Observable.prototype.concatMap = concatMap;

},{"../Observable":3,"./mergeMap-support":67}],41:[function(require,module,exports){
var Observable_1 = require('../Observable');
var mergeMapTo_support_1 = require('./mergeMapTo-support');
/**
 * Maps values from the source to a specific observable, and merges them together in a serialized fashion.
 *
 * @param {Observable} observable the observable to map each source value to
 * @param {function} [projectResult] an optional result selector that is applied to values before they're
 * merged into the returned observable. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @returns {Observable} an observable of values merged together by joining the passed observable
 * with itself, one after the other, for each value emitted from the source.
 */
function concatMapTo(observable, projectResult) {
    return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, projectResult, 1));
}
exports.concatMapTo = concatMapTo;
Observable_1.Observable.prototype.concatMapTo = concatMapTo;

},{"../Observable":3,"./mergeMapTo-support":69}],42:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
/**
 * Returns an observable of a single number that represents the number of items that either:
 * Match a provided predicate function, _or_ if a predicate is not provided, the number
 * represents the total count of all items in the source observable. The count is emitted
 * by the returned observable when the source observable completes.
 * @param {function} [predicate] a boolean function to select what values are to be counted.
 * it is provided with arguments of:
 *   - `value`: the value from the source observable
 *   - `index`: the "index" of the value from the source observable
 *   - `source`: the source observable instance itself.
 * @param {any} [thisArg] the optional `this` context to use in the `predicate` function
 * @returns {Observable} an observable of one number that represents the count as described
 * above
 */
function count(predicate, thisArg) {
    return this.lift(new CountOperator(predicate, thisArg, this));
}
exports.count = count;
var CountOperator = (function () {
    function CountOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber) {
        return new CountSubscriber(subscriber, this.predicate, this.thisArg, this.source);
    };
    return CountOperator;
})();
var CountSubscriber = (function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.count = 0;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = bindCallback_1.bindCallback(predicate, thisArg, 3);
        }
    }
    CountSubscriber.prototype._next = function (value) {
        var predicate = this.predicate;
        var passed = true;
        if (predicate) {
            passed = tryCatch_1.tryCatch(predicate)(value, this.index++, this.source);
            if (passed === errorObject_1.errorObject) {
                this.destination.error(passed.e);
                return;
            }
        }
        if (passed) {
            this.count += 1;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.count = count;

},{"../Observable":3,"../Subscriber":7,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],43:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var fromPromise_1 = require('../observable/fromPromise');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var isPromise_1 = require('../util/isPromise');
var errorObject_1 = require('../util/errorObject');
function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
}
exports.debounce = debounce;
var DebounceOperator = (function () {
    function DebounceOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    DebounceOperator.prototype.call = function (observer) {
        return new DebounceSubscriber(observer, this.durationSelector);
    };
    return DebounceOperator;
})();
var DebounceSubscriber = (function (_super) {
    __extends(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this._index = 0;
    }
    Object.defineProperty(DebounceSubscriber.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    DebounceSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var currentIndex = ++this._index;
        var debounce = tryCatch_1.tryCatch(this.durationSelector)(value);
        if (debounce === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
        }
        else {
            if (isPromise_1.isPromise(debounce)) {
                debounce = fromPromise_1.PromiseObservable.create(debounce);
            }
            this.lastValue = value;
            this.clearDebounce();
            this.add(this.debouncedSubscription = debounce._subscribe(new DurationSelectorSubscriber(this, currentIndex)));
        }
    };
    DebounceSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.lastValue != null) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
        }
    };
    DebounceSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription) {
            debouncedSubscription.unsubscribe();
            this.remove(debouncedSubscription);
            this.debouncedSubscription = null;
        }
    };
    return DebounceSubscriber;
})(Subscriber_1.Subscriber);
var DurationSelectorSubscriber = (function (_super) {
    __extends(DurationSelectorSubscriber, _super);
    function DurationSelectorSubscriber(parent, currentIndex) {
        _super.call(this, null);
        this.parent = parent;
        this.currentIndex = currentIndex;
    }
    DurationSelectorSubscriber.prototype.debounceNext = function () {
        var parent = this.parent;
        if (this.currentIndex === parent.index) {
            parent.debouncedNext();
            if (!this.isUnsubscribed) {
                this.unsubscribe();
            }
        }
    };
    DurationSelectorSubscriber.prototype._next = function (unused) {
        this.debounceNext();
    };
    DurationSelectorSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    DurationSelectorSubscriber.prototype._complete = function () {
        this.debounceNext();
    };
    return DurationSelectorSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.debounce = debounce;

},{"../Observable":3,"../Subscriber":7,"../observable/fromPromise":21,"../util/errorObject":136,"../util/isPromise":140,"../util/tryCatch":147}],44:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var nextTick_1 = require('../schedulers/nextTick');
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber) {
        return new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler);
    };
    return DebounceTimeOperator;
})();
var DebounceTimeSubscriber = (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.lastValue != null) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
})(Subscriber_1.Subscriber);
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
Observable_1.Observable.prototype.debounceTime = debounceTime;

},{"../Observable":3,"../Subscriber":7,"../schedulers/nextTick":123}],45:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}
exports.defaultIfEmpty = defaultIfEmpty;
var DefaultIfEmptyOperator = (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber) {
        return new DefaultIfEmptySubscriber(subscriber, this.defaultValue);
    };
    return DefaultIfEmptyOperator;
})();
var DefaultIfEmptySubscriber = (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        _super.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    DefaultIfEmptySubscriber.prototype._next = function (x) {
        this.isEmpty = false;
        this.destination.next(x);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty;

},{"../Observable":3,"../Subscriber":7}],46:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var Notification_1 = require('../Notification');
var immediate_1 = require('../schedulers/immediate');
var isDate_1 = require('../util/isDate');
function delay(delay, scheduler) {
    if (scheduler === void 0) { scheduler = immediate_1.immediate; }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : delay;
    return this.lift(new DelayOperator(delayFor, scheduler));
}
exports.delay = delay;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber) {
        return new DelaySubscriber(subscriber, this.delay, this.scheduler);
    };
    return DelayOperator;
})();
var DelaySubscriber = (function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
})(Subscriber_1.Subscriber);
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
})();
Observable_1.Observable.prototype.delay = delay;

},{"../Notification":2,"../Observable":3,"../Subscriber":7,"../schedulers/immediate":122,"../util/isDate":138}],47:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}
exports.dematerialize = dematerialize;
var DeMaterializeOperator = (function () {
    function DeMaterializeOperator() {
    }
    DeMaterializeOperator.prototype.call = function (subscriber) {
        return new DeMaterializeSubscriber(subscriber);
    };
    return DeMaterializeOperator;
})();
var DeMaterializeSubscriber = (function (_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
        _super.call(this, destination);
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.dematerialize = dematerialize;

},{"../Observable":3,"../Subscriber":7}],48:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
function distinctUntilChanged(compare, thisArg) {
    return this.lift(new DistinctUntilChangedOperator(thisArg ?
        bindCallback_1.bindCallback(compare, thisArg, 2) :
        compare));
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare) {
        this.compare = compare;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber) {
        return new DistinctUntilChangedSubscriber(subscriber, this.compare);
    };
    return DistinctUntilChangedOperator;
})();
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare) {
        _super.call(this, destination);
        this.hasValue = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (x) {
        var result = false;
        if (this.hasValue) {
            result = tryCatch_1.tryCatch(this.compare)(this.value, x);
            if (result === errorObject_1.errorObject) {
                this.destination.error(errorObject_1.errorObject.e);
                return;
            }
        }
        else {
            this.hasValue = true;
        }
        if (Boolean(result) === false) {
            this.value = x;
            this.destination.next(x);
        }
    };
    return DistinctUntilChangedSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged;

},{"../Observable":3,"../Subscriber":7,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],49:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var noop_1 = require('../util/noop');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
function _do(nextOrObserver, error, complete) {
    var next;
    if (nextOrObserver && typeof nextOrObserver === 'object') {
        next = nextOrObserver.next;
        error = nextOrObserver.error;
        complete = nextOrObserver.complete;
    }
    else {
        next = nextOrObserver;
    }
    return this.lift(new DoOperator(next || noop_1.noop, error || noop_1.noop, complete || noop_1.noop));
}
exports._do = _do;
var DoOperator = (function () {
    function DoOperator(next, error, complete) {
        this.next = next;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber) {
        return new DoSubscriber(subscriber, this.next, this.error, this.complete);
    };
    return DoOperator;
})();
var DoSubscriber = (function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, next, error, complete) {
        _super.call(this, destination);
        this.__next = next;
        this.__error = error;
        this.__complete = complete;
    }
    DoSubscriber.prototype._next = function (x) {
        var result = tryCatch_1.tryCatch(this.__next)(x);
        if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
        }
        else {
            this.destination.next(x);
        }
    };
    DoSubscriber.prototype._error = function (e) {
        var result = tryCatch_1.tryCatch(this.__error)(e);
        if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
        }
        else {
            this.destination.error(e);
        }
    };
    DoSubscriber.prototype._complete = function () {
        var result = tryCatch_1.tryCatch(this.__complete)();
        if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
        }
        else {
            this.destination.complete();
        }
    };
    return DoSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.do = _do;

},{"../Observable":3,"../Subscriber":7,"../util/errorObject":136,"../util/noop":142,"../util/tryCatch":147}],50:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var ScalarObservable_1 = require('../observable/ScalarObservable');
var fromArray_1 = require('../observable/fromArray');
var throw_1 = require('../observable/throw');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
function every(predicate, thisArg) {
    var source = this;
    var result;
    if (source._isScalar) {
        result = tryCatch_1.tryCatch(predicate)(source.value, 0, source);
        if (result === errorObject_1.errorObject) {
            return new throw_1.ErrorObservable(errorObject_1.errorObject.e, source.scheduler);
        }
        else {
            return new ScalarObservable_1.ScalarObservable(result, source.scheduler);
        }
    }
    if (source instanceof fromArray_1.ArrayObservable) {
        var array = source.array;
        var result_1 = tryCatch_1.tryCatch(function (array, predicate) { return array.every(predicate); })(array, predicate);
        if (result_1 === errorObject_1.errorObject) {
            return new throw_1.ErrorObservable(errorObject_1.errorObject.e, source.scheduler);
        }
        else {
            return new ScalarObservable_1.ScalarObservable(result_1, source.scheduler);
        }
    }
    return source.lift(new EveryOperator(predicate, thisArg, source));
}
exports.every = every;
var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer) {
        return new EverySubscriber(observer, this.predicate, this.thisArg, this.source);
    };
    return EveryOperator;
})();
var EverySubscriber = (function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.predicate = undefined;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = bindCallback_1.bindCallback(predicate, thisArg, 3);
        }
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var predicate = this.predicate;
        if (predicate === undefined) {
            this.destination.error(new TypeError('predicate must be a function'));
        }
        var result = tryCatch_1.tryCatch(predicate)(value, this.index++, this.source);
        if (result === errorObject_1.errorObject) {
            this.destination.error(result.e);
        }
        else if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.every = every;

},{"../Observable":3,"../Subscriber":7,"../observable/ScalarObservable":11,"../observable/fromArray":17,"../observable/throw":25,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],51:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
var ExpandOperator = (function () {
    function ExpandOperator(project, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.concurrent = concurrent;
    }
    ExpandOperator.prototype.call = function (subscriber) {
        return new ExpandSubscriber(subscriber, this.project, this.concurrent);
    };
    return ExpandOperator;
})();
exports.ExpandOperator = ExpandOperator;
var ExpandSubscriber = (function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.isUnsubscribed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            var result = tryCatch_1.tryCatch(this.project)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(result.e);
            }
            else {
                if (result._isScalar) {
                    this._next(result.value);
                }
                else {
                    this.active++;
                    this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
                }
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this._next(innerValue);
    };
    return ExpandSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
exports.ExpandSubscriber = ExpandSubscriber;

},{"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],52:[function(require,module,exports){
var Observable_1 = require('../Observable');
var expand_support_1 = require('./expand-support');
function expand(project, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new expand_support_1.ExpandOperator(project, concurrent));
}
exports.expand = expand;
Observable_1.Observable.prototype.expand = expand;

},{"../Observable":3,"./expand-support":51}],53:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
/**
 * Similar to the well-known `Array.prototype.filter` method, this operator filters values down to a set
 * allowed by a `select` function
 *
 * @param {Function} select a function that is used to select the resulting values
 *  if it returns `true`, the value is emitted, if `false` the value is not passed to the resulting observable
 * @param {any} [thisArg] an optional argument to determine the value of `this` in the `select` function
 * @returns {Observable} an observable of values allowed by the select function
 */
function filter(select, thisArg) {
    return this.lift(new FilterOperator(select, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(select, thisArg) {
        this.select = bindCallback_1.bindCallback(select, thisArg, 2);
    }
    FilterOperator.prototype.call = function (subscriber) {
        return new FilterSubscriber(subscriber, this.select);
    };
    return FilterOperator;
})();
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, select) {
        _super.call(this, destination);
        this.count = 0;
        this.select = select;
    }
    FilterSubscriber.prototype._next = function (x) {
        var result = tryCatch_1.tryCatch(this.select)(x, this.count++);
        if (result === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
        }
        else if (Boolean(result)) {
            this.destination.next(x);
        }
    };
    return FilterSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.filter = filter;

},{"../Observable":3,"../Subscriber":7,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],54:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var Subscription_1 = require('../Subscription');
var bindCallback_1 = require('../util/bindCallback');
function _finally(finallySelector, thisArg) {
    return this.lift(new FinallyOperator(thisArg ?
        bindCallback_1.bindCallback(finallySelector, thisArg, 2) :
        finallySelector));
}
exports._finally = _finally;
var FinallyOperator = (function () {
    function FinallyOperator(finallySelector) {
        this.finallySelector = finallySelector;
    }
    FinallyOperator.prototype.call = function (subscriber) {
        return new FinallySubscriber(subscriber, this.finallySelector);
    };
    return FinallyOperator;
})();
var FinallySubscriber = (function (_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, finallySelector) {
        _super.call(this, destination);
        this.add(new Subscription_1.Subscription(finallySelector));
    }
    return FinallySubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.finally = _finally;

},{"../Observable":3,"../Subscriber":7,"../Subscription":8,"../util/bindCallback":135}],55:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var EmptyError_1 = require('../util/EmptyError');
function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}
exports.first = first;
var FirstOperator = (function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    FirstOperator.prototype.call = function (observer) {
        return new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
    };
    return FirstOperator;
})();
var FirstSubscriber = (function (_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
    }
    FirstSubscriber.prototype._next = function (value) {
        var _a = this, destination = _a.destination, predicate = _a.predicate, resultSelector = _a.resultSelector;
        var index = this.index++;
        var passed = true;
        if (predicate) {
            passed = tryCatch_1.tryCatch(predicate)(value, index, this.source);
            if (passed === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
                return;
            }
        }
        if (passed) {
            if (resultSelector) {
                var result = tryCatch_1.tryCatch(resultSelector)(value, index);
                if (result === errorObject_1.errorObject) {
                    destination.error(errorObject_1.errorObject.e);
                    return;
                }
                destination.next(result);
            }
            else {
                destination.next(value);
            }
            destination.complete();
            this.hasCompleted = true;
        }
    };
    FirstSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return FirstSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.first = first;

},{"../Observable":3,"../Subscriber":7,"../util/EmptyError":128,"../util/errorObject":136,"../util/tryCatch":147}],56:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = require('../Subscription');
var Observable_1 = require('../Observable');
var RefCountSubscription = (function (_super) {
    __extends(RefCountSubscription, _super);
    function RefCountSubscription() {
        _super.call(this);
        this.attemptedToUnsubscribePrimary = false;
        this.count = 0;
    }
    RefCountSubscription.prototype.setPrimary = function (subscription) {
        this.primary = subscription;
    };
    RefCountSubscription.prototype.unsubscribe = function () {
        if (!this.isUnsubscribed && !this.attemptedToUnsubscribePrimary) {
            this.attemptedToUnsubscribePrimary = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
                this.primary.unsubscribe();
            }
        }
    };
    return RefCountSubscription;
})(Subscription_1.Subscription);
exports.RefCountSubscription = RefCountSubscription;
var GroupedObservable = (function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        _super.call(this);
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription_1.Subscription();
        if (this.refCountSubscription && !this.refCountSubscription.isUnsubscribed) {
            subscription.add(new InnerRefCountSubscription(this.refCountSubscription));
        }
        subscription.add(this.groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
})(Observable_1.Observable);
exports.GroupedObservable = GroupedObservable;
var InnerRefCountSubscription = (function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        _super.call(this);
        this.parent = parent;
        parent.count++;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        if (!this.parent.isUnsubscribed && !this.isUnsubscribed) {
            _super.prototype.unsubscribe.call(this);
            this.parent.count--;
            if (this.parent.count === 0 && this.parent.attemptedToUnsubscribePrimary) {
                this.parent.unsubscribe();
                this.parent.primary.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
})(Subscription_1.Subscription);
exports.InnerRefCountSubscription = InnerRefCountSubscription;

},{"../Observable":3,"../Subscription":8}],57:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subject_1 = require('../Subject');
var Map_1 = require('../util/Map');
var FastMap_1 = require('../util/FastMap');
var groupBy_support_1 = require('./groupBy-support');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
function groupBy(keySelector, elementSelector, durationSelector) {
    return new GroupByObservable(this, keySelector, elementSelector, durationSelector);
}
exports.groupBy = groupBy;
var GroupByObservable = (function (_super) {
    __extends(GroupByObservable, _super);
    function GroupByObservable(source, keySelector, elementSelector, durationSelector) {
        _super.call(this);
        this.source = source;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
    }
    GroupByObservable.prototype._subscribe = function (subscriber) {
        var refCountSubscription = new groupBy_support_1.RefCountSubscription();
        var groupBySubscriber = new GroupBySubscriber(subscriber, refCountSubscription, this.keySelector, this.elementSelector, this.durationSelector);
        refCountSubscription.setPrimary(this.source.subscribe(groupBySubscriber));
        return refCountSubscription;
    };
    return GroupByObservable;
})(Observable_1.Observable);
exports.GroupByObservable = GroupByObservable;
var GroupBySubscriber = (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, refCountSubscription, keySelector, elementSelector, durationSelector) {
        _super.call(this);
        this.refCountSubscription = refCountSubscription;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.groups = null;
        this.destination = destination;
        this.add(destination);
    }
    GroupBySubscriber.prototype._next = function (x) {
        var key = tryCatch_1.tryCatch(this.keySelector)(x);
        if (key === errorObject_1.errorObject) {
            this.error(key.e);
        }
        else {
            var groups = this.groups;
            var elementSelector = this.elementSelector;
            var durationSelector = this.durationSelector;
            if (!groups) {
                groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
            }
            var group = groups.get(key);
            if (!group) {
                groups.set(key, group = new Subject_1.Subject());
                var groupedObservable = new groupBy_support_1.GroupedObservable(key, group, this.refCountSubscription);
                if (durationSelector) {
                    var duration = tryCatch_1.tryCatch(durationSelector)(new groupBy_support_1.GroupedObservable(key, group));
                    if (duration === errorObject_1.errorObject) {
                        this.error(duration.e);
                    }
                    else {
                        this.add(duration._subscribe(new GroupDurationSubscriber(key, group, this)));
                    }
                }
                this.destination.next(groupedObservable);
            }
            if (elementSelector) {
                var value = tryCatch_1.tryCatch(elementSelector)(x);
                if (value === errorObject_1.errorObject) {
                    this.error(value.e);
                }
                else {
                    group.next(value);
                }
            }
            else {
                group.next(x);
            }
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var _this = this;
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
                _this.removeGroup(key);
            });
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var _this = this;
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
                _this.removeGroup(group);
            });
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    return GroupBySubscriber;
})(Subscriber_1.Subscriber);
var GroupDurationSubscriber = (function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        _super.call(this, null);
        this.key = key;
        this.group = group;
        this.parent = parent;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.group.complete();
        this.parent.removeGroup(this.key);
    };
    GroupDurationSubscriber.prototype._error = function (err) {
        this.group.error(err);
        this.parent.removeGroup(this.key);
    };
    GroupDurationSubscriber.prototype._complete = function () {
        this.group.complete();
        this.parent.removeGroup(this.key);
    };
    return GroupDurationSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.groupBy = groupBy;

},{"../Observable":3,"../Subject":6,"../Subscriber":7,"../util/FastMap":129,"../util/Map":131,"../util/errorObject":136,"../util/tryCatch":147,"./groupBy-support":56}],58:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var noop_1 = require('../util/noop');
function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
exports.ignoreElements = ignoreElements;
;
var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
    }
    IgnoreElementsOperator.prototype.call = function (subscriber) {
        return new IgnoreElementsSubscriber(subscriber);
    };
    return IgnoreElementsOperator;
})();
var IgnoreElementsSubscriber = (function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        _super.apply(this, arguments);
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
        noop_1.noop();
    };
    return IgnoreElementsSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.ignoreElements = ignoreElements;

},{"../Observable":3,"../Subscriber":7,"../util/noop":142}],59:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var EmptyError_1 = require('../util/EmptyError');
function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}
exports.last = last;
var LastOperator = (function () {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    LastOperator.prototype.call = function (observer) {
        return new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
    };
    return LastOperator;
})();
var LastSubscriber = (function (_super) {
    __extends(LastSubscriber, _super);
    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            this.lastValue = defaultValue;
            this.hasValue = true;
        }
    }
    LastSubscriber.prototype._next = function (value) {
        var _a = this, predicate = _a.predicate, resultSelector = _a.resultSelector, destination = _a.destination;
        var index = this.index++;
        if (predicate) {
            var found = tryCatch_1.tryCatch(predicate)(value, index, this.source);
            if (found === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
                return;
            }
            if (found) {
                if (resultSelector) {
                    var result = tryCatch_1.tryCatch(resultSelector)(value, index);
                    if (result === errorObject_1.errorObject) {
                        destination.error(errorObject_1.errorObject.e);
                        return;
                    }
                    this.lastValue = result;
                }
                else {
                    this.lastValue = value;
                }
                this.hasValue = true;
            }
        }
        else {
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return LastSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.last = last;

},{"../Observable":3,"../Subscriber":7,"../util/EmptyError":128,"../util/errorObject":136,"../util/tryCatch":147}],60:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
/**
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the returned observable
 *
 * @param {Function} project the function to create projection
 * @param {any} [thisArg] an optional argument to define what `this` is in the project function
 * @returns {Observable} a observable of projected values
 */
function map(project, thisArg) {
    return this.lift(new MapOperator(project, thisArg));
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = bindCallback_1.bindCallback(project, thisArg, 2);
    }
    MapOperator.prototype.call = function (subscriber) {
        return new MapSubscriber(subscriber, this.project);
    };
    return MapOperator;
})();
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project) {
        _super.call(this, destination);
        this.count = 0;
        this.project = project;
    }
    MapSubscriber.prototype._next = function (x) {
        var result = tryCatch_1.tryCatch(this.project)(x, this.count++);
        if (result === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            this.destination.next(result);
        }
    };
    return MapSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.map = map;

},{"../Observable":3,"../Subscriber":7,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],61:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
/**
 * Maps every value to the same value every time.
 * @param {any} value the value to map each incoming value to
 * @returns {Observable} an observable of the passed value that emits everytime the source does
 */
function mapTo(value) {
    return this.lift(new MapToOperator(value));
}
exports.mapTo = mapTo;
var MapToOperator = (function () {
    function MapToOperator(value) {
        this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber) {
        return new MapToSubscriber(subscriber, this.value);
    };
    return MapToOperator;
})();
var MapToSubscriber = (function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        _super.call(this, destination);
        this.value = value;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.mapTo = mapTo;

},{"../Observable":3,"../Subscriber":7}],62:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var Notification_1 = require('../Notification');
function materialize() {
    return this.lift(new MaterializeOperator());
}
exports.materialize = materialize;
var MaterializeOperator = (function () {
    function MaterializeOperator() {
    }
    MaterializeOperator.prototype.call = function (subscriber) {
        return new MaterializeSubscriber(subscriber);
    };
    return MaterializeOperator;
})();
var MaterializeSubscriber = (function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        _super.call(this, destination);
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification_1.Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.materialize = materialize;

},{"../Notification":2,"../Observable":3,"../Subscriber":7}],63:[function(require,module,exports){
var Observable_1 = require('../Observable');
var fromArray_1 = require('../observable/fromArray');
var mergeAll_support_1 = require('./mergeAll-support');
var immediate_1 = require('../schedulers/immediate');
var isScheduler_1 = require('../util/isScheduler');
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = immediate_1.immediate;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (observables.length === 1) {
        return observables[0];
    }
    return new fromArray_1.ArrayObservable(observables, scheduler).lift(new mergeAll_support_1.MergeAllOperator(concurrent));
}
exports.merge = merge;
Observable_1.Observable.merge = merge;

},{"../Observable":3,"../observable/fromArray":17,"../schedulers/immediate":122,"../util/isScheduler":141,"./mergeAll-support":65}],64:[function(require,module,exports){
var Observable_1 = require('../Observable');
var merge_static_1 = require('./merge-static');
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return merge_static_1.merge.apply(this, observables);
}
exports.merge = merge;
Observable_1.Observable.prototype.merge = merge;

},{"../Observable":3,"./merge-static":63}],65:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
var MergeAllOperator = (function () {
    function MergeAllOperator(concurrent) {
        this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function (observer) {
        return new MergeAllSubscriber(observer, this.concurrent);
    };
    return MergeAllOperator;
})();
exports.MergeAllOperator = MergeAllOperator;
var MergeAllSubscriber = (function (_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
        _super.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function (observable) {
        if (this.active < this.concurrent) {
            if (observable._isScalar) {
                this.destination.next(observable.value);
            }
            else {
                this.active++;
                this.add(subscribeToResult_1.subscribeToResult(this, observable));
            }
        }
        else {
            this.buffer.push(observable);
        }
    };
    MergeAllSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeAllSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
exports.MergeAllSubscriber = MergeAllSubscriber;

},{"../OuterSubscriber":4,"../util/subscribeToResult":145}],66:[function(require,module,exports){
var Observable_1 = require('../Observable');
var mergeAll_support_1 = require('./mergeAll-support');
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new mergeAll_support_1.MergeAllOperator(concurrent));
}
exports.mergeAll = mergeAll;
Observable_1.Observable.prototype.mergeAll = mergeAll;

},{"../Observable":3,"./mergeAll-support":65}],67:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var subscribeToResult_1 = require('../util/subscribeToResult');
var OuterSubscriber_1 = require('../OuterSubscriber');
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer) {
        return new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent);
    };
    return MergeMapOperator;
})();
exports.MergeMapOperator = MergeMapOperator;
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var index = this.index++;
            var ish = tryCatch_1.tryCatch(this.project)(value, index);
            var destination = this.destination;
            if (ish === errorObject_1.errorObject) {
                destination.error(ish.e);
            }
            else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, destination = _a.destination, resultSelector = _a.resultSelector;
        if (resultSelector) {
            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                destination.next(result);
            }
        }
        else {
            destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
exports.MergeMapSubscriber = MergeMapSubscriber;

},{"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],68:[function(require,module,exports){
var Observable_1 = require('../Observable');
var mergeMap_support_1 = require('./mergeMap-support');
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new mergeMap_support_1.MergeMapOperator(project, resultSelector, concurrent));
}
exports.mergeMap = mergeMap;
Observable_1.Observable.prototype.mergeMap = mergeMap;
Observable_1.Observable.prototype.flatMap = mergeMap;

},{"../Observable":3,"./mergeMap-support":67}],69:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
var MergeMapToOperator = (function () {
    function MergeMapToOperator(ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapToOperator.prototype.call = function (observer) {
        return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
    };
    return MergeMapToOperator;
})();
exports.MergeMapToOperator = MergeMapToOperator;
var MergeMapToSubscriber = (function (_super) {
    __extends(MergeMapToSubscriber, _super);
    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapToSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var resultSelector = this.resultSelector;
            var index = this.index++;
            var ish = this.ish;
            var destination = this.destination;
            this.active++;
            this._innerSub(ish, destination, resultSelector, value, index);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapToSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                destination.next(result);
            }
        }
        else {
            destination.next(innerValue);
        }
    };
    MergeMapToSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapToSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
exports.MergeMapToSubscriber = MergeMapToSubscriber;

},{"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],70:[function(require,module,exports){
var Observable_1 = require('../Observable');
var mergeMapTo_support_1 = require('./mergeMapTo-support');
function mergeMapTo(observable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, resultSelector, concurrent));
}
exports.mergeMapTo = mergeMapTo;
Observable_1.Observable.prototype.mergeMapTo = mergeMapTo;

},{"../Observable":3,"./mergeMapTo-support":69}],71:[function(require,module,exports){
var Observable_1 = require('../Observable');
var ConnectableObservable_1 = require('../observable/ConnectableObservable');
function multicast(subjectOrSubjectFactory) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
    }
    else {
        subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
        };
    }
    return new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
}
exports.multicast = multicast;
Observable_1.Observable.prototype.multicast = multicast;

},{"../Observable":3,"../observable/ConnectableObservable":9}],72:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Notification_1 = require('../Notification');
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber) {
        return new ObserveOnSubscriber(subscriber, this.scheduler, this.delay);
    };
    return ObserveOnOperator;
})();
exports.ObserveOnOperator = ObserveOnOperator;
var ObserveOnSubscriber = (function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (_a) {
        var notification = _a.notification, destination = _a.destination;
        notification.observe(destination);
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
})(Subscriber_1.Subscriber);
exports.ObserveOnSubscriber = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
})();

},{"../Notification":2,"../Subscriber":7}],73:[function(require,module,exports){
var Observable_1 = require('../Observable');
var observeOn_support_1 = require('./observeOn-support');
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return this.lift(new observeOn_support_1.ObserveOnOperator(scheduler, delay));
}
exports.observeOn = observeOn;
Observable_1.Observable.prototype.observeOn = observeOn;

},{"../Observable":3,"./observeOn-support":72}],74:[function(require,module,exports){
var not_1 = require('../util/not');
var filter_1 = require('./filter');
var Observable_1 = require('../Observable');
function partition(predicate, thisArg) {
    return [
        filter_1.filter.call(this, predicate),
        filter_1.filter.call(this, not_1.not(predicate, thisArg))
    ];
}
exports.partition = partition;
Observable_1.Observable.prototype.partition = partition;

},{"../Observable":3,"../util/not":143,"./filter":53}],75:[function(require,module,exports){
var Subject_1 = require('../Subject');
var Observable_1 = require('../Observable');
var multicast_1 = require('./multicast');
function publish() {
    return multicast_1.multicast.call(this, new Subject_1.Subject());
}
exports.publish = publish;
Observable_1.Observable.prototype.publish = publish;

},{"../Observable":3,"../Subject":6,"./multicast":71}],76:[function(require,module,exports){
var BehaviorSubject_1 = require('../subjects/BehaviorSubject');
var Observable_1 = require('../Observable');
var multicast_1 = require('./multicast');
function publishBehavior(value) {
    return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
}
exports.publishBehavior = publishBehavior;
Observable_1.Observable.prototype.publishBehavior = publishBehavior;

},{"../Observable":3,"../subjects/BehaviorSubject":124,"./multicast":71}],77:[function(require,module,exports){
var ReplaySubject_1 = require('../subjects/ReplaySubject');
var Observable_1 = require('../Observable');
var multicast_1 = require('./multicast');
function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
}
exports.publishReplay = publishReplay;
Observable_1.Observable.prototype.publishReplay = publishReplay;

},{"../Observable":3,"../subjects/ReplaySubject":125,"./multicast":71}],78:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var ReduceOperator = (function () {
    function ReduceOperator(project, seed) {
        this.project = project;
        this.seed = seed;
    }
    ReduceOperator.prototype.call = function (subscriber) {
        return new ReduceSubscriber(subscriber, this.project, this.seed);
    };
    return ReduceOperator;
})();
exports.ReduceOperator = ReduceOperator;
var ReduceSubscriber = (function (_super) {
    __extends(ReduceSubscriber, _super);
    function ReduceSubscriber(destination, project, seed) {
        _super.call(this, destination);
        this.hasValue = false;
        this.acc = seed;
        this.project = project;
        this.hasSeed = typeof seed !== 'undefined';
    }
    ReduceSubscriber.prototype._next = function (x) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            var result = tryCatch_1.tryCatch(this.project).call(this, this.acc, x);
            if (result === errorObject_1.errorObject) {
                this.destination.error(errorObject_1.errorObject.e);
            }
            else {
                this.acc = result;
            }
        }
        else {
            this.acc = x;
            this.hasValue = true;
        }
    };
    ReduceSubscriber.prototype._complete = function () {
        if (this.hasValue || this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    };
    return ReduceSubscriber;
})(Subscriber_1.Subscriber);
exports.ReduceSubscriber = ReduceSubscriber;

},{"../Subscriber":7,"../util/errorObject":136,"../util/tryCatch":147}],79:[function(require,module,exports){
var Observable_1 = require('../Observable');
var reduce_support_1 = require('./reduce-support');
function reduce(project, seed) {
    return this.lift(new reduce_support_1.ReduceOperator(project, seed));
}
exports.reduce = reduce;
Observable_1.Observable.prototype.reduce = reduce;

},{"../Observable":3,"./reduce-support":78}],80:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var empty_1 = require('../observable/empty');
function repeat(count) {
    if (count === void 0) { count = -1; }
    if (count === 0) {
        return new empty_1.EmptyObservable();
    }
    else {
        return this.lift(new RepeatOperator(count, this));
    }
}
exports.repeat = repeat;
var RepeatOperator = (function () {
    function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber) {
        return new FirstRepeatSubscriber(subscriber, this.count, this.source);
    };
    return RepeatOperator;
})();
var FirstRepeatSubscriber = (function (_super) {
    __extends(FirstRepeatSubscriber, _super);
    function FirstRepeatSubscriber(destination, count, source) {
        _super.call(this, null);
        this.destination = destination;
        this.count = count;
        this.source = source;
        this.lastSubscription = this;
    }
    FirstRepeatSubscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    FirstRepeatSubscriber.prototype._error = function (err) {
        this.destination.error(err);
    };
    FirstRepeatSubscriber.prototype.complete = function () {
        if (!this.isUnsubscribed) {
            this.resubscribe(this.count);
        }
    };
    FirstRepeatSubscriber.prototype.unsubscribe = function () {
        var lastSubscription = this.lastSubscription;
        if (lastSubscription === this) {
            _super.prototype.unsubscribe.call(this);
        }
        else {
            lastSubscription.unsubscribe();
        }
    };
    FirstRepeatSubscriber.prototype.resubscribe = function (count) {
        this.lastSubscription.unsubscribe();
        if (count - 1 === 0) {
            this.destination.complete();
        }
        else {
            var nextSubscriber = new MoreRepeatSubscriber(this, count - 1);
            this.lastSubscription = this.source.subscribe(nextSubscriber);
        }
    };
    return FirstRepeatSubscriber;
})(Subscriber_1.Subscriber);
var MoreRepeatSubscriber = (function (_super) {
    __extends(MoreRepeatSubscriber, _super);
    function MoreRepeatSubscriber(parent, count) {
        _super.call(this, null);
        this.parent = parent;
        this.count = count;
    }
    MoreRepeatSubscriber.prototype._next = function (value) {
        this.parent.destination.next(value);
    };
    MoreRepeatSubscriber.prototype._error = function (err) {
        this.parent.destination.error(err);
    };
    MoreRepeatSubscriber.prototype._complete = function () {
        var count = this.count;
        this.parent.resubscribe(count < 0 ? -1 : count);
    };
    return MoreRepeatSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.repeat = repeat;

},{"../Observable":3,"../Subscriber":7,"../observable/empty":14}],81:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
function retry(count) {
    if (count === void 0) { count = 0; }
    return this.lift(new RetryOperator(count, this));
}
exports.retry = retry;
var RetryOperator = (function () {
    function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RetryOperator.prototype.call = function (subscriber) {
        return new FirstRetrySubscriber(subscriber, this.count, this.source);
    };
    return RetryOperator;
})();
var FirstRetrySubscriber = (function (_super) {
    __extends(FirstRetrySubscriber, _super);
    function FirstRetrySubscriber(destination, count, source) {
        _super.call(this, null);
        this.destination = destination;
        this.count = count;
        this.source = source;
        this.lastSubscription = this;
    }
    FirstRetrySubscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    FirstRetrySubscriber.prototype.error = function (error) {
        if (!this.isUnsubscribed) {
            _super.prototype.unsubscribe.call(this);
            this.resubscribe();
        }
    };
    FirstRetrySubscriber.prototype._complete = function () {
        _super.prototype.unsubscribe.call(this);
        this.destination.complete();
    };
    FirstRetrySubscriber.prototype.unsubscribe = function () {
        var lastSubscription = this.lastSubscription;
        if (lastSubscription === this) {
            _super.prototype.unsubscribe.call(this);
        }
        else {
            lastSubscription.unsubscribe();
        }
    };
    FirstRetrySubscriber.prototype.resubscribe = function (retried) {
        if (retried === void 0) { retried = 0; }
        this.lastSubscription.unsubscribe();
        var nextSubscriber = new RetryMoreSubscriber(this, this.count, retried + 1);
        this.lastSubscription = this.source.subscribe(nextSubscriber);
    };
    return FirstRetrySubscriber;
})(Subscriber_1.Subscriber);
var RetryMoreSubscriber = (function (_super) {
    __extends(RetryMoreSubscriber, _super);
    function RetryMoreSubscriber(parent, count, retried) {
        if (retried === void 0) { retried = 0; }
        _super.call(this, null);
        this.parent = parent;
        this.count = count;
        this.retried = retried;
    }
    RetryMoreSubscriber.prototype._next = function (value) {
        this.parent.destination.next(value);
    };
    RetryMoreSubscriber.prototype._error = function (err) {
        var parent = this.parent;
        var retried = this.retried;
        var count = this.count;
        if (count && retried === count) {
            parent.destination.error(err);
        }
        else {
            parent.resubscribe(retried);
        }
    };
    RetryMoreSubscriber.prototype._complete = function () {
        this.parent.destination.complete();
    };
    return RetryMoreSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.retry = retry;

},{"../Observable":3,"../Subscriber":7}],82:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subject_1 = require('../Subject');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}
exports.retryWhen = retryWhen;
var RetryWhenOperator = (function () {
    function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenOperator.prototype.call = function (subscriber) {
        return new FirstRetryWhenSubscriber(subscriber, this.notifier, this.source);
    };
    return RetryWhenOperator;
})();
var FirstRetryWhenSubscriber = (function (_super) {
    __extends(FirstRetryWhenSubscriber, _super);
    function FirstRetryWhenSubscriber(destination, notifier, source) {
        _super.call(this, null);
        this.destination = destination;
        this.notifier = notifier;
        this.source = source;
        this.lastSubscription = this;
    }
    FirstRetryWhenSubscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    FirstRetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isUnsubscribed) {
            _super.prototype.unsubscribe.call(this);
            if (!this.retryNotifications) {
                this.errors = new Subject_1.Subject();
                var notifications = tryCatch_1.tryCatch(this.notifier).call(this, this.errors);
                if (notifications === errorObject_1.errorObject) {
                    this.destination.error(errorObject_1.errorObject.e);
                }
                else {
                    this.retryNotifications = notifications;
                    var notificationSubscriber = new RetryNotificationSubscriber(this);
                    this.notificationSubscription = notifications.subscribe(notificationSubscriber);
                }
            }
            this.errors.next(err);
        }
    };
    FirstRetryWhenSubscriber.prototype.destinationError = function (err) {
        this.tearDown();
        this.destination.error(err);
    };
    FirstRetryWhenSubscriber.prototype._complete = function () {
        this.destinationComplete();
    };
    FirstRetryWhenSubscriber.prototype.destinationComplete = function () {
        this.tearDown();
        this.destination.complete();
    };
    FirstRetryWhenSubscriber.prototype.unsubscribe = function () {
        var lastSubscription = this.lastSubscription;
        if (lastSubscription === this) {
            _super.prototype.unsubscribe.call(this);
        }
        else {
            this.tearDown();
        }
    };
    FirstRetryWhenSubscriber.prototype.tearDown = function () {
        _super.prototype.unsubscribe.call(this);
        this.lastSubscription.unsubscribe();
        var notificationSubscription = this.notificationSubscription;
        if (notificationSubscription) {
            notificationSubscription.unsubscribe();
        }
    };
    FirstRetryWhenSubscriber.prototype.resubscribe = function () {
        this.lastSubscription.unsubscribe();
        var nextSubscriber = new MoreRetryWhenSubscriber(this);
        this.lastSubscription = this.source.subscribe(nextSubscriber);
    };
    return FirstRetryWhenSubscriber;
})(Subscriber_1.Subscriber);
var MoreRetryWhenSubscriber = (function (_super) {
    __extends(MoreRetryWhenSubscriber, _super);
    function MoreRetryWhenSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    MoreRetryWhenSubscriber.prototype._next = function (value) {
        this.parent.destination.next(value);
    };
    MoreRetryWhenSubscriber.prototype._error = function (err) {
        this.parent.errors.next(err);
    };
    MoreRetryWhenSubscriber.prototype._complete = function () {
        this.parent.destinationComplete();
    };
    return MoreRetryWhenSubscriber;
})(Subscriber_1.Subscriber);
var RetryNotificationSubscriber = (function (_super) {
    __extends(RetryNotificationSubscriber, _super);
    function RetryNotificationSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    RetryNotificationSubscriber.prototype._next = function (value) {
        this.parent.resubscribe();
    };
    RetryNotificationSubscriber.prototype._error = function (err) {
        this.parent.destinationError(err);
    };
    RetryNotificationSubscriber.prototype._complete = function () {
        this.parent.destinationComplete();
    };
    return RetryNotificationSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.retryWhen = retryWhen;

},{"../Observable":3,"../Subject":6,"../Subscriber":7,"../util/errorObject":136,"../util/tryCatch":147}],83:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
}
exports.sample = sample;
var SampleOperator = (function () {
    function SampleOperator(notifier) {
        this.notifier = notifier;
    }
    SampleOperator.prototype.call = function (subscriber) {
        return new SampleSubscriber(subscriber, this.notifier);
    };
    return SampleOperator;
})();
var SampleSubscriber = (function (_super) {
    __extends(SampleSubscriber, _super);
    function SampleSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.hasValue = false;
        this.add(notifier._subscribe(new SampleNotificationSubscriber(this)));
    }
    SampleSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.destination.next(this.lastValue);
        }
    };
    return SampleSubscriber;
})(Subscriber_1.Subscriber);
var SampleNotificationSubscriber = (function (_super) {
    __extends(SampleNotificationSubscriber, _super);
    function SampleNotificationSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    SampleNotificationSubscriber.prototype._next = function () {
        this.parent.notifyNext();
    };
    SampleNotificationSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    SampleNotificationSubscriber.prototype._complete = function () {
        //noop
    };
    return SampleNotificationSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.sample = sample;

},{"../Observable":3,"../Subscriber":7}],84:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var nextTick_1 = require('../schedulers/nextTick');
function sampleTime(delay, scheduler) {
    if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
    return this.lift(new SampleTimeOperator(delay, scheduler));
}
exports.sampleTime = sampleTime;
var SampleTimeOperator = (function () {
    function SampleTimeOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function (subscriber) {
        return new SampleTimeSubscriber(subscriber, this.delay, this.scheduler);
    };
    return SampleTimeOperator;
})();
var SampleTimeSubscriber = (function (_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.hasValue = false;
        this.add(scheduler.schedule(dispatchNotification, delay, { subscriber: this, delay: delay }));
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
})(Subscriber_1.Subscriber);
function dispatchNotification(state) {
    var subscriber = state.subscriber, delay = state.delay;
    subscriber.notifyNext();
    this.schedule(state, delay);
}
Observable_1.Observable.prototype.sampleTime = sampleTime;

},{"../Observable":3,"../Subscriber":7,"../schedulers/nextTick":123}],85:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
function scan(accumulator, seed) {
    return this.lift(new ScanOperator(accumulator, seed));
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed) {
        this.accumulator = accumulator;
        this.seed = seed;
    }
    ScanOperator.prototype.call = function (subscriber) {
        return new ScanSubscriber(subscriber, this.accumulator, this.seed);
    };
    return ScanOperator;
})();
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, seed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.accumulatorSet = false;
        this.seed = seed;
        this.accumulator = accumulator;
        this.accumulatorSet = typeof seed !== 'undefined';
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.accumulatorSet = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.accumulatorSet) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            var result = tryCatch_1.tryCatch(this.accumulator).call(this, this.seed, value);
            if (result === errorObject_1.errorObject) {
                this.destination.error(errorObject_1.errorObject.e);
            }
            else {
                this.seed = result;
                this.destination.next(this.seed);
            }
        }
    };
    return ScanSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.scan = scan;

},{"../Observable":3,"../Subscriber":7,"../util/errorObject":136,"../util/tryCatch":147}],86:[function(require,module,exports){
var Observable_1 = require('../Observable');
var multicast_1 = require('./multicast');
var Subject_1 = require('../Subject');
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
}
exports.share = share;
;
Observable_1.Observable.prototype.share = share;

},{"../Observable":3,"../Subject":6,"./multicast":71}],87:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
var EmptyError_1 = require('../util/EmptyError');
function single(predicate, thisArg) {
    return this.lift(new SingleOperator(predicate, thisArg, this));
}
exports.single = single;
var SingleOperator = (function () {
    function SingleOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    SingleOperator.prototype.call = function (subscriber) {
        return new SingleSubscriber(subscriber, this.predicate, this.thisArg, this.source);
    };
    return SingleOperator;
})();
var SingleSubscriber = (function (_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = bindCallback_1.bindCallback(predicate, thisArg, 3);
        }
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        }
        else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };
    SingleSubscriber.prototype._next = function (value) {
        var predicate = this.predicate;
        var currentIndex = this.index++;
        if (predicate) {
            var result = tryCatch_1.tryCatch(predicate)(value, currentIndex, this.source);
            if (result === errorObject_1.errorObject) {
                this.destination.error(result.e);
            }
            else if (result) {
                this.applySingleValue(value);
            }
        }
        else {
            this.applySingleValue(value);
        }
    };
    SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return SingleSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.single = single;

},{"../Observable":3,"../Subscriber":7,"../util/EmptyError":128,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],88:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
function skip(total) {
    return this.lift(new SkipOperator(total));
}
exports.skip = skip;
var SkipOperator = (function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber) {
        return new SkipSubscriber(subscriber, this.total);
    };
    return SkipOperator;
})();
var SkipSubscriber = (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.skip = skip;

},{"../Observable":3,"../Subscriber":7}],89:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
function skipUntil(notifier) {
    return this.lift(new SkipUntilOperator(notifier));
}
exports.skipUntil = skipUntil;
var SkipUntilOperator = (function () {
    function SkipUntilOperator(notifier) {
        this.notifier = notifier;
    }
    SkipUntilOperator.prototype.call = function (subscriber) {
        return new SkipUntilSubscriber(subscriber, this.notifier);
    };
    return SkipUntilOperator;
})();
var SkipUntilSubscriber = (function (_super) {
    __extends(SkipUntilSubscriber, _super);
    function SkipUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.notificationSubscriber = null;
        this.notificationSubscriber = new NotificationSubscriber(this);
        this.add(this.notifier.subscribe(this.notificationSubscriber));
    }
    SkipUntilSubscriber.prototype._next = function (value) {
        if (this.notificationSubscriber.hasValue) {
            this.destination.next(value);
        }
    };
    SkipUntilSubscriber.prototype._error = function (err) {
        this.destination.error(err);
    };
    SkipUntilSubscriber.prototype._complete = function () {
        if (this.notificationSubscriber.hasCompleted) {
            this.destination.complete();
        }
        this.notificationSubscriber.unsubscribe();
    };
    SkipUntilSubscriber.prototype.unsubscribe = function () {
        if (this._isUnsubscribed) {
            return;
        }
        else if (this._subscription) {
            this._subscription.unsubscribe();
            this._isUnsubscribed = true;
        }
        else {
            _super.prototype.unsubscribe.call(this);
        }
    };
    return SkipUntilSubscriber;
})(Subscriber_1.Subscriber);
var NotificationSubscriber = (function (_super) {
    __extends(NotificationSubscriber, _super);
    function NotificationSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
        this.hasValue = false;
        this.hasCompleted = false;
    }
    NotificationSubscriber.prototype._next = function (unused) {
        this.hasValue = true;
    };
    NotificationSubscriber.prototype._error = function (err) {
        this.parent.error(err);
        this.hasValue = true;
    };
    NotificationSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
    };
    return NotificationSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.skipUntil = skipUntil;

},{"../Observable":3,"../Subscriber":7}],90:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
function skipWhile(predicate, thisArg) {
    return this.lift(new SkipWhileOperator(predicate, thisArg));
}
exports.skipWhile = skipWhile;
var SkipWhileOperator = (function () {
    function SkipWhileOperator(predicate, thisArg) {
        this.predicate = bindCallback_1.bindCallback(predicate, thisArg, 2);
    }
    SkipWhileOperator.prototype.call = function (subscriber) {
        return new SkipWhileSubscriber(subscriber, this.predicate);
    };
    return SkipWhileOperator;
})();
var SkipWhileSubscriber = (function (_super) {
    __extends(SkipWhileSubscriber, _super);
    function SkipWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
    }
    SkipWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (this.skipping === true) {
            var index = this.index++;
            var result = tryCatch_1.tryCatch(this.predicate)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(result.e);
            }
            else {
                this.skipping = Boolean(result);
            }
        }
        if (this.skipping === false) {
            destination.next(value);
        }
    };
    return SkipWhileSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.skipWhile = skipWhile;

},{"../Observable":3,"../Subscriber":7,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],91:[function(require,module,exports){
var Observable_1 = require('../Observable');
var fromArray_1 = require('../observable/fromArray');
var ScalarObservable_1 = require('../observable/ScalarObservable');
var empty_1 = require('../observable/empty');
var concat_static_1 = require('./concat-static');
var isScheduler_1 = require('../util/isScheduler');
function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
    }
    var scheduler = array[array.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
    }
    else {
        scheduler = void 0;
    }
    var len = array.length;
    if (len === 1) {
        return concat_static_1.concat(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
    }
    else if (len > 1) {
        return concat_static_1.concat(new fromArray_1.ArrayObservable(array, scheduler), this);
    }
    else {
        return concat_static_1.concat(new empty_1.EmptyObservable(scheduler), this);
    }
}
exports.startWith = startWith;
Observable_1.Observable.prototype.startWith = startWith;

},{"../Observable":3,"../observable/ScalarObservable":11,"../observable/empty":14,"../observable/fromArray":17,"../util/isScheduler":141,"./concat-static":37}],92:[function(require,module,exports){
var Observable_1 = require('../Observable');
var SubscribeOnObservable_1 = require('../observable/SubscribeOnObservable');
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
}
exports.subscribeOn = subscribeOn;
Observable_1.Observable.prototype.subscribeOn = subscribeOn;

},{"../Observable":3,"../observable/SubscribeOnObservable":12}],93:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function _switch() {
    return this.lift(new SwitchOperator());
}
exports._switch = _switch;
var SwitchOperator = (function () {
    function SwitchOperator() {
    }
    SwitchOperator.prototype.call = function (subscriber) {
        return new SwitchSubscriber(subscriber);
    };
    return SwitchOperator;
})();
var SwitchSubscriber = (function (_super) {
    __extends(SwitchSubscriber, _super);
    function SwitchSubscriber(destination) {
        _super.call(this, destination);
        this.active = 0;
        this.hasCompleted = false;
    }
    SwitchSubscriber.prototype._next = function (value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, value));
    };
    SwitchSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    SwitchSubscriber.prototype.unsubscribeInner = function () {
        this.active = this.active > 0 ? this.active - 1 : 0;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
            this.remove(innerSubscription);
        }
    };
    SwitchSubscriber.prototype.notifyNext = function (outerValue, innerValue) {
        this.destination.next(innerValue);
    };
    SwitchSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchSubscriber.prototype.notifyComplete = function () {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return SwitchSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
Observable_1.Observable.prototype.switch = _switch;

},{"../Observable":3,"../OuterSubscriber":4,"../util/subscribeToResult":145}],94:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function switchFirst() {
    return this.lift(new SwitchFirstOperator());
}
exports.switchFirst = switchFirst;
var SwitchFirstOperator = (function () {
    function SwitchFirstOperator() {
    }
    SwitchFirstOperator.prototype.call = function (subscriber) {
        return new SwitchFirstSubscriber(subscriber);
    };
    return SwitchFirstOperator;
})();
var SwitchFirstSubscriber = (function (_super) {
    __extends(SwitchFirstSubscriber, _super);
    function SwitchFirstSubscriber(destination) {
        _super.call(this, destination);
        this.hasSubscription = false;
        this.hasCompleted = false;
    }
    SwitchFirstSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(subscribeToResult_1.subscribeToResult(this, value));
        }
    };
    SwitchFirstSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchFirstSubscriber.prototype.notifyNext = function (outerValue, innerValue) {
        this.destination.next(innerValue);
    };
    SwitchFirstSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchFirstSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
Observable_1.Observable.prototype.switchFirst = switchFirst;

},{"../Observable":3,"../OuterSubscriber":4,"../util/subscribeToResult":145}],95:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber) {
        return new SwitchMapSubscriber(subscriber, this.project, this.resultSelector);
    };
    return SwitchMapOperator;
})();
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.hasCompleted = false;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var index = this.index++;
        var destination = this.destination;
        var result = tryCatch_1.tryCatch(this.project)(value, index);
        if (result === errorObject_1.errorObject) {
            destination.error(result.e);
        }
        else {
            var innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
        }
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        this.hasCompleted = true;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            this.destination.complete();
        }
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        var prevSubscription = this.innerSubscription;
        if (prevSubscription) {
            prevSubscription.unsubscribe();
        }
        this.innerSubscription = null;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    SwitchMapSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                destination.next(result);
            }
        }
        else {
            destination.next(innerValue);
        }
    };
    return SwitchMapSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
Observable_1.Observable.prototype.switchMap = switchMap;

},{"../Observable":3,"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],96:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function switchMapFirst(project, resultSelector) {
    return this.lift(new SwitchMapFirstOperator(project, resultSelector));
}
exports.switchMapFirst = switchMapFirst;
var SwitchMapFirstOperator = (function () {
    function SwitchMapFirstOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapFirstOperator.prototype.call = function (subscriber) {
        return new SwitchMapFirstSubscriber(subscriber, this.project, this.resultSelector);
    };
    return SwitchMapFirstOperator;
})();
var SwitchMapFirstSubscriber = (function (_super) {
    __extends(SwitchMapFirstSubscriber, _super);
    function SwitchMapFirstSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.hasSubscription = false;
        this.hasCompleted = false;
        this.index = 0;
    }
    SwitchMapFirstSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            var index = this.index++;
            var destination = this.destination;
            var result = tryCatch_1.tryCatch(this.project)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(result.e);
            }
            else {
                this.hasSubscription = true;
                this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
            }
        }
    };
    SwitchMapFirstSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchMapFirstSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                destination.next(result);
            }
        }
        else {
            destination.next(innerValue);
        }
    };
    SwitchMapFirstSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchMapFirstSubscriber.prototype.notifyComplete = function () {
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchMapFirstSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
Observable_1.Observable.prototype.switchMapFirst = switchMapFirst;

},{"../Observable":3,"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],97:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function switchMapTo(observable, projectResult) {
    return this.lift(new SwitchMapToOperator(observable, projectResult));
}
exports.switchMapTo = switchMapTo;
var SwitchMapToOperator = (function () {
    function SwitchMapToOperator(observable, resultSelector) {
        this.observable = observable;
        this.resultSelector = resultSelector;
    }
    SwitchMapToOperator.prototype.call = function (subscriber) {
        return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
    };
    return SwitchMapToOperator;
})();
var SwitchMapToSubscriber = (function (_super) {
    __extends(SwitchMapToSubscriber, _super);
    function SwitchMapToSubscriber(destination, inner, resultSelector) {
        _super.call(this, destination);
        this.inner = inner;
        this.resultSelector = resultSelector;
        this.hasCompleted = false;
        this.index = 0;
    }
    SwitchMapToSubscriber.prototype._next = function (value) {
        var index = this.index++;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, index));
    };
    SwitchMapToSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        this.hasCompleted = true;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            this.destination.complete();
        }
    };
    SwitchMapToSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        var prevSubscription = this.innerSubscription;
        if (prevSubscription) {
            prevSubscription.unsubscribe();
        }
        this.innerSubscription = null;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    SwitchMapToSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                destination.next(result);
            }
        }
        else {
            destination.next(innerValue);
        }
    };
    return SwitchMapToSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
Observable_1.Observable.prototype.switchMapTo = switchMapTo;

},{"../Observable":3,"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],98:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var ArgumentOutOfRangeError_1 = require('../util/ArgumentOutOfRangeError');
var empty_1 = require('../observable/empty');
function take(total) {
    if (total === 0) {
        return new empty_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(total));
    }
}
exports.take = take;
var TakeOperator = (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber) {
        return new TakeSubscriber(subscriber, this.total);
    };
    return TakeOperator;
})();
var TakeSubscriber = (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        if (++this.count <= total) {
            this.destination.next(value);
            if (this.count === total) {
                this.destination.complete();
            }
        }
    };
    return TakeSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.take = take;

},{"../Observable":3,"../Subscriber":7,"../observable/empty":14,"../util/ArgumentOutOfRangeError":127}],99:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var noop_1 = require('../util/noop');
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber) {
        return new TakeUntilSubscriber(subscriber, this.notifier);
    };
    return TakeUntilOperator;
})();
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.notificationSubscriber = null;
        this.notificationSubscriber = new TakeUntilInnerSubscriber(destination);
        this.add(notifier.subscribe(this.notificationSubscriber));
    }
    TakeUntilSubscriber.prototype._complete = function () {
        this.destination.complete();
        this.notificationSubscriber.unsubscribe();
    };
    return TakeUntilSubscriber;
})(Subscriber_1.Subscriber);
var TakeUntilInnerSubscriber = (function (_super) {
    __extends(TakeUntilInnerSubscriber, _super);
    function TakeUntilInnerSubscriber(destination) {
        _super.call(this, null);
        this.destination = destination;
    }
    TakeUntilInnerSubscriber.prototype._next = function (unused) {
        this.destination.complete();
    };
    TakeUntilInnerSubscriber.prototype._error = function (err) {
        this.destination.error(err);
    };
    TakeUntilInnerSubscriber.prototype._complete = function () {
        noop_1.noop();
    };
    return TakeUntilInnerSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.takeUntil = takeUntil;

},{"../Observable":3,"../Subscriber":7,"../util/noop":142}],100:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var bindCallback_1 = require('../util/bindCallback');
function takeWhile(predicate, thisArg) {
    return this.lift(new TakeWhileOperator(predicate, thisArg));
}
exports.takeWhile = takeWhile;
var TakeWhileOperator = (function () {
    function TakeWhileOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    TakeWhileOperator.prototype.call = function (subscriber) {
        return new TakeWhileSubscriber(subscriber, this.predicate, this.thisArg);
    };
    return TakeWhileOperator;
})();
var TakeWhileSubscriber = (function (_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = bindCallback_1.bindCallback(predicate, thisArg, 2);
        }
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result = tryCatch_1.tryCatch(this.predicate)(value, this.index++);
        if (result == errorObject_1.errorObject) {
            destination.error(result.e);
        }
        else if (Boolean(result)) {
            destination.next(value);
        }
        else {
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.takeWhile = takeWhile;

},{"../Observable":3,"../Subscriber":7,"../util/bindCallback":135,"../util/errorObject":136,"../util/tryCatch":147}],101:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var fromPromise_1 = require('../observable/fromPromise');
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var isPromise_1 = require('../util/isPromise');
var errorObject_1 = require('../util/errorObject');
function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
}
exports.throttle = throttle;
var ThrottleOperator = (function () {
    function ThrottleOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    ThrottleOperator.prototype.call = function (subscriber) {
        return new ThrottleSubscriber(subscriber, this.durationSelector);
    };
    return ThrottleOperator;
})();
var ThrottleSubscriber = (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
            var destination = this.destination;
            var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
            if (duration === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
                return;
            }
            if (isPromise_1.isPromise(duration)) {
                duration = fromPromise_1.PromiseObservable.create(duration);
            }
            this.add(this.throttled = duration._subscribe(new ThrottleDurationSelectorSubscriber(this)));
            destination.next(value);
        }
    };
    ThrottleSubscriber.prototype._error = function (err) {
        this.clearThrottle();
        _super.prototype._error.call(this, err);
    };
    ThrottleSubscriber.prototype._complete = function () {
        this.clearThrottle();
        _super.prototype._complete.call(this);
    };
    ThrottleSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleSubscriber;
})(Subscriber_1.Subscriber);
var ThrottleDurationSelectorSubscriber = (function (_super) {
    __extends(ThrottleDurationSelectorSubscriber, _super);
    function ThrottleDurationSelectorSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    ThrottleDurationSelectorSubscriber.prototype._next = function (unused) {
        this.parent.clearThrottle();
    };
    ThrottleDurationSelectorSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    ThrottleDurationSelectorSubscriber.prototype._complete = function () {
        this.parent.clearThrottle();
    };
    return ThrottleDurationSelectorSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.throttle = throttle;

},{"../Observable":3,"../Subscriber":7,"../observable/fromPromise":21,"../util/errorObject":136,"../util/isPromise":140,"../util/tryCatch":147}],102:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var nextTick_1 = require('../schedulers/nextTick');
function throttleTime(delay, scheduler) {
    if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
    return this.lift(new ThrottleTimeOperator(delay, scheduler));
}
exports.throttleTime = throttleTime;
var ThrottleTimeOperator = (function () {
    function ThrottleTimeOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    ThrottleTimeOperator.prototype.call = function (subscriber) {
        return new ThrottleTimeSubscriber(subscriber, this.delay, this.scheduler);
    };
    return ThrottleTimeOperator;
})();
var ThrottleTimeSubscriber = (function (_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
    }
    ThrottleTimeSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, { subscriber: this }));
            this.destination.next(value);
        }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleTimeSubscriber;
})(Subscriber_1.Subscriber);
function dispatchNext(_a) {
    var subscriber = _a.subscriber;
    subscriber.clearThrottle();
}
Observable_1.Observable.prototype.throttleTime = throttleTime;

},{"../Observable":3,"../Subscriber":7,"../schedulers/nextTick":123}],103:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
var immediate_1 = require('../schedulers/immediate');
var isDate_1 = require('../util/isDate');
function timeout(due, errorToSend, scheduler) {
    if (errorToSend === void 0) { errorToSend = null; }
    if (scheduler === void 0) { scheduler = immediate_1.immediate; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : due;
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
}
exports.timeout = timeout;
var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
    }
    TimeoutOperator.prototype.call = function (subscriber) {
        return new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler);
    };
    return TimeoutOperator;
})();
var TimeoutSubscriber = (function (_super) {
    __extends(TimeoutSubscriber, _super);
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
        _super.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutSubscriber.prototype, "previousIndex", {
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeoutSubscriber.prototype, "hasCompleted", {
        get: function () {
            return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
    });
    TimeoutSubscriber.dispatchTimeout = function (state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.notifyTimeout();
        }
    };
    TimeoutSubscriber.prototype.scheduleTimeout = function () {
        var currentIndex = this.index;
        this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
        this.index++;
        this._previousIndex = currentIndex;
    };
    TimeoutSubscriber.prototype._next = function (value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
    };
    TimeoutSubscriber.prototype._error = function (err) {
        this.destination.error(err);
        this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype._complete = function () {
        this.destination.complete();
        this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype.notifyTimeout = function () {
        this.error(this.errorToSend || new Error('timeout'));
    };
    return TimeoutSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.timeout = timeout;

},{"../Observable":3,"../Subscriber":7,"../schedulers/immediate":122,"../util/isDate":138}],104:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var immediate_1 = require('../schedulers/immediate');
var Observable_1 = require('../Observable');
var isDate_1 = require('../util/isDate');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) { scheduler = immediate_1.immediate; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : due;
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}
exports.timeoutWith = timeoutWith;
var TimeoutWithOperator = (function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    TimeoutWithOperator.prototype.call = function (subscriber) {
        return new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler);
    };
    return TimeoutWithOperator;
})();
var TimeoutWithSubscriber = (function (_super) {
    __extends(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _super.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.timeoutSubscription = undefined;
        this.timedOut = false;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
        get: function () {
            return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
    });
    TimeoutWithSubscriber.dispatchTimeout = function (state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.handleTimeout();
        }
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
        var currentIndex = this.index;
        var timeoutState = { subscriber: this, index: currentIndex };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
        this.index++;
        this._previousIndex = currentIndex;
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
        if (!this.timedOut) {
            this.destination.next(value);
            if (!this.absoluteTimeout) {
                this.scheduleTimeout();
            }
        }
    };
    TimeoutWithSubscriber.prototype._error = function (err) {
        if (!this.timedOut) {
            this.destination.error(err);
            this._hasCompleted = true;
        }
    };
    TimeoutWithSubscriber.prototype._complete = function () {
        if (!this.timedOut) {
            this.destination.complete();
            this._hasCompleted = true;
        }
    };
    TimeoutWithSubscriber.prototype.handleTimeout = function () {
        var withObservable = this.withObservable;
        this.timedOut = true;
        this.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
    };
    return TimeoutWithSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
Observable_1.Observable.prototype.timeoutWith = timeoutWith;

},{"../Observable":3,"../OuterSubscriber":4,"../schedulers/immediate":122,"../util/isDate":138,"../util/subscribeToResult":145}],105:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var Subscriber_1 = require('../Subscriber');
function toArray() {
    return this.lift(new ToArrayOperator());
}
exports.toArray = toArray;
var ToArrayOperator = (function () {
    function ToArrayOperator() {
    }
    ToArrayOperator.prototype.call = function (subscriber) {
        return new ToArraySubscriber(subscriber);
    };
    return ToArrayOperator;
})();
var ToArraySubscriber = (function (_super) {
    __extends(ToArraySubscriber, _super);
    function ToArraySubscriber(destination) {
        _super.call(this, destination);
        this.array = [];
    }
    ToArraySubscriber.prototype._next = function (x) {
        this.array.push(x);
    };
    ToArraySubscriber.prototype._complete = function () {
        this.destination.next(this.array);
        this.destination.complete();
    };
    return ToArraySubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.toArray = toArray;

},{"../Observable":3,"../Subscriber":7}],106:[function(require,module,exports){
var root_1 = require('../util/root');
var Observable_1 = require('../Observable');
function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
            PromiseCtor = root_1.root.Rx.config.Promise;
        }
        else if (root_1.root.Promise) {
            PromiseCtor = root_1.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value;
        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
    });
}
exports.toPromise = toPromise;
Observable_1.Observable.prototype.toPromise = toPromise;

},{"../Observable":3,"../util/root":144}],107:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subject_1 = require('../Subject');
function window(closingNotifier) {
    return this.lift(new WindowOperator(closingNotifier));
}
exports.window = window;
var WindowOperator = (function () {
    function WindowOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    WindowOperator.prototype.call = function (subscriber) {
        return new WindowSubscriber(subscriber, this.closingNotifier);
    };
    return WindowOperator;
})();
var WindowSubscriber = (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.closingNotifier = closingNotifier;
        this.window = new Subject_1.Subject();
        this.add(closingNotifier._subscribe(new WindowClosingNotifierSubscriber(this)));
        this.openWindow();
    }
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
    };
    WindowSubscriber.prototype.openWindow = function () {
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        this.destination.next(this.window = new Subject_1.Subject());
    };
    return WindowSubscriber;
})(Subscriber_1.Subscriber);
var WindowClosingNotifierSubscriber = (function (_super) {
    __extends(WindowClosingNotifierSubscriber, _super);
    function WindowClosingNotifierSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    WindowClosingNotifierSubscriber.prototype._next = function () {
        this.parent.openWindow();
    };
    WindowClosingNotifierSubscriber.prototype._error = function (err) {
        this.parent._error(err);
    };
    WindowClosingNotifierSubscriber.prototype._complete = function () {
        this.parent._complete();
    };
    return WindowClosingNotifierSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.window = window;

},{"../Observable":3,"../Subject":6,"../Subscriber":7}],108:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subject_1 = require('../Subject');
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
exports.windowCount = windowCount;
var WindowCountOperator = (function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber) {
        return new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery);
    };
    return WindowCountOperator;
})();
var WindowCountSubscriber = (function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        _super.call(this, destination);
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new Subject_1.Subject()];
        this.count = 0;
        destination.next(this.windows[0]);
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0) {
            var window_1 = new Subject_1.Subject();
            windows.push(window_1);
            this.destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().complete();
        }
        this.destination.complete();
    };
    return WindowCountSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.windowCount = windowCount;

},{"../Observable":3,"../Subject":6,"../Subscriber":7}],109:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subject_1 = require('../Subject');
var nextTick_1 = require('../schedulers/nextTick');
function windowTime(windowTimeSpan, windowCreationInterval, scheduler) {
    if (windowCreationInterval === void 0) { windowCreationInterval = null; }
    if (scheduler === void 0) { scheduler = nextTick_1.nextTick; }
    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
}
exports.windowTime = windowTime;
var WindowTimeOperator = (function () {
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
    }
    WindowTimeOperator.prototype.call = function (subscriber) {
        return new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler);
    };
    return WindowTimeOperator;
})();
var WindowTimeSubscriber = (function (_super) {
    __extends(WindowTimeSubscriber, _super);
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        _super.call(this, destination);
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
        this.windows = [];
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var window_1 = this.openWindow();
            var closeState = { subscriber: this, window: window_1, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: this, scheduler: scheduler };
            this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        }
        else {
            var window_2 = this.openWindow();
            var timeSpanOnlyState = { subscriber: this, window: window_2, windowTimeSpan: windowTimeSpan };
            this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
    }
    WindowTimeSubscriber.prototype._next = function (value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            windows[i].next(value);
        }
    };
    WindowTimeSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowTimeSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().complete();
        }
        this.destination.complete();
    };
    WindowTimeSubscriber.prototype.openWindow = function () {
        var window = new Subject_1.Subject();
        this.windows.push(window);
        this.destination.next(window);
        return window;
    };
    WindowTimeSubscriber.prototype.closeWindow = function (window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    };
    return WindowTimeSubscriber;
})(Subscriber_1.Subscriber);
function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
    if (window) {
        window.complete();
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
    var window = subscriber.openWindow();
    var action = this;
    var context = { action: action, subscription: null };
    var timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
function dispatchWindowClose(_a) {
    var subscriber = _a.subscriber, window = _a.window, context = _a.context;
    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}
Observable_1.Observable.prototype.windowTime = windowTime;

},{"../Observable":3,"../Subject":6,"../Subscriber":7,"../schedulers/nextTick":123}],110:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subject_1 = require('../Subject');
var Subscription_1 = require('../Subscription');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}
exports.windowToggle = windowToggle;
var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber) {
        return new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector);
    };
    return WindowToggleOperator;
})();
var WindowToggleSubscriber = (function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openings._subscribe(new WindowToggleOpeningsSubscriber(this)));
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].window.next(value);
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            contexts.shift().window.error(err);
        }
        this.destination.error(err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            context.window.complete();
            context.subscription.unsubscribe();
        }
        this.destination.complete();
    };
    WindowToggleSubscriber.prototype.openWindow = function (value) {
        var closingSelector = this.closingSelector;
        var closingNotifier = tryCatch_1.tryCatch(closingSelector)(value);
        if (closingNotifier === errorObject_1.errorObject) {
            this.error(closingNotifier.e);
        }
        else {
            var context = {
                window: new Subject_1.Subject(),
                subscription: new Subscription_1.Subscription()
            };
            this.contexts.push(context);
            this.destination.next(context.window);
            var subscriber = new WindowClosingNotifierSubscriber(this, context);
            var subscription = closingNotifier._subscribe(subscriber);
            this.add(context.subscription.add(subscription));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (context) {
        var window = context.window, subscription = context.subscription;
        var contexts = this.contexts;
        contexts.splice(contexts.indexOf(context), 1);
        window.complete();
        this.remove(subscription);
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
})(Subscriber_1.Subscriber);
var WindowClosingNotifierSubscriber = (function (_super) {
    __extends(WindowClosingNotifierSubscriber, _super);
    function WindowClosingNotifierSubscriber(parent, windowContext) {
        _super.call(this, null);
        this.parent = parent;
        this.windowContext = windowContext;
    }
    WindowClosingNotifierSubscriber.prototype._next = function () {
        this.parent.closeWindow(this.windowContext);
    };
    WindowClosingNotifierSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    WindowClosingNotifierSubscriber.prototype._complete = function () {
        this.parent.closeWindow(this.windowContext);
    };
    return WindowClosingNotifierSubscriber;
})(Subscriber_1.Subscriber);
var WindowToggleOpeningsSubscriber = (function (_super) {
    __extends(WindowToggleOpeningsSubscriber, _super);
    function WindowToggleOpeningsSubscriber(parent) {
        _super.call(this);
        this.parent = parent;
    }
    WindowToggleOpeningsSubscriber.prototype._next = function (value) {
        this.parent.openWindow(value);
    };
    WindowToggleOpeningsSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    WindowToggleOpeningsSubscriber.prototype._complete = function () {
        // noop
    };
    return WindowToggleOpeningsSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.windowToggle = windowToggle;

},{"../Observable":3,"../Subject":6,"../Subscriber":7,"../Subscription":8,"../util/errorObject":136,"../util/tryCatch":147}],111:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var Observable_1 = require('../Observable');
var Subject_1 = require('../Subject');
var Subscription_1 = require('../Subscription');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
}
exports.windowWhen = windowWhen;
var WindowOperator = (function () {
    function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function (subscriber) {
        return new WindowSubscriber(subscriber, this.closingSelector);
    };
    return WindowOperator;
})();
var WindowSubscriber = (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.closingSelector = closingSelector;
        this.window = new Subject_1.Subject();
        this.openWindow();
    }
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this._unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this._unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribe = function () {
        _super.prototype.unsubscribe.call(this);
        this._unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._unsubscribeClosingNotification = function () {
        var closingNotification = this.closingNotification;
        if (closingNotification) {
            closingNotification.unsubscribe();
        }
    };
    WindowSubscriber.prototype.openWindow = function () {
        var prevClosingNotification = this.closingNotification;
        if (prevClosingNotification) {
            this.remove(prevClosingNotification);
            prevClosingNotification.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        this.destination.next(this.window = new Subject_1.Subject());
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            var err = closingNotifier.e;
            this.destination.error(err);
            this.window.error(err);
        }
        else {
            var closingNotification = this.closingNotification = new Subscription_1.Subscription();
            this.add(closingNotification.add(closingNotifier._subscribe(new WindowClosingNotifierSubscriber(this))));
        }
    };
    return WindowSubscriber;
})(Subscriber_1.Subscriber);
var WindowClosingNotifierSubscriber = (function (_super) {
    __extends(WindowClosingNotifierSubscriber, _super);
    function WindowClosingNotifierSubscriber(parent) {
        _super.call(this, null);
        this.parent = parent;
    }
    WindowClosingNotifierSubscriber.prototype._next = function () {
        this.parent.openWindow();
    };
    WindowClosingNotifierSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    WindowClosingNotifierSubscriber.prototype._complete = function () {
        this.parent.openWindow();
    };
    return WindowClosingNotifierSubscriber;
})(Subscriber_1.Subscriber);
Observable_1.Observable.prototype.windowWhen = windowWhen;

},{"../Observable":3,"../Subject":6,"../Subscriber":7,"../Subscription":8,"../util/errorObject":136,"../util/tryCatch":147}],112:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('../Observable');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
/**
 * @param {Observable} observables the observables to get the latest values from.
 * @param {Function} [project] optional projection function for merging values together. Receives all values in order
 *  of observables passed. (e.g. `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not passed, arrays
 *  will be returned.
 * @description merges each value from an observable with the latest values from the other passed observables.
 * All observables must emit at least one value before the resulting observable will emit
 *
 * #### example
 * ```
 * A.withLatestFrom(B, C)
 *
 *  A:     ----a-----------------b---------------c-----------|
 *  B:     ---d----------------e--------------f---------|
 *  C:     --x----------------y-------------z-------------|
 * result: ---([a,d,x])---------([b,e,y])--------([c,f,z])---|
 * ```
 */
function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var project;
    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
}
exports.withLatestFrom = withLatestFrom;
var WithLatestFromOperator = (function () {
    function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber) {
        return new WithLatestFromSubscriber(subscriber, this.observables, this.project);
    };
    return WithLatestFromOperator;
})();
var WithLatestFromSubscriber = (function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        _super.call(this, destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        var len = observables.length;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (observable, value, observableIndex, index) {
        this.values[observableIndex] = value;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(observableIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var values = this.values;
            var destination = this.destination;
            var project = this.project;
            var args = [value].concat(values);
            if (project) {
                var result = tryCatch_1.tryCatch(this.project).apply(this, args);
                if (result === errorObject_1.errorObject) {
                    destination.error(result.e);
                }
                else {
                    destination.next(result);
                }
            }
            else {
                destination.next(args);
            }
        }
    };
    return WithLatestFromSubscriber;
})(OuterSubscriber_1.OuterSubscriber);
Observable_1.Observable.prototype.withLatestFrom = withLatestFrom;

},{"../Observable":3,"../OuterSubscriber":4,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],113:[function(require,module,exports){
var Observable_1 = require('../Observable');
var fromArray_1 = require('../observable/fromArray');
var zip_support_1 = require('./zip-support');
function zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new fromArray_1.ArrayObservable(observables).lift(new zip_support_1.ZipOperator(project));
}
exports.zip = zip;
Observable_1.Observable.zip = zip;

},{"../Observable":3,"../observable/fromArray":17,"./zip-support":114}],114:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
var Symbol_iterator_1 = require('../util/Symbol_iterator');
var isArray = Array.isArray;
var ZipOperator = (function () {
    function ZipOperator(project) {
        this.project = project;
    }
    ZipOperator.prototype.call = function (subscriber) {
        return new ZipSubscriber(subscriber, this.project);
    };
    return ZipOperator;
})();
exports.ZipOperator = ZipOperator;
var ZipSubscriber = (function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, project, values) {
        if (values === void 0) { values = Object.create(null); }
        _super.call(this, destination);
        this.index = 0;
        this.iterators = [];
        this.active = 0;
        this.project = (typeof project === 'function') ? project : null;
        this.values = values;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        var index = this.index++;
        if (isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[Symbol_iterator_1.$$iterator] === 'function') {
            iterators.push(new StaticIterator(value[Symbol_iterator_1.$$iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value, index));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                iterator.subscribe(iterator, i);
            }
            else {
                this.active--; // not an observable
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        // abort if not all of them have values
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            // check to see if it's completed now that you've gotten
            // the next value.
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        var project = this.project;
        if (project) {
            var result = tryCatch_1.tryCatch(project).apply(this, args);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                destination.next(result);
            }
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    return ZipSubscriber;
})(Subscriber_1.Subscriber);
exports.ZipSubscriber = ZipSubscriber;
var StaticIterator = (function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
})();
var StaticArrayIterator = (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[Symbol_iterator_1.$$iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
})();
var ZipBufferIterator = (function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable, index) {
        _super.call(this, destination);
        this.parent = parent;
        this.observable = observable;
        this.index = index;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
    }
    ZipBufferIterator.prototype[Symbol_iterator_1.$$iterator] = function () {
        return this;
    };
    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
    //    this is legit because `next()` will never be called by a subscription in this case.
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, this.observable, this, index));
    };
    return ZipBufferIterator;
})(OuterSubscriber_1.OuterSubscriber);

},{"../OuterSubscriber":4,"../Subscriber":7,"../util/Symbol_iterator":133,"../util/errorObject":136,"../util/subscribeToResult":145,"../util/tryCatch":147}],115:[function(require,module,exports){
var Observable_1 = require('../Observable');
var zip_static_1 = require('./zip-static');
function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return zip_static_1.zip.apply(this, observables);
}
exports.zipProto = zipProto;
Observable_1.Observable.prototype.zip = zipProto;

},{"../Observable":3,"./zip-static":113}],116:[function(require,module,exports){
var zip_support_1 = require('./zip-support');
var Observable_1 = require('../Observable');
function zipAll(project) {
    return this.lift(new zip_support_1.ZipOperator(project));
}
exports.zipAll = zipAll;
Observable_1.Observable.prototype.zipAll = zipAll;

},{"../Observable":3,"./zip-support":114}],117:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImmediateAction_1 = require('./ImmediateAction');
var FutureAction = (function (_super) {
    __extends(FutureAction, _super);
    function FutureAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    FutureAction.prototype.schedule = function (state, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (this.isUnsubscribed) {
            return this;
        }
        this.delay = delay;
        this.state = state;
        var id = this.id;
        if (id != null) {
            this.id = undefined;
            clearTimeout(id);
        }
        var scheduler = this.scheduler;
        this.id = setTimeout(function () {
            _this.id = void 0;
            scheduler.actions.push(_this);
            scheduler.flush();
        }, this.delay);
        return this;
    };
    FutureAction.prototype.unsubscribe = function () {
        var id = this.id;
        if (id != null) {
            this.id = void 0;
            clearTimeout(id);
        }
        _super.prototype.unsubscribe.call(this);
    };
    return FutureAction;
})(ImmediateAction_1.ImmediateAction);
exports.FutureAction = FutureAction;

},{"./ImmediateAction":118}],118:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = require('../Subscription');
var ImmediateAction = (function (_super) {
    __extends(ImmediateAction, _super);
    function ImmediateAction(scheduler, work) {
        _super.call(this);
        this.scheduler = scheduler;
        this.work = work;
    }
    ImmediateAction.prototype.schedule = function (state) {
        if (this.isUnsubscribed) {
            return this;
        }
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        scheduler.flush();
        return this;
    };
    ImmediateAction.prototype.execute = function () {
        if (this.isUnsubscribed) {
            throw new Error('How did did we execute a canceled Action?');
        }
        this.work(this.state);
    };
    ImmediateAction.prototype.unsubscribe = function () {
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = void 0;
        this.state = void 0;
        this.scheduler = void 0;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        _super.prototype.unsubscribe.call(this);
    };
    return ImmediateAction;
})(Subscription_1.Subscription);
exports.ImmediateAction = ImmediateAction;

},{"../Subscription":8}],119:[function(require,module,exports){
var ImmediateAction_1 = require('./ImmediateAction');
var FutureAction_1 = require('./FutureAction');
var ImmediateScheduler = (function () {
    function ImmediateScheduler() {
        this.actions = [];
        this.active = false;
        this.scheduled = false;
    }
    ImmediateScheduler.prototype.now = function () {
        return Date.now();
    };
    ImmediateScheduler.prototype.flush = function () {
        if (this.active || this.scheduled) {
            return;
        }
        this.active = true;
        var actions = this.actions;
        for (var action = void 0; action = actions.shift();) {
            action.execute();
        }
        this.active = false;
    };
    ImmediateScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return (delay <= 0) ?
            this.scheduleNow(work, state) :
            this.scheduleLater(work, delay, state);
    };
    ImmediateScheduler.prototype.scheduleNow = function (work, state) {
        return new ImmediateAction_1.ImmediateAction(this, work).schedule(state);
    };
    ImmediateScheduler.prototype.scheduleLater = function (work, delay, state) {
        return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
    };
    return ImmediateScheduler;
})();
exports.ImmediateScheduler = ImmediateScheduler;

},{"./FutureAction":117,"./ImmediateAction":118}],120:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Immediate_1 = require('../util/Immediate');
var ImmediateAction_1 = require('./ImmediateAction');
var NextTickAction = (function (_super) {
    __extends(NextTickAction, _super);
    function NextTickAction() {
        _super.apply(this, arguments);
    }
    NextTickAction.prototype.schedule = function (state) {
        var _this = this;
        if (this.isUnsubscribed) {
            return this;
        }
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        if (!scheduler.scheduled) {
            scheduler.scheduled = true;
            this.id = Immediate_1.Immediate.setImmediate(function () {
                _this.id = null;
                _this.scheduler.scheduled = false;
                _this.scheduler.flush();
            });
        }
        return this;
    };
    NextTickAction.prototype.unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        _super.prototype.unsubscribe.call(this);
        if (scheduler.actions.length === 0) {
            scheduler.active = false;
            scheduler.scheduled = false;
        }
        if (id) {
            this.id = null;
            Immediate_1.Immediate.clearImmediate(id);
        }
    };
    return NextTickAction;
})(ImmediateAction_1.ImmediateAction);
exports.NextTickAction = NextTickAction;

},{"../util/Immediate":130,"./ImmediateAction":118}],121:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImmediateScheduler_1 = require('./ImmediateScheduler');
var NextTickAction_1 = require('./NextTickAction');
var ImmediateAction_1 = require('./ImmediateAction');
var NextTickScheduler = (function (_super) {
    __extends(NextTickScheduler, _super);
    function NextTickScheduler() {
        _super.apply(this, arguments);
    }
    NextTickScheduler.prototype.scheduleNow = function (work, state) {
        return (this.scheduled ?
            new ImmediateAction_1.ImmediateAction(this, work) :
            new NextTickAction_1.NextTickAction(this, work)).schedule(state);
    };
    return NextTickScheduler;
})(ImmediateScheduler_1.ImmediateScheduler);
exports.NextTickScheduler = NextTickScheduler;

},{"./ImmediateAction":118,"./ImmediateScheduler":119,"./NextTickAction":120}],122:[function(require,module,exports){
var ImmediateScheduler_1 = require('./ImmediateScheduler');
exports.immediate = new ImmediateScheduler_1.ImmediateScheduler();

},{"./ImmediateScheduler":119}],123:[function(require,module,exports){
var NextTickScheduler_1 = require('./NextTickScheduler');
exports.nextTick = new NextTickScheduler_1.NextTickScheduler();

},{"./NextTickScheduler":121}],124:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('../Subject');
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(value) {
        _super.call(this);
        this.value = value;
    }
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (!subscription) {
            return;
        }
        else if (!subscription.isUnsubscribed) {
            subscriber.next(this.value);
        }
        return subscription;
    };
    BehaviorSubject.prototype._next = function (value) {
        _super.prototype._next.call(this, this.value = value);
    };
    return BehaviorSubject;
})(Subject_1.Subject);
exports.BehaviorSubject = BehaviorSubject;

},{"../Subject":6}],125:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('../Subject');
var immediate_1 = require('../schedulers/immediate');
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.events = [];
        this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
        this.scheduler = scheduler;
    }
    ReplaySubject.prototype._next = function (value) {
        var now = this._getNow();
        this.events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents(now);
        _super.prototype._next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var events = this._trimBufferThenGetEvents(this._getNow());
        var index = -1;
        var len = events.length;
        while (!subscriber.isUnsubscribed && ++index < len) {
            subscriber.next(events[index].value);
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || immediate_1.immediate).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function (now) {
        var bufferSize = this.bufferSize;
        var _windowTime = this._windowTime;
        var events = this.events;
        var eventsCount = events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount += 1;
        }
        if (eventsCount > bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - bufferSize);
        }
        if (spliceCount > 0) {
            events.splice(0, spliceCount);
        }
        return events;
    };
    return ReplaySubject;
})(Subject_1.Subject);
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
})();

},{"../Subject":6,"../schedulers/immediate":122}],126:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = require('../Subscription');
var Subscriber_1 = require('../Subscriber');
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, observer) {
        _super.call(this);
        this.subject = subject;
        this.observer = observer;
        this.isUnsubscribed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.isUnsubscribed) {
            return;
        }
        this.isUnsubscribed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = void 0;
        if (!observers || observers.length === 0 || subject.isUnsubscribed) {
            return;
        }
        if (this.observer instanceof Subscriber_1.Subscriber) {
            this.observer.unsubscribe();
        }
        var subscriberIndex = observers.indexOf(this.observer);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
})(Subscription_1.Subscription);
exports.SubjectSubscription = SubjectSubscription;

},{"../Subscriber":7,"../Subscription":8}],127:[function(require,module,exports){
var ArgumentOutOfRangeError = (function () {
    function ArgumentOutOfRangeError() {
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
    }
    return ArgumentOutOfRangeError;
})();
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;

},{}],128:[function(require,module,exports){
var EmptyError = (function () {
    function EmptyError() {
        this.name = 'EmptyError';
        this.message = 'no elements in sequence';
    }
    return EmptyError;
})();
exports.EmptyError = EmptyError;

},{}],129:[function(require,module,exports){
var FastMap = (function () {
    function FastMap() {
        this.values = {};
    }
    FastMap.prototype.delete = function (key) {
        this.values[key] = null;
        return true;
    };
    FastMap.prototype.set = function (key, value) {
        this.values[key] = value;
        return this;
    };
    FastMap.prototype.get = function (key) {
        return this.values[key];
    };
    FastMap.prototype.forEach = function (cb, thisArg) {
        var values = this.values;
        for (var key in values) {
            if (values.hasOwnProperty(key) && values[key] !== null) {
                cb.call(thisArg, values[key], key);
            }
        }
    };
    FastMap.prototype.clear = function () {
        this.values = {};
    };
    return FastMap;
})();
exports.FastMap = FastMap;

},{}],130:[function(require,module,exports){
/**
Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/
var root_1 = require('./root');
var ImmediateDefinition = (function () {
    function ImmediateDefinition(root) {
        this.root = root;
        if (root.setImmediate) {
            this.setImmediate = root.setImmediate;
            this.clearImmediate = root.clearImmediate;
        }
        else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            // Don't get fooled by e.g. browserify environments.
            if (this.canUseProcessNextTick()) {
                // For Node.js before 0.9
                this.setImmediate = this.createProcessNextTickSetImmediate();
            }
            else if (this.canUsePostMessage()) {
                // For non-IE10 modern browsers
                this.setImmediate = this.createPostMessageSetImmediate();
            }
            else if (this.canUseMessageChannel()) {
                // For web workers, where supported
                this.setImmediate = this.createMessageChannelSetImmediate();
            }
            else if (this.canUseReadyStateChange()) {
                // For IE 6–8
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            }
            else {
                // For older browsers
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            var ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    ImmediateDefinition.prototype.identify = function (o) {
        return this.root.Object.prototype.toString.call(o);
    };
    ImmediateDefinition.prototype.canUseProcessNextTick = function () {
        return this.identify(this.root.process) === '[object process]';
    };
    ImmediateDefinition.prototype.canUseMessageChannel = function () {
        return Boolean(this.root.MessageChannel);
    };
    ImmediateDefinition.prototype.canUseReadyStateChange = function () {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    };
    ImmediateDefinition.prototype.canUsePostMessage = function () {
        var root = this.root;
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `root.postMessage` means something completely different and can't be used for this purpose.
        if (root.postMessage && !root.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = root.onmessage;
            root.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            root.postMessage('', '*');
            root.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
        return false;
    };
    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    ImmediateDefinition.prototype.partiallyApplied = function (handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
            var _a = result, handler = _a.handler, args = _a.args;
            if (typeof handler === 'function') {
                handler.apply(undefined, args);
            }
            else {
                (new Function('' + handler))();
            }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
    };
    ImmediateDefinition.prototype.addFromSetImmediateArguments = function (args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
    };
    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createPostMessageSetImmediate = function () {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
        var root = this.root;
        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
            var instance = globalMessageHandler.instance;
            if (event.source === root &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                instance.runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        onGlobalMessage.instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
            var _a = setImmediate, messagePrefix = _a.messagePrefix, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.postMessage(messagePrefix + handle, '*');
            return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
    };
    ImmediateDefinition.prototype.runIfPresent = function (handle) {
        // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
        // So if we're currently running a task, we'll need to delay this invocation.
        if (this.currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // 'too much recursion' error.
            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        }
        else {
            var task = this.tasksByHandle[handle];
            if (task) {
                this.currentlyRunningATask = true;
                try {
                    task();
                }
                finally {
                    this.clearImmediate(handle);
                    this.currentlyRunningATask = false;
                }
            }
        }
    };
    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function () {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
            var _a = setImmediate, channel = _a.channel, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var root = instance.root;
            var doc = root.document;
            var html = doc.documentElement;
            var handle = instance.addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement('script');
            script.onreadystatechange = function () {
                instance.runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    return ImmediateDefinition;
})();
exports.ImmediateDefinition = ImmediateDefinition;
exports.Immediate = new ImmediateDefinition(root_1.root);

},{"./root":144}],131:[function(require,module,exports){
var root_1 = require('./root');
var MapPolyfill_1 = require('./MapPolyfill');
exports.Map = root_1.root.Map || (function () { return MapPolyfill_1.MapPolyfill; })();

},{"./MapPolyfill":132,"./root":144}],132:[function(require,module,exports){
var MapPolyfill = (function () {
    function MapPolyfill() {
        this.size = 0;
        this._values = [];
        this._keys = [];
    }
    MapPolyfill.prototype.get = function (key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
    };
    MapPolyfill.prototype.set = function (key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            this._keys.push(key);
            this._values.push(value);
            this.size++;
        }
        else {
            this._values[i] = value;
        }
        return this;
    };
    MapPolyfill.prototype.delete = function (key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
    };
    MapPolyfill.prototype.forEach = function (cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
            cb.call(thisArg, this._values[i], this._keys[i]);
        }
    };
    return MapPolyfill;
})();
exports.MapPolyfill = MapPolyfill;

},{}],133:[function(require,module,exports){
var root_1 = require('./root');
if (!root_1.root.Symbol) {
    root_1.root.Symbol = {};
}
if (!root_1.root.Symbol.iterator) {
    if (typeof root_1.root.Symbol.for === 'function') {
        root_1.root.Symbol.iterator = root_1.root.Symbol.for('iterator');
    }
    else if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
        // Bug for mozilla version
        root_1.root.Symbol.iterator = '@@iterator';
    }
    else if (root_1.root.Map) {
        // es6-shim specific logic
        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
                root_1.root.Symbol.iterator = key;
                break;
            }
        }
    }
    else {
        root_1.root.Symbol.iterator = '@@iterator';
    }
}
exports.$$iterator = root_1.root.Symbol.iterator;
// // Shim in iterator support
// export var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) || '_es6shim_iterator_';
// // Bug for mozilla version
// if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
//     $iterator$ = '@@iterator';
// }

},{"./root":144}],134:[function(require,module,exports){
var root_1 = require('./root');
if (!root_1.root.Symbol) {
    root_1.root.Symbol = {};
}
if (!root_1.root.Symbol.observable) {
    if (typeof root_1.root.Symbol.for === 'function') {
        root_1.root.Symbol.observable = root_1.root.Symbol.for('observable');
    }
    else {
        root_1.root.Symbol.observable = '@@observable';
    }
}
exports.$$observable = root_1.root.Symbol.observable;

},{"./root":144}],135:[function(require,module,exports){
function bindCallback(func, thisArg, argCount) {
    if (typeof thisArg === 'undefined') {
        return func;
    }
    switch (argCount) {
        case 0:
            return function () {
                return func.call(thisArg);
            };
        case 1:
            return function (arg) {
                return func.call(thisArg, arg);
            };
        case 2:
            return function (value, index) {
                return func.call(thisArg, value, index);
            };
        case 3:
            return function (value, index, collection) {
                return func.call(thisArg, value, index, collection);
            };
    }
    return function () {
        return func.apply(thisArg, arguments);
    };
}
exports.bindCallback = bindCallback;
;

},{}],136:[function(require,module,exports){
exports.errorObject = { e: {} };

},{}],137:[function(require,module,exports){
exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });

},{}],138:[function(require,module,exports){
function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
exports.isDate = isDate;

},{}],139:[function(require,module,exports){
var is_array = Array.isArray;
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !is_array(val) && (val - parseFloat(val) + 1) >= 0;
}
exports.isNumeric = isNumeric;
;

},{}],140:[function(require,module,exports){
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;

},{}],141:[function(require,module,exports){
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;

},{}],142:[function(require,module,exports){
/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;

},{}],143:[function(require,module,exports){
function not(pred, thisArg) {
    function notPred() {
        return !(notPred.pred.apply(notPred.thisArg, arguments));
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
}
exports.not = not;

},{}],144:[function(require,module,exports){
(function (global){
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
/* tslint:disable:no-unused-variable */
var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
var freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],145:[function(require,module,exports){
var Observable_1 = require('../Observable');
var Symbol_iterator_1 = require('../util/Symbol_iterator');
var Symbol_observable_1 = require('../util/Symbol_observable');
var InnerSubscriber_1 = require('../InnerSubscriber');
var isArray = Array.isArray;
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.isUnsubscribed) {
        return;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return;
        }
        else {
            return result.subscribe(destination);
        }
    }
    if (isArray(result)) {
        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
            destination.next(result[i]);
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    }
    else if (typeof result.then === 'function') {
        result.then(function (x) {
            if (!destination.isUnsubscribed) {
                destination.next(x);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (typeof result[Symbol_iterator_1.$$iterator] === 'function') {
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var item = result_1[_i];
            destination.next(item);
            if (destination.isUnsubscribed) {
                break;
            }
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    }
    else if (typeof result[Symbol_observable_1.$$observable] === 'function') {
        var obs = result[Symbol_observable_1.$$observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error('invalid observable');
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        destination.error(new TypeError('unknown type returned'));
    }
}
exports.subscribeToResult = subscribeToResult;

},{"../InnerSubscriber":1,"../Observable":3,"../util/Symbol_iterator":133,"../util/Symbol_observable":134}],146:[function(require,module,exports){
function throwError(e) { throw e; }
exports.throwError = throwError;

},{}],147:[function(require,module,exports){
var errorObject_1 = require('./errorObject');
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;

},{"./errorObject":136}],148:[function(require,module,exports){
function tryOrOnError(target) {
    function tryCatcher() {
        try {
            tryCatcher.target.apply(this, arguments);
        }
        catch (e) {
            this.error(e);
        }
    }
    tryCatcher.target = target;
    return tryCatcher;
}
exports.tryOrOnError = tryOrOnError;

},{}],149:[function(require,module,exports){
(function (global){
(function(root, factory) {
    root.Rx = factory();
} (window || global || this, function() {
    return require('../dist/cjs/Rx');
}));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dist/cjs/Rx":5}]},{},[149]);
