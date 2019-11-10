(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscriber2 = require('./Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var InnerSubscriber = (function (_Subscriber) {
    _inherits(InnerSubscriber, _Subscriber);

    function InnerSubscriber(parent, outerValue, outerIndex) {
        _classCallCheck(this, InnerSubscriber);

        _Subscriber.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }

    InnerSubscriber.prototype._next = function _next(value) {
        var index = this.index++;
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, index);
    };

    InnerSubscriber.prototype._error = function _error(error) {
        this.parent.notifyError(error, this);
    };

    InnerSubscriber.prototype._complete = function _complete() {
        this.parent.notifyComplete(this);
    };

    return InnerSubscriber;
})(_Subscriber3['default']);

exports['default'] = InnerSubscriber;
module.exports = exports['default'];
},{"./Subscriber":7}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Observable = require('./Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var Notification = (function () {
    function Notification(kind, value, exception) {
        _classCallCheck(this, Notification);

        this.kind = kind;
        this.value = value;
        this.exception = exception;
        this.hasValue = kind === 'N';
    }

    Notification.prototype.observe = function observe(observer) {
        switch (this.kind) {
            case 'N':
                return observer.next(this.value);
            case 'E':
                return observer.error(this.exception);
            case 'C':
                return observer.complete();
        }
    };

    Notification.prototype['do'] = function _do(next, error, complete) {
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

    Notification.prototype.accept = function accept(nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        } else {
            return this['do'](nextOrObserver, error, complete);
        }
    };

    Notification.prototype.toObservable = function toObservable() {
        var kind = this.kind;
        var value = this.value;
        switch (kind) {
            case 'N':
                return _Observable2['default'].of(value);
            case 'E':
                return _Observable2['default']['throw'](value);
            case 'C':
                return _Observable2['default'].empty();
        }
    };

    Notification.createNext = function createNext(value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return this.undefinedValueNotification;
    };

    Notification.createError = function createError(err) {
        return new Notification('E', undefined, err);
    };

    Notification.createComplete = function createComplete() {
        return this.completeNotification;
    };

    return Notification;
})();

exports['default'] = Notification;

Notification.completeNotification = new Notification('C');
Notification.undefinedValueNotification = new Notification('N', undefined);
module.exports = exports['default'];
},{"./Observable":3}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _utilRoot = require('./util/root');

var _utilSymbol_observable = require('./util/Symbol_observable');

var _utilSymbol_observable2 = _interopRequireDefault(_utilSymbol_observable);

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
        _classCallCheck(this, Observable);

        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }

    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * @static
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @returns {Observable} a new cold observable
     * @description creates a new cold Observable by calling the Observable constructor
     */

    /**
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @returns {Observable} a new observable with the Operator applied
     * @description creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     */

    Observable.prototype.lift = function lift(operator) {
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

    Observable.prototype[_utilSymbol_observable2['default']] = function () {
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

    Observable.prototype.subscribe = function subscribe(observerOrNext, error, complete) {
        var subscriber = undefined;
        if (observerOrNext && typeof observerOrNext === "object") {
            if (observerOrNext instanceof _Subscriber2['default']) {
                subscriber = observerOrNext;
            } else {
                subscriber = new _Subscriber2['default'](observerOrNext);
            }
        } else {
            var next = observerOrNext;
            subscriber = _Subscriber2['default'].create(next, error, complete);
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

    Observable.prototype.forEach = function forEach(next, PromiseCtor) {
        var _this = this;

        if (!PromiseCtor) {
            if (_utilRoot.root.Rx && _utilRoot.root.Rx.config && _utilRoot.root.Rx.config.Promise) {
                PromiseCtor = _utilRoot.root.Rx.config.Promise;
            } else if (_utilRoot.root.Promise) {
                PromiseCtor = _utilRoot.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            _this.subscribe(next, reject, resolve);
        });
    };

    Observable.prototype._subscribe = function _subscribe(subscriber) {
        return this.source._subscribe(this.operator.call(subscriber));
    };

    return Observable;
})();

exports['default'] = Observable;
Observable.create = function (subscribe) {
    return new Observable(subscribe);
};
module.exports = exports['default'];
},{"./Subscriber":7,"./util/Symbol_observable":127,"./util/root":134}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscriber2 = require('./Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var OuterSubscriber = (function (_Subscriber) {
    _inherits(OuterSubscriber, _Subscriber);

    function OuterSubscriber() {
        _classCallCheck(this, OuterSubscriber);

        _Subscriber.apply(this, arguments);
    }

    OuterSubscriber.prototype.notifyComplete = function notifyComplete(inner) {
        this.destination.complete();
    };

    OuterSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this.destination.next(innerValue);
    };

    OuterSubscriber.prototype.notifyError = function notifyError(error, inner) {
        this.destination.error(error);
    };

    return OuterSubscriber;
})(_Subscriber3['default']);

exports['default'] = OuterSubscriber;
module.exports = exports['default'];
},{"./Subscriber":7}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('./Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var _operatorsCombineLatestStatic = require('./operators/combineLatest-static');

var _operatorsCombineLatestStatic2 = _interopRequireDefault(_operatorsCombineLatestStatic);

var _operatorsConcatStatic = require('./operators/concat-static');

var _operatorsConcatStatic2 = _interopRequireDefault(_operatorsConcatStatic);

var _observablesDeferObservable = require('./observables/DeferObservable');

var _observablesDeferObservable2 = _interopRequireDefault(_observablesDeferObservable);

var _observablesEmptyObservable = require('./observables/EmptyObservable');

var _observablesEmptyObservable2 = _interopRequireDefault(_observablesEmptyObservable);

var _observablesForkJoinObservable = require('./observables/ForkJoinObservable');

var _observablesForkJoinObservable2 = _interopRequireDefault(_observablesForkJoinObservable);

var _observablesFromObservable = require('./observables/FromObservable');

var _observablesFromObservable2 = _interopRequireDefault(_observablesFromObservable);

var _observablesArrayObservable = require('./observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _observablesFromEventObservable = require('./observables/FromEventObservable');

var _observablesFromEventObservable2 = _interopRequireDefault(_observablesFromEventObservable);

var _observablesFromEventPatternObservable = require('./observables/FromEventPatternObservable');

var _observablesFromEventPatternObservable2 = _interopRequireDefault(_observablesFromEventPatternObservable);

var _observablesPromiseObservable = require('./observables/PromiseObservable');

var _observablesPromiseObservable2 = _interopRequireDefault(_observablesPromiseObservable);

var _observablesIntervalObservable = require('./observables/IntervalObservable');

var _observablesIntervalObservable2 = _interopRequireDefault(_observablesIntervalObservable);

var _operatorsMergeStatic = require('./operators/merge-static');

var _operatorsMergeStatic2 = _interopRequireDefault(_operatorsMergeStatic);

var _observablesInfiniteObservable = require('./observables/InfiniteObservable');

var _observablesInfiniteObservable2 = _interopRequireDefault(_observablesInfiniteObservable);

var _observablesRangeObservable = require('./observables/RangeObservable');

var _observablesRangeObservable2 = _interopRequireDefault(_observablesRangeObservable);

var _observablesErrorObservable = require('./observables/ErrorObservable');

var _observablesErrorObservable2 = _interopRequireDefault(_observablesErrorObservable);

var _observablesTimerObservable = require('./observables/TimerObservable');

var _observablesTimerObservable2 = _interopRequireDefault(_observablesTimerObservable);

var _operatorsZipStatic = require('./operators/zip-static');

var _operatorsZipStatic2 = _interopRequireDefault(_operatorsZipStatic);

var _operatorsBuffer = require('./operators/buffer');

var _operatorsBuffer2 = _interopRequireDefault(_operatorsBuffer);

var _operatorsBufferCount = require('./operators/bufferCount');

var _operatorsBufferCount2 = _interopRequireDefault(_operatorsBufferCount);

var _operatorsBufferTime = require('./operators/bufferTime');

var _operatorsBufferTime2 = _interopRequireDefault(_operatorsBufferTime);

var _operatorsBufferToggle = require('./operators/bufferToggle');

var _operatorsBufferToggle2 = _interopRequireDefault(_operatorsBufferToggle);

var _operatorsBufferWhen = require('./operators/bufferWhen');

var _operatorsBufferWhen2 = _interopRequireDefault(_operatorsBufferWhen);

var _operatorsCatch = require('./operators/catch');

var _operatorsCatch2 = _interopRequireDefault(_operatorsCatch);

var _operatorsCombineAll = require('./operators/combineAll');

var _operatorsCombineAll2 = _interopRequireDefault(_operatorsCombineAll);

var _operatorsCombineLatest = require('./operators/combineLatest');

var _operatorsCombineLatest2 = _interopRequireDefault(_operatorsCombineLatest);

var _operatorsConcat = require('./operators/concat');

var _operatorsConcat2 = _interopRequireDefault(_operatorsConcat);

var _operatorsConcatAll = require('./operators/concatAll');

var _operatorsConcatAll2 = _interopRequireDefault(_operatorsConcatAll);

var _operatorsConcatMap = require('./operators/concatMap');

var _operatorsConcatMap2 = _interopRequireDefault(_operatorsConcatMap);

var _operatorsConcatMapTo = require('./operators/concatMapTo');

var _operatorsConcatMapTo2 = _interopRequireDefault(_operatorsConcatMapTo);

var _operatorsCount = require('./operators/count');

var _operatorsCount2 = _interopRequireDefault(_operatorsCount);

var _operatorsDematerialize = require('./operators/dematerialize');

var _operatorsDematerialize2 = _interopRequireDefault(_operatorsDematerialize);

var _operatorsDebounce = require('./operators/debounce');

var _operatorsDebounce2 = _interopRequireDefault(_operatorsDebounce);

var _operatorsDebounceTime = require('./operators/debounceTime');

var _operatorsDebounceTime2 = _interopRequireDefault(_operatorsDebounceTime);

var _operatorsDefaultIfEmpty = require('./operators/defaultIfEmpty');

var _operatorsDefaultIfEmpty2 = _interopRequireDefault(_operatorsDefaultIfEmpty);

var _operatorsDelay = require('./operators/delay');

var _operatorsDelay2 = _interopRequireDefault(_operatorsDelay);

var _operatorsDistinctUntilChanged = require('./operators/distinctUntilChanged');

var _operatorsDistinctUntilChanged2 = _interopRequireDefault(_operatorsDistinctUntilChanged);

var _operatorsDo = require('./operators/do');

var _operatorsDo2 = _interopRequireDefault(_operatorsDo);

var _operatorsExpand = require('./operators/expand');

var _operatorsExpand2 = _interopRequireDefault(_operatorsExpand);

var _operatorsFilter = require('./operators/filter');

var _operatorsFilter2 = _interopRequireDefault(_operatorsFilter);

var _operatorsFinally = require('./operators/finally');

var _operatorsFinally2 = _interopRequireDefault(_operatorsFinally);

var _operatorsFirst = require('./operators/first');

var _operatorsFirst2 = _interopRequireDefault(_operatorsFirst);

var _operatorsGroupBy = require('./operators/groupBy');

var _operatorsIgnoreElements = require('./operators/ignoreElements');

var _operatorsIgnoreElements2 = _interopRequireDefault(_operatorsIgnoreElements);

var _operatorsEvery = require('./operators/every');

var _operatorsEvery2 = _interopRequireDefault(_operatorsEvery);

var _operatorsLast = require('./operators/last');

var _operatorsLast2 = _interopRequireDefault(_operatorsLast);

var _operatorsMap = require('./operators/map');

var _operatorsMap2 = _interopRequireDefault(_operatorsMap);

var _operatorsMapTo = require('./operators/mapTo');

var _operatorsMapTo2 = _interopRequireDefault(_operatorsMapTo);

var _operatorsMaterialize = require('./operators/materialize');

var _operatorsMaterialize2 = _interopRequireDefault(_operatorsMaterialize);

var _operatorsMerge = require('./operators/merge');

var _operatorsMerge2 = _interopRequireDefault(_operatorsMerge);

var _operatorsMergeAll = require('./operators/mergeAll');

var _operatorsMergeAll2 = _interopRequireDefault(_operatorsMergeAll);

var _operatorsMergeMap = require('./operators/mergeMap');

var _operatorsMergeMap2 = _interopRequireDefault(_operatorsMergeMap);

var _operatorsMergeMapTo = require('./operators/mergeMapTo');

var _operatorsMergeMapTo2 = _interopRequireDefault(_operatorsMergeMapTo);

var _operatorsMulticast = require('./operators/multicast');

var _operatorsMulticast2 = _interopRequireDefault(_operatorsMulticast);

var _operatorsObserveOn = require('./operators/observeOn');

var _operatorsObserveOn2 = _interopRequireDefault(_operatorsObserveOn);

var _operatorsPartition = require('./operators/partition');

var _operatorsPartition2 = _interopRequireDefault(_operatorsPartition);

var _operatorsPublish = require('./operators/publish');

var _operatorsPublish2 = _interopRequireDefault(_operatorsPublish);

var _operatorsPublishBehavior = require('./operators/publishBehavior');

var _operatorsPublishBehavior2 = _interopRequireDefault(_operatorsPublishBehavior);

var _operatorsPublishReplay = require('./operators/publishReplay');

var _operatorsPublishReplay2 = _interopRequireDefault(_operatorsPublishReplay);

var _operatorsReduce = require('./operators/reduce');

var _operatorsReduce2 = _interopRequireDefault(_operatorsReduce);

var _operatorsRepeat = require('./operators/repeat');

var _operatorsRepeat2 = _interopRequireDefault(_operatorsRepeat);

var _operatorsRetry = require('./operators/retry');

var _operatorsRetry2 = _interopRequireDefault(_operatorsRetry);

var _operatorsRetryWhen = require('./operators/retryWhen');

var _operatorsRetryWhen2 = _interopRequireDefault(_operatorsRetryWhen);

var _operatorsSample = require('./operators/sample');

var _operatorsSample2 = _interopRequireDefault(_operatorsSample);

var _operatorsSampleTime = require('./operators/sampleTime');

var _operatorsSampleTime2 = _interopRequireDefault(_operatorsSampleTime);

var _operatorsScan = require('./operators/scan');

var _operatorsScan2 = _interopRequireDefault(_operatorsScan);

var _operatorsShare = require('./operators/share');

var _operatorsShare2 = _interopRequireDefault(_operatorsShare);

var _operatorsShareReplay = require('./operators/shareReplay');

var _operatorsShareReplay2 = _interopRequireDefault(_operatorsShareReplay);

var _operatorsSingle = require('./operators/single');

var _operatorsSingle2 = _interopRequireDefault(_operatorsSingle);

var _operatorsSkip = require('./operators/skip');

var _operatorsSkip2 = _interopRequireDefault(_operatorsSkip);

var _operatorsSkipUntil = require('./operators/skipUntil');

var _operatorsSkipUntil2 = _interopRequireDefault(_operatorsSkipUntil);

var _operatorsStartWith = require('./operators/startWith');

var _operatorsStartWith2 = _interopRequireDefault(_operatorsStartWith);

var _operatorsSubscribeOn = require('./operators/subscribeOn');

var _operatorsSubscribeOn2 = _interopRequireDefault(_operatorsSubscribeOn);

var _operatorsSwitch = require('./operators/switch');

var _operatorsSwitch2 = _interopRequireDefault(_operatorsSwitch);

var _operatorsSwitchMap = require('./operators/switchMap');

var _operatorsSwitchMap2 = _interopRequireDefault(_operatorsSwitchMap);

var _operatorsSwitchMapTo = require('./operators/switchMapTo');

var _operatorsSwitchMapTo2 = _interopRequireDefault(_operatorsSwitchMapTo);

var _operatorsTake = require('./operators/take');

var _operatorsTake2 = _interopRequireDefault(_operatorsTake);

var _operatorsTakeUntil = require('./operators/takeUntil');

var _operatorsTakeUntil2 = _interopRequireDefault(_operatorsTakeUntil);

var _operatorsThrottle = require('./operators/throttle');

var _operatorsThrottle2 = _interopRequireDefault(_operatorsThrottle);

var _operatorsTimeout = require('./operators/timeout');

var _operatorsTimeout2 = _interopRequireDefault(_operatorsTimeout);

var _operatorsTimeoutWith = require('./operators/timeoutWith');

var _operatorsTimeoutWith2 = _interopRequireDefault(_operatorsTimeoutWith);

var _operatorsToArray = require('./operators/toArray');

var _operatorsToArray2 = _interopRequireDefault(_operatorsToArray);

var _operatorsToPromise = require('./operators/toPromise');

var _operatorsToPromise2 = _interopRequireDefault(_operatorsToPromise);

var _operatorsWindow = require('./operators/window');

var _operatorsWindow2 = _interopRequireDefault(_operatorsWindow);

var _operatorsWindowCount = require('./operators/windowCount');

var _operatorsWindowCount2 = _interopRequireDefault(_operatorsWindowCount);

var _operatorsWindowTime = require('./operators/windowTime');

var _operatorsWindowTime2 = _interopRequireDefault(_operatorsWindowTime);

var _operatorsWindowToggle = require('./operators/windowToggle');

var _operatorsWindowToggle2 = _interopRequireDefault(_operatorsWindowToggle);

var _operatorsWindowWhen = require('./operators/windowWhen');

var _operatorsWindowWhen2 = _interopRequireDefault(_operatorsWindowWhen);

var _operatorsWithLatestFrom = require('./operators/withLatestFrom');

var _operatorsWithLatestFrom2 = _interopRequireDefault(_operatorsWithLatestFrom);

var _operatorsZip = require('./operators/zip');

var _operatorsZip2 = _interopRequireDefault(_operatorsZip);

var _operatorsZipAll = require('./operators/zipAll');

var _operatorsZipAll2 = _interopRequireDefault(_operatorsZipAll);

var _Subject = require('./Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _subjectsReplaySubject = require('./subjects/ReplaySubject');

var _subjectsReplaySubject2 = _interopRequireDefault(_subjectsReplaySubject);

var _subjectsBehaviorSubject = require('./subjects/BehaviorSubject');

var _subjectsBehaviorSubject2 = _interopRequireDefault(_subjectsBehaviorSubject);

var _observablesConnectableObservable = require('./observables/ConnectableObservable');

var _observablesConnectableObservable2 = _interopRequireDefault(_observablesConnectableObservable);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _utilEmptyError = require('./util/EmptyError');

var _utilEmptyError2 = _interopRequireDefault(_utilEmptyError);

var _utilArgumentOutOfRangeError = require('./util/ArgumentOutOfRangeError');

var _utilArgumentOutOfRangeError2 = _interopRequireDefault(_utilArgumentOutOfRangeError);

var _schedulersNextTick = require('./schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

var _schedulersImmediate = require('./schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

_Observable2['default'].combineLatest = _operatorsCombineLatestStatic2['default'];

_Observable2['default'].concat = _operatorsConcatStatic2['default'];

_Observable2['default'].defer = _observablesDeferObservable2['default'].create;

_Observable2['default'].empty = _observablesEmptyObservable2['default'].create;

_Observable2['default'].forkJoin = _observablesForkJoinObservable2['default'].create;

_Observable2['default'].from = _observablesFromObservable2['default'].create;

_Observable2['default'].fromArray = _observablesArrayObservable2['default'].create;

_Observable2['default'].fromEvent = _observablesFromEventObservable2['default'].create;

_Observable2['default'].fromEventPattern = _observablesFromEventPatternObservable2['default'].create;

_Observable2['default'].fromPromise = _observablesPromiseObservable2['default'].create;

_Observable2['default'].interval = _observablesIntervalObservable2['default'].create;

_Observable2['default'].merge = _operatorsMergeStatic2['default'];

_Observable2['default'].never = _observablesInfiniteObservable2['default'].create;
_Observable2['default'].of = _observablesArrayObservable2['default'].of;

_Observable2['default'].range = _observablesRangeObservable2['default'].create;

_Observable2['default']['throw'] = _observablesErrorObservable2['default'].create;

_Observable2['default'].timer = _observablesTimerObservable2['default'].create;

_Observable2['default'].zip = _operatorsZipStatic2['default'];
var observableProto = _Observable2['default'].prototype;

observableProto.buffer = _operatorsBuffer2['default'];

observableProto.bufferCount = _operatorsBufferCount2['default'];

observableProto.bufferTime = _operatorsBufferTime2['default'];

observableProto.bufferToggle = _operatorsBufferToggle2['default'];

observableProto.bufferWhen = _operatorsBufferWhen2['default'];

observableProto['catch'] = _operatorsCatch2['default'];

observableProto.combineAll = _operatorsCombineAll2['default'];

observableProto.combineLatest = _operatorsCombineLatest2['default'];

observableProto.concat = _operatorsConcat2['default'];

observableProto.concatAll = _operatorsConcatAll2['default'];

observableProto.concatMap = _operatorsConcatMap2['default'];

observableProto.concatMapTo = _operatorsConcatMapTo2['default'];

observableProto.count = _operatorsCount2['default'];

observableProto.dematerialize = _operatorsDematerialize2['default'];

observableProto.debounce = _operatorsDebounce2['default'];

observableProto.debounceTime = _operatorsDebounceTime2['default'];

observableProto.defaultIfEmpty = _operatorsDefaultIfEmpty2['default'];

observableProto.delay = _operatorsDelay2['default'];

observableProto.distinctUntilChanged = _operatorsDistinctUntilChanged2['default'];

observableProto['do'] = _operatorsDo2['default'];

observableProto.expand = _operatorsExpand2['default'];

observableProto.filter = _operatorsFilter2['default'];

observableProto['finally'] = _operatorsFinally2['default'];

observableProto.first = _operatorsFirst2['default'];

observableProto.groupBy = _operatorsGroupBy.groupBy;

observableProto.ignoreElements = _operatorsIgnoreElements2['default'];

observableProto.every = _operatorsEvery2['default'];

observableProto.last = _operatorsLast2['default'];

observableProto.map = _operatorsMap2['default'];

observableProto.mapTo = _operatorsMapTo2['default'];

observableProto.materialize = _operatorsMaterialize2['default'];

observableProto.merge = _operatorsMerge2['default'];

observableProto.mergeAll = _operatorsMergeAll2['default'];

observableProto.mergeMap = _operatorsMergeMap2['default'];
observableProto.flatMap = _operatorsMergeMap2['default'];

observableProto.mergeMapTo = _operatorsMergeMapTo2['default'];
observableProto.flatMapTo = _operatorsMergeMapTo2['default'];

observableProto.multicast = _operatorsMulticast2['default'];

observableProto.observeOn = _operatorsObserveOn2['default'];

observableProto.partition = _operatorsPartition2['default'];

observableProto.publish = _operatorsPublish2['default'];

observableProto.publishBehavior = _operatorsPublishBehavior2['default'];

observableProto.publishReplay = _operatorsPublishReplay2['default'];

observableProto.reduce = _operatorsReduce2['default'];

observableProto.repeat = _operatorsRepeat2['default'];

observableProto.retry = _operatorsRetry2['default'];

observableProto.retryWhen = _operatorsRetryWhen2['default'];

observableProto.sample = _operatorsSample2['default'];

observableProto.sampleTime = _operatorsSampleTime2['default'];

observableProto.scan = _operatorsScan2['default'];

observableProto.share = _operatorsShare2['default'];

observableProto.shareReplay = _operatorsShareReplay2['default'];

observableProto.single = _operatorsSingle2['default'];

observableProto.skip = _operatorsSkip2['default'];

observableProto.skipUntil = _operatorsSkipUntil2['default'];

observableProto.startWith = _operatorsStartWith2['default'];

observableProto.subscribeOn = _operatorsSubscribeOn2['default'];

observableProto['switch'] = _operatorsSwitch2['default'];

observableProto.switchMap = _operatorsSwitchMap2['default'];

observableProto.switchMapTo = _operatorsSwitchMapTo2['default'];

observableProto.take = _operatorsTake2['default'];

observableProto.takeUntil = _operatorsTakeUntil2['default'];

observableProto.throttle = _operatorsThrottle2['default'];

observableProto.timeout = _operatorsTimeout2['default'];

observableProto.timeoutWith = _operatorsTimeoutWith2['default'];

observableProto.toArray = _operatorsToArray2['default'];

observableProto.toPromise = _operatorsToPromise2['default'];

observableProto.window = _operatorsWindow2['default'];

observableProto.windowCount = _operatorsWindowCount2['default'];

observableProto.windowTime = _operatorsWindowTime2['default'];

observableProto.windowToggle = _operatorsWindowToggle2['default'];

observableProto.windowWhen = _operatorsWindowWhen2['default'];

observableProto.withLatestFrom = _operatorsWithLatestFrom2['default'];

observableProto.zip = _operatorsZip2['default'];

observableProto.zipAll = _operatorsZipAll2['default'];

var Scheduler = {
    nextTick: _schedulersNextTick2['default'],
    immediate: _schedulersImmediate2['default']
};
exports.Subject = _Subject2['default'];
exports.Scheduler = Scheduler;
exports.Observable = _Observable2['default'];
exports.Subscriber = _Subscriber2['default'];
exports.Subscription = _Subscription2['default'];
exports.ReplaySubject = _subjectsReplaySubject2['default'];
exports.BehaviorSubject = _subjectsBehaviorSubject2['default'];
exports.ConnectableObservable = _observablesConnectableObservable2['default'];
exports.Notification = _Notification2['default'];
exports.EmptyError = _utilEmptyError2['default'];
exports.ArgumentOutOfRangeError = _utilArgumentOutOfRangeError2['default'];
},{"./Notification":2,"./Observable":3,"./Subject":6,"./Subscriber":7,"./Subscription":8,"./observables/ArrayObservable":9,"./observables/ConnectableObservable":10,"./observables/DeferObservable":11,"./observables/EmptyObservable":12,"./observables/ErrorObservable":13,"./observables/ForkJoinObservable":14,"./observables/FromEventObservable":15,"./observables/FromEventPatternObservable":16,"./observables/FromObservable":17,"./observables/InfiniteObservable":18,"./observables/IntervalObservable":19,"./observables/PromiseObservable":21,"./observables/RangeObservable":22,"./observables/TimerObservable":25,"./operators/buffer":26,"./operators/bufferCount":27,"./operators/bufferTime":28,"./operators/bufferToggle":29,"./operators/bufferWhen":30,"./operators/catch":31,"./operators/combineAll":32,"./operators/combineLatest":35,"./operators/combineLatest-static":33,"./operators/concat":37,"./operators/concat-static":36,"./operators/concatAll":38,"./operators/concatMap":39,"./operators/concatMapTo":40,"./operators/count":41,"./operators/debounce":42,"./operators/debounceTime":43,"./operators/defaultIfEmpty":44,"./operators/delay":45,"./operators/dematerialize":46,"./operators/distinctUntilChanged":47,"./operators/do":48,"./operators/every":49,"./operators/expand":51,"./operators/filter":52,"./operators/finally":53,"./operators/first":54,"./operators/groupBy":56,"./operators/ignoreElements":57,"./operators/last":58,"./operators/map":59,"./operators/mapTo":60,"./operators/materialize":61,"./operators/merge":63,"./operators/merge-static":62,"./operators/mergeAll":65,"./operators/mergeMap":67,"./operators/mergeMapTo":69,"./operators/multicast":70,"./operators/observeOn":72,"./operators/partition":73,"./operators/publish":74,"./operators/publishBehavior":75,"./operators/publishReplay":76,"./operators/reduce":77,"./operators/repeat":78,"./operators/retry":79,"./operators/retryWhen":80,"./operators/sample":81,"./operators/sampleTime":82,"./operators/scan":83,"./operators/share":84,"./operators/shareReplay":85,"./operators/single":86,"./operators/skip":87,"./operators/skipUntil":88,"./operators/startWith":89,"./operators/subscribeOn":90,"./operators/switch":91,"./operators/switchMap":92,"./operators/switchMapTo":93,"./operators/take":94,"./operators/takeUntil":95,"./operators/throttle":96,"./operators/timeout":97,"./operators/timeoutWith":98,"./operators/toArray":99,"./operators/toPromise":100,"./operators/window":101,"./operators/windowCount":102,"./operators/windowTime":103,"./operators/windowToggle":104,"./operators/windowWhen":105,"./operators/withLatestFrom":106,"./operators/zip":109,"./operators/zip-static":107,"./operators/zipAll":110,"./schedulers/immediate":116,"./schedulers/nextTick":117,"./subjects/BehaviorSubject":118,"./subjects/ReplaySubject":119,"./util/ArgumentOutOfRangeError":121,"./util/EmptyError":122}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _subjectsSubjectSubscription = require('./subjects/SubjectSubscription');

var _subjectsSubjectSubscription2 = _interopRequireDefault(_subjectsSubjectSubscription);

var subscriptionAdd = _Subscription2['default'].prototype.add;
var subscriptionRemove = _Subscription2['default'].prototype.remove;
var subscriptionUnsubscribe = _Subscription2['default'].prototype.unsubscribe;
var subscriberNext = _Subscriber2['default'].prototype.next;
var subscriberError = _Subscriber2['default'].prototype.error;
var subscriberComplete = _Subscriber2['default'].prototype.complete;
var _subscriberNext = _Subscriber2['default'].prototype._next;
var _subscriberError = _Subscriber2['default'].prototype._error;
var _subscriberComplete = _Subscriber2['default'].prototype._complete;

var Subject = (function (_Observable) {
    _inherits(Subject, _Observable);

    function Subject() {
        _classCallCheck(this, Subject);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _Observable.call.apply(_Observable, [this].concat(args));
        this.observers = [];
        this.isUnsubscribed = false;
        this.dispatching = false;
        this.errorSignal = false;
        this.completeSignal = false;
    }

    Subject.create = function create(source, destination) {
        return new BidirectionalSubject(source, destination);
    };

    Subject.prototype.lift = function lift(operator) {
        var subject = new BidirectionalSubject(this, this.destination || this);
        subject.operator = operator;
        return subject;
    };

    Subject.prototype._subscribe = function _subscribe(subscriber) {
        if (subscriber.isUnsubscribed) {
            return;
        } else if (this.errorSignal) {
            subscriber.error(this.errorInstance);
            return;
        } else if (this.completeSignal) {
            subscriber.complete();
            return;
        } else if (this.isUnsubscribed) {
            throw new Error("Cannot subscribe to a disposed Subject.");
        }
        this.observers.push(subscriber);
        return new _subjectsSubjectSubscription2['default'](this, subscriber);
    };

    Subject.prototype.add = function add(subscription) {
        subscriptionAdd.call(this, subscription);
    };

    Subject.prototype.remove = function remove(subscription) {
        subscriptionRemove.call(this, subscription);
    };

    Subject.prototype.unsubscribe = function unsubscribe() {
        this.observers = void 0;
        subscriptionUnsubscribe.call(this);
    };

    Subject.prototype.next = function next(value) {
        if (this.isUnsubscribed) {
            return;
        }
        this.dispatching = true;
        this._next(value);
        this.dispatching = false;
        if (this.errorSignal) {
            this.error(this.errorInstance);
        } else if (this.completeSignal) {
            this.complete();
        }
    };

    Subject.prototype.error = function error(_error) {
        if (this.isUnsubscribed || this.completeSignal) {
            return;
        }
        this.errorSignal = true;
        this.errorInstance = _error;
        if (this.dispatching) {
            return;
        }
        this._error(_error);
        this.unsubscribe();
    };

    Subject.prototype.complete = function complete() {
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

    Subject.prototype._next = function _next(value) {
        var index = -1;
        var observers = this.observers.slice(0);
        var len = observers.length;
        while (++index < len) {
            observers[index].next(value);
        }
    };

    Subject.prototype._error = function _error(error) {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        // optimization -- block next, complete, and unsubscribe while dispatching
        this.observers = void 0;
        this.isUnsubscribed = true;
        while (++index < len) {
            observers[index].error(error);
        }
        this.isUnsubscribed = false;
    };

    Subject.prototype._complete = function _complete() {
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
})(_Observable3['default']);

exports['default'] = Subject;

var BidirectionalSubject = (function (_Subject) {
    _inherits(BidirectionalSubject, _Subject);

    function BidirectionalSubject(source, destination) {
        _classCallCheck(this, BidirectionalSubject);

        _Subject.call(this);
        this.source = source;
        this.destination = destination;
    }

    BidirectionalSubject.prototype._subscribe = function _subscribe(subscriber) {
        var operator = this.operator;
        return this.source._subscribe.call(this.source, operator ? operator.call(subscriber) : subscriber);
    };

    BidirectionalSubject.prototype.next = function next(x) {
        subscriberNext.call(this, x);
    };

    BidirectionalSubject.prototype.error = function error(e) {
        subscriberError.call(this, e);
    };

    BidirectionalSubject.prototype.complete = function complete() {
        subscriberComplete.call(this);
    };

    BidirectionalSubject.prototype._next = function _next(x) {
        _subscriberNext.call(this, x);
    };

    BidirectionalSubject.prototype._error = function _error(e) {
        _subscriberError.call(this, e);
    };

    BidirectionalSubject.prototype._complete = function _complete() {
        _subscriberComplete.call(this);
    };

    return BidirectionalSubject;
})(Subject);

module.exports = exports['default'];
},{"./Observable":3,"./Subscriber":7,"./Subscription":8,"./subjects/SubjectSubscription":120}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilNoop = require('./util/noop');

var _utilNoop2 = _interopRequireDefault(_utilNoop);

var _utilThrowError = require('./util/throwError');

var _utilThrowError2 = _interopRequireDefault(_utilThrowError);

var _utilTryOrOnError = require('./util/tryOrOnError');

var _utilTryOrOnError2 = _interopRequireDefault(_utilTryOrOnError);

var _Subscription2 = require('./Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var Subscriber = (function (_Subscription) {
    _inherits(Subscriber, _Subscription);

    function Subscriber(destination) {
        _classCallCheck(this, Subscriber);

        _Subscription.call(this);
        this._isUnsubscribed = false;
        this.destination = destination;
        if (!destination) {
            return;
        }
        var subscription = destination._subscription;
        if (subscription) {
            this._subscription = subscription;
        } else if (destination instanceof Subscriber) {
            this._subscription = destination;
        }
    }

    Subscriber.create = function create(next, error, complete) {
        var subscriber = new Subscriber();
        subscriber._next = typeof next === "function" && _utilTryOrOnError2['default'](next) || _utilNoop2['default'];
        subscriber._error = typeof error === "function" && error || _utilThrowError2['default'];
        subscriber._complete = typeof complete === "function" && complete || _utilNoop2['default'];
        return subscriber;
    };

    Subscriber.prototype._next = function _next(value) {
        this.destination.next(value);
    };

    Subscriber.prototype._error = function _error(err) {
        this.destination.error(err);
    };

    Subscriber.prototype._complete = function _complete() {
        this.destination.complete();
    };

    Subscriber.prototype.add = function add(sub) {
        // route add to the shared Subscription if it exists
        var _subscription = this._subscription;
        if (_subscription) {
            _subscription.add(sub);
        } else {
            _Subscription.prototype.add.call(this, sub);
        }
    };

    Subscriber.prototype.remove = function remove(sub) {
        // route remove to the shared Subscription if it exists
        if (this._subscription) {
            this._subscription.remove(sub);
        } else {
            _Subscription.prototype.remove.call(this, sub);
        }
    };

    Subscriber.prototype.unsubscribe = function unsubscribe() {
        if (this._isUnsubscribed) {
            return;
        } else if (this._subscription) {
            this._isUnsubscribed = true;
        } else {
            _Subscription.prototype.unsubscribe.call(this);
        }
    };

    Subscriber.prototype.next = function next(value) {
        if (!this.isUnsubscribed) {
            this._next(value);
        }
    };

    Subscriber.prototype.error = function error(_error2) {
        if (!this.isUnsubscribed) {
            this._error(_error2);
            this.unsubscribe();
        }
    };

    Subscriber.prototype.complete = function complete() {
        if (!this.isUnsubscribed) {
            this._complete();
            this.unsubscribe();
        }
    };

    _createClass(Subscriber, [{
        key: 'isUnsubscribed',
        get: function get() {
            var subscription = this._subscription;
            if (subscription) {
                // route to the shared Subscription if it exists
                return this._isUnsubscribed || subscription.isUnsubscribed;
            } else {
                return this._isUnsubscribed;
            }
        },
        set: function set(value) {
            var subscription = this._subscription;
            if (subscription) {
                // route to the shared Subscription if it exists
                subscription.isUnsubscribed = Boolean(value);
            } else {
                this._isUnsubscribed = Boolean(value);
            }
        }
    }]);

    return Subscriber;
})(_Subscription3['default']);

exports['default'] = Subscriber;
module.exports = exports['default'];
},{"./Subscription":8,"./util/noop":132,"./util/throwError":136,"./util/tryOrOnError":138}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = (function () {
    function Subscription(_unsubscribe) {
        _classCallCheck(this, Subscription);

        this.isUnsubscribed = false;
        if (_unsubscribe) {
            this._unsubscribe = _unsubscribe;
        }
    }

    Subscription.prototype._unsubscribe = function _unsubscribe() {};

    Subscription.prototype.unsubscribe = function unsubscribe() {
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

    Subscription.prototype.add = function add(subscription) {
        // return early if:
        //  1. the subscription is null
        //  2. we're attempting to add our this
        //  3. we're attempting to add the static `empty` Subscription
        if (!subscription || subscription === this || subscription === Subscription.EMPTY) {
            return;
        }
        var sub = subscription;
        switch (typeof subscription) {
            case "function":
                sub = new Subscription(subscription);
            case "object":
                if (sub.isUnsubscribed || typeof sub.unsubscribe !== "function") {
                    break;
                } else if (this.isUnsubscribed) {
                    sub.unsubscribe();
                } else {
                    var subscriptions = this._subscriptions || (this._subscriptions = []);
                    subscriptions.push(sub);
                }
                break;
            default:
                throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
        }
    };

    Subscription.prototype.remove = function remove(subscription) {
        // return early if:
        //  1. the subscription is null
        //  2. we're attempting to remove ourthis
        //  3. we're attempting to remove the static `empty` Subscription
        if (subscription == null || subscription === this || subscription === Subscription.EMPTY) {
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

    return Subscription;
})();

exports["default"] = Subscription;

Subscription.EMPTY = (function (empty) {
    empty.isUnsubscribed = true;
    return empty;
})(new Subscription());
module.exports = exports["default"];
},{}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _ScalarObservable = require('./ScalarObservable');

var _ScalarObservable2 = _interopRequireDefault(_ScalarObservable);

var _EmptyObservable = require('./EmptyObservable');

var _EmptyObservable2 = _interopRequireDefault(_EmptyObservable);

var ArrayObservable = (function (_Observable) {
    _inherits(ArrayObservable, _Observable);

    function ArrayObservable(array, scheduler) {
        _classCallCheck(this, ArrayObservable);

        _Observable.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }

    ArrayObservable.create = function create(array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };

    ArrayObservable.of = function of() {
        for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
            array[_key] = arguments[_key];
        }

        var scheduler = array[array.length - 1];
        if (scheduler && typeof scheduler.schedule === 'function') {
            array.pop();
        } else {
            scheduler = void 0;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        } else if (len === 1) {
            return new _ScalarObservable2['default'](array[0], scheduler);
        } else {
            return new _EmptyObservable2['default'](scheduler);
        }
    };

    ArrayObservable.dispatch = function dispatch(state) {
        var array = state.array;
        var index = state.index;
        var count = state.count;
        var subscriber = state.subscriber;

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

    ArrayObservable.prototype._subscribe = function _subscribe(subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            }));
        } else {
            for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };

    return ArrayObservable;
})(_Observable3['default']);

exports['default'] = ArrayObservable;
module.exports = exports['default'];
},{"../Observable":3,"./EmptyObservable":12,"./ScalarObservable":23}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable3 = require('../Observable');

var _Observable4 = _interopRequireDefault(_Observable3);

var _Subscription3 = require('../Subscription');

var _Subscription4 = _interopRequireDefault(_Subscription3);

var ConnectableObservable = (function (_Observable) {
    _inherits(ConnectableObservable, _Observable);

    function ConnectableObservable(source, subjectFactory) {
        _classCallCheck(this, ConnectableObservable);

        _Observable.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
    }

    ConnectableObservable.prototype._subscribe = function _subscribe(subscriber) {
        return this._getSubject().subscribe(subscriber);
    };

    ConnectableObservable.prototype._getSubject = function _getSubject() {
        var subject = this.subject;
        if (subject && !subject.isUnsubscribed) {
            return subject;
        }
        return this.subject = this.subjectFactory();
    };

    ConnectableObservable.prototype.connect = function connect() {
        var source = this.source;
        var subscription = this.subscription;
        if (subscription && !subscription.isUnsubscribed) {
            return subscription;
        }
        subscription = source.subscribe(this._getSubject());
        subscription.add(new ConnectableSubscription(this));
        return this.subscription = subscription;
    };

    ConnectableObservable.prototype.refCount = function refCount() {
        return new RefCountObservable(this);
    };

    return ConnectableObservable;
})(_Observable4['default']);

exports['default'] = ConnectableObservable;

var ConnectableSubscription = (function (_Subscription) {
    _inherits(ConnectableSubscription, _Subscription);

    function ConnectableSubscription(connectable) {
        _classCallCheck(this, ConnectableSubscription);

        _Subscription.call(this);
        this.connectable = connectable;
    }

    ConnectableSubscription.prototype._unsubscribe = function _unsubscribe() {
        var connectable = this.connectable;
        connectable.subject = void 0;
        connectable.subscription = void 0;
        this.connectable = void 0;
    };

    return ConnectableSubscription;
})(_Subscription4['default']);

var RefCountObservable = (function (_Observable2) {
    _inherits(RefCountObservable, _Observable2);

    function RefCountObservable(connectable) {
        var refCount = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, RefCountObservable);

        _Observable2.call(this);
        this.connectable = connectable;
        this.refCount = refCount;
    }

    RefCountObservable.prototype._subscribe = function _subscribe(subscriber) {
        var connectable = this.connectable;
        var subscription = connectable.subscribe(subscriber);
        if (++this.refCount === 1) {
            this.connection = connectable.connect();
        }
        subscription.add(new RefCountSubscription(this));
        return subscription;
    };

    return RefCountObservable;
})(_Observable4['default']);

var RefCountSubscription = (function (_Subscription2) {
    _inherits(RefCountSubscription, _Subscription2);

    function RefCountSubscription(refCountObservable) {
        _classCallCheck(this, RefCountSubscription);

        _Subscription2.call(this);
        this.refCountObservable = refCountObservable;
    }

    RefCountSubscription.prototype._unsubscribe = function _unsubscribe() {
        var observable = this.refCountObservable;
        if (--observable.refCount === 0) {
            observable.connection.unsubscribe();
            observable.connection = void 0;
        }
    };

    return RefCountSubscription;
})(_Subscription4['default']);

module.exports = exports['default'];
},{"../Observable":3,"../Subscription":8}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var DeferObservable = (function (_Observable) {
    _inherits(DeferObservable, _Observable);

    function DeferObservable(observableFactory) {
        _classCallCheck(this, DeferObservable);

        _Observable.call(this);
        this.observableFactory = observableFactory;
    }

    DeferObservable.create = function create(observableFactory) {
        return new DeferObservable(observableFactory);
    };

    DeferObservable.prototype._subscribe = function _subscribe(subscriber) {
        var result = _utilTryCatch2['default'](this.observableFactory)();
        if (result === _utilErrorObject.errorObject) {
            subscriber.error(_utilErrorObject.errorObject.e);
        } else {
            result.subscribe(subscriber);
        }
    };

    return DeferObservable;
})(_Observable3['default']);

exports['default'] = DeferObservable;
module.exports = exports['default'];
},{"../Observable":3,"../util/errorObject":129,"../util/tryCatch":137}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var EmptyObservable = (function (_Observable) {
    _inherits(EmptyObservable, _Observable);

    function EmptyObservable(scheduler) {
        _classCallCheck(this, EmptyObservable);

        _Observable.call(this);
        this.scheduler = scheduler;
    }

    EmptyObservable.create = function create(scheduler) {
        return new EmptyObservable(scheduler);
    };

    EmptyObservable.dispatch = function dispatch(_ref) {
        var subscriber = _ref.subscriber;

        subscriber.complete();
    };

    EmptyObservable.prototype._subscribe = function _subscribe(subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber }));
        } else {
            subscriber.complete();
        }
    };

    return EmptyObservable;
})(_Observable3['default']);

exports['default'] = EmptyObservable;
module.exports = exports['default'];
},{"../Observable":3}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ErrorObservable = (function (_Observable) {
    _inherits(ErrorObservable, _Observable);

    function ErrorObservable(error, scheduler) {
        _classCallCheck(this, ErrorObservable);

        _Observable.call(this);
        this.error = error;
        this.scheduler = scheduler;
    }

    ErrorObservable.create = function create(error, scheduler) {
        return new ErrorObservable(error, scheduler);
    };

    ErrorObservable.dispatch = function dispatch(_ref) {
        var error = _ref.error;
        var subscriber = _ref.subscriber;

        subscriber.error(error);
    };

    ErrorObservable.prototype._subscribe = function _subscribe(subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(ErrorObservable.dispatch, 0, {
                error: error, subscriber: subscriber
            }));
        } else {
            subscriber.error(error);
        }
    };

    return ErrorObservable;
})(_Observable3['default']);

exports['default'] = ErrorObservable;
module.exports = exports['default'];
},{"../Observable":3}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var ForkJoinObservable = (function (_Observable) {
    _inherits(ForkJoinObservable, _Observable);

    function ForkJoinObservable(observables) {
        _classCallCheck(this, ForkJoinObservable);

        _Observable.call(this);
        this.observables = observables;
    }

    ForkJoinObservable.create = function create() {
        for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
            observables[_key] = arguments[_key];
        }

        return new ForkJoinObservable(observables);
    };

    ForkJoinObservable.prototype._subscribe = function _subscribe(subscriber) {
        var observables = this.observables;
        var len = observables.length;
        var context = { complete: 0, total: len, values: emptyArray(len) };
        for (var i = 0; i < len; i++) {
            observables[i].subscribe(new AllSubscriber(subscriber, this, i, context));
        }
    };

    return ForkJoinObservable;
})(_Observable3['default']);

exports['default'] = ForkJoinObservable;

var AllSubscriber = (function (_Subscriber) {
    _inherits(AllSubscriber, _Subscriber);

    function AllSubscriber(destination, parent, index, context) {
        _classCallCheck(this, AllSubscriber);

        _Subscriber.call(this, destination);
        this.parent = parent;
        this.index = index;
        this.context = context;
    }

    AllSubscriber.prototype._next = function _next(value) {
        this._value = value;
    };

    AllSubscriber.prototype._complete = function _complete() {
        var context = this.context;
        context.values[this.index] = this._value;
        if (context.values.every(hasValue)) {
            this.destination.next(context.values);
            this.destination.complete();
        }
    };

    return AllSubscriber;
})(_Subscriber3['default']);

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
module.exports = exports['default'];
},{"../Observable":3,"../Subscriber":7}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var FromEventObservable = (function (_Observable) {
    _inherits(FromEventObservable, _Observable);

    function FromEventObservable(sourceObj, eventName, selector) {
        _classCallCheck(this, FromEventObservable);

        _Observable.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
    }

    FromEventObservable.create = function create(sourceObj, eventName, selector) {
        return new FromEventObservable(sourceObj, eventName, selector);
    };

    FromEventObservable.setupSubscription = function setupSubscription(sourceObj, eventName, handler, subscriber) {
        var unsubscribe = undefined;
        var tag = sourceObj.toString();
        if (tag === '[object NodeList]' || tag === '[object HTMLCollection]') {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
            }
        } else if (typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function') {
            sourceObj.addEventListener(eventName, handler);
            unsubscribe = function () {
                return sourceObj.removeEventListener(eventName, handler);
            };
        } else if (typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function') {
            sourceObj.on(eventName, handler);
            unsubscribe = function () {
                return sourceObj.off(eventName, handler);
            };
        } else if (typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function') {
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () {
                return sourceObj.removeListener(eventName, handler);
            };
        }
        subscriber.add(new _Subscription2['default'](unsubscribe));
    };

    FromEventObservable.prototype._subscribe = function _subscribe(subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var selector = this.selector;
        var handler = selector ? function (e) {
            var result = _utilTryCatch2['default'](selector)(e);
            if (result === _utilErrorObject.errorObject) {
                subscriber.error(result.e);
            } else {
                subscriber.next(result);
            }
        } : function (e) {
            return subscriber.next(e);
        };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
    };

    return FromEventObservable;
})(_Observable3['default']);

exports['default'] = FromEventObservable;
module.exports = exports['default'];
},{"../Observable":3,"../Subscription":8,"../util/errorObject":129,"../util/tryCatch":137}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var FromEventPatternObservable = (function (_Observable) {
    _inherits(FromEventPatternObservable, _Observable);

    function FromEventPatternObservable(addHandler, removeHandler, selector) {
        _classCallCheck(this, FromEventPatternObservable);

        _Observable.call(this);
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.selector = selector;
    }

    FromEventPatternObservable.create = function create(addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
    };

    FromEventPatternObservable.prototype._subscribe = function _subscribe(subscriber) {
        var addHandler = this.addHandler;
        var removeHandler = this.removeHandler;
        var selector = this.selector;
        var handler = selector ? function (e) {
            var result = _utilTryCatch2['default'](selector).apply(null, arguments);
            if (result === _utilErrorObject.errorObject) {
                subscriber.error(result.e);
            } else {
                subscriber.next(result);
            }
        } : function (e) {
            subscriber.next(e);
        };
        var result = _utilTryCatch2['default'](addHandler)(handler);
        if (result === _utilErrorObject.errorObject) {
            subscriber.error(result.e);
        }
        subscriber.add(new _Subscription2['default'](function () {
            //TODO: determine whether or not to forward to error handler
            removeHandler(handler);
        }));
    };

    return FromEventPatternObservable;
})(_Observable3['default']);

exports['default'] = FromEventPatternObservable;
module.exports = exports['default'];
},{"../Observable":3,"../Subscription":8,"../util/errorObject":129,"../util/tryCatch":137}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PromiseObservable = require('./PromiseObservable');

var _PromiseObservable2 = _interopRequireDefault(_PromiseObservable);

var _IteratorObservable = require('./IteratorObservable');

var _IteratorObservable2 = _interopRequireDefault(_IteratorObservable);

var _ArrayObservable = require('./ArrayObservable');

var _ArrayObservable2 = _interopRequireDefault(_ArrayObservable);

var _utilSymbol_observable = require('../util/Symbol_observable');

var _utilSymbol_observable2 = _interopRequireDefault(_utilSymbol_observable);

var _utilSymbol_iterator = require('../util/Symbol_iterator');

var _utilSymbol_iterator2 = _interopRequireDefault(_utilSymbol_iterator);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _operatorsObserveOnSupport = require('../operators/observeOn-support');

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var isArray = Array.isArray;

var FromObservable = (function (_Observable) {
    _inherits(FromObservable, _Observable);

    function FromObservable(ish, scheduler) {
        _classCallCheck(this, FromObservable);

        _Observable.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }

    FromObservable.create = function create(ish) {
        var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersImmediate2['default'] : arguments[1];

        if (ish) {
            if (isArray(ish)) {
                return new _ArrayObservable2['default'](ish, scheduler);
            } else if (typeof ish.then === 'function') {
                return new _PromiseObservable2['default'](ish, scheduler);
            } else if (typeof ish[_utilSymbol_observable2['default']] === 'function') {
                if (ish instanceof _Observable3['default']) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            } else if (typeof ish[_utilSymbol_iterator2['default']] === 'function') {
                return new _IteratorObservable2['default'](ish, null, null, scheduler);
            }
        }
        throw new TypeError(typeof ish + ' is not observable');
    };

    FromObservable.prototype._subscribe = function _subscribe(subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler === _schedulersImmediate2['default']) {
            return this.ish[_utilSymbol_observable2['default']]().subscribe(subscriber);
        } else {
            return this.ish[_utilSymbol_observable2['default']]().subscribe(new _operatorsObserveOnSupport.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };

    return FromObservable;
})(_Observable3['default']);

exports['default'] = FromObservable;
module.exports = exports['default'];
},{"../Observable":3,"../operators/observeOn-support":71,"../schedulers/immediate":116,"../util/Symbol_iterator":126,"../util/Symbol_observable":127,"./ArrayObservable":9,"./IteratorObservable":20,"./PromiseObservable":21}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var InfiniteObservable = (function (_Observable) {
    _inherits(InfiniteObservable, _Observable);

    function InfiniteObservable() {
        _classCallCheck(this, InfiniteObservable);

        _Observable.call(this);
    }

    InfiniteObservable.create = function create() {
        return new InfiniteObservable();
    };

    InfiniteObservable.prototype._subscribe = function _subscribe(subscriber) {};

    return InfiniteObservable;
})(_Observable3['default']);

exports['default'] = InfiniteObservable;
module.exports = exports['default'];
},{"../Observable":3}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilIsNumeric = require('../util/isNumeric');

var _utilIsNumeric2 = _interopRequireDefault(_utilIsNumeric);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

var IntervalObservable = (function (_Observable) {
    _inherits(IntervalObservable, _Observable);

    function IntervalObservable() {
        var period = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersNextTick2['default'] : arguments[1];

        _classCallCheck(this, IntervalObservable);

        _Observable.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!_utilIsNumeric2['default'](period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = _schedulersNextTick2['default'];
        }
    }

    IntervalObservable.create = function create() {
        var period = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersNextTick2['default'] : arguments[1];

        return new IntervalObservable(period, scheduler);
    };

    IntervalObservable.dispatch = function dispatch(state) {
        var index = state.index;
        var subscriber = state.subscriber;
        var period = state.period;

        subscriber.next(index);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };

    IntervalObservable.prototype._subscribe = function _subscribe(subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };

    return IntervalObservable;
})(_Observable3['default']);

exports['default'] = IntervalObservable;
module.exports = exports['default'];
},{"../Observable":3,"../schedulers/nextTick":117,"../util/isNumeric":131}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utilRoot = require('../util/root');

var _utilSymbol_iterator = require('../util/Symbol_iterator');

var _utilSymbol_iterator2 = _interopRequireDefault(_utilSymbol_iterator);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var IteratorObservable = (function (_Observable) {
    _inherits(IteratorObservable, _Observable);

    function IteratorObservable(iterator, project, thisArg, scheduler) {
        _classCallCheck(this, IteratorObservable);

        _Observable.call(this);
        this.iterator = iterator;
        this.project = project;
        this.thisArg = thisArg;
        this.scheduler = scheduler;
    }

    IteratorObservable.create = function create(iterator, project, thisArg, scheduler) {
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        if (project && typeof project !== 'function') {
            throw new Error('When provided, `project` must be a function.');
        }
        return new IteratorObservable(iterator, project, thisArg, scheduler);
    };

    IteratorObservable.dispatch = function dispatch(state) {
        var index = state.index;
        var hasError = state.hasError;
        var thisArg = state.thisArg;
        var project = state.project;
        var iterator = state.iterator;
        var subscriber = state.subscriber;

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
            result = _utilTryCatch2['default'](project).call(thisArg, result.value, index);
            if (result === _utilErrorObject.errorObject) {
                state.error = _utilErrorObject.errorObject.e;
                state.hasError = true;
            } else {
                subscriber.next(result);
                state.index = index + 1;
            }
        } else {
            subscriber.next(result.value);
            state.index = index + 1;
        }
        if (subscriber.isUnsubscribed) {
            return;
        }
        this.schedule(state);
    };

    IteratorObservable.prototype._subscribe = function _subscribe(subscriber) {
        var index = 0;
        var project = this.project;
        var thisArg = this.thisArg;
        var iterator = getIterator(Object(this.iterator));
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, thisArg: thisArg, project: project, iterator: iterator, subscriber: subscriber
            }));
        } else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                } else if (project) {
                    result = _utilTryCatch2['default'](project).call(thisArg, result.value, index++);
                    if (result === _utilErrorObject.errorObject) {
                        subscriber.error(_utilErrorObject.errorObject.e);
                        break;
                    }
                    subscriber.next(result);
                } else {
                    subscriber.next(result.value);
                }
                if (subscriber.isUnsubscribed) {
                    break;
                }
            } while (true);
        }
    };

    return IteratorObservable;
})(_Observable3['default']);

exports['default'] = IteratorObservable;

var maxSafeInteger = Math.pow(2, 53) - 1;

var StringIterator = (function () {
    function StringIterator(str) {
        var idx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var len = arguments.length <= 2 || arguments[2] === undefined ? str.length : arguments[2];
        return (function () {
            _classCallCheck(this, StringIterator);

            this.str = str;
            this.idx = idx;
            this.len = len;
        }).apply(this, arguments);
    }

    StringIterator.prototype[_utilSymbol_iterator2['default']] = function () {
        return this;
    };

    StringIterator.prototype.next = function next() {
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
    function ArrayIterator(arr) {
        var idx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var len = arguments.length <= 2 || arguments[2] === undefined ? toLength(arr) : arguments[2];
        return (function () {
            _classCallCheck(this, ArrayIterator);

            this.arr = arr;
            this.idx = idx;
            this.len = len;
        }).apply(this, arguments);
    }

    ArrayIterator.prototype[_utilSymbol_iterator2['default']] = function () {
        return this;
    };

    ArrayIterator.prototype.next = function next() {
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

function getIterator(o) {
    var i = o[_utilSymbol_iterator2['default']];
    if (!i && typeof o === 'string') {
        return new StringIterator(o);
    }
    if (!i && o.length !== undefined) {
        return new ArrayIterator(o);
    }
    if (!i) {
        throw new TypeError('Object is not iterable');
    }
    return o[_utilSymbol_iterator2['default']]();
}
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
    return typeof value === 'number' && _utilRoot.root.isFinite(value);
}
function isNan(n) {
    return n !== n;
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
module.exports = exports['default'];
},{"../Observable":3,"../util/Symbol_iterator":126,"../util/errorObject":129,"../util/root":134,"../util/tryCatch":137}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var PromiseObservable = (function (_Observable) {
    _inherits(PromiseObservable, _Observable);

    function PromiseObservable(promise, scheduler) {
        _classCallCheck(this, PromiseObservable);

        _Observable.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
        this._isScalar = false;
    }

    PromiseObservable.create = function create(promise) {
        var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersImmediate2['default'] : arguments[1];

        return new PromiseObservable(promise, scheduler);
    };

    PromiseObservable.prototype._subscribe = function _subscribe(subscriber) {
        var _this = this;

        var scheduler = this.scheduler;
        var promise = this.promise;
        if (scheduler === _schedulersImmediate2['default']) {
            if (this._isScalar) {
                subscriber.next(this.value);
                subscriber.complete();
            } else {
                promise.then(function (value) {
                    _this._isScalar = true;
                    _this.value = value;
                    subscriber.next(value);
                    subscriber.complete();
                }, function (err) {
                    return subscriber.error(err);
                }).then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    setTimeout(function () {
                        throw err;
                    });
                });
            }
        } else {
            var _ret = (function () {
                var subscription = new _Subscription2['default']();
                if (_this._isScalar) {
                    var value = _this.value;
                    subscription.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                } else {
                    promise.then(function (value) {
                        _this._isScalar = true;
                        _this.value = value;
                        subscription.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }, function (err) {
                        return subscription.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }).then(null, function (err) {
                        // escape the promise trap, throw unhandled errors
                        scheduler.schedule(function () {
                            throw err;
                        });
                    });
                }
                return {
                    v: subscription
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        }
    };

    return PromiseObservable;
})(_Observable3['default']);

exports['default'] = PromiseObservable;

function dispatchNext(_ref) {
    var value = _ref.value;
    var subscriber = _ref.subscriber;

    subscriber.next(value);
    subscriber.complete();
}
function dispatchError(_ref2) {
    var err = _ref2.err;
    var subscriber = _ref2.subscriber;

    subscriber.error(err);
}
module.exports = exports['default'];
},{"../Observable":3,"../Subscription":8,"../schedulers/immediate":116}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var RangeObservable = (function (_Observable) {
    _inherits(RangeObservable, _Observable);

    function RangeObservable(start, end, scheduler) {
        _classCallCheck(this, RangeObservable);

        _Observable.call(this);
        this.start = start;
        this.end = end;
        this.scheduler = scheduler;
    }

    RangeObservable.create = function create(start, end, scheduler) {
        if (start === undefined) start = 0;
        if (end === undefined) end = 0;

        return new RangeObservable(start, end, scheduler);
    };

    RangeObservable.dispatch = function dispatch(state) {
        var start = state.start;
        var index = state.index;
        var end = state.end;
        var subscriber = state.subscriber;

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

    RangeObservable.prototype._subscribe = function _subscribe(subscriber) {
        var index = 0;
        var start = this.start;
        var end = this.end;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(RangeObservable.dispatch, 0, {
                index: index, end: end, start: start, subscriber: subscriber
            }));
        } else {
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
})(_Observable3['default']);

exports['default'] = RangeObservable;
module.exports = exports['default'];
},{"../Observable":3}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _ErrorObservable = require('./ErrorObservable');

var _ErrorObservable2 = _interopRequireDefault(_ErrorObservable);

var _EmptyObservable = require('./EmptyObservable');

var _EmptyObservable2 = _interopRequireDefault(_EmptyObservable);

var ScalarObservable = (function (_Observable) {
    _inherits(ScalarObservable, _Observable);

    function ScalarObservable(value, scheduler) {
        _classCallCheck(this, ScalarObservable);

        _Observable.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
    }

    // TypeScript is weird about class prototype member functions and instance properties touching on it's plate.

    ScalarObservable.create = function create(value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };

    ScalarObservable.dispatch = function dispatch(state) {
        var done = state.done;
        var value = state.value;
        var subscriber = state.subscriber;

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

    ScalarObservable.prototype._subscribe = function _subscribe(subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            }));
        } else {
            subscriber.next(value);
            if (!subscriber.isUnsubscribed) {
                subscriber.complete();
            }
        }
    };

    return ScalarObservable;
})(_Observable3['default']);

exports['default'] = ScalarObservable;
var proto = ScalarObservable.prototype;
proto.map = function (project, thisArg) {
    var result = _utilTryCatch2['default'](project).call(thisArg || this, this.value, 0);
    if (result === _utilErrorObject.errorObject) {
        return new _ErrorObservable2['default'](_utilErrorObject.errorObject.e);
    } else {
        return new ScalarObservable(project.call(thisArg || this, this.value, 0));
    }
};
proto.filter = function (select, thisArg) {
    var result = _utilTryCatch2['default'](select).call(thisArg || this, this.value, 0);
    if (result === _utilErrorObject.errorObject) {
        return new _ErrorObservable2['default'](_utilErrorObject.errorObject.e);
    } else if (result) {
        return this;
    } else {
        return new _EmptyObservable2['default']();
    }
};
proto.reduce = function (project, acc) {
    if (typeof acc === 'undefined') {
        return this;
    }
    var result = _utilTryCatch2['default'](project)(acc, this.value);
    if (result === _utilErrorObject.errorObject) {
        return new _ErrorObservable2['default'](_utilErrorObject.errorObject.e);
    } else {
        return new ScalarObservable(result);
    }
};
proto.scan = function (project, acc) {
    return this.reduce(project, acc);
};
proto.count = function (predicate, thisArg) {
    if (!predicate) {
        return new ScalarObservable(1);
    } else {
        var result = _utilTryCatch2['default'](predicate).call(thisArg || this, this.value, 0, this);
        if (result === _utilErrorObject.errorObject) {
            return new _ErrorObservable2['default'](_utilErrorObject.errorObject.e);
        } else {
            return new ScalarObservable(result ? 1 : 0);
        }
    }
};
proto.skip = function (count) {
    if (count > 0) {
        return new _EmptyObservable2['default']();
    }
    return this;
};
proto.take = function (count) {
    if (count > 0) {
        return this;
    }
    return new _EmptyObservable2['default']();
};
module.exports = exports['default'];
},{"../Observable":3,"../util/errorObject":129,"../util/tryCatch":137,"./EmptyObservable":12,"./ErrorObservable":13}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

var SubscribeOnObservable = (function (_Observable) {
    _inherits(SubscribeOnObservable, _Observable);

    function SubscribeOnObservable(source) {
        var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersNextTick2['default'] : arguments[2];

        _classCallCheck(this, SubscribeOnObservable);

        _Observable.call(this);
        this.source = source;
        this.delayTime = delay;
        this.scheduler = scheduler;
    }

    SubscribeOnObservable.create = function create(source) {
        var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersNextTick2['default'] : arguments[2];

        return new SubscribeOnObservable(source, delay, scheduler);
    };

    SubscribeOnObservable.dispatch = function dispatch(_ref) {
        var source = _ref.source;
        var subscriber = _ref.subscriber;

        return source.subscribe(subscriber);
    };

    SubscribeOnObservable.prototype._subscribe = function _subscribe(subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        }));
    };

    return SubscribeOnObservable;
})(_Observable3['default']);

exports['default'] = SubscribeOnObservable;
module.exports = exports['default'];
},{"../Observable":3,"../schedulers/nextTick":117}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilIsNumeric = require('../util/isNumeric');

var _utilIsNumeric2 = _interopRequireDefault(_utilIsNumeric);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

var TimerObservable = (function (_Observable) {
    _inherits(TimerObservable, _Observable);

    function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === undefined) dueTime = 0;

        _classCallCheck(this, TimerObservable);

        _Observable.call(this);
        this.dueTime = dueTime;
        this.period = period;
        this.scheduler = scheduler;
        if (_utilIsNumeric2['default'](period)) {
            this._period = Number(period) < 1 && 1 || Number(period);
        } else if (period && typeof period.schedule === 'function') {
            scheduler = period;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            scheduler = _schedulersNextTick2['default'];
        }
        this.scheduler = scheduler;
    }

    TimerObservable.create = function create(dueTime, period, scheduler) {
        if (dueTime === undefined) dueTime = 0;

        return new TimerObservable(dueTime, period, scheduler);
    };

    TimerObservable.dispatch = function dispatch(state) {
        var index = state.index;
        var period = state.period;
        var subscriber = state.subscriber;

        var action = this;
        subscriber.next(index);
        if (typeof period === 'undefined') {
            subscriber.complete();
            return;
        } else if (subscriber.isUnsubscribed) {
            return;
        }
        if (typeof action.delay === 'undefined') {
            action.add(action.scheduler.schedule(TimerObservable.dispatch, period, {
                index: index + 1, period: period, subscriber: subscriber
            }));
        } else {
            state.index = index + 1;
            action.schedule(state, period);
        }
    };

    TimerObservable.prototype._subscribe = function _subscribe(subscriber) {
        var index = 0;
        var period = this._period;
        var dueTime = this.dueTime;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(TimerObservable.dispatch, dueTime, { index: index, period: period, subscriber: subscriber }));
    };

    return TimerObservable;
})(_Observable3['default']);

exports['default'] = TimerObservable;
module.exports = exports['default'];
},{"../Observable":3,"../schedulers/nextTick":117,"../util/isNumeric":131}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = buffer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

/**
 * buffers the incoming observable values until the passed `closingNotifier` emits a value, at which point
 * it emits the buffer on the returned observable and starts a new buffer internally, awaiting the
 * next time `closingNotifier` emits
 *
 * @param {Observable<any>} closingNotifier an observable, that signals the buffer to be emitted from the returned observable
 * @returns {Observable<T[]>} an observable of buffers, which are arrays of values
 */

function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}

var BufferOperator = (function () {
    function BufferOperator(closingNotifier) {
        _classCallCheck(this, BufferOperator);

        this.closingNotifier = closingNotifier;
    }

    BufferOperator.prototype.call = function call(subscriber) {
        return new BufferSubscriber(subscriber, this.closingNotifier);
    };

    return BufferOperator;
})();

var BufferSubscriber = (function (_Subscriber) {
    _inherits(BufferSubscriber, _Subscriber);

    function BufferSubscriber(destination, closingNotifier) {
        _classCallCheck(this, BufferSubscriber);

        _Subscriber.call(this, destination);
        this.buffer = [];
        this.add(closingNotifier._subscribe(new BufferClosingNotifierSubscriber(this)));
    }

    BufferSubscriber.prototype._next = function _next(value) {
        this.buffer.push(value);
    };

    BufferSubscriber.prototype._error = function _error(err) {
        this.destination.error(err);
    };

    BufferSubscriber.prototype._complete = function _complete() {
        this.destination.complete();
    };

    BufferSubscriber.prototype.flushBuffer = function flushBuffer() {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };

    return BufferSubscriber;
})(_Subscriber4['default']);

var BufferClosingNotifierSubscriber = (function (_Subscriber2) {
    _inherits(BufferClosingNotifierSubscriber, _Subscriber2);

    function BufferClosingNotifierSubscriber(parent) {
        _classCallCheck(this, BufferClosingNotifierSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
    }

    BufferClosingNotifierSubscriber.prototype._next = function _next(value) {
        this.parent.flushBuffer();
    };

    BufferClosingNotifierSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    BufferClosingNotifierSubscriber.prototype._complete = function _complete() {
        this.parent.complete();
    };

    return BufferClosingNotifierSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bufferCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

/**
 * buffers a number of values from the source observable by `bufferSize` then emits the buffer and clears it, and starts a
 * new buffer each `startBufferEvery` values. If `startBufferEvery` is not provided or is `null`, then new buffers are
 * started immediately at the start of the source and when each buffer closes and is emitted.
 * @param {number} bufferSize the maximum size of the buffer emitted.
 * @param {number} [startBufferEvery] optional interval at which to start a new buffer. (e.g. if `startBufferEvery` is `2`,asdf then a
 *   new buffer will be started on every other value from the source.) A new buffer is started at the beginning of the source by default.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */

function bufferCount(bufferSize) {
    var startBufferEvery = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}

var BufferCountOperator = (function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        _classCallCheck(this, BufferCountOperator);

        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
    }

    BufferCountOperator.prototype.call = function call(subscriber) {
        return new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery);
    };

    return BufferCountOperator;
})();

var BufferCountSubscriber = (function (_Subscriber) {
    _inherits(BufferCountSubscriber, _Subscriber);

    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _classCallCheck(this, BufferCountSubscriber);

        _Subscriber.call(this, destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [[]];
        this.count = 0;
    }

    BufferCountSubscriber.prototype._next = function _next(value) {
        var count = this.count += 1;
        var destination = this.destination;
        var bufferSize = this.bufferSize;
        var startBufferEvery = this.startBufferEvery == null ? bufferSize : this.startBufferEvery;
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
                this.destination.next(buffer);
            }
        }
        if (remove !== -1) {
            buffers.splice(remove, 1);
        }
    };

    BufferCountSubscriber.prototype._error = function _error(err) {
        this.destination.error(err);
    };

    BufferCountSubscriber.prototype._complete = function _complete() {
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
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bufferTime;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

/**
 * buffers values from the source for a specific time period. Optionally allows new buffers to be set up at an interval.
 * @param {number} the amount of time to fill each buffer for before emitting them and clearing them.
 * @param {number} [bufferCreationInterval] the interval at which to start new buffers.
 * @param {Scheduler} [scheduler] (optional, defaults to `nextTick` scheduler) The scheduler on which to schedule the
 *  intervals that determine buffer boundaries.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */

function bufferTime(bufferTimeSpan) {
    var bufferCreationInterval = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersNextTick2['default'] : arguments[2];

    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
}

var BufferTimeOperator = (function () {
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler) {
        _classCallCheck(this, BufferTimeOperator);

        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
    }

    BufferTimeOperator.prototype.call = function call(subscriber) {
        return new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler);
    };

    return BufferTimeOperator;
})();

var BufferTimeSubscriber = (function (_Subscriber) {
    _inherits(BufferTimeSubscriber, _Subscriber);

    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, scheduler) {
        _classCallCheck(this, BufferTimeSubscriber);

        _Subscriber.call(this, destination);
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
        } else {
            var timeSpanOnlyState = { subscriber: this, buffer: buffer, bufferTimeSpan: bufferTimeSpan };
            this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    }

    BufferTimeSubscriber.prototype._next = function _next(value) {
        var buffers = this.buffers;
        var len = buffers.length;
        for (var i = 0; i < len; i++) {
            buffers[i].push(value);
        }
    };

    BufferTimeSubscriber.prototype._error = function _error(err) {
        this.buffers.length = 0;
        this.destination.error(err);
    };

    BufferTimeSubscriber.prototype._complete = function _complete() {
        var buffers = this.buffers;
        while (buffers.length > 0) {
            this.destination.next(buffers.shift());
        }
        this.destination.complete();
    };

    BufferTimeSubscriber.prototype.openBuffer = function openBuffer() {
        var buffer = [];
        this.buffers.push(buffer);
        return buffer;
    };

    BufferTimeSubscriber.prototype.closeBuffer = function closeBuffer(buffer) {
        this.destination.next(buffer);
        var buffers = this.buffers;
        buffers.splice(buffers.indexOf(buffer), 1);
    };

    return BufferTimeSubscriber;
})(_Subscriber3['default']);

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
    var bufferCreationInterval = state.bufferCreationInterval;
    var bufferTimeSpan = state.bufferTimeSpan;
    var subscriber = state.subscriber;
    var scheduler = state.scheduler;

    var buffer = subscriber.openBuffer();
    var action = this;
    if (!subscriber.isUnsubscribed) {
        action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, buffer: buffer }));
        action.schedule(state, bufferCreationInterval);
    }
}
function dispatchBufferClose(_ref) {
    var subscriber = _ref.subscriber;
    var buffer = _ref.buffer;

    subscriber.closeBuffer(buffer);
}
module.exports = exports['default'];
},{"../Subscriber":7,"../schedulers/nextTick":117}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bufferToggle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber4 = require('../Subscriber');

var _Subscriber5 = _interopRequireDefault(_Subscriber4);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

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

var BufferToggleOperator = (function () {
    function BufferToggleOperator(openings, closingSelector) {
        _classCallCheck(this, BufferToggleOperator);

        this.openings = openings;
        this.closingSelector = closingSelector;
    }

    BufferToggleOperator.prototype.call = function call(subscriber) {
        return new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector);
    };

    return BufferToggleOperator;
})();

var BufferToggleSubscriber = (function (_Subscriber) {
    _inherits(BufferToggleSubscriber, _Subscriber);

    function BufferToggleSubscriber(destination, openings, closingSelector) {
        _classCallCheck(this, BufferToggleSubscriber);

        _Subscriber.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.buffers = [];
        this.add(this.openings._subscribe(new BufferToggleOpeningsSubscriber(this)));
    }

    BufferToggleSubscriber.prototype._next = function _next(value) {
        var buffers = this.buffers;
        var len = buffers.length;
        for (var i = 0; i < len; i++) {
            buffers[i].push(value);
        }
    };

    BufferToggleSubscriber.prototype._error = function _error(err) {
        this.buffers = null;
        this.destination.error(err);
    };

    BufferToggleSubscriber.prototype._complete = function _complete() {
        var buffers = this.buffers;
        while (buffers.length > 0) {
            this.destination.next(buffers.shift());
        }
        this.destination.complete();
    };

    BufferToggleSubscriber.prototype.openBuffer = function openBuffer(value) {
        var closingSelector = this.closingSelector;
        var buffers = this.buffers;
        var closingNotifier = _utilTryCatch2['default'](closingSelector)(value);
        if (closingNotifier === _utilErrorObject.errorObject) {
            var err = closingNotifier.e;
            this.buffers = null;
            this.destination.error(err);
        } else {
            var buffer = [];
            var context = {
                buffer: buffer,
                subscription: new _Subscription2['default']()
            };
            buffers.push(buffer);
            var subscriber = new BufferClosingNotifierSubscriber(this, context);
            var subscription = closingNotifier._subscribe(subscriber);
            this.add(context.subscription.add(subscription));
        }
    };

    BufferToggleSubscriber.prototype.closeBuffer = function closeBuffer(context) {
        var buffer = context.buffer;
        var subscription = context.subscription;

        var buffers = this.buffers;
        this.destination.next(buffer);
        buffers.splice(buffers.indexOf(buffer), 1);
        this.remove(subscription);
        subscription.unsubscribe();
    };

    return BufferToggleSubscriber;
})(_Subscriber5['default']);

var BufferClosingNotifierSubscriber = (function (_Subscriber2) {
    _inherits(BufferClosingNotifierSubscriber, _Subscriber2);

    function BufferClosingNotifierSubscriber(parent, context) {
        _classCallCheck(this, BufferClosingNotifierSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.context = context;
    }

    BufferClosingNotifierSubscriber.prototype._next = function _next() {
        this.parent.closeBuffer(this.context);
    };

    BufferClosingNotifierSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    BufferClosingNotifierSubscriber.prototype._complete = function _complete() {
        // noop
    };

    return BufferClosingNotifierSubscriber;
})(_Subscriber5['default']);

var BufferToggleOpeningsSubscriber = (function (_Subscriber3) {
    _inherits(BufferToggleOpeningsSubscriber, _Subscriber3);

    function BufferToggleOpeningsSubscriber(parent) {
        _classCallCheck(this, BufferToggleOpeningsSubscriber);

        _Subscriber3.call(this, null);
        this.parent = parent;
    }

    BufferToggleOpeningsSubscriber.prototype._next = function _next(value) {
        this.parent.openBuffer(value);
    };

    BufferToggleOpeningsSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    BufferToggleOpeningsSubscriber.prototype._complete = function _complete() {
        // noop
    };

    return BufferToggleOpeningsSubscriber;
})(_Subscriber5['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../Subscription":8,"../util/errorObject":129,"../util/tryCatch":137}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bufferWhen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

/**
 * Opens a buffer immediately, then closes the buffer when the observable returned by calling `closingSelector` emits a value.
 * It that immediately opens a new buffer and repeats the process
 * @param {function} a function that takes no arguments and returns an Observable that signals buffer closure
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */

function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}

var BufferWhenOperator = (function () {
    function BufferWhenOperator(closingSelector) {
        _classCallCheck(this, BufferWhenOperator);

        this.closingSelector = closingSelector;
    }

    BufferWhenOperator.prototype.call = function call(subscriber) {
        return new BufferWhenSubscriber(subscriber, this.closingSelector);
    };

    return BufferWhenOperator;
})();

var BufferWhenSubscriber = (function (_Subscriber) {
    _inherits(BufferWhenSubscriber, _Subscriber);

    function BufferWhenSubscriber(destination, closingSelector) {
        _classCallCheck(this, BufferWhenSubscriber);

        _Subscriber.call(this, destination);
        this.closingSelector = closingSelector;
        this.openBuffer();
    }

    BufferWhenSubscriber.prototype._next = function _next(value) {
        this.buffer.push(value);
    };

    BufferWhenSubscriber.prototype._error = function _error(err) {
        this.buffer = null;
        this.destination.error(err);
    };

    BufferWhenSubscriber.prototype._complete = function _complete() {
        var buffer = this.buffer;
        this.destination.next(buffer);
        this.buffer = null;
        this.destination.complete();
    };

    BufferWhenSubscriber.prototype.openBuffer = function openBuffer() {
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
        var closingNotifier = _utilTryCatch2['default'](this.closingSelector)();
        if (closingNotifier === _utilErrorObject.errorObject) {
            var err = closingNotifier.e;
            this.buffer = null;
            this.destination.error(err);
        } else {
            this.add(this.closingNotification = closingNotifier._subscribe(new BufferClosingNotifierSubscriber(this)));
        }
    };

    return BufferWhenSubscriber;
})(_Subscriber4['default']);

var BufferClosingNotifierSubscriber = (function (_Subscriber2) {
    _inherits(BufferClosingNotifierSubscriber, _Subscriber2);

    function BufferClosingNotifierSubscriber(parent) {
        _classCallCheck(this, BufferClosingNotifierSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
    }

    BufferClosingNotifierSubscriber.prototype._next = function _next() {
        this.parent.openBuffer();
    };

    BufferClosingNotifierSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    BufferClosingNotifierSubscriber.prototype._complete = function _complete() {
        this.parent.openBuffer();
    };

    return BufferClosingNotifierSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/errorObject":129,"../util/tryCatch":137}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = _catch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

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

var CatchOperator = (function () {
    function CatchOperator(selector) {
        _classCallCheck(this, CatchOperator);

        this.selector = selector;
    }

    CatchOperator.prototype.call = function call(subscriber) {
        return new CatchSubscriber(subscriber, this.selector, this.caught);
    };

    return CatchOperator;
})();

var CatchSubscriber = (function (_Subscriber) {
    _inherits(CatchSubscriber, _Subscriber);

    function CatchSubscriber(destination, selector, caught) {
        _classCallCheck(this, CatchSubscriber);

        _Subscriber.call(this, destination);
        this.selector = selector;
        this.caught = caught;
    }

    CatchSubscriber.prototype._error = function _error(err) {
        var result = _utilTryCatch2['default'](this.selector)(err, this.caught);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(_utilErrorObject.errorObject.e);
        } else {
            this.add(result.subscribe(this.destination));
        }
    };

    return CatchSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/errorObject":129,"../util/tryCatch":137}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineAll;

var _combineLatestSupport = require('./combineLatest-support');

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
  return this.lift(new _combineLatestSupport.CombineLatestOperator(project));
}

module.exports = exports['default'];
},{"./combineLatest-support":34}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineLatest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _combineLatestSupport = require('./combineLatest-support');

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
    var project = undefined,
        scheduler = undefined;

    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    if (typeof observables[observables.length - 1].schedule === 'function') {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    return new _observablesArrayObservable2['default'](observables, scheduler).lift(new _combineLatestSupport.CombineLatestOperator(project));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":9,"./combineLatest-support":34}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        _classCallCheck(this, CombineLatestOperator);

        this.project = project;
    }

    CombineLatestOperator.prototype.call = function call(subscriber) {
        return new CombineLatestSubscriber(subscriber, this.project);
    };

    return CombineLatestOperator;
})();

exports.CombineLatestOperator = CombineLatestOperator;

var CombineLatestSubscriber = (function (_OuterSubscriber) {
    _inherits(CombineLatestSubscriber, _OuterSubscriber);

    function CombineLatestSubscriber(destination, project) {
        _classCallCheck(this, CombineLatestSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
        this.toRespond = [];
    }

    CombineLatestSubscriber.prototype._next = function _next(observable) {
        var toRespond = this.toRespond;
        toRespond.push(toRespond.length);
        this.observables.push(observable);
    };

    CombineLatestSubscriber.prototype._complete = function _complete() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        } else {
            this.active = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(_utilSubscribeToResult2['default'](this, observable, observable, i));
            }
        }
    };

    CombineLatestSubscriber.prototype.notifyComplete = function notifyComplete(innerSubscriber) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };

    CombineLatestSubscriber.prototype.notifyNext = function notifyNext(observable, value, outerIndex, innerIndex) {
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
                var result = _utilTryCatch2['default'](project).apply(this, values);
                if (result === _utilErrorObject.errorObject) {
                    destination.error(_utilErrorObject.errorObject.e);
                } else {
                    destination.next(result);
                }
            } else {
                destination.next(values);
            }
        }
    };

    return CombineLatestSubscriber;
})(_OuterSubscriber3['default']);

exports.CombineLatestSubscriber = CombineLatestSubscriber;
},{"../OuterSubscriber":4,"../util/errorObject":129,"../util/subscribeToResult":135,"../util/tryCatch":137}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineLatest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _combineLatestSupport = require('./combineLatest-support');

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
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    observables.unshift(this);
    var project = undefined;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    return new _observablesArrayObservable2['default'](observables).lift(new _combineLatestSupport.CombineLatestOperator(project));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":9,"./combineLatest-support":34}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

/**
 * Joins multiple observables together by subscribing to them one at a time and merging their results
 * into the returned observable. Will wait for each observable to complete before moving on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */

function concat() {
    var scheduler = _schedulersImmediate2['default'];

    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var args = observables;
    var len = args.length;
    if (typeof args[observables.length - 1].schedule === 'function') {
        scheduler = args.pop();
        args.push(1, scheduler);
    }
    return _Observable2['default'].fromArray(observables).mergeAll(1);
}

module.exports = exports['default'];
},{"../Observable":3,"../schedulers/immediate":116}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

/**
 * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
 * and merging their results into the returned observable. Will wait for each observable to complete before moving
 * on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */

function concat() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var args = observables;
    args.unshift(this);
    if (args.length > 1 && typeof args[args.length - 1].schedule === 'function') {
        args.splice(args.length - 2, 0, 1);
    }
    return _Observable2['default'].fromArray(args).mergeAll(1);
}

module.exports = exports['default'];
},{"../Observable":3}],38:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatAll;

var _mergeAllSupport = require('./mergeAll-support');

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
  return this.lift(new _mergeAllSupport.MergeAllOperator(1));
}

module.exports = exports['default'];
},{"./mergeAll-support":64}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatMap;

var _mergeMapSupport = require('./mergeMap-support');

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
  return this.lift(new _mergeMapSupport.MergeMapOperator(project, projectResult, 1));
}

module.exports = exports['default'];
},{"./mergeMap-support":66}],40:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatMapTo;

var _mergeMapToSupport = require('./mergeMapTo-support');

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
  return this.lift(new _mergeMapToSupport.MergeMapToOperator(observable, projectResult, 1));
}

module.exports = exports['default'];
},{"./mergeMapTo-support":68}],41:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = count;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

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

var CountOperator = (function () {
    function CountOperator(predicate, thisArg, source) {
        _classCallCheck(this, CountOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }

    CountOperator.prototype.call = function call(subscriber) {
        return new CountSubscriber(subscriber, this.predicate, this.thisArg, this.source);
    };

    return CountOperator;
})();

var CountSubscriber = (function (_Subscriber) {
    _inherits(CountSubscriber, _Subscriber);

    function CountSubscriber(destination, predicate, thisArg, source) {
        _classCallCheck(this, CountSubscriber);

        _Subscriber.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.count = 0;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = _utilBindCallback2['default'](predicate, thisArg, 3);
        }
    }

    CountSubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        var passed = true;
        if (predicate) {
            passed = _utilTryCatch2['default'](predicate)(value, this.index++, this.source);
            if (passed === _utilErrorObject.errorObject) {
                this.destination.error(passed.e);
                return;
            }
        }
        if (passed) {
            this.count += 1;
        }
    };

    CountSubscriber.prototype._complete = function _complete() {
        this.destination.next(this.count);
        this.destination.complete();
    };

    return CountSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/bindCallback":128,"../util/errorObject":129,"../util/tryCatch":137}],42:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = debounce;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _observablesPromiseObservable = require('../observables/PromiseObservable');

var _observablesPromiseObservable2 = _interopRequireDefault(_observablesPromiseObservable);

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
}

var DebounceOperator = (function () {
    function DebounceOperator(durationSelector) {
        _classCallCheck(this, DebounceOperator);

        this.durationSelector = durationSelector;
    }

    DebounceOperator.prototype.call = function call(observer) {
        return new DebounceSubscriber(observer, this.durationSelector);
    };

    return DebounceOperator;
})();

var DebounceSubscriber = (function (_Subscriber) {
    _inherits(DebounceSubscriber, _Subscriber);

    function DebounceSubscriber(destination, durationSelector) {
        _classCallCheck(this, DebounceSubscriber);

        _Subscriber.call(this, destination);
        this.durationSelector = durationSelector;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this._index = 0;
    }

    DebounceSubscriber.prototype._next = function _next(value) {
        var destination = this.destination;
        var currentIndex = ++this._index;
        var debounce = _utilTryCatch2['default'](this.durationSelector)(value);
        if (debounce === _utilErrorObject.errorObject) {
            destination.error(_utilErrorObject.errorObject.e);
        } else {
            if (typeof debounce.subscribe !== 'function' && typeof debounce.then === 'function') {
                debounce = _observablesPromiseObservable2['default'].create(debounce);
            }
            this.lastValue = value;
            this.add(this.debouncedSubscription = debounce._subscribe(new DurationSelectorSubscriber(this, currentIndex)));
        }
    };

    DebounceSubscriber.prototype._complete = function _complete() {
        this.debouncedNext();
        this.destination.complete();
    };

    DebounceSubscriber.prototype.debouncedNext = function debouncedNext() {
        this.clearDebounce();
        if (this.lastValue != null) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
        }
    };

    DebounceSubscriber.prototype.clearDebounce = function clearDebounce() {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            this.debouncedSubscription = null;
        }
    };

    _createClass(DebounceSubscriber, [{
        key: 'index',
        get: function get() {
            return this._index;
        }
    }]);

    return DebounceSubscriber;
})(_Subscriber4['default']);

var DurationSelectorSubscriber = (function (_Subscriber2) {
    _inherits(DurationSelectorSubscriber, _Subscriber2);

    function DurationSelectorSubscriber(parent, currentIndex) {
        _classCallCheck(this, DurationSelectorSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.currentIndex = currentIndex;
    }

    DurationSelectorSubscriber.prototype.debounceNext = function debounceNext() {
        var parent = this.parent;
        if (this.currentIndex === parent.index) {
            parent.debouncedNext();
            if (!this.isUnsubscribed) {
                this.unsubscribe();
            }
        }
    };

    DurationSelectorSubscriber.prototype._next = function _next(unused) {
        this.debounceNext();
    };

    DurationSelectorSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    DurationSelectorSubscriber.prototype._complete = function _complete() {
        this.debounceNext();
    };

    return DurationSelectorSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../observables/PromiseObservable":21,"../util/errorObject":129,"../util/tryCatch":137}],43:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = debounceTime;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

function debounceTime(dueTime) {
    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersNextTick2['default'] : arguments[1];

    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}

var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        _classCallCheck(this, DebounceTimeOperator);

        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }

    DebounceTimeOperator.prototype.call = function call(subscriber) {
        return new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler);
    };

    return DebounceTimeOperator;
})();

var DebounceTimeSubscriber = (function (_Subscriber) {
    _inherits(DebounceTimeSubscriber, _Subscriber);

    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _classCallCheck(this, DebounceTimeSubscriber);

        _Subscriber.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
    }

    DebounceTimeSubscriber.prototype._next = function _next(value) {
        this.clearDebounce();
        this.lastValue = value;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };

    DebounceTimeSubscriber.prototype._complete = function _complete() {
        this.debouncedNext();
        this.destination.complete();
    };

    DebounceTimeSubscriber.prototype.debouncedNext = function debouncedNext() {
        this.clearDebounce();
        if (this.lastValue != null) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
        }
    };

    DebounceTimeSubscriber.prototype.clearDebounce = function clearDebounce() {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };

    return DebounceTimeSubscriber;
})(_Subscriber3['default']);

function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
module.exports = exports['default'];
},{"../Subscriber":7,"../schedulers/nextTick":117}],44:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = defaultIfEmpty;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function defaultIfEmpty() {
    var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}

var DefaultIfEmptyOperator = (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        _classCallCheck(this, DefaultIfEmptyOperator);

        this.defaultValue = defaultValue;
    }

    DefaultIfEmptyOperator.prototype.call = function call(subscriber) {
        return new DefaultIfEmptySubscriber(subscriber, this.defaultValue);
    };

    return DefaultIfEmptyOperator;
})();

var DefaultIfEmptySubscriber = (function (_Subscriber) {
    _inherits(DefaultIfEmptySubscriber, _Subscriber);

    function DefaultIfEmptySubscriber(destination, defaultValue) {
        _classCallCheck(this, DefaultIfEmptySubscriber);

        _Subscriber.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }

    DefaultIfEmptySubscriber.prototype._next = function _next(x) {
        this.isEmpty = false;
        this.destination.next(x);
    };

    DefaultIfEmptySubscriber.prototype._complete = function _complete() {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };

    return DefaultIfEmptySubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],45:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = delay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

function delay(delay) {
    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersImmediate2['default'] : arguments[1];

    return this.lift(new DelayOperator(delay, scheduler));
}

var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        _classCallCheck(this, DelayOperator);

        this.delay = delay;
        this.scheduler = scheduler;
    }

    DelayOperator.prototype.call = function call(subscriber) {
        return new DelaySubscriber(subscriber, this.delay, this.scheduler);
    };

    return DelayOperator;
})();

var DelaySubscriber = (function (_Subscriber) {
    _inherits(DelaySubscriber, _Subscriber);

    function DelaySubscriber(destination, delay, scheduler) {
        _classCallCheck(this, DelaySubscriber);

        _Subscriber.call(this, destination);
        this.queue = [];
        this.active = false;
        this.errored = false;
        this.delay = delay;
        this.scheduler = scheduler;
    }

    DelaySubscriber.dispatch = function dispatch(state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var _delay = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, _delay);
        } else {
            source.active = false;
        }
    };

    DelaySubscriber.prototype._next = function _next(x) {
        if (this.errored) {
            return;
        }
        var scheduler = this.scheduler;
        this.queue.push(new DelayMessage(scheduler.now() + this.delay, _Notification2['default'].createNext(x)));
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };

    DelaySubscriber.prototype._error = function _error(e) {
        var scheduler = this.scheduler;
        this.errored = true;
        this.queue = [new DelayMessage(scheduler.now() + this.delay, _Notification2['default'].createError(e))];
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };

    DelaySubscriber.prototype._complete = function _complete() {
        if (this.errored) {
            return;
        }
        var scheduler = this.scheduler;
        this.queue.push(new DelayMessage(scheduler.now() + this.delay, _Notification2['default'].createComplete()));
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };

    DelaySubscriber.prototype._schedule = function _schedule(scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };

    return DelaySubscriber;
})(_Subscriber3['default']);

var DelayMessage = function DelayMessage(time, notification) {
    _classCallCheck(this, DelayMessage);

    this.time = time;
    this.notification = notification;
};

module.exports = exports['default'];
},{"../Notification":2,"../Subscriber":7,"../schedulers/immediate":116}],46:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = dematerialize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}

var DeMaterializeOperator = (function () {
    function DeMaterializeOperator() {
        _classCallCheck(this, DeMaterializeOperator);
    }

    DeMaterializeOperator.prototype.call = function call(subscriber) {
        return new DeMaterializeSubscriber(subscriber);
    };

    return DeMaterializeOperator;
})();

var DeMaterializeSubscriber = (function (_Subscriber) {
    _inherits(DeMaterializeSubscriber, _Subscriber);

    function DeMaterializeSubscriber(destination) {
        _classCallCheck(this, DeMaterializeSubscriber);

        _Subscriber.call(this, destination);
    }

    DeMaterializeSubscriber.prototype._next = function _next(value) {
        value.observe(this.destination);
    };

    return DeMaterializeSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],47:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = distinctUntilChanged;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

function distinctUntilChanged(compare, thisArg) {
    return this.lift(new DistinctUntilChangedOperator(thisArg ? _utilBindCallback2['default'](compare, thisArg, 2) : compare));
}

var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare) {
        _classCallCheck(this, DistinctUntilChangedOperator);

        this.compare = compare;
    }

    DistinctUntilChangedOperator.prototype.call = function call(subscriber) {
        return new DistinctUntilChangedSubscriber(subscriber, this.compare);
    };

    return DistinctUntilChangedOperator;
})();

var DistinctUntilChangedSubscriber = (function (_Subscriber) {
    _inherits(DistinctUntilChangedSubscriber, _Subscriber);

    function DistinctUntilChangedSubscriber(destination, compare) {
        _classCallCheck(this, DistinctUntilChangedSubscriber);

        _Subscriber.call(this, destination);
        this.hasValue = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }

    DistinctUntilChangedSubscriber.prototype.compare = function compare(x, y) {
        return x === y;
    };

    DistinctUntilChangedSubscriber.prototype._next = function _next(x) {
        var result = false;
        if (this.hasValue) {
            result = _utilTryCatch2['default'](this.compare)(this.value, x);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(_utilErrorObject.errorObject.e);
                return;
            }
        } else {
            this.hasValue = true;
        }
        if (Boolean(result) === false) {
            this.value = x;
            this.destination.next(x);
        }
    };

    return DistinctUntilChangedSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/bindCallback":128,"../util/errorObject":129,"../util/tryCatch":137}],48:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = _do;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilNoop = require('../util/noop');

var _utilNoop2 = _interopRequireDefault(_utilNoop);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function _do(nextOrObserver, error, complete) {
    var next = undefined;
    if (nextOrObserver && typeof nextOrObserver === 'object') {
        next = nextOrObserver.next;
        error = nextOrObserver.error;
        complete = nextOrObserver.complete;
    } else {
        next = nextOrObserver;
    }
    return this.lift(new DoOperator(next || _utilNoop2['default'], error || _utilNoop2['default'], complete || _utilNoop2['default']));
}

var DoOperator = (function () {
    function DoOperator(next, error, complete) {
        _classCallCheck(this, DoOperator);

        this.next = next;
        this.error = error;
        this.complete = complete;
    }

    DoOperator.prototype.call = function call(subscriber) {
        return new DoSubscriber(subscriber, this.next, this.error, this.complete);
    };

    return DoOperator;
})();

var DoSubscriber = (function (_Subscriber) {
    _inherits(DoSubscriber, _Subscriber);

    function DoSubscriber(destination, next, error, complete) {
        _classCallCheck(this, DoSubscriber);

        _Subscriber.call(this, destination);
        this.__next = next;
        this.__error = error;
        this.__complete = complete;
    }

    DoSubscriber.prototype._next = function _next(x) {
        var result = _utilTryCatch2['default'](this.__next)(x);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(_utilErrorObject.errorObject.e);
        } else {
            this.destination.next(x);
        }
    };

    DoSubscriber.prototype._error = function _error(e) {
        var result = _utilTryCatch2['default'](this.__error)(e);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(_utilErrorObject.errorObject.e);
        } else {
            this.destination.error(e);
        }
    };

    DoSubscriber.prototype._complete = function _complete() {
        var result = _utilTryCatch2['default'](this.__complete)();
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(_utilErrorObject.errorObject.e);
        } else {
            this.destination.complete();
        }
    };

    return DoSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/errorObject":129,"../util/noop":132,"../util/tryCatch":137}],49:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = every;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _observablesScalarObservable = require('../observables/ScalarObservable');

var _observablesScalarObservable2 = _interopRequireDefault(_observablesScalarObservable);

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _observablesErrorObservable = require('../observables/ErrorObservable');

var _observablesErrorObservable2 = _interopRequireDefault(_observablesErrorObservable);

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

function every(predicate, thisArg) {
    var source = this;
    var result = undefined;
    if (source._isScalar) {
        result = _utilTryCatch2['default'](predicate)(source.value, 0, source);
        if (result === _utilErrorObject.errorObject) {
            return new _observablesErrorObservable2['default'](_utilErrorObject.errorObject.e, source.scheduler);
        } else {
            return new _observablesScalarObservable2['default'](result, source.scheduler);
        }
    }
    if (source instanceof _observablesArrayObservable2['default']) {
        var array = source.array;
        var _result = _utilTryCatch2['default'](function (array, predicate) {
            return array.every(predicate);
        })(array, predicate);
        if (_result === _utilErrorObject.errorObject) {
            return new _observablesErrorObservable2['default'](_utilErrorObject.errorObject.e, source.scheduler);
        } else {
            return new _observablesScalarObservable2['default'](_result, source.scheduler);
        }
    }
    return source.lift(new EveryOperator(predicate, thisArg, source));
}

var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        _classCallCheck(this, EveryOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }

    EveryOperator.prototype.call = function call(observer) {
        return new EverySubscriber(observer, this.predicate, this.thisArg, this.source);
    };

    return EveryOperator;
})();

var EverySubscriber = (function (_Subscriber) {
    _inherits(EverySubscriber, _Subscriber);

    function EverySubscriber(destination, predicate, thisArg, source) {
        _classCallCheck(this, EverySubscriber);

        _Subscriber.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.predicate = undefined;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = _utilBindCallback2['default'](predicate, thisArg, 3);
        }
    }

    EverySubscriber.prototype.notifyComplete = function notifyComplete(everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };

    EverySubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        if (predicate === undefined) {
            this.destination.error(new TypeError('predicate must be a function'));
        }
        var result = _utilTryCatch2['default'](predicate)(value, this.index++, this.source);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(result.e);
        } else if (!result) {
            this.notifyComplete(false);
        }
    };

    EverySubscriber.prototype._complete = function _complete() {
        this.notifyComplete(true);
    };

    return EverySubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../observables/ArrayObservable":9,"../observables/ErrorObservable":13,"../observables/ScalarObservable":23,"../util/bindCallback":128,"../util/errorObject":129,"../util/tryCatch":137}],50:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var ExpandOperator = (function () {
    function ExpandOperator(project) {
        var concurrent = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];

        _classCallCheck(this, ExpandOperator);

        this.project = project;
        this.concurrent = concurrent;
    }

    ExpandOperator.prototype.call = function call(subscriber) {
        return new ExpandSubscriber(subscriber, this.project, this.concurrent);
    };

    return ExpandOperator;
})();

exports.ExpandOperator = ExpandOperator;

var ExpandSubscriber = (function (_OuterSubscriber) {
    _inherits(ExpandSubscriber, _OuterSubscriber);

    function ExpandSubscriber(destination, project) {
        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

        _classCallCheck(this, ExpandSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }

    ExpandSubscriber.prototype._next = function _next(value) {
        var index = this.index++;
        this.destination.next(value);
        if (this.active < this.concurrent) {
            var result = _utilTryCatch2['default'](this.project)(value, index);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(result.e);
            } else {
                if (result._isScalar) {
                    this._next(result.value);
                } else {
                    this.active++;
                    this.add(_utilSubscribeToResult2['default'](this, result, value, index));
                }
            }
        } else {
            this.buffer.push(value);
        }
    };

    ExpandSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };

    ExpandSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
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

    ExpandSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this._next(innerValue);
    };

    return ExpandSubscriber;
})(_OuterSubscriber3['default']);

exports.ExpandSubscriber = ExpandSubscriber;
},{"../OuterSubscriber":4,"../util/errorObject":129,"../util/subscribeToResult":135,"../util/tryCatch":137}],51:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = expand;

var _expandSupport = require('./expand-support');

function expand(project) {
    var concurrent = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];

    return this.lift(new _expandSupport.ExpandOperator(project, concurrent));
}

module.exports = exports['default'];
},{"./expand-support":50}],52:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = filter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

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

var FilterOperator = (function () {
    function FilterOperator(select, thisArg) {
        _classCallCheck(this, FilterOperator);

        this.select = _utilBindCallback2['default'](select, thisArg, 2);
    }

    FilterOperator.prototype.call = function call(subscriber) {
        return new FilterSubscriber(subscriber, this.select);
    };

    return FilterOperator;
})();

var FilterSubscriber = (function (_Subscriber) {
    _inherits(FilterSubscriber, _Subscriber);

    function FilterSubscriber(destination, select) {
        _classCallCheck(this, FilterSubscriber);

        _Subscriber.call(this, destination);
        this.count = 0;
        this.select = select;
    }

    FilterSubscriber.prototype._next = function _next(x) {
        var result = _utilTryCatch2['default'](this.select)(x, this.count++);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(_utilErrorObject.errorObject.e);
        } else if (Boolean(result)) {
            this.destination.next(x);
        }
    };

    return FilterSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/bindCallback":128,"../util/errorObject":129,"../util/tryCatch":137}],53:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = _finally;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

function _finally(finallySelector, thisArg) {
    return this.lift(new FinallyOperator(thisArg ? _utilBindCallback2['default'](finallySelector, thisArg, 2) : finallySelector));
}

var FinallyOperator = (function () {
    function FinallyOperator(finallySelector) {
        _classCallCheck(this, FinallyOperator);

        this.finallySelector = finallySelector;
    }

    FinallyOperator.prototype.call = function call(subscriber) {
        return new FinallySubscriber(subscriber, this.finallySelector);
    };

    return FinallyOperator;
})();

var FinallySubscriber = (function (_Subscriber) {
    _inherits(FinallySubscriber, _Subscriber);

    function FinallySubscriber(destination, finallySelector) {
        _classCallCheck(this, FinallySubscriber);

        _Subscriber.call(this, destination);
        this.add(new _Subscription2['default'](finallySelector));
    }

    return FinallySubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../Subscription":8,"../util/bindCallback":128}],54:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = first;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilEmptyError = require('../util/EmptyError');

var _utilEmptyError2 = _interopRequireDefault(_utilEmptyError);

function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}

var FirstOperator = (function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, FirstOperator);

        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }

    FirstOperator.prototype.call = function call(observer) {
        return new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
    };

    return FirstOperator;
})();

var FirstSubscriber = (function (_Subscriber) {
    _inherits(FirstSubscriber, _Subscriber);

    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, FirstSubscriber);

        _Subscriber.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
    }

    FirstSubscriber.prototype._next = function _next(value) {
        var destination = this.destination;
        var predicate = this.predicate;
        var resultSelector = this.resultSelector;

        var index = this.index++;
        var passed = true;
        if (predicate) {
            passed = _utilTryCatch2['default'](predicate)(value, index, this.source);
            if (passed === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
                return;
            }
        }
        if (passed) {
            if (resultSelector) {
                value = _utilTryCatch2['default'](resultSelector)(value, index);
                if (value === _utilErrorObject.errorObject) {
                    destination.error(_utilErrorObject.errorObject.e);
                    return;
                }
            }
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
        }
    };

    FirstSubscriber.prototype._complete = function _complete() {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        } else if (!this.hasCompleted) {
            destination.error(new _utilEmptyError2['default']());
        }
    };

    return FirstSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/EmptyError":122,"../util/errorObject":129,"../util/tryCatch":137}],55:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscription3 = require('../Subscription');

var _Subscription4 = _interopRequireDefault(_Subscription3);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var RefCountSubscription = (function (_Subscription) {
    _inherits(RefCountSubscription, _Subscription);

    function RefCountSubscription() {
        _classCallCheck(this, RefCountSubscription);

        _Subscription.call(this);
        this.attemptedToUnsubscribePrimary = false;
        this.count = 0;
    }

    RefCountSubscription.prototype.setPrimary = function setPrimary(subscription) {
        this.primary = subscription;
    };

    RefCountSubscription.prototype.unsubscribe = function unsubscribe() {
        if (!this.isUnsubscribed && !this.attemptedToUnsubscribePrimary) {
            this.attemptedToUnsubscribePrimary = true;
            if (this.count === 0) {
                _Subscription.prototype.unsubscribe.call(this);
                this.primary.unsubscribe();
            }
        }
    };

    return RefCountSubscription;
})(_Subscription4['default']);

exports.RefCountSubscription = RefCountSubscription;

var GroupedObservable = (function (_Observable) {
    _inherits(GroupedObservable, _Observable);

    function GroupedObservable(key, groupSubject, refCountSubscription) {
        _classCallCheck(this, GroupedObservable);

        _Observable.call(this);
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
    }

    GroupedObservable.prototype._subscribe = function _subscribe(subscriber) {
        var subscription = new _Subscription4['default']();
        if (this.refCountSubscription && !this.refCountSubscription.isUnsubscribed) {
            subscription.add(new InnerRefCountSubscription(this.refCountSubscription));
        }
        subscription.add(this.groupSubject.subscribe(subscriber));
        return subscription;
    };

    return GroupedObservable;
})(_Observable3['default']);

exports.GroupedObservable = GroupedObservable;

var InnerRefCountSubscription = (function (_Subscription2) {
    _inherits(InnerRefCountSubscription, _Subscription2);

    function InnerRefCountSubscription(parent) {
        _classCallCheck(this, InnerRefCountSubscription);

        _Subscription2.call(this);
        this.parent = parent;
        parent.count++;
    }

    InnerRefCountSubscription.prototype.unsubscribe = function unsubscribe() {
        if (!this.parent.isUnsubscribed && !this.isUnsubscribed) {
            _Subscription2.prototype.unsubscribe.call(this);
            this.parent.count--;
            if (this.parent.count === 0 && this.parent.attemptedToUnsubscribePrimary) {
                this.parent.unsubscribe();
                this.parent.primary.unsubscribe();
            }
        }
    };

    return InnerRefCountSubscription;
})(_Subscription4['default']);

exports.InnerRefCountSubscription = InnerRefCountSubscription;
},{"../Observable":3,"../Subscription":8}],56:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.groupBy = groupBy;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _utilMap = require('../util/Map');

var _utilMap2 = _interopRequireDefault(_utilMap);

var _utilFastMap = require('../util/FastMap');

var _utilFastMap2 = _interopRequireDefault(_utilFastMap);

var _groupBySupport = require('./groupBy-support');

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function groupBy(keySelector, elementSelector, durationSelector) {
    return new GroupByObservable(this, keySelector, elementSelector, durationSelector);
}

var GroupByObservable = (function (_Observable) {
    _inherits(GroupByObservable, _Observable);

    function GroupByObservable(source, keySelector, elementSelector, durationSelector) {
        _classCallCheck(this, GroupByObservable);

        _Observable.call(this);
        this.source = source;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
    }

    GroupByObservable.prototype._subscribe = function _subscribe(subscriber) {
        var refCountSubscription = new _groupBySupport.RefCountSubscription();
        var groupBySubscriber = new GroupBySubscriber(subscriber, refCountSubscription, this.keySelector, this.elementSelector, this.durationSelector);
        refCountSubscription.setPrimary(this.source.subscribe(groupBySubscriber));
        return refCountSubscription;
    };

    return GroupByObservable;
})(_Observable3['default']);

exports.GroupByObservable = GroupByObservable;

var GroupBySubscriber = (function (_Subscriber) {
    _inherits(GroupBySubscriber, _Subscriber);

    function GroupBySubscriber(destination, refCountSubscription, keySelector, elementSelector, durationSelector) {
        _classCallCheck(this, GroupBySubscriber);

        _Subscriber.call(this);
        this.refCountSubscription = refCountSubscription;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.groups = null;
        this.destination = destination;
        this.add(destination);
    }

    GroupBySubscriber.prototype._next = function _next(x) {
        var key = _utilTryCatch2['default'](this.keySelector)(x);
        if (key === _utilErrorObject.errorObject) {
            this.error(key.e);
        } else {
            var groups = this.groups;
            var elementSelector = this.elementSelector;
            var durationSelector = this.durationSelector;
            if (!groups) {
                groups = this.groups = typeof key === 'string' ? new _utilFastMap2['default']() : new _utilMap2['default']();
            }
            var group = groups.get(key);
            if (!group) {
                groups.set(key, group = new _Subject2['default']());
                var groupedObservable = new _groupBySupport.GroupedObservable(key, group, this.refCountSubscription);
                if (durationSelector) {
                    var duration = _utilTryCatch2['default'](durationSelector)(new _groupBySupport.GroupedObservable(key, group));
                    if (duration === _utilErrorObject.errorObject) {
                        this.error(duration.e);
                    } else {
                        this.add(duration._subscribe(new GroupDurationSubscriber(key, group, this)));
                    }
                }
                this.destination.next(groupedObservable);
            }
            if (elementSelector) {
                var value = _utilTryCatch2['default'](elementSelector)(x);
                if (value === _utilErrorObject.errorObject) {
                    this.error(value.e);
                } else {
                    group.next(value);
                }
            } else {
                group.next(x);
            }
        }
    };

    GroupBySubscriber.prototype._error = function _error(err) {
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

    GroupBySubscriber.prototype._complete = function _complete() {
        var _this2 = this;

        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
                _this2.removeGroup(group);
            });
        }
        this.destination.complete();
    };

    GroupBySubscriber.prototype.removeGroup = function removeGroup(key) {
        this.groups['delete'](key);
    };

    return GroupBySubscriber;
})(_Subscriber4['default']);

var GroupDurationSubscriber = (function (_Subscriber2) {
    _inherits(GroupDurationSubscriber, _Subscriber2);

    function GroupDurationSubscriber(key, group, parent) {
        _classCallCheck(this, GroupDurationSubscriber);

        _Subscriber2.call(this, null);
        this.key = key;
        this.group = group;
        this.parent = parent;
    }

    GroupDurationSubscriber.prototype._next = function _next(value) {
        this.group.complete();
        this.parent.removeGroup(this.key);
    };

    GroupDurationSubscriber.prototype._error = function _error(err) {
        this.group.error(err);
        this.parent.removeGroup(this.key);
    };

    GroupDurationSubscriber.prototype._complete = function _complete() {
        this.group.complete();
        this.parent.removeGroup(this.key);
    };

    return GroupDurationSubscriber;
})(_Subscriber4['default']);
},{"../Observable":3,"../Subject":6,"../Subscriber":7,"../util/FastMap":123,"../util/Map":125,"../util/errorObject":129,"../util/tryCatch":137,"./groupBy-support":55}],57:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = ignoreElements;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}

;

var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
        _classCallCheck(this, IgnoreElementsOperator);
    }

    IgnoreElementsOperator.prototype.call = function call(subscriber) {
        return new IgnoreElementsSubscriber(subscriber);
    };

    return IgnoreElementsOperator;
})();

var IgnoreElementsSubscriber = (function (_Subscriber) {
    _inherits(IgnoreElementsSubscriber, _Subscriber);

    function IgnoreElementsSubscriber() {
        _classCallCheck(this, IgnoreElementsSubscriber);

        _Subscriber.apply(this, arguments);
    }

    IgnoreElementsSubscriber.prototype._next = function _next() {};

    return IgnoreElementsSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],58:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = last;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilEmptyError = require('../util/EmptyError');

var _utilEmptyError2 = _interopRequireDefault(_utilEmptyError);

function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}

var LastOperator = (function () {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, LastOperator);

        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }

    LastOperator.prototype.call = function call(observer) {
        return new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
    };

    return LastOperator;
})();

var LastSubscriber = (function (_Subscriber) {
    _inherits(LastSubscriber, _Subscriber);

    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, LastSubscriber);

        _Subscriber.call(this, destination);
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

    LastSubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        var resultSelector = this.resultSelector;
        var destination = this.destination;

        var index = this.index++;
        if (predicate) {
            var found = _utilTryCatch2['default'](predicate)(value, index, this.source);
            if (found === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
                return;
            }
            if (found) {
                if (resultSelector) {
                    value = _utilTryCatch2['default'](resultSelector)(value, index);
                    if (value === _utilErrorObject.errorObject) {
                        destination.error(_utilErrorObject.errorObject.e);
                        return;
                    }
                }
                this.lastValue = value;
                this.hasValue = true;
            }
        } else {
            this.lastValue = value;
            this.hasValue = true;
        }
    };

    LastSubscriber.prototype._complete = function _complete() {
        var destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        } else {
            destination.error(new _utilEmptyError2['default']());
        }
    };

    return LastSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/EmptyError":122,"../util/errorObject":129,"../util/tryCatch":137}],59:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = map;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

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

var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        _classCallCheck(this, MapOperator);

        this.project = _utilBindCallback2['default'](project, thisArg, 2);
    }

    MapOperator.prototype.call = function call(subscriber) {
        return new MapSubscriber(subscriber, this.project);
    };

    return MapOperator;
})();

var MapSubscriber = (function (_Subscriber) {
    _inherits(MapSubscriber, _Subscriber);

    function MapSubscriber(destination, project) {
        _classCallCheck(this, MapSubscriber);

        _Subscriber.call(this, destination);
        this.count = 0;
        this.project = project;
    }

    MapSubscriber.prototype._next = function _next(x) {
        var result = _utilTryCatch2['default'](this.project)(x, this.count++);
        if (result === _utilErrorObject.errorObject) {
            this.error(_utilErrorObject.errorObject.e);
        } else {
            this.destination.next(result);
        }
    };

    return MapSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/bindCallback":128,"../util/errorObject":129,"../util/tryCatch":137}],60:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = mapTo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

/**
 * Maps every value to the same value every time.
 * @param {any} value the value to map each incoming value to
 * @returns {Observable} an observable of the passed value that emits everytime the source does
 */

function mapTo(value) {
    return this.lift(new MapToOperator(value));
}

var MapToOperator = (function () {
    function MapToOperator(value) {
        _classCallCheck(this, MapToOperator);

        this.value = value;
    }

    MapToOperator.prototype.call = function call(subscriber) {
        return new MapToSubscriber(subscriber, this.value);
    };

    return MapToOperator;
})();

var MapToSubscriber = (function (_Subscriber) {
    _inherits(MapToSubscriber, _Subscriber);

    function MapToSubscriber(destination, value) {
        _classCallCheck(this, MapToSubscriber);

        _Subscriber.call(this, destination);
        this.value = value;
    }

    MapToSubscriber.prototype._next = function _next(x) {
        this.destination.next(this.value);
    };

    return MapToSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],61:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = materialize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function materialize() {
    return this.lift(new MaterializeOperator());
}

var MaterializeOperator = (function () {
    function MaterializeOperator() {
        _classCallCheck(this, MaterializeOperator);
    }

    MaterializeOperator.prototype.call = function call(subscriber) {
        return new MaterializeSubscriber(subscriber);
    };

    return MaterializeOperator;
})();

var MaterializeSubscriber = (function (_Subscriber) {
    _inherits(MaterializeSubscriber, _Subscriber);

    function MaterializeSubscriber(destination) {
        _classCallCheck(this, MaterializeSubscriber);

        _Subscriber.call(this, destination);
    }

    MaterializeSubscriber.prototype._next = function _next(value) {
        this.destination.next(_Notification2['default'].createNext(value));
    };

    MaterializeSubscriber.prototype._error = function _error(err) {
        var destination = this.destination;
        destination.next(_Notification2['default'].createError(err));
        destination.complete();
    };

    MaterializeSubscriber.prototype._complete = function _complete() {
        var destination = this.destination;
        destination.next(_Notification2['default'].createComplete());
        destination.complete();
    };

    return MaterializeSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Notification":2,"../Subscriber":7}],62:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = merge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _mergeAllSupport = require('./mergeAll-support');

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

function merge() {
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = _schedulersImmediate2['default'];

    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var last = observables[observables.length - 1];
    if (typeof last.schedule === 'function') {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    } else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (observables.length === 1) {
        return observables[0];
    }
    return new _observablesArrayObservable2['default'](observables, scheduler).lift(new _mergeAllSupport.MergeAllOperator(concurrent));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":9,"../schedulers/immediate":116,"./mergeAll-support":64}],63:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = merge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mergeStatic = require('./merge-static');

var _mergeStatic2 = _interopRequireDefault(_mergeStatic);

function merge() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    observables.unshift(this);
    return _mergeStatic2['default'].apply(this, observables);
}

module.exports = exports['default'];
},{"./merge-static":62}],64:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var MergeAllOperator = (function () {
    function MergeAllOperator(concurrent) {
        _classCallCheck(this, MergeAllOperator);

        this.concurrent = concurrent;
    }

    MergeAllOperator.prototype.call = function call(observer) {
        return new MergeAllSubscriber(observer, this.concurrent);
    };

    return MergeAllOperator;
})();

exports.MergeAllOperator = MergeAllOperator;

var MergeAllSubscriber = (function (_OuterSubscriber) {
    _inherits(MergeAllSubscriber, _OuterSubscriber);

    function MergeAllSubscriber(destination, concurrent) {
        _classCallCheck(this, MergeAllSubscriber);

        _OuterSubscriber.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }

    MergeAllSubscriber.prototype._next = function _next(observable) {
        if (this.active < this.concurrent) {
            if (observable._isScalar) {
                this.destination.next(observable.value);
            } else {
                this.active++;
                this.add(_utilSubscribeToResult2['default'](this, observable));
            }
        } else {
            this.buffer.push(observable);
        }
    };

    MergeAllSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };

    MergeAllSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };

    return MergeAllSubscriber;
})(_OuterSubscriber3['default']);

exports.MergeAllSubscriber = MergeAllSubscriber;
},{"../OuterSubscriber":4,"../util/subscribeToResult":135}],65:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = mergeAll;

var _mergeAllSupport = require('./mergeAll-support');

function mergeAll() {
    var concurrent = arguments.length <= 0 || arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];

    return this.lift(new _mergeAllSupport.MergeAllOperator(concurrent));
}

module.exports = exports['default'];
},{"./mergeAll-support":64}],66:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector) {
        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

        _classCallCheck(this, MergeMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }

    MergeMapOperator.prototype.call = function call(observer) {
        return new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent);
    };

    return MergeMapOperator;
})();

exports.MergeMapOperator = MergeMapOperator;

var MergeMapSubscriber = (function (_OuterSubscriber) {
    _inherits(MergeMapSubscriber, _OuterSubscriber);

    function MergeMapSubscriber(destination, project, resultSelector) {
        var concurrent = arguments.length <= 3 || arguments[3] === undefined ? Number.POSITIVE_INFINITY : arguments[3];

        _classCallCheck(this, MergeMapSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }

    MergeMapSubscriber.prototype._next = function _next(value) {
        if (this.active < this.concurrent) {
            var resultSelector = this.resultSelector;
            var index = this.index++;
            var ish = _utilTryCatch2['default'](this.project)(value, index);
            var destination = this.destination;
            if (ish === _utilErrorObject.errorObject) {
                destination.error(ish.e);
            } else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        } else {
            this.buffer.push(value);
        }
    };

    MergeMapSubscriber.prototype._innerSub = function _innerSub(ish, value, index) {
        this.add(_utilSubscribeToResult2['default'](this, ish, value, index));
    };

    MergeMapSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };

    MergeMapSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        var destination = this.destination;
        var resultSelector = this.resultSelector;

        if (resultSelector) {
            var result = _utilTryCatch2['default'](resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
            } else {
                destination.next(result);
            }
        } else {
            destination.next(innerValue);
        }
    };

    MergeMapSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };

    return MergeMapSubscriber;
})(_OuterSubscriber3['default']);

exports.MergeMapSubscriber = MergeMapSubscriber;
},{"../OuterSubscriber":4,"../util/errorObject":129,"../util/subscribeToResult":135,"../util/tryCatch":137}],67:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = mergeMap;

var _mergeMapSupport = require('./mergeMap-support');

function mergeMap(project, resultSelector) {
    var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

    return this.lift(new _mergeMapSupport.MergeMapOperator(project, resultSelector, concurrent));
}

module.exports = exports['default'];
},{"./mergeMap-support":66}],68:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var MergeMapToOperator = (function () {
    function MergeMapToOperator(ish, resultSelector) {
        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

        _classCallCheck(this, MergeMapToOperator);

        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }

    MergeMapToOperator.prototype.call = function call(observer) {
        return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
    };

    return MergeMapToOperator;
})();

exports.MergeMapToOperator = MergeMapToOperator;

var MergeMapToSubscriber = (function (_OuterSubscriber) {
    _inherits(MergeMapToSubscriber, _OuterSubscriber);

    function MergeMapToSubscriber(destination, ish, resultSelector) {
        var concurrent = arguments.length <= 3 || arguments[3] === undefined ? Number.POSITIVE_INFINITY : arguments[3];

        _classCallCheck(this, MergeMapToSubscriber);

        _OuterSubscriber.call(this, destination);
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }

    MergeMapToSubscriber.prototype._next = function _next(value) {
        if (this.active < this.concurrent) {
            var resultSelector = this.resultSelector;
            var index = this.index++;
            var ish = this.ish;
            var destination = this.destination;
            if (ish === _utilErrorObject.errorObject) {
                destination.error(ish.e);
            } else {
                this.active--;
                this._innerSub(ish, destination, resultSelector, value, index);
            }
        } else {
            this.buffer.push(value);
        }
    };

    MergeMapToSubscriber.prototype._innerSub = function _innerSub(ish, destination, resultSelector, value, index) {
        this.add(_utilSubscribeToResult2['default'](this, ish, value, index));
    };

    MergeMapToSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };

    MergeMapToSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        var resultSelector = this.resultSelector;
        var destination = this.destination;

        if (resultSelector) {
            var result = _utilTryCatch2['default'](resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
            } else {
                destination.next(result);
            }
        } else {
            destination.next(innerValue);
        }
    };

    MergeMapToSubscriber.prototype.notifyError = function notifyError(err) {
        this.destination.error(err);
    };

    MergeMapToSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };

    return MergeMapToSubscriber;
})(_OuterSubscriber3['default']);

exports.MergeMapToSubscriber = MergeMapToSubscriber;
},{"../OuterSubscriber":4,"../util/errorObject":129,"../util/subscribeToResult":135,"../util/tryCatch":137}],69:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = mergeMapTo;

var _mergeMapToSupport = require('./mergeMapTo-support');

function mergeMapTo(observable, resultSelector) {
    var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

    return this.lift(new _mergeMapToSupport.MergeMapToOperator(observable, resultSelector, concurrent));
}

module.exports = exports['default'];
},{"./mergeMapTo-support":68}],70:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = multicast;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesConnectableObservable = require('../observables/ConnectableObservable');

var _observablesConnectableObservable2 = _interopRequireDefault(_observablesConnectableObservable);

function multicast(subjectFactory) {
    return new _observablesConnectableObservable2['default'](this, subjectFactory);
}

module.exports = exports['default'];
},{"../observables/ConnectableObservable":10}],71:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler) {
        var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, ObserveOnOperator);

        this.delay = delay;
        this.scheduler = scheduler;
    }

    ObserveOnOperator.prototype.call = function call(subscriber) {
        return new ObserveOnSubscriber(subscriber, this.scheduler, this.delay);
    };

    return ObserveOnOperator;
})();

exports.ObserveOnOperator = ObserveOnOperator;

var ObserveOnSubscriber = (function (_Subscriber) {
    _inherits(ObserveOnSubscriber, _Subscriber);

    function ObserveOnSubscriber(destination, scheduler) {
        var delay = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        _classCallCheck(this, ObserveOnSubscriber);

        _Subscriber.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
    }

    ObserveOnSubscriber.dispatch = function dispatch(_ref) {
        var notification = _ref.notification;
        var destination = _ref.destination;

        notification.observe(destination);
    };

    ObserveOnSubscriber.prototype._next = function _next(x) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(_Notification2['default'].createNext(x), this.destination)));
    };

    ObserveOnSubscriber.prototype._error = function _error(e) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(_Notification2['default'].createError(e), this.destination)));
    };

    ObserveOnSubscriber.prototype._complete = function _complete() {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(_Notification2['default'].createComplete(), this.destination)));
    };

    return ObserveOnSubscriber;
})(_Subscriber3['default']);

exports.ObserveOnSubscriber = ObserveOnSubscriber;

var ObserveOnMessage = function ObserveOnMessage(notification, destination) {
    _classCallCheck(this, ObserveOnMessage);

    this.notification = notification;
    this.destination = destination;
};
},{"../Notification":2,"../Subscriber":7}],72:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = observeOn;

var _observeOnSupport = require('./observeOn-support');

function observeOn(scheduler) {
    var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return this.lift(new _observeOnSupport.ObserveOnOperator(scheduler, delay));
}

module.exports = exports['default'];
},{"./observeOn-support":71}],73:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = partition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilNot = require('../util/not');

var _utilNot2 = _interopRequireDefault(_utilNot);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function partition(predicate, thisArg) {
    return [_filter2['default'].call(this, predicate), _filter2['default'].call(this, _utilNot2['default'](predicate, thisArg))];
}

module.exports = exports['default'];
},{"../util/not":133,"./filter":52}],74:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = publish;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _multicast = require('./multicast');

var _multicast2 = _interopRequireDefault(_multicast);

function subjectFactory() {
    return new _Subject2['default']();
}

function publish() {
    return _multicast2['default'].call(this, subjectFactory);
}

module.exports = exports['default'];
},{"../Subject":6,"./multicast":70}],75:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = publishBehavior;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _subjectsBehaviorSubject = require('../subjects/BehaviorSubject');

var _subjectsBehaviorSubject2 = _interopRequireDefault(_subjectsBehaviorSubject);

var _multicast = require('./multicast');

var _multicast2 = _interopRequireDefault(_multicast);

function publishBehavior(value) {
    return _multicast2['default'].call(this, function () {
        return new _subjectsBehaviorSubject2['default'](value);
    });
}

module.exports = exports['default'];
},{"../subjects/BehaviorSubject":118,"./multicast":70}],76:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = publishReplay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _subjectsReplaySubject = require('../subjects/ReplaySubject');

var _subjectsReplaySubject2 = _interopRequireDefault(_subjectsReplaySubject);

var _multicast = require('./multicast');

var _multicast2 = _interopRequireDefault(_multicast);

function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === undefined) bufferSize = Number.POSITIVE_INFINITY;
    if (windowTime === undefined) windowTime = Number.POSITIVE_INFINITY;

    return _multicast2['default'].call(this, function () {
        return new _subjectsReplaySubject2['default'](bufferSize, windowTime, scheduler);
    });
}

module.exports = exports['default'];
},{"../subjects/ReplaySubject":119,"./multicast":70}],77:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = reduce;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function reduce(project, acc) {
    return this.lift(new ReduceOperator(project, acc));
}

var ReduceOperator = (function () {
    function ReduceOperator(project, acc) {
        _classCallCheck(this, ReduceOperator);

        this.acc = acc;
        this.project = project;
    }

    ReduceOperator.prototype.call = function call(subscriber) {
        return new ReduceSubscriber(subscriber, this.project, this.acc);
    };

    return ReduceOperator;
})();

var ReduceSubscriber = (function (_Subscriber) {
    _inherits(ReduceSubscriber, _Subscriber);

    function ReduceSubscriber(destination, project, acc) {
        _classCallCheck(this, ReduceSubscriber);

        _Subscriber.call(this, destination);
        this.hasValue = false;
        this.acc = acc;
        this.project = project;
        this.hasSeed = typeof acc !== 'undefined';
    }

    ReduceSubscriber.prototype._next = function _next(x) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            var result = _utilTryCatch2['default'](this.project).call(this, this.acc, x);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(_utilErrorObject.errorObject.e);
            } else {
                this.acc = result;
            }
        } else {
            this.acc = x;
            this.hasValue = true;
        }
    };

    ReduceSubscriber.prototype._complete = function _complete() {
        if (this.hasValue || this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    };

    return ReduceSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/errorObject":129,"../util/tryCatch":137}],78:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = repeat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function repeat(count) {
    return this.lift(new RepeatOperator(count, this));
}

var RepeatOperator = (function () {
    function RepeatOperator(count, original) {
        _classCallCheck(this, RepeatOperator);

        this.count = count;
        this.original = original;
    }

    RepeatOperator.prototype.call = function call(subscriber) {
        return new RepeatSubscriber(subscriber, this.count, this.original);
    };

    return RepeatOperator;
})();

var RepeatSubscriber = (function (_Subscriber) {
    _inherits(RepeatSubscriber, _Subscriber);

    function RepeatSubscriber(destination, count, original) {
        _classCallCheck(this, RepeatSubscriber);

        _Subscriber.call(this, destination);
        this.count = count;
        this.original = original;
        this.repeated = 0;
    }

    RepeatSubscriber.prototype._complete = function _complete() {
        if (this.count === (this.repeated += 1)) {
            this.destination.complete();
        } else {
            this.resubscribe();
        }
    };

    RepeatSubscriber.prototype.resubscribe = function resubscribe() {
        this.original.subscribe(this);
    };

    return RepeatSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],79:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = retry;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function retry() {
    var count = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    return this.lift(new RetryOperator(count, this));
}

var RetryOperator = (function () {
    function RetryOperator(count, original) {
        _classCallCheck(this, RetryOperator);

        this.count = count;
        this.original = original;
    }

    RetryOperator.prototype.call = function call(subscriber) {
        return new RetrySubscriber(subscriber, this.count, this.original);
    };

    return RetryOperator;
})();

var RetrySubscriber = (function (_Subscriber) {
    _inherits(RetrySubscriber, _Subscriber);

    function RetrySubscriber(destination, count, original) {
        _classCallCheck(this, RetrySubscriber);

        _Subscriber.call(this, destination);
        this.count = count;
        this.original = original;
        this.retries = 0;
    }

    RetrySubscriber.prototype._error = function _error(err) {
        var count = this.count;
        if (count && count === (this.retries += 1)) {
            this.destination.error(err);
        } else {
            this.resubscribe();
        }
    };

    RetrySubscriber.prototype.resubscribe = function resubscribe() {
        this.original.subscribe(this);
    };

    return RetrySubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],80:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = retryWhen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}

var RetryWhenOperator = (function () {
    function RetryWhenOperator(notifier, original) {
        _classCallCheck(this, RetryWhenOperator);

        this.notifier = notifier;
        this.original = original;
    }

    RetryWhenOperator.prototype.call = function call(subscriber) {
        return new RetryWhenSubscriber(subscriber, this.notifier, this.original);
    };

    return RetryWhenOperator;
})();

var RetryWhenSubscriber = (function (_Subscriber) {
    _inherits(RetryWhenSubscriber, _Subscriber);

    function RetryWhenSubscriber(destination, notifier, original) {
        _classCallCheck(this, RetryWhenSubscriber);

        _Subscriber.call(this, destination);
        this.notifier = notifier;
        this.original = original;
    }

    RetryWhenSubscriber.prototype._error = function _error(err) {
        if (!this.retryNotifications) {
            this.errors = new _Subject2['default']();
            var notifications = _utilTryCatch2['default'](this.notifier).call(this, this.errors);
            if (notifications === _utilErrorObject.errorObject) {
                this.destination.error(_utilErrorObject.errorObject.e);
            } else {
                this.retryNotifications = notifications;
                this.add(notifications._subscribe(new RetryNotificationSubscriber(this)));
            }
        }
        this.errors.next(err);
    };

    RetryWhenSubscriber.prototype.finalError = function finalError(err) {
        this.destination.error(err);
    };

    RetryWhenSubscriber.prototype.resubscribe = function resubscribe() {
        this.original.subscribe(this);
    };

    return RetryWhenSubscriber;
})(_Subscriber4['default']);

var RetryNotificationSubscriber = (function (_Subscriber2) {
    _inherits(RetryNotificationSubscriber, _Subscriber2);

    function RetryNotificationSubscriber(parent) {
        _classCallCheck(this, RetryNotificationSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
    }

    RetryNotificationSubscriber.prototype._next = function _next(value) {
        this.parent.resubscribe();
    };

    RetryNotificationSubscriber.prototype._error = function _error(err) {
        this.parent.finalError(err);
    };

    RetryNotificationSubscriber.prototype._complete = function _complete() {
        this.parent.complete();
    };

    return RetryNotificationSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subject":6,"../Subscriber":7,"../util/errorObject":129,"../util/tryCatch":137}],81:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = sample;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
}

var SampleOperator = (function () {
    function SampleOperator(notifier) {
        _classCallCheck(this, SampleOperator);

        this.notifier = notifier;
    }

    SampleOperator.prototype.call = function call(subscriber) {
        return new SampleSubscriber(subscriber, this.notifier);
    };

    return SampleOperator;
})();

var SampleSubscriber = (function (_Subscriber) {
    _inherits(SampleSubscriber, _Subscriber);

    function SampleSubscriber(destination, notifier) {
        _classCallCheck(this, SampleSubscriber);

        _Subscriber.call(this, destination);
        this.notifier = notifier;
        this.hasValue = false;
        this.add(notifier._subscribe(new SampleNoficationSubscriber(this)));
    }

    SampleSubscriber.prototype._next = function _next(value) {
        this.lastValue = value;
        this.hasValue = true;
    };

    SampleSubscriber.prototype.notifyNext = function notifyNext() {
        if (this.hasValue) {
            this.destination.next(this.lastValue);
        }
    };

    return SampleSubscriber;
})(_Subscriber4['default']);

var SampleNoficationSubscriber = (function (_Subscriber2) {
    _inherits(SampleNoficationSubscriber, _Subscriber2);

    function SampleNoficationSubscriber(parent) {
        _classCallCheck(this, SampleNoficationSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
    }

    SampleNoficationSubscriber.prototype._next = function _next() {
        this.parent.notifyNext();
    };

    SampleNoficationSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    SampleNoficationSubscriber.prototype._complete = function _complete() {
        //noop
    };

    return SampleNoficationSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],82:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = sampleTime;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

function sampleTime(delay) {
    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersNextTick2['default'] : arguments[1];

    return this.lift(new SampleTimeOperator(delay, scheduler));
}

var SampleTimeOperator = (function () {
    function SampleTimeOperator(delay, scheduler) {
        _classCallCheck(this, SampleTimeOperator);

        this.delay = delay;
        this.scheduler = scheduler;
    }

    SampleTimeOperator.prototype.call = function call(subscriber) {
        return new SampleTimeSubscriber(subscriber, this.delay, this.scheduler);
    };

    return SampleTimeOperator;
})();

var SampleTimeSubscriber = (function (_Subscriber) {
    _inherits(SampleTimeSubscriber, _Subscriber);

    function SampleTimeSubscriber(destination, delay, scheduler) {
        _classCallCheck(this, SampleTimeSubscriber);

        _Subscriber.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.hasValue = false;
        this.add(scheduler.schedule(dispatchNotification, delay, { subscriber: this, delay: delay }));
    }

    SampleTimeSubscriber.prototype._next = function _next(value) {
        this.lastValue = value;
        this.hasValue = true;
    };

    SampleTimeSubscriber.prototype.notifyNext = function notifyNext() {
        if (this.hasValue) {
            this.destination.next(this.lastValue);
        }
    };

    return SampleTimeSubscriber;
})(_Subscriber3['default']);

function dispatchNotification(state) {
    var subscriber = state.subscriber;
    var delay = state.delay;

    subscriber.notifyNext();
    this.schedule(state, delay);
}
module.exports = exports['default'];
},{"../Subscriber":7,"../schedulers/nextTick":117}],83:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = scan;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function scan(project, acc) {
    return this.lift(new ScanOperator(project));
}

var ScanOperator = (function () {
    function ScanOperator(project, acc) {
        _classCallCheck(this, ScanOperator);

        this.acc = acc;
        this.project = project;
    }

    ScanOperator.prototype.call = function call(subscriber) {
        return new ScanSubscriber(subscriber, this.project, this.acc);
    };

    return ScanOperator;
})();

var ScanSubscriber = (function (_Subscriber) {
    _inherits(ScanSubscriber, _Subscriber);

    function ScanSubscriber(destination, project, acc) {
        _classCallCheck(this, ScanSubscriber);

        _Subscriber.call(this, destination);
        this.hasValue = false;
        this.acc = acc;
        this.project = project;
        this.hasSeed = typeof acc !== 'undefined';
    }

    ScanSubscriber.prototype._next = function _next(x) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            var result = _utilTryCatch2['default'](this.project).call(this, this.acc, x);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(_utilErrorObject.errorObject.e);
            } else {
                this.destination.next(this.acc = result);
            }
        } else {
            return this.destination.next((this.hasValue = true) && (this.acc = x));
        }
    };

    ScanSubscriber.prototype._complete = function _complete() {
        if (!this.hasValue && this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    };

    return ScanSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/errorObject":129,"../util/tryCatch":137}],84:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = share;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

function share() {
    return _publish2['default'].call(this).refCount();
}

;
module.exports = exports['default'];
},{"./publish":74}],85:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = shareReplay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _publishReplay = require('./publishReplay');

var _publishReplay2 = _interopRequireDefault(_publishReplay);

function shareReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === undefined) bufferSize = Number.POSITIVE_INFINITY;
    if (windowTime === undefined) windowTime = Number.POSITIVE_INFINITY;

    return _publishReplay2['default'].call(this, bufferSize, windowTime, scheduler).refCount();
}

module.exports = exports['default'];
},{"./publishReplay":76}],86:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = single;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

var _utilEmptyError = require('../util/EmptyError');

var _utilEmptyError2 = _interopRequireDefault(_utilEmptyError);

function single(predicate, thisArg) {
    return this.lift(new SingleOperator(predicate, thisArg, this));
}

var SingleOperator = (function () {
    function SingleOperator(predicate, thisArg, source) {
        _classCallCheck(this, SingleOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }

    SingleOperator.prototype.call = function call(subscriber) {
        return new SingleSubscriber(subscriber, this.predicate, this.thisArg, this.source);
    };

    return SingleOperator;
})();

var SingleSubscriber = (function (_Subscriber) {
    _inherits(SingleSubscriber, _Subscriber);

    function SingleSubscriber(destination, predicate, thisArg, source) {
        _classCallCheck(this, SingleSubscriber);

        _Subscriber.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = _utilBindCallback2['default'](predicate, thisArg, 3);
        }
    }

    SingleSubscriber.prototype.applySingleValue = function applySingleValue(value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        } else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };

    SingleSubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        var currentIndex = this.index++;
        if (predicate) {
            var result = _utilTryCatch2['default'](predicate)(value, currentIndex, this.source);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(result.e);
            } else if (result) {
                this.applySingleValue(value);
            }
        } else {
            this.applySingleValue(value);
        }
    };

    SingleSubscriber.prototype._complete = function _complete() {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        } else {
            destination.error(new _utilEmptyError2['default']());
        }
    };

    return SingleSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../util/EmptyError":122,"../util/bindCallback":128,"../util/errorObject":129,"../util/tryCatch":137}],87:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = skip;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function skip(total) {
    return this.lift(new SkipOperator(total));
}

var SkipOperator = (function () {
    function SkipOperator(total) {
        _classCallCheck(this, SkipOperator);

        this.total = total;
    }

    SkipOperator.prototype.call = function call(subscriber) {
        return new SkipSubscriber(subscriber, this.total);
    };

    return SkipOperator;
})();

var SkipSubscriber = (function (_Subscriber) {
    _inherits(SkipSubscriber, _Subscriber);

    function SkipSubscriber(destination, total) {
        _classCallCheck(this, SkipSubscriber);

        _Subscriber.call(this, destination);
        this.count = 0;
        this.total = total;
    }

    SkipSubscriber.prototype._next = function _next(x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };

    return SkipSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],88:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = skipUntil;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

function skipUntil(total) {
    return this.lift(new SkipUntilOperator(total));
}

var SkipUntilOperator = (function () {
    function SkipUntilOperator(notifier) {
        _classCallCheck(this, SkipUntilOperator);

        this.notifier = notifier;
    }

    SkipUntilOperator.prototype.call = function call(subscriber) {
        return new SkipUntilSubscriber(subscriber, this.notifier);
    };

    return SkipUntilOperator;
})();

var SkipUntilSubscriber = (function (_Subscriber) {
    _inherits(SkipUntilSubscriber, _Subscriber);

    function SkipUntilSubscriber(destination, notifier) {
        _classCallCheck(this, SkipUntilSubscriber);

        _Subscriber.call(this, destination);
        this.notifier = notifier;
        this.notificationSubscriber = null;
        this.notificationSubscriber = new NotificationSubscriber(this);
        this.add(this.notifier.subscribe(this.notificationSubscriber));
    }

    SkipUntilSubscriber.prototype._next = function _next(value) {
        if (this.notificationSubscriber.hasValue) {
            this.destination.next(value);
        }
    };

    SkipUntilSubscriber.prototype._complete = function _complete() {
        if (this.notificationSubscriber.hasCompleted) {
            this.destination.complete();
        }
        this.notificationSubscriber.unsubscribe();
    };

    return SkipUntilSubscriber;
})(_Subscriber4['default']);

var NotificationSubscriber = (function (_Subscriber2) {
    _inherits(NotificationSubscriber, _Subscriber2);

    function NotificationSubscriber(parent) {
        _classCallCheck(this, NotificationSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.hasValue = false;
        this.hasCompleted = false;
    }

    NotificationSubscriber.prototype._next = function _next(unused) {
        this.hasValue = true;
    };

    NotificationSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
        this.hasValue = true;
    };

    NotificationSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
    };

    return NotificationSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],89:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = startWith;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _observablesScalarObservable = require('../observables/ScalarObservable');

var _observablesScalarObservable2 = _interopRequireDefault(_observablesScalarObservable);

var _observablesEmptyObservable = require('../observables/EmptyObservable');

var _observablesEmptyObservable2 = _interopRequireDefault(_observablesEmptyObservable);

var _concatStatic = require('./concat-static');

var _concatStatic2 = _interopRequireDefault(_concatStatic);

function startWith() {
    for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
        array[_key] = arguments[_key];
    }

    var scheduler = array[array.length - 1];
    if (scheduler && typeof scheduler.schedule === 'function') {
        array.pop();
    } else {
        scheduler = void 0;
    }
    var len = array.length;
    if (len === 1) {
        return _concatStatic2['default'](new _observablesScalarObservable2['default'](array[0], scheduler), this);
    } else if (len > 1) {
        return _concatStatic2['default'](new _observablesArrayObservable2['default'](array, scheduler), this);
    } else {
        return _concatStatic2['default'](new _observablesEmptyObservable2['default'](scheduler), this);
    }
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":9,"../observables/EmptyObservable":12,"../observables/ScalarObservable":23,"./concat-static":36}],90:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = subscribeOn;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesSubscribeOnObservable = require('../observables/SubscribeOnObservable');

var _observablesSubscribeOnObservable2 = _interopRequireDefault(_observablesSubscribeOnObservable);

function subscribeOn(scheduler) {
    var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return new _observablesSubscribeOnObservable2['default'](this, delay, scheduler);
}

module.exports = exports['default'];
},{"../observables/SubscribeOnObservable":24}],91:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = _switch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

function _switch() {
    return this.lift(new SwitchOperator());
}

var SwitchOperator = (function () {
    function SwitchOperator() {
        _classCallCheck(this, SwitchOperator);
    }

    SwitchOperator.prototype.call = function call(subscriber) {
        return new SwitchSubscriber(subscriber);
    };

    return SwitchOperator;
})();

var SwitchSubscriber = (function (_OuterSubscriber) {
    _inherits(SwitchSubscriber, _OuterSubscriber);

    function SwitchSubscriber(destination) {
        _classCallCheck(this, SwitchSubscriber);

        _OuterSubscriber.call(this, destination);
        this.active = 0;
        this.hasCompleted = false;
    }

    SwitchSubscriber.prototype._next = function _next(value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = _utilSubscribeToResult2['default'](this, value));
    };

    SwitchSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.active === 0) {
            this.destination.complete();
        }
    };

    SwitchSubscriber.prototype.unsubscribeInner = function unsubscribeInner() {
        this.active = this.active > 0 ? this.active - 1 : 0;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
            this.remove(innerSubscription);
        }
    };

    SwitchSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue) {
        this.destination.next(innerValue);
    };

    SwitchSubscriber.prototype.notifyError = function notifyError(err) {
        this.destination.error(err);
    };

    SwitchSubscriber.prototype.notifyComplete = function notifyComplete() {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };

    return SwitchSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];
},{"../OuterSubscriber":4,"../util/subscribeToResult":135}],92:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = switchMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}

var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        _classCallCheck(this, SwitchMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
    }

    SwitchMapOperator.prototype.call = function call(subscriber) {
        return new SwitchMapSubscriber(subscriber, this.project, this.resultSelector);
    };

    return SwitchMapOperator;
})();

var SwitchMapSubscriber = (function (_OuterSubscriber) {
    _inherits(SwitchMapSubscriber, _OuterSubscriber);

    function SwitchMapSubscriber(destination, project, resultSelector) {
        _classCallCheck(this, SwitchMapSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.hasCompleted = false;
        this.index = 0;
    }

    SwitchMapSubscriber.prototype._next = function _next(value) {
        var index = this.index++;
        var destination = this.destination;
        var result = _utilTryCatch2['default'](this.project)(value, index);
        if (result === _utilErrorObject.errorObject) {
            destination.error(result.e);
        } else {
            var innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            this.add(this.innerSubscription = _utilSubscribeToResult2['default'](this, result, value, index));
        }
    };

    SwitchMapSubscriber.prototype._complete = function _complete() {
        var innerSubscription = this.innerSubscription;
        this.hasCompleted = true;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            this.destination.complete();
        }
    };

    SwitchMapSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
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

    SwitchMapSubscriber.prototype.notifyError = function notifyError(err) {
        this.destination.error(err);
    };

    SwitchMapSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        var resultSelector = this.resultSelector;
        var destination = this.destination;

        if (resultSelector) {
            var result = _utilTryCatch2['default'](resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
            } else {
                destination.next(result);
            }
        } else {
            destination.next(innerValue);
        }
    };

    return SwitchMapSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];
},{"../OuterSubscriber":4,"../util/errorObject":129,"../util/subscribeToResult":135,"../util/tryCatch":137}],93:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = switchMapTo;

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mergeMapToSupport = require('./mergeMapTo-support');

function switchMapTo(observable, projectResult) {
    return this.lift(new SwitchMapToOperator(observable, projectResult));
}

var SwitchMapToOperator = (function () {
    function SwitchMapToOperator(observable, resultSelector) {
        _classCallCheck(this, SwitchMapToOperator);

        this.observable = observable;
        this.resultSelector = resultSelector;
    }

    SwitchMapToOperator.prototype.call = function call(subscriber) {
        return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
    };

    return SwitchMapToOperator;
})();

var SwitchMapToSubscriber = (function (_MergeMapToSubscriber) {
    _inherits(SwitchMapToSubscriber, _MergeMapToSubscriber);

    function SwitchMapToSubscriber(destination, observable, resultSelector) {
        _classCallCheck(this, SwitchMapToSubscriber);

        _MergeMapToSubscriber.call(this, destination, observable, resultSelector, 1);
    }

    return SwitchMapToSubscriber;
})(_mergeMapToSupport.MergeMapToSubscriber);

module.exports = exports['default'];
},{"./mergeMapTo-support":68}],94:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = take;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function take(total) {
    return this.lift(new TakeOperator(total));
}

var TakeOperator = (function () {
    function TakeOperator(total) {
        _classCallCheck(this, TakeOperator);

        this.total = total;
    }

    TakeOperator.prototype.call = function call(subscriber) {
        return new TakeSubscriber(subscriber, this.total);
    };

    return TakeOperator;
})();

var TakeSubscriber = (function (_Subscriber) {
    _inherits(TakeSubscriber, _Subscriber);

    function TakeSubscriber(destination, total) {
        _classCallCheck(this, TakeSubscriber);

        _Subscriber.call(this, destination);
        this.count = 0;
        this.total = total;
    }

    TakeSubscriber.prototype._next = function _next(x) {
        var total = this.total;
        if (++this.count <= total) {
            this.destination.next(x);
            if (this.count === total) {
                this.destination.complete();
            }
        }
    };

    return TakeSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],95:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = takeUntil;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

function takeUntil(observable) {
    return this.lift(new TakeUntilOperator(observable));
}

var TakeUntilOperator = (function () {
    function TakeUntilOperator(observable) {
        _classCallCheck(this, TakeUntilOperator);

        this.observable = observable;
    }

    TakeUntilOperator.prototype.call = function call(subscriber) {
        return new TakeUntilSubscriber(subscriber, this.observable);
    };

    return TakeUntilOperator;
})();

var TakeUntilSubscriber = (function (_Subscriber) {
    _inherits(TakeUntilSubscriber, _Subscriber);

    function TakeUntilSubscriber(destination, observable) {
        _classCallCheck(this, TakeUntilSubscriber);

        _Subscriber.call(this, destination);
        this.add(observable._subscribe(new TakeUntilInnerSubscriber(destination)));
    }

    return TakeUntilSubscriber;
})(_Subscriber4['default']);

var TakeUntilInnerSubscriber = (function (_Subscriber2) {
    _inherits(TakeUntilInnerSubscriber, _Subscriber2);

    function TakeUntilInnerSubscriber(destination) {
        _classCallCheck(this, TakeUntilInnerSubscriber);

        _Subscriber2.call(this, destination);
    }

    TakeUntilInnerSubscriber.prototype._next = function _next() {
        this.destination.complete();
    };

    TakeUntilInnerSubscriber.prototype._error = function _error(e) {
        this.destination.error(e);
    };

    TakeUntilInnerSubscriber.prototype._complete = function _complete() {};

    return TakeUntilInnerSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],96:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = throttle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

function throttle(delay) {
    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersNextTick2['default'] : arguments[1];

    return this.lift(new ThrottleOperator(delay, scheduler));
}

var ThrottleOperator = (function () {
    function ThrottleOperator(delay, scheduler) {
        _classCallCheck(this, ThrottleOperator);

        this.delay = delay;
        this.scheduler = scheduler;
    }

    ThrottleOperator.prototype.call = function call(subscriber) {
        return new ThrottleSubscriber(subscriber, this.delay, this.scheduler);
    };

    return ThrottleOperator;
})();

var ThrottleSubscriber = (function (_Subscriber) {
    _inherits(ThrottleSubscriber, _Subscriber);

    function ThrottleSubscriber(destination, delay, scheduler) {
        _classCallCheck(this, ThrottleSubscriber);

        _Subscriber.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
    }

    ThrottleSubscriber.prototype._next = function _next(value) {
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, { value: value, subscriber: this }));
        }
    };

    ThrottleSubscriber.prototype.throttledNext = function throttledNext(value) {
        this.clearThrottle();
        this.destination.next(value);
    };

    ThrottleSubscriber.prototype.clearThrottle = function clearThrottle() {
        var throttled = this.throttled;
        if (throttled) {
            throttled.unsubscribe();
            this.remove(throttled);
        }
    };

    return ThrottleSubscriber;
})(_Subscriber3['default']);

function dispatchNext(_ref) {
    var value = _ref.value;
    var subscriber = _ref.subscriber;

    subscriber.throttledNext(value);
}
module.exports = exports['default'];
},{"../Subscriber":7,"../schedulers/nextTick":117}],97:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = timeout;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var _utilIsDate = require('../util/isDate');

var _utilIsDate2 = _interopRequireDefault(_utilIsDate);

function timeout(due) {
    var errorToSend = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersImmediate2['default'] : arguments[2];

    var absoluteTimeout = _utilIsDate2['default'](due);
    var waitFor = absoluteTimeout ? +due - scheduler.now() : due;
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
}

var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler) {
        _classCallCheck(this, TimeoutOperator);

        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
    }

    TimeoutOperator.prototype.call = function call(subscriber) {
        return new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler);
    };

    return TimeoutOperator;
})();

var TimeoutSubscriber = (function (_Subscriber) {
    _inherits(TimeoutSubscriber, _Subscriber);

    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
        _classCallCheck(this, TimeoutSubscriber);

        _Subscriber.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
    }

    TimeoutSubscriber.dispatchTimeout = function dispatchTimeout(state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.notifyTimeout();
        }
    };

    TimeoutSubscriber.prototype.scheduleTimeout = function scheduleTimeout() {
        var currentIndex = this.index;
        this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
        this.index++;
        this._previousIndex = currentIndex;
    };

    TimeoutSubscriber.prototype._next = function _next(value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
    };

    TimeoutSubscriber.prototype._error = function _error(err) {
        this.destination.error(err);
        this._hasCompleted = true;
    };

    TimeoutSubscriber.prototype._complete = function _complete() {
        this.destination.complete();
        this._hasCompleted = true;
    };

    TimeoutSubscriber.prototype.notifyTimeout = function notifyTimeout() {
        this.error(this.errorToSend || new Error('timeout'));
    };

    _createClass(TimeoutSubscriber, [{
        key: 'previousIndex',
        get: function get() {
            return this._previousIndex;
        }
    }, {
        key: 'hasCompleted',
        get: function get() {
            return this._hasCompleted;
        }
    }]);

    return TimeoutSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7,"../schedulers/immediate":116,"../util/isDate":130}],98:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = timeoutWith;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var _utilIsDate = require('../util/isDate');

var _utilIsDate2 = _interopRequireDefault(_utilIsDate);

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

function timeoutWith(due, withObservable) {
    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersImmediate2['default'] : arguments[2];

    var absoluteTimeout = _utilIsDate2['default'](due);
    var waitFor = absoluteTimeout ? +due - scheduler.now() : due;
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}

var TimeoutWithOperator = (function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithOperator);

        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }

    TimeoutWithOperator.prototype.call = function call(subscriber) {
        return new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler);
    };

    return TimeoutWithOperator;
})();

var TimeoutWithSubscriber = (function (_OuterSubscriber) {
    _inherits(TimeoutWithSubscriber, _OuterSubscriber);

    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithSubscriber);

        _OuterSubscriber.call(this, destination);
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

    TimeoutWithSubscriber.dispatchTimeout = function dispatchTimeout(state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.handleTimeout();
        }
    };

    TimeoutWithSubscriber.prototype.scheduleTimeout = function scheduleTimeout() {
        var currentIndex = this.index;
        var timeoutState = { subscriber: this, index: currentIndex };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
        this.index++;
        this._previousIndex = currentIndex;
    };

    TimeoutWithSubscriber.prototype._next = function _next(value) {
        if (!this.timedOut) {
            this.destination.next(value);
            if (!this.absoluteTimeout) {
                this.scheduleTimeout();
            }
        }
    };

    TimeoutWithSubscriber.prototype._error = function _error(err) {
        if (!this.timedOut) {
            this.destination.error(err);
            this._hasCompleted = true;
        }
    };

    TimeoutWithSubscriber.prototype._complete = function _complete() {
        if (!this.timedOut) {
            this.destination.complete();
            this._hasCompleted = true;
        }
    };

    TimeoutWithSubscriber.prototype.handleTimeout = function handleTimeout() {
        var withObservable = this.withObservable;
        this.timedOut = true;
        this.add(this.timeoutSubscription = _utilSubscribeToResult2['default'](this, withObservable));
    };

    _createClass(TimeoutWithSubscriber, [{
        key: 'previousIndex',
        get: function get() {
            return this._previousIndex;
        }
    }, {
        key: 'hasCompleted',
        get: function get() {
            return this._hasCompleted;
        }
    }]);

    return TimeoutWithSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];
},{"../OuterSubscriber":4,"../schedulers/immediate":116,"../util/isDate":130,"../util/subscribeToResult":135}],99:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = toArray;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function toArray() {
    return this.lift(new ToArrayOperator());
}

var ToArrayOperator = (function () {
    function ToArrayOperator() {
        _classCallCheck(this, ToArrayOperator);
    }

    ToArrayOperator.prototype.call = function call(subscriber) {
        return new ToArraySubscriber(subscriber);
    };

    return ToArrayOperator;
})();

var ToArraySubscriber = (function (_Subscriber) {
    _inherits(ToArraySubscriber, _Subscriber);

    function ToArraySubscriber(destination) {
        _classCallCheck(this, ToArraySubscriber);

        _Subscriber.call(this, destination);
        this.array = [];
    }

    ToArraySubscriber.prototype._next = function _next(x) {
        this.array.push(x);
    };

    ToArraySubscriber.prototype._complete = function _complete() {
        this.destination.next(this.array);
        this.destination.complete();
    };

    return ToArraySubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":7}],100:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = toPromise;

var _utilRoot = require('../util/root');

function toPromise(PromiseCtor) {
    var _this = this;

    if (!PromiseCtor) {
        if (_utilRoot.root.Rx && _utilRoot.root.Rx.config && _utilRoot.root.Rx.config.Promise) {
            PromiseCtor = _utilRoot.root.Rx.config.Promise;
        } else if (_utilRoot.root.Promise) {
            PromiseCtor = _utilRoot.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value = undefined;
        _this.subscribe(function (x) {
            return value = x;
        }, function (err) {
            return reject(err);
        }, function () {
            return resolve(value);
        });
    });
}

module.exports = exports['default'];
},{"../util/root":134}],101:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = window;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

function window(closingNotifier) {
    return this.lift(new WindowOperator(closingNotifier));
}

var WindowOperator = (function () {
    function WindowOperator(closingNotifier) {
        _classCallCheck(this, WindowOperator);

        this.closingNotifier = closingNotifier;
    }

    WindowOperator.prototype.call = function call(subscriber) {
        return new WindowSubscriber(subscriber, this.closingNotifier);
    };

    return WindowOperator;
})();

var WindowSubscriber = (function (_Subscriber) {
    _inherits(WindowSubscriber, _Subscriber);

    function WindowSubscriber(destination, closingNotifier) {
        _classCallCheck(this, WindowSubscriber);

        _Subscriber.call(this, destination);
        this.closingNotifier = closingNotifier;
        this.window = new _Subject2['default']();
        this.add(closingNotifier._subscribe(new WindowClosingNotifierSubscriber(this)));
        this.openWindow();
    }

    WindowSubscriber.prototype._next = function _next(value) {
        this.window.next(value);
    };

    WindowSubscriber.prototype._error = function _error(err) {
        this.window.error(err);
        this.destination.error(err);
    };

    WindowSubscriber.prototype._complete = function _complete() {
        this.window.complete();
        this.destination.complete();
    };

    WindowSubscriber.prototype.openWindow = function openWindow() {
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        this.destination.next(this.window = new _Subject2['default']());
    };

    return WindowSubscriber;
})(_Subscriber4['default']);

var WindowClosingNotifierSubscriber = (function (_Subscriber2) {
    _inherits(WindowClosingNotifierSubscriber, _Subscriber2);

    function WindowClosingNotifierSubscriber(parent) {
        _classCallCheck(this, WindowClosingNotifierSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
    }

    WindowClosingNotifierSubscriber.prototype._next = function _next() {
        this.parent.openWindow();
    };

    WindowClosingNotifierSubscriber.prototype._error = function _error(err) {
        this.parent._error(err);
    };

    WindowClosingNotifierSubscriber.prototype._complete = function _complete() {
        this.parent._complete();
    };

    return WindowClosingNotifierSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subject":6,"../Subscriber":7}],102:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = windowCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

function windowCount(windowSize) {
    var startWindowEvery = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}

var WindowCountOperator = (function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        _classCallCheck(this, WindowCountOperator);

        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }

    WindowCountOperator.prototype.call = function call(subscriber) {
        return new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery);
    };

    return WindowCountOperator;
})();

var WindowCountSubscriber = (function (_Subscriber) {
    _inherits(WindowCountSubscriber, _Subscriber);

    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        _classCallCheck(this, WindowCountSubscriber);

        _Subscriber.call(this, destination);
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new _Subject2['default']()];
        this.count = 0;
        destination.next(this.windows[0]);
    }

    WindowCountSubscriber.prototype._next = function _next(value) {
        var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
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
            var _window = new _Subject2['default']();
            windows.push(_window);
            this.destination.next(_window);
        }
    };

    WindowCountSubscriber.prototype._error = function _error(err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };

    WindowCountSubscriber.prototype._complete = function _complete() {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().complete();
        }
        this.destination.complete();
    };

    return WindowCountSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subject":6,"../Subscriber":7}],103:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = windowTime;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

function windowTime(windowTimeSpan) {
    var windowCreationInterval = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersNextTick2['default'] : arguments[2];

    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
}

var WindowTimeOperator = (function () {
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
        _classCallCheck(this, WindowTimeOperator);

        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
    }

    WindowTimeOperator.prototype.call = function call(subscriber) {
        return new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler);
    };

    return WindowTimeOperator;
})();

var WindowTimeSubscriber = (function (_Subscriber) {
    _inherits(WindowTimeSubscriber, _Subscriber);

    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        _classCallCheck(this, WindowTimeSubscriber);

        _Subscriber.call(this, destination);
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
        this.windows = [];
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var _window = this.openWindow();
            var closeState = { subscriber: this, window: _window, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: this, scheduler: scheduler };
            this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        } else {
            var _window2 = this.openWindow();
            var timeSpanOnlyState = { subscriber: this, window: _window2, windowTimeSpan: windowTimeSpan };
            this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
    }

    WindowTimeSubscriber.prototype._next = function _next(value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            windows[i].next(value);
        }
    };

    WindowTimeSubscriber.prototype._error = function _error(err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };

    WindowTimeSubscriber.prototype._complete = function _complete() {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().complete();
        }
        this.destination.complete();
    };

    WindowTimeSubscriber.prototype.openWindow = function openWindow() {
        var window = new _Subject2['default']();
        this.windows.push(window);
        this.destination.next(window);
        return window;
    };

    WindowTimeSubscriber.prototype.closeWindow = function closeWindow(window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    };

    return WindowTimeSubscriber;
})(_Subscriber3['default']);

function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var windowTimeSpan = state.windowTimeSpan;
    var window = state.window;

    if (window) {
        window.complete();
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan;
    var subscriber = state.subscriber;
    var scheduler = state.scheduler;
    var windowCreationInterval = state.windowCreationInterval;

    var window = subscriber.openWindow();
    var action = this;
    var context = { action: action, subscription: null };
    var timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
function dispatchWindowClose(_ref) {
    var subscriber = _ref.subscriber;
    var window = _ref.window;
    var context = _ref.context;

    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}
module.exports = exports['default'];
},{"../Subject":6,"../Subscriber":7,"../schedulers/nextTick":117}],104:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = windowToggle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber4 = require('../Subscriber');

var _Subscriber5 = _interopRequireDefault(_Subscriber4);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}

var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        _classCallCheck(this, WindowToggleOperator);

        this.openings = openings;
        this.closingSelector = closingSelector;
    }

    WindowToggleOperator.prototype.call = function call(subscriber) {
        return new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector);
    };

    return WindowToggleOperator;
})();

var WindowToggleSubscriber = (function (_Subscriber) {
    _inherits(WindowToggleSubscriber, _Subscriber);

    function WindowToggleSubscriber(destination, openings, closingSelector) {
        _classCallCheck(this, WindowToggleSubscriber);

        _Subscriber.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.windows = [];
        this.add(this.openings._subscribe(new WindowToggleOpeningsSubscriber(this)));
    }

    WindowToggleSubscriber.prototype._next = function _next(value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            windows[i].next(value);
        }
    };

    WindowToggleSubscriber.prototype._error = function _error(err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };

    WindowToggleSubscriber.prototype._complete = function _complete() {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().complete();
        }
        this.destination.complete();
    };

    WindowToggleSubscriber.prototype.openWindow = function openWindow(value) {
        var window = new _Subject2['default']();
        this.windows.push(window);
        this.destination.next(window);
        var windowContext = {
            window: window,
            subscription: new _Subscription2['default']()
        };
        var closingSelector = this.closingSelector;
        var closingNotifier = _utilTryCatch2['default'](closingSelector)(value);
        if (closingNotifier === _utilErrorObject.errorObject) {
            this.error(closingNotifier.e);
        } else {
            var subscriber = new WindowClosingNotifierSubscriber(this, windowContext);
            var subscription = closingNotifier._subscribe(subscriber);
            this.add(windowContext.subscription.add(subscription));
        }
    };

    WindowToggleSubscriber.prototype.closeWindow = function closeWindow(windowContext) {
        var window = windowContext.window;
        var subscription = windowContext.subscription;

        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
        window.complete();
        this.remove(subscription);
    };

    return WindowToggleSubscriber;
})(_Subscriber5['default']);

var WindowClosingNotifierSubscriber = (function (_Subscriber2) {
    _inherits(WindowClosingNotifierSubscriber, _Subscriber2);

    function WindowClosingNotifierSubscriber(parent, windowContext) {
        _classCallCheck(this, WindowClosingNotifierSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.windowContext = windowContext;
    }

    WindowClosingNotifierSubscriber.prototype._next = function _next() {
        this.parent.closeWindow(this.windowContext);
    };

    WindowClosingNotifierSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    WindowClosingNotifierSubscriber.prototype._complete = function _complete() {
        // noop
    };

    return WindowClosingNotifierSubscriber;
})(_Subscriber5['default']);

var WindowToggleOpeningsSubscriber = (function (_Subscriber3) {
    _inherits(WindowToggleOpeningsSubscriber, _Subscriber3);

    function WindowToggleOpeningsSubscriber(parent) {
        _classCallCheck(this, WindowToggleOpeningsSubscriber);

        _Subscriber3.call(this);
        this.parent = parent;
    }

    WindowToggleOpeningsSubscriber.prototype._next = function _next(value) {
        this.parent.openWindow(value);
    };

    WindowToggleOpeningsSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    WindowToggleOpeningsSubscriber.prototype._complete = function _complete() {
        // noop
    };

    return WindowToggleOpeningsSubscriber;
})(_Subscriber5['default']);

module.exports = exports['default'];
},{"../Subject":6,"../Subscriber":7,"../Subscription":8,"../util/errorObject":129,"../util/tryCatch":137}],105:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = window;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function window(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
}

var WindowOperator = (function () {
    function WindowOperator(closingSelector) {
        _classCallCheck(this, WindowOperator);

        this.closingSelector = closingSelector;
    }

    WindowOperator.prototype.call = function call(subscriber) {
        return new WindowSubscriber(subscriber, this.closingSelector);
    };

    return WindowOperator;
})();

var WindowSubscriber = (function (_Subscriber) {
    _inherits(WindowSubscriber, _Subscriber);

    function WindowSubscriber(destination, closingSelector) {
        _classCallCheck(this, WindowSubscriber);

        _Subscriber.call(this, destination);
        this.closingSelector = closingSelector;
        this.window = new _Subject2['default']();
        this.openWindow();
    }

    WindowSubscriber.prototype._next = function _next(value) {
        this.window.next(value);
    };

    WindowSubscriber.prototype._error = function _error(err) {
        this.window.error(err);
        this.destination.error(err);
    };

    WindowSubscriber.prototype._complete = function _complete() {
        this.window.complete();
        this.destination.complete();
    };

    WindowSubscriber.prototype.openWindow = function openWindow() {
        var prevClosingNotification = this.closingNotification;
        if (prevClosingNotification) {
            this.remove(prevClosingNotification);
            prevClosingNotification.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        this.destination.next(this.window = new _Subject2['default']());
        var closingNotifier = _utilTryCatch2['default'](this.closingSelector)();
        if (closingNotifier === _utilErrorObject.errorObject) {
            var err = closingNotifier.e;
            this.destination.error(err);
            this.window.error(err);
        } else {
            var closingNotification = this.closingNotification = new _Subscription2['default']();
            this.add(closingNotification.add(closingNotifier._subscribe(new WindowClosingNotifierSubscriber(this))));
        }
    };

    return WindowSubscriber;
})(_Subscriber4['default']);

var WindowClosingNotifierSubscriber = (function (_Subscriber2) {
    _inherits(WindowClosingNotifierSubscriber, _Subscriber2);

    function WindowClosingNotifierSubscriber(parent) {
        _classCallCheck(this, WindowClosingNotifierSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
    }

    WindowClosingNotifierSubscriber.prototype._next = function _next() {
        this.parent.openWindow();
    };

    WindowClosingNotifierSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    WindowClosingNotifierSubscriber.prototype._complete = function _complete() {
        // noop
    };

    return WindowClosingNotifierSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subject":6,"../Subscriber":7,"../Subscription":8,"../util/errorObject":129,"../util/tryCatch":137}],106:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = withLatestFrom;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

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
    var project = undefined;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
}

var WithLatestFromOperator = (function () {
    function WithLatestFromOperator(observables, project) {
        _classCallCheck(this, WithLatestFromOperator);

        this.observables = observables;
        this.project = project;
    }

    WithLatestFromOperator.prototype.call = function call(subscriber) {
        return new WithLatestFromSubscriber(subscriber, this.observables, this.project);
    };

    return WithLatestFromOperator;
})();

var WithLatestFromSubscriber = (function (_OuterSubscriber) {
    _inherits(WithLatestFromSubscriber, _OuterSubscriber);

    function WithLatestFromSubscriber(destination, observables, project) {
        _classCallCheck(this, WithLatestFromSubscriber);

        _OuterSubscriber.call(this, destination);
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
            this.add(_utilSubscribeToResult2['default'](this, observable, observable, i));
        }
    }

    WithLatestFromSubscriber.prototype.notifyNext = function notifyNext(observable, value, observableIndex, index) {
        this.values[observableIndex] = value;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(observableIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };

    WithLatestFromSubscriber.prototype.notifyComplete = function notifyComplete() {
        // noop
    };

    WithLatestFromSubscriber.prototype._next = function _next(value) {
        if (this.toRespond.length === 0) {
            var values = this.values;
            var destination = this.destination;
            var project = this.project;
            var args = [value].concat(values);
            if (project) {
                var result = _utilTryCatch2['default'](this.project).apply(this, args);
                if (result === _utilErrorObject.errorObject) {
                    destination.error(result.e);
                } else {
                    destination.next(result);
                }
            } else {
                destination.next(args);
            }
        }
    };

    return WithLatestFromSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];
},{"../OuterSubscriber":4,"../util/errorObject":129,"../util/subscribeToResult":135,"../util/tryCatch":137}],107:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = zip;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _zipSupport = require('./zip-support');

function zip() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new _observablesArrayObservable2['default'](observables).lift(new _zipSupport.ZipOperator(project));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":9,"./zip-support":108}],108:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var _utilSymbol_iterator = require('../util/Symbol_iterator');

var _utilSymbol_iterator2 = _interopRequireDefault(_utilSymbol_iterator);

var isArray = Array.isArray;

var ZipOperator = (function () {
    function ZipOperator(project) {
        _classCallCheck(this, ZipOperator);

        this.project = project;
    }

    ZipOperator.prototype.call = function call(subscriber) {
        return new ZipSubscriber(subscriber, this.project);
    };

    return ZipOperator;
})();

exports.ZipOperator = ZipOperator;

var ZipSubscriber = (function (_Subscriber) {
    _inherits(ZipSubscriber, _Subscriber);

    function ZipSubscriber(destination, project) {
        var values = arguments.length <= 2 || arguments[2] === undefined ? Object.create(null) : arguments[2];

        _classCallCheck(this, ZipSubscriber);

        _Subscriber.call(this, destination);
        this.index = 0;
        this.iterators = [];
        this.active = 0;
        this.project = typeof project === 'function' ? project : null;
        this.values = values;
    }

    ZipSubscriber.prototype._next = function _next(value) {
        var iterators = this.iterators;
        var index = this.index++;
        if (isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        } else if (typeof value[_utilSymbol_iterator2['default']] === 'function') {
            iterators.push(new StaticIterator(value[_utilSymbol_iterator2['default']]()));
        } else {
            iterators.push(new ZipBufferIterator(this.destination, this, value, index));
        }
    };

    ZipSubscriber.prototype._complete = function _complete() {
        var values = this.values;
        var iterators = this.iterators;
        var len = iterators.length;
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                iterator.subscribe(iterator, i);
            } else {
                this.active--; // not an observable
            }
        }
    };

    ZipSubscriber.prototype.notifyInactive = function notifyInactive() {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };

    ZipSubscriber.prototype.checkIterators = function checkIterators() {
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
            var result = _utilTryCatch2['default'](project).apply(this, args);
            if (result === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
            } else {
                destination.next(result);
            }
        } else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };

    return ZipSubscriber;
})(_Subscriber3['default']);

exports.ZipSubscriber = ZipSubscriber;

var StaticIterator = (function () {
    function StaticIterator(iterator) {
        _classCallCheck(this, StaticIterator);

        this.iterator = iterator;
        this.nextResult = iterator.next();
    }

    StaticIterator.prototype.hasValue = function hasValue() {
        return true;
    };

    StaticIterator.prototype.next = function next() {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };

    StaticIterator.prototype.hasCompleted = function hasCompleted() {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };

    return StaticIterator;
})();

var StaticArrayIterator = (function () {
    function StaticArrayIterator(array) {
        _classCallCheck(this, StaticArrayIterator);

        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }

    StaticArrayIterator.prototype[_utilSymbol_iterator2['default']] = function () {
        return this;
    };

    StaticArrayIterator.prototype.next = function next(value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { done: true };
    };

    StaticArrayIterator.prototype.hasValue = function hasValue() {
        return this.array.length > this.index;
    };

    StaticArrayIterator.prototype.hasCompleted = function hasCompleted() {
        return this.array.length === this.index;
    };

    return StaticArrayIterator;
})();

var ZipBufferIterator = (function (_OuterSubscriber) {
    _inherits(ZipBufferIterator, _OuterSubscriber);

    function ZipBufferIterator(destination, parent, observable, index) {
        _classCallCheck(this, ZipBufferIterator);

        _OuterSubscriber.call(this, destination);
        this.parent = parent;
        this.observable = observable;
        this.index = index;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
    }

    ZipBufferIterator.prototype[_utilSymbol_iterator2['default']] = function () {
        return this;
    };

    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
    //    this is legit because `next()` will never be called by a subscription in this case.

    ZipBufferIterator.prototype.next = function next() {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { done: true };
        } else {
            return { value: buffer.shift(), done: false };
        }
    };

    ZipBufferIterator.prototype.hasValue = function hasValue() {
        return this.buffer.length > 0;
    };

    ZipBufferIterator.prototype.hasCompleted = function hasCompleted() {
        return this.buffer.length === 0 && this.isComplete;
    };

    ZipBufferIterator.prototype.notifyComplete = function notifyComplete() {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        } else {
            this.destination.complete();
        }
    };

    ZipBufferIterator.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };

    ZipBufferIterator.prototype.subscribe = function subscribe(value, index) {
        this.add(_utilSubscribeToResult2['default'](this, this.observable, this, index));
    };

    return ZipBufferIterator;
})(_OuterSubscriber3['default']);
},{"../OuterSubscriber":4,"../Subscriber":7,"../util/Symbol_iterator":126,"../util/errorObject":129,"../util/subscribeToResult":135,"../util/tryCatch":137}],109:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = zipProto;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _zipStatic = require('./zip-static');

var _zipStatic2 = _interopRequireDefault(_zipStatic);

function zipProto() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    observables.unshift(this);
    return _zipStatic2['default'].apply(this, observables);
}

module.exports = exports['default'];
},{"./zip-static":107}],110:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = zipAll;

var _zipSupport = require('./zip-support');

function zipAll(project) {
    return this.lift(new _zipSupport.ZipOperator(project));
}

module.exports = exports['default'];
},{"./zip-support":108}],111:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ImmediateAction2 = require('./ImmediateAction');

var _ImmediateAction3 = _interopRequireDefault(_ImmediateAction2);

var FutureAction = (function (_ImmediateAction) {
    _inherits(FutureAction, _ImmediateAction);

    function FutureAction(scheduler, work) {
        _classCallCheck(this, FutureAction);

        _ImmediateAction.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }

    FutureAction.prototype.schedule = function schedule(state) {
        var _this = this;

        var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

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

    FutureAction.prototype.unsubscribe = function unsubscribe() {
        var id = this.id;
        if (id != null) {
            this.id = void 0;
            clearTimeout(id);
        }
        _ImmediateAction.prototype.unsubscribe.call(this);
    };

    return FutureAction;
})(_ImmediateAction3['default']);

exports['default'] = FutureAction;
module.exports = exports['default'];
},{"./ImmediateAction":112}],112:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscription2 = require('../Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var ImmediateAction = (function (_Subscription) {
    _inherits(ImmediateAction, _Subscription);

    function ImmediateAction(scheduler, work) {
        _classCallCheck(this, ImmediateAction);

        _Subscription.call(this);
        this.scheduler = scheduler;
        this.work = work;
    }

    ImmediateAction.prototype.schedule = function schedule(state) {
        if (this.isUnsubscribed) {
            return this;
        }
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        scheduler.flush();
        return this;
    };

    ImmediateAction.prototype.execute = function execute() {
        if (this.isUnsubscribed) {
            throw new Error('How did did we execute a canceled Action?');
        }
        this.work(this.state);
    };

    ImmediateAction.prototype.unsubscribe = function unsubscribe() {
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = void 0;
        this.state = void 0;
        this.scheduler = void 0;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        _Subscription.prototype.unsubscribe.call(this);
    };

    return ImmediateAction;
})(_Subscription3['default']);

exports['default'] = ImmediateAction;
module.exports = exports['default'];
},{"../Subscription":8}],113:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ImmediateAction = require('./ImmediateAction');

var _ImmediateAction2 = _interopRequireDefault(_ImmediateAction);

var _FutureAction = require('./FutureAction');

var _FutureAction2 = _interopRequireDefault(_FutureAction);

var ImmediateScheduler = (function () {
    function ImmediateScheduler() {
        _classCallCheck(this, ImmediateScheduler);

        this.actions = [];
        this.active = false;
        this.scheduled = false;
    }

    ImmediateScheduler.prototype.now = function now() {
        return Date.now();
    };

    ImmediateScheduler.prototype.flush = function flush() {
        if (this.active || this.scheduled) {
            return;
        }
        this.active = true;
        var actions = this.actions;
        for (var action = undefined; action = actions.shift();) {
            action.execute();
        }
        this.active = false;
    };

    ImmediateScheduler.prototype.schedule = function schedule(work, delay, state) {
        if (delay === undefined) delay = 0;

        return delay <= 0 ? this.scheduleNow(work, state) : this.scheduleLater(work, delay, state);
    };

    ImmediateScheduler.prototype.scheduleNow = function scheduleNow(work, state) {
        return new _ImmediateAction2['default'](this, work).schedule(state);
    };

    ImmediateScheduler.prototype.scheduleLater = function scheduleLater(work, delay, state) {
        return new _FutureAction2['default'](this, work).schedule(state, delay);
    };

    return ImmediateScheduler;
})();

exports['default'] = ImmediateScheduler;
module.exports = exports['default'];
},{"./FutureAction":111,"./ImmediateAction":112}],114:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilImmediate = require('../util/Immediate');

var _ImmediateAction2 = require('./ImmediateAction');

var _ImmediateAction3 = _interopRequireDefault(_ImmediateAction2);

var NextTickAction = (function (_ImmediateAction) {
    _inherits(NextTickAction, _ImmediateAction);

    function NextTickAction() {
        _classCallCheck(this, NextTickAction);

        _ImmediateAction.apply(this, arguments);
    }

    NextTickAction.prototype.schedule = function schedule(state) {
        var _this = this;

        if (this.isUnsubscribed) {
            return this;
        }
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        if (!scheduler.scheduled) {
            scheduler.scheduled = true;
            this.id = _utilImmediate.Immediate.setImmediate(function () {
                _this.id = void 0;
                _this.scheduler.scheduled = false;
                _this.scheduler.flush();
            });
        }
        return this;
    };

    NextTickAction.prototype.unsubscribe = function unsubscribe() {
        var id = this.id;
        var scheduler = this.scheduler;
        _ImmediateAction.prototype.unsubscribe.call(this);
        if (scheduler.actions.length === 0) {
            scheduler.active = false;
            scheduler.scheduled = false;
            if (id) {
                this.id = void 0;
                _utilImmediate.Immediate.clearImmediate(id);
            }
        }
    };

    return NextTickAction;
})(_ImmediateAction3['default']);

exports['default'] = NextTickAction;
module.exports = exports['default'];
},{"../util/Immediate":124,"./ImmediateAction":112}],115:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ImmediateScheduler2 = require('./ImmediateScheduler');

var _ImmediateScheduler3 = _interopRequireDefault(_ImmediateScheduler2);

var _NextTickAction = require('./NextTickAction');

var _NextTickAction2 = _interopRequireDefault(_NextTickAction);

var _ImmediateAction = require('./ImmediateAction');

var _ImmediateAction2 = _interopRequireDefault(_ImmediateAction);

var NextTickScheduler = (function (_ImmediateScheduler) {
    _inherits(NextTickScheduler, _ImmediateScheduler);

    function NextTickScheduler() {
        _classCallCheck(this, NextTickScheduler);

        _ImmediateScheduler.apply(this, arguments);
    }

    NextTickScheduler.prototype.scheduleNow = function scheduleNow(work, state) {
        return (this.scheduled ? new _ImmediateAction2['default'](this, work) : new _NextTickAction2['default'](this, work)).schedule(state);
    };

    return NextTickScheduler;
})(_ImmediateScheduler3['default']);

exports['default'] = NextTickScheduler;
module.exports = exports['default'];
},{"./ImmediateAction":112,"./ImmediateScheduler":113,"./NextTickAction":114}],116:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ImmediateScheduler = require('./ImmediateScheduler');

var _ImmediateScheduler2 = _interopRequireDefault(_ImmediateScheduler);

exports['default'] = new _ImmediateScheduler2['default']();
module.exports = exports['default'];
},{"./ImmediateScheduler":113}],117:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NextTickScheduler = require('./NextTickScheduler');

var _NextTickScheduler2 = _interopRequireDefault(_NextTickScheduler);

exports['default'] = new _NextTickScheduler2['default']();
module.exports = exports['default'];
},{"./NextTickScheduler":115}],118:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subject2 = require('../Subject');

var _Subject3 = _interopRequireDefault(_Subject2);

var BehaviorSubject = (function (_Subject) {
    _inherits(BehaviorSubject, _Subject);

    function BehaviorSubject(value) {
        _classCallCheck(this, BehaviorSubject);

        _Subject.call(this);
        this.value = value;
    }

    BehaviorSubject.prototype._subscribe = function _subscribe(subscriber) {
        var subscription = _Subject.prototype._subscribe.call(this, subscriber);
        if (!subscription) {
            return;
        } else if (!subscription.isUnsubscribed) {
            subscriber.next(this.value);
        }
        return subscription;
    };

    BehaviorSubject.prototype._next = function _next(value) {
        _Subject.prototype._next.call(this, this.value = value);
    };

    return BehaviorSubject;
})(_Subject3['default']);

exports['default'] = BehaviorSubject;
module.exports = exports['default'];
},{"../Subject":6}],119:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subject2 = require('../Subject');

var _Subject3 = _interopRequireDefault(_Subject2);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var ReplaySubject = (function (_Subject) {
    _inherits(ReplaySubject, _Subject);

    function ReplaySubject(bufferSize, _windowTime, scheduler) {
        if (bufferSize === undefined) bufferSize = Number.POSITIVE_INFINITY;
        if (_windowTime === undefined) _windowTime = Number.POSITIVE_INFINITY;

        _classCallCheck(this, ReplaySubject);

        _Subject.call(this);
        this.events = [];
        this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = _windowTime < 1 ? 1 : _windowTime;
        this.scheduler = scheduler;
    }

    ReplaySubject.prototype._next = function _next(value) {
        var now = this._getNow();
        this.events.push(new ReplayEvent(now, value));
        _Subject.prototype._next.call(this, value);
    };

    ReplaySubject.prototype._subscribe = function _subscribe(subscriber) {
        var events = this._getEvents(this._getNow());
        var index = -1;
        var len = events.length;
        while (!subscriber.isUnsubscribed && ++index < len) {
            subscriber.next(events[index].value);
        }
        return _Subject.prototype._subscribe.call(this, subscriber);
    };

    ReplaySubject.prototype._getNow = function _getNow() {
        return (this.scheduler || _schedulersImmediate2['default']).now();
    };

    ReplaySubject.prototype._getEvents = function _getEvents(now) {
        var bufferSize = this.bufferSize;
        var _windowTime = this._windowTime;
        var events = this.events;
        var eventsCount = events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if (now - events[spliceCount].time < _windowTime) {
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
})(_Subject3['default']);

exports['default'] = ReplaySubject;

var ReplayEvent = function ReplayEvent(time, value) {
    _classCallCheck(this, ReplayEvent);

    this.time = time;
    this.value = value;
};

module.exports = exports['default'];
},{"../Subject":6,"../schedulers/immediate":116}],120:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscription2 = require('../Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var _Subscriber = require('../Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var SubjectSubscription = (function (_Subscription) {
    _inherits(SubjectSubscription, _Subscription);

    function SubjectSubscription(subject, observer) {
        _classCallCheck(this, SubjectSubscription);

        _Subscription.call(this);
        this.subject = subject;
        this.observer = observer;
        this.isUnsubscribed = false;
    }

    SubjectSubscription.prototype.unsubscribe = function unsubscribe() {
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
        if (this.observer instanceof _Subscriber2['default']) {
            this.observer.unsubscribe();
        }
        var subscriberIndex = observers.indexOf(this.observer);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };

    return SubjectSubscription;
})(_Subscription3['default']);

exports['default'] = SubjectSubscription;
module.exports = exports['default'];
},{"../Subscriber":7,"../Subscription":8}],121:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ArgumentOutOfRangeError = function ArgumentOutOfRangeError() {
    _classCallCheck(this, ArgumentOutOfRangeError);

    this.name = 'ArgumentOutOfRangeError';
    this.message = 'argument out of range';
};

exports['default'] = ArgumentOutOfRangeError;
module.exports = exports['default'];
},{}],122:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EmptyError = function EmptyError() {
    _classCallCheck(this, EmptyError);

    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
};

exports['default'] = EmptyError;
module.exports = exports['default'];
},{}],123:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FastMap = (function () {
    function FastMap() {
        _classCallCheck(this, FastMap);

        this.size = 0;
        this._values = {};
    }

    FastMap.prototype["delete"] = function _delete(key) {
        this._values[key] = null;
        return true;
    };

    FastMap.prototype.set = function set(key, value) {
        this._values[key] = value;
        return this;
    };

    FastMap.prototype.get = function get(key) {
        return this._values[key];
    };

    FastMap.prototype.forEach = function forEach(cb, thisArg) {
        var values = this._values;
        for (var key in values) {
            if (values.hasOwnProperty(key) && values[key] !== null) {
                cb.call(thisArg, values[key], key);
            }
        }
    };

    FastMap.prototype.clear = function clear() {
        this._values = {};
    };

    return FastMap;
})();

exports["default"] = FastMap;
module.exports = exports["default"];
},{}],124:[function(require,module,exports){
/**
All credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/
'use strict';

exports.__esModule = true;

var _root = require('./root');

var Immediate = {
    setImmediate: function setImmediate(x) {
        return 0;
    },
    clearImmediate: function clearImmediate(id) {}
};
exports.Immediate = Immediate;
if (_root.root && _root.root.setImmediate) {
    Immediate.setImmediate = _root.root.setImmediate;
    Immediate.clearImmediate = _root.root.clearImmediate;
} else {
    exports.Immediate = Immediate = (function (global, Immediate) {
        var nextHandle = 1,
            // Spec says greater than zero
        tasksByHandle = {},
            currentlyRunningATask = false,
            doc = global.document,
            setImmediate = undefined;
        // Don't get fooled by e.g. browserify environments.
        if (({}).toString.call(global.process) === '[object process]') {
            // For Node.js before 0.9
            setImmediate = installNextTickImplementation();
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            setImmediate = installPostMessageImplementation();
        } else if (global.MessageChannel) {
            // For web workers, where supported
            setImmediate = installMessageChannelImplementation();
        } else if (doc && 'onreadystatechange' in doc.createElement('script')) {
            // For IE 6–8
            setImmediate = installReadyStateChangeImplementation();
        } else {
            // For older browsers
            setImmediate = installSetTimeoutImplementation();
        }
        Immediate.setImmediate = setImmediate;
        Immediate.clearImmediate = clearImmediate;
        return Immediate;
        function clearImmediate(handle) {
            delete tasksByHandle[handle];
        }
        function addFromSetImmediateArguments(args) {
            tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
            return nextHandle++;
        }
        // This function accepts the same arguments as setImmediate, but
        // returns a function that requires no arguments.
        function partiallyApplied(handler) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return function () {
                if (typeof handler === 'function') {
                    handler.apply(undefined, args);
                } else {
                    new Function('' + handler)();
                }
            };
        }
        function runIfPresent(handle) {
            // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
            // So if we're currently running a task, we'll need to delay this invocation.
            if (currentlyRunningATask) {
                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                // 'too much recursion' error.
                setTimeout(partiallyApplied(runIfPresent, handle), 0);
            } else {
                var task = tasksByHandle[handle];
                if (task) {
                    currentlyRunningATask = true;
                    try {
                        task();
                    } finally {
                        clearImmediate(handle);
                        currentlyRunningATask = false;
                    }
                }
            }
        }
        function installNextTickImplementation() {
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                global.process.nextTick(partiallyApplied(runIfPresent, handle));
                return handle;
            };
        }
        function canUsePostMessage() {
            // The test against `importScripts` prevents this implementation from being installed inside a web worker,
            // where `global.postMessage` means something completely different and can't be used for this purpose.
            if (global.postMessage && !global.importScripts) {
                var postMessageIsAsynchronous = true;
                var oldOnMessage = global.onmessage;
                global.onmessage = function () {
                    postMessageIsAsynchronous = false;
                };
                global.postMessage('', '*');
                global.onmessage = oldOnMessage;
                return postMessageIsAsynchronous;
            }
        }
        function installPostMessageImplementation() {
            // Installs an event handler on `global` for the `message` event: see
            // * https://developer.mozilla.org/en/DOM/window.postMessage
            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
            var messagePrefix = 'setImmediate$' + Math.random() + '$';
            var onGlobalMessage = function onGlobalMessage(event) {
                if (event.source === global && typeof event.data === 'string' && event.data.indexOf(messagePrefix) === 0) {
                    runIfPresent(+event.data.slice(messagePrefix.length));
                }
            };
            if (global.addEventListener) {
                global.addEventListener('message', onGlobalMessage, false);
            } else {
                global.attachEvent('onmessage', onGlobalMessage);
            }
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                global.postMessage(messagePrefix + handle, '*');
                return handle;
            };
        }
        function installMessageChannelImplementation() {
            var channel = new MessageChannel();
            channel.port1.onmessage = function (event) {
                var handle = event.data;
                runIfPresent(handle);
            };
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                channel.port2.postMessage(handle);
                return handle;
            };
        }
        function installReadyStateChangeImplementation() {
            var html = doc.documentElement;
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var script = doc.createElement('script');
                script.onreadystatechange = function () {
                    runIfPresent(handle);
                    script.onreadystatechange = null;
                    html.removeChild(script);
                    script = null;
                };
                html.appendChild(script);
                return handle;
            };
        }
        function installSetTimeoutImplementation() {
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                setTimeout(partiallyApplied(runIfPresent, handle), 0);
                return handle;
            };
        }
    })(_root.root, Immediate);
}
},{"./root":134}],125:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _root = require('./root');

exports['default'] = _root.root.Map || (function () {
    function Map() {
        this.size = 0;
        this._values = [];
        this._keys = [];
    }
    Map.prototype['delete'] = function (key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
    };
    Map.prototype.get = function (key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
    };
    Map.prototype.set = function (key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            this._keys.push(key);
            this._values.push(value);
            this.size++;
        } else {
            this._values[i] = value;
        }
        return this;
    };
    Map.prototype.forEach = function (cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
            cb.call(thisArg, this._values[i], this._keys[i]);
        }
    };
    return Map;
})();

module.exports = exports['default'];
},{"./root":134}],126:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _root = require('./root');

if (!_root.root.Symbol) {
    _root.root.Symbol = {};
}
if (!_root.root.Symbol.iterator) {
    if (typeof _root.root.Symbol['for'] === 'function') {
        _root.root.Symbol.iterator = _root.root.Symbol['for']('iterator');
    } else if (_root.root.Set && typeof new _root.root.Set()['@@iterator'] === 'function') {
        // Bug for mozilla version
        _root.root.Symbol.iterator = '@@iterator';
    } else {
        _root.root.Symbol.iterator = '_es6shim_iterator_';
    }
}
exports['default'] = _root.root.Symbol.iterator;

// // Shim in iterator support
// export var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) || '_es6shim_iterator_';
// // Bug for mozilla version
// if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
//     $iterator$ = '@@iterator';
// }
module.exports = exports['default'];
},{"./root":134}],127:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _root = require('./root');

if (!_root.root.Symbol) {
    _root.root.Symbol = {};
}
if (!_root.root.Symbol.observable) {
    if (typeof _root.root.Symbol['for'] === 'function') {
        _root.root.Symbol.observable = _root.root.Symbol['for']('observable');
    } else {
        _root.root.Symbol.observable = '@@observable';
    }
}
exports['default'] = _root.root.Symbol.observable;
module.exports = exports['default'];
},{"./root":134}],128:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindCallback;

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

;
module.exports = exports['default'];
},{}],129:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var errorObject = { e: {} };
exports.errorObject = errorObject;
},{}],130:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = isDate;

function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}

module.exports = exports["default"];
},{}],131:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = isNumeric;
var is_array = Array.isArray;

function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !is_array(val) && val - parseFloat(val) + 1 >= 0;
}

;
module.exports = exports["default"];
},{}],132:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = noop;

function noop() {}

module.exports = exports["default"];
},{}],133:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = not;

function not(pred, thisArg) {
    function notPred() {
        return !notPred.pred.apply(notPred.thisArg, arguments);
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
}

module.exports = exports["default"];
},{}],134:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
var root = objectTypes[typeof self] && self || objectTypes[typeof window] && window;
exports.root = root;
var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
var freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = root = freeGlobal;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],135:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = subscribeToResult;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var _utilSymbol_iterator = require('../util/Symbol_iterator');

var _utilSymbol_iterator2 = _interopRequireDefault(_utilSymbol_iterator);

var _utilSymbol_observable = require('../util/Symbol_observable');

var _utilSymbol_observable2 = _interopRequireDefault(_utilSymbol_observable);

var _InnerSubscriber = require('../InnerSubscriber');

var _InnerSubscriber2 = _interopRequireDefault(_InnerSubscriber);

var isArray = Array.isArray;

function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new _InnerSubscriber2['default'](outerSubscriber, outerValue, outerIndex);
    if (destination.isUnsubscribed) {
        return;
    }
    if (result instanceof _Observable2['default']) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return;
        } else {
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
    } else if (typeof result.then === 'function') {
        result.then(function (x) {
            if (!destination.isUnsubscribed) {
                destination.next(x);
                destination.complete();
            }
        }, function (err) {
            return destination.error(err);
        }).then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            setTimeout(function () {
                throw err;
            });
        });
        return destination;
    } else if (typeof result[_utilSymbol_iterator2['default']] === 'function') {
        for (var _iterator = result, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var item = _ref;

            destination.next(item);
            if (destination.isUnsubscribed) {
                break;
            }
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    } else if (typeof result[_utilSymbol_observable2['default']] === 'function') {
        var obs = result[_utilSymbol_observable2['default']]();
        if (typeof obs.subscribe !== 'function') {
            destination.error('invalid observable');
        } else {
            return obs.subscribe(new _InnerSubscriber2['default'](outerSubscriber, outerValue, outerIndex));
        }
    } else {
        destination.error(new TypeError('unknown type returned'));
    }
}

module.exports = exports['default'];
},{"../InnerSubscriber":1,"../Observable":3,"../util/Symbol_iterator":126,"../util/Symbol_observable":127}],136:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = throwError;

function throwError(e) {
  throw e;
}

module.exports = exports["default"];
},{}],137:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = tryCatch;

var _errorObject = require('./errorObject');

var tryCatchTarget = undefined;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        _errorObject.errorObject.e = e;
        return _errorObject.errorObject;
    }
}

function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

;
module.exports = exports['default'];
},{"./errorObject":129}],138:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = tryOrOnError;

function tryOrOnError(target) {
    function tryCatcher() {
        try {
            tryCatcher.target.apply(this, arguments);
        } catch (e) {
            this.error(e);
        }
    }
    tryCatcher.target = target;
    return tryCatcher;
}

module.exports = exports["default"];
},{}],139:[function(require,module,exports){
(function (global){
(function(root, factory) {
    root.Rx = factory();
} (window || global || this, function() {
    return require('../dist/cjs/Rx');
}));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dist/cjs/Rx":5}]},{},[139]);
